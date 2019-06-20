<template>
  <div class="c_credit_operator_box">
    <!-- <appNav :father='{selIndex: 6}' type='1'></appNav> -->
    <div class="c_credit_operator_right">
      <div class="c_top_location"><location :location='location'></location></div>
      <div class="c_opera_bottom">
        <getTopStep></getTopStep>
        <div class="c_check_way">
          <div class="c_op_btn"><a @click="addCash">贴现</a></div>
          <div class="c_op_btn"><a @click="changePay">转移支付</a></div>
          <!-- <div class="c_op_btn"><a @click="assignment">转让</a></div> -->
          <!-- <div class="c_op_btn"><a @click="giveBack">退款/退票/退货</a></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Location from '../location/location'
import getTopStep from './creditTop'
// import AppNav from '../financing/financingManege'
export default {
  name: 'debtCheck',
  data () { 
    return {
      step: {
        selIndex: 6
      },
      location: [
        {
          title: '债权处置',
          url: '/creditDeal'
        }, {
          title: '债权处置操作'
        }
      ]
    }
  },
  components: {
    // AppNav, 
    Location, getTopStep
  },
  beforeCreate () {
    
  },
  methods: {
    addCash () {
      this.$router.push({
        path: '/addCash',
        query: {
          jumpFrom: this.$route.query.id ? 'detail' : null,
          id: this.$route.query.id
        }
      })
    },
    changePay () {
      this.$router.push({
        path: '/changePay',
        query: {
          jumpFrom: this.$route.query.id ? 'detail' : null,
          id: this.$route.query.id
        }
      })
    },
    giveBack () {
      this.$router.push({
        path: '/sureOperation',
        query: {
          type: 'cancelTicket'
        }
      })
    },
    assignment () {

    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.c_credit_operator_box{
  width: 100%;
  height: 100%;
  display: flex;
  .c_credit_operator_right{
    background: #f4f7f8;
    height: 100%;
    font-size: 14px;
    width: 100%;
    .c_top_location{
      background: #fff;
      border-bottom: 1px solid #ccc;
    }
    .c_opera_bottom{
      padding: 20px 30px;
      .c_check_way{
        width: 100%;
        margin-top: 100px;
        .c_op_btn{
          margin: 30px auto;
          text-align: center;
          a{
            display: inline-block;
            width: 240px;
            padding: 11px 0;
            background: #eb6100;
            border-radius: 4px;
            cursor: pointer;
            color: #fff;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
