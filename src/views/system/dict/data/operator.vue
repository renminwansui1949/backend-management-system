<template>
  <a-modal
    v-model:open="open"
    width="640px"
    :title="`${currentType === 'add' ? '新增' : '编辑'}`"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      autocomplete="off"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
    >
      <a-form-item label="字典类型">
        {{ route.params.dictCode }}
      </a-form-item>
      <a-form-item label="数据标签" name="itemName">
        <a-input v-model:value="formState.itemName" placeholder="请输入数据标签" />
      </a-form-item>

      <a-form-item label="数据键值" name="itemValue">
        <a-input v-model:value="formState.itemValue" placeholder="请输入数据键值" />
      </a-form-item>

      <a-form-item label="状态" name="status">
        <a-radio-group v-model:value="formState.status">
          <a-radio :value="item.value" v-for="(item, idx) in STATUS_OPTIONS" name="type" :key="idx">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="formState.remark" placeholder="请输入备注" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel" :loading="loading">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { defineOptions, ref, defineProps, defineEmits, watch, computed } from 'vue'

import { STATUS_OPTIONS, MODAL_TYPE } from './options'

import { updateDictDataApi, createDictDataApi } from '@/api/system/dict'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'UserOperatorModal',
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  currentType: {
    type: String,
    default: 'add',
  },
  currentItemData: {
    type: Object,
    default: () => {},
  },
})

const emits = defineEmits(['update:visible', 'reload'])
const route = useRoute()

const open = ref(true)
const formRef = ref(null)
const loading = ref(false)
const formState = ref({
  itemName: '',
  itemValue: '',
  remark: '',
  status: '1',
})
const rules = computed(() => {
  return {
    itemName: [{ required: true, message: '请输入数据标签', trigger: 'change' }],
    itemValue: [{ required: true, message: '请输入数据键值', trigger: 'change' }],
  }
})

const handleOk = async () => {
  await formRef.value.validateFields()
  loading.value = true
  try {
    const currentApi = props.currentType === MODAL_TYPE.ADD ? createDictDataApi : updateDictDataApi
    await currentApi(route.params.dictCode, formState.value)
    message.success(props.currentType === MODAL_TYPE.ADD ? '新增成功' : '编辑成功')
    emits('update:visible', false)
    emits('reload')
  } catch (error) {
    console.log(error, 'handleOk error')
  } finally {
    loading.value = false
  }
}
const handleCancel = () => {
  emits('update:visible', false)
}

watch(
  () => open.value,
  (value) => {
    if (!value) {
      emits('update:visible', false)
    }
  },
)

watch(
  () => [props.currentItemData, props.currentType],
  () => {
    if (props.currentType === MODAL_TYPE.EDIT) {
      console.log(props.currentItemData, 'props.currentItemData')
      Object.keys(formState.value).forEach((item) => {
        formState.value[item] = props.currentItemData[item]
      })
      formState.value.id = props.currentItemData.id
    }
  },
  {
    immediate: true,
  },
)
</script>
