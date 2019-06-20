<template>
  <div class="withdraw-wraper">
    <div class="withdraw-viewer">
      <div class="withdraw-title">
        <h4>提现</h4>
      </div>
      <div class="withdraw-content">
        <div class="withdraw-content__row">
          <div class="view">
            <h4>可提现金额</h4>
            <p>¥ <span>{{toThousands(balance)}}</span></p>
          </div>
        </div>
        <!-- <div class="withdraw-content__row">
          <div class="handler">
            <div class="handler-item">
              <h5>可原路提现金额</h5>
              <p>¥ <span>{{toThousands(0)}}</span></p>
              <div @click="cash(1)" class="btn btn-orange">立即提现</div>
            </div>
            <div class="handler-item">
              <h5>可信用卡提现金额</h5>
              <p>¥ <span>{{toThousands(0)}}</span></p>
              <div @click="cash(2)" class="btn btn-orange">立即提现</div>
            </div>
          </div>
        </div> -->
        <div class="withdraw-content__row text-content">
          <label class="title" for=""><span class="require">*</span>提现金额：</label>
          <i class="rmb ns-iconfont ns-icon-rmb"></i>
          <input maxlength="16" v-model="ruleForm.amount" type="text">
          <el-tooltip placement="right" popper-class='tool'>
            <div slot="content" class="tool-tips">
              <p>充值最大额度限制，依据第三方额度要求。</p>
              <p>充值金额必须是大于0的整数或者两位以内的小数。</p>
            </div>
            <i class="ns-iconfont ns-icon-tips"></i>
          </el-tooltip>
        </div>
        <div class="withdraw-content__row text-content">
          <label class="title" for=""><span class="require">*</span>提现方式：</label>
          <el-radio-group v-model="ruleForm.payType">
            <el-radio label="网银"></el-radio>
            <el-radio label="支付宝"></el-radio>
            <el-radio label="微信"></el-radio>
          </el-radio-group>
        </div>
        <div v-if="ruleForm.payType === '网银'">
          <div class="withdraw-content__row text-content">
            <label class="title" for=""><span class="require">*</span>选择银行：</label>
            <el-radio-group v-model="ruleForm.bank">
              <el-radio label="中国建设银行"></el-radio>
              <el-radio label="中国农业银行"></el-radio>
              <el-radio label="浦发银行"></el-radio>
              <el-radio label="中国工商银行"></el-radio>
            </el-radio-group>
          </div>
          <div class="withdraw-content__row text-content input-content">
            <label class="title" for=""><span class="require">*</span>提现账号：</label>
            <input maxlength="19" v-model="ruleForm.account" type="text">
          </div>
          <div class="withdraw-content__row text-content input-content">
            <label class="title" for=""><span class="require">*</span>账户名称：</label>
            <input maxlength="16" v-model="ruleForm.name" type="text">
          </div>
        </div>
        <div class="withdraw-content__row">
          <div class="handler">
            <div class="handler-item">
              <div class="btn btn-orange" @click="withdraw()">立即提现</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="withdraw-footer">
      <div class="withdraw-desc-wraper">
        <div class="withdraw-desc">
          <h4>说明</h4>
          <p>1.申请提现后您的款项将按照充值流水的后进先出的原则退回至您的原充值账户。</p>
          <p>2.信用卡金额只能提现至同名账户的信用卡中。</p>
          <p>3.单次提现金额上限30000，每日最多可提现4次。</p>
          <p>4.提现申请提交后3个工作日内退回至账户。</p>
        </div>
      </div>
    </div>
    <div class="withdraw-viewer">
      <div class="withdraw-title">
        <h4>提现记录</h4>
      </div>
      <div class="withdraw-content full">
        <div class="withdraw-content__row">
          <div class="withdraw-table">
            <div class="withdraw-table__header">
              <div v-for="(item, index) in tableTitle" :key="index" :class="index === 1 ? '-align-right' : ''" class="-column">{{item}}</div>
            </div>
            <div class="withdraw-table__body">
              <div v-for="(item, index) in tableData" :key="index" class="-row">
                <div class="-column">{{item.flowNo}}</div>
                <div class="-column -exclude -align-right">{{toThousands(item.amount)}}</div>
                <div class="-column">{{item.accountType === 1 ? '银行' : (item.accountType === 2 ? '支付宝' : '微信')}}</div>
                <div class="-column">{{item.remitTime}}</div>
                <div class="-column">{{item.createTime}}</div>
                <div class="-column">{{item.payeeAccount}}</div>
                <div class="-column">{{convertStatus(item.status)}}</div>
                <div class="-column">{{item.reason}}</div>
                <div class="-column -exclude">
                  <span class="-link" v-if="item.status === '1'" @click="confirm(1)">提醒</span>
                  <span class="-link" v-if="item.status === '2'" @click="confirm(2)">确认</span>
                  <span class="-link" v-if="item.status === '3' || item.status === '6'" @click="confirm(3)">申诉</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ns-dialog title="提醒" :visible.sync="dialogVisableTips" width="384px">
      <div class="withdraw-container">
        <p>您的提醒通知已发送，平台会尽快为您服务，感谢您对平台的支持。</p>
      </div>
    </ns-dialog>
    <ns-dialog title="提现确认" :visible.sync="dialogVisableConfirm" width="384px">
      <div class="withdraw-container">
        <p>您的提现已完成，感谢您对平台的支持。</p>
      </div>
    </ns-dialog>
    <ns-dialog title="提现申述" :visible.sync="dialogVisableReason" width="484px">
      <div class="withdraw-container">
        <div class="show-from">
          <div class="-row">
            <label for=""><span class="require">*</span>申述人：</label>
            <span>{{`企页名称`}}</span>
          </div>
          <div class="-row">
            <label for=""><span class="require">*</span>联系手机：</label>
            <input maxlength="11" type="text">
          </div>
          <div class="-row">
            <label for=""><span class="require">*</span>申述说明：</label>
            <textarea name=""></textarea>
          </div>
          <div class="-row">
            <label for=""></label>
            <span>{{`申述结果将通过站内容通知您，请注意查收`}}</span>
          </div>
        </div>
      </div>
    </ns-dialog>
    <ns-dialog title="输入密码" :visible.sync="dialogVisableCode" width="420px">
      <div class="mima">
        <h4>请输入六位支付密码。</h4>
        <code-box @code="getCode" :isWarning="isWarning" v-if="dialogVisableCode"></code-box>
        <p class="text-nomal">忘记密码？</p>
      </div>
    </ns-dialog>
  </div>
