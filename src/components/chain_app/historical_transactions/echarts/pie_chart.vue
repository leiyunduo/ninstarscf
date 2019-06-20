<template>
  <div id="pieChart">
    <div :id="echarts" class="echarts" ref="echarts" style="height: 350px;"></div>
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
      var labelOption = {
        normal: {
          show: true,
          fontSize: 12,
          // formatter: function (params) {
          //   let str;
          //   if (that.chartData.index === 1) {
          //     let str;
          //     str = params.value
          //     str += '  {per|' + params.percent + '%}  '
          //     return str
          //   } else if (that.chartData.index === 2) {
          //     let str;
          //     str = that.toThousands(params.value) + '（元）'
          //     str += '  {per|' + params.percent + '%}  '
          //     return str
          //   }
          // },
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
      };
      let option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            let str;
            if (that.chartData.index === 1) {
              let str;
              str = '<div><h3>'+ params.name +'</h3>'
              str += '<p>' + params.seriesName + '<span>：'+ params.value + '</span><span style="display:inline-block;padding-left:10px;">（' + params.percent +'%）</span></p>'
              str +='</div>'
              return str
            } else if (that.chartData.index === 2) {
              let str;
              str = '<div><h3>'+ params.name +'</h3>'
              str += '<p>' + params.seriesName + '（元）<span>：'+ that.toThousands(params.value) + '</span><span style="display:inline-block;padding-left:10px;">（' + params.percent +'%）</span></p>'
              str +='</div>'
              return str
            }
          }
        },
        legend: {
          orient: "vertical",
          right: '16%',
          top:'center',
          data: that.chartData.legend,
          formatter: function (name) {
            if (that.chartData.index === 1) {
              for (var i = 0; i < that.chartData.data.length; i++) {
                if (name === that.chartData.data[i].name) {
                  return '   ' + name + ':     ' + Number(that.chartData.data[i].value) + ' 笔    ' + that.handlePersent(that.chartData.data, Number(that.chartData.data[i].value))
                }
              }
            } else if (that.chartData.index === 2) {
              for (var i = 0; i < that.chartData.data.length; i++) {
                if (name === that.chartData.data[i].name) {
                  return '   ' + name + ':     ' + that.toThousands(that.chartData.data[i].value) + '（元）   ' + that.handlePersent(that.chartData.data, Number(that.chartData.data[i].value))
                }
              }
            }
          }
        },
        animation: false, // 去掉动画才会显示线
        color: colors,
        series: [
          {
            name: that.chartData.titles,
            type: "pie",
            radius: ['50%', '70%'],
            center:['33%','50%'],
            avoidLabelOverlap: true,
            label: labelOption,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                // borderWidth:5,
                // borderColor:'#fff',
              }
            },
            // 动态获取data
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
