<template>
  <div id="gap">
    <div :id="echarts" class="echarts" ref="echarts" style="width: 500px;height: 300px;"></div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'gap',
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
  mounted () {
    const that = this
    that.$nextTick(()=> {
      // console.log(that.chartData)
      that.drawChart()
    })
  },
  computed: {
    echarts () {
      return 'echarts' + Math.random()*100000
    }
  },
  watch: {
   'chartData.data1': function (n, o) {
    this.$nextTick (() => {
      this.drawChart(n)
    })
   }
  },
  methods: {
    drawChart () {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: 2,
          data: ['融资资金', '自筹资金', '未解决资金']
        },
        // #7498f7 蓝色 #eec557 黄色 #f3655d 红色 #44e9a7 绿色
        color: ['#7498f7', 'sandybrown', '#f3655d'],
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
      // 在渲染点击事件之前先清除点击事件
      myChart.off('click')
      // 流动资金需求情况点击事件
      // var triggerAction = function(action, selected) {
      //   var legend = [];
      //   for ( name in selected) {
      //     if (selected.hasOwnProperty(name)) {
      //       legend.push({name: name})
      //     }
      //   }
      //   myChart.dispatchAction({
      //     type: action,
      //     batch: legend
      //   })
      // };
      // // 是否只选择一个图例
      // var isFirstUnSelect = function(selected) {
      //   var unSelectedCount = 0;
      //   for ( name in selected) {
      //     if (!selected.hasOwnProperty(name)) {
      //       continue;
      //     }
      //     if (selected[name] === false) {
      //       unSelectedCount++
      //     }
      //   }
      //   return unSelectedCount===1
      // };
      // var isAllUnSelected = function(selected) {
      //   var selectedCount = 0;
      //   for ( name in selected) {
      //     if (!selected.hasOwnProperty(name)) {
      //       continue;
      //     }
      //     // 所有 selected Object 里面 true 代表 selected， false 代表 unselected
      //     if (selected[name] === true) {
      //       ++selectedCount
      //     }
      //   }
      //   return selectedCount===0
      // }
      // 切换图例选中状态后的事件
      // var selectArr = option.legend.data
      // myChart.on ('legendselectchanged', function (obj) {
      //   var selected = obj.selected
      //   var legend = obj.name
      //   // 使用 legendToggleSelect Action 会重新触发 legendselectchanged Event，导致本函数重复运行
      //   // 使得 无 selected 对象
      //   if (selected !== undefined) {
      //     if (isFirstUnSelect(selected)) {
      //       triggerAction('legendToggleSelect', selected)
      //     } else if (isAllUnSelected(selected)) {
      //       triggerAction('legendSelect', selected)
      //     }
      //   }
      // })
    }
  }
}
</script>
