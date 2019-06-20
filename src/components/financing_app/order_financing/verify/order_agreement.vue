<template>
  <div class="order_usage">
    <div class="title">
      <h3>三方协议</h3>
    </div>
    <div class="show_list">
      <agreement />
    </div>
    <!-- 还款信息 -->
    <div class="title" v-if="riskStatus >= 301">
      <h3>还款信息</h3>
    </div>
    <div class="repayment_list" v-if="riskStatus >= 301">
      <div>
        <span>还款日期:</span>
        <span>{{repayment.repayment_date}}</span>
      </div>
      <div>
        <span>还款利率:</span>
        <span>{{repayment.repayment_rate}}%</span>
      </div>
      <div>
        <span>还款金额:</span>
        <span>{{repayment.repayment_value}}元</span>
      </div>
    </div>
    <div class="title">
      <h3>法人信息</h3>
    </div>
    <div class="legal_person">
      <div>
        <div class="l_title">法人信息</div>
        <div class="l_line">法人姓名：{{legalperson.name}}</div>
        <div class="l_line">法人证件号码：{{legalperson.id_number}}</div>
        <div class="pic_list">
          <div class="pic_item">
            <img :src="rootUrl + legalperson.auth_pic.legal_person_id_1" alt="">
            <p>身份证国徽面照</p>
          </div>
          <div class="pic_item">
            <img :src="rootUrl + legalperson.auth_pic.legal_person_id_2" alt="">
            <p>身份证人像面照</p>
          </div>
          <div class="pic_item">
            <img :src="rootUrl + legalperson.auth_pic.legal_person_id_3" alt="">
            <p>手持身份证国徽面照</p>
          </div>
          <div class="pic_item">
            <img :src="rootUrl + legalperson.auth_pic.legal_person_id_4" alt="">
            <p>手持身份证人像面照</p>
          </div>
        </div>
      </div>
    </div>
    <p class="info_tip" v-if="riskStatus !== '301' && riskStatus !== '400'" :style='riskStatus === "302" || riskStatus === "402" ? "color: #ff0100":""'>{{statusList[riskStatus].info}}</p>
    <div class="btn_list" v-if="riskStatus === '301' || riskStatus === '400'">
      <button @click="handleSubmit('500')">同意</button>
      <button class="refuse" @click="handleSubmit('402')">拒绝</button>
    </div>
  </div>
</template>
<script>
import agreement from '../../base/agreement'
export default {
  name: 'orderFirstRepayment',
  data () {
    return {
      legalperson: {auth_pic: []},
      rootUrl: this.$root_url(),
      repayment: {},
      // 1表示同意， 0表示拒绝
      riskStatus: '300',
      statusList: {
        "300": {title: "三方协议签署中", info: "等待金融机构签署协议中"},
        "301": {title: "同意签署", info: "已同意签约"},
        "302": {title: "拒绝签署", info: "金融机构决绝签约，本次融资已结束"},
        "400": {title: "企业三方协议签署中", info: "等待企业签署三方协议"},
        "401": {title: "同意签署", info: "完成签署"},
        "402": {title: "拒绝签署", info: "拒绝签署，本次融资结束"},
        "403": {title: "双方已完成签约", info: "已经完成签约，进入后续环节"}
      }
    }
  },
  components: {
    agreement
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/loan_process/${this.$route.query.id}/`).then(res => {
      if (res.status === 200) {
        console.log(res)
        that.riskStatus = res.data.loan_process_status
        if (Number(res.data.loan_process_status) >= 301) {
          that.repayment = {
            repayment_date: res.data.repayment_date,
            repayment_rate: res.data.repayment_rate,
            repayment_value: res.data.repayment_value,
          }
        }
        that.institution = res.data.institution
        if (Number(that.riskStatus) > 402) that.riskStatus = '403'
        that.$ajax.get(`/api/person/${res.data.financing_application.business_info.legal_person_id}`).then(re => {
          console.log(re)
          if (re.status === 200) {
            that.legalperson = re.data
          }
        })
      }
    })
  },
  methods: {
    handleIndex () {
      this.$router.push('/financing_app')
    },
    // 同意或者拒绝
    handleSubmit (code) {
      const that = this
      that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: code}).then(res => {
        // console.log(res)
        if (res.status == 200) {
          if (res.data.loan_process_status === '500') {
            that.$emit('sign', true)
          } else {
            that.riskStatus = '402'
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.order_usage {
  background:#ffffff;
  border:1px solid #e1e6f0;
  border-radius:2px;
  width:100%;
  height:auto;
  padding: 0 20px;
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
  .repayment_list {
    display: flex;
    height: 60px;
    border:1px solid #e1e6f0;
    align-items: center;
    margin: 20px 0;
    div {
      width: 33%;
      height: 75%;
      border-right: 1px dashed #e1e6f0;
      line-height: 45px;
      color: #666;
      display: flex;
      font-size: 14px;
      span:first-child {
        width: 45%;
        text-align: right;
        padding: 0 20px;
      }
    }
    div:last-child {
      border: none;
    }
  }
  .legal_person {
    padding: 0 30px;
    margin-top: 20px;
    border: 1px solid #e1e6f0;
    background: #fff;
    // padding-bottom: 20px;
    font-size: 14px;;
    .l_title {
      font-weight: bold;
      border-bottom: 1px solid #e1e6f0;
      line-height: 40px;
      padding: 8px 20px;
    }
    .l_line {
      line-height: 36px;
      padding: 0 30px;
    }
    .pic_list {
      display: flex;
      align-items: center;
      padding: 20px 30px;
      div {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #333;
        cursor: pointer;
        img {
          width: 160px;
          height: 160px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .info_tip {
    height: 120px;
    line-height: 120px;
    color: #333;
    text-align: center;
  }
  .btn_list {
    padding: 21px 0;
    text-align: center;
    button {
      width: 120px;
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
      border: none;
      margin: 0 15px;
    }
    .refuse {
      background: red;
    }
  }
}
</style>
