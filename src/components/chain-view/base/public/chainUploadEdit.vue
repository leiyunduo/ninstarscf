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
          <span @click="handleDelete(index, item.id)">删除</span>
        </td>
      </tr>
    </table>
    <!-- 添加/取消 按钮 -->
    <div class="add_profuct">
      <span>+</span>
      <span>电子原件或扫描件</span>
      <input ref="upload" class="_file" value="" type="file"  @change="handleAdd($event)">
    </div>
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
        {name: '查看/删除'}
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
    // 上传按钮
    handleAdd ($event) {
      const that = this
      let file = $event.target.files[0]
      if (file.size > 10 * 1024 * 1024) {
        this.$message.error('文件大小超过10M')
        return
      } else if (file.type === 'application/pdf' || file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        let extend = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
        let upload = new FormData()
        upload.append('name', file.name)
        upload.append('extend', extend)
        upload.append('content', file)
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        })
        this.$ajax.post('/api/chain/attachment/', upload).then(res => {
          if (res.status === 201) {
            this.$message.success('上传成功')
            this.uploadLine.push({
              name: res.data.name,
              extend: extend,
              update_time: res.data.update_time,
              id: res.data.id,
              location: res.data.location
            })
          }
          loading.close()
        })
      } else {
        this.$message.error('请上传指定类型的文件(png, jpg, jpeg或pdf)')
        loading.close()
      }
    },
    // 查看上传原件
    handleView (url) {
      let _href = this.$root_url() + url.location
      window.open(_href, '_blank')
    },
    // 删除某一上传原件
    handleDelete (index, fileId) {
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
      this.$ajax.delete(`/api/chain/attachment/${fileId}/`).then(res => {
        if (res.status === 204) {
          this.$message.success('删除成功')
          this.uploadLine.splice(index, 1)
          document.getElementsByClassName('_file')[0].value = ''
        }
        loading.close() 
      })
    }
  },
  mounted () {
    this.uploadLine = this.tableData
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
.add_profuct {
  line-height: 45px;
  background:#f0f2f7;
  width:100%;
  height:45px;
  text-align: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  span:first-child {
    font-size: 20px;
    font-weight: bolder;
  }
  span.cancel_btn {
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  input {
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
