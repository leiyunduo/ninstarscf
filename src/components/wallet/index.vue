<template>
  <div class="wallet-wraper">
    <div class="wallet-viewer">
      <div class="wallet-panel-wraper">
        <div class="wallet-panel">
          <div class="wallet-panel__item">
            <div class="panel-item__title">
              <span>预警阈值</span>
            </div>
            <div class="panel-item__content font-mid">
              <label>￥</label><span>{{toThousands(ruleForm.threshold)}}</span>
            </div>
            <div class="panel-item__handler">
              <label>可用额度预警
                <el-tooltip placement="top" popper-class='tool'>
                  <div slot="content" class="tool-tips">
                    <p>当您账户可用额度低于预警阈值时，每天短信提醒一次。</p>
                  </div>
                  <i class="ns-iconfont ns-icon-tips"></i>
                </el-tooltip>
              </label>
              <el-switch @change="changeDelivery(ruleForm.balance)" v-model="ruleForm.delivery"></el-switch>
            </div>
          </div>
          <div class="wallet-panel__item" style="text-align: center">
            <div class="panel-item__title">
              <span>余额</span>
            </div>
            <div class="panel-item__content font-big">
              <label>￥</label><span>{{toThousands(ruleForm.balance)}}</span>
            </div>
            <div class="panel-item__handler">
              <!-- <span class="text-nomal">收支明细</span> -->
            </div>
          </div>
          <div class="wallet-panel__item nav">
            <div class="panel-item__handler">
              <div class="btn-handler">
                <div @click="link(index+1)" class="btn" :class="tabIndex === index ? 'btn-orange' : 'btn-white'" v-for="(item, index) in btnList" :key="index">{{item}}</div>
                <div v-show="select" @click="goSelect" class="btn btn-white">选项</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wallet-content full">
        <div v-if="showIndex === 0" class="wallet-card-wraper">
          <div class="wallet-card">
            <div class="wallet-card__item">
              <div class="card-item__row">
                <h4>可用代金券</h4>
              </div>
              <div class="card-item__row">
                <label class="number">{{0}}</label><label>（个）</label>
              </div>
              <div class="card-item__row">
                <span class="text-nomal">代金券管理</span>
              </div>
            </div>
            <div class="wallet-card__item">
              <div class="card-item__row">
                <h4>可索取发票总额</h4>
              </div>
              <div class="card-item__row">
                <label class="number">{{toThousands(0)}}</label><label>（￥）</label>
              </div>
              <div class="card-item__row">
                <span class="text-nomal">索取发票</span>
              </div>
            </div>
            <div class="wallet-card__item">
              <div class="card-item__row">
                <h4>电子版合同</h4>
              </div>
              <div class="card-item__row">
                <label class="number">{{0}}</label><label>（份）</label>
              </div>
              <div class="card-item__row">
                <span class="text-nomal">申请合同</span>
              </div>
            </div>
          </div>
          <div class="withdraw-table-wraper">
            <h4 class="withdraw-table-title">
              收支明细
            </h4>
            <div class="withdraw-table">
              <div class="withdraw-table__header">
                <div v-for="(item, index) in tableTitle" :key="index" class="-column">{{item}}</div>
              </div>
              <div class="withdraw-table__body" v-if="tableData.length > 0">
                <div v-for="(item, index) in tableData" :key="index" class="-row">
                  <div class="-column">{{item.flowNo}}</div>
                  <div class="-column">{{item.type === 1 ? '充值' : item.type === 2 ? '消费' : '提现'}}</div>
                  <div class="-column -align-right">{{toThousands(item.amount)}}</div>
                  <div class="-column">{{item.createTime}}</div>
                  <div class="-column">{{item.description}}</div>
                </div>
              </div>
              <div class="withdraw-table__body" v-else>
                <div class="-row" style="justify-content: center"><span>暂无数据</span></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showIndex === 1">
          <recharge></recharge>
        </div>
        <div v-if="showIndex === 2">
          <withdraw :balance="ruleForm.balance"></withdraw>
        </div>
      </div>
      <ns-dialog title="设置密码" ref="dialog" @reset="onReset" @submit="onSubmit" :visible.sync="dialogPassword" width="484px">
        <div class="show-from">
          <div class="-row">
            <label for=""><span class="require">*</span>密保问题：</label>
            <input maxlength="11" v-model="ruleFormPwd.question" placeholder="请输入安全问题?" type="text">
            <el-tooltip placement="top" popper-class='tool'>
              <div slot="content" class="tool-tips">
                <p>安全问题可用于密码找回</p>
              </div>
              <i class="ns-iconfont ns-icon-tips tips-pwd"></i>
            </el-tooltip>
          </div>
          <div class="-row">
            <label for=""><span class="require">*</span>密保答案：</label>
            <input maxlength="11" v-model="ruleFormPwd.answer" type="text">
          </div>
          <div class="-row">
            <label for=""><span class="require">*</span>支付密码：</label>
            <input maxlength="11" v-model="ruleFormPwd.pwd" type="password">
          </div>
          <div class="-row">
            <label for=""><span class="require">*</span>确认密码：</label>
            <input maxlength="11" v-model="ruleFormPwd.confirmPwd" type="password">
          </div>
        </div>
      </ns-dialog>
    </div>
  </div>
