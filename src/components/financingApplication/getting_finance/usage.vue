<template>
  <div class="usercenter">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="view_info">
      <location :location="location"></location>
      <getset :statusList="statusList" type='1' :fid='fid' fType='receivable' :bid='bid'></getset>
      <div class="sub_after" v-if="sub === 2">
        <div class="success_sub">
          <p class="s_title">提交成功</p>
          <p class="s_line">
           您的操作已被提交，等待银行反馈。
          </p>
        </div>
        <div class="back_index">
          <div @click="backIndex">回到首页</div>
        </div>
      </div>
      <div class="sub_chain" v-if="sub === 1">
        <p class="sub_info" v-if="chainList.length !== 0">请在以下记账中选择您的资金去向，银行确认后将进入放款阶段。</p>
        <div class="chain_table" v-if="chainList.length !== 0">
          <div class="table_line" v-for="(item, index) in chainList" :key='index'>
            <div>
              <input type="checkbox" :checked='item.sel' @change="item.sel = !item.sel">
            </div>
            <div class="contract" v-if="item.type === '1'">
              <div>
                <span>合同名称：{{item.receivable_contract[0].contract_name}}</span>
                <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                <span>签署日期：{{item.receivable_contract[0].create_time}}</span>
              </div>
              <div v-if="item.payable_contract.number">
                <span>关联合同名称：{{item.payable_contract.contract_name}}</span>
                <span>交易公司：{{item.payable_contract.partner_business}}</span>
                <span>签署日期：{{item.payable_contract.create_time}}</span>
              </div>
              <div v-if="!item.payable_contract.number && item.type === '1'" style="color: #999;">无关联销售合同</div>
            </div>
            <div class="contract" v-if="item.type === '2'">
              <div v-if="item.payable_contract.number">
                <span>合同名称：{{item.payable_contract.contract_name}}</span>
                <span>交易公司：{{item.payable_contract.partner_business}}</span>
                <span>签署日期：{{item.payable_contract.create_time}}</span>
              </div>
              <div v-if="!item.payable_contract.number" style="color: #999;">无采购合同</div>
              <div>
                <span>关联合同名称：{{item.receivable_contract[0].contract_name}}</span>
                <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                <span>签署日期：{{item.receivable_contract[0].create_time}}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="chainList.length === 0" style="line-height: 40px;text-align: center; color: #666;">暂无可以提交的链式记账</div>
        <!-- <p class="sub_info" v-if="chainList.length !== 0">您提交的记账内容讲被银行查看。</p> -->
        <div class="sub_data">
          <div @click="subData()" v-if="chainList.length !== 0">提交</div>
          <div @click="subData($event, 0)">暂无去向</div>
        </div>
      </div>
      <div class="sub_chain1" v-if="sub === 3">
        <div class="chain_table" v-if="chainList.length !== 0">
          <div class="table_line" v-for="(item, index) in chainList" :key='index'>
            <div class="contract" v-if="item.type === '1'">
              <div>
                <span>合同名称：{{item.receivable_contract[0].contract_name}}</span>
                <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                <span>签署日期：{{item.receivable_contract[0].create_time}}</span>
              </div>
              <div v-if="item.payable_contract.contract_number">
                <span>关联合同名称：{{item.payable_contract.contract_name}}</span>
                <span>交易公司：{{item.payable_contract.partner_business}}</span>
                <span>签署日期：{{item.payable_contract.create_time}}</span>
              </div>
              <div v-if="!item.payable_contract.contract_number && item.type === '1'" style="color: #999;">无关联销售合同</div>
            </div>
            <div class="contract" v-if="item.type === '2'">
              <div v-if="item.payable_contract.contract_number">
                <span>合同名称：{{item.payable_contract.contract_name}}</span>
                <span>交易公司：{{item.payable_contract.partner_business}}</span>
                <span>签署日期：{{item.payable_contract.create_time}}</span>
              </div>
              <div v-if="!item.payable_contract.contract_number" style="color: #999;">无采购合同</div>
              <div>
                <span>关联合同名称：{{item.receivable_contract[0].contract_name}}</span>
                <span>交易公司：{{item.receivable_contract[0].partner_business}}</span>
                <span>签署日期：{{item.receivable_contract[0].create_time}}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="chainList.length === 0" style="line-height: 40px;text-align: center;">未提交相关的资金去向。</div>        
        <div class="sub_data">
          <div @click="backIndex()">返回首页</div>
          <div @click="navNext()">下一步</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Location from '../../location/location'
