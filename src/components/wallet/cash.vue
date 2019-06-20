<template>
  <div class="cash_header">
    <!-- <div class="cash_title"> -->
      <!-- <h2 class="cash-btn cash-btn-animated" @click="isList(index)" v-for="(item,index) in Title" :key="index" :class="isShow === index ? 'Activated' : 'Active'" :id="isShow === index ? 'showTexted' : ''"
      >{{item}}</h2> -->
    <!-- <div class="tab-menu">
          <div>
            <div class="tab-menu__item" @click="isList(index)" :class="isShow === index ? 'tab-active' : ''" v-for="(item, index) in Title" :key="index">{{item}}</div>
          </div>
          <div class="tab-ink tab-ink-animated" :class="isShow === 0 ? 'tab-ink-active-first' : 'tab-ink-active-second'"></div>
        </div>
    </div> -->
    <div class="big_item" v-if="isShow == 0">
      <paycash></paycash>
    </div>
    <div class="big_item" v-if="isShow == 1">
      <payonline></payonline>
    </div>
  </div>
</template>

<script>
import paycash from "./PaymentDetails/pay_cash"
import payonline from "./PaymentDetails/pay_online"
export default {
  name: "cash_header",
  props: {},
  data() {
    return {
      isActive: false,
      isShow: 0,
      tabIndex:0,
      Title: ["现金", "线上充值"],
      token: '',
      type: '',
      amount: 1,
      bank: '北京银行'
    };
  },
  methods: {
    isList(index) {
      this.tabIndex = 0
      this.isShow = index;
      if (this.isShow === 0) {
      } else if (this.index === 1) {
      }
    }
  },
  mounted () {},
  components: {
    paycash,
    payonline
  }
};
</script>
<style lang='less' scoped>
.cash_header {
  width: 100%;
  .cash_title {
    // width: 100%;
    // height: 53px;
    // background: #fff;
    // display: flex;
    // padding-left: 22px;
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
              transform: translate3d(-7px, 0px, 0px);
              width: 64px;
            }
            &.tab-ink-active-second {
              display: block;
              transform: translate3d(68px, 0px, 0px);
              width: 96px;
            }
            &.tab-ink-animated {
              transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
          }
        }
  }
  .big_item {
    width: 97%;
    margin: 0 auto;
    margin-top: 1.2%;
  }
}
.Activated {
  border-bottom: solid 2px #eb6100;
}
.Active {
  border-bottom: none;
}
#showTexted {
  color: #eb6100;
}
</style>