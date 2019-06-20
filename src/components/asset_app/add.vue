<template>
  <div class="frome">
    <div class="show_table">
      <div class="teble_item" v-for="(item, index) in showData" :key='index'>
        <div class="date_create">创建时间：{{item.payment_date}}</div>
        <div class="table_title">
          <div v-for="(t, tndex) in tableTitle" :key='tndex'>{{t.name}}</div>
        </div>
        <div class="table_line">
          <div>{{item.contract_number}}</div>
          <!-- <div>{{Number(item.asset_type) === '1' ? '应收记账' : '应付记账'}}</div> -->
          <!-- <div>{{!item.payment_date === '' ? '未结算' : item.payment_date}}</div> -->
          <div>{{toThousands(item.amount)}}</div>
          <div>{{!item.pboc ? '未增信': item.pboc}}</div>
          <div>{{!item.government ? '未增信': item.government}}</div>
          <div>{{!item.approved_company ? '未增信': item.approved_company}}</div>
        </div>
        <p class="file_title_show">票据原件</p>
        <div class="file_title" v-if='item.asset_attachment'>
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
          <div class="file_item" style="border:0">
            <!-- <p>验收单：</p>
            <ul v-if="item.acceptance.length !== 0">
              <li v-for="(f, findex) in item.acceptance" :key='findex'>
                <a :href="$root_url() + f.location" target="blank">{{f.name}}</a>
              </li>
            </ul>
            <div class="is_null" v-if="item.acceptance.length === 0">无验收单</div> -->
          </div>
        </div>
      </div>
      <div class="data_empty" v-show="showData.length === 0">
        <span>暂无数据</span>
      </div>
      <el-pagination
        v-show="showData.length > 0"
        background
        layout="prev, pager, next"
        :total='total'
        :page-size='pageSize'
        @current-change='changePage'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
// 引入echarts
export default {
  name: 'add',
  data () {
    return {
      total: 0,
      pageSize: 5,
      showTitle: [
        {title: '我的应收总额：', name: '我的已收总额：'},
        {title: '我的应付总额：', name: '我的已付出总额：'}
      ],
      tableTitle: [
        {name: '合同编号'}, {name: '应收金额（元）'}, {name: '人行增信'}, {name: '政府增信'}, {name: '客户增信'}
      ],
      showData: [],
      company_id: ''
    }
  },
  props: ['fType', 'fid', 'bid'],
  methods: {
    changePage: function (page) {
      var that = this
      that.$ajax.get('/api/oth/data_portrait/asset_voucher/?page=' + page + '&company_id=' + that.company_id + '&page_size=' + 5).then(res => {
        that.total = res.data.count
        that.showData = res.data.results
      })
    }
  },
  mounted () {
    var that = this
    that.company_id = localStorage.id
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    that.$ajax.get('/api/oth/data_portrait/asset_voucher/?page=1&company_id=' + that.company_id + '&page_size=' + 5).then(res => {
      that.total = res.data.count
      that.showData = res.data.results
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
        padding: 30px 40px;
        width: 43%;
        border: 2px solid #eb6100;
        height: 100%;
        .first_line {
          line-height: 40px;
          color: #333;
          font-size: 20px;
          display: flex;
          span:first-child {
            width: 50%;
          }
          span.money {
            width: 50%;
            text-align: right;
            font-size: 26px;;
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
            width: 50%;
          }
          span.money {
            width: 50%;
            text-align: right;
            font-size: 20px;;
          }
        }
      }
    }
    .show_table {
      margin-top: 50px;
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
        .date_create {
          // width: 90%;
          margin: 0 auto;
          // line-height: 40px;
          color: #333;
          font-weight: bolder;
          border-left: 4px solid #eb6100;
          padding-left: 20px;
          margin: 20px 0px;
          // text-align: right;
        }
        .table_title {
          background: #e6e9ea;
        }
        .table_title, .table_line {
          display: flex;
          border: 1px solid #ddd;
          margin: 0 auto;
          height: 40px;
          border-right: none;
          div {
            width: 20%;
            height: 100%;
            color: #333;
            text-align: center;
            line-height: 40px;
            border-right: 1px solid #ddd;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .table_line {
          border-top: none;
          font-size: 14px;
        }
        .file_title {
          display: flex;
          margin: 0 auto 30px auto;
          padding-bottom: 30px;
          justify-content: space-between;
          border-bottom: 1px dotted #e8dfdf;
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
              width: 100%;
              line-height: 36px;
              width: 60%;
              color: #999;
            }
          }
        }
        .file_title_show {
          padding: 0 20px;
          line-height: 60px;
          font-weight: bolder;
        }
      }
    }
  }
</style>
