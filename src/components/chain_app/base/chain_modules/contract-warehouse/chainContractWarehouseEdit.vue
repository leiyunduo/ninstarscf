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
          </ul>
        </div>
      </div>
      <div class="chain-contract__title">
        <span>仓储合同</span>
      </div>
      <div class="chain-contract__body">
        <div class="chain-contract__form">
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">仓储合同名称:</label>
            <input type="text" maxlength="32" :disabled="btnList.length > 1 ? true : false" v-model="contract.contract_name">
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">保管方:</label>
            <input maxlength="32" type="text" :disabled="isDisabled.buy_company" @keyup="getCompanyList($event, contract.buy_company, 3)" v-model="contract.buy_company">
            <span class="chain-state_empty" v-show="!isRegister && showIndex === btnList.length-1">未注册</span>
            <span class="chain-operate-invite" @click="toInvite()" v-show="!isRegister && showIndex === btnList.length-1">邀请</span>
            <div class="chain-search-wrap">
              <ul class="chain-search__list">
                <li v-for="(item, index) in partnerCompanyList" :key="index" class="chain-search__list__item" @click="selectItem(item)">{{item.name}}</li>
              </ul>
            </div>     
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">保管方法人:</label>
            <input maxlength="32" type="text" :disabled="isDisabled.buyer" v-model="contract.buyer">
          </div>
          <div class="chain-contract__form__row">
            <!-- <span class="chain-required-orange">*</span> -->
            <label style="margin-left: 20px;" for="">存货方:</label>
            <a>{{contract.sale_company}}</a>
          </div>
          <div class="chain-contract__form__row">
            <!-- <span class="chain-required-orange">*</span> -->
            <label style="margin-left: 20px;" for="">存货方法人:</label>
            <a>{{contract.seller}}</a>
          </div>
        </div>
        <div class="chain-contract__content">
          <p class="chain-contract__content__desc">如下为堆藏及保管仓储物订立仓库契约条件：</p>
          <p>第一条：存货方将所有后开标示记载物品寄托与保管方营业的  <input type="text" maxlength="32" :disabled="isDisabled.warehouse_name" v-model="contract.warehouse_name"> 仓库堆藏及保管，而保管方有保管该物品的义务。</p>
          <p>第二条：保管期间经双方约定自
            <el-date-picker  type="daterange" :disabled="isDisabled.contract_time" v-model="contract.contract_time" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy - MM - dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
            止。
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
          <!-- <div class="chain-btn chain-btn_default" v-show="showIndex === btnList.length-1">删除</div> -->
          <div class="chain-btn chain-btn_active" v-show="showIndex === btnList.length-1" @click="sureCommit">保存</div>
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
import ChainUploadEdit from '@/components/chain_app/base/public/chainUploadEdit'
import ChainUploadView from '@/components/chain_app/base/public/chainUploadView'
import Invite from '@/components/administration/settings/invitingAdmin'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import AgentInviteView from '@/components/chain_app/base/public/agentTableView'
import Agent from '@/components/chain_app/base/public/agent'
export default {
  name: 'chainContractEdit',
  components: {
    ChainUploadEdit, ChainUploadView, Invite, AgentInviteEdit, AgentInviteView, Agent
  },
  props: ['chainId', 'warehouseId', 'chainType'],
  data () {
    return {
      disabled: true,
      step: {selIndex: 1},
      project_status: '',
      contract: {
        contract_name: '',
        partner_company_id: '',
        buy_company: '',
        buyer: '',
        sale_company: '',
        seller:'',
        attach_list: [],
        contract_time: '',
        contract_desc: '',
        warehouse_name: '',
        agent: []
      },
      errMsg: {
        contract_name: '仓储合同名称不能为空',
        buy_company: '保管方不能为空',
        buyer: '保管方法人不能为空',
        contract_time: '合同有限期不能为空',
        contract_desc: '备注描述不能为空',
        warehouse_name: '仓库名称不能为空'
      },
      isDisabled: {
        contract_name: true,
        buy_company: true,
        buyer: true,
        contract_time: true,
        contract_desc: true,
        warehouse_name: true
      },
      btnList: [],
      showIndex: 0,
      isView: false,
      partnerCompanyList: [],
      isRegister: true,
      dialogVisible: false,
      timer: '',
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
    getCompanyList (e, name, type) {
      let keyword = name.trim()
      if (!keyword) return
      this.partnerCompanyList = []
      this.timer = e.timeStamp
      setTimeout(() => {
        if (this.timer - e.timeStamp === 0) {
          this.$ajax.get(`/api/chain/company/search/?name=${keyword}&ns_type=${type}`).then(res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                var list = res.data
                this.partnerCompanyList = list
                this.isRegister = true
              } else {
                this.isRegister = false
                this.isDisabled.buyer = false
                this.contract.buyer = ''
                this.contract.partner_company_id = ''
              }
            }
          })
        }
      }, 500)
    },
    selectItem (item) {
      this.contract.partner_company_id = item.id
      this.contract.buy_company = item.name
      this.partnerCompanyList = []
      this.isRegister = item.registered
      this.contract.buyer = item.legal_person_name
      this.isDisabled.buyer = item.legal_person_name ? true : false
      console.log(item)
    },
    createFakeCompany (obj) {
      if (!String(obj._fakeName).trim()) return
      return new Promise ((resolve, reject) => {
        this.$ajax.post(`/api/chain/company/create_fake/`, {name: obj._fakeName, ns_type: obj._fakeType}).then(res => {
        if (res.status === 200) {
            obj.partner_company_id = res.data.id
            resolve(obj)
          }
        }).catch((err)=>{
          this.$ajax.get(`/api/chain/company/search/?name=${obj._fakeName}&ns_type=${obj._fakeType}`).then(res => {
            if (res.status === 200) {
              obj.partner_company_id = res.data[0].id
              resolve(obj)
            }
          })
        })
      })
    },
    contractEdit (params) {
      this.$ajax.patch(`/api/chain/warehouse_contract/${params.warehouseId}/`, params).then(res => {
        if (res.status === 200) {
          let _url = Number(this.chainType) === 1 ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
        }
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
    },
    contractView (warehouseId, is_view) {
      this.$ajax.get(`/api/chain/warehouse_contract/${warehouseId}/`).then(res => {
        if (res.status === 200) {
          this.contract.contract_name = res.data.id_list[0].name
          this.contract.buy_company = res.data.service_company_name
          this.contract.buyer = res.data.partner_legal_person
          this.contract.partner_company_id = res.data.service_company_id
          this.contract.sale_company = res.data.company_name
          this.contract.seller = res.data.legal_person
          this.contract.contract_time = [res.data.date_created, res.data.end_date]
          this.contract.contract_desc = res.data.note
          this.contract.attach_list = res.data.att_list
          this.contract.warehouse_name = res.data.warehouse_name
          this.contract.agent = res.data.agent_list
          this.project_status = Number(res.data.status)
          if (!is_view) {
            let btn_list = []
            btn_list = res.data.id_list
            this.btnList = btn_list
            this.showIndex = this.btnList.length - 1
            let flag = this.btnList.length > 1 ? 2 : 1
            this.toReset(flag)
          }
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
        warehouse_name: this.contract.warehouse_name,
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
        warehouseId: this.warehouseId,
        name: this.btnList.length > 1 ? this.btnList[0].name + `(变更${this.btnList.length -1})` : this.contract.contract_name,
        date_created: this.contract.contract_time[0],
        note: this.contract.contract_desc,
        service_company_id: this.contract.partner_company_id,
        partner_legal_person: this.contract.buyer,
        end_date: this.contract.contract_time[1],
        warehouse_name: this.contract.warehouse_name,
        attachment: attach_list,
        agent: _agent
      }
      if (!this.contract.partner_company_id) {
        params._fakeName = this.contract.buy_company
        params._fakeType = 3
        this.createFakeCompany(params).then(this.contractEdit).catch((reason)=> {
          console.err('发生异常')
        })
      } else {
        this.contractEdit(params)
      }
    },
    navClick (item, i) {
      this.showIndex = i
      this.partnerCompanyList = []
      this.contractView(item.id, true)
      if (this.showIndex < this.btnList.length - 1) {
        this.toDisable()
      } else {
        this.toReset(2)
      }
    },
    toDisable () {
      this.isView = true
      for(var item in this.isDisabled) {
        this.isDisabled[item] = true
      }
    },
    toReset (flag) {
      this.isView = false
      for(var item in this.isDisabled) {
        if (flag === 1 && item !== 'buyer') {
          this.isDisabled[item] = false
        } else {
          if (item === 'contract_desc') {
            this.isDisabled[item] = false
          }
        }
      }
    }
  },
  mounted () {
    this.contractView(this.warehouseId)
    document.addEventListener('click', () => {
      this.partnerCompanyList = []
    })
  }
}
</script>
