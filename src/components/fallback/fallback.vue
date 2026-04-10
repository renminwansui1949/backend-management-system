<template>
  <div class="fallback-container">
    <div class="fallback-content">
      <div class="fallback-icon">
        <fallback-403 v-if="type === '403'" />
        <fallback-404 v-else-if="type === '404'" />
        <fallback-500 v-else-if="type === '500'" />
      </div>
      <div class="fallback-text">
        <div v-if="title" class="fallback-text__title">
          {{ title }}
        </div>
        <div v-if="description" class="fallback-text__description">
          {{ description }}
        </div>
      </div>
      <div class="fallback-button">
        <a-button type="primary" @click="onClick">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import Fallback403 from './403.vue'
import Fallback404 from './404.vue'
import Fallback500 from './500.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '403',
  },
})

const router = useRouter()

const title = computed(() => {
  if (props.title) {
    return props.title
  }
  switch (props.type) {
    case '403':
      return '访问被拒绝'
    case '404':
      return '页面不存在'
    case '500':
      return '服务器错误'
    default:
      return ''
  }
})

const description = computed(() => {
  if (props.description) {
    return props.description
  }
  switch (props.type) {
    case '403':
      return '您没有权限访问此页面'
    case '404':
      return '您访问的页面未找到'
    case '500':
      return '服务器开小差了，请稍后再试'
    default:
      return ''
  }
})

const onClick = () => {
  router.push({ path: '/home' })
}
</script>

<style lang="less" scoped>
.fallback-container {
  .fallback-content {
    .fallback-icon {
      width: 384px;
      height: 288px;
      margin: 0 auto;

      :deep(.size-full) {
        width: 100%;
        height: 100%;
      }
    }

    .fallback-text {
      margin-top: 32px;
      text-align: center;

      .fallback-text__title {
        font-weight: 600;
        margin-bottom: 16px;
        font-size: 18px;
      }

      .fallback-text__description {
        font-size: 14px;
      }
    }

    .fallback-button {
      margin-top: 32px;
      text-align: center;
    }
  }
}
</style>
