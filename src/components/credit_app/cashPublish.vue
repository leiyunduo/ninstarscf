<template>
  <div class="c_credit_operator_box">
    <!-- <appNav :father='{selIndex: 6}' type='1'></appNav> -->
    <div class="c_credit_operator_right">
      <div class="c_top_location"><location :location='location'></location></div>
      <div class="c_opera_bottom">
        <getTopStep :activeStep='3'></getTopStep>
        <div class="c_check_way">
          <h3 class="c_cash_title">贴现信息</h3>
          <div class="c_cash_info">
            <div class="c_cash_info_part c_cash_info_left">
              <p><span>票据金额：</span><input type="text" v-model="sum" disabled></p>
              <p><span>企业名称：</span><input type="text" v-model="business_name"  disabled></p>
              <p><span>税号：</span><input type="text" v-model="credit_number" maxlength="24" disabled></p>
              <p><span>联系人：</span><input type="text" v-model="cashInfoData.contacts" maxlength="32" :disabled="isDisabled"></p>
              <p><span>联系方式：</span><input type="text" v-model="cashInfoData.tel" maxlength="11" :disabled="isDisabled"></p>
              <p><span>收款账号：</span><input type="text" v-model="cashInfoData.bank_account" maxlength="24" :disabled="isDisabled"></p>
              <p><span>贴现成本：</span><input type="text" v-model="cashInfoData.cost" maxlength="16" :disabled="isDisabled">（元）</p>
              <p>
                <span>贴现时间：</span>
                <el-date-picker
                  v-model="cashInfoData.discount_date"
                  type="date"
                   :disabled="isDisabled"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </p>
            </div>
            <div class="c_cash_info_part c_cash_info_right">
              <p><span>贴现金额：</span><input type="text" v-model="cashInfoData.value" maxlength="16" :disabled="isDisabled">（元）</p>
              <p><span>贴现金融机构：</span><input type="text" v-model="cashInfoData.management_to" maxlength="32" :disabled="isDisabled"></p>
              <p><span>税号：</span><input type="text" v-model="cashInfoData.partner_credit_number" maxlength="24" :disabled="isDisabled"></p>
              <p><span>联系人：</span><input type="text" v-model="cashInfoData.partner_contacts" maxlength="32" :disabled="isDisabled"></p>
              <p><span>联系方式：</span><input type="text" v-model="cashInfoData.partner_tel" maxlength="11" :disabled="isDisabled"></p>
              <p><span>放款账号：</span><input type="text" v-model="cashInfoData.partner_bank_account" maxlength="24" :disabled="isDisabled"></p>
              <p><span>贴现利率：</span><input type="text" v-model="cashInfoData.interest_rate" placeholder="示例：12.3" :disabled="isDisabled">%</p>
            </div>
          </div>
          <h3 class="c_cash_title">贴现凭证</h3>
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
          <h3 class="c_cash_title">应收融资总览</h3>
          <div class="c_ticket_box">
            <div>
              <p class="c_ticket_title">贴现池：{{toThousands(sum)}}（元）</p>
              <p><img src="../../../static/img/tickets/jq01.png" alt="">{{ticketData.gold_count}}张</p>
              <p><img src="../../../static/img/tickets/yq01.png" alt="">{{ticketData.silver_count}}张</p>
              <p><img src="../../../static/img/tickets/tq01.png" alt="">{{0}}张</p>
            </div>
            <div>
              <p class="c_ticket_title">资金用途缺口：</p>
              <p><img src="../../../static/img/tickets/ht01.png" alt="">{{ticketData.ninstar_bank_ticket}}张</p>
              <p><img src="../../../static/img/tickets/ht001.png" alt="">{{ticketData.ninstar_business_ticket}}张</p>
              <p><img src="../../../static/img/tickets/bt01.png" alt="">{{ticketData.ninstar_digital_ticket}}张</p>
            </div>
          </div>
          <getTop :isShowNum="isShowNum" :isShowUp="isShowUp" :valueData="valueData"></getTop>
          <div class="c_cash_box">
            <div class="c_cash_item" v-for="(item, index) in checkedCashData" :key="index">
              <div class="c_cash_item_title">
                <span class="c_ticket">融资票据：{{item.invoice_name}} 发票编号：{{item.invoice_code}}</span>
                <span class="c_sure">
                  <!-- <span>债权人确认：<i></i></span>
                  <span>债务人确认：<i :class="[item.verified ? 'active' : '']"></i></span>
                  <span>促保贷确权：<i :class="[item.fund_name ? 'active' : '']"></i></span> -->
                </span>
                <span class="c_delete"><a @click="jumpDetail(item.id)">债权详情</a></span>
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
            <div class="c_empty_accessory" v-if="checkedCashData.length === 0">暂无数据</div>
          </div>
          <h3 class="c_cash_for_title"><span>贴现用途</span><a @click="handleShow">{{isExpand ? '收起' : '展开'}}</a></h3>
          <div class="c_cash_for_box" v-show="isExpand">
            <div class="c_cash_item" v-for="(item, index) in checkedForData" :key="index">
              <template v-if="item.type === '1'">
                <div class="c_cash_item_title">
                  <span class="c_ticket">
                    <span>合同：{{item.receivable_contract[0].name}}</span>
                    <span>编号：{{item.receivable_contract[0].number}}</span>
                    <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                  </span>
                  <span class="c_sure">
                    <span><i></i>{{item.ticket_dict.receivable.ninstar_bank_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.receivable.ninstar_business_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.receivable.ninstar_digital_ticket.number}}张</span>
                  </span>
                </div>
                <div class="c_cash_item_sec_line">
                  <span>资金缺口</span>
                  <span>应付款</span>
                  <span>已付款</span>
                  <span>订金</span>
                </div>
                <div class="c_cash_item_thi_line">
                  <span>{{toThousands(item.payable_contract.funding_gap)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.contract_value)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.paid)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.deposit)}}（元）</span>
                </div>
              </template>
              <template v-if="item.type === '2'">
                <div class="c_cash_item_title">
                  <span class="c_ticket">
                    <span>合同：{{item.payable_contract.name}}</span>
                    <span>编号：{{item.payable_contract.number}}</span>
                    <span>交易公司：{{item.payable_contract.partner_business}}</span>
                  </span>
                  <span class="c_sure">
                    <span><i></i>{{item.ticket_dict.payable.ninstar_bank_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.payable.ninstar_business_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.payable.ninstar_digital_ticket.number}}张</span>
                  </span>
                </div>
                <div class="c_cash_item_sec_line">
                  <span>资金缺口</span>
                  <span>应付款</span>
                  <span>已付款</span>
                  <span>订金</span>
                </div>
                <div class="c_cash_item_thi_line">
                  <span>{{toThousands(item.payable_contract.funding_gap)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.contract_value)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.paid)}}（元）</span>
                  <span>{{toThousands(item.payable_contract.deposit)}}（元）</span>
                </div>
              </template>
              <!-- 已经处置的详情 -->
              <template v-if="!item.type">
                <div class="c_cash_item_title">
                  <span class="c_ticket">
                    <span>合同：{{item.name}}</span>
                    <span>编号：{{item.number}}</span>
                    <span>交易公司：{{item.partner}}</span>
                  </span>
                  <span class="c_sure">
                    <span><i></i>{{item.ticket_dict.payable.ninstar_bank_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.payable.ninstar_business_ticket.number}}张</span>
                    <span><i></i>{{item.ticket_dict.payable.ninstar_digital_ticket.number}}张</span>
                  </span>
                </div>
                <div class="c_cash_item_sec_line">
                  <span>资金缺口</span>
                  <span>应付款</span>
                  <span>已付款</span>
                  <span>订金</span>
                </div>
                <div class="c_cash_item_thi_line">
                  <span>{{toThousands(item.funding_gap)}}（元）</span>
                  <span>{{toThousands(item.contract_value)}}（元）</span>
                  <span>{{toThousands(item.paid_value)}}（元）</span>
                  <span>{{toThousands(item.deposit_value)}}（元）</span>
                </div>
              </template>
            </div>
            <div class="c_empty_accessory" v-if="checkedForData.length === 0">暂无数据</div>
          </div>
          <div class="c_opera_box">
            <a v-if="!isDisabled" @click="cashPublish">确认发布</a>
            <a v-if="isDisabled" @click="cashGiveBack">退票</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Location from '../location/location'
