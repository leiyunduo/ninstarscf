<template>
  <div class="settlement_container">
    <!-- <AppNav :father='{selIndex: 1}' type='1'></AppNav> -->
    <div class="settlement_section">
      <!-- 展示面包屑导航 -->
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <!-- 横向切换补充 -->
      <div class="order_nav">
        <ul>
          <li v-for="(item, index) in slideNav" :class="selIndex === index ? 'active' : ''" :key='index' @click="handleNav(index, item)">
            <span>{{item.name}}</span>
          </li>
          <li @click="handleSupply" v-if="btnStatus === '1' && showEdit">
            <span>+添加变更</span>
          </li>
        </ul>
      </div>
      <!-- 单据view区 -->
      <div class="bills_wrap">
        <settlementView :selId='selId' v-if="showEdit" @childInfo='handleChild'></settlementView>
        <settlementEdit v-if="!showEdit" :showTitle='showTitle'></settlementEdit>
      </div>
      <!-- 操作区 -->
      <div class="btn_list" v-if="selIndex === slideNav.length - 1">
        <div @click="handleEdit" v-if="btnStatus === '0'" class="submit_data">{{!showEdit ? '保存' : '修改'}}</div>
      </div>
      <!-- 补充时操作按钮 -->
      <div class="btn_list" v-if='!showTitle'>
        <div class="submit_data" v-if="btnStatus === '1' && !showEdit" @click="handleSupplySubmit">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import location from '@/components/location/location'
