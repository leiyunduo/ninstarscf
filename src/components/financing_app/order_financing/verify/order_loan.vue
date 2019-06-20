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
          <div class='loan_date'>
            <span>放款日期：</span>
            <el-date-picker size="mini" v-if="riskStatus === '500' || riskStatus === '501'" v-model="loanDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            <span v-if="riskStatus !== '500' && riskStatus !== '501'">{{loanDate || '未填写'}}</span>
          </div>
          <div class="img_list">
            <ul class="inner_img">
              <li v-for="(file, index) in fileList">
                <img :src="$root_url() + file.url" alt="">
                <div class="img_wrap">
                  <i class="el-icon-search" @click="handlePreview(file)"></i>
                  <i class="el-icon-delete" @click="handleRemove(index)"></i>
                </div>
              </li>
            </ul>
            <div class="upload_btn" v-if="(riskStatus === '500' || riskStatus === '501') && (fileList.length < 5)">
              <input type="file" @change="handleUpload">
              <span>+</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn" v-if="riskStatus === '500' || riskStatus === '501'">
        <button @click="handlePlease">提交</button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisibleImg">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'orderLoan',
  data () {
    return {
      fundList: [],
      // URL: this.$root_url(),
      resImg: '',
      canIUpload: true,
      upLoadUrl: '',
      fileList: [],
      riskStatus: '500',
      loanDate: '',
      repaymentDate: '',
      dialogVisibleImg: false,
      dialogImageUrl: '',
      file: {},
      statusList: {
        "500": {title: "放款证明待上传", info: "请上传您的放款证明，金融机构将对您的证明进行审核"},
        "501": {title: "放款证明待确认", info: "您已提交放款证明，再次提交将覆盖之前的提交"},
        "502": {title: "放款证明已确认", info: "金融机构已经通您的放款证明"},
        "503": {title: "放款证明已确认", info: "金融机构已经通您的放款证明"}
      }
    }
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/loan_process/${this.$route.query.id}/`).then(res => {
      if (res.status === 200) {
        that.riskStatus = res.data.loan_process_status
        res.data.loan_info.loan_img && res.data.loan_info ? that.fileList = res.data.loan_info.loan_img : that.fileList = []
        // that.fileList.forEach(val => {
        //   val.url = 'http://39.108.230.246/' + val.url
        // })
        res.data.loan_info ? that.loanDate = res.data.loan_info.loan_date : that.loanDate = null
        res.data.loan_info ? that.repaymentDate = res.data.loan_info.repayment_date : that.repayment_date = null
        if (Number(res.data.loan_process_status) > 502) {
          that.riskStatus = '503'
        }
      }
    })
  },
  methods: {
    handlePlease () {
      const that = this
      if (that.fileList.length !== 0) {
        if (that.loanDate) {
          let loan_info = {
            loan_img: this.fileList,
            loan_date: this.loanDate
          }
          console.log(that.fileList)
          that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_info, loan_process_status: '501'}).then(res => {
            // console.log(res)
            if (res.status == 200) {
              that.$message.success('提交成功')
              that.riskStatus = '501'  
            }
          })
        } else {
          that.$message.error('请选择放款日期')        
        }
      } else {
        that.$message.error('请上传放款证明')
      }

    },
    handleUpload ($event) {
      const that = this
      let file = $event.target.files[0]
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error('文件大小超过2M')
      } else if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        this.$message.error('请上传png, jpg或jpeg类型的文件')
      } else {
        let upload = new FormData()
        upload.append('function_module', 'financing')
        upload.append('file', file)
        this.$ajax.post('/api/ns_file/', upload).then(res => {
          if (res.status === 200) {
            this.fileList.push({url: res.data, uid: new Date().getTime()})
            this.$message.success('上传成功')
          }
        })
      }
    },
    handleRemove(i) {
      this.fileList.splice(i, 1)
    },
    handlePreview(file) {
      console.log(file)
      this.dialogImageUrl = this.$root_url() + file.url
      this.dialogVisibleImg = true
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
          line-height: 32px;
          font-size: 16px;
          // font-weight: bold;
          padding: 25px 20px;
          background: #fbfdff;
          color: #8c939d;
          // text-align: center;
          border: 1px solid #c0ccda;
        }
        .img_list {
          display: flex;
          .inner_img {
            margin-right: 20px;
            display: flex;
            li {
              position: relative;
              width: 150px;
              height: 150px;
              border: 1px solid #c0ccda;
              margin-right: 20px;
              img {
                width: 100%;
                height: 100%;
              }
              .img_wrap {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                display: flex;
                background: rgba(0, 0, 0, .56);
                align-items: center;
                justify-content: center;
                transition: all .2s ease-out;
                opacity: 0;
                i {
                  color: #fff;
                  font-size: 20px;
                  font-size: bold;
                  margin: 0 12px;
                  cursor: pointer;
                }
              }
            }
            li:hover {
              .img_wrap {
                opacity: 1;
              }
            }
            li:last-child {
              margin: 0;
            }
          }
          .upload_btn {
            width: 150px;
            height: 150px;
            text-align: center;
            position: relative;
            color: #8c939d;
            border: 1px solid #c0ccda;
            background: #fbfdff;
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
              transition: border 2s ease-in;
            }
            imput:hover {
              border: 1px solid #8c939d;
            }
            span {
              display: block;
              line-height: 140px;
              text-align: center;
              // font-weight: bold;
              color: #8c939d;
              font-size: 36px;
            }
          }
        }
        .loan_date {
          // text-align: center;
          margin: 30px 0;
          display: flex;
          span:first-child {
            // width: 10%;
            color: #333;
            line-height: 28px;
            color: #666;
          }
          span:last-child {
            color: #666;
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
