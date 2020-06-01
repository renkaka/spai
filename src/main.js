import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import './icons'
import VueCookie from 'vue-cookie'
import { isAuth } from './utils'
import common from './utils/common'
import httpRequest from './utils/httpRequest' // api: https://github.com/axios/axios

Vue.use(VueCookie)
Vue.use(common)
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth // 权限方法

// //  路由判断登录 根据路由配置文件的参数
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限
//     console.log('需要登录');
//     if (localStorage.token) {  // 判断当前的token是否存在 ； 登录存入的token
//       next();
//     }
//     else {
//       next({
//         path: '/',
//         query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }
//   else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
