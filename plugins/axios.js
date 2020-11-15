import Vue from 'vue'
import axios from 'axios'
import {MessageBox} from 'element-ui'
let service = axios.create({
  timeout: 5000,
  baseURL: '/api'
})
export default ({store, redirect})=>{
  service.interceptors.request.use(config => {
      const token = window.localStorage.getItem('token')
      if (token){
        config.headers.common['Authorization'] = "Bearer " + token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    })
  service.interceptors.response.use(response => {
      let {data} = response
      if (data.code == 0 ){
        // 正常返回
        return data
      }else{
        if (data.code ==10004){
          return data
        }
        // token过期
        MessageBox.confirm('登录已过期','过期' ,{
          confirmButtonText: '登录',
          showCancelButton: false,
          type: 'warning'
        }).then(()=>{
          window.localStorage.removeItem('token')
          let path = window.location.pathname
          if(path!== '/'){
            redirect({path: "/login"})
          }
          //跳转到登录页
        }).catch(err => err)
      }
    },
    err => {
      return err
    })
}


Vue.prototype.$http = service
export const http = service

