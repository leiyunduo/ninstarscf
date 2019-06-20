<template>
  <div class="first_step">
    <div class="demand">
      <div class="show_title">
        <h3>企业基本信息</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>企业名称：</span>
          <input type="text" placeholder="请输入企业名称" v-model="amount" disabled>
        </div>
        <div class="inpit_lint">
          <span>营业执照证件号：</span>
          <input type="text" placeholder="请输入营业执照证件号" v-model="amount" disabled>
        </div>
        <div class="inpit_lint">
          <span>法定代表人：</span>
          <input type="text" placeholder="请输入法定代表人" v-model="amount" disabled>
        </div>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>经营地址：</span>
          <input type="text" placeholder="请输入经营地址" v-model="amount" disabled>
        </div>
        <div class="inpit_lint">
          <span>公司成立日期：</span>
          <input type="text" placeholder="请输入公司成立日期" v-model="amount">
        </div>
        <div class="inpit_lint">
          <span>注册资本：</span>
          <input type="text" placeholder="请输入注册资本" v-model="amount" disabled>
        </div>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>员工人数：</span>
          <input type="text" placeholder="请输入员工人数" v-model="amount">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>企业联系人：</span>
          <input type="text" placeholder="请输入企业联系人" v-model="amount">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>职务：</span>
          <input type="text" placeholder="请输入职务" v-model="amount">
        </div>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>办公电话：</span>
          <input type="text" placeholder="请输入办公电话" v-model="amount">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>联系人手机：</span>
          <input type="text" placeholder="请输入联系人手机" v-model="amount">
        </div>
        <div class="inpit_lint">
          <span>主营业务介绍：</span>
          <textarea name="" id=""></textarea>
        </div>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span style="width: 120px;">经营场地产权情况：</span>
          <el-select v-model="value" size="small" placeholder="请选择">
            <el-option
              v-for="item in property_right"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="inpit_lint">
          <span>企业经济性质：</span>
          <el-select v-model="value" size="small" placeholder="请选择">
            <el-option
              v-for="item in nature"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="inpit_lint"></div>
      </div>
    </div>
    <div class="demand">
      <div class="show_title">
        <h3>企业实际控制人信息</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span><a>*</a>姓名：</span>
          <input type="text" placeholder="请输入姓名" v-model="bankAccountName">
        </div>
        <div class="inpit_lint">
          <span>性别：</span>
          <input type="text" placeholder="请输入性别" v-model="bankAccountNumber">
        </div>
        <div class="inpit_lint">
          <span>年龄：</span>
          <input type="text" placeholder="请输入年龄" v-model="bankInfo">
        </div>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>固定电话：</span>
          <input type="text" placeholder="请输入固定电话" v-model="bankAccountName">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>手机：</span>
          <input type="text" placeholder="请输入手机" v-model="bankAccountNumber">
        </div>
        <div class="inpit_lint">
        </div>
      </div>
    </div>
    <div class="demand">
      <div class="show_title">
        <h3>企业负债信息</h3>
        <button @click="added">+新增</button>
      </div>
      <div v-for="(item, index) in Liabilities_list" :key="index">
        <div class="input_list">
          <div class="inpit_lint">
            <span>贷款银行：</span>
            <input type="text" placeholder="请输入贷款银行" v-model="item.one">
          </div>
          <div class="inpit_lint">
            <span>原金额：</span>
            <input type="text" placeholder="请输入原金额" v-model="item.two">
          </div>
          <div class="inpit_lint">
            <span>到期日：</span>
            <input type="text" placeholder="请输入到期日" v-model="item.three">
          </div>
        </div>
        <div class="input_list">
          <div class="inpit_lint">
            <span><a>*</a>当前余额：</span>
            <input type="text" placeholder="请输入当前余额" v-model="item.fore">
          </div>
          <div class="inpit_lint">
            <span>还本方式：</span>
            <el-select v-model="item.five" size="small" placeholder="请选择">
              <el-option
                v-for="item1 in return_of_capital"
                :key="item1"
                :label="item1"
                :value="item1">
              </el-option>
            </el-select>
          </div>
          <div class="inpit_lint">
          </div>
        </div>
      </div>
    </div>
    <div class="demand">
      <div class="show_title">
        <h3>企业财务信息</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span><a>*</a>当前资产总额：</span>
          <input type="text" placeholder="请输入当前资产总额" v-model="bankAccountName">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>当前负债总额：</span>
          <input type="text" placeholder="请输入当前负债总额" v-model="bankAccountNumber">
        </div>
        <div class="inpit_lint">
          <span>当前现金及银行存款余额：</span>
          <input type="text" placeholder="请输入当前现金及银行存款余额" v-model="bankInfo">
        </div>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>当前固定资产净值：</span>
          <input type="text" placeholder="请输入当前固定资产净值" v-model="bankAccountName">
        </div>
        <div class="inpit_lint">
          <span>上年度销售总额：</span>
          <input type="text" placeholder="请输入上年度销售总额" v-model="bankAccountNumber">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>当前应收账款：</span>
          <input type="text" placeholder="请输入当前应收账款" v-model="bankAccountNumber">
        </div>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span><a>*</a>当前应付账款：</span>
          <input type="text" placeholder="请输入当前应付账款" v-model="bankAccountName">
        </div>
        <div class="inpit_lint">
        </div>
        <div class="inpit_lint">
        </div>
      </div>
    </div>
    <div class="demand">
      <div class="show_title">
        <h3>融资申请信息</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span><a>*</a>申请金额：</span>
          <input type="text" placeholder="请输入申请金额" v-model="bankAccountName">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>贷款期限：</span>
          <input type="text" placeholder="请输入贷款期限" v-model="bankAccountNumber">
        </div>
        <div class="inpit_lint">
        </div>
      </div>
    </div>
    <div class="demand">
      <div class="show_title">
        <h3>还款路径</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span><a>*</a>还款账户：</span>
          <input type="text" placeholder="请输入还款账户" v-model="bankAccountName">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>还款账号：</span>
          <input type="text" placeholder="请输入还款账号" v-model="bankAccountNumber">
        </div>
        <div class="inpit_lint">
          <span><a>*</a>开户行：</span>
          <input type="text" placeholder="请输入开户行" v-model="bankAccountNumber">
        </div>
      </div>
    </div>
    <div class="btn_list">
      <div @click="handleNext">下一步</div>
    </div>
  </div>
