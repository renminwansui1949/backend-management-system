<script setup>
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider as AConfigProvider } from 'ant-design-vue'
import { useThemeStore } from '@/stores/theme'
import { useAppStore } from '@/stores/app.js'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import { theme } from 'ant-design-vue'
import { computed } from 'vue'
const { useToken } = theme
const { token } = useToken()
const appStore = useAppStore()
const themeStore = useThemeStore()

const colorPrimary = computed(() => token.value.colorPrimary)

watch(
  () => colorPrimary.value,
  (val) => {
    document.documentElement.style.setProperty('--color-primary', val)
  },
  { immediate: true },
)
</script>

<template>
  <AConfigProvider
    :theme="{
      algorithm: themeStore.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: themeStore.themeConfig.primaryColor,
      },
    }"
    :locale="zhCN"
  >
    <router-view v-slot="{ Component }">
      <transition :name="appStore.appConfig.transitionName" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </AConfigProvider>
</template>

<style>
::view-transition-new(root),
::view-transition-old(root) {
  /* 关闭默认动画，否则影响自定义动画的执行 */
  animation: none !important;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2147483646;
}

.light::view-transition-old(root) {
  z-index: 2147483646;
}
.light::view-transition-new(root) {
  z-index: 1;
}
</style>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#nprogress .bar {
  background: var(--color-primary) !important;
}

#nprogress .peg {
  box-shadow:
    0 0 10px var(--color-primary),
    0 0 5px var(--color-primary);
}

#nprogress .spinner-icon {
  border-top-color: var(--color-primary);
  border-left-color: var(--color-primary);
}
</style>
