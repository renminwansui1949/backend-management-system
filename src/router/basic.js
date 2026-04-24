import { h } from 'vue'
import { UnorderedListOutlined } from '@ant-design/icons-vue'

import ProIcon from '@/components/pro-icon/index.vue'

export const BASIC_ROUTE = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    redirect: '/fallback/404',
  },
  {
    path: '/fallback',
    meta: {
      title: '异常页面',
      icon: () =>
        h(ProIcon, {
          name: 'icon-auto',
        }),
    },
    component: () => import('@/components/app-layout/index.vue'),
    name: 'fallback',
    children: [
      {
        path: `/fallback/403`,
        meta: {
          title: `403`,
          icon: () => h(UnorderedListOutlined),
        },
        component: () => import('@/views/fallback/403.vue'),
      },
      {
        path: `/fallback/404`,
        meta: {
          title: `404`,
          icon: () => h(UnorderedListOutlined),
        },
        component: () => import('@/views/fallback/404.vue'),
      },
      {
        path: `/fallback/500`,
        meta: {
          title: `500`,
          icon: () => h(UnorderedListOutlined),
        },
        component: () => import('@/views/fallback/500.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/components/app-layout/index.vue'),
    children: [],
  },
]
