<template>
  <div class="payableOne">
    <button class="fixed_btn" @click="toCreate"><i class="el-icon-plus"></i>创建销售记账</button>
    <div v-if='chain_list.length > 0' class="contract-menu">
      <div class="contract-menu__list" v-for="(item, index) in chain_list" :key="index">
        <div class="contract-menu__header">
          <div class="contract-menu--title">
            <label for=""><img src="static/img/chain/number.png" alt="">项目编号:</label>
            <span>{{item.number}}</span>
            <label v-if="item.finance_status"><img class="_clock" src="static/img/chain/_clock.png" alt="">{{convertType(item.finance_status)}}</label>
          </div>
          <div class="menu-operater">
            <button @click="toChain(item.id)" class="menu__btn menu__btn_confirm">查看</button>
            <button v-if="role !== 'person'" class="menu__btn menu__btn_remove" @click="moveIn(item.id)">删除</button>
          </div>
        </div>
        <div class="contract-menu__main">
          <div class="contract-group">
            <h4>销售项目:</h4>
            <div class="contract-group__row" v-if="item.sales_contract.length > 0">
              <div class="contract-group__row-item">
                <img src="static/img/chain/chain_circle_m_y.png" class="prefix"></span>
                <span>{{ item.sales_contract[0].name }}</span>
              </div>
              <div class="contract-group__row-item">
                <label for="">合作企业:</label>
                <span @click="toIndex(item.sales_contract[0].partner_company, item.sales_contract[0].has_partner_company, item.sales_contract[0].has_info)" :class="(!item.sales_contract[0].has_partner_company && !item.sales_contract[0].has_info) ? 'unregister' : ''" class="color_orange prefix-text">
                  <img :src=" (!item.sales_contract[0].has_partner_company && !item.sales_contract[0].has_info) ? 'static/img/chain/linker_grey.png' : 'static/img/chain/linker_orange.png'" alt="">{{ item.sales_contract[0].partner_company_name }}
                </span>
              </div>
              <div class="contract-group__row-item">
                <label for="">签订时间:</label>
                <span>{{ item.sales_contract[0].date_created }}</span>
              </div>
            </div>
            <div v-if='item.sales_contract.length === 0' class="contract-group__row empty">
              <span>暂无数据</span>
            </div>
          </div>
          <div class="contract-group">
            <h4>关联采购:</h4>
            <div class="contract-group__row" v-if='item.purchase_contract.length > 0' v-for="(v, i) in item.purchase_contract" :key="i">
              <div class="contract-group__row-item">
                <img src="static/img/chain/chain_circle_m_b.png" class="prefix"></span>
                <span>{{ v.name }}</span>
              </div>
              <div class="contract-group__row-item">
                <label for="">合作企业:</label>
                <span  @click="toIndex(v.partner_company, v.has_partner_company, v.has_info)" :class="(!v.has_partner_company && !v.has_info) ? 'unregister' : ''" class="color_blue prefix-text">
                  <img :src="v.has_partner_company ? 'static/img/chain/linker_blue.png' : 'static/img/chain/linker_grey.png'" alt="">{{ v.partner_company_name }}
                </span>
              </div>
              <div class="contract-group__row-item">
                <label for="">签订时间:</label>
                <span>{{ v.date_created }}</span>
              </div>
            </div>
            <div v-if='item.purchase_contract.length === 0' class="contract-group__row empty">
              <span>暂无数据</span>
            </div>
          </div>
          <div class="contract-group _flex">
            <div class="contract-tickets">
              <h4 style="margin-left:-10px">应收类:</h4>
              <div class="tickets-group">
                <div class="tickets-item">
                  <div class="tickets-icon">
                    <img src="static/img/tickets/yinquan.png" alt="">
                  </div>
                  <div class="tickets-content">
                    <div class="tickets-content__row">
                      <label for="">总额(万):</label>
                      <span>{{convertData(item.ticket_bar.bank_ticket.sum) || 0}}</span>
                    </div>
                    <div class="tickets-content__row">
                      <label for="">数量(张):</label>
                      <span>{{item.ticket_bar.bank_ticket.count || 0}}</span>
                    </div>
                  </div>
                </div>
                <div class="tickets-item">
                  <div class="tickets-icon">
                    <span class="prefix-line"></span>
                    <img src="static/img/tickets/shangquan.png" alt="">
                  </div>
                  <div class="tickets-content">
                    <div class="tickets-content__row">
                      <label for="">总额(万):</label>
                      <span>{{convertData(item.ticket_bar.business_ticket.sum) || 0}}</span>
                    </div>
                    <div class="tickets-content__row">
                      <label for="">数量(张):</label>
                      <span>{{item.ticket_bar.business_ticket.count || 0}}</span>
                    </div>
                  </div>
                </div>
                <div class="tickets-item">
                  <div class="tickets-icon">
                    <span class="prefix-line"></span>
                    <img src="static/img/tickets/shuquan.png" alt="">
                  </div>
                  <div class="tickets-content">
                    <div class="tickets-content__row">
                      <label for="">总额(万):</label>
                      <span>{{convertData(item.ticket_bar.digital_ticket.sum) || 0}}</span>
                    </div>
                    <div class="tickets-content__row">
                      <label for="">数量(张):</label>
                      <span>{{item.ticket_bar.digital_ticket.count || 0}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="contract-tickets">
              <h4>应付类:</h4>
              <div class="tickets-group">
                <div class="tickets-item">
                  <div class="tickets-icon">
                    <img src="static/img/tickets/hongtiao.png" alt="">
                  </div>
                  <div class="tickets-content">
                    <div class="tickets-content__row">
                      <label for="">总额(万):</label>
                      <span>{{convertData(item.ticket_bar.red_bar.sum) || 0}}</span>
                    </div>
                    <div class="tickets-content__row">
                      <label for="">数量(张):</label>
                      <span>{{item.ticket_bar.red_bar.count || 0}}</span>
                    </div>
                  </div>
                </div>
                <div class="tickets-item">
                  <div class="tickets-icon">
                    <span class="prefix-line"></span>
                    <img src="static/img/tickets/huangtiao.png" alt="">
                  </div>
                  <div class="tickets-content">
                    <div class="tickets-content__row">
                      <label for="">总额(万):</label>
                      <span>{{convertData(item.ticket_bar.yellow_bar.sum) || 0}}</span>
                    </div>
                    <div class="tickets-content__row">
                      <label for="">数量(张):</label>
                      <span>{{item.ticket_bar.yellow_bar.count || 0}}</span>
                    </div>
                  </div>
                </div>
                <div class="tickets-item">
                  <div class="tickets-icon">
                    <span class="prefix-line"></span>
                    <img src="static/img/tickets/baitiao.png" alt="">
                  </div>
                  <div class="tickets-content">
                    <div class="tickets-content__row">
                      <label for="">总额(万):</label>
                      <span>{{convertData(item.ticket_bar.white_bar.sum) || 0}}</span>
                    </div>
                    <div class="tickets-content__row">
                      <label for="">数量(张):</label>
                      <span>{{item.ticket_bar.white_bar.count || 0}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contract-menu__footer">
          <div class="contract-diamond">
            <div class="diamond-content">
              <span class="diamond-content__cutline"></span>
              <div class="diamond-group">
                <div v-for="(_dia, i) in item.diamond" :key="i" class="diamond-group__item">
                  <el-tooltip  placement="top" v-if="i === 0 && _dia.status === '2'">
                    <div slot="content">
                      <p class="tooltips--warning">销售订单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                    </div>
                    <!-- <img src="static/img/chain/zuanshan_o.gif"> -->
                    <div class="hasWarning">
                      <img src="static/img/chain/zuan_o.png" alt="">
                    </div>
                  </el-tooltip>
                  <img v-if="i === 0 && (_dia.status === '1' || _dia.status === '0')" src="static/img/chain/zuan_o.png" alt="">
                  <el-tooltip  placement="top" v-if="i !== 0 && i !== 5 && _dia.status === '0' && Number(_dia.days) < -3">
                    <div slot="content">
                      <p class="tooltips--warning" v-if="i === 1">销售出货单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                      <p class="tooltips--warning" v-if="i === 2">销售运单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                      <p class="tooltips--warning" v-if="i === 3">销售入库单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                      <p class="tooltips--warning" v-if="i === 4">销售结算单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                      <p class="tooltips--warning" v-if="i === 6">采购运单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                      <p class="tooltips--warning" v-if="i === 7">采购入库单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                      <p class="tooltips--warning" v-if="i === 8">采购结算单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                    </div>
                    <div class="hasWarning">
                      <img src="static/img/chain/zuan_g.png" alt="">
                    </div>
                  </el-tooltip>
                  <img v-if="i !== 0 && i !== 5 && _dia.status === '0' && Number(_dia.days) >= -3" src="static/img/chain/zuan_g.png" alt="">
                  <img v-if="i !== 0 && i !== 5 && _dia.status === '1'" :src="i < 5 ? 'static/img/chain/zuan_o.png' : 'static/img/chain/zuan_b.png'" alt="">
                  <el-tooltip  placement="top" v-if="i === 5 && _dia.status === '2'">
                    <div slot="content">
                      <p class="tooltips--warning">采购订单已过期<strong class="text">{{Math.abs(_dia.days)}}</strong>天，请尽快填写</p>
                    </div>
                    <!-- <img src="static/img/chain/zuanshan_b.gif"> -->
                    <div class="hasWarning">
                      <img src="static/img/chain/zuan_b.png" alt="">
                    </div>
                  </el-tooltip>
                  <img v-if="i === 5 && _dia.status === '1'" src="static/img/chain/zuan_b.png" alt="">
                  <img v-if="i === 5 && _dia.status === '0'" src="static/img/chain/zuan_g.png" alt="">
                  <!-- <img :src="_dia ? ((i < 5 )? 'static/img/chain/zuan_o.png' : 'static/img/chain/zuan_b.png'): 'static/img/chain/zuan_g.png'" alt=""> -->
                  <p>{{diamondList[i]}}</p>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>  
    </div>
    <div v-else class="empty_one">
      暂无数据
    </div>
    <el-dialog
      title="回收站"
      :visible.sync="dialogVisible"
      width="30%">
      <span>移除后可在回收站中查看，确定？</span>
      <span slot="footer" class="dialog-footer">
        <button class="c_btn c_cancel" @click="dialogVisible = false">取 消</button>
        <button class="c_btn c_sure" type="primary" @click="sureMove">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        dialogVisible: false,
        chain_list: [],
        diamondList: ['销售', '销售出货', '销售运输', '销售验收', '销售结算', '采购', '采购运输', '采购验收', '采购结算'],
        moveId: ''
      }
    },
    props: ['role'],
    mounted () { 
      var that = this
      // const loading = this.$loading({
      //   lock: true,
      //   text: '拼命加载中',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.8)'
      // })
      that.$ajax.get('/api/chain/chain_list/?type=' + 1).then(res => {
        that.chain_list = res.data.sort(that.$sortChain)
        that.chain_list.forEach(element => {
          element.warn_index = []
          element.diamond.forEach((el, index) => {
            if (!el) {
              element.warn_index.push(index)
            }
          })
        })
        // loading.close()
      })
    },
    methods: {
      sureMove () {
        this.$ajax.delete(`/api/chain/${this.moveId}/recycle/`).then(res => {
          if (res.status === 204) {
            this.dialogVisible = false
            let arr = this.chain_list.reduce((prev, next) => {
              if(next.id !== this.moveId) {
                prev.push(next)
              }
              return prev
            }, [])
            this.chain_list = arr
          }
        })
      },
      moveIn (id) {
        this.moveId = id
        this.dialogVisible = true
      },
      toCreate () {
        this.$router.push({
          path: '/chain_app/receive_chain_create'
        })
      },
      toChain (chain_id) {
        this.$router.push({
          path: '/chain_app/receive_chain?id=' + chain_id
        })
        //this.$scrollToTop()
      },
      convertContractNumber (obj) {
        let _result = ''
        if (!obj) _result = `HT${new Date().getTime()}`
        else  _result = `HT${new Date(obj.date_created).getTime()}`
        return _result
      },
      toIndex (id, flag, key) {
        // @flag has_partner_company
        // @key has_info
        if (!flag && !key) return
        window.open('#/enterpriseBlog?bid=' + id + '&chainlist=2&key=' + (key ? '1' : '0') + '&f=' + (flag ? '1' : '0'))
      },
      convertData (data) {
        let count = Number(data) * Math.pow(10, -4)
        return this.toThousands(count) 
      },
      convertType (type) {
        if (!type) return ''
        let _result = ''
        if (Number(type) === 0) {
          _result = '应收融资中...'
        } else if (Number(type) === 1) {
          _result = '订单融资中...'
        } else if (Number(type) === 2) {
          _result = '库存融资中...'
        } else {
          _result = '贸易融资中...'
        }
        return _result
      }
    }
  }
