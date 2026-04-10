<template>
  <a-spin tip="加载中..." :spinning="loading">
    <ProLayout>
      <ProLayoutMain>
        <iframe class="size-full border-none overflow-hidden" :src="url" @load="loading = false" />
      </ProLayoutMain>
    </ProLayout>
  </a-spin>
</template>

<script setup>
import { ProLayout, ProLayoutMain } from '@/components/pro-layout/index'
import { ref } from 'vue'

defineProps({
  url: {
    type: String,
    required: true,
  },
})

const loading = ref(true)
</script>

<style lang="less" scoped>
.size-full {
  width: 100%;
  height: 100%;
}
.border-none {
  border: none;
}
.overflow-hidden {
  overflow: hidden;
}

:deep(.ant-spin-container) {
  height: 100%;
}
</style>
