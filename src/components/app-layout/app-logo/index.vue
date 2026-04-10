<template>
  <div class="app-logo">
    <img src="./images/logo.svg" alt="" />
    <span v-show="isShowTitle">{{ appStore.appConfig.title }}</span>
  </div>
</template>

<script setup>
import { defineOptions, defineProps } from 'vue'
import { useAppStore } from '@/stores/app'
import { useThemeToken } from '../hooks/use-theme-token.js'

defineOptions({
  name: 'ProLogo',
})

defineProps({
  isShowTitle: {
    type: Boolean,
    default: true,
  },
})

const { colorTextBase } = useThemeToken()

const appStore = useAppStore()
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  min-height: 50px;

  > img {
    width: 32px;
    height: 32px;
  }

  > span {
    margin-left: 8px;
    font-size: 18px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: v-bind('colorTextBase');
  }
}
</style>
