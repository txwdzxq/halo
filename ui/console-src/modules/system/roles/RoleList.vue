<script lang="ts" setup>
// core libs
import type { Role, RoleList } from "@halo-dev/api-client";
import { computed, ref } from "vue";

// components
import {
  Dialog,
  IconAddCircle,
  IconShieldUser,
  Toast,
  VButton,
  VCard,
  VDropdownItem,
  VEntity,
  VEntityContainer,
  VEntityField,
  VLoading,
  VPageHeader,
  VStatusDot,
  VTag,
} from "@halo-dev/components";
import RoleEditingModal from "./components/RoleEditingModal.vue";

// constants
import { rbacAnnotations } from "@/constants/annotations";
import { formatDatetime } from "@/utils/date";

// libs
import { SUPER_ROLE_NAME } from "@/constants/constants";
import { roleLabels } from "@/constants/labels";
import { usePermission } from "@/utils/permission";
import { resolveDeepDependencies } from "@/utils/role";
import { coreApiClient } from "@halo-dev/api-client";
import { useQuery } from "@tanstack/vue-query";
import Fuse from "fuse.js";
import { useI18n } from "vue-i18n";

const { currentUserHasPermission } = usePermission();
const { t } = useI18n();

const editingModal = ref<boolean>(false);
const selectedRole = ref<Role>();

let fuse: Fuse<Role> | undefined = undefined;

const { data: roleTemplates } = useQuery({
  queryKey: ["role-templates"],
  queryFn: async () => {
    const { data } = await coreApiClient.role.listRole({
      page: 0,
      size: 0,
      labelSelector: [`${roleLabels.TEMPLATE}=true`, "!halo.run/hidden"],
    });
    return data.items;
  },
});

const {
  data: roles,
  isLoading,
  refetch,
} = useQuery<RoleList>({
  queryKey: ["roles"],
  queryFn: async () => {
    const { data } = await coreApiClient.role.listRole({
      page: 0,
      size: 0,
      labelSelector: [`!${roleLabels.TEMPLATE}`],
    });
    return data;
  },
  refetchInterval(data) {
    const hasDeletingRole = data?.items.some(
      (item) => !!item.metadata.deletionTimestamp
    );
    return hasDeletingRole ? 1000 : false;
  },
  onSuccess(data) {
    fuse = new Fuse(data.items, {
      keys: [
        {
          name: "displayName",
          getFn: (role) => {
            return (
              role.metadata.annotations?.[rbacAnnotations.DISPLAY_NAME] || ""
            );
          },
        },
        "metadata.name",
      ],
      useExtendedSearch: true,
      threshold: 0.2,
    });
  },
  enabled: computed(() => !!roleTemplates.value),
});

const keyword = ref("");

const searchResults = computed(() => {
  if (!fuse || !keyword.value) {
    return roles.value?.items || [];
  }

  return fuse?.search(keyword.value).map((item) => item.item);
});

const isSystemReserved = (role: Role) => {
  return role.metadata.labels?.[roleLabels.SYSTEM_RESERVED] === "true";
};

const getRoleCountText = (role: Role) => {
  if (role.metadata.name === SUPER_ROLE_NAME) {
    return t("core.role.common.text.contains_all_permissions");
  }

  const dependencies = new Set<string>(
    resolveDeepDependencies(role, roleTemplates.value || [])
  );

  return t("core.role.common.text.contains_n_permissions", {
    count: dependencies.size || 0,
  });
};

const handleOpenEditingModal = (role: Role) => {
  selectedRole.value = role;
  editingModal.value = true;
};

const onEditingModalClose = () => {
  selectedRole.value = undefined;
  editingModal.value = false;
  refetch();
};

const handleCloneRole = async (role: Role) => {
  const roleToCreate: Role = {
    apiVersion: "v1alpha1",
    kind: "Role",
    metadata: {
      name: "",
      generateName: "role-",
      labels: {},
      annotations: {
        [rbacAnnotations.DEPENDENCIES]:
          role.metadata.annotations?.[rbacAnnotations.DEPENDENCIES] || "",
        [rbacAnnotations.DISPLAY_NAME]:
          role.metadata.annotations?.[rbacAnnotations.DISPLAY_NAME] || "",
      },
    },
    rules: [],
  };

  // 如果是超级管理员角色，那么需要获取到所有角色模板并填充到表单
  if (role.metadata.name === SUPER_ROLE_NAME) {
    const { data } = await coreApiClient.role.listRole({
      page: 0,
      size: 0,
      labelSelector: [`${roleLabels.TEMPLATE}=true`, "!halo.run/hidden"],
    });
    const roleTemplateNames = data.items.map((item) => item.metadata.name);
    if (roleToCreate.metadata.annotations) {
      roleToCreate.metadata.annotations[rbacAnnotations.DEPENDENCIES] =
        JSON.stringify(roleTemplateNames);
    } else {
      roleToCreate.metadata.annotations = {
        [rbacAnnotations.DEPENDENCIES]: JSON.stringify(roleTemplateNames),
      };
    }
  }

  selectedRole.value = roleToCreate;
  editingModal.value = true;
};

