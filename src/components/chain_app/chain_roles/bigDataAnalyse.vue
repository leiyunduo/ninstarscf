<template>
  <div class="bigdata-analyse1">
    <div class="bigdata-wraper1">
      <div class="bigdata1">
        <div class="bigdata-container1">
          <div class="card-group1" v-if="bigData.payable_contract_data.length >= 1">  
            <div class="card-item1" v-for="(item, index) in bigData.payable_contract_data" :key="index">
              <div class="card-partner1">
                <div class="card-subline1">
                  <!-- <div class="card-subline__top"></div>
                  <div class="card-subline__bot"></div> -->
                  <div class="symbol-default1"></div>
                </div>
                <div class="auth1">
                  <div class="auth-pic1">
                    <img src="static/img/bg-data/part_s.png" alt="">
                  </div>
                  <div class="auth-content1">
                    <span>{{item.company_name}}</span>
                  </div>
                </div>
                <span class="card-subline-inline1"></span>
              </div>
              <!-- <div class="card-wraper float_left">
                <div class="card-content">
                  <div class="card-content__row text-disabled">
                    <label for="">应付(万):</label>
                    <span>******</span>
                  </div>
                  <div class="card-content__row text-disabled">
                    <label for="">已付(万):</label>
                    <span>******</span>
                  </div>
                  <div class="card-content__row text-disabled">
                    <label for="">订金(万):</label>
                    <span>******</span>
                  </div>
                </div>
                <div class="card-flag-wrap">
                  <div class="card-flag">
                    <img src="static/img/bg-data/payment_disab_s.png" alt="">
                    <span class="icon-desc">支付</span>
                  </div>
                </div>
              </div> -->
              <div class="card-wraper1 float_left1">
                <div class="card-content1">
                  <div class="card-content__row1 text-title1">
                    <label for="">合同:</label>
                    <span>{{item.contract_name}}</span>
                  </div>
                  <div class="card-content__row1 text-blue1">
                    <label for="">应收(万):</label>
                    <span>{{convertData(item.receivable_sum)}}</span>
                  </div>
                  <div class="card-content__row1 text-orange1">
                    <label for="">已收(万):</label>
                    <span>{{convertData(item.received_sum)}}</span>
                  </div>
                  <div class="card-content__row1 text-block1">
                    <label for="">订金(万):</label>
                    <span>{{convertData(item.deposit_sum)}}</span>
                  </div>
                </div>
                <div class="card-flag-wrap1">
                  <div class="card-flag1">
                    <img src="static/img/bg-data/receive_s.png" alt="">
                    <span class="icon-desc1">收入</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-group1" v-else>
            <div class="card-item1">
              <div class="card-partner1">
                <div class="card-subline1">
                  <!-- <div class="card-subline__top1"></div>
                  <div class="card-subline__bot1"></div> -->
                  <div class="symbol-default1"></div>
                </div>
                <div class="auth1">
                  <div class="auth-pic1">
                    <img src="static/img/bg-data/part_s.png" alt="">
                  </div>
                  <div class="auth-content1">
                    <span></span>
                  </div>
                </div>
                <span class="card-subline-inline1"></span>
              </div>
              <!-- <div class="card-wraper1 float_left1">
                <div class="card-content1">
                  <div class="card-content__row1 text-disabled1">
                    <label for="">应付(万):</label>
                    <span>******</span>
                  </div>
                  <div class="card-content__row1 text-disabled1">
                    <label for="">已付(万):</label>
                    <span>******</span>
                  </div>
                  <div class="card-content__row1 text-disabled1">
                    <label for="">订金(万):</label>
                    <span>******</span>
                  </div>
                </div>
                <div class="card-flag-wrap1">
                  <div class="card-flag1">
                    <img src="static/img/bg-data/payment_disab_s.png" alt="">
                    <span class="icon-desc1">支付</span>
                  </div>
                </div>
              </div> -->
              <div class="card-wraper1 float_left1">
                <div class="card-content1">
                  <div class="card-content__row text-blue1">
                    <label for="">应收(万):</label>
                    <span>0.00</span>
                  </div>
                  <div class="card-content__row1 text-orange1">
                    <label for="">已收(万):</label>
                    <span>0.00</span>
                  </div>
                  <div class="card-content__row1 text-block1">
                    <label for="">订金(万):</label>
                    <span>0.00</span>
                  </div>
                </div>
                <div class="card-flag-wrap1">
                  <div class="card-flag1">
                    <img src="static/img/bg-data/receive_s.png" alt="">
                    <span class="icon-desc1">收入</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bigdata-container1 minWidth1">
          <div class="place-holer1" :class="convertCss(bigData.payable_contract_data)"></div>
          <div class="card-view1">
            <div class="box-top1">
              <div class="card-wraper1 shdaw-blue1">
                <div class="card-content1">
                  <div class="card-content__row1 text-blue1">
                    <label for="">应付(万):</label>
                    <span>{{convertData(bigData.payable_info.payable_sum)}}</span>
                  </div>
                  <div class="card-content__row1 text-orange1">
                    <label for="">已付(万):</label>
                    <span>{{convertData(bigData.payable_info.paid_sum)}}</span>
                  </div>
                  <div class="card-content__row1 text-block1">
                    <label for="">订金(万):</label>
                    <span>{{convertData(bigData.payable_info.p_deposit)}}</span>
                  </div>
                </div>
                <div class="card-flag-wrap1">
                  <div class="card-flag1">
                    <img src="static/img/bg-data/payment_s.png" alt="">
                    <span class="icon-desc1">支付</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-mid1">
              <div class="auth-wraper1">
                <div class="auth-pic1">
                  <img src="static/img/bg-data/self_s.png" alt="">
                </div>
                <div class="auth-content1">
                  <span>{{bigData.company_name}}</span>
                </div>
              </div>
              <div class="supline1">
                <span class="supline__top1"></span>
                <span class="supline__bot1"></span>
                <span class="supline__left1"></span>
                <span class="supline__right1"></span>
              </div>
              <div class="symbol-blue1"></div>
              <div class="symbol-orange1"></div>
            </div>
            <div class="box-bot1">
              <div class="card-wraper1 shdaw-orange1">
                <div class="card-content1">
                  <div class="card-content__row1 text-blue1">
                    <label for="">应收(万):</label>
                    <span>{{convertData(bigData.receive_info.receivable_sum)}}</span>
                  </div>
                  <div class="card-content__row1 text-orange1">
                    <label for="">已收(万):</label>
                    <span>{{convertData(bigData.receive_info.received_sum)}}</span>
                  </div>
                  <div class="card-content__row1 text-block1">
                    <label for="">订金(万):</label>
                    <span>{{convertData(bigData.receive_info.r_deposit)}}</span>
                  </div>
                </div>
                <div class="card-flag-wrap1">
                  <div class="card-flag1">
                    <img src="static/img/bg-data/receive_s.png" alt="">
                    <span class="icon-desc1">收入</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="place-holer1 bot1" :class="convertCss(bigData.payable_contract_data)"></div>
        </div>
        <div class="bigdata-container1">
          <div class="card-group1">
            <div class="card-item1">
              <div class="card-partner1">
                <div class="card-subline_floatRight1">
                  <!-- <div class="card-subline__top"></div>
                  <div class="card-subline__bot"></div> -->
                  <div class="symbol-default1"></div>
                </div>
                <div class="auth_floatRight1">
                  <div class="auth-pic1">
                    <img src="static/img/bg-data/cooper_s.png" alt="">
                  </div>
                  <div class="auth-content1">
                    <span>{{bigData.receive_info.s_contract.company_name}}</span>
                  </div>
                </div>
                <span class="card-subline-inline_floatRight1"></span>
              </div>
              <div class="card-wraper1 float_right1">
                <div class="card-content1">
                  <div class="card-content__row1 text-title1">
                    <label for="">合同:</label>
                    <span>{{bigData.receive_info.s_contract.contract_name}}</span>
                  </div>
                  <div class="card-content__row1 text-blue1">
                    <label for="">应付(万):</label>
                    <span>{{convertData(bigData.receive_info.receivable_sum)}}</span>
                  </div>
                  <div class="card-content__row1 text-orange1">
                    <label for="">已付(万):</label>
                    <span>{{convertData(bigData.receive_info.received_sum)}}</span>
                  </div>
                  <div class="card-content__row1 text-block1">
                    <label for="">订金(万):</label>
                    <span>{{convertData(bigData.receive_info.r_deposit)}}</span>
                  </div>
                </div>
                <div class="card-flag-wrap1">
                  <div class="card-flag1">
                    <img src="static/img/bg-data/payment_s.png" alt="">
                    <span class="icon-desc1">支付</span>
                  </div>
                </div>
              </div>
              <!-- <div class="card-wraper float_right">
                <div class="card-content">
                  <div class="card-content__row text-disabled">
                    <label for="">应收(万):</label>
                    <span>******</span>
                  </div>
                  <div class="card-content__row text-disabled">
                    <label for="">已收(万):</label>
                    <span>******</span>
                  </div>
                  <div class="card-content__row text-disabled">
                    <label for="">订金(万):</label>
                    <span>******</span>
                  </div>
                </div>
                <div class="card-flag-wrap">
                  <div class="card-flag">
                    <img src="static/img/bg-data/receive_dis_s.png" alt="">
                    <span class="icon-desc">收入</span>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        bigData: {
          receive_contract_data: {},
          payable_contract_data: [],
          receive_info: {
            receivable_sum: '',
            received_sum: '',
            r_deposit: '',
            s_contract: {}
          },
          payable_info: {
            payable_sum: '',
            paid_sum: '',
            p_deposit: ''
          },
          company_name: ''
        },
        chainId: ''
      }
    },
    mounted () { 
      if (!this.$route.query.id) return
      this.chainId = this.$route.query.id
      this.$ajax.get(`/api/chain/five_stream/` + this.chainId + `/digital_model/`).then(res => {
        this.bigData.receive_contract_data = res.data.s_contract
        if (res.data.p_contract) {
          this.bigData.payable_contract_data = res.data.p_contract
        }
        this.bigData.receive_info = res.data
        this.bigData.payable_info = res.data
        this.bigData.company_name = res.data.company_name
      })
    },
    methods: { 
      convertData(data) {
        var num = Number(data)
        num = num * Math.pow(10, -4)
        return this.toThousands(num)
      },
      convertCss(list) {
        let _css = ''
        if (list.length === 0 || list.length === 1) {
          _css = 'hideline-one1'
        } else if (list.length === 2) {
          _css = 'hideline-two1'
        } else {
          _css = 'hideline-more1'
        }
        return _css
      }
    }
  }
