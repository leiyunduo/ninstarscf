<template>
  <div class="chain-contract">
    <div class="chain-contract__box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="chain-contract__box__wrap">
        <div class="top-nav">
          <location :location="location"></location>
        </div>
        <div v-if="navIndex === 0">
          <contract-warehouse-create :contractId="contract_id" :chainId="chain_id" :chainType="chain_type"/>
        </div>
        <div v-else-if="navIndex === 1">
          <contract-warehouse-edit :chainId="chain_id" :warehouseId="warehouse_id" :chainType="chain_type" />
        </div>
        <div v-else-if="navIndex === 2">
          <contract-warehouse-modify :chainId="chain_id" :contractId="contract_id" :chainType="chain_type" :warehouseId="warehouse_id"/>
        </div>
        <div v-else>
          <contract-warehouse-info :warehouseId="warehouse_id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
import ContractWarehouseEdit from './chainContractWarehouseEdit'
import ContractWarehouseModify from './chainContractWarehouseModify'
import ContractWarehouseCreate from './chainContractWarehouseCreate'
import ContractWarehouseInfo from './chainContractWarehouseInfo'
export default {
  name: 'chainContractView',
  data () {
    return {
      step: {selIndex: 1}
    }
  },
  components: {
    // AppNav, 
    Location, ContractWarehouseEdit, ContractWarehouseInfo, ContractWarehouseModify, ContractWarehouseCreate
  },
  mounted () {
    if (this.$route.query.claim) {
      this.step.selIndex = 2
    } else {
      this.step.selIndex = 1
    }
  },
  beforeCreate () {
    this.chain_id = this.$route.query.chain_id
    this.contract_id = this.$route.query.contract_id
    this.chain_type = this.$route.query.chain_type
    this.warehouse_id = this.$route.query.warehouse_id
    this.navIndex = Number(this.$route.query.navIndex)
    this.confirmId = this.$route.query.confirmId
    // this.idList = this.$route.query.idList
    let _url = "", _title = ''
    if (this.confirmId) {
      _url = '/chain_app/cooperation_chain?id=' + this.contract_id + '&confirmId=' + this.confirmId
      _title = '仓储合同确认'
    } else {
      _url = Number(this.chain_type) === 1 ? '/chain_app/receive_chain?id=' + this.chain_id : '/chain_app/payment_chain?id='+this.chain_id
      _title = '仓储合同'
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
          title: this.confirmId ? '协同展示' : '链式记账',
          url: _url
        },
        {
          title: _title
        }
      ]
    }
  }
}
</script>

