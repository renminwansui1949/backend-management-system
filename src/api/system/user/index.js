import { get, post, put, del } from '@/services/request'

export const getUserInfoApi = (data) => {
  return get('/user/info', data)
}

// /api/user

export const getUserListApi = (data) => {
  return get('/user', data)
}

export const createUserApi = (data) => {
  return post('/user', data)
}

export const updateUserApi = (data) => {
  return put('/user', data)
}

export const deleteUserApi = (id) => {
  return del(`/user/${id}`, {})
}
