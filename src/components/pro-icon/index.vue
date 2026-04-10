<!-- ProIcon.vue -->
<template>
  <component :is="renderIcon" />
</template>

<script setup>
import { computed, h } from 'vue'
import * as AntIcons from '@ant-design/icons-vue'

import { useAssetsSvg } from '@/hooks/use-assets-svg'

const props = defineProps({
  // 图标名称/类名/unicode
  name: {
    type: String,
    required: true,
  },

  // 颜色
  color: String,

  // 尺寸
  size: {
    type: [String, Number],
    default: 16,
  },

  // 旋转
  spin: Boolean,

  // SVG 文件夹路径
  svgPath: {
    type: String,
    default: '/src/assets/icons/',
  },

  // 自定义样式
  customStyle: Object,
})

// 尺寸处理
const iconSize = computed(() => {
  const s = props.size
  return typeof s === 'number' ? `${s}px` : s
})

// 通用样式
const baseStyle = computed(() => ({
  fontSize: iconSize.value,
  color: props.color,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  ...(props.spin && {
    animation: 'pro-icon-spin 1s linear infinite',
  }),
  ...props.customStyle,
}))

// ==================== 1. Antdv Icons 匹配 ====================
const getAntdvIcon = () => {
  const iconName = props.name
  const IconComponent = AntIcons[iconName]

  if (IconComponent) {
    return h(IconComponent, {
      style: baseStyle.value,
      spin: props.spin,
    })
  }
  return null
}

// ==================== 2. SVG 文件匹配 ====================
const { svgModules } = useAssetsSvg()

const getSvgIcon = () => {
  const searchName = props.name.replace('.svg', '')

  // 查找匹配的 SVG 模块
  const matchedPath = Object.keys(svgModules).find(
    (path) => path.includes(`${searchName}.svg`) || path.endsWith(`/${searchName}.svg`),
  )

  if (!matchedPath) {
    return null
  }

  const svgUrl = svgModules[matchedPath].default

  return h('img', {
    src: svgUrl,
    style: {
      width: iconSize.value,
      height: iconSize.value,
      display: 'inline-flex',
      ...(props.spin && {
        animation: 'pro-icon-spin 1s linear infinite',
      }),
      ...props.customStyle,
    },
  })
}

// ==================== 3. Iconfont 类名匹配 ====================
const getIconfontIcon = () => {
  // 简单判断：如果 name 以 icon- 开头或包含 icon 前缀，认为是 iconfont
  if (props.name && (props.name.startsWith('icon-') || props.name.startsWith('icon'))) {
    return h('i', {
      class: ['iconfont', props.name],
      style: baseStyle.value,
    })
  }
  return null
}

// ==================== 自动匹配渲染 ====================
const renderIcon = computed(() => {
  if (!props.name) return null

  // 优先级：Antdv → SVG → Iconfont
  return getAntdvIcon() || getSvgIcon() || getIconfontIcon()
})
</script>

<style>
@keyframes pro-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
