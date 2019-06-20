<template>
  <div class="album-wraper">
    <div class="album-view">
      <div class="album-group" v-if="imgTit.length">
        <div class="album-group__item" v-for="(item, index) in imgTit" :key="index">
          <div class="icon-handler-wraper">
            <div class="icon-handler">
              <span class="handler-view" @click="imgView(item)"></span>
              <span class="handler-close" @click="remove(item)"></span>
            </div>
          </div>
          <img :src="$root_url() + item.picture" alt="">
        </div>
      </div>
      <div class="album-group" v-else>
        <span class="content-null">暂无内容</span>
      </div>
    </div>
    <el-dialog :visible.sync="imgShow" :before-close="handleClose">
      <div style="text-align:center;"><img :src="$root_url() + pictures" alt=""></div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="box_list1">
        <h3>荣誉资质</h3>
        <div class="block">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :action="updateUrl"
            :data="formData"
            :headers="headers"
            :show-file-list="false"
            v-model="urlImg"
            :auto-upload="false"
            :on-change="handleSelect"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <button class="cancel" @click="honorCancel">取消</button>
        <button class="prese" @click="uploadImg">保存</button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibles" title="提示" width="25%" :before-close="handleClose">
      <div class="box_lists">
        <span>确认删除该照片么？</span>
        <div class="list">
          <button class="cancel" @click="dialogVisibles = false">取消</button>
          <button class="prese" @click="GroundOK">确定</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: '',
    props: [],
    data () {
      return {
        imgShow: false,
        dialogVisible: false,
        dialogVisibles: false,
        updateUrl: '/api/ns_file/',
        urlImg: '',
        imageUrl: '',
        pictures: '',
        // 图片名称
        title: '',
        imgTit: [],
        honorId: [],
        formData: {},
        headers: {}    
      }
    },
    mounted () { 
      this.imgHonor()
    },
    methods: {
      imgView (item) {
        this.imgShow = true
        this.pictures = item.picture
      },
      remove (item) {
        this.honorId = item.id
        this.dialogVisibles = true
      },
      imgHonor () {
        this.$ajax.get('/api/home_page/honor/').then(res => {
          this.imgTit = res.data.results
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      imgUpload () {
        this.imageUrl = ''
        this.dialogVisible = true
      },
      handleClose () {
        this.dialogVisible = false
        this.dialogVisibleNews = false
        this.dialogVisibles = false
        this.imgShow = false
      },
      GroundOK () {
        this.$ajax.delete(`/api/home_page/honor/` + this.honorId + '/').then(res => {
          this.$message.success('删除成功！')
          this.imgHonor()
          this.dialogVisibles = false
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      honorCancel () {
        this.dialogVisible = false
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
        const isLt2M = file.size < 2 * 1024 * 1024
        if (!isJPG) {
          this.$message.error('只能是 JPG、JPEG或者PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      honorPreservation () {
        // 荣誉资质信息
        if (this.urlImg === '') {
          this.$message.error('荣誉资质为空')
        } else {
          this.$ajax.post('/api/home_page/honor/', {title: this.title, picture: this.img_honor}).then(res => {
            this.imgHonor()
            this.dialogVisible = false
            this.$message.success('上传成功！')
          }).catch(err => {
            this.$message.error(err.response.data.err_msg)
          })
        }
      },
      uploadImg () {
        this.$refs.upload.submit()
      },
      handleAvatarSuccess (res) {
        this.img_honor = res
        this.honorPreservation()
      },   
      handleAvatarError (err) {
        console.log(err)
        this.$message.error(err.response.data.err_msg)
      },
      handleSelect (file) {
        // 使用element的submit()方法,需要设置headers绑定token
        // 并且默认提交的时候传入file属性，所以不需要自己设置file属性
        this.imageUrl = URL.createObjectURL(file.raw)
        this.urlImg = file.raw
        this.title = file.name.split('.')[0]
        let _formData = {
          function_module: 'honor'
        }
        this.formData = _formData
        this.headers = {
          'Auth-Token': localStorage.ns_token
        }
      }
    }
  }
</script>
<style lang='less' scope>
  .album-wraper {
    .box_list1 {
      text-align: center;
      margin-top: 30px;
      padding-bottom: 20px;
      position: relative;
      h3 {
        font-weight: bold;
        padding-bottom: 30px;
      }
      button {
        width: 90px;
        height: 30px;
        line-height: 30px;
        outline: none;
        margin: 30px 30px;
        border-radius: 5px;
      }
      .prese {
        background: #eb6100;
        border: none;
        color: #fff;
      }
      .cancel {
        border: 1px solid #eb6100;
        background: none;
        color: #eb6100;
      }
      .block {
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 450px;
          height: 200px;
          line-height: 200px;
          text-align: center;
        }
        .avatar {
          height: 200px;
          display: block;
        }
      }
      .el-button {
        margin-top: 30px;
      }
    }
    .box_lists {
      span {
        a {
          color: #333;
          font-weight: bold;
          text-decoration: none;
          display: inline-block;
          padding: 0 10px;
        }
      }
      .list {
        text-align: right;
        margin-top: 20px;
        button {
          width: 90px;
          height: 30px;
          line-height: 30px;
          outline: none;
          margin: 10px 10px;
          border-radius: 5px;
        }
        .prese {
          background: #eb6100;
          border: none;
          color: #fff;
        }
        .cancel {
          border: 1px solid #eb6100;
          background: none;
          color: #eb6100;
        }
      }
    }
    .album-view {
      .album-group {
        .content-null {
          display: block;
          width: 70px; 
          margin: 90px auto 0;
          color: #666;
          font-size: 14px;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            background: url('../../../../../static/img/users/null.png');
            width: 64px;
            height: 41px;
            top: -45px;
            left: -4px;
          }
        }
        margin: 20px;
        &::after {
          content: '';
          display: table;
          clear: both;
        }
        .album-group__item {
          float: left;
          position: relative;
          margin-top: 15px;
          cursor: pointer;
          margin-right: 10px;
          border-radius: 24px;
          padding: 10px;
          img {
            border-radius: 4px;
            height: 81px;
            width: 144px;
            -webkit-filter: brightness(100%); /* Chrome, Safari, Opera */
            filter: brightness(100%);
            transition: all .4s ease;
          }
          .icon-handler-wraper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all .4s ease;
            width: 144px;
            height: 81px;
            z-index: 1;
            &:hover {
              opacity: 1;
              transition: all .4s ease;
              &+img {
                -webkit-filter: brightness(40%); /* Chrome, Safari, Opera */
                filter: brightness(40%);
                transition: all .4s ease;
                cursor: pointer;
              }
            }
            .icon-handler {
              text-align: center;
              margin-top: 28px;
              &>span {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin: 0 7px;
                &.handler-close {
                  background: url('../../../../../static/img/users/trash.png')
                }
                &.handler-view {
                  background: url('../../../../../static/img/users/imgView.png')
                }
              }
            }
          }
        }
      }
    }
  }
</style>