<template>
  <div id="acceptanceOrder">
    <!-- <appNav :father='step' type='2'></appNav> -->
    <div class="outbound">
      <location :location='location'></location>
      <div class="outbound_list">
        <div class="order_nav">
          <nav-bar :buttonList='buttonList' :btnStatus='btnStatus' @changeItem='handleChange'></nav-bar>
        </div>
        <div class="list">
          <acceptance-edit v-if="showIndex === buttonList.length-1" :isOrigin="isOrigin" :create='create' :id='id' :chainId="chain_id" :chainType="chain_type" :ruleFormList='ruleFormList'/>
          <acceptance-list v-else :ruleForm='ruleForm'/> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
import navBar from '@/components/chain_app/base/public/navBar'
import acceptanceEdit from './acceptanceEdit'
import acceptanceList from './acceptanceList'
export default {
  data () {
    return {
      step: {selIndex: 1},
      chain_id: '',
      chain_type: '',
      id: '',
      create: 0,
      buttonList: [],
      ruleForm: {
        name: '',
        date_created: '',
        keeper: '',
        phone: '',
        service_company_name: '',
        product: [],
        att_list: [],
        note: ''
      },
      ruleFormList: {
        name: '',
        date_created: '',
        keeper: '',
        phone: '',
        service_company_name: '',
        product: [],
        att_list: [],
        note: ''
      },
      btnStatus: `0`,
      showIndex: '',
    }
  },
  components: {
    Location, 
    // AppNav, 
    acceptanceEdit, acceptanceList, navBar
  },
  created () {
    var that = this
    that.chain_id = that.$route.query.chain_id
    that.id = that.$route.query.acceptance_id
    that.chain_type = that.$route.query.chain_type
    let _url = (this.chain_type === `1`) ? '/chain_app/receive_chain?id='+this.chain_id : '/chain_app/payment_chain?id='+this.chain_id
    this.location = [
      {
        title: '链式记账',
        url: _url
      },
      {
        title: '验收入库单'
      }
    ]
    that.$ajax.get(`/api/chain/acceptance/${that.id}`).then(res => {
      if (res.status === 200) {
        that.ruleFormList = res.data
        that.ruleFormList.name = res.data.id_list[0].name
        let arr = []
        res.data.id_list.forEach((val, index) => {
          index === 0 ? arr.push({name: val.name, id: val.id}) : arr.push({name: '变更' + index, id: val.id})
        })
        that.buttonList = arr
        that.showIndex = that.buttonList.length - 1
        that.buttonList.length === 1 ? this.isOrigin = true : this.isOrigin = false
        that.ruleFormList.total_val = 0
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
            that.ruleFormList.total_val += Number(element[3])
            productList.push(product)
          })
          that.ruleFormList.product = productList
        }
      }
    })
  },
  methods: {
    handleChange (e) {
      const that = this
      that.showIndex = e._index
      that.$ajax.get(`/api/chain/acceptance/${e._item.id}`).then(res => {
        if (res.status === 200) {
          if (that.showIndex === that.buttonList.length-1) {
            that.ruleFormList = res.data
            that.ruleFormList.name = res.data.id_list[0].name
            that.ruleFormList.total_val = 0
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
                that.ruleFormList.total_val += Number(element[3])
                productList.push(product)
              })
              that.ruleFormList.product = productList
            }
          } else {
            that.ruleForm = res.data
            that.ruleForm.name = res.data.id_list[0].name
            that.ruleForm.total_val = 0
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
                that.ruleForm.total_val += Number(element[3])
                productList.push(product)
              })
              that.ruleForm.product = productList
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#acceptanceOrder {
  width: 100%;
  display: flex;
  height: 100%;
  background: #f5f7f8;
  //padding-top: 70px;
  min-height: 100%;
  .outbound {
    padding-bottom: 100px;
    height: 100%;
    width: 100%;
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
