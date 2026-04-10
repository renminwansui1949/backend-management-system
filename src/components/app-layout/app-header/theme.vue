<template>
  <div class="theme-container">
    <a-tooltip placement="bottom">
      <template #title>
        <span>暗黑主题</span>
      </template>
      <a-button
        type="text"
        size="small"
        v-if="!themeStore.isDark"
        @click="themeStore.toggleThemeModeWithAnimation"
      >
        <span class="anticon">
          <i class="iconfont">&#xe62c;</i>
        </span>
      </a-button>
      <a-button type="text" size="small" v-else @click="themeStore.toggleThemeModeWithAnimation">
        <span class="anticon">
          <i class="iconfont">&#xe672;</i>
        </span>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script setup>
import { defineOptions } from 'vue'
import { useThemeStore } from '@/stores/theme'

defineOptions({
  name: 'Theme',
})

const themeStore = useThemeStore()
</script>
