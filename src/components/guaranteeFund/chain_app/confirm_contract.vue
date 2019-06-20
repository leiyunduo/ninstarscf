<template>
  <div class="contract">
    <div class="tab-menu-group" v-if="type==='1'">
      <happy-scroll resize size="6">
        <div class="section_title">
          <ul class="tab-menu">
            <li class="tab-menu__item tab-menu__item_active_o">
              销售合同
            </li>
          </ul>
        </div>
      </happy-scroll>
    </div>
    <div class="tab-menu-group" v-else>
      <happy-scroll resize size="6">
        <div class="section_title">
          <ul class="tab-menu" v-if="showItem.length > 0">
            <li class="tab-menu__item" :class="setIndex===index?style.tab.active:''" @click="changeTab(item, index)" v-for="(item, index) in showItem" :key = index>{{item.name}}</li>
          </ul>
        </div>
      </happy-scroll>
    </div>
    <div class="show_chain_table">
      <div class="chain_table_line" v-for="(item, index) in showTitle" :key='index'>
        <div v-if="index === 0 && type === '1'" class="show_line hide-line">
          <div class="show_line_title">{{item.name[Number(type)]}}</div>
          <div class="show_line_detail">
            <div :class="style.content">
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      销售合同 ({{contract.name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{contract.operator || "未审核"}}</span>
                          <span>{{contract.create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{contract.verifier || "未审核"}}</span>
                          <span>{{contract.verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>确认方：</span>
                        <p>
                          <span>{{contract.approved || "未审核"}}</span>
                          <span>{{contract.approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img  :src="resoveIcon(contract, type)" class="chain-flex__icon"/> 
              </el-tooltip>
              <span @click="handleDetail(index)">{{contract.name}}</span>
            </div>
            <div class="default">
              <span>交易公司：</span>
              <span>{{contract.partner_company}}</span>
            </div>
            <div class="default">
              <span>创建时间：</span>
              <span>{{contract.create_time}}</span>
            </div>
          </div>
        </div>
        <div v-else-if="index === 0 && showItem.length && type === '2'" class="show_line hide-line">
          <div class="show_line_title">{{item.name[Number(type)]}}</div>
          <div class="show_line_detail">
            <div :class="style.content">
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      销售合同 ({{contract.name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{contract.operator || "未审核"}}</span>
                          <span>{{contract.create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{contract.verifier || "未审核"}}</span>
                          <span>{{contract.verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>确认方：</span>
                        <p>
                          <span>{{contract.approved || "未审核"}}</span>
                          <span>{{contract.approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img  :src="resoveIcon(contract, type)" class="chain-flex__icon"/> 
              </el-tooltip>
              <span @click="handleDetail(index)">{{contract.name}}</span>
            </div>
            <div class="default">
              <span>交易公司：</span>
              <span>{{contract.partner_company}}</span>
            </div>
            <div class="default">
              <span>创建时间：</span>
              <span>{{contract.create_time}}</span>
            </div>
          </div>
        </div>
        <div v-else class="show_line hide-line">
          <div class="show_line_title">{{item.name[Number(type)]}}</div>
          <div class="show_line_detail">
            <div class="chain-flex is_null">
              <img class="chain-flex__icon" src="static/img/chain/warning2.png" alt="">
              <span>{{item.null_tip[Number(type)]}}</span>
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
  name: 'contract',
  data () {
    return {
      setIndex: 0,
      operate : 'static/img/chain/plus.png',
      showItem: [
      ],
      showTitle: [
        {name: {1: '销售合同', 2: '采购合同'}, null_tip: {1: '暂未登记销售合同', 2: '暂未登记采购合同'}}
      ],
      contract: {},
      style: {
        content: ['chain-flex'],
        operate: ['show_line_operate'],
        tab: {
          active:[],
          add: []
        }
      },
      contract_id: ''
    }
  },
  components: {
    HappyScroll
  },
  props: {
    id: {
      type: String
    },
    chainType: {
      type: String,
      // 用于mock
      default: ''
    },
    contractType: {
      type: String
    },
    type: {
      type: String
    }
  },
  methods: {
    resoveIcon (item, type) {
      var src = ''
      if (item.approved) {
        src = 'static/img/chain/confirm1.png'
        return src
      } else if (item.verifier){
        src = 'static/img/chain/examine1.png'
        return src
      } else {
        src = Number(type) === 1 ?  'static/img/chain/register_y.png' : 'static/img/chain/register_b.png'
        return src
      }
    },
    handleDetail (index) {
      const that = this
      let query = {
        contract_id: that.contract_id,
        chain_id: that.id,
        chain_type: that.chainType
      }
      that.$router.push({
        path: '/fund/chain_detail/contract',
        query
      })
    },
    changeTab (item, index) {
      this.setIndex = index
      this.$ajax.get(`/api/chain/contract_show/?contract_id=${item.id}&chain_id=${this.$route.query.id}`).then(res => {
        if(res.data.has) {
          this.contract = res.data
          let _boj = {
            type: this.contractType,
            id: res.data.origin_id
          }
          this.contract_id = res.data.id
          this.$emit('changeId', _boj)
        }
      })
    }
  },
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
    this.$ajax.get(`/api/chain/contract_show?chain_id=${this.id}&contract_type=${this.contractType}&chain_id=${this.$route.query.id}`).then(res => {
      if(res.data.has) {
        this.contract = res.data
        this.showItem = res.data.contract_list
        let _boj = {
          type: this.contractType,
          id: res.data.origin_id
        }
        this.$emit('changeId', _boj)
        this.contract_id = res.data.id
      } else {
        this.showItem = []
      }
    })
  }
}
</script>
