<template>
  <div id="waybillEdit">
    <div class="top">
      <div class="top_top">
        <h3>电子运单</h3>
      </div>
      <div class="top_bottom">
        <div class="left" v-if="create !== 2">
          <p><span>*</span>运单标题</p>
          <input type="text" :disabled="!isOrigin" v-model="ruleForm.name">
        </div>
        <div class="left" v-else>
          <p><span>*</span>运单标题</p>
          <input type="text" v-model="ruleForm.name" disabled>
        </div>
        <div class="right">
          <p><span>*</span>出单时间</p>
          <el-date-picker size="mini" v-model="ruleForm.date_created" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
      </div>
    </div>
    <div class="center_person" ref="ul_li_p">
      <h3>物流信息</h3>
      <div>
        <ul class="ul-list">
          <li class="_flex" v-if="create === 1 || (create === 0 && isOrigin)">
            <span>承运企业：</span>
            <input type="text" maxlength="32" @keyup="getCompanyList($event, ruleForm.service_company_name, 3)" v-model="ruleForm.service_company_name" placeholder="自运">
            <span class="chain-state_empty" v-show="!hasCompany">未注册</span>
            <span class="chain-operate-invite" @click="toInvite()" v-show="!hasCompany">邀请</span>
          </li>
          <li v-else>
           <span>承运企业：</span><input type="text" maxlength="32" disabled v-model="ruleForm.service_company_name" placeholder="自运">
          </li>
          <div class="chain-search-wrap">
            <ul class="chain-search__list">
              <li v-for="(item, index) in partnerCompanyList" :key="index" class="chain-search__list__item" @click="selectItem(item)">{{item.name}}</li>
            </ul>
          </div>
          <li><span>身份证号：</span><input type="text" maxlength="18" v-model="ruleForm.driver_person_id" placeholder="请输入身份证号"></li>
          <li><span><img src="/static/img/chain/position.png" alt="">出发地：</span><input maxlength="32" v-model="ruleForm.start_point" type="text" placeholder="请输入出发地"></li>
        </ul>
        <ul>
          <li><small class="required">*</small><span>司机姓名：</span><input type="text" maxlength="32" placeholder="请输入司机姓名" v-model="ruleForm.driver"></li>
          <li><small class="required">*</small><span>联系方式：</span><input type="text" placeholder="请输入联系方式" maxlength="11" v-model="ruleForm.phone"></li>
          <li><span style="margin-left:14px"><img src="/static/img/chain/position.png" alt="">目的地：</span><input maxlength="32" v-model="ruleForm.end_point" type="text" placeholder="请输入目的地"></li>
        </ul>
      </div>
    </div>
    <div class="center">
      <h3>商品信息</h3>
      <chainTableEdit @calc_val="calc_price" :tableData='ruleForm.product' />
      <div class="product">
        <div class="chain_flex_end">
          <span class="chain-required-orange">*</span>
          <label for="">合计(元):</label>
          <input type="text" v-model="ruleForm.amount">
        </div>
        <div class="chain_flex_end">
          <span class="chain-text">参考合计：<strong class="isDisabled">{{ruleForm.total_val || ''}}</strong>(系统统计合计，仅限于参考)</span>
        </div>
      </div>
    </div>
    <div class="center_file">
      <h3>单证与票据原件</h3>
      <chainUploadEdit :tableData='ruleForm.att_list' />
    </div>
    <div class="center_file">
      <h3>经办人</h3>
      <agent-invite-edit :tableData="ruleForm.agent_list" @inviteAgent="addAgents"/>
    </div>
    <div class="center_remark">
      <h3>添加备注及说明</h3>
      <div>
        <textarea v-model="ruleForm.note"></textarea>
      </div>
    </div>
    <div class="bottom">
      <!-- <button class="remove" v-show="create === 0">删除</button> -->
      <button class="release" @click="saveDraft">保存</button>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <invite ref="invite" :hideList="true" @hideMoadal="toHideModal"/>
    </el-dialog>
    <agent v-if="joinAgent" @hideAgent = "hideagent" :rowSelectArr="ruleForm.agent_list" @onConfirm = "onconfirm"/>
  </div>
