<template>
  <a-modal
    v-model:open="open"
    width="780px"
    :title="`${currentType === 'add' ? '新增' : '编辑'}`"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      autocomplete="off"
      :label-col="{ style: { width: '100px' } }"
    >
      <a-row :gutter="36">
        <a-col :span="24">
          <a-form-item label="上级菜单" name="parentId">
            <a-tree-select
              v-model:value="formState.parentId"
              show-search
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择父级菜单"
              allow-clear
              tree-default-expand-all
              :tree-data="currentTreeData"
              tree-node-filter-prop="label"
              :fieldNames="{ children: 'children', label: 'menuName', value: 'id' }"
            >
            </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="菜单类型" name="menuType">
            <a-radio-group v-model:value="formState.menuType">
              <a-radio
                :value="item.value"
                v-for="(item, idx) in MENU_OPTIONS"
                name="type"
                :key="idx"
              >
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

        <a-col :span="12" v-if="formState.menuType !== 'F'">
          <a-form-item label="菜单图标" name="icon">
            <a-popover
              trigger="click"
              placement="bottomLeft"
              v-model:open="popoverVisible"
              style="width: 300px"
            >
              <template #title></template>
              <template #content>
                <div style="width: 543px; max-height: 286px">
                  <div class="popover-header">
                    <a-input v-model:value="searchIcon" placeholder="请输入">
                      <template #suffix>
                        <AntdIcons.SearchOutlined />
                      </template>
                    </a-input>
                  </div>
                  <div
                    class="popover-content"
                    style="height: 248px; overflow-y: auto; overflow-x: hidden"
                  >
                    <ProLayoutSection
                      :title="value.title"
                      v-for="value in currentIcons"
                      :key="value.title"
                    >
                      <a-row :gutter="36">
                        <a-col :span="8" v-for="(item, idx) in value.data" :key="idx">
                          <a-button
                            :type="formState.icon === item.name ? 'primary' : 'text'"
                            @click="handleIconClick(item)"
                          >
                            <template #icon>
                              <pro-icon v-bind="item" />
                            </template>
                            <span style="font-size: 12px; margin-left: 8px">{{ item.name }}</span>
                          </a-button>
                        </a-col>
                      </a-row>
                    </ProLayoutSection>
                  </div>
                </div>
              </template>
              <a-input v-model:value="formState.icon" readonly placeholder="请选择菜单图标">
                <template #prefix>
                  <pro-icon :name="formState.icon" v-if="formState.icon" />
                </template>
              </a-input>
            </a-popover>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="显示排序" name="orderNum">
            <a-input-number
              id="inputNumber"
              v-model:value="formState.orderNum"
              :min="0"
              style="width: 100%"
              placeholder="请输入显示排序"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="菜单名称(中)" name="menuName">
            <a-input v-model:value="formState.menuName" placeholder="请输入中文菜单名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="菜单名称(英)" name="menuNameEn">
            <a-input v-model:value="formState.menuNameEn" placeholder="请输入英文菜单名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="formState.menuType !== 'F'">
          <a-form-item name="routeName">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span
                      >默认不填则和路由地址相同：如地址为：`user`，则名称为`User`（注意：为避免名字的冲突，特殊情况下请自定义，保证唯一性）</span
                    >
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">路由名称</span>
              </div>
            </template>
            <a-input v-model:value="formState.routeName" placeholder="请输入路由名称" />
          </a-form-item>
        </a-col>

        <a-col :span="12" v-if="formState.menuType === 'C'">
          <a-form-item name="isFrame">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>选择是外链则路由地址需要以`http(s)://`开头</span>
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">是否外链</span>
              </div>
            </template>
            <a-radio-group v-model:value="formState.isFrame">
              <a-radio
                :value="item.value"
                v-for="(item, idx) in YES_NO_OPTIONS"
                name="type"
                :key="idx"
              >
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="formState.menuType === 'C' && formState.isFrame === '1'">
          <a-form-item name="isFrame">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span
                      >内嵌: 用iframe嵌套在本系统中(请注意协议要跟系统相同，避免跨域);外链:
                      打开新浏览器窗口</span
                    >
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">外链模式</span>
              </div>
            </template>
            <a-radio-group v-model:value="formState.frameType">
              <a-radio value="1" name="type"> 外链 </a-radio>
              <a-radio value="2" name="type"> 内嵌 </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="formState.menuType !== 'F'">
          <a-form-item name="path">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span
                      >访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头</span
                    >
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">路由地址</span>
              </div>
            </template>
            <a-input v-model:value="formState.path" placeholder="请输入路由地址" />
          </a-form-item>
        </a-col>

        <a-col :span="12" v-if="formState.menuType === 'C'">
          <a-form-item name="component">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>访问的组件路径，如：`system/user/index.vue`，默认在`views`目录下</span>
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">组件路径</span>
              </div>
            </template>
            <a-input v-model:value="formState.component" placeholder="请输入组件路径" />
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="formState.menuType === 'F'">
          <a-form-item name="perms">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>配置权限字符如system:user </span>
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">权限字符</span>
              </div>
            </template>
            <a-input v-model:value="formState.perms" placeholder="请输入权限字符" />
          </a-form-item>
        </a-col>

        <a-col :span="12" v-if="formState.menuType === 'C'">
          <a-form-item name="query">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>访问路由的默认传递参数，如：`{"id": 1, "name": "chinacjf"}`</span>
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">路由参数</span>
              </div>
            </template>
            <a-input v-model:value="formState.query" placeholder="请输入路由参数" />
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="formState.menuType === 'C'">
          <a-form-item name="isCache">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致</span>
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">是否缓存</span>
              </div>
            </template>
            <a-radio-group v-model:value="formState.isCache">
              <a-radio value="1"> 缓存 </a-radio>
              <a-radio value="2"> 不缓存 </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

        <a-col :span="12" v-if="formState.menuType === 'C'">
          <a-form-item name="visible">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>选择隐藏则路由将不会出现在侧边栏，但仍然可以访问</span>
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">显示状态</span>
              </div>
            </template>
            <a-radio-group v-model:value="formState.visible">
              <a-radio value="1"> 显示 </a-radio>
              <a-radio value="2"> 不显示 </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="formState.menuType === 'C'">
          <a-form-item name="status">
            <template #label>
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span>选择停用则路由将不会出现在侧边栏，也不能被访问</span>
                  </template>
                  <AntdIcons.QuestionCircleFilled />
                </a-tooltip>
                <span style="margin-left: 4px">菜单状态</span>
              </div>
            </template>
            <a-radio-group v-model:value="formState.status">
              <a-radio
                :value="item.value"
                v-for="(item, idx) in STATUS_OPTIONS"
                name="type"
                :key="idx"
              >
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel" :loading="loading">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { message } from 'ant-design-vue'
import * as AntdIcons from '@ant-design/icons-vue'
import { defineOptions, ref, defineProps, defineEmits, watch, computed } from 'vue'

