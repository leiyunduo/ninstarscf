<template>
  <div class="info_detail">
    <!-- <appNav :father='step' type='2'></appNav> -->
    <div class='order_list'>
      <div class="location_wrap">
        <location :location='location'></location>
      </div>
      <div class="order_wrap">
        <div v-for='(item, index) in orderList' :key='index' class='chain_item'>
          <div class="show_title" v-if="item.company_info">
            <div>
              <span>融资企业</span>
              <div>
                <span @click="handleBuisness(item.company_info.company_id)">{{item.company_info.company_name}}</span>
              </div>
            </div>
            <div>
              <span>交易企业</span>
              <div>
                <span @click="handleBuisness(item.company_info.partner_company_id)">{{item.company_info.partner_company_name}}</span>
              </div>
            </div>
            <div>
              <span>历史逾期率</span>
              <div>
                <span>{{(item.rate * 100).toFixed(2) + '%' || '0.00%'}}</span>
              </div>
            </div>
          </div>
          <p class="item_title" v-if="item.s_data.length !== 0 && item.target === 's'">
            <span>应收记账</span>
          </p>
          <ul class="item_list" v-if="item.s_data.length !== 0 && item.target === 's'">
            <li class='order_title'>
              <div>销售订单</div>
              <div>所属合同</div>
              <div>订单创建时间</div>
              <div>支付金额（元）</div>
              <div>支付方式</div>
              <div>支付时间</div>
              <div>逾期结算</div>
            </li>
            <li v-for="(order, orderIndex) in item.s_data" :key='orderIndex'>
              <div class="sel" @click="handleChain(order, 1, 1)">{{order.name}}</div>
              <div class="sel" @click="handleChain(order, 2, 1)">{{order.contract_name}}</div>
              <div>{{order.date_created}}</div>
              <div :class="order.payment_info.payment_amount ? '' : 'null'">{{order.payment_info.payment_amount ? toThousands(order.payment_info.payment_amount) : '未支付'}}</div>
              <div :class="order.payment_info.payment_type.length !== 0 ? '' : 'null'">{{handleType(order.payment_info.payment_type) || '未支付'}}</div>
              <div :class="order.payment_info.payment_date ? '' : 'null'">{{order.payment_info.payment_date || '未支付'}}</div>
              <div :style="order.over_time ? 'color: #ff0100' : ''">{{order.over_time ? '是' : '否'}}</div>
            </li>
          </ul>
          <!-- <p v-if="item.s_data.length === 0" class="null">暂无应收记账</p> -->
          <p class="item_title_b" v-if="item.p_data.length !== 0 && item.target === 'p'">
            <span>应付记账</span>
          </p>
          <ul class="item_list" v-if="item.p_data.length !== 0 && item.target === 'p'">
            <li class='order_title'>
              <div>采购订单</div>
              <div>所属合同</div>
              <div>订单创建时间</div>
              <div>支付金额（元）</div>
              <div>支付方式</div>
              <div>支付时间</div>
              <div>逾期结算</div>
            </li>
            <li v-for="(order, orderIndex) in item.p_data" :key='orderIndex'>
              <div class="selb" @click="handleChain(order, 1, 2)">{{order.name}}</div>
              <div class="selb" @click="handleChain(order, 2, 2)">{{order.contract_name}}</div>
              <div>{{order.date_created}}</div>
              <div :class="order.payment_info.payment_amount ? '' : 'null'">{{order.payment_info.payment_amount ? toThousands(order.payment_info.payment_amount) : '未支付'}}</div>
              <div :class="order.payment_info.payment_type.length !== 0 ? '' : 'null'">{{handleType(order.payment_info.payment_type) || '未支付'}}</div>
              <div :class="order.payment_info.payment_date ? '' : 'null'">{{order.payment_info.payment_date || '未支付'}}</div>
              <div :style="order.over_time ? 'color: #ff0100' : ''">{{order.over_time ? '是' : '否'}}</div>
            </li>
          </ul>
          <!-- <p v-if="item.p_data.length === 0" class="null">暂无应付记账</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
