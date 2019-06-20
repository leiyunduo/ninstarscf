<template>
  <div class="trade-assets__wraper">
    <div class="trade-assets">
      <div class="trade-assets__container">
        <ul class="part-list -left">
          <li class="part-list__item -left" v-for="(value, key) in Asset.p_companys" :key='key'>
            <span class="sub-line -right" :class="Object.keys(Asset.p_companys).length <= 1 ? '-fir' : ''"></span>
            <div class="self-wraper" @click="showList(key, 1, $event)">
              <div class="self-pic">
                <el-tooltip placement="top">
                  <div slot="content">
                    点击查看详情信息
                  </div>
                  <img src="static/img/bg-data/part_2x.png" alt="">
                </el-tooltip>
              </div>
              <div class="self-content" :style="key.length <= 9 ? 'height: 42px' : ''">
                <span>{{key}}</span>
              </div>
            </div>
            <span class="sub-line -right-r" v-show="handle_p_com === key"></span>
            <div class="list-sub__wraper -left" v-show="handle_p_com === key">
              <ul class="list-sub -left">
                <li class="list-sub__item -left" :class="value.length === 1 ? '-fir' : ''" v-for="(item, index) in value" :key="index">
                  <span class="sub-line -left"></span>
                  <div class="trade-card-wraper">
                    <div class="trade-card__title">
                      <div><span class="label">项目名称：</span><span @click="handleChain(item)" :class="isChain ? 'default' : ''" class="link blue" :title="item.contract_name">{{item.contract_name}}</span></div>
                      <div><span class="label">签订时间：</span><span>{{item.date_created}}</span></div>
                    </div>
                    <div class="trade-card__container">
                      <div class="trade-card-icon">
                        <div class="card-icon big">
                          <span class="icon-desc">收入</span>
                          <img src="static/img/bg-data/pay_e_2x.png" alt="">
                        </div>
                      </div>
                      <div class="trade-card-content">
                        <div class="trade-card-content__row text-block">
                          <div>
                            <label for=""><strong>应收</strong>总额(万元)：</label>
                            <span :title="'应付(万元)：' + convertData(item.receivable_sum)">{{convertData(item.receivable_sum)}}</span>
                          </div>
                          <div>
                            <label for="">笔数：</label>
                            <span>{{item.receivable_count}}</span>
                          </div>
                        </div>
                        <div class="trade-card-content__row text-block">
                          <div>
                            <label for=""><strong>已收</strong>总额(万元)：</label>
                            <span :title="'已付(万元)：' + convertData(item.received_sum)">{{convertData(item.received_sum)}}</span>
                          </div>
                          <div>
                            <label for="">笔数：</label>
                            <span>{{item.received_count}}</span>
                          </div>
                        </div>
                        <div class="trade-card-content__row text-block">
                          <div>
                            <label for=""><strong>订金</strong>总额(万元)：</label>
                            <span :title="'订金(万元)：' + convertData(item.deposit_sum)">{{convertData(item.deposit_sum)}}</span>
                          </div>
                          <div>
                            <label for="">笔数：</label>
                            <span>{{item.deposit_count}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="trade-assets__container">
        <div class="trade-assets-list">
          <div class="trade-assets-item">
            <span class="sub-line -left"></span>
            <div class="trade-card-wraper -small">
              <div class="trade-card__title main-title">
                <div><strong>采购</strong><span class="label">结算逾期率</span><span>：{{Number(Asset.p_over_rate.over_rate * 100).toFixed(2) + '%'}}</span></div>
              </div>
              <div class="trade-card__container">
                <div class="trade-card-icon">
                  <div class="card-icon" style="margin-left: -8px;">
                    <span class="icon-desc">支付</span>
                    <img style="width:43px" src="static/img/bg-data/pay_2x.png" alt="">
                  </div>
                </div>
                <div class="trade-card-content">
                  <div class="trade-card-content__row text-block">
                    <div>
                      <label for=""><strong>应付</strong>总额(万元)：</label>
                      <span :title="'应付(万元)：' + convertData(Asset.payable_sum)">{{convertData(Asset.payable_sum)}}</span>
                    </div>
                    <div>
                      <label for="">笔数：</label>
                      <span>{{Asset.payable_count}}</span>
                    </div>
                  </div>
                  <div class="trade-card-content__row text-block">
                    <div>
                      <label for=""><strong>已付</strong>总额(万元)：</label>
                      <span :title="'已付(万元)：' + convertData(Asset.paid_sum)">{{convertData(Asset.paid_sum)}}</span>
                    </div>
                    <div>
                      <label for="">笔数：</label>
                      <span>{{Asset.paid_count}}</span>
                    </div>
                  </div>
                  <div class="trade-card-content__row text-block">
                    <div>
                      <label for=""><strong>订金</strong>总额(万元)：</label>
                      <span :title="'订金(万元)：' + convertData(Asset.p_deposit)">{{convertData(Asset.p_deposit)}}</span>
                    </div>
                    <div>
                      <label for="">笔数：</label>
                      <span>{{Asset.p_deposit_count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="trade-assets-item -self">
            <span class="sub-line -before"></span>
            <div class="self-wraper">
              <div class="self-pic">
                <img src="static/img/bg-data/self_2x.png" alt="">
              </div>
              <div class="self-content">
                <span>{{Asset.company_name}}</span>
              </div>
            </div>
            <span class="sub-line -after"></span>
          </div>
          <div class="trade-assets-item">
            <span class="sub-line -right"></span>
            <div class="trade-card-wraper -small">
              <div class="trade-card__title main-title">
                <div><strong>销售</strong><span class="label">结算逾期率</span><span>：{{Number(Asset.s_over_rate.over_rate * 100).toFixed(2) + '%'}}</span></div>
              </div>
              <div class="trade-card__container">
                <div class="trade-card-icon">
                  <div class="card-icon">
                    <span class="icon-desc -text_orange">收入</span>
                    <img src="static/img/bg-data/receive_2x.png" alt="">
                  </div>
                </div>
                <div class="trade-card-content">
                  <div class="trade-card-content__row text-block">
                    <div>
                      <label for=""><strong>应收</strong>总额(万元)：</label>
                      <span :title="'应收(万元)：' + convertData(Asset.receivable_sum)">{{convertData(Asset.receivable_sum)}}</span>
                    </div>
                    <div>
                      <label for="">笔数：</label>
                      <span>{{Asset.receivable_count}}</span>
                    </div>
                  </div>
                  <div class="trade-card-content__row text-block">
                    <div>
                      <label for=""><strong>已收</strong>总额(万元)：</label>
                      <span :title="'已收(万元)：' + convertData(Asset.received_sum)">{{convertData(Asset.received_sum)}}</span>
                    </div>
                    <div>
                      <label for="">笔数：</label>
                      <span>{{Asset.received_count}}</span>
                    </div>
                  </div>
                  <div class="trade-card-content__row text-block">
                    <div>
                      <label for=""><strong>订金</strong>总额(万元)：</label>
                      <span :title="'订金(万元)：' + convertData(Asset.r_deposit)">{{convertData(Asset.r_deposit)}}</span>
                    </div>
                    <div>
                      <label for="">笔数：</label>
                      <span>{{Asset.r_deposit_count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="trade-assets__container">
        <ul class="part-list -right">
          <li class="part-list__item -right" :class="Object.keys(Asset.s_companys).length === 1 ? '-fir' : ''" v-for="(value, key) in Asset.s_companys" :key="key">
            <span class="sub-line -left"></span>
            <div class="self-wraper" @click="showList(key, 2, $event)">
              <div class="self-pic">
                <el-tooltip placement="top">
                  <div slot="content">
                    点击查看详情信息
                  </div>
                  <img src="static/img/bg-data/cooper_2x.png" alt="">
                </el-tooltip>
              </div>
              <div class="self-content" :style="key.length <= 9 ? 'height: 42px' : ''">
                <span>{{key}}</span>
              </div>
            </div>
            <span class="sub-line -left-r" v-show="handle_s_com === key"></span>
            <div class="list-sub__wraper -right" v-show="handle_s_com === key">
              <ul class="list-sub -right">
                <li class="list-sub__item -right" v-for="(item, index) in value" :key="index">
                  <span class="sub-line -right"></span>
                  <div class="trade-card-wraper">
                    <div class="trade-card__title">
                      <div><strong>项目名称：</strong><span @click="handleChain(item)" :class="isChain ? 'default' : ''" class="link orange" :title="item.contract_name">{{item.contract_name}}</span></div>
                      <div><span><strong>签订时间</strong>：{{item.date_created}}</span></div>
                    </div>
                    <div class="trade-card__container">
                      <div class="trade-card-icon">
                        <div class="card-icon big" style="margin-left:-8px">
                          <span class="icon-desc -text_orange">支付</span>
                          <img style="width: 43px" src="static/img/bg-data/receive_e_2x.png" alt="">
                        </div>
                      </div>
                      <div class="trade-card-content">
                        <div class="trade-card-content__row text-block">
                          <div>
                            <label for=""><strong>应付</strong>总额(万元)：</label>
                            <span :title="'应付(万元)：' + convertData(item.receivable_sum)">{{convertData(item.receivable_sum)}}</span>
                          </div>
                          <div>
                            <label for="">笔数：</label>
                            <span>{{item.receivable_count}}</span>
                          </div>
                        </div>
                        <div class="trade-card-content__row text-block">
                          <div>
                            <label for=""><strong>已付</strong>总额(万元)：</label>
                            <span :title="'已付(万元)：' + convertData(item.received_sum)">{{convertData(item.received_sum)}}</span>
                          </div>
                          <div>
                            <label for="">笔数：</label>
                            <span>{{item.received_count}}</span>
                          </div>
                        </div>
                        <div class="trade-card-content__row text-block">
                          <div>
                            <label for=""><strong>订金</strong>总额(万元)：</label>
                            <span :title="'订金(万元)：' + convertData(item.deposit_sum)">{{convertData(item.deposit_sum)}}</span>
                          </div>
                          <div>
                            <label for="">笔数：</label>
                            <span>{{item.deposit_count}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'bid': {
        type: String,
        default: ''
      },
      'chainId': {
        type: String,
        default: ''
      },
      'isChain': {
        type: Boolean
      }
    },
    data () {
      return {
        Asset: {
          s_companys: {},
          p_companys: {},
          received_count: 0,
          receivable_count: 0,
          r_deposit_count: 0,
          paid_count: 0,
          payable_count: 0,
          p_deposit_count: 0,
          p_over_rate: {
            over_rate: 0
          },
          s_over_rate: {
            over_rate: 0
          }
        },
        handle_s_com: '',
        handle_p_com: ''
      }
    },
    mounted () {
      let _url = this.chainId ? '/api/oth/data_portrait/digital_model/?company_id=' + (this.bid || localStorage.id) + '&chain_id=' + this.chainId : '/api/oth/data_portrait/digital_model/?company_id=' + (this.bid || localStorage.id) 
      this.$ajax.get(_url).then(res => {
        this.Asset = res.data
        this.Asset.received_count = 0
        this.Asset.receivable_count = 0
        this.Asset.r_deposit_count = 0
        this.Asset.paid_count = 0
        this.Asset.payable_count = 0
        this.Asset.p_deposit_count = 0
        let r_obj = this.groupBy(res.data.s_contract, 'r')
        let p_obj = this.groupBy(res.data.p_contract, 'p')
        this.Asset.s_companys = r_obj
        this.Asset.p_companys = p_obj
      })
    },
    methods: {
      showList (key, type, e) {
        if (e.target.offsetParent.innerText.trim() === key) {
          if (type === 1) {
            this.handle_p_com === key ? this.handle_p_com = '' : this.handle_p_com = key
          } else {
            this.handle_s_com === key ? this.handle_s_com = '' : this.handle_s_com = key
          }
        } else {
          type === 1 ? this.handle_p_com = key : this.handle_s_com = key
        } 
      },
      handleChain (obj) {
        if (this.isChain) return
        if (localStorage.role === 'business' || localStorage.role === 'person') {
          let str = obj.chain_type === '2' ? 'payment_chain?id=' : 'payment_chain?id='
          this.$router.push({
            path: '/chain_app/'+ str + obj.chain_id
          })
        } else {
          let str = '#/chain_app/'
          if (obj.chain_type === '2') {
            str += 'payment_chain?id='
          } else {
            str += 'payment_chain?id='
          }
          window.open(str + obj.chain_id, 'blank')
        }
      },
      convertData (data) {
        if (data) {
          let num = Number(data) / 10000
          if (num <= 0) return '0.00'
          else return this.toThousands(num)
        } else {
          return '0.00'
        }
      },
      groupBy (arr, type) {
        let that = this
        if (Array.isArray(arr)) {
          return arr.reduce((pre, next) => {
            pre[next.company_name] = pre[next.company_name] || []
            pre[next.company_name].push(next)
            if (type === 'p') {
              that.Asset.paid_count += Number(next.received_count)
              that.Asset.payable_count += Number(next.receivable_count)
              that.Asset.p_deposit_count += Number(next.deposit_count)
            } else {
              that.Asset.received_count += Number(next.received_count)
              that.Asset.receivable_count += Number(next.receivable_count)
              that.Asset.r_deposit_count += Number(next.deposit_count)
            }
            return pre
          }, {})
        }
      }
    }
  }
</script>
<style lang='less' scope>
  /* utils */
  @import url('../../../layout/stylesheets/utils/util.less');
  @card-box_width: 320px;
  @card-box_height: 124px;
  @card-box_width_s: 300px;
  @card-box_height_s: 104px;
  @card-text_blue: #0C8DFF;
  @card-text_orange: #EB6100;
  @card-text_nomal: #666666;
  @card-text_block: #333;
  @card-text_disable: #999999;
  @card-box-shadow_orange: 0px 0px 7px 0px rgba(235,97,0,0.2);
  @card-box-shadow_blue: 0px 0px 7px 0px rgba(12,141,255,0.2);
  /* 适应不同屏幕大小 */
  @media screen and (max-width: 1650px) {
    .trade-assets {
      transform: scale(.9)
    }
  }
  @media screen and (min-width: 1383px) and (max-width: 1650px) {
    .trade-assets {
      transform: scale(.85)
    }
  }
  @media screen and (max-width: 1383px) {
    .trade-assets {
      transform: scale(.75)
    }
  }
  /* mixin */
  .card-module() {
    .trade-card-wraper {
      width: @card-box_width;
      background: rgba(255,255,255,1);
      border: 1px solid rgba(240,248,255,1);
      box-shadow: @card-box-shadow_blue;
      border-radius: 4px;
      padding: 3px 10px;
      margin: 0 auto;
      &.-small {
        width: @card-box_width_s;
        height: @card-box_height_s;
      }
      .trade-card__title {
        font-size: 14px;
        margin-left: 65px;
        &>div {
          span.label {
            color: #333;
            font-weight: bolder 
          }
        }
        &>div:first-of-type {
          max-width: 233px;
          .js-truncate;
          span.link {
            cursor: pointer;
            text-decoration: underline;
            &.blue {
              color: @card-text_blue;
            }
            &.orange {
              color: @card-text_orange;
            }
            &.default {
              color: @card-text_nomal;
              text-decoration: none;
              cursor: default
            }
            strong {
              color: @card-text_block;
              text-decoration: none;
            }
          }
        }
        &.main-title {
          margin-left: 14px;
          &>div>strong {
            margin-right: 25px;
          }
        }
      }
      .trade-card__container {  
        display: flex;
        .trade-card-icon {
          margin: 0 10px 0 10px;
          .card-icon {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            &.big {
              transform: translateY(-75%);
            }
            &>img {
              width: 35px;
            }
            .icon-desc {
              display: block;
              font-size: 14px;
              text-align: center;
              font-weight: bolder;
              color:  @card-text_blue;
              margin-bottom: 5px;
              &.-text_orange {
                color:  @card-text_orange;
              }
            }
          }
        }
        .trade-card-content {
          font-size: 12px;
          width: calc(100% - 45px);
          .trade-card-content__row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            label>strong {
              margin-right: 5px;
            }
            &.text-block {
              color: @card-text_block
            }
            &>div:first-child {
              width: 162px;
              display: flex;
              justify-content: space-between;
              .js-truncate;
            }
            &>div:last-of-type {
              width: 58px;
              margin-left: 8px;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
  .self-module() {
    .self-wraper {
      cursor: pointer;
      .self-pic {
        margin: 0 auto;
        background: rgba(255,255,255,1);
        text-align: center;
        img {
          margin-top: 7.5px;
        }
      }
      .self-content {
        margin-top: 8px;
        color: @card-text_nomal
      }
    }
  }
  /* main */
  .trade-assets__wraper {
    width: 100%;
    background: #fff;
    padding: 30px 0 70px 0;
    .trade-assets {
      display: flex;
      justify-content: center;
      margin: 25px 0px;
      padding-right: 230px;
      .trade-assets__container {
        &:nth-of-type(3) {
          display: flex;
          // align-items: center;
        }
        .trade-assets-list {
          .trade-assets-item {
            position: relative;
            .card-module();
            &.-self {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 290px;
              position: relative;
              margin-bottom: 20px;
              .self-module();
              .sub-line {
                width: 1px;
                height: 82px;
                &.-before {
                  position: absolute;
                  display: block;
                  border: 1px solid rgba(12,141,255,1);
                  top: 30px;
                  left: 50%; //IE 需要 justify-content: center不起作用
                  &::before {
                    .arrow(up, #0C8DFF, 5px)
                  }
                }
                &.-after {
                  position: absolute;
                  border:1px solid rgba(235,97,0,1);
                  display: block;
                  bottom: 0;
                  left: 50%; //IE 需要 justify-content: center不起作用
                  &::after {
                    .arrow(down, #eb6100, 5px)
                  }
                }
              }
              
            }
            &>.sub-line {
              width: 30px;
              &.-left {
                border: 1px solid #0C8DFF;
                position: absolute;
                left: -40px;
                top: 50%;
                transform: translateY(-50%);
                &::before {
                  content: '';
                  position: absolute;
                  width: 12px;
                  height: 12px;
                  background: rgba(255,255,255,1);
                  border: 1px solid rgba(12,141,255,1);
                  border-radius: 50%;
                  left: -8px;
                  top: -5px
                }
              }
              &.-right {
                border: 1px solid #eb6100;
                position: absolute;
                right: -40px;
                top: 46%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                z-index: 5;
                &::before {
                  content: '';
                  position: absolute;
                  width: 12px;
                  height: 12px;
                  background: rgba(255,255,255,1);
                  border: 1px solid #eb6100;
                  border-radius: 50%;
                  right: -8px;
                  top: -5px;
                  z-index: 2;
                }
              }
            }
          }
        }
        .part-list {
          &.-left {
            border-right: 2px solid #0C8DFF;
            margin-right: 40px;
            width: 180px;
          }
          &.-right {
            border-left: 2px solid #eb6100;
            margin-left: 40px;
            width: 190px;
            position: absolute;
            margin-top: 340px;
            background: #fff
          }
          .part-list__item {
            .self-module();
            // margin-bottom: 20px;
            position: relative;
            &.-left:last-of-type { // 辅助线，遮挡多余内容
              border-right: 4px solid #fff;
              margin-right: -3px;
            }
            &>.self-wraper {
              position: relative;
              top: -30px;
            }
            & .self-content {
              width: 130px;
              text-align: center;
              margin: 0 auto;
            }
            &>.sub-line {
              position: absolute;
              display: block;
              width: 35px;
              z-index: 2;
              margin-top: -1px;
              &.-right::before {
                .arrow(left, #0C8DFF, 5px)
              }
              &.-right {
                right: 0;
                border: 1px solid rgba(12,141,255,1);
              }
              &.-right.-fir {
                right: 3px;
                top: 52px;
                border: 1px solid rgba(12,141,255,1);
              }
              &.-right-r {
                left: 0;
                top: 4px;
                border: 1px solid #0C8DFF;
                &::before{
                  content: "";
                  position: absolute;
                  width: 12px;
                  height: 12px;
                  background: rgba(255,255,255,1);
                  border: 1px solid #0C8DFF;
                  border-radius: 50%;
                  left: -8px;
                  top: -5px;
                  z-index: 5;
                }
              }
              &.-left-r {
                right: 0;
                top: 4px;
                border: 1px solid #eb6100;
                &::before{
                  content: "";
                  position: absolute;
                  width: 12px;
                  height: 12px;
                  background: rgba(255,255,255,1);
                  border: 1px solid #eb6100;
                  border-radius: 50%;
                  right: -8px;
                  top: -5px;
                  z-index: 2;
                }
                &::after {
                  content: "";
                  position: absolute;
                  border:1px solid #eb6100;
                  height: 54px;
                  right: -3px;
                  top: 0px;
                }
              }
              &.-left::before {
                .arrow(right, #eb6100, 5px)
              }
              &.-left {
                left: 0;
                border: 1px solid #eb6100;
              }
              &:last-of-type {
                right: -2px;
              }
            }
            &>.list-sub__wraper {
              &.-left {
                width: 360px;
                margin-left: -360px;
                transform: translateY(-120px);
                .list-sub {
                  padding-right: 40px;
                  border-right: 2px solid #0C8DFF;
                }        
              }
              &.-right {
                width: 360px;
                margin-left: 190px;
                transform: translateY(-120px);
                .list-sub {
                  padding-left: 40px;
                  border-left: 2px solid #eb6100;
                  background: #fff;
                }        
              } 
              .list-sub {
                .list-sub__item {
                  .card-module();
                  margin-bottom: 30px;
                  position: relative;
                  &>.sub-line {
                    position: absolute;
                    width: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    &.-left {
                      right: -40px;
                      border: 1px solid #0C8DFF;
                      &::before{
                        .arrow(left, #0C8DFF, 5px)
                      }
                    }
                    &.-right {
                      left: -40px;
                      border: 1px solid #eb6100;
                      &::before{
                        .arrow(right, #eb6100, 5px)
                      }
                    }
                  }
                  &.-left.-fir::after { // 辅助线，遮挡多余内容
                    content: "";
                    position: absolute;
                    border: 5px solid #fff;
                    width: 4px;
                    height: 56px;
                    right: -44px;
                    bottom: -1px;
                  }
                  &.-left:last-of-type:not(:first-child)::after { // 辅助线，遮挡多余内容
                    content: "";
                    position: absolute;
                    border: 5px solid #fff;
                    width: 4px;
                    height: 56px;
                    right: -44px;
                    bottom: -1px;
                  }
                  &.-right:last-of-type::after { // 辅助线，遮挡多余内容
                    content: "";
                    position: absolute;
                    border: 5px solid #fff;
                    width: 4px;
                    height: 56px;
                    left: -44px;
                    bottom: -1px;
                  }
                }
              }
            }
            &.-right:last-of-type::before {
              content: "";
              position: absolute;
              border: 5px solid #fff;
              width: 4px;
              height: 124px;
              left: -6px;
              bottom: -30px;
            }
            &.-right.-fir::before {
              content: "";
              position: absolute;
              border: 5px solid #fff;
              width: 4px;
              height: 30px;
              left: -6px;
              bottom: -30px;
            }
          }
        }
      }
    }
  }
</style>