import { watch, reactive } from 'vue'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'

import { getPreferenceConfig as getDefaultPreferenceConfig } from '@/constant/preference'

const LOCAL_PERFERENCE = 'LOCAL_PERFERENCE'

/**
 * 用来处理配置数据 《持久化》
 * `preferenceConfig`引用数据类型，来监听是否被更改
 */
export const usePreferenceLocalStore = defineStore('local', () => {
  const getPreferenceConfig = () => {
    const preferenceConfig = localStorage.getItem(LOCAL_PERFERENCE)

    // ps: 因为国际化 需要把本地存储的title字段处理下
    if (preferenceConfig) {
      const defaultPreference = getDefaultPreferenceConfig()
      const localPreference = JSON.parse(preferenceConfig)
      return {
        ...localPreference,
        app: {
          ...localPreference.app,
          title: defaultPreference?.app?.title || localPreference.app.title,
        },
      }
    }
    return cloneDeep(getDefaultPreferenceConfig())
  }

  const preferenceConfig = reactive(getPreferenceConfig())

  const setPreferenceConfig = () => {
    localStorage.setItem(LOCAL_PERFERENCE, JSON.stringify(preferenceConfig))
  }

  watch(
    () => preferenceConfig,
    () => {
      setPreferenceConfig()
    },
    {
      deep: true,
      immediate: true,
    },
  )

  const reloadPreferenceConfig = () => {
    /**
     * 重新加载配置
     */
    Object.assign(preferenceConfig.app, getDefaultPreferenceConfig().app)
    Object.assign(preferenceConfig.theme, getDefaultPreferenceConfig().theme)
    Object.assign(preferenceConfig.layout, getDefaultPreferenceConfig().layout)
    setPreferenceConfig()
  }

  return {
    preferenceConfig,
    reloadPreferenceConfig,
  }
})
