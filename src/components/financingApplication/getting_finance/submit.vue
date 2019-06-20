<template>
  <div class="usercenter">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="view_info">
      <location :location="location"></location>
      <getset :statusList="statusList" type='1' :fid='fid' fType='receivable' :bid='bid'></getset>
      <div class="sub_after" v-if="overSubmit === 0">
        <div class="sub_tip">
          <p class="s_title">提交成功</p>
          <p class="s_line">
            {{bankname}}将对正在对您进行尽调，
          </p>
          <p class="s_line">
            预计24小时之内业务经理会主动和您联系
          </p>
          <p class="s_line">
            3-5个工作日获取审核反馈，请注意查看
          </p>
          <p class="l_tip">
            <!-- 如有疑问，请拨打18511618477 -->
          </p>
        </div>
        <div class="back_index">
          <div @click="backIndex">回到首页</div>
        </div>
      </div>
      <div class="file_after" v-if="overSubmit === 1">
        <div>
          <p class="file_title">本次尽调已完成</p>
        </div>
        <div class="back_index">
          <div @click="backIndex">回到首页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Location from '../../location/location'
// import appNav from '../../financing/financingManege'
import Getset from '../../financing/finace'
export default {
  name: 'application',
  components: {
    Getset,
    // appNav,
    Location
  },
  data () {
    return {
      father: {selIndex: 3},
      location: [
        { title: '我的融资', url: '/financing' },
        { title: '尽调' }
      ],
      invoiceList: [],
      statusList: [1, 1, 1, 1, 0, 0, 0, 0],
      money: {
        wantted: '1,000,000.00',
        getted: '1,000,000.00'
      },
      our_tel: '18511618477',
      myWanna: '',
      gettedTime: '',
      backTime: '',
      bankList: [],
      isBank: 0,
      isDis: 0,
      applicationStatus: -1,
      wantedInfo: '',
      refuseReason: '',
      overSubmit: 0,
      bankname: -1
    }
  },
  methods: {
    selCheckbox: function ($event, index) {
      if (index === 0) {
        document.getElementsByName('sendTocom')[0].checked ? this.isBank = 1 : this.isBank = 0
      } else {
        document.getElementsByName('sendTodis')[0].checked ? this.isDis = 1 : this.isDis = 0
      }
    },
    selBnak: function ($event, i) {
      var bankList = this.bankList
      bankList.forEach((val, index) => {
        if (index === i) {
          val.sel === 0 ? val.sel = 1 : val.sel = 0
        }
      })
    },
    subdata: function () {
    },
    submitted: function () {
      this.applicationStatus = 1
    },
    backIndex: function () {
      this.$router.push({
        path: '/financing'
      })
    }
  },
  beforeCreate () {
    var that = this
    // console.log(that.$route.query)
    if (that.$route.query.id && that.$route.query.fid) {
      that.bid = Number(that.$route.query.id)
      that.fid = Number(that.$route.query.fid)
    } else {
      that.is404 = 1
    }
    that.$ajax.get('/api/get_loan_feedback/?financing_id=' + that.fid + '&institution_id=' + that.bid + '&token=' + that.$token() + '&financing_type=receivable').then(res => {
      // console.log(res)
      that.bankname = res.data.name
      // if (res.data.code === '102') {
      //   if (res.data.i_step === '3') {
      //     // console.log(that.bankname)
      //   } else {
      //     that.overSubmit = 1
      //   }
      // }
    })
  }
}
</script>

<style scoped lang="less">
  // @import url('./iconfont.css');
  .usercenter {
    width: 100%;
    display: flex;
    height: 100%;
    //padding-top: 70px;
    .view_info {
      padding: 0 50px;
      background: #f5f7f8;
      height: 100%;
      overflow-y: auto;
      // width: 100%;
      .status_pic {
        margin-top: 30px;
        .sub_info {
          // width: 1080px;
          background: #fff;
          margin: 0 auto;
          // padding: 100px 0;
          padding-bottom: 50px;
          .show_title {
            height: 120px;
            line-height: 120px;
            text-align: center;
            font-weight: bold;
            font-size: 18px;
            color: #333;
          }
          .show_info {
            width: 60%;
            margin: 0 auto;
            font-size: 14px;
            color: #333;
            line-height: 32px;
          }
        }
        .submitted {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            width: 90px;
            height: 30px;
            background: #eb6100;
            color: #fff;
            border-radius: 5px;
            font-size: 14px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
          }
        }
      }
    }
    .sub_after {
      // width: 1280px;
      margin: 0 auto;
      .sub_tip {
        box-shadow: 0px 0px 5px #ccc;
        background: #fff;
        margin: 0 auto;
        width: 80%;
        margin-top: 30px;
        color: #333;
        padding-bottom: 20px;
        .s_title {
          line-height: 40px;
          text-align: center;
        }
        .s_line {
          line-height: 32px;
          text-align: center;
          font-size: 14px;
        }
        .l_tip {
          width: 60%;
          font-size: 12px;
          text-align: right;
          margin: 0 auto;
          margin-top: 20px;
        }
      }
    }
    .file_after {
      // width: 1280px;
      margin: 0 auto;
      padding: 30px 0;
      margin-top: 30px;
      font-size: 14px;
      &>div:first-child {
        // background: #fff;
        padding-bottom: 30px;
      }
      .file_title {
        line-height: 60px;
        padding: 0 30px;
      }
      p:last-child {
        padding: 0 30px;
        // width: 60%;
        text-align: center;
        line-height: 60px;
        line-height: 24px;;
        font-size: 14px;
        margin: 0 auto;
      }
    }
    .back_index {
      margin-top: 30px;
      div {
        width: 120px;
        height: 30px;
        text-align: center;
        color: #fff;
        background: #eb6100;
        font-size: 14px;
        cursor: pointer;
        line-height: 30px;
        // border-radius: 5px;
        margin: 0 auto;
      }
    }
  }
</style>
