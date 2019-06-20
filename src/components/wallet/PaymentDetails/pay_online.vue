<template>
  <div class="pay_online_header">
    <div class="online_title">
      <h2>起始时间:</h2>
      <el-date-picker v-model="begin_date" type="date" size="small"  class="begin_date" placeholder="开始时间"></el-date-picker>
      <h2>至</h2>
      <el-date-picker v-model="end_date" type="date"  placeholder="结束时间" class="begin_date" size="small"></el-date-picker>
      <h2>类型:</h2>
      <el-select v-model="value" placeholder="请选择" class="select_date" size="small">
        <el-option v-for="(item,index) in options" :key="index" :value="item">{{item}}</el-option>
      </el-select>
      <h2>流水号:</h2>
      <el-input v-model="running_time" placeholder="请输入内容" class="begin_date" size="small"></el-input>
      <div class="Search_btn"  @click="dialogVisible = true">查询</div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>未查询到相关信息，请您仔细核对信息后再次查询</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
    <div class="Withdrawal_record">
      <div class="Withdrawal_title">
        <h2>提现记录</h2>
      </div>
      <div class="Withdrawal_item">
        <table class="Withdrawal_table" v-for="(item,index) in detaiList" :key="index" v-if="detaiList.length > 0">
          <tr class="Withdrawal_tr">
            <td class="Withdrawal_td" v-for="(item,index) in tableTitle" :key="index">{{item}}</td>
            <td class="Withdrawal_td"><router-link to="/orderManagement/orderlist">详情</router-link></td>
          </tr>
          <tr class="Withdrawal_tr" v-for="(item,index) in falseData" :key="index">
            <td class="Withdrawal_td">{{item.code}}</td>
            <td class="Withdrawal_td">{{item.count}}</td>
            <td class="Withdrawal_td">{{item.spending}}</td>
            <td class="Withdrawal_td">{{item.date}}</td>
            <td class="Withdrawal_td">{{item.balance_of}}</td>
            <td class="Withdrawal_td">{{item.type}}</td>
            <td class="Withdrawal_td">{{item.note}}</td>
            <td class="Withdrawal_td">{{item.account}}</td>
            <td class="Withdrawal_td">{{item.state}}</td>
            <td class="Withdrawal_td" @click="handelnext(index)" v-for="(item,index) in falseData" :key="index">{{item.details}}</td>
          </tr>
        </table>
        <div class="content_none" v-if="detaiList.length === 0">暂无数据</div>
        <div class="page_block">
          <el-pagination background class="el_item" layout="prev, pager, next" :total="100"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"pay_online_header",
  props: {},
  data() {
    return {
      begin_date:'',
      end_date:'',
      running_time:'',
      options: ['全部','充值','提现','消费'],
      value: '',
      selIndex:0,
      dialogVisible:false,
      tableTitle:["流水编号","收入","支出","日期","余额","类型","备注","账号","状态","操作"],
      tableData:["平台产生的流水号","100","100","2019-5-8","100","充值","备注","网银","备注","详情"],
      token: '',
      page: 1,
      detaiList: []
    };
  },
  created() {},
  mounted() {
    const that = this
    that.token = localStorage.ns_token
    that.$ajax.get('/api/sp/wallet/transaction/record/?token' + that.token + '&page=' + that.page).then(res => {
      // console.log(res.data.data)
      if(res.data.code === 200){
        that.detaiList = res.data.data.details
      }
    })
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
        })
        .catch(_ => {});
      },
      handelnext(index){
        var that =  this
        this.$router.push({
          name:"orderDetails"
        })
    }
  },
  components: {}
};
</script>
<style lang='less' scoped>
.pay_online_header {
  width: 100%;
  margin-bottom: 20px;
  .online_title {
    width: 100%;
    display: flex;
    align-items: center;
    height: 53px;
    background: #fff;
    margin-bottom: 20px;
    h2{
      display: inline;
      font-size: 14px;
      margin:0 10px;
      color: #666666;
      &:first-child{
        margin-left: 34px;
      }
    }
    .begin_date{
      width:224px;
      display: flex;
      align-items: center;
    }
    .Search_btn{
      // background: #EB6100;
      // color:#fff;
      margin-left: 10px;
      outline: none;
      border:none;
      // border-radius: 5px;
      // padding:9px 16px;
      // font-size: 14px;
      .ns-button(o,small)
    }
  }
  .Withdrawal_record{
    width:100%;
    .Withdrawal_title{
      width:100%;
      border-bottom:solid 1px #DDDDDD;
      height: 53px;
      background: #fff;
      // padding: 0 20px;
      h2{
        display: inline;
        line-height: 53px;
        margin-left: 25px;
        font-size: 16px;
        color: #333333;
        font-weight: 400;
      }
    }
    .Withdrawal_item{
      width:100%;
      background: #fff;
      padding-bottom: 20px;
      .Withdrawal_table{
        width:97%;
        margin:0 auto;
        font-size:14px;
        padding-top: 20px;
        padding-bottom: 1.5%;
        .Withdrawal_tr{
          width:100%;
          height: 53px;
          border-bottom:solid 1px #DDDDDD;
          display: flex;
          align-items: center;
          justify-content: space-between;
          &:first-child{
            background:#FAFAFA;
            display: flex;
            flex-direction: row;
            td{
              color: #333333;
              font-weight: 600;
              font-size: 14px;
               &:last-child{
                color: #333333;
              }
            }
          }
          .Withdrawal_td{
            width:10%;
            line-height: 53px;
            text-align:center;
            color:#666666;
            &:last-child{
              color:#EB6100;
            }
          }
        }
      }
    }
  }
}
.select_date{
  width:164px;
  height:32px;
}
.content_none{
  width:100%;
  color:#666666;
  text-align: center;
  padding:15px 0
}
.page_block {
  width: 30%;
  margin: 0 auto;
  background: #fff;
  .el_item{
    text-align:center;
  }
}
</style>