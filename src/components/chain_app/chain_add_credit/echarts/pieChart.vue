<template>
  <div id="pieChart">
    <div :id="echarts" class="echarts" ref="echarts" style="width: 500px;height: 300px;"></div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'pieChart',
  props: {
    // 接收父组件传递过来的信息
    chartData: {
      type: Object,
      default: ()=>[]
    }
  },
  data () {
    return {
    }
  },
  watch: {
   'chartData.data1': function (n, o) {
    this.$nextTick (() => {
      this.drawChart(n)
    })
   }
  },
  mounted () {
    const that = this
    that.$nextTick(()=> {
      that.drawChart()
    })
  },
  computed: {
    echarts () {
      return 'echarts' + Math.random()*100000
    }
  },
  methods: {
    drawChart (n) {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let colors = that.chartData.color
      let option = {
        // noDataLoadingOption: {
        //   text: '暂无数据',
        //   effect: 'bubble',
        //   effectOption: {
        //     effect: {
        //       n: 0
        //     }
        //   }
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: 2,
          data: that.chartData.legend
        },
        animation: false, // 去掉动画才会显示线
        // #7498f7 蓝色 #eec557 黄色 #f3655d 红色 #44e9a7 绿色
        color: colors,
        series: [
          {
            name: that.chartData.titles,
            type: "pie",
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // 动态获取data
            data: that.chartData.data1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      // var imgSrc = myChart.getConnectedDataURL()
      // console.log(imgSrc)
      // var img = new Image()
      // 渲染到图表上面，遮住图表
      // img.src = imgSrc
      // 在渲染点击事件之前先清除点击事件
      myChart.off('click')
    }
  }
}
</script>
