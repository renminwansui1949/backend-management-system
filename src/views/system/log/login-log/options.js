export const STATUS_OPTIONS = [
  {
    label: '成功',
    value: '1',
  },
  {
    label: '失败',
    value: '2',
  },
]
export const SEARCH_ITEMS = [
  {
    field: 'userName',
    label: '用户名',
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
    label: '登录时间',
    type: 'dateRange',
  },
]
export const columns = [
  {
    title: '访问编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '登录地址',
    dataIndex: 'ipaddr',
    key: 'ipaddr',
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    key: 'loginLocation',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    key: 'browser',
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    key: 'os',
  },
  {
    title: '登录状态',
    dataIndex: 'statusText',
    key: 'statusText',
  },
  {
    title: '操作信息',
    dataIndex: 'msg',
    key: 'msg',
  },
  {
    title: '登录日期',
    dataIndex: 'loginTime',
    key: 'loginTime',
  },
]
