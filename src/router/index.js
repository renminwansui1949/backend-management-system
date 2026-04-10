import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useUserStore } from '@/stores/user'
import { useGlobalLoading } from '@/hooks/use-global-loading'

import { usePreposition } from '@/hooks/use-preposition'
import { BASIC_ROUTE } from './basic'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: BASIC_ROUTE,
})

function getRoutePath(url = window.location.href) {
  const urlObj = new URL(url)
  return urlObj.pathname || '/'
}

// NProgress Configuration
NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, _, next) => {
  NProgress.start()
  const { closeGlobalLoading } = useGlobalLoading()
  if (to.path === '/login') {
    next()
    closeGlobalLoading()
    return
  }

  // 没有token 去登录页面
  if (!localStorage.getItem('token')) {
    next('/login')
    return
  }

  const userStore = useUserStore()
  if (!userStore.userInfo.id) {
    // 判断是不是首次登录，首次登录获取用户信息
    try {
      const { initPreposition } = usePreposition()
      await initPreposition()
      // ps: 因为to的信息这个时候已经变成404的路由信息了，用URL上的路由做为跳转
      closeGlobalLoading()
      next(getRoutePath(), { replace: true })
      return
    } catch (error) {
      console.log(error, '获取用户信息失败')
      localStorage.removeItem('token')
      next('/login')
      return
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(() => {
  NProgress.done()
})

export default router
