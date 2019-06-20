<template>
  <div class="settlement_edit">
    <div class="form">
      <div class="form_title">
        <span></span>
        <span>支付信息</span>
      </div>
      <div class="form_line" style="justify-content: flex-start;">
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>支付名称</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.name" v-if="showTitle">
            <div class="disable" v-if="!showTitle">{{orgName}}</div>
          </div>
        </div>
      </div>
      <div class="form_line" style="justify-content: flex-start;">
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>支付类型</div>
          <div class="item_info">
            <select v-model="subData.type">
              <option v-for="(item, index) in typeList" :key='index' :value="index">{{item}}</option>
            </select>
          </div>
        </div>
        <div class="form_section" v-if="subData.type === 1">
          <div class="form_label">收款企业</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.gathering">
          </div>
        </div>
        <div class="form_section" v-if="subData.type === 1">
          <div class="form_label">付款企业</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.payment">
          </div>
        </div>
        
      </div>
      <div class="form_line" style="justify-content: flex-start;" v-if="!subData.type || subData.type === '0'">
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>金额</div>
          <div class="item_info">
            <input type="text" maxlength="16" v-model="subData.amount">
          </div>
        </div>
      </div>
      <div class="form_line" style="justify-content: flex-start;" v-if="!subData.type || subData.type === '0' || subData.type === '1'">
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>支付日期</div>
          <div class="item_info">
            <el-date-picker size="mini" v-model="subData.date_created" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>
      </div>
      <div class="form_line" v-if="subData.type === 1">
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>金额</div>
          <div class="item_info">
            <input type="text" maxlength="16" v-model="subData.amount">
          </div>
        </div>
        <div class="form_section" >
          <div class="form_label">收款机构</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.gatheringCompany">
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款机构</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.paymentCompany">
          </div>
        </div>
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>支付日期</div>
          <div class="item_info">
              <el-date-picker size="mini" v-model="subData.date_created" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>
        
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>收款账号</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.getting_account">
          </div>
        </div>
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>付款账号</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.payment_account">
          </div>
        </div>
      </div>
      <div class="form_line" v-if="subData.type > 1">
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>金额</div>
          <div class="item_info">
            <input type="text" maxlength="16" v-model="subData.amount">
          </div>
        </div>
      </div>
      <div class="form_line" v-if="subData.type > 1">
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>支付日期</div>
          <div class="item_info">
              <el-date-picker size="mini" v-model="subData.date_created" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">收款企业</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.gathering">
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款企业</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.payment">
          </div>
        </div>
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>出票日期</div>
          <div class="item_info">
            <el-date-picker size="mini" v-model="subData.ticket_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">收款机构</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.gatheringCompany">
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款机构</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.paymentCompany">
          </div>
        </div>
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>汇票到期日</div>
          <div class="item_info">
              <el-date-picker size="mini" v-model="subData.payment_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>收款账号</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.getting_account">
          </div>
        </div>
        <div class="form_section">
          <div class="form_label"><span class="required">*</span>付款账号</div>
          <div class="item_info">
            <input type="text" maxlength="32" v-model="subData.payment_account">
          </div>
        </div>
      </div>
    </div>
    <div class="upload">
      <div class="upload_title">
        <span></span>
        <span>电子原件或扫描件</span>
      </div>
      <chainUploadEdit :tableData='uploadData'></chainUploadEdit>
    </div>
    <div class="info">
      <div class="info_title">
        <span></span>
        <span>经办人</span>
      </div>
      <agent-invite-edit :tableData="agent" @inviteAgent="addAgents"/>
    </div>
    <div class="info">
      <div class="info_title">
        <span></span>
        <span>补充</span>
      </div>
      <textarea v-model="subData.note"></textarea>
    </div>
    <agent v-if="joinAgent" @hideAgent = "hideagent" :rowSelectArr="agent" @onConfirm = "onconfirm"/>
  </div>
</template>
<script>
import chainUploadEdit from '@/components/chain_app/base/public/chainUploadEdit'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import Agent from '@/components/chain_app/base/public/agent'
export default {
  name: 'paymentEdit',
  components: {
    chainUploadEdit, Agent, AgentInviteEdit
  },
  data () {
    return {
      subData: {},
      orgName: '',
      uploadData: [],
      agentList: [],
      agent: [],
      joinAgent: false,
      invoiceType: 0,
      typeList: ['现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）']
    }
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  created () {
    const that = this
    let currentItem = this.$parent.showItem
    if (currentItem === 1) {
      // currentItem.type = Number(currentItem.type) + 1
      // this.subData = currentItem.subData
      // this.uploadData = currentItem.uploadData
      // this.agent = currentItem.subData.agent_list
      that.$ajax.get(`/api/chain/payment/${that.$route.query.payment_id}/`).then(res => {
        if (res.status === 200) {
          // 前后台不统一
          res.data.type -= 1
          that.subData = { ...res.data, ...res.data.payment_info}
          that.uploadData = res.data.att_list
          that.agent = res.data.agent_list
        }
      })
    } else {
      if (that.$parent.slideNav) {
        if (that.$parent.slideNav.length > 0) {
          that.orgName = that.$parent.slideNav[0].name
        }
      }
      this.subData = {type: '0'}
    }
    // if (this.$parent.slideNav) {
    //   this.orgName = this.$parent.slideNav[0].name
    // }
  },
  methods: {
    onconfirm (e) { 
      let arr = []
      e.forEach(val => {
        arr.push(val.id)
      })
      this.agentList = arr
      this.agent = e
    },
    addAgents (e) {
      this.joinAgent = true
    },
    hideagent (e) {
      this.joinAgent = false
    }    
  }
}
</script>
<style lang="less" scoped>
.required {
  color: #eb6100;
  position: absolute;
  margin-left: -10px;
}
// 公共 title 样式
.show_title {
  height: 50px;
  line-height: 50px;
  span:first-child {
    padding: 2px 4px;
    background: #eb6100;
  }
  span:last-child {
    margin-left: 11px;
    font-weight: bolder;
    color: #333;
  }
}
.settlement_edit {
  .form {
    padding: 30px;
    padding-bottom: 75px;
    background: #fff;
    .form_title {
      .show_title;
    }
    .form_line {
      display: flex;
      flex-wrap: wrap;
      // justify-content: flex-end;
      // border-top: 1px solid #cccccc;
      font-size: 14px;
      align-items: center;
      .form_section {
        display: flex;
        height: 55px;
        align-items: center;
        width: calc(100% / 3);
        // padding: 0 10px;
        .form_label {
          width: 108px;
          line-height: 55px;
          height: 100%;
          padding: 0 10px;
          color: #333;
        }
        .item_info {
          .disable {
            width: 220px;
            height: 28px;
            padding: 0 3px;
            border: 1px solid #e1e6f0;
            color: #666;
            line-height: 28px;
            background: #f5f7fa;
          }
          input, select {
            width: 220px;
            height: 28px;
            padding: 0 3px;
            border: 1px solid #e1e6f0;
            outline: none;
          }
          select {
            color: #666;
            width: 220px;
          }
        }
      }

    }
    .form_line:nth-of-type(2) {
      border-top: 1px solid #ccc;
    }
  }
  .upload, .info {
    padding: 30px;
    padding-bottom: 75px;
    background: #fff;
    margin-top: 20px;
    .info_title, .upload_title {
      .show_title
    }
    textarea {
      width: calc(100% - 14px);
      height: 145px;
      resize: none;
      border: 1px solid #e1e6f0;
      outline: none;
      padding: 4px 6px;
      font-size: 16px;
    }
  }
}
</style>
