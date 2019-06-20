<template>
  <div class="chain-deposit__inner">
    <div class="chain-deposit__item chain-table_padding">
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
      <div class="chain-deposit__title">
        <span>订金</span>
      </div>
      <div class="chain-deposit__body">
        <div class="chain-deposit__form chain_flex">
          <div class="chain-deposit__form__group chain-width-r3">
            <div class="chain-deposit__form__row chain-from_select">
              <span class="chain-required-orange">*</span>
              <label for="">支付方式:</label>
              <el-select v-model="deposit.pay_type" size="small" :disabled="isDisabled.pay_type" @change="changeTab(deposit.pay_type)" :placeholder="showVal(deposit.pay_type)">
                <el-option label="现金" value="1"></el-option>
                <el-option label="支票" value="2"></el-option>
                <el-option label="汇票 (银行承兑汇票)" value="3"></el-option>
                <el-option label="汇票 (商业承兑汇票)" value="4"></el-option>   
                <el-option label="汇票 (信用证)" value="5"></el-option>
              </el-select>
            </div>
            <div class="chain-deposit__form__row">
              <span class="chain-required-orange">*</span>
              <label for="">订金名称:</label>
              <input type="text" maxlength="32" :disabled="btnList.length > 1 ? true : false" v-model="deposit.pay_name">
            </div>
            <div class="chain-deposit__form__row">
              <span class="chain-required-orange">*</span>
              <label for="">票据金额(元):</label>
              <input type="text" maxlength="16" :disabled="isDisabled.pay_value" v-model="deposit.pay_value">
              <!-- <span class="chain-tips_warning">{{warnModel.pay_value_warn}}</span> -->
            </div>
            <div class="chain-deposit__form__row">
              <span class="chain-required-orange">*</span>
              <label for="">{{(Number(deposit.pay_type) === 1 || Number(deposit.pay_type) === 2) ? '支付' : '出票'}}日期:</label>
              <el-date-picker class="chain-box_warning" size="small" type="date" :disabled="isDisabled.pay_date" v-model="deposit.pay_date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="chain-deposit__form__row" v-if="Number(deposit.pay_type) > 2">
              <span class="chain-required-orange">*</span>
              <label for="">汇票到期日:</label>
              <el-date-picker type="date" size="small" :disabled="isDisabled.pay_deadline" v-model="deposit.pay_deadline" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
          <div class="chain-deposit__form__group chain-width-r3" v-if="Number(deposit.pay_type) !== 1">
            <div class="chain-deposit__form__row">
              <label for="">收款企业:</label>
              <input class="maxLength" type="text" :disabled="isDisabled.receive_company" v-model="deposit.receive_company">
            </div>
            <div class="chain-deposit__form__row">
              <label for="">收款机构:</label>
              <input class="maxLength" type="text" :disabled="isDisabled.receive_institute" v-model="deposit.receive_institute">
            </div>
            <div class="chain-deposit__form__row">
              <label for="">收款账号:</label>
              <input class="maxLength" maxlength="32" type="text" :disabled="isDisabled.receive_account" v-model="deposit.receive_account">
            </div>
          </div>
          <div class="chain-deposit__form__group chain-width-r3" v-if="Number(deposit.pay_type) !== 1">
            <div class="chain-deposit__form__row">
              <label for="">付款企业:</label>
              <input class="maxLength" type="text" :disabled="isDisabled.pay_company" v-model="deposit.pay_company">
            </div>
            <div class="chain-deposit__form__row">
              <label for="">付款机构:</label>
              <input class="maxLength" type="text" :disabled="isDisabled.pay_institute" v-model="deposit.pay_institute">
            </div>
            <div class="chain-deposit__form__row">
              <label for="">付款账号:</label>
              <input class="maxLength" maxlength="32" type="text" :disabled="isDisabled.pay_account" v-model="deposit.pay_account">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title hide-line">
        <span>原件或扫描件</span>
      </div>
      <div class="chain-deposit__body" v-if="isView">
        <chain-upload-view :tableData="deposit.attach_list"/>
      </div>
      <div class="chain-deposit__body" v-else>
        <chain-upload-edit :tableData="deposit.attach_list"/>
      </div>
    </div>
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title hide-line">
        <span>经办人</span>
      </div>
      <div class="chain-deposit__body">
        <div v-if="!isView">
          <agent-invite-edit :tableData="deposit.agent" @inviteAgent="addAgents"/>
        </div>
        <div v-else>
          <agent-invite-view :tableData="deposit.agent"/>
        </div>
      </div>
    </div>
    <div class="chain-deposit__item chain-table_padding">
      <div class="chain-deposit__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-deposit__body">
        <textarea class="chain-textarea" :disabled="isDisabled.pay_desc" v-model="deposit.pay_desc"></textarea>
      </div>
    </div>
    <div class="chain-deposit__item chain_bg_default">
      <div class="chain-deposit__body">
        <div class="chain-btn__group">
          <!-- <div class="chain-btn chain-btn_default" v-show="showIndex === btnList.length-1">保存草稿</div> -->
          <div class="chain-btn chain-btn_active" v-show="showIndex === btnList.length-1" @click='sureCommit'>保存</div>
        </div>
      </div>
    </div>
    <agent v-if="joinAgent" @hideAgent = "hideagent" :rowSelectArr="deposit.agent" @onConfirm = "onconfirm"/>
  </div>