import settlementEdit from './settlementEdit'
import settlementView from './settlementView'
import merge from 'webpack-merge';
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'settleView',
  data () {
    return {
      location: [],
      role: 'business',
      selId: '0',
      slideNav: [],
      showItem: 1,
      selIndex: 0,
      // 编辑/补充 顶级按钮
      showEdit: false,
      // 控制补充或者修改 prop
      showTitle: true,
      // 操作按钮状态
      // 不同操作的不同按钮状态，在handleTab, 和handleSupply 编辑
      btnStatus: '-1',
      orgNav: []
    }
  },
  components: {
    location, settlementView, settlementEdit, 
    // AppNav
  },
  // 渲染location导航栏
  created () {
    const that = this
    let url = ''
    this.$route.query.chain_type === '1' ? url = '/chain_app/receive_chain?id=' + this.$route.query.chain_id :  url =  '/chain_app/payment_chain?id=' + this.$route.query.chain_id
    this.location = [
      {title: '链式记账', url: url},
      {title: '结算单'}
    ]
    // 获取当前单据状态
    that.$ajax.get(`/api/chain/settlement/${that.$route.query.settlement_id}/`).then(res => {
      let slide = []
      let slideOrg = []
      res.data.id_list.forEach((val, i) => {
        i === 0 ? slide.push({id: val.id, name: val.name}) : slide.push({id: val.id, name: '变更' + i})
      })
      res.data.id_list.forEach((val, i) => {
        i === 0 ? slideOrg.push({id: val.id, name: val.name}) : slideOrg.push({id: val.id, name: '变更' + i})
      })
      that.slideNav = slide
      that.orgNav = slideOrg
      that.contractId = res.data.contract_id
      this.selIndex = slide.length - 1
      if (res.data.status === '0') {
        res.data.id_list.length > 1 ? that.showTitle = false : that.showTitle = true
        that.showEdit = false
      } else {
        that.showItem = null
        that.showTitle = false
        that.showEdit = true
      }
      that.btnStatus = res.data.status
    })
  },
  methods: {
    // 切换导航，显示不同数据
    handleNav (index, item) {
      this.selIndex = index
      this.selId = item.id
      this.slideNav = this.orgNav
      if (index === this.slideNav.length - 1 & this.btnStatus === '0') {
        this.showTitle = false
        this.showEdit = false
      } else {
        this.showEdit = true
        this.showTitle = false
      }
    },
    // 获取每次子组件更新数据
    handleChild (e) {
      this.btnStatus = e.status
      this.slideNav = e.slide
      this.contractId = e.contractId
      this.selIndex = e.slide.length - 1
    },
    // 点击编辑按钮，为组建update创建数据
    handleEdit () {
      const that = this
      // this.showEdit ? this.showEdit = false : this.showEdit = true
      if (that.showEdit) {
        this.showItem = {
          orderInfo: that.$children[1].orderInfo,
          uploadData: that.$children[1].uploadData,
          subData: that.$children[1].subData,
          agent: that.$children[1].subData.agent_list,
          showList: false
        }
        this.showEdit = false
      } else {
        that.handleSubmit()
      }
    },
    // 修改数据提交数据
    handleSubmit () {
      const that = this
      let sub = this.$children[1].subData
      sub.agent = []
      this.$children[1].agent.forEach(val => {
        sub.agent.push(val.id)
      })
      delete sub.contract_id
      delete sub.verifier
      sub.attachment = []
      this.$children[1].uploadData.forEach(val => {
        sub.attachment.push(val.id || val.attachId)
      })
      that.$ajax.patch(`/api/chain/settlement/${sub.id}/`, sub).then(res => {
        if (res.status === 200) {
          // that.$message.success('修改成功')
          // that.showEdit = true
          let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
          this.$router.push({
            path: _url
          })
        }
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
      // if (!sub.name) {
      //   // 判断订单名称
      //   this.$message.error('请输入结算单名称')
      // } else {
      //   if (!sub.date_created) {
      //     // 判断出单日期
      //     that.$message.error('请选择出单日期')
      //   } else {
      //     if (!(/^[0-9]+(.[0-9]{2})?$/.test(sub.amount))) {
      //       that.$message.error('请填写正确的结算金额')
      //     } else {
      //       if (!sub.p_date) {
      //         this.$message.error('请选择正确预计支付时间')
      //       } else {
      //         that.$ajax.patch(`/api/chain/settlement/${sub.id}/`, sub).then(res => {
      //           if (res.status === 200) {
      //             // that.$message.success('修改成功')
      //             // that.showEdit = true
      //             let _url = (this.$route.query.chain_type === `1`) ? '/chain_app/receive_chain?id='+ this.$route.query.chain_id : '/chain_app/payment_chain?id='+ this.$route.query.chain_id
      //             this.$router.push({
      //               path: _url
      //             })
      //           }
      //         }).catch((err)=>{
      //           this.$message.error(err.response.data.detail)
      //         })
      //       }
      //     }
      //   }
      // }
    },
    // 创建补充
    handleSupply () {
      const that = this
      let { p_date, date_created, amount } = that.$children[1].subData
      this.showItem = 1
      this.showEdit = false
      let arr = []
      let slideNav = this.slideNav
      slideNav.forEach((val, i) => {
        arr[i] = val
      })
      slideNav[slideNav.length] = {name: slideNav[0].name + `(变更${this.slideNav.length})`, id: slideNav[slideNav.length - 1].id}
      this.selIndex = slideNav.length - 1
      this.slideNav = slideNav
      this.showTitle = false
      this.orgNav = arr
    },
    // 保存
    handleSupplySubmit () {
      const that = this
      let sub = this.$children[1].subData
      let agent = this.$children[1].agent
      sub.agent = []
      agent.forEach(val => {
        sub.agent.push(val.id)
      })
      delete sub.contract_id
      sub.attachment = []
      this.$children[1].uploadData.forEach(val => {
        sub.attachment.push(val.id || val.attachId)
      })
      if (!sub.date_created) {
        that.$message.error('请选择出单日期')
      } else {
        if (!(/^[0-9]+(.[0-9]{2})?$/.test(sub.amount))) {
          that.$message.error('请填写正确的结算金额')
        } else {
          if (!sub.p_date) {
            that.$message.error('请选择正确预计支付日期')
          } else {
            sub.name = this.slideNav[0].name + `(变更${this.slideNav.length - 1})`
            sub.pre_id = that.slideNav[that.slideNav.length - 1].id
            sub.order = []
            sub.order_info = []
            sub.contract_id = that.contractId
            delete sub.verifier
            that.$ajax.post(`/api/chain/settlement/`, sub).then(res => {
              if (res.status === 201) {
                that.showEdit = true
                that.btnStatus = '0'
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
</script>
<style lang="less" scoped>
.settlement_container {
  display: flex;
  background: #f5f5f5;
  .settlement_section {
    // padding-left: 20px;
    width: 100%;
    //padding-top: 70px;
  }
  .location_wrap {
    background: #fff;
  }
  .order_nav {
    padding-left: 40px;
    width:100%;
    height:42px;
    margin-top: 30px;
    ul {
      display: flex;
      flex-direction: row;
      border-bottom: 3px solid #e87626;
      background:#ffffff;
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
    }
  }
  .bills_wrap {
    padding: 20px 40px;
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
