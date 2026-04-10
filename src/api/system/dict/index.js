import { get, post, put, del } from '@/services/request'

export const getDictTypeListApi = (data) => {
  return get('/dict-type', data)
}

export const createDictTypeApi = (data) => {
  return post('/dict-type', data)
}

export const updateDictTypeApi = (data) => {
  return put('/dict-type', data)
}

export const deleteDictTypeApi = (id) => {
  return del(`/dict-type/${id}`, {})
}

// /api/dict-data/{dictType}

export const getDictDataListApi = (dictType, data) => {
  return get(`/dict-data/${dictType}`, data)
}

export const createDictDataApi = (dictType, data) => {
  return post(`/dict-data/${dictType}`, data)
}

export const updateDictDataApi = (dictType, data) => {
  return put(`/dict-data/${dictType}`, data)
}

export const deleteDictDataApi = (dictType, id) => {
  return del(`/dict-data/${dictType}/${id}`, {})
}
