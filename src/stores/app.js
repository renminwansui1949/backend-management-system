import { reactive } from 'vue'
import { defineStore } from 'pinia'

import { usePreferenceLocalStore } from './preference-local'

export const useAppStore = defineStore('app', () => {
  const { preferenceConfig } = usePreferenceLocalStore()
  const appConfig = reactive(preferenceConfig.app)

  return { appConfig }
})
