<template>
  <div>
    <h3 class="c_item_cridit">交易信用</h3>
    <div class="c_all_box">
      <div class="c_pay_item">
        <div>
          <div :title="'应收：' + toTenThousand(receivable.total.value)">
            <span>应收(万元)：</span>
            <span class="yellow">{{toTenThousand(receivable.total.value)}}</span>
          </div>
          <!-- <div :title="'共计(笔)'+ receivable.total.num">
            <span>共计(笔)：</span>
            <span class="yellow">{{receivable.total.num}}</span>
          </div> -->
          <div :title="'总逾期率：' + (receivable.total.overdue_rate) + '%'"><span>总逾期率：</span><span class="yellow">{{(receivable.total.overdue_rate) + '%'}}</span></div>
        </div>
        <div>
          <div :title="'已收：' + toTenThousand(receivable.receive.value)"><span>已收(万元)：</span><span class="yellow">{{toTenThousand(receivable.receive.value)}}</span></div>
          <!-- <div :title="'共计(笔)：' + receivable.receive.num"><span>共计(笔)：</span><span class="yellow">{{receivable.receive.num}}</span></div> -->
          <div :title="'' + receivable.receive.overdue_rate">
            <!-- <span>逾期率：</span><span class="yellow">{{receivable.receive.overdue_rate}}</span> -->
          </div>
        </div>
      </div>
      <div class="c_pay_item">
        <div>
          <div :title="'应付：' + toTenThousand(payable.total.value)"><span>应付(万元)：</span><span class="blue">{{toTenThousand(payable.total.value)}}</span></div>
          <!-- <div><span>共计(笔)：</span><span class="blue">{{payable.total.num}}</span></div> -->
          <div :title="'总逾期率：' + (payable.total.overdue_rate) + '%'"><span>总逾期率：</span><span class="blue">{{(payable.total.overdue_rate) + '%'}}</span></div>
        </div>
        <div>
          <div :title="'已付：' + toTenThousand(payable.paid.value)"><span>已付(万元)：</span><span class="blue">{{toTenThousand(payable.paid.value)}}</span></div>
          <!-- <div :title="'共计(笔)：'+ payable.paid.num"><span>共计(笔)：</span><span class="blue">{{payable.paid.num}}</span></div> -->
          <div :title="'逾期率：' + payable.paid.overdue_rate">
            <!-- <span>逾期率：</span><span class="blue">{{payable.paid.overdue_rate}}</span> -->
            </div>
        </div>
      </div>
    </div>
    <!-- <h3 class="c_item_cridit">融资信用</h3> -->
    <div class="all">
      <!-- <div id="pie-month" class="show-chart"></div>
      <div id="pie-month1" class="show-chart"></div> -->
      <!-- <div class="show-table">
        <div class="table-title">
          <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
        </div>
        <div class="table-line" v-for="(item, index) in showList" :key='index'>
          <div>{{item.id}}</div>
          <div>{{item.create_time}}</div>
          <div>{{item.repayment_date}}</div>
          <div>{{item.repayment_status }}</div>
          <div>{{toTenThousand(item.value)}}</div>
          <div>{{toTenThousand(item.shortage)}}</div>
          <div>{{item.type === '0' ? '应收融资' : item.type === '1' ? '订单融资' : item.type === '2' ? '库存融资' : '贸易融资'}}</div>
          <div>{{item.business_name}}</div>
        </div>
        <div class="is_null" v-if="showList.length === 0">暂无数据</div>
      </div> -->
      <div class="financing_statistics">
        <!-- 企业供应链交易信用指数 -->
        <div class="list">
          <h3>企业供应链交易信用指数C(t)
            <div class="select">
              <span>年统计时间：</span>
              <select v-model="creditSelect" @change="creditChange(0, creditSelect)">
                <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
              </select>
            </div>
          </h3>
          <div class="list_chart">
            <div class="left">
              <disintegrationColumn :chartData='creditIndex' v-if="creditIndex.data1.length > 0" />
              <p class="none" v-if="creditIndex.data1.length === 0">暂无数据</p>
            </div>
          </div>
        </div>
        <div class="list">
          <h3>应收总池G(t)统计</h3>
          <div class="list_chart">
            <div class="left">
              <disintegrationColumn :chartData='gt_data' v-if="gt_data.data1.length > 0" />
              <p class="none" v-if="gt_data.data1.length === 0">暂无数据</p>
            </div>
          </div>
        </div>
        <div class="list">
          <h3>应付总池P(t)统计</h3>
          <div class="list_chart">
            <div class="left">
              <disintegrationColumn :chartData='disintegrationData' v-if="disintegrationData.data1.length > 0" />
              <p class="none" v-if="disintegrationData.data1.length === 0">暂无数据</p>
            </div>
          </div>
        </div>
        <!-- 库存变化率 -->
        <div class="list">
          <h3>库存变化率</h3>
          <div class="list_chart">
            <div class="left">
              <disintegration :chartData='inventoryChangeRate' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入echarts
