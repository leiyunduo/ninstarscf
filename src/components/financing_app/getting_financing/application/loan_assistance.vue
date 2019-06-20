<template>
  <!-- 助贷申请 -->
  <div id="loan_assistance">
    <div class="loan_assistance_list">
      <div class="title">
        <h3>助贷基金选择</h3>
      </div>
      <div class="list" v-for="(item, index) in fundList" :key='index' v-if="fundList.length !== 0">
        <img :src="item.avatar === '/static/default_avatar.png' ? './static/img/default_c.png' : URL + item.avatar" alt="">
        <p>{{item.name}}</p>
        <button @click="handleSelect(index)" :style='item.sel　? "background: #999": ""'>{{item.sel ? '取消选择' : '选择'}}</button>
      </div>
      <div class="second_list_none" v-if="fundList.length === 0">
        <img src="../../../../../static/img/other/none.png" alt="">
        <h4>还未加入任何助贷基金。</h4>
      </div>
      <div class="btn">
        <!-- <button @click="handlePlease">跳过</button> -->
        <button @click="handlePlease">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loanAssistance',
  data () {
    return {
      fundList: [],
      URL: this.$root_url()
    }
  },
  created () {
    const that = this
    this.$ajax.get('/api/financing/fund_list/').then(res => {
      console.log(res)
      if (res.status === 200) {
        let arr = []
        res.data.forEach((element, index) => {
          arr[index] = {...element, ...element.fund_info, sel: false}
        })
        that.fundList = arr
      }
    })
  },
  methods: {
    handlePlease () {
      let selFund = {}
      this['fundList'].forEach(val => {
        if (val.sel) selFund['fund_id'] = val.id
      })
      console.log(selFund)
      this.$emit('loan', selFund)
    },
    // 单选
    handleSelect (i) {
      let fundList = this.fundList
      if (fundList[i].sel) {
        fundList[i].sel = false
      } else {
        fundList.forEach((val, index) => {
          if (index !== i) {
            val.sel = false
          } else {
            val.sel = true
          }
        })
      }
      this.fundList = fundList
    }
  }
}
</script>

<style lang="less" scoped>
#loan_assistance {
  width:100%;
  // min-height: 100%;
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
      margin-top: 16px;
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
        color:#333;
        letter-spacing:0;
        text-align:left;
        // text-decoration: underline;
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
      margin: 24px 0;
      text-align: center;
      button {
        width: 120px;
        text-align: center;
        line-height: 30px;
        margin: 0 auto;
        cursor: pointer;
        background: #e87626;
        border-radius: 2px;
        height: 30px;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0;
        border: 1px solid #e87626;
      }
    }
    .second_list_none {
      text-align: center;
      min-height: 400px;
      color: #999;
      img {
        width:162px;
        height:125px;
        margin-top: 100px;
      }
    }
  }
}
</style>
