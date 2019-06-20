<template>
  <div id="myApply">
    <!-- <appNav :father="{selIndex: 0}" type="1"></appNav> -->
    <div class="myApply_list">
      <div class="navs">
        <h3><img src="../../../../static/img/leftbar/a.png" alt=""><span @click="nextClick">我的企业</span><i class="el-icon-arrow-right"></i><span>成员申请</span></h3>
      </div>
      <div class="list_content">
        <div class="content">
          <div class="list" v-for='(item, index) in businessData' :key="index" v-if='businessData.length > 0'>
            <el-row>
              <el-col :xs="7" :sm="7" :md="9" :lg="7" :xl="7">
                <div class="left">
                  <h3>企业信息</h3>
                  <div class="three">
                    <p @click="acceptClick(item)">{{item.business_info.name}}</p>
                    <!-- <el-tooltip class="item" effect="dark" content="九星认证" placement="top-start">
                      <span class="jiu" :class="{grey: item.business_info.ns_approved_status === false}">九</span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="天威诚信" placement="top-start">
                      <span class="tian" :class="{grey: item.business_info.twcx_approved_status === false}">天</span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="CFCA" placement="top-start">
                      <span class="c" :class="{grey: item.business_info.cfca_approved_status === false}">C</span>
                    </el-tooltip> -->
                    <el-tooltip class="item" effect="dark" content="企业认证" placement="top-start">
                      <img src="../../../../static/img/authentication/jiuxing.png" alt="">
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="天威诚信" placement="top-start">
                      <img v-if='item.business_info.twcx_approved_status === true' src="../../../../static/img/authentication/tw-2.png" alt="">
                      <img v-if='item.business_info.twcx_approved_status === false' src="../../../../static/img/authentication/tw-1.png" alt="">
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="CFCA" placement="top-start">
                      <img v-if='item.business_info.cfca_approved_status === true' src="../../../../static/img/authentication/CFCA-2.png" alt="">
                      <img v-if='item.business_info.cfca_approved_status === false' src="../../../../static/img/authentication/CFCA-1.png" alt="">
                    </el-tooltip>
                  </div>
                  <div class="left_bottom">
                    <p>企业规模：大型企业</p>
                    <button @click="communicate(index, item)">立即沟通</button>
                  </div>
                </div>
              </el-col>
              <el-col :xs="10" :sm="10" :md="9" :lg="10" :xl="10">
                <div class="center">
                  <h3>申请说明</h3>
                  <div class="textarea" v-if='item.req_msg'>{{item.req_msg}}</div>
                  <div class="textarea" v-else>企业请求加入助贷</div>
                  <p>申请时间：{{item.create_time}}</p>
                </div>
              </el-col>
              <el-col :xs="7" :sm="7" :md="6" :lg="7" :xl="7">
                <div class="right">
                  <!-- 是否接受 -->
                  <div class="accept_refuse" v-if="item.status === '0'">
                    <button @click="acceptClick(item, index)">去审核</button>
                    <button @click="refuseClick(item, index)">拒绝</button>
                  </div>
                  <!-- 接受 -->
                  <div class="accept" v-if="item.status === '1'">
                    <button>已通过</button>
                    <button @click="managementClick(item, index)">授信管理</button>
                  </div>
                  <!-- 拒绝 -->
                  <div class="refuse" v-if="item.status === '2'">
                    <button>已拒绝</button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-if="businessData.length === 0" style="text-align:center;font-size:16px;font-weight:bold;padding: 30px 0;">暂无</div>
          <div class="block">
            <el-pagination v-if="total" @current-change="handleSizeChange"
              :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 拒绝原因 -->
    <el-dialog align='center' :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
      <div class="reasons_for_refusal">
        <h3><i class="el-icon-info"></i>拒绝说明</h3>
        <div>
          <textarea name="" id="" cols="30" rows="10" v-model="res_msg" placeholder="请说明拒绝理由"></textarea>
        </div>
        <button @click="refuseOK" style="background: #eb6100;">确 定</button>
        <button @click="dialogVisible = false" style="background: #d2d2d2;">取 消</button>
      </div>
    </el-dialog>
    <!-- 授信管理 -->
    <el-dialog align='center' :visible.sync="managementVisible" width="570px" :before-close="handleClose">
      <div class="reasons_for_refusal">
        <h3>助贷授信管理</h3>
        <div class="input_list">
          <el-form ref="form" :model="form" label-width="170px">
            <el-form-item label="助贷授信：">
              <span style="display:inline-block;width: 250px;color:#c0c4cc;text-align: left;">{{form.name}}</span>
            </el-form-item>
            <el-form-item label="企业授信等级：">
              <el-select v-model="form.group" placeholder="请选择企业授信等级" style="width: 250px;" size="small">
                <el-option label="未授信企业" value="0"></el-option>
                <el-option label="白名单企业" value="1"></el-option>
                <el-option label="黄名单企业" value="2"></el-option>
                <el-option label="黑名单企业" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="融资助贷授信总额度：">
              <el-input v-model="form.total_limit" style="width: 250px;text-align:right;" size="small" :disabled="form.group !== '1'" />
              <span class="span">（元）</span>
            </el-form-item>
            <el-form-item label="单笔融资助贷授信额度：">
              <el-input v-model="form.single_limit" style="width: 250px;text-align:right;" size="small" :disabled="form.group !== '1'" />
              <span class="span">（元）</span>
            </el-form-item>
            <el-form-item label="助贷占比：">
              <el-input v-model="form.rate" style="width: 250px;text-align:right;" size="small" :disabled="form.group !== '1'" />
              <span class="spans">%</span>
            </el-form-item>
            <el-form-item label-width="0" v-if="form.group === '1'">
              <div class="radio_list">
                <el-radio v-model="form.is_auto_loan_aid" label="false" size="mini">手动授信</el-radio>
                <el-radio v-model="form.is_auto_loan_aid" label="true" size="mini">自动授信</el-radio>
              </div>
            </el-form-item>
            <el-form-item label-width="40px" v-if="form.group === '1' && form.is_auto_loan_aid === 'true'">
              <span class="span_zi">自动授信：您选择自动授信后，授信企业在提交单笔融资申请后（融资需求不超过单笔融资助贷授信额度，且累计额度不超过融资助贷授信总额度）将自动为此次融资进行助贷。</span>
            </el-form-item>
          </el-form>
        </div>
        <button class="ok" @click="managementOK">确 定</button>
        <button class="cancel" @click="managementVisible = false">取 消</button>
      </div>
      <el-dialog width="500px" title="助贷授信确认方式选择" :visible.sync="innerVisible" append-to-body>
        <div class="phone_email">
          <h3>可选择方式</h3>
          <div class="email">
            <p>通过注册邮箱*******66@gmail.com接收验证码进行身份验证</p>
          </div>
          <div class="phone">
            <p>通过注册手机号码*******8432接收验证码进行身份验证</p>
          </div>
          <button class="cancel" @click="cancelClick">返回</button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
