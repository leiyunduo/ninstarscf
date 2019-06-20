<template>
  <div class="c_credit_operator_box">
    <!-- <appNav :father='{selIndex: 6}' type='1'></appNav> -->
    <div class="c_credit_operator_right">
      <div class="c_top_location"><location :location='location'></location></div>
      <div class="c_sure_bottom">
        <h3>{{titleData}}<span>请务必保证您填写的手机号准确无误，否则可能造成获取验证码失败</span></h3>
        <div class="c_code_box">
          <p class="c_phone_title">系统刚刚通过短信将一个6位数的验证码发送到了以下号码：<span class="orange">{{userCode}}</span></p>
          <p>
            <input type="text" placeholder="请输入验证码" v-model="vcode">
            <a @click="getCode">{{buttonName}}</a>
            <span class="orange c_change_email" @click="changeWay">{{wayType ? '切换到邮箱' : '切换到手机'}}</span>
          </p>
          <div class="c_opera_box">
            <a @click="goback">返回</a>
            <a @click="sureOperation">确认</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Location from '../location/location'
// import AppNav from '../financing/financingManege'
export default {
  data () {
    return {
      buttonName: '获取验证码',
      wayType: true,
      userCode: '',
      time: 60,
      oldTelNum: '',
      oldEmail: '',
      vcode: ''
    }
  },
  components: {
    // AppNav, 
    Location
  },
  beforeCreate () {
    if (this.$route.query.type === 'changePay') {
      this.titleData = '票据支付确认'
      this.location = [
        {
          title: '债权处置',
          url: '/creditDeal'
        },
        {
          title: '债权处置操作',
          url: '/changePay'
        },
        {
          title: '票据支付确认'
        }
      ]
    } else if (this.$route.query.type === 'cancelTicket') {
      this.titleData = '退票确认'
      this.location = [
        {
          title: '债权处置',
          url: '/creditDeal'
        },
        {
          title: '债权处置方式',
          url: '/creditOperator'
        },
        {
          title: '退票确认'
        }
      ]
    }
  },
  methods: {
    changeWay () {
      this.wayType = !this.wayType
      this.wayType ? this.userCode = this.oldTelNum : this.userCode = this.oldEmail
    },
    getCode () {
      var data = {}
      this.wayType ? data.phone = this.userCode : data.email = this.userCode
      this.getVCode (this.userCode, data)
    },
    getVCode (val, data) {
      var that = this
      if (that.buttonName !== '获取验证码') {
        that.$message.info('请稍后操作')
        return
      }
      if (val !== '') {
        that.interval = window.setInterval(function () {
          that.buttonName = '（' + that.time + '秒）后重新发送'
          --that.time
          if (that.time < 0) {
            that.buttonName = '获取验证码'
            that.time = 60
            window.clearInterval(that.interval)
          }
        }, 1000)
        that.$ajax.post('/api/verify_code/', {...data}).then(res => {
          if (res.data.code === '1') {
            that.$message.success('验证码发送成功')
          } else {
            that.$message.error(res.data.msg)
          }
        })
      }
    },
    // 操作按钮确认
    sureOperation () {
      var that = this
      if (!this.vcode) {
        that.$message.error('请输入验证码')
        return
      }
      var data = {}
      this.wayType ? data.choice = '1' : data.choice = '2'
      data.v_code = this.vcode
      this.$ajax.post('/api/identity_auth/', {token: this.$token(), ...data}).then(res => {
        if (res.data.code === '1') {
          that.buttonName = '获取验证码'
          window.clearInterval(that.interval)
          this.$ajax.delete('/api/claims_debt/claims/management/?token=' + this.$token() + '&id=' + this.$route.query.id).then(res => {
            if (res.data.code === '1') {
              this.$message.success('退票成功')
              this.$router.push({
                path: '/creditDeal'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 取消
    goback () {
      this.$route.push({
        path: '/cashPublish',
        query: {
          id: this.$route.query.id,
          state: 'finish'
        }
      })
    }
  },
  mounted () {
    this.$ajax.get('/api/account_info/?token=' + this.$token()).then(res => {
      if (res.data.code === '1') {
        this.oldTelNum = res.data.data.phone
        this.oldEmail = res.data.data.email
        this.userCode = this.oldTelNum
      }
    })
  }
}
</script>
<style lang="less" scoped>
.c_credit_operator_box{
  width: 100%;
  height: 100%;
  display: flex;
  //padding-top: 70px;
  .c_credit_operator_right{
    background: #f4f7f8;
    height: 100%;
    font-size: 14px;
    // width: 100%;
    .c_top_location{
      background: #fff;
      border-bottom: 1px solid #ccc;
    }
    .c_sure_bottom{
      margin: 20px 30px;
      background: #fff;
      height:511px;
      box-shadow:0 2px 5px 4px rgba(231,231,231,0.50);
      padding: 20px 30px;
      h3{
        border-left: 4px solid #eb6100;
        padding-left: 10px;
        span{
          color: #999;
          font-size: 12px;
          margin: 0 20px;
        }
      }
      .c_code_box{
        padding-top: 60px;
        .orange{
          color: #eb6100;
        }
        p{
          text-align: center;
          &.c_phone_title{
            line-height: 60px;
            margin-bottom: 30px;
          }
          input{
            border: 1px solid #e1e6f0;
            outline: none;
            height: 38px;
            border-radius: 4px;
            padding: 3px 10px;
            width: 240px;
          }
          a{
            display: inline-block;
            padding: 8px 20px;
            border-radius: 4px;
            background: #eb6100;
            color: #fff;
            margin: 0 20px;
            cursor: pointer;
          }
          .c_change_email{
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .c_opera_box{
          text-align: center;
          margin: 100px 0;
          a{
            display: inline-block;
            width: 110px;
            padding: 8px 0;
            background: #eb6100;
            border-radius: 4px;
            cursor: pointer;
            color: #fff;
            font-size: 14px;
            text-align: center;
            border: 1px solid #eb6100;
            &:nth-of-type(1){
              border: 1px solid #eb6100;
              background: #fff;
              color: #eb6100;
              margin-right: 100px;
            }
          }
        }
      }
    }
  }
}
</style>
