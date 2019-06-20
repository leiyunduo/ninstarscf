<template>
  <div class="repay-of-first">
    <div class="repay-of-first__box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="repay-of-first__box__wrap">
        <div class="top-nav">
          <location :location="location"></location>
        </div>
        <div class="repay-of-first__box__inner">
          <div class="financing-item">
            <div class="financing-item__title">
              <span>第一还款来源 (自偿性)</span>
            </div>
            <div class="financing-item__body">
              <div class="financing-ticket">
                <!-- <img src="../../../../../static/img/tickets/tq_xi.png" alt=""> -->
                <span>面额(元)：</span>
                <span>{{handleSum()}}</span>
              </div>
              <p>产生来源</p>
              <div class="financing-table-wrap" v-for="(item, index) in showList" :key='index'>
                <div class="finacing-table-desc">
                  <p>
                    销售项目：<span @click="handleChain(item)">{{item.name}}</span>
                    销售企业：<span @click="handleBusiness(item)">{{item.partner_company_name}}</span>
                  </p>
                </div>
                <div class="financing-table" v-if="item.order" v-for="(order, index1) in item.order" :key='index1'>
                  <div class="financing-table__heder">
                    <div class=""><span>订单名称：</span><span>{{order.name}}</span></div>
                    <div class=""><span>交货日期：</span><span>{{order.deliver_date}}</span></div>
                    <div class=""><span>结算期日：</span><span>{{order.settlement_date}}</span></div>
                    <div><span>订单金额（元）：</span><span>{{order.amount}}</span></div>
                    <!-- <div>
                      <span>电子原件或扫描件</span>
                    </div> -->
                  </div>
                  <div class="financing-table__body">
                    <div class="financing-table__body__inner">
                      <div class="financing-table__tr">
                        <div class="financing-status_blue">
                          <span>订金信息</span>
                        </div>
                        <div class="">
                          <span>订金总额(元): </span>
                          <span class="financing-orange">{{handleDeposit(order)}}</span>
                        </div>
                        <div></div>
                        <div></div>
                        <!-- <div class="financing-table__link">
                          <span>电子原件或扫描件</span>
                        </div> -->
                      </div>
                      <div class="financing-table__tr" v-if="order.deposit" v-for="(deposit, index2) in order.deposit" :key='index2'>
                        <div class="financing-table-content">
                          <div>
                            <div>
                              <span>订金支付方式: </span>
                              <span>{{typeList[deposit.type]}}</span>
                            </div>
                            <div>
                              <span>票据金额(元)：</span>
                              <span>{{deposit.amount}}</span>
                            </div>
                            <div>
                              <span>{{deposit.type <= 2 ? '支付时间' : '汇票到期日：'}}</span>
                              <span>{{deposit.payment_date || date_created}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- TODO: 钻石等级暂未开发 -->
                <!-- <div class="financing-diamonds">
                  <h4>等级：<span>3级</span></h4>
                  <div class="financing-diamonds__desc">   
                    <div class="financing-diamond-group">
                      <span></span>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>订单(销售)</span>
                      </div>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>采购验收</span>
                      </div>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>采购付款</span>
                      </div>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>出库(销售)</span>
                      </div>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>运单(销售)</span>
                      </div>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>验收(销售)</span>
                      </div>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>发票(销售)</span>
                      </div>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>支付(销售)</span>
                      </div>
                      <div class="financing-diamond-group__item">
                        <img src="../../../static/img/financing/zuan.jpg" alt="">
                        <span>延期支付(销售)</span>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
export default {
  name: 'fristRepayment',
  data () {
    return {
      step: {selIndex: 3},
      showList: [],
      typeList: ['', '现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）']
    }
  },
  components: {
    // AppNav, 
    Location
  },
  beforeCreate () {
    this.flag = this.$route.query.id
    this.location = [
      {
        title: '我的融资',
        url: '/financing_app'
      },
      {
        title: '第一还款来源'
      }
    ]
  },
  created () {
    const that = this
    that.$ajax.get(`/api/financing/first_repayment/?chain_id=${that.$route.query.chain_id}&financing_application_id=${that.$route.query.financing_application_id}`).then(res => {
      console.log(res)
      if (res.status === 200) {
        that.showList = res.data
      }
    })
  },
  methods: {
    // 项目订单总和
    handleSum () {
      let sun = 0
      this.showList.forEach(el => {
        if (el.order) {
          el.order.forEach(val => {
            sun += Number(val.amount)
          })
        }
      })
      return sun.toFixed(2)
    },
    // 订单订金总额
    handleDeposit (order) {
      let sum = 0
      order.deposit.forEach(val => {
        sum += Number(val.amount)
      })
      return sum.toFixed(2)
    },
    // 查看链式记账
    handleChain (el) {
      let id = el.chain_id
      let path = '#/chain_app/payment_chain?id='
      window.open(`${path}${id}`)
    },
    // 查看企业首页
    handleBusiness (el) {
      // return false
      window.open('#/enterpriseBlog?bid=' + el.partner_company, '_black')
    }
  }
}
</script>

<style lang='less'>
.financing-link_orange {
  color: #eb6100;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}
.financing-link_blue {
  color: #0c8dff;
  text-decoration: underline;
}
.repay-of-first {
  height: 100%;
  .repay-of-first__box {
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
    .repay-of-first__box__wrap {
      // width: 100%;
      background: #f4f8f9;
      // .top-nav {
      //   height: 60px;
      //   background: #ffffff;
      //   box-shadow: 2px 0 4px #ddd;
      // }
      .repay-of-first__box__inner {
        background: #ffffff;
        margin: 21px 71px 30px 19px;
        overflow: hidden;
        .financing-item {
          .financing-item__title {
            margin: 10px 40px 0 40px;
            height: 60px;
            border-bottom: 1px solid #e1e6f0;;
            display: flex;
            align-items: flex-end;
            &.hide-line {
              border: none
            }
            span {
              display: inline-block;
              padding-left: 8px;
              color: #333;
              font-weight: bolder;
              border-left: 5px solid #eb6100;
              margin-bottom: 5px;  
            }
          }
          .financing-item__body {
            margin: 30px 40px 30px 60px;
            border:1px dashed #e1e6f0;
            box-shadow:0 0 10px 2px #e1e6f0;
            border-bottom: 0;
            .financing-ticket {
              line-height: 47px;
              border: 1px solid #e1e6f0;
              box-shadow: 0 0 5px 0 #e1e6f0;
              width: 270px;
              padding: 0 20px;
              img {
                height: 28px;
                margin-left: 28px;
                vertical-align: middle
              }
              span {
                margin-right: 10px;
                font-size: 14px;
                color: #999;
                &:last-of-type {
                  color: #666;
                  font-weight: bold;
                }
              }
            }
            h3 {
              color: #666
            }
            p {
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              display: block;
              line-height: 43px;
              border-bottom: 1px dashed #e1e6f0;
              padding-left: 28px;
            }
            .financing-table-wrap {
              p {
                font-size: 14px;
                font-weight: bold;
                span {
                  .financing-link_orange;
                  margin-right: 40px;
                }
                border-bottom: 0;
              }
              .financing-table {
              border: 1px solid #e1e6f0;
              margin: 0  -1px  20px;
              &:last-of-type {
                margin-bottom: 0 
              }
              .financing-table__heder {
                padding: 0 30px;
                background: #f7f7f7;
                border-bottom: 1px dashed #e1e6f0;
                display: flex;
                justify-content: space-around;
                font-size:14px;
                color:#333333;
                div {
                  margin: 13px 0px 13px 0px;
                  // padding-right: 20px;
                  width: 25%;
                  display: flex;
                  // justify-content: center;
                  // border-right: 1px dashed #e1e6f0;
                  &:last-of-type {
                    border: 0;
                    // .financing-link_orange;
                  }
                  &>span:last-of-type {
                    font-weight: bolder
                  }
                }
              }
              .financing-table__body {
                .financing-table__body__inner {
                  padding: 0 30px;
                  .financing-table__tr {
                    border-bottom: 1px dashed #e1e6f0;
                    display: flex;
                    justify-content: space-between;
                    font-size:14px;
                    color:#333333;
                    &:last-of-type {
                      border:0 
                    }
                    &>div {
                      margin: 13px 0px 13px 0px;
                      // padding-right: 20px;
                      width: 25%;
                      display: flex;
                      // justify-content: center;
                      span {
                        margin-right: 10px;
                        color: #666;
                      }
                    }
                    &>div.financing-status_blue {
                      span::before {
                        content: "";
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        background: url('../../../../../static/img/chain/chain_circle_m_b.png') no-repeat center;
                        vertical-align: middle;
                        margin-right: 8px;
                        background-size: cover;
                      }
                    }
                    &>div.financing-status_orange {
                      span::before {
                        content: "";
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        background: url('../../../../../static/img/chain/chain_circle_m_y.png') no-repeat center;
                        vertical-align: middle;
                        margin-right: 8px;
                        background-size: cover;
                      }
                    }
                    &>div.financing-table__link {
                      span {
                        margin-right: 0;
                        font-weight: bolder;
                        .financing-link_orange;
                      }
                    }
                    &>.financing-table-content {
                      // width: 920px;
                      // margin: 0 auto;
                      margin: 0 0;
                      margin-left: 25%;
                      width: 100%;
                      display: block;
                      line-height: 20px;
                      &>div {
                        display: flex;
                        &>div {
                          width: 33.3%;
                          display: flex;
                          // padding: 0 px;
                          // justify-content: space-between;
                          flex-wrap: wrap;      
                          &>span {
                            margin-right: 10px;
                          }
                          span {
                            padding: 8px 0;
                            color: #333;
                            &:first-of-type {
                              color: #666;
                            }
                          }
                          .default-content {
                            display: inline-block;
                            width: 88px;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
              .financing-diamonds {
                .financing-diamonds__desc {
                  position: relative;                 
                  .financing-diamond-group {
                    &>span {
                      margin: 10px 0 0 7px;
                      border: 1px dashed #666;
                      width: 78%;
                      position: absolute
                    }
                    width: 80%;
                    height: 70px;
                    display: flex;
                    justify-content: space-between;
                    padding-left: 30px;
                    &>div {
                      position: relative;
                      span {
                        font-size: 14px;
                        position: absolute;
                        display: block;
                        width: 100px;
                        left: 50;
                        text-align: center;
                        transform: translateX(-35%);
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
}
</style>
