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
    <el-main>
      <Nuxt class="nuxt-container"/>
    </el-main>
  </el-container>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: "detail",
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
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f4f5f5;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

@media screen and ( max-width: 1000px ) {
  .el-main {
    padding: 20px 0;
  }
}

.el-header {
  background-color: #ffffff;
  padding: 0;
  overflow: hidden;
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
