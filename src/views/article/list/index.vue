<template>
  <ProLayout>
    <ProSearch :items="searchItems" @search="onSearch" @reset="onReset" />

    <ProLayoutMain>
      <ProLayoutSection title="文章列表" prefix="line" fill>
        <template #title-extra>
          <a-button type="primary" @click="onAddArticle" v-permission="'article:add'">
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
            <template v-if="column.dataIndex === 'cover'">
              <a-image v-if="record.cover" :width="50" :src="record.cover" />
              <span v-else>-</span>
            </template>
            <template v-if="column.dataIndex === 'operator'">
              <a-button
                type="link"
                size="small"
                @click="onEdit(record)"
                v-permission="'article:edit'"
                >编辑</a-button
              >

              <a-popconfirm
                title="确定删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onDelete(record)"
              >
                <a-button type="link" size="small" v-permission="'article:delete'">删除</a-button>
              </a-popconfirm>
            </template>
            <template v-if="column.dataIndex === 'statusText'">
              <a-tag :color="`${record.status === 'published' ? 'success' : 'default'}`">{{
                record.statusText
              }}</a-tag>
            </template>
          </template>
        </a-table>
      </ProLayoutSection>
    </ProLayoutMain>

    <ArticleOperatorModal
      v-model:visible="visible"
      v-if="visible"
      :current-type="currentType"
      :current-item-data="currentItemData"
      :categories="categories"
      @reload="onReset"
    />
  </ProLayout>
</template>

<script setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineOptions, ref, onMounted, computed } from 'vue'

import { ProLayout, ProLayoutSection, ProLayoutMain } from '@/components/pro-layout/index'
import ProSearch from '@/components/pro-search/index.vue'
import ArticleOperatorModal from './operator.vue'

import {
  getArticleListApi,
  deleteArticleApi,
  getArticleCategoryListApi,
} from '@/api/system/article'

import dayjs from 'dayjs'
import { columns, SEARCH_ITEMS, MODAL_TYPE, ARTICLE_STATUS_OPTIONS } from './options'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'ArticleListPage',
})

const dataSource = ref([])
const categories = ref([]) // 用于存储文章分类列表

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

const searchItems = computed(() => {
  const categorySearchItem = {
    type: 'select',
    label: '文章分类',
    field: 'categoryId',
    value: '',
    options: categories.value.map((cat) => ({ label: cat.categoryName, value: cat.id })),
  }
  return [...SEARCH_ITEMS, categorySearchItem]
})

const handleTableChange = (pag) => {
  pagination.value.current = pag.current
  pagination.value.pageSize = pag.pageSize
  getData()
}

const getData = async () => {
  loading.value = true
  const response = await getArticleListApi({
    current: pagination.value.current,
    size: pagination.value.pageSize,
    ...currentSearchParams.value,
  })

  dataSource.value = (response?.data?.result?.records || []).map((item) => {
    const category = categories.value.find((cat) => cat.id === item.categoryId)
    return {
      ...item,
      categoryName: category ? category.categoryName : '未知分类',
      createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      statusText: ARTICLE_STATUS_OPTIONS.find((child) => child.value === item.status)?.label,
    }
  })
  pagination.value.total = response?.data?.result?.total || 0

  loading.value = false
}

const fetchCategories = async () => {
  const response = await getArticleCategoryListApi({ current: 1, size: 999 }) // 获取所有分类
  categories.value = response?.data?.result?.records || []
}

const onAddArticle = () => {
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
  await deleteArticleApi(record.id)
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
  fetchCategories() // 获取分类列表
  getData() // 获取文章列表
})
</script>
