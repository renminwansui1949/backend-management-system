import { ref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import NProgress from 'nprogress'

/**
 * 刷新页面 主要逻辑是使用一个动态的Key 来刷新  <component :is="Component" :key="refreshStore.refreshKey" />组件
 * 然后使用 NProgress 显示一个加载动作
 *
 * src/components/pro-layout/app-content/index.vue
 */
export const useRefreshStore = defineStore('refresh', () => {
  const refreshKey = ref(Date.now())

  const updateRefreshKey = () => {
    NProgress.start()
    refreshKey.value = Date.now()

    nextTick(() => {
      NProgress.done()
    })
  }

  return { refreshKey, updateRefreshKey }
})
