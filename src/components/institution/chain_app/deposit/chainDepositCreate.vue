<template>
  <div class="chain-deposit__inner">
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title">
        <span>订金</span>
      </div>
      <div class="chain-deposit__body">
        <div class="chain-deposit__form chain_flex">
          <div class="chain-deposit__form__group chain-width-r3">
            <div class="chain-deposit__form__row">
              <span class="chain-required-orange">*</span>
              <label for="">订金名称:</label>
              <input type="text" maxlength='32'  v-model="deposit.pay_name">
            </div>
            <div class="chain-deposit__form__row chain-from_select">
              <span class="chain-required-orange">*</span>
              <label for="">支付方式:</label>
              <el-select size="small" v-model="deposit.pay_type"  @change="changeTab(deposit.pay_type)" placeholder="请选择支付方式">
                <el-option label="现金" value="1"></el-option>
                <el-option label="支票" value="2"></el-option>
                <el-option label="汇票 (银行承兑汇票)" value="3"></el-option>
                <el-option label="汇票 (商业承兑汇票)" value="4"></el-option>
                <el-option label="汇票 (信用证)" value="5"></el-option>
              </el-select>
            </div>
            <div class="chain-deposit__form__row">
              <span class="chain-required-orange">*</span>
              <label for="">票据金额(元):</label>
              <input type="text" maxlength='18'  v-model="deposit.pay_value">
              <!-- <span class="chain-tips_warning">{{warnModel.pay_value_warn}}</span> -->
            </div>
            <div class="chain-deposit__form__row">
              <span class="chain-required-orange">*</span>
              <label for="">{{Number(deposit.pay_type) === 1 ? '支付' : '出票'}}日期:</label>
              <el-date-picker size="small" class="chain-box_warning" type="date"  v-model="deposit.pay_date" placeholder="选择日期" format="yyyy - MM - dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="chain-deposit__form__row" v-if="Number(deposit.pay_type) > 2 ">
              <span class="chain-required-orange">*</span>
              <label for="">汇票到期日:</label>
              <el-date-picker size="small" type="date"  v-model="deposit.pay_deadline" placeholder="选择日期" format="yyyy - MM - dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
          <div class="chain-deposit__form__group chain-width-r3" v-if="Number(deposit.pay_type) !== 1">
            <div class="chain-deposit__form__row">
              <label for="">收款企业:</label>
              <input class="maxLength" type="text" v-model="deposit.receive_company">
            </div>
            <div class="chain-deposit__form__row">
              <label for="">收款机构:</label>
              <input class="maxLength" type="text" v-model="deposit.receive_institute">
            </div>
            <div class="chain-deposit__form__row">
              <label for="">收款账号:</label>
              <input class="maxLength" type="text" maxlength='32'  v-model="deposit.receive_account">
            </div>
          </div>
          <div class="chain-deposit__form__group chain-width-r3" v-if="Number(deposit.pay_type) !== 1">
            <div class="chain-deposit__form__row">
              <label for="">付款企业:</label>
              <input class="maxLength" type="text"  v-model="deposit.pay_company">
            </div>
            <div class="chain-deposit__form__row">
              <label for="">付款机构:</label>
              <input class="maxLength" type="text"  v-model="deposit.pay_institute">
            </div>
            <div class="chain-deposit__form__row">
              <label for="">付款账号:</label>
              <input class="maxLength" type="text" maxlength='32'  v-model="deposit.pay_account">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title hide-line">
        <span>电子原件或扫描件 </span>
      </div>
      <div class="chain-deposit__body">
        <chain-upload :tableData="deposit.attach_list"/>
      </div>
    </div>
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-deposit__body">
        <textarea class="chain-textarea"  v-model="deposit.pay_desc"></textarea>
      </div>
    </div>
    <div class="chain-deposit__item chain_bg_default">
      <div class="chain-deposit__body">
        <div class="chain-btn__group">
          <div class="chain-btn chain-btn_default" v-show="false">保存草稿</div>
          <div class="chain-btn chain-btn_active" @click='sureCommit'>保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChainUpload from '@/components/chain_app/base/public/chainUploadEdit'
