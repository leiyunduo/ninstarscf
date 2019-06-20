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
            <input type="text" :disabled="btnList.length > 1 ? true : false" v-model="contract.contract_name">
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">{{Number(contractType) === 1 ? '采购方' : '销售方'}}</label>
            <input type="text" :disabled="isDisabled.buy_company" @keyup="getCompanyList(contract.buy_company, 1)" v-model="contract.buy_company">
            <span class="chain-state_empty" v-show="isRegister && showIndex === btnList.length-1">未注册</span>
            <span class="chain-operate-invite" v-show="isRegister && showIndex === btnList.length-1">邀请</span>
            <div class="chain-search-wrap">
              <ul class="chain-search__list">
                <li v-for="(item, index) in partnerCompanyList" :key="index" class="chain-search__list__item" @click="selectItem(item)">{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">{{Number(contractType) === 1 ? '采购方法人' : '销售方法人'}}</label>
            <input type="text" :disabled="isDisabled.buyer" v-model="contract.buyer">
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">{{Number(contractType) === 1 ? '销售方' : '采购方'}}</label>
            <a>{{contract.sale_company}}</a>
          </div>
          <div class="chain-contract__form__row">
            <span class="chain-required-orange">*</span>
            <label for="">{{Number(contractType) === 1 ? '销售方法人' : '采购方法人'}}</label>
            <a>{{contract.seller}}</a>
          </div>
        </div>
        <div class="chain-contract__content">
          <p class="chain-contract__content__desc">根据《中国人民共和国合同法》及其他法律，法规的有关规定，甲、乙双方在平等互利的基础上，遵循平等、自愿、公平及诚信的原则，经友好协商，达成如下合同内容：</p>
          <p>1：本合同有效期为
            <el-date-picker  type="daterange" :disabled="isDisabled.contract_time" v-model="contract.contract_time" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy - MM - dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
            ，甲方向乙方订购商品；
          </p>
          <p>2：本合同有效期内甲方订购乙方商品不少于
            <input type="text" maxlength="16" :disabled="isDisabled.pay_count" v-model="contract.pay_count"> 元；</p>
          <p>3：本合同有效期内，由发起方通过九星电子商务平台邀请交易方在平台记录全程供应链数据，至少有一方记录全程数据.</p>
        </div>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__title hide-line">
        <span>电子原件或扫描件 </span>
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
        <span>添加备注及说明</span>
      </div>
      <div class="chain-contract__body">
        <textarea class="chain-textarea" :disabled="isDisabled.contract_desc" v-model="contract.contract_desc"></textarea>
      </div>
    </div>
    <div class="chain-contract__item">
      <div class="chain-contract__body">
        <div class="chain-btn__group">
          <div class="chain-btn chain-btn_default" v-show="showIndex === btnList.length-1">删除</div>
          <div class="chain-btn chain-btn_active" v-show="showIndex === btnList.length-1" @click="sureCommit">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChainUploadEdit from '@/components/chain_app/base/public/chainUploadEdit'
import ChainUploadView from '@/components/chain_app/base/public/chainUploadView'
export default {
  name: 'chainContractEdit',
  components: {
    ChainUploadEdit, ChainUploadView
  },
  props: ['chainId', 'contractType', 'contractId', 'chainType'],
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
        seller: '',
        attach_list: [],
        contract_time: '',
        pay_count: '',
        contract_desc: ''
      },
      errMsg: {
        contract_name: '项目名称不能为空',
        buy_company: '采购方不能为空',
        buyer: '采购方法人不能为空',
        contract_time: '合同有限期不能为空',
        pay_count: '支付金额不能为空',
        contract_desc: '备注描述不能为空'
      },
      isDisabled: {
        contract_name: false,
        buy_company: false,
        buyer: false,
        contract_time: false,
        pay_count: false,
        contract_desc: false
      },
      btnList: [],
      showIndex: 0,
      isView: false,
      partnerCompanyList: [],
      isRegister: false
    }
  },
  methods: {
    getCompanyList (name, type) {
      let keyword = name.trim()
      if (!keyword) return
      this.isRegister = false
      this.partnerCompanyList = []
      this.$ajax.get(`/api/chain/company/search/?name=${keyword}&ns_type=${type}`).then(res => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            var list = res.data
            this.partnerCompanyList = list
          } else {
            this.isRegister = true
          }
        }
      })
    },
    selectItem (item) {
      this.contract.partner_company_id = item.id
      this.contract.buy_company = item.name
      this.partnerCompanyList = []
    },
    contractEdit (contract_id, params) {
      this.$ajax.patch(`/api/chain/contract/${contract_id}/`, params).then(res => {
        if (res.status === 200) {
          // this.$message.success('编辑成功')
          let _url = Number(this.chainType) === 1 ? '/chain_app/receive_chain?id=' + this.chainId : '/chain_app/payment_chain?id=' + this.chainId
          this.$router.push({
            path: _url
          })
          //this.$scrollToTop()
        }
      }).catch((err) => {
        this.$message.error(err.response.data.detail)
      })
    },
    contractView (contract_id, is_view) {
      this.$ajax.get(`/api/chain/contract/${contract_id}/`).then(res => {
        if (res.status === 200) {
          this.contract.contract_name = res.data.id_list[0].name
          this.contract.buy_company = res.data.partner_company_name
          this.contract.buyer = res.data.partner_legal_person
          this.contract.buy_company_id = res.data.partner_company_id
          this.contract.sale_company = res.data.company_name
          this.contract.seller = res.data.legal_person
          this.contract.contract_time = [res.data.date_created, res.data.end_date]
          this.contract.pay_count = res.data.contract_value
          this.contract.contract_desc = res.data.note
          this.contract.attach_list = res.data.att_list
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
    dataCheck (obj) {
      let numReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
      let flag = true
      let check_obj = ''
      for (var item in obj) {
        check_obj = typeof obj[item] === 'object' ? obj[item] : obj[item].trim()
        if (!check_obj) {
          this.$message.error(this.errMsg[item])
          return !flag
        } else if (item === 'pay_count' && !numReg.test(obj.pay_count)) {
          this.$message.error('支付金额格必须为数字')
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
      let params = {
        chain_id: this.chain_id,
        name: this.contract.contract_name,
        date_created: this.contract.contract_time[0],
        note: this.contract.contract_desc,
        partner_company_id: this.contract.buy_company_id,
        partner_legal_person: this.contract.buyer,
        end_date: this.contract.contract_time[1],
        contract_value: this.contract.pay_count,
        contract_type: this.contractType,
        attachment: attach_list
      }
      this.contractEdit(this.contractId, params)
    },
    navClick (item, i) {
      this.showIndex = i
      this.partnerCompanyList = []
      this.contractView(item.id, true)
      if (this.showIndex < this.btnList.length - 1) {
        this.toDisable()
      } else {
        this.toReset()
      }
    },
    toDisable () {
      this.isView = true
      for (let item in this.isDisabled) {
        this.isDisabled[item] = true
      }
    },
    toReset () {
      this.isView = false
      for (let item in this.isDisabled) {
        this.isDisabled[item] = false
      }
    }
  },
  mounted () {
    this.contractView(this.contractId)
  }
}
</script>
