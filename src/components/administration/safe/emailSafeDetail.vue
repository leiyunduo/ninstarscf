<template>
  <div class="c_container">
    <div class="c_right_content">
      <div v-if="isBindEmail === '1' && isBindTel === '0' && !showNew" class="c_telbox">
        <p class="c_gray">保障账户中重要信息，在设置、修改登录密码等都需要邮箱验证及接收异常消息。绑定后可以使用邮箱号登入平台。</p>
        <p class="c_tip"><span class="c_msg_box"><span class="c_tip_msg">请验证您的邮箱号码，点击“获取验证码”完成验证</span></span></p>
        <div class="c_form">
          <el-form ref="emailForm" label-position="left" :model="emailForm" :rules="rules">
            <el-form-item>
              <p>原邮箱号码：</p>
              <el-input v-model="emailForm.oldEmail" style="width:240px;" disabled size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <p><span>*</span>请填写邮箱验证码：</p>
              <el-input v-model="emailForm.code" style="width:130px;" size="mini" class="c_code_input"></el-input>
              <a class="c_get_code c_btns" :class="buttonName === '获取验证码' ? 'blue_class' : 'gay_class'" @click="getCode('emailForm')">{{ buttonName }}</a>
            </el-form-item>
            <el-form-item>
              <a class="c_primary_btn" type="primary" style="display:inline-block;margin-right:20px;" @click="onUpper('emailForm')">上一步</a>
              <a class="c_primary_btn" type="primary" @click="onStepSubmit('emailForm')">下一步</a>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="(isBindEmail === '0' && !showNew) || (isBindTel === '1' && !showNew)" class="c_telbox">
        <p class="c_gray">保障账户中重要信息，在设置、修改登录密码等都需要邮箱验证及接收异常消息。绑定后可以使用邮箱号登入平台。</p>
        <p class="c_tip"><span class="c_msg_box"><span class="c_tip_msg">请验证您的手机号码，点击“获取验证码”完成验证</span></span></p>
        <div class="c_form">
          <el-form ref="telForm" label-position="left" :model="telForm" :rules="rules">
            <el-form-item>
              <p>原手机号码：</p>
              <el-input v-model="telForm.oldTelNum" style="width:240px;" size="mini" disabled></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <p><span>*</span>请填写短信验证码：</p>
              <el-input v-model="telForm.code" style="width:130px;" size="mini" class="c_code_input"></el-input>
              <a class="c_get_code c_btns" :class="buttonName === '获取验证码' ? 'blue_class' : 'gay_class'" @click="getCode('telForm')">{{ buttonName }}</a>
            </el-form-item>
            <el-form-item>
              <a class="c_primary_btn" type="primary" style="display:inline-block;margin-right:20px;" @click="onUpper('emailForm')">上一步</a>
              <a class="c_primary_btn" type="primary" @click="onStepSubmit('telForm')">下一步</a>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="showNew" class="c_telbox">
        <p class="c_gray">保障账户中重要信息，在设置、修改登录密码等都需要邮箱验证及接收异常消息。绑定后可以使用邮箱号登入平台。</p>
        <p class="c_tip"><span class="c_msg_box"><span class="c_tip_msg">请验证您的邮箱号码，点击“获取验证码”完成验证</span></span></p>
        <div class="c_form" >
          <el-form ref="newEmailForm" label-position="left" :model="newEmailForm" :rules="rules">
            <el-form-item prop="newEmail">
              <p>请输入邮箱号码：</p>
              <el-input v-model="newEmailForm.newEmail" style="width:240px;" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <p><span>*</span>请填写邮箱验证码：</p>
              <el-input v-model="newEmailForm.code" style="width:130px;" size="mini" class="c_code_input"></el-input>
              <a class="c_get_code c_btns" :class="buttonName === '获取验证码' ? 'blue_class' : 'gay_class'" @click="getCode('newEmailForm')">{{buttonName}}</a>
            </el-form-item>
            <el-form-item>
              <a class="c_primary_btn" type="primary" style="display:inline-block;margin-right:20px;" @click="onUpper('emailForm')">上一步</a>
              <a class="c_primary_btn" type="primary" @click="onSubmit">绑定</a>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'emailSafeDetail',
  props: ['isBindTels', 'isBindEmails'],
  data () {
    return {
      buttonName: '获取验证码',
      showNew: false,
      time: 60,
      interval: '',
      isBindTel: '',
      isBindEmail: '',
      telForm: {
        oldTelNum: '',
        code: ''
      },
      emailForm: {
        oldEmail: '',
        code: ''
      },
      newEmailForm: {
        newEmail: '',
        code: ''
      },
      rules: {
        newTelNum: [
          {required: true, message: '请输入手机号'},
          {validator: function (rule, value, callback) {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (!(reg.test(value))) {
              callback(new Error('请输入正确的手机号'))
            }
          }}
        ],
        code: [
          {required: true, message: '请输入验证码'}
        ],
        newEmail: [
          {required: true, message: '请输入邮箱号'},
          {validator: function (rule, value, callback) {
            var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if (!(reg.test(value))) {
              callback(new Error('请输入正确的邮箱号'))
            }
          }}
        ]
      },
      user_key: ''
    }
  },
  mounted () {
    var that = this
    that.isBindTel = that.isBindTels
    that.isBindEmail = that.isBindEmails
    that.$ajax.get('/api/auth/login_name/').then(res => {
      that.telForm.oldTelNum = res.data.phone
      that.emailForm.oldEmail = res.data.email
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
      if (this.newEmailForm.newEmail === this.emailForm.oldEmail) {
        this.$message.error('请输入不同的邮箱号')
        return
      }
      var that = this
      if (formName === 'telForm') {
        let val = this.telForm.oldTelNum
        let data = {}
        data.phone = this.telForm.oldTelNum
        data.operation_type = 'login_name'
        getVCode(val, data)
      }
      if (formName === 'emailForm') {
        let val = this.emailForm.oldEmail
        let data = {}
        data.email = this.emailForm.oldEmail
        data.operation_type = 'login_name'
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
          that.$ajax.post('/api/email/v2/', {...data}).then(res => {
            that.$message.success('验证码发送成功')
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
      if (formName === 'newEmailForm') {
        let val = this.newEmailForm.newEmail
        let data = {}
        data.email = this.newEmailForm.newEmail
        data.operation_type = 'login_name'
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
          that.$ajax.get('/api/account_exists/?email=' + this.newEmailForm.newEmail).then(res => {
            if (res.data.status === false) {
              that.$ajax.post('/api/email/v2/', {...data}).then(res => {
                console.log(res)
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            }
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
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
    },
    onStepSubmit (formName) {
      var that = this
      var data = {}
      if (formName === 'telForm') {
        if (this.telForm.code.trim() === '') {
          this.$message.error('请输入验证码')
          return false
        }
        data.phone = this.telForm.oldTelNum
        data.v_code = this.telForm.code
        data.operation_type = 'login_name'
      }
      if (formName === 'emailForm') {
        if (this.emailForm.code.trim() === '') {
          this.$message.error('请输入验证码')
          return
        }
        data.email = this.emailForm.oldEmail
        data.v_code = this.emailForm.code
        data.operation_type = 'login_name'
      }
      that.$ajax.put('/api/verify_code/', {...data}).then(res => {
        if (res.data.key) {
          that.showNew = true
          that.$refs[formName].resetFields()
          that.user_key = res.data.key
          that.buttonName = '获取验证码'
          window.clearInterval(that.interval)
        }
      }).catch(err => {
        that.$message.error('验证码错误')
      })
    },
    onSubmit () {
      var that = this
      if (this.newEmailForm.newEmail === this.emailForm.oldEmail) {
        this.$message.error('请输入不同的邮箱号')
        return
      }
      let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (!(reg.test(this.newEmailForm.newEmail)) || this.newEmailForm.code.trim() === '') {
        this.$message.error('请输入正确的信息')
        return
      }
      let data = {}
      data.email = that.newEmailForm.newEmail
      data.user_key = that.newEmailForm.code
      that.$ajax.patch('/api/auth/login_name/', {...data}).then(res => {
        that.$message.success('修改成功')
        that.$emit('onFirstList', true, false)
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
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
}
</style>
