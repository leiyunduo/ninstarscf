<template>
  <div class='financing_ring'>
    <div class='ring_wrap' v-if='getting'>
      <div class='roles'>
        <img :src="affonderPic" alt="">
        <p>供应商</p>
        <select @change='handleSelect($event)'>
          <option :value="item.partner_company_id" v-for="(item, index) in customers" :key='index' @click="handleBusiness(item.partner_company_id)">{{item.partner_company__name}}</option>
        </select>  
      </div>
      <ul>
        <li v-for="(item, index) in pTitle" :key='index' v-if="pPart[item.key]">
          <div class="line" :style='pPart[item.key].length !== 0 ? "border-color: #53aefe;" : ""'></div>
          <div class="date date_b" v-if="index === 0">
            <p>应付账期=+{{pPart[item.key][0].days}}天</p>
          </div>
          <div class="date date_b" v-if="index === 2">
            <p>贷款周期={{financingDate > 0 ? '+' + financingDate : financingDate}}天</p>
          </div>
          <div class='date date_b' v-if="index === 8">
            <p>{{paymentDate}}</p>
          </div>
          <img :src="handlePic('p', item.key, index)" alt="" :class='(index === 8 && pPart[item.key].length === 0) && paymentTime <= 7 ? "flash" : "no"'>
          <p>
            <span @click="handleSlide(0, index, item.slide)" class='payment_item'>{{item.title}}</span>
            <i v-if="index !== 2 && index !== 9"  :class="item.slide ? 'el-icon-caret-bottom' : 'el-icon-caret-left'" @click="handleSlide(0, index, item.slide)"></i>
          </p>
          <ul class='inner_list inner_list_p' v-if="(index !== 2 && index !== 9) && item.slide">
            <li v-for="(info, infoIndex) in pPart[item.key]" :key='infoIndex' @click="hanldeDetail(info, item.key, 0)">{{info.name}}</li>
            <li v-if="pPart[item.key].length === 0">暂无{{pTitle[index].title}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class='ring_wrap' v-if='getting'>
      <ul>
        <li v-for="(item, index) in sTitle" :key='index' v-if="sPart[item.key]">
          <div class="line" :style='sPart[item.key].length !== 0 ? "border-color: #eb6100;" : ""'></div>
          <div class="date date_o" v-if="index === 0">
            <p>应收账期=+{{sPart[item.key][0].days}}天</p>
          </div>
          <div class='date date_o' v-if="index === 7">
            <p>{{saleDate}}</p>
          </div>
          <div class='date date_o' v-if="index === 9">
            <p>{{repaymentInfo}}</p>
          </div>
          <img :src="handlePic('s', item.key, index)" alt="" :class='(index === 7 && sPart[item.key].length === 0 && saleTime <= 7) || (index === 9 && repaymentDate <= 7) ? "flash" : "no"'>
          <p>
            <span @click="handleSlide(1, index, item.slide)" class='sale_item'>{{item.title}}</span>
            <i v-if="index !== 8 && index !== 9" :class="item.slide ? 'el-icon-caret-bottom' : 'el-icon-caret-left'" @click="handleSlide(1, index, item.slide)"></i>
          </p>
          <ul class='inner_list inner_list_s' v-if="(index !== 8 && index !== 9) && item.slide">
            <li v-for="(info, infoIndex) in sPart[item.key]" :key='infoIndex' @click="hanldeDetail(info, item.key, 1)">{{info.name}}</li>
            <li v-if="sPart[item.key].length === 0">暂无{{pTitle[index].title}}</li>
          </ul>
        </li>
      </ul>
      <div class='roles'>
        <img :src="customerPic" alt="">
        <p>客户</p>
        <p @click="handleBusiness(affonder.partner_company_id)">{{affonder.partner_company__name}}</p>      
      </div>
    </div>  
    <p class='getting_tip' v-if="!getting">进度计算中...</p>
    <img :src="mine" alt="" @click="handleChain">
  </div>
</template>
<script>
export default {
  name: 'financingRing',
  props: {
    id: {
      type: String
    },
    businessId: {
      trpe: String,
      default: ''
    },
    financingDate: {
      type: Number,
      default: 90
    },
    repaymentDate: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      sPart: {},
      pPart: {},
      getting: false,
      sTitle: [
        {title: '销售合同', key: 'Contract', slide: false},
        {title: '销售订单', key: 'Order', slide: false},
        {title: '销售出货单', key: 'Warehouse', slide: false},
        {title: '销售运单', key: 'Transport', slide: false},
        {title: '销售验收单', key: 'Acceptance', slide: false},
        {title: '销售结算', key: 'Settlement', slide: false},
        {title: '销售发票', key: 'Invoice', slide: false},
        {title: '销售支付', key: 'Payment', slide: false},
        {title: '合同结算', key: 'ContractSettlement', slide: false},
        {title: '还款', key: 'Repayment', slide: false}
      ],
      pTitle: [
        {title: '采购合同', key: 'Contract', slide: false},
        {title: '采购订单', key: 'Order', slide: false},
        {title: '融资', key: 'Financing', slide: false},
        {title: '采购出货单', key: 'Warehouse', slide: false},
        {title: '采购运单', key: 'Transport', slide: false},
        {title: '采购验收单', key: 'Acceptance', slide: false},
        {title: '采购结算', key: 'Settlement', slide: false},
        {title: '采购发票', key: 'Invoice', slide: false},
        {title: '采购支付', key: 'Payment', slide: false},
        {title: '合同结算', key: 'ContractSettlement', slide: false}
      ],
      sRing: require('../../../../static/img/public_ring/ring_orange_r.png'),
      pRing: require('../../../../static/img/public_ring/supplier_list.png'),
      nRing: require('../../../../static/img/public_ring/null_l.png'),
      wRing: require('../../../../static/img/public_ring/ring_red.png'),
      mine: require('../../../../static/img/public_ring/me.png'),
      up: require('../../../../static/img/public_ring/goup.png'),
      upB: require('../../../../static/img/public_ring/goup-b.png'),
      upN: require('../../../../static/img/public_ring/goup-n.png'),
      customerPic: require('../../../../static/img/public_ring/customer.png'),
      affonderPic: require('../../../../static/img/public_ring/supplier.png'),
      pfalseIndex: null,
      sfalseIndex: null,
      chainId: '',
      paymentDate: '',
      paymentTime: '',
      saleDate: '',
      saleTime: '',
      repaymentInfo: '',
      customers: [],
      affonder: {}
    }
  },
  created () {
    const that = this
    // console.log(that.businessId)
    that.$ajax.get('/api/chain/circle/contract_list/?chain_id=' + that.id).then(res1 => {
      // 销售合同
      // that.chainId = res.data.financing_application.application_data.chain_id
      that.$ajax.get(`/api/chain/circle/${res1.data.s_contract[0].id}/`).then(res2 => {
        res1.data.s_contract[0].days = (res1.data.s_contract[0].payment_period && res1.data.s_contract[0].delivery_period) ? res1.data.s_contract[0].payment_period + res1.data.s_contract[0].delivery_period : null || that.$route.query.day1 || '90'
        if (res2.data.info.Payment.length !== 0) {
          that.saleDate = `应收倒计时=0天`
        } else {
          let saleTime = that.handleDate(new Date(res1.data.s_contract[0].date_created).getTime(), res1.data.s_contract[0].days)
          that.saleTime = saleTime
          that.saleDate = `应收倒计时=${saleTime < 0 ? saleTime : '+' + saleTime}天`
        }
        that.sPart = res2.data.info
        that.sPart.Contract = res1.data.s_contract
        that.sPart.Repayment = []
        that.repaymentInfo = `还款倒计时=${that.repaymentDate < 0 ? that.repaymentDate : '+' + that.repaymentDate}天`
        res2.data.info.Payment.length !== 0 ? that.sPart.ContractSettlement = [{}] : that.sPart.ContractSettlement = []
      })
      // 采购合同（单个）
      that.$ajax.get(`/api/chain/circle/${res1.data.p_contract[0].id}/`).then(res2 => {
        that.pPart = res2.data.info
        res1.data.p_contract[0].days = (res1.data.p_contract[0].payment_period && res1.data.p_contract[0].delivery_period) ? res1.data.p_contract[0].payment_period + res1.data.p_contract[0].delivery_period : null || that.$route.query.day1 || '90'
        if (res2.data.info.Payment.length !== 0) {
          that.paymentDate = `应付倒计时=0天`
        } else {
          let paymentDate = that.handleDate(new Date(res1.data.p_contract[0].date_created).getTime(), res1.data.p_contract[0].days)
          that.paymentTime = paymentDate
          that.paymentDate = `应付倒计时=${paymentDate < 0 ? paymentDate : '+' + paymentDate}天`
        }
        that.pPart.Contract = res1.data.p_contract
        res2.data.info.Payment.length !== 0 ? that.pPart.ContractSettlement = [{}] : that.pPart.ContractSettlement = []
        that.pPart.Financing = [{financing_date: that.financingDate}]
        this.getting = true
      })
      // 获取供应商和客户
      that.$ajax.get(`/api/chain/company/${that.businessId}/partners/?chain_id=${that.id}`).then(res2 => {
        // console.log(res2)
        that.affonder = res2.data.s_partners[0]
        that.customers = res2.data.p_partners
      })
    })
  },
  methods: {
    // 计算总和
    handleOperate (arr, sw) {
      let q = []
      arr.forEach(val => {
        if (val.order) {
          val.order.forEach(el => {
            q.push(el.diamond)
          })
        }
      })
      let obj = q[0]
      q.forEach((val, index) => {
        for (let i in val) {
          if (index !== q.length - 1) {
            obj[i] = val[i] + q[index + 1][i]
          }
        }
      })
      sw ? obj.Financing = true : obj.Repayment = true
      obj.ContractSettlement = true
      return obj
    },
    // 查看列表
    handleSlide (sw, index, key) {
      const that = this
      let {pTitle, sTitle} = that
      let arr = []
      sw === 0 ? arr = pTitle : arr = sTitle
      arr.forEach((val, i) => {
        i === index ? val.slide = !val.slide : val.slide = false
      })
    },
    // 查看详情
    hanldeDetail (item, key, sw) {
      const that = this
      let urls = {
        Contract: '#/credit_app/chain_detail/contract?' + (sw === 'p' ? '&contract_type=2' : '&contract_type=1') + '&only=1&contract_id=',
        Order: '#/credit_app/chain_detail/order?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&order_id=',
        Warehouse: '#/credit_app/chain_detail/outbound?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&warehouse_id=',
        Transport: '#/credit_app/chain_detail/waybill?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + 'transport_id=',
        Acceptance: '#/credit_app/chain_detail/acceptance?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&acceptance_id=',
        Settlement: '#/credit_app/chain_detail/settlement?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + 'settlement_id=',
        Invoice: '#/credit_app/chain_detail/invoice?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + 'invoice_id=',
        Payment: '#/credit_app/chain_detail/payment?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + 'payment_id='
      }
      let str = urls[key] + item.id + '&chain_id=' + that.id + '&chain_type=2'
      window.open(str, '_black')
    },
    // 判断显示进度图片
    handlePic (part, key, index) {
      let { pRing, sRing, wRing, nRing, pPart, sPart, paymentTime, saleTime, repaymentDate } = this
      if (part === 'p') {
        if (index === 8) {
          if (pPart[key].length !== 0) {
            return pRing
          } else {
            if (paymentTime <= 7) {
              return wRing
            } else {
              return nRing
            }
          }
        } else {
          if (pPart[key].length !== 0) {
            return pRing
          } else {
            return nRing
          }          
        }
      } else if (part === 's') {
        if (index === 7) {
          if (sPart[key].length !== 0) {
            return sRing
          } else {
            if (saleTime <= 7) {
              return wRing
            } else {
              return nRing
            }
          }
        } else if (index === 9) {
          if (repaymentDate > 7) {
            return nRing
          } else {
            return wRing
          }
        } else {
          if (sPart[key].length !== 0) {
            return sRing
          } else {
            return nRing
          }
        }
      }
    },
    // 计算账期
    handleDate (createStamp, day) {
      let todayStamp = new Date().getTime()
      let realStamp = todayStamp - createStamp
      let realDay = Math.floor(realStamp / 1000 / 60 / 60 / 24)
      return day - realDay - 1
    },
    // 跳转链式记账
    handleChain () {
      window.open('#/credit_app/chain_info?sel=3&id=' + this.id, '_blank')
    },
    // 跳转企业博客
    handleBusiness (id) {
      window.open('#/enterpriseBlog?bid=' + id + '&histor=1', '_black')
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes flash
{
  from { opacity: 1;}
  70% { opacity: 0.24;}
  to {opacity: 1;}
}
@-webkit-keyframes flash
{
  from { opacity: 1;}
  70% { opacity: 0.24;}
  to {opacity: 1;}
}
@-moz-keyframes flash
{
  from { opacity: 1;}
  70% { opacity: 0.24;}
  to {opacity: 1;}
}
.flash {
  animation: flash 1s ease-in-out infinite;
}
.payment_item:hover {
  cursor: pointer;
  color: rgb(83, 174, 254);
}
.sale_item:hover {
  cursor: pointer;
  color: #eb6100;
}
.financing_ring {
  width: 100%;
  position: relative;
  display: flex;
  padding-bottom: 36px;
  padding-top: 64px;
  font-size: 14px;
  justify-content: space-between;
  .ring_wrap {
    width: calc(50% - 10px);
    display: flex;
    &>ul {
      display: flex;
      width: 90%;
      &>li {
        position: relative;
        height: 95px;
        width: 52%;
        color: #777;
        text-align: center;
        .line {
          position: absolute;
          top: 14%;
          width: 100%;
          left: 57%;
          border-top: 4px solid #999;
        }
        .o_line {
          position: absolute;
          top: 22%;
          width: 60%;
          left: -3%;
          border-top: 4px solid #eb6100;          
        }
        .date {
          position: absolute;
          width: 128%;
          top: -64px;
          left: -14%;
          padding: 5px;
          border: 1px solid #eaeaea;
          border-radius: 3px;
          
          // text-align: center;
          p {
            line-height: 20px;
            height: 40px;
          }
        }
        .date_o {
          color: #eb6100;
          border-color: #ffefe4;
          box-shadow: 0px 0px 6px 0px rgba(235, 97, 0, .2);
        }
        .date_b {
          color: #0c8dff;
          border-color: #ebf6ff;
          box-shadow: 0px 0px 6px 0px rgba(12, 141, 255, .2);
        }
        p {
          line-height: 24px;
          font-size: 12px;
          i {
            cursor: pointer;
          }
        }
        .inner_list{
          position: absolute;
          top: 54px;
          width: 150%;
          border: 1px solid #eaeaea;
          padding: 0 10px;
          left: 0;
          text-align: left;
          font-size: 12px;
          line-height: 20px;
          background: #fff;
          z-index: 2;
          li {
            cursor: pointer;
          }
        }
        .inner_list_p{
          li:hover {
            color: #53aefe;
          }
        }
        .inner_list_s{
          li:hover {
            color: #eb6100;
          }
        }
        img {
          background: #fff;
          position: relative;
          z-index: 2;
        }
      }
    }
    .roles {
      width: 10%;
      height: 100%;
      overflow: hidden;
      text-align: center;
      margin-top: -45px;
      &>img:first-child {
        height: 25px;
      }
      &>p:nth-child(2) {
        color: #333;
        text-align: center;
        font-weight: bolder;
        font-size: 16px;;
      }
      p:last-child {
        margin-top: 5px;
        color: #eb6100;
        text-align: center;
        cursor: pointer;
        // overflow: hidden;
      }
      select:last-child {
        margin-top: 15px;
        padding: 0;
        width: 100%;
        outline: none;
        option {
          width: 100%;
        }
      }
    }
  }
  .ring_wrap:nth-child(2) {
    &>ul {
      li:last-child {
        .line {
          display: none;
        }
      }
    }
  }
  &>img {
    position: absolute;
    // width: 6%;
    top: 60px;
    width: 36px;
    z-index: 2;
    left: calc(50% - 16px);
    cursor: pointer;
  }
  .getting_tip {
    text-align: center;
    width: 100%;
    line-height: 64px;
    color: #333;
  }
}
</style>
