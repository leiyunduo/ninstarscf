<template>
  <div class="order_usage">
    <div class="title">
      <h3>三方协议</h3>
    </div>
    <div class="show_list">
      <agreement />
    </div>
    <!-- 还款信息 -->
    <div class="title">
      <h3>还款信息</h3>
    </div>
    <div class="repayment_list">
      <div>
        <span>还款日期：</span>
        <el-date-picker size="mini" v-if="riskStatus === '300'" v-model="repayment.repayment_date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        <span v-if="riskStatus !== '300'">{{repayment.repayment_date}}</span>
      </div>
      <div>
        <span>还款利率：</span>
        <input type="text" v-model="repayment.repayment_rate" v-if="riskStatus === '300'">
        <span v-if="riskStatus !== '300'">{{repayment.repayment_rate}}</span>
        <span>%</span>
      </div>
      <div>
        <span>还款金额（元）：</span>
        <input type="text" v-model="repayment.repayment_value" v-if="riskStatus === '300'">
        <span v-if="riskStatus !== '300'">{{repayment.repayment_value}}</span>
      </div>
    </div>
    <div class="title">
      <h3>还款路径</h3>
    </div>
    <div class="repayment_list">
      <div>
        <span>交易账户名称：</span>
        <span :style="bank.bank_account_name ? '' : 'color: #999'">{{bank.bank_account_name || '未填写'}}</span>
      </div>
      <div>
        <span>交易账户账号：</span>
        <span :style="bank.bank_account_number ? '' : 'color: #999'">{{bank.bank_account_number || '未填写'}}</span>
      </div>
      <div>
        <span>开户行：</span>
        <span :style="bank.open_bank_info ? '' : 'color: #999'">{{bank.open_bank_info || '未填写'}}</span>
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
    <p class="info_tip" v-if="riskStatus !== '300'">{{statusList[riskStatus].info}}</p>
    <div class="btn_list" v-if="riskStatus === '300'">
      <div @click="handleSubmit('400')">同意</div>
      <div class="refuse" @click="handleSubmit('302')">拒绝</div>
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
      bank: {},
      // 1表示同意， 0表示拒绝
      riskStatus: '300',
      statusList: {
        '400': {title: '企业三方协议签署中', info: '等待企业签署三方协议中，签署后将第一时间通知您'},
        '401': {title: '同意签署', info: '完成签署'},
        '402': {title: '拒绝签署', info: '拒绝签署，本次融资结束'},
        '403': {title: '双方已完成签约', info: '已经完成签约，进入后续环节'}
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
        that.bank = res.data.financing_application.application_data.bank_account_info || {}
        if (Number(res.data.loan_process_status) >= 301) {
          that.repayment = {
            repayment_date: res.data.repayment_date,
            repayment_rate: res.data.repayment_rate,
            repayment_value: res.data.repayment_value
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
      if (code === '400') {
        let repayment = that.repayment
        if (repayment.repayment_date === '' || !repayment.repayment_date) {
          that.$message.error('请选择还款日期')
        } else {
          if (!(/^[0-9]+(.[0-9]{0,4})?$/.test(repayment.repayment_rate))) {
            that.$message.error('请输入正确的还款利率')
          } else {
            if (!(/^[0-9]+(.[0-9]{0,2})?$/.test(repayment.repayment_value))) {
              that.$message.error('请输入正确的还款金额')
            } else {
              that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: '400', ...that.repayment}).then(res => {
                // console.log(res)
                if (res.data.loan_process_status === '400') {
                  this.riskStatus = '400'
                }
              })
            }
          }
        }
      } else {
        that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: '302'}).then(res => {
          // console.log(res)
          that.$router.push({
            path: '/credit_app'
          })
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.order_usage {
  background:#ffffff;
  border:1px solid #eaeaea;
  border-radius:2px;
  width:100%;
  height:auto;
  padding: 0 20px;
  .title {
    height: 52px;
    // border-bottom: 1px solid #eaeaea;
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
    border:1px solid #e2e2e2;
    align-items: center;
    margin: 20px 0;
    div {
      width: 33%;
      height: 75%;
      border-right: 1px dashed #e2e2e2;
      line-height: 45px;
      color: #666;
      // display: flex;
      font-size: 14px;
      text-align: center;
      span:first-child {
        width: 40%;
        text-align: right;
        padding: 0 20px;
      }
      &>input:nth-child(2) {
        outline: none;
        width: 180px;
        height: 28px;
        padding: 0 4px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
      }
    }
    div:last-child {
      border: none;
    }
  }
  .legal_person {
    padding: 0 30px;
    margin-top: 20px;
    border: 1px solid #e2e2e2;
    background: #fff;
    // padding-bottom: 20px;
    font-size: 14px;;
    .l_title {
      font-weight: bold;
      border-bottom: 1px solid #e2e2e2;
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
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      border-radius: 3px;
      background: #eb6100;
      color: #fff;
      text-align: center;
      line-height: 40px;
      width: 108px;
      cursor: pointer;
      font-size: 14px;
      margin: 0 15px;
    }
    .refuse {
      background: red;
    }
  }
}
</style>
