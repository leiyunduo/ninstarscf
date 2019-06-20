<template>
  <div class="financing_section">
    <!-- <AppNav :father='{selIndex: 3}'></AppNav> -->
    <div class="order_application">
      <div class="location_wrap">
      <location :location='location'></location>
      </div>
      <ul class="step_nav">
        <li v-for="(item, index) in steps" :key='index' :class="index <= selIndex ? 'currentIndex' : ''" @click="handleNav(index)">
          <!-- <img :src="index <= selIndex ? item.icon : item.disicon" alt=""> -->
          <div>
            <span>{{index + 1}}</span>
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
      <usage @usage='handleUsage' v-if="selIndex === 0"/>
      <pledge @pledge='handlePledge' v-if="selIndex === 1"/>
      <secondRepayment @second='handleSecond' v-if='selIndex === 2'/>
      <loanAssistance @loan='handleLoan' v-if='selIndex === 3' />
      <financingApplication @submit='handleBank' v-if='selIndex === 4' />
      <signFile @ok='handleSubmit' v-if="selIndex === 5" />
      <el-dialog
        title="确认"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>{{navInfo}}</span>
        <span slot="footer" class="dialog-footer">
          <button @click="centerDialogVisible = false">点错了</button>
          <button @click="handleSetp">确认</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import location from '@/components/location/location'
// import AppNav from '@/components/financing/financingManege'
import pledge from './pledge'
import usage from './usage'
import secondRepayment from './second_repayment'
import loanAssistance from './loan_assistance'
import financingApplication from './financing_application'
import signFile from './file'

