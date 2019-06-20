<template>
  <div class="settlement_container">
    <!-- <AppNav :father='{selIndex: 1}'></AppNav> -->
    <div class="invoice_section">
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
        <invoiceView v-if="showEdit" @childInfo='handleSlide' :selId='selId'></invoiceView>
        <invoiceEdit v-if="!showEdit" :showTitle='showTitle'></invoiceEdit>
      </div>
      <div class="btn_list" v-if="selIndex === slideNav.length - 1">
        <div @click="handleEdit" v-if="btnStatus === '0'">{{!showEdit ? '保存' : '修改'}}</div>
      </div>
      <div class="btn_list" v-if='!showTitle'>
        <div class="submit_data" v-if="btnStatus === '1'" @click="handleSupplySubmit">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import location from '@/components/location/location'
import invoiceEdit from './invoiceEdit'
import invoiceView from './invoiceView'
import merge from 'webpack-merge'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'invoiceShow',
  data () {
    return {
      location: [],
      role: 'business',
      selIndex: 0,
      selId: '0',
      // 用 child 获取
      slideNav: [],
      showItem: {},
      showEdit: true,
      // 控制编辑或者补充
      showTitle: true,
      btnStatus: true,
      invoice_id: ''
    }
  },
  components: {
    location, invoiceView, invoiceEdit, 
    // AppNav
  },
  // 构建location数据
  created () {
    let url = ''
    this.invoice_id = this.$route.query.invoice_id
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

    // 切换导航，显示不同数据
    handleNav (index, item) {
      this.showEdit = true
      this.selIndex = index
      this.selId = item.id
    },
    // 点击编辑按钮，未自组建update创建数据
    handleEdit () {
      const that = this
      if (that.showEdit) {
        that.showEdit = false
        that.showItem = {subData: that.$children[2].subData, uploadData: that.$children[2].uploadData}
      } else {
        that.handleSubmit()
      }
    },
    // 提交数据 （修改）
    handleSubmit () {
      const that = this
      let subData = this.$children[2].subData
      subData.agent =  []
      this.$children[2].agent.forEach(val => {
        subData.agent.push(val.id)
      })
      subData.invoice_type = Number(subData.invoice_type) + 1
      let uploadData = this.$children[2].uploadData
      delete subData.contraci_id
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
                if (!(/^[0-9]+(.[0-9]{2})?$/.test(subData.amount))) {
                  that.$message.error('请输入正确的发票金额')
                } else {
                  subData.attachment = []
                  uploadData.forEach(val => {
                    subData.attachment.push(val.attachId || val.id)
                  })
                  this.$ajax.get(`/api/chain/invoice/only/?invoice_code=${subData.invoice_code}&invoice_number=${subData.invoice_number}&company_id=${this.company_id}&invoice_id=${this.invoice_id}`).then(res => {
                    if (res.data) {
                      this.$message.error('该发票号码已被使用，请更换发票')
                    } else {
                      that.$ajax.patch(`/api/chain/invoice/${subData.id}/`, subData).then(res => {
                      if (res.status === 200) {
                        let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
                          this.$router.push({
                            path: _url
                          })
                        }
                      }).catch((err)=>{
                        this.$message.error(err.response.data.detail)
                      })
                    }
                  })
                }
              }
            }
          }
        }
      }
    },
    // 创建补充
    handleSupply () {
      this.showItem = null
      this.showTitle = false
      this.showEdit = false
      let slideNav = this.slideNav
      slideNav.push({name: slideNav[0].name + `(变更${this.slideNav.length})`, id: slideNav[slideNav.length - 1].id})
      this.selIndex = slideNav.length - 1
      this.slideNav = slideNav
    },
    // 保存
    handleSupplySubmit () {
      const that = this
      let subData = this.$children[2].subData
      let uploadData = this.$children[2].uploadData
      subData.invoice_type = Number(subData.invoice_type) + 1
      let agent = this.$children[2].agent
      subData.agent = []
      agent.forEach(val => {
        subData.agent.push(val.id)
      })
      delete subData.contraci_id
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
              if (!(/^[0-9]+(.[0-9]{2})?$/.test(subData.amount))) {
                that.$message.error('请输入正确的发票金额')
              } else {
                subData.attachment = []
                uploadData.forEach(val => {
                  subData.attachment.push(val.attachId || val.id)
                })
                subData.name = this.slideNav[0].name + `(变更${this.slideNav.length - 1})`
                subData.contract_id = that.contractId
                subData.pre_id = that.slideNav[that.slideNav.length - 1].id
                subData.settlement_id = that.settlementId
                this.$ajax.get(`/api/chain/invoice/only/?invoice_code=${subData.invoice_code}&invoice_number=${subData.invoice_number}&company_id=${this.company_id}&invoice_id=${subData.pre_id}`).then(res => {
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
                    }).catch((err)=>{
                      this.$message.error(err.response.data.detail)
                    }) 
                  }
                })
              }
            }
          }
        }
      }
    },
    // 从子组件获取slide 数字
    handleSlide (e) {
      this.slideNav = e.slide
      this.btnStatus = e.status
      this.contractId = e.contractId
      this.settlementId = e.settlementId
      this.selIndex = e.slide.length - 1
      // 修改操作按钮状态
    }
  }
}
</script>
<style lang="less" scoped>
.settlement_container {
  display: flex;
  background: #f5f5f5;
  .invoice_section {
    width: 100%;
    //padding-top: 70px;
    padding-left: 20px;
  }
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
      .active {
        background:#e87626;
        span {
          color: #fff;
        }
      }
      // li:last-child {
      //   margin-left: 12px;
      // }
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
