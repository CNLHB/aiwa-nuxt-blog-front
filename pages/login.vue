<template>
    <div class="login-container">

    <el-form class="login-form" ref="form" :model="form" >
      <div class="title-container">
        <img src="/logo.png" alt="">
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-mobile"></i>
        </span>
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="邮箱"
          name="email"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">

        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          ref="password"
          v-model="form.password"
          placeholder="密码"
          name="password"
          type="password"
        >

        </el-input>
      </el-form-item>



      <el-button type="primary" @click.native.prevent="handleLogin">
        登录
      </el-button>

    </el-form>

  </div>
</template>

<script>
const md5 = require('md5')
export default {
  layout:"login",

  data(){
    return{
      form:{
        email:'316783812@qq.com',
        password:'123456'
      }
    }
  },
  methods:{
    async handleLogin(){
      let ret = await this.$store.dispatch('user/login',{
        email:this.form.email,
        password:md5(this.form.password)
      })
      if(ret.code==0){
        this.$notify({
          title:'登录成功',
          type:'success'
        })
        setTimeout(()=>{
          this.$router.push({path:"/"})
        },1000)
      }else {
        this.$notify({
          title:'账号或密码错误',
          type:'error'
        })
      }
      return
      // let ret = await this.$http.post('/user/login',{
      //   email:this.form.email,
      //   password:md5(this.form.password)
      // })
      // if(ret.code==0){
      //   localStorage.setItem('token',ret.data.token)
      //     this.$notify({
      //       title:'登录成功',
      //       type:'success'
      //     })
      //     setTimeout(()=>{
      //       this.$router.push({path:"/"})
      //     },1000)
      // }
    }
  }
}
</script>

<style>

</style>
