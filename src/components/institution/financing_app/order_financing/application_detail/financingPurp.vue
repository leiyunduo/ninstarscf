<template>
  <div class="financing-prup">
    <div class="financing-prup__box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="financing-prup__box__wrap">
        <div class="top-nav">
          <location :location="location"></location>
        </div>
        <div class="financing-prup__box__inner">
          <div class="financing-item">
            <div class="financing-item__title">
              <span>融资用途</span>
            </div>
            <h3>累计订单总额: {{handleSum()}}元</h3>
            <div class="financing-item__body" v-for="(item, index) in showList" :key='index'>
              <p class="financing-item-desc">
                采购项目：<span @click="handleChain(item)" style="cursor: pointer;">{{item.name}}</span>
                交易企业：<span style="cursor: pointer;" @click="handleBusiness(item, 1)">{{item.partner_company_name}}</span>
              </p>
              <p class="financing-item-desc">订单信息</p>
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
                        <span>订金总额（元）：</span>
                        <span class="financing-orange">{{handleDeposit(order)}}</span>
                      </div>
                      <div></div>
                      <div></div>
                      <!-- <div class="financing-table__link">
                        <span>电子原件或扫描件</span>
                      </div> -->
                    </div>
                    <div class="financing-table__tr" v-if='order,deposit' v-for="(deposit, index2) in order.deposit" :key='index2'>
                      <div class="financing-table-content-line">
                        <div></div>
                        <div>
                          <span>订金支付方式：</span>
                          <span>{{deposit.type}}</span>
                        </div>
                        <div>
                          <span>票据金额（元）：</span>
                          <span>{{deposit.amount}}</span>
                        </div>
                        <div>
                          <span>汇票到期日：</span>
                          <span>{{deposit.payment_date || '未填写'}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  name: 'chainContractView',
  data () {
    return {
      showList: [],
      step: {selIndex: 1}
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
        url: '/credit_app'
      },
      {
        title: '融资用途'
      }
    ]
  },
  created () {
    this.$ajax.get(`/api/financing/loan_process/${this.$route.query.financing_id}/`).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.showList = res.data.financing_application.application_data.chain_info
      }
    })
  },
  methods: {
    handleSum () {
      let sum = 0
      this.showList.forEach((val, index) => {
        if (val.order) {
          val.order.forEach(el => {
            sum += Number(el.amount)
          })
        }
      })
      return sum.toFixed(2)
    },
    // 订单订金总额
    handleDeposit (order) {
      let sum = 0
      order.deposit.forEach(val => {
        sum += Number(val.amount)
      })
      return sum.toFixed(2)
    },
    // 跳转链式记账
    handleChain (el) {
      console.log(el)
      let query = {}
      query.id = el.chain_id
      let str = ''
      el.id_list.forEach(val => {
        str += `${val},`
      })
      query.id_list = str.substring(0, str.length - 1)
      query.financing_id = this.$route.query.financing_id
      // this.$router.push({path, query})
      window.open(`#/credit_app/chain_info?id=${query.id}&id_list=${query.id_list}&financing_id=${query.financing_id}`)
    },
    handleBusiness (item) {
      window.open('#/enterpriseBlog?bid=' + item.partner_company)
    }
  }
}
</script>

<style lang='less'>
.financing-link_orange {
  color: #eb6100;
  text-decoration: underline;
}
.financing-link_blue {
  color: #0c8dff;
  text-decoration: underline;
}
.financing-orange {
  color: #eb6100;
}
.financing-prup {
  height: 100%;
  .financing-prup__box {
    height: 100%;
    //padding-top: 70px;
    display: flex;
    .financing-prup__box__wrap {
      // width: 100%;
      min-height: 100%;
      background: #f4f8f9;
      // .top-nav {
      //   height: 60px;
      //   background: #ffffff;
      //   box-shadow: 2px 0 4px #ddd;
      // }
      .financing-prup__box__inner {
        background: #ffffff;
        margin: 21px 71px 30px 19px;
        overflow: hidden;
        .financing-item {
          padding-bottom: 20px;
          .financing-item__title {
            margin: 10px 40px 0 40px;
            height: 60px;
            border-bottom: 1px solid #e1e6f0;
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
          h3 {
            font-size:14px;
            color:#333333;
            padding-left: 50px;
            line-height: 55px;
            font-weight: bolder;
          }
          .financing-item__body {
            margin: 0 40px 20px 40px;
            border: 1px dashed #e1e6f0;
            border-bottom: 0;
            box-shadow:0 0 10px 2px #e1e6f0;
            border-radius: 4px;
            p {
              margin: 0;
            }
            .financing-item-desc {
              font-size: 14px;
              font-weight: bold;
              color: #666;
              display: block;
              margin: 0;
              line-height: 47px;
              padding-left: 30px;
              border-bottom: 1px dashed #e1e6f0;
              span {
                .financing-link_orange;
                margin-right: 40px;
              }
              &:last-of-type {
                border-bottom: 0;
                color: #999;
              }
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
                  margin: 13px 0px 13px 10px;
                  padding-right: 20px;
                  width: 20%;
                  display: flex;
                  justify-content: center;
                  border-right: 1px dashed #e1e6f0;
                  &:last-of-type {
                    border: 0;
                    .financing-link_orange;
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
                      border: 0
                    }
                    &>div {
                      margin: 13px 0px 13px 10px;
                      padding-right: 20px;
                      width: 20%;
                      display: flex;
                      justify-content: center;
                      span {
                        // margin-right: 30px;
                        color: #666;
                      }
                    }
                    &>div.financing-status_blue {
                      span::before {
                        content: "";
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        background: url('../../../../../../static/img/chain/chain_circle_m_b.png') no-repeat center;
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
                        background: url('../../../../../../static/img/chain/chain_circle_m_y.png') no-repeat center;
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
                    &>div.financing-table-content-line {
                        display: flex;
                        width: 100%;
                        justify-content: flex-start;
                        margin: 0;
                        &>div {
                          width: 25%;
                          display: flex;
                          // padding: 0 60px;
                          flex-wrap: wrap;
                          // text-align: center;
                          justify-content: center;
                          padding-right: 20px;
                          &>span {
                            margin-right: 0;
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
                    &>.financing-table-content {
                      width: 920px;
                      margin: 0;
                      margin-left: 440px;
                      display: block;
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
