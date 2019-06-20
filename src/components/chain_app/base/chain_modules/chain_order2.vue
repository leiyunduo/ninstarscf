<template>
  <div class="contract">
    <div class="chain-diamond minwidth">
      <img :style="warningType === 1 ? 'background: #f5f7f8' : ''" :src="diamon_src" alt="">
    </div>
    <div class="show_chain_table">
      <div class="chain_table_line" v-for="(val, index) in showTitle" :key='index'>
        <div class="show_line">
          <div class="show_line_title">{{val.name}}</div>
          <div class="show_line_detail" v-if="showList[index].length !== 0">
            <div v-for="(item, i) in showList[index]" class="chain-flex" :class="type === `1` ? ['theme_orange'] : ['theme_blue']"  :key='i'>
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
                      <div class="chain-intro__content__line" v-if="item.deny === false">
                        <span>确认方：</span>
                        <p>
                          <span>{{item.approved || '未审核'}}</span>
                          <span>{{item.approved_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-else>
                        <span>拒绝方：</span>
                        <p>
                          <span>{{item.s_denier}}</span>
                          <span>{{item.s_deny_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img :src="resoveIcon(item, type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index, item)">{{item.name}}</span>
            </div>
          </div>
          <div class="show_line_detail" v-else-if="index === 0 && (overtime.warehouse || overtime.warehouse === 0)">
            <div class="chain-flex is_null">
              <img :src="overtime.warehouse >= 0 ? 'static/img/chain/notice_unrecord.png' : 'static/img/chain/alert_unrecord.png'"  class="chain-flex__icon" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''"/>
              <span style="margin-left: 6px">暂未登记出货单</span>
            </div>
          </div>
          <div class="show_line_detail" v-else-if="index === 1 && (overtime.transport || overtime.transport === 0)">
            <div class="chain-flex is_null">
              <img :src="overtime.transport >= 0 ? 'static/img/chain/notice_unrecord.png' : 'static/img/chain/alert_unrecord.png'"  class="chain-flex__icon" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''"/>
              <span style="margin-left: 6px">暂未登记运单</span>
            </div>
          </div>
          <div class="show_line_detail" v-else-if="index === 2 && (overtime.acceptance || overtime.acceptance === 0)">
            <div class="chain-flex is_null">
              <img :src="overtime.acceptance >= 0 ? 'static/img/chain/notice_unrecord.png' : 'static/img/chain/alert_unrecord.png'"  class="chain-flex__icon" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''"/>
              <label style="margin-left: 6px">
                <span>暂未登记验收入库单</span>
              </label>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img src="static/img/chain/null_unrecord.png" class="chain-flex__icon"/>
              <span style="margin-left: 6px">{{val.null_tip}}</span>
            </div>
          </div>
          <div :class="style.operate" v-if="handleOperate(index)" @click="handleCreate(index)">
            <span></span>
            <div>{{val.op}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    currentOrderId: ''
  },
  components: {
    HappyScroll
  },
  data () {
    return {
      setIndex: 0,
      showItem: [],
      showList: [[],[],[]],
      showTitle: [
        {name: '出货单', op: '添加出货单', null_tip: '暂未登记出货单'},
        {name: '运单', op: '添加运单', null_tip: '暂未登记运单'},
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
      is_exchange: false,
      overtime: {
        warehouse: '',
        transport: '',
        acceptance: ''
      },
      warningType: -2,
      diamon_src: 'static/img/chain/zuan_g.png'
    }
  },
  computed:{
    ...mapState({
      isConfirm: status => status.chain.isConfirm
    })
  },
  methods: {
    statusCheck (arr) {
      for(var i=0; i<arr.length; i++) {
        if (arr[i].length===0) {
          this.warningType = 0
          break
        }
        this.warningType = -1
      }
    },
    // 判断是否闪烁
    handleFlash (index, timer) {
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
    resoveIcon (item, type) {
      var src = ''
      if (item.approved) {
        src = item.red ? 'static/img/chain/alert_confirm.png' : 'static/img/chain/nomal_confirm.png'
        return src
      } else if (item.deny) {
        src = item.red ? 'static/img/chain/alert_unpass.png' : 'static/img/chain/nomal_unpass.png'
        return src
      } else if (item.verifier){
        src = item.red ? 'static/img/chain/alert_examine.png' : 'static/img/chain/nomal_examine.png'
        return src
      } else {
        src = item.red ? 'static/img/chain/alert_register.png' : 'static/img/chain/nomal_register.png'
        return src
      }
    },
    handleOperate (index) {
      const that = this
      // 创建订单按钮迁移
      if (that.showItem.length === 0) return false
      return true
    },
    handleAjax (contract_id, orderId) {
      const that = this
      let str = ''
      orderId ? str = '&order_id=' + orderId : ''
      that.$ajax.get(`/api/chain/order_show?contract_id=${contract_id}${str}`).then(res => {
        if (res.data.has) {
          let showList = [[], [], []]
          that.overtime = res.data.acceptance_overtime
          showList[0] = res.data.warehouse
          showList[1] = res.data.transport
          showList[2] = res.data.acceptance
          that.showList = showList
          that.showItem = res.data.order_list
          that.origin_order_id = res.data.origin_id
        } else {
          that.showList = [[], [], []]
          this.warningType = 0
          that.showItem = []
          that.setIndex = 0
          this.style.content = this.type === `1` ? ['chain-flex', 'theme_orange'] : ['chain-flex', 'theme_blue']
          let _obj3 = {
            time: '',
            type: this.type,
            name: ''
          }
          this.$emit('isWarning', _obj3)
        }
      })
    },
    handleDetail (index, item) {
      const that = this
      let _URL = ['/chain_app/order', '/chain_app/deposit', '/chain_app/outboundView', '/chain_app/waybillView', '/chain_app/acceptanceView']
      let query = {
        contract_id: that.id,
        chain_id: that.$route.query.id,
        chain_type: that.chainType
      }
      let path = ''
      if (index === 0) {
        query.outbound_id = item.id
        query.order_id = this.origin_order_id
        that.$ajax.get(`/api/chain/warehouse/${item.id}`).then(res => {
          if (res.status === 200) {
            path = Number(res.data.status) === 0 ? '/chain_app/outboundView' : '/chain_app/outboundModify'
            that.$router.push({path, query})
          }
        })
      } else if (index === 1) {
        query.transport_id = item.id
        query.order_id = this.origin_order_id
        that.$ajax.get(`/api/chain/transport/${item.id}`).then(res => {
          if (res.status === 200) {
            path = Number(res.data.status) === 0 ? '/chain_app/waybillView' : '/chain_app/waybillModify'
            that.$router.push({path, query})
          }
        })
      } else if (index === 2) {
        query.acceptance_id = item.id
        query.order_id = this.origin_order_id
        that.$ajax.get(`/api/chain/acceptance/${item.id}`).then(res => {
          if (res.status === 200) {
            path = Number(res.data.status) === 0 ? '/chain_app/acceptanceView' : '/chain_app/acceptanceModify'
            that.$router.push({path, query})
          }
        })
      }
    },
    handleCreate (index) {
      const that = this
      let _URL = ['/chain_app/outboundCreate', '/chain_app/waybillCreate', '/chain_app/acceptanceCreate']
      let query = {
        chain_id: that.$route.query.id,
        contract_id: that.id,
        chain_type: that.chainType
      }
      let path = _URL[index]
      if (index === 0) {
        query.order_id = this.origin_order_id
      } else if (index === 1) {
        query.order_id = this.origin_order_id
      } else if (index === 2) {
        query.order_id = this.origin_order_id
      }
      that.$router.push({path, query})
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
    if(this.id) {
      this.handleAjax(this.id)
    } else {
      this.showList = [[], [], []]
      this.showItem = []
      this.warningType = 0
    }
  },
  watch: {
    id: function (newer, older) {
      if (newer) {
        this.handleAjax(newer)
      } else {
        this.showList = [[], [], []]
        this.showItem = []
        this.warningType = 0
      }
    },
    currentOrderId: function (newer, older) {
      if (newer) {
        this.handleAjax(this.id, newer)
      }
    },
    warningType: function (newer, old) {
      if (newer === 1) {
        // this.diamon_src = 'static/img/chain/zuanshan_g.gif'
        this.diamon_src = 'static/img/chain/zuan_g.png'
      } else if (newer === 0) {
        this.diamon_src = 'static/img/chain/zuan_g.png'
      } else {
        if (this.type === `1`) {
          this.diamon_src = 'static/img/chain/zuan_o.png'
        } else {
          this.diamon_src = 'static/img/chain/zuan_b.png'
        }
      }
    },
    isConfirm: function (newer, old) {
      if (newer) this.handleAjax(this.id)
    }
  }
}
</script>
