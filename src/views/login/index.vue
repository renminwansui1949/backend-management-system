<template>
  <div class="login-container">
    <div class="login-left">
      <div class="login-left__filter" :class="{ 'is-dark': isDark }"></div>
      <div class="login-left__content">
        <ProLogo />
        <div class="login-left__bg">
          <img :src="getCurrentAppLoginImage(appStore.appConfig.loginImage)" alt="" srcset="" />
        </div>
      </div>
    </div>
    <div class="login-right" :class="{ 'is-dark': isDark }">
      <div class="login-form__content">
        <div class="login-form__title">
          <div class="login-form__title--text">账号登录</div>
          <div class="login-form__title--desc">请使用您的账号密码登录系统</div>
        </div>
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: isEN ? 6 : 4 }"
          :wrapper-col="{ span: isEN ? 18 : 20 }"
          autocomplete="on"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <a-input
              autocomplete="username"
              v-model:value="formState.username"
              placeholder="请输入用户名"
            />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password
              autocomplete="current-password"
              v-model:value="formState.password"
              placeholder="请输入密码"
            />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 0, span: 24 }">
            <div
              style="display: flex; align-items: center; justify-content: space-between"
              class="login-form-item"
            >
              <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
              <div>忘记密码？</div>
            </div>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
            <a-button :loading="loading" type="primary" style="width: 100%" html-type="submit"
              >登录</a-button
            >
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
            <div class="login-form__register">
              <span>还没有账号？</span>
              <a-button type="link">立即注册</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>

      <div class="login-form__footer">
        <p>Copyright © 2025 chinacjf</p>
        <p>
          <span>ICP备案号:</span>
          <span
            ><a href="https://beian.miit.gov.cn/#/Integrated/index">豫ICP备2025141202号-1</a></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

import { theme, message, notification } from 'ant-design-vue'
import ProLogo from '@/components/app-layout/app-logo/index.vue'

import { useThemeStore } from '@/stores/theme'
import { useAppStore } from '@/stores/app'

import { useRouter } from 'vue-router'
import { getCurrentAppLoginImage } from './options'

import { loginApi } from '@/api/login/index'
import { isEnFunction } from '@/utils/language'
import { usePreposition } from '@/hooks/use-preposition'

const isEN = isEnFunction()
const { useToken } = theme
const { token } = useToken()
const { isDark } = useThemeStore()
const appStore = useAppStore()

const { initPreposition } = usePreposition()
const router = useRouter()

const loading = ref(false)

const formState = reactive({
  username: 'admin',
  password: '123456',
  remember: true,
})

const onFinish = async () => {
  try {
    loading.value = true
    const response = await loginApi({
      username: formState.username,
      password: formState.password,
    })

    if (response.code === 200) {
      message.success('登录成功')
      localStorage.setItem('token', response.data.result)
      await initPreposition()
      router.push('/home')
      // TODO: 需要处理下逻辑 ，因为这个时候还没路由信息呢
      notification.success({
        message: '登录成功',
        description: `欢迎回来，${formState.username}`,
      })
    }
  } catch (error) {
    console.log(error, 'error')
    loading.value = false
  }
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped lang="less">
@keyframes float {
  0%,
  to {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}
.login-container {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: v-bind('token.colorBgBase');

  .login-left {
    flex: 1;
    position: relative;
    overflow: hidden;

    .login-left__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .login-left__filter {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        154deg,
        rgba(7, 7, 9, 0.082) 30%,
        rgb(213, 230, 255) 60%,
        rgba(7, 7, 9, 0.082) 10%
      );

      &.is-dark {
        background: linear-gradient(
          154deg,
          rgba(7, 7, 9, 0.082) 30%,
          v-bind('token.controlItemBgActive') 60%,
          rgba(7, 7, 9, 0.082) 10%
        );
      }

      filter: blur(40px);
    }

    /deep/.app-logo {
      padding: 40px;
      width: 100%;
    }

    .login-left__bg {
      width: 480px;
      height: 480px;
      animation: 6s ease-in-out infinite float;

      > img {
        width: 100%;
      }
    }
  }

  .login-right {
    width: 38%;
    background-color: v-bind('token.colorBgBase');
    padding: 54px;
    display: flex;
    flex-direction: column;

    &.is-dark {
      background-color: rgb(24 24 24);
    }

    .login-form__title {
      margin-bottom: 48px;

      .login-form__title--text {
        font-size: 32px;
        font-weight: 600;
        color: v-bind('token.colorTextBase');
      }

      .login-form__title--desc {
        font-size: 16px;
        color: v-bind('token.colorTextTertiary');
        margin-top: 16px;
      }
    }

    .login-form__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .login-form-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        > div {
          cursor: pointer;
          color: v-bind('token.colorPrimary');

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }

    .login-form__footer {
      text-align: center;
      margin-top: 32px;
      color: v-bind('token.colorTextTertiary');
      font-size: 14px;
    }
  }

  .login-form__register {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: v-bind('token.colorTextTertiary');
  }
}
</style>
