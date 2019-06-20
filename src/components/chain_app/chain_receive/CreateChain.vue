<template>
  <div class="c_container">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="line_detail">
      <location :location="location"></location>
      <div class="line_title">
        <span>销售合同登记</span>
      </div>
      <div class="line_item" v-for='(title, index) in getting_titleList' :key='title.index'>
        <div class="item_symbol">
          <div></div>
        </div>
        <div class="item_info">{{title.name}}</div>
        <div class="create_btn" @click="create($event, 1, index)" :style="index !== 0 ? 'color: #bbb;' : ''">{{title.operate}}</div>
      </div>
      <div class="line_title" v-if="hostry !== 1">
        <span>关联记账背书</span>
      </div>
      <div class="line_item inline" v-for='(title, index) in paying_titleList' :key='index' v-if="hostry !== 1">
        <div class="item_symbol">
          <div></div>
        </div>
        <div class="item_info">{{title.name}}</div>
        <div class="create_btn" style="color: #bbb">{{title.operate}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Location from '@/components/location/location'
// import appNav from '@/components/financing/financingManege'
export default {
  name: 'chain_line',
  components: {
    // appNav, 
    Location
  },
  data () {
    return {
      location: [
        {title: '链式记账', url: '/chain_app'},
        {title: '开始记账'}
      ],
      father: {
        selIndex: 1
      },
      getting_titleList: [
        {name: 'B2B销售合同', operate: '+添加B2B销售合同', url: '/receivableContractCreate'},
        {name: 'B2B应收订金', operate: '+添加B2B应收订金', url: '/receivableDepositCreate'},
        {name: 'B2B电子订单', operate: '+添加B2B电子订单', url: '/orderList1'},
        {name: 'B2B电子出货单', operate: '+添加B2B电子出货单', url: '/waybillList1'},
        {name: 'B2B电子运单', operate: '+添加B2B电子运单', url: '/receipt1'},
        {name: 'B2B验收入库单', operate: '+添加B2B验收入库单', url: '/WarehouseReceiptList1'},
        {name: 'B2B订单结算', operate: '+添加B2B订单结算', url: '/settlement1'},
        {name: 'B2B发票', operate: '+添加B2B发票', url: '/invoice1'},
        {name: 'B2B支付', operate: '+添加B2B支付', url: '/payment1'},
        {name: 'B2B合同结算', operate: '+添加B2B合同结算', url: '/contractSettlement1'}
      ],
      paying_titleList: [
        {name: 'B2B采购合同', operate: '+添加B2B采购合同', url: '/receivableContractCreate'},
        {name: 'B2B应付订金', operate: '+添加B2B应付订金', url: '/receivableDepositCreate'},
        {name: 'B2B电子订单', operate: '+添加B2B电子订单', url: '/orderList1'},
        {name: 'B2B电子出货单', operate: '+添加B2B电子出货单', url: '/waybillList1'},
        {name: 'B2B电子运单', operate: '+添加B2B电子运单', url: '/receipt1'},
        {name: 'B2B验收入库单', operate: '+添加B2B验收入库单', url: '/WarehouseReceiptList1'},
        {name: 'B2B结算', operate: '+添加B2B结算', url: '/settlement1'},
        {name: 'B2B发票', operate: '+添加B2B发票', url: '/invoice1'},
        {name: 'B2B支付', operate: '+添加B2B支付', url: '/payment1'},
        {name: 'B2B合同结算', operate: '+添加B2B合同结算', url: '/contractSettlement1'}
      ],
      hostry: ''
    }
  },
  methods: {
    create: function ($event, el, index) {
      var that = this
      if (index !== 0) {
        that.$message.error('请先创建B2B销售合同')
      } else {
        let query = {
          chain_type: 1,
          navIndex: 0,
          contract_type: 1
        }
        that.$router.push({
          path: '/chain_app/contract',
          query
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .c_container{
    width: 100%;
    display: flex;
    //padding-top: 70px;
  }
  .line_detail {
    padding: 0 50px;
    background: #f5f7f8;
    // width: 100%;
    .line_title {
      margin: 0 auto;
      height: 60px;
      text-align: center;
      line-height: 60px;
      span {
        display: block;
        width: 100%;
        border-bottom: 4px solid #ccc;
        font-size: 22px;
        font-weight: bold;
      }
    }
    .line_item {
      border-left: 1px dashed #999;
      display: flex;
      height: 120px;
      position: relative;
      .item_symbol {
        position: absolute;
        left: -13px;
        top: 20px;
        width: 26px;
        height: 26px;
        background: #f3d9c6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          width: 14px;
          height: 14px;
          background: #eb6100;
          border-radius: 50%;
        }
      }
      .item_info {
        height: 24px;
        line-height: 24px;
        margin-top: 20px;
        margin-left: 15px;
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
      .create_btn {
        position: absolute;
        left: -60px;
        top: 50px;
        width: 160px;
        height: 30px;
        line-height: 30px;
        margin-left: 60px;
        font-size: 14px;
        background: #fff;
        border: 1px solid #b6b6b6;
        border-left: none;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        text-align: center;
        cursor: pointer;
        margin-top: 20px;
        &:hover{
          background: #eb6100;
          color: #fff;
          border: 1px solid #eb6100;
        }
      }
    }
    .inline {
      .item_symbol {
        background: #d1d8f4;
        div {
          background: #38adff;
        }
      }
      .create_btn:hover {
        background: #0099FF;
        color: #fff;
        border: 1px solid #0099FF;
      }
    }
  }
</style>
