<template>
  <div class='assets'>
    <div class='assets_board'>
      <!-- <appNav :father='step' type='1'></appNav> -->
      <div class='assets_content'>
        <!-- 信贷统计 -->
        <div class='assets_list'>
          <h3><img src="../../../static/img/leftbar/myxind.png" alt="">我的融资</h3>
        </div>
        <!-- <div class="c_assets_bottom" v-if="false">
          <div class="top_list">
            <ul>
              <li>
                <h3><img src="../../../static/img/other/xd.png" alt="">融资申请</h3>
              </li>
              <li>
                <span>申请总额</span>
                <p>{{toThousands(totalList.credit_intention_value)}}（元）</p>
              </li>
              <li>
                <span>申请笔数</span>
                <p>{{totalList.credit_intention_num}}（笔）</p>
              </li>
            </ul>
          </div>
          <div class='table_list'>
            <div class="top">
              <div class="left">
                <button v-for="(item, index) in btnName" :key="index" @click="btnTop(item, index)" :class="{activeBtn: isActiveBtn === index}">{{item}}</button>
              </div>
              <div class="right">
                <div class="search-linkman">
                  <img src="../../../static/img/im/im8.png" alt="">
                  <input type="text" v-model="schfilter" class="search-input">
                </div>
                <div class="search_last">
                  <select v-model="selectName">
                    <option value="0">全部</option>
                    <option value="1">应收融资</option>
                    <option value="2">订单融资</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="bottom" v-if="showTable === 1">
              <assets-List />
            </div>
            <div class="bottom_no" v-if="showTable === 0">暂无数据</div>
          </div>
        </div> -->
        <div class="c_assets_bottom">
          <p>
            <span>我的融资申请</span>
            <span>{{toThousands(sum / 10000)}}</span>
            <span>（万元）</span>
          </p>
          <ul>
            <li v-for='(item, index) in titleList' :key='index'>
              <div class="type_title">
                <span>{{item.title}}</span>
                <span @click="handleCreate(index)">{{item.href}}</span>
              </div>
              <div>{{toThousands(item.value / 10000)}}（万元）</div>
            </li>
          </ul>
          <div class='table_list'>
            <div class="top">
              <div class="left">
                <button v-for="(item, index) in btnName" :key="index" @click="btnTop(item, index)" :class="{activeBtn: isActiveBtn === index}">{{item}}</button>
              </div>
              <div class="right">
                <div class="search-linkman">
                  <img src="../../../static/img/im/im8.png" alt="">
                  <input type="text" v-model="schfilter" class="search-input">
                </div>
                <div class="search_last">
                  <!-- <img src="../../../static/img/im/im8.png" alt="">
                  <input type="text" v-model="schfilter" class="search-input"> -->
                  <select v-model="selectName">
                    <option value="2">订单融资</option>
                    <option value="1">应收融资</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="show_financing_list">
          <application :selType='selectName' v-if="isActiveBtn === 0" />
          <applicationSolving :selType='selectName' v-if="isActiveBtn === 1" />
          <refuse :selType='selectName' v-if="isActiveBtn === 2" />
          <finish :selType='selectName' v-if="isActiveBtn === 3" />
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
// 申请中
import application from './base/index_tab/index_tab'
// 进行中
import applicationSolving from './base/index_tab/index_tab_solving'
// 已经拒
import refuse from './base/index_tab/index_tab_refuse'
// 已完成
import finish from './base/index_tab/index_tab_finish'

