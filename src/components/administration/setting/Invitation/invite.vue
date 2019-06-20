<template>
  <div class="invite-form-wraper">
    <div class="invite-form">
      <div v-if="!showResult" class="invite-content">
        <h4 class="invite-desc"><span>请填写您要邀请企业的联系方式（手机号或者邮箱地址）</span></h4>
        <div class="invite-tabs">
          <div @click="changeTab(index)" :class="tabindex === index ? 'actived' : ''" v-for="(item, index) in titles" :key="index">{{item}}</div>
        </div>
        <div class="invite-text">
          <input type="text" v-model="code" :placeholder="placeholder">
          <p class="invite-text__tips">联系方式请确认后再发送，发送成功后不得修改邀请码还剩余 <span>{{ limit }}</span> 次</p>
        </div>
      </div>
      <div v-else class="invite-result">
        <div class="invite-result__icon">
          <div class="msg" :class="result ? 'msg-ok' : 'msg-fail'">发送{{result ? '成功' : '失败'}}</div>
        </div>
        <div v-if="result" class="result-msg">
          <p>邀请码：<span>{{inviteToJoin.invite_code}}</span></p>
          <p>受邀方：<span>{{inviteToJoin.to_phone}}</span></p>
        </div>
      </div>
      <div class="invite-handler">
        <div class="prev" @click="prev()">上一步</div>
        <div class="send" v-if="!showResult" @click="sendOut(sendType)">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import { fail } from 'assert';
  export default {
    name: '',
    data () {
      return {
        tabindex: 0,
        titles: ['手机号码', '邮箱地址'],
        placeholder: '请输入手机号码',
        // 发送成功的数据
        inviteToJoin: {
          invite_code: '',
          to_phone: ''
        },
        limit: 0,
        sendType: 'phone',
        code: '',
        result: false,
        showResult: false
      }
    },
    mounted () { 
      // 获取邀请数据
      this.startInviting()
    },
    methods: { 
      prev () {
        this.$emit('prev')
      },
      changeTab (index) {
        this.tabindex = index
        if (index === 0) {
          this.placeholder = '请输入手机号码'
          this.sendType = 'phone'
        } else {
          this.placeholder = '请输入邮箱'
          this.sendType = 'email'
        }
      },
      // 发送邀请码
      sendOut (sendType) {
        if (sendType === 'phone') {
          if (!this.code) {
            this.$message.error('请输入手机号码')
          } else {
            if (!(/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.code))) {
              this.$message.error('请输入正确的手机号码')
            } else {
              this.sendMsg()
            }
          }
        } else if (sendType === 'email') {
          if (!this.code) {
            this.$message.error('请输入邮箱地址')
          } else {
            if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.code))) {
              this.$message.error('请输入正确的邮箱地址')
            } else {
              this.sendEmail()
            }
          }
        }
      },
      sendMsg () {
        this.$ajax.post('/api/invite_code/', {phone: this.code}).then(res => {
          this.inviteToJoin = res.data
          this.result = true
          this.showResult = true
          // this.$message.success('邀请码已发送至：' + this.code)
        }).catch(err => {
          this.showResult = false
          this.$message.error(err.response.data.err_msg)
        })
      },
      sendEmail () {
        this.$ajax.post('/api/invite_code/', {email: this.code}).then(res => {
          this.inviteToJoin = res.data
          this.result = true
          this.showResult = true 
          // this.$message.success('邀请码已发送至：' + this.code)
        }).catch(err => {
          this.result = false
          this.showResult = false
          this.$message.error(err.response.data.err_msg)
        })
      },
      startInviting () {
        this.$ajax.get('/api/invite_code/invite_count/').then(res => {
          this.limit = res.data
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      }
    }
  }
</script>
<style lang='less' scope>
  .invite-form-wraper {
    .invite-form {
      font-size: 14px;
      .invite-content {
        .invite-desc {
          margin-bottom: 40px;
          &>span {
            font-size: 14px;
            color: #999999
          }
        }
        .invite-tabs {
          display: flex;
          color: #666666;
          &>div {
            padding-bottom: 4px;
            margin-right: 30px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            border-bottom: 2px solid transparent;
            &.actived {
              color: #eb6100;
              border-bottom: 2px solid #eb6100;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
          }
        }
        .invite-text {
          margin-top: 20px;
          &>input {
            width:240px;
            height:32px;
            color: #999;
            background:rgba(255,255,255,1);
            border:1px solid rgba(220,220,220,1);
            border-radius:4px;
            outline: none;
            padding-left: 5px;
            &:focus {
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              border-color: #409eff
            }
          }
          .invite-text__tips {
            margin-top: 15px;
            color: #0C8DFF;
            &>span {
              color: #f5222d
            }
            &::before {
              content: "i";
              display: inline-block;
              width: 16px;
              height: 16px;
              color: #fff;
              background: #409eff;
              border-radius: 50%;
              margin-right: 8px;
              text-align: center;
              line-height: 16px;
            }
          }
        }
      }
      .invite-handler {
        margin-top: 20px;
        display: flex;
        &>div {
          padding: 5px 20px;
          border-radius: 4px;
          margin-top: 30px;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          user-select: none;
          &.prev {
            border:1px solid rgba(220,220,220,1);
            box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
            border-radius:4px;
            margin-right: 20px;
            &:active {
              .ns-tab-active(#fff, bg)
            }
          }
          &.send {
            background:linear-gradient(90deg,rgba(235,97,0,1) 0%,rgba(239,129,51,1) 100%);
            box-shadow:0px 2px 4px 0px rgba(235,97,0,0.4);
            border-radius:4px;
            color: #fff;
            &:hover {
              .ns-tab-hover(#eb6100, bg)
            }
            &:active {
              .ns-tab-active(#eb6100, bg)
            }
          }
        }
      }
      .invite-result {
        .invite-result__icon {
          margin: 40px 0 20px 30px;
          &>.msg {
            color: #333;
            font-size: 24px;
            font-weight: bold;
            &.msg-ok::before {
              content: "";
              display: block;
              background: url('../../../../../static/img/settings/send_ok.png');
              width: 72px;
              height: 72px;
              margin-left: 12px;
            }
            &.msg-fail::before {
              content: "";
              display: block;
              background: url('../../../../../static/img/settings/send_fail.png');
              width: 72px;
              height: 72px;
              margin-left: 12px;
            }
          }
        }
        .result-msg {
          padding-top: 10px;
          p {
            font-size: 18px;
            color: #666;
            margin: 10px 0;
          }
        }
      }
    }
  }
</style>