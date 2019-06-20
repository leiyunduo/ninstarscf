<template>
  <div class="frome">
    <div class="show_table">
      <h3>凭证详情</h3>
      <div class="table_title">
        <div v-for="(t, tndex) in tableTitle" :key='tndex'>{{t.name}}</div>
      </div>
      <div class="teble_item" v-for="(item, index) in showData" :key='index'>
        <div class="table_line">
          <div :title="item.contract_number">{{item.contract_number}}</div>
          <div :title="item.payment_date ? item.payment_date : '暂无数据'">{{item.payment_date ? item.payment_date : '暂无数据'}}</div>
          <div :title="toThousands(item.amount)">{{toThousands(item.amount)}}</div>
          <div :title="!item.pboc ? '未增信': item.pboc">{{!item.pboc ? '未增信': item.pboc}}</div>
          <div :title="!item.government ? '未增信': item.government">{{!item.government ? '未增信': item.government}}</div>
          <div :title="!item.approved_company ? '未增信': item.approved_company">{{!item.approved_company ? '未增信': item.approved_company}}</div>
          <div>
            <div class="file_title" v-if='item.asset_attachment'>
              <div class="file_item">
                <el-popover placement="bottom" width="100" trigger="hover">
                  <ul v-if="item.asset_attachment.settlement_attachment.length !== 0">
                    <li v-for="(f, findex) in item.asset_attachment.settlement_attachment" :key='findex'>
                      <a :href="$root_url() + f.location" target="blank">{{f.name}}</a>
                    </li>
                  </ul>
                  <div class="is_null" v-if="item.asset_attachment.settlement_attachment.length === 0">无结算单</div>
                  <button slot="reference">结算单<i class="el-icon-arrow-down"></i></button>
                </el-popover>
              </div>
              <div class="file_item">
                <el-popover placement="bottom" width="100" trigger="hover">
                  <ul v-if="item.asset_attachment.invoice_attachment.length !== 0">
                    <li v-for="(f, findex) in item.asset_attachment.invoice_attachment" :key='findex'>
                      <a :href="$root_url() + f.location" target="blank">{{f.name}}</a>
                    </li>
                  </ul>
                  <div class="is_null" v-if="item.asset_attachment.invoice_attachment.length === 0">无发票单</div>
                  <button slot="reference">发票原件<i class="el-icon-arrow-down"></i></button>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="data_empty" v-show="showData.length === 0">
        <span>暂无数据</span>
      </div>
      <div class="block">
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
        {name: '合同编号'}, {name: '创建时间'}, {name: '应收金额（元）'}, {name: '人行增信'}, {name: '政府增信'}, {name: '客户增信'}, {name: '票据原件'}
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
    margin: 0 20px 20px;
    .show_table {
      margin-top: 20px;
      background:rgba(255,255,255,1);
      padding-bottom: 32px;
      h3 {
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height: 54px;
        border-bottom: 1px solid rgba(221,221,221,1);
        padding: 0 30px;
      }
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
      .table_title {
        display: flex;
        height:54px;
        background:rgba(250,250,250,1);
        margin: 20px 30px 0 40px;
        flex-direction: row;
        border-bottom: 1px solid rgba(221,221,221,1);
        div {
          width: 20%;
          height: 100%;
          color: #333;
          text-align: center;
          line-height: 54px;
        }
        div:nth-child(3) {
          text-align: right;
          padding-right: 18px;
          width: 20%;
        }
      }
      .teble_item {
        margin: 0 30px 0 40px;
        .table_line {
          display: flex;
          margin: 0 auto;
          height: 54px;
          border-right: none;
          border-bottom: 1px solid rgba(221,221,221,1);
          div {
            width: 20%;
            height: 100%;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            text-align: center;
            line-height: 54px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div:nth-child(3) {
            text-align: right;
            padding-right: 25px;
            width: 20%;
          }
          .file_title {
            width: 100%;
            display: flex;
            flex-direction: row;
            .file_item {
              flex: 1;
              button {
                background: none;
                border: none;
                outline: none;
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(102,102,102,1);
                i {
                  display: inline-block;
                  margin-left: 10px;
                }
              }
              ul {
                li {
                  a {
                    display: block;
                    font-size:12px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    text-decoration:underline;
                    color:rgba(235,97,0,1);
                    padding-bottom: 14px;
                  }
                }
              }
            }
          }
        }
      }
      .block {
        margin: 32px 0 0;
        text-align: center;
      }
    }
  }
  .el-popover {
    ul {
      li {
        a {
          display: block;
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          text-decoration:underline;
          color:rgba(235,97,0,1);
          padding-bottom: 14px;
        }
      }
    }
  }
</style>

<style lang="less">
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #eb6100;
}
</style>
