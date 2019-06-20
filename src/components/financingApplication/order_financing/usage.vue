<template>
  <div class="order_usage">
    <div class="demand">
      <div class="show_title">
        <h3>融资用途</h3>
      </div>
      <div class="show_list">
        <div class="get_sum">
          <div>
            <h3>累计订单总额：{{selSum}}元</h3>
          </div>
          <button class="btn_create" @click="handleModel"><i class="el-icon-plus"></i>选择需融资订单</button>
        </div>
        <div v-for="(item, index) in selList" v-if="selList.length !== 0" :key='index' class="open_sel_item sel_item_list">
          <div class="list">
            <div class="sel_line">
              <div class="show_section">
                <ul>
                  <li><span>采购项目：</span><p>{{item.name}}</p></li>
                  <li><span>销售企业：</span><p>{{item.partner}}</p></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="order_title" v-if="item.order">
              <span>订单信息</span>
            </div>
            <ul class="order_info" v-if="item.order">
              <li v-for="(order, index1) in item.order" :key='index1'>
                <div class="order_data">
                  <div>
                    <p>订单名称：</p>
                    <span>{{order.name}}</span>
                  </div>
                  <div>
                    <span>交货日期：</span>
                    <span>{{order.date_created}}</span>
                  </div>
                  <div>
                    <span>结算日期：</span>
                    <span>{{order.date_created}}</span>
                  </div>
                  <div>
                    <span>订单金额：</span>
                    <span>{{order.value}}</span>
                    <span>元</span>
                  </div>
                  <div>
                    <span>删除</span>
                  </div>
                </div>
                <div class="deposit_line">
                  <div class="deposit_title">
                    <img src="../../../../static/img/chain/chain_circle_m_b.png" alt="">
                    <span>订金信息</span>
                    <p v-if="order.deposit">订金总额：<a href="javascript:void(0)" v-if="order.deposit">{{getDepositSum(order.deposit)}}元</a></p>
                  </div>
                </div>
                <div class="deposit_list" v-if='order.deposit'>
                  <div>订金支付方式：</div>
                  <div class="deposit_detail">
                    <div v-for="(deposit, index2) in order.deposit" :key='index2'>
                      <div>
                        <span>商业承兑汇票</span>
                      </div>
                      <div>
                        <span>票据金额：</span>
                        <span>50.00万元</span>
                      </div>
                      <div>
                        <span>汇票到期日：</span>
                        <span>{{deposit.date_created}}</span>
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
          <img src="../../../../static/img/other/none.png" alt="">
          <h4>还没添加融资用途，请选择需要融资的采购订单</h4>
        </div>
      </div>
    </div>
    <div class="demand">
      <div class="show_title">
        <h3>融资需求</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>期望融资金额：</span>
          <input type="text" placeholder="金额不能大于累计订单总额" v-model="amount">
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
    </div>
    <div class="btn_list">
      <div @click="handleNext">下一步</div>
    </div>
    <!-- 选择列表弹框 -->
    <el-dialog :visible.sync="showModal" width="1278px" :before-close='handleClose'>
      <div v-for="(item, index) in checkList" :class="{open_class: item.slide === 1}" v-if="checkList.length !== 0 && item.show" :key='index' class="open_sel_item">
        <div class="sel_line">
          <div class="show_section">
            <ul>
              <li><span>采购项目：</span><p>{{item.name}}</p></li>
              <li><span>交易企业：</span><p>{{item.partner}}</p></li>
              <li><span>创建时间：</span><p>{{item.create_time}}</p></li>
              <li>
                <!-- <button :class="item.sel ? 'open' : 'no_open'">{{item.sel ? '选择' : '取消选择'}}</button> -->
                <button @click="handleSlide(index)" class="open">{{index===limit ? selectName = '收起' : selectName = '查看'}}</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="order_title" v-if="index === limit">
          <span>订单信息</span>
        </div>
        <ul class="order_info" v-if="index === limit">
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
                <span>{{order.date_created}}</span>
              </div>
              <div>
                <span>结算日期：</span>
                <span>{{order.date_created}}</span>
              </div>
              <div>
                <span>订单金额：</span>
                <span>{{order.value}}</span>
                <span>元</span>
              </div>
              <div class="order_data_btn">
                <!-- <button class="no_open" @click="handleOrderSelect($event, index1)">{{btnName}}</button> -->
                <el-checkbox-group style="width:100px;height:24px;" @change="handleOrderSelect($event)" v-model="checkboxGroup" size="mini" text-color='#fff' fill="#e87626">
                  <el-checkbox-button :label="order.id" :key="index1">{{btnName}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </div>
            <div class="deposit_line">
              <div class="deposit_title">
                <img src="../../../../static/img/chain/chain_circle_m_b.png" alt="">
                <span>订金信息</span>
                <p v-if="order.deposit">订金总额：<a href="javascript:void(0)" v-if="order.deposit">{{getDepositSum(order.deposit)}}元</a></p>
              </div>
            </div>
            <div class="deposit_list" v-if='order.deposit'>
              <div>订金支付方式：</div>
              <div class="deposit_detail">
                <div v-for="(deposit, index2) in order.deposit" :key='index2'>
                  <div>
                    <span>商业承兑汇票</span>
                  </div>
                  <div>
                    <span>票据金额：</span>
                    <span>50.00万元</span>
                  </div>
                  <div>
                    <span>汇票到期日：</span>
                    <span>{{deposit.date_created}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="is_null" v-if="!order.deposit">暂无订金</div>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'orderUsage',
  data () {
    return {
      showModal: false,
      // 收起展开
      selectName: '',
      limit: -1,
      btnName: '选择',
      checkboxGroup: [],
      checkList: [
        {
          name: '1213',
          show: true,
          partner: '小小项目',
          create_time: '2018-11-26',
          order: [{
            id: 1,
            name: '12313',
            date_created: '2018-11-26',
            value: '11111',
            deposit: [{date_created: '2018-11-26'}],
            sel: false,
          },{
            id: 2,
            name: '12313',
            date_created: '2018-11-26',
            value: '11111',
            sel: false,
            deposit: [{date_created: '2018-11-26'}],
          }],
          sel: true,
          slide: 1
        },{
          name: '1213',
          show: true,
          partner: '小小项目',
          create_time: '2018-11-26',
          order: [{
            id: 3,
            name: '12313',
            date_created: '2018-11-26',
            value: '11111',
            sel: false,
            radio: ''
          }],
          sel: false,
          slide: 0
        }
      ],
      selList: [
        {
          name: '1213',
          show: true,
          partner: '小小项目',
          create_time: '2018-11-26',
          order: [{
            id: 1,
            name: '12313',
            date_created: '2018-11-26',
            value: '11111',
            deposit: [{date_created: '2018-11-26'}],
            sel: true,
          },{
            id: 2,
            name: '12313',
            date_created: '2018-11-26',
            value: '11111',
            sel: false,
            deposit: [{date_created: '2018-11-26'}],
          }],
          sel: true
        },{
          name: '1213',
          show: true,
          partner: '小小项目',
          create_time: '2018-11-26',
          order: [{
            id: 2,
            name: '12313',
            date_created: '2018-11-26',
            value: '11111',
            sel: false,
            radio: ''
          }],
          sel: false
        }
      ],
      repaymentDate: '',
      exceptDate: '',
      amount: '',
      // 选择订单
      radio: ''
    }
  },
  updated () {
    let a = this.$parent
    if (a.steps[0].emitData.amount) {
      this.selList = a.steps[0].emitData.list
      this.exceptDate = a.steps[0].emitData.except_date
      this.repaymentDate = a.steps[0].emitData.repayment_date
      this.amount = a.steps[0].emitData.amount
    }
  },
  mounted () {
    const that = this
    // this.$ajax.get('/api/order_application/contract/').then(res => {
    //   console.log(res)
    //   if (res.data.code === 1) {
    //     res.data.c.forEach((val, index) => {
    //       val.sel = false
    //       val.show = true
    //       index !== 0? val.slide = false : val.slide = true
    //       if (val.order) {
    //         val.order.forEach((el, index1) => {
    //           el.sel = false
    //         })
    //       }
    //     })
    //     // that.checkList = res.data.c
    //     // that.selList = res.data.c
    //   }
    // })
  },
  methods: {
    // 循环计算总和
    getDepositSum (arr) {
      let s = 0
      arr.forEach(val => {
        s += val.value
      })
      // return s.toFixed(2)
    },
    // 弹出层显示
    handleModel () {
      const that = this
      let checkList = that.checkList
      console.log(checkList)
      let selList = that.selList
      // checkList.forEach(val => {
      //   selList.forEach(el => {
      //     if (val.id === el.id) val.sel = true, val.slide = true
      //   })
      // })
      this.showModal = true
    },
    // 点击展开
    handleSlide (index) {
      // let checkList = this.checkList
      // checkList[index].slide = !checkList[index].slide
      // this.checkList = checkList
      if (index === this.limit) {
        console.log(1)
        this.limit = -1
      }else{
        this.limit = index
      }
    },
    // // 点击选择项目
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
    //   // this.checkList = checkList
    // },
    // 点击选择订单
    handleOrderSelect ($event) {
      const that = this
      console.log($event)
    },
    // 将组织好的列表统计到选择列表
    handleClose () {
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
            currentContract.showOrder = orderArr
            arr.push(currentContract)
          }
        })
      })
      // console.log(checkList)
      that.selList = arr
      console.log(this)
      that.showModal = false
      // return true
    },
    // 从外部取消选择
    handleDelete (index, el) {
      let selList = this.selList
      let checkList = this.checkList
      checkList.forEach(val => {
        if (val.id === el.id) {
          val.order.forEach(el => {
            el.sel = false
          })
        }
      })
      selList.splice(index, 1)
      this.selList = selList
      this.checkList = checkList
      
    },
    // 点击下一步，验证后通过emit传输
    handleNext () {
      const that = this
      if (that.selList.length === 0) {
        // 判断融资用途
        that.$message.error('请选择融资用途')
      } else {
        if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.amount))) {
          // 判断是否填写金额
          that.$message.error('请填写正确的融资金额')
        } else {
          console.log(that.selSum)
          console.log(that.amount)
          if (Number(that.amount) > Number(that.selSum)) {
            // 判断金额是否超标
            that.$message.error('融资金额不得大于累计订单总额')
          } else {
            if (!that.exceptDate) {
              // 判断是否选择融资时间
              that.$message.error('请选择期望融资时间')
            } else {
              if (Date.parse(that.exceptDate) + (60 * 1000 * 60 * 24) < Date.parse(new Date())) {
                // 判断是否今天之前
                that.$message.error('请选择正确的期望融资时间')
              } else {
                if (!that.repaymentDate) {
                  // 判断是否填写还款时间
                  that.$message.error('请选择期望还款时间')
                } else {
                  if (Date.parse(this.repaymentDate) < Date.parse(that.exceptDate)) {
                    // 判断是否为今天之前
                    that.$message.error('请选择正确的期望还款时间')
                  } else {
                    that.$emit('usage', {list: that.selList, except_date: that.exceptDate, repayment_date: that.repaymentDate, amount: that.amount})
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  computed: {
    selSum: function () {
      let s = 0
      this.selList.forEach(el => {
        if (el.order) {
          el.order.forEach(val => {
            s += val.value
          })
        }
      })
      // return s.toFixed(2)
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
    padding: 0 50px 0 20px;
  }
  .show_list {
    .get_sum {
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      color: #666;
      font-size: 14px;
      align-items: center;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        padding: 5px 0 0 8px;
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
        margin-right: 30px;
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
              }
            }
            .order_data_btn {
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
                text-align:center;
              }
              .open {
                background:#e87626;
              }
              .no_open {
                background:#cccccc;
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
              span {
                font-family:PingFangSC-Semibold;
                font-size:14px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
                font-weight: bold;
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
        width:220px;
        height:32px;
        outline: none;
        padding: 0 10px;
        font-size: 12px;
      }
      input:hover {
        box-shadow:0 0 7px 0 #e1e6f0;
      }
    }
    .inpit_lint:first-child {
      min-width: 371px;
    }
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
          display: flex;
          flex-direction: row;
          padding-left: 48px;
          li {
            flex: 1;
            height:47px;
            line-height: 47px;
            span {
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
            }
            p {
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#eb6100;
              letter-spacing:0;
              text-align:left;
              text-decoration: underline;
              font-weight: bold;
            }
          }
          li:last-child {
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
              color:#ffffff;
              letter-spacing:0;
              text-align:center;
              margin-right: 34px;
            }
            .open {
              background:#e87626;
            }
            .no_open {
              background:#cccccc;
            }
          }
        }
      }
    }
    .order_title {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#999999;
      letter-spacing:0;
      text-align:left;
      padding-left: 48px;
      height: 38px;
      line-height: 38px;
      border-left: 1px dashed #e1e6f0;
      border-right: 1px dashed #e1e6f0;
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
        margin-bottom: 20px;
        border-left: none;
        border-right: none;
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
              text-align:center;
            }
            .open {
              background:#e87626;
            }
            .no_open {
              background:#cccccc;
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
                padding-right: 113px;
                padding-bottom: 4px;
                span {
                  font-family:PingFangSC-Regular;
                  font-size:12px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                }
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
  .open_class {
    .sel_line {
      border:1px dashed #e1e6f0;
    }
  }
}
</style>

<style lang="less">
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
    border: 1px solid #e87626;
  }
}
</style>
