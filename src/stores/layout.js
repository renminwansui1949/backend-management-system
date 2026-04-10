import { reactive } from 'vue'
import { defineStore } from 'pinia'

import { usePreferenceLocalStore } from './preference-local'

export const useLayoutStore = defineStore('layout', () => {
  const { preferenceConfig } = usePreferenceLocalStore()
  const layoutConfig = reactive(preferenceConfig.layout)

  return { layoutConfig }
})
