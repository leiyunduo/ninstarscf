<template>
  <div class="usercenter" :style="leftNavHeight">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="status_pic">
      <location :location="location"></location>
      <getset :statusList="statusList" type='1' :fid='fid' fType='receivable' :bid='bid'></getset>
      <div class="upload" v-if="overUpload === 0">
        <div class="uploading" v-if="applicationStatus === 0">
          <p class="u_title" v-if="isDisabled">请上传放款相关图片，您的本次提交将覆盖之前提交</p>
          <p class="u_title" v-if="!isDisabled">放款证明</p>
          <div class="upload_btn">
            <input type="file" @change="uploadImg" v-if="isDisabled">
            <img :src="resImg" alt="">
            <span v-if="resImg === ''">+</span>
          </div>
          <div class="sub" v-if="isDisabled">
            <div @click="sureSub">提交</div>
          </div>
        </div>
        <div class="uploaded" v-if="applicationStatus === 1">
          <p class="u_title">上传成功</p>
          <p class="u_line">预计24小时内业务经理会主动和您联系，请保持电话通畅。</p>
          <p class="u_line">3-5个工作日内获取审核反馈，请注意查看</p>
          <p class="u_info"></p>
          <div class="sub">
            <div @click="back">回到首页</div>
          </div>
        </div>
        <div class="faild" v-if="applicationStatus === 2">
          <p class="u_title">上传图片</p>
          <p class="u_line">失败原因： {{errInfo}}</p>
          <div class="upload_btn">
            <input type="file" @change="uploadImg">
            <img :src="resImg" alt="">
            <span>+</span>
          </div>
        </div>
      </div>
      <div v-if="overUpload === 1" class="err_info">
        <p>银行已经受理并上提交了还款数据或者您还未进行到本步骤</p>
        <div class="back_index">
          <div @click='back'>回到首页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Location from '../../location/location'
// import appNav from '../../financing/financingManege'
import Getset from '../../financing/finace'
export default {
  name: 'application',
  components: {
    Getset,
    // appNav,
    Location
  },
  data () {
    return {
      father: {selIndex: 3},
      location: [
        { title: '我的融资', url: '/financing' },
        { title: '放款' }
      ],
      isDisabled: true,
      hasImg: 0,
      statusList: [1, 1, 1, 1, 1, 1, 1, 0],
      resImg: '',
      errInfo: '',
      uploadFile: '',
      applicationStatus: 0,
      overUpload: -1,
      leftNavHeight: this.leftBarInit()
    }
  },
  methods: {
    leftBarInit (num) {
      if (num) {
        this.leftNavHeight = 'height:' + window.innerHeight + 'px'
      } else {
        return 'height:' + window.innerHeight + 'px;'
      }
    },
    uploadImg: function ($event) {
      var that = this
      that.uploadFile = $event.target.files[0]
      var fileType = that.uploadFile.type.substr(that.uploadFile.type.indexOf('/') + 1, that.uploadFile.type.length - 1)
      // var fileType = uploadFile.type.indexOf('/') + 1
      // console.log(fileType)
      if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'jpeg') {
        that.$message.error('请上传png、jpg或jpeg文件格式的文件！')
        return
      }
      var fr = new FileReader()
      fr.onload = function (e) {
        that.resImg = this.result
      }
      fr.readAsDataURL(that.uploadFile)
    },
    sureSub: function () {
      if (this.uploadFile === '') {
        this.$message.error('未选择图片')
        return
      }
      var that = this
      var subData = new FormData()
      var fileType = that.uploadFile.type.substr(that.uploadFile.type.indexOf('/') + 1, that.uploadFile.type.length - 1)
      subData.append('loan_pic', that.uploadFile)
      subData.append('financing_id', that.fid)
      subData.append('financing_type', 'receivable')
      subData.append('type', fileType)
      subData.append('token', that.$token())
      // subData.append()
      that.$ajax.post('/api/business_loan_confirm/', subData).then(res => {
        // console.log(res)
        if (res.data.code === 1) {
          that.applicationStatus = 1
        } else {
          that.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    back: function () {
      this.$router.push('/financing')
    }
  },
  beforeCreate () {
    var that = this
    window.onresize = function () {
      return (function () {
        that.leftNavHeight = that.leftBarInit()
      })()
    }
    if (that.$route.query.id || that.$route.query.fid) {
      that.bid = Number(that.$route.query.id)
      that.fid = Number(that.$route.query.fid)
    } else {
      that.is404 = 1
    }
    that.$ajax.get('/api/get_loan_feedback/?token=' + that.$token() + '&financing_type=receivable&financing_id=' + that.fid + '&institution_id=' + that.bid).then(res => {
      // console.log(res)
      that.overUpload = 0
      if (res.data.i_step !== '5') {
        that.isDisabled = false
      }
      if (res.data.loan_pic) {
        that.resImg = that.$root_url() + res.data.loan_pic
      }
    })
  }
}
</script>

<style scoped lang="less">
  // @import url('./iconfont.css');
  .usercenter {
    width: 100%;
    display: flex;
    //padding-top: 70px;
    .status_pic {
      padding: 0 50px;
      background: #f5f7f8;
      overflow-y: scroll;
      // width: 100%;
      .err_info {
        p {
          line-height: 60px;
          text-align: center;
          color: #999;
        }
        .back_index {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            width: 120px;
            text-align: center;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            border-radius: 4px;
            background: #eb6100;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    .upload{
      padding: 0 50px;
    }
    .upload>div {
      // width: 1280px;
      margin: 0 auto;
      margin-top: 30px;
      padding: 30px 50px;
      background: #fff;
      // width: 60%;
      .u_title {
        line-height: 60px;
        font-size: 15px;
        // text-align: center;
      }
      .u_line {
        height: 36px;
        font-size: 14px;
        width: 60%;
        margin: 0 auto;
        text-align: center;
      }
      .upload_btn {
        width: 450px;
        height: 350px;
        border: 1px dashed #eb6100;
        margin: 20px auto;
        text-align: center;
        line-height: 250px;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          opacity: 0;
          left: 0;
          z-index: 9;
        }
        span {
          font-size: 60px;
          color: #eb6100;
          font-weight: 600;
          top: 30px;
          left: 210px;
          position: absolute;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .sub {
        div {
          width: 90px;
          height: 30px;
          color: #ffffff;
          background: #eb6100;
          text-align: center;
          line-height: 30px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          margin: 0 auto;
        }
      }
    }
    .uploaded {
      background: #ffffff;
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
