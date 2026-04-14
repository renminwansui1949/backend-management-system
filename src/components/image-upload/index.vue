<template>
  <a-upload
    list-type="picture-card"
    class="image-uploader"
    :show-upload-list="false"
    :action="uploadUrl"
    :headers="headers"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="cover" style="width: 100%" />
    <div v-else>
      <loading-outlined v-if="loading" />
      <plus-outlined v-else />
      <div class="ant-upload-text">上传封面</div>
    </div>
  </a-upload>
</template>

<script setup>
import { ref, watch } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:value', 'change'])

const loading = ref(false)
const imageUrl = ref(props.value)
const uploadUrl = '/api/upload' // 您的后端上传接口
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
}

watch(
  () => props.value,
  (newVal) => {
    imageUrl.value = newVal
  },
)

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 格式的图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const handleChange = (info) => {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    // 假设后端返回的数据结构为 { data: { targetFilePath: '...' } } 或类似
    // 请根据实际接口返回调整，这里暂时假设返回 FileInfo 对象的 targetFilePath
    const response = info.file.response
    // 这里需要根据您的后端 download 接口拼接 URL
    // 例如：/api/download/{id}
    const fileId = response.id
    const newImageUrl = `/api/download/${fileId}`
    
    imageUrl.value = newImageUrl
    loading.value = false
    emit('update:value', newImageUrl)
    emit('change', newImageUrl)
  }
}
</script>

<style scoped>
.image-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
