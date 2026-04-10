<template>
  <div class="setting-container">
    <a-tooltip placement="bottom">
      <template #title>
        <span>偏好设置</span>
      </template>
      <a-button type="text" size="small" @click="onSetting">
        <SettingOutlined />
      </a-button>
    </a-tooltip>
  </div>

  <Teleport to="body">
    <a-float-button shape="circle" v-if="!layoutStore.layoutConfig.showNav">
      <template #icon>
        <SettingOutlined @click="onSetting" />
      </template>
    </a-float-button>
  </Teleport>

  <a-drawer title="偏好设置" width="320px" v-model:open="visible" @close="onClose">
    <template #footer>
      <a-button style="margin-right: 8px" @click="onReload">重置配置</a-button>
      <a-button type="primary" @click="onCopy">复制配置</a-button>
    </template>

    <div class="setting-header">
      <a-segmented v-model:value="activeKey" :options="segmentedOptions" block />
    </div>

    <div class="setting-content">
      <Transition name="fade" mode="out-in">
        <!-- 主题配置 -->
        <div v-if="activeKey === TAB_MAP.THEME" class="setting-item">
          <div style="margin: 0 auto" class="preference-item">
            <a-segmented v-model:value="themeStore.themeConfig.mode" :options="themeOptions">
              <template #label="{ value }">
                <div>
                  <i class="iconfont" v-if="value === themeOptions[0].value">&#xe672;</i>
                  <i class="iconfont" v-if="value === themeOptions[1].value">&#xe62c;</i>
                  <i class="iconfont" v-if="value === themeOptions[2].value">&#xe600;</i>
                </div>
              </template>
            </a-segmented>
          </div>
          <div class="preference-item">
            <label>色弱模式</label>
            <a-switch v-model:checked="themeStore.themeConfig.colorWeakness" />
          </div>
          <div class="preference-item">
            <label>灰色模式</label>
            <a-switch v-model:checked="themeStore.themeConfig.grayscale" />
          </div>
          <div class="preference-item">
            <label>主题色</label>
            <div>
              <ColorPicker
                format="hex"
                shape="square"
                v-model:pureColor="themeStore.themeConfig.primaryColor"
              />
              <span style="color: var(--color-text-secondary)">{{
                themeStore.themeConfig.primaryColor
              }}</span>
            </div>
          </div>
        </div>
        <!-- 布局配置 -->
        <div v-else-if="activeKey === TAB_MAP.LAYOUT" class="setting-item">
          <div class="preference-item">
            <label>显示LOGO</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.showLogo" />
          </div>
          <div class="preference-item">
            <label>布局模式</label>
            <a-select
              v-model:value="layoutStore.layoutConfig.mode"
              :size="size"
              style="width: 120px"
              :options="layoutModeOptions"
            ></a-select>
          </div>
          <div class="preference-item">
            <label>菜单分组</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.sidebarMenuGroup" />
          </div>
          <div class="preference-item">
            <label>菜单分割线</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.sidebarMenuDivider" />
          </div>
          <h3 style="margin-top: 8px">顶栏</h3>
          <div class="preference-item">
            <label>显示顶栏</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.showNav" />
          </div>
          <div class="preference-item">
            <label>固定顶栏</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.navFixed" />
          </div>
          <div class="preference-item">
            <label>顶栏高度</label>
            <a-input-number
              id="inputNumber"
              v-model:value="layoutStore.layoutConfig.navHeight"
              :min="1"
            />
          </div>
          <h3 style="margin-top: 8px">标签栏</h3>
          <div class="preference-item">
            <label>显示标签栏</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.showTabbar" />
          </div>
          <div class="preference-item">
            <label>持久化标签栏</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.tabsPersist" />
          </div>
          <div class="preference-item">
            <label>标签栏高度</label>
            <a-input-number
              id="inputNumber"
              v-model:value="layoutStore.layoutConfig.tabbarHeight"
              :min="1"
            />
          </div>
          <div class="preference-item">
            <label>标签栏模式</label>
            <a-select
              v-model:value="layoutStore.layoutConfig.tabsMode"
              :size="size"
              style="width: 88px"
              :options="tabsModeOptions"
            ></a-select>
          </div>

          <h3 style="margin-top: 8px">侧边栏布局</h3>
          <div class="preference-item">
            <label>显示侧边栏</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.showSidebar" />
          </div>
          <div class="preference-item">
            <label>侧边栏折叠</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.collapsed" />
          </div>
          <div class="preference-item">
            <label>折叠后显示菜单名</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.sidebarCollapsedShowMenuTitle" />
          </div>
          <div class="preference-item">
            <label>侧边栏宽度</label>
            <a-input-number
              id="inputNumber"
              v-model:value="layoutStore.layoutConfig.sidebarWidth"
              :min="1"
            />
          </div>
          <div class="preference-item">
            <label>折叠后侧边栏宽度</label>
            <a-input-number
              id="inputNumber"
              v-model:value="layoutStore.layoutConfig.sidebarCollapsedWidth"
              :min="1"
            />
          </div>
          <h3 style="margin-top: 8px">底部</h3>
          <div class="preference-item">
            <label>显示底部</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.showFooter" />
          </div>
          <div class="preference-item">
            <label>固定底部</label>
            <a-switch v-model:checked="layoutStore.layoutConfig.footerFixed" />
          </div>
          <div class="preference-item">
            <label>底部高度</label>
            <a-input-number
              id="inputNumber"
              v-model:value="layoutStore.layoutConfig.footerHeight"
              :min="1"
            />
          </div>
        </div>
        <!-- 其他配置 -->
        <div v-else="activeKey === TAB_MAP.OTHER">
          <div class="preference-item">
            <label>路由过渡动画</label>
            <a-select
              v-model:value="appStore.appConfig.transitionName"
              :size="size"
              style="width: 120px"
              :options="transitionOptions"
            ></a-select>
          </div>
        </div>
      </Transition>
    </div>
  </a-drawer>
