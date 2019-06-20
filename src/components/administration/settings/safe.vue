<template>
  <div class="safe">
    <div class="show_state">
      <h3>
        账号与密码<p class="info">（管理登录账号与登录密码）</p>
      </h3>
      <div v-if='telEmailPwd'>
        <div class="show_tab">
          <div class="imgs">
            <img src="../../../../static/img/settings/01.png" alt="">
          </div>
          <div class="bang">
            <div>绑定电话</div>
            <div :class="bindData.isBindTel === '1' ? '' : 'is_null'">{{bindData.isBindTel === '1' ? phone : '未绑定'}}</div>
          </div>
          <div class="btns">
            <div>
              <div @click="handleClick(0)" v-if='!phone'>绑定手机</div>
              <div @click="handleClick(0)" v-if='phone'>更改帐号</div>
            </div>
          </div>
        </div>
        <div class="show_tab">
          <div class="imgs">
            <img src="../../../../static/img/settings/02.png" alt="">
          </div>
          <div class="bang">
            <div>绑定邮箱</div>
            <div :class="bindData.isBindEmail === '1' ? '' : 'is_null'">{{bindData.isBindEmail === '1' ? email : '未绑定'}}</div>
          </div>
          <div class="btns">
            <div>
              <div @click="handleClick(1)" v-if='!email'>绑定邮箱</div>
              <div @click="handleClick(1)" v-if='email'>更改帐号</div>
            </div>
          </div>
        </div>
        <div class="show_tab">
          <div class="imgs">
            <img src="../../../../static/img/settings/03.png" alt="">
          </div>
          <div class="bang">
            <div>修改密码</div>
          </div>
          <div class="btns">
            <div>
              <div @click="handleClick(2)">修改密码</div>
            </div>
          </div>
        </div>
      </div>
      <telSafeDetail @onFirstList="onFirstList" v-if='telShow' :isBinds='isBind' />
      <emailSafeDetail v-if='emailShow' @onFirstList="onFirstList" :isBindTels='isBindTel' :isBindEmails='isBindEmail' />
      <pwdSafeDetail v-if='pwdShow' @onFirstList="onFirstList" :isBindTels='bindData.isBindTel' :isBindEmails='bindData.isBindEmail' />
    </div>
  </div>
