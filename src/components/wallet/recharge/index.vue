<template>
  <div class="deposit-wraper">
    <div class="deposit-viewer">
      <div class="deposit-title">
        <div class="tab-menu">
          <div>
            <div class="tab-menu__item" @click="changeTab(index)" :class="tabIndex === index ? 'tab-active' : ''" v-for="(item, index) in menuList" :key="index">{{item}}</div>
          </div>
          <div class="tab-ink tab-ink-animated" :class="tabIndex === 0 ? 'tab-ink-active-first' : 'tab-ink-active-second'"></div>
        </div>
      </div>
      <div class="deposit-content">
        <div class="deposit-info__viewer" v-if="showIndex === 0">
          <online @paySuccess = "paySuccess"></online>
        </div>
        <div class="deposit-info__viewer" v-if="showIndex === 1">
          <offline></offline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import online from './onlinePay'
  import offline from './offlinePay' 
  export default {
    name: 'deposit',
    data () {
      return {
        showIndex: 0,
        menuList: ['企业网银充值', '线下汇款'],
        tabIndex: 0
      }
    },
    components: {
      online, offline
    },
    methods: {
      paySuccess () {
        this.$parent.getBalance()
      },
      changeTab (index) {
        this.tabIndex = index
        this.showIndex = index
      },
      toDetail (index) {
        this.showIndex = index
        if (index === 0) {

        } else if (index === 1) {

        }
      }
    }
  }
</script>
<style lang='less' scope>
  .deposit-wraper {
    background: #fff;
    .deposit-viewer {
      .deposit-title {
        &>.tab-menu {
          position: relative;
          border-bottom: 1px solid #e8e8e8;
          box-sizing: border-box;
          padding: 11px 21px 5px 21px;
          .tab-menu__item {
            display: inline-block;
            height: 100%;
            margin: 0 12px 0 0;
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
              color: lighten(#eb6100, 15%);
              font-weight: 500;
              transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
            &:active {
              color: darken(#eb6100, 20%);
              transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              font-weight: 500;
            }
            &.tab-active {
              color: #eb6100;
              font-weight: bolder;
            }
          }
          .tab-ink {
            z-index: 1;
            position: absolute;
            left: 30px;
            bottom: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 2px;
            background-color: #eb6100;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            &.tab-ink-active-first {
              display: block;
              transform: translate3d(0px, 0px, 0px);
              width: 110px;
            }
            &.tab-ink-active-second {
              display: block;
              transform: translate3d(139px, 0px, 0px);
              width: 80px;
            }
            &.tab-ink-animated {
              transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
          }
        }
      }
      .deposit-content {
        padding: 15px 20px;
        .deposit-balance {
          margin: 20px 0;
          font-size: 18px;
        }
        .deposit-info__handler {
          display: flex;
          margin: 20px 0;
          .deposit-btn {
            margin: 15px 50px 10px 0;
            padding: 6px 20px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            color: #fff;
            &.btn-nomal {
              background:linear-gradient(90deg,rgba(12,141,255,1) 0%,rgba(48,158,255,1) 100%);
              box-shadow:0px 2px 4px 0px rgba(48,158,255,0.4);
              border-radius:4px;
              &:hover {
                .ns-tab-hover(#0c8dff, bg)
              }
              &:active {
                .ns-tab-active(#0c8dff, bg)
              }
            }
            &.btn-default {
              color: #666;
              border:1px solid rgba(220,220,220,1);
              box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
              border-radius:4px;
              margin-right: 20px;
              &:active {
                .ns-tab-active(#fff, bg)
              }
            }
          }
        }
      }
    }
  }
</style>