<template>
  <div class="c_credit_deal">
    <!-- <appNav :father='{selIndex: 6}' type='1'></appNav> -->
    <div class="c_credit_deal_right">
      <!-- <div class="title">
        <img src="../../../static/img/leftbar/myzhaiq.png" alt="">
        <span>债务处置</span>
      </div> -->
      <div class="c_deal_bottom">
        <div class="c_deal_title_top">
          <p class="c_credit_about">可处置债务</p>
          <div class=c_credit_middle>
            <p>{{manager.count || 0}}笔</p>
            <p>{{toThousands(manager.sum)}}（元）</p>
          </div>
          <div class="c_credit_bottom">
            <span :title="'价值：'+ toThousands(manager.red_bar_sum) +'（元）' + manager.red_bar_count + '张'">价值：{{toThousands(manager.red_bar_sum)}}（元）{{manager.red_bar_count}}张</span>
            <span :title="'价值：'+ toThousands(manager.yellow_bar_sum) +'（元）' + manager.yellow_bar_count + '张'">价值：{{toThousands(manager.yellow_bar_sum)}}（元）{{manager.yellow_bar_count}}张</span>
            <span :title="'价值：'+ toThousands(manager.white_bar_sum) +'（元）' + manager.white_bar_count + '张'">价值：{{toThousands(manager.white_bar_sum)}}（元）{{manager.white_bar_count}}张</span>
            <img @click="creditDealView()" src="../../../static/img/debet/arrow.png" alt="">
          </div>
        </div>
        <div class="c_deal_content">
          <div class="c_on_box">
            <h3>可处置债务明细</h3>
            <div v-if="manager.debts_list.length > 0" class="c_credit_box" v-for="(item, index) in manager.debts_list" :key=index>
              <div class="c_credit_item">
                <div class="c_credit_item_top">
                  <div :style="showImg(item.bar)"></div>
                </div>
                <div class="c_credit_table">
                  <div class="c_credit_item_title">
                    <span v-for="(title, index) in titleOnData" :key=index>{{title}}</span>
                  </div>
                  <div class="c_credit_item_line">
                    <span>已确认</span>
                    <span>{{item.verified ? '已确认' : '未确认'}}</span>
                    <span>{{item.fund_name ? '已确认' : '未确认'}}</span>
                    <span>{{item.contract_number}}</span>
                    <span>{{item.invoice_code}}</span>
                    <span>{{toThousands(item.payment_value)}}</span>
                    <span>{{item.payment_date}}</span>
                    <span>
                      <a @click="creditDealView(item.id)">债务处置</a>
                      <a @click="toDetail(item.id, 1)">查看</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="manager.debts_list.length === 0" class="c_credit_box">
              <div class="c_credit_item">
                <div class="c_credit_table">
                  <div class="c_credit_item_title">
                    <span v-for="(title, index) in titleOnData" :key=index>{{title}}</span>
                  </div>
                  <div class="deal_empty">
                    暂无数据
                  </div>
                </div>
              </div>
            </div>
            <div class="c_page">
              <el-pagination
                @size-change="handleSizeChange('on')"
                @current-change="handleCurrentChange('on')"
                :current-page.sync="paginationOn.currentPage"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="paginationOn.total">
              </el-pagination>
            </div>
          </div>
          <div class="c_end_box">
            <h3>已处置债务明细</h3>
            <div v-if="managered.debts_list.length !== 0" class="c_credit_box" v-for="(item, index) in managered.debts_list" :key=index>
              <div class="c_credit_item">
                <div class="c_credit_item_top">
                  <span :title="'价值：'+ item.bar_info.red_bar_sum +'（元）' + item.bar_info.red_bar_count+ '张'">价值：{{item.bar_info.red_bar_sum}}（元）{{item.bar_info.red_bar_count}}张</span>
                  <span :title="'价值：'+ item.bar_info.yellow_bar_sum +'（元）' + item.bar_info.yellow_bar_count + '张'">价值：{{item.bar_info.yellow_bar_sum }}（元）{{item.bar_info.yellow_bar_count}}张</span>
                  <span :title="'价值：'+ item.bar_info.white_bar_sum +'（元）' + item.bar_info.white_bar_count + '张'">价值：{{item.bar_info.white_bar_sum}}（元）{{item.bar_info.white_bar_count}}张</span>
                </div>
                <div class="c_credit_table">
                  <div class="c_credit_item_title">
                    <span v-for="(title, index) in titleEndData" :key=index>
                      {{title === '总额' ? convertData(item.management_type) + title : title}}
                    </span>
                  </div>
                  <div class="c_credit_item_line">
                    <span>{{convertData(item.management_type)}}</span>
                    <span>已处置</span>
                    <span>{{toThousands(item.value)}}</span>
                    <span>{{toThousands(item.transfer_value)}}</span>
                    <span>
                      <a @click="creditDealView(item.id, item.management_type)">债务处置</a>
                      <!-- <a @click="toDetail(item.id, 2)">查看</a> -->
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="managered.debts_list.length === 0" class="c_credit_box">
              <div class="c_credit_item">
                <div class="c_credit_table">
                  <div class="c_credit_item_title">
                    <span v-for="(title, index) in titleEndData" :key=index>{{title}}</span>
                  </div>
                  <div class="deal_empty">
                    暂无数据
                  </div>
                </div>
              </div>
            </div>
            <div class="c_page">
              <el-pagination
                @size-change="handleSizeChange('end')"
                @current-change="handleCurrentChange('end')"
                :current-page.sync="paginationEnd.currentPage"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="paginationEnd.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      titleOnData: ['法人确认', '交易企业确权', '促保贷确权', '合同编号', '发票代码', '应付金额（元）', '发票日期', '操作'],
      titleEndData: ['处置类型', '处置状态', '应收总额', '总额', '操作'],
      tableOnData: [1,1,1],
      tableEndData: [1,1,1],
      paginationOn: {
        total: 10,
        currentPage: 1
      },
      paginationEnd: {
        total: 10,
        currentPage: 1
      },
      manager: {
        debts_list: []
      },
      managered: {
        debts_list: []
      }
      // flag: ''
    }
  },
  mounted () {
    var that = this
    that.$ajax.get('/api/claims_debt/debt_management/?token=' + that.$token()).then(res => {
      // console.log(res)
      if (res.data.code === '1') {
        that.manager = res.data.data.can_manage
        // console.log(that.manager)
      }
    })
    that.$ajax.get('/api/claims_debt/debt_management/?token=' + that.$token() + '&management=' + 1).then(res1 => {
      // console.log(res1)
      if (res1.data.code === '1') {
        that.managered.debts_list = res1.data.data.has_manage.debts_list
      }
    })
    let _location = [
      {
        title: '债务处置',
        url: ''
      }
    ]
  },
  methods: {
    convertData (data) {
      var result = ''
      if (data) {
        result = data === '1' ? '支付' : (data === '2' ? '拒付' : '转让')
      } else {
        result = ''
      }
      return result
    },
    showImg (obj) {
      if (obj) {
        if (obj === 'red_bar') {
          return "background: url('static/img/tickets/ht01.png') no-repeat left center;background-size: 30px"
        } else if (obj === 'yellow_bar') {
          return "background: url('static/img/tickets/ht001.5png') no-repeat left center;background-size: 30px"
        } else {
          return "background: url('static/img/tickets/bt01.png') no-repeat left center;background-size: 30px"
        }
      }
    },
    // 分页
    handleSizeChange (state) {

    },
    handleCurrentChange (state) {

    },  
    // 查看详情
    toDetail (_id, type) {
      if (_id) {
        this.$router.push({
          path: '/debtInfo',
          query: {
            id: _id,
            type: type
          }
        })
      }
    },
    // 债务处置
    creditDealView (id, type) {
      if(id) {
        if (type) {
          this.$router.push({
            path: '/debtPublish',
            query: {
              id: id,
              type: type,
              delete: 1
            }
          })
        } else {
          this.$router.push({
            path: '/debtIntro',
            query: {
              id: id
            }
          })
        }  
      } else {
        this.$router.push({
          path: '/debtIntro'
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
  //padding-top: 70px;
  .c_credit_deal_right {
    background: #f4f7f8;
    height: 100%;
    font-size: 14px;
    width: 100%;
    .title {
      color: #3c4046;
      font-size: 16px;
      line-height: 60px;
      border-bottom: 1px solid #eee;
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
          line-height: 136px;
          span{
            max-width: 230px;
            display: inline-block;
            padding-left: 40px;
            margin-left: 60px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            &:nth-of-type(1){
              background: url('../../../static/img/tickets/hongtiao.png') no-repeat 7px 48px;
              background-size: 40px;
              margin: 0;
              padding-left: 60px;
            }
            &:nth-of-type(2){
              background: url('../../../static/img/tickets/huangtiao.png') no-repeat 7px 48px;
              background-size: 40px;
              padding-left: 60px;
            }
            &:nth-of-type(3){
              background: url('../../../static/img/tickets/baitiao.png') no-repeat 7px 48px;
              background-size: 40px;
              padding-left: 60px;
            }
          }
          img {
            width: 57px;
            float: right;
            cursor: pointer;
          }
        }
        .to_handler {
          width: 57px;
          height: 57px;
          border: 1px solid #eaeaea;
        }
      }
    }
    .c_deal_content{
      padding: 30px 0;
      h3{
        border-left: 5px solid #eb6100;
        padding-left: 10px;
        margin-bottom: 30px;
      }
      .c_credit_box{
        .c_credit_item{
          margin-bottom: 30px;
          border: 1px solid #eee;
          .c_credit_item_top{
            &>div {
              height: 45px;
            }
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
              cursor: pointer;
              &:nth-of-type(1){
                background: url('../../../static/img/tickets/ht01.png') no-repeat left center;
                background-size: 30px;
                margin: 0;
              }
              &:nth-of-type(2){
                background: url('../../../static/img/tickets/ht001.png') no-repeat left center;
                background-size: 30px;
              }
              &:nth-of-type(3){
                background: url('../../../static/img/tickets/bt01.png') no-repeat left center;
                background-size: 30px;
              }
            }
          }
          .c_credit_table{
            background: #fff;
            padding: 0 20px;
            .c_credit_item_title, .c_credit_item_line{
              border-bottom: 1px dashed #ccc;
              display: flex;
              justify-content: space-around;
              span{
                display: inline-block;
                width: 11.1%;
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
.deal_empty {
  width: 80%;
  height: 43px;
  margin: 0 auto;
  text-align: center;
  line-height: 43px;
  color: #999;
}
</style>

