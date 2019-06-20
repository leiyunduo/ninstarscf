<template>
  <div class='financialBlog'>
    <div class="top_location">
      <location :location="location"></location>
    </div>
    <div class='info-enter'>
      <div class="blog_header">
        <div class="blog_header_top">
          <div class="blog_header_top_left">
            <!-- <img src="../../../../static/img/img.png" alt=""> -->
            <img :src="showIcon(enterList.avatar)" alt="">
          </div>
          <div class="blog_header_top_right" v-if="companyInformation.detail_info">
            <h4>{{ companyInformation.detail_info.name }}
            <div class="c_verify_bg"></div></h4>
            <div class="blog_header_bottom">
              <!-- <button @click="addFriend" :disabled='disabled' class="over">加商友</button> -->
              <button>申请成为客户</button>
            </div>
            <ul>
              <li>
                <p>电话：<span>{{ companyInformation.detail_info.contact_info.phone }}</span><span v-if="companyInformation.detail_info.contact_info.phone === ''">暂无数据</span></p>
              </li>
              <li>
                <p>邮箱：<span>{{ companyInformation.detail_info.contact_info.email }}</span><span v-if="companyInformation.detail_info.contact_info.email === ''">暂无数据</span></p>
              </li>
            </ul>
            <ul>
              <li>
                <p>网址：<span>{{ companyInformation.detail_info.contact_info.fax }}</span><span v-if="companyInformation.detail_info.contact_info.fax === ''">暂无数据</span></p>
              </li>
              <li>
                <p>地址：
                  <el-tooltip class="item" effect="dark" :content="companyInformation.detail_info.contact_info.address" placement="top-start">
                    <span>{{companyInformation.detail_info.contact_info.address}}</span>
                  </el-tooltip>
                  <span v-if="companyInformation.detail_info.contact_info.address === ''">暂无数据</span>
                </p>
              </li>
            </ul>
            <!-- <div class="over_hide">
              <p>简介：</p>
                <span>{{ companyInformation.company_profile }}</span>
                <span v-if="companyInformation.company_profile === null">暂无数据</span>
                <button @click="detailsList">详情</button>
            </div> -->
          </div>
        </div>
      </div>
      <div class="list_ul">
        <ul>
          <li v-for="(item, index) in listTitle" :key="index" :class="{active_li: activeShow === index}" @click="listClick(index)"><span>{{item}}</span></li>
        </ul>
      </div>
      <!-- 工商信息 -->
      <div class="table_list" v-if="activeShow === 0">
        <h3>银行认证</h3>
        <table class="c_info_table" border="1">
          <tr style="height: 42px; line-height: 42px;">
            <td colspan="2" class="gray">法人信息</td>
            <td colspan="2" class="gray c_reg_td">注册信息</td>
          </tr>
          <tr style="height: 138px;">
            <td colspan="2" class="c_legal_person_info">
              <div class="c_legal_td_top">
                <img src="../../../../static/img/boss.png" alt="法人">
                <div class="c_legal_info" v-if="companyInformation.legal_person_info">
                  <h4>{{ companyInformation.legal_person_info.name }}</h4>
                </div>
              </div>
            </td>
            <td colspan="2" class="c_reg_info">
              <p>
                <span>注册资本</span>
                <span>{{ companyInformation.register_assets }}</span>
                <span v-if="companyInformation.register_assets === null">暂无数据</span>
              </p>
            </td>
          </tr>
          <tr>
            <td class="gray">登记机关</td>
            <td class="c_no">
              <span class="blue">{{ companyInformation.belong_org }}</span>
              <span v-if="companyInformation.belong_org === null">暂无数据</span>
            </td>
            <td class="gray">注册地址</td>
            <td class="c_credit_code">
              <span>{{ companyInformation.address }}</span>
              <span v-if="companyInformation.address === null">暂无数据</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="new_list" v-if="activeShow === 2">
        <h3>新闻公告中心</h3>
        <ul>
          <li v-for="(item, index) in newsList" :key="index" @click="selectNews(index, item)">
            <div class="pic_img">
              <div class="pic" v-if="item.pic !== null" v-html="item.pic"></div>
              <img class="pic" src="../../../../static/img/news.png" v-if="item.pic === null" alt="">
            </div>
            <div>
              <span>{{ item.title }}</span>
              <span>{{ item.post_time }}</span>
              <p class="body_list" v-html="item.body"></p>
            </div>
          </li>
          <!-- <li v-if="newsList.length === 0">暂无数据</li> -->
        </ul>
        <p v-if="newsList.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="../../../../static/img/tops.png" alt="">Oops！空空如也... ...</p>
        <el-pagination v-if="total" @current-change="handleSizeChange"
          :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <div class="img_list" v-if="activeShow === 1">
        <h3>荣誉资质</h3>
        <ul class="item_wrap">
          <li v-for="(item, index) in imgUrl" :key="index">
            <div class="item_t">
              <img :src="$root_url() + item.picture" alt="1" @click="imgLists(item, index)">
            </div>
            <!-- <div class="item_b">
              <h4 :title="item.title">{{ item.title }}</h4>
            </div> -->
          </li>
          <!-- <li v-if="imgUrl.length === 0">暂无数据</li> -->
          <li v-if="imgUrl.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="../../../../static/img/tops.png" alt="">Oops！空空如也... ...</li>
        </ul>
      </div>
      <div class="product" v-if="productShow">
        <div class="productMy_list">
          <ul>
            <li v-for="(item, index) in listName" :key="index" :class="[activeIndex === index ? 'active' : 'unactive']">
              <p @click="listNameClick(item, index)">{{item}}</p>
            </li>
          </ul>
        </div>
        <div v-for="(item, index) in tableData" :key="index">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="item.name" :name="index" style="padding-left: 20px;">
              <div class="productMy_tableList">
                <ul>
                  <li>
                    <p><a href="#">*</a>产品名称：</p>
                    <input type="text" v-model="item.name" maxlength="64" disabled>
                  </li>
                  <li>
                    <p><a href="#">*</a>产品简介：</p>
                    <textarea name="" id="" cols="120" rows="10" v-model="item.contents" disabled></textarea>
                  </li>
                  <li>
                    <p><a href="#">*</a>产品特点：</p>
                    <input type="text" v-model="item.properties" disabled>
                  </li>
                  <li>
                    <p><a href="#">*</a>申请条件：</p>
                    <input type="text" v-model="item.premise" maxlength="64" disabled>
                  </li>
                  <li>
                    <p><a href="#">*</a>适用地区：</p>
                    <input type="text" v-model="item.fie_area" maxlength="32" disabled>
                  </li>
                </ul>
                <div class="now">
                  <div class="list">
                    <p>额度：</p>
                    <input type="text" v-model="item.quota" maxlength="64" disabled>
                  </div>
                  <div class="list">
                    <p>贷款期限：</p>
                    <input type="text" v-model="item.term" maxlength="64" disabled>
                  </div>
                  <div class="list">
                    <p>月费率：</p>
                    <input type="text" v-model="item.rate" maxlength="128" disabled>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="nolist" v-if="tableData.length === 0">暂无数据</div>
      </div>
      <el-dialog title="荣誉资质" :visible.sync="outerVisible" width="45%" :before-close="handleClose">
        <img :src="$root_url() + url_img" alt="" style='width:100%; height:100%;padding:20px;'>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Location from '../../location/location'
