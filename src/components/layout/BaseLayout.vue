<template>
  <div class="base-layout-wraper">
    <div class="base-layout">
      <div class="side-bar" v-if="isSigned">
        <side-bar :father="father" ref="sideBar" @handleSideBar="handleSideBar" />
      </div>
      <div class="side-container" :style="!isSigned ? 'width: 100%' : ''" :class="isShrink ? '-shrink' : ''">
        <!-- Header -->
        <base-header :isSroll="sroll" :style="!isSigned ? 'width: 100%' : ''" :location="locations" @isLogOut="handleSignOut"/>
        <!-- Container -->
        <div class="side-container-view">
          <router-view :message='prentMsg' :friendId='friendId' :friendName='friendName'/>
        </div>
        <!-- Footer -->
        <!-- <base-footer v-show="visibleFooter"/> -->
      </div>
      <!-- IM -->
      <div class="im" v-if="imShow">
        <imIndex :prentMsg='prentMsg' :friendId='friendId' :friendName='friendName'  @listerToChild='showMsgChild' @message='handleMessage'></imIndex>
      </div>
      <!-- LogOut -->
      <el-dialog
        title="退出登录"
        :visible.sync="dialogVisible"
        width="30%">
        <span>退出登录后您将无法接收新的消息，确定退出登录？</span>
        <span slot="footer" class="dialog-footer">
          <button class="c_btn c_cancel" @click="dialogVisible = false">取 消</button>
          <button class="c_btn c_sure" type="primary" @click="sureSignOut">确 定</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import sideBar from '@/components/financing/financingManege'
