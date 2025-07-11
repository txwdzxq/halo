<script lang="ts" setup>
import type { Theme } from "@halo-dev/api-client";
import {
  Dialog,
  IconMore,
  Toast,
  VAvatar,
  VDescription,
  VDescriptionItem,
  VDropdown,
  VDropdownDivider,
  VDropdownItem,
  VStatusDot,
  VTag,
} from "@halo-dev/components";

import { consoleApiClient } from "@halo-dev/api-client";
import type { Ref } from "vue";
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useThemeConfigFile, useThemeLifeCycle } from "./composables/use-theme";

const { t } = useI18n();

const selectedTheme = inject<Ref<Theme | undefined>>("selectedTheme", ref());
const themesModal = inject<Ref<boolean>>("themesModal");

const { isActivated, getFailedMessage, handleResetSettingConfig } =
  useThemeLifeCycle(selectedTheme);

async function handleClearCache() {
  Dialog.warning({
    title: t("core.theme.operations.clear_templates_cache.title"),
    description: t("core.theme.operations.clear_templates_cache.description"),
    confirmText: t("core.common.buttons.confirm"),
    cancelText: t("core.common.buttons.cancel"),
    async onConfirm() {
      if (!selectedTheme.value) {
        console.error("No selected or activated theme");
        return;
      }

      await consoleApiClient.theme.theme.invalidateCache({
        name: selectedTheme.value?.metadata.name,
      });

      Toast.success(t("core.common.toast.operation_success"));
    },
  });
}

const handleReloadTheme = async () => {
  Dialog.warning({
    title: t("core.theme.operations.reload.title"),
    description: t("core.theme.operations.reload.description"),
    confirmText: t("core.common.buttons.confirm"),
    cancelText: t("core.common.buttons.cancel"),
    onConfirm: async () => {
      try {
        if (!selectedTheme?.value) {
          return;
        }

        await consoleApiClient.theme.theme.reload({
          name: selectedTheme.value.metadata.name as string,
        });

        Toast.success(t("core.theme.operations.reload.toast_success"));

        window.location.reload();
      } catch (e) {
        console.error("Failed to reload theme setting", e);
      }
    },
  });
};

const { handleExportThemeConfiguration, openSelectImportFileDialog } =
  useThemeConfigFile(selectedTheme);
</script>

