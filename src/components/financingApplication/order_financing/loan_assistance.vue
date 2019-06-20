<template>
  <!-- 助贷申请 -->
  <div id="loan_assistance">
    <div class="loan_assistance_list">
      <div class="title">
        <h3>助贷基金选择</h3>
      </div>
      <div class="list">
        <img src="../../../../static/img/u504.png" alt="">
        <p>泸溪中小企业助贷基金</p>
        <button>选择</button>
      </div>
      <div class="btn">
        <button>跳过</button>
        <button @click="handlePlease">申请</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loanAssistance',
  methods: {
    handlePlease () {
      this.$emit('loan', true)
    }
  }
}
</script>

<style lang="less" scoped>
#loan_assistance {
  width:100%;
  min-height: 100%;
  .loan_assistance_list {
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
    .list {
      background:#ffffff;
      border:1px solid #e1e6f0;
      width:100%;
      height:88px;
      margin-top: 6px;
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
    }
    .btn {
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
        margin-left: 111px;
      }
    }
  }
}
</style>
