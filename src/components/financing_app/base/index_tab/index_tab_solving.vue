<template>
  <div class="assetsList">
    <div class="bottom_list">
      <div v-for="(item, index) in showList" :key='index'>
        <div class="bottom_top">
          <div class="left">
            <p>融资类型：<span style="color: #333; font-weight: bolder">{{item.type === '0' ? '应收融资' : '订单融资'}}</span></p>
            <p>融资编号：<span class="show_id" @click="handlePic(item)">{{item.id}}</span></p>
            <p>提交时间：<span>{{item.create_time}}</span></p>
          </div>
          <div class="right">
            <!-- <button class="install">查看</button> -->
            <!-- <button class="install">拒绝申请</button> -->
          </div>
        </div>
        <div class="bottom_bottom">
          <el-row :gutter="0">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el1" v-if="item.application_data">
                <h3 v-if="item.application_data">
                  <span>申请机构</span>
                  <span></span>
                </h3>
                <div v-if="item.is_region_code && item.loan_process_info">
                  <p>
                    <span>发布类型：</span>
                    <span>区域发布</span>
                  </p>
                  <p v-if="item.loan_process_info.length === 0">
                    您的融资申请在所在区域发布，暂无金融金钩受理，请耐心等待。
                  </p>
                  <ul v-if="item.loan_process_info.length !== 0" class='institution_line'>
                    <li v-for="(loan, indexLoan) in item.loan_process_info" :key='indexLoan' class="institution_line">
                      <span>{{loan.institution_name}}</span>
                      <span @click="handleDetail(loan)">{{loan.loan_process_status_display}}</span>
                    </li>
                  </ul>
                </div>
                <div v-if="!item.is_region_code && item.loan_process_info">
                  <ul class='institution_line'>
                    <li v-for="(loan, indexLoan) in item.loan_process_info" :key='indexLoan' class="institution_line">
                      <span>{{loan.institution_name}}</span>
                      <span @click="handleDetail(loan)" style='cursor: pointer;text-decoration: underline;'>{{loan.loan_process_status_display}}</span>
                    </li>
                  </ul>                  
                </div>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el2">
                <h3>
                  <span>融资需求</span>
                  <span></span>
                </h3>
                <ul v-if="item.expect_data">
                  <li><p>金额（元）：</p><span style="color: #eb6100">{{item.expect_data.value ? toThousands(item.expect_data.value) : ''}}</span></li>
                  <li><p>希望融资时间：</p><span>{{item.expect_data.expect_loan_date}}</span></li>
                  <li><p>预计还款时间：</p><span>{{item.expect_data.expect_repayment_date}}</span></li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el3">
                <h3>
                  <span>融资用途</span>
                  <span @click="handleCheck(1, item)">查看更多</span>
                </h3>
                <ul v-if="item.application_data">
                  <li class="order_sum"><p>累计订单总额：</p><span style="color:#e87626;font-weight: bolder;">{{toThousands(handleSum(item.application_data.chain_info))}}（元）</span></li>
                  <li v-for="(el, indexChan) in item.application_data.chain_info" :key='indexChan' v-if="item.application_data.chain_info" class="order_line">
                    <p>采购项目订单：</p>
                    <span v-if="el.order" v-for="(order, i) in el.order" :key='i'>
                      <div><span style="margin-right: 12px" :title='order.name'>{{order.name}}</span><span>{{toThousands(order.amount)}}（元）</span></div>
                    </span>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el4">
                <h3>
                  <span>助贷基金</span>
                  <span></span>
                </h3>
                  <!-- <p>
                    <img src="../../../static/img/other/success.png" alt="">
                    <span>审批成功</span>
                  </p> -->
                <ul v-if="item.fund_info && item.helping_data">
                  <li><p>助贷机构：</p><span :title='item.fund_info.name'>{{item.fund_info.name}}</span></li>
                  <li><p>助贷状态：</p><span :style="'color:' + fundList[item.helping_status].color">{{item.helping_status ? fundList[item.helping_status].title : ''}}</span></li>
                  <li><p>助贷金额：</p><span>{{item.helping_data.value ? toThousands(item.helping_data.value) + '（元）' : '未填写'}}</span></li>
                  <li><p>助贷占比：</p><span>{{item.helping_data.rate ? item.helping_data.rate + '%' : '未填写'}}</span></li>
                </ul>
                <div v-if="!item.fund_info" style="color:#999; text-align: center; line-height: 130px">未选择助贷机构</div>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el5">
                <h3>
                  <span>第一还款来源</span>
                  <span @click="handleCheck(3, item)">查看更多</span>
                </h3>
                <!-- <h4><span :title="'北京九星哈哈哈'">北京九星哈哈哈</span></h4> -->
                <ul v-if="item.first_repayment && item.first_repayment[0]">
                  <li><p>项目名称：</p><span :title="item.first_repayment[0].name">{{item.first_repayment[0].name}}</span></li>
                  <li v-if="item.first_repayment[0].over_rate"><p>历史逾期率：</p><span v-if="item.first_repayment[0].over_rate.s_rate">{{(item.first_repayment[0].over_rate.s_rate.over_rate * 100).toFixed(2) + '%'}}</span></li>
                  <li><p>评级：</p><span>暂未评级</span></li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list  right_no el6">
                <h3>
                  <span>第二还款来源</span>
                  <span @click="handleCheck(4, item)">查看更多</span>
                </h3>
                <ul v-if="item.second_repayment" v-for="(sec, secIndex) in item.second_repayment" :key='secIndex'>
                  <li><p>其他应收：</p><span :title="sec.name">{{sec.name}}</span></li>
                  <li><p>销售金额：</p><span style="color:#e87626;">{{toThousands(sec.amount) + '（元）'}}</span></li>
                </ul>
                <p v-if="item.second_repayment.length === 0" style="line-height: 120px; text-align: center; color: #999;">未选择第二还款来源</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="pagenation" v-if="total > 5">
        <el-pagination
          layout="prev, pager, next"
          @current-change='handlePage'
          :total="total">
        </el-pagination>
      </div>
      <div v-if="showList.length === 0" class="null_application">暂无进行中的融资</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'application',
  data() {
    return {
      showList: [],
      total: 0,
      fundList: [
        {title: '审核中', color: '#eb6100'}, 
        {title: '助贷中', color: 'green'}, 
        {title: '已拒绝', color: '#ff0010'},
        {title: '赔付申请中', color: '#eb6100'},
        {title: '同意赔付', color: 'green'},
        {title: '拒绝赔付', color: '#ff0010'},
        {title: '还款信息确认中', color: '#eb6100'},
        {},
        {title: '无赔付助贷结束', color: 'green'},
        {title: '助贷已结束', color: 'green'}
      ]
    }
  },
  props: {
    selType: {
      type: String,
      default: '0'
    }
  },
  created () {
    this.handleAjax(1, this.selType)
  },
  methods: {
    handleAjax (page, type, page_size) {
      const that = this
      let p = page || 1
      let pz = page_size || 5
      let sy = ``
      if (type === '0') {
      } else if (type === '1') {
        sy = `&type=0`
      } else if (type === '2') {
        sy = `&type=1`
      }
      // ("0", "已中止"), ("1", "待处理"), ("2", "处理中"), ("3", "已放款"), ("4", "已结束")
      // ("0", "应收融资"), ("1", "订单融资"), ("2", "库存融资"), ("3", "贸易融资")
      this.$ajax.get(`/api/financing/application/?page=${p}&page_size=${pz}&status__in=2,3${sy}`).then(res => {
        if (res.status === 200) {
          that.showList = res.data.results
          that.total = res.data.count
        }
      })
    },
    // 格式化时间戳
    handleTime (str) {
      let time = ''
      str ? time = str.substr(0, str.indexOf('T')) : time = ''
      return time
    },
    // 求和公示
    handleSum (arr) {
      let s = 0
      if (arr) {
        arr.forEach(el => {
          el.order.forEach(val => {
            s += Number(val.amount)
          })
        })
      } else {
        s = 0
      }
      return s
    },
    // 查看各项指标详细数据
    handleCheck (i, item) {
      const URLList = ['', '/financing_app/usage', '/financing_app/loac_aid', '/financing_app/first_repayment', '/financing_app/second_repayment']
      let query = {}
      // console.log(item)
      if (i === 3) {
        query.chain_id = item.first_repayment[0].chain_id
        query.financing_application_id = item.id
      } else {
        query.financing_id = item.id
      }
      const {href} = this.$router.resolve({
        path: URLList[i],
        query
      })
      window.open(href, '_blank')
    },
    handleDetail (loan) {
      let query = {id: loan.id}
      console.log(loan)
      this.$router.push({
        path: '/financing_app/verify',
        query
      })
    },
    handlePage (e) {
      this.handleAjax(e, this.selType)
    },
    handlePic (item) {
      // console.dir(item)
      window.open('#/financing_app/view_detail?financing_id=' + item.id, '_blank')
    }
  },
  watch: {
    selType: function (nw, old) {
      this.handleAjax(1, nw)
    }
  }
}
</script>

