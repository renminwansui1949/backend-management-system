<template>
  <div class="app-header" :class="{ 'app-header--fixed': layoutStore.layoutConfig.navFixed }">
    <div
      :class="`app-header__nav app-header__nav--${layoutStore.layoutConfig.mode}`"
      v-if="layoutStore.layoutConfig.showNav"
    >
      <div class="app-header__nav--left">
        <!-- 水平布局 不展示 菜单折叠按钮 -->
        <MenuClose v-if="!isShowHorizontal" />
        <Breadcrumb v-if="!isShowHorizontal" />
        <!-- 水平布局展示LOGO 信息 -->
        <ProLogo v-if="isShowHorizontal" />

        <a-menu
          v-if="isShowHorizontal && currentItems.length"
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
          :items="currentItems"
          :key="currentItems"
          @click="handleMenuClick"
        ></a-menu>
      </div>

      <div class="app-header__nav--right">
        <Setting />
        <Theme />
        <Language />
        <Fullscreen />
        <UserAvatar />
      </div>
    </div>
    <div
      class="app-header__tabbar"
      v-if="isHorizontal || isSideLayout || isTwoSideLayout"
      v-show="layoutStore.layoutConfig.showTabbar"
    >
      <TabBar />
    </div>
  </div>
</template>

<script setup>
import { defineOptions, computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { LAYOUT_MODE } from '@/constant/layout'

import Breadcrumb from './breadcrumb.vue'
import MenuClose from './menu-close.vue'
import UserAvatar from './user-avatar.vue'
import Fullscreen from './fullscreen.vue'
import Language from './language.vue'
import Theme from './theme.vue'
import TabBar from './tabbar.vue'
import Setting from './setting.vue'
import ProLogo from '../app-logo/index.vue'

import { useHeaderStyle } from '../hooks/use-style.js'
import { useThemeToken } from '../hooks/use-theme-token.js'
import { useMenu } from '../hooks/use-menu'

defineOptions({
  name: 'AppHeader',
})

const layoutStore = useLayoutStore()
const { allMenu, leave1Menu, selectedKeys, handleMenuClick } = useMenu()

const { colorBorderSecondary, colorBgBase } = useThemeToken()
const { navHeight, tabbarHeight } = useHeaderStyle()

// 控制水平菜单的数据项
const currentItems = computed(() => {
  if (layoutStore.layoutConfig.mode === LAYOUT_MODE.HORIZONTAL) {
    return allMenu.value
  }
  return leave1Menu.value
})

// 是否显示水平菜单
const isShowHorizontal = computed(() => {
  return isMixedLayout.value || isHorizontal.value
})

const isMixedLayout = computed(() => {
  return layoutStore.layoutConfig.mode === LAYOUT_MODE.MIXED
})

const isHorizontal = computed(() => {
  return layoutStore.layoutConfig.mode === LAYOUT_MODE.HORIZONTAL
})

const isSideLayout = computed(() => {
  return layoutStore.layoutConfig.mode === LAYOUT_MODE.SIDE
})

const isTwoSideLayout = computed(() => {
  return layoutStore.layoutConfig.mode === LAYOUT_MODE.TOW_SIDE
})
</script>

<style lang="less" scoped>
.app-header {
  width: 100%;
  background-color: v-bind(colorBgBase);
  &.app-header--fixed {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .app-header__nav {
    height: v-bind(navHeight);
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid v-bind('colorBorderSecondary');

    :deep(.app-logo) {
      width: 224px;
    }

    :deep(.ant-menu-horizontal) {
      border-bottom: none;
      li::after {
        display: none;
      }
    }

    .app-header__nav--left {
      display: flex;
      align-items: center;
    }

    .app-header__nav--right {
      display: flex;
      gap: 2px;
      align-items: center;
    }
  }

  .app-header__tabbar {
    height: v-bind(tabbarHeight);
    border-bottom: 1px solid v-bind(colorBorderSecondary);
  }
}
</style>
