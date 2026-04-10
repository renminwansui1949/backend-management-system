import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import { useThemeStore } from '@/stores/theme'

export const useThemeToken = () => {
  const { useToken } = theme
  const { token } = useToken()
  const themeStore = useThemeStore()

  /**
   * 边框色 浅
   */
  const colorBorderSecondary = computed(() => token.value.colorBorderSecondary)

  /**
   * 边框色 正常
   */
  const colorBorder = computed(() => token.value.colorBorder)

  /**
   * 文本色
   */
  const colorTextBase = computed(() => token.value.colorTextBase)

  /**
   * 背景色
   */
  const colorBgBase = computed(() => token.value.colorBgBase)

  /**
   * 布局背景色
   */
  const colorBgLayout = computed(() =>
    themeStore.isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgb(250, 250, 252)',
  )

  /**
   * 信息色的浅色背景颜色
   */

  const controlItemBgActive = computed(() => token.value.controlItemBgActive)

  /**
   * 主题色
   */
  const colorPrimary = computed(() => token.value.colorPrimary)

  /**
   * tab Hover 颜色
   */
  const colorBgTextHover = computed(() => token.value.colorBgTextHover)

  /**
   * 辅助色
   */
  const colorTextSecondary = computed(() => token.value.colorTextSecondary)
  return {
    colorBorderSecondary,
    colorBorder,
    colorTextBase,
    colorBgBase,
    colorBgLayout,
    controlItemBgActive,
    colorPrimary,
    colorBgTextHover,
    colorTextSecondary,
  }
}
