<template>
  <div class="order_big_details">
    <div class="order_smail_details">
      <div class="order_details">
        <div class="order_details_header">
          <h4>支付信息</h4>
        </div>
        <div class="order_item">
          <div class="role-info__detail">
            <div class="role-info__item">
              <div class="role-info__item-row">
                <label for>订单信息：</label>
                <span class="role-content">{{dataiList.orderNo || '暂无数据'}}</span>
              </div>
              <div class="role-info__item-row">
                <label for>订单金额：</label>
                <span class="role-content">{{dataiList.orderPrice + '元' || '暂无数据'}}</span>
              </div>
            </div>
            <div class="role-info__item">
              <div class="role-info__item-row">
                <label for>支付时间</label>
                <span class="role-content">{{dataiList.payDate || '暂无数据'}}</span>
              </div>
              <div class="role-info__item-row">
                <label for>状态：</label>
                <span class="role-content">{{dataiList.payStatus ? states[dataiList.payStatus] : '暂无数据'}}</span>
              </div>
            </div>
            <div class="role-info__item">
              <div class="role-info__item-row">
                <label for>支付账号：</label>
                <span class="role-content">{{dataiList.payAccount || '暂无数据'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="content_none" v-if="orderList.length === 0">暂无数据</div> -->
      <div class="order_details">
        <div class="order_details_header">
          <h4>产品信息</h4>
        </div>
        <div class="order_item">
          <div class="order_table">
            <div class="order_tr">
              <div class="order_td" v-for="(title,index1) in paymentTitle" :key="index1">{{title}}</div>
            </div>
            <div class="order_tr" v-for="(good,index) in goodList" :key="index" v-if='goodList.length > 0'>
              <div class="order_td">{{good.name || '暂无数据'}}</div>
              <div class="order_td">{{good.number || '暂无数据'}}</div>
              <div class="order_td">{{good.price || '暂无数据'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_none" v-if="dataiList.length === 0">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order_big_details",
  props: {},
  data() {
    return {
      orderTitle: [
        {
          code: "订单编号",
          creatime: "创建日期",
          paytime: "支付时间",
          status: "订单状态",
          type: "类型"
        }
      ],
      states: ['', '未支付', '支付成功', '支付失败'],
      status: ['', '充值', '提现', '消费'],
      paymentTitle: ["商品名称", "数量", "金额"],
      ProductTitle: ["产品", "数量", "金额", "有效期", "备注说明"],
      token: "",
      orderNo: "",
      orderList: {orderNo: ''},
      dataiList: [],
      goodList: []
    }
  },
  mounted() {
    this.$ajax.get(`/api/sp/order/one/?orderNo=${this.$route.query.id}` + this.orderNo).then(res => {
      if (res.data.code === 200) {
        console.log(res)
        this.dataiList = res.data.data.order.detail
        this.goodList = res.data.data.order.detail.goods
        this.$set(res.data.data.order, 0, this.orderList)
        this.dataiList.orderNo = res.data.data.order.orderNo
        this.dataiList.payStatus = res.data.data.order.payStatus
        // console.log(that.dataiList)
      }
    })
  }
}
</script>
<style lang='less' scoped>
.order_big_details {
  width: 100%;
  margin: 0 auto;
  background: #f5f7f8;
  margin-bottom: 15px;
  .order_smail_details {
    margin-top: 1%;
    width: 98%;
    margin: 0 auto;
    .order_details {
      width: 100%;
      background: #fff;
      margin-top: 15px;
      padding-bottom: 10px;
      .order_details_header {
        width: 100%;
        height: 53px;
        border-bottom: solid 1px #e8e8e8;
        h4 {
          margin-left: 15px;
          font-size: 16px;
          line-height: 53px;
          display: inline;
          color: #333333;
        }
      }
      .order_item {
        width: 100%;
        width: 96%;
        margin: 30px auto;
        .order_table {
          width: 100%;
          .order_tr {
            width: 100%;
            height: 54px;
            border-bottom: solid 1px #e8e8e8;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            &:first-child {
              background: #fafafa;
              td {
                color: #666666;
                font-size: 14px;
              }
            }
            .order_td {
              width: 20%;
              text-align: center;
              line-height: 53px;
              color: #666666;
              font-size: 14px;
              &:last-child {
                cursor: pointer;
              }
            }
          }
        }
        .role-info__detail {
          display: flex;
          justify-content: center;
          padding: 0 35px;
          font-size: 14px;
          color: #666;
          .role-info__item {
            flex: 1;
            width: 33.3%;
            .role-info__item-row {
              margin-bottom: 10px;
              padding-left: 30px;
              display: flex;
              align-items: center;
              min-height: 40px;
              line-height: 40px;
              position: relative;
              &.role-company {
                display: flex;
                .role-company-group {
                  width: calc(100% - 90px);
                  p {
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                    // white-space: nowrap;
                    word-break: break-all;
                  }
                }
              }
              .role-company-group {
                p {
                  margin-bottom: 5px;
                }
              }
              label {
                width: 90px;
                text-align: left;
                display: inline-block;
              }
              .role-content {
                width: calc(100% - 90px);
                word-break: break-all;
              }
            }
          }
        }
      }
    }
  }
}
</style>