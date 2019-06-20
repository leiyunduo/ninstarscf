<template>
  <div class="c_credit_operator_box">
    <!-- <appNav :father='{selIndex: 7}' type='1'></appNav> -->
    <div class="c_credit_operator_right">
      <div class="c_top_location"><location :location='location'></location></div>
      <div class="c_opera_bottom">
        <div class="topStep">
          <div class="mid_line">
            <div class="mid_icon">
              <img src="../../../static/img/debet/icon1.png" alt="">
              <span class="mid_icon_budge">1</span>
              <span>债务处置方式</span>
            </div>
            <!-- <div class="mid_icon">
              <img src="../../../static/img/debet/icon2.png" alt="">
              <span class="mid_icon_budge" :style="budge">2</span>
              <span>债务处置原因</span>
            </div> -->
            <div class="mid_icon">
              <img src="../../../static/img/debet/icon2.png" alt="">
              <span class="mid_icon_budge" :style="budge">2</span>
              <span>债务处置发布</span>
            </div>
          </div>
        </div>
        <div class="c_check_way">
          <div class="c_op_btn"><a @click="addCash">+ 添加{{wayName}}</a></div>
          <div class="c_cash_box">
            <div class="c_cash_item" v-for="(item, index) in addList" :key="index">
              <div class="c_cash_item_title">
                <span class="c_ticket">融资票据：{{item.invoice_name}}[发票编号: {{item.invoice_number}}]</span>
                <!-- <span class="c_sure">
                  <span>法人确认：<i></i></span>
                  <span>交易企业确权：<i></i></span>
                  <span>促保贷确权：<i></i></span>
                </span> -->
                <span @click="remove(item.id)" class="c_delete"><img src="../../../static/img/debet/rubbish.png" alt=""></span>
              </div>
              <div class="c_cash_item_sec_line">
                <span>发票代码：{{item.invoice_code}}</span>
                <span>发票金额：{{toThousands(item.payment_value)}}（元）</span>
                <span>交易公司：{{item.partner_business_name}} </span>
                <span>开票日期：{{item.payment_date}}</span>
              </div>
            </div>
          </div>
          <div class="c_opera_box">
            <!-- <a>返回</a> -->
            <a @click="nextBtn">下一步</a>
          </div>
        </div>
      </div>
      <el-dialog :title='wayName' :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <div class="c_cash_box">
          <!-- <div class="add">
            <span>添加</span>
          </div> -->
          <div v-if="manager_list.length > 0 && Number(invoice_id) !== item.id" class="c_cash_item" v-for="(item, index) in manager_list" :key="index">
            <div class="c_cash_item_title">
              <span class="checkbox"><input :value="item" v-model="addList" type="checkbox"></span>
              <span class="c_ticket">融资票据：{{item.invoice_name}}[发票编号: {{item.invoice_number}}]</span>
              <span class="c_sure">
                <!-- <span>法人确认：<i></i></span>
                <span>交易企业确权：<i></i></span> -->
                <!-- <span>促保贷确权：<i></i></span> -->
              </span>
              <!-- <span class="c_delete"><img src="../../../static/img/debet/rubbish.png" alt=""></span> -->
            </div>
            <div class="c_cash_item_sec_line">
              <span>发票代码：{{item.invoice_code}}</span>
              <span>发票金额：{{toThousands(item.payment_value)}}（元）</span>
              <span>交易公司：{{item.partner_business_name}} </span>
              <span>开票日期：{{item.payment_date}}</span>
            </div>
          </div>
          <div class="deal_page">
            <el-pagination
              @size-change="handleSizeChange('end')"
              @current-change="handleCurrentChange('end')"
              :current-page.sync="pagination.currentPage"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="pagination.total">
            </el-pagination>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Location from '../location/location'
