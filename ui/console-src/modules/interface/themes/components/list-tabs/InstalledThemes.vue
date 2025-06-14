<script lang="ts" setup>
import { useThemeStore } from "@console/stores/theme";
import type { Theme } from "@halo-dev/api-client";
import { consoleApiClient } from "@halo-dev/api-client";
import {
  IconAddCircle,
  VButton,
  VEmpty,
  VLoading,
  VSpace,
} from "@halo-dev/components";
import { useQuery } from "@tanstack/vue-query";
import { inject, ref, type Ref } from "vue";
import ThemeListItem from "../ThemeListItem.vue";
import ThemePreviewModal from "../preview/ThemePreviewModal.vue";

const themeStore = useThemeStore();

const selectedTheme = inject<Ref<Theme | undefined>>("selectedTheme", ref());
const activeTabId = inject<Ref<string>>("activeTabId", ref(""));

function handleSelectTheme(theme: Theme) {
  selectedTheme.value = theme;
}

const {
  data: themes,
  isLoading,
  isFetching,
  refetch,
} = useQuery<Theme[]>({
  queryKey: ["installed-themes"],
  queryFn: async () => {
    const { data } = await consoleApiClient.theme.theme.listThemes({
      page: 0,
      size: 0,
      uninstalled: false,
    });
    return data.items.sort((a, b) => {
      const activatedThemeName = themeStore.activatedTheme?.metadata.name;
      if (a.metadata.name === activatedThemeName) {
        return -1;
      }
      if (b.metadata.name === activatedThemeName) {
        return 1;
      }
      return 0;
    });
  },
  refetchInterval(data) {
    const hasDeletingTheme = data?.some(
      (theme) => !!theme.metadata.deletionTimestamp
    );

    return hasDeletingTheme ? 1000 : false;
  },
});

// preview
const previewVisible = ref(false);
const selectedPreviewTheme = ref<Theme>();

const handleOpenPreview = (theme: Theme) => {
  selectedPreviewTheme.value = theme;
  previewVisible.value = true;
};
</script>

<template>
  <div id="installed-themes-wrapper">
    <VLoading v-if="isLoading" />
    <Transition v-else-if="!themes?.length" appear name="fade">
      <VEmpty
        :message="$t('core.theme.list_modal.empty.message')"
        :title="$t('core.theme.list_modal.empty.title')"
      >
        <template #actions>
          <VSpace>
            <VButton :loading="isFetching" @click="refetch()">
              {{ $t("core.common.buttons.refresh") }}
            </VButton>
            <VButton
              v-permission="['system:themes:manage']"
              type="secondary"
              @click="activeTabId = 'local-upload'"
            >
              <template #icon>
                <IconAddCircle />
              </template>
              {{ $t("core.theme.common.buttons.install") }}
            </VButton>
          </VSpace>
        </template>
      </VEmpty>
    </Transition>
    <Transition v-else appear name="fade">
      <ul class="box-border h-full w-full space-y-3" role="list">
        <li v-for="theme in themes" :key="theme.metadata.name">
          <ThemeListItem
            :theme="theme"
            :is-selected="theme.metadata.name === selectedTheme?.metadata?.name"
            @select="handleSelectTheme"
            @preview="handleOpenPreview(theme)"
          />
        </li>
      </ul>
    </Transition>
    <ThemePreviewModal
      v-if="previewVisible"
      :theme="selectedPreviewTheme"
      @close="previewVisible = false"
    />
  </div>
</template>
