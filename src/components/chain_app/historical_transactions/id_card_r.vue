<template>
  <div class='id_card' :style="modal ? 'margin-top: -20px' : ''">
    <div class="id_title">
      融资数据总览
    </div>
    <div class="web">
      <span><i class="el-icon-menu"></i>中登网/中征网登记证明</span>
    </div>
    <div class="section_title">
      <p>基础信息</p>
    </div>
    <div class="base_info">
      <div class="base_clo">
        <div>
          <span>联系人</span>
          <span>{{base.contact_person || '未填写'}}</span>
        </div>
        <div>
          <span>联系电话</span>
          <span><a :href="'tel:' + base.phone">{{ base.phone || '未填写'}}</a></span>
        </div>
        <div>
          <span>联系邮箱</span>
          <span><a :href="'mailto:' + base.email">{{ base.email || '未填写'}}</a></span>
        </div>
      </div>
      <div class="base_clo">
        <div>
          <span>期望融资金额（元）</span>
          <span>{{toThousands(base.value)}}</span>
        </div>
        <div>
          <span>期望融资日期</span>
          <span>{{base.expect_loan_date}}</span>
        </div>
        <div>
          <span>期望预计还款日期</span>
          <span>{{base.expect_repayment_date}}</span>
        </div>
      </div>
      <div class="base_clo">
        <div>
          <span>申请时间</span>
          <span>{{base.create_time}}</span>
        </div>
        <div>
          <span>个人无限连带责任承诺函</span>
          <span :class='base.file ? "check" : "null"' @click="handleFile"><img v-if="base.file" :src="Icon.file">{{base.file ? '文件材料' : '未签署'}}</span>
        </div>
      </div>
    </div>
    <div class="section_title">
      <p>还款路径</p>
    </div>
    <div class="base_info">
      <div class="base_clo">
        <div>
          <span>还款账户</span>
          <span :class='!bank.bank_account_name ? "null" : ""'>{{bank.bank_account_name || '未填写'}}</span>
        </div>
      </div>
      <div class="base_clo">
        <div>
          <span>还款账号</span>
          <span :class='!bank.bank_account_number ? "null" : ""'>{{bank.bank_account_number || '未填写'}}</span>
        </div>
      </div>
      <div class="base_clo">
        <div>
          <span>开户行</span>
          <span :class='!bank.open_bank_info ? "null" : ""'>{{bank.open_bank_info || '未填写'}}</span>
        </div>
      </div>
    </div>
    <div class="section_title">
      <p>融资详情</p>
    </div>
    <div class="pic_info">
      <!-- <div>
        <img src="static/img/financing/supplier.png" alt="">
        <p>上游供应商</p>
      </div>
      <div class="line">
        <div></div>
        <div>
          <span>融资需求（元）：</span>
          <span>{{toThousands(pic.value)}}</span>
        </div>
        <div>
          <span>流动资金缺口（元）：</span>
          <span>{{toThousands(pic.shortage)}}</span>
        </div>
      </div> -->
      <div>
        <img style="margin: 27px 0" src="static/img/financing/business.png" alt="">
        <p>
          <a target='blank' :href="base.businessInfo ? `#/enterpriseBlog?bid=${base.businessInfo.bid}` + '&histor=1' : '#'">{{base.businessInfo ? base.businessInfo.name : '链主'}}</a></p>
      </div>
      <div class="line">
        <div></div>
        <div>
          <span>自偿性还款来源预估（元）：</span>
          <span>{{pic.first_sum}}</span>
        </div>
        <div>
          <span>融资风控（元）：</span>
          <span>{{toThousands(pic.usage)}}</span>
        </div>
      </div>
      <div>
        <img src="static/img/financing/customer.png" alt="" style="margin: 25px 0">
        <p>下游客户</p>
      </div>
    </div>
    <div class="show_list">
      <div>
        <p>
          <span>融资用途</span>
          <span>总额（元）：{{sum.usage}}</span>
        </p>
        <ul v-for="(item, index) in usage" :key='index'>
          <li>
            <div>
              <span>{{index + 1}}</span>
              <span @click="handleChain(item)">{{item.number || '无数据'}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>项目名称</span>
              <span @click="handleChain(item)">{{item.name}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>交易时间</span>
              <span>{{item.date_created}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>交易企业</span>
              <span @click="handleBusiness(item)">{{item.partner_company_name}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>订单总额（元）</span>
              <span>{{handleSum1(item.order)}}</span>
            </div>
          </li>
          <li>
            <div v-if="item.over_rate">
              <span>历史逾期率</span>
              <span v-if="item.over_rate.p_rate" @click="handleOrder(item, item.over_rate.p_rate.over_rate, 'p')"><i class="el-icon-bell"></i>{{Number(item.over_rate.p_rate.over_rate * 100).toFixed(1) + '%'}}</span>
            </div>
          </li>
        </ul>
        <div class="null_tip" v-if="usage.length === 0">未提交融资用途</div>
      </div>
      <div>
        <p>
          <span>质押池（自偿性还款来源）</span>
          <span>总额（元）：{{sum.first}}</span>
        </p>
        <ul v-for="(item, index) in firstRepayment" :key='index'>
          <li>
            <div>
              <span>{{index + 1}}</span>
              <span @click="handleChain(item)">{{item.number || '无数据'}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>项目名称</span>
              <span @click="handleChain(item)">{{item.name}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>交易时间</span>
              <span>{{item.date_created}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>交易企业</span>
              <span @click="handleBusiness(item)">{{item.partner_company_name}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>结算总额（元）</span>
              <span>{{handleSum1(item.settlement)}}</span>
            </div>
          </li>
          <li>
            <div v-if="item.over_rate">
              <span>历史逾期率</span>
              <span v-if="item.over_rate.p_rate" @click="handleOrder(item, item.over_rate.s_rate.over_rate, 's')"><i class="el-icon-bell"></i>{{Number(item.over_rate.s_rate.over_rate * 100).toFixed(1) + '%'}}</span>
            </div>
          </li>
        </ul>
        <!-- 显示印章 -->
        <p>
          <span>助贷增信信息</span>
        </p>
        <div class='sign_info'>
          <ul>
            <!-- 九星签章 -->
            <li>
              <div class="sign_detail">
                <div class="info_title">
                  <p>北京九星惟诚供应链信息技术有限公司</p>
                  <span>1</span>
                </div>
                <div class="info_card">
                  <div>
                    <span>供应链数据审核：</span>
                    <span style="color: #228B22">{{ninstar.status ? ninstarType[ninstar.status] : ''}}</span>
                  </div>
                  <div v-if="ninstar.status === '1'">
                    <span>审核时间：</span>
                    <span>{{ninstar.verified_date}}</span>
                  </div>
                </div>
              </div>
            </li>
            <!-- 助贷机构 -->
            <li v-if="fund">
              <div class="sign_detail">
                <div class="info_title">
                  <p>{{fund.name}}</p>
                  <span>1</span>
                </div>
                <div class="info_card">
                  <div>
                    <span>助贷状态：</span>
                    <span :style="fundType[fund.status] ? `color: ${fundType[fund.status].color}` : ''">{{fund.status ? fundType[fund.status].title : ''}}</span>
                  </div>
                  <div>
                    <span>助贷金额（元）：</span>
                    <span>{{fund.value ? toThousands(fund.value) : '审核中'}}</span>
                  </div>
                  <div>
                    <span>助贷占比：</span>
                    <span>{{fund.rate ? + fund.rate + '%' : '审核中'}}</span>
                  </div>
                </div>
                <div class="info_card">
                  <div>
                    <span>授信等级：</span>
                    <span>{{nameType[fund.group]}}</span>
                  </div>
                  <div>
                    <span>融资授信总额度（元）：</span>
                    <span>{{toThousands(fund.single_limit)}}</span>
                  </div>
                  <div>
                    <span>单笔融资授信额度（元）：</span>
                    <span>{{toThousands(fund.total_limit)}}</span>
                  </div>
                </div>
              </div>
            </li>
            <!-- 无助贷机构 -->
            <!-- <li v-if="!fund">
              <div class="sign_detail">
                <div class="info_title">
                  <p>未提交助贷担保</p>
                  <span></span>
                </div>
                <div class="info_card">
                  <div>
                    <span>助贷状态：</span>
                    <span class="null">未提交</span>
                  </div>
                </div>
              </div>
            </li> -->
            <!-- 核心大企业 -->
            <!-- <li>
              <div class="sign_detail">
                <div class="info_title">
                  <p class="null">核心企业未确认</p>
                  <span>1</span>
                </div>
                <div class="info_card">
                  <div>
                    <span>确权状态：</span>
                    <span class="null">未确权</span>
                  </div>
                </div>
              </div>
            </li> -->
            <!-- 担保公司 -->
            <!-- <li>
              <div class="sign_detail">
                <div class="info_title">
                  <p>暂无担保公司</p>
                  <span></span>
                </div>
                <div class="info_card">
                  <div>
                    <span>担保状态：</span>
                    <span class="null">未担保</span>
                  </div>
                  <div>
                    <span>担保金额：</span>
                    <span class="null">未担保</span>
                  </div>
                  <div>
                    <span>担保金额占比：</span>
                    <span class="null">未担保</span>
                  </div>
                </div>
              </div>
            </li> -->
            <!-- 保险公司 -->
            <!-- <li>
              <div class="sign_detail">
                <div class="info_title">
                  <p>暂无保险公司</p>
                  <span></span>
                </div>
                <div class="info_card">
                  <div>
                    <span>保险状态：</span>
                    <span class="null">未担保</span>
                  </div>
                  <div>
                    <span>保险金额：</span>
                    <span class="null">未担保</span>
                  </div>
                  <div>
                    <span>保险金额占比：</span>
                    <span class="null">未担保</span>
                  </div>
                </div>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
      <div>
        <p>
          <span>担保池（担保性还款来源）</span>
          <span>总额（元）：{{sum.second}}</span>
        </p>
        <ul v-for="(item, index) in secondRepayment" :key='index'>
          <li>
            <div>
              <span>{{index + 1}}</span>
              <span @click="handleChain(item)">{{item.number || '无数据'}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>项目名称</span>
              <span @click="handleChain(item)">{{item.name}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>支付日期</span>
              <span>{{item.payment_date}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>票据类型</span>
              <span><img :src="pics[item.ticket_type]" alt=""></span>
            </div>
          </li>
          <li>
            <div>
              <span>票据金额</span>
              <span>{{toThousands(item.amount)}}</span>
            </div>
          </li>
          <li>
            <div v-if="item.over_rate">
              <span>历史逾期率</span>
              <span v-if="item.over_rate.s_rate" @click="handleOrder(item, item.over_rate.s_rate.over_rate, 's')"><i class="el-icon-bell"></i>{{Number(item.over_rate.s_rate.over_rate * 100).toFixed(1) + '%'}}</span>
            </div>
          </li>
        </ul>
        <div class="null_tip" v-if="secondRepayment.length === 0">未提交第二还款来源</div>
      </div>
      <div>
        <p>
          <span>其他担保</span>
          <span>总额：{{sum.other}}</span>
        </p>
        <ul v-for="(item, index) in otherRepayment" :key='index'>
          <li>
            <div>
            </div>
          </li>
          <li>
            <div>
              <span>担保类型</span>
              <span style="color: #333; text-decoration: none; cursor: default;">{{otherList[item.collateral_type]}}</span>
            </div>
          </li>
          <li>
            <div>
              <span>担保估值（元）</span>
              <span>{{item.appraisement ? toThousands(item.appraisement) : ''}}</span>
            </div>
          </li>
        </ul>
        <div class='null_tip' v-if="otherRepayment.length === 0">未提交其他担保</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'idCard',
  props: {
    id: {
      type: String,
      default: null
    },
    modal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pics: [
        '',
        require('../../../../static/img/tickets/jq_01.png'),
        require('../../../../static/img/tickets/yq_01.png'),
        require('../../../../static/img/tickets/tq_01.png')
      ],
      bank: {},
      ninstar: {},
      fundType: [
        {title: '审核中', color: '#eb6100'},
        {title: '助贷中', color: 'green'},
        {title: '已拒绝', color: '#ff0010'},
        {title: '赔付申请中', color: '#eb6100'},
        {title: '同意赔付', color: 'green'},
        {title: '拒绝赔付', color: '#ff0010'},
        {title: '企业已上传还款信息', color: '#eb6100'},
        {},
        {title: '无赔付助贷结束', color: 'green'},
        {title: '助贷已结束', color: 'green'}
      ],
      ninstarType: ['审核中', '已通过', '已拒绝'],
      nameType: ['未授信', '白名单', '黄名单', '黑名单'],
      signPic: [require('../../../../static/img/financing/sign-d.png'), require('../../../../static/img/financing/sign.png')],
      otherList: ['', '房产', '汽车', '股权', '基金'],
      base: {},
      pic: {},
      usage: [],
      firstRepayment: [],
      secondRepayment: [],
      otherRepayment: [],
      sum: {},
      fund: null,
      Icon: {
        chain: require('../../../../static/img/icon/chain.png'),
        chat: require('../../../../static/img/icon/chat.png'),
        file: require('../../../../static/img/icon/file.png'),
        notice: require('../../../../static/img/icon/notice.png')
      }
    }
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/application/${that.id}/`).then(res => {
      if (res.status === 200) {
        if (!res.data.is_helping) {
          that.fund = null
        } else {
          that.fund = {
            status: res.data.helping_status,
            ...res.data.helping_data,
            ...res.data.member_info,
            ...res.data.fund_info
          }
        }
        that.base = {
          financing_id: res.data.id,
          businessInfo: {
            name: res.data.business_info.name,
            uid: res.data.business_info.uid,
            bid: res.data.business_info.id
          },
          ...res.data.business_info.contact_info,
          ...res.data.expect_data,
          file: res.data.application_data.file,
          create_time: res.data.create_time
        }
        that.bank = res.data.application_data.bank_account_info || {}
        that.pic = {
          value: res.data.expect_data.value,
          shortage: that.handleShotage(res.data.application_data.first_repayment) * 0.7,
          first_sum: that.toThousands(res.data.total.first_repayment_total),
          usage: that.handleShotage(res.data.application_data.loan_purpose)
        }
        that.sum = {
          usage: that.toThousands(res.data.total.purpose_total),
          first: that.toThousands(res.data.total.first_repayment_total),
          second: that.toThousands(res.data.total.second_repayment_total),
          other: that.toThousands(res.data.total.other_collateral_total)
        }
        that.usage = res.data.application_data.loan_purpose
        that.firstRepayment = res.data.application_data.first_repayment
        that.secondRepayment = res.data.second_repayment
        that.otherRepayment = res.data.application_data.other_collateral
        that.ninstar = res.data.helping_data.ninstar_info
        that.file = res.data.application_data.file
      }
    })
  },
  methods: {
    // 计算订单总和
    handleSum (arr) {
      let s = 0
      arr.forEach(val => {
        if (val.order) {
          val.order.forEach(item => {
            s += Number(item.amount)
          })
        } else {
          val.settlement.forEach(item => {
            s += (Number(val.amount) - Number(val.payment_amount))
          })
        }
      })
      return this.toThousands(s)
    },
    // 计算流动资金缺口
    handleShotage (arr) {
      let s = 0
      arr.forEach(val => {
        if (val.order) {
          val.order.forEach(item => {
            s += Number(item.amount)
            item.deposit.forEach(el => {
              s -= el.amount
            })
          })
          s -= val.deposit_sum
        } else {
          val.settlement.forEach(item => {
            s += (Number(val.amount) - Number(val.payment_amount))
          })          
        }
      })
      return s < 0 ? '0.00' : s
    },
    // 计算其他还款来源总额
    handleSum1 (arr) {
      let s = 0
      arr.forEach(val => {
        if (val.amount) {
          s += Number(val.amount)
        } else {
          s += Number(val.appraisement)
        }
      })
      return s < 0 ? '0.00' : this.toThousands(s)
    },
    // 跳转历史记账
    handleOrder (item, r, tar) {
      const that = this
      // let p = item.over_rate.p_rate.order_list
      let partner = [item.partner_company]
      let company = that.base.businessInfo.bid
      window.open(`#/financing_app/order_list?partner=${partner}&company=${company}&tar=${tar}`)
      // let s = item.over_rate.s_rate.order_list
      // window.open(`#/credit_app/order_list?s=${s}&p=${p}&pc=${item.partner_company}&pcn=${item.partner_company_name}&bn=${that.base.businessInfo.name}&bi=${that.base.businessInfo.bid}&r=${r}`)
    },
    // 跳转链式记账
    handleChain (el) {
      let query = {}
      let path = '#/chain_app/receive_chain'
      if (el.chain_type) {
        el.chain_type === 2 ? path = '#/chain_app/payment_chain' : path = '#/chain_app/receive_chain'
      }
      query.id = el.chain_id
      let str = ''
      el.id_list.forEach(val => {
        str += `${val},`
      })
      query.id_list = str.substring(0, str.length - 1)
      query.financing_id = this.$route.query.financing_id
      // this.$router.push({path, query})
      // console.log(`${path}?id=${query.id}&id_list=${query.id_list}&financing_id=${query.id}`)
      window.open(`${path}?id=${query.id}&id_list=${query.id_list}&financing_id=${query.id}`)
    },
    // 查看企业首页
    handleBusiness (el) {
      window.open('#/enterpriseBlog?bid=' + el.partner_company + '&histor=1', '_black')
    },
    // 查看文件
    handleFile () {
      // console.log(this.file)
      const that = this
      if (this.file) {
        window.open(that.$root_url() + that.file, '_blank')
      }
    },
    handleTalk () {
      // const that = this
      // // console.log(that.base)
      // let scm = that.base.businessInfo.name
      // let friendId = that.base.businessInfo.uid
      // let message = 1
      // that.$emit('listerToChild', message, friendId, scm_to_account)
    }
  }
}
</script>
<style lang='less' scoped>
  .check {
    color: #eb6100;
    // text-decoration: underline;
    cursor: pointer;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .null {
    color: #999;
  }
  .id_card {
    width: 100%;
    background: #fff;
    // box-shadow: 6px 6px 3px 5px #dadada;
    // padding: 10px 20px;
    .id_title {
      background: #666;
      line-height: 44px;
      padding: 0 20px;
      font-size: 14px;
      color: #fff;
    }
    .web {
      height: 48px;
      text-align: right;
      line-height: 48px;
      font-size: 14px;
      color:#666;
      padding: 0 20px;
      span {
        i {
          font-size: 20px;
        }
      }
      button {
        color: #fff;
        width: 105px;
        border-radius: 3px;
        height: 30px;
        background: #eb6100;
        border: none;
        margin-left: 54px;
        border: 1px solid #ea6100;
        transition: all .15s ease-in;
        i {
          margin-right: 5px;
        }
      }
      button:hover {
        background: none;
        color: #eb6100;
      }
    }
    .section_title {
      margin: 0 20px;
      // padding: 0 20px;
      height: 32px;
      padding: 4px 0;
      p {
        border-left: 4px solid #eb6100;
        color: #333;
        padding: 0 16px;
        line-height: 24px;
      }
    }
    .base_info {
      display: flex;
      font-size: 14px;
      margin: 25px 20px;
      background: #fff;
      padding: 16px 20px;
      border: 1px solid #f2f2f2;
      .base_clo {
        width: 33%;
        // height: 120px;
        min-height: 40px;
        div {
          display: flex;
          height: 40px;
          // border-right: 1px dashed #dadada;
          color: #333;
          padding: 0 20px;
          span:first-child {
            width: 35%;
            line-height: 40px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:last-child {
            width: 65%;
            line-height: 40px;
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
              color: #eb6100;
            }i {
              font-size: 18px;
              margin-right: 6px;
            }
          }
        }
      }
      .base_clo:last-child {
        div {
          border: none;
          span:first-child {
            width: 50%;
          }
          span:last-child {
            width: 50%;
          }
        }
      }
    }
    .pic_info {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      margin: 30px 0;
      &>div {
        text-align: center;
        p {
          text-align: center;
          color: #666;
          line-height: 20px;
          font-weight: bolder;
          width: 100%;
          // font-size: 14px;
          a {
            color: #eb6100;
            // font-size: 14px;
          }
        }
        img {
          margin: 0 20px;
          width: 125px;
        }
      }
      .line {
        font-size: 14px;
        position: relative;
        height: 100%;
        width: 400px;
        padding: 0 20px;
        div:first-child {
          height: 2px;
          position: absolute;
          // background: #eb6100;
          border-top: 1px dashed #979797;
          top: 63px;
          left: 0px;
          width: 100%;
        }
        div:nth-child(2) {
          position: absolute;
          width: 100%;
          left: 0;
          top: 70px;
          text-align: center;
          line-height: 36px;
          color: #666;
          display: flex;
          align-items: center;
          span:first-child {
            width: 60%;
            color: #666;
            padding: 0 20px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:last-child {
            padding: 0 10px;
            text-align: right;
            color: #333;
            width: 40%;
          }
        }
        div:nth-child(3) {
          position: absolute;
          width: 100%;
          left: 0;
          top: 92px;
          text-align: center;
          line-height: 36px;
          color: #666;
          display: flex;
          align-items: center;
          span:first-child {
            width: 60%;
            color: #666;
            padding: 0 20px;
            text-align: left;
          }
          span:last-child {
            padding: 0 10px;
            text-align: right;
            color: #333;
            width: 40%;
          }
        }
      }
    }
    .show_list {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 20px;
      &>div {
        width: 23%;
        font-size: 14px;
        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          color: #333;
          span:first-child {
            font-weight: bold;
            font-size: 15px;
          }
        }
        &>ul {
          margin-bottom: 20px;
          border: 1px solid #eaeaea;
          background: #fff;
          height: 48px * 6;
          // box-shadow: 2px 3px 3px 5px #ddd;
          li {
            padding: 0 10px;
            position: relative;
            &>div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 48px;
              span:first-child {
                color: #666;
                width: 120px;
              }
              span:last-child {
                width: calc(100% - 120px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #333;
                transition: all .1s ease-in;
                text-align: right;
              }
            }
            img {
              height: 40px;
              display: block;
              float: right;
            }
          }
          li:first-child {
            span:last-child {
              text-decoration: underline;
              cursor: pointer;
              text-align: center;
            }
          }
          li:nth-child(6), li:nth-child(2), li:nth-child(4) {
            span:last-child {
              text-decoration: underline;
              cursor: pointer;
              color: #eb6100;
            }
          }
        }
        .sign_info {
          ul {
            li {
              margin-bottom: 30px;
              .sign_detail {
                border: 1px solid #eaeaea;
                // box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, .35);
                background: #fff;
                .info_title {
                  padding: 0 10px;
                  width: 100%;
                  display: flex;
                  background: #666;
                  position: relative;
                  span {
                    position: absolute;
                    display: inline-block;
                    // position: absolute;
                    height: 18px;
                    width: 18px;
                    line-height: 18px;
                    border-radius: 50%;
                    background: #fff;
                    top: 15px;
                    left: 10px;
                  }
                  span:last-child {
                    text-align: center;
                    color: #666;
                  }
                  p {
                    display: block;
                    line-height: 48px;
                    color: #fff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                    width: 100%;
                  }
                }
                .info_card {
                  // padding-bottom: 15px;
                  div {
                    padding: 0 10px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    span:first-child {
                      color: #666;
                      flex: 1;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    span:last-child {
                      color: #333;
                    }
                  }
                }
                .info_card:nth-child(3) {
                  border-top: 1px solid #eaeaea;
                }
              }
            }
          }
        }
        .null_tip {
          height: 240px;
          text-align: center;
          color: #999;
          line-height: 240px;
        }
      }
      &>div:nth-child(1) {
        &>ul {
        &>li:first-child {
            position: relative;
            background: #0c8dff;
            &>div {
              justify-content: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span:first-child {
                text-align: center;
                background: #fff;
                color: #0c8dff;
                display: block;
                width: 18px;
                height: 18px;
                line-height: 18px;
                border-radius: 50%;
                position: absolute;
                top: 15px;
                left: 10px;
              }
              span {
                color: #fff;
                i {
                  font-size: 16px;
                  margin-right: 5px;
                }
              }
              i {
                font-size: 16px;
                margin-right: 5px;
              }
            }
          }
        }
      }
      &>div:nth-child(2), &>div:nth-child(3), &>div:nth-child(4) {
        &>ul {
        &>li:first-child {
            position: relative;
            background: #eb6100;
            &>div {
              justify-content: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span:first-child {
                text-align: center;
                background: #fff;
                color: #eb6100;
                display: block;
                width: 18px;
                height: 18px;
                line-height: 18px;
                border-radius: 50%;
                position: absolute;
                top: 15px;
                left: 10px;
              }
              span {
                color: #fff;
                i {
                  font-size: 16px;
                  margin-right: 5px;
                }
              }
              i {
                font-size: 16px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
