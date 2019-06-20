<template>
  <div class='financing_ring'>
    <div class='ring_wrap' v-if='getting'>
      <ul>
        <li v-for="(item, index) in pTitle" :key='index' v-if="pPart[item.key]">
          <div class="line" :style='pPart[item.key].length !== 0 ? "border-color: #53aefe;" : ""'></div>
          <img :src="pPart[item.key].length !== 0 ? pRing : nRing" alt="" :class='index === pfalseIndex ? "fade" : ""'>
          <p>
            <span>{{item.title}}</span>
            <i v-if="index !== 2 && index !== 9"  :class="item.slide ? 'el-icon-caret-bottom' : 'el-icon-caret-left'" @click="handleSlide(0, index, item.slide)"></i>
          </p>
          <ul class='inner_list inner_list_p' v-if="(index !== 2 && index !== 9) && item.slide">
            <li v-for="(info, infoIndex) in pPart[item.key]" :key='infoIndex' @click="hanldeDetail(info, item.key, 'p')">{{info.name}}</li>
            <li v-if="pPart[item.key].length === 0">暂无{{pTitle[index].title}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class='ring_wrap' v-if='getting'>
      <ul>
        <li v-for="(item, index) in sTitle" :key='index' v-if="sPart[item.key]">
          <div class="line" :style='sPart[item.key].length !== 0 ? "border-color: #eb6100;" : ""'></div>
          <div class="o_line" v-if='index === 0'></div>
          <img :src="sPart[item.key].length !== 0 ? sRing : nRing" alt="" :class='index === sfalseIndex ? "fade" : ""'>
          <p>
            <span>{{item.title}}</span>
            <i v-if="index !== 8 && index !== 9" :class="item.slide ? 'el-icon-caret-bottom' : 'el-icon-caret-left'" @click="handleSlide(1, index, item.slide)"></i>
          </p>
          <ul class='inner_list inner_list_s' v-if="(index !== 8 && index !== 9) && item.slide">
            <li v-for="(info, infoIndex) in sPart[item.key]" :key='infoIndex' @click="hanldeDetail(info, item.key, 's')">{{info.name}}</li>
            <li v-if="sPart[item.key].length === 0">暂无{{sTitle[index].title}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <p class="getting_tip" v-if="!getting">进度计算中</p>
    <img :src="mine" alt="">
  </div>
</template>
<script>
export default {
  name: 'financingRing',
  props: {
    id: {
      type: String
    },
    flash: {
      trpe: Boolean,
      default: true
    }
  },
  data () {
    return {
      sPart: {
        Contract: [],
        Order: [],
        Repayment: [],
        Warehouse: [],
        Transport: [],
        Acceptance: [],
        Settlement: [],
        Invoice: [],
        Payment: [],
        ContractSettlement: []
      },
      pPart: {
        Contract: [],
        Order: [],
        Financing: [],
        Warehouse: [],
        Transport: [],
        Acceptance: [],
        Settlement: [],
        Invoice: [],
        Payment: [],
        ContractSettlement: []
      },
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
      mine: require('../../../../static/img/public_ring/me.png'),
      pfalseIndex: null,
      sfalseIndex: null,
      chainId: '',
      getting: false
    }
  },
  created () {
    const that = this
    that.$ajax.get('/api/chain/circle/contract_list/?chain_id=' + this.id).then(res1 => {
      // 采购合同（单个）
      if (res1.data.p_contract.length !== 0) {
        that.$ajax.get(`/api/chain/circle/${res1.data.p_contract[0].id}/`).then(res3 => {
          that.pPart = res3.data.info
          that.pPart.Contract = res1.data.p_contract
          res3.data.info.Payment.length !== 0 ? that.pPart.ContractSettlement = [{}] : that.pPart.ContractSettlement = []
          that.pPart.Financing = [{}]
        })
      }
      // 销售合同
      that.$ajax.get(`/api/chain/circle/${res1.data.s_contract[0].id}/`).then(res2 => {
        that.sPart = res2.data.info
        that.sPart.Contract = res1.data.s_contract
        res2.data.info.Payment.length !== 0 ? that.sPart.ContractSettlement = [{}] : that.sPart.ContractSettlement = []
        that.sPart.Repayment = []
        that.getting = true
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
      // console.log(q)
      let obj = q[0]
      q.forEach((val, index) => {
        for (let i in val) {
          if (index !== q.length - 1) {
            obj[i] = val[i] + q[index + 1][i]
          }
        }
      })
      // console.log(obj)
      sw ? obj.Financing = true : obj.Repayment = true
      obj.ContractSettlement = true
      return obj
    },
    handleFlash (el, sw) {
      // console.log()
      const that = this
      if (sw === 'p') {
        let i = 0
        this.pTitle.forEach((val, index) => {
          if (!that.pPart[val.key]) {
            i = index 
          }
        })
        return i
      }
    },
    handleSlide (sw, index, key) {
      const that = this
      let {pTitle, sTitle} = that
      let arr = []
      sw === 0 ? arr = pTitle : arr = sTitle
      arr.forEach((val, i) => {
        i === index ? val.slide = !val.slide : val.slide = false
      })
    },
    hanldeDetail (item, key, sw) {
      const that = this
      let urls = {
        Contract: '#/credit_app/chain_detail/contract?only=1&&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id),
        Order: '#/credit_app/chain_detail/order?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&order_id=',
        Warehouse: '#/credit_app/chain_detail/outbound?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&warehouse_id=',
        Transport: '#/credit_app/chain_detail/waybill?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&transport_id=',
        Acceptance: '#/credit_app/chain_detail/acceptance?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&acceptance_id=',
        Settlement: '#/credit_app/chain_detail/settlement?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&settlement_id=',
        Invoice: '#/credit_app/chain_detail/invoice?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&invoice_id=',
        Payment: '#/credit_app/chain_detail/payment?only=1&contract_id=' + (sw === 'p' ? that.pPart['Contract'][0].id : that.sPart['Contract'][0].id) + '&payment_id='
      }
      let str = key !== 'Contract' ? urls[key] + item.id + '&chain_id=' + that.id : urls[key] + '&chain_id=' + that.id
      window.open(str, '_black')
    }
  }
}
</script>
<style lang="less" scoped>
.financing_ring {
  width: 100%;
  position: relative;
  display: flex;
  padding: 36px 0;
  font-size: 14px;
  justify-content: space-between;
  .ring_wrap {
    width: calc(50% - 10px);
    &>ul {
      display: flex;
      &>li {
        position: relative;
        width: 52%;
        color: #777;
        text-align: center;
        .line {
          position: absolute;
          top: 18%;
          width: 78%;
          left: 57%;
          border-top: 2px dotted #999;
        }
        .o_line {
          position: absolute;
          top: 18%;
          width: 60%;
          left: -3%;
          border-top: 2px dotted #eb6100;          
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
          top: 70px;
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
  .getting_tip {
    text-align: center;
    width: 100%;
    line-height: 64px;
    color: #eb6100;
  }
  &>img {
    position: absolute;
    // width: 6%;
    top: 26px;
    width: 36px;
    z-index: 2;
    left: calc(50% - 16px);
  }
}
</style>
