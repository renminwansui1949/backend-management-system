import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
export const usePreposition = () => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  const router = useRouter()

  const initPreposition = async () => {
    if (!userStore.userInfo.id) {
      // 判断是不是首次登录，首次登录获取用户信息
      try {
        await Promise.all([
          userStore.getUserInfo(),
          permissionStore.getButtonPermission(),
          permissionStore.getRoutePermission(),
        ])
        permissionStore.menuPermission.forEach((route) => {
          router.addRoute('Layout', route)
        })
      } catch (error) {
        console.log(error, '获取用户信息失败')
        localStorage.removeItem('token')
      }
    }
  }

  return {
    initPreposition,
  }
}
