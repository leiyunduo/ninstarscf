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
            <span>{{loanDate || '企业未填写'}}</span>
          </div>
          <div class="img_list">
            <ul v-if="fileList.length !== 0" class="inner_img">
              <li v-for="(item, index) in fileList" :key='index'>
                <img :src='URL + item.url'>
                <div class="img_wrap">
                  <i class="el-icon-search" @click="handlePreview(item)"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btn" v-if="riskStatus === '501'">
        <button @click="handlePlease">确认</button>
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
      dialogVisibleImg: false,
      dialogImageUrl: '',
      URL: this.$root_url(),
      fileList: [],
      canIUpload: true,
      riskStatus: '500',
      loanDate: '',
      statusList: {
        '500': {title: '放款证明待上传', info: "企业暂未上传放款证明"},
        '501': {title: '放款证明待确认', info: "企业已提交放款证明，确认后进入还款阶段，本次融资将推送到您的债权中"},
        '502': {title: '放款证明已确认', info: "已确认企业上传放款证明"},
        '503': {title: '放款证明已确认', info: "已确认企业上传放款证明"},
        '700': {title: '等待还款', info: "已确认企业的放款证明，融资进入还款阶段，等待企业上传还款相关数据"}
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
          that.fileList = res.data.loan_info.loan_img
          that.loanDate = res.data.loan_info.loan_date
        }
      }
    })
  },
  methods: {
    handlePlease () {
      const that = this
      that.$ajax.put(`/api/financing/loan_process/${that.$route.query.id}/`, {loan_process_status: '700'}).then(res => {
        // console.log(res)
        that.riskStatus = '700'
      })
    },
    handlePreview(file) {
      console.log(file)
      this.dialogImageUrl = this.URL + file.url
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
        .u_line {
          height: 36px;
          font-size: 14px;
          width: 60%;
          margin: 0 auto;
          text-align: center;
        }
        .img_list {
          .inner_img {
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
        }
      }
    }
    .loan_date {
      // text-align: center;
      margin: 30px 0;
      span:first-child {
        color: #666;
      }
      span:last-child {
        color: #333;
      }
    }
    .btn {
      // margin: 51px 0;
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
