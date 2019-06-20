<template>
  <!-- 助贷申请 -->
  <div id="loan_assistance">
    <div class="loan_assistance_list">
      <div class="title">
        <h3>助贷基金选择</h3>
      </div>
      <div class="item_wrap" v-for="(item, index) in fundList" :key='index' v-if="fundList.length !== 0">
        <div class="list">
          <img :src="item.avatar === '/static/default_avatar.png' ? 'static/img/tickets/default_bank.png' : URL + item.avatar" alt="">
          <p>{{item.name}}</p>
          <button @click="handleSelect(index)" :style='item.sel　? "background: #999": ""'>{{item.sel ? '取消选择' : '选择'}}</button>
        </div>
        <div class="member_info" v-if="item.member">
          <div>
            <span>授信分组：</span>
            <span>白名单</span>
          </div>
          <div>
            <span>单次授信最大占比：</span>
            <span>{{item.member.rate + '%'}}</span>
          </div>
          <div>
            <span>授信总额：</span>
            <span>{{toThousands(item.member.total_limit)}}</span>
          </div>
          <div>
            <span>授信余额：</span>
            <span>{{toThousands(item.member.rest_limit.toFixed(2))}}</span>
          </div>
        </div>
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
    border:1px solid #eaeaea;
    border-radius:2px;
    height:auto;
    margin: 20px 40px;
    padding: 20px;
    .title {
      height: 52px;
      border-bottom: 1px solid #eaeaea;
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
    .item_wrap {
      border: 1px solid #eaeaea;
      margin-top: 16px;
      background:#ffffff;
      .list {
        width:100%;
        height:72px;
        img {
          border-radius:8px;
          width:54px;
          height:54px;
          float: left;
          margin: 9px 22px 0 12px;
        }
        p {
          float: left;
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#333;
          letter-spacing:0;
          text-align:left;
          // text-decoration: underline;
          padding-top: 25px;
          font-weight: bold;
        }
        button {
          float: right;
          background:#f48537;
          border-radius:2px;
          width:118px;
          height:32px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#ffffff;
          letter-spacing:0;
          text-align:center;
          margin:  20px 15px 0 0;
          outline: none;
          border: none;
        }
      }
      .member_info {
        margin: 0 15px;
        border-top: 1px dashed #eaeaea;
        display: flex;
        line-height: 45px;
        font-size: 14px;
        div {
          color: #333;
          width: 25%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span:first-child {
            color: #666;
          }
        }
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
