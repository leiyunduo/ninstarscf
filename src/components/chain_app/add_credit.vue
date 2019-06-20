<template>
<el-dialog :visible.sync="dialogGround" title="" width="80%" :before-close="handleClose">
  <div class="historical_add" id="window_historical_add">
    <div class="flex-add">
      <div class="top">
        <div class="show_title">
          <div class="locations">
            <!-- <img src="static/img/leftbar/mychain.png" alt="">
            <span>位置 > </span>
            <span>
              <a @click="routeClick">链式记账</a>
              <span>></span>
            </span>
            <span>历史交易数据增信</span> -->
          </div>
          <button @click="addCredit">生成PDF</button>
        </div>
      </div>
      <!-- <div class="ul_list" :class="{ul_active: scrollTop_li === true}" id="nav-container">
        <ul id="nav-box">
          <li v-for="(item, index) in listName" :class="{li_actives: li_active === index}" :key="index" @click="ulClick(index)"><span>{{item}}</span></li>
        </ul>
      </div> -->
      <div id="historical_add_credit">
        <div class="number_one" style="page-break-after:always;">
          <div class="title">
            <img src="static/logo4.jpg" alt="">
            <p>九星大数据信用增信报告</p>
          </div>
          <div class="gs">
            <ul>
              <li><p>企业名称：</p><span>{{name}}</span></li>
              <li><p>报告生成时间：</p><span>{{myDate}}</span></li>
            </ul>
          </div>
        </div>
        <!-- 自动分页 style="page-break-after:always;" -->
        <div class="list" style="page-break-after:always;">
          <h3 class="h3">企业信用信息</h3>
          <div class="content">
            <businessInformation />
          </div>
        </div>
        <div class="list" style="page-break-after:always;padding-top:20px;">
          <h3 class="h3">企业财务信息</h3>
          <div class="content">
            <financialSituation />
          </div>
        </div>
        <div id="text">
          <div class="list" style="page-break-after:always;" id="number_0">
            <h3 class="h3" id="h3_2">供应链交易信息</h3>
            <div class="content">
              <transactionStatistics :prints='prints' />
            </div>
          </div>
          <div class="list" style="page-break-after:always;" id="number_1">
            <h3 class="h3" id="h3_4">供应链交易信用概览</h3>
            <div class="content">
              <financingStatistics :prints='prints' />
            </div>
          </div>
          <div class="list" style="page-break-after:always;" id="number_3">
            <h3 class="h3" id="h3_3">融资申请与融资交易场景</h3>
            <div class="content">
              <financing />
            </div>
          </div>
          <div class="list" style="page-break-after:always;" id="number_2">
            <h3 class="h3" id="h3_5">助贷增信与贷后风险监控</h3>
            <div class="content">
              <loanAid />
            </div>
          </div>
          <div class="list" style="page-break-after:always;" id="number_3">
            <h3 class="h3" id="h3_6">供应商信用</h3>
            <div class="content">
              <!-- <supplier /> -->
              <div class="transaction_statistics">
                <div class="list">
                  <div class="list_chart order_lists">
                    <upDownCustomer :prints='prints' :type='0' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="list" style="page-break-after:always;" id="number_4">
            <h3 class="h3" id="h3_7">客户信用</h3>
            <div class="content">
              <!-- <customer /> -->
              <div class="transaction_statistics">
                <div class="list">
                  <div class="list_chart order_lists">
                    <upDownCustomer :prints='prints' :type='1' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="list" style="page-break-after:always;" id="number_5">
            <h3 class="h3" id="h3_8">风险管理</h3>
            <div class="content">
              <riskManagement :prints='prints' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</el-dialog>
</template>

