<template>
  <div class="settlement_edit">
    <div class="form">
      <div class="form_title">
        <span></span>
        <span>结算</span>
      </div>
      <div class="form_line">
        <div class="form_item">
          <div class="form_item_title">
            <div><span class="required">*</span>结算单标题</div>
          </div>
          <div class="form_item_info">
            <div>
              <input type="text" v-if="showTitle" v-model="subData.name" class="input_title" placeholder="" maxlength="32">
              <div v-if="!showTitle" class="disable">{{orgName}}</div>
            </div>
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_title">
            <div><span class="required">*</span>出单日期</div>
          </div>
          <div class="form_item_info">
            <div>
              <el-date-picker size="mini" v-model="subData.date_created" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="form_line" style="border: none">
        <div class="form_item">
          <div class="form_item_title">
            <div><span class="required">*</span>结算金额</div>
          </div>
          <div class="form_item_info">
            <div><input type="text" v-model="subData.amount" class="input_title" placeholder="" maxlength="32"></div>
          </div>
        </div>        
      </div>
      <p class="about_title" v-if="showList && showTitle">关联电子订单</p>
      <ul class="about_list" v-if="about.length !== 0 && showList && showTitle">
        <li v-for="(item, index) in about" :key="index" @click="handleCheck(index, item)" :class="item.checked ? 'checked' : ''">{{item.name}}</li>
      </ul>
      <div v-if="about.length === 0 && showList && showTitle" class="null_type">暂无可关联的订单，请创建订单。</div>
    </div>
    <div class="table" v-if="showTitle">
      <div class="table_title">
        <span></span>
        <span>订单结算信息</span>
      </div>
      <table class="order_table">
        <tr class="order_table_title">
          <td>订单标题</td>
          <td>结算金额（元）</td>
          <td>
            <span>操作</span>
          </td>
        </tr>
        <tr v-for="(item, index) in orderInfo" :key='index' class="order_table_line">
          <td>{{item.name}}</td>
          <td>
            <input type="text" v-model="item.value" maxlength="16" v-if="item.isEdit">
            <span type="text" v-if="!item.isEdit">{{item.value}}</span>
          </td>
          <td>
            <span @click="handleOrder(index)">{{item.isEdit ? '保存' : '修改'}}</span>
          </td>
        </tr>
      </table>
      <div v-if="orderInfo.length === 0" class="null_order">请选择要结算的订单</div>
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
        <span>添加备注及说明</span>
      </div>
      <textarea v-model="subData.note"></textarea>
    </div>
    <agent v-if="joinAgent" @hideAgent = "hideagent" :rowSelectArr="agent" @onConfirm = "onconfirm"/>
  </div>
