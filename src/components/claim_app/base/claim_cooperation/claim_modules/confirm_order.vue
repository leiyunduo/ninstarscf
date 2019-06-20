<template>
  <div class="contract">
    <div class="tab-menu-group" v-if="showList[0].length > 0">
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
        <div v-if="index === 0 " class="show_line">
          <div class="show_line_title">{{val.name}}</div>
          <div class="show_line_detail" v-if="showList[index].length !== 0">
            <div :class="style.content">
              <el-tooltip placement="top"  popper-class='tool'>
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      {{val.name}} ({{showList[index][0].name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{showList[index][0].operator}}</span>
                          <span>{{showList[index][0].create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{showList[index][0].verifier || '未审核'}}</span>
                          <span>{{showList[index][0].verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>确认方：</span>
                        <p>
                          <span>{{showList[index][0].approved || '未审核'}}</span>
                          <span>{{showList[index][0].approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img :src="resoveIcon(showList[index][0], type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span @click="handleDetail(index, showList[index][0])">{{showList[index][0].name}}</span>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <!-- <img class="twinkle" src="static/img/chain/warning_light1.png" alt=""> -->
              <img src="static/img/chain/warning2.png" class="chain-flex__icon"/>
              <span>{{val.null_tip}}</span>
            </div>
          </div>
        </div>
        <div v-else-if="index > 1" class="show_line">
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
                <img :src="resoveIcon(item, type)" class="chain-flex__icon"/>
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
import { resolve } from 'url';
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
      origin_order_id: ''
    }
  },
  methods: {
    getLastIdList: function (obj) {
      return new Promise((resolve, reject) => {
        obj.id_list = this.idList
        resolve(obj)
      })
    },
    changeTab (index, item) {
      if (this.setIndex === index) return
      this.setIndex = index
      let _obj = {
        orderId: item.id,
        contract_id: this.id
      }
      this.handleAjax(_obj) // 当前订单的原始ID
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
        src = item.red ? 'static/img/chain/warning3.png' : 'static/img/chain/confirm1.png'
        return src
      } else if (item.verifier){
        src = item.red ? 'static/img/chain/warning3.png' : 'static/img/chain/examine1.png'
        return src
      } else {
        src = item.red ? 'static/img/chain/warning3.png' : 'static/img/chain/register.png'
        return src
      }
    },
    handleAjax: function (obj) {
      console.log(obj)
      const that = this
      let str = ''
      if (obj.orderId) {
        str = '&order_id=' + obj.orderId
      } else if (obj.id_list) {
        str = '&id_list=' + obj.id_list
      }
      that.$ajax.get(`/api/chain/order_show/?contract_id=${obj.contract_id}${str}`).then(res => {
        console.log(res)
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
      let _URL = ['/chain_app/order', '/chain_app/deposit', '/chain_app/outboundInfo', '/chain_app/waybillInfo', '/chain_app/acceptanceInfo']
      let query = {
        contract_id: that.id,
        claim: 1,
        confirmId: that.confirmId,
        idList: that.idList
      }
      let path = _URL[index]
      if (index === 0) {
        query.order_id = item.id   
      } else if (index === 1) { 
        query.deposit_id = item.id
      } else if (index === 2) {
        query.outbound_id = item.id
      } else if (index === 3) {
        query.transport_id = item.id   
      } else if (index === 4) {
        query.acceptance_id = item.id   
      }
      that.$router.push({path,query})
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
    let _obj = {
      contract_id: this.id
    }
    this.getLastIdList(_obj).then(this.handleAjax)
  }
}
</script>
