<template>
  <div class="language" style="margin-right: 6px">
    <a-dropdown placement="bottom">
      <a-button type="text" size="small">
        <span class="anticon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            class="iconify iconify--meteor-icons"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2 5h14M9 2v3m4 0q-2 8-9 11m2-7q2 4 6 6m1 7l5-11l5 11m-1.4-3h-7.2"
            ></path>
          </svg>
        </span>
      </a-button>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item :key="LANG_MAP.ZH_CN">
            <img src="@/assets/china.svg" style="width: 16px" alt="" srcset="" />
            简体中文
          </a-menu-item>
          <a-menu-item :key="LANG_MAP.EN">
            <img src="@/assets/English.svg" style="width: 16px" alt="" srcset="" />
            English
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import { defineOptions } from 'vue'
import { LANG_MAP, getCurrentLang } from '@/utils/language'

defineOptions({
  name: 'Language',
})

const handleMenuClick = ({ key }) => {
  const currentLang = getCurrentLang()
  if (key !== currentLang) {
    localStorage.setItem('lang', key)
    window.location.reload()
  }
}
</script>
