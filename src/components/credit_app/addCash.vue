<template>
  <div class="c_credit_operator_box">
    <!-- <appNav :father='{selIndex: 6}' type='1'></appNav> -->
    <div class="c_credit_operator_right">
      <div class="c_top_location"><location :location='location'></location></div>
      <div class="c_opera_bottom">
        <getTopStep :activeStep='1'></getTopStep>
        <div class="c_check_way">
          <div class="c_op_btn"><a @click="addCash">+ 添加贴现池</a></div>
          <div class="c_cash_box">
            <div class="c_cash_item" v-for="(item, index) in checkedData" :key="index">
              <div class="c_cash_item_title">
                <span class="c_ticket">融资票据：{{item.invoice_name}} 发票编号：{{item.invoice_code}}</span>
                <span class="c_sure">
                  <!-- <span>债权人确认：<i></i></span>
                  <span>债务人确认：<i :class="[item.verified ? 'active' : '']"></i></span>
                  <span>促保贷确权：<i :class="[item.fund_name ? 'active' : '']"></i></span> -->
                </span>
                <span class="c_delete"><a @click="jumpDetail">债权详情</a><img @click="handleDelete(item.id)" src="../../../static/img/debet/rubbish.png" alt=""></span>
              </div>
              <div class="c_cash_item_sec_line">
                <span>支付名称：{{item.payment_name}}</span>
                <span>支付类型：{{item.payment_type === '1' ? '现金' : item.payment_type === '2' ? '支票' : item.payment_type === '3' ? '银行承兑汇票' : item.payment_type === '4' ? '商业承兑汇票' : '信用证'}}</span>
                <span>支付金额：{{item.payment_value}}（元）</span>
                <span>支付票据账期：{{item.payment_date}}</span>
              </div>
              <div class="c_cash_item_thi_line">
                <span>交易合同：{{item.contract_name}}</span>
                <span>交易公司：{{item.partner_business_name}}</span>
              </div>
            </div>
          </div>
          <div class="c_opera_box">
            <!-- <a>返回</a> -->
            <a @click="sureCash">下一步</a>
          </div>
        </div>
      </div>
      <el-dialog title="贴现池" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <div class="c_cash_box">
          <div class="c_cash_item" v-for="(item, index) in selectData" :key="index">
            <div class="c_cash_item_title">
              <span class="c_ticket"><input :checked="item.sel" @change="item.sel = !item.sel" class="c_check_input" type="checkbox">融资票据：{{item.invoice_name}} 发票编号：{{item.invoice_code}}</span>
              <span class="c_sure">
                <!-- <span>债权人确认：<i></i></span>
                <span>债务人确认：<i :class="[item.verified ? 'active' : '']"></i></span>
                <span>促保贷确权：<i :class="[item.fund_name ? 'active' : '']"></i></span> -->
              </span>
              <span class="c_delete"><a @click="jumpDetail">债权详情</a></span>
            </div>
            <div class="c_cash_item_sec_line">
              <span>支付名称：{{item.payment_name}}</span>
              <span>支付类型：{{item.payment_type === '1' ? '现金' : item.payment_type === '2' ? '支票' : item.payment_type === '3' ? '银行承兑汇票' : item.payment_type === '4' ? '商业承兑汇票' : '信用证'}}</span>
              <span>支付金额：{{item.payment_value}}（元）</span>
              <span>支付票据账期：{{item.payment_date}}</span>
            </div>
            <div class="c_cash_item_thi_line">
              <span>交易合同：{{item.contract_name}}</span>
              <span>交易公司：{{item.partner_business_name}}</span>
            </div>
          </div>
          <div class="c_empty_accessory" v-if="selectData.length === 0">暂无数据</div>
        </div>
        <div class="c_opera_box">
          <!-- <a>返回</a> -->
          <a @click="sureSelect">确定</a>
        </div>
      </el-dialog>
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
      dialogVisible: false,
      checkedData: [],
      selectData: [],
      selectIdArr: []
    }
  },
  components: {
    AppNav, Location, getTopStep
  },
  beforeCreate () {
    if (this.$route.query.jumpFrom === 'detail') {
      this.location = [
        {
          title: '债权处置',
          url: '/creditDeal'
        }, 
        {
          title: '债权详情',
          url: '/creditDetail?id=' + this.$route.query.id
        }, 
        {
          title: '贴现'
        }
      ]
    } else if (this.$route.query.jumpFrom === 'alreadyJump') {
      this.location = [
        {
          title: '债权处置',
          url: '/creditDeal'
        }, 
        {
          title: '债权详情',
          url: '/creditDetail?id=' + JSON.parse(this.$route.query.id)[0]
        }, 
        {
          title: '贴现'
        }
      ]
    } else {
      this.location = [
        {
          title: '债权处置',
          url: '/creditDeal'
        }, 
        {
          title: '债权处置方式',
          url: '/creditOperator'
        }, 
        {
          title: '贴现'
        }
      ]
    }
  },
  methods: {
    addCash () {
      this.dialogVisible = true
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&exclude_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.selectData = res.data.data.can_manage.claim_list
          this.selectData.forEach(val => {
            val.sel = 0
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    sureSelect (item) {
      this.selectData.forEach(val => {
        if (val.sel) {
          this.selectIdArr.push(val.id)
        }
      })
      // // console.log(this.selectIdArr)
      // 获取已选中的item
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.dialogVisible = false
          this.checkedData = res.data.data.can_manage.claim_list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleDelete (id) {
      if (Number(id) === Number(this.$route.query.id)) {
        this.$message.error('此票据已选择为贴现票据，暂不能删除')
        return
      }
      this.selectIdArr.splice(this.selectIdArr.indexOf(id), 1)
      // console.log(this.selectIdArr)
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.dialogVisible = false
          this.checkedData = res.data.data.can_manage.claim_list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    jumpDetail () {
      this.$router.push({
        path: '/creditDetail',
        query: {
          id: this.$route.query.id,
          isJump: 1
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    sureCash () {
      if (this.checkedData.length < 1) {
        this.$message.error('请选择贴现票据')
        return
      }
      this.$router.push({
        path: '/cashFor',
        query: {
          selectId: JSON.stringify(this.selectIdArr)
        }
      })
    }
  },
  mounted () {
    // 从详情跳转过来的时候
    // if (this.$route.query.jumpFrom === 'detail') {
    //   // 把详情页的id添加到已选中的数组中 用id_list字段获取已选中，用exclude_list字段获取除选中之外的
    //   this.selectIdArr[0] = Number(this.$route.query.id)
    //   var strArr = JSON.stringify(this.selectIdArr)
    //   this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
    //     if (res.data.code === '1') {
    //       this.checkedData = res.data.data.can_manage.claim_list
    //     } else {
    //       this.$message.error(res.data.msg)
    //     }
    //   })
    // } else if (this.$route.query.jumpFrom == 'alreadyJump') { //已经处置完成返回查看时
    //   this.selectIdArr = JSON.parse(this.$route.query.id)
    //   var strArr = JSON.stringify(this.selectIdArr)
    //   this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
    //     if (res.data.code === '1') {
    //       this.checkedData = res.data.data.can_manage.claim_list
    //     } else {
    //       this.$message.error(res.data.msg)
    //     }
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
.c_credit_operator_box{
  width: 100%;
  height: 100%;
  display: flex;
  //padding-top: 70px;
  .c_credit_operator_right{
    background: #f4f7f8;
    height: 100%;
    font-size: 14px;
    // width: 100%;
    .c_top_location{
      background: #fff;
      border-bottom: 1px solid #ccc;
    }
    .c_empty_accessory{
      height: 48px;
      font-size: 14px;
      line-height: 48px;
      color: #999;
      text-align: center;
    }
    .c_opera_bottom{
      padding: 20px 30px;
      .c_check_way{
        width: 100%;
        .c_op_btn{
          margin: 30px auto;
          // text-align: center;
          a{
            display: inline-block;
            width: 150px;
            padding: 10px 0;
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
    .c_opera_box{
      text-align: center;
      margin: 30px 0;
      a{
        display: inline-block;
        width: 110px;
        padding: 10px 0;
        background: #eb6100;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border: 1px solid #eb6100;
        // &:nth-of-type(1){
        //   border: 1px solid #eb6100;
        //   background: #fff;
        //   color: #eb6100;
        //   margin-right: 100px;
        // }
      }
    }
    .c_cash_box{
      min-height: 160px;
      .c_cash_item{
        margin: 20px 0;
        background: #fff;
        border: 1px solid #e1e6f0;
        .c_cash_item_title{
          background: rgba(204,204,204,0.20);
          line-height: 48px;
          height: 48px;
          padding: 0 50px;
          span{
            display: inline-block;
          }
          .c_ticket{
            width: 45%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .c_check_input{
              width: 18px;
              height: 18px;
              vertical-align: middle;
              margin-right: 10px;
            }
          }
          .c_sure{
            width: 45%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              margin: 0 5px;
              i{
                width: 50px;
                vertical-align: middle;
                height: 22px;
                display: inline-block;
                background: url('../../../static/img/debet/noconfirm.png') no-repeat;
                background-size: 50px 22px;
                &.active{
                  background: url('../../../static/img/debet/confirm2.png') no-repeat;
                  background-size: 50px 22px;
                }
              }
              &:nth-of-type(1) i{
                background: url('../../../static/img/debet/confirm1.png') #fff no-repeat;
                background-size: 50px 22px;
              }
            }
          }
          .c_delete{
            width: 9%;
            text-align: right;
            overflow: hidden;
            a{
              color: #eb6100;
              font-size: 14px;
              margin-right: 15px;
              cursor: pointer;
              text-decoration: underline;
            }
            img{
              cursor: pointer;
              width: 16px;
              height: 16px;
              vertical-align: middle;
            }
          }
        }
        .c_cash_item_sec_line{
          display: flex;
          margin: 0 50px;
          border-bottom: 1px dashed #ccc;
          line-height: 48px;
          span{
            display: inline-block;
            width: 25%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 5px;
          }
        }
        .c_cash_item_thi_line{
          line-height: 48px;
          margin: 0 50px;
          display: flex;
          span{
            display: inline-block;
            width: 33%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 5px;
          }
        }
      }
    }
  }
}
</style>
