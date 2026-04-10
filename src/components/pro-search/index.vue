<!-- ProSearch.vue -->
<template>
  <div class="pro-search">
    <a-form
      :model="formState"
      layout="horizontal"
      :class="['pro-search-form', { 'is-collapsed': !isExpanded }]"
    >
      <a-row :gutter="24" :class="['pro-search-row', { 'is-collapsed': !isExpanded }]">
        <!-- 表单项 -->
        <a-col
          v-for="(item, index) in visibleItems"
          :key="item.field || index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="6"
          :xxl="isExpanded ? 6 : 8"
        >
          <a-form-item :label="item.label" :name="item.field" :rules="item.rules">
            <!-- 输入框 -->
            <template v-if="item.type === 'input'">
              <a-input
                v-model:value="formState[item.field]"
                :placeholder="item.placeholder || `请输入${item.label}`"
                :allowClear="true"
                @pressEnter="handleSearch"
              />
            </template>

            <!-- 选择器 -->
            <template v-else-if="item.type === 'select'">
              <a-select
                v-model:value="formState[item.field]"
                :placeholder="item.placeholder || `请选择${item.label}`"
                :options="item.options"
                :allowClear="true"
                :showSearch="item.showSearch"
                :filterOption="item.filterOption"
                style="width: 100%"
              />
            </template>

            <!-- 日期范围 -->
            <template v-else-if="item.type === 'dateRange'">
              <a-range-picker
                v-model:value="formState[item.field]"
                :placeholder="item.placeholder || ['开始日期', '结束日期']"
                style="width: 100%"
                :valueFormat="item.valueFormat || 'YYYY-MM-DD'"
              />
            </template>

            <!-- 日期 -->
            <template v-else-if="item.type === 'date'">
              <a-date-picker
                v-model:value="formState[item.field]"
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width: 100%"
                :valueFormat="item.valueFormat || 'YYYY-MM-DD'"
              />
            </template>

            <!-- 数字输入 -->
            <template v-else-if="item.type === 'number'">
              <a-input-number
                v-model:value="formState[item.field]"
                :placeholder="item.placeholder || `请输入${item.label}`"
                style="width: 100%"
                :min="item.min"
                :max="item.max"
                :precision="item.precision"
              />
            </template>

            <!-- 级联选择 -->
            <template v-else-if="item.type === 'cascader'">
              <a-cascader
                v-model:value="formState[item.field]"
                :options="item.options"
                :placeholder="item.placeholder || `请选择${item.label}`"
                :allowClear="true"
                style="width: 100%"
              />
            </template>

            <!-- 自定义插槽 -->
            <template v-else-if="item.type === 'custom'">
              <slot
                :name="`field-${item.field}`"
                :field="item.field"
                :value="formState[item.field]"
                :onChange="(val) => handleCustomChange(item.field, val)"
              />
            </template>

            <!-- 默认输入框 -->
            <template v-else>
              <a-input
                v-model:value="formState[item.field]"
                :placeholder="item.placeholder || `请输入${item.label}`"
                :allowClear="true"
                @pressEnter="handleSearch"
              />
            </template>
          </a-form-item>
        </a-col>

        <!-- 操作按钮区域 - 始终显示 -->
        <a-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="6"
          :xxl="isExpanded ? 6 : 8"
          class="pro-search-actions"
        >
          <a-form-item label=" " :colon="false">
            <a-space>
              <a-button type="primary" @click="handleSearch">
                <template #icon><SearchOutlined /></template>
                查询
              </a-button>
              <a-button @click="handleReset">
                <template #icon><ReloadOutlined /></template>
                重置
              </a-button>
              <a-button
                v-if="showCollapse && items.length > collapseCount"
                type="text"
                @click="toggleExpand"
              >
                {{ isExpanded ? '收起' : '展开' }}
                <component :is="isExpanded ? UpOutlined : DownOutlined" />
              </a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { SearchOutlined, ReloadOutlined, UpOutlined, DownOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const { useToken } = theme
const { token } = useToken()
const props = defineProps({
  // 搜索项配置
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  // 默认展开状态
  defaultExpanded: {
    type: Boolean,
    default: false,
  },
  // 收起时显示的数量
  collapseCount: {
    type: Number,
    default: 2,
  },
  // 是否显示展开/收起按钮
  showCollapse: {
    type: Boolean,
    default: true,
  },
  // 初始值
  initialValues: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['search', 'reset', 'expandChange'])

// 表单状态
const formState = ref({})
// 展开/收起状态
const isExpanded = ref(props.defaultExpanded)

// 根据响应式断点计算收起时显示的数量
const getResponsiveCount = () => {
  const width = window.innerWidth
  if (width >= 1600) return 3 // xxl: 4列布局，显示3个搜索项+1个按钮
  if (width >= 1200) return 2 // xl/lg: 4列布局，显示2个搜索项+1个按钮
  if (width >= 992) return 1 // md: 3列布局，显示1个搜索项+1个按钮
  if (width >= 768) return 1 // sm: 2列布局，显示1个搜索项+1个按钮
  return 0 // xs: 1列布局，只显示按钮（搜索项在下一行）
}

// 实际收起时显示的搜索项数量（不包含按钮）
const actualCollapseCount = computed(() => {
  const responsiveCount = getResponsiveCount()
  return Math.min(props.collapseCount, Math.max(0, responsiveCount))
})

// 可见的搜索项
const visibleItems = computed(() => {
  if (isExpanded.value) {
    return props.items
  }
  // 收起状态下，根据响应式显示前 N 个
  return props.items.slice(0, actualCollapseCount.value)
})

// 初始化表单状态
const initFormState = () => {
  const state = {}
  props.items.forEach((item) => {
    state[item.field] = props.initialValues[item.field] ?? item.defaultValue ?? undefined
  })
  formState.value = state
}

// 切换展开/收起
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  emit('expandChange', isExpanded.value)
}

// 查询
const handleSearch = () => {
  // 过滤掉 undefined 和空字符串
  const params = {}
  Object.keys(formState.value).forEach((key) => {
    const val = formState.value[key]
    if (val !== undefined && val !== '' && val !== null) {
      params[key] = val
    }
  })
  emit('search', params, formState.value)
}

// 重置
const handleReset = () => {
  initFormState()
  emit('reset')
  handleSearch()
}

// 自定义字段值变更
const handleCustomChange = (field, value) => {
  formState.value[field] = value
}

// 监听 initialValues 变化
watch(
  () => props.initialValues,
  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      Object.keys(newVal).forEach((key) => {
        if (formState.value.hasOwnProperty(key)) {
          formState.value[key] = newVal[key]
        }
      })
    }
  },
  { deep: true },
)