</template>

<script>
  import recharge from './recharge'
  import withdraw from './withdraw'
  import nsDialog from './dialog'
  import sha512 from 'js-sha512'
  export default {
    name: '',
    components: {
      recharge, withdraw, nsDialog
    },
    data () {
      return {
        textEditor: false,
        dialogPassword: false,
        limit: 10000,
        btnList: ['充值', '提现', '退款'],
        tableTitle: ['流水号', '类型', '金额', '操作时间', '描述'],
        tableData: [],
        tabIndex: -1,
        showIndex: 0,
        ruleForm: {
          delivery: true,
          balance: 0,
          threshold: 0,
          security: false
        },
        ruleFormPwd: {
          question: '',
          answer: '',
          pwd: '',
          confirmPwd: ''
        }
      }
    },
    mounted () { 
      this.getBalance()
      this.details()
    },
    computed: {
      select () {
        return this.tabIndex !== -1
      }
    },
    methods: {
      onSubmit (fadeOut) {
        let notNullQues = this.$inputCheck().check('notNull', '密保问题', this.ruleFormPwd.question)
        let notNullAnswer = this.$inputCheck().check('notNull', '密保答案', this.ruleFormPwd.answer)
        let notNullPwd = this.$inputCheck().check('notNull', '支付密码', this.ruleFormPwd.pwd)
        let notNullConfirmPwd = this.$inputCheck().check('notNull', '确认密码', this.ruleFormPwd.confirmPwd)
        let result = notNullQues || notNullAnswer || notNullPwd || notNullConfirmPwd
        if (result) {
          this.$message.error(result)
        } else if (this.ruleFormPwd.confirmPwd !== this.ruleFormPwd.pwd) {
          this.$message.error('支付密码不一致，请重新输入')
        } else {
          let obj = {
            url: '/api/sp/wallet/infomation/setting',
            method: 'post',
            params: {
              payPwd: sha512(this.ruleFormPwd.pwd),
              question: this.ruleFormPwd.question,
              answer: this.ruleFormPwd.answer
            }
          }
          this.$ajax(obj).then(res => {
            if(res.data.code === 200) {
              this.$message.success('设置成功') 
            } else {
              this.$message.error(res.data.message)
            }
            fadeOut()
            for (var i in this.ruleFormPwd) {
              this.ruleFormPwd[i] = ''
            }
          })
        }
      }, 
      onReset () {
        this.dialogPassword = false
      }, 
      link (type) {
        this.tabIndex = type - 1
        this.showIndex = type
      },
      goSelect () {
        this.tabIndex = -1
        this.showIndex = 0
      },
      getBalance () {
        this.$ajax.get('/api/sp/wallet/balance').then(res => {
          if (res.data.code === 200) {
            this.ruleForm.balance = res.data.data.balance
            this.ruleForm.threshold = res.data.data.threshold
            this.ruleForm.security = res.data.data.security
            this.ruleForm.delivery = res.data.data.threshold === 0 ? false : true
            if (!this.ruleForm.security) this.dialogPassword = true
          }
        })
      },
      details () {
        this.$ajax.get('/api/sp/wallet/transaction/record?page=' + 0).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.details
          }
        })
      },
      changeDelivery (balance) {
        status = this.ruleForm.delivery ? 1 : 0
        let obj = {
          method: 'post',
          url: '/api/sp/wallet/balance/alert',
          params: {
            status: status,
            balance: balance
          }
        }
        this.$ajax(obj).then(res => {
          if (res.data.code === 200) {
            // TODO
          } else {
            this.$message.error(res.data.message)
            this.ruleForm.delivery = true
          }
        })
      }
    }
  }
