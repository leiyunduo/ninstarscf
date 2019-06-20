<template>
  <div id="myEnterprise">
    <div class="myEnterprises">
      <!-- <appNav :father="{selIndex: 0}" type="1"></appNav> -->
      <div class="myEnterprise_list">
        <div class="navs">
          <p>所在区域：{{provinceCity}}</p>
        </div>
        <div class="list_content">
          <div class="content">
            <div class="button_list">
              <div class="left">
                <button v-for="(item, index) in btnName" @click="btnClick(index)" :class="{btn_class: btnClass === index}" :key="index">{{item}}</button>
              </div>
              <div class="right">
                <!-- <button @click="regionClick">区域企业查看</button> -->
                <div class="person">
                  <span v-if='countNum > 0'>{{countNum}}</span>
                  <button @click="applyClick">成员申请</button>
                </div>
              </div>
            </div>
            <div class="content_list">
              <div class="header_list" v-for="(item, index) in personData" :class="[{white: item.group === '1'}, {yellow: item.group === '2'}, {black: item.group === '3'}, {nones: item.group === '0'}]" :key="index" v-if="personData.length !== 0">
                <div class="header_list_left">
                  <div class="header_nav">
                    <h3>企业信息</h3>
                    <button @click="communicate(index, item)"><img src="../../../../static/img/fund/call.png" alt="">立即沟通</button>
                  </div>
                  <div class="details">
                    <div class="flex">
                      <h3><p>企业名称：</p><span :title="'企业名称：' + item.business_info.name" @click="businessBlog(item.business_info)">{{item.business_info.name}}</span></h3>
                      <div class="three">
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
                    </div>
                    <div class="flexs">
                      <p>企业规模：大型企业</p>
                    </div>
                    <div class="flexs">
                      <p>企业数据资产：<span @click="areaApp(item)">查看</span></p>
                    </div>
                  </div>
                </div>
                <div class="header_list_center">
                  <div class="header_nav">
                    <h3>授权管理</h3>
                    <button @click="managementClick(item, index)" style="color:rgba(247,133,93,1)"><img src="../../../../static/img/fund/shouxin.png" alt="">授信管理</button>
                  </div>
                  <div class="details">
                    <ul>
                      <li>
                        <p>企业授信等级：{{item.group === '0' ? '未授信企业' : item.group === '1' ? '白名单企业' : item.group === '2' ? '黄名单企业' : '黑名单企业'}}
                          <img :src="item.group === '0' ? '' : item.group === '1' ? 'static/img/fund/white.png' : item.group === '2' ? 'static/img/fund/yellow.png' : 'static/img/fund/black.png'">
                          <img :title="item.is_auto_loan_aid ? '自动授信' : '手动授信'" :src="item.is_auto_loan_aid ? 'static/img/fund/auto.png' : 'static/img/fund/disauto.png'" v-if="item.group === '1'">
                        </p>
                      </li>
                      <li class="aaa">
                        <p>助贷占比：</p>
                        <span v-if='item.rate'>{{item.rate}}%</span>
                        <span v-else>无</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p>融资助贷授信总额度：</p>
                        <span v-if='item.total_limit'>{{toThousands(item.total_limit)}}（元）</span>
                        <span v-else>无</span>
                        <!-- <span>—&nbsp;&nbsp;—（元）</span> -->
                      </li>
                      <li class="aaa">
                        <p>单笔融资助贷授信额度：</p>
                        <span v-if='item.single_limit'>{{toThousands(item.single_limit)}}（元）</span>
                        <span v-else>无</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="header_list_center">
                  <div class="header_nav">
                    <h3>会员信息</h3>
                    <button @click="renewClick" style="color:rgba(247,93,93,1)"><img src="../../../../static/img/fund/xufei.png" alt="">立即续费</button>
                  </div>
                  <div class="details">
                    <ul>
                      <li>
                        <p>会员状态：{{item.status === '0' ? '未激活' : item.status === '1' ? '已激活' : item.status === '2' ? '已过期' : '已锁死'}}</p>
                      </li>
                      <li class="aaa">
                        <p>助保金：</p>
                        <span v-if='item.member_fee'>{{item.member_fee}}%</span>
                        <span v-else>无</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p>会员有效期：</p>
                        <span v-if='item.deadline'>{{item.deadline}}</span>
                        <span v-else>无</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="header_lists" v-if="personData.length === 0" style="text-align:center;font-size:16px;font-weight:bold;padding: 30px 0;">暂无</div>
            </div>
            <div class="block">
              <el-pagination v-if="total" @current-change="handleSizeChange"
                :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 授信管理 -->
    <el-dialog align='center' :visible.sync="managementVisible" width="570px" :before-close="handleClose">
      <div class="reasons_for_refusal">
        <h3>助贷授信管理</h3>
        <div class="input_list">
          <el-form ref="form" :model="form">
            <el-form-item label="助贷授信：" label-width="170px">
              <span style="display:inline-block;width: 250px;color:#c0c4cc;text-align: left;">{{form.name}}</span>
            </el-form-item>
            <el-form-item label="企业授信等级：" label-width="170px">
              <el-select v-model="form.group" placeholder="请选择企业授信等级" style="width: 250px;" size="small">
                <el-option label="未授信企业" value="0"></el-option>
                <el-option label="白名单企业" value="1"></el-option>
                <el-option label="黄名单企业" value="2"></el-option>
                <el-option label="黑名单企业" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="融资助贷授信总额度：" label-width="170px">
              <el-input v-model="form.total_limit" style="width: 250px;text-align:right;" size="small" :disabled="form.group !== '1'" />
              <span class="span">（元）</span>
            </el-form-item>
            <el-form-item label="单笔融资助贷授信额度：" label-width="170px">
              <el-input v-model="form.single_limit" style="width: 250px;text-align:right;" size="small" :disabled="form.group !== '1'" />
              <span class="span">（元）</span>
            </el-form-item>
            <el-form-item label="助贷占比：" label-width="170px">
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
  name: 'myEnterprise',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      btnName: ['全部', '白名单企业', '黄名单企业', '黑名单企业', '未授信企业'],
      btnClass: 0,
      // 分页
      currPage: 1,
      total: '',
      pageSize: 5,
      // 会员信息
      personData: [],
      // 授信管理
      managementVisible: false,
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
      // 授信id
      member_id: '',
      message: '',
      // 申请数量
      countNum: '',
      provinceCity: ''
    }
  },
  mounted () {
    const that = this
    // 会员列表
    that.$ajax.get('/api/fund/member/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&status=1').then(res => {
      that.personData = res.data.results
      that.total = res.data.count
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    // 申请数量
    that.$ajax.get('/api/fund/member/count/').then(res => {
      if (res.data.num > 99) {
        that.countNum = '99+'
      } else {
        that.countNum = res.data.num
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    that.$ajax.get('/api/financing/region_name/').then(res => {
      that.provinceCity = res.data.province + ' ' + res.data.city + ' ' + res.data.region
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 点击企业名称跳转博客
    businessBlog (item) {
      const that = this
      window.open('#/enterpriseBlog?bid=' + item.id + '&bType=1')
    },
    // 续费
    renewClick () {
      const that = this
      that.$message('暂未开通')
    },
    // 查看企业数据资产
    areaApp (i) {
      const that = this
      console.log(i)
      window.open('#/area_app/business_detail?company_id=' + i.business)
    },
    // 授信管理
    managementClick (i, index) {
      console.log(i)
      const that = this
      if (i.group === '0') {
        that.form.rate = ''
        that.form.total_limit = ''
        that.form.single_limit = ''
        that.form.name = i.business_info.name
        that.form.group = ''
        that.form.is_auto_loan_aid = 'false'
      } else {
        let form = {}
        form.total_limit = Number(i.total_limit)
        form.single_limit = Number(i.single_limit)
        i.is_auto_loan_aid ? form.is_auto_loan_aid = 'true' : form.is_auto_loan_aid = 'false'
        form.name = i.business_info.name
        form.group = i.group
        form.rate = i.rate
        that.form = form
      }
      that.member_id = i.id
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
          if (!(/^[0-9]+(.[0-9])?$/.test(that.form.total_limit))) {
            that.$message.error('请输入正确的融资助贷授信总额度')
          } else {
            if (that.form.single_limit === '') {
              that.$message.error('请输入单笔融资助贷授信额度')
            } else {
              if (!(/^[0-9]+(.[0-9])?$/.test(that.form.single_limit))) {
                that.$message.error('请输入正确的单笔融资助贷授信额度')
              } else {
                if (that.form.rate === '') {
                  that.$message.error('请输入助贷占比')
                } else {
                  if (!(/^[0-9]+(.[0-9])?$/.test(that.form.rate))) {
                    that.$message.error('请输入正确的助贷占比')
                  } else {
                    if (Number(that.form.rate) === 0) {
                      that.$message.error('助贷占比不能位0')
                    } else {
                      that.managementVisible = false
                      // that.innerVisible = true
                      that.$ajax.put(`/api/fund/member/` + that.member_id + '/', {...that.form}).then(res => {
                        that.$message.success('授信成功')
                        that.$ajax.get('/api/fund/member/?' + 'page=' + this.currPage + '&status=1' + '&page_size=' + this.pageSize).then(res => {
                          that.personData = res.data.results
                          that.total = res.data.count
                          that.btnClass = 0
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
          }
        }
      } else {
        that.managementVisible = false
        that.$ajax.put(`/api/fund/member/` + that.member_id + '/', {name: that.form.name, group: that.form.group, single_limit: null, total_limit: null}).then(res => {
          that.$message.success('授信成功')
          that.$ajax.get('/api/fund/member/?' + 'page=' + this.currPage + '&status=1' + '&page_size=' + this.pageSize).then(res => {
            that.personData = res.data.results
            that.total = res.data.count
            that.btnClass = 0
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
      that.innerVisible = false
      that.managementVisible = false
    },
    // 分页
    handleSizeChange (val) {
      const that = this
      that.currPage = val
      // 会员列表
      if (that.btnClass === 0) {
        that.$ajax.get('/api/fund/member/?' + 'page=' + that.currPage + '&status=1' + '&page_size=' + that.pageSize).then(res => {
          that.personData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (that.btnClass === 4) {
        that.$ajax.get('/api/fund/member/?' + 'page=' + that.currPage + '&status=1' + '&page_size=' + that.pageSize + '&group=0').then(res => {
          that.personData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        that.$ajax.get('/api/fund/member/?' + 'page=' + that.currPage + '&status=1' + '&page_size=' + that.pageSize + '&group=' + that.btnClass).then(res => {
          that.personData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 切换按钮
    btnClick (index) {
      const that = this
      that.btnClass = index
      that.currPage = 1
      // 会员列表
      if (index === 0) {
        console.log(index)
        // 全部
        that.$ajax.get('/api/fund/member/?' + 'page=' + that.currPage + '&status=1' + '&page_size=' + that.pageSize).then(res => {
          that.personData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 4) {
        console.log(index)
        // 未分配
        that.$ajax.get('/api/fund/member/?' + 'page=' + that.currPage + '&status=1' + '&page_size=' + that.pageSize + '&group=0').then(res => {
          that.personData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        that.$ajax.get('/api/fund/member/?' + 'page=' + that.currPage + '&status=1' + '&page_size=' + that.pageSize + '&group=' + index).then(res => {
          that.personData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 立即沟通
    communicate (index, friend) {
      const that = this
      that.message = 1
      that.$emit('listerToChild', that.message, friend.business_info.account_id, friend.business_info.name)
    },
    // 区域企业查看
    regionClick () {
      console.log('查看')
    },
    // 成员申请
    applyClick () {
      const that = this
      that.$router.push('/myApply')
    }
  }
}
</script>

<style lang="less" scoped>
#myEnterprise {
  //padding-top: 70px;
  display: flex;
  min-height: 100%;
  background: #f7f7f7;
  width: 100%;
  .myEnterprises {
    min-height: 100%;
    width: 100%;
    display: flex;
    .myEnterprise_list {
      // width: 100%;
      // padding: 0 60px;
      .navs {
        height: 60px;
        padding: 0 35px;
        p {
          float: right;
          line-height: 60px;
          padding-right: 50px;
        }
      }
      .list_content {
        padding: 10px 50px 20px;
        width: 100%;
        .content {
          width: 100%;
          height: auto;
          background: #fff;
          border: 1px solid #eeeeee;
          border-radius: 2px;
          padding: 0 30px 20px;
          // max-width: 1300px;
          .button_list {
            margin-left: 24px;
            height: 50px;
            display: flex;
            flex-direction: row;
            .left {
              flex: 3;
              display: flex; 
              button {
                width: 100px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #eb6100;
                color: #eb6100;
                border-radius: 4px;
                background: none;
                margin-right: 35px;
                margin-top: 20px;
                outline: none;
              }
              button:hover {
                background: #eb6100;
                border: none;
                color: #fff;
              }
              .btn_class {
                background: #eb6100;
                border: none;
                color: #fff;
              }
            }
            .right {
              flex: 1;
              height: 50px;
              text-align: right;
              button {
                height: 30px;
                width: 118px;
                border-radius: 30px;
                outline: none;
                background: #fff1e8;
                border: 1px solid #eb6100;
                color: #eb6100;
                text-align: center;
                margin-top: 20px;
              }
              // button:hover {
              //   background: #ec6941;
              //   color: #fff;
              // }
              .person {
                display: inline-block;
                position: relative;
                button {
                  background: #ec6941;
                  color: #fff;
                  margin-left: 3px;
                }
                span {
                  width: 20px;
                  height: 20px;
                  font-size: 12px;
                  color: #fff;
                  background: #e60012;
                  border-radius: 50%;
                  position: absolute;
                  right: 0;
                  top: 10px;
                  text-align: center;
                  line-height: 20px;
                }
              }
            }
          }
          .content_list {
            width: 100%;
            height: 100%;
            // padding: 0 0 0 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            flex-wrap: wrap;
            .header_list {
              margin: 30px 10px 0 0;
              width: 100%;
              height:396px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(232,232,232,1);
              border-radius:4px;
              padding: 0 40px 20px 20px;
              .header_nav {
                display: flex;
                flex-direction: row;
                padding: 30px 0 0 20px;
                h3 {
                  font-size: 16px;
                  font-size: 18px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  color:rgba(34,34,34,1);
                  flex: 1;
                }
                button {
                  width:auto;
                  padding: 0 10px;
                  font-size:14px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  text-decoration:underline;
                  color:rgba(93,148,248,1);
                  background: none;
                  border: none;
                  outline: none;
                  height: 18px;
                  img {
                    margin-right: 10px; 
                    width: 18px;
                    height: 18px;
                    float: left;
                  }
                }
              }
              .header_list_left {
                height: 106px;
                padding-bottom: 15px;
                .details {
                  padding: 15px 0 0 0;
                  display: flex;
                  flex-direction: row;
                  .flex {
                    flex: 2;
                    display: flex;
                    flex-direction: row;
                    h3 {
                      font-size:14px;
                      font-family:MicrosoftYaHei;
                      font-weight:400;
                      color:rgba(102,102,102,1);
                      display: flex;
                      flex-direction: row;
                      text-align: left;
                      p {
                        display: inline-block;
                      }
                      span {
                        font-size:14px;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
                        text-decoration:underline;
                        color:rgba(236,105,65,1);
                        cursor: pointer;
                        width: 160px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      }
                    }
                    .three {
                      margin-top: 3px;
                      img {
                        margin-left: 10px;
                        width: 18px;
                        height: 18px;
                      }
                    }
                  }
                  .flexs {
                    flex: 1;
                    span {
                      font-size:14px;
                      font-family:MicrosoftYaHei-Bold;
                      font-weight:bold;
                      text-decoration:underline;
                      color:rgba(236,105,65,1);
                      cursor: pointer;
                    }
                  }
                  p {
                    font-size: 14px;
                    color: #707070;
                    padding-left: 20px;
                  }
                  button {
                    width: 128px;
                    height: 28px;
                    border-radius: 4px;
                    background: #ec6941;
                    border: none;
                    outline: none;
                    color: #fff;
                    margin-top: 16px;
                  }
                }
              }
              .header_list_center {
                border-top: 1px solid rgba(232,232,232,1);
                .details {
                  padding: 15px 0 0 20px;
                  ul {
                    display: flex;
                    flex-direction: row;
                    li {
                      flex: 1;
                      display: flex;
                      flex-direction: row;
                      height: 30px;
                      line-height: 19px;
                      img {
                        height: 20px;
                        // padding-left: 20px;
                        vertical-align: top;
                      }
                      p {
                        color: #666666;
                        font-size: 14px;
                        img {
                          margin-left: 5px;
                        }
                      }
                      span {
                        font-size: 14px;
                        color: #666;
                        cursor: pointer;
                        display: inline-block;
                      }
                    }
                    .aaa {
                      padding-left: 25px;
                    }
                  }
                }
              }
            }
            .header_lists {
              width: 100%;
            }
            .white {
              border-left: 4px solid rgba(232,232,232,1);
            }
            .yellow {
              border-left: 4px solid rgba(242,193,116,1);
            }
            .black {
              border-left: 4px solid rgba(155,155,177,1);
            }
            .nones {
              border-left:1px solid rgba(232,232,232,1);
            }
          }
          .block {
            margin: 30px auto;
            text-align: center;
          }
        }
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
    div {
      textarea {
        width: 360px;
        height: 130px;
        border: 1px solid #eeeeee;
        outline: none;
        padding: 10px;
      }
    }
    .span_zi {
      font-size: 14px;
      display: block;
      line-height: 20px;
      padding: 0 60px;
      color: red;
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