export default {
  name: 'orderList',
  components: {
    Location, 
    // AppNav
  },
  data () {
    return {
      step: {selIndex: 0},
      location: [
        {title: '我的审核', url: '/credit_app'},
        {title: '历史逾期率'}
      ],
      orderList: [{s_data: [], p_data: []}]
    }
  },
  mounted () {
    const that = this
    console.log(that.$route.query)
    let partner = that.$route.query.partner.split(',')
    let {company, tar} = that.$route.query
    that.$ajax.post('/api/chain/order/over_rate/', {company_id: company, partner_company_id_list: partner}).then(res => {
      res.data.forEach(val => {
        tar === 's' ? val.rate = val.s_rate : val.rate = val.p_rate
        val.target = tar
      })
      that.orderList = res.data
      console.log(that.orderList)
    })
  },
  methods: {
    handleType (arr) {
      console.log(arr)
      let list = ['', '现金', '支票', '银行承兑汇票', '商业承兑汇票', '信用证']
      let str = ''
      if (arr.length !== 0) {
        arr.forEach(val => {
          str += list[val] + '，'
        })
        return str.substring(0, str.length - 1)
      } else {
        return false
      }
    },
    handleBuisness (id) {
      console.log(id)
      window.open('#/enterpriseBlog?bid=' + id, '_black')
    },
    handleChain (item, el, tp) {
      console.log(item)
      // const that = this
      if (el === 1) {
        window.open(`#/credit_app/chain_detail/order?contract_id=${item.contract_id}&chain_id=${item.chain_id}&chian_type=${item.chain_type}&order_id=${item.id}`)
      } else {
        window.open(`#/credit_app/chain_detail/contract?contract_id=${item.contract_id}&chain_id=${item.chain_id}&chian_type=${item.chain_type}&contract_type=${tp}`)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.sel {
  color: #eb6100;
  font-weight: bolder;
  text-decoration: underline;
  cursor: pointer;
}
.selb {
  color: #53aefe;
  font-weight: bolder;
  text-decoration: underline;
  cursor: pointer; 
}
.info_detail {
  min-height: 100%;
  //padding-top: 70px;
  font-size: 14px;
  display: flex;
  background: #f7f8f9;
  .order_list {
    width: 100%;
    // padding: 0 20px;
    .location_wrap {
      background: #fff;
    }
    .order_wrap {
      padding: 0 60px;
      padding-left: 60px;
      padding-bottom: 30px;
      background: #fff;
      .chain_item {
        margin-top: 20px;
        .show_title {
          display: flex;
          justify-content: space-between;
          &>div {
            width: 33.3%;
            height: 48px;
            line-height: 48px;
            padding: 0 16px;
            justify-content: flex-start;
            align-items: flex-start;
            border-bottom: 1px dashed #eaeaea;
            display: flex;
            span:first-child {
              width: 120px;
              color: #666;
            }
            div {
              span {
                width: calc(100% - 120px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          &>div:first-child, div:nth-child(2) {
            div:last-child {
              span {
                color: #eb6100;
                font-weight: bolder;
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
        .item_title {
          padding: 0 16px;
          border-left: 3px solid #eb6100;
          line-height: 24px;
          margin: 16px 0;
          color: #666;
        }
        .item_title_b {
          padding: 0 16px;
          border-left: 3px solid #53aefe;
          line-height: 24px;
          margin: 16px 0;
          color: #666;
        }
        .item_list {
          border: 1px solid #eaeaea;
          box-shadow: 2px 3px 3px 3px #eee;
          li.order_title {
            background: #e2e2e2;
            color: #666;
            &>div:first-child, &>div:bth-child(2) {
              color: #666;
              cursor: default;
              text-decoration: none;
            }
          }
          li {
            display: flex;
            border-bottom: 1px solid #eaeaea;
            &>div {
              width: calc(100% / 7);
              text-align: center;
              line-height: 45px;
            }
            &>div:nth-child(4) {
              padding: 0 15px;
              text-align: right;
            }
            .null {
              color: #999;
            }
          }
          li:last-child {
            border: none;
          }
        }
        p.null {
          line-height: 48px;
          text-align: center;;
          color: #999;
        }
      }
    }
  }
}
</style>
