<template>
  <div
    class="app-footer"
    :class="{ 'app-footer--fixed': layoutStore.layoutConfig.footerFixed }"
    v-show="layoutStore.layoutConfig.showFooter"
  >
    Copyright © 2025 chinacjf
  </div>
</template>

<script setup>
import { defineOptions, computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { useThemeToken } from '../hooks/use-theme-token.js'

const layoutStore = useLayoutStore()
const { colorBgBase } = useThemeToken()

const footerHeight = computed(() => {
  return layoutStore.layoutConfig.footerHeight + 'px'
})

defineOptions({
  name: 'AppFooter',
})
</script>

<style lang="less" scoped>
.app-footer {
  text-align: center;
  display: flex;
  align-items: center;
  background-color: v-bind(colorBgBase);
  justify-content: center;
  width: 100%;
  font-size: 14px;
  min-height: v-bind(footerHeight);

  &.app-footer--fixed {
    position: sticky;
    bottom: 0;
  }
}
</style>