</script>
<style lang='less' scope>
  @text-nomal: #EB6100;
  .text-nomal {
    color: @text-nomal;
    cursor: pointer;
    &:hover {
      .ns-tab-hover(#EB6100, txt)
    }
  }
  .wallet-wraper {
    .wallet-viewer {
      .wallet-panel-wraper {
        padding: 38px 100px 21px;
        background: #fff;
        min-height: 150px;
        .wallet-panel {
          display: flex;
          justify-content: space-between;
          .wallet-panel__item {
            &.nav {
              display: flex;
              align-items: flex-end
            }
            .panel-item__title {
              color: #999999;
              margin-bottom: 10px;
            }
            .panel-item__content {
              margin-bottom: 20px;
              &.font-mid {
                font-size: 18px;
              }
              &.font-big {
                font-size: 28px;
              }
              label {
                margin-right: 5px
              }
            }
            .panel-item__handler {
              label {
                color: #666;
                margin-right: 10px;
                i {
                  margin-left: 5px;
                }
              }
              .btn-handler {
                display: flex;
                align-items: flex-end;
                .btn {
                  margin-right: 25px;
                  &.btn-orange {
                    .ns-button(o, medium);
                  }
                  &.btn-white {
                    .ns-button(w, medium);
                  }
                }
              }
            }
          }
        }
      }
      .wallet-content {
        padding: 20px;
        &.full {
          width: 100%;
        }
        .wallet-card-wraper {
          .wallet-card {
            display: flex;
            .wallet-card__item {
              width:428px;
              height:160px;
              background: #fff;
              margin: 20px;
              padding: 29px 40px 20px;
              .card-item__row {
                margin-bottom: 20px;
                h4,label {
                  color: #666;
                }
                .number {
                  font-size: 24px;
                  margin-right: 5px;
                }
              }
            }
          }
          .withdraw-table-wraper {       
            margin-top: 50px;
            padding: 0 20px;
            .withdraw-table-title {
              font-size: 18px;
              padding-left: 8px;
              border-left: 4px solid #eb6100;
              background: #f5f7f8;
            }
            .withdraw-table {
              background: #fff;
              font-size: 14px;
              margin-top: 20px;
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
                flex: 0 0 20%;
                .-link {
                  color: #eb6100;
                  // text-decoration: underline;
                  margin: 0 5px;
                  cursor: pointer;
                }
                &.-align-right {
                  text-align: right;
                  padding-right: 7%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang='less'>
  .panel-item__handler .el-switch.is-checked .el-switch__core {
    border-color: #eb6100 !important;
    background-color: #eb6100 !important;
  }
  .show-from {
    padding: 0 15px;
    font-size: 14px;
    color: #666;
    .tips-pwd {
      margin-top: 4px;
      margin-left: 5px;
    }
    &>.-row {
      margin: 13px 0;
      display: flex;
      align-items: flex-start;
      .require {
        color: rgb(233, 5, 5)
      }
      &>input {
        width: 224px;
        height: 28px;
        background:rgba(255, 255, 255, 1);
        border: 1px solid rgba(220, 220, 220, 1);
        border-radius: 4px;
        color: #666;
        outline: none;
        font-size: 12px;
        padding-left: 4px;
        &:focus {
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          border-color: #409eff
        }
      }
      &>label {
        flex: 0 0 20%;
        text-align: right;
        margin-right: 5px
      }
    }
  }
</style>