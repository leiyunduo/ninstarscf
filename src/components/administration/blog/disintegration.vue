<template>
  <div id="disintegration">
    <div :id="echarts" style="height: 300px;"></div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "disintegration",
  data() {
    return {}
  },
  // 接受父组件参数
  props: {
    chartData: {
      type: Object,
      default: () => []
    }
  },
  watch: {
   'chartData.data1': function (n, o) {
    this.$nextTick (() => {
      this.drawChart(n)
    })
   }
  },
  mounted() {
    const that = this
    that.$nextTick(() => {
      that.drawChart()
    })
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000
    }
  },
  methods: {
    // 折线图
    drawChart() {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      var colors = that.chartData.color
      let option = {
        color: colors,
        tooltip: {
          formatter: function(params) {
            let str;
            str = '<div><h3>'+ params.seriesName +'</h3>'
            str += '<p>时间：<span>'+ params.data[0] +'</span></p>'
            str += '<p>金额（元）：<span>'+ that.toThousands(params.data[1]) +'</span></p>'
            str +='</div>'
            return str
          },
          // enterable: true,
          // trigger: 'axis',
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#eb6100'
          //   }
          // }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          orient: "horizontal",
          top: 0,
          left: 'right',
          data: that.chartData.legend
        },
        xAxis: {
          type: "time",
          // min: '2018-01-01',
          // data: ["2018-01-01", "2018-02-01", "2018-03-01", "2018-04-01", "2018-05-01", "2018-06-01", "2018-07-01", "2018-08-01", "2018-09-01", "2018-10-01", "2018-11-01", "2018-12-01"],
          axisLabel: {
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {show: false},
          axisLabel: {
            show: true,
            // 让字体完全显示
            interval: 0
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            // 让字体完全显示
            interval: 0
          }
        },
        series: [
          {
            id: "a",
            type: "line",
            name: that.chartData.legend[0],
            // smooth: true,
            symbolSize: 10,
            data: that.chartData.data1
          },
          {
            id: "b",
            type: "line",
            name: that.chartData.legend[1],
            // smooth: true,
            symbolSize: 10,
            data: that.chartData.data2
          },
          {
            id: "c",
            type: "line",
            // smooth: true,
            name: that.chartData.legend[2],
            symbolSize: 10,
            data: that.chartData.data3
          },
          {
            id: "d",
            type: "line",
            // smooth: true,
            symbolSize: 10,
            name: that.chartData.legend[3],
            data: that.chartData.data4
          }
          // {
          //   id: "c",
          //   name: '总额',
          //   type: "line",
          //   // smooth: true,
          //   symbolSize: 10,
          //   data: that.chartData.order_amount_list
          // }
        ]
      };
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      //自适应宽高
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      // 在渲染点击事件之前先清除点击事件
      myChart.off("click")
    }
  }
}
</script>

<style lang="less" scoped>
#disintegration {
  width: 100%;
}
</style>
