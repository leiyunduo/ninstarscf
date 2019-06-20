 <template>
  <div class="feedback">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="view_info">
      <location :location="location"></location>
      <getset :statusList="statusList" type='1' :fid='fid' fType='receivable' :bid='bid'></getset>
      <div class="agreement" v-if="overFeed === 0">
        <agreement></agreement>
      </div>
      <div class="c_loan_box">
        <div class="show_line">
          <span>还款日期：</span>
          <el-date-picker
            v-model="formData.repayment_date"
            type="date"
              :disabled="formData.repayment_date ? true : false"
            placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="show_line">
          <span class="lv">还款利率：</span>
          <input type="text" v-model="formData.interest_rate" :disabled="formData.interest_rate ? true : false" placeholder="示例：12.3" maxlength="14">
          <span class="fh">%</span>
        </div>
        <div class="show_line">
          <span>还款金额：</span>
          <input type="text" v-model="formData.amount" :disabled="formData.amount ? true : false" placeholder="示例：900.00" maxlength="14">
        </div>
      </div>
      <div class="legalperson" v-if="overFeed === 0">
        <div>
          <div class="l_title">法人信息</div>
          <div class="l_line">法人姓名：{{legalperson.name}}</div>
          <div class="l_line">法人证件号码：{{legalperson.card_id}}</div>
          <div class="pic_list">
            <div class="pic_item">
              <img :src="rootUrl + legalperson.pic_1" alt="">
              <p>身份证国徽面照</p>
            </div>
            <div class="pic_item">
              <img :src="rootUrl + legalperson.pic_2" alt="">
              <p>身份证人像面照</p>
            </div>
            <div class="pic_item">
              <img :src="rootUrl + legalperson.pic_3" alt="">
              <p>手持身份证国徽面照</p>
            </div>
            <div class="pic_item">
              <img :src="rootUrl + legalperson.pic_4" alt="">
              <p>手持身份证人像面照</p>
            </div>
          </div>
        </div>
      </div>
      <div class="operation" v-if="overFeed === 0 && signState === '已受理' && step === 4">
        <div @click="operation($event, 1)">同意</div>
        <div @click="operation($event, 0)">拒绝</div>
      </div>
      <div class="operation c_operation" v-if="overFeed === 0 && signState !== '已受理'">
        <p>银行还未签署，签署后我们将通知您。</p>
        <div class="back_index">
          <div @click="back">回到首页</div>
        </div>
      </div>
      <div v-if="overFeed === 1" class="err_info">
        <p>企业或银行已经拒绝本次签约。</p>
        <div class="back_index">
          <div @click="back">回到首页</div>
        </div>
      </div>
      <div v-if="overFeed === 2" class="err_info">
        <p>已经完成或还未执行到本步骤</p>
        <div class="back_index">
          <div @click="back">回到首页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Location from '../../location/location'
