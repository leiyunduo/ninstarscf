<template>
  <div id="outboundList">
    <div class="top">
      <div class="top_top">
        <h3>电子出货单<p>创建时间：<span>{{ruleForm.create_time ? ruleForm.create_time.replace('T', ' ').substring(0, ruleForm.create_time.indexOf('.')) : ''}}</span></p></h3>
      </div>
      <div class="top_bottom">
        <div class="left">
          <p><span>*</span>出货单标题</p>
          <input type="text" v-model="ruleForm.name" disabled>
        </div>
        <div class="right">
          <p><span>*</span>出单时间</p>
          <input type="text" v-model="ruleForm.date_created" disabled>
        </div>
      </div>
    </div>
    <div class="center_person">
      <h3>仓储管理员登记</h3>
      <ul style="position: relative">
        <li>
          <small class="required">*</small><span class="_title">姓名</span><input type="text" v-model="ruleForm.keeper" disabled>
          <img :src="facePic" alt="" title="未进行人脸识别认证">
          <img :src="videoPic" alt="" title="视频离线">
          <img :src="wechatPic" alt="" title='未绑定微信'>
        </li>
        <li><small class="required">*</small><span class="_title">手机号</span><input type="text" v-model="ruleForm.phone" disabled></li>
        <li><small class="required">*</small><span class="_title">公司名称</span><input type="text" v-model="ruleForm.service_company_name" disabled></li>
      </ul>
    </div>
    <div class="center">
      <h3>商品信息</h3>
      <chainTableView :tableData='ruleForm.product' />
      <div class="product">
        <div class="chain_flex_end">
          <span class="chain-required-orange">*</span>
          <label for="">合计(元):</label>
          <input type="text" disabled v-model="ruleForm.amount">
        </div>
        <div class="chain_flex_end">
          <span class="chain-text">参考合计（元）：<strong class="isDisabled">{{toThousands(ruleForm.total_val)}}</strong>(系统统计合计，仅限于参考)</span>
        </div>
      </div>
    </div>
    <div class="center_file">
      <h3>电子原件或扫描件</h3>
      <chainUploadView :tableData='ruleForm.att_list' />
    </div>
    <div class="center_file">
      <h3>经办人</h3>
      <agent-invite-view :tableData='ruleForm.agent_list' />
    </div>
    <div class="center_remark">
      <h3>添加备注及说明</h3>
      <div>
        <textarea v-model="ruleForm.note" disabled></textarea>
      </div>
    </div>
    <!-- <div class="bottom">
      <button class="draft">保存草稿</button>
      <button class="release">确认发布</button>
    </div> -->
  </div>
</template>

<script>
import chainTableView from '@/components/chain_app/base/public/chainTableView_4'
import chainUploadView from '@/components/chain_app/base/public/chainUploadView'
import AgentInviteView from '@/components/chain-view/base/public/agentTableView'
export default {
  name: 'outboundList',
  props: ['ruleForm'],
  components: {
    chainTableView,
    chainUploadView,
    AgentInviteView
  },
  data () {
    return {
      wechatPic: require('../../../../../../static/img/icon/wechat.png'),
      videoPic: require('../../../../../../static/img/icon/video.png'),
      facePic: require('../../../../../../static/img/icon/face.png')
    }
  }
}
</script>

<style lang="less" scoped>
.required {
  color: #eb6100;
  position: absolute;
  margin: 6px 0 0 8px;
}
#outboundList {
  input:disabled, textarea:disabled {
    background-color: #fff !important;
    color: #666 !important;
    cursor: not-allowed;
  }
  width: 100%;
  height: 100%;
  min-height: 100%;
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
          padding-right: 18px;
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
    ul {
      li {
        padding-top: 11px;
        height: 60px;
        ._title {
          display: inline-block;
          text-align: left;
          margin-left: 20px;
        }
        span {
          font-family:PingFangSC-Regular;
          vertical-align: middle;
          font-size:12px;
          color:#333333;
          letter-spacing:0;
          text-align:center;
          display: inline-block;
          padding-right: 24px;
          width: 80px;
        }
        input {
          background:#ffffff;
          vertical-align: middle;
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
        img {
          width: 30px;
          margin-left: 5px;
          vertical-align: middle;
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
