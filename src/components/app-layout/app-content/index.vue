<template>
  <div class="app-content">
    <router-view v-slot="{ Component }">
      <transition :name="appStore.appConfig.transitionName" mode="out-in">
        <keep-alive :include="routeCacheStore.cachedViews">
          <component :is="Component" :key="currentComponentKey" />
        </keep-alive>
      </transition>
    </router-view>

    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed, defineOptions, watch, ref } from 'vue'

import { useLayoutStore } from '@/stores/layout'
import { useAppStore } from '@/stores/app.js'
import { useRefreshStore } from '@/stores/refresh'
import { useRouteCacheStore } from '@/stores/route-cache.js'

import { useThemeToken } from '../hooks/use-theme-token.js'

defineOptions({
  name: 'AppContent',
})

const router = useRouter()
const routeCacheStore = useRouteCacheStore()
const { colorBgLayout } = useThemeToken()
const layoutStore = useLayoutStore()
const appStore = useAppStore()
const refreshStore = useRefreshStore()

/**
 * 如果Nav定位模式，则需要设置main的margin-top
 */
const mainMarginTop = computed(() => {
  const navHeight = layoutStore.layoutConfig.navHeight
  const tabbarHeight = layoutStore.layoutConfig.tabbarHeight

  let navMarginTop = 0
  if (layoutStore.layoutConfig.showNav) {
    navMarginTop += navHeight
  }
  if (layoutStore.layoutConfig.showTabbar) {
    navMarginTop += tabbarHeight
  }
  return `${navMarginTop}px`
})

const mainMarginBottom = computed(() => {
  const footerHeight = layoutStore.layoutConfig.footerHeight
  const showFooter = layoutStore.layoutConfig.showFooter
  if (showFooter) {
    return `${footerHeight}px`
  }
  return `0px`
})

const cachedMap = ref({})
const currentComponentKey = computed(() => {
  const name = router.currentRoute.value.name
  if (cachedMap.value[name]) {
    return cachedMap.value[name]
  }
  cachedMap.value[name] = name
  return name
})

watch(
  () => refreshStore.refreshKey,
  () => {
    const name = router.currentRoute.value.name
    cachedMap.value[name] = `${name}_${refreshStore.refreshKey}`
  },
)
</script>

<style lang="less" scoped>
.app-content {
  width: 100%;
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  background-color: v-bind('colorBgLayout');
  min-height: calc(100vh - v-bind(mainMarginTop) - v-bind(mainMarginBottom));
  display: flex;
  flex-direction: column;
  padding: 16px;

  > div {
    flex: 1;
  }
}
</style>
