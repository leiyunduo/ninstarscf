<template>
  <div id="nestingPic">
    <div :id="echarts" class="echarts" ref="echarts" style="width: 600px;height: 320px;"></div>
  </div>
</template>

<script>
const echarts = require("echarts")
export default {
  name: "nestingPic",
  data() {
    return {}
  },
  props: {
    // 接收父组件传递过来的信息
    chartData: {
      type: Object,
      default: ()=>[]
    }
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000
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
  methods: {
    drawChart() {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          right: 0,
          bottom: 0,
          width:100,
          data: that.chartData.legend
        },
        series: [
          {
            name: that.chartData.titles,
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            color: ['#7498f7', '#f3655d'],
            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // selected: true
            data: that.chartData.data1
          },
          {
            name: that.chartData.titles,
            // #7498f7 蓝色 #eec557 黄色 #f3655d 红色 #44e9a7 绿色
            color: ['lightskyblue', '#B0E2FF', '#FFC1C1', '#ef4136'],
            type: "pie",
            radius: ["40%", "55%"],
            data: that.chartData.data2
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      // 在渲染点击事件之前先清除点击事件
      myChart.off('click')
    }
  }
}
</script>

<style lang="less" scoped>
#nestingPic {
  width: 100%;
  height: 100%;
}
</style>
