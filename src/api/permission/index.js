import { get } from '@/services/request'

export const getRoutePermissionApi = (data) => {
  return get('/routes', data)
}

export const getButtonPermissionApi = (data) => {
  return get('/permission', data)
}
