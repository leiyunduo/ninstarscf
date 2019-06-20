<template>
  <div class="chain-order__inner">
    <div class="chain-order__item">
      <div class="nav_bar">
        <div class="order_nav">
          <ul>
            <li v-for="(item, index) in btnList" :key="index" :class="[showIndex === index ? 'active_li' : '']" @click="navClick(item, index)">
              <p v-if="index === 0">{{item.name}}</p>
              <p v-else>{{`变更${index}`}}</p>
            </li>
            <li @click="addChanges" v-show="is_active"><p><i class="el-icon-plus"></i>添加变更</p></li>
          </ul>
        </div>
      </div>
      <div class="chain-order__title">
        <span>订单计划</span>
      </div>
      <div class="chain-order__body">
        <div class="chain-order__form chain_flex">
          <div class="chain-order__form__group">
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">计划贸易日期:</label>
              <el-date-picker size="small" :disabled="isDisabled.orderFinishDate" v-model="order.orderFinishDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="chain-order__form__row ">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">{{Number(type) === 1 ? '计划出库' : '计划入库'}}日期:</label>
              <el-date-picker size="small" :disabled="isDisabled.orderDriverDate" v-model="order.orderDriverDate" type="date"  placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">计划结算日期:</label>
              <el-date-picker size="small" :disabled="isDisabled.orderSettleDate" v-model="order.orderSettleDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>商品信息</span>
      </div>
      <div class="chain-order__body">
        <div v-if="isView">
          <chain-table-view @calc_val="calc_price" :tableData="order.orderProductList"/>
        </div>
        <div v-else>
          <chain-table-edit @calc_val="calc_price" :tableData="order.orderProductList"/>
        </div>
        <div class="chain-order__form">
          <div class="chain-order__form__row chain_flex_end">
            <span class="chain-required-orange">*</span>
            <label for="">计划合计(元):</label>
            <input type="text" :disabled="isDisabled.orderValue" v-model="order.orderValue">
          </div>
          <div class="chain-order__form__row chain_flex_end">
            <span class="chain-text">参考合计：<strong class="isDisabled" :disabled="isDisabled.total_val">{{order.total_val}}</strong>(系统统计合计，仅限于参考)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>经办人</span>
      </div>
      <div class="chain-order__body">
        <div v-if="!isView">
          <agent-invite-edit :tableData="order.agent" @inviteAgent="addAgents"/>
        </div>
        <div v-else>
          <agent-invite-view :tableData="order.agent"/>
        </div>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-order__body">
        <textarea class="chain-textarea" :disabled="isDisabled.orderDesc" v-model="order.orderDesc"></textarea>
      </div>
    </div>
    <div class="chain-order__item chain_bg_default">
      <div class="chain-order__body">
        <div class="chain-btn__group">
          <div class="chain-btn chain-btn_active" v-show="project_status===0" @click="sureCommit">保存</div>
        </div>
      </div>
    </div>
    <agent v-if="joinAgent" @hideAgent = "hideagent" :rowSelectArr="order.agent" @onConfirm = "onconfirm"/>
  </div>
</template>

