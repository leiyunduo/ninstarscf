<template>
  <!-- 信贷管理 > 申请中 > 查看详情 -->
  <div class='viewDeatils'>
    <div class="view_board">
      <!-- <appNav :father='step' type='2'></appNav> -->
      <div class='info_detail'>
        <div class="location_wrap">
          <location :location='location'></location>
        </div>
        <getset :isShowNum='true' :isShowUp='true' :valueData='{}'></getset>
        <!-- <div class='center_table'>
          <p>
            <span>联系人：</span>
            <span>{{ centerTable.contact_person || '未绑定' }}</span>
          </p>
          <p>
            <span>联系电话：</span>
            <span>{{ centerTable.phone || '未绑定' }}</span>
          </p>
          <p>
            <span>联系邮箱：</span>
            <span>{{ centerTable.email || '未绑定' }}</span>
          </p>
        </div> -->
        <div class="show_table">
          <div class="usage">
            <p>
              <span><img src="static/img/slidedown.png" alt="">融资用途</span>
              <span @click="dialogVisible = true">展开</span>
            </p>
            <div class="list_wrap">
              <ul v-for="(item, index) in usage" :key='index'>
                <li>
                  <span>项目名称</span>
                  <span @click="handleChain(item)">{{item.name}}</span>
                </li>
                <li>
                  <span>创建时间</span>
                  <span>{{item.create_time}}</span>
                </li>
                <li>
                  <span>交易企业</span>
                  <span @click="handleBusiness(item)">{{item.partner_company_name}}</span>
                </li>
                <li>
                  <span>订单总额（元）</span>
                  <span>{{handleOrder(item)}}</span>
                </li>
                <li class="tags">
                  <span>{{index + 1}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="first">
            <p>
              <span><img src="static/img/slidedown.png" alt="">第一还款来源（自偿性还款来源）</span>
              <span @click="dialogVisibles1 = true">展开</span>
            </p>
            <div class="list_wrap">
              <ul v-for="(item, index) in firstRepayment" :key='index'>
                <li>
                  <span>项目名称</span>
                  <span @click='handleChain(item)'>{{item.name}}</span>
                </li>
                <li>
                  <span>创建时间</span>
                  <span>{{item.create_time}}</span>
                </li>
                <li>
                  <span>交易企业</span>
                  <span @click="handleBusiness(item)">{{item.partner_company_name}}</span>
                </li>
                <li>
                  <span>订单总额（元）</span>
                  <span>{{handleOrder(item)}}</span>
                </li>
                <li class="tags">
                  <span>{{index + 1}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="second">
            <p>
              <span><img src="static/img/slidedown.png" alt="">第二还款来源（担保性还款来源）</span>
              <span @click="dialogVisibles2 = true" v-if="secondRepayment.length !== 0">展开</span>
            </p>
            <div class="list_wrap" :style="secondRepayment.length === 0 ? 'border-left: none' : ''">
              <ul v-for="(item, index) in secondRepayment" :key='index'>
                <li>
                  <img :src="pics[item.ticket_type]" alt="">
                  <div>
                    <span @click="handleChain(item)">{{item.name}}</span>
                  </div>
                </li>
                <li>
                  <span>项目名称</span>
                  <span @click="handleChain(item)">{{item.contract_name}}</span>
                </li>
                <li>
                  <span>票据种类</span>
                  <span>{{item.type}}</span>
                </li>
                <li>
                  <span>票据金额（元）</span>
                  <span>{{item.amount}}</span>
                </li>
                <li class="tags">
                  <span>{{index + 1}}</span>
                </li>
              </ul>
              <p v-if="secondRepayment.length === 0" class="null_tip">未提交第二还款来源</p>
            </div>
          </div>
          <div class="others">
            <p>
              <span><img src="static/img/slidedown.png" alt="">其他担保</span>
              <span @click="dialogVisibles3 = true" v-if="other.length !== 0">展开</span>
            </p>
            <div class="list_wrap" :style="other.length === 0 ? 'border-left: none' : ''">
              <ul v-for="(item, index) in other" :key='index'>
                <li>
                  <span>担保种类</span>
                  <span>{{typeList[item.collateral_type]}}</span>
                </li>
                <li>
                  <span>担保估值（元）</span>
                  <span>{{item.appraisement ? Number(item.appraisement).toFixed(2) : "0.00"}}</span>
                </li>
                <li class="tags">
                  <span>{{index + 1}}</span>
                </li>
              </ul>
              <p v-if="other.length === 0" class="null_tip">未提交其他还款来源</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 展开弹窗应收融资合同 -->
    <el-dialog title="资金用途" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <div class="el_dialog_divlist">
        <div class="el-ls">
          <div class="list" v-for="(item, index) in usage" :key="index">
            <div class="top">
              <div class="list_a">
                <span>合同名称：<a style="color: #eb6100;" @click="handleView(item)">{{item.name}}</a></span>
                <!-- <span>编号：{{item.payable_contract.contract_number}}</span> -->
                <span>创建时间：{{item.create_time}}</span>
                <p @click="handleView(item)">记账详情</p>
              </div>
            </div>
            <div class="center">
              <div class="left">
                <h3>应收企业信息</h3>
                <ul>
                  <li>
                    <span>公司名称：</span>
                    <p>{{item.partner_company_name}}</p>
                  </li>
                </ul>
              </div>
              <div class="right">
                <h3>应付企业信息</h3>
                <ul>
                  <li>
                    <span>公司名称：</span>
                    <p>{{businessInfo.name}}</p>
                  </li>
                   <li>
                    <span>联系人：</span>
                    <p>{{centerTable.contact_person}}</p>
                  </li>
                  <li>
                    <span>联系方式：</span>
                    <p>{{centerTable.phone}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div class="bottom">
              <span>{{item.self_approved === '0' ? '应收方未确认' : '应收方已确认'}}</span>
              <span>{{item.partner_approved === '0' ? '应付方未确认' : '应付方已确认'}}</span>
            </div> -->
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 订单融资：展开质押池 -->
    <el-dialog title="第一还款来源（自偿性还款来源）" :visible.sync="dialogVisibles1" width="80%" :before-close="handleClose">
      <div class="el_dialog_divlist">
        <div class="el-ls">
          <div class="list" v-for="(item, index) in firstRepayment" :key="index">
            <div class="top">
              <div class="list_a">
                <span>合同名称：<a style="color: #eb6100;" @click="handleView(item)">{{item.name}}</a></span>
                <!-- <span>编号：{{item.payable_contract.contract_number}}</span> -->
                <span>创建时间：{{item.create_time}}</span>
                <p @click="handleView(item)">记账详情</p>
              </div>
            </div>
            <div class="center">
              <div class="left">
                <h3>应收企业信息</h3>
                <ul>
                  <li>
                    <span>公司名称：</span>
                    <p>{{item.partner_company_name}}</p>
                  </li>
                </ul>
              </div>
              <div class="right">
                <h3>应付企业信息</h3>
                <ul>
                  <li>
                    <span>公司名称：</span>
                    <p>{{businessInfo.name}}</p>
                  </li>
                   <li>
                    <span>联系人：</span>
                    <p>{{centerTable.contact_person}}</p>
                  </li>
                  <li>
                    <span>联系方式：</span>
                    <p>{{centerTable.phone}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div class="bottom">
              <span>{{item.self_approved === '0' ? '应收方未确认' : '应收方已确认'}}</span>
              <span>{{item.partner_approved === '0' ? '应付方未确认' : '应付方已确认'}}</span>
            </div> -->
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 订单融资：展开但保池 -->
    <el-dialog title="第二还款来源（担保性还款来源）" :visible.sync="dialogVisibles2" width="80%" :before-close="handleClose">
      <div class="el_dialog_divlist">
        <div class="el-ls">
          <div class="list" v-for="(item, index) in secondRepayment" :key='index'>
            <div class="top">
              <div class="top_list">
                <div class="right">
                  <ul>
                    <li>
                      <img :src="pics[item.ticket_type]" alt="">
                    </li>
                    <li>面额（元）：{{toThousands(item.amount)}}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="center_list">
              <ul>
                <li>
                  <p>票据类型：</p>
                  <span>发票 + {{item.type}}</span>
                </li>
                <li><p>出票日期：</p>{{item.date_created || '未填写'}}</li>
                <li><p>汇票到期日：</p>{{item.payment_date}}</li>
              </ul>
              <ul>
                <li><p>支付金额：</p>{{toThousands(item.amount)}}</li>
                <li v-if="item.payment_info"><p>付款企业：</p>{{item.payment_info.payment ? item.payment_info.payment : '未填写'}}</li>
                <li v-if="item.payment_info"><p>收款企业：</p>{{item.payment_info.gathering ? item.payment_info.gathering : '未填写'}}</li>
              </ul>
              <ul class="bottom_bot">
                <li><p>交易合同：</p>{{item.contract_name}}</li>
                <li class="span" @click='tochain($event, item, 2)'>记账详情</li>
                <li></li>
              </ul>
            </div>
            <div class="center">
              <div class="left">
                <h3>应收企业信息</h3>
                <ul v-if="item.payment_info">
                  <li>
                    <span>收款企业：</span>
                    <p>{{item.payment_info.gathering || '未填写'}}</p>
                  </li>
                  <li>
                    <span>收款账号：</span>
                    <p>{{item.payment_info.getting_account || '未填写'}}</p>
                  </li>
                  <li>
                    <span>收款机构：</span>
                    <p>{{item.payment_info.gatheringCompany || '未填写'}}</p>
                  </li>
                </ul>
              </div>
              <div class="right">
                <h3>应付企业信息</h3>
                <ul v-if="item.payment_info">
                  <li>
                    <span>付款企业：</span>
                    <p>{{item.payment_info.payment || '未填写'}}</p>
                  </li>
                  <li>
                    <span>付款账号：</span>
                    <p>{{item.payment_info.payment_account || '未填写'}}</p>
                  </li>
                  <li>
                    <span>付款机构：</span>
                    <p>{{item.payment_info.paymentCompany || '未填写'}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div class="bottom">
              <span>{{item.self_approved === '0' ? '应收方未确认' : '应收方已确认'}}</span>
              <span>{{item.partner_approved === '0' ? '应付方未确认' : '应付方已确认'}}</span>
              <span>{{item.ls_status !== '1' ? '发票未认证' : '发票已认证'}}</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="el_dialog_divlist" v-if="bottomTable.cover_pool_list.length === 0">暂无数据</div>
    </el-dialog>
    <!-- 其他担保品 展开 -->
    <el-dialog title="其他担保品" :visible.sync="dialogVisibles3" :before-close="handleClose">
      <div class="other_collateral">
        <div class="select_ul">
          <ul v-for="(item, index) in other" :key='index'>
            <li v-if="item.collateral_type === '1' || item.collateral_type === '2'"><span>城市：</span><p>{{item.address}}</p></li>
            <li v-if="item.collateral_type === '1'"><span>小区/地址：</span><p>{{item.full_address}}</p></li>
            <li v-if="item.collateral_type === '1'"><span>楼栋：</span><p>{{item.house_address}}</p></li>
            <li v-if="item.collateral_type === '1'"><span>面积：</span><p>{{item.area}}（平米）</p></li>
            <li v-if="item.collateral_type === '2'"><span>车型：</span><p>{{item.car_type}}</p></li>
            <li v-if="item.collateral_type === '3'"><span>公司名称：</span><p>{{item.business_name}}</p></li>
            <li v-if="item.collateral_type === '3'"><span>股权比例：</span><p>{{item.ratio}}</p></li>
            <li v-if="item.collateral_type === '4'"><span>基金简称：</span><p>{{item.foundation}}</p></li>
            <li><span>市场估值：</span><p>{{toThousands(item.appraisement)}}（元）</p></li>
            <li v-if="item.att_list">
              <div>
                <span>评估报告：</span>
                <div v-if="item.att_list.length !== 0" v-for="(i, o) in item.att_list" :key="o">
                  <a @click="aClick(i)">{{i.name}}</a>
                </div>
                <div v-if="item.att_list.length === 0">未提交评估报告</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
import Getset from './finaceTop'
// import Drawing from './Drawing'
// import Drawing1 from './Drawing1' 
export default {
  name: 'viewDeatils',
  components: {
    Location, Getset, 
    // AppNav
  },
  data () {
    return {
      chainList: [],
      step: {selIndex: 1},
      location: [{title: ''}],
      // 联系人
      centerTable: [],
      // 质押池
      pics: ['', require('../../../../static/img/tickets/jq.png'), require('../../../../static/img/tickets/yq.png'), require('../../../../static/img/tickets/tq.png')],
      bot: [],
      bottomTable: {
        pledged_pool_list: [{name: '', partner_business_info: {name: ''}, business_info: {name: ''}, value: '', date_created: '', contract: '', business: '', ticket_dict: {ninstar_bank_ticket: 0, ninstar_business_ticket: 0, ninstar_digital_ticket: 0}}],
        cover_pool_list: [{name: '', partner_business_info: {name: ''}, business_info: {name: ''}, value: '', date_created: '', contract: '', business: '', ticket_dict: {ninstar_bank_ticket: 0, ninstar_business_ticket: 0, ninstar_digital_ticket: 0}}],
        purchase_contract: [{name: '', partner_business_info: {name: ''}, business_info: {name: ''}, value: '', start_date: '', end_date: '', contract: '', business: '', ticket_dict: {ninstar_bank_ticket: 0, ninstar_business_ticket: 0, ninstar_digital_ticket: 0}}],
      },
      typeList: ['', '房产', '汽车', '股权', '基金'],
      // coverTable: '',
      ftype: '1',
      fType: '1',
      // pledgedTable: '',
      // limitTable: '',
      // 展开
      dialogVisible: false,
      dialogVisibles: false,
      dialogVisibles1: false,
      dialogVisibles2: false,
      dialogVisibles3: false,
      // 其他担保
      visibleSyncOthers: false,
      firstRepayment: [],
      secondRepayment: [],
      businessInfo: {},
      showData: {},
      usage: {},
      other: []
    }
  },
  mounted () {
    const that = this
    if (this.$route.query.id) {
      this.$ajax.get(`/api/financing/loan_process/${this.$route.query.id}/`).then(res => {
        console.log(res)
        that.centerTable = res.data.financing_application.business_info.contact_info
        that.usage = res.data.financing_application.application_data.chain_info
        that.firstRepayment = res.data.financing_application.first_repayment
        that.secondRepayment = res.data.financing_application.second_repayment
        that.other = res.data.financing_application.application_data.other_collateral
        that.businessInfo = res.data.financing_application.business_info
        that.showData = res.data
      })
    } else if (this.$route.query.financing_id) {
       this.$ajax.get(`/api/financing/application/${this.$route.query.financing_id}/`).then(res => {
        console.log(res)
        that.centerTable = res.data.business_info.contact_info
        that.usage = res.data.application_data.chain_info
        that.firstRepayment = res.data.first_repayment
        that.secondRepayment = res.data.second_repayment
        that.other = res.data.application_data.other_collateral
        that.businessInfo = res.data.business_info
        that.showData = res.data
      })     
      that.location = [{ title: '我的申请', url: '/financing_app' }, { title: '订单融资申请' }]
    }
  },
  methods: {
    // 展开
    openList (i) {
      var that = this
      if (i === 0) {
        that.dialogVisible = true
      } else if (i === 1) {
        that.dialogVisibles = true
      } else if (i === 2) {
        that.dialogVisibles1 = true
      } else if (i === 3) {
        that.dialogVisibles2 = true
      } else if (i === 4) {
        that.dialogVisibles3 = true
      }
    },
    // 关闭
    handleClose () {
      var that = this
      that.dialogVisible = false
      that.dialogVisibles = false
      that.dialogVisibles1 = false
      that.dialogVisibles2 = false
      that.dialogVisibles3 = false
      that.visibleSyncOthers = false
      that.zhongdengUrl = false
    },
    // 沟通
    communicate () {
      var that = this
      that.scm_to_account = that.business_name
      that.friendId = that.account_id
      that.message = 1
      that.$emit('listerToChild', that.message, that.account_id, that.business_name)
    },
    // 计算订单总额
    handleOrder (arr) {
      let s = 0
      if (arr) {
        arr.order.forEach(val => {
          s += Number(val.amount)
        })
      }
      return s.toFixed(2)
    },
    // 跳转链式记账
    handleChain (el) {
      console.log(el)
      let id = el.chain_id
      let path = '#/chain_app/payment_chain?id='
      if (el.chain_type) {
        el.chain_type === 2 ? path = '#/chain_app/payment_chain?id=' : path = '#/chain_app/receive_chain?id='
      }
      let str = ''
      window.open(`${path}${id}`)
    },
    // 查看企业首页
    handleBusiness (el) {
      // return false
      window.open('#/enterpriseBlog?bid=' + el.partner_company, '_black')
    }
  }
}
</script>

<style lang='less' scoped>
.viewDeatils {
  height: 100%;
  .view_board {
    margin: 0 auto;
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
  }
  .info_detail {
    background: #f5f7f8;
    font-size: 14px;
    // padding: 20px 40px 20px 40px;
    // width: 100%;
    margin: 0 auto;
    .location_wrap {
      width: 100%;
      background: #fff;
    }
    .center_table {
      height: 64px;
      width: 1200px;
      background: #fff;
      display: flex;
      flex-direction: row;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 10px auto;
      p {
        width: 400px;
        text-align: center;
        line-height: 64px;
      }
    }
    .show_table {
      padding: 0 60px;
      margin-top: 42px;
      display: flex;
      justify-content: space-between;
      min-height: 240px;
      &>div {
        width: 23%;
        &>P {
          line-height: 40px;
          // padding: 0 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:first-child {
            font-weight: bolder;
          }
          span:nth-child(2) {
            cursor: pointer;
            text-decoration: underline;
            color: #eb6100;
            font-weight: bold;
          }
          img {
            height: 12px;
            margin-right: 4px;
          }
        }
        .list_wrap {
          border-left: 1px dashed #eb6100;
          // padding-top: 3px;
          ul {
            // padding-top: 3px;
            width: 100%;
            border: 1px dashed #eb6100;
            border-left: none;
            background: #fff;
            min-height: 205px;
            margin-bottom: 30px;
            position: relative;
            // border-radius: 3px;
            li {
              height: 40px;
              display: flex;
              justify-content: space-between;
              padding: 0 8px;
              align-items: center;
              color: #333;
              span:first-child {
                width: 100px;
              }
              span:last-child {
                width: calc(100% - 120px);
                font-weight: bold;
                text-align: right;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            li:first-child {
              height: 85px;
              border-bottom: 1px dashed #eb6100;
              span:last-child {
                font-weight: bold;
                color: #eb6100;
                text-decoration: underline;
                cursor: pointer;
              }
            }
            li:nth-child(3) {
              span:last-child {
                text-decoration: underline;
                color: #eb6100;
                cursor: pointer;
              }
            }
            li.tags {
              position: absolute;
              right: -12px;
              top: -12px;
              width: 24px;
              height: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0;
              border-radius: 50%;
              background: #eb9300;
              span {
                display: block;
                width: 16px;
                height: 16px;
                background: #eb6100;
                text-align: center;
                line-height: 16px;
                border-radius: 50%;
                color: #fff;
                padding: 0;
                font-size: 12px;
              }
            }
          }
          p.null_tip {
            background: #fff;
            min-height: 205px;
            line-height: 205px;
            text-align: center;
            color: #999;
          }
        }
      }
      &>div:nth-child(3) {
        .list_wrap {
          ul {
            li:first-child {
              justify-content: flex-start;
              img {
                height: 60px;
              }
              div {
                // width: 100%;
                margin-left: 10px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                  display: inline;
                }
              }
            }
            li:nth-child(2) {
              span:last-child {
                cursor: pointer;
                color: #eb6100;
                text-decoration: underline;
                font-weight: bolder;
              }
            }
            li:nth-child(3) {
              span:last-child {
                color: #333;
                text-decoration: none;
                cursor: default;
              }
            }
          }
        }
      }
      &>div:last-child {
        .list_wrap {
          ul {
            li:first-child {
              span:last-child {
                color: #333;
                text-decoration: none;
                // font-weight: normal;
              }
            }
          }
        }
      }
    }
  }
}
.draw_wrap {
  width: 100%;
  margin: 0 auto;
}
.open_list {
  color: #eb6100;
  cursor: pointer;
}
.el_dialog_divlist {
  padding: 30px 20px;
  height: 100%;
  .el-ls {
    height: 100%;
  }
  .list {
    background: #fff;
    border: 1px solid #ccc;
    height: auto;
    width: 100%;
    margin: 20px 0;
    .top {
      height: auto;
      padding: 0 30px;
      background: #fff;
      border-bottom: 1px solid #ccc;
      .list_a {
        line-height: 50px;
        span {
          display: inline-block;
          padding-right: 20px;
          a {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        p {
          display: inline-block;
          color: #eb6100;
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .top_list {
        display: flex;
        flex-direction: row;
        .right {
          height: 75px;
          // padding-top: 12px;
          flex: 1;
          line-height: 75px;
          ul {
            padding: 0 6px;
            height: 100%;
            display: flex;
            flex-direction: row;
            // margin-bottom: 3px;
            li {
              margin-right: 45px;
              img {
                height: 55px;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
    .center_list {
      height: auto;
      padding: 0 30px;
      background: #f4f4f4;
      border-bottom: 1px solid #ccc;
      color: #666;
      padding-top: 12px;
      ul {
        padding: 0 6px;
        display: flex;
        flex-direction: row;
        margin-bottom: 3px;
        li {
          flex: 1;
          p {
            width: 100px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            text-align: justify;
            text-align-last: justify;
          }
        }
      }
      .span {
        color: #eb6100;
        text-decoration: underline;
        display: inline-block;
        cursor: pointer;
      }
    }
    .center {
      padding: 20px 30px;
      height: auto;
      display: flex;
      flex-direction: row;
      .left {
        flex: 1;
        h3 {
          font-weight: bold;
          padding-bottom: 10px;
        }
        ul {
          li {
            line-height: 35px;
            span {
              display: inline-block;
              width: 80px;
              height: 30px;
              text-align: justify;
              text-align-last: justify;
            }
            p {
              display: inline-block;
            }
          }
        }
      }
      .right {
        flex: 1;
        h3 {
          font-weight: bold;
          padding-bottom: 10px;
        }
        ul {
          li {
            line-height: 35px;
            span {
              display: inline-block;
              width: 80px;
              height: 30px;
              text-align: justify;
              text-align-last: justify;
            }
            p {
              display: inline-block;
            }
          }
        }
      }
    }
    .bottom_quan {
      width: 100%;
      height: auto;
      padding: 20px 30px;
      box-sizing: border-box;
      border-top: 1px solid #ccc;
      h3 {
        font-weight: bold;
        span {
          display: inline-block;
          padding-left: 20px;
        }
      }
      .li_list {
        display: flex;
        flex-direction: row;
        dl {
          flex: 1;
          dt {
            border-top: 2px dashed #ccc;
            position: relative;
            margin-top: 20px;
            height: 30px;
            img {
              position: absolute;
              top: -10px;
            }
          }
        }
        dl:last-child {
          dt {
            border-top: none;
          }
        }
      }
    }
    .bottom {
      line-height: 50px;
      border-top: 1px solid #ccc;
      height: auto;
      text-align: right;
      span {
        display: inline-block;
        color: #eb6100;
        padding: 0 20px;
      }
    }
  }
}
.overview {
  div.for_title {
    background: #fff;
    margin: 0 auto;
    width: 80%;
    margin-top: 30px;
    color: #999;
    text-align: center;
    span {
      line-height: 100px;
    }
  }
  .back_index {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    div {
      width: 120px;
      height: 36px;
      color: #fff;
      background: #eb6100;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      border-radius: 5px
    }
  }
}
.other_collateral {
  .select_ul {
    padding-bottom: 30px;
    ul {
      li {
        padding-top: 10px;
        padding-left: 10px;
        span {
          display: inline-block;
          width: 100px;
          text-align: right;
        }
        p {
          display: inline-block;
          padding-left: 20px;
          color: #333;
        }
        div {
          display: inline-block;
          // padding-top: 5px;
          span {
            float: left;
            width: 100px;
            text-align: right;
          }
          div {
            float: left;
            padding-left: 20px;
            a {
              color: #eb6100;
              cursor: pointer;
              display: block;
              margin-right: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-transition: color .3s;
              transition: color .3s;
              white-space: nowrap;
              font-size: 14px;
              padding-bottom: 10px;
              i {
                padding-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
