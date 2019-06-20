<template>
  <div class='accountManagement'>
    <!-- <AppNav :father='{selIndex: 10}' type='1'></AppNav> -->
    <div class='info-enter'>
      <div class="forms">
        <div class="father" v-show="fatherShow">
          <div class="account">
            <div class="account_father">
              <h3>账号信息<i></i></h3>
              <ul>
                <li>
                  <p>登录手机号：</p>
                  <span v-if="loginClass.phone !== null">{{loginClass.phone}}</span>
                  <span v-if="loginClass.phone === null">未绑定</span>
                </li>
                <li>
                  <p>登录邮箱：</p>
                  <span v-if="loginClass.email !== null">{{loginClass.email}}</span>
                  <span v-if="loginClass.email === null">未绑定</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="account_son">
            <div class="account_father_son">
              <h3>子账号信息</h3>
              <el-table border :data="tableData" style="width: 90%">
                <el-table-column prop="phone" label="登录账号" align="left" width="200"></el-table-column>
                <!-- <el-table-column prop="person.name" label="实名认证" align="left" width="100"></el-table-column> -->
                <el-table-column label="姓名" align="left" width="150">
                  <template slot-scope="scope">
                    <span v-if='scope.row.person'>{{scope.row.person.name}}</span>
                    <span v-else>未上传</span>
                  </template>
                </el-table-column>
                <el-table-column label="证件号" align="left">
                  <template slot-scope="scope">
                    <span v-if='scope.row.person'>{{scope.row.person.id_number}}</span>
                    <span v-else>未上传</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="left" width="120">
                  <template slot-scope="scope">
                    <!-- <button size="mini" @click="changeAppDialog(scope.$index, scope.row)">删除</button> -->
                    <button size="mini" @click="handleUpload(scope.$index, scope.row)" v-if="scope.row.verify_status === '2'">审核中</button>
                    <button size="mini" @click="handleUpload(scope.$index, scope.row)" v-if="scope.row.verify_status === '4'">已通过</button>
                    <button size="mini" @click="handleUpload(scope.$index, scope.row)" v-if="scope.row.verify_status === '1'">未上传</button>
                    <button size="mini" @click="handleUpload(scope.$index, scope.row)" v-if="scope.row.verify_status === '3'">未通过</button>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="tableData.length === 0" style="text-align: center;">暂无数据</div>
            </div>
            <button class="installSon" type="primary" :disabled='lengthShow' @click="installSon">添加子账号</button>
          </div>
        </div>
        <div class="son" v-show="sonShow">
          <h3>创建子账号：<span>一下均为必填项</span><i></i></h3>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small" class="demo-ruleForm">
            <el-form-item label="登录账号：" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入手机号" :maxlength="maxlength"></el-input>
            </el-form-item>
            <!-- <el-form-item label="输入验证码" prop="v_code">
              <el-input v-model="ruleForm.v_code"></el-input>
              <el-button>获取验证码</el-button>
            </el-form-item> -->
            <el-form-item label='获取验证码：' prop='v_code' class='verificationCode'>
                <el-input v-model='ruleForm.v_code' class='verification' :maxlength="maxlength - 5"></el-input>
                <el-button size='mini' @click='postVerific' :disabled='isDisabled'>{{buttonName}}</el-button>
              </el-form-item>
            <el-form-item label="登录密码：" prop="password">
              <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
              <el-button type="primary" @click="comeForm('ruleForm')">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="authentication" v-show="authentication">
          <div class="account">
            <div class="account_father">
              <h3>子账号实名认证</h3>
              <ul>
                <li>
                  <p>登录账号：</p>
                  <span>{{loginNum}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="account_son">
            <div class="account_father_son">
              <h3>子账号实名认证<span>一下均为必填项</span></h3>
              <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" size="small" class="demo-ruleForm">
                <el-form-item label="真实姓名" prop="name">
                  <el-input v-model="ruleForm1.name" :maxlength="maxlengths"></el-input>
                </el-form-item>
                <el-form-item label="身份账号" prop="person_id">
                  <el-input v-model="ruleForm1.id_number" :maxlength="maxlength + 7"></el-input>
                </el-form-item>
                <el-form-item class='img_list' v-if="verifyStatus === false">
                  <ul>
                    <li v-for='(item, index) in imgList' :key='index'>
                      <div class='uploaadBtn'>
                        <span v-if="item.img === ''"><img src="../../../../static/img/imgPerson.png" alt=""></span>
                        <input type='file' @change='uploaadFile($event, index)'>
                        <img :src='$root_url() + item.img' alt='' v-if="item.img !== ''">
                      </div>
                      <p class='img_title'>{{imgTitle[index]}}</p>
                    </li>
                  </ul>
                </el-form-item>
                <el-form-item class='img_list' v-if="verifyStatus === true">
                  <ul>
                    <li>
                      <div class='uploaadBtn'>
                        <img :src='$root_url() + auth_pic.legal_person_id_1' alt=''>
                      </div>
                      <p class='img_title'>身份证国徽面照</p>
                    </li>
                    <li>
                      <div class='uploaadBtn'>
                        <img :src='$root_url() + auth_pic.legal_person_id_2' alt=''>
                      </div>
                      <p class='img_title'>身份证人像面照</p>
                    </li>
                    <li>
                      <div class='uploaadBtn'>
                        <img :src='$root_url() + auth_pic.legal_person_id_3' alt=''>
                      </div>
                      <p class='img_title'>手持身份证国徽面照</p>
                    </li>
                    <li>
                      <div class='uploaadBtn'>
                        <img :src='$root_url() + auth_pic.legal_person_id_4' alt=''>
                      </div>
                      <p class='img_title'>手持身份证人像面照</p>
                    </li>
                  </ul>
                </el-form-item>
              </el-form>
              <div class="btn">
                <button @click="submitForms('ruleForm')" v-if="verifyStatus === false">提交</button>
                <button @click="cancelForm">取消</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" align='left' :before-close="handleClose">
        <p class="ok_frame">确定删除么?</p>
        <div slot="footer" class="frame">
          <button class="reset_Form" @click="dialogVisible = false">取 消</button>
          <button class="sel" @click="handleDelete">确 定</button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import AppNav from '../../financing/financingManege'
export default {
  // components: {
  //   AppNav
  // },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      name: 'accountManagement',
      fatherShow: true,
      sonShow: false,
      authentication: false,
      maxlength: 11,
      maxlengths: 32,
      ruleForm: {
        phone: '',
        v_code: '',
        password: '',
        checkPass: ''
      },
      ruleForm1: {
        name: '',
        id_number: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'change' }
        ],
        person_id: [
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ]
      },
      imgList: [
        { title: 'legal_person_id_1', img: '' },
        { title: 'legal_person_id_2', img: '' },
        { title: 'legal_person_id_3', img: '' },
        { title: 'legal_person_id_4', img: '' }
      ],
      // 登录账号
      loginNum: '',
      imgTitle: ['身份证国徽面照', '身份证人像面照', '手持身份证国徽面照', '手持身份证人像面照'],
      isDisabled: false,
      time: 60,
      buttonName: '获取验证码',
      // 子账号信息
      personList: '',
      tableData: [],
      lengthShow: false,
      personId: '',
      loginClass: {
        phone: '',
        email: ''
      },
      dialogVisible: false,
      personDialog: '',
      user_key: '',
      // 身份证照片
      auth_pic: {
        legal_person_id_1: '',
        legal_person_id_2: '',
        legal_person_id_3: '',
        legal_person_id_4: ''
      },
      verifyStatus: false
    }
  },
  mounted () {
    var that = this
    // 子账号信息
    that.$ajax.get('/api/sub_account/').then(res => {
      that.tableData = res.data.results
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    // 账号信息
    that.$ajax.get('/api/auth/login_name/').then(res => {
      that.loginClass = res.data
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 点击删除
    changeAppDialog (index, row) {
      var that = this
      that.dialogVisible = true
      that.personDialog = row.person_id
    },
    // 关闭
    handleClose () {
      var that = this
      that.dialogVisible = false
    },
    // 删除子账号
    handleDelete () {
      var that = this
      if (localStorage.role === 'business') {
        that.$ajax.delete('/api/manage/business/person/?token=' + that.$token() + '&person_id=' + that.personDialog).then(res => {
          this.$ajax.get('/api/manage/business/person/?token=' + this.$token()).then(res => {
            if (res.data.code === '1') {
              this.tableData = res.data.data
              that.personList = res.data.person_num
              that.dialogVisible = false
              if (that.personList === 5) {
                that.lengthShow = true
              }
            }
          })
        })
      } else if (localStorage.role === 'institution') {
        that.$ajax.delete('/api/manage/institution/person/?token=' + that.$token() + '&person_id=' + that.personDialog).then(res => {
          this.$ajax.get('/api/manage/institution/person/?token=' + this.$token()).then(res => {
            if (res.data.code === '1') {
              this.tableData = res.data.data
              that.personList = res.data.person_num
              if (that.personList === 5) {
                that.lengthShow = true
              }
            }
          })
        })
      } else if (localStorage.role === 'serviceprovider') {
        that.$ajax.delete('/api/manage/service/person/?token=' + that.$token() + '&person_id=' + that.personDialog).then(res => {
          this.$ajax.get('/api/manage/service/person/?token=' + this.$token()).then(res => {
            if (res.data.code === '1') {
              this.tableData = res.data.data
              that.personList = res.data.person_num
              if (that.personList === 5) {
                that.lengthShow = true
              }
            }
          })
        })
      }
    },
    // 上传
    handleUpload (index, row) {
      var that = this
      that.loginNum = row.phone
      that.personId = row.uid
      for (var i = 0; i < 4; i++) {
        that.imgList[i].img = ''
      }
      if (row.verify_status === '1') {
        that.authentication = true
        that.fatherShow = false
        that.sonShow = false
        that.verifyStatus = false
        that.ruleForm1 = {}
      } else if (row.verify_status === '3') {
        that.authentication = true
        that.fatherShow = false
        that.ruleForm1 = {}
        that.verifyStatus = false
        that.sonShow = false
      } else if (row.verify_status === '2') {
        that.authentication = true
        that.fatherShow = false
        that.sonShow = false
        that.verifyStatus = true
        // 子账号信息
        that.$ajax.get(`/api/sub_account/` + row.uid).then(res => {
          console.log(res)
          that.ruleForm1.name = res.data.person.name
          that.ruleForm1.id_number = res.data.person.id_number
          that.auth_pic = res.data.person.auth_pic
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 获取验证码
    postVerific () {
      var that = this
      if (this.ruleForm.phone !== '') {
        that.$ajax.get('/api/account_exists/?phone=' + this.ruleForm.phone).then(res => {
          if (res.data.status === false) {
            let me = this
            me.isDisabled = true
            let interval = window.setInterval(function () {
              me.buttonName = '（' + me.time + '秒）后重新发送'
              --me.time
              if (me.time < 0) {
                me.buttonName = '重新发送'
                me.time = 60
                me.isDisabled = false
                window.clearInterval(interval)
              }
            }, 1000)
            that.$ajax.post('/api/verify_code/', {phone: this.ruleForm.phone, operation_type: 'sub_account'}).then(res => {
              that.$message.success('验证码发送成功')
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          } else {
            return that.$message.error(res.data.msg)
          }
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        that.$message.error('请输入手机号码')
      }
    },
    // 下一步
    submitForm (formName) {
      var that = this
      var data = {}
      for (var i = 0; i < 4; i++) {
        that.imgList[i].img = ''
      }
      if (this.ruleForm.password === this.ruleForm.checkPass) {
        data.phone = that.ruleForm.phone
        data.user_key = that.ruleForm.v_code
        data.operation_type = 'sub_account'
        data.password = this.ruleForm.password
        that.$ajax.post('/api/sub_account/', {...data}).then(res => {
          this.authentication = true
          this.fatherShow = false
          this.sonShow = false
          this.personId = res.data.uid
          this.loginNum = res.data.phone
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 返回
    comeForm () {
      this.sonShow = false
      this.fatherShow = true
    },
    // 子账号实名认证取消
    cancelForm () {
      var that = this
      this.authentication = false
      this.fatherShow = true
      this.sonShow = false
      // 子账号信息
      that.$ajax.get('/api/sub_account/').then(res => {
        that.tableData = res.data.results
        if (that.tableData.length === 5) {
          that.lengthShow = true
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 子账号实名认证提交
    submitForms (formName) {
      var that = this
      var fileUrl = new FormData()
      var flag = true
      fileUrl.append('name', this.ruleForm1.name)
      fileUrl.append('id_number', this.ruleForm1.id_number)
      for (var i = 0; i < 4; i++) {
        if (this.imgList[i].img === '') {
          that.$message.error(that.imgTitle[i] + '未上传')
          flag = false
          break
        }
      }
      if (this.ruleForm1.name === '') {
        that.$message.error('请输入真实姓名')
      } else {
        if (this.ruleForm1.id_number === '') {
          that.$message.error('请输入身份证号码')
        } else {
          if (flag) {
            that.$ajax.post('/api/person/', {auth_pic: that.auth_pic, name: that.ruleForm1.name, id_number: that.ruleForm1.id_number, account_id: that.personId}).then(res => {
              that.$ajax.patch('/api/person/bind_account/', {account_id: that.personId, person_id:res.data.id}).then(res => {
                that.authentication = false
                that.fatherShow = true
                that.sonShow = false
                that.$message.success('提交成功！')
                that.$ajax.get('/api/sub_account/').then(res => {
                  that.tableData = res.data.results
                  if (that.tableData.length === 5) {
                    that.lengthShow = true
                  }
                }).catch(err => {
                  that.$message.error(err.response.data.err_msg)
                })
              })
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }
        }
      }
    },
    // 身份证图片
    uploaadFile ($event, index) {
      var that = this
      if ($event.target.files[0]) {
        that.imgList[index].imgFile = $event.target.files[0]
        var fr = new FileReader()
        fr.onloadend = function (e) {
          that.imgList[index].img = e.target.result
          console.log(e)
          var fileUrl = new FormData()
          fileUrl.append('file', that.imgList[index].imgFile)
          fileUrl.append('function_module', 'company_info')
          that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
            console.log(res)
            that.imgList[index].img = res.data
            that.auth_pic.legal_person_id_1 = that.imgList[0].img
            that.auth_pic.legal_person_id_2 = that.imgList[1].img
            that.auth_pic.legal_person_id_3 = that.imgList[2].img
            that.auth_pic.legal_person_id_4 = that.imgList[3].img
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
        fr.readAsDataURL($event.target.files[0])
      }
    },
    installSon () {
      this.fatherShow = false
      this.sonShow = true
      this.ruleForm = {}
      this.buttonName = '获取验证码'
    }
  }
}
</script>
<style lang='less' scoped>
.accountManagement {
  height: 100%;
  .info-enter {
    font-size: 14px;
    height: 100%;
    position: relative;
    padding-bottom: 33px;
    // padding: 0 50px;
    display: flex;
    flex-direction: row;
    .forms {
      flex: 1;
    }
    .father {
      background: #fff;
      border: 1px solid #f5f7f8;
      padding: 10px 30px;
      .account {
        height: 200px;
        text-align: left;
        .account_father {
          h3 {
            font-family:PingFangSC-Medium;
            font-size:18px;
            color:#666666;
            letter-spacing:0;
            text-align:left;
            padding: 34px 0 0 27px;
            border-bottom: 1px solid #e7ebee;
            padding-bottom: 15px;
          }
          ul {
            margin-left: 170px;
            li {
              padding-top: 30px;
              font-size: 14px;
              p {
                display: inline-block;
                padding-right: 30px;
                color: #696969;
                width: 130px;
              }
            }
          }
        }
      }
      .account_son {
        text-align: center;
        .account_father_son {
          text-align: left;
          padding-top: 30px;
          .el-table {
            margin: 30px auto;
            // margin-top: 30px;
          }
          h3 {
            padding: 34px 0 15px 27px;
            border-bottom: 1px solid #e7ebee;
            font-family:PingFangSC-Medium;
            font-size:18px;
            color:#666666;
            letter-spacing:0;
            text-align:left;
          }
          ul {
            margin-left: 170px;
            text-align: left;
            li {
              padding-top: 30px;
              font-size: 14px;
              // display: flex;
              // flex-direction: row;
              p {
                display: inline-block;
                padding-right: 30px;
              }
              .el-button--text {
                color: #333;
              }
              .is-plain {
                margin-left: 20px;
                margin-right: 40px;
              }
            }
          }
          .btn {
            background: none;
            border: none;
            outline: none;
            display: inline-block;
            color: #eb6100;
          }
          button {
            background: none;
            border: none;
            outline: none;
            color: #eb6100;
          }
        }
        .installSon {
          width: 100px;
          height: 35px;
          line-height: 5px;
          border: none;
          color: #fff;
          outline: none;
          border-radius: 5px;
          background: #eb6100;
          margin-top: 30px;
          margin-bottom: 30px;
        }
      }
    }
    .son {
      width: 100%;
      height: 500px;
      text-align: left;
      padding-top: 60px;
      background: #fff;
      border: 1px solid #f5f7f8;
      h3 {
        font-size: 16px;
        color: #000;
        padding: 34px 0 0 27px;
        margin-bottom: 30px;
        i {
          height: 1px;
          width: 900px;
          background: #e7ebee;
          display: inline-block;
          margin-left: 54px;
        }
        span {
          font-size: 10px;
          color: #afbcc7;
          padding-left: 20px;
          display: inline-block;
        }
      }
      .demo-ruleForm {
        margin-left: 170px;
      }
      .el-input {
        width: 369px;
        height: 30px;
        margin-right: 5px;
      }
      .el-button {
        text-align: center;
        width: 100px;
        height: 30px;
        line-height: 3px;
        color: #fff;
        background: rgba(255, 102, 0, 1);
        border: none;
      }
      .verificationCode {
        .el-button {
          width: auto;
          height: 30px;
          padding: 0 10px;
          margin-left: 30px;
        }
        .el-button--primary {
          background: rgba(235, 97, 0, 1);
          border: none;
          color: #fff;
        }
      }
    }
    .authentication {
      width: 100%;
      background: #fff;
      text-align: left;
      border: 1px solid #f5f7f8;
      .account {
        text-align: left;
        .account_father {
          h3 {
            font-family:PingFangSC-Medium;
            font-size:18px;
            color:#666666;
            letter-spacing:0;
            text-align:left;
            padding: 34px 0 0 27px;
            i {
              height: 1px;
              width: 100%;
              background: #e7ebee;
              display: inline-block;
              margin-left: 54px;
            }
          }
          ul {
            li {
              padding-top: 30px;
              font-size: 14px;
              padding-bottom: 20px;
              margin-left: 170px;
              p {
                display: inline-block;
                padding-right: 30px;
              }
            }
          }
        }
      }
      .account_son {
        .account_father_son {
          padding-top: 30px;
          .btn {
            margin: 30px 0;
            text-align: center;
            button {
              width: 120px;
              border-color: #eb6100;
              color: #fff;
              border-radius: 3px;
              font-size: 14px;
              padding: 0 10px;
              outline: none;
              border: none;
              margin-right: 10px;
              background:#eb6100;
              border-radius:4px;
              height:38px;
            }
          }
          h3 {
            font-family:PingFangSC-Medium;
            font-size:18px;
            color:#666666;
            letter-spacing:0;
            text-align:left;
            padding: 34px 0 15px 27px;
            margin-bottom: 30px;
            border-bottom: 1px solid #e7ebee;
            span {
              font-size: 10px;
              color: #afbcc7;
              padding-left: 20px;
              display: inline-block;
            }
          }
          ul {
            li {
              padding-top: 30px;
              font-size: 14px;
              p {
                display: inline-block;
                padding-right: 30px;
              }
              .el-button--text {
                color: #333;
              }
              .is-plain {
                margin-left: 20px;
                margin-right: 40px;
              }
            }
          }
        }
        .img_list {
          height: auto;
          border-bottom: 1px solid #edf2f5;
          margin-left: 0;
          ul {
            height: auto;
            min-height: 400px;
            li {
              width: 193px;
              height: 174px;
              float: left;
              margin: 0 30px 10px;
              text-align: center;
              .uploaadBtn {
                position: relative;
                width: 193px;
                height: 140px;
                // border: 1px dashed #eb6100;
                span {
                  display: block;
                  width: 193px;
                  height: 140px;
                  text-align: center;
                  line-height: 80px;
                  font-weight: bold;
                  font-size: 40px;
                  color: #bfbfbf;
                  cursor: pointer;
                  // border: 2px solid #eb6100;
                }
                input {
                  width: 193px;
                  height: 140px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                }
                img {
                  width: 193px;
                  height: 140px;
                }
              }
              p.img_title {
                height: 20px;
                text-align: center;
                font-size: 12px;
                // padding-left: 60px;
              }
            }
          }
        }
        .demo-ruleForm {
          margin-left: 130px;
          .el-input {
            width: 368px;
            height: 30px;
          }
          .el-input__inner {
            width: 368px;
            height: 30px;
          }
        }
        .btn_cen {
          margin-left: 400px;
          .el-button {
            width: 120px;
            height: 34px;
            line-height: 5px;
            color: #fff;
            background: rgba(235, 97, 0, 1);
          }
        }
      }
    }
    .ok_frame {
      font-size: 18px;
      text-align: left;
    }
    .frame {
      .reset_Form {
        width: 80px;
        height: 30px;
        background: none;
        border: 1px solid #eb6100;
        color: #eb6100;
        border-radius: 5px;
        outline: none;
        line-height: 30px;
        text-align: center;
      }
      button {
        margin: 0 10px;
      }
      .sel {
        color: #fff;
        background: #eb6100;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border: none;
        outline: none;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
}
</style>
