<template>
  <!-- 订单融资 -->
  <div id="order_financing">
    <div class="financing_flex">
      <!-- <appNav :father="father" type='1'></appNav> -->
      <div class="order_financing_list">
        <div class="nav">
          <img src="../../../../static/img/leftbar/myzhaiq-1.png" alt=""><span>订单融资说明</span>
        </div>
        <ul class="step_nav">
          <li v-for="(item, index) in steps" :key='index' :class="index <= selIndex ? 'currentIndex' : ''" @click="handleNav(index)">
              <i :class="item.icon"></i>
            <div>
              <span>{{index + 1}}</span>
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
        <div class="order_financing_content">
          <!-- 融资用途 -->
          <orderUsage @usage='handleUsage' v-if="selIndex === 0"/>
          <!-- 第一还款 -->
          <orderFirstRepayment @first='handleFirst' v-if="selIndex === 1"/>
          <!-- 第二还款来源 -->
          <second-repayment @second='handleSecond' v-if="selIndex === 2" />
          <!-- 助贷申请 -->
          <loan-assistance @loan='handleLoan' v-if="selIndex === 3" />
          <!-- 融资申请 -->
          <financing-application @financing='handleFinancing' v-if="selIndex === 4" />
        </div>
      </div>
    </div>
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
</template>

<script>
import Location from '../../location/location'
// import appNav from '../../financing/financingManege'
// 融资用途
import orderUsage from './usage'
// 第一还款来源
import orderFirstRepayment from './first_repayment'
// 第二还款来源
import secondRepayment from './second_repayment'
// 助贷申请
import loanAssistance from './loan_assistance'
// 融资申请
import financingApplication from './financing_application'
export default {
  components: {
    Location,
    // appNav,
    orderUsage,
    orderFirstRepayment,
    secondRepayment,
    loanAssistance,
    financingApplication
  },
  data () {
    return {
      selIndex: 0,
      father: {
        selIndex: 1
      },
      navInfo: '',
      centerDialogVisible:  false,
      navIndex: -1,
      steps: [
        {name: '融资用途', icon: 'el-icon-service', emitData: {}},
        {name: '第一还款来源', icon: 'el-icon-date', emitData: {}},
        {name: '第二还款来源', icon: 'el-icon-edit', emitData: {}},
        {name: '助贷申请', icon: 'el-icon-menu', emitData: {}},
        {name: '融资申请', icon: 'el-icon-news', emitData: {}}
      ]
    }
  },
  mounted () {
    const that = this
    if (that.$route.query.qIndex) {
      that.selIndex = Number(that.$route.query.qIndex)
    }
  },
  methods: {
    // 融资用途emit
    handleUsage (e) {
      const that = this
      this.handleChangeSteps(e)
    },
    // 第一还款来源emit
    handleFirst (e) {
      const that = this
      that.handleChangeSteps(e)      
    },
    // 第二还款来源
    handleSecond (e) {
      const that = this
      that.handleChangeSteps(e)   
    },
    // 助贷
    handleLoan (e) {
      const that = this
      that.handleChangeSteps(e)  
    },
    // 融资申请
    handleFinancing (e) {
      const that = this
      that.handleChangeSteps(e)  
    },
    // 公共跳转逻辑，e 为组件下一步返回是数据
    handleChangeSteps (obj) {
      const that = this
      let steps = that.steps
      steps[that.selIndex].emitData = obj
      that.steps = steps
      that.selIndex += 1
    },
    // 上方导航
    handleNav (index) {
      const that = this
      if (that.selIndex >= index) {
        that.navIndex = index
        that.centerDialogVisible = true
        that.navInfo = `您将回到${that.steps[index].name}，在那之后的所有操作将重新开始，是否继续？`
      }
    },
    // 确认离开当前步骤
    handleSetp () {
      const that = this
      that.centerDialogVisible = false
      that.selIndex = that.navIndex
      console.log(that.steps)
    }
  }
}
</script>

<style lang="less" scoped>
#order_financing {
  width: 100%;
  //padding-top: 70px;
  min-height: 100%;
  background: #f5f7f8;
  .financing_flex {
    display: flex;
  }
  .order_financing_list {
    min-height: 100%;
    width: 100%;
    // width: calc(100% - 200px);
    .nav {
      background:#ffffff;
      border:1px solid #cccccc;
      border-radius:2px;
      width:100%;
      height:50px;
      // line-height: 50px;
      img {
        margin: 15px 16px 0 21px;
        float: left;
      }
      span {
        float: left;
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        padding-top: 14px;
      }
    }
    .step_nav {
      display: flex;
      padding: 12px 0;
      background: #fff;
      margin-bottom: 20px;
      li.currentIndex {
        i{
          color: #eb6100;
        }
        div {
          color: #eb6100;
          span:first-child {
            border: 1px solid #eb6100; 
          }
          span:last-child {
            border-bottom: 2px solid #eb6100;
          }
        }
      }
      li {
        list-style: none;
        width: 20%;
        text-align: center;
        background: #fff;
        cursor: pointer;
        i {
          margin-bottom: 8px;
          font-size: 26px;
          color:#666;
          font-weight: bolder;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          span:first-child {
            // padding: 12px;
            width: 18px;
            height: 18px;
            border: 1px solid #666;
            border-radius: 50%;
            margin-right: 12px;
            line-height: 18px;
            font-size: 14px;
          }
          span:last-child {
            padding: 5px 0;
            border-bottom: 2px solid #fff;
          }
        }
      }
    }
    .order_financing_content {
      padding: 0 69px 0 21px;
    }
  }
}
.dialog-footer {
  margin: 51px 0;
  text-align: center;
  button {
    outline: none;
    border-radius:2px;
    width:118px;
    height:28px;
  }
  button:first-child {
    border:1px solid #f48537;
    background: none;
    font-family:PingFangSC-Semibold;
    font-size:12px;
    color:#e87626;
    letter-spacing:0;
    text-align:center;
  }
  button:last-child {
    background:#e87626;
    border: none;
    font-family:PingFangSC-Semibold;
    font-size:12px;
    color:#ffffff;
    letter-spacing:0;
    text-align:center;
    margin-left: 30px;
  }
}
</style>
