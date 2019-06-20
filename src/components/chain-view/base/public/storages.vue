<template>
  <div class="">
    <el-dialog title="请选择现有库存，若库存不足可新登" :visible.sync="dialogVisibles" width="80%" :before-close="handleClose">
      <div class="l_box_list2">
        <span class="_title">库存商品</span>
        <el-cascader
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions2"
          placeholder="请选择项目"
          size="small"
          @change="handleChange"
          @active-item-change="activeChange">
        </el-cascader>
        <div class="block">
          <el-table
            ref="multipleTable"
            :data="personDataList"
            tooltip-effect="dark"
            style="width: 100%"
            @select="handleSelect"
            @select-all="handleSelectAll">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="product_info.product_name" label=" 商品名称" align="center"></el-table-column>
            <el-table-column prop="product_info.product_unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="product_info.product_num" label="数量" align="center"></el-table-column>
            <el-table-column prop="product_info.product_price" label="合计价格(元)" align="center"></el-table-column>
            <el-table-column prop="product_info.total" label="库存余量(%)" align="center"></el-table-column>
            <el-table-column prop="product_info.balance" label="库存消耗(%)" align="center">
              <template v-if="scope.row.product_info.disable" slot-scope="scope">
                <input class="custom-input" type="text" v-model="scope.row.product_info.balance">
              </template>
            </el-table-column>
          </el-table>
          <div class="card_page" v-if="total">
            <el-pagination @current-change="handleCurrentChange"
              :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="install">
          <button @click="onConfirm">确认</button>
          <button @click="addStorages">新登库存</button>
        </div>
      </div>
    </el-dialog>
    <div class="storage-dialog__wraper" v-if="innerVisible">
      <div class="storage-dialog">
        <div class="storage-dialog__header">
          <div @click="closeStorage" class="storage-closer"><span>X</span></div>
        </div>
        <div class="storage-dialog__body">
          <div class="storage-tips">
            <h3>新登库存分如下两种方式：</h3>
            <p>Ⅰ：通过创建订单来登记新的库存商品信息。   <span>*注：需先选择已有采购项目</span></p>
            <p>Ⅱ：通过创建采购项目(在该采购项目下创建订单)来登记新的库存商品信息。</p>
          </div>
          <label for="">选择已有项目</label>
          <el-select size="small" v-model="contract">
            <el-option label="现金" value=""></el-option>
            <el-option label="支票" value=""></el-option>
            <el-option label="汇票 (银行承兑汇票)" value=""></el-option>
            <el-option label="汇票 (商业承兑汇票)" value=""></el-option>   
            <el-option label="汇票 (信用证)" value=""></el-option>
          </el-select>
        </div>
        <div class="storage-dialog__footer">
          <div class="storage-btn__wrap">
            <div class="storage-btn">创建订单</div>
            <div class="storage-btn">创建项目</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: ['rowSelectArr'],
    data () {
      return {
        selectedOptions2: [],
        dialogVisibles: true,
        innerVisible: false,
        products: {
          id: '',
          product_info: {
            name: '',
            unit: '',
            num: '',
            count: ''
          }
        },
        personDataList: [
          {id: '1', product_info: {disable: false, product_name: '面粉', product_unit: '袋', product_num: '200', product_price: '1,600.00', total: '100', balance: '100'}},
          {id: '2', product_info: {disable: false, product_name: '小米', product_unit: '袋', product_num: '150', product_price: '1,300.00', total: '100', balance: '100'}},
          {id: '3', product_info: {disable: false, product_name: '大米', product_unit: '袋', product_num: '250', product_price: '1,450.00', total: '100', balance: '100'}},
          {id: '4', product_info: {disable: false, product_name: '玉米面', product_unit: '袋', product_num: '300', product_price: '1,800.00', total: '100', balance: '100'}},
        ],
        personDataListResult: [],
        personIds: [],
        currPage: 1,
        total: '',
        pageSize: 5,
        companyList: [],
        timer: '',
        contract: {},
        options: [{
          value: 'A1',
          label: '采购项目I',
          children: [{
            value: 'A1-b1',
            label: '采购订单I1'
          },
          {
            value: 'A1-b2',
            label: '采购订单I2'
          }]
        },{
          value: 'A2',
          label: '采购项目II',
          children: [{
            value: 'A2-b1',
            label: '采购订单II1'
          },
          {
            value: 'A2-b2',
            label: '采购订单II2'
          },{
            value: 'A2-b3',
            label: '采购订单II3'
          },
          {
            value: 'A2-b4',
            label: '采购订单II4'
          },
          {
            value: 'A2-b5',
            label: '采购订单II5'
          },
          {
            value: 'A2-b6',
            label: '采购订单II6'
          }]
        },{
          value: 'A3',
          label: '采购项目III',
          children: [{
            value: 'A3-b1',
            label: '采购订单III1'
          },
          {
            value: 'A3-b2',
            label: '采购订单III2'
          }]
        }]
      }
    },
    mounted () {
      
    },
    methods: {
      closeStorage () {
        this.innerVisible = false
        this.handleClose()
      },
      addStorages () {
        this.innerVisible = true
        this.dialogVisibles = false
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleChange (value) {
        console.log(value)
      },
      activeChange (item) {
        console.log(item[0])
      },
      handleSelect (selection, row) {
        row.product_info.disable = !row.product_info.disable
      },
      handleSelectAll (list) {
        list.forEach(el => {
          el.product_info.disable = true
        })
      },
      getCompanyList (e, name, ns_type) {
        let keyword = name.trim()
        if (!keyword) return
        this.companyList = []
        this.timer = e.timeStamp
        setTimeout(() => { 
          if (this.timer - e.timeStamp === 0) {
            this.$ajax.get(`/api/chain/company/search/?name=${keyword}&ns_type=${ns_type}`).then(res => {
              if (res.status === 200) {
                if (res.data.length > 0) {
                  var list = res.data
                  this.companyList = list
                }
              }
            })
          }
        }, 500) 
      },
      handleClose () {
        this.dialogVisibles = false
        this.$emit('hideStorage', this.dialogVisibles)
      },
      handleCurrentChange (val) {
        this.currPage = val
        this.$ajax.get(`/api/chain/agent/?page=${this.currPage}&page_size=${this.pageSize}`).then(res => {
          if (res.status === 200) {
            this.total = res.data.count
            this.personDataList = res.data.results
          }
        })
      },
      onConfirm () {
        this.handleClose()
        this.personDataListResult = this.personDataList.filter(el => el.product_info.disable)
        this.$emit('onConfirmStorage', this.personDataListResult)
      }
    }
  }
