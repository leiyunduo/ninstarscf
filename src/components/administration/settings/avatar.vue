<template>
  <div class="auth">
    <div class="list_state">
      <h3>头像管理<p class="info">支持jpg、png、bmp、gif格式</p></h3>
      <div class="avatar">
          <p>当前头像</p>
          <div>
            <img :src="this.$root_url() + avatar" alt="">
          </div>
          <div>
            <div @click="handleClick()">修改</div>
          </div>
      </div>
    </div>
    <myUpload field="file"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="150"
      :height="150"
      :maxSize="2*1024*1024"
      :no-square="isShowSquare"
      url="/api/ns_file/"
      :params="params"
      img-format="jpg"
      :headers='headers'>
    </myUpload>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'

export default{
  name: 'avatar',
  components: {myUpload},
  data () {
    return {
      show: false,
      isShowSquare: false,
      avatar: '',
			params: {
				function_module: 'avatar'
      },
      businessId: '',
      headers: {}
    }
  },
  mounted () {
    const that = this
    that.businessId = localStorage.id
    that.headers['Auth-Token'] = localStorage.ns_token
    // 获取头像
    that.$ajax.get(`/api/company/` + that.businessId).then(res => {
      that.avatar = res.data.avatar
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    handleClick (index) {
      this.show = true
    },
    // 上传成功
    cropUploadSuccess (jsonData, field) {
      const that = this
      this.$message.success('上传成功')
      that.$ajax.patch('/api/auth/avatar/', {avatar: jsonData}).then(res => {
        // 获取头像
        that.$ajax.get(`/api/company/` + that.businessId).then(res => {
          that.avatar = res.data.avatar
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
      this.show = false
    },
    // 上传失败
    cropUploadFail (status, field) {
      this.$message.error('上传失败')
    }
  }
}
</script>
<style lang="less" scoped>
  .auth {
    .list_state {
      // height: 100%;
      width: 100%;
      h3 {
        font-family:PingFangSC-Medium;
        font-size:18px;
        color:#666666;
        letter-spacing:0;
        text-align:left;
        display: flex;
        flex-direction: row;
        padding-left: 22px;
        // border-left: 3px solid #eb6100;
        margin-top: 5px;
        padding-bottom: 10px;
        p.info {
          display: inline-block;
          font-family:PingFangSC-Regular;
          font-size:14px;
          color:#999999;
          letter-spacing:0;
          text-align:left;
          padding-top: 5px;
          padding-left: 10px;
        }
      }
      .avatar {
        padding: 0 20px;
        p {
          line-height: 30px;
          color: #333;
          padding: 10px;
        }
        div:nth-child(2) {
          text-align: center;
          padding: 20px 0;
          img {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            border: 1px solid #eaeaea;
          }
        }
        div:last-child {
          margin-top: 30px;
          div {
            width: 85px;
            height: 30px;
            border-radius: 2px;
            background: #eb6100;
            color: #fff;
            text-align: center;
            line-height: 30px;
            margin: 0 auto;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