export default {
  name: 'chaindepositEdit',
  components: {
    ChainUpload
  },
  props: ['contractId', 'orderId', 'chainId', 'chainType'],
  data () {
    return {
      step: {selIndex: 1},
      deposit: {
        pay_name: '',
        pay_type: '',
        pay_value: '',
        pay_date: '',
        pay_deadline: null,
        receive_company: '',
        receive_institute: '',
        receive_account: '',
        pay_company: '',
        pay_institute: '',
        pay_account: '',
        attach_list: [],
        pay_desc: ''
      },
      warnModel: {
        pay_name: '订金名称不能为空',
        pay_type: '请选择支付方式',
        pay_value: '票据金额不能为空',
        pay_date: '出票日期不能为空',
        pay_deadline: '汇票到期日不能为空'
      }
    }
  },
  methods: {
    changeTab (data) {
      this.deposit.pay_type = data
    },
    dataCheck (obj) {
      let flag = true
      let check_obj = ''
      let realNumReg = /^[0-9]+(.[0-9]{2})?$/
      for (let item in obj) {
        check_obj = typeof obj[item] === 'object' ? obj[item] : obj[item].trim()
        if (!check_obj) {
          if (item === 'pay_date') {
            let msg = Number(obj.pay_type) === 1 ? '支付日期不能为空' : '出票日期不能为空'
            this.$message.error(msg)
          } else {
            this.$message.error(this.warnModel[item])
          }
          return !flag
        } else if (item === 'pay_value' && !realNumReg.test(obj.pay_value)) {
          this.$message.error('票据金额格式有误')
          return !flag
        }
      }
      return flag
    },
    sureCommit () {
      let deposit_check = {
        pay_type: this.deposit.pay_type,
        pay_name: this.deposit.pay_name,
        pay_value: this.deposit.pay_value,
        pay_date: this.deposit.pay_date,
        pay_deadline: this.deposit.pay_deadline
      }
      let deposit_check1 = {
        pay_type: this.deposit.pay_type,
        pay_name: this.deposit.pay_name,
        pay_value: this.deposit.pay_value,
        pay_date: this.deposit.pay_date
      }
      let _check = Number(this.deposit.pay_type) > 2 ? deposit_check : deposit_check1
      if (!this.dataCheck(_check)) return
      // 获取附件信息
      let attachList = this.deposit.attach_list
      let attach_list = []
      if (attachList.length > 0) {
        attachList.forEach(element => {
          attach_list.push(element.id)
        })
      }
      let params = {
        name: this.deposit.pay_name,
        amount: this.deposit.pay_value,
        date_created: this.deposit.pay_date,
        payment_date: this.deposit.pay_deadline,
        type: this.deposit.pay_type,
        attachment: attach_list,
        note: this.deposit.pay_desc,
        payment_info: {
          receive_company: this.deposit.receive_company,
          receive_institute: this.deposit.receive_institute,
          receive_account: this.deposit.receive_account,
          pay_company: this.deposit.pay_company,
          pay_institute: this.deposit.pay_institute,
          pay_account: this.deposit.pay_account
        }
      }
      this.depositCreate(this.contractId, this.orderId, params)
    },
    depositCreate (contract_id, order_id, params) {
      params.order_id = order_id
      params.contract_id = contract_id
      this.$ajax.post(`/api/chain/deposit/`, params).then(res => {
        if (res.status === 201) {
          // this.$message.success('创建成功')
          let _url = Number(this.chainType) === 1 ? '/chain_app/receive_chain?id=' + this.chainId : '/chain_app/payment_chain?id=' + this.chainId
          this.$router.push({
            path: _url
          })
          //this.$scrollToTop()
        }
      })
    }
  }
}
</script>
