<template>
  <div id="robot" style="page-break-after:always;">
    <div class="loan_status">
      <div class="c_robot">
        <img class="c_bg_img" src="static/img/robot.png" alt="">
        <p class="c_robot_name">智能助贷机器人</p>
        <div class="c_top_box">
          <div class="c_move_img">
            <img class="c_header01" @mouseenter="isShowLine(1)" @mouseleave="notLine()" :class="hoverData.showFinaceLine ? 'active' : ''" src="static/img/robot/header01.png" alt="">
            <img class="c_header02" @mouseenter="isShowLine(2)" @mouseleave="notLine()" :class="hoverData.showCriditLine ? 'active' : ''" src="static/img/robot/header02.png" alt="">
            <img class="c_header03" @mouseenter="isShowLine(3)" @mouseleave="notLine()" :class="hoverData.showPledgeLine ? 'active' : ''" src="static/img/robot/header03.png" alt="">
            <img class="c_header04" @mouseenter="isShowLine(4)" @mouseleave="notLine()" :class="hoverData.showArapLine ? 'active' : ''" src="static/img/robot/header04.png" alt="">
            <img class="c_dian" src="static/img/robot/dian.png" alt="">
          </div>
          <div class="c_left">
            <!-- 融资需求卡片 -->
            <div class="c_position_box">
              <div class="c_out_title let_posive" style="border:1px dashed #dc6829">
                <div class="c_gray_title c_all_box orange bgorange" @mouseenter="isShowLine(1)" @mouseleave="notLine()" style="padding: 5px 8px">
                  <p style="font-weight:bold;font-size:16px">融资需求</p>
                  <p :title="handleUnit(clover.demand_sum)"><span>需求总额：</span><span>{{handleUnit(clover.demand_sum)}}</span></p>
                  <p><span>笔数：</span><span>{{clover.demand_count}}</span></p>
                  <p><span>成功率：</span><span>{{(clover.success_rate * 100).toFixed(2) + '%'}}</span></p>
                </div>
              </div>
              <!-- <span class="c_line_title">融资需求</span> -->
              <span class="c_finace_line" :class="hoverData.showFinaceLine ? 'active' : ''"><i></i></span>
            </div>
            <!-- 质押融资记录卡片 -->
            <div class="c_position_box">
              <div class="c_out_title let_posive" style="border:1px dashed #dc6829">
                <div class="c_gray_title c_all_box orange bgorange" @mouseenter="isShowLine(3)" @mouseleave="notLine()"  style="padding: 5px 8px">
                  <p style="font-weight:bold;font-size:16px">质押融资记录</p>
                  <p :title="handleUnit(clover.pledge_sum)"><span>质押总额：</span><span>{{handleUnit(clover.pledge_sum)}}</span></p>
                  <p><span>笔数：</span><span>{{clover.demand_count}}</span></p>
                  <p><span>银券率：</span><span>{{(clover.bank_ticket_rate * 100).toFixed(2) + '%' || 0}}</span></p>
                </div>
              </div>
              <span class="c_pledge_line" :class="hoverData.showPledgeLine ? 'active' : ''"><i></i></span>
            </div>
          </div>
          <div class="c_right">
            <!-- 信用记录与评估卡片 -->
            <div class="c_position_box">
              <span class="c_cridit_line" :class="hoverData.showCriditLine ? 'active' : ''"><i></i></span>
              <div class="c_out_title rit_posive" style="border:1px dashed #dc6829">
                <div class="c_gray_title c_all_box orange bgorange" @mouseenter="isShowLine(2)" @mouseleave="notLine()"  style="padding: 5px 8px">
                  <p style="font-weight:bold;font-size:16px">信用记录与评估</p>
                  <p><span>贷款笔数：</span><span>{{clover.demand_count}}</span></p>
                  <p><span>贷款逾期率：</span><span>{{(clover.overdue_rate * 100).toFixed(2) + '%'}}</span></p>
                  <p><span>贷款坏账率：</span><span>{{(clover.bad_rate * 100).toFixed(2) + '%'}}</span></p>
                </div>
              </div>
            </div>
            <!-- 未收总额/未付总额卡片 -->
            <div class="c_position_box">
              <span class="c_arap_line" :class="hoverData.showArapLine ? 'active' : ''"><i></i></span>
              <div class="c_out_title rit_posive" style="border:1px dashed #dc6829">
                <div class="c_gray_title c_all_box orange bgorange" @mouseenter="isShowLine(4)" @mouseleave="notLine()" style="padding: 5px 8px">
                  <p style="font-weight:bold;font-size:16px">应收总额/应付总额</p>
                  <p class="marginP" style="margin-top:2px" :title="toTenThousand(clover.receivable_sum)+'（万元）'"><span>应收总额(万元)：</span><span>{{toTenThousand(clover.receivable_sum)}}</span></p>
                  <p class="marginP" style="margin-top:12px" :title="toTenThousand(clover.payable_sum)+'（万元）'"><span>应付总额(万元)：</span><span>{{toTenThousand(clover.payable_sum)}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_head_box">
          <div class="c_move_img">
            <img class="c_earl" @mouseenter="isShowLine(5)" @mouseleave="notLine()" :class="hoverData.showArLine ? 'active' : ''" src="static/img/robot/earl.png" alt="">
            <img class="c_earr" @mouseenter="isShowLine(6)" @mouseleave="notLine()" :class="hoverData.showAyLine ? 'active' : ''" src="static/img/robot/earr.png" alt="">
          </div>
          <div class="c_left">
            <!-- 应收卡片 -->
            <div class="c_position_box">
              <div class="c_out_title left_ys" style="border:1px dashed #599952">
                <div style="padding:5px 8px" v-if='isFriend' class="c_gray_title green c_all_box marginTop bggreen" @mouseenter="isShowLine(5)" @mouseleave="notLine()" :class="hoverData.showArLine ? 'bggreen' : ''">
                  <p :title="toTenThousand(clover.receivable_sum)+'（万元）'">应收(万元)：<span>{{toTenThousand(clover.receivable_sum)}}</span></p>
                  <p :title="toTenThousand(clover.received_sum)+'（万元）'">已收(万元)：<span>{{toTenThousand(clover.received_sum)}}</span></p>
                  <!-- <p :title="toTenThousand(clover.un_received_sum)+'万元'">未收(万元)：<span>{{toTenThousand(clover.un_received_sum)}}</span></p> -->
                  <p v-if="clover.s_over_rate">总逾期率：<span v-if="clover.s_over_rate.over_rate">{{(clover.s_over_rate.over_rate * 100).toFixed(2) + '%'}}</span></p>
                </div>
                <div style="padding:5px 8px" v-else class="c_gray_title green c_all_box marginTop" @mouseenter="isShowLine(5)" @mouseleave="notLine()" :class="hoverData.showArLine ? 'bggreen' : ''">
                  <p><span>应收：</span><span>********** </span></p>
                  <p><span>已收：</span><span>**********</span></p>
                  <!-- <p><span>未收：</span><span>**********</span></p> -->
                </div>
              </div>
              <!-- <span class="c_line_title">应收</span> -->
              <span class="c_ar_line" :class="hoverData.showArLine ? 'active' : ''"><i></i></span>
            </div>
          </div>
          <div class="c_right">
            <!-- 应付卡片 -->
            <div class="c_position_box">
              <span class="c_ay_line" :class="hoverData.showAyLine ? 'active' : ''"><i></i></span>
              <!-- <span class="c_line_title">应付</span> -->
              <div class="c_out_title right_bg_pos" style="border:1px dashed #599952">
                <div style="padding: 5px 8px" v-if="isFriend" class="c_gray_title green c_all_box bggreen" @mouseenter="isShowLine(6)" @mouseleave="notLine()" :class="hoverData.showAyLine ? 'bggreen' : ''">
                  <p :title="toTenThousand(clover.payable_sum)+'（万元）'">应付(万元)：
                    <span>{{toTenThousand(clover.payable_sum)}}</span>
                  </p>
                  <p :title="toTenThousand(clover.paid_sum)+'（万元）'">已付(万元)：<span>{{toTenThousand(clover.paid_sum)}}</span></p>
                  <!-- <p :title="toTenThousand(clover.un_paid_sum)+'万元'">未付(万元)：<span>{{toTenThousand(clover.un_paid_sum)}}</span></p> -->
                  <p v-if="clover.r_over_rate">总逾期率：<span v-if="clover.r_over_rate.over_rate">{{(clover.r_over_rate.over_rate * 100).toFixed(2) + '%'}}</span></p>
                </div>
                <div style="padding: 5px 8px" v-else class="c_gray_title green c_all_box" @mouseenter="isShowLine(6)" @mouseleave="notLine()" :class="hoverData.showAyLine ? 'bggreen' : ''">
                  <p>应付(红条,黄条,白条):
                    <!-- <img src="static/img/tickets/jq_01.png" alt="">
                    <img src="static/img/tickets/yq_01.png" alt="">
                    <img src="static/img/tickets/tq_01.png" alt=""> -->
                    <span>*******</span>
                  </p>
                  <p>已付：<span>**********</span></p>
                  <!-- <p>未付：<span>**********</span></p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_body_box1">
          <div class="c_move_img">
            <img class="c_hand02" @mouseenter="isShowLine(7)" @mouseleave="notLine()" :class="hoverData.showDepositLine ? 'active ' : ''" src="static/img/robot/hand02.png" alt="">
          </div>
          <div class="c_right">
            <!-- 存单卡片 -->
            <div class="c_position_box">
              <span class="c_deposit_line" :class="hoverData.showDepositLine ? 'active' : ''"><i></i></span>
              <!-- <span class="c_line_title">资产总值</span> -->
              <div class="c_out_title bg_posive right_bg_pos" style="border:1px dashed #f5b948;margin-top:45px;">
                <div class="c_gray_title yellow bgyellow" @mouseenter="isShowLine(7)" @mouseleave="notLine()" :class="hoverData.showDepositLine ? 'bgyellow' : ''" :title="toTenThousand(clover.receipt_amount)">
                  <p class="paddingP">存单余值(万元)：</p>
                  <p  class="paddingP" v-if="isFriend">{{toTenThousand(clover.receipt_sum)}}</p>
                  <p v-else class="not_friend gz paddingP">*******</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_body_box2">
          <div class="c_move_img">
            <img class="c_hand01" @mouseenter="isShowLine(8)" @mouseleave="notLine()" :class="hoverData.showStockLine ? 'active' : ''" src="static/img/robot/hand01.png" alt="">
            <img class="c_ninstar" @mouseenter="isShowLine(9)" @mouseleave="notLine()" :class="hoverData.showAssetLine ? 'active' : ''" src="static/img/robot/ninstar.png" alt="">
          </div>
          <div class="c_left">
            <!-- 存货卡片 -->
            <div class="c_position_box">
              <div class="c_out_title bg_posive left_ys" style="border:1px dashed #f5b948">
                <div class="c_gray_title yellow bgyellow" @mouseenter="isShowLine(8)" @mouseleave="notLine()" :class="hoverData.showStockLine ? 'bgyellow' : ''" :title="toTenThousand(clover.stock_amount)">
                  <p class="paddingP">存货余值(万元)：</p>
                  <p class="paddingP" v-if="isFriend">{{toTenThousand(clover.stock_sum)}}</p>
                  <p  v-else class="not_friend paddingP">********</p>
                </div>
              </div>
              <!-- <span class="c_line_title">存货余值</span> -->
              <span class="c_stock_line" :class="hoverData.showStockLine ? 'active' : ''"><i></i></span>
            </div>
          </div>
          <div class="c_right">
            <!-- 资产总值卡片 -->
            <div class="c_position_box">
              <span class="c_asset_line" :class="hoverData.showAssetLine ? 'active' : ''"><i></i></span>
              <!-- <span class="c_line_title">存单余值</span> -->
              <div class="c_out_title bg_posive right_bg_pos" style="border:1px dashed #93d9ff;margin-top:40px;" :title="toTenThousand(clover.credit_amount)">
                <div class="c_gray_title blue bgblue" @mouseenter="isShowLine(9)" @mouseleave="notLine()" :class="hoverData.showAssetLine ? 'bgblue' : ''">
                  <p class="paddingP">资产总值(万元)：</p>
                  <p class="paddingP" v-if="isFriend">{{toTenThousand(clover.asset_sum)}}</p>
                  <p v-else class="not_friend gz paddingP">*******</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_foot_box">
          <div class="c_move_img">
            <!-- <img class="c_foot01" @mouseenter="isShowLine(10)" @mouseleave="notLine()" :class="hoverData.showBanckLine ? 'active' : ''" src="static/img/robot/foot.png" alt="">
            <img class="c_foot02" @mouseenter="isShowLine(11)" @mouseleave="notLine()" :class="hoverData.showBusLine ? 'active' : ''" src="static/img/robot/foot.png" alt="">
            <img class="c_foot03" @mouseenter="isShowLine(12)" @mouseleave="notLine()" :class="hoverData.showNumLine ? 'active' : ''" src="static/img/robot/foot.png" alt=""> -->
            <img class="c_foot01" src="static/img/robot/foot.png" alt="">
            <img class="c_foot02" src="static/img/robot/foot.png" alt="">
            <img class="c_foot03" src="static/img/robot/foot.png" alt="">
          </div>
          <div class="c_position_box">
            <!-- <span class="c_line_title">银信</span> -->
            <div class="c_out_title" style="    position: relative;left: -56px;" :style="hoverData.showBanckLine ? 'border:1px dashed #5566bc' : ''">
              <div class="c_gray_title purple" :class="hoverData.showBanckLine ? 'bgpurple' : ''">
                <!-- <p>银信(银券)：</p> -->
                <div class="jq">
                  <img src="static/img/tickets/yinquan.png" alt="">
                  <!-- <span class="icon_svg_yinquan"></span> -->
                </div>
                <div style="margin-left: -15px">
                  <p class="textAlign" v-if="isFriend">{{toTenThousand(clover.bank_ticket)}}（万元）</p>
                  <p v-else class="not_friend textAlign">*********</p>
                </div>
                <!-- <div style="margin-left: -35px">
                  <p class="textAlign" v-if="isFriend">0.00(万元)</p>
                  <p v-else class="not_friend textAlign">*********</p>
                </div> -->
              </div>
            </div>
            <span class="c_banck_cridit_line" :class="hoverData.showBanckLine ? 'active' : ''"><i></i></span>
          </div>
          <div class="c_position_box">
            <span class="c_bus_cridit_line" :class="hoverData.showBusLine ? 'active' : ''"><i></i></span>
            <!-- <span class="c_line_title">商信</span> -->
            <div class="c_out_title" style="position:relative;left:-105px;top:2px" :style="hoverData.showBusLine ? 'border:1px dashed #5566bc' : ''">
              <div class="c_gray_title purple"  :class="hoverData.showBusLine ? 'bgpurple' : ''" :title="toTenThousand(clover.business_ticket)">
                <div class="jq">
                  <img src="static/img/tickets/shangquan.png" alt="">
                  <!-- <span class="icon_svg_shangquan"></span> -->
                </div>
                <!-- <p v-if="isFriend">{{toTenThousand(showData.business_credit_balance)}}</p>
                <p v-else class="not_friend">*********</p> -->
                <div style="margin-left: -10px">
                  <p class="textAlign" v-if="isFriend">{{toTenThousand(clover.business_ticket)}}（万元）</p>
                  <p v-else class="not_friend textAlign">*********</p>
                </div>
                <!-- <div v-else style="margin-left: -35px">
                  <p class="textAlign" v-if="isFriend">0.00(万元)</p>
                  <p v-else class="not_friend textAlign">*********</p>
                </div> -->
              </div>
            </div>
          </div>
          <div class="c_position_box">
            <span class="c_num_cridit_line" :class="hoverData.showNumLine ? 'active' : ''"><i></i></span>
            <!-- <span class="c_line_title">数信</span> -->
            <div class="c_out_title" style="position: relative;left: -117px;" :style="hoverData.showNumLine ? 'border:1px dashed #5566bc' : ''">
              <div class="c_gray_title purple" :class="hoverData.showNumLine ? 'bgpurple' : ''" :title="toTenThousand(clover.digital_ticket)">
                <div class="jq">
                  <img src="static/img/tickets/shuquan.png" alt="">
                  <!-- <span class="icon_svg_shuquan"></span> -->
                </div>
                <!-- <p v-if="isFriend">{{toTenThousand(showData.digital_credit_balance)}}</p>
                <p v-else class="not_friend">*********</p> -->
                <div style="margin-left: -15px">
                  <p class="textAlign" v-if="isFriend">{{toTenThousand(clover.digital_ticket)}}（万元）</p>
                  <p v-else class="not_friend textAlign">*********</p>
                </div>
                <!-- <div v-else style="margin-left: -35px">
                  <p class="textAlign" v-if="isFriend">0.00(万元)</p>
                  <p v-else class="not_friend textAlign">*********</p>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'robot',
  data () {
    return {
      company_id: '',
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
      isFriend: true,
      ticbar: {
        red_bar: {},
        yellow_bar: {},
        white_bar: {},
        bank_ticket: {},
        business_ticket: {},
        digital_ticket: {}
      },
      clover: {},
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
    // 整理显示数值
    handleUnit (num) {
      const that = this
      if (num > 10000) {
        return that.toThousands(num / 10000) + '(万元)'
      } else {
        return that.toThousands(num) + '(元)'
      }
    },
    toTenThousand (data) {
      var num = Number(data)
      num = num * Math.pow(10, -4)
      return this.toThousands(num)
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
  }
}
</script>

<style lang="less" scoped>
@media print
{
  .loan_status{
    transform: scale(0.8,0.8);
    margin-left: -180px!important;
    .c_robot{
      top: -120px;
    }
  }
}
@media screen and (max-width:1340px)
{
  .loan_status{
    transform: scale(0.8,0.8);
    margin-left: -200px!important;
    .c_robot{
      top: -120px;
    }
  }
}
@media screen and (min-width:1340px) and (max-width:1400px)
{
  .loan_status{
    transform: scale(0.8,0.8);
    margin-left: -100px!important;
    .c_robot{
      top: -100px;
    }
  }
}
@media screen and (min-width: 1400px) and (max-width: 1600px){
  .loan_status{
    transform: scale(0.8,0.8);
    .c_robot{
      top: -80px;
    }
  }
}
#robot {
  h3 {
    margin-top: 15px;
    height: 30px;
    font-weight: 700;
    font-style: normal;
    line-height: 30px;
    font-size: 18px;
    color: #999;
    padding-left: 17px;
  }
  .order_left {
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    p {
      display: block;
      font-size: 16px;
      color: #666;
      padding-left: 20px;
      padding-bottom: 10px;
    }
  }
  .c_robot {
    position: relative;
    width: 1160px;
    height: 800px;
    margin: 0 auto;
    margin-top: 100px;
    // background: url('static/img/baseversion.png') no-repeat center 32%;
    .blue{
      color: #93d9ff;
    }
    .orange{
      color: #dc6829;
    }
    .yellow{
      color: #f5b948;
    }
    .purple{
      color: #5566bc;
    }
    .green{
      color: #599952;
    }
    .bgblue{
      background: rgba(147, 217, 255, .2);
    }
    .bgorange{
      background: rgba(220, 104, 41, .2);
    }
    .bgyellow{
      background: rgba(245, 185, 72, .2);
    }
    .bgpurple{
      background: rgba(85, 102, 188, .2);
    }
    .bggreen{
      background: rgba(89, 153, 82, .2);
    }
    .c_bg_img{
      display: inline-block;
      width: 365px;
      height: 590px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -182px;
      margin-top: -378px;
    }
    .c_robot_name{
      position: absolute;
      color: #999999;
      font-size: 20px;
      background: #fff;
      font-weight: bold;
      top: 50%;
      left: 50%;
      width: 170px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-top: -96px;
      margin-left: -83px;
      display: inline-block;
    }
    .c_line_title{
      position: absolute;
      font-size: 14px;
    }
    .c_top_box{
      position: relative;
      height: 120px;
      .c_out_title{
        margin-top: -50px;
        cursor: pointer;
        text-decoration: underline;
      }
      .c_left{
        .c_position_box{
          top: -75px;
          &:nth-of-type(2){
            top: -12px;
            .c_out_title{
              top: 30px;
            }
          }
        }
      }
      .c_right{
        .c_position_box{
          top: -75px;
          &:nth-of-type(2){
            top: -12px;
            .c_out_title{
              top: 30px;
            }
          }
        }
      }
    }
    .c_head_box{
      position: relative;
      height: 110px;
      .c_out_title{
        margin-top: 30px;
        .c_gray_title {
          width: 290px;
        }
      }
    }
    .c_body_box1{
      position: relative;
      height: 110px;
      // margin-top: 8px;
      .c_out_title{
        margin-top: 30px;
      }
    }
    .c_body_box2{
      position: relative;
      height: 180px;
      .c_right{
        .c_position_box{
           .c_out_title{
            margin-top: 30px;
           }
        }
      }
    }
    .c_foot_box{
      position: relative;
      // height: 430px;
      .c_position_box{
        top: 100px;
        left: 220px;
        display: inline-block;
      }
      &>div{
        margin-right: 80px;
      }
    }
    .c_left{
      // padding: 0px 50px;
      width: 600px;
      position: absolute;
      top: 50px;
      left: 0;
      .c_gray_title{
        p{
          text-align: right;
        }
      }
    }
    .c_right{
      // padding: 0px 50px;
      text-align: right;
      width: 600px;
      position: absolute;
      top: 50px;
      right: 0;
      .c_gray_title{
        p{
          text-align: left;
        }
      }
    }
    // 连线的定位
    .c_position_box{
      position: relative;
      z-index: 1;
      i{
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
      }
      .c_out_title{
        display: inline-block;
        border: 1px dashed transparent;
        padding: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 15px;
      }
      .let_posive {
        margin-left: 133px;
      }
      .rit_posive {
        margin-right: 113px;
      }
      .bg_posive {
        height: 84px;
        .c_gray_title {
          height: 71px;
        }
        p {
          padding: 3px 5px;
        }
      }
      .right_bg_pos {
        margin-right: 67px;
      }
      .left_ys {
        margin-left: 100px;
      }
      .c_gray_title{
        display: inline-block;
        width: 250px;
        // max-width:220px;
        height: 90px;
        line-height: 90px;
        font-size: 18px;
        text-align: center;
        font-weight: bold;
        border-radius: 5px;
        p{
          font-weight: bold;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // margin: 2px 0;
        }
        &.c_all_box{
          font-size: 14px;
          p{
            text-align: left;
            cursor: pointer;
          }
          span{
            vertical-align: middle;
          }
        }
      }
      .c_finace_line{
        width: 167px;
        height: 80px;
        display: inline-block;
        position: absolute;
        border-top: 1px solid #dc6829;
        border-right: 1px solid #dc6829;
        border-radius: 0 8px;
        top: 5px;
        right: 35px;
        &.active{
          border-top: 1px dashed #dc6829;
          border-right: 1px dashed #dc6829;
        }
        i{
          top: -3px;
          background: #dc6829;
        }
      }
      .c_pledge_line{
        width: 174px;
        height: 0px;
        display: inline-block;
        border-bottom: 1px solid #dc6829;
        position: absolute;
        top: 2px;
        right: 33px;
        border-radius: 8px 0;
        &.active{
          border-bottom: 1px dashed #dc6829;
        }
        i{
          background: #dc6829;
          bottom: -3px;
        }
      }
      .c_cridit_line{
        width: 170px;
        height: 78px;
        display: inline-block;
        border-left: 1px solid #dc6829;
        border-top: 1px solid #dc6829;
        position: absolute;
        top: 8px;
        left: 50px;
        border-radius: 8px 0;
        &.active{
          border-left: 1px dashed #dc6829;
          border-top: 1px dashed #dc6829;
        }
        i{
          top: -3px;
          background: #dc6829;
        }
      }
      .c_arap_line{
        width: 192px;
        height: 0px;
        display: inline-block;
        border-bottom: 1px solid #dc6829;
        position: absolute;
        top: 3px;
        left: 29px;
        border-radius: 0 8px;
        &.active{
          // border-left: 1px dashed #dc6829;
          border-bottom: 1px dashed #dc6829;
        }
        i{
          background: #dc6829;
          bottom: -3px;
        }
      }
      .c_ar_line{
        width: 235px;
        height: 30px;
        position: absolute;
        top: 0px;
        right: 100px;
        display: inline-block;
        border-top: 1px solid #599952;
        border-left: 1px solid #599952;
        border-radius: 8px 0;
        &.active{
          border-top: 1px dashed #599952;
          border-left: 1px dashed #599952;
        }
        i{
          background: #599952;
          top: 27px;
          left: -3px;
        }
      }
      .c_ay_line{
        width: 278px;
        height: 30px;
        position: absolute;
        top: 0px;
        left: 101px;
        display: inline-block;
        border-top: 1px solid #599952;
        border-right: 1px solid #599952;
        border-radius: 0 8px;
        &.active{
          border-top: 1px dashed #599952;
          border-right: 1px dashed #599952;
        }
        i{
          background: #599952;
          top: 27px;
          right: -3px;
        }
      }
      .c_stock_line{
        width: 80px;
        height: 65px;
        position: absolute;
        top: 35px;
        right: 160px;
        display: inline-block;
        border-top: 1px solid #f5b948;
        &.active{
          border-top: 1px dashed #f5b948;
        }
        i{
          background: #f5b948;
          top: -3px;
        }
      }
      .c_asset_line{
        display: inline-block;
        width: 245px;
        height: 60px;
        border-bottom: 1px solid #93d9ff;
        border-left: 1px solid #93d9ff;
        position: absolute;
        top: 28px;
        left: 21px;
        border-radius: 0 8px;
        &.active{
          border-bottom: 1px dashed #93d9ff;
          border-left: 1px dashed #93d9ff;
        }
        i{
          background: #93d9ff;
          bottom: -3px;
        }
      }
      .c_deposit_line{
        display: inline-block;
        width: 89px;
        height: 140px;
        position: absolute;
        top: -50px;
        left: 177px;
        border-radius: 0 8px;
        border-left: 1px solid #f5b948;
        border-bottom: 1px solid #f5b948;
        &.active{
          border-left: 1px dashed #f5b948;
          border-bottom: 1px dashed #f5b948;
        }
        i{
          background: #f5b948;
          bottom: -3px;
        }
      }
      .c_banck_cridit_line{
        display: inline-block;
        width: 215px;
        height: 50px;
        border-top: 1px solid #5566bc;
        border-left: 1px solid #5566bc;
        position: absolute;
        top: -50px;
        left: 68px;
        border-radius: 8px 0;
        &.active{
          border-top: 1px dashed #5566bc;
          border-left: 1px dashed #5566bc;
        }
        i{
          background: #5566bc;
          bottom: -3px;
          left: -3px;
        }
      }
      .c_bus_cridit_line{
        display: inline-block;
        height: 50px;
        border-left: 1px solid #5566bc;
        position: absolute;
        top: -40px;
        left: 18px;
        &.active{
          border-left: 1px dashed #5566bc;
        }
        i{
          background: #5566bc;
          bottom: -3px;
          left: -3px;
        }
      }
      .c_num_cridit_line{
        display: inline-block;
        width: 215px;
        height: 50px;
        border-top: 1px solid #5566bc;
        border-right: 1px solid #5566bc;
        position: absolute;
        top: -50px;
        right: 256px;
        border-radius: 0 8px;
        &.active{
          border-top: 1px dashed #5566bc;
          border-right: 1px dashed #5566bc;
        }
        i{
          background: #5566bc;
          bottom: -3px;
          right: -3px;
        }
      }
    }
    .c_move_img{
      position: relative;
      img{
        cursor: pointer;
        position: absolute;
        left: 50%;
        z-index: 2;
        &:hover{
          transform:scale(1.2);
          -ms-transform:scale(1.2);
          -webkit-transform:scale(1.2);
          -o-transform:scale(1.2);
          -moz-transform:scale(1.2);
        }
        &.active{
          transform:scale(1.2);
          -ms-transform:scale(1.2);
          -webkit-transform:scale(1.2);
          -o-transform:scale(1.2);
          -moz-transform:scale(1.2);
        }
      }
      .c_dian{
        top: 85px;
        margin-left: -6px;
      }
      .c_header01{
        top: 22px;
        margin-left: -38px;
      }
      .c_header02{
        top: 46px;
      }
      .c_header03{
        top: 90px;
        margin-left: -64px;
      }
      .c_header04{
        top: 90px;
        margin-left: 2px;
      }
      .c_earl{
        top: 40px;
        margin-left: -108px;
      }
      .c_earr{
        top: 40px;
        margin-left: 66px;
      }
      .c_hand02{
        top: -41px;
        margin-left: 142px;
      }
      .c_hand01{
        top: 69px;
        margin-left: -171px;
      }
      .c_ninstar{
        width: 124px;
        height: 46px;
        top: 44px;
        margin-left: -62px;
      }
      .c_foot01{
        top: 20px;
        margin-left: -54px;
      }
      .c_foot02{
        top: 20px;
        margin-left: 15px;
      }
      .c_foot03{
        top: 20px;
        margin-left: 83px;
      }
    }
  }
}
</style>
