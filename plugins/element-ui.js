import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'mavon-editor/dist/css/index.css'
Vue.use(Element, { locale })

if (process.browser) {
// 加一个浏览器端判断，只在浏览器端才渲染就不会报错了
  const mavonEditor = require('mavon-editor')
  Vue.use(mavonEditor)
}
