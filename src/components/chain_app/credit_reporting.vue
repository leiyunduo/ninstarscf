<template>
  <div class="credit_reporting" id="window_credit_reportingS">
    <div class="flex-add">
      <div class="top">
        <!-- <div class="show_title">
          <div class="locations">
            <img src="static/img/leftbar/mychain.png" alt="">
            <span>位置 > </span>
            <span>
              <a @click="routeClick">链式记账</a>
              <span>></span>
            </span>
            <span>大数据征信</span>
          </div>
        </div> -->
      </div>
      <div class="ul_list" id="nav-container">
        <ul id="nav-box">
          <li v-for="(item, index) in listName" :key="index" @click="ulClick(index)">
            <span :class="{li_actives: li_active === index}">{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="historical_list">
        <div class="list" v-if="li_active === 0">
          <businessInformation />
        </div>
        <div class="list" v-if="li_active === 1">
          <financialSituation />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
// 企业信用信息
import businessInformation from './historical_transactions/business_information.vue'
// 财务信息
import financialSituation from './historical_transactions/financial_situation.vue'
export default {
  data () {
    return {
      prints: 0,
      name: '',
      myDate: '',
      company_id: '',
      actives: 0,
      li_active: 0,
      scrollTop_li: false,
      listName: ['信用信息', '财务信息']
    }
  },
  components: {
    businessInformation,financialSituation
    // AppNav
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
    var myDatea = new Date();
    that.myDate = myDatea.toLocaleString( ); 
    that.$ajax.get(`/api/company/` + that.company_id).then(res => {
      that.name = res.data.name
    })
  },
  methods: {
    ulClick (i) {
      const that = this
      that.li_active = i
    },
    routeClick () {
      this.$router.push('/chain_app')
    }
  }
}
</script>

<style lang="less" scope>
.credit_reporting {
  width: 100%;
  min-height: 100%;
  //padding-top: 70px;
  margin: 0 auto;
  background: #f5f7f8;
  display: flex;
  .ul_list {
    width:100%;
    height:52px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(232,232,232,1);
    margin-top: 20px;
    width: calc(100% - 120px);
    ul {
      height: 52px;
      box-sizing: border-box;
      padding-left: 20px;
      li {
        box-sizing: border-box;
        float: left;
        text-align: center;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 30px;
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
  .flex-add {
    width: 100%;
    min-height: 100%;
    float: right;
    background: #f5f7f8;
    margin-left: 50px;
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
  }
  .historical_list {
    width: 100%;
    height: auto;
    padding: 0 120px 20px 0px;
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
</style>
