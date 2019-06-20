<template>
  <!-- 融资申请 -->
  <div id="financing_application">
    <div class="financing_application_list">
      <div class="title"><h3>金融机构选择</h3></div>
      <div class="btn_list">
        <button v-for="(item, index) in btnList" :key="index" :class="{action_btn: action_btn === index}" @click="btnClick(index)">{{item}}</button>
      </div>
      <!-- 定向发布 -->
      <div class="list" v-if='action_btn === 1'>
        <div class="content">
          <img src="../../../../static/img/u504.png" alt="">
          <p>泸溪中小企业助贷基金</p>
          <button @click="choice(choiceName)" :class="{btn_style: choiceName === '取消'}">{{choiceName}}</button>
        </div>
        <div class="content">
          <img src="../../../../static/img/u504.png" alt="">
          <p>泸溪中小企业助贷基金</p>
          <button>选择</button>
        </div>
        <div class="content">
          <img src="../../../../static/img/u504.png" alt="">
          <p>泸溪中小企业助贷基金</p>
          <button>选择</button>
        </div>
      </div>
      <!-- 区域发布 -->
      <div class="regional_release" v-if='action_btn === 0'>
        <p>您的所在地区为<i class="el-icon-location-outline"></i><span>湖南省 湘西土家族苗族自治州 泸溪县</span>，提交申请后，您所在区域的金融机构都将看到您的融资申请</p>
      </div>
      <div class="submission">
        <button @click="submission">提交申请</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'financingApplication',
  data () {
    return {
      btnList: ['区域发布', '定向发布'],
      action_btn: 0,
      choiceName: '选择'
    }
  },
  methods: {
    // 选择区域发布 or 定向发布
    btnClick (i) {
      var that = this
      that.action_btn = i
    },
    // 选择金融机构
    choice (n) {
      var that = this
      if (n === '选择') {
        that.choiceName = '取消'
      } else {
        that.choiceName = '选择'
      }
    },
    submission () {
      this.$emit('financing', true)
    }
  }
}
</script>

<style lang="less" scoped>
#financing_application {
  width:100%;
  min-height: 100%;
  .financing_application_list {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    margin: 20px 0;
    padding: 0 53px 22px 21px;
    .title {
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
    .btn_list {
      display: flex;
      flex-direction: row;
      padding-left: 31px;
      margin: 16px 10px;
      button {
        background:#b7b7b7;
        border-radius:2px;
        width:120px;
        height:30px;
        border: none;
        outline: none;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#ffffff;
        letter-spacing:0;
        text-align:center;
      }
      .action_btn {
        background:#f48537;
      }
      button:last-child {
        margin-left: 16px;
      }
    }
    .list {
      width:100%;
      height:100%;
      padding: 0 39px 0 32px;
      .content {
        height:88px;
        background:#ffffff;
        border: 1px solid #e1e6f0;
        border-bottom:1px dashed #e1e6f0;
        border-top: none;
      }
      img {
        border-radius:8px;
        width:66px;
        height:65px;
        float: left;
        margin: 12px 22px 0 12px;
      }
      p {
        float: left;
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#e87626;
        letter-spacing:0;
        text-align:left;
        text-decoration: underline;
        padding-top: 35px;
        font-weight: bold;
      }
      button {
        float: right;
        background:#f48537;
        border-radius:2px;
        width:118px;
        height:30px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#ffffff;
        letter-spacing:0;
        text-align:center;
        margin:  30px 33px 0 0;
        outline: none;
        border: none;
      }
      .btn_style {
        background:#cccccc;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#ffffff;
        letter-spacing:0;
        text-align:center;
      }
      .content:first-child {
        border-top:1px solid #e1e6f0;
      }
      .content:last-child {
        border-bottom:1px solid #e1e6f0;
      }
    }
    .regional_release {
      padding-top: 68px;
      text-align: center;
      p {
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:center;
        width: 500px;
        margin: 0 auto;
        padding-bottom: 100px;
        i {
          color:#eb6100;
          font-weight: bold;
        }
        span {
          color:#eb6100;
          font-weight: bold;
        }
      }
    }
    .submission {
      text-align: center;
      margin-top: 50px;
      button {
        background:#e87626;
        border-radius:2px;
        width:120px;
        height:30px;
        border: none;
        outline: none;
        font-family:PingFangSC-Semibold;
        font-size:12px;
        color:#ffffff;
        letter-spacing:0;
        text-align:center;
        margin-bottom: 63px;
      }
    }
  }
}
</style>
