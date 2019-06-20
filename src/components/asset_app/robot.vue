<template>
  <div class="robot">
    <div class="c_ticket1">
      <div class="bottom">
        <div>
          <dl>
            <dt class="ticket-title">
              <span>应付类</span>
            </dt>
            <dt><img class="barIcon" src="static/img/tickets/hongtiao.png" alt=""></dt>
            <dd>
              <p class="one"><span>红条总额：</span><span class="span" :title="toTenThousand(ticbar.red_bar.sum) || 0 + '万元'">{{toTenThousand(ticbar.red_bar.sum) || 0}} 万元</span></p>
              <p class="two"><span>{{ticbar.red_bar.count || 0}}</span> 张</p>
            </dd>
          </dl>
          <dl>
            <dt><img class="barIcon" src="static/img/tickets/huangtiao.png" alt=""></dt>
            <dd>
              <p class="one"><span>黄条总额：</span><span class="span" :title="toTenThousand(ticbar.yellow_bar.sum) || 0 + '万元'">{{toTenThousand(ticbar.yellow_bar.sum) || 0}} 万元</span></p>
              <p class="two"><span>{{ticbar.yellow_bar.count || 0}}</span> 张</p>
            </dd>
          </dl>
          <dl>
            <dt><img class="barIcon" src="static/img/tickets/baitiao.png" alt=""></dt>
            <dd>
              <p class="one"><span>白条总额：</span><span class="span" :title="toTenThousand(ticbar.white_bar.sum) || 0 + '万元'">{{toTenThousand(ticbar.white_bar.sum) || 0}} 万元</span></p>
              <p class="two"><span>{{ticbar.white_bar.count || 0}}</span> 张</p>
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt class="ticket-title">
              <span>应收类</span>
            </dt>
            <dt><img class="barIcon" src="static/img/tickets/yinquan.png" alt=""></dt>
            <dd>
              <p class="one"><span>银券总额：</span><span class="span" :title="toTenThousand(ticbar.bank_ticket.sum) || 0 + '万元'">{{toTenThousand(ticbar.bank_ticket.sum) || 0}} 万元</span></p>
              <p class="two"><span>{{ticbar.bank_ticket.count || 0}}</span> 张</p>
            </dd>
          </dl>
          <dl>
            <dt><img class="barIcon" src="static/img/tickets/shangquan.png" alt=""></dt>
            <dd>
              <p class="one"><span>商券总额：</span><span class="span" :title="toTenThousand(ticbar.business_ticket.sum) || 0 + '万元'">{{toTenThousand(ticbar.business_ticket.sum) || 0}} 万元</span></p>
              <p class="two"><span>{{ticbar.business_ticket.count || 0}}</span> 张</p>
            </dd>
          </dl>
          <dl>
            <dt><img class="barIcon" src="static/img/tickets/shuquan.png" alt=""></dt>
            <dd>
              <p class="one"><span>数券总额：</span><span class="span" :title="toTenThousand(ticbar.digital_ticket.sum) || 0 + '万元'">{{toTenThousand(ticbar.digital_ticket.sum) || 0}} 万元</span></p>
              <p class="two"><span>{{ticbar.digital_ticket.count || 0}}</span> 张</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="ul_list_robot">
      <span>大数据画像</span>
      <ul>
        <li v-for="(item, index) in timeList" :class='selTime === index ? "issel" : ""' :key='index' @click="handleTimeRobot($event, item, index)">{{item.title}}</li>
      </ul>
    </div>
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
            <div class="c_out_title" style="border:1px dashed #dc6829">
              <div class="c_gray_title c_all_box orange bgorange" @mouseenter="isShowLine(1)" @mouseleave="notLine()" style="padding: 5px 8px">
                <p style="font-weight:bold;font-size:16px">融资需求</p>
                <p :title="handleUnit(clover.demand_sum)"><span>需求总额：</span><span>{{handleUnit(clover.demand_sum)}}</span></p>
                <p><span>笔数：</span><span>{{clover.demand_count}}</span></p>
                <p><span>成功率：</span><span>{{(clover.success_rate * 100).toFixed(2)  + '%'}}</span></p>
              </div>
            </div>
            <!-- <span class="c_line_title">融资需求</span> -->
            <span class="c_finace_line" :class="hoverData.showFinaceLine ? 'active' : ''"><i></i></span>
          </div>
          <!-- 质押融资记录卡片 -->
          <div class="c_position_box">
            <div class="c_out_title" style="border:1px dashed #dc6829">
              <div class="c_gray_title c_all_box orange bgorange" @mouseenter="isShowLine(3)" @mouseleave="notLine()"  style="padding: 5px 8px">
                <p style="font-weight:bold;font-size:16px">质押融资记录</p>
                <p :title="handleUnit(clover.pledge_sum)"><span>质押总额：</span><span>{{handleUnit(clover.pledge_sum)}}</span></p>
                <p><span>笔数：</span><span>{{clover.demand_count}}</span></p>
                <p><span>银券率：</span><span>{{(clover.bank_ticket_rate * 100).toFixed(2)  + '%' || 0}}</span></p>
              </div>
            </div>
            <span class="c_pledge_line" :class="hoverData.showPledgeLine ? 'active' : ''"><i></i></span>
          </div>
        </div>
        <div class="c_right">
          <!-- 信用记录与评估卡片 -->
          <div class="c_position_box">
            <span class="c_cridit_line" :class="hoverData.showCriditLine ? 'active' : ''"><i></i></span>
            <div class="c_out_title" style="border:1px dashed #dc6829">
              <div class="c_gray_title c_all_box orange bgorange" @mouseenter="isShowLine(2)" @mouseleave="notLine()"  style="padding: 5px 8px">
                <p style="font-weight:bold;font-size:16px">信用记录与评估</p>
                <p><span>贷款笔数：</span><span>{{clover.demand_count + '笔'}}</span></p>
                <p><span>贷款逾期率：</span><span>{{(clover.overdue_rate * 100).toFixed(2) + '%'}}</span></p>
                <p><span>贷款坏账率：</span><span>{{(clover.bad_rate * 100).toFixed(2) + '%'}}</span></p>
              </div>
            </div>
          </div>
          <!-- 未收总额/未付总额卡片 -->
          <div class="c_position_box">
            <span class="c_arap_line" :class="hoverData.showArapLine ? 'active' : ''"><i></i></span>
            <div class="c_out_title" style="border:1px dashed #dc6829">
              <div class="c_gray_title c_all_box orange bgorange" @mouseenter="isShowLine(4)" @mouseleave="notLine()" style="padding: 5px 8px">
                <p style="font-weight:bold;font-size:16px">应收总额/应付总额</p>
                <p class="marginP" style="margin-top:2px" :title="toTenThousand(clover.receivable_sum)"><span>应收总额：</span><span>{{handleUnit(clover.receivable_sum)}}</span></p>
                <p class="marginP" style="margin-top:12px" :title="toTenThousand(clover.payable_sum)"><span>应付总额：</span><span>{{handleUnit(clover.payable_sum)}}</span></p>
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
            <div class="c_out_title" :style="hoverData.showArLine ? 'border:1px dashed #599952' : ''">
              <div style="padding:5px 8px" v-if='isFriend' class="c_gray_title green c_all_box marginTop" @mouseenter="isShowLine(5)" @mouseleave="notLine()" :class="hoverData.showArLine ? 'bggreen' : ''">
                <p style="line-height: 26px;" :title="handleUnit(clover.receivable_sum)">应收：<span>{{handleUnit(clover.receivable_sum)}}</span></p>
                <p style="line-height: 26px;" :title="handleUnit(clover.received_sum)">已收：<span>{{handleUnit(clover.received_sum)}}</span></p>
                <!-- <p :title="toTenThousand(clover.un_received_sum)+'万元'">未收(万元)：<span>{{toTenThousand(clover.un_received_sum)}}</span></p> -->
                <p style="line-height: 26px;" :title="clover.receivable_rate" v-if="clover.s_over_rate">总逾期率：<span>{{(clover.s_over_rate.over_rate * 100).toFixed(2) + '%'}}</span></p>
              </div>
              <div style="padding:5px 8px" v-else class="c_gray_title green c_all_box marginTop" @mouseenter="isShowLine(5)" @mouseleave="notLine()" :class="hoverData.showArLine ? 'bggreen' : ''">
                <p><span>应收：</span><span>********** </span></p>
                <p><span>已收：</span><span>**********</span></p>
                <p><span>未收：</span><span>**********</span></p>
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
            <div class="c_out_title" :style="hoverData.showAyLine ? 'border:1px dashed #599952' : ''">
              <div style="padding: 5px 8px" v-if="isFriend" class="c_gray_title green c_all_box" @mouseenter="isShowLine(6)" @mouseleave="notLine()" :class="hoverData.showAyLine ? 'bggreen' : ''">
                <p style="line-height: 26px;" :title="handleUnit(clover.payable_sum)">应付：<span>{{handleUnit(clover.payable_sum)}}</span></p>
                <p style="line-height: 26px;" :title="handleUnit(clover.paid_sum)">已付：<span>{{toTenThousand(clover.paid_sum)}}</span></p>
                <!-- <p :title="toTenThousand(clover.un_paid_sum)+'万元'">未付(万元)：<span>{{toTenThousand(clover.un_paid_sum)}}</span></p> -->
                <p style="line-height: 26px;" :title="clover.un_paid_sum" v-if="clover.r_over_rate">总逾期率：<span>{{(clover.r_over_rate.over_rate * 100).toFixed(2) + '%'}}</span></p>
              </div>
              <div style="padding: 5px 8px" v-else class="c_gray_title green c_all_box" @mouseenter="isShowLine(6)" @mouseleave="notLine()" :class="hoverData.showAyLine ? 'bggreen' : ''">
                <p>应付(红条,黄条,白条):
                  <!-- <img src="static/img/tickets/jq_01.png" alt="">
                  <img src="static/img/tickets/yq_01.png" alt="">
                  <img src="static/img/tickets/tq_01.png" alt=""> -->
                  <span>*******</span>
                </p>
                <p>已付：<span>**********</span></p>
                <p>未付：<span>**********</span></p>
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
            <div class="c_out_title" :style="hoverData.showDepositLine ? 'border:1px dashed #f5b948' : ''">
              <div class="c_gray_title yellow" @mouseenter="isShowLine(7)" @mouseleave="notLine()" :class="hoverData.showDepositLine ? 'bgyellow' : ''" :title="toTenThousand(clover.receipt_amount)">
                <p class="paddingP">存单余值：</p>
                <p  class="paddingP" v-if="isFriend">{{toTenThousand(clover.receipt_sum)}}(万元)</p>
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
            <div class="c_out_title" :style="hoverData.showStockLine ? 'border:1px dashed #f5b948' : ''">
              <div class="c_gray_title yellow" @mouseenter="isShowLine(8)" @mouseleave="notLine()" :class="hoverData.showStockLine ? 'bgyellow' : ''" :title="toTenThousand(clover.stock_amount)">
                <p class="paddingP">存货余值：</p>
                <p class="paddingP" v-if="isFriend">{{toTenThousand(clover.stock_sum)}}(万元)</p>
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
            <div class="c_out_title" :style="hoverData.showAssetLine ? 'border:1px dashed #93d9ff' : ''" :title="toTenThousand(clover.credit_amount)">
              <div class="c_gray_title blue" @mouseenter="isShowLine(9)" @mouseleave="notLine()" :class="hoverData.showAssetLine ? 'bgblue' : ''">
                <p class="paddingP">资产总值：</p>
                <p class="paddingP" v-if="isFriend">{{handleUnit(clover.asset_sum)}}</p>
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
          <div class="c_out_title" style="    position: relative;left: -46px;" :style="hoverData.showBanckLine ? 'border:1px dashed #5566bc' : ''">
            <div class="c_gray_title purple" :class="hoverData.showBanckLine ? 'bgpurple' : ''">
              <!-- <p>银信(银券)：</p> -->
              <div class="jq">
                <img src="static/img/tickets/yinquan.png" alt="">
                <!-- <span class="icon_svg_yinquan"></span> -->
              </div>
              <div style="margin-left: -35px">
                <p class="textAlign" v-if="isFriend">{{toTenThousand(clover.bank_ticket)}}万元</p>
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
          <div class="c_out_title" style="position:relative;left:-75px;top:2px" :style="hoverData.showBusLine ? 'border:1px dashed #5566bc' : ''">
            <div class="c_gray_title purple"  :class="hoverData.showBusLine ? 'bgpurple' : ''" :title="toTenThousand(clover.business_ticket)">
              <div class="jq">
                <img src="static/img/tickets/shangquan.png" alt="">
                <!-- <span class="icon_svg_shangquan"></span> -->
              </div>
              <!-- <p v-if="isFriend">{{toTenThousand(showData.business_credit_balance)}}</p>
              <p v-else class="not_friend">*********</p> -->
              <div style="margin-left: -35px">
                <p class="textAlign" v-if="isFriend">{{toTenThousand(clover.business_ticket)}}万元</p>
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
          <div class="c_out_title" style="position: relative;left: -107px;" :style="hoverData.showNumLine ? 'border:1px dashed #5566bc' : ''">
            <div class="c_gray_title purple" :class="hoverData.showNumLine ? 'bgpurple' : ''" :title="toTenThousand(clover.digital_ticket)">
              <div class="jq">
                <img src="static/img/tickets/shuquan.png" alt="">
                <!-- <span class="icon_svg_shuquan"></span> -->
              </div>
              <!-- <p v-if="isFriend">{{toTenThousand(showData.digital_credit_balance)}}</p>
              <p v-else class="not_friend">*********</p> -->
              <div style="margin-left: -35px">
                <p class="textAlign" v-if="isFriend">{{toTenThousand(clover.digital_ticket)}}万元</p>
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
    <!-- <div class="ticketList">
      <div class="titleList">资产池</div>
      <div class="tab_title">
        <div v-for="(item, index) in tabTitle" :key='index' :class="showIndex === index ? 'active_t' : ''" @click="changeTab($event, index)">
          <div>
            <span>{{item}}</span>
          </div>
        </div>
      </div>
      <div v-if="isFriend">
        <div class="show_table" v-if='showList.length !== 0'>
          <div class="table_title">
            <div v-for="(item, index) in tableTitle" :key='index'>{{item}}</div>
          </div>
          <div class="table_line" v-for="(item, index) in showList" :key='index'>
            <div @click="handleChian(item)">{{item.contract_name}}</div>
            <div>{{item.partner_company}}</div>
            <div>
              <div class="valueFormat">{{toTenThousand(item.amount)}}</div>
            </div>
            <div>{{item.settlement_date}}</div>
            <div v-if="showIndex === 0">{{item.payment_type ? paymentType[item.payment_type] : '无支付'}}</div>
          </div>
        </div>
        <div class="is_null" v-if='showList.length === 0'>{{nullInfo}}</div>
      </div>
      <div v-else>
        <div class="is_null">暂无权限查看</div>
      </div>
    </div> -->
    <div class="ring">
      <ring :bid='businessId' />
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
      selTime: 0
    }
  },
  props: ['fType', 'fid', 'bid'],
  mounted () {
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
<style lang='less' scoped>
@import url('./icon.css');
@media screen and (max-width:1340px)
{
  .robot{
    .c_ticket1 {
      position: relative;
      top: -80px;
      .bottom {
        &>div {
          width: 94%;
        }
      }
    }
    .ul_list_robot {
      position: relative;
      top: -80px;
    }
    transform: scale(0.8,0.8);
    margin-left: -100px!important;
    .c_robot{
      top: -120px;
    }
  }
}
@media screen and (min-width:1340px) and (max-width:1400px)
{
  .robot{
    .c_ticket1 {
      position: relative;
      top: -80px;
    }
    transform: scale(0.8,0.8);
    margin-left: -50px!important;
    .c_robot{
      top: -100px;
    }
  }
  .ul_list_robot {
    position: relative;
    top: -80px;
  }
}
@media screen and (min-width: 1400px) and (max-width: 1600px){
  .robot{
    .c_ticket1 {
      position: relative;
      top: -80px;
    }
    transform: scale(0.8,0.8);
    .c_robot{
      top: -80px;
    }
  }
  .ul_list_robot {
    position: relative;
    top: -80px;
  }
}
.c_ticket1 {
  width: 100%;
  .bottom {
    width:100%;
    min-height:57px;
    background: #fff;
    &>div {
      display: flex;
      width: 84%;
      margin: 0 auto;
      dl {
        flex: 1;
        text-align: center;
        border-right:1px solid #e1e6f0;
        height:57px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        dt {
          img {
            margin: 10px 10px 0 60px;
            &.barIcon {
              width: 40px;
              margin-right: 48px;
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
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#362323;
            letter-spacing:0;
            padding-right: 12px;
            border-right:1px dashed #999999;
            span:first-child {
              width: 100px;
            }
            .span {
              font-family:PingFangSC-Semibold;
              color:#333333;
              letter-spacing:0;
              display: inline-block;
              width: 110px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: right;
              vertical-align: bottom;
            }
          }
          .two {
            padding-left: 12px;
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#999999;
            letter-spacing:0;
            display: inline-block;
            width: 60px;
            span {
              font-family:PingFangSC-Semibold;
              color:#333333;
              letter-spacing:0;
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
.ul_list_robot {
  padding-left: 20px;
  border-left: 4px solid #eb6100;
  // width: 100%;
  margin: 20px 10px;
  line-height: 32px;
  color: #333;
  display: flex;
  flex-direction: row;
  height: 34px;
  span {
    flex: 1;
  }
  ul {
    display: flex;
    li {
      width: 95px;
      text-align: center;
      line-height: 32px;
      border: 1px solid #eb6100;
      margin-left: 10px;
      color: #eb6100;
      border-radius: 4px;
      cursor: pointer;
      transition: all .3s ease-in;
    }
    li.issel {
      background: #eb6100;
      color: #fff;
    }
    li:hover {
      background: #eb6100;
      color: #fff;
    }
  }
}
.robot {
  margin: 20px auto 0;
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
  .c_robot {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 800px;
    margin-top: 150px;
    // background: url('static/img/baseversion.png') no-repeat center 32%;
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
          // width: 290px;
          width: 264px;
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
        width: 324px;
        height: 80px;
        display: inline-block;
        position: absolute;
        border-top: 1px solid #dc6829;
        border-right: 1px solid #dc6829;
        border-radius: 0 8px;
        top: 5px;
        right: 15px;
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
        width: 317px;
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
        width: 304px;
        height: 78px;
        display: inline-block;
        border-left: 1px solid #dc6829;
        border-top: 1px solid #dc6829;
        position: absolute;
        top: 8px;
        left: 29px;
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
        width: 305px;
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
        width: 320px;
        height: 30px;
        position: absolute;
        top: 0px;
        left: 180px;
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
        width: 320px;
        height: 30px;
        position: absolute;
        top: 0px;
        right: 180px;
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
        width: 180px;
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
        width: 334px;
        height: 60px;
        border-bottom: 1px solid #93d9ff;
        border-left: 1px solid #93d9ff;
        position: absolute;
        top: 28px;
        left: 0px;
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
        width: 176px;
        height: 140px;
        position: absolute;
        top: -50px;
        left: 157px;
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
        left: 38px;
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
  .ticket {
    // color: #666;
    // justify-content: space-between;
    // margin-top: 20px;
    // &>div {
    //   height: 60px;
    //   display: flex;
    //   margin-top: 24px;
    //   div {
    //     width: 50%;
    //     text-align: center;
    //     line-height: 60px;
    //     span {
    //       padding: 0 20px;
    //       text-align: left;
    //       display: block;
    //       height: 30px;
    //       line-height: 26px;;
    //     }
    //   }
    // }
    height: 360px;
    color: #666;
    background: #fff;
    .ticket_item {
      width: 360px;
      height: 120px;
      margin: 10px 20px;
      float: left;
      .lefe_card {
        width: 110px;
        height: 120px;
        display: flex;
        img {
          margin: auto;
          width: 60px;
        }
      }
      .right_card {
        width: 230px;
        height: 120px;
        position: absolute;
        top: 0;
        right: 0;
        .tips {
          position: absolute;
          right: -5px;
          transform: rotate(48deg);
          top: 24px;
          width: 77px;
          text-align: center;
          font-size: 14px;
          color: #fff;
        }
        .info {
          p {
            margin: 37px 30px 10px 30px;
            font-size: 18px;
            // color: #ea6100;
            font-weight: 700;
          }
          p:last-child {
            margin: 10px 30px;
            max-width: 170px;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            .number {
              font-weight: 700;
            }
          }
        }
      }
    }
    .receive {
      // background: url('../../../static/img/tickets/yingshou_j1.png') center no-repeat;
      background-size: 100%;
      position: relative;
    }
    .pay {
      // background: url('../../../static/img/tickets/syingfu_j1.png') center no-repeat;
      background-size: 100%;
      position: relative;
    }
  }
  .c_ticket {
    width: 85%;
    height: 200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    .c_ticket_item {
      width: 285px;
      height: 50px;
      margin: 10px 20px;
      background: url('../../../static/img/tickets/stuff.png') center no-repeat;
      background-size: 100%;
      img {
        height: 77px;
        position: absolute;
        margin: -15px 0 0 8px;
      }
      .c_ticket_text {
        height: 40px;
        line-height: 40px;
        margin-top: 5px;
        color: #666;
        font-size: 14px;
        display: flex;
        justify-content: flex-end;
        .c_ticket_value {
          margin-right: 10px;
          width: 160px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
        }
        .c_ticket_num {
          color: #ea6100;
          margin-right: 7px;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
          width: 40px;
        }
      }
    }
  }
}
.blue_j {
  color:  #0c8dff
}
.orange_j {
  color: #ea6100;
}
.not_friend {
  color: #999;
  margin-left: -30px
}
.gz {
  margin-left: 0px
}
.jq img{
  height: 46px;
  margin-left: -35px;
}
.jq {
  &>.icon_svg_yinquan {
    background: url('../../../static/img/tickets/yinquan.svg') center no-repeat;
    display: inline-block;
    width: 60px;
    background-size: contain;
    height: 60px;
    margin-right: 23px
  }
  &>.icon_svg_shangquan {
    background: url('../../../static/img/tickets/shangquan.svg') center no-repeat;
    display: inline-block;
    width: 60px;
    background-size: contain;
    height: 60px;
    margin-right: 23px
  }
  &>.icon_svg_shuquan {
    background: url('../../../static/img/tickets/shuquan.svg') center no-repeat;
    display: inline-block;
    width: 60px;
    background-size: contain;
    height: 60px;
    margin-right: 23px
  }
}
.demand_title {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: center;
  font-size: 16px;
  div {
    width: 65px;
    height: 20px;
  }
}
.fontStyle {
  font-size: 18px;
  font-weight: bold;
}
.active_t {
  border-bottom: 2px solid #eb6100;
  color: #eb6100;
  span {
    font-weight: bold;
  }
}
.ticketList {
    width: 1200px;
    margin: 0 auto;
    color: #666;
    margin-bottom: 100px;
    .titleList{
      padding-left: 20px;
      width: 120px;
      line-height: 25px;
      font-size: 18px;
      font-weight: 700;
      height: 25px;
      border-left: 5px solid #ea6100;
      margin-bottom: 20px;
    }
    .tab_title {
      display: flex;
      // justify-content: space-around;
      background: #eaeaea;
      cursor: pointer;
      div {
        width: 135px;
        text-align: center;
        // border-bottom: 1px solid #fff;
        line-height: 36px;
        span {
          padding: 12px 0;
        }
      }
      .active {
        border-bottom: 2px solid #eb6100;
        color: #eb6100;
      }
    }
    .is_null {
      padding: 45px 0;
      line-height: 18px;
      text-align: center;
      border: 1px solid #eaeaea;
      // margin-top: 6px;
    }
    .show_table {
      // border: 1px solid #eaeaea;
      // margin-top: 6px;
      .table_title {
        display: flex;
        line-height: 48px;
        border-bottom: 1px solid #eaeaea;
        div {
          font-weight: 600;
          width: 33%;
          text-align: left;
        }
        &>div:nth-of-type(3) {
          margin-left: 30px;
        }
      }
      .table_line {
        display: flex;
        line-height: 42px;
        border-bottom: 1px solid #eaeaea;
        &>div {
          width: 25%;
          text-align: left;
        }
        &>div:nth-of-type(1) {
          // padding: 0 30px;
          text-align: left;
          color: #eb6100;
          text-decoration: underline;
          cursor: pointer;
        }
        &>div:nth-of-type(2) {
          div {
            margin: 0 auto;
            padding-right: 34px;
            text-align: right;
          }
        }
        &>div:nth-child(3) {
          padding: 0 20px;
          text-align: right;
          margin-right: 30px;
        }
      }
    }
  }
  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // span {}
  }
  .textAlign {
    justify-content: center
  }
  .paddingP {
    padding: 5px 10px;
  }
.ring {
  width: 100%;
  height: auto;
}

</style>
