<template>
  <div class="chain-order__inner">
    <div class="chain-order__item">
      <div class="chain-order__title">
        <span>融资计划</span>
      </div>
      <div class="chain-order__body">
        <div class="chain-order__form chain_flex">
          <div class="chain-order__form__group chain-center chain-width-r7">
            <!-- <div class="chain-order__form__row">
              <label class="maxLength" for="">融资计划名称:</label>
              <input type="text" maxlength="32" v-model="financing.name">
            </div> -->
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">融资计划金额(元):</label>
              <input type="text" maxlength="16" v-model="financing.amount">
            </div>
            <div class="chain-order__form__row ">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">融资计划账期(天):</label>
              <input type="text" maxlength="16" v-model="financing.plan_date">
            </div>
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">预计融资时间:</label>
              <el-date-picker  v-model="financing.date_created" type="date" placeholder="选择日期" format="yyyy - MM - dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>商品信息</span>
      </div>
      <div class="chain-order__body">
        <chain-table-edit @calc_val="calc_price" :tableData="order.orderProductList"/>
        <div class="chain-order__form">
          <div class="chain-order__form__row chain_flex_end">
            <span class="chain-required-orange">*</span>
            <label for="">实际合计(元):</label>
            <input type="text" :disabled="isDisabled.orderValue" v-model="order.orderValue">
          </div>
          <div class="chain-order__form__row chain_flex_end">
            <span class="chain-text">参考合计：<strong class="isDisabled" :disabled="isDisabled.total_val">{{order.total_val}}</strong>(系统统计合计，仅限于参考)</span>
          </div>
        </div>
      </div>
    </div> -->
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-order__body">
        <textarea class="chain-textarea" v-model="financing.note"></textarea>
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
  </div>
</template>

<script>
export default {
  name: '',
  props: ['contractId', 'chainType', 'chainId'],
  data () {
    return {
      step: {selIndex: 1},
      financing: {
        name: '',
        amount: '',
        plan_date: '',
        date_created: '',
        note:''
      },
      financingErrMsg: {
        name: '融资计划名称不能为空',
        amount: '融资金额不能为空',
        plan_date: '融资天数不能为空',
        date_created: '预计融资时间不能为空'
      }
    }
  },
  methods: {
    sureCommit () {
      let _checkObj = {
        amount: this.financing.amount,
        plan_date: this.financing.plan_date,
        date_created: this.financing.date_created
      }
      if (!this.dataCheck(_checkObj)) return
      let params = {
        name: '融资计划',
        amount: this.financing.amount,
        plan_date: this.financing.plan_date,
        date_created: this.financing.date_created,
        note: this.financing.note
      }
      this.financingCreate(this.contractId, params)
    },
    financingCreate(contractId, params) {
      params.contract_id = contractId
      this.$ajax.post(`/api/chain/financing_plan/`, params).then(res => {
        if (res.status === 201) {
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
        check_obj = typeof obj[item] === 'object' ? obj[item] : obj[item].trim()
        if(!check_obj) {
          this.$message.error(this.financingErrMsg[item])
          return !flag
        } else if (item === `amount` && !numReg.test(obj.amount)) {
          this.$message.error('融资金额必须为数值')
          return !flag
        }
      }
      return flag
    }
  }
}
</script>
