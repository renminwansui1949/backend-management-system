<template>
  <div class="menu-close" style="margin-right: 8px">
    <a-button
      type="text"
      size="small"
      @click="() => (layoutStore.layoutConfig.showSidebar = !layoutStore.layoutConfig.showSidebar)"
    >
      <MenuOutlined />
    </a-button>
  </div>
</template>

<script setup>
import { defineOptions } from 'vue'
import { MenuOutlined } from '@ant-design/icons-vue'
import { useLayoutStore } from '@/stores/layout'

defineOptions({
  name: 'MenuClose',
})

const layoutStore = useLayoutStore()
</script>
