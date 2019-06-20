<template>
  <div class="chain-contract__inner">
    <div class="chain-contract__item">
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
      <div class="chain-contract__title">
        <span>运输合同</span>
      </div>
      <div class="chain-contract__body">
        <div class="chain-contract__form">
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">运输合同名称:</label>
            <input type="text" :disabled="isDisabled.contract_name" v-model="contract.contract_name">
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">托运方:</label>
            <input type="text" :disabled="isDisabled.buy_company" v-model="contract.buy_company">     
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">托运方法人:</label>
            <input type="text" :disabled="isDisabled.buyer" v-model="contract.buyer">
          </div>
          <div class="chain-contract__form__row">
            <!-- <span class="chain-required-orange">*</span> -->
            <label style="margin-left: 20px;" for="">承运方:</label>
            <a>{{contract.sale_company}}</a>
          </div>
          <div class="chain-contract__form__row">
            <!-- <span class="chain-required-orange">*</span> -->
            <label style="margin-left: 20px;" for="">承运方法人:</label>
            <a>{{contract.seller}}</a>
          </div>
        </div>
        <div class="chain-contract__content">
          <p class="chain-contract__content__desc">根据托运方与承运方的共同协商，在遵循《合同法》的基础上，就托运方将发往全国各地的货物交给承运方承运事项制定如下条款：</p>
          <p>第一条：托运方自愿将发往全国各地的货物交给承运方承运。</p>
          <p>第二条：承运期间经双方约定
            <el-date-picker  type="daterange" :disabled="isDisabled.contract_time" v-model="contract.contract_time" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy - MM - dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
            止。
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
        <div v-if="!isView">
          <chain-upload-edit :tableData="contract.attach_list"/>
        </div>
        <div v-else>
          <chain-upload-view :tableData="contract.attach_list"/>
        </div>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>经办人</span>
      </div>
      <div class="chain-contract__body">
        <div v-if="!isView">
          <agent-invite-edit :tableData="contract.agent" @inviteAgent="addAgents"/>
        </div>
        <div v-else>
          <agent-invite-view :tableData="contract.agent"/>
        </div>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-contract__body">
        <textarea class="chain-textarea" :disabled="isDisabled.contract_desc" v-model="contract.contract_desc"></textarea>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__body">
        <div class="chain-btn__group">
          <div class="chain-btn chain-btn_active" v-show="project_status===0" @click="sureCommit">保存</div>
        </div>
      </div>
    </div>
    <agent v-if="joinAgent" @hideAgent = "hideagent" :rowSelectArr="contract.agent" @onConfirm = "onconfirm"/>
  </div>
</template>

<script>
import ChainUploadEdit from '@/components/chain_app/base/public/chainUploadEdit'
import ChainUploadView from '@/components/chain_app/base/public/chainUploadView'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import AgentInviteView from '@/components/chain_app/base/public/agentTableView'
import Agent from '@/components/chain_app/base/public/agent'
export default {
  name: 'chainContractEdit',
  components: {
    ChainUploadEdit, ChainUploadView, AgentInviteEdit, AgentInviteView, Agent
  },
  props: ['chainId', 'transportId', 'contractId', 'chainType'],
  data () {
    return {
      disabled: true,
      step: {selIndex: 1},
      project_status: '',
      contract: {
        contract_name: '',
        buy_company_id: '',
        buy_company: '',
        buyer: '',
        sale_company: '',
        seller:'',
        attach_list: [],
        contract_time: '',
        contract_desc: '',
        agent: []
      },
      isDisabled: {
        contract_name: false,
        buy_company: false,
        buyer: false,
        contract_time: false,
        contract_desc: false
      },
      contract_cache: {
        contract_desc: '',
        attach_list: [] 
      },
      btnList: [],
      showIndex: 0,
      is_active: true,
      isView: false,
      prev_id: '',
      joinAgent: false
    }
  },
  methods: {
    onconfirm (e) {
      let _set = {}, _list = [...this.contract.agent, ...e]
      this.contract.agent = _list.reduce((prev, next) => {
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
    contractPatch: function(prev_id, params) {
      params.pre_id = prev_id
      this.$ajax.post('/api/chain/transport_contract/', params).then(res => {
        if (res.status === 201) {
          let _url = Number(this.chainType) === 1 ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
        }
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
    },
    contractView (transportId, is_view) {
      if (!transportId) {
        this.project_status = 0
        return
      }
      this.$ajax.get(`/api/chain/transport_contract/${transportId}/`).then(res => {
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
    sureCommit () { // 获取附件信息
      let attachList = this.contract.attach_list
      let attach_list = []
      if (attachList.length > 0) {
        attachList.forEach(element => {
          attach_list.push(element.id)
        })
      }
      let _agent = []
      for(var i = 0; i< this.contract.agent.length; i++) {
        _agent.push(this.contract.agent[i].id)
      }
      let params = {
        contract_id: this.contractId,
        name: this.btnList[0].name + `(变更${this.btnList.length -1})`,
        date_created: this.contract.contract_time[0],
        note: this.contract.contract_desc,
        service_company_id: this.contract.buy_company_id,
        partner_legal_person: this.contract.buyer,
        end_date: this.contract.contract_time[1],
        contract_type: this.contract_type,
        attachment: attach_list,
        agent: _agent
      }
      this.contractPatch(this.prev_id, params)
    },
    navClick (item, i) {
      this.showIndex = i
      this.dataRender()
      this.contractView(item.id, true)
      if (this.showIndex === this.btnList.length - 1 && this.is_active === false) {
        this.contract.contract_desc = this.contract_cache.contract_desc
        this.contract.attach_list = this.contract_cache.attach_list
      }
    },
    // 添加变更
    addChanges () {
      this.btnList.push({name: ``})
      this.btnList[this.btnList.length-1].name = `变更${this.btnList.length-1}`    
      this.is_active = false
      this.showIndex = this.btnList.length - 1
      this.contract.attach_list = []
      this.contract.contract_desc = ''
      this.prev_id = this.btnList[this.btnList.length-2].id
      this.project_status = 0
    },
    dataRender (arr) {
      if (arr) {
        this.isView = false
        for(var item in this.isDisabled) {
          if (arr.includes(item)) {
            this.isDisabled[item] = false
          } else {
            this.isDisabled[item] = true
          }
        }
      } else {
        this.isView = true
        for(var item in this.isDisabled) {
          this.isDisabled[item] = true
        }
      }
    }
  },
  mounted () {
    this.contractView(this.transportId)
  },
  watch: {
    'contract.contract_desc': function (newVal, old) {
      if (this.showIndex === this.btnList.length-1) this.contract_cache.contract_desc = newVal
    },
    'contract.attach_list': function (newVal, old) {
      if (this.showIndex === this.btnList.length-1) this.contract_cache.attach_list = newVal
    },
    'project_status': function (newVal, old) {
      if (Number(newVal) === 1) {
        this.dataRender()
      } else {
        let _remove = ['contract_desc']
        this.dataRender(_remove)
      }
    }
  }
}
</script>
