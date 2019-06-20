<template>
  <div id="ring">
    <div class="left">
      <!-- <div class="left_list">
        <dl class="supplier_title">
          <dt>
            <img src="../../../static/img/public_ring/supplier.png" alt="">
          </dt>
          <dd>
             <el-popover placement="right" width="auto" trigger="click" v-model="visible">
               <ul>
                 <li @click="supplierTotal(1, item)" v-for="(item, index) in listNav" :key="index">{{item}}</li>
               </ul>
              <p slot="reference" @click="supplierTotal(0)">采购合同<i :class="total ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i></p>
            </el-popover>
            <ul>
              <li>{{listData.supplier_name}}</li>
            </ul>
          </dd>
        </dl>
      </div> -->
      <div class="left_list order">
        <dl>
          <dt><img :src="p_list[0].length !== 0 ? 'static/img/public_ring/supplier_list.png' : 'static/img/public_ring/null_l.png'" alt=""><i :class="p_list[0].length !== 0 ? 'line_blue' : 'line_default'"></i></dt>
          <dd>
            <p style="width:80px" @click="(visible=!visible,set_index_p=-1)" :class="visible ? 'active' : ''">{{'采购合同'}}<i :class="visible ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
            <ul class="content_list" :class="visible ? 'show' : ''">
              <li class="content_list__item" @click="handleChain(item, 2, '采购合同')" v-if="p_list[0].length > 0" v-for="(item, index) in p_list[0]" :key="index">{{item.name}}</li>
              <li style="text-align:center" class="content_list__item" v-if="p_list[0].length === 0">{{'暂无数据'}}</li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="left_list list_for" v-for="(item1, index) in p_nameTitle" :key="index">
        <dl>
          <dt><img :src="p_list[index+1].length !== 0 ? 'static/img/public_ring/supplier_list.png' : 'static/img/public_ring/null_l.png'" alt=""><i :class="p_list[index+1].length !== 0 ? 'line_blue' : 'line_default'"></i></dt>
          <dd>
            <p :class="set_index_p===index ? 'active' : ''"  @click="selectItem(index)">{{item1.name}}<i :class="set_index_p===index ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
            <ul class="content_list" :class="set_index_p===index ? 'show' : ''">
              <li class="content_list__item" @click="handleChain(item, 2, item1.name)" v-for="(item, index_one) in p_list[index+1]" v-if="p_list[index+1].length>0" :key="index_one">{{item.name}}</li>
              <li style="text-align:center" v-if="p_list[index+1].length===0" class="content_list__item">暂无数据</li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
    <div class="center">
      <div class="left_list">
        <dl>
          <dt><img src="../../../static/img/public_ring/me.png" alt=""></dt>
          <!-- <dd><p>链主</p></dd> -->
        </dl>
      </div>
    </div>
    <div class="right">
      <div class="left_list order">
        <dl>
          <dt><img src="../../../static/img/public_ring/ring_orange_r.png" alt=""><i></i></dt>
          <dd>
            <p style="width:80px"  @click="(visible1=!visible1,set_index_s=-1)" :class="visible1 ? 'active' : ''">{{'销售项目'}}<i :class="visible1 ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
            <ul class="content_list" :class="visible1 ? 'show' : ''">
              <li class="content_list__item" @click="handleChain(item, 1, '销售合同')" v-for="(item, index) in s_list[0]" :key="index">{{item.name}}</li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="left_list list_for" v-for="(item1, index) in s_nameTitle" :key="index">
        <dl>
          <dt><img :src="s_list[index+1].length !== 0 ? 'static/img/public_ring/ring_orange_r.png' : 'static/img/public_ring/null_l.png'" alt=""><i :class="s_list[index+1].length !== 0 ? 'line_orange' : 'line_default'"></i></dt>
          <dd>
            <p :class="set_index_s===index ? 'active' : ''"  @click="selectItemTwo(index)">{{item1.name}}<i :class="set_index_s===index ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
            <ul class="content_list" :class="set_index_s===index ? 'show' : ''">
              <li class="content_list__item" @click="handleChain(item, 1, item1.name)" v-for="(item, index_one) in s_list[index+1]" v-if="s_list[index+1].length>0" :key="index_one">{{item.name}}</li>
              <li style="text-align:center" v-if="s_list[index+1].length===0" class="content_list__item">暂无数据</li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ring',
  props: ['chainId', 'element', 'chainType'],
  data () {
    return {
      p_nameTitle: [
        { name: '订单', helpFlag: false, url: '/chain_app/order'},
        { name: '融资', helpFlag: false, url: '' },
        { name: '仓单', helpFlag: false, url: '/chain_app/outboundInfo' },
        { name: '运单', helpFlag: false, url: '/chain_app/outboundInfo' },
        { name: '验收单', helpFlag: false, url: '/chain_app/acceptanceInfo' },
        { name: '结算单', helpFlag: false, url: '/chain_app/settlementInfo' },
        { name: '发票', helpFlag: false, url: '/chain_app/invoiceInfo' },
        { name: '支付', helpFlag: false, url: '/chain_app/paymentInfo' },
        { name: '合同结算', helpFlag: false, url: '' }
      ],
      p_list: [[],[],[],[],[],[],[],[],[],[]],
      s_list: [[],[],[],[],[],[],[],[],[],[]],
      p_contracts: [
        { name: '采购合同', helpFlag: false },
      ],
      s_nameTitle: [
        { name: '订单', helpFlag: false, url: '' },
        { name: '仓单', helpFlag: false, url: '' },
        { name: '运单', helpFlag: false, url: '' },
        { name: '验收单', helpFlag: false, url: '' },
        { name: '结算单', helpFlag: false, url: '' },
        { name: '发票', helpFlag: false, url: '' },
        { name: '支付', helpFlag: false, url: '' },
        { name: '合同结算', helpFlag: false, url: '' },
        { name: '还贷', helpFlag: false, url: '' }
      ],
      s_contracts: [
        { name: '销售合同', helpFlag: false },
      ],
      contract_p: [
        { name: '皮革采购合同', helpFlag: false },
        { name: '毛料采购合同', helpFlag: false }
      ],
      contract_r: [
        { name: '皮鞋销售合同', helpFlag: false },
      ],
      listNav: [],
      visible: false,
      visible1: false,
      set_index_p: -1,
      set_index_s: -1
    }
  },
  methods: {
    handleChain (obj, type, name) {
      var that = this
      if (name === '销售合同' || name === '采购合同') {
        let query = {
          contract_id: obj.id,
          contract_type: name === '销售合同' ? 1 : 2,
          chain_id: this.chainId,
          chain_type: this.chainType
        }
        that.$ajax.get(`/api/chain/contract/${obj.id}/`).then(res => {
          if (res.status === 200) {
            query.navIndex = Number(res.data.status) + 1
            that.$router.push({
              path: '/chain_app/contract',
              query
            })
          }
        })
      } else if (name === '订单') {
        let query = {
          order_id: obj.id,
          chain_id: this.chainId,
          chain_type: this.chainType
        }
        that.$ajax.get(`/api/chain/order/${obj.id}/`).then(res => {
          if (res.status === 200) {
            query.navIndex = Number(res.data.status) + 1
            that.$router.push({path: '/chain_app/order', query})
          }
        })
      } else if (name === '仓单') {
        let query = {
          outbound_id: obj.id,
          chain_id: this.chainId,
          chain_type: this.chainType
        }
        that.$ajax.get(`/api/chain/warehouse/${obj.id}`).then(res => {
          if (res.status === 200) {
            let path = Number(res.data.status) === 0 ? '/chain_app/outboundView' : '/chain_app/outboundModify'
            that.$router.push({path, query})
          }
        })
      } else if (name === '运单') {
        let query = {
          transport_id: obj.id,
          chain_id: this.chainId,
          chain_type: this.chainType
        }
        that.$ajax.get(`/api/chain/transport/${obj.id}`).then(res => {
          if (res.status === 200) {
            let path = Number(res.data.status) === 0 ? '/chain_app/waybillView' : '/chain_app/waybillModify'
            that.$router.push({path, query})
          }
        })
      } else if (name === '验收单') {
        let query = {
          acceptance_id: obj.id,
          chain_id: this.chainId,
          chain_type: this.chainType
        }
        that.$ajax.get(`/api/chain/acceptance/${obj.id}`).then(res => {
          if (res.status === 200) {
            let path = Number(res.data.status) === 0 ? '/chain_app/acceptanceView' : '/chain_app/acceptanceModify'
            that.$router.push({path, query})
          }
        })
      } else if (name === '结算单') {
        this.$router.push({
          path: '/chain_app/settlementView',
          query: {
            chain_id: that.$route.query.id,
            chain_type: that.chainType,
            settlement_id: obj.id
          }
        })
      } else if (name === '发票') {
        this.$router.push({
          path: '/chain_app/invoiceView',
          query: {
            chain_id: that.$route.query.id,
            chain_type: that.chainType,
            invoice_id: obj.id
          }
        })
      } else if (name === '支付') {
        this.$router.push({
          path: '/chain_app/paymentView',
          query: {
            chain_id: that.$route.query.id,
            chain_type: that.chainType,
            payment_id: obj.id
          }
        })
      }
    },
    selectItem (index) {
      this.visible = false
      this.set_index_p = this.set_index_p === index ? -1 :index
    },
    selectItemTwo (index) {
      this.visible1 = false
      this.set_index_s = this.set_index_s === index ? -1 :index
    },
    selectContract (item) {
      let _arr = [item]
      // this.getContracInfoById(item.id, 2, _arr)
    },
    getContractList (chainId) {
      this.$ajax.get(`/api/chain/circle/contract_list/?chain_id=${chainId}&company=1`).then(res => {
        let pid_list = res.data.p_contract.reduce((prev, next) => {
          prev.push(next.id)
          return prev
        }, [])
        let sid_list = res.data.s_contract.reduce((prev, next) => {
          prev.push(next.id)
          return prev
        }, [])
        this.getPContractInfo(this.chainId, this.company_id, res.data.p_contract, 2, pid_list)
        this.getPContractInfo(this.chainId, this.company_id, res.data.s_contract, 1, sid_list)
      })  
    },
    getPContractInfo (chainId, company_id, contract, type, list) {
      let _obj = {
        chain_id: chainId,
        company: company_id,
        contract_list: list
      }
      this.$ajax.put(`/api/chain/circle/all_info/`, _obj).then(res => {
        if (type === 1) {
          let _list = [[],[],[],[],[],[],[],[],[],[]]
          _list[0] = contract
          _list[1] = res.data.Order
          _list[2] = res.data.Warehouse
          _list[3] = res.data.Transport
          _list[4] = res.data.Acceptance
          _list[5] = res.data.Settlement
          _list[6] = res.data.Invoice
          _list[7] = res.data.Payment
          _list[8] = typeof res.data.ContractSettlement === 'object' ? [] : [{name: `总额:${this.toThousands(res.data.ContractSettlement)}元`}]
          _list[9] = []
          this.s_list = _list
        } else {
          let _list = [[],[],[],[],[],[],[],[],[],[]]
          _list[0] = contract
          _list[1] = res.data.Order
          _list[2] = []
          _list[3] = res.data.Warehouse
          _list[4] = res.data.Transport
          _list[5] = res.data.Acceptance
          _list[6] = res.data.Settlement
          _list[7] = res.data.Invoice
          _list[8] = res.data.Payment
          _list[9] = typeof res.data.ContractSettlement === 'object' ? [] : [{name: `总额:${this.toThousands(res.data.ContractSettlement)}元`}]
          this.p_list = _list
        }
      })
    }
  },
  beforeCreate() {
    this.$ajax.get(`/api/chain/company/myself/`).then(res => {
      if (res.status === 200) {
        this.company_id = res.data.company_id
      }
    })
  },
  mounted () {
    this.getContractList(this.chainId)
  },
  watch: {
    element (newer, old) {
      if (newer !== old) {
        this.visible = false
        this.visible1 = false
        this.set_index_p = -1
        this.set_index_s = -1
      }
    }
  }
}
</script>
<style lang="less" scoped>
.line_blue {
  border: 1px dashed #0c8dff !important;
}
.line_orange {
  border: 1px dashed #eb6100 !important;
}
.line_default {
  border: 1px dashed #e1e6f0 !important;
}
.content_list {
  position: absolute;
  background: #fff;
  min-width: 150px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 11;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  overflow: hidden;
  font-size: 14px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin-left: -40px;
  margin-top: 10px;
  display: none;
  &.show {
    display: block;
  }
}
#ring {
  display: flex;
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
            z-index: 222;
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
    }
    ul {
      li {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        cursor: pointer;
        margin-bottom: 5px;
      }
    }
  }
  .left {
    .supplier_title {
      text-align: center;
      margin-right: 5px;
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
          li {
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
          // padding-left: 10px;
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
      padding: 0 25px;
      p {
        font-size:16px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
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
  z-index: 222 !important;
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
</style>
