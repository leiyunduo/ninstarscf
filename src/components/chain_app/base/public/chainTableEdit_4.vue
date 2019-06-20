<template>
  <div class="chain_section_wrap">
    <table class="chain_table" cellpadding='0' cellspacing='0'>
      <!-- table 标题 -->
      <tr class="chain_table_title">
        <td v-for="(item, index) in tableTitle" :key='index'>
          <div>{{item.name}}</div>
        </td>
      </tr>
      <!-- table 数据 -->
      <tr v-for="(item, index) in tableLine" :key='index' class="chain_table_line">
        <td>
          <div v-if="item.isEdit">
            <input type="text" v-model="item.product_name">
          </div>
          <div v-if="!item.isEdit">{{item.product_name}}</div>
        </td>
        <td>
          <div v-if="item.isEdit">
            <input type="text" v-model="item.product_unit">
          </div>
          <div v-if="!item.isEdit">{{item.product_unit}}</div>
        </td>
        <td>
          <div v-if="item.isEdit">
            <input type="text" v-model="item.product_num">
          </div>
          <div v-if="!item.isEdit">{{item.product_num}}</div>
        </td>
        <td>
          <div v-if="item.isEdit">
            <input type="text" v-model="item.product_price">
          </div>
          <div v-if="!item.isEdit" class="table-align_right">{{item.product_price}}</div>
        </td>
        <td>
          <span @click="handleEdit(index, item.isEdit)">{{!item.isEdit ? '修改' : '保存'}}</span>
          <span @click="handleDelete(index)">删除</span>
        </td>
      </tr>
    </table>
    <!-- 添加输入行 -->
    <div class="input_line" v-if="EOS">
      <div>
        <input type="text" v-model="product.product_name" maxlength="32">
      </div>
      <div>
        <input type="text" v-model="product.product_unit" maxlength="8">
      </div>
      <div>
        <input type="text" v-model="product.product_num" maxlength="16">
      </div>
      <div>
        <input type="text" v-model="product.product_price" maxlength="16">
      </div>
      <div>
        <span @click="handleSave">保存</span>
      </div>
    </div>
    <!-- 添加/取消 按钮 -->
    <div class="add_profuct" @click="hanldeAdd">
      <div v-if="!EOS">
        <span>+</span>
        <span>添加商品</span>
      </div>
      <div v-if="EOS">
        <span class="cancel_btn">取消</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chainTableEditFour',
  data () {
    return {
      sw: 'show',
      tableTitle: [
        {key: 'product_name', name: '商品名称'},
        {key: 'product_unit', name: '单位'},
        {key: 'product_num', name: '数量'},
        {key: 'product_price', name: '合计价格'},
        {name: '操作'}
      ],
      tableLine: [],
      EOS: false,
      // 添加数据state
      product: {
        product_name: '',
        product_unit: '',
        product_num: '',
        product_price: ''
      },
      productErrMsg: {
        product_name: '请输入商品名称',
        product_unit: '请输入单位',
        product_num: '请输入数量',
        product_price: '请输入金额'
      } 
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    dataCheck (obj) {
      const numReg = /^0\.\d+$|^[1-9]\d*(\.\d+)?$/
      let flag = true
      for(var item in obj) {
        if(!String(obj[item]).trim() && item !== 'product_price' && item !== 'product_num') {
          this.$message.error(this.productErrMsg[item])
          return !flag
        } else if (item === `product_num` && !numReg.test(obj.product_num)) {
          this.$message.error('请输入正确数量')
          return !flag
        } else if (item === `product_price` && !numReg.test(obj.product_price)) {
          this.$message.error('请输入正确金额')
          return !flag
        } 
      }
      return flag
    },
    // 添加/取消 添加按钮
    hanldeAdd () {
      const that = this
      this.EOS = !this.EOS
      that.product.product_name = ''
      that.product.product_num = ''
      that.product.product_unit = ''
      that.product.product_price = ''
    },
    // 保存表格数据
    handleSave () {
      const that = this
      let flag  = that.dataCheck(that.product)
      if (!flag) return
      let tableLine = that.tableLine
      tableLine.push({
        product_name: that.product.product_name,
        product_unit: that.product.product_unit,
        product_num: that.product.product_num,
        product_price: that.product.product_price,
        isEdit: false
      })
      that.tableLine = tableLine
      this.$emit('calc_val', that.tableLine)
      that.EOS = false
      that.product.product_name = ''
      that.product.product_num = ''
      that.product.product_unit = ''
      that.product.product_price = ''
    },
    // 单行编辑
    handleEdit (index, sw) {
      const that = this
      if (!sw) {
        that.tableLine[index].isEdit = true
      } else {
        let flag  = that.dataCheck(that.tableLine[index])
        if (!flag) return
        let tableLine = that.tableLine
        tableLine[index].isEdit ? tableLine[index].isEdit = false : tableLine[index].isEdit = true
        that.tableLine = tableLine
        this.$emit('calc_val', that.tableLine)
      }
    },
    // 删除表格数据
    handleDelete (index) {
      this.tableLine.splice(index, 1)
      this.$emit('calc_val', this.tableLine)
    }
  },
  watch: {
    tableData: function (ne, ol) {
      this.tableLine = ne
    }
  },
  mounted () {
    this.tableLine = this.tableData
  }
}
</script>
<style lang="less" scoped>
.table-align_right {
  text-align: right;
  padding-right: 43% 
}
.table-align_left {
  text-align: left;
  padding-left: 43%
}
* {
  margin: 0;
}
.chain_section {
  background: #fff;
}
.chain_section_wrap {
  background: #fff;
  width: 100%;
  margin: 0 auto;
}
.chain_table {
  border: none;
  width: 100%;
  .chain_table_title {
    opacity:0.49;
    background:#efefef;
    border-radius:4px 4px 0 0;
    width:100%;
    height:45px;
    width: 100%;
    td {
      width: 20%;
      text-align: center;
      font-size: 14px;
      color: #666;
      line-height: 45px;
      div {
        margin-top: 13.5px;
        height: 18px;
        line-height: 18px;
        border-right: 1px dashed #666;
      }
    }
    td:last-child div {
      border-right: none;
    }
  }
  .chain_table_line {
    height: 45px;
    left: 45px;
    text-align: center;
    color: #333;
    td {
      border-bottom: 1px solid #efefef;
      line-height: 45px;
      font-size: 14px; 
      span {
        color: #eb6100;
        text-decoration: underline;
        margin: 0 12px;
        cursor: pointer;
      }
      input {
        border:1px solid #e1e6f0;
        border-radius:2px;
        color: #666;
        width: 63%;
        padding: 4px 10px;
        outline: none
      }
      input:focus {
        transition: border-color .1s cubic-bezier(.645,.045,.355,1);
        border-color: #409eff
      }
    }
  }
}
.add_profuct {
  line-height: 45px;
  background:#f0f2f7;
  width:100%;
  text-align: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  span:first-child {
    font-size: 20px;
    font-weight: bolder;
  }
  span.cancel_btn {
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
}
.input_line {
  width: 100%;
  height: 45px;
  display: flex;
  div {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      border:1px solid #e1e6f0;
      border-radius:2px;
      width: 63%;
      color: #666;
      padding: 4px 10px;
      outline: none
    }
    input:focus {
      transition: border-color .1s cubic-bezier(.645,.045,.355,1);
      border-color: #409eff
    }
    span {
      color:#eb6100;
      text-decoration: underline;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
