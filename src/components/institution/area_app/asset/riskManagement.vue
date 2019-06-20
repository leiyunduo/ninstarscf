<template>
  <div class="riskManagement">
    <div class="chart-title">链主情况</div>
    <div class="enterprise_credit_list">
      <!-- 以链主为核心统计 -->
      <div class="enterprise-list-credit">
        <h2>
          以链主为核心统计
          <div class="select">
            <span>年统计时间（年）：</span>
            <select v-model="select_data" @change="selectChange(select_data)">
              <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
            </select>
          </div>
        </h2>
        <!-- 链主的已收 -->
        <div class="accepted">
          <h3>链主的已收</h3>
          <div class="enterprise_list">
            <div class="left">
              <pieChart :chartData='accepted_pie' v-if='accepted_pie.data.data.length > 0' />
            </div>
            <div class="right">
              <histogram :chartData='accepted_histogram' v-if='accepted_histogram.data.data.length > 0 || accepted_histogram.data.data1.length > 0 || accepted_histogram.data.data2.length > 0 || accepted_histogram.data.data3.length > 0' />
            </div>
          </div>
        </div>
        <!-- 链主的已付 -->
        <div class="paid">
          <h3>链主的已付</h3>
          <div class="enterprise_list">
            <div class="left">
              <pieChart :chartData='paid_pie' v-if='paid_pie.data.data.length > 0' />
            </div>
            <div class="right">
              <histogram :chartData='paid_histogram' v-if='paid_histogram.data.data.length > 0 || paid_histogram.data.data1.length > 0 || paid_histogram.data.data2.length > 0 || paid_histogram.data.data3.length > 0' />
            </div>
          </div>
        </div>
        <!-- 链主的已贷 -->
        <div class="loan_already">
          <h3>链主的已贷</h3>
          <div class="enterprise_list">
            <div class="left">
              <pieChart :chartData='loan_already_pie' v-if='loan_already_pie.data.data.length > 0' />
            </div>
            <div class="right">
              <histogram :chartData='loan_already_histogram' v-if='loan_already_histogram.data.data.length > 0 || loan_already_histogram.data.data1.length > 0 || loan_already_histogram.data.data2.length > 0 || loan_already_histogram.data.data3.length > 0' />
            </div>
          </div>
        </div>
      </div>
      <!-- 面对每个客户单独统计 -->
      <div class="enterprise-list-credit">
        <h2>
          面对每个客户单独统计
          <div class="select">
            <span>请选择要查看的企业：</span>
            <select v-model="business_data" @change="businessChange(0, business_data)">
              <option v-for="(item, index) in businessName" :key="index" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </h2>
        <!-- 已收的靠谱系数： -->
        <div class="reliable">
          <h3>已收的靠谱系数：<span>{{(reliable_kpxs * 100).toFixed(2) + '%'}}</span></h3>
          <div class="enterprise_list">
            <div class="left">
              <pieChart :chartData='reliable_pie' v-if='reliable_pie.data.data.length > 0' />
            </div>
            <div class="right">
              <histogram :chartData='reliable_histogram' v-if='reliable_histogram.data.data.length > 0 || reliable_histogram.data.data1.length > 0 || reliable_histogram.data.data2.length > 0 || reliable_histogram.data.data3.length > 0' />
            </div>
          </div>
        </div>
      </div>
      <!-- 面对每个供应商单独统计 -->
      <div class="enterprise-list-credit">
        <h2>
          面对每个供应商单独统计
          <div class="select">
            <span>请选择要查看的企业：</span>
            <select v-model="supplier_data" @change="businessChange(1, supplier_data)">
              <option v-for="(item, index) in supplierName" :key="index" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </h2>
        <!-- 已付的靠谱系数： -->
        <div class="reliable">
          <h3>已付的靠谱系数：<span>{{(supplier_kpxs * 100).toFixed(2) + '%'}}</span></h3>
          <div class="enterprise_list">
            <div class="left">
              <pieChart :chartData='supplier_pie' v-if='supplier_pie.data.data.length > 0' />
            </div>
            <div class="right">
              <histogram :chartData='supplier_histogram' v-if='supplier_histogram.data.data.length > 0 || supplier_histogram.data.data1.length > 0 || supplier_histogram.data.data2.length > 0 || supplier_histogram.data.data3.length > 0' />
            </div>
          </div>
        </div>
      </div>
      <!-- 客户信用评级 ---供应商信用评估 -->
      <div class="enterprise-list-credit">
        <div class="h3-title">供应链交易企业状况</div>
        <div class="h3_list">
          <div class="left">
            <div class="credit-grade">
              <h4>供应商信用评估</h4>
              <div class="business_grade" v-for="(item, index) in p_credit_rating" :key="index">
                <div class="business_name">{{item.business_name}}</div>
                <ul>
                  <li><p>退货率：<span>0%</span></p></li>
                  <li><p>报废率：<span>0%</span></p></li>
                  <li><p>按时交货率：<span>100%</span></p></li>
                </ul>
                <ul>
                  <li><p>价格评价：<span>高</span></p></li>
                  <li><p>协同度：<span>快</span></p></li>
                  <li><p>选择范围：<span>广</span></p></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="credit-grade">
              <h4>客户信用评级</h4>
              <div class="business_grade" v-for="(item, index) in business_credit_rating" :key="index">
                <div class="business_name">{{item.business_name}}</div>
                <ul>
                  <li><p>评分：<span>100</span></p></li>
                  <li><p>付款及时率：<span>100%</span></p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 链主的供应商与客户的账期分布 -->
        <div class="h3_list">
          <div class="left">
            <div class="credit-grade">
              <h4>链主的供应商与客户的账期分布</h4>
              <div class="business_grade">
                <column :chartData='accountPeriod' v-if='accountPeriod.data.data.length > 0 || accountPeriod.data.data1.length > 0' />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="credit-grade">
              <h4>链主供应商与客户的行业分布</h4>
              <div class="business_grade">
                <column :chartData='industryDistribution' v-if='industryDistribution.data.data.length > 0 || industryDistribution.data.data1.length > 0' />
              </div>
            </div>
          </div>
        </div>
        <!-- 链主的供应商与客户的区域分布 -->
        <div class="h3_list h3_qy" style="border: 1px solid #e8e8e8;">
          <div class="left">
            <h3>链主的供应商与客户的区域分布</h3>
            <div class="credit-grade1">
              <h4>供应商</h4>
              <div class="business_grade">
                <ul class="ul_reg">
                  <li v-for="(item, index) in regional_list" :key="index"><span class="el-rect" :style="{background: item.color}"></span><p>{{item.value}}</p></li>
                </ul>
                <div id="regionalp" style="height:300px;"></div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="credit-grade1">
              <h4 style="padding-top:41px;">客户</h4>
              <div class="business_grade">
                <ul class="ul_reg">
                  <li v-for="(item, index) in regional_list" :key="index"><span class="el-rect" :style="{background: item.color}"></span><p>{{item.value}}</p></li>
                </ul>
                <div id="regionalr" style="height:300px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 企业行业风险信息 ---企业经营风险信息 -->
      <div class="enterprise-list-credit">
        <div class="h3_list">
          <div class="left">
            <div class="h3-title">交易数据异常统计</div>
            <div class="credit-grade">
              <pieChart :chartData='call_the_police' />
            </div>
          </div>
          <div class="right">
            <div class="h3-title">企业经营风险信息</div>
            <div class="credit-grade">
              <div class="business_grade">
                <div class="business_name">湖南众鑫新材料科技股份有限公司</div>
                <ul>
                  <li><p>经营状况：<span>无</span></p></li>
                  <li><p>新增风险事件：<span>无</span></p></li>
                </ul>
                <ul>
                  <li><p>信用处罚记录：<span>无</span></p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 交易数据异常统计 -->
      <div class="enterprise-list-credit">
        <div class="h3_list">
          <div class="left">
            <div class="h3-title">企业行业风险信息</div>
            <div class="credit-grade">
              <div class="business_grade1">
                <div class="business_name">湖南众鑫新材料科技股份有限公司</div>
                <div class="right_left_list">
                  <div class="right_left">所属行业：</div>
                  <div class="left_right">制造业（冶金）</div>
                </div>
                <div class="right_left_list">
                  <div class="right_left">产品介绍：</div>
                  <div class="left_right">钒作为冶炼合金钢的重要原料，可提高钢的强度、延展性和韧性，可生产高强度低合金钢、高速钢、工具钢、不锈钢和永久磁体等，用于生产切削、耐压耐磨等部件。钒合金广泛用于交通运输、机械、建筑、输油气管道、桥梁、压力储罐、钢轨、输电塔架等。</div>
                </div>
                <div class="right_left_list">
                  <div class="right_left">环境风险：</div>
                  <div class="left_right">我国除了西藏、宁夏、海南外，几乎每个省市都有钒制品的生产企业，厂家数量
                    达到50余家。由于各厂都在不断进行技改，甚至转行，以及消费市场波动的影响，钒
                    氮合金制品厂家数量、产能和产量也在不断变化。未来十年钒产品的消费需求仍会持
                    续增加，中型与特色钒企业将批量涌现，业内竞争更加激烈，行业性市场过剩局面在
                    未来几年仍有持续加剧之势，钒产品价格在稳定中保持下滑的趋势近期不会改变。
                  </div>
                </div>
                <div class="right_left_list">
                  <div class="right_left">行业技术风险：</div>
                  <div class="left_right">我国虽然在全球范围内创造性的实现了钒钛磁铁矿中铁、钒、钛的同时回收利用，
                    但一些关键技术瓶颈尚未突破。另外，虽然我国是世界第二大钒产品生产基地，但高端
                    钒产品及相关新工艺的开发能力仍然不足，产品的核心竞争力不强。
                    此外，不同钒氮合金生产企业的生产工艺虽然大同小异，但生产过程中原料配比、温度
                    等各项指标对钒氮合金转化率、质量的影响较大。同时，对于下游钢铁冶炼企业，钒氮
                    合金的添加方式和混合方式，对于钢材的强度、韧性、可焊性、延展性及抗热疲劳性等
                    综合机械性能，以及钢材机械性能的均匀性有较大影响。
                  </div>
                </div>
                <div class="right_left_list">
                  <div class="right_left">上下游风险：</div>
                  <div class="left_right">供货量不足、原材料涨价或者质量问题等不可测因素，影响钒氮合金的产量、生
                    产成本。目前钒氮合金大部分用于生产铁合金，其消费量与市场规模与钢材市场息息
                    相关。钒氮合金行业的发展受国内下游产业的波动的影响较大，因其与下游产业的发
                    展和景气状况密切相关，存在一定的由下游产业波动引致的行业波动风险。
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right" style="border:none;"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 饼图
import pieChart from '@/components/echarts/pieChart'
// 柱状图
import histogram from '@/components/echarts/histogram'
// 账期分布
import column from '@/components/echarts/column'
import { constants } from 'fs';
const echarts = require('echarts')
export default {
  name: 'riskManagement',
  data () {
    return {
      company_id: '',
      yearDate: ['2017', '2018', '2019'],
      select_data: '2019',
      // 链主的已收---饼图
      accepted_pie: {
        data: {
          centers: ['50%', '50%'],
          titles: '链主的已收',
          legend: ['客户提前支付', '客户按时支付','客户逾期支付','客户逾期未付'],
          data: []
        }
      },
      // 链主的已收---柱状图
      accepted_histogram: {
        data: {
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          data: [],
          data1: [],
          data2: [],
          data3: [],
          legend: ['客户提前支付', '客户按时支付','客户逾期支付','客户逾期未付']
        }
      },
      // 链主的已付---饼图
      paid_pie: {
        data: {
          centers: ['50%', '50%'],
          titles: '链主的已付',
          legend: ['提前支付', '按时支付','逾期支付','逾期未付'],
          data: []
        }
      },
      // 链主的已付---柱状图
      paid_histogram: {
        data: {
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          data: [],
          data1: [],
          data2: [],
          data3: [],
          legend: ['提前支付', '按时支付','逾期支付','逾期未付']
        }
      },
      // 链主的已贷---饼图
      loan_already_pie: {
        data: {
          centers: ['50%', '50%'],
          titles: '链主的已贷',
          legend: ['提前还款', '按时还款','逾期还款','逾期未还'],
          data: []
        }
      },
      // 链主的已贷---柱状图
      loan_already_histogram: {
        data: {
          xAxis: [],
          data: [],
          data1: [],
          data2: [],
          data3: [],
          legend: ['提前还款', '按时还款','逾期还款','逾期未还']
        }
      },
      // 面对每个客户单独统计
      businessName: [],
      business_data: '',
      reliable_kpxs: '',
      // 面对每个客户单独统计-已收的靠谱系数---饼图
      reliable_pie: {
        data: {
          centers: ['50%', '50%'],
          titles: '已付的靠谱系数',
          legend: ['提前收款', '按时收款','逾期收款','逾期未收'],
          data: []
        }
      },
      // 面对每个客户单独统计-已收的靠谱系数---柱状图
      reliable_histogram: {
        data: {
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          data: [],
          data1: [],
          data2: [],
          data3: [],
          legend: ['提前收款', '按时收款','逾期收款','逾期未收']
        }
      },
      // 面对每个供应商单独统计
      supplierName: [],
      supplier_data: '',
      supplier_kpxs: '',
      // 已付的靠谱系数：---饼图
      supplier_pie: {
        data: {
          centers: ['50%', '50%'],
          titles: '已付的靠谱系数',
          legend: ['提前付款', '按时付款','逾期付款','逾期未付'],
          data: []
        }
      },
      // 已付的靠谱系数：---柱状图
      supplier_histogram: {
        data: {
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          data: [],
          data1: [],
          data2: [],
          data3: [],
          legend: ['提前付款', '按时付款','逾期付款','逾期未付']
        }
      },
      // 客户信用评级 ---供应商信用评估
      business_credit_rating: [
        {business_name: '阳春新钢铁有限责任公司'},
        {business_name: '深圳亿和模具制造有限公司'},
        {business_name: '东北华菱钢铁有限公司'},
        {business_name: '天津港新兴建材码头有限公司'}
      ],
      p_credit_rating: [
        {business_name: '常青藤新材料技术服务有限公司'},
        {business_name: '南京福星钒合金有限公司 '},
        {business_name: '商洛天野高新材料有限公司'}
      ],
      // 交易数据异常统计---饼图
      call_the_police: {
        data: {
          centers: ['60%', '50%'],
          titles: '交易数据异常统计',
          legend: ['计划与执行之间时间差超出5天', '实际凭证与上传时间差超出3天','时间的准时性报警','供应链九环平均时间报警', '内容缺失报警'],
          data: [
            {value:11, name:'计划与执行之间时间差超出5天'},
            {value:9, name:'实际凭证与上传时间差超出3天'},
            {value:8, name:'时间的准时性报警'},
            {value:4, name:'供应链九环平均时间报警'},
            {value:6, name:'内容缺失报警'}
          ]
        }
      },
      // 账期分布
      accountPeriod: {
        data: {
          xAxis: [],
          data: [],
          data1: [],
          legend: ['供应商', '客户']
        }
      },
      // 行业分布
      industryDistribution: {
        data: {
          xAxis: [],
          data: [],
          data1: [],
          legend: ['供应商', '客户']
        }
      },
      // 区域分布
      regionalDistribution: {
        p_data: {
          xAxis: [],
          legend: '供应商',
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
        },
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
      ]
    }
  },
  props: ['bid'],
  components: {
    pieChart, histogram, column
  },
  methods: {
    // 年统计时间
    selectChange (item) {
      var that = this
      // 链主的已收
      that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1' + '&year=' + item).then(res => {
        // 饼图
        var arr = []
        arr[0] = {value: res.data.advance_paid, name: '客户提前支付'}
        arr[1] = {value: res.data.ontime_paid, name: '客户按时支付'}
        arr[2] = {value: res.data.overdue_paid, name: '客户逾期支付'}
        arr[3] = {value: res.data.overdue_unpaid, name: '客户逾期未付'}
        that.accepted_pie.data.data = arr
        // 柱状图
        // 提前支付
        that.accepted_histogram.data.data = res.data.advance_paid_list
        // 按时支付
        that.accepted_histogram.data.data1 = res.data.ontime_paid_list
        // 逾期支付
        that.accepted_histogram.data.data2 = res.data.overdue_paid_list
        // 逾期未付
        that.accepted_histogram.data.data3 = res.data.overdue_unpaid_list
      })
      // 链主的已付
      that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=2' + '&year=' + item).then(res => {
        // 饼图
        var arr = []
        arr[0] = {value: res.data.advance_paid, name: '提前支付'}
        arr[1] = {value: res.data.ontime_paid, name: '按时支付'}
        arr[2] = {value: res.data.overdue_paid, name: '逾期支付'}
        arr[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
        that.paid_pie.data.data = arr
        // 柱状图
        // 提前支付
        that.paid_histogram.data.data = res.data.advance_paid_list
        // 按时支付
        that.paid_histogram.data.data1 = res.data.ontime_paid_list
        // 逾期支付
        that.paid_histogram.data.data2 = res.data.overdue_paid_list
        // 逾期未付
        that.paid_histogram.data.data3 = res.data.overdue_unpaid_list
      })
      // 链主的已贷
      that.$ajax.get('/api/oth/loan_statistics/loan_repayment_statistics/?company_id=' + that.company_id + '&year=' + item).then(res => {
        console.log(res)
        // 链主的已贷---饼图
        that.loan_already_pie.data.data = res.data.total
        // 链主的已贷---柱状图
        that.loan_already_histogram.data.xAxis = res.data.x_axis
        that.loan_already_histogram.data.data = res.data.advanced_data
        that.loan_already_histogram.data.data1 = res.data.on_time_data
        that.loan_already_histogram.data.data2 = res.data.overdue_repay_data
        that.loan_already_histogram.data.data3 = res.data.overdue_unrepay_data
      })
      if (that.businessName.length > 0) {
        // 面对每个客户单独统计
        that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1' + '&partner_company_id=' + that.business_data + '&year=' + item).then(res => {
          that.reliable_kpxs = res.data.kpxs
          // 饼图
          var arr = []
          arr[0] = {value: res.data.advance_paid, name: '提前收款'}
          arr[1] = {value: res.data.ontime_paid, name: '按时收款'}
          arr[2] = {value: res.data.overdue_paid, name: '逾期收款'}
          arr[3] = {value: res.data.overdue_unpaid, name: '逾期未收'}
          that.reliable_pie.data.data = arr
          // 柱状图
          // 提前支付
          that.reliable_histogram.data.data = res.data.advance_paid_list
          // 按时支付
          that.reliable_histogram.data.data1 = res.data.ontime_paid_list
          // 逾期支付
          that.reliable_histogram.data.data2 = res.data.overdue_paid_list
          // 逾期未付
          that.reliable_histogram.data.data3 = res.data.overdue_unpaid_list
        })
      }
      if (that.supplierName.length > 0) {
        // 面对每个供应商单独统计
        that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=2' + '&partner_company_id=' + that.supplier_data + '&year=' + item).then(res => {
          that.supplier_kpxs = res.data.kpxs
          // 饼图
          var arr = []
          arr[0] = {value: res.data.advance_paid, name: '提前付款'}
          arr[1] = {value: res.data.ontime_paid, name: '按时付款'}
          arr[2] = {value: res.data.overdue_paid, name: '逾期付款'}
          arr[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
          that.supplier_pie.data.data = arr
          // 柱状图
          // 提前支付
          that.supplier_histogram.data.data = res.data.advance_paid_list
          // 按时支付
          that.supplier_histogram.data.data1 = res.data.ontime_paid_list
          // 逾期支付
          that.supplier_histogram.data.data2 = res.data.overdue_paid_list
          // 逾期未付
          that.supplier_histogram.data.data3 = res.data.overdue_unpaid_list
        })
      }
    },
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
          that.reliable_pie.data.data = arr
          // 柱状图
          // 提前支付
          that.reliable_histogram.data.data = res.data.advance_paid_list
          // 按时支付
          that.reliable_histogram.data.data1 = res.data.ontime_paid_list
          // 逾期支付
          that.reliable_histogram.data.data2 = res.data.overdue_paid_list
          // 逾期未付
          that.reliable_histogram.data.data3 = res.data.overdue_unpaid_list
        })
      } else if (Number(i) === 1) {
        // 面对每个客户单独统计
        that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=2' + '&partner_company_id=' + item + '&year=' + that.select_data).then(res => {
          that.supplier_kpxs = res.data.kpxs
          // 饼图
          var arr = []
          arr[0] = {value: res.data.advance_paid, name: '提前付款'}
          arr[1] = {value: res.data.ontime_paid, name: '按时付款'}
          arr[2] = {value: res.data.overdue_paid, name: '逾期付款'}
          arr[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
          that.supplier_pie.data.data = arr
          // 柱状图
          // 提前支付
          that.supplier_histogram.data.data = res.data.advance_paid_list
          // 按时支付
          that.supplier_histogram.data.data1 = res.data.ontime_paid_list
          // 逾期支付
          that.supplier_histogram.data.data2 = res.data.overdue_paid_list
          // 逾期未付
          that.supplier_histogram.data.data3 = res.data.overdue_unpaid_list
        })
      }
    },
    // 柱状图
    drawChart (n, xAxis, legend, data) {
      const that = this
      let myChart = echarts.init(document.getElementById(n))
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
          data: legend
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
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 50
            },
            data: xAxis
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
                    // build a color map as your need.
                    var colorList = [
                      '#975fe4', '#1d4fd4', '#36cbcb', '#4ecb73', '#fcdc5b', '#e3dcff', '#f39f5f', '#f2637b'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
            },
            type: 'bar',
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
  },
  mounted () {
    var that = this
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    // 链主的已收
    that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1').then(res => {
      // 饼图
      var arr = []
      arr[0] = {value: res.data.advance_paid, name: '客户提前支付'}
      arr[1] = {value: res.data.ontime_paid, name: '客户按时支付'}
      arr[2] = {value: res.data.overdue_paid, name: '客户逾期支付'}
      arr[3] = {value: res.data.overdue_unpaid, name: '客户逾期未付'}
      that.accepted_pie.data.data = arr
      // 柱状图
      // 提前支付
      that.accepted_histogram.data.data = res.data.advance_paid_list
      // 按时支付
      that.accepted_histogram.data.data1 = res.data.ontime_paid_list
      // 逾期支付
      that.accepted_histogram.data.data2 = res.data.overdue_paid_list
      // 逾期未付
      that.accepted_histogram.data.data3 = res.data.overdue_unpaid_list
    })
    // 链主的已付
    that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=2').then(res => {
      // 饼图
      var arr = []
      arr[0] = {value: res.data.advance_paid, name: '提前支付'}
      arr[1] = {value: res.data.ontime_paid, name: '按时支付'}
      arr[2] = {value: res.data.overdue_paid, name: '逾期支付'}
      arr[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
      that.paid_pie.data.data = arr
      // 柱状图
      // 提前支付
      that.paid_histogram.data.data = res.data.advance_paid_list
      // 按时支付
      that.paid_histogram.data.data1 = res.data.ontime_paid_list
      // 逾期支付
      that.paid_histogram.data.data2 = res.data.overdue_paid_list
      // 逾期未付
      that.paid_histogram.data.data3 = res.data.overdue_unpaid_list
    })
    // 链主的已贷
    that.$ajax.get('/api/oth/loan_statistics/loan_repayment_statistics/?company_id=' + that.company_id).then(res => {
      // 链主的已贷---饼图
      that.loan_already_pie.data.data = res.data.total
      // 链主的已贷---柱状图
      that.loan_already_histogram.data.xAxis = res.data.x_axis
      that.loan_already_histogram.data.data = res.data.advanced_data
      that.loan_already_histogram.data.data1 = res.data.on_time_data
      that.loan_already_histogram.data.data2 = res.data.overdue_repay_data
      that.loan_already_histogram.data.data3 = res.data.overdue_unrepay_data
    })
    // 面对每个客户单独统计 -- 合作企业列表
    that.$ajax.get('/api/oth/data_portrait/partner_company/?company_id=' + that.company_id + '&p_type=1').then(res => {
      that.businessName = res.data
      if (res.data.length > 0) {
        that.business_data = res.data[0].id
        // 面对每个客户单独统计
        that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1' + '&partner_company_id=' + res.data[0].id).then(res => {
          that.reliable_kpxs = res.data.kpxs
          // 饼图
          var arr = []
          arr[0] = {value: res.data.advance_paid, name: '提前收款'}
          arr[1] = {value: res.data.ontime_paid, name: '按时收款'}
          arr[2] = {value: res.data.overdue_paid, name: '逾期收款'}
          arr[3] = {value: res.data.overdue_unpaid, name: '逾期未收'}
          // arr[0] = {value: res.data.advance_paid, name: '提前付款'}
          // arr[1] = {value: res.data.ontime_paid, name: '按时付款'}
          // arr[2] = {value: res.data.overdue_paid, name: '逾期付款'}
          // arr[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
          that.reliable_pie.data.data = arr
          // 柱状图
          // 提前支付
          that.reliable_histogram.data.data = res.data.advance_paid_list
          // 按时支付
          that.reliable_histogram.data.data1 = res.data.ontime_paid_list
          // 逾期支付
          that.reliable_histogram.data.data2 = res.data.overdue_paid_list
          // 逾期未付
          that.reliable_histogram.data.data3 = res.data.overdue_unpaid_list
        })
      }
    })
    // 面对每个供应商单独统计 -- 合作企业列表
    that.$ajax.get('/api/oth/data_portrait/partner_company/?company_id=' + that.company_id + '&p_type=2').then(res => {
      that.supplierName = res.data
      if (res.data.length > 0) {
        that.supplier_data = res.data[0].id
        // 面对每个供应商单独统计
        that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=2' + '&partner_company_id=' + res.data[0].id).then(res => {
          that.supplier_kpxs = res.data.kpxs
          // 饼图
          var arr = []
          arr[0] = {value: res.data.advance_paid, name: '提前付款'}
          arr[1] = {value: res.data.ontime_paid, name: '按时付款'}
          arr[2] = {value: res.data.overdue_paid, name: '逾期付款'}
          arr[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
          that.supplier_pie.data.data = arr
          // 柱状图
          // 提前支付
          that.supplier_histogram.data.data = res.data.advance_paid_list
          // 按时支付
          that.supplier_histogram.data.data1 = res.data.ontime_paid_list
          // 逾期支付
          that.supplier_histogram.data.data2 = res.data.overdue_paid_list
          // 逾期未付
          that.supplier_histogram.data.data3 = res.data.overdue_unpaid_list
        })
      }
    })
    // 账期分布
    that.$ajax.get('/api/oth/data_portrait/accounts_statistics/?company_id=' + that.company_id).then(res => {
      that.accountPeriod.data.data = res.data.p_data
      that.accountPeriod.data.data1 = res.data.r_data
      that.accountPeriod.data.xAxis = res.data.x_axis
    })
    // 行业分布
    that.$ajax.get('/api/oth/data_portrait/industry_distribution/?company_id=' + that.company_id).then(res => {
      that.industryDistribution.data.data = res.data.p_data
      that.industryDistribution.data.data1 = res.data.r_data
      that.industryDistribution.data.xAxis = res.data.x_axis
    })
    // 区域分布
    that.$ajax.get('/api/oth/data_portrait/accounts_area_statistics/?company_id=10100000002').then(res => {
      // 供应商
      that.regionalDistribution.p_data.bh_rim = res.data.p_data.bh_rim
      that.regionalDistribution.p_data.central = res.data.p_data.central
      that.regionalDistribution.p_data.cj_delta = res.data.p_data.cj_delta
      that.regionalDistribution.p_data.jjj = res.data.p_data.jjj
      that.regionalDistribution.p_data.northeast = res.data.p_data.northeast
      that.regionalDistribution.p_data.other = res.data.p_data.other
      that.regionalDistribution.p_data.west = res.data.p_data.west
      that.regionalDistribution.p_data.zj_delta = res.data.p_data.zj_delta
      let x = []
      x.push(that.regionalDistribution.p_data.cj_delta.company_count, that.regionalDistribution.p_data.zj_delta.company_count, that.regionalDistribution.p_data.west.company_count, that.regionalDistribution.p_data.central.company_count, that.regionalDistribution.p_data.northeast.company_count, that.regionalDistribution.p_data.bh_rim.company_count, that.regionalDistribution.p_data.jjj.company_count, that.regionalDistribution.p_data.other.company_count)
      let data = []
      data.push(that.regionalDistribution.p_data.cj_delta.account_avg, that.regionalDistribution.p_data.zj_delta.account_avg, that.regionalDistribution.p_data.west.account_avg, that.regionalDistribution.p_data.central.account_avg, that.regionalDistribution.p_data.northeast.account_avg, that.regionalDistribution.p_data.bh_rim.account_avg, that.regionalDistribution.p_data.jjj.account_avg, that.regionalDistribution.p_data.other.account_avg)
      that.drawChart('regionalp', x, that.regionalDistribution.p_data.legend, data)
      // 客户
      that.regionalDistribution.r_data.bh_rim = res.data.r_data.bh_rim
      that.regionalDistribution.r_data.central = res.data.r_data.central
      that.regionalDistribution.r_data.cj_delta = res.data.r_data.cj_delta
      that.regionalDistribution.r_data.jjj = res.data.r_data.jjj
      that.regionalDistribution.r_data.northeast = res.data.r_data.northeast
      that.regionalDistribution.r_data.other = res.data.r_data.other
      that.regionalDistribution.r_data.west = res.data.r_data.west
      that.regionalDistribution.r_data.zj_delta = res.data.r_data.zj_delta
      let x1 = []
      x1.push(that.regionalDistribution.r_data.cj_delta.company_count, that.regionalDistribution.r_data.zj_delta.company_count, that.regionalDistribution.r_data.west.company_count, that.regionalDistribution.r_data.central.company_count, that.regionalDistribution.r_data.northeast.company_count, that.regionalDistribution.r_data.bh_rim.company_count, that.regionalDistribution.r_data.jjj.company_count, that.regionalDistribution.r_data.other.company_count)
      let data1 = []
      data1.push(that.regionalDistribution.r_data.cj_delta.account_avg, that.regionalDistribution.r_data.zj_delta.account_avg, that.regionalDistribution.r_data.west.account_avg, that.regionalDistribution.r_data.central.account_avg, that.regionalDistribution.r_data.northeast.account_avg, that.regionalDistribution.r_data.bh_rim.account_avg, that.regionalDistribution.r_data.jjj.account_avg, that.regionalDistribution.r_data.other.account_avg)
      that.drawChart('regionalr', x1, that.regionalDistribution.r_data.legend, data1)
    })
  }
}
</script>
<style lang='less' scoped>
@import url('./icon.css');
.riskManagement {
  .chart-title {
    color: #333;
    border-left: 4px solid #eb6100;
    padding-left: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  .enterprise_credit_list {
    width: 100%;
    height: auto;
    h2 {
      padding: 20px 24px 5px;
      position: relative;
    }
    h3 {
      padding: 10px 42px 5px 24px;
      font-size: 14px;
    }
    .select {
      position: absolute;
      right: 48px;
      top: 20px;
      height: 30px;
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
      }
    }
    .enterprise_list {
      display: flex;
      flex-direction: row;
      padding: 20px 30px;
      border-bottom: 1px solid #eee;
      .left {
        width: 600px;
        height: 300px;
      }
      .right {
        flex: 1;
        height: 300px;
      }
    }
    .h3-title {
      color: #333;
      border-left: 4px solid #eb6100;
      padding-left: 20px;
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
    }
    .h3_list {
      display: flex;
      flex-direction: row;
      .h3-title {
        color: #333;
        border-left: 4px solid #eb6100;
        padding-left: 20px;
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0;
      }
      &>div {
        flex: 1;
        margin: 0 20px 20px;
      }
      .credit-grade {
        border: 1px solid #e8e8e8;
        min-height: 300px;
        height: auto;
        h4 {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          padding: 10px 20px 0;
        }
        .business_grade {
          padding: 20px 20px 0;
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
        .business_grade1 {
          padding: 20px 20px;
          position: relative;
          .business_name {
            font-weight: bold;
            font-size: 14px;
            color: #666;
          }
          .right_left_list {
            display: flex;
            .right_left {
              width: 100px;
              display: inline-block;
              font-weight: normal;
              font-size: 13px;
              padding-top: 5px;
              color: #999;
            }
            .left_right {
              width: 100%;
              flex: 1;
              color: #666;
              font-size: 13px;
              margin-top: 5px;
            }
          }
          ul {
            li {
              p {
                font-weight: normal;
                font-size: 13px;
                padding-top: 5px;
                color: #999;
                width: 70px;
                float: left;
              }
              span {
                float: left;
                width: 100%;
                color: #666;
                font-size: 13px;
              }
            }
          }
        }
      }
      .credit-grade1 {
        min-height: 300px;
        height: auto;
        h4 {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          padding: 10px 20px 0;
        }
        .business_grade {
          padding: 20px 20px 0;
          .business_name {
            font-weight: bold;
            font-size: 14px;
            color: #666;
          }
          .ul_reg {
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
        }
      }
    }
    .h3_qy {
      margin: 0 20px 20px;
      .left {
        h3 {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          padding: 10px 20px 0;
        }
      }
    }
  }
}
</style>
