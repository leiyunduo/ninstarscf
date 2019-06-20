<template>
  <div id="loanColumn">
    <div :id="echarts" style="height:300px;"></div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'loanColumn',
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
      let myChart = echarts.init(document.getElementById(that.echarts))
      let colors = that.chartData.color
      let option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "shadow"
        //   },
        //   formatter: function(params) {
        //     let str;
        //     str = '<div><h3>'+ '2018年' + params[0].seriesName +'</h3>'
        //     str = '<div><h3>'+ '2018年' + params[0].name +'（元）</h3>'
        //     str += '<p>' + params[0].seriesName + '<span>：'+ that.toThousands(params[0].value) +'</span></p>'
        //     str += '<p>' + params[1].seriesName + '<span>：'+ that.toThousands(params[1].value) +'</span></p>'
        //     str += '<p>' + params[2].seriesName + '<span>：'+ that.toThousands(params[2].value) +'</span></p>'
        //     str +='</div>'
        //     return str
        //   }
        // },
        legend: {
          right: 40,
          top: 0,
          data: ['新增贷款', '偿还贷款', '贷款余额']
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
            name: '元',
            nameTextStyle: {
              color: '#eb6100'
            },
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
            name: '新增贷款',
            type: "bar",
            barGap: 0,
            data: that.chartData.data1
          },
          {
            name: '偿还贷款',
            type: "bar",
            barGap: 0,
            data: that.chartData.data2
          },
          {
            name: '贷款余额',
            type: "bar",
            barGap: 0,
            data: that.chartData.data3
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      // 在渲染点击事件之前先清除点击事件
      myChart.off('click')
      // echarts根据屏幕大小自适应
      setTimeout(function (){
        window.onresize = function () {
          myChart.resize();
        }
	    },200)
    }
  }
}
</script>
