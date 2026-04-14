<template>
  <a-modal
    v-model:open="open"
    :title="title"
    @ok="handleOk"
    @cancel="handleCancel"
    :confirm-loading="confirmLoading"
  >
    <a-form :model="form" ref="formRef" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="分类名称" name="categoryName">
        <a-input v-model:value="form.categoryName" placeholder="请输入分类名称" />
      </a-form-item>
      <a-form-item label="分类描述" name="description">
        <a-textarea v-model:value="form.description" placeholder="请输入分类描述" />
      </a-form-item>
      <a-form-item label="排序" name="sortOrder">
        <a-input-number v-model:value="form.sortOrder" placeholder="请输入排序" :min="0" style="width: 100%" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, computed, watch, defineOptions } from 'vue'
import { MODAL_TYPE } from './options'
import { addArticleCategoryApi, updateArticleCategoryApi } from '@/api/system/article'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'ArticleCategoryOperatorModal',
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  currentType: {
    type: String,
    default: MODAL_TYPE.ADD,
  },
  currentItemData: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['update:visible', 'reload'])

const open = ref(false)
const formRef = ref(null)
const confirmLoading = ref(false)
const form = ref({
  categoryName: '',
  description: '',
  sortOrder: 0,
})

const rules = {
  categoryName: [{ required: true, message: '分类名称不能为空', trigger: 'change' }],
}

const title = computed(() => {
  return props.currentType === MODAL_TYPE.ADD ? '新增文章分类' : '编辑文章分类'
})

watch(
  () => props.visible,
  (val) => {
    open.value = val
    if (val) {
      if (props.currentType === MODAL_TYPE.EDIT) {
        Object.keys(form.value).forEach((key) => {
          form.value[key] = props.currentItemData[key]
        })
        form.value.id = props.currentItemData.id
      } else {
        form.value = {
          categoryName: '',
          description: '',
          sortOrder: 0,
        }
      }
    }
  },
  { immediate: true }
)

watch(
  () => open.value,
  (val) => {
    if (!val) {
      emits('update:visible', false)
    }
  }
)

const handleOk = async () => {
  try {
    await formRef.value.validateFields()
    confirmLoading.value = true
    const api = props.currentType === MODAL_TYPE.ADD ? addArticleCategoryApi : updateArticleCategoryApi
    await api(form.value)
    message.success(props.currentType === MODAL_TYPE.ADD ? '新增成功' : '编辑成功')
    emits('reload')
    emits('update:visible', false)
  } catch (error) {
    console.error(error)
  } finally {
    confirmLoading.value = false
  }
}

const handleCancel = () => {
  emits('update:visible', false)
}
</script>
