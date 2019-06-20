<template>
  <!-- 融资申请 -->
  <div id="financing_application">
    <div class="financing_application_list">
      <!-- 赔付申请 -->
      <div class="repayment" v-if="helping_status === '3'">
        <div class="title"><h3>赔付申请</h3></div>
        <div class="repayment_form">
          <div class="form_lines">
            <div class="repayment_item">
              <span>赔付申请时间</span>
              <span>{{apply.apply_aid_paid_time}}</span>
            </div>
            <div class="repayment_item">
              <span>申请银行</span>
              <span>{{apply.apply_institution_name}}</span>
            </div>
          </div>
          <div class="form_lines">
            <div class="repayment_item">
              <span>助贷赔付金额</span>
              <span>{{apply.aid_paid_value}}</span>
            </div>
            <div class="repayment_item">
              <span>申请融资企业</span>
              <span>{{apply.apply_business_name}}</span>
            </div>
          </div>
        </div>
        <div class='tab_btn'>
          <button @click="okApply">同意赔付</button>
          <button class='refuse' @click="refuseApply">拒绝赔付</button>
        </div>
      </div>
      <!-- 还款 -->
      <div class="repayment" v-if='action_btn === 0 && helping_status !== "3"'>
        <div class="title"><h3>还款情况</h3></div>
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
              <span>{{repayment.rate}}</span>
              <i>%</i>
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
              <img :src="$root_url() + repayment.showImg" alt="">
            </div>
          </div>
          <div class="tab_btn" v-if="helping_status === '6'">
            <button @click="handleSubmit()">确认还款</button>
            <button class="refuse" @click="handleRefuse()">拒绝确认</button>
          </div>
          <div class="feed_back" v-if='helping_status === "6"'>
            <p class="feedback_title">还款确认反馈</p>
            <p class="feedback_content">多方确认后，本次融资结束</p>
          </div>
        </div>
      </div>
      <!-- 展期 -->
      <div class="extend" v-if='action_btn === 1 && helping_status !== "3"'>
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
            <p v-if="riskStatus === '601'">{{institution}}<span class="sure">同意</span>了{{business}}的展期申请，将于原时间准时还款，若没有及时还款，该企业将会进入九星供应链云技术服务平台的黑名单</p>
            <p v-if="saveState === '602'">{{institution}}<span class="unsure">决绝</span>了{{business}}的展期申请，将于原定{{extend.extend_date}}准时还款，若没有及时还款，该企业将会进入九星供应链云技术服务平台的黑名单</p>
          </div>
          <!-- <div class="tab_btn" v-if="riskStatus === '600'">
            <button @click='handleExtend("601")'>同意</button>
            <button @click='handleExtend("602")' class="refuse">拒绝</button>
          </div>           -->
        </div>
      </div>
      <!-- 无任何操作 -->
      <div class="no_operate" v-if="action_btn === 2 && helping_status !== '3'">
        <p>申请企业还未填写还款信息及上传还款证明</p>
        <!-- <div class="tip_list">
          <button v-if="!hasTip" @click="handleTip">催付提醒</button>
          <button @click="handleHelp">申请助贷赔偿</button>
        </div> -->
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <p>确认赔付后无法撤回，您可以在<span style="color: #eb6100;">我的债权</span>内查看企业还款进度</p>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisible = false">取 消</button>
        <button @click="okStep">确 定</button>
      </span>
    </el-dialog>
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
      fType: '',
      zType: '',
      dialogVisible: false,
      apply: {
        apply_aid_paid_time: '',
        apply_institution_name: '',
        aid_paid_value: '',
        apply_business_name: ''
      },
      financing_application_id: '',
      helping_status: ''
    }
  },
  created () {
    const that = this
    that.$ajax.get(`/api/financing/loan_process/${that.$route.query.id}/`).then(res => {
      console.log(res)
      if (res.status == 200) {
        that.riskStatus = res.data.loan_process_status
        that.saveState = res.data.loan_process_status
        that.institution = res.data.institution
        that.business = res.data.financing_application.business_info.name
        that.hasTip = res.data.is_warm
        if (that.riskStatus >= 600 && that.riskStatus < 700) {
          this.action_btn = 1
          this.extend = res.data.loan_info || {}
          this.extended = 1
        } else if (that.riskStatus === '700') {
          this.action_btn = 2
        } else {
          this.repayment = res.data.loan_info || {}
        }
        that.helping_status = res.data.financing_application.helping_status
        that.financing_application_id = res.data.financing_application.id
        if (that.helping_status === '3') {
          that.$ajax.get('/api/financing/application/apply_aid_paid_detail/?application_id=' + res.data.financing_application.id).then(res => {
            that.apply.apply_aid_paid_time = res.data.apply_aid_paid_time
            that.apply.apply_institution_name = res.data.apply_institution_name
            that.apply.aid_paid_value = that.toThousands(res.data.aid_paid_value)
            that.apply.apply_business_name = res.data.apply_business_name
          })
        }
      }
    })
  },
  mounted() {
    const that = this
  },
  methods: {
    // 确定赔付
    okApply () {
      // this.dialogVisible = true
      const that = this
      that.$confirm('确认赔付后无法撤回，您可以在我的债权内查看企业还款进度。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        that.$ajax.put(`/api/financing/application/` + that.financing_application_id + '/', {helping_status: 4}).then(res => {
          that.$message.success('同意赔付')
          that.$router.push('/myClaims')
        })
      })
      
    },
    // 确定
    okStep () {
      const that = this

    },
    // 关闭
    handleClose () {
      this.dialogVisible = false
    },
    // 提交还款
    handleSubmit () {
      const that = this
      that.$ajax.put(`/api/financing/application/` + that.financing_application_id + '/', {helping_status: 9}).then(res => {
        that.$router.push('/myClaims')
      })
    },
    refuseApply () {
      const that = this
      that.$confirm('拒绝本次助贷申请后后不可撤回。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(res => {
        that.$ajax.put(`/api/financing/application/` + that.financing_application_id + '/', {helping_status: 5}).then(res => {
          that.$message.success('拒绝成功')
          that.$router.push('/myClaims')
        })
      })   
    },
    handleRefuse () {
      that.$confirm('决绝后企业需重新进入还款流程。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(res => {

      })      
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
      .repayment_form {
        .form_line {
          display: flex;
          min-height: 64px;
          align-items: center;
          .repayment_item {
            width: 30%;
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
        .form_lines {
          display: flex;
          height: 64px;
          align-items: center;
          .repayment_item {
            width: 20%;
            font-size: 14px;
            display: flex;
            align-items: center;
            span:first-child {
              width: 30%;
              text-align: left;
            }
            span:nth-child(2) {
              width: 220px;
              height: 26px;
              padding: 0 8px;
              line-height: 26px;
              border: 1px solid #eaeaea;
              color: #333;
              display: inline-block;
              margin-right: 40px;
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
      p {
        line-height: 160px;
        text-align: center;
        color: #999;
      }
      .tip_list {
        padding: 10px 0;
        text-align: center;
        button {
          width: 110px;
          height: 36px;
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
          p:last-child {
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
      .refuse {
        background: #ff0010;
      }
    }
  }
}
.dialog-footer {
  button {
    width: 100px;
    height: 32px;
    outline: none;
    border-radius: 4px;
  }
  button:first-child {
    color: #eb6100;
    border: 1px solid #eb6100;
    background: none;
  }
  button:last-child {
    color: #fff;
    border: none;
    background: #eb6100;
    margin-left: 20px;
  }
}
</style>
