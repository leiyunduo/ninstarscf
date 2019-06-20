<template>
  <div class="loanDeal">
    <div class="loanDeal_wrap">
      <!-- <appNav :father='{selIndex: 7}' type='1'></appNav> -->
      <div class="loanDeal_right">
        <!-- <div class="title">
          <img src="../../../static/img/leftbar/myzhaiq.png" alt="">
          <span>贷款处置</span>
        </div> -->
        <div class="loanDeal_box">
          <div class="top_box">
            <div class="card_item">
              <div class="card_title">
                <h3>累计贷款</h3>
              </div>
              <div class="card_body">
                <span>累计笔数：{{accumulativeObj.total}}笔</span>
                <span>累计金额(万元)：{{toThousands(accumulativeObj.value)}}</span>
              </div>
            </div>
            <div class="card_item">
              <div class="card_title">
                <h3>可处置贷款</h3>
              </div>
              <div class="card_body_m">
                <div>
                  <div>
                    <span>可处置总计(笔)：</span>
                    <span>{{canManagerObj.c_total}}</span>
                  </div>
                  <div v-if="canManagerObj.c_value">
                    <span>可处置总额(万元)：</span>
                    <span>{{toThousands(canManagerObj.c_value)}}</span>
                  </div>
                  <div v-else>
                    <span style="margin-right:50px">可处置总额(万元)：</span>
                    <span>0.00</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>催付总计(笔)：</span>
                    <span>{{canManagerObj.u_total}}</span>
                  </div>
                  <div v-if="canManagerObj.u_value">
                    <span>催付总额(万元)：</span>
                    <span>{{toThousands(canManagerObj.u_value)}}</span>
                  </div>
                  <div v-else>
                    <span style="margin-right:50px">催付总额(万元)：</span>
                    <span>0.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card_item">
              <div class="card_title">
                <h3>已处置贷款</h3>
              </div>
              <div class="card_body">
                <span>已处置：共计{{hasManagerObj.total}}笔</span>
                <span>已处置总额(万元): {{hasManagerObj.value}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="loanDeal_bot">
          <div class="loanDeal_title">
            <span @click="changeTab(1)" :class="tabNav === 1 ? 'active' : ''">可处置贷款</span>
            <span @click="changeTab(2)" :class="tabNav === 2 ? 'active' : ''">已处置贷款</span>
          </div>
          <div class="loanDeal_table" v-show="tabNav === 1">
            <div class="table_title">
              <!-- <div v-for="(item, index) in tableTitle" :key= index>{{item}}</div> -->
              <div>融资单号</div>
              <div class="canManager" @click="showSelect = !showSelect">贷款类型
                <ul class="ul" v-show="showSelect">
                  <li @click="changeLi('1')">应收融资</li>
                  <li @click="changeLi('2')">订单融资</li>
                </ul>
              </div>
              <div>贷款金额(元)</div>
              <div>放贷机构</div>
              <div>贷款状态</div>
              <div>还款日期</div>
              <div>操作</div>
            </div>
            <div class="table_body">
              <div v-if='canArr.length > 0'>
                <div class="table_tr" v-for="(item, index) in canArr" :key=index :class="convertTime(item.status) === '警告' ? 'warning': ''" >
                  <div>{{item.number}}</div>
                  <div>{{item.financing_type === 'receivable' ? '应收融资' : '订单融资'}}</div>
                  <div>{{toThousands(item.amount)}}</div>
                  <div :title="item.institution_name">{{item.institution_name}}</div>
                  <div>{{convertTime(item.status) === '警告' ? '距逾期还剩'+ item.status.days + '天' : convertTime(item.status)}}</div>
                  <div>{{item.repayment_date}}</div>
                  <div>
                    <span @click="toWay(item.id, 1)" class="deal">贷款处置</span>
                    <!-- <span @click="toDetail(item.id)" class="info">查看</span> -->
                  </div>
                </div>
              </div>
              <div v-else class="table_tr">
                <div>暂无数据</div>
              </div>
              <div class="c_page">
                <el-pagination
                  @size-change="handleSizeChange('on')"
                  @current-change="handleCurrentChange('on')"
                  :current-page.sync="paginationOne.currentPage"
                  :page-size="100"
                  layout="prev, pager, next, jumper"
                  :total="paginationOne.total">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="loanDeal_table hasManager" v-show="tabNav === 2">
            <div class="table_title">
              <!-- <div v-for="(item, index) in tableTitle" :key= index>{{item}}</div> -->
              <div>融资单号</div>
              <div>贷款类型</div>
              <div>贷款金额(元)</div>
              <div>放贷机构</div>
              <div class="hasManager" @click="showTypeSelect = !showTypeSelect">处置类型
                <ul class="ul" v-show="showTypeSelect">
                  <li @click="changeTypeLi('1')">主动还款</li>
                  <li @click="changeTypeLi('2')">续贷</li>
                  <li @click="changeTypeLi('3')">促保贷</li>
                  <li @click="changeTypeLi('4')">过桥贷款</li>
                </ul>
              </div>
              <div>还款日期</div>
              <div>操作</div>
            </div>
            <div class="table_body">
              <div v-if="hasArr.length > 0">
                <div class="table_tr" v-for="(item, index) in hasArr" :key=index>
                  <div>{{item.number}}</div>
                  <div>{{item.financing_type === 'receivable' ? '应收融资' : '订单融资'}}</div>
                  <div>{{toThousands(item.amount)}}</div>
                  <div :title="item.institution_name">{{item.institution_name}}</div>
                  <div>{{convertType(item.m_status)}}</div>
                  <div>{{item.repayment_date}}</div>
                  <div>
                    <!-- <span class="deal">贷款处置</span> -->
                    <span @click="withdraw(item.management_id, item.m_status)" class="info">查看</span>
                  </div>
                </div>
              </div>   
              <div v-else class="table_tr">
                <div>暂无数据</div>
              </div>
              <div class="c_page">
                <el-pagination
                  @size-change="handleSizeChange('on')"
                  @current-change="handleCurrentChange('on')"
                  :current-page.sync="paginationTwo.currentPage"
                  :page-size="100"
                  layout="prev, pager, next, jumper"
                  :total="paginationTwo.total">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabNav: 1,
      tableTitle: ['融资单号', '贷款类型', '贷款金额(元)', '放贷机构', '贷款状态', '还款日期', '操作'],
      hasManageList: [
        {
          num: '123133H',
          loanType: '应收融资',
          loanVal: '100000000',
          loanInstitution: '北京银行',
          loanStatus: '距还款日剩余2天',
          pay_time: '2018-10-3'
        },
      ],
      hasManageList1: [
        {
          num: '123133B',
          loanType: '订单融资',
          loanVal: '100000000',
          loanInstitution: '招商银行北京支行',
          loanStatus: '主动还款',
          pay_time: '2018-10-3'
        },
      ],
      showSelect: false,
      showTypeSelect: false,
      paginationOne: {
        total: 10,
        currentPage: 1
      },
      paginationTwo: {
        total: 10,
        currentPage: 1
      },
      canManager: {
        debts_list: []
      },
      hasManager: {
        debts_list: []
      },
      canArr: [],
      hasArr: [],
      status: '',
      accumulativeObj: {
        total: 0,
        value: 0
      },
      canManagerObj: {
        c_total: 0,
        c_value: 0,
        u_total: 0,
        u_value: 0
      },
      hasManagerObj: {
        total: 0,
        value: 0
      }
    }
  },
  mounted () {
    var that = this
    var amount = 0
    var flag = false
    that.$ajax.get('/api/loan_management/?token=' + that.$token()).then(res => {
      // console.log(res)
      if (res.data.code === '1') {
        this.canManager.debts_list = res.data.data.can_manage.debts_list
        this.canArr = res.data.data.can_manage.debts_list
        if(this.canManager.debts_list.length > 0) {
          this.canManager.debts_list.forEach((item, index) => {
            this.accumulativeObj.value += Number(item.amount)
          })
          this.accumulativeObj.total += this.canManager.debts_list.length
        }
        this.canManagerF()
      }
    })
    that.$ajax.get('/api/loan_management/?token=' + that.$token() + '&management=' + 1).then(res => {
      // console.log(res)
      if (res.data.code === '1') {
        this.hasManager.debts_list = res.data.data.has_manage.debts_list
        this.hasArr = res.data.data.has_manage.debts_list
        this.hasManagerF()
        if(this.hasManager.debts_list.length > 0) {
          this.hasManager.debts_list.forEach((item, index) => {
            this.accumulativeObj.value += Number(item.amount)
          })
          this.accumulativeObj.total += this.hasManager.debts_list.length
        }
      }
    })
    // this.accumulativeF()
    let _location = [
      {
        title: '贷款处置',
        url: ''
      }
    ]
  },
  methods: {
    // 累计贷款
    // accumulativeF () {
    //   var amount = 0
    //   if(this.canManager.debts_list.length > 0) {
    //     this.canManager.debts_list.forEach((item, index) => {
    //       amount += Number(item.amount)
    //     })
    //   }
    //   if(this.hasManager.debts_list.length > 0) {
    //     this.hasManager.debts_list.forEach((item, index) => {
    //       amount += Number(item.amount)
    //     })
    //   }
    //   amount = Math.pow(10, -4) * amount
    //   this.accumulativeObj.value = this.toThousands(amount)
    //   this.accumulativeObj.total = this.hasManager.debts_list.length + this.canManager.debts_list.length
    // },
    // 可处置贷款
    canManagerF () {
      if(this.canManager.debts_list.length > 0) {
        this.canManager.debts_list.forEach((item, index) => {
          if (Number(item.status.status) === 1) {
            if (Number(item.status.days) <= 7) {
              // 催付
              this.canManagerObj.u_total += 1
              this.canManagerObj.u_value += Number(item.amount)
            } else {
              // 正常
              this.canManagerObj.c_total += 1
              this.canManagerObj.c_value += Number(item.amount)
            }
          }
        })
      }
    },
    // 已处置贷款
    hasManagerF () {
      var amount = 0
      if(this.hasManager.debts_list.length > 0) {
        this.hasManager.debts_list.forEach((item, index) => {
          amount += Number(item.amount)
        })
      }
      amount = Math.pow(10, -4) * amount
      this.hasManagerObj.value = this.toThousands(amount)
      this.hasManagerObj.total = this.hasManager.debts_list.length
    },
    convertType (type) {
      var name = ''
      switch(Number(type)) {
        case 1: 
          name = '主动还款'
          break
        case 2:
          name = '续贷'
          break
        case 3:
          name = '促保贷'
          break
        case 4:
          name = '过桥贷款'
          break
      }
      return name
    },
    convertTime (status) {
      if (status) {
        // 正常
        if (Number(status.status) === 1) { 
          if (status.days <= 7) {
            return '警告'
          }
          else {
            return '正常'
          }
        }
        // 逾期
        else if (Number(status.status) === 2) {
          return '逾期'
        } 
        // 坏账
        else {
          return '坏账'
        }
      }
    },
    changeTab (tab) {
      this.tabNav = tab
    },
    changeLi (code) {
      var type = code === '1' ? 'receivable' : 'order'
      this.filter('can', type)
    },
    changeTypeLi (code) {
      this.filter('has', code)
    },
    // 分页
    handleSizeChange (state) {

    },
    handleCurrentChange (state) {

    },
    toWay (id, type) {
      this.$router.push({
        path: '/loanType',
        query: {
          id: id,
          type: type
        }
      })
    },
    toDetail (id) {
      this.$router.push({
        path: '/loanInfo',
        query: {
          id: id
        }
      })
    },
    withdraw (id, type) {
      this.$router.push({
        path: '/loanPublish',
        query: {
          id: id,
          type: type,
          delete: 1
        }
      })
    },
    filter (type, code) {
      if (type === 'can') {
        // 可处置贷款
        this.canArr = []
        if (this.canManager.debts_list.length > 0) {
          this.canManager.debts_list.forEach((item, index) => {
            if (item.financing_type === code) {
              this.canArr.push(item)
            }
          })
          // console.log(this.canArr)
        }
      } else {
        // 已处置贷款
        this.hasArr = []
        if (this.hasManager.debts_list.length > 0) {
          this.hasManager.debts_list.forEach((item, index) => {
            if (item.m_status === code) {
              this.hasArr.push(item)
            }
          })
          // console.log(this.hasArr)
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .loanDeal {
    height: 100%;
    .loanDeal_wrap {
      height: 100%;
      //padding-top: 70px;
      display: flex;
      .loanDeal_right {
        width: 100%;
        background: #ffffff;
        margin: 30px 50px;
        padding-bottom: 20px;
        .title {
          color: #3c4046;
          font-size: 16px;
          line-height: 60px;
          // border-bottom: 1px solid #cccccc;
          box-shadow: 2px 0 4px #ddd;
          padding-left: 50px;
          background: #fff;
          img{
            margin-right: 10px;
            vertical-align: middle;
          }
          i {
            color: #eb6100;
            margin-right: 10px;
            font-size: 20px;
          }
        }
        .loanDeal_box {
          // width: 90%;
          margin: 20px;
          // overflow: visible;
          .top_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .card_item {
              width: calc((100% - 60px) / 3);
              height: 200px;
              border:  1px solid #f4f8f9;
              background: #f4f8f9;
              border-radius: 6px;
              box-shadow: 2px 2px 4px #ddd;
              .card_title {
                height: 43px;
                line-height: 43px;
                margin-top: 30px;
                h3 {
                  margin-left: 30px;
                  font-size: 26px;
                  font-weight: 500;
                }
              }
              .card_body {
                height: 107px;
                display: flex;
                // justify-content: space-around;
                flex-wrap: wrap;
                align-content: center;
                align-items: center;
                span {
                  color: #666;
                  margin-left: 33px;
                  display: block;
                }
              }
              .card_body_m {
                &>div {
                  height: 43px;
                  line-height: 43px;
                  display: flex;
                  justify-content: space-between;
                  padding-left: 30px;
                  padding-right: 20px;
                  color: #666;
                }
                &>div:first-child {
                  margin-top: 20px;

                }
                &>div:last-child {
                  &>div {
                    &>span:first-child {
                      margin-right: 15px;
                    }
                  }
                }
              }
            }
          }
        }
        .loanDeal_bot {
          // width: 90%;
          margin: 0 20px;
          padding-top: 20px;
          border: 1px solid transparent;
          .loanDeal_title {
            line-height: 32px;
            height: 32px;
            border-left: 5px solid #ea6100;
            padding-left: 16px;
            span {
              font-size: 18px;
              color: #333;
              margin-right: 30px;
              display: inline-block;
              cursor: pointer;
              font-weight: 600;
            }
            &>.active {
              border-bottom: 1.5px solid #ea6100;
            }
          }
          .loanDeal_table {
            .table_title {
              margin-top: 30px;
              background: #eaeaea;
              height: 43px;
              line-height: 43px;
              display: flex;
              justify-content: space-around;
              div {
                width: 14%;
                text-align: center;
                cursor: pointer;
                position: relative;
                .ul {
                  background: #fff;
                  box-shadow: 2px 2px 4px #ddd, -2px -2px 2px #ddd;
                  border-radius: 2px;
                  width: 130px;
                  margin: 0 auto;
                  overflow: hidden;
                  li:hover {
                    background: #eaeaea
                  }
                }
              }
              .canManager::after {
                content: "";
                top: 16px;
                right: 45px;
                position: absolute;
                border-width: 7px;
                border-style: solid;
                border-color: #343536 transparent transparent transparent;
              }
              .hasManager::after {
                content: "";
                top: 16px;
                right: 45px;
                position: absolute;
                border-width: 7px;
                border-style: solid;
                border-color: #343536 transparent transparent transparent;
              }
            }
            .table_body {
              .table_tr {
                height: 47px;
                line-height: 47px;
                display: flex;
                justify-content: space-around;
                border: 1px solid #eaeaea;
                border-top: 0;
                div {
                  width: 14%;
                  text-align: center;
                  color: #666;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  cursor: pointer;
                }
                &>div:last-child {
                  span {
                    color: #ea6100;
                    margin: 0 15px;
                    cursor: pointer;
                    font-size: 14px;
                  }
                }
                &>div:nth-of-type(3) {
                  text-align: right;
                  padding-right: 65px;
                }
              }
              .table_tr:hover {
                background: #f1eded;
              }
              .warning {
                background: rgba(235, 25, 25, .8) !important;
                div {
                  color: #fff
                }
                &>div:last-child {
                  span {
                    color: #fff;
                    margin: 0 15px;
                    cursor: pointer;
                  }
                }
              }
              .c_page {
                margin-top: 30px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>