<template>
  <div class="pro-layout">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineOptions } from 'vue'
import { theme } from 'ant-design-vue'

defineOptions({
  name: 'ProLayout',
})

const { useToken } = theme
const { token } = useToken()
</script>

<style lang="less" scoped>
.pro-layout {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  // background-color: v-bind('token.colorBgBase');
}
</style>