</template>
<script>
import person from '@/components/public/person-info'
export default {
  name: 'firstStep',
  components: {person},
  data () {
    return {
      property_right: ['自有', '租赁'],
      nature: ['国有', '集体', '股份有限', '有限责任', '联营', '私营', '个人独资', '合伙企业'],
      return_of_capital: ['按月', '按季', '到期一次性还本', '其他'],
      Liabilities_list: [
        {one: '', two: '', three: '', fore: '', five: ''}
      ],
      showModal: false,
      // 收起展开
      checkList: [],
      selList: [],
      repaymentDate: '',
      exceptDate: '',
      amount: '',
      // 选择订单
      radio: '',
      maxException: '0.00',
      bankAccountName: '',
      bankAccountNumber: '',
      bankInfo: '',
      diamondIcon: require('../../../../../static/img/chain/zuan_b.png'),
      disdiamondIcon: require('../../../../../static/img/chain/zuan_g.png'),
      nines: [
        {title: '合同', key: 'Contract'}, 
        {title: '订单', key: 'Order'}, 
        {title: '订金', key: 'Deposit'}, 
        {title: '出货单', key: 'Warehouse'}, 
        {title: '运单', key: 'Transport'}, 
        {title: '验收入库单', key: 'Acceptance'}, 
        {title: '结算', key: 'Settlement'}, 
        {title: '发票', key: 'Invoice'}, 
        {title: '支付', key: 'Payment'}
      ],
      dialogVisible:false,
      info: {},
      dialogVisiblePerson: false,
      pName: '',
      pid: '',
      isAgent: false,
      self: {}
    }
  },
  mounted () {
    const that = this
    this.$ajax.get('/api/financing/payable_order_list/').then(res => {
      if (res.status === 200) {
        res.data.forEach((val, index) => {
          val.sel = false
          val.show = true
          val.slide = true
          if (val.order) {
            val.order.forEach((el, index1) => {
              el.sel = false
            })
          }
        })
        that.checkList = res.data
      }
    })
    this.self.id = localStorage.id
    this.self.name = unescape(localStorage.self_name)
  },
  methods: {
    // 新增
    added () {
      this.Liabilities_list.push({one: '', two: '', three: '', fore: '', five: ''})
    },
    // 跳转企业
    handleOtherBusiness (id) {
      if (id) window.open('#/enterpriseBlog?bid=' + id, '_black')
    },
    // 点击下一步，验证后通过emit传输
    handleNext () {
      const that = this
      that.$emit('first', {
        list: that.Liabilities_list
      })
      // if (that.selList.length === 0) {
      //   // 判断融资用途
      //   that.$message.error('请选择融资用途')
      // } else {
      //   if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.amount))) {
      //     // 判断是否填写金额
      //     that.$message.error('请填写正确的融资金额')
      //   } else {
      //     if (Number(that.amount) >= that.maxException && Number(that.amount) !== 0) {
      //       // 判断金额是否超标
      //       that.$message.error('融资金额不得大于最大融资限额')
      //     } else {
      //       if (!that.exceptDate) {
      //         // 判断是否选择融资时间
      //         that.$message.error('请选择期望融资时间')
      //       } else {
      //         if (Date.parse(that.exceptDate) + (60 * 1000 * 60 * 24) < Date.parse(new Date())) {
      //           // 判断是否今天之前
      //           that.$message.error('请选择正确的期望融资时间')
      //         } else {
      //           if (!that.repaymentDate) {
      //             // 判断是否填写还款时间
      //             that.$message.error('请选择期望还款时间')
      //           } else {
      //             if (Date.parse(this.repaymentDate) < Date.parse(that.exceptDate)) {
      //               // 判断是否为今天之前
      //               that.$message.error('请选择正确的期望还款时间')
      //             } else {
      //               that.$emit('first', {
      //                 list: that.selList,
      //                 except_date: that.exceptDate,
      //                 repayment_date: that.repaymentDate,
      //                 amount: Number(that.amount).toFixed(2),
      //                 bankInfo: {
      //                   bank_account_name: that.bankAccountName,
      //                   bank_account_number: that.bankAccountNumber,
      //                   open_bank_info: that.bankInfo
      //                 }
      //               })
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.null {
  color: #999;
}
.link_to {
  color: #eb6100;
  text-decoration: underline;
  cursor: pointer;
}
.first_step {
  margin: 0 40px;
  .show_title {
    height: 52px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    flex-direction: row;
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
      flex: 1;
      margin-top: 20px;
    }
    button {
      width:74px;
      height:32px;
      background:linear-gradient(90deg,rgba(235,97,0,1) 0%,rgba(239,129,51,1) 100%);
      box-shadow:0px 2px 4px 0px rgba(235,97,0,0.4);
      border-radius:4px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      outline: none;
      color:rgba(254,254,254,1);
      border: none;
      margin-top: 10px;
    }
  }
  .demand {
    background:#ffffff;
    border:1px solid #eaeaea;
    border-radius:2px;
    width:100%;
    height:auto;
    margin-top: 20px;
    padding: 0 20px;
  }
  .input_list {
    padding: 0 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    .inpit_lint {
      height: 48px;
      font-size: 14px;
      flex: 1;
      span {
        font-family:PingFangSC-Semibold;
        font-size:12px;
        color:#666666;
        letter-spacing:0;
        text-align:left;
        display: inline-block;
        padding-left: 8px;
        width: 110px;
        a {
          text-decoration: none;
          color: #F20D0D;
        }
      }
      textarea {
        width:220px;
        height:82px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,220,220,1);
        border-radius:4px;
      }
      input {
        background:#ffffff;
        border:1px solid #eaeaea;
        border-radius:2px;
        color: #606266;
        width:220px;
        height:32px;
        outline: none;
        padding: 0 10px;
        transition: all .2s;
        font-size: 14px;
        border-radius: 4px;
      }
      input::placeholder {
        color: #C0C4CC;
      }
      input:hover {
        border-color: #c0c4cc;
      }
    }
    // .inpit_lint:first-child {
    //   min-width: 371px;
    // }
  }
  .btn_list {
    padding: 24px 0;
    div {
      width: 120px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      margin: 0 auto;
      cursor: pointer;
      background:#e87626;
      border-radius:2px;
      height:30px;
      font-family:PingFangSC-Semibold;
      font-size:12px;
      color:#ffffff;
      letter-spacing:0;
    }
  }
  .second_list_none {
    text-align: center;
    min-height: 200px;
    img {
      width:162px;
      height:125px;
      margin-top: 20px;
    }
    h4 {
      color: #999;
    }
  }
  .open_sel_item {
    // padding: 0 60px;
    color: #333;
    margin-bottom: 28px;
    height: auto;
    width: 100%;
    .sel_line {
      background:#ffffff;
      border:1px solid #eaeaea;
      width:100%;
      height:47px;
      .show_section {
        ul {
          width: 100%;
          display: flex;
          flex-direction: row;
          // padding-left: 30px;
          li {
            width: 22%;
            min-height:47px;
            line-height: 47px;
            display: flex;
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
              width: 30%;
            }
            p {
              width: 70%;
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#eb6100;
              letter-spacing:0;
              text-align:left;
              text-decoration: underline;
              font-weight: bold;
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          // li:nth-child(3) {
          //   p {
          //     color: #333;
          //     cursor: default;
          //     text-decoration: none;
          //     font-weight: normal;
          //   }
          // }
          li:last-child {
            width: 12%;
            // text-align: right;
            justify-content: flex-end;
            span {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#eb6100;
              letter-spacing:0;
              float: right;
              text-decoration: underline;
              cursor: pointer;
            }
            button {
              float: right;
              margin: 11px 11px 0 44px;
              border-radius:2px;
              width:100px;
              height:24px;
              border: none;
              outline: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#eb6100;
              letter-spacing:0;
              text-align:center;
              // background:#eb6100;
              margin-right: 34px;
              text-decoration: underline;
              background: #fff;
            }
          }
        }
      }
    }
    .order_title {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#666;
      letter-spacing:0;
      text-align:left;
      padding-left: 48px;
      height: 38px;
      line-height: 38px;
      border-left: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      // border-bottom: 1px solid #eaeaea;
      span {
        font-weight: bold;
      }
    }
    .order_info {
      background:#ffffff;
      border:1px soild #eaeaea;
      border-bottom: none;
      width:100%;
      height:auto;
      &>li {
        border:1px solid #eaeaea;
        // margin-bottom: 20px;
        // border-left: none;
        // border-right: none;
        border-top: none;
        .order_data {
          display: flex;
          flex-direction: row;
          background:#f7f7f7;
          width:100%;
          height:50px;
          line-height: 50px;
          padding: 0 24px;
          div {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            span {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
            }
            p {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              display: inline-block;
              span {
                width:12px;
                height:12px;
                display: inline-block;
                border-radius: 50%;
                border: 1px solid #9b9b9b;
                position: relative;
                cursor: pointer;
                margin-right: 10px;
                a {
                  position: absolute;
                  display: inline-block;
                  background:#9b9b9b;
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  top: 2px;
                  left: 2px;
                }
              }
            }
            span:last-child {
              font-weight: bold;
            }
          }
          .order_data_btn {
            text-align: right;
            .el-checkbox-group {
              text-align: right;
            }
            .el-checkbox-button--mini {
              width:100px;
              height:24px;
              border-radius:2px;
            }
            .el-checkbox-button__inner {
              display: inline-block;
              width:100px;
              height:24px;
              border-radius:2px;
            }
            .el-checkbox-button:last-child .el-checkbox-button__inner {
              width: 100px;
              height: 24px;
              line-height: 10px;
              border-radius: 2px;
            }
            .el-checkbox-button__inner:hover {
              color: #e87626;
            }
            button {
              float: right;
              margin: 11px 11px 0 44px;
              border-radius:2px;
              width:100px;
              height:24px;
              border: none;
              outline: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#ffffff;
              letter-spacing:0;
              background:#eb6100;
              text-align:center;
            }
          }
        }
        .usage_deposit_line {
          padding-left: 28px;
          .deposit_title {
            border-bottom:1px dashed #eaeaea;
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
                width: 30%;
                text-align: center;
                line-height: 32px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                  font-family:PingFangSC-Regular;
                  font-size: 14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                }
                span:first-child {
                  color: #666;
                }
              }
              div:first-child {
                padding: 0 30px;
              }
            }
          }
        }
        .diamond {
          position: relative;
          min-height: 96px;
          padding: 0 20px;
          .line {
            position: absolute;
            border-top: 2px dotted #ccc;
            width: calc(100% - 40px);
            height: 0;
            left: 20px;
            top: 27px;
            z-index: 0;
          }
          ul {
            width: calc(100% - 40px);
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 10px;
            z-index: 2;
            li {
              width: 48px;
              // height: 56px;
              text-align: center;
              background: #fff;
              // background: #fff;
              p {
                text-align: center;
                line-height: 20px;
                color: #666;
              }
              img {
                width: 32px;
              }
            }
          }
        }
        .is_null {
          font-family:PingFangSC-Semibold;
          font-size:12px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          padding: 8px 0 12px 69px;
        }
        .order_data_btn {
          text-align: right;
          span {
            margin-left: 20px;
            padding: 8px 15px;
            border-radius: 2px;
            cursor: pointer;
          }
          .using {
            color: #fff;
            background: #eb6100;
          }
          .useless {
            color: #333;
            background: #ccc;
          }
        }
      }
      &>li:first-child {
        border-top: 1px soild #eaeaea;
      }
      &>li:last-child {
        margin-bottom: 0px;
        border-bottom: 1px solid #eaeaea;
      }
    }
  }
  .btn_wrap {
    text-align: center;
    padding-top: 30px;
    button {
      width: 72px;
      height: 30px;
      color: #fff;
      background: #eb6100;
      border: none;
      margin: 0;
      padding: 0;
      outline: none;
      border-radius: 3px;
    }
  }
  .open_class {
    .sel_line {
      border: 1px dashed #eaeaea;
    }
  }
}
.show_item_list {
  &>div.show_item_detail {
    border-bottom: 1px dashed #e3e3e3;
    margin-bottom: 20px;
    color: #333;
  }
  .show_item_line {
    min-height: 55px;
    display: flex;
    padding: 15px 0;
    &>div:first-child {
      width: 22%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #666;
    }
    &>div:last-child {
      width: 78%;
      color: #333;
        ul.item_table {
          border: 1px solid #dbdbdb;
          li {
            border-bottom: 1px dotted #dbdbdb;
            display: flex;
            div {
              width: 50%;
              height: 40px;
              line-height: 40px;
              text-align: center;
              padding: 0 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          li:last-child {
            border: none;
          }
          li:first-child {
            background: #e3e3e3;              
          }
          li.product_line {
            span {
              width: 25%;
            }
          }
        }
    }
    .prodct_list {
      margin: 0;
      padding: 0;
      ul {
        border: 1px solid #dbdbdb;
        li {
          border-bottom: 1px dotted #dbdbdb;
          display: flex;
          span {
            width: 25%;
            text-align: center;
            color: #666;
            line-height: 40px;
          }
        }
        li:first-child {
          background: #e3e3e3;              
        }
        li:last-child {
          border: none;
        }
      }
    }
  }
}
</style>
<style>
.show_item_list .el-dialog__header, .show_five_list .el-dialog__header{
  padding: 0;
}
.show_five_list .el-dialog__body {
  padding: 0;
}
</style>
