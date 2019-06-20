<template>
  <div class="c_container">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="ue_wrap">
      <location :location="location"></location>
      <div class="c_blog_box">
        <div class="types_two" v-if="types === 3">
          <div class="card_title">
            <h3>企业博客</h3>
            <button :class="{btnActive: btnActive}" @click='submit'>发布</button>
          </div>
          <div class="blog_title">
            <input type="text" placeholder="请输入博客标题" maxlength="32" v-model="blogTitle">
            <div class="block">
              <el-upload
                class="avatar-uploader"
                :action="updateUrl"
                :show-file-list="false"
                v-model="urlImg"
                :before-upload="beforeAvatarUpload"
                :on-progress="handleAvatarSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="types_two" v-if="types === 2">
          <div class="card_title">
            <h3>企业介绍</h3>
            <button :class="{btnActive: btnActive}" @click='submit'>发布</button>
          </div>
          <div class="p_name">
            <p>{{names}}</p>
          </div>
          <div>
            <input type="text" v-model='brief_introduction.business_desc.abbreviation' maxlength="6" placeholder="请填写4-6字的企业简介（选填）">
          </div>
          <div>
            <input type="text" v-model='brief_introduction.business_desc.slogan' maxlength="128" placeholder="请填写标语（选填）">
          </div>
        </div>
        <div class="type_two" v-if="types === 1">
          <div class="card_title">
            <h3>财务表单</h3>
            <button :class="{btnActive: btnActive}" @click='submit'>发布</button>
          </div>
          <div class="types_list" v-if='!id'>
            <el-select v-model="btnName" placeholder="请选择表单类型" @change="btnChange">
              <el-option v-for="(item, index) in btnList" :key="index" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="types_list" v-if='id'>
            <input type="text" v-model="btnNames" disabled>
          </div>
          <div>
            <span style="font-size: 12px;">表单所属时间：</span>
            <el-date-picker v-model="from.dates" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </div>
        <quill-editor ref="myTextEditor"
                      v-model="brief_introduction.content"
                      :config="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <!-- <div class="submit">
          <div @click='submit'>提交</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import appNav from '../../financing/financingManege'
