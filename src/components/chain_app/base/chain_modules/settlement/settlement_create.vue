<template>
  <div class="settlement_container">
    <!-- <AppNav :father='{selIndex: 1}' :type='1'></AppNav> -->
    <!-- 面包屑导航 -->
    <div class="sttlement_section">
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <!-- view区 用于展示修改 -->
      <div class="bills_wrap">
        <settlementEdit></settlementEdit>
      </div>
      <!-- 操作区 -->
      <div class="btn_list">
        <div class="submit_data" v-if="role === 'business'" @click="handleSubmit">保存</div>
      </div>
    </div>
  </div>
</template>
<script>

import location from '@/components/location/location'
import settlementEdit from './settlementEdit'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'settleCreate',
  data () {
    return {
      location: [],
      role: 'business'
    }
  },
  components: {
    location, settlementEdit, 
    // AppNav
  },
    // 获取路由，渲染盗号
  created () {
    let url = ''
    this.$route.query.chain_type === '1' ? url = '/chain_app/receive_chain?id=' + this.$route.query.chain_id : url = '/chain_app/payment_chain?id=' + this.$route.query.chain_id
    this.location = [
      {title: '链式记账', url: url},
      {title: '结算单'}
    ]
  },
  methods: {
    // 提交数据操作
    handleSubmit () {
      const that = this
      let {subData, about, uploadData, orderInfo, agent} = this.$children[1]
      subData.contract_id = that.$route.query.cid
      subData.order_id = that.$route.query.order_id
      if (!subData.name) {
        // 判断订单名称
        this.$message.error('请输入结算单名称')
      } else {
        if (!subData.date_created) {
          // 判断出单日期
          that.$message.error('请选择出单日期')
        } else {
          if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(subData.amount))) {
          that.$message.error('请填写正确的结算金额')
          } else {
            if (!subData.p_date) {
              this.$message.error('请选择正确预计支付日期')
            } else {
              subData.order = []
            let order = []
            about.forEach(val => {
              if (val.checked) {
                order.push(val.id)
              }
            })
            if (order.length === 0) {
              // 判断是否关联订单
              that.$message.error('请选择要关联的订单')
            } else {
              subData.order = order
              let s = 0
              subData.order_info = []
              orderInfo.forEach(val => {
                if (!val.isEdit) {
                  subData.order_info.push(val)
                  s++
                }
              })
              if (orderInfo.length !== s) {
                // 是否有未保存订单信息
                that.$message.error('还有未保存的订单信息')
              } else {
                // subData.attachment = uploadData
                subData.attachment = []
                uploadData.forEach(val => {
                  subData.attachment.push(val.id)
                })
                subData.agent = []
                agent.forEach(val => {
                  subData.agent.push(val.id)
                })
                this.$ajax.post('/api/chain/settlement/', subData).then(res => {
                  if (res.status === 201) {
                    // that.$message.success('提交成功')
                    // let params = {query: {}}
                    // that.$route.query.chain_type === '1' ? params.path = '/chain_app/receive_chain' : ''
                    // params.query.id = that.$route.query.chain_id
                    // that.$router.push(params)
                    let _url = this.$route.query.chain_type === `1` ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
                      this.$router.push({
                        path: _url
                    })
                  }
                }).catch((err)=>{
                  that.$message.error(err.response.data.detail)
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
  .sttlement_section {
    width: 100%;
    //padding-top: 70px;
  }
  .location_wrap {
    background: #fff;
  }
  .bills_wrap {
    padding: 20px 40px;
  }
  .btn_list {
    height: 34px;
    display: flex;
    padding: 37px 0;
    justify-content: center;
    box-sizing: content-box;
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
