<template>
  <div id="histogram">
    <div :id="echarts" class="echarts" ref="echarts" style="width: 700px;height: 300px;"></div>
  </div>
</template>

<script>
const echarts = require("echarts")
export default {
  name: 'histogram',
  props: {
    // 接收父组件传递过来的信息
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000
    }
  },
  mounted() {
    const that = this
    that.$nextTick(() => {
      that.drawChart()
    })
  },
  methods: {
    // 柱状图
    drawChart() {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let option = {
        color: ['#7498f7', 'sandybrown', '#f3655d'],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          bottom: 2,
          data: that.chartData[0].legend
        },
        toolbox: {
          show: true,
          orient: "horizontal",
          right: 5,
          top: 2,
          // feature: {
          //   mark: { show: true },
          //   dataView: {
          //     show: true,
          //     readOnly: true,
          //     optionToContent:function (opt) {
          //       console.log(opt)
          //       let axisData = opt.xAxis[0].data; //坐标数据
          //       let series = opt.series; //折线图数据
          //       let tdHeads = '<td style="padding: 0 10px;background-color: #fff;color: #909399;height:32px;line-height:32px;">时间</td>'; //表头
          //       let tdBodys = ''; //数据
          //       series.forEach(function (item) {
          //         //组装表头
          //         tdHeads += `<td style="padding: 0 10px;background-color: #fff;color: #909399;height:32px;line-height:32px;">${item.name}</td>`;
          //       });
          //       let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
          //       for (let i = 0, l = axisData.length; i < l; i++) {
          //         for (let j = 0; j < series.length; j++) {
          //           //组装表数据
          //           tdBodys += `<td>${ series[j].data[i]}</td>`;
          //         }
          //         table += `<tr style="height:32px;border-bottom: 1px solid #ebeef5;color: #606266;line-height:32px;"><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
          //         tdBodys = '';
          //       }
          //       table += '</tbody></table>';
          //       return table;
          //     }
          //   },
          //   magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
          //   restore: { show: true },
          //   saveAsImage: { show: true }
          // }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: that.chartData[0].xAxis,
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 0
            }
          }
        ],
        series: [
          {
            name: that.chartData[0].legend[0],
            type: "bar",
            barGap: 0,
            data: that.chartData[0].data1
          },
          {
            name: that.chartData[0].legend[1],
            type: "bar",
            data: that.chartData[0].data2
          },
          {
            name: that.chartData[0].legend[2],
            type: "bar",
            data: that.chartData[0].data3
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
#histogram {
  width: 100%;
  height: 100%;
}
</style>
