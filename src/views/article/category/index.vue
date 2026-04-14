<template>
  <ProLayout>
    <ProSearch :items="SEARCH_ITEMS" @search="onSearch" @reset="onReset" />

    <ProLayoutMain>
      <ProLayoutSection title="文章分类列表" prefix="line" fill>
        <template #title-extra>
          <a-button type="primary" @click="onAddCategory" v-permission="'article:category:add'">
            <template #icon><PlusOutlined /></template>
            新增
          </a-button>
        </template>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operator'">
              <a-button
                type="link"
                size="small"
                @click="onEdit(record)"
                v-permission="'article:category:edit'"
                >编辑</a-button
              >

              <a-popconfirm
                title="确定删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onDelete(record)"
              >
                <a-button type="link" size="small" v-permission="'article:category:delete'"
                  >删除</a-button
                >
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </ProLayoutSection>
    </ProLayoutMain>

    <ArticleCategoryOperatorModal
      v-model:visible="visible"
      v-if="visible"
      :current-type="currentType"
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
import ArticleCategoryOperatorModal from './operator.vue'

import { getArticleCategoryListApi, deleteArticleCategoryApi } from '@/api/system/article'

import dayjs from 'dayjs'
import { columns, SEARCH_ITEMS, MODAL_TYPE } from './options'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'ArticleCategoryPage',
})

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

const handleTableChange = (pag) => {
  pagination.value.current = pag.current
  pagination.value.pageSize = pag.pageSize
  getData()
}

const getData = async () => {
  loading.value = true
  const response = await getArticleCategoryListApi({
    current: pagination.value.current,
    size: pagination.value.pageSize,
    ...currentSearchParams.value,
  })

  dataSource.value = (response?.data?.result?.records || []).map((item) => {
    return {
      ...item,
      createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
    }
  })
  pagination.value.total = response?.data?.result?.total || 0

  loading.value = false
}

const onAddCategory = () => {
  currentType.value = MODAL_TYPE.ADD
  currentItemData.value = {}
  visible.value = true
}

const onEdit = (record) => {
  currentType.value = MODAL_TYPE.EDIT
  currentItemData.value = record
  visible.value = true
}

const onDelete = async (record) => {
  await deleteArticleCategoryApi(record.id)
  message.success('删除成功')
  pagination.value.current = 1
  getData()
}

const onSearch = (searchParams) => {
  currentSearchParams.value = searchParams
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
