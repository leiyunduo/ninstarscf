<template>
  <div class="contract">
    <div class="tab-menu-group">
      <div class="section_title">
        <ul class="tab-menu">
          <li class="tab-menu__item tab-menu__item_active_o">
            销售合同
          </li>
        </ul>
      </div>
    </div>
    <div class="show_chain_table addline">
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
                      <div class="chain-intro__content__line" v-if="contract.deny === false">
                        <span>确认方：</span>
                        <p>
                          <span>{{contract.approved || "未审核"}}</span>
                          <span>{{contract.approved_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-else>
                        <span>拒绝方：</span>
                        <p>
                          <span>{{contract.denier}}</span>
                          <span>{{contract.deny_time}}</span>
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
              <span>{{partCompany}}</span>
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
                      <div class="chain-intro__content__line" v-if="contract.deny === false">
                        <span>确认方：</span>
                        <p>
                          <span>{{contract.approved || "未审核"}}</span>
                          <span>{{contract.approved_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-else>
                        <span>拒绝方：</span>
                        <p>
                          <span>{{contract.denier}}</span>
                          <span>{{contract.deny_time}}</span>
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
              <img src="static/img/chain/warning2.png" class="chain-flex__icon"/>
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
    confirmId: {},
    idList: {},
    type: {
      type: String
    },
    partCompany: {
      type: String
    }
  },
  methods: {
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
    handleDetail (index) {
      const that = this
      let query = {
        contract_id: that.id,
        confirmId: that.confirmId,
        idList: that.idList
      }
      that.$router.push({
        path: '/chain_app/contract',
        query
      })
    },
    changeTab (item, index) {
      if (this.setIndex === index) return
      this.setIndex = index
      this.$ajax.get(`/api/chain/contract_show/?contract_id=${item.id}`).then(res => {
        if(res.data.has) {
          this.contract = res.data
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
    this.$ajax.get(`/api/chain/contract_show?contract_id=${this.id}`).then(res => {
      if(res.data.has) {
        this.contract = res.data
        this.showItem = res.data.contract_list
      } else {
        this.showItem = []
      }
    })
  }
}
</script>
