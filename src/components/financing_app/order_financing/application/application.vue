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
      <orderUsage @usage='handleUsage' v-if="selIndex === 0"/>
      <orderFirstRepayment @first='handleFirst' v-if="selIndex === 1"/>
      <secondRepayment @second='handleSecond' v-if='selIndex === 2' />
      <loanAssistance @loan='handleLoan' v-if='selIndex === 3' />
      <financingApplication @bank='handleBank' v-if='selIndex === 4' />
      <financingFile @submit='handleSubmit' v-if='selIndex === 5' />
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
import orderUsage from './usage'
import orderFirstRepayment from './first_repayment'
import secondRepayment from './second_repayment'
import loanAssistance from './loan_assistance'
import financingApplication from './financing_application'
import financingFile from './file'

export default {
  name: 'orderFinancingApplication',
  components: {
    location,
    //  AppNav, 
    orderUsage, orderFirstRepayment, secondRepayment, loanAssistance, financingApplication, financingFile
  },
  data () {
    return {
      selIndex: 0,
      navInfo: '',
      centerDialogVisible:  false,
      navIndex: -1,
      steps: [
        {name: '融资用途', icon: require('../../../../../static/img/financing/usage.png'), disicon: require('../../../../../static/img/financing/usage-d.png'), emitData: {}},
        {name: '第一还款来源', icon: require('../../../../../static/img/financing/first.png'), disicon: require('../../../../../static/img/financing/first-d.png'), emitData: {}},
        {name: '第二还款来源', icon: require('../../../../../static/img/financing/second.png'), disicon: require('../../../../../static/img/financing/second-d.png'), emitData: {}},
        {name: '助贷申请', icon: require('../../../../../static/img/financing/fund.png'), disicon: require('../../../../../static/img/financing/fund-d.png'), emitData: {}},
        {name: '融资申请', icon: require('../../../../../static/img/financing/application.png'), disicon: require('../../../../../static/img/financing/application-d.png'), emitData: {}},
        {name: '个人责任授信函', icon: require('../../../../../static/img/financing/file.png'), disicon: require('../../../../../static/img/financing/file-d.png'), emitData: {}}
      ],
      location: [
        {title: '我的融资', url: '/financing_app'},
        {title: '订单融资申请'}
      ]
    }
  },
  methods: {
    // 融资用途emit
    handleUsage (e) {
      this.handleChangeSteps(e)
    },
    // 第一还款来源emit
    handleFirst (e) {
      this.handleChangeSteps(e)
    },
    // 第二还款来源emit
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
    // 提容融资申请
    handleSubmit (e) {
      const that = this
      let {steps} = that
      let submitData = {}
      submitData['type'] = '1'
      submitData['institution'] = steps[4].emitData.bankList
      steps[4].emitData.bankList.length === 0 ? submitData['region_code'] = localStorage.region_code : ''
      steps[4].emitData.bankList.length !== 0 ? submitData['is_region_code'] = false : ''
      steps[0].emitData.list.forEach(val => {
        val.order = val.showOrder
      })
      let second_repayment = []
      steps[2].emitData.selList.forEach(val => {
        second_repayment.push(val.id)
      })
      submitData['application_data'] = {
        chain_id: steps[0].emitData.list[0].chain_id,
        chain_info: steps[0].emitData.list,
        shortage: 0,
        second_repayment,
        other_collateral: steps[2].emitData.otherList,
        first_repayment: steps[1].emitData,
        file: e,
        bank_account_info: steps[0].emitData.bankInfo
      }
      submitData['expect_data'] = {
        value: steps[0].emitData.amount,
        expect_loan_date: that.$time(steps[0].emitData.except_date, 2),
        expect_repayment_date: that.$time(steps[0].emitData.repayment_date, 2)
      }
      submitData['helping_data'] = steps[3].emitData
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
      //padding-top: 70px;
      .location_wrap {
        background: #fff;
      }
      .step_nav {
        margin: 0 40px;
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
          flex: 1;
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
