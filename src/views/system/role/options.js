export const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '权限字符',
    dataIndex: 'roleKey',
    key: 'roleKey',
  },
  {
    title: '显示顺序',
    dataIndex: 'orderNum',
    key: 'orderNum',
  },
  {
    title: '状态',
    dataIndex: 'statusText',
    key: 'statusText',
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
    field: 'roleName',
    label: '角色名称',
    type: 'input',
  },
  {
    field: 'roleKey',
    label: '权限字符',
    type: 'input',
  },
  {
    field: 'status',
    label: '状态',
    type: 'select',
    options: STATUS_OPTIONS,
  },
]