export default {
  name: 'gettingFinancingApplication',
  components: {
    location, 
    // AppNav, 
    pledge, usage, secondRepayment, loanAssistance, financingApplication, signFile
  },
  data () {
    return {
      selIndex: 0,
      navInfo: '',
      centerDialogVisible:  false,
      navIndex: -1,
      steps: [
        {name: '融资用途', icon: require('../../../../../static/img/financing/usage.png'), disicon: require('../../../../../static/img/financing/usage-d.png'), emitData: {}},
        {name: '质押池（自偿性还款来源）', icon: require('../../../../../static/img/financing/first.png'), disicon: require('../../../../../static/img/financing/first-d.png'), emitData: {}},
        {name: '担保池（担保性还款来源）', icon: require('../../../../../static/img/financing/second.png'), disicon: require('../../../../../static/img/financing/second-d.png'), emitData: {}},
        {name: '助贷申请', icon: require('../../../../../static/img/financing/fund.png'), disicon: require('../../../../../static/img/financing/fund-d.png'), emitData: {}},
        {name: '融资申请', icon: require('../../../../../static/img/financing/application.png'), disicon: require('../../../../../static/img/financing/application-d.png'), emitData: {}},
        {name: '个人责任承诺函', icon: require('../../../../../static/img/financing/file.png'), disicon: require('../../../../../static/img/financing/file-d.png'), emitData: {}}
      ],
      location: [
        {title: '我的融资', url: '/financing_app'},
        {title: '应收融资申请'}
      ]
    }
  },
  methods: {
    // 应收质押款emit
    handlePledge (e) {
      this.handleChangeSteps(e)
    },
    // 融资用途
    handleUsage (e) {
      this.handleChangeSteps(e)
    },
    // 其他应收款emit
    handleSecond (e) {
      this.handleChangeSteps(e)
    },
    // 选择助贷基金
    handleLoan (e) {
      this.handleChangeSteps(e)
    },
    handleBank (e) {
      this.handleChangeSteps(e)
    },
    // 提交融资申请
    handleSubmit (e) {
      const that = this
      let {steps} = that
      console.log(steps)
      let submitData = {}
      // 融资类型
      submitData['type'] = '0'
      // 融资期望
      submitData['expect_data'] = {
        value: steps[1].emitData.amount,
        expect_loan_date: that.$time(steps[1].emitData.except_date, 2),
        expect_repayment_date: that.$time(steps[1].emitData.repayment_date, 2)
      }
      // 第一还款来源
      // let first_repayment = steps[1].emitData.list
      steps[1].emitData.list.forEach((val, i) => {
        val.show_settlement = []
        val.settlement.forEach(el => {
          if (el.sel) {
            val.show_settlement.push(el)
          }
        })
      })
      let first_repayment = []
      steps[1].emitData.list.forEach((val, index) => {
        first_repayment[index] = val
        first_repayment[index].settlement = val.show_settlement
      })
      // 第二还款来源
      let second_repayment = []
      steps[2].emitData.selList.forEach(val => {
        second_repayment.push(val.id)
      })
      // 助贷信息
      submitData['helping_data'] = steps[3].emitData
      // 申请机构
      submitData['institution'] = steps[4].emitData.bankList
      // 区域发布
      steps[4].emitData.bankList.length === 0 ? submitData['region_code'] = localStorage.region_code : submitData['is_region_code'] = false
      // 应收质押款 融资用途
      submitData['application_data'] = {
        first_repayment,
        shortage: steps[1].emitData.shortage,
        second_repayment,
        other_collateral: steps[2].emitData.otherList,
        loan_purpose: steps[0].emitData,
        bank_account_info: steps[1].emitData.bankInfo,
      }
      // 签署协议
      e ? submitData['application_data'].file = e : ''
      console.log(submitData)
      that.$ajax.post('/api/financing/application/', submitData).then(res => {
        if (res.status === 201) {
          that.$router.push('/financing_app')
        }
      })
    },
    // 公共跳转逻辑，e 为组件下一步返回是数据
    handleChangeSteps (obj) {
      let steps = this.steps
      steps[this.selIndex].emitData = obj
      this.steps = steps
      this.selIndex += 1
    },
    // 上方导航
    handleNav (index) {
      const that = this
      if (that.selIndex > index) {
        this.navIndex = index
        this.centerDialogVisible = true
        this.navInfo = `您将回到${that.steps[index].name}，在那之后的所有操作将重新开始，是否继续？`
      }
    },
    // 确认离开当前步骤
    handleSetp () {
      const that = this
      this.centerDialogVisible = false
      that.selIndex = that.navIndex
    }
  },
}
</script>
<style lang="less" scoped>
  .financing_section {
    display: flex;
    min-height: 100%;
    .order_application {
      width: 100%;
      min-height: 100%;
      background: #fafafa;
      padding: 0 40px;
      //padding-top: 70px;
      .location_wrap {
        background: #fff;
      }
      .step_nav {
        // margin: 0 40px;
        display: flex;
        margin-top: 20px;
        background: #fff;
        margin-bottom: 20px;
        height:120px;
        li.currentIndex {
          div {
            span:first-child {
              background:rgba(235,97,0,1);
              color:rgba(254,254,254,1);
              border:1px solid rgba(235,97,0,1);
            }
            span:last-child {
              color:rgba(51,51,51,1);
            }
          }
        }
        li {
          list-style: none;
          width: 15%;
          text-align: center;
          background: #fff;
          cursor: pointer;
          padding-top: 42px;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            span:first-child {
              border:1px solid rgba(220,220,220,1);
              border-radius: 50%;
              margin-right: 12px;
              line-height: 32px;
              font-size: 14px;
              width:32px;
              height:32px;
              font-size:16px;
              font-family:PingFangSC-Regular;
              font-weight:bold;
              color:rgba(187,187,187,1);
            }
            span:last-child {
              padding: 5px 0;
              border-bottom: 2px solid #fff;
              font-size:18px;
              font-family:PingFangSC-Regular;
              font-weight:bold;
              color:rgba(187,187,187,1);
            }
          }
        }
        li:nth-child(2),li:nth-child(3) {
          width: 20%;
        }
      }
    }
    .dialog-footer {
      button {
        color: #666;
        padding: 0;
        margin: 0;
        border: none;
        border-radius: 3px;
        width: 85px;
        height: 40px;
        margin: 0 10px;
        background: #f0f0f0;
        cursor: pointer;
        outline: none;
      }
      button:last-child {
        color: #fff;
        background: #ff0100;
      }
    }
  }
</style>
