<template>
  <div id="loan_status_list">
    <div class="loan_status" style="page-break-after:always;">
      <h3>贷款状况统计</h3>
      <div class="order_left">
        <p>2017年统计</p>
        <div id="loan_status" style="height:400px;" v-if='Number(prints_n) !== 1'></div>
        <img :src="loan_status_img" alt="" v-if='Number(prints_n) === 1'>
      </div>
      <div class="order_left">
        <p>2018年统计</p>
        <div id="loan_status1" style="height:400px;" v-if='Number(prints_n) !== 1'></div>
        <img :src="loan_status1_img" alt="" v-if='Number(prints_n) === 1'>
      </div>
      <div class="order_left">
        <p>2019年统计</p>
        <div id="loan_status2" style="height:400px;" v-if='Number(prints_n) !== 1'></div>
        <img :src="loan_status2_img" alt="" v-if='Number(prints_n) === 1'>
      </div>
    </div>
    <div class="loan_status" style="page-break-after:always;">
      <h3>贷款状况统计</h3>
      <div class="list_chart order_lists" style="padding-left: 17px;">
        <div style="padding: 10px 0;page-break-after:always;">
          <p style="padding-bottom:20px;">2017年统计</p>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第一季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第二季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第三季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第四季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 10px 0;page-break-after:always;">
          <p style="padding-bottom:20px;">2018年统计</p>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第一季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData1.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData1.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData1.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第二季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData1.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData1.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData1.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第三季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData1.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData1.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData1.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第四季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData1.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData1.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData1.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 10px 0;page-break-after:always;">
          <p style="padding-bottom:20px;">2019年统计</p>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第一季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData2.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData2.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData2.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第二季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData2.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData2.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData2.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第三季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData2.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData2.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData2.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第四季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>新增贷款</div>
                <div v-for="(item, index) in balanceData2.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>偿还贷款</div>
                <div v-for="(item, index) in balanceData2.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>贷款余额</div>
                <div v-for="(item, index) in balanceData2.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loan_status" style="page-break-after:always;">
      <h3>不良状况统计</h3>
      <div class="order_left">
        <p>2017年统计</p>
        <div id="bad_condition" style="height:400px;" v-if='Number(prints_n) !== 1'></div>
        <img :src="bad_condition_img" alt="" v-if='Number(prints_n) === 1'>
      </div>
      <div class="order_left">
        <p>2018年统计</p>
        <div id="bad_condition1" style="height:400px;" v-if='Number(prints_n) !== 1'></div>
        <img :src="bad_condition1_img" alt="" v-if='Number(prints_n) === 1'>
      </div>
      <div class="order_left">
        <p>2019年统计</p>
        <div id="bad_condition2" style="height:400px;" v-if='Number(prints_n) !== 1'></div>
        <img :src="bad_condition2_img" alt="" v-if='Number(prints_n) === 1'>
      </div>
    </div>
    <div class="loan_status" style="page-break-after:always;">
      <h3>不良状况统计</h3>
      <div class="list_chart order_lists" style="padding-left: 17px;">
        <div style="padding: 10px 0;">
          <p style="padding-bottom:20px;">2017年统计</p>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第一季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第二季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第三季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第四季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 10px 0;">
          <p style="padding-bottom:20px;">2018年统计</p>
          <div class="left-table" style="page-break-after:always;">
            <div class="list_data">
              <div class="title-table-jidu">第一季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第二季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第三季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第四季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 10px 0;">
          <p style="padding-bottom:20px;">2019年统计</p>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第一季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第二季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
          <div class="left-table">
            <div class="list_data">
              <div class="title-table-jidu">第三季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
            <div class="list_data">
              <div class="title-table-jidu">第四季度</div>
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>不良状况统计</div>
                <div v-for="(item, index) in bad_condition.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'loanStatus',
  data () {
    return {
      company_id: '',
      tableTitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 贷款统计   余额
      balanceData: {
        title: '贷款余额情况',
        legend: ['新增贷款', '偿还贷款', '贷款余额'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#7498f7', 'sandybrown', '#f3655d']
      },
      loan_status_img: '',
      balanceData1: {
        title: '贷款余额情况',
        legend: ['新增贷款', '偿还贷款', '贷款余额'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#7498f7', 'sandybrown', '#f3655d']
      },
      loan_status1_img: '',
      balanceData2: {
        title: '贷款余额情况',
        legend: ['新增贷款', '偿还贷款', '贷款余额'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#7498f7', 'sandybrown', '#f3655d']
      },
      loan_status2_img: '',
      bad_condition: {
        title: '不良状况统计',
        data: [],
        xAxis: [],
        data1: [],
        xAxis1: [],
        data2: [],
        xAxis2: [],
        color: ['#f3655d']
      },
      bad_condition_img: '',
      bad_condition1_img: '',
      bad_condition2_img: ''
    }
  },
  props: ['prints_n'],
  watch: {
    'prints_n' (n, o) {
      const that = this
      if (Number(n) === 1) {
        that.columnImg()
      }
    }
  },
  mounted () {
    const that = this
    that.company_id = localStorage.id
    // that.company_id = 10100000002
    that.loanStatus()
  },
  methods: {
    // 贷款统计
    loanStatus () {
      const that = this
      that.$ajax.get('/api/oth/loan_statistics/loan_value_statistics/?company_id=' + that.company_id + '&year=' + '2017').then(res => {
        that.balanceData.xAxis = res.data.x_axis
        that.balanceData.data1 = res.data.new_loan_data
        that.balanceData.data2 = res.data.repayment_loan_data
        that.balanceData.data3 = res.data.remainder_loan_data
        that.columnChart('loan_status', that.balanceData.xAxis, that.balanceData.data1, that.balanceData.data2, that.balanceData.data3, that.balanceData.color)
        that.bad_condition.xAxis = res.data.x_axis
        that.bad_condition.data = res.data.overdue_loan_data
        that.columnChart1('bad_condition', that.bad_condition.xAxis, that.bad_condition.title, that.bad_condition.data, that.bad_condition.color)
      })
      that.$ajax.get('/api/oth/loan_statistics/loan_value_statistics/?company_id=' + that.company_id + '&year=' + '2018').then(res => {
        that.balanceData1.xAxis = res.data.x_axis
        that.balanceData1.data1 = res.data.new_loan_data
        that.balanceData1.data2 = res.data.repayment_loan_data
        that.balanceData1.data3 = res.data.remainder_loan_data
        that.columnChart('loan_status1', that.balanceData1.xAxis, that.balanceData1.data1, that.balanceData1.data2, that.balanceData1.data3, that.balanceData1.color)
        that.bad_condition.xAxis1 = res.data.x_axis
        that.bad_condition.data1 = res.data.overdue_loan_data
        that.columnChart1('bad_condition1', that.bad_condition.xAxis1, that.bad_condition.title, that.bad_condition.data1, that.bad_condition.color)
      })
      that.$ajax.get('/api/oth/loan_statistics/loan_value_statistics/?company_id=' + that.company_id + '&year=' + '2019').then(res => {
        that.balanceData2.xAxis = res.data.x_axis
        that.balanceData2.data1 = res.data.new_loan_data
        that.balanceData2.data2 = res.data.repayment_loan_data
        that.balanceData2.data3 = res.data.remainder_loan_data
        that.columnChart('loan_status2', that.balanceData2.xAxis, that.balanceData2.data1, that.balanceData2.data2, that.balanceData2.data3, that.balanceData2.color)
        that.bad_condition.xAxis2 = res.data.x_axis
        that.bad_condition.data2 = res.data.overdue_loan_data
        that.columnChart1('bad_condition2', that.bad_condition.xAxis2, that.bad_condition.title, that.bad_condition.data2, that.bad_condition.color)
      })
    },
    columnImg () {
      const that = this
      // 2017
      let a = echarts.init(document.getElementById('loan_status'))
      var a1 = a.getDataURL()
      that.loan_status_img = a1
      // 2018
      let b = echarts.init(document.getElementById('loan_status1'))
      var b1 = b.getDataURL()
      that.loan_status1_img = b1
      // 2019
      let c = echarts.init(document.getElementById('loan_status2'))
      var c1 = c.getDataURL()
      that.loan_status2_img = c1
      // 2017
      let d = echarts.init(document.getElementById('bad_condition'))
      var d1 = d.getDataURL()
      that.bad_condition_img = d1
      // 2018
      let e = echarts.init(document.getElementById('bad_condition1'))
      var e1 = e.getDataURL()
      that.bad_condition1_img = e1
      // 2019
      let f = echarts.init(document.getElementById('bad_condition2'))
      var f1 = f.getDataURL()
      that.bad_condition2_img = f1
    },
    // 柱状图
    columnChart (e, xAxis, data1, data2, data3, colors) {
      const that = this
      let myChart = echarts.init(document.getElementById(e))
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
          position: config.position,
          distance: config.distance,
          align: config.align,
          verticalAlign: config.verticalAlign,
          rotate: config.rotate,
          fontSize: 24,
          fontWeight: 'normal',
          formatter: function (a) {
            let str;
            str = that.toThousands(a.value) + '（元）'
            return str;
          },
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      };
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            let str;
            str = '<div><h3>' + params[0].name +'</h3>'
            for (let i = 0; i < params.length; i++) {
              str += '<p>' + params[i].marker + params[i].seriesName + '<span>：'+ that.toThousands(params[i].value) +'（元）</span></p>'
            }
            str +='</div>'
            return str
          }
        },
        legend: {
          right: 2,
          top: 0,
          data: ['新增贷款', '偿还贷款', '贷款余额']
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: xAxis
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
        grid: {
          left: 100
        },
        series: [
          {
            name: '新增贷款',
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data1
          },
          {
            name: '偿还贷款',
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data2
          },
          {
            name: '贷款余额',
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data3
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
    },
    // 柱状图
    columnChart1 (e, xAxis, titles, data, colors) {
      const that = this
      let myChart = echarts.init(document.getElementById(e))
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
          position: config.position,
          distance: config.distance,
          align: config.align,
          verticalAlign: config.verticalAlign,
          rotate: config.rotate,
          fontSize: 24,
          fontWeight: 'normal',
          formatter: function (a) {
            let str;
            str = that.toThousands(a.value) + '（元）'
            return str;
          },
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      };
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            let str;
            str = '<div><h3>' + params[0].name +'</h3>'
            for (let i = 0; i < params.length; i++) {
              str += '<p>' + params[i].marker + params[i].seriesName + '<span>：'+ that.toThousands(params[i].value) +'（元）</span></p>'
            }
            str +='</div>'
            return str
          }
        },
        legend: {
          right: 2,
          top: 0,
          data: titles
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: xAxis
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
        grid: {
          left: 100
        },
        series: [
          {
            name: titles,
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data
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

<style lang="less" scoped>
#loan_status_list {
  h3 {
    margin-top: 15px;
    height: 30px;
    font-weight: 700;
    font-style: normal;
    line-height: 30px;
    font-size: 18px;
    color: #999;
    padding-left: 17px;
  }
  .order_left {
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    p {
      display: block;
      font-size: 16px;
      color: #666;
      padding-left: 20px;
      padding-bottom: 10px;
    }
  }
  .left-table {
    display: flex;
    flex-direction: column;
    .title-table-jidu {
      margin-bottom: 10px;
    }
  }
  .list_data {
    flex: 1;
    margin: 0 10px 20px;
    .table-title {
      display: flex;
      height:54px;
      background:rgba(250,250,250,1);
      flex-direction: row;
      border-bottom: 1px solid rgba(221,221,221,1);
      div {
        width: 30%;
        height: 100%;
        color: #333;
        text-align: right;
        line-height: 54px;
      }
      div:first-child {
        width: 160px;
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
        width: 30%;
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
      div:first-child {
        width: 160px;
      }
      div {
        padding-right: 20px;
      }
    }
  }
}
</style>
