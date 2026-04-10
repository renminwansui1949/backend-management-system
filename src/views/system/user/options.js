export const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '状态',
    dataIndex: 'statusText',
    key: 'statusText',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sexText',
    key: 'sexText',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
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

export const SEX_OPTIONS = [
  {
    label: '男',
    value: '1',
  },
  {
    label: '女',
    value: '2',
  },
  {
    label: '其他',
    value: '3',
  },
]

export const SEARCH_ITEMS = [
  {
    field: 'username',
    label: '用户名',
    type: 'input',
  },
  {
    field: 'age',
    label: '年龄',
    type: 'input',
  },
  {
    field: 'email',
    label: '邮箱',
    type: 'input',
  },
  {
    field: 'sex',
    label: '性别',
    type: 'select',
    options: SEX_OPTIONS,
  },
  {
    field: 'status',
    label: '状态',
    type: 'select',
    options: STATUS_OPTIONS,
  },
]
