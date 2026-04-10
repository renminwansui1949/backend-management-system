import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getUserInfoApi } from '@/api/system/user'

/**
 * 处理系统中用户信息
 */
export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})

  const getUserInfo = async () => {
    const { data } = await getUserInfoApi()
    userInfo.value = data.result
  }

  const clearUserInfo = () => {
    userInfo.value = {}
  }
  return {
    getUserInfo,
    clearUserInfo,
    userInfo,
  }
})
