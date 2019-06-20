<template>
  <div class="all">
    <div class="chart-title">
      <h3>
        <span>我的资产总览</span>
        <div class="select">
          <span>年统计时间（年）：</span>
          <select v-model="select_data" @change="selectChange(select_data)">
            <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
          </select>
        </div>
      </h3>
    </div>
    <div id="month-gt" class="show-chart"></div>
    <div id="pie-month" class="show-chart"></div>
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
      unit1: '',
      unit2: '',
      unit3: '',
      unit4: '',
      clover: {
        bank_ticket: '',
        digital_ticket: '',
        business_ticket: ''
      },
      company_id: '',
      yearDate: ['2017', '2018', '2019'],
      select_data: '2019'
    }
  },
  props: ['fType', 'fid', 'bid'],
  methods: {
    // 年统计时间
    selectChange (item) {
      var that = this
      that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=' + item).then((res) => {
        var totallist1 = []
        var totallist2 = []
        var monthGt = document.getElementById('month-gt')
        that.newList = res.data
        var gettinglist1 = []
        var gettinglist2 = []
        let monthGetting = document.getElementById('month-getting')
        that.newDrawLine(monthGt, that.newList.x_axis, that.newList.x1, that.newList.x2, that.newList.x3, [], [])
      })
    },
    newDrawLine (el, xAxis, jin, yin, tong, cd, ch) {
      let myLine = echarts.init(el)
      var labelOption = {
        normal: {
        }
      }
      var option = {
        color: ['#9B9B9B', '#3675ED', '#27A289', '#DD7259', 'sandybrown'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['银券', '商券', '数券', '存单', '存货'],
          right: 30,
          orient: 'vertical',
          bottom: 0,
          width: '100%',
          height: '90%',
          itemWidth: 16,
          itemHeight: 16,
          itemGap: 20,
          align: 'right',
          borderColor: '#999'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            // mark: {show: true},
            // dataView: {show: true, readOnly: false},
            // magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            // restore: {show: true},
            // saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          // {
          //   type: 'category',
          //   axisTick: {show: false},
          //   data: xAxis
          // }
          {
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
            boundaryGap: true,
            splitNumber: 7,
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#eaeef0'
              }
            },
            axisLabel: {
              color: '#333'
            }
          }
        ],
        series: [
          {
            name: '银券',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            data: jin
          },
          {
            name: '商券',
            type: 'bar',
            label: labelOption,
            data: yin
          },
          {
            name: '数券',
            type: 'bar',
            label: labelOption,
            data: tong
          },
          {
            name: '存单',
            type: 'bar',
            label: labelOption,
            data: cd
          },
          {
            name: '存货',
            type: 'bar',
            label: labelOption,
            data: ch
          }
        ]
      }
      myLine.setOption(option)
      // echarts根据屏幕大小自适应
      setTimeout(function (){
        window.onresize = function () {
          myLine.resize();
        }
      },200)
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
          orient: 'vertical',
          bottom: 0,
          width: '100%',
          height: '90%',
          itemWidth: 16,
          itemHeight: 16,
          itemGap: 20,
          align: 'right'
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
          boundaryGap: true,
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
          // boundaryGap: true,
          // interval: 0
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
      //自适应宽高
      window.addEventListener("resize", function () {
        myLine.resize();
      });
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
        color: ['#9B9B9B', '#3675ED', '#27A289', '#DD7259', 'sandybrown'],
        legend: {
          orient: 'vertical',
          // right: '40',
          // top: 'center',
          // align: 'right',
          top: 'center',
          itemGap: 20,
          itemWidth: 16,
          itemHeight: 16,
          padding: 0,
          formatter: function (name) {
            for (var i = 0; i < data.length; i++) {
              if (name === data[i].name) {
                return '   ' + name + ': ' + that.toThousands(data[i].value) + '  (元)'
              }
            }
          }
        },
        textStyle: {
          fontFamily: 'Arial',
          fontSize: 16
        },
        series: [{
          name: '金额',
          type: 'pie',
          center: ['20%', '50%'],
          radius: ['50%', '70%'],
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
      //自适应宽高
      window.addEventListener("resize", function () {
        myPie.resize();
      });
    },
    getDataFormat: function (max) {
      var number
      number = max * Math.pow(10, -4)
      return number.toFixed(2)
    },
    getMaxData: function (arr, type) {
      var max = []
      var maxData = ''
      if (Array.isArray(arr)) {
        max = arr.sort(function (a, b) {
          switch (type) {
            case 1:
              return Number(a.credit_amount) - Number(b.credit_amount)
            case 2:
              return Number(a.receivable_pool) - Number(b.receivable_pool)
            case 3:
              return Number(a.paid_total) - Number(b.paid_total)
            case 4:
              return Number(a.receipt_amount + a.stock_amount) - Number(b.receipt_amount + b.stock_amount)
            default:
              break
          }
        })
        switch (type) {
          case 1:
            maxData = max[max.length - 1].credit_amount
            break
          case 2:
            maxData = max[max.length - 1].receivable_pool
            break
          case 3:
            maxData = max[max.length - 1].paid_total
            break
          case 4:
            maxData = max[max.length - 1].receipt_amount + max[max.length - 1].stock_amount
            break
        }
      }
      return maxData
    },
    clone: function (obj) {
      var cloneObj
      if (typeof obj === 'object') {
        cloneObj = JSON.stringify(obj)
        return JSON.parse(cloneObj)
      }
    }
  },
  mounted () {
    var that = this
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?year=2019&company_id=' + that.company_id).then((res) => {
      console.log(res)
      var totallist1 = []
      var totallist2 = []
      var monthGt = document.getElementById('month-gt')
      that.newList = res.data
      var gettinglist1 = []
      var gettinglist2 = []
      let monthGetting = document.getElementById('month-getting')
      that.newDrawLine(monthGt, that.newList.x_axis, that.newList.x1, that.newList.x2, that.newList.x3, [], [])
    })
    this.$ajax.get('/api/oth/asset/robot/?company_id=' + that.company_id).then(res => {
      if (res.status === 200) {
        if (res.data.receivable) {
          this.clover.bank_ticket = res.data.receivable.bank_ticket.sum
          this.clover.digital_ticket = res.data.receivable.digital_ticket.sum
          this.clover.business_ticket = res.data.receivable.business_ticket.sum
        }
        var totalpie = []
        totalpie[0] = {value: this.clover.bank_ticket, name: '银券'}
        totalpie[1] = {value: this.clover.business_ticket, name: '商券'}
        totalpie[2] = {value: this.clover.digital_ticket, name: '数券'}
        totalpie[3] = {value: 0, name: '存单'}
        totalpie[4] = {value: 0, name: '存货'}
        var pieMonth = document.getElementById('pie-month')
        this.drawPie(totalpie, pieMonth)
      }
    })
  }
}
</script>
<style lang='less' scoped>
@import url('../icon.css');
.all {
  background:rgba(255,255,255,1);
  margin: 0 20px 20px;
  .chart-title {
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
  }
  .show-chart {
    margin: 0 auto;
    margin-top: 30px;
    height: 400px;
  }
}
</style>
