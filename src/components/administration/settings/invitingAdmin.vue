<template>
  <div class="invitingAdmin">
    <div class='info-enter'>
      <div class="forms">
        <!-- 我的邀请 -->
        <div class="me_inviting" v-show="meInviting">
          <h3>我的邀请</h3>
          <div class="tel_email">
            <div class="list">
              <div class="top">
                <img src="../../../../static/img/prompt.png" alt="">
                <p>请填写您要邀请企业的联系方式（手机号或者邮箱地址）</p>
              </div>
              <div class="center">
                <div class="button_list">
                  <button :class="{active: telActive}" @click="telClick">手机号码</button>
                  <button :class="{active: emailActive}" @click="emailClick">邮箱地址</button>
                </div>
                <input type="text" v-show="telActive" maxlength="11" v-model="tel" placeholder="---请输入手机号码---">
                <input type="text" v-show="emailActive" maxlength="32" v-model="email" placeholder="---请输入邮箱地址---">
                <div class="button_lists">
                  <button @click="sendOut">发送</button>
                  <button @click="cancel">取消</button>
                </div>
              </div>
              <div class="bottom">
                <p>注意：联系方式请确认后再发送，发送成功后不得修改</p>
                <p>邀请码还剩余<span>{{limit}}</span>次</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 我的邀请列表 -->
        <div class="me_inviting_list" v-show="meInvitingList && !hideList">
          <div>
            <span>我的邀请</span>
            <button class="start" @click="startInviting">开始邀请</button></div>
          <table>
            <tr>
              <th>序号</th>
              <th>我的邀请码</th>
              <th>我邀请的企业</th>
              <th>注册类型</th>
              <th>认证状态</th>
              <th>邀请方式</th>
              <th>注册账号</th>
              <th>邀请时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in tableList" :key="index" v-if="tableList.length !== 0">
              <td>{{index + 1}}</td>
              <td>{{item.code}}</td>
              <td><span>{{item.invitee}}</span><span v-if="item.invitee === null">未认证</span></td>
              <td><span>{{signType[item.account_type]}}</span><span v-if="item.account_type === null">未认证</span></td>
              <td>
                <span v-if="item.access_status === true">已认证</span>
                <span v-if="item.access_status === false">未认证</span>
              </td>
              <td>{{item.to_phone}}</td>
              <td><span>{{item.reg_account}}</span><span v-if="item.reg_account === null">未认证</span></td>
              <td>{{item.create_time}}</td>
              <td>
                <button class="active1" v-if="item.can_remind === false">再次提醒</button>
                <button v-if="item.can_remind === true" @click="reminding(item, index)">再次提醒</button>
              </td>
            </tr>
            <tr class="listLine" v-if="tableList.length === 0">
              <th colspan='9'>暂无数据</th>
            </tr>
          </table>
        </div>
        <div class="block" v-show="meInvitingList && !hideList">
          <el-pagination v-if="total" @current-change="handleSizeChange"
            :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <!-- 发送中 -->
        <div class="send_in" v-show="sendIn">
          <h3>我的邀请码发送中</h3>
          <p>发送方：<span>12515151</span></p>
          <button>返回</button>
        </div>
        <!-- 发送成功 -->
        <div class="send_ok" v-show="sendOk">
          <h3>申请已达到上限，无法邀请更多企业</h3>
          <p>如需帮助请联系我们</p>
          <p>客服电话：<span>18511618477</span></p>
          <button @click="cancel">返回</button>
        </div>
        <div class="send_ok" v-show="sendOkList">
          <h3>发送成功</h3>
          <p>邀请码：<span>{{inviteToJoin.invite_code}}</span></p>
          <p>受邀请方：<span>{{inviteToJoin.to_phone}}</span></p>
          <button @click="cancel">返回</button>
        </div>
        <!-- 发送失败 -->
        <div class="send_fail" v-show="sendFail">
          <h3>邀请码发送失败</h3>
          <p>邀请码：<span>{{inviteToJoin.invite_code}}</span></p>
          <p>受邀请方：<span>{{inviteToJoin.to_phone}}</span></p>
          <div>
            <button @click="cancelBank">再次发送</button>
            <button @click="cancel">返回</button>
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
      name: 'invitingAdmin',
      telActive: true,
      emailActive: false,
      // 手机号、
      tel: '',
      signType: {institution: '金融机构', business: '企业', serviceprovider: '服务机构（企业）'},
      // 邮箱地址、
      email: '',
      // 我的邀请
      meInviting: false,
      // 我的邀请列表
      meInvitingList: true,
      // 发送中
      sendIn: false,
      // 发送成功
      sendOkList: false,
      sendOk: false,
      // 发送失败
      sendFail: false,
      // 所有邀请码列表
      tableList: [],
      // 已使用次数
      limit: '',
      // 发送成功的数据
      inviteToJoin: {
        invite_code: '',
        to_phone: ''
      },
      // 分页
      currPage: 1,
      total: 2,
      pageSize: 5
    }
  },
  props: {
    hideList: {
      type: Boolean
    }
  },
  mounted () {
    var that = this
    if (that.hideList) that.meInviting = true
    // 获取我发送的所有邀请码
    that.$ajax.get('/api/invite_code/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
      that.tableList = res.data.results
      this.total = res.data.count
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      var that = this
      this.currPage = val
      that.$ajax.get('/api/invite_code/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
        that.tableList = res.data.results
        this.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 再次发送
    cancelBank () {
      var that = this
      that.meInviting = true
      that.meInvitingList = false
      that.sendOk = false
      that.sendFail = false
      that.sendIn = false
    },
    // 再次提醒
    reminding (item, index) {
      var that = this
      that.$ajax.put(`/api/invite_code/` + item.id + '/').then(res => {
        that.$message.success('发送成功')
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 开始邀请
    startInviting () {
      var that = this
      that.meInviting = true
      that.meInvitingList = false
      that.$ajax.get('/api/invite_code/invite_count/').then(res => {
        that.limit = res.data
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 取消
    cancel () {
      var that = this
      if (that.hideList) {
        that.$emit('hideMoadal', false)
      } else {
        that.meInviting = false
      }
      that.meInvitingList = true
      that.sendOk = false
      that.sendFail = false
      that.sendIn = false
      that.sendOkList = false
      // 获取我发送的所有邀请码
      that.$ajax.get('/api/invite_code/').then(res => {
        that.tableList = res.data.results
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 发送邀请码
    sendOut () {
      var that = this
      if (that.telActive === true) {
        if (that.tel === '') {
          that.$message.error('请输入手机号码')
        } else {
          if (!(/^[1][3,4,5,6,7,8][0-9]{9}$/.test(that.tel))) {
            that.$message.error('请输入正确的手机号码')
          } else {
            that.$ajax.post('/api/invite_code/', {phone: that.tel}).then(res => {
              that.inviteToJoin = res.data
              that.meInviting = false 
              that.sendOkList = true
              that.$message.success('邀请码已发送至：' + that.tel)
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }
        }
      } else if (that.emailActive === true) {
        if (that.email === '') {
          that.$message.error('请输入邮箱地址')
        } else {
          if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(that.email))) {
            that.$message.error('请输入正确的邮箱地址')
          } else {
            that.$ajax.post('/api/invite_code/', {email: that.email}).then(res => {
              that.meInviting = false
              that.sendOkList = true
              that.inviteToJoin = res.data
              that.$message.success('邀请码已发送至：' + that.email)
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }
        }
      }
    },
    // 手机号码
    telClick () {
      var that = this
      that.telActive = true
      that.emailActive = false
    },
    // 邮箱地址
    emailClick () {
      var that = this
      that.telActive = false
      that.emailActive = true
    }
  }
}
</script>

<style lang="less" scoped>
.invitingAdmin {
  width: 100%;
  background: #fdfdfd;
  margin: 0 auto;
  .me_inviting {
    height: auto;
    width: 100%;
    background: #fff;
    border: 1px solid #eceeef;
    h3 {
      height: 60px;
      font-size: 18px;
      color: #333;
      background: #e6e9ea;
      padding-left: 48px;
      line-height: 60px;
    }
    .tel_email {
      text-align: center;
      padding-top: 46px;
      padding-bottom: 54px;
      .list {
        .top {
          height: 38px;
          line-height: 38px;
          img {
            position: absolute;
            margin-left: -30px;
            margin-top: 8px;
          }
          p {
            display: inline-block;
            // height: 30px;
            width: 358px;
            border: 1px solid #71cef0;
            background: #f4fbff;
            font-size: 12px;
            color:  #b1bec8;
            line-height: 30px;
          }
        }
        .center {
          margin-top: 35px;
          text-align: center;
          .button_list {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-bottom: 40px;
            button {
              margin: 0 50px;
              font-size: 14px;
              border: none;
              outline: none;
              background: none;
              color: #666666;
              padding-bottom: 8px;
            }
            .active {
              color: #eb6100;
              border-bottom: 3px solid #eb6100;
            }
          }
          input {
            width: 370px;
            height: 40px;
            border: 1px solid #afbcc7;
            border-radius: 5px;
            text-align: center;
            outline: none;
          }
          .button_lists {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 35px;
            margin-bottom: 60px;
            button:first-child {
              width: 90px;
              height: 30px;
              margin: 0 50px;
              font-size: 14px;
              border: none;
              outline: none;
              background: #eb6100;
              color: #fff;
              border-radius: 5px;
            }
            button:last-child {
              width: 90px;
              height: 30px;
              margin: 0 50px;
              font-size: 14px;
              outline: none;
              background: #fff;
              border: 1px solid #eb6100;
              color: #eb6100;
              border-radius: 5px;
            }
          }
        }
        .bottom {
          width: 355px;
          height: 50px;
          border: 1px solid #71cef0;
          background: #f4fbff;
          margin: 0 auto;
          padding-top: 5px;
          line-height: 20px;
          p {
            color: #b1bec8;
            font-size: 12px;
            span {
              font-size: 14px;
              color: #eb6100;
            }
          }
        }
      }
    }
  }
  .me_inviting_list {
    height: auto;
    width: 100%;
    background: #fff;
    border: 1px solid #eceeef;
    div {
      height: 60px;
      font-size: 18px;
      color: #333;
      padding: 0 50px;
      line-height: 60px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        height: 1px;
        width: 60%;
        background: #e7ebee;
        display: inline-block;
        margin-left: 54px;
      }
      .start {
        width: 90px;
        height: 30px;
        background: #eb6100;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 5px;
      }
    }
    table {
      width: 100%;
      tr {
        display: flex;
        flex-direction: row;
        th {
          flex: 1;
          padding-left: 20px;
          text-align: left;
          height: 52px;
          line-height: 52px;
          background: #f2f4f4;
          font-size: 14px;
          color: #666666;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        th:first-child {
          text-align: center;
        }
        td:first-child {
          text-align: center;
        }
        td {
          flex: 1;
          padding-left: 20px;
          text-align: left;
          line-height: 50px;
          height: 50px;
          border-bottom: 1px solid #e7ebee;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#999999;
          letter-spacing:0;
          text-align:left;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          button {
            border: none;
            outline: none;
            background: none;
            color: #eb6100;
            width: auto;
            text-align: left;
          }
          .active1 {
            color: #999999;
          }
        }
      }
      .listLine {
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        th {
          background: #fff;
          color: #cccccc;
        }
      }
    }
  }
  .block {
    margin: 20px auto;
    text-align: center;
  }
  .send_in {
    height: auto;
    width: 100%;
    background: #fff;
    max-width: 950px;
    min-width: 950px;
    padding-top: 100px;
    text-align: center;
    border: 1px solid #eceeef;
    h3 {
      font-size: 28px;
      color: #333;
      background: #fff;
      padding-bottom: 52px;
    }
    p {
      padding-bottom: 150px;
      font-size: 20px;
      color: #eb6100;
    }
    button {
      margin-bottom: 64px;
      width: 90px;
      height: 30px;
      border-radius: 5px;
      border: none;
      outline: none;
      background: #eb6100;
      color: #fff;
    }
  }
  .send_ok {
    height: auto;
    width: 100%;
    max-width: 950px;
    min-width: 850px;
    background: #fff;
    padding-top: 100px;
    text-align: center;
    border: 1px solid #eceeef;
    h3 {
      font-size: 28px;
      color: #333;
      background: #fff;
    }
    p {
      padding-top: 40px;
      font-size: 20px;
      color: #eb6100;
    }
    button {
      margin-top: 80px;
      margin-bottom: 64px;
      width: 90px;
      height: 30px;
      border-radius: 5px;
      border: none;
      outline: none;
      background: #eb6100;
      color: #fff;
    }
  }
  .send_fail {
    height: auto;
    width: 100%;
    background: #fff;
    margin-top: 30px;
    padding-top: 100px;
    text-align: center;
    border: 1px solid #eceeef;
    h3 {
      font-size: 28px;
      color: #333;
      background: #fff;
    }
    p {
      padding-top: 40px;
      font-size: 20px;
      color: #eb6100;
    }
    button {
      width: 90px;
      height: 30px;
      border-radius: 5px;
      border: none;
      outline: none;
      background: #eb6100;
      color: #fff;
      margin: 80px 20px 64px 20px;
    }
  }
}
</style>
