import { defineStore } from 'pinia'
import { ref, h } from 'vue'
import { keyBy } from 'lodash'
import { getButtonPermissionApi, getRoutePermissionApi } from '@/api/permission'
import ProIcon from '@/components/pro-icon/index.vue'
import Iframe from '@/components/iframe/index.vue'

import { isEnFunction } from '@/utils/language'

const isEN = isEnFunction()
const getRouterLoadView = (menu) => {
  const modules = import.meta.glob('@/views/**/*.vue')
  const filePath = `/src/views${menu.component}`
  const componentLoader = modules[filePath]
  return componentLoader
}

const renderIframe = (url) => {
  return h(Iframe, { url })
}

function generateDynamicRoutes(menus) {
  if (!menus || !menus.length) return []

  return menus.map((menu) => {
    // 【iframe 外链】 内嵌模式的数据 isFrame = true, frameType = 2
    /**
     * 【iframe 外链】
     * 处理path 默认生成使用/iframe/xxxx 模式
     */
    const isFrameAdnInline = menu?.meta?.frameType === '2' && menu?.meta?.isFrame
    const route = {
      ...menu,
      path: isFrameAdnInline ? `/iframe/${menu.meta.titleEn}` : menu.path,
      name: menu.name || menu.path,
      meta: {
        ...menu.meta,
        title: isEN ? menu.meta?.titleEn : menu.meta?.title,
        icon: menu.meta?.icon ? h(ProIcon, { name: menu.meta.icon }) : '',
        isFrame: isFrameAdnInline ? false : menu.meta.isFrame,
      },
      component: isFrameAdnInline ? renderIframe(menu.path) : getRouterLoadView(menu),
    }
    if (menu.children && menu.children.length > 0) {
      route.children = generateDynamicRoutes(menu.children)
    }
    return route
  })
}

/**
 * 处理系统中的 菜单权限， 按钮权限
 */
export const usePermissionStore = defineStore('permission', () => {
  const menuPermission = ref([])
  const buttonPermissionMap = ref({})

  const getButtonPermission = async () => {
    const { data } = await getButtonPermissionApi()
    buttonPermissionMap.value = keyBy(data?.result || [], (item) => item)
  }

  const getRoutePermission = async () => {
    const { data } = await getRoutePermissionApi()
    menuPermission.value = generateDynamicRoutes(data?.result || [])
  }

  const isPermission = (code) => {
    return buttonPermissionMap.value[code]
  }

  return {
    menuPermission,
    isPermission,
    buttonPermissionMap,
    getButtonPermission,
    getRoutePermission,
  }
})
