<template>
  <div class='assets'>
    <div class='assets_board'>
      <!-- <appNav :father='step' type='1'></appNav> -->
      <div class='assets_content'>
        <div class="c_assets_top">
          <!-- 信贷统计 -->
          <!-- <div class='assets_list'>
            <h3><img src="../../../static/img/leftbar/myxind.png" alt="">我的融资</h3>
          </div> -->
          <div class="financing_type">
            <ul>
              <li v-for="(item, index) in lists" :key='index' :class="selFinance === index ? 'sel' : ''" @click="handleNav(index)">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="slide_nav">
            <ul>
              <li>
              <div class="dash_board">
                <div class='board_title'>
                  <div>
                    <p>{{lists[selFinance].name}}总额：</p>
                    <p>{{toThousands(sum.demand_sum / 10000)}}（万元）</p>
                  </div>
                  <p>
                    <span>{{lists[selFinance].name}}笔数：</span>
                    <span>{{sum.demand_count}}（笔）</span>
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div class="dash_board">
                <div class="board_title">
                  <div>
                    <p>{{lists[selFinance].name}}逾期率：</p>
                    <p>{{(sum.overdue_rate * 100).toFixed(2) + '%'}}</p>
                  </div>
                  <img src="../../../static/img/icon/icon_chartpie.png" alt="">
                </div>
                <p>
                  <span>{{lists[selFinance].name}}逾期笔数：</span>
                  <span>{{sum.overdue_count}}（笔）</span>
                </p>
              </div>
            </li>
            <li>
              <div class="dash_board">
                <div class="board_title">
                  <div>
                    <p>{{lists[selFinance].name}}坏账率：</p>
                    <p>{{(sum.bad_rate * 100).toFixed(2) + '%'}}</p>
                  </div>
                  <img src="../../../static/img/icon/icon_chartline.png" alt="">
                </div>
                <p>
                  <span>{{lists[selFinance].name}}坏账笔数：</span>
                  <span>{{sum.bad_count}}（笔）</span>
                </p>
              </div>
            </li>
          </ul>
          </div>
        </div>
        <div class="c_assets_bottom">
          <div class='table_list'>
            <div class="top">
              <button @click="handleCreate">{{lists[selFinance].btn}}</button>
              <div class="left">
                <div class="select">
                  <select @change="handleChange($event)">
                    <option v-for="(item, index) in btnName" :key='index' :value="index">{{item.name}}</option>
                  </select>
                </div>
                <!-- <button v-for="(item, index) in btnName" :key="index" @click="btnTop(item, index)" :class="{activeBtn: isActiveBtn === index}">{{item.name}}</button> -->
              </div>
            </div>
          </div>
        </div>
        <div class="show_financing_list" v-if="selFinance === 0">
          <order-table :selStatus='selStatus' />
        </div>
        <div class="show_financing_list" v-if="selFinance === 1">
          <receviable-table :selStatus='selStatus' />
        </div>
        <div class="show_financing_list" v-if="selFinance === 4">
          <creditor-table :selStatus='selStatus' />
        </div>
      </div>
      <div class="shade_box" v-show="dialogMsg">
        <div class="to_display">
          <img class="closeWrap" @click="showMsg()" src="../../../static/img/im/im1.png" alt="">
          <img src="../../../static/img/im/to_ins.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
// // 申请中
// import application from './base/index_tab/index_tab'
// // 进行中
// import applicationSolving from './base/index_tab/index_tab_solving'
// // 已经拒
// import refuse from './base/index_tab/index_tab_refuse'
// // 已完成
// import finish from './base/index_tab/index_tab_finish'
// 订单融资表格
import orderTable from './base/index_table/order_table'
// 应收融资表格
import receviableTable from './base/index_table/receviable_table'
// 信贷员融资表格
import creditorTable from './base/index_table/creditor_table'