import Location from '../../location/location'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'blogEditor',
  components: {
    quillEditor,
    // appNav,
    Location
  },
  data () {
    return {
      // 上传图片地址
      updateUrl: '',
      urlImg: '',
      imageUrl: '',
      father: {selIndex: 10},
      editorOption: '',
      blogTitle: '',
      types: '',
      names: '',
      btnActive: false,
      btnName: '',
      btnNames: '',
      btnList: [],
      from: {
        dates: ''
      },
      // 公司简介
      brief_introduction: {
        content: '',
        business_desc: {
          slogan: '',
          abbreviation: ''
        }
      },
      id: '',
      ids: '',
      businessId: '',
      detailId: '',
      img_honor: ''
    }
  },
  methods: {
    // 博客图片
    handleAvatarSuccess (res, file) {
      var fileUrl = new FormData()
      fileUrl.append('file', file.raw)
      fileUrl.append('function_module', 'honor')
      this.imageUrl = URL.createObjectURL(file.raw)
      this.urlImg = file.raw
      this.$ajax.post('/api/ns_file/', fileUrl).then(res => {
        this.img_honor = res.data
      }).catch(err => {
        this.$message.error(err.response.data.err_msg)
      })
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
    // 财务状况下拉
    btnChange () {
      console.log(this.btnName)
    },
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
      if (this.brief_introduction.content !== '') {
        this.btnActive = true
      } else {
        this.btnActive = false
      }
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
      if (this.brief_introduction.content !== '') {
        this.btnActive = true
      } else {
        this.btnActive = false
      }
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      // // console.log('editor change!', editor, html, text)
      this.brief_introduction.content = html
    },
    submit: function () {
      var that = this
      if (this.brief_introduction.content !== '') {
        if (that.types === 2) {
          // 企业介绍
          that.$ajax.patch(`/api/company_detail/` + that.detailId + '/', {brief_introduction: that.brief_introduction, partial: true}).then(res => {
            // console.log(res)
            that.$router.push('/')
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (that.types === 1) {
          if (that.$route.query.id) {
            // 编辑
            that.$ajax.put(`/api/home_page/financial_situation/` + that.id + '/', {dates: that.from.dates, group: that.btnName, body: that.brief_introduction.content, pic_list: []}).then(res => {
              that.$message.success('编辑成功！')
              that.$router.push({
                path: '/',
                query: {
                  qIndex: 2
                }
              })
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          } else {
            // 发布
            that.$ajax.post('/api/home_page/financial_situation/', {dates: that.from.dates, group: that.btnName, body: that.brief_introduction.content, pic_list: []}).then(res => {
              that.$router.push({
                path: '/',
                query: {
                  qIndex: 2
                }
              })
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }
        } else {
          if (that.$route.query.id) {
            // 编辑
            that.$ajax.put(`/api/home_page/news/` + that.id + '/', {title: that.blogTitle, body: that.brief_introduction.content, picture: that.img_honor}).then(res => {
              that.$message.success('编辑成功！')
              that.$router.push('/enterpriseBlogInfo')
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          } else {
            // 添加
            that.$ajax.post('/api/home_page/news/', {title: that.blogTitle, body: that.brief_introduction.content, picture: that.img_honor}).then(res => {
              that.$router.push('/enterpriseBlogInfo')
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }
        }
      } else {
        that.$message.error('请输入内容')
      }
    }
  },
  mounted: function () {
    var that = this
    that.types = Number(that.$route.query.type)
    that.names = that.$route.query.name
    that.businessId = localStorage.id
    that.ids = that.$route.query.ids
    if (that.$route.query.id) {
      that.id = that.$route.query.id
      that.btnActive = true
    }
    if (that.types === 2) {
      // 企业信息展示
      that.$ajax.get(`/api/company/` + that.businessId).then(res => {
        that.detailId = res.data.detail
        that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
          that.names = res.data.name
          // that.brief_introduction.content = res.data.brief_introduction.content
          if (res.data.brief_introduction) {
            that.brief_introduction = res.data.brief_introduction
          }
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    } else if (that.types === 1) {
      that.$ajax.get('/api/home_page/financial_situation_group/').then(res => {
        that.btnList = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
      if (that.$route.query.id) {
        // 查看财务状况
        that.$ajax.get(`/api/home_page/financial_situation/` + that.id).then(res => {
          // console.log(res)
          that.btnName = res.data.group_id
          that.btnNames = res.data.group_title
          that.from = res.data
          that.brief_introduction.content = res.data.body
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    } else if (that.types === 3) {
      if (that.$route.query.id) {
        that.$ajax.get(`/api/home_page/news/` + that.id).then(res => {
          that.brief_introduction.content = res.data.body
          that.blogTitle = res.data.title
          that.imageUrl = that.$root_url() + res.data.picture
          that.img_honor = res.data.picture
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    }
    if (this.brief_introduction.content !== '') {
      this.btnActive = true
    } else {
      this.btnActive = false
    }
  },
  beforeCreate () {
    var that = this
    that.types = Number(that.$route.query.type)
    that.names = that.$route.query.name
    if (that.types === 1) {
      that.location = [
        {title: '账号管理', url: '/?qIndex=' + 2},
        {title: '财务状况'}
      ]
    } else if (that.types === 2) {
      that.location = [
        {title: '账号管理', url: '/'},
        {title: '企业主页'}
      ]
    } else {
      that.location = [
        {title: '账号管理', url: '/enterpriseBlogInfo'},
        {title: '企业博客'}
      ]
    }
  },
  computed: {
    editor: function () {
      return this.$refs.myTextEditor.quillEditor
    }
  }
}
</script>

<style lang="less">
.types_two {
  .card_title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e7ebee;
    align-items: center;
    height: 60px;
    h3 {
      border-left:4px solid #eb6100;
      font-size: 14px;
      color: #696969;
      padding-left: 15px;
    }
    button {
      border: none;
      outline: none;
      margin: 0;
      background:#f1f1f1;
      border-radius:4px;
      width:80px;
      height:28px;
      color: #666666;
    }
    .btnActive {
      border: none;
      outline: none;
      margin: 0;
      background:#f48537;
      border-radius:4px;
      width:80px;
      height:28px;
      color: #fff;
    }
  }
  .p_name {
    p {
      font-family:PingFangSC-Medium;
      font-size:16px;
      color:#333333;
      letter-spacing:0;
      text-align:left;
      padding: 11px 0;
    }
  }
  input {
    width:320px;
    height: 32px;
    padding: 0 10px;
    border-radius: 4px;
    margin: 10px 0;
    font-size: 12px;
    border: 1px solid #e7ebee;
    outline: none;
    background: none;
  }
}
.type_two {
  .card_title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e7ebee;
    align-items: center;
    height: 60px;
    h3 {
      border-left:4px solid #eb6100;
      font-size: 14px;
      color: #696969;
      padding-left: 15px;
    }
    button {
      border: none;
      outline: none;
      margin: 0;
      background:#f1f1f1;
      border-radius:4px;
      width:80px;
      height:28px;
      color: #666666;
    }
    .btnActive {
      border: none;
      outline: none;
      margin: 0;
      background:#f48537;
      border-radius:4px;
      width:80px;
      height:28px;
      color: #fff;
    }
  }
  .p_name {
    p {
      font-family:PingFangSC-Medium;
      font-size:16px;
      color:#333333;
      letter-spacing:0;
      text-align:left;
      padding: 11px 0;
    }
  }
  input {
    width:auto;
    height: 32px;
    padding: 0 10px;
    border-radius: 4px;
    margin: 10px 0;
    font-size: 12px;
    border: 1px solid #e7ebee;
    outline: none;
    background: none;
  }
}
.c_container{
  width: 100%;
  min-height: 100%;
  display: flex;
  //padding-top: 70px;
}
.c_blog_box{
  background: #fff;
  padding: 50px;
  box-shadow: 0px 0px 5px #ccc;
}
.ue_wrap {
  padding: 0 50px;
  background: #fff;
  // width: 100%;
}
.blog_title {
  height: auto;
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
      border: 1px dashed;
    }
    .avatar {
      // width: 450px;
      height: 200px;
      display: block;
    }
  }
}
.blog_title input {
  width:320px;
  height: 32px;
  padding: 0 10px;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 12px;
  border: 1px solid #e7ebee;
  outline: none;
  background: none;
}
.blog_title input::placeholder {
  font-style:italic;
}
.ue_wrap div.ql-container {
  height: 380px;
}
.submit {
  /* position: fixed;
  width: 100%;
  bottom: 0;
  width: 1280px; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;;
}
.submit div {
  width: 120px;
  height: 35px;
  line-height: 35px;
  color: #FFF;
  text-align: center;
  background: #eb6100;
  cursor: pointer;
}
.el-select {
  width: 193px;
}
/* div.ql-container {
  min-height: 100%;
} */
</style>
