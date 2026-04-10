import { usePermissionStore } from '@/stores/permission'

/**
 * 权限判断指令
 * 用法: v-permission="'user:add'" 或 v-permission="['user:add', 'user:edit']"
 */
export const permission = {
  mounted(el, binding) {
    const { value } = binding

    if (value) {
      // 获取 permission store 实例
      // 注意：在 setup 外部或指令中，需要确保 store 已经初始化或者通过 getApp 获取
      // 这里假设在 main.js 中已经 pinia.use() 或者直接导入使用
      const { buttonPermissionMap } = usePermissionStore()
      // 判断逻辑：如果传入的是数组，则只要包含其中一个权限即可；如果是字符串，则必须完全匹配
      const hasPermission = Array.isArray(value)
        ? value.some((item) => buttonPermissionMap[item])
        : buttonPermissionMap[value]

      // 如果没有权限，移除该 DOM 元素
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(
        "need roles! Like v-permission=\"'user:add'\" or v-permission=\"['user:add','user:edit']\"",
      )
    }
  },
}
