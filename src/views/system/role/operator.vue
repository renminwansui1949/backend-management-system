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
      <a-form-item label="角色名称" name="roleName">
        <a-input v-model:value="formState.roleName" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="权限字符" name="roleKey">
        <a-input v-model:value="formState.roleKey" placeholder="请输入权限字符" />
      </a-form-item>
      <a-form-item label="排序" name="orderNum">
        <a-input-number
          v-model:value="formState.orderNum"
          style="width: 100%"
          :min="1"
          :max="150"
        />
      </a-form-item>
      <a-form-item label="菜单权限" name="menuIds">
        <a-tree-select
          v-model:value="formState.menuIds"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择父级菜单"
          allow-clear
          tree-checkable
          tree-default-expand-all
          :tree-data="menuTreeData"
          tree-node-filter-prop="label"
          :fieldNames="{ children: 'children', label: 'menuName', value: 'id' }"
        >
        </a-tree-select>
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
import { defineOptions, ref, defineProps, defineEmits, watch, computed } from 'vue'

import { SEX_OPTIONS, STATUS_OPTIONS, MODAL_TYPE } from './options'
import { updateRoleApi, createRoleApi } from '@/api/system/role/index'
import { message, TreeSelect } from 'ant-design-vue'

defineOptions({
  name: 'RoleOperatorModal',
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
  menuTreeData: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['update:visible', 'reload'])

const open = ref(true)
const formRef = ref(null)
const loading = ref(false)
const formState = ref({
  roleName: '',
  remark: '',
  roleKey: '',
  orderNum: '',
  status: '1',
  menuIds: [],
})
const rules = computed(() => {
  if (props.currentType === 'edit') {
    return {
      roleName: [{ required: true, message: '请输入用户名', trigger: 'change' }],
      orderNum: [{ required: true, message: '请输入排序', trigger: 'change' }],
    }
  }
  return {
    roleName: [{ required: true, message: '请输入用户名', trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
    orderNum: [{ required: true, message: '请输入排序', trigger: 'change' }],
  }
})

const handleOk = async () => {
  await formRef.value.validateFields()
  loading.value = true
  try {
    const currentApi = props.currentType === MODAL_TYPE.ADD ? createRoleApi : updateRoleApi
    await currentApi(formState.value)
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
