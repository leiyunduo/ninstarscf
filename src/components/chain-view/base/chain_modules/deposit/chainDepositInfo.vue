<template>
  <div class="chain-deposit__inner">
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title">
        <span>订金</span>
      </div>
      <div class="chain-deposit__body">
        <div class="chain-deposit__form chain_flex">
          <div class="chain-deposit__form__group chain-width-r3">
            <div class="chain-deposit__form__row chain-from_select">
              <label for="">支付方式:</label>
              <span>{{showType(deposit.pay_type)}}</span>
            </div>
            <div class="chain-deposit__form__row">
              <label for="">订金名称:</label>
              <span>{{deposit.pay_name}}</span>
            </div>
            <div class="chain-deposit__form__row">
              <label for="">票据金额(元):</label>
              <span>{{deposit.pay_value}}</span>
            </div>
            <div class="chain-deposit__form__row">
              <label for="">出票日期:</label>
              <span>{{deposit.pay_date || '暂无'}}</span>
            </div>
            <div class="chain-deposit__form__row">
              <label for="">汇票到期日:</label>
              <span>{{deposit.pay_deadline || '暂无'}}</span>
            </div>
          </div>
          <div class="chain-deposit__form__group chain-width-r3">
            <div class="chain-deposit__form__row">
              <label for="">收款企业:</label>
              <span>{{deposit.receive_company || '暂无'}}</span>
            </div>
            <div class="chain-deposit__form__row">
              <label for="">收款机构:</label>
              <span>{{deposit.receive_institute || '暂无'}}</span>
            </div>
            <div class="chain-deposit__form__row">
              <label for="">收款账号:</label>
              <span>{{deposit.receive_account || '暂无'}}</span>
            </div>
          </div>
          <div class="chain-deposit__form__group chain-width-r3">
            <div class="chain-deposit__form__row">
              <label for="">付款企业:</label>
              <span>{{deposit.pay_company || '暂无'}}</span>
            </div>
            <div class="chain-deposit__form__row">
              <label for="">付款机构:</label>
              <span>{{deposit.pay_institute || '暂无'}}</span>
            </div>
            <div class="chain-deposit__form__row">
              <label for="">付款账号:</label>
              <span>{{deposit.pay_account || '暂无'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title hide-line">
        <span>电子原件或扫描件</span>
      </div>
      <div class="chain-deposit__body">
        <chain-upload :tableData="deposit.attach_list"/>
      </div>
    </div>
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title hide-line">
        <span>经办人</span>
      </div>
      <div class="chain-deposit__body">
        <chain-upload :tableData="deposit.agent"/>
      </div>
    </div>
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-deposit__body">
        <textarea class="chain-textarea" disabled v-model="deposit.pay_desc"></textarea>
      </div>
    </div>
    <div class="chain-deposit__item chain_bg_default">
      <div class="chain-deposit__body">
        <!-- <div class="chain-btn__group">
          <div class="chain-btn chain-btn_save">编辑</div>
          <div class="chain-btn chain-btn_sub">确认</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ChainUpload from '@/components/chain_app/base/public/chainUploadView'
import AgentInviteView from '@/components/chain-view/base/public/agentTableView'
export default {
  name: 'chaindepositEdit',
  components: {
    ChainUpload, AgentInviteView
  },
  props: ['depositId'],
  data () {
    return {
      step: {selIndex: 1},
      deposit: {
        pay_name: '',
        pay_type: '',
        pay_value: '',
        pay_date: '',
        pay_deadline: '',
        receive_company: '',
        receive_institute: '',
        receive_account: '',
        pay_company: '',
        pay_institute: '',
        pay_account: '',
        attach_list: [],
        pay_desc: '',
        agent: []
      },
      warnModel: {
        pay_name: '订金名称不能为空',
        pay_type: '请选择支付方式',
        pay_value: '票据金额不能为空',
        pay_date: '出票日期不能为空',
        pay_deadline: '汇票到期日不能为空',
      }
    }
  },
  methods: {
    toEdit() {
      this.$emit('toEdit', {isEdit: '1'})
    },
    showType (key) {
      let flag = Number(key)
      let type = ''
      switch (flag) {
        case 1: type = '现金'
        break
        case 2: type = '支票'
        break
        case 3: type = '汇票 (银行承兑汇票)'
        break
        case 4: type = '汇票 (商业承兑汇票)'
        break
        case 5: type = '汇票 (信用证)'
      }
      return type
    },
    depositView (deposit_id) {
      this.$ajax.get(`/api/chain/deposit/${deposit_id}/`).then(res => {
        if (res.status === 200) {
          this.deposit.pay_name = res.data.name,
          this.deposit.pay_value = this.toThousands(res.data.amount),
          this.deposit.pay_date = res.data.date_created,
          this.deposit.pay_deadline = res.data.payment_date,
          this.deposit.pay_type = res.data.type,
          this.deposit.pay_desc = res.data.note,
          this.deposit.receive_company = res.data.payment_info.receive_company,
          this.deposit.receive_institute = res.data.payment_info.receive_institute,
          this.deposit.receive_account = res.data.payment_info.receive_account,
          this.deposit.pay_company = res.data.payment_info.pay_company,
          this.deposit.pay_institute = res.data.payment_info.pay_institute,
          this.deposit.pay_account = res.data.payment_info.pay_account,
          this.deposit.attach_list = res.data.att_list
          this.deposit.agent = res.data.agent_list
        }
      })
    }
  },
  mounted () {
    this.depositView(this.depositId)
  }
}
</script>
