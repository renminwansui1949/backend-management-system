<template>
  <ProLayout>
    <ProSearch :items="SEARCH_ITEMS" @search="onSearch" @reset="onReset"></ProSearch>
    <ProLayoutMain>
      <ProLayoutSection title="操作日志" prefix="line" fill>
        <template #title-extra>
          <a-popconfirm title="确定删除吗?" ok-text="确定" cancel-text="取消" @confirm="onDelete">
            <a-button type="primary">
              <template #icon><DeleteOutlined /></template>
              删除
            </a-button>
          </a-popconfirm>

          <a-popconfirm title="确定清空吗?" ok-text="确定" cancel-text="取消" @confirm="onClear">
            <a-button type="primary" style="margin-left: 10px">
              <template #icon><DeleteOutlined /></template>
              清空
            </a-button>
          </a-popconfirm>

          <!-- <a-button type="primary" @click="onAddUser" style="margin-left: 10px">
            <template #icon><ArrowDownOutlined /></template>
            导出
          </a-button> -->
        </template>

        <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
          :row-selection="rowSelection"
          rowKey="id"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'statusText'">
              <a-tag :color="`${record.status === '1' ? 'success' : 'error'}`">{{
                record.statusText
              }}</a-tag>
            </template>
            <template v-if="column.dataIndex === 'operator'">
              <a-button type="link" size="small" @click="onDetail(record)">详情</a-button>
            </template>
          </template>
        </a-table>
      </ProLayoutSection>
    </ProLayoutMain>
    <OperatorDetail
      v-if="visible"
      :visible="visible"
      @handleCancel="handleCancel"
      :recordData="recordData"
    ></OperatorDetail>
  </ProLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DeleteOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
import { ProLayout, ProLayoutSection, ProLayoutMain } from '@/components/pro-layout/index'
import ProSearch from '@/components/pro-search/index.vue' //为什么直接引入，是export default的吗
import { SEARCH_ITEMS, columns, STATUS_OPTIONS } from './options'
import { getOperaterLogListApi, deleteOperaterLogApi, clearOperaterLogApi } from '@/api/system/log'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import OperatorDetail from './operator.vue'

const dataSource = ref([])
const loading = ref(false)
const currentSearchParams = ref({})
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
})
const rowSelectIds = ref([])
const visible = ref(false)
const recordData = ref({})

const rowSelection = {
  onChange: async (selectedRowKeys) => {
    rowSelectIds.value = selectedRowKeys
  },
}
const onSearch = (searchParams) => {
  currentSearchParams.value = searchParams
  if (searchParams?.time?.length) {
    currentSearchParams.value.startTime = searchParams.time[0]
    currentSearchParams.value.endTime = searchParams.time[1]
    delete currentSearchParams.value.time
  }
  pagination.value.current = 1
  getData()
}

const onClear = async () => {
  await clearOperaterLogApi()
  getData()
}

const onReset = () => {
  currentSearchParams.value = {}
  pagination.value.current = 1
  getData()
}

const onDetail = (record) => {
  recordData.value = record
  visible.value = true
}
const handleCancel = () => {
  visible.value = false
}

const getData = async () => {
  loading.value = true
  const res = await getOperaterLogListApi({
    current: pagination.value.current,
    size: pagination.value.pageSize,
    ...currentSearchParams.value,
  })

  dataSource.value = (res?.data?.rows || []).map((item) => {
    return {
      ...item,
      operTime: dayjs(item.operTime).format('YYYY-MM-DD HH:mm:ss'),
      statusText: STATUS_OPTIONS.find((child) => child.value === item.status)?.label,
    }
  })
  pagination.value.total = res?.data.total || 0
  loading.value = false
}

const handleTableChange = (pag) => {
  if (pagination.value.pageSize !== pag.pageSize) {
    pagination.value.current = 1
  } else {
    pagination.value.current = pag.current
  }
  pagination.value.pageSize = pag.pageSize
  getData()
}

const onDelete = async () => {
  if (!rowSelectIds.value.length) {
    message.warning('请选择要删除的记录')
    return
  }
  await deleteOperaterLogApi(rowSelectIds.value.join(','))
  message.success('删除成功')
  pagination.value.current = 1
  getData()
}

onMounted(() => {
  getData()
})
</script>
