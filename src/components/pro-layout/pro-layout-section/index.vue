<!-- ProLayoutSection.vue -->
<template>
  <div
    :class="[
      'pro-layout-section',
      {
        'is-fill': fill,
        'is-collapsed': isCollapsed,
        'is-collapsable': collapsable,
        'has-divided': divided,
      },
    ]"
  >
    <!-- Header 区域 -->
    <div
      v-if="showHeader"
      :class="['pro-layout-section-header', { 'is-collapsed': isCollapsed }]"
      @click="handleHeaderClick"
    >
      <!-- 前缀装饰 -->
      <div v-if="showPrefix" class="pro-layout-section-prefix">
        <!-- 点状装饰 -->
        <template v-if="prefix === 'dot'">
          <span class="prefix-dot"></span>
        </template>

        <!-- 线条装饰 -->
        <template v-else-if="prefix === 'line'">
          <span class="prefix-line"></span>
        </template>

        <!-- 折叠器装饰 -->
        <template v-else-if="prefix === 'collapser'">
          <span class="prefix-collapser" :class="{ 'is-collapsed': isCollapsed }">
            <RightOutlined v-if="isCollapsed" />
            <DownOutlined v-else />
          </span>
        </template>

        <!-- 自定义前缀插槽 -->
        <template v-else-if="prefix === 'custom'">
          <slot name="prefix" :collapsed="isCollapsed" />
        </template>
      </div>

      <!-- 标题区域 -->
      <div class="pro-layout-section-title-wrapper">
        <div v-if="title" class="pro-layout-section-title">
          {{ title }}
        </div>
        <div v-else class="pro-layout-section-title">
          <slot name="title" />
        </div>

        <!-- 标题右侧额外内容 -->
        <div v-if="slots['title-extra']" class="pro-layout-section-title-extra">
          <slot name="title-extra" :collapsed="isCollapsed" />
        </div>
      </div>

      <!-- 右侧操作区域 -->
      <div v-if="showActions" class="pro-layout-section-actions">
        <slot name="header" :collapsed="isCollapsed" :toggle="toggleCollapse" />

        <!-- 折叠按钮（当 prefix 不是 collapser 时显示） -->
        <a-button
          v-if="collapsable && prefix !== 'collapser'"
          type="text"
          size="small"
          class="collapse-btn"
          @click.stop="toggleCollapse"
        >
          <template #icon>
            <UpOutlined v-if="!isCollapsed" />
            <DownOutlined v-else />
          </template>
        </a-button>
      </div>
    </div>

    <!-- 分割线 -->
    <div v-if="divided && showHeader" class="pro-layout-section-divider"></div>

    <!-- 内容区域 -->
    <div v-show="!isCollapsed" :class="['pro-layout-section-body', { 'is-fill': fill }]">
      <slot />
    </div>

    <!-- 折叠时的占位提示（可选） -->
    <div
      v-if="isCollapsed && collapsable && showCollapsedTip"
      class="pro-layout-section-collapsed-tip"
      @click="toggleCollapse"
    >
      <EllipsisOutlined />
      <span>内容已收起，点击展开</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useSlots, watch } from 'vue'
