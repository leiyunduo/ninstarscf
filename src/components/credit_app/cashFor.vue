<template>
  <div class="c_credit_operator_box">
    <!-- <appNav :father='{selIndex: 6}' type='1'></appNav> -->
    <div class="c_credit_operator_right">
      <div class="c_top_location"><location :location='location'></location></div>
      <div class="c_opera_bottom">
        <getTopStep :activeStep='2'></getTopStep>
        <div class="c_check_way">
          <h3 class="c_cash_title">贴现用途说明</h3>
          <div class="c_op_btn"><a @click="addCash">+ 添加贴现用途</a></div>
          <div class="c_cash_box">
            <div class="c_cash_item" v-for="(item, index) in checkedData" :key="index">
              <template v-if="item.type === '1'">
                <div class="c_cash_item_title">
                  <span class="c_ticket">
                    <span>合同：{{item.receivable_contract[0].name}}</span>
                    <span>编号：{{item.receivable_contract[0].number}}</span>
                    <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                  </span>
                  <span class="c_sure">
                    <span><i></i>{{item.ticket_dict.receivable.ninstar_bank_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.receivable.ninstar_business_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.receivable.ninstar_digital_ticket.number}}张</span>
                  </span>
                  <span class="c_delete" @click="handleDelete(item.id)"><img src="../../../static/img/debet/rubbish.png" alt=""></span>
                </div>
                <div class="c_cash_item_sec_line">
                  <span>资金缺口</span>
                  <span>应付款</span>
                  <span>已付款</span>
                  <span>订金</span>
                </div>
                <div class="c_cash_item_thi_line">
                  <span>{{toThousands(item.payable_contract.funding_gap)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.contract_value)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.paid)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.deposit)}}（元）</span>
                </div>
              </template>
              <template v-if="item.type === '2'">
                <div class="c_cash_item_title">
                  <span class="c_ticket">
                    <span>合同：{{item.payable_contract.name}}</span>
                    <span>编号：{{item.payable_contract.number}}</span>
                    <span>交易公司：{{item.payable_contract.partner_business}}</span>
                  </span>
                  <span class="c_sure">
                    <span><i></i>{{item.ticket_dict.payable.ninstar_bank_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.payable.ninstar_business_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.payable.ninstar_digital_ticket.number}}张</span>
                  </span>
                  <span class="c_delete" @click="handleDelete(item.id)"><img src="../../../static/img/debet/rubbish.png" alt=""></span>
                </div>
                <div class="c_cash_item_sec_line">
                  <span>资金缺口</span>
                  <span>应付款</span>
                  <span>已付款</span>
                  <span>订金</span>
                </div>
                <div class="c_cash_item_thi_line">
                  <span>{{toThousands(item.payable_contract.funding_gap)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.contract_value)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.paid)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.deposit)}}（元）</span>
                </div>
              </template>
            </div>
          </div>
          <div class="c_opera_box">
            <!-- <a>返回</a> -->
            <a @click="sureCashFor">下一步</a>
          </div>
        </div>
      </div>
      <el-dialog title="贴现用途" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <div class="c_cash_box">
          <div class="c_cash_item" v-for="(item, index) in selectData" :key="index">
            <template v-if="item.type === '1'">
              <div class="c_cash_item_title">
                <span class="c_ticket">
                  <span><input class="c_check_input" :checked="item.sel" @change="item.sel = !item.sel" type="checkbox">合同：{{item.receivable_contract[0].name}}</span>
                  <span>编号：{{item.receivable_contract[0].number}}</span>
                  <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                </span>
                <span class="c_sure">
                  <span><i></i>{{item.ticket_dict.receivable.ninstar_bank_ticket.number}}张</span>
                  <span><i></i>{{item.ticket_dict.receivable.ninstar_business_ticket.number}}张</span>
                  <span><i></i>{{item.ticket_dict.receivable.ninstar_digital_ticket.number}}张</span>
                </span>
                <!-- <span class="c_delete"><img src="../../../static/img/debet/rubbish.png" alt=""></span> -->
              </div>
              <div class="c_cash_item_sec_line">
                <span>资金缺口</span>
                <span>应付款</span>
                <span>已付款</span>
                <span>订金</span>
              </div>
              <div class="c_cash_item_thi_line">
                <span>{{toThousands(item.payable_contract.funding_gap)}}（元）</span>
                <span>{{toThousands(item.payable_contract.contract_value)}}（元）</span>
                <span>{{toThousands(item.payable_contract.paid)}}（元）</span>
                <span>{{toThousands(item.payable_contract.deposit)}}（元）</span>
              </div>
            </template>
            <template v-if="item.type === '2'">
              <div class="c_cash_item_title">
                <span class="c_ticket">
                  <span><input class="c_check_input" :checked="item.sel" @change="item.sel = !item.sel" type="checkbox">合同：{{item.payable_contract.name}}</span>
                  <span>编号：{{item.payable_contract.number}}</span>
                  <span>交易公司：{{item.payable_contract.partner_business}}</span>
                </span>
                <span class="c_sure">
                  <span><i></i>{{item.ticket_dict.payable.ninstar_bank_ticket.number}}张</span>
                  <span><i></i>{{item.ticket_dict.payable.ninstar_digital_ticket.number}}张</span>
                  <span><i></i>{{item.ticket_dict.payable.ninstar_business_ticket.number}}张</span>
                </span>
                <!-- <span class="c_delete"><img src="../../../static/img/debet/rubbish.png" alt=""></span> -->
              </div>
              <div class="c_cash_item_sec_line">
                <span>资金缺口</span>
                <span>应付款</span>
                <span>已付款</span>
                <span>订金</span>
              </div>
              <div class="c_cash_item_thi_line">
                <span>{{toThousands(item.payable_contract.funding_gap)}}（元）</span>
                <span>{{toThousands(item.payable_contract.contract_value)}}（元）</span>
                <span>{{toThousands(item.payable_contract.paid)}}（元）</span>
                <span>{{toThousands(item.payable_contract.deposit)}}（元）</span>
              </div>
            </template>
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
      location: [
        {
          title: '债权处置',
          url: '/creditDeal'
        },
        {
          title: '债权处置方式',
          url: '/addCash?jumpFrom=alreadyJump&id=' + this.$route.query.selectId
        },
        {
          title: '贴现'
        }
      ],
      dialogVisible: false,
      checkedData: [{
        payable_contract: {},
        ticket_dict: {
          payable: {
            ninstar_bank_ticket: {number: 0},
            ninstar_business_ticket: {number: 0},
            ninstar_digital_ticket: {number: 0}
          }
        }
      }],
      selectData: [{
        payable_contract: {
          number: '',
          name: ''
        },
        ticket_dict: {
          payable: {
            ninstar_bank_ticket: {number: 0},
            ninstar_business_ticket: {number: 0},
            ninstar_digital_ticket: {number: 0}
          }
        }
      }],
      // 选中的item的id数组
      selectIdArr: []
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
      this.dialogVisible = true
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/discount_chain/?token=' + this.$token() + '&exclude_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.selectData = res.data.data
          this.selectData.forEach(val => {
            val.sel = 0
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    sureSelect () {
      this.selectData.forEach(val => {
        if (val.sel) {
          this.selectIdArr.push(val.id)
        }
      })
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/discount_chain/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.dialogVisible = false
          this.checkedData = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleDelete (id) {
      this.selectIdArr.splice(this.selectIdArr.indexOf(id), 1)
      // console.log(this.selectIdArr)
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/discount_chain/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.dialogVisible = false
          this.checkedData = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    sureCashFor () {
      this.$router.push({
        path: '/cashPublish',
        query: {
          selectForId: JSON.stringify(this.selectIdArr), //选中的链条id
          selectCashId: this.$route.query.selectId //选中的贴现发票id
        }
      })
    }
  },
  mounted () {
    // // console.log(this.$route.query.selectId)
    var strArr = JSON.stringify(this.selectIdArr)
    this.$ajax.get('/api/claims_debt/claims/discount_chain/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
      if (res.data.code === '1') {
        this.checkedData = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }
    })
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
        background: #fff;
        padding: 20px;
        margin: 50px 0;
        box-shadow:0 2px 5px 4px rgba(231,231,231,0.50);
        .c_cash_title{
          border-left: 4px solid #eb6100;
          padding-left: 10px;
          font-weight: bold;
          color: #333;
        }
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
            width: 60%;
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
            width: 30%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
            span{
              margin: 0 10px;
              i{
                width: 18px;
                vertical-align: middle;
                height: 25px;
                display: inline-block;
              }
              &:nth-of-type(1) i{
                background: url('../../../static/img/tickets/ht01.png') #fff no-repeat;
                background-size: 18px 25px;
              }
              &:nth-of-type(2) i{
                background: url('../../../static/img/tickets/ht001.png') #fff no-repeat;
                background-size: 18px 25px;
              }
              &:nth-of-type(3) i{
                background: url('../../../static/img/tickets/bt01.png') #fff no-repeat;
                background-size: 18px 25px;
              }
            }
          }
          .c_delete{
            width: 9%;
            text-align: right;
            overflow: hidden;
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
