<template>
  <div id="customer">
    <div class="flex-add">
      <!-- 企业供应链交易信用 -->
      <div class="customer">
        <!-- 企业供应链交易信用指数 -->
        <div class="list">
          <!-- <h3 class="title">供应商信用评估</h3> -->
          <div class="echarts_list">
            <div class="list_nav">
              <h3>客户信用评级</h3>
            </div>
            <div class="list_data">
              <div class="business_grade" v-for="(item, index) in business_credit_rating.slice((currentPage - 1) * 3, currentPage * 3)" :key="index">
                <div class="business_name">{{item.name}}</div>
                <ul>
                  <li><p>评分：<span>100</span></p></li>
                  <li><p>付款及时率：<span>100%</span></p></li>
                </ul>
              </div>
              <div class="block">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="3"
                  small
                  layout="prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <h3 class="title"></h3>
          <div class="echarts_list">
            <div class="list_nav no-nav">
              <h3>面对每个客户单独统计</h3>
              <div class="select">
                <selectOption :value="'2019'" @input='listerSon' />
              </div>
            </div>
            <div class="list_data">
              <div class="list_nav" style="border-bottom:none;">
                <h2>已收的靠谱系数：<span>{{(reliable_kpxs * 100).toFixed(2) + '%'}}</span></h2>
                <div class="select" style="padding-top:14px;">
                  <el-select v-model="business_data" size='mini' @change="businessChange(0, business_data)">
                    <el-option
                      v-for="item in businessName"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <pieChart :chartData='reliable_pie' v-if='reliable_pie.data.length > 0' />
              <column :chartData='reliable_histogram' v-if='reliable_histogram.data.length > 0 || reliable_histogram.data1.length > 0 || reliable_histogram.data2.length > 0 || reliable_histogram.data3.length > 0' />
            </div>
            <div class="list_data" style="padding: 30px;">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>提前付款</div>
                <div v-for="(item, index) in reliable_histogram.data" :key='index' :title="toThousands(item)">{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>按时付款</div>
                <div v-for="(item, index) in reliable_histogram.data1" :key='index' :title="toThousands(item)">{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>逾期付款</div>
                <div v-for="(item, index) in reliable_histogram.data2" :key='index' :title="toThousands(item)">{{toThousands(item)}}</div>
              </div>
              <div class="table-line">
                <div>逾期未付</div>
                <div v-for="(item, index) in reliable_histogram.data3" :key='index' :title="toThousands(item)">{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <h3 class="title">账期分布</h3>
          <div class="echarts_list">
            <div class="list_nav no-nav">
              <h3>客户的账期分布</h3>
            </div>
            <div class="list_data">
              <column :chartData='accountPeriod' v-if='accountPeriod.data.length > 0' />
            </div>
            <div class="list_data" style="padding: 30px;">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in accountPeriod.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>账期分布</div>
                <div v-for="(item, index) in accountPeriod.data" :key='index'>{{item}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <h3 class="title">行业分布</h3>
          <div class="echarts_list">
            <div class="list_nav no-nav">
              <h3>客户的行业分布</h3>
            </div>
            <div class="list_data">
              <column :chartData='industryDistribution' v-if='industryDistribution.data.length > 0' />
            </div>
            <div class="list_data" style="padding: 30px;">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in industryDistribution.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>行业分布</div>
                <div v-for="(item, index) in industryDistribution.data" :key='index'>{{item}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <h3 class="title">区域分布</h3>
          <div class="echarts_list">
            <div class="list_nav no-nav">
              <h3>客户的区域分布</h3>
            </div>
            <div class="list_data">
              <ul class="ul_reg">
                <li v-for="(item, index) in regional_list" :key="index"><span class="el-rect" :style="{background: item.color}"></span><p>{{item.value}}</p></li>
              </ul>
              <regionColumn v-if="regionColumnr.data.length > 0" :chartData='regionColumnr' />
            </div>
            <div class="list_data" style="padding: 30px;">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in regional_list" :key='index'>{{item.value}}</div>
              </div>
              <div class="table-line">
                <div>数量（个）</div>
                <div v-for="(item, index) in regionColumnr.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>平均账期（天）</div>
                <div v-for="(item, index) in regionColumnr.data" :key='index'>{{item}}</div>
              </div>
            </div>
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
import regionColumn from './echarts/region_column'
export default {
  name: 'customer',
  data () {
    return {
      company_id: '',
      tableTitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      business_credit_rating: [],
      // 上下游客户信用与评级、
      reliable_kpxs: '',
      businessName: [],
      business_data: '',
      // 面对每个客户单独统计-已收的靠谱系数---饼图
      reliable_pie: {
        titles: '已付的靠谱系数',
        legend: ['提前收款', '按时收款','逾期收款','逾期未收'],
        data: [],
        index: 2,
        color: ['#3AA0FF', '#4ECB73', '#FAD337', '#F2637B']
      },
      // 面对每个客户单独统计-已收的靠谱系数---柱状图
      reliable_histogram: {
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        data: [],
        data1: [],
        data2: [],
        data3: [],
        index: 3,
        num: 1,
        name: '（元）',
        legend: ['提前收款', '按时收款','逾期收款','逾期未收'],
        color: ['#3AA0FF', '#4ECB73', '#FAD337', '#F2637B']
      },
      currentPage: 1,
      total: 0,
      // 账期分布
      accountPeriod: {
        xAxis: [],
        data: [],
        index: 1,
        num: 0,
        name: '（个）',
        legend: ['客户'],
        color: ['#FAD337']
      },
      // 行业分布
      industryDistribution: {
        xAxis: [],
        data: [],
        index: 1,
        name: '（个）',
        num: 0,
        legend: ['客户'],
        color: ['#FAD337']
      },
      // 区域分布
      regionalDistribution: {
        r_data: {
          xAxis: [],
          legend: '客户',
          bh_rim: {
            account_avg: '',
            company_count: ''
          },
          central: {
            account_avg: '',
            company_count: ''
          },
          cj_delta: {
            account_avg: '',
            company_count: ''
          },
          jjj: {
            account_avg: '',
            company_count: ''
          },
          northeast: {
            account_avg: '',
            company_count: ''
          },
          other: {
            account_avg: '',
            company_count: ''
          },
          west: {
            account_avg: '',
            company_count: ''
          },
          zj_delta: {
            account_avg: '',
            company_count: ''
          }
        }
      },
      // '#975fe4', '#1d4fd4', '#36cbcb', '#4ecb73', '#fcdc5b', '#e3dcff', '#d7b600', '#f2637b'
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
      ],
      regionColumnr: {
        data: [],
        xAxis: []
      },
      select_data: ''
    }
  },
  components: {
    selectOption,
    pieChart,
    column,
    regionColumn
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
    // 账期分布
    that.$ajax.get('/api/oth/data_portrait/accounts_statistics/?company_id=' + that.company_id).then(res => {
      that.accountPeriod.data = res.data.r_data
      that.accountPeriod.xAxis = res.data.x_axis
    })
    // 行业分布
    that.$ajax.get('/api/oth/data_portrait/industry_distribution/?company_id=' + that.company_id).then(res => {
      that.industryDistribution.data = res.data.r_data
      that.industryDistribution.xAxis = res.data.x_axis
    })
    // 区域分布
    that.$ajax.get('/api/oth/data_portrait/accounts_area_statistics/?company_id=' + that.company_id).then(res => {
      // 客户
      that.regionalDistribution.r_data.bh_rim = res.data.r_data.bh_rim
      that.regionalDistribution.r_data.central = res.data.r_data.central
      that.regionalDistribution.r_data.cj_delta = res.data.r_data.cj_delta
      that.regionalDistribution.r_data.jjj = res.data.r_data.jjj
      that.regionalDistribution.r_data.northeast = res.data.r_data.northeast
      that.regionalDistribution.r_data.other = res.data.r_data.other
      that.regionalDistribution.r_data.west = res.data.r_data.west
      that.regionalDistribution.r_data.zj_delta = res.data.r_data.zj_delta
      that.regionColumnr.xAxis.push(that.regionalDistribution.r_data.cj_delta.company_count, that.regionalDistribution.r_data.zj_delta.company_count, that.regionalDistribution.r_data.west.company_count, that.regionalDistribution.r_data.central.company_count, that.regionalDistribution.r_data.northeast.company_count, that.regionalDistribution.r_data.bh_rim.company_count, that.regionalDistribution.r_data.jjj.company_count, that.regionalDistribution.r_data.other.company_count)
      that.regionColumnr.data.push(that.regionalDistribution.r_data.cj_delta.account_avg, that.regionalDistribution.r_data.zj_delta.account_avg, that.regionalDistribution.r_data.west.account_avg, that.regionalDistribution.r_data.central.account_avg, that.regionalDistribution.r_data.northeast.account_avg, that.regionalDistribution.r_data.bh_rim.account_avg, that.regionalDistribution.r_data.jjj.account_avg, that.regionalDistribution.r_data.other.account_avg)
    })
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 上下游靠谱系数
    listerSon (data) {
      var that = this
      that.select_data = data
      // 面对每个客户单独统计
      that.$ajax.get('/api/oth/data_portrait/partner_company/?company_id=' + that.company_id + '&p_type=1').then(res => {
        that.businessName = res.data
        that.business_credit_rating = res.data
        that.total = Number(res.data.length)
        if (res.data.length > 0) {
          that.business_data = res.data[0].id
          // 面对每个客户单独统计
          that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1' + '&year=' + that.select_data + '&partner_company_id=' + res.data[0].id).then(res => {
            that.reliable_kpxs = res.data.kpxs
            // 饼图
            var arr = []
            arr[0] = {value: res.data.advance_paid, name: '提前收款'}
            arr[1] = {value: res.data.ontime_paid, name: '按时收款'}
            arr[2] = {value: res.data.overdue_paid, name: '逾期收款'}
            arr[3] = {value: res.data.overdue_unpaid, name: '逾期未收'}
            that.reliable_pie.data = arr
            // 柱状图
            if (res.data.advance_paid_list) {
              // 提前支付
              that.reliable_histogram.data = res.data.advance_paid_list
            }
            if (res.data.ontime_paid_list) {
              // 按时支付
              that.reliable_histogram.data1 = res.data.ontime_paid_list
            }
            if (res.data.overdue_paid_list) {
              // 逾期支付
              that.reliable_histogram.data2 = res.data.overdue_paid_list
            }
            if (res.data.overdue_unpaid_list) {
              // 逾期未付
              that.reliable_histogram.data3 = res.data.overdue_unpaid_list
            }
          })
        }
      })
    },
    // 上下游靠谱系数
    businessChange (i, item) {
      var that = this
      if (Number(i) === 0) {
        // 面对每个客户单独统计
        that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1' + '&partner_company_id=' + item + '&year=' + that.select_data).then(res => {
          that.reliable_kpxs = res.data.kpxs
          // 饼图
          var arr = []
          arr[0] = {value: res.data.advance_paid, name: '提前收款'}
          arr[1] = {value: res.data.ontime_paid, name: '按时收款'}
          arr[2] = {value: res.data.overdue_paid, name: '逾期收款'}
          arr[3] = {value: res.data.overdue_unpaid, name: '逾期未收'}
          that.reliable_pie.data = arr
          // 柱状图
          if (res.data.advance_paid_list) {
            // 提前支付
            that.reliable_histogram.data = res.data.advance_paid_list
          }
          if (res.data.ontime_paid_list) {
            // 按时支付
            that.reliable_histogram.data1 = res.data.ontime_paid_list
          }
          if (res.data.overdue_paid_list) {
            // 逾期支付
            that.reliable_histogram.data2 = res.data.overdue_paid_list
          }
          if (res.data.overdue_unpaid_list) {
            // 逾期未付
            that.reliable_histogram.data3 = res.data.overdue_unpaid_list
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#customer {
  .customer {
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
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height: 44px;
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
        .list_data {
          padding-bottom: 20px;
          .business_grade {
            padding: 20px 20px 0 30px;
            position: relative;
            .business_name {
              font-weight: bold;
              font-size: 14px;
              color: #666;
            }
            ul {
              display: flex;
              flex-direction: row;
              li {
                flex: 1;
                p {
                  font-weight: normal;
                  font-size: 13px;
                  padding-top: 5px;
                  color: #999;
                  span {
                    color: #666;
                  }
                }
              }
            }
          }
          .ul_reg {
            text-align: right;
            padding-right: 10%;
            padding-top: 20px;
            li {
              display: inline-block;
              font-size: 12px;
              height: 20px;
              margin-right: 5px;
              span {
                float: left;
              }
              p {
                float: left;
              }
            }
            .el-rect {
              display: inline-block;
              width: 24px;
              height: 13px;
              border-radius: 3px;
              margin: 2px 3px 0;
            }
          }
          .block {
            margin-top: 30px;
            margin-left: 25%;
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
