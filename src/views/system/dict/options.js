export const columns = [
  {
    title: '字典编码',
    dataIndex: 'dictCode',
    key: 'dictCode',
  },
  {
    title: '字典名称',
    dataIndex: 'dictName',
    key: 'dictName',
  },
  {
    title: '状态',
    dataIndex: 'statusText',
    key: 'statusText',
  },
  {
    title: '备注',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'operator',
    width: '160px',
    key: 'operator',
  },
]

export const STATUS_OPTIONS = [
  {
    label: '启用',
    value: '1',
  },
  {
    label: '禁用',
    value: '2',
  },
]

export const MODAL_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
}

export const SEARCH_ITEMS = [
  {
    field: 'dictCode',
    label: '字典编码',
    type: 'input',
  },
  {
    field: 'dictName',
    label: '字典名称',
    type: 'input',
  },
  {
    field: 'status',
    label: '状态',
    type: 'select',
    options: STATUS_OPTIONS,
  },
]
