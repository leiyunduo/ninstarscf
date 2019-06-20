<template>
  <div class='assets'>
    <div class='assets_board'>
      <!-- <appNav :father='step' type='1'></appNav> -->
      <div class='assets_content' @click="handleHide($event)">
        <!-- 信贷统计 -->
        <!-- <div class='assets_list'>
          <h3><img src="../../../../static/img/leftbar/myxind.png" alt="">贷款管理</h3>
        </div> -->
        <div class="c_assets_bottom">
          <div class="top_list" :style='handleWidth()'>
            <div class="get_current">
              <div class="board_title">
                <div>
                  <img src="../../../../static/img/leftbar/myxind-2.png" alt="">
                </div>
                <span>当前债权</span>
              </div>
              <ul v-if="totalList.current">
                <li>
                  <div>
                    <span>{{toThousands(totalList.current.total / 10000)}}（万元）</span>
                    <span>债权总额</span>
                  </div>
                  <div>
                    <span>{{totalList.current.count}}笔</span>
                    <span>共计笔数</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{totalList.current.overdue_count}}笔</span>
                    <span>当前逾期</span>
                  </div>
                  <div>
                    <span>{{handleRate(totalList.current.overdue_rate)}}</span>
                    <span>逾期比率</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="get_sum">
              <div class="board_title">
                <div>
                  <img src="../../../../static/img/leftbar/myxind-2.png" alt="">
                </div>
                <span>累计放款</span>
              </div>
              <ul v-if="totalList.history">
                <li>
                  <div>
                    <span>{{toThousands(totalList.history.total / 10000)}}（万元）</span>
                    <span>债权总额</span>
                  </div>
                  <div>
                    <span>{{totalList.history.count}}笔</span>
                    <span>共计笔数</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{totalList.history.overdue_count}}笔</span>
                    <span>累计逾期</span>
                  </div>
                  <div>
                    <span>{{handleRate(totalList.history.overdue_rate)}}</span>
                    <span>逾期比率</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{totalList.history.bad_debt_count}}笔</span>
                    <span>累计坏账</span>
                  </div>
                  <div>
                    <span>{{handleRate(totalList.history.bad_debt_rate)}}</span>
                    <span>坏账比率</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{totalList.history.business_count}}家</span>
                    <span>融资企业</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <ul class="financing_type">
            <li v-for="(nav, index) in navs" :key='index' :class='index === selFinance ? "sel_type" : ""' @click="selFinance = index">{{nav}}</li>
          </ul>
          <div class='table_list' v-if="selFinance === 0">
            <div class="top">
              <div class="left">
                <button v-for="(item, index) in btnName" :key="index" @click="btnTop(item, index)" :class="{activeBtn: isActiveBtn === index}">{{item}}</button>
              </div>
            </div>
            <div class="bottom">
              <debt v-if="isActiveBtn === 0"/>
              <debtEnd v-if="isActiveBtn === 1" />
            </div>
          </div>
          <div class='table_list' v-if="selFinance === 1">
            <div class="top">
              <div class="left">
                <button v-for="(item, index) in btnName" :key="index" @click="btnTop(item, index)" :class="{activeBtn: isActiveBtn === index}">{{item}}</button>
              </div>
            </div>
            <div class="bottom">
              <debtR v-if="isActiveBtn === 0"/>
              <debtEndR v-if="isActiveBtn === 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debt from './base/index_tab/index_tab_debt'
import debtR from './base/index_tab/index_tab_debt_r'
import debtEnd from './base/index_tab/index_tab_debtend'
import debtEndR from './base/index_tab/index_tab_debtend_r'
export default {
  name: 'debtInfo',
  components: {
    debt, debtEnd, debtR, debtEndR
  },
  data () {
    return {
      // 按钮
      btnName: ['未还贷', '已还贷'],
      isActiveBtn: 0,
      tableData: [],
      step: {selIndex: 1},
      totalList: {current: {}, history: {}},
      navs: ['订单融资', '应收融资'],
      selFinance: 0
    }
  },
  created () {
    const that = this
    this.$ajax.get('/api/financing/loan_process/claims_summary/').then(res => {
      if (res.status === 200) {
        that.totalList = res.data
      }
    })

    let _location = [{
      title: this.$route.meta.title,
      url: this.$route.meta.url
    }]
  },
  methods: {
    // 按钮
    btnTop (item, index) {
      var that = this
      that.isActiveBtn = index
    },
    handleWidth () {
      // console.log(document.body.clientWidth)
      let w = document.body.clientWidth - 160 + 'px'
      return `width: ${w}`
    },
    handleHide (e) {
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
    },
    handleRate (num) {
      if (num) {
        return (num * 100).toFixed(2) + '%'
      } else {
        return '0%'
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
  .assets_board {
    margin: 0 auto;
    display: flex;
    // height: 100vh;
  }
  .c_slide_container:hover+.assets_content{
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .assets_content {
    // padding-left: 60px;
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
      min-height: 925px;
      padding-bottom: 20px;
      background: #f5f7f8;
      // 头部表格
      .top_list {
        display: flex;
        justify-content: space-between;
        &>div {
          background: #fff;
          border: 1px solid #e1e6f0;
          border-radius: 6px 6px 0 0;
          border-top: 6px solid #eb6100;
          .board_title {
            color: #eb6100;
            height: 48px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            div {
              width: 30px;
              height: 30px;
              background: #e87626;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 16px;
                // height: 22px;
              }
            }
            span {
              font-weight: bolder;
              margin-left: 8px;
            }
          }
        }
        .get_current {
          width: 37%;
          ul {
            display: flex;
            padding: 10px 0;
            li {
              display: flex;
              width: 50%;
              div {
                width: 50%;
                span {
                  display: block;
                  text-align: center;
                }
                span:first-child {
                  line-height: 36px;
                  font-weight: bold;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                span:last-child {
                  line-height: 32px;
                  font-size: 14px;
                  color: #eb6100;
                  font-weight: bold;
                }
              }
            }
            li:first-child {
              border-right: 1px dashed #e1e6f0;
            }
          }
        }
        .get_sum {
          width: 61%;
          ul {
            display: flex;
            padding: 10px 0;
            li {
              display: flex;
              border-right: 1px dashed #e1e6f0;
              width: 28.8%;
              div {
                width: 50%;
                span {
                  display: block;
                  text-align: center;
                }
                span:first-child {
                  line-height: 36px;
                  font-weight: bold;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                span:last-child {
                  line-height: 32px;
                  font-size: 14px;
                  color: #eb6100;
                  font-weight: bold;
                }
              }
            }
            li:last-child {
              width: 14.5%;
              border: none;
              div {
                width: 100%;
              }
            }
          }
        }
      }
      // 融资分类导航
      .financing_type {
        margin-top: 15px;
        background: none;
        display: flex;
        // border-bottom: 1px solid #e1e6f0;
        li {
          padding: 0;
          width: 240px;
          height: 45px;
          text-align: center;
          line-height: 45px;
          color: #666;
          cursor: pointer;
        }
        li.sel_type {
          // border:1px solid #e1e6f0;
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
        // border:1px solid #e1e6f0;
        // border-radius:4px;
        width:100%;
        height:auto;
        // margin-top: 15px;
        .top {
          padding-top: 13px;
          height: 56px;
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
