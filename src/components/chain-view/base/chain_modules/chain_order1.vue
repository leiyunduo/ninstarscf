<template>
  <div class="contract">
    <div class="chain-diamond minwidth">
      <img :style="warningType === 1 ? 'background: #f5f7f8' : ''" :src="diamon_src" alt="">
    </div>
    <div class="tab-menu-group">
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
          <div class="show_line_detail" v-if="showList[0].length !== 0 && showList[0][0]">
            <div :class="style.content">
              <el-tooltip placement="top" v-if="showList[0][0].acceptance_overtime && 
                (showList[0][0].overtime || showList[0][0].overtime === 0 ||
                showList[0][0].acceptance_overtime.warehouse || showList[0][0].acceptance_overtime.warehouse === 0 || 
                showList[0][0].acceptance_overtime.transport || showList[0][0].acceptance_overtime.transport === 0 || 
                showList[0][0].acceptance_overtime.acceptance || showList[0][0].acceptance_overtime.acceptance === 0)">
                <div slot="content">
                  <p class="orderTitle" v-if="showList[0][0].acceptance_overtime.warehouse || showList[0][0].acceptance_overtime.warehouse === 0">
                    <span v-if="showList[0][0].acceptance_overtime.warehouse >= 0">距该订单出货日期还剩<strong>{{showList[0][0].acceptance_overtime.warehouse}}</strong>天，请及时记录相关<strong class="text">电子出货单</strong></span>
                    <span v-else>该订单出库<strong class="text">已逾期{{Math.abs(showList[0][0].acceptance_overtime.warehouse)}}</strong>天，请尽快记录相关<strong class="text">电子出货单</strong></span>
                  </p>
                  <p class="orderTitle" v-if="showList[0][0].acceptance_overtime.transport || showList[0][0].acceptance_overtime.transport === 0">
                    <span v-if="showList[0][0].acceptance_overtime.transport >= 0">距该订单运输日期还剩<strong>{{showList[0][0].acceptance_overtime.transport}}</strong>天，请及时记录相关<strong class="text">电子运单</strong></span>
                    <span v-else>该订单运输<strong class="text">已逾期{{Math.abs(showList[0][0].acceptance_overtime.transport)}}</strong>天，请尽快记录相关<strong class="text">电子运单</strong></span>
                  </p>
                  <p class="orderTitle" v-if="showList[0][0].acceptance_overtime.acceptance || showList[0][0].acceptance_overtime.acceptance === 0">
                    <span v-if="showList[0][0].acceptance_overtime.acceptance >= 0">距该订单交货日期还剩<strong>{{showList[0][0].acceptance_overtime.acceptance}}</strong>天，请及时记录相关<strong class="text">验收入库单</strong></span>
                    <span v-else>该订单入库<strong class="text">已逾期{{Math.abs(showList[0][0].acceptance_overtime.acceptance)}}</strong>天，请尽快记录相关<strong class="text">验收入库单</strong></span>
                  </p>
                  <p class="orderTitle" v-if="showList[0][0].overtime || showList[0][0].overtime === 0">
                    <span v-if="showList[0][0].overtime >= 0">距该订单结算日期还剩<strong>{{showList[0][0].overtime}}</strong>天，请及时记录相关<strong class="text">结算单</strong></span>
                    <span v-else>该订单结算<strong class="text">已逾期{{Math.abs(showList[0][0].overtime)}}</strong>天，请尽快记录相关<strong class="text">结算单</strong></span>
                  </p>
                </div>
                <img :src="resoveIcon(showList[0][0], type)" class="chain-flex__icon"/>
              </el-tooltip>
              <el-tooltip placement="top" popper-class='tool' v-else>
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
                      <div class="chain-intro__content__line" v-if="showList[0][0].deny === false">
                        <span>确认方：</span>
                        <p>
                          <span>{{showList[0][0].approved || '未审核'}}</span>
                          <span>{{showList[0][0].approved_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-else>
                        <span>拒绝方：</span>
                        <p>
                          <span>{{showList[0][0].denier}}</span>
                          <span>{{showList[0][0].deny_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img :src="resoveIcon(showList[0][0], type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index, showList[0][0])">{{showList[0][0].name}}</span>
            </div>
          </div>
          <div class="show_line_detail" v-else-if="orderwarn || orderwarn === 0">
            <div class="chain-flex is_null">
              <img :src="orderwarn >=0 ? 'static/img/chain/notice_unrecord.png' : 'static/img/chain/alert_unrecord.png'"  class="chain-flex__icon" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''"/>
              <span style="margin-left: 6px">暂未登记电子订单</span>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img src="static/img/chain/null_unrecord.png" class="chain-flex__icon chain-flex__icon_warning"/>
              <span style="margin-left: 6px">{{val.null_tip}}</span>
            </div>
          </div>
        </div>
        <div v-if="index !== 0" class="show_line">
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
                      <div class="chain-intro__content__line"  v-if="item.deny === false">
                        <span>确认方：</span>
                        <p>
                          <span>{{item.approved || '未审核'}}</span>
                          <span>{{item.approved_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-else>
                        <span>拒绝方：</span>
                        <p>
                          <span>{{item.denier}}</span>
                          <span>{{item.deny_time}}</span>
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
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img src="static/img/chain/null_unrecord.png" class="chain-flex__icon" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''"/>
              <span style="margin-left: 6px">{{val.null_tip}}</span>
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
    orderwarn: {
    }
  },
  components: {
    HappyScroll
  },
  data () {
    return {
      setIndex: 0,
      showItem: [],
      showList: [[{overtime_list: []}],[]],
      showTitle: [
        {name: '电子订单', null_tip: '暂未登记订单'},
        {name: '订金', op: `添加应收订金`, null_tip: '暂未登记应收订金'}
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
      warningType: -2,
      diamon_src: 'static/img/chain/zuan_g.png'
    }
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
    changeTab (index, item) {
      if (this.setIndex === index) return
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
    handleAjax (contract_id, orderId) {
      const that = this
      let str = ''
      orderId ? str = '&order_id=' + orderId : ''
      that.$ajax.get(`/api/chain/order_show?contract_id=${contract_id}${str}`).then(res => {
        if (res.data.has) {
          let showList = [[], []]
          showList[0] = [res.data]
          showList[1] = res.data.order_deposit 
          that.showList = showList
          that.showItem = res.data.order_list
          that.origin_order_id = res.data.origin_id
          let _obj = {
            id: this.origin_order_id,
            type: this.type
          }
          this.$emit('changeOrderId', _obj)
          this.$emit('changeCurrentOrderId', orderId)
          let _obj1 = {
            id: res.data.settlement_id,
            type: this.type
          }
          this.$emit('changSettlementId', _obj1)
          if (res.data.overtime || res.data.overtime === 0 ||
            res.data.acceptance_overtime.acceptance || res.data.acceptance_overtime.acceptance === 0 ||
            res.data.acceptance_overtime.transport || res.data.acceptance_overtime.transport === 0 ||
            res.data.acceptance_overtime.warehouse || res.data.acceptance_overtime.warehouse === 0
          ) {
            this.warningType = 1
            this.style.content.push('chain-flex__icon_problom')
            let _obj2 = {
              time: res.data.overtime,
              type: this.type,
              name: res.data.name
            }
            this.$emit('isWarning', _obj2)
          } else {
            this.statusCheck(showList)
            this.style.content = this.type === `1` ? ['chain-flex', 'theme_orange'] : ['chain-flex', 'theme_blue']
            let _obj2 = {
              time: '',
              type: this.type,
              name: ''
            }
            this.$emit('isWarning', _obj2)
          }
        } else {
          that.showList = [[], []]
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
      let query = {
        contract_id: that.id,
        chain_id: that.$route.query.id,
        chain_type: that.chainType
      }
      let path = ''
      if (index === 0) {
        path = '/credit_app/chain_detail/order'
        query.order_id = item.id
        query.type = this.type
        that.$router.push({path, query})
      } else if (index === 1) {
        path = '/credit_app/chain_detail/deposit'
        query.deposit_id = item.id
        query.order_id = this.origin_order_id
        that.$router.push({path, query})
      }
      // 窗口置顶
      //that.$scrollToTop()
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
      this.showList = [[], []]
      this.showItem = []
      this.warningType = 0
    }
  },
  watch: {
    id: function (newer, older) {
      if (newer) {
        this.handleAjax(newer)
      } else {
        this.showList = [[], []]
        this.showItem = []
        this.warningType = 0
      }
    },
    warningType: function (newer, old) {
      if (newer === 1) {
        this.diamon_src = 'static/img/chain/zuanshan_g.gif'
      } else if (newer === 0) {
        this.diamon_src = 'static/img/chain/zuan_g.png'
      } else {
        if (this.type === `1`) {
          this.diamon_src = 'static/img/chain/zuan_o.png'
        } else {
          this.diamon_src = 'static/img/chain/zuan_b.png'
        }
      }
    }
  }
}
</script>
