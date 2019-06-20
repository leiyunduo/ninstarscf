<template>
  <div class="c_credit_operator_box">
    <!-- <appNav :father='{selIndex: 6}' type='1'></appNav> -->
    <div class="c_credit_operator_right">
      <div class="c_top_location"><location :location='location'></location></div>
      <div class="c_opera_bottom" v-show="!showBottom">
        <!-- <div class="c_top_form">
          <p class="c_input_p">
            <span>支付（供票）企业</span>
            <input v-model="payData.payInput" placeholder="" width="300px" />
          </p>
          <p class="c_input_p">
            <span>收款（获票）企业</span>
            <input v-model="getData.getInput" placeholder="" />
          </p>
        </div> -->
        <div class="c_cash_info">
          <div class="c_cash_info_part c_cash_info_left">
            <h4>支付（出票）企业信息</h4>
            <p><span>企业名称：</span><input type="text" v-model="business_name" maxlength="32" disabled></p>
            <p><span>税号：</span><input type="text" v-model="credit_number" maxlength="24" disabled></p>
            <p><span>联系人：</span><input type="text" v-model="changeInfoData.contacts" maxlength="32" :disabled="isDisabled"></p>
            <p><span>联系方式：</span><input type="text" v-model="changeInfoData.tel" maxlength="11" :disabled="isDisabled"></p>
            <p><span>出票账号：</span><input type="text" v-model="changeInfoData.bank_account" maxlength="24" :disabled="isDisabled"></p>
            <p><span>支付总额：</span><input type="text" v-model="changeInfoData.value" maxlength="16" :disabled="isDisabled">（元）</p>
            <p><span>支付费用：</span><input type="text" v-model="changeInfoData.cost" maxlength="16" :disabled="isDisabled">（元）</p>
          </div>
          <div class="c_cash_info_part c_cash_info_right">
            <h4>收款（收票）企业信息</h4>
            <p><span>企业名称：</span><input type="text" v-model="changeInfoData.management_to" maxlength="32" :disabled="isDisabled"></p>
            <p><span>税号：</span><input type="text" v-model="changeInfoData.partner_credit_number" maxlength="24" :disabled="isDisabled"></p>
            <p><span>联系人：</span><input type="text" v-model="changeInfoData.partner_contacts" maxlength="32" :disabled="isDisabled"></p>
            <p><span>联系方式：</span><input type="text" v-model="changeInfoData.partner_tel" maxlength="11" :disabled="isDisabled"></p>
            <p><span>收票账号：</span><input type="text" v-model="changeInfoData.partner_bank_account" maxlength="24" :disabled="isDisabled"></p>
            <div class="c_opera_box">
              <a class="c_tip_btn" @click="handleDisabled" :class="[btnDisabled ? 'active' : '']" v-if="!isDisabled">{{btnDisabled ? '已提醒' : '提醒'}}</a>
            </div>
          </div>
        </div>
        <h3 class="c_cash_title">转移支付凭证</h3>
        <div class="c_upload_img">
          <div v-if="isDisabled">
            <img :title="item.name" v-for="(item, index) in imgUrlData" :key="index" :src="$root_url() + item.location" alt="凭证">
          </div>
          <el-upload
            v-if="!isDisabled"
            :action="upLoadUrl"
            :http-request="upLoad"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-remove="handleRemove"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleImg">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="c_check_way">
          <div class="c_op_btn"><a @click="addCash" v-if="!isDisabled">+ 添加转移支付池</a></div>
          <div class="c_cash_box">
            <div class="c_cash_item" v-for="(item, index) in checkedData" :key="index">
              <div class="c_cash_item_title">
                <span class="c_ticket">融资票据：{{item.invoice_name}} 发票编号：{{item.invoice_code}}</span>
                <span class="c_sure">
                  <!-- <span>债权人确认：<i></i></span>
                  <span>债务人确认：<i :class="[item.verified ? 'active' : '']"></i></span>
                  <span>促保贷确权：<i :class="[item.fund_name ? 'active' : '']"></i></span> -->
                </span>
                <!-- 完成时查看显示 -->
                <span class="c_delete" v-if="!isDisabled" @click="handleDelete(item.id)"><img src="../../../static/img/debet/rubbish.png" alt=""></span>
              </div>
              <div class="c_cash_item_sec_line">
                <span>支付名称：{{item.payment_name}}</span>
                <span>支付类型：{{item.payment_type === '1' ? '现金' : item.payment_type === '2' ? '支票' : item.payment_type === '3' ? '银行承兑汇票' : item.payment_type === '4' ? '商业承兑汇票' : '信用证'}}</span>
                <span>支付金额：{{item.payment_value}}（元）</span>
                <span>支付票据账期：{{item.payment_date}}</span>
              </div>
              <div class="c_cash_item_thi_line">
                <span>交易合同：{{item.contract_name}}</span>
                <span>交易公司：{{item.partner_business_name}}</span>
              </div>
            </div>
          </div>
          <div class="c_opera_box">
            <!-- <a>返回</a> -->
            <a @click="sureChangePay" v-if="!isDisabled">确认</a>
            <a @click="sureGiveBack" v-if="isDisabled">退票</a>
          </div>
        </div>
      </div>
      <div class="c_sure_bottom" v-show="showBottom">
        <h3>{{titleName}}<span>请务必保证您填写的手机号准确无误，否则可能造成获取验证码失败</span></h3>
        <div class="c_code_box">
          <p class="c_phone_title">系统刚刚通过短信将一个6位数的验证码发送到了以下号码：<span class="orange">{{userCode}}</span></p>
          <p>
            <input type="text" placeholder="请输入验证码" v-model="vcode">
            <a @click="getCode">{{buttonName}}</a>
            <span class="orange c_change_email" @click="changeWay">{{wayType ? '切换到邮箱' : '切换到手机'}}</span>
          </p>
          <div class="c_opera_box">
            <a @click="goback">返回</a>
            <a v-if="!isDisabled" @click="sureOperation">确认</a>
            <a v-if="isDisabled" @click="sureBack">确认</a>
          </div>
        </div>
      </div>
      <el-dialog title="转移支付池" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <div class="c_cash_box">
          <div class="c_cash_item" v-for="(item, index) in selectData" :key="index">
            <div class="c_cash_item_title">
              <span class="c_ticket"><input :checked="item.sel" @change="item.sel = !item.sel" class="c_check_input" type="checkbox">融资票据：{{item.invoice_name}} 发票编号：{{item.invoice_code}}</span>
              <span class="c_sure">
                <span>法人确认：<i></i></span>
                <span>交易企业确权：<i :class="[item.verified ? 'active' : '']"></i></span>
                <span>促保贷确权：<i :class="[item.fund_name ? 'active' : '']"></i></span>
              </span>
              <!-- <span class="c_delete"><img src="../../../static/img/debet/rubbish.png" alt=""></span> -->
            </div>
            <div class="c_cash_item_sec_line">
              <span>支付名称：{{item.payment_name}}</span>
              <span>支付类型：{{item.payment_type === '1' ? '现金' : item.payment_type === '2' ? '支票' : item.payment_type === '3' ? '银行承兑汇票' : item.payment_type === '4' ? '商业承兑汇票' : '信用证'}}</span>
              <span>支付金额：{{item.payment_value}}（元）</span>
              <span>支付票据账期：{{item.payment_date}}</span>
            </div>
            <div class="c_cash_item_thi_line">
              <span>交易合同：{{item.contract_name}}</span>
              <span>交易公司：{{item.partner_business_name}}</span>
            </div>
          </div>
        </div>
        <div class="c_opera_box">
          <!-- <a>返回</a> -->
          <a @click="sureSelect">确定</a>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Location from '../location/location'