</template>

<script>
  import codeBox from '@/components/public/paymentBox'
  import nsDialog from './dialog'
  export default {
    name: '',
    data () {
      return {
        tableTitle: ['交易流水号', '金额（￥）', '类型', '打款时间', '创建时间', '收款人账号', '状态', '原因', '操作'],
        tableData: [],
        dialogVisableTips: false,
        dialogVisableConfirm: false,
        dialogVisableReason: false,
        dialogVisableCode: false,
        isWarning: false,
        ruleForm: {
          bank: '中国工商银行',
          amount: '',
          checked: false,
          payType: '网银',
          account: '',
          name: ''
        }
      }
    },
    props: ['balance'],
    components: {
      codeBox, nsDialog
    },
    mounted () {
      this.getDetails()
    },
    methods: {
      withdraw () {
        let type = this.ruleForm.payType === '网银' ? '2' : (this.ruleForm.payType === '支付宝' ? '3' : '4')
        let notNullAmount = this.$inputCheck().check('notNull', '提现金额', this.ruleForm.amount)
        let isNumber = this.$inputCheck().check('number', '提现金额', this.ruleForm.amount)
        let notNullAccount = this.$inputCheck().check('notNull', '提现账号', this.ruleForm.account)
        let notNullName = this.$inputCheck().check('notNull', '账户名称', this.ruleForm.name)
        if (notNullAmount) {
          this.$message.error(notNullAmount)
        } else if (isNumber) {
          this.$message.error(isNumber)
        } else if (notNullAccount && type === '2') {
          this.$message.error(notNullAccount)
        } else if (notNullName && type === '2') {
          this.$message.error(notNullName)
        } else {
          let data = {
            url: '/api/sp/wallet/withdraw',
            method: 'post',
            params: {
              type: type,
              amount: this.ruleForm.amount,
              account: this.ruleForm.account || '',
              name: this.ruleForm.name || '',
              bank: this.ruleForm.bank || ''
            }
          }
          this.$ajax(data).then(res => {
            if (res.data.code === 200) {
              this.$message.success('提现成功')
            }
          })
        }
      },
      convertStatus (type) {
        let result = ''
        if (type === '1') {
          result = '申请中'
        } else if (type === '2') {
          result = '通过审核'
        } else if (type === '3') {
          result = '审核失败'
        } else if (type === '4') {
          result = '打款中'
        } else if (type === '5') {
          result = '打款成功'
        } else if (type === '6') {
          result = '打款失败'
        }
        return result
      },
      cash (type) {
        this.dialogVisableCode = true
      },
      getCode (e) {
        // TODO  支付逻辑
        if (e !== '123456') {
          this.isWarning = true
        }
      },
      getDetails () {
        this.$ajax.get('/api/sp/wallet/withdraws?page=' + 1).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.details
          }
        })
      },
      confirm (type) {
        if (type === 1) {
          this.dialogVisableTips = true
        } else if (type === 2) {
          this.dialogVisableConfirm = true
        } else if (type === 3) {
          this.dialogVisableReason = true
        }
      },
      reset () {
        this.dialogVisableReason = false
      }
    }
  }
