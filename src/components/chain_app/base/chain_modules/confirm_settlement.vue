<template>
  <div class="contract">
    <div class="tab-menu-group" v-if="showList[0].length > 0">
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
    type: {
      type: String
    },
    confirmId: {
    },
    idList: {
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
      list_id: ''
    }
  },
  methods: {
    getLastIdList: function (obj) {
      return new Promise((resolve, reject) => {
        this.$ajax.get(`/api/chain/co_confirm/${obj.confirmId}`).then(res => {
          if (res.status === 200) {
            obj.id_list = res.data.approve_list
            this.list_id = res.data.approve_list
            resolve(obj)
          }
        })
      })
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
      let _obj = {
        settlementId: item.id,
        contract_id: this.id,
        list_id: this.list_id
      }
      this.handleAjax(_obj)
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
    handleAjax: function (obj) {
      const that = this
      let str = ''
      if (obj.settlementId) {
        str = '&settlement_id=' + obj.settlementId + '&id_list=' + obj.list_id
      } else if (obj.id_list) {
        str = '&id_list=' + obj.id_list
      }
      that.$ajax.get(`/api/chain/settlement_show?contract_id=${obj.contract_id}${str}`).then(res => {
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
          if (obj.id_list) that.showItem = res.data.settlement_list
          that.settlementId = res.data.origin_id
        } else {
          that.showItem = []
          that.showList = [[], [], []]
        }
      })
    },
    handleDetail (index, item) {
      const that = this
      let _URL = ['/chain_app/settlementInfo', '/chain_app/invoiceInfo', '/chain_app/paymentInfo']
      let path = _URL[index]
      let query = {
        contract_id: that.id,
        confirmId: that.confirmId,
        idList: that.idList
      }
      index === 0 ? query.settlement_id = item.id : (index === 1 ? query.invoice_id = item.id : query.payment_id = item.id)
      that.$router.push({path, query})
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
    let _obj = {
      confirmId: this.confirmId,
      contract_id: this.id
    }
    this.getLastIdList(_obj).then(this.handleAjax) 
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