</template>

<script>
import ChainUploadEdit from '@/components/chain_app/base/public/chainUploadEdit'
import ChainUploadView from '@/components/chain_app/base/public/chainUploadView'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import AgentInviteView from '@/components/chain_app/base/public/agentTableView'
import Agent from '@/components/chain_app/base/public/agent'
export default {
  name: 'chaindepositEdit',
  components: {
    ChainUploadEdit, ChainUploadView, AgentInviteEdit, AgentInviteView, Agent
  },
  props: ['depositId', 'chainType', 'chainId'],
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
        pay_desc: '',
        agent: []
      },
      warnModel: {
        pay_name: '订金名称不能为空',
        pay_type: '请选择支付方式',
        pay_value: '票据金额不能为空',
        pay_date: '出票日期不能为空',
        pay_deadline: '汇票到期日不能为空',
      },
      isDisabled: {
        pay_name: false,
        pay_type: false,
        pay_value: false,
        pay_date: false,
        pay_deadline: false,
        receive_company: false,
        receive_institute: false,
        receive_account: false,
        pay_company: false,
        pay_institute: false,
        pay_account: false,
        pay_desc: false
      },
      setIndex: -1,
      btnList: [],
      showIndex: 0,
      isView: false,
      joinAgent: false
    }
  },
  methods: {
    onconfirm (e) {
      let _set = {}, _list = [...this.deposit.agent, ...e]
      this.deposit.agent = _list.reduce((prev, next) => {
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
    showVal (data) {
      let _result = '请选择'
      let _obj = {
        '1' : '现金',
        '2' : '支票',
        '3' : '汇票 (银行承兑汇票)',
        '4' : '汇票 (商业承兑汇票)',
        '5' : '汇票 (信用证)'
      }
      for (var item in _obj) {
        if (data === item) {
          _result = _obj[item]
        }
      }
      return _result 
    },
    changeTab (data) {
      this.deposit.pay_type = data
    },
    dataCheck (obj) {
      let flag = true
      let check_obj = ''
      let realNumReg = /^[0-9]+(.[0-9]{2})?$/
      for (let item in obj) {
        check_obj = typeof obj[item] === 'object' ? obj[item] : obj[item].trim()
        if(!check_obj) {
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
        pay_deadline: this.deposit.pay_deadline,
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
      let _agent = []
      for(var i = 0; i< this.deposit.agent.length; i++) {
        _agent.push(this.deposit.agent[i].id)
      }
      let params = {
        name: this.btnList.length > 1 ? this.btnList[0].name + `(变更${this.btnList.length -1})` : this.deposit.pay_name,
        amount: this.deposit.pay_value,
        date_created: this.deposit.pay_date,
        payment_date: this.deposit.pay_deadline,
        type: this.deposit.pay_type,
        attachment: attach_list,
        note: this.deposit.pay_desc,
        agent: _agent,
        payment_info: {
          receive_company: this.deposit.receive_company,
          receive_institute: this.deposit.receive_institute,
          receive_account: this.deposit.receive_account,
          pay_company: this.deposit.pay_company,
          pay_institute: this.deposit.pay_institute,
          pay_account: this.deposit.pay_account
        }
      }
      this.depositEdit(this.depositId, params)
    },
    depositEdit (deposit_id, params) {
      this.$ajax.patch(`/api/chain/deposit/${deposit_id}/`, params).then(res => {
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
    depositView (deposit_id, is_view) {
      this.$ajax.get(`/api/chain/deposit/${deposit_id}/`).then(res => {
        if (res.status === 200) {
          console.log(res)
          this.deposit.pay_name = res.data.id_list[0].name,
          this.deposit.pay_value = res.data.amount,
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
        if (!is_view) {
          let btn_list = []
          btn_list = res.data.id_list
          this.btnList = btn_list
          this.showIndex = this.btnList.length - 1
        }
      })
    },
    navClick (item, i) {
      this.showIndex = i
      this.partnerCompanyList = []
      this.depositView(item.id, true)
      if (this.showIndex < this.btnList.length - 1) {
        this.toDisable()
      } else {
        this.toReset()
      }
    },
    toDisable () {
      this.isView = true
      for(var item in this.isDisabled) {
        this.isDisabled[item] = true
      }
    },
    toReset () {
      this.isView = false
      for(var item in this.isDisabled) {
        this.isDisabled[item] = false
      }
    }
  },
  mounted () {
    this.depositView(this.depositId)
  }
}
</script>
