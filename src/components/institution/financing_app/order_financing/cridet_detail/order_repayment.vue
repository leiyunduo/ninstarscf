<template>
  <!-- 融资申请 -->
  <div id="financing_application">
    <div class="financing_application_list">
      <!-- 还款 -->
      <div class="repayment" v-if='action_btn === 0'>
        <div class="title"><h3>还款情况</h3></div>
        <div class="show_tip">{{repaymentInfo}}</div>
        <div class="repayment_form">
          <div class="form_line">
            <div class="repayment_item">
              <span>应还总额（元）</span>
              <span>{{repayment.value}}</span>
            </div>
            <div class="repayment_item">
              <span>还款企业</span>
              <span>{{business}}</span>
            </div>
            <div class="repayment_item">
              <span>收款机构</span>
              <span>{{institution}}</span>
            </div>
          </div>
          <div class="form_line">
            <div class="repayment_item">
              <span>还款利率</span>
              <span>{{repayment.rate + '%'}}</span>
            </div>
            <div class="repayment_item">
              <span>还款机构</span>
              <span>{{repayment.company}}</span>
            </div>
            <div class="repayment_item">
              <span>收款账号</span>
              <span>{{repayment.account}}</span>
            </div>
          </div>
          <div class="form_line">
            <div class="repayment_item">
              <span>还款时间</span>
              <span>{{repayment.repayment_date}}</span>
            </div>
            <div class="repayment_item">
              <span>还款账号</span>
              <span>{{repayment.reaccount}}</span>
            </div>
          </div>
          <div class="form_line">
            <div class="repayment_item">
              <span>还款证明</span>
              <img v-if='repayment.showImg' :src="$root_url() + repayment.showImg" alt="">
            </div>
          </div>
          <div class="tab_btn" v-if="riskStatus === '701'">
            <button @click="handleSubmit()">确认</button>
            <p>
              <span @click="handleRefuse()">拒绝确认本次还款信息</span>
            </p>
          </div>
          <div class="feed_back" v-if='riskStatus === "702"'>
            <p class="feedback_title">还款确认反馈</p>
            <p class="feedback_content" v-if="!refause">
              您已<span class="sure">确认</span>了{{business}}的还款信息，本次融资流程已结束。
            </p>
            <p class="feedback_content" v-if="refause">
              您已<span style="color: #ff0034">拒绝确认</span>{{business}}的还款信息，本次融资流程已结束。
            </p>
          </div>
        </div>
      </div>
      <!-- 展期 -->
      <div class="extend" v-if='action_btn === 1'>
        <div class="title">
          <h3>展期申请</h3>
        </div>
        <div class="extend_board">
          <div>
            <span>展期时间</span>
            <span>{{extend.extend_date}}</span>
          </div>
          <div>
            <span>展期原因</span>
            <p>{{extend.extend_reason}}</p>
          </div>
          <div class="extend_feedback" v-if="riskStatus !== '600'">
            <p>展期申请反馈</p>
            <p v-if="riskStatus === '601'">您<span class="sure">同意</span>了{{business}}的展期申请。</p>
            <p v-if="saveState === '602'">您<span class="unsure">决绝</span>了{{business}}的展期申请。</p>
            <div class="tip_list">
              <button v-if="!hasTip" @click="handleTip">催付提醒</button>
              <button @click="handleHelp" v-if='helpStatus === "1" || helpStatus === "5" '>申请助贷赔偿</button>
            </div>
          </div>
          <div class="tab_btn" v-if="riskStatus === '600'">
            <button @click='handleExtend("601")'>同意</button>
            <button @click='handleExtend("602")' class="refuse">拒绝</button>
          </div>
        </div>
      </div>
      <!-- 无任何操作 -->
      <div class="no_operate" v-if="action_btn === 2">
        <div>{{repaymentInfo}}</div>
        <p>申请企业还未填写还款信息及上传还款证明，若申请企业没有及时还款，您可对其进行催付提醒</p>
        <div v-if="helpStatus === '0'" class='help_status'>助贷基金还未受理企业的助贷申请。</div>
        <div v-if="helpStatus === '1'" class='help_status'>当前融资有助贷基金作为担保，您可以发送赔付申请到助贷基金。</div>
        <div v-if="helpStatus === '3'" class='help_status'>助贷基金对你的赔付申请正在审理中。</div>
        <div v-if="helpStatus === '4'" class='help_status'>助贷基金已经<span style="color: green;">通过</span>您的赔付申请。</div>
        <div v-if="helpStatus === '5'" class='help_status'>助贷基金已经<span style="color: #ff0300;">拒绝</span>您的赔付申请。</div>
        <div class="tip_list">
          <button v-if="!hasTip" @click="handleTip">催付提醒</button>
          <button @click="handleHelp" v-if="helpStatus === '1' || helpStatus === '5'">申请助贷赔偿</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderRepayment',
  data () {
    return {
      URL: this.$root_url(),
      action_btn: 0,
      riskStatus: '700',
      saveState: '0',
      repayment: {},
      extend: {},
      business: '',
      institution: '',
      extended: 0,
      hasTip: false,
      helpStatus: '0',
      // 拒绝
      refause: false,
      repaymentInfo: '',
      days: 0
    }
  },
  created () {
    const that = this
    that.$ajax.get(`/api/financing/loan_process/${that.$route.query.id}/`).then(res => {
      // console.log(res)
      that.riskStatus = res.data.loan_process_status
      that.saveState = res.data.loan_process_status
      that.institution = res.data.institution
      that.business = res.data.financing_application.business_info.name
      that.hasTip = res.data.is_warm
      that.helpStatus = res.data.financing_application.helping_status
      that.days = res.data.days
      let repaymentInfo = `本次融资金融还款阶段，您填写的应还还款金额为${that.toThousands(res.data.repayment_value)}元`
      if (res.data.financing_application.helping_data.is_agree_aid_paid) repaymentInfo += `，助保贷机构将代替赔付${that.toThousands(res.data.financing_application.helping_data.value)}元`
      that.repaymentInfo = repaymentInfo += '。'
      if (that.riskStatus >= 600 && that.riskStatus < 700) {
        this.action_btn = 1
        this.extend = res.data.loan_info || {}
        this.extended = 1
      } else if (that.riskStatus === '700') {
        this.action_btn = 2
      } else {
        this.repayment = res.data.loan_info || {}
      }
    })
  },
  methods: {
    // 提交还款
    handleSubmit () {
      const that = this
      that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: '702'}).then(res => {
        if (res.status === 200) {
          that.riskStatus = '702'
        }
      })
    },
    // 提交展期
    handleExtend (code) {
      console.log(code)
      const that = this
      that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: code}).then(res => {
        if (res.status === 200) {
          that.riskStatus = code
          that.saveState = code
        }
      })
    },
    // 展期过程中还款
    handleRepayment () {
      this.riskStatus = '700'
      this.action_btn = 0
    },
    handleTip () {
      this.$message.success('提醒成功')
      this.hasTip = true
    },
    // 申请助贷赔付
    handleHelp () {
      const that = this
      // console.log(that.days)
      let hasOverDue = (that.days < 0 || that.days === 0)
      if (hasOverDue) {
        that.$confirm('本次融资已经逾期，将发送到企业申请时提交的进行赔付', '进行赔付').then(res => {
          that.$ajax.put('/api/financing/loan_process/apply_aid_paid/', {loan_process_id: that.$route.query.id}).then(res => {
            if (res.status === 204) {
              that.$message.success('已发送到助保贷机构')
              that.helpStatus = '3'
            }
          })
        })
      } else {
        that.$confirm('本次融资还未逾期，不能发起助贷赔付。', '暂未逾期', {showCancelButton: false, confirmButtonText: '知道了'})
      }
    },
    // 拒绝确认
    handleRefuse () {
      const that = this
      that.$confirm('', '', {message: '企业将要重新上传还款证明', title: '确认拒绝确认', type: 'waring'}).then(res => {
        that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: '700', loan_info: {refuse: true}}).then(res => {
          if (res.status === 200) {
            that.$message.success('拒绝成功')
            that.action_btn = 2
          }
        })
      }).catch(e => e)
      // that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: '700', loan_info: {refuse: true}}).then(res => {
      //   if (res.status === 200) {
      //     that.riskStatus = '702'
      //   }
      // })
    }
  }
}
</script>

