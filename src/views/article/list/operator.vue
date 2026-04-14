<template>
  <a-modal
    v-model:open="open"
    :title="title"
    width="800px"
    @ok="handleOk"
    @cancel="handleCancel"
    :confirm-loading="confirmLoading"
  >
    <a-form :model="form" ref="formRef" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="文章标题" name="title">
        <a-input v-model:value="form.title" placeholder="请输入文章标题" />
      </a-form-item>
      <a-form-item label="文章封面" name="cover">
        <ImageUpload v-model:value="form.cover" />
      </a-form-item>
      <a-form-item label="文章分类" name="categoryId">
        <a-select v-model:value="form.categoryId" placeholder="请选择文章分类">
          <a-select-option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.categoryName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="文章状态" name="status">
        <a-select v-model:value="form.status" placeholder="请选择文章状态">
          <a-select-option v-for="statusOption in ARTICLE_STATUS_OPTIONS" :key="statusOption.value" :value="statusOption.value">
            {{ statusOption.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="文章内容" name="content">
        <RichTextEditor v-model:value="form.content" />
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
import { MODAL_TYPE, ARTICLE_STATUS_OPTIONS } from './options'
import { addArticleApi, updateArticleApi } from '@/api/system/article'
import { message } from 'ant-design-vue'
import ImageUpload from '@/components/image-upload/index.vue'
import RichTextEditor from '@/components/rich-text-editor/index.vue'

defineOptions({
  name: 'ArticleOperatorModal',
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
  categories: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['update:visible', 'reload'])

const open = ref(false)
const formRef = ref(null)
const confirmLoading = ref(false)
const form = ref({
  title: '',
  content: '',
  cover: '',
  categoryId: '',
  status: 'draft',
})

const rules = {
  title: [{ required: true, message: '文章标题不能为空', trigger: 'change' }],
  categoryId: [{ required: true, message: '文章分类不能为空', trigger: 'change' }],
  status: [{ required: true, message: '文章状态不能为空', trigger: 'change' }],
}

const title = computed(() => {
  return props.currentType === MODAL_TYPE.ADD ? '新增文章' : '编辑文章'
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
          title: '',
          content: '',
          cover: '',
          categoryId: '',
          status: 'draft',
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
    const api = props.currentType === MODAL_TYPE.ADD ? addArticleApi : updateArticleApi
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
