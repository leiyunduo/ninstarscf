// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router-base'
import axios from 'axios'
// import ElementUI from 'element-ui'
import interceptors from '../interceptors.js'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'
import Distpicker from 'v-distpicker'
import $global from '../manifest.js'

Vue.component('v-distpicker', Distpicker)
// 配置中间件
Vue.use(interceptors.element)

let reg_api = interceptors.api
// utility function
Vue.prototype.$ajax = axios

// 全局根目录
Vue.prototype.$host = $global.setHost
// 转换金额格式
Vue.prototype.toThousands = $global.formatNumber
axios.defaults.headers['Auth-Token'] = localStorage.ns_token
// 项目根目录
Vue.prototype.$root_url = $global.setImgURL
// 格式化时间
Vue.prototype.$time = $global.formatTime
// 本地存储token
Vue.prototype.$token = $global.setToken
// 统一查看券和条详情
Vue.prototype.$ticket = $global.toTicketInfo
// 设置loading
Vue.prototype.$setLoading = $global.loading
// 检查浏览器类型
Vue.prototype.$checkBrowser = $global.checkBrowser
// 链式记账排序
Vue.prototype.$sortChain = $global.sortChain
// 绑定事件
Vue.prototype.$addEvent = $global.addEvent
// 移除事件
Vue.prototype.$removeEvent = $global.removeEvent
// 获取元素 
Vue.prototype.$getEvent = $global.getEvent
// 获取事件对象 
Vue.prototype.$getTarget = $global.getTarget
// 阻止事件行为
Vue.prototype.$preventDefault = $global.preventDefault 
// 表单校验
Vue.prototype.$inputCheck = $global.inputStrategy

// 窗口置顶
Vue.prototype.$scrollToTop = () => {
  if (['Edge', 'IE', 'Safari', '360', 'QQ'].indexOf($global.checkBrowser()) > -1) {
    document.body.scrollTop = 0
  } else {
    document.documentElement.scrollTop = 0
  }
}
// 全局捕获loading
axios.interceptors.request.use(config => {
  // if (config.url.match(reg_api) && config.method !== 'get') {
  //   interceptors.fullScreenLoading()
  // }
  if (!config.url.match(/\/no_read/)) interceptors.fullScreenLoading()
  return config
}, error => {
  return Promise.reject(error)
})
// 全局捕获ajax
axios.interceptors.response.use((res) => {
  interceptors.removeFullScreenLoading()
  return res
}, err => {
  console.dir(err)
  if (err.response && err.response.data.err_code === '800') {
    // if (!localStorage['id']) return // 已退出的账号无需再次提醒
    Vue.prototype.$confirm('您的账号检测到异常，请重新登陆。如果多次出现这样的情况，请联系我们', '账号异常', {
      type: 'error',
      showClose: false,
      showCancelButton: false,
      closeOnPressEscape: false,
      closeOnHashChange: false,
      beforeClose: function (e) {
        localStorage.removeItem('ns_token')
        localStorage.removeItem('id')
        localStorage.removeItem('avatar')
        localStorage.removeItem('self_name')
        location.href = $global.setHost() + '/login.html'
      }
    })
  } else if (err.response.data.err_code >= '900') {
    let url = {'business': '#/setting?signed=1', 'institution': '#/setting?signed=1', 'fund': '#/setting?signed=1'}
    window.location.href = url[localStorage.role] + '?s=1'
  } else {
    Promise.reject(err)
  }
})
// 跳转企业首页
Vue.prototype.$business = $global.navigation2Buisness

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
