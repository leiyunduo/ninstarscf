<template>
  <div class="settlement_container">
    <!-- <AppNav :father='{selIndex: 1}' type='2'></AppNav> -->
    <div class="invoice_section">
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <div class="bills_wrap">
        <invoiceEdit></invoiceEdit>
      </div>
      <div class="btn_list">
        <!-- <div>保存草稿</div> -->
        <div class="submit_data" v-if="role === 'business'" @click="handleSubmit">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import location from '@/components/location/location'
import invoiceEdit from './invoiceEdit'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'invoiceCreate',
  data () {
    return {
      location: [],
      role: 'business'
    }
  },
  components: {
    location, invoiceEdit, 
    // AppNav
  },
  // 通过路由获取参数
  created () {
    let url = ''
    this.$route.query.chain_type === '1' ? url = '/chain_app/receive_chain?id=' + this.$route.query.chain_id : url = '/chain_app/payment_chain?id=' + this.$route.query.chain_id
    this.location = [
      {title: '链式记账', url: url},
      {title: '发票'}
    ]
    this.$ajax.get(`/api/chain/company/myself/`).then(res => {
      if (res.status === 200) {
        this.company_id = res.data.company_id
      }
    })
  },
  methods: {
    // 提交数据
    handleSubmit () {
      const that = this
      let subData = this.$children[1].subData
      let uploadData = this.$children[1].uploadData
      let agentList = this.$children[1].agentList
      subData.invoice_type = Number(subData.invoice_type) + 1
      if (!subData.name) {
        that.$message.error('请输入发票名称')
      } else {
        if (!subData.invoice_type) {
          that.$message.error('请选择发票类型')
        } else {
          if (!subData.invoice_code) {
            that.$message.error('请输入发票代码')
          } else {
            if (!subData.invoice_number) {
              that.$message.error('请输入发票号码')
            } else {
              if (!subData.date_created) {
                  that.$message.error('请选择正确的发票日期')
                } else {
                  if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(subData.amount))) {
                    that.$message.error('请输入正确的发票金额')
                  } else {
                    subData.attachment = []
                    uploadData.forEach(val => {
                      subData.attachment.push(val.id)
                    })
                    subData.contract_id = that.$route.query.cid
                    subData.settlement_id = that.$route.query.settlement_id
                    subData.order_id = that.$route.query.order_id
                    subData.agent = agentList
                    subData.invoice_code = subData.invoice_code.trim()
                    subData.invoice_number = subData.invoice_number.trim()
                    this.$ajax.get(`/api/chain/invoice/only/?invoice_code=${subData.invoice_code}&invoice_number=${subData.invoice_number}&company_id=${this.company_id}`).then(res => {
                      if (res.data) {
                        this.$message.error('该发票号码已被使用，请更换发票')
                      } else {
                        that.$ajax.post(`/api/chain/invoice/`, subData).then(res => {
                          if (res.status === 201) {
                            let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
                            this.$router.push({
                              path: _url
                            })
                          }
                        })
                      }
                    })
                  }
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
.settlement_container {
  background: #f5f5f5;
  display: flex;
  .invoice_section {
    //padding-top: 70px;
    width: 100%;
    padding-left: 20px;
  }
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
