<template>
  <div class="bigdata-analyse1">
    <div class="bigdata-wraper">
      <div class="bigdata">
        <div class="bigdata-containers">
          <div class="card-group_s" :style="pContract.length < 2 ? 'top: 17%' : 'top: 37%'" :class="convertCss(bigData.payable_contract_data)" v-if="bigData.payable_contract_data.length >= 1">
            <div class="dashed-line2" :style="'height:' + ((pContract.length - 1) * 124 + 62) + 'px'"></div>
            <div class="card-item" v-for="(item, index) in pContract" :key="index">
              <div class="card-partner">
                <div class="card-sublines" v-if="item.show">
                  <div class="card-sublines__top"></div>
                  <div class="symbol-default"></div>
                </div>
                <div class="auth" @click="handleShow(index, 'p')">
                  <div class="auth-pic">
                    <img src="static/img/bg-data/part_s.png" alt="">
                  </div>
                  <div class="auth-content">
                    <span>{{item.company_name}}</span>
                  </div>
                </div>
                <span class="card-sublines-inline"></span>
              </div>
              <div v-show="item.show" style="position: relative">
                <div v-for="(p, pIndex) in pData" :key='pIndex' class="card-wraper float_left card_list" :style="'position: absolute; top:' + pIndex * 139 + 'px'">
                  <div class="card-item-company_name">
                    <p>合同：<span class='check_o' @click="handleChain(p, 'p')">{{ p.contract_name }}</span></p>
                    <p>签订时间：<span>{{ p.date_created }}</span></p>
                  </div>
                  <div class="company-card">
                    <div class="card-content">
                      <div class="card-content__row text-blue">
                        <div>
                          <label for="">应收(万元)：</label>
                          <span :title="'应收(万元)：' + convertData(p.receivable_sum)">{{p.receivable_sum > 0 ? convertData(p.receivable_sum) : '0.00'}}</span>
                        </div>
                        <div>
                          <label for="">笔数：</label>
                          <span :title="p.receivable_count + '笔'">{{p.receivable_count}}笔</span>
                        </div>
                      </div>
                      <div class="card-content__row text-orange">
                        <div>
                          <label for="">已收(万元)：</label>
                          <span :title="'已收(万元)：' + convertData(p.received_sum)">{{convertData(p.received_sum)}}</span>
                        </div>
                        <div>
                          <label for="">笔数：</label>
                          <span :title="p.received_count + '笔'">{{p.received_count}}笔</span>                          
                        </div>
                      </div>
                      <div class="card-content__row text-block">
                        <div>
                          <label for="">订金(万元)：</label>
                          <span :title="'订金(万元)：' + convertData(p.deposit_sum)">{{convertData(p.deposit_sum)}}</span>
                        </div>
                        <div>
                          <label for="">笔数：</label>
                          <span :title="p.deposit_count + '笔'">{{p.deposit_count}}笔</span>                             
                        </div>
                      </div>
                    </div>
                    <div class="card-flag-wrap">
                      <div class="card-flag">
                        <img src="static/img/bg-data/receive_s.png" alt="">
                        <span class="icon-desc">收入</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-item" style="top: -12px" v-if="pContract.length === 0">
              <div class="card-partner">
                <div class="card-sublines">
                  <div class="card-sublines__top"></div>
                  <div class="symbol-default"></div>
                </div>
                <div class="auth">
                </div>
                <span class="card-sublines-inline"></span>
              </div>
              <p style="line-height: 124px; color: #999;">暂无采购记账</p>
            </div>
            <!-- <div class="dashed-line3"></div> -->
          </div>
          <!-- <div class="card-group_s" v-if="bigData.payable_contract_data.length === 0">
            <div class="card-item">
              <div class="card-partner">
                <div class="card-sublines">
                  <div class="card-sublines__top"></div>
                  <div class="symbol-default"></div>
                </div>
                <div class="auth">
                  <div class="auth-pic">
                    <img src="static/img/bg-data/part_s.png" alt="">
                  </div>
                  <div class="auth-content">
                    <span></span>
                  </div>
                </div>
                <span class="card-sublines-inline"></span>
              </div>
              <div class="card-wraper float_left height-eight">
                <div class="company-card">
                  <div class="card-content">
                    <div class="card-content__row text-blue">
                      <label for="">应收(万元)：</label>
                      <span>0.00</span>
                    </div>
                    <div class="card-content__row text-orange">
                      <label for="">已收(万元)：</label>
                      <span>0.00</span>
                    </div>
                    <div class="card-content__row text-block">
                      <label for="">订金(万元)：</label>
                      <span>0.00</span>
                    </div>
                  </div>
                  <div class="card-flag-wrap">
                    <div class="card-flag">
                      <img src="static/img/bg-data/receive_s.png" alt="">
                      <span class="icon-desc">收入</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="bigdata-containers minWidth450" style="padding-top: 135px;" >
          <div class="card-view">
            <div class="box-top">
              <div class="card-wraper shdaw-blue">
                <p>逾期率：<span>{{pRate}}</span></p>
                <div class="company-card">
                  <div class="card-content" v-if="bigData.payable_info">
                    <div class="card-content__row1 text-blue">
                      <div>
                        <label for="">应付(万元)：</label>
                        <span :title="'应付(万元)：' + convertData(bigData.payable_info.payable_sum)">{{bigData.payable_info.payable_sum >= 0 ? convertData(bigData.payable_info.payable_sum) : '0.00'}}</span>
                      </div>
                      <div>
                        <label for="">笔数：</label>
                        <span>{{handleSum(1)}}</span>
                      </div>
                    </div>
                    <div class="card-content__row1 text-orange">
                      <div>
                        <label for="">已付(万元)：</label>
                        <span :title="'已付(万元)：' + convertData(bigData.payable_info.paid_sum)">{{convertData(bigData.payable_info.paid_sum)}}</span>
                      </div>
                      <div>
                        <label for="">笔数：</label>
                        <span>{{handleSum(2)}}</span>
                      </div>
                    </div>
                    <div class="card-content__row1 text-block">
                      <div>
                        <label for="">订金(万元)：</label>
                        <span :title="'订金(万元)：' + convertData(bigData.payable_info.p_deposit)">{{convertData(bigData.payable_info.p_deposit)}}</span>
                      </div>
                      <div>
                        <label for="">笔数：</label>
                        <span>{{handleSum(3)}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-flag-wrap">
                    <div class="card-flag">
                      <img src="static/img/bg-data/payment_s.png" alt="">
                      <span class="icon-desc">支付</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-mid">
              <div class="auth-wraper">
                <div class="auth-pic">
                  <img src="static/img/bg-data/self_s.png" alt="">
                </div>
                <div class="auth-content">
                  <span>{{bigData.company_name}}</span>
                </div>
              </div>
              <div class="supline">
                <span class="supline__top"></span>
                <span class="supline__bot"></span>
                <span class="supline__left"></span>
                <span class="supline__right"></span>
              </div>
              <div class="symbol-blue"></div>
              <div class="symbol-orange"></div>
            </div>
            <div class="box-bot">
              <div class="card-wraper shdaw-orange">
                <p>逾期率：<span>{{sRate}}</span></p>
                <div class="company-card">
                  <div class="card-content" v-if="bigData.receive_info">
                    <div class="card-content__row1 text-blue">
                      <div>
                        <label for="">应收(万元)：</label>
                        <span :title="'应收(万元)：' + convertData(bigData.receive_info.receivable_sum)">{{bigData.receive_info.receivable_sum > 0 ? convertData(bigData.receive_info.receivable_sum) : '0.00'}}</span>
                      </div>
                      <div>
                        <label for="">笔数：</label>
                        <span>{{handleSum(4)}}</span>
                      </div>
                    </div>
                    <div class="card-content__row1 text-orange">
                      <div>
                        <label for="">已收(万元)：</label>
                        <span :title="'已收(万元)：' + convertData(bigData.receive_info.received_sum)">{{convertData(bigData.receive_info.received_sum)}}</span>
                      </div>
                      <div>
                        <label for="">笔数：</label>
                        <span>{{handleSum(5)}}</span>
                      </div>
                    </div>
                    <div class="card-content__row1 text-block">
                      <div>
                        <label for="">订金(万元)：</label>
                        <span :title="'订金(万元)：' + convertData(bigData.receive_info.deposit_sum)">{{convertData(bigData.receive_info.deposit_sum)}}</span>
                      </div>
                      <div>
                        <label for="">笔数：</label>
                        <span>{{handleSum(6)}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-flag-wrap">
                    <div class="card-flag">
                      <img src="static/img/bg-data/receive_s.png" alt="">
                      <span class="icon-desc">收入</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bigdata-containers">
          <div class="card-group_s" :class="convertCss1(bigData.receive_contract_data)" v-if="bigData.receive_contract_data.length !== 0">
            <div class="dashed-line" :style="'height:' + (sContract.length * 124) + 'px'"></div>
            <div class="card-item" v-for="(item, index) in sContract" :key="index">
              <div class="card-partner">
                <div class="card-sublines_floatRight" v-if="item.show">
                  <div class="card-sublines__top"></div>
                  <div class="symbol-default"></div>
                </div>
                <div class="auth_floatRight" @click="handleShow(index, 's')">
                  <div class="auth-pic">
                    <img src="static/img/bg-data/cooper_s.png" alt="">
                  </div>
                  <div class="auth-content">
                    <span>{{item.company_name}}</span>
                  </div>
                </div>
                <span class="card-sublines-inline_floatRight"></span>
              </div>
              <div v-if="item.show" style="position: relative">
                <div v-for="(s, sIndex) in sData" :key='sIndex' class='card-wraper float_right card_list' :style="'position: absolute; left: 160px; top:' + (sIndex * 139 ) + 'px'">
                  <div class="card-item-company_name">
                    <p>合同：<span class='check_s' @click="handleChain(s, 's')">{{ s.contract_name }}</span></p>
                    <p>签订时间：<span>{{s.date_created || '2018-02-29'}}</span></p>
                  </div>
                  <div class="company-card">
                    <div class="card-content">
                      <div class="card-content__row text-blue">
                        <div>
                          <label for="">应付(万元)：</label>
                          <span :title="'应付(万元)：' + convertData(s.receivable_sum)">{{s.receivable_sum > 0 ? convertData(s.receivable_sum) : '0.00'}}</span>
                        </div>
                        <div>
                          <label for="">笔数：</label>
                          <span :title='s.receivable_count + "笔"'>{{s.receivable_count}}笔</span>
                        </div>
                      </div>
                      <div class="card-content__row text-orange">
                        <div>
                          <label for="">已付(万元)：</label>
                          <span :title="'已付(万元)：' + convertData(s.received_sum)">{{convertData(s.received_sum)}}</span>
                        </div>
                        <div>
                          <label for="">笔数：</label>
                          <span :title='s.received_count + "笔"'>{{s.received_count}}笔</span>                          
                        </div>
                      </div>
                      <div class="card-content__row text-block">
                        <div>
                          <label for="">订金(万元)：</label>
                          <span :title="'订金(万元)：' + convertData(s.deposit_sum)">{{convertData(s.deposit_sum)}}</span>
                        </div>
                        <div>
                          <label for="">笔数：</label>
                          <span :title='s.deposit_count + "笔"'>{{s.deposit_count}}笔</span>    
                        </div>
                      </div>
                    </div>
                    <div class="card-flag-wrap">
                      <div class="card-flag">
                        <img src="static/img/bg-data/payment_s.png" alt="">
                        <span class="icon-desc">支付</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="dashed-line1"></div> -->
          </div>
          <!-- <div class="card-group_s" v-if="bigData.receive_contract_data.length === 0">
            <div class="card-item">
              <div class="card-partner">
                <div class="card-sublines_floatRight">
                  <div class="card-sublines__top"></div>
                  <div class="symbol-default"></div>
                </div>
                <div class="auth_floatRight">
                  <div class="auth-pic">
                    <img src="static/img/bg-data/cooper_s.png" alt="">
                  </div>
                  <div class="auth-content">
                    <span></span>
                  </div>
                </div>
                <span class="card-sublines-inline_floatRight"></span>
              </div>
              <div class="card-wraper float_right height-eight card_list">
                <div class="company-card">
                  <div class="card-content">
                    <div class="card-content__row text-blue">
                      <label for="">应付(万元)：</label>
                      <span>0.00</span>
                    </div>
                    <div class="card-content__row text-orange">
                      <label for="">已付(万元)：</label>
                      <span>0.00</span>
                    </div>
                    <div class="card-content__row text-block">
                      <label for="">订金(万元)：</label>
                      <span>0.00</span>
                    </div>
                  </div>
                  <div class="card-flag-wrap">
                    <div class="card-flag">
                      <img src="static/img/bg-data/payment_s.png" alt="">
                      <span class="icon-desc">支付</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'assetList',
    data () {
      return {
        pContract: [],
        sContract: [],
        pData: [],
        sData: [],
        pRate: '0.00%',
        sRate: '0.00%',
        bigData: {
          payable_contract_data: [],
          receive_contract_data: [],
          receive_info: {},
          payable_info: {},
          company_name: ''
        }
      }
    },
    props: {
      'bid': {
        type: String,
        default: ''
      },
      'chainId': {
        type: String,
        default: ''
      }
    },
    created () {
      const that = this
      // 取总计资产数据
      let _url = this.chainId ? '/api/oth/data_portrait/digital_model/?company_id=' + (that.bid || localStorage.id) + '&chain_id=' + this.chainId : '/api/oth/data_portrait/digital_model/?company_id=' + (that.bid || localStorage.id)
      that.$ajax.get(_url).then(res => {
        // p_contract = 应付
        if (res.data.p_contract) {
          that.bigData.payable_contract_data = res.data.p_contract
          let pContract = that.handleArr(res.data.p_contract)
          that.pContract = pContract
        }
        // s_contract = 应收
        if (res.data.s_contract) {
          that.bigData.receive_contract_data = res.data.s_contract
          let sContract = that.handleArr(res.data.s_contract)
          that.sContract = sContract
        }
        that.bigData.receive_info = res.data
        that.bigData.payable_info = res.data
        that.bigData.company_name = res.data.company_name
        that.pRate = (res.data.p_over_rate.over_rate * 100).toFixed(2) + '%'
        that.sRate = (res.data.s_over_rate.over_rate * 100).toFixed(2) + '%'
      })
    },
    methods: { 
      convertData (data) {
        if (data) {
          let num = Number(data) / 100000
          return num < 0 ? '-' + this.toThousands(-num) : this.toThousands(num)
        } else {
          return '0.00'
        }
      },
      convertCss (list) {
        let _css = ''
        if (list.length === 0 || list.length === 1) {
          _css = ''
        } else {
          _css = 'hideline-one'
        }
        return _css
      },
      convertCss1 (list) {
        let _css1 = ''
        if (list.length === 0 || list.length === 1) {
          _css1 = ''
        } else {
          _css1 = 'hideline-one1'
        }
        return _css1
      },
      // 展示合同
      handleShow (i, type) {
        const that = this
        if (type === 'p') {
          let pContract = that.pContract
          if (pContract[i].show) {
            pContract[i].show = false
          } else {
            pContract.forEach(val => {
              val.show = false
            })
            pContract[i].show = true
          }
          let pData = that.bigData.payable_contract_data
          let arr = []
          pData.forEach(val => {
            if (val.company_id === pContract[i].company_id) {
              if(!that.chainId) {
                arr.push(val)
              } else {
                if(val.chain_id === that.chainId) {
                  arr.push(val)
                }
              }
            }
          })
          that.pContract = pContract
          that.pData = arr
        } else if (type === 's') {
          let sContract = that.sContract
          if (sContract[i].show) {
            sContract[i].show = false
          } else {
            sContract.forEach(val => {
              val.show = false
            })
            sContract[i].show = true
          }
          let sData = that.bigData.receive_contract_data
          let arr = []
          sData.forEach(val => {
            if (val.company_id === sContract[i].company_id) {
              arr.push(val)
              if(!that.chainId) {
                arr.push(val)
              } else {
                if(val.chain_id === that.chainId) {
                  arr.push(val)
                }
              }
            }
          })
          this.sContract = sContract
          this.sData = arr
        }
        this.$forceUpdate()
      },
      // 去除重复企业
      handleArr (arr) {
        const that = this
        let uniChain = []
        if (that.chainId) {
          arr.forEach(val => {
            if (val.chain_id === that.chainId) {
              uniChain.push(val)
            }
          })
        } else {
          uniChain = arr
        }
        let uni = []
        for(let i = 0; i < uniChain.length; i++){
          for(let j = i + 1; j < arr.length; j++){
            if (arr[i].company_id === arr[j].company_id) {
              j = ++i
            }
          }
          uni.push(arr[i])
        }
        return uni
      },
      // 跳转链式记账
      handleChain (el, key) {
        let str = '#/chain_app/'
        if (el.chain_type === '2') {
          str += 'payment_chain?id='
        } else {
          str += 'receive_chain?id='
        }
        window.open(str + el.chain_id, 'blank')
      },
      // 计算总额
      handleSum (key) {
        const that = this
        let p = that.bigData.payable_contract_data
        let s = that.bigData.receive_contract_data
        let num = 0
        switch (key) {
          case 1:
          p.forEach(val => {
            num += val.receivable_count
          })
          break
          case 2:
          p.forEach(val => {
            num += val.received_count
          })
          break
          case 3:
          p.forEach(val => {
            num += val.deposit_count
          })
          break
          case 4:
          s.forEach(val => {
            num += val.receivable_count
          })
          break
          case 5:
          s.forEach(val => {
            num += val.received_count
          })
          break
          case 6:
          s.forEach(val => {
            num += val.deposit_count
          })
          break
          default:
          num = 0
          break
        }
        return num + '笔'
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
  .check_o {
    color: @card-text_blue;
    text-decoration: underline;
    cursor: pointer;
  }
  .check_s {
    color: @card-text_orange;
    text-decoration: underline;
    cursor: pointer;
  }
  .bigdata-analyse1 {
    .card-wraper {
      width: 320px;
      height: 124px;
      background: rgba(255,255,255,1);
      border: 1px solid rgba(240,248,255,1);
      border-radius: 4px;
      padding: 3px 10px;
      margin: 0 auto;
      .company-card {
        display: flex;
        justify-content: space-between;
        .card-content {
          width: 250px;
          .card-content__row1 {
            display: flex;
            margin: 5px 0;
            div:first-child {
              width: 65%;
            }
            div:last-child {
              width: 35%;
            }
            &.text-block {
              color: @card-text_block
            }
            &.text-blue {
              color: @card-text_blue
            }
            &.text-orange {
              color: @card-text_orange
            }
            &.text-disabled {
              color: @card-text_disable
            }
          }
        }
      }
      &.shdaw-blue {
        box-shadow: @card-box-shadow_blue
      }
      &.shdaw-orange {
        box-shadow: @card-box-shadow_orange
      }
      .card-content {
        font-size: 12px;
        // width: 240px;
        .card-content__row {
          margin: 5px 0;
          // width: 130px;
          display: flex;
          &>div:first-child {
            width: 65%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &>div {
            width: 35%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &.text-block {
            color: @card-text_block
          }
          &.text-blue {
            color: @card-text_blue
          }
          &.text-orange {
            color: @card-text_orange
          }
          &.text-disabled {
            color: @card-text_disable
          }
          span {
            cursor: pointer;
          }
        }
      }
      .card-flag-wrap {
        margin: 0 auto;
        .card-flag {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          .icon-desc {
            display: block;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
    .height-eight {
      height: 80px;
    }
    .bigdata-wraper {
      width: 100%;
      height: 1600px;
      background: #fff;
      overflow: hidden;
      .bigdata {
        display: flex;
        justify-content: center;
        margin: 25px 0px;
        .bigdata-containers {
          position: relative;
          &.minWidth450 {
            width: 450px;
            position: relative;
            .card-wraper {
              height: 100px;
              &>p:first-child {
                line-height: 20px;
                padding: 0 8px;
                text-align: right;
                font-size: 14px;
                color: #666;
                span {
                  color: #333;
                }
              }
              // width: 320px;
            }
          }
          // width: 400px;
          .card-view {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            .box-mid {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 290px;
              position: relative;
              .auth-wraper {
                .auth-pic {
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
                .auth-content {
                  margin-top: 8px;
                  color: @card-text_nomal
                }
              }
              .supline {
                position: absolute;
                .supline__top {
                  position: absolute;
                  display: block;
                  height: 90px;
                  margin-top: -136px; 
                  border: .5px dashed #0C8DFF;
                }
                .supline__left {
                  position: absolute;
                  display: block;
                  width: 58px;
                  margin-left: -220px;
                  border: .5px dashed #0C8DFF;
                  height: 0;
                  top: -200px;
                  transform: rotate(180deg);
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
                    left: -6.5px;
                    top: 50%;
                    margin-top: -5.5px;
                    width: 11px;
                    height: 11px;
                    background: #0c8dff;
                    border: 1px solid #0c8dff;
                    border-radius: 50%;
                  }
                }
                .supline__bot {
                  position: absolute;
                  display: block;
                  height: 90px;
                  margin-bottom: -140px;
                  bottom: 0;
                  border: 0.5px dashed rgba(235,97,0,1);;
                }
                .supline__right {
                  position: absolute;
                  display: block;
                  width: 50px;
                  margin-left: 171px;
                  border: 0.5px dashed rgba(235,97,0,1);
                  transform: rotate(180deg);
                  top: 200px;
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
                    left: 50px;
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
          .card-group_s {
            // overflow: hidden;
            position: relative;
            top: 69%;
            transform: translateY(-50%);
            .card-item {
              position: relative; 
              padding: 12px 0;
              margin: 20px 2px 20px 0;
              min-height: 124px;
              width: 320px;
              &.verticalAligh {
                transform: translateY(62%);
              }
              & .card-wraper {
                // padding-top: 32px;
                width: 320px;
                position: relative;
                box-shadow: @card-box-shadow_blue;
                &.float_left {
                  margin-left: -162px;
                }
                &.float_right {
                  margin-right: 15px;
                }
              }
              .card-partner {
                .card-sublines {
                  position: absolute;
                  top: 50%;
                  right: 131px;
                  .card-sublines__top {
                    width: 30px;
                    height: 1px;
                    margin: 0 2px 0 0;
                    border-top: 1px dashed rgba(153,153,153,1); 
                    border-right: 1px dashed rgba(153,153,153,1); 
                  }
                  .symbol-default {
                    position: absolute;
                    top: 0;
                    margin-top: -5.5px;
                    right: -4.5px;
                    width: 11px;
                    height: 11px;
                    border:1px solid #999999;
                    background: #fff;
                    border-radius:50%;
                  }
                }
                .card-sublines_floatRight {
                  position: absolute;
                  top: 50%;
                  left: 131px;
                  .card-sublines__top {
                    width: 30px;
                    height: 1px;
                    margin: 0 2px 0 0;
                    border-top: 1px dashed rgba(153,153,153,1); 
                    border-right: 1px dashed rgba(153,153,153,1); 
                  }
                  .symbol-default {
                    position: absolute;
                    top: 0;
                    margin-top: -5.5px;
                    left: -4.5px;
                    width: 11px;
                    height: 11px;
                    border:1px solid #999999;
                    background: #fff;
                    border-radius:50%;
                    z-index: 2
                  }
                }
                .card-sublines-inline {
                  position: absolute;
                  height: 0;
                  border: 0.5px dashed rgba(12,141,255,1);
                  width: 126px;
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
                .card-sublines-inline_floatRight {
                  position: absolute;
                  height: 0;
                  border: 0.5px dashed rgba(235,97,0,1);
                  width: 126px;
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
                .auth {
                  position: absolute;
                  z-index: 1;
                  right: 15px;
                  top: 21px;
                  .auth-pic {
                    width: 60px;
                    height: 60px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(238,238,238,1);
                    border-radius:50%;
                    text-align: center;
                    margin: 0 auto;
                    img {
                      margin-top: 7.5px;
                    }
                  }
                  .auth-content {
                    font-size: 14px;
                    color: #666;
                    text-align: center;
                    width: 96px;
                  }
                }
                .auth_floatRight {
                  position: absolute;
                  z-index: 1;
                  left: 15px;
                  top: 21px;
                  .auth-pic {
                    width: 60px;
                    height: 60px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(238,238,238,1);
                    border-radius:50%;
                    text-align: center;
                    margin: 0 auto;
                    img {
                      margin-top: 7.5px;
                    }
                  }
                  .auth-content {
                    font-size: 14px;
                    color: #666;
                    text-align: center;
                    width: 96px;
                  }
                }
              }
              .card-item-company_name {
                width: 100%;
                white-space: nowrap;
                p {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-size: 14px;
                }
                p:first-child {
                  line-height: 2;
                }
                p:last-child {
                  span {
                    color: #999;
                  }
                }
              }
            }
          }
          .dashed-line {
            position: absolute;
            width: 2px;
            left: 0;
            top: 62px;
            border-left: 2px dashed #EB6100;
            height: calc(100% - 124px);
            z-index: 9 !important;
          }
          .dashed-line1 {
            position: absolute;
            width: 2px;
            left: -1px;
            bottom: 0;
            background: #fff;
            height: 81px;
            z-index: 9 !important;
          }
          .dashed-line2 {
            position: absolute;
            width: 2px;
            right: 0;
            height: 82px;
            top: 62px;
            border-left: 2px dashed #0C8DFF;
            z-index: 9 !important;
          }
          .dashed-line3 {
            position: absolute;
            width: 2px;
            right: 0;
            bottom: 0;
            background: #fff;
            height: 81px;
            z-index: 9 !important;
          }
        }
      }
    }
    .card_list {
      .card-content {
        width: 240px;
        .card-content__row {
          width: 100%;
          display: flex;
          &>div:first-child {
            width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &>div:last-child {
            width: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>