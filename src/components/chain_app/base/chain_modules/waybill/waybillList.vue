<template>
  <div id="waybillCreate">
    <div class="top">
      <div class="top_top">
        <h3>电子运单<p>创建时间：<span>{{ruleForm.create_time ? ruleForm.create_time.replace('T', ' ').substring(0, ruleForm.create_time.indexOf('.')) : ''}}</span></p></h3>
      </div>
      <div class="top_bottom">
        <div class="left">
          <p style="margin-left: 5px"><span>*</span>运单标题</p>
          <input type="text" disabled v-model="ruleForm.name">
          <el-tooltip placement="top" effect="light" v-if="imgList.length > 0">
            <div slot="content" class="wupin_img">
              <h3>物品图像</h3>
              <div class="img_list">
                <img :src="$root_url() + item" alt="" v-for="(item, index) in imgList" :key="index">
              </div>
            </div>
            <img src="../../../../../../static/img/chain/yundan.png" alt="">
          </el-tooltip>
          <img src="../../../../../../static/img/chain/yundan-1.png" alt="" v-if="imgList.length === 0">
        </div>
        <div class="right">
          <p><span>*</span>出单时间</p>
          <input type="text" disabled v-model="ruleForm.date_created">
        </div>
      </div>
    </div>
    <div class="center_person">
      <h3>物流信息</h3>
      <div>
        <ul>
          <li><span>承运企业：</span><input type="text" v-model="ruleForm.service_company_name" disabled><img style="margin-left: 10px;" src="../../../../../../static/img/chain/jiaoya-1.png" alt=""></li>
          <li><span>身份证号：</span><input type="text" v-model="ruleForm.driver_person_id" disabled></li>
          <li><span><img src="/static/img/chain/position.png" alt="">出发地：</span><input v-model="ruleForm.start_point" type="text" disabled></li>
        </ul>
        <ul>
          <li>
            <small class="required">*</small><span>司机姓名：</span><input type="text" v-model="ruleForm.driver" disabled>
            <img :src="facePic" alt="" title="未进行人脸识别认证">
            <img :src="videoPic" alt="" title="视频离线">
            <img :src="wechatPic" alt="" title='未绑定微信'>
          </li>
          <li><small class="required">*</small><span>联系方式：</span><input type="text" v-model="ruleForm.phone" disabled></li>
          <li><span style="margin-left: 14px"><img src="/static/img/chain/position.png" alt="">目的地：</span><input v-model="ruleForm.end_point" type="text" disabled></li>
        </ul>
      </div>
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
          <span class="chain-text">参考合计：<strong class="isDisabled">{{ruleForm.total_val || ''}}</strong>(系统统计合计，仅限于参考)</span>
        </div>
      </div>
    </div>
    <div class="center_file">
      <h3>单证与票据原件</h3>
      <chainUploadView :tableData='ruleForm.att_list' />
    </div>
    <div class="center_file">
      <h3>经办人</h3>
      <agent-invite-view :tableData='ruleForm.agent_list' />
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
import chainTableView from '@/components/chain_app/base/public/chainTableView_4'
import chainUploadView from '@/components/chain_app/base/public/chainUploadView'
import AgentInviteView from '@/components/chain_app/base/public/agentTableView'
export default {
  name: 'waybillCreate',
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
      facePic: require('../../../../../../static/img/icon/face.png'),
      transport_id: '',
      token: '',
      imgList: []
    }
  },
  mounted () {
    const that = this
    that.transport_id = that.$route.query.transport_id
    that.token = localStorage.ns_token
    // 请求地址：http://127.0.0.1/api/sp/transport/goods/photos/{transportId}
    that.$ajax.get('/api/sp/transport/goods/photos/' + that.transport_id + '?token=' + that.token).then(res => {
      if (res.data.data) {
        that.imgList = res.data.data.images
      }
    })
  }
}
</script>

<style lang="less" scoped>
.required {
  color: #eb6100;
  position: relative;
  margin: 6px 0 0 8px;
}
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
          padding-right: 30px;
          span {
            color: #eb6100;
            display: inline-block;
          }
        }
      }
      .left {
        height: 45px;
        padding-top: 3px;
        p {
          float: left;
          padding-top: 5px;
        }
        input {
          float: left;
        }
        img {
          float: left;
          margin-left: 15px;
          cursor: pointer;
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
    div {
      display: flex;
      flex-direction: row;
      padding-left: 10px;
      ul {
        flex: 1;
        li {
          padding-top: 11px;
          height: 60px;
          span {
            vertical-align: middle;
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
            vertical-align: middle;
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
          img {
            width: 30px;
            vertical-align: middle;
            margin-left: 5px;
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
.wupin_img {
  h3 {
    font-size:14px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    border-bottom: 1px solid rgba(220,220,220,1);
    padding-bottom: 8px;
    min-width: 300px;
  }
  .img_list {
    width: auto;
    height: auto;
    img {
      width:80px;
      height:60px;
      border-radius:4px;
      margin: 7px;
    }
  }
}
</style>

<style lang="less">
.el-tooltip__popper {
  border: none !important;
  box-shadow:0px 2px 9px 1px rgba(153,153,153,0.4) !important;
}
.popper__arrow {
  border-top-color: rgba(153,153,153,0.4) !important;
}
</style>