</template>
<script>
import telSafeDetail from '../safe/telSafeDetail'
import emailSafeDetail from '../safe/emailSafeDetail'
import pwdSafeDetail from '../safe/pwdSafeDetail'
export default{
  components: {
    telSafeDetail,
    emailSafeDetail,
    pwdSafeDetail
  },
  data () {
    return {
      bindData: {
        isBindTel: '',
        isBindEmail: ''
      },
      telEmailPwd: true,
      telShow: false,
      emailShow: false,
      pwdShow: false,
      isBindTel: '',
      isBindEmail: '',
      isBind: '',
      showInfo: [
        {pic: '/static/img/settings/01.png', operate: '绑定手机'},
        {pic: '/static/img/settings/02.png', operate: '绑定邮箱'},
        {pic: '/static/img/settings/03.png', operate: '修改密码'}
      ],
      // showInfo: [
      //   {pic: '../../static/img/settings/01.png', info: '保障账户中重要信息，在设置、修改登录密码等都需要手机短信验证及接受异常消息。绑定后可以使用手机号登入平台。', operate: '绑定手机'},
      //   {pic: '../../static/img/settings/02.png', info: '保障账户中重要信息，在设置、修改登录密码等都需要邮箱验证及接受异常消息。绑定后可以使用邮箱号登入平台。', operate: '绑定邮箱'},
      //   {pic: '../../static/img/settings/03.png', info: '平台登入密码，保障用户在平台操作隐私以及使用安全，请心牢记登录密码。', operate: '修改密码'},
      // ],
      phone: '',
      email: ''
    }
  },
  mounted () {
    this.$ajax.get('/api/auth/login_name/').then(res => {
      res.data.phone !== null ? this.bindData.isBindTel = '1' : this.bindData.isBindTel = '0'
      res.data.email !== null ? this.bindData.isBindEmail = '1' : this.bindData.isBindEmail = '0'
      this.phone = res.data.phone
      this.email = res.data.email
    }).catch(err => {
      this.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    onFirstList (o, i) {
      var that = this
      that.telEmailPwd = true
      that.telShow = false
      that.emailShow = false
      that.pwdShow = false
      this.$ajax.get('/api/auth/login_name/').then(res => {
        res.data.phone !== null ? this.bindData.isBindTel = '1' : this.bindData.isBindTel = '0'
        res.data.email !== null ? this.bindData.isBindEmail = '1' : this.bindData.isBindEmail = '0'
        this.phone = res.data.phone
        this.email = res.data.email
      }).catch(err => {
        this.$message.error(err.response.data.err_msg)
      })
    },
    handleClick (index) {
      var that = this
      if (index === 0) {
        that.telEmailPwd = false
        that.telShow = true
        that.emailShow = false
        that.pwdShow = false
        if (this.phone) {
          that.isBind = '1'
        } else {
          that.isBind = '0'
        }
      } else if (index === 1) {
        that.telEmailPwd = false
        that.telShow = false
        that.emailShow = true
        that.pwdShow = false
        if (this.email) {
          that.isBindTel = '0'
          that.isBindEmail = '1'
        } else {
          that.isBindTel = '1'
          that.isBindEmail = '0'
        }
      } else {
        that.telEmailPwd = false
        that.telShow = false
        that.emailShow = false
        that.pwdShow = true
        // this.$router.push({path: '/pwdSafeDetail', query: {isBindTel: this.bindData.isBindTel, isBindEmail: this.bindData.isBindEmail}})
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .safe {
    display: flex;
    justify-content: center;
    .list_state {
      width: 100%;
      border-left: 2px solid #eaeaea;
      h3 {
        font-family:PingFangSC-Medium;
        font-size:18px;
        color:#666666;
        letter-spacing:0;
        text-align:left;
        display: flex;
        flex-direction: row;
        p.info {
          display: inline-block;
          font-family:PingFangSC-Regular;
          font-size:14px;
          color:#999999;
          letter-spacing:0;
          text-align:left;
        }
      }
      ul {
        padding: 0 0 120px 36px;
        li {
          &>div {
            line-height: 32px;
            margin-top: 30px;
            div:last-child {
              font-size: 14px;;
            }
            .is_null {
              color: #999;
            }
          }
        }
      }
    }
    .show_state {
      // border-left: 2px solid #eaeaea;
      h3 {
        font-family:PingFangSC-Medium;
        font-size:18px;
        color:#666666;
        letter-spacing:0;
        text-align:left;
        display: flex;
        flex-direction: row;
        padding-left: 22px;
        // border-left: 3px solid #eb6100;
        margin-top: 5px;
        padding-bottom: 10px;
        p.info {
          display: inline-block;
          font-family:PingFangSC-Regular;
          font-size:14px;
          color:#999999;
          letter-spacing:0;
          text-align:left;
          padding-top: 5px;
        }
      }
      .show_tab {
        margin-left: 22px;
        display: flex;
        flex-direction: row;
        background:#ffffff;
        border:1px solid #e1e6f0;
        border-radius:12px;
        width:668px;
        height:110px;
        margin-bottom: 20px;
        .imgs {
          // flex: 1;
          border: 2px dashed #eb6100;
          border-radius: 50%;
          width: 72px;
          height: 71px;
          align-items: center;
          margin: 17px 59px 0 29px;
          img {
            width: 51px;
            height: 50px;
            margin-top: 9px;
            margin-left: 9px;
          }
        }
        .bang {
          flex: 2;
          div:first-child {
            font-family:PingFangSC-Regular;
            font-size:18px;
            color:#333333;
            letter-spacing:0;
            text-align:left;
            padding: 28px 0 10px 0;
          }
          div:last-child {
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#999999;
            letter-spacing:0;
            text-align:left;
          }
        }
        .btns {
          flex: 1;
          margin-top: 20px;
          p {
            height: 72px;
            line-height: 36px;
          }
          &>div {
            height: 68px;
            display: flex;
            justify-content: center;
            align-items: center;
            div {
              width: 85px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              background: #eb6100;
              border-radius: 3px;
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#ffffff;
              letter-spacing:0;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
