<template>
  <div class="chain_section_wrap">
    <div class="storage-table__view">
      <div class="storage-content">
        <ul class="storage-menu">
          <li class="storage-menu__item">
            <label for="">相关项目：</label><span>九星企业C皮鞋采购1</span>
          </li>
          <li class="storage-menu__item">
            <label for="">相关订单：</label><span>采购订单1</span>
          </li>
          <li class="storage-menu__item">
            <label for="">合计消耗(元)：</label><span>100,000.00</span>
          </li>
          <li class="storage-menu__item text_right">
            <span>修改</span>
            <span>删除</span>
          </li>
        </ul>
      </div>
      <table class="chain_table" cellpadding='0' cellspacing='0'>
        <tr class="chain_table_title">
          <td v-for="(item, index) in tableTitle" :key='index'>
            <div>{{item.name}}</div>
          </td>
        </tr>
        <tr v-for="(item, index) in tableLine" :key='index' class="chain_table_line">
          <td>
            <div>{{item.product_info.product_name}}</div>
          </td>
          <td>
            <div>{{item.product_info.product_unit}}</div>
          </td>
          <td>
            <div v-if="item.isEdit">
              <input type="text" v-model="item.product_info.product_num">
            </div>
            <div v-if="!item.isEdit">{{item.product_info.product_num}}</div>
          </td>
          <td>
            <div class="text-align_right">{{item.product_info.product_price}}</div>
          </td>
          <td>
            <div>{{item.product_info.banlance}}</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="storage-table__view">
      <div class="storage-content">
        <ul class="storage-menu">
          <li class="storage-menu__item">
            <label for="">相关项目：</label><span>九星企业C皮鞋采购1</span>
          </li>
          <li class="storage-menu__item">
            <label for="">相关订单：</label><span>采购订单1</span>
          </li>
          <li class="storage-menu__item">
            <label for="">合计消耗(元)：</label><span>100,000.00</span>
          </li>
          <li class="storage-menu__item text_right">
            <span>修改</span>
            <span>删除</span>
          </li>
        </ul>
      </div>
      <table class="chain_table" cellpadding='0' cellspacing='0'>
        <tr class="chain_table_title">
          <td v-for="(item, index) in tableTitle" :key='index'>
            <div>{{item.name}}</div>
          </td>
        </tr>
        <tr v-for="(item, index) in tableLine" :key='index' class="chain_table_line">
          <td>
            <div>{{item.product_info.product_name}}</div>
          </td>
          <td>
            <div>{{item.product_info.product_unit}}</div>
          </td>
          <td>
            <div v-if="item.isEdit">
              <input type="text" v-model="item.product_info.product_num">
            </div>
            <div v-if="!item.isEdit">{{item.product_info.product_num}}</div>
          </td>
          <td>
            <div class="text-align_right">{{item.product_info.product_price}}</div>
          </td>
          <td>
            <div>{{item.product_info.banlance}}</div>
          </td>
        </tr>
      </table>
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
        {key: 'banlance', name: '库存消耗量'}
      ],
      tableLine: [],
      EOS: false,
      product: {
        product_name: '',
        product_unit: '',
        product_num: '',
        product_price: '',
        banlance: ''
      },
      productErrMsg: {
        product_name: '请输入商品名称',
        product_unit: '请输入单位',
        product_num: '请输入数量',
        product_price: '请输入金额',
        banlance: '',
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
      const numReg = /^[0-9]+(.[0-9]{2})?$/
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
      }
      this.$forceUpdate()
    },
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
    this.tableLine = [{product_info: {
        product_name: '面粉',
        product_unit: '斤',
        product_num: '500',
        product_price: '123165',
        banlance: '20'
    }}]
  }
}
</script>
<style lang="less" scoped>
.text-align_right {
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
  background: #f5f7f8;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  .storage-table__view {
    padding-top: 15px;
    .storage-content {
      margin-bottom: 20px;
      font-size: 14px;
      color: #333;
      .storage-menu {
        padding: 0 5px;
        display: flex;
        .storage-menu__item {
          flex: 1;
          label,span {
            font-weight: bolder;
          }
          &.text_right {
            text-align: center;
            span {
              margin: 0 15px;
              color: #eb6100;
              text-decoration: underline 
            }
          }
        }
      }
    }
  }
}
.chain_table {
  border-left: 1px solid #eaebf0;
  border-right: 1px solid #eaebf0;
  width: 100%;
  .chain_table_title {
    opacity:0.49;
    background:#fff;
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
    background: #fff;
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
