export const STATUS_OPTIONS = [
  {
    label: '正常',
    value: '1',
  },
  {
    label: '异常',
    value: '2',
  },
]
export const TYPE_OPTIONS = [
  {
    label: '正常',
    value: 1,
  },
  {
    label: '停用',
    value: 2,
  },
]
export const SEARCH_ITEMS = [
  {
    field: 'operIp',
    label: '操作地址',
    type: 'input',
  },
  {
    field: 'title',
    label: '系统模块',
    type: 'input',
  },
  {
    field: 'operName',
    label: '操作人员',
    type: 'input',
  },
  {
    field: 'status',
    label: '状态',
    type: 'select',
    options: STATUS_OPTIONS,
  },
  {
    field: 'time',
    label: '创建时间',
    type: 'dateRange',
  },
]
export const columns = [
  {
    title: '日志编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '系统模块',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '操作类型',
    dataIndex: 'businessTypeDesc',
    key: 'businessTypeDesc',
  },
  {
    title: '操作人员',
    dataIndex: 'operName',
    key: 'operName',
  },
  {
    title: '操作地址',
    dataIndex: 'operIp',
    key: 'ipaddr',
  },
  {
    title: '操作地点',
    dataIndex: 'operLocation',
    key: 'operLocation',
  },

  {
    title: '操作状态',
    dataIndex: 'statusText',
    key: 'statusText',
  },
  {
    title: '操作日期',
    dataIndex: 'operTime',
    key: 'operTime',
  },
  {
    title: '消耗时间',
    dataIndex: 'costTime',
    key: 'costTime',
  },
  {
    title: '操作',
    dataIndex: 'operator',
    key: 'operator',
  },
]