import getTopStep from './creditTop'
// import AppNav from '../financing/financingManege'
export default {
  name: 'debtCheck',
  data () {
    return {
      step: {
        selIndex: 6
      },
      showBottom: false,
      payData: {
        payInput: ''
      },
      getData: {
        getInput: ''
      },
      business_name: '',
      credit_number: '',
      changeInfoData: {
        contacts: '',
        partner_contacts: '',
        bank_account: '',
        partner_credit_number: '',
        partner_bank_account: '',
        tel: '',
        management_to: '',
        cost: '',
        partner_tel: '',
        value: ''
      },
      btnDisabled: false,
      dialogVisible: false,
      checkedData: [],
      selectData: [],
      selectIdArr: [],
      // queren 
      buttonName: '获取验证码',
      wayType: true,
      userCode: '',
      time: 60,
      oldTelNum: '',
      oldEmail: '',
      titleName: '',
      vcode: '',
      isDisabled: false,
      // 上传证明
      dialogVisibleImg: false,
      upLoadUrl: '',
      dialogImageUrl: '',
      imgUrlData: [],
      attachment_list: []
    }
  },
  components: {
    // AppNav, 
    Location, getTopStep
  },
  beforeCreate () {
    if (this.$route.query.jumpFrom === 'detail') {
      this.location = [
        {
          title: '债权处置',
          url: '/creditDeal'
        }, 
        {
          title: '债权处置详情',
          url: '/creditDetail'
        }, 
        {
          title: '转移支付'
        }
      ]
    } else if (this.$route.query.state === 'finish') {
      this.location = [
        {
          title: '债权处置',
          url: '/creditDeal'
        },
        {
          title: '转移支付'
        }
      ]
    } else {
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
          title: '转移支付'
        }
      ]
    }
  },
  methods: {
    handleDisabled () {
      this.btnDisabled = true
    },
    // 上传图片
    upLoad() {
      var that = this
      var fileObj = new FormData()
      var file = that.file
      // console.log(file)
      var type = that.file.name.substring(that.file.name.indexOf('.')+1, that.file.name.length)
      fileObj.append('pic_name', file.name)
      fileObj.append('management_reason', file)
      fileObj.append('token', this.$token())
      fileObj.append('type', type)
      this.$ajax.post('/api/claims_debt/claims/management_attachment/', fileObj).then(res => {
        // console.log(res)
        if (res.data.code === '1') {
          this.attachment_list.push(res.data.att_id)
          // console.log(this.attachment_list)
        } else {
          that.$message.error('文件有误，请重新上传!')
          that.$loading(that.$setLoading()).close()
        }
      })
    },
    uploadSuccess (res, file, fileList) {
      // fileList.length > 1 ? fileList.splice(0, 1) : null
      // console.log(this.voucher)
    },
    handleRemove(file, fileList) {
      var that = this
      // console.log(file, fileList)
      fileList.map((item, index) => {
        if (file.uid === item.uid) {
          that.attachment_list.splice(index, 1)
          return
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisibleImg = true
    },
    beforeAvatarUpload (file) {
      this.file = file
      const isJPG = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size < 4 * 1024 * 1024
      if (!isJPG) {
        this.$message.error('只能是 JPG、JPEG或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('大小不能超过 4MB!')
      }
      return isJPG && isLt2M
    },
    addCash () {
      this.dialogVisible = true
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&exclude_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.selectData = res.data.data.can_manage.claim_list
          this.selectData.forEach(val => {
            val.sel = 0
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 确认转移
    sureChangePay () {
      var that = this
      if (!(that.changeInfoData.contacts.trim())) {
        that.$message.error('请输入本方联系人')
      } else if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/).test(that.changeInfoData.tel.trim())) {
        that.$message.error('请输入正确的支付企业联系方式')
      } else if (!(/^[0-9]+$/).test(that.changeInfoData.bank_account.trim())) {
        that.$message.error('请输入正确的付款账号')
      } else if (!(/^\d+(\.\d{1,2})?$/.test(that.changeInfoData.value))) {
        that.$message.error('请输入正确格式的转移支付总额')
      } else if (!(/^\d+(\.\d{1,2})?$/.test(that.changeInfoData.cost))) {
        that.$message.error('请输入正确格式的转移支付成本')
      } else if (!(that.changeInfoData.management_to.trim())) {
        that.$message.error('请输入收款企业名称')
      } else if (!(/^[0-9a-zA-Z]+$/).test(that.changeInfoData.partner_credit_number)) {
        that.$message.error('请填写正确税号')
      } else if (!(that.changeInfoData.partner_contacts.trim())) {
        that.$message.error('请输入对方联系人')
      } else if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/).test(that.changeInfoData.partner_tel.trim())) {
        that.$message.error('请输入正确的收款企业联系方式')
      } else if (!(/^[0-9]+$/).test(that.changeInfoData.partner_bank_account.trim())) {
        that.$message.error('请输入正确的收款账号')
      } else if (this.attachment_list.length < 2) {
        that.$message.error('请上传至少两张凭证')
      } else if (this.selectIdArr.length < 1) {
        that.$message.error('请选择转移支付池')
      } else {
        this.showBottom = true
        this.titleName = '票据支付确认'
        this.$ajax.get('/api/account_info/?token=' + this.$token()).then(res => {
          if (res.data.code === '1') {
            this.oldTelNum = res.data.data.phone
            this.oldEmail = res.data.data.email
            this.userCode = this.oldTelNum
          }
        })
      }
    },
    // 确定选中的贴现item
    sureSelect (item) {
      this.selectData.forEach(val => {
        if (val.sel) {
          this.selectIdArr.push(val.id)
        }
      })
      // // console.log(this.selectIdArr)
      // 获取已选中的item
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.dialogVisible = false
          this.checkedData = res.data.data.can_manage.claim_list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 删除
    handleDelete (id) {
      if (Number(id) === Number(this.$route.query.id)) {
        this.$message.error('此票据已选择为贴现票据，暂不能删除')
        return
      }
      this.selectIdArr.splice(this.selectIdArr.indexOf(id), 1)
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.dialogVisible = false
          this.checkedData = res.data.data.can_manage.claim_list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 退票确认
    sureGiveBack () {
      this.showBottom = true
      this.titleName = '退票确认'
      this.$ajax.get('/api/account_info/?token=' + this.$token()).then(res => {
        if (res.data.code === '1') {
          this.oldTelNum = res.data.data.phone
          this.oldEmail = res.data.data.email
          this.userCode = this.oldTelNum
        }
      })
    },
    // 短信验证
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
          var data= {}
          data.token = this.$token()
          data.management_type = 2
          data.claim_list = this.selectIdArr
          data.attachment_list = this.attachment_list
          data.chain_list = []
          // this.$ajax.patch('/api/claims_debt/claims/management/', {...this.changeInfoData, token: this.$token(), claim_list: strArr}).then(res => {
          this.$ajax.put('/api/claims_debt/claims/management/', {...data, ...this.changeInfoData}).then(res => {
            if (res.data.code === '1') {
              this.$message.success('发布成功')
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
    sureBack () {
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
      this.showBottom = false
    }
  },
  mounted () {
    // 已处置完成的查看
    if (this.$route.query.state === 'finish') {
      this.isDisabled = true
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&management=1' + '&id=' + this.$route.query.id).then(res => {
        if (res.data.code === '1') {
          this.imgUrlData = res.data.data.attachment
          this.business_name = res.data.business_name
          this.credit_number = res.data.data.credit_number
          this.changeInfoData.contacts = res.data.data.contacts
          this.changeInfoData.partner_contacts = res.data.data.partner_contacts
          this.changeInfoData.partner_credit_number = res.data.data.partner_credit_number
          this.changeInfoData.partner_bank_account = res.data.data.partner_bank_account
          this.changeInfoData.bank_account = res.data.data.bank_account
          this.changeInfoData.value = res.data.data.value
          this.changeInfoData.management_to = res.data.data.management_to
          this.changeInfoData.cost = res.data.data.cost
          this.changeInfoData.tel = res.data.data.tel
          this.changeInfoData.partner_tel = res.data.data.partner_tel
          this.checkedData = res.data.data.claim_list
        } else {
          this.$message.error(res.data.msg)
        }
      })
      return
    }
    if (this.$route.query.jumpFrom === 'detail') {
      // 把详情页的id添加到已选中的数组中 用id_list字段获取已选中，用exclude_list字段获取除选中之外的
      this.selectIdArr[0] = Number(this.$route.query.id)
      var strArr = JSON.stringify(this.selectIdArr)
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.business_name = res.data.business_name
          this.credit_number = res.data.my_credit_number
          this.checkedData = res.data.data.can_manage.claim_list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    } else {
      var strArr = JSON.stringify([])
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + strArr).then(res => {
        if (res.data.code === '1') {
          this.business_name = res.data.business_name
          this.credit_number = res.data.my_credit_number
          this.checkedData = res.data.data.can_manage.claim_list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.c_credit_operator_box{
  width: 100%;
  height: 100%;
  display: flex;
  .c_credit_operator_right{
    background: #f4f7f8;
    height: 100%;
    font-size: 14px;
    width: 100%;
    .c_top_location{
      background: #fff;
      border-bottom: 1px solid #ccc;
    }
    .c_opera_bottom{
      background: #f4f7f8;
      padding: 20px 30px;
      .c_top_form{
        background: #fff;
        border: 1px solid #e1e6f0;
        height: 122px;
        width: 100%;
        border-radius: 4px;
        .c_input_p{
          line-height: 55px;
          padding: 0 20px;
          span{
            margin-right: 10px;
          }
          input{
            width: 300px;
            border: 1px solid #e1e6f0;
            outline: none;
            height: 38px;
            border-radius: 4px;
            padding: 3px 10px;
          }
        }
      }
      .c_cash_title{
        margin: 30px 0;
        border-left: 4px solid #eb6100;
        padding-left: 10px;
        font-weight: bold;
        color: #333;
      }
      .c_upload_img{
        width: 80%;
        margin: 40px auto;
        padding: 50px;
        border: 1px dashed #ccc;
        text-align: center;
        img{
          display: inline-block;
          width: 300px;
          border: 1px solid #ccc;
          height: 300px;
          margin: 20px;
        }
      }
      .c_cash_info{
        background: #fff;
        border: 1px solid #e1e6f0;
        border-radius: 4px;
        display: flex;
        .c_cash_info_part{
          width: 40%;
          &.c_cash_info_right{
            .c_opera_box{
              text-align: left;
              margin-left: 50px;
            }
          }
          h4{
            line-height: 56px;
            margin-left: 50px;
            font-weight: bold;
            color: #333;
          }
          p{
            height: 56px;
            padding-left: 50px;
            span{
              display: inline-block;
              width: 100px;
              // text-align: right;
            }
            input{
              width: 220px;
              border: 1px solid #e1e6f0;
              outline: none;
              height: 32px;
              border-radius: 4px;
              padding: 3px 10px;
              margin-left: 5px;
              &:disabled{
                background: #f5f7fa;
              }
            }
          }
        }
      }
      .c_check_way{
        width: 100%;
        .c_op_btn{
          margin: 30px auto;
          // text-align: center;
          a{
            display: inline-block;
            width: 150px;
            padding: 10px 0;
            background: #eb6100;
            border-radius: 4px;
            cursor: pointer;
            color: #fff;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
    .c_opera_box{
      text-align: center;
      margin: 30px 0;
      .c_tip_btn{
        &.active{
          background: #ccc;
          border: 1px solid #ccc;;
        }
      }
      a{
        display: inline-block;
        width: 110px;
        padding: 10px 0;
        background: #eb6100;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border: 1px solid #eb6100;
        // &:nth-of-type(1){
        //   border: 1px solid #eb6100;
        //   background: #fff;
        //   color: #eb6100;
        //   margin-right: 100px;
        // }
      }
        }
    .c_cash_box{
      .c_cash_item{
        margin: 20px 0;
        background: #fff;
        border: 1px solid #e1e6f0;
        .c_cash_item_title{
          background: rgba(204,204,204,0.20);
          line-height: 48px;
          height: 48px;
          padding: 0 50px;
          span{
            display: inline-block;
          }
          .c_ticket{
            width: 45%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .c_check_input{
              width: 18px;
              height: 18px;
              vertical-align: middle;
              margin-right: 10px;
            }
          }
          .c_sure{
            width: 45%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              margin: 0 5px;
              i{
                width: 50px;
                vertical-align: middle;
                height: 22px;
                display: inline-block;
                background: url('../../../static/img/debet/noconfirm.png') no-repeat;
                background-size: 50px 22px;
                &.active{
                  background: url('../../../static/img/debet/confirm2.png') no-repeat;
                  background-size: 50px 22px;
                }
              }
              &:nth-of-type(1) i{
                background: url('../../../static/img/debet/confirm1.png') #fff no-repeat;
                background-size: 50px 22px;
              }
            }
          }
          .c_delete{
            width: 9%;
            text-align: right;
            overflow: hidden;
            img{
              cursor: pointer;
              width: 16px;
              height: 16px;
              vertical-align: middle;
            }
          }
        }
        .c_cash_item_sec_line{
          display: flex;
          margin: 0 50px;
          border-bottom: 1px dashed #ccc;
          line-height: 48px;
          span{
            display: inline-block;
            width: 25%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 5px;
          }
        }
        .c_cash_item_thi_line{
          line-height: 48px;
          margin: 0 50px;
          display: flex;
          span{
            display: inline-block;
            width: 33%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 5px;
          }
        }
      }
    }
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
</style>