</script>
<style lang='less' scope>
  @text-nomal: #EB6100;
  .text-nomal {
    color: @text-nomal;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      .ns-tab-hover(#EB6100, txt)
    }
  }
  .withdraw-wraper {
    .withdraw-viewer {
      background: #fff;
      .withdraw-title {
        padding: 11px 21px 5px 21px;
        border-bottom: 1px solid #e8e8e8;
        h4 {
          padding: 12px 16px;
        }
      }
      .withdraw-content {
        // min-width: 650px;
        width: 750px;
        margin: 0 auto;
        padding: 30px 20px 20px;
        &.full {
          width: 100%;
        }
        .withdraw-content__row {
          margin-bottom: 30px;
          position: relative;
          &.text-content {
            padding-left: 100px; 
          }
          &.input-content {
            &>input {
              padding-left: 8px;
            }
          }
          &>.title {
            color: #666;
            font-size: 14px;
            width: 110px;
            display: inline-block;
            &>.require {
              color: #FF0404
            }
            &+span{
              color: #666;
              font-size: 14px;
            }
          }
          input {
            background:rgba(255,255,255,1);
            border:1px solid rgba(220,220,220,1);
            border-radius:4px;
            width: 224px;
            height: 28px;
            padding: 2px 0 2px 20px;
            outline: none;
            color: #666;
            font-size: 14px;
            &:focus {
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              border-color: #409eff
            }
          }
          &>.ns-iconfont {
            margin-left: 5px;
            color: #BBBBBB;
          }
          &>.rmb {
            position: absolute;
            font-size: 12px;
            margin-top: 7px;
          }
          &>.view {
            text-align: center;
            color: #666;
            margin-bottom: 50px;
            h4 {
             margin-bottom: 10px
            }
            p {
              font-size: 30px;
              font-weight: bolder;
              &>span {
                margin-left: 5px;
              }
            }
          }
          &>.handler {
            display: flex;
            justify-content: space-around;
            .handler-item {
              text-align: center;
              color: #666;
              &>h5 {
                margin-bottom: 20px;
              }
              &>p {
                margin-bottom: 36px;
                &>span {
                  font-weight: bolder
                }
              }
              &>.btn {
                // width: 78px;
                margin: 0 auto;
                &.btn-orange {
                  .ns-button(o, medium)
                }
              }
            }
          }
          .withdraw-table {
            font-size: 14px;
            .withdraw-table__header {
              background: #FAFAFA;
              text-align: center;
              height: 43px;
              line-height: 43px;
              border-bottom: 1px solid #e8e8e8;
              display: flex;
              color: #333;
              // align-items: center
            }
            .withdraw-table_body {
              text-align: center;
            }
            .-row {
              height: 43px;
              line-height: 43px;
              border-bottom: 1px solid #e8e8e8;
              display: flex;
              text-align: center;
              color: #666;
              &:last-of-type {
                border: none
              }
            }
            .-column {
              flex: 0 0 10%;
              max-width: 10%;
              &:not(.-exclude) {
                .ns-truncate;
              }
              &.-align-right {
                text-align: right;
                padding-right: 30px;
              }
              &:nth-of-type(2) {
                flex: 0 0 12%;
                max-width: 12%;
              }
              &:nth-of-type(6) {
                flex: 0 0 12%;
                max-width: 12%;
              }
              .-link {
                color: #eb6100;
                // text-decoration: underline;
                margin: 0 5px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .withdraw-footer {
      background: #fff;
      margin-bottom: 20px;
      .withdraw-desc-wraper {
        border-top: 1px solid #e8e8e8;
        margin: 0 20px;
        .withdraw-desc {
          padding: 20px 50px;
          font-size: 14px;
          &>h4 {
            margin-bottom: 5px;
            color: #666;
          }
          &>p {
            margin-bottom: 5px;
            color: #999
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .withdraw-container {
    &>p {
      margin: 5px 0;
      font-size: 14px;
      color: #666
    }
    &>.show-from {
      padding: 0 15px;
      font-size: 14px;
      color: #666;
      &>.-row {
        margin: 10px 0;
        display: flex;
        align-items: flex-start;
        .require {
          color: rgb(233, 5, 5)
        }
        &>input, textarea {
          width: 224px;
          height: 28px;
          background:rgba(255, 255, 255, 1);
          border: 1px solid rgba(220, 220, 220, 1);
          border-radius: 4px;
          color: #666;
          outline: none;
          padding-left: 4px;
          &:focus {
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            border-color: #409eff
          }
        }
        &>textarea {
          height: 96px;
        }
        &>label {
          flex: 0 0 20%;
          text-align: right;
          margin-right: 5px
        }
      }
    }
  }
  .mima {
    min-height: 134px;
    &>h4 {
      text-align: center;
      font-size: 14px;
      color: #666;
      margin-bottom: 40px;
    }
    &>p {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