</template>

<script setup>
import { SettingOutlined } from '@ant-design/icons-vue'
import { defineOptions, ref, watch } from 'vue'
import useClipboard from 'vue-clipboard3'

import { useThemeStore } from '@/stores/theme'
import { useLayoutStore } from '@/stores/layout'
import { useAppStore } from '@/stores/app'
import { usePreferenceLocalStore } from '@/stores/preference-local'
import { useThemeToken } from '../hooks/use-theme-token'
import { LAYOUT_MODE } from '@/constant/layout'

import { transitionOptions } from '@/constant/transition'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'Setting',
})

const { toClipboard } = useClipboard()
const themeStore = useThemeStore()
const appStore = useAppStore()
const layoutStore = useLayoutStore()
const { preferenceConfig } = usePreferenceLocalStore()

const { colorTextSecondary } = useThemeToken()

const TAB_MAP = {
  THEME: 'theme',
  LAYOUT: 'layout',
  OTHER: 'other',
}
const segmentedOptions = [
  {
    label: '主题',
    value: TAB_MAP.THEME,
  },
  {
    label: '布局',
    value: TAB_MAP.LAYOUT,
  },
  {
    label: '其他',
    value: TAB_MAP.OTHER,
  },
]
const themeOptions = [
  {
    value: 'light',
  },
  {
    value: 'dark',
  },
  {
    value: 'auto',
  },
]

const layoutModeOptions = [
  {
    label: '水平布局',
    value: LAYOUT_MODE.HORIZONTAL,
  },
  {
    label: '侧边栏布局',
    value: LAYOUT_MODE.SIDE,
  },
  {
    label: '混合布局（待实现）',
    value: LAYOUT_MODE.MIXED,
  },
  {
    label: '垂直布局（待实现）',
    value: LAYOUT_MODE.VERTICAL,
  },
]

const tabsModeOptions = [
  {
    label: '谷歌',
    value: 'chrome',
  },
  {
    label: '卡片',
    value: 'card',
  },
]
const visible = ref(false)

const onSetting = () => {
  visible.value = true
}

const onClose = () => {
  visible.value = false
}

const activeKey = ref(TAB_MAP.THEME)

const onReload = () => {
  themeStore.reloadPreferenceConfig()
}

const onCopy = async () => {
  const jsonString = JSON.stringify(preferenceConfig, null, 2)
  await toClipboard(jsonString)
  message.success('复制成功')
}

watch(
  () => colorTextSecondary.value,
  (val) => {
    document.documentElement.style.setProperty('--color-text-secondary', val)
  },
  { immediate: true },
)
</script>

<style lang="less" scoped>
.setting-content {
  padding-top: 24px;
}

.preference-item {
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: space-between;

  > label {
    color: var(--color-text-secondary);
  }
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
