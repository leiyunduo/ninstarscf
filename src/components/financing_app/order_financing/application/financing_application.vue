<template>
  <!-- 融资申请 -->
  <div id="financing_application">
    <div class="financing_application_list">
      <div class="title"><h3>金融机构选择</h3></div>
      <div class="btn_list">
        <button v-for="(item, index) in btnList" :key="index" :class="{action_btn: action_btn === index}" @click="handleTab(index)">{{item}}</button>
      </div>
      <!-- 定向发布 -->
      <div class="list" v-if='action_btn === 1'>
        <div class="content" v-if="bankList.length !== 0" v-for="(item, index) in bankList" :key='index'>
          <div>
            <img :src="item.avatar === '/static/default_avatar.png' ? 'static/img/tickets/default_bank.png' : $root_url() + item.avatar" alt="">
            <p @click="handleNav(item)">{{item.name}}</p>
            <button @click="item.sel = !item.sel" :style="item.sel ? 'background: #999': ''">{{item.sel ? '取消选择' : '选择'}}</button>
          </div>
          <div class="rate">
            <p>
              <span>银行贷款利率：</span>
              <span>{{(item.rate || '7.0') + '%'}} —— {{(item.rate_max || '10.0') + '%'}}</span>
            </p>
            <p>
              <span>本次预期利率：</span>
              <input type="text" placeholder="请输入接受的最大利率" v-model="item.expect_rate">
              <span>%</span>
            </p>
          </div>
          <div v-if="!item.customer" class='has_customer'>
            <div>
              <p style="color: #999">您还不是该金融机构客户，成为客户后您的融资申请将直接通过金融机构的预审。</p>
              <div class="btn_apply">
                <button @click="handleApply(item, index)">成为客户</button>
              </div>
            </div>
          </div>
          <div v-if="item.customer" class='has_customer'>
            <div v-if='item.customer.status === "0"'>
              <p style="color: #eb6100">您的申请正在审批，当您在该银行完成一笔融资后，您将成为该银行客户。</p>
            </div>
            <div v-if='item.customer.status === "1"'>
              <p style="color: green">您已经成为该银行客户。</p>
              <ul>
                <li>
                  <span>授信分组：</span>
                  <span>{{groupList[item.customer.group]}}</span>
                </li>
                <li>
                  <span>单笔融资授信额度（元）：</span>
                  <span>{{toThousands(item.customer.single_limit) || '未配置'}}</span>
                </li>
                <li>
                  <span>总融资授信额度（元）：</span>
                  <span>{{toThousands(item.customer.total_limit) || '未配置'}}</span>
                </li>
              </ul>
            </div>
            <div v-if='item.customer.status === "2"'>
              <p style="color: #ff0034">该银行拒绝了您之前的请求。</p>
              <div class="btn_apply">
                <button @click="handleApply(item, index)">再次申请</button>
              </div>
            </div>            
          </div>
        </div>
        <div class="second_list_none" v-if="bankList.length === 0">
          <img src="../../../../../static/img/other/none.png" alt="">
          <h4>本地区暂无银行加入</h4>
        </div>
      </div>
      <!-- 区域发布 -->
      <div class="regional_release" v-if='action_btn === 0'>
        <p>您的所在地区为<i class="el-icon-location-outline"></i><span>{{address}}</span>，提交申请后，您所在区域的金融机构都将看到您的融资申请</p>
      </div>
      <div class="submission">
        <button @click="handleSubmit">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'financingApplication',
  data () {
    return {
      btnList: ['区域发布', '定向发布'],
      action_btn: 1,
      bankList: [],
      groupList: ["未分组", "白名单", "黄名单", "黑名单"],
      address: ''
    }
  },
  created () {
    // let regionCode = '430000'
    let that = this
    this.$ajax.get('/api/financing/region_name/').then(res => {
      if (res.status === 200) {
        that.address = `${res.data.province} ${res.data.city} ${res.data.region}`
      }
    })
    this.$ajax.get(`/api/financing/institution_list/`).then(res => {
      console.log(res)
      if (res.status === 200) {
        res.data.forEach(val => {
          val.sel = false
        })
        this.bankList = res.data
      }
    })
  },
  methods: {
    handleSubmit () {
      let bankList = []
      const that = this
      let { action_btn } = that
      if (action_btn === 0) {
        this.$emit('bank', {bankList})
      } else {
        this['bankList'].forEach(val => {
          if (val['sel']) bankList.push({id: val['id'], expect_rate: val['expect_rate']})
        })
        let len = 0
        console.log(bankList)
        bankList.forEach(val => {
          if (/^[0-9]+([.]{1}[0-9]{1,4})?$/.test(val['expect_rate'])) {
            len++
          }
        })
        if (bankList.length === 0) {
          that['$message'].error('至少选择一家银行')
        } else {
          if (bankList.length !== len) {
            that.$message.error('请输入正确的选择银行的最大贷款利率。')
          } else {
            console.log(bankList)
            this.$emit('bank', {bankList})
          }
        }
      }
    },
    // 查看银行主页
    handleNav (item) {
      window.open('#/institutionBlog?bid=' + item.id, '_blank')
    },
    // 申请成为客户
    handleApply (item, index) {
      const that = this
      let bankList = that.bankList
      that.$ajax.post('/api/institution/customer/', {institution: item.id, req_msg: '融资申请列表添加'}).then(res => {
        // console.log(res)
        if (res.status === 201) {
          let obj = {status: '0'}
          this.bankList[index].customer = obj
        }
        that.bankList = bankList
      })
    },
    // 选择发布方式
    handleTab (index) {
      if (index === 0) {
        window.$message.error('正在开发中。。')
      } else {
        this.action_btn = index
      }
    }
  }
}
</script>

