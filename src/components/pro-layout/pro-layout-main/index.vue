<template>
  <div class="pro-layout-main">
    <slot></slot>
  </div>
</template>

<script setup>
import { theme } from 'ant-design-vue'

const { useToken } = theme
const { token } = useToken()
</script>

<style lang="less" scoped>
.pro-layout-main {
  background: v-bind('token.colorBgContainer');
  flex: 1;
  // height: 100%;
}
</style>
