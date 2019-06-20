<template>
  <div class="contract">
    <div class="tab-menu-group" v-if="showItem.length !== 0">
      <happy-scroll resize size="6">
        <div class="section_title">
          <ul class="tab-menu">
            <li class="tab-menu__item" :class="setIndex===index?style.tab.active:''" @click="changeTab(index, item)" v-for="(item, index) in showItem" :key = index>{{item.name}}</li>
          </ul>
        </div>
      </happy-scroll>
    </div>
    <div class="show_chain_table">
      <div class="chain_table_line" v-for="(val, index) in showTitle" :key='index'>
        <div v-if="index === 0" class="show_line">
          <div class="show_line_title">{{val.name}}</div>
          <div class="show_line_detail" v-if="showList[0].length !== 0">
            <div :class="style.content" v-if="showList[0][0]">
              <!-- <div style="margin-right: 30px;">
                <span style="text-decoration:none">{{val.sum}}</span>
                <span style="text-decoration:none">{{showList[0][0].amount}}(元)</span>
              </div> -->
              <el-tooltip placement="top" popper-class='tool'>
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      {{val.name}} ({{showList[0][0].name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{showList[0][0].operator}}</span>
                          <span>{{showList[0][0].create_time }}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{showList[0][0].verifier || '未审核'}}</span>
                          <span>{{showList[0][0].verify_time }}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>确认方：</span>
                        <p>
                          <span>{{showList[0][0].approved || '未审核'}}</span>
                          <span>{{showList[0][0].approved_time }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img :src="resoveIcon(handleState(showList[0][0]), type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span @click="handleDetail(index, showList[0][0])">{{showList[0][0].name}}</span>
              <div v-if="showList[0][0].order" class="about_order">
                <span id="about_title">关联订单：</span>
                <span style="margin-right:15px" v-if="showList[0][0].order.length" v-for="(item, index) in showList[0][0].order" :key="index">
                  {{item.name}}
                </span>
              </div>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img src="static/img/chain/warning2.png" class="chain-flex__icon"/>
              <span>{{val.null_tip}}</span>
            </div>
          </div>
        </div>
        <div v-if="index !== 0" class="show_line">
          <div class="show_line_title">{{val.name}}</div>
          <div class="show_line_detail" v-if="showList[index].length !== 0">
            <div class="chain-flex" :class="style.title">
              <span class="span_title">{{`${index === 1 ? '发票总额: ': '支付总额: '}`+toThousands(total[index].total_amount)}}(元)</span>
              <span class="span_title">{{total[index].count}}(张)</span>
            </div>
            <div v-for="(item, i) in showList[index]" :class="style.content" :key='i'>
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      {{val.name}} ({{item.name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{item.operator}}</span>
                          <span>{{item.create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{item.verifier || '未审核'}}</span>
                          <span>{{item.verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>确认方：</span>
                        <p>
                          <span>{{item.approved || '未审核'}}</span>
                          <span>{{item.approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img :src="resoveIcon(handleState(item), type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span @click="handleDetail(index, item)">{{item.name}}</span>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img src="static/img/chain/warning2.png" class="chain-flex__icon"/>
              <span>{{val.null_tip}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HappyScroll } from 'vue-happy-scroll'
export default {
  name: 'order',
  props: {
    id: {
      type: String
    },
    chainType: {
      type: String,
      // 用于mock
      default: '2'
    },
    type: {
      type: String
    },
    chainId: {
      type: String
    },
    orderId: ''
  },
  components: {
    HappyScroll
  },
  data () {
    return {
      setIndex: 0,
      showItem: [],
      showList: [[], [], []],
      showTitle: [
        {name: '结算', sum: '结算总额: ', null_tip: '暂未登记结算信息'},
        {name: '发票', sum: '发票总额:', null_tip: '暂未登记发票信息'},
        {name: '支付', sum: '支付总额:', null_tip: '暂未登记支付信息'}
      ],
      total: [null, {}, {}],
      style: {
        content: ['chain-flex'],
        operate: ['show_line_operate'],
        tab: {
          active: [],
          add: []
        },
        title: []
      },
      settlementId: ''
    }
  },
  methods: {
    changeTab (index, item) {
      this.setIndex = index
      this.handleAjax(this.id, item.id)
    },
    resoveIcon (status, type) {
      var src = ''
      if (status === 4) {
        src = Number(type) === 1 ? 'static/img/chain/register_y.png' : 'static/img/chain/register_b.png'
      } else if (status === 2) {
        src = 'static/img/chain/examine1.png'
      } else if (status === 3) {
        src = 'static/img/chain/confirm1.png'
      }
      return src
    },
    handleState (item) {
      if (item.approved) {
        return 3
      } else if (item.verifier) {
        return 2
      } else {
        return 4
      }
    },
    handleAjax (id, settlement_id) {
      const that = this
      let str = ''
      settlement_id ? str = '&settlement_id=' + settlement_id : str = ''
      that.$ajax.get(`/api/chain/settlement_show?contract_id=${id}${str}&chain_id=${that.$route.query.id}`).then(res => {
        if (res.data.has) {
          let showList = [[], [], []]
          let total = that.total
          showList[0] = [res.data]
          showList[1] = res.data.invoice
          showList[2] = res.data.payment
          total[1] = res.data.invoice_total
          total[2] = res.data.payment_total
          that.total = total
          that.showList = showList
          that.showItem = res.data.settlement_list
          that.settlementId = res.data.origin_id
        } else {
          that.showItem = []
          that.showList = [[], [], []]
        }
      })
    },
    handleDetail (index, item) {
      const that = this
      let _URL = ['/credit_app/chain_detail/settlement', '/credit_app/chain_detail/invoice', '/credit_app/chain_detail/payment']
      let path = _URL[index]
      let query = {
        cid: that.id,
        chain_id: that.$route.query.id,
        order_id: that.orderId,
        chain_type: that.chainType,
        settlement_id: that.settlementId,
        id_list: that.$route.query.id_list
      }
      index === 0 ? query.settlement_id = item.id : (index === 1 ? query.invoice_id = item.id : query.payment_id = item.id)
      that.$router.push({path, query})
      //this.$scrollToTop()
    }
  },
  // 获取链id，类型，相关props
  mounted () {
    if (this.type === '1') {
      this.style.content.push('theme_orange')
      this.style.operate.push('theme_orange')
      this.style.tab.active.push('tab-menu__item_active_o1')
      this.style.tab.add.push('tab-menu__item_add_o')
      this.style.title.push('title_b')
    } else {
      this.style.content.push('theme_blue')
      this.style.operate.push('theme_blue')
      this.style.tab.active.push('tab-menu__item_active_b1')
      this.style.tab.add.push('tab-menu__item_add_b')
      this.style.title.push('title_o')
    }
  },
  watch: {
    orderId: function (newer, older) {
      if (newer) {
        this.handleAjax(this.id)
      } else {
        this.showItem = []
      }
    }
  }
}
</script>
<style lang='less' scoped>
.about_order {
  margin-left: 16px;
  display: flex;
  span#about_title:first-child {
    color: #999;
    text-decoration: none;
  }
}
</style>
