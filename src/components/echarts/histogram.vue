<template>
  <div id="histogram">
    <div :id="echarts" class="echarts" ref="echarts" style="height:300px"></div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'histogram',
  props: {
    chartData: {
      type: Object,
      default: () => []
    }
  },
  created () {
    const that = this
    that.$nextTick (() => {
      that.drawChart(that.chartData.data.data)
    })
    // console.log(that.chartData.data.data)
  },
  watch: {
   'chartData.data.data': function (n, o) {
    this.$nextTick (() => {
      this.drawChart(n)
    })
   }
  },
  computed: {
    echarts () {
      return 'echarts' + Math.random()*100000
    }
  },
  methods: {
    // 柱状图
    drawChart (n) {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let option = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (param) {
            let str;
            if (param.length > 0) {
              str = '<div>' + param[0].name + '<br/>'
              for (var i = 0; i < param.length; i++) {
                str += '<div>' + param[i].marker + param[i].seriesName + '：<span>' + that.toThousands(param[i].value) + '（元）</span></div>'
              }
              str += '</div>'
            }
            return str;
          }
        },
        legend: {
          right: 10,
          top: 2,
          data: that.chartData.data.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: that.chartData.data.xAxis
          }
        ],
        yAxis: [
          {
            name: '金额（元）',
            nameTextStyle: {
              color: '#eb6100'
            },
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 50
            },
            minInterval: 1,
            type: "value"
          }
        ],
        color: ['rgb(24, 144, 255)', 'rgb(19, 194, 194)', '#f39f5f', 'rgb(240, 72, 100)'],
        series: [
          {
            name: that.chartData.data.legend[0],
            type: 'bar',
            data: that.chartData.data.data
          },
          {
            name: that.chartData.data.legend[1],
            type: 'bar',
            data: that.chartData.data.data1
          },
          {
            name: that.chartData.data.legend[2],
            type: 'bar',
            data: that.chartData.data.data2
          },
          {
            name: that.chartData.data.legend[3],
            type: 'bar',
            data: that.chartData.data.data3
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      //自适应宽高
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      // 在渲染点击事件之前先清除点击事件
      myChart.off('click')
    }
  }
}
</script>

<style lang="less" scoped>
#histogram {
  width: 100%;
}
</style>
