<template>
  <div class="chain_section_wrap">
    <table class="chain_table" cellpadding='0' cellspacing='0'>
      <!-- table 标题 -->
      <tr class="chain_table_title">
        <td v-for="(item, index) in fileTitle" :key='index'>
          <div>{{item.name}}</div>
        </td>
      </tr>
      <!-- table 数据 -->
      <tr v-for="(item, index) in uploadLine" :key='index' class="chain_table_line">
        <td>
          <div>{{item.name}}</div>
        </td>
        <td>
          <div>{{item.extend}}</div>
        </td>
        <td>
          <div>{{item.update_time ? item.update_time.substring(0, item.update_time.indexOf(' ')) : ''}}</div>
        </td>
        <td>
          <span @click="handleView(item)">查看</span>
        </td>
      </tr>
    </table>
    <div class="is_null" v-if="uploadLine.length === 0">暂未上传原件</div>
  </div>
</template>
<script>
export default {
  name: 'chainUploadEdit',
  data () {
    return {
      sw: 'show',
      fileTitle: [
        {key: 'product_name', name: '文件名称'},
        {key: 'product_unit', name: '文件格式'},
        {key: 'product_unit', name: '上传时间'},
        {name: '查看'}
      ],
      uploadLine: []
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 查看上传原件
    handleView (url) {
      let _href = this.$root_url() + url.location
      window.open(_href, '_blank')
    }
  },
  mounted () {
    this.uploadLine = this.tableData
    console.log(this.uploadLine)
  },
  watch: {
    tableData: function (ne, ol) {
      this.uploadLine = ne
    }
  }
}
</script>
<style lang="less" scoped>
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
div.is_null {
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
