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
        <span>融资计划</span>
      </div>
      <div class="chain-order__body">
        <div class="chain-order__form chain_flex">
          <div class="chain-order__form__group chain-center chain-width-r7">
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">融资计划金额(元):</label>
              <input type="text" maxlength="16" :disabled="isDisabled.amount" v-model="financing.amount">
            </div>
            <div class="chain-order__form__row ">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">融资计划账期(天):</label>
              <input type="text" maxlength="16" :disabled="isDisabled.plan_date" v-model="financing.plan_date">
            </div>
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label class="maxLength" for="">预计融资时间:</label>
              <el-date-picker :disabled="isDisabled.date_created" v-model="financing.date_created" type="date" placeholder="选择日期" format="yyyy - MM - dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-order__body">
        <textarea class="chain-textarea" :disabled="isDisabled.note" v-model="financing.note"></textarea>
      </div>
    </div>
    <div class="chain-order__item chain_bg_default">
      <div class="chain-order__body">
        <div class="chain-btn__group">
          <div class="chain-btn chain-btn_active" v-show="project_status===0" @click="sureCommit">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['contractId', 'chainType', 'chainId', 'financingPlanId'],
  data () {
    return {
      project_status: '',
      financing: {
        amount: '',
        plan_date: '',
        date_created: '',
        note:''
      },
      financingErrMsg: {
        amount: '融资金额不能为空',
        plan_date: '融资天数不能为空',
        date_created: '预计融资时间不能为空'
      },
      isDisabled: {
        amount: false,
        plan_date: false,
        date_created: false,
        note: false
      },
      financing_plan_cache: {
        amount: '',
        plan_date: '',
        date_created: '',
        note: ''
      },
      btnList: [],
      showIndex: 0,
      is_active: true,
      prev_id: ''
    }
  },
  methods: {
    sureCommit () {
      let _checkObj = {
        amount: this.financing.amount,
        plan_date: this.financing.plan_date,
        date_created: this.financing.date_created
      }
      let params = {
        contract_id: this.contractId,
        amount: this.financing.amount,
        plan_date: this.financing.plan_date,
        date_created: this.financing.date_created,
        note: this.financing.note
      }
      if (!this.dataCheck(_checkObj)) return
      this.financingPlanModify(this.prev_id, params)
    },
    financingPlanModify (prev_id, params) {
      params.pre_id = prev_id
      params.name = this.btnList[0].name + `(变更${this.btnList.length -1})`
      this.$ajax.post(`/api/chain/financing_plan/`, params).then(res => {
        if(res.status === 201) {
          // this.$message.success('变更成功')
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
    financingPlanView (financingPlanId, is_view) {
      if (!financingPlanId) {
        this.project_status = 0
        return
      }
      this.$ajax.get(`/api/chain/financing_plan/${financingPlanId}/`).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.financing = res.data
          this.project_status = Number(res.data.status)
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
        check_obj = typeof obj[item] === 'object' ? obj[item] : (typeof obj[item] === 'number' ? obj[item] : obj[item].trim())
        if(!check_obj) {
          this.$message.error(this.financingErrMsg[item])
          return !flag
        } else if (item === `amount` && !numReg.test(obj.amount)) {
          this.$message.error('融资金额必须为数值')
          return !flag
        }
      }
      return flag
    },
    navClick (item, i) {
      this.showIndex = i
      if (this.showIndex === this.btnList.length - 1 && this.is_active === false) {
        this.financing = this.copyObject(this.financing_plan_cache)
      }
      this.dataRender({all_disable: true})
      this.financingPlanView(item.id, true)
    },
    // 添加变更
    addChanges () {
      this.btnList.push({name: ``})
      this.btnList[this.btnList.length-1].name = `变更${this.btnList.length-1}`    
      this.is_active = false
      this.showIndex = this.btnList.length - 1
      this.prev_id = this.btnList[this.btnList.length-2].id
      for(let item in this.financing) {
        this.financing[item] = ""
      }
      this.project_status = 0
    },
    dataRender (obj) {
      if (obj.remove) {
        for(var item in this.isDisabled) {
          if (arr.includes(item)) {
            this.isDisabled[item] = false
          } else {
            this.isDisabled[item] = true
          }
        }
      } 
      if (obj.all_reset) {
        for(var item in this.isDisabled) {
          this.isDisabled[item] = false
        }
      }
      if (obj.all_disable) {
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
    this.financingPlanView(this.financingPlanId)
  },
  watch: {
    financing: {
      handler (newVal, old) {
        if (this.showIndex === this.btnList.length-1) {
          this.financing_plan_cache = this.copyObject(newVal)
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
