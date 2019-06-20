<template>
  <div class="chain-contract__inner">
    <div class="chain-contract__item">
      <div class="chain-contract__title">
        <span>运输合同</span>
      </div>
      <div class="chain-contract__body">
        <div class="chain-contract__form chain_flex">
          <div class="chain-contract__form__group">
            <div class="chain-contract__form__row">
              <label for="">运输合同名称:</label>
              <a class="default">{{contract.contract_name}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">托运方:</label>
              <a>{{contract.buy_company}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">托运方法人:</label>
              <a>{{contract.buyer}}</a>
            </div>
          </div>
          <div class="chain-contract__form__group">
            <div class="chain-contract__form__row">
              <label for="">承运方:</label>
              <a>{{contract.sale_company}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">承运方法人:</label>
              <a>{{contract.seller}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">创建时间:</label>
              <a>{{contract.contract_create_time}}</a>
            </div>
          </div>
        </div>
        <div class="chain-contract__content">
          <p class="chain-contract__content__desc">根据托运方与承运方的共同协商，在遵循《合同法》的基础上，就托运方将发往全国各地的货物交给承运方承运事项制定如下条款：</p>
          <p>第一条：托运方自愿将发往全国各地的货物交给承运方承运。</p>
          <p>第二条：承运期间经双方约定从<span class="chain-contract__text">{{contract.create_time}}至{{contract.end_time}}</span> 止。
          </p>
          <p>
            第三条：货物从承运之日起有效查询日期和索赔期在30日内，过期乙方可不承担任何责任。
          </p>
          <p class="chain-contract__content__desc">在合同期内，双方应严格遵守本协议，任何一方违约，都应承担对方的损失，若在合同执行中产生纠纷，协商无效时，诉讼方可向甲方所在的人民法院申请诉讼解决。</p>
        </div>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>原件或扫描件</span>
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
import AgentInviteView from '@/components/chain_app/base/public/agentTableView'
export default {
  name: 'chainContractInfo',
  components: {
    ChainUpload, AgentInviteView
  },
  props: ['transportId'],
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
    contractView (transportId) {
      this.$ajax.get(`/api/chain/transport_contract/${transportId}/`).then(res => {
        if (res.status === 200) {
          this.contract.contract_name = res.data.name,
          this.contract.buy_company = res.data.company_name,
          this.contract.buyer = res.data.legal_person,
          this.contract.sale_company = res.data.service_company_name,
          this.contract.seller = res.data.partner_legal_person,
          this.contract.create_time = res.data.date_created
          this.contract.end_time = res.data.end_date
          this.contract.contract_desc = res.data.note
          this.contract.attach_list = res.data.att_list
          this.contract.agent = res.data.agent_list
          this.contract.contract_create_time = res.data.create_time.substring(0, res.data.create_time.indexOf('T'))
        }
      })
    }
  },
  mounted () {
    this.contractView(this.transportId)
  }
}
</script>