// import appNav from '../../financing/financingManege'
import Getset from '../../financing/finace'
export default {
  name: 'application',
  components: {
    Getset,
    // appNav,
    Location

  },
  data () {
    return {
      father: {selIndex: 3},
      location: [
        { title: '我的融资', url: '/financing' },
        { title: '资金用途' }
      ],
      invoiceList: [],
      statusList: [1, 1, 1, 1, 1, 1, 0, 0],
      tableTitle: [
        {name: '选择'},
        {name: '名称'},
        {name: '类型'},
        {name: '交易公司'}
      ],
      sub: -1
    }
  },
  methods: {
    backIndex: function () {
      this.$router.push({
        path: '/financing'
      })
    },
    navNext () {
      let that = this
      that.$router.push({
        path: '/getting_upload',
        query: {
          fid: that.fid,
          id: that.bid
        }
      })
    },
    subData: function ($event, sw) {
      // console.log(sw)
      var that = this
      var arr = []
      if (!sw) {
        that.chainList.forEach(val => {
          // // console.log(val)
          if (val.sel) {
            arr.push(val.id)
          }
        })
      }
      that.$ajax.post('/api/usage_chain_view/', {token: that.$token(), financing_id: that.fid, chain_id_list: arr, financing_type: 'receivable'}).then(res =>{
        if (res.data.code === '1') {
          that.$router.push({
            path: '/getting_upload',
            query: {
              id: that.bid,
              fid: that.fid,
              type: 1
            }
          })
        } else {
          that.$message.error(res.data.msg)
        }
      })
    }
  },
  beforeCreate () {
    var that = this
    // // console.log(that.$route.query)
    if (that.$route.query.id && that.$route.query.fid) {
      that.bid = Number(that.$route.query.id)
      that.fid = Number(that.$route.query.fid)
    } else {
      that.is404 = 1
    }
    // // console.log(1234)
    // var navStaus = that.statusList
    // var setp = that.setp
    // var showNav = []
    // navStaus.map((val, index) => {
    //   showNav[index] = {}
    //   if (index <= setp) {
    //     showNav[index].color = '#eb6100'
    //   } else {
    //     showNav[index].color = ''
    //   }
    // })
    that.$ajax.get('/api/usage_chain_view/?token=' + that.$token() + '&financing_id=' + that.fid + '&financing_type=receivable').then(res => {
      // console.log(res)
      if (res.data.code === '1') {
        if (res.data.usage_submit === '0') {
          that.sub = 1
          res.data.data.forEach(val => {
            val.sel = 0
          })
          that.chainList = res.data.data
        } else {
          that.$ajax.put('/api/usage_chain_view/', {token: that.$token(), financing_id: that.fid, financing_type: 'receivable'}).then(res1 => {
            if (res1.data.code === '1') {
              that.chainList = res1.data.data
              that.sub = 3
            } else {
              that.$message.error(res.data.msg)
            }
          })
        }
      }
    }) 
  }
}
</script>