</template>

<script>
import chainTableEdit from '@/components/chain_app/base/public/chainTableEdit_4'
import chainUploadEdit from '@/components/chain_app/base/public/chainUploadEdit'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import Agent from '@/components/chain_app/base/public/agent'
import Invite from '@/components/administration/settings/invitingAdmin'
import { createECDH } from 'crypto';
export default {
  // name: 'waybillEdit',
  props: ['create', 'ruleFormList', 'cid', 'orderId', 'chainType', 'chainId', 'id', 'isOrigin'],
  data () {
    return {
      ruleForm: {
        name: '',
        date_created: '',
        note: '',
        // service_company_id: '',
        service_company_name: '',
        driver_person_id: '',
        driver: '',
        phone: '',
        start_point: '',
        product: [],
        att_list: [],
        end_point: '',
        agent_list: [],
        total_val: 0,
        amount: ''
      },
      errMsg: {
        name: '运单标题不能为空',
        date_created: '出单时间不能为空',
        driver: '司机姓名不能为空',
        // driver_person_id: '身份证号不能为空',
        phone: '联系方式不能为空',
        // start_point: '出发地不能为空',
        // end_point: '目的地不能为空',
        amount: '参考合计不能为空'
      },
      attachment: [],
      partnerCompanyList: [],
      hasCompany: true,
      dialogVisible: false,
      timer: '',
      joinAgent: false,
      products: []
    }
  },
  components: {
    chainTableEdit,
    chainUploadEdit,
    Invite,
    AgentInviteEdit,
    Agent
  },
  mounted () {
    var that = this
    if (this.create !== 1) that.ruleForm = that.ruleFormList
    document.addEventListener('click', () => {
      this.partnerCompanyList = []
    })
  },
  methods: {
    calc_price (list) {
      this.ruleForm.total_val = 0
      list.forEach(element => {
        this.ruleForm.total_val += Number(element.product_price)
      })
      this.ruleForm.total_val = this.toThousands(this.ruleForm.total_val)
    },
    onconfirm (e) {
      let _set = {}, _list = [...this.ruleForm.agent_list, ...e]
      this.ruleForm.agent_list = _list.reduce((prev, next) => {
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
    saveDraft () {
      var that = this
      let _obj = {
        name: this.ruleForm.name,
        date_created: this.ruleForm.date_created,
        driver: this.ruleForm.driver,
        // driver_person_id: this.ruleForm.driver_person_id,
        phone: this.ruleForm.phone,
        // start_point: this.ruleForm.start_point,
        // end_point: this.ruleForm.end_point,
        amount: this.ruleForm.amount
      }
      if (!this.dataCheck(_obj)) return
      // 附件列表
      let attachList = []
      if (that.ruleForm.att_list.length > 0) {
        that.ruleForm.att_list.filter(item => {
          attachList.push(item.id)
        })
      }
      if (that.create === 1) {
        let _agent = []
        for(var i = 0; i< this.ruleForm.agent_list.length; i++) {
          _agent.push(this.ruleForm.agent_list[i].id)
        }   
        let _params = {...that.ruleForm, attachment: attachList, product: this.products, contract_id: that.cid, order_id: that.orderId}
        _params.agent = _agent
        if (that.ruleForm.service_company_name && !that.ruleForm.service_company_id) {
          that.createFakeCompany(that.ruleForm.service_company_name, 3, _params).then(this.waybillCreate).catch((reason)=>{
            console.error(reason)
          })
        } else if (!that.ruleForm.service_company_name) {
          _params.service_company_id = null
          that.waybillCreate(_params)
        } else {
          that.waybillCreate(_params)
        }
      } else if (that.create === 0 && this.isOrigin) {
        let _agent = []
        for(var i = 0; i< this.ruleForm.agent_list.length; i++) {
          _agent.push(this.ruleForm.agent_list[i].id)
        } 
        let _params = {...that.ruleForm, attachment: attachList, product: this.products}
        _params.agent = _agent
        if (that.ruleForm.service_company_name && that.ruleForm.service_company_name != '自运'  && !that.ruleForm.service_company_id) {
          that.createFakeCompany(that.ruleForm.service_company_name, 3, _params).then(this.waybillUpdate).catch((reason)=>{
            console.error(reason)
          })
        } else if (!that.ruleForm.service_company_name) {
          _params.service_company_id = null
          that.waybillUpdate(_params)
        } else {
          that.waybillUpdate(_params)
        }
      } else if (that.create === 0 && !this.isOrigin) {
        let _agent = []
        for(var i = 0; i< this.ruleForm.agent_list.length; i++) {
          _agent.push(this.ruleForm.agent_list[i].id)
        } 
        let _params = {...that.ruleForm, attachment: attachList, product: this.products, contract_id: that.cid}
        _params.agent = _agent
        this.waybillUpdate(_params)
      }
      else if (that.create === 2) {
        let _agent = []
        for(var i = 0; i< this.ruleForm.agent_list.length; i++) {
          _agent.push(this.ruleForm.agent_list[i].id)
        } 
        let _params = {...that.ruleForm, attachment: attachList, product: this.products, contract_id: that.cid, order_id: that.orderId}
        _params.agent = _agent
        this.waybillModify(_params)
      }
    },
    selectItem (item) {
      this.ruleForm.service_company_id = item.id
      this.ruleForm.service_company_name = item.name
      this.partnerCompanyList = []
      this.hasCompany = item.registered
    },
    getCompanyList (e, name, type) {
      let keyword = String(name).trim()
      if (!keyword) return
      this.partnerCompanyList = []
      this.ruleForm.service_company_id = ''
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
              }
            }
          })
        }
      }, 500)
    },
    createFakeCompany (name, ns_type, params) {
      if (!String(name).trim()) return
      return new Promise((resolve, reject) =>{
        this.$ajax.post(`/api/chain/company/create_fake/`, {name: name, ns_type: ns_type}).then(res => {
          if (res.status === 200) {
            params.service_company_id = res.data.id
            resolve(params)
          }
        }).catch((err) => {
          this.$ajax.get(`/api/chain/company/search/?name=${name}&ns_type=${3}`).then(res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                params.service_company_id = res.data[0].id
                resolve(params)
              } else {
                this.$message({
                  message: '该公司非服务商，请填写正确服务商名称',
                  type: 'error',
                  duration: '5000'
                })
              }
            }
          })
        })
      })
    },
    dataCheck (obj) {
      const number = /^[0-9]+(.[0-9]{2})?$/
      const reg = /^1[345678]\d{9}$/
      const _key =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      let flag = true
      let check_obj = ''
      for (let item in obj) {
        check_obj = obj[item]
        if(!check_obj) {
          this.$message.error(this.errMsg[item])
          return !flag
        } else if (item === 'phone' && !reg.test(obj[item])) {
          this.$message.error('请输入正确的手机号')
          return !flag
        } else if (item === 'driver_person_id' && !_key.test(obj[item])) {
          this.$message.error('身份证号码有误')
          return !flag
        } else {
          if (!this.produceCheck() && item === 'amount') {
            return !flag
          } else if (item === 'amount' && !number.test(obj[item])) {
            this.$message.error('商品合计必须为数值')
            return !flag
          }
        }
      }
      return flag
    },
    produceCheck () {
      this.products = []
      let flag = false
      if(this.$children[1].EOS) {
        this.$message.error('请先保存商品信息')
        return false
      }
      if (this.ruleForm.product.length > 0) {
        this.ruleForm.product.forEach(element => {
          if (element.isEdit) {
            this.$message.error('请先保存商品信息')
          } else {
            flag = true
            let product = []
            for(let item in element) {
              product.push(element[item])
            }
            product.pop()
            this.products.push(product)
          } 
        })
        return flag
      } else {
        return true
      }
    },
    waybillCreate (params) {
      this.$ajax.post('/api/chain/transport/', params).then(res => {
        if (res.status === 201) {
          let _url = (this.chainType === `1`) ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
        }  
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
    },
    waybillUpdate (params) {
      let btnlist = this.$parent.$children[1].buttonList
      params.name = btnlist.length > 1 ? btnlist[0].name + `(变更${btnlist.length-1})` : params.name
      this.$ajax.patch(`/api/chain/transport/${this.id}/`, params).then(res => {
        if (res.status === 200) {
          let _url = (this.chainType === `1`) ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
        } 
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
    },
    waybillModify (params) {
      let btnlist = this.$parent.$children[1].buttonList
      params.name = btnlist[0].name + `(变更${btnlist.length-1})`
      this.$ajax.post('/api/chain/transport/', params).then(res => {
        if (res.status === 201) {
          let _url = (this.chainType === `1`) ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
        } 
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.required {
  color: #eb6100;
  position: relative;
  margin: 6px 0 0 8px;
}
.chain-btn_op_empty {
  width: 70px;
  margin-left: 20px;
  display: inline-block;
  border-radius: 60px;
  background: #333;
  font-size: 14px;
  color: #ffffff;
  padding: 2px 10px;
  cursor: pointer;
}
.chain-btn_op_active {
  width: 60px;
  margin-left: 20px;
  display: inline-block;
  border-radius: 60px;
  background: #eb6100;
  font-size: 14px;
  color: #ffffff;
  padding: 2px 10px;
  cursor: pointer;
}
#waybillEdit, #outboundOrder, #outboundModify {
  width: 100%;
  height: 100%;
  min-height: 100%;
  input:disabled, textarea:disabled {
    background-color: #f5f7fa !important;
    color: #c0c4cc !important;
    cursor: not-allowed;
  }
  .top {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:120px;
    margin: 20px 0;
    padding: 0 32px;
    .top_top {
      height: 55px;
      border-bottom: 1px solid #cccccc;
      padding-top: 20px;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        border-left: 5px solid #eb6100;
        padding-left: 11px;
        font-weight: bold;
        height: 24px;
        padding-top: 2px;
        p {
          font-family:PingFangSC-Regular;
          display: inline-block;
          font-size:12px;
          color:#999999;
          letter-spacing:0;
          padding-left: 20px;
          span {
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#eb6100;
            letter-spacing:0;
          }
        }
      }
    }
    .top_bottom {
      display: flex;
      flex-direction: row;
      div {
        flex: 1;
      }
      .left,.right {
        p {
          display: inline-block;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#333333;
          letter-spacing:0;
          padding-right: 33px;
          span {
            color: #eb6100;
            display: inline-block;
            padding-right: 6px;
          }
        }
      }
      .left {
        margin-top: 15px;
        input {
          border:1px solid #e1e6f0;
          border-radius:2px;
          width:290px;
          height:26px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          // color:#999999;
          letter-spacing:0;
          padding: 0 16px;
          outline: none;
        }
      }
      .right {
        margin-top: 15px;
      }
    }
  }
  .center {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    padding: 20px 35px;
    margin-top: 20px;
    .product {
      .chain_flex_end {
        margin: 20px 10px 0 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        label {
          width: 60px;
          margin: 0 10px;
          font-size: 14px;
          font-weight: bold;
          white-space: nowrap;
        }
        &>input {
          border:1px solid #e1e6f0;
          // box-shadow:0 0 7px 0 #e1e6f0;
          border-radius:2px;
          width: 220px;
          color: #666;
          padding: 4px 10px;
          outline: none;
        }
        &>input:focus {
          transition: border-color .1s cubic-bezier(.645,.045,.355,1);
          border-color: #409eff
        }
        .chain-required-orange {
          color: #eb6100;
          margin-top: 4px;
          position: relative !important;
        }
        .chain-text {
          color: #666;
        }
        strong {
          margin-right: 15px
        }
      }
    }
    h3 {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      padding-left: 11px;
      border-left: 5px solid #eb6100;
      font-weight: bold;
      margin-bottom: 13px;
    }
  }
  .center_person {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    padding: 20px 35px;
    margin-top: 20px;
    h3 {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      padding-left: 11px;
      border-left: 5px solid #eb6100;
      font-weight: bold;
      margin-bottom: 13px;
    }
    div {
      display: flex;
      flex-direction: row;
      // padding-left: 10px;
      ul {
        &.ul-list {
          position: relative;
          &>.chain-search-wrap {
            position: absolute;
            margin-left: 90px;
            background: #fff;
            border: 1px solid #e1e6f0;
            z-index: 1;
            font-size: 14px;
            color: #333;
            max-height: 250px;
            overflow-y: auto;
            overflow-x: hidden;
            border-top: 0;
            &::-webkit-scrollbar {
              display: none;
            }
            .chain-search__list {
              .chain-search__list__item {
                width: 288px;
                padding: 9px 10px;
                border-bottom: 1px dashed #e1e6f0;
                &:last-of-type {
                  border: 0;
                }
              }
              .chain-search__list__item:hover {
                background: #eb6100;
                color: #fff;
                cursor: pointer;
              }
            }
          }
        }
        flex: 1;
        ._flex {
          display: flex;
          align-items: center;  
        }
        li {
          padding-top: 11px;
          span {
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#333333;
            letter-spacing:0;
            text-align:center;
            display: inline-block;
            padding-right: 14px;
            width: 90px;
            img {
              width:7px;
              height:9px;
              margin-right: 4px;
            }
          }
          input {
            background:#ffffff;
            border:1px solid #e1e6f0;
            border-radius:2px;
            width:290px;
            height:26px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            // color:#999999;
            letter-spacing:0;
            padding: 0 10px;
          } 
          p {
            display: inline-block;
            background:#f4f9ff;
            border:1px solid #42bffe;
            width:238px;
            // height:26px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#42bffe;
            letter-spacing:0;
            text-align: center;
            margin-left: 10px;
            line-height: 26px;
          }
          .chain-state_empty {
            // .chain-btn_op_empty;
            color: #999;
            padding: 0;
            &::before {
              content: "";
              background: url('../../../../../../static/img/chain/unrigister.png');
              display: inline-block;
              margin-right: 8px;
              width: 16px;
              height: 16px;
              transform: translateY(10%)
            }
          }
          .chain-operate-invite {
            // .chain-btn_op_active;
            color: #66cd2e;
            text-decoration: underline;
            cursor: pointer;
            padding: 0;
            &::before {
              content: "";
              background: url('../../../../../../static/img/chain/invite.png');
              display: inline-block;
              margin-right: 8px;
              width: 18px;
              height: 16px;
              transform: translateY(10%)
            }
          }
        }
      }
      .p_show {
        li {
          p {
            display: block;
            margin: 10px 0 0 90px;
          }
        }
      }
    }
  }
  .center_file {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    padding: 20px 35px;
    margin-top: 20px;
    h3 {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      padding-left: 11px;
      border-left: 5px solid #eb6100;
      font-weight: bold;
      margin-bottom: 13px;
    }
  }
  .center_remark {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    padding: 20px 35px;
    margin-top: 20px;
    h3 {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      padding-left: 11px;
      border-left: 5px solid #eb6100;
      font-weight: bold;
      margin-bottom: 13px;
    }
    div {
      padding: 0 5px 0 10px;
      textarea {
        background:#ffffff;
        border:1px solid #e1e6f0;
        border-radius:2px;
        max-width: 100%;
        min-width: 100%;
        min-height: 120px;
        max-height: 120px;
        outline: none;
        padding: 15px;
      }
    }
  }
  .bottom {
    margin-top: 37px;
    text-align: center;
    button {
      outline: none;
      border-radius:4px;
      width:120px;
      height:36px;
      margin: 0 14px;
    }
    .draft {
      border:1px solid #eb6100;
      font-family:PingFangSC-Regular;
      font-size:14px;
      color:#eb6100;
      letter-spacing:0.17px;
      background: none;
    }
    .release {
      background:#eb6100;
      font-family:PingFangSC-Regular;
      font-size:14px;
      color:#ffffff;
      letter-spacing:0.17px;
      border: none;
    }
    .remove {
      border:1px solid #eb6100;
      font-family:PingFangSC-Regular;
      font-size:14px;
      color:#eb6100;
      letter-spacing:0.17px;
      background: #fff
    }
  }
}
input:hover {
  box-shadow:0 0 7px 0 #e1e6f0;
}
input {
  outline: none;
}
</style>
