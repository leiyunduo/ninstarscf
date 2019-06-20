<template>
  <div class="financeAdmittanceFirst">
    <div class="info-enter">
      <div class="top_name">
        <h3>注册人信息</h3>
      </div>
      <div class="top_name1">
        <h3>完善注册人身份</h3>
        <p>请务必保证您填写的信息准确无误，否则可能认证失败</p>
      </div>
      <div class="right" v-if='nextData === 0'>
        <div class='right_from'>
          <div class='basicsTitle'>
            <div class="radio_list" v-if='!eId'>
              <span><a href="javascript:void(0)">*</a>注册人类型：</span>
              <el-radio v-model="is_auto" label="false" :disabled="disTable" size="mini" @change="isAuto">经办人</el-radio>
              <el-radio v-model="is_auto" label="true" :disabled="disTable" size="mini" @change="isAuto">法定代表人</el-radio>
            </div>
            <el-form :model='ruleForm1' :rules='rules' ref='ruleForm1' class='ruleForm' label-width="150px" label-position='left' size="small">
              <el-form-item label='姓名：' prop='name'>
                <el-input v-model.trim='ruleForm1.name' style="width: 370px;" :class="{disTables: disTable}" :disabled="disTable" :maxlength="maxlength"></el-input>
              </el-form-item>
              <el-form-item label='身份证号：' prop='id_number'>
                <el-input v-model.trim='ruleForm1.id_number' style="width: 370px;" @blur="idNumber(ruleForm1.id_number)" :class="{disTables: disTable}" :disabled="disTable" :maxlength="maxlength"></el-input>
              </el-form-item>
              <el-form-item label='' class="span_banks" prop='phone' label-width="0" v-if='disablePhone === false'>
                <p style="padding-right: 40px;">手机号：</p>
                <span class="span_bank">*</span>
                <el-input v-model.trim='ruleForm1.person_info.phone' @blur="phoneEmail(0)" style="width: 370px;" :class="[{disTables: disTable}, {disTables: disablePhone}]" :disabled="disTable || disablePhone" :maxlength="maxlength - 21"></el-input>
                <div class="error_title" v-if="errorPhone">
                  {{error.titlePhone}}
                </div>
                <div class="region_prompt1" v-if="eId !== 1 && ruleForm1.person_info.phone !== ''">
                  您填入的手机号，将与邮箱号同时作为您的登录帐号，并接收平台通知信息。
                </div>
              </el-form-item>
              <el-form-item label='' class="span_banks" prop='phone' label-width="0" v-else>
                <p style="padding-right: 40px;">手机号：</p>
                <span class="span_bank">*</span>
                <el-input v-model.trim='ruleForm1.person_info.phone' style="width: 370px;" class="disTables" disabled></el-input>
              </el-form-item>
              <el-form-item prop='v_code' label-width="0" class='verificationCode span_banks' v-if='eId !== 1 && disablePhone === false'>
                <p style="padding-right: 11px;">获取验证码：</p>
                <span class="span_bank">*</span>
                <el-input v-model.trim='ruleForm1.v_code' style="width: 150px;" :class="{disTables: disTable}" :disabled="disTable" class='verification'></el-input>
                <div class="button_class_list" size='mini' @click='postVerific(0)' :disabled='isDisabled' v-if='eId !== 1'>{{buttonName}}</div>
                <div class="error_title" v-if="vCode">
                  请输入验证码
                </div>
              </el-form-item>
              <el-form-item class="span_banks" prop='email' label-width="0" v-if='disableEmail === false'>
                <p style="padding-right: 53px;">邮箱：</p>
                <span class="span_bank">*</span>
                <el-input v-model.trim='ruleForm1.person_info.email' @blur="phoneEmail(1)" style="width: 370px;" :class="[{disTables: disTable}, {disTables: disableEmail}]" :disabled="disTable || disableEmail"></el-input>
                <div class="error_title" v-if="errorEmail">
                  {{error.titleEmail}}
                </div>
                <div class="region_prompt1" v-if="eId !== 1 && ruleForm1.person_info.email !== ''">
                  您填入的邮箱号，将与手机号同时作为您的登录帐号，并接收平台通知信息。
                </div>
              </el-form-item>
              <el-form-item label='' class="span_banks" prop='phone' label-width="0" v-else>
                <p style="padding-right: 53px;">邮箱：</p>
                <span class="span_bank">*</span>
                <el-input v-model.trim='ruleForm1.person_info.email' style="width: 370px;" class="disTables" disabled></el-input>
              </el-form-item>
              <el-form-item prop='v_code' label-width="0" class='verificationCode span_banks' v-if='eId !== 1 && disableEmail === false'>
                <p style="padding-right: 11px;">获取验证码：</p>
                <span class="span_bank">*</span>
                <el-input v-model.trim='ruleForm1.v_code' style="width: 150px;" :class="{disTables: disTable}" :disabled="disTable" class='verification'></el-input>
                <div class="button_class_list" size='mini' @click='postVerific(1)' :disabled='isDisabled' v-if='eId !== 1'>{{buttonName}}</div>
                <div class="error_title" v-if="vCode">
                  请输入验证码
                </div>
              </el-form-item>
              <el-form-item class='img_list' label-width="0" v-if='eId !== 1'>
                <ul>
                  <li v-for='(item, index) in imgList' :key='index'>
                    <p class='img_title'><span>*</span>{{imgTitle[index]}}</p>
                    <div>
                      <div class='uploaadBtns uploaadBtn'>
                        <span class="span" v-if="item.img === ''">
                          <img :src="item.noimg" alt="">
                        </span>
                        <input class="input" type='file' v-if="item.img === ''" :id="item.title" @change='uploaadFile($event, index)'>
                        <div class="img_big" v-if="item.img !== ''">
                          <img :src='$root_url() + item.img' alt='' v-if="item.img !== ''">
                          <span class="hover_img" v-if="item.img !== ''">
                            <span class="ins" @click="bigImg(item.img)"><i class="el-icon-zoom-in"></i></span>
                            <span class="del"><i class="el-icon-upload2"><input type='file' :id="item.title" @change='uploaadFile($event, index)'></i></span>
                          </span>
                        </div>
                      </div>
                      <span class="tips-renzheng" v-if="item.img === ''">{{tips}}</span>
                    </div>
                  </li>
                  <li v-if='depute'>
                    <p class='img_title'><span>*</span>授权委托书</p>
                    <div>
                      <div class='uploaadBtns uploaadBtn'>
                        <span class="span" v-if="fileList.img === ''">
                          <img :src="fileList.noimg" alt="">
                        </span>
                        <input class="input" type='file' v-if="fileList.img === ''" :id="fileList.title" @change='uploaadFile($event, 4)'>
                        <div class="img_big" v-if="fileList.img !== ''">
                          <img :src='$root_url() + fileList.img' alt='' v-if="fileList.img !== '' && fileData === false">
                          <img src='../../../../static/img/shouquan.png' alt='' v-if="fileList.img !== '' && fileData">
                          <span class="hover_img" v-if="fileList.img !== ''">
                            <span class="ins" @click="bigImg(fileList.img)"><i class="el-icon-zoom-in"></i></span>
                            <span class="del"><i class="el-icon-upload2"><input type='file' :id="fileList.title" @change='uploaadFile($event, 4)'></i></span>
                          </span>
                        </div>
                      </div>
                      <span class="tips-renzheng" v-if="fileList.img === ''">请上传授权委托书</span>
                    </div>
                    <p class="pos_file" v-if="fileList.img !== '' && fileData">
                      <a :href="$root_url() + auth_certificate" download="test.png" title="点击下载">{{fileDataName}}</a>
                    </p>
                  </li>
                </ul>
                <p class="sapn_poa" v-if="depute">注：请上传授权委托书（法人代表签字且加盖公司公章）<a :href="$root_url() + '/nsdoc/ninstar_financial/poa.docx'">下载授权书</a></p>
              </el-form-item>
              <el-form-item class='img_list' label-width="0" v-if='eId === 1'>
                <ul>
                  <li>
                    <p class='img_title'>手持身份证国徽面照</p>
                    <div class='uploaadBtn' v-if="auth_pic.legal_person_id_3 === ''">
                      <span alt=""><img src="../../../../static/img/手持国徽面.png" alt=""></span>
                      <!-- <span v-if="auth_pic.legal_person_id_3 !== 'undefined'"><img :src="$root_url() + auth_pic.legal_person_id_3" @click="bigImg(auth_pic.legal_person_id_3)" alt=""></span> -->
                    </div>
                    <div class="imgs" v-if="auth_pic.legal_person_id_3">
                      <div>
                        <img :src="$root_url() + auth_pic.legal_person_id_3" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_pic.legal_person_id_3)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <p class='img_title'>手持身份证人像面照</p>
                    <div class='uploaadBtn' v-if="auth_pic.legal_person_id_4 === ''">
                      <span alt=""><img src="../../../../static/img/手持信息面.png" alt=""></span>
                      <!-- <span v-if="auth_pic.legal_person_id_4 !== 'undefined'"><img :src="$root_url() + auth_pic.legal_person_id_4" @click="bigImg(auth_pic.legal_person_id_4)" alt=""></span> -->
                    </div>
                    <div class="imgs" v-if="auth_pic.legal_person_id_4">
                      <div>
                        <img :src="$root_url() + auth_pic.legal_person_id_4" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_pic.legal_person_id_4)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <p class='img_title'>身份证国徽面照</p>
                    <div class='uploaadBtn' v-if="auth_pic.legal_person_id_1 === ''">
                      <span alt=""><img src="../../../../static/img/国徽面.png" alt=""></span>
                      <!-- <span v-if="auth_pic.legal_person_id_1 !== 'undefined'"><img :src="$root_url() + auth_pic.legal_person_id_1" @click="bigImg(auth_pic.legal_person_id_1)" alt=""></span> -->
                    </div>
                    <div class="imgs" v-if="auth_pic.legal_person_id_1">
                      <div>
                        <img :src="$root_url() + auth_pic.legal_person_id_1" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_pic.legal_person_id_1)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <p class='img_title'>身份证人像面照</p>
                    <div class='uploaadBtn' v-if="auth_pic.legal_person_id_2 === ''">
                      <span alt=""><img src="../../../../static/img/身份证信息面.png" alt=""></span>
                      <!-- <span v-if="auth_pic.legal_person_id_2 !== 'undefined'"><img :src="$root_url() + auth_pic.legal_person_id_2" @click="bigImg(auth_pic.legal_person_id_2)" alt=""></span> -->
                    </div>
                    <div class="imgs" v-if="auth_pic.legal_person_id_2">
                      <div>
                        <img :src="$root_url() + auth_pic.legal_person_id_2" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_pic.legal_person_id_2)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li v-if="auth_certificate">
                    <p class='img_title'>授权委托书</p>
                    <div class='uploaadBtn' v-if="auth_certificate === ''">
                      <span alt=""><img src="../../../../static/img/shouquan.png" alt=""></span>
                      <!-- <span v-if="auth_certificate !== ''"><img :src="$root_url() + auth_certificate" alt="" @click="bigImg(auth_certificate)"></span> -->
                    </div>
                    <div class="imgs" v-if="auth_certificate">
                      <div v-if="fileData === false">
                        <img :src="$root_url() + auth_certificate" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(auth_certificate)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                      <div v-if="fileData">
                        <p style="padding-left:10px;">
                          <a :href="$root_url() + auth_certificate" download="test.png" title="点击下载">{{fileDataName}}</a>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
          <p v-if='eId !== 1'>
            <el-checkbox v-model="checked">同意</el-checkbox>
            <span style="text-decoration: underline;color:#eb6100;cursor:pointer;font-size:14px;" @click="authenticity">真实性声明</span>
            <span v-if='authenticitys === 1' style="font-size:12px;color:#999;">本公司郑重承诺，本公司向九星平台报送的企业注册材料不存在虚假记载、误导性信息，本公司对其真实性、准确性负责。因虚假记载、误导性信息而引起的一切法律责任，均由本公司承担。</span>
          </p>
        </div>
        <div class="basicsList">
          <div class="class_down">
            <div class="sel" @click="legalPersonForm" v-if='eId !== 1'>提交</div>
            <div class="reset_Form" @click="resetForm">返回</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
      // 提示信息
      tips: '',
      id: '',
      title: '注册人信息',
      // 下一步
      nextData: 0,
      maxlength: 32,
      isDisabled: false,
      time: 60,
      buttonName: '获取验证码',
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'change' }
        ],
        id_number: [
          { required: true, message: '请填写身份证号码', trigger: 'change' }
        ]
      },
      disTable: false,
      // 企业id
      businessId: '',
      eId: '',
      // 审核失败修改id
      putId: '',
      change_apply: '',
      company_info: '',
      legal_person: '',
      role: '',
      imgTitle: ['手持身份证国徽面照', '手持身份证人像面照', '身份证国徽面照', '身份证人像面照'],
      imgList: [
        { title: 'legal_person_id_3', img: '', noimg: 'static/img/手持国徽面.png' },
        { title: 'legal_person_id_4', img: '', noimg: 'static/img/手持信息面.png' },
        { title: 'legal_person_id_1', img: '', noimg: 'static/img/国徽面.png' },
        { title: 'legal_person_id_2', img: '', noimg: 'static/img/身份证信息面.png' }
      ],
      tipsShow: ['请上传手持身份证国徽面照', '请上传手持身份证人像面照', '请上传身份证国徽面照', '请上传身份证人像面照'],
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
      // 授权委托书
      auth_certificate: '',
      ruleForm1: {
        name: '',
        id_number: '',
        v_code: '',
        person_info: {
          phone: '',
          email: ''
        }
      },
      legal_person_id: '',
      is_auto: 'false',
      numberShow: false,
      id_numbers: '',
      verify: '',
      legalPersonId: '',
      error: {
        titlePhone: '请输入手机号码',
        titleEmail: '请输入邮箱地址'
      },
      disablePhone: false,
      errorPhone: false,
      disableEmail: false,
      errorEmail: false,
      // 委托书
      depute: true,
      vCode: false,
      is_legal_person: '',
      // 点击图片放大
      imgVisible: false,
      imgSmallBig: '',
      // 身份证号已有id
      person_id: '',
      fileData: false,
      fileList: { title: 'auth_certificate', img: '', noimg: 'static/img/shouquan.png' },
      fileDataName: ''
    }
  },
  mounted () {
    var that = this
    that.businessId = localStorage.id
    that.eId = Number(that.$route.query.eId)
    that.role = localStorage.role
    // 查看详情
    if (that.eId) {
      that.$ajax.get(`/api/auth/` + localStorage.identifier).then(res => {
        if (res.data.person) {
          that.legalPersonId = res.data.person
          that.$ajax.get(`/api/person/` + res.data.person + '?login=1').then(res => {
            if (res.data.is_legal_person === false) {
              that.depute = true
            } else {
              that.depute = false
            }
            that.is_legal_person = res.data.is_legal_person
            that.auth_pic = res.data.auth_pic
            that.ruleForm1.name = res.data.name
            that.ruleForm1.id_number = res.data.id_number
            that.id_numbers = res.data.id_number
            that.auth_certificate = res.data.auth_book
            that.fileList.img = res.data.auth_book
            that.imgList[0].img = res.data.auth_pic.legal_person_id_3
            that.imgList[1].img = res.data.auth_pic.legal_person_id_4
            that.imgList[2].img = res.data.auth_pic.legal_person_id_1
            that.imgList[3].img = res.data.auth_pic.legal_person_id_2
            if (res.data.auth_book) {
              let flieArr1 = res.data.auth_book.split('.')
              let suffix1 = flieArr1[flieArr1.length - 1]
              if (suffix1 === 'docx' || suffix1 === 'doc' || suffix1 === 'pdf') {
                that.fileData = true
              }
              let str1 = res.data.auth_book
              let index1 = res.data.auth_book.lastIndexOf("/")
              that.fileDataName = str1.substring(index1 + 1, str1.length)
            }
          })
          // .catch(err => {
          //   that.$message.error(err.response.data.err_msg)
          // })
        }
      })  
      that.eId = Number(that.$route.query.eId)
      that.$ajax.get('/api/company/status/').then(res => {
        that.company_info = res.data.company_info
        that.legal_person = res.data.legal_person
        that.verify = Number(res.data.person_verified)
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
      if (that.eId === 2) {
        that.disTable = false
      } else {
        that.disTable = true
      }
    } else {
      if (that.is_auto === 'false') {
        // that.imgTitle = ['手持身份证国徽面照', '手持身份证人像面照', '身份证国徽面照', '身份证人像面照', '授权委托书']
        // that.tipsShow = ['请上传手持身份证国徽面照', '请上传手持身份证人像面照', '请上传身份证国徽面照', '请上传身份证人像面照', '请上传授权委托书']
        // that.imgList = [
        //   { title: 'legal_person_id_3', img: '', noimg: 'static/img/手持国徽面.png' },
        //   { title: 'legal_person_id_4', img: '', noimg: 'static/img/手持信息面.png' },
        //   { title: 'legal_person_id_1', img: '', noimg: 'static/img/国徽面.png' },
        //   { title: 'legal_person_id_2', img: '', noimg: 'static/img/身份证信息面.png' },
        //   { title: 'auth_certificate', img: '', noimg: 'static/img/shouquan.png' }
        // ]
      } else {
        // that.imgTitle = ['手持身份证国徽面照', '手持身份证人像面照', '身份证国徽面照', '身份证人像面照']
        // that.tipsShow = ['请上传手持身份证国徽面照', '请上传手持身份证人像面照', '请上传身份证国徽面照', '请上传身份证人像面照']
        // that.imgList = [
        //   { title: 'legal_person_id_3', img: '', noimg: 'static/img/手持国徽面.png' },
        //   { title: 'legal_person_id_4', img: '', noimg: 'static/img/手持信息面.png' },
        //   { title: 'legal_person_id_1', img: '', noimg: 'static/img/国徽面.png' },
        //   { title: 'legal_person_id_2', img: '', noimg: 'static/img/身份证信息面.png' }
        // ]
      }
    }
    that.$ajax.get('/api/company/status/').then(res => {
      that.change_apply = res.data.change_apply
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    that.$ajax.get('/api/auth/login_name/').then(res => {
      that.ruleForm1.person_info.phone = res.data.phone
      that.ruleForm1.person_info.email = res.data.email
      if (res.data.phone) {
        that.disablePhone = true
      } else {
        that.disablePhone = false
      }
      if (res.data.email) {
        that.disableEmail = true
      } else {
        that.disableEmail = false
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
    // 获取验证码
    postVerific (i) {
      const that = this
      if (this.buttonName === '获取验证码') {
        if (i === 0) {
          if (this.ruleForm1.person_info.phone) {
            if (!(/^1[23456789]\d{9}$/.test(this.ruleForm1.person_info.phone))) {
              this.$message.error('请输入正确的手机号')
            } else {
              const loading = that.$loading({fullscreen: true, text: '验证码发送中。。。', background: 'rgba(0, 0, 24, 0.63)'})
              that.$ajax.get('/api/account_exists/?phone=' + this.ruleForm1.person_info.phone).then(res => {
                if (res.data.status === true) {
                  that.$message.error('此手机号已注册')
                  loading.close()
                } else {
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
                  this.$ajax.post('/api/verify_code/', {phone: this.ruleForm1.person_info.phone, operation_type: 'login_name'}).then(res => {
                    loading.close()
                    this.$message.success('验证码已发送至：' + '   ' + this.ruleForm1.person_info.phone)
                  }).catch(err => {
                    this.$message.error(err.response.data.err_msg)
                  })
                }
              })
            }
          } else {
            this.$message.error('请输入手机号')
          }
        } else if (i === 1) {
          if (this.ruleForm1.person_info.email) {
            if (!(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(this.ruleForm1.person_info.email))) {
              this.$message.error('请输入正确的邮箱地址')
            } else {
              const loading = that.$loading({fullscreen: true, text: '验证码发送中。。。', background: 'rgba(0, 0, 24, 0.63)'})
              that.$ajax.get('/api/account_exists/?email=' + this.ruleForm1.person_info.email).then(res => {
                if (res.data.status === true) {
                  that.$message.error('此邮箱号已注册')
                  loading.close()
                } else {
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
                  that.$ajax.post('/api/email/v2/', {email: this.ruleForm1.person_info.email, operation_type: 'login_name'}).then(res => {
                    loading.close()
                    this.$message.success('验证码已发送至：' + '   ' + this.ruleForm1.person_info.email)
                  }).catch(err => {
                    that.$message.error(err.response.data.err_msg)
                  })
                }
              })
            }
          } else {
            this.$message.error('请输入邮箱地址')
          }
        }
      }
    },
    // 经办人或者法人
    isAuto () {
      const that = this
      if (that.is_auto === 'false') {
        that.depute = true
        // that.imgTitle = ['手持身份证国徽面照', '手持身份证人像面照', '身份证国徽面照', '身份证人像面照', '授权委托书']
        // that.tipsShow = ['请上传手持身份证国徽面照', '请上传手持身份证人像面照', '请上传身份证国徽面照', '请上传身份证人像面照', '请上传授权委托书']
        that.imgList = [
          { title: 'legal_person_id_3', img: '', noimg: 'static/img/手持国徽面.png' },
          { title: 'legal_person_id_4', img: '', noimg: 'static/img/手持信息面.png' },
          { title: 'legal_person_id_1', img: '', noimg: 'static/img/国徽面.png' },
          { title: 'legal_person_id_2', img: '', noimg: 'static/img/身份证信息面.png' },
          // { title: 'auth_certificate', img: '', noimg: 'static/img/shouquan.png' }
        ]
        that.auth_pic.legal_person_id_3 = ''
        that.auth_pic.legal_person_id_4 = ''
        that.auth_pic.legal_person_id_1 = ''
        that.auth_pic.legal_person_id_2 = ''
        for (let i = 0; i < that.imgList.length; i++) {
          let file = document.getElementById(that.imgList[i].title)
          if (file) {
            file.value = ''
          }
        }
      } else {
        that.depute = false
        that.auth_certificate = ''
        // that.imgTitle = ['手持身份证国徽面照', '手持身份证人像面照', '身份证国徽面照', '身份证人像面照']
        // that.tipsShow = ['请上传手持身份证国徽面照', '请上传手持身份证人像面照', '请上传身份证国徽面照', '请上传身份证人像面照']
        that.imgList = [
          { title: 'legal_person_id_3', img: '', noimg: 'static/img/手持国徽面.png' },
          { title: 'legal_person_id_4', img: '', noimg: 'static/img/手持信息面.png' },
          { title: 'legal_person_id_1', img: '', noimg: 'static/img/国徽面.png' },
          { title: 'legal_person_id_2', img: '', noimg: 'static/img/身份证信息面.png' }
        ]
        that.auth_pic.legal_person_id_3 = ''
        that.auth_pic.legal_person_id_4 = ''
        that.auth_pic.legal_person_id_1 = ''
        that.auth_pic.legal_person_id_2 = ''
        for (let i = 0; i < that.imgList.length; i++) {
          let file = document.getElementById(that.imgList[i].title)
          if (file) {
            file.value = ''
          }
        }
      }
    },
    // 验证身份证号码
    idNumber (item) {
      const that = this
      that.ruleForm1.id_number = item.toUpperCase()
      if (that.ruleForm1.id_number !== '') {
        if (that.ruleForm1.id_number !== that.id_numbers) {
          if (that.eId !== 1) {
            that.$ajax.get('/api/person/?id_number=' + item + '&login=1').then(res => {
              if (res.data.results.length > 0) {
                that.numberShow = true
                that.person_id = res.data.results[0].id
              } else {
                that.numberShow = false
              }
            })
          }
        }
      }
    },
    // 取消
    handleClose () {
      const that = this
      that.dialogVisible = false
      that.imgVisible = false
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
    // 真实性说明
    authenticity () {
      if (this.authenticitys === 0) {
        this.authenticitys = 1
      } else {
        this.authenticitys = 0
      }
    },
    // 身份证图片
    uploaadFile ($event, index) {
      var that = this
      const isJPG = $event.target.files[0].type === 'image/jpg' || $event.target.files[0].type === 'image/png' || $event.target.files[0].type === 'image/jpeg'
      const isLt2M = $event.target.files[0].size < 5 * 1024 * 1024
      if (index !== 4) {
        if (!isJPG) {
          this.$message.error('只能是 JPG、JPEG或者PNG 格式!')
          return
        }
        if (!isLt2M) {
          this.$message.error('大小不能超过 5MB!')
          return
        }
      }
      if ($event.target.files[0]) {
        if (index === 4) {
          console.log($event.target.files[0])
          const isFile = $event.target.files[0].type === 'image/jpg' || $event.target.files[0].type === 'image/png' || $event.target.files[0].type === 'image/jpeg' || $event.target.files[0].type === 'application/msword' || $event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || $event.target.files[0].type === 'application/pdf'
          if (!isFile) {
            this.$message.error('只能是 JPG、JPEG、PNG、PDF、DOC或者DOCX 格式!')
            return
          }
          that.fileList.imgFile = $event.target.files[0]
          var fr = new FileReader()
          fr.onloadend = function (e) {
            that.fileList.img = e.target.result
            var fileUrl = new FormData()
            fileUrl.append('file', that.fileList.imgFile)
            fileUrl.append('function_module', 'company_info')
            that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
              that.fileList.img = res.data
              if (that.is_auto === 'false') {
                if ($event.target.files[0].type !== 'image/jpg' && $event.target.files[0].type !== 'image/png' && $event.target.files[0].type !== 'image/jpeg') {
                  that.fileDataName = $event.target.files[0].name
                  that.fileData = true
                } else {
                  that.fileData = false
                }
                that.auth_certificate = that.fileList.img
              }
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }
          fr.readAsDataURL($event.target.files[0])
        } else {
          that.imgList[index].imgFile = $event.target.files[0]
          var fr = new FileReader()
          fr.onloadend = function (e) {
            that.imgList[index].img = e.target.result
            var fileUrl = new FormData()
            fileUrl.append('file', that.imgList[index].imgFile)
            fileUrl.append('function_module', 'company_info')
            that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
              that.imgList[index].img = res.data
              that.auth_pic.legal_person_id_3 = that.imgList[0].img
              that.auth_pic.legal_person_id_4 = that.imgList[1].img
              that.auth_pic.legal_person_id_1 = that.imgList[2].img
              that.auth_pic.legal_person_id_2 = that.imgList[3].img
              // if (that.is_auto === 'false') {
              //   if ($event.target.files[0].type !== 'image/jpg' && $event.target.files[0].type !== 'image/png' && $event.target.files[0].type !== 'image/jpeg') {
              //     console.log(1)
              //     that.fileData = true
              //   }
              //   that.auth_certificate = that.imgList[4].img
              // }
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }
          fr.readAsDataURL($event.target.files[0])
        }
      }
    },
    // 验证邮箱跟手机号
    phoneEmail (i) {
      const that = this
      if (i === 0) {
        if (that.ruleForm1.person_info.phone === '') {
          that.errorPhone = true
          that.error.titlePhone = '请输入手机号码'
        } else {
          if (!(/^1[23456789]\d{9}$/.test(that.ruleForm1.person_info.phone))) {
            that.errorPhone = true
            that.error.titlePhone = '请输入正确的手机号码'
          } else {
            that.errorPhone = false
          }
        }
      } else {
        if (that.ruleForm1.person_info.email === '') {
          that.errorEmail = true
          that.error.titleEmail = '请输入邮箱地址'
        } else {
          if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(that.ruleForm1.person_info.email))) {
            that.errorEmail = true
            that.error.titleEmail = '请输入正确的邮箱地址'
          } else {
            that.errorEmail = false
          }
        }
      }
    },
    // 提交
    legalPersonForm () {
      var that = this
      var flag = true
      let alength = that.imgList.length
      for (var i = 0; i < Number(alength); i++) {
        if (that.imgList[i].img === '') {
          that.tips = '身份证信息未上传'
          flag = false
          break
        }
      }
      that.$refs['ruleForm1'].validate(valid => {
        if (that.ruleForm1.person_info.phone === '') {
          that.errorPhone = true
          that.error.titlePhone = '请输入手机号码'
        } else {
          if (!(/^1[23456789]\d{9}$/.test(that.ruleForm1.person_info.phone))) {
            that.errorPhone = true
            that.error.titlePhone = '请输入正确的手机号码'
          } else {
            that.errorPhone = false
            if (that.ruleForm1.person_info.email === '') {
              that.errorEmail = true
              that.error.titleEmail = '请输入邮箱地址'
            } else {
              if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(that.ruleForm1.person_info.email))) {
                that.errorEmail = true
                that.error.titleEmail = '请输入正确的邮箱地址'
              } else {
                that.errorEmail = false
                if (valid && flag) {
                  that.tips = ''
                  if (that.checked === true) {
                    if (that.eId) {
                      if (that.eId === 2) {
                        that.isLegalPersonEid()
                      }
                    } else {
                      if (that.disableEmail === false) {
                        if (that.ruleForm1.v_code !== '') {
                          that.$ajax.patch('/api/auth/login_name/', {email: that.ruleForm1.person_info.email, user_key: that.ruleForm1.v_code}).then(res => {
                            if (res) {
                              that.isLegalPersonTrue()
                            } else {
                              that.$message.error('请输入正确的验证码')
                            }
                          }).catch(err => {
                            that.$message.error(err.response.data.err_msg)
                          })
                        } else {
                          that.vCode = true
                        }
                      } else if (that.disablePhone === false) {
                        if (that.ruleForm1.v_code !== '') {
                          that.$ajax.patch('/api/auth/login_name/', {phone: that.ruleForm1.person_info.phone, user_key: that.ruleForm1.v_code}).then(res => {
                            if (res) {
                              that.isLegalPersonTrue()
                            } else {
                              that.$message.error('请输入正确的验证码')
                            }
                          }).catch(err => {
                            that.$message.error(err.response.data.err_msg)
                          })
                        } else {
                          that.vCode = true
                        }
                      } else {
                        that.isLegalPersonTrue()
                      }
                    }
                  } else {
                    that.$message.error('请勾选真实性声明')
                  }
                }
              }
            }
          }
        }
      })
    },
    // eId 经办人 + 法人
    isLegalPersonEid () {
      const that = this
      // 经办人
      if (that.is_legal_person === false) {
        // 审核未通过
        if (that.verify === 3) {
          if (that.disableEmail === false) {
            if (that.ruleForm1.v_code !== '') {
              that.$ajax.patch('/api/auth/login_name/', {email: that.ruleForm1.person_info.email, user_key: that.ruleForm1.v_code}).then(res => {
                if (res) {
                  that.puilcApi()
                } else {
                  that.$message.error('请输入正确的验证码')
                }
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            } else {
              that.vCode = true
            }
          } else if (that.disablePhone === false) {
            if (that.ruleForm1.v_code !== '') {
              that.$ajax.patch('/api/auth/login_name/', {phone: that.ruleForm1.person_info.phone, user_key: that.ruleForm1.v_code}).then(res => {
                if (res) {
                  that.puilcApi()
                } else {
                  that.$message.error('请输入正确的验证码')
                }
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            } else {
              that.vCode = true
            }
          } else {
            that.puilcApi()
          }
          that.$ajax.put('/api/bms/verify/record/rewrite/', {module: 1}).then(res => {
          })
        } else {
          if (that.disableEmail === false) {
            if (that.ruleForm1.v_code !== '') {
              that.$ajax.patch('/api/auth/login_name/', {email: that.ruleForm1.person_info.email, user_key: that.ruleForm1.v_code}).then(res => {
                if (res) {
                  that.puilcApi()
                } else {
                  that.$message.error('请输入正确的验证码')
                }
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            } else {
              that.vCode = true
            }
          } else if (that.disablePhone === false) {
            if (that.ruleForm1.v_code !== '') {
              that.$ajax.patch('/api/auth/login_name/', {phone: that.ruleForm1.person_info.phone, user_key: that.ruleForm1.v_code}).then(res => {
                if (res) {
                  that.puilcApi()
                } else {
                  that.$message.error('请输入正确的验证码')
                }
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            } else {
              that.vCode = true
            }
          } else {
            that.puilcApi()
          }
        }
      } else {
        // 法人
        // 审核未通过
        if (that.verify === 3) {
            if (that.disableEmail === false) {
              if (that.ruleForm1.v_code !== '') {
                that.$ajax.patch('/api/auth/login_name/', {email: that.ruleForm1.person_info.email, user_key: that.ruleForm1.v_code}).then(res => {
                  if (res) {
                    that.pulicLegalPerson()
                  } else {
                    that.$message.error('请输入正确的验证码')
                  }
                }).catch(err => {
                  that.$message.error(err.response.data.err_msg)
                })
              } else {
                that.vCode = true
              }
            } else if (that.disablePhone === false) {
              if (that.ruleForm1.v_code !== '') {
                that.$ajax.patch('/api/auth/login_name/', {phone: that.ruleForm1.person_info.phone, user_key: that.ruleForm1.v_code}).then(res => {
                  if (res) {
                    that.pulicLegalPerson()
                  } else {
                    that.$message.error('请输入正确的验证码')
                  }
                }).catch(err => {
                  that.$message.error(err.response.data.err_msg)
                })
              } else {
                that.vCode = true
              }
            } else {
              that.pulicLegalPerson()
            }
          that.$ajax.put('/api/bms/verify/record/rewrite/', {module: 1}).then(res => {
          })
        } else {
            if (that.disableEmail === false) {
              if (that.ruleForm1.v_code !== '') {
                that.$ajax.patch('/api/auth/login_name/', {email: that.ruleForm1.person_info.email, user_key: that.ruleForm1.v_code}).then(res => {
                  if (res) {
                    that.pulicLegalPerson()
                  } else {
                    that.$message.error('请输入正确的验证码')
                  }
                }).catch(err => {
                  that.$message.error(err.response.data.err_msg)
                })
              } else {
                that.vCode = true
              }
            } else if (that.disablePhone === false) {
              if (that.ruleForm1.v_code !== '') {
                that.$ajax.patch('/api/auth/login_name/', {phone: that.ruleForm1.person_info.phone, user_key: that.ruleForm1.v_code}).then(res => {
                  if (res) {
                    that.pulicLegalPerson()
                  } else {
                    that.$message.error('请输入正确的验证码')
                  }
                }).catch(err => {
                  that.$message.error(err.response.data.err_msg)
                })
              } else {
                that.vCode = true
              }
            } else {
              that.pulicLegalPerson()
            }
        }
      }
    },
    // 第一次：经办人 + 法人
    isLegalPersonTrue () {
      const that = this
      // 经办人
      if (that.is_auto === 'false') {
        if (that.fileList.img) {
          that.puilcApi()
        }
      } else if (that.is_auto === 'true') {
        // 法人
        that.pulicLegalPerson()
      }
    },
    // 经办人
    puilcApi () {
      const that = this
      that.$ajax.post('/api/person/', { auth_certificate: that.auth_certificate, contract_person: true, auth_pic: that.auth_pic, name: that.ruleForm1.name, id_number: that.ruleForm1.id_number}).then(res => {
        that.$router.push('/setting?signed=1')
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 法人
    pulicLegalPerson () {
      const that = this
      that.$ajax.post('/api/person/', { auth_certificate: that.auth_certificate, auth_pic: that.auth_pic, name: that.ruleForm1.name, id_number: that.ruleForm1.id_number, contract_person: true, legal_person: true}).then(res => {
        that.$router.push('/setting?signed=1')
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
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
<style lang="less" scoped>
.financeAdmittanceFirst {
  min-height: 100%;
  background: #fff;
  padding: 40px 0;
  margin: 20px;
  box-sizing: border-box;
  .info-enter {
    position: relative;
    width: 100%;
    padding: 0 30px 0 40px;
    .top_name {
      width: 100%;
      h3 {
        font-size:18px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
    .top_name1 {
      width: 100%;
      h3 {
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        padding-top: 39px;
      }
      p {
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        padding-top: 11px;
      }
    }
    .top_title {
      background:#ffffff;
      border:1px solid #c3cad9;
      border-radius:4px;
      width:100%;
      height:124px;
      text-align: left;
      padding: 0 20px;
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
            top: 9px;
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
      width:100%;
      height:auto;
      // margin-top: 35px;
      margin: 39px 0 0;
      .radio_list {
        margin: 0 0 20px;
        span {
          display: inline-block;
          width: 145px;
          a {
            color: #f56c6c;
            text-decoration: none;
            display: inline-block;
            padding-right: 4px;
          }
          font-size: 14px;
          color: #606266;
        }
        .el-radio__input.is-checked+.el-radio__label {
          color: #eb6100;
        }
        .el-radio__input.is-checked .el-radio__inner {
          border-color: #eb6100;
          background: #eb6100;
        }
      }
      .right_top1 {
        padding-bottom: 10px;
        h3 {
          font-family:Arial-BoldMT;
          font-size:18px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          span {
            display: inline-block;
            font-family:ArialMT;
            font-size:12px;
            color:#999999;
            letter-spacing:0;
            text-align:left;
            padding-left: 23px;
          }
        }
      }
      .right_top {
        padding-bottom: 49px;
        h3 {
          font-family:Arial-BoldMT;
          font-size:18px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          span {
            display: inline-block;
            font-family:ArialMT;
            font-size:12px;
            color:#999999;
            letter-spacing:0;
            text-align:left;
            padding-left: 23px;
          }
        }
      }
      .basicsList {
        .basics_span {
          font-size: 12px;
          color: #B1BEC8;
        }
        .demo-ruleForm {
          border-bottom: 1px solid #edf2f5;
          margin-bottom: 50px;
        }
        .bank_prompt {
          background:#f4f9ff;
          border:1px solid #42bffe;
          display: inline-block;
          width: auto;
          height: 30px;
          line-height: 30px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#42bffe;
          letter-spacing:0;
          text-align:left;
          padding: 0 10px;
          margin-left: 10px;
        }
        .region_prompt {
          display: inline-block;
          width: 210px;
          height: 30px;
          border: 1px solid rgba(73, 192, 236, 1);
          line-height: 30px;
          margin-left: 10px;
          color: #B1BEC8;
          background: rgba(244, 251, 255, 1);
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#42bffe;
          letter-spacing:0;
          text-align:left;
          padding-left: 10px;
        }
        .region_prompts {
          display: inline-block;
          width: 300px;
          height: 50px;
          line-height: 20px;
          padding-top: 5px;
          margin-left: 20px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#42bffe;
          letter-spacing:0;
          text-align:left;
          padding-left: 20px;
          background:#f4f9ff;
          border:1px solid #42bffe;
          span {
            color: red;
          }
        }
        .sub_reset {
          text-align: center;
          .el-button {
            margin-right: 100px;
            height: 30px;
            width: 90px;
            line-height: 5px;
          }
          .el-button--primary {
            background: rgba(235, 97, 0, 1);
            border: none;
          }
          .el-button--default {
            border: 1px solid rgba(235, 97, 0, 1);
            color: rgba(235, 97, 0, 1);
          }
          .buttton_list {
            height: 30px;
            width: 90px;
            line-height: 30px;
            border: 1px solid #eb6100;
            background: none;
            outline: none;
            color: #eb6100;
            border-radius: 5px;
          }
        }
        input {
          width: 370px;
          height: 30px;
          -webkit-appearance: none;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          line-height: 30px;
          outline: 0;
          padding: 0 15px;
        }
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
        .errors {
          select {
            border: 1px solid #f56c6c !important;
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
          .sapn_poa {
            padding-left: 167px;
            margin-bottom: 20px;
            a {
              font-size: 14px;
              font-weight: bold;
              text-decoration: underline;
              color: #eb6100;
              cursor: pointer;
            }
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
            height: auto;
            ul {
              display: flex;
              flex-direction: column;
              li {
                width: auto;
                height: auto;
                float: left;
                margin: 20px 0;
                display: flex;
                flex-direction: row;
                position: relative;
                p.img_title {
                  height: 20px;
                  text-align: left;
                  color: #606266;
                  width: 150px;
                  span {
                    color: #eb6100;
                    display: inline-block;
                    padding-right: 3px;
                  }
                }
                .tips-renzheng {
                  color: #f56c6c;
                  font-size: 12px;
                  display: inline-block;
                  padding-left: 20px;
                }
                .uploaadBtn {
                  position: relative;
                  width:166px;
                  height:127px;
                  // border: 1px dashed #bfbfbf;
                  margin: 20px 20px 0;
                  .span {
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
                  .input {
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
              }
              li:last-child {
                margin-bottom: 0;
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
                position: relative;
                cursor: pointer;
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
            .pos_file {
              position: absolute;
              left: 40%;
              top: 30px;
            }
          }
          .span_banks {
            position: relative;
            p {
              display: inline-block;
              padding-left: 10px;
              color: #606266;
            }
            .span_bank {
              position: absolute;
              left: 0;
              top: 0;
              color: #f56c6c;
            }
            div {
              margin-left: 40px;
              display: inline-block;
            }
            .city {
              margin-left: 200px;
              .province_city {
                width: 120px;
                text-align: center;
                background: none;
                -webkit-appearance: none;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: #606266;
                display: inline-block;
                font-size: inherit;
                line-height: 30px;
                outline: 0;
                padding: 0 15px;
              }
            }
            .span_banka {
              position: absolute;
              left: 0;
              top: 20px;
              color: #f56c6c;
            }
            .error_title {
              position: absolute;
              top: 38px;
              left: 12%;
              color: #f56c6c;
              font-size: 12px;
              line-height: 1;
            }
            .region_prompt1 {
              display: block;
              width: 440px;
              height: 30px;
              border: 1px solid rgba(73, 192, 236, 1);
              line-height: 30px;
              margin: 22px 0 0 151px;
              color: #B1BEC8;
              background: rgba(244, 251, 255, 1);
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#42bffe;
              letter-spacing:0;
              text-align:left;
              padding: 0 10px;
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
.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
  border-color: #dcdfe6;
}
.el-input.is-disabled .el-input__inner {
  color: #333;
  background: #fff;
  outline: none;
}
.financeAdmittanceFirst {
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
