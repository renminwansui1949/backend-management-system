import { get } from '@/services/request'

export const getRoutesApi = (data) => {
  return get('/routes', data)
}
