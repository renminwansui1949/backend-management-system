<template>
  <aside class="app-side">
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
            :inline-collapsed="isCollapsed"
            :items="sideDynamicRouter"
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
  </aside>
</template>

<script setup>
import { defineOptions, computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Simplebar from 'simplebar-vue'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import ProLogo from '../app-logo/index.vue'
import { useLayoutStore } from '@/stores/layout'
import { useThemeToken } from '../hooks/use-theme-token.js'
import { useCollapsed } from '../hooks/use-collapsed'
import { useSideStyle } from '../hooks/use-style'

import { usePermissionStore } from '@/stores/permission'
const { menuPermission } = usePermissionStore()

const route = useRoute()
const router = useRouter()

defineOptions({
  name: 'AppSide',
})

const { sideWidth, isShowSideLogo, sidebarCollapsedShowMenuTitle } = useSideStyle()
const { colorBorderSecondary } = useThemeToken()
const { isCollapsed, toggleCollapsed } = useCollapsed()
const layoutStore = useLayoutStore()

const selectedKeys = ref([])

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

const sideDynamicRouter = computed(() => {
  // 是否开启分割线
  const menus = formatSideDynamicRouter(menuPermission)
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
.app-side {
  width: v-bind(sideWidth);
  min-width: v-bind(sideWidth);
  box-sizing: border-box;
  border-right: 1px solid v-bind('colorBorderSecondary');
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;

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
    min-height: 0; // ✅ 关键：允许 flex 子项收缩

    .app-side__menu {
      flex: 1;
      min-height: 0; // ✅ 关键：允许 flex 子项收缩

      // ✅ SimpleBar 需要明确高度
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
