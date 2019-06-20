<template>
  <div class="settlement_container">
    <!-- <AppNav :father='{selIndex: 1}'></AppNav> -->
    <div class="invoice_section">
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <!-- 航向切换补充 -->
      <div class="order_nav">
        <ul>
          <li v-for="(item, index) in slideNav" :class="selIndex === index ? 'active' : ''" :key='index' @click="handleNav(index, item)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="bills_wrap">
        <invoiceView v-if="showEdit" @childInfo='handleSlide' :selId='selId'></invoiceView>
      </div>
    </div>
  </div>
</template>
<script>
import location from '@/components/location/location'
import invoiceView from './invoiceView'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'invoiceShow',
  data () {
    return {
      role: 'business',
      selIndex: 0,
      selId: '0',
      // 用 child 获取
      slideNav: [],
      showItem: {},
      showEdit: true,
      // 控制编辑或者补充
      showTitle: true,
      btnStatus: true
    }
  },
  components: {
    location, invoiceView, 
    // AppNav
  },
  // 构建location数据
  beforeCreate () {
    var that = this
    that.contract_id = that.$route.query.contract_id
    that.confirmId = this.$route.query.confirmId
    // that.idList = this.$route.query.idList
    let _url = ''
    if (that.chain_id) {
      _url = (that.chain_type === `1`) ? '/chain_app/receive_chain?id=' + that.chain_id : '/chain_app/payment_chain?id=' + that.chain_id
    } else {
      _url = '/chain_app/cooperation_chain?id=' + that.contract_id + '&confirmId=' + that.confirmId
    }
    this.location = [
      {
        title: that.chain_id ? '链式记账' : '协同确认',
        url: _url
      },
      {
        title: '发票'
      }
    ]
  },
  methods: {
    // 切换导航，显示不同数据
    handleNav (index, item) {
      this.showEdit = true
      this.selIndex = index
      this.selId = item.id
    },
    // 从子组件获取slide 数字
    handleSlide (e) {
      this.slideNav = e.slide
      this.btnStatus = e.status
      this.contractId = e.contractId
      this.settlementId = e.settlementId
      this.selIndex = e.slide.length - 1
      // 修改操作按钮状态
    }
  }
}
</script>
<style lang="less" scoped>
.settlement_container {
  display: flex;
  background: #f5f5f5;
  .invoice_section {
    width: 100%;
    //padding-top: 70px;
    padding-left: 20px;
  }
  .location_wrap {
    background: #fff;
  }
  .order_nav {
    background:#ffffff;
    width:100%;
    height:42px;
    margin-top: 30px;
    ul {
      display: flex;
      flex-direction: row;
      border-bottom: 3px solid #e87626;
      li {
        min-width: 120px;
        padding: 0 8px;
        text-align: center;
        height: 42px;
        list-style: none;
        cursor: pointer;
        line-height: 42px;
        span {
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#999999;
          letter-spacing:0;
          text-align:center;
          font-weight: bold;
        }
      }
      .active {
        background:#e87626;
        span {
          color: #fff;
        }
      }
    }
  }
  .bills_wrap {
    padding: 40px 25px;
  }
  .btn_list {
    display: flex;
    padding: 37px 0;
    justify-content: center;
    div {
      width: 120px;
      height: 100%;
      line-height: 34px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid #eb6100;
      margin: 0 70px;
      cursor: pointer;
    }
    div:first-child {
      color: #eb6100;
    }
    div:last-child {
      background: #eb6100;
      color: #fff;
    }
  }
}
</style>
