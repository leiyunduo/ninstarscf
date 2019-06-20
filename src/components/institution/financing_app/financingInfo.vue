<template>
  <div class='assets'>
    <div class='assets_board'>
      <!-- <appNav :father='step' type='1'></appNav> -->
      <div class='assets_content' @click="handlehide($event)">
        <!-- 信贷统计 -->
        <!-- <div class='assets_list'>
          <h3><img src="../../../../static/img/leftbar/myxind.png" alt="">贷款审核</h3>
        </div> -->
        <div class="c_assets_bottom">
          <div class="top_list" :style='handleWidth()'>
            <ul>
              <li>
                <h3><img src="../../../../static/img/other/xd.png" alt="">融资申请</h3>
              </li>
              <li>
                <span>申请总额</span>
                <p>{{toThousands(totalList.total / 10000)}}（万元）</p>
              </li>
              <li>
                <span>申请笔数</span>
                <p>{{totalList.count}}（笔）</p>
              </li>
            </ul>
          </div>
          <ul class="financing_nav">
            <li v-for="(item, index) in typeList" :key='index' :class='index === selType ? "sel_type" : ""' @click="handleNav(index)">{{item}}</li>
          </ul>
          <!-- 订单融资 -->
          <div class='table_list'>
            <div class="top">
              <div class="left">
                <button v-for="(item, index) in btnName" :key="index" @click="btnTop(item, index)" :class="{activeBtn: isActiveBtn === index}">{{item}}</button>
              </div>
              </div>
            </div>
            <div class="bottom" v-if="selType === 0">
              <tableTab v-if="isActiveBtn === 0" />
              <risk v-if="isActiveBtn === 1" />
              <prosess v-if="isActiveBtn === 2" />
              <refuse v-if="isActiveBtn === 3" />
            </div>
            <!-- 应收融资 -->
            <div class="bottom" v-if="selType === 1">
              <tableTabR v-if="isActiveBtn === 0" />
              <riskR v-if="isActiveBtn === 1" />
              <prosessR v-if="isActiveBtn === 2" />
              <refuseR v-if="isActiveBtn === 3" />
            </div>   
          </div>
        </div>
      </div>
      <div class="shade_box" v-show="dialogMsg">
        <div class="to_display">
          <img class="closeWrap" @click="showMsg()" src="../../../../static/img/im/im1.png" alt="">
          <img src="../../../../static/img/im/to_ins.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import tableTab from '@/components/institution/financing_app/base/index_tab/table_tab'
