<template>
  <div class="chain-deposit">
    <div class="chain-deposit__box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="chain-deposit__box__wrap">
        <div class="top-nav" v-if="!(role === 'institution' || role ==='institutionperson')">
          <location :location="location"></location>
        </div>
        <div>
          <chain-deposit-info @toEdit='changeView' :depositId="deposit_id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
import chainDepositInfo from './chainDepositInfo'
export default {
  name: 'chainDepositView',
  data () {
    return {
      step: {selIndex: 1}
    }
  },
  components: {
    // AppNav, 
    Location, chainDepositInfo
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
    this.order_id = this.$route.query.order_id
    this.deposit_id = this.$route.query.deposit_id
    this.chain_id = this.$route.query.chain_id
    this.chain_type = this.$route.query.chain_type
    this.navIndex = Number(this.$route.query.navIndex)
    this.confirmId = this.$route.query.confirmId
    this.role = localStorage.role
    // this.idList = this.$route.query.idList
    let _url = "", _title = '订金'
    _url = Number(this.chain_type) === 1 ? '/credit_app/chain_detail?id=' + this.chain_id : '/credit_app/chain_info?id='+this.chain_id
    this.location = [
      {
        title: '企业记账',
        url: _url
      },
      {
        title: _title
      }
    ]
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
  background-color: #fff;
  color: #666;
  cursor: not-allowed;
}
.chain-tips_warning {
  color: red;
  margin-left: 10px;
  font-size: 14px;  
}
.el-select {
  width: 220px !important;
}
.chain-required-blue {
  color: #0c8dff;
  margin-top: 4px
}
.chain-required-orange {
  color: #eb6100;
  margin-top: 3px;
  position: absolute;
}
.chain_flex {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  flex-wrap: wrap
}
.chain-deposit {
  height: 100%;
  .chain-deposit__box {
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
    .chain-deposit__box__wrap {
      width: 100%;
      background: #f4f8f9;
      // .top-nav {
      //   height: 60px;
      //   background: #ffffff;
      //   box-shadow: 2px 0 4px #ddd;
      // }
      .chain-deposit__inner {
        margin: 21px 71px 30px 19px;
        .chain-deposit__item {
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
                    letter-spacing:0;
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
          .chain-deposit__title {
            margin: 0px 40px 0 40px;
            height: 60px;
            border-bottom: 1px solid #cccccc;
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
          .chain-deposit__body {
            margin: 10px 40px 0 40px;
            .chain-deposit__form {
              .chain-deposit__form__group {
                width: 50%;
                &.chain-width-r3 {
                  width: 33%; 
                }
                &:nth-of-type(2) {
                  justify-content: flex-start;
                }
              }
              .chain-deposit__form__row {
                margin: 15px 0;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;
                label {
                  width: 90px;
                  margin: 0 10px;
                  font-size: 14px;
                  font-weight: bold;
                  white-space: nowrap
                }
                &.chain-from_select {
                  .el-input__inner {
                    padding: 0 15px;
                  }
                }
                .el-input__inner {
                  padding: 0 31px;
                }
                input {
                  border:1px solid #e1e6f0;
                  border-radius:2px;
                  width: 220px;
                  color: #666;
                  padding: 4px 10px;
                  outline: none;
                  &.chain-box_warning {
                    transition: border-color .1s cubic-bezier(.645,.045,.355,1);
                    border-color: red
                  }
                  &.maxLength {
                    width: 270px;
                  }
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


