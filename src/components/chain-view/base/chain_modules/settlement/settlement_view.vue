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
          <li @click="handleSupply" v-if="showEdit && btnStatus === '1'">
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
        <div class="submit_data" @click="handleSupplySubmit">保存</div>
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
      showItem: {},
      selIndex: 0,
      // 编辑/补充 顶级按钮
      showEdit: true,
      // 控制补充或者修改 prop
      showTitle: true,
      // 操作按钮状态
      // 不同操作的不同按钮状态，在handleTab, 和handleSupply 编辑
      btnStatus: '-1',
    }
  },
  components: {
    location, settlementView, settlementEdit, 
    // AppNav
  },
  // 渲染location导航栏
  created () {
    let url = ''
    this.$route.query.chain_type === '1' ? url = '/chain_app/receive_chain?id=' + this.$route.query.chain_id :  url =  '/chain_app/payment_chain?id=' + this.$route.query.chain_id
    this.location = [
      {title: '链式记账', url: url},
      {title: '结算单'}
    ]
  },
  methods: {
    // 切换导航，显示不同数据
    handleNav (index, item) {
      this.showEdit = true
      this.selIndex = index
      this.selId = item.id
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
          orderInfo: that.$children[2].orderInfo,
          uploadData: that.$children[2].uploadData,
          subData: that.$children[2].subData,
          agent: that.$children[2].subData.agent_list,
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
      let sub = this.$children[2].subData
      sub.agent = []
      this.$children[2].agent.forEach(val => {
        sub.agent.push(val.id)
      })
      delete sub.contract_id
      sub.attachment = []
      this.$children[2].uploadData.forEach(val => {
        sub.attachment.push(val.id || val.attachId)
      })
      if (!sub.name) {
        // 判断订单名称
        this.$message.error('请输入结算单名称')
      } else {
        if (!sub.date_created) {
          // 判断出单日期
          that.$message.error('请选择出单日期')
        } else {
          if (!(/^[0-9]+(.[0-9]{2})?$/.test(sub.amount))) {
            that.$message.error('请填写正确的结算金额')
          } else {
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
          }
        }
      }
    },
    // 创建补充
    handleSupply () {
      this.showItem = null
      this.showEdit = false
      let slideNav = this.slideNav
      slideNav.push({name: slideNav[0].name + `(变更${this.slideNav.length})`, id: slideNav[slideNav.length - 1].id})
      this.selIndex = slideNav.length - 1
      this.slideNav = slideNav
      this.showTitle = false
    },
    // 保存
    handleSupplySubmit () {
      const that = this
      let sub = this.$children[2].subData
      let agent = this.$children[2].agent
      sub.agent = []
      agent.forEach(val => {
        sub.agent.push(val.id)
      })
      delete sub.contract_id
      sub.attachment = []
      this.$children[2].uploadData.forEach(val => {
        sub.attachment.push(val.id || val.attachId)
      })
        if (!sub.date_created) {
          // 判断出单日期
          that.$message.error('请选择出单日期')
        } else {
          if (!(/^[0-9]+(.[0-9]{2})?$/.test(sub.amount))) {
            that.$message.error('请填写正确的结算金额')
          } else {
            sub.name = this.slideNav[0].name + `(变更${this.slideNav.length - 1})`
            sub.pre_id = that.slideNav[that.slideNav.length - 1].id
            sub.order = []
            sub.order_info = []
            sub.contract_id = that.contractId
            console.log(sub)
            that.$ajax.post(`/api/chain/settlement/`, sub).then(res => {
              if (res.status === 201) {
                // that.$message.success('修改成功')
                that.showEdit = true
                that.btnStatus = '0'
                // that.$router.push({
                //   query: merge(this.$route.query, {'settlement_id': res.data.id})
                // })
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
</script>
<style lang="less" scoped>
.settlement_container {
  display: flex;
  background: #f5f5f5;
  .settlement_section {
    padding-left: 20px;
    width: 100%;
    //padding-top: 70px;
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
    }
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
