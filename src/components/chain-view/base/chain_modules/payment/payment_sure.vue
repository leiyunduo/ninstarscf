<template>
  <div class="papers_container">
    <!-- <AppNav :father='step'></AppNav> -->
    <div class="payment_section">
      <div class="location_wrap">
        <location :location='location' v-if="!(role === 'institution' || role ==='institutionperson')"></location>
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
        <paymentView v-if="showEdit" @childInfo='handleChild' :selId='selId'></paymentView>
      </div>
    </div>
  </div>
</template>
<script>
import location from '@/components/location/location'
import paymentView from './paymentView'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'paymentShow',
  data () {
    return {
      btnStatus: '-1',
      showEdit: true,
      showItem: {},
      showTitle: true,
      selId: '0',
      contractId: '0',
      slideNav: [],
      selIndex: 0,
      step: {}
    }
  },
  components: {
    location, paymentView, 
    // AppNav
  },
  mounted () {
    if (this.$route.query.claim) {
      this.step.selIndex = 2
    } else {
      this.step.selIndex = 1
    }
  },
  beforeCreate () {
    var that = this
    that.chain_id = that.$route.query.chain_id
    that.contract_id = that.$route.query.contract_id
    that.confirmId = this.$route.query.confirmId
    that.role = localStorage.role
    // that.idList = this.$route.query.idList
    let _url = "", _title = '支付'
    _url = Number(this.chain_type) === 1 ? '/credit_app/chain_detail?id=' + this.chain_id : '/credit_app/chain_info?id='+this.chain_id
    this.location = [
      {
        title: '企业记账',
        url: _url
      },
      {
        title: _title
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
    // 获取子组件信息
    handleChild (e) {
      this.btnStatus = e.status
      this.slideNav = e.slide
      this.contractId = e.contractId
      this.selIndex = e.slide.length - 1
    }
  }
}
</script>
<style lang="less" scoped>
.papers_container {
  .payment_section {
    width: 100%;
    //padding-top: 70px;
    padding-left: 20px;
  }
  display: flex;
  background: #f5f5f5;
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
      // li:last-child {
      //   margin-left: 15px;
      // }
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
    // height: 36px;
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