</script>
<style lang='less' scope>
.custom-input {
  border:1px solid #e1e6f0;
  box-shadow:0 0 7px 0 #e1e6f0;
  border-radius:2px;
  color: #666;
  width: 120px;
  padding: 4px 10px;
  font-size: 14px;
}
.el-dialog__title {
  font-weight: bolder;
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
#addAgent {
  .el-dialog {
    min-width: 980px;
  }
}
.block {
  margin-top: 20px;
}
.tips {
  position: absolute;
  display: flex;
  right: -40px;
  width: 117px;
  top: 0px;
  &>small{
    color: #0fbaf8
  }
}
.storage-dialog__wraper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  overflow: auto;
  z-index: 2000;
  background-color: rgba(0, 0, 0, .3);
  .storage-dialog {
    margin: 0 auto;
    width: 900px;
    margin-top: 15vh;
    padding: 20px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    position: relative;
    .storage-dialog__header {
      .storage-closer {
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
      }
    }
    .storage-dialog__body {
      .storage-tips {
        h3 {
          color: #666;
          margin-bottom: 10px;
        }
        p {
          color: #666;
          font-size: 14px;
          margin: 5px 0;
          span {
            color: #eb6100
          }
        }
        margin-bottom: 20px
      }
      label {
        color: #666
      }
    }
    .storage-dialog__footer {
      .storage-btn__wrap {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        .storage-btn {
          padding: 4px 15px;
          margin: 0 25px;
          border-radius: 4px;
          font-size: 14px;
          border: 1px solid #eb6100;
          background: #eb6100;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
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