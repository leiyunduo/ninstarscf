<template>
  <div class="chain-contract__inner">
    <div class="chain-contract__item">
      <div class="chain-contract__title">
        <span>仓储合同</span>
      </div>
      <div class="chain-contract__body">
        <div class="chain-contract__form chain_flex">
          <div class="chain-contract__form__group">
            <div class="chain-contract__form__row">
              <label for="">仓储合同名称:</label>
              <a class="default">{{contract.contract_name}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">保管方:</label>
              <a>{{contract.buy_company}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">保管方:</label>
              <a>{{contract.buyer}}</a>
            </div>
          </div>
          <div class="chain-contract__form__group">
            <div class="chain-contract__form__row">
              <label for="">存货方:</label>
              <a>{{contract.sale_company}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">存货方法人:</label>
              <a>{{contract.seller}}</a>
            </div>
            <div class="chain-contract__form__row">
              <label for="">创建时间:</label>
              <a>{{contract.contract_create_time}}</a>
            </div>
          </div>
        </div>
        <div class="chain-contract__content">
          <p class="chain-contract__content__desc">如下为堆藏及保管仓储物订立仓库契约条件：</p>
          <p>第一条：存货方将所有后开标示记载物品寄托与保管方营业的  <input type="text" maxlength="32" :disabled="true" v-model="contract.warehouse_name"> 仓库堆藏及保管，而保管方有保管该物品的义务。</p>
          <p>第二条：保管期间经双方约定自
            <el-date-picker  type="daterange" v-model="contract.contract_time" :disabled="true" size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy - MM - dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
            止。
          </p>
          <p class="chain-contract__content__desc">在合同期内，双方应严格遵守本协议，任何一方违约，都应承担对方的损失，若在合同执行中产生纠纷，协商无效时，诉讼方可向甲方所在的人民法院申请诉讼解决。</p>
        </div>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>电子原件或扫描件</span>
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
        <chain-upload :tableData="contract.agent"/>
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
  props: ['warehouseId'],
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
    contractView (warehouseId) {
      this.$ajax.get(`/api/chain/warehouse_contract/${warehouseId}/`).then(res => {
        if (res.status === 200) {
          this.contract.contract_name = res.data.id_list[0].name
          this.contract.buy_company = res.data.service_company_name
          this.contract.buyer = res.data.partner_legal_person
          this.contract.buy_company_id = res.data.service_company_id
          this.contract.sale_company = res.data.company_name
          this.contract.seller = res.data.legal_person
          this.contract.contract_time = [res.data.date_created, res.data.end_date]
          this.contract.contract_desc = res.data.note
          this.contract.attach_list = res.data.att_list
          this.contract.agent = res.data.agent_list
          this.contract.warehouse_name = res.data.warehouse_name
          this.project_status = Number(res.data.status)
          this.contract.contract_create_time = res.data.create_time.substring(0, res.data.create_time.indexOf('T'))
        }
      })
    }
  },
  mounted () {
    this.contractView(this.warehouseId)
  }
}
</script>
