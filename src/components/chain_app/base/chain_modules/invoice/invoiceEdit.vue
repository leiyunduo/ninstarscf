<template>
  <div class="settlement_edit">
    <div class="form">
      <div class="form_title">
        <span></span>
        <span>发票信息</span>
      </div>
      <div class="form_line">
        <div class="form_label"><span class="required">*</span>发票名称</div>
        <div class="item_info">
          <input v-if="showTitle" type="text" v-model="subData.name" maxlength="16">
          <div v-if="!showTitle" class="disable">{{orgName}}</div>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label"><span class="required">*</span>发票类型</div>
        <div class="item_info">
          <select v-if="subData.invoice_type || subData.invoice_type === 0" v-model="subData.invoice_type">
            <option v-for="(item, index) in typeList" :key='index' :value="index">{{item}}</option>
          </select>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label"><span class="required">*</span>发票代码</div>
        <div class="item_info">
          <input type="text" v-model="subData.invoice_code" maxlength="16">
        </div>
      </div>
      <div class="form_line">
        <div class="form_label"><span class="required">*</span>发票号码</div>
        <div class="item_info">
          <input type="text" v-model="subData.invoice_number" maxlength="16">
        </div>
      </div>
      <div class="form_line">
        <div class="form_label"><span class="required">*</span>发票日期</div>
        <div class="item_info">
          <el-date-picker size="mini" v-model="subData.date_created" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label"><span class="required">*</span>发票金额</div>
        <div class="item_info">
          <input type="text" maxlength="16" v-model="subData.amount">
        </div>
      </div>
    </div>
    <div class="upload">
      <div class="upload_title">
        <span></span>
        <span>原件或扫描件</span>
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
  name: 'invoiceEdit',
  components: {
    chainUploadEdit, Agent, AgentInviteEdit
  },
  data () {
    return {
      subData: {invoice_type: '0'},
      orgName: '',
      agentList: [],
      agent: [],
      uploadData: [],
      joinAgent: false,
      typeList: ['增值税普通发票', '增值税普通发票（卷式）', '增值税电子普通发票', '增值税专用发票', '通用机打发票', '增值税机动车发票', '二手车统一发票', '其他']
    }
  },
  // 控制补充显示字段
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
      // this.subData = currentItem.subData
      // this.uploadData = currentItem.uploadData
      // this.agent = currentItem.subData.agent_list
      that.$ajax.get(`/api/chain/invoice/${that.$route.query.invoice_id}/`).then(res => {
        if (res.status === 200) {
          res.data.invoice_type = res.data.invoice_type - 1
          that.subData = res.data
          that.agent = res.data.agent_list
          that.uploadData = res.data.att_list
          // if (sw) {
          //   let slide = []
          //   res.data.id_list.forEach((val, i) => {
          //     i === 0 ? slide[i] = {name: val.name, id: val.id} : slide[i] = {name: '变更' + i, id: val.id}
          //   })
          //   this.$emit('childInfo', {slide, status: res.data.status, contractId: res.data.contract_id, settlementId: res.data.settlement_id})
          // }
        }
      })
    } else {
      if (this.$parent.slideNav) {
        if (this.$parent.slideNav.length > 0) {
          this.orgName = this.$parent.slideNav[0].name
        }
      }
    }
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
  margin-right: 5px;
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
      // border-top: 1px solid #cccccc;
      font-size: 14px;
      height: 55px;
      align-items: center;
      .form_label {
        width: 108px;
        line-height: 55px;
        height: 100%;
        padding: 0 10px;
        color: #333;
      }
      .item_info {
        input, select {
          width: 220px;
          height: 28px;
          padding: 0 3px;
          border: 1px solid #e1e6f0;
          outline: none;
        }
        .disable {
          border:1px solid #e1e6f0;
          width:220px;
          height:28px;
          font-size: 14px; 
          padding: 0 3px;
          background: #f5f7fa;
          line-height: 28px;
          color: #666;            
        }
        select {
          color: #666;
          width: 220px;
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
