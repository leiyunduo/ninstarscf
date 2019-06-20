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
        <span>{{Number(contractType) === 1 ? '销售项目' : '采购项目'}}</span>
      </div>
      <div class="chain-contract__body">
        <div class="chain-contract__form">
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">项目名称:</label>
            <input type="text" maxlength="32" :disabled="btnList.length > 1 ? true : false" v-model="contract.contract_name">
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">{{Number(contractType) === 1 ? '采购方' : '销售方'}}</label>
            <input type="text" maxlength="32" :disabled="isDisabled.buy_company" @keyup="getCompanyList($event, contract.buy_company, 1)" v-model="contract.buy_company">
            <span class="chain-state_empty"  v-show="!isRegister && showIndex === btnList.length-1">未注册</span>
            <span class="chain-operate-invite" @click="toInvite()"  v-show="!isRegister && showIndex === btnList.length-1">邀请</span>
            <div class="chain-search-wrap">
              <ul class="chain-search__list">
                <li v-for="(item, index) in partnerCompanyList" :key="index" class="chain-search__list__item" @click="selectItem(item)">{{item.name}}</li>
              </ul>
            </div>     
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">{{Number(contractType) === 1 ? '采购方法人' : '销售方法人'}}</label>
            <input maxlength="32" type="text" :disabled="isDisabled.buyer" v-model="contract.buyer">
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">交付周期(天):</label>
            <input type="text" maxlength="16" :disabled="isDisabled.delivery_period" v-model="contract.delivery_period">
            <div class="text-tips">
              <span>注：<small>交付周期、支付周期必须为整数。</small></span>
            </div>
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">支付周期(天):</label>
            <input type="text" maxlength="16" :disabled="isDisabled.payment_period" v-model="contract.payment_period">
          </div>
          <div class="chain-contract__form__row">
            <!-- <span class="chain-required-orange">*</span> -->
            <label style="margin-left: 20px;" for="">{{Number(contractType) === 1 ? '销售方' : '采购方'}}</label>
            <a>{{contract.sale_company}}</a>
          </div>
          <div class="chain-contract__form__row">
            <!-- <span class="chain-required-orange">*</span> -->
            <label style="margin-left: 20px;" for="">{{Number(contractType) === 1 ? '销售方法人' : '采购方法人'}}</label>
            <a>{{contract.seller}}</a>
          </div>
        </div>
        <div class="chain-contract__content">
          <p class="chain-contract__content__desc">根据《中国人民共和国合同法》及其他法律，法规的有关规定，甲、乙双方在平等互利的基础上，遵循平等、自愿、公平及诚信的原则，经友好协商，达成如下合同内容：</p>
          <p>第一条：本合同有效期为
            <el-date-picker  type="daterange" :disabled="isDisabled.contract_time" v-model="contract.contract_time" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy - MM - dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
            ，甲方向乙方订购商品；
          </p>
          <p>第二条：本合同有效期内甲方订购乙方商品不少于
            <input type="text" maxlength="16" :disabled="isDisabled.pay_count" v-model="contract.pay_count"> 元；</p>
          <p>第三条：本合同有效期内，由发起方通过九星电子商务平台邀请交易方在平台记录全程供应链数据，至少有一方记录全程数据.</p>
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
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import AgentInviteView from '@/components/chain_app/base/public/agentTableView'
import Agent from '@/components/chain_app/base/public/agent'
import Invite from '@/components/administration/settings/invitingAdmin'
export default {
  name: 'chainContractEdit',
  components: {
    ChainUploadEdit, ChainUploadView, Invite, Agent, AgentInviteView, AgentInviteEdit
  },
  props: ['chainId', 'contractType', 'contractId', 'chainType'],
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
        pay_count: '',
        contract_desc: '',
        agent: [],
        payment_period: '',
        delivery_period: ''
      },
      errMsg: {
        contract_name: '项目名称不能为空',
        buy_company: '采购方不能为空',
        buyer: '方法人不能为空',
        contract_time: '合同有限期不能为空',
        pay_count: '支付金额不能为空',
        contract_desc: '备注描述不能为空',
        payment_period: '支付周期不能为空',
        delivery_period: '交付周期不能为空'
      },
      isDisabled: {
        contract_name: true,
        buy_company: true,
        buyer: true,
        contract_time: true,
        pay_count: true,
        contract_desc: true,
        payment_period: true,
        delivery_period: true
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
      }, 500)
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
                this.isRegister = true
                this.partnerCompanyList = list
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
    createFakeCompany (obj) {
      if (!String(obj._fakeName).trim()) return
      return new Promise ((resolve, reject) => {
        this.$ajax.post(`/api/chain/company/create_fake/`, {name: obj._fakeName, ns_type: obj._fakeType}).then(res => {
        if (res.status === 200) {
            obj.partner_company_id = res.data.id
            resolve(obj)
          }
        }).catch((err)=>{
          this.$ajax.get(`/api/chain/company/search/?name=${obj._fakeName}&ns_type=${1}`).then(res => {
            if (res.status === 200) {
              obj.partner_company_id = res.data[0].id
              resolve(obj)
            }
          })
        })
      })
    }, 
    selectItem (item) {
      this.contract.partner_company_id = item.id
      this.contract.buy_company = item.name
      this.partnerCompanyList = []
      this.isRegister = item.registered
      this.contract.buyer = item.legal_person_name
      this.isDisabled.buyer = item.legal_person_name ? true : false
    },
    contractEdit (params) {
      this.$ajax.patch(`/api/chain/contract/${params.contract_id}/`, params).then(res => {
        if (res.status === 200) {
          // this.$message.success('编辑成功')
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
    contractView (contract_id, is_view) {
      this.$ajax.get(`/api/chain/contract/${contract_id}/`).then(res => {
        if (res.status === 200) {
          this.contract.contract_name = res.data.id_list[0].name
          this.contract.buy_company = res.data.partner_company_name
          this.contract.buyer = res.data.partner_legal_person
          this.contract.partner_company_id = res.data.partner_company_id
          this.contract.sale_company = res.data.company_name
          this.contract.seller = res.data.legal_person
          this.contract.contract_time = [res.data.date_created, res.data.end_date]
          this.contract.pay_count = res.data.contract_value
          this.contract.contract_desc = res.data.note
          this.contract.attach_list = res.data.att_list
          this.contract.agent = res.data.agent_list
          this.contract.payment_period = res.data.payment_period
          this.contract.delivery_period = res.data.delivery_period
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
      let _int = /^[1-9]{0,1}\d+$/
      let errMsg = []
      let flag = true 
      let check_obj = ''
      for (var item in obj) {
        check_obj = (typeof obj[item] === 'object' || typeof obj[item] === 'number') ? obj[item] : obj[item].trim()
        if (!check_obj) {
          if (item === 'buyer') {
            let text = Number(this.contractType) === 1 ? '采购' : '销售'
            this.$message.error(text + this.errMsg[item])
          } else {
            this.$message.error(this.errMsg[item])
          }
          return !flag
        } else if (item === 'pay_count' && !numReg.test(obj.pay_count)) {
          this.$message.error('支付金额格必须为数字')
          return !flag
        } else if ((item === 'payment_period' || item === 'delivery_period') && (!_int.test(check_obj) || String(check_obj).indexOf(0) == 0)) {
          this.$message.error(`${item === 'payment_period' ? '支付' : '交付'}周期必须为整数`)
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
        payment_period: this.contract.payment_period,
        delivery_period: this.contract.delivery_period,
        contract_time: this.contract.contract_time,
        pay_count: this.contract.pay_count   
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
        chain_id: this.chain_id,
        name: this.btnList.length > 1 ? this.btnList[0].name + `(变更${this.btnList.length -1})` : this.contract.contract_name,
        date_created: this.contract.contract_time[0],
        note: this.contract.contract_desc,
        partner_company_id: this.contract.partner_company_id,
        partner_legal_person: this.contract.buyer,
        end_date: this.contract.contract_time[1],
        contract_value: this.contract.pay_count,
        contract_type: this.contractType,
        attachment: attach_list,
        agent: _agent,
        payment_period: this.contract.payment_period,
        delivery_period: this.contract.delivery_period
      }
      if (!this.contract.partner_company_id) {
        params._fakeName = this.contract.buy_company
        params._fakeType = 1
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
    this.contractView(this.contractId)
    document.addEventListener('click', () => {
      this.partnerCompanyList = []
    })
  }
}
</script>
