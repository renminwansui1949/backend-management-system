# pro-layout

> 实现体格pro-layout

## pro-layout

> 壳子

## pro-layout-header

> 标题、描述等信息，放置于布局区域顶部

- title（string） 字段
- useBack(boolean) 支持返回上一层
- description(string) 描述
- sticky(boolean) 启用粘性定位
- 插槽default
- 插槽operations 放在右侧得操作层

## pro-layout-main

> 会占满剩下得区域

- 插槽default

## pro-layout-aside

> 容器侧边

- 支持 resizable 变更宽度
- min-width 可以变更最小、最大可拖拽宽度
- max-width 可以变更最小、最大可拖拽宽度
- content-min-width 内容的最小宽度
- collapsable 展开收起按钮
- collapsed 默认展示收起得状态
- @collapsed-change 展开收起按钮变更

## pro-layout-footer

> 底部

- 插槽default
- sticky（bloolean） 粘性定位

## pro-layout-section

> 用于页面内容分块展示

- header 插槽
- fill(bloolean) 撑满整页
- title(string) 区块得标题 divided(bloolean) 设置标题得分割线
- collapsable 可设置是否可以对内容展开收起
- prefix（dot | line | collapser）支持插槽

## pro-layout-nav

> 快速实现业内导航
