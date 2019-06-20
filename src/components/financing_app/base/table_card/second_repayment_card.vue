<template>
  <div class='usage_card'>
    <div class="card_title">第二还款来源</div>
    <div class="second">
      <div class="business">
        <div class="business_line">
          <div>
            <span>链主企业：</span>
            <span @click="handleOtherBusiness(businessInfo.id)" class='check'>{{businessInfo.name || '未填写'}}</span>
          </div>
          <div>
            <span>营业执照号码：</span>
            <span>{{businessInfo.business_license_id || '未填写'}}</span>
          </div>
          <div>
            <span>法人姓名：</span>
            <span class='check' @click="handlePerson(businessInfo.legal_person_name, businessInfo.legal_person_id)">{{businessInfo.legal_person_name || '未填写'}}</span>
          </div>
        </div>
        <div class="business_line">
          <div>
            <span>开户行账号：</span>
            <span>{{businessInfo.open_account_code || '未填写'}}</span>
          </div>
        </div>
        <div class="bank_line">
          <span>开户行：</span>
          <span>{{businessInfo.open_bank || '未填写'}}</span>
        </div>
      </div>
      <div class="second_wrap">
        <div class="second_title">
          <span>应收票据总额（元）：</span>
          <span>{{handleSum(second)}}</span>
        </div>
        <div>
          <div v-for="(item, index) in second" :key='index' class='usage_item'>
            <div class='info_title'>
              <div>
                <img
                  :src="tickets[item.ticket_type].icon"
                  alt=""
                  v-if="item.ticket_type"
                  :style="tickets[item.ticket_type].icon ? 'cursor: pointer' : 'cursor: visiable'">
                <span>{{tickets[item.ticket_type].title}}面额（元）：</span>
                <span>{{toThousands(item.amount)}}</span>
              </div>
            </div>
            <div class='contract_info'>
              <div>
                <span>销售项目编号：</span>
                <span @click="handleChain(item)">{{item.number || '无数据'}}</span>
              </div>
              <div>
                <span>销售项目：</span>
                <span @click="handleChain(item)">{{item.contract_name}}</span>
              </div>
              <div v-if="item.over_rate">
                <span>历史逾期率：</span>
                <span v-if="item.over_rate.s_rate" @click="handleOrder(item, index)"><i class="el-icon-bell"></i>{{(Number(item.over_rate.s_rate.over_rate) * 100).toFixed(1) + '%' || '0%'}}</span>
              </div>
            </div>
            <div class="order_title" v-if="item.partner_info">
              <div>
                <span>客户：</span>
                <span @click="handleBusiness(item)">{{item.partner_company_name}}</span>
              </div>
              <div>
                <span>营业执照号码： </span>
                <span>{{item.partner_info.partner_company_number || '未填写'}}</span>
              </div>
              <div>
                <span>法人姓名：</span>
                <span :class="item.partner_info.partner_legal_person_id ? 'check' : 'null'" @click="handlePerson(item.partner_info.partner_legal_person, item.partner_info.partner_legal_person_id)">{{item.partner_info.partner_legal_person}}</span>
              </div>
              <div v-if="item.partner_info">
                <span>开户行账号： </span>
                <span v-if="item.partner_info.partner_company_account">{{item.partner_info.partner_company_account.bank_account}}</span>
              </div>
            </div>
            <div class="bank_title" v-if="item.partner_info">
              <span>开户行：</span>
              <span v-if="item.partner_info.partner_company_account">{{item.partner_info.partner_company_account.bank_branch}}</span>
            </div>
            <div class='order_title'>
              <div>
                <span>{{item.number.indexOf('P') > 0 ? '支付名称：' : '订金名称：'}}</span>
                <span>{{item.name}}</span>
              </div>
              <div>
                <span>{{item.number.indexOf('P') > 0 ? '支付金额（元）：' : '订金金额（元）：'}}</span>
                <span>{{toThousands(item.amount)}}</span>
              </div>
              <div>
                <span>支付方式：</span>
                <span>{{item.type}}</span>
              </div>
              <div>
                <span>汇票到期日：</span>
                <span>{{item.payment_date}}</span>
              </div>
            </div>
            <div class="file_list" v-if="item.att_list">
              <span>票据查看</span>
              <ul v-if="item.att_list.length !== 0">
                <li>
                  <div>原件名称</div>
                  <div>查看</div>
                </li>
                <li v-for="(att, attIndex) in item.att_list" :key='attIndex'>
                  <div>
                    <span>{{att.name}}</span>
                  </div>
                  <div>
                    <a :href="$root_url() + att.location" target='blank'>查看</a>
                  </div>
                </li>
              </ul>
              <p v-if="item.att_list.length === 0">未上传票据原件</p>
            </div>
            <div class='diamond' v-if="item.diamond">
              <div class="line"></div>
              <ul>
                <li v-for="(diamond, key, index2) in item.diamond" :key='index2'>
                  <img :src="diamond ? diamondIcon : disdiamondIcon" alt="" @click="handleDetail(item)">
                  <p>{{nines[index2]}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="is_null" v-if="second.length === 0">未提交应收票据</div>
        <div class="second_title">
          <span>应收账款总额（元）：</span>
          <span>{{handleSum(ticket)}}</span>
        </div>
        <div>
          <div v-for="(item, index) in ticket" :key='index' class='usage_item'>
            <div class='info_title'>
              <div>
                <img
                  :src="tickets[item.ticket_type].icon"
                  alt=""
                  v-if="item.ticket_type"
                  :style="tickets[item.ticket_type].icon ? 'cursor: pointer' : 'cursor: visiable'">
                <span>{{tickets[item.ticket_type].title}}面额（元）：</span>
                <span>{{toThousands(item.amount)}}</span>
              </div>
            </div>
            <div class='contract_info'>
              <div>
                <span>销售项目编号：</span>
                <span @click="handleChain(item)">{{item.number || '无数据'}}</span>
              </div>
              <div>
                <span>销售项目：</span>
                <span @click="handleChain(item)">{{item.contract_name}}</span>
              </div>
              <div v-if="item.over_rate">
                <span>历史逾期率：</span>
                <span v-if="item.over_rate.s_rate" @click="handleOrder(item, index)"><i class="el-icon-bell"></i>{{(Number(item.over_rate.s_rate.over_rate) * 100).toFixed(1) + '%' || '0%'}}</span>
              </div>
            </div>
            <div class="order_title" v-if="item.partner_info">
              <div>
                <span>客户：</span>
                <span @click="handleBusiness(item)">{{item.partner_company_name}}</span>
              </div>
              <div>
                <span>营业执照号码： </span>
                <span>{{item.partner_info.partner_company_number || '未填写'}}</span>
              </div>
              <div>
                <span>法人姓名：</span>
                <span :class="item.partner_info.partner_legal_person_id ? 'check' : 'null'" @click="handlePerson(item.partner_info.partner_legal_person, item.partner_info.partner_legal_person_id)">{{item.partner_info.partner_legal_person}}</span>
              </div>
              <div v-if="item.partner_info">
                <span>开户行账号： </span>
                <span v-if="item.partner_info.partner_company_account">{{item.partner_info.partner_company_account.bank_account}}</span>
              </div>
            </div>
            <div class="bank_title" v-if="item.partner_info">
              <span>开户行：</span>
              <span v-if="item.partner_info.partner_company_account">{{item.partner_info.partner_company_account.bank_branch}}</span>
            </div>
            <div class='order_title'>
              <div>
                <span>{{item.number.indexOf('P') > 0 ? '支付名称：' : '订金名称：'}}</span>
                <span>{{item.name}}</span>
              </div>
              <div>
                <span>{{item.number.indexOf('P') > 0 ? '支付金额（元）：' : '订金金额（元）：'}}</span>
                <span>{{toThousands(item.amount)}}</span>
              </div>
              <div>
                <span>支付方式：</span>
                <span>{{item.type}}</span>
              </div>
              <div>
                <span>汇票到期日：</span>
                <span>{{item.payment_date}}</span>
              </div>
            </div>
            <div class="file_list" v-if="item.att_list">
              <span>票据查看</span>
              <ul v-if="item.att_list.length !== 0">
                <li>
                  <div>原件名称</div>
                  <div>查看</div>
                </li>
                <li v-for="(att, attIndex) in item.att_list" :key='attIndex'>
                  <div>
                    <span>{{att.name}}</span>
                  </div>
                  <div>
                    <a :href="$root_url() + att.location" target='blank'>查看</a>
                  </div>
                </li>
              </ul>
              <p v-if="item.att_list.length === 0">未上传票据原件</p>
            </div>
            <div class='diamond' v-if="item.diamond">
              <div class="line"></div>
              <ul>
                <li v-for="(diamond, key, index2) in item.diamond" :key='index2'>
                  <img :src="diamond ? diamondIcon : disdiamondIcon" alt="" @click="handleDetail(item)">
                  <p>{{nines[index2]}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="is_null" v-if="ticket.length === 0">未提交应收账款</div>
      </div>
      <div class='other_wrap'>
        <div class="second_title">
          <span>其它担保总额（元）：</span>
          <span>{{handleSum(other)}}</span>
        </div>
        <div class='other_item' v-for='(item, index4) in other' :key='index4'>
          <div class="list">
            <ul>
              <li>
                <span>类型：</span>
                <span>{{item.collateral_type === '1' ? '房产' : item.collateral_type === '2' ? '汽车' : item.collateral_type === '3' ? '股权' : '基金'}}</span>
              </li>
              <li>
                <span>市场估值（元）：</span>
                <span>{{item.appraisement ? toThousands(item.appraisement) : ''}}</span>
              </li>
            </ul>
          </div>
          <div class="list" v-if="item.collateral_type === '1'">
            <ul>
              <li>
                <span>城市：</span>
                <span>{{item.city}}</span>
              </li>
              <li>
                <span>小区地址：</span>
                <span>{{item.full_address}}</span>
              </li>
              <li>
                <span>面积（平方米）：</span>
                <span>{{item.area}}</span>
              </li>
              <li>
                <span>评估报告：</span>
                <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                <p v-if="item.att_list.length !== 0 && item.att_list">
                  <span class='check' v-for="(it, index91) in item.att_list" :key='index91'>
                    <a :href="$root_url() + it.url" target='blank'>{{it.name}}</a>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div class="list" v-if="item.collateral_type === '2'">
            <ul>
              <li>
                <span>城市：</span>
                <span>{{item.city}}</span>
              </li>
              <li>
                <span>车辆型号：</span>
                <span>{{item.car_type}}</span>
              </li>
              <li>
                <span>评估报告：</span>
                <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                <p v-if="item.att_list.length !== 0 && item.att_list">
                  <span class='check' v-for="(it, index91) in item.att_list" :key='index91'>
                    <a :href="$root_url() + it.url" target='blank'>{{it.name}}</a>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div class="list" v-if="item.collateral_type === '3'">
            <ul>
              <li>
                <span>公司名称：</span>
                <span>{{item.business_name}}</span>
              </li>
              <li>
                <span>股权比例：</span>
                <span>{{item.ratio}}</span>
              </li>
              <li>
                <span>评估报告：</span>
                <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                <p v-if="item.att_list.length !== 0 && item.att_list">
                  <span class='check' v-for="(it, index91) in item.att_list" :key='index91'>
                    <a :href="$root_url() + it.url" target='blank'>{{it.name}}</a>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div class="list" v-if="item.collateral_type === '4'">
            <ul>
              <li>
                <span>基金简称：</span>
                <span>{{item.foundation}}</span>
              </li>
              <li>
                <span>评估报告：</span>
                <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                <p v-if="item.att_list.length !== 0 && item.att_list">
                  <span class='check' v-for="(it, index91) in item.att_list" :key='index91'>
                    <a :href="$root_url() + it.url" target='blank'>{{it.name}}</a>
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <p class='is_null' v-if="other.length === 0">未提交其它担保</p>
      </div>
    </div>
    <person v-if="dialogVisiblePerson" @closeView='dialogVisiblePerson = false' :pid="pid" :pName="pName" :isAgent="isAgent" :top='true'></person>
  </div>
</template>
<script>
import person from '@/components/public/person-info'
export default {
  name: 'secondCard',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  components: {
    person
  },
  data () {
    return {
      diamondIcon: require('../../../../../static/img/chain/zuan_o.png'),
      disdiamondIcon: require('../../../../../static/img/chain/zuan_g.png'),
      second: [],
      ticket: [],
      other: [],
      secondSum: '',
      tickets: [
        '',
        {title: '银券', icon: require('../../../../../static/img/tickets/jq_01.png')},
        {title: '商券', icon: require('../../../../../static/img/tickets/yq_01.png')},
        {title: '数券', icon: require('../../../../../static/img/tickets/tq_01.png')}
      ],
      dialogVisiblePerson: false,
      pid: '',
      pName: '',
      isAgent: false,
      orderSum: '',
      nines: ['合同', '订单', '订金', '出货单', '运单', '验收入库单', '结算', '发票', '支付'],
      infoId: '',
      businessInfo: {}
    }
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/application/${that.id}/`).then(res => {
      if (res.status === 200) {
        let n = res.data.second_repayment
        that.other = res.data.application_data.other_collateral
        let second = []
        let ticket = []
        n.forEach((val, index) => {
          if (val.ticket !== '3') {
            second.push(val)
          } else {
            ticket.push(val)
          }
        })
        that.infoId = res.data.business
        that.$ajax.get(`/api/company/` + that.infoId + '?detail_info=1').then(res1 => {
          that.businessInfo = {
            id: res1.data.id,
            name: res1.data.detail_info.name,
            open_account_code: res1.data.detail_info.opening_bank_info.bank_account || false,
            open_account_name: res1.data.detail_info.opening_bank_info.bank_account_name || false,
            legal_person_name: res1.data.detail_info.legal_person_info.name || false,
            business_license: res1.data.detail_info.certificates.business_license || false,
            business_license_id: res1.data.detail_info.certificates.business_license_id || false,
            open_bank: res1.data.detail_info.opening_bank_info.bank_branch || false,
            legal_person_id: res1.data.detail_info.legal_person_info.id || false
          }
        })
        that.second = second
        that.ticket = ticket
      }
    })
  },
  methods: {
    // 计算订单总和
    handleSum (arr) {
      let s = 0
      if (arr) {
        arr.forEach(val => {
          if (val.amount) {
            s += Number(val.amount)
          } else {
            s += Number(val.appraisement)
          }
        })
      } else {
        return 'error'
      }
      return this.toThousands(s)
      // return this.s
    },
    // 跳转历史记账
    handleOrder (item, r) {
      const that = this
      // let p = item.over_rate.p_rate.order_list
      let partner = [item.partner_company]
      let company = that.infoId
      window.open(`#/myFund/order_list?partner=${partner}&company=${company}&tar=s`)
      // let s = item.over_rate.s_rate.order_list
      // window.open(`#/credit_app/order_list?s=${s}&p=${p}&pc=${item.partner_company}&pcn=${item.partner_company_name}&bn=${that.base.businessInfo.name}&bi=${that.base.businessInfo.bid}&r=${r}`)
    },
    // 跳转链式记账
    handleChain (el) {
      let query = {}
      let path = '#/chain_app/payment_chain'
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
      window.open(`${path}?id=${query.id}&id_list=${query.id_list}&financing_id=${query.id}`)
    },
    // 查看企业首页
    handleBusiness (el) {
      window.open('#/enterpriseBlog?bid=' + el.partner_company, '_black')
    },
    handleDetail (item) {
      let url = ''
      item.chain_type === '2' ? url = '#/chain_app/payment_chain?id=' : url = '#/chain_app/receive_chain?id='
      window.open(url + item.chain_id)
    },
    // 查看个人信息
    handlePerson (name, id) {
      if (id) {
        const that = this
        that.pName = name
        that.pid = id
        that.isAgent = false
        that.dialogVisiblePerson = true
      }
    },
    // 跳转企业
    handleOtherBusiness (id) {
      if (id) window.open('#/enterpriseBlog?bid=' + id, '_black')
    }
  },
  computed: {
    sum: function () {
      let s = Number(this.handleSum(this.second)) + Number(this.handleSum(this.ticket))
      return this.toThousands(s)
    }
  }
}
</script>
<style lang='less' scoped>
  .usage_card {
    width: 1280px;
    background: #f5f5f5;
    // box-shadow: 6px 6px 3px 5px #dadada;
    padding-bottom: 20px;
    font-size: 14px;
    .card_title {
      background: #666;
      padding: 0 20px;
      color: #fff;
      line-height: 44px;
    }
    .usage_slide {
      display: flex;
      height: 48px;
      align-items: center;
      padding: 0 20px;
      // background: #f4f4f4;
      color: #666;
      div:first-child {
        width: 50%;
        // text-align: center;
        // font-weight: bolder;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        span:last-child {
          color: #333;
        }
      }
    }
    .second {
      // padding: 0 20px;
      // display: flex;
      // justify-content: space-between;
      // align-items: flex-start;
      .business {
        background: #fff;
        padding: 0 20px;
        &>.business_line {
          display: flex;
          height: 48px;
          align-items: center;
          padding: 0;
          // width: 33%;
          div {
            width: 33%;
            color: #333;
            padding: 0 10px;
            span:first-child {
              color: #666;
            }
          }
        }
        .bank_line {
          padding: 0 10px;
          display: flex;
          height: 48px;
          align-items: center;
          color: #333;
          border-bottom: 1px dashed #e9e9e9;
          span:first-child {
            color: #666;
          }
        }
      }
      &>div {
        // width: 49%;
        // background: #fff;
        .second_title {
          line-height: 48px;
          padding: 0 40px;
          color: #666;
        }
        &>div:nth-of-type(even) {
          // background: #fff;
          padding: 0 20px;
        }
        .usage_item {
          background: #fff;
          padding: 20px;
          .info_title {
            height: 48px;
            display: flex;
            border-bottom: 1px solid #e9e9e9;
            color: #333;
            div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              span:nth-child(2) {
                margin-left: 10px;
                color: #666;
              }
            }
          }
          .contract_info {
            display: flex;
            div {
              height: 48px;
              line-height: 48px;
              overflow: hidden;
              text-overflow: ellipsis;
              padding: 0 10px;
              white-space: nowrap;
              width: 25%;
              span:first-child {
                color: #666;
              }
              span:last-child {
                .check;
                transition: all .15s ease-in;
              }
            }
          }
          .order_title {
            display: flex;
            div {
              width: 25%;
              height: 48px;
              line-height: 48px;
              overflow: hidden;
              text-overflow: ellipsis;
              padding: 0 10px;
              white-space: nowrap;
              color: #333;
              span:first-child {
                color: #666;
              }
              span:last-child {
                cursor: pointer;
                transition: all .15s ease-in;
              }
            }
          }
          .bank_title {
            display: flex;
            height: 48px;
            align-items: center;
            padding: 0 10px;
            color: #333;
            span:first-child {
              color: #666;
            }
          }
          .file_list {
            display: flex;
            min-height: 48px;
            &>span:first-child {
              height: 48px;
              line-height: 48px;
              color: #666;
              padding: 0 10px;
              width: 95px;
            }
            p {
              width: calc(100% - 95px);
              // text-align: center;
              padding: 0 40px;
              line-height: 48px;
              color: #999;
            }
            ul {
              margin-left: 40px;
              width: calc(100% - 360px);
              border: 1px solid #e3e3e3;
              li:first-child {
                background: #e3e3e3;
                color: #666;
              }
              li {
                display: flex;
                border-bottom: 1px dotted #e3e3e3;
                div {
                  width: 50%;
                  text-align: center;
                  line-height: 36px;
                  height: 36px;
                  color: #333;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  a {
                    color: #eb6100;
                  }
                }
              }
              li:last-child {
                border: none;
              }
            }
          }
          .diamond {
            position: relative;
            height: 96px;
            .line {
              position: absolute;
              border-top: 2px dotted #ccc;
              width: 100%;
              height: 0;
              left: 0;
              top: 27px;
              z-index: 0;
            }
            ul {
              width: 100%;
              display: flex;
              justify-content: space-between;
              position: absolute;
              top: 10px;
              z-index: 2;
              li {
                width: 48px;
                height: 56px;
                text-align: center;
                background: #fff;
                // background: #fff;
                img {
                  width: 32px;
                }
                p {
                  text-align: center;
                  line-height: 20px;
                  color: #666;
                }
              }
            }
          }
        }
        .other_item {
          border: 1px solid #e9e9e9;
          background: #fff;
          margin: 0 20px;
          .list {
            height: 48px;
            width: 100%;
            border-bottom:1px solid #e9e9e9;
            ul {
              display: flex;
              padding: 0 20px;
              li {
                width: 20%;
                height: 48px;
                line-height: 52px;
                text-overflow: ellipsis;
                display: flex;
                overflow: hidden;
                white-space: nowrap;
                &>span:first-child {
                  font-size:14px;
                  color:#666666;
                }
                &>span:last-child {
                  font-size:14px;
                  max-width: 140px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  color: #333;
                }
                p:last-child {
                  // width: 45%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  span {
                    margin: 0 5px;
                  }
                }
              }
            }
            ul:last-child {
              li:last-child {
                width: 40%;
              }
            }
          }
          .list:last-child {
            border: none;
          }
        }
        .is_null {
          height: 288px;
          line-height: 288px;
          text-align: center;
          color: #999;
          background: #fff;
          margin: 0 20px;
        }
      }
    }
  }
  .check {
    color: #eb6100;
    text-decoration: underline;
    cursor: pointer;
  }
  .null {
    color: #999;
  }
</style>