import baseHeader from '@/components/page/GlobalHeader'
import baseFooter from '@/components/page/GlobalFooter'
import imIndex from '@/components/im/im_index'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    baseHeader, sideBar, baseFooter, imIndex
  },
  data () {
    return {
      root: this.$host(),
      dialogVisible: false,
      prentMsg: 0,
      friendId: '',
      friendName: '',
      imShow: false,
      unreadNum: '',
      unmessage: 0,
      businessId: '',
      imdata: localStorage.imdata,
      father: {
        selIndex: -1
      },
      isShrink: false,
      locations: [],
      // visibleFooter: false,
      sroll: false
    }
  },
  mounted () {
    const that = this
    that.businessId = localStorage.id
    let loginInfo = {}
    loginInfo.identifier = localStorage.identifier
    loginInfo.userSig = localStorage.userSig
    webim.login(loginInfo, listeners, options, function (resp) {
      loginInfo.identifierNick = resp.identifierNick
      loginInfo.image = resp.headurl
    })
    that.$ajax.get('/api/company/status/').then(res => {
      // "signed": False, # 是否签署协议 
      // 未签署协议的话IM不能启用
      that.imShow = res.data.signed
      localStorage.id ? that.$store.commit('layout/changeSigned', true) : that.$store.commit('/layout/changeSigned', false)
      if (res.data.company_id) {
        window.localStorage.setItem('id', res.data.company_id)
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    if (that.businessId) {
      that.$ajax.get(`/api/company/` + that.businessId).then(res => {
        if (res.data.detail) {
          that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
            localStorage.setItem('self_name', encodeURIComponent(res.data.name))
            localStorage.setItem('region_code', res.data.region_code)
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else {
          that.$ajax.get('/api/auth/login_name/').then(res => {
            if (res.data.email) {
              localStorage.setItem('self_name', encodeURIComponent(res.data.email))
            } else {
              localStorage.setItem('self_name', encodeURIComponent(res.data.phone))
            }
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    } else {
      that.$ajax.get('/api/auth/login_name/').then(res => {
        if (res.data.email) {
          localStorage.setItem('self_name', encodeURIComponent(res.data.email))
        } else {
          localStorage.setItem('self_name', encodeURIComponent(res.data.phone))
        }
        this.$router.push({
          path: '/setting'
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      this.clientWidth()
    })
    // 解决ie或者edge浏览器fixed定位出现抖动的问题
    // if(that.$checkBrowser() === 'Edge' || that.$checkBrowser() === 'IE') { // 判断浏览器类型
    //   that.$addEvent(document.getElementsByTagName('body')[0], 'mousewheel', function () { // 当滚动时触发
    //     that.$preventDefault() // 取消预定的动作
    //     var wd = event.wheelDelta
    //     var offSetY = window.pageYOffset
    //     window.scrollTo(0, offSetY) // 直接跳到滚动一次后的地方
    //   })
    // }
  },
  updated () {
    var that = this
    if (!localStorage.id) that.$store.commit('/layout/changeSigned', false)
    // 消息已读通知
    var sessMap = webim.MsgStore.sessMap()
    if (sessMap) {
      var sum = 0
      for (let i in sessMap) {
        if (sessMap[i]._impl.unread !== 0) {
          if (i === sessMap[i]._impl.skey) {
            var num = sessMap[i]._impl.unread
          }
          that.unreadNum = sum += sessMap[i]._impl.unread
        }
      }
    }
    that.$ajax.get('/api/home_page/site_message/no_read/').then(res => {
      that.unmessage = res.data
    })
    if (this.$route.meta.location && this.$route.meta.location.length > 0) {
      let barIndex1 = this.$route.query.barIndex
      this.locations = this.$route.meta.location
      if (barIndex1) {
        this.locations[0].title = '我的客户'
        this.locations[0].url = '/customer_app'
      }
      this.changeStatus(true)
    } else {
      this.changeStatus(false)
    }
    // 若直接从地址栏键入路由需进行匹配，从而定位到指定侧边栏导航，同时也解决了刷新页面，侧导航actived状态错误的问题
    if (this.$route.meta.selIndex) {
      // 首页页脚展示
      // this.visibleFooter = this.$route.path === '/'
      // 融资导航定位
      let barIndex = this.$route.query.barIndex
      if (barIndex) this.father.selIndex = Number(barIndex)
      else this.father.selIndex = this.$route.meta.selIndex[localStorage.role]
      // 404
      if (this.$route.path === '/notFound') this.changeStatus(false)
      // 支付
      if (this.$route.path === '/wallet/recharge') that.$store.commit('/layout/changeSigned', false)
    } else {
      this.father.selIndex = -99
    }
    // 判断是否窗口出现滚动条
    let maxHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    this.sroll = document.querySelector('.side-container-view').clientHeight > maxHeight
  },
  computed: {
    ...mapState({
      isSigned: status => status.layout.isSigned
    })
  },
  methods: {
    ...mapActions('location', [
      'changeStatus'
    ]),
    clientWidth () {
      let isShrink = false, clientWidth = document.documentElement.clientWidth
      isShrink = clientWidth <= 1100 ? true : false
      if (isShrink !== this.isShrink && this.$refs.sideBar) {
        this.isShrink = isShrink
        this.$refs.sideBar.handleBar(isShrink)
      }
    },
    handleSideBar (e) {
      this.isShrink = e
    },
    // 管理
    adminEnter () {
      var that = this
      that.$router.push('/')
    },
    // 消息
    messageList () {
      var that = this
      that.$router.push('/message_app')
    },
    // 安全
    safeNumber () {
      var that = this
      that.$router.push('/settings')
    },
    showMsgChild (data, id, name) {
      this.prentMsg = data
      this.friendId = id
      this.friendName = name
    },
    listerChild (data) {
      this.prentMsg = data
    },
    handleSignOut: function (e) {
      this.dialogVisible = e
    },
    sureSignOut: function () {
      var that = this
      this.$ajax.post('/api/auth/logout/').then(res => {
        this.dialogVisible = false
        localStorage.removeItem('ns_token')
        localStorage.removeItem('id')
        localStorage.removeItem('avatar')
        localStorage.removeItem('self_name')
        window.location.href = that.$host() + '/login.html'
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handleMessage () {
      this.unmessage -= 1
    },
    checkRoute (route) {
      if (route && route.meta.title === '设置') {
        this.$store.commit('layout/byFull')
      } else {
        this.$store.commit('layout/byIframe')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .base-layout {
    height: 100%;
    display: flex;
    transition: width .4s ease;
    .side-container {
      // width: calc(100% - 260px);
      height: 100%;
      transition: all .4s ease;
      overflow-x: auto;
      position: absolute;
      left: 260px;  
      right: 0;   
      &.-shrink {
        // width: calc(100% - 80px);
        left: 80px;
        right: 0;
        transition: all .4s ease;
      }
      .side-container-view {
        margin-top: 64px;
        // overflow-x: auto;
        background: #f5f7f8;
        min-height: calc(100% - 64px);
      }
    }
  }
</style>
