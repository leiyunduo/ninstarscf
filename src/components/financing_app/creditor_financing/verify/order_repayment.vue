<template>
  <!-- 融资申请 -->
  <div id="financing_application">
    <div class="financing_application_list">
      <div class="btn_list" v-if="riskStatus === '700'">
        <button v-for="(item, index) in btnList" :key="index" :class="{action_btn: action_btn === index}" @click="handleChange(index)">{{item}}</button>
      </div>
      <!-- 还款 -->
      <div class="repayment" v-if='action_btn === 0'>
        <div class="title"><h3>还款情况</h3></div>
        <div class="repayment_form">
          <p v-if="riskStatus === '700' && refuse">您之前的提交还款信息被拒绝，请重新上传。</p>
          <div class="form_line">
            <div class="repayment_item">
              <span>应还总额</span>
              <input type="text" v-model="repayment.value" v-if="riskStatus === '700'">
              <span v-if="riskStatus === '701' || riskStatus === '702'">{{repayment.value}}</span>
            </div>
            <div class="repayment_item" v-if="riskStatus === '701' || riskStatus === '702'">
              <span>还款企业</span>
              <span>{{business}}</span>
            </div>
            <div class="repayment_item" v-if="riskStatus === '701' || riskStatus === '702'">
              <span>收款机构</span>
              <span>{{institution}}</span>
            </div>
          </div>
          <div class="form_line">
            <div class="repayment_item">
              <span>还款利率</span>
              <input type="text" v-model="repayment.rate" v-if="riskStatus === '700'">
              <span v-if="riskStatus === '701' || riskStatus === '702'">{{repayment.rate}}</span>
              <i>%</i>
            </div>
            <div class="repayment_item">
              <span>还款机构</span>
              <input type="text" v-model="repayment.company" v-if="riskStatus === '700'">
              <span v-if="riskStatus === '701' || riskStatus === '702'">{{repayment.company}}</span>
            </div>
            <div class="repayment_item">
              <!-- <span>收款账号</span>
              <input type="text" v-model="repayment.account" v-if="riskStatus === '700'">
              <span v-if="riskStatus === '701' || riskStatus === '702'">{{repayment.account}}</span> -->
            </div>
          </div>
          <div class="form_line">
            <div class="repayment_item">
              <span>还款时间</span>
              <el-date-picker size="mini" v-if="riskStatus === '700'"  v-model="repayment.repayment_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
              <span v-if="riskStatus === '701' || riskStatus === '702'">{{repayment.repayment_date}}</span>
            </div>
            <div class="repayment_item">
              <span>还款账号</span>
              <input v-if="riskStatus === '700'" type="text" v-model="repayment.reaccount">
              <span v-if="riskStatus === '701' || riskStatus === '702'">{{repayment.reaccount}}</span>
            </div>
          </div>
          <div class="form_upload">
            <p>还款证明</p>
            <div class="up_btn">
              <input type="file" @change="handleUpload" v-if="riskStatus === '700'">
              <span v-if="riskStatus === '700' && !repayment.showImg">+</span>
              <img :src="URL + repayment.showImg" alt="" v-if="repayment.showImg">
              <p v-if="(riskStatus === '701' || riskStatus === '702' || riskStatus === '703') && !repayment.showImg" style="line-height: 240px; color: #999; text-align: #999">未上传</p>
            </div>
          </div>
          <div class="tab_btn" v-if="riskStatus === '700'">
            <button @click="handleSubmit()">提交</button>
          </div>
          <div class="feed_back" v-if='riskStatus >= "701"'>
            <p class="feedback_title">还款确认反馈</p>
            <p class="feedback_content" v-if="riskStatus === '702'">
              {{institution}}<span class="sure">确认</span>了还款信息，本次融资流程已结束。
            </p>
            <p class="feedback_content" v-if="riskStatus === '701'">
              {{institution}}<span class="unsure">还未确认</span>还款信息，确认后，本次融资流程结束。
            </p>
          </div>
        </div>
      </div>
      <!-- 展期 -->
      <div class="extend" v-if='action_btn === 1'>
        <div class="title">
          <h3>展期申请</h3>
        </div>
        <div class="extend_form" v-if="riskStatus === '700'">
          <div class="extend_line">
            <div class="extend_item">
              <span>展期时间</span>
              <el-date-picker size="mini" v-model="extend.extend_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
          <div class="extend_info">
            <div class="extend_item">
              <span>展期原因</span>
              <textarea v-model="extend.extend_reason"></textarea>
            </div>
          </div>
          <div class="tab_btn" v-if="riskStatus === '700'">
            <button @click="handleExtend">提交</button>
          </div>
        </div>
        <div class="extend_board" v-if="riskStatus === '602' || riskStatus === '601' || riskStatus === '600'">
          <div>
            <span>展期时间</span>
            <span>{{extend.extend_date}}</span>
          </div>
          <div>
            <span>展期原因</span>
            <p>{{extend.extend_reason}}</p>
          </div>
          <div class="extend_feedback">
            <p>展期申请反馈</p>
            <p v-if="riskStatus === '600'">{{institution}}<span class="suring">正在审核</span>您的展期申请，请于{{extend.extend_date}}准时还款，若没有及时还款，您将会进入九星供应链云技术服务平台的黑名单</p>
            <p v-if="riskStatus === '601'">{{institution}}<span class="sure">同意</span>了您的展期申请，请于{{extend.extend_date}}准时还款，若没有及时还款，您将会进入九星供应链云技术服务平台的黑名单</p>
            <p v-if="saveState === '602'">{{institution}}<span class="unsure">决绝</span>了您的展期申请，请于{{extend.extend_date}}准时还款，若没有及时还款，您将会进入九星供应链云技术服务平台的黑名单</p>
          </div>
          <div class="tab_btn">
            <button @click='handleRepayment'>去还款</button>
          </div>          
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
      btnList: ['还款情况', '展期申请'],
      URL: this.$root_url(),
      action_btn: 0,
      riskStatus: '700',
      saveState: '0',
      repayment: {},
      extend: {},
      business: '',
      institution: '',
      extended: 0,
      refuse: false
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
        that.refuse = res.data.loan_info.refuse || false
        if (that.riskStatus >= 600 && that.riskStatus < 700) {
          this.action_btn = 1
          this.extend = res.data.loan_info,
          this.extended = 1
        } else {
          this.repayment = res.data.loan_info
        }
      }
    })
  },
  methods: {
    // 切换tab
    handleChange (index) {
      const that = this
      if (index === 0) {
        this.action_btn = 0
      } else {
        if (that.saveState === '600') {
          this.riskStatus = '600'
        } else if (that.saveState === '601') {
          this.riskStatus = '700'
        }
        console.log(this.riskStatus)
        this.action_btn = 1
      }
    },
    // 上传还款证明
    handleUpload ($event) {
      const that = this
      let file = $event.target.files[0]
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error('文件大小超过2M')
      } else if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        this.$message.error('请上传png, jpg或jpeg类型的文件')
      } else {
        let upload = new FormData()
        upload.append('function_module', 'financing')
        upload.append('file', file)
        this.$ajax.post('/api/ns_file/', upload).then(res => {
            console.log(res.status)
          if (res.status === 200) {
            let repayment = that.repayment
            repayment.showImg = res.data
            that.repayment = repayment
            console.log(repayment, 'repayment')
            that.$forceUpdate()
            this.$message.success('上传成功')
          }
        })
      }
    },
    // 提交还款
    handleSubmit () {
      const that = this
      let subData = this.repayment
      if (!(/^[0-9]+(.[0-9]{0,2})?$/.test(subData.value))) {
        that.$message.error('请输入正确的应还总额')
      } else {
        if (!(/^[0-9]+(.[0-9]{0,2})?$/.test(subData.rate))) {
          that.$message.error('请输入正确的还款利率')
        } else {
          if (!subData.company || subData.company === '') {
            that.$message.error('请输入正确的还款机构')
          } else {
            if (!(/^[0-9]+$/.test(subData.account))) {
              that.$message.error('请输入正确的收款账号')
            } else {
              if (subData.repayment_date === '' || !subData.repayment_date) {
                that.$message.error('请选择还款日期')
              } else {
                if (!(/^[0-9]+$/.test(subData.reaccount))) {
                  that.$message.error('请输入正确的还款账号')
                } else {
                  that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_info: subData, loan_process_status: '701'}).then(res => {
                    console.log(res)
                    this.riskStatus = '701'
                  })                  
                }
              }
            }
          }
        }
      }
    },
    // 提交展期
    handleExtend () {
      const that = this
      const extend = that.extend
      if (!extend.extend_date || extend.extend_date === '') {
        that.$message.error('请选择展期日期')
      } else {
        if (!extend.extend_reason || extend.extend_reason === '') {
          that.$message.error('请选择展期原因')
        } else {
          that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_info: extend, loan_process_status: '600'}).then(res => {
            console.log(res)
            this.riskStatus = '600'
            this.saveState = '600'
          })
        }
      }
    },
    // 展期过程中还款
    handleRepayment () {
      this.riskStatus = "700"
      this.saveState = "700"
      this.action_btn = 0
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
        &>P {
          padding: 0 30px;
          line-height: 45px;
          color: #ff0010;
        }
        .form_line {
          display: flex;
          height: 64px;
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
            input:nth-child(2) {
              width: 220px;
              outline: none;
              height: 26px;
              border-radius: 4px;
              padding: 0 8px;
              border: 1px solid #eaeaea;
            }
            span:nth-child(2) {
              width: 220px;
              height: 26px;
              padding: 0 8px;
              line-height: 26px;
              border: 1px solid #eaeaea;
              color: #333;
            }
          }
        }
        .form_upload {
          padding-top: 30px;
          padding-left: 20px;
          p {
            line-height: 32px;
            font-size: 14px;
          }
          .up_btn {
            width: 20%;
            position: relative;
            height: 240px;
            border:1px solid #eaeaea;
            background: none;
            text-align: center;
            line-height: 240px;
            input {
              display: block;
              width: 100%;
              height: 100%;
              opacity: 0;
              position: absolute;
              top: 0;
              outline: none;
              z-index: 9;
            }
            img {
              position: absolute;
              top: 0;
              width: 100%;
              left: 0;
              height: 100%;
            }
            span {
              font-size: 24px;
              color: #eb6100;
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
      height: 90px;
      text-align: center;
      line-height: 90px;
      button {
        width: 110px;
        height: 32px;
        border:1px solid #eb6100;
        background: #eb6100;
        color: #fff;
        line-height: 32px;
        border-radius: 2px;
      }
    }
  }
}
</style>
