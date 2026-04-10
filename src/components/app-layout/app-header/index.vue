<template>
  <div class="app-header" :class="{ 'app-header--fixed': layoutStore.layoutConfig.navFixed }">
    <div
      :class="`app-header__nav app-header__nav--${layoutStore.layoutConfig.mode}`"
      v-if="layoutStore.layoutConfig.showNav"
    >
      <div class="app-header__nav--left">
        <!-- 水平布局 不展示 菜单折叠按钮 -->
        <MenuClose v-if="!isHorizontalLayout" />
        <Breadcrumb v-if="!isHorizontalLayout" />
        <!-- 水平布局展示LOGO 信息 -->
        <ProLogo v-if="isHorizontalLayout" />

        <a-menu
          v-if="isHorizontalLayout"
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
          :items="items"
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
    <!-- 不显示顶栏后， 要能打开设置模块 -->
    <div class="app-header__tabbar" v-show="layoutStore.layoutConfig.showTabbar">
      <TabBar />
    </div>
  </div>
</template>

<script setup>
import { defineOptions, computed, ref, watch } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { LAYOUT_MODE } from '@/constant/layout'
import { useRoute, useRouter } from 'vue-router'

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

import { usePermissionStore } from '@/stores/permission'
const { menuPermission } = usePermissionStore()

defineOptions({
  name: 'AppHeader',
})

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()

const { colorBorderSecondary, colorBgBase } = useThemeToken()
const { navHeight, tabbarHeight } = useHeaderStyle()

const selectedKeys = ref([])

const isHorizontalLayout = computed(() => {
  // 水平布局 不显示 侧边栏
  return layoutStore.layoutConfig.mode === LAYOUT_MODE.HORIZONTAL
})

const formatSideDynamicRouter = (data = menuPermission) => {
  const result = []

  data.forEach((item) => {
    if (item.hidden) return // 配置不显示的菜单
    result.push({
      icon: item.meta.icon,
      key: item.path,
      label: item.meta.title,
      title: item.meta.title,
      isFrame: item.meta.isFrame,
      children: item.children ? formatSideDynamicRouter(item.children) : null,
    })
  })

  return result
}

const items = ref(formatSideDynamicRouter(menuPermission))

const handleMenuClick = (e) => {
  if (e.item.isFrame) {
    window.open(e.key)
  } else {
    router.push(e.key)
  }
}
watch(
  () => route.path,
  () => {
    // 针对数据字段特殊处理下
    const selectRouterPath = route.path.startsWith('/system/dict') ? '/system/dict' : route.path
    selectedKeys.value = [selectRouterPath]
  },
  { immediate: true },
)
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

    &.app-header__nav--horizontal {
      :deep(.app-logo) {
        width: 224px;
      }

      :deep(.ant-menu-horizontal) {
        li::after {
          display: none;
        }
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
