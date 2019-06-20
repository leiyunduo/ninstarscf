<template>
  <div id="myFund">
    <div class="myFunds" @click="handlehide($event)">
      <!-- <appNav :father="{selIndex: 1}" type="1"></appNav> -->
      <div class="myFund_list">
        <!-- <div class="navs">
          <h3><img src="../../../../static/img/leftbar/b.png" alt="">我的助贷</h3>
        </div> -->
        <div class="list_content">
          <ul class="financing_type">
            <li v-for="(item, index) in types" :class='index === selType ? "sel" : ""' @click="selType = index">{{item}}</li>
          </ul>
          <div class="content">
            <div class="button_list">
              <div class="left">
                <button v-for="(item, index) in btnName" @click="handleState(index)" :class="{btn_class: btnClass === index}" :key="index">{{item}}</button>
              </div>
              <!-- <div class="right">
                <div class="person">
                  <span v-if='countNum > 0'>{{countNum}}</span>
                  <button @click="applyClick">赔付申请</button>
                </div>
              </div> -->
            </div>
            <div class="content_list">
              <tableTab :selStatus='selStatus' v-if="selType === 0" />
              <tableTabR :selStatus='selStatus' v-if="selType === 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import tableTab from './base/index_tab/table_tab'
import tableTabR from './base/index_tab/table_tab_r'

export default {
  name: 'financingIndex',
  components: {
    // AppNav, 
    tableTab, tableTabR
  },
  data () {
    return {
      types: ['订单融资', '应收融资'],
      btnName: ['全部', '审核中', '助贷中', '已拒绝', '已完结'],
      btnClass: 0,
      selType: 0,
      // 赔付申请数量
      countNum: '',
      selStatus: ''
    }
  },
  created () {
    // 赔付申请个数
    const that = this
    that.$ajax.get('/api/financing/application/apply_aid_paid_count/').then(res => {
      that.countNum = res.data.count
    }).catch(err => {
      console.log(err.response)
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    handlehide (e) {
      if (e.target.className === 'content_list' || e.target.className === 'content') {
        let showTabs = document.getElementsByClassName('show_tab')
        let showSection = document.getElementsByClassName('show_section')
        console.log(showTabs)
        if (showTabs.length !== 0) {
          this.$children[1].showNumber = null
          for (let index = 0; index < showSection.length; index++) {
            showSection[index].style.background = '#fff'
            showSection[index].style.color = '#666'
          }
          document.getElementsByClassName('myFunds')[0].style.height = '100%'
        }
      }
    },
    handleState (index) {
      this.btnClass = index
      let stateList = {
        '0': '',
        '1': '0',
        '2': '1',
        '3': '2,5',
        '4': '8'
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
#myFund {
  //padding-top: 70px;
  // display: flex;
  height: 100%;
  background: #f3f4f5;
  // width: 100%;
  .myFunds {
    height: 100%;
    // width: 100%;
    display: flex;
    .myFund_list {
      // width: 100%;
      // padding-left: 60px;
      // height: 100vh;
      background: #f3f4f5;
      .navs {
        height: 60px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
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
        p {
          float: right;
          line-height: 60px;
          padding-right: 50px;
        }
      }
      .list_content {
        padding: 10px 50px 20px;
        // width: 100%;
        background: #f3f4f5;
        .content {
          // width: 100%;
          height: auto;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 2px;
          padding: 0 30px 20px;
          // max-width: 1300px;
          .button_list {
            margin-left: 24px;
            height: 50px;
            display: flex;
            flex-direction: row;
            margin-bottom: 30px;
            .left {
              flex: 3;
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
                border: none;
                color: #fff;
              }
              .btn_class {
                background: #eb6100;
                border: none;
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
  .reasons_for_refusal {
    h3 {
      font-size: 22px;
      color: #333;
      margin-bottom: 16px;
      .el-icon-info {
        color: #ef4242;
        display: inline-block;
        padding-right: 20px;
      }
    }
    div {
      textarea {
        width: 360px;
        height: 130px;
        border: 1px solid #eaeaea;
        outline: none;
        padding: 10px;
      }
    }
    button {
      width: 92px;
      height: 30px;
      outline: none;
      border: none;
      color: #fff;
      border-radius: 4px;
      margin: 16px 26px;
    }
    .ok {
      background: #eb6100;
    }
    .cancel {
      background: #d2d2d2;
    }
  }
}
</style>
