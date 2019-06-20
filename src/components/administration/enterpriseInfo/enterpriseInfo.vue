<template>
  <div class='enterpriseInfo'>
    <div class='info-enter'>
      <!-- <AppNav :father='{selIndex: 10}' type='1'></AppNav> -->
      <div class="header_top">
        <div class="head_portrait">
          <!-- 当企业首次进入系统显示 -->
          <div v-if="img1 === '/static/default_avatar.png'" class="c_first_inter">
            <p class="c_fCompany_name c_company_name"><span>{{companyName}}</span></p>
            <div v-if="userType !== 'person' && userType !== 'institutionperson'"><a class="c_header_tip" @click="showUpload">点击更改头像</a></div>
            <myUpload field="file"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="150"
               :height="150"
               :maxSize="2*1024*1024"
               :no-square="isShowSquare"
               url="/api/ns_file/"
               :headers='headers'
               img-format="jpg"
               :params="params"></myUpload>
          </div>
          <!-- 企业上传完头像后显示 -->
          <div v-else class="c_head_box">
            <div class="c_header_avatar">
              <img v-if="img1" :src="$root_url() + img1">
              <i v-else class="el-icon-plus"></i>
            </div>
            <div v-if="userType !== 'person' && userType !== 'institutionperson'"><a class="c_header_tip active" @click="showUpload">点击更改头像</a></div>
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
            <p class="c_company_name"><span>{{companyName}}</span></p>
          </div>
          <!-- <div class="auth">
            <img class="tw" :src="userInfo.tw_src" @click="toAuth(1, userInfo.twcx_verified_status)" alt="">
            <img v-show="!userInfo.twcx_verified_status" class="tw_status" :src="statusIcon" alt="">
            <img class="cfca" :src="userInfo.cfca_src" @click="toAuth(2, userInfo.cfca_verified_status)" alt="">
            <img v-show="!userInfo.cfca_verified_status" class="cfca_status" :src="statusIcon" alt="">
          </div> -->
        </div>
        <div class="header_nav">
          <ul>
            <li :class="[adminColor.colorIndex === 'enterpriseIntroduce' ? 'active' : 'unactive']">
              <span></span>
              <router-link :to="{name: 'enterpriseIntroduce'}">企业信息</router-link>
            </li>
            <li :class="[adminColor.colorIndex === 'enterpriseBlogInfo' ? 'active' : 'unactive']">
              <span></span>
              <router-link :to="{name: 'enterpriseBlogInfo'}">企业博客</router-link>
            </li>
            <li :class="[adminColor.colorIndex === 'enterpriseDemand' ? 'active' : 'unactive']" v-if="userType === 'business' || userType === 'person'">
              <span></span>
              <router-link :to="{name: 'enterpriseDemand'}">供需发布</router-link>
            </li>
            <!-- <li :class="[adminColor.colorIndex === 'serviceDemand' ? 'active' : 'unactive']" v-if="userType === 'serviceprovider' || userType === 'serviceperson'">
              <span></span>
              <router-link :to="{name: 'serviceDemand'}">服务发布</router-link>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
