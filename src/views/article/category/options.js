export const columns = [
  {
    title: '分类名称',
    dataIndex: 'categoryName',
    key: 'categoryName',
    width: 150,
  },
  {
    title: '分类描述',
    dataIndex: 'description',
    key: 'description',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    key: 'sortOrder',
    width: 80,
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

export const SEARCH_ITEMS = [
  {
    type: 'input',
    label: '分类名称',
    field: 'categoryName',
    value: '',
  },
]

export const MODAL_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
}
