<template>
  <div id="acceptanceCreate">
    <!-- <appNav :father='step'></appNav> -->
    <div class="outbound">
      <location :location='location'></location>
      <div class="outbound_list">
        <div class="list">
          <acceptance-edit :create='create' :cid="contract_id" :chainType="chain_type" :isOrigin="isOrigin" :chainId="chain_id" :orderId="order_id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
// 创建
import acceptanceEdit from './acceptanceEdit'
export default {
  name: 'acceptanceCreate',
  data () {
    return {
      step: {selIndex: 1},
      create: 1
    }
  },
  components: {
    Location, 
    // AppNav, 
    acceptanceEdit
  },
  beforeCreate () {
    var that = this
    that.chain_id = that.$route.query.chain_id
    that.chain_type = that.$route.query.chain_type
    that.contract_id = that.$route.query.contract_id
    that.order_id = that.$route.query.order_id
    that.isOrigin = true
    let _url = (this.chain_type === `1`) ? '/chain_app/receive_chain?id='+this.chain_id : '/chain_app/payment_chain?id='+this.chain_id
    this.location = [
      {
        title: '链式记账',
        url: _url
      },
      {
        title: '验收入库单'
      }
    ]
  }
}
</script>

<style lang="less" scoped>
#acceptanceCreate {
  width: 100%;
  display: flex;
  height: 100%;
  //padding-top: 70px;
  min-height: 100%;
  .outbound {
    background: #f5f7f8;
    padding-bottom: 100px;
    height: 100%;
    width: 100%;
    min-height: 100%;
    overflow-y: auto;
    .location {
      background: #fff;
      border-radius:2px;
      height:52px;
    }
    .outbound_list {
      padding: 0 50px;
      .order_nav {
        border-bottom: 1px solid #bfbfbf;
        display: flex;
        align-items: flex-end;
        width: 100%;
        margin: 20px 0;
        border-radius:2px;
        padding: 0 70px 0 21px;
        ul,li{
          display: inline-block;
        }
        .c_tab_item{
          display: inline-block;
          border-bottom: 4px solid transparent;
          cursor: pointer;
          padding: 10px 34px;
          &.active{
            border-bottom: 4px solid #eb6100;
            color: #eb6100;
          }
        }
        .inst {
          // background: rgba(204, 204, 204, 1);
          width: 80px;
          height: 32px;
          line-height: 4px;
          margin-left: 6px;
          border: 1px solid #bfbfbf;
          transition: all .16s ease-in;
          border-bottom: none;
          border-radius: 0;
          background: none;
          outline: none;
        }
        .inst:hover {
          color: #fff;
          border-color: #eb6100;
          background: #eb6100;
        }
      }
      .top {
        background:#ffffff;
        border:1px solid #e1e6f0;
        border-radius:2px;
        width:100%;
        height:120px;
        margin: 20px 0;
        padding: 0 32px;
        .top_top {
          height: 55px;
          border-bottom: 1px solid #cccccc;
          h3 {
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:center;
            border-left: 5px solid #eb6100;
            padding: 0 20px 0 4px;
            font-weight: bold;
            p {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#999999;
              letter-spacing:0;
              text-align:center;
              span {
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#eb6100;
                letter-spacing:0;
                text-align:center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
