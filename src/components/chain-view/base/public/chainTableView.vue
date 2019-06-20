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
      </tr>
    </table>
    <div class="in_null" v-if="tableLine.length === 0">暂无货物信息</div>
  </div>
</template>
<script>
export default {
  name: 'chainTableView',
  data () {
    return {
      tableTitle: [
        {key: 'product_name', name: '商品名称'},
        {key: 'product_unit', name: '单位'},
        {key: 'product_num', name: '数量'}
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
      width: 33.3%;
      vertical-align: middle;
      text-align: center;
      font-size: 14px;
      color: #999;
      div {
        height: 18px;
        line-height: 18px;
        border-left: 1px solid #e1e6f0;
        border-right: 1px solid #e1e6f0;
      }
    }
    td:first-child div {
      border-left: none;
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
      vertical-align: middle;
      border-bottom: 1px solid #efefef;
    }
    td:first-child {
      border-left: 1px solid #efefef;
    }
    td:last-child {
      border-right: 1px solid #efefef;
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
