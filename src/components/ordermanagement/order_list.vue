<template>
  <div class="order_list">
    <div class="order_list_header">
      <h4>订单列表</h4>
    </div>
    <div class="order_list_item">
      <div class="order_block">
        <table class="list_table">
            <tr class="list_tr">
              <td class="list_td" v-for="(title,index) in tableTitle" :key="index">{{title}}</td>
            </tr>
          <tbody class="table_tbody" v-for="(item,index) in orderList" :key="index" :data="orderList.slice((page-1)*pagesize,page*pagesize)" v-if="orderList.length > 0">
            <tr class="list_tr">
              <td class="list_td">{{item.orderNo || '暂无数据'}}</td>
              <td class="list_td">{{item.description || '暂无数据'}}</td>
              <td class="list_td">{{item.createTime || '暂无数据'}}</td>
              <td class="list_td">{{item.payTime || '暂无数据'}}</td>
              <td class="list_td">{{ Number(item.payType) === 1 ? '充值' : Number(item.payType) === 2 ? '提现' : Number(item.payType) === 2 ? '提现' : ''}}</td>
              <td class="list_td">{{item.count || '暂无数据'}}</td>
              <td class="list_td">{{ Number(item.payStatus) === 1 ? '未支付' : Number(item.payStatus) === 2 ? '支付成功' : Number(item.payStatus) === 3 ? '支付失败' : ''}}</td>
              <td class="list_td"><a @click="handelDel(item)">详情</a> <a @click="handelnext(index)">删除</a></td>
            </tr>
          </tbody>
          <div class="content_none" v-if="orderList.length === 0">暂无数据</div>
        </table>
      </div>
    </div>
    <div class="order_page">
      <el-pagination background class="el_item" layout="prev, pager , next" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" :total="orderList.length"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "order_list",
  props: {},
  data() {
    return {
      pagesize:10, //每页显示的数据条数
      tableTitle: ["订单编号","产品","创建日期","支付时间","类型","金额","状态","操作"],
      token: '',
      page: 1,//初始页
      status: null,
      orderList: []
    }
  }, 
  mounted() {
    this.$ajax.get('/api/sp/order/list/?page=' + this.page + '&status=' + this.status).then(res => {
      // console.log(res)
      if(res.data.code === 200){
        this.orderList = res.data.data.orders
      }
    })
  },
  methods: {
    handelDel (item) {
      // console.log(item)
      this.$router.push({
        path:"orderDetails",
        query: {
          id:item.orderNo
        }
      })
    },
    handleCurrentChange (page) {
      this.page = page;
      console.log(this.page)  //点击第几页
    },
    handelnext (index) {
      this.detaiList.splice(index,1)
    }
  }
}
</script>
<style lang='less' scoped>
.order_list {
  width: 98%;
  margin: 0 auto;
  margin-top: 5%;
  background: #fff;
  padding-bottom: 10px;
  .order_list_header {
    width: 100%;
    border-bottom: solid 1px #DDDDDD;
    height: 50px;
    h4 {
      margin-left: 17px;
      font-size: 16px;
      line-height: 50px;
      display: inline;
      color:#333333;
    }
  }
  .order_list_item {
    width: 100%;
    padding: 10px 0;
    padding: 1%;
    .order_block {
      width: 100%;
      .list_table {
        width: 100%;
        .list_tr {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom:solid 1px #DDDDDD;
          height: 54px;
          background: #FAFAFA;
          .list_td {
            width: 25%;
            text-align: center;
            color: #333333;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .table_tbody {
          width: 100%;
          // display: flex;
          // align-items: center;
          // justify-content: space-between;
          height: 54px;
          .list_tr {
            background: #fff;
            border-bottom:solid 1px #e8e8e8;
            .list_td {
              width: 25%;
              text-align: center;
              color: #666666;
              font-size: 14px;
              font-weight: normal;
              &:last-child{
                color:#EB6100;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .order_page{
    width:30%;
    margin:12px auto;
    .el_item{
      text-align:center;
      ul{
        li{
          background: #EB6100!important;
        }
      }
    }
  }
}
a{
  text-decoration:none;
  color:#EB6100;
}
.content_none{
  width: 100%;
  color: #666666;
  text-align: center;
  padding-top: 25px;
}
</style>  