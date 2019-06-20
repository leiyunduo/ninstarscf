/*
 *  如需过滤其它api请添加其请求的正则表达式，
 *  默认情况下只过滤了链式记账相关的接口
 */
import element from 'element-ui'
// import _ from 'lodash'
let loadingRequestCount = 0
let loading
export default {
  api: /\/contract\/|\/order_plan\/|\/warehouse_contract\/|\/transport_contract\/|\/financing_plan\/|\/order\/|\/deposit\/|\/warehouse\/|\/transport\/|\/acceptance\/|\/settlement\/|\/invoice\/|\/payment\//,
  element,
  startLoading () {
    loading = element.Loading.service({
      lock: true,
      text: '加载中…',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  closeLoading () {
    loading.close()
  },
  fullScreenLoading () {
    if (loadingRequestCount === 0) {
      this.startLoading()
    }
    loadingRequestCount++
  },
  removeFullScreenLoading () {
    if (loadingRequestCount <= 0) return
      loadingRequestCount--
    if (loadingRequestCount === 0) {
      // _.debounce(this.closeLoading, 300)()
      setTimeout(this.closeLoading, 300)
    }
  }
}