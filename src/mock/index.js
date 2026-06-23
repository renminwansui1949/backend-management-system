const token = 'mock-token-abc123xyz'

const userInfo = {
  id: 1,
  username: 'admin',
  nickName: '管理员',
  email: 'chinacjf1226.com',
  phone: '13800000000',
  sex: '1',
  avatar: '',
  status: '1',
  roles: ['admin'],
}

const mockRoutes = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      titleEn: 'Home',
      icon: 'HomeOutlined',
      isFrame: false,
    },
    component: '/home/index.vue',
  },
  {
    path: '/system',
    name: 'System',
    meta: {
      title: '系统管理',
      titleEn: 'System',
      icon: 'SettingOutlined',
      isFrame: false,
    },
    component: '/system/index.vue',
    children: [
      {
        path: '/system/user',
        name: 'User',
        meta: {
          title: '用户管理',
          titleEn: 'User',
          icon: 'UserOutlined',
          isFrame: false,
        },
        component: '/system/user/index.vue',
      },
      {
        path: '/system/role',
        name: 'Role',
        meta: {
          title: '角色管理',
          titleEn: 'Role',
          icon: 'TeamOutlined',
          isFrame: false,
        },
        component: '/system/role/index.vue',
      },
      {
        path: '/system/menu',
        name: 'Menu',
        meta: {
          title: '菜单管理',
          titleEn: 'Menu',
          icon: 'MenuOutlined',
          isFrame: false,
        },
        component: '/system/menu/index.vue',
      },
      {
        path: '/system/dict',
        name: 'Dict',
        meta: {
          title: '字典管理',
          titleEn: 'Dict',
          icon: 'BookOutlined',
          isFrame: false,
        },
        component: '/system/dict/index.vue',
      },
      {
        path: '/system/dict/data',
        name: 'DictData',
        meta: {
          title: '字典数据',
          titleEn: 'Dict Data',
          icon: 'DatabaseOutlined',
          isFrame: false,
        },
        component: '/system/dict/data/index.vue',
      },
      {
        path: '/system/log/login-log',
        name: 'LoginLog',
        meta: {
          title: '登录日志',
          titleEn: 'Login Log',
          icon: 'FileTextOutlined',
          isFrame: false,
        },
        component: '/system/log/login-log/index.vue',
      },
      {
        path: '/system/log/operator-log',
        name: 'OperatorLog',
        meta: {
          title: '操作日志',
          titleEn: 'Operator Log',
          icon: 'FileExcelOutlined',
          isFrame: false,
        },
        component: '/system/log/operator-log/index.vue',
      },
    ],
  },
  {
    path: '/article',
    name: 'Article',
    meta: {
      title: '文章管理',
      titleEn: 'Article',
      icon: 'FileTextOutlined',
      isFrame: false,
    },
    component: '/article/category/index.vue',
    children: [
      {
        path: '/article/category',
        name: 'ArticleCategory',
        meta: {
          title: '文章分类',
          titleEn: 'Category',
          icon: 'FolderOutlined',
          isFrame: false,
        },
        component: '/article/category/index.vue',
      },
      {
        path: '/article/list',
        name: 'ArticleList',
        meta: {
          title: '文章列表',
          titleEn: 'Article List',
          icon: 'UnorderedListOutlined',
          isFrame: false,
        },
        component: '/article/list/index.vue',
      },
    ],
  },
  {
    path: '/ai',
    name: 'AI',
    meta: {
      title: 'AI 助手',
      titleEn: 'AI',
      icon: 'RobotOutlined',
      isFrame: false,
    },
    component: '/ai/chat/index.vue',
    children: [
      {
        path: '/ai/chat',
        name: 'AIChat',
        meta: {
          title: 'AI Chat',
          titleEn: 'AI Chat',
          icon: 'MessageOutlined',
          isFrame: false,
        },
        component: '/ai/chat/index.vue',
      },
    ],
  },
  {
    path: '/demo',
    name: 'Demo',
    meta: {
      title: '演示',
      titleEn: 'Demo',
      icon: 'PlaySquareOutlined',
      isFrame: false,
    },
    component: '/demo/keep-alive/index.vue',
    children: [
      {
        path: '/demo/keep-alive',
        name: 'KeepAlive',
        meta: {
          title: '缓存页面',
          titleEn: 'Keep Alive',
          icon: 'ReloadOutlined',
          isFrame: false,
        },
        component: '/demo/keep-alive/index.vue',
      },
    ],
  },
  {
    path: '/tests/page1',
    name: 'TestPage',
    meta: {
      title: '测试页面',
      titleEn: 'Test Page',
      icon: 'BugOutlined',
      isFrame: false,
    },
    component: '/tests/page1.vue',
  },
]

const mockPermissions = [
  'system:user:list',
  'system:user:add',
  'system:user:edit',
  'system:user:delete',
  'system:role:list',
  'system:role:add',
  'system:role:edit',
  'system:role:delete',
  'system:menu:list',
  'system:menu:add',
  'system:menu:edit',
  'system:menu:delete',
  'system:dict:list',
  'system:dict:add',
  'system:dict:edit',
  'system:dict:delete',
  'system:log:list',
  'system:log:delete',
]

export const mockMap = {
  '/login': { code: 200, data: { result: token } },
  '/user/info': { code: 200, data: { result: userInfo } },
  '/routes': { code: 200, data: { result: mockRoutes } },
  '/permission': { code: 200, data: { result: mockPermissions } },
}
