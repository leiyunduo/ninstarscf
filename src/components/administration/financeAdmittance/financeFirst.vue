<template>
  <div class="financeAdmittanceFirst">
    <div class="info-enter">
      <div class="top_name">
        <h3>企业资料审核</h3>
      </div>
      <div class="top_name1">
        <h3>企业基础信息</h3>
        <p>欢迎来到九星平台，您已经注册成功！请务必保证您填写的信息内容准确无误，否则可能会造成认证失败。</p>
      </div>
      <finance-second v-if='nextData === 1' :nextCompany='nextCompany' @nextDataShow='nextDataShow' :putId='putId' @dataLast='dataLast' :contact_info='contact_info' :area='area' :opening_bank_info='opening_bank_info' :nextData='nextData' :ruleFormFirst='ruleForm' />
      <div class="right" v-if='nextData === 0'>
        <!-- 基础信息 -->
        <div class="right_top">
          <div class="h3">
            <h3>基础信息<span>修改你的基本资料，将显示在你的个人名片中，并可以让更多的朋友了解和认识你！</span></h3>
          </div>
        </div>
        <div class="basicsList">
          <el-form :model="ruleForm" :rules="rules" ref="ruleFormO" class="demo-ruleForm" label-position='left' size="small">
            <el-form-item label="企业名称:" prop="name" class="basics_span_class" label-width="100px">
              <span class="basics_span" style="display:block">企业名称需要以真实的企业/机构/团队的名称注册，与营业执照保持一致</span>
              <el-input v-model.trim="ruleForm.name" :class="{disTables: disTable}" :disabled="disTable" class="inp_iner" style="width: 700px;" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码:" prop="business_license_id" label-width="200px">
              <el-input v-model.trim="ruleForm.business_license_id" style="width: 370px;" :class="{disTables: disTable}" :disabled="disTable"></el-input>
            </el-form-item>
            <el-form-item label="机构类型：" prop="industry_type" v-show="eId !== 1" style="padding-left:11px;" label-width="189px">
              <el-select v-model.trim="ruleForm.industry_type" style="width: 370px;" placeholder="请选择" @change="institutionalType">
                <el-option label="银行" value="0"></el-option>
                <el-option label="P2P理财" value="1"></el-option>
                <el-option label="保理" value="2"></el-option>
                <el-option label="其他" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机构类型：" prop="industry_type" v-show="eId === 1" style="padding-left:11px;" label-width="189px">
              <el-input v-model="institutional[ruleForm.industry_type]" class="inp_iner" style="width: 370px;" :class="{disTables: disTable}" :disabled="disTable"></el-input>
            </el-form-item>
            <el-form-item prop="province" class="span_banks" label-width="0" v-show="eId !== 1">
              <p style="padding-right: 40px;">所在地区：</p>
              <span class="span_bank">*</span>
              <v-distpicker @province="changedprovince($event,area)" @city="chengedcity($event,area)" @area="chengedarea($event,area)"></v-distpicker>
              <div class="error_title" v-if="area.region === '区'">
                请选择所在省市区
              </div>
              <span class="region_prompt" v-if="area.province !== ''">
                城市需以企业注册地所在的城市为准
              </span>
            </el-form-item>
            <el-form-item label="所在省：" prop="province" class="class_regin" v-show="eId === 1" style="padding-left:11px;" label-width="189px">
              <el-input v-model="area.province" style="width: auto;" :class="{disTable: disTable}" :disabled="disTable"></el-input>
              <el-input v-model="area.city" style="width: auto;" :class="{disTable: disTable}" :disabled="disTable"></el-input>
              <el-input v-model="area.region" style="width: auto;" :class="{disTable: disTable}" :disabled="disTable"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 开户行 -->
        <div class="right_top" v-show="openingBank">
          <div class="h3">
            <h3>开户行<span>以下均为必填项</span></h3>
          </div>
        </div>
        <div class="basicsList" v-show="openingBank">
          <el-form :model="opening_bank_info" :rules="rules" ref="ruleFormT" class="demo-ruleForm" label-position='left' size="small">
            <el-form-item label="开户行：" prop="opening_bank" v-if='eId !== 1' label-width="200px">
              <el-select v-model.trim="opening_bank_info.opening_bank" style="width: 220px;" filterable allow-create default-first-option placeholder="请选择">
                <el-option v-for="item in optionsBank" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户行：" prop="opening_bank" v-if='eId === 1' label-width="200px">
              <el-input v-model="opening_bank_info.opening_bank" style="width: 370px;" :class="{disTables: disTable}" :disabled="disTable"></el-input>
            </el-form-item>
            <el-form-item class="span_banks" prop="bank_province" label-width="0" v-if='eId !== 1'>
              <p>银行账户所在地：</p>
              <span class="span_bank">*</span>
              <v-distpicker @province="changedprovinceF($event,opening_bank_info)" @city="chengedcityF($event,opening_bank_info)" @area="chengedareaF($event,opening_bank_info)"></v-distpicker>
              <div class="error_title" v-if="opening_bank_info.bank_region === '区'">
                请选择银行账户所在省市区
              </div>
            </el-form-item>
            <el-form-item label="银行账户所在地：" prop="bank_province" v-if='eId === 1' style="padding-left:11px;" label-width="189px">
              <el-input v-model="opening_bank_info.bank_province" style="width: auto;" :class="{disTable: disTable}" :disabled="disTable"></el-input>
              <el-input v-model="opening_bank_info.bank_city" style="width: auto;" :class="{disTable: disTable}" :disabled="disTable"></el-input>
              <el-input v-model="opening_bank_info.bank_region" style="width: auto;" :class="{disTable: disTable}" :disabled="disTable"></el-input>
            </el-form-item>
            <el-form-item label="分行名称：" prop="bank_branch" label-width="200px">
              <el-input v-model.trim="opening_bank_info.bank_branch" :class="{disTable: disTable}" :disabled="disTable" style="width: 370px;" @focus="bankFacus" :maxlength="maxlength * 4"></el-input>
              <span class="bank_prompt" v-show="bankShow">
                例如：交通银行股份有限公司北京中关村园区支行
              </span>
            </el-form-item>
            <el-form-item label="账号名称：" prop="bank_account_name" label-width="200px">
              <el-input v-model.trim="opening_bank_info.bank_account_name" :class="{disTable: disTable}" :disabled="disTable" style="width: 370px;" @focus="accountFacus" :maxlength="maxlength"></el-input>
              <span class="bank_prompt" v-show="accountShow">
                例如：九星惟诚供应链信息技术有限公司
              </span>
            </el-form-item>
            <el-form-item label="银行账号：" prop="bank_account" label-width="200px">
              <el-input v-model.trim="opening_bank_info.bank_account" :class="{disTable: disTable}" :disabled="disTable" style="width: 370px;" @focus="bankNumFacus" :maxlength="maxlength"></el-input>
              <span class="bank_prompt" v-show="bankNumShow">
                例如：1100612410*******8943
              </span>
            </el-form-item>
          </el-form>
        </div>
        <!-- 联系方式 -->
        <div class="right_top">
          <div class="h3">
            <h3>联系方式</h3>
          </div>
        </div>
        <div class="basicsList">
          <el-form :model="contact_info" v-if='eId !== 1' :rules="rules" ref="ruleForm" label-position='left' size="small">
            <el-form-item label="联系地址:" prop="address" label-width="200px">
              <el-input v-model.trim="contact_info.address" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength * 2"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱:" prop="email" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.email" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码:" prop="postal_code" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.postal_code" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlengths / 2"></el-input>
            </el-form-item>
            <el-form-item label="公司电话:" prop="company_phone" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.company_phone" @blur="companyPhone(contact_info.company_phone)" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength / 2"></el-input>
            </el-form-item>
            <el-form-item label="公司传真:" prop="fax" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.fax" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="公司网址:" prop="website" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.website" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength * 4"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="contact_info" v-if='eId === 1' :rules="rules" ref="ruleForm" label-position='left' size="small">
            <el-form-item label="联系地址:" prop="address" label-width="200px">
              <el-input v-model.trim="contact_info.address" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength * 2"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱:" v-if='contact_info.email' prop="email" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.email" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码:" v-if='contact_info.postal_code' prop="postal_code" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.postal_code" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlengths / 2"></el-input>
            </el-form-item>
            <el-form-item label="公司电话:" v-if='contact_info.company_phone' prop="company_phone" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.company_phone" @blur="companyPhone(contact_info.company_phone)" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength / 2"></el-input>
            </el-form-item>
            <el-form-item label="公司传真:" v-if='contact_info.fax' prop="fax" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.fax" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength"></el-input>
            </el-form-item>
            <el-form-item label="公司网址:" v-if='contact_info.website' prop="website" style="padding-left:11px;" label-width="189px">
              <el-input v-model.trim="contact_info.website" style="width: 370px;" :class="{disTable: disTable}" :disabled="disTable" :maxlength="maxlength * 4"></el-input>
            </el-form-item>
          </el-form>
          <p style="margin-top:10px;margin-left:20px;" v-if='eId !== 1'>
            <el-checkbox v-model="checked">同意</el-checkbox>
            <span style="text-decoration: underline;color:#eb6100;cursor:pointer;font-size:14px;" @click="authenticity">真实性声明</span>
            <span v-if='authenticitys === 1' style="font-size:12px;color:#999;">本公司郑重承诺，本公司向九星平台报送的企业注册材料不存在虚假记载、误导性信息，本公司对其真实性、准确性负责。因虚假记载、误导性信息而引起的一切法律责任，均由本公司承担。</span>
          </p>
          <div class="class_down">
            <div class="sel" @click="submitForm">下一步</div>
            <div class="reset_Form" @click="resetForm">返回</div>
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
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import financeSecond from './financeSecond'
export default {
  data () {
    return {
      // 真实性说明
      checked: '',
      authenticitys: 0,
      // 取消
      dialogVisible: false,
      id: '',
      title: '企业信息',
      openingBank: true,
      // 下一步
      nextData: 0,
      // 认证状态
      authState: '',
      // 审核是否通过
      changeAppStatus: '',
      maxlength: 32,
      maxlengths: 12,
      maxlength1: 18,
      ruleForm: {
        name: '', // 企业名称
        business_license_id: '', // 企业证件号码
        industry_type: ''
      },
      // 所在省：
      area: {
        province: '', // 所在省：
        city: '', // 所在市：
        region: '' // 所在区：
      },
      // 开户行
      opening_bank_info: {
        opening_bank: '', // 开户行
        bank_province: '', // 开户行所在省
        bank_city: '', // 开户行所在市
        bank_region: '', // 开户行所在区
        bank_branch: '', // 分行名称：
        bank_account_name: '', // 账号名称：
        bank_account: '' // 银行账号：
      },
      // 联系信息
      contact_info: {
        contact_person: '', // 联系人
        address: '', // 联系地址
        phone: '', // 联系电话
        postal_code: '', // 邮政编码
        company_phone: '', // 公司电话
        fax: '', // 公司传真
        email: '', // 公司邮箱
        website: '' // 公司网址
      },
      nextCompany: {
        name: '',
        region_code: '',
        business_license_id: ''
      },
      optionsBank: [
        {
          value: '中国人民银行',
          label: '中国人民银行'
        }, {
          value: '中国银行',
          label: '中国银行'
        }, {
          value: '中国工商银行',
          label: '中国工商银行'
        }, {
          value: '中国建设银行',
          label: '中国建设银行'
        }, {
          value: '中国农业银行',
          label: '中国农业银行'
        }, {
          value: '交通银行',
          label: '交通银行'
        }, {
          value: '兴业银行',
          label: '兴业银行'
        }, {
          value: '光大银行',
          label: '光大银行'
        }, {
          value: '广发银行',
          label: '广发银行'
        }, {
          value: '民生银行',
          label: '民生银行'
        }, {
          value: '中信银行',
          label: '中信银行'
        }, {
          value: '北京银行',
          label: '北京银行'
        }, {
          value: '恒丰银行',
          label: '恒丰银行'
        }, {
          value: '汇丰银行',
          label: '汇丰银行'
        }, {
          value: '中国邮政储蓄银行',
          label: '中国邮政储蓄银行'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请填写企业名称', trigger: 'change' }
        ],
        postal_code: [
          { min: 6, max: 6, message: '长度为6位字符', trigger: 'blur' }
        ],
        opening_bank: [
          { required: true, message: '请填写开户行', trigger: 'change' }
        ],
        bank_branch: [
          { required: true, message: '请输入分行名称', trigger: 'change' }
        ],
        bank_account_name: [
          { required: true, message: '请填写账号名称', trigger: 'change' }
        ],
        bank_account: [
          { required: true, message: '请填写银行账号', trigger: 'change' },
          { min: 8, max: 32, message: '请填写正确的银行账号', trigger: 'blur' }
        ],
        // 验证证件号码
        business_license_id: [
          { required: true, message: '请填写企业证件号码', trigger: 'change' },
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ],
        // 验证证件号码
        legal_num: [
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ],
        // 验证邮箱
        email: [
          // { required: true, message: '请填写邮箱地址', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        contact_person: [
          { required: true, message: '请填写联系人', trigger: 'change' },
          { max: 32, message: '长度最大为32位字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写联系地址', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请填写联系电话', trigger: 'change' },
          { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
        ]
      },
      business_license_status: '',
      // 分行名称：
      bankShow: false,
      // 账号名称：
      accountShow: false,
      // 银行账号：
      bankNumShow: false,
      sId: '',
      status: ['', '企业', '个体工商户', '政府机关/事业单位'],
      institutional: ['银行', 'P2P理财', '保理', '其他'],
      disTable: false,
      // 企业id
      businessId: '',
      eId: '',
      // 审核失败修改id
      putId: '',
      change_apply: '',
      company_info: '',
      legal_person: '',
      certificate: ''
    }
  },
  components: {
    VDistpicker,
    financeSecond
  },
  mounted () {
    var that = this
    this.dataID = Number(this.$route.query.dataID)
    this.sId = Number(this.$route.query.sId)
    that.change_apply = that.$route.query.change_apply
    that.eId = Number(that.$route.query.eId)
    that.$ajax.get('/api/company/status/').then(res => {
      that.businessId = res.data.company_id
      // 查看详情
      if (that.eId) {
        that.eId = Number(that.$route.query.eId)
        if (that.eId === 2) {
          that.disTable = false
        } else {
          that.disTable = true
        }
        if (that.businessId !== 'null' && that.businessId) {
          that.$ajax.get(`/api/company/` + that.businessId).then(res => {
            if (res.data.detail_change === null) {
              that.putId = res.data.detail
              that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
                that.ruleForm.name = res.data.name
                that.ruleForm.business_license_id = res.data.certificates.business_license_id
                that.ruleForm.industry_type = res.data.industry_type
                if (Number(this.ruleForm.industry_type) !== 0) {
                  this.openingBank = true
                } else {
                  this.openingBank = false
                }
                that.contact_info = res.data.contact_info
                that.nextCompany.name = res.data.name
                that.nextCompany.region_code = res.data.region_code
                that.certificate = res.data.certificates
                that.area = res.data.area
                that.opening_bank_info = res.data.opening_bank_info
                that.area = res.data.area
                that.opening_bank_info = res.data.opening_bank_info
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            } else {
              that.putId = res.data.detail_change
              that.$ajax.get(`/api/company_detail/` + res.data.detail_change).then(res => {
                that.ruleForm.name = res.data.name
                that.ruleForm.business_license_id = res.data.certificates.business_license_id
                that.ruleForm.industry_type = res.data.industry_type
                if (Number(this.ruleForm.industry_type) !== 0) {
                  this.openingBank = true
                } else {
                  this.openingBank = false
                }
                that.contact_info = res.data.contact_info
                that.nextCompany.name = res.data.name
                that.nextCompany.region_code = res.data.region_code
                that.certificate = res.data.certificates
                that.area = res.data.area
                that.opening_bank_info = res.data.opening_bank_info
                that.area = res.data.area
                that.opening_bank_info = res.data.opening_bank_info
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            }
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 电话格式
    companyPhone (item) {
      // contact_info.company_phone
      if (!(/[0-9-()（）]{7,18}/.test(this.contact_info.company_phone))) {
        this.$message.error('公司电话格式错误，请重新输入')
        this.contact_info.company_phone = ''
      }
    },
    // 显示当前页面
    nextDataShow (i) {
      this.nextData = i
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
    },
    // 确定-返回上一级
    okStep () {
      const that = this
      that.$router.push('/setting?signed=1')
    },
    // 金融机构信息=》机构类型
    institutionalType () {
      if (this.ruleForm.industry_type !== '0') {
        this.openingBank = true
      } else {
        this.openingBank = false
      }
    },
    dataLast (i) {
      var that = this
      that.nextData = i
    },
    // 所在省
    changedprovince ($event, obj) {
      obj.province = $event.value
      this.area.city = ''
      this.area.region = ''
    },
    // 所在地
    chengedcity ($event, obj) {
      obj.city = $event.value
      this.area.region = ''
    },
    // 所在区
    chengedarea ($event, obj) {
      obj.region = $event.value
      this.nextCompany.region_code = $event.code
    },
    // 开户行所在省
    changedprovinceF ($event, obj) {
      obj.bank_province = $event.value
      this.opening_bank_info.bank_city = ''
      this.opening_bank_info.bank_region = ''
    },
    // 开户行所在市
    chengedcityF ($event, obj) {
      obj.bank_city = $event.value
      this.opening_bank_info.bank_region = ''
    },
    // 开户行所在区
    chengedareaF ($event, obj) {
      obj.bank_region = $event.value
    },
    // 分行名称：
    bankFacus () {
      this.bankShow = true
    },
    // 账号名称：
    accountFacus () {
      this.accountShow = true
    },
    // 银行账号：
    bankNumFacus () {
      this.bankNumShow = true
    },
    // 提交
    submitForm () {
      var that = this
      if (that.eId) {
        if (that.eId !== 1) {
          that.$refs['ruleFormO'].validate(valid1 => {
            if (that.area.province === '') {
              that.area.region = '区'
            } else {
              if (that.area.city === '') {
                that.area.region = '区'
              } else {
                if (that.area.region === '') {
                  that.area.region = '区'
                } else {
                  if (that.area.region === '区') {
                    that.area.region = '区'
                  } else {
                    if (this.ruleForm.industry_type === '0') {
                      // 为0
                      that.$refs['ruleForm'].validate(valid3 => {
                        if (valid1 && valid3) {
                          if (that.checked === true) {
                            that.nextData = 1
                          } else {
                            that.$message.error('请勾选真实性声明')
                          }
                        }
                      })
                    } else {
                      that.$refs['ruleFormT'].validate(valid2 => {
                        if (that.opening_bank_info.bank_province === '') {
                        that.opening_bank_info.bank_region = '区'
                      } else {
                        if (that.opening_bank_info.bank_city === '') {
                          that.opening_bank_info.bank_region = '区'
                        } else {
                          if (that.opening_bank_info.bank_region === '') {
                            that.opening_bank_info.bank_region = '区'
                          } else {
                            if (that.opening_bank_info.bank_region === '区') {
                              that.opening_bank_info.bank_region = '区'
                            } else {
                              that.$refs['ruleForm'].validate(valid3 => {
                                if (valid1 && valid2 && valid3) {
                                  if (that.checked === true) {
                                    that.nextData = 1
                                  } else {
                                    that.$message.error('请勾选真实性声明')
                                  }
                                }
                              })
                            }
                          }
                        }
                      }
                      })
                    }
                  }
                }
              }
            }
          })
        } else {
          that.nextData = 1
        }
      } else {
        that.$refs['ruleFormO'].validate(valid1 => {
          if (that.area.province === '') {
            that.area.region = '区'
          } else {
            if (that.area.city === '') {
              that.area.region = '区'
            } else {
              if (that.area.region === '') {
                that.area.region = '区'
              } else {
                if (that.area.region === '区') {
                  that.area.region = '区'
                } else {
                  if (this.ruleForm.industry_type === '0') {
                    // 为0
                    that.$refs['ruleForm'].validate(valid3 => {
                      if (valid1 && valid3) {
                        if (that.checked === true) {
                          that.nextCompany.name = that.ruleForm.name
                          that.nextCompany.business_license_id = that.ruleForm.business_license_id
                          if (that.businessId !== 'null' && that.businessId) {
                            that.nextData = 1
                          } else {
                            that.$ajax.post('/api/company/', {...that.nextCompany}).then(res => {
                              that.nextData = 1
                            }).catch(err => {
                              that.$message.error(err.response.data.err_msg)
                            })
                          }
                        } else {
                          that.$message.error('请勾选真实性声明')
                        }
                      }
                    })
                  } else {
                    that.$refs['ruleFormT'].validate(valid2 => {
                      if (that.opening_bank_info.bank_province === '') {
                      that.opening_bank_info.bank_region = '区'
                    } else {
                      if (that.opening_bank_info.bank_city === '') {
                        that.opening_bank_info.bank_region = '区'
                      } else {
                        if (that.opening_bank_info.bank_region === '') {
                          that.opening_bank_info.bank_region = '区'
                        } else {
                          if (that.opening_bank_info.bank_region === '区') {
                            that.opening_bank_info.bank_region = '区'
                          } else {
                            that.$refs['ruleForm'].validate(valid3 => {
                              if (valid1 && valid2 && valid3) {
                                if (that.checked === true) {
                                  that.nextCompany.name = that.ruleForm.name
                                  that.nextCompany.business_license_id = that.ruleForm.business_license_id
                                  if (that.businessId !== 'null' && that.businessId) {
                                    that.nextData = 1
                                  } else {
                                    that.$ajax.post('/api/company/', {...that.nextCompany}).then(res => {
                                      that.nextData = 1
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
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
                    })
                  }
                }
              }
            }
          }
        })
      }
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
    .right {
      width:100%;
      height:auto;
      // margin-top: 35px;
      margin: 39px 0 0;
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
          display: block;
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
          margin: 20px 0 0 200px;
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
            margin-left: 75px;
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
            top: 42px;
            left: 14%;
            color: #f56c6c;
            font-size: 12px;
            line-height: 1;
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
