<template>
  <div id="orderColumn">
    <div :id="echarts" class="echarts" ref="echarts" style="height: 300px;"></div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'orderColumn',
  props: {
    chartData: {
      type: Object,
      default: () => []
    }
  },
  created () {
    const that = this
    that.$nextTick (() => {
      that.drawChart(that.chartData.data1)
    })
    console.log(that.chartData.data1)
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
    // 订单金额====柱状图
    drawChart (n) {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let colors = that.chartData.color
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            // console.log(params)
            if (params[0].seriesName === '产生订单总数') {
              let str;
              str = '<div><h3>'+ params[0].name +'</h3>'
              str += '<p>' + that.chartData.legend + '<span>：'+ params[0].value +'</span></p>'
              str +='</div>'
              return str
            } else if (params[0].seriesName === '产生订单金额') {
              let str;
              str = '<div><h3>'+ params[0].name +'</h3>'
              str += '<p>' + that.chartData.legend + '（元）<span>：'+ that.toThousands(params[0].value) +'</span></p>'
              str +='</div>'
              return str
            } else if (params[0].seriesName === '流动资金产生金额') {
              let str;
              str = '<div><h3>'+ params[0].name +'</h3>'
              str += '<p>' + that.chartData.legend + '（元）<span>：'+ that.toThousands(params[0].value) +'</span></p>'
              str +='</div>'
              return str
            } else if (params[0].seriesName === '流动资金产生总数') {
              let str;
              str = '<div><h3>'+ params[0].name +'</h3>'
              str += '<p>' + that.chartData.legend + '<span>：'+ params[0].value +'</span></p>'
              str +='</div>'
              return str
            }
          }
        },
        legend: {
          right: 2,
          top: 0,
          data: that.chartData.legend
        },
        // toolbox: {
        //   show: true,
        //   orient: "horizontal",
        //   right: 5,
        //   top: 2,
        //   feature: {
        //     mark: { show: true },
        //     dataView: {
        //       show: true,
        //       readOnly: true,
        //       optionToContent:function (opt) {
        //         let axisData = opt.xAxis[0].data; //坐标数据
        //         let series = opt.series; //折线图数据
        //         let tdHeads = '<td style="padding: 0 10px;background-color: #fff;color: #909399;height:32px;line-height:32px;">时间</td>'; //表头
        //         let tdBodys = ''; //数据
        //         series.forEach(function (item) {
        //           //组装表头
        //           tdHeads += `<td style="padding: 0 10px;background-color: #fff;color: #909399;height:32px;line-height:32px;">${item.name}</td>`;
        //         });
        //         let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
        //         for (let i = 0, l = axisData.length; i < l; i++) {
        //           for (let j = 0; j < series.length; j++) {
        //             //组装表数据
        //             tdBodys += `<td>${ series[j].data[i]}</td>`;
        //           }
        //           table += `<tr style="height:32px;border-bottom: 1px solid #ebeef5;color: #606266;line-height:32px;"><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
        //           tdBodys = '';
        //         }
        //         table += '</tbody></table>';
        //         return table;
        //       }
        //     },
        //     magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            // // 字体样式
            // axisLabel: {
            //   show: true,
            //   // 让字体完全显示
            //   interval: 0
            // },
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
            type: "value"
          }
        ],
        series: [
          {
            name: that.chartData.legend,
            type: "bar",
            barGap: 0,
            data: n
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
#orderColumn {
  width: 100%;
}
</style>
