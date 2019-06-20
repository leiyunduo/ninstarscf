<template>
  <div class="financeAdmittance">
    <div class="info-enter">
      <div class="list_flex">
        <div class="top">
          <!-- <h3 class="h3">欢迎来到九星平台，您已经注册成功！完成企业认证后即可开始链式记账，融资等服务。</h3> -->
          <div class="error_tishi" v-if='errorTips && sTitle === false'>
            <h3><i class="el-icon-error"></i>您的企业认证审核未通过，请查看原因并<span>重新提交企业认证。</span></h3>
            <p class="p"><span>审核失败原因：</span>您好，你的注册人信息、企业资料信息审核失败</p>
            <ul>
              <li v-for="(item, index) in tipsList" :key="index">
                <p><span>问题{{index+1}}：</span>{{item.reason}}</p>
              </li>
            </ul>
          </div>
          <div class="error_tishi" v-if='sTitle === true'>
            <h3><i class="el-icon-error"></i>您有信息未通过认证,请<span>重新审核</span>。</h3>
          </div>
        </div>
        <div class="flex-list">
          <div class="table_left">
            <ul>
              <li :class="person_verified === 1 ? 'center_list' :  person_verified === 2 ? 'center_list' : person_verified === 3 ? 'no_list' : 'yes_list'">
                <span v-if="person_verified === 1 || person_verified === 2">1</span>
                <span v-if="person_verified === 3"><img src="../../../../static/img/authentication/no.png" alt=""></span>
                <span v-if="person_verified === 4"><img src="../../../../static/img/authentication/yes.png" alt=""></span>
                <p></p>
              </li>
              <li :class="company_verified === 1 ? '' :  company_verified === 2 ? 'center_list' : company_verified === 3 ? 'no_list' : 'yes_list'">
                <span v-if="company_verified === 1 || company_verified === 2">2</span>
                <span v-if="company_verified === 3"><img src="../../../../static/img/authentication/no.png" alt=""></span>
                <span v-if="company_verified === 4"><img src="../../../../static/img/authentication/yes.png" alt=""></span>
                <p></p>
              </li>
              <li :class="legal_person_verified === 1 ? '' :  legal_person_verified === 2 ? 'center_list' : legal_person_verified === 3 ? 'no_list' : 'yes_list'">
                <span v-if="legal_person_verified === 1 || legal_person_verified === 2">3</span>
                <span v-if="legal_person_verified === 3"><img src="../../../../static/img/authentication/no.png" alt=""></span>
                <span v-if="legal_person_verified === 4"><img src="../../../../static/img/authentication/yes.png" alt=""></span>
                <p></p>
              </li>
              <li :class="signed === false ? '' : 'yes_list'">
                <span v-if="signed === false">4</span>
                <span v-if="signed === true"><img src="../../../../static/img/authentication/yes.png" alt=""></span>
              </li>
            </ul>
          </div>
          <div class="table_list">
            <!-- 注册人信息 -->
            <div class="tab_bor">
              <div class="tab_left">
                <p>注册人信息</p>
                <span>请根据真实信息填写</span>
              </div>
              <div class="tab_right">
                <button size="mini" :class="{btn_class: person_verified !== 1}" @click="firstLegal">
                  <span :class="person_verified === 3 ? 'span_color' : person_verified === 4 ? 'span_color_yes' : 'span_color_other'">{{ person_verified === 1 ? personName = '请填写' : person_verified === 3 ? personName = '审核失败' : person_verified === 2 ? personName = '审核中' : '审核通过'}}</span>
                </button>
                <p v-if='person_verified !== 1' @click="selectAuth(-1)">查看</p>
              </div>
            </div>
            <!-- 填写 -->
            <div class="tab_bor">
              <div class="tab_left">
                <p>企业资料审核</p>
                <span>请根据真实信息填写企业信息</span>
              </div>
              <div class="tab_right">
                <button size="mini" :disabled="person_verified === 1" :class="[{active: person_verified === 1}, {btn_class: company_verified !== 1}]" @click="firstOne">
                  <span :class="company_verified === 3 ? 'span_color' : company_verified === 4 ? 'span_color_yes' : 'span_color_other'">{{ company_verified === 1 ? btnName = '开始填写' : company_verified === 3 ? btnName = '审核失败' : company_verified === 2 ? btnName = '审核中' : '审核通过'}}</span>
                </button>
                <p v-if='company_verified !== 1' @click="selectAuth(0)">查看</p>
              </div>
            </div>
            <!-- 企业认证 -->
            <div class="tab_bor">
              <div class="tab_left">
                <p>法人认证</p>
                <span>上传并填写企业材料、法人信息，认证企业</span>
              </div>
              <div class="tab_right">
                <button size="mini" :disabled="company_verified === 1" :class="[{active: company_verified === 1}, {btn_class: legal_person_verified !== 1}]" @click="startValidation">
                  <span :class="legal_person_verified === 3 ? 'span_color' : legal_person_verified === 4 ? 'span_color_yes' : 'span_color_other'">{{ legal_person_verified === 1 ? startValidations = '开始验证' : legal_person_verified === 2 ? startValidations = '审核中' : legal_person_verified === 3 ? startValidations = '审核失败' : '审核通过'}}</span>
                </button>
                <p v-if='legal_person_verified !== 1' @click="selectAuth(1)">查看</p>
              </div>
            </div>
            <!-- 企业账户激活 -->
            <!-- <div class="tab_bor">
              <div class="tab_left">
                <p>企业账户激活</p>
                <span>上传并填写企业材料、法人信息，认证企业</span>
              </div>
              <div class="tab_right">
                <button size="mini" :disabled="verify !== 4" :class="[{active: verify !== 4}, {btn_class: bank_active === true}]" @click="startOver">
                  <img v-if='bank_active === true' src="../../../../static/img/authentication/dui.png" alt="">
                  <span>{{ bank_active === true ? startOvers = '已激活' : startOvers = '开始激活' }}</span>
                </button>
                <p v-if='bank_active === true' @click="selectAuth(2)">查看</p>
              </div>
            </div> -->
            <!-- 协议签署 -->
            <div class="tab_bor">
              <div class="tab_left">
                <p>协议签署</p>
                <span>确认企业信息，在线签署<button @click="changeSigning">《九星平台企业协议》</button></span>
              </div>
              <div class="tab_right">
                <button size="mini" :disabled="company_verified !== 4 || legal_person_verified !== 4 || person_verified !== 4" :class="[{active: company_verified !== 4 || legal_person_verified !== 4 || person_verified !== 4}, {btn_class: signed === true}]" @click="sign">
                  <span :class="signed === false ? 'span_color' : signed === true ? 'span_color_yes' : 'span_color_other'">{{ signed === true ? signs = '已签署' : signs = '签署' }}</span>
                </button>
                <p v-if='signed === true' @click="selectAuth(3)">查看</p>
              </div>
            </div>
            <div class="bottom_btn">
              <button :disabled='signed === false' :class="[{btn_sign: signed === false}, {ok_sign: signed === true}]" @click="signClass">进入平台</button>
              <button class="ok_sign" @click="changeAppDialog" v-show="signed === true">变更申请</button>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
              <p class="ok_frame">确定要变更申请么?</p>
              <div slot="footer" class="frame">
                <button class="reset_Form" @click="dialogVisible = false">取 消</button>
                <button class="sel" @click="changeApp">确 定</button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '',
      btnName: '请填写',
      startValidations: '开始验证',
      startOvers: '开始激活',
      signs: '签署',
      authState: 3,
      changeAppStatus: false,
      dialogVisible: false,
      // 运营后台认证状态 2:审核中 3:审核不通过 4:审核通过
      // 个人信息
      person_verified: 1,
      // 企业信息是否上传
      company_verified: 1,
      // 法人信息是否上传
      legal_person_verified: 1,
      // 是否验证银行账户
      bank_active: false,
      // 是否签署协议
      signed: false,
      // 是否正在变更申请
      change_apply: false,
      // 错误提示
      tipsList: [],
      errorTips: false,
      sTitle: false
    }
  },
  mounted () {
    var that = this
    if (that.$route.query.s) {
      that.sTitle = true
    }
    that.$ajax.get('/api/company/status/').then(res => {
      // {
      //   运营后台认证状态 2:审核中 3:审核不通过 4:已审核
      //   "person_verified": False, #个人信息是否上传
      //   "company_verified": False, #企业信息是否上传
      //   "legal_person_verified": False, #法人信息是否上传
      //   "bank_active": False, # 是否验证银行账户
      //   "signed": False, # 是否签署协议
      //   "change_apply": False, # 是否正在变更申请
      // }
      // 个人信息
      that.person_verified = Number(res.data.person_verified)
      that.company_verified = Number(res.data.company_verified)
      that.legal_person_verified = Number(res.data.legal_person_verified)
      that.signed = res.data.signed
      that.change_apply = res.data.change_apply
      if (res.data.company_id) {
        window.localStorage.setItem('id', res.data.company_id)
      }
      // 未通过提示
      if (that.legal_person_verified === 3 || that.person_verified === 3 || that.company_verified === 3) {
        that.errorTips = true
        that.$ajax.get('/api/bms/verify/record/reason_info/').then(res => {
          that.tipsList = res.data
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 点击变更申请
    changeAppDialog () {
      var that = this
      that.dialogVisible = true
    },
    // 关闭
    handleClose () {
      var that = this
      that.dialogVisible = false
    },
    // 个人信息
    firstLegal () {
      var that = this
      // 未变更的处理
      if (that.change_apply === false) {
        if (that.person_verified === 1) {
          // 填写数据
          that.$router.push('/financeLegalOne')
        }
      } else {
        if (that.person_verified === 1) {
          // 填写数据
          that.$router.push({
            path: '/financeLegalOne',
            query: {
              eId: 2,
              change_apply: true
            }
          })
        }
      }
    },
    // 第一步
    firstOne () {
      var that = this
      // 未变更的处理
      if (that.change_apply === false) {
        if (that.company_verified === 1) {
          // 填写数据
          that.$router.push('/financeFirst')
        }
      } else {
        if (that.company_verified === 1) {
          that.$router.push({
            path: '/financeFirst',
            query: {
              eId: 2,
              change_apply: true
            }
          })
        }
      }
    },
    // 查看
    selectAuth (i) {
      var that = this
      if (that.change_apply === false) {
        if (i === -1) {
          // 审核失败
          if (that.person_verified === 3) {
            that.$router.push({
              path: '/financeLegalOne',
              query: {
                eId: 2
              }
            })
            // 审核中
          } else if (that.person_verified === 2) {
            that.$router.push({
              path: '/financeLegalOne',
              query: {
                eId: 1
              }
            })
            // 查看详情
          } else if (that.person_verified === 4) {
            that.$router.push({
              path: '/financeLegalOne',
              query: {
                eId: 1
              }
            })
          }
        } else if (i === 0) {
          // 审核失败
          if (that.company_verified === 3) {
            that.$router.push({
              path: '/financeFirst',
              query: {
                eId: 2
              }
            })
            // 审核中
          } else if (that.company_verified === 2) {
            that.$router.push({
              path: '/financeFirst',
              query: {
                eId: 1
              }
            })
            // 查看详情
          } else {
            that.$router.push({
              path: '/financeFirst',
              query: {
                eId: 1
              }
            })
          }
        } else if (i === 1) {
          // 审核失败
          if (that.legal_person_verified === 3) {
            that.$router.push({
              path: '/financeLegalPerson',
              query: {
                eId: 2
              }
            })
            // 审核中
          } else if (that.legal_person_verified === 2) {
            that.$router.push({
              path: '/financeLegalPerson',
              query: {
                eId: 1
              }
            })
            // 查看详情
          } else {
            that.$router.push({
              path: '/financeLegalPerson',
              query: {
                eId: 1
              }
            })
          }
        } else if (i === 2) {
          that.$router.push({
            path: '/financeActiva',
            query: {
              eId: 1
            }
          })
        } else if (i === 3) {
          that.$router.push({
            path: '/financeSigned',
            query: {
              eId: 1
            }
          })
        }
      } else {
        if (i === -1) {
          // 审核失败
          if (that.person_verified === 3) {
            that.$router.push({
              path: '/financeLegalOne',
              query: {
                eId: 2,
                change_apply: true
              }
            })
            // 审核中
          } else if (that.person_verified === 2) {
            that.$router.push({
              path: '/financeLegalOne',
              query: {
                eId: 1,
                change_apply: true
              }
            })
            // 查看详情
          } else if (that.person_verified === 4) {
            that.$router.push({
              path: '/financeLegalOne',
              query: {
                eId: 1,
                change_apply: true
              }
            })
          }
        } else if (i === 0) {
          // 审核失败
          if (that.company_verified === 3) {
            that.$router.push({
              path: '/financeFirst',
              query: {
                eId: 2,
                change_apply: true
              }
            })
            // 审核中
          } else if (that.company_verified === 2) {
            that.$router.push({
              path: '/financeFirst',
              query: {
                eId: 1,
                change_apply: true
              }
            })
            // 查看详情
          } else {
            that.$router.push({
              path: '/financeFirst',
              query: {
                eId: 1,
                change_apply: true
              }
            })
          }
        } else if (i === 1) {
          // 审核失败
          if (that.legal_person_verified === 3) {
            that.$router.push({
              path: '/financeLegalPerson',
              query: {
                eId: 2,
                change_apply: true
              }
            })
            // 审核中
          } else if (that.legal_person_verified === 2) {
            that.$router.push({
              path: '/financeLegalPerson',
              query: {
                eId: 1,
                change_apply: true
              }
            })
            // 查看详情
          } else {
            that.$router.push({
              path: '/financeLegalPerson',
              query: {
                eId: 1,
                change_apply: true
              }
            })
          }
        } else if (i === 2) {
          that.$router.push({
            path: '/financeActiva',
            query: {
              eId: 1,
              change_apply: true
            }
          })
        } else if (i === 3) {
          that.$router.push({
            path: '/financeSigned',
            query: {
              eId: 1,
              change_apply: true
            }
          })
        }
      }
    },
    // 法人认证
    startValidation () {
      var that = this
      if (that.change_apply === false) {
        if (that.legal_person_verified === 1) {
          that.$router.push('/financeLegalPerson')
        }
      } else {
        if (that.legal_person_verified === 1) {
          that.$router.push({
            path: '/financeLegalPerson',
            query: {
              eId: 2,
              change_apply: true
            }
          })
        }
      }
    },
    // 账号激活
    startOver () {
      var that = this
      // 激活
      if (that.change_apply === false) {
        if (that.bank_active === false) {
          // 填写数据
          that.$router.push({
            path: '/financeActiva'
          })
        }
      } else {
        if (that.legal_person === true) {
          that.$router.push({
            path: '/financeActiva',
            query: {
              eId: 2,
              change_apply: true
            }
          })
        }
      }
    },
    // 协议签署
    sign () {
      var that = this
      if (that.change_apply === false) {
        if (that.signed === false) {
          // 填写数据
          that.$router.push({
            path: '/financeSigned'
          })
        }
      } else {
        if (that.legal_person_verified === 4 || that.person_verified === 4 || that.company_verified === 4) {
          that.$router.push({
            path: '/financeSigned',
            query: {
              eId: 2,
              change_apply: true
            }
          })
        }
      }
    },
    signClass () {
      this.$router.push('/')
    },
    changeApp: function () {
      var that = this
      that.$ajax.patch('/api/company/change_apply/').then(res => {
        that.$router.push({
          path: '/financeFirst',
          query: {
            eId: 2,
            change_apply: true
          }
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    changeSigning () {
      this.$router.push({
        path: '/financeSigned',
        query: {
          eId: 1
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.financeAdmittance {
  width: 100%;
  background: #fff;
  min-height: 100%;
  //padding-top: 70px;
  .info-enter {
    font-size: 14px;
    position: relative;
    width: 100%;
    .list_flex {
      .top {
        height: 14px;
        height: auto;
        margin: 30px auto 0;
        padding-left: 114px;
        .h3 {
          color: #afbcc7;
          font-size: 12px;
          text-align: center;
          margin: 20px auto;
        }
        .error_tishi {
          height: auto;
          border: 1px solid #eaeaea;
          background: #fff;
          padding: 20px 30px;
          border-radius: 6px;
          h3 {
            font-size: 18px;
            line-height: 20px;
            font-weight: bold;
            .el-icon-error {
              font-size: 28px;
              color: red;
              display: inline-block;
              margin-right: 15px;
            }
            span {
              color: red;
              font-weight: bold;
            }
          }
          .p {
            padding: 10px 0 10px 40px;
            span {
              color: red;
            }
          }
          ul {
            padding-left: 40px;
            li {
              padding: 10px 0 0;
            }
          }
        }
      }
      .flex-list {
        display: flex;
        flex-direction: row;
        width: 100%;
      }
      .table_left {
        ul {
          li {
            position: relative;
            // padding-bottom: 51px;
            height: 80px;
            span {
              position: absolute;
              top: 32px;
              left: 40px;
              font-size:12px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
              display: inline-block;
              width:24px;
              height:24px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(220,220,220,1);
              border-radius:50%;
              text-align: center;
              line-height: 23px;
            }
            p {
              height: 50px;
              position: absolute;
              top: 59px;
              left: 51px;
              border: 1px dashed #b0b2b2;
            }
            img {
              margin-top: 5px;
            }
          }
        }
        .yes_list {
          span {
            background:rgba(255,255,255,1);
            border:1px solid rgba(82,196,26,1);
          }
          p {
            border:1px dashed rgba(82,196,26,1);
          }
        }
        .no_list {
          span {
            background:rgba(255,255,255,1);
            border:1px solid rgba(245,34,45,1);
          }
          p {
            border:1px dashed rgba(245,34,45,1);
          }
        }
        .center_list {
          span {
            color:rgba(235,97,0,1);
            border:1px solid #EB6100;
          }
          p {
            border:1px dashed #EB6100;
          }
        }
      }
    }
    .table_list {
      height: auto;
      margin: 0 90px;
      flex: 1;
      width: 100%;
      .tab_bor {
        height: 80px;
        border-bottom: 1px solid rgba(220,220,220,1);
        display: flex;
        flex-direction: row;
        .tab_left {
          flex: 1;
          p {
            font-size:14px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
            padding: 19px 0 13px 0;
          }
          span {
            display: block;
            font-size:14px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            button {
              color: rgba(235, 97, 0, 1);
              background: none;
              outline: none;
              border: none;
            }
          }
        }
        .tab_right {
          position: relative;
          display: flex;
          flex-direction: row;
          button {
            width: auto;
            min-width: 120px;
            border-radius: 3px;
            padding: 0 10px;
            outline: none;
            border: none;
            margin-right: 10px;
            background:#EF8133;
            border-radius:4px;
            height:38px;
            line-height: 38px;
            text-align: center;
            margin-top: 20px;
            font-size:14px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(254,254,254,1);
          }
          .btn_class {
            background: none;
            height: 38px;
            margin-right: 0;
            img {
              margin-right: 21px;
              float: left;
            }
            span {
              float: left;
              font-size:14px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:#eb6100;
              letter-spacing:0;
              min-width: 76px;
              text-align: left;
              padding-left: 40px;
            }
            .span_color {
              color:#F5222D;
            }
            .span_color_yes {
              color:#52C41A;
            }
            .span_color_other {
              color:#EB6100;
            }
          }
          .active {
            background-color: #ccc;
            border: #ccc;
          }
          p {
            height: 38px;
            margin-top: 20px;
            line-height: 38px;
            font-size:14px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(235,97,0,1);
            cursor: pointer;
            padding-right: 30px;
          }
        }
      }
      .bottom_btn {
        width: 100%;
        height: 200px;
        padding-top: 50px;
        button {
          outline: none;
          width:94px;
          height:40px;
          background:rgba(245,245,245,1);
          border:1px solid rgba(220,220,220,1);
          border-radius:4px;
          font-size:16px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(187,187,187,1);
          line-height: 32px;
        }
        .btn_sign {
          background:rgba(245,245,245,1);
          border-radius:4px;
        }
        .ok_sign {
          margin-right: 22px;
          width:94px;
          height:40px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(220,220,220,1);
          box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
          border-radius:4px;
          font-size:16px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
      }
    }
    .ok_frame {
      font-size: 18px;
    }
    .frame {
      .reset_Form {
        width: 80px;
        height: 30px;
        background: none;
        border: 1px solid #eb6100;
        color: #eb6100;
        border-radius: 5px;
        outline: none;
        line-height: 30px;
        text-align: center;
      }
      button {
        margin: 0 10px;
      }
      .sel {
        color: #fff;
        background: #eb6100;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border: none;
        outline: none;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
}
</style>
