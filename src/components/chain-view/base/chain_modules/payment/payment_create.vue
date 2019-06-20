<template>
  <div class="papers_container">
    <!-- <AppNav :father='{selIndex: 1}'></AppNav> -->
    <div class="payment_section">
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <div class="bills_wrap">
        <paymentEdit></paymentEdit>
      </div>
      <div class="btn_list">
        <div class="submit_data" v-if="role === 'business'" @click="handleSubmit">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import location from '@/components/location/location'
import paymentEdit from './paymentEdit'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'paymentCreate',
  data () {
    return {
      location: [],
      role: 'business'
    }
  },
  components: {
    location, paymentEdit, 
    // AppNav
  },
  // 通过路由获取参数 组织导航组件
  created () {
    let url = ''
    this.$route.query.chain_type === '1' ? url = '/chain_app/receive_chain?id=' + this.$route.query.chain_id : url = '/chain_app/payment_chain?id=' + this.$route.query.chain_id 
    this.location = [
      {title: '链式记账', url: url},
      {title: '支付'}
    ]
  },
  methods: {
    // 提交数据
    handleSubmit () {
      const that = this
      let subData = this.$children[2].subData
      let uploadData = this.$children[2].uploadData
      let agent = this.$children[2].agent
      subData.agent = []
      agent.forEach(val => {
        subData.agent.push(val.id)
      })
      if (subData.type <= 1) {
        if (!subData.name) {
          that.$message.error('请输入支付名称')
        } else {
          if (!(/^[0-9]+(.[0-9]{2})?$/.test(subData.amount))) {
            that.$message.error('请输入正确的金额')
          } else {
            if (!subData.date_created) {
              let tip
              subData.type === '0' ? tip = '支付日期' : tip = '出票日期'
              that.$message.error(`请选择正确的${tip}`)
            } else {
              // if (uploadData.length === 0) {
              //   that.$message.error('请上传支付原件')
              // } else {
              // }
              subData.attachment = []
              uploadData.forEach(el => {
                subData.attachment.push(el.attachId || el.id)
              })
              subData.payment_info = {}
              let {gathering, gatheringCompany, getting_account, payment, paymentCompany, payment_account} = subData
              subData.payment_info = {gathering, gatheringCompany, getting_account, payment, paymentCompany, payment_account}
              subData.type = Number(subData.type) + 1
              subData.contract_id = that.$route.query.cid
              subData.settlement_id = that.$route.query.settlement_id
              that.$ajax.post(`/api/chain/payment/`, subData).then(res => {
                if (res.status === 201) {
                  // that.$message.success('提交成功')
                  // let params = {query: {}}
                  // that.$route.query.chain_type === '1' ? params.path = '/chain_app/receive_chain' : ''
                  // params.query.id = that.$route.query.chain_id
                  // that.$router.push(params)
                  let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
                  this.$router.push({
                    path: _url
                  })
                } else {
                  that.$message.error('网络错误')
                }
              })
            }
          }
        }
      } else {
        if (!subData.name) {
          that.$message.error('请输入支付名称')
        } else {
          if (!(/^[0-9]+(.[0-9]{2})?$/.test(subData.amount))) {
            that.$message.error('请输入正确的金额')
          } else {
            if (!subData.date_created) {
              let tip
              subData.type === 0 ? tip = '支付日期' : tip = '出票日期'
              that.$message.error(`请选择正确的${tip}`)
            } else {
              if (!subData.payment_date) {
                that.$message.error('请选择汇票到期日')
              } else {
                subData.attachment = []
                uploadData.forEach(el => {
                  subData.attachment.push(el.attachId || el.id)
                })
                subData.payment_info = {}
                let {gathering, gatheringCompany, getting_account, payment, paymentCompany, payment_account} = subData
                subData.payment_info = {gathering, gatheringCompany, getting_account, payment, paymentCompany, payment_account}
                subData.contract_id = that.$route.query.cid
                subData.settlement_id = that.$route.query.settlement_id
                subData.order_id = that.$route.query.order_id
                subData.type = subData.type + 1
                that.$ajax.post(`/api/chain/payment/`, subData).then(res => {
                  if (res.status === 201) {
                    let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
                    this.$router.push({
                      path: _url
                    })
                  } else {
                    that.$message.error('网络错误')
                  }
                })
                // if (uploadData.length === 0) {
                //   that.$message.error('请上传支付原件')
                // } else {
                // }
              }
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.papers_container {
  .payment_section {
    width: 100%;
    //padding-top: 70px;
    padding-left: 20px;
  }
  background: #f5f5f5;
  display: flex;
  .location_wrap {
    background: #fff;
  }
  .bills_wrap {
    padding: 40px 25px;
  }
  .btn_list {
    // height: 34px;
    display: flex;
    padding: 37px 0;
    justify-content: center;
    div {
      width: 120px;
      height: 100%;
      line-height: 34px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid #eb6100;
      margin: 0 70px;
      cursor: pointer;
    }
    div:first-child {
      color: #eb6100;
    }
    div:last-child {
      background: #eb6100;
      color: #fff;
    }
  }
}
</style>
