import {http} from '~/plugins/axios'
import {MessageBox} from 'element-ui'
export default   ({app, store}) => {
  app.router.beforeEach(async (to, from, next) => {
    let isClient = process.client
    console.log(to.path)
    if (to.path === '/login' || to.path === '/register') {
      next()
      return
    }
    if (isClient && to.path !== '/') {
      let token = window.localStorage.getItem("token");
      if (token) {
        next()
      }else{
        next('/login')
      }
    } else{
      next()
    }
  })
}