</template>
<script>
import chainTableEdit from '@/components/chain_app/base/public/chainTableEdit'
import chainUploadEdit from '@/components/chain_app/base/public/chainUploadEdit'
import AgentInviteEdit from '@/components/chain_app/base/public/agentTableEdit'
import Agent from '@/components/chain_app/base/public/agent'
export default {
  name: 'settlementEdit',
  components: {
    chainTableEdit, chainUploadEdit, AgentInviteEdit, Agent
  },
  data () {
    return {
      // 原始单据名称
      orgName: '',
      subData: {},
      about: [],
      tableData: [],
      orderInfo: [],
      uploadData: [],
      agent: [],
      // 编辑时不显示关联列表，控制字段
      showList: true,
      cId: '',
      joinAgent: false
    }
  },
  // 控制补充显示字段
  props: {
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  // 当作为自组建调用时获取父组件数据，发生在编辑状态
  created () {
    let currentItem = this.$parent.showItem
    if (currentItem) {
      this.subData = currentItem.subData
      this.orderInfo = currentItem.orderInfo
      this.uploadData = currentItem.uploadData
      this.agent = currentItem.agent
      this.showList = false
    } else {
      // 获取可关联的订单数据
      this.cId = this.$route.query.cid
      this.$ajax.get(`/api/chain/order_list/?contract_id=${this.cId}`).then(res => {
        res.data.results.forEach(val => {
          val.checked = false
        })
        this.about = res.data.results
      })
    }
    if ( this.$parent.slideNav) {
      this.orgName = this.$parent.slideNav[0].name
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
    },
    // 编辑时关联订单操作
    handleCheck: function (index) {
      const that = this
      let about = that.about
      let orderInfo = that.orderInfo
      about[index].checked ? about[index].checked = false : about[index].checked = true
      if (about[index].checked) {
        // 添加订单
        about[index].checked = true
        about[index].isEdit = true
        orderInfo.push(about[index])
      } else {
        // 取消订单
        about[index].checked = false
        let canIndex = ''
        orderInfo.forEach((val, index1) => {
          if (val.id === about[index].id) canIndex = index1
        })
        orderInfo.splice(canIndex, 1)
      }
      this.about = about
      this.orderInfo = orderInfo
    },
    // 修改订单结算金额详情
    handleOrder (index) {
      const that = this
      let orderInfo = that.orderInfo
      if (orderInfo[index].isEdit) {
        if (!(/^[0-9]+(.[0-9]{2})?$/.test(orderInfo[index].value))) {
          that.$message.error('请填写正确的结算金额')
        } else {
          orderInfo[index].isEdit = false
          that.orderInfo = orderInfo
        }
      } else {
        orderInfo[index].isEdit = true
      }
      that.$forceUpdate()
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
      border-top: 1px solid #cccccc;
      height: 55px;
      align-items: center;
      .form_item {
        width: 38%;
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 10px;
        .form_item_title {
          display: flex;
          height: 100%;
          width: 18%;
          align-items: center;
          font-size: 14px;
          div:first-child {
            height: 100%;
            display: flex;
            align-items: center;
            img {
              width: 12px;
              height: 12px;
              margin-right: 8px;
            }
          }
          div:last-child {
            color: #333;
          }
        }
        .form_item_info {
          .disable {
            border:1px solid #e1e6f0;
            border-radius: 4px;
            width:220px;
            height:35px;
            font-size: 14px; 
            padding: 0 5px;
            background: #f5f7fa;
            line-height: 35px;
            color: #666;            
          }
          input.input_title {
            background:#ffffff;
            border:1px solid #e1e6f0;
            border-radius: 4px;
            width:220px;
            height:25px;
            font-size: 14px; 
            padding: 0 5px;
            outline: none;
          }
        }
      }
    }
    .about_title {
      line-height: 33px;
      font-size: 14px;
      font-weight: bolder;
      color: #333;
      padding: 0 20px;
    }
    .about_list {
      // width: 100%;
      height: 120px;
      display: flex;
      padding: 0;
      border: 1px solid rgba(225,230,240,0.50);
      flex-wrap: wrap;
      align-items: inherit;
      padding: 10px 12px;
      overflow-y: scroll;
      li {
        list-style: none;
        padding: 0 14px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #e1e6f0;
        color: #999;
        font-size: 14px;
        margin-left: 8px;
        margin-top: 12px;
        cursor: pointer;
      }
      li.checked {
        color: #fff;
        background: #eb6100;
        border-color: #eb6100;
      }
    }
  }
  .table, .upload, .info {
    padding: 30px;
    padding-bottom: 75px;
    background: #fff;
    margin-top: 20px;
    .table_title, .upload_title, .info_title {
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
    .order_table {
      border: none;
      width: 100%;
      border-spacing: 0px;
      .order_table_title {
        opacity:0.49;
        background:#efefef;
        border-radius:4px 4px 0 0;
        width:100%;
        height:45px;
        line-height: 45px;
        width: 100%;
        td {
          width: 25%;
          text-align: center;
          font-size: 14px;
          color: #999;
          padding: 0;
          // display: flex;
          // align-items: centerl;
          div {
            line-height: 45px;
            border-left: 1px solid #e1e6f0;
            border-right: 1px solid #e1e6f0;
          }
        }
        td:first-child div {
          border-left: none;
        }
        td:last-child div {
          border-right: none;
        }
      }
      .order_table_line {
        height: 45px;
        left: 45px;
        text-align: center;
        color: #333;
        font-size: 14px;
        td {
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #efefef;
          input {
            padding: 3px 4px;
            outline: none;
          }
        }
        td:last-child {
          span {
            color: #eb6100;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.null_type {
  height: 120px;
  padding: 10px 12px;
  line-height: 120px;
  text-align: center;
  border: 1px solid #eaeaea;
  font-size: 14px;
  color: #999;
}
.null_order {
  height: 47px;
  text-align: center;
  color: #999;
  line-height: 47px;
  border-bottom: 1px solid #efefef;
  // border-top: none;
  font-size: 14px;
}
</style>
