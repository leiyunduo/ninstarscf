<template>
  <div class="frome">
    <ul class="board">
      <li v-for="(item, key, index) in sum" :key='index'>
        <div class="first_line">
          <p>{{showTitle[index].title}}</p>
          <p class="money">{{toTenThousand(item.total)}}（万元）</p>
        </div>
        <p class="second_line">
          <span>{{showTitle[index].name}}</span>
          <span class="money">{{toTenThousand(item.unGet)}}（万元）</span>
        </p>
      </li>
    </ul>
    <div class="show_table">
      <div class="teble_item" v-for="(item, index) in showData" :key='index' v-show="showData.length > 0">
        <div class="table_title">
          <div v-for="(t, tndex) in tableTitle" :key='tndex'>{{t.name}}</div>
        </div>
        <div class="table_line">
          <div>{{item.contract_number}}</div>
          <div>{{item.contract_create_time}}</div>
          <!-- <div>{{item.asset_type === '1' ? '应收记账' : '应付记账'}}</div> -->
          <div>{{toThousands(item.amount)}}</div>
          <div>{{toThousands(item.received_amount)}}</div>
        </div>
        <p class="file_title_show">票据原件</p>
        <div class="file_title" v-if="item.asset_attachment">
          <!-- <div class="file_item">
            <p>验收单：</p>
            <ul v-if="item.acceptance.length !== 0">
              <li v-for="(f, findex) in item.acceptance" :key='findex'>
                <a :href="$root_url() + f.location" target="blank">{{f.name}}</a>
              </li>
            </ul>
            <div class="is_null" v-if="item.acceptance.length === 0">无验收单</div>
          </div> -->
          <div class="file_item">
            <p>结算单：</p>
            <ul v-if="item.asset_attachment.settlement_attachment.length !== 0">
              <li v-for="(f, findex) in item.asset_attachment.settlement_attachment" :key='findex'>
                <a :href="$root_url() + f.location" target="blank">{{f.name}}</a>
              </li>
            </ul>
            <div class="is_null" v-if="item.asset_attachment.settlement_attachment.length === 0">无结算单</div>
          </div>
          <div class="file_item">
            <p>发票原件：</p>
            <ul v-if="item.asset_attachment.invoice_attachment.length !== 0">
              <li v-for="(f, findex) in item.asset_attachment.invoice_attachment" :key='findex'>
                <a :href="$root_url() + f.location" target="blank">{{f.name}}</a>
              </li>
            </ul>
            <div class="is_null" v-if="item.asset_attachment.invoice_attachment.length === 0">无发票单</div>
          </div>
          <div class="file_item">
            <p>支付凭证：</p>
            <ul v-if="item.asset_attachment.payment_attachment.length !== 0">
              <li v-for="(f, findex) in item.asset_attachment.payment_attachment" :key='findex'>
                <a :href="$root_url() + f.location" target="blank">{{f.name}}</a>
              </li>
            </ul>
            <div class="is_null" v-if="item.asset_attachment.payment_attachment.length === 0">无支付单</div>
          </div>
        </div>
      </div>
      <div class="data_empty" v-show="showData.length === 0">
        <span>暂无数据</span>
      </div>
      <!-- <el-pagination
        v-show="showData.length > 0"
        background
        layout="prev, pager, next"
        :total='total'
        :page-size='pageSize'
        @current-change='changePage'>
      </el-pagination> -->
      <el-pagination v-if="total" @current-change="changePage"
        :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
