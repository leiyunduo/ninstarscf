<template>
  <div id="myEnterprise">
    <div class="myEnterprises">
      <!-- <appNav :father="{selIndex: 4}" type="1"></appNav> -->
      <div class="myEnterprise_list">
        <div class="navs">
          <!-- <h3><img src="../../../../static/img/leftbar/mykehu.png" alt="">我的客户</h3> -->
          <p>所在区域：<span>{{address}}</span></p>
        </div>
        <div class="list_content">
          <div class="button_list">
            <div class="left">
              <button v-for="(item, index) in btnName" @click="btnClick(index)" :class="{btn_class: btnClass === index}" :key="index">{{item}}</button>
            </div>
            <div class="right">
              <div class="search">
                <input type="text" placeholder="请输入区域内企业名称" v-model="searchKey" @keyup.enter="handleSearch()">
                <img @click="handleSearch" src="../../../../static/img/search.png" alt="">
              </div>
              <div class="person">
                <span v-if='countNum > 0'>{{countNum}}</span>
                <button @click="applyClick">成员申请</button>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="content_list" v-if="personData.length !== 0">
              <div class="header_list" v-for="(item, index) in personData" :key="index">
                <div class="top">
                  <div class="header_nav">
                    <h3>企业信息</h3>
                    <!-- <button @click="communicate(index, item)">立即沟通</button> -->
                  </div>
                  <div class="details">
                    <div>
                      <span>企业名称：</span>
                      <span @click="handleBusiness(item.business_info.id)">{{item.business_info.name}}</span>
                      <div class="three">
                        <el-tooltip class="item" effect="dark" content="企业认证" placement="top-start">
                          <img src="../../../../static/img/authentication/jiuxing.png" alt="">
                        </el-tooltip>
                        <!-- <el-tooltip class="item" effect="dark" content="天威诚信" placement="top-start">
                          <img :src="item.business_info.twcx_approved_status ? '../../../../static/img/authentication/tw-2.png' : '../../../../static/img/authentication/tw-1.png'" alt="">
                          <span class="b" :class="{grey: item.business_info.twcx_approved_status === false}">天</span>
                        </el-tooltip> -->
                        <el-tooltip class="item" effect="dark" content="CFCA" placement="top-start">
                          <img :src="item.business_info.cfca_approved_status ? '../../../../static/img/authentication/CFCA-2.png' : '../../../../static/img/authentication/CFCA-1.png'" alt="">
                        </el-tooltip>
                      </div>
                    </div>
                    <div>
                      <span>企业数据资产：</span>
                      <span><a :href="'#/area_app/business_detail?company_id=' + item.business_info.id + '&barIndex=' + 5" target='_blank'>查看</a></span>
                    </div>
                    <div>
                      <span>企业规模：</span>
                      <span>无</span>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div class="header_nav">
                    <h3>授权管理</h3>
                    <span @click="managementClick(item, index)">授信管理</span>
                  </div>
                  <div class="details">
                    <ul>
                      <li>
                        <div>
                          <p>企业授信等级：</p>
                          <span>{{item.group === '0' ? '未授信企业' : item.group === '1' ? '白名单企业' : item.group === '2' ? '黄名单企业' : '黑名单企业'}}</span>
                          <img v-if="item.group === '1'" :title='item.is_auto ? "自动授信" : "手动授信"' :src="item.is_auto ? 'static/img/financing/auto.png' : 'static/img/financing/disauto.png'" alt="">
                        </div>
                      </li>
                      <li></li>
                      <li>
                        <p>融资授信总额度（元）：</p>
                        <span v-if='item.total_limit'>{{toThousands(item.total_limit)}}</span>
                        <span v-else>无</span>
                        <!-- <span>—&nbsp;&nbsp;—（元）</span> -->
                      </li>
                      <li>
                        <p>单笔融资授信额度（元）：</p>
                        <span v-if='item.single_limit'>{{toThousands(item.single_limit)}}</span>
                        <span v-else>无</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="null_area" v-if="personData.length === 0">暂无企业</div>
            <div class="block" v-if="total > 5" >
              <el-pagination
                @current-change="handleSizeChange"
                :current-page="currPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper" 
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 授信管理 -->
    <el-dialog align='center' :visible.sync="managementVisible" width="630px" :before-close="handleClose">
      <div class="reasons_for_refusal">
        <h3>授信管理</h3>
        <div class="input_list">
          <el-form ref="form" :model="form" label-width="240px">
            <el-form-item label="授信：">
              <span style="display:inline-block;width: 250px;color:#c0c4cc;text-align: left;">{{form.name}}</span>
            </el-form-item>
            <el-form-item label="企业授信等级：">
              <el-select v-model="form.group" placeholder="请选择企业授信等级" style="width: 250px;" size="small">
                <el-option label="未分配等级" value="0"></el-option>
                <el-option label="白名单企业" value="1"></el-option>
                <el-option label="黄名单企业" value="2"></el-option>
                <el-option label="黑名单企业" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="融资授信总额度（元）：">
              <el-input v-model="form.total_limit" style="width: 250px;text-align:right;" size="small" :disabled="form.group !== '1'" />
              <span class="span"></span>
            </el-form-item>
            <el-form-item label="单笔融资授信额度（元）：">
              <el-input v-model="form.single_limit" style="width: 250px;text-align:right;" size="small" :disabled="form.group !== '1'" />
              <span class="span"></span>
            </el-form-item>
            <el-form-item label-width="0" v-if="form.group === '1'">
              <div class="radio_list">
                <el-radio v-model="form.is_auto" :label="true" size="mini">自动授信</el-radio>
                <el-radio v-model="form.is_auto" :label="false" size="mini">手动授信</el-radio>
              </div>
            </el-form-item>
            <el-form-item label-width="40px" v-if="form.group === '1'">
              <span class="span_zi">自动授信：您选择自动授信后，授信企业在提交单笔融资申请后（融资需求不超过单笔融资授信授信额度，且累计额度不超过融资授信授信总额度）将自动进入风控流程。</span>
            </el-form-item>
          </el-form>
        </div>
        <button class="ok" @click="managementOK">确 定</button>
        <button class="cancel" @click="managementVisible = false">取 消</button>
      </div>
      <el-dialog width="500px" title="授信授信确认方式选择" :visible.sync="innerVisible" append-to-body>
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
    <el-dialog
      title="搜索结果"
      :visible.sync="dialogVisible"
      width="67%"
      :before-close="handleClose">
        <ul class='search_result'>
          <li v-for="(item, index) in businessList" :key>
            <div>
              <img :src="(!item.avatar || item.avatar === '/static/default_avatar.png') ? 'static/img/tickets/default_business.png' : $root_url() + item.avatar" alt="">
              <span v-html='item.show_name'></span>
            </div>
            <div>
              <span>
                <button v-if="item.apply_status === '0'" @click="handleCustomer(item, index)">添加客户</button>
                <span v-else>{{applyType[item.apply_status]}}</span>
              </span>
            </div>
            <div>
              <span @click="handleBusiness(item.id)">企业博客</span>
            </div>
          </li>
        </ul>
        <div class="block" v-if="resLen > 8" >
          <el-pagination
            @current-change="handleSearchPage"
            layout="total, prev, pager, next, jumper" 
            :total="resLen">
          </el-pagination>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'myEnterprise',
  data () {
    return {
      btnName: ['全部', '白名单企业', '黄名单企业', '黑名单企业', '未授信企业'],
      applyType: ['未添加', '审批中', '已拒绝', '我的客户'],
      address: '',
      btnClass: 0,
      searchKey: '',
      // 分页
      currPage: 1,
      total: '',
      resLen: '',
      pageSize: 6,
      countNum: 0,
      // 会员信息
      personData: [],
      // 授信管理
      managementVisible: false,
      // 授信授信管理
      form: {
        name: '',
        group: '1',
        rate: '',
        is_auto: false,
        total_limit: '',
        business_info: {},
        single_limit: ''
      },
      // 授信确认选择方式
      innerVisible: false,
      // 授信id
      member_id: '',
      message: '',
      dialogVisible: false,
      businessList: []
    }
  },
  mounted () {
    const that = this
    that.handleAjax(that.btnClass, 1)
    // this.personData = mock
    // 获取申请数量
    that.$ajax.get('/api/institution/customer/count/').then(res => {
      // console.log(res)
      if (res.status === 200) {
        if (res.data.num > 99) {
          that.countNum = '···'
        } else {
          that.countNum = res.data.num
        }
      }
    })
    that.$ajax.get('/api/financing/region_name/').then(res => {
      if (res.status === 200) {
        that.address = `${res.data.province} ${res.data.city}`
      }
    })

    let _location = [{
      title: this.$route.meta.title,
      url: this.$route.meta.url
    }]
  },
  methods: {
    // 续费
    renewClick () {
      const that = this
      that.$message('暂未开通')
    },
    // 查看企业博客
    handleBusiness (id) {
      window.open('#/enterpriseBlog?bid=' + id +'&customer=1&barIndex=5')
    },
    // 授信管理
    managementClick (i, index) {
      const that = this
      console.log(i)
      // that.form.rate = ''
      // that.form.total_limit = ''
      // that.form.single_limit = ''
      // that.form.name = i.business_info.name
      // that.form.group = i.group
      if (i.group !== '0') {
        i.total_limit = Number(i.total_limit)
        i.single_limit = Number(i.single_limit)
        i.name = i.business_info.name
        that.form = i
      } else {
        that.form.rate = ''
        that.form.total_limit = ''
        that.form.single_limit = ''
        that.form.name = i.business_info.name
        that.form.group = i.group
        that.form.is_auto = false
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
          that.$message.error('请输入融资授信授信总额度')
        } else {
          if (!(/^[0-9]+(.[0-9])?$/.test(that.form.total_limit))) {
            that.$message.error('请输入正确的融资授信授信总额度')
          } else {
            if (that.form.single_limit === '') {
              that.$message.error('请输入单笔融资授信授信额度')
            } else {
              if (!(/^[0-9]+(.[0-9])?$/.test(that.form.single_limit))) {
                that.$message.error('请输入正确的单笔融资授信授信额度')
              } else {
                if (Number(that.form.total_limit) < Number(that.form.single_limit)) {
                  that.$message.error('融资授信授信总额度不能小于单笔融资授信授信额度')
                } else {
                  console.log(that.form)
                  that.managementVisible = false
                  // that.innerVisible = true
                  that.$ajax.put(`/api/institution/customer/${that.member_id}/`, {...that.form}).then(res => {
                    that.$message.success('授信成功')
                    that.handleAjax(that.btnClass, 1)
                  }).catch(err => {
                    that.$message.error(err.response.data.err_msg)
                  })
                }
              }
            }
          }
        }
      } else {
        let { form } = that
        form.single_limit = null
        form.total_limit = null
        console.log(form)
        that.$ajax.put(`/api/institution/customer/${that.member_id}/`, {...form}).then(res => {
          that.$message.success('授信成功')
          that.handleAjax(that.btnClass, 1)
          that.managementVisible = false
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
      that.dialogVisible = false
      that.businessList = []
      // that.form = {name: '', group: '1', rate: '', is_auto: true, total_limit: '', single_limit: ''}
    },
    // 分页
    handleSizeChange (val) {
      const that = this
      that.currPage = val
      that.handleAjax(that.btnClass, val)
    },
    // 切换按钮
    btnClick (index) {
      const that = this
      that.btnClass = index
      that.handleAjax(index, 1)
    },
    // 立即沟通
    communicate (index, friend) {
      const that = this
      that.message = 1
      that.$emit('listerToChild', that.message, friend.business_info.account_id, friend.business_info.name)
    },
    // 成员申请
    applyClick () {
      const that = this
      that.$router.push('/customer_app/application_list')
    },
    // 获取数据
    handleAjax (g, p) {
      let group = ''
      if (g === 1) {
        group = `&group=1`
      } else if (g === 2) {
        group = `&group=2`
      } else if (g === 3) {
        group = `&group=3`
      } else if (g === 4) {
        group = `&group=0`
      }
      let page = p || 1
      const that = this
      that.$ajax.get(`/api/institution/customer/?page=${page}&page_size=${this.pageSize}&status=1${group}`).then(res => {
        that.personData = res.data.results
        that.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 搜索
    handleSearch () {
      const that = this
      if (!that.searchKey) {
        that.$message.warning('请输入正确的关键词')
      } else {
        that.$ajax.get('/api/oth/reginal_company/?page_size=8&page=1&name=' + that.searchKey).then(res => {
          if (res.data.results.length === 0) {
            that.$message.warning('未找到相关企业')
          } else {
            that.dialogVisible = true
            res.data.results.forEach(val => {
              val.show_name = val.name.replace(that.searchKey, '<s style="text-decoration: none; color: #eb6100;">' + that.searchKey + '</s>')
            })
            that.businessList = res.data.results
            that.resLen = res.data.count
          }
        })
      }
    },
    // 添加客户
    handleCustomer (item, index) {
      // console.log(item)
      const that = this
      that.$confirm(`确认添加${item.name}为客户，并分配到未分组名单？`, '添加客户').then(res => {
        that.$ajax.post('/api/institution/customer/', {business: item.id}).then(res => {
          that.$message.success('添加成功')
          let businessList = that.businessList
          businessList[index].apply_status = '3'
          that.businessList = businessList
        })
      })
    },
    // 搜索翻页
    handleSearchPage (e) {
      that.$ajax.get('/api/oth/reginal_company/?page_size=8&page='+ 1 +'&name=' + that.searchKey).then(res => {
        if (res.data.results.length === 0) {
          that.$message.warning('未找到相关企业')
        } else {
          that.dialogVisible = true
          res.data.results.forEach(val => {
            val.show_name = val.name.replace(that.searchKey, '<s style="text-decoration: none; color: #eb6100;">' + that.searchKey + '</s>')
          })
          that.businessList = res.data.results
          that.resLen = res.data.count
        }
      })      
    }
  }
}
</script>

<style lang="less" scoped>
#myEnterprise {
  //padding-top: 70px;
  // display: flex;
  // min-height: 100%;
  background: #f5f7f8;
  width: 100%;
  .myEnterprises {
    min-height: 100%;
    width: 100%;
    // display: flex;
    .myEnterprise_list {
      // width: 100%;
      // padding-left: 60px;
      .navs {
        height: 60px;
        // border-bottom: 1px solid #ccc;
        // margin-bottom: 20px;
        // padding-left: 50px;
        // background: #fff;
        h3 {
          float: left;
          height: 60px;
          display: flex;
          align-items: center;
          // padding-top: 15px;
          // line-height: 60px;
          font-family:PingFangSC-Medium;
          font-size: 16px;
          // color:#eb6100;
          letter-spacing:0;
          img {
            margin-right: 10px;
            float: left;
          }
        }
        p {
          float: right;
          line-height: 60px;
          padding-right: 50px;
        }
      }
      .button_list {
        // padding: 0 10px;;
        // margin-top: 40px;
        margin-bottom: 28px;
        height: 30px;
        display: flex;
        flex-direction: row;
        .left {
          flex: 3;
          button {
            width: 100px;
            height: 30px;
            line-height: 30px;
            border: 1px solid rgb(235, 97, 0);
            color: #eb6100;
            border-radius: 4px;
            background: none;
            margin-right: 40px;
            outline: none;
          }
          button:hover {
            background: #FF6900;
            border: 1px solid rgb(235, 97, 0);;
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
          display: flex;
          justify-content: space-between;
          height: 30px;
          // text-align: right;
          .search {
            background: #fff;
            width: calc(100% - 150px);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border: 1px solid #eaeaea;
            border-radius: 3px;
            input {
              height: 100%;
              width: calc(100% - 30px);
              border: none;
              margin: 0;
              padding: 5px 3px;
              outline: none;
              font-size: 14px;
            }
            img {
              cursor: pointer;
            }
          }
          .person {
            display: inline-block;
            position: relative;
            button {
              width: 120px;
              height: 30px;
              background:rgba(236, 105, 65, 1);
              border:1px solid rgba(235, 97, 0, 1);
              border-radius: 15px;
              outline: none;
              color: #fff;
            }
            button:hover {
              background: #FF6900;
              border: 1px solid rgb(235, 97, 0);
              color: #fff;              
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
              top: -7px;
              text-align: center;
              line-height: 20px;
            }
          }
        }
      }
      .list_content {
        padding: 30px 50px 20px;
        width: 100%;
        min-width: 1400px;
        .content {
          width: 100%;
          // height: auto;
          // background: #fff;
          // border: 1px solid #eeeeee;
          // border-radius: 2px;
          // padding: 0 30px 20px;
          // max-width: 1300px;
          .content_list {
            width: 100%;
            // min-height: 885px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: flex-start;
            .header_list {
              padding: 0 40px;
              width: 47%;
              border-radius: 6px;
              box-shadow: 3px 4px 2px 4px #f2f2f2;
              // height: 250px;
              margin-bottom: 20px;
              background:#fff;
              border: 1px solid #E8E8E8;
              // margin-top: 30px;
              .header_nav {
                width: 100%;
                line-height: 17px;
                margin-top: 31px;
                margin-bottom: 26px;
                display: flex;
                justify-content: space-between;
                h3 {
                  font-weight:400;
                  color:#222;
                  font-size: 18px;
                  line-height: 23px;
                  // font-weight: bold;
                }
              }
              .top {
                // border-right: 1px solid #eeeeee;
                // height: 100%;
                .details {
                  display: flex;
                  padding-bottom: 14px;
                  border-bottom: 1px solid rgb(232, 232, 232);
                  height: 45px;
                  align-items: center;
                  &>div:first-child {
                    // width: 362px + 48px;
                    width: 50%;
                    height: 100%;
                    // height: 18px;
                    display: flex;
                    align-items: center;
                    span:first-child {
                      // width: 68px;
                      color: rgb(102, 102, 102);
                      font-size: 14px;
                    }
                    span:nth-child(2) {
                      color: #EC6941;
                      font-weight:bold;
                      text-decoration: underline;
                      cursor: pointer;
                      font-size: 14px;
                      margin-right: 10px;
                    }
                    .three {
                      span {
                        display: inline-block;
                        width: 30px;
                        height: 16px;
                        font-size: 12px;
                        color: #fff;
                        text-align: center;
                        line-height: 16px;
                        border-radius: 2px;
                        margin-right: 15px;
                      }
                      img {
                        width: 18px;
                      }
                      .a {
                        background: #ff3131;
                        border: 1px solid #eb0045;
                      }
                      .b {
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
                  }
                  &>div:nth-child(2) {
                    width: 30%;
                    span:first-child {
                      color: rgb(102, 102, 102);
                      font-size: 14px;                      
                    }
                    span:last-child {
                      a {
                        color: #eb6100;
                        font-size: 14px;
                      }
                    }
                  }
                  &>div:last-child {
                    font-size: 14px;
                    height: 16px;
                    line-height: 16px;
                    text-align: right;
                    width: 20%;
                    span:first-child {
                      // width: 68px;
                      color: rgb(102, 102, 102);
                      font-size: 14px;
                    }
                    span:last-child {
                      color: #999;
                    }
                  }
                }
              }
              .bottom {
                // border-right: 1px solid #eeeeee;
                .header_nav {
                  width: 100%;
                  line-height: 17px;
                  margin-top: 31px;
                  margin-bottom: 26px;
                  display: flex;
                  justify-content: space-between;
                  h3 {
                    font-weight:400;
                    color:#222;
                    font-size: 18px;
                    line-height: 23px;
                    // font-weight: bold;
                  }
                  span {
                    color: #F7855D;
                    text-decoration: underline;
                    cursor: pointer;
                    font-size: 14px;
                    line-height: 23px;
                  }
                }
                .details {
                  ul {
                    // max-width: 400px;
                    display: flex;
                    flex-wrap: wrap;
                    li {
                      height: 17px;
                      line-height: 17px;
                      font-size: 16px;
                      width: 50%;
                      display: flex;
                      margin-bottom: 17px;
                      &>div {
                        // flex: 1;
                        display: flex;
                        color: #666666;
                        font-size: 14px;
                      }
                      img {
                        height: 18px;
                        margin-left: 12px;
                      }
                      p {
                        color: #666;
                        font-size: 14px;
                      }
                      span {
                        color: #333;
                      }
                    }
                    li:nth-child(1) {
                      &>span {
                        display: inline-block;
                        // padding-right: 10px;
                        color: #eb6100;
                        text-decoration: underline;
                      }
                    }
                    // li:nth-child(2) {
                    //   span {
                    //     padding-right: 10px;
                    //   }
                    // }
                  }
                }
              }
            }
            .block {          
              margin: 30px auto;
              text-align: center;
            }
          }
          .null_area {
            text-align:center;
            font-size: 16px;
            // font-weight :bold;
            color: #999;
            padding: 30px 0;
            border: 1px solid #eee;
            margin-top: 30px;
            background: #fff;
            line-height: 120px;
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
.span_zi {
  font-size: 14px;
  display: block;
  line-height: 20px;
  padding: 0 60px;
  color: red;
}
.search_result {
  li {
    display: flex;
    border-bottom: 1px dotted #dadada;
    padding: 10px 0;
    div:first-child {
      width: 50%;
      img {
        width: 45px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    div:nth-child(2) {
      width: 20%;
      line-height: 45px;
      button {
        width: 95px;
        height: 24px;
        margin-left: -20px;
        color: #fff;
        background: #F7855D;
        border-radius: 3px;
        font-size: 14px;
        border: 1px solid #f7855d;
      }
      span {
        color: #666;
      }
    }
    div:nth-child(3) {
      width: 30%;
      // text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        // display: inline-block;
        margin: 0 5px;
        width: 95px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #F7855D;
        text-decoration: underline;
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
        font-size: 14px;
      }
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
