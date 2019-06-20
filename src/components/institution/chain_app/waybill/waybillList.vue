<template>
  <div id="waybillCreate">
    <div class="top">
      <div class="top_top">
        <h3>电子运单<p>创建时间：<span>{{ruleForm.create_time ? ruleForm.create_time.replace('T', ' ').substring(0, ruleForm.create_time.indexOf('.')) : ''}}</span></p></h3>
      </div>
      <div class="top_bottom">
        <div class="left">
          <p><span>*</span>运单标题</p>
          <input type="text" disabled v-model="ruleForm.name">
        </div>
        <div class="right">
          <p>出单时间</p>
          <input type="text" disabled v-model="ruleForm.date_created">
        </div>
      </div>
    </div>
    <div class="center">
      <h3>商品信息</h3>
      <chainTableView :tableData='ruleForm.product' />
    </div>
    <div class="center_person">
      <h3>仓储管理员登记</h3>
      <div>
        <ul>
          <li><span>承运企业：</span><input type="text" v-model="ruleForm.service_company_name" disabled></li>
          <li><span>身份证号：</span><input type="text" v-model="ruleForm.driver_person_id" disabled></li>
          <li><span><img src="/static/img/chain/position.png" alt="">出发地：</span><input v-model="ruleForm.start_point" type="text" disabled></li>
        </ul>
        <ul>
          <li><span>司机姓名：</span><input type="text" v-model="ruleForm.driver" disabled></li>
          <li><span>联系方式：</span><input type="text" v-model="ruleForm.phone" disabled></li>
          <li><span><img src="/static/img/chain/position.png" alt="">目的地：</span><input v-model="ruleForm.end_point" type="text" disabled></li>
        </ul>
      </div>
    </div>
    <div class="center_file">
      <h3>单证与票据原件</h3>
      <chainUploadView :tableData='ruleForm.att_list' />
    </div>
    <div class="center_remark">
      <h3>添加备注及说明</h3>
      <div>
        <textarea name="" id="" disabled v-model="ruleForm.note"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import chainTableView from '@/components/chain_app/base/public/chainTableView'
import chainUploadView from '@/components/chain_app/base/public/chainUploadView'
export default {
  name: 'waybillCreate',
  props: ['ruleForm'],
  components: {
    chainTableView,
    chainUploadView
  }
}
</script>

<style lang="less" scoped>
#waybillCreate {
  width: 100%;
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
        padding-left: 4px;
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
        padding-left: 10px;
        margin-top: 15px;
        input {
          border:1px solid #e1e6f0;
          border-radius:2px;
          width:290px;
          height:26px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#999999;
          letter-spacing:0;
          padding: 0 16px;
          outline: none;
        }
        p {
          display: inline-block;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#333333;
          letter-spacing:0;
          padding-right: 8px;
          span {
            color: #eb6100;
            display: inline-block;
            padding-right: 6px;
          }
        }
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
      padding-left: 10px;
      ul {
        flex: 1;
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
            color:#999999;
            letter-spacing:0;
            padding: 0 10px;
          }
          p {
            display: inline-block;
            background:#f4f9ff;
            border:1px solid #42bffe;
            width:236px;
            height:26px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#42bffe;
            letter-spacing:0;
            text-align: center;
            margin-left: 10px;
            line-height: 26px;
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
        width:100%;
        height:120px;
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
      width:143px;
      height:32px;
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
      background:#f48537;
      font-family:PingFangSC-Regular;
      font-size:14px;
      color:#ffffff;
      letter-spacing:0.17px;
      border: none;
    }
  }
}
input:hover {
  box-shadow:0 0 7px 0 #e1e6f0;
}
input {
  outline: none;
  background: none;
}
</style>
