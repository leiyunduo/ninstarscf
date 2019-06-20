<template>
  <div class="view_chain">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="chain_nav_top" v-if="element">
      <div class="topLocation">
        <location :location="location"></location>
      </div>
      <div class="toVerify" v-if='claim !== 1'>
        <div class="cooperation">
          <label for="">
            <span>交易公司：</span>
            <span>{{partCompany.company_name}}</span>
          </label>
          <label for="">
            <span>提交时间：</span>
            <span>{{partCompany.submit_time}}</span>
          </label>
          <label for="">
            <span>确认状态：</span>
            <span class="nopass">{{Number(partCompany.status) === 0 ? '未确认' : (Number(partCompany.status) === 1 ? '同意' : '拒绝')}}</span>
          </label>
        </div>
        <div class="operation" v-show="!disable_aprove">
          <div class="oper-btn oper-btn_reject" @click="onReject()"><span>拒绝</span></div>
          <div class="oper-btn oper-btn_confirm" @click="onConfirm()"><span>确认</span></div>
        </div>
      </div>
    </div>
    <div class="line_detail">
      <div class="middleLocation">
        <location :location="location"></location>
      </div>
      <div class="toVerify" v-if='claim !== 1'>
        <div class="cooperation">
          <label for="">
            <span>交易公司：</span>
            <span>{{partCompany.company_name}}</span>
          </label>
          <label for="">
            <span>提交时间：</span>
            <span>{{partCompany.submit_time}}</span>
          </label>
          <label for="">
            <span>确认状态：</span>
            <span class="nopass">{{Number(partCompany.status) === 0 ? '未确认' : (Number(partCompany.status) === 1 ? '同意' : '拒绝')}}</span>
          </label>
        </div>
        <div class="operation" v-show="!disable_aprove">
          <div class="oper-btn oper-btn_reject" @click="onReject()"><span>拒绝</span></div>
          <div class="oper-btn oper-btn_confirm" @click="onConfirm()"><span>确认</span></div>
        </div>
      </div>
      <div class="chain_list">
        <div class="chain-box">
          <div class="chain-box__item">
            <div class="chain-box__item__title">
              <span class="chain-box_show">合作企业确认</span>
              <img src="static/img/chain/chaindown1.png" alt="">
            </div>
            <div class="chain-box__item__content">
              <div class="chain-container" :class="(userType === 'serviceprovider' ||  userType === 'serviceperson') ? 'border_hide' : ''">
                <div class="first_view" v-show="userType === 'business'">
                  <div class="first_chain">
                    <div class="chain_title">
                      <div class="symbol_large_orange"><div></div></div>
                      <span>项目登记</span>
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
                                  <span>未及时记账</span>
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
                    <contract  :type="`1`" :partCompany="partCompany.company_name" :idList="id_list" :confirmId="cooperation_id" :id='contract_id'/>
                  </div>
                </div>
                <div class="second_view">
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_orange"><div></div></div>
                      <span>{{(userType === 'serviceprovider' ||  userType === 'serviceperson') === 'serviceprovider' ? '仓储及物流': '电子订单'}}</span>
                    </div>
                    <div v-if="isService">
                      <service :type="`1`" :confirmId='cooperation_id' :idList="id_list" :id='contract_id' @changOrderId="updataOrderId" />
                    </div>
                    <div v-else>
                      <order :type="`1`" :confirmId='cooperation_id' :idList="id_list" :id='contract_id' @changOrderId="updataOrderId"/>
                    </div>
                  </div>
                  <div class="second_chain" v-show="userType === 'business'">
                    <div class="chain_title">
                      <div class="symbol_middle_orange"><div></div></div>
                      <span>订单结算</span>
                    </div>
                    <settlement  :type="`1`" :id='contract_id' :confirmId='cooperation_id' :idList="id_list" :orderId="orderIds.receive"/>
                  </div>
                  <div class="second_chain" v-show="userType === 'business'">
                    <div class="chain_title">
                      <div class="symbol_middle_orange"><div></div></div>
                      <span>合同结算</span>
                    </div>
                    <settlement-contract  :type="`1`" :id='contract_id'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-wrap-cooper" v-show="isShowModal">
            <div class="modal-inner-cooper">
              <div class="modal__box-cooper">
                <div class="modal-title-cooper">
                  <span>为合作企业确认内容</span>
                </div>
                <div class="modal-body-cooper confirm">
                  <span class="desc_text">
                    确认说明：您好（{{partCompany.self_name}}），感谢您为合作企业的记账内容进行确认，确认后将增加您合作企业的记账信用。同时平台将会记录您的本次操作，当合作企业（{{partCompany.company_name}}）进行融资申请时相关的金融、助贷等服务机构将会看到您的确认信息，请谨慎您的操作。
                  </span>
                </div>
              </div>
              <div class="modal__box-cooper">
                <div class="modal-footer-cooper">
                  <div class="modal-btn modal-btn_reset" @click="modalReset()"><span>取消</span></div>
                  <div class="modal-btn modal-btn_confirm" @click="modalConfirm(1)"><span>确认</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-wrap-cooper" v-show="isShowRejectModal">
            <div class="modal-inner-cooper reject_reason">
              <div class="modal__box-cooper">
                <div class="modal-title-cooper reject">
                  <span>拒绝原因（确认后您的拒绝原因将会发送给合作企业）</span>
                </div>
                <div class="modal-body-cooper reject">
                  <textarea v-model="rejectReason"></textarea>
                </div>
              </div>
              <div class="modal__box-cooper">
                <div class="modal-footer-cooper">
                  <div class="modal-btn modal-btn_reset" @click="modalReset()"><span>取消</span></div>
                  <div class="modal-btn modal-btn_confirm" @click="modalConfirm(2)"><span>确认</span></div>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import appNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
