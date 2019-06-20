<template>
  <div class="online-wraper">
    <div class="online-inner" v-show="true">
      <div class="online-viewer">
        <div class="online-content">
          <div class="online-content__row">
            <p class="content-tooltips">
              九星平台目前仅支持企业网银充值,如没有适合您的网银请选择线下汇款方式支付。
            </p>
          </div>
          <div class="online-content__row text-content">
            <label class="title" for=""><span class="require">*</span>充值金额：</label>
            <i class="rmb ns-iconfont ns-icon-rmb"></i>
            <input maxlength="16" v-model="ruleForm.value" type="text">
            <el-tooltip placement="right" popper-class='tool'>
              <div slot="content" class="tool-tips">
                <p>充值最大额度限制，依据第三方额度要求。</p>
                <p>充值金额必须是大于0的整数或者两位以内的小数。</p>
              </div>
              <i class="ns-iconfont ns-icon-tips"></i>
            </el-tooltip>
          </div>
          <div class="online-content__row text-content">
            <label class="title" for=""><span class="require">*</span>支付方式：</label>
            <el-radio-group v-model="ruleForm.payType">
              <el-radio label="网银"></el-radio>
              <el-radio label="支付宝"></el-radio>
              <el-radio label="微信"></el-radio>
            </el-radio-group>
          </div>
          <div class="online-content__row text-content" v-if="ruleForm.payType === '网银'">
            <label class="title" for=""><span class="require">*</span>选择银行：</label>
            <el-radio-group v-model="ruleForm.bank">
              <el-radio label="中国建设银行"></el-radio>
              <el-radio label="中国农业银行"></el-radio>
              <el-radio label="浦发银行"></el-radio>
              <el-radio label="中国工商银行"></el-radio>
            </el-radio-group>
          </div>
          <div class="online-content__row text-content">
            <el-checkbox v-model="ruleForm.checked" name="type"></el-checkbox><label style="margin-left: 5px;" class="title" for=""><span class="require">*</span>我已了解：</label>
            <span>三个月内通过网银方式充值的款项只能原路提现。</span>
          </div>
          <div class="online-content__row">
            <div class="btn" @click="payment()" :class="ruleForm.checked ? 'btn-blue' : 'btn-disable'">充值</div>
          </div>
        </div>
      </div>
      <div class="online-footer">
        <div class="online-desc">
          <h4>提现规则</h4>
          <p style="margin-bottom: 15px">为了保证账户资金安全，九星账号必须完成实名认证才可以进行提现。注意：请务必使用与您相符的实名认证账号进行业务操作。如果您借用非同名的实名认证账号进行业务操作，后续可能发生资金归属纠纷，给您带来经济损失。</p>
          <p>提现包括原路、实名认证主体提现两种方式：</p>
          <p>1、原路提现：三个月内通过网银充值的资金可以原路提现；默认后进先出方式并支持按指定三个月内的任意流水提现。</p>
          <p>2、实名认证主体提现：充值超过三个月的网银充值资金、专属账号汇款资金、历史充值资金只能提现至阿里云账号实名认证同名账户的银行卡。</p>
          <p style="margin-left: 8px">
            1） 如果是个人实名认证用户，其账号内来源于信用卡的资金只能提现至与实名认证信息同名的银行信用卡，非信用卡来源的资金可提现至与实名认证信息同名的银行账号。
          </p>
          <p style="margin-left: 8px">
            2） 如果是企业实名认证用户，账号内资金可提现至与账号实名认证信息一致的同名银行账号。
          </p>
          <p>申请提现后的款项将在三个工作日内到账，具体银行的到账时间受银行网关影响会有差异，具体到账时间以银行的实际到账时间为准。</p>
          <p>单次提现金额上限额度要求，提现频率要求。</p>
        </div>
      </div>
    </div>
    <div class="online-result-wraper" v-show="false">
      <div class="online-result">
        <div class="online-result__content" v-show="0">
          <div class="result-line text-center">
            <img src="../../../../static/img/settings/send_ok.png" alt="">
            <p>充值成功</p>
          </div>
          <div class="result-line flex">
            <div>
              <p><label for="">储蓄卡:</label><span>{{`12345678942`}}</span></p>
              <p><label for="">充值金额:</label><span>¥ {{toThousands(1)}}</span></p>
            </div>
          </div>
          <div class="result-line">
            <div class="btn btn-orange">完成</div>
          </div>
        </div>
        <div class="online-result__content" v-show="0">
          <div class="result-line text-center">
            <img src="../../../../static/img/settings/send_fail.png" alt="">
            <p>充值失败</p>
          </div>
          <div class="result-line">
            <div class="btn btn-orange">返回</div>
          </div>
        </div>
        <div class="online-result__content" v-show="1">
          <div class="result-line text-center">
            <h4 class="">充值等待中...</h4>
          </div>
          <div class="result-line text-center">
            <span class="tips">钱还在路上，请您耐心等待</span>
          </div>
          <div class="result-line">
            <div class="btn btn-orange">刷新</div>
          </div>
        </div>
      </div>
      <div class="online-result__tips">
        <span>联系我们：400-100-1100</span>
      </div>
    </div>
    <ns-dialog title="充值" @close="onFail()" @submit="onSubmit()" :visible.sync="dialogVisableConfirm" resetTxt="失败" submitTxt="成功" width="484px">
      <div class="show-confirm">
        <p>请您在新打开的页面上完成充值。</p>
        <p>充值完成后，根据您的情况点击下面按钮。</p>
      </div>
    </ns-dialog>
    <ns-dialog title="支付" :visible.sync="visibleDialog" width="484px">
      <div slot="content">
        <p>Hewssss</p>
      </div>
    </ns-dialog>
    <form id="submit" :action="payable.url" method="post">
      <input name="message" type="hidden" v-model="payable.message">
      <input name="signature" type="hidden" v-model="payable.signature">
    </form>
  </div>