export default {
  name: 'financingIndex',
  components: {
    // AppNav, 
    application, applicationSolving, refuse, finish
  },
  data () {
    return {
      // 按钮
      btnName: ['申请中', '处理中', '已拒绝', '已完成'],
      isActiveBtn: 0,
      // 模糊查询
      schfilter: '',
      tableData: [],
      // 筛选
      selectName: '2',
      // 数据显示
      activeItem: 'applyIn',
      step: {selIndex: 3},
      total: '1',
      backupList: {},
      app: '100000',
      totalList: {
        credit_intention_num: 0,
        credit_intention_value: 0,
        over_num: 0,
        over_value: 0,
        released_num: 0,
        released_value: 0
      },
      tableList: [],
      loan_type: 0,
      dialogMsg: false,
      sum: '',
      titleList: [
        {title: '我的应收池', href: '应收融资申请', url: '', value: ''},
        {title: '我的应付池', href: '订单融资申请', url: '/financing_app/order_application', value: ''},
        {title: '我的存货/存单池', href: '存货融资申请', url: '', value: '0'},
        {title: '贸易融资', href: '贸易融资申请', url: '', value: '0'}
      ]
    }
  },
  created () {
    const that = this
    this.$ajax.get('/api/financing/application/total/').then(res => {
      if (res.status === 200) {
        this.sum = res.data.total
      }
    })
    this.$ajax.get('/api/financing/application/payable_receivable/').then(res => {
      if (res.status === 200) {
        let titleList = that.titleList
        titleList[0].value = res.data.receivable
        titleList[1].value = res.data.payable
      }
    })
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
      that.selectName = '2'
      that.schfilter = ''
      // if (index === 0) {
      //   this.$ajax.post('/api/institution_application_list/', {loan_type: '1', token: this.$token()}).then(res => {
      //     res.data.financing_list.forEach(val => {
      //       val.financing_type === 'order' ? val.show_type = '订单融资' : val.show_type = '应收融资'
      //       val.slide = 0
      //     })
      //     this.tableData = res.data.financing_list
      //     this.tableDataOne = res.data.financing_list
      //     this.tableData.length === 0 ? this.showTable = 0 : this.showTable = 1
      //   })
      // } else if (index === 1) {
      //   this.$ajax.post('/api/institution_application_list/', {loan_type: '2', token: this.$token()}).then(res => {
      //     res.data.financing_list.forEach(val => {
      //       val.financing_type === 'order' ? val.show_type = '订单融资' : val.show_type = '应收融资'
      //       val.slide = 0
      //     })
      //     this.tableData = res.data.financing_list
      //     this.tableDataOne = res.data.financing_list
      //     this.tableData.length === 0 ? this.showTable = 0 : this.showTable = 1
      //   })
      // } else if (index === 2) {
      //   this.$ajax.post('/api/institution_application_list/', {loan_type: '4', token: this.$token()}).then(res => {
      //     res.data.financing_list.forEach(val => {
      //       val.financing_type === 'order' ? val.show_type = '订单融资' : val.show_type = '应收融资'
      //       val.slide = 0
      //     })
      //     this.tableData = res.data.financing_list
      //     this.tableDataOne = res.data.financing_list
      //     this.tableData.length === 0 ? this.showTable = 0 : this.showTable = 1
      //   })
      // }
    },
    // 筛选
    // selectSearch () {
    //   var that = this
    //   if (that.selectName === '0') {
    //     this.tableData = this.tableDataOne
    //   } else if (that.selectName === '1') {
    //     this.tableData = this.tableDataOne.filter( item => (item.financing_type === 'receivable'))
    //   } else if (that.selectName === '2') {
    //     this.tableData = this.tableDataOne.filter( item => (item.financing_type === 'order'))
    //   }
    // },
    showMsg: function () {
      this.dialogMsg = !this.dialogMsg
    },
    // 创建
    handleCreate (index) {
      if (this.titleList[index].url) {
        this.$router.push(this.titleList[index].url)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.assets {
  height: 100%;
  .shade_box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.50);
    z-index: 2999;
    .to_display {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .closeWrap{
        position: absolute;
        top: 34px;
        right: 35px;
      }
    }
  }
  // padding-top: 120px;
  .assets_board {
    // width: 1280px;
    margin: 0 auto;
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
  }
  .c_slide_container:hover+.assets_content{
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .assets_content {
    // width: 100%;
    background: #f5f7f8;
    min-height: 100%;
    .msg_box {
      height: 40px;
      line-height: 40px;
      margin-left: 70px;
      margin-top: 20px;
      width: 200px;
      cursor: pointer;
      img {
        vertical-align: middle
      }
      span {
        font-size: 18px;
        font-weight: 700;
        color: #ea6100;
        text-decoration: underline;
        vertical-align: middle
      }
    }
    // 信贷统计
    .assets_list {
      height: 60px;
      // display: flex;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
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
    .c_assets_bottom{
      padding: 50px;
      padding-bottom: 20px;
      // 头部表格
      .top_list {
        background:#ffffff;
        border:1px solid #e1e6f0;
        width:100%;
        height:88px;
        border-radius: 6px 6px 0 0;
        border-top: 6px solid #eb6100;
        ul {
          display: flex;
          flex-direction: row;
          li {
            flex: 1;
            text-align: center;
            margin-top: 25px;
            border-left: 1px dashed #e1e6f0;
            height: 32px;
            span {
              display: inline-block;
              font-family:PingFangSC-Regular;
              font-size:16px;
              color:#eb6100;
              letter-spacing:0;
              text-align:left;
              padding-right: 18px;
            }
            p {
              display: inline-block;
              font-family:Arial-BoldMT;
              font-size:20px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              font-weight: bold;
            }
            h3 {
              display: inline-block;
              font-family:PingFangSC-Regular;
              font-size:16px;
              color:#333333;
              letter-spacing:0;
              text-align:center;
              img {
                margin-right: 23px;
                float: left;
              }
            }
          }
        }
      }
      // 表格
      .table_list {
        background:#ffffff;
        border:1px solid #e1e6f0;
        border-radius:4px;
        width:100%;
        height:auto;
        margin-top: 15px;
        .top {
          margin-top: 13px;
          height: 43px;
          .left {
            float: left;
            margin-left: 24px;
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
            .activeBtn {
              background: #eb6100;
              color: #fff;
            }
          }
          .right {
            float: right;
            .search-linkman {
              position: relative;
              float: left;
              width:150px;
              height:30px;
              margin-right: 20px;
              border-radius:2px;
              img {
                position: absolute;
                top: 9px;
                right: 9px;
              }
              input {
                outline: none;
                border:1px solid #cccccc;
                border-radius:4px;
                width:150px;
                height:30px;
                padding: 0 10px;
                font-size: 12px;
              }
              span {
                color: #fff;
                font-size: 16px;
                cursor: pointer;
              }
            }
            .search_last {
              margin-right: 71px;
              float: left;
              select {
                background:#ffffff;
                border:1px solid #cccccc;
                border-radius:4px;
                width:150px;
                height:30px;
                padding: 0 10px;
                outline: none;
              }
            }
            .right_img {
              float: left;
              margin-right: 51px;
              width: 35px;
              background:#ffffff;
              border:1px solid #cccccc;
              border-radius:2px;
              height:35px;
              text-align: center;
              padding-top: 6px;
              span {
                display: inline-block;
                text-decoration: none;
                width: 17px;
                height: 17px;
                border-radius: 50%;
                border:1px solid #666666;
                line-height: 17px;
                text-align: center;
                font-size: 12px;
                padding-left: 4px;
              }
            }
          }
        }
        .bottom {
          padding: 0 21px 21px;
        }
        .bottom_no {
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
      &>P {
        background:#ffffff;
        border-bottom:1px solid #e1e6f0;
        padding: 0 40px;
        line-height: 72px;
        width:100%;
        height:72px;
        border-radius: 6px 6px 0 0;
        border-top: 6px solid #eb6100;
        span:nth-child(2) {
          font-size: 24px;
          font-weight: bolder;
          margin-right: 3px;
          margin-left: 18px;
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
      padding: 0 50px;
      // background: #f5f7f8;
    }
  }
}
</style>
