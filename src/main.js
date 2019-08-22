import Vue from 'vue'
import App from './App.vue'

// 引入样式
import '@/styles/index.less'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入路由
import router from '@/router/router.js'

// 让vue使用element
Vue.use(ElementUI)

// 导航设置
router.beforeEach((to, from, next) => {
  // 登录页面不需要返回登录页面,有登录状态也不需要返回登录页面
  let mytoken = localStorage.getItem('itcast_admin_token')
  if (mytoken || to.path === '/login') {
    // 下一个
    next()
  } else {
    // 重定向
    next({ path: '/login' })
  }
})

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
