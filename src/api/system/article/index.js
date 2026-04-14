import request from '@/services/request'

// 文章分类相关API
export const getArticleCategoryListApi = (params) => {
  return request.get('/article/category', { params })
}

export const getArticleCategoryByIdApi = (id) => {
  return request.get(`/article/category/${id}`)
}

export const addArticleCategoryApi = (data) => {
  return request.post('/article/category', data)
}

export const updateArticleCategoryApi = (data) => {
  return request.put('/article/category', data)
}

export const deleteArticleCategoryApi = (id) => {
  return request.delete(`/article/category/${id}`)
}

// 文章相关API
export const getArticleListApi = (params) => {
  return request.get('/article', { params })
}

export const getArticleByIdApi = (id) => {
  return request.get(`/article/${id}`)
}

export const addArticleApi = (data) => {
  return request.post('/article', data)
}

export const updateArticleApi = (data) => {
  return request.put('/article', data)
}

export const deleteArticleApi = (id) => {
  return request.delete(`/article/${id}`)
}
