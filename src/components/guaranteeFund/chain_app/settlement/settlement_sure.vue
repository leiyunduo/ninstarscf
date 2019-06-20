<template>
  <div class="settlement_container">
    <!-- <AppNav :father='{selIndex: 1}' type='1'></AppNav> -->
    <div class="settlement_section">
      <!-- 展示面包屑导航 -->
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <!-- 横向切换补充 -->
      <div class="order_nav">
        <ul>
          <li v-for="(item, index) in slideNav" :class="selIndex === index ? 'active' : ''" :key='index' @click="handleNav(index, item)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 单据view区 -->
      <div class="bills_wrap">
        <settlementView :selId='selId' v-if="showEdit" @childInfo='handleChild'></settlementView>
      </div>
    </div>
  </div>
</template>
<script>
import location from '@/components/location/location'
import settlementView from './settlementView'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'settleView',
  data () {
    return {
      location: [],
      role: 'business',
      selId: '0',
      slideNav: [],
      showItem: {},
      selIndex: 0,
      // 编辑/补充 顶级按钮
      showEdit: true,
      // 控制补充或者修改 prop
      showTitle: true,
      // 操作按钮状态
      // 不同操作的不同按钮状态，在handleTab, 和handleSupply 编辑
      btnStatus: '-1',
    }
  },
  components: {
    location, settlementView,
    //  AppNav
  },
  // 渲染location导航栏
  created () {
    const that = this
    let url = ''
    this.$route.query.chain_type === '1' ? url = '/chain_app/receive_chain?id=' + this.$route.query.chain_id : '/chain_app/payment_chain?id=' + this.$route.query.chain_id
    if (that.$route.query.fType) {
      that.location = [
        {title: '我的助贷', url: '/myFund'},
        {title: '赔付申请', url: '/myFundList'},
        {
          title: '链式记账详情',
          url: Number(this.chain_type) === 1
          ?
          '/fund/chain_detail?id=' + this.$route.query.chain_id
          :
          '/fund/chain_info?id=' + this.$route.query.chain_id
        },
        {
          title: '查看结算'
        }
      ]
    } else if (that.$route.query.zType) {
      that.location = [
        {title: '我的债权', url: '/myClaims'},
        {
          title: '链式记账详情',
          url: Number(this.chain_type) === 1
          ?
          '/fund/chain_detail?id=' + this.$route.query.chain_id
          :
          '/fund/chain_info?id=' + this.$route.query.chain_id
        },
        {
          title: '查看结算'
        }
      ]
    } else {
      that.location = [
        {title: '我的助贷', url: '/myFund'},
        {
          title: '链式记账详情',
          url: Number(this.chain_type) === 1
          ?
          '/fund/chain_detail?id=' + this.$route.query.chain_id
          :
          '/fund/chain_info?id=' + this.$route.query.chain_id
        },
        {
          title: '查看结算'
        }
      ]
    }
  },
  methods: {
    // 切换导航，显示不同数据
    handleNav (index, item) {
      this.showEdit = true
      this.selIndex = index
      this.selId = item.id
    },
    // 获取每次子组件更新数据
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
.settlement_container {
  display: flex;
  background: #f5f5f5;
  .settlement_section {
    padding-left: 20px;
    width: 100%;
    //padding-top: 70px;
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
    // height: 34px;
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