<script>
const echarts = require('echarts')
// import jsPDF from 'jspdf'
// import html2canvas from 'html2canvas'
import $ from "./chain_add_credit/print.js"
// 企业信用信息
import businessInformation from './historical_transactions/business_information.vue'
// 财务信息
import financialSituation from './chain_add_credit/financial_situation.vue'
// 企业供应链交易信息
import transactionStatistics from './chain_add_credit/transaction_statistics.vue'
// 企业供应链交易信用概要
import financingStatistics from './chain_add_credit/financing_statistics.vue'
// 当前融资申请与融资交易场景
import financing from './historical_transactions/financing.vue'
// 九星平台助贷增信与贷后辅助风险监控服务
import loanAid from './chain_add_credit/loan_aid.vue'
// 供应商信用评估
// import supplier from './historical_transactions/supplier.vue'
import upDownCustomer from './chain_add_credit/transaction/up_down_customer.vue'
// 客户信用评级
// import customer from './historical_transactions/customer.vue'
// 企业风险管理报告
import riskManagement from './chain_add_credit/risk_management.vue'
export default {
  data () {
    return {
      prints: 0,
      name: '',
      myDate: '',
      company_id: '',
      actives: 0,
      li_active: 0,
      scrollTop_li: false,
      dialogGround: false,
      listName: ['供应链交易信息', '供应链交易信用概览', '融资申请与融资交易场景', '助贷增信与贷后风险监控', '供应商信用', '客户信用', '风险管理']
    }
  },
  components: {
    businessInformation,
    financialSituation,
    transactionStatistics,
    financingStatistics,
    financing,
    loanAid,
    upDownCustomer,
    riskManagement
  },
  props: {
    print: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
    var myDatea = new Date();
    that.myDate = myDatea.toLocaleString( ); 
    that.$ajax.get(`/api/company/` + that.company_id).then(res => {
      that.name = res.data.name      
    })
    // window.addEventListener('scroll', this.handleScroll)
    if (that.print.print === 1) {
      that.dialogGround = true
      // setTimeout( function() { $('#historical_add_credit').jqprint() }, 2000);
    }
  },
  watch: {
    'print.print': function (n, o) {
      this.$nextTick (() => {
        if (n === 1) {
          this.dialogGround = true
          // setTimeout( function() { $('#historical_add_credit').jqprint() }, 2000);
        } else {
          this.dialogGround = false
        }
      })
    }
  },
  methods: {
    handleClose () {
      this.dialogGround = false
      this.prints = 0
      this.$emit('listerChilds', 0)
    },
    handleScroll () {
      let that = this
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 200) {
        that.scrollTop_li = true
      } else {
        that.scrollTop_li = false
      }
      var navContainer = document.getElementById("nav-container")
      var navBox = document.getElementById("nav-box")
      var text = document.getElementById("text")
      var navBoxChild = navBox.getElementsByTagName('li')
      var textChild = text.children
      var num = navContainer.offsetTop
      var a = navContainer.offsetHeight
      //当导航与相应文档接触的时候自动切换
      for (var i = 0; i < navBoxChild.length; i++) {
        if (scrollTop + a >= textChild[i].offsetTop-200) {
          for (var j = 0; j < navBoxChild.length; j++) {
            navBoxChild[j].className = ""
          }
          navBoxChild[i].className = "li_actives"
          that.li_active = i
        }
      }
    },
    ulClick (i) {
      const that = this
      that.li_active = i
      var city_top = $('#number_' + i).offset().top-200;
      $('html,body').animate({scrollTop:city_top}, 500);
    },
    routeClick () {
      this.$router.push('/chain_app')
    },
    addCredit () {
      const that = this
      that.prints = 1
      setTimeout( function() { $('#historical_add_credit').jqprint() }, 2000);
      // html2canvas(document.querySelector("#historical_add_credit")).then(canvas => {
      //   var contentWidth = canvas.width;
      //   var contentHeight = canvas.height;
      //   //一页pdf显示html页面生成的canvas高度;
      //   var pageHeight = contentWidth / 592.28 * 841.89;
      //   //未生成pdf的html页面高度
      //   var leftHeight = contentHeight;
      //   //页面偏移
      //   var position = 0;
      //   //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      //   var imgWidth = 555.28;
      //   var imgHeight = 555.28/contentWidth * contentHeight;
      //   var pageData = canvas.toDataURL('image/jpeg', 1.0);
      //   var pdf = new jsPDF('', 'pt', 'a4');

      //   //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //   //当内容未超过pdf一页显示的范围，无需分页
      //   if (leftHeight < pageHeight) {
      //     pdf.addImage(pageData, 'JPEG', 20, 20, imgWidth, imgHeight );
      //   } else {
      //     while(leftHeight > 0) {
      //       pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
      //       leftHeight -= pageHeight;
      //       position -= 841.89;
      //       //避免添加空白页
      //       if(leftHeight > 0) {
      //         pdf.addPage();
      //       }
      //     }
      //   }
      //   pdf.save('111.pdf');
      // })
    }
  }
}
</script>

