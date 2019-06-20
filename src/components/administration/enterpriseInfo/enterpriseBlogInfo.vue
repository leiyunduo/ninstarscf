<template>
  <div class='enterpriseBlogInfo'>
    <!-- <AppNav :father='{selIndex: -1}' type='1'></AppNav> -->
    <div class='info-enter'>
      <div class="forms">
        <EnterpriseInfo :adminColor="{colorIndex: 'enterpriseBlogInfo'}"></EnterpriseInfo>
        <div class="forms_list">
          <div class="left">
            <div class="card_title">
              <h3>企业博客</h3>
              <div>
                <button class="sel" @click="updateBlog">发布博客</button>
              </div>
            </div>
            <!-- 企业博客 -->
            <div class="blog_list">
              <div>
                <div class="box_list">
                  <div class="blog_line" v-if="blogList.length !== 0" v-for="(item, index) in blogList" :key='index'>
                    <div class="title">标题：{{item.title}}</div>
                    <div class="title_top">
                      <div><span style="color: #999999;display:inline-block;padding-right:15px;">来源：{{item.business_name}}</span><span style="color: #eb6100;">{{item.post_time}}</span></div>
                      <div>
                        <el-tooltip placement="bottom" effect="light">
                          <div slot="content">
                            <div class="list_btn">
                              <span @click="selectNews(index, item)">查看</span>
                              <span @click="exitNews(index, item)">编辑</span>
                              <span @click="deleteNews(index, item)">删除</span>
                            </div>
                          </div>
                          <div class="el_div_button">
                            <el-button><i class="el-icon-arrow-down"></i></el-button>
                          </div>
                        </el-tooltip>
                      </div>
                    </div>
                    <div class="pic_img">
                      <img class="pic" v-if="item.picture !== null" :src="$root_url() + item.picture">
                      <img class="pic" src="../../../../static/img/news.png" v-if="item.picture === null" alt="">
                      <p class="body_list" v-html="item.body"></p>
                    </div>
                  </div>
                  <el-pagination v-if="total" @current-change="handleSizeChange"
                    :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                  </el-pagination>
                  <div class="blog_line" v-if="blogList.length === 0" style="text-align:center;line-height: 120px; color: #999">还没发布过博客</div>
                </div>
                <el-dialog title="提示" :visible.sync="dialogVisibleNews" width="25%" :before-close="handleClose">
                  <div class="box_lists">
                    <h3>确定删除么？</h3>
                    <div class="list">
                      <button class="cancel" @click="newCancel">取消</button>
                      <button class="prese" @click="newPreservation">确定</button>
                    </div>
                  </div>
                </el-dialog>
              </div>
            </div>
          </div>
          <!-- <div class="right">
            <div class="enterpriseBlogInfo_blog">
              <div class="blog">
                <ul>
                  <li>
                    <p @click='updateBlog'>发布博客</p>
                  </li>
                </ul>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EnterpriseInfo from './enterpriseInfo'
