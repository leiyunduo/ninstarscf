<template>
  <div class='create_detail'>
    <!-- <AppNav :father='{selIndex: 2}' /> -->
    <div class="create_info">
      <div class="location">
        <location :location='location' />
      </div>
      <div class="create_section">
        <div class="section_title">
          <p>{{keyword}}金额（元）</p>
          <p>{{Number(showData.amount).toFixed(2)}}</p>
        </div>
        <div class="chain_show">
          <div class="chain_title">
            <div>
              <span>所属项目：</span>
              <span>{{showData.contract_name}}</span>
            </div>
            <div>
              <span>{{keyword}}人：</span>
              <span>{{showData.partner_business}}</span>
            </div>
          </div>
          <div class="chain_list">
            <div class="show_title">
              <div v-if="!selWarehouse" @click="handleCheckAll(0, 1)"></div>
              <img v-if="selWarehouse" @click="handleCheckAll(0, 0)" src="/static/img/checked.png" alt="">
              <span>出货凭证</span>
            </div>
            <ul v-if="showData.warehouse">
              <li v-for="(item, index) in showData.warehouse" :key='index'>
                <div class='checkbox'>
                  <div v-if="!item.check" @click="handleCheck(index, 0)"></div>
                  <img v-if="item.check" @click="handleCheck(index, 0)" src="/static/img/checked.png" alt="">
                </div>
                <div>
                  <span>出货单标题：</span>
                  <span>{{item.title}}</span>
                </div>
                <div>
                  <span>出货金额（元）：</span>
                  <span>{{item.amount}}</span>
                </div>
                <div>
                  <span>出单日期：</span>
                  <span>{{item.date_created}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="chain_list">
            <div class="show_title">
              <div v-if="!selTransport" @click="handleCheckAll(1, 1)"></div>
              <img v-if="selTransport" @click="handleCheckAll(1, 0)" src="/static/img/checked.png" alt="">
              <span>运单凭证</span>
            </div>
            <ul v-if="showData.transport">
              <li v-for="(item, index) in showData.transport" :key='index'>
                <div class='checkbox'>
                  <div v-if="!item.check" @click="handleCheck(index, 1)"></div>
                  <img v-if="item.check" @click="handleCheck(index, 1)" src="/static/img/checked.png" alt="">
                </div>
                <div>
                  <span>运单标题：</span>
                  <span>{{item.title}}</span>
                </div>
                <div>
                  <span>运单金额（元）：</span>
                  <span>{{item.amount}}</span>
                </div>
                <div>
                  <span>出单日期：</span>
                  <span>{{item.date_created}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="chain_list">
            <div class="show_title">
              <div v-if="!selAcceptance" @click="handleCheckAll(2, 1)"></div>
              <img v-if="selAcceptance" @click="handleCheckAll(2, 0)" src="/static/img/checked.png" alt="">
              <span>验收凭证</span>
            </div>
            <ul v-if="showData.warehouse">
              <li v-for="(item, index) in showData.acceptance" :key='index'>
                <div class='checkbox'>
                  <div v-if="!item.check" @click="handleCheck(index, 2)"></div>
                  <img v-if="item.check" @click="handleCheck(index, 2)" src="/static/img/checked.png" alt="">
                </div>
                <div>
                  <span>验收单标题：</span>
                  <span>{{item.title}}</span>
                </div>
                <div>
                  <span>验收金额（元）：</span>
                  <span>{{item.amount}}</span>
                </div>
                <div>
                  <span>出单日期：</span>
                  <span>{{item.date_created}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="chain_list">
            <div class="show_title">
              <div v-if="!selInvoice" @click="handleCheckAll(3, 1)"></div>
              <img v-if="selInvoice" @click="handleCheckAll(3, 0)" src="/static/img/checked.png" alt="">
              <span>发票凭证</span>
            </div>
            <ul v-if="showData.invoice">
              <li v-for="(item, index) in showData.invoice" :key='index'>
                <div class='checkbox'>
                  <div v-if="!item.check" @click="handleCheck(index, 3)"></div>
                  <img v-if="item.check" @click="handleCheck(index, 3)" src="/static/img/checked.png" alt="">
                </div>
                <div>
                  <span>发票号码：</span>
                  <span>{{item.number}}</span>
                </div>
                <div>
                  <span>发票金额（元）：</span>
                  <span>{{item.amount}}</span>
                </div>
                <div>
                  <span>出票日期：</span>
                  <span>{{item.date_created}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="btn">
          <button>确认并提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import location from '@/components/location/location'
const mock = require('./mock')
export default {
  name: 'createDetail',
  components: {
    // AppNav, 
    location
  },
  data () {
    return {
      keyword: '',
      location: [],
      showData: {}  
    }
  },
  created () {
    const that = this
    let claimType = this.$route.query.type
    if (claimType === '0') {
      that.location = [
        {title: '我的债权债务', url: '/claim_app'},
        {title: '创建债权'}
      ]
      that.keyword = '债权'
    } else {
       that.location = [
        {title: '我的债权债务', url: '/claim_app'},
        {title: '创建债务'}
      ]
      that.keyword = '债务'
    }
    let selChain = this.$route.query.id
    // console.log(mock)
    let showData = {...mock.myCredit[0], ...mock.myCredit[0]['chain_info'][0]}
    let keyList = ['warehouse', 'transport', 'acceptance', 'invoice']
    keyList.forEach(val => {
      showData[val].forEach(el => {
        el.check = false
      })
    })
    that.$ajax.get(`/api/claims_debts/contract_info/${selChain}/`).then(res =>{
      console.log(res)
    })
    this.showData = showData
  },
  methods: {
    // 选中
    handleCheck (index, sq) {
      let keyList = ['warehouse', 'transport', 'acceptance', 'invoice']
      let showData = this.showData
      console.log(showData[keyList[sq]][index].check)
      showData[keyList[sq]][index].check = !showData[keyList[sq]][index].check
      this.showData = showData
    },
    // 全选
    handleCheckAll (sq, sw) {
      let showData = this.showData
      let swList = ['selWarehouse', 'selTransport', 'selAcceptance', 'selInvoice']
      let keyList = ['warehouse', 'transport', 'acceptance', 'invoice']
      showData[keyList[sq]].forEach(val => {
        sw ? val.check = true : val.check = false
      })
      this[swList[sq]] = !this[swList[sq]]
    }
  },
  computed: {
    selWarehouse: {
      get () {
        const that = this
        let warehouse = that.showData.warehouse
        let len = warehouse.length
        let s = warehouse.filter((val) => val.check).length
        if (s === len) {
          return true
        } else {
          return false
        }
      },
      set (e) {
        return null
      }
    },
    selInvoice: {
      get () {
        const that = this
        let invoice = that.showData.invoice
        let len = invoice.length
        let s = invoice.filter((val) => val.check).length
        if (s === len) {
          return true
        } else {
          return false
        }
      },
      set (e) {
        return null
      }
    },
    selTransport: {
      get () {
        const that = this
        let transport = that.showData.transport
        let len = transport.length
        let s = transport.filter((val) => val.check).length
        if (s === len) {
          return true
        } else {
          return false
        }
      },
      set (e) {
        return null
      }
    },
    selAcceptance: {
      get () {
        const that = this
        let acceptance = that.showData.acceptance
        let len = acceptance.length
        let s = acceptance.filter((val) => val.check).length
        if (s === len) {
          return true
        } else {
          return false
        }
      },
      set (e) {
        return null
      }
    }
  }
}
</script>

<style scoped lang='less'>
.create_detail {
  margin: 0 auto;
  height: 100%;
  //padding-top: 70px;
  display: flex;
  .create_info {
    min-height: 100%;
    // width: 100%;
    // padding: 0 50px;
    background: #FAFAFA;
    .location {
      background: #fff;
    }
  }
  .create_section {
    margin: 50px 30px;
    background: #fff;
    .section_title {
      p:first-child {
        font-size: 14px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        text-align: center;
      }
      p:last-child {
        font-size: 30px;
        font-weight: bolder;
        color: #eb6100;
        text-align: center;
        line-height: 48px;
      }
    }
    .chain_show {
      border:1px solid rgba(232, 232, 232, 1);
      margin: 0 40px;
      margin-top: 20px;
      .chain_title {
        display: flex;
        padding: 30px 30px 20px 20px;
        &>div {
          width: 40%;
          span:first-child {
            color: #666;
          }
          span:last-child {
            color: #eb6100;
            // font-weight: bolde;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      .chain_list {
        padding: 0 20px;
        .show_title {
          display: flex;
          align-items: center;
          height: 36px;
          background: #eee;
          padding: 0 20px;
          &>div {
            width: 18px;
            height: 16px;
            background: #fff;
            border: 1px solid #999;
            border-radius: 1px;
            cursor: pointer;
          }
          &>img {
            cursor: pointer;
          }
          span {
            margin-left: 25px;
            color: #666;
          }
        }
        ul {
          border: 1px solid #e8e8e8;
          border-top: none;
          margin-bottom: 10px;
          li {
            display: flex;
            height: 32px;
            align-items: center;
            padding: 0 20px;
            &>div.checkbox {
              margin: 0;
              // width: auto;
              cursor: pointer;
              width: 18px;
              div {
                width: 16px;
                height: 16px;
                background: #fff;
                border: 1px solid #999;
                border-radius: 1px;
              }
            }
            &>div {
              margin-left: 25px;
              width: 28%;
              font-size: 14px;
              span:first-child {
                color: #999;
              }
              span:last-child {
                color: #666;
              }
            }
          }
          li:nth-of-type(even) {
            background: rgb(250, 250, 250);
          }
        }
      }
    }
    .btn {
      text-align: center;
      button {
        margin: 42px 0 28px 0;
        width:140px;
        height:36px;
        background:rgba(235, 97, 0, 1);
        border:1px solid rgba(238, 238, 238, 1);
        border-radius:4px;
        color: #fff;
      }
    }
  }
}
</style>
