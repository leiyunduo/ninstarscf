<template>
  <div class="order_application">
    <ul class="step_nav">
      <li v-for="(item, index) in steps" :key='index' :class="index <= selIndex ? 'currentIndex' : ''" @click="handleNav(index)">
          <i :class="item.icon"></i>
        <div>
          <span>{{index + 1}}</span>
          <span>{{item.name}}</span>
        </div>
      </li>
    </ul>
    <orderUsage @usage='handleUsage' v-if="selIndex === 0"/>
    <orderFirstRepayment @first='handleFirst' v-if="selIndex === 1"/>
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
import orderUsage from './usage'
import orderFirstRepayment from './first_repayment'
export default {
  name: 'orderFinancingApplication',
  components: {
    orderUsage, orderFirstRepayment
  },
  data () {
    return {
      selIndex: 0,
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
  methods: {
    // 融资用途emit
    handleUsage (e) {
      this.handleChangeSteps(e)
    },
    // 第一还款来源emit
    handleFirst (e) {
      this.handleChangeSteps(e)      
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
      if (that.selIndex >= index) {
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
      console.log(this.steps)
    }
  },
}
</script>
<style lang="less" scoped>
  .order_application {
    min-height: 100%;
    background: #fafafa;
    padding: 0 40px;
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
</style>