</script>
<style lang='less' scope>
@media screen and (max-width: 1840px) {
  .contract-tickets {
    border: none !important;
    &:last-of-type {
      h4 {
        margin-left: -10px;
      }
    }
  }
  ._flex {
    display: block !important;
  }
  .tickets-item {
    margin: 5px 8px 0 21px !important;
    flex: 1;
  }
}
.color_orange {
  color: #e87626
}
.color_blue {
  color: #0C8DFF
}
.payableOne {
  background:#ffffff;
  width: 100%;
  height: auto;
  padding: 20px 30px 67px 30px;
  .empty_one {
    font-size: 18px;
    color: #999;
    font-weight: bolder;
    line-height: 42px;
    text-align: center 
  }
  .fixed_btn {
    border:1px solid #eb6100;
    border-radius:2px;
    width:176px;
    height:32px;
    font-family:PingFangSC-Regular;
    font-size:14px;
    color:#eb6100;
    letter-spacing:0;
    text-align:center;
    background: none;
    margin-bottom: 8px;
    outline: none;
    i {
      display: inline-block;
      margin-right: 15px;
    }
  }
  .contract-menu {
    margin-top: 10px;
    .contract-menu__list {
      padding: 20px 18px 10px 18px;
      margin-bottom: 10px;
      border: 1px solid #e1e6f0;
      box-shadow: 0 0 10px 1px #e1e6f0;
      border-radius: 2px;
      .contract-menu__header {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #e1e6f0;
        padding-bottom: 10px;
        .contract-menu--title {
          color: #eb6100;
          label {
            margin-right: 8px;
            font-weight: bolder;
            img {
              vertical-align: text-bottom;
              margin-right: 8px;
            }
          }
          span {
            font-weight: bolder;
          }
          ._clock {
            margin-left: 80px;
          }
        }
        .menu-operater {
          .menu__btn {
            border-radius: 2px;
            width: 112px;
            line-height: 30px;
            font-size: 12px;
            letter-spacing: 0;
            text-align: center;
            margin-left: 25px; 
            cursor: pointer;
            outline: none;
            border: none;
            &.menu__btn_confirm {
              background: #e87626;
              color: #fff;  
            }
            &.menu__btn_remove {
              background: #b8b4b4;
              color: #fff;
            }
          }
        }
      }
      .contract-menu__main {
        font-size: 14px;
        color:rgba(51,51,51,1);
        .contract-group {
          &._flex {
            display: flex;
            flex-wrap: nowrap;
          }
          padding: 10px 20px 0px 20px;
          h4 {
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
         .contract-group__row {
           display: flex;
           padding-bottom: 13px;
           &.empty {
            span {
              color: #999;
              font-size: 14px;
              font-weight: bolder;
              margin-left: 107px;
            }
           }
           &:last-of-type {
             border-bottom: 1px dashed #e1e6f0;
           }
           .contract-group__row-item {
            flex: 1;
            text-align: left;
            margin-left: 80px;
             .prefix {
               width: 14px;
               vertical-align: middle;
               margin-right: 8px;
             }
             label {
               margin-right: 8px;
             }
             .prefix-text {
              img {
                width: 14px;
                margin-right: 8px;
                vertical-align: middle;
              }
              text-decoration: underline;
              cursor: pointer;
              &.unregister {
                text-decoration: none;
                color: #666;
                cursor: auto;
                .prefix-icon {
                  margin-left: 14px;
                  cursor: pointer;
                }
              }
             }
           }
         }
         .contract-tickets {
           color: #666;
           padding-left: 13px; 
           flex: 1 0;
            &:first-of-type {
              border-right: 1px dashed #e1e6f0;
              margin-bottom: 10px;
            }
            .tickets-group {
              display: flex;
              margin: 0 10px;
              .tickets-item {
                display: flex;
                align-items: center;
                margin: 5px 28px 0 8px;
                .tickets-icon {
                  img {
                    width: 40px;
                    margin-right: 6px
                  }
                  .prefix-line {
                    height: 32px;
                    border-left: 1px dashed #e1e6f0;
                    position: absolute;
                    margin-left: -16px;
                  }
                }
                .tickets-content {
                  .tickets-content__row {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    label, span {
                      font-weight: 400;
                    }
                    span {
                      display: inline-block;
                      min-width: 90px;
                      text-align: right;
                    }
                    label {
                      display: inline-block;
                      min-width: 60px;
                      text-align: right;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .contract-menu__footer {
        border-top: 1px dashed #e1e6f0;
        margin: 0 20px;
        .contract-diamond {
          .diamond-content {
            margin-top: 25px;
            position: relative;
            .diamond-content__cutline {
              width: 90%;
              position: absolute;
              border: 1px dashed #e1e6f0;
              display: block;
              left: 5%;
              top: 8px;
            }
            .diamond-group {
              display: flex;
              justify-content: space-between;
              .diamond-group__item {
                flex: 1;
                text-align: center;
                img {
                  position: relative;
                  top: -10px;
                }
                p {
                  color: #666;
                  font-size: 14px;
                  margin-top: -18px;
                }
                .hasWarning {
                  position: relative;
                }
                .hasWarning::after {
                  content: '';
                  position: absolute;
                  width: 50px;
                  height: 50px;
                  top: -10px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: url('../../../../static/img/chain/zuan_t.png');
                  animation: diamonLight 1s ease-in-out 0s infinite;
                  -moz-animation: diamonLight 1s ease-in-out 0s infinite;
                  -webkit-animation: diamonLight 1s ease-in-out 0s infinite;
                }
              }
            }
            @keyframes diamonLight {
              0%{
                opacity: 0;
              }
              100%{
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
} 
</style>