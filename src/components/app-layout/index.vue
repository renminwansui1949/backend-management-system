<template>
  <div class="app-layout">
    <AppSide v-if="!isHorizontalLayout" />
    <div class="app-layout__main" data-simplebar-auto-hide="true">
      <AppHeader />
      <AppContent>
        <template #footer>
          <AppFooter />
        </template>
      </AppContent>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import AppHeader from './app-header/index.vue'
import AppSide from './app-side/index.vue'
import AppContent from './app-content/index.vue'
import AppFooter from './app-footer/index.vue'

import { useThemeToken } from './hooks/use-theme-token'
import { useLayoutStore } from '@/stores/layout'
import { LAYOUT_MODE } from '@/constant/layout'

const { colorTextBase, colorBgBase } = useThemeToken()
const { layoutConfig } = useLayoutStore()

const isHorizontalLayout = computed(() => {
  // 水平布局 不显示 侧边栏
  return layoutConfig.mode === LAYOUT_MODE.HORIZONTAL
})
</script>

<style lang="less" scoped>
.app-layout {
  width: 100%;
  height: 100%;
  display: flex;
  color: v-bind(colorTextBase);
  background-color: v-bind(colorBgBase);

  .app-layout__main {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
