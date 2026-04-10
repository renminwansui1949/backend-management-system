import { get, post, put, del } from '@/services/request'

// /api/role

export const getRoleListApi = (data) => {
  return get('/role', data)
}

export const getRoleTreeApi = (data) => {
  return get('/role/tree', data)
}
export const createRoleApi = (data) => {
  return post('/role', data)
}

export const updateRoleApi = (data) => {
  return put('/role', data)
}

export const deleteRoleApi = (id) => {
  return del(`/role/${id}`, {})
}
