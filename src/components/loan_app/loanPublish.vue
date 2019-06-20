<template>
  <div class="loanPublish">
    <div class="loanPublish_box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="loanPublish_box_wrap">
        <div class="topNav">
          <location :location='location'></location>
        </div>
        <div class="mid_publish">
          <div class="deal_info">
            <span>贷款处置信息</span>
            <div class="deal_details">
              <div>
                <span>基本信息</span>
                <div class="deal_form">
                  <div class="deal_row">
                    <label for="">贷款金额(元):</label>
                    <input class="readonly" type="text" readonly  v-model = fromData.pay_total_val>
                  </div>
                  <div v-show="Number(fromData.type) === 1" class="deal_row">
                    <label for="">还款金额(元):</label>
                    <input type="text" id="pay_val" :class="Number(can_delete) === 1 ? 'readonly' : ''" v-model="fromData.pay_val">
                  </div>
                  <div v-show="Number(fromData.type) === 2" class="deal_row time">
                    <label for="">续贷期限:</label>
                    <el-date-picker id="pay_extend_time" :class="Number(can_delete) === 1 ? 'readonly' : ''" v-model="fromData.pay_extend_time" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </div>
                  <div class="deal_row time">
                    <label for="">贷款处置日期:</label>
                    <div :class="Number(can_delete) === 1 ? 'readonly' : ''" id="pay_time">
                      <el-date-picker  v-model="fromData.pay_time"  type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>              
                  </div>
                </div>
              </div>
              <div>
                <span>贷款企业信息</span>
                <div class="deal_form">
                  <div class="deal_row">
                    <label for="">企业名称:</label>
                    <input id="pay_buss" class="readonly" type="text"  v-model="fromData.pay_name">
                  </div>
                  <div class="deal_row">
                    <label for="">税号:</label>
                    <input type="text" id="pay_buss_code" class="readonly" v-model="fromData.bus_code_my">
                  </div>
                  <div class="deal_row">
                    <label for="">联系人:</label>
                    <input id="pay_man" class="readonly"  type="text" v-model="fromData.pay_man">
                  </div>
                  <div class="deal_row">
                    <label for="">联系方式:</label>
                    <input id="pay_phone" class="readonly" type="text" v-model="fromData.pay_phone">
                  </div>
                  <div class="deal_row">
                    <label for="">{{Number(fromData.type) === 1 ? '付款账号:' : '贷款账号:'}}</label>
                    <input type="text" id="pay_account" :class="Number(can_delete) === 1 ? 'readonly' : ''" v-model="fromData.pay_account">
                    <!-- <input type="text" :style="isEmpty.pay_account ? errorStyle.box: ''" :keyup="fromData.pay_account? (isEmpty.pay_account = false) : (isEmpty.pay_account = true)" v-model="fromData.pay_account">
                    <span class="warning" v-show="isEmpty.pay_account">*请填写支付账号</span> -->
                  </div>
                </div>
                <!-- <div @click="confirmBtn(1)" :class="[isDisable1 ? 'confirm active' : 'confirm']">{{isDisable1 ? '已确认':'确认' }}</div> -->
              </div>
              <div>
                <span v-if="Number(fromData.type) === 3">促保贷信息</span>
                <span v-else-if="Number(fromData.type) === 4">过桥机构信息</span>
                <span v-else>金融机构信息</span>
                <div class="deal_form">
                  <div class="deal_row">
                    <label for="">机构名称:</label>
                    <input type="text" id="pay_name_b" :title="fromData.pay_name_b" :class="Number(can_delete) === 1 ? 'readonly' : ''" v-model="fromData.pay_name_b">
                    <!-- <input type="text" :style="isEmpty.pay_name_b ? errorStyle.box: ''" :keyup="fromData.pay_name_b? (isEmpty.pay_name_b = false) : (isEmpty.pay_name_b = true)" v-model="fromData.pay_name_b">
                    <span class="warning" v-show="isEmpty.pay_name_b">*请填写企业名称</span> -->
                  </div>
                  <div class="deal_row">
                    <label for="">税号:</label>
                    <input type="text" id="bus_code_other" :class="Number(can_delete) === 1 ? 'readonly' : ''" v-model="fromData.bus_code_other">
                    <!-- <input type="text" :style="isEmpty.bus_code_other ? errorStyle.box: ''" :keyup="fromData.bus_code_other? (isEmpty.bus_code_other = false) : (isEmpty.bus_code_other = true)" v-model="fromData.bus_code_other">
                    <span class="warning" v-show="isEmpty.bus_code_other">*请填写税号</span> -->
                  </div>
                  <div class="deal_row">
                    <label for="">联系人:</label>
                    <input type="text" id="pay_man_b" :class="Number(can_delete) === 1 ? 'readonly' : ''" v-model="fromData.pay_man_b">
                    <!-- <input type="text" :style="isEmpty.pay_man_b ? errorStyle.box: ''" :keyup="fromData.pay_man_b? (isEmpty.pay_man_b = false) : (isEmpty.pay_man_b = true)" v-model="fromData.pay_man_b">
                    <span class="warning" v-show="isEmpty.pay_man_b">*请填写联系人</span> -->
                  </div>
                  <div class="deal_row">
                    <label for="">联系方式:</label>
                    <input type="text" id="pay_phone_b" :class="Number(can_delete) === 1 ? 'readonly' : ''" v-model="fromData.pay_phone_b">
                    <!-- <input type="text" :style="isEmpty.pay_phone_b ? errorStyle.box: ''" :keyup="fromData.pay_phone_b? (isEmpty.pay_phone_b = false) : (isEmpty.pay_phone_b = true)" v-model="fromData.pay_phone_b">
                    <span class="warning" v-show="isEmpty.pay_phone_b">*请填写联系方式</span> -->
                  </div>
                  <div class="deal_row">
                    <label for="" v-if="Number(fromData.type) === 1 || Number(fromData.type) === 2">收款账号:</label>
                    <label for="" v-if="Number(fromData.type) === 3 ">保贷账号:</label>
                    <label for="" v-if="Number(fromData.type) === 4 ">过桥账号:</label>
                    <input type="text" id="pay_account_b" :class="Number(can_delete) === 1 ? 'readonly' : ''" v-model="fromData.pay_account_b">
                    <!-- <input type="text" :style="isEmpty.pay_account_b ? errorStyle.box: ''" :keyup="fromData.pay_account_b? (isEmpty.pay_account_b = false) : (isEmpty.pay_account_b = true)" v-model="fromData.pay_account_b">
                    <span class="warning" v-show="isEmpty.pay_account_b">*请填写收款账号</span> -->
                  </div>
                </div>
                <div @click="confirmBtn(2)" class="confirm">提醒</div>
              </div>  
            </div>
            </div>
            <div class="deal_tickets">
              <div class="deal_titles">
                <span>即将处置的票据</span>
                <!-- <span>收起</span> -->
              </div>
              <div class="deal_table">
                <div class="c_cash_box">
                  <div class="c_cash_item" v-for="(item, index) in showDataList" :key="index">
                    <div class="c_cash_item_title">
                      <span class="c_ticket">融资单号：{{item.number}}</span>
                      <!-- <span class="c_sure">
                        <span>法人确认：<i></i></span>
                        <span>交易企业确权：<i></i></span>
                        <span>促保贷确权：<i></i></span>
                      </span> -->
                      <!-- <span @click="toDetail(item.id)" class="to_detail">查看详情</span> -->
                      <!-- <span v-if="can_delete !== 1 " @click="checkItem(item.id)" class="c_delete"><img src="../../../static/img/debet/rubbish.png" alt=""></span> -->
                    </div>
                    <div class="c_cash_item_sec_line">
                      <span>贷款类型：{{item.financing_type === 'receivable' ? '应收融资' : '订单融资'}}（元）</span>
                      <span>贷款金额(元)：{{toThousands(item.amount)}} </span>
                      <span :title="item.institution_name">放贷机构：{{item.institution_name}}</span>
                      <span>贷款状态：{{convertTime(item.status) === '警告' ? '距逾期还剩'+ item.status.days + '天' : convertTime(item.status)}} </span>
                      <span>还款日期：{{item.repayment_date}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="deal_page">
                <el-pagination
                  @size-change="handleSizeChange('end')"
                  @current-change="handleCurrentChange('end')"
                  :current-page.sync="pagination.currentPage"
                  :page-size="100"
                  layout="prev, pager, next, jumper"
                  :total="pagination.total">
                </el-pagination>
              </div>
            </div>
          <div class="deal_reason">
            <div class="deal_titles">
              <span>处置原因</span>
              <!-- <span>收起</span> -->
            </div>
            <div class="deal_reason_info">
              <div class="mid_result_reason">
                <span>{{showName}}原因说明:</span>
                <textarea name="" v-model="fromData.reason"/>
              </div>
              <div class="mid_result_upload">
                <span>{{showName}}凭证</span>
                <div>
                  <!-- <img src="../../../static/img/debet/icon3.png" alt="">   :http-request="upLoad"-->
                  <el-upload
                    :action="upLoadUrl"
                    list-type="picture-card"
                    :http-request="upLoad"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileList"
                    multiple
                    :limit=5
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisibleImg">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </div>
              <div  @click="enter()" class="nextBtn">
                {{can_delete === 1 ? '撤回' : '确认发布'}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认框 -->
    <el-dialog
      title="确定删除？"
      :visible.sync="dialogVisible"
      width="30%"
      top="30vh"
    >
      <span>确定删除么?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="remove">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import AppNav from '../financing/financingManege'
import Location from '../location/location'
export default {
  name: 'loanPublish',
  components: {
    AppNav, 
    // Location
  },
  data () {
    return {
      step: {selIndex: 8},
      checkedData: [1],
      pagination: {
        total: 10,
        currentPage: 1
      },
      budge: "background: #fff;border: 1px solid #666;color: #666;",
      fromData: {
        pay_total_val: 10,
        pay_time: '',
        pay_extend_time: '',
        pay_val: '',
        pay_name: '',
        pay_phone: '',
        pay_account: '',
        pay_name_b: '',
        pay_phone_b: '',
        pay_account_b: '',
        reason: '',
        att_id: [],
        bus_code_my: '',
        bus_code_other: '',
        pay_man: '',
        pay_man_b: '',
        id: '',
        type: ''
      },
      showDataList: [
        {amount: ''}
      ],
      totalList: [],
      dialogVisible: false,
      itemId: '',
      file: {},
      dialogImageUrl: '',
      dialogVisibleImg: false,
      upLoadUrl: '',
      can_delete: '',
      errorStyle: {
        box: 'transition: border-color .2s cubic-bezier(.645,.045,.355,1);border-color: red'
      },
      fileList: [],
      isDisable1: false,
      isDisable2: false,
      isEmpty: {
        pay_val: false,
        pay_name_b: false,
        pay_phone_b: false,
        pay_account_b: false,
        pay_account: false,
        bus_code_other: false,
        pay_man_b: false
      }
    }
  },
  beforeCreate () {
    var _url = ''
    if (this.$route.query.delete) {
      _url = '/loanType?id=' + this.$route.query.id + '&type=' + this.$route.query.type + '&delete=' + this.$route.query.delete
    }
    else {
      _url = '/loanType?id=' + this.$route.query.id + '&type=' + this.$route.query.type
    }
    switch(Number(this.$route.query.type)) {
      case 1: 
        this.showName = '主动还款'
        break
      case 2:
        this.showName = '申请续贷'
        break
      case 3:
        this.showName = '申请促保贷'
        break
      case 4:
        this.showName = '申请过桥贷款'
        break
    }
    this.location = [
      {
        title: '贷款处置',
        url: '/loanDeal'
      },
      {
        title: this.showName
      }
    ]
    console.log(this.$route.query.delete)
  },
  mounted () {
    this.fromData.id = this.$route.query.id
    this.fromData.type = this.$route.query.type
    this.can_delete = Number(this.$route.query.delete)
    this.fromData.pay_val = Number(this.$route.query.type) === 1 ? '' : '0'
    // console.log(this.fromData)
    if(this.can_delete !== 1) { //处置
      this.$ajax.get('/api/loan_management/?token=' + this.$token()).then(res => {
        // console.log(res)
        if (res.data.code === '1') { 
          if (this.fromData.id) {
            this.showDataList = []
            var data = res.data.data.can_manage.debts_list
            for(var i = 0; i< data.length; i++) {
              if (Number(this.fromData.id) === data[i].id) {
                this.showDataList.push(data[i])
                this.fromData.pay_total_val = data[i].amount
              }
            }
          }
        }
      })
    } else { // 撤回
      this.$ajax.get('/api/loan_management/?token=' + this.$token()+'&management=' + 1 + '&id=' + this.fromData.id).then(res => {
        console.log(res)
        if (res.data.code === '1') {
          this.fromData.reason = res.data.data.management_reason
          this.fromData.type = res.data.data.management_type
          this.fromData.pay_name_b = res.data.data.institution_name
          this.fromData.pay_phone_b = res.data.data.i_contact_phone
          this.fromData.pay_time = res.data.data.date_created
          this.fromData.pay_extend_time = res.data.data.extend_date || ''
          this.fromData.pay_val = this.toThousands(res.data.data.payback_value)
          this.fromData.pay_total_val = res.data.data.loan_data.amount
          this.fromData.pay_account_b = res.data.data.institution_account
          this.fromData.pay_account = res.data.data.business_account
          this.fromData.pay_man_b = res.data.data.i_contact_person
          this.fromData.bus_code_other = res.data.data.i_tax_number
          this.showDataList = []
          this.showDataList.push(res.data.data.loan_data)  
          var fileObj = {}
          for(var i=0; i<res.data.data.attachment.length; i++) {
            fileObj.url = this.$root_url() + res.data.data.attachment[i].location
            fileObj.name = res.data.data.attachment[i].name
            this.fileList.push(fileObj)
          }
        }
      })
    }
    // 主动还款，申请续贷,促保贷，过桥贷款时直接回显企业名称等信息
    this.$ajax.patch('/api/claims_debt/debt_management/', {token: this.$token()}).then(res => {
      // console.log(res.data)
      if(res.data.code === '1') {
        this.fromData.pay_name = res.data.business_info.business
        this.fromData.pay_phone = res.data.business_info.contact_phone
        this.fromData.bus_code_my = res.data.business_info.tax_number
        this.fromData.pay_man = res.data.business_info.contact_person
      }
    })
    document.getElementById('pay_buss').setAttribute('readonly', 'readonly')
    document.getElementById('pay_phone').setAttribute('readonly', 'readonly')
    document.getElementById('pay_buss_code').setAttribute('readonly', 'readonly')
    document.getElementById('pay_man').setAttribute('readonly', 'readonly')
    // 撤回
    if (this.can_delete === 1) {
      document.getElementById('pay_val').setAttribute('readonly', 'readonly')
      document.getElementById('pay_phone_b').setAttribute('readonly', 'readonly')
      document.getElementById('bus_code_other').setAttribute('readonly', 'readonly')
      document.getElementById('pay_man_b').setAttribute('readonly', 'readonly')
      document.getElementById('pay_account').setAttribute('readonly', 'readonly')
      document.getElementById('pay_name_b').setAttribute('readonly', 'readonly')
      document.getElementById('pay_account_b').setAttribute('readonly', 'readonly')
      // document.getElementById('pay_time').setAttribute('readonly', 'readonly')
      document.querySelector('#pay_time input').setAttribute('readonly', 'readonly')
      document.querySelector('#pay_time input').classList.value = 'el-input__inner readonly'
      document.getElementById('pay_extend_time').setAttribute('readonly', 'readonly')
    }
  },
  methods:{
    convertTime (status) {
      if (status) {
        // 正常
        if (Number(status.status) === 1) { 
          if (status.days <= 7) {
            return '警告'
          }
          else {
            return '正常'
          }
        }
        // 逾期
        else if (Number(status.status) === 2) {
          return '逾期'
        } 
        // 坏账
        else {
          return '坏账'
        }
      }
    },
    // 分页
    handleSizeChange (state) {
      
    },
    handleCurrentChange (state) {

    },
    toDetail(_id) {
      if (_id) {
        this.$router.push({
          path: '/loanInfo',
          query: {
            id: _id,
            history: 2
          }
        })
      }
    },
    check(){
      var flag = true
      for(var props in this.isEmpty) {
        if(!this.fromData[props]) {
          this.isEmpty[props] = true
          flag = false
          // console.log(props)
        } else {
          this.isEmpty[props] = false
        }
      }
      return flag
    },
    confirmBtn(e) {
      this.$message.success('已提醒')
      // this.$router.push({
      //   path: '/debtPublish',
      //   query: {
      //     id: 20,
      //     type: 1
      //   }
      // })
    },
    enter () {
      var data = {
        token: this.$token(),
        att_list : this.fromData.att_id,
        loan: this.fromData.id,
        date_created : this.fromData.pay_time,
        management_type : this.fromData.type,
        payback_value : this.fromData.pay_val || 0,
        business_account : this.fromData.pay_account,
        institution_account : this.fromData.pay_account_b,
        i_contact_person : this.fromData.pay_man_b,
        i_contact_phone : this.fromData.pay_phone_b,
        i_tax_number : this.fromData.bus_code_other,
        institution_name : this.fromData.pay_name_b,
        management_reason : this.fromData.reason,
      }
      if (Number(this.fromData.type) === 2) {
        data.extend_date = this.fromData.pay_extend_time
      }
      // if (Number(this.fromData.type) === 3) {
      //   data.institution_name = this.fromData.pay_name_b
      // }
      console.log(data)
      if (this.can_delete !== 1) {
        this.$ajax.post('/api/loan_management/', data).then(res => {
          // console.log(res)
          if (res.data.code === '1') {
            this.$message.success('处置成功')
            setTimeout(()=>{
              this.$router.push({
                path: '/loanDeal'
              })
            },1000)  
          } else {
            this.$loading(this.$setLoading()).close()
          }
        })
      } else {
        this.$router.push({
          path: '/loanRecall',
          query: {
            id: this.fromData.id,
            type: this.fromData.type,
            delete: 1
          }
        })
      }
    },
    checkItem (id) {
      this.itemId = id
      this.dialogVisible = true
    },
    remove() {
      this.showDataList.forEach((val, index)=>{
        if(Number(val.id) === Number(this.itemId)) {
          this.showDataList.splice(index, 1)
        }
      })
      this.dialogVisible = false
    },
    // 附件上传
    upLoad() {
      var that = this
      var fileObj = new FormData()
      var file = that.file
      // console.log(file)
      var type = that.file.name.substring(that.file.name.indexOf('.')+1, that.file.name.length)
      fileObj.append('pic_name', file.name)
      fileObj.append('loan_attachment', file)
      fileObj.append('token', this.$token())
      fileObj.append('type', type)
      that.$ajax.post('/api/loan_management_attachment/', fileObj).then(res => {
        // console.log(res)
        if (res.data.code === '1') {
          that.fromData.att_id.push(res.data.att_id)
        } else {
          that.$message.error('文件有误，请重新上传!')
          that.$loading(that.$setLoading()).close()
        }
      })
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisibleImg = true
    },
    beforeAvatarUpload (file) {
      this.file = file
      if (file.size > 4 * 1024 * 1024) {
        this.$message.error('文件最大限制为4M')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped lang='less'>
.loanPublish {
  height: 100%;
  .loanPublish_box {
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
    .loanPublish_box_wrap {
      // width: 100%;
      height: 100%;
      background: #f4f8f9;
      .topNav {
        height: 60px;
        background: #ffffff;
        box-shadow: 2px 0 4px #ddd;
      }
      .mid_publish {
        margin: 50px auto;
        width: 85%;
        background: #fff;
        overflow: hidden;
        .deal_info {
          margin: 30px 60px;
          &>span {
            display: block;
            width: 120px;
            font-size: 14px;
            color: #333333;
            font-weight: 700;
            height: 25px;
            line-height: 25px;
            border-left: 3px solid #ea6100;
            padding-left: 5px;  
          }
          .deal_details {
            display: flex;
            justify-content: space-around;
            .confirm {
              width: 80px;
              height: 32px;
              line-height: 32px;
              background: #ea6100;
              text-align: center;
              color: #fff;
              border-radius: 6px;
              cursor: pointer;
              position: absolute;
              // margin-top: 255px;
              // &.active {
              //   background: #ccc;
              //   color: #000
              // }
            }
            &>div {
              margin-top: 10px; 
              width: 320px;
              height: 300px;
              // border: 1px solid #eaeaea;
              &>span {
                display: block;
                width: 120px;
                font-size: 14px;
                font-weight: 600;
                color: #333;
                height: 25px;
                line-height: 25px;
                // margin-left: 5px;
              }
              .deal_form {
                .deal_row {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  margin: 19px 0;
                  .warning {
                    position: absolute;
                    margin-left: 310px;
                    font-size: 14px;
                    color: #999;
                  }
                  label {
                    display: inline-block;
                    width: 100px;
                    text-align: left;
                    font-size: 14px;
                    color: #333333;
                  }
                  input {
                    display: inline-block;
                    width: 200px;
                    border-radius: 6px;
                    padding: 3px 10px;
                    height: 32px;
                    border: 1px solid #eaeaea;
                    outline: none;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-left: 10px
                  }
                }   
              }
            }
          }
        }
        .deal_tickets {
          margin: 0px 60px 10px 60px;
          .deal_titles {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #cccccc;
            padding-bottom: 10px;
            cursor: pointer;
            &>span {
              display: block;
              width: 150px;
              font-size: 14px;
              color: #333333;
              font-weight: 700; 
              height: 25px;
              line-height: 25px;
              border-left: 3px solid #ea6100;
              padding-left: 5px;  
            }
            // &>span:last-child {
            //   border: none;
            //   width: 50px;
            //   color: #ea6100;
            //   text-decoration: underline;
            // }
          }
          .deal_table {
            margin-top: 20px;
            .c_cash_box{
              .c_cash_item{
                background: #fff;
                border: 1px solid #e1e6f0;
                margin: 15px 0;
                .c_cash_item_title{
                  background: rgba(204,204,204,0.20);
                  line-height: 48px;
                  height: 48px;
                  padding: 0 50px;
                  font-size: 14px;
                  color: #333;
                  display: flex;
                  justify-content: space-between;
                  span{
                    display: inline-block;
                  }
                  .c_ticket{
                    width: 45%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
                      }
                      &.active{
                        background: url('../../../static/img/debet/confirm2.png') no-repeat;
                      }
                      &:nth-of-type(1) i{
                        background: url('../../../static/img/debet/confirm1.png') #fff no-repeat;
                        background-size: 50px 22px;
                      }
                    }
                  }
                  .to_detail {
                    // position: absolute;
                    color: #ea6100;
                    text-decoration: underline;
                    cursor: pointer;
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
                  // border-bottom: 1px dashed #ccc;
                  line-height: 48px;
                  span{
                    display: inline-block;
                    width: 25%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    color: #666666;
                    // padding: 0 5px;
                  }
                  &>span:nth-of-type(4) {
                    text-align: center
                  }
                }
                // .c_cash_item_thi_line{
                //   line-height: 48px;
                //   margin: 0 50px;
                //   display: flex;
                //   span{
                //     display: inline-block;
                //     width: 33%;
                //     overflow: hidden;
                //     text-overflow: ellipsis;
                //     white-space: nowrap;
                //     font-size: 14px;
                //     color: #666;
                //     padding: 0 5px;
                //   }
                // }
              }
            }
          }
          .deal_page {
            text-align: center;
            margin-top: 30px; 
          }     
        }
        .deal_reason {
          margin: 30px 60px;
          .deal_titles {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #cccccc;
            padding-bottom: 10px;
            cursor: pointer;
            &>span {
              display: block;
              width: 150px;
              font-size: 14px;
              color: #333333;
              font-weight: 700; 
              height: 25px;
              line-height: 25px;
              border-left: 3px solid #ea6100;
              padding-left: 5px;  
            }
            // &>span:last-child {
            //   border: none;
            //   width: 50px;
            //   color: #ea6100;
            //   text-decoration: underline;
            // }
          }
          .deal_reason_info {
            .mid_result_reason {
              margin: 28px 38px;
              height: 140px;
              border: 1px solid #e1e6f0;
              border-radius: 4px;
              span {
                font-size: 14px;
                color: #333333;
                display: block;
                margin-top: 10px;
                margin-left: 10px;
              }
              textarea {
                width: 100%;
                height: 100px;
                border: none;
                resize: none;
                padding-left: 10px;
                margin-top: 5px;
              }
              textarea:focus {
                outline:none;
              }
            }
            .mid_result_upload {
              margin: 28px 38px;
              height: 240px;
              border: 1px solid #e1e6f0;
              border-radius: 4px;
              span {
                font-size: 14px;
                color: #333333;
                display: block;
                margin-top: 10px;
                margin-left: 10px;
              }
              div {
                display: flex;
                justify-content: center;
                margin-top: 15px;
                // align-items: center;
                // height: 509px;
                // img {
                //   width: 58px;
                // }
              }
            }
            .nextBtn {
              width: 120px;
              height: 38px;
              line-height: 38px;
              text-align: center;
              margin: 100px auto;
              border-radius: 6px;
              background: #ea6100;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.readonly {
  background: #eaeaea;
  color: #999
}
.err_box {
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  border-color: red
}
</style>
<style>
.time .el-input{
  width: 200px
}
.time .el-input input{
  height: 32px;
}
.time .el-input i{
  margin-top: -4px
}
.time .el-input .readonly{
  background: #eaeaea;
  color: #999;
  pointer-events: none;
}
</style>