// import AppNav from '../../financing/financingManege'
export default {
  name: 'myApply',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      // 说明
      give_reasons: '对方企业请求加入助贷',
      // 拒绝原因
      dialogVisible: false,
      res_msg: '',
      refuse_id: '',
      // 授信管理
      managementVisible: false,
      member_id: '',
      // 助贷授信管理
      form: {
        name: '',
        group: '',
        rate: '',
        total_limit: '',
        single_limit: '',
        is_auto_loan_aid: 'false'
      },
      // 助贷确认选择方式
      innerVisible: false,
      // 分页
      currPage: 1,
      total: '',
      pageSize: 5,
      // 申请列表
      businessData: [],
      message: ''
    }
  },
  mounted () {
    const that = this
    that.$ajax.get('/api/fund/member/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
      that.businessData = res.data.results
      that.total = res.data.count
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      const that = this
      that.currPage = val
      that.$ajax.get('/api/fund/member/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
        that.businessData = res.data.results
        that.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 立即沟通
    communicate (index, friend) {
      const that = this
      that.message = 1
      that.$emit('listerToChild', that.message, friend.business_info.account_id, friend.business_info.name)
    },
    // 上一级
    nextClick () {
      const that = this
      that.$router.push('/myEnterprise')
    },
    // 接受
    acceptClick (item) {
      // const that = this
      console.log(item)
      if (item.status === '0') {
        window.open('#/enterpriseBlog?bType=2&auth=1&aid=' + item.id + '&bid=' + item.business, '_black')
      } else {
        window.open('#/enterpriseBlog?bType=2&aid=' + item.id + '&bid=' + item.business, '_black')        
      }
    },
    // 点击拒绝按钮
    refuseClick (item, index) {
      const that = this
      that.dialogVisible = true
      that.refuse_id = item.id
    },
    // 确定拒绝
    refuseOK () {
      const that = this
      if (that.res_msg !== '') {
        that.$ajax.put(`/api/fund/member/` + that.refuse_id + '/', {status: '2', res_msg: that.res_msg}).then(res => {
          that.dialogVisible = false
          that.$message.success('拒绝成功')
          that.$ajax.get('/api/fund/member/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
            that.businessData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        that.$message.error('请说明拒绝理由')
      }
    },
    // 授信管理
    managementClick (i, index) {
      const that = this
      that.form.rate = ''
      that.form.total_limit = ''
      that.form.single_limit = ''
      that.form.name = i.business_info.name
      that.form.group = ''
      that.member_id = i.id
      that.form.is_auto_loan_aid = 'false'
      that.managementVisible = true
    },
    // 确定授信
    managementOK () {
      const that = this
      if (that.form.group === '1') {
        // 白名单
        if (that.form.total_limit === '') {
          that.$message.error('请输入融资助贷授信总额度')
        } else {
          if (that.form.single_limit === '') {
            that.$message.error('请输入单笔融资助贷授信额度')
          } else {
            if (that.form.rate === '') {
              that.$message.error('请输入助贷占比')
            } else {
              if (Number(that.form.rate) === 0) {
                that.$message.error('助贷占比不能位0')
              } else {
                if (Number(that.form.total_limit) < Number(that.form.single_limit)) {
                  that.$message.error('融资助贷授信总额度不能小于单笔融资助贷授信额度')
                } else {
                  that.managementVisible = false
                  // that.innerVisible = true
                  that.$ajax.put(`/api/fund/member/` + that.member_id + '/', {...that.form}).then(res => {
                    that.$message.success('授信成功')
                    that.$ajax.get('/api/fund/member/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
                      that.businessData = res.data.results
                      that.total = res.data.count
                    }).catch(err => {
                      that.$message.error(err.response.data.err_msg)
                    })
                  }).catch(err => {
                    that.$message.error(err.response.data.err_msg)
                  })
                }
              }
            }
          }
        }
      } else {
        that.managementVisible = false
        that.$ajax.put(`/api/fund/member/` + that.member_id + '/', {name: that.form.name, group: that.form.group}).then(res => {
          that.$message.success('授信成功')
          that.$ajax.get('/api/fund/member/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
            that.businessData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 返回
    cancelClick () {
      const that = this
      that.innerVisible = false
      that.managementVisible = true
    },
    // 取消
    handleClose () {
      const that = this
      that.dialogVisible = false
      that.managementVisible = false
      that.innerVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
#myApply {
  //padding-top: 70px;
  background: #f7f7f7;
  min-height: 100%;
  width: 100%;
  display: flex;
  .myApply_list {
    width: 100%;
    .navs {
      height: 60px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      padding: 0 35px;
      background: #fff;
      h3 {
        height: 60px;
        padding-top: 18px;
        font-family:PingFangSC-Medium;
        font-size:14px;
        color:#333;
        letter-spacing:0;
        cursor: pointer;
        img {
          margin: 2px 15px 0;
          float: left;
        }
        span:last-child {
          display: inline-block;
          padding: 0 5px;
          color: #333;
          font-size: 14px;
        }
        .el-icon-arrow-right {
          display: inline-block;
          padding: 0 5px;
        }
      }
    }
    .list_content {
      padding: 10px 100px 20px 50px;
      width: 100%;
      height: 100%;
      .content {
        min-width: 1245px;
        height: auto;
        background: #fff;
        border: 1px solid #eeeeee;
        border-radius: 2px;
        padding: 30px;
        .list {
          height: 168px;
          width: 100%;
          border: 1px solid #eeeeee;
          margin-bottom: 20px;
          border-radius: 26px;
          background: #fff6ee;
          .left {
            padding-top: 13px;
            padding-left: 50px;
            h3 {
              color: #333333;
              font-size: 16px;
              font-weight: bold;
            }
            .three {
              margin-top: 23px;
              p {
                // display: inline-block;
                color: #eb6100;
                text-decoration: underline;
                cursor: pointer;
                font-weight: bold;
                font-size: 18px;
                min-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              span {
                display: inline-block;
                width: 30px;
                height: 16px;
                font-size: 12px;
                color: #fff;
                text-align: center;
                line-height: 16px;
                border-radius: 2px;
                margin-left: 15px;
                margin-top: 5px;
              }
              .jiu {
                background: #ff3131;
                border: 1px solid #eb0045;
              }
              .tian {
                background: #19b1ff;
                border: 1px solid #005db9;
              }
              .c {
                background: #ffde2a;
                border: 1px solid #f3ce00;
              }
              .grey {
                background: #999;
                border: 1px solid #666;
              }
            }
            .left_bottom {
              margin-top: 10px;
              p {
                display: inline-block;
                font-size: 14px;
                color: #666666;
              }
              button {
                width: 127px;
                height: 33px;
                background: #ec6941;
                color: #fff;
                outline: none;
                border: none;
                border-radius: 20px;
                margin-left: 32px;
              }
            }
          }
          .center {
            padding-top: 13px;
            padding-left: 50px;
            h3 {
              color: #333333;
              font-size: 16px;
              font-weight: bold;
            }
            .textarea {
              width: 100%;
              height: 80px;
              border: 1px solid #eeeeee;
              outline: none;
              padding: 10px;
              border-radius: 15px;
              background: #fff;
              margin-top: 8px;
              color: #666666;
              font-size: 12px;
            }
            p {
              padding: 8px 2px 0;
              color: #adabaa;
              font-size: 14px;
            }
          }
          .right {
            .accept_refuse {
              padding-top: 39px;
              button {
                width: 120px;
                height: 36px;
                border-radius: 4px;
                outline: none;
                color: #fff;
                border: none;
                display: block;
                margin: 0 auto;
              }
              button:first-child {
                background: #5aa2f7;
                margin-bottom: 18px;
              }
              button:last-child {
                background: #f65962;
              }
            }
            .accept {
              padding-top: 44px;
              button {
                width: 120px;
                height: 36px;
                border-radius: 4px;
                outline: none;
                border: none;
                display: block;
                margin: 0 auto;
                background: none;
              }
              button:first-child {
                color: #666666;
                margin-bottom: 15px;
                font-size: 16px;
              }
              button:last-child {
                color: #eb6100;
                font-size: 18px;
                font-weight: bold;
                text-decoration: underline;
              }
            }
            .refuse {
              padding-top: 65px;
              button {
                width: 120px;
                height: 36px;
                border-radius: 4px;
                outline: none;
                border: none;
                display: block;
                margin: 0 auto;
                background: none;
                color: #666666;
                margin-bottom: 15px;
                font-size: 16px;
              }
            }
          }
        }
      }
      .block {
        margin: 30px auto;
        text-align: center;
      }
    }
  }
  .reasons_for_refusal {
    h3 {
      font-size: 22px;
      color: #333;
      margin-bottom: 16px;
      .el-icon-info {
        color: #ef4242;
        display: inline-block;
        padding-right: 20px;
      }
    }
    .span_zi {
      font-size: 14px;
      display: block;
      line-height: 20px;
      padding: 0 60px;
      color: red;
    }
    div {
      textarea {
        width: 360px;
        height: 130px;
        border: 1px solid #eeeeee;
        outline: none;
        padding: 10px;
      }
    }
    button {
      width: 92px;
      height: 30px;
      outline: none;
      border: none;
      color: #fff;
      border-radius: 4px;
      margin: 16px 26px;
    }
    .ok {
      background: #eb6100;
    }
    .cancel {
      background: #d2d2d2;
    }
  }
}
.phone_email {
  text-align: center;
  .cancel {
    width: 92px;
    height: 30px;
    outline: none;
    border: none;
    color: #fff;
    border-radius: 4px;
    margin: 16px 0;
    background: #d2d2d2;
  }
  h3 {
    font-size: 16px;
  }
  .phone {
    margin: 20px auto;
    border: 1px solid #eeeeee;
    width: 300px;
    height: 67px;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    p {
      text-align: left;
    }
  }
  .email {
    margin: 20px auto;
    border: 1px solid #eeeeee;
    width: 300px;
    height: 67px;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    p {
      text-align: left;
    }
  }
}
</style>

<style lang="less">
.reasons_for_refusal {
  .el-form {
    .el-form-item {
      .el-form-item__content {
          position: relative;
        .el-input--small {
          .el-input__inner {
            text-align: right;
            padding-right: 40px;
          }
        }
        .el-input--suffix {
          .el-input__inner {
            text-align: left;
          }
        }
        .span {
          position: absolute;
          right: 53px;
          top: 2px;
        }
        .spans {
          position: absolute;
          right: 63px;
          top: 2px;
        }
      }
      .radio_list {
        .el-radio__input.is-checked+.el-radio__label {
          color: #eb6100;
        }
        .el-radio__input.is-checked .el-radio__inner {
          border-color: #eb6100;
          background: #eb6100;
        }
      }
    }
  }
}
</style>
