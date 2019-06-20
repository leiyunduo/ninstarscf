<template>
  <div id="myClaims">
    <div class="my_claims" @click="handlehide($event)">
      <!-- <appNav :father="{selIndex: 2}" type="1"></appNav> -->
      <div class="my_claims_list">
        <!-- <div class="navs">
          <h3><img src="../../../../static/img/leftbar/myzhaiq.png" alt="">我的债权</h3>
        </div> -->
        <div class="list_content">
          <div class="top_list" :style="handleWidth()">
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
                    <span>{{totalList.current.overdue_rate}}%</span>
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
                    <span>放款总额</span>
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
                    <span>{{totalList.history.overdue_rate}}%</span>
                    <span>逾期比率</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{totalList.history.bad_debt_count}}笔</span>
                    <span>累计坏账</span>
                  </div>
                  <div>
                    <span>{{totalList.history.bad_debt_rate}}%</span>
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
            <li v-for="(item, index) in types" :key='index' :class='index === selType ? "sel":""' @click="selType = index">{{item}}</li>
          </ul>
          <div class="content">
            <div class="button_list">
              <div class="left">
                <button v-for="(item, index) in btnName" @click="handleState(index)" :class="{btn_class: btnClass === index}" :key="index">{{item}}</button>
              </div>
            </div>
            <div class="content_list">
              <application :selStatus='selStatus' v-if="selType === 0" />
              <applicationR :selStatus='selStatus' v-if="selType === 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '../../financing/financingManege'
import application from '../myFund/base/index_tab/table_tab_application'
import applicationR from '../myFund/base/index_tab/table_tab_application_r'
export default {
  name: 'myClaims',
  components: {
    // AppNav, 
    applicationR, application
  },
  data () {
    return {
      total: '',
      btnName: ['赔付申请', '我的债权池', '赔付中', '已还款'],
      btnClass: 0,
      totalList: {current: {}, history: {}},
      selStatus: '3',
      selType: 0,
      types: ['订单融资', '应收融资']
    }
  },
  mounted() {
    const that = this
    that.$ajax.get('/api/financing/application/fund_claims_summary/').then(res => {
      that.totalList = res.data
    })
  },
  methods: {
    handlehide (e) {
      if (e.target.className === 'content' || e.target.className === 'content_list') {
        let showTabs = document.getElementsByClassName('show_tab')
        let showSection = document.getElementsByClassName('show_section')
        if (showTabs.length !== 0) {
          this.$children[1].showNumber = null
          for (let index = 0; index < showSection.length; index++) {
            showSection[index].style.background = '#fff'
            showSection[index].style.color = '#666'
          }
          // console.log(document.getElementsByClassName('assets_board')[0])
          document.getElementsByClassName('my_claims')[0].style.height = '100%'
        }
      }
    },
    handleState (index) {
      this.btnClass = index
      let stateList = {
        '0': '3',
        '1': '4,6',
        '2': '4',
        '3': '9'
      }
      this.selStatus = stateList[index]
    },
    showMsg: function () {
      this.dialogMsg = !this.dialogMsg
    },
    // 赔付申请
    applyClick () {
      window.open('#/myFundList')
    },
    handleWidth () {
      // console.log(document.body.clientWidth)
      let w = document.body.clientWidth - 160 + 'px'
      return `width: ${w}`
    }
  }
}
</script>

