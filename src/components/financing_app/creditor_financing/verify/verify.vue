<template>
  <div class="financing_section">
    <!-- <AppNav :father='{selIndex: 3}'></AppNav> -->
    <div class="order_application">
      <div class="location_wrap">
      <location :location='location'></location>
      </div>
      <ul class="step_nav">
        <li v-for="(item, index) in steps" :key='index' :class="index <= currentIndex ? 'currentIndex' : ''" @click="handleNav(index)">
          <!-- <img :src="currentIndex >= index ? item.icon : item.disicon"> -->
          <div>
            <span>{{index + 1}}</span>
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
      <orderLoan v-if='selIndex === 0' />
      <orderRepayment v-if='selIndex === 1' />
    </div>
  </div>
</template>

<script>
import location from '@/components/location/location'
import orderLoan from './order_loan'
import orderRepayment from './order_repayment'

export default {
  name: 'orderFinancingVerify',
  components: {
    location, 
    orderLoan,
    orderRepayment
  },
  data () {
    return {
      selIndex: 0,
      currentIndex: 0,
      steps: [
        {name: '放款', icon: require('../../../../../static/img/financing/loan.png'), disicon:  require('../../../../../static/img/financing/loan-d.png')},
        {name: '还款', icon: require('../../../../../static/img/financing/repayment.png'), disicon: require('../../../../../static/img/financing/repayment-d.png')}
      ],
      location: [
        {title: '我的融资', url: '/financing_app'}
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
      if (index <= this.currentIndex) {
        this.selIndex = index
        this.handleLocation()
      }
    },
    handleArgeee () {
      this.selIndex = 2
      this.currentIndex = 2
    },
    // 确认当前位置面包屑
    handleLocation () {
      const that = this
      if (!that.$route.query.debt) {
        this.location = [
          {title: '我的融资', url: '/financing_app'},
          {title: this.steps[this.selIndex].name}        
        ]
      } else {
        that.location = [
          {title: '我的债权债务', url: '/claim_app'},
          {title: this.steps[this.selIndex].name}    
        ]
      }
    }
  },
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
        margin-top: 20px;
        background: #fff;
        margin-bottom: 20px;
        height:120px;
        li.currentIndex {
          div {
            span:first-child {
              background:rgba(235,97,0,1);
              color:rgba(254,254,254,1);
              border:1px solid rgba(235,97,0,1);
            }
            span:last-child {
              color:rgba(51,51,51,1);
            }
          }
        }
        li {
          list-style: none;
          flex: 1;
          text-align: center;
          background: #fff;
          cursor: pointer;
          padding-top: 42px;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            span:first-child {
              border:1px solid rgba(220,220,220,1);
              border-radius: 50%;
              margin-right: 12px;
              line-height: 32px;
              font-size: 14px;
              width:32px;
              height:32px;
              font-size:16px;
              font-family:PingFangSC-Regular;
              font-weight:bold;
              color:rgba(187,187,187,1);
            }
            span:last-child {
              padding: 5px 0;
              border-bottom: 2px solid #fff;
              font-size:18px;
              font-family:PingFangSC-Regular;
              font-weight:bold;
              color:rgba(187,187,187,1);
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
