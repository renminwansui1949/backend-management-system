<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      mode="default"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :default-config="editorConfig"
      mode="default"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from 'axios'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:value', 'change'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.value)

// 模拟 ajax 异步获取内容
onMounted(() => {
  valueHtml.value = props.value
})

watch(
  () => props.value,
  (newVal) => {
    if (newVal !== valueHtml.value) {
      valueHtml.value = newVal
    }
  },
)

watch(
  () => valueHtml.value,
  (newVal) => {
    emit('update:value', newVal)
    emit('change', newVal)
  },
)

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // 自定义图片上传
      async customUpload(file, insertFn) {
        const formData = new FormData()
        formData.append('file', file)

        try {
          const res = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          // 假设后端返回的数据结构为 { data: { id: '...' } }
          // 这里需要根据实际接口返回调整
          const fileId = res.data.id
          const url = `/api/download/${fileId}`
          
          // 插入图片到编辑器
          insertFn(url, '', '')
        } catch (error) {
          console.error('图片上传失败', error)
        }
      },
    },
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