export default {
  name: 'financingIndex',
  components: {
    // AppNav, 
    orderTable, receviableTable,
    creditorTable
  },
  data () {
    return {
      // 按钮
      btnName: [
        {name: '申请中', status: '1'},
        {name: '处理中', status: '2,3'},
        {name: '已拒绝', status: '0'},
        {name: '已完成', status: '4'}
      ],
      lists: [
        {name: '订单融资', key: '1', btn: '融资申请', url: '/financing_app/order_application'},
        {name: '应收融资', key: '0', btn: '融资申请', url: '/financing_app/getting_application'},
        {name: '存货质押融资', btn: '融资申请'},
        {name: '贸易融资', btn: '融资申请'},
        {name: '信贷员融资', key: '4', btn: '融资申请', url: '/financing_app/creditor_financing'}
      ],
      viewWidth: `width: ${window.innerWidth - 60 - 15 }px`,
      selFinance: 0,
      isActiveBtn: 0,
      tableData: [],
      // 数据显示
      step: {selIndex: 3},
      selStatus: '1',
      dialogMsg: false,
      sum: {
        getSum: '100.00',
        getCount: 6,
        overdayCount: 3,
        overRate: '12.5%',
        badConut: 0,
        badRate: '0%'
      },
      sums: {},
      titleList: [
        {title: '我的应收池', href: '应收融资申请', url: '', value: ''},
        {title: '我的应付池', href: '订单融资申请', url: '/financing_app/order_application', value: ''},
        {title: '我的存货/存单池', href: '存货融资申请', url: '', value: '0'},
        {title: '贸易融资', href: '贸易融资申请', url: '', value: '0'},
        {title: '信贷员融资', href: '信贷员融资申请', value: '', url: '/financing_app/creditor_financing'}
      ]
    }
  },
  created () {
    const that = this
    // this.$ajax.get('/api/financing/application/total/').then(res => {
    //   if (res.status === 200) {
    //     this.sum = res.data.total
    //   }
    // })
    // this.$ajax.get('/api/financing/application/payable_receivable/').then(res => {
    //   if (res.status === 200) {
    //     let titleList = that.titleList
    //     titleList[0].value = res.data.receivable
    //     titleList[1].value = res.data.payable
    //   }
    // })
    this.$ajax.get('/api/financing/application/business_loan_summary/').then(res => {
      that.sums = res.data
      that.sum = res.data.order_financing
    })
    let _location = [
      {
        title: '融资',
        url: ''
      }
    ]
  },
  watch: {
    // 搜索联系人
    schfilter: function (val, oldVal) {
      this.tableData = this.tableDataOne.filter( item => (~item.business_name.indexOf(val)))
    }
  },
  methods: {
    // 按钮
    btnTop (item, index) {
      // console.log(index)
      var that = this
      that.isActiveBtn = index
      that.selStatus = item.status
    },
    showMsg: function () {
      this.dialogMsg = !this.dialogMsg
    },
    // 创建
    handleCreate (index) {
      if (this.titleList[index].url) {
        this.$router.push(this.titleList[index].url)
      }
    },
    // 切换融资类型
    handleNav (index) {
      console.log(index)
      if (index < 2) {
        this.selFinance = index
        let sums = ['order_financing', 'receivable_financing']
        this.sum = this.sums[sums[index]]
        // this.selStatus = '1'
        this.isActiveBtn = 0
      } else if (index === 4) {
        this.selFinance = index
        // this.sum = this.sums['creditor_financing']
      } else {
        this.$message('功能开发中')
      }
    },
    // 创建融资
    handleCreate () {
      let urls = ['/financing_app/order_application', 'financing_app/getting_application', '', '', 'financing_app/creditor_financing']
      this.$router.push(urls[this.selFinance])
    },
    // 更改融资状态选择
    handleChange (e) {
      this.isActiveBtn = Number(e.target.value)
      this.selStatus = this.btnName[e.target.value].status
    }
  }
}
</script>

