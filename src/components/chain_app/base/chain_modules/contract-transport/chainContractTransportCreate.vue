<template>
  <div class="chain-contract__inner">
    <div class="chain-contract__item">
      <div class="chain-contract__title">
        <span>运输合同</span>
      </div>
      <div class="chain-contract__body">
        <div class="chain-contract__form">
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">运输合同名称:</label>
            <input type="text" maxlength="32" v-model="contract.contract_name">
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">托运方:</label>
            <input type="text" maxlength="32" @keyup="getCompanyList($event, contract.buy_company, 3)" v-model="contract.buy_company">
            <span class="chain-state_empty" v-show="!hasCompany">未注册</span>
            <span class="chain-operate-invite" @click="toInvite()" v-show="!hasCompany">邀请</span>
            <div class="chain-search-wrap">
              <ul class="chain-search__list">
                <li v-for="(item, index) in partnerCompanyList" :key="index" class="chain-search__list__item" @click="selectItem(item)">{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">托运方法人:</label>
            <input maxlength="32" type="text" :disabled="isLegalPerson" v-model="contract.buyer">
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
            <el-date-picker  type="daterange" v-model="contract.contract_time" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy - MM - dd 日" value-format="yyyy-MM-dd">
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
        <chain-upload :tableData="contract.attach_list"/>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>经办人</span>
      </div>
      <div class="chain-contract__body">
        <agent-invite-edit :tableData="contract.agent" @inviteAgent="addAgents"/>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-contract__body">
        <textarea class="chain-textarea" v-model="contract.contract_desc"></textarea>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__body">
        <div class="chain-btn__group">
          <!-- <div class="chain-btn chain-btn_default" v-show="false">删除</div> -->
          <div class="chain-btn chain-btn_active" @click="sureCommit">保存</div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <invite ref="invite" :hideList="true" @hideMoadal="toHideModal"/>
    </el-dialog>
    <agent v-if="joinAgent" @hideAgent = "hideagent" :rowSelectArr="contract.agent" @onConfirm = "onconfirm"/>
  </div>
</template>

<script>
import ChainUpload from '@/components/chain_app/base/public/chainUploadEdit'
import Invite from '@/components/administration/settings/invitingAdmin'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import Agent from '@/components/chain_app/base/public/agent'
export default {
  name: 'chainContractEdit',
  components: {
    ChainUpload, Invite, AgentInviteEdit, Agent
  },
  props: ['contractId', 'chainId', 'chainType'], 
  data () {
    return {
      dialogVisible: false,
      disabled: true,
      step: {selIndex: 1},
      contract: {
        contract_name: '',
        buy_company: '',
        buyer: '',
        sale_company: '',
        service_company_id: '',
        seller:'',
        attach_list: [],
        contract_time: '',
        contract_desc: '',
        agent: []
      },
      errMsg: {
        contract_name: '运输合同名称不能为空',
        buy_company: '托运方不能为空',
        buyer: '托运方法人不能为空',
        contract_time: '合同有限期不能为空',
        contract_desc: '备注描述不能为空'
      },
      partnerCompanyList: [],
      hasCompany: true,
      timer: '',
      isLegalPerson: false,
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
    toInvite () {
      this.dialogVisible = true
      setTimeout(()=> {
        this.$refs.invite.startInviting()
      },500)
    },
    toHideModal (e) {
      this.dialogVisible = e
    },
    contractCreate: function(params) {
      this.$ajax.post('/api/chain/transport_contract/', params).then(res => {
        if (res.status === 201) {
          let _url = Number(this.chainType) === 1 ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
        }
      })
    },
    dataCheck (obj) {
      let numReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
      let errMsg = []
      let flag = true 
      let check_obj = ''
      for (var item in obj) {
        check_obj = typeof obj[item] === 'object' ? obj[item] : obj[item].trim()
        if (!check_obj) {
          this.$message.error(this.errMsg[item])
          return !flag
        }
      }
      return flag
    },
    sureCommit () { // 获取附件信息
      let _checkObj = {
        contract_name: this.contract,
        buy_company: this.contract.buy_company,
        buyer: this.contract.buyer,
        contract_time: this.contract.contract_time
      }
      if (!this.dataCheck(_checkObj)) return
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
        name: this.contract.contract_name,
        date_created: this.contract.contract_time[0],
        note: this.contract.contract_desc,
        service_company_id: this.contract.service_company_id,
        partner_legal_person: this.contract.buyer,
        end_date: this.contract.contract_time[1],
        contract_type: this.contractType,
        attachment: attach_list,
        agent: _agent
      }
      if (!this.contract.service_company_id) {
        params._fakeName = this.contract.buy_company
        params._fakeType = 3
        this.createFakeCompany(params).then(this.contractCreate).catch((reason)=> {
          console.err('发生异常')
        })
      } else {
        this.contractCreate(params)
      }
    },
    getCompanyInfo () {
      this.$ajax.get(`/api/chain/company/myself/`).then(res => {
        if (res.status === 200) {
          this.contract.seller = res.data.legal_person
          this.contract.sale_company = res.data.company_name
        }
      })
    },
    getCompanyList (e, name, type) {
      let keyword = name.trim()
      if (!keyword) return
      this.partnerCompanyList = []
      this.contract.service_company_id = ''
      this.timer = e.timeStamp
      setTimeout(() => {
        if (this.timer - e.timeStamp === 0) {
          this.$ajax.get(`/api/chain/company/search/?name=${keyword}&ns_type=${type}`).then(res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                var list = res.data
                this.partnerCompanyList = list
                this.hasCompany = true
              } else {
                this.hasCompany = false
                this.isLegalPerson = false
                this.contract.buyer = ''
              }
            }
          })
        }
      }, 500)
    },
    createFakeCompany (obj) {
      if (!String(obj._fakeName).trim()) return
      return new Promise ((resolve, reject) => {
        this.$ajax.post(`/api/chain/company/create_fake/`, {name: obj._fakeName, ns_type: obj._fakeType}).then(res => {
        if (res.status === 200) {
            obj.service_company_id = res.data.id
            resolve(obj)
          }
        }).catch((err)=>{
          this.$ajax.get(`/api/chain/company/search/?name=${obj._fakeName}&ns_type=${obj._fakeType}`).then(res => {
            if (res.status === 200) {
              obj.service_company_id = res.data[0].id
              resolve(obj)
            }
          })
        })
      })
    },   
    selectItem (item) {
      this.contract.service_company_id = item.id
      this.contract.buy_company = item.name
      this.partnerCompanyList = []
      this.hasCompany = item.registered
      this.contract.buyer = item.legal_person_name
      this.isLegalPerson = item.legal_person_name ? true : false
    }
  },
  mounted () {
    this.getCompanyInfo()
    document.addEventListener('click', () => {
      this.partnerCompanyList = []
    })
  }
}
</script>
