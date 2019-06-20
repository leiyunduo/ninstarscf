<template>
  <div class="contract">
    <div class="chain-diamond minwidth">
      <img :style="warningType === 1 ? 'background: #f5f7f8' : ''" :src="diamon_src" alt="">
    </div>
    <div class="tab-menu-group">
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
                      <div class="chain-intro__content__line" v-if="showList[0][0].deny === false">
                        <span>确认方：</span>
                        <p>
                          <span>{{showList[0][0].approved || '未审核'}}</span>
                          <span>{{showList[0][0].approved_time }}</span>
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
              <div v-if="showList[0][0].order" class="about_order">
                <span id="about_title">关联订单：</span>
                <span style="margin-right:15px" v-for="(item, index) in showList[0][0].order" :key="index">
                  {{item.name}}
                </span>
              </div>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <!-- <img class="twinkle" src="static/img/chain/warning_light1.png"  alt=""> -->
              <img :src="(overTime && overTime.name) ? (overTime.time >= 0 ? 'static/img/chain/notice_unrecord.png' :'static/img/chain/alert_unrecord.png') : 'static/img/chain/null_unrecord.png'" class="chain-flex__icon chain-flex__icon_warning"/>
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
              <!-- <img v-if="handleFlash(index)" class="twinkle" src="static/img/chain/warning_light1.png" alt=""> -->
              <img src="static/img/chain/null_unrecord.png" class="chain-flex__icon" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''"/>
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
    orderId: '',
    settleId: '',
    overtime: ''
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
        {name: '发票', op: `添加发票`, sum: '发票总额:', null_tip: '暂未登记发票信息'},
        {name: '支付', op: '添加支付', sum: '支付总额:', null_tip: '暂未登记支付信息'},
      ],
      total: [null, {}, {}],
      style: {
        content: ['chain-flex'],
        operate: ['show_line_operate'],
        tab: {
          active:[],
          add: []
        },
        title: []
      },
      settlementId: '',
      overTime: '',
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
    changeTab (index, item) {
      if (this.setIndex === index) return
      this.setIndex = index
      this.handleAjax(this.id, item.id)
      // this.overTime = '' //重置警报时间
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
      if (index == 0) {
        return false
      } else {
        let swit = ''
        that.showList[0].length !== 0 ? swit = true : swit = false
        return swit
      }
    },
    handleAjax (id, settlement_id) {
      const that = this
      let str = ''
      settlement_id ? str = '&settlement_id=' + settlement_id : ''
      that.$ajax.get(`/api/chain/settlement_show?contract_id=${id}${str}`).then(res => {
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
          that.statusCheck(showList)
          that.showItem = res.data.settlement_list
          that.settlementId = res.data.origin_id
        } else {
          that.showItem = []
          that.showList = [[], [], []]
          that.warningType = 0
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
        settlement_id: that.settlementId
      }
      index === 0 ? query.settlement_id = item.id : (index === 1 ? query.invoice_id = item.id : query.payment_id = item.id)
      that.$router.push({path, query})
      //this.$scrollToTop()
    }
  },
  // 获取链id，类型，相关props
  mounted () {
    if(this.type === '1') {
      this.style.content.push('theme_orange')
      this.style.operate.push('theme_orange')
      this.style.tab.active.push('tab-menu__item_active_o1')
      this.style.tab.add.push('tab-menu__item_add_o')
      this.style.title.push('title_o')
    } else {
      this.style.content.push('theme_blue')
      this.style.operate.push('theme_blue')
      this.style.tab.active.push('tab-menu__item_active_b1')
      this.style.tab.add.push('tab-menu__item_add_b')
      this.style.title.push('title_b')
    }
    if(this.id) this.handleAjax(this.id)
  },
  watch: {
    id: function (newer, older) {
      if (newer) {
        this.overTime = '' //重置警报时间
        this.handleAjax(newer)
      } else {
        this.showItem = []
        this.showList = [[], [], []]
        that.warningType = 0
      }
    },
    overtime: function (newer, older) {
      if (newer) {
        this.overTime = newer
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
