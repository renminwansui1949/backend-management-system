import { computed } from 'vue'

import { LAYOUT_MODE } from '@/constant/layout'
import { useLayoutStore } from '@/stores/layout'

/**
 * 用来处理Side计算样式hooks
 */
export const useSideStyle = () => {
  const layoutStore = useLayoutStore()

  /**
   * 显示侧边logo
   */
  const isShowSideLogo = computed(() => {
    /**
     * 显示：
     * VERTICAL 显示侧边LOGO
     * SIDE 显示侧边LOGO 但不显示logo title
     *
     * 不显示：
     * MIXED 显示 Header LOGO
     * HORIZONTAL 显示Header LOGO
     */

    if (!layoutStore.layoutConfig.showLogo) {
      return false
    }
    return (
      layoutStore.layoutConfig.mode === LAYOUT_MODE.VERTICAL ||
      layoutStore.layoutConfig.mode === LAYOUT_MODE.SIDE
    )
  })
  const sideWidth = computed(() => {
    /***
     * 侧边宽度
     */

    if (!layoutStore.layoutConfig.showSidebar) {
      return `0px`
    }
    const width = layoutStore.layoutConfig.collapsed
      ? layoutStore.layoutConfig.sidebarCollapsedWidth
      : layoutStore.layoutConfig.sidebarWidth
    return `${width}px`
  })

  const sideMarginTop = computed(() => {
    return isShowSideLogo.value ? `0px` : `50px`
  })

  const sideHeight = computed(() => {
    return `calc(100% - ${sideMarginTop.value})`
  })

  const sidebarCollapsedShowMenuTitle = computed(() => {
    return layoutStore.layoutConfig.sidebarCollapsedShowMenuTitle
  })

  return {
    sideWidth,
    sideMarginTop,
    sideHeight,
    isShowSideLogo,
    sidebarCollapsedShowMenuTitle,
  }
}

/**
 * 用于顶部样式计算hooks
 */
export const useHeaderStyle = () => {
  const layoutStore = useLayoutStore()

  const navHeight = computed(() => {
    return `${layoutStore.layoutConfig.navHeight}px`
  })

  const tabbarHeight = computed(() => {
    return `${layoutStore.layoutConfig.tabbarHeight}px`
  })

  return {
    navHeight,
    tabbarHeight,
  }
}
