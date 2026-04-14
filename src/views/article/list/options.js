export const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    width: 100,
  },
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title',
    width: 200,
  },
  {
    title: '分类',
    dataIndex: 'categoryName', // 假设我们会获取分类名称
    key: 'categoryName',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'statusText', // 假设我们会转换状态码为文本
    key: 'statusText',
    width: 100,
  },
  {
    title: '浏览量',
    dataIndex: 'viewCount',
    key: 'viewCount',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 180,
  },
  {
    title: '操作',
    dataIndex: 'operator',
    key: 'operator',
    width: 150,
    fixed: 'right',
  },
]

export const ARTICLE_STATUS_OPTIONS = [
  {
    label: '草稿',
    value: 'draft',
  },
  {
    label: '已发布',
    value: 'published',
  },
  {
    label: '已下线',
    value: 'archived',
  },
]

export const SEARCH_ITEMS = [
  {
    type: 'input',
    label: '文章标题',
    field: 'title',
    value: '',
  },
  {
    type: 'select',
    label: '文章状态',
    field: 'status',
    value: '',
    options: ARTICLE_STATUS_OPTIONS,
  },
  // 还需要一个分类选择器，这需要从后端获取分类列表
  // {
  //   type: 'select',
  //   label: '文章分类',
  //   field: 'categoryId',
  //   value: '',
  //   options: [], // 动态加载
  // },
]

export const MODAL_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
}
