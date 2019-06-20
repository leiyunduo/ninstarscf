<template>
  <div class="chain-order__inner">
    <div class="chain-order__item">
      <div class="chain-order__title">
        <span>订单计划</span>
      </div>
      <div class="chain-order__body">
        <div class="chain-order__form chain_flex">
          <div class="chain-order__form__group">
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">订单计划名称:</label>
              <input type="text" v-model="order.orderName">
            </div>
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">计划贸易日期:</label>
              <el-date-picker size="small" :disabled="isDisabled.orderFinishDate" v-model="order.orderFinishDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="chain-order__form__row">
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
        <chain-table @calc_val="calc_price" :tableData="order.orderProductList"/>
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
        <agent-invite-edit :tableData="order.agent" @inviteAgent="addAgents"/>
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
          <!-- <div class="chain-btn chain-btn_default" v-show="false">删除</div> -->
          <div class="chain-btn chain-btn_active" @click="sureCommit">保存</div>
        </div>
      </div>
    </div>
    <agent v-if="joinAgent" @hideAgent = "hideagent" :rowSelectArr="order.agent" @onConfirm = "onconfirm"/>
  </div>
</template>

<script>
import ChainTable from '@/components/chain_app/base/public/chainTableEdit_4'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import Agent from '@/components/chain_app/base/public/agent'
export default {
  name: 'chainorderEdit',
  components: {
    ChainTable, AgentInviteEdit, Agent
  },
  props: ['contractId', 'chainType', 'chainId', 'type'],
  data () {
    return {
      step: {selIndex: 1},
      order: {
        orderProductList: [],
        orderUploadList: [],
        orderName: '',
        orderFinishDate: '',
        orderDriverDate: '',
        orderSettleDate: '',
        orderValue:'',
        orderDesc: '',
        total_val: 0,
        agent: []
      },
      orderErrMsg: {
        orderName: '订单计划名称不能为空',
        orderFinishDate: '计划贸易日期不能为空',
        orderDriverDate: '计划交货时间不能为空',
        orderSettleDate: '计划结算日期不能为空',
        orderValue: '订单合计金额不能为空'
      },
      isDisabled: {
        orderFinishDate: false,
        orderDriverDate: false,
        orderSettleDate: false,
        orderValue: false,
        orderDesc: false,
        total_val: false
      },
      setIndex: -1,
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
        product: this.products,
        attachment: attach_list,
        name: this.order.orderName,
        date_created: this.order.orderFinishDate,
        deliver_date: this.order.orderDriverDate,
        settlement_date: this.order.orderSettleDate,
        amount: this.order.orderValue,
        note: this.order.orderDesc,
        agent: _agent
      }
      this.orderPlanCreate(this.contractId, params)
    },
    orderPlanCreate(contractId, params) {
      params.contract_id = contractId
      this.$ajax.post(`/api/chain/order_plan/`, params).then(res => {
        if (res.status === 201) {
          // this.$message.success('发布成功')
          let _url = Number(this.chainType) === 1 ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
          //this.$scrollToTop()
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
    }
  }
}
</script>
