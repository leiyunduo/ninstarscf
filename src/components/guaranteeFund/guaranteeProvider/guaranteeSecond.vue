<template>
<!-- 资料上传 -->
  <div class="guaranteeSecond">
    <div class="right">
      <div class="right_bottmo">
        <h3>企业资质认证</h3>
        <div class="error_no" v-if="errorItem">
        {{errorItem}}
        </div>
        <div class="basics">
          <div class="bas_look">
              <div class="uploaadBtn">
                <el-form v-if='eId !== 1' ref="form" :model="certificates" :rules='rules' label-width="250px" label-position='left' size="small">
                    <el-form-item class="span_banks" label-width="0">
                      <p>法人手持营业执照证件：</p>
                      <span class="span_bank">*</span>
                      <div class="upload_img">
                        <el-upload class="avatar-uploader" v-if="certificates.legal_person_business_license === ''" :action="upDateUrl"
                            :show-file-list="false"
                            :http-request="handleAvatarSuccessI"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="certificates.legal_person_business_license" :src="$root_url() + certificates.legal_person_business_license" class="avatar" alt="营业执照证件号">
                            <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/手持营业执照.png" alt="">
                        </el-upload>
                        <div class="img_big" v-if="certificates.legal_person_business_license">
                          <img :src='$root_url() + certificates.legal_person_business_license' alt='' v-if="certificates.legal_person_business_license !== ''">
                          <div class="hover_img" v-if="certificates.legal_person_business_license">
                            <span class="ins" @click="bigImg(certificates.legal_person_business_license)"><i class="el-icon-zoom-in"></i></span>
                            <div class="del">
                              <i class="el-icon-upload2">
                                <el-upload class="avatar-uploader" :action="upDateUrl"
                                  :show-file-list="false"
                                  :http-request="handleAvatarSuccessI"
                                  :before-upload="beforeAvatarUpload">
                                </el-upload>
                              </i>
                            </div>
                          </div>
                        </div>
                        <i v-if="certificates.legal_person_business_license" class="el-icon-close" @click="socialClose($event, -1)"></i>
                      </div>
                    </el-form-item>
                    <el-form-item class="span_banks" label-width="0">
                      <p>统一社会信用代码（营业执照）：</p>
                      <span class="span_bank">*</span>
                      <el-input v-model.trim="certificates.business_license_id" disabled style="width: 370px;"></el-input>
                      <div class="upload_img">
                        <el-upload class="avatar-uploader" v-if="certificates.business_license === ''" :action="upDateUrl"
                            :show-file-list="false"
                            :http-request="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="certificates.business_license" :src="$root_url() + certificates.business_license" class="avatar" alt="营业执照证件号">
                            <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/营业执照.png" alt="">
                        </el-upload>
                        <div class="img_big" v-if="certificates.business_license">
                          <img :src='$root_url() + certificates.business_license' alt='' v-if="certificates.business_license">
                          <div class="hover_img" v-if="certificates.business_license">
                            <span class="ins" @click="bigImg(certificates.business_license)"><i class="el-icon-zoom-in"></i></span>
                            <div class="del">
                              <i class="el-icon-upload2">
                                <el-upload class="avatar-uploader" :action="upDateUrl"
                                  :show-file-list="false"
                                  :http-request="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload">
                                </el-upload>
                              </i>
                            </div>
                          </div>
                        </div>
                        <i v-if="certificates.business_license" class="el-icon-close" @click="socialClose($event, 0)"></i>
                      </div>
                    </el-form-item>
                    <el-form-item label='社会保险登记证证件号：'>
                      <el-input v-model.trim="certificates.social_security_reg_id" :maxlength="maxlength" style="width: 370px;"></el-input>
                      <el-upload class="avatar-uploader" v-if="certificates.social_security_reg === ''" :action="upDateUrl"
                          :show-file-list="false"
                          :http-request="handleAvatarSuccessA"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="certificates.social_security_reg" :src="$root_url() + certificates.social_security_reg" class="avatar" alt="社会保障登记证">
                          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/社会保障登记证.png" alt="">
                      </el-upload>
                      <div class="img_big" v-if="certificates.social_security_reg">
                        <img :src='$root_url() + certificates.social_security_reg' alt='' v-if="certificates.social_security_reg">
                        <div class="hover_img" v-if="certificates.social_security_reg">
                          <span class="ins" @click="bigImg(certificates.social_security_reg)"><i class="el-icon-zoom-in"></i></span>
                          <div class="del">
                            <i class="el-icon-upload2">
                              <el-upload class="avatar-uploader" :action="upDateUrl"
                                :show-file-list="false"
                                :http-request="handleAvatarSuccessA"
                                :before-upload="beforeAvatarUpload">
                              </el-upload>
                            </i>
                          </div>
                        </div>
                      </div>
                      <i v-if="certificates.social_security_reg" class="el-icon-close" @click="socialClose($event, 2)"></i>
                    </el-form-item>
                    <el-form-item label='统计登记证证件号：'>
                      <el-input v-model.trim="certificates.statistical_reg_certificate_id" :maxlength="maxlength" style="width: 370px;"></el-input>
                      <el-upload class="avatar-uploader" v-if="certificates.statistical_reg_certificate === ''" :action="upDateUrl"
                          :show-file-list="false"
                          :http-request="handleAvatarSuccessB"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="certificates.statistical_reg_certificate" :src="$root_url() + certificates.statistical_reg_certificate" class="avatar" alt="统计登记证">
                          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/统计登记证.png" alt="">
                      </el-upload>
                      <div class="img_big" v-if="certificates.statistical_reg_certificate">
                        <img :src='$root_url() + certificates.statistical_reg_certificate' alt='' v-if="certificates.statistical_reg_certificate">
                        <div class="hover_img" v-if="certificates.statistical_reg_certificate">
                          <span class="ins" @click="bigImg(certificates.statistical_reg_certificate)"><i class="el-icon-zoom-in"></i></span>
                          <div class="del">
                            <i class="el-icon-upload2">
                              <el-upload class="avatar-uploader" :action="upDateUrl"
                                :show-file-list="false"
                                :http-request="handleAvatarSuccessB"
                                :before-upload="beforeAvatarUpload">
                              </el-upload>
                            </i>
                          </div>
                        </div>
                      </div>
                      <i v-if="certificates.statistical_reg_certificate" class="el-icon-close" @click="socialClose($event, 3)"></i>
                    </el-form-item>
                    <el-form-item label='银行开户许可证证件号：'>
                      <el-input v-model.trim="certificates.bank_permit_id" style="width: 370px;" :maxlength="maxlength"></el-input>
                      <el-upload class="avatar-uploader" v-if="certificates.bank_permit === ''" :action="upDateUrl"
                          :show-file-list="false"
                          :http-request="handleAvatarSuccessC"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="certificates.bank_permit" :src="$root_url() + certificates.bank_permit" class="avatar" alt="银行开户许可证">
                          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/银行开户许可证.png" alt="">
                      </el-upload>
                      <div class="img_big" v-if="certificates.bank_permit">
                        <img :src='$root_url() + certificates.bank_permit' alt='' v-if="certificates.bank_permit">
                        <div class="hover_img" v-if="certificates.bank_permit">
                          <span class="ins" @click="bigImg(certificates.bank_permit)"><i class="el-icon-zoom-in"></i></span>
                          <div class="del">
                            <i class="el-icon-upload2">
                              <el-upload class="avatar-uploader" :action="upDateUrl"
                                :show-file-list="false"
                                :http-request="handleAvatarSuccessC"
                                :before-upload="beforeAvatarUpload">
                              </el-upload>
                            </i>
                          </div>
                        </div>
                      </div>
                      <i v-if="certificates.bank_permit" class="el-icon-close" @click="socialClose($event, 5)"></i>
                    </el-form-item>
                    <el-form-item label='一般纳税人资格证：'>
                      <el-input v-model.trim="certificates.taxpayer_license_id" style="width: 370px;" :maxlength="maxlength"></el-input>
                      <el-upload class="avatar-uploader" v-if="certificates.taxpayer_license === ''" :action="upDateUrl"
                          :show-file-list="false"
                          :http-request="handleAvatarSuccessD"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="certificates.taxpayer_license" :src="$root_url() + certificates.taxpayer_license" class="avatar" alt="一般纳税人资格证">
                          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/一般纳税人资格证.png" alt="">
                      </el-upload>
                      <div class="img_big" v-if="certificates.taxpayer_license">
                        <img :src='$root_url() + certificates.taxpayer_license' alt='' v-if="certificates.taxpayer_license">
                        <div class="hover_img" v-if="certificates.taxpayer_license">
                          <span class="ins" @click="bigImg(certificates.taxpayer_license)"><i class="el-icon-zoom-in"></i></span>
                          <div class="del">
                            <i class="el-icon-upload2">
                              <el-upload class="avatar-uploader" :action="upDateUrl"
                                :show-file-list="false"
                                :http-request="handleAvatarSuccessD"
                                :before-upload="beforeAvatarUpload">
                              </el-upload>
                            </i>
                          </div>
                        </div>
                      </div>
                      <i v-if="certificates.taxpayer_license" class="el-icon-close" @click="socialClose($event, 6)"></i>
                    </el-form-item>
                </el-form>
                <el-form v-if='eId === 1' ref="form" :model="certificates" :rules='rules' label-width="250px" label-position='left' size="small">
                  <el-form-item label='法人手持营业执照证件：' v-if="certificates.legal_person_business_license">
                    <div class="imgs" v-if="certificates.legal_person_business_license">
                      <div>
                        <img :src="$root_url() + certificates.legal_person_business_license" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(certificates.legal_person_business_license)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/手持营业执照.png" alt="">
                  </el-form-item>
                  <el-form-item label="统一社会信用代码（营业执照）：" v-if="certificates.business_license">
                    <input v-model="certificates.business_license_id" :class="{disTables: disTable}" :disabled="disTable">
                    <div class="imgs" v-if="certificates.business_license">
                      <div>
                        <img :src="$root_url() + certificates.business_license" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(certificates.business_license)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/营业执照.png" alt="">
                  </el-form-item>
                  <el-form-item label='社会保险登记证证件号：' v-if="certificates.social_security_reg_id">
                    <input v-model="certificates.social_security_reg_id" :class="{disTables: disTable}" :disabled="disTable">
                    <div class="imgs" v-if="certificates.social_security_reg">
                      <div>
                        <img :src="$root_url() + certificates.social_security_reg" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(certificates.social_security_reg)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/社会保障登记证.png" alt="">
                  </el-form-item>
                  <el-form-item label='统计登记证证件号：' v-if="certificates.statistical_reg_certificate_id">
                    <input v-model="certificates.statistical_reg_certificate_id" :class="{disTables: disTable}" :disabled="disTable">
                    <div class="imgs" v-if="certificates.statistical_reg_certificate">
                      <div>
                        <img :src="$root_url() + certificates.statistical_reg_certificate" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(certificates.statistical_reg_certificate)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/统计登记证.png" alt="">
                  </el-form-item>
                  <el-form-item label='银行开户许可证证件号：' v-if="certificates.bank_permit_id">
                    <input v-model="certificates.bank_permit_id" :class="{disTables: disTable}" :disabled="disTable">
                    <div class="imgs" v-if="certificates.bank_permit">
                      <div>
                        <img :src="$root_url() + certificates.bank_permit" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(certificates.bank_permit)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/银行开户许可证.png" alt="">
                  </el-form-item>
                  <el-form-item label='一般纳税人资格证：' v-if="certificates.taxpayer_license_id">
                    <input v-model="certificates.taxpayer_license_id" :class="{disTables: disTable}" :disabled="disTable">
                    <div class="imgs" v-if="certificates.taxpayer_license">
                      <div>
                        <img :src="$root_url() + certificates.taxpayer_license" alt="">
                        <span class="hover_img">
                          <span class="ins" @click="bigImg(certificates.taxpayer_license)"><i class="el-icon-zoom-in"></i></span>
                        </span>
                      </div>
                    </div>
                    <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../../static/img/一般纳税人资格证.png" alt="">
                  </el-form-item>
                </el-form>
                <p style="margin-top:10px;margin-left:20px;" v-if='eId !== 1'>
                  <el-checkbox v-model="checked">同意</el-checkbox>
                  <span style="text-decoration: underline;color:#eb6100;cursor:pointer;font-size:14px;" @click="authenticity">真实性声明</span>
                  <span v-if='authenticitys === 1' style="font-size:12px;color:#999;">本公司郑重承诺，本公司向九星平台报送的企业注册材料不存在虚假记载、误导性信息，本公司对其真实性、准确性负责。因虚假记载、误导性信息而引起的一切法律责任，均由本公司承担。</span>
                </p>
                <div class="class_down">
                    <div class="sel" type="primary" @click="onSubmit" v-if='eId !== 1'>提交</div>
                    <div class="reset_Form" @click="resetForm">返回</div>
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
        <button type="primary" @click="okStep">确 定</button>
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
  name: 'guaranteeSecond',
  props: ['ruleFormFirst', 'area', 'opening_bank_info', 'nextCompany', 'contact_info', 'nextData'],
  data () {
    return {
      id: '',
      eId: '',
      maxlength: 32,
      maxlengths: 18,
      // 真实性说明
      checked: '',
      authenticitys: 0,
      // 取消
      dialogVisible: false,
      title: '资料上传',
      certificates: {
        business_license_id: '',
        business_license: '',
        social_security_reg_id: '',
        social_security_reg: '',
        statistical_reg_certificate_id: '',
        statistical_reg_certificate: '',
        bank_permit_id: '',
        bank_permit: '',
        taxpayer_license_id: '',
        taxpayer_license: '',
        legal_person_business_license: ''
      },
      fileUrl: '',
      rules: {
        business_license_id: [
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ]
      },
      tab: '',
      upDateUrl: '',
      year_founded: '',
      register_assets: '',
      region: '',
      dataID: '',
      statusId: '',
      errorItem: '',
      disTable: true,
      change_apply: '',
      verify: '',
      legal_person_id: '',
      is_legal_person: '',
      // 点击图片放大
      imgVisible: false,
      imgSmallBig: '',
      businessId: '',
      putId: '',
      region_code: ''
    }
  },
  mounted () {
    var that = this
    that.change_apply = that.$route.query.change_apply
    that.eId = Number(that.$route.query.eId)
    if (that.eId) {
      that.eId = Number(that.$route.query.eId)
      that.$ajax.get('/api/company/status/').then(res => {
        that.businessId = res.data.company_id
        if (that.businessId !== 'null' && that.businessId) {
          that.$ajax.get(`/api/company/` + that.businessId).then(res => {
            if (res.data.detail_change === null) {
              that.putId = res.data.detail
              that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
                that.certificates.business_license = res.data.certificates.business_license
                that.certificates.social_security_reg_id = res.data.certificates.social_security_reg_id
                that.certificates.social_security_reg = res.data.certificates.social_security_reg
                that.certificates.statistical_reg_certificate_id = res.data.certificates.statistical_reg_certificate_id
                that.certificates.statistical_reg_certificate = res.data.certificates.statistical_reg_certificate
                that.certificates.bank_permit_id = res.data.certificates.bank_permit_id
                that.certificates.bank_permit = res.data.certificates.bank_permit
                that.certificates.taxpayer_license_id = res.data.certificates.taxpayer_license_id
                that.certificates.taxpayer_license = res.data.certificates.taxpayer_license
                that.certificates.legal_person_business_license = res.data.certificates.legal_person_business_license
                that.certificates.business_license_id = that.ruleFormFirst.business_license_id
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            } else {
              that.putId = res.data.detail_change
              that.$ajax.get(`/api/company_detail/` + res.data.detail_change).then(res => {
                that.certificates.business_license = res.data.certificates.business_license
                that.certificates.social_security_reg_id = res.data.certificates.social_security_reg_id
                that.certificates.social_security_reg = res.data.certificates.social_security_reg
                that.certificates.statistical_reg_certificate_id = res.data.certificates.statistical_reg_certificate_id
                that.certificates.statistical_reg_certificate = res.data.certificates.statistical_reg_certificate
                that.certificates.bank_permit_id = res.data.certificates.bank_permit_id
                that.certificates.bank_permit = res.data.certificates.bank_permit
                that.certificates.taxpayer_license_id = res.data.certificates.taxpayer_license_id
                that.certificates.taxpayer_license = res.data.certificates.taxpayer_license
                that.certificates.legal_person_business_license = res.data.certificates.legal_person_business_license
                that.certificates.business_license_id = that.ruleFormFirst.business_license_id
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            }
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      })
    } else {
      that.certificates.business_license_id = that.ruleFormFirst.business_license_id
    }
    that.$ajax.get('/api/company/status/').then(res => {
      that.verify = Number(res.data.company_verified)
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    that.$ajax.get(`/api/auth/` + localStorage.identifier).then(res => {
      if (res.data.person) {
        that.legal_person_id = res.data.person
        that.$ajax.get(`/api/person/` + res.data.person + '?login=1').then(res => {
          that.is_legal_person = res.data.is_legal_person
        })
      }
    })
  },
  methods: {
    // 点击图片放大
    bigImg (img) {
      const that = this
      that.imgVisible = true
      that.imgSmallBig = img
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
    okStep () {
      const that = this
      that.$emit('nextDataShow', 0)
      that.certificates.business_license_id = ''
      that.certificates.business_license_id = ''
      that.certificates.business_license = ''
      that.certificates.social_security_reg_id = ''
      that.certificates.social_security_reg = ''
      that.certificates.statistical_reg_certificate_id = ''
      that.certificates.statistical_reg_certificate = ''
      that.certificates.bank_permit_id = ''
      that.certificates.bank_permit = ''
      that.certificates.taxpayer_license_id = ''
      that.certificates.taxpayer_license = ''
      that.certificates.legal_person_business_license = ''
    },
    // 图片上传
    handleAvatarSuccess (file) {
      var that = this
      var fileUrl = new FormData()
      that.certificates.business_license = file.file
      fileUrl.append('file', that.certificates.business_license)
      fileUrl.append('function_module', 'company_info')
      that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
        that.certificates.business_license = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handleAvatarSuccessA (file) {
      var that = this
      var fileUrl = new FormData()
      that.certificates.social_security_reg = file.file
      fileUrl.append('file', that.certificates.social_security_reg)
      fileUrl.append('function_module', 'company_info')
      that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
        that.certificates.social_security_reg = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handleAvatarSuccessI (file) {
      var that = this
      var fileUrl = new FormData()
      that.certificates.legal_person_business_license = file.file
      fileUrl.append('file', that.certificates.legal_person_business_license)
      fileUrl.append('function_module', 'company_info')
      that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
        that.certificates.legal_person_business_license = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handleAvatarSuccessB (file) {
      var that = this
      var fileUrl = new FormData()
      that.certificates.statistical_reg_certificate = file.file
      fileUrl.append('file', that.certificates.statistical_reg_certificate)
      fileUrl.append('function_module', 'company_info')
      that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
        that.certificates.statistical_reg_certificate = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handleAvatarSuccessC (file) {
      var that = this
      var fileUrl = new FormData()
      that.certificates.bank_permit = file.file
      fileUrl.append('file', that.certificates.bank_permit)
      fileUrl.append('function_module', 'company_info')
      that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
        that.certificates.bank_permit = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handleAvatarSuccessD (file) {
      var that = this
      var fileUrl = new FormData()
      that.certificates.taxpayer_license = file.file
      fileUrl.append('file', that.certificates.taxpayer_license)
      fileUrl.append('function_module', 'company_info')
      that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
        that.certificates.taxpayer_license = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size < 5 * 1024 * 1024
      if (!isJPG) {
        this.$message.error('只能是 JPG、JPEG或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    // 下一步
    onSubmit () {
      var that = this
      var CircularJSON = require('circular-json')
      that.region_code = that.nextCompany.region_code
      if (that.certificates.legal_person_business_license === '') {
        this.$message.error('请上传手持营业执照正面照')
      } else {
        if (this.certificates.business_license_id === '') {
          this.$message.error('请填写统一社会信用代码')
        } else {
          if (this.certificates.business_license_id.length > 18 || this.certificates.business_license_id.length < 15) {
            this.$message.error('请填写正确的统一社会信用代码')
          } else {
            if (this.certificates.business_license === '') {
              this.$message.error('请上传营业执照')
            } else {
              // 社会保险登记证证
              if (this.certificates.social_security_reg) {
                if (this.certificates.social_security_reg_id === '') {
                  that.$message.error('请输入社会保险登记证证件号')
                  return
                }
              }
              if (this.certificates.social_security_reg_id) {
                if (this.certificates.social_security_reg === '') {
                  that.$message.error('请上传社会保险登记证')
                  return
                }
              }
              // 统计登记证证件号
              if (this.certificates.statistical_reg_certificate) {
                if (this.certificates.statistical_reg_certificate_id === '') {
                  that.$message.error('请输入统计登记证证件号')
                  return
                }
              }
              if (this.certificates.statistical_reg_certificate_id) {
                if (this.certificates.statistical_reg_certificate === '') {
                  that.$message.error('请上传统计登记证')
                  return
                }
              }
              // 银行开户许可证证件号
              if (this.certificates.bank_permit) {
                if (this.certificates.bank_permit_id === '') {
                  that.$message.error('请输入银行开户许可证证件号')
                  return
                }
              }
              if (this.certificates.bank_permit_id) {
                if (this.certificates.bank_permit === '') {
                  that.$message.error('请上传银行开户许可证')
                  return
                }
              }
              // 一般纳税人资格证
              if (this.certificates.taxpayer_license) {
                if (this.certificates.taxpayer_license_id === '') {
                  that.$message.error('请输入一般纳税人资格证证件号')
                  return
                }
              }
              if (this.certificates.taxpayer_license_id) {
                if (this.certificates.taxpayer_license === '') {
                  that.$message.error('请上传一般纳税人资格证')
                  return
                }
              }
              that.$refs['form'].validate(valid => {
                if (valid) {
                  if (that.checked === true) {
                    if (that.is_legal_person === false) {
                      if (that.eId === 2) {
                        if (that.verify === 3) {
                          that.$ajax.put(`/api/company_detail/` + that.putId + '/', { region_code: that.region_code, business_license_id: that.ruleFormFirst.business_license_id, name: that.ruleFormFirst.name, area: that.area, opening_bank_info: that.opening_bank_info, contact_info: that.contact_info, certificates: that.certificates}).then(res => {
                            that.$router.push('/setting?signed=1')
                          })
                          that.$ajax.put('/api/bms/verify/record/rewrite/', {module: 2}).then(res => {
                            console.log(res)
                          })
                        } else {
                          console.log(that.ruleFormFirst)
                          that.$ajax.post('/api/company_detail/', { region_code: that.region_code, change_apply: that.change_apply, business_license_id: that.ruleFormFirst.business_license_id, name: that.ruleFormFirst.name, area: that.area, opening_bank_info: that.opening_bank_info, contact_info: that.contact_info, certificates: that.certificates}).then(res => {
                            that.$router.push('/setting?signed=1')
                          }).catch(err => {
                            that.$message.error(err.response.data.err_msg)
                          })
                        }
                      } else {
                        that.$ajax.post('/api/company_detail/', { region_code: that.region_code, business_license_id: that.ruleFormFirst.business_license_id, name: that.ruleFormFirst.name, area: that.area, opening_bank_info: that.opening_bank_info, contact_info: that.contact_info, certificates: that.certificates}).then(res => {
                          that.$router.push('/setting?signed=1')
                        }).catch(err => {
                          that.$message.error(err.response.data.err_msg)
                        })
                      }
                    } else {
                      if (that.eId === 2) {
                        if (that.verify === 3) {
                          that.$ajax.put(`/api/company_detail/` + that.putId + '/', { region_code: that.region_code, business_license_id: that.ruleFormFirst.business_license_id, name: that.ruleFormFirst.name, area: that.area, opening_bank_info: that.opening_bank_info, contact_info: that.contact_info, certificates: that.certificates}).then(res => {
                            that.$router.push('/setting?signed=1')
                          })
                          that.$ajax.put('/api/bms/verify/record/rewrite/', {module: 2}).then(res => {
                            console.log(res)
                          })
                        } else {
                          that.$ajax.post('/api/company_detail/', { region_code: that.region_code, change_apply: that.change_apply, business_license_id: that.ruleFormFirst.business_license_id, name: that.ruleFormFirst.name, area: that.area, opening_bank_info: that.opening_bank_info, contact_info: that.contact_info, certificates: that.certificates}).then(res => {
                            that.$router.push('/setting?signed=1')
                          }).catch(err => {
                            that.$message.error(err.response.data.err_msg)
                          })
                        }
                      } else {
                        that.$ajax.post('/api/company_detail/', { region_code: that.region_code, legal_person: that.legal_person_id, business_license_id: that.ruleFormFirst.business_license_id, name: that.ruleFormFirst.name, area: that.area, opening_bank_info: that.opening_bank_info, contact_info: that.contact_info, certificates: that.certificates}).then(res => {
                          that.$router.push('/setting?signed=1')
                        }).catch(err => {
                          that.$message.error(err.response.data.err_msg)
                        })
                      }
                    }
                  } else {
                    that.$message.error('请勾选真实性声明')
                  }
                }
              })
            }
          }
        }
      }
    },
    // 返回
    resetForm () {
      var that = this
      if (that.eId === 1) {
        that.$router.push('/setting?signed=1')
      } else {
        this.dialogVisible = true
      }
    },
    // 删除社会
    socialClose ($event, i) {
      var that = this
      if (i === 0) {
        that.certificates.business_license = ''
      } else if (i === 1) {
        that.certificates.org_certificate = ''
      } else if (i === 2) {
        that.certificates.social_security_reg = ''
      } else if (i === 3) {
        that.certificates.statistical_reg_certificate = ''
      } else if (i === 4) {
        that.certificates.icp = ''
      } else if (i === 5) {
        that.certificates.bank_permit = ''
      } else if (i === -1) {
        that.certificates.legal_person_business_license = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.guaranteeSecond {
  .right {
    width:100%;
    height:auto;
    // margin-top: 35px;
    margin: 39px 0 0;
    .right_list {
      border-bottom: 1px solid #edf2f5;
      padding-bottom: 30px;
      ul {
        li {
          width: 600px;
          line-height: 40px;
          p {
            display: inline-block;
            color: #afbcc7;
            width: 200px;
          }
          input {
            width: 300px;
            height: 30px;
            border: 1px solid #dcdfe6;
          }
          span {
            color: #000;
          }
        }
      }
    }
    .right_bottmo {
      margin-top: 30px;
      h3 {
        font-size:18px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        padding-bottom: 20px;
      }
      .basics {
        .bas_look {
          .uploaadBtn {
            .img_big {
              width: 193px;
              height: 143px;
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
              display: flex;
              flex-direction: row;
              margin: 30px 0 20px;
              .del {
                position: relative;
                width: 40px;
                height: 40px;
              }
              .ins {
                width: 40px;
                height: 40px;
                margin: auto;
              }
              .avatar-uploader {
                width:40px;
                height:40px;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                cursor: pointer;
                .el-upload {
                  width:40px;
                  height:40px;
                  // opacity: 0;
                  cursor: pointer;
                  .el-upload__input {
                    width:40px;
                    height:40px;
                    cursor: pointer;
                  }
                }
                .el-upload--text {
                  width:40px;
                  height:40px;
                }
              }
              i {
                font-size: 28px;
                color: #fff;
                cursor: pointer;
              }
              .hover_img {
                cursor: pointer;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                color: #fff;
                opacity: 0;
                font-size: 14px;
                background-color: rgba(0,0,0,.5);
                -webkit-transition: opacity .3s;
                transition: opacity .3s;
                text-align: center;
                margin: auto;
                span {
                  display: inline-block;
                  cursor: pointer;
                  width: 40px;
                  height: 40px;
                  margin: 0 10px;
                }
                .ins {
                  margin: 55px 6px 0 0;
                  display: inline-block;
                }
                .del {
                  margin-left: 5px;
                  display: inline-block;
                }
              }
              .hover_img:hover {
                opacity: 1;
                display: inline-block;
              }
              .hover_img::after {
                display: inline-block;
                content: "";
                height: 100%;
                vertical-align: middle;
                box-sizing: inherit;
              }
            }
            .img_title {
              display: inline-block;
              padding-top: 10px;
            }
            .el-icon-close {
              font-size: 16px;
              position: absolute;
              top: 60px;
              left: 200px;
              cursor: pointer;
            }
            .span_banks {
              position: relative;
              p {
                display: inline-block;
                padding-left: 10px;
                width: 244px;
                color: #606266;
              }
              .span_bank {
                position: absolute;
                left: 0;
                top: 0;
                color: #f56c6c;
              }
              .upload_img {
                padding-left: 249px;
                .el-icon-close {
                  font-size: 16px;
                  position: absolute;
                  top: 60px;
                  left: 450px;
                  cursor: pointer;
                }
              }
            }
            .del {
              position: relative;
              cursor: pointer;
              input {
                width:20px;
                height:20px;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                cursor: pointer;
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
                width: 193px;
                height: 143px;
                margin-top: 30px;
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
          }
          .disTables {
            color: #c0c4cc;
            height: 30px;
            border-radius: 5px;
            background: #f5f7fa;
            outline: none;
            border: 1px solid #dcdfe6;
            padding-left: 20px;
            width: 300px;
            display: block;
          }
        }
        .form_center {
          text-align: center;
          .el-button {
            margin-right: 50px;
          }
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
      }
      .error_no {
        height: auto;
        padding: 15px 50px 20px;
        background-color: #fef0f0;
        color: #f56c6c;
        border-radius: 4px;
        margin-bottom: 20px;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    // overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 193px;
    height: 143px;
    line-height: 93px;
    text-align: center;
    margin-top: 30px;
  }
  .avatar {
    width: 193px;
    height: 143px;
    display: block;
    margin-top: 30px;
    border: 2px dashed #eb6100;
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
.guaranteeSecond {
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
  .img_big {
    .el-upload {
      width:40px;
      height:40px;
      cursor: pointer;
      .el-upload__input {
        width:40px;
        height:40px;
        cursor: pointer;
      }
    }
  }
}
</style>