import getTopStep from './creditTop'
// import AppNav from '../financing/financingManege'
import getTop from '../financing/finaceTop'
export default {
  name: 'debtCheck',
  data () {
    return {
      step: {
        selIndex: 6
      },
      sum: '',
      business_name: '',
      credit_number: '',
      cashInfoData: {
        contacts: '',
        partner_contacts: '',
        bank_account: '',
        partner_bank_account: '',
        discount_date: '',
        management_to: '',
        value: '',
        cost: '',
        partner_credit_number: '',
        interest_rate: '',
        partner_tel: '',
        tel: ''
      },
      ticketData: {
        gold_count: 0,
        silver_count: 0,
        ninstar_bank_ticket: 0,
        ninstar_business_ticket: 0,
        ninstar_digital_ticket: 0
      },
      isExpand: false,
      isShowNum: false,
      isShowUp: false,
      valueData: {},
      dialogVisible: false,
      checkedCashData: [],
      checkedForData: [],
      selectCashId: [],
      selectForId: [],
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
    Location, getTopStep, getTop
  },
  beforeCreate () {
    if (this.$route.query.state === 'finish') {
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
          title: '债权处置用途',
          url: '/cashFor?selectId=' + this.$route.query.selectCashId,
        },
        {
          title: '贴现'
        }
      ]
    }
  },
  methods: {
    handleShow () {
      this.isExpand = !this.isExpand
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
    // 确认发布
    cashPublish () {
      var that = this
      if (!(that.cashInfoData.contacts.trim())) {
        that.$message.error('请输入本方联系人')
      } else if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/).test(that.cashInfoData.tel.trim())) {
        that.$message.error('请输入正确的支付企业联系方式')
      } else if (!(/^[0-9]+$/).test(that.cashInfoData.bank_account)) {
        that.$message.error('请填写收款账号，格式为数字')
      } else if (!(/^\d+(\.\d{1,2})?$/.test(that.cashInfoData.cost))) {
        that.$message.error('请输入正确格式的贴现成本')
      } else if (!(/^[0-9]+([.]{1}[0-9]+){0,1}$/).test(that.cashInfoData.value)) {
        that.$message.error('请填写贴现金额，格式为数字')
      } else if (!(/^[0-9]*$/).test(that.cashInfoData.partner_bank_account)) {
        that.$message.error('请填写放款账号，格式为数字')
      } else if (!that.cashInfoData.management_to) {
        that.$message.error('请填写贴现金融机构')
      } else if (!(/^[0-9a-zA-Z]+$/).test(that.cashInfoData.partner_credit_number)) {
        that.$message.error('请填写正确税号')
      } else if (!(that.cashInfoData.partner_contacts.trim())) {
        that.$message.error('请输入对方联系人')
      } else if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/).test(that.cashInfoData.partner_tel.trim())) {
        that.$message.error('请输入正确的收款企业联系方式')
      } else if (!(/^([1-9]\d?(\.\d{1,2})?|100)$/.test(that.cashInfoData.interest_rate))) {
        that.$message.error('请输入正确格式利率')
      } else if (!(that.cashInfoData.discount_date)) {
        that.$message.error('请选择还款日期')
      } else if (this.attachment_list.length < 2) {
        that.$message.error('请上传至少两张凭证')
      } else {
        var data= {}
        data.token = this.$token()
        data.management_type = 1
        data.claim_list = JSON.parse(this.selectCashId)
        data.chain_list = JSON.parse(this.selectForId)
        data.attachment_list = this.attachment_list
        this.$ajax.put('/api/claims_debt/claims/management/', {...data, ...this.cashInfoData}).then(res => {
          if (res.data.code === '1') {
            this.$message.success('发布成功')
            this.$router.push({
              path: '/creditDeal'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    jumpDetail (id) {
      this.$router.push({
        path: '/creditDetail',
        query: {
          id: id,
          isJump: 1
        }
      })
    },
    // 退票
    cashGiveBack () {
      this.$router.push({
        path: '/sureOperation',
        query: {
          id: this.$route.query.id,
          type: 'cancelTicket'
        }
      })
    }
  },
  mounted () {
    // // console.log(this.$route.query.selectForId)
    // // console.log(this.$route.query.selectCashId)
    // 已处置完成的查看
    if (this.$route.query.state === 'finish') {
      this.isDisabled = true
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&management=1' + '&id=' + this.$route.query.id).then(res => {
        if (res.data.code === '1') {
          this.checkedCashData = res.data.data.claim_list
          this.checkedForData = res.data.data.chain_list
          this.imgUrlData = res.data.data.attachment
          this.cashInfoData.value = res.data.data.value
          this.cashInfoData.cost = res.data.data.cost
          this.cashInfoData.tel = res.data.data.tel
          this.cashInfoData.contacts = res.data.data.contacts
          this.cashInfoData.partner_contacts = res.data.data.partner_contacts
          this.cashInfoData.partner_tel = res.data.data.partner_tel
          this.cashInfoData.bank_account = res.data.data.bank_account
          this.cashInfoData.bank_account = res.data.data.bank_account
          this.cashInfoData.partner_credit_number = res.data.data.partner_credit_number
          this.business_name = res.data.data.business_name
          this.credit_number = res.data.data.credit_number
          this.cashInfoData.partner_bank_account = res.data.data.partner_bank_account
          this.cashInfoData.management_to = res.data.data.management_to
          this.cashInfoData.interest_rate = res.data.data.interest_rate
          this.cashInfoData.discount_date = res.data.data.discount_date
          this.ticketData.gold_count = res.data.data.ticket_list.ticket.gold_sum
          this.ticketData.silver_count = res.data.data.ticket_list.ticket.silver_sum
          this.ticketData.ninstar_bank_ticket = res.data.data.ticket_list.bar.ninstar_bank_ticket.number
          this.ticketData.ninstar_business_ticket = res.data.data.ticket_list.bar.ninstar_business_ticket.number
          this.ticketData.ninstar_digital_ticket = res.data.data.ticket_list.bar.ninstar_digital_ticket.number
          this.sum = res.data.data.payment_value
        } else {
          this.$message.error(res.data.msg)
        }
      })
      return
    }
    this.selectCashId = this.$route.query.selectCashId
    this.selectForId = this.$route.query.selectForId
    // 获取贴现发票
    // var strCashArr = JSON.stringify(this.selectCashId)
    // var strCashArr = JSON.parse(this.selectCashId)
    this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&id_list=' + this.selectCashId).then(res => {
      if (res.data.code === '1') {
        this.checkedCashData = res.data.data.can_manage.claim_list
        this.ticketData.gold_count = res.data.data.can_manage.gold_count
        this.ticketData.silver_count = res.data.data.can_manage.silver_count
        this.sum = res.data.data.can_manage.sum
        this.business_name = res.data.business_name
        this.credit_number = res.data.my_credit_number
      } else {
        this.$message.error(res.data.msg)
      }
    })
    // 获取贴现用途
    // var strForArr
    // this.selectForId ? strForArr = JSON.stringify(this.selectForId) : strForArr = JSON.stringify([])
    // this.selectForId ? strForArr = JSON.parse(this.selectForId) : strForArr = JSON.parse([])
    this.$ajax.get('/api/claims_debt/claims/discount_chain/?token=' + this.$token() + '&id_list=' + this.selectForId).then(res => {
      if (res.data.code === '1') {
        this.checkedForData = res.data.data
        // 红黄白条的数量
        if (res.data.data.length !== 0) {
          this.ticketData.ninstar_bank_ticket = res.data.ticket_list.ninstar_bank_ticket.number
          this.ticketData.ninstar_business_ticket = res.data.ticket_list.ninstar_business_ticket.number
          this.ticketData.ninstar_digital_ticket = res.data.ticket_list.ninstar_digital_ticket.number
        }
      } else {
        this.$message.error(res.data.msg)
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
    .c_empty_accessory{
      height: 48px;
      font-size: 14px;
      line-height: 48px;
      color: #999;
      text-align: center;
    }
    .c_opera_bottom{
      background: #f4f7f8;
      padding: 20px 30px;
      .c_check_way{
        width: 100%;
        background: #fff;
        padding: 20px;
        margin: 50px 0;
        box-shadow:0 2px 5px 4px rgba(231,231,231,0.50);
        .c_cash_title{
          margin: 30px 0;
          border-left: 4px solid #eb6100;
          padding-left: 10px;
          font-weight: bold;
          color: #333;
        }
        .c_ticket_box{
          width: 100%;
          display: flex;
          line-height: 48px;
          border: 1px solid #e1e6f0;
          text-align: center;
          div{
            width: 50%;
            &:nth-of-type(1){
              p{
                margin-right: 0;
              }
            }
            &:nth-of-type(2){
              p{
                margin-left: 0;
              }
            }
            p{
              margin: 0 20px;
              border-bottom: 1px dashed #ccc;
              img{
                width: 28px;
                margin: 0 15px;
                vertical-align: middle;
              }
              &:nth-of-type(4){
                border-bottom: 0;
              }
            }
          }
          .c_ticket_title{
            background: #f4f4f4;
            margin: 0;
            border: none;
          }
        }
        .c_cash_box{
          min-height: 160px;
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
                a{
                  color: #eb6100;
                  font-size: 14px;
                  margin-right: 15px;
                  cursor: pointer;
                  text-decoration: underline;
                }
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
        .c_cash_for_title{
          border-bottom: 1px solid #ccc;
          padding: 10px 0;
          margin: 20px 0;
          span{
            border-left: 4px solid #eb6100;
            padding-left: 10px;
          }
          a{
            cursor: pointer;
            float: right;
            margin-right: 10px;
            color: #eb6100;
            text-decoration: underline;
            font-weight: normal;
          }
        }
        .c_cash_info{
          display: flex;
          padding-top: 20px;
          .c_cash_info_part{
            width: 40%;
            p{
              padding-left: 50px;
              height: 56px;
              span{
                display: inline-block;
                width: 100px;
                // text-align: right;
              }
              input{
                width: 220px;
                border: 1px solid #e1e6f0;
                outline: none;
                height: 38px;
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
        .c_opera_box{
          text-align: center;
          margin: 30px 0;
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
      }
    }
    .c_cash_for_box{
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
            width: 60%;
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
            width: 30%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
            span{
              margin: 0 10px;
              i{
                width: 18px;
                vertical-align: middle;
                height: 25px;
                display: inline-block;
              }
              &:nth-of-type(1) i{
                background: url('../../../static/img/tickets/ht01.png') #fff no-repeat;
                background-size: 18px 25px;
              }
              &:nth-of-type(2) i{
                background: url('../../../static/img/tickets/ht001.png') #fff no-repeat;
                background-size: 18px 25px;
              }
              &:nth-of-type(3) i{
                background: url('../../../static/img/tickets/bt01.png') #fff no-repeat;
                background-size: 18px 25px;
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
}
.el-date-editor {
  height: 38px;
  input.el-input__inner {
    width: 220px;
    border: 1px solid #e1e6f0;
    outline: none;
    height: 38px;
    border-radius: 4px;
    padding: 3px 10px;
    margin-left: 5px;
  }
}
    
</style>
