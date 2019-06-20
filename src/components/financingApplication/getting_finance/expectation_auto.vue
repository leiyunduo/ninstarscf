<template>
  <div class="c_container">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="usercenter">
      <location :location="location"></location>
      <getset :statusList="statusList" type="1" :fid='fid' fType='receivable' :bid='bid'></getset>
      <div class="status_pic" v-if="!showNext">
        <h3 class="c_for_what_title">融资用途</h3>
        <div class="c_add_chain"><a @click="showChainDialog">+添加融资用途</a></div>
        <div class="c_chain_box">
          <div class="c_table_item" v-for="(item, index) in selChainList" :key="index">
            <div class="c_table_title">
              <span>合同：<a @click="handleView(item)">{{item.payable_contract.contract_name}}</a></span>
              <span>交易公司：{{item.payable_contract.partner_business}}</span>
              <span>签署日期：{{item.payable_contract.create_time}}<a class="c_view_detail" @click="handleView(item)">查看详情</a></span>
            </div>
            <!-- <div class="c_table_title">
              <span>关联合同名称：{{item.receivable_contract[0].name}}</span>
              <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
              <span>签署日期：{{item.receivable_contract[0].create_time}}</span>
            </div> -->
            <div class="c_table_sec">
              <span>资金缺口：{{item.payable_contract.funding_gap}}（元）</span>
              <span>应付款：{{item.payable_contract.contract_value}}（元）</span>
              <span>已付款：{{item.payable_contract.paid}}（元）</span>
              <span>订金：{{item.payable_contract.deposit}}（元）</span>
            </div>
            <div class="c_table_third">
              <span>红条：{{item.ticket_dict.receivable.ninstar_bank_ticket.number}}张</span>
              <span>黄条：{{item.ticket_dict.receivable.ninstar_business_ticket.number}}张</span>
              <span>白条：{{item.ticket_dict.receivable.ninstar_digital_ticket.number}}张</span>
            </div>
          </div>
          <div class="c_empty_accessory" v-if="selChainList.length === 0">请选择您的融资用途</div>
        </div>
        <div class="c_nex_box"><a @click="handleNext">下一步</a></div>
      </div>
      <div class="status_pic" v-show="showNext">
        <getTop v-if="hasbank === 0" :isShowNum="isShowNum" :isShowUp="isShowUp" :valueData="valueData"></getTop>
        <div class="check_list">
          <div @click="dialogVisible = true">查看贷款票据</div>
        </div>
        <div class="want_money" v-if="hasbank === 0">
          <div>贷款期限内应收：{{toThousands(money.financing_credit)}}（元）</div>
          <div>贷款期限外应收：{{toThousands(money.risk_management)}}（元）</div>
          <div>应收池信用G(t)：{{toThousands(money.GT_amount)}}（元）</div>
        </div>
        <!-- <div class="c_com_im"><a @click="communicate">银企交流</a></div> -->
        <div class="form_sub" v-if="hasbank === 0">
          <div class="form_line">
            <p>
              <span>我的融资期望：</span>
              <span class="c_financing_credit"><input type="text" v-model='subMoney' maxlength="16"></span>
              <span>（元）</span>
            </p>
            <p>
              <span>融资用途汇总：</span>
              <span class="c_financing_credit">{{toThousands(money.actual_demand)}}</span>
              <span>（元）</span>
            </p>
          </div>
          <div class="form_line">
            <el-col :span="12">
              <span>融资时间：</span>
              <el-date-picker v-if="hasdate === 0" v-model="gettedTime" type="date" placeholder="选择融资日期"></el-date-picker>
              <span v-if="hasdate === 1">{{dateObj.expect_loan_date}}</span>
            </el-col>
            <el-col :span="12">
              <span>还款时间：</span>
              <el-date-picker v-if="hasdate === 0" v-model="backTime" type="date" placeholder="选择还款日期"></el-date-picker>
              <span v-if="hasdate === 1">{{dateObj.expect_repayment_date}}</span>
            </el-col>
          </div>
          <div class="select_line">
            <button :class="[this.isDis === 1 ? 'active' : '']" @click="selCheckbox($event, 1)">区域发布</button>
            <button :class="[this.isBank === 1 ? 'active' : '']" @click="selCheckbox($event, 0)">选择金融机构</button>
            <!-- <div>
              <input id="sendtodis" type="checkbox" name="sendTodis" @click="selCheckbox($event, 1)">
              <label for="sendtodis">区域发布</label>
            </div>
            <div>
              <input id="sendtocom" type="checkbox" name="sendTocom" @click="selCheckbox($event, 0)">
              <label for="sendtocom">选择金融机构</label>
            </div> -->
          </div>
        </div>
        <div class="bank_list" v-show="isBank === 1">
          <ul>
            <li v-for="(item, index) in bankList" :key="index">
              <div>
                <div class="item_left">
                  <div class="logo_wrap">
                    <img :src="$root_url() + item.avatar">
                  </div>
                  <div class="item_info">
                    <div>{{item.name}}</div>
                    <div>{{item.info}}</div>
                  </div>
                </div>
                <div class="item_rigth">
                  <div @click="selectList($event, item)">查看详情</div>
                  <div @click="selBnak($event, index)" :style="item.sel === 1 ? 'background: #999':''">{{item.sel === 1 ? '取消' : '选择'}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="c_empty_bank" v-if="bankList.length === 0 && isBank === 1">本地区暂无银行或金融机构</div>
        <div class="c_for_what">
          <h3 class="c_for_what_title">融资用途</h3>
          <div class="c_chain_box">
            <div class="c_table_item" v-if="editedChainList.length !== 0" v-for="(item, index) in editedChainList" :key="index">
              <template v-if="item.type === '1'">
                <div class="c_table_title">
                  <span>合同：<a @click="handleView(item)">{{item.receivable_contract[0].name}}</a></span>
                  <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                  <span>签署日期：{{item.receivable_contract[0].create_time}}<a class="c_view_detail" @click="handleView(item)">查看详情</a></span>
                </div>
                <!-- <div class="c_table_title">
                  <span>关联合同：{{item.payable_contract.name}}</span>
                  <span>交易公司：{{item.payable_contract.partner_business}}</span>
                  <span>签署日期：{{item.payable_contract.create_time}}</span>
                </div>
                <div v-if="!item.payable_contract.number && item.type === '1'" style="color: #999;">无关联销售合同</div> -->
                <div class="c_table_sec">
                  <span>资金缺口：{{toThousands(item.payable_contract.funding_gap)}}（元）</span>
                  <span>应付款：{{toThousands(item.payable_contract.contract_value)}}（元）</span>
                  <span>已付款：{{toThousands(item.payable_contract.paid)}}（元）</span>
                  <!-- <span>订金：{{toThousands(item.payable_contract.deposit)}}（元）</span> -->
                </div>
                <div class="c_table_third">
                  <span>红条：{{item.ticket_dict.receivable.ninstar_bank_ticket.number}}张</span>
                  <span>黄条：{{item.ticket_dict.receivable.ninstar_business_ticket.number}}张</span>
                  <span>白条：{{item.ticket_dict.receivable.ninstar_digital_ticket.number}}张</span>
                </div>
              </template>
              <template v-if="item.type === '2'">
                <div class="c_table_title" v-if="item.payable_contract.number">
                  <span>合同：<a @click="handleView(item)">{{item.payable_contract.name}}</a></span>
                  <span>交易公司：{{item.payable_contract.partner_business}}</span>
                  <span>签署日期：{{item.payable_contract.create_time}}<a class="c_view_detail" @click="handleView(item)">查看详情</a></span>
                </div>
                <!-- <div v-if="!item.payable_contract.number" style="color: #999;">无采购合同</div>
                <div class="c_table_title">
                  <span>关联合同名称：{{item.receivable_contract[0].name}}</span>
                  <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                  <span>签署日期：{{item.receivable_contract[0].create_time}}</span>
                </div> -->
                <div class="c_table_sec">
                  <span>资金缺口：{{toThousands(item.payable_contract.funding_gap)}}（元）</span>
                  <span>应付款：{{toThousands(item.payable_contract.contract_value)}}（元）</span>
                  <span>已付款：{{toThousands(item.payable_contract.paid)}}（元）</span>
                  <!-- <span>订金：{{toThousands(item.payable_contract.deposit)}}（元）</span> -->
                </div>
                <div class="c_table_third">
                  <span>红条：{{item.ticket_dict.receivable.ninstar_bank_ticket.number}}张</span>
                  <span>黄条：{{item.ticket_dict.receivable.ninstar_business_ticket.number}}张</span>
                  <span>白条：{{item.ticket_dict.receivable.ninstar_digital_ticket.number}}张</span>
                </div>
              </template>
            </div>
            <div class="c_empty_accessory" v-if="editedChainList.length === 0">暂无资金用途</div>
          </div>
        </div>
        <div class="subdata" v-if="hasbank === 0">
          <div @click="subdata" :disabled="alreadySubmit">提交</div>
        </div>
      </div>
      <div v-if="hasbank === 1" class="overview">
        <div class="for_title">本次申请提交已经完成，请继续操作完成融资或重新提交您的融资申请</div>
        <div class="back_index">
          <div @click="backIndex()">回到首页</div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="isShowChainDialog"
      class="c_chain_dialog"
      width="63%">
      <div class="c_tab_top">
        <span class="active">融资用途（来自九星平台）</span>
        <span>融资用途（来自其他平台）</span>
      </div>
      <div class="c_chain_box">
        <div class="c_table_item" v-for="(item, index) in chainList" :key="index">
          <template v-if="item.type === '1'">
            <div class="c_table_title">
              <span><input type="checkbox" :checked="item.sel" @change="item.sel = !item.sel">合同：<a @click="handleView(item)">{{item.receivable_contract[0].name}}</a></span>
              <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
              <span>签署日期：{{item.receivable_contract[0].create_time}}<a class="c_view_detail" @click="handleView(item)">查看详情</a></span>
            </div>
            <!-- <div class="c_table_title">
              <span>关联合同：{{item.payable_contract.name}}</span>
              <span>交易公司：{{item.payable_contract.partner_business}}</span>
              <span>签署日期：{{item.payable_contract.create_time}}</span>
            </div>
            <div v-if="!item.payable_contract.number && item.type === '1'" style="color: #999;">无关联销售合同</div> -->
            <div class="c_table_sec">
              <span>资金缺口：{{item.payable_contract.funding_gap}}（元）</span>
              <span>应付款：{{item.payable_contract.contract_value}}（元）</span>
              <span>已付款：{{item.payable_contract.paid}}（元）</span>
              <span>订金：{{item.payable_contract.deposit}}（元）</span>
            </div>
            <div class="c_table_third">
              <span>红条：{{item.ticket_dict.payable.ninstar_bank_ticket.number}}张</span>
              <span>黄条：{{item.ticket_dict.payable.ninstar_business_ticket.number}}张</span>
              <span>白条：{{item.ticket_dict.payable.ninstar_digital_ticket.number}}张</span>
            </div>
          </template>
          <template v-if="item.type === '2'">
            <div class="c_table_title" v-if="item.payable_contract.number">
              <span><input type="checkbox" :checked="item.sel" @change="item.sel = !item.sel">合同：<a @click="handleView(item)">{{item.payable_contract.name}}</a></span>
              <span>交易公司：{{item.payable_contract.partner_business}}</span>
              <span>签署日期：{{item.payable_contract.create_time}}<a class="c_view_detail" @click="handleView(item)">查看详情</a></span>
            </div>
            <!-- <div v-if="!item.payable_contract.number" style="color: #999;">无采购合同</div>
            <div class="c_table_title">
              <span>关联合同名称：{{item.receivable_contract[0].name}}</span>
              <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
              <span>签署日期：{{item.receivable_contract[0].create_time}}</span>
            </div> -->
            <div class="c_table_sec">
              <span>资金缺口：{{item.payable_contract.funding_gap}}（元）</span>
              <span>应付款：{{item.payable_contract.contract_value}}（元）</span>
              <span>已付款：{{item.payable_contract.paid}}（元）</span>
              <span>订金：{{item.payable_contract.deposit}}（元）</span>
            </div>
            <div class="c_table_third">
              <span>红条：{{item.ticket_dict.payable.ninstar_bank_ticket.number}}张</span>
              <span>黄条：{{item.ticket_dict.payable.ninstar_business_ticket.number}}张</span>
              <span>白条：{{item.ticket_dict.payable.ninstar_digital_ticket.number}}张</span>
            </div>
          </template>
        </div>
        <div class="c_empty_accessory" v-if="chainList.length === 0">暂未相关融资用途链条，
          <router-link to="/chainline"><span class="c_go_add">去添加</span></router-link>
        </div>
      </div>
      <div class="c_sel_btn"><a @click="suerSelChain" :disabled="isSure_success">确定</a></div>
    </el-dialog>
    <el-dialog
      title="质押/担保池"
      :visible.sync="dialogVisible"
      width="63%">
      <div class="show_list">
        <div class="top">
          <p class="list_title">贷款期限内应收票据</p>
          <ul>
            <li v-for="(item, index) in showList.pledged_pool_list" :key='index'>
              <span>票据名称：{{item.name}}</span>
              <span>票据金额：{{toThousands(item.value)}}元</span>
              <span>票据所属：{{item.contract}}</span>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <p class="list_title">贷款期限外应收票据</p>
          <ul v-if="showList.cover_pool_list.length !== 0">
            <li v-for="(item, index) in showList.cover_pool_list" :key='index'>
              <span>票据名称：{{item.name}}</span>
              <span>票据金额：{{item.value}}</span>
              <span>票据所属：{{item.contract}}</span>
            </li>
          </ul>
          <p v-if="showList.cover_pool_list.length === 0" class="is_null">本次融资为添加贷款期限外应收票据</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import getTop from '../../financing/finaceTop'
// import appNav from '../../financing/financingManege'
import Getset from '../../financing/finace'
import Location from '../../location/location'
export default {
  name: 'application',
  components: {
    Getset,
    // appNav,
    getTop,
    Location
  },
  data () {
    return {
      isShowChainDialog: false,
      alreadySubmit: false,
      chainList: [],
      selChainList: [],
      editedChainList: [],
      showNext: true,
      father: {selIndex: 3},
      isSure_success: false,
      location: [
        { title: '我的融资', url: '/financing' },
        { title: '期望融资' }
      ],
      subMoney: '',
      isShowNum: false,
      isShowUp: false,
      valueData: {},
      invoiceList: [],
      dialogVisible: false,
      statusList: [1, 1, 0, 0, 0, 0, 0, 0],
      money: {financing_credit: 0, risk_management: 0},
      our_tel: '18511618477',
      myWanna: '',
      gettedTime: '',
      backTime: '',
      bankList: [],
      isBank: 0,
      isDis: 0,
      applicationStatus: -1,
      // is404: 0,
      showList: {
        pledged_pool_list: [],
        cover_pool_list: []
      },
      message: 0,
      hasdate: 0,
      dateObj: {}
    }
  },
  methods: {
    // // 沟通
    // communicate (index, friend) {
    //   var that = this
    //   that.scm_to_account = friend.business_name
    //   that.friendId = friend.friend_accountid
    //   that.message = 1
    //   that.$emit('listerToChild', that.message, that.friendId, that.scm_to_account)
    // },
    handleView (item) {
      var that = this
      if (item.chain_type === '1') {
        this.$router.push({
          path: '/viewchain_new',
          query: {
            id: item.id,
            showTab: 2,
            fid: that.$route.query.fid,
            type: that.$route.query.type
          }
        })
      } else {
        this.$router.push({
          path: '/chainview_new',
          query: {
            id: item.id,
            showTab: 2,
            fid: that.$route.query.fid,
            type: that.$route.query.type
          }
        })
      }
    },
    // 确定链条
    suerSelChain () {
      var arrId = []
      this.isSure_success = true
      var that = this
      this.chainList.forEach(val => {
        if (val.sel) {
          // arr.push(val)
          arrId.push(val.id)
        }
      })
      this.$ajax.post('/api/usage_chain_view/', {token: this.$token(), financing_id: this.fid, chain_id_list: arrId, financing_type: 'receivable'}).then(res =>{
        if (res.data.code === '1') {
          this.isShowChainDialog = false
          this.isSure_success = false
          var arr = []
          this.chainList.forEach(val => {
            if (val.sel) {
              arr.push(val)
            }
          })
          this.selChainList = arr
          that.$ajax.put('/api/usage_chain_view/', {token: that.$token(), financing_id: that.fid, financing_type: 'receivable'}).then(res2 => {
            if (res2.data.code === '1') {
              that.editedChainList = res2.data.data
            } else {
              that.$message.error(res2.data.msg)
            }
          })
        } else {
          this.$message.error(res.data.msg)
          this.chainList.forEach(val => {
            val.sel = 0
          })
        }
      })
    },
    showChainDialog () {
      this.isShowChainDialog = true
    },
    handleNext () {
      var that = this
      this.chainList.forEach(val => {
        val.sel = 0
      })
      that.$ajax.get('/api/receivable_expect/?financing_id=' + that.fid + '&page=1&token=' + that.$token() + '&financing_type=receivable').then(res => {
        if (res.data.code === '1') {
          // this.showNext = true
          res.data.data.forEach(val => {
            val.sel = 0
          })
          that.bankList = res.data.data
          that.hasbank = 0
          that.money = res.data.value
          if (res.data.expect_loan_date && res.data.expect_repayment_date) {
            that.hasdate = 1
            that.dateObj = {
              expect_loan_date: res.data.expect_loan_date,
              expect_repayment_date: res.data.expect_repayment_date
            }
          } else {
            that.hasdate = 0
          }
          that.showList = {
            pledged_pool_list: res.data.info.pledged_pool_list,
            cover_pool_list: res.data.info.cover_pool_list
          }
        } else if (res.data.code === 500) {
          that.hasbank = 1
        }
      })
      // var that = this
      // var arr = []
      // this.selChainList.forEach(val => {
      //   if (val.sel) {
      //     arr.push(val.id)
      //   }
      // })
    },
    selCheckbox: function ($event, index) {
      // document.getElementsByName('sendTocom')[0].checked = false
      // document.getElementsByName('sendTodis')[0].checked = false
      if (index === 0) {
        // document.getElementsByName('sendTocom')[0].checked = true
        this.isBank = 1
        this.isDis = 0
      } else {
        // document.getElementsByName('sendTodis')[0].checked = true
        this.isDis = 1
        this.isBank = 0
      }
    },
    selectList ($event, item) {
      var that = this
      this.$router.push({
        path: '/financialBlog',
        query: {
          bid: item.id,
          fid: that.fid,
          type: 1
        }
      })
    },
    selBnak: function ($event, i) {
      var bankList = this.bankList
      bankList.forEach((val, index) => {
        if (index === i) {
          val.sel === 0 ? val.sel = 1 : val.sel = 0
        }
      })
    },
    subdata: function () {
      this.alreadySubmit = true
      var that = this
      var subData = {}
      // console.log(that.subMoney)
      if (!(/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(that.subMoney))) {
        that.$message({
          message: '请输入正确的融资期望',
          type: 'error'
        })
      } else {
        if (that.subMoney > that.money.GT_amount) {
          that.$message.error('融资期望不可大于应收信用G(t)')
        } else {
          if (that.hasdate === 0) {
            if (!that.$time(that.gettedTime, 2)) {
              that.$message({
                message: '请选择融资时间',
                type: 'warning'
              })
            } else {
              if (!that.$time(that.backTime, 2)) {
                that.$message({
                  message: '请选择还款时间',
                  type: 'warning'
                })
              } else {
                if (that.isBank === 0 && that.isDis === 0) {
                  that.$message({
                    message: '至少选择一种发布方式',
                    type: 'warning'
                  })
                } else {
                  // that.isBank === 1 ? subData.isBnak = 1 : subData.isBnak = 0.3
                  that.isDis === 1 ? subData.area_publish = 1 : subData.area_publish = 0
                  subData.limit = that.money.financing_credit
                  subData.expect_loan_date = that.$time(that.gettedTime, 2)
                  subData.expect_repayment_date = that.$time(that.backTime, 2)
                  subData.token = that.$token()
                  subData.financing_id = (that.fid).toString()
                  subData.institution_list = []
                  subData.financing_type = 'receivable'
                  if (that.isBank === 1) {
                    that.bankList.forEach(val => {
                      // // console.log(val)
                      if (val.sel === 1) {
                        subData.institution_list.push(val.id)
                      }
                    })
                  }
                  // subData.institution_list.push('1')
                  if (that.isBank === 1 && subData.institution_list.length === 0) {
                    that.$message({
                      message: '至少选择一家银行',
                      type: 'warning'
                    })
                  } else {
                    // console.log(subData)
                    that.$ajax.post('/api/receivable_expect/', subData).then(res => {
                      // console.log(res)
                      if (res.data.code === '1') {
                        this.alreadySubmit = false
                        this.$router.push('/financing')
                      } else {
                        that.$message({
                          message: res.data.msg,
                          type: 'error'
                        })
                      }
                    })
                  }
                }
              }
            }
          } else {
            if (that.isBank === 0 && that.isDis === 0) {
              that.$message({
                message: '至少选择一种发布方式',
                type: 'warning'
              })
            } else {
              // that.isBank === 1 ? subData.isBnak = 1 : subData.isBnak = 0.3
              that.isDis === 1 ? subData.area_publish = 1 : subData.area_publish = 0
              subData.limit = that.subMoney
              subData.expect_loan_date = that.dateObj.expect_loan_date
              subData.expect_repayment_date = that.dateObj.expect_repayment_date
              subData.token = that.$token()
              subData.financing_id = (that.fid).toString()
              subData.institution_list = []
              subData.financing_type = 'receivable'
              if (that.isBank === 1) {
                that.bankList.forEach(val => {
                  // // console.log(val)
                  if (val.sel === 1) {
                    subData.institution_list.push(val.id)
                  }
                })
              }
              // subData.institution_list.push('1')
              if (that.isBank === 1 && subData.institution_list.length === 0) {
                that.$message({
                  message: '至少选择一家银行',
                  type: 'warning'
                })
              } else {
                // console.log(subData)
                that.$ajax.post('/api/receivable_expect/', subData).then(res => {
                  // console.log(res)
                  if (res.data.code === '1') {
                    this.$router.push('/financing')
                    // that.$router.push({
                    //   path: '/getting_issue',
                    //   query: {
                    //     fid: that.fid,
                    //     id: subData.institution_list[0].id
                    //   }
                    // })
                  } else {
                    that.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                })
              }
            }
          }
        }
      }
    },
    backIndex: function () {
      this.$router.push({
        path: '/financing'
      })
    }
  },
  beforeCreate () {
    var that = this
    this.hasbank = -1
    // console.log(that.$route)
    if (that.$route.query.fid || that.$route.query.fid === 0) {
      that.fid = that.$route.query.fid
      that.bid = that.$route.query.id
    } else {
      that.is404 = 1
    }
    that.$ajax.get('/api/usage_chain_view/?financing_id=' + that.fid + '&token=' + that.$token() + '&financing_type=receivable').then(res => {
      if (res.data.code === '1') {
        res.data.data.forEach(val => {
          val.sel = 0
        })
        that.chainList = res.data.data
      } else {
        that.$message.error(res.data.msg)
      }
    })
    that.$ajax.get('/api/receivable_expect/?financing_id=' + that.fid + '&page=1&token=' + that.$token() + '&financing_type=receivable').then(res => {
      // console.log(res)
      if (res.data.code === '1') {
        res.data.data.forEach(val => {
          val.sel = 0
        })
        that.bankList = res.data.data
        that.hasbank = 0
        that.money = res.data.value
        if (res.data.expect_loan_date && res.data.expect_repayment_date) {
          that.hasdate = 1
          that.dateObj = {
            expect_loan_date: res.data.expect_loan_date,
            expect_repayment_date: res.data.expect_repayment_date
          }
        } else {
          that.hasdate = 0
        }
        that.showList = {
          pledged_pool_list: res.data.info.pledged_pool_list,
          cover_pool_list: res.data.info.cover_pool_list
        }
      } else if (res.data.code === 500) {
        that.hasbank = 1
      }
    })
  }
}
</script>

<style scoped lang="less">
// @import url('./iconfont.css');
.c_container{
  width: 100%;
  height: 100%;
  display: flex;
  //padding-top: 70px;
  .c_com_im{
    text-align: center;
    a{
      cursor: pointer;
      display: inline-block;
      padding: 10px 20px 10px 40px;
      background: url('../../../../static/img/im1.png') #eb6100 no-repeat 10px;
      color: #fff;
      font-size: 14px;
      border-radius: 4px;
    }
  }
  .c_empty_bank{
    text-align: center;
    font-size: 14px;
    color: #999;
    height: 100px;
    line-height: 100px;
  }
  .c_empty_accessory{
    height: 48px;
    font-size: 14px;
    line-height: 48px;
    color: #999;
    text-align: center;
  }
  .c_chain_dialog{
    .c_tab_top{
      margin-bottom: 20px;
      border-bottom: 1px solid #b6b6b6;
      span{
        cursor: pointer;
        padding: 10px 20px;
        display: inline-block;
        &:nth-of-type(2){
          color: #ccc;
        }
        &:nth-of-type(1):hover{
          color: #eb6100;
          border-bottom: 2px solid #eb6100;
        }
        &.active{
          color: #eb6100;
          border-bottom: 2px solid #eb6100;
        }
      }
    }
    .c_chain_box{
      .c_table_item{
        margin-bottom: 20px;
        font-size: 14px;
        border: 1px solid #ccc;
        .c_table_title{
          padding: 0 20px;
          background: #f4f4f4;
          line-height: 48px;
          border-bottom: 1px solid #ccc;
          span{
            a{
              cursor: pointer;
              color: #eb6100;
            }
            display: inline-block;
            width: 33%;
            &:nth-of-type(1){
              input{
                vertical-align: middle;
                width: 18px;
                height: 18px;
                background: #fff;
                margin-right: 10px;
              }
            }
            &:nth-of-type(3){
              text-align: right;
              a{
                cursor: pointer;
                color: #eb6100;
                margin-left: 10px;
              }
            }
          }
        }
        .c_table_sec{
          padding: 0 20px;
          line-height: 48px;
          span{
            display: inline-block;
            width: 24%;
          }
        }
        .c_table_third{
          padding: 0 20px;
          line-height: 48px;
          span{
            display: inline-block;
            width: 260px;
          }
        }
      }
      .c_nex_box{
        margin-top: 60px;
        text-align: center;
        a{
          cursor: pointer;
          display: inline-block;
          padding: 8px 20px;
          background: #eb6100;
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
        }
      }
      .c_for_what_title{
        border-left: 4px solid #eb6100;
        padding-left: 20px;
        margin-bottom: 30px;
        margin-top: 20px;
      }
    }
    .c_sel_btn{
      text-align: center;
    }
    .c_sel_btn a{
      cursor: pointer;
      display: inline-block;
      padding: 6px 20px;
      background: #eb6100;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
    }
  }
}
.usercenter {
  padding: 0 50px;
  background: #f5f7f8;
  overflow-y: scroll;
  // width: 100%;
  .status_pic {
    // width: 1200px;
    background: #fff;
    margin: 30px auto;
    padding: 30px;
    .c_table_item{
      margin-bottom: 20px;
      font-size: 14px;
      border: 1px solid #ccc;
      .c_table_title{
        padding: 0 20px;
        background: #f4f4f4;
        line-height: 48px;
        border-bottom: 1px solid #ccc;
        span{
          display: inline-block;
          width: 33%;
          &:nth-of-type(1){
            input{
              vertical-align: middle;
              width: 18px;
              height: 18px;
              background: #fff;
              margin-right: 10px;
            }
          }
          &:nth-of-type(3){
            text-align: right;
            a{
              cursor: pointer;
              color: #eb6100;
              margin-left: 10px;
            }
          }
        }
      }
      .c_table_sec{
        padding: 0 20px;
        line-height: 48px;
        span{
          display: inline-block;
          width: 24%;
        }
      }
      .c_table_third{
        padding: 0 20px;
        line-height: 48px;
        span{
          display: inline-block;
          width: 260px;
        }
      }
    }
    .c_nex_box{
      margin-top: 60px;
      text-align: center;
      a{
        cursor: pointer;
        display: inline-block;
        padding: 8px 20px;
        background: #eb6100;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
      }
    }
    .c_add_chain{
      padding-bottom: 20px;
      a{
        cursor: pointer;
        display: inline-block;
        background: #eb6100;
        border-radius: 4px;
        padding: 8px 20px;
        font-size: 14px;
        color: #fff;
      }
    }
    .c_for_what_title{
      border-left: 4px solid #eb6100;
      padding-left: 20px;
      margin-bottom: 30px;
      margin-top: 20px;
    }
    .pic_info {
      display: flex;
      height: 150px;
      justify-content: space-between;
      // background: #fff;
      font-size: 14px;
      .mine_info {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .icon_wrap{
          width: 50px;
          height: 50px;
          background: #f0f0f0;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            font-size: 30px;
          }
        }
        .line_to {
          height: 30px;
          width: 3px;
          background: #eb6100;
          margin-top: 10px;
        }
        div:last-child{
          margin-top: 10px;
        }
      }
      .pic_line {
        width: 68%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      .seller_info {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .icon_wrap{
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            font-size: 32px;
            color: rgb(235, 97, 0);
          }
        }
        .line_to {
          height: 30px;
          width: 2px;
          background: #eb6100;
          margin-top: 10px;
        }
        div:last-child {
          margin-top: 5px;
        }
      }
    }
  }
  .check_list {
    height: 80px;
    div {
      height: 30px;
      width: 145px;
      border-radius: 4px;
      text-align: center;
      line-height: 30px;
      color: #fff;
      margin: 0 auto;
      background: #eb6100;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .want_money {
    padding: 30px 0;
    // border-bottom: 1px solid #eaeaea;
    div {
      width: 320px;
      margin: 0 auto;
      height: 30px;
      line-height: 30px;
      // text-align: center;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .form_sub {
    padding: 20px 120px;
    .form_line {
      padding: 0 20px;
      border: 1px solid #eaeaea;
      height: 60px;
      display: flex;
      font-size: 14px;
      align-items: center;
      .el-col{
        padding: 0 20px;
        &:nth-of-type(1){
          border-right: 1px dashed #eee;
        }
      }
      .c_financing_credit{
        display: inline-block;
        padding: 5px 20px;
        border: 1px solid #eee;
        background: #fff;
      }
      &>span:first-child {
        width: 100px;
      }
    }
    .form_line:first-child {
      height: 60px;
      background: #f4f4f4;
      border-bottom: none;
      p{
        display: inline-block;
        width: 49%
      }
      input {
        width: 220px;
        height: 35px;
        border: 1px solid #dcdfe6;
        padding: 0 10px;
      }
    }
    .form_line:last-child{
      text-align: center;
    }
    .select_line {
      margin: 20px 0;
      button{
        border: 1px solid #eb6100;
        width: 120px;
        outline: none;
        background: #fff;
        padding: 8px 0px;
        color: #eb6100;
        font-size: 14px;
        border-radius: 4px;
        margin-right: 20px;
        &.active{
          background: #eb6100;
          color: #fff;
        }
      }
    }
  }
  .bank_list {
    // padding: 0 150px;
    ul {
      // margin-top: 30px;
      li{
        background: #fff;
        border: 1px solid #EAEAEA;
        width: 800px;
        margin: 0 auto;
        margin-top: 30px;
        &>div{
          display: flex;
          height: 120px;
          // width: 120px;
          .item_left {
            display: flex;
            .logo_wrap {
              width: 120px;
              height: 120px;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 80px;
                height: 80px;
              }
            }
            .item_info {
              width: 500px;
              padding: 15px 0;
              div:first-child {
                height: 30px;
                font-size: 14px;
                line-height: 30px;
              }
              div:last-child {
                height: 30px;
                font-size: 14px;
                line-height: 30px;
                color:#999;
              }
            }
          }
          .item_rigth {
            width: 180px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            align-items: center;
            font-size: 14px;
            padding: 20px 0;
            div {
              width: 70%;
              cursor: pointer;
              border-radius: 3px;
              height: 25px;
              color: #fff;
              background: #eb6100;
              text-align: center;
              line-height: 25px;
            }
          }
        }
      }
    }
  }
  .subdata {
    margin-top: 40px;
    padding: 20px 0;
    div {
      width: 120px;
      height: 36px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      background: #eb6100;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
.overview {
  div.for_title {
    line-height: 60px;
    color: #999;
    text-align: center;
  }
  .back_index {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 120px;
      height: 36px;
      color: #fff;
      background: #eb6100;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
    }
  }
}
.show_list {
  .top {
    .list_title {
      line-height: 40px;
      color: #000;
      font-size: 16px;
    }
    ul {
      li {
        display: flex;
        line-height: 30px;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eaeaea;
        span {
          width: 33.3%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  .bottom {
    margin-top: 20px;
    .list_title {
      line-height: 40px;
      color: #000;
      font-size: 16px;
    }
    ul {
      li {
        display: flex;
        line-height: 30px;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eaeaea;
        span {
          width: 33.3%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