// import AppNav from '../../financing/financingManege'
export default {
  components: {
    // AppNav,
    EnterpriseInfo
  },
  data () {
    return {
      name: 'enterpriseBlogInfo',
      editTitle: '编辑',
      id: '',
      enterInfor: '',
      creditCode: '',
      region: '',
      regtionAuthor: '',
      year_founded: '',
      registrationNum: '',
      // 登记状态：
      register_assets: '',
      // 经营范围：
      // 经营期限：
      // 核准日期：
      trade: '',
      address: '',
      introduceSelect: true,
      introduceEdit: false,
      // 荣誉资质
      imageUrl: '',
      // 荣誉资质上传图片地址
      updateUrl: '/api/manage/business/honor/',
      // 图片
      urlImg: '',
      // 图片名称
      title: '',
      // 图片格式
      pic_type: '',
      // 荣誉资质显示
      imgTit: [],
      // 公司介绍
      company_profile: '',
      // 新闻列表
      blogList: [],
      // 分页
      currPage: 1,
      total: '',
      page_size: '',
      pageSize: 5,
      dialogVisible: false,
      dialogVisibles: false,
      honorImg: [],
      checkedCities: [],
      honorId: [],
      radio2: '',
      dialogVisibleNews: false,
      newId: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id
    // 新闻详情
    this.$ajax.get('/api/home_page/news/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
      this.blogList = res.data.results
      this.total = res.data.count
    }).catch(err => {
      this.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 取消
    handleClose () {
      this.dialogVisible = false
      this.dialogVisibles = false
      this.dialogVisibleNews = false
    },
    selectNews (index, item) {
      var that = this
      that.$router.push({
        path: '/news',
        query: {
          id: item.id
        }
      })
    },
    // 删除新闻
    newPreservation () {
      var that = this
      that.$ajax.delete(`/api/home_page/news/` + that.newId + '/').then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        that.dialogVisibleNews = false
        // 新闻详情
        this.$ajax.get('/api/home_page/news/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          this.blogList = res.data.results
          this.total = res.data.count
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      }).catch(err => {
        this.$message.error(err.response.data.err_msg)
      })
    },
    // 删除
    newCancel () {
      this.dialogVisibleNews = false
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    },
    // 删除
    deleteNews (index, item) {
      var that = this
      that.dialogVisibleNews = true
      that.newId = item.id
    },
    // 编辑
    exitNews (index, item) {
      var that = this
      that.$router.push({
        path: '/blogEditor',
        query: {
          type: 3,
          id: item.id
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      var that = this
      this.currPage = val
      this.$ajax.get('/api/home_page/news/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
        this.blogList = res.data.results
        this.total = res.data.count
      }).catch(err => {
        this.$message.error(err.response.data.err_msg)
      })
    },
    // 取消
    cancelEdit () {
      this.editTitle = '编辑'
      this.introduceSelect = true
      this.introduceEdit = false
    },
    // 跳转发布博客
    updateBlog: function () {
      var that = this
      that.$router.push({
        path: '/blogEditor',
        query: {
          type: 3
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.list_btn {
  span {
    cursor: pointer;
    display: block;
    // font-family:PingFangSC-Regular;
    font-size:10px;
    color:#6a6a6a;
    letter-spacing:0;
    background: none;
    border: none;
    border-bottom: 1px solid #e1e6f0;
    outline: none;
    padding-top: 3px;
    width: 52px;
    text-align: center;
  }
  span:hover {
    color: #eb6100;
  }
}
.el_div_button {
  padding-right: 41px;
  .el-button:focus, .el-button:hover {
    color: #000000;
    border-color: none;
    background-color: none;
  }
  .el-button {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: none;
    border: none;
    color: #000000;
    outline: 0;
    padding: 0;
    text-align: center;
  }
}
.enterpriseBlogInfo {
  min-height: 100%;
  display: flex;
  background: #fafafa;
  //padding-top: 70px;
  .info-enter {
    width: 100%;
    font-size: 14px;
    margin: 0 auto;
    padding: 0 50px;
    // height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    padding-bottom: 60px;
    .forms {
      flex: 1;
    }
    .forms_list {
      max-width: 1200px;
      margin: 0 auto;
      height: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      background:#ffffff;
      border:1px solid #e1e6f0;
      border-radius:4px;
    }
    .left {
      width: 100%;
      padding: 0 15px;
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
          font-weight: bold;
        }
        button {
          color:#fff;
          border: none;
          outline: none;
          margin: 0;
          background:#f48537;
          border-radius:4px;
          width:80px;
          height:28px;
        }
        button:hover {
          border:1px solid #f48537;
          color: #f48537;
          background: #fff;
        }
        .sel {
          background: #f48537;
          color: #fff;
          border: none;
        }
        .cancel {
          border: 1px solid #f48537;
          color: #f48537;
          background: #fff;
        }
      }
      .blog_list {
        width: 100%;
      }
      .top_btn {
        width: 100%;
        // height: 36px;
        button {
          width: 100%;
          height: 62px;
          text-align: center;
          line-height: 62px;
          white-space: nowrap;
          cursor: pointer;
          background: #fff;
          border: 1px solid #e7ebee;
          color: #606266;
          border-radius: 5px;
          outline: none;
        }
      }
      .box_list {
        margin-top: 30px;
        position: relative;
        padding-bottom: 20px;
        .box_list_top {
          height: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid #eaeaea;
          div {
            width: 33.3%;
            height: 100%;
            line-height: 30px;
          }
        }
        .blog_line {
          height: 241px;
          background: #fff;
          margin-bottom: 30px;
          overflow: hidden;
          .title {
            flex: 1;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
          }
          .title_top {
            height: 40px;
            display: flex;
            line-height: 40px;
            flex-direction: row;
            .el-icon-close {
              cursor: pointer;
            }
            div:first-child{
              flex: 1;
            }
          }
          div:last-child {
            color: #696969;
            font-size: 12px;
          }
          i {
            margin: 11px 11px 0 25px;
            font-size: 16px;
          }
          .pic_img {
            height: 180px;
            display: flex;
            flex-direction: row;
            border: 1px solid #e7ebee;
            .pic {
              width: 130px;
              height: 120px;
              margin: 30px 0 0 20px;
              overflow: hidden;
              img {
                width: 130px;
                height: 115px;
              }
            }
            img {
              width: 130px;
              height: 115px;
            }
            .body_list {
              width: 100%;
              height: 150px;
              overflow-y: scroll;
              text-align: left;
              padding-top: 30px;
              padding-left: 25px;
              line-height: 24px;
              text-indent: 2em;
              padding-right: 46px;
              word-break: break-all;
              cursor: pointer;
              // display: -webkit-box;
              // -webkit-box-orient: vertical;
              // -webkit-line-clamp: 3;
              // overflow: hidden;
            }
            .body_list::-webkit-scrollbar{
              display: none;
            }
          }
        }
      }
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
            border: 1px dashed;
          }
          .avatar {
            // width: 450px;
            height: 200px;
            display: block;
          }
        }
        .el-button {
          margin-top: 30px;
        }
      }
      .box_list2 {
        position: relative;
        h3 {
          font-weight: bold;
          font-size: 18px;
          padding-bottom: 20px;
        }
        button {
          width: 90px;
          height: 30px;
          line-height: 30px;
          outline: none;
          margin: 0 30px;
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
            border: 1px dashed;
          }
          .avatar {
            // width: 450px;
            height: 200px;
            display: block;
          }
        }
        .el-button {
          margin-top: 30px;
        }
      }
    }
    .right {
      .enterpriseBlogInfo_blog {
        width: 100px;
        height: auto;
        .blog {
          float: left;
          ul {
            height: auto;
            text-align: right;
            li {
              height: auto;
              padding: 15px 0 15px 0;
              // margin: 15px 0;
              border-left: 1px solid #e4e7ed;
              p {
                height: 32px;
                display: block;
                width: auto;
                font-family:PingFangSC-Semibold;
                font-size:14px;
                line-height: 32px;
                color:#999999;
                padding-left: 34px;
                cursor: pointer;
              }
            }
            .active {
              p {
                color: #eb6100;
                height: 32px;
                border-left: 3px solid #eb6100;
              }
            }
            li:hover {
              p {
                color: #eb6100;
                height: 32px;
                border-left: 3px solid #eb6100;
              }
            }
          }
        }
      }
    }
  }
}
.pic {
  img {
    width: 130px;
    height: 115px;
  }
}
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
      border: 1px dashed;
    }
    .avatar {
      // width: 450px;
      height: 200px;
      display: block;
    }
  }
  .el-button {
    margin-top: 30px;
  }
}
.box_list2 {
  .block {
    text-align: left;
    span {
      display: inline-block;
      margin: 20px;
      img {
        width: 130px;
        height: 115px;
      }
    }
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
  .box_list2_list {
    text-align: center;
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
</style>
