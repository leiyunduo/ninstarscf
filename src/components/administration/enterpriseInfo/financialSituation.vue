<template>
  <div class='financialSituation'>
    <div class="forms">
      <div class="flex_style">
        <div class="top_btn">
          <!-- <button @click='updateBlog'>发布</button> -->
          <div class="card_title">
            <h3>企业财务状况</h3>
            <button @click="updateBlog">添加财务单</button>
          </div>
        </div>
        <div class="button_list">
          <button class="only" :class="{active: isActive}" @click="onlyList">全部</button>
          <div class="no_del" v-for="(item, index) in btnList" :key="index">
            <i class="el-icon-remove" v-if='exitGroud' @click="deleteGround(item, index)"></i>
            <input class="one" v-model="item.title" :disabled='disableds' :class="{btnActive: btnActive === index}" @input="inputGroup(item, index)" @click="btnSelect(item, index)">
          </div>
          <input type="text" v-model="title" maxlength="6" v-if='installGrouds'>
          <button class="ones" v-if='exitGroud' @click="installGroud"><i class="el-icon-plus"></i></button>
          <button class="ones" v-if='exitGroud' @click="cancelGroud">取消</button>
          <button class="ones" v-if='exitGroud' @click="addGroud">保存</button>
          <button class="two" v-if='exitGrouds' @click="exitGroudClick">编辑分组</button>
        </div>
        <div class="box_list">
          <div class="blog_line" v-for="(item, index) in blogList" :key='index'>
            <div class="title_top">
              <div class="title">
                <div><h3>{{item.group_title}}</h3></div>
                <div><span>所属时间：<a href="#">{{item.dates}}</a></span></div>
                <div><span>来源：<a href="#">{{item.business_name}}</a></span></div>
                <div><span><a href="#">{{item.create_time}}</a></span></div>
              </div>
              <!-- <el-popover placement="bottom" width="52" trigger="click">
                <div class="list_btn">
                  <span v-for="(item1, index1) in btnFinancia" :key="index1" @click="downList(item, index1)">{{item1}}</span>
                </div>
                <i class="el-icon-arrow-down" slot="reference"></i>
              </el-popover> -->
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
          <div class="block" style="margin-bottom: 30px;">
            <el-pagination v-if="total" @current-change="handleSizeChange"
              :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          <div class="blog_line" v-if="blogList.length === 0" style="text-align:center; line-height:120px; color: #999; height: 400px;">暂无数据</div>
        </div>
        <el-dialog :visible.sync="dialogVisibleNews" title="提示" width="25%" :before-close="handleClose">
          <div class="box_lists">
            <h3>确定删除么？</h3>
            <div class="list">
              <button class="cancel" @click="newCancel">取消</button>
              <button class="prese" @click="newPreservation">确定</button>
            </div>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisibleGround" title="提示" width="25%" :before-close="handleClose">
          <div class="box_lists">
            <span>确定删除<a href="#">{{nameGround.title}}</a>分组么？</span>
            <p>确认后该组内容将被全部删除</p>
            <div class="list">
              <button class="cancel" @click="dialogVisibleGround = false">取消</button>
              <button class="prese" @click="GroundOK">确定</button>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'blog',
      blogList: [],
      dialogVisibleNews: false,
      // 分页
      currPage: 1,
      total: '',
      page_size: '',
      pageSize: 5,
      // 不可删除分组
      // buttonNO: ['资产负债表', '利润表', '现金流水表', '银行流水表'],
      btnActive: -1,
      disableds: true,
      isActive: true,
      exitGroud: false,
      exitGrouds: true,
      title: '',
      installGrouds: false,
      btnList: [],
      dialogVisibleGround: false,
      nameGround: {
        id: '',
        title: ''
      },
      btnFinancia: ['查看', '编辑', '删除'],
      // 查看详情
      dialogGround: false,
      detailsList: {
        group_title: '',
        body: '',
        create_time: '',
        business_name: '',
        dates: ''
      },
      dialogVisibleGroundList: false,
      idList: '',
      // 修改分组
      group_id: '',
      group_title: '',
      group_index: ''
    }
  },
  mounted () {
    var that = this
    // 分组
    that.$ajax.get('/api/home_page/financial_situation_group/').then(res => {
      that.btnList = res.data
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    // 查看财务状况
    that.$ajax.get(`/api/home_page/financial_situation/` + '?page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
      that.blogList = res.data.results
      that.total = res.data.count
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 编辑分组
    exitGroudClick () {
      this.exitGroud = true
      this.exitGrouds = false
      this.disableds = false
    },
    // 查看、编辑、删除
    downList (item, index) {
      var that = this
      that.idList = item.id
      if (index === 0) {
        // 查看财务状况详情
        that.$ajax.get(`/api/home_page/financial_situation/` + item.id).then(res => {
          that.dialogGround = true
          that.detailsList = res.data
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 1) {
        that.$router.push({
          path: '/blogEditor',
          query: {
            type: 1,
            id: item.id,
            ids: item.group_id
          }
        })
      } else if (index === 2) {
        that.dialogVisibleGroundList = true
      }
    },
    // 删除
    delGroundList () {
      var that = this
      // 删除财务状况
      that.$ajax.delete(`/api/home_page/financial_situation/` + that.idList + '/').then(res => {
        that.$message.success('删除成功！')
        that.dialogVisibleGroundList = false
        that.isActive = false
        that.btnActive = -1
        // 查看财务状况
        that.$ajax.get(`/api/home_page/financial_situation/` + '?page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.blogList = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 查看某个分组下的内容
    btnSelect (item, index) {
      var that = this
      console.log(index)
      that.group_index = index
      if (that.exitGroud === false) {
        that.btnActive = index
        that.isActive = false
        this.currPage = 1
        // 查看财务状况
        that.$ajax.get(`/api/home_page/financial_situation/?group_id=` + item.id + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.blogList = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    inputGroup (item, index) {
      var that = this
      that.group_id = item.id
      that.group_title = item.title
    },
    // 查看全部
    onlyList () {
      var that = this
      that.isActive = true
      that.btnActive = -1
      that.currPage = 1
      // 查看财务状况
      that.$ajax.get(`/api/home_page/financial_situation/` + '?page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
        that.blogList = res.data.results
        that.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
    })
    },
    // 添加分组
    installGroud () {
      this.installGrouds = true
      this.title = ''
      this.isActive = false
    },
    // 删除分组
    GroundOK () {
      var _this = this
      _this.$ajax.delete(`/api/home_page/financial_situation_group/` + _this.nameGround.id + '/').then(res => {
        _this.$message.success('删除成功!')
        _this.dialogVisibleGround = false
        _this.installGrouds = false
        _this.exitGroud = false
        _this.exitGrouds = true
        _this.isActive = true
        _this.btnActive = -1
        _this.$ajax.get('/api/home_page/financial_situation_group/').then(res => {
          _this.btnList = res.data
        }).catch(err => {
          _this.$message.error(err.response.data.err_msg)
        })
        // 查看财务状况
        _this.$ajax.get(`/api/home_page/financial_situation/` + '?page=' + _this.currPage + '&page_size=' + _this.pageSize).then(res => {
          _this.blogList = res.data.results
          _this.total = res.data.count
        }).catch(err => {
          _this.$message.error(err.response.data.err_msg)
        })
      }).catch(err => {
        _this.$message.error(err.response.data.err_msg)
      })
    },
    // 删除分组
    deleteGround (item, index) {
      var that = this
      if (index !== 0 && index !== 1 && index !== 2 && index !== 3) {
        that.nameGround = item
        that.dialogVisibleGround = true
      }
    },
    // 添加分组-保存
    addGroud () {
      var that = this
      if (that.title === '') {
        if (that.group_index !== 0 && that.group_index !== 1 && that.group_index !== 2 && that.group_index !== 3) {
          that.$ajax.put(`/api/home_page/financial_situation_group/` + that.group_id + '/', {title: that.group_title}).then(res => {
            that.installGrouds = false
            that.exitGroud = false
            that.exitGrouds = true
            that.$message.success('修改成功')
            that.$ajax.get('/api/home_page/financial_situation_group/').then(res => {
              that.btnList = res.data
              that.title = ''
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else {
          that.$message.error('不能更改此分组名称')
        }
      } else {
        that.$ajax.post('/api/home_page/financial_situation_group/', {title: that.title}).then(res => {
          that.installGrouds = false
          that.exitGroud = false
          that.exitGrouds = true
          that.$ajax.get('/api/home_page/financial_situation_group/').then(res => {
            that.btnList = res.data
            that.$message.success('添加成功')
            that.title = ''
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 取消
    cancelGroud () {
      var that = this
      that.installGrouds = false
      that.exitGroud = false
      that.exitGrouds = true
      that.$ajax.get('/api/home_page/financial_situation_group/').then(res => {
        that.btnList = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    selectNews (index, item) {
      var that = this
      that.$router.push({
        path: '/news',
        query: {
          id: item.id,
          type: 1
        }
      })
    },
    handleClose () {
      this.dialogVisibleNews = false
      this.dialogVisibleGround = false
      this.dialogGround = false
      this.dialogVisibleGroundList = false
    },
    // 删除新闻
    newPreservation () {
      var that = this
      that.$ajax.delete('/api/manage/business/news/?token=' + that.$token() + '&news_id=' + that.newId).then(res => {
        if (res.data.code === '1') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 新闻详情
          this.$ajax.get('/api/manage/business/news/?token=' + this.$token() + '&n_type=2' + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
            if (res.data.code === '1') {
              this.blogList = res.data.data
              this.total = res.data.count
              this.dialogVisibleNews = false
            }
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    newCancel () {
      this.dialogVisibleNews = false
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    },
    deleteNews (index, item) {
      var that = this
      that.dialogVisibleNews = true
      that.newId = item.id
    },
    // 分页
    handleSizeChange (val) {
      var that = this
      this.currPage = val
      // 查看财务状况
      that.$ajax.get(`/api/home_page/financial_situation/` + '?page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
        that.blogList = res.data.results
        that.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 添加表单
    updateBlog: function () {
      var that = this
      that.$router.push({
        path: '/blogEditor',
        query: {
          type: 1
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
.financialSituation {
  width: 100%;
  min-height: 100%;
  padding: 0 15px;
  .flex_style {
    display: flex;
    flex-direction: column;
    width: auto;
    .button_list {
      margin-top: 11px;
      max-height: 137px;
      padding: 15px 0;
      overflow-y: auto;
      .only {
        float: left;
        background:#f1f1f1;
        border-radius:4px;
        width:130px;
        padding: 0 12px;
        height:28px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#666666;
        letter-spacing:0;
        margin-right: 11px;
        border: none;
        outline: none;
        margin-top: 15px;
        margin-left: 10px;
      }
      .only:hover {
        border: none;
        background:#f48537;
        border-radius:4px;
        width:130px;
        padding: 0 12px;
        height:28px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#fff;
        letter-spacing:0;
      }
      .active {
        border: none;
        background:#f48537;
        border-radius:4px;
        width:130px;
        padding: 0 12px;
        height:28px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#fff;
        letter-spacing:0;
      }
      .no_del {
        float: left;
        position: relative;
        .el-icon-remove {
          position: absolute;
          right: 5px;
          top: 9px;
          color: #f23c3c;
          cursor: pointer;
        }
        .one {
          background:#f1f1f1;
          border-radius:4px;
          width:130px;
          text-align: center;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#666666;
          letter-spacing:0;
          margin-right: 11px;
          border: none;
          outline: none;
          border: none;
          outline: none;
          cursor: pointer;
        }
        .one:hover {
          border: none;
          background:#f48537;
          border-radius:4px;
          width:130px;
          padding: 0 12px;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#fff;
          letter-spacing:0;
        }
        .btnActive {
          border: none;
          background:#f48537;
          border-radius:4px;
          width:130px;
          padding: 0 12px;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#fff;
          letter-spacing:0;
        }
      }
      .no_del:nth-child(1) {
        .el-icon-remove {
          color: #666;
        }
      }
      .no_del:nth-child(2) {
        .el-icon-remove {
          color: #666;
        }
      }
      .no_del:nth-child(3) {
        .el-icon-remove {
          color: #666;
        }
      }
      .no_del:nth-child(4) {
        .el-icon-remove {
          color: #666;
        }
      }
      .no_del:nth-child(5) {
        .el-icon-remove {
          color: #666;
        }
      }
      input {
        float: left;
        border:1px solid #e7e7e7;
        border-radius:4px;
        min-width:100px;
        height:28px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#666666;
        letter-spacing:0;
        background: none;
        outline: none;
        padding: 0 12px;
        margin: 15px 10px 0;
      }
      .ones {
        margin-top: 15px;
        background:#f1f1f1;
        float: left;
        border-radius:4px;
        width:130px;
        height:28px;
        margin-right: 11px;
        border: none;
        outline: none;
        font-family:AppleColorEmoji;
        font-size:12px;
        color:#999999;
      }
      .ones:hover {
        border: none;
        background:#f48537;
        border-radius:4px;
        width:130px;
        height:28px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#fff;
        letter-spacing:0;
      }
      .two {
        border:1px solid #e7e7e7;
        border-radius:4px;
        width:130px;
        height:28px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#666666;
        letter-spacing:0;
        background: none;
        outline: none;
        margin-top: 15px;
        margin-left: 10px;
      }
    }
    .top_btn {
      width: 100%;
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
          color: #fff;
          border:1px solid #f48537;
          outline: none;
          margin: 0;
          background: #f48537;
          border-radius: 4px;
          width: 85px;
          height: 28px;
        }
        button:hover {
          border:1px solid #f48537;
          color: #f48537;
          background: #fff;
        }
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
    .box_list2 {
      position: relative;
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
}
.pic {
  img {
    width: 130px;
    height: 115px;
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
.el-tooltip__popper {
  margin-top: 0;
}
</style>