<style lang='less'>
.el-date-editor .el-range-separator {
  padding: 0
}
input:disabled, textarea:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}
.add-menu {
  display: flex;
  margin-left: 20px;
  .add-menu__item {
    padding: 7px 10px;
    color: #eb6100;
    font-size: 14px;
    margin-left: -1px;
    border: 1px solid #eb6100; 
    border-bottom: 0;
    cursor: pointer;
    border-radius: 2px 2px 0 0;
    &.avtive {
      background: #eb6100;
      color: #ffffff;
      margin-left: 5px;
      border-radius: 0;
    }
    &:first-child:not(:last-child) {
      border-top-right-radius: 0;
    }
    &:last-child:not(:first-child) {
      border-top-left-radius: 0;
    }
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:hover:not(.avtive) {
      background: #eb6100;
      color: #ffffff
    }
  }
}
.chain-required-blue {
  color: #0c8dff;
  margin-top: 4px
}
.chain-required-orange {
  color: #eb6100;
  margin-top: 4px
}
.chain-btn_op_empty {
  margin-left: 20px;
  display: inline-block;
  border-radius: 60px;
  background: #333;
  font-size: 14px;
  color: #ffffff;
  padding: 2px 10px;
  cursor: pointer;
}
.chain-btn_op_active {
  margin-left: 20px;
  display: inline-block;
  border-radius: 60px;
  background: #eb6100;
  font-size: 14px;
  color: #ffffff;
  padding: 2px 10px;
  cursor: pointer;
}
.box_flex {
  display: flex;
  justify-content: center;
  margin: 0 20px
}
.chain-contract {
  height: 100%;
  .chain-contract__box {
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
    .chain-contract__box__wrap {
      width: 100%;
      background: #f4f8f9;
      // .top-nav {
      //   height: 60px;
      //   background: #ffffff;
      //   box-shadow: 2px 0 4px #ddd;
      // }
      .chain-contract__inner {
        background: #ffffff;
        margin: 21px 71px 30px 19px;
        .chain-contract__item {
          overflow: hidden;
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
          .chain-contract__title {
            margin: 10px 40px 0 40px;
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
            .chain-create-time {
              margin-left: 30px;
              font-size: 14px;
              color: #666;
              font-weight: bolder; 
              &>span {
                color: #eb6100;
                border: none;
              }
            }
          }
          .chain-contract__body {
            margin: 10px 40px 0 40px;
            .chain-contract__form {
              &.chain_flex {
                .box_flex
              }
              .chain-contract__form__group {
                width: 50%;
              }
              .chain-contract__form__row {
                margin: 15px 5px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                position: relative;
                label {
                  width: 90px;
                  margin: 0 10px;
                  font-size: 14px;
                  font-weight: bold
                }
                input {
                  margin-left: 10px;
                  border:1px solid #e1e6f0;
                  box-shadow:0 0 7px 0 #e1e6f0;
                  border-radius:2px;
                  width:248px;
                  color: #666;
                  padding: 4px 10px;
                  font-size: 14px;
                }
                .chain-operate {
                  margin-left: 30px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #eb6100;
                  cursor: pointer;
                  text-decoration: underline;
                }
                .chain-state_empty {
                  // .chain-btn_op_empty;
                  margin-left: 30px;
                  color: #999;
                  &::before {
                    content: "";
                    background: url('../../../../../../static/img/chain/unrigister.png');
                    display: inline-block;
                    margin-right: 8px;
                    width: 16px;
                    height: 16px;
                    transform: translateY(10%)
                  }
                }
                .chain-operate-invite {
                  // .chain-btn_op_active;
                  margin-left: 30px;
                  color: #66cd2e;
                  text-decoration: underline;
                  cursor: pointer;
                  &::before {
                    content: "";
                    background: url('../../../../../../static/img/chain/invite.png');
                    display: inline-block;
                    margin-right: 8px;
                    width: 18px;
                    height: 16px;
                    transform: translateY(10%)
                  }
                }
                a {
                  margin-left: 10px;
                  font-size: 14px;
                  font-weight: bold;
                  // text-decoration: underline;
                  cursor: pointer;
                  // &:hover {
                  //   color: #eb6100;
                  // }
                  &.default {
                    pointer-events: none;
                    text-decoration: none;
                  }
                }
                &>.chain-search-wrap {
                  position: absolute;
                  top: 32px;
                  left: 127px;
                  background: #fff;
                  border: 1px solid #e1e6f0;
                  z-index: 1;
                  font-size: 14px;
                  color: #333;
                  max-height: 250px;
                  overflow-y: auto;
                  overflow-x: hidden;
                  &::-webkit-scrollbar {
                    display: none;
                  }
                  .chain-search__list {
                    .chain-search__list__item {
                      width: 246px;
                      padding: 9px 10px;
                      border-bottom: 1px dashed #e1e6f0;
                      &:last-of-type {
                        border: 0;
                      }
                    }
                    .chain-search__list__item:hover {
                      background: #eb6100;
                      color: #fff;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            .chain-contract__content {
              overflow: hidden;
              .chain-contract__content__desc {
                margin-top: 18px;
                font-size: 14px;
              }
              &>p:not(.chain-contract__content__desc) {
                font-size: 14px;
                font-weight: bold;
                margin: 15px 0;
                &>input {
                  border:1px solid #e1e6f0;
                  width: 148px;
                  color: #666;
                  padding: 4px 10px;
                  outline: none
                }
                &>input:focus {
                  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                  border-color: #409eff
                }
              };
              .chain-contract__text {
                color:#f48537;
                font-size: 14px;
                text-decoration: underline;
                margin: 0 20px;
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
