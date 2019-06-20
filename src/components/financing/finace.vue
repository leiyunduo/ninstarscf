<template>
  <div class="form">
    <ul>
      <li class="nav_item" v-for="(nav, index) in showList" :key="index" @click="handleClick($event, index)">
        <div class="line" v-if="index !== 0" :style="navIndexList[index] === 1 ? 'border-color: #eb6100':''"></div>
        <div class="icon">
          <i class="iconfont" :class="nav.icon" :style="navIndexList[index] === 1 ? 'color: #eb6100':''"></i>
          <p>{{nav.title}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'getset',
  props: ['statusList', 'type', 'fType', 'fid', 'bid', 'istep'],
  data () {
    return {
      lineStatus: 0,
      applicatoin: [
        {title: '融资申请', icon: 'icon-icon-xb'},
        {title: '期望融资', icon: 'icon-icon-xb6'},
        {title: '银行反馈', icon: 'icon-icon-xb2'},
        {title: '尽调', icon: 'icon-icon-xb4'},
        {title: '三方协议', icon: 'icon-icon-xb3'},
        {title: '资金监管', icon: 'icon-huankuanlaiyuan'},
        {title: '放款', icon: 'icon-icon-xb5'},
        {title: '还款', icon: 'icon-icon-xb1'}
      ],
      applicatoin1: [
        {title: '融资申请', icon: 'icon-icon-xb'},
        {title: '期望融资', icon: 'icon-icon-xb6'},
        {title: '银行反馈', icon: 'icon-icon-xb2'},
        {title: '尽调', icon: 'icon-icon-xb4'},
        {title: '三方协议', icon: 'icon-icon-xb3'},
        {title: '放款', icon: 'icon-icon-xb5'},
        {title: '还款', icon: 'icon-icon-xb1'}
      ],      
      acception: [
        {title: '融资申请', icon: 'icon-icon-xb'},
        {title: '尽调', icon: 'icon-icon-xb4'},
        {title: '三方协议', icon: 'icon-icon-xb3'},
        {title: '放款', icon: 'icon-icon-xb5'},
        {title: '资金监管', icon: 'icon-huankuanlaiyuan'},
        {title: '还款', icon: 'icon-icon-xb1'}
      ],
      showList: [],
      navIndexList: [],
      business_id: '',
      score: {}
    }
  },
  mounted () {
    var that = this
    // // console.log(that.statusList)
    // console.log(that.type)
    // console.log(that.fid)
    if (Number(that.type) === 1) {
      that.showList = that.applicatoin
      if (!that.fid) {
        that.statusList === '1' ? that.navIndexList = [1, 0, 0, 0, 0, 0, 0, 0] : that.navIndexList = [1, 1, 0, 0, 0, 0, 0, 0]
      } else {
        that.$ajax.get('/api/financing_application_info/?token=' + that.$token() + '&financing_id=' + that.fid + '&financing_type=receivable').then(res => {
          // console.log(res)
          if (res.data.code === '1') {
            that.business_id = res.data.data.institution.id || that.bid
            that.area_publish = res.data.data.area_publish
            if (res.data.data.i_step === '1') {
              that.navIndexList = [1, 1, 0, 0, 0, 0, 0, 0]
            }else if (res.data.data.i_step === '2') {
              that.navIndexList = [1, 1, 1, 0, 0, 0, 0, 0]
            } else if (res.data.data.i_step === '3') {
              that.navIndexList = [1, 1, 1, 1, 0, 0, 0, 0]
            } else if (res.data.data.i_step === '4') {
              that.navIndexList = [1, 1, 1, 1, 1, 0, 0, 0]
            } else if (res.data.data.i_step === '5') {
              !res.data.data.loan.usage_submit ? that.navIndexList = [1, 1, 1, 1, 1, 1, 0, 0] : that.navIndexList = [1, 1, 1, 1, 1, 1, 1, 0]
            } else if (res.data.data.i_step === '6') {
              that.navIndexList = [1, 1, 1, 1, 1, 1, 1, 1]
            }
          }
        })
      }
    } else if (Number(that.type) === 2) {
      that.$ajax.post('/api/institution_get_financing/', {token: that.$token(), financing_type: that.fType, financing_id: that.fid}).then(res => {
        that.showList = that.acception
        res.data.business_confirm ? that.currentStep = 8 : that.currentStep = Number(res.data.i_step)
        // that.currentStep = 4
        let arr = []
        let navIndexList = [0, 0, 0, 0, 0, 0]
        // 区域发布等待企业确认
        if (that.currentStep === 7) {
          that.navIndexList = [1, 1, 0, 0, 0, 0]
        } else if (that.currentStep === 8) {
          that.navIndexList = [1, 1, 1, 1, 1, 1]
        } else {
          navIndexList.forEach((val,index) => {
            if (index <= that.currentStep - 2) {
              val = 1
              arr.push(val)
            } else {
              val = 0
              arr.push(val)
            }
          })
          that.navIndexList = arr
        }
      })
    } else if (Number(that.type) === 3) {
      that.showList = that.applicatoin1
      if (!that.fid) {
        that.navIndexList = [1, 0, 0, 0, 0, 0, 0]
      } else {
        that.$ajax.get('/api/financing_application_info/?token=' + that.$token() + '&financing_id=' + that.fid + '&financing_type=order').then(res => {
          // console.log(res)
          if (res.data.code === '1') {
            that.business_id = res.data.data.institution.id || that.bid
            that.area_publish = res.data.data.area_publish
            // that.score = res.data.data.score
            if (res.data.data.i_step === '1') {
              that.navIndexList = [1, 1, 0, 0, 0, 0, 0]
            }else if (res.data.data.i_step === '2') {
              that.navIndexList = [1, 1, 1, 0, 0, 0, 0]
            } else if (res.data.data.i_step === '3') {
              that.navIndexList = [1, 1, 1, 1, 0, 0, 0]
            } else if (res.data.data.i_step === '4') {
              that.navIndexList = [1, 1, 1, 1, 1, 0, 0]
            } else if (res.data.data.i_step === '5') {
              that.navIndexList = [1, 1, 1, 1, 1, 1, 0]
            } else if (res.data.data.i_step === '6') {
              that.navIndexList = [1, 1, 1, 1, 1, 1, 1]
            } 
          }
        })
      }
    }
  },
  methods: {
    handleClick: function ($event, index) {
      var that = this
      if (that.navIndexList[index] === 1) {
        if (that.type === '1') {
          var query = {fid: that.fid, type: that.fType === 'order' ? '2' : '1', id: that.business_id}
          let userRouter = [
            '/getting_application',
            '/getting_expectation',
            !that.area_publish ? '/getting_issue' : '/sure_bank',
            '/getting_submit',
            '/getting_feedback',
            '/getting_usage',
            '/getting_upload',
            '/getting_repayment'
          ]
          let path = userRouter[index]
          // // console.log(query)
          that.$router.push({path, query})
        } else if (that.type === '2'){
          var query = {fid: that.fid, type: that.fType === 'order' ? '1' : '0', istep: that.istep}
          if (that.fType === 'order') {
            if (Number(query.istep) === 2) {
              const bankRouter = ['/financingApplication', '/orderPossible', '/Agreement', '/Loan', '/Usage', '/repaymentBank']
              const path = bankRouter[index]
              that.$router.push({path, query})
            } else {
              const bankRouter = ['/financingPossible', '/orderPossible', '/Agreement', '/Loan', '/Usage', '/repaymentBank']
              const path = bankRouter[index]
              that.$router.push({path, query})
            }
          } else {
            const bankRouter = ['/viewDetails', '/possible', '/Agreement', '/Loan', '/Usage', '/repaymentBank']
            const path = bankRouter[index]
            that.$router.push({path, query})
          }
          // const bankRouter = ['/viewDetails', '/possible', '/Agreement', '/Loan', '/Usage', '/repaymentBank']
          // const path = bankRouter[index]
          // that.$router.push({path, query})
        } else if (that.type === '3') {
         var query = {fid: that.fid, type: '2', id: that.business_id}
         let userRouter1 = [
           '/orderFinancing',
           '/orderExpectation',
           !that.area_publish ? '/orderIssue' : '/sure_bank',
           '/orderSubmit',
           '/orderFeedback',
           'orderUpload',
           'orderRepayment'
         ]
         let path = userRouter1[index]
         that.$router.push({path, query})
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import url('./font/iconfont.css');
@import url('./new_icon/iconfont.css');
.form {
  // color: #343536;
  // font-size: 14px;
  // padding-top: 155px;
  // width: 1280px;
  // margin: 0 auto;
  // background: #f5f7f8;
  ul {
    display: flex;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    background: #fff;
    margin: 0 auto;
    border: 1px solid #ccc;
    li {
      display: flex;
      align-items: center;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 80px;
        i {
          font-size: 36px;
          color: #d0d0d0;
        }
        p {
          font-size: 14px;
          margin-top: 10px;
          color: #3c4046;
        }
      }
      .line {
        height: 0px;
        border-top: 2px dashed #d0d0d0;
        width: 55px;
        height: 30px;
      }
      .status {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid #d0d0d0;
        background: #fff;
        text-align: center;
        line-height: 16px;
        color: #d0d0d0;
        font-size: 14px;
        margin-top: -26px;
      }
    }
  }
}
</style>