<script>
import ChainTableEdit from '@/components/chain_app/base/public/chainTableEdit_4'
import ChainTableView from '@/components/chain_app/base/public/chainTableView_4'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import AgentInviteView from '@/components/chain_app/base/public/agentTableView'
import Agent from '@/components/chain_app/base/public/agent'
export default {
  name: 'chainorderEdit',
  components: {
    ChainTableEdit, ChainTableView, AgentInviteEdit, AgentInviteView, Agent
  },
  props: ['contractId', 'chainType', 'chainId', 'orderPlanId', 'type'],
  data () {
    return {
      step: {selIndex: 1},
      project_status: '',
      order: {  
        orderProductList: [],
        orderUploadList: [],
        orderFinishDate: '',
        orderDriverDate: '',
        orderSettleDate: '',
        orderValue: '',
        orderDesc: '',
        total_val: 0,
        agent: []
      },
      orderErrMsg: {
        orderFinishDate: '计划贸易日期不能为空',
        orderDriverDate: '计划交货日期不能为空',
        orderSettleDate: '计划结算日期不能为空',
        orderValue: '计划合计金额不能为空'
      },
      isDisabled: {
        orderFinishDate: false,
        orderDriverDate: false,
        orderSettleDate: false,
        orderValue: false,
        orderDesc: false,
        total_val: false
      },
      order_cache: {
        orderProductList: [],
        orderUploadList: [],
        orderFinishDate: '',
        orderDriverDate: '',
        orderSettleDate: '',
        orderValue: '',
        orderDesc: '',
        total_val: 0
      },
      setIndex: -1,
      btnList: [],
      showIndex: 0,
      is_active: true,
      isView: false,
      prev_id: '',
      joinAgent: false,
      products: []
    }
  },
  methods: {
    onconfirm (e) {
      let _set = {}, _list = [...this.order.agent, ...e]
      this.order.agent = _list.reduce((prev, next) => {
        if(!_set[next.id]) {
          _set[next.id] = true
          prev.push(next)
        }
        return prev
      }, [])
    },
    addAgents (e) {
      this.joinAgent = true
    },
    hideagent (e) {
      this.joinAgent = e
    },
    sureCommit () {
      if (!this.dataCheck(this.order)) return
      // 获取附件信息
      let attachList = this.order.orderUploadList
      let attach_list = []
      if (attachList.length > 0) {
        attachList.forEach(element => {
          attach_list.push(element.id)
        })
      }
      let _agent = []
      for(var i = 0; i< this.order.agent.length; i++) {
        _agent.push(this.order.agent[i].id)
      }
      let params = {
        contract_id: this.contractId,
        product: this.products,
        attachment: attach_list,
        name: this.btnList[0].name + `(变更${this.btnList.length -1})`,
        date_created: this.order.orderFinishDate,
        deliver_date: this.order.orderDriverDate,
        settlement_date: this.order.orderSettleDate,
        amount: this.order.orderValue,
        note: this.order.orderDesc,
        agent: _agent
      }
      this.orderPlanModify(this.prev_id, params)
    },
    orderPlanModify (prev_id, params) {
      params.pre_id = prev_id
      this.$ajax.post(`/api/chain/order_plan/`, params).then(res => {
        if(res.status === 201) {
          let _url = Number(this.chainType) === 1 ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
          //this.$scrollToTop()
        }
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
    },
    orderPlanView (orderPlanId, is_view) {
      if (!orderPlanId) {
        this.project_status = 0
        return
      }
      this.$ajax.get(`/api/chain/order_plan/${orderPlanId}/`).then(res => {
        if (res.status === 200) {
          this.order.orderUploadList = res.data.att_list,
          this.order.orderFinishDate = res.data.date_created,
          this.order.orderDriverDate = res.data.deliver_date,
          this.order.orderSettleDate = res.data.settlement_date,
          this.order.orderValue = res.data.amount,
          // this.order.orderCreateDate = res.data.create_time.substring(0, res.data.create_time.indexOf('T'))
          this.order.orderDesc = res.data.note
          this.order.agent = res.data.agent_list
          this.project_status = Number(res.data.status)
          if (res.data.product.length > 0) {
            let product = '', productList = []
            this.order.total_val = 0
            res.data.product.forEach(element => {
              product = {
                product_name : element[0],
                product_unit : element[1],
                product_num : element[2],
                product_price : element[3],
                isEdit: false
              }
              productList.push(product)
              this.order.total_val += Number(element[3])
            })
            this.order.orderProductList = productList
          }
          if (!is_view) {
            let btn_list = []
            btn_list = res.data.id_list
            this.btnList = btn_list
            this.showIndex = this.btnList.length - 1
          }
        }
      })
    },
    dataCheck (obj) {
      const numReg = /^[0-9]+(.[0-9]{2})?$/
      let flag = true
      let check_obj = ''
      for (let item in obj) {
        if(['orderProductList','orderUploadList', 'orderDesc', 'total_val', 'orderCreateDate'].includes(item)) continue
        check_obj = typeof obj[item] === 'object' ? obj[item] : obj[item].trim()
        if(!check_obj && item !== `orderValue`) {
          this.$message.error(this.orderErrMsg[item])
          return !flag
        } else {
          if (!this.produceCheck()) {
            return !flag
          } else if (item === `orderValue` && !numReg.test(obj.orderValue)) {
            this.$message.error('实际合计必须为数值')
            return !flag
          }
        }
      }
      return flag
    },
    produceCheck () {
      let productList = this.order.orderProductList
      this.products = []
      let flag = false
      if(this.$children[3].EOS) {
        this.$message.error('请先保存商品信息')
        return false
      }
      if (productList.length > 0) {
        productList.forEach(element => {
          if (element.isEdit) {
            this.$message.error('请先保存商品信息')
          } else {
            flag = true
            let product = []
            for(let item in element) {
              product.push(element[item])
            }
            product.pop()
            this.products.push(product)
          } 
        })
        return flag
      } else {
        return true
      }
    },
    calc_price (list) {
      this.order.total_val = 0
      list.forEach(element => {
        this.order.total_val += Number(element.product_price)
      })
      this.order.total_val = this.toThousands(this.order.total_val)
    },
    navClick (item, i) {
      this.showIndex = i
      if (this.showIndex === this.btnList.length - 1 && this.is_active === false) {
        this.order = this.copyObject(this.order_cache)
      }
      this.dataRender({all_disable: true})
      this.orderPlanView(item.id, true)
    },
    // 添加变更
    addChanges () {
      this.btnList.push({name: ``})
      this.btnList[this.btnList.length-1].name = `变更${this.btnList.length-1}`    
      this.is_active = false
      this.showIndex = this.btnList.length - 1
      for(let item in this.order) {
        if (['orderProductList', 'orderUploadList', 'agent'].includes(item)) { 
          this.order[item] = []
        } else if (item !== 'orderName') {
          this.order[item] = ""
        }
      }
      this.prev_id = this.btnList[this.btnList.length-2].id
      this.project_status = 0
    },
    dataRender (obj) {
      if (obj.remove) {
        this.isView = false
        for(var item in this.isDisabled) {
          if (arr.includes(item)) {
            this.isDisabled[item] = false
          } else {
            this.isDisabled[item] = true
          }
        }
      } 
      if (obj.all_reset) {
        this.isView = false
        for(var item in this.isDisabled) {
          this.isDisabled[item] = false
        }
      }
      if (obj.all_disable) {
        this.isView = true
        for(var item in this.isDisabled) {
          this.isDisabled[item] = true
        }
      }
    },
    copyObject (obj) {
      let _new = JSON.stringify(obj) 
      return JSON.parse(_new) 
    }
  },
  mounted () {
    this.orderPlanView(this.orderPlanId)
  },
  watch: {
    order: {
      handler (newVal, old) {
        if (this.showIndex === this.btnList.length-1) {
          this.order_cache = this.copyObject(newVal)
        }
　　　},
　　　deep: true　
　　},
    project_status: function (newVal, old) {
      if (Number(newVal) === 1) {
        this.dataRender({all_disable: true})
      } else {
        this.dataRender({all_reset: true})
      }
    }
  }
}
</script>
