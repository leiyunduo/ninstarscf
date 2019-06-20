<template>
  <div class="chain_section_wrap">
    <table class="chain_table" cellpadding='0' cellspacing='0'>
      <tr class="chain_table_title">
        <td v-for="(item, index) in tableTitle" :key='index'>
          <div>{{item.name}}</div>
        </td>
      </tr>
      <tr v-for="(item, index) in tableLine" :key='index' class="chain_table_line">
        <td>{{item.product_name}}</td>
        <td>{{item.product_unit}}</td>
        <td>{{item.product_num}}</td>
        <td class="table-align_right">{{item.product_price}}</td>
      </tr>
    </table>
    <div class="in_null" v-if="tableLine.length === 0">暂无货物信息</div>
  </div>
</template>
<script>
export default {
  name: 'chainTableViewFour',
  data () {
    return {
      tableTitle: [
        {key: 'product_name', name: '商品名称'},
        {key: 'product_unit', name: '单位'},
        {key: 'product_num', name: '数量'},
        {key: 'product_price', name: '合计价格'}
      ],
      tableLine: []
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.tableLine = this.tableData
  },
  watch: {
    tableData: function (ne, ol) {
      this.tableLine = ne
    }
  }
}
</script>
<style lang="less" scoped>
.table-align_right {
  text-align: right;
  padding-right: 11% 
}
.chain_section {
  background: #fff;
}
.chain_section_wrap {
  background: #fff;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #e1e6f0;
  border-bottom: 0; 
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
      width: 25%;
      text-align: center;
      font-size: 14px;
      color: #666;
      padding: 13px 0;
      line-height: 45px;
      div {
        height: 17px;
        line-height: 17px;
        border-right: 1px dashed #777;
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
    font-size: 14px;
    td {
      border-bottom: 1px solid #efefef;
      line-height: 45px;
      span {
        color: #eb6100;
        text-decoration: underline;
        margin: 0 12px;
        cursor: pointer;
      }
    }
  }
}
div.in_null {
  border: 1px solid #efefef;
  border-top: none;
  text-align: center;
  color: #999;
  height: 45px;
  line-height: 45px;
  width: 100%;
  font-size: 14px;
}
</style>
