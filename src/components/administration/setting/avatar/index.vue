<template>
  <div class="avatar-wraper">
    <div class="avatar-inner">
      <div class="avatar-title">
        <h4>头像管理</h4>
        <div class="avatar-title__tips">
          <label>当前头像</label>
          <p>支持png、jpg、gif、bmp格式</p>
        </div>
      </div>
      <div v-if="pic !== '/static/default_avatar.png'" class="avatar-viewer">
        <img :src="$root_url() + pic" alt="">
      </div>
      <div class="avatar-handler">
        <span @click="uploadAvatar">上传头像</span>
      </div>
    </div>
    <myUpload field="file"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="150"
      :height="150"
      :headers='headers'
      :maxSize="2*1024*1024"
      :no-square="isShowSquare"
      :params="params"
      url="/api/ns_file/"
      img-format="jpg"></myUpload>
  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload'
  import { mapState } from 'vuex'
  export default {
    name: '',
    data () {
      return {
        default_avatar: 'static/img/users/new_msg.png',
        isShowSquare: '',
        show: false,
        params: {},
        headers: {}
      }
    },
    components: {
      myUpload
    },
    mounted () { 
      this.headers = { //上传头像
        'Auth-Token': localStorage.ns_token
      }
    },
    computed: {
      ...mapState({
        avatar: status => status.homePage.avatar
      }),
      pic () {
        let avatar = localStorage.avatar || ""
        return this.avatar || decodeURIComponent(avatar)
      }
    },
    methods: { 
      cropSuccess () {},
      // 上传成功
      cropUploadSuccess (jsonData, field) {
        var that = this
        this.$message.success('上传成功')
        that.$ajax.patch('/api/auth/avatar/', {avatar: jsonData}).then(res => {
          // 获取头像
          that.$ajax.get(`/api/company/` + localStorage.id).then(res => {
            this.$store.commit('homePage/setAvatar', res.data.avatar)
            localStorage.setItem('avatar', encodeURIComponent(res.data.avatar))
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
      },
      uploadAvatar () {
        this.show = !this.show
      }
    }
  }
</script>
<style lang='less' scope>
  .avatar-wraper {
    padding: 15px 20px 15px 40px;
    .avatar-inner {
      .avatar-title {
        h4 {
          color: #666;
          font-size: 18px;
        }
        .avatar-title__tips {
          margin-top: 30px;
          font-size: 14px;
          &>label {
            color: #666;
            font-size: 16px;
          }
          &>p {
            color: #999;
            margin-top: 8px;
          }
        }
      }
      .avatar-viewer {
        margin-top: 20px;
        &>img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
      }
      .avatar-handler {
        margin-left: 15px;
        margin-top: 35px;
        float: left;
        &>span {
          background:rgba(255,255,255,1);
          border: 1px solid rgba(220,220,220,1);
          box-shadow: 0px 2px 4px 0px rgba(153,153,153,0.4);
          border-radius: 4px;
          padding: 8px 15px;
          display: inline-block;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          user-select: none;
          &:active {
            .ns-tab-active(rgba(255,255,255,1), bg);
          }
        }
      }
    }
  }
</style>