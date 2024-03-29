<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div>
        <img :src="headerSrc" alt="" />
      </div>
      <span class="logo" title="返回后台" @click="backHome">
        <a :style="titleColor" target="_blank">返回</a>
        <span class="icon-enter"></span>
      </span>
      <span class="title">后台实时监控系统</span>
      <div class="title-right">
        <full-screen></full-screen>
        <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme" alt="切换主题" title="切换主题" />
        <div class="datetime">{{ systemDateTime }}</div>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="{ fullscreen: fullScreenStatus.trend }">
          <!-- 销量趋势图表 -->
          <trend ref="trend"></trend>
          <div class="resize">
            <!-- icon-compress-alt 向内 -->
            <span @click="changeSize('trend')" :class="['iconfont', fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="left-bottom" :class="{ fullscreen: fullScreenStatus.seller }">
          <!-- 商家销售金额图表 -->
          <seller ref="seller"></seller>
          <div class="resize">
            <span @click="changeSize('seller')" :class="['iconfont', fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="{ fullscreen: fullScreenStatus.map }">
          <!-- 商家分布图表 -->
          <single-map ref="map"></single-map>
          <div class="resize">
            <span @click="changeSize('map')" :class="['iconfont', fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="middle-bottom" :class="{ fullscreen: fullScreenStatus.rank }">
          <!-- 地区销量排行图表 -->
          <rank ref="rank"></rank>
          <div class="resize">
            <span @click="changeSize('rank')" :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="{ fullscreen: fullScreenStatus.hot }">
          <!-- 热销商品占比图表 -->
          <hot ref="hot"></hot>
          <div class="resize">
            <span @click="changeSize('hot')" :class="['iconfont', fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="right-bottom" :class="{ fullscreen: fullScreenStatus.stock }">
          <!-- 库存销量分析图表 -->
          <stock ref="stock"></stock>
          <div class="resize">
            <span @click="changeSize('stock')" :class="['iconfont', fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// 异步加载组件
const Hot = () => import ('@/components/report/Hot.vue')
const Map = () => import ('@/components/report/Map.vue')
const Rank = () => import ('@/components/report/Rank.vue')
const Seller = () => import ('@/components/report/Seller.vue')
const FullScreen = ()=> import ('components/common/FullScreen')
const Trend = () => import ('@/components/report/Trend.vue')
const Stock = () => import ('@/components/report/Stock.vue')

import { mapState } from 'vuex'
// 导入自己定义的主题工具函数 用于返回不同主题下的配置对象
import { getThemeValue } from '@/utils/theme_utils'

export default {
  name: 'ScreenPage',
  components: {
    Hot,
    'single-map': Map,
    Rank,
    Seller,
    Stock,
    Trend,
    FullScreen,
  },
  data() {
    return {
      // 各组件是否全屏状态
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false,
      },
      // 当前的系统时间
      systemDateTime: null,
      // 用于保存当前系统日期的定时器id
      timerID: null,
    }
  },
  created() {
    // 注册服务端广播的全屏事件
    this.$socket.registerCallBack('fullScreen', this.recvData)
    // 注册服务器广播的主题切换事件
    this.$socket.registerCallBack('themeChange', this.recvThemeChange)
    this.currentTime()
  },
  computed: {
    ...mapState(['theme']),
    // 头部的边框路径
    headerSrc() {
      return '/static/img/' + getThemeValue(this.theme).headerBorderSrc
    },
    // 主题图片的路径
    themeSrc() {
      return '/static/img/' + getThemeValue(this.theme).themeSrc
    },
    containerStyle() {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor,
      }
    },
    titleColor() {
      return {
        color: getThemeValue(this.theme).titleColor,
      }
    },
  },
  destroyed() {
    // 组件销毁时，销毁事件
    this.$socket.unRegisterCallBack('fullScreen')
    this.$socket.unRegisterCallBack('themeChange')
    clearInterval(this.timerID)
  },
  methods: {
    // 监听全屏事件
    changeSize(chartName) {
      // 1.改变fullScreenStatus
      // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      // // 2.手动调用每个图表中的 screenAdapter 触发响应式
      // this.$nextTick(() => {
      //   this.$refs[chartName].screenAdapter()
      // })

      // 一端操作多端同步效果
      // 将事件发送给服务端，让服务端广播事件 true全屏，false取消全屏
      const targetValue = !this.fullScreenStatus[chartName]
      this.$socket.send({
        action: 'fullScreen',
        socketType: 'fullScreen',
        chartName: chartName,
        value: targetValue,
      })
    },
    // 服务端广播全屏事件的客户端响应
    recvData(data) {
      console.log(data)

      // 取出是那一个图表进行切换
      const chartName = data.chartName
      // 判断切换成什么类型[true全屏，false取消全屏]
      const targetValue = data.value

      this.fullScreenStatus[chartName] = targetValue
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      })
    },
    // 主题切换事件
    handleChangeTheme() {
      // this.$store.commit('changeTheme')

      this.$socket.send({
        action: 'themeChange',
        socketType: 'themeChange',
        chartName: '',
        value: '',
      })
    },
    // 接收到服务器切换主题事件
    recvThemeChange() {
      this.$store.commit('changeTheme')
    },
    currentTime() {
      this.systemDateTime = new Date().toLocaleString()

      this.timerID && clearInterval(this.timerID)

      this.timerID = setInterval(() => {
        this.systemDateTime = new Date().toLocaleString()
      }, 1000)
    },
    // 返回到后台
    backHome() {
      this.$router.push('/welcome')
    },
  },
}
</script>
<style lang="scss" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 9999;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-80%);
    a {
      text-decoration: none;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.icon-enter {
  margin-left: 5px;
}
</style>
