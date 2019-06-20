<template>
  <div class="all">
    <div id="month-gt" class="show-chart"></div>
    <div class="show-table">
      <div class="table-title">
        <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
      </div>
      <div class="table-line" v-for="(item, index) in showList" :key='index'>
        <div>
          <span @click="handleNav(item)">
            {{item.id}}
          </span>
        </div>
        <div>{{!item.create_time ? '未提交融资期望' : item.create_time }}</div>
        <div>{{!item .repayment_date ? '未提交融资期望' : item.repayment_date  }}</div>
        <div>{{toThousands(item.value)}}</div>
        <div>{{toThousands(item.shortage)}}</div>
        <div>{{item.type === '0' ? '应收融资' : item.type === '1' ? '订单融资' : item.type === '2' ? '库存融资' : '贸易融资'}}</div>
        <div :style="!item.business_name ? 'color: #999' : ''">{{!item.business_name ? '无收款方' : item.business_name}}</div>
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
export default {
  name: 'allProperty',
  data () {
    return {
      lineX: [],
      lineY: [],
      showList: [],
      tableTitle: ['单号', '创建时间', '还款时间', '融资金额（元）', '缺口金额（元）', '融资类型', '收款方'],
      company_id: ''
    }
  },
  props: ['fType', 'fid', 'bid'],
  methods: {
    drawLine: function (el, x, y) {
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
        color: ['#7498f7'],
        legend: {
          right: 20,
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
          data: x,
          type: 'value',
          minInterval: 1
        },
        yAxis: {
          data: ['贸易', '订单', '应收', '存货'],
          type: 'category',
          nameTextStyle: {
            color: '#eb6100'
          },
          offset: 0,
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
              // color: '#639FA9'
            }
          },
          color: '#7498f7',
          height: '80%',
          barWidth: 13,
          data: y
        }]
      }
      myLine.setOption(lineOption)
      // echarts根据屏幕大小自适应
      setTimeout(function (){
        window.onresize = function () {
          myLine.resize();
        }
      },200)
    },
    handleNav: function (el) {
      let that = this
      if (localStorage.role === 'business' && el.data.date_created) {
        let path = ''
        el.data.type === '应收融资' ? path = '/getting_application' : path = '/orderFinancing'
        let query = {
          fid: el.data.id
        }
        this.$router.push({path, query})
      } else {
        that.$message.warning('无权限查看')
      }
    }
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
    that.$ajax.get('/api/oth/loan_statistics/loan_type_statistics/?company_id=' + that.company_id).then((res) => {
      // console.log(res)
      // var totallist1 = [1, 2, 3, 4]
      var totallist2 = ['贸易融资', '订单融资', '应收融资', '存货融资']
      var monthGt = document.getElementById('month-gt')
      var totallist1 = [res.data.trade_loan_num, res.data.orders_loan_num, res.data.rceivables_loan_num, res.data.stock_loan_num]
      // that.showList = res.data.info_list
      that.drawLine(monthGt, totallist2, totallist1)
    })
    that.$ajax.get('/api/oth/loan_statistics/loan_list/?company_id=' + that.company_id).then(res => {
      that.showList = res.data.fa_list
    })
  }
}
</script>
<style lang='less' scoped>
@import url('./icon.css');
.all {
  .chart-title {
    color: #333;
    border-left: 4px solid #eb6100;
    padding-left: 20px;
    font-size: 16px;
    font-weight: bold;
  }
  .show-chart {
    width: 100%;
    margin: 0 auto;
    margin-top: 30px;
    height: 300px;
  }
  .show-table {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    border: 1px solid #eaeaea;
    .table-title {
      display: flex;
      border-bottom: 1px solid #eaeaea;
      background: #eaeaea;
      color: #999;
      div {
        width: 14.3%;
        line-height: 43px;
        text-align: center;
      }
    }
    .table-line {
      font-size: 14px;
      display: flex;
      border-bottom: 1px dashed #ccc;
      // border-bottom: 1px solid #eaeaea;
      div {
        width: 14.3%;
        line-height: 43px;
        text-align: center;
        border-right:1px solid #eaeaea;
      }
      div:first-child {
        span:hover {
          color: #eb6100;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      div:nth-child(7) {
        border-right: 0;
      }
      &>div:nth-of-type(4) {
        text-align: right;
        padding-right: 15px
      }
      &>div:nth-of-type(5) {
        text-align: right;
        padding-right: 20px;
      }
    }
    .table-line:last-of-type {
      border: none;
    }
  }
}
</style>
