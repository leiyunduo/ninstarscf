<template>
  <div class="finance-report-wraper">
    <div class="finance-report">
      <div class="tag-groups-wraper">
        <div class="tag-groups">
          <div class="btn-list">
            <div class="btn-list__item btn-label">所属类目:</div>
            <div class="btn-list__item" @click="changeTab($event, item, index)" @mouseenter="onOver(index)" @mouseleave="onOut(index)" :class="tabIndex === index ? 'btn-actived' : 'btn-info'" v-for="(item, index) in btnList" :key="index">
              <span>{{item.title}}</span><i @click="handleCloseT($event, item)" v-if="index >= 5" class="suffix ns-iconfont" :class="hoverIndex === index ? 'ns-icon-close-circle' : 'icon-close'"></i>
            </div>
            <div v-show="!isAdd" @click="showInput" class="btn-list__item btn-info">
              <i class="prefix ns-iconfont ns-icon-plus"></i><span>新 增</span>
            </div>
            <div v-show="isAdd" class="handler-editor">
              <input id="editor" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" v-model="inputValue" type="text">
            </div>
          </div>
        </div>
      </div>
      <div class="content-wraper">
        <div class="content-view">
          <div class="box_list" v-if="blogList.length">
            <div class="blog_line" v-for="(item, index) in blogList" :key='index'>
              <div class="title_top">
                <div class="title">
                  <div><h3>{{item.group_title}}</h3></div>
                  <div><span>所属时间：<a href="#">{{item.dates}}</a></span></div>
                  <div><span>来源：<a href="#">{{item.business_name}}</a></span></div>
                  <div><span><a href="#">{{item.create_time}}</a></span></div>
                </div>
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">
                    <div class="list_btn">
                      <span v-for="(item1, index1) in btnFinancia" :key="index1" @click="downList(item, index1)">{{item1}}</span>
                    </div>
                  </div>
                  <div class="el_div_button">
                    <el-button><i class="el-icon-arrow-down"></i></el-button>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
          <span v-else class="content-null">暂无内容</span>
        </div>
        <div class="block">
          <el-pagination v-if="total" @current-change="handleSizeChange"
            :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogGround" width="60%" :before-close="handleClose">
      <div class="details">
        <div class="blog_line">
          <div class="title_top">
            <div class="title">
              <div><h3>{{detailsList.group_title}}</h3></div>
              <div><span>所属时间：<a href="#">{{detailsList.dates}}</a></span></div>
              <div><span>来源：<a href="#">{{detailsList.business_name}}</a></span></div>
              <div><span><a href="#">{{detailsList.create_time}}</a></span></div>
            </div>
          </div>
        </div>
        <div class="pic_img" v-html="detailsList.body">
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleGroundList" title="提示" width="25%" :before-close="handleClose">
      <div class="box_lists">
        <span>确定删除么？</span>
        <div class="list">
          <button class="cancel" @click="dialogVisibleGroundList = false">取消</button>
          <button class="prese" @click="delGroundList">确定</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisiblesblog" width="80%" :before-close="handleClose">
      <edit ref="edit" v-if="dialogVisiblesblog" @editState="editState" :types="editType" :id="Number(blogId)"/>
    </el-dialog>
  </div>
</template>

