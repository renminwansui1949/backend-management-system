import axios from 'axios'
import { message as antvMessage } from 'ant-design-vue'

// 创建实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求队列（用于取消请求）
const pendingRequests = new Map()

// 生成请求唯一标识
const getRequestKey = (config) => {
  return `${config.method}&${config.url}&${JSON.stringify(config.params)}&${JSON.stringify(config.data)}`
}

const logout = () => {
  // 登出
  antvMessage.warn('登录已过期，请重新登录')

  setTimeout(() => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }, 1000)
}

// 添加请求到队列
const addPendingRequest = (config) => {
  const key = getRequestKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequests.has(key)) {
        pendingRequests.set(key, cancel)
      }
    })
}

// 移除请求
const removePendingRequest = (config) => {
  const key = getRequestKey(config)
  if (pendingRequests.has(key)) {
    const cancel = pendingRequests.get(key)
    cancel('请求被取消，请勿重复提交')
    pendingRequests.delete(key)
  }
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 取消重复请求
    removePendingRequest(config)
    addPendingRequest(config)

    // 添加 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 移除已完成请求
    removePendingRequest(response.config)

    // 直接返回数据
    const { data } = response

    // 根据后端约定处理业务状态码
    if (data.code !== 200) {
      // 处理特定业务错误
      if (data.code === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }

      antvMessage.error(data.message)

      return Promise.reject(new Error(data.message || '请求失败'))
    }

    return data
  },
  (error) => {
    // 移除失败请求
    if (error.config) {
      removePendingRequest(error.config)
    }

    // 处理不同错误类型
    if (axios.isCancel(error)) {
      console.warn('请求已取消:', error.message)
      return Promise.reject(error)
    }

    // HTTP 错误处理
    const { response } = error
    let message = '网络错误，请稍后重试'

    if (response) {
      switch (response.status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '登录已过期，请重新登录'
          logout()
          break
        case 403:
          message = '没有权限访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求失败: ${response.status}`
      }
    } else if (error.request) {
      message = '网络连接失败，请检查网络'
    }

    // 可以在这里统一提示错误
    // toast.error(message);

    antvMessage.error(message)

    return Promise.reject(new Error(message))
  },
)

// 导出常用方法
export const get = (url, params, config = {}) => {
  return request.get(url, { params, ...config })
}

export const post = (url, data, config = {}) => {
  return request.post(url, data, config)
}

export const put = (url, data, config = {}) => {
  return request.put(url, data, config)
}

export const del = (url, config = {}) => {
  return request.delete(url, config)
}

// 取消所有请求
export const cancelAllRequests = () => {
  pendingRequests.forEach((cancel) => cancel('取消所有请求'))
  pendingRequests.clear()
}

export default request
