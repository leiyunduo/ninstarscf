<template>
  <div id="transaction_statistics">
    <div class="transaction_statistics">
      <div class="list">
        <h3 class="title">供应链交易数据统计概览</h3>
        <div class="echarts_list">
          <div class="list_nav">
            <h3>订单情况</h3>
            <div class="select">
              <selectOption :value="'2019'" @input='listerChild' />
            </div>
          </div>
          <div class="list_data">
            <pieChart :chartData='orderStatus' v-if='orderStatus.data.length > 0' />
          </div>
        </div>
        <div class="echarts_list">
          <div class="list_nav">
            <h3>产生订单总额</h3>
            <div class="select">
              <selectOption :value="'2019'" @input='listerChild1' />
            </div>
          </div>
          <div class="list_data">
            <column :chartData='orderGram' v-if='orderGram.data.length > 0' />
          </div>
          <div class="list_data" style="padding: 30px;">
            <div class="table-title">
              <div></div>
              <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
            </div>
            <div class="table-line">
              <div>产生订单总额</div>
              <div v-for="(item, index) in orderGram.data" :key='index' :title='toThousands(item)'>{{toThousands(item)}}</div>
            </div>
          </div>
        </div>
        <div class="echarts_list">
          <div class="list_nav">
            <h3>产生订单总数</h3>
            <div class="select">
              <selectOption :value="'2019'" @input='listerChild2' />
            </div>
          </div>
          <div class="list_data">
            <column :chartData='orderColumnNum' v-if='orderColumnNum.data.length > 0' />
          </div>
          <div class="list_data" style="padding: 30px;">
            <div class="table-title">
              <div></div>
              <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
            </div>
            <div class="table-line">
              <div>产生订单总数</div>
              <div v-for="(item, index) in orderColumnNum.data" :key='index'>{{item}}</div>
            </div>
          </div>
        </div>
        <div class="echarts_list">
          <div class="list_nav">
            <h3>流动资金缺口情况</h3>
            <div class="select">
              <selectOption :value="'2019'" @input='listerChild3' />
            </div>
          </div>
          <div class="list_data">
            <pieChart :chartData='fundingGap' v-if='fundingGap.data.length > 0' />
          </div>
          <div class="list_data" style="border-top: 1px solid #dddddd;">
            <column :chartData='fundingGram' v-if='fundingGram.data.length > 0' />
          </div>
          <div class="list_data" style="padding: 30px;">
            <div class="table-title">
              <div></div>
              <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
            </div>
            <div class="table-line">
              <div>流动资金产生金额</div>
              <div v-for="(item, index) in fundingGram.data" :key='index' :title='toThousands(item)'>{{toThousands(item)}}</div>
            </div>
          </div>
        </div>
        <div class="echarts_list">
          <div class="list_nav">
            <h3>交易逾期情况</h3>
            <div class="select">
              <selectOption :value="'2019'" @input='listerChild4' />
            </div>
          </div>
          <div class="list_data">
            <div class="left">
              <div v-if="payableBeOverdue.data.length > 0">
                <p>采购交易订单总数：<span>{{payableBeOverdue.data[0].value + payableBeOverdue.data[1].value}}（笔）</span></p>
                <p>采购结算逾期订单笔数：<span>{{payableBeOverdue.data[0].value}}（笔）</span></p>
                <p>采购按时结算订单笔数：<span>{{payableBeOverdue.data[1].value}}（笔）</span></p>
              </div>
            </div>
            <pieChart :chartData='payableBeOverdue' v-if='payableBeOverdue.data.length > 0' />
          </div>
          <div class="list_data" style="border-top: 1px solid #dddddd;">
            <div class="left">
              <div v-if="receivedBeOverdue.data.length > 0">
                <p>销售交易订单总数：<span>{{receivedBeOverdue.data[0].value + receivedBeOverdue.data[1].value}}（笔）</span></p>
                <p>销售结算逾期订单笔数：<span>{{receivedBeOverdue.data[0].value}}（笔）</span></p>
                <p>销售按时结算订单笔数：<span>{{receivedBeOverdue.data[1].value}}（笔）</span></p>
              </div>
            </div>
            <pieChart :chartData='receivedBeOverdue' v-if='receivedBeOverdue.data.length > 0' />
          </div>
        </div>
        <div class="echarts_list">
          <div class="list_nav no-nav">
            <h3 v-for="(item, index) in vableList" :key="index" :class="{li_actives: li_active === index}" @click="ulClick(index, 0)">{{item}}</h3>
            <div class="select">
              <selectOption :value="'2019'" @input='listerChild5' />
            </div>
          </div>
          <div class="list_data" v-if="li_active === 0">
            <pieChart :chartData='payableAccepted' v-if='payableAccepted.data.length > 0' />
          </div>
          <div class="list_data" v-if="li_active === 1">
            <pieChart :chartData='receivableAccepted' v-if='receivableAccepted.data.length > 0' />
          </div>
        </div>
        <div class="echarts_list">
          <div class="list_nav">
            <h3>贷款状况</h3>
            <div class="select">
              <selectOption :value="'2019'" @input='listerChild6' />
            </div>
          </div>
          <div class="list_data">
            <column :chartData='balanceData' v-if="balanceData.data.length > 0 || balanceData.data1.length > 0 || balanceData.data2.length > 0" />
          </div>
          <div class="list_data" style="padding: 30px;">
            <div class="table-title">
              <div></div>
              <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
            </div>
            <div class="table-line">
              <div>新增贷款</div>
              <div v-for="(item, index) in balanceData.data" :key='index' :title='toThousands(item)'>{{toThousands(item)}}</div>
            </div>
            <div class="table-line">
              <div>偿还贷款</div>
              <div v-for="(item, index) in balanceData.data1" :key='index' :title='toThousands(item)'>{{toThousands(item)}}</div>
            </div>
            <div class="table-line">
              <div>贷款余额</div>
              <div v-for="(item, index) in balanceData.data2" :key='index' :title='toThousands(item)'>{{toThousands(item)}}</div>
            </div>
          </div>
          <div class="list_data">
            <h3>不良状况统计</h3>
            <column :chartData='overdue_loan_data' v-if="overdue_loan_data.data.length > 0" />
          </div>
          <div class="list_data" style="padding: 30px;">
            <div class="table-title">
              <div></div>
              <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
            </div>
            <div class="table-line">
              <div>不良状况统计</div>
              <div v-for="(item, index) in overdue_loan_data.data" :key='index' :title='toThousands(item)'>{{toThousands(item)}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="title">供应链交易大数据画像</div>
        <div class="echarts_list">
          <div class="list_nav">
            <h3>智能助贷机器人</h3>
            <div class="select" style="padding-top:14px;">
              <el-select v-model="robot_data" size='mini' @change="robotChange(robot_data)">
                <el-option
                  v-for="item in timeList"
                  :key="item.key"
                  :label="item.title"
                  :value="item.key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="list_data">
            <robot :timezone='timezone' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 下拉组件
import selectOption from './select_option.vue' 
// 饼图
import pieChart from './echarts/pie_chart'
// 柱状图
import column from './echarts/column'
// 智能助贷机器人
import robot from './n_robot.vue'
export default {
  name: 'transactionStatistics',
  data () {
    return {
      company_id: '',
      tableTitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 饼图----订单
      orderStatus: {
        titles: '订单情况（年统计）',
        legend: ['已完成订单', '未完成订单', '取消订单'],
        data: [],
        index: 1,
        color: ['#3AA0FF', '#FAD337', '#F2637B', '#4ECB73']
      },
      orderGram: {
        titles: '订单情况（年统计）',
        legend: ['产生订单总额'],
        xAxis: [],
        data: [],
        index: 1,
        num: 1,
        name: '（元）',
        color: ['#3AA0FF']
      },
      // 柱状图----订单----产生订单个数--
      orderColumnNum: {
        titles: '订单情况（年统计）',
        legend: ['产生订单总数'],
        xAxis: [],
        data: [],
        index: 1,
        name: '（个）',
        num: 0,
        color: ['#3AA0FF']
      },
      // 流动资金缺口情况
      fundingGap: {
        titles: '流动资金缺口情况',
        legend: ['融资资金', '自筹资金', '未解决资金'],
        data: [],
        index: 2,
        color: ['#3AA0FF', '#FAD337', '#F2637B', '#4ECB73']
      },
      // 流动资金缺口情况
      fundingGram: {
        titles: '流动资金缺口情况',
        legend: ['流动资金产生金额'],
        xAxis: [],
        data: [],
        index: 1,
        num: 1,
        name: '（元）',
        color: ['#4ECB73']
      },
      // 应付交易逾期情况
      payableBeOverdue: {
        titles: '交易逾期情况',
        legend: ['按时结算订单', '结算逾期订单'],
        data: [],
        index: 1,
        color: ['#F2637B', '#3AA0FF', '', '']
      },
      // 应收交易逾期情况
      receivedBeOverdue: {
        titles: '交易逾期情况',
        legend: ['按时结算订单', '结算逾期订单'],
        data: [],
        index: 1,
        color: ['#F2637B', '#FAD337', '', '']
      },
      vableList: ['应付账款/已付账款', '应收账款/已收账款'],
      li_active: 0,
      // 应收账款/已收账款-复合饼图
      receivableAccepted: {
        titles: '应收账款/已收账款',
        legend: ['正常已收账款', '逾期已收账款', '正常未收账款', '逾期未收账款'],
        data: [],
        index: 2,
        color: ['#FAD337', '#36CBCB', '#4ECB73', '#F2637B']
      },
      // 应付账款/已付账款-复合饼图
      payableAccepted: {
        titles: '应付账款/已付账款',
        legend: ['正常已付账款', '逾期已付账款', '正常未付账款', '逾期未付账款'],
        data: [],
        index: 2,
        color: ['#3AA0FF', '#36CBCB', '#4ECB73', '#F2637B']
      },
      // 贷款统计   余额
      balanceData: {
        titles: '贷款状况',
        name: '（元）',
        legend: ['新增贷款', '偿还贷款', '贷款余额'],
        data: [],
        data1: [],
        data2: [],
        xAxis: [],
        index: 2,
        num: 1,
        color: ['#3AA0FF', '#FAD337', '#F2637B']
      },
      overdue_loan_data: {
        titles: '不良状况统计',
        data: [],
        legend: ['不良状况'],
        xAxis: [],
        index: 1,
        name: '（元）',
        num: 1,
        color: ['#f3655d']
      },
      // 智能助贷机器人
      timeList: [
        {title: '总览', key: null},
        {title: '第一季度', key: '&time_zone=Q1'},
        {title: '第二季度', key: '&time_zone=Q2'},
        {title: '第三季度', key: '&time_zone=Q3'},
        {title: '第四季度', key: '&time_zone=Q4'},
        {title: '上半年', key: '&time_zone=Y1'},
        {title: '下半年', key: '&time_zone=Y2'},
        {title: '2018年', key: '&time_zone=2018'}
      ],
      robot_data: '总览',
      timezone: ''
    }
  },
  components: {
    selectOption,
    pieChart,
    column,
    robot
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
  },
  methods: {
    // 智能助贷机器人
    robotChange (data) {
      let that = this
      that.timezone = data || ''
    },
    // listName
    ulClick (i, o) {
      const that = this
      if (o === 0) {
        that.li_active = i
      } if (o === 1) {
        that.li_active1 = i
      }
    },
    // 订单情况
    listerChild (data) {
      const that = this
      if (data) {
        // 订单情况------饼图-pie
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + data).then(res => {
          that.orderStatus.data = res.data
        })
      }
    },
    // 订单情况------完成订单-总额
    listerChild1 (data) {
      const that = this
      // 订单情况------完成订单-总额
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' + '&time_unit=month' + '&year=' + data).then(res => {
        // x轴
        that.orderGram.xAxis = res.data.x_axis
        // 完成订单-总额
        that.orderGram.data = res.data.order_value
      })
    },
    // 订单情况------完成订单-总额
    listerChild2 (data) {
      const that = this
      // 订单情况------完成订单-总额
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' + '&time_unit=month' + '&year=' + data).then(res => {
        // x轴
        that.orderColumnNum.xAxis = res.data.x_axis
        // 订单个数
        that.orderColumnNum.data = res.data.order_count
      })
    },
    // 流动资金缺口情况
    listerChild3 (data) {
      const that = this
      // 流动资金缺口情况------饼图-pie
      that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + data).then(res => {
        that.fundingGap.data = res.data
      })
      // -------流动资金缺口情况------柱状图-column
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' +'&contract_type=2' + '&time_unit=month' + '&year=' + data).then(res => {
        // x轴
        that.fundingGram.xAxis = res.data.x_axis
        // 融资资金
        that.fundingGram.data = res.data.order_value
      })
    },
    // 逾期情况
    listerChild4 (data) {
      const that = this
      // 逾期情况------饼图-overdue_pie
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=overdue_pie' + '&year=' + data).then(res => {
        // 采购订单---payable_amount
        that.payableBeOverdue.data = res.data.payable_order
        // 销售订单---received_amount
        that.receivedBeOverdue.data = res.data.received_order
      })
    },
    // 应收账款/已收账款-应付账款/已付账款
    listerChild5 (data) {
      const that = this
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=account_amount_pie' + '&year=' + data).then(res => {
        // 应收账款/已收账款
        that.receivableAccepted.data = res.data.reveived_data.outer
        // 应付账款/已付账款
        that.payableAccepted.data = res.data.payable_data.outer
      })
    },
    // 贷款状况
    listerChild6 (data) {
      const that = this
      that.$ajax.get('/api/oth/loan_statistics/loan_value_statistics/?company_id=' + that.company_id + '&year=' + data).then(res => {
        that.balanceData.xAxis = res.data.x_axis
        that.balanceData.data = res.data.new_loan_data
        that.balanceData.data1 = res.data.repayment_loan_data
        that.balanceData.data2 = res.data.remainder_loan_data
        that.overdue_loan_data.xAxis = res.data.x_axis
        that.overdue_loan_data.data = res.data.overdue_loan_data
      })
    },
    // 饼图
    Pie (t) {
      const that = this
      // // 逾期情况------饼图-overdue_pie
      // that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=overdue_pie' + '&year=' + '2017').then(res => {
      //   // 采购订单---payable_amount
      //   that.payableBeOverdue.data = res.data.payable_order
      //   that.pieChart('payableBeOverdue', that.payableBeOverdue.legend, that.payableBeOverdue.titles, that.payableBeOverdue.data, that.payableBeOverdue.color)
      //   // 销售订单---received_amount
      //   that.receivedBeOverdue.data = res.data.received_order
      //   that.pieChart('receivedBeOverdue', that.receivedBeOverdue.legend, that.receivedBeOverdue.titles, that.receivedBeOverdue.data, that.receivedBeOverdue.color)
      // })
      // // 应收账款/已收账款------饼图-account_amount_pie
      // that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=account_amount_pie' + '&year=' + '2017').then(res => {
      //   // 应付账款/已付账款
      //   that.payableAccepted.data = res.data.payable_data.outer
      //   that.pieChart('payableAccepted', that.payableAccepted.legend, that.payableAccepted.titles, that.payableAccepted.data, that.payableAccepted.color)
      //   // 应收账款/已收账款
      //   that.receivableAccepted.data = res.data.reveived_data.outer
      //   that.pieChart('receivableAccepted', that.receivableAccepted.legend, that.receivableAccepted.titles, that.receivableAccepted.data, that.receivableAccepted.color)
      // })
    },
  }
}
</script>

