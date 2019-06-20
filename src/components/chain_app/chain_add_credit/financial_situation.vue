<template>
  <div id="financial_situation">
    <div class="list">
      <h3 class="title">企业财务信息</h3>
      <div class="content_situa">
        <div class="details"  v-if='blogList.length !== 0' v-for="(item, index) in blogList" :key='index'>
          <div class="blog_line">
            <div class="title_top">
              <div class="title">
                <div><h3>{{item.group_title}}</h3></div>
                <div><span>所属时间：<a href="#">{{item.dates}}</a></span></div>
                <div><span>来源：<a href="#">{{item.business_name}}</a></span></div>
                <div><span><a href="#">{{item.create_time}}</a></span></div>
              </div>
            </div>
          </div>
          <div class="pic_img" v-html="item.body">
          </div>
        </div>
        <p v-if="blogList.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="../../../../static/img/tops.png" alt="">Oops！空空如也... ...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'financialSituation',
  data () {
    return {
      company_id: '',
      currPage1: 1,
      total1: '',
      page_size1: '',
      pageSize1: 5,
      // 财务状况
      btnList: [],
      blogList: [],
      dialogGround: false,
      btnActive: -1,
      isActive: true,
      finanId: '',
      detailsList: {
        group_title: '',
        dates: '',
        business_name: '',
        create_time: '',
        body: ''
      }
    }
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
    // 分组
    that.$ajax.get(`/api/home_page/` + that.company_id + `/financial_situation_group/` + '?business_id=' + that.company_id).then(res => {
      that.btnList = res.data
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    // 查看财务状况
    that.$ajax.get(`/api/home_page/` + that.company_id + `/financial_situation/`).then(res => {
      that.blogList = res.data.results
      that.total1 = res.data.count
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    handleClose () {
      this.dialogGround = false
    },
    // 财务状况------查看
    downList (item) {
      var that = this
      // 查看财务状况详情
      that.$ajax.get(`/api/home_page/` + that.company_id + `/financial_situation/` + item.id).then(res => {
        that.detailsList = res.data
        that.dialogGround = true
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // -财务状况------查看某个分组下的内容
    btnSelect (item, index) {
      var that = this
      that.btnActive = index
      that.isActive = false
      this.currPage1 = 1
      that.finanId = item.id
      // 查看财务状况
      that.$ajax.get(`/api/home_page/` + that.company_id + `/financial_situation/` + '?page=' + that.currPage1 + '&page_size=' + that.pageSize1 + '&group_id=' + item.id).then(res => {
        that.blogList = res.data.results
        that.total1 = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 财务状况--------查看全部
    onlyList () {
      var that = this
      that.isActive = true
      this.currPage1 = 1
      that.btnActive = -1
      // 查看财务状况
      that.$ajax.get(`/api/home_page/` + that.company_id + `/financial_situation/` + '?page=' + that.currPage1 + '&page_size=' + that.pageSize1).then(res => {
        that.blogList = res.data.results
        that.total1 = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 财务状况--------分页
    handleSizeChange1 (val) {
      var that = this
      this.currPage1 = val
      // 查看财务状况
      that.$ajax.get(`/api/home_page/` + that.company_id + `/financial_situation/` + that.finanId + '?page=' + that.currPage1 + '&page_size=' + that.pageSize1).then(res => {
        that.blogList = res.data.results
        that.total1 = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
#financial_situation {
  .list {
    width: 100%;
    height: auto;
    margin: 20px 30px;
    .title {
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(51,51,51,1);
      padding-bottom: 19px;
    }
    .content_situa {
      background:#fff;
      padding: 20px 30px;
    }
    .button_list {
      // margin-top: 11px;
      max-height: 137px;
      padding: 11px 0;
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
          right: 4px;
          top: -5px;
          color: #f23c3c;
          cursor: pointer;
        }
        .one {
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
          height: auto;
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
            height: auto;
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
.list_btn {
  cursor: pointer;
}
</style>