import Contract from '@/components/chain_app/base/chain_modules/confirm_contract'
import Order from '@/components/chain_app/base/chain_modules/confirm_order'
import Service from '@/components/chain_app/base/chain_modules/confirm_service'
import Settlement from '@/components/chain_app/base/chain_modules/confirm_settlement'
import SettlementContract from '@/components/chain_app/base/chain_modules/confirm_settlement_contract'
import 'vue-happy-scroll/docs/happy-scroll.css'
import { setTimeout } from 'timers';
export default {
  name: 'chain_line',
  components: {
    // appNav, 
    Location, Contract, Order, Settlement, SettlementContract, Service
  },
  data () {
    return {
      father: {
        selIndex: 1
      },
      // 顶部定位条
      element: false,
      elementScorllTop: '',
      orderIds: {
        receive: '',
        payment: ''
      },
      isShowModal: false,
      isShowRejectModal: false,
      userTypeArr: ['institution', 'serviceprovider', 'person', 'institutionperson', 'serviceperson'],
      userType: '',
      isService: false,
      partCompany: {
        contract_name: '',
        company_name: '',
        confirm_type: '',
        status: ''
      },
      rejectReason: '',
      disable_aprove: true,
      claim: ''
    }
  },
  methods: {
    getConfirmById (id) {
      this.$ajax.get(`/api/chain/co_confirm/${id}`).then(res => {
        if (res.status === 200) {   
          this.partCompany = res.data
          if (Number(res.data.status) !== 0) this.disable_aprove = true
          else this.disable_aprove = false
        }
      })
    },
    modalReset () {
      this.isShowModal = false
      this.isShowRejectModal = false
    },
    modalConfirm (type) {
      if (type === 2 && !this.rejectReason) {
        this.$message.error('请填写拒绝原因')
        return
      }
      this.$ajax.patch(`/api/chain/co_confirm/${this.cooperation_id}/choices/`, {'choices': String(type)}).then(res => {
        if (res.status === 200) {
          this.getConfirmById(this.cooperation_id)
        }
      })
      this.isShowModal = false
      this.isShowRejectModal = false
    },
    onConfirm () {
      this.isShowModal = true
    },
    onReject () {
      this.isShowRejectModal = true
    },
    cooperation () {
      this.isShowModal = true
    },
    handleScroll: function () {
      var that = this
      that.elementScorllTop = document.documentElement.scrollTop || document.body.scrollTop
      that.element = (that.elementScorllTop > 75) ? true : false
    },
    updataOrderId: function (e) {
      e.type === `1` ? this.orderIds.receive = e.id : this.orderIds.payment = e.id
    }
  },
  beforeCreate: function () {
    var that = this
    if (that.$route.query.id) {
      that.contract_id = that.$route.query.id
      that.cooperation_id = that.$route.query.confirmId
      that.id_list = that.$route.query.idList
    }
    that.claim = Number(that.$route.query.claim)
    if (that.claim === 1) {
      that.location = [
        {title: '我的债权/债务', url: '/claim_app'},
        {title: '协同确认'}
      ]
    } else {
      let type = (localStorage.role === 'serviceprovider' ||  localStorage.role === 'serviceperson') ? '0' : '4'
      that.location = [
        {title: '协同展示', url: '/chain_app/chain_main?type=' + type},
        {title: '协同确认'}
      ]
    }
    this.userType = localStorage.role
  },
  mounted: function () {
    var that = this
    that.claim = Number(that.$route.query.claim)
    this.father.selIndex = (localStorage.role === 'serviceprovider' || localStorage.role === 'serviceperson') ? 0 : 1
    window.addEventListener('scroll', this.handleScroll)
    window.onscroll = function () {
      that.handleScroll()
    }
    this.userType = localStorage.role
    if (this.userType === 'serviceprovider') {
      this.isService = true
    }
    this.getConfirmById(that.cooperation_id)
  }
}
</script>

