<template>
  <div class="chain-order__inner">
    <div class="chain-order__item">
      <div class="chain-order__title">
        <span>融资计划</span>
      </div>
      <div class="chain-order__body">
        <div class="chain-order__form chain_flex">
          <div class="chain-order__form__group chain-center chain-width-r7">
            <div class="chain-order__form__row">
              <label class="maxLength" for="">融资计划金额(元):</label>
              <input type="text" disabled maxlength="16" v-model="financing.amount">
            </div>
            <div class="chain-order__form__row ">
              <label class="maxLength" for="">融资计划账期(天):</label>
              <input type="text" disabled maxlength="16" v-model="financing.plan_date">
            </div>
            <div class="chain-order__form__row">
              <label class="maxLength" for="">预计融资时间:</label>
              <el-date-picker :disabled="true" v-model="financing.date_created" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
        <textarea class="chain-textarea" disabled v-model="financing.note"></textarea>
      </div>
    </div>
    <div class="chain-order__item chain_bg_default">
      <div class="chain-order__body">
        <!-- <div class="chain-btn__group">
          <div class="chain-btn chain-btn_save" @click='toEdit'>编辑</div>
          <div class="chain-btn chain-btn_sub">确认发布</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chainorderEdit',
  props: ['financingPlanId'],
  data () {
    return {
      step: {selIndex: 1},
      financing: {
        amount: '',
        plan_date: '',
        date_created: '',
        note:''
      }
    }
  },
  methods: {
    toEdit() {
      this.$emit('toEdit', {isEdit: '1'})
    }
  },
  mounted () {
    this.$ajax.get(`/api/chain/financing_plan/${financingPlanId}/`).then(res => {
      if (res.status === 200) {
        this.financing = res.data
      }
    })
  }
}
</script>
