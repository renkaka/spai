import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'login', component: () => import('../views/login.vue'), meta: { header: false } // 登录
  },
  {
    path: '/login', name: 'login', component: () => import('../views/login.vue'), meta: { header: false } // 登录
  },
  {
    path: '/indexPage',
    name: 'indexPage',
    component: () => import('../views/indexPage.vue'),
    meta: {
      header: true, requireAuth: true // 判断是否需要登录
    } // 主页
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
