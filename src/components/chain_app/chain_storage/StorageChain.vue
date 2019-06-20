<template>
  <div class="view_chain">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="nav_chain_top" :class="selIndex === 0 ? 'max-topHeight' : ''" v-if="element">
      <div class="topLocation">
        <location :location="location"></location>
      </div>
      <ring v-if="selIndex === 0"/>
    </div>
    <div class="line_detail">
      <div class="middleLocation">
        <location :location="location"></location>
      </div>
      <div class="chainNavLine" v-if="selIndex === 0 && !element">
        <ring/>
      </div>
      <ul class="view_nav">
        <li v-show="userType === 'business' || (index === 0 && userTypeArr.indexOf(userType) > -1)" v-for="(item, index) in navList" :key="index" @click="changeTab($event, index)"><span :class="index === selIndex ? 'sel':''">{{item.name}}</span></li>
      </ul>
      <div v-if="selIndex === 0" class="chain_list">
        <div class="bottom">
          <dl>
            <dt class="ticket-title">
              <span>应收</span>
            </dt>
            <dt>
              <img src="static/img/tickets/jq_01.png" alt="">
            </dt>
            <dd>
              <p class="one">银券总额(元)：<span>{{toThousands(ticket.bank_ticket.sum) || 0}}</span></p>
              <p class="two"><span>{{ticket.bank_ticket.count || 0}}</span> 张</p>
            </dd>
          </dl>
          <dl>
            <dt><img src="static/img/tickets/yq_01.png" alt=""></dt>
            <dd>
              <p class="one">商券总额(元)：<span>{{toThousands(ticket.business_ticket.sum) || 0}}</span></p>
              <p class="two"><span>{{ticket.business_ticket.count || 0}}</span> 张</p>
            </dd>
          </dl>
          <dl>
            <dt><img src="static/img/tickets/tq_01.png" alt=""></dt>
            <dd>
              <p class="one">数券总额(元)：<span>{{toThousands(ticket.digital_ticket.sum) || 0}}</span></p>
              <p class="two"><span>{{ticket.digital_ticket.count || 0}}</span> 张</p>
            </dd>
          </dl>
        </div>
        <div class="bottom">
          <dl>
            <dt class="ticket-title">
              <span>应付</span>
            </dt>
            <dt><img class="barIcon" src="static/img/tickets/redBar.png" alt=""></dt>
            <dd>
              <p class="one">红条总额(元)：<span>{{toThousands(bar.red_bar.sum) || 0}}</span></p>
              <p class="two"><span>{{bar.red_bar.count || 0}}</span> 张</p>
            </dd>
          </dl>
          <dl>
            <dt><img class="barIcon" src="static/img/tickets/yellowBar.png" alt=""></dt>
            <dd>
              <p class="one">黄条总额(元)：<span>{{toThousands(bar.yellow_bar.sum) || 0}}</span></p>
              <p class="two"><span>{{bar.yellow_bar.count || 0}}</span> 张</p>
            </dd>
          </dl>
          <dl>
            <dt><img class="barIcon" src="static/img/tickets/whiteBar.png" alt=""></dt>
            <dd>
              <p class="one">白条总额(元)：<span>{{toThousands(bar.white_bar.sum) || 0}}</span></p>
              <p class="two"><span>{{bar.white_bar.count || 0}}</span> 张</p>
            </dd>
          </dl>
        </div>
        <div class="chain-box">
          <div class="chain-box__item">
            <div class="chain-box__item__title">
              <span class="chain-box_show">销售登记</span>
              <img src="static/img/chain/chaindown1.png" alt="">
            </div>
            <div class="chain-box__item__content">
              <div class="chain-container border_hide">
                <div class="first_view border_show">
                  <div class="first_chain">
                    <div class="chain_title">
                      <div class="symbol_large_orange"><div></div></div>
                      <span>销售合同与计划</span>
                      <div class="tooltips-group">
                        <div class="tooltips-group__item">
                          <img src="static/img/chain/null_unrecord.png" alt="">      
                          <span class="tips-content">未及时记账</span>
                        </div>
                        <div class="tooltips-group__item">
                          <img src="static/img/chain/notice_unrecord.png" alt="">     
                          <span class="tips-content">即将需要记账</span>
                        </div>
                        <div class="tooltips-group__item">
                          <img src="static/img/chain/nomal_empty.png" alt="">
                          <el-tooltip placement="top" popper-class='tool'>
                            <div slot="content">
                              <div class="tips-info">
                                <div>
                                  <img src="static/img/chain/nomal_register.png" alt="">
                                  <span>编辑中且未提交平台</span>
                                </div>
                                <div>
                                  <img src="static/img/chain/nomal_examine.png" alt="">
                                  <span>已审核并提交平台</span>
                                </div>
                                <div>
                                  <img src="static/img/chain/nomal_confirm.png" alt="">
                                  <span>经过合作方确认并增信</span>
                                </div>
                                <div>
                                  <img src="static/img/chain/nomal_unpass.png" alt="">
                                  <span>合作方拒绝增信</span>
                                </div>
                              </div>
                            </div>
                            <span class="tips-content">记账状态正常</span>
                          </el-tooltip>
                        </div>
                        <div class="tooltips-group__item">
                          <img src="static/img/chain/alert_empty.png" alt="">
                          <el-tooltip placement="top" popper-class='tool'>
                            <div slot="content">
                              <div class="tips-info">
                                <div>
                                  <img src="static/img/chain/alert_unrecord.png" alt="">
                                  <span>未开始记账</span>
                                </div>
                                <div>
                                  <img src="static/img/chain/alert_register.png" alt="">
                                  <span>编辑中且未提交平台，记账时间滞后过久</span>
                                </div>
                                <div>
                                  <img src="static/img/chain/alert_examine.png" alt="">
                                  <span>已审核并提交平台，记账时间滞后过久</span>
                                </div>
                                <div>
                                  <img src="static/img/chain/alert_confirm.png" alt="">
                                  <span>经过合作方确认并增信，记账时间滞后过久</span>
                                </div>
                                <div>
                                  <img src="static/img/chain/alert_unpass.png" alt="">
                                  <span>合作方拒绝增信</span>
                                </div>
                              </div>
                            </div>
                            <span class="tips-content">记账状态异常</span>
                          </el-tooltip>
                        </div>
                        <div class="tooltips-group__item">
                          <img src="static/img/chain/hasWarning4.png" alt="">      
                          <span class="tips-content">该记账存在问题</span>
                        </div>
                      </div>
                    </div>
                    <contract :chainType="`2`" :type="`1`" :contractType="`1`" :id='chainId' @changeId='handleChild' @orderWarn="handleOrder"/>
                  </div>
                  <div class="first_chain">
                    <div class="chain_title">
                      <div class="symbol_large_orange"><div></div></div>
                      <span>销售订单登记</span>
                    </div>
                    <order-one :chainType="`2`" :type="`1`" :orderwarn="orderWarn.receive" :id='contractIds.receive' @changeCurrentOrderId="updataCurrentOrderId"  @changeOrderId="updataOrderId" @isWarning="hasWarning"/>
                  </div>
                </div>
              </div>
              <div class="chain-container">
                <div class="second_view">
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_blue"><div></div></div>
                      <span>采购合同与计划</span>
                    </div>
                    <contract :chainType="`2`" :type="`2`" :id='chainId' :contractType="`2`"  @changeId='handleChild' @orderWarn="handleOrder"/>
                  </div>
                </div>
                <div class="second_view">
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_blue"><div></div></div>
                      <span>采购订单登记</span>
                    </div>
                    <order :chainType="`2`" :type="`2`" :orderwarn="orderWarn.payment" :id='contractIds.payment' @changeOrderId="updataOrderId" @isWarning="hasWarning"/>
                  </div>
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_blue"><div></div></div>
                      <span>采购订单结算</span>
                    </div>
                    <settlement :overtime="overTime.payment" :chainType="`2`" :type="`2`" :id='contractIds.payment' :orderId="orderIds.payment"/>
                  </div>
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_blue"><div></div></div>
                      <span>采购合同结算</span>
                    </div>
                    <settlement-contract :chainType="`2`" :type="`2`" :id='contractIds.payment'/>
                  </div>
                </div>
              </div>
              <div class="chain-container">
                <div>
                  <div class="first_chain">
                    <div class="chain_title">
                      <!-- <div class="placeholder2"></div> -->
                      <div class="symbol_large_orange"><div></div></div>
                      <span>关联销售订单</span>
                    </div>
                    <order-two :chainType="`2`" :type="`1`" :currentOrderId="currentOrderId" :id='contractIds.receive'/>
                  </div>
                  <div class="first_chain">
                    <div class="chain_title">
                      <div class="symbol_large_orange"><div></div></div>
                      <span>销售结算登记</span>
                    </div>
                    <settlement :overtime="overTime.receive" :chainType="`2`" :type="`1`" :id='contractIds.receive' :orderId="orderIds.receive"/>
                  </div>
                  <div class="first_chain">
                    <div class="chain_title">
                      <div class="symbol_large_orange"><div></div></div>
                      <span>销售合同结算</span>
                    </div>
                    <settlement-contract :chainType="`2`" :type="`1`" :id='contractIds.receive'/>
                  </div>
                </div>
              </div>          
            </div>
          </div>
          <div class="chain-btn-confirm">
            <div @click="sureConfirm()" :class="Number(chainStatus) !== 1 ? '' : 'disabled'">确认并提交平台</div>
            <div class="" @click="cooperation(chainId)" :class="Number(chainStatus) === 0 ? 'disabled' : ''">合作企业确认</div>
          </div>
          <div class="modal-wrap" v-if="isShowModal">
            <div class="modal-inner-box">
              <div class="modal-header">
                <h4>合作企业确认</h4>
              </div>
              <div class="modal-body">
                <div class="modal-body__item" v-for="(el, el_index) in verifyObj" :key="el_index">
                  <div class="item-title">
                    <div class="item-title__left">
                      <label>
                        <span>合作企业：</span>
                        <span>{{el.company_info.name}}</span>
                      </label>
                      <span @click="toInvite()" :class="el.company_info.verifier ? 'item-status--verify' : 'item-status--unverify'">{{el.company_info.verifier ? '已认证' : '暂未认证点击邀请'}}</span>
                    </div>
                    <div class="item-title__right">
                      <span :class="el.company_info.disable ? 'item-disabled' : 'item-handler'" :id='el_index' @click="addItem(el, el_index)">{{ el.company_info.disable ? '已确认' : '请求确认'}}</span>
                    </div>
                  </div>
                  <div class="item-content__wraper">
                    <h5>需要确认的内容：</h5>
                    <div class="item-content__form-wrap">
                      <div class="item-content__form" v-for="(item, index) in coopTitle" :key="index">
                        <div v-if="Number(el.data_type) === 1">
                          <div class="item-content__form-row" v-for="(item_one, index_one) in item" :key="index_one" v-if="index === 0 && index_one === 0">
                            <label for="">{{'项目名称'}}：</label>
                            <div class="item-content__group">
                              <p :class="el.contract_info.approved_id ? 'item-status--confirm': 'item-status--rigister'">{{el.contract_info.name}}</p>
                            </div>
                          </div>
                          <div class="item-content__form-row" v-else>
                            <label for="">{{item_one.name}}：</label>
                            <div class="item-content__group">
                              <p :class="c_item.approved_id ? 'item-status--confirm' : 'item-status--rigister'" v-if="el.contract_list[item_one.param].length !== 0" v-for="(c_item, c_index) in el.contract_list[item_one.param]" :key="c_index">{{c_item.name || '暂无'}}</p>
                              <p style="color: #666" v-if="el.contract_list[item_one.param].length === 0">{{'暂未登记'}}</p>
                            </div>
                          </div>
                        </div>
                        <div v-else v-for="(item_one, index_one) in coopTitle2[index]" :key="index_one">
                          <div class="item-content__form-row">
                            <label for="">{{item_one.name}}：</label>
                            <div class="item-content__group">
                              <p :class="c_item.service_approved_id ? 'item-status--confirm' : 'item-status--rigister'" v-if="el.contract_list[item_one.param].length !== 0" v-for="(c_item, c_index) in el.contract_list[item_one.param]" :key="c_index">{{c_item.name || '暂无'}}</p>
                              <p style="color: #666" v-if="el.contract_list[item_one.param].length === 0">{{'暂未登记'}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="modal-footer__btn modal-footer__btn_reset" @click="modalReset">取消</div>
                <!-- <div class="modal-footer__btn modal-footer__btn_confirm">确认</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selIndex === 1" class="chain_list">
        <role-register/>
      </div>
      <div v-if="selIndex === 2" class="chain_list">
        <button class="data_time_model" v-for="(item, index) in dataTimeModel" :key="index" @click="dataModel(index)">{{item}}</button>
        <data-analyse v-if='dataTime === 0' />
        <time-model v-if="dataTime === 1" />
      </div>
      <div v-if="selIndex === 3" class="chain_list">
        <attachments/>
      </div>
      <div v-if="selIndex === 4" class="chain_list">
        <paymentSupply />
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <invite ref="invite" :hideList="true" @hideMoadal="toHideModal"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import appNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
import Contract from '@/components/chain_app/base/chain_modules/chain_contract'
import Order from '@/components/chain_app/base/chain_modules/chain_order'
import OrderOne from '@/components/chain_app/base/chain_modules/chain_order1'
import OrderTwo from '@/components/chain_app/base/chain_modules/chain_order2'
import Settlement from '@/components/chain_app/base/chain_modules/chain_settlement'
import SettlementContract from '@/components/chain_app/base/chain_modules/chain_settlement_contract'
import RoleRegister from '../chain_roles/PaymentRoleRegister'
import paymentSupply from '../chain_supply/PaymentSupplyRegister'
// 大数据资产与分析
import timeModel from '../chain_roles/timeModel'
import dataAnalyse from '../chain_roles/bigDataAnalyse'
import Attachments from '../chain_attachments/PaymentAttchements'
import Invite from '@/components/administration/settings/invitingAdmin'
import 'vue-happy-scroll/docs/happy-scroll.css'
import ring from '@/components/public/ring-chain'
export default {
  name: 'chain_line',
  components: {
    // appNav, 
    Location, Contract, Order, Settlement, SettlementContract, OrderOne,
    RoleRegister, paymentSupply, Attachments, timeModel, dataAnalyse, Invite, OrderTwo, ring
  },
  data () {
    return {
      father: {
        selIndex: 1
      },
      navList: [
        {name: '链式记账', path: '/chainview_new/list'},
        {name: '参与角色与记录', path: '/chain/role'},
        {name: '大数据资产与分析', path: '/chainview_new/chart'},
        {name: '单证与票据原件', path: '/chainview_new/file'},
        {name: '补充', path: '/chainview_new/info'}
      ],
      selIndex: 0,
      dataTime: 0,
      dataTimeModel: ['数据模型', '时间模型'],
      bigData: {
        receive_contract_data: '',
        payable_contract_data: '',
        receive_info: '',
        payable_info: '',
        business: ''
      },
      down1: false,
      down2: false,
      down3: false,
      // 顶部定位条
      element: false,
      elementScorllTop: '',
      userTypeArr: ['institution', 'serviceprovider', 'person', 'institutionperson', 'serviceperson'],
      contractIds: {
        receive: '',
        payment: ''
      },
      orderIds: {
        receive: '',
        payment: ''
      },
      overTime: {
        receive: '',
        payment: ''
      },
      ticket: {
        bank_ticket: {},
        business_ticket: {},
        digital_ticket: {}
      },
      bar: {
        red_bar: {},
        yellow_bar: {},
        white_bar: {}
      },
      isShowModal: false,
      info_list: [],
      verifyObj: [],
      chainStatus: '',
      coopTitle: [
        [{}, {name: '电子出库单', param: 'Warehouse'}, {name: '结算', param: 'Settlement'}],
        [{name: '电子订单', param: 'Order'}, {name: '电子运单', param: 'Transport'}, {name: '发票', param: 'Invoice'}],
        [{name: '应收订金', param: 'Deposit'}, {name: '验收入库单', param: 'Acceptance'}, {name: '支付', param: 'Payment'}]
      ],
      coopTitle2: [
        [{name: '仓储合同', param: 'WarehouseContract'}, {name: '电子出库单', param: 'Warehouse'}],
        [{name: '运输合同', param: 'TransportContract'}, {name: '电子运单', param: 'Transport'}],
        [{name: '验收入库单', param: 'Acceptance'}]
      ],
      dialogVisible: false,
      orderWarn: {
        receive: '',
        payment: ''
      },
      currentOrderId: ''
    }
  },
  methods: {
    toInvite () {
      this.dialogVisible = true
      setTimeout(()=> {
        this.$refs.invite.startInviting()
      }, 500)
    },
    toHideModal (e) {
      this.dialogVisible = e
    },
    // 时间模型
    dataModel (i) {
      var that = this
      if (i === 0) {
        that.dataTime = 0
      } else if (i === 1) {
        that.dataTime = 1
      }
    },
    addItem (item, index) {
      let dom = document.getElementById(index)
      this.info_list = [item]
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$ajax.post(`/api/chain/co_confirm/`, {info_list: this.info_list}).then(res => {
        if (res.status === 200) {
          dom.innerText =  '已确认'
          dom.className = 'item-disabled'
        }
        loading.close()
      })
    },
    modalReset () {
      this.isShowModal = false
      document.querySelector('body').style.overflow = 'auto'
    },
    getChainStatus (chainId) {
      this.$ajax.get(`/api/chain/${chainId}/status/`).then(res => {
        this.chainStatus = res.data.status
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
    },
    getTickets (id) {
      this.$ajax.get(`/api/chain/${id}/ticket/`).then(res => {
        this.ticket = res.data
      })
    },
    getBars (id) {
      this.$ajax.get(`/api/chain/${id}/bar/`).then(res => {
        this.bar = res.data
      })
    },
    sureConfirm () {
      this.$confirm('此操作将向平台提交数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.patch(`/api/chain/${this.$route.query.id}/verified/`).then(res=>{
          if (res.status === 200) {
            this.$message.success('操作成功!')
          }
          this.getChainStatus(this.chainId)
        })
      }).catch(() => {})
    },
    cooperation (chainId) {
      const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      this.$ajax.get(`/api/chain/${chainId}/related_info/`).then(res => {
        if (res.status === 200) {
          this.isShowModal = true
          this.verifyObj = res.data.data
          document.querySelector('body').style.overflow = 'hidden'
        }
        loading.close()
      })
    },
    changeTab: function ($event, index) {
      // index !== 2 ? this.selIndex = index : ''
      this.selIndex = index
      this.down1 = this.down2 = this.down3 = false
    },
    handleScroll: function () {
      var that = this
      that.elementScorllTop = document.documentElement.scrollTop || document.body.scrollTop
      that.element = (that.elementScorllTop > 75) ? true : false
    },
    handleChild: function (e) {
      e.type === `1` ? this.contractIds.receive = e.id : this.contractIds.payment = e.id
    },
    updataOrderId: function (e) {
      e.type === `1` ? this.orderIds.receive = e.id : this.orderIds.payment = e.id
    },
    hasWarning: function(e) {
      e.type === `1` ? this.overTime.receive = e : this.overTime.payment = e
    },
    handleOrder: function (e) {
      e.type === `1` ? this.orderWarn.receive = (e.time !== '' ?  Number(Object.values(e.time)[0]) : '') : this.orderWarn.payment = (e.time !== '' ?  Number(Object.values(e.time)[0]) : '')
    },
    updataCurrentOrderId: function (e) {
      this.currentOrderId = e
    }
  },
  beforeCreate: function () {
    var that = this
    if (that.$route.query.id) {
      that.chainId = that.$route.query.id
    }
    that.location = [
      {title: '链式记账', url: '/chain_app/chain_main?type=1'},
      {title: '总览'}
    ]
    if (that.$route.query.id) {
      that.chainId = that.$route.query.id.toString()
    }
    this.userType = localStorage.role
  },
  mounted: function () {
    var that = this
    window.addEventListener('scroll', this.handleScroll)
    window.onscroll = function () {
      that.handleScroll()
    }
    document.addEventListener('click', () => {
      this.isShowModal = false
      document.querySelector('body').style.overflow = 'auto'
    })
    that.getTickets(that.chainId)
    that.getBars(that.chainId)
    that.getChainStatus(that.chainId)
  }
}
</script>

