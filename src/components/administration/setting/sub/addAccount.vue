<template>
  <div class="add-account-wraper">
    <div class="add-account">
      <div class="account-form" v-if="!isNext">
        <div class="account-row">
          <label for="" class="account-row__title">
            <span class="require">*</span><span class="-text">原手机号码</span>
          </label>
          <div class="account-row__content">
            <input v-model="ruleForm.phone" :maxlength="maxlength" type="text">
          </div>
        </div>
        <div class="account-row" style="width: 262px">
          <label for="" class="account-row__title">
            <span class="require">*</span><span class="-text">短信验证码</span>
          </label>
          <div class="account-row__content">
            <input v-model="ruleForm.v_code" :maxlength="maxlength - 5" type="text" class="input-code" placeholder="请输入...">
            <button @click="sendMsg" class="btn-code" :class="isDisabled ? 'disabled' : '' ">{{codeName}}</button>
          </div>
        </div>
        <div class="account-row">
          <label for="" class="account-row__title">
            <span class="require">*</span><span class="-text">登录密码</span>
          </label>
          <div class="account-row__content">
            <input v-model="ruleForm.password" auto-complete="off" type="password">
          </div>
        </div>
        <div class="account-row">
          <label for="" class="account-row__title">
            <span class="require">*</span><span class="-text">确认密码</span>
          </label>
          <div class="account-row__content">
            <input v-model="ruleForm.checkPass" auto-complete="off" type="password">
          </div>
        </div>
        <div class="account-row">
          <div class="account-handler">
            <div class="prev" @click="prev">上一步</div>
            <div class="next" @click="next">下一步</div>
          </div>
        </div>
      </div>
      <div class="account-form" v-else>
        <div class="account-row">
          <label for="" class="account-row__title">
            <span class="require">*</span><span class="-text -title">当前登录账号: {{loginNum}}</span>
          </label>
        </div>
        <div class="account-row">
          <label for="" class="account-row__title">
            <span class="require">*</span><span class="-text">真实姓名</span>
          </label>
          <div class="account-row__content">
            <input v-model="ruleForm1.name" :maxlength="maxlengths" type="text">
          </div>
        </div>
        <div class="account-row" style="width: 262px">
          <label for="" class="account-row__title">
            <span class="require">*</span><span class="-text">证件号码</span>
          </label>
          <div class="account-row__content">
            <input v-model="ruleForm1.id_number" placeholder="" :maxlength="maxlength + 7" type="text">
          </div>
        </div>
        <div class="account-row" v-for="(item, index) in imgList" :key="index">
          <label for="" class="account-row__title">
            <span class="require">*</span><span class="-text">{{item.name}}</span>
          </label>
          <div class="account-row__content">
            <div class="img-wraper" v-if="!verify.verifyStatus">
              <div v-loading="isLoading === index" class="img-viewer">
                <img v-show="!item.img" src="static/img/imgPerson.png" alt="">
                <img v-show="item.img" :src="$root_url() + item.img" alt="">
                <input type='file' @change='uploaadFile($event, index)'>
              </div>
            </div>
            <div class="img-wraper" v-else>
              <div @click="imageView(verify.auth_pic['legal_person_id_'+(index +1)])" class="img-viewer">
                <img :src="$root_url() + verify.auth_pic['legal_person_id_'+(index +1)]" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="account-row">
          <div class="account-handler">
            <div class="prev" @click="reset">取消</div>
            <div class="next" :class="verify.verify_status ==='2' ? 'disabled' : ''" @click="submitForms('ruleForm')">提交</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogImgVisible" :modal-append-to-body="false">
      <div style="text-align: center">
        <img :src="$root_url() + imageViewerUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      verify: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        time: 60,
        codeName: '获取验证码',
        dialogImgVisible: false,
        isDisabled: false,
        ruleForm: {
          phone: '',
          v_code: '',
          password: '',
          checkPass: ''
        },
        maxlength: 11,
        maxlengths: 32,
        ruleForm1: {
          name: '',
          id_number: ''
        },
        auth_pic: {
          legal_person_id_1: '',
          legal_person_id_2: '',
          legal_person_id_3: '',
          legal_person_id_4: ''
        },
        imgList: [
          { title: 'legal_person_id_1', img: '', name: '身份证国徽面照' },
          { title: 'legal_person_id_2', img: '', name: '身份证人像面照' },
          { title: 'legal_person_id_3', img: '', name: '手持身份证国徽面照' },
          { title: 'legal_person_id_4', img: '', name: '手持身份证人像面照' }
        ],
        isNext: true,
        isLoading: -1,
        personId: '',
        loginNum: '',
        imageViewerUrl: ''
      }
    },
    mounted () { 
      this.loginNum = this.verify.loginNum
      this.personId = this.verify.personId
      this.isNext = this.verify.next
      if (this.verify.verifyStatus) {
        this.ruleForm1.name = this.verify.name
        this.ruleForm1.id_number = this.verify.id_number
      }
      this.$scrollToTop()
    },
    methods: { 
      sendMsg () {
        let phoneReg = /^1[345678]\d{9}$/
        if (this.isDisabled) return
        if (!this.ruleForm.phone) {
          this.$message.error('请输入手机号')
          return
        }
        if (!phoneReg.test(this.ruleForm.phone)) {
          this.$message.error('手机号格式有误')
          return
        }
        this.checkLegalPhone().then(this.sendCode).catch(err=>{
          // this.$message.error(err.data.msg)
        })
      },
      checkLegalPhone () {
        return new Promise((resolve, reject) => {
          this.$ajax.get('/api/account_exists/?phone=' + this.ruleForm.phone).then(res => {
            if (res.data.status === false) {
              resolve()
            } else {
              reject(res)
            }
          })
        })
      },
      sendCode () {
        this.$ajax.post('/api/verify_code/', {phone: this.ruleForm.phone, operation_type: 'sub_account'}).then(res => {
          this.$message.success('验证码发送成功')
          this.isDisabled = true
          this.timer()
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      timer () {
        let that = this
        that.codeName = '(' + that.time + '秒)后重新发送'
        let interval = window.setInterval(function () {
          --that.time
          that.codeName = '(' + that.time + '秒)后重新发送'
          if (that.time < 0) {
            that.codeName = '重新发送'
            that.time = 60
            that.isDisabled = false
            window.clearInterval(interval)
          }
        }, 1000)
      },
      prev () {
        this.$emit('prev')
      },
      next () {
        let _obj = {
          phone: '手机号不能为空',
          v_code: '验证码不能为空',
          password: '密码不能为空',
          checkPass: '重复密码不能为空'
        }
        let data = {}
        let obj = this.ruleForm
        for(let para in obj) {
          if (!obj[para]) {
            this.$message.error(_obj[para])
            return
          }
        }
        let phoneReg = /^1[345678]\d{9}$/
        if (!phoneReg.test(obj.phone)) {
          this.$message.error('手机号格式有误')
          return
        }
        if (obj.password !== obj.checkPass) {
          this.$message.error('两次密码不一致，请重新输入')
          return
        }
        data.phone = obj.phone
        data.user_key = obj.v_code
        data.operation_type = 'sub_account'
        data.password = obj.password
        this.$ajax.post('/api/sub_account/', {...data}).then(res => {
          if (res) {
            this.personId = res.data.uid
            this.loginNum = res.data.phone
            this.isNext = true
          } else {
            // this.$message.error('验证码有误')
          }
        }).catch((error, config, code, request, response) => {
          console.log(response)
          // this.$message.error(err.response.data.err_msg)
        })
      },
      uploaadFile ($event, index) {
        var that = this
        that.isLoading = index
        let file = $event.target.files[0]
        if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
          var fr = new FileReader()
          fr.readAsDataURL(file)
          fr.onloadend = function (e) {
            var fileUrl = new FormData()
            fileUrl.append('file', file)
            fileUrl.append('function_module', 'company_info')
            that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
              that.isLoading = -1
              that.imgList[index].img = res.data
              that.auth_pic['legal_person_id_'+ (index+1)] = res.data
            }).catch(err => {
              that.isLoading = -1
              that.$message.error(err.response.data.err_msg)
            })
          }
        } else {
          that.isLoading = -1
          that.$message.error('文件格式不正确')
        }
      },
      submitForms (formName) {
        var that = this
        var fileUrl = new FormData()
        fileUrl.append('name', this.ruleForm1.name)
        fileUrl.append('id_number', this.ruleForm1.id_number)
        if (this.ruleForm1.name === '') {
          that.$message.error('请输入真实姓名')
        } else {
          if (this.ruleForm1.id_number === '') {
            that.$message.error('请输入身份证号码')
          } else {
            if (this.ruleForm1.id_number.length < 15) {
              that.$message.error('证件号长度为 15 到 18 个字符')
            } else {
              for (var i = 0; i < 4; i++) {
                if (this.imgList[i].img === '') {
                  this.$message.error(this.imgList[i].name + '未上传')
                  return
                }
              }
              that.$ajax.post('/api/person/', {auth_pic: that.auth_pic, name: that.ruleForm1.name, id_number: that.ruleForm1.id_number, account_id: that.personId}).then(res => {
                that.$ajax.patch('/api/person/bind_account/', {account_id: that.personId, person_id:res.data.id}).then(res => {
                  that.$message.success('提交成功！')
                  setTimeout(()=>{
                    this.$emit('list')
                  }, 1000)
                })
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            }
          }
        }
      },
      reset () {
        this.$emit('list')
      },
      imageView (url) {
        this.imageViewerUrl = url
        this.dialogImgVisible = true
      }
    }
  }
</script>
<style lang='less' scope>
  .add-account-wraper {
    margin-top: 30px;
    .add-account {
      .account-form {
        .account-row {
          margin-bottom: 15px; 
          .account-row__title {
            padding-left: 8px;
            &>.require {
              position: absolute;
              color: #F00B0B;
              margin-left: -8px;
              margin-top: 3px;
            }
            &>.-text {
              color: #666;
              font-size: 14px;
              &.-title {
                font-size: 18px;
              }
            }
          }
          .account-row__content {
            margin-top: 10px;
            &>input {
              width: 260px;
              line-height: 26px;
              color: #333;
              background:rgba(255,255,255,1);
              border:1px solid rgba(220,220,220,1);
              border-radius:4px;
              font-size: 14px;
              outline: none;
              padding-left: 5px;
              &:focus {
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                border-color: #409eff
              }
              &.-disable {
                background: rgb(245, 242, 242)
              }
              &.input-code {
                width: 125px;
              }
            }
            &>.btn-code {
              background:linear-gradient(90deg,rgba(12,141,255,1) 0%,rgba(48,158,255,1) 100%);
              box-shadow:0px 2px 4px 0px rgba(48,158,255,0.4);
              border-radius:4px;
              padding: 6px 10px;
              color: #ffffff;
              font-size: 14px;
              border: 1px solid transparent;
              outline: none;
              float: right;
              &:hover {
                .ns-tab-hover(#0c8dff, bg)
              }
              &.disabled {
                cursor: wait;
              }
            }
            .img-wraper {
              position: relative;
              width: 164px;
              height: 121px;
              &>.img-viewer {
                cursor: pointer;
                &>img {
                  width: 164px;
                  height: 121px;
                }
                &>input {
                  opacity: 0;
                  position: absolute;
                  width: 164px;
                  height: 121px;
                  top: 0;
                  left: 0;
                }
              }
            }
          }
          .account-handler {
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
              &.next {
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
                &.disabled {
                  background: #eaeaea;
                  color: #999;
                  box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
                  pointer-events: none
                }
              }
            }
          }
        }
      }
    }  
  }
</style>