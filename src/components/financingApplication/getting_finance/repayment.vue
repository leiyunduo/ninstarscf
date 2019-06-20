<template>
  <div class="c_container">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="usercenter">
      <location :location="location"></location>
      <div class="status_pic" v-if="haha === 0">
        <getset :statusList="statusList" type="1" :fid='fid' fType='receivable'></getset>
        <div class="repayment">
          <div class="repayment_table">
            <div class="table_title">
              <div v-for="(item, index) in listTitle" :key="index">{{item}}</div>
            </div>
            <div class="table_item" v-for="(item, index) in list" :key="index">
              <div>{{item.repayment_date}}</div>
              <div>{{item.interest_rate}}</div>
              <div>{{item.business}}</div>
              <div>{{item.institution}}</div>
              <div>{{item.amount}}</div>
            </div>
          </div>
          <div v-if="end">
            <p class="fianacing_end">
              本次融资已结束！
            </p>
          </div>
          <div class="sub">
            <div v-if="!end && (showOverdue === '未申请' || showOverdue === '已同意' || showOverdue === '已拒绝') && !business_end" @click="dialogVisible = true">延期申请</div>
            <p v-if="!end && showOverdue === '申请中'" style="color: #999">您已提交延期申请，等待金融机构回复。</p>
            <div @click="orderRepay" v-if="!end && !business_end">确认</div>
          </div>
          <p v-if="!end && showOverdue === '已同意'" style="color: #eb6100; text-align: center;">您的上一次展期申请已经通过</p>
        </div>
      </div>
      <div class="haha" v-if="haha === 1">
      </div>
    </div>
    <el-dialog
      title="延期申请"
      :visible.sync="dialogVisible"
      width="30%">
      <P class="overude_title">金融机构同意后您的本次贷款将做延期还款处理。</P>
      <P class="overude_title">请填写展期后的还款日期。</P>
      <div class="show_wrap">
        <el-date-picker
          v-model="overdue_date"
          type="date"
          placeholder="选择日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="overdue">确 定</el-button>
      </span>
    </el-dialog>
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
        { title: '还款' }
      ],
      overdue_date: '',
      statusList: [1, 1, 1, 1, 1, 1, 1, 1],
      haha: 0,
      business_end: false,
      end: false,
      showOverdue: '',
      list: [],
      dialogVisible: false,
      // listTitle: ['还款日', '实际还款日', '还款方', '确认方', '币种', '还款金额']
      listTitle: ['还款日', '还款利率', '还款方', '确认方', '还款金额']
    }
  },
  methods: {
    // 确认
    orderRepay () {
      this.$ajax.post('/api/business_repayment/', {token: this.$token(), financing_id: this.fid, financing_type: 'receivable'}).then(res => {
        // console.log(res)
        if (res.data.code === '1') {
          this.$router.push('/financing')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    overdue: function () {
      var that = this
      // // console.log(this.overdue)
      that.$ajax.post('/api/business_extended_application/', {extended_to_date: this.overdue_date, token: this.$token(), financing_id: this.fid, financing_type: 'receivable'}).then(res => {
        if (res.data.code === '1') {
          this.$message.success('提交成功')
          this.showOverdue = '申请中'
          that.dialogVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
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
    // console.log(that.fid)
    that.$ajax.post('/api/get_loan_feedback/', {token: that.$token(), financing_id: that.fid, financing_type: 'receivable'}).then(res => {
      // console.log(res)
      if (res.data.step === '6') {
        that.end = res.data.finished
        that.business_end = res.data.loan.business_repayment
        that.showOverdue = res.data.extended_application_status
        that.list = [
          {repayment_date: res.data.loan.repayment_date, interest_rate: res.data.loan.interest_rate, business: res.data.business_name, institution: res.data.institution_name, amount: res.data.loan.amount}
        ]
        // console.log(that)
      }
    })
  }
}
</script>

<style scoped lang="less">
  // @import url('./iconfont.css');
  .c_container{
    width: 100%;
    min-height: 100%;
    display: flex;
    //padding-top: 70px;
  }
  .usercenter {
    padding: 0 50px;
    background: #f5f7f8;
    // width: 100%;
    .status_pic {
      // width: 1280px;
      margin: 0 auto;
    }
    .repayment {
      background: #fff;
      box-shadow: 0px 0px 5px #ccc;
      padding: 40px 50px;
      margin: 30px 50px;
      // width: 900px;
      .repayment_table {
        // width: 60%;
        border: 1px solid #e4e9e7;
        background: #fff;
        margin: 0 auto;
        .table_title {
          display: flex;
          background: #f4f4f4;
          div {
            border-left: 1px solid #eee;
            width: 20%;
            text-align: center;
            height: 45px;
            font-size: 14px;
            line-height: 50px;
            &:nth-of-type(1){
              border-left: none;
            }
          }
        }
        .table_item {
          display: flex;
          // border-bottom: 1px solid #e4e9e7;
          div {
            width: 20%;
            border-left: 1px solid #eee;
            text-align: center;
            height: 45px;
            font-size: 14px;
            line-height: 45px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:nth-of-type(1){
              border-left: none;
            }
          }
        }
      }
      .sub {
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          width: 90px;
          height: 30px;
          background: #eb6100;
          border-radius: 5px;
          text-align: center;
          line-height: 30px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          margin: 0 20px;
        }
      }
    }
    .fianacing_end {
      line-height: 60px;
      color: #eb6100;
      text-align: center;
    }
  }
  .overude_title {
    line-height: 36px;
  }
  .show_wrap {
    padding: 40px 0;
    text-align: center;
  }
</style>
