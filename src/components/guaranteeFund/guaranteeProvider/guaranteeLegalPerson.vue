<template>
<div class='legalPerson'>
  <div class='info-enter'>
    <div class="top_name1">
      <h3>法人认证</h3>
      <p>以下均为必填项</p>
    </div>
    <div class='right'>
      <!-- 法人认证 -->
      <div class='right_top'>
        <div class='right_from'>
          <div class='basicsTitle'>
            <el-form :model='ruleForm' :rules='rules' ref='ruleForm' class='ruleForm' label-width="150px" label-position='left' size="small">
              <el-form-item label='姓名：' prop='name'>
                <el-input v-model.trim='ruleForm.name' style="width: 370px;" :class="{disTables: disTable}" :disabled="disTable" :maxlength="maxlength"></el-input>
              </el-form-item>
              <el-form-item label='身份证号：' prop='id_number'>
                <el-input v-model.trim='ruleForm.id_number' style="width: 370px;" :class="{disTables: disTable}" :disabled="disTable" :maxlength="maxlength"></el-input>
              </el-form-item>
              <el-form-item class='img_list' label-width="0" v-if='eId !== 1'>
                <ul>
                  <li v-for='(item, index) in imgList' :key='index'>
                    <div class='uploaadBtn uploaadBtns'>
                      <span v-if="item.img === ''">
                        <img :src="item.noimg" alt="">
                      </span>
                      <input type='file' v-if="item.img === ''" @change='uploaadFile($event, index)'>
                      <div class="img_big" v-if="item.img !== ''">
                        <img :src='$root_url() + item.img' alt='' v-if="item.img !== ''">
                        <span class="hover_img" v-if="item.img !== ''">
                          <span class="ins" @click="bigImg(item.img)"><i class="el-icon-zoom-in"></i></span>
                          <span class="del"><i class="el-icon-upload2"><input type='file' :id="item.title" @change='uploaadFile($event, index)'></i></span>
                        </span>
                      </div>
                    </div>
                    <p class='img_title'>{{imgTitle[index]}}</p>
                  </li>
                </ul>
              </el-form-item>
              <el-form-item class='img_list' label-width="0" v-if='eId === 1'>
                <ul>
                  <li>
                    <div class='uploaadBtn' v-if="auth_pic.legal_person_id_3 === ''">
                      <span v-if="auth_pic.legal_person_id_3 === ''" alt=""><img src="../../../../static/img/手持国徽面.png" alt=""></span>
                      <span v-if="auth_pic.legal_person_id_3 !== ''"><img :src="$root_url() + auth_pic.legal_person_id_3" alt=""></span>
                    </div>
                    <div class="imgs" v-if="auth_pic.legal_person_id_3">
                      <div>
                        <img :src="$root_url() + auth_pic.legal_person_id_3" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_pic.legal_person_id_3)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <p class='img_title'>手持身份证国徽面照</p>
                  </li>
                  <li>
                    <div class='uploaadBtn' v-if="auth_pic.legal_person_id_4 === ''">
                      <span v-if="auth_pic.legal_person_id_4 === ''" alt=""><img src="../../../../static/img/手持信息面.png" alt=""></span>
                      <span v-if="auth_pic.legal_person_id_4 !== ''"><img :src="$root_url() + auth_pic.legal_person_id_4" alt=""></span>
                    </div>
                    <div class="imgs" v-if="auth_pic.legal_person_id_4">
                      <div>
                        <img :src="$root_url() + auth_pic.legal_person_id_4" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_pic.legal_person_id_4)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <p class='img_title'>手持身份证人像面照</p>
                  </li>
                  <li>
                    <div class='uploaadBtn' v-if="auth_pic.legal_person_id_1 === ''">
                      <span v-if="auth_pic.legal_person_id_1 === ''" alt=""><img src="../../../../static/img/国徽面.png" alt=""></span>
                      <span v-if="auth_pic.legal_person_id_1 !== ''"><img :src="$root_url() + auth_pic.legal_person_id_1" alt=""></span>
                    </div>
                    <div class="imgs" v-if="auth_pic.legal_person_id_1">
                      <div>
                        <img :src="$root_url() + auth_pic.legal_person_id_1" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_pic.legal_person_id_1)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <p class='img_title'>身份证国徽面照</p>
                  </li>
                  <li>
                    <div class='uploaadBtn' v-if="auth_pic.legal_person_id_2 === ''">
                      <span v-if="auth_pic.legal_person_id_2 === ''" alt=""><img src="../../../../static/img/身份证信息面.png" alt=""></span>
                      <span v-if="auth_pic.legal_person_id_2 !== ''"><img :src="$root_url() + auth_pic.legal_person_id_2" alt=""></span>
                    </div>
                    <div class="imgs" v-if="auth_pic.legal_person_id_2">
                      <div>
                        <img :src="$root_url() + auth_pic.legal_person_id_2" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_pic.legal_person_id_2)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <p class='img_title'>身份证人像面照</p>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
            <p v-if='eId !== 1' style="margin-top:10px;margin-left:20px;">
              <el-checkbox v-model="checked">同意</el-checkbox>
              <span style="text-decoration: underline;color:#eb6100;cursor:pointer;font-size:14px;" @click="authenticity">真实性声明</span>
              <span v-if='authenticitys === 1' style="font-size:12px;color:#999;">本公司郑重承诺，本公司向九星平台报送的企业注册材料不存在虚假记载、误导性信息，本公司对其真实性、准确性负责。因虚假记载、误导性信息而引起的一切法律责任，均由本公司承担。</span>
            </p>
            <div class="class_down">
              <div class="sel" @click="submitForm" v-if='eId !== 1'>提交</div>
              <div class="reset_Form" @click='resetForm'>返回</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>确定要放弃您已经填写的内容信息吗？【确定】后信息不会被保留</span>
    <span slot="footer" class="dialog-footer">
      <button @click="dialogVisible = false">取 消</button>
      <button type="primary" @click="okStep(0)">确 定</button>
    </span>
  </el-dialog>
  <el-dialog title="提示" :visible.sync="numberShow" width="30%" :close-on-click-modal='false' :close-on-press-escape='false' :show-close='false'>
    <span>您的身份信息已在此平台注册，是否继续注册？</span>
    <span slot="footer" class="dialog-footer">
      <button @click="resetForm">否</button>
      <button @click="okStep(1)">是</button>
    </span>
  </el-dialog>
  <el-dialog :visible.sync="imgVisible" center :before-close="handleClose">
    <div style="text-align:center;">
      <img :src="$root_url() + imgSmallBig" alt="">
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      // 真实性说明
      checked: '',
      authenticitys: 0,
      // 取消
      dialogVisible: false,
      id: '',
      title: '法人认证',
      maxlength: 32,
      maxlengths: 12,
      ruleForm: {
        name: '',
        id_number: ''
      },
      educationStatus: ['小学', '初中', '高中', '大专', '本科', '硕士', '博士'],
      ageStatus: ['18岁—40岁', '41—65岁', '66岁以后'],
      imgList: [
        { title: 'legal_person_id_3', img: '', noimg: 'static/img/手持国徽面.png' },
        { title: 'legal_person_id_4', img: '', noimg: 'static/img/手持信息面.png' },
        { title: 'legal_person_id_1', img: '', noimg: 'static/img/国徽面.png' },
        { title: 'legal_person_id_2', img: '', noimg: 'static/img/身份证信息面.png' }
      ],
      imgTitle: ['手持身份证国徽面照', '手持身份证人像面照', '身份证国徽面照', '身份证人像面照'],
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'change' }
        ],
        id_number: [
          { required: true, message: '请填写身份证号码', trigger: 'change' }
        ]
      },
      isDisabled: false,
      time: 60,
      buttonName: '获取验证码',
      // 身份证照片
      auth_pic: {
        // 手持正面照
        legal_person_id_3: '',
        // 手持身份证人像面照
        legal_person_id_4: '',
        // 身份证国徽面照
        legal_person_id_1: '',
        // 身份证人像面照
        legal_person_id_2: ''
      },
      eId: '',
      businessId: '',
      disTable: false,
      legalPersonId: '',
      change_apply: '',
      verify: '',
      numberShow: false,
      person_id: '',
      // 点击图片放大
      imgVisible: false,
      imgSmallBig: ''
    }
  },
  mounted () {
    var that = this
    that.businessId = localStorage.id
    that.change_apply = that.$route.query.change_apply
    that.eId = Number(that.$route.query.eId)
    that.$ajax.get('/api/company/status/').then(res => {
      that.verify = Number(res.data.legal_person_verified)
      if (that.eId) {
        that.eId = Number(that.$route.query.eId)
        if (that.eId === 1) {
          that.disTable = true
        } else {
          that.disTable = false
        }
        that.$ajax.get(`/api/company/` + that.businessId).then(res => {
          if (that.changes === false || that.verify === 1) {
            console.log(1)
            that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
              that.legalPersonId = res.data.legal_person_info.id
              that.ruleForm.name = res.data.legal_person_info.name
              that.ruleForm.id_number = res.data.legal_person_info.id_number
              if (res.data.legal_person_info.auth_pic) {
                that.auth_pic = res.data.legal_person_info.auth_pic
                that.imgList[0].img = res.data.legal_person_info.auth_pic.legal_person_id_3
                that.imgList[1].img = res.data.legal_person_info.auth_pic.legal_person_id_4
                that.imgList[2].img = res.data.legal_person_info.auth_pic.legal_person_id_1
                that.imgList[3].img = res.data.legal_person_info.auth_pic.legal_person_id_2
              }
            })
          } else {
            console.log(2)
            if (res.data.detail_change) {
              that.$ajax.get(`/api/company_detail/` + res.data.detail_change).then(res => {
                that.legalPersonId = res.data.legal_person_info.id
                that.ruleForm.name = res.data.legal_person_info.name
                that.ruleForm.id_number = res.data.legal_person_info.id_number
                if (res.data.legal_person_info.auth_pic) {
                  that.auth_pic = res.data.legal_person_info.auth_pic
                  that.imgList[0].img = res.data.legal_person_info.auth_pic.legal_person_id_3
                  that.imgList[1].img = res.data.legal_person_info.auth_pic.legal_person_id_4
                  that.imgList[2].img = res.data.legal_person_info.auth_pic.legal_person_id_1
                  that.imgList[3].img = res.data.legal_person_info.auth_pic.legal_person_id_2
                }
              })
            } else {
              that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
                that.legalPersonId = res.data.legal_person_info.id
                that.ruleForm.name = res.data.legal_person_info.name
                that.ruleForm.id_number = res.data.legal_person_info.id_number
                if (res.data.legal_person_info.auth_pic) {
                  that.auth_pic = res.data.legal_person_info.auth_pic
                  that.imgList[0].img = res.data.legal_person_info.auth_pic.legal_person_id_3
                  that.imgList[1].img = res.data.legal_person_info.auth_pic.legal_person_id_4
                  that.imgList[2].img = res.data.legal_person_info.auth_pic.legal_person_id_1
                  that.imgList[3].img = res.data.legal_person_info.auth_pic.legal_person_id_2
                }
              })
            }
          }
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 点击图片放大
    bigImg (img) {
      const that = this
      that.imgVisible = true
      that.imgSmallBig = img
    },
    // 验证身份证号码
    idNumber (item) {
      const that = this
      that.ruleForm.id_number = item.toUpperCase()
      if (that.eId !== 1) {
        that.$ajax.get('/api/person/?id_number=' + item + '?login=1').then(res => {
          if (res.data.results.length > 0) {
            that.numberShow = true
            that.person_id = res.data.results.id
          } else {
            that.numberShow = false
            that.person_id = ''
          }
        })
      }
    },
    // 真实性说明
    authenticity () {
      if (this.authenticitys === 0) {
        this.authenticitys = 1
      } else {
        this.authenticitys = 0
      }
    },
    // 取消
    handleClose () {
      this.dialogVisible = false
      this.imgVisible = false
    },
    // 确定-返回上一级
    okStep (i) {
      const that = this
      if (i === 0) {
        that.$router.push('/setting?signed=1')
      } else if (i === 1) {
        that.$ajax.patch(`/api/auth/` + localStorage.identifier + '/', {person: that.person_id}).then(res => {
          that.numberShow = false
        })
      }
    },
    // 身份证图片
    uploaadFile ($event, index) {
      var that = this
      const isJPG = $event.target.files[0].type === 'image/jpg' || $event.target.files[0].type === 'image/png' || $event.target.files[0].type === 'image/jpeg'
      const isLt2M = $event.target.files[0].size < 5 * 1024 * 1024
      if (!isJPG) {
        this.$message.error('只能是 JPG、JPEG或者PNG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('大小不能超过 5MB!')
        return
      }
      if ($event.target.files[0]) {
        that.imgList[index].imgFile = $event.target.files[0]
        var fr = new FileReader()
        fr.onloadend = function (e) {
          that.imgList[index].img = e.target.result
          console.log(that.imgList[index])
          var fileUrl = new FormData()
          fileUrl.append('file', that.imgList[index].imgFile)
          fileUrl.append('function_module', 'company_info')
          that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
            that.imgList[index].img = res.data
            that.auth_pic.legal_person_id_3 = that.imgList[0].img
            that.auth_pic.legal_person_id_4 = that.imgList[1].img
            that.auth_pic.legal_person_id_1 = that.imgList[2].img
            that.auth_pic.legal_person_id_2 = that.imgList[3].img
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
        fr.readAsDataURL($event.target.files[0])
      }
    },
    // 获取验证码
    postVerific () {
      if (this.buttonName === '获取验证码') {
        if (this.ruleForm.person_info.phone !== '') {
          let me = this
          // me.isDisabled = true
          let interval = setInterval(function () {
            me.buttonName = '（' + me.time + '秒）后重新发送'
            --me.time
            if (me.time < 0) {
              me.buttonName = '获取验证码'
              me.time = 60
              me.isDisabled = false
              window.clearInterval(interval)
            }
          }, 1000)
          this.$ajax.post('/api/verify_code/', {phone: this.ruleForm.person_info.phone, operation_type: 'legalPerson'}).then(res => {
            if (res.data.code === '1') {
              this.$message.success('验证码已发送至：' + this.ruleForm.person_info.phone)
            }
          }).catch(err => {
            this.$message.error(err.response.data.err_msg)
          })
        } else {
          this.$message.error('请输入手机号')
        }
      }
    },
    // 提交
    submitForm () {
      var that = this
      var flag = true
      that.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (that.checked === true) {
            if (that.eId === 2) {
              if (that.verify === 3) {
                that.$ajax.post('/api/person/', {auth_pic: that.auth_pic, ...that.ruleForm, legal_person: true}).then(res => {
                  that.$router.push('/setting?signed=1')
                }).catch(err => {
                  that.$message.error(err.response.data.err_msg)
                })
                that.$ajax.put('/api/bms/verify/record/rewrite/', {module: 3}).then(res => {
                  console.log(res)
                })
              } else {
                that.$ajax.post('/api/person/', { change_apply: that.change_apply, auth_pic: that.auth_pic, ...that.ruleForm, legal_person: true}).then(res => {
                  that.$router.push('/setting?signed=1')
                }).catch(err => {
                  that.$message.error(err.response.data.err_msg)
                })
              }
            } else {
              that.$ajax.post('/api/person/', {auth_pic: that.auth_pic, ...that.ruleForm, legal_person: true}).then(res => {
                that.$router.push('/setting?signed=1')
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            }
          } else {
            that.$message.error('请勾选真实性声明')
          }
        }
      })
    },
    // 返回
    resetForm () {
      const that = this
      if (that.eId === 1) {
        that.$router.push('/setting?signed=1')
      } else {
        this.dialogVisible = true
      }
    }
  }
}
</script>
<style lang='less' scoped>
.legalPerson {
  min-height: 100%;
  background: #fff;
  padding: 40px 0;
  margin: 20px;
  box-sizing: border-box;
  .info-enter {
    position: relative;
    width: 100%;
    padding: 0 30px 0 40px;
    .top_name1 {
      width: 100%;
      h3 {
        font-size:18px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
      p {
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        padding-top: 11px;
      }
    }
    .button_class {
      width: 90px;
      height: 30px;
      background: none;
      color: rgba(235, 97, 0, 1);
      border: 1px solid rgba(235, 97, 0, 1);
      border-radius: 5px;
      outline: none;
    }
    .button_classs {
      width: auto;
      height: 30px;
      background: rgba(235, 97, 0, 1);
      color: #fff;
      border-radius: 5px;
      border: none;
      outline: none;
      padding: 0 10px;
      margin-left: 30px;
    }
    .top_title {
      background:#ffffff;
      border:1px solid #c3cad9;
      border-radius:4px;
      width:943px;
      height:124px;
      text-align: left;
      padding: 0 20px;
      margin: 0 auto;
      ul {
        padding-top: 32px;
        display: flex;
        flex-direction: row;
        li {
          position: relative;
          span {
            font-size: 16px;
            color: #333;
            position: absolute;
            top: 12px;
            left: 43px;
          }
          .color_class {
            color: #fff;
          }
        }
        li:first-child {
          span {
            left: 20px;
          }
        }
      }
    }
    .right {
      width:943px;
      height:auto;
      // margin-top: 35px;
      margin: 39px 0 0;
      .right_top {
        h3 {
          font-size: 24px;
          color: #696969;
          padding-bottom: 20px;
          span {
            display: inline-block;
            font-size: 12px;
            color: #b1bec8;
            padding-left: 20px;
          }
        }
      }
      .right_from {
        .basicsTitle {
          .class_down {
            text-align: center;
            margin-top: 40px;
            display: flex;
            flex-direction: row;
            .reset_Form {
              cursor: pointer;
              outline: none;
              line-height: 32px;
              width:74px;
              height:32px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(220,220,220,1);
              box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
              border-radius:4px;
              font-size:14px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(102,102,102,1);
            }
            div {
              margin: 0 30px;
            }
            .sel {
              cursor: pointer;
              outline: none;
              line-height: 32px;
              width:74px;
              height:32px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(220,220,220,1);
              box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
              border-radius:4px;
              font-size:14px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(102,102,102,1);
            }
          }
          .ruleForm {
            border-bottom: 1px solid #edf2f5;
          }
          padding-top: 30px;
          .verificationCode {
            position: relative;
            .button_class_list {
              width: auto;
              height: 30px;
              line-height: 30px;
              cursor: pointer;
              position: absolute;
              top: 4px;
              left: 35%;
              padding: 0 10px;
              border-radius: 5px;
            }
            .button_class_list {
              background: rgba(235, 97, 0, 1);
              border: none;
              color: #fff;
            }
          }
          .img_list {
            height: 382px;
            border-bottom: 1px solid #edf2f5;
            ul {
              // padding: 0 100px;
              li {
                width: 30%;
                height: 124px;
                float: left;
                margin: 20px 0 30px;
                .uploaadBtn {
                  position: relative;
                  width:166px;
                  height:127px;
                  // border: 1px dashed #bfbfbf;
                  margin: 20px 20px 0;
                  span {
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 80px;
                    font-weight: bold;
                    font-size: 40px;
                    color: #bfbfbf;
                    cursor: pointer;
                  }
                  input {
                    width:166px;
                    height:127px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                  }
                  img {
                    width:166px;
                    height:127px;
                  }
                }
                .imgs {
                  display: flex;
                  flex-direction: row;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                  div {
                    width: 166px;
                    height: 127px;
                    margin: 20px 20px 0;
                    position: relative;
                    overflow: hidden;
                    background-color: #fff;
                    border: 1px solid #c0ccda;
                    border-radius: 6px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    display: inline-block;
                    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
                    transition: all .5s cubic-bezier(.55,0,.1,1);
                    font-size: 14px;
                    color: #606266;
                    line-height: 1.8;
                    .hover_img {
                      cursor: pointer;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      left: 0;
                      top: 0;
                      cursor: default;
                      text-align: center;
                      color: #fff;
                      opacity: 0;
                      font-size: 28px;
                      background-color: rgba(0,0,0,.5);
                      -webkit-transition: opacity .3s;
                      transition: opacity .3s;
                      span {
                        display: none;
                        cursor: pointer;
                      }
                    }
                    .hover_img:hover {
                      opacity: 1;
                      display: inline-block;
                    }
                    .hover_img:hover span {
                      display: inline-block;
                      margin-right: 6px;
                    }
                    .hover_img:hover .del {
                      display: inline-block;
                      margin-left: 6px;
                    }
                    .hover_img::after {
                      display: inline-block;
                      content: "";
                      height: 100%;
                      vertical-align: middle;
                      box-sizing: inherit;
                    }
                  }
                }
                .uploaadBtns {
                  img {
                    width: 100%;
                    height: 100%;
                  }
                  .del {
                    cursor: pointer;
                    .el-icon-upload2 {
                      position: relative;
                    }
                    input {
                      width:40px;
                      height:40px;
                      position: absolute;
                      top: 0;
                      left: 0;
                      opacity: 0;
                      cursor: pointer;
                    }
                  }
                  .img_big {
                    width: 166px;
                    height: 127px;
                    position: relative;
                    overflow: hidden;
                    background-color: #fff;
                    border: 1px solid #c0ccda;
                    border-radius: 6px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    display: inline-block;
                    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
                    transition: all .5s cubic-bezier(.55,0,.1,1);
                    font-size: 14px;
                    color: #606266;
                    line-height: 1.8;
                    .hover_img {
                      cursor: pointer;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      left: 0;
                      top: 0;
                      cursor: default;
                      text-align: center;
                      color: #fff;
                      opacity: 0;
                      font-size: 28px;
                      background-color: rgba(0,0,0,.5);
                      -webkit-transition: opacity .3s;
                      transition: opacity .3s;
                      span {
                        display: none;
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        i {
                          font-size: 28px;
                          color: #fff;
                          cursor: pointer;
                        }
                      }
                    }
                    .hover_img:hover {
                      opacity: 1;
                      display: inline-block;
                    }
                    .hover_img:hover span {
                      display: inline-block;
                      margin-right: 6px;
                    }
                    .hover_img:hover .del {
                      display: inline-block;
                      margin-left: 6px;
                    }
                    .hover_img::after {
                      display: inline-block;
                      content: "";
                      height: 100%;
                      vertical-align: middle;
                      box-sizing: inherit;
                    }
                  }
                }
                p.img_title {
                  height: 20px;
                  width: 166px;
                  text-align: center;
                  margin-left: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
  .disTable {
    color: #333;
    background: #fff;
    outline: none;
  }
}
.dialog-footer {
  button {
    width: 100px;
    height: 32px;
    outline: none;
    border-radius: 4px;
  }
  button:first-child {
    color: #eb6100;
    border: 1px solid #eb6100;
    background: none;
  }
  button:last-child {
    color: #fff;
    border: none;
    background: #eb6100;
    margin-left: 20px;
  }
}
</style>

<style lang="less">
.legalPerson {
  .radio_list {
    .el-radio__input.is-checked+.el-radio__label {
      color: #eb6100;
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #eb6100;
      background: #eb6100;
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #eb6100;
    border-color: #eb6100;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #eb6100;
  }
  .el-checkbox__inner:hover {
    border-color: #eb6100;
  }
}
</style>
