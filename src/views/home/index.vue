<template>
  <ProLayout class="home">
    <div class="home-top">
      <ProLayoutSection title="三原后台管理框架" prefix="dot">
        <div class="home-introduction">
          <span class="decoration">
            一直想做一款后台管理系统，看了很多优秀的开源项目但是发现没有合适自己的。于是利用空闲休息时间开始自己写一套后台系统。如此有了三原管理系统，她可以用于所有的Web应用程序，如网站管理后台，网站会员中心，CMS，CRM，OA等等，当然，您也可以对她进行深度定制，以做出更强系统。所有前端后台代码封装过后十分精简易上手，出错概率低。系统设计参考开源项目：
            <a-button type="link" style="padding: 0" href="https://vue.ruoyi.vip/">RuoYi</a-button
            >、
            <a-button type="link" style="padding: 0" href="https://naive-ui-pro.pro-components.cn/"
              >Naive UI Pro</a-button
            >

            <span class="versions">当前版本：<a-tag color="success">1.0.0</a-tag></span>
          </span>

          <div class="jump">
            <a-button danger>免费开源</a-button>
            <a-button>访问码云</a-button>
            <a-button>访问文档</a-button>
          </div>
        </div>
      </ProLayoutSection>
      <ProLayoutSection title="技术选型" prefix="dot">
        <div class="home-introduction technology">
          <div class="technology-item">
            <div class="technology-item__title">前端</div>
            <div class="technology-item__content">
              <p>Vue3js</p>
              <p>Ant Design Vue</p>
              <p>Axios</p>
              <p>Pinia</p>
              <p>Less</p>
              <p>...</p>
            </div>
          </div>
          <div class="technology-item">
            <div class="technology-item__title">后端</div>
            <div class="technology-item__content">
              <p>Java Spring Boot</p>
              <p>Mysql</p>
              <p>Lombok</p>
              <p>Mybatis-plus</p>
              <p>JWT</p>
              <p>...</p>
            </div>
          </div>
        </div>
      </ProLayoutSection>
    </div>

    <ProLayoutMain>
      <div class="home-body">
        <a-card title="联系信息"> <QqOutlined />qq: 1094673358 </a-card>
        <a-card title="更新日志">
          <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="v1.0.0 - 2026-04-09">
              <p>1、三原系统正式发布</p>
            </a-collapse-panel>
          </a-collapse>
        </a-card>
        <a-card title="捐赠支持">
          <div class="supper">
            <div class="pay-item">
              <div class="pay-item-title">微信扫一扫捐赠</div>
              <img src="./images/image1.png" alt="" srcset="" />
            </div>
            <div class="pay-item">
              <div class="pay-item-title">支付宝扫一扫捐赠</div>
              <img src="./images/image2.png" alt="" srcset="" />
            </div>
          </div>
          <p>你可以请作者喝杯咖啡表示鼓励</p>
          <p>
            <span> <AlipayOutlined />支付宝：/*景源</span>
          </p>
          <p>
            <span> <WechatOutlined />微信：/*景源</span>
          </p>
        </a-card>
      </div>
    </ProLayoutMain>
  </ProLayout>
</template>

<script setup>
import { ProLayout, ProLayoutSection, ProLayoutMain } from '@/components/pro-layout/index'
import { AlipayOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
const activeKey = ref('')
</script>

<style lang="less" scoped>
.home-top {
  display: flex;
  gap: 24px;

  > div {
    flex: 1;
  }
}

.supper {
  display: flex;
  .pay-item {
    flex: 1;
    .pay-item-title {
      font-weight: 600;
      font-size: 16px;
      text-align: center;
    }

    > img {
      width: 100%;
    }
  }
}

.technology {
  display: flex;
  .technology-item {
    .technology-item__title {
      font-size: 16px;
      font-weight: 600;
    }
    .technology-item__content {
      margin-top: 16px;
    }
  }
}
.home-introduction {
  padding: 0 16px 16px;

  .decoration {
    font-size: 14px;
    line-height: 24px;
  }

  .versions {
    margin-top: 8px;
    display: block;
  }

  .jump {
    display: flex;
    margin-top: 16px;
    gap: 8px;
  }

  > div {
    flex: 1;
  }
}

.home-body {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: flex-start;
}
</style>
