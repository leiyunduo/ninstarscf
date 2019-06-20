<template>
  <div class="contract">
    <div class="show_chain_table">
      <div class="chain_table_line">
        <div class="show_line">
          <div class="show_line_title">{{showTitle.name}}</div>
          <div class="show_line_detail" v-if="showData.value">
            <div :class="style.content">
              <div style="display: flex;" @click="handleDetail">
                <span>结算总额:</span>
                <span>{{showData.value}}(元)</span>
              </div>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img src="static/img/chain/warning2.png" class="chain-flex__icon"/>
              <span>{{showTitle.null_tip}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order',
  props: {
    isHistory: {
      type: String
    },
    id: {
      type: String,
      default: ''
    },
    chainType: {
      type: String
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      showTitle: {name: '合同结算', op:'添加合同结算', null_tip: '合同暂未结算'},
      showData: {
        value: ''
      },
      style: {
        content: ['chain-flex'],
        operate: ['show_line_operate'],
        tab: {
          active:[],
          add: []
        }
      }
    }
  },
  methods: {
    changeTab (index) {
      this.setIndex = index
    },
    handleAjax (id) {
      const that = this
      that.$ajax.get(`/api/chain/total_amount_show/?contract_id=${id}&chain_id=${that.$route.query.id}`).then(res => {
        if (res.status === 200) {
          that.showData.value = that.toThousands(res.data)
        }
      })      
    },
    handleDetail () {
      /**
       * TODO: 合同暂时无法查看详细及创建
       */

      // const that = this
      // let query = {
      //   cid: that.id,
      //   chain_id: that.$route.query.id,
      //   chain_type: that.chainType,
      //   pid: that.showData.id
      // }
      // that.$router.push({path: '/contractSettlement', query})
    },
    handleCreate () {
      /**
       * TODO: 合同暂时无法查看详细及创建
       */
      
      // const that = this
      // let query = {
      //   cid: that.id,
      //   chain_id: that.$route.query.id,
      //   chain_type: that.chainType
      // }
      // that.$router.push({path: '/contractSettlement1', query})     
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
    id: function (id, id_old) {
      if (id) {
        this.handleAjax(id)
      } else {
        that.showData.value = 0
      }
    }
  }
}
</script>