<style lang="less">
@theme_orange: #eb6100;
@theme_blue: #0c8dff;
.orderTitle {
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  &>span {
    strong {
      font-size: 16px;
      color: #eb6100;
      &.text {
        font-size: 15px;
      }
    }
  }
}
.tips-info {
  &>div {
    display: flex;
    align-items: center;
    margin: 8px 0;
    img {
      width: 18px;
      margin-right: 8px;
    }
    span {
      margin: 5px 0;
      display: inline-block;
      min-width: 150px
    }
  }
}
.chain-flex {
  display: flex;
  align-items: center;
  margin-right: 20px;
  position: relative;
  .chain-flex__icon {
    margin-right: 12px;
    cursor: pointer;
    width: 18px;
  }
  &.chain-flex__icon_problom::before {
    content: "";
    position: absolute;
    background: url('../../../../static/img/chain/hasWarning4.png') no-repeat;
    height: 14px;
    width: 20px;
    margin-left: 11px;
    margin-top: -10px;
    background-size: 60%;
  }
  .chain-flex__icon_warning {
    background: #fff;
    animation: twinkle1 .8s ease-in-out 0s infinite;
    -moz-animation: twinkle1 .8s ease-in-out 0s infinite;
    -webkit-animation: twinkle1 .8s ease-in-out 0s infinite;
    // margin-bottom: 6px
  }
  &>.twinkle {
    width: 22px;
    bottom: 6px;
    position: absolute;
    animation: twinkle .8s ease-in-out 0s infinite;
    -moz-animation: twinkle .8s ease-in-out 0s infinite;
    -webkit-animation: twinkle .8s ease-in-out 0s infinite;
  }
  @keyframes twinkle
  {
    0%{
      opacity: 0;
      // filter: brightness(1)
    }
    100%{
      opacity: 1;
      // filter: brightness(150%)
    }
  }
  @-webkit-keyframes twinkle
  {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes twinkle1
  {
    0%{
      opacity: 0;
      transform: scale(.8)
      // filter: brightness(1)
    }
    100%{
      opacity: 1;
      transform: scale(1);
      // filter: brightness(150%)
    }
  }
  @-webkit-keyframes twinkle1
  {
    0%{
      opacity: 0;
      transform: scale(.8)
      // filter: brightness(1)
    }
    100%{
      opacity: 1;
      transform: scale(1);
      // filter: brightness(150%)
    }
  }
  &.title_b {
    min-width: 170px;
    max-width: 290px;
    .span_title {
      color: #0c8dff;
      margin-right: 8px; 
    }
  }
  &.title_o {
    min-width: 170px;
    max-width: 290px;
    .span_title {
      color: #eb6100;
      margin-right: 8px; 
    }
  }
}
.chain-box {
  .chain-btn-confirm {
    display: flex;
    justify-content: center;
    div {
      width: 120px;
      height: 36px;
      line-height: 36px;  
      text-align: center;
      border-radius: 4px;
      font-size: 14px; 
      cursor: pointer;
      border: 1px solid #eb6100;
      background: #eb6100;
      color: #ffffff;
      margin: 40px 30px;
      &.disabled {
        background: #f5f7fa;
        color: #c0c4cc;
        border-color: #c0c4cc;
        pointer-events: none
      }
    }
  }
  .chain-box__item {
    margin: 0 20px;
    .chain-box__item__title {
      width: 100%;
      line-height: 60px; 
      text-align: center;
      border-bottom: 3px solid #666666;
      margin: 0 auto;
      position: relative;
      img {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -22px
      }
      span {
        font-weight: bolder;
        font-size: 18px;
        color: #333;
      }
    }
    &:nth-of-type(2)>.chain-box__item__title {
      border-left: 1px dashed #979797;
    }
    .chain-box__item__content {
      .chain-box__item__title {
        border-left: 1px dashed #979797;
      }
    }
  }
  .modal-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    overflow: auto;
    z-index: 2018;
    background-color: rgba(0, 0, 0, .3); 
    &>.modal-inner-box {
      margin: 0 auto;
      width: 1080px;
      margin-top: 15vh;
      padding: 20px;
      background: #ffffff;
      border: 1px solid #e1e6f0;
      border-radius: 6px;
      position: relative;
      .modal-header {
        line-height: 42px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        background: #FFA669;
      }
      .modal-body {
        padding: 14px 20px;
        overflow-y: auto;
        // height: 650px;
        &::-webkit-scrollbar {
          display: none
        }
        .modal-body__item {
          border:1px solid rgba(238, 238, 238, 1);
          border-radius:6px;
          margin-bottom: 10px;
          .item-title {
            height:32px;
            background:rgba(255,224,202,1);
            border-radius:6px 6px 0px 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 18px;
            font-size: 14px;
            .item-title__left {
              color: #FA7023;
              label {
                margin-right: 21px; 
              }
              .item-status--verify::after {
                content: '';
                display: inline-block;
                background: url('../../../../static/img/chain/ninstar_small.png');
                vertical-align: text-top;
                width: 16px;
                height: 16px;
                margin-left: 5px;
              }
              .item-status--unverify {
                text-decoration: underline;
                cursor: pointer;
              } 
            }
            .item-title__right {
              color: #fff;
              font-size: 12px;
              .item-handler {
                background:rgba(255,166,105,1);
                border:1px solid rgba(253,141,64,1);
                border-radius:4px;
                padding: 2px 15px;
                cursor: pointer;
                &::after {
                  content: '';
                  display: inline-block;
                  background: url('../../../../static/img/chain/next_small.png');
                  width: 16px;
                  height: 14px;
                  vertical-align: text-top;
                  margin-left: 10px;
                }
              }
              .item-disabled {
                background-color: #f5f7fa;
                padding: 2px 24px;
                color: #c0c4cc;
                cursor: not-allowed;
                border-radius:4px;
                pointer-events: none;
              }
            }
          }
          .item-content__wraper {
            font-size: 14px;
            &>h5 {
              padding: 4px 0  0 20px;
              font-weight: bolder;
            }
            .item-content__form-wrap {
              display: flex;
              .item-content__form {
                flex: 1;
                margin: 5px 10px;
                border-right: 1px dashed rgba(238,238,238,1);
                padding-left: 25px; 
                &:last-of-type {
                  border: none;
                } 
                .item-content__form-row {
                  margin-top: 12px;
                  display: flex;              
                  label {
                    display: inline-block;
                    width: 90px;
                    text-align: right;
                    color: #333
                  }
                  .item-content__group {
                    padding-left: 8px; 
                    .item-status--confirm {
                      margin-bottom: 9px;
                      font-weight: 400;
                      color: #999;
                      &::before {
                        content: "";
                        display: inline-block;
                        background: url('../../../../static/img/chain/confirm_small.png') no-repeat;
                        height: 14px;
                        width: 15px;
                        transform: translateY(10%);
                        margin-right: 8px;
                      }
                    }
                    .item-status--rigister {
                      margin-bottom: 6px;
                      font-weight: 400;
                      color: #666;
                      &::before {
                        content: "";
                        display: inline-block;
                        background: url('../../../../static/img/chain/rigister_small.png') no-repeat;
                        height: 14px;
                        width: 14px;
                        transform: translateY(10%);
                        margin-right: 8px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .modal-footer {
        padding: 0px 20px;
        display: flex;
        justify-content: center;
        .modal-footer__btn {
          padding: 3px 20px;
          background: #e1e6f0;
          margin: 0 20px;
          cursor: pointer;
          border-radius: 6px;
          font-size: 14px;
          &.modal-footer__btn_confirm{
            background: #FFA669;
            color: #fff;
          }
          &.modal-footer__btn_reset{
            border: 1px solid #FFA669;
            color: #FFA669;
            background: #fff;
          }
        }
      }
    }
  }
}
.chain-container {
  margin: 0 auto;
  min-height: 100%;
  border-left: 1px dashed #979797;
  &.border_hide {
    border-left: none;
  }
  &>.first_view.border_show {
    border-left: 1px dashed #979797;
  }
}
.second_view {
  margin-left: 36px;
  .second_chain {
    border-left: 1px dashed #c5c5c5;
    &.extend_border {
      border-left: 1px dashed #979797;
    }
  }
}
.chain-intro {
  color:#ffffff;
  .chain-intro__title {
    font-size:14px;
    padding: 3px 0;
    img {
      height: 16px;
      vertical-align: top
    }
  }
  .chain-intro__content {
    padding: 0 5px;
    margin-top: 5px;
    font-size: 12px;
    .chain-intro__content__line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &>p { 
        display: flex;
        margin: 5px 0;
        justify-content: space-between;
        min-width: 115px;
        span:first-child {
          margin-right: 15px;
        }
      }
    }
  }
}
.chain_title {
  .tooltips-group {
    position: absolute;
    display: flex;
    top: 10px;
    right: 0;
    .tooltips-group__item {
      display: flex;
      align-items: center;
      flex: 0 0 20%;
      max-width: 20%;
      &:last-of-type {
        flex: 0 0 24%;
        max-width: 24%;
      }
      img {
        margin: 0 10px;
        width: 18px;
      }
      .tips-content {
        color: #666;
        font-weight: bolder;
        cursor: pointer;
      }
    }
  }
  .placeholder {
    width: 40px;
    height: 29px;
    background: #f5f7f8;
    position: absolute;
    border-left: 1px dashed #979797;
    border-bottom: 1px dashed #979797;
    left: -37px;
  }
  .placeholder2 {
    width: 32px;
    height: 20px;
    background: #f5f7f8;
    position: absolute;
    border-left: 1px dashed #979797;
    border-top: 1px dashed #979797;
    left: -1px;
  }
  line-height: 60px;
  position: relative;
  padding: 0 20px;
  span {
    font-weight: bolder;
  }
  .symbol_large_orange {
    background: url('../../../../static/img/chain/chain_circle_l_y.png');
    position: absolute;
    top: 15px;
    left: -15px;
    width: 30px;
    height: 30px;
  }
  .symbol_middle_orange {
    background: url('../../../../static/img/chain/chain_circle_m_y.png');
    position: absolute;
    top: 20px;
    left: -11px;
    width: 21px;
    height: 21px;
  }
  .symbol_large_blue {
    background: url('../../../../static/img/chain/chain_circle_l_b.png');
    position: absolute;
    top: 15px;
    left: -15px;
    width: 30px;
    height: 30px;
  }
  .symbol_middle_blue {
    background: url('../../../../static/img/chain/chain_circle_m_b.png');
    position: absolute;
    top: 20px;
    left: -11px;
    width: 21px;
    height: 21px;
  }
}
.tab-menu-group {
  width: calc(100% - 100px);
  margin-left: 36px;
  padding: 0 4px;
  border-bottom: 0;
  height: 60px;
  display: flex;
  align-items: center;
  .section_title {
    white-space: nowrap;
    user-select: none;
    .tab-menu {
      list-style: none;
      white-space: nowrap;
      overflow: hidden;
      padding-left: 1px;
      margin-top: 22px;
      margin-bottom: 0;
      background: #fff;
      word-spacing: -4px;
      .tab-menu__item {
        display: inline-block;
        line-height: 37px;
        border: 1px solid #e1e6f0;
        border-bottom: 0;
        color: #999;
        text-align: center;
        font-size: 14px;
        padding: 0 23px;
        margin-left: -1px;
        border-radius: 2px 2px 0 0;
        user-select: none;
        cursor: pointer;
        &:first-child:not(:last-child) {
          border-top-right-radius: 0;
        }
        &:last-child:not(:first-child) {
          border-top-left-radius: 0;
        }
        &:not(:first-child):not(:last-child) {
          border-radius: 0;
        }
        &.tab-menu__item_active_o {
          background: #eb6100;
          color: #fff;
          border-color: #eb6100;
        }
        &.tab-menu__item_active_o1 {
          background: #f48537;
          color: #fff;
          border-color: #f48537;
        }
        &.tab-menu__item_active_b {
          background: #0c8dff;
          color: #fff;
          border-color: #0c8dff;
        }
        &.tab-menu__item_active_b1 {
          background: #53aefe;
          color: #fff;
          border-color: #53aefe;
        }
        &.tab-menu__item_add_o {
          .tab-menu__item__icon {
            height: 12px;
            width: 12px;
            display: inline-block;
            margin-right: 6px;
            background: url('../../../../static/img/chain/plus.png');
          }
          .tab-menu__item__icon_warning {
            background: url('../../../../static/img/chain/hasWarning4.png') no-repeat;
            width: 21px;
            height: 20px;
            background-size: 67%;
            position: absolute;
            right: -13px;
            top: -5px;
          }
        }
        &.tab-menu__item_add_o:hover {
          color: #f48537;
          border-color: #f48537;
          .tab-menu__item__icon {
            background: url('../../../../static/img/chain/plus_y.png');
          }
        }
        &.tab-menu__item_add_o_warning {
          .tab-menu__item__icon {
            background: url('../../../../static/img/chain/plus_y.png');
          }
          animation: addWarning1 1s cubic-bezier(.645,.045,.355,1) infinite;
          @-webkit-keyframes addWarning1 {
            0% {
              color: #999;
              border-color: #e1e6f0; 
            }
            100% {
              color: #ff0000;
              border-color: #ff0000;
              // box-shadow: 0 0 2px 1px #eb6100
            }
          }
          @keyframes addWarning1 {
            0% {
              color: #999;
              border-color: #e1e6f0;
            }
            100% {
              color: #ff0000;
              border-color: #ff0000;
              // box-shadow: 0 0 2px 1px #eb6100
            }
          }
        }
        &.tab-menu__item_add_b {
          .tab-menu__item__icon {
            height: 12px;
            width: 12px;
            display: inline-block;
            margin-right: 6px;
            background: url('../../../../static/img/chain/plus.png');
          }
          .tab-menu__item__icon_warning {
            background: url('../../../../static/img/chain/hasWarning4.png') no-repeat;
            width: 21px;
            height: 20px;
            background-size: 67%;
            position: absolute;
            right: -13px;
            top: -5px;
          }
        }
        &.tab-menu__item_add_b:hover {
          color: #53aefe;
          border-color: #53aefe;
          .tab-menu__item__icon {
            background: url('../../../../static/img/chain/plus_b.png');
          }
        }
        &.tab-menu__item_add_b_warning {
          &>.tab-menu__item__icon {
            background: url('../../../../static/img/chain/plus_b.png');
          }
          animation: addWarning2 1s cubic-bezier(.645,.045,.355,1) infinite;
          @-webkit-keyframes addWarning2 {
            0% {
              color: #999;
              border-color: #e1e6f0; 
            }
            100% {
              color: #0c8dff;
              border-color: #0c8dff;
              // box-shadow: 0 0 2px 1px #eb6100
            }
          }
          @keyframes addWarning2 {
            0% {
              color: #999;
              border-color: #e1e6f0;
            }
            100% {
              color: #0c8dff;
              border-color: #0c8dff;
              // box-shadow: 0 0 2px 1px #eb6100
            }
          }
        }
      } 
    }
  }
}
.show_chain_table {
  border: 1px solid #e1e6f0;
  border-left: none;
  background: #fff;
  .chain_table_line {
    padding: 0 30px;
    .show_line {
      min-height: 44px;
      display: flex;
      border-bottom: 1px dashed #e1e6f0;
      align-items: center;
      user-select: none;
      &.hide-line {
        border-bottom: none
      }
      .show_line_title {
        width: 10%;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: bolder;
      }
      .show_line_detail {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 78%;
        font-size: 14px;
        div.is_null {
          color: #999;
        }
        div.default {
          span {
            color: #999;
          }
        }
        div.theme_orange {
          margin-right: 25px;
          font-size: 14px;
          line-height: 40px;
          span {
            cursor: pointer;
            color: @theme_orange;
            &.linker {
              text-decoration: underline;
            }
          }
          &>span:last-child {
            color: @theme_orange;
            margin-left: 6px;
          }
        }
        div.theme_blue {
          margin-right: 25px;
          font-size: 14px;
          line-height: 40px;
          span {
            cursor: pointer;
            color: @theme_blue;
            &.linker {
              text-decoration: underline;
            }
          }
          &>span:last-child {
            color: @theme_blue;
            margin-left: 6px;
          }
        }
        div.text-warning {
          &>label {
            // background:#871317  -webkit-linear-gradient(left,#c70000,#febaf7 50%,#ff0 90%,#561214) no-repeat 0 0;
            background:#871317;
            background-size:20% 100%; 
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            // font-weight: bold;
            // -webkit-animation: textShine 2s linear infinite;
            // animation: textShine 2s linear infinite;
            &>span {
              strong {
                font-size: 18px;
                -webkit-text-fill-color: #ff0000;
              }
            }
          }
          @-webkit-keyframes textShine {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 100% 100%;
              }
            }
            @keyframes textShine {
              0% {background-position: 0 0; }
              100% {background-position: 100% 100%; }
          }
        }
      }
      .show_line_operate {
        width: 10%;
        display: flex;
        align-items: center;
        line-height: 30px;
        padding: 0 10px;
        font-size: 14px;
        color: #999;
        border-radius:2px;
        border:1px solid #e1e6f0;
        cursor: pointer;
        padding-right: 10px;
        min-width: 160px;
        span {
          height: 12px;
          width: 12px;
          display: inline-block;
          margin-left: 3px;
          margin-right: 12px;
          background: url('../../../../static/img/chain/plus.png');
        }
        &.theme_orange:hover {
          border: 1px solid @theme_orange;
          color: @theme_orange;
          &>span {
            background: url('../../../../static/img/chain/plus_y.png');
          }
        }
        &.theme_blue:hover {
          border: 1px solid @theme_blue;
          color: @theme_blue;
          &>span {
            background: url('../../../../static/img/chain/plus_b.png');
          }
        }
      }
    }
  }
  .chain_table_line:last-of-type {
    .show_line:last-of-type {
      border: none;
    }
  }
}
</style>


<style scoped lang="less">
  .view_chain {
    background: #fafafa;
    display: flex;
    //padding-top: 70px;
    min-height: 100%;
    margin: 0 auto;
    .c_slide_container:hover+.nav_chain_top{
      width: calc(100% - 220px);
      transition: all 0.4s ease;
      -webkit-transition: all 0.4s ease;
      -o-transition: all 0.4s ease;
      -moz-transition: all .4s;
    }
    .nav_chain_top {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    .topLocation {
      // padding-left: 50px;
      .location {
        padding-left: 0px;
      }
      img {
        width: 22px;
        vertical-align: middle;
      }
      margin-bottom: 10px
    }
    .nav_title {
      position: relative;
      width: 80%;
      line-height: 32px;
      text-align: center;
      color: #666666;
      margin: 0 auto;
      border: 1px solid #cccccc;
      border-radius: 8px;
      p>span {
        margin: 0 50px;
        font-weight: 700;
        font-size: 14px;
      }
    }
    position: fixed;
    top: 70px;
    // width: 100%;
    right: 0;
    height: 60px;
    background: #fff;
    padding: 10px 50px 0;
    z-index: 1006;
    border-bottom: 1px solid #eaeaea;
    -moz-box-shadow:1px 4px 5px #EAEAEA;
    -webkit-box-shadow:1px 4px 5px #EAEAEA;
    box-shadow:1px 4px 5px #EAEAEA;
    &.max-topHeight {
      height: 180px;
    }
  }
    .c_empty_accessory{
      height: 44px;
      font-size: 14px;
      line-height: 44px;
      color: #999;
      text-align: center;
      border-top: 1px dashed #ccc;
      margin: 0 50px;
    }
    .gray{
      color:#666666;
    }
    .show_title {
      line-height: 80px;
      i {
        color: #333333;
        margin-right: 10px;
        font-size: 20px;;
      }
      .c_jump {
        color: #343536;
        text-decoration: none;
      }
    }
    .c_order_info{
      background: #fff;
      position: relative;
      padding-top: 20px;
      .c_order_info_inner {
        border: 1px solid #cccccc;
        width: 80%;
        line-height: 32px;
        margin: 0 auto;
        border-radius: 8px;
        text-align: center;
        p {
          span {
            margin: 0 50px;
            color: #333;
            font-size: 14px;
            font-weight: 700;
          }
        }
      }
    }
  }
  .line_detail {
    // width: 100%;
    // padding: 0 20px 0 50px;
    background: #f5f7f8;
    min-height: 100%;
    .middleLocation {
      background: #fff;
      // padding-left: 50px;
      img {
        width: 22px;
        vertical-align: middle;
      }
    }
    .contract_info {
      width: 860px;
      background: rgba(242, 242, 242, 1);
      margin: 0 auto;
      font-size: 14px;
      height: 85px;
      line-height: 85px;
      text-align: center;
      span:nth-child(2) {
        margin: 0 20px;
      }
    }
    .navChainLine {
      position: relative;
      min-height: 120px;
      background: #fff;
    }
    .chainNavLine {
      position: relative;
      min-height: 120px;
      padding: 20px 50px 0;
      background: #fff;
      #ring {
        min-height: 100px;
      }
    }
  }
  .view_nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background:#fff;
    // margin-top:40px;
    height:63px;
    padding: 25px 30px 0;
    position: relative;
    z-index: 10;
    li {
      /*width: 150px;*/
      font-size: 14px;
      text-align: center;
      width: 100%;
      height: 100%;
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        line-height: 38px;
        color: #eb6100;
        // border-right: 1px dashed #dbdbdb;
      }
    }
    .sel {
      border-top: 2px solid #eb6100;
      background: #f5f7f8;
      color: #eb6100;
      border-right: 1px dashed #dbdbdb;
      border-left: 1px dashed #dbdbdb;
      border-bottom: 0;
    }
  }
  .chain_list {
    margin-top: 20px;
    padding: 0 30px;
    padding-bottom: 30px;
    position: relative;
    .data_time_model {
      width: 140px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #eb6100;
      color: #eb6100;
      outline: none;
      border-radius: 5px;
      background: #fff;
      margin: 0 50px 20px;
    }
    &.c_tab_3 .item_table{
      border-bottom: 1px solid #ccc;
      &:last-of-type{
        border-bottom: none;
      }
    }
    .chain {
      border-left: 1px dashed #999;
      .retaled {
        .card_title {
          border-bottom: 2px solid #415de3;
          i.c_bg_down {
            color: #415de3;
            background: url("../../../../static/img/downchain.png") no-repeat center center;
          }
        }
      }
    }
    .bottom {
      width:100%;
      height:57px;
      display: flex;
      flex-direction: row;
      // background: #fff;
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
              width: 43px;
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
            padding: 0 12px;
            border-right:1px dashed #999999;
            // white-space: nowrap;
            span {
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
            padding: 0 12px;
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
    .card_title {
      height: 40px;
      position: relative;
      line-height: 40px;
      text-align: center;
      border-bottom: 2px solid #eb6100;
      width: 100%;
      font-size: 20px;
      margin: 0 auto;
      margin-bottom: 20px;
      &>span {
        font-weight: bold;
        position:relative;
        .c_bg_down{
          position: absolute;
          top:37px;
          left:50%;
          width:20px;
          height:14px;
          background: url("../../../../static/img/chaindown.png") no-repeat center center;
          display: inline-block;
        }
      }
      .slide_down {
        top: 10px;
        position: absolute;
        right: 0;
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;;
        .icon {
          font-size: 12px;;
          transition: all .3s;
        }
      }
      i {
        transition: all 0.14s ease-in;
      }
    }    
    .card_list {
      .slide_nav {
        padding: 0 50px;
        line-height: 30px;
        font-size: 14px;
      }
      .card_item {
        width: 100%;
        padding-top: 30px;
        min-height: 100px;
      }
      .item_title {
        height: 30px;
        line-height: 30px;
        cursor: visible;
        position: relative;
        .title_symbol {
          width: 24px;
          height: 24px;
          position: absolute;
          left: -13px;
          top: 5px;
          background: #f3d9c6;
          border-radius: 50%;
          div {
            width: 13px;
            height: 13px;;
            background: #eb6100;
            border-radius: 50%;
            margin: 5px auto;
          }
        }
        span {
          font-size: 14px;
          margin: 0 10px;
        }
        span:nth-child(2) {
          font-weight: bold;
          font-size: 18px;
          margin-left: 30px;
          color: #333;
        }
        span:nth-child(3) {
          height: 30px;
          // padding: 0px 20px;
          width: 160px;
          text-align: center;
          font-size: 12px;
          border-radius: 3px;
          // background: #eb6100;
          background: #fff;
          border: 1px solid #cccccc;
          border-left: none;
          cursor: pointer;
          // color: #fff;
          position: absolute;
          // right: 0px;
          left: -10px;
          top: 40px;
          &:hover{
            background: #eb6100;
            color: #fff;
            border-color: #eb6100;
          }
        }
      }
      .item_info {
        // background: #fff;
        // border: 1px solid #eee;
        // box-shadow: 2px 0px 6px #ccc;
        margin-top: 20px;
        width: 100%;
        // padding: 15px;
        .item_card {
          border: 1px solid #ccc;
          border-left: none;
          background: #fff;
          padding-bottom: 20px;
          margin-bottom: 20px;
          position: relative;//为每个新增按钮的定位
          .c_add_new_btn{
            position: absolute;
            right: 10px;
            top: 17px;
            height: 30px;
            line-height: 30px;
            width: 160px;
            text-align: center;
            font-size: 12px;
            border-radius: 3px;
            background: #fff;
            border: 1px solid #cccccc;
            cursor: pointer;
            &:hover{
              background: #eb6100;
              color: #fff;
              border-color: #eb6100;
            }
          }
        }
        .c_add_data{
          border-bottom: 1px solid #eee;
          padding: 0px 50px 10px;
          margin-bottom: 15px;
          font-size: 14px;
        }
        .item_btn {
          font-size: 14px;
          border-bottom:1px solid #ccc;
          margin-top: 20px;
          span:first-child {
            color: #eb6100;
            border-bottom:4px solid #eb6100;
          }
          span:last-child{
            color: #eb6100;
            border-bottom:4px solid #eb6100;
            margin-left: 20px;
          }
          span {
            display: inline-block;
            padding: 10px 34px;
            cursor: pointer;
          }
        }
        .item_sec_title {
          padding: 15px 40px;
          font-size: 14px;
          color: #eb6100;
          span {
            font-weight: bold;
          }
        }
        .item_table {
          width:100%;
          display: inline-block;
          color: #343536;
          p {
           width: 100%;
            padding: 0 15px;
            font-size: 14px;
            color: #333;
            height: 50px;
            line-height: 50px;
            display: flex;
            background: #f4f4f4;
            // border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            // justify-content: space-between;
            .timestamp {
              color: #ea544a;
              margin-right: 100px;
              font-weight: bolder;
            }
          }
          .teble_title {
            display: flex;
            align-items: center;
            height: 44px;
            line-height: 44px;
            // border: 1px solid #eee;
            font-size: 14px;
            margin: 0 50px;
            div {
              flex:1;
              text-align: center;
            }
            div.log_title:last-child {
              width: 320px;
            }
          }
          .table_line {
            display: flex;
            min-height: 44px;
            font-size: 14px;
            border-top: 1px dashed #ccc;
            margin: 0 50px;
            div {
              min-height: 44px;
              line-height: 44px;
              flex:1;
              text-align: center;
              cursor: pointer;
            }
            div.td_loginfo {
              width: 320px;
            }
            a {
              color: #eb6100;
            }
          }
        }
        .item_no_table {
          height: 60px;
          line-height: 60px;
          color: #999;
          text-align: center;
        }
        .item_detail {
          color: #999;
          padding: 10px 50px 0px 50px;
          border-top: 1px solid #ccc;
          .detail_line {
            font-size: 14px;
            line-height: 32px;
            p {
              padding: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              background: #fff;
              border: none;
            }
            span{
              display: inline-block;
              width: 33%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .detail_time {
              margin-left: 0 15px;
              color: #999;
            }
          }
        }
        .show_suppy_wrap {
          padding: 0 50px;
          .show_supply_title {
            line-height: 36px;
            color: #eb6100;
            font-size: 14px;
          }
          .supply_list {
            // padding: 0 20px;
            .supply_table {
              margin: 20px 0;
              p.supply_btn {
                border-bottom: 1px solid #ccc;
                line-height: 20px;
                padding: 0;
                display: block;
                padding: 10px 0px;
                height: auto;
                background: #fff;
                span:first-child, span:last-child {
                  padding: 10px 20px;
                  color: #eb6100;
                  border-bottom: 2px solid #eb6100;
                  margin-right: 10px;
                  cursor: pointer;
                  font-weight: 200;
                }
              }
              p.supply_btn+p{
                line-height: 50px;
                height: 50px;
                background: #f4f4f4;
              }
              p {
                padding: 0 20px;
                line-height: 36px;
                display: flex;
                align-items: center;
                // justify-content: space-between;
                font-size: 14px;
                span:last-child {
                  color: #ea544a;
                  margin-right: 100px;
                  font-weight: bolder;
                }
              }
              .teble_title, .table_line {
                display: flex;
                height: 44px;
                div {
                  // width: 25%;
                  flex: 1;
                  text-align: center;
                  line-height: 36px;
                  font-size: 14px;
                  cursor: pointer;
                }
              }
              .table_line{
                border-top: 1px dashed #ccc;
              }
              .teble_title_3, .table_line_3 {
                display: flex;
                height: 36px;
                border-bottom: 1px solid #eaeaea;
                div {
                  width: 33.3%;
                  text-align: center;
                  line-height: 36px;
                  border-left: 1px solid #eaeaea;
                  font-size: 14px;
                }
                div:last-child {
                  border-right: 1px solid #eaeaea;
                }
              }
              .supply_detail {
                margin-top: 20px;
                border-top: 1px solid #ccc;
                .detail_line {
                  display: flex;
                  height: 36px;
                  span {
                    width: 33%;
                    line-height: 36px;;
                    color: #999;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  p {
                    line-height: 36px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    width: 100%;
                    border: none;
                    padding: 0;
                    color: #999;
                    background: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
    .retaled {
      .related_tab {
        display: none;
        ul {
          display: flex;
          width: 95%;
          margin: 0 auto;
          border-bottom: 1px solid #eee;
          li {
            font-size: 14px;
            padding: 0 20px;
            cursor: pointer;
            line-height: 50px;
          }
        }
      }
      .related_list {
        .related_item {
          width: 100%;
          margin-top: 30px;
          min-height: 80px;
          .item_title {
            height: 30px;
            line-height: 30px;
            cursor: visible;
            position: relative;
            .title_symbol {
              width: 24px;
              height: 24px;
              position: absolute;
              left: -13px;
              top: 5px;
              background: #d1d8f4;
              border-radius: 50%;
              div {
                width: 13px;
                height: 13px;;
                background: #415de3;
                border-radius: 50%;
                margin: 5px auto;
              }
            }
            span {
              font-size: 14px;
              margin: 0 10px;
            }
            span:nth-child(2) {
              font-weight: bold;
              font-size: 18px;
              color: #333;
              margin-left: 30px;
            }
            span:nth-child(3) {
              // padding: 0px 20px;
              width: 160px;
              text-align: center;
              font-size: 12px;
              border-radius: 3px;
              // background: #0099FF;
              background: #fff;
              border: 1px solid #cccccc;
              border-left: none;
              cursor: pointer;
              // color: #fff;
              position: absolute;
              // right: 0px;
              left: -10px;
              top: 40px;
              &:hover{
                background: #0099FF;
                color: #fff;
                border-color: #0099FF;
              }
            }
          }
          .item_info {
            margin-top: 20px;
            width: 100%;
            .item_sec_title {
              padding: 15px 40px;
              line-height: 30px;
              font-size: 14px;
              color: #415de3;
              border-bottom: 1px solid #ccc;
              span {
                font-weight: bold;
              }
            }
            .item_card {
              border: 1px solid #ccc;
              border-left: none;
              background: #fff;
              // border-bottom: 1px solid #eee;
              padding-bottom: 20px;
              margin-bottom: 20px;
              position: relative;//为每个新增按钮的定位
              .c_add_new_btn{
                position: absolute;
                right: 10px;
                top: 17px;
                height: 30px;
                line-height: 30px;
                width: 160px;
                text-align: center;
                font-size: 12px;
                border-radius: 3px;
                background: #fff;
                border: 1px solid #cccccc;
                cursor: pointer;
                &:hover{
                  background: #0099FF;
                  color: #fff;
                  border-color: #0099FF;
                }
              }
            }
            .item_btn {
              font-size: 14px;
              border-bottom:1px solid #ccc;
              margin-top: 10px;
              span:first-child {
                color: #415de3;
                border-bottom:4px solid #415de3;
              }
              span:last-child{
                color: #415de3;
                border-bottom:4px solid #415de3;
                margin-left: 20px;
              }
              span {
                display: inline-block;
                padding: 10px 34px;
                cursor: pointer;
              }
            }
            .item_table {
              width:100%;
              // border-top: 1px solid #ccc;
              display: inline-block;
              color: #343536;
              p {
                width: 100%;
                // padding: 0 15px;
                font-size: 14px;
                color: #999;
                height: 50px;
                line-height: 50px;
                padding: 0 15px;
                // border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                background: #f4f4f4;
                display: flex;
                // justify-content: space-between;
                span {
                  color: #000;
                  font-weight: bolder;
                }
                .timestamp {
                  color: #ea544a;
                  margin-right: 100px;
                  font-weight: bolder;
                }
              }
              .teble_title {
                display: flex;
                align-items: center;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                margin: 0 50px;
                div {
                  flex:1;
                  text-align: center;
                }
                div.log_title :last-of-type{
                  width: 320px;
                }
              }
              .table_line {
                display: flex;
                min-height: 40px;
                font-size: 14px;
                margin: 0 50px;
                border-top: 1px dashed #ccc;
                div {
                  min-height: 40px;
                  line-height: 40px;
                  flex:1;
                  text-align: center;
                  cursor: pointer;
                }
                a {
                  color: #eb6100;
                }
              }
            }
            .item_no_table {
              height: 60px;
              line-height: 60px;
              color: #999;
              text-align: center;
            }
            .item_detail {
              padding: 0 50px;
              border-top: 1px solid #ccc;
              padding-top: 10px;
              color: #999;
              .detail_line {
                font-size: 14px;
                line-height: 28px;
                span{
                  display: inline-block;
                  width: 32%;
                }
                .detail_time {
                  margin-left: 0 15px;
                  color: #999;
                }
                p {
                  padding: 0;
                  color: #999;
                  background: #fff;
                  padding: 0;
                  border: none;
                }
              }
            }
            .show_suppy_wrap {
              padding: 0 50px;
              .show_supply_title {
                 line-height: 36px;
                color: #415de3;
                border-bottom: 1px solid #eaeaea;
                font-size: 14px;
              }
              .supply_list {
                // padding: 0 20px;
                .supply_table {
                  margin: 20px 0;
                  p.supply_btn {
                    border-bottom: 1px solid #ccc;
                    line-height: 20px;
                    padding: 0;
                    display: block;
                    padding: 10px 0px;
                    height: auto;
                    background: #fff;
                    span:first-child, span:last-child {
                      padding: 10px 20px;
                      color: #415de3;
                      border-bottom: 2px solid #415de3;
                      margin-right: 10px;
                      cursor: pointer;
                      font-weight: 200;
                    }
                  }
                  p.supply_btn+p{
                    line-height: 50px;
                    height: 50px;
                    background: #f4f4f4;
                  }
                  p {
                    padding: 0 20px;
                    border-bottom: 1px solid #eaeaea;
                    line-height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;
                    span:first-child {
                      color: #ea544a;
                      margin-right: 100px;
                      font-weight: bolder;
                    }
                  }
                  .teble_title, .table_line {
                    display: flex;
                    height: 44px;
                    div {
                      // width: 25%;
                      flex: 1;
                      text-align: center;
                      line-height: 36px;
                      font-size: 14px;
                      cursor: pointer;
                    }
                  }
                  .table_line{
                    border-top: 1px dashed #ccc;
                  }
                  .teble_title_3, .table_line_3 {
                    display: flex;
                    height: 36px;
                    border-bottom: 1px solid #eaeaea;
                    div {
                      width: 33.3%;
                      text-align: center;
                      line-height: 36px;
                      border-left: 1px solid #eaeaea;
                      font-size: 14px;
                    }
                    div:last-child {
                      border-right: 1px solid #eaeaea;
                    }
                  }
                  .supply_detail {
                    margin-top: 20px;
                    border-top: 1px solid #ccc;
                    .detail_line {
                      display: flex;
                      height: 36px;
                      span {
                        width: 33%;
                        line-height: 36px;
                        color: #999;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      }
                      p {
                        line-height: 36px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14px;
                        width: 100%;
                        border: none;
                        padding: 0;
                        color: #999;
                        background: #fff;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .echarts_list {
    // text-align: center;
    margin-top: 20px;
    button {
      width: 140px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #eb6100;
      color: #eb6100;
      outline: none;
      border-radius: 5px;
      background: #fff;
      margin: 50px;
      margin-bottom: 0;
    }
  }
  .supply_title {
    color: #eb6100;
    height: 40px;
    line-height:  40px;
    padding: 0 20px;
    border: 1px solid #eaeaea;
    border-top: none;
    font-size: 14px;
  }
  .item_title1 {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    line-height: 48px;
    background: #f4f4f4;
    height:48px;
    padding: 0 15px;
  }
  .sup_title {
    height: 40px;
    line-height: 40px;
    padding: 0 50px;
    border-top: none;
    font-size: 14px;
    color: #eb6100;
    border-bottom: 1px solid #dbdbdb;
    span{
      display: inline-block;
      height: 40px;
      padding: 0 34px;
      border-bottom: 4px solid #eb6100;
    }
  }
.chain_nav {
  position: fixed;
  top: 160px;
  width: 300px;
  background: #fff;
  height: 560px;
  z-index: 96;
  box-shadow: 0px 0px 20px #fafafa;
  transition: all .2s ease-in;
  overflow: hidden;
  .chain_nav_inner {
    width: 320px;
    height: 560px;
  }
}
</style>
<style >
  .view_chain>.el-dialog__wrapper {
    z-index: 2019 !important;
  }
</style>