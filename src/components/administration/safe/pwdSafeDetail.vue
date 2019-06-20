<template>
  <div class="c_container">
    <div class="c_right_content">
      <div class="c_telbox">
        <template v-if="!showPwd">
          <p class="c_gray">如果您修改密码时不记得原密码，建议您通过<span><a class="c_yellow" :href="url">找回密码</a></span>的方式来完成修改密码</p>
          <p class="c_tip"><span class="c_msg_box"><span class="c_tip_msg">请验证您的手机号码或邮箱号码，以便确定您的身份</span></span></p>
          <div class="c_form" >
            <el-form v-if="changeWay === '1' && isBindTel === '1'" ref="pwdTelForm" label-position="left" :model="pwdTelForm" :rules="rules">
              <el-form-item>
                <p>原手机号码：</p>
                <el-input v-model="pwdTelForm.oldTelNum" size="mini" style="width:240px;" disabled></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <p><span>*</span>请填写短信验证码：</p>
                <el-input v-model="pwdTelForm.code" size="mini" style="width:130px;" class="c_code_input"></el-input>
                <a class="c_get_code c_btns" :class="buttonName === '获取验证码' ? 'blue_class' : 'gay_class'" @click="getCode('pwdTelForm')">{{ buttonName }}</a>
              </el-form-item>
              <el-form-item>
                <a class="c_primary_btn" type="primary" style="display:inline-block;margin-right:20px;" @click="onUpper('emailForm')">上一步</a>
                <a class="c_primary_btn" type="primary" @click="onStepSubmit('pwdTelForm')">下一步</a>
              </el-form-item>
              <el-form-item>
                <div class="c_changeBox">
                  <p v-if="isBindEmail === '1'" style="color:#eb6100;" @click="handleChangeWay(0)">切换邮箱验证</p>
                </div>
              </el-form-item>
            </el-form>
            <el-form v-if="changeWay === '0' && isBindEmail === '1'" ref="pwdEmailForm" label-position="left" :model="pwdEmailForm" :rules="rules">
              <el-form-item>
                <p>原邮箱号码：</p>
                <el-input v-model="pwdEmailForm.oldEmail" disabled size="mini" style="width:240px;"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <p><span>*</span>请填写邮箱验证码：</p>
                <el-input v-model="pwdEmailForm.code" class="c_code_input" size="mini" style="width:130px;"></el-input>
                <a class="c_get_code c_btns" :class="buttonName === '获取验证码' ? 'blue_class' : 'gay_class'" @click="getCode('pwdEmailForm')">{{buttonName}}</a>
              </el-form-item>
              <el-form-item>
                <a class="c_primary_btn" type="primary" style="display:inline-block;margin-right:20px;" @click="onUpper('emailForm')">上一步</a>
                <a class="c_primary_btn" type="primary" @click="onStepSubmit('pwdEmailForm')">下一步</a>
              </el-form-item>
              <el-form-item>
                <div class="c_changeBox">
                  <p v-if="isBindTel === '1'" @click="handleChangeWay(1)" style="color:#eb6100;">切换手机验证</p>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </template>
        <template v-if="showPwd">
          <p class="c_gray">如果您修改密码时不记得原密码，建议您通过<span><a class="c_yellow" :href="url">找回密码</a></span>的方式来完成修改密码</p>
          <p class="c_tip"><span class="c_msg_box"><span class="c_tip_msg">为保障您的账号安全，修改密码前请填写原密码</span></span></p>
          <div class="c_form">
            <el-form ref="pwdForm" label-position="left" :model="pwdForm" :rules="rules">
              <el-form-item prop="oldPwd">
                <p>请输入原密码：</p>
                <el-input type="password" v-model="pwdForm.oldPwd" size="mini" style="width:240px;"></el-input>
              </el-form-item>
              <el-form-item prop="newPwd">
                <p>输入新密码：</p>
                <el-input type="password" v-model="pwdForm.newPwd" size="mini" style="width:240px;"></el-input>
              </el-form-item>
              <el-form-item prop="sureNewPwd">
                <p>确认新密码：</p>
                <el-input type="password" v-model="pwdForm.sureNewPwd" size="mini" style="width:240px;"></el-input>
              </el-form-item>
              <el-form-item>
                <a class="c_primary_btn" type="primary" style="display:inline-block;margin-right:20px;" @click="onUpper('emailForm')">上一步</a>
                <a class="c_primary_btn" type="primary" @click="onSubmit('pwdForm')">确认</a>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pwdSafeDetail',
  props: ['isBindTels', 'isBindEmails'],
  data () {
    let that = this
    var sruePwd = function (rule, val, callback) {
      if (val !== that.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致'))
      }
    }
    return {
      url: this.$root_url() + '/pwd.html',
      buttonName: '获取验证码',
      changeWay: '',
      showPwd: false,
      isBindTel: '',
      isBindEmail: '',
      time: 60,
      interval: '',
      pwdTelForm: {
        code: '',
        oldTelNum: ''
      },
      pwdEmailForm: {
        code: '',
        oldEmail: ''
      },
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        sureNewPwd: ''
      },
      rules: {
        code: [
          {required: true, message: '请输入验证码'}
        ],
        oldPwd: [
          {required: true, message: '请输入原密码'}
        ],
        newPwd: [
          {required: true, message: '请输入新密码'}
        ],
        sureNewPwd: [
          {required: true, message: '请确认新密码'},
          {validator: sruePwd}
        ]
      },
      user_key: ''
    }
  },
  mounted () {
    var that = this
    that.changeWay = that.isBindTels
    that.isBindTel = that.isBindTels
    that.isBindEmail = that.isBindEmails
    that.$ajax.get('/api/auth/login_name/').then(res => {
      that.pwdTelForm.oldTelNum = res.data.phone
      that.pwdEmailForm.oldEmail = res.data.email
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 上一步
    onUpper () {
      this.$emit('onFirstList', true, false)
    },
    getCode (formName) {
      var that = this
      if (formName === 'pwdTelForm') {
        let val = this.pwdTelForm.oldTelNum
        let data = {}
        data.phone = this.pwdTelForm.oldTelNum
        data.operation_type = 'change_pwd'
        getVCode(val, data)
      }
      if (formName === 'pwdEmailForm') {
        let val = this.pwdEmailForm.oldEmail
        let data = {}
        data.email = this.pwdEmailForm.oldEmail
        data.operation_type = 'find_pwd'
        if (val !== '') {
          that.interval = window.setInterval(function () {
            that.buttonName = that.time + 's'
            --that.time
            if (that.time < 0) {
              that.buttonName = '获取验证码'
              that.time = 60
              window.clearInterval(that.interval)
            }
          }, 1000)
          that.$ajax.post('/api/email/v2/', {...data}).then(res => {
            that.$message.success('验证码发送成功')
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
      function getVCode (val, data) {
        if (that.buttonName !== '获取验证码') {
          that.$message.info('请稍后操作')
          return
        }
        if (val !== '') {
          that.interval = window.setInterval(function () {
            that.buttonName = that.time + 's'
            --that.time
            if (that.time < 0) {
              that.buttonName = '获取验证码'
              that.time = 60
              window.clearInterval(that.interval)
            }
          }, 1000)
          that.$ajax.post('/api/verify_code/', {...data}).then(res => {
            that.$message.success('验证码发送成功')
          }).catch(err => {
            that.$message.error('发送失败')
          })
        }
      }
    },
    onStepSubmit (formName) {
      var that = this
      that.buttonName = '获取验证码'
      window.clearInterval(that.interval)
      var data = {}
      if (formName === 'pwdTelForm') {
        if (this.pwdTelForm.code.trim() === '') {
          this.$message.error('请输入验证码')
          return
        }
        data.phone = this.pwdTelForm.oldTelNum
        data.v_code = this.pwdTelForm.code
        data.operation_type = 'change_pwd'
        that.$ajax.put('/api/verify_code/', {...data}).then(res => {
          if (res && res.data.key) {
            that.user_key = res.data.key
            that.showPwd = true
            that.$refs[formName].resetFields()
          } else {
            that.$message.error('验证码有误')
          }
        }).catch(err => {
          console.dir(err)
        })
      }
      if (formName === 'pwdEmailForm') {
        if (this.pwdEmailForm.code.trim() === '') {
          this.$message.error('请输入验证码')
          return
        }
        data.choice = '2'
        data.email = this.pwdEmailForm.oldEmail
        data.v_code = this.pwdEmailForm.code
        data.operation_type = 'find_pwd'
        if (val !== '') {
          that.interval = window.setInterval(function () {
            that.buttonName = that.time + 's'
            --that.time
            if (that.time < 0) {
              that.buttonName = '获取验证码'
              that.time = 60
              window.clearInterval(that.interval)
            }
          }, 1000)
          that.$ajax.post('/api/email/v2/', {...data}).then(res => {
            that.$message.success('验证码发送成功')
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
    },
    onSubmit () {
      const that = this
      let data = {}
      data.old_pwd = this.pwdForm.oldPwd
      data.new_pwd = this.pwdForm.newPwd
      if (this.pwdForm.newPwd !== this.pwdForm.sureNewPwd) {
        this.$message({
          showClose: true,
          message: '两次输入密码不一致',
          type: 'error'
        })
        return
      }
      that.$ajax.patch('/api/auth/password/', {...data}).then(res => { 
        if (res) {
          this.$message.success('修改成功')
          this.$emit('onFirstList', true, false)
        } else {
          that.$message.error('原密码错误')
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handleChangeWay (i) {
      if (i === 0) {
        this.changeWay = '0'
      } else {
        this.changeWay = '1'
      }
    }
  }
}
</script>
<style lang="less">
.c_container{
  .c_right_content{
    height: 100%;
    width: 100%;
    font-size: 14px;
  .c_telbox{
    width: 100%;
    height: 550px;
    background: #fff;
    padding: 0 20px;
  .c_gray{
    color:#b1bec8;
  }
  .c_yellow{
    color: #eb6100;
  }
  .c_tip{
    padding: 30px 0px;
    font-size:14px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(12,141,255,1);
  .c_msg_box{
    display: inline-block;
    background: url("../../../../static/img/tip.png") no-repeat left center;
    padding-left: 40px;
  i{
    position: relative;
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 5px solid #49c0ec;
    border-bottom: 5px solid transparent;
  &:after{
     content: '';
     position: absolute;
     top: -5px;
     left: 1px;
     border-top: 5px solid transparent;
     border-right: 5px solid #fff;
     border-bottom: 5px solid transparent;
   }
  }
  .c_tip_msg{
    display: inline-block;
    padding: 8px 0;
    // border: 1px solid #49c0ec;
    // background: #f4fdff;
  }
  }
  }
  .c_form{
    text-align: left;
    width: 530px;
    p {
      font-size:14px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      span {
        color: red;
        display: inline-block;
        padding-right: 3px;
      }
    }
  .c_code_input{
    width: 200px;
  }
  .c_btns{
    width:auto;
    height:28px;
    background:linear-gradient(90deg,rgba(12,141,255,1) 0%,rgba(48,158,255,1) 100%);
    border-radius:4px;
    cursor: pointer;
    text-align: center;
    line-height: 28px;
    font-size:14px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-left: 10px;
    display: inline-block;
  &.c_get_code{
     padding: 0px 10px;
     position: absolute;
     bottom: 5px;
   }
  }
  .gay_class {
    background: #f2f2f2;
    color: #bbbbbb;
  }
  .blue_class {
    box-shadow:0px 2px 4px 0px rgba(48,158,255,0.4);
  }
  }
  }
  .c_changeBox{
    text-align: left;
    cursor: pointer;
    padding-left: 40px;
    p {
      color: #eb6100;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  }
  }
  .c_primary_btn{
    margin: 50px 0px;
    width:74px;
    height:32px;
    background:rgba(242,242,242,1);
    border:1px solid rgba(220,220,220,1);
    border-radius:4px;
    font-size:14px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    display: inline-block;
    cursor: pointer;
    color:rgba(187,187,187,1);
    line-height: 32px;
    text-align: center;
   }
   .c_primary_btn:hover {
      background:rgba(255,255,255,1);
      border:1px solid rgba(220,220,220,1);
   }
  .el-form-item__content {
    position: relative;
  }
</style>
