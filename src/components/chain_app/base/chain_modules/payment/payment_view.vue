<template>
  <div class="papers_container">
    <!-- <AppNav :father='{selIndex: 1}'></AppNav> -->
    <div class="payment_section">
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <!-- 航向切换补充 -->
      <div class="order_nav">
        <ul>
          <li v-for="(item, index) in slideNav" :class="selIndex === index ? 'active' : ''" :key='index' @click="handleNav(index, item)">
            <span>{{item.name}}</span>
          </li>
          <li v-if="showEdit && btnStatus === '1'" @click="handleSupply">
            <span>+添加变更</span>
          </li>
        </ul>
      </div>
      <div class="bills_wrap">
        <paymentView v-if="showEdit" @childInfo='handleChild' :selId='selId'></paymentView>
        <paymentEdit v-if="!showEdit" :showTitle='showTitle'></paymentEdit>
      </div>
      <!-- 操作区 -->
      <div class="btn_list" v-if="selIndex === slideNav.length - 1 && btnStatus === '0'">
        <div @click="handleEdit" class="submit_data">{{!showEdit ? '保存' : '修改'}}</div>
        <!-- <div @click="handleDelete" v-if="btnStatus === '0'">删除</div> -->
      </div>
      <!-- 补充时操作按钮 -->
      <div class="btn_list" v-if='!showEdit'>
        <div v-if="btnStatus === '1'" class="submit_data" @click="handleSupplySubmit">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import location from '@/components/location/location'
