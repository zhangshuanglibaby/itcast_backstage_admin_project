// 这里封装了路由配置

// 引入vue
import Vue from 'vue'

// 引入vue-router
import VueRouter from 'vue-router'

// 引入组件
import login from '@/views/login.vue'
import home from '@/views/home.vue'
import welcome from '@/views/welcome.vue'
import users from '@/views/users/users.vue'
import rightsList from '@/views/rights/rightsList.vue'
import rolesList from '@/views/rights/rolesList.vue'

// 使用use,让vue使用vue-router进行对路由的管理
Vue.use(VueRouter)

// 创建router对象,实现路由映射组件
export default new VueRouter({
  // 使用routes进行路由的配置
  routes: [
    // 设置默认页面
    {
      name: 'default',
      path: '/',
      // 重定向
      redirect: {
        name: 'login'
      }
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'home',
      path: '/home',
      component: home,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        },
        {
          name: 'users',
          path: 'users',
          component: users
        },
        {
          name: 'rightsList',
          path: 'rightsList',
          component: rightsList
        }, {
          name: 'rolesList',
          path: 'rolesList',
          component: rolesList
        }
      ]
    }
  ]
})
