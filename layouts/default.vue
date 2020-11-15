<template>
  <el-container>
    <el-header>
      <div class="header-container">
        <el-menu mode="horizontal">
          <el-menu-item index="1">
            <img src="/logo.png" alt="" class="logo">
          </el-menu-item>
          <el-menu-item index="2">
            <nuxt-link to="/">首页</nuxt-link>
          </el-menu-item>
          <template v-if="!user._id">
            <el-menu-item index="5" class="pull-right">
              <nuxt-link to="/register">注册</nuxt-link>
            </el-menu-item>
            <el-menu-item index="6" class="pull-right">
              <nuxt-link to="/login">登录</nuxt-link>
            </el-menu-item>
          </template>
          <template v-else>
            <el-menu-item index="5" class="pull-right">
              <img :src="user.avatar" alt="" class="avatar">
              <nuxt-link class="nickname" :to="'/user/'+ user._id">{{ user.nickname }}</nuxt-link>
            </el-menu-item>
            <el-menu-item index="6" class="pull-right">
              <nuxt-link to="/editor/new">
                <el-button>写文章</el-button>
              </nuxt-link>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-header>
    <nav class="nav-container">
      <div class="nav-content">
        <ul class="nav-list left">
          <li class="nav-item active">
            <div class="category-popover-box">
              <a>推荐</a></div>
          </li>
          <li class="nav-item">
            <div
              class="category-popover-box"><!---->
              <a>关注</a></div>
          </li>
          <li class="nav-item">
            <div
              class="category-popover-box"><!----> <a>后端</a></div>
          </li>
          <li class="nav-item">
            <div
              class="category-popover-box"><!----> <a>前端</a></div>
          </li>
          <li class="nav-item">
            <div
              class="category-popover-box"><!----> <a>Android</a></div>
          </li>
          <li class="nav-item">
            <div
              class="category-popover-box"><!----> <a>iOS</a></div>
          </li>
          <li
            class="nav-item">
            <div
              class="category-popover-box"><!----> <a>人工智能</a></div>
          </li>
          <li class="nav-item">
            <div
              class="category-popover-box"><!----> <a>开发工具</a></div>
          </li>
          <li class="nav-item">
            <div
              class="category-popover-box"><!----> <a>代码人生</a></div>
          </li>
          <li class="nav-item">
            <div
              class="category-popover-box"><!----> <a>阅读</a></div>
          </li>
          <li class="nav-item right"><a href="/subscribe/subscribed">标签管理</a></li>
        </ul>
      </div>
    </nav>
    <el-main>
      <Nuxt class="nuxt-container"/>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: "default",
  computed: {
    ...mapState('user', {
      user: state => state
    })
  },

  async mounted() {
    let ret = await this.$http.post('/user/info')
    if (ret && ret.code == 0) {
      await this.$store.commit('user/SET_USER', ret.data)
    }
  }
}
</script>
<style lang="scss">
html, body {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  height: 100%;
  width: 100%;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f4f5f5;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-list {
  //max-width: 960px;
  height: 100%;
  display: flex;
  align-items: center;
  line-height: 1;
  position: relative;

  .active a {
    color: #007fff;
  }

  .nav-item {
    position: relative;
    cursor: pointer;
    height: 100%;
    align-items: center;
    display: flex;
    flex-shrink: 0;
    font-size: 16px;
    padding-right: 12px;
    color: #71777c;

    :hover {
      color: #007fff;
    }
  }
}

a {
  text-decoration: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}


.el-header {
  background-color: #ffffff;
  padding: 0;
  overflow: hidden;
}

.nav-container {
  width: 100%;
  background-color: #ffffff;
  margin-top: 1px;
  height: 45px;

  .nav-content {
    margin: 0 auto;
    //padding: 0 20px;
    width: 100%;
    max-width: 960px;
    display: flex;
    height: 100%;
    align-items: center;
  }


}

.header-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
}

.nuxt-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  min-height: 75vh;
  //background-color: #fff;

}

@media screen and (max-width: 1000px) {
  .el-main {
    padding: 20px 0;
  }
  .nuxt-container {
    margin: 0;
    max-width: 100% !important;
  }
  .nav-content {
    margin: 0;
    max-width: 100% !important;
  }
}

.logo {
  height: 70%;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.pull-right {
  float: right !important;
}
</style>
