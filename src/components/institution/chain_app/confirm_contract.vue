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
            <li class="tab-menu__item" :class="setIndex===index?style.tab.active:''" @click="changeTab(item, index)" v-for="(item, index) in showItem" :key = index>{{item.name}}</li><li @click="handleCreate(0)" class="tab-menu__item" :class="style.tab.add"><span class="tab-menu__item__icon"></span><span>添加采购合同</span></li>
          </ul>
        </div>
      </happy-scroll>
    </div>
    <div class="show_chain_table">
      <div class="chain_table_line" v-for="(item, index) in showTitle" :key='index'>
        <div v-if="index === 0 && type === '1'" class="show_line">
          <div class="show_line_title">{{item.name[Number(type)]}}</div>
          <div class="show_line_detail" v-if="showList[index][0]">
            <div :class="style.content">
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      销售合同 ({{showList[index][0].name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{showList[index][0].operator || "未审核"}}</span>
                          <span>{{showList[index][0].create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{showList[index][0].verifier || "未审核"}}</span>
                          <span>{{showList[index][0].verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>确认方：</span>
                        <p>
                          <span>{{showList[index][0].approved || "未审核"}}</span>
                          <span>{{showList[index][0].approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img  :src="resoveIcon(showList[index][0], type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index)">{{showList[index][0].name}}</span>
            </div>
            <div class="default">
              <span>交易公司：</span>
              <span>{{showList[index][0].partner_company}}</span>
            </div>
            <div class="default">
              <span>创建时间：</span>
              <span>{{showList[index][0].create_time}}</span>
            </div>
          </div>
        </div>
        <div v-else-if="index === 0 && type === '2'" class="show_line">
          <div class="show_line_title">{{item.name[Number(type)]}}</div>
          <div class="show_line_detail" v-if="showItem.length > 0">
            <div :class="style.content">
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      销售合同 ({{showList[index][0].name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{showList[index][0].operator || "未审核"}}</span>
                          <span>{{showList[index][0].create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{showList[index][0].verifier || "未审核"}}</span>
                          <span>{{showList[index][0].verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>确认方：</span>
                        <p>
                          <span>{{showList[index][0].approved || "未审核"}}</span>
                          <span>{{showList[index][0].approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img  :src="resoveIcon(showList[index][0], type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index)">{{showList[index][0].name}}</span>
            </div>
            <div class="default">
              <span>交易公司：</span>
              <span>{{showList[index][0].partner_company}}</span>
            </div>
            <div class="default">
              <span>创建时间：</span>
              <span>{{showList[index][0].create_time}}</span>
            </div>
          </div>
        </div>
        <div v-else-if="index !== 0 && type === '1'" class="show_line">
          <div class="show_line_title">{{item.name}}</div>
          <div class="show_line_detail" v-if="showList[index].length > 0">
            <div :class="style.content" v-for="(c, i) in showList[index]" :key="i">
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      {{item.name}} ({{c.name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{c.operator || "未审核"}}</span>
                          <span>{{c.create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{c.verifier || "未审核"}}</span>
                          <span>{{c.verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-if="index === 2 || index === 3">
                        <span>确认方：</span>
                        <p>
                          <span>{{c.service_approved || "未审核"}}</span>
                          <span>{{c.service_approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img  :src="resoveIcon(c, type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index, c)">{{c.name}}</span>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img v-if="handleFlash(index)" class="twinkle" src="static/img/chain/warning_light1.png">
              <img :src="handleFlash(index) ? 'static/img/chain/warning1.png' : 'static/img/chain/warning2.png'" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''" class="chain-flex__icon"/>
              <span>{{item.null_tip}}</span>
            </div>
          </div>
        </div>
        <div v-else-if="index !== 0 && type === '2'" class="show_line">
          <div class="show_line_title">{{item.name}}</div>
          <div class="show_line_detail" v-if="showList[index].length > 0">
            <div :class="style.content" v-for="(c, i) in showList[index]" :key="i">
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      {{item.name}} ({{c.name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{c.operator || "未审核"}}</span>
                          <span>{{c.create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{c.verifier || "未审核"}}</span>
                          <span>{{c.verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-if="index === 2 || index === 3">
                        <span>确认方：</span>
                        <p>
                          <span>{{c.service_approved || "未审核"}}</span>
                          <span>{{c.service_approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img  :src="resoveIcon(c, type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index, c)">{{c.name}}</span>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img v-if="handleFlash(index)" class="twinkle" src="static/img/chain/warning_light1.png" alt="">
              <img :src="handleFlash(index) ? 'static/img/chain/warning1.png' : 'static/img/chain/warning2.png'" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''" class="chain-flex__icon"/>
              <span>{{item.null_tip}}</span>
            </div>
          </div>
        </div>
        <div v-else-if="index !== 0 && type === '1'" class="show_line">
          <div class="show_line_title">{{item.name}}</div>
          <div class="show_line_detail" v-if="showList[index].length > 0">
            <div :class="style.content" v-for="(c, i) in showList[index]" :key="i">
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      {{item.name}} ({{c.name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{c.operator || "未审核"}}</span>
                          <span>{{c.create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{c.verifier || "未审核"}}</span>
                          <span>{{c.verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-if="index === 2 || index === 3">
                        <span>确认方：</span>
                        <p>
                          <span>{{c.service_approved || "未审核"}}</span>
                          <span>{{c.service_approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img  :src="resoveIcon(c, type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index, c)">{{c.name}}</span>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img v-if="handleFlash(index)" class="twinkle" src="static/img/chain/warning_light1.png">
              <img :src="handleFlash(index) ? 'static/img/chain/warning1.png' : 'static/img/chain/warning2.png'" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''" class="chain-flex__icon"/>
              <span>{{item.null_tip}}</span>
            </div>
          </div>
        </div>
        <div v-else-if="index !== 0 && type === '2'" class="show_line">
          <div class="show_line_title">{{item.name}}</div>
          <div class="show_line_detail" v-if="showList[index].length > 0">
            <div :class="style.content" v-for="(c, i) in showList[index]" :key="i">
              <el-tooltip placement="top">
                <div slot="content">
                  <div class="chain-intro">
                    <div class="chain-intro__title">
                      {{item.name}} ({{c.name}})
                    </div>
                    <div class="chain-intro__content">
                      <div class="chain-intro__content__line">
                        <span>操作方：</span>
                        <p>
                          <span>{{c.operator || "未审核"}}</span>
                          <span>{{c.create_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line">
                        <span>审核方：</span>
                        <p>
                          <span>{{c.verifier || "未审核"}}</span>
                          <span>{{c.verify_time}}</span>
                        </p>
                      </div>
                      <div class="chain-intro__content__line" v-if="index === 2 || index === 3">
                        <span>确认方：</span>
                        <p>
                          <span>{{c.service_approved || "未审核"}}</span>
                          <span>{{c.service_approved_time}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img  :src="resoveIcon(c, type)" class="chain-flex__icon"/>
              </el-tooltip>
              <span class="linker" @click="handleDetail(index, c)">{{c.name}}</span>
            </div>
          </div>
          <div class="show_line_detail" v-else>
            <div class="chain-flex is_null">
              <img v-if="handleFlash(index)" class="twinkle" src="static/img/chain/warning_light1.png" alt="">
              <img :src="handleFlash(index) ? 'static/img/chain/warning1.png' : 'static/img/chain/warning2.png'" :class="handleFlash(index) ? 'chain-flex__icon_warning' : ''" class="chain-flex__icon"/>
              <span>{{item.null_tip}}</span>
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
      operate: 'static/img/chain/plus.png',
      showItem: [
      ],
      showTitle: [
        {name: {1: '销售合同', 2: '采购合同'}, null_tip: {1: '暂未登记销售合同', 2: '暂未登记采购合同'}},
        {name: '订单计划', op: `添加订单计划`, null_tip: '暂未登记订单计划'},
        {name: '仓储合同', op: '添加仓储合同', null_tip: '暂未登记仓储合同'},
        {name: '运输合同', op: '添加运输合同', null_tip: '暂未登记运输合同'},
        {name: '融资计划', op: '添加融资计划', null_tip: '暂未登记融资计划'}
      ],
      contract: {},
      style: {
        content: ['chain-flex'],
        operate: ['show_line_operate'],
        tab: {
          active: [],
          add: []
        }
      },
      contract_id: '',
      showList: [[], [], [], [], []],
      contract_origin_id: ''
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
    handleOperate (index) {
      const that = this
      // 创建订单按钮迁移
      if (Number(index) === 0) {
        return false
      } else {
        if (that.showList[0].length !== 0) {
          if (index === 4 && that.showList[4].length === 1) {
            return false
          } else {
            return true
          }
        } else {
          return false
        }
      }
    },
    resoveIcon (item, type) {
      var src = ''
      if (item.approved) {
        src = 'static/img/chain/confirm1.png'
        return src
      } else if (item.verifier) {
        src = 'static/img/chain/examine1.png'
        return src
      } else {
        src = Number(type) === 1 ? 'static/img/chain/register_y.png' : 'static/img/chain/register_b.png'
        return src
      }
    },
    handleDetail (index, item) {
      const that = this
      let query = {
        contract_id: that.contract_id,
        chain_id: that.id,
        chain_type: that.chainType
      }
      if (index === 0) {
        query.contract_type = that.contractType
        that.$ajax.get(`/api/chain/contract/${that.contract_id}/`).then(res => {
          if (res.status === 200) {
            query.navIndex = Number(res.data.status) + 1
            that.$router.push({
              path: '/credit_app/chain_detail/contract',
              query
            })
          }
        })
      } else if (index === 1) {
        query.order_plan_id = item.id
        that.$ajax.get(`/api/chain/order_plan/${item.id}/`).then(res => {
          if (res.status === 200) {
            query.navIndex = Number(res.data.status) + 1
            that.$router.push({
              path: '/credit_app/chain_detail/order_plan',
              query
            })
          }
        })
      } else if (index === 2) {
        query.warehouse_id = item.id
        that.$ajax.get(`/api/chain/warehouse_contract/${item.id}/`).then(res => {
          if (res.status === 200) {
            query.navIndex = Number(res.data.status) + 1
            that.$router.push({
              path: '/credit_app/chain_detail/warehouse_contract',
              query
            })
          }
        })
      } else if (index === 3) {
        query.transport_id = item.id
        that.$ajax.get(`/api/chain/transport_contract/${item.id}/`).then(res => {
          if (res.status === 200) {
            query.navIndex = Number(res.data.status) + 1
            that.$router.push({
              path: '/credit_app/chain_detail/transport_contract',
              query
            })
          }
        })
      } else if (index === 4) {
        query.financing_plan_id = item.id
        that.$ajax.get(`/api/chain/financing_plan/${item.id}/`).then(res => {
          if (res.status === 200) {
            query.navIndex = Number(res.data.status) + 1
            that.$router.push({
              path: '/credit_app/chain_detail/financing_plan',
              query
            })
          }
        })
      }
      //that.$scrollToTop()
    },
    handleCreate (index) {
      const that = this
      let query = {
        chain_id: that.id,
        chain_type: that.chainType
      }
      if (index === 0) {
        query.navIndex = 0
        query.contract_type = that.contractType
        that.$router.push({
          path: '/chain_app/contract',
          query
        })
      } else if (index === 1) {
        query.navIndex = 0
        query.contract_id = that.contract_origin_id
        that.$router.push({
          path: '/chain_app/order_plan',
          query
        })
      } else if (index === 2) {
        query.navIndex = 0
        query.contract_id = that.contract_origin_id
        that.$router.push({
          path: '/chain_app/warehouse_contract',
          query
        })
      } else if (index === 3) {
        query.navIndex = 0
        query.contract_id = that.contract_origin_id
        that.$router.push({
          path: '/chain_app/transport_contract',
          query
        })
      } else if (index === 4) {
        query.navIndex = 0
        query.contract_id = that.contract_origin_id
        that.$router.push({
          path: '/chain_app/financing_plan',
          query
        })
      }
      //that.$scrollToTop()
    },
    changeTab (item, index) {
      this.setIndex = index
      this.$ajax.get(`/api/chain/contract_show/?contract_id=${item.id}`).then(res => {
        if (res.data.has) {
          let showList = [[], [], [], [], []]
          showList[0] = [res.data]
          showList[1] = res.data.order_plan || []
          showList[2] = res.data.warehouse_contract || []
          showList[3] = res.data.transport_contract || []
          showList[4] = res.data.financing_plan || []
          this.showList = showList
          let _boj = {
            type: this.contractType,
            id: res.data.origin_id
          }
          this.contract_id = res.data.id
          this.contract_origin_id = res.data.origin_id
          this.$emit('changeId', _boj)
          this.contract_id = res.data.id
          this.contract_origin_id = res.data.origin_id
        } else {
          this.showItem = []
        }
      })
    },
    getContractInfo (chain_id, contract_type) {
      this.$ajax.get(`/api/chain/contract_show?chain_id=${chain_id}&contract_type=${contract_type}`).then(res => {
        if (res.data.has) {
          let showList = [[], [], [], [], []]
          showList[0] = [res.data]
          showList[1] = res.data.order_plan || []
          showList[2] = res.data.warehouse_contract || []
          showList[3] = res.data.transport_contract || []
          showList[4] = res.data.financing_plan || []
          this.showList = showList
          this.showItem = res.data.contract_list
          let _boj = {
            type: this.contractType,
            id: res.data.origin_id
          }
          this.$emit('changeId', _boj)
          this.contract_id = res.data.id
          this.contract_origin_id = res.data.origin_id
        } else {
          this.showItem = []
        }
      })
    }
  },
  mounted () {
    // 切换主题色 type：1 销售、2 采购
    console.log()
    if (this.type === '1') {
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
    this.getContractInfo(this.id, this.contractType)
  }
}
</script>
