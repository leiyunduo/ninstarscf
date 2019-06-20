<template>
  <div id="ctGtPt">
    <div :id="echarts" style="height:300px;"></div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'ctGtPt',
  data () {
    return {}
  },
  props: {
    chartData: {
      type: Object,
      default: () => []
    }
  },
  mounted() {
    const that = this
    that.$nextTick (() => {
      that.drawChart()
    })
  },
  watch: {
   'chartData.data1': function (n, o) {
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
      var myChart = echarts.init(document.getElementById(that.echarts))
      let colors = that.chartData.color
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            let str;
            str = '<div><h3>' + params[0].name +'</h3>'
            for (let i = 0; i < params.length; i++) {
              str += '<p>' + params[i].marker + params[i].seriesName + '<span>：'+ that.toThousands(params[i].value) +'（元）</span></p>'
            }
            str +='</div>'
            return str
          }
        },
        legend: {
          right: 2,
          top: 0,
          data: that.chartData.title
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 0
            },
            data: that.chartData.xAxis
          }
        ],
        yAxis: [
          {
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 0
            },
            minInterval: 1,
            type: "value"
          }
        ],
        series: [
          {
            name: that.chartData.title[0],
            type: "bar",
            barGap: 0,
            data: that.chartData.data1
          },
          {
            name: that.chartData.title[1],
            type: "bar",
            barGap: 0,
            data: that.chartData.data2
          },
          {
            name: that.chartData.title[2],
            type: "bar",
            barGap: 0,
            data: that.chartData.data3
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
#ctGtPt {
  width: 100%;
}
</style>
