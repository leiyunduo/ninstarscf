<template>
  <div class="chain-contract__inner">
    <div class="chain-contract__item">
      <div class="chain-contract__title">
        <span>合作项目</span>
      </div>
      <div class="chain-contract__body">
        <div class="chain-contract__form chain_flex">
          <div class="chain-contract__form__group">
            <div class="chain-contract__form__row">
              <label for="">项目名称:</label>
              <a class="default">{{contract.contract_name}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">合作方:</label>
              <a>{{contract.buy_company}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">合作方法人:</label>
              <a>{{contract.buyer}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">交付周期:</label>
              <a>{{contract.delivery_period ? contract.delivery_period + '天' : '未上传'}}</a>
            </div>
          </div>
          <div class="chain-contract__form__group">
            <div class="chain-contract__form__row">
              <label for="">交易方:</label>
              <a>{{contract.sale_company}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">交易方法人:</label>
              <a>{{contract.seller}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">创建时间:</label>
              <a>{{contract.contract_create_time}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">支付周期:</label>
              <a>{{contract.payment_period ?　contract.payment_period　+ '天' : '未上传'}}</a>
            </div>
          </div>
        </div>
        <div class="chain-contract__content">
          <p class="chain-contract__content__desc">根据《中国人民共和国合同法》及其他法律，法规的有关规定，甲、乙双方在平等互利的基础上，遵循平等、自愿、公平及诚信的原则，经友好协商，达成如下合同内容：</p>
          <p>第一条：本合同有效期从 <span class="chain-contract__text">{{contract.create_time}}至{{contract.end_time}}</span>,甲方向乙方订购商品；
          </p>
          <p>第二条：本合同有效期内甲方订购乙方商品不少于 <span class="chain-contract__text">{{toThousands(contract.pay_count)}}</span> 元；</p>
          <p>第三条：本合同有效期内，由发起方通过九星电子商务平台邀请交易方在平台记录全程供应链数据，至少有一方记录全程数据.</p>
        </div>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>电子原件或扫描件（电子原件或扫描件）</span>
      </div>
      <div class="chain-contract__body">
        <chain-upload :tableData="contract.attach_list"/>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>经办人</span>
      </div>
      <div class="chain-contract__body">
        <agent-invite-view :tableData="contract.agent"/>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-contract__body">
        <textarea disabled class="chain-textarea" v-model="contract.contract_desc"></textarea>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__body">
        <div class="chain-btn__group">
          <!-- <div class="chain-btn chain-btn_save" @click="toEdit">编辑</div> -->
          <!-- <div class="chain-btn chain-btn_sub" @click="sureCommit">确认</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChainUpload from '@/components/chain_app/base/public/chainUploadView'
import AgentInviteView from '@/components/chain-view/base/public/agentTableView'
export default {
  name: 'chainContractInfo',
  components: {
    ChainUpload, AgentInviteView
  },
  props: ['chainId', 'contractId'],
  data () {
    return {
      step: {selIndex: 1},
      contract: {
        contract_name: '',
        buy_company: '',
        buyer: '',
        sale_company: '',
        seller: '',
        attach_list: [],
        create_time: '',
        end_time: '',
        pay_count: '',
        contract_desc: '',
        contract_create_time: '',
        agent: []
      },
    }
  },
  methods: {
    sureCommit () {
    },
    toEdit () {
      this.$emit('toEdit', {isEdit: '1'})
    },
    contractView (contract_id) {
      this.$ajax.get(`/api/chain/contract/${contract_id}/`).then(res => {
        if (res.status === 200) {
          this.contract.contract_name = res.data.name,
          this.contract.buy_company = res.data.company_name,
          this.contract.buyer = res.data.legal_person,
          this.contract.sale_company = res.data.partner_company_name,
          this.contract.seller = res.data.partner_legal_person,
          this.contract.create_time = res.data.date_created
          this.contract.end_time = res.data.end_date
          this.contract.pay_count = res.data.contract_value,
          this.contract.contract_desc = res.data.note
          this.contract.attach_list = res.data.att_list
          this.contract.agent = res.data.agent_list
          this.contract.contract_create_time = res.data.create_time.substring(0, res.data.create_time.indexOf('T'))
          this.contract.delivery_period = res.data.delivery_period
          this.contract.payment_period = res.data.payment_period
        }
      })
    }
  },
  mounted () {
    this.contractView(this.contractId)
  }
}
</script>
