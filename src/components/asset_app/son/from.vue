<template>
  <div class="frome">
    <ul class="board">
      <li v-for="(item, key, index) in sum" :key='index'>
        <div class="li_list">
          <div class="img_div">
            <img src="../../../../static/img/asset/receivable.png" alt="">
          </div>
          <div>
            <p>我的应收总额：</p>
            <p class="money">{{toTenThousand(item.total)}}<span>（万元）</span></p>
          </div>
        </div>
        <div class="li_list">
          <div class="img_div">
            <img src="../../../../static/img/asset/Accepted.png" alt="">
          </div>
          <div>
            <p>我的已收总额：</p>
            <p class="money">{{toTenThousand(item.unGet)}}<span>（万元）</span></p>
          </div>
        </div>
        <div class="li_list">
          <div class="img_div">
            <img src="../../../../static/img/asset/cope.png" alt="">
          </div>
          <div>
            <p>我的应付总额：</p>
            <p class="money">{{toTenThousand(item.total1)}}<span>（万元）</span></p>
          </div>
        </div>
        <div class="li_list">
          <div class="img_div">
            <img src="../../../../static/img/asset/paid.png" alt="">
          </div>
          <div>
            <p>我的已付总额：</p>
            <p class="money">{{toTenThousand(item.unGet1)}}<span>（万元）</span></p>
          </div>
        </div>
      </li>
    </ul>
    <div class="show_table">
      <h3>凭证详情</h3>
      <div class="table_title">
        <div v-for="(t, tndex) in tableTitle" :key='tndex'>{{t.name}}</div>
      </div>
      <div class="teble_item" v-for="(item, index) in showData" :key='index' v-show="showData.length > 0">
        <div class="table_line">
          <div :title="item.contract_number">{{item.contract_number}}</div>
          <div :title="item.contract_create_time">{{item.contract_create_time}}</div>
          <!-- <div>{{item.asset_type === '1' ? '应收记账' : '应付记账'}}</div> -->
          <div :title="toThousands(item.amount)">{{toThousands(item.amount)}}</div>
          <div :title="toThousands(item.received_amount)">{{toThousands(item.received_amount)}}</div>
          <div>
            <div class="file_title" v-if="item.asset_attachment">
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
              <div class="file_item">
                <el-popover placement="bottom" width="100" trigger="hover">
                  <ul v-if="item.asset_attachment.payment_attachment.length !== 0">
                    <li v-for="(f, findex) in item.asset_attachment.payment_attachment" :key='findex'>
                      <a :href="$root_url() + f.location" target="blank">{{f.name}}</a>
                    </li>
                  </ul>
                  <div class="is_null" v-if="item.asset_attachment.payment_attachment.length === 0">无支付单</div>
                  <button slot="reference">支付凭证<i class="el-icon-arrow-down"></i></button>
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
        <el-pagination v-if="total" @current-change="changePage" background
          :current-page="currPage" :page-size="pageSize" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
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
      tableTitle: [
        {name: '合同编号'}, {name: '合同创建时间'}, {name: '应收金额（元）'}, {name: '已收金额（元）'}, {name: '票据原件'}
      ],
      sum: {
        get: {
          total: '',
          unGet: '',
          total1: '',
          unGet1: ''
        }
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
          get: {
            total: res.data.receivable_sum, unGet: res.data.received_sum,
            total1: res.data.payable_sum, unGet1: res.data.paid_sum
          }
        }
      }
    })
  }
}
</script>

<style lang='less' scoped>
  .frome {
    width: 100%;
    margin: 0 20px 20px;
    .board {
      width: 100%;
      display: flex;
      flex-direction: row;
      li {
        flex: 1;
        display: flex;
        flex-direction: row;
        .li_list {
          flex: 1;
          margin-right: 18px;
          display: flex;
          flex-direction: row;
          .img_div {
            width:100px;
            height:100px;
            background:linear-gradient(45deg,rgba(235,97,0,1) 0%,rgba(255,174,13,1) 100%);
            box-shadow:2px 0px 4px 0px rgba(235, NaN, 97, 0.35);
            border-radius:4px 0px 0px 4px;
          }
          div:last-child {
            height:100px;
            flex: 1;
            background:rgba(255,255,255,1);
            border-radius:4px 0px 0px 4px;
            p:first-child {
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(153,153,153,1);
              padding: 19px 0 18px 20px;
            }
            p:last-child {
              font-size:24px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(235,97,0,1);
              padding-left: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span {
                font-size: 12px;
              }
            }
          }
        }
        .li_list:nth-child(3),.li_list:nth-child(4) {
          .img_div {
            width:100px;
            height:100px;
            background:linear-gradient(45deg,rgba(12,141,255,1) 0%,rgba(77,221,247,1) 100%);
            box-shadow:-1px 1px 4px 0px rgba(12, 255, 142, 0.35);
            border-radius:4px 0px 0px 4px;
          }
          div:last-child {
            p:last-child {
              font-size:24px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(13,142,255,1);
            }
          }
        }
      }
    }
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
          width: 25%;
          height: 100%;
          color: #333;
          text-align: center;
          line-height: 54px;
        }
        div:nth-child(3),div:nth-child(4) {
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
            width: 25%;
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
          div:nth-child(3),div:nth-child(4) {
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
