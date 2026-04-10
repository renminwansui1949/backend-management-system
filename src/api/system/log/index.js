import { get, post, put, del } from '@/services/request'

// /api/role

export const getLoginLogListApi = (data) => {
  return get('/system/logininfor/list', data)
}
export const createLoginLogApi = (data) => {
  return post('/system/logininfor', data)
}

export const updateLoginLogApi = (data) => {
  return put('/system/logininfor', data)
}

export const deleteLoginLogApi = (id) => {
  return del(`/system/logininfor/${id}`, {})
}

export const clearLoginApi = () => {
  return del(`/system/logininfor/clean`, {})
}
export const getOperaterLogListApi = (data) => {
  return get('/system/operlog/list', data)
}

export const clearOperaterLogApi = (data) => {
  return del('/system/operlog/clean', data)
}
export const createOperaterLogApi = (data) => {
  return post('/role', data)
}

export const updateOperaterLogApi = (data) => {
  return put('/role', data)
}

export const deleteOperaterLogApi = (ids) => {
  return del(`/system/operlog/${ids}`, [])
}
