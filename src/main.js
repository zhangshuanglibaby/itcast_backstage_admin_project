import Vue from 'vue'
import App from './App.vue'

// 引入样式
import '@/styles/index.less'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 让vue使用element
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
