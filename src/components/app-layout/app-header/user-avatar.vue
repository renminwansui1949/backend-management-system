<template>
  <div class="user-avatar" style="margin-right: 6px">
    <a-dropdown placement="bottom">
      <a-button type="text" size="small">
        <UserOutlined />
        {{ userInfo.username }}
      </a-button>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="Logout">
            <i class="iconfont" style="margin-right: 4px">&#xe60b;</i>退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import { defineOptions, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'ant-design-vue'
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

import { useUserStore } from '@/stores/user'

defineOptions({
  name: 'UserAvatar',
})

const { clearUserInfo, userInfo } = useUserStore()

const router = useRouter()

const logout = () => {
  Modal.confirm({
    title: '提醒',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定要退出登录吗？',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      clearUserInfo()
      localStorage.removeItem('token')
      router.push('/login')
    },
  })
}
const handleMenuClick = (e) => {
  if (e.key === 'Logout') {
    logout()
  }
}
</script>