// import appNav from '../../financing/financingManege'
import Getset from '../../financing/finace'
import Agreement from '../../agreement/agreement'
export default {
  name: 'application',
  components: {
    Getset, Agreement, 
    // appNav, 
    Location
  },
  data () {
    return {
      formData: {
        repayment_date: '',
        interest_rate: '',
        amount: ''
      },
      rootUrl: this.$root_url(),
      father: {selIndex: 3},
      location: [
        { title: '我的融资', url: '/financing' },
        { title: '三方协议' }
      ],
      legalperson: {},
      statusList: [1, 1, 1, 1, 1, 0, 0, 0],
      warningTab: 0,
      overFeed: -1,
      signState: '',
      setp: -1
    }
  },
  methods: {
    operation: function ($event, sw) {
      // 同意
      var that = this
      if (sw === 0) {
        this.$confirm('确定拒绝此次？', '拒绝', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
        }).then(res => {
          that.$ajax.post('/api/business_tripartite_agreement/', {financing_id: that.fid, institution_id: that.bid, token: that.$token(), isOk: false, financing_type: 'receivable'}).then(res => {
            if (res.data.code === 2) {
              that.$router.push({
                path: '/financing_usage',
                query: {
                  id: that.bid,
                  fid: that.fid
                }
              })
            } else {
              that.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        })
      } else {
        that.$ajax.post('/api/business_tripartite_agreement/', {financing_id: that.fid, institution_id: that.bid, token: that.$token(), isOK: true, financing_type: 'receivable'}).then(res => {
          // console.log(res)
          if (res.data.code === 1) {
            that.$router.push({
              path: '/getting_usage',
              query: {
                fid: that.fid,
                id: that.bid
              }
            })
          } else if (res.data.code === 0) {
            that.$message({
              message: res.data.msg,
              type: 'error'
            })
          } else {
            that.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
      }
    },
    back: function () {
      this.$router.push('/financing')
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
    that.$ajax.get('/api/get_loan_feedback/?token=' + that.$token() + '&financing_id=' + that.fid + '&institution_id=' + that.bid + '&financing_type=receivable').then(res => {
      that.step = Number(res.data.i_step)
      that.signState = res.data.status
      // console.log(res)
      if (res.data.status === '已被拒') {
        that.overFeed = 1
      } else {
        that.overFeed = 0
        that.$ajax.get('/api/business_tripartite_agreement/?token=' + that.$token() + '&financing_id=' + that.fid + '&financing_type=receivable' + '&institution_id=' + that.bid).then(res1 => {
          if (res1.data.code !== '0') {
            that.legalperson = res1.data
            that.formData.repayment_date = res1.data.repayment_date
            that.formData.amount = res1.data.amount
            that.formData.interest_rate = res1.data.interest_rate
          }
        })
      }
    })
  }
}
</script>

<style scoped lang="less">
  // @import url('./iconfont.css');
  .feedback {
    width: 100%;
    height: 100%;
    display: flex;
    //padding-top: 70px;
    .view_info {
      padding: 0 50px;
      background: #f5f7f8;
      // width: 100%;
      overflow-y: scroll;
      .c_loan_box{
        font-size: 14px;
        width: 100%;
        padding: 20px 50px;
        border: 1px solid #ccc;
        margin-top: 20px;
        background: #fff;
        .show_line {
          margin-top: 20px;
          height: 40px;
          // padding: 0 150px;
          width: 680px;
          // text-align: center;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          justify-content: center;
          border: 0;
          .lv {
            margin-left: 19px
          }
          .fh {
            margin-left: 5px
          }
          input, input.el-input__inner {
            width: 220px;
            height: 40px;
            padding: 0 20px;
            border: 1px solid #dcdfe6;
            border-radius: 3px;
          }
          input::placeholder {
            color: #dcdfe6;
          }
          input:disabled{
            background: #f5f7fa;
          }
        }
      }
      .legalperson {
        padding: 0 30px;
        margin: 20px 0;
        border: 1px solid #ccc;
        background: #fff;
        padding-bottom: 20px;
        font-size: 14px;;
        .l_title {
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          line-height: 40px;
          padding: 8px 20px;
        }
        .l_line {
          line-height: 36px;
          padding: 0 30px;
        }
        .pic_list {
          display: flex;
          align-items: center;
          padding: 20px 30px;
          div {
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #333;
            cursor: pointer;
            img {
              width: 160px;
              height: 160px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .operation {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          width: 90px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
          border: 1px solid #eb6100;
          border-radius: 5px;
          margin: 0 50px;
          cursor: pointer;
        }
        div:first-child {
          background: #eb6100;
          color: #fff;
        }
        div:nth-child(2) {
          background: #fff;
          color: #eb6100
        }
        p {
          color: #999;
          font-size: 14px;
          line-height: 60px;
        }
        &.c_operation{
          div{
            border: none;
            margin: 0;
          }
        }
      }
      .err_info {
        p {
          line-height: 60px;
          text-align: center;
          color: #999;
        }
        .back_index {
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            height: 30px;
            width: 120px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            border-radius: 4px;
            font-size: 14px;
            background: #eb6100;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
