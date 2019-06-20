<template>
  <div class="cash_header">
    <div class="big_warpper">
      <div class="cash_title">
        <h2>起始时间:</h2>
        <el-date-picker v-model="obj.begin" type="date" format="yyyy-MM-dd" placeholder="开始时间" value-format="yyyy-MM-dd" class="begin_date" size="small"></el-date-picker>
        <h2>至</h2>
        <el-date-picker v-model="obj.end" type="date" format="yyyy-MM-dd" placeholder="结束时间" value-format="yyyy-MM-dd" class="begin_date" size="small"></el-date-picker>
        <h2>类型:</h2>
        <el-select v-model="idx"  @change="handeltype" placeholder="请选择" size="small" class="select_date">
          <el-option v-for="(item,index) in options" :key="index" :value="item" class="selOption">{{item}}</el-option>
        </el-select>
        <h2>流水号:</h2>
        <el-input v-model="obj.flowNo" placeholder="请输入内容" list="Withdrawal_tr" class="begin_date" size="small"></el-input>
        <div class="Search_btn" @click="Search">查询</div>
        <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>未查询到相关信息，请您仔细核对信息后再次查询</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog> -->
      </div>
      <div class="Withdrawal_record">
        <div class="Withdrawal_title">
          <h2>收支明细</h2>
        </div>
        <div class="Withdrawal_item">
          <table class="Withdrawal_table" ref="newValue"  :data='detaiList.slice((page-1)*pagesize,page*pagesize)'  v-if="detaiList.length > 0">
            <tr class="Withdrawal_tr">
              <td class="Withdrawal_td" v-for="(item,index) in tableTitle" :key="index">{{item}}</td>
            </tr>
            <tr class="Withdrawal_tr" v-for="(item,index) in detaiList" :key="index" id="Withdrawal_tr">
              <td class="Withdrawal_td">{{item.flowNo || '暂无数据'}}</td>
              <td class="Withdrawal_td">{{item.amount || '暂无数据'}}</td>
              <td class="Withdrawal_td">{{item.amount || '暂无数据'}}</td>
              <td class="Withdrawal_td">{{item.createTime || '暂无数据'}}</td>
              <td class="Withdrawal_td">{{item.amount || '暂无数据'}}</td>
              <td class="Withdrawal_td">{{Number(item.type) === 1 ? '充值' : Number(item.type) === 2 ? '消费' : Number(item.type) === 3 ? '提现' : '暂无数据'}}</td>
              <td class="Withdrawal_td">{{item.description || '暂无数据'}}</td>
              <td class="Withdrawal_td">{{item.payeeAccount || '暂无数据'}}</td>
              <td class="Withdrawal_td">{{Number(item.status) === 1 ? '申请中' : Number(item.status) === 2 ? '通过审核' : Number(item.status) === 3 ? '审核失败' :  Number(item.status) === 4 ? '打款中' :  Number(item.status) === 5 ? '打款成功' : Number(item.status) === 6 ? '打款失败' : '暂无数据'}}</td>
              <td class="Withdrawal_td"><a @click="handelnext(index)">详情</a> <a @click="handelete(item)">删除</a></td>
            </tr>
          </table>
          <div class="content_none" v-if="detaiList.length === 0">暂无数据</div>
          <div class="page_block">
            <el-pagination background class="el_item" layout=" prev, pager , next"  :total="detaiList.length"  @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize"></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"cash_header",
  props: {},
  data() {
    return {
      pagesize:10,
      begin_date:'',
      end_date:'',
      running_time:'',
      options: ['全部','充值','提现','消费'],
      value: '',
      dialogVisible:false,
      tableTitle:["流水编号","收入","支出","起始时间","余额","类型","备注","账号","状态","操作"],
      token: '',
      page: 0,
      detaiList: [],
      idx: '',
      obj: {
        type: '',
        begin: '',
        end: '',
        flowNo: ''
      }
    }
  },
  mounted() {
   this.$ajax('/api/sp/wallet/transaction/record/?page=' + this.page).then(res =>{
     if (res.data.code === 200) {
       this.detaiList = res.data.data.details
     }
     console.log(this.detaiList)
   }) 
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
        })
        .catch(_ => {});
      },
    handelnext (index) {
      this.$router.push({
        name:'orderlist'
      })
    },
    handleCurrentChange (page) {
      this.page = page;
      // console.log(this.page)  //点击第几页
    },
    handeltype (item) {
      if (item === '全部') {
        item = ''
      } else if (item === '充值') {
        item = '1'
      } else if (item === '消费') {
        item = '2'
      } else {
        item = '3'
      }
      this.obj.type = item
    },
    handelete (item) {
      this.detaiList.splice(item,1)
    },
    Search (e) {
      if (this.obj.begin || this.obj.type || this.obj.end || this.obj.flowNo) {
        var URL = '/api/sp/wallet/transaction/record' + '?'
        for (let i in this.obj) {
          if (this.obj[i]) {
            URL += i + '=' + this.obj[i] + '&'
          }
        }
        // URL = URL.substring(0, URL.length - 1)
        // console.log(URL)
        this.$ajax.get(URL + "page=" + this.page).then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.detaiList = res.data.data.details
        }
      })
        // console.log(URL)
      } else if (this.type != 0) {
        this.$ajax('/api/sp/wallet/transaction/record/?page=' + this.page).then(res => {
          if (res.data.code === 200) {
            this.detaiList = res.data.data.details
          }
        })
      } else {
       return this.$message.error("至少输入一个信息")
      }
    }
  },
};
</script>
<style lang='less' scoped>
.cash_header {
  width: 100%;
  margin-bottom: 20px;
  margin-top: 5%;
  .cash_title {
    width: 100%;
    display: flex;
    align-items: center;
    height: 53px;
    background: #fff;
    margin-bottom: 20px;
    h2 {
      display: inline;
      font-size: 14px;
      margin: 0 10px;
      color: #666666;
      &:first-child {
        margin-left: 34px;
      }
    }
    .begin_date {
      width: 224px;
      display: flex;
      align-items: center;
    }
    .Search_btn {
      // background: #EB6100;
      // color:#fff;
      margin-left: 10px;
      // outline: none;
      // border:none;
      // border-radius: 5px;
      // padding:9px 16px;
      // font-size: 14px;
      .ns-button(o, small);
    }
  }
  .Withdrawal_record {
    width: 100%;
    .Withdrawal_title {
      width: 100%;
      border-bottom: solid 1px #e5e5e5;
      height: 53px;
      background: #fff;
      // padding: 0 20px;
      h2 {
        display: inline;
        line-height: 53px;
        margin-left: 25px;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }
      .begin_date {
        height: 32px !important;
      }
    }
    .Withdrawal_item {
      width: 100%;
      padding-bottom: 20px;
      background: #fff;
      .Withdrawal_table {
        width: 97%;
        margin: 0 auto;
        padding-top: 20px;
        padding-bottom: 1.5%;
        .Withdrawal_tr {
          width: 100%;
          height: 53px;
          border-bottom: solid 1px #dddddd;
          display: flex;
          align-items: center;
          justify-content: space-between;
          &:first-child {
            background: #fafafa;
            display: flex;
            flex-direction: row;
            td {
              color: #333;
              font-weight: 600;
              font-size: 14px;
              &:last-child {
                color: #333333;
              }
            }
          }
          .Withdrawal_td {
            width: 10%;
            color: #666666;
            line-height: 53px;
            text-align: center;
            font-size: 14px;
            &:last-child {
              color: #eb6100;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
a {
  text-decoration: none;
  color: #eb6100;
}
.selOption {
  color: #666666;
  font-weight: normal;
}
.select_date {
  width: 164px;
  height: 32px;
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