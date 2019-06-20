<template>
  <div class="order_usage">
    <div class="demand">
      <div class="show_title">
        <h3>融资用途</h3>
      </div>
      <div class="show_list">
        <div class="get_sum">
          <div>
            <div>
              <h3>累计订单总额：{{selSum}}元</h3>
            </div>
          </div>
          <div>
          </div>
          <button class="btn_create" @click="handleModel"><i class="el-icon-plus"></i>添加融资用途订单</button>
        </div>
        <div v-for="(item, index) in selList" v-if="selList.length !== 0" :key='index' class="open_sel_item sel_item_list">
          <div class="list">
            <div class="sel_line">
              <div class="show_section">
                <ul>
                  <li><span>采购项目：</span><p @click="handleChain(item)">{{item.name}}</p></li>
                  <li><span>销售企业：</span><p @click="handleBusiness(item)">{{item.partner_company_name}}</p></li>
                </ul>
              </div>
            </div>
            <div class="order_title" v-if="item.order">
              <span>订单信息</span>
            </div>
            <ul class="order_info" v-if="item.order">
              <li v-for="(order, index1) in item.showOrder" :key='index1'>
                <div class="order_data">
                  <div>
                    <p>订单名称：</p>
                    <span>{{order.name}}</span>
                  </div>
                  <div>
                    <span>交货日期：</span>
                    <span>{{order.deliver_date}}</span>
                  </div>
                  <div>
                    <span>结算日期：</span>
                    <span>{{order.settlement_date}}</span>
                  </div>
                  <div>
                    <span>订单金额：</span>
                    <span>{{order.amount}}</span>
                    <span>元</span>
                  </div>
                  <div>
                    <span @click='handleDelete(index, index1, order)' style="color: #ff3400">删除</span>
                  </div>
                </div>
                <div class="deposit_line">
                  <div class="deposit_title">
                    <img src="../../../../../static/img/chain/chain_circle_m_b.png" alt="">
                    <span>订金信息</span>
                    <p v-if="order.deposit">订金总额：<a href="javascript:void(0)" v-if="order.deposit">{{getDepositSum(order.deposit)}}元</a></p>
                  </div>
                </div>
                <div class="deposit_list" v-if='order.deposit'>
                  <div class="deposit_detail">
                    <div v-for="(deposit, index2) in order.deposit" :key='index2'>
                     <div>
                        <span>订金支付方式：</span>
                        <span>{{typeList[deposit.type]}}</span>
                      </div>
                      <div>
                        <span>票据金额：</span>
                        <span>{{deposit.amount}}元</span>
                      </div>
                      <div>
                        <span>{{deposit.payment_date ? '汇票到期日：' : '支付日期：'}}</span>
                        <span>{{deposit.payment_date || deposit.date_created}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="is_null" v-if="!order.deposit">暂无订金</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="second_list_none" v-if="selList.length === 0">
          <img src="../../../../../static/img/other/none.png" alt="">
          <h4>还没添加融资用途，请选择需要融资的采购订单</h4>
        </div>
      </div>
    </div>
    <!-- <div class="demand">
      <div class="show_title">
        <h3>融资需求</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>期望融资金额：</span>
          <input type="text" placeholder="金额不能大于最大融资限额" v-model="amount">
          <span>（元）</span>
        </div>
        <div class="inpit_lint">
          <span>期望融资时间：</span>
          <el-date-picker
            v-model="exceptDate"
            type="date"
            placeholder="选择日期"
            size='small'>
          </el-date-picker>
        </div>
        <div class="inpit_lint">
          <span>期望还款时间：</span>
          <el-date-picker
            v-model="repaymentDate"
            type="date"
            placeholder="选择日期"
            size='small'>
          </el-date-picker>
        </div>
      </div>
    </div> -->
    <div class="btn_list">
      <div @click="handleNext">下一步</div>
    </div>
    <!-- 选择列表弹框 -->
    <el-dialog :visible.sync="showModal" width="1278px">
      <div v-for="(item, index) in checkList" :class="{open_class: item.slide === 1}" v-if="checkList.length !== 0 && item.show" :key='index' class="open_sel_item">
        <div class="sel_line">
          <div class="show_section">
            <ul>
              <li><span>采购项目：</span><p @click="handleChain(item)">{{item.name}}</p></li>
              <li><span>交易企业：</span><p @click="handleBusiness(item)">{{item.partner_company_name}}</p></li>
              <li><span>创建时间：</span><p>{{item.create_time}}</p></li>
              <li>
                <!-- <button :class="item.sel ? 'open' : 'no_open'">{{item.sel ? '选择' : '取消选择'}}</button> -->
                <button @click="handleSlide(index)" class="open">{{item.slide ? selectName = '收起' : selectName = '查看'}}</button>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="order_title" v-if="index === limit"> -->
        <div class="order_title" v-if="item.slide">
          <span>订单信息</span>
        </div>
        <ul class="order_info" v-if="item.slide">
          <li v-for="(order, index1) in item.order" :key='index1'>
            <div class="order_data">
              <div>
                <p>
                  订单名称：
                </p>
                <span>{{order.name}}</span>
              </div>
              <div>
                <span>交货日期：</span>
                <span>{{order.deliver_date}}</span>
              </div>
              <div>
                <span>结算日期：</span>
                <span>{{order.settlement_date}}</span>
              </div>
              <div>
                <span>订单金额：</span>
                <span>{{order.amount}}</span>
                <span>元</span>
              </div>
              <div class="order_data_btn">
                <button @click="handleOrderSelect(index, index1, order.sel)">{{!order.sel ? '选择' : '取消'}}</button>
                <!-- <el-checkbox-group style="width:100px;height:24px;" @change="handleOrderSelect($event)" v-model="checkboxGroup" size="mini" text-color='#fff' fill="#e87626">
                  <el-checkbox-button :label="order.id" :key="index1">选择</el-checkbox-button>
                </el-checkbox-group> -->
              </div>
            </div>
            <div class="deposit_line">
              <div class="deposit_title">
                <img src="../../../../../static/img/chain/chain_circle_m_b.png" alt="">
                <span>订金信息</span>
                <p v-if="order.deposit">订金总额：<a href="javascript:void(0)" v-if="order.deposit">{{getDepositSum(order.deposit)}}元</a></p>
              </div>
            </div>
            <div class="deposit_list" v-if='order.deposit'>
              <div class="deposit_detail">
                <div v-for="(deposit, index2) in order.deposit" :key='index2'>
                    <div>
                      <span>订金支付方式：</span>
                      <span>{{typeList[deposit.type]}}</span>
                    </div>
                    <div>
                      <span>票据金额：</span>
                      <span>{{deposit.amount}}元</span>
                    </div>
                    <div>
                      <span>{{deposit.payment_date ? '汇票到期日：' : '支付日期：'}}</span>
                      <span>{{deposit.payment_date || deposit.date_created}}</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="is_null" v-if="!order.deposit">暂无订金</div>
          </li>
        </ul>
      </div>
      <div class="btn_wrap" v-if="checkList.length !== 0">
        <button @click="handleSelect">确定</button>
      </div>
      <div v-if="checkList.length === 0" style="color: #999;text-align: center">没有可以用于融资的合同。</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'pledge',
  data () {
    return {
      showModal: false,
      // 收起展开
      selectName: '',
      limit: -1,
      checkboxGroup: [],
      checkList: [],
      typeList: ['', '现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）'],
      selList: [],
      repaymentDate: '',
      exceptDate: '',
      amount: '',
      // 选择订单
      radio: ''
    }
  },
  // updated () {
  //   let a = this.$parent
  //   if (a.steps[0].emitData.amount) {
  //     this.selList = a.steps[0].emitData.list
  //     this.exceptDate = a.steps[0].emitData.except_date
  //     this.repaymentDate = a.steps[0].emitData.repayment_date
  //     this.amount = a.steps[0].emitData.amount
  //   }
  // },
  mounted () {
    const that = this
    this.$ajax.get('/api/financing/payable_order_list/').then(res => {
      if (res.status === 200) {
        res.data.forEach((val, index) => {
          val.sel = false
          val.show = true
          val.slide = true
          if (val.order) {
            val.order.forEach((el, index1) => {
              el.sel = false
            })
          }
        })
        that.checkList = res.data
      }
    })
  },
  methods: {
    // 循环计算总和
    getDepositSum (arr) {
      let s = 0
      arr.forEach(val => {
        s += Number(val.amount)
      })
      return s.toFixed(2)
    },
    // 弹出层显示
    handleModel () {
      this.showModal = true
      let checkList = this.checkList
      let selList = this.selList
    },
    // 点击展开
    handleSlide (index) {
      let checkList = this.checkList
      checkList[index].slide = !checkList[index].slide
    },
    // 点击选择项目
    // handleSelect (index) {
    //   let checkList = this.checkList
    //   console.log(checkList[index].sel)
    //   if (!checkList[index].sel) {
    //     checkList[index].sel = true
    //     checkList[index].slide = true
    //     // checkList[3].show = false
    //   } else {
    //     // checkList[3].show = true
    //     checkList[index].sel = false
    //   }
    // },
    // 点击选择订单
    handleOrderSelect (indexContract, indexOrder, sw) {
      const that = this
      let checkList = this.checkList
      checkList[indexContract].order[indexOrder].sel = !sw
      this.setContract(checkList)
    },
    // 筛选同一条链式记账下合同
    setContract (checkList) {
      let selId = ''
      checkList.forEach((val, index) => {
        val.order.forEach((el, i) => {
          if (el.sel) selId = val.chain_id
        })
      })
      checkList.forEach((val, index) => {
        val.show = true
        if (selId) {
          if (val.chain_id !== selId) val.show = false
        }
      })
      this.checkList = checkList
    },
    // 将组织好的列表统计到选择列表
    handleSelect () {
      // console.log(1)
      const that = this
      let arr = []
      let check = this.checkList
      check.forEach(val => {
        let orderArr = []
        let currentContract = val
        val.order.forEach(el => {
          if (el.sel) {
            orderArr.push(el)
          }
        })
        currentContract.showOrder = orderArr
        if (orderArr.length !== 0) arr.push(currentContract)
      })
      that.selList = arr
      that.showModal = false
      // return true
    },
    // 从外部取消选择
    handleDelete (index, index1, el) {
      // index, index1, 用于定位selList
      const that = this
      let selList = that.selList
      let checkList = that.checkList
      if (selList[index].showOrder.length === 1) {
        selList.splice(index, 1)
      } else {
        selList[index].showOrder.splice(index1, 1)
      }
      let delId = el.id
      checkList.forEach(val => {
        val.order.forEach(el => {
          if(el.id === delId) el.sel = false
        })
      })
      that.selList = selList
      that.checkList = checkList
    },
    // 查看链式记账
    handleChain (el) {
      let id = el.chain_id
      let path = '#/chain_app/payment_chain?id='
      window.open(`${path}${id}`)
    },
    // 查看企业首页
    handleBusiness (el) {
      // return false
      window.open('#/enterpriseBlog?bid=' + el.partner_company, '_black')
    },
    // 点击下一步，验证后通过emit传输
    handleNext () {
      const that = this
      that.$emit('usage', that.selList)
    }
  },
  computed: {
    selSum: function () {
      let s = 0
      this.selList.forEach(el => {
        if (el.showOrder) {
          el.showOrder.forEach(val => {
            s += Number(val.amount)
          })
        }
      })
      return s.toFixed(2)
    }
  }
}
</script>
<style lang="less" scoped>
.order_usage {
  .show_title {
    height: 52px;
    border-bottom: 1px solid #e1e6f0;
    padding-top: 20px;
    h3 {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#333333;
      letter-spacing:0;
      text-align:left;
      font-weight: bold;
      border-left: 5px solid #eb6100;
      height: 24px;
      padding-left: 22px;
      line-height: 24px;
    }
  }
  .demand {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    margin-top: 20px;
    padding: 0 20px;
  }
  .show_list {
    .get_sum {
      height: 45px;
      display: flex;
      justify-content: space-between;
      // padding: 0 20px;
      color: #666;
      font-size: 14px;
      align-items: center;
      &>div {
        display: flex;
        h3 {
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#333333;
          letter-spacing:0;
          text-align:left;
          font-weight: bold;
          padding: 5px 10px 0 8px;
        }
      }
      .btn_create {
        text-align: center;
        line-height: 28px;
        cursor: pointer;
        border: none;
        outline: none;
        color: #fff;
        background:#e87626;
        border-radius:2px;
        width:181px;
        height:28px;
        // margin-right: 30px;
        i {
          display: inline-block;
          padding-right: 10px;
        }
      }
    }
    .sel_item_list {
      .list {
        box-shadow:0 0 10px 1px #e1e6f0;
        .order_info {
          border:1px solid #e1e6f0;
          border-top: none;
          li {
            border:1px solid #e1e6f0;
            margin-bottom: 20px;
            border-left: none;
            border-right: none;
          }
          li:first-child {
            border-top: none;
          }
          li:last-child {
            margin-bottom: 0px;
            border-bottom: 1px solid #e1e6f0;
          }
          .order_data {
            div {
              p {
                padding-left: 24px;
              }
            }
            div:last-child {
              text-align:right;
              span {
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#666666;
                letter-spacing:0;
                font-weight: normal;
                text-decoration: underline;
                cursor: pointer;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
          }
        }
      }
      .sel_line {
        border: 1px dashed #e1e6f0;
        .show_section {
          ul {
            li {
              padding: 0 10px;
              width: 50%;
              span {
                font-family:PingFangSC-Semibold;
                font-size:14px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
                font-weight: bold;
                width: 15%;
              }
              p {
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
  .input_list {
    padding: 0 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    .inpit_lint {
      height: 48px;
      font-size: 14px;
      flex: 1;
      span {
        font-family:PingFangSC-Semibold;
        font-size:12px;
        color:#666666;
        letter-spacing:0;
        text-align:left;
        display: inline-block;
        padding-left: 8px;
      }
      input {
        background:#ffffff;
        border:1px solid #e1e6f0;
        border-radius:2px;
        color: #606266;
        width:220px;
        height:32px;
        outline: none;
        padding: 0 10px;
        transition: all .2s;
        font-size: 14px;
        border-radius: 4px;
      }
      input::placeholder {
        color: #C0C4CC;
      }
      input:hover {
        border-color: #c0c4cc;
      }
    }
    // .inpit_lint:first-child {
    //   min-width: 371px;
    // }
  }
  .btn_list {
    padding: 24px 0;
    div {
      width: 120px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      margin: 0 auto;
      cursor: pointer;
      background:#e87626;
      border-radius:2px;
      height:30px;
      font-family:PingFangSC-Semibold;
      font-size:12px;
      color:#ffffff;
      letter-spacing:0;
    }
  }
  .second_list_none {
    text-align: center;
    min-height: 200px;
    img {
      width:162px;
      height:125px;
      margin-top: 20px;
    }
    h4 {
      color: #999;
    }
  }
  .open_sel_item {
    padding: 0 60px;
    color: #333;
    margin-bottom: 28px;
    height: auto;
    width: 100%;
    .sel_line {
      background:#ffffff;
      border:1px solid #e1e6f0;
      width:100%;
      height:47px;
      .show_section {
        ul {
          width: 100%;
          display: flex;
          flex-direction: row;
          padding-left: 30px;
          li {
            width: 25%;
            height:47px;
            line-height: 47px;
            display: flex;
            padding: 0 10px;
            span {
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
              width: 35%;
            }
            p {
              width: 65%;
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#eb6100;
              letter-spacing:0;
              text-align:left;
              text-decoration: underline;
              font-weight: bold;
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          li:nth-child(3) {
            p {
              color: #333;
              cursor: default;
              text-decoration: none;
              font-weight: normal;
            }
          }
          li:nth-child(4) {
            text-align: right;
            span {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#eb6100;
              letter-spacing:0;
              float: right;
              text-decoration: underline;
              cursor: pointer;
            }
            button {
              float: right;
              margin: 11px 11px 0 44px;
              border-radius:2px;
              width:100px;
              height:24px;
              border: none;
              outline: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#eb6100;
              letter-spacing:0;
              text-align:center;
              // background:#eb6100;
              margin-right: 34px;
              text-decoration: underline;
              background: #fff;
            }
          }
        }
      }
    }
    .order_title {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#666;
      letter-spacing:0;
      text-align:left;
      padding-left: 48px;
      height: 38px;
      line-height: 38px;
      border-left: 1px dashed #e1e6f0;
      border-right: 1px dashed #e1e6f0;
      border-bottom: 1px solid #e1e6f0;
      span {
        font-weight: bold;
      }
    }
    .order_info {
      background:#ffffff;
      border:1px soild #e1e6f0;
      border-bottom: none;
      width:100%;
      height:auto;
      li {
        border:1px solid #e1e6f0;
        // margin-bottom: 20px;
        // border-left: none;
        // border-right: none;
        border-top: none;
        .order_data {
          display: flex;
          flex-direction: row;
          background:#f7f7f7;
          width:100%;
          height:50px;
          line-height: 50px;
          padding: 0 24px;
          div {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            span {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
            }
            p {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              display: inline-block;
              span {
                width:12px;
                height:12px;
                display: inline-block;
                border-radius: 50%;
                border: 1px solid #9b9b9b;
                position: relative;
                cursor: pointer;
                margin-right: 10px;
                a {
                  position: absolute;
                  display: inline-block;
                  background:#9b9b9b;
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  top: 2px;
                  left: 2px;
                }
              }
            }
            span:last-child {
              font-weight: bold;
            }
          }
          .order_data_btn {
            text-align: right;
            .el-checkbox-group {
              text-align: right;
            }
            .el-checkbox-button--mini {
              width:100px;
              height:24px;
              border-radius:2px;
            }
            .el-checkbox-button__inner {
              display: inline-block;
              width:100px;
              height:24px;
              border-radius:2px;
            }
            .el-checkbox-button:last-child .el-checkbox-button__inner {
              width: 100px;
              height: 24px;
              line-height: 10px;
              border-radius: 2px;
            }
            .el-checkbox-button__inner:hover {
              color: #e87626;
            }
            button {
              float: right;
              margin: 11px 11px 0 44px;
              border-radius:2px;
              width:100px;
              height:24px;
              border: none;
              outline: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#ffffff;
              letter-spacing:0;
              background:#eb6100;
              text-align:center;
            }
          }
        }
        .deposit_line {
          padding-left: 28px;
          .deposit_title {
            border-bottom:1px dashed #e1e6f0;
            height: 44px;
            line-height: 44px;
            img {
              width: 13px;
              height: 13px;
              margin-right: 8px;
              margin-top: 14px;
              float: left;
              margin-left: 20px;
            }
            span {
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
              margin-right: 134px;
            }
            p {
              float: left;
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
              a {
                color: #e87626;
                text-decoration: none;
              }
            }
          }
        }
        .deposit_list {
          display: flex;
          flex-direction: row;
          padding: 8px 0 12px 227px;
          div:first-child {
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#666666;
            letter-spacing:0;
            text-align:left;
          }
          .deposit_detail {
            flex: 1;
            div {
              display: flex;
              flex-direction: row;
              div {
                width: 30%;
                text-align: center;
                line-height: 32px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                // padding-right: 113px;
                // padding-bottom: 8px;
                // padding-top: 8px;
                span {
                  font-family:PingFangSC-Regular;
                  font-size:12px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                }
              }
              div:first-child {
                padding: 0 30px;
              }
            }
          }
        }
        .is_null {
          font-family:PingFangSC-Semibold;
          font-size:12px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          padding: 8px 0 12px 69px;
        }
        .order_data_btn {
          text-align: right;
          span {
            margin-left: 20px;
            padding: 8px 15px;
            border-radius: 2px;
            cursor: pointer;
          }
          .using {
            color: #fff;
            background: #eb6100;
          }
          .useless {
            color: #333;
            background: #ccc;
          }
        }
      }
      li:first-child {
        border-top: 1px soild #e1e6f0;
      }
      li:last-child {
        margin-bottom: 0px;
        border-bottom: 1px solid #e1e6f0;
      }
    }
  }
  .btn_wrap {
    text-align: center;
    padding-top: 30px;
    button {
      width: 72px;
      height: 30px;
      color: #fff;
      background: #eb6100;
      border: none;
      margin: 0;
      padding: 0;
      outline: none;
      border-radius: 3px;
    }
  }
  .open_class {
    .sel_line {
      border:1px dashed #e1e6f0;
    }
  }
}
</style>

// <style lang="less" scoped>
// .order_data_btn {
//   text-align: right;
//   .el-checkbox-group {
//     text-align: right;
//   }
//   .el-checkbox-button--mini {
//     width:100px;
//     height:24px;
//     border-radius:2px;
//   }
//   .el-checkbox-button__inner {
//     display: inline-block;
//     width:100px;
//     height:24px;
//     border-radius:2px;
//   }
//   .el-checkbox-button:last-child .el-checkbox-button__inner {
//     width: 100px;
//     height: 24px;
//     line-height: 10px;
//     border-radius: 2px;
//   }
//   .el-checkbox-button__inner:hover {
//     color: #e87626;
//     border: 1px solid #e87626;
//   }
// }
// </style>
