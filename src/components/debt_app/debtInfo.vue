<template>
  <div class="page">
    <appNav :father="step"></appNav>
    <div class="nav_top" v-if="showTop">
      <location :location='location'></location>
    </div>
    <div class="creditor-debt clearfix">
      <!-- 基本信息 开始 -->
      <div class="topNav" v-if="!showTop">
        <location :location='location'></location>
      </div>
      <div class="inner_box">
        <div class="check-box c_info_company">
          <div class="row"><label>票据编号:</label>
            <div class="default" v-if="data.number === ''">暂无数据</div>
            <div class="default" v-else>{{data.number}}</div>
          </div>
          <div class="row"><label>发票金额:</label>
            <div class="default" v-if="data.value === ''">暂无数据</div>
            <div class="default" v-else>{{toThousands(data.value)}}</div>
          </div>
          <div class="row"><label>开票时间:</label>
            <div class="default" v-if="data.date_created === ''">暂无数据</div>
            <div class="default" v-else>{{data.date_created}}</div>
          </div>
          <div class="row"><label>结算时间:</label>
            <div class="default" v-if="data.extended_date === ''">暂无数据</div>
            <div class="default" v-else>{{data.extended_date}}</div>
          </div>
          <div class="row"><label>所属合同编号:</label>
            <div class="default" v-if="data.contract_number === ''">暂无数据</div>
            <div class="default" v-else>{{data.contract_number}}</div>
            <span v-if="data.chain_type !== '6'" class="select-register" @click="debtSelect(data)">查看</span>
          </div>
          <!-- <div class="inner_int">
            <div>
              <img src="../../../static/img/debet/confirm.png" alt="">
              <span>法人确认</span>
            </div>
            <div>
              <img v-if="Number(data.verified_status) === 3" src="../../../static/img/debet/confirm2.png" alt="">
              <img v-else src="../../../static/img/debet/noconfirm.png" alt="">
              <span>交易企业确权</span>
            </div>
            <div>
              <img v-if="data.fund" src="../../../static/img/debet/confirm2.png" alt="">
              <img v-else src="../../../static/img/debet/noconfirm.png" alt="">
              <span>促保贷确权</span>
            </div>
          </div> -->
        </div>
        <div class="check-box">
          <div class="nomargin">
            <div class="inner_form">
              <div class="inner_row">
                <div class="inner_label">
                  <label for="">应收企业:</label>
                </div>
                <div class="inner_val">
                  <p v-if="receivableBusiness.name === ''">暂无数据</p>
                  <p v-else>{{ receivableBusiness.name }}</p>
                </div>
              </div>
              <div class="inner_row">
                <div class="inner_label">
                  <label for="">应收款账号:</label>
                </div>
                <div class="inner_val">
                  <p v-if="receivableBusiness.bank_account === ''">暂无数据</p>
                  <p v-else>{{ receivableBusiness.bank_account }}</p>
                </div>
              </div>
              <div class="inner_row">
                <div class="inner_label">
                  <label for="">应收款金额:</label>
                </div>
                <div class="inner_val">
                  <p v-if="receivableBusiness.receivable_value === ''">暂无数据</p>
                  <p v-else>{{ receivableBusiness.receivable_value }}</p>
                </div>
              </div>
              <div class="inner_row">
                <div class="inner_label">
                  <label for="">应付企业:</label>
                </div>
                <div class="inner_val">
                  <p v-if="payableBusiness.name === ''">暂无数据</p>
                  <p v-else>{{ payableBusiness.name }}</p>
                </div>
              </div>
              <div class="inner_row">
                <div class="inner_label">
                  <label for="">应付款账号:</label>
                </div>
                <div class="inner_val">
                  <p v-if="payableBusiness.bank_account === ''">暂无数据</p>
                  <p v-else>{{ payableBusiness.bank_account }}</p>
                </div>
              </div>
              <div class="inner_row">
                <div class="inner_label">
                  <label for="">应付款金额:</label>
                </div>
                <div class="inner_val">
                  <p v-if="payableBusiness.receivable_value === ''">暂无数据</p>
                  <p v-else>{{ payableBusiness.receivable_value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="check-box orgin_bottom" v-if="acceptanceInfo.length !== 0">
          <div class="yan">
            <span class="head_tops">验收单：</span>
            <div class="acceptanceInfo_yan_list" v-for="(item, index) in acceptanceInfo" :key="index">
              <div class="original_list" v-if="item.attachment.length !== 0">
                <a v-for="(item1, index) in item.attachment" :key="index" target="blank" :href="$root_url() + item1.location" class="list">{{ item1.name }}</a>
              </div>
              <div class="original_list" v-if="item.attachment.length === 0"><p>暂无附件</p></div>
              <ul class="yan_ul">
                <li>
                  <span>验收总值：</span>
                  <span>{{ item.value }}</span>
                  <span v-if="item.value === ''">暂无数据</span>
                </li>
                <li>
                  <span>票据时间：</span>
                  <span>{{ item.date_created }}</span>
                  <span v-if="item.date_created === ''">暂无数据</span>
                </li>
                <li>
                  <span>平台登记时间：</span>
                  <span>{{ item.create_time }}</span>
                  <span v-if="item.create_time === ''">暂无数据</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="check-box orgin_bottom">
          <div class="yan">
            <span class="head_tops">结算单：</span>
            <div class="yan_list">
              <div class="original_list" v-if="settlementInfo.attachment.length !== 0">
                <a target="blank" v-for="(item, index) in settlementInfo.attachment" :key="index" :href="$root_url() + item.location" class="list">{{ item.name }}</a>
              </div>
              <div class="original_list" v-if="settlementInfo.attachment.length === 0"><p>暂无附件</p></div>
              <ul>
                <li>
                  <span>结算金额：</span>
                  <span>{{settlementInfo.amount}}</span>
                  <span v-if="settlementInfo.amount === ''">暂无数据</span>
                </li>
                <li>
                  <span>票据时间：</span>
                  <span>{{settlementInfo.date_created}}</span>
                  <span v-if="settlementInfo.date_created === ''">暂无数据</span>
                </li>
                <li>
                  <span>平台登记时间：</span>
                  <span>{{settlementInfo.create_time}}</span>
                  <span v-if="settlementInfo.create_time === ''">暂无数据</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="check-box orgin_bottom">
          <div class="yan">
            <span class="head_tops">发票原件：</span>
            <div class="yan_list">
              <div class="original_list" v-if="invoiceInfo.attachment.length !== 0">
                <a v-for="(item1, index) in invoiceInfo.attachment" :key="index" target="blank" :href="$root_url() + item1.location" class="list">{{ item1.name }}</a>
              </div>
              <div class="original_list" v-if="invoiceInfo.attachment.length === 0"><p>暂无附件</p></div>
              <ul>
                <li>
                  <span>发票号码：</span>
                  <span>{{ invoiceInfo.invoice_number }}</span>
                  <span v-if="invoiceInfo.invoice_number === ''">暂无数据</span>
                </li>
                <li>
                  <span>发票代码：</span>
                  <span>{{ invoiceInfo.invoice_code }}</span>
                  <span v-if="invoiceInfo.invoice_code === ''">暂无数据</span>
                </li>
                <li>
                  <span>开票日期：</span>
                  <span>{{ invoiceInfo.date_created }}</span>
                  <span v-if="invoiceInfo.date_created === ''">暂无数据</span>
                </li>
                <li>
                  <span>开具金额：</span>
                  <span>{{ invoiceInfo.value }}</span>
                  <span v-if="invoiceInfo.value === ''">暂无数据</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="check-box orgin_bottom">
          <p class="pay">支付合计：<span>{{ paymentInfo.value }}</span><span v-if="paymentInfo.value === ''">暂无数据</span></p>
          <div>
            <div class="yan">
              <span class="head_tops">支付凭证：</span>
              <div class="yan_list">
                <div class="original_list" v-if="paymentInfo.attachment.length !== 0">
                  <a v-for="(item1, index) in paymentInfo.attachment" :key="index" target="blank" :href="$root_url() + item1.location" class="list">{{ item1.name }}</a>
                </div>
                <div class="original_list" v-if="paymentInfo.attachment.length === 0"><p>暂无附件</p></div>
                <ul>
                  <li>
                    <span>票据类型：</span>
                    <span>{{paymentInfo.payment_type}}</span>
                    <span v-if="paymentInfo.payment_type === ''">暂无数据</span>
                  </li>
                  <li>
                    <span>支付金额：</span>
                    <span>{{paymentInfo.value}}</span>
                    <span v-if="paymentInfo.value === ''">暂无数据</span>
                  </li>
                  <li>
                    <span>有效期：</span>
                    <span>{{paymentInfo.maturity_date}}</span>
                    <span v-if="paymentInfo.maturity_date === ''">暂无数据</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div v-if="data.approved_info !== null">
          <div class="check-box orgin_bottom">
            <h4 class="approved">确权证明单证：</h4>
            <div class="yan" v-if="data.approved_info.acceptance.length !== 0">
              <span class="head_tops">验收单：</span>
              <div class="acceptanceInfo_yan_list" v-for="(item, index) in data.approved_info.acceptance" :key="index">
                <div class="original_list" v-if="item.attachment.length !== 0">
                  <a v-for="(item1, index) in item.attachment" :key="index" target="blank" :href="$root_url() + item1.location" class="list">{{ item1.name }}</a>
                </div>
                <div class="original_list" v-if="item.attachment.length === 0"><p>暂无附件</p></div>
                <ul class="yan_ul">
                  <li>
                    <span>验收总值：</span>
                    <span>{{ item.value }}</span>
                    <span v-if="item.value === ''">暂无数据</span>
                  </li>
                  <li>
                    <span>票据时间：</span>
                    <span>{{ item.date_created }}</span>
                    <span v-if="item.date_created === ''">暂无数据</span>
                  </li>
                  <li>
                    <span>平台登记时间：</span>
                    <span>{{ item.create_time }}</span>
                    <span v-if="item.create_time === ''">暂无数据</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="check-box orgin_bottom" v-if="data.approved_info.settlement !== null">
              <div class="yan">
                <span class="head_tops">结算单：</span>
                <div class="yan_list">
                  <div class="original_list" v-if="data.approved_info.settlement.attachment.length !== 0">
                    <a target="blank" v-for="(item, index) in data.approved_info.settlement.attachment" :key="index" :href="$root_url() + item.location" class="list">{{ item.name }}</a>
                  </div>
                  <div class="original_list" v-if="data.approved_info.settlement.attachment.length === 0"><p>暂无附件</p></div>
                  <ul>
                    <li>
                      <span>结算金额：</span>
                      <span>{{data.approved_info.settlement.amount}}</span>
                      <span v-if="data.approved_info.settlement.amount === ''">暂无数据</span>
                    </li>
                    <li>
                      <span>票据时间：</span>
                      <span>{{data.approved_info.settlement.date_created}}</span>
                      <span v-if="data.approved_info.settlement.date_created === ''">暂无数据</span>
                    </li>
                    <li>
                      <span>平台登记时间：</span>
                      <span>{{data.approved_info.settlement.create_time}}</span>
                      <span v-if="data.approved_info.settlement.create_time === ''">暂无数据</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="check-box orgin_bottom" v-if="data.approved_info.invoice !== null">
              <div class="yan">
                <span class="head_tops">发票原件：</span>
                <div class="yan_list">
                  <div class="original_list" v-if="data.approved_info.invoice.attachment.length !== 0">
                    <a v-for="(item1, index) in data.approved_info.invoice.attachment" :key="index" target="blank" :href="$root_url() + item1.location" class="list">{{ item1.name }}</a>
                  </div>
                  <div class="original_list" v-if="data.approved_info.invoice.attachment.length === 0"><p>暂无附件</p></div>
                  <ul>
                    <li>
                      <span>发票号码：</span>
                      <span>{{ data.approved_info.invoice.invoice_number }}</span>
                      <span v-if="data.approved_info.invoice.invoice_number === ''">暂无数据</span>
                    </li>
                    <li>
                      <span>发票代码：</span>
                      <span>{{ data.approved_info.invoice.invoice_code }}</span>
                      <span v-if="data.approved_info.invoice.invoice_code === ''">暂无数据</span>
                    </li>
                    <li>
                      <span>开票日期：</span>
                      <span>{{ data.approved_info.invoice.date_created }}</span>
                      <span v-if="data.approved_info.invoice.date_created === ''">暂无数据</span>
                    </li>
                    <li>
                      <span>开具金额：</span>
                      <span>{{ data.approved_info.invoice.value }}</span>
                      <span v-if="data.approved_info.invoice.value === ''">暂无数据</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="check-box orgin_bottom" v-if="data.approved_info.payment !== null">
              <p class="pay">支付合计：<span>{{ data.approved_info.payment.value }}</span><span v-if="data.approved_info.payment.value === ''">暂无数据</span></p>
              <div>
                <div class="yan">
                  <span class="head_tops">支付凭证：</span>
                  <div class="yan_list">
                    <div class="original_list" v-if="data.approved_info.payment.attachment.length !== 0">
                      <a v-for="(item1, index) in data.approved_info.payment.attachment" :key="index" target="blank" :href="$root_url() + item1.location" class="list">{{ item1.name }}</a>
                    </div>
                    <div class="original_list" v-if="data.approved_info.payment.attachment.length === 0"><p>暂无附件</p></div>
                    <ul>
                      <li>
                        <span>票据类型：</span>
                        <span>{{data.approved_info.payment.payment_type}}</span>
                        <span v-if="data.approved_info.payment.payment_type === ''">暂无数据</span>
                      </li>
                      <li>
                        <span>支付金额：</span>
                        <span>{{data.approved_info.payment.value}}</span>
                        <span v-if="data.approved_info.payment.value === ''">暂无数据</span>
                      </li>
                      <li>
                        <span>有效期：</span>
                        <span>{{data.approved_info.payment.maturity_date}}</span>
                        <span v-if="data.approved_info.payment.maturity_date === ''">暂无数据</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-box fail">
          <button class="fund" @click="enter(1)">支付</button>
          <button class="fund" @click="enter(2)">拒付</button>
          <button class="fund" @click="enter(3)">转移</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Location from '../location/location'
// import AppNav from '../financing/financingManege'
export default {
  name: 'debtCheck',
  data () {
    return {
      step: {
        selIndex: 7
      },
      location: [
        {
          title: '债务处置',
          url: '/debtDeal'
        }, {
          title: '详情'
        }
      ],
      buttonName: '获取验证码',
      data: {
        register_time: '',
        contract_number: '',
        number: '',
        value: '',
        date_created: '',
        extended_date: '',
        reg_business: '',
        approved_info: {
          acceptance: {},
          payment: {
            attachment: []
          },
          number: '',
          invoice: {
            attachment: []
          },
          settlement: {
            attachment: []
          }
        }
      },
      // 发票原件
      invoiceInfo: {
        invoice_number: '',
        invoice_code: '',
        date_created: '',
        value: '',
        attachment: []
      },
      // 应收
      receivableBusiness: {
        name: '',
        bank_account: '',
        receivable_value: ''
      },
      // 应付
      payableBusiness: {
        name: '',
        bank_account: '',
        receivable_value: ''
      },
      // 验收单
      acceptanceInfo: [],
      // 支付信息
      paymentInfo: {
        attachment: [],
        payment_type: '',
        value: '',
        maturity_date: ''
      },
      // 结算单
      settlementInfo: {
        attachment: [],
        amount: '',
        create_time: '',
        date_created: '',
        name: '',
        number: ''
      },
      idTab: '',
      dialogVisible: false,
      oldTelNum: '',
      oldEmail: '',
      time: 60,
      isDisabled: false,
      codes: '',
      queryType: '',
      showTop: false,
      elementScorllTop: '',
    }
  },
  components: {
    // AppNav, 
    Location
  },
  beforeCreate () {
    this.isJump = this.$route.query.isJump
  },
  methods: {
    // 查看
    debtSelect (item) {
      var that = this
      // console.log(item)
      if (item.chain_type === '1') {
        that.$router.push({
          path: '/viewChain',
          query: {
            id: item.chain_id,
            jumpId: that.idTab,
            bid: item.business_id
          }
        })
      } else if (item.chain_type === '2') {
        that.$router.push({
          path: '/chainView',
          query: {
            id: item.chain_id,
            jumpId: that.idTab,
            bid: item.business_id
          }
        })
      }
    },
    enter(type) {
      var _id =  this.$route.query.id ? this.$route.query.id : '-1'
      if (type === 1) {
        this.$router.push({
          path: '/debtWay',
          query: {
            id: _id,
            type: 1
          }
        })
      } else if (type === 2) {
        this.$router.push({
          path: '/debtWay',
          query: {
            id: _id,
            type: 2
          }
        })
      }
      else {
        this.$router.push({
          path: '/debtWay',
          query: {
            id: _id,
            type: 3
          }
        })
      }
    },
    jumpBack () {
      this.$router.go(-1)
    },
    handleScroll: function () {
      var that = this
      // 吸顶游标
      that.elementScorllTop = document.documentElement.scrollTop || document.body.scrollTop
      that.showTop = that.elementScorllTop > 75 ? true : false
    }
  },
  mounted () {
    var that = this
    that.idTab = Number(that.$route.query.id)
    that.queryType = Number(that.$route.query.type)
    that.history = Number(that.$route.query.history)
    var name = Number(that.queryType) === 1 ? '支付发布' : (Number(that.queryType)=== 2 ? '拒付发布' : '转让发布')
    that.location = [
      {
        title: name,
        url: '/debtPublish?id='+ that.idTab + '&type=' + that.queryType
      },
      {
        title: '详情'
      }
    ]
    that.$ajax.get('/api/claims_debt/debt_management/?id=' + that.idTab + '&token=' + that.$token()).then((res) => {
      // console.log(res)
      if (res.data.code === '1') {
        that.data = res.data.data
        // 应收
        that.receivableBusiness = res.data.data.receivable_business
        // 应付
        that.payableBusiness = res.data.data.payable_business
        // 验收
        if (res.data.data.acceptance_info !== null) {
          that.acceptanceInfo = res.data.data.acceptance_info
        }
        // 结算
        if (res.data.data.settlement_info !== null) {
          that.settlementInfo = res.data.data.settlement_info
        }
        // 发票
        if (res.data.data.invoice_info !== null) {
          that.invoiceInfo = res.data.data.invoice_info
        }
        // 支付
        if (res.data.data.payment_info !== null) {
          that.paymentInfo = res.data.data.payment_info
        }
      }
    })
    // 注册滚动事件
    window.onscroll = function (){
      that.handleScroll()
      // console.log('11')
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  background-color: #f5f7f8;
  min-height: 100%;
  //padding-top: 70px;
  display: flex;
  .c_slide_container:hover+.nav_top {
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .nav_top {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    position: fixed;
    top: 70px;
    // width: 100%;
    right: 0;
    height: 60px;
    background: #fff;
    z-index: 1006;
    border-bottom: 1px solid #eaeaea;
    -moz-box-shadow:1px 4px 5px #EAEAEA;
    -webkit-box-shadow:1px 4px 5px #EAEAEA;
    box-shadow:1px 4px 5px #EAEAEA;
  }
  .creditor-debt {
    // width: 100%;
    margin: 0 auto;
    background: #f5f7f8;
    .topNav {
      height: 60px;
      background: #ffffff;
      box-shadow: 2px 0 4px #ddd;
    }
    .inner_box {
      padding: 50px;
      padding-top: 30px;
      min-width: 920px; 
      height: auto;
      .c_info_company{
        position: relative;
        .inner_int{
          position: absolute;
          top: 0;
          right: 0;
          width: 466px;
          // border: 1px solid #eaeaea;
          height: 300px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &>div {
            text-align: center;
            span{
              font-size: 14px;
              color: #666;
              margin-top: 5px;
              display: inline-block
            }
          }
        }
      }
    }
    .check-box {
      width: 100%;
      height: auto;
      position: relative;
      padding: 40px 40px;
      background: #fff;
      border-bottom: 1px dashed #c3cad9;
      h3 {
        float: right;
        color: #999
      }
      .tab_list {
        ul {
          display: flex;
          flex-direction: row;
          margin-bottom: 30px;
          li {
            flex: 1;
            p {
              display: inline-block;
              color: #999;
            }
          }
        }
      }
      .two {
        ul {
          display: flex;
          flex-direction: row;
          li {
            flex: 1;
            padding-bottom: 20px;
            input {
              background: #fff;
              color: #999;
              border: none;
              outline: none;
              font-size: 14px;
              width: 280px;
              height: 24px;
              padding-left: 20px;
            }
            span {
              width: 100px;
              color: #999;
              display: inline-block;
            }
          }
        }
        p {
          display: inline-block;
          color: #999;
          font-size: 14px;
        }
      }
      .row {
        padding: 12px 0px;
        label {
          float: left;
          width: 124px;
          height: 32px;
          line-height: 32px;
          font-size:14px;
          color:#666666;
        }
        .default {
          line-height: 32px;
          padding-left: 20px;
          background: #fff;
          color: #999;
          width: 360px;
          height: 32px;
          border-radius:4px;
          border: 1px solid #eaeaea;
          display: inline-block;
          font-size: 14px;
        }
        .default.short {
          width: 180px;
        }
        .default.icon {
          width: 200px;
          height: 120px;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-align: center;
          -moz-align-items: center;
          -webkit-align-items: center;
          align-items: center;
          background-color: #ececec;
          img {
            width: 100%;
          }
        }
        span.select-register,
        a {
          background: #eb6100;
          color: #fff;
          font-size: 14px;
          vertical-align: top;
          display: inline-block;
          cursor: pointer;
          border-radius: 4px;
          padding: 5px 20px;
          margin-left: 20px;
        }
        a {
          text-decoration: none;
        }
      }
      .head_top {
        position: absolute;
        top: 30px;
      }
      .yan {
        .yan_list {
          display: flex;
          flex-direction: column;
          margin-left: 80px;
          padding: 5px;
          img {
            width: 154px;
            height: 92px;
            margin-left: 35px;
          }
          ul {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            li {
              display: flex;
              flex-direction: row;
              span {
                font-size: 14px;
                padding: 5px 10px;
                color: #999;
                &:nth-of-type(1){
                  display: inline-block;
                  width: 120px;
                }
              }
            }
          }
          .yan_ul {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
          }
          .timeData {
            width: 180px;
          }
        }
        .acceptanceInfo_yan_list {
          display: inline-block;
          width: auto;
          padding: 20px;
          ul {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            li {
              display: flex;
              flex-direction: row;
              span {
                font-size: 14px;
                padding: 5px 10px;
                color: #999;
              }
            }
          }
          .original_list {
            flex: 1;
            height: auto;
            padding-left: 6px;
            a {
              color: #eb6100;
              font-size: 14px;
              display: inline-block;
              padding: 10px;
            }
            p {
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
      .nomargin{
        margin-top: 0;
        .inner_form {
          .inner_row {
            width: 480px;
            display: flex;
            justify-content: space-between;
            margin: 20px 0;  
            .inner_label {
              width: 124px;
              height: 32px;
              line-height: 32px;
              font-size:14px;
              color:#666666;
            }
            .inner_val{
              position: relative;
              p {
                width: 360px;
                height: 32px;
                line-height: 32px;
                padding: 0 15px;
                font-size: 14px;
                color: #333;
                border-radius:4px;
                border: 1px solid #eaeaea
              } 
            }    
          }
        }
      } 
    }
    .check-box:last-of-type{
      border: none;
    }
    .orgin_bottom {
      p {
        padding: 10px 0;
      }
      input {
        width: 280px;
        height: 24px;
        font-size: 14px;
        background: #fff;
        border: none;
        color: #999;
        outline: none;
        padding-left: 20px;
      }
      .pay {
        color: #333;
        font-size: 14px;
        span {
          color: #999;
          font-size: 14px;
          display: inline-block;
          padding-left: 13px;
        }
      }
      .head_tops {
        display: inline-block;
        font-size: 14px;
        color: #333;
      }
    }
    .btn-box {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 30px;
      button {
        width: 90px;
        height: 38px;
        line-height: 38px;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        outline: none;
        color: #fff;
        background: #eb6100;
        margin: 20px 30px 50px;    
      }
      .fund {
        border: none;
        color: #fff;
        background: #eb6100;
      }
      .cancel {
        border: 1px solid #eb6100;
        color: #eb6100;
        background: none;
      }
      .activeApply {
        background: #5a5757;
        color: #fff;
      }
    }
  }
}
.yan_list {
  .original_list {
    flex: 1;
    height: auto;
    padding-left: 8px;
    a {
      color: #eb6100;
      font-size: 14px;
      display: inline-block;
      padding: 10px;
    }
    p {
      font-size: 14px;
      color: #999;
    }
  }
}
.dialog_tab {
  h3 {
    padding: 10px 0;
    font-size: 16px;
  }
  .tab_list {
    ul {
      display: flex;
      flex-direction: row;
      margin-bottom: 30px;
      padding: 0 20px;
      li {
        flex: 1;
        p {
          display: inline-block;
          color: #999;
        }
      }
    }
  }
  .dialog_list {
    text-align: center;
    .phone {
      width: 200px;
      margin: 20px auto;
      text-align: left;
    }
    input {
      border: 1px solid #ccc;
      outline: none;
      background: none;
      color: #333;
      padding: 0 10px;
      border-radius: 5px;
      height: 32px;
      width: 130px;
      line-height: 32px;
    }
    button {
      background: #eb6100;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 5px;
      width: auto;
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
    }
    .but_list {
      button {
        outline: none;
        border-radius: 5px;
        width: 100px;
        height: 32px;
        line-height: 32px;
        margin: 30px;
      }
      .next {
        background: #eb6100;
        color: #fff;
        border: none;
      }
      .cancel {
        background: none;
        border: 1px solid #eb6100;
        color: #eb6100;
      }
    }
  }
}
</style>