import { DownOutlined, UpOutlined, RightOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const { useToken } = theme
const { token } = useToken()

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 撑满整页高度
  fill: {
    type: Boolean,
    default: false,
  },
  // 标题分割线
  divided: {
    type: Boolean,
    default: false,
  },
  // 是否可折叠
  collapsable: {
    type: Boolean,
    default: false,
  },
  // 默认折叠状态
  defaultCollapsed: {
    type: Boolean,
    default: false,
  },
  // 当前折叠状态（支持 v-model:collapsed）
  collapsed: {
    type: Boolean,
    default: undefined,
  },
  // 前缀类型：dot | line | collapser | custom
  prefix: {
    type: String,
    default: 'line',
    validator: (val) => ['dot', 'line', 'collapser', 'custom', ''].includes(val),
  },
  // 点击标题是否触发折叠
  triggerHeaderClick: {
    type: Boolean,
    default: false,
  },
  // 收起时是否显示提示条
  showCollapsedTip: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:collapsed', 'collapseChange', 'headerClick'])

const slots = useSlots()

// 内部折叠状态
const internalCollapsed = ref(props.defaultCollapsed)

// 是否显示 Header
const showHeader = computed(() => {
  return props.title || slots.title || slots.header || slots['title-extra'] || props.collapsable
})

// 是否显示前缀
const showPrefix = computed(() => {
  return props.prefix && props.prefix !== ''
})

// 是否显示操作区域
const showActions = computed(() => {
  return slots.header || (props.collapsable && props.prefix !== 'collapser')
})

// 当前折叠状态（优先使用外部传入的 v-model）
const isCollapsed = computed({
  get() {
    return props.collapsed !== undefined ? props.collapsed : internalCollapsed.value
  },
  set(val) {
    if (props.collapsed === undefined) {
      internalCollapsed.value = val
    }
    emit('update:collapsed', val)
    emit('collapseChange', val)
  },
})

// 切换折叠状态
const toggleCollapse = () => {
  if (!props.collapsable) return
  isCollapsed.value = !isCollapsed.value
}

// 点击 Header
const handleHeaderClick = () => {
  emit('headerClick')
  if (props.triggerHeaderClick && props.collapsable) {
    toggleCollapse()
  }
}

// 监听外部 collapsed 变化
watch(
  () => props.collapsed,
  (newVal) => {
    if (newVal !== undefined) {
      internalCollapsed.value = newVal
    }
  },
)

// 暴露方法
defineExpose({
  toggle: toggleCollapse,
  expand: () => {
    isCollapsed.value = false
  },
  collapse: () => {
    isCollapsed.value = true
  },
  isCollapsed: () => isCollapsed.value,
})
</script>

<style scoped>
.pro-layout-section {
  background: v-bind('token.colorBgContainer');
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.pro-layout-section.is-fill {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px;
}

.pro-layout-section.is-fill.is-collapsed {
  height: auto;
}

/* Header 样式 */
.pro-layout-section-header {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  cursor: v-bind("triggerHeaderClick && collapsable ? 'pointer' : 'default'");
  transition: background-color 0.2s;
  user-select: none;
}

.pro-layout-section-header:hover {
  background-color: v-bind(
    "triggerHeaderClick && collapsable ? 'rgba(0, 0, 0, 0.02)' : 'transparent'"
  );
}

.pro-layout-section-header.is-collapsed {
  border-bottom: none;
  border-radius: 8px;
}

/* 前缀装饰 */
.pro-layout-section-prefix {
  display: flex;
  align-items: center;
  margin-right: 12px;
  flex-shrink: 0;
}

/* 点状前缀 - 使用主色 token */
.prefix-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: v-bind('token.colorPrimary');
  display: inline-block;
}

/* 线条前缀 - 使用主色 token */
.prefix-line {
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: v-bind('token.colorPrimary');
  display: inline-block;
}

/* 折叠器前缀 - 使用文本色 token */
.prefix-collapser {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: v-bind('token.colorTextSecondary');
  transition: all 0.3s;
  cursor: pointer;
}

.prefix-collapser:hover {
  background: v-bind('token.colorFillTertiary');
  color: v-bind('token.colorPrimary');
}

.prefix-collapser.is-collapsed {
  transform: rotate(0deg);
}

/* 标题区域 */
.pro-layout-section-title-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
}

.pro-layout-section-title {
  font-size: 16px;
  font-weight: 600;
  color: v-bind('token.colorText');
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pro-layout-section-title-extra {
  margin-left: 12px;
  color: v-bind('token.colorTextSecondary');
  font-size: 14px;
  font-weight: normal;
}

/* 操作区域 */
.pro-layout-section-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  flex-shrink: 0;
}

.collapse-btn {
  color: v-bind('token.colorTextSecondary');
  transition: all 0.3s;
}

.collapse-btn:hover {
  color: v-bind('token.colorPrimary');
  background: v-bind('token.colorPrimaryBg');
}

/* 分割线 */
.pro-layout-section-divider {
  height: 1px;
  background: v-bind('token.colorBorder');
  margin: 0 24px;
}

/* 内容区域 */
.is-collapsable .pro-layout-section-body {
  padding: 0 24px;
  transition: all 0.3s ease;
}

.pro-layout-section-body.is-fill {
  flex: 1;
  /* overflow: auto; */
  padding: 0 24px;
}

/* 收起提示条 */
.pro-layout-section-collapsed-tip {
  padding: 12px 24px;
  color: v-bind('token.colorTextSecondary');
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border-top: 1px dashed v-bind('token.colorBorder');
  margin: 0 24px;
}

.pro-layout-section-collapsed-tip:hover {
  color: v-bind('token.colorPrimary');
  background: v-bind('token.colorPrimaryBg');
  border-radius: 4px;
}

/* 无 Header 时的内容区域调整 */
.pro-layout-section:not(.has-header) .pro-layout-section-body {
  border-radius: 8px;
}

/* 动画优化 */
.is-collapsable .pro-layout-section-body {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式适配 */
@media screen and (max-width: 768px) {
  .pro-layout-section-header {
    padding: 12px 16px;
  }

  .pro-layout-section-body,
  .pro-layout-section-body.is-fill {
    padding: 16px;
  }

  .pro-layout-section-divider {
    margin: 0 16px;
  }

  .pro-layout-section-collapsed-tip {
    margin: 0 16px;
  }

  .pro-layout-section-title {
    font-size: 15px;
  }
}

/* 嵌套样式优化 */
:deep(.pro-layout-section) {
  margin-bottom: 12px;
}

:deep(.pro-layout-section:last-child) {
  margin-bottom: 0;
}
</style>
