<template>
  <div class='enterpriseIntroduce'>
    <!-- <AppNav :father='{selIndex: -1}' type='1'></AppNav> -->
    <div class='info-enter'>
      <div class="forms">
        <EnterpriseInfo :adminColor="{colorIndex: 'enterpriseIntroduce'}"></EnterpriseInfo>
        <div class="forms_list">
          <div class="left">
            <!-- 企业介绍 -->
            <div class="table_bottom" v-if="childValue === '企业介绍'">
              <div class="card_title">
                <h3>企业介绍</h3>
                <button @click="editIntroduce">{{!brief_introduction.content ? '添加' : '编辑'}}</button>
              </div>
              <div class="padding_name">
                <div class="business_list">
                  <h3>{{enterInfor.name}}<span v-if='brief_introduction.business_desc.abbreviation'>（{{brief_introduction.business_desc.abbreviation}}）</span><span v-else>（暂无）</span></h3>
                  <!-- <p>企业简称：</p> -->
                  <p>企业标语：<span v-if='brief_introduction.business_desc.slogan'>{{brief_introduction.business_desc.slogan}}</span><span v-else>暂无</span></p>
                </div>
                <p class="p">企业介绍</p>
                <div class="shi" v-html="brief_introduction.content" v-if='brief_introduction.content'></div>
                <div class="shi" style="color: #999; text-align: center; line-height: 120px;" v-else>暂无企业介绍</div>
              </div>
            </div>
            <!-- 工商信息 -->
            <div class="table_list" v-if="childValue === '工商信息'">
              <div class="card_title">
                <h3>工商信息</h3>
                <button @click="handleChangeAuth">变更</button>
              </div>
              <ul>
                <li>
                  <span>企业名称：</span>
                  <p v-if="enterInfor.name">{{ enterInfor.name }}</p>
                  <p v-if="!enterInfor.name">暂无数据</p>
                </li>
                <li v-if="enterInfor.certificates">
                  <span>统一社会信用代码：</span>
                  <p v-if="enterInfor.certificates.business_license_id">{{ enterInfor.certificates.business_license_id }}</p>
                  <p class='null_data' v-if="!enterInfor.certificates.business_license_id">暂无数据</p>
                </li>
                <li v-if="enterInfor.certificates">
                  <span>营业执照证件号：</span>
                  <p v-if="enterInfor.certificates.business_license_id">{{ enterInfor.certificates.business_license_id }}</p>
                  <p class='null_data' v-if="!enterInfor.certificates.business_license_id">暂无数据</p>
                </li>
                <li v-if='enterInfor.business_information'>
                  <span>登记机关：</span>
                  <p v-if="enterInfor.business_information.belong_org">{{ enterInfor.business_information.belong_org }}</p>
                  <p class='null_data' v-if="!enterInfor.business_information.belong_org">暂无数据</p>
                </li>
                <li v-if="enterInfor.business_information">
                  <span>成立日期：</span>
                  <p v-if="enterInfor.business_information.year_founded">{{ enterInfor.business_information.year_founded }}</p>
                  <p class='null_data' v-if="!enterInfor.business_information.year_founded">暂无数据</p>
                </li>
                <li v-if="enterInfor.business_information">
                  <span>注销/吊销日期：</span>
                  <p v-if="enterInfor.end_data">{{ enterInfor.end_data }}</p>
                  <p class='null_data' v-if="!enterInfor.end_data">暂无数据</p>
                </li>
                <li v-if="enterInfor.business_information">
                  <span>登记状态：</span>
                  <p v-if="enterInfor.business_information.register_status">{{ enterInfor.business_information.register_status }}</p>
                  <p class='null_data' v-if="!enterInfor.business_information.register_status">暂无数据</p>
                </li>
                <li v-if="enterInfor.business_information">
                  <span>注册资本：</span>
                  <p v-if="enterInfor.business_information.register_assets">{{ enterInfor.business_information.register_assets }}</p>
                  <p class='null_data' v-if="!enterInfor.business_information.register_assets">暂无数据</p>
                </li>
                <li v-if="enterInfor.business_information">
                  <span>经营期限：</span>
                  <p v-if="enterInfor.business_information.term_start">{{ enterInfor.business_information.term_start }}<span v-if="enterInfor.business_information.term_end"> - </span>{{enterInfor.business_information.term_end}}</p>
                  <p class='null_data' v-if="!enterInfor.business_information.term_start">暂无数据</p>
                </li>
                <li v-if="enterInfor.business_information">
                  <span>核准日期：</span>
                  <p v-if="enterInfor.business_information.check_date">{{ enterInfor.business_information.check_date }}</p>
                  <p class='null_data' v-if="!enterInfor.business_information.check_date">暂无数据</p>
                </li>
                <li v-if="enterInfor.business_information">
                  <span>行业：</span>
                  <p v-if="enterInfor.business_information.trade">{{ enterInfor.business_information.trade }}</p>
                  <p class='null_data' v-if="!enterInfor.business_information.trade">暂无数据</p>
                </li>
                <li v-if="enterInfor.area">
                  <span>所在地区：</span>
                  <p v-if="enterInfor.area.province">{{enterInfor.area.province}} {{enterInfor.area.city}} {{enterInfor.area.region}}</p>
                  <p class='null_data' v-if="!enterInfor.area.province">暂无数据</p>
                </li>
                <li class="li_style"  v-if="enterInfor.business_information.scope">
                  <span>经营范围：</span>
                  <p v-if="enterInfor.business_information.scope">{{ enterInfor.business_information.scope }}</p>
                  <p class='null_data' v-if="!enterInfor.business_information.scope">暂无数据</p>
                </li>
              </ul>
            </div>
            <!-- 财务状况 -->
            <FinancialSituation v-if="childValue === '财务状况' && userType === 'business'" />
            <!-- 联系方式 -->
            <ContactInformation :contact_information='contact_information' v-if="childValue === '联系方式'" />
            <!-- 企业相册 -->
            <div class="honor" v-if="childValue === '企业相册'">
              <div class="table_bottom">
                <div class="card_title">
                  <h3>企业相册</h3>
                  <div>
                    <button @click="honorEdit">上传照片</button>
                    <!-- <span @click="deleteHonor">删除</span> -->
                  </div>
                </div>
                <!-- <h3>荣誉资质</h3> -->
                <div class="h3_bottom" v-if="imgTit.length !== 0">
                  <div class="block" v-for="(item, index) in imgTit" :key="index">
                    <i class="el-icon-remove" @click="deleteHonor(item)"></i>
                    <img style="width: 116px; height: 77px" :src="$root_url() + item.picture" @click="imgBig(item)" alt="">
                  </div>
                </div>
                <div class="h3_bottom" v-if="imgTit.length === 0">
                  <div style="padding: 10px; height: 400px; color: #999; text-align: center; line-height: 120px;">企业暂无上传相册</div>
                </div>
              </div>
            </div>
            <!-- 自我评级 -->
            <selfRating v-if="childValue === '自我评级' && userType !== 'institution'" />
          </div>
          <div class="right">
            <navBar @childByValue='childByValue' />
          </div>
        </div>
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
        <button class="cancel" @click="honorCancel">取消</button>
        <button class="prese" @click="honorPreservation">保存</button>
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
// import AppNav from '../../financing/financingManege'
import EnterpriseInfo from './enterpriseInfo'
import navBar from './navBar'
import FinancialSituation from './financialSituation'
import ContactInformation from './contactInformation'
import selfRating from './selfRating'
export default {
  components: {
    // AppNav,
    EnterpriseInfo,
    navBar,
    // 财务状况
    FinancialSituation,
    // 联系方式
    ContactInformation,
    // 自我评级
    selfRating
  },
  data () {
    return {
      name: 'enterpriseIntroduce',
      editTitle: '编辑',
      id: '',
      enterInfor: {
        name: '',
        credit_code: '',
        business_license_id: '',
        belong_org: '',
        year_founded: '',
        end_data: '',
        register_status: '',
        register_assets: '',
        term_start: '',
        term_end: '',
        check_date: '',
        trade: '',
        province: '',
        city: '',
        region: '',
        scope: '',
        content: ''
      },
      brief_introduction: {
        business_desc: {
          abbreviation: '',
          slogan: '',
          content: ''
        }
      },
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
      // 荣誉资质
      imageUrl: '',
      // 荣誉资质上传图片地址
      updateUrl: '',
      // 图片
      urlImg: '',
      // 图片名称
      title: '',
      // 荣誉资质显示
      imgTit: [],
      img_honor: '',
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
      checkedCities: [],
      honorId: '',
      radio2: '',
      dialogVisibleNews: false,
      newId: '',
      // 右侧按钮
      childValue: '企业介绍',
      userType: '',
      dialogVisibles: false,
      imgShow: false,
      pictures: '',
      businessId: '',
      // 联系方式
      contact_information: ''
    }
  },
  beforeCreate () {
    var that = this
    // 本地方案
    that.userType = localStorage.role
  },
  mounted () {
    var that = this
    // 本地方案
    that.userType = localStorage.role
    that.businessId = localStorage.id
    // 企业信息展示
    that.$ajax.get(`/api/company/` + that.businessId).then(res => {
      that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
        that.enterInfor = res.data
        localStorage.self_name = escape(res.data.name)
        // 联系方式
        that.contact_information = res.data.contact_info
        if (res.data.brief_introduction) {
          that.brief_introduction = res.data.brief_introduction
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    // 荣誉资质
    that.imgHonor()
    // location 
    let _location = [{
      title: this.$route.meta.title,
      url: this.$route.meta.url
    }]
  },
  methods: {
    childByValue (item) {
      var that = this
      that.childValue = item
    },
    handleChangeAuth: function () {
      let that = this
      if (localStorage.role === 'business') {
        that.$router.push('/setting?signed=1')
      } else if (localStorage.role === 'institution') {
        that.$router.push('/setting?signed=1')
      } else if (localStorage.role === 'serviceprovider') {
        that.$router.push('/setting?signed=1')
      } else if (localStorage.role === 'person') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'institutionperson') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'serviceperson') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'fund') {
        that.$router.push('/setting?signed=1')
      }
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
    // 荣誉资质显示
    imgHonor () {
      var that = this
      this.$ajax.get('/api/home_page/honor/').then(res => {
        this.imgTit = res.data.results
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 荣誉资质上传
    handleAvatarSuccess (res, file) {
      var fileUrl = new FormData()
      fileUrl.append('file', file.raw)
      fileUrl.append('function_module', 'honor')
      this.imageUrl = URL.createObjectURL(file.raw)
      this.urlImg = file.raw
      this.title = file.name.split('.')[0]
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
    // 点击图片放大
    imgBig (item) {
      this.imgShow = true
      this.pictures = item.picture
    },
    // 荣誉资质取消
    handleClose () {
      this.dialogVisible = false
      this.dialogVisibleNews = false
      this.dialogVisibles = false
      this.imgShow = false
    },
    // 荣誉资质编辑
    honorEdit () {
      this.imageUrl = ''
      this.dialogVisible = true
    },
    // 荣誉资质删除
    GroundOK () {
      var that = this
      that.$ajax.delete(`/api/home_page/honor/` + that.honorId + '/').then(res => {
        that.$message.success('删除成功！')
        that.imgHonor()
        that.dialogVisibles = false
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 荣誉资质是否删除
    deleteHonor (item) {
      this.honorId = item.id
      this.dialogVisibles = true
    },
    // 荣誉资质取消
    honorCancel () {
      this.dialogVisible = false
    },
    // 荣誉资质保存
    honorPreservation () {
      // 荣誉资质信息
      if (this.urlImg === '') {
        this.$message.error('荣誉资质为空')
      } else {
        this.$ajax.post('/api/home_page/honor/', {title: this.title, picture: this.img_honor}).then(res => {
          this.imgHonor()
          this.dialogVisible = false
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 公司介绍编辑
    editIntroduce () {
      this.$router.push({
        path: '/blogEditor',
        query: {
          type: 2
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
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
.enterpriseIntroduce {
  min-height: 100%;
  display: flex;
  background: #fafafa;
  //padding-top: 70px;
  .info-enter {
    width: 100%;
    font-size: 14px;
    margin: 0 auto;
    padding: 0 50px;
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
      border:1px solid #eaeaea;
      border-radius:4px;
    }
    .left {
      flex: 1;
      .table_bottom {
        width: 100%;
        height: auto;
        background: #fff;
        position: relative;
        padding: 0 15px;
        .card_title {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e7ebee;
          align-items: center;
          height: 60px;
          h3 {
            border-left: 4px solid #eb6100;
            font-size: 14px;
            color: #666;
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
        }
        .business_list {
          h3 {
            font-family:PingFangSC-Semibold;
            font-size:16px;
            color:#333333;
            letter-spacing: 0.2px;
            text-align: left;
            padding-top: 10px;
            font-weight: bolder;
            span {
              color: #666;
              display: inline-block;
              padding-left: 15px;
              font-size: 12px;
            }
          }
          p {
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#999999;
            letter-spacing:0.15px;
            text-align:left;
            padding: 8px 0;
            span {
              color: #666;
            }
          }
        }
        .shi {
          border: 1px solid #eaeaea;
          border-radius: 3px;
          padding: 12px;
          min-height: 400px;
          p {
            line-height: 28px;
          }
        }
        .padding_name {
          padding: 0 20px 20px;
        }
        .p {
          font-family:PingFangSC-Regular;
          font-size: 14px;
          color:#333333;
          // letter-spacing: 0.15px;
          text-align: left;
          padding-top: 5px;
          line-height: 28px;
          font-weight: bold;
        }
        .h3_bottom {
          height: auto;
          width: 100%;
          padding: 20px;
          .block {
            float: left;
            position: relative;
            margin-top: 15px;
            cursor: pointer;
            img {
              margin: 10px;
            }
            .el-icon-remove {
              display: none;
              position: absolute;
              right: 4px;
              top: 4px;
              color: #fff;
            }
          }
          .block:hover {
            .el-icon-remove {
              display: inline-block;
              color: #f23c3c;
              position: absolute;
              right: 4px;
              top: 4px;
              cursor: pointer;
            }
          }
        }
        .editprofile {
          overflow-y: scroll;
          padding: 16px 12px;
          overflow: hidden;
          &::-webkit-scrollbar {
            display: none;
          }
          text-overflow:ellipsis;
          // white-space: nowrap;
          height: auto;
          // width: 380px;
        }
      }
      .table_list {
        width: 100%;
        height: auto;
        padding: 0 15px;
        background: #fff;
        // border: 1px solid #e7ebee;
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
        }
        ul {
          li {
            line-height: 45px;
            color: #333;
            width: 100%;
            display: flex;
            span {
              display: inline-block;
              width: 150px;
              text-align: right;
              font-size: 14px;
              color:#606266;
              letter-spacing:0.15px;
            }
            p {
              flex: 1;
              padding-left: 60px;
              font-size: 14px;
              text-align:left;
            }
          }
          .li_style {
            display: flex;
            p {
              text-align: left;
            }
          }
        }
        div.btn_line {
          // height: 80px;
          div {
            height: 36px;
            width: 85px;
            background: #eb6100;
            color: #fff;
            text-align: center;
            line-height: 36px;
            margin: 20px auto;
            cursor: pointer;
          }
        }
      }
      .honor {
        height: auto;
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
.null_data {
  color: #999;
}
</style>
