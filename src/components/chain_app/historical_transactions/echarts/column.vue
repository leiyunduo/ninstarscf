<template>
  <div id="column">
    <div :id="echarts" class="echarts" ref="echarts" style="height: 350px;"></div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'column',
  props: {
    chartData: {
      type: Object,
      default: () => []
    }
  },
  created () {
    const that = this
    that.$nextTick (() => {
      that.drawChart(that.chartData.data)
    })
  },
  watch: {
   'chartData.data': function (n, o) {
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
    // 订单金额====柱状图
    drawChart (n) {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let colors = that.chartData.color
      let seriesData;
      if (that.chartData.index === 1) {
        seriesData = [
          {
            name: that.chartData.legend,
            type: "bar",
            barGap: 0,
            barMaxWidth: '35',
            data: that.chartData.data
          }
        ]
      } else if (that.chartData.index === 2) {
        seriesData = [
          {
            name: that.chartData.legend[0],
            type: "bar",
            barGap: 0,
            data: that.chartData.data
          },{
            name: that.chartData.legend[1],
            type: "bar",
            data: that.chartData.data1
          },{
            name: that.chartData.legend[2],
            type: "bar",
            data: that.chartData.data2
          }
        ]
      } else if (that.chartData.index === 3) {
        seriesData = [
          {
            name: that.chartData.legend[0],
            type: "bar",
            barGap: 0,
            data: that.chartData.data
          },{
            name: that.chartData.legend[1],
            type: "bar",
            data: that.chartData.data1
          },{
            name: that.chartData.legend[2],
            type: "bar",
            data: that.chartData.data2
          },{
            name: that.chartData.legend[3],
            type: "bar",
            data: that.chartData.data3
          }
        ]
      }
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            if (that.chartData.num === 0) {
              let str;
              str = '<div><h3>' + params[0].name +'</h3>'
              for (let i = 0; i < params.length; i++) {
                str += '<p>' + params[i].marker + params[i].seriesName + '<span>：'+ params[i].value +'</span></p>'
              }
              str +='</div>'
              return str
            } else if (that.chartData.num === 1) {
              let str;
              str = '<div><h3>' + params[0].name +'</h3>'
              for (let i = 0; i < params.length; i++) {
                str += '<p>' +  params[i].marker + params[i].seriesName + '（元）<span>：'+ that.toThousands(params[i].value) +'</span></p>'
              }
              str +='</div>'
              return str
            }
          }
        },
        legend: {
          right: '10%',
          top: 20,
          data: that.chartData.legend
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: that.chartData.xAxis
          }
        ],
        yAxis: [
          {
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 250
            },
            minInterval: 1,
            type: "value",
            nameTextStyle: {
              color: '#eb6100'
            },
            name: that.chartData.name
          }
        ],
        series: seriesData
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
#column {
  width: 100%;
}
</style>
