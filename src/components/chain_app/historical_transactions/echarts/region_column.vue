<template>
  <div id="regionPie">
    <div :id="echarts" class="echarts" ref="echarts" style="height: 350px;"></div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'regionPie',
  props: {
    // 接收父组件传递过来的信息
    chartData: {
      type: Object,
      default: ()=>[]
    }
  },
  data () {
    return {
      regional_list: [
        {
          value: '长江三角洲',
          color: '#975fe4',
        },
        {
          value: '珠江三角洲',
          color: '#1d4fd4',
        },
        {
          value: '西部',
          color: '#36cbcb',
        },
        {
          value: '中部',
          color: '#4ecb73',
        },
        {
          value: '东北',
          color: '#fcdc5b',
        },
        {
          value: '环渤海',
          color: '#e3dcff',
        },
        {
          value: '京津冀',
          color: '#f39f5f',
        },
        {
          value: '其他',
          color: '#f2637b',
        }
      ]
    }
  },
  watch: {
   'chartData.data': function (n, o) {
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
    handlePersent (arr, num) {
      let s = 0
      if (arr.length > 0) {
        arr.forEach(val => {
          s += val.value
        })
      }
      if (s !== 0) {
        return ((num / s) * 100).toFixed(2) + '%'
      } else {
        return '0%'
      }
    },
    drawChart (n) {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let colors = that.chartData.color
      let option = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter:function (x) {
            let str;
            for (let i = 0; i < that.regional_list.length; i++) {
              if (that.regional_list[i].color === x[0].color) {
                str = '<div>'
                str += '<div>' + x[0].marker + that.regional_list[i].value + '：</div>'
                str += '<div>数量：' + x[0].axisValue + '（个）</div>'
                str += '<div>平均账期：' + x[0].value + '（天）</div>'
                str += '</div>'
              }
            }
            return str
          }
        },
        legend: {
          right: 10,
          top: 2,
          data: that.chartData.legend
          // data: ['长江三角洲', '珠江三角洲', '西部', '中部', '东北', '环渤海', '京津冀', '其他']
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            name: '个数',
            nameTextStyle: {
              color: '#eb6100'
            },
            type: 'category',
            axisTick: {show: false},
            data: that.chartData.xAxis
          }
        ],
        yAxis: [
          {
            name: '平均账期',
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
        color: ['rgb(24, 144, 255)', '#f39f5f'],
        series: [
          {
            name: '',
            itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      '#975fe4', '#1d4fd4', '#36cbcb', '#4ecb73', '#fcdc5b', '#e3dcff', '#f39f5f', '#f2637b'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
            },
            type: 'bar',
            barMaxWidth: '35',
            data: that.chartData.data
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
    }
  }
}
</script>
