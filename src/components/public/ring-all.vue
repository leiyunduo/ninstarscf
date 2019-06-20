<template>
  <div>
    <div id="ring" :style="!chainId ? '' : 'height: auto;'">
      <div class="left">
        <div class="left_list">
          <dl class="supplier_title" @click="showServiceCredit()">
            <dt>
              <el-tooltip class="item" effect="dark" content="点此查看供应商信用评估" placement="right-end">
                <img src="../../../static/img/public_ring/supplier.png" alt="">
              </el-tooltip>
            </dt>
            <dd>
              <p>供应商</p>
            </dd>
          </dl>
        </div>
        <div class="left_list list_for">
          <dl>
            <dt><img src="static/img/public_ring/supplier_list.png" alt=""><i style="width: 57%;left: 43%"></i></dt>
            <dd>
              <p slot="reference" @click="supplierTotal(0)">合同<i :class="total ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
              <ul v-if="visible && listNav.length !== 0">
                <li @click="handleContract(item.id, 'p')" v-for='(item, index) in listNav' :key='index'>{{item.name}}</li>
              </ul>
              <ul v-if="visible && listNav.length === 0">
                <li>无采购合同</li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="left_list list_for">
          <dl>
            <dt><img src="static/img/public_ring/supplier_list.png" alt=""><i></i></dt>
            <dd v-for="(item, index) in orderDeposit" :key="index">
              <p @click="orderTotal(index, item, 0)" :class="item.helpFlag ? 'active' : ''">{{item.name}}<i :class="item.helpFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
              <ul v-if='item.helpFlag'>
                <li v-for="(i, index1) in listData.order" :key="index1" @click="handleDetail(i, index, 'o', 'p')">{{i.name}}</li>
                <li v-if='listData.order.length === 0'>暂无数据</li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="left_list list_for" v-for="(item, index) in nameTitle" :key="index">
          <dl>
            <dt><img :src="!sData[item.key] || sData[item.key].length ? 'static/img/public_ring/supplier_list.png' : 'static/img/public_ring/null_l.png'" alt=""><i :style="!sData[item.key] || sData[item.key].length ? '' : 'border-color: #999'"></i></dt>
            <dd>
              <p :class="item.helpFlag ? 'active' : ''" @click="orderTotal(index, item, 1)">{{item.name}}<i :class="item.helpFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
              <ul v-if='item.helpFlag'>
                <li v-for="(i, index1) in listData.tabData" :key="index1" @click="handleDetail(i, index, null, 'p')">
                  {{i.name}}
                </li>
                <li v-if='listData.tabData.length === 0'>暂无数据</li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
      <div class="center">
        <div class="left_list">
          <dl>
            <dd>
              <p :class="chainFlag ? 'active' : ''" @click="chainFlag = !chainFlag">链主<i v-if="chainList.length !== 0 && !chainId" :class="chainFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
              <ul v-if="chainFlag && chainList.length !== 0">
                <li v-for='(chain, index) in chainList' :key='index' @click="handleChain(chain.id, chain.title, chain.type)">{{chain.title}}</li>
              </ul>
            </dd>
            <dt class="toChain" @click="toChain()" style="margin-top: 5px">
              <el-tooltip class="item" effect="dark" content="点此查看链式记账" placement="right-start">
                <img src="static/img/public_ring/me.png" alt="">
              </el-tooltip>
            </dt>
            <p style="font-size: 14px">{{selChian || '暂无记账'}}</p>
          </dl>
        </div>
      </div>
      <div class="right">
        <div class="left_list list_for">
          <dl>
            <dt><img src="static/img/public_ring/ring_orange_r.png" alt=""><i style="width: 57%;left: 43%"></i></dt>
            <dd>
              <p slot="reference" @click="customerTotal(0)">合同<i :class="total1 ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
              <ul v-if='visible1'>
                <li @click="handleContract(null, 's')">{{listData.supplier_names || '无销售合同'}}</li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="left_list list_for">
          <dl>
            <dt><img src="static/img/public_ring/ring_orange_r.png" alt=""><i></i></dt>
            <dd v-for="(item, index) in orderDeposit1" :key="index">
              <p @click="orderCustomer(index, item, 0)" :class="item.helpFlag ? 'active' : ''">{{item.name}}<i :class="item.helpFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
              <ul v-if='item.helpFlag'>
                <li v-for="(i, index1) in listData.order" :key="index1" @click="handleDetail(i, index, 'o', 's')">{{i.name}}</li>
                <li v-if='listData.order.length === 0'>暂无数据</li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="left_list list_for" v-for="(item, index) in nameTitle1" :key="index">
          <dl>
            <dt><img :src="!pData[item.key] || pData[item.key].length ? 'static/img/public_ring/ring_orange_r.png' : 'static/img/public_ring/null_l.png'" alt=""><i :style="!sData[item.key] || sData[item.key].length ? '' : 'border-color: #999'" :class="handleLen(index)"></i></dt>
            <dd>
              <p @click="orderCustomer(index, item, 1)" :class="item.helpFlag ? 'active' : ''">{{item.name}}<i :class="item.helpFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
              <ul v-if='item.helpFlag'>
                <li v-for="(i, index1) in listData.tabData" :key="index1" @click="handleDetail(i, index, null, 's')">
                  {{i.name}}
                </li>
                <li v-if='listData.tabData.length === 0'>暂无数据</li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="left_list">
          <dl class="supplier_title" @click="showUserCredit()">
            <dt>
              <el-tooltip class="item" effect="dark" content="点此查看客户信用评级" placement="left-end">
                <img src="../../../static/img/public_ring/customer.png" alt="">
              </el-tooltip>
            </dt>
            <dd>
              <p>客户</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <el-dialog title="供应商信用评估" :visible.sync="visibleService" width="50%" :before-close="handlerCloseS" :modal-append-to-body="false">
      <div class="circle-grade" v-show="visibleService">
        <div class="business_grade" v-for="(item, index) in customer_credit_rating" :key="index">
          <div class="business_name">{{item.partner_company__name}}</div>
          <ul>
            <li><p>退货率：<span>0%</span></p></li>
            <li><p>报废率：<span>0%</span></p></li>
            <li><p>按时交货率：<span>100%</span></p></li>
          </ul>
          <ul>
            <li><p>价格评价：<span>高</span></p></li>
            <li><p>协同度：<span>快</span></p></li>
            <li><p>选择范围：<span>广</span></p></li>
          </ul>
        </div>
        <div class="defEmpty" v-if="customer_credit_rating.length === 0">
          <span>无记录</span>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="客户信用评级" :visible.sync="visibleUser" width="50%" :before-close="handlerCloseU" :modal-append-to-body="false">
      <div class="circle-grade" v-show="visibleUser">
        <div class="business_grade" v-for="(item, index) in customer_credit_rating1" :key="index">
          <div class="business_name">{{item.partner_company__name}}</div>
          <ul>
            <li><p>评分：<span>100</span></p></li>
            <li><p>付款及时率：<span>100%</span></p></li>
          </ul>
        </div>
        <div class="defEmpty" v-if="customer_credit_rating1.length === 0">
          <span>无记录</span>
        </div>
      </div>
    </el-dialog>
    <!-- <div class="circle-schema">
      
      
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'ring',
  props: {
    bid: {
      
    },
    chainId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 供应商
      total: false,
      total1: false,
      visibleUser: false,
      visibleService: false,
      nameTitle: [
        { name: '融资', helpFlag: false },
        { name: '出货单', helpFlag: false, key: 'Warehouse'},
        { name: '运单', helpFlag: false, key: 'Transport'},
        { name: '验收单', helpFlag: false, key: 'Acceptance'},
        { name: '结算单', helpFlag: false, key: 'Settlement'},
        { name: '发票', helpFlag: false, key: 'Invoice'},
        { name: '支付', helpFlag: false, key: 'Payment'},
        { name: '合同结算', helpFlag: false }
        // '融资', '仓单', '运单', '验收单', '结算单', '发票', '支付', '合同结算'
      ],
      chainFlag: false,
      orderDeposit: [
        { name: '订单', helpFlag: false }
      ],
      selChian: '',
      nameTitle1: [
        { name: '出货单', helpFlag: false, key: 'Warehouse' },
        { name: '运单', helpFlag: false, key: 'Transport'},
        { name: '验收单', helpFlag: false, key: 'Acceptance'},
        { name: '结算单', helpFlag: false, key: 'Settlement'},
        { name: '发票', helpFlag: false, key: 'Invoice'},
        { name: '支付', helpFlag: false, key: 'Payment'},
        { name: '合同结算', helpFlag: false},
        { name: '还贷', helpFlag: false }
        // ['还贷', '合同结算', '支付', '发票', '结算单', '验收单', '运单', '仓单']
      ],
      orderDeposit1: [
        { name: '订单', helpFlag: false }
      ],
      listNav: [],
      visible: false,
      listNav1: [],
      visible1: false,
      chainList: [],
      curChain: '',
      curChainType: '',
      curContract: {},
      listData: {
        supplier_name: '',
        supplier_names: '',
        order: [],
        tabData: []
      },
      pData: {},
      sData: {},
      // 服务商
      customer_credit_rating: [  
      ],
      // 客户
      customer_credit_rating1: [   
      ]
    }
  },
  created () {
    const that = this
    that.$ajax.get('/api/chain/circle/chain_list/?company_id=' + that.bid).then(res => {
      let chainList = []
      for (let item in res.data) {
        chainList.push({title: item, id: res.data[item], type: String(item).slice(-1)})
      }
      that.chainList = chainList
      that.curChainType = chainList[0].type
      if (!that.chainId) {
        that.selChian = chainList[0].title
        that.$ajax.get('/api/chain/circle/contract_list/?chain_id=' + chainList[0].id).then(res1 => {
          that.listNav = res1.data.p_contract
          that.listNav1 = res1.data.s_contract
          that.curChain = chainList[0].id
          that.listData = {
            supplier_name: res1.data.p_contract[0] ? res1.data.p_contract[0].name : '暂无合同',
            supplier_names: res1.data.s_contract[0] ? res1.data.s_contract[0].name : '暂无合同',
            order: [],
            tabData: []
          }
          that.curContract = {pid: res1.data.p_contract ? res1.data.p_contract[0].id : null, sid: res1.data.s_contract ? res1.data.s_contract[0].id : null}
          if (that.curContract.pid) {
            that.$ajax.get(`/api/chain/circle/${that.curContract.pid}/`).then(res2 => {
              that.pData = res2.data.info
            })
          } else {
            that.pData = {}
          }
          if (that.curContract.sid) {
            that.$ajax.get(`/api/chain/circle/${that.curContract.sid}/`).then(res2 => {
              that.sData = res2.data.info
            })
          } else {
            that.sData = {}
          }
        })
      } else {
        that.chainList.forEach(val => {
          if (val.id === that.chainId) that.selChian = val.title
        })
        that.$ajax.get('/api/chain/circle/contract_list/?chain_id=' + that.chainId).then(res1 => {
          that.listNav = res1.data.p_contract
          that.listNav1 = res1.data.s_contract
          that.curChain = chainList[0].id
          that.listData = {
            supplier_name: res1.data.p_contract[0] ? res1.data.p_contract[0].name : '暂无合同',
            supplier_names: res1.data.s_contract[0] ? res1.data.s_contract[0].name : '暂无合同',
            order: [],
            tabData: []
          }
          that.curContract = {pid: res1.data.p_contract ? res1.data.p_contract[0].id : null, sid: res1.data.s_contract ? res1.data.s_contract[0].id : null}
          if (that.curContract.pid) {
            that.$ajax.get(`/api/chain/circle/${that.curContract.pid}/`).then(res2 => {
              that.pData = res2.data.info
            })
          } else {
            that.pData = {}
          }
          if (that.curContract.sid) {
            that.$ajax.get(`/api/chain/circle/${that.curContract.sid}/`).then(res2 => {
              that.sData = res2.data.info
            })
          } else {
            that.sData = {}
          }
        })
      }
    })
  },
  methods: {
    getCredit (uid, cid) {
      this.$ajax.get(`/api/chain/company/${uid}/partners/?chain_id=${cid}`).then(res => {
        this.customer_credit_rating1 = res.data.s_partners
        this.customer_credit_rating = res.data.p_partners
      })
    },
    showUserCredit () {
      this.getCredit(this.bid || localStorage.id, this.curChain)
      this.visibleUser = true
    },
    showServiceCredit () {
      this.getCredit(this.bid || localStorage.id, this.curChain)
      this.visibleService = true
    },
    handlerCloseS () {
      this.visibleService = false
    },
    handlerCloseU () {
      this.visibleUser = false
    },
    // 供应商
    supplierTotal (i, item) {
      const that = this
      if (i === 0) {
        // 其他收起
        that.nameTitle.forEach((item) => {
          item.helpFlag = false
        })
        that.total = !that.total
        that.visible = !that.visible
      } else if (i === 1) {
        // 请求记账
        that.$ajax.get(`/api/chain/circle/${item.id}/`).then(res2 => {
          that.pData = res2.data.info
          that.listData.supplier_name = item.name
        })
        that.visible = false
        // 其他收起
        that.nameTitle.forEach((item) => {
          item.helpFlag = false
        })
        // 订单或订金收起
        that.orderDeposit.forEach((item) => {
          item.helpFlag = false
        })
        // 其他收起
        that.nameTitle1.forEach((item) => {
          item.helpFlag = false
        })
        // 订单或订金收起
        that.orderDeposit1.forEach((item) => {
          item.helpFlag = false
        })
      }
    },
    // 订单 and 订金
    orderTotal (index, item, i) {
      const that = this
      // 其他收起
      that.nameTitle1.forEach((item) => {
        item.helpFlag = false
      })
      // 订单或订金收起
      that.orderDeposit1.forEach((item) => {
        item.helpFlag = false
      })
      that.visible = false
      if (i === 0) {
        // 订单或订金时，其他收起
        that.nameTitle.forEach((item) => {
          item.helpFlag = false
        })
        // 存储数据
        var listData = that.orderDeposit
        // 先用一个变量接收一个原来的状态值
        var helpFlag = that.orderDeposit[index].helpFlag
        // 循环清空所有的状态值
        listData.forEach((item) => {
          item.helpFlag = false
        })
        // 改变状态值
        listData[index].helpFlag = !helpFlag
        that.orderDeposit = listData
        if (index === 0) {
          that.listData.order = that.pData.Order || []
        } else if (index === 1) {
          that.listData.order = []
        }
      } else {
        // 订单或订金收起
        that.orderDeposit.forEach((item) => {
          item.helpFlag = false
        })
        // 存储数据
        var listData = that.nameTitle
        // 先用一个变量接收一个原来的状态值
        var helpFlag = that.nameTitle[index].helpFlag
        // 循环清空所有的状态值
        listData.forEach((item) => {
          item.helpFlag = false
        })
        // 改变状态值
        listData[index].helpFlag = !helpFlag
        that.nameTitle = listData
        if (index === 0) {
          that.listData.tabData = []
        } else if (index === 1) {
          that.listData.tabData = that.sData.Warehouse || []
        } else if (index === 2) {
          that.listData.tabData = that.sData.Transport || []
        } else if (index === 3) {
          that.listData.tabData = that.sData.Acceptance || []
        } else if (index === 4) {
          that.listData.tabData = that.sData.Settlement || []
        } else if (index === 5) {
          that.listData.tabData = that.sData.Invoice || []
        } else if (index === 6) {
          that.listData.tabData = that.sData.Payment || []
        } else if (index === 7) {
          that.listData.tabData = []
        }
      }
    },
    // 买家
    customerTotal (i, item) {
      const that = this
      if (i === 0) {
        // 其他收起
        that.nameTitle1.forEach((item) => {
          item.helpFlag = false
        })
        that.total1 = !that.total1
        that.visible1 = !that.visible1
      } else if (i === 1) {
        that.$ajax.get(`/api/chain/circle/${item.id}/`).then(res2 => {
          that.sData = res2.data.info
          that.listData.supplier_name = item.name
        })
        that.visible1 = false
        // 其他收起
        that.nameTitle1.forEach((item) => {
          item.helpFlag = false
        })
        // 订单或订金收起
        that.orderDeposit1.forEach((item) => {
          item.helpFlag = false
        })
        // 其他收起
        that.nameTitle.forEach((item) => {
          item.helpFlag = false
        })
        // 订单或订金收起
        that.orderDeposit.forEach((item) => {
          item.helpFlag = false
        })
      }
    },
    handleLen (index) {
      if (index === this.nameTitle1.length - 1) {
        return 'width30'
      }
    },
    // 订单 and 订金
    orderCustomer (index, item, i) {
      const that = this
      // 其他收起
      that.nameTitle.forEach((item) => {
        item.helpFlag = false
      })
      // 订单或订金收起
      that.orderDeposit.forEach((item) => {
        item.helpFlag = false
      })
      that.visible1 = false
      if (i === 0) {
        // 订单或订金时，其他收起
        that.nameTitle1.forEach((item) => {
          item.helpFlag = false
        })
        // 存储数据
        var listData = that.orderDeposit1
        // 先用一个变量接收一个原来的状态值
        var helpFlag = that.orderDeposit1[index].helpFlag
        // 循环清空所有的状态值
        listData.forEach((item) => {
          item.helpFlag = false
        })
        // 改变状态值
        listData[index].helpFlag = !helpFlag
        that.orderDeposit1 = listData
        if (index === 0) {
          that.listData.order = that.sData.Order || []
        } else if (index === 1) {
          that.listData.order = []
        }
      } else {
        // 订单或订金收起
        that.orderDeposit1.forEach((item) => {
          item.helpFlag = false
        })
        // 存储数据
        var listData = that.nameTitle1
        // 先用一个变量接收一个原来的状态值
        var helpFlag = that.nameTitle1[index].helpFlag
        //循环清空所有的状态值
        listData.forEach((item) => {
          item.helpFlag = false
        })
        // 改变状态值
        listData[index].helpFlag = !helpFlag
        that.nameTitle1 = listData
        if (index === 0) {
          that.listData.tabData = that.pData.Warehouse || []
        } else if (index === 1) {
          that.listData.tabData = that.pData.Transport || []
        } else if (index === 2) {
          that.listData.tabData = that.pData.Acceptance || []
        } else if (index === 3) {
          that.listData.tabData = that.pData.Settlement || []
        } else if (index === 4) {
          that.listData.tabData = that.pData.Invoice || []
        } else if (index === 5) {
          that.listData.tabData = that.pData.Payment || []
        } else if (index === 6) {
          that.listData.tabData = []
        }
      }
    },
    // 更换链
    handleChain (id, title, type) {
      const that = this
      that.$ajax.get('/api/chain/circle/contract_list/?chain_id=' + id).then(res1 => {
        that.listNav = res1.data.p_contract
        that.listNav1 = res1.data.s_contract
        that.curChain = id
        that.listData = {
          supplier_name: res1.data.p_contract[0]  ? res1.data.p_contract[0].name : '暂无合同',
          supplier_names: res1.data.s_contract[0] ? res1.data.s_contract[0].name : '暂无合同',
          order: [],
          tabData: []
        }
        that.curContract = {pid: res1.data.p_contract[0] ? res1.data.p_contract[0].id : null, sid: res1.data.s_contract[0] ? res1.data.s_contract[0].id : null}
        if (that.curContract.pid) {
          that.$ajax.get(`/api/chain/circle/${that.curContract.pid}/`).then(res2 => {
            that.pData = res2.data.info
          })
        } else {
          that.pData = {}
        }
        if (that.curContract.sid) {
          that.$ajax.get(`/api/chain/circle/${that.curContract.sid}/`).then(res2 => {
            that.sData = res2.data.info
          })
        } else {
          that.sData = {}
        }
        that.selChian = title
      })
      that.chainFlag = false
      that.nameTitle.forEach(val => {
        val.helpFlag = false
      })
      that.nameTitle1.forEach(val => {
        val.helpFlag = false
      })
      that.visible1 = false
      that.visible = false
      that.curChainType = type   
    },
    // 详情
    handleDetail (item, index, isOrder, cType) {
      const that = this 
      let str = ''
      if (item.id) {
        if (isOrder) {
          str = '#/credit_app/chain_detail/order?only=1&order_id=' + item.id + '&contract_id=' + (cType === 'p' ? that.curContract.pid : that.curContract.sid) + '&chain_id='+ that.curChain
        } else {
          let arr = []
          cType === 'p' ? arr = [
            '',
            '#/credit_app/chain_detail/outbound?only=1&warehouse_id=',
            '#/credit_app/chain_detail/waybill?only=1&transport_id=',
            '#/credit_app/chain_detail/acceptance?only=1&acceptance_id=',
            '#/credit_app/chain_detail/settlement?only=1&settlement_id=',
            '#/credit_app/chain_detail/invoice?only=1&invoice_id=',
            '#/credit_app/chain_detail/payment?only=1&payment_id='
          ] : arr = [
            '#/credit_app/chain_detail/outbound?only=1&warehouse_id=',
            '#/credit_app/chain_detail/waybill?only=1&transport_id=',
            '#/credit_app/chain_detail/acceptance?only=1&acceptance_id=',
            '#/credit_app/chain_detail/settlement?only=1&settlement_id=',
            '#/credit_app/chain_detail/invoice?only=1&invoice_id=',
            '#/credit_app/chain_detail/payment?only=1&payment_id='
          ]
          str = arr[index] + item.id + '&contract_id=' + (cType === 'p' ? that.curContract.pid : that.curContract.sid) + '&chain_id='+ that.curChain
        }
        window.open(str)
      }
    },
    handleContract (id, type) {
      const that = this
      if (type === 'p') {
        that.$ajax.get(`/api/chain/circle/${id}/`).then(res2 => {
          that.pData = res2.data.info
        })
      }
      // let str = '#/credit_app/chain_detail/contract?only=1&contract_id='
      // if (id) {
      //   str += id
      // } else {
      //   str += this.curContract.sid
      // }
      // window.open(str)
    },
    toChain () {
      var that = this
      let _url = Number(this.curChainType) === 1 ? 'receive_chain' : 'payment_chain'
      that.$router.push({
        path: `/chain_app/${_url}?id=${that.curChain}`
      })
    }
  },
  // watch: {
  //   bid: function (ne) {
  //     // console.log(ne)
  //   }
  // }
}
</script>
<style lang="less" scoped>
.width30 {
  width: 30px;
}
#ring {
  display: flex;
  width: 100%;
  flex-direction: row;
  .left,.right {
    flex: 1;
    display: flex;
    flex-direction: row;
    .left_list {
      flex: 1;
      text-align: center;
    }
    .order {
      dl {
        text-align: center;
        dd {
          padding-top: 10px;
          p {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
    .list_for {
      dl {
        text-align: center;
        dt {
          position: relative;
          margin-right: 2px;
          i {
            position: absolute;
            right: 0;
            left: 0;
            height: 1px;
            top: 13px;
            z-index: 1;
          }
          img {
            position: relative;
            z-index: 2;
            margin-right: 10px;
          }
        }
        dd {
          p {
            text-align: center;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
      }
      // ul {
      //   li {
      //     // padding-left: 18px;
      //   }
      // }
    }
    ul {
      li {
        // text-align: left;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        cursor: pointer;
      }
    }
  }
  .left {
    .supplier_title {
      text-align: center;
      margin-right: 5px;
      cursor: pointer;
      dd {
        p {
          text-align: center;
          font-size:16px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
          cursor: pointer;
        }
        ul {
          border: none;
          background: #fff;
          width: 60px;
          li {
            padding: 0;
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(56,137,255,1);
          }
        }
      }
    }
    dl {
      dt {
        i {
          border: 1px dashed rgba(12,141,255,1);
        }
      }
      dd {
        position: relative;
        p:hover {
          cursor: pointer;
          color:rgba(12,141,255,1);
          .el-icon-caret-bottom {
            color:rgba(12,141,255,1);
          }
          .el-icon-caret-left {
            color:rgba(12,141,255,1);
          }
        }
        .active {
          color:rgba(12,141,255,1) !important;
          .el-icon-caret-bottom {
            color:rgba(12,141,255,1);
          }
          .el-icon-caret-left {
            color:rgba(12,141,255,1);
          }
        }
        ul {
          position: absolute;
          width: 200px;
          background: #fff;
          border: 1px solid #eaeaea;
          z-index: 2;
          li {
            padding: 0 5px;
            text-align: left;
            line-height: 22px;
            background: #fff;
          }
        }
      }
    }
    .list_for:last-child {
      dl {
        dt {
          position: relative;
          i {
            position: absolute;
            left: 0;
            width: 30px;
          }
        }
      }
    }
    .order {
      dt {
        display: flex;
        i {
          height: 1px;
          flex: 1;
          margin-top: 13px;
          margin-right: 2px;
        }
        img {
          margin-left: 15px;
        }
      }
      dd {
        p {
          text-align: left;
          padding-left: 10px;
        }
      }
    }
    li:hover {
      color: rgba(12,141,255,1);
    }
  }
  .right {
    .supplier_title {
      text-align: center;
      margin-left: 5px;
      cursor: pointer;
      dd {
        p {
          text-align: center;
          font-size:16px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
          cursor: pointer;
        }
        ul {
          width: 50px;
          padding: 0;
          border: none;
          li {
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(235,97,0,1);
          }
        }
      }
    }
    dl {
      dt {
        i {
          border: 1px dashed rgba(235,97,0,1);
        }
      }
      dd {
        position: relative;
        p:hover {
          cursor: pointer;
          color:rgba(235,97,0,1);
          .el-icon-caret-bottom {
            color:rgba(235,97,0,1);
          }
          .el-icon-caret-left {
            color:rgba(235,97,0,1);
          }
        }
        ul {
          position: absolute;
          width: 200px;
          background: #fff;
          border: 1px solid #eaeaea;
          z-index: 2;
          li {
            padding: 0 5px;
            text-align: left;
            line-height: 22px;
            background: #fff;
          }
        }
        .active {
          color:rgba(235,97,0,1) !important;
          .el-icon-caret-bottom {
            color:rgba(235,97,0,1);
          }
          .el-icon-caret-left {
            color:rgba(235,97,0,1);
          }
        }
      }
    }
    .list_for:last-child {
      dl {
        dt {
          position: relative;
          i {
            position: absolute;
            left: 0;
            width: 30px;
          }
        }
      }
    }
    .order {
      dt {
        display: flex;
        i {
          height: 1px;
          flex: 1;
          margin-top: 13px;
          margin-right: 2px;
        }
        img {
          margin-left: 15px;
        }
      }
      dd {
        p {
          text-align: left;
          padding-left: 10px;
        }
      }
    }
    li:hover {
      color: rgba(235,97,0,1);
    }
  }
  .center {
    .left_list {
      text-align: center;
      // padding: 0 30px;
      position: relative;
      p {
        font-size:16px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        cursor: pointer;
      }
      ul {
        position: absolute;
        z-index: 3;
        background: #fff;
        width: 160px;
        border: 1px solid #eaeaea;
        font-size: 12px;
        li {
          line-height: 16px;
          padding: 3px 5px;
          text-align: left;
          cursor: pointer;
        }
        li:hover {
          color: #fff;
          background: #666;
        }
      }
    }
    .toChain {
      cursor: pointer;
    }
  }
  .el-icon-caret-bottom {
    color:rgba(51,51,51,1);
  }
  .el-icon-caret-left {
    color:rgba(51,51,51,1);
  }
  dl {
    dd {
      padding-top: 6px;
    }
  }
}
</style>

<style lang="less">
.el-popover {
  z-index: 2 !important;
  position: relative;
  ul {
    li {
      cursor: pointer;
    }
    li:hover {
      color:rgba(56,137,255,1);
    }
  }
}
.circle-grade {
  .circle-grade__title {
    margin: 5px 20px 0px 20px;
    font-weight: bolder
  }
  .defEmpty {
    text-align: center;
    span {
      display: inline-block;
      color: #666;
    }
  }
  &.user {
    position: absolute;
    right: 10px;
  }
  // border: 1px solid #e8e8e8;
  height: auto;
  .business_grade {
    padding: 20px 20px 10px 20px;
    .business_name {
      font-weight: bold;
      font-size: 14px;
    }
    ul {
      display: flex;
      flex-direction: row;
      li {
        flex: 1;
        p {
          font-weight: normal;
          font-size: 13px;
          padding-top: 5px;
          color: #999;
          span {
            color: #333;
          }
        }
      }
    }
  }
}
</style>