<style lang="less" scoped>
#transaction_statistics {
  .transaction_statistics {
    .list {
      .title {
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(51,51,51,1);
        padding-bottom: 19px;
      }
      .echarts_list {
        width: 100%;
        max-width: 1200px;
        height:auto;
        background:rgba(255,255,255,1);
        margin-bottom: 20px;
        .list_nav {
          border-bottom: 1px solid rgba(221,221,221,1);
          height: 54px;
          padding: 0 30px;
          h3 {
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height: 54px;
            float: left;
          }
          h2 {
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height: 54px;
            float: left;
          }
          .li_actives {
            border-bottom: 2px solid #eb6100;
            color: #eb6100;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:bold;
            color:rgba(235,97,0,1);
          }
          .select {
            float: right;
            select {
              min-width: 150px;
              width: auto;
              height: 30px;
              background: #fff;
              border: 1px solid #cccccc;
              color: #666;
              border-radius: 4px;
              font-size: 12px;
              padding: 0 10px;
              outline: none;
              cursor: pointer;
              margin-top: 14px;
            }
          }
        }
        .no-nav {
          h3 {
            margin-right: 50px;
            line-height: 52px;
            padding: 0 3px;
            cursor: pointer;
          }
          .select {
            select {
              min-width: 150px;
              width: auto;
              height: 30px;
              background: #fff;
              border: 1px solid #cccccc;
              color: #666;
              border-radius: 4px;
              font-size: 12px;
              padding: 0 10px;
              outline: none;
              cursor: pointer;
              margin-top: 14px;
            }
          }
        }
        .list_data {
          position: relative;
          h3 {
            height: 54px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height: 54px;
            padding: 0 30px;
            border-bottom: 1px solid rgba(221,221,221,1);
          }
          .left {
            position: absolute;
            top: 10px;
            left: 30px;
            width: 300px;
            height: 300px;
            p {
              width: 300px;
              line-height: 26px;
              font-size: 14px;
            }
          }
          .table-title {
            display: flex;
            height:54px;
            background:rgba(250,250,250,1);
            flex-direction: row;
            border-bottom: 1px solid rgba(221,221,221,1);
            div {
              flex: 1;
              height: 100%;
              color: #333;
              text-align: right;
              line-height: 54px;
            }
            div {
              padding-right: 16px;
            }
          }
          .table-line {
            display: flex;
            margin: 0 auto;
            height: 54px;
            border-right: none;
            border-bottom: 1px solid rgba(221,221,221,1);
            .detail {
              color: #eb6100;
              padding-bottom:1px;
              border-bottom:1px solid #eb6100
            }
            div {
              flex: 1;
              height: 100%;
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(102,102,102,1);
              text-align: right;
              line-height: 54px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            div {
              padding-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