import paymentEdit from './paymentEdit'
import paymentView from './paymentView'
import merge from 'webpack-merge'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'paymentShow',
  data () {
    return {
      location: [],
      btnStatus: '-1',
      role: 'business',
      showEdit: true,
      showItem: 1,
      showTitle: true,
      selId: '',
      contractId: '0',
      slideNav: [],
      slide: [],
      selIndex: 0,
      orgSlide: []
    }
  },
  components: {
    location, paymentView, paymentEdit, 
    // AppNav
  },
  created () {
    const that = this
    let url = ''
    this.$route.query.chain_type === '1' ? url = '/chain_app/receive_chain?id=' + this.$route.query.chain_id : url = '/chain_app/payment_chain?id=' + this.$route.query.chain_id
    this.location = [
      {title: '链式记账', url: url},
      {title: '支付'}
    ]
    that.$ajax.get(`/api/chain/payment/${that.$route.query.payment_id}/`).then(res => {
      let slide = []
      let orgSlide = []
      res.data.id_list.forEach((val, i) => {
        i === 0 ? slide.push({id: val.id, name: val.name}) : slide.push({id: val.id, name: '变更' + i})
      })
      res.data.id_list.forEach((val, i) => {
        i === 0 ? orgSlide.push({id: val.id, name: val.name}) : orgSlide.push({id: val.id, name: '变更' + i})
      })
      that.slideNav = slide
      that.orgSlide = orgSlide
      this.selIndex = res.data.id_list.length - 1
      that.settlementId = res.data.settlement_id
      that.contractId = res.data.contract_id
      if (res.data.status === '0') {
        that.showEdit = false 
      } else {
        that.selId = slide[slide.length - 1].id
        that.showItem = null
        that.showEdit = true
      }
      that.btnStatus = res.data.status
    })
  },
  methods: {
    // 提交数据
    handleSubmit () {
      const that = this
      let subData = that.$children[1].subData
      let uploadData = this.$children[1].uploadData
      let agent = this.$children[1].agent
      subData.agent = []
      agent.forEach(val => {
        subData.agent.push(val.id)
      })
      delete subData.contract_id
      if (subData.type <= 1) {
        if (!subData.name) {
          that.$message.error('请输入支付名称')
        } else {
          if (!(/^[0-9]+(.[0-9]{2})?$/.test(subData.amount))) {
            that.$message.error('请输入正确的金额')
          } else {
            if (!subData.date_created) {
              let tip
              subData.type !== '1' ? tip = '支付日期' : tip = '出票日期'
              that.$message.error(`请选择正确的${tip}`)
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
              subData.type = Number(subData.type) + 1
              that.$ajax.patch(`/api/chain/payment/${subData.id}/`, subData).then(res => {
                if (res.status === 200) {
                  // that.$message.success('修改成功')
                  // this.showEdit = true
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
      } else {
        if (!subData.name) {
          that.$message.error('请输入支付名称')
        } else {
          if (!(/^[0-9]+(.[0-9]{2})?$/.test(subData.amount))) {
            that.$message.error('请输入正确的金额')
          } else {
            if (!subData.date_created) {
              let tip
              subData.type !== '1' ? tip = '支付日期' : tip = '出票日期'
              that.$message.error(`请选择正确的${tip}`)
            } else {
              if (!subData.ticket_date) {
                that.$message.error('请选择正确的出票日期')
              } else {
                if (!subData.payment_date) {
                  that.$message.error('请选择正确的汇票到期日')
                } else {
                  if (that.handleDate(subData.date_created) < that.handleDate(subData.ticket_date)){
                    that.$message.error('支付时间应大于出票时间')
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
                    subData.type = Number(subData.type) + 1
                    that.$ajax.patch(`/api/chain/payment/${subData.id}/`, subData).then(res => {
                      if (res.status === 200) {
                        // that.$message.success('修改成功')
                        // this.showEdit = true
                        let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
                        this.$router.push({
                          path: _url
                        })
                      } else {
                        that.$message.error('网络错误')
                      }
                    })
                  }
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
    },
    // 点击编辑按钮，子组建update创建数据
    handleEdit () {
      const that = this
      if (that.showEdit) {
        this.showItem = {
          orderInfo: that.$children[1].orderInfo,
          uploadData: that.$children[1].uploadData,
          subData: that.$children[1].subData,
          showList: false
        }
        this.showEdit = false
      } else {
        that.handleSubmit()
      }
    },
    // 切换导航，显示不同数据
    handleNav (index, item) {
      this.selIndex = index
      this.selId = item.id
      this.slideNav = this.orgSlide
      if (index === this.slideNav.length - 1 & this.btnStatus === '0') {
        this.showEdit = false
      } else {
        this.showEdit = true
      }
    },
    handleDate: function (date) {
      let a = date + ' 00:00:00'
      let st = new Date(a).getTime()
      return st
    },
    // 创建补充
    handleSupply () {
      this.showItem = null
      let slideNav = this.slideNav
      let arr = []
      slideNav.forEach((val, i) => {
        arr[i] = val
      })
      slideNav[slideNav.length] = {name: slideNav[0].name + `(变更${this.slideNav.length})`, id: slideNav[slideNav.length - 1].id}
      this.selIndex = slideNav.length - 1
      this.slideNav = slideNav
      this.showTitle = false
      this.showEdit = false
      this.orgSlide = arr
    },
    // 获取子组件信息
    handleChild (e) {
      this.btnStatus = e.status
      this.slideNav = e.slide
      this.contractId = e.contractId
      // this.selIndex = e.slide.length - 1
    },
    // 创建补充
    handleSupplySubmit () {
      const that = this
      let subData = that.$children[1].subData
      subData.settlement_id = that.$route.query.settlement_id || sessionStorage.originSettlementId
      subData.contract_id = that.contractId
      subData.name = this.slideNav[0].name + `(变更${this.slideNav.length - 1})`
      subData.pre_id = that.slideNav[that.slideNav.length - 1].id
      let agent = this.$children[1].agent
      subData.agent = []
      agent.forEach(val => {
        subData.agent.push(val.id)
      })
      let uploadData = this.$children[1].uploadData
      if (subData.type <= 1) {
        if (!(/^[0-9]+(.[0-9]{2})?$/.test(subData.amount))) {
          that.$message.error('请输入正确的金额')
        } else {
          if (!subData.date_created || subData.date_created === '') {
            let tip
            subData.type !== '1' ? tip = '支付日期' : tip = '出票日期'
            that.$message.error(`请选择正确的${tip}`)
          } else {
            subData.attachment = []
            uploadData.forEach(el => {
              subData.attachment.push(el.attachId || el.id)
            })
            subData.payment_info = {}
            let {gathering, gatheringCompany, getting_account, payment, paymentCompany, payment_account} = subData
            subData.payment_info = {gathering, gatheringCompany, getting_account, payment, paymentCompany, payment_account}
            subData.type = Number(subData.type) + 1
            that.$ajax.post(`/api/chain/payment/`, subData).then(res => {
              if (res.status === 201) {
                let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
                this.$router.push({
                  path: _url
                })
              }
            }).catch((err)=>{
              this.$message.error(err.response.data.detail)
            })
          }
        }
      } else {
        if (!(/^[0-9]+(.[0-9]{2})?$/.test(subData.amount))) {
          that.$message.error('请输入正确的金额')
        } else {
          if (!subData.date_created || subData.date_created === '') {
            let tip
            subData.type !== '1' ? tip = '支付日期' : tip = '出票日期'
            that.$message.error(`请选择正确的支付日期`)
          } else {
            if (!subData.ticket_date || subData.ticket_date === '') {
              that.$message.error('请选择正确的出票日期')
            } else {
              if (!subData.payment_date || subData.payment_date === '') {
                that.$message.error('请选择正确的汇票到期日')
              } else {
                if (that.handleDate(subData.date_created) < that.handleDate(subData.ticket_date)){
                  that.$message.error('支付时间应大于出票时间')
                } else {
                  subData.attachment = []
                  uploadData.forEach(el => {
                    subData.attachment.push(el.attachId || el.id)
                  })
                  subData.payment_info = {}
                  let {gathering, gatheringCompany, getting_account, payment, paymentCompany, payment_account} = subData
                  subData.payment_info = {gathering, gatheringCompany, getting_account, payment, paymentCompany, payment_account}
                  subData.type = Number(subData.type) + 1
                  that.$ajax.post(`/api/chain/payment/`, subData).then(res => {
                    if (res.status === 201) {
                      // that.$message.success('修改成功')
                      //   this.showEdit = true
                      //   that.btnStatus = '0'
                      //   that.$router.push({
                      //     query: merge(this.$route.query, {'payment_id': res.data.id})
                      //   })
                      let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
                      this.$router.push({
                        path: _url
                      })
                    }
                  }).catch((err)=>{
                    this.$message.error(err.response.data.detail)
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
.papers_container {
  .payment_section {
    width: 100%;
    //padding-top: 70px;
    padding-left: 20px;
  }
  display: flex;
  background: #f5f5f5;
  .location_wrap {
    background: #fff;
  }
  .order_nav {
    background:#ffffff;
    width:100%;
    height:42px;
    margin-top: 30px;
    ul {
      display: flex;
      flex-direction: row;
      border-bottom: 3px solid #e87626;
      li {
        min-width: 120px;
        padding: 0 8px;
        text-align: center;
        height: 42px;
        list-style: none;
        cursor: pointer;
        line-height: 42px;
        span {
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#999999;
          letter-spacing:0;
          text-align:center;
          font-weight: bold;
        }
      }
      // li:last-child {
      //   margin-left: 15px;
      // }
      .active {
        background:#e87626;
        span {
          color: #fff;
        }
      }
    }
  }
  .bills_wrap {
    padding: 40px 25px;
  }
  .btn_list {
    // height: 36px;
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