const handleDelete = async (role: Role) => {
  Dialog.warning({
    title: t("core.role.operations.delete.title"),
    description: t("core.role.operations.delete.description"),
    confirmType: "danger",
    confirmText: t("core.common.buttons.confirm"),
    cancelText: t("core.common.buttons.cancel"),
    onConfirm: async () => {
      try {
        await coreApiClient.role.deleteRole({
          name: role.metadata.name,
        });

        Toast.success(t("core.common.toast.delete_success"));
      } catch (e) {
        console.error("Failed to delete role", e);
      } finally {
        refetch();
      }
    },
  });
};
</script>
<template>
  <RoleEditingModal
    v-if="editingModal"
    :role="selectedRole"
    @close="onEditingModalClose"
  />

  <VPageHeader :title="$t('core.role.title')">
    <template #icon>
      <IconShieldUser />
    </template>
    <template #actions>
      <VButton
        v-permission="['system:roles:manage']"
        type="secondary"
        @click="editingModal = true"
      >
        <template #icon>
          <IconAddCircle />
        </template>
        {{ $t("core.common.buttons.new") }}
      </VButton>
    </template>
  </VPageHeader>

  <div class="m-0 md:m-4">
    <VCard :body-class="['!p-0']">
      <template #header>
        <div class="block w-full bg-gray-50 px-4 py-3">
          <div
            class="relative flex flex-col items-start sm:flex-row sm:items-center"
          >
            <div class="flex w-full flex-1 sm:w-auto">
              <FormKit
                v-model="keyword"
                :placeholder="$t('core.common.placeholder.search')"
                type="text"
              ></FormKit>
            </div>
          </div>
        </div>
      </template>
      <VLoading v-if="isLoading" />
      <Transition v-else appear name="fade">
        <VEntityContainer>
          <VEntity v-for="role in searchResults" :key="role.metadata.name">
            <template #start>
              <VEntityField
                :title="
                  role.metadata.annotations?.[rbacAnnotations.DISPLAY_NAME] ||
                  role.metadata.name
                "
                :description="getRoleCountText(role)"
                :route="{
                  name: 'RoleDetail',
                  params: {
                    name: role.metadata.name,
                  },
                }"
              ></VEntityField>
            </template>
            <template #end>
              <!-- TODO: 支持显示用户数量 -->
              <VEntityField v-if="false" description="0 个用户" />
              <VEntityField>
                <template #description>
                  <VTag>
                    {{
                      isSystemReserved(role)
                        ? t("core.role.common.text.system_reserved")
                        : t("core.role.common.text.custom")
                    }}
                  </VTag>
                </template>
              </VEntityField>
              <VEntityField v-if="role.metadata.deletionTimestamp">
                <template #description>
                  <VStatusDot
                    v-tooltip="$t('core.common.status.deleting')"
                    state="warning"
                    animate
                  />
                </template>
              </VEntityField>
              <VEntityField>
                <template #description>
                  <span class="truncate text-xs tabular-nums text-gray-500">
                    {{ formatDatetime(role.metadata.creationTimestamp) }}
                  </span>
                </template>
              </VEntityField>
            </template>
            <template
              v-if="currentUserHasPermission(['system:roles:manage'])"
              #dropdownItems
            >
              <VDropdownItem
                v-if="!isSystemReserved(role)"
                @click="handleOpenEditingModal(role)"
              >
                {{ $t("core.common.buttons.edit") }}
              </VDropdownItem>
              <VDropdownItem
                v-if="!isSystemReserved(role)"
                type="danger"
                @click="handleDelete(role)"
              >
                {{ $t("core.common.buttons.delete") }}
              </VDropdownItem>
              <VDropdownItem @click="handleCloneRole(role)">
                {{
                  $t("core.role.operations.create_based_on_this_role.button")
                }}
              </VDropdownItem>
            </template>
          </VEntity>
        </VEntityContainer>
      </Transition>
    </VCard>
  </div>
</template>
