<template>
  <aside class="app-side">
    <!-- 侧边双栏第一级默认不展开 -->
    <div style="" class="app-side__leave1" v-if="isTwoSideLayout">
      <ProLogo :isShowTitle="false" />
      <div
        class="app-side__content"
        :class="{ 'menu-collapsed__title': sidebarCollapsedShowMenuTitle }"
      >
        <div class="app-side__menu">
          <Simplebar data-simplebar-auto-hide="true" class="sidebar-simplebar">
            <a-menu
              v-model:selectedKeys="selectedKeys"
              style="width: 100%"
              mode="inline"
              v-if="sideLevel1Menu.length"
              :inline-collapsed="true"
              :items="sideLevel1Menu"
              @click="handleMenuClick"
            ></a-menu>
          </Simplebar>
        </div>
      </div>
    </div>
    <!-- 侧边双栏布局二级，侧边栏、混合布局使用 -->
    <div class="app-side__leave2" v-if="sideLevel2Menu.length">
      <ProLogo v-if="isShowSideLogo" :isShowTitle="!isCollapsed" />
      <div
        class="app-side__content"
        :class="{ 'menu-collapsed__title': sidebarCollapsedShowMenuTitle }"
      >
        <div class="app-side__menu">
          <Simplebar data-simplebar-auto-hide="true" class="sidebar-simplebar">
            <a-menu
              v-model:selectedKeys="selectedKeys"
              style="width: 100%"
              mode="inline"
              :key="formatSideLevel2Menu"
              :inline-collapsed="isCollapsed"
              v-if="formatSideLevel2Menu.length"
              :items="formatSideLevel2Menu"
              @click="handleMenuClick"
            ></a-menu>
          </Simplebar>
        </div>
        <div class="app-side__content--collapsed">
          <a-button type="text" @click="toggleCollapsed" size="small">
            <MenuUnfoldOutlined v-if="isCollapsed" />
            <MenuFoldOutlined v-else />
          </a-button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { defineOptions, computed } from 'vue'
import Simplebar from 'simplebar-vue'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import ProLogo from '../app-logo/index.vue'
import { useLayoutStore } from '@/stores/layout'
import { useThemeToken } from '../hooks/use-theme-token.js'
import { useCollapsed } from '../hooks/use-collapsed'
import { useSideStyle } from '../hooks/use-style'
import { useMenu } from '../hooks/use-menu'
import { LAYOUT_MODE } from '@/constant/layout'

import { cloneDeep } from 'lodash'

defineOptions({
  name: 'AppSide',
})

const { sideWidth, isShowSideLogo, sidebarCollapsedShowMenuTitle, sidebarCollapsedWidth } =
  useSideStyle()
const { colorBorderSecondary } = useThemeToken()
const { isCollapsed, toggleCollapsed } = useCollapsed()
const layoutStore = useLayoutStore()

const { allMenu, leave1Menu, leave2AndSubLevel, selectedKeys, handleMenuClick } = useMenu()

const sideLevel2Menu = computed(() => {
  if (
    layoutStore.layoutConfig.mode === LAYOUT_MODE.MIXED ||
    layoutStore.layoutConfig.mode === LAYOUT_MODE.TOW_SIDE
  ) {
    return leave2AndSubLevel.value
  }
  return allMenu.value
})

const sideLevel1Menu = computed(() => {
  return leave1Menu.value
})

const formatSideLevel2Menu = computed(() => {
  // 是否开启侧边栏分割线
  const menus = cloneDeep(sideLevel2Menu.value)
  if (layoutStore.layoutConfig.sidebarMenuDivider && !isCollapsed.value) {
    for (let i = menus.length; i > 0; i--) {
      // 最后一个不注入分割线
      if (i !== menus.length) {
        menus.splice(i, 0, { type: 'divider' })
      }
    }
  }

  // 是否开启分组
  if (layoutStore.layoutConfig.sidebarMenuGroup && !isCollapsed.value) {
    menus.forEach((item) => {
      if (item?.children?.length) {
        item.type = 'group'
      }
    })
  }

  return menus
})

const currentSideWidth = computed(() => {
  if (!sideLevel2Menu.value.length && isMixedLayout.value) {
    return '0px'
  }
  if (!sideLevel2Menu.value.length && isTwoSideLayout.value) {
    return sidebarCollapsedWidth.value
  }
  return sideWidth.value
})

const isMixedLayout = computed(() => {
  return layoutStore.layoutConfig.mode === LAYOUT_MODE.MIXED
})

const isTwoSideLayout = computed(() => {
  return layoutStore.layoutConfig.mode === LAYOUT_MODE.TOW_SIDE
})
</script>

<style lang="less" scoped>
.app-side {
  width: v-bind(currentSideWidth);
  min-width: v-bind(currentSideWidth);
  box-sizing: border-box;
  border-right: 1px solid v-bind('colorBorderSecondary');
  transition: width 0.3s ease-in-out;
  display: flex;
  overflow: hidden;

  .app-side__leave1 {
    width: v-bind(sidebarCollapsedWidth);
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid v-bind('colorBorderSecondary');
  }

  .app-side__leave2 {
    flex: 1;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }

  /deep/.app-logo {
    justify-content: center;
  }

  /deep/.ant-menu {
    border-inline-end: none;
  }

  .menu-collapsed__title {
    /deep/.ant-menu-inline-collapsed {
      .ant-menu-item,
      .ant-menu-submenu-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 24px;
        height: 60px;
        margin-inline: 8px;
        margin-block: 8px;
        width: calc(100% - 16px);
        padding: 0;

        > .ant-menu-title-content {
          opacity: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
          font-size: 12px;
          margin-left: 0;
          width: 100%;
          overflow: hidden;
        }
      }
    }
  }

  .app-side__content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;

    .app-side__menu {
      flex: 1;
      min-height: 0;
      .sidebar-simplebar {
        height: 100%;

        // 确保内部滚动容器也有高度
        :deep(.simplebar-wrapper) {
          height: 100%;
        }

        :deep(.simplebar-mask) {
          height: 100%;
        }

        :deep(.simplebar-content-wrapper) {
          height: 100%;
        }
      }
    }

    .app-side__content--collapsed {
      padding: 8px;
      text-align: right;
    }
  }
}
</style>
