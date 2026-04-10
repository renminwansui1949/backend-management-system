import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import { uniqBy, keyBy } from 'lodash'

import { flattenTree } from '@/utils/flatten'
import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'
const { menuPermission } = usePermissionStore()
const userStore = useUserStore()

const flattenDynamicRouter = flattenTree(menuPermission)
const pathRouterMap = keyBy(flattenDynamicRouter, 'path')

const getTabsStoreKeys = () => {
  return `tabs_${userStore.userInfo.id}`
}

const getStoreTabs = () => {
  const tabs = localStorage.getItem(getTabsStoreKeys())
  //ps: 因为支持了国际化，需要把meta.title转换成对应的语言
  return (tabs ? JSON.parse(tabs) : []).map((item) => {
    const currentDynamicRouterItem = pathRouterMap[item.path] || {}
    return {
      ...item,
      meta: {
        ...item.meta,
        title: currentDynamicRouterItem?.meta?.title || item.meta.title,
      },
    }
  })
}

export const MENU_ITEM_MAP = {
  TOGGLEFIXED: 'toggleFixed',
  CLOSELEFT: 'closeLeft',
  CLOSEOTHER: 'closeOther',
  CLOSERIGHT: 'closeRight',
  OPEN: 'open',
  CLOSE: 'close',
}

export const useStoreTabs = defineStore('tabs', () => {
  const router = useRouter()
  const route = useRoute()
  const layoutStore = useLayoutStore()
  const tabs = ref(getStoreTabs())

  router.beforeEach((to, _, next) => {
    if (to.path !== '/login') {
      addTabsData(to)
    }

    next()
  })

  const currentActivePath = computed(() => {
    return route.path
  })

  const removeStoreTabs = () => {
    localStorage.removeItem(getTabsStoreKeys())
  }

  const setStoreTabs = (tabs) => {
    if (layoutStore.layoutConfig.tabsPersist) {
      localStorage.setItem(getTabsStoreKeys(), JSON.stringify(uniqBy(tabs, 'path')))
    }
  }

  const isTabFlexed = (index) => {
    const {
      meta: { fixedInTabs },
    } = tabs.value[index]
    return fixedInTabs
  }

  const sortTabs = () => {
    // fixedInTabs  === true再前面
    // fixedInTabs === false 再后面
    const flxedInTabsData = []
    const unFlexInTabsData = []

    tabs.value.forEach((item, idx) => {
      if (isTabFlexed(idx)) {
        flxedInTabsData.push(item)
      } else {
        unFlexInTabsData.push(item)
      }
    })
    tabs.value = [...flxedInTabsData, ...unFlexInTabsData]
  }

  const addTabsData = (routeItem) => {
    //ps: 本地存储没办法存储 ICON 信息， 再tab组件中用path查询到ICON
    if (!tabs.value.some((item) => item.path === routeItem.path)) {
      tabs.value.push({
        path: routeItem.path,
        name: routeItem.name,
        meta: {
          title: routeItem?.meta?.title,
          fixedInTabs: routeItem?.meta?.fixedInTabs,
        },
      })
      sortTabs()
      setStoreTabs(tabs.value)
    }
  }

  const removeExcludesInFlexedTabs = ({ path }) => {
    const findIndex = tabs.value.findIndex((item) => item.path === path)
    if (!isTabFlexed(findIndex)) {
      // 只删除 非固定的TAB标签
      tabs.value.splice(findIndex, 1)
    }
  }

  const handleSelectPrevRoute = () => {
    const findIndex = tabs.value.findIndex((item) => item.path === currentActivePath.value)
    const path = tabs.value?.[findIndex - 1]?.path
    if (path && !isTabFlexed(findIndex)) {
      router.push({ path })
      tabs.value.splice(findIndex, 1)
    }
  }

  const remove = (start, end) => {
    const startTarget = start
    const endTarget = end || startTarget + 1
    // 截取需要删除的tabs
    const beGoingToRmoveTab = tabs.value.slice(startTarget, endTarget)

    // 查询删除中是否包含 当前选中的数据
    const activeIndex = beGoingToRmoveTab.findIndex((item) => item.path === currentActivePath.value)

    beGoingToRmoveTab.forEach((item) => {
      if (item.path === currentActivePath.value && activeIndex !== -1) {
        // 最后再删除，主要为了，路由选中上一条数据
        return
      }
      removeExcludesInFlexedTabs(item)
    })
    if (activeIndex !== -1) {
      handleSelectPrevRoute()
    }

    setStoreTabs(tabs.value)
  }

  const toggleFixed = (path) => {
    // flxed 其实就是往前排  解除需要往后移动
    const findIndex = tabs.value.findIndex((item) => item.path === path)
    // 改变形态
    tabs.value[findIndex].meta.fixedInTabs = !tabs.value[findIndex].meta.fixedInTabs
    sortTabs()
    setStoreTabs(tabs.value)
  }

  const generateMenuItemKey = (key, keyPath, index) => {
    return `${key}__${keyPath}__${index}`
  }
  const getMenuItemInfo = (key) => {
    return {
      key: key.split('__')[0],
      keyPath: key.split('__')[1],
      index: +key.split('__')[2], // 索引转成数值
    }
  }

  watch(
    () => layoutStore.layoutConfig.tabsPersist,
    (value) => {
      if (!value) {
        removeStoreTabs()
      } else {
        setStoreTabs(tabs.value)
      }
    },
  )

  const reloadTabs = (route) => {
    tabs.value = getStoreTabs()
    addTabsData(route)
  }

  return {
    tabs,
    reloadTabs,
    remove,
    generateMenuItemKey,
    getMenuItemInfo,
    toggleFixed,
  }
})
