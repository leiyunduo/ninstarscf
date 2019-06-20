<template>
  <div class="asset">
    <div class="right-box">
      <ul class="show-tab">
        <li v-for="(item, index) in tabTitle" :key='index' @click='handleTab(index)'>
          <span :class="[showIndex === index ? 'active' : '']">{{item.name}}</span>
        </li>
      </ul>
      <div class="show-box bank">
        <div class="show-info" v-if="showIndex === 0">
          <Robot @changeIndex='changeIndex' :isFriend="true" :bid='bid'></Robot>
        </div>
        <div class="show-info" v-if="showIndex === 1">
          <Fund :bid='bid'></Fund>
        </div>
        <div class="show-info" v-if="showIndex === 2">
          <AllProperty :bid='bid'></AllProperty>
        </div>
        <div class="show-info" v-if="showIndex === 3">
          <From :bid='bid'></From>
        </div>
        <div class="show-info" v-if="showIndex === 4">
          <Add :bid='bid'></Add>
        </div>
        <div class="show-info" v-if="showIndex === 5">
          <MyCridit :bid='bid'></MyCridit>
        </div>
        <!-- <div class="show-info" v-if="showIndex === 6">
          <Pledge></Pledge>
        </div> -->
        <div class="show-info" v-if="showIndex === 6">
          <Demand :bid='bid'></Demand>
        </div>
        <div class="show-info" v-if="showIndex === 7">
          <MyHistory :bid='bid'></MyHistory>
        </div>
        <div class="show-info" v-if="showIndex === 8">
          <riskManagement :bid='bid'></riskManagement>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入echarts
// import echarts from 'echarts'
// import AppNav from '@/components/financing/financingManege'
import AllProperty from './allProperty'
import Fund from './fund'
import Demand from './demand'
import MyCridit from './myCridit'
import MyHistory from './myHistory'
import From from './from'
import Add from './add'
import Pledge from './pledge'
import Robot from './robot'
import RiskManagement from './riskManagement'
import {mapActions} from 'vuex'
// Vue.prototype.$echarts = echarts
export default {
  name: 'Property',
  components: {
    // AppNav, 
    AllProperty, Fund, Demand, MyHistory, MyCridit, From, Add, Pledge, Robot,
    RiskManagement
  },
  data () {
    return {
      tabTitle: [
        {ci: 0, name: '资产总览'}, // 机器人
        {ci: 1, name: '交易总览'}, // 不变
        {ci: 2, name: '资产日均变化'}, // 原来资产总览
        {ci: 3, name: '资产凭证'}, // 后做的第一个
        {ci: 4, name: '资产增信'}, // 后做第二个
        {ci: 5, name: '交易信用'}, // 原来我的信用
        // {ci: 6, name: '质押状况'}, // 后做的第三个
        {ci: 6, name: '融资状况'}, // 原来融资需求
        {ci: 7, name: '信评'},// 原来的历史
        {ci: 8, name: '风险管理'}// 原来的历史
      ],
      showIndex: 0,
      bid: null,
      only: false,
      // step: {}
    }
  },
  created () {
    this.bid = this.$route.query.company_id
    if (this.$route.query.only) this.only = this.$route.query.only
  },
  methods: {
    changeIndex: function (e) {
      this.showIndex = Number(e) 
    },
    handleTab: function (e) {
      const that = this
      if (e === 7) {
        that.$message.warning('功能未开放')
      } else {
        this.showIndex = e
      }
      // if (e === 0) {
      //   that.showIndex = 0
      // } else {
      //   that.$ajax.get('/api/permissions/information/?token=' + that.$token() + '&module_name=' + that.tabTitle[e].name).then(res => {
      //     if (res.data.code === '1') {
      //       if (res.data.is_auth) {
      //         that.showIndex = app.use(function (req, res, next) {
      //           res.status(404).send('404 - Not Found!')
      //         })
      //       } else {
      //         that.$message.error(`请开通${that.tabTitle[e].name}权限后查看`)
      //       }
      //     } else {
      //       that.$message.error(res.data.msg)
      //     }
      //   })
      // }
    }
  }
  // mounted () {
  //   var that = this
  //   // // console.log('我的数据资产')
  //   that.$ajax.get('/api/myasset/?token=' + that.$token()).then((res) => {
  //     // console.log(res)
  //     that.pieVal = res.data.credit_parameters
  //     // // console.log(that.pieVal)
  //     var gtLen = 0
  //     for (var item in res.data.gts) {
  //       gtLen++
  //       var xItem = item.substr(0, 4) + '-' + item.substr(4, item.length)
  //       that.lineX.push(xItem)
  //       that.lineY.push(res.data.gts[item])
  //     }
  //     // console.log(gtLen)
  //     that.nowDT = that.lineY[gtLen - 1] / 10000
  //     that.drawLine()
  //     that.drawPie()
  //   })
  // }
}
</script>
<style lang='less' scoped>
.asset{
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  background: #f5f7f8;
  display: flex;
  .right-box{
    width: 100%;
    min-height: 100%;
    float: right;
    background: #f5f7f8;
    .title{
      background: #fff;
      color: #3c4046;
      line-height: 60px;
      box-shadow: 10px 10px 17px -3px #ddd;      
      padding: 0 50px;
      img {
        margin-right: 10px;
        vertical-align: middle;
      }
    }
    .show-tab {
      height:60px;
      background:rgba(255,255,255,1);
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      li {
        font-size: 14px;
        line-height: 60px;
        justify-content: space-around;
        text-align: center;
        padding: 0 15px;
        flex: 1;
        span {
          display: inline-block;
          width: 100%;
          cursor: pointer;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
      }
      .active{
        border-bottom: 2px solid #eb6100;
        span {
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(235,97,0,1);
        }
      }
    }
    .show-box {
      margin: 0 22px;
      &.bank {
        min-width: 1500px;
      }
    }
  }
}
</style>
