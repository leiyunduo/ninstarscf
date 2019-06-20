<template>
  <div class="nav">
    <div class="title">销售合同登记</div>
    <ul class="first_nav">
      <li class="second_nav" v-for="(item, index) in titleList" :key='index' v-if="index <= 6">
        <div class="second">
          <!-- <i class="iconfont" :class="showData[index].length === 0 ? 'icon-icon-test2' : 'icon-icon-test'"></i> -->
          <img :src='showData[index].length > 0 ? icons.confirm : icons.unfinish'/>
          <span @click="toCreate($event, index, 1, showData[index])">{{item.name}}</span>
        </div>
        <ul class="third_nav" v-if="index !== 5 && index !== 6 && showData[index].length !== 0">
          <li v-for="(show, showIndex) in showData[index]" :key='showIndex' class="third">
            <!-- <i class="iconfont" :class="icon[show.status]"></i> -->
            <img :src='show.status === "1" ? icons.unauth : show.status === "2" ? icons.auth : icons.confirm' />
            <div :id="('showData' + index + showIndex)" @click="(index === 3 || index === 4 || index === 5) ? tochain($event, index, show, 1) : tochain($event, index, showData[index][0], 1)" :class="('showData' + index + showIndex).toString() === setIndex ? 'nav_text_o': ''">{{show.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="title">采购合同登记记账</div>
    <ul class="first_nav">
      <li class="second_nav" v-for="(item, index) in relatedTableList" :key='index'>
        <div class="second">
          <!-- <i class="iconfont" :class="related[index].length === 0 ? 'icon-icon-test2' : 'icon-icon-test'"></i> -->
          <img :src='related[index].length > 0 ? icons.confirm2 : icons.unfinish'/>
          <span @click="toCreate($event, index, 2, showData[index])">{{item.name}}</span>
        </div>
        <ul class="third_nav" v-if="related[index].length !== 0 && index !== 5 && index !== 6" >
          <li v-for="(show, showIndex) in related[index]" :key='showIndex' class="third">
            <!-- <i class="iconfont" :class="icon[show.status]"></i> -->
            <img :src='show.status === "1" ? icons.unauth2 : show.status === "2" ? icons.auth2 : icons.confirm2' />
            <div :id="('related' + index + showIndex)" @click="(index === 3 || index === 4 || index === 5 || index > 6) ? tochain($event, index, show, 2) : tochain($event, index, related[index][0], 2)" :class="('related' + index + showIndex) === setIndex ? 'nav_text_b': ''">{{show.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="title">关联采购登记</div>
    <ul class="first_nav">
      <li class="second_nav" v-for="(item, index) in titleList" :key='index' v-if="index > 6">
        <div class="second">
          <!-- <i class="iconfont" :class="showData[index].length === 0 ? 'icon-icon-test2' : 'icon-icon-test'"></i> -->
          <img :src='showData[index].length > 0 ? icons.confirm : icons.unfinish'/>
          <span @click="toCreate($event, index, 1, showData[index])">{{item.name}}</span>
        </div>
        <ul class="third_nav">
          <li v-for="(show, showIndex) in showData[index]" :key='showIndex' class="third">
            <!-- <i class="iconfont" :class="icon[show.status]"></i> -->
            <img :src='show.status === "1" ? icons.unauth : show.status === "2" ? icons.auth : icons.confirm' />
            <div :id="('showDatathird' + index + showIndex)" @click="tochain($event, index, show, 1)" :class="('showDatathird' + index + showIndex) === setIndex ? 'nav_text_o': ''">{{show.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'NavChain',
  data () {
    return {
      icon: ['', 'icon-icon-test1', 'icon-icon-test7', 'icon-icon-test3'],
      showData: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      related: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      titleList: [
        {name: '关联B2B销售合同', url: '/receivableContractCreate'},
        {name: 'B2B应收订金', url: '/receivableDepositCreate'},
        {name: 'B2B销售订单计划', url: '/receivablePlanCreate'},
        {name: '仓储合同', url: '/warehousingContract1'},
        {name: '物流合同', url: '/logisticsContract1'},
        {name: '参与角色登记', url: '/roleRegistration'},
        {name: '应收融资计划', url: '/financingPlan1'},
        {name: 'B2B电子订单', url: '/orderList1'},
        {name: 'B2B电子出货单', url: '/waybillList1'},
        {name: 'B2B电子运单', url: '/receipt1'},
        {name: 'B2B验收入库单', url: '/WarehouseReceiptList1'},
        {name: 'B2B订单结算', url: '/settlement1'},
        {name: 'B2B发票', url: '/invoice1'},
        {name: 'B2B支付', url: '/payment1'},
        {name: 'B2B合同结算', url: '/contractSettlement1'}
      ],
      relatedTableList: [
        {name: '关联B2B采购合同', url: '/receivableContractCreate'},
        {name: 'B2B应付订金', url: '/receivableDepositCreate'},
        {name: 'B2B采购订单计划', url: '/receivablePlanCreate'},
        {name: '仓储合同', url: '/warehousingContract1'},
        {name: '物流合同', url: '/logisticsContract1'},
        {name: '参与角色登记', url: '/roleRegistration'},
        {name: '应收融资计划', url: '/financingPlan1'},
        {name: 'B2B电子订单', url: '/orderList1'},
        {name: 'B2B电子出货单', url: '/waybillList1'},
        {name: 'B2B电子运单', url: '/receipt1'},
        {name: 'B2B验收入库单', url: '/WarehouseReceiptList1'},
        {name: 'B2B结算', url: '/settlement1'},
        {name: 'B2B发票', url: '/invoice1'},
        {name: 'B2B支付', url: '/payment1'},
        {name: 'B2B合同结算', url: '/contractSettlement1'}
      ],
      icons: {
        unfinish: 'static/img/unfinish.png',
        unauth: 'static/img/unauth.png',
        unauth2: 'static/img/unauth2.png',
        auth: 'static/img/auth.png',
        auth2: 'static/img/auth2.png',
        confirm: 'static/img/confirm.png',
        confirm2: 'static/img/confirm2.png'
      },
      setIndex: ''
    }
  },
  props: ['chainId', 'path'],
  mounted () {
    var that = this
    // // console.log(this.chainId)
    const op = {
      method: 'PATCH',
      url: '/api/cursor_list/',
      data: {token: that.$token(), chain_id: that.chainId}
    }
    that.$ajax(op).then(res => {
      // // console.log(res)
      // // console.log(res.data.payable_contracts)
      if (res.data.payable_contracts.length !== 0) {
        var related = []
        res.data.payable_contracts[0].forEach((val, index) => {
          if (index <= 2 || index === 5 || index === 6 || index === 14) {
            res.data.payable_contracts[0][index] ? related[index] = [res.data.payable_contracts[0][index]] : related[index] = []
          } else {
            related[index] = val
          }
        })
      } else {
        related = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
      }
      that.related = related
      if (res.data.receivable_contracts.length !== 0) {
        var showData = []
        res.data.receivable_contracts[0].forEach((val, index) => {
          if (index <= 2 || index === 5 || index === 6 || index === 14) {
            res.data.receivable_contracts[0][index] ? showData[index] = [res.data.receivable_contracts[0][index]] : showData[index] = []
          } else {
            showData[index] = val
          }
        })
      } else {
        showData = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
      }
      that.showData = showData
    })
  },
  methods: {
    tochain: function (event, index, el, type) {
      var that = this
      that.setIndex = event.target.id
      var le = ''
      if (type === 2) {
        le = that.related
      } else {
        le = that.showData
      }
      if (index === 0) {
        that.$router.push({
          path: '/receivableContract',
          query: {
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 1 : 2,
            setIndex: index,
            line_type: type
          }
        })
      } else if (index === 1) {
        that.$router.push({
          path: '/receivableDeposit',
          query: {
            pid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 1 : 2,
            setIndex: index,
            line_type: type
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/receivableDeposit',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 1 : 2,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 2) {
        that.$router.push({
          path: '/receivablePlan',
          query: {
            pid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 1 : 2,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/receivablePlan',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 1 : 2,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 3) {
        that.$router.push({
          path: '/warehousingContract',
          query: {
            pid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 1 : 2,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/warehousingContract',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 1 : 2,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 4) {
        that.$router.push({
          path: '/logisticsContract',
          query: {
            pid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 1 : 2,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/logisticsContract',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 1 : 2,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 5) {
        that.$router.push({
          path: '/roleRegistration',
          query: {
            pid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 1 : 2,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/roleRegistration',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 1 : 2,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 6) {
        that.$router.push({
          path: '/financingPlan',
          query: {
            pid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 1 : 2,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/financingPlan',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 1 : 2,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 7) { 
        that.$router.push({
          path: '/orderList',
          query: {
            oid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 3 : 4,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/orderList',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 3 : 4,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 8) {
        that.$router.push({
          path: '/waybillList',
          query: {
            wid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 3 : 4,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/waybillList',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 3 : 4,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 9) {
        that.$router.push({
          path: '/receipt',
          query: {
            tid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 3 : 4,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/receipt',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 3 : 4,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 10) {
        that.$router.push({
          path: '/WarehouseReceiptList',
          query: {
            aid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 3 : 4,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/WarehouseReceiptList',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 3 : 4,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 11) {
        that.$router.push({
          path: '/settlement',
          query: {
            sid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 3 : 4,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/settlement',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 3 : 4,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 12) {
        that.$router.push({
          path: '/invoice',
          query: {
            vid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 3 : 4,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/invoice',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 3 : 4,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 13) {
        that.$router.push({
          path: '/payment',
          query: {
            pid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 3 : 4,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/payment',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 3 : 4,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      } else if (index === 14) {
        that.$router.push({
          path: '/contractSettlement',
          query: {
            pid: el.id,
            cid: le[0][0].id,
            chain_id: that.chainId,
            chain_type: 2,
            chain_nav: type === 1 ? 3 : 4,
            line_type: type,
            setIndex: index
          }
        })
        var query = {
          fatherPath: that.path,
          sonPath: '/contractSettlement',
          pid: el.id,
          cid: le[0][0].id,
          chain_id: that.chainId,
          chain_type: 2,
          chain_nav: type === 1 ? 3 : 4,
          setIndex: index,
          line_type: type,
          isOuter: true
        }
        that.$emit('changeTabContract', query)
      }
      if (navigator.userAgent.indexOf('Edge') > -1 || navigator.userAgent.indexOf('NET') > -1) {
        document.body.scrollTop = 0
      } else if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1) {
        document.body.scrollTop = 0
      } else {
        document.documentElement.scrollTop = 0
      }
    },
    toCreate: function (event, index, type, data) {
      var that = this
      // // console.log('toCreate' + type)
      if (data.length > 0) return
      var le = -1
      if (type === 1) {
        le = that.showData
      } else {
        le = that.related
      }
      if (index > 2) {
        if (!le[0][0]) {
          that.$message.error('请先创建合同')
          return
        }
        var nav = ''
        if (index <= 6) {
          if (type === 1) {
            nav = 1
          } else {
            nav = 3
          }
        } else {
          if (type === 1) {
            nav = 2
          } else {
            nav = 4
          }
        }
        that.$router.push({
          path: that.titleList[index].url,
          query: {
            chain_id: that.chainId,
            cid: le[0][0].id,
            chain_type: 2,
            chain_nav: nav,
            setIndex: index,
            line_type: type
            // plan_id: that.showData[0][0].id
          }
        })
      } else if (index === 1 || index === 2) {
        if (!le[0][0]) {
          that.$message.error('请先创建合同')
          return
        }
        that.$router.push({
          path: that.titleList[index].url,
          query: {
            chain_id: that.chainId,
            chain_type: 2,
            type: 2,
            cid: le[0][0].id,
            chain_nav: type === 1 ? 1 : 2,
            setIndex: index,
            line_type: type
          }
        })
      } else if (index === 0) {
        that.$router.push({
          path: that.titleList[index].url,
          query: {
            chain_id: that.chainId,
            chain_type: 2,
            type: type,
            chain_nav: type === 1 ? 3 : 4,
            setIndex: index,
            line_type: type
          }
        })
      }
      if (navigator.userAgent.indexOf('Edge') > -1 || navigator.userAgent.indexOf('NET') > -1) {
        document.body.scrollTop = 0
      } else if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1) {
        document.body.scrollTop = 0
      } else {
        document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
<style lang='less' scoped>
// @import url('./font/iconfont.css');
.nav_text_o {
  color: #ea6100
}
.nav_text_b {
  color: #0c8dff
}
.nav {
  height: 100%;
  padding: 10px 20px;
  float: right;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -moz-box-shadow:2px 4px 5px #EAEAEA, -2px -4px 5px #EAEAEA;
  -webkit-box-shadow:2px 4px 5px #EAEAEA, -2px -4px 5px #EAEAEA;
  box-shadow:2px 4px 5px #EAEAEA, -2px -4px 5px #EAEAEA;
  &::-webkit-scrollbar {
    display: none;
  }
  .title {
    line-height: 60px;
    // text-align: center;
    color: #eb6100;
    font-weight: 600;
  }
  .first_nav {
    padding: 0 20px;
    .second_nav {
      border-left: 2px solid #999;
      .second {
        position: relative;
        height: 40px;
        display: flex;
        align-items: center;
        color: #333333;
        cursor: pointer;
        left: -10px;
        top: -12px;  
        z-index: 2;
        // img {
        //   width: 20px;
        //   height: 20px;
        //   margin-right: 12px;
        // }
        i {
          font-size: 22px;
          font-weight: 600;
          margin-right: 12px;
        }
        // padding: 0 20px;
        span {
          font-weight: bolder;
          padding-left: 8px;
        }
      }
      ul {
        position: relative;
        top: -14px;
        color: #666666;
      }
      .third_nav {
        .third {
          display: flex;
          width: 100%;
          height: 30px;
          padding: 0px 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 14px;
          &>div {
            padding: 5px;
          }
          i {
            font-size: 18px;
            font-weight: 600;
            margin-right: 12px;
          }
        }
      }
    }
    .second_nav:last-child {
      border: none;
      .second {
        left: -8px;
      }
    }
  }
  .title:nth-of-type(2) {
    color: #415de3;
  }
}
.icon-icon-test1, .icon-icon-test3 {
  color: #eb6100;
  font-weight: 400;
}
.icon-icon-test4, .icon-icon-test7 {
  color: #d30000;
  font-weight: 400;
}
.icon-icon-test6 {
  color: #eb6100;
}
.icon-icon-test2 {
  color: #777;
  font-weight: 400;
}
.icon-icon-test {
  color: #22c67f;
  font-weight: 400;
}
</style>
