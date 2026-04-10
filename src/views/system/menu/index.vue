<template>
  <ProLayout>
    <!-- <ProSearch :items="SEARCH_ITEMS" @search="onSearch" @reset="onReset" /> -->

    <ProLayoutMain>
      <ProLayoutSection title="菜单列表" prefix="line" fill>
        <template #title-extra>
          <a-button type="primary" @click="onAdd()" v-permission="'menu:add'">
            <template #icon><PlusOutlined /></template>
            新增
          </a-button>
        </template>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
          :loading="loading"
          :rowKey="(record) => record.id"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'status'">
              <a-tag :color="`${record.status === '1' ? 'success' : 'error'}`">{{
                STATUS_OPTIONS.find((child) => child.value === record.status)?.label
              }}</a-tag>
            </template>
            <template v-if="column.dataIndex === 'menuType'">
              <a-tag :color="TAG_MAP[record.menuType]">{{
                MENU_OPTIONS.find((child) => child.value === record.menuType).label
              }}</a-tag>
            </template>
            <template v-if="column.dataIndex === 'operator'">
              <a-button type="link" size="small" @click="onAdd(record)" v-permission="'menu:add'"
                >新增</a-button
              >
              <a-button type="link" size="small" @click="onEdit(record)" v-permission="'menu:edit'"
                >编辑</a-button
              >

              <a-popconfirm
                title="确定删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onDelete(record)"
              >
                <a-button type="link" size="small" v-permission="'menu:delete'">删除</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </ProLayoutSection>
    </ProLayoutMain>

    <UserOperatorModal
      v-model:visible="visible"
      v-if="visible"
      :current-type="currentType"
      :tree-data="dataSource"
      :current-item-data="currentItemData"
      @reload="onReset"
    />
  </ProLayout>
</template>

<script setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineOptions, ref, onMounted } from 'vue'

import { ProLayout, ProLayoutSection, ProLayoutMain } from '@/components/pro-layout/index'
import ProSearch from '@/components/pro-search/index.vue'
import UserOperatorModal from './operator.vue'

import { getMenuTreeApi, deleteMenuApi } from '@/api/system/menu/index'
import { columns, STATUS_OPTIONS, SEARCH_ITEMS, MODAL_TYPE, MENU_OPTIONS } from './options'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'MenuPage',
})

const TAG_MAP = {
  M: 'processing',
  C: 'success',
  F: 'warning',
}

const dataSource = ref([])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
})

const loading = ref(false)
const currentSearchParams = ref({})
const currentType = ref('add')
const currentItemData = ref({})
const visible = ref(false)

const transformChildren = (data = []) => {
  const results = []
  data.forEach((element) => {
    if (element.children.length > 0) {
      element.children = transformChildren(element.children)
    } else {
      element.children = null
    }
    results.push(element)
  })

  return results
}

const getData = async () => {
  loading.value = true
  const response = await getMenuTreeApi({
    ...currentSearchParams.value,
  })

  dataSource.value = transformChildren(response?.data?.result || [])
  loading.value = false
}

const onAdd = (record = {}) => {
  currentType.value = MODAL_TYPE.ADD
  currentItemData.value = !record?.id ? { parentId: 0 } : { parentId: record.id }
  visible.value = true
}

const onEdit = (record) => {
  currentType.value = MODAL_TYPE.EDIT
  currentItemData.value = record
  visible.value = true
}

const onSearch = (searchParams) => {
  currentSearchParams.value = searchParams
  pagination.value.current = 1
  getData()
}

const onDelete = async (record) => {
  await deleteMenuApi(record.id)
  message.success('删除成功')
  pagination.value.current = 1
  getData()
}

const onReset = () => {
  onSearch({})
}

onMounted(() => {
  getData()
})
</script>
