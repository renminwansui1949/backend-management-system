import { post } from '@/services/request'

export const loginApi = (data) => {
  return post('/login', data)
}