</script>
<style lang='less' scope>
  @card-box-width: 220px;
  @card-box-height: 100px;
  @card-text_blue: #0C8DFF;
  @card-text_orange: #EB6100;
  @card-text_nomal: #666;
  @card-text_block: #333;
  @card-text_disable: #999999;
  @card-box-shadow_orange: 0px 0px 7px 0px rgba(235,97,0,0.2);
  @card-box-shadow_blue: 0px 0px 7px 0px rgba(12,141,255,0.2);
  .card-wraper1 {
    width: @card-box-width;
    height: @card-box-height;
    background: rgba(255,255,255,1);
    border: 1px solid rgba(240,248,255,1);
    border-radius: 4px;
    display: flex;
    padding: 5px 10px;
    margin: 0 auto;
    &.shdaw-blue1 {
      box-shadow: @card-box-shadow_blue
    }
    &.shdaw-orange1 {
      box-shadow: @card-box-shadow_orange
    }
    .card-content1 {
      font-size: 12px;
      .card-content__row1 {
        margin: 5px 0;
        width: 130px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.text-block1 {
          color: @card-text_block
        }
        &.text-blue1 {
          color: @card-text_blue
        }
        &.text-orange1 {
          color: @card-text_orange
        }
        &.text-disabled1 {
          color: @card-text_disable
        }
        &.text-title1 {
          font-size: 14px;
        }
      }
    }
    .card-flag-wrap1 {
      margin: 0 auto;
      .card-flag1 {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        .icon-desc1 {
          display: block;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
  .bigdata-wraper1 {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    .bigdata1 {
      display: flex;
      justify-content: center;
      margin: 25px 0px;
      .bigdata-container1 {
        &.minWidth1 {
          width: 350px;
          position: relative;
          .place-holer1 {
            position: absolute;
            width: 2px;
            left: -1px;
            background: #fff;
            &.hideline-one1 {
              height: 239px;
            }
            &.hideline-two1 {
              // height: 129px;
              height: 174px;
            }
            &.hideline-more1 {
              // height: 104px;
              height: 90px;
            }
            &.bot1 {
              bottom: 0;
            }
          }
        }
        width: 400px;
        &:first-child {
          border-right: 1px dashed #0C8DFF;
        }
        .card-view1 {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          .box-mid1 {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 290px;
            position: relative;
            .auth-wraper1 {
              .auth-pic1 {
                margin: 0 auto;
                width:60px;
                height:60px;
                background: rgba(255,255,255,1);
                border: 1px solid rgba(238,238,238,1);
                border-radius: 50%;
                text-align: center;
                img {
                  margin-top: 7.5px;
                }
              }
              .auth-content1 {
                margin-top: 8px;
                color: @card-text_nomal
              }
            }
            .supline1 {
              position: absolute;
              .supline__top1 {
                position: absolute;
                display: block;
                height: 90px;
                margin-top: -136px; 
                border: .5px dashed #0C8DFF;
              }
              .supline__left1 {
                position: absolute;
                display: block;
                width: 94px;
                margin-left: -176px;
                border: .5px dashed #0C8DFF;
                height: 0;
                &::after {
                  content: "";
                  position: absolute;
                  right: -10px;
                  top: -5px;
                  display: block;
                  border-width: 5px;
			            border-style: solid;
			            border-color: transparent transparent transparent #0C8DFF;
                }
                &::before {
                  content: "";
                  position: absolute;
                  left: -5.5px;
                  top: 50%;
                  margin-top: -5.5px;
                  width: 11px;
                  height: 11px;
                  background: #0c8dff;
                  border: 1px solid #0c8dff;
                  border-radius: 50%;
                }
              }
              .supline__bot1 {
                position: absolute;
                display: block;
                height: 90px;
                margin-bottom: -140px;
                bottom: 0;
                border: 0.5px dashed rgba(235,97,0,1);;
              }
              .supline__right1 {
                position: absolute;
                display: block;
                width: 94px;
                margin-left: 76px;
                border: 0.5px dashed rgba(235,97,0,1);
                &::before {
                  content: "";
                  position: absolute;
                  left: -10px;
                  top: -5px;
                  display: block;
                  border-width: 5px;
			            border-style: solid;
			            border-color: transparent rgba(235,97,0,1) transparent transparent;
                }
                &::after {
                  content: "";
                  position: absolute;
                  left: 93px;
                  top: 50%;
                  right: 0;
                  margin-top: -5.5px;
                  width: 11px;
                  height: 11px;
                  background:rgba(235,97,0,1);
                  border:1px solid rgba(235,97,0,1);
                  border-radius: 50%;
                }
              }
            }
          }
        }
        .card-group1 {
          overflow: hidden;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          .card-item1 {
            position: relative; 
            margin: 40px 0; // modify
            &.verticalAligh1 {
              transform: translateY(62%);
            }
            &>.card-wraper1 {
              &.float_left1 {
                margin-left: 15px;
              }
              &.float_right1 {
                margin-right: 15px;
              }
              margin-bottom: 10px;
              position: relative;
              box-shadow: @card-box-shadow_blue;
            }
            .card-partner1 {
              .card-subline1 {
                position: absolute;
                top: 50%;
                margin-top: -45px;
                right: 131px;
                height: 90px; // modify
                .card-subline__top1 {
                  width: 30px;
                  height: 45px;
                  border-top: 1px dashed rgba(153,153,153,1); 
                  border-right: 1px dashed rgba(153,153,153,1); 
                }
                .card-subline__bot1 {
                  width: 30px;
                  height: 45px;
                  border-bottom: 1px dashed rgba(12,141,255,1); 
                  border-right: 1px dashed rgba(12,141,255,1); 
                }
                .symbol-default1 {
                  position: absolute;
                  top: 50%;
                  margin-top: -5.5px;
                  right: 23px; // modify
                  width: 11px;
                  height: 11px;
                  border:1px solid #999999;
                  background: #fff;
                  border-radius:50%;
                  z-index: 1; // modify
                }
              }
              .card-subline_floatRight1 {
                position: absolute;
                top: 50%;
                margin-top: -45px;
                left: 131px;
                height: 90px; // modify
                .card-subline__top1 {
                  width: 30px;
                  height: 45px;
                  border-top: 1px dashed rgba(153,153,153,1); 
                  border-left: 1px dashed rgba(153,153,153,1); 
                }
                .card-subline__bot1 {
                  width: 30px;
                  height: 45px;
                  border-bottom: 1px dashed rgba(235,97,0,1); 
                  border-left: 1px dashed rgba(235,97,0,1); 
                }
                .symbol-default1 {
                  position: absolute;
                  top: 50%;
                  margin-top: -5.5px;
                  left: 22px;
                  width: 11px;
                  height: 11px;
                  border:1px solid #999999;
                  background: #fff;
                  border-radius:50%;
                  z-index: 2
                }
              }
              .card-subline-inline1 {
                position: absolute;
                height: 0;
                border: 0.5px dashed rgba(12,141,255,1);
                width: 153px; // modify
                right: 0;
                top: 50%;
                &::before {
                  content: "";
                  position: absolute;
                  left: 14px;
                  top: -5px;
                  display: block;
                  border-width: 5px;
			            border-style: solid;
			            border-color: transparent transparent transparent rgba(12,141,255,1);
                }
              }
              .card-subline-inline_floatRight1 {
                position: absolute;
                height: 0;
                border: 0.5px dashed rgba(235,97,0,1);
                width: 152px; // modify
                left: 0;
                top: 50%;
                &::before {
                  content: "";
                  position: absolute;
                  right: 14px;
                  top: -5px;
                  display: block;
                  border-width: 5px;
			            border-style: solid;
			            border-color: transparent rgba(235,97,0,1) transparent transparent ;
                }
              }
              .auth1 {
                position: absolute;
                z-index: 1;
                right: 15px;
                // top: 54px;  modify
                .auth-pic1 {
                  width: 60px;
                  height: 60px;
                  background:rgba(255,255,255,1);
                  border:1px solid rgba(238,238,238,1);
                  border-radius:50%;
                  text-align: center;
                  margin: 15px auto 4px;
                  img {
                    margin-top: 7.5px;
                  }
                }
                .auth-content1 {
                  font-size: 14px;
                  color: #666;
                  text-align: center;
                  width: 96px;
                }
              }
              .auth_floatRight1 {
                position: absolute;
                z-index: 1;
                left: 15px;
                // top: 54px; modify
                .auth-pic1 {
                  width: 60px;
                  height: 60px;
                  background:rgba(255,255,255,1);
                  border:1px solid rgba(238,238,238,1);
                  border-radius:50%;
                  text-align: center;
                  margin: 15px auto 4px;
                  img {
                    margin-top: 7.5px;
                  }
                }
                .auth-content1 {
                  font-size: 14px;
                  color: #666;
                  text-align: center;
                  width: 96px;
                }
              }
            }   
          }
        }
      }
    }
  }
</style>