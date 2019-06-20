 <template>
  <div class="usercenter">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="view_info">
      <location :location="location"></location>
      <getset :statusList="statusList" type='1' :fid='fid' :bid='bid'></getset>
      <div class="sub_after">
        <div class="success_sub">
          <p class="s_title">提交成功</p>
          <p class="s_line">
           您的区域发布还未被接受，接手后将展示在您的融资记录中。
          </p>
          <p class="s_line">
            本次发布有效期为7天
          </p>
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
        { title: '银行反馈' }
      ],
      invoiceList: [],
      statusList: [1, 1, 1, 0, 0, 0, 0, 0],
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
      overIssue: -1
    }
  },
  methods: {
    backIndex: function () {
      this.$router.push({
        path: '/financing'
      })
    }
  },
  beforeCreate () {
    var that = this
    // console.log(that.$route.query)
    if (that.$route.query.id || that.$route.query.fid) {
      that.bid = Number(that.$route.query.id)
      that.fid = Number(that.$route.query.fid)
    } else {
      that.is404 = 1
    }
    // // console.log(1234)
    // var navStaus = that.statusList
    // var setp = that.setp
    // var showNav = []
    // navStaus.map((val, index) => {
    //   showNav[index] = {}
    //   if (index <= setp) {
    //     showNav[index].color = '#eb6100'
    //   } else {
    //     showNav[index].color = ''
    //   }
    // })
    // that.$ajax.get('/api/get_loan_feedback/?token=' + that.$token() + '&financing_id=' + (that.fid).toFixed() + '&institution_id=' + that.bid + '&financing_type=receivable').then(res => {
    //   // console.log(res)
    //   if (res.data.i_step === '2') {
    //     that.applicationStatus = Number(res.data.code)
    //   } else {
    //     that.overIssue = 1
    //   }
    // })
  }
}
</script>

<style scoped lang="less">
  // @import url('./iconfont.css');
  .usercenter {
    width: 100%;
    height: 100%;
    display: flex;
    //padding-top: 70px;
    .view_info {
      padding: 0 50px;
      background: #f5f7f8;
      // width: 100%;
      .status_pic {
        margin-top: 30px;
        padding: 0 30px;
        .pic_info {
          display: flex;
          height: 150px;
          justify-content: space-between;
          // background: #fff;
          font-size: 14px;
          .mine_info {
            width: 15%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .icon_wrap{
              width: 50px;
              height: 50px;
              background: #f0f0f0;
              color: #fff;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              i {
                font-size: 30px;
              }
            }
            .line_to {
              height: 30px;
              width: 3px;
              background: #eb6100;
              margin-top: 10px;
            }
            div:last-child{
              margin-top: 10px;
            }
          }
          .pic_line {
            width: 68%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .seller_info {
            width: 15%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .icon_wrap{
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              i {
                font-size: 32px;
                color: rgb(235, 97, 0);
              }
            }
            .line_to {
              height: 30px;
              width: 2px;
              background: #eb6100;
              margin-top: 10px;
            }
            div:last-child {
              margin-top: 5px;
            }
          }
        }
      }
      .want_money {
        padding: 30px 0;
        border-bottom: 1px solid #eaeaea;
        div {
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
        }
      }
      .form_sub {
        padding: 20px 120px;
        border-bottom: 1px solid #eaeaea;
        .form_line {
          height: 40px;
          display: flex;
          font-size: 14px;
          align-items: center;
          &>span:first-child {
            width: 100px;
          }
        }
        .form_line:first-child {
          height: 60px;
          input {
            width: 220px;
            height: 35px;
            border: 1px solid #dcdfe6;
            padding: 0 10px;
          }
        }
        .select_line {
          height: 40px;
          display: flex;
          div {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-right: 15px;
            input[type=checkbox]{
              width: 16px;
              height: 16px;
              background: #fff;
              margin: 0;
              padding: 0;
            }
          }
        }
      }
      .bank_list {
        // padding: 0 150px;
        ul {
          // margin-top: 30px;
          li{
            background: #fff;
            border: 1px solid #EAEAEA;
            width: 800px;
            margin: 0 auto;
            margin-top: 30px;
            &>div{
              display: flex;
              height: 120px;
              // width: 120px;
              .item_left {
                display: flex;
                .logo_wrap {
                  width: 120px;
                  height: 120px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img {
                    width: 80px;
                    height: 80px;
                  }
                }
                .item_info {
                  width: 500px;
                  padding: 15px 0;
                  div:first-child {
                    height: 30px;
                    font-size: 14px;
                    line-height: 30px;
                  }
                  div:last-child {
                    height: 30px;
                    font-size: 14px;
                    line-height: 30px;
                    color:#999;
                  }
                }
              }
              .item_rigth {
                width: 180px;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                align-items: center;
                font-size: 14px;
                padding: 20px 0;
                div {
                  width: 70%;
                  cursor: pointer;
                  border-radius: 3px;
                  height: 25px;
                  color: #fff;
                  background: #eb6100;
                  text-align: center;
                  line-height: 25px;
                }
              }
            }
          }
        }
      }
      .subdata {
        margin-top: 40px;
        padding: 20px 0;
        div {
          width: 120px;
          height: 36px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 36px;
          background: #eb6100;
          margin: 0 auto;
          cursor: pointer;
        }
      }
    }
    .sub_after {
      .success_sub {
        // width: 1080px;
        padding: 30px 0;
        box-shadow: 0px 0px 5px #ccc;
        margin: 30px auto;
        width: 80%;
        background: #fff;
        color: #333;
        font-size: 14px;
        .s_title {
          line-height: 60px;
          width: 60%;
          margin: 0 auto;
          text-align: center;
        }
        .s_line {
          line-height: 40px;
          width: 60%;
          text-align: center;
          margin: 0 auto;
        }
        .s_info {
          line-height: 30px;
          font-size: 12px;
          width: 60%;
          text-align: right;
          margin: 20px auto;
        }
      }
      .back_index {
        margin-top: 80px;
        div {
          width: 90px;
          height: 30px;
          text-align: center;
          color: #fff;
          background: #eb6100;
          font-size: 14px;
          cursor: pointer;
          line-height: 30px;
          border-radius: 5px;
          margin: 0 auto;
        }
      }
    }
    .file_after {
      width: 1280px;
      margin: 0 auto;
      padding: 100px 0;
      margin-top: 30px;
      font-size: 14px;
      text-align: center;
    }
  }
  .overview {
    div.for_title {
      line-height: 60px;
      color: #999;
      text-align: center;
    }
    .back_index {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 120px;
        height: 36px;
        color: #fff;
        background: #eb6100;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
      }
    }
  }
</style>
