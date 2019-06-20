<template>
  <div class="blog-wraper">
    <div class="blog-view">
      <div class="blog-body-wraper">
        <div class="blog-body">
          <div class="blog-header-wraper">
            <div class="blog-header">
              <div class="bar-title"><span>企业博客</span></div>
              <div class="bar-handler">
                <div class="btn btn-handler" @click="publash">发布</div>
              </div>
            </div>
          </div>
          <div class="blog-container-wraper">
            <div class="blog-container">
              <div class="msg-list-wraper">
                <div class="msg-list" v-if="blogList.length">
                  <div class="msg-list__item" v-for="(item, index) in blogList" :key="index">
                    <div class="msg">
                      <div class="msg-header">
                        <div class="msg-header__icon">
                          <img v-if="avatar !== '/static/default_avatar.png'" :src="$root_url() + avatar" alt="">
                          <img v-else :src="default_icon" alt="">
                        </div>
                        <div class="msg-header__text">
                          <h4>{{item.title}}</h4>
                          <p>{{item.post_time}}</p>
                        </div>
                        <div class="msg-handler" @mouseenter="onOver(index)" @mouseleave="onOut">
                          <img src="../../../../../static/img/icon/down.png" alt="">
                          <div class="drop-menu-wraper">
                            <ul class="drop-menu" :class="showIndex === index ? 'fade-in-active' : ''">
                              <li class="drop-menu__item">
                                <span @click="view(item)">查看</span>
                              </li>
                              <li class="drop-menu__item">
                                <span @click="edit(item)">编辑</span>
                              </li>
                              <li class="drop-menu__item">
                                <span @click="remove(item)">移除</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="msg-body">
                        <div class="msg-body__content">
                          <p v-html="item.body"></p>
                        </div>
                        <div class="msg-body__content-icon">
                          <img v-if="item.picture" :src="$root_url() + item.picture">
                          <img v-else src="../../../../../static/img/news.png" alt="">
                        </div>
                      </div>
                      <div class="msg-footer">
                        
                      </div>
                    </div>
                  </div>      
                </div>
                 <span v-else class="content-null">暂无内容</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisibles" width="80%" :before-close="handleClose">
      <edit ref="edit" v-if="dialogVisibles" @editState="editState" :types="editType" :id="Number(blogId)"/>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleNews" width="25%" :before-close="handleClose">
      <div class="box_lists">
        <h3>确定删除么？</h3>
        <div class="list">
          <button class="cancel" @click="newCancel">取消</button>
          <button class="prese" @click="newPreservation">确定</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleBlog" width="80%" :before-close="handleCloseBlog">
      <div class="blogView">
        <h4>{{blog.title}}<small>{{blog.post_time}}</small></h4>
        <p class="blog-content" v-html="blog.body"></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import edit from './editor'
  import {mapState} from 'vuex'
  export default {
    name: '',
    data () {
      return {
        default_icon: 'static/img/users/new_msg.png',
        dialogVisibles: false,
        editType: 3,
        currPage: 1,
        pageSize: 10000,
        blogList: [],
        total: '',
        dialogVisibleNews: false,
        dialogVisibleBlog: false,
        newId: '',
        blogId: '',
        showIndex: -1,
        blog: {}
      }
    },
    computed: {
      ...mapState({
        avatar: status => status.homePage.avatar
      })
    },
    components: {edit},
    mounted () { 
      this.getNews()
    },
    methods: {
      editState (e) {
        if (e === 'success' || e === 'error') {
          this.getNews()
          this.dialogVisibles = false
        }
      },
      onOver (index) {
        this.showIndex = index
      },
      onOut () {
        this.showIndex = -1
      },
      view (item) {
        this.getNewsById(item.id)
      },
      edit (item) {
        this.dialogVisibles = true
        this.blogId = item.id
        this.editType = 3
      },
      remove (item) {
        this.dialogVisibleNews = true
        this.newId = item.id
      },
      newCancel () {
        this.dialogVisibleNews = false
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      },
      newPreservation () {
        this.$ajax.delete(`/api/home_page/news/` + this.newId + '/').then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.dialogVisibleNews = false
          this.blogList = this.blogList.reduce((prev, next) => {
            if (next.id !== this.newId) {
              prev.push(next)
            }
            return prev
          }, [])
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      handleClose () {
        this.dialogVisibles = false
      },
      handleCloseBlog () {
        this.dialogVisibleBlog = false
      },
      publash () {
        this.dialogVisibles = true
        this.editType = 3
      },
      getNews () {
        this.$ajax.get('/api/home_page/news/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          this.blogList = res.data.results
          this.total = res.data.count
          let imgReg = /<img.*?(?:>|\/>)/gi;
          this.blogList = this.blogList.reduce((prev, next) => {
            next.body = next.body.replace(imgReg, '')
            prev.push(next)
            return prev
          }, [])
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      getNewsById (id) {
        if (id) {
          this.$ajax.get(`/api/home_page/news/` + id).then(res => {
            this.blog = res.data
            let imgReg = /<img.*?(?:>|\/>)/gi;
            this.blog.body = res.data.body.replace(imgReg, '')
            this.dialogVisibleBlog = true
          }).catch(err => {
            this.$message.error(err.response.data.err_msg)
          })
        }
      }
    }
  }
</script>
<style lang='less' scope>
  .blog-wraper {
    padding: 20px 20px 20px 41px;
    .blog-view {
      .blog-body-wraper {
        .blog-body {
          .blog-header-wraper {
            .blog-header {
              padding-bottom: 10px;
              border-bottom: 1px solid #e8e8e8;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .bar-title {
                color: #666;
                font-size: 14px;
                span {
                  font-weight: bolder;
                }
              }
              .bar-handler {
                .btn-group {
                  display: flex
                }
                .btn {
                  width:80px;
                  padding: 5px 20px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
                  text-align: center;
                  user-select: none;
                  &.btn-handler {
                    background:linear-gradient(90deg,rgba(235,97,0,1) 0%,rgba(239,129,51,1) 100%);
                    box-shadow:0px 2px 4px 0px rgba(235,97,0,0.4);
                    color: #fff;
                    &:hover {
                      .ns-tab-hover(#eb6100, bg)
                    }
                    &:active {
                      .ns-tab-active(#eb6100, bg)
                    }
                  }
                }
              }
            }
          }
          .blog-container-wraper {
            padding: 20px 10px;
            .blog-container {
              .msg-list-wraper {
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
                .msg-list {  
                  .msg-list__item { 
                    border-bottom: 1px dashed #c1c1c1;
                    &:last-of-type {
                      border-bottom: none
                    }
                    .msg {
                      padding: 15px;
                      .msg-header {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 15px 0;
                        .msg-header__icon {
                          img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%
                          }
                        }
                        .msg-header__text {
                          padding-left: 15px;
                          font-weight: 400;
                          color: #333;
                          flex: 1 0;
                          &>p {
                            margin-top: 4px;
                            font-size: 12px;
                            color: #999;
                          }
                        }
                        .msg-handler {
                          position: relative;
                          width: 100px;
                          text-align: right;
                          img {
                            margin-right: 26px;
                          }
                          .drop-menu-wraper {
                            .drop-menu {
                              position: absolute;
                              top: 40%;
                              right: 0;
                              z-index: 10;
                              padding: 10px 0 5px;
                              margin: 5px 0;
                              margin-top: 5px;
                              background-color: #fff;
                              border: 1px solid #ebeef5;
                              border-radius: 4px;
                              box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                              max-height: 400px;
                              overflow: auto;
                              opacity: 0;
                              transform: scaleY(0);
                              transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
                              transform-origin: center top;
                              &.fade-in-active {
                                opacity: 1;
                                transform: scaleY(1);
                                transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
                                transform-origin: center top;
                              }
                              &.fade-out-active {
                                opacity: 0;
                                transform: scaleY(0);
                              }
                              .drop-menu__item {
                                line-height: 36px;
                                padding: 0 20px;
                                margin: 0;
                                font-size: 14px;
                                color: #606266;
                                cursor: pointer;
                                outline: none;
                                align-items: center;
                                display: flex;
                                &:hover {
                                  background-color: #ecf5ff;
                                  color: #66b1ff;
                                }
                                &:last-of-type {
                                  border-top: 1px solid #ebeef5;
                                }
                              }
                            }
                          }
                        }
                      }
                      .msg-body {
                        margin-bottom: 15px;
                        display: flex;
                        max-height: 115px;
                        overflow: hidden;
                        .msg-body__content {
                          width: 75%;
                          position: relative;
                          // &::after {
                          //   content: "...";
                          //   position: absolute;
                          //   width: 222px;
                          //   height: 23px;
                          //   background: #fff;
                          //   top: 99px;
                          //   right: 0;
                          //   z-index: 0;
                          // }
                          p {
                            color: #666;
                            font-size: 14px;
                          }
                        }
                        .msg-body__content-icon {
                          width: 25%;
                          text-align: center;
                          img {
                            width: 194px;
                            height: 110px;
                          }
                        }
                      }
                      .msg-footer {
                        color: #999;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .blogView {
      h4 {
        font-size: 18px;
        color: #333;
        font-weight: bolder;
        small {
          margin-left: 10px;
          color: #eb6100;
          font-size: 12px;
        }
        margin-bottom: 15px;
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
    .ue_wrap {
      margin: 0 auto;
      background: #fff
    }
  }
</style>