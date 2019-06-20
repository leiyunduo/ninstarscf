<template>
  <div id="financing_statistics">
    <div class="flex-add">
      <!-- 企业供应链交易信用 -->
      <div class="financing_statistics">
        <!-- 企业供应链交易信用指数 -->
        <div class="list">
          <h3 class="title">企业供应链交易信用指数</h3>
          <div class="echarts_list">
            <div class="list_nav">
              <h3>企业供应链交易信用指数C(t)</h3>
              <div class="select">
                <selectOption :value="'2019'" @input='listerChild' />
              </div>
            </div>
            <div class="list_data">
              <column :chartData='creditIndex' v-if='creditIndex.data.length > 0' />
            </div>
            <div class="list_data" style="padding: 30px;">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>交易信用指数C(t)</div>
                <div v-for="(item, index) in creditIndex.data" :key='index' :title="toThousands(item)">{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
          <div class="echarts_list">
            <div class="list_nav">
              <h3>应收总池G(t)统计</h3>
              <div class="select">
                <selectOption :value="'2019'" @input='listerChild1' />
              </div>
            </div>
            <div class="list_data">
              <column :chartData='gt_data' v-if='gt_data.data.length > 0' />
            </div>
            <div class="list_data" style="padding: 30px;">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>应收总池G(t)</div>
                <div v-for="(item, index) in gt_data.data" :key='index' :title="toThousands(item)">{{toThousands(item)}}</div>
              </div>
            </div>
          </div>
          <div class="echarts_list">
            <div class="list_nav">
              <h3>应付总池P(t)统计</h3>
              <div class="select">
                <selectOption :value="'2019'" @input='listerChild2' />
              </div>
            </div>
            <div class="list_data">
              <column :chartData='disintegrationData' v-if='disintegrationData.data.length > 0' />
            </div>
            <div class="list_data" style="padding: 30px;">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>应付总池P(t)</div>
                <div v-for="(item, index) in disintegrationData.data" :key='index' :title="toThousands(item)">{{toThousands(item)}}</div>
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
// 柱状图
import column from './echarts/column'
export default {
  name: 'financingStatistics',
  data () {
    return {
      company_id: '',
      tableTitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 供应链交易信用-柱状图
      // 企业供应链交易信用指数（2018年统计）
      creditIndex: {
        title: ['企业供应链交易信用指数'],
        legend: ['企业供应链交易信用指数C(t)'],
        data: [],
        xAxis: [],
        index: 1,
        num: 1,
        name: '（元）',
        color: ['#F2637B']
      },
      // 应收总池G(t)统计（2018年统计）-销售-黄色
      gt_data: {
        legend: ['应收总池G(t)统计'],
        title: ['应收总池G(t)统计'],
        data: [],
        xAxis: [],
        index: 1,
        name: '（元）',
        num: 1,
        color: ['#FAD337']
      },
      // 应付总池P(t)统计-采购-蓝色
      disintegrationData: {
        legend: ['应付总池P(t)统计'],
        title: ['应付总池P(t)统计'],
        data: [],
        xAxis: [],
        index: 1,
        num: 1,
        name: '（元）',
        color: ['#3AA0FF']
      }
    }
  },
  components: {
    selectOption,
    column
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
  },
  methods: {
    // 应付总池P(t)统计-----柱状图-pie
    listerChild (data) {
      let that = this
      // 应付总池P(t)统计-----柱状图-pie
      that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=' + data).then(res => {
        that.creditIndex.xAxis = res.data.x_axis
        that.creditIndex.data = res.data.credit_data
      })
    },
    listerChild1 (data) {
      let that = this
      // 应付总池P(t)统计-----柱状图-pie
      that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=' + data).then(res => {
        that.gt_data.xAxis = res.data.x_axis
        that.gt_data.data = res.data.gt_data
      })
    },
    listerChild2 (data) {
      let that = this
      // 应付总池P(t)统计-----柱状图-pie
      that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=' + data).then(res => {
        that.disintegrationData.xAxis = res.data.x_axis
        that.disintegrationData.data = res.data.payable_data
      })
    }
  }
}
</script>

<style lang="less" scoped>
#financing_statistics {
  .financing_statistics {
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
