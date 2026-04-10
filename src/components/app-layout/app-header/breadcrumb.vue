<template>
  <div class="breadcrumb-container">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :href="item.href">
        <component :is="item.icon" />
        <span>{{ item.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup>
import { defineOptions, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

import { usePermissionStore } from '@/stores/permission'
const { menuPermission } = usePermissionStore()

defineOptions({
  name: 'Breadcrumb',
})

const route = useRoute()
const breadcrumbList = ref([])

/**
 * 是否包含当前路由
 */
const isIncludesPath = (item) => {
  // 因为有params 参数 导致匹配不到的情况，改用name值判断
  if (item.name === route.name) {
    return true
  }

  return (item?.children || []).some((item) => {
    return isIncludesPath(item)
  })
}

const getBreadcrumbList = (data = menuPermission) => {
  const result = []

  for (let index = 0; index < data.length; index++) {
    const element = data[index]

    if (isIncludesPath(element)) {
      result.push({
        icon: element.meta.icon,
        key: element.path,
        label: element.meta.title,
        title: element.meta.title,
      })
    }

    if (element.children) {
      result.push(...getBreadcrumbList(element.children))
    }
  }

  return result
}

watch(
  () => route.path,
  () => {
    const allBreadcrumbList = getBreadcrumbList()
    const startBreadcrumb = allBreadcrumbList.slice(0, -1).map((item) => {
      return {
        ...item,
        href: '',
      }
    })
    const endBreadcrumb = allBreadcrumbList.slice(-1).map((item) => {
      return {
        ...item,
        href: item.path,
      }
    })

    breadcrumbList.value = [].concat(startBreadcrumb, endBreadcrumb)
  },
  { immediate: true },
)
</script>
