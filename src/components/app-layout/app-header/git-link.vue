<template>
  <div class="language" style="margin-right: 6px">
    <a-dropdown placement="bottom">
      <a-button type="text" size="small">
        <GithubOutlined />
      </a-button>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="https://gitee.com/hejingyuan01/open-sanyuan-web">
            <LinkOutlined />
            前端项目
          </a-menu-item>
          <a-menu-item key="https://gitee.com/hejingyuan01/open-sanyuan-services">
            <LinkOutlined />
            后端项目
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import { defineOptions } from 'vue'
import { GithubOutlined, LinkOutlined } from '@ant-design/icons-vue'

defineOptions({
  name: 'Language',
})

const handleMenuClick = ({ key }) => {
  window.open(key)
}
</script>
