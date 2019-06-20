<template>
  <div class="order_usage">
    <div class="demand">
      <div class="show_title">
        <h3>风控审核</h3>
      </div>
      <div class="show_list">
        <div class="verifed">
          <p class="state_title">审核状态</p>
          <p>申请机构：<span>{{institution}}</span></p>
          <p>您的融资申请状态：<span :style='"color:" + statusList[riskStatus].color'>{{statusList[riskStatus].title}}</span></p>
        </div>
        <div class="ver_info">
          <p class="state_title">审核信息</p>
          <p>{{statusList[riskStatus].tip}}</p>
        </div>
      </div>
    </div>
    <div class="btn_list">
      <div @click="handleIndex">回到首页</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderRisk',
  data () {
    return {
      riskStatus: '100',
      institution: '',
      statusList: {
        "100": {title: "预审中", color: '#eb6100', tip: '您的融资申请正在进行预审，通过后将第一时间通知您。'},
        "101": {title: "预审通过", color: 'green', tip: '您的预审已通过，申请将发送风控部门进行审核，请保持联系方式畅通。'},
        "102": {title: "预审不通过", color: '#ff0100', tip: '您的预审被驳回，本次融资结束。'},
        "200": {title: "风控审核", color: '#eb6100', tip: '风控部门正在对本次融资进行尽调，请配合提交相关数据。'},
        "201": {title: "风控通过", color: 'green', tip: '您的申请已通过风控审核，等待金融机构签署三方协议。'},
        "202": {title: "风控不通过", color: '#ff0100', tip: '风控不能驳回您的申请，本次融资结束。'},
        "203": {title: "融资进行中", color: 'green', tip: '风控本门对您的审核已经完成。'}
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
        that.institution = res.data.institution
        if (Number(that.riskStatus) > 202) that.riskStatus = '203'
        // that.riskStatus = res.data.status
        // that.instutition = res.data.instutition
      }
    })
  },
  methods: {
    handleIndex () {
      this.$router.push('/financing_app')
    }
  }
}
</script>
<style lang="less" scoped>
.order_usage {
  background: #ffffff;
  border: 1px solid #e1e6f0;
  border-radius: 2px;
  width: 100%;
  height: auto;
  padding: 0 20px;
  .show_title {
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
      p {
        font-size: 14px;
        line-height: 36px;
        padding: 0 40px;
        color: #333;
      }
      p:last-child {
        height: 108px;
        color: #666;
        font-size: 14px;
      }
    }
    .state_title {
      line-height: 46px;
      font-weight: bolder;
    }
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
}
</style>
