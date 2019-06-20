<template>
  <!-- 助贷申请 -->
  <div id="loan_assistance">
    <div class="loan_assistance_list">
      <div class="title">
        <h3>放款</h3>
      </div>
      <div class="upload">
        <div class="uploading">
          <p class="u_title">{{statusList[riskStatus].info}}</p>
          <div class="upload_btn" v-for="(item, index) in resImg" :key='index'>
            <img :src='URL + item' alt="">
          </div>
        </div>
      </div>
      <!-- <div class="btn" v-if="riskStatus === '501'">
        <button @click="handlePlease">确认</button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderLoan',
  data () {
    return {
      fundList: [],
      URL: this.$root_url(),
      resImg: [],
      canIUpload: true,
      riskStatus: '500',
      statusList: {
        "500": {title: "放款证明待上传", info: "企业暂未上传放款证明"},
        "501": {title: "放款证明待确认", info: "企业已提交放款证明，确认后进入还款阶段"},
        "502": {title: "放款证明已确认", info: "已确认企业上传放款证明"},
        "503": {title: "放款证明已确认", info: "已确认企业上传放款证明"},
        "700": {title: "等待还款", info: "已确认企业的放款证明，等待企业上传还款相关数据"}
      }
    }
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/loan_process/${this.$route.query.id}/`).then(res => {
      if (res.status === 200) {
        console.log(res)
        that.riskStatus = res.data.loan_process_status
        if (Number(res.data.loan_process_status) > 502) {
          that.riskStatus = '503'
        }
        if (Number(res.data.loan_process_status) > 500) {
          that.resImg = res.data.loan_info.loan_img
        }
      }
    })
  },
  methods: {
    handlePlease () {
      const that = this
      that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: '700'}).then(res => {
        // console.log(res)
        if (res.status == 200) {
          that.riskStatus = '700'  
        }
      })
    },
    handleUpload ($event) {
      const that = this
      let file = $event.target.files[0]
      console.log(file)
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error('文件大小超过2M')
      } else if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        this.$message.error('请上传png, jpg或jpeg类型的文件')
      } else {
        let upload = new FormData()
        upload.append('function_module', 'financing')
        upload.append('file', file)
        this.$ajax.post('/api/ns_file/', upload).then(res => {
            console.log(res)
          if (res.status === 200) {
            this.resImg = res.data
            this.$message.success('上传成功')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#loan_assistance {
  width:100%;
  // min-height: 100%;
  .loan_assistance_list {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    margin: 20px 0;
    padding: 0 53px 22px 21px;
    .title {
      height: 52px;
      border-bottom: 1px solid #e1e6f0;
      padding-top: 20px;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        border-left: 5px solid #eb6100;
        height: 24px;
        padding-left: 22px;
        line-height: 24px;
      }
    }
    .upload{
      padding: 0 50px;
        &>div {
        // width: 1280px;
        margin: 0 auto;
        margin-top: 30px;
        padding: 30px 50px;
        background: #fff;
        // width: 60%;
        .u_title {
          line-height: 60px;
          font-size: 15px;
          font-weight: bold;
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
          width: 720px;
          height: 480px;
          border: 1px dashed #eb6100;
          margin: 20px auto;
          text-align: center;
          line-height: 250px;
          position: relative;
          input {
            width: 100%;
            height: 100%;
            position: absolute;
            // border: 5px solid #aaa;
            outline:none;
            top: 0;
            opacity: 0;
            left: 0;
            z-index: 9;
          }
          span {
            font-size: 60px;
            color: #eb6100;
            font-weight: 600;
            top: 90px;
            left: 345px;
            position: absolute;
          }
          img {
            width: 100%;
            height: 100%;
            border: none
          }
        }
      }
    }
    .btn {
      margin: 51px 0;
      text-align: center;
      button {
        outline: none;
        border-radius:2px;
        width:118px;
        height:28px;
      }
      button:first-child {
        background:#e87626;
        font-family:PingFangSC-Semibold;
        font-size:12px;
        color:#fff;
        letter-spacing:0;
        text-align:center;
        color:#ffffff;
        border: 1px solid #e87626;
      }
    }
  }
}
</style>
