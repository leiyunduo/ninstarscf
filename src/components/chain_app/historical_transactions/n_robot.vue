<template>
  <div id="n_nobot">
    <div class="n_nobot_content">
      <div class="robot_list">
        <img src="../../../../static/img/n_robot/background.png" alt="" class="robot_background">
        <img src="../../../../static/img/n_robot/robot.png" alt="" class="robot_robot">
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
        <div class="left_robot">
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
              <img src="../../../../static/img/n_robot/circular.png" alt="">
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
              <img src="../../../../static/img/n_robot/circular.png" alt="">
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
        <div class="right_robot">
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
              <img src="../../../../static/img/n_robot/circular.png" alt="">
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
              <img src="../../../../static/img/n_robot/circular.png" alt="">
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
                <li :title="handleUnit(clover.payable.red_bar.sum)">
                  <span>红条总额：</span>
                  <p v-if="isFriend">{{handleUnit(clover.payable.red_bar.sum)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
                <li :title="handleUnit(clover.payable.yellow_bar.sum)">
                  <span>黄条总额：</span>
                  <p v-if="isFriend">{{handleUnit(clover.payable.yellow_bar.sum)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
                <li :title="handleUnit(clover.payable.white_bar.sum)">
                  <span>白条总额：</span>
                  <p v-if="isFriend">{{handleUnit(clover.payable.white_bar.sum)}}</p>
                  <p v-else class="not_friend">*********</p>
                </li>
              </ul>
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
      isFriend: true,
      clover: {},
      company_id: ''
    }
  },
  props: {
    timezone: {
      type: String,
      default: () => []
    }
  },
  watch: {
    'timezone': function (n, o) {
      this.$nextTick (() => {
        this.robotChange(n)
      })
    }
  },
  mounted () {
    const that = this
    that.company_id = localStorage.id
    // 智能助贷机器人
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
  },
  methods: {
    // 整理显示数值
    handleUnit (num) {
      const that = this
      if (num > 10000) {
        return that.toThousands(num / 10000) + '（万元）'
      } else {
        return that.toThousands(num) + '（元）'
      }
    },
    // 智能助贷机器人
    robotChange (data) {
      let that = this
      this.$ajax.get('/api/oth/asset/robot/?company_id=' + that.company_id + data).then(res => {
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
  }
}
</script>

<style lang="less" scoped>
#n_nobot {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  height: 800px;
  margin-top: 170px;
  .n_nobot_content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    height: 800px;
    background-size: cover;
    .robot_list {
      text-align: center;
      position: relative;
      height: 800px;
      margin-left: -62px;
      .robot_background {
        position: absolute;
        bottom: 18%;
        left: 28%;
      }
      .robot_robot {
        position: absolute;
        left: 37%;
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
        left: 17%;
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
        right: 13%;
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
</style>