import ProIcon from '@/components/pro-icon/index.vue'
import { ProLayoutSection } from '@/components/pro-layout/index'

import { STATUS_OPTIONS, MODAL_TYPE, MENU_OPTIONS, YES_NO_OPTIONS } from './options'
import { updateMenuApi, createMenuApi } from '@/api/system/menu/index'
import { useAssetsSvg } from '@/hooks/use-assets-svg'

const { svgIcons } = useAssetsSvg()

const ALL_ICONS = {
  antdv: {
    title: 'AntV 图标',
    data: Object.keys(AntdIcons)
      .filter(
        (item) =>
          AntdIcons[item] instanceof Function &&
          !['createFromIconfontCN', 'default', 'getTwoToneColor', 'setTwoToneColor'].includes(item),
      )
      .map((key) => ({
        name: key,
        type: 'antdv',
      })),
  },
  svg: {
    title: '本地SVG图标',
    data: svgIcons.map((item) => ({
      name: `${item}.svg`,
      type: 'svg',
    })),
  },
  // iconfont: [],
}

defineOptions({
  name: 'UserOperatorModal',
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  currentType: {
    type: String,
    default: 'add',
  },
  currentItemData: {
    type: Object,
    default: () => {},
  },
  treeData: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['update:visible', 'reload'])

const searchIcon = ref('')
const popoverVisible = ref(false)
const open = ref(true)
const formRef = ref(null)
const loading = ref(false)
const formState = ref({
  menuName: '',
  menuNameEn: '',
  parentId: '',
  orderNum: '',
  path: '',
  component: '',
  query: '',
  routeName: '',
  isFrame: '2',
  frameType: '1',
  isCache: '2',
  menuType: 'M',
  visible: '1',
  status: '1',
  perms: '',
  icon: '',
  remark: '',
})
const rules = computed(() => {
  return {
    orderNum: [{ required: true, message: '请输入排序', trigger: 'change' }],
    menuName: [{ required: true, message: '请输入中文菜单名称', trigger: 'change' }],
    menuNameEn: [{ required: true, message: '请输入英文菜单名称', trigger: 'change' }],
  }
})

const currentTreeData = computed(() => {
  return [
    {
      id: '0',
      menuName: '主目录',
      children: props.treeData,
    },
  ]
})

const currentIcons = computed(() => {
  if (!searchIcon.value) {
    return {
      antdv: {
        ...ALL_ICONS.antdv,
        data: ALL_ICONS.antdv.data.slice(0, 50),
      },
      svg: {
        ...ALL_ICONS.svg,
        data: ALL_ICONS.svg.data.slice(0, 50),
      },
    }
  }
  return {
    antdv: {
      ...ALL_ICONS.antdv,
      data: ALL_ICONS.antdv.data.filter((item) => item.name.includes(searchIcon.value)),
    },
    svg: {
      ...ALL_ICONS.svg,
      data: ALL_ICONS.svg.data.filter((item) => item.name.includes(searchIcon.value)),
    },
  }
})

const handleIconClick = (item) => {
  formState.value.icon = item.name
  popoverVisible.value = false
}

const handleOk = async () => {
  await formRef.value.validateFields()
  loading.value = true
  try {
    const currentApi = props.currentType === MODAL_TYPE.ADD ? createMenuApi : updateMenuApi
    await currentApi(formState.value)
    message.success(props.currentType === MODAL_TYPE.ADD ? '新增成功' : '编辑成功')
    emits('update:visible', false)
    emits('reload')
  } catch (error) {
    console.log(error, 'handleOk error')
  } finally {
    loading.value = false
  }
}
const handleCancel = () => {
  emits('update:visible', false)
}

watch(
  () => open.value,
  (value) => {
    if (!value) {
      emits('update:visible', false)
    }
  },
)

watch(
  () => [props.currentItemData, props.currentType],
  () => {
    if (props.currentType === MODAL_TYPE.EDIT) {
      Object.keys(formState.value).forEach((item) => {
        formState.value[item] = props.currentItemData[item]
      })
      formState.value.id = props.currentItemData.id
    } else {
      formState.value.parentId = props.currentItemData.parentId
    }
  },
  {
    immediate: true,
  },
)
</script>
