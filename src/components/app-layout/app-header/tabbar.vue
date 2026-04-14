<template>
  <div class="tabbar-container">
    <!-- https://cn.vuejs.org/examples/#list-transition 动画示例 -->
    <div
      class="tabbar-content"
      ref="scrollbarRef"
      :class="{
        'tabs-chrome__theme': layoutStore.layoutConfig.tabsMode === TABBAR_MODE.CHROME,
        'tabs-card__theme': layoutStore.layoutConfig.tabsMode === TABBAR_MODE.CARD,
      }"
      @wheel.prevent="handleWheel"
    >
      <transition-group
        leave-to-class="translate-x--5 scale-95  opacity-0"
        enter-from-class="translate-x--5 scale-45 opacity-0"
        move-class="transition-[opacity,transform]! duration-300 ease"
        enter-active-class="transition-[opacity,transform] duration-300 ease"
        leave-active-class="transition-[opacity,transform] duration-300 ease"
        @before-leave="onBeforeLeave"
      >
        <div
          v-for="(item, idx) in tabs"
          :key="item"
          @click="onTabClick(item.path)"
          style="height: 100%"
          :class="`tab-${idx}`"
        >
          <a-dropdown :trigger="['contextmenu']">
            <div class="tabbar-item" :class="{ 'is-active': route.path === item.path }">
              <component :is="getRouterIcon(item.path)"></component>
              <span class="tabbar-item__title">
                {{ item.meta.title }}
              </span>
              <CloseOutlined @click.stop="remove(idx)" v-if="!item.meta.fixedInTabs" />
              <i class="iconfont" v-else>&#xe9ba;</i>
            </div>

            <template #overlay>
              <a-menu @click="handleMenuClick">
                <!-- 只能通过key拼接的方式，在click 的时候获取到对应的item信息 -->
                <a-menu-item
                  :key="generateMenuItemKey(MENU_ITEM_MAP.TOGGLEFIXED, item.path, idx)"
                  v-if="!item.meta.fixedInTabs"
                >
                  <i class="iconfont">&#xe9ba;</i>
                  固定
                </a-menu-item>
                <a-menu-item
                  :key="generateMenuItemKey(MENU_ITEM_MAP.TOGGLEFIXED, item.path, idx)"
                  v-if="item.meta.fixedInTabs"
                >
                  <i class="iconfont">&#xe608;</i>
                  取消固定
                </a-menu-item>
                <a-menu-item :key="generateMenuItemKey(MENU_ITEM_MAP.CLOSELEFT, item.path, idx)">
                  <i class="iconfont">&#xe81b;</i>
                  关闭左侧
                </a-menu-item>
                <a-menu-item :key="generateMenuItemKey(MENU_ITEM_MAP.CLOSERIGHT, item.path, idx)">
                  <i class="iconfont">&#xe7a1;</i>
                  关闭右侧
                </a-menu-item>
                <a-menu-item :key="generateMenuItemKey(MENU_ITEM_MAP.CLOSEOTHER, item.path, idx)">
                  <i class="iconfont">&#xe618;</i>
                  关闭其他
                </a-menu-item>
                <a-menu-item :key="generateMenuItemKey(MENU_ITEM_MAP.OPEN, item.path, idx)">
                  <i class="iconfont">&#xe6c9;</i>
                  在新窗口打开
                </a-menu-item>
                <a-menu-item :key="generateMenuItemKey(MENU_ITEM_MAP.CLOSE, item.path, idx)">
                  <CloseOutlined />
                  关闭
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </transition-group>
    </div>

    <div class="tabbar-button">
      <a-button type="text" size="small" @click="toggle">
        <CompressOutlined v-if="isFullscreen" />
        <ExpandOutlined v-else />
      </a-button>
      <a-button type="text" size="small" @click="reload">
        <RedoOutlined />
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { defineOptions, ref, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  CompressOutlined,
  ExpandOutlined,
  RedoOutlined,
  CloseOutlined,
} from '@ant-design/icons-vue'

import { useLayoutStore } from '@/stores/layout'
import { useRefreshStore } from '@/stores/refresh'
import { useStoreTabs, MENU_ITEM_MAP } from '../hooks/use-tab'
import { useScroll } from '../hooks/use-scroll'

import { useHeaderStyle } from '../hooks/use-style.js'
import { useThemeToken } from '../hooks/use-theme-token'
import { TABBAR_MODE } from '@/constant/layout'

import { usePermissionStore } from '@/stores/permission'
const { menuPermission } = usePermissionStore()

defineOptions({
  name: 'TabBar',
})

const router = useRouter()
const route = useRoute()
const { tabbarHeight } = useHeaderStyle()

const { scrollbarRef, handleWheel } = useScroll()
const tabStore = useStoreTabs()
const { remove, generateMenuItemKey, getMenuItemInfo, toggleFixed } = tabStore
const { tabs, reloadTabs } = toRefs(tabStore)
const { controlItemBgActive, colorPrimary, colorBgTextHover, colorBorder, colorBorderSecondary } =
  useThemeToken()
const layoutStore = useLayoutStore()
const refreshStore = useRefreshStore()

const isFullscreen = ref(false)

