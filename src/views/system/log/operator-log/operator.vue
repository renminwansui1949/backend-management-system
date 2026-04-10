<template>
  <a-modal :open="visible" width="780px" title="操作日志详情" @ok="handleOk" @cancel="handleCancel">
    <div class="detail-content">
      <LogItem :icon="InfoCircleOutlined" title="基本信息">
        <a-row>
          <a-col :span="4"><p class="content-left">操作模块</p></a-col>
          <a-col :span="8"
            ><p class="content-right">{{ recordData.title }}</p></a-col
          >
          <a-col :span="4"><p class="content-left">业务类型</p></a-col>
          <a-col :span="8"
            ><p class="content-right">{{ recordData.businessTypeDesc }}</p></a-col
          >
        </a-row>
        <a-row>
          <a-col :span="4"><p class="content-left">操作时间</p></a-col>
          <a-col :span="8"
            ><p class="content-right">{{ recordData.operTime }}</p></a-col
          >
          <a-col :span="4"><p class="content-left">操作状态</p></a-col>
          <a-col :span="8"
            ><p class="content-right">{{ recordData.statusText }}</p></a-col
          >
        </a-row>
      </LogItem>
      <LogItem :icon="InfoCircleOutlined" title="操作人员">
        <a-row>
          <a-col :span="4"><p class="content-left">操作人员</p></a-col>
          <a-col :span="8"
            ><p class="content-right">{{ recordData.operName }}</p></a-col
          >
          <a-col :span="4"><p class="content-left">所属部门</p></a-col>
          <a-col :span="8"><p class="content-right">研发部门</p></a-col>
        </a-row>
        <a-row>
          <a-col :span="4"><p class="content-left">操作地址</p></a-col>

          <a-col :span="8"><p class="content-right">114.224.38.67 江苏 无锡市</p></a-col>
        </a-row>
      </LogItem>
    </div>
  </a-modal>
</template>

<script setup>
import { onMounted } from 'vue'
import LogItem from './log-item.vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  recordData: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['handleCancel'])

const handleOk = () => {
  emit('handleCancel')
}
const handleCancel = () => {
  emit('handleCancel')
}
onMounted(() => {
  // console.log(recordData, 'recordData')
})
</script>

<style scoped>
.a-row {
  text-align: left;
  padding: 10px;
  font-size: 14px;
}
.content-left {
  color: #909399;
  margin-left: 10px;
}
.content-right {
  color: #303133;
}
.content-pre {
  text-align: left;
  background: #f7f9fb;
  margin: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: #303133;
  padding: 10px;
}
</style>
