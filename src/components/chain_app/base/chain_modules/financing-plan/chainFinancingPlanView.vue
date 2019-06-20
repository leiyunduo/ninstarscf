<template>
  <div class="chain-order">
    <div class="chain-order__box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="chain-order__box__wrap">
        <div class="top-nav">
          <location :location="location"></location>
        </div>
        <div v-if="navIndex === 0">
          <financing-plan-create :contractId="contract_id" :chainType="chain_type" :chainId="chain_id"/>
        </div>
        <div v-else-if="navIndex === 1">
          <financing-plan-edit :financingPlanId="financing_plan_id" :chainId="chain_id" :chainType="chain_type"/>
        </div>
        <div v-else-if="navIndex === 2">
          <financing-plan-modify :financingPlanId="financing_plan_id" :contractId="contract_id" :chainId="chain_id" :chainType="chain_type"/>
        </div>
        <div v-else>
          <financing-plan-info @toEdit='changeView' :financingPlanId="financing_plan_id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
import FinancingPlanEdit from './chainFinancingPlanEdit'
import FinancingPlanCreate from './chainFinancingPlanCreate'
import FinancingPlanModify from './chainFinancingPlanModify'
import FinancingPlanInfo from './chainFinancingPlanInfo'
export default {
  name: '',
  data () {
    return {
      step: {selIndex: 1}
    }
  },
  components: {
    // AppNav, 
    Location, FinancingPlanEdit, FinancingPlanModify, FinancingPlanInfo, FinancingPlanCreate
  },
  mounted () {
    if (this.$route.query.claim) {
      this.step.selIndex = 2
    } else {
      this.step.selIndex = 1
    }
  },
  beforeCreate () {
    this.contract_id = this.$route.query.contract_id
    this.financing_plan_id = this.$route.query.financing_plan_id
    this.chain_id = this.$route.query.chain_id
    this.chain_type = this.$route.query.chain_type
    this.navIndex = Number(this.$route.query.navIndex)
    this.confirmId = this.$route.query.confirmId
    this.idList = this.$route.query.idList
    let _url = '' , _title = ''
    if (this.chain_id) {
      _url = (this.chain_type === `1`) ? '/chain_app/receive_chain?id='+this.chain_id : '/chain_app/payment_chain?id='+this.chain_id
      _title = '融资计划'
    } else {
      _url = '/chain_app/cooperation_chain?id=' + this.contract_id + '&confirmId=' + this.confirmId + '&idList=' + this.idList
      _title = '融资计划协同确认'
    }
    if (this.$route.query.claim) {
      let url = '/claim_app/cooperation_chain?id=' + this.contract_id + '&claim=1' + '&idList=' + this.idList
      this.location = [
        {
          title: '我的债权债务',
          url: '/claim_app'
        },
        {
          title: '协同确认',
          url: url
        },
        {
          title: '详情'
        }
      ]
    } else {
      this.location = [
        {
          title: this.chain_id ? '链式记账' : '协同展示',
          url: _url
        },
        {
          title: _title
        }
      ]
    }
  },
  methods: {
    changeView (e) {
      if (e.isEdit === '1') this.navIndex = 0
      // 窗口置顶
      //this.$scrollToTop()
    }
  }
}
</script>

