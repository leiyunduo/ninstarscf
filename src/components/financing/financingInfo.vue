<template>
  <div class="finance">
    <div class="finance_board">
      <!-- <appNav :father="step" type="1"></appNav> -->
      <div class="finance_info">
        <div class="title">
          <!-- <i class="iconfont icon-rongzi"></i> -->
          <img src="../../../static/img/leftbar/myfin.png" alt="">
          <span>我的融资</span>
        </div>
        <div class="c_finance_bottom">
          <div class="apply_list">
            <div class="list_info">
              <div class="my_number">
                <div>我的融资申请</div>
                <div class="data_number_mine">
                  <span>{{applyNumber.myApply}}</span>
                  <span>(元)</span>
                </div>
              </div>
              <div class="msg_box">
                <img src="../../../static/img/im/im.png" alt="">
                <div @click="showMsg()" class="msg_info">
                  致企业的一封信
                </div>
              </div>
              <!-- <div class="apply_list_info">
                <ul>
                  <li><span @click="getting">应收融资申请</span></li>
                  <li><span @click="orderFinanc">订单融资申请</span></li>
                  <li><span @click="stock">存储融资申请</span></li>
                </ul>
              </div> -->
            </div>
          </div>
          <div class="my_info_number" v-if="false">
            <div class="info_number">
              <div>
                <div>我的质押统计</div>
                <div class="data_number">{{toThousands(applyNumber.myPledge)}}<span>（元）</span></div>
              </div>
              <div>
                <div>我的票据统计</div>
                <div class="data_number">{{toThousands(applyNumber.myPledge)}}<span>（元）</span></div>
              </div>
            </div>
          </div>
          <div class="financing_info">
            <ul>
              <li v-for="(item, key, index) in financing_info" :key='index'>
                <div>
                  <p>{{financingTitle[index]}}</p>
                  <p v-if="index !== 3" class="data_number">{{toThousands(item)}}（元）</p>
                  <p v-if="index === 3" class="data_number">0.00（元）</p>
                  <div class="apply">
                    <div class="apply_btn" @click="handleOperate($event, index)">{{btn[index]}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="record">
            <div class="record_info">
              <div class="record_title">
                <ul>
                  <li v-for="(val, index) in recordTitle" :style="index === selType ? 'border-bottom: 4px solid #eb6100;color:#eb6100' : 'border-bottom: 4px solid #fff'" :key="index">
                    <span @click="changeTab($event, index)">{{val}}</span>
                  </li>
                </ul>
              </div>
              <div class="record_table">
                <div class="table_title">
                  <div v-for="(title, index) in tableTitle" :key="index">{{title}}</div>
                </div>
                <div class="table_item" v-for="(item, index) in financeList" :key="index">
                  <div class="show_line">
                    <div>{{item.number}}</div>
                    <div :style="item.date_created ? '' : 'color: #ccc'">{{item.date_created ? item.date_created : '未提交融资期望'}}</div>
                    <div :style="item.date_created ? '' : 'color: #ccc'">{{item.limit ? toThousands(item.limit) : '未提交融资期望'}}</div>
                    <div>{{item.type}}</div>
                    <div>
                      <div v-if="item.institution_list.length !== 0 && item.type !== '已结束'"><span @click="slideDown(index, item)">{{item.down === 1  ? '收起' : '展开'}}</span></div>
                      <div v-if="item.institution_list.length === 0 && !item.area_publish && item.type !== '已结束'"><span @click="todetail($event, item, -1)">查看</span></div>
                      <div v-if="item.institution_list.length === 0 && item.area_publish && item.type !== '已结束'"><span @click="todetail($event, item, -2)">区域详情</span></div>
                      <div v-if="item.type === '申请中'"><span @click="tocancel($event, item)">取消</span></div>
                    </div>
                  </div>
                  <div class="hide_line" :style="item.down === 1 ? 'height: auto' : 'height: 0'">
                    <div class="table_card">
                      <div class="card_line">
                        <div>
                          <div>质押池总额</div>
                          <div>{{toThousands(showInfo.info.pledged_pool_sum)}}元</div>
                        </div>
                        <div>
                          <div>质押池支付方式</div>
                          <div>
                            <span>银券：{{showInfo.info.pledged_ticket[0]}}张</span>
                            <span>商券：{{showInfo.info.pledged_ticket[1]}}张</span>
                            <span>数券：{{showInfo.info.pledged_ticket[2]}}张</span>
                          </div>
                        </div>
                        <div>
                          <div>质押池支付总额</div>
                          <div>{{toThousands(showInfo.info.pledged_pool_pay_sum)}}元</div>
                        </div>                
                      </div>
                      <div class="card_line">
                        <div>
                          <div>担保池总额</div>
                          <div>{{toThousands(showInfo.info.cover_pool_sum)}}元</div>
                        </div>
                        <div>
                          <div>担保池支付方式</div>
                          <div>
                            <span>银券：{{showInfo.info.cover_ticket[0]}}张</span>
                            <span>商券：{{showInfo.info.cover_ticket[1]}}张</span>
                            <span>数券：{{showInfo.info.cover_ticket[2]}}张</span>
                          </div>
                        </div>
                        <div>
                          <div>担保池支付总额</div>
                          <div>{{toThousands(showInfo.info.cover_pool_pay_sum)}}元</div>
                        </div>                
                      </div>
                      <div class="card_line">
                        <div>
                          <div>期望融资时间</div>
                          <div>{{showInfo.expect_loan_data}}</div>
                        </div>
                        <div>
                          <div>预计还款时间</div>
                          <div>{{showInfo.expect_repayment_data}}</div>
                        </div>                
                      </div>
                      <div class="card_one_line pay_path" v-if="item.type !== 'order'">
                        <div>
                          <div>支付路径</div>
                          <div v-for="(pp, pindex) in showInfo.info.payment_path" :key='pindex' class="pp_line">
                            <span>{{pp.business}}</span>
                            <span>{{pp.account}}</span>
                          </div>
                          <div class="pay_null" v-if="showInfo.info.payment_path.length === 0">无支付路径</div>
                        </div>
                        <div>
                          <div>还款路径</div>
                          <div v-for="(pp, pindex) in showInfo.info.pay_back_path" :key='pindex' class="pp_line">
                            <span>{{pp.business}}</span>
                            <span>{{pp.account}}</span>
                          </div>              
                          <div class="pay_null" v-if="showInfo.info.pay_back_path.length === 0">无还款路径</div>
                        </div>
                      </div>                  
                      <div class="card_one_line usage">
                        <div>资金去向</div>
                        <div class="uc_title" v-if='showInfo.info.usage_chain_name.length !== 0'>
                          <div>合同名称</div>
                          <div>交易企业</div>
                          <div>创建日期</div>
                        </div>
                        <div v-for='(uc, indx) in showInfo.info.usage_chain_name' :key='indx' class="uc_line" v-if='showInfo.info.usage_chain_name.length !== 0'>
                          <div>{{uc.name}}</div>
                          <div>{{uc.business}}</div>
                          <div>{{uc.date_created}}</div>
                        </div>
                        <div class="uc_null" v-if='showInfo.info.usage_chain_name.length === 0'>无资金去向</div>
                      </div>
                      <div class="card_one_line score" style="text-align:right; font-size:16px">
                        <span style="font-weight:600">交易逾期率: {{item.score.average_score || 0}}%</span>
                      </div>
                    </div>
                    <div class="bank_line" v-for="(bank, index1) in item.institution_list" :key="index1">
                      <div>{{bank.institution_name}}</div>
                      <div :style='bank.status === "1" ? "color: #999" : ""'>{{statusList[bank.status]}}</div>
                      <div v-if='bank.status !== "3"'>
                        <span @click="todetail($event, item, index1)">查看</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="c_empty_line" v-if="financeList.length === 0">暂无数据</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="取消申请"
      :visible.sync="dialogVisible"
      width="37%">
      <span>您将取消本次融资申请，之前的所有步骤将被结束？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="sureCancel" :disabled="isCancel">确 定</el-button>
      </span>
    </el-dialog>
    <div class="shade_box"  v-show="dialogMsg">
      <div class="to_display">
        <img class="closeWrap" @click="showMsg()" src="../../../static/img/im/im1.png" alt="">
        <img src="../../../static/img/im/to_company.png" alt="">
      </div> 
    </div> 
  </div>
</template>

<script>
// import AppNav from '../financing/financingManege'
export default {
  name: 'applicationNav',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      isCancel: false,
      step: {selIndex: 3},
      dialogVisible: false,
      dialogMsg: false,
      cancelId: -1,
      applyNumber: {},
      showInfo: {
        info: {pledged_ticket: [], cover_ticket: [], usage_chain_name: [], payment_path: [], pay_back_path: []},
      },
      statusList: ['', '未受理', '已受理', '已拒绝', '意向中'],
      recordTitle: ['应收融资申请', '订单融资申请', '存货融资申请', '贸易融资申请'],
      tableTitle: ['单号', '提交时间', '创建金额(元)', '融资状态', '操作'],
      financingTitle: ['我的应收池', '我的应付池', '我的存货池/存单池', '贸易融资申请'],
      financeList: [],
      btn: ['应收融资申请', '订单融资申请', '存货融资申请', '贸易融资申请'],
      selType: 0,
      financing_info: {},
      stepMap: ['', '/getting_expectation', '/getting_issue', '/getting_submit', '/getting_feedback', '/getting_upload', '/getting_repayment', '/sure_bank', 'getting_usage'],
      stepMaps: ['', '/orderExpectation', '/orderIssue', '/orderSubmit', '/orderFeedback', '/orderUpload', '/orderRepayment', '/sure_bank']
    }
  },
  methods: {
    showMsg: function() {
      this.dialogMsg = !this.dialogMsg
      // // console.log(this.dialogMsg)
    },
    slideDown: function (index, item) {
      var that = this
      var fList = this.financeList
      // // console.log(item)
      if (item.down === 1) {
        fList.forEach(val => {
          val.down = 0
        })
        that.financeList = fList
      } else {
        that.$ajax.put('/api/get_application/', {financing_type: item.financing_type, financing_id: item.id, token: that.$token()}).then(res => {
          // // console.log(res)
          if (res.data.code === '1') {
            that.showInfo = res.data.data
            fList.forEach((val, ind) => {
              if (ind === index) {
                val.down = 1
              } else {
                val.down = 0
              }
            })
            that.financeList = fList
          }
        })
      }
    },
    stock: function () {
      this.$message({
        type: 'warning',
        duration: 4000,
        message: '即将上线，敬请期待'
      })
    },
    handleOperate: function ($event, index) {
      if (index === 0) {
        this.getting()
      } else if (index === 1) {
        this.orderFinanc()
      } else {
        this.stock()
      }
    },
    getting: function () {
      this.$router.push({
        path: '/getting_application'
      })
    },
    orderFinanc () {
      this.$router.push('/orderFinancing')
    },
    todetail: function ($event, item, ind) {
      var that = this
      if (ind === -1) {
        if (that.selType === 0) {
          that.$router.push({
            path: !item.one_key ? '/getting_expectation' : '/auto_expectation',
            query: {
              fid: item.id,
              type: 1
            }
          })
        } else if (that.selType === 1) {
          that.$router.push({
            path: '/orderExpectation',
            query: {
              fid: item.id,
              type: 2
            }
          })
        }
      } else if (ind === -2) {
        var se = ''
        item.area_publish ? se = 1 : se = 0
        if (that.selType === 0) {
          that.$router.push({
            path: '/area_public',
            query: {
              fid: item.id,
              type: 1,
              sw: se
            }
          })
        } else {
          that.$router.push({
            path: '/area_public',
            query: {
              fid: item.fid,
              type: 2,
              sw: se
            }
          })
        }
      } else {
        if (that.selType === 0) {
          let currentItem = item.institution_list[ind]
          if (currentItem.i_step === '5') {
            if (item.usage_submit === '0') {
              that.$router.push({
                path: '/getting_usage',
                query: {
                  id: currentItem.institution_id,
                  fid: item.id,
                  type: 1                 
                }
              })
            } else {
              that.$router.push({
                path: '/getting_upload',
                query: {
                  id: currentItem.institution_id,
                  fid: item.id,
                  type: 1                  
                }
              })              
            }
          } else {
            that.$router.push({
              path: that.stepMap[currentItem.i_step],
              query: {
                id: currentItem.institution_id,
                fid: item.id,
                type: 1
              }
            })
          }
        } else if (that.selType === 1) {
          let currentItem = item.institution_list[ind]
          that.$router.push({
            path: that.stepMaps[currentItem.i_step],
            query: {
              id: currentItem.institution_id,
              fid: item.id,
              type: 2
            }
          })
        }
      }
    },
    changeTab: function ($event, index) {
      var that = this
      if (index <= 1) {
        that.$ajax.get('/api/get_application/?token=' + that.$token() + '&type=' + (index + 1)).then(res => {
          if (res.data.code === '1') {
            that.selType = index
            res.data.financing_list.map(val => {
              val.down = 0
              val.limit < 0 ? val.limit = '0.00' : ''
            })
            that.financeList = res.data.financing_list
            that.applyNumber = {
              myApply: Number(res.data.loan_application_value) < 0 ? '0.00' : Number(res.data.loan_application_value).toFixed(2),
              myPledge: Number(res.data.pledged_value) < 0 ? '0.00' : Number(res.data.pledged_value).toFixed(2),
              myBill: Number(res.data.invoice_value) < 0 ? '0.00' : Number(res.data.invoice_value).toFixed(2)
            }
            console.log(that.applyNumber)
          } else {
            that.$message.error(res.data.msg)
          }
        })
      } else {
        that.selType = index
        that.financeList = []
      }
    },
    tocancel: function ($event, item) {
      // // console.log(item)
      this.dialogVisible = true
      // this.cancelId = item.id
      // // console.log(this.selType)
      this.selType === 0 ? item.ftype = 'receivable' : item.ftype = 'order'
      this.cancelId = item
    },
    sureCancel: function () {
      var that = this
      this.isCancel = true
      // // console.log(this.cancelId)
      that.$ajax.delete('/api/one_key_cancel/?financing_type=' + this.cancelId.ftype + '&financing_id=' + this.cancelId.id + '&token=' + this.$token()).then(res => {
        if (res.data.code === '1') {
          that.$ajax.get('/api/get_application/?type=' + (that.selType + 1) + '&token=' + that.$token()).then(res1 => {
            if (res1.data.code === '1') {
              this.isCancel = false
              that.dialogVisible = false
              res1.data.financing_list.map(val => {
                val.down = 0
                val.limit < 0 ? val.limit = '0.00' : ''
              })
              that.financeList = res1.data.financing_list
              that.applyNumber = {
                myApply: Number(res.data.loan_application_value) < 0 ? '0.00' : Number(res.data.loan_application_value).toFixed(2),
                myPledge: Number(res.data.pledged_value) < 0 ? '0.00' : Number(res.data.pledged_value).toFixed(2),
                myBill: Number(res.data.invoice_value) < 0 ? '0.00' : Number(res.data.invoice_value).toFixed(2)
              }
              that.financing_info = {
                receivable_pool: res1.data.data_info.receivable_pool,
                payable_pool: res1.data.data_info.payable_pool,
                stock_pool: res1.data.data_info.stock_pool,
                receipt_pool: res1.data.data_info.receipt_pool
              }
            } else {
              that.$message.error(res1.data.msg)
            }
          })
        } else {
          that.$message.error(res.data.msg)
        }
      })
    }
  },
  beforeCreate () {
    var that = this
    that.$ajax.get('/api/get_application/?type=1&token=' + that.$token()).then(res => {
      // // console.log(res)
      if (res.data.code === '1') {
        res.data.financing_list.map(val => {
          val.down = 0
          val.limit < 0 ? val.limit = '0.00' : ''
        })
        that.financeList = res.data.financing_list
        that.applyNumber = {
          myApply: Number(res.data.loan_application_value) < 0 ? '0.00' : Number(res.data.loan_application_value).toFixed(2),
          myPledge: Number(res.data.pledged_value) < 0 ? '0.00' : Number(res.data.pledged_value).toFixed(2),
          myBill: Number(res.data.invoice_value) < 0 ? '0.00' : Number(res.data.invoice_value).toFixed(2)
        }
        that.financing_info = {
          receivable_pool: res.data.data_info.receivable_pool,
          payable_pool: res.data.data_info.payable_pool,
          stock_pool: res.data.data_info.stock_pool,
          receipt_pool: res.data.data_info.receipt_pool
        }
      } else {
        that.$message.error(res.data.msg)
      }
    })
  }
}
</script>