// 监听 items 变化重新初始化
watch(
  () => props.items,
  () => {
    initFormState()
  },
  { deep: true },
)

// 窗口大小变化监听
let resizeTimer = null
const handleResize = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    // 触发响应式重新计算
    isExpanded.value = isExpanded.value
  }, 100)
}

onMounted(() => {
  initFormState()
  window.addEventListener('resize', handleResize)
})

// 暴露方法
defineExpose({
  formState,
  isExpanded,
  toggleExpand,
  handleSearch,
  handleReset,
  getFormValues: () => formState.value,
  setFormValues: (values) => {
    Object.assign(formState.value, values)
  },
})
</script>

<style scoped>
.pro-search {
  padding: 24px 24px 0;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: v-bind('token.colorBgBase');
}

.pro-search-form {
  width: 100%;
}

.pro-search-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

/* 收起状态下的特殊处理 */
.pro-search-row.is-collapsed {
  /* 确保按钮始终在一行内 */
  flex-wrap: nowrap;
}

/* 响应式适配 */
@media screen and (max-width: 575px) {
  .pro-search {
    padding: 16px 16px 0;
  }

  .pro-search-actions {
    margin-top: 0;
  }
}

/* 表单项样式优化 */
:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-form-item-label) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 按钮区域样式 */
.pro-search-actions {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}

.pro-search-actions :deep(.ant-form-item) {
  margin-bottom: 24px;
}

/* 展开/收起按钮动画 */
:deep(.ant-btn-link) {
  padding-left: 4px;
  padding-right: 4px;
}

/* 确保最后一列按钮对齐 */
@media screen and (min-width: 1600px) {
  .pro-search-row.is-collapsed .pro-search-actions {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1599px) {
  .pro-search-row.is-collapsed .pro-search-actions {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .pro-search-row.is-collapsed .pro-search-actions {
    flex: 0 0 33.333%;
    max-width: 33.333%;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .pro-search-row.is-collapsed .pro-search-actions {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>
