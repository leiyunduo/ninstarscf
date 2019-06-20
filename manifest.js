'use strict'
/*
  date: 2018-09-20
  desc: 项目配置文件，处理json 文件中的配置数据，将所有统一的路由写在这里当作全局变量使用，没个路由器使用不同，暂时讲公共方法写在这里，
        下一个版本全部迁移至src文件夹下的util.js 中
*/
const config = require('./manifest.json')
let $global = {}

$global.host = config.host
$global.token = localStorage.ns_token || config.token
$global.img = config.img
$global.api = config.api

// token function
$global.setToken = () => {
  return ($global.token)
}

// img Url funtion
$global.setImgURL = () => {
  return ($global.img)
}

$global.setHost = () => {
  return ($global.host)
}

// 时间序列化
$global.formatTime = (time, type) => {
  var t = new Date(time)
  var yyyy = t.getFullYear()
  if (isNaN(yyyy)) {
    return false
  } else {
    var MM = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1
    var dd = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
    var hh = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
    var mm = t.getMinutes() + 1 < 10 ? '0' + t.getMinutes() : t.getMinutes()
    var ss = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds()
    if (type === 1) {
      return yyyy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
    } else if (type === 2) {
      return yyyy + '-' + MM + '-' + dd
    } else {
      return hh + '-' + mm + '-' + ss
    }
  }
}

$global.formatNumber = (number) => {
  var num = Number(number || 0).toFixed(2).toString()
  var tail = num.slice(-3)
  var realNumber = num.substring(0, num.indexOf('.'))
  var result = ''
  while (realNumber.length > 3) {
    result = ',' + realNumber.slice(-3) + result
    realNumber = realNumber.slice(0, realNumber.length - 3)
  }
  if (realNumber) { result = realNumber + result }
  return result + tail
}

// 银、商、信券，红、黄、白条详情
$global.toTicketInfo = (ticketIndex, idList, router) => {
  if (idList.length !== 0) {
    router.push({
      path: '/ticket_detail',
      query: {
        t: ticketIndex,
        l: idList.join('_')
      }
    })
  }
  return false
}
// loading
$global.loading = (color) => {
  if (color) {
    return {fullscreen: true, text: '加载中。。。', background: 'rgba(255, 255, 255, 0)'}
  } else {
    return {fullscreen: true, text: '加载中。。。', background: "rgba(0, 0, 24, 0.96)"}
  }
}
// 浏览器校验
$global.checkBrowser = () => {
  let ua = navigator.userAgent.toLocaleLowerCase()
  let browserType = null
  let _mime = function (option, value) {
    var mimeTypes = navigator.mimeTypes
    for (var mt in mimeTypes) {
    if (mimeTypes[mt][option] == value) {
        return true
      }
    }
    return false
  }
  if (ua.match(/edge/) != null || ua.match(/NET/) != null) {
    browserType = "Edge"
  } else if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = "IE"
    browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1]
  } else if (ua.match(/firefox/) != null) {
    browserType = "火狐"
  } else if (ua.match(/ubrowser/) != null) {
    browserType = "UC"
  } else if (ua.match(/opera/) != null) {
    browserType = "欧朋"
  } else if (ua.match(/bidubrowser/) != null) {
    browserType = "百度"  
  } else if (ua.match(/metasr/) != null) {
    browserType = "搜狗"  
  } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
    browserType = "QQ"
  } else if (ua.match(/maxthon/) != null) {
    browserType = "遨游"
  } else if (ua.match(/chrome/) != null) {
    var is360 = _mime("type", "application/vnd.chromium.remoting-viewer")
    if (is360) {               
      browserType = '360'  
    } else {  
      browserType = "谷歌" 
    }      
  } else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") < 1) {
    browserType = "Safari"
  }
  return browserType
}
// 链式记账排序
$global.sortChain = (a, b) => {
	if (a.sales_contract && b.sales_contract) {
		if (a.sales_contract[0] && b.sales_contract[0]) {
      let cs = Date.parse(new Date(a.sales_contract[0].date_created))
      let ns = Date.parse(new Date(b.sales_contract[0].date_created))
      return ns - cs
		} else {
			return true
		}	
	} else {
		return true
	}
}
// 全局跳转企业首页
$global.navigation2Buisness = (obj, window, str) => {
  if (obj.detail) {
    let id = obj.business || obj.company
    window.open('#/enterpriseBlog?bid=' + id + str)
  }
}

// 获取事件，兼容模式
$global.addEvent = (dom, type, fn) => {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn
  }
}
// 移除事件，兼容模式
$global.removeEvent = (dom, type, fn) => {
  if (dom.removeEventListener) {
    dom.removeEventListener(type, fn, false) 
  } else if (target.detachEvent) {
    dom.detachEvent("on" + type, fn)
  } else {
    dom["on" + type] = null 
  }
}

// 获取事件对象，兼容模式
$global.getEvent = event => event || window.event

// 获取元素，兼容模式
$global.getTarget = event => {
  let that = $global
  var event = that.getEvent(event)
  return event.target || event.srcElement
}

// 阻止默认行为，兼容模式
$global.preventDefault = event => {
  let that = $global
  var event = that.getEvent(event)
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
}

// 表单验证, 可以通过addStrategy添加额外校验类型
$global.inputStrategy = () => {
  var strategy = {
    notNull (title, value) {
      return !value ? `${title}不能为空` : ''
    },
    number (title, value) {
      return /^[1-9]\d+(\.[0-9]{2})?$|^0\.[0-9]{1,2}$/.test(value) ? '' : `${title}格式有误`
    },
    phone (title, value) {
      return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(value) ? '' : `${title}格式有误`
    }
  }
  return {
    check (type, title, value) {
      value = value.replace(/^\s+|\s+$/g, '')
      return strategy[type] ? strategy[type](title, value) : '没有该类型的检测方法'
    },
    addStrategy (type, fn) {
      strategy[type] = fn
    }
  }
}
// visibility API
// $global.pageVisibility = () => {
  
// }
export default $global;