<style lang="less">
@theme_orange: #eb6100;
@theme_blue: #0c8dff;
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
  .modal-wrap-cooper {
    position: fixed;
    top: 0;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 2018;
    background-color: rgba(0, 0, 0, .3); 
    &>.modal-inner-cooper {
      margin: 0 auto;
      width: 1080px;
      margin-top: 200px;
      bottom: 0;
      padding: 20px;
      background: #fff;
      border: 1px solid #e1e6f0;
      border-radius: 6px;
      // &.reject_reason {
      //   background: #fff;
      // } 
      .modal__box-cooper {
        .modal-title-cooper {   
          color: #333;
          background: #fff;
          padding: 10px;
          // &.reject {
          //   background: #fff
          // }
          span {
            font-size: 18px;
            font-weight: bolder;
          }
        }
        .modal-body-cooper {
          border-radius: 8px;
          border: none;
          padding: 10px;
          &.reject {
            background: inherit;
          }
          &.confirm {
            line-height: 28px;
            text-indent: 2em;
            background: inherit;
            .desc_text {
              font-weight: bolder;
            }
          }
          textarea {
            width: 100%;
            height: 140px;
            border: 1px solid #e4e4e4;
            border-radius: 8px;
            padding: 10px 15px 0 15px;
            max-width: 999px;
          }
          .modal-menu {
            border-top: 1px dashed #e4e4e4;
            &:first-of-type {
              border: none;
            }
            .modal-menu__title {
              margin: 5px 0px;
            }
            .modal-menu__item {
              display: flex;
              flex-wrap: wrap;
              .item_span {
                font-size: 14px;
                color: #eb6100;
                margin: 5px 15px; 
              }
              .modal-form {
                padding: 0 10px 10px 10px;
                margin-right: 20px;
                .modal-form-item {
                  margin: 5px 0;
                  &>label {
                    width: 80px;
                    display: inline-block;
                    &.services {
                      vertical-align: top;
                    }
                  }
                  .modal-form-item__content {
                    display: inline-block;
                    .modal-checkbox-group {
                      .modal-checkbox {
                        font-size: 14px;
                        input[type="checkbox"] {
                          vertical-align: middle;
                          transform: scale(1.4);
                          margin: 5px 6px 5px 0;
                        }
                        span.company-name {
                          display: inline-block;
                          width: 210px;
                        }
                        .status_confirm::after {
                          content: '';
                          display: inline-block;
                          background: url('../../../../static/img/join01.png');
                          width: 17px;
                          height: 19px;
                          vertical-align: text-bottom;
                          margin: 0 8px 0 5px;
                        }
                        .status_nopass::after {
                          content: '';
                          display: inline-block;
                          background: url('../../../../static/img/join03.png');
                          width: 16px;
                          height: 19px;
                          vertical-align: text-bottom;
                          margin: 0 8px 0 5px;
                        }
                        span.toInvite {
                          color: #eb6100;
                          text-decoration: underline;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .modal-footer-cooper {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          .modal-btn {
            margin: 0 30px;
            padding: 4px 25px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            &.modal-btn_reset {
              border: 1px solid #eb6100;
              color: #eb6100
            }
            &.modal-btn_confirm {
              border: 1px solid #eb6100;
              background: #eb6100;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
.chain-container {
  margin: 0 auto;
  min-height: 100%;
  // border-left: 1px dashed #979797;
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
        div.default:last-child {
          margin-left: 25px
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
          }
          .flag {
            width: 20px;
            height: 20px;
            margin-left: 5px;
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
          .flag {
            width: 20px;
            height: 20px;
            margin-left: 5px;
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
.-shrink {
  .toVerify {
    width: calc(100% - 82px) !important;
    transition: width .4s ease;
  }
}
.view_chain {
  background: #fafafa;
  display: flex;
  //padding-top: 70px;
  min-height: 100%;
  margin: 0 auto;
  .c_slide_container:hover+.chain_nav_top, .c_slide_container:hover+.line_detail{
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .chain_nav_top {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    .topLocation {
      padding-left: 50px;
      img {
        width: 22px;
        vertical-align: middle;
      }
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
    // height: 230px;
    height: 60px;
    background: #fff;
    z-index: 1006;
    // border-bottom: 1px solid #eaeaea;
    -moz-box-shadow:1px 4px 5px #EAEAEA;
    -webkit-box-shadow:1px 4px 5px #EAEAEA;
    box-shadow:1px 4px 5px #EAEAEA;
    .toVerify {
      padding: 25px 40px;
      position: fixed;
      width: calc(100% - 262px);
      right: 0;
      top: 64px;
      display: flex;
      background: #ffffff;
      justify-content: space-between;
      border-bottom: 1px solid #e1e6f0;
      .cooperation {
        display: flex;
        &>label {
          margin: 0 60px;
          font-size: 16px;
          font-weight: bolder;
          color: #666;
          span {
            font-weight: bolder;
            &.nopass {
              color: #f48537;
            }
          }
        }
      }
      .operation {
        .oper-btn {
          margin: 0 30px;
          padding: 4px 25px;
          border-radius: 4px;
          font-size: 14px;
          display: inline-block;
          cursor: pointer;
          &.oper-btn_reject {
            border: 1px solid #eb6100;
            color: #eb6100
          }
          &.oper-btn_confirm {
            border: 1px solid #eb6100;
            background: #eb6100;
            color: #fff;
          }
        }
      }
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
  .c_order_info {
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
  .line_detail {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    width: 100%;
    background: #f5f7f8;
    min-height: 100%;
    .middleLocation {
      background: #fff;
      padding-left: 50px;
      img {
        width: 22px;
        vertical-align: middle
      }
    };
    .toVerify {
      padding: 25px 40px;
      display: flex;
      background: #ffffff;
      justify-content: space-between;
      border-bottom: 1px solid #e1e6f0;
      .cooperation {
        display: flex;
        &>label {
          margin: 0 60px;
          font-size: 16px;
          font-weight: bolder;
          color: #666;
          span {
            font-weight: bolder;
            &.nopass {
              color: #f48537;
            }
          }
        }
      }
      .operation {
        .oper-btn {
          margin: 0 30px;
          padding: 4px 25px;
          border-radius: 4px;
          font-size: 14px;
          display: inline-block;
          cursor: pointer;
          &.oper-btn_reject {
            border: 1px solid #eb6100;
            color: #eb6100
          }
          &.oper-btn_confirm {
            border: 1px solid #eb6100;
            background: #eb6100;
            color: #fff;
          }
        }
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
    .chainNavLine {
      position: relative;
      min-height: 120px;
      background: #fff;
    }
  }
  .view_nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background:#fff;
    height:63px;
    padding: 25px 30px 0;
    position: relative;
    z-index: 10;
    li {
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
    padding: 0 50px;
    position: relative;
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
    .ticket {
      &>span {
        color: #666;
        font-size: 14px;
      }
      height: 105px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #eaeaea;
      &.bar {
        border: 0
      }
      .ticket_item {
        width: 285px;
        height: 50px;
        margin: 10px 20px;
        background: url('../../../../static/img/tickets/stuff.png') center no-repeat;
        background-size: 100%;
        img {
          height: 77px;
          position: absolute;
          margin: -15px 0 0 8px;
        }
        .ticket_text {
          height: 40px;
          line-height: 40px;
          margin-top: 5px;
          color: #666;
          font-size: 14px;
          display: flex;
          justify-content: flex-end;
          .ticket_value {
            margin-right: 10px;
            width: 160px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
          }
          .ticket_num {
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
    .card_list {
      .slide_nav {
        padding: 0 50px;
        line-height: 30px;
        font-size: 14px;
      }
      .card_item {
        padding-top: 30px;
        width: 100%;
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
        margin-top: 20px;
        width: 100%;
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
          border-bottom: 1px solid #ccc;
          font-size: 14px;
          margin-top: 20px;
          span:first-child {
            color: #eb6100;
            border-bottom:4px solid #eb6100;
          }
          span:last-child{
            border-right:none;
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
          // padding: 20px 50px;
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
            p {
              padding: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
                span:first-child, span:last-child {
                  padding: 10px 20px;
                  color: #eb6100;
                  border-bottom: 2px solid #eb6100;
                  margin-right: 10px;
                  cursor: pointer;
                  font-weight: 200;
                }
              }
              p {
                padding: 0 20px;
                border-bottom: 1px solid #eaeaea;
                line-height: 36px;
                display: flex;
                align-items: center;
                // justify-content: space-between;
                font-size: 14px;
                span:first-child {
                  color: #ea544a;
                  margin-right: 100px;
                  font-weight: bolder;
                }
              }
              .supply_btn+p{
                background: #f4f4f4;
                line-height: 48px;
                border-bottom: 1px solid #ccc;
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
              .table_line, .table_line_3{
                border-top: 1px dashed #ccc;
              }
              .teble_title_3, .table_line_3 {
                display: flex;
                height: 44px;
                div {
                  width: 33.3%;
                  text-align: center;
                  line-height: 44px;
                  font-size: 14px;
                }
              }
              .supply_detail {
                border-top: 1px solid #ccc;
                // padding: 0 50px;
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
                    border-bottom: none;
                    padding: 0;
                    color: #999;
                  }
                }
              }
            }
          }
        }
      }
    }
    .retaled {
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
                border-bottom: 1px solid #eaeaea;
                line-height: 50px;
                height: 50px;
                display: block;
                height: auto;
                span:first-child, span:last-child {
                  height: 50px;
                  display: inline-block;
                  padding: 0px 20px;
                  color: #415de3;
                  border-bottom: 2px solid #415de3;
                  margin-right: 10px;
                  cursor: pointer;
                  font-weight: 200;
                }
              }
              .supply_btn+p{
                background: #f4f4f4;
                line-height: 48px;
                border-bottom: 1px solid #ccc;
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
                height: 40px;
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
                // padding: 0 50px;
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
                    border-bottom: none;
                    padding: 0;
                    color: #999;
                  }
                }
              }
            }
          }
        }
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
          margin-top: 30px;
          width: 100%;
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
              margin-left: 30px;
              color: #333;
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
            // box-shadow: 2px 0px 6px #ccc;
            margin-top: 20px;
            width: 100%;
            // padding: 15px;
            .item_sec_title {
              padding: 15px 40px;
              line-height: 30px;
              font-size: 14px;
              color: #415de3;
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
              margin-top: 10px;
              border-bottom: 1px solid #ccc;
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
                padding: 15px 34px;
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
              }
            }
          }
        }
      }
    }
  }
  .echarts_list {
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
}
</style>