// import echarts from 'echarts'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/lines')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
// 应付总池P(t)统计
import disintegrationColumn from '@/components/administration/blog/echarts/disintegrationColumn'
// 折线图
import disintegration from '@/components/administration/blog/disintegration'
export default {
  name: 'allProperty',
  data () {
    return {
      lineX: [],
      lineY: [],
      tableTitle: ['单号', '创建时间', '还款时间', '融资状态', '融资金额（万元）', '缺口金额（万元）', '融资类型', '收款方'],
      showList: [],
      payable: {
        paid: {
          num: 0,
          overdue_rate: 0,
          value: 0
        },
        total: {
          num: 0,
          overdue_rate: 0,
          value: 0
        },
        unpaid: {
          num: 0,
          value: 0
        }
      },
      receivable: {
        receive: {
          num: 0,
          overdue_rate: 0,
          value: 0
        },
        total: {
          num: 0,
          overdue_rate: 0,
          value: 0
        },
        unreceive: {
          num: 0,
          value: 0
        }
      },
      // 供应链交易信用-柱状图
      yearDate: ['2017', '2018', '2019'],
      creditSelect: '2019',
      // 企业供应链交易信用指数（2019年统计）
      creditIndex: {
        title: '企业供应链交易信用指数',
        data1: [],
        xAxis: [],
        color: ['#f3655d']
      },
      // 应收总池G(t)统计（2019年统计）-销售-黄色
      gt_data: {
        title: '应收总池G(t)统计',
        data1: [],
        xAxis: [],
        color: ['sandybrown']
      },
      // 应付总池P(t)统计-采购-蓝色
      disintegrationData: {
        title: '应付总池P(t)统计',
        data1: [],
        xAxis: [],
        color: ['#7498f7']
      },
      // 折线图
      inventoryChangeRate: {
        title: '库存变化率',
        color: ['#5793f3', 'sandybrown'],
        legend: ['原料库'],
        data1: [["2019-01-01", 10000000], ["2019-01-09", 9000000], ["2019-02-09", 13440000], ["2019-03-08", 9090000], ["2019-04-12", 14000000], ["2019-05-12", 10000000], ["2019-06-12", 6440000], ["2019-07-12", 10440000], ["2019-07-22", 13500000]]
      },
      company_id: ''
    }
  },
  components: {
    disintegrationColumn,
    disintegration
  },
  props: ['fType', 'fid', 'bid'],
  methods: {
    // 交易信用
    creditChange (i, item) {
      const that = this
      if (item === '全部') {
        // 应付总池P(t)统计-----柱状图-pie
        that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=2019').then(res => {
          that.creditIndex.xAxis = res.data.x_axis
          that.creditIndex.data1 = res.data.credit_data
          that.gt_data.xAxis = res.data.x_axis
          that.gt_data.data1 = res.data.gt_data
          that.disintegrationData.xAxis = res.data.x_axis
          that.disintegrationData.data1 = res.data.payable_data
        })
      } else {
        // 应付总池P(t)统计-----柱状图-pie
        that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=' + item).then(res => {
          that.creditIndex.xAxis = res.data.x_axis
          that.creditIndex.data1 = res.data.credit_data
          that.gt_data.xAxis = res.data.x_axis
          that.gt_data.data1 = res.data.gt_data
          that.disintegrationData.xAxis = res.data.x_axis
          that.disintegrationData.data1 = res.data.payable_data
        })
      }
    },
    convert (data) {
      var num = Number(data)
      num = num * Math.pow(10, -4)
      return this.toTenThousand(num)
    },
    drawLine: function (el, x, y) {
      let myLine = echarts.init(el)
      var lineOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          padding: [5, 10]
        },
        legend: {
          right: 30,
          bottom: 0,
          height: '90%'
          // data: ['数额'],
        },
        animation: false,
        grid: {
          left: 60,
          bottom: 40
        },
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
          boundaryGap: false,
          splitNumber: 7,
          data: x
        },
        yAxis: {
          name: '元',
          nameTextStyle: {
            color: '#eb6100'
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
          }
        },
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#eb6100'
            }
          },
          height: '80%',
          data: y
        }]
      }
      myLine.setOption(lineOption)
    },
    toTenThousand (data) {
      var num = Number(data)
      num = num * Math.pow(10, -4)
      return this.toThousands(num)
    },
    handlePersent (arr, num) {
      let s = 0
      arr.forEach(val => {
        s += val.value
      })
      return ((num / s) * 100).toFixed(2) + '%'
    },
    drawPie: function (data, el) {
      var that = this
      var scale = 1
      var rich = {
        yellow: {color: '#ffc72b', fontSize: 18 * scale, padding: [5, 4], align: 'center'},
        total: {color: '#ff0000', fontSize: 20 * scale, align: 'center'},
        white: {color: '#f4ac45', align: 'center', fontSize: 14 * scale, padding: [21, 0]}
      }
      let myPie = echarts.init(el)
      var pieOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        // #7498f7 蓝色 #eec557 黄色 #f3655d 红色 #44e9a7 绿色
        color: ['#7498f7', '#eec557', '#f3655d', '#44e9a7', 'sandybrown'],
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 16
        },
        legend: {
          orient: 'vertical',
          left: '0',
          top: 'center',
          width: '100%',
          itemGap: 20,
          itemWidth: 16,
          itemHeight: 16,
          padding: [0, -1, 0, 0],
          data: that.pieName,
          formatter: function (name) {
            for (var i = 0; i < data.length; i++) {
              if (name === data[i].name) {
                if (i === 0) {
                  return '   ' + name + ': ' + Number(data[i].value) + ' 笔    ' + that.handlePersent(data, Number(data[i].value))
                } else {
                  return '   ' + name + ':        ' + Number(data[i].value) + ' 笔    ' + that.handlePersent(data, Number(data[i].value))
                }
              }
            }
          }
        },
        series: [{
          name: '',
          type: 'pie',
          // center: [300, 130],
          radius: ['22%', '32%'],
          hoverAnimation: true,
          color: that.pieColor,
          label: {
            normal: {
              rich: rich
            }
          },
          data: data
        }]
      }
      myPie.setOption(pieOption)
    }
  },
  mounted () {
    var that = this
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    this.$ajax.get('/api/oth/asset/robot/?company_id=' + that.company_id).then(res => {
      if (res.status === 200) {
        // 应收
        that.receivable.total.value = res.data.receivable_sum
        // 总逾期率
        that.receivable.total.overdue_rate = (res.data.s_over_rate.over_rate * 100).toFixed(2) 
        // 已收
        that.receivable.receive.value = res.data.received_sum
        // 未收
        that.receivable.unreceive.value = res.data.un_received_sum
        // 应付
        that.payable.total.value = res.data.payable_sum
        // 总逾期率
        that.payable.total.overdue_rate = (res.data.r_over_rate.over_rate * 100).toFixed(2) 
        // 已付
        that.payable.paid.value = res.data.payable_sum
        // 未付
        that.payable.unpaid.value = res.data.un_paid_sum
      }
    })
    // 融资信用
    that.$ajax.get('/api/oth/loan_statistics/loan_credit_statistics/?company_id=' + that.company_id).then(res => {
      console.log(res)
      var totalpie = []
      totalpie[0] = {value: res.data.repayment_status.advanced_paid, name: '提前还款'}
      totalpie[1] = {value: res.data.repayment_status.normal, name: '正常'}
      totalpie[2] = {value: res.data.repayment_status.overdue, name: '逾期'}
      totalpie[3] = {value: res.data.repayment_status.bad_debt, name: '坏账'}
      var pieMonth = document.getElementById('pie-month')
      this.drawPie(totalpie, pieMonth)
      var totalpie1 = []
      totalpie1[0] = {value: res.data.extended_status.extended, name: '展期交易'}
      totalpie1[1] = {value: res.data.extended_status.not_extended, name: '非展期交易'}
      var pieMonth1 = document.getElementById('pie-month1')
      this.drawPie(totalpie1, pieMonth1)
      that.showList = res.data.fa_list
    })
    // 应付总池P(t)统计-----柱状图-pie
    that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=2019').then(res => {
      that.creditIndex.xAxis = res.data.x_axis
      that.creditIndex.data1 = res.data.credit_data
      that.gt_data.xAxis = res.data.x_axis
      that.gt_data.data1 = res.data.gt_data
      that.disintegrationData.xAxis = res.data.x_axis
      that.disintegrationData.data1 = res.data.payable_data
    })
  }
}
</script>
<style lang='less' scoped>
// @media screen and (max-width:1340px)
// {
//   .c_pay_item {
//     transform: scale(0.8);
//   }
// }
// @media screen and (min-width:1340px) and (max-width:1400px)
// {
//   .c_pay_item {
//     transform: scale(0.8);
//   }
// }
// @media screen and (min-width: 1400px) and (max-width: 1600px){
//   .c_pay_item {
//     transform: scale(0.8);
//   }
// }
@import url('./icon.css');
.c_item_cridit{
  height: 30px;
  font-weight: 700;
  font-style: normal;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  border-left: 5px solid #eb6100;
  &:nth-of-type(2){
    position: absolute;
    top: 550px;
  }
}
.c_all_box{
  margin-top: 30px;
  display: flex;
  .c_pay_item{
    display: inline-block;
    width: 45%;
    height: 180px;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px 20px;
    margin: 0 10px;
    div{
      line-height: 46px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: default;
      display: flex;
      justify-content: space-around;
      &>div {
        width: 24%;
        margin: 0 10px;
        display: flex;
        justify-content: space-between;
      }
      &>div:nth-of-type(1) {
        width: 40%;
      }
      &>div:nth-of-type(3) {
        width: 29%;
      }
    }
    &>div:first-child {
      div {
        span {
          font-weight: bolder;
        }
      }
    }
    &:nth-of-type(1){
      border-top: 4px solid #eb6100;
      margin-right: 30px;
    }
    &:nth-of-type(2){
      border-top: 4px solid #0c8dff;
    }
    .yellow{
      max-width: 65%;
      vertical-align: middle;
      color: #eb6100;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .blue{
      max-width: 65%;
      vertical-align: middle;
      color: #0c8dff;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.financing_statistics {
  margin-top: 30px;
  .list {
    margin-bottom: 30px;
    h3 {
      height: 30px;
      font-weight: 700;
      font-style: normal;
      line-height: 30px;
      padding-left: 20px;
      font-size: 16px;
      border-left: 5px solid #eb6100;
      position: relative;
      .select {
        position: absolute;
        bottom: 0;
        right: 60px;
        select {
          width: 150px;
          height: 30px;
          background: #fff;
          border: 1px solid #cccccc;
          color: #666;
          border-radius: 4px;
          font-size: 12px;
          padding: 0 10px;
          outline: none;
          cursor: pointer;
        }
      }
    }
    .list_chart {
      height: 350px;
      display: flex;
      flex-direction: row;
      &>div {
        flex: 1;
      }
      .none {
        text-align: left;
        padding: 30px;
        font-size: 14px;
        margin: 0 auto;
        font-weight: bold;
      }
    }
  }
}
.all {
  width: 100%;
  .show-chart {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    height: 400px;
  }
  .show-table {
    width: 100%;
    margin: 0 auto;
    margin: 20px 0 30px;
    border: 1px solid #eaeaea;
    .table-title {
      display: flex;
      border-bottom: 1px solid #eaeaea;
      background: #eaeaea;
      color: #999;
      div {
        width: 14.3%;
        line-height: 43px;
        text-align: center;
      }
    }
    .c_all_box{
      .c_pay_item{
        display: inline-block;
        width: 400px;
        height: 250px;
        border: 1px solid #ccc;
        &:nth-of-type(1){
          border-top: 4px solid #eb6100;
        }
        &:nth-of-type(2){
          border-top: 4px solid #0c8dff;
        }
      }
    }
    .table-line {
      height: 43px;
      font-size: 14px;
      line-height: 43px;
      display: flex;
      border-bottom: 1px dashed #ccc;
      .detail {
        color: #eb6100;
        padding-bottom:1px;
        border-bottom:1px solid #eb6100;
      }
      div {
        width: 14.3%;
        // line-height: 36px;
        text-align: center;
        border-right:1px solid #eaeaea;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div:nth-child(8) {
        border-right: 0;
      }
      &>div:nth-of-type(4) {
        text-align: right;
        padding-right: 15px
      }
      &>div:nth-of-type(5) {
        text-align: right;
        padding-right: 15px
      }
    }
    .table-line:last-of-type {
      border: none;
    }
    .is_null {
      width: 100%;
      line-height: 43px;
      text-align: center;
      color: #999;
    }
  }
}
</style>