</template>

<script>
  import nsDialog from '../dialog'
  export default {
    name: '',
    components: {
      nsDialog
    },
    data () {
      return {
        radioList: [
          {name: '中国建设银行', value: '中国建设银行'},
          {name: '中国农业银行', value: '中国农业银行'},
          {name: '浦发银行', value: '浦发银行'},
          {name: '中国工商银行', value: '中国工商银行'}
        ],
        subscribe: false,
        dialogVisableTip: false,
        dialogVisableConfirm: false,
        ruleForm: {
          bank: '中国工商银行',
          value: '',
          checked: false,
          payType: '网银'
        },
        visibleDialog: false,
        payable: {
          url: '',
          message: '',
          signature: ''
        }
      }
    },
    methods: {
      payment () {
        let notNull = this.$inputCheck().check('notNull', '充值金额', this.ruleForm.value)
        let isNumber = this.$inputCheck().check('number', '充值金额', this.ruleForm.value)
        if(notNull) {
          this.$message.error(notNull)
        } else {
          if (isNumber) {
            this.$message.error(isNumber)
          } else {
            let param = {
              url: '/api/sp/wallet/recharge',
              method: 'POST',
              params: {
                type: this.ruleForm.payType === '网银' ? '2' : (this.ruleForm.payType === '支付宝' ? '3' : '4'),
                amount: this.ruleForm.value,
                bank: this.ruleForm.bank
              }
            }
            this.recharge(param)
          }
        }
      },
      onFail () {
        this.dialogVisableConfirm = false
      },
      onSubmit () {
        this.dialogVisableConfirm = false
        this.$emit('paySuccess')
      },
      recharge (param) {
        this.$ajax(param).then(res => {
          if(res.data.code = 200) {
            this.dialogVisableConfirm = true
            console.log(param)
            if(param.params.type === '2') {
              window.open('#/wallet/recharge?url=' + encodeURIComponent(res.data.data.payOrder.url) + '&message=' + encodeURIComponent(res.data.data.payOrder.message) + '&signature=' + encodeURIComponent(res.data.data.payOrder.signature), '_blank')
            } 
          }
        })
      }
    }
  }
</script>
<style lang='less' scope>
  .show-tips {
    &>p {
      margin: 5px 0;
    }
  }
  @text-nomal: #EB6100;
  .text-nomal {
    color: @text-nomal;
    cursor: pointer;
    &:hover {
      .ns-tab-hover(#EB6100, txt)
    }
  }
  .tool-tips {
    p {
      margin-bottom: 5px; 
      &:last-of-type {
        margin: 0;
      }
    }
  }
  .online-wraper {
    .online-viewer {
      padding: 40px 0 65px;
      border-bottom: 1px solid #dddddd;
      .online-content {
        min-width: 650px;
        width: 650px;
        margin: 0 auto;
        .online-content__row {
          margin-bottom: 30px;
          position: relative;
          &.text-content {
            padding-left: 20px; 
          }
          .content-tooltips {
            padding: 8px 15px;
            background: #E6F7FF;
            border:1px solid rgba(145,213,255,1);
            border-radius:4px;
            color: #333333;
            font-size: 14px;
            width: 94%;
            &::before {
              content: "i";
              display: inline-block;
              width: 16px;
              height: 16px;
              color: #fff;
              background: #409eff;
              border-radius: 50%;
              margin-right: 8px;
              text-align: center;
              line-height: 16px;
            }
          }
          &>.title {
            color: #666;
            font-size: 14px;
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
            width:224px;
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
          &>.btn {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            &.btn-blue {
              .ns-button(b, small)
            }
            &.btn-disable {
              .ns-button(disable, small);
              pointer-events: none
            }
          }
        }
      }
    }
    .online-footer {
      .online-desc {
        padding: 20px 40px 0;
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
    .online-result-wraper {
      .online-result {
        width: 50%;
        margin: 0 auto;
        min-height: 600px;
        .online-result__content {
          padding: 120px 0 150px;
          .result-line {
            margin-bottom: 10px;
            &.text-center {
              text-align: center;
            }
            &.flex {
              display: flex;
              justify-content: center;
              &>div {
                &>p {
                  margin-bottom: 10px;
                  &>label,span {
                    color: #666;
                    font-size: 14px;
                  }
                  &>label {
                    display: inline-block;
                    width: 70px;
                    text-align: right;
                    margin-right: 8px;
                  }
                }
              }
            }
            &>img {
              width: 72px;
            }
            &>h4 {
              color: #333333;
              font-size: 24px;
              font-weight: bolder;
              margin-bottom: 50px;
            }
            &>.tips {
              color: #666;
              font-size: 14px;
            }
            &>p {
              font-size: 24px;
              color: #333;
              font-weight: bold;
              margin-bottom: 20px;
            }
            &>.btn {
              width: 60px;
              text-align: center;
              margin: 60px auto 0;
              &.btn-orange {
                .ns-button(o, medium)
              }
            }
          }
        }
      }
      .online-result__tips {
        width: 50%;
        text-align: center;
        margin: 0 auto;
        font-size: 14px;
        color: #999;
      }
    }
  }
</style>

<style lang="less">
  .show-confirm {
    font-size: 14px;
    min-height: 134px;
    &>p {
      color: #666;
      margin-bottom: 10px;
    }
  } 
</style>