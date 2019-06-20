<template>
  <div class="contract">
    <div class="tab-menu-group" v-if="showItem.length !== 0">
      <happy-scroll resize size="6">
        <div class="section_title">
          <ul class="tab-menu">
            <li class="tab-menu__item" :class="setIndex===index ? style.tab.active:''" @click="changeTab(index, item)" v-for="(item, index) in showItem" :key = index>{{item.name}}</li>
          </ul>
        </div>
      </happy-scroll>
    </div>
    <div class="show_chain_table">
      <div class="chain_table_line" v-for="(val, index) in showTitle" :key='index'>
        <div v-if="index === 0" class="show_line">
          <div class="show_line_title">{{val.name}}</div>
          <div class="show_line_detail" v-if="showList[0].length !== 0">
            <div :class="style.content">
              <el-tooltip placement="top"  popper-class='tool'>
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
                          <span>{{showList[0][0].create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{showList[0][0].verifier || '未审核'}}</span>
                          <span>{{showList[0][0].verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>确认方：</span>
                        <p>
                          <span>{{showList[0][0].approved || '未审核'}}</span>
                          <span>{{showList[0][0].approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img :src="resoveIcon(handleState(showList[0][0]), type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span @click="handleDetail(index, showList[0][0])">{{showList[0][0].name}}</span>
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
              <!-- <span>(已变更)</span> -->
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
    }
  },
  components: {
    HappyScroll
  },
  data () {
    return {
      setIndex: 0,
      showItem: [],
      showList: [[],[],[],[],[]],
      showTitle: [
        {name: '电子订单', null_tip: '暂未登记订单'},
        {name: '应收订金', op: `添加应收订金`, null_tip: '暂未登记应收订金'},
        {name: '电子出货单', op: '添加电子出货单', null_tip: '暂未登记电子出货单'},
        {name: '电子运单', op: '添加电子运单', null_tip: '暂未登记电子运单'},
        {name: '验收入库单', op: '添加验收入库单', null_tip: '暂未登记验收入库单'}
      ],
      style: {
        content: ['chain-flex'],
        operate: ['show_line_operate'],
        tab: {
          active: [],
          add: []
        }
      },
      origin_order_id: '',
      is_exchange: false
    }
  },
  methods: {
    changeTab (index, item) {
      this.setIndex = index
      this.handleAjax(this.id, item.id) // 当前订单的原始ID
    },
    // 判断是否闪烁
    handleFlash (index) {
      let arr = []
      this.showList.forEach((val, index) => {
        if (val.length === 0) arr.push(index)
      })
      let flashArr = arr.sort((el, nex) => el - nex)
      if (flashArr.length === 0) {
        return false
      } else {
        if (Number(flashArr[0]) === index) {
          return true
        } else {
          return false
        }
      }
    },
    resoveIcon (status, type) {
      var src = ''
      if (Number(status) === 4) {
        src = Number(type) === 1 ?  'static/img/chain/register_y.png' : 'static/img/chain/register_b.png'
      } else if (Number(status) === 2) {
        src = 'static/img/chain/examine1.png'
      } else if (Number(status) === 3) {
        src = 'static/img/chain/confirm1.png'
      }
      return src
    },
    handleOperate (index) {
      const that = this
      // 创建订单按钮迁移
      if (index == 0) {
        return false
      } else {
        // 是否存在订单
        if (that.showList[0].length !== 0) {
          return true
        } else {
          return false
        }
      }
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
    handleAjax (contract_id, orderId) {
      const that = this
      let str = ''
      orderId ? str = '&order_id=' + orderId : ''
      that.$ajax.get(`/api/chain/order_show?contract_id=${contract_id}${str}&chain_id=${that.$route.query.id}`).then(res => {
        if (res.data.has) {
          let showList = [[], [], [], [], []]
          showList[0] = [res.data]
          showList[1] = res.data.order_deposit 
          showList[2] = res.data.warehouse
          showList[3] = res.data.transport
          showList[4] = res.data.acceptance
          that.showList = showList
          that.showItem = res.data.order_list
          that.origin_order_id = res.data.origin_id
          let _obj = {
            id: this.origin_order_id,
            type: this.type
          }
          this.$emit('changOrderId', _obj)
        } else {
          that.showList = [[], [], [], [], []]
          that.showItem = []
          that.setIndex = 0
        }
      })
    },
    handleDetail (index, item) {
      const that = this
      let query = {
        contract_id: that.id,
        chain_id: that.$route.query.id,
        chain_type: that.chainType
      }
      let path = ''
      if (index === 0) {
        path = '/fund/chain_detail/order'
        query.order_id = item.id
        that.$router.push({path, query})

        // that.$ajax.get(`/api/chain/order/${item.id}/`).then(res => {
        //   if (res.status === 200) {
        //     query.navIndex = Number(res.data.status) + 1
        //   }
        // })
      } else if (index === 1) {
        path = '/fund/chain_detail/deposit'
        query.deposit_id = item.id
        query.order_id = this.origin_order_id
        that.$router.push({path, query})
      } else if (index === 2) {
        query.outbound_id = item.id
        query.order_id = this.origin_order_id
        path = '/fund/chain_detail/outbound'
        that.$router.push({path, query})
      } else if (index === 3) {
        query.transport_id = item.id
        query.order_id = this.origin_order_id
        path = '/fund/chain_detail/waybill'
        that.$router.push({path, query})
      } else if (index === 4) {
        query.acceptance_id = item.id
        query.order_id = this.origin_order_id
        path = '/fund/chain_detail/acceptance'
        that.$router.push({path, query})
      }
      // 窗口置顶
      //that.$scrollToTop()
    },
    // 待用
    getChainStatus (chainId) {
      this.$ajax.get(`/api/chain/${chainId}/ticket/`).then(res=>{
        if (res.status === 200) {
          
        }
      })
    } 
  },
  // 获取链id，类型，相关props
  mounted () {
    // 切换主题色 type：1 销售、2 采购
    if(this.type === '1') {
      this.style.content.push('theme_orange')
      this.style.operate.push('theme_orange')
      this.style.tab.active.push('tab-menu__item_active_o1')
      this.style.tab.add.push('tab-menu__item_add_o')
    } else {
      this.style.content.push('theme_blue')
      this.style.operate.push('theme_blue')
      this.style.tab.active.push('tab-menu__item_active_b1')
      this.style.tab.add.push('tab-menu__item_add_b')
    }
  },
  watch: {
    id: function (newer, older) {
      if (newer) {
        this.handleAjax(newer)
      } else {
        this.showItem = []
      }
    }
  }
}
</script>