// import AppNav from '../financing/financingManege'
export default {
  name: 'debtWay',
  data () {
    return {
      step: {
        selIndex: 6
      },
      pagination: {
        total: 10,
        currentPage: 1
      },
      dialogVisible: false,
      checkedData: [1],
      selectData: [1],
      budge: "background: #fff;border: 1px solid #666;color: #666;",
      invoice_id: '',
      manager_list: [],
      addList: []
    }
  },
  components: {
    // AppNav, 
    Location
  },
  beforeCreate () {
    let name = ''
    this.manager_list = []
    if (this.$route.query.type) {
      name = Number(this.$route.query.type) === 1 ? '支付' : (Number(this.$route.query.type) === 2 ? '拒付' : '转让')
      this.wayName =  Number(this.$route.query.type) === 1 ? '支付池' : (Number(this.$route.query.type) === 2 ? '拒付池' : '转让池')
    }
    this.location = [
      {
        title: '债务处置',
        url: '/debtDeal'
      },
      {
        title: '处置方式',
        url: '/debtIntro?id=' + this.$route.query.id
      },
      {
        title: name
      }
    ]
  },
  mounted() {
    this.invoice_id = this.$route.query.id
    this.$ajax.get('/api/claims_debt/debt_management/?token=' + this.$token()).then(res => {
      if (res.data.code === '1') {
        this.manager_list = res.data.data.can_manage.debts_list
        // console.log(this.manager_list)
        this.manager_list.forEach((val, index) => {
          if(Number(val.id) === Number(this.$route.query.id)) {
            this.addList.push(val)
          }
        })
      }
    })
  },
  methods: {
    remove(id) {
      this.addList.forEach((val, index)=>{
        if(Number(id) === Number(val.id)) {
          this.addList.splice(index, 1)
        }
      })
      if (Number(id) === Number(this.invoice_id)) {
        this.invoice_id = -1
      }
    },
    // 分页
    handleSizeChange (state) {

    },
    handleCurrentChange (state) {

    },
    addCash () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    nextBtn () {
      // console.log(this)
      var idList = []
      if (this.addList.length === 0) {
        this.$message.error('必须添加'+ this.wayName)
        return
      }
      this.addList.forEach((val, index)=>{
        idList.push(val.id)
      })
      this.$router.push({
        path: '/debtPublish',
        query: {
          id: idList,
          type: this.$route.query.type
        }
      })
    }
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
      .topStep {
        height: 122px;
        width: 80%;
        margin: 20px auto;
        border:1px solid #e1e6f0;
        background: #ffffff;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .mid_line {
          border: 1px dashed #eaeaea;
          width: 60%;
          height: 0;
          display: flex;
          justify-content: space-between;
          .mid_icon {
            text-align: center;
            margin-top: -24px;
            img {
              width: 35px;
              background: #ffffff;
            }
            span {
              display: block;
              font-size: 14px;
              color:#666666;
            }
            .mid_icon_budge {
              width: 20px;
              position: absolute;
              margin-left: 50px;
              height: 20px;
              border: 1px solid #ea6100;
              margin-top: -25px;
              background: #ea6100;
              line-height: 20px;
              color: #fff;
              border-radius: 50%;
            }
          }
          .mid_icon:first-child {
            margin-left: -43px;
          }
          .mid_icon:last-child {
            margin-right: -43px;
          }
        }
      }
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
        .deal_page {
          text-align: center;
          margin-top: 30px; 
        }  
        .c_opera_box{
          text-align: center;
          margin: 80px 0;
          a {
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
            margin-right: 100px;
          }
        }
      }
    }
    .c_cash_box{
      .add {
        width: 60px;
        height: 32px;
        line-height: 32px;
        background: #ea6100;
        text-align: center;
        color: #fff;
        border-radius: 4px;
      }
      .c_cash_item{
        background: #fff;
        border: 1px solid #e1e6f0;
        margin: 15px 0;
        .c_cash_item_title{
          background: rgba(204,204,204,0.20);
          line-height: 48px;
          height: 48px;
          padding: 0 50px;
          display: flex;
          justify-content: space-between;
          .checkbox {
            margin-left: -30px;
            position: absolute;
            margin-top: -14px;
            input {
              width: 18px;
              height: 18px;
            }
          }
          span{
            display: inline-block;
          }
          .c_ticket{
            width: 45%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
              }
              &.active{
                background: url('../../../static/img/debet/confirm2.png') no-repeat;
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
          // border-bottom: 1px dashed #ccc;
          line-height: 48px;
          span{
            display: inline-block;
            width: 25%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // padding: 0 5px;
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
            // padding: 0 5px;
          }
        }
      }
    }
  }
}
.deal_empty {
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #999999;
}
.deal_page {
  text-align: center;
}
</style>
<style>
 .el-dialog .el-dialog__body {
   padding-top: 20px;
 }
</style>