<style scoped lang='less'>
.assets {
  height: 100%;
  .assets_board {
    margin: 0 auto;
    display: flex;
  }
  .c_slide_container:hover+.assets_content{
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .c_assets_top {
    // position: fixed;
    z-index: 8;
    background: #f5f7f8;
  }
  .assets_content {
    background: #f4f5f9;
    width: 100%;
    .assets_list {
      height: 60px;
      line-height: 60px;
      // border-bottom: 1px solid #ccc;
      box-shadow: 10px 10px 17px -3px #ddd;
      padding-left: 50px;
      background: #fff;
      img {
        margin-right: 10px;
        vertical-align: middle;
      }
      div {
        display: flex;
        height: 100%;
        align-items: center;
        div {
          font-size: 14px;
          color: #3c4046;
        }
      }
    }
    .financing_type {
      height: 60px;
      border-bottom: 1px solid #eee;
      background: #fff;
      font-size: 16px;
      box-shadow: inset 0px 4px 9px -3px #ddd;
      // box-shadow: inset -1px 2px 0 -30px #eee;
      &>ul {
        display: flex;
        height: 100%;
        padding-left: 20px;
        li {
          width: 140px;
          height: 100%;
          line-height: 60px;
          text-align: center;
          color: #666;
          // border-bottom: 2px solid #fff;
          span {
            display: block;
            height: 100%;
            width: 100px;
            // margin: 0 auto;
            cursor: pointer;
          }
        }
        li.sel {
          color: #eb6100;
          span {
            color: #eb6100;
            border-bottom: 2px solid #eb6100;
          }
        }
      }
    }
    .slide_nav {
      margin: 20px;
      margin-right: 0;
      ul {
        display: flex;
        // margin-left: 45px;
        li {
          width: 100% / 3;
          color:#333;
          .dash_board{
            height: 100%;
            margin-right: 20px;
            padding: 40px 30px 0 30px;
            background: #fff;
            box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.2);
            .board_title {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 1px solid #ddd;
              div {
                p:first-child {
                  color: #888;
                  font-size: 14px;
                }
                p:last-child {
                  font-size: 28px;
                  color: #333;
                  margin: 20px 0 25px 0;
                }
              }
            }
            &>p {
              padding: 15px 0;
              font-size: 14px;
              color: #333;
              span:first-child {
                color: #888;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
    .c_assets_bottom{
      margin: 0 20px;
      // margin-top: 360px;
      // 表格
      .table_list {
        background:#ffffff;
        width:100%;
        height:auto;
        .top {
          height: 54px;
          padding: 0 30px;
          display: flex;
          align-items: center;
          &>button {
            width: 96px;
            height: 32px;
            text-align: center;
            outline: none;
            border: none;
            transition: all 0.1s ease-in;
            background: #eb6100;
            color: #fff;
            border: 1px solid #eb6100;
            margin-right: 30px;
            box-shadow:0px 2px 5px 1px rgba(235, 164, 97, 0.35);
          }
          &>button:hover {
            color: #fff;
            background: #eb6100;
          }
          .left {
            button {
              background:none;
              border:1px solid #eb6100;
              color: #ea6100;
              margin-right: 22px;
              outline: none;
              border-radius:2px;
              width:100px;
              height:30px;
            }
            button:hover {
              background: #eb6100;
              color: #fff;
            }
            .select {
              select {
                width:100px;
                height:32px;
                padding: 0 6px;
                line-height: 32px;
                background:none;
                border:1px solid #dcdcdc;
                text-align: center;
                color: #666;
                outline: none;
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                background: url('../../../static/img/icon/down.png') 78px center no-repeat;
                span {
                  color: #666;
                  cursor: pointer;
                }

              }
            }
            .activeBtn {
              background: #eb6100;
              color: #fff;
            }
          }
        }
      }
      &>ul {
        display: flex;
        background: #fff;
        li {
          width: 25%;
          padding:15px 25px;
          font-size: 14px;
          padding-right: 0;
          .type_title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 52px;
            padding-right: 25px;
            span:first-child {
              color: #666;
              font-size: 16px;
              font-weight: bold;
            }
            span:last-child {
              color: #ea6100;
              text-decoration: underline;
              cursor: pointer;
              font-weight: bolder;
            }
          }
          div:last-child {
            line-height: 85px;
            font-size: 20px;
            font-weight: bolder;
            color: #333;
            border-right: 1px dashed #e1e6f0;
            padding-left: 40px;
          }
        }
      }
    }
    .show_financing_list {
      padding: 0 20px;
      background: #f5f7f8;
      // overflow-x: scroll;
      // background: #f5f7f8;
    }
  }
}
</style>