const getRouterIconByPath = (data, path) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    if (element?.children?.length) {
      const result = getRouterIconByPath(element.children, path)
      if (result) {
        return result
      }
    }
    if (element.path === path) {
      return element.meta.icon
    }
  }
}
/**
 * 根据Path 递归查询当前路由的 ICON
 */
const getRouterIcon = (path) => {
  return getRouterIconByPath(menuPermission, path)
}

const onTabClick = (path) => {
  router.push({ path })
}

const handleMenuClick = ({ key: joinKey }) => {
  const { key, keyPath, index } = getMenuItemInfo(joinKey)
  switch (key) {
    case MENU_ITEM_MAP.CLOSE:
      remove(index)
      break
    case MENU_ITEM_MAP.CLOSELEFT:
      remove(0, index)
      break
    case MENU_ITEM_MAP.CLOSERIGHT:
      remove(index + 1, tabs.value.length)
      break
    case MENU_ITEM_MAP.CLOSEOTHER:
      // ps: 先删除右边的，再删除左边的 避免索引错乱
      remove(index + 1, tabs.value.length)
      remove(0, index)
      break
    case MENU_ITEM_MAP.OPEN:
      window.open(keyPath)
      break
    case MENU_ITEM_MAP.TOGGLEFIXED:
      toggleFixed(keyPath)
      break
    default:
      console.log('未知事件', key, keyPath, index)
  }
}

const toggle = () => {
  isFullscreen.value = !isFullscreen.value
  if (isFullscreen.value) {
    layoutStore.layoutConfig.showNav = false
    layoutStore.layoutConfig.showSidebar = false
  } else {
    layoutStore.layoutConfig.showNav = true
    layoutStore.layoutConfig.showSidebar = true
  }
}
function onBeforeLeave(el) {
  const dom = el
  const { offsetLeft, offsetHeight } = dom

  Object.assign(dom.style, {
    position: 'absolute',
    left: `${offsetLeft}px`,
    height: `${offsetHeight}px`,
  })
}
const reload = () => {
  refreshStore.updateRefreshKey()
}

onMounted(() => {
  // fix: 修改切换用户不刷新tabs问题
  tabStore.reloadTabs(router.currentRoute.value)
})
</script>

<style scoped lang="less">
.tabbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: v-bind(tabbarHeight);
  border-bottom: 1px solid v-bind(colorBorderSecondary);

  .tabbar-content {
    flex: 1;
    display: flex;
    padding: 0 14px;
    position: relative;
    overflow: auto;
    scrollbar-width: none;
    &.tabs-card__theme {
      height: 100%;
      padding-bottom: 2px;
      padding-top: 2px;
      gap: 4px;

      .tabbar-item {
        border-radius: 6px;
        border: 1px solid v-bind(colorBorder);

        &.is-active {
          border: 1px solid v-bind(colorPrimary);
        }
      }
    }
    &.tabs-chrome__theme {
      height: 100%;
      padding-top: 4px;

      .tabbar-item {
        border-radius: 12px 12px 0 0;

        &.is-active {
          &::before {
            content: '';
            border-radius: 100%;
            width: 20px;
            height: 20px;
            transition: box-shadow 0.3s;
            position: absolute;
            bottom: 0;
            clip-path: inset(50% -10px 0 50%);
            left: -20px;
            box-shadow: 0 30px 0 30px v-bind(controlItemBgActive);
          }

          &::after {
            content: '';
            border-radius: 100%;
            width: 20px;
            height: 20px;
            transition: box-shadow 0.3s;
            position: absolute;
            bottom: 0;
            clip-path: inset(50% 50% 0 -10px);
            right: -20px;
            box-shadow: 0 30px 0 30px v-bind(controlItemBgActive);
          }
        }
      }
    }

    .tabbar-item {
      cursor: pointer;
      align-items: center;
      padding: 0 14px;
      font-size: 12px;
      height: 100%;
      transition:
        color 0.3s,
        box-shadow 0.3s,
        background-color 0.3s;
      display: flex;
      gap: 6px;
      position: relative;

      &.is-active {
        background-color: v-bind(controlItemBgActive);
        color: v-bind(colorPrimary);

        &:hover {
          background-color: v-bind(controlItemBgActive);
        }
      }

      .tabbar-item__title {
        font-size: 14px;
        white-space: nowrap;
      }

      &:hover {
        background-color: v-bind(colorBgTextHover);
      }
    }
  }

  .tabbar-button {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
}

/* ==================== 基础工具类 ==================== */

/* opacity */
.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

/* transform - translate */
.translate-x--5 {
  transform: translateX(-20px);
}

.translate-x-0 {
  transform: translateX(0);
}

/* transform - scale */
.scale-95 {
  transform: scale(0.95);
}

.scale-50 {
  transform: scale(0.5);
}

.scale-100 {
  transform: scale(1);
}

/* transition property */
.transition-\[opacity\,transform\] {
  transition-property: opacity, transform;
}

.transition-\[opacity\,transform\]\! {
  transition-property: opacity, transform !important;
}

/* duration */
.duration-300 {
  transition-duration: 300ms;
}

/* easing */
.ease {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.ease-out {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
