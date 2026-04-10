import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { uniq } from 'lodash'

function getRouteComponentName(route) {
  const currentRoute = route.matched[route.matched.length - 1]
  const currentRouteComponent = currentRoute?.components?.default
  return currentRouteComponent?.name
}

export const useRouteCacheStore = defineStore('route-cache', () => {
  const router = useRouter()
  const cachedViews = ref([])

  const setRouteCachedViews = (route) => {
    if (!route.meta.noCache) {
      // 需要缓存
      const componentName = getRouteComponentName(route)
      cachedViews.value = uniq([...cachedViews.value, componentName])
    }
  }

  // ps: 【缺陷】 如果首次刷新刚好在缓存的页面， 不会被收集到
  router.beforeResolve((to) => {
    setRouteCachedViews(to)
  })

  return { cachedViews }
})
