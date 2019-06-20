<template>
  <div class="financing_section">
    <!-- <AppNav :father='father'></AppNav> -->
    <div class="order_application">
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <ul class="step_nav">
        <li v-for="(item, index) in steps" :key='index' :class="index <= currentIndex ? 'currentIndex' : ''" @click="handleNav(index)">
            <img :src="currentIndex >= index ? item.icon : item.disicon">
          <div>
            <span>{{index + 1}}</span>
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
      <orderRisk @sign='selIndex = 1, currentIndex = 1' v-if="selIndex === 0"/>
      <orderAgreement v-if="selIndex === 1"/>
      <orderLoan v-if='selIndex === 2' />
      <orderRepayment v-if='selIndex === 3' />
    </div>
  </div>
</template>

<script>
import location from '@/components/location/location'
// import AppNav from '@/components/financing/financingManege'
import orderRisk from './order_risk'
import orderAgreement from './order_agreement'
import orderLoan from './order_loan'
import orderRepayment from './order_repayment'

export default {
  name: 'orderFinancingCredit',
  components: {
    location, 
    // AppNav, 
    orderRisk, orderAgreement, orderLoan, orderRepayment
  },
  data () {
    return {
      selIndex: 0,
      currentIndex: 0,
      father: {selIndex: 0},
      location: [{title: ''}],
      steps: [
        {name: '风控审核', icon: require('../../../../../../static/img/financing/risk.png'), disicon: require('../../../../../../static/img/financing/risk-d.png')},
        {name: '三方协议', icon: require('../../../../../../static/img/financing/agreement.png'), disicon: require('../../../../../../static/img/financing/agreement-d.png')},
        {name: '放款', icon: require('../../../../../../static/img/financing/loan.png'), disicon: require('../../../../../../static/img/financing/loan-d.png')},
        {name: '还款', icon: require('../../../../../../static/img/financing/repayment.png'), disicon: require('../../../../../../static/img/financing/repayment-d.png')}
      ]
    }
  },
  mounted () {
    // 获取当前融资状态
    this.$ajax.get(`/api/financing/loan_process/${this.$route.query.id}/`).then(res => {
      if (res.status === 200) {
        let state = Number(res.data.loan_process_status)
        if (state >= 100 && state < 300) {
          this.selIndex = 0
        } else if (state >= 300 && state < 500) {
          this.selIndex = 1
        } else if (state >= 500 && state < 600) {
          this.selIndex = 2
        } else if (state >= 600 && state < 800) {
          this.selIndex = 3
        }
        this.state = state
        // 控制顶部跳转
        this.currentIndex = this.selIndex
        this.handleLocation()
      }
    })
  },
  methods: {
    // 上方导航
    handleNav (index) {
      const that = this
      // this.selIndex = index
      if (index <= that.currentIndex) {
        that.selIndex = index
        that.handleLocation()
      }
    },
    // 确认当前位置面包屑
    handleLocation () {
      const that = this
      this.location = [
        that.$route.query.sq ? {title: '贷款管理', url: '/debt_app'} : {title: '贷款审核', url: '/credit_app'},
        {title: that.steps[that.selIndex].name}
      ]
      // that.$route.query.sq ? this.father = {selIndex: that.$route.query.sq} : this.father = {selIndex: 0}
    }
  }
}
</script>
<style lang="less" scoped>
  .financing_section {
    display: flex;
    min-height: 100%;
    .order_application {
      width: 100%;
      min-height: 100%;
      background: #fafafa;
      padding: 0 40px;
      //padding-top: 70px;
      .location_wrap {
        background: #fff;
      }
      .step_nav {
        display: flex;
        padding: 12px 0;
        margin-top: 20px;
        background: #fff;
        margin-bottom: 20px;
        li.currentIndex {
          i{
            color: #eb6100;
          }
          div {
            color: #eb6100;
            span:first-child {
              border: 1px solid #eb6100;
            }
            span:last-child {
              border-bottom: 2px solid #eb6100;
            }
          }
        }
        li {
          list-style: none;
          width: 25%;
          text-align: center;
          background: #fff;
          cursor: pointer;
          img {
            width: 30px;
          }
          i {
            margin-bottom: 8px;
            font-size: 20px;
            color:#666;
            font-weight: bolder;
          }
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #666;
            span:first-child {
              // padding: 12px;
              width: 18px;
              height: 18px;
              border: 1px solid #666;
              border-radius: 50%;
              margin-right: 5px;
              line-height: 18px;
              font-size: 14px;
            }
            span:last-child {
              padding: 5px 0;
              border-bottom: 2px solid #fff;
            }
          }
        }
      }
    }
    .dialog-footer {
      button {
        color: #666;
        padding: 0;
        margin: 0;
        border: none;
        border-radius: 3px;
        width: 85px;
        height: 40px;
        margin: 0 10px;
        background: #f0f0f0;
        cursor: pointer;
        outline: none;
      }
      button:last-child {
        color: #fff;
        background: #ff0100;
      }
    }
  }
</style>