export default {
  data () {
    return {
      roleId: '',
      listTitle: ['工商信息', '荣誉资质', '新闻公告'],
      listName: ['订单融资', '应收融资', '质押融资'],
      activeIndex: 0,
      activeShow: 0,
      activeNames: [],
      // 获取全部
      enterList: '',
      // 公司信息
      companyInformation: {
        name: '',
        phone: '',
        email: '',
        fax: '',
        address: '',
        company_profile: '',
        register_assets: '',
        year_founded: '',
        register_status: '',
        scope: '',
        no: '',
        credit_code: '',
        term_start: '',
        term_end: '',
        org_certificate_id: '',
        belong_org: '',
        institutional_type: '',
        trade: '',
        legal_person: {
          legal_person_name: ''
        }
      },
      // 荣誉资质
      imgUrl: '',
      // 新闻公告
      newsList: '',
      // 博客
      disabled: true,
      bid: '',
      fid: '',
      // 分页
      currPage: 1,
      total: '',
      page_size: '',
      pageSize: 5,
      types: '',
      tableData: [],
      // 产品信息
      productShow: false,
      outerVisible: false,
      url_img: ''
    }
  },
  components: {
    Location
  },
  beforeCreate () {
    var that = this
    that.bid = Number(that.$route.query.bid)
    if (localStorage.role === 'fund') {
      if (Number(that.$route.query.fType) === 1) {
        that.location = [
          { title: '我的助贷', url: '/myFund' },
          { title: '企业首页' }
        ]
      } else if (Number(that.$route.query.fType) === 2) {
        that.location = [
          { title: '我的助贷', url: '/myFund' },
          { title: '赔付申请', url: '/myFundList' },
          { title: '企业首页' }
        ]
      } else if (Number(that.$route.query.zType) === 1) {
        that.location = [
          { title: '我的债权', url: '/myClaims' },
          { title: '企业首页' }
        ]
      }
    } else {
      if (Number(that.$route.query.claim_app) === 0) {
      that.location = [
        { title: '我的债权/债务', url: '/claim_app' },
        { title: '企业首页' }
      ]
    } else {
        that.location = [
          { title: '我的客户', url: '/friendmanagement' }, 
          { title: '企业首页' }
        ]
      }
    }
  },
  mounted () {
    var that = this
    that.bid = Number(that.$route.query.bid)
    that.roles = localStorage.role
    // 查询博客信息
    that.$ajax.get(`/api/company/` + that.bid + '?detail_info=1').then(res => {
      // 获取全部
      this.enterList = res.data.avatar
      // 公司信息
      this.companyInformation = res.data
      // 自我评级
      this.selfAppraisal = res.data.detail_info.self_appraisal
    })
  },
  methods: {
    showIcon: function (url) {
      if (url) {
        if (url === '/static/default_avatar.png') {
          return 'static/img/tickets/default_business.png';
        } else {
          return this.$root_url() + url
        }
      } else {
        return 'static/img/tickets/default_business.png';
      }
    },
    // 荣誉资质图片关闭
    handleClose () {
      this.outerVisible = false
    },
    // 荣誉资质图片放大
    imgLists (item, index) {
      var that = this
      that.outerVisible = true
      // console.log(item, index)
      that.url_img = item.picture
    },
    // 博客跳转
    selectNews (index, item) {
      var that = this
      that.$router.push({
        path: '/blogNews',
        query: {
          id: item.id,
          indexId: 1,
          bid: that.bid,
          fid: that.fid,
          type: that.types
        }
      })
    },
    handleChange (val) {
      // console.log(val)
    },
    // 导航按钮
    listNameClick (item, index) {
      var that = this
      that.activeIndex = index
      that.$ajax.get('/api/blog/institution/product/?token=' + that.$token() + '&product_type=' + (index + 1) + '&institution_id=' + that.bid).then(res => {
        if (res.data.code === '1') {
          that.tableData = res.data.data
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      var that = this
      that.currPage = val
      that.$ajax.get(`/api/home_page/` + that.bid + `/news/` + '?page=' + that.currPage + '&page_size=' + that.pageSize).then(res => {
        // 新闻公告
        that.newsList = res.data.results
        that.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 添加商友
    addFriend () {
      var that = this
      that.$ajax.post('/api/application/', {token: that.$token(), acc_obj_id: that.fid}).then((res) => {
        if (res.data.code === '1') {
          this.$message({
            message: '添加成功，请等待对方同意',
            type: 'warning',
            duration: 2000
          })
        } else if (res.data.code === '-2') {
          this.$message({
            message: '该企业已是你的商友',
            type: 'warning',
            duration: 2000
          })
        }
      })
    },
    listClick (index) {
      var that = this
      that.activeShow = index
      if (index === 0) {
        // 查询博客信息
        that.$ajax.get(`/api/company/` + that.bid + '?detail_info=1').then(res => {
          // 获取全部
          this.enterList = res.data.avatar
          // 公司信息
          this.companyInformation = res.data
          // 自我评级
          this.selfAppraisal = res.data.detail_info.self_appraisal
        })
      } else if (index === 1) {
        that.$ajax.get(`/api/home_page/` + that.bid + `/honor/`).then(res => {
          // 荣誉资质
          that.imgUrl = res.data.results
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 2) {
        that.$ajax.get(`/api/home_page/` + that.bid + `/news/` + '?page=' + that.currPage + '&page_size=' + that.pageSize).then(res => {
          // 新闻公告
          that.newsList = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 详情
    detailsList () {
      this.$alert(this.companyInformation.company_profile, '公司简介', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>

<style lang='less' scoped>
.financialBlog {
  width: 100%;
  background: rgba(237, 241, 244, 1);
  min-height: 100%;
  //padding-top: 70px;
  .top_location {
    height: 60px;
    color: #666;
    line-height: 60px;
    padding-left: 170px;
  }
  .info-enter {
    background: #fff;
    // border: 1px solid #ccc;
    font-size: 14px;
    width: 1440px;
    margin: 0 auto;
    padding: 20px 30px;
    height: 100%;
    width: 100%;
    position: relative;
    .blog_header {
      position: relative;
      min-height: 180px;
      border-bottom: 1px solid #ccc;
      .blog_header_top {
        .blog_header_top_left {
          float: left;
          width: 148px;
          height: 148px;
          img {
            border-radius: 50%;
            width: 148px;
            height: 148px;
            border-radius: 50%;
          }
        }
        .blog_header_top_right {
          float: left;
          margin-left: 50px;
          width: 700px;
          h4 {
            line-height: 50px;
            font-size: 16px;
            font-weight: bold;
          }
          .c_verify_bg {
            width: 60px;
            height: 60px;
            background: url(../../../../static/img/authentication/auth.png);
            background-size: 100% 100%;
            position: absolute;
            top: 0;
            left: 450px;
          }
          ul {
            display: flex;
            li {
              flex: 1;
              line-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 30px;
              font-size: 14px;
              p {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 30px;
                font-size: 14px;
              }
            }
          }
          .over_hide {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 30px;
            font-size: 14px;
            width: 900px;
            display: flex;
            flex-direction: row;
            span {
              display: inline-block;
              width: 800px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              padding-left: 20px;
            }
            button {
              background: none;
              border: none;
              outline: none;
              position: absolute;
              right: 19%;
              bottom: 27px;
              color: #eb6100;
            }
          }
        }
      }
      .blog_header_bottom {
        position: absolute;
        right: 0;
        top: 10px;
        button {
          line-height: 30px;
          border: 1px solid #eb6100;
          color: #eb6100;
          width: auto;
          padding: 0 10px;
          background: none;
          border-radius: 5px;
          outline: none;
        }
        .over {
          background: #cccccc;
        }
      }
    }
    .list_ul {
      width: 100%;
      height: 54px;
      // padding-top: 111px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      ul {
        display: flex;
        height: 54px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        flex-direction: row;
        line-height: 54px;
        li {
          width: auto;
          padding: 0 20px;
          cursor: pointer;
          span {
            display: inline-block;
            width: 100%;
            height: 20px;
            // border-right: 1px solid #c2cbd0;
          }
        }
        .active_li {
          border-bottom: 2px solid #eb6100;
          color: #eb6100;
        }
      }
    }
    .table_list {
      height: 537px;
      padding-bottom: 50px;
      h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        margin-bottom: 30px;
        border-left: 5px solid #eb6100;
      }
      /* 表格 */
      .c_info_table{
        margin-top: 20px;
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }
      .gray{
        background: rgba(204,204,204,0.30);
      }
      .c_eb{
        color: #eb6100;
      }
      .c_info_table tr{
        height: 60px;
      }
      .c_info_table td{
        border: 1px solid #ccc;
        padding: 0 20px;
        vertical-align: middle;
        box-sizing: border-box;
      }
      td.gray{
        width: 167px;
        text-align: center;
        padding: 0;
        color: #666;
      }
      .c_legal_td_top{
        overflow: hidden;
        padding: 15px 0;
      }
      .c_legal_td_top img{
        border-radius: 50%;
        width: 62px;
        height: 62px;
        float: left;
      }
      .c_legal_person_info p{
        line-height: 30px;
      }
      .blue {
        color: blue;
      }
      .c_legal_td_top div{
        float: left;
        margin-left: 30px;
      }
      .c_legal_td_top div h4{
        color: #eb6100;
        font-size: 18px;
        line-height: 32px;
      }
      .c_info_table .c_reg_info{
        padding-left: 55px;
        box-sizing: border-box;
      }
      .c_reg_info p{
        line-height: 30px;
      }
      .c_reg_info p span:nth-of-type(1){
        margin-right: 60px;
        color: #666;
      }
      .c_reg_td{
        position: relative;
      }
      .c_reg_td span{
        text-decoration: underline;
        position: absolute;
        right: 20px;
        color: #eb6100;
        cursor: pointer;
      }
      .table_list_top {
        background: #fff;
        height: auto;
        -moz-box-shadow: 2px 2px 5px #c5c0c0, -2px -2px 5px #eaeaea;
        -webkit-box-shadow: 2px 2px 5px #c5c0c0, -2px -2px 5px #eaeaea;
        box-shadow: 2px 2px 5px #c5c0c0, -2px -2px 5px #eaeaea;
        .table_list_top_left {
          margin-bottom: 26px;
          .head {
            padding-left: 64px;
            color: #666666;
            height: 50px;
            line-height: 50px;
          }
          .bottom {
            height: 168px;
            border-bottom: 1px dashed #f5f7f8;
            width: 1140px;
            margin: 0 auto;
            padding-bottom: 30px;
            .bit_head {
              display: flex;
              flex-direction: row;
              img {
                width: 122px;
                height: 80px;
                margin: 30px 40px;
                border: 1px solid #f5f7f8;
              }
              div {
                padding-top: 30px;
                h2 {
                  font-size: 14px;
                  color: #999999;
                  padding-bottom: 10px;
                }
                p {
                  color: #999999;
                  line-height: 28px;
                  font-size: 12px;
                  span {
                    color: #eb6100;
                    display: inline-block;
                    padding: 0 5px;
                  }
                }
              }
            }
          }
        }
        .table_list_top_right {
          .head {
            padding-left: 64px;
            color: #666666;
            height: 50px;
            line-height: 50px;
          }
          .head_list {
            height: 320px;
            width: 1140px;
            margin: 0 auto;
            padding-bottom: 30px;
            padding-top: 30px;
            ul {
              height: 48px;
              border-bottom: 1px dashed #f5f7f8;
              display: flex;
              flex-direction: row;
              line-height: 48px;
              li {
                flex: 1;
                color: #999999;
                font-size: 12px;
                padding-right: 20px;
                width: 360px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                p {
                  display: inline-block;
                  font-size: 12px;
                }
              }
            }
            .ul_last {
              border: none;
            }
          }
          .head1 {
            height: 70px;
            text-align: center;
            border-bottom: 1px solid #bfbfbf;
            line-height: 30px;
            p {
              color: rgba(206, 204, 204, 0.87);
            }
            .blue {
              color: blue;
            }
          }
        }
      }
    }
    .img_list {
      height: auto;
      padding-bottom: 50px;
      h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        margin-bottom: 70px;
        border-left: 5px solid #eb6100;
      }
      .item_wrap {
        height: auto;
        padding: 20px 30px;
        list-style: none;
        overflow: hidden;
        li {
          display: inline-block;
          min-width: 260px;
          width: calc(20% - 15em);
          margin: 20px .5em 0;
          vertical-align: top;
          .item_t {
            padding-bottom: 70%;
            position: relative;
            margin: 0 5px;
            img {
              position: absolute;
              width: 100%;
              height: 100%;
              cursor: pointer;
            }
          }
          .item_b {
            margin: .5em .5em 1em;
            h4 {
              margin: 10px 0 0;
              color: #fff;
              font-size: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
            }
          }
        }
      }
    }
    .new_list {
      height: auto;
      padding-bottom: 50px;
      h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        border-left: 5px solid #eb6100;
      }
      ul {
        padding-bottom: 50px;
        li {
          cursor: pointer;
          height: 240px;
          background: #fff;
          margin-top: 40px;
          display: flex;
          flex-direction: row;
          padding: 20px;
          border: 1px solid #ccc;
          .pic_img {
            margin-right: 30px;
            width: 300px;
            .pic {
              width: 250px;
              height: 200px;
              overflow: hidden;
            }
            img {
              width: 250px;
              height: 200px;
            }
          }
          .pic_style {
            width: auto;
            max-width: 1000px;
          }
          span {
            display: inline-block;
            padding: 20px 30px 30px 20px;
          }
          .body_list {
            // width: 500px;
            height: 130px;
            overflow-y: scroll;
            text-align: left;
            line-height: 24px;
            text-indent: 2em;
            padding-right: 46px;
            word-break: break-all;
            cursor: pointer;
          }
          .body_list::-webkit-scrollbar{
            display: none;
          }
          // img {
          //   width: 280px;
          //   height: 160px;
          //   float: left;
          //   margin: 30px;
          // }
          // div {
          //   padding-left: 20px;
          //   float: left;
          //   font-family: "Microsoft YaHei";
          //   span {
          //     display: inline-block;
          //     font-weight: 700;
          //     font-size: 18px;
          //     padding-top: 68px;
          //     font-size: 18px;
          //     padding-bottom: 40px;
          //   }
          //   p {
          //     color: #a3a3a3;
          //     font-size: 14px;
          //     line-height: 26px;
          //   }
          // }
        }
      }
    }
    .product {
      .productMy_list {
        ul {
          padding-left: 50px;
          width: 100%;
          display: flex;
          flex-direction: row;
          height: 60px;
          border-bottom: 1px solid #e7ebee;
          background: #fff;
          padding-top: 28px;
          li {
            width: 120px;
            text-align: center;
            p {
              display: inline-block;
              text-decoration: none;
              color: #333;
              cursor: pointer;
            }
          }
          li:hover {
            border-bottom: 2px solid #eb6100;
            p {
              color: #eb6100;
            }
          }
          .active {
            border-bottom: 2px solid #eb6100;
            p {
              color: #eb6100;
            }
          }
          .unactive {
            border-bottom: none;
            p {
              color: #333;
            }
          }
        }
      }
      .nolist {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #ccc;
        background: #fff;
      }
      .productMy_tableList {
        background: #fff;
        padding: 50px 100px;
        ul {
          li {
            display: flex;
            flex-direction: row;
            padding-bottom: 20px;
            a {
              text-decoration: none;
              color: red;
              display: inline-block;
              padding: 0 5px;
            }
            p {
              width: 130px;
            }
            input {
              border: 1px solid #ccc;
              outline: none;
              width: 280px;
              height: 38px;
              border-radius: 5px;
              padding: 0 10px;
              line-height: 32px;
              background: #fff;
            }
            textarea {
              border: 1px solid #ccc;
              background: #fff;
              outline: none;
              padding: 10px;
              border-radius: 5px;
            }
          }
        }
        .now {
          display: flex;
          flex-direction: row;
          .list {
            margin-right: 50px;
            p {
              display: inline-block;
              text-align: right;
              padding: 0 20px;
            }
            input {
              border: 1px solid #ccc;
              outline: none;
              width: 150px;
              height: 38px;
              border-radius: 5px;
              background: #fff;
              padding: 0 10px;
              line-height: 32px;
            }
          }
        }
      }
    }
  }
}
.el-collapse {
  background: #fff;
  margin-top: 20px;
}
</style>
