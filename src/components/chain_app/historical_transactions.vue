<template>
  <div id="historical_transactions">
    <div>
      <!-- <appNav :father='{selIndex: 1}'></appNav> -->
    </div>
    <div class="right-box">
      <div class="top">
        <div class="show_title">
          <div class="locations">
            <img src="static/img/leftbar/mychain.png" alt="">
            <span>位置 > </span>
            <span>
              <a @click="routeClick">链式记账</a>
              <span>></span>
            </span>
            <span>历史交易数据增信</span>
          </div>
          <button @click="addCredit">生成PDF</button>
        </div>
      </div>
      <div class="top_nav">
        <ul id="nav-box">
          <li v-for="(item, index) in listName" :key="index" @click="ulClick(index)">
            <span :title="item" :class="{li_actives: li_active === index}">{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="historical_list">
        <div class="list" v-if="li_active === 0">
          <transactionStatistics />
        </div>
        <div class="list" v-if="li_active === 1">
          <financingStatistics />
        </div>
        <div class="list" v-if="li_active === 2">
          <financing />
        </div>
        <div class="list" v-if="li_active === 3">
          <loanAid />
        </div>
        <!-- <div class="list" v-if="li_active === 3" style="height:300px;background:#fff;line-height:100px;font-size:18px;text-align:center;">
          暂无数据
        </div> -->
        <div class="list">
          <supplier v-if="li_active === 4" />
        </div>
        <div class="list">
          <customer v-if="li_active === 5" />
        </div>
        <div class="list">
          <riskManagement v-if="li_active === 6" />
        </div>
      </div>
    </div>
    <addCredit :print='print' v-if='print.print === 1' @listerChilds='listerChilds' />
  </div>
</template>
<script>
// import AppNav from '@/components/financing/financingManege'
// 企业供应链交易信息
import transactionStatistics from './historical_transactions/transactionStatistics.vue'
// 企业供应链交易信用概要
import financingStatistics from './historical_transactions/financing_statistics.vue'
// 供应商信用评估
import supplier from './historical_transactions/supplier.vue'
// 客户信用评级
import customer from './historical_transactions/customer.vue'
// 企业风险管理报告
import riskManagement from './historical_transactions/risk_management.vue'
// 当前融资申请与融资交易场景
import financing from './historical_transactions/financing.vue'
// 九星平台助贷增信与贷后辅助风险监控服务
import loanAid from './historical_transactions/loan_aid.vue'
import addCredit from './add_credit.vue'
export default {
  name: 'historicalTransactions',
  components: {
    // AppNav,
    transactionStatistics,
    financingStatistics,
    supplier,
    customer,
    riskManagement,
    financing,
    loanAid,
    addCredit
  },
  data () {
    return {
      showIndex: 1,
      li_active: 0,
      print: {
        print: 0
      },
      listName: ['供应链交易信息', '供应链交易信用概览', '融资申请与融资交易场景', '助贷增信与贷后风险监控', '供应商信用', '客户信用', '风险管理']
    }
  },
  methods: {
    listerChilds (data) {
      this.print.print = data
    },
    // listName
    ulClick (i) {
      const that = this
      that.li_active = i
    },
    // 返回
    routeClick () {
      this.$router.push('/chain_app')
    },
    // 生成pdf
    addCredit () {
      const that = this
      that.print.print = 1
      // setTimeout( function() { $('#historical_add_credit').jqprint() }, 2000);
    }
  },
  mounted () {
    var that = this
  }
}
</script>
<style lang='less' scoped>
#historical_transactions{
  width: 100%;
  min-height: 100%;
  //padding-top: 70px;
  margin: 0 auto;
  background: #f5f7f8;
  display: flex;
  .right-box{
    width: 100%;
    min-height: 100%;
    float: right;
    background: #f5f7f8;
    .top {
      .show_title {
        line-height: 60px;
        background: #fff;
        position: relative;
        padding-left: 36px;
        img {
          vertical-align: middle;
          margin-right: 10px;
        }
        a {
          cursor: pointer;
        }
        span {
          color: #343536;
        }
        .locations {
          height: 60px;
          line-height: 60px;
          font-size: 16px;
          img{
            margin-right: 10px;
            vertical-align: middle;
          }
          span {
            line-height: 60px;
            color: #343536;
            a {
              color: #343536;
              text-decoration: none;
            }
          }
          &>span:last-child {
            color :#eb6100;
          }
        }
        button {
          position: absolute;
          right: 50px;
          bottom: 10px;
          width: auto;
          padding: 0 20px;
          height: 32px;
          border: none;
          background: #eb6100;
          color: #fff;
          border-radius: 4px;
          outline: none;
        }
      }
    }
    .top_nav {
      width:100%;
      height:52px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(232,232,232,1);
      ul {
        height: 52px;
        box-sizing: border-box;
        padding-left: 20px;
        display: flex;
        flex-direction: row;
        li {
          box-sizing: border-box;
          width: 12%;
          text-align: center;
          text-overflow:ellipsis;
          white-space: nowrap;
          overflow: hidden;
          padding: 0 15px;
          color: #333;
          cursor: pointer;
          height: 52px;
          span {
            display: inline-block;
            padding: 14px 5px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
          }
        }
        li:nth-child(3) {
          width: 16%;
        }
        li:nth-child(4) {
          width: 21%;
        }
        li:nth-child(5), li:nth-child(6) {
          width: 10%;
        }
        .li_actives {
          border-bottom: 2px solid #eb6100;
          color: #eb6100;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:bold;
          color:rgba(235,97,0,1);
        }
      }
    }
    .historical_list {
      width: 100%;
      height: auto;
      padding: 20px 120px 20px 30px;
      .list {
        .title {
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:bold;
          color:rgba(51,51,51,1);
          padding-bottom: 19px;
        }
        .echarts_list {
          width: 100%;
          height:416px;
          background:rgba(255,255,255,1);
          .list_nav {
            border-bottom: 1px solid rgba(221,221,221,1);
            height: 54px;
            padding: 0 30px;
            h3 {
              font-size:16px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height: 54px;
              float: left;
            }
            .select {
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>
