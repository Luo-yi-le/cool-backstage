<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="~/assets/images/logo.svg" alt="" />
        <span>优乐购电商后台管理系统</span>
        <span id="version">Version：1.3.0</span>
      </div>
      <div>
        <full-screen />
        <el-dropdown trigger="click">
          <span class="el-dropdown-link d-flex">
            <img id="user-avatar" src="~assets/images/avatar.gif" alt="" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toggleRouter">WelCome</el-dropdown-item>
            <a target="_blank" href="https://gitee.com/penggang-home/shopping-system">
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a>
            <a href="http://120.53.120.229:1920/#/login" target="_blank">
              <el-dropdown-item>V: 1.2.0</el-dropdown-item>
            </a>

            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏菜单 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 切换按钮 -->
        <div class="toggle-button" @click="toggleCollapse()">
          {{ isCollapse ? '&rArr;' : '&lArr;' }}
        </div>

        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#333744"
          ref="elMenuRef"
          text-color="#fff"
          active-text-color="#409EFF"
          :router="true"
          :default-active="activePath"
          :unique-opened="true"
        >
          <el-menu-item index="/welcome">
            <i class="iconfont icon-home3"></i>
            <span slot="title">WelCome</span>
          </el-menu-item>

          <!-- 一级菜单 -->
          <el-submenu id="custom" :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/dataview">
            <i class="iconfont icon-baobiao"></i>
            <span slot="title">数据视图</span>
            <i class="el-submenu__icon-arrow icon-share"></i>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 匹配到的子路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import FullScreen from 'components/common/FullScreen/'

export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      //
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao', //数据统计模块的icon
      },
      //控制左侧边栏的切换状态
      isCollapse: false,
      // 被激活的链接地址
      activePath: '/welcome',
      // 需要关闭的左侧菜单id
      menusId: [],
    }
  },
  components: {
    FullScreen,
  },
  created() {
    this.getMenuList()
  },
  watch: {
    // 监听路由的变化
    $route: {
      handler(val, oldVal) {
        this.activePath = val.path
        this.menusId.forEach(item => {
          // 关闭所有左侧菜单
          this.$refs.elMenuRef.closeMenu(item + '')
        })
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    // 退出
    logout() {
      window.sessionStorage.clear()

      this.$router.push('/login')
    },
    // 获取左侧菜单列表
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')

      // 获取失败
      if (res.meta.status !== 200) {
        return this.$message({
          message: res.meta.msg,
          duration: 1000,
        })
      }
      this.menuList = res.data
      // 删除掉数据统计模块
      this.menuList.pop()
      this.menuList.forEach(item => {
        this.menusId.push(item.id)
      })
    },
    // 点击按钮切换菜单的折叠与咱开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 跳转到欢迎页面
    toggleRouter() {
      this.$router.push('/welcome')
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 22px;
    font-weight: bold;
    #version {
      font-weight: normal;
      font-size: 16px;
      margin-left: 20px;
    }
    img {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  position: relative;
  background-color: #eaedf1;
}
.el-menu {
  border-right: none;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  color: white;
  font-size: 22px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.1em;
  cursor: pointer;
  user-select: none;
}
.d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
#user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  margin-right: 0;
}
a {
  text-decoration: none;
}
</style>