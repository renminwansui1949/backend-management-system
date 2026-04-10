import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useResizeObserver } from '@vueuse/core'

import { useStoreTabs } from './use-tab'
export const useScroll = () => {
  const scrollbarRef = ref(null)

  const route = useRoute()
  const { tabs } = useStoreTabs()

  const handleWheel = (event) => {
    if (scrollbarRef.value) {
      scrollbarRef.value.scrollBy({
        left: Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY,
      })
    }
  }

  const currentActiveIndex = computed(() => {
    return tabs.findIndex((item) => item.path === route.path)
  })

  const updateTabsScroll = () => {
    const container = scrollbarRef.value.offsetWidth || 0 //
    const activeDom = scrollbarRef.value?.querySelector(`.tab-${currentActiveIndex.value}`)
    const offsetLeft = activeDom?.offsetLeft || 0

    scrollbarRef.value.scrollTo({
      left: offsetLeft - container / 2 + (activeDom?.offsetWidth || 1) / 2,
      behavior: 'smooth',
    })
  }

  watch(
    () => route.path,
    () => {
      updateTabsScroll()
    },
  )

  onMounted(() => {
    nextTick(() => {
      updateTabsScroll()
    })
  })

  useResizeObserver(
    () => {
      return scrollbarRef.value
    },
    () => {
      updateTabsScroll()
    },
  )

  return {
    scrollbarRef,
    handleWheel,
    updateTabsScroll,
  }
}