// import AppNav from '../financing/financingManege'
export default {
  components: {
    // AppNav
    myUpload
  },
  props: ['adminColor'],
  data () {
    return {
      isShowSquare: true,
      show: false,
			params: {
				function_module: 'avatar'
      },
      companyName: '',
      id: '',
      img1: '',
      img: '',
      upDateUrl: '/api/ns_file/',
      activeItem: 'administrationEnterprise',
      // 头像图片
      avatar: '',
      // 图片类型
      pic_type: '',
      businessShow: true,
      institutionShow: false,
      institutionpersonShow: false,
      personShow: false,
      serviceShow: false,
      guarantee: false,
      userInfo: {
        tw_src: '',
        cfca_src: '',
        twcx_verified_status: '',
        cfca_verified_status: ''
      },
      statusIcon: '',
      userType: '',
      headers: {},
      businessId: ''
    }
  },
  beforeCreate () {
    var that = this
    // 本地方案
    that.userType = localStorage.role
    this.id = this.$route.params.id
    that.$ajax.get('/api/company/status/').then(res => {
      // "signed": False, # 是否签署协议
      if (res.data.signed === true) {
      } else {
        if (localStorage.role === 'business') {
          that.$router.push('/setting?signed=1')
        } else if (localStorage.role === 'institution') {
          that.$router.push('/setting?signed=1')
        } else if (localStorage.role === 'fund') {
          that.$router.push('/setting?signed=1')
        } else {
          that.$router.push('/setting?signed=1')
        }
      }
    })
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push({params: {item: tab.name}})
    },
    toAuth (type, status) {
      this.$router.push({
        path: '/companyAuth',
        query: {
          type: type,
          status: status
        }
      })
      var query = {
        type: type,
        status: status
      }
      this.$emit('checkAuth', query)
    },
    // 图片上传
    showUpload () {
      this.show = !this.show
    },
    // 裁剪成功
    cropSuccess (imgDataUrl, field) {
      // var that =  this
      // var fileType = imgDataUrl.split(';')[0].split('/')[1]
      // // console.log(fileType)
      // this.params = {
      //   token: this.$token(),
      //   avatar: that.changeType(imgDataUrl, fileType),
      //   pic_type: fileType
      // }
    },
    // 上传成功
    cropUploadSuccess (jsonData, field) {
      var that = this
      this.$message.success('上传成功')
      that.$ajax.patch('/api/auth/avatar/', {avatar: jsonData}).then(res => {
        // 获取头像
        that.$ajax.get(`/api/company/` + that.businessId).then(res => {
          that.img1 = res.data.avatar
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
    // 转换二进制流
    changeType (data, mime) {
      data = data.split(',')[1];
      data = window.atob(data);
      var ia = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i);
      };
      // canvas.toDataURL 返回的默认格式就是 image/png
      return new Blob([ia], {
          type: mime
      });
    }
  },
  mounted () {
    const that = this
    this.userType = localStorage.role
    this.headers['Auth-Token'] = localStorage.ns_token
    if (localStorage.id) {
      that.businessId = localStorage.id
    }
    if (that.businessId) {
      // 获取头像
      that.$ajax.get(`/api/company/` + that.businessId).then(res => {
        that.img1 = res.data.avatar
        // TODO: 存入store头像
        that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
          that.companyName = res.data.name
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.enterpriseInfo {
  .c_first_inter{
    margin-top: 50px;
  }
  .c_header_avatar{
    width: 110px;
    height: 110px;
    position: relative;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid #ccc;
    overflow: hidden;
    img{
      display: inline-block;
      cursor: pointer;
      width: 110px;
      height: 110px;
      border-radius: 50%;
    }
    i{
      position: absolute;
      top: 50px;
      left: 50px;
      color: #ccc;
    }
  }
  .c_header_tip{
    display: inline-block;
    color: #fafafa;
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
    background: #eb6100;
    border-radius: 4px;
    line-height: 24px;
    width: 120px;
    height: 26px;
    margin: 0 auto;
    margin-top: 5px;
    &.active{
      background: #fff;
      border: 1px solid #ccc;
      color: #666;
    }
    &.active:hover{
      background: #eb6100;
      border-color: #eb6100;
      color: #fafafa;
    }
  }
  .c_company_name{
    line-height: 40px;
    font-size: 16px;
    color: #333;
    span{
      font-weight: bold;
      background: url('../../../../static/img/verify.png') no-repeat right center;
      padding: 0 35px;
    }
  }
  .c_fCompany_name{
    font-size: 24px;
  }
}
.enterpriseInfo {
  width: 100%;
  min-height: 390px;
  height: 390px;
  background: #fafafa;
  .info-enter {
    font-size: 14px;
    margin: 0 auto;
    min-height: 355px;
    background: #fafafa;
    display: flex;
    width: 100%;
    .header_top {
      width: 100%;
      // padding: 0 60px;
      // height: 390px;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;
      background: url('../../../../static/img/adminbg.png') repeat-x;
      .head_portrait {
        margin: 0 auto;
        // border-bottom: 1px dashed #e7ebee;
        // background: #fff;
        height: 230px;
        .auth {
          position: relative;
          top: 10px;
          // padding-left: 44px;
          .tw {
            width: 18px;
            height: 18px;
            border: none;
            border-radius: 0; 
            cursor: pointer;
          }
          .cfca {
            cursor: pointer;
            margin-left: 20px;
            width: 18px;
            height: 18px;
            border: none;
          }
          .tw_status {
            position: absolute;
            width: 8px;
            top: -5px;
            // margin-left: 0px;
            height: 12px;
            border: none;
          }
          .cfca_status {
            position: absolute;
            width: 8px;
            top: -5px;
            margin-left: 3px;
            height: 12px;
            border: none;
          }
        }
      }
    }
    .header_nav {
      margin: 0 auto;
      ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;
        margin: 0 auto;
        justify-content: center;
        height: 60px;
        border-bottom: 1px solid #e7ebee;
        // background: #fff;
        padding-top: 28px;
        li {
          width: 120px;
          cursor: pointer;
          margin: 0 10px;
          a {
            text-decoration: none;
            color: #333;
          }
        }
        li:hover {
          border-bottom: 2px solid #eb6100;
          a {
            color: #eb6100;
          }
        }
        .active {
          border-bottom: 2px solid #eb6100;
          a {
            color: #eb6100;
          }
        }
        .unactive {
          border-bottom: none;
          a {
            color: #333;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-tabs__nav-wrap::after {
  background: none;
}
.enterpriseInfo {
  .el-tabs {
    width: 100%;
    margin: 0 auto;
    padding: 0 auto;
  }
  .el-tabs__nav {
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;
    text-align: center;
    border-bottom: 1px solid #e7ebee;
    // border-top: none;
  }
  .is-top {
    // padding: 0 30px;
    text-align: center;
    background: #fff;
  }
  #tab-administrationEnterprise {
    padding-left: 36px;
  }
  #tab-invitingAdmin {
    padding-right: 36px;
  }
  .el-tabs__item:hover {
    color: #eb6100;
    cursor: pointer;
  }
  .el-tabs__item.is-active {
    color: #eb6100;
    border-bottom: 2px solid #eb6100;
  }
  .el-tabs__active-bar {
    display: none;
    background: #eb6100;
    margin: 0 auto;
  }
}
</style>
