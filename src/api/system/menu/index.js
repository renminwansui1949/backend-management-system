import { get, post, put, del } from '@/services/request'

// /api/menu

export const getMenuListApi = (data) => {
  return get('/menu', data)
}

export const getMenuTreeApi = (data) => {
  return get('/menu/tree', data)
}
export const createMenuApi = (data) => {
  return post('/menu', data)
}

export const updateMenuApi = (data) => {
  return put('/menu', data)
}

export const deleteMenuApi = (id) => {
  return del(`/menu/${id}`, {})
}
