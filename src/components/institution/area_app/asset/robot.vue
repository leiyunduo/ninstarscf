<template>
  <div class="n_nobot1 bank">
    <div class="c_ticket1">
      <div class="bottom">
        <h3>券条统计</h3>
        <div>
          <h4>应付类</h4>
          <div class="dl_list">
            <dl>
              <dt><img class="barIcon" src="static/img/tickets/hongtiao.png" alt=""></dt>
              <dd>
                <p class="one"><span>红条总额：</span><span class="span" :title="toTenThousand(ticbar.red_bar.sum) || 0 + '万元'">{{toTenThousand(ticbar.red_bar.sum) || 0}} 万元</span></p>
                <p class="one"><span>红条总数：</span><span>{{ticbar.red_bar.count || 0}} 张</span></p>
              </dd>
            </dl>
            <dl>
              <dt><img class="barIcon" src="static/img/tickets/huangtiao.png" alt=""></dt>
              <dd>
                <p class="one"><span>黄条总额：</span><span class="span" :title="toTenThousand(ticbar.yellow_bar.sum) || 0 + '万元'">{{toTenThousand(ticbar.yellow_bar.sum) || 0}} 万元</span></p>
                <p class="one"><span>黄条总数：</span><span>{{ticbar.yellow_bar.count || 0}} 张</span></p>
              </dd>
            </dl>
            <dl>
              <dt><img class="barIcon" src="static/img/tickets/baitiao.png" alt=""></dt>
              <dd>
                <p class="one"><span>白条总额：</span><span class="span" :title="toTenThousand(ticbar.white_bar.sum) || 0 + '万元'">{{toTenThousand(ticbar.white_bar.sum) || 0}} 万元</span></p>
                <p class="one"><span>白条总数：</span><span>{{ticbar.white_bar.count || 0}} 张</span></p>
              </dd>
            </dl>
          </div>
        </div>
        <div>
          <h4>应收类</h4>
          <div class="dl_list">
            <dl>
              <dt><img class="barIcon" src="static/img/tickets/yinquan.png" alt=""></dt>
              <dd>
                <p class="one"><span>银券总额：</span><span class="span" :title="toTenThousand(ticbar.bank_ticket.sum) || 0 + '万元'">{{toTenThousand(ticbar.bank_ticket.sum) || 0}} 万元</span></p>
                <p class="one"><span>银券总数：</span><span>{{ticbar.bank_ticket.count || 0}} 张</span></p>
              </dd>
            </dl>
            <dl>
              <dt><img class="barIcon" src="static/img/tickets/shangquan.png" alt=""></dt>
              <dd>
                <p class="one"><span>商券总额：</span><span class="span" :title="toTenThousand(ticbar.business_ticket.sum) || 0 + '万元'">{{toTenThousand(ticbar.business_ticket.sum) || 0}} 万元</span></p>
                <p class="one"><span>商券总数：</span><span>{{ticbar.business_ticket.count || 0}} 张</span></p>
              </dd>
            </dl>
            <dl>
              <dt><img class="barIcon" src="static/img/tickets/shuquan.png" alt=""></dt>
              <dd>
                <p class="one"><span>数券总额：</span><span class="span" :title="toTenThousand(ticbar.digital_ticket.sum) || 0 + '万元'">{{toTenThousand(ticbar.digital_ticket.sum) || 0}} 万元</span></p>
                <p class="one"><span>数券总数：</span><span>{{ticbar.digital_ticket.count || 0}} 张</span></p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="n_nobot_content bank">
      <div class="ul_list_robot">
        <h3>
          <span>大数据画像</span>
          <el-select v-model="timeValue" @change="handleTimeRobot(timeValue)" placeholder="请选择" size="mini">
            <el-option
              v-for="item in timeList"
              :key="item.key"
              :label="item.title"
              :value="item.key">
            </el-option>
          </el-select>
        </h3>
      </div>
      <div class="robot_list bank">
        <img src="../../../../../static/img/n_robot/background.png" alt="" class="robot_background bank">
        <img src="../../../../../static/img/n_robot/robot.png" alt="" class="robot_robot bank">
        <div class="top">
          <div class="top_content">
            <div class="div2"></div>
            <div class="div3"></div>
            <p class="p">资产总值
              <span v-if="isFriend">{{handleUnit(clover.asset_sum)}}</span>
              <span v-else class="not_friend">*******</span>
            </p>
          </div>
          <div class="line">
            <div class="line1"></div>
            <div class="line2">
              <div class="heng"></div>
              <div class="radio"></div>
            </div>
          </div>
        </div>
        <div class="left_robot bank">
          <div class="left_robot_div left_robot_div1">
            <div class="top_content">
              <div class="div2"></div>
              <div class="div3"></div>
              <ul>
                <li :title="handleUnit(clover.demand_sum)"><span>需求总额：</span><p>{{handleUnit(clover.demand_sum)}}</p></li>
                <li><span>笔数：</span><p>{{clover.demand_count}}</p></li>
                <li><span>成功率：</span><p>{{(clover.success_rate * 100).toFixed(2)  + '%'}}</p></li>
              </ul>
            </div>
            <div class="line">
              <div class="line2">
                <div class="radio"></div>
                <div class="heng"></div>
              </div>
              <div class="line1"></div>
              <div class="line3"><h3>融资需求</h3></div>
              <img src="../../../../../static/img/n_robot/circular.png" alt="">
            </div>
          </div>
          <div class="left_robot_div left_robot_div2">
            <div class="top_content">
              <div class="div2"></div>
              <div class="div3"></div>
              <ul>
                <li :title="handleUnit(clover.pledge_sum)"><span>质押总额：</span><p>{{handleUnit(clover.pledge_sum)}}</p></li>
                <li><span>笔数：</span><p>{{clover.demand_count}}</p></li>
                <li><span>银券率：</span><p>{{(clover.bank_ticket_rate * 100).toFixed(2)  + '%' || 0}}</p></li>
              </ul>
            </div>
            <div class="line">
              <div class="line2">
                <div class="radio"></div>
                <div class="heng"></div>
              </div>
              <div class="line1"></div>
              <div class="line3"><h3>质押融资记录</h3></div>
              <img src="../../../../../static/img/n_robot/circular.png" alt="">
            </div>
          </div>
          <div class="left_robot_div left_robot_div3">
            <div class="top_content">
              <div class="div2"></div>
              <div class="div3"></div>
              <ul v-if='isFriend'>
                <li :title="handleUnit(clover.receivable_sum)"><span>应收总额：</span><p>{{handleUnit(clover.receivable_sum)}}</p></li>
                <li :title="handleUnit(clover.received_sum)"><span>已收总额：</span><p>{{handleUnit(clover.received_sum)}}</p></li>
                <li><span>总逾期率：</span><p>{{clover.s_over_rate ? (clover.s_over_rate.over_rate * 100).toFixed(2) + '%' : 0 + '%'}}</p></li>
              </ul>
              <ul v-else>
                <li><span>应收：</span><p>**********</p></li>
                <li><span>已收：</span><p>**********</p></li>
                <li><span>未收：</span><p>**********</p></li>
              </ul>
            </div>
            <div class="line">
              <div class="line2">
                <div class="radio"></div>
                <div class="heng"></div>
              </div>
              <div class="line1"></div>
              <div class="line3"><h3>应收统计</h3></div>
              <div class="big_circular"><div class="small_circular"></div></div>
            </div>
          </div>
          <div class="left_robot_div left_robot_div4">
            <div class="line">
              <div class="line2">
                <div class="radio"></div>
                <div class="heng"></div>
              </div>
              <div class="top_content1_line1"></div>
              <div class="line3"><h3>券统计</h3></div>
              <div class="big_circular"><div class="small_circular"></div></div>
            </div>
            <div class="top_content top_content1">
              <div class="top_content1_div2"></div>
              <div class="top_content1_div3"></div>
              <ul>
                <li :title="handleUnit(clover.bank_ticket)">
                  <span>银劵总额：</span>
                  <p v-if="isFriend">{{handleUnit(clover.bank_ticket)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
                <li :title="handleUnit(clover.business_ticket)">
                  <span>商劵总额：</span>
                  <p v-if="isFriend">{{handleUnit(clover.business_ticket)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
                <li :title="handleUnit(clover.digital_ticket)">
                  <span>数劵总额：</span>
                  <p v-if="isFriend">{{handleUnit(clover.digital_ticket)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right_robot bank">
          <div class="right_robot_div">
            <div class="top_content">
              <div class="div2"></div>
              <div class="div3"></div>
              <ul>
                <li><span>贷款笔数：</span><p>{{clover.demand_count + '笔'}}</p></li>
                <li><span style="width: 85px;display:inline-block;">贷款逾期率：</span><p>{{(clover.overdue_rate * 100).toFixed(2) + '%'}}</p></li>
                <li><span style="width: 85px;display:inline-block;">贷款坏账率：</span><p>{{(clover.bad_rate * 100).toFixed(2) + '%'}}</p></li>
              </ul>
            </div>
            <div class="line">
              <img src="../../../../../static/img/n_robot/circular.png" alt="">
              <div class="line1"><h3>信贷记录与评估</h3></div>
              <div class="line3"></div>
              <div class="line2">
                <div class="radio"></div>
                <div class="heng"></div>
              </div>
            </div>
          </div>
          <div class="right_robot_div right_robot_div1">
            <div class="top_content">
              <div class="div2"></div>
              <div class="div3"></div>
              <ul>
                <li :title="handleUnit(clover.stock_sum)">
                  <span>存货余值：</span>
                  <p v-if="isFriend">{{handleUnit(clover.stock_sum)}}</p>
                  <p v-else class="not_friend">*******</p>
                </li>
                <li :title="handleUnit(clover.receipt_sum)">
                  <span>存单余值：</span>
                  <p v-if="isFriend">{{handleUnit(clover.receipt_sum)}}</p>
                  <p v-else class="not_friend">*******</p>
                </li>
              </ul>
            </div>
            <div class="line">
              <img src="../../../../../static/img/n_robot/circular.png" alt="">
              <div class="line1"><h3>存货/存单</h3></div>
              <div class="robot_div1_line3"></div>
              <div class="line2">
                <div class="radio"></div>
                <div class="heng"></div>
              </div>
            </div>
          </div>
          <div class="right_robot_div right_robot_div2">
            <div class="top_content">
              <div class="div2"></div>
              <div class="div3"></div>
              <ul v-if='isFriend'>
                <li :title="handleUnit(clover.payable_sum)"><span>应付总额：</span><p>{{handleUnit(clover.payable_sum)}}</p></li>
                <li :title="handleUnit(clover.paid_sum)"><span>已付总额：</span><p>{{handleUnit(clover.paid_sum)}}</p></li>
                <li><span>总逾期率：</span><p>{{clover.r_over_rate ? (clover.r_over_rate.over_rate * 100).toFixed(2) + '%' : 0 + '%'}}</p></li>
              </ul>
              <ul v-else>
                <li><span>应付：</span><p>**********</p></li>
                <li><span>已付：</span><p>**********</p></li>
                <li><span>未付：</span><p>**********</p></li>
              </ul>
            </div>
            <div class="line">
              <div class="big_circular"><div class="small_circular"></div></div>
              <div class="line1"><h3>应付统计</h3></div>
              <div class="robot_div1_line3"></div>
              <div class="line2">
                <div class="radio"></div>
                <div class="heng"></div>
              </div>
            </div>
          </div>
          <div class="right_robot_div right_robot_div3">
            <div class="line">
              <div class="line2">
                <div class="radio"></div>
                <div class="heng"></div>
              </div>
              <div class="top_content1_line1"></div>
              <div class="line1"><h3>条统计</h3></div>
              <div class="big_circular"><div class="small_circular"></div></div>
            </div>
            <div class="top_content top_content1">
              <div class="top_content1_div2"></div>
              <div class="top_content1_div3"></div>
              <ul>
                <li :title="handleUnit(ticbar.red_bar.sum)">
                  <span>红条总额：</span>
                  <p v-if="isFriend">{{handleUnit(ticbar.red_bar.sum)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
                <li :title="handleUnit(ticbar.yellow_bar.sum)">
                  <span>黄条总额：</span>
                  <p v-if="isFriend">{{handleUnit(ticbar.yellow_bar.sum)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
                <li :title="handleUnit(ticbar.white_bar.sum)">
                  <span>白条总额：</span>
                  <p v-if="isFriend">{{handleUnit(ticbar.white_bar.sum)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ring bank">
      <ring :bid='company_id' />
    </div>
  </div>
</template>
<script>
import Ring from '@/components/public/ring-all.vue'
export default {
  name: 'robot',
  components: {
    Ring
  },
  data () {
    return {
      hoverData: {
        showFinaceLine: false,
        showCriditLine: false,
        showPledgeLine: false,
        showArapLine: false,
        showArLine: false,
        showAyLine: false,
        showDepositLine: false,
        showStockLine: false,
        showAssetLine: false,
        showBanckLine: false,
        showBusLine: false,
        showNumLine: false
      },
      clover: {},
      showIndex: 0,
      showTickets: [],
      receivableList: [],
      payableList: [],
      showList: [],
      ticbar: {
        red_bar: {},
        yellow_bar: {},
        white_bar: {},
        bank_ticket: {},
        business_ticket: {},
        digital_ticket: {}
      },
      nullInfo: '暂无记账',
      isFriend: true,
      list: [],
      tabTitle: ['应收类', '应付类'],
      paymentType: ['', '现金', '支票', '银行承兑汇票', '商业承兑汇票', '信用证', '其他'],
      tableTitle: ['所属合同', '交易公司', '价值(万元)', '结算日期', '支付方式'],
      businessId: localStorage.id,
      company_id: '',
      timeList: [
        {title: '总览', key: null},
        {title: '第一季度', key: '&time_zone=Q1'},
        {title: '第二季度', key: '&time_zone=Q2'},
        {title: '第三季度', key: '&time_zone=Q3'},
        {title: '第四季度', key: '&time_zone=Q4'},
        {title: '上半年', key: '&time_zone=Y1'},
        {title: '下半年', key: '&time_zone=Y2'},
        {title: '2018年', key: '&time_zone=2018'}
      ],
      timeValue: '总览',
      selTime: 0
    }
  },
  props: ['fType', 'fid', 'bid'],
  created () {
    var that = this
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    this.$ajax.get('/api/oth/asset/robot/?company_id=' + that.company_id).then(res => {
      if (res.status === 200) {
        if (res.data.receivable) {
          res.data.bank_ticket = res.data.receivable.bank_ticket.sum
          res.data.digital_ticket = res.data.receivable.digital_ticket.sum
          res.data.business_ticket = res.data.receivable.business_ticket.sum
          this.ticbar = {...res.data.receivable, ...res.data.payable}
        }
        this.clover = res.data
      }
    })
    this.$ajax.get('/api/oth/asset/asset_pool/?company_id=' + that.company_id).then(res =>　{
      if (res.status === 200) {
        that.showList = res.data.receivable_list
        that.receivableList  = res.data.receivable_list.sort(that.$sortChain)
        that.payableList = res.data.payable_list.sort(that.$sortChain)
      }
    })
  },
  methods: {
    toTenThousand (data) {
      var num = Number(data)
      num = num * Math.pow(10, -4)
      return this.toThousands(num)
    },
    // 整理显示数值
    handleUnit (num) {
      const that = this
      if (num > 10000) {
        return that.toThousands(num / 10000) + '（万元）'
      } else {
        return that.toThousands(num) + '（元）'
      }
    },
    // 机器人
    handleTimeRobot (e, item, index) {
      const that = this
      let timezone = item.key || ''
      this.selTime = index
      this.$ajax.get('/api/oth/asset/robot/?company_id=' + that.company_id + timezone).then(res => {
        if (res.status === 200) {
          if (res.data.receivable) {
            res.data.bank_ticket = res.data.receivable.bank_ticket.sum
            res.data.digital_ticket = res.data.receivable.digital_ticket.sum
            res.data.business_ticket = res.data.receivable.business_ticket.sum
            this.ticbar = {...res.data.receivable, ...res.data.payable}
          }
          this.clover = res.data
        }
      })
    },
    // 整理显示数值
    handleUnit (num) {
      const that = this
      if (num > 10000) {
        return that.toThousands(num / 10000) + '(万元)'
      } else {
        return that.toThousands(num) + '(元)'
      }
    },
    changeTab: function ($event, index) {
      var that = this
      if (index === 0) {
        that.tableTitle = ['所属合同', '交易公司', '价值(万元)', '结算日期', '支付方式']
        that.showIndex = 0
        that.showList = that.receivableList
      } else {
        that.showIndex = 1
        that.tableTitle = ['所属合同', '交易公司', '价值(万元)', '结算日期']
        that.showList = that.payableList
      }
    },
    handleJump ($event, index) {
      // console.log(index)
      this.$emit('changeIndex', index)
    },
    convertData: function (data) {
      var number = data || 0
      if (number > Math.pow(10, 4)) {
        number = number * Math.pow(10, -4)
      }
      return number
    },
    isShowLine (num) {
      var that = this
      switch (num) {
        case 1:
          that.hoverData.showFinaceLine = true
          break
        case 2:
          that.hoverData.showCriditLine = true
          break
        case 3:
          that.hoverData.showPledgeLine = true
          break
        case 4:
          that.hoverData.showArapLine = true
          break
        case 5:
          that.hoverData.showArLine = true
          break
        case 6:
          that.hoverData.showAyLine = true
          break
        case 7:
          that.hoverData.showDepositLine = true
          break
        case 8:
          that.hoverData.showStockLine = true
          break
        case 9:
          that.hoverData.showAssetLine = true
          break
        case 10:
          that.hoverData.showBanckLine = true
          break
        case 11:
          that.hoverData.showBusLine = true
          break
        case 12:
          that.hoverData.showNumLine = true
          break
      }
    },
    notLine () {
      this.hoverData.showFinaceLine = false
      this.hoverData.showCriditLine = false
      this.hoverData.showPledgeLine = false
      this.hoverData.showArapLine = false
      this.hoverData.showArLine = false
      this.hoverData.showAyLine = false
      this.hoverData.showDepositLine = false
      this.hoverData.showStockLine = false
      this.hoverData.showAssetLine = false
      this.hoverData.showBanckLine = false
      this.hoverData.showBusLine = false
      this.hoverData.showNumLine = false
    },
    handleChian (item) {
      let url = ''
      item.chain_type === '1' ? url = 'receive_chain' : url = 'payment_chain'
      window.open(`#/chain_app/${url}?id=${item.chain_id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.n_nobot1 {
  width: 100%;
  position: relative;
  margin: 0 auto;
  &.bank {
    height: 1200px;
  }
  .c_ticket1 {
    width: 100%;
    .bottom {
      width:100%;
      height:255px;
      background:rgba(255,255,255,1);
      h3 {
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height: 54px;
        padding: 0 30px;
        border-bottom: 1px solid rgba(220,220,220,1);
      }
      &>div {
        width: 100%;
        padding: 0 30px;
        h4 {
          font-size:14px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
          padding: 23px 0 10px 0;
        }
        .dl_list {
          display: flex;
        }
        dl {
          flex: 1;
          display: flex;
          flex-direction: row;
          position: relative;
          dt {
            img {
              margin-right: 19px;
              margin-top: 5px;
              &.barIcon {
                width: 40px;
              }
            }
            &.ticket-title {
              position: absolute;
              line-height: 57px;
              left: 20px;
              span {
                color: #666;
                font-weight: bolder;
                font-size: 14px;  
              }
            }
          }
          dd {
            display: flex;
            align-items: center;
            .one {
              padding-right: 29px;
              span:first-child {
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(153,153,153,1);
              }
              span:last-child {
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(153,153,153,1);
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
        dl:last-child {
          border: none;
        }
      }
    }
  }
  .n_nobot_content {
    position: absolute;
    background: #fff;
    &.bank {
      top: 280px;
    }
    width: 100%;
    height: 1000px;
    background-size: cover;
    .ul_list_robot {
      height: 45px;
      h3 {
        display: flex;
        flex-direction: row;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height: 54px;
        padding: 0 30px;
        border-bottom: 1px solid rgba(220,220,220,1);
        span {
          flex: 1;
        }
      }
    }
    .robot_list {
      text-align: center;
      position: relative;
      height: 800px;
      margin-left: -62px;
      &.bank {
        margin-top: 120px;
      }
      .robot_background {
        position: absolute;
        bottom: 18%;
        &.bank {
          left: 32%; //bank
        }
      }
      .robot_robot {
        position: absolute;
        &.bank {
          left: 39%; //bank
        }
      }
      .top {
        height: 100px;
        width: 250px;
        position: absolute;
        left: 42%;
        top: -9%;
        .top_content {
          width:236px;
          height:60px;
          background:rgba(255,255,255,1);
          border:2px solid rgba(235,97,0,1);
          position: relative;
          .div2{
            width: 30px;
            height: 30px;
            border-top: 2px solid #eb6100;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            position: absolute;
            top: -16px;
            left: -16px;
            background-color: #fff;
          }
          .div3{
            width: 30px;
            height: 30px;
            border-left: 2px solid rgba(235,97,0,1);
            transform: rotate(45deg);
            position: absolute;
            bottom: -16px;
            right: -16px;
            background-color: #fff;
          }
          .p {
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:60px;
            width:236px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 10px;
            span {
              display: inline-block;
              font-size:14px;
              line-height:60px;
              font-family:MicrosoftYaHei;
              font-weight:bold;
              color:rgba(102,102,102,1);
              padding-left: 10px;
            }
            .not_friend {
              color: #999;
            }
          }
        }
        .line {
          width:90px;
          height:25px;
          border-left:2px solid rgba(235,97,0,1);
          border-top:2px solid rgba(235,97,0,1);
          position: relative;
          margin-bottom: 100px;
          margin-top: 6px;
          margin-left: 55%;
          .line1{
            width: 22px;
            height: 22px;
            border-left: 2px solid rgba(235,97,0,1);
            transform: rotate(45deg);
            position: absolute;
            top: -12px;
            right: -18px;
            background-color: #fff;
          }
          .line2 {
            position: absolute;
            right: -29px;
            top: -16px;
          }
          .heng {
            float: left;
            width: 15px;
            height: 2px;
            background: rgba(235,97,0,1);
          }
          .radio {
            float: left;
            width:8px;
            height:8px;
            border:2px solid rgba(235,97,0,1);
            border-radius:50%;
            margin-top: -3px;
          }
        }
      }
      .left_robot {
        width: 310px;
        position: absolute;
        top: 10px;
        &.bank {
          left: 23%; // bank
        }
        .left_robot_div {
          width:211px;
          height:99px;
          background:rgba(255,255,255,1);
          border:2px solid rgba(235,97,0,1);
          position: relative;
          .top_content {
            .div2{
              width: 30px;
              height: 30px;
              border-top: 2px solid #eb6100;
              -webkit-transform: rotate(135deg);
              transform: rotate(135deg);
              position: absolute;
              top: -16px;
              left: -16px;
              background-color: #fff;
            }
            .div3{
              width: 30px;
              height: 30px;
              border-left: 2px solid rgba(235,97,0,1);
              transform: rotate(45deg);
              position: absolute;
              bottom: -16px;
              right: -16px;
              background-color: #fff;
            }
            ul {
              padding: 12px 10px 10px;
              li {
                display: flex;
                flex-direction: row;
                line-height: 24px;
                span {
                  font-size:14px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                  width:72px;
                  display: inline-block;
                  text-align: left;
                }
                p {
                  flex: 1;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-size:14px;
                  font-family:MicrosoftYaHei;
                  font-weight:bold;
                  color:rgba(102,102,102,1);
                  text-align: right;
                  padding-left: 10px;
                  max-width: 120px;
                }
                .not_friend {
                  color: #999;
                }
              }
            }
          }
          .line {
            width:210px;
            height:25px;
            position: relative;
            margin-bottom: 100px;
            margin-top: -47px;
            margin-left: 55%;
            .line1{
              width: 22px;
              height: 22px;
              border-right: 2px solid #eb6100;
              -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
              position: absolute;
              bottom: -28px;
              left: 33%;
            }
            .line2 {
              position: absolute;
              left: -28px;
              bottom: -36px;
            }
            .line3 {
              width: 104px;
              height: 28px;
              border-bottom: 2px solid #eb6100;
              position: absolute;
              right: 11px;
              bottom: -18px;
              h3 {
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:bold;
                color:rgba(51,51,51,1);
                padding-bottom: 6px;
              }
            }
            img {
              position: absolute;
              right: -17px;
              bottom: -35px;
            }
            .heng {
              float: left;
              width: 101px;
              height: 2px;
              background: rgba(235,97,0,1);
            }
            .radio {
              float: left;
              width:8px;
              height:8px;
              border:2px solid rgba(235,97,0,1);
              border-radius:50%;
              margin-top: -3px;
            }
            .big_circular {
              width:18px;
              height:18px;
              border:2px solid rgba(235,97,0,1);
              border-radius:50%;
              text-align: center;
              position: absolute;
              right: -30px;
              bottom: -7px;
              .small_circular {
                width:8px;
                height:8px;
                border:2px solid rgba(235,97,0,1);
                border-radius:50%;
                margin: 0 auto;
                margin-top: 3px;
              }
            }
          }
        }
        .left_robot_div1 {
          margin-left: 10px;
          margin-top: 24px;
        }
        .left_robot_div2 {
          margin-top: 26px;
          margin-left: -65px;
          .line {
            img {
              position: absolute;
              right: -66px;
              bottom: -35px;
            }
            .line3 {
              position: absolute;
              right: -39px;
              bottom: -18px;
              width: 155px;
            }
          }
        }
        .left_robot_div3 {
          margin-top: 68px;
          margin-left: 39px;
          .line {
            margin-top: -42px;
            .line1 {
              width: 40px;
              height: 40px;
              position: absolute;
              bottom: -19px;
              left: 29%;
            }
            .line2 {
              position: absolute;
              left: -28px;
              bottom: -31px;
            }
            .line3 {
              width: 117px;
              position: absolute;
              right: -14px;
              bottom: 1px;
              height: 28px;
              border-bottom: 2px solid #eb6100;
              h3 {
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:bold;
                color:rgba(51,51,51,1);
                padding-bottom: 6px;
              }
            }
          }
        }
        .left_robot_div4 {
          margin-top: 61px;
          margin-left: 9px;
          position: relative;
          .top_content1 {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .top_content1_div2 {
              border-right: 2px solid #eb6100;
              position: absolute;
              top: -16px;
              right: -16px;
              background-color: #fff;
              width: 30px;
              height: 30px;
              -webkit-transform: rotate(135deg);
              transform: rotate(135deg);
            }
            .top_content1_div3 {
              border-left: 2px solid #eb6100;
              position: absolute;
              bottom: -16px;
              left: -16px;
              background-color: #fff;
              width: 30px;
              height: 30px;
              -webkit-transform: rotate(135deg);
              transform: rotate(135deg);
            }
          }
          .line {
            margin-top: -67px;
            .top_content1_line1 {
              border-top: 2px solid #eb6100;
              position: absolute;
              bottom: -58px;
              left: 33%;
              z-index: 9;
              width: 22px;
              height: 22px;
              transform: rotate(45deg);
            }
            .line3 {
              width: 140px;
              position: absolute;
              right: -24px;
              bottom: -48px;
              z-index: 9;
              height: 28px;
              border-bottom: 2px solid #eb6100;
              h3 {
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:bold;
                color:rgba(51,51,51,1);
                padding-bottom: 6px;
              }
            }
            .big_circular {
              position: absolute;
              right: -41px;
              bottom: -56px;
            }
          }
        }
      }
      .right_robot {
        width: 310px;
        position: absolute;
        top: 10px;
        &.bank {
          right: 20%; // bank
        }
        .right_robot_div {
          position: relative;
          width: 310px;
          height:99px;
          .top_content {
            width:211px;
            height:99px;
            background:rgba(255,255,255,1);
            border:2px solid rgba(235,97,0,1);
            position: relative;
            margin-left: 118px;
            .div2{
              width: 25px;
              height: 25px;
              border-right: 2px solid #eb6100;
              -webkit-transform: rotate(135deg);
              transform: rotate(135deg);
              position: absolute;
              top: -13px;
              right: -13px;
              background-color: #fff;
            }
            .div3{
              width: 25px;
              height: 25px;
              border-top: 2px solid rgba(235,97,0,1);
              transform: rotate(45deg);
              position: absolute;
              bottom: -13px;
              left: -13px;
              background-color: #fff;
            }
            ul {
              padding: 12px 10px 10px;
              li {
                display: flex;
                flex-direction: row;
                line-height: 24px;
                span {
                  font-size:14px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                  width:72px;
                  display: inline-block;
                  text-align: left;
                }
                p {
                  flex: 1;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-size:14px;
                  font-family:MicrosoftYaHei;
                  font-weight:bold;
                  color:rgba(102,102,102,1);
                  text-align: right;
                  padding-left: 10px;
                  max-width: 120px;
                }
                .not_friend {
                  color: #999;
                }
              }
            }
          }
          .line {
            width:210px;
            height:25px;
            position: relative;
            margin-bottom: 100px;
            margin-top: -47px;
            img {
              position: absolute;
              left: -27px;
              bottom: -62px;
            }
            .line1 {
              width: 123px;
              position: absolute;
              left: 1px;
              bottom: -43px;
              height: 28px;
              border-bottom: 2px solid #eb6100;
              h3 {
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:bold;
                color:rgba(51,51,51,1);
                padding-bottom: 6px;
              }
            }
            .line3 {
              width: 22px;
              height: 22px;
              border-right: 2px solid #eb6100;
              -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
              position: absolute;
              bottom: -39px;
              left: 53%;
            }
            .line2 {
              position: absolute;
              right: -35px;
              bottom: -32px;
              .heng {
                float: left;
                width: 101px;
                height: 2px;
                background: rgba(235,97,0,1);
              }
              .radio {
                float: right;
                width:8px;
                height:8px;
                border:2px solid rgba(235,97,0,1);
                border-radius:50%;
                margin-top: -3px;
              }
            }
          }
        }
        .right_robot_div1 {
          margin-top: 74px;
          .top_content {
            margin-left: 140px;
            height: 77px;
          }
          .line {
            img {
              position: absolute;
              left: -7px;
              bottom: -29px;
            }
            .line1 {
              position: absolute;
              left: 20px;
              bottom: -10px;
              width: 111px;
            }
            .line2 {
              position: absolute;
              right: -25%;
              bottom: -36px;
            }
            .robot_div1_line3 {
              border-bottom: 2px solid #eb6100;
              position: absolute;
              bottom: -26px;
              left: 65%;
              width: 35px;
              height: 35px;
              -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          }
        }
        .right_robot_div2 {
          margin-top: 42px;
          .top_content {
            margin-left: 72px;
          }
          .line {
            .big_circular {
              width:18px;
              height:18px;
              border:2px solid rgba(235,97,0,1);
              border-radius:50%;
              text-align: center;
              position: absolute;
              left: -64px;
              bottom: -12px;
              .small_circular {
                width:8px;
                height:8px;
                border:2px solid rgba(235,97,0,1);
                border-radius:50%;
                margin: 0 auto;
                margin-top: 3px;
              }
            }
            img {
              position: absolute;
              left: -7px;
              bottom: -29px;
            }
            .line1 {
              position: absolute;
              left: -46px;
              bottom: -4px;
              width: 106px;
            }
            .line2 {
              position: absolute;
              right: 7%;
              bottom: -34px;
            }
            .robot_div1_line3 {
              border-bottom: 2px solid #eb6100;
              position: absolute;
              bottom: -23px;
              left: 32%;
              width: 40px;
              height: 40px;
              -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          }
        }
        .right_robot_div3 {
          margin-top: 66px;
          margin-left: 18px;
          position: relative;
          .top_content1 {
            position: absolute;
            top: 64px;
            left: -22px;
            .top_content1_div2 {
              border-top: 2px solid #eb6100;
              position: absolute;
              top: -16px;
              left: -16px;
              background-color: #fff;
              width: 30px;
              height: 30px;
              -webkit-transform: rotate(135deg);
              transform: rotate(135deg);
            }
            .top_content1_div3 {
              border-bottom: 2px solid #eb6100;
              position: absolute;
              bottom: -16px;
              right: -16px;
              background-color: #fff;
              width: 30px;
              height: 30px;
              -webkit-transform: rotate(135deg);
              transform: rotate(135deg);
            }
          }
          .line {
            margin-top: -67px;
            .big_circular {
              width:18px;
              height:18px;
              border:2px solid rgba(235,97,0,1);
              border-radius:50%;
              text-align: center;
              position: absolute;
              left: -64px;
              bottom: -12px;
              .small_circular {
                width:8px;
                height:8px;
                border:2px solid rgba(235,97,0,1);
                border-radius:50%;
                margin: 0 auto;
                margin-top: 3px;
              }
            }
            .top_content1_line1 {
              border-left: 2px solid #eb6100;
              position: absolute;
              bottom: -57px;
              left: 48%;
              z-index: 9;
              width: 22px;
              height: 22px;
              -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
            }
            .line1 {
              position: absolute;
              left: -48px;
              bottom: -47px;
              z-index: 9;
              width: 145px;
            }
            .line2 {
              position: absolute;
              right: -10px;
              bottom: -35px;
            }
            .line3 {
              width: 140px;
              position: absolute;
              right: -24px;
              bottom: -48px;
              z-index: 9;
              height: 28px;
              border-bottom: 2px solid #eb6100;
              h3 {
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:bold;
                color:rgba(51,51,51,1);
                padding-bottom: 6px;
              }
            }
            .big_circular {
              position: absolute;
              right: -41px;
              bottom: -56px;
            }
          }
        }
      }
      .not_friend {
        color: #999;
      }
    }
  }
}
.ring {
  width: 100%;
  height: auto;
  position: relative;
  &.bank {
    top: 900px;
  }
}
</style>
