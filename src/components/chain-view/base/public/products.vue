<template>
  <div class="chain-products">
    <el-dialog :visible.sync="dialogVisiblesOne" width="80%" :before-close="handleCloseOne">
      <div class="l_box_list2">
        <span class="_title">添加商品</span>
        <div class="block">
          <el-table
            ref="multipleTable"
            :data="product_list"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="name" label=" 商品名称" align="center">
              <template slot-scope="scope">
                <el-select size="small">
                  <el-option label="现金" value=""></el-option>
                  <el-option label="支票" value=""></el-option>
                  <el-option label="汇票 (银行承兑汇票)" value=""></el-option>
                  <el-option label="汇票 (商业承兑汇票)" value=""></el-option>   
                  <el-option label="汇票 (信用证)" value=""></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="model" label="型号" align="center"></el-table-column>
            <el-table-column prop="count" label="数量" align="center"></el-table-column>
            <el-table-column prop="amount" label="合计(元)" align="center"></el-table-column>
          </el-table>
          <div class="card_page" v-if="total">
            <el-pagination @current-change="handleCurrentChange"
              :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="install">
          <button @click="onConfirm">确认</button>
          <button @click="productManage">商品名称</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        dialogVisiblesOne: true,
        dialogVisiblesTwo: false,
        dialogVisiblesThree: false,
        product_list: [
          {name: '液压机', unit: '个', model: 'Th021245', count: '321', amount: '12332'}
        ],
        currPage: 1,
        total: '', 
        pageSize: 5,
      }
    },
    mounted () { 
 
    },
    methods: { 
      handleCurrentChange () {

      },
      onConfirm () {},
      productManage () {},
      handleCloseOne () {},
      handleCloseTwo () {},
      handleCloseThree () {}
    }
  }
</script>
<style lang='less' scope>
.l_box_list2 {
  ._title {
    font-weight: bold;
    font-size: 18px;
    padding-bottom: 20px;
    margin-right: 30px;
  }
  .card_page {
    margin: 30px 0;
    text-align: center;
  }
  .install {
    margin-top: 30px;
    text-align: center;
    button {
      margin: 0 30px;
      width: 100px;
      height: 32px;
      line-height: 32px;
      border: none;
      outline: none;
      background: #eb6100;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>