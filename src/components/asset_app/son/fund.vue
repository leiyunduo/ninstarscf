<template>
  <div class="all">
    <div class="all_list">
      <div class="echarts-list" style="margin-right:18px;">
        <div class="chart-title">应收款统计</div>
        <div id="month-gt" class="show-chart"></div>
      </div>
      <div class="echarts-list">
        <div class="chart-title">应付款统计</div>
        <div id="not-back" class="show-chart"></div>
      </div>
    </div>
    <div class="all_list-two">
      <div class="chart-title">资产数据分析</div>
      <div class="but_list">
        <button class="but" @click="selectLine" v-if="localType === 'fund'">查看</button>
      </div>
      <div class="showData">
        <div class="content">
          <AssetList :bid="company_id" :type="1" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入echarts
// import echarts from 'echarts'
// import dataAnalyse from './bigDataAnalyse'
import AssetList from '@/components/public/assets.vue'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/lines')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  components: {
    AssetList
  },
  name: 'allProperty',
  data () {
    return {
      lineX: [],
      lineY: [],
      unit1: '',
      unit2: '',
      bigData: {
        receive_contract_data: [],
        payable_contract_data: [],
        receive_info: {
          receivable_sum: '',
          received_sum: '',
          r_deposit: '',
          s_contract: {}
        },
        payable_info: {
          payable_sum: '',
          paid_sum: '',
          p_deposit: ''
        },
        company_name: ''
      },
      bigData1: {
        receive_contract_data: [],
        payable_contract_data: [],
        receive_info: {
          receivable_sum: '',
          received_sum: '',
          r_deposit: '',
          s_contract: {}
        },
        payable_info: {
          payable_sum: '',
          paid_sum: '',
          p_deposit: ''
        },
        company_name: ''
      },
      bot_border: {
        border_l: '',
        border_r: ''
      },
      selectList: [],
      contract_name: '合同名称',
      localType: '',
      chainIdLine: '',
      chainTypeLine: '',
      iconId: '',
      business_id: '',
      blogId: '',
      is_friend: '',
      company_id: ''
    }
  },
  props: ['fType', 'fid', 'bid'],
  methods: {
    drawLine: function (x, data1, data2, params) {
      let myLine = echarts.init(document.getElementById('month-gt'))
      let myLine1 = echarts.init(document.getElementById('not-back'))
      let that = this
      var lineOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          padding: [5, 10],
          formatter: function (param) {
            let val;
            val = '<div><h3>' + param[0].name
            val += '</h3><p style="line-height:18px;"><i style="width:12px;height:12px;display:inline-block;border-radius:50%;background:#7498f7;margin:12px 5px 0;"></i>' + that.toThousands(param[0].value) + '（元）</p>'
            val += '</div>';
            return val;
          }
        },
        legend: {
          right: 30,
          bottom: 0,
          width: '100%',
          height: '90%'
        },
        animation: false,
        grid: {
          left: 60,
          bottom: 40
        },
        color: ['#7498f7'],
        xAxis: {
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: ['#eaeef0'],
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eaeef0'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#787b7f'
            },
            fontFamily: 'Arial',
            fontSize: '14'
          },
          // boundaryGap: false,
          splitNumber: 7,
          data: x
        },
        yAxis: {
          name: params,
          nameTextStyle: {
            color: '#eb6100'
          },
          axisLine: {
            lineStyle: {
              color: '#eaeef0'
            }
          },
          // 显示整数
          minInterval: 1,
          axisLabel: {
            textStyle: {
              color: '#787b7f'
            },
            fontFamily: 'Arial',
            fontSize: '14'
          }
        },
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#7498f7'
            }
          },
          height: '80%',
          barWidth: 13,
          data: data1
        }]
      }
      var lineOption1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          padding: [5, 10],
          formatter: function (param) {
            let val;
            val = '<div><h3>' + param[0].name
            val += '</h3><p style="line-height:18px;"><i style="width:12px;height:12px;display:inline-block;border-radius:50%;background:#7498f7;margin:12px 5px 0;"></i>' + that.toThousands(param[0].value) + '（元）</p>'
            val += '</div>';
            return val;
          }
        },
        legend: {
          right: 30,
          bottom: 0,
          width: '100%',
          height: '90%'
        },
        animation: false,
        grid: {
          left: 60,
          bottom: 40
        },
        color: ['#7498f7'],
        xAxis: {
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: ['#eaeef0'],
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eaeef0'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#787b7f'
            },
            fontFamily: 'Arial',
            fontSize: '14'
          },
          // boundaryGap: false,
          splitNumber: 7,
          data: x
        },
        yAxis: {
          name: params,
          nameTextStyle: {
            color: '#eb6100'
          },
          axisLine: {
            lineStyle: {
              color: '#eaeef0'
            }
          },
          // 显示整数
          minInterval: 1,
          axisLabel: {
            textStyle: {
              color: '#787b7f'
            },
            fontFamily: 'Arial',
            fontSize: '14'
          }
        },
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#7498f7'
            }
          },
          height: '80%',
          barWidth: 13,
          data: data2
        }]
      }
      myLine.setOption(lineOption)
      myLine1.setOption(lineOption1)
      // echarts根据屏幕大小自适应
      setTimeout(function (){
        window.onresize = function () {
          myLine.resize();
          myLine1.resize();
        }
	    },200)
    },
    // drawPie: function (data, el) {
    //   var that = this
    //   var scale = 1
    //   var rich = {
    //     yellow: {color: '#ffc72b', fontSize: 18 * scale, padding: [5, 4], align: 'center'},
    //     total: {color: '#ff0000', fontSize: 20 * scale, align: 'center'},
    //     white: {color: '#f4ac45', align: 'center', fontSize: 14 * scale, padding: [21, 0]}
    //   }
    //   let myPie = echarts.init(el)
    //   var pieOption = {
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: '{a} <br/>{b} : {d}%'
    //     },
    //     legend: {
    //       orient: 'vertical',
    //       right: '40',
    //       top: 'center',
    //       itemGap: 30,
    //       itemWidth: 16,
    //       itemHeight: 6,
    //       padding: [0, 30, 0, 0],
    //       data: that.pieName,
    //       formatter: function (name) {
    //         for (var i = 0; i < data.length; i++) {
    //           if (name === data[i].name) {
    //             return name + '' + data[i].value
    //           }
    //         }
    //       }
    //     },
    //     series: [{
    //       name: '金额',
    //       type: 'pie',
    //       // center: [300, 130],
    //       radius: ['55%', '80%'],
    //       hoverAnimation: true,
    //       color: that.pieColor,
    //       label: {
    //         normal: {
    //           rich: rich
    //         }
    //       },
    //       data: data
    //     }]
    //   }
    //   myPie.setOption(pieOption)
    // }
    getDataFormat: function (max) {
      var number
      number = max * Math.pow(10, -4)
      return number.toFixed(2)
    },
    getMaxData: function (sortBy, param, list) {
      var max
      if (Array.isArray(list)) {
        max = list.sort((a, b) => {
          return a[sortBy] - b[sortBy]
        })
      }
      if (max) return max[max.length - 1][sortBy] - max[max.length - 1][param]
    },
    clone: function (obj) {
      var cloneObj
      if (typeof obj === 'object') {
        cloneObj = JSON.stringify(obj)
        return JSON.parse(cloneObj)
      }
    },
    handleCommand: function (command) {
      var that = this
      that.chainIdLine = command.id
      that.chainTypeLine = command.type
      if (Number(command.type) === 1) {
        that.contract_name = command.sales_contract[0].name
      } else if (Number(command.type) === 2) {
        that.contract_name = command.purchase_contract[0].name
      }
      that.$ajax.get('/api/oth/data_portrait/digital_model/?company_id=' + that.company_id + '&chain_id=' + that.chainIdLine).then(res => {
        that.bigData.receive_contract_data = res.data.s_contract
        if (res.data.p_contract) {
          that.bigData.payable_contract_data = res.data.p_contract
        }
        that.bigData.receive_info = res.data
        that.bigData.payable_info = res.data
        that.bigData.company_name = res.data.company_name
      })
    },
    // 查看链
    selectLine () {
      var that = this
      if (that.iconId === 1) {
        if (that.chainTypeLine === '1') {
          that.$router.push({
            path: '/linesure',
            query: {
              id: that.chainIdLine,
              iconId: that.iconId,
              blogId: that.blogId,
              is_friend: that.is_friend
            }
          })
        } else if (that.chainTypeLine === '2') {
          that.$router.push({
            path: '/sureline',
            query: {
              id: that.chainIdLine,
              iconId: that.iconId,
              blogId: that.blogId,
              is_friend: that.is_friend
            }
          })
        }
      } else {
        if (that.chainTypeLine === '1') {
          that.$router.push({
            path: '/linesure',
            query: {
              id: that.chainIdLine
            }
          })
        } else if (that.chainTypeLine === '2') {
          that.$router.push({
            path: '/sureline',
            query: {
              id: that.chainIdLine
            }
          })
        }
      }
    }
  },
  created () {
    var that = this
    that.localType = localStorage.role
    that.iconId = Number(that.$route.query.iconId)
    that.business_id = Number(that.$route.query.bid)
    that.blogId = Number(that.$route.query.bid)
    that.is_friend = eval(that.$route.query.is_friend)
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    // 获取自身信息
    that.$ajax.get('/api/oth/data_portrait/transaction_overview/?company_id=' + that.company_id).then((res) => {
      var totallist1 = []
      var totallist2 = []
      var totallist3 = []
      var totallist4 = []
      var monthGt = document.getElementById('month-gt')
      var monthGt1 = document.getElementById('not-back')
      that.unit1 = '元'
      that.unit2 = '元'
      that.drawLine(res.data.x_axis, res.data.receivable_list, res.data.payment_list, that.unit1)
    })
    // 取总计资产数据
    that.$ajax.get('/api/oth/data_portrait/digital_model/?company_id=' + that.company_id).then(res => {
      // p_contract = 应付
      if (res.data.p_contract) {
        that.bigData1.payable_contract_data = res.data.p_contract
      }
      // s_contract = 应收
      if (res.data.s_contract) {
        that.bigData1.receive_contract_data = res.data.s_contract
      }
      that.bigData1.receive_info = res.data
      that.bigData1.payable_info = res.data
      that.bigData1.company_name = res.data.company_name
    })
    that.$ajax.get('/api/chain/chain_list/?company_id=' + that.company_id).then(res => {
      that.selectList = res.data
    })
  }
}
</script>
<style lang='less' scoped>
@import url('../icon.css');
.all {
  .all_list {
    display: flex;
    flex-direction: row;
    margin: 0 22px 20px;
    .echarts-list {
      flex: 1;
      height:400px;
      background:rgba(255,255,255,1);
    }
  }
  .all_list-two {
    margin: 0 22px 20px;
    background:rgba(255,255,255,1);
  }
  .chart-title {
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height: 54px;
    padding: 0 30px;
    border-bottom: 1px solid rgba(220,220,220,1);
  }
  .show-chart {
    padding: 0 30px;
    width: 100%;
    margin: 0 auto;
    height: 300px;
  }
  .show-table {
    width:  90%;
    margin: 0 auto;
    margin-top: 20px;
    border: 1px solid #eaeaea;
    .table-title {
      display: flex;
      border-bottom: 1px solid #eaeaea;
      div {
        width: 14.3%;
        line-height: 36px;
        text-align: center;
      }
    }
    .table-line {
      height: 36px;
      font-size: 14px;
      line-height: 36px;
      display: flex;
      border-bottom: 1px solid #eaeaea;
      div {
        width: 14.3%;
        line-height: 36px;
        text-align: center;
      }
    }
    .table-line:last-of-type {
      border: none;
    }
  }
  .but_list {
    // border-top: 1px solid #eaeaea;
    .but {
      width: auto;
      padding: 0 10px;
      height: 28px;
      background: #eb6100;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 5px;
      margin-top: 30px;
    }
  }
  .showData {
    width: 100%;
    margin: 0 auto;
    // height: 850px;
    // border-top: 1px solid #eaeaea;
    padding-top: 30px;
    .content {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      .container {
        background: inherit;
      }
    }
  }
  .el-dropdown {
    z-index: 1;
    display: inline-block;
    margin-left: 25px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  #dropdown button:last-child {
    height: 32px;
  }
  .text {
    position: relative;
    margin-left: 200px;
    width: 90px;
    top: -26px;
    font-size: 20px;
    font-weight: 600;
  }
  .title_data {
    font-size: 16px;
    font-weight: bold;
    padding-left: 25px;
  }
  .title_data-line {
    padding-top: 20px;
    border-top: 1px solid #eaeaea;
  }
}
</style>
