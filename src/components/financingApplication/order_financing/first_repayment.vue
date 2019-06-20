<template>
  <div class="order_usage">
    <div class="title">
      <h3>第一还款来源（自偿性）</h3>
    </div>
    <div class="show_list">
      <div v-for="(item, index) in selList" v-if="selList.length !== 0" :key='index' class="sel_item">
        <div class="get_sum">
          <div>
            <img :src="tq" alt="">
            <span class="one">金额：</span>
            <span class="two">{{selSum(item)}}元</span>
          </div>
        </div>
        <div class="contract_title">产生来源</div>
        <div class="sel_line">
          <div>
            <span>销售项目：</span>
            <span>{{item.name}}</span>
          </div>
          <div>
            <span>交易企业：</span>
            <span>{{item.partner}}</span>
          </div>
          <div>
            <span>历史逾期率：</span>
            <span>{{item.create_time.substring(0, item.create_time.indexOf('T'))}}</span>
          </div>
        </div>
        <ul class="order_info" v-if="item.order">
          <li v-for="(order, index1) in item.order" :key='index1'>
            <div class="order_data">
              <div>
                <span>订单名称：</span>
                <span>{{order.name}}</span>
              </div>
              <div>
                <span>交货日期：</span>
                <span>{{order.date_created.substring(0, item.create_time.indexOf('T'))}}</span>
              </div>
              <div>
                <span>结算日期：</span>
                <span>{{order.date_created.substring(0, item.create_time.indexOf('T'))}}</span>
              </div>
              <div>
                <span>订单金额：</span>
                <span>{{order.value}}</span>
                <span>元</span>
              </div>
            </div>
            <div style="padding:0 20px;">
              <div class="deposit_line">
                <div class="deposit_title">
                  <img src="../../../../static/img/chain/chain_circle_m_b.png" alt="">
                  <span>订金信息</span>
                  <p v-if="order.deposit">订金总额：<a href="javascript:void(0)" v-if="order.deposit">{{getDepositSum(order.deposit)}}元</a></p>
                </div>
              </div>
              <div class="deposit_list" v-if='order.deposit'>
                <div>订金支付方式：</div>
                <div class="deposit_detail">
                  <div v-for="(deposit, index2) in order.deposit" :key='index2'>
                    <div>
                      <span>商业承兑汇票</span>
                    </div>
                    <div>
                      <span>票据金额：</span>
                      <span>50.00万元</span>
                    </div>
                    <div>
                      <span>汇票到期日：</span>
                      <span>{{deposit.date_created}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="is_null" v-if="!order.deposit">无相关订金信息</div>
            <div class="level_line">
              <div class="level_title">
                <span>等级</span>
                <span>1级</span>
              </div>
            </div>
            <div class="level_list">
              <ul class="level_loop">
                <li v-for="(le, indexLe) in levels" :key='indexLe'>
                  <div></div>
                  <img :src="le.img" alt="">
                  <span>{{le.title}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="btn_list">
      <div @click="handleNext">下一步</div>
    </div>
  </div>
</template>
<script>
const daimond = require('../../../../static/img/eninfo/zuan.jpg')
export default {
  name: 'orderFirstRepayment',
  data () {
    return {
      tq: require('../../../../static/img/tickets/tq_01.png'),
      selList: [
        {
          name: '1213',
          partner: '好吧',
          create_time: '2018-11-26',
          order: [
            {
              name: '666',
              date_created: '2018-11-26',
              value: 1000,
              deposit: [
                {value: 100}
              ]
            }
          ]
        }
      ],
      levels: [
        {title: '订单（销售）', img: daimond},
        {title: '采购验收', img: daimond},
        {title: '采购付款', img: daimond},
        {title: '出库（销售）', img: daimond},
        {title: '运单（销售）', img: daimond},
        {title: '验收（销售）', img: daimond},
        {title: '发票（销售）', img: daimond},
        {title: '支付（销售）', img: daimond},
        {title: '延期支付（销售）', img: daimond}
      ]
    }
  },
  mounted () {
    const that = this
    let idList = []
    this.$parent.steps[0].emitData.list.forEach(val => {
      idList.push(val.id)
    })
    // this.$ajax.get(`/api/order_application/get_first`).then(res => {
    //   console.log(res)
    //   if (res.data.code === 1) {
    //     that.selList = res.data.c
    //     // that.selList = res.data.c
    //   }
    // })
  },
  methods: {
    // 循环计算总和
    getDepositSum (arr) {
      let s = 0
      arr.forEach(val => {
        s += val.value
      })
      return s.toFixed(2)
    },
    // 计算书券总额
    selSum (el) {
      let s = 0
      if (el.order) {
        el.order.forEach(val => {
          s += val.value
        })
      }
      return s.toFixed(2)
    },
    // 点击进行下一步，通过emit传递父组件数据
    handleNext () {
      this.$emit('first', true)
    }
  },
}
</script>
<style lang="less" scoped>
.order_usage {
  background:#ffffff;
  border:1px solid #e1e6f0;
  border-radius:2px;
  width:100%;
  height:auto;
  padding: 0 53px 22px 21px;
  .title {
    height: 52px;
    border-bottom: 1px solid #e1e6f0;
    padding-top: 20px;
    h3 {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#333333;
      letter-spacing:0;
      text-align:left;
      font-weight: bold;
      border-left: 5px solid #eb6100;
      height: 24px;
      padding-left: 22px;
      line-height: 24px;
    }
  }
  .show_list {
    .get_sum {
      background:#ffffff;
      border:1px solid #e1e6f0;
      box-shadow:0 0 5px 0 #e1e6f0;
      width:auto;
      height:48px;
      text-align: center;
      max-width: 300px;
      border-top: none;
      div {
        display: flex;
        align-items: center;
        img {
          margin-left: 27px;
          margin-top: 6px;
          margin-right: 18px;
        }
        .one {
          font-family:PingFangSC-Regular;
          font-size:14px;
          color:#999999;
          letter-spacing:0;
          text-align:center;
        }
        .two {
          font-weight: bold;
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#666666;
          letter-spacing:0;
          text-align:center;
        }
      }
    }
    .sel_item {
      border:1px dashed #e1e6f0;
      box-shadow:0 0 10px 2px #e1e6f0;
      width:100%;
      height:auto;
      margin-bottom: 20px;
      .contract_title {
        line-height: 42px;
        padding: 0 27px;
        font-weight: bolder;
        border-bottom: 1px dashed #e1e6f0;
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
      }
      .sel_line {
        display: flex;
        padding: 0 20px;
        height: 41px;
        div {
          width: 20%;
          line-height: 41px;
          margin-right: 28px;
          span {
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:left;
          }
        }
        div:first-child, div:nth-child(2) {
            span:last-child {
            color: #eb6100;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      .order_title {
        background: #fafafa;
        line-height: 40px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        span:first-child {
          font-weight: bold;
        }
      }
      .order_info {
        padding-bottom: 12px;
        background:#ffffff;
        border:1px solid #e1e6f0;
        &>li {
          margin-bottom: 20px;
          list-style: none;
          .order_data {
            padding: 0 20px;
            line-height: 50px;
            background:#f7f7f7;
            display: flex;
            width:100%;
            height:50px;
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:left;
            div {
              // margin-right: 15px;
              width: 22%;
            }
          }
          .deposit_line {
            padding-left: 28px;
            .deposit_title {
              border-bottom:1px dashed #e1e6f0;
              height: 44px;
              line-height: 44px;
              img {
                width: 13px;
                height: 13px;
                margin-right: 8px;
                margin-top: 14px;
                float: left;
                margin-left: 20px;
              }
              span {
                float: left;
                font-family:PingFangSC-Semibold;
                font-size:12px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
                margin-right: 134px;
              }
              p {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
                a {
                  color: #e87626;
                  text-decoration: none;
                }
              }
            }
          }
          .deposit_list {
            display: flex;
            flex-direction: row;
            padding: 8px 0 12px 227px;
            border-bottom: 1px dashed #e1e6f0;
            div:first-child {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
            }
            .deposit_detail {
              flex: 1;
              div {
                display: flex;
                flex-direction: row;
                div {
                  padding-right: 113px;
                  padding-bottom: 4px;
                  span {
                    font-family:PingFangSC-Regular;
                    font-size:12px;
                    color:#333333;
                    letter-spacing:0;
                    text-align:left;
                  }
                }
              }
            }
          }
          .level_line {
            line-height: 40px;
            padding: 0 20px;
            font-size: 14px;
            .level_title {
              padding-left: 50px;
              border-bottom: 1px dashed #ccc;
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              padding-top: 8px;
              span:last-child {
                margin-left: 24px;
              }
            }            
          }
          .level_list {
            .level_loop {
              padding: 0 20px;
              display: flex;
              background: #fff;
              li {
                list-style: none;
                width: 100% / 9;
                height: 80px;
                position: relative;
                display: flex;
                flex-direction: column;
                div {
                  width: 100%;
                  border-bottom: 1px dashed #999;
                  height: 30px;
                }
                span {
                  height: 49px;
                  line-height: 59px;
                  // text-align: center;
                  padding: 0 10px;
                  font-size: 14px;
                }
                img {
                  position: absolute;
                  top: 20px;
                  left: 12px;
                  // width: 70%;
                }
              }
              li:first-child {
                div {
                  margin-left: 25px;
                }
              }
              li:last-child {
                div{
                  border: none;
                }
              }
            }
          }
          .is_null {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
    .is_null {
      height: 160px;
      line-height: 160px;
      text-align: center;
      color: #999;
    }
  }
  .btn_list {
    padding: 24px 0;
    div {
      width: 120px;
      border-radius: 3px;
      background: #eb6100;
      color: #fff;
      text-align: center;
      line-height: 42px;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>
