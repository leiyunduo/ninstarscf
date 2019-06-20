<template>
  <div class="order_usage">
    <div class="demand">
      <div class="show_title">
        <h3>风控审核</h3>
      </div>
      <div class="show_list">
        <div class="verifed">
          <p class="state_title">审核状态</p>
          <p>风控状态：<span :style="'color:' + statusList[riskStatus].color">{{statusList[riskStatus].title}}</span></p>
          <p>申请企业：<span>{{business}}</span></p>
          <p>风控邮箱：<span :style='email ? "color: #eb6100" : "color: #999"'>{{email || '未填写'}}</span></p>
        </div>
        <div class="ver_info">
          <p class="state_title">审核信息</p>
          <div class="state_pdf">
            <span @click="handlePreview()">点击查看风控信息</span>
            <p>打开后，右键点击保存下载</p>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_list" v-if="riskStatus === '200'">
      <div @click="handleSubmit('300')">通过</div>
      <div @click="handleSubmit('202')" style="background: red">未通过</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderRisk',
  data () {
    return {
      riskStatus: '200',
      business: '',
      email: '',
      pdfUrl: '',
      statusList: {
        '200': {title: '风控审核', color: '#eb6100', tip: '风控部门正在对本次融资进行尽调，请配合提交相关数据。'},
        '201': {title: '风控通过', color: 'green', tip: '您的申请已通过风控审核，等待金融机构签署三方协议。'},
        '202': {title: '风控不通过', color: '#ff0100', tip: '风控不能驳回您的申请，本次融资结束。'},
        '203': {title: '融资中', color: 'green', tip: '风控本门对您的审核已经完成。'}
      }
    }
  },
  // updated () {
  //   let a = this.$parent
  //   if (a.steps[0].emitData.amount) {
  //     this.selList = a.steps[0].emitData.list
  //     this.exceptDate = a.steps[0].emitData.except_date
  //     this.repaymentDate = a.steps[0].emitData.repayment_date
  //     this.amount = a.steps[0].emitData.amount
  //   }
  // },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/loan_process/${this.$route.query.id}/`).then(res => {
      if (res.status === 200) {
        console.log(res)
        that.riskStatus = res.data.loan_process_status
        that.email = res.data.loan_info.email
        that.pdfUrl = res.data.pdf_url
        that.business = res.data.financing_application.business_info.name
        if (Number(that.riskStatus) > 202) that.riskStatus = '203'
      }
    })
  },
  methods: {
    handleSubmit (code) {
      const that = this
      if (code === '300') {
        this.$ajax.put(`/api/financing/loan_process/${this.$route.query.id}/`, {loan_process_status: '300'}).then(res => {
          if (res.status === 200) {
            that.$emit('sign', true)
          }
        })
      } else {
        this.$ajax.put(`/api/financing/loan_process/${this.$route.query.id}/`, {loan_process_status: '202'}).then(res => {
          if (res.status === 200) {
            that.$message.success('拒绝成功，融资结束')
            setTimeout(() => {
              that.$router.push('/credit_app')
            }, 200)
          }
        })
      }
    },
    // 预览PDF
    handlePreview (url) {
      // this.$message.success('已发送至您的邮箱')
      window.open(this.$root_url() + this.pdfUrl, '_blank')
    }
  }
}
</script>
<style lang="less" scoped>
.order_usage {
  .show_title {
    height: 52px;
    // border-bottom: 1px solid #e1e6f0;
    padding-top: 20px;
    h3 {
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color:#333333;
      letter-spacing: 0;
      text-align: left;
      font-weight: bold;
      border-left: 5px solid #eb6100;
      height: 24px;
      padding-left: 22px;
      line-height: 24px;
    }
  }
  .show_list {
    .verifed {
      background: #fff;
      // margin: 0 80px;
      padding: 20px 0;
      p {
        font-size: 14px;
        line-height: 36px;
        padding: 0 40px;
        color: #333;
        // text-align: center;
        span {
          font-weight: bolder;
          margin: 0 5px;
        }
      }
    }
    .ver_info {
      // margin-top: 25px;
      // margin: 0 80px;
      background: #fff;
      border-top: 1px dashed #e1e6f0;
      padding: 20px 0;
      // text-align-last: left;
      &>p {
        font-size: 14px;
        line-height: 36px;
        padding: 0 40px;
        color: #333;
      }
      .state_pdf {
        padding: 0 60px;
        height: 120px;
        span {
          cursor: pointer;
          padding: 10px 5px;
          line-height: 32px;
          text-decoration: underline;
          color: #eb6100;
          font-weight: bolder;
        }
        p{
          font-size: 12px;
          color: #999;
          padding: 0 5px;
        }
      }
    }
    .state_title {
      line-height: 46px;
      font-weight: bolder;
    }
  }
  .btn_list {
    padding: 24px 0;
    display: flex;
    justify-content: center;
    div {
      margin: 0 15px;
      width: 120px;
      color: #fff;
      text-align: center;
      line-height: 30px;
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
}
</style>
