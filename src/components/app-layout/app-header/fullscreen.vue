<template>
  <div class="fullscreen-container">
    <a-tooltip placement="bottom">
      <template #title>
        <span> {{ !isFullscreen ? '全屏' : '退出全屏' }}</span>
      </template>
      <a-button type="text" size="small" @click="toggle">
        <CompressOutlined v-if="isFullscreen" />
        <ExpandOutlined v-else />
      </a-button>
    </a-tooltip>
  </div>
</template>

<script setup>
import { defineOptions } from 'vue'
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons-vue'

import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const { toggle, isFullscreen } = useFullscreen()
</script>