<style lang="less" scoped>
.assetsList {
  .bottom_list {
    // background:#ffffff;
    width:100%;
    // height:224px;
    margin-bottom: 21px;
    &>div {
      margin-bottom: 20px;
      border:1px solid #e1e6f0;
      box-shadow:0 2px 10px 0 rgba(153,153,153,0.20);
      border-radius:4px;
    }
    .bottom_top {
      background:#f7f7f7;
      width:100%;
      height:41px;
      .left {
        float: left;
        padding-left: 25px;
        line-height: 41px;
        height: 41px;
        p {
          display: inline-block;
          font-family:PingFangSC-Regular;
          font-size:14px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          padding-right: 34px;
          span {
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:left;
            font-weight: bolder;
          }
          .show_id {
            cursor: pointer;
            text-decoration: underline;
            color:#eb6100;
          }
        }
      }
      .right {
        float: right;
        height: 40px;
        line-height: 40px;
        button {
          border-radius:2px;
          width: 130px;
          height: 26px;
          outline: none;
          margin-top: 7px;
          margin-right: 20px;
          border: none;
          font-size:14px;
          line-height: 26px;
        }
        .noshow {
          background:#cccccc;
          font-family:PingFangSC-Regular;
          color:#999999;
          letter-spacing:0;
        }
        .install {
          background:#e87626;
          font-family:PingFangSC-Regular;
          color:#ffffff;
          letter-spacing:0;
        }
      }
    }
    .bottom_bottom {
      padding: 10px 16px;
      background: #fff;
      min-height: 150px;
      .el_col_list {
        padding: 0 13px 10px 16px;
        border-right: 1px dashed #e1e6f0;
        // height: 154px;
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
        &>ul {
          min-height: 120px;
          li {
            margin-top: 12px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            p {
              display: inline-block;
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
            }
            span {
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
            }
          }
          li.order_line {
            &>span div {
              display: flex;
              // padding: 0 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 25px;
              margin-top: 6px;
              span:first-child {
                width: 40%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 0;
                font-weight: bolder;
              }
              span:last-child {
                width: 60%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: right;
                font-weight: bolder;
              }
            }
          }
        }
        ul.institution_line  {
          min-height: 120px;
          li{
            display: flex;
            // line-height: 30px;
            margin-top: 12px;
            justify-content: space-between;
            font-size: 14px;
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
      .el1, .el2, .el4, .el5, .el6 {
        ul {
          li {
            display: flex;
            p:first-child {
              width: 45%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:last-child {
              width: 55%;
              text-align: right;
              font-weight: bolder;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .el3 {
        .order_sum {
          display: flex;
          p:first-child {
            width: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:last-child {
            width: 60%;
            text-align: right;
            font-weight: bolder;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .el6 {
        ul {
          height: auto;
          min-height: auto;
          // border-bottom: 1px dashed #999;
        }
        ul:last-child {
          border: none;
        }
      }
      .right_no {
        border-right: none;
      }
    }
    div.pagenation {
      background: #fff;
      padding: 20px 0;
      border: none;
      box-shadow: none;
      border-radius:0px;
    }
  }
  .null_application {
    height: 200px;
    text-align: center;
    color: #999;
    background: #fff;
    line-height: 200px;
  }
}
</style>