<style lang="less" scoped>
#financing_application {
  width:100%;
  // min-height: 100%;
  .financing_application_list {
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
    .btn_list {
      display: flex;
      flex-direction: row;
      padding-left: 31px;
      margin: 16px 10px;
      button {
        background:#b7b7b7;
        border-radius:2px;
        width:120px;
        height:30px;
        border: none;
        outline: none;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#ffffff;
        letter-spacing:0;
        text-align:center;
      }
      .action_btn {
        background:#f48537;
      }
      button:last-child {
        margin-left: 16px;
      }
    }
    .list {
      width:100%;
      height:100%;
      padding: 0 39px 0 32px;
      .content {
        // height:88px;
        background:#ffffff;
        border: 1px solid #e1e6f0;
        // border-bottom:1px dashed #e1e6f0;
        // border-top: none;
        margin-top: 30px;
        &>div:first-child {
          overflow: hidden;
          border-bottom: 1px dashed #e1e6f0;
          // padding: 0 12px;
          img {
            border-radius: 50%;
            width:66px;
            height:65px;
            float: left;
            margin: 12px 22px;
          }
          p {
            float: left;
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#e87626;
            letter-spacing:0;
            text-align:left;
            text-decoration: underline;
            padding-top: 35px;
            font-weight: bold;
            cursor: pointer;
          }
          button {
            float: right;
            background:#f48537;
            border-radius:2px;
            width:118px;
            height:30px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
            margin:  30px 33px 0 0;
            outline: none;
            border: none;
          }
        }
        .has_customer {
          &>div {
            // padding-top: 12px;
            p {
              line-height: 32px;
              padding: 0 20px;
              // color: #333;
              // padding-bottom: 12px;
              font-weight: bolder;
              font-size: 14px;
            }
            ul {
              display: flex;
              padding: 12px 20px;
              font-size: 14px;
              padding-top: 0;
              justify-content: space-between;
              li {
                display: flex;
                width: 33%;
                line-height: 36px;
                border-right: 1px solid #e1e6f0;
                // text-align: center;
                span:first-child {
                  width: 36%;
                  // text-align: right;
                  color: #666;
                  // padding: 0 10px;
                }
                span:last-child {
                  color: #333;
                  font-weight: bold;
                }
              }
              li:last-child {
                border: none;
              }
            }
            .btn_apply {
              margin-bottom: 12px;
              padding: 0 20px;
              button {
                height: 30px;
                width: 72px;
                border: none;
                background: #eb6100;
                border-radius: 2px;
                color: #fff;
              }
            }
          }
        }
        .rate {
          // padding: 0 20px;
          display: flex;
          height: 40px;
          border-bottom: 1px dashed #e1e6f0;
          &>p {
            padding: 0 20px;
            width: 50%;
            line-height: 40px;
            font-size: 14px;
            span:first-child {
              color: #333;
              font-weight: bold;
            }
            input {
              border: 1px solid #eaeaea;
              margin: 0;
              padding: 0 5px;
              height: 26px;
            }
            span:last-child {
              color: #666;
            }
          }
        }
      }
      .btn_style {
        background:#cccccc;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#ffffff;
        letter-spacing:0;
        text-align:center;
      }
      .content:first-child {
        border-top:1px solid #e1e6f0;
      }
      .content:last-child {
        border-bottom:1px solid #e1e6f0;
      }
      .second_list_none {
        text-align: center;
        min-height: 200px;
        color: #999;
        img {
          width:162px;
          height:125px;
          margin-top: 20px;
        }
      }
    }
    .regional_release {
      padding-top: 68px;
      text-align: center;
      p {
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:center;
        width: 500px;
        margin: 0 auto;
        padding-bottom: 100px;
        i {
          color:#eb6100;
          font-weight: bold;
        }
        span {
          color:#eb6100;
          font-weight: bold;
        }
      }
    }
    .submission {
      text-align: center;
      padding: 24px 0;
      button {
        background:#e87626;
        border-radius:2px;
        width:120px;
        height:30px;
        border: none;
        outline: none;
        font-family:PingFangSC-Semibold;
        font-size:12px;
        color:#ffffff;
        letter-spacing:0;
        text-align:center;
      }
    }
  }
}
</style>
