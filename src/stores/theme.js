import { reactive, computed, nextTick, watch, watchEffect } from 'vue'
import { defineStore } from 'pinia'

import { usePreferenceLocalStore } from './preference-local'
import { usePreferredDark } from '@vueuse/core'

const THEME_MAP = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
}
export const useThemeStore = defineStore('theme', () => {
  const systemThemeIsDark = usePreferredDark()

  const { preferenceConfig, reloadPreferenceConfig } = usePreferenceLocalStore()
  const themeConfig = reactive(preferenceConfig.theme)

  const isDark = computed(() => {
    return (
      themeConfig.mode === THEME_MAP.DARK ||
      (themeConfig.mode === THEME_MAP.AUTO && systemThemeIsDark.value)
    )
  })

  const toggleThemeMode = () => {
    const root = document.documentElement
    root.classList.remove(themeConfig.mode)
    themeConfig.mode = themeConfig.mode === THEME_MAP.DARK ? THEME_MAP.LIGHT : THEME_MAP.DARK
  }

  /**
   * 切换过渡动画 一定要定义一些CSS样式
   * 请查看 src/App.vue
   */
  function toggleThemeModeWithAnimation(event) {
    if (
      !('startViewTransition' in document) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggleThemeMode()
      return
    }
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const transition = document.startViewTransition(async () => {
      toggleThemeMode()
      return nextTick()
    })
    transition.ready.then(() => {
      const clipPath = [`circle(0 at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      document.documentElement.animate(
        {
          clipPath: isDark.value ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isDark.value
            ? '::view-transition-new(root)'
            : '::view-transition-old(root)',
        },
      )
    })
  }

  watchEffect(() => {
    const grayscaleStyle = themeConfig.grayscale ? 'grayscale(100%)' : 'grayscale(0%)'
    const colorWeaknessStyle = themeConfig.colorWeakness ? 'invert(80%)' : 'invert(0%)'
    document.documentElement.style.filter = `${grayscaleStyle} ${colorWeaknessStyle}`
  }, [themeConfig.colorWeakness, themeConfig.grayscale])

  watch(
    () => isDark.value,
    () => {
      const root = document.documentElement
      root.classList.add(isDark.value ? THEME_MAP.DARK : THEME_MAP.LIGHT)
    },
    {
      immediate: true,
    },
  )

  return {
    themeConfig,
    isDark,
    toggleThemeModeWithAnimation,
    toggleThemeMode,
    reloadPreferenceConfig,
  }
})
