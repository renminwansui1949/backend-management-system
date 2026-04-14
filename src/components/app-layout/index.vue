<template>
  <div class="app-layout" :class="`app-layout--${layoutConfig.mode}`">
    <AppSide v-if="isSideLayout || isTwoSideLayout" />
    <div class="app-layout__main">
      <AppHeader />

      <div class="app-layout__wrapper">
        <AppSide v-if="isMixedLayout" />

        <div class="app-layout__content">
          <TabBar v-if="isMixedLayout" />
          <AppContent>
            <template #footer>
              <AppFooter />
            </template>
          </AppContent>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import AppHeader from './app-header/index.vue'
import AppSide from './app-side/index.vue'
import AppContent from './app-content/index.vue'
import AppFooter from './app-footer/index.vue'
import TabBar from './app-header/tabbar.vue'

import { useThemeToken } from './hooks/use-theme-token'
import { useLayoutStore } from '@/stores/layout'
import { LAYOUT_MODE } from '@/constant/layout'

const { colorTextBase, colorBgBase } = useThemeToken()
const { layoutConfig } = useLayoutStore()

// 侧边布局模式
const isSideLayout = computed(() => {
  return layoutConfig.mode === LAYOUT_MODE.SIDE
})

// 混合布局模式
const isMixedLayout = computed(() => {
  return layoutConfig.mode === LAYOUT_MODE.MIXED
})
// 两侧布局模式
const isTwoSideLayout = computed(() => {
  return layoutConfig.mode === LAYOUT_MODE.TOW_SIDE
})
</script>

<style lang="less" scoped>
.app-layout {
  width: 100%;
  height: 100%;
  display: flex;
  color: v-bind(colorTextBase);
  background-color: v-bind(colorBgBase);

  &.app-layout--mixed {
    :deep(.app-side__content) {
      margin-top: 8px;
    }
  }

  .app-layout__main {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;

    .app-layout__wrapper {
      display: flex;
      overflow: hidden;

      .app-layout__content {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
      }
    }
  }
}
</style>
