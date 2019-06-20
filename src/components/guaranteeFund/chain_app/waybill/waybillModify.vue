<template>
  <div id="waybillOrder">
    <!-- <appNav :father='step' type='2'></appNav> -->
    <div class="outbound">
      <location :location='location'></location>
      <div class="outbound_list">
        <div class="order_nav">
          <nav-bar :buttonList='buttonList' :btnStatus='`1`' @changeItem='handleChange'></nav-bar>
        </div>
        <div class="list">
          <div>
            <waybill-List :ruleForm='ruleForm'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
import navBar from '../base/navBar'
// 查看
import waybillList from './waybillList'
// 导航
export default {
  data () {
    return {
      step: {selIndex: 1},
      buttonList: [],
      showIndex: -2,
      create: 2,
      ruleFormList: {
        name: '',
        date_created: '',
        note: '',
        product: [],
        att_list: [],
        service_company_name: '',
        driver_person_id: '',
        driver: '',
        phone: '',
        start_point: '',
        end_point: ''
      }
    }
  },
  components: {
    Location, 
    // AppNav, 
    waybillList, navBar
  },
  created () {
    var that = this
    that.chain_id = that.$route.query.chain_id
    that.id = that.$route.query.transport_id
    that.chain_type = that.$route.query.chain_type
    that.cid = that.$route.query.contract_id
    that.order_id = that.$route.query.order_id
    that.ruleForm = {}
    let _url = (this.chain_type === `1`) ? '/chain_app/receive_chain?id='+this.chain_id : '/chain_app/payment_chain?id='+this.chain_id
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
          title: '查看运单'
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
          title: '查看运单'
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
          title: '查看运单'
        }
      ]
    }
    that.$ajax.get(`/api/chain/transport/${that.id}`).then(res => {
      console.log(res)
      if (res.status === 200) {
        that.ruleForm = res.data
        that.ruleFormList.name = res.data.name
        that.ruleFormList.service_company_id = res.data.service_company_id
        that.ruleFormList.service_company_name = res.data.service_company_name
        let buttonList = []
        res.data.id_list.forEach((val, index) => {
          index === 0 ? buttonList.push({name: val.name, id: val.id}) : buttonList.push({name: '变更' + index, id: val.id})
        })
        that.buttonList = buttonList
        if (res.data.product.length > 0) {
          let product = '', productList = []
          res.data.product.forEach(element => {
            product = {
              product_name : element[0],
              product_unit : element[1],
              product_num : element[2],
              product_price : element[3],
              isEdit: false
            }
            productList.push(product)
          })
          that.ruleForm.product = productList
        }
      }
    })
  },
  methods: {
    addChanges (n) {
      var that = this
      this.showIndex = n._index
      this.ruleFormList.pre_id = n.prev_id
    },
    handleChange (e) {
      console.log(e)
      const that = this
      this.showIndex = e._index
      if (!e._item.id) return
      that.$ajax.get(`/api/chain/transport/${e._item.id}`).then(res => {
        if (res.status === 200) {
          that.ruleForm = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#waybillOrder {
  width: 100%;
  display: flex;
  height: 100%;
  //padding-top: 70px;
  min-height: 100%;
  .outbound {
    background: #f5f7f8;
    padding-bottom: 100px;
    height: 100%;
    // width: 100%;
    min-height: 100%;
    overflow-y: auto;
    .location {
      background: #fff;
      border-radius:2px;
      height:52px;
    }
    .outbound_list {
      padding: 0 50px;
      .order_nav {
        border-bottom: 3px solid #e87626;
        display: flex;
        align-items: flex-end;
        width: 100%;
        margin: 20px 0;
        border-radius:2px;
        padding: 0 70px 0 0px;
        ul,li{
          display: inline-block;
        }
        .c_tab_item{
          display: inline-block;
          border-bottom: 4px solid transparent;
          cursor: pointer;
          padding: 10px 34px;
          &.active{
            border-bottom: 4px solid #eb6100;
            color: #eb6100;
          }
        }
        .inst {
          // background: rgba(204, 204, 204, 1);
          width: 80px;
          height: 32px;
          line-height: 4px;
          margin-left: 6px;
          border: 1px solid #bfbfbf;
          transition: all .16s ease-in;
          border-bottom: none;
          border-radius: 0;
          background: none;
          outline: none;
        }
        .inst:hover {
          color: #fff;
          border-color: #eb6100;
          background: #eb6100;
        }
      }
      .top {
        background:#ffffff;
        border:1px solid #e1e6f0;
        border-radius:2px;
        width:100%;
        height:120px;
        margin: 20px 0;
        padding: 0 32px;
        .top_top {
          height: 55px;
          border-bottom: 1px solid #cccccc;
          h3 {
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:center;
            border-left: 5px solid #eb6100;
            padding: 0 20px 0 4px;
            font-weight: bold;
            p {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#999999;
              letter-spacing:0;
              text-align:center;
              span {
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#eb6100;
                letter-spacing:0;
                text-align:center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
