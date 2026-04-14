import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import { useLayoutStore } from '@/stores/layout'
import { LAYOUT_MODE } from '@/constant/layout'

const formatDynamicRouter = (data = []) => {
  const result = []
  data.forEach((item) => {
    if (item.hidden) return // 配置不显示的菜单
    result.push({
      icon: item.meta.icon,
      key: item.path,
      path: item.path,
      name: item.name,
      label: item.meta.title,
      title: item.meta.title,
      isFrame: item.meta.isFrame,
      children: item.children ? formatDynamicRouter(item.children) : null,
    })
  })
  return result
}

const isIncludesPath = (item, currentName) => {
  // 因为有params 参数 导致匹配不到的情况，改用name值判断
  if (item.name === currentName) {
    return true
  }
  return (item?.children || []).some((item) => {
    return isIncludesPath(item, currentName)
  })
}

const getCurrentPathLinks = (data = [], currentName = '') => {
  // ps: 获取到整个路径['/system', '/system/log', '/system/log/XXXX']
  const results = []
  data.forEach((item) => {
    if (isIncludesPath(item, currentName) && !item.hidden) {
      results.push(item.path)
    }
    if (item?.children?.length) {
      results.push(...getCurrentPathLinks(item.children, currentName))
    }
  })
  return results
}

const getFirstChildrenMenu = (data = []) => {
  // 找到非菜单目录的数据
  for (let i = 0; i < data.length; i++) {
    if (!data[i]?.children) {
      return data[i]
    }
    const item = getFirstChildrenMenu(data[i].children)
    if (item) {
      return item
    }
  }
}

export const useMenu = () => {
  const route = useRoute()
  const router = useRouter()
  const layoutStore = useLayoutStore()
  const { menuPermission } = usePermissionStore()
  const allMenu = ref(formatDynamicRouter(menuPermission))
  const selectedKeys = ref([])
  const leave1Menu = ref(
    allMenu.value.map((item) => {
      if (item?.children?.length) {
        return {
          ...item,
          toChildrenPath: getFirstChildrenMenu(item.children)?.path,
          children: null,
        }
      }
      return item
    }),
  )
  const leave2AndSubLevel = ref([]) // 2级以及其他

  const handleMenuClick = (e) => {
    if (e.item.isFrame) {
      window.open(e.key)
    } else {
      // 点击一级  优先跳子级
      router.push(e?.item?.toChildrenPath || e.key)
    }
  }

  /**
   * 水平布局: 获取全部菜单
   * 垂直布局: 获取全部菜单
   * 混合布局: 头部获取一级菜单，侧边栏或者顶部对应选中菜单的剩余菜单
   * 侧边双栏布局: 第一栏获取一级菜单，第二栏获取对应选中菜单下的剩余菜单
   * 混合侧边双栏布局(待实现，适用菜单比较多的项目)：top获取一级菜单，侧边第一级获取1级数据、侧边二级获取剩余的
   *
   *
   * 直接处理成5种数据（在组件上需要用哪一种自己应用）：
   * 1、ALL
   * 2、1级  1级有子菜单的数据 需要有个toChildrenPath默认指向 子菜单第一项
   * 3、2级 + 剩余 （根据当前选中的路由）
   *
   *  当前的4中布局应该用不上下面这两种数据，等适配混合双栏模式就需要了
   * 4、2级 （据当前选中的路由） 2级有子菜单的数据 需要有个toChildrenPath默认指向 子菜单第一项
   * 5 3级 + 剩余 （据当前选中的路由）
   */

  watch(
    () => route.path,
    () => {
      const currentName = route.name
      // 根据当前的路由，直接获取整个链路 方便各个菜单选中
      selectedKeys.value = getCurrentPathLinks(menuPermission, currentName)

      if (
        layoutStore.layoutConfig.mode === LAYOUT_MODE.MIXED ||
        layoutStore.layoutConfig.mode === LAYOUT_MODE.TOW_SIDE
      ) {
        // 根据当前选中的路由查询 leave2AndSubLevel 数据
        leave2AndSubLevel.value = formatDynamicRouter(
          menuPermission.find((item) => isIncludesPath(item, currentName))?.children || [],
        )
      }
    },
    { immediate: true },
  )

  return {
    allMenu,
    selectedKeys,
    leave1Menu,
    leave2AndSubLevel,
    handleMenuClick,
  }
}