<script>
  import edit from '../blog/editor'
  export default {
    name: '',
    data () {
      return {
        btnList: [{id: -100, title: '全部'}],
        inputVisible: false,
        inputValue: '',
        tabIndex: 0,
        hoverIndex: 0,
        currPage: 1,
        total: '',
        pageSize: 5,
        blogList: [],
        btnFinancia: ['查看', '编辑', '删除'],
        idList: '',
        dialogGround: false,
        detailsList: {
          group_title: '',
          body: '',
          create_time: '',
          business_name: '',
          dates: ''
        },
        dialogVisibleGroundList: false,
        dialogVisiblesblog: false,
        editType: -1,
        blogId: 0,
        isAdd: false,
        currentId: ''
      }
    },
    components: {
      edit
    },
    props: ['alive'],
    mounted () {
      this.$ajax.get('/api/home_page/financial_situation_group/').then(res => {
        this.btnList = [...this.btnList, ...res.data]
      }).catch(err => {
        this.$message.error(err.response.data.err_msg)
      })
      // 默认获取所有信息
      this.getFinancialAll(this.currPage)
    },
    methods: {
      onOver (index) {
        if (index <= 4) return
        this.hoverIndex = index
      },
      onOut (index) {
        if (index <= 4) return
        this.hoverIndex = 0
      },
      addNews () {
        this.dialogVisiblesblog = true
        this.editType = 1
      },
      editState (e) {
        if (e === 'success' || e === 'error') {
          this.dialogVisiblesblog = false
          if (this.tabIndex === 0) this.getFinancialAll(this.currPage)
          else this.getFinancialById(this.currentId)
        }
      },
      // 删除
      delGroundList () {
        var that = this
        // 删除财务状况
        that.$ajax.delete(`/api/home_page/financial_situation/` + that.idList + '/').then(res => {
          that.$message.success('删除成功！')
          that.dialogVisibleGroundList = false
          // 查看财务状况
          this.getFinancialAll(this.currPage)
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      },
      // 查看、编辑、删除
      downList (item, index) {
        var that = this
        if (index === 0) {
          // 查看财务状况详情
          that.$ajax.get(`/api/home_page/financial_situation/` + item.id).then(res => {
            that.dialogGround = true
            that.detailsList = res.data
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 1) {
          that.dialogVisiblesblog = true
          that.editType = 1
          that.blogId = item.id
        } else if (index === 2) {
          that.dialogVisibleGroundList = true
          that.idList = item.id
        }
      },
      handleSizeChange (e) {
        this.currPage = e
        this.getFinancialAll(this.currPage)
      },
      changeTab (e, item, index) {
        e.stopPropagation()
        this.tabIndex = index
        this.currentId = item.id
        if (index === 0) this.getFinancialAll(1)
        else this.getFinancialById(item.id)
      },
      handleClose() {
        this.dialogVisibleGroundList = false
        this.dialogGround = false
        this.dialogVisiblesblog = false
      },
      handleCloseT (e, obj) {
        e.stopPropagation()
        this.$ajax.delete(`/api/home_page/${localStorage.id}/financial_situation_group/${obj.id}`).then(res => {
          this.btnList = this.btnList.filter(tag => tag.id !== obj.id)
        })
      },
      showInput() {
        this.isAdd = true
        this.$nextTick(_ => {
          document.getElementById('editor').focus()
        })
      },
      handleInputConfirm() {
        let inputValue = this.inputValue
        if (!inputValue) {
          this.isAdd = false
          return
        }
        this.$ajax.post(`/api/home_page/${localStorage.id}/financial_situation_group/`, {title: inputValue}).then(res => {
          let newTag = {
            title: inputValue,
            id: res.data.id
          }
          this.btnList.push(newTag)
        })
        this.isAdd = false
        this.inputValue = ''
      },
      getFinancialAll (currPage) {
        // 查看财务状况
        this.$ajax.get(`/api/home_page/${localStorage.id}/financial_situation/` + '?page=' + currPage + '&page_size=' + this.pageSize).then(res => {
          this.blogList = res.data.results
          this.total = res.data.count
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      getFinancialById (id) {
        this.$ajax.get(`/api/home_page/` + localStorage.id + `/financial_situation/` + '?page=' + this.currPage + '&page_size=' + this.pageSize +'&group_id='+ id).then(res => {
          this.blogList = res.data.results
          this.total = res.data.count
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      }
    }
  }
</script>
<style lang='less' scope>
  .list_btn {
    span {
      cursor: pointer;
      display: block;
      font-family:PingFangSC-Regular;
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
    padding-right: 10px;
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
  .details {
    height: auto;
    padding: 20px;
    .blog_line {
      height: 40px;
      background: #fff;
      border: 1px solid #e7ebee;
      margin-bottom: 30px;
      overflow: hidden;
      .title_top {
        height: 40px;
        display: flex;
        line-height: 40px;
        flex-direction: row;
        border-bottom: 1px solid #e7ebee;
        i {
          cursor: pointer;
        }
        span {
          font-family:PingFangSC-Regular;
          font-size:10px;
          color:#999999;
          letter-spacing:0;
          text-align:left;
          a {
            font-family:PingFangSC-Regular;
            font-size: 12px;
            color:#eb6100;
            letter-spacing:0;
            text-align:left;
            text-decoration: none;
          }
        }
      }
      .title {
        flex: 1;
        text-align: left;
        padding-left: 32px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        h3 {
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#333333;
          letter-spacing:0;
          text-align:left;
        }
        div {
          padding-right: 30px;
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
    }
    .pic_img {
      height: auto;
      margin-top: 20px;
    }
  }
  .finance-report-wraper {
    margin: 21px;
   .finance-report {
     .tag-groups-wraper {
       padding: 5px 0;
       .tag-groups {
         .btn-list {
          display: flex;
          flex-wrap: wrap;
            .handler-editor {
              &>input {
                width: 120px;
                margin-left: 18px;
              }
            }
            .btn-list__item {
              padding: 0px 25px 0 15px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
              text-align: center;
              user-select: none;
              height: 26px;
              line-height: 26px;
              margin-left: 18px;
              margin-bottom: 14px;
              box-sizing: content-box;
              position: relative;
              &>.suffix {
                display: inline-block;
                position: absolute;
                font-size: 14px;
                right: 5px;
              }
              .prefix {
                font-size: 14px;
              }
              &:first-of-type {
                margin-left: 0;
                padding-left: 0;
                padding-right: 10px;
              }
              &.btn-actived {
                background: linear-gradient(90deg,rgba(235,97,0,1) 0%,rgba(239,129,51,1) 100%);
                box-shadow: 0px 2px 4px 0px rgba(235,97,0,0.4);
                color: #fff;
                border: 1px solid transparent;
                &:hover {
                  .ns-tab-hover(#eb6100, bg)
                }
                &:active {
                  .ns-tab-active(#eb6100, bg)
                }
              }
              &.btn-info {
                background-color: rgba(144,147,153,.1);
                border: 1px solid rgba(144,147,153,.2);
                color: #909399;
                transition: color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
              }
              &.btn-label {
                background: #fff;
                color: #666;
              }
           }
         }
       }
     }
     .content-wraper {
      position: relative;
      padding-bottom: 80px;
      &>.block {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        bottom: 40px;
      }
      .content-view {
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
         .box_list {
          margin-top: 30px;
          margin-right: 27px;
          position: relative;
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
            height: 40px;
            background: #fff;
            border: 1px solid #e7ebee;
            margin-bottom: 30px;
            overflow: hidden;
            .title_top {
              height: 40px;
              display: flex;
              line-height: 40px;
              flex-direction: row;
              border-bottom: 1px solid #e7ebee;
              i {
                cursor: pointer;
              }
              span {
                font-family:PingFangSC-Regular;
                font-size:10px;
                color:#999999;
                letter-spacing:0;
                text-align:left;
                a {
                  font-family:PingFangSC-Regular;
                  font-size:10px;
                  color:#eb6100;
                  letter-spacing:0;
                  text-align:left;
                  text-decoration: none;
                }
              }
            }
            .title {
              flex: 1;
              text-align: left;
              padding-left: 32px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              cursor: pointer;
              display: flex;
              flex-direction: row;
              h3 {
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#333333;
                letter-spacing:0;
                text-align:left;
              }
              div {
                padding-right: 30px;
              }
              div:nth-child(1) {
                width: 130px;
              }
              div:nth-child(2) {
                width: 150px;
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
              }
              .body_list::-webkit-scrollbar{
                display: none;
              }
            }
          }
        }
       }
     }
   } 
  }
</style>