# sanyuan-admin

> 帮助你快速实现一个系统，里面的一些封装非常适合学习，助各位前程似锦。

## 演示地址：

[https://sanyuan.website/](https://sanyuan.website/) admin 用户名：admin 密码：123456

## 演示截图

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
  <img src="https://sanyuan.website/md-image/image1.png" style="width: 100%; height: auto;" />
  <img src="https://sanyuan.website/md-image/image2.png" style="width: 100%; height: auto;" />
  <img src="https://sanyuan.website/md-image/image3.png" style="width: 100%; height: auto;" />
  <img src="https://sanyuan.website/md-image/image4.png" style="width: 100%; height: auto;" />
  <img src="https://sanyuan.website/md-image/image5.png" style="width: 100%; height: auto;" />
  <img src="https://sanyuan.website/md-image/image6.png" style="width: 100%; height: auto;" />
</div>

## 功能介绍

- 角色管理
- 日志管理
- 菜单管理
- 用户管理
- 字典管理
- 暗色主题适配切换
- 现支持2种布局方式，未来会支持更多常用的布局已经在规划中～
- 支持适配主题色、色弱模式、灰色模式
- 支持4种路由过渡动画
- 支持国际化，内涵轻松适配各种语言的方案
- 支持权限控制
- 支持路由缓存
- 支持菜单外链、内嵌自定义
- 支持两种标签栏定制

## 组件封装以及三方插件

> 本项目为了简单好用，并没有什么过渡的封装组件，为了更好的适配主题更改，只写了几个布局包装的组件。需要什么组件全凭你自己定义。

- 初衷是为了更好接受框架，并没有因为什么乱七八糟的东西，等后面如果用户需要的时候再封装。

```json
// package.json
 "dependencies": {
    "@vueuse/core": "^14.1.0",
    "ant-design-vue": "^4.2.6",
    "ant-design-x-vue": "^1.6.0", // AI-Cart 先暂时用开源的，后面也会封装一个可渲染·组件·的ai-markdown组件，并且介绍下流式数据请求
    "axios": "^1.13.6",
    "dayjs": "^1.11.19",
    "lodash": "^4.17.21",
    "nprogress": "^0.2.0", // 顶部模拟进度条
    "pinia": "^3.0.4",
    "simplebar-vue": "^2.4.2", // 隐藏滚动条
    "vue": "^3.5.25",
    "vue-clipboard3": "^2.0.0", // 复制
    "vue-router": "^4.6.3",
    "vue3-colorpicker": "^2.3.0" //ant-design-vue没有颜色选择器， 引入颜色选择器
  },
```
