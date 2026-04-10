<template>
  <div class="log-item">
    <div class="log-item__header">
      <!-- 动态渲染 Ant Design Vue 图标 -->
      <component :is="icon" v-if="icon" />
      <span>{{ title }}</span>
    </div>
    <div class="log-item__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: '日志',
  },
  icon: {
    type: [String, Object, Function], // Ant Design Vue 图标是组件对象
    default: null,
  },
})
</script>
<style scoped>
.log-item {
  border: 1px solid #ebeef5;
  border-radius: 5px;
  margin-bottom: 20px;
}
.log-item__header {
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  background: #f7f9fb;
  padding: 10px 0 10px 10px;
}
.log-item__header span {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}
</style>