<template>
  <div class="all">
    <div class="list-demand">
      <h3>
        <span>贷款状况统计</span>
        <div class="select">
          <span>年统计时间（年）：</span>
          <select v-model="select_data" @change="selectChange(select_data)">
            <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
          </select>
        </div>
      </h3>
      <div class="echarts-list">
        <loanColumn :chartData='balanceData' v-if="balanceData.data1.length > 0 || balanceData.data2.length > 0 || balanceData.data3.length > 0" />
      </div>
    </div>
    <div class="list-demand">
      <h3>融资信用</h3>
      <div class="list-content">
        <div class="left"><div id="pie-month" class="show-chart"></div></div>
        <div class="right"><div id="pie-month1" class="show-chart"></div></div>
      </div>
    </div>
    <div class="list-demand">
      <h3>融资统计</h3>
      <div class="show-table">
        <div class="table-title">
          <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
        </div>
        <div class="table-line" v-for="(item, index) in showList" :key='index'>
          <div>{{item.id}}</div>
          <div>{{!item.create_time ? '未提交融资期望' : item.create_time }}</div>
          <div>{{!item.repayment_date ? '未提交融资期望' : item.repayment_date  }}</div>
          <div>{{item.repayment_status }}</div>
          <div>{{toTenThousand(item.value)}}</div>
          <div>{{toTenThousand(item.shortage)}}</div>
          <div>{{item.type === '0' ? '应收融资' : item.type === '1' ? '订单融资' : item.type === '2' ? '库存融资' : '贸易融资'}}</div>
          <div :style="!item.business_name ? 'color: #999' : ''">{{!item.business_name ? '无收款方' : item.business_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入echarts
// import echarts from 'echarts'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/lines')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
// 贷款余额情况（2018年统计）
import loanColumn from '../../administration/blog/echarts/loanColumn'
export default {
  name: 'allProperty',
  data () {
    return {
      // 贷款统计   余额
      balanceData: {
        title: '贷款状况统计',
        legend: ['新增贷款', '偿还贷款', '贷款余额'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#7498f7', 'sandybrown', '#f3655d']
      },
      lineX: [],
      lineY: [],
      showList: [],
      tableTitle: ['单号', '创建时间', '还款时间', '融资状态', '融资金额（万元）', '缺口金额（万元）', '融资类型', '收款方'],
      unit: '',
      company_id: '',
      yearDate: ['2017', '2018', '2019'],
      select_data: '2019'
    }
  },
  components: {
    loanColumn
  },
  props: ['fType', 'fid', 'bid'],
  methods: {
    handlePersent (arr, num) {
      let s = 0
      arr.forEach(val => {
        s += Number(val.value)
      })
      if (s === 0) return '0%'
      else return ((num / s) * 100).toFixed(2) + '%'
    },
    drawPie: function (data, el) {
      var that = this
      var scale = 1
      var rich = {
        yellow: {color: '#ffc72b', fontSize: 18 * scale, padding: [5, 4], align: 'center'},
        total: {color: '#ff0000', fontSize: 20 * scale, align: 'center'},
        white: {color: '#f4ac45', align: 'center', fontSize: 14 * scale, padding: [21, 0]}
      }
      let myPie = echarts.init(el)
      var pieOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        // #7498f7 蓝色 #eec557 黄色 #f3655d 红色 #44e9a7 绿色
        color: ['#7498f7', '#eec557', '#f3655d', '#44e9a7', 'sandybrown'],
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 16
        },
        legend: {
          orient: 'vertical',
          left: "20",
          bottom: 15,
          width: '100%',
          itemGap: 20,
          itemWidth: 16,
          itemHeight: 16,
          padding: [0, -1, 0, 0],
          data: that.pieName,
          textStyle: {
            fontSize: 14,
            color: 'rgba(102,102,102,1)',
          },
          formatter: function (name) {
            for (var i = 0; i < data.length; i++) {
              if (name === data[i].name) {
                if (i === 0) {
                  return '  ' + name + ': ' + Number(data[i].value) + ' 笔   ' + that.handlePersent(data, Number(data[i].value))
                } else {
                  return '  ' + name + ':        ' + Number(data[i].value) + ' 笔   ' + that.handlePersent(data, Number(data[i].value))
                }
              }
            }
          }
        },
        series: [{
          name: '',
          type: 'pie',
          radius: ['40%', '60%'],
          hoverAnimation: true,
          color: that.pieColor,
          label: {
            normal: {
              rich: rich
            }
          },
          data: data
        }]
      }
      myPie.setOption(pieOption)
    },
    toTenThousand (data) {
      var num = Number(data)
      num = num * Math.pow(10, -4)
      return this.toThousands(num)
    },
    // 年统计时间
    selectChange (item) {
      var that = this
      that.$ajax.get('/api/oth/loan_statistics/loan_value_statistics/?company_id=' + that.company_id + '&year=' + item).then(res => {
        that.balanceData.xAxis = res.data.x_axis
        that.balanceData.data1 = res.data.new_loan_data
        that.balanceData.data2 = res.data.repayment_loan_data
        that.balanceData.data3 = res.data.remainder_loan_data
      })
    },
    drawLine: function (el, x, y, params) {
      let myLine = echarts.init(el)
      var lineOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          padding: [5, 10]
        },
        legend: {
          right: 30,
          bottom: 0,
          height: '90%',
          width: '100%'
          // data: ['数额'],
        },
        animation: false,
        grid: {
          left: 60,
          bottom: 40
        },
        xAxis: {
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: ['#eaeef0'],
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eaeef0'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#787b7f'
            },
            fontFamily: 'Arial',
            fontSize: '14'
          },
          boundaryGap: false,
          splitNumber: 7,
          data: x
        },
        yAxis: {
          name: params,
          nameTextStyle: {
            color: '#eb6100'
          },
          axisLine: {
            lineStyle: {
              color: '#eaeef0'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#787b7f'
            },
            fontFamily: 'Arial',
            fontSize: '14'
          }
        },
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#639FA9'
            }
          },
          height: '80%',
          barWidth: 13,
          data: y
        }]
      }
      myLine.setOption(lineOption)
    },
    // drawPie: function (data, el) {
    //   var that = this
    //   var scale = 1
    //   var rich = {
    //     yellow: {color: '#ffc72b', fontSize: 18 * scale, padding: [5, 4], align: 'center'},
    //     total: {color: '#ff0000', fontSize: 20 * scale, align: 'center'},
    //     white: {color: '#f4ac45', align: 'center', fontSize: 14 * scale, padding: [21, 0]}
    //   }
    //   let myPie = echarts.init(el)
    //   var pieOption = {
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: '{a} <br/>{b} : {d}%'
    //     },
    //     legend: {
    //       orient: 'vertical',
    //       right: '40',
    //       top: 'center',
    //       itemGap: 30,
    //       itemWidth: 16,
    //       itemHeight: 6,
    //       padding: [0, 30, 0, 0],
    //       data: that.pieName,
    //       formatter: function (name) {
    //         for (var i = 0; i < data.length; i++) {
    //           if (name === data[i].name) {
    //             return name + '' + data[i].value
    //           }
    //         }
    //       }
    //     },
    //     series: [{
    //       name: '金额',
    //       type: 'pie',
    //       // center: [300, 130],
    //       radius: ['55%', '80%'],
    //       hoverAnimation: true,
    //       color: that.pieColor,
    //       label: {
    //         normal: {
    //           rich: rich
    //         }
    //       },
    //       data: data
    //     }]
    //   }
    //   myPie.setOption(pieOption)
    // }
  },
  mounted () {
    var that = this
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    // 融资信用
    that.$ajax.get('/api/oth/loan_statistics/loan_credit_statistics/?company_id=' + that.company_id).then(res => {
      var totalpie = []
      console.log(res.data.repayment_status)
      totalpie[0] = {value: res.data.repayment_status.advanced_paid, name: '提前还款'}
      totalpie[1] = {value: res.data.repayment_status.normal, name: '正常'}
      totalpie[2] = {value: res.data.repayment_status.overdue, name: '逾期'}
      totalpie[3] = {value: res.data.repayment_status.bad_debt, name: '坏账'}
      var pieMonth = document.getElementById('pie-month')
      this.drawPie(totalpie, pieMonth)
      var totalpie1 = []
      totalpie1[0] = {value: res.data.extended_status.extended, name: '展期交易'}
      totalpie1[1] = {value: res.data.extended_status.not_extended, name: '非展期交易'}
      var pieMonth1 = document.getElementById('pie-month1')
      this.drawPie(totalpie1, pieMonth1)
    })
    that.$ajax.get('/api/oth/loan_statistics/loan_value_statistics/?company_id=' + that.company_id).then(res => {
      that.balanceData.xAxis = res.data.x_axis
      that.balanceData.data1 = res.data.new_loan_data
      that.balanceData.data2 = res.data.repayment_loan_data
      that.balanceData.data3 = res.data.remainder_loan_data
    })
    that.$ajax.get('/api/oth/loan_statistics/loan_list/?company_id=' + that.company_id).then(res => {
      that.showList = res.data.fa_list
    })
  }
}
</script>
<style lang='less' scoped>
@import url('../icon.css');
.all {
  margin: 0 20px 20px;
  .list-demand {
    background:rgba(255,255,255,1);
    margin-bottom: 20px;
    h3 {
      display: flex;
      flex-direction: row;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height: 54px;
      padding: 0 30px;
      border-bottom: 1px solid rgba(220,220,220,1);
      span {
        flex: 1;
      }
    }
    .select {
      height: 30px;
      select {
        min-width: 150px;
        width: auto;
        height: 30px;
        background: #fff;
        border: 1px solid #cccccc;
        border-radius: 4px;
        padding: 0 10px;
        outline: none;
        cursor: pointer;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
    .echarts-list {
      margin-top: 20px;
    }
    .list-content {
      display: flex;
      flex-direction: row;
      .left,.right {
        flex: 1;
      }
    }
  }
  .show-chart {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    height: 300px;
  }
  .show-table {
    margin-top: 20px;
    padding: 0 20px;
    background:rgba(255,255,255,1);
    .table-title {
      display: flex;
      height:54px;
      background:rgba(250,250,250,1);
      flex-direction: row;
      border-bottom: 1px solid rgba(221,221,221,1);
      div {
        width: 14.3%;
        height: 100%;
        color: #333;
        text-align: center;
        line-height: 54px;
      }
      div:nth-child(5),div:nth-child(6) {
        text-align: right;
        padding-right: 18px;
      }
    }
    .table-line {
      display: flex;
      margin: 0 auto;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid rgba(221,221,221,1);
      .detail {
        color: #eb6100;
        padding-bottom:1px;
        border-bottom:1px solid #eb6100
      }
      div {
        width: 14.3%;
        height: 100%;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        text-align: center;
        line-height: 54px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div:nth-child(8) {
        border-right: 0;
      }
      &>div:nth-of-type(5) {
        text-align: right;
        padding-right: 15px
      }
      &>div:nth-of-type(6) {
        text-align: right;
        padding-right: 15px
      }
    }
    .table-line:last-of-type {
      border: none;
    }
  }
}
</style>
