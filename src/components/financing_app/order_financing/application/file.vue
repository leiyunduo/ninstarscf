<template>
  <div class="file_sign">
    <div class="title">
      <h3>个人无限连带责任承诺函</h3>
    </div>
    <div class="inner_tip">
      <p>
        <a href="#/financing_app/protocol" target='_blank'>个人无限连带责任承诺函</a>上传后只会展示给您申请的助贷机构和金融机构。
      </p>
      <a href='/ninstar/static/file/个人无限法人连带责任函.doc' target='_blank'>下载模板</a>
    </div>
    <div class="outter_tip">请将填写好的<a href="#/financing_app/protocol" target='_blank'>个人无限连带责任承诺函</a>上传后提交平台。
    </div>
    <div class='btn_list'>
      <div v-if="!file" class='null_file'>暂未上传签署后的责任书</div>
      <div v-if="file" class='has_file'>
        <div>
          <a :href="file.location" target='_blank'>{{file.name}}</a>
        </div>
        <div>
          上传时间：{{file.date}}
        </div>
        <i class='el-icon-error' @click="file = null"></i>
      </div>
      <div>
        <div>
          <input type="file" @change='handleUpload' ref='file'>
        </div>
        <div>
          <button>上传</button>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="handleModal()">提交</button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <p class='modal_info'>{{tip}}</p>
      <p class='modal_info'>{{info}}</p>
      <div class="button">
        <button @click="dialogVisible = false">取消</button>
        <button @click="handleSubmit()">确认</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'signFile',
  data () {
    return {
      file: null,
      fileUrl: '#',
      haiFile: 0,
      dialogVisible: false,
      tip: '',
      info: ''
    }
  },
  methods: {
    handleUpload (e) {
      const loading = this.$loading({          
        lock: true,
        text: '上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
      const that = this
      let file = {}
      file.name = e.target.files[0].name
      file.size = e.target.files[0].size
      file.type = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') + 1, e.target.files[0].name.length)
      file.info = e.target.files[0]
      let regFile = /(png|jpg|jpeg|pdf)/
      if (!(regFile.test(file.type))) {
        loading.close()
        that.$message.error('请上传png，jpg，jpeg或pdf格式文件')
      } else {
        if (file.size > 10 * 1024 * 1024) {
          loading.close()
          that.$message.error('文件大小超过10M')
        } else {
          let upload = new FormData()
          upload.append('function_module', 'financing')
          upload.append('file', file.info)
          this.$ajax.post('/api/ns_file/', upload).then(res => {
            if (res.status === 200) {
              loading.close()
              file.location = that.$root_url() + res.data
              file.url = res.data
              file.date = that.$time(new Date(), 2)
              that.file = file
              that.$forceUpdate()
              this.$message.success('上传成功')
            }
          })
        }
      }
    },
    // 显示弹框
    handleModal () {
      this.dialogVisible = true
      if (this.file) {
        this.tip = '提交后融资申请将会发送给您申请的金融机构'
        this.info = '个人无限连带责任承诺函只会展示给您申请的金融机构'
      } else {
        this.tip = '提交后融资申请将会发送给您申请的金融机构'
        this.info = '您可以在融资申请的列表上传个人无限连带责任承诺函'
      }
    },
    // emit 数据
    handleSubmit (e) {
      const that = this
      if (that.file) {
        that.$emit('submit', that.file.url)
      } else {
        that.$emit('submit', null)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .file_sign {
    background: #fff;
    padding: 0 20px;
    padding-bottom: 30px;
    .title {
      height: 52px;
      border-bottom: 1px solid #e1e6f0;
      padding-top: 20px;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        border-left: 5px solid #eb6100;
        height: 24px;
        padding-left: 22px;
        line-height: 24px;
      }
    }
    .inner_tip {
      display: flex;
      padding: 0 30px;
      padding-top: 20px;
      line-height: 30px;
      color: #666;
      font-size: 14px;
      a {
        color: #eb6100;
      }
      p {
        width: 50%;
      }
    }
    .outter_tip {
      font-size: 14px;
      padding: 0 30px;
      line-height: 30px;
      color: #666;
      a {
        color: #eb6100;
      }
    }
    .btn_list {
      padding: 0 30px;
      margin: 12px 0;
      display: flex;
      &>div:first-child {
        width: 50%;
      }
      .null_file {
        line-height: 30px;
        // text-align: center;
        color: #999;
      }
      .has_file {
        display: flex;
        height: 30px;
        align-items: center;
        div:first-child {
          width: 240px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          // color: #666;
          a {
            color: #eb6100;
          }
        }
        div:nth-child(2) {
          color: #666;
        }
        i {
          font-size: 14px;
          color: #fa1144;
          cursor: pointer;
          margin-left: 18px;
        }
      }
      &>div:last-child {
        position: relative;
        div {
          width: 80px;
          height: 30px;
          overflow: hidden;
          button {
            width: 80px;
            text-align: center;
            line-height: 30px;
            margin: 0 auto;
            background: none;
            border-radius: 2px;
            height: 30px;
            font-size: 14px;
            color: #e87626;
            letter-spacing: 0;
            // font-weight: bold;
            text-decoration: underline;
            border: none;
          }
        }
        div:first-child {
          position: absolute;
          top: 0;
          input {
            display: inline-block;
            padding: 2px 0;
            height: 30px;
            margin: 0;
            padding: 0;
            cursor: default;
            opacity: 0;
          }
          // z-index: 2;
        }
      }
    }
    .btn {
      text-align: center;
      margin: 24px 0;
      button {
        width: 120px;
        text-align: center;
        line-height: 30px;
        margin: 0 auto;
        cursor: pointer;
        background: #e87626;
        border-radius: 2px;
        height: 30px;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0;
        border: 1px solid #e87626;
      }
      p {
        // line-height: 30px;
        margin: 12px 0;
        font-size: 14px;
        text-align: center;
        color: #999;
        span {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    .modal_info {
      line-height: 24px;
      text-align: center;
      color: #666;
      margin-bottom: 10px;
    }
    .button {
      text-align: center;
      padding: 20px 0;
      button {
        width: 120px;
        text-align: center;
        line-height: 30px;
        margin: 0 auto;
        cursor: pointer;
        border-radius: 2px;
        height: 30px;
        font-size: 12px;
        letter-spacing: 0;
        border: 1px solid #e87626;
        margin: 0 20px;    
      }
      button:first-child {
        background: #fff;
        color: #e87626;
      }
      button:last-child {
        background: #e87626;
        color: #fff;
      }
    }
  }
</style>