<style lang="less" scoped>
#myClaims {
  //padding-top: 70px;
  display: flex;
  min-height: 100%;
  background: #f7f7f7;
  width: 100%;
  .my_claims {
    height: 100vh;
    // width: 100%;
    display: flex;
    .my_claims_list {
      // width: 100%;
      .navs {
        height: 60px;
        border-bottom: 1px solid #ccc;
        // margin-bottom: 20px;
        padding: 0 35px;
        background: #fff;
        h3 {
          float: left;
          height: 60px;
          padding-top: 15px;
          font-family:PingFangSC-Medium;
          font-size:18px;
          color:#333;
          letter-spacing:0;
          img {
            margin: 5px 15px 0;
            float: left;
          }
        }
      }
      .list_content {
        padding: 20px;
        // width: 100%;
        background: #f3f4f5;
        // 头部表格
        .top_list {
          display: flex;
          justify-content: space-between;
          &>div {
            background: #fff;
            border: 1px solid #e1e6f0;
            .board_title {
              color: #eb6100;
              height: 48px;
              padding: 0 20px;
              display: flex;
              align-items: center;
              div {
                width: 30px;
                height: 30px;
                background: #eb6100;
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
            width: 36%;
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
                    // font-weight: bold;
                  }
                }
              }
              li:first-child {
                border-right: 1px dashed #e1e6f0;
              }
            }
          }
          .get_sum {
            width: 60%;
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
                    // font-weight: bold;
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
        .content {
          // width: 100%;
          // margin-top: 20px;
          height: auto;
          background: #fff;
          border: 1px solid #eaeaea;
          border-radius: 2px;
          padding: 0 30px 20px;
          // max-width: 1300px;
          .button_list {
            height: 50px;
            margin-bottom: 30px;
            .left {
              button {
                width: 100px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #eb6100;
                color: #eb6100;
                border-radius: 4px;
                background: none;
                margin-right: 35px;
                margin-top: 20px;
                outline: none;
              }
              button:hover {
                background: #eb6100;
                color: #fff;
              }
              .btn_class {
                background: #eb6100;
                color: #fff;
              }
            }
            .right {
              flex: 1;
              height: 50px;
              text-align: right;
              button {
                height: 30px;
                width: 118px;
                border-radius: 30px;
                outline: none;
                background: #fff1e8;
                border: 1px solid #eb6100;
                color: #eb6100;
                text-align: center;
                margin-top: 20px;
              }
              // button:hover {
              //   background: #ec6941;
              //   color: #fff;
              // }
              .person {
                display: inline-block;
                position: relative;
                button {
                  background: #ec6941;
                  color: #fff;
                  margin-left: 3px;
                }
                span {
                  width: 20px;
                  height: 20px;
                  font-size: 12px;
                  color: #fff;
                  background: #e60012;
                  border-radius: 50%;
                  position: absolute;
                  right: 0;
                  top: 10px;
                  text-align: center;
                  line-height: 20px;
                }
              }
            }
          }
          .content_list {
            width: 100%;
            height: auto;
            padding: 0 30px 0 24px;
            background: #fff;
            .help_nav {
              display: flex;
              flex-direction: row;
              button {
                height: 30px;
                width: 118px;
                border-radius: 30px;
                outline: none;
                background: none;
                border: none;
                color: #333;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              button:hover {
                background: none;
                border: none;
                color: #eb6100;
              }
              .btn_class {
                background: none;
                border: none;
                color: #eb6100;
              }
            }
            .help_list {
              border: 1px solid #eaeaea;
              height: auto;
              margin-bottom: 30px;
              .help_header {
                height: 50px;
                width: 100%;
                background: #f9f9f9;
                line-height: 50px;
                // border-bottom: 1px solid #eaeaea;
                .left {
                  float: left;
                  ul {
                    display: flex;
                    flex-direction: row;
                    li {
                      padding: 0 25px 0 15px;
                      color: #666;
                      font-size: 14px;
                      span:last-child {
                        text-decoration: underline;
                        color: #eb6100;
                        cursor: pointer;
                        font-weight: bold;
                      }
                    }
                    .unline {
                      color: #eb6100;
                      font-weight: bolder;
                    }
                  }
                }
                .right {
                  float: right;
                  ul {
                    display: flex;
                    flex-direction: row;
                    li {
                      padding: 0 15px 0 25px;
                      color: #eb6100;
                      text-decoration: underline;
                      cursor: pointer;
                      font-size: 14px;
                    }
                  }
                }
              }
              .row_list {
                padding: 10px;
              }
              .the_help {
                padding: 0 10px 10px;
                width: 100%;
                height: auto;
                .the_list {
                  background: #f9f9f9;
                  line-height: 50px;
                  display: flex;
                  flex-direction: row;
                  height: 50px;
                  margin-bottom: 10px;
                }
                h3 {
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                  font-weight: bold;
                  padding-left: 27px;
                }
                ul {
                  display: flex;
                  flex-direction: row;
                  li {
                    font-size:12px;
                    padding-left: 50px;
                    color: #666666;
                    letter-spacing:0;
                    text-align:left;
                    font-weight: bold;
                    padding-left: 30px;
                  }
                  .red {
                    color: #e60012;
                  }
                  .nored {
                    color: #eb6100;
                    text-decoration: underline;
                    cursor: pointer;
                  }
                }
              }
              .select_list {
                padding: 0 20px 20px;
                width: 100%;
                height: auto;
                .list_assets {
                  border-top: 1px solid #eaeaea;
                  padding-top: 20px;
                  display: flex;
                  flex-direction: row;
                  .table_list {
                    width: auto;
                  }
                  h3 {
                    font-size:14px;
                    color:#333333;
                    letter-spacing:0;
                    text-align:left;
                    font-weight: bold;
                    padding-left: 20px;
                    padding-right: 30px;
                  }
                  button {
                    color: #eb6100;
                    text-decoration: underline;
                    background: none;
                    border: none;
                    outline: none;
                  }
                }
              }
            }
            .el_col_list {
              padding: 0 13px 10px 16px;
              border-right: 1px dashed #e1e6f0;
              h3 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                span:first-child {
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                  font-weight: bold;
                }
                span:last-child {
                  font-size: 14px;
                  color: #eb6100;
                  text-decoration: underline;
                  cursor: pointer;
                }
                // p {
                //   float: right;
                //   font-size:14px;
                //   span {
                //     font-family:PingFangSC-Medium;
                //     color:#333333;
                //     letter-spacing:0;
                //     text-align:left;
                //     display: inline-block;
                //     transform: scale(0.8);
                //     -webkit-transform: scale(0.8);
                //     padding-left: 5px;
                //   }
                // }
              }
              h4 {
                height: 18px;
                span {
                  font-family:PingFangSC-Regular;
                  font-size:14px;
                  color:#e87626;
                  letter-spacing:0;
                  text-align:left;
                  float: left;
                  width: 60%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  text-decoration: underline;
                }
                button {
                  float: right;
                  background:#f48537;
                  border-radius:2px;
                  width: 50px;
                  height: 20px;
                  font-family:PingFangSC-Regular;
                  font-size:8px;
                  color:#ffffff;
                  letter-spacing:0;
                  text-align:center;
                  border: none;
                  line-height: 20px;
                  outline: none;
                }
                .a {
                  font-size:8px;
                  transform: scale(0.8);
                  -webkit-transform: scale(0.8);
                }
              }
              ul {
                min-height: 120px;
                // max-width: 250px;
                li {
                  margin-top: 12px;
                  display: flex;
                  flex-direction: row;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  p {
                    font-family:PingFangSC-Regular;
                    font-size:14px;
                    color:#666666;
                    letter-spacing:0;
                    text-align:left;
                    line-height: 20px;
                    flex: 1;
                  }
                  span {
                    font-family:PingFangSC-Semibold;
                    font-size:14px;
                    color:#333333;
                    letter-spacing:0;
                    text-align:right;
                    min-width: 58px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: bold;
                  }
                }
                li.order_line {
                  display: flex;
                  flex-direction: column;
                  &>span div {
                    display: flex;
                    // padding: 0 12px;
                    justify-content: space-between;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 25px;
                    span:first-child {
                      width: 40%;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      text-align: left;
                    }
                  }
                }
                li.institution_line {
                  display: flex;
                  // line-height: 30px;
                  // margin-top: 12px;
                  justify-content: space-between;
                  span:first-child {
                    width: 70%;
                  }
                  span:last-child {
                    color: #eb6100;
                    // cursor: pointer;
                    font-weight: bolder;
                  }
                }
              }
            }
            .last_two {
              padding: 0 3px 10px 16px;
              border-right: none;
              h3 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                span:first-child {
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                  font-weight: bold;
                  min-width: 70px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                span:last-child {
                  font-size: 14px;
                  color: #eb6100;
                  text-decoration: underline;
                  cursor: pointer;
                  min-width: 50px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
            .right_no {
              border-right: none;
            }
            .block {
              margin: 30px auto;
              text-align: center;
            }
          }
        }
        .financing_type {
          height: 48px;
          display: flex;
          margin-top: 20px;
          li {
            width: 240px;
            text-align: center;
            line-height: 48px;
            cursor: pointer;
            border: 1px solid #f3f4f5;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
          }
          li.sel {
            background: #fff;
            border: 1px solid #eee;
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
