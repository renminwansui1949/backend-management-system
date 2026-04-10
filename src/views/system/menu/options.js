export const columns = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName',
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    key: 'menuType',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    key: 'orderNum',
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    key: 'perms',
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    key: 'component',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },

  {
    title: '创建日期',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'operator',
    width: '180px',
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
    field: 'menuName',
    label: '菜单名称',
    type: 'input',
  },
  {
    field: 'status',
    label: '状态',
    type: 'select',
    options: STATUS_OPTIONS,
  },
]

export const MENU_OPTIONS = [
  {
    label: '目录',
    value: 'M',
  },
  {
    label: '菜单',
    value: 'C',
  },
  {
    label: '按钮',
    value: 'F',
  },
]

export const YES_NO_OPTIONS = [
  {
    label: '是',
    value: '1',
  },
  {
    label: '否',
    value: '2',
  },
]
