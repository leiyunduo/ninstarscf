<template>
  <div class="BaseHeader" :style="isSroll ? 'right: 17px' : 'right: 0px'" :class="classList">
    <div class="location-view" v-if="isActived">
      <location :location="location"></location>
    </div>
    <div class="header-view">
      <!-- <div @click="handleWallet" class="utils-wraper">
        <span class="utils wallet"></span>
      </div> -->
      <div @click="handleSetting" class="utils-wraper">
        <span class="utils"></span>
      </div>
      <div @click="handleMsg" class="msgs-wraper">
        <span class="msgs">
          <sub v-show="msgCount > 0" class="badge-count">{{msgCount}}</sub>
        </span>
        <!-- 消息面板，暂时不需要 -->
        <!-- <div class="msg-popover-wraper" v-show="visablePanl">
          <div class="msg-popover-inner">
            <div class="msg-popover-content">
              <div class="tab-menu">
                <div>
                  <div class="tab-menu__item" @click="changeTab(index)" :class="tabIndex === index ? 'tab-active' : ''" v-for="(item, index) in tabList" :key="index">{{item}}</div>
                </div>
                <div class="tab-ink tab-ink-animated" :class="tabIndex === 0 ? 'tab-ink-active-first' : (tabIndex === 1 ? 'tab-ink-active-second' : 'tab-ink-active-third')"></div>
              </div>
              <div style="width:0px;height:0px;position:absolute;overflow:hidden"></div>
                <div class="tab-panl-groups">            
                  <div class="tab-panl-wraper">
                    <div style="width:0px;height:0px;position:absolute;overflow:hidden"></div>
                    <div class="tab-panl-inner">
                      <div class="tab-panl">
                        <div class="content-list">
                          <div class="content-list__item">
                            <div class="avatar-image">
                              <img src="static/img/users/new_msg.png" alt="">
                            </div>
                            <div class="content-meta">
                              <h4 class="content-meta__title">您有新的记账需要确认，请及时处理</h4>
                              <div class="content-meta__desc">9-30</div>
                            </div>
                          </div>
                          <div class="content-list__item">
                            <div class="avatar-image">
                              <img src="static/img/users/new_msg.png" alt="">
                            </div>
                            <div class="content-meta">
                              <h4 class="content-meta__title">您有新的好友请求</h4>
                              <div class="content-meta__desc">9-22</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="width:0px;height:0px;position:absolute;overflow:hidden"></div>
                  </div>
                  <div class="tab-panl-wraper">
                    <div class="tab-panl-inner">
                      <div class="tab-panl">
                        Todo...
                      </div>
                    </div>
                  </div>
                  <div class="tab-panl-wraper">
                    <div class="tab-panl">
                      Todo11...
                    </div>
                  </div>
                </div>
              <div style="width:0px;height:0px;position:absolute;overflow:hidden"></div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="user-wrapper" @mouseenter="dropMenuVisable = true" @mouseleave="dropMenuVisable = false">
        <div class="user-view">
          <img class="user-avatar" :src="$root_url() + pic" alt="">
          <span class="user-content">{{self}}</span>
        </div>
        <div class="drop-menu-wraper">
          <ul class="drop-menu" :class="dropMenuVisable ? 'fade-in-active' : ''">
            <li class="drop-menu__item" @click="handles(index)"  @mouseenter="setIndex = index" @mouseleave="setIndex= -1" v-for="(item, index) in selfs" :key="index">
              <img :src="setIndex === index ? item.iconActive : item.icon" alt="">
              <span>{{item.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Location from '@/components/location/locationBase'
export default {
  name: '',
  components: {
    Location
  },
  props: {
    location: {
      type: Array,
      default: () => [{
        title: '', url: ''
      }]
    },
    isSroll: {
      type: Boolean
    }
  },
  data () {
    return {
      dropMenuVisable: false,
      tabList: ['消息', '通知', '待办'],
      tabIndex: 0,
      // visablePanl: false,
      _classList: '',
      selfs: [
        {icon: 'static/img/users/home_1x.png', iconActive: 'static/img/users/home_1x_active.png', title: '首页'},
        {icon: 'static/img/users/self_1x.png', iconActive: 'static/img/users/self_1x_active.png', title: '个人中心'},
        {icon: 'static/img/users/setting_1x.png', iconActive: 'static/img/users/setting_1x_active.png', title: '账号设置'},
        {icon: 'static/img/users/logout_1x.png', iconActive: 'static/img/users/logout_1x_active.png', title: '退出登录'}
      ],
      setIndex: -1,
      // msgCount: 0
    }
  },
  computed: {
    ...mapState({
      isActived: status => status.location.isActived,
      isSuctionTop: status => status.chain.isSuctionTop,
      avatar: status => status.homePage.avatar,
      selfName: status => status.homePage.selfName,
      msgCount: status => status.homePage.msgCount
    }),
    classList () {
      if (this.isActived) {
        this._classList.add('location-actived')
      } else {
        this._classList.delete('location-actived')
      }
      if (this.isSuctionTop) {
        this._classList.add('shadow-hidden')
      } else {
        this._classList.delete('shadow-hidden')
      }
      return [...this._classList]
    },
    self () {
      let self = localStorage.self_name || ""
      return this.selfName.name || decodeURIComponent(self)
    },
    pic () {
      let avatar = localStorage.avatar || ""
      return this.avatar || decodeURIComponent(avatar)
    }
  },
  methods: {
    handleSetting () {
      this.$router.push({
        path: '/setting'
      })
    },
    handleMsg () {
      this.$router.push({
        path: '/message_app'
      })
    },
    handleWallet () {
      this.$router.push({
        path: '/wallet'
      })
    },
    getData: function () {
      this.$ajax.get('/api/home_page/site_message/').then(res => {
        if (res.status === 200) {
          if (res.data.count !== 0) {
            let msgCount = res.data.results.filter(pre => !pre.read).length
            this.$store.commit('homePage/setMsgCount', msgCount)
          }
        }
      })
    },
    handles (index) {
      if (index === 0) {
        location.href = this.$root_url()
      } else if (index === 1) {
        this.$router.push({
          path: '/'
        })
      } else if (index === 2) {
        this.$router.push({
          path: '/setting'
        })
      } else {
        this.$emit('isLogOut', true)
      }
    },
    changeTab (index) {
      this.tabIndex = index
    }
  },
  beforeMount () {
    this._classList = new Set()
    this.getData()
  }
}
</script>
<style lang='less' scope>
  .-shrink>.BaseHeader {
    // width: calc(100% - 97px);
    transition: all .4s ease;
    left: 80px;
  }
  .BaseHeader {
    height: 64px;
    padding: 0 12px 0 0;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: fixed;
    top: 0;
    left: 260px;
    // width: calc(100% - 277px);
    transition: all .4s ease;
    display: flex;
    z-index: 20;
    justify-content: flex-end;
    &.shadow-hidden {
      box-shadow: none;
      border-bottom: 1px solid #e8e8e8;
    }
    &.location-actived {
      justify-content: space-between;
    }
    .header-view {
      display: flex;
      position: fixed;
      right: 30px;
      .msgs-wraper {
        padding: 0 12px;
        position: relative;
        .msgs {
          &::after {
            content: "";
            position: absolute;
            width: 1px;
            height: 21px;
            border-right: 1px solid #e8e8e8;
            right: -26px;
          }
          display: block;
          background: url('../../../static/img/users/log_2x.png') no-repeat center;
          width: 19px;
          height: 20px;
          background-size: contain;
          margin: 21px 20px 0 0;
          position: relative;
          cursor: pointer;
          .badge-count {
            top: -10px;
            height: 18px;
            border-radius: 10px;
            min-width: 18px;
            background: #f5222d;
            color: #fff;
            line-height: 18px;
            text-align: center;
            padding: 0 6px;
            font-size: 12px;
            -webkit-box-shadow: 0 0 0 1px #fff;
            box-shadow: 0 0 0 1px #fff;
            z-index: 10;
            left: 10px;
            position: absolute;
          }
        }
        .msg-popover-wraper {
          // &::before {
          //   .ns-arrow(up, #fff, 10px)
          // }
          width: 300px;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.65);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          position: absolute;
          top: 100%;
          right: 15px;
          z-index: 1030;
          text-align: left;
          cursor: auto;
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
          user-select: text;
          .msg-popover-inner {
            background-color: #fff;
            background-clip: padding-box;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            .msg-popover-content {
              padding: 12px 16px;
              .tab-menu {
                position: relative;
                border-bottom: 1px solid #e8e8e8;
                box-sizing: border-box;
                margin-bottom: 16px;
                .tab-menu__item {
                  display: inline-block;
                  height: 100%;
                  margin: 0 32px 0 0;
                  padding: 12px 16px;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                  -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                  cursor: pointer;
                  position: relative;
                  text-decoration: none;
                  user-select: none;
                  &:last-of-type {
                    margin: 0;
                  }
                  &:hover {
                    color: lighten(#1890ff, 15%);
                    font-weight: 500;
                    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                  }
                  &:active {
                    color: darken(#1890ff, 20%);
                    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                    font-weight: 500;
                  }
                  &.tab-active {
                    color: #1890ff;
                  }
                }
                .tab-ink {
                  z-index: 1;
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                  height: 2px;
                  background-color: #1890ff;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                  &.tab-ink-active-first {
                    display: block;
                    transform: translate3d(0px, 0px, 0px);
                    width: 60px;
                  }
                  &.tab-ink-active-second {
                    display: block;
                    transform: translate3d(92px, 0px, 0px);
                    width: 60px;
                  }
                  &.tab-ink-active-third {
                    display: block;
                    transform: translate3d(184px, 0px, 0px);
                    width: 60px;
                  }
                  &.tab-ink-animated {
                    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                  }
                }
              }
              .tab-panl-groups {
                display: flex;
                overflow: hidden;     
                .tab-panl-wraper {
                  width: 100%;
                  flex-shrink: 0; 
                  .tab-panl-inner {
                    position: relative;
                    // height: 0;
                    .tab-panl {
                      .content-list {
                        .content-list__item {
                          display: flex;
                          align-content: center;
                          border-bottom: 1px solid #e8e8e8;
                          padding: 12px 0;
                          .avatar-image {
                            margin-right: 16px;
                            width: 32px;
                          }
                          .content-meta {
                            .content-meta__title {
                              color: rgba(0, 0, 0, 0.65);
                              margin-bottom: 4px;
                              font-size: 14px;
                              line-height: 22px;
                            }
                            .content-meta__desc {
                              color: rgba(0, 0, 0, 0.45)
                            }
                          }
                          &:last-of-type {
                            border-bottom: none
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .utils-wraper {
        padding: 0 12px;
        position: relative;
        .utils {
          &::after {
            content: "";
            position: absolute;
            width: 1px;
            height: 21px;
            border-right: 1px solid #e8e8e8;
            right: -26px;
          }
          display: block;
          background: url('../../../static/img/users/setting_2x.png') no-repeat center;
          width: 19px;
          height: 20px;
          background-size: contain;
          margin: 21px 20px 0 0;
          position: relative;
          cursor: pointer;
          &.wallet {
            width: 24px;
            background: url('../../../static/img/leftbar/wallet.png') no-repeat center;
          }
        }
      }
      .user-wrapper {
        position: relative;
        .user-view {
          display: flex;
          align-items: center;
          line-height: 62px;
          padding: 0 12px;
          .user-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 5px;
          }
          .user-content {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            font-weight: bold;
            user-select: none;
            display: inline-block;
            max-width: 220px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
          }
        }
        .drop-menu-wraper {
          .drop-menu {
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 10;
            padding: 10px 0 5px;
            margin: 5px 0;
            margin-top: 5px;
            background-color: #fff;
            border: 1px solid #ebeef5;
            border-radius: 4px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            max-height: 400px;
            overflow: auto;
            min-width: 180px;
            opacity: 0;
            transform: scaleY(0);
            transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
            transform-origin: center top;
            &.fade-in-active {
              opacity: 1;
              transform: scaleY(1);
              transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
              transform-origin: center top;
            }
            &.fade-out-active {
              opacity: 0;
              transform: scaleY(0);
            }
            .drop-menu__item {
              line-height: 36px;
              padding-left: 20px;
              margin: 0;
              font-size: 14px;
              color: #606266;
              cursor: pointer;
              outline: none;
              align-items: center;
              display: flex;
              align-items: center;
              img {
                width: 16px;
                margin-right: 8px
              }
              &:hover {
                background-color: #ecf5ff;
                color: #66b1ff;
              }
              &:last-of-type {
                border-top: 1px solid #ebeef5;
              }
              &>.item-icon {
                display: inline-block;
                width: 14px;
                height: 14px;
                margin-right: 8px;
                // &.home {
                //   background: url('../../../static/img/users/home_1x.png') no-repeat center;
                //   background-size: cover;
                // }
                // &.-self {
                //   background: url('../../../static/img/users/self_1x.png') no-repeat center;
                //   background-size: cover;
                //   // &:hover {
                //   //   background: url('../../../static/img/users/self_1x_active.png') no-repeat center;
                //   // }
                // }
                // &.-setting {
                //   background: url('../../../static/img/users/setting_1x.png') no-repeat center;
                //   background-size: cover;
                //   height: 15px;
                //   // &:hover {
                //   //   background: url('../../../static/img/users/setting_1x_active.png') no-repeat center;
                //   // }
                // }
                // &.-logout {
                //   background: url('../../../static/img/users/logout_1x.png') no-repeat center;
                //   background-size: cover;
                //   height: 15px;
                //   // &:hover {
                //   //   background: url('../../../static/img/users/logout_1x_active.png') no-repeat center;
                //   // }
                // }
              }
            }
          }
        }
      }
    } 
  }
</style>