import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../lang/index'

import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import 'simplebar-vue/dist/simplebar.min.css'
import '@/assets/iconfont/iconfont.css'
import '@/style/transition.less'
import { permission } from './directives/permission' // 引入指令

import ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
const app = createApp(App)

app.directive('permission', permission) // 注册全局指令

app.use(createPinia())
app.use(router)
app.use(ColorPicker)
app.use(Antd)

app.mount('#app')