<template>
  <div class="overflow-hidden rounded-b-base">
    <div class="bg-white px-4 py-4 sm:px-6">
      <div class="group flex items-center justify-between">
        <div class="flex flex-row items-center gap-3">
          <VAvatar
            :key="selectedTheme?.metadata.name"
            :alt="selectedTheme?.spec.displayName"
            :src="selectedTheme?.spec.logo"
            size="lg"
          />
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ selectedTheme?.spec.displayName }}
            </h3>
            <p class="mt-1 flex max-w-2xl items-center gap-2">
              <span class="text-sm text-gray-500">
                {{ selectedTheme?.spec.version }}
              </span>
              <VTag>
                {{
                  isActivated
                    ? t("core.common.status.activated")
                    : t("core.common.status.not_activated")
                }}
              </VTag>
              <VStatusDot
                v-if="getFailedMessage()"
                v-tooltip="getFailedMessage()"
                state="warning"
                animate
              />
            </p>
          </div>
        </div>
        <VDropdown v-permission="['system:themes:manage']">
          <div
            class="cursor-pointer rounded p-1 transition-all hover:text-blue-600 group-hover:bg-gray-100"
          >
            <IconMore />
          </div>
          <template #popper>
            <VDropdownItem @click="themesModal = true">
              {{ $t("core.common.buttons.upgrade") }}
            </VDropdownItem>
            <VDropdownItem @click="handleExportThemeConfiguration">
              {{ $t("core.theme.operations.export_configuration.button") }}
            </VDropdownItem>
            <VDropdownItem @click="openSelectImportFileDialog()">
              {{ $t("core.theme.operations.import_configuration.button") }}
            </VDropdownItem>
            <VDropdownDivider />
            <VDropdownItem type="danger" @click="handleReloadTheme">
              {{ $t("core.theme.operations.reload.button") }}
            </VDropdownItem>
            <VDropdownItem type="danger" @click="handleClearCache">
              {{ $t("core.theme.operations.clear_templates_cache.button") }}
            </VDropdownItem>
            <VDropdownItem type="danger" @click="handleResetSettingConfig">
              {{ $t("core.common.buttons.reset") }}
            </VDropdownItem>
          </template>
        </VDropdown>
      </div>
    </div>
    <div class="border-t border-gray-200">
      <VDescription>
        <VDescriptionItem label="ID" :content="selectedTheme?.metadata.name" />
        <VDescriptionItem
          :label="$t('core.theme.detail.fields.description')"
          :content="
            selectedTheme?.spec.description || $t('core.common.text.none')
          "
        ></VDescriptionItem>
        <VDescriptionItem :label="$t('core.theme.detail.fields.author')">
          <a
            v-if="selectedTheme?.spec.author"
            :href="selectedTheme.spec.author.website || '#'"
            class="hover:text-gray-600"
            target="_blank"
          >
            {{ selectedTheme.spec.author.name }}
          </a>
          <span v-else>
            {{ $t("core.common.text.none") }}
          </span>
        </VDescriptionItem>
        <VDescriptionItem
          :label="$t('core.theme.detail.fields.version')"
          :content="selectedTheme?.spec.version"
        />
        <VDescriptionItem
          :label="$t('core.theme.detail.fields.requires')"
          :content="selectedTheme?.spec.requires"
        />
        <VDescriptionItem :label="$t('core.theme.detail.fields.homepage')">
          <a
            v-if="selectedTheme?.spec.homepage"
            :href="selectedTheme.spec.homepage"
            class="hover:text-gray-600"
            target="_blank"
          >
            {{ selectedTheme.spec.homepage }}
          </a>
          <span v-else>
            {{ $t("core.common.text.none") }}
          </span>
        </VDescriptionItem>
        <VDescriptionItem :label="$t('core.theme.detail.fields.repo')">
          <a
            v-if="selectedTheme?.spec.repo"
            :href="selectedTheme.spec.repo"
            class="hover:text-gray-600"
            target="_blank"
          >
            {{ selectedTheme.spec.repo }}
          </a>
          <span v-else>
            {{ $t("core.common.text.none") }}
          </span>
        </VDescriptionItem>
        <VDescriptionItem :label="$t('core.theme.detail.fields.issues')">
          <a
            v-if="selectedTheme?.spec.issues"
            :href="selectedTheme.spec.issues"
            class="hover:text-gray-600"
            target="_blank"
          >
            {{ selectedTheme.spec.issues }}
          </a>
          <span v-else>
            {{ $t("core.common.text.none") }}
          </span>
        </VDescriptionItem>
        <VDescriptionItem :label="$t('core.theme.detail.fields.license')">
          <ul
            v-if="
              selectedTheme?.spec.license && selectedTheme?.spec.license.length
            "
            class="list-inside"
            :class="{ 'list-disc': selectedTheme?.spec.license.length > 1 }"
          >
            <li
              v-for="(license, index) in selectedTheme.spec.license"
              :key="index"
            >
              <a v-if="license.url" :href="license.url" target="_blank">
                {{ license.name }}
              </a>
              <span v-else>
                {{ license.name }}
              </span>
            </li>
          </ul>
          <span v-else>
            {{ $t("core.common.text.none") }}
          </span>
        </VDescriptionItem>
        <VDescriptionItem
          :label="$t('core.theme.detail.fields.storage_location')"
          :content="selectedTheme?.status?.location"
        />
      </VDescription>
    </div>
  </div>
</template>