<style lang='less'>
input:disabled, textarea:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}
.chain-text {
  color: #666;
  margin-left: 10px;
}
.chain-required-blue {
  color: #0c8dff;
  margin-top: 4px
}
.chain-required-orange {
  color: #eb6100;
  margin-top: 4px;
  position: relative !important;
}
.chain_flex {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  flex-wrap: wrap
}
.chain-width-r2 {
  width: 20%;
}
.chain-width-r8 {
  width: 80%;
}
.chain-order {
  height: 100%;
  .chain-order__box {
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
    .chain-order__box__wrap {
      width: 100%;
      background: #f4f8f9;
      // .top-nav {
      //   height: 60px;
      //   background: #ffffff;
      //   box-shadow: 2px 0 4px #ddd;
      // }
      .chain-order__inner {
        margin: 21px 71px 30px 19px;
        .chain-order__item {
          &>.nav_bar {
            margin-top: 20px;
            .order_nav {
              background:#ffffff;
              width:100%;
              height:42px;
              ul {
                display: flex;
                flex-direction: row;
                border-bottom: 3px solid #e87626;
                li {
                  min-width: 120px;
                  padding: 0 8px;
                  text-align: center;
                  height: 42px;
                  cursor: pointer;
                  p {
                    font-family: PingFangSC-Semibold;
                    font-size:14px;
                    color:#999999;
                    letter-spacing: 0;
                    text-align:center;
                    font-weight: bold;
                    padding-top: 11px;
                  }
                }
                .active_li {
                  background:#e87626;
                  p {
                    color: #fff;
                  }
                }
              }
            }
          }
          background: #ffffff;
          margin: 20px 0;
          overflow: hidden;
          &.chain-table_padding {
            padding-bottom: 25px;
          }
          &.chain_bg_default {
            background: inherit
          }
          .chain-order__title {
            margin: 0px 40px 0 40px;
            height: 60px;
            border-bottom: 1px solid #e1e6f0;
            display: flex;
            align-items: flex-end;
            &.hide-line {
              border: none
            }
            span {
              display: inline-block;
              padding-left: 8px;
              color: #333;
              font-weight: bolder;
              border-left: 5px solid #eb6100;
              margin-bottom: 5px;  
            }
          }
          .chain-order__body {
            margin: 10px 40px 0 40px;
            .chain-order__form {
              .chain-order__form__group {
                width: 50%;
                &.chain-width-r2 {
                  width: 20%; 
                }
                &.chain-width-r7 {
                  width: 70%;
                }
                &:nth-of-type(2) {
                  justify-content: flex-start;
                }
                &.chain-center {
                  margin: 0 auto;
                  &>.chain-order__form__row {
                    width: 400px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 30px; 
                  }
                }
              }
              .chain-order__form__row {
                margin: 15px 15px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                &.chain_flex_end {
                  display: flex;
                  justify-content: flex-end;
                  .chain-text {
                    color: #666;
                  }
                  strong {
                    margin-right: 15px
                  }
                }
                label {
                  &.maxLength {
                    width: 120px;
                  }
                  width: 90px;
                  margin: 0 10px;
                  font-size: 14px;
                  font-weight: bold;
                  white-space: nowrap
                }
                .el-input__inner {
                  padding: 0 31px;
                }
                input {
                  border:1px solid #e1e6f0;
                  // box-shadow:0 0 7px 0 #e1e6f0;
                  border-radius:2px;
                  width: 220px;
                  color: #666;
                  padding: 4px 10px;
                  outline: none;
                }
                input:focus {
                  transition: border-color .1s cubic-bezier(.645,.045,.355,1);
                  border-color: #409eff
                }
                .chain-operate {
                  margin-left: 30px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #eb6100;
                  cursor: pointer;
                  text-decoration: underline;
                }
                a {
                  margin-left: 10px;
                  font-size: 14px;
                  font-weight: bold;
                  text-decoration: underline;
                  cursor: pointer;
                  &:hover {
                    color: #eb6100;
                  }
                }
              }
            }
            .chain-textarea {
              max-width: 100%;
              min-width: 100%;
              min-height: 120px;
              max-height: 120px;
              border-radius: 2px;
              padding: 5px 10px;
              border:1px solid #e1e6f0;
            }
            .chain-btn__group {
              display: flex;
              width: 80%;
              margin: 0 auto;
              justify-content: center;
              .chain-btn {
                width: 120px;
                height: 36px;
                line-height: 36px;  
                text-align: center;
                border-radius: 4px;
                font-size: 14px; 
                cursor: pointer;
                border: 1px solid #e1e6f0;
                margin: 20px 36px;
                &.chain-btn_default {
                  border: 1px solid #eb6100;
                  color: #eb6100
                }
                &.chain-btn_active {
                  border: 1px solid #eb6100;
                  background: #eb6100;
                  color: #ffffff;
                }
              }
            } 
          }
        }
      }
    }
  }
}
</style>


