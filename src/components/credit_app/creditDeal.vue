<template>
  <div class="c_credit_deal">
    <!-- <appNav :father='{selIndex: 5}' type='1'></appNav> -->
    <div class="c_credit_deal_right">
      <!-- <div class="title">
        <img src="../../../static/img/leftbar/myzhaiq.png" alt="">
        <span>债权处置</span>
      </div> -->
      <div class="c_deal_bottom">
        <div class="c_deal_title_top">
          <!-- <p class="c_credit_about">可处置债权<span>关于可处置债权的含义</span></p> -->
          <p class="c_credit_about">可处置债权</p>
          <div class=c_credit_middle>
            <p>{{topOnData.count}}笔</p>
            <p>{{toThousands(topOnData.sum)}}（元）</p>
          </div>
          <div class="c_credit_bottom">
            <span :title="'价值：'+ toThousands(topOnData.gold_sum) +'（元）' + topOnData.gold_count + '张'">价值：{{toThousands(topOnData.gold_sum)}}（元）{{topOnData.gold_count}}张</span>
            <span :title="'价值：'+ toThousands(topOnData.silver_sum) +'（元）' + topOnData.silver_count + '张'">价值：{{toThousands(topOnData.silver_sum)}}（元）{{topOnData.silver_count}}张</span>
            <span :title="'价值：'+ toThousands(0) +'（元）' + '0'+ '张'">价值：{{toThousands(0)}}（元）{{0}}张</span>
          </div>
          <div class="c_jump">
            <img src="../../../static/img/jump.png" alt="" @click="creditDealJump">
          </div>
        </div>
        <div class="c_deal_content">
          <div class="c_on_box">
            <h3>可处置债权明细</h3>
            <div class="c_credit_box" v-for="(item, index) in tableOnData" :key=index>
              <div class="c_credit_item">
                <div class="c_credit_item_top on">
                  <span :class="[item.payment_type === '3' ? 'c_jq' : item.payment_type === '4' ? 'c_yq' : 'c_tq']" :title="'价值：'+ item.payment_value +'（元）1张'">价值：{{item.payment_value}}（元）1张</span>
                  <!-- <span :title="'价值：'+ '122' +'（元）' + '1'+ '张'">价值：{{100}}（元）{{1}}张</span>
                  <span :title="'价值：'+ '12' +'（元）' + '1'+ '张'">价值：{{100}}（元）{{1}}张</span> -->
                </div>
                <div class="c_credit_table">
                  <div class="c_credit_item_title">
                    <span v-for="(title, index) in titleOnData" :key=index>{{title}}</span>
                  </div>
                  <div class="c_credit_item_line">
                    <span>已确认</span>
                    <span>{{item.verified === false ? '未确权' : '已确权'}}</span>
                    <span :title="item.fund_name">{{item.fund_name}}</span>
                    <span>{{item.invoice_code}}</span>
                    <!-- <span>{{1}}</span> -->
                    <span>{{item.payment_type === '1' ? '现金' : item.payment_type === '2' ? '支票' : item.payment_type === '3' ? '银行承兑汇票' : item.payment_type === '4' ? '商业承兑汇票' : '信用证'}}</span>
                    <span>{{toThousands(item.payment_value)}}</span>
                    <span>{{item.payment_date}}</span>
                    <span>
                      <a @click="creditDealJump(item)">债权处置</a>
                      <a @click="creditDealView(item)">查看</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="c_page" v-if="paginationOn.total > 0">
              <el-pagination
                @size-change="handleSizeChange('on')"
                @current-change="handleCurrentChange('on')"
                :current-page.sync="paginationOn.currentPage"
                :page-size="3"
                layout="total, prev, pager, next, jumper"
                :total="paginationOn.total">
              </el-pagination>
            </div>
            <div class="c_empty_accessory" v-if="tableOnData.length === 0">暂无数据</div>
          </div>
          <div class="c_end_box">
            <h3>已处置债权明细</h3>
            <div class="c_credit_box" v-for="(item, index) in tableEndData" :key=index>
              <div class="c_credit_item">
                <div class="c_credit_item_top on">
                  <span :class="[item.payment_type === '3' ? 'c_jq' : item.payment_type === '4' ? 'c_yq' : 'c_tq']" :title="'价值：'+ item.payment_value +'（元）1张'">价值：{{item.payment_value}}（元）1张</span>
                  <!-- <span :title="'价值：'+ '100' +'（元）' + '1'+ '张'">价值：{{100}}（元）{{1}}张</span>
                  <span :title="'价值：'+ '122' +'（元）' + '1'+ '张'">价值：{{100}}（元）{{1}}张</span>
                  <span :title="'价值：'+ '12' +'（元）' + '1'+ '张'">价值：{{100}}（元）{{1}}张</span> -->
                </div>
                <div class="c_credit_table">
                  <div class="c_credit_item_title end">
                    <template v-if="item.management_type === '1'">
                      <span v-for="(title, index) in titleEndCashData" :key=index>{{title}}</span>
                    </template>
                    <template v-if="item.management_type === '2'">
                      <span v-for="(title, index) in titleEndChangeData" :key=index>{{title}}</span>
                    </template>
                  </div>
                  <div class="c_credit_item_line end">
                    <span>{{item.management_type === '1' ? '贴现' : '转移支付'}}</span>
                    <span>{{item.management_type === '1' ? '已贴现' : '已转移'}}</span>
                    <span>{{toThousands(item.payment_value)}}</span>
                    <span>{{item.value ? toThousands(item.value) : toThousands(0)}}</span>
                    <span>{{toThousands(item.cost)}}</span>
                    <span><a @click="creditAlreadyView(item)">查看</a></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="c_page" v-if="paginationEnd.total > 0">
              <el-pagination
                @size-change="handleSizeChange('end')"
                @current-change="handleCurrentChange('end')"
                :current-page.sync="paginationEnd.currentPage"
                :page-size="3"
                layout="total, prev, pager, next, jumper"
                :total="paginationEnd.total">
              </el-pagination>
            </div>
            <div class="c_empty_accessory" v-if="tableEndData.length === 0">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      titleOnData: ['法人确认', '交易企业确权', '促保贷确权', '发票编号', '支付票据类型', '应收金额（元）', '支付票据账期', '操作'],
      titleEndCashData: ['处置类型', '处置状态', '应收总额', '贴现总额', '贴现成本', '操作'],
      titleEndChangeData: ['处置类型', '处置状态', '应收总额', '转移支付总额', '转移支付成本', '操作'],
      tableOnData: [],
      tableEndData: [],
      topOnData: {
        count: 0,
        sum: 0,
        gold_sum: 0,
        gold_count: 0,
        silver_count: 0,
        silver_sum: 0
      },
      paginationOn: {
        total: 0,
        currentPage: 1,
        pageSize: 3
      },
      paginationEnd: {
        total: 0,
        currentPage: 1,
        pageSize: 3
      }
    }
  },
  mounted () {
    this.getOn()
    this.getEnd ()
    let _location = [
      {
        title: '债权处置',
        url: ''
      }
    ]
  },
  methods: {
    // 获取数据
    getOn () {
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&page=' + this.paginationOn.currentPage + '&page_size=' + this.paginationOn.pageSize).then(res => {
        if (res.data.code === '1') {
          this.tableOnData = res.data.data.can_manage.claim_list
          this.topOnData.count = res.data.data.can_manage.count
          this.topOnData.sum = res.data.data.can_manage.sum
          this.topOnData.gold_sum = res.data.data.can_manage.gold_sum
          this.topOnData.gold_count = res.data.data.can_manage.gold_count
          this.topOnData.silver_count = res.data.data.can_manage.silver_count
          this.topOnData.silver_sum = res.data.data.can_manage.silver_sum
          this.paginationOn.total = Number(res.data.total)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getEnd () {
      this.$ajax.get('/api/claims_debt/claims/management/?token=' + this.$token() + '&management=' + '1' + '&page=' + this.paginationEnd.currentPage + '&page_size=' + this.paginationEnd.pageSize).then(res => {
        if (res.data.code === '1') {
          this.tableEndData = res.data.data.has_manage.claim_list
          this.paginationEnd.total = Number(res.data.total)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 分页
    handleSizeChange (state) {
      state === 'on' ? this.getOn() : this.getEnd()
    },
    handleCurrentChange (state) {
      state === 'on' ? this.getOn() : this.getEnd()
    },
    // 债权处置
    creditDealJump (item) {
      this.$router.push({
        path: '/creditOperator',
        query: {
          id: item.id
        }
      })
    },
    // 查看
    creditDealView (item) {
      this.$router.push({
        path: '/creditDetail',
        query: {
          id: item.id
        }
      })
    },
    creditAlreadyView (item) {
      if (item.management_type === '1') {
        this.$router.push({
          path: '/cashPublish',
          query: {
            id: item.id,
            state: 'finish'
          }
        })
      } else {
        this.$router.push({
          path: '/changePay',
          query: {
            id: item.id,
            state: 'finish'
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.c_credit_deal{
  width: 100%;
  display: flex;
  .c_credit_deal_right{
    height: 100%;
    font-size: 14px;
    width: 100%;
    .c_empty_accessory{
      height: 100px;
      font-size: 14px;
      line-height: 100px;
      color: #999;
      text-align: center;
      background: #fff;
      border: 1px solid #eee;
    }
    .title {
      color: #3c4046;
      font-size: 16px;
      line-height: 60px;
      box-shadow: 10px 10px 17px -3px #ddd;
      padding-left: 50px;
      background: #fff;
      img{
        margin-right: 10px;
        vertical-align: middle;
      }
      i {
        color: #eb6100;
        margin-right: 10px;
        font-size: 20px;
      }
    }
    .c_deal_bottom{
      padding: 30px 50px;
      .c_deal_title_top{
        background: #fff;
        position: relative;
        width: 100%;
        padding: 0 100px;
        height: 326px;
        border-radius: 0 0 60px 20px;
        box-shadow:2px 2px 6px 4px rgba(226,226,226,0.50);
        .c_credit_about{
          line-height: 100px;
          font-size: 30px;
          color:#333333;
          span{
            margin-left: 10px;
            cursor: pointer;
            font-size: 12px;
            color: rgba(6,72,157,0.80);
          }
        }
        .c_credit_middle{
          p:nth-of-type(1){
            color: #999;
            font-size: 24px;
            margin-bottom: 10px;
          }
          p:nth-of-type(2){
            font-size: 30px;
            color: #333;
          }
        }
        .c_credit_bottom{
          // line-height: 136px;
          margin-top: 60px;
          span{
            cursor: default;
            max-width: 280px;
            height: 60px;
            line-height: 60px;
            display: inline-block;
            padding-left: 40px;
            margin-left: 50px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            &:nth-of-type(1){
              background: url('../../../static/img/tickets/yinquan.png') no-repeat 7px 10px;
              background-size: 40px;
              margin: 0;
              padding-left: 60px;
            }
            &:nth-of-type(2){
              background: url('../../../static/img/tickets/shangquan.png') no-repeat 7px 10px;
              background-size: 40px;
              padding-left: 60px;
            }
            &:nth-of-type(3){
              background: url('../../../static/img/tickets/shuquan.png') no-repeat 7px 10px;
              background-size: 40px;
              padding-left: 60px;
            }
          }
        }
        .c_jump{
          position: absolute;
          right: 100px;
          bottom: 30px;
          width: 57px;
          height: 57px;
          cursor: pointer;
          background: #fff;
        }
      }
    }
    .c_deal_content{
      padding: 30px 0;
      h3{
        border-left: 5px solid #eb6100;
        padding-left: 10px;
        margin-bottom: 30px;
        margin-top: 20px;
      }
      .c_credit_box{
        .c_credit_item{
          margin-bottom: 30px;
          border: 1px solid #eee;
          .c_credit_item_top{
            padding: 0 50px;
            span{
              background: rgba(216,216,216,0.19);
              line-height: 45px;
              max-width: 230px;
              display: inline-block;
              padding-left: 40px;
              margin-left: 100px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              &:nth-of-type(1){
                background: url('../../../static/img/tickets/jq01.png') no-repeat left center;
                margin: 0;
              }
              &:nth-of-type(2){
                background: url('../../../static/img/tickets/yq01.png') no-repeat left center;
              }
              &:nth-of-type(3){
                background: url('../../../static/img/tickets/tq01.png') no-repeat left center;
              }
            }
            &.on{
              span{
                max-width: 100%;
              }
              .c_jq{
                background: url('../../../static/img/tickets/jq01.png') no-repeat left center;
                background-size: 30px;
              }
              .c_yq{
                background: url('../../../static/img/tickets/yq01.png') no-repeat left center;
                background-size: 30px;
              }
              .c_tq{
                background: url('../../../static/img/tickets/tq01.png') no-repeat left center;
                background-size: 30px;
              }
            }
          }
          .c_credit_table{
            background: #fff;
            padding: 0 20px;
            .c_credit_item_title, .c_credit_item_line{
              border-bottom: 1px dashed #eee;
              display: flex;
              span{
                display: inline-block;
                // width: 11.1%;
                width: 12.5%;
                text-align: center;
                line-height: 45px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                &:last-of-type{
                  a{
                    cursor: pointer;
                    color: #eb6100;
                    text-decoration: underline;
                    margin: 0 5px;
                  }
                }
              }
              &.end{
                span{
                  width: 16.6%;
                  flex: 1;
                }
              }
            }
            .c_credit_item_line{
              border: none;
            }
          }
        }
      }
      .c_page{
        text-align: center;
      }
    }
  }
}
</style>