import tableTabR from '@/components/institution/financing_app/base/index_tab/table_tab_r'
import refuse from '@/components/institution/financing_app/base/index_tab/table_tab_refuse'
import refuseR from '@/components/institution/financing_app/base/index_tab/table_tab_refuse_r'
import risk from '@/components/institution/financing_app/base/index_tab/table_tab_risk'
import riskR from '@/components/institution/financing_app/base/index_tab/table_tab_risk_r'
import prosess from '@/components/institution/financing_app/base/index_tab/table_tab_prosess'
import prosessR from '@/components/institution/financing_app/base/index_tab/table_tab_prosess_r'
// 预审中
// import application from '@/components/institution/financing_app/base/index_tab/index_tab'
// import applicationSolving from '@/components/institution/financing_app/base/index_tab/index_tab_solving'
// import prosess from '@/components/institution/financing_app/base/index_tab/index_tab_prosess'
// import refuse from '@/components/institution/financing_app/base/index_tab/index_tab_refuse'
export default {
  name: 'financingIndex',
  components: {
    // AppNav, 
    refuse, tableTab, risk, prosess,
    tableTabR, riskR, prosessR, refuseR
  },
  data () {
    return {
      // 按钮
      btnName: ['申请中', '预审通过', '审理中', '已拒绝'],
      isActiveBtn: 0,
      // 模糊查询
      schfilter: '',
      tableData: [],
      step: {selIndex: 0},
      app: '100000',
      totalList: {},
      dialogMsg: false,
      selType: 0,
      typeList: ['订单融资', '应收融资']
    }
  },
  created () {
    const that = this
    this.$ajax.get('/api/financing/loan_process/summary/').then(res => {
      if (res.status === 200) {
        that.totalList = res.data
      }
    })
    let _location = [{
      title: this.$route.meta.title,
      url: this.$route.meta.url
    }]
  },
  watch: {
    // 搜索联系人
    schfilter: function (val, oldVal) {
      this.tableData = this.tableDataOne.filter(item => (~item.business_name.indexOf(val)))
    }
  },
  methods: {
    // 按钮
    btnTop (item, index) {
      var that = this
      that.isActiveBtn = index
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
    handlehide (e) {
      if (e.target.className === 'assets_content') {
        let showTabs = document.getElementsByClassName('show_tab')
        let showSection = document.getElementsByClassName('show_section')
        if (showTabs.length !== 0) {
          this.$children[1].showNumber = null
          for (let index = 0; index < showSection.length; index++) {
            showSection[index].style.background = '#fff'
            showSection[index].style.color = '#666'
          }
          // document.getElementsByClassName('assets_board')[0].style.height = '100%'
        }
      }
      // console.log()
    },
    handleNav (index) {
      this.selType = index
    },
    showMsg: function () {
      this.dialogMsg = !this.dialogMsg
    },
    handleWidth () {
      // console.log(document.body.clientWidth)
      let w = document.body.clientWidth - 160 + 'px'
      return `width: ${w}`
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
    background: rgba(0,0,0,0.50);
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
    display: flex;
    height: 100%;
  }
  .c_slide_container:hover+.assets_content{
    min-width: calc(100% - 220px);
    // width: 100%;
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .assets_content {
    // min-width: 100%;
    // width: 100%;
    // padding-left: 60px;
    background: #f5f7f8;
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
      min-height: 925px;
      padding-bottom: 20px;
      background: #f5f7f8;
      // 头部表格
      .top_list {
        background:#ffffff;
        border:1px solid #e1e6f0;
        height:88px;
        border-radius: 6px 6px 0 0;
        border-top: 6px solid #eb6100;
        ul {
          display: flex;
          flex-direction: row;
          li {
            width: 33%;
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
          li:first-child {
            border: none;
          }
        }
      }
      .financing_nav {
        margin-top: 15px;
        // background: #fff;
        display: flex;
        // border-bottom: 1px solid #e1e6f0;
        li {
          width: 240px;
          height: 45px;
          text-align: center;
          line-height: 45px;
          color: #666;
          cursor: pointer;
          font-size: 14px;
        }
        li.sel_type {
          border:1px solid #e1e6f0;
          border-bottom: none;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background: #fff;
          color: #eb6100;
        }
      }
      // 表格
      .table_list {
        background:#ffffff;
        border:1px solid #e1e6f0;
        // border-radius:4px;
        width:100%;
        height:auto;
        border-top: none;
        // margin-top: 15px;
        .top {
          padding: 20px 0;
          // height: 50px;
          overflow: hidden;
          .left {
            float: left;
            margin-left: 32px;
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
            button::-moz-focus-inner {
              outline: none;
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
            padding-right: 21px;
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
          background:#ffffff;
          padding: 0 32px 21px;
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
      // &>ul {
      //   display: flex;
      //   background: #fff;
      //   li {
      //     width: 25%;
      //     padding:15px 25px;
      //     font-size: 14px;
      //     padding-right: 0;
      //     .type_title {
      //       display: flex;
      //       justify-content: space-between;
      //       align-items: center;
      //       height: 52px;
      //       padding-right: 25px;
      //       span:first-child {
      //         color: #666;
      //         font-size: 16px;
      //         font-weight: bold;
      //       }
      //       span:last-child {
      //         color: #ea6100;
      //         text-decoration: underline;
      //         cursor: pointer;
      //       }
      //     }
      //     div:last-child {
      //       line-height: 85px;
      //       font-size: 20px;
      //       font-weight: bolder;
      //       color: #333;
      //       border-right: 1px dashed #e1e6f0;
      //       padding-left: 40px;
      //     }
      //   }
      // }
    }
    .show_financing_list {
      padding: 0 50px;
      // background: #f5f7f8;
    }
  }
}
</style>
