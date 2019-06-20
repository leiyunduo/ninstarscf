<template>
  <div class="asset">
    <div class="right-box">
      <ul class="show-tab">
        <li v-for="(item, index) in tabTitle" :key='index' @click='handleTab(index)' :class="[showIndex === index ? 'active' : '']">
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div class="show-box">
        <div class="show-info" v-if="showIndex === 0">
          <Robot v-if="!inner" @changeIndex='changeIndex' :isFriend="true"></Robot>
          <Robot1 v-if="inner" @changeIndex='changeIndex' :isFriend="true"></Robot1>
        </div>
        <div class="show-info" v-if="showIndex === 1">
          <Fund></Fund>
        </div>
        <div class="show-info" v-if="showIndex === 2">
          <AllProperty></AllProperty>
        </div>
        <div class="show-info" v-if="showIndex === 3">
          <From></From>
        </div>
        <div class="show-info" v-if="showIndex === 4">
          <Add></Add>
        </div>
        <div class="show-info" v-if="showIndex === 5">
          <MyCridit></MyCridit>
        </div>
        <div class="show-info" v-if="showIndex === 6">
          <Demand></Demand>
        </div>
        <div class="show-info" v-if="showIndex === 7">
          <MyHistory></MyHistory>
        </div>
        <div class="show-info" v-if="showIndex === 8">
          <riskManagement></riskManagement>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入echarts
// import echarts from 'echarts'
import AllProperty from './son/allProperty'
import Fund from './son/fund'
import Demand from './son/demand'
import MyCridit from './son/myCridit'
import MyHistory from './myHistory'
import From from './son/from'
import Add from './son/add'
import Pledge from './pledge'
import Robot from './son/robot'
import Robot1 from './robot1'
// import AppNav from '../financing/financingManege'
import RiskManagement from './son/riskManagement'
// Vue.prototype.$echarts = echarts
export default {
  name: 'Property',
  components: {
    // AppNav, 
    AllProperty, Fund, Demand, MyHistory, MyCridit, From, Add, Pledge, Robot,
    Robot1,
    RiskManagement
  },
  data () {
    return {
      tabTitle: [
        {ci: 0, name: '资产总览'}, // 机器人
        {ci: 1, name: '交易总览'}, // 不变
        {ci: 2, name: '资产变化'}, // 原来资产总览
        {ci: 3, name: '资产凭证'}, // 后做的第一个
        {ci: 4, name: '资产增信'}, // 后做第二个
        {ci: 5, name: '交易信用'}, // 原来我的信用
        // {ci: 6, name: '质押状况'}, // 后做的第三个
        {ci: 6, name: '融资状况'}, // 原来融资需求
        {ci: 7, name: '信评'},// 原来的历史
        {ci: 8, name: '风险管理'}// 原来的历史
      ],
      showIndex: 0,
      inner: false
    }
  },
  created () {
    this.inner = this.$route.query.inner
  },
  methods: {
    changeIndex: function (e) {
      this.showIndex = Number(e)
    },
    handleTab: function (e) {
      const that = this
      if (e !== 7) {
        this.showIndex = e
      } else {
        that.$message.warning('功能升级中')
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
  },
  mounted () {
    let _location = [
      {
        title: '数据资产',
        url: ''
      }
    ]
    this.$emit('sonPath', this.$route.path)
  }
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
    }
  }
}
</style>