// 引入echarts
export default {
  name: 'pledge',
  data () {
    return {
      company_id: '',
      total: '',
      pageSize: 5,
      // 分页
      currPage: 1,
      showTitle: [
        {title: '我的应收总额：', name: '我的已收总额：'},
        {title: '我的应付总额：', name: '我的已付总额：'}
      ],
      tableTitle: [
        {name: '合同编号'}, {name: '合同创建时间'}, {name: '应收金额（元）'}, {name: '已收金额（元）'}
      ],
      sum: {
        get: {total: '', unGet: ''},
        pay: {total: '', unGet: ''}
      },
      showData: [
        {
          type: '',
          getting: '',
          getted: '',
          number: 0,
          date_create: '',
          acceptance: [],
          settlement: [],
          invoice: [],
          payment: []
        }
      ]
    }
  },
  props: ['fType', 'fid', 'bid'],
  methods: {
    changePage: function (index) {
      var that = this
      that.$ajax.get('/api/oth/data_portrait/asset_voucher/?page_size=5&company_id=' + that.company_id + '&page=' + index).then(res => {
        that.total = res.data.count
        that.showData = res.data.results
      })
    },
    toTenThousand (data) {
      var num = Number(data)
      num = num * Math.pow(10, -4)
      return this.toThousands(num)
    }
  },
  mounted () {
    var that = this
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    that.$ajax.get('/api/oth/data_portrait/asset_voucher/?page=1&company_id=' + that.company_id + '&page_size=' + 5).then(res => {
      that.total = res.data.count
      that.showData = res.data.results
    })
    this.$ajax.get('/api/oth/asset/robot/?company_id=' + that.company_id).then(res => {
      if (res.status === 200) {
        that.sum = {
          get: {total: res.data.receivable_sum, unGet: res.data.received_sum},
          pay: {total: res.data.payable_sum, unGet: res.data.paid_sum}
        }
      }
    })
  }
}
</script>
<style lang='less' scoped>
  .frome {
    width: 100%;
    .board {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        padding: 30px 20px;
        width: 46%;
        border: 1px solid #ddd;
        border-radius: 6px;
        height: 100%;
        &:nth-of-type(1){
          border-top: 6px solid #eb6100;
        }
        &:nth-of-type(2){
          border-top: 6px solid #1a93ff;
        }
        .first_line {
          line-height: 40px;
          color: #333;
          font-size: 20px;
          p.money {
            text-align: right;
            font-size: 30px;
            padding-bottom: 20px;
            border-bottom: 1px dashed #ccc;
          }
        }
        .second_line {
          margin-top: 20px;
          line-height: 36px;
          color: #333;
          font-size: 16px;
          vertical-align: bottom;
          display: flex;
          display: flex;
          span:first-child {
            width: 43%;
          }
          span.money {
            width: 57%;
            text-align: right;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
    .show_table {
      margin-top: 80px;
      .data_empty {
        margin: 0 auto;
        text-align: center;
        width: 80%;
        border: 1px solid #e8dfdf;
        line-height: 100px;
        color: #999;
        margin-bottom: 50px;
        border-radius: 5px;
        font-size: 14px;
        background: #fff;
      }
      .teble_item {
        margin-top: 20px;
        .table_title{
          background: #e6e9ea;
        }
        .table_title, .table_line {
          display: flex;
          border: 1px solid #ddd;
          margin: 0 auto;
          height: 48px;
          border-right: none;
          div {
            width: 25%;
            height: 100%;
            color: #333;
            text-align: center;
            line-height: 48px;
            border-right: 1px solid #ddd;
          }
        }
        .table_line {
          border-top: none;
        }
        .file_title_show {
          padding: 0 20px;
          // line-height: 60px;
          font-weight: bolder;
          border-left: 4px solid #eb6100;
          margin: 20px 0px;
        }
        .file_title {
          display: flex;
          margin: 0 auto 30px auto;
          padding-bottom: 30px;
          justify-content: space-between;
          border-bottom: 1px dotted #ddd;
          .file_item{
            border: 1px solid #ddd;
            padding: 10px 20px;
          }
          div {
            // display: flex;
            width: 24%;
            p {
              // width: 40%;
              line-height: 36px;
              border-bottom: 1px dashed #ddd;
            }
            ul {
              // width: 60%;
              li {
                line-height: 36px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                a {
                  color: #eb6100;
                }
              }
            }
            .is_null {
              line-height: 36px;
              width: 60%;
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
