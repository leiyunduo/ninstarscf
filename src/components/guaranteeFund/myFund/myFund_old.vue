<template>
  <div id="myFund">
    <div class="myFunds">
      <!-- <appNav :father="{selIndex: 1}" type="1"></appNav> -->
      <div class="myFund_list">
        <div class="navs">
          <h3><img src="../../../../static/img/leftbar/b.png" alt="">我的助贷</h3>
        </div>
        <div class="list_content">
          <div class="content">
            <div class="button_list">
              <div class="left">
                <button v-for="(item, index) in btnName" @click="btnClick(index)" :class="{btn_class: btnClass === index}" :key="index">{{item}}</button>
              </div>
              <div class="right">
                <div class="person">
                  <span v-if='countNum > 0'>{{countNum}}</span>
                  <button @click="applyClick">赔付申请</button>
                </div>
              </div>
            </div>
            <div class="content_list">
              <div class="help_nav" v-if='btnListName.length > 0 && helpData.length > 0'>
                <button v-for="(item, index) in btnListName" @click="btnListClick(index)" :class="{btn_class: btnListClass === index}" :key="index">{{item}}</button>
              </div>
              <div class="help_list" v-if='helpData.length > 0' v-for="(item, index) in helpData" :key="index">
                <div class="help_header">
                  <div class="left">
                    <ul>
                      <li>融资类型：{{item.type === '0' ? '应收融资' : '订单融资'}}</li>
                      <li>
                        <span>融资编号：</span>
                        <span @click="handlePic(item)">{{item.id}}</span>
                      </li>
                      <li>提交时间：{{item.create_time || '暂无数据'}}</li>
                      <li class="unline">{{item.status === '0' ? '已中止' : item.status === '1' ? '融资未审核' : item.status === '2' ? '融资审核中' : item.status === '3' ? '融资已放款' : '融资已结束'}}</li>
                    </ul>
                  </div>
                  <div class="right">
                    <ul>
                      <li v-if="item.helping_status === '0'" @click="agreeRefuse(0, item)">助贷</li>
                      <li v-if="item.helping_status === '0'" @click="agreeRefuse(1, item)">拒绝</li>
                      <li>一键下载</li>
                    </ul>
                  </div>
                </div>
                <div class="row_list">
                  <div style='background: #f9f9f9;padding:10px;'>
                    <el-row :gutter="0">
                      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                        <div class="el_col_list" v-if="item.application_data">
                          <h3 v-if="item.application_data">
                            <span>申请企业</span>
                            <span></span>
                          </h3>
                          <div>
                            <ul>
                              <li v-if="item.business_info">
                                <p>企业名称：</p>
                                <span style="cursor:pointer;color:#eb6100;text-decoration:underline;" @click="businessBlog(item.business_info)">{{item.business_info.name}}</span>
                              </li>
                              <li v-if="item.business_info">
                                <p>联系人：</p>
                                <span v-if='item.business_info.contact_info'>{{item.business_info.contact_info.contact_person || '未填写'}}</span>
                                <span v-else>未填写</span>
                              </li>
                              <li v-if="item.business_info">
                                <p>联系电话：</p>
                                <span v-if='item.business_info.contact_info'>{{item.business_info.contact_info.phone || '未填写'}}</span>
                                <span v-else>未填写</span>
                              </li>
                              <li v-if="item.business_info">
                                <p>联系邮箱：</p>
                                <span v-if='item.business_info.contact_info'>{{item.business_info.contact_info.email || '未填写'}}</span>
                                <span v-else>未填写</span>
                              </li>
                            </ul>                  
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                        <div class="el_col_list">
                          <h3>
                            <span>融资需求</span>
                            <span></span>
                          </h3>
                          <ul v-if="item.expect_data">
                            <li><p>金额（元）：</p><span>{{item.expect_data.value ? (toThousands(item.expect_data.value)) : '0.00'}}</span></li>
                            <li><p>希望融资时间：</p><span>{{handleTime(item.expect_data.expect_loan_date)}}</span></li>
                            <li><p>预计还款时间：</p><span>{{handleTime(item.expect_data.expect_repayment_date)}}</span></li>
                          </ul>
                        </div>
                      </el-col>
                      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                        <div class="el_col_list">
                          <h3>
                            <span>融资用途</span>
                            <span @click="handleCheck(1, item)">查看更多</span>
                          </h3>
                          <ul v-if="item.application_data">
                            <li><p>累计订单总额：</p><span>{{handleSum(item.application_data.chain_info)}}（元）</span></li>
                            <li v-for="(el, indexChan) in item.application_data.chain_info" :key='indexChan' v-if="item.application_data.chain_info" class="order_line">
                              <p>采购项目订单：</p>
                              <span v-if="el.order" v-for="(order, i) in el.order" :key='i'>
                                <div><span style="color:#eb6100;text-decoration:underline;cursor:pointer;" @click="handleChain(el)" :title='order.name'>{{order.name}}</span><span>{{toThousands(order.amount)}}（元）</span></div>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </el-col>
                      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                        <div class="el_col_list">
                          <h3>
                            <span>第一还款来源</span>
                            <span @click="handleCheck(3, item)">查看更多</span>
                          </h3>
                          <!-- <h4><span :title="'北京九星哈哈哈'">北京九星哈哈哈</span></h4> -->
                          <ul v-if="item.first_repayment.length > 0">
                            <li><p>项目名称：</p><span style="color:#e87626;text-decoration: underline;cursor:pointer;" @click="handleChain(item.first_repayment[0])">{{item.first_repayment[0].name}}</span></li>
                            <li><p>项目评级：</p><span>暂未评级</span></li>
                            <li><p>历史结算逾期率：</p><span>0%</span></li>
                          </ul>
                        </div>
                      </el-col>
                      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                        <div class="el_col_list last_two">
                          <h3>
                            <span>第二还款来源</span>
                            <span @click="handleCheck(4, item)">查看更多</span>
                          </h3>
                          <ul v-if="item.second_repayment" v-for="(sec,secIndex) in item.second_repayment" :key='secIndex'>
                            <li><p>其他应收：</p><span :title="sec.name" style="color:#e87626;text-decoration: underline;cursor:pointer;" @click="handleChain(sec)">{{sec.name}}</span></li>
                            <li><p>销售金额（元）：</p><span>{{toThousands(sec.amount)}}</span></li>
                          </ul>
                          <div style="line-height: 120px; text-align: center; color: #999" v-if="item.second_repayment && item.second_repayment.length === 0">未上传第二还款来源</div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="the_help">
                  <div class="the_list">
                    <h3>本次助贷</h3>
                    <ul>
                      <li class="red" v-if='item.helping_data'>助贷金额：{{item.helping_data.value ? toThousands(item.helping_data.value) : '0.00'}}（元）</li>
                      <li v-if='item.helping_data'>助贷占比：{{item.helping_data.rate ? item.helping_data.rate : '0'}}%</li>
                      <li class="nored" @click="theHelpClick(item)" v-if="item.helping_status === '0'">本次助贷管理</li>
                    </ul>
                  </div>
                  <div class="the_list">
                    <h3>助贷授信</h3>
                    <ul v-if='item.member_info'>
                      <li>单笔融资助贷授信额度：{{toThousands(item.member_info.single_limit)}}（元）</li>
                      <li>融资助贷授信总额度：{{toThousands(item.member_info.total_limit)}}（元）</li>
                    </ul>
                  </div>
                </div>
                <div class="select_list">
                  <div class="list_assets">
                    <h3>融资查看</h3>
                    <div class="table_list">
                      <el-table ref="singleTable" :data="item.loan_process_info" highlight-current-row style="width: 100%">
                        <el-table-column type="index" width="100" label="序号"></el-table-column>
                        <el-table-column label="受理银行" width="250">
                          <template slot-scope="scope">
                            <span style="color:#eb6100;text-decoration:underline;cursor:pointer" @click="handleEdit(scope.$index, scope.row)">{{scope.row.institution_name}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="loan_process_status_display" label="融资进度" width="150"></el-table-column>
                        <el-table-column label="操作" width="150">
                          <template slot-scope="scope">
                            <button @click="selectFrom(scope.$index, scope.row)">查看</button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block">
                <el-pagination v-if="total" @current-change="handleSizeChange"
                  :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
              <div style="height:100px;line-height:100px;font-size:18px;text-align:center" v-if='helpData.length === 0'>暂无数据</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 授信管理 -->
    <el-dialog align='center' :visible.sync="managementVisible" width="570px" :before-close="handleClose">
      <div class="reasons_for_refusal">
        <h3>本次助贷调整</h3>
        <div class="input_list">
          <el-form ref="form" :model="form" label-width="170px">
            <el-form-item label="助贷授信：">
              <span style="display:inline-block;width: 250px;color:#666;text-align: left;">{{form.name}}</span>
            </el-form-item>
            <el-form-item label="授信等级：">
              <span style="display:inline-block;width: 250px;color:#666;text-align: left;">{{form.group === '0' ? '未分配等级' : form.group === '1' ? '白名单企业' : form.group === '2' ? '黄名单企业' : '黑名单企业'}}</span>
            </el-form-item>
            <el-form-item label="融资需求：">
              <span style="display:inline-block;width: 250px;color:#666;text-align: right;">{{form.value ? toThousands(form.value) : '0.00'}}（元）</span>
            </el-form-item>
            <el-form-item label="助贷金额：">
              <span style="display:inline-block;width: 250px;color:red;text-align: right;">{{form.amount ? toThousands(form.amount) : '0.00'}}（元）</span>
            </el-form-item>
            <el-form-item label="助贷占比：">
              <el-input v-model="form.rate" style="width: 250px;text-align:right;" size="small" @input="rateValue(form)" />
              <span class="spans">%</span>
            </el-form-item>
            <el-form-item label="融资助贷授信总额度：">
              <span style="display:inline-block;width: 250px;color:red;text-align: right;">{{toThousands(form.total_limit)}}（元）</span>
            </el-form-item>
            <el-form-item label="单笔融资助贷授信额度：">
              <span style="display:inline-block;width: 250px;color:red;text-align: right;">{{toThousands(form.single_limit)}}（元）</span>
            </el-form-item>
          </el-form>
        </div>
        <button class="ok" @click="managementOK">确 定</button>
        <button class="cancel" @click="handleClose">取 消</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import AppNav from '../../financing/financingManege'
export default {
  name: 'myFund',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      btnName: ['全部', '未助贷', '助贷中', '赔付中', '已完结'],
      btnClass: 0,
      // 分页
      currPage: 1,
      total: '',
      pageSize: 5,
      helpData: [],
      // 助贷授信管理
      form: {
        name: '',
        group: '',
        rate: '',
        total_limit: '',
        single_limit: '',
        value: '',
        amount: ''
      },
      // 助贷调整
      managementVisible: false,
      btnListName: [],
      btnListClass: 0,
      help_id: '',
      agreeRefuseFund: -1,
      // 赔付申请数量
      countNum: ''
    }
  },
  mounted () {
    const that = this
    // 融资列表
    that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
      that.helpData = res.data.results
      that.total = res.data.count
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    // 赔付申请个数
    that.$ajax.get('/api/financing/application/apply_aid_paid_count/').then(res => {
      that.countNum = res.data.count
    }).catch(err => {
      console.log(err.response)
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 赔付申请
    applyClick () {
      window.open('#/myFundList')
    },
    // 查看链式记账
    handleChain (el) {
      let query = {}
      let path = '/fund/chain_info'
      query.id = el.chain_id
      window.open(`#/fund/chain_info?id=${query.id}`)
    },
    // 点击企业名称跳转博客
    businessBlog (item) {
      const that = this
      window.open('#/enterpriseBlog?bid=' + item.id + '&fType=1')
    },
    // 助贷占比
    rateValue (item) {
      const that = this
      let s = item.rate * item.financing.expect_data.value
      if (isNaN(s)) {
        item.amount = '0.00'
      } else {
        item.amount = (s / 100).toFixed(2)
      }
      // if (item.rate !== '') {
      //   if (!(/^[0-9]+(.[0-9])?$/.test(that.form.rate))) {
      //     that.$message.error('请输入正确的助贷占比')
      //   } else {
      //     if (Number(that.form.rate) === 0) {
      //       that.$message.error('助贷占比不能位0')
      //     } else {
      //       console.log(item)
      //       // that.$ajax.get('/api/fund/loan_aid/get_aid_value/?loan_value=' + item.value + '&rate=' + item.rate).then(res => {
      //       //   that.form.amount = res.data.value
      //       // }).catch(err => {
      //       //   that.$message.error(err.response.data.err_msg)
      //       // })            
      //     }
      //   }
      // } else {
      //   that.form.amount = ''
      // }
    },
    // 助贷/拒绝
    agreeRefuse (i, item) {
      console.log(item)
      const that = this
      if (i === 0) {
        console.log(item)
        if (item.helping_data.rate === '' || item.helping_data.rate === '0' || !item.helping_data.rate) {
          that.theHelpClick(item)
          that.agreeRefuseFund = 0
        } else {
          that.agreeRefuseFund = -1
          // 助贷
          that.$ajax.put(`/api/financing/application/` + item.id + '/', {helping_status: '1'}).then(res => {
            that.$message.success('助贷成功')
            // 融资列表
            that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
              that.helpData = res.data.results
              that.total = res.data.count
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      } else if (i === 1) {
        // 拒绝
        that.$ajax.put(`/api/financing/application/` + item.id + '/', {helping_status: '2'}).then(res => {
          that.$message.success('拒绝成功')
          // 融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 融资内容按钮
    btnListClick (index) {
      const that = this
      that.btnListClass = index
      // 分页为第一页
      that.currPage = 1
      // ----------未助贷---------------
      if (that.btnClass === 1) {
        if (index === 0) {
          // 全部---------融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status__in=0,2').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 1) {
          // 审核中-------融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status__in=0,2' + '&status=2').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 2) {
          // 未审核-------融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status__in=0,2' + '&status=1').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
      // ----------助贷中---------------
      else if (that.btnClass === 2) {
        if (index === 0) {
          // 全部---------融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=1').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 1) {
          // 审核中-------融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=1' + '&status=2').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 2) {
          // 未审核-------融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=1' + '&status=1').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
      // ----------赔付中---------------
      else if (that.btnClass === 3) {
        if (index === 0) {
          // 全部---------融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=3').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 1) {
          // 未赔付---------
        } else if (index === 2) {
          // 已赔付---------
        } else if (index === 3) {
          // 赔付已还款---------
        }
      }
      // ----------已完结---------------
      else if (that.btnClass === 4) {
        if (index === 0) {
          // 全部---------融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=4').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 1) {
          // 融资完成---------
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=4' + '&status=4').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 2) {
          // 融资失败---------
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=4' + '&status=0').then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
    },
    // 本次助贷管理
    theHelpClick (item) {
      const that = this
      that.form.name = item.business_info.name
      that.form.group = item.member_info.group
      if (that.form.rate) {
        that.form.rate = item.helping_data.rate
      }
      that.form.single_limit = item.member_info.single_limit
      that.form.total_limit = item.member_info.total_limit
      that.form.value = item.expect_data.value
      that.form.amount = item.helping_data.value
      that.help_id = item.id
      that.form.financing = item
      that.managementVisible = true
    },
    // 本次助贷管理确认
    managementOK () {
      const that = this
      if (that.form.rate === '') {
        that.$message.error('请输入助贷占比')
      } else {
        if (!(/^[0-9]+(.[0-9])?$/.test(that.form.rate))) {
          that.$message.error('请输入正确的助贷占比')
        } else {
          if (that.form.rate === '0') {
            that.$message.error('请输入助贷占比')
          } else {
            if (that.form.amount === '' || Number(that.form.amount) === 0) {
              that.$message.error('助贷金额不能为空')
            } else {
              let data = {}
              data.rate = that.form.rate
              data.value = that.form.amount
              // 修改金额
              that.$ajax.put(`/api/financing/application/` + that.help_id + '/', {helping_data: data}).then(res => {
                that.$message.success('修改成功')
                that.managementVisible = false
                if (that.agreeRefuseFund === 0) {
                  // 助贷
                  that.$ajax.put(`/api/financing/application/` + that.help_id + '/', {helping_status: '1'}).then(res => {
                    that.$message.success('助贷成功')
                  }).catch(err => {
                    that.$message.error(err.response.data.err_msg)
                  })
                }
                // 融资列表
                that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
                  that.helpData = res.data.results
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
    },
    // 取消
    handleClose () {
      const that = this
      that.managementVisible = false
      that.agreeRefuseFund = -1
      console.log(that.agreeRefuseFund)
    },
    // 查看金融机构主页
    handleEdit (index, item) {
      const that = this
      window.open('#/institutionBlog?bid=' + item.institution_id + '&fType=1')
    },
    // 查看详情
    selectFrom (index, item) {
      const that = this
      console.log(item)
      if (item.loan_process_status === '100') {
        that.$message('预审中')
      } else if (item.loan_process_status === '101') {
        that.$message('预审通过')
      } else if (item.loan_process_status === '102') {
        that.$message('预审不通过')
      } else {
        window.open('#/order/whole?id=' + item.id)
      }
    },
    // 求和公示
    handleSum (arr) {
      let s = 0
      if (arr) {
        arr.forEach(el => {
          el.order.forEach(val => {
            s += Number(val.amount)
          })
        })
      } else {
        s = 0
      }
      return this.toThousands(s)
    },
    // 格式化时间戳
    handleTime (str) {
      let time = ''
      str ? time = str.substr(0, str.indexOf('T')) : time = ''
      return time
    },
    // 查看各项指标详细数据
    handleCheck (i, item) {
      const URLList = ['', '/helpPurpose', '/credit_app/loac_aid', '/helpFirst', '/helpSecond']
      let query = {}
      if (i === 3) {
        query.financing_application_id = item.id
        query.chain_id = item.first_repayment[0].chain_id
      } else {
        query.financing_id = item.id
      }
      const {href} = this.$router.resolve({
        path: URLList[i],
        query
      })
      window.open(href, '_blank')
    },
    // 切换按钮
    btnClick (index) {
      const that = this
      that.btnClass = index
      that.currPage = 1
      that.btnListClass = 0
      if (index === 0) {
        that.btnListName = []
        // 融资列表
        that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.helpData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 1) {
        // 未助贷
        that.btnListName = ['全部', '融资审核中', '融资未审核']
        // 融资列表
        that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status__in=0,2').then(res => {
          that.helpData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 2) {
        // 助贷中
        that.btnListName = ['全部', '融资审核中', '融资未审核']
        // 融资列表
        that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=1').then(res => {
          that.helpData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        if (index === 3) {
          // that.btnListName = ['全部', '未赔付', '已赔付', '赔付已还款']
          that.btnListName = []
          // 融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=' + 3).then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        } else if (index === 4) {
          // that.btnListName = ['全部', '融资完成', '融资失败']
          that.btnListName = []
          // 融资列表
          that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize + '&helping_status=' + 8).then(res => {
            that.helpData = res.data.results
            that.total = res.data.count
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }
    },
    // 分页
    handleSizeChange (val) {
      const that = this
      that.currPage = val
      // 融资列表
      that.$ajax.get('/api/financing/application/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
        that.helpData = res.data.results
        that.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handlePic (el) {
      window.open('#/credit_app/view_detail?financing_id=' + el.id, '_black')
    }
  }
}
</script>

<style lang="less" scoped>
#myFund {
  //padding-top: 70px;
  display: flex;
  min-height: 100%;
  background: #f9f9f9;
  width: 100%;
  .myFunds {
    min-height: 100%;
    width: 100%;
    display: flex;
    .myFund_list {
      // width: 100%;
      .navs {
        height: 60px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        padding: 0 35px;
        background: #fff;
        h3 {
          float: left;
          height: 60px;
          padding-top: 15px;
          font-family:PingFangSC-Medium;
          font-size:18px;
          color:#333;
          letter-spacing:0;
          img {
            margin: 5px 15px 0;
            float: left;
          }
        }
        p {
          float: right;
          line-height: 60px;
          padding-right: 50px;
        }
      }
      .list_content {
        padding: 10px 100px 20px 50px;
        width: 100%;
        height: 100%;
        .content {
          width: 100%;
          height: auto;
          background: #fff;
          border: 1px solid #eaeaea;
          border-radius: 2px;
          padding: 0 30px 20px;
          // max-width: 1300px;
          .button_list {
            margin-left: 24px;
            height: 50px;
            display: flex;
            flex-direction: row;
            margin-bottom: 30px;
            .left {
              flex: 3;
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
            height: auto;
            padding: 0 30px 0 24px;
            background: #fff;
            .help_nav {
              display: flex;
              flex-direction: row;
              button {
                height: 30px;
                width: 118px;
                border-radius: 30px;
                outline: none;
                background: none;
                border: none;
                color: #333;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              button:hover {
                background: none;
                border: none;
                color: #eb6100;
              }
              .btn_class {
                background: none;
                border: none;
                color: #eb6100;
              }
            }
            .help_list {
              border: 1px solid #eaeaea;
              height: auto;
              margin-bottom: 30px;
              .help_header {
                height: 50px;
                width: 100%;
                background: #f9f9f9;
                line-height: 50px;
                // border-bottom: 1px solid #eaeaea;
                .left {
                  float: left;
                  ul {
                    display: flex;
                    flex-direction: row;
                    li {
                      padding: 0 25px 0 15px;
                      color: #666;
                      font-size: 14px;
                      span:last-child {
                        text-decoration: underline;
                        color: #eb6100;
                        cursor: pointer;
                        font-weight: bold;
                      }
                    }
                    .unline {
                      color: #eb6100;
                      font-weight: bolder;
                    }
                  }
                }
                .right {
                  float: right;
                  ul {
                    display: flex;
                    flex-direction: row;
                    li {
                      padding: 0 15px 0 25px;
                      color: #eb6100;
                      text-decoration: underline;
                      cursor: pointer;
                      font-size: 14px;
                    }
                  }
                }
              }
              .row_list {
                padding: 10px;
              }
              .the_help {
                padding: 0 10px 10px;
                width: 100%;
                height: auto;
                .the_list {
                  background: #f9f9f9;
                  line-height: 50px;
                  display: flex;
                  flex-direction: row;
                  height: 50px;
                  margin-bottom: 10px;
                }
                h3 {
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                  font-weight: bold;
                  padding-left: 27px;
                }
                ul {
                  display: flex;
                  flex-direction: row;
                  li {
                    font-size:12px;
                    padding-left: 50px;
                    color: #666666;
                    letter-spacing:0;
                    text-align:left;
                    font-weight: bold;
                    padding-left: 30px;
                  }
                  .red {
                    color: #e60012;
                  }
                  .nored {
                    color: #eb6100;
                    text-decoration: underline;
                    cursor: pointer;
                  }
                }
              }
              .select_list {
                padding: 0 20px 20px;
                width: 100%;
                height: auto;
                .list_assets {
                  border-top: 1px solid #eaeaea;
                  padding-top: 20px;
                  display: flex;
                  flex-direction: row;
                  .table_list {
                    width: auto;
                  }
                  h3 {
                    font-size:14px;
                    color:#333333;
                    letter-spacing:0;
                    text-align:left;
                    font-weight: bold;
                    padding-left: 20px;
                    padding-right: 30px;
                  }
                  button {
                    color: #eb6100;
                    text-decoration: underline;
                    background: none;
                    border: none;
                    outline: none;
                  }
                }
              }
            }
            .el_col_list {
              padding: 0 13px 10px 16px;
              border-right: 1px dashed #e1e6f0;
              h3 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                span:first-child {
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                  font-weight: bold;
                }
                span:last-child {
                  font-size: 14px;
                  color: #eb6100;
                  text-decoration: underline;
                  cursor: pointer;
                }
                // p {
                //   float: right;
                //   font-size:14px;
                //   span {
                //     font-family:PingFangSC-Medium;
                //     color:#333333;
                //     letter-spacing:0;
                //     text-align:left;
                //     display: inline-block;
                //     transform: scale(0.8);
                //     -webkit-transform: scale(0.8);
                //     padding-left: 5px;
                //   }
                // }
              }
              h4 {
                height: 18px;
                span {
                  font-family:PingFangSC-Regular;
                  font-size:14px;
                  color:#e87626;
                  letter-spacing:0;
                  text-align:left;
                  float: left;
                  width: 60%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  text-decoration: underline;
                }
                button {
                  float: right;
                  background:#f48537;
                  border-radius:2px;
                  width: 50px;
                  height: 20px;
                  font-family:PingFangSC-Regular;
                  font-size:8px;
                  color:#ffffff;
                  letter-spacing:0;
                  text-align:center;
                  border: none;
                  line-height: 20px;
                  outline: none;
                }
                .a {
                  font-size:8px;
                  transform: scale(0.8);
                  -webkit-transform: scale(0.8);
                }
              }
              ul {
                min-height: 120px;
                // max-width: 250px;
                li {
                  margin-top: 12px;
                  display: flex;
                  flex-direction: row;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  p {
                    font-family:PingFangSC-Regular;
                    font-size:14px;
                    color:#666666;
                    letter-spacing:0;
                    text-align:left;
                    line-height: 20px;
                    flex: 1;
                  }
                  span {
                    font-family:PingFangSC-Semibold;
                    font-size:14px;
                    color:#333333;
                    letter-spacing:0;
                    text-align:right;
                    min-width: 58px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: bold;
                  }
                }
                li.order_line {
                  display: flex;
                  flex-direction: column;
                  &>span div {
                    display: flex;
                    // padding: 0 12px;
                    justify-content: space-between;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 25px;
                    span:first-child {
                      width: 40%;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      text-align: left;
                    }
                  }
                }
                li.institution_line {
                  display: flex;
                  // line-height: 30px;
                  // margin-top: 12px;
                  justify-content: space-between;
                  span:first-child {
                    width: 70%;
                  }
                  span:last-child {
                    color: #eb6100;
                    // cursor: pointer;
                    font-weight: bolder;
                  }
                }
              }
            }
            .last_two {
              padding: 0 3px 10px 16px;
              border-right: none;
              h3 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                span:first-child {
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                  font-weight: bold;
                  min-width: 70px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                span:last-child {
                  font-size: 14px;
                  color: #eb6100;
                  text-decoration: underline;
                  cursor: pointer;
                  min-width: 50px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
            .right_no {
              border-right: none;
            }
            .block {
              margin: 30px auto;
              text-align: center;
            }
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
        border: 1px solid #eaeaea;
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
</style>