<style scoped lang="less">
  // @import url('./iconfont.css');
  .usercenter {
    width: 100%;
    min-height: 100%;
    display: flex;
    //padding-top: 70px;
    .view_info {
      padding: 0 50px;
      background: #f5f7f8;
      // width: 100%;
      .status_pic {
        margin-top: 30px;
        padding: 0 30px;
        .pic_info {
          display: flex;
          height: 150px;
          justify-content: space-between;
          // background: #fff;
          font-size: 14px;
          .mine_info {
            width: 15%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .icon_wrap{
              width: 50px;
              height: 50px;
              background: #f0f0f0;
              color: #fff;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              i {
                font-size: 30px;
              }
            }
            .line_to {
              height: 30px;
              width: 3px;
              background: #eb6100;
              margin-top: 10px;
            }
            div:last-child{
              margin-top: 10px;
            }
          }
          .pic_line {
            width: 68%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .seller_info {
            width: 15%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .icon_wrap{
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              i {
                font-size: 32px;
                color: rgb(235, 97, 0);
              }
            }
            .line_to {
              height: 30px;
              width: 2px;
              background: #eb6100;
              margin-top: 10px;
            }
            div:last-child {
              margin-top: 5px;
            }
          }
        }
      }
    }
    .sub_after {
      .success_sub {
        // width: 1080px;
        padding: 30px 0;
        box-shadow: 0px 0px 5px #ccc;
        margin: 30px auto;
        width: 80%;
        background: #fff;
        color: #333;
        font-size: 14px;
        .s_title {
          line-height: 60px;
          width: 60%;
          margin: 0 auto;
          text-align: center;
        }
        .s_line {
          line-height: 40px;
          width: 60%;
          text-align: center;
          margin: 0 auto;
        }
        .s_info {
          line-height: 30px;
          font-size: 12px;
          width: 60%;
          text-align: right;
          margin: 20px auto;
        }
      }
      .back_index {
        margin-top: 80px;
        div {
          width: 90px;
          height: 30px;
          text-align: center;
          color: #fff;
          background: #eb6100;
          font-size: 14px;
          cursor: pointer;
          line-height: 30px;
          border-radius: 5px;
          margin: 0 auto;
        }
      }
    }
    .file_after {
      width: 1280px;
      margin: 0 auto;
      padding: 100px 0;
      margin-top: 30px;
      font-size: 14px;
      text-align: center;
    }
    .sub_chain {
      margin: 20px 0;
      .sub_info {
        line-height: 36px;
        color: #999;
        text-align: center;
      }
      .chain_table {
        padding: 20px;
        background: #fff;
        border: 1px solid #ccc;
        .table_line {
          display: flex;
          // border-bottom: 1px solid #eaeaea;
          align-items: center;
          margin-top: 20px;
          &>div:first-child {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            input {
              width: 20px;
              height: 20px;
            }
          }
          &>div:last-child {
            width: 100%;
          }
          &>.contract {
            font-size: 14px;
            color: #333;
            div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              line-height: 36px;
              span {
                width: 33%;
                height: 100%;;
              }
            }
            div:nth-child(1) {
              border-bottom: 1px solid #eaeaea;
            }
            div:nth-child(2) {
              line-height: 30px;
              color: #333;
              padding: 0 10px;
            }
          }
        }
        .table_line:last-of-type {
          border-bottom: none;
        }
      }
      .sub_data {
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          margin: 0 20px;
          width: 120px;
          height: 36px;
          background: #eb6100;
          color: #fff;
          text-align: center;
          border-radius: 4px;
          font-size: 14px;
          line-height: 36px;
          cursor: pointer;
        }
      }
    }
    .sub_chain1 {
      margin: 20px 0;
      .sub_info {
        line-height: 36px;
        color: #999;
        text-align: center;
      }
      .chain_table {
        // padding: 40px 0;
        margin: 40px 30px;
        padding: 20px;
        background: #fff;
        border: 1px solid #ccc;
        .table_line {
          margin-top: 20px;
          &>.contract {
            font-size: 14px;
            color: #333;
            div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              line-height: 36px;
              span {
                width: 33%;
                height: 100%;;
              }
            }
            div:nth-child(1) {
              border-bottom: 1px solid #eaeaea;
            }
            div:nth-child(2) {
              line-height: 30px;
              color: #333;
              // padding: 0 10px;
            }
          }
        }
        .table_line:last-of-type {
          border-bottom: none;
        }
      }
      .sub_data {
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          margin: 0 20px;
          width: 120px;
          height: 36px;
          background: #eb6100;
          color: #fff;
          text-align: center;
          line-height: 36px;
          cursor: pointer;
        }
      }
    }    
  }
  .overview {
    div.for_title {
      line-height: 60px;
      color: #999;
      text-align: center;
    }
    .back_index {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 120px;
        height: 36px;
        color: #fff;
        background: #eb6100;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
      }
    }
  }
</style>