<style scoped lang="less">
// @import url('./iconfont.css');
.finance {
  height: 100%;
  .shade_box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.50);
    z-index: 2999;
    .to_display {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .closeWrap{
        position: absolute;
        top: 34px;
        right: 35px;
      }
    }
  }
  // padding-top: 120px;
  .finance_board {
    // width: 1280px;
    margin: 0 auto;
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
  }
  .data_number {
    color: #eb6100;
  }
  .finance_info {
    // width: 990px;
    // width: 100%;
    background: #fafafa;
    .title {
      color: #3c4046;
      font-size: 16px;
      line-height: 60px;
      padding-left: 50px;
      border-bottom: 1px solid #ccc;
      background: #fff;
      img {
        margin-right: 10px;
        vertical-align: middle;
      }
      i {
        color: #eb6100;
        margin-right: 10px;
        font-size: 20px;
      }
    }
    .c_finance_bottom{
      padding: 50px;
    }
    .apply_list {
      // padding: 0 40px;
      .list_info {
        // box-shadow: 0px 0px 5px #ccc;
        background: #fff;
        border-radius: 9px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .msg_box {
          display: flex;
          margin-right: 120px;
          cursor: pointer;
          .msg_info {
            font-size: 18px;
            font-weight:700;
            color: #ea6100;
            margin-left: 10px;
            text-decoration: underline; 
          }
        }
        .my_number {
          height: 120px;
          // width: 90%;
          margin: 0 45px;
          display: flex;
          // align-items: flex-end;
          font-size: 18px;
          border-bottom: 1px dashed #e6e9ea;
          div:first-child {
            font-weight: bolder;
            line-height: 120px;
            font-size: 20px;
          }
          div:last-child.data_number_mine {
            margin-left: 70px;
            line-height: 126px;
            font-size: 30px;
            color: #eb6100;
            font-weight: bolder;
            span {
              font-size: 20px;
              margin-left: 10px;
            }
          }
        }
        .apply_list_info {
          height: 50px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eaeaea;
          ul {
            display: flex;
            width: 80%;
            margin: 0 auto;
            height: 30px;
            align-items: center;
            li {
              width: 33.3%;
              text-align: center;
              line-height: 30px;
              border-left: 1px dashed #e6e9ea;
              font-size: 16px;
              color: #eb6100;
              span {
                cursor: pointer;
                font-weight: blod;
              }
            }
            li:first-child {
              border-left: none;
            }
          }
        }
      }
    }
    .my_info_number {
      // padding: 0 40px;
      margin-top: 50px;
      .info_number {
        box-shadow: 0px 0px 5px #ccc;
        padding: 10px 0;
        // height: 80px;
        background: #fff;
        border-radius: 9px;
        display: flex;
        &>div {
          width: 50%;
          height: 100%;
          font-size: 16px;
          div {
            height: 50%;
            line-height: 35px;
          }
          div:first-child {
            font-weight: bolder;
            height: 45px;
            line-height: 45px;
          }
          &>div:first-child {
            // text-align: center;
            padding: 0 50px;
          }
          &>div:last-child {
            // padding: 0 50px;
            text-align: center;
            font-size: 16px;
            span {
              font-size: 14px;
              margin-left: 5px;
            }
          }
        }
        &>div:first-child {
          border-right: 1px dashed #e6e9ea
        }
      }
    }
    .record {
      // padding: 0 30px;
      margin-top: 50px;
      .record_info {
        padding-top: 10px;
        width: 100%;
        background: #fff;
        border-radius: 9px;
        div.record_title {
          // border-bottom: 2px solid #e6e9ea;
          height: 40px;
          display: flex;
          align-items: center;
          font-size: 14px;
          // padding: 0 60px;
          ul{
            display: flex;
            height: 100%;
            li {
              width: 180px;
              height: 100%;
              border-bottom: 2px solid #f7f7f7;
              cursor: pointer;
              display: flex;
              align-items: center;
              span {
                width: 100%;
                text-align: center;
                height: 20px;
                border-left: 1px solid #ddd;
              }
            }
            li:first-child span{
              border-left: none;
            }
            li:hover {
              border-bottom: 4px solid #eb6100;
            }
          }
        }
        div.record_table {
          // margin: 20px 0;
          background: #fff;
          .c_empty_line{
            height: 48px;
            border-bottom: 1px solid #eaeaea;
            text-align: center;
            line-height: 48px;
            color: #aaa;
            font-size: 14px;
          }
          .table_title {
            display: flex;
            height: 52px;
            background: #f3a066;
            font-size: 14px;
            color: #fff;
            div {
              width: 20%;
              text-align: center;
              line-height: 52px;
            }
            div:first-child {
              padding: 0 30px;
              text-align: left;
            }
            div:nth-child(3) {
              padding: 0 80px;
              text-align: right;
            }
          }
          .table_item {
            border-bottom: 1px solid #eaeaea;
            .show_line {
              height: 52px;
              display: flex;
              // border-bottom: 1px solid #eaeaea;
              div{
                width: 20%;
                font-size: 14px;
                // color: #3c4046;
                text-align: center;
                line-height: 52px;
                color: #333;
                span {
                  color: #eb6100;
                  cursor: pointer;
                }
              }
              div:last-child {
                display: flex;
                justify-content: center;
                span {
                  color: #eb6100;
                  // text-decoration: underline;
                }
              }
              &>div:first-child {
                padding: 0 30px;
                text-align: left;
              }
              div:nth-child(3) {
                padding: 0 80px;
                text-align: right;
              }
            }
            .hide_line {
              overflow: hidden;
              transition: all 3s;
              font-size: 14px;
              .table_card {
                border-top: 1px dashed #ccc;
                background: #fbfbfb;
                margin: 0 50px;
                border-bottom: 1px dashed #ccc;
                padding: 18px 50px;
                .card_line {
                  display: flex;
                  margin-bottom: 10px;
                  &>div {
                    width: 33%;
                    div:first-child {
                      line-height: 24px;
                      color: #666;
                      font-weight: bold;
                    }
                    div:last-child {
                      line-height: 28px;
                      color: #999;
                    }
                  }
                }
                .usage {
                  div {
                    &:nth-of-type(1){
                      font-weight: bold;
                      color: #666;
                    }
                  }
                  .uc_title, .uc_line {
                    display: flex;
                    height: 34px;
                    div {
                      width: 180px;
                      text-align: center;
                      line-height: 34px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      &:nth-of-type(1){
                        font-weight: bold;
                        color: #666;
                      }
                    }
                  }
                  .uc_null {
                    line-height: 34px;
                    color: #999;
                  }
                }
                .score {
                  p{
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    text-align: right;
                    line-height: 24px;
                  }
                }
                .pay_path {
                  // border-top: 1px dashed #ccc;
                  display: flex;
                  &>div {
                    // width: 50%;
                    width: 33%;
                    line-height: 34px;
                    // &:nth-of-type(1){
                      // border-right: 1px dashed #ccc;
                    // }
                    // &:nth-of-type(2){
                    //   padding-left: 20px; 
                    // }
                    div {
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      &:nth-of-type(1){
                        font-weight: bold;
                        color: #666;
                      }
                      span {
                        margin-right: 16px;
                      }
                    }
                    .pay_null {
                      line-height: 34px;
                      color: #999;
                    }
                  }
                }
              }
              .bank_line {
                display: flex;
                height: 60px;
                // font-size: 14px;
                color: #3c4046;
                // width: 90%;
                margin: 0 50px;
                // padding: 0 35px;
                border-bottom: 1px dashed #eaeaea;
                // height: 0;
                // overflow: hidden;
                // border-bottom: 1px solid #e4e9ec;
                div {
                  width: 20%;
                  font-size: 14px;
                  // padding: 0 20px;
                  line-height: 60px;
                  font-weight: 800;
                }
                div:nth-child(2), div:nth-child(3), div:nth-child(4) {
                  width: 20%;
                  text-align: center;
                  span {
                    color: #eb6100;
                    cursor: pointer;
                  }
                }
              }
              .bank_line:last-child {
                border: none;
              }
            }
          }
        }
      }
    }
    .financing_info {
      ul {
        display: flex;
        justify-content: space-between;
        background: #fff;
        border-bottom-right-radius: 9px;
        border-bottom-left-radius: 9px;
        li {
          width: 23%;
          // height: 100px;
          padding: 10px 30px;
          p:first-child {
            line-height: 45px;
            font-weight: bold;
          }
          p:nth-child(2) {
            line-height: 50px;
            text-align: center;
          }
          div.apply {
            .apply_btn {
              height: 30px;
              width: 80%;
              cursor: pointer;
              margin: 20px auto;
              background: #eb6100;
              color: #fff;
              text-align: center;
              line-height: 30px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>