<style lang="less" scoped>
#financing_application {
  width:100%;
  // min-height: 100%;
  .financing_application_list {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    margin: 20px 0;
    padding: 20px 50px;
    .title {
      height: 52px;
      border-bottom: 1px solid #e1e6f0;
      padding-top: 20px;
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
      }
    }
    .btn_list {
      display: flex;
      flex-direction: row;
      padding-left: 31px;
      margin: 16px 10px;
      margin-bottom: 0;
      button {
        background:#b7b7b7;
        border-radius:2px;
        width:120px;
        height:30px;
        border: none;
        outline: none;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#ffffff;
        letter-spacing:0;
        text-align:center;
      }
      .action_btn {
        background:#f48537;
      }
      button:last-child {
        margin-left: 16px;
      }
    }
    .repayment {
      .show_tip {
        line-height: 32px;
        color: #666;
      }
      .repayment_form {
        .form_line {
          display: flex;
          min-height: 64px;
          align-items: center;
          .repayment_item {
            width: 27%;
            font-size: 14px;
            display: flex;
            align-items: center;
            span:first-child {
              width: 30%;
              text-align: center;
            }
            span:nth-child(2) {
              width: 68%;
              height: 26px;
              padding: 0 8px;
              line-height: 26px;
              border: 1px solid #eaeaea;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            img {
              max-width: 70%;
              // max-height: 100%;
            }
          }
        }
      }
    }
    .feed_back {
      border-top: 1px solid #e1e6f0;
      margin-top: 30px;
      .feedback_title {
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
        color: #666;
      }
      .feedback_content {
        font-size: 14px;
        line-height: 54px;
        span.sure {
          color: #eb6100;
          font-weight: bold;
          margin:0 2px;
        }
        span.unsure {
          color: #38adff;
          font-weight: bold;
          margin:0 2px;
        }
      }
    }
    .no_operate {
      // height: 160px;
      &>div:first-child {
        color: #666;
        line-height: 36px;
        text-align: center;
        span {
          color: #eb6100;
          font-weight: bolder;
        }
      }
      p {
        line-height: 40px;
        text-align: center;
        color: #999;
      }
      .tip_list {
        padding: 10px 0;
        text-align: center;
        height: 52px;
        button {
          width: 110px;
          height: 32px;
          text-align: center;
          border: none;
          border-radius: 4px;
          background: #eb6100;
          margin: 0 10px;
          color: #fff;
          outline: none;
        }
      }
      .help_status {
        text-align: center;
        line-height: 26px;
        color: #666;
        margin-bottom: 45px;
      }
    }
    .extend {
      .extend_form {
        .extend_line {
          .extend_item {
            width: 20%;
            min-height: 64px;
            display: flex;
            align-items: center;
            span:first-child {
              width: 80px;
              text-align: center;
              font-size: 14px;
            }
            input:nth-child(2) {
              width: 54%;
              outline: none;
              height: 26px;
              padding: 0 8px;
              border: 1px solid #eaeaea;
            }
          }
        }
        .extend_info {
          .extend_item {
            display: flex;
            // align-items: center;
            span:first-child {
              width: 80px;
              height: 26px;
              line-height: 26px;
              text-align: center;
              font-size: 14px;
            }
            textarea {
              height: 145px;
              font-size: 14px;
              width: 40%;
              outline: none;
              border-radius: 4px;
              padding: 4px 8px;
              border: 1px solid #eaeaea;
              resize: none;
            }
          }
        }
      }
      .extend_board {
        border: 1px solid #eaeaea;
        border-top: none;
        padding-top: 25px;
        div:first-child {
          padding: 0 15px;
          line-height: 40px;
          display: flex;
          align-items: center;
          span:first-child {
            color: #666;
            width: 80px;
            text-align: center;
          }
        }
        div:nth-child(2) {
          min-height: 100px;
          padding: 0 15px;
          display: flex;
          padding-bottom: 20px;
          border-bottom: 1px solid #eaeaea;
          // align-items: center;
          span:first-child {
            color: #666;
            width: 80px;
            text-align: center;
            line-height: 40px;
          }
          p:last-child {
            line-height: 40px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
        .extend_feedback {
          p:first-child {
            padding: 0 15px;
            line-height: 36px;
            font-size: 14px;
            font-weight: bold;
          }
          p:nth-child(2) {
            padding: 0 15px;
            height: 105px;
            line-height: 26px;
            font-size: 14px;
            span.suring {
              color: #38adff;
              font-weight: bold;
              margin: 0 3px;
            }
            span.sure {
              color: #eb6100;
              font-weight: bold;
              margin: 0 3px;
            }
            span.unsure {
              color: #ff0010;
              font-weight: bold;
              margin: 0 3px;
            }
          }
          .tip_list {
            padding: 10px 0;
            text-align: center;
            button {
              width: 110px;
              height: 32px;
              text-align: center;
              border: none;
              border-radius: 4px;
              background: #eb6100;
              margin: 0 10px;
              color: #fff;
              outline: none;
            }
          }
        }
      }
    }
    .tab_btn {
      padding: 21px 0;
      text-align: center;
      button {
        width: 120px;
        border: none;
        text-align: center;
        line-height: 30px;
        margin: 0 auto;
        cursor: pointer;
        background: #e87626;
        border-radius: 2px;
        height: 30px;
        font-family: PingFangSC-Semibold;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0;
        margin: 0 15px;
      }
      p {
        color: #ff0010;
        line-height: 20px;
        font-size: 14px;
        span {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .refuse {
        background: #ff0010;
      }
    }
  }
}
</style>
