import { useLayoutStore } from '@/stores/layout'
import { computed } from 'vue'

export const useCollapsed = () => {
  const layoutStore = useLayoutStore()
  const isCollapsed = computed(() => layoutStore.layoutConfig.collapsed)

  const toggleCollapsed = () => {
    layoutStore.layoutConfig.collapsed = !layoutStore.layoutConfig.collapsed
  }

  return {
    isCollapsed,
    toggleCollapsed,
  }
}
