<template>
  <div class="contract">
    <div class="tab-menu-group" v-if="showList[0].length > 0">
      <happy-scroll resize size="6">
        <div class="section_title">
          <ul class="tab-menu">
            <li class="tab-menu__item" :class="setIndex===index ? style.tab.active:''"  v-for="(item, index) in showItem" :key = index>{{item.name}}</li>
          </ul>
        </div>
      </happy-scroll>
    </div>
    <div class="show_chain_table">
      <div class="chain_table_line" v-for="(val, index) in showTitle" :key='index'>
        <div class="show_line">
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
                      <div class="chain-intro__content__line" v-if="showList[index][0].deny === false">
                        <span>确认方：</span>
                        <p>
                          <span>{{showList[index][0].approved || '未审核'}}</span>
                          <span>{{showList[index][0].approved_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-else>
                        <span>拒绝方：</span>
                        <p>
                          <span>{{showList[index][0].s_denier}}</span>
                          <span>{{showList[index][0].s_deny_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img :src="resoveIcon(showList[index][0], type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index, showList[index][0])">{{showList[index][0].name}}</span>
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
        {name: '仓储合同', null_tip: '暂未仓储合同'},
        {name: '物流合同', op: `添加物流合同`, null_tip: '暂未登记物流合同'},
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
      origin_order_id: ''
    }
  },
  methods: {
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
    getServicesProvider (conformId) {
      this.$ajax.get(`/api/chain/co_confirm/${conformId}/third_show/`).then(res => {
        if (res.status === 200) {
          let showList = [[], [], [], [], []]
          showList[0] = res.data.warehousecontract_list
          showList[1] = res.data.transportcontract_list
          showList[2] = res.data.warehouse_list
          showList[3] = res.data.transport_list
          showList[4] = res.data.acceptance_list
          this.showList = showList
        }
      })
    },
    handleDetail (index, item) {
      const that = this
      let _URL = ['/chain_app/order', '/chain_app/deposit', '/chain_app/outboundInfo', '/chain_app/waybillInfo', '/chain_app/acceptanceInfo']
      let query = {
        contract_id: that.id,
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
      id_list: this.idList,
      contract_id: this.id
    }
    this.getServicesProvider(this.confirmId)
  }
}
</script>
