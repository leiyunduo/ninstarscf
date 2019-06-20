<template>
  <div id="pieChart">
    <div :id="echarts" class="echarts" ref="echarts" style="width: 600px;height: 300px;"></div>
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
   'chartData.data.data': function (n, o) {
    this.$nextTick (() => {
      this.drawChart()
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
    drawChart () {
      const that = this
      let myChart = echarts.init(document.getElementById(that.echarts))
      let colors = ['rgb(24, 144, 255)', 'rgb(19, 194, 194)', '#f39f5f', 'rgb(240, 72, 100)']
      var config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: config.rotate,
              align: config.align,
              verticalAlign: config.verticalAlign,
              position: config.position,
              distance: config.distance
            }
          };
          myChart.setOption({
            series: [{
              label: labelOption
            }]
          });
        }
      };
      var get = function(e){
        var newStr=" ";
        var start,end;
        var name_len=e.name.length; //每个内容名称的长度
        var max_name=6; //每行最多显示的字数
        var new_row = Math.ceil(name_len / max_name); // 最多能显示几行，向上取整比如2.1就是3行
        if(name_len>max_name){ //如果长度大于每行最多显示的字数
          for(var i=0;i<new_row;i++){ //循环次数就是行数
              var old=''; //每次截取的字符
              start=i*max_name; //截取的起点
              end=start+max_name; //截取的终点
            if (i==new_row-1) { //最后一行就不换行了
              old=e.name.substring(start);
            } else {
              old=e.name.substring(start,end)+"\n";    
            }
            newStr+=old; //拼接字符串
          }
        }else{ //如果小于每行最多显示的字数就返回原来的字符串
          newStr=e.name; 
        }
        return newStr;
      }
      var labelOption = {
        normal: {
          show: true,
          fontSize: 12,
          formatter: get,
          rich: {
            name: {
              textBorderColor: '#fff'
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      };
      let option = {
        tooltip: {
          formatter: function (param) {
            let str;
            if (that.chartData.data.titles === '交易数据异常统计') {
              str = '<div>' + param.seriesName + '<br/>'
              str += '<div>' + param.name + '：<span>' + param.value + '（次）</span>（' + param.percent +'%）</div>'
              str += '</div>'
            } else {
              str = '<div>' + param.seriesName + '<br/>'
              str += '<div>' + param.name + '：<span>' + that.toThousands(param.value) + '（元）</span>（' + param.percent +'%）</div>'
              str += '</div>'
            }
            return str;
          }
        },
        legend: {
          orient: "vertical",
          left: "left",
          bottom: 2,
          data: that.chartData.data.legend
        },
        // #7498f7 蓝色 #eec557 黄色 #f3655d 红色 #44e9a7 绿色
        color: colors,
        series: [
          {
            name: that.chartData.data.titles,
            type: "pie",
            center: that.chartData.data.centers,
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: labelOption,
            // 动态获取data
            data: that.chartData.data.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
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