<style lang="less" scope>
@media print {
  @page 
  {
    size: auto;   /* auto is the current printer page size */
    // margin: 0 30px;  /* this affects the margin in the printer settings */
  }
  body 
  {
    font-size: 12px;
    // margin: 0px;  /* the margin on the content before printing */
  }
  .historical_add {
    display: block;
  }
  #historical_add_credit {
    padding: 10px;
    .none_diaplay {
      display: block;
    }
    .top_header {
      text-align: center;
      margin: 20px auto;
      height: 48px;
      display: table-header-group;
      p {
        text-align: center;
        font-size: 38px;
        font-weight: 900;
      }
    }
    .number_one {
      text-align: center;
      display: block;
      .title {
        margin: 200px auto;
        img {
          width: 150px;
          height: 150px;
        }
        p {
          padding-top: 20px;
          font-size: 58px;
        }
      }
      .gs {
        text-align: center;
        margin: 50px auto;
        width: 700px;
        height: 300px;
        ul {
          height: 300px;
          li {
            height: 80px;
            display: block;
            p {
              float: left;
              width: 186px;
              text-align: left;
            }
            span {
              float: left;
            }
          }
        }
        p {
          font-size: 22px;
          color: #333;
        }
        span {
          font-size: 22px;
          color: #999;
        }
      }
    }
    .list {
      display: block;
      .h3 {
        height: 34px;
        line-height: 34px;
        font-size: 24px;
        margin: 20px 0;
        color: #eb6100;
        font-weight: 900;
        // border-left: 5px solid #eb6100;
      }
    }
  }
}
.historical_add {
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 20px 40px 0;
  margin: 30px;
  // float: left;
  .ul_active {
    position: fixed;
    top: 66px;
  }
  .ul_list {
    z-index: 999;
    height: 60px;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    ul {
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #e7ebee;
      li {
        box-sizing: border-box;
        float: left;
        text-align: center;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 10px;
        color: #333;
        cursor: pointer;
        height: 60px;
        line-height: 60px;
      }
      .li_actives {
        border-bottom: 2px solid #eb6100;
        color: #eb6100;
      }
    }
  }
  .show_title {
    line-height: 60px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    position: relative;
    img {
      vertical-align: middle;
      margin-right: 10px;
    }
    a {
      cursor: pointer;
    }
    span {
      color: #343536;
    }
    .locations {
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      img{
        margin-right: 10px;
        vertical-align: middle;
      }
      span {
        line-height: 60px;
        color: #343536;
        a {
          color: #343536;
          text-decoration: none;
        }
      }
      &>span:last-child {
        color :#eb6100;
      }
      // &>span:first-child>a {
      //   color :#343536;
      // }
    }
    button {
      position: absolute;
      right: 50px;
      bottom: 10px;
      width: auto;
      padding: 0 20px;
      height: 32px;
      border: none;
      background: #eb6100;
      color: #fff;
      border-radius: 4px;
      outline: none;
    }
  }
  .flex-add {
    flex: 1;
  }
  #historical_add_credit {
    padding: 10px;
    .none_diaplay {
      display: none;
    }
    .top_header {
      text-align: center;
      margin: 20px auto;
      height: 48px;
      display: table-header-group;
      p {
        text-align: center;
        font-size: 38px;
        font-weight: 900;
      }
    }
    .number_one {
      text-align: center;
      display: none;
      .title {
        margin: 200px auto;
        img {
          width: 150px;
          height: 150px;
        }
        p {
          padding-top: 20px;
          font-size: 58px;
        }
      }
      .gs {
        text-align: center;
        margin: 50px auto;
        width: 500px;
        height: 300px;
        ul {
          height: 300px;
          li {
            height: 80px;
            display: block;
            p {
              float: left;
              width: 186px;
              text-align: left;
            }
            span {
              float: left;
            }
          }
        }
        p {
          font-size: 22px;
          color: #333;
        }
        span {
          font-size: 22px;
          color: #999;
        }
      }
    }
    .showHide {
      display: block;
    }
    .list {
      .content {
        // min-height: 200px;
      }
      .h3 {
        height: 34px;
        line-height: 34px;
        font-size: 24px;
        margin: 15px 0;
        color: #eb6100;
        font-weight: 900;
      }
    }
  }
}
</style>
