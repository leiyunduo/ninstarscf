<template>
  <div class='enterpriseBlog'>
    <div class='info-enter'>
      <div class="lista">
        <div class="blog_header">
          <div class="blog_header_top">
            <div class="blog_header_top_left">
              <!-- <img src="../../../static/img/img.png" alt=""> -->
              <img :src="showIcon(enterList)" alt="">
            </div>
            <div class="blog_header_top_right">
              <h4>{{ companyInformation.detail_info.name }}
              <div class="c_verify_bg"></div></h4>
              <div class="blog_header_bottom">
                <!-- <button @click="comeBank">返回</button> -->
              </div>
              <ul>
                <li>
                  <p>电话：<span>{{ companyInformation.detail_info.contact_info.phone }}</span><span v-if="!companyInformation.detail_info.contact_info.phone">企业未上传</span></p>
                </li>
                <li>
                  <p>邮箱：<span>{{ companyInformation.detail_info.contact_info.email }}</span><span v-if="!companyInformation.detail_info.contact_info.email">企业未上传</span></p>
                </li>
              </ul>
              <ul>
                <li>
                  <p>网址：<span>{{ companyInformation.detail_info.contact_info.fax }}</span><span v-if="!companyInformation.detail_info.contact_info.fax">企业未上传</span></p>
                </li>
                <li>
                  <p>地址：
                    <el-tooltip class="item" effect="dark" :content="companyInformation.detail_info.contact_info.address" placement="top-start">
                      <span>{{companyInformation.detail_info.contact_info.address}}</span>
                    </el-tooltip>
                    <span v-if="companyInformation.detail_info.contact_info.address">企业未上传</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list_ul">
          <ul>
            <li v-for="(item, index) in listTitle" :key="index" :class="{active_li: activeShow === index}" @click="listClick(index)"><span>{{item}}</span></li>
          </ul>
        </div>
        <!-- 自我评级 -->
        <div class="self_rating" v-if="activeShow === 4">
          <div class="blog_nav">
            <h3>自我评级</h3>
            <h4>外部环境</h4>
            <div class="blog_cont">
              <ul>
                <li>
                  <p>政策环境</p>
                  <div>{{ selfAppraisal.policy_environment }}</div>
                  <div v-if="selfAppraisal.policy_environment === null">暂无数据</div>
                </li>
                <li>
                  <p>行业环境</p>
                  <div>{{ selfAppraisal.industry_environment }}</div>
                  <div v-if="selfAppraisal.industry_environment === null">暂无数据</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="blog_nav1">
            <h4>我的企业素质</h4>
            <ul>
              <li>
                <p>企业基本素质</p>
                <div>{{ selfAppraisal.basic_quality }}</div>
                <div v-if="selfAppraisal.basic_quality === null">暂无数据</div>
              </li>
              <li>
                <p>偿债能力</p>
                <div>{{ selfAppraisal.repaying_capability }}</div>
                <div v-if="selfAppraisal.repaying_capability === null">暂无数据</div>
              </li>
              <li>
                <p>营运能力</p>
                <div>{{ selfAppraisal.operation_ability }}</div>
                <div v-if="selfAppraisal.operation_ability === null">暂无数据</div>
              </li>
              <li>
                <p>盈利能力</p>
                <div>{{ selfAppraisal.profit_ability }}</div>
                <div v-if="selfAppraisal.profit_ability === null">暂无数据</div>
              </li>
              <li>
                <p>成长能力</p>
                <div>{{ selfAppraisal.growth_ability }}</div>
                <div v-if="selfAppraisal.growth_ability === null">暂无数据</div>
              </li>
            </ul>
          </div>
          <div class="blog_nav">
            <h3>我的企业融资项下资产状况</h3>
            <div class="blog_cont">
              <ul>
                <li>
                  <p>质押物状况</p>
                  <div>{{ selfAppraisal.pledge_situation }}</div>
                  <div v-if="selfAppraisal.pledge_situation === null">暂无数据</div>
                </li>
                <li>
                  <p>应收账款情况</p>
                  <div>{{ selfAppraisal.receivables_situation }}</div>
                  <div v-if="selfAppraisal.receivables_situation === null">暂无数据</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="blog_nav">
            <h3>我的企业素质</h3>
            <div class="blog_cont">
              <ul>
                <li>
                  <p>企业资信情况</p>
                  <div>{{ selfAppraisal.credit_situation }}</div>
                  <div v-if="selfAppraisal.credit_situation === null">暂无数据</div>
                </li>
                <li>
                  <p>企业运营情况</p>
                  <div>{{ selfAppraisal.operation_situation }}</div>
                  <div v-if="selfAppraisal.operation_situation === null">暂无数据</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 工商信息 -->
        <div class="table_list" v-if="activeShow === 0">
          <h3>工商信息</h3>
          <table class="c_info_table" border="1">
            <tr style="height: 42px; line-height: 42px;">
              <td colspan="2" class="gray">法人信息</td>
              <td colspan="2" class="gray c_reg_td">注册信息</td>
            </tr>
            <tr style="height: 138px;">
              <td colspan="2" class="c_legal_person_info">
                <div class="c_legal_td_top">
                  <img src="/static/img/boss.png" alt="法人">
                  <div class="c_legal_info">
                    <h4 v-if="companyInformation.legal_person_info">{{ companyInformation.legal_person_info.name || '未填写'}}</h4>
                  </div>
                </div>
              </td>
              <td colspan="2" class="c_reg_info">
                <p>
                  <span>注册资本</span>
                  <span>{{ companyInformation.register_assets }}</span>
                  <span v-if="!companyInformation.register_assets">暂无数据</span>
                </p>
                <p>
                  <span>注册时间</span>
                  <span>{{ companyInformation.year_founded }}</span>
                  <span v-if="!companyInformation.year_founded">暂无数据</span>
                </p>
                <p>
                  <span>公司状态</span>
                  <span class="blue">{{ companyInformation.register_status }}</span>
                  <span v-if="!companyInformation.register_status">暂无数据</span>
                </p>
              </td>
            </tr>
            <tr>
              <td class="gray">工商注册号</td>
              <td class="c_no">
                <span class="blue">{{ companyInformation.no }}</span>
                <span v-if="!companyInformation.no">暂无数据</span>
              </td>
              <td class="gray">组织机构代码</td>
              <td class="c_org_certificate_id">
                <span>{{ companyInformation.org_certificate_id }}</span>
                <span v-if="!companyInformation.org_certificate_id">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">统一信用代码</td>
              <td class="c_credit_code">
                <span>{{ companyInformation.credit_code }}</span>
                <span v-if="!companyInformation.credit_code">暂无数据</span>
              </td>
              <td class="gray">公司类型</td>
              <td class="c_institutional_type">
                <span>{{ companyInformation.institutional_type }}</span>
                <span v-if="!companyInformation.institutional_type">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">纳税人识别号</td>
              <td class="c_taxpayer_license_id">
                <span>{{ companyInformation.taxpayer_license_id }}</span>
                <span v-if="!companyInformation.taxpayer_license_id">暂无数据</span>
              </td>
              <td class="gray">行业</td>
              <td class="c_trade">
                <span class="blue">{{ companyInformation.trade }}</span>
                <span v-if="!companyInformation.trade">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">注册地址</td>
              <td colspan="3" class="c_address">
                <span>{{ companyInformation.address }}</span>
                <span v-if="!companyInformation.address">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">经营范围</td>
              <td colspan="3" class="c_scope">
                <span>{{ companyInformation.scope }}</span>
                <span v-if="!companyInformation.scope">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">营业期限</td>
              <td colspan="3" class="c_scope">
                <span class="blue">{{ companyInformation.term_start || '未指定'}} - {{companyInformation.term_end || '未指定'}}</span>
              </td>
            </tr>
            <tr>
              <td class="gray">登记机关</td>
              <td colspan="3" class="c_scope">
                <span class="blue">{{ companyInformation.belong_org }}</span>
                <span v-if="!companyInformation.belong_org">暂无数据</span>
              </td>
            </tr>
          </table>
        </div>
        <!-- 荣誉资质 -->
        <div class="img_list" v-if="activeShow === 2">
          <h3>荣誉资质</h3>
          <ul class="item_wrap">
            <li v-for="(item, index) in imgUrl" :key="index">
              <div class="item_t">
                <img :src="$root_url() + item.picture" alt="1" @click="imgLists(item, index)">
              </div>
            </li>
            <li v-if="imgUrl.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="/static/img/tops.png" alt="">Oops！空空如也... ...</li>
          </ul>
        </div>
        <!-- 新闻公告 -->
        <div class="new_list" v-if="activeShow === 3">
          <h3>新闻公告中心</h3>
          <ul>
            <li v-for="(item, index) in newsList" :key="index" @click="selectNews(index, item)">
              <div class="pic_img">
                <img class="pic" v-if="item.picture !== null" :src="$root_url() + item.picture">
                <img class="pic" src="/static/img/news.png" v-if="item.picture === null" alt="">
              </div>
              <div class="pic_style">
                <span>{{ item.title }}</span>
                <span>{{ item.post_time }}</span>
                <p class="body_list">{{item.body}}</p>
              </div>
            </li>
          </ul>
          <p v-if="newsList.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900; padding: 20px 30px;"><img src="/static/img/tops.png" alt="">Oops！空空如也... ...</p>
          <div class="block" style="text-align:center;">
            <el-pagination v-if="total" @current-change="handleSizeChange"
              :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
        <!-- 财务状况 -->
        <div class="new_lists" v-if="activeShow === 1">
          <h3 class="h3">财务状况</h3>
          <div class="button_list">
            <button class="only" :class="{active: isActive}" @click="onlyList">全部</button>
            <div class="no_del" v-for="(item, index) in btnList" :key="index">
              <button class="one" :class="{btnActive: btnActive === index}" @click="btnSelect(item, index)">{{item.title}}</button>
            </div>
          </div>
          <div class="box_list">
            <div class="blog_line" v-for="(item, index) in blogList" :key='index' v-if='blogList.length !== 0'>
              <div class="title_top">
                <div class="title">
                  <div><h3>{{item.group_title}}</h3></div>
                  <div><span>所属时间：<a href="#">{{item.dates}}</a></span></div>
                  <div><span>来源：<a href="#">{{item.business_name}}</a></span></div>
                  <div><span><a href="#">{{item.create_time}}</a></span></div>
                </div>
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">
                    <div class="list_btn">
                      <span @click="downList(item)">查看</span>
                    </div>
                  </div>
                  <div class="el_div_button">
                    <el-button><i class="el-icon-arrow-down"></i></el-button>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
          <p v-if="blogList.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="/static/img/tops.png" alt="">Oops！空空如也... ...</p>
          <div style="text-align:center;">
            <el-pagination v-if="total1" @current-change="handleSizeChange1"
              :current-page="currPage1" :page-size="pageSize1" layout="total, prev, pager, next, jumper" :total="total1">
            </el-pagination>
          </div>
        </div>
        <div class="chain_list" v-if="activeShow === 5">
          <h3>链式记账</h3>
          <ul>
            <li @click="handleChainTab(item, index)" v-for='(item, index) in chainType' :key='index' :style="index === selType ? 'background: #f48537; color: #fff':''">{{item.name}}</li>
          </ul>
          <div class="chain_table">
            <div class='chain_table_title'>
              <div>销售项目</div>
              <div>创建时间</div>
              <div>查看</div>
            </div>
            <div v-for='(item, index) in showChain' :key='index'>
              <div>{{item.name}}</div>
              <div>{{item.create_time}}</div>
              <div>
                <span @click="handleChainDetail(item.id)">查看</span>
              </div>
            </div>
            <p v-if='showChain.length === 0' class="chain_table_null">暂无记账</p>
          </div>
        </div>
        <!-- 采购信息 -->
        <div class="purchase" v-if="purchaseShow">
          <div class="content" v-for="(item, index) in procurementInfoData" :key="index">
            <el-collapse v-model="activeNames">
              <el-collapse-item :title="item.title" :name="index">
                <div class="top_div">
                  <p>标题：</p>
                  <h3>{{item.title}}</h3>
                </div>
                <div>
                  <div class="cont_div">
                    <ul>
                      <li>
                        <p>采购量：</p>
                        <span>{{item.amount}}</span>
                      </li>
                      <li>
                        <p>目标价格：</p>
                        <span>{{item.target_price}}</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p>规格：</p>
                        <span>{{item.spec}}</span>
                      </li>
                      <li>
                        <p>截止日期：</p>
                        <span>{{item.expiry_date}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="butt_div">
                    <span>详情：</span>
                    <p>{{item.contents}}</p>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <p v-if="procurementInfoData.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="/static/img/tops.png" alt="">Oops！空空如也... ...</p>
        </div>
        <!-- 供应信息 -->
        <div class="purchase" v-if="supplyShow">
          <div class="content" v-for="(item, index) in procurementSupply" :key="index">
            <el-collapse v-model="activeSupply">
              <el-collapse-item :title="item.title" :name="index">
                <div class="top_div">
                  <p>标题：</p>
                  <h3>{{item.title}}</h3>
                </div>
                <div>
                  <div class="cont_div">
                    <ul>
                      <li>
                        <p>供应量：</p>
                        <span>{{item.amount}}</span>
                      </li>
                      <li>
                        <p>目标价格：</p>
                        <span>{{item.target_price}}</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p>规格：</p>
                        <span>{{item.spec}}</span>
                      </li>
                      <li>
                        <p>截止日期：</p>
                        <span>{{item.expiry_date}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="butt_div">
                    <span>详情：</span>
                    <p>{{item.contents}}</p>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <p v-if="procurementSupply.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="/static/img/tops.png" alt="">Oops！空空如也... ...</p>
        </div>
      </div>
      <el-dialog title="荣誉资质" :visible.sync="outerVisible" width="45%" :before-close="handleClose">
        <img :src="$root_url() + url_img" alt="" style='width:100%; height:100%;padding:20px;'>
      </el-dialog>
      <el-dialog :visible.sync="dialogGround" title="财务状况" width="60%" :before-close="handleClose">
        <div class="details">
          <div class="blog_line">
            <div class="title_top">
              <div class="title">
                <div><h3>{{detailsList.group_title}}</h3></div>
                <div><span>所属时间：<a href="#">{{detailsList.dates}}</a></span></div>
                <div><span>来源：<a href="#">{{detailsList.business_name}}</a></span></div>
                <div><span><a href="#">{{detailsList.create_time}}</a></span></div>
              </div>
            </div>
          </div>
          <div class="pic_img" v-html="detailsList.body">
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'businessInfo',
  data () {
    return {
      roles: '',
      activeNames: [],
      // 供应信息
      activeSupply: [],
      procurementSupply: [],
      listTitle: ['工商信息', '财务状况', '荣誉资质', '新闻公告', '自我评级', '记账情况'],
      listSure: ['应收', '应付', '历史'],
      titleList: ['合同名称', '合同编号', '创建时间', '交易公司', '操作'],
      chainType: [
        {name: '应收记账', type: '1'},
        {name: '应付记账', type: '2'}
      ],
      activeShow: 0,
      // 工商信息
      businessCircles: true,
      // 荣誉资质
      honor: false,
      // 财务状况
      newsLists: [],
      // 自我评级
      // 获取全部
      enterList: '',
      sureData: [],
      sureData1: [],
      sureData2: [],
      showSure: true,
      showSure1: false,
      showSure2: false,
      // 采购
      purchaseShow: false,
      // 供应
      supplyShow: false,
      // 服务
      serviceShow: false,
      // 公司信息
      companyInformation: {
        detail_info: {
          name: '',
          contact_info: {
            address: '',
            phone: '',
            email: '',
            fax: ''
          }
        },
        legal_person_info: {
          name: ''
        }
      },
      // 自我评级
      selfAppraisal: '',
      // 荣誉资质
      imgUrl: '',
      // 新闻公告
      newsList: [],
      // 博客
      disabled: true,
      fid: '',
      // 分页
      currPage: 1,
      total: '',
      page_size: '',
      pageSize: 5,
      currPage1: 1,
      total1: '',
      page_size1: '',
      pageSize1: 5,
      // 链式记账参与角色跳转
      sid: '',
      bankid: '',
      outerVisible: false,
      url_img: '',
      // 采购信息
      procurementInfoData: [],
      // 财务状况
      btnList: [],
      blogList: [],
      dialogGround: false,
      btnActive: -1,
      isActive: true,
      finanId: '',
      selType: 0,
      showChain: []
    }
  },
  props: {
    bid: ''
  },
  created () {
    var that = this
    // that.bid = Number(that.$route.query.bid) || that.businessId
    that.roles = localStorage.role
    // 查询博客信息
    that.$ajax.get(`/api/company/` + that.bid + '?detail_info=1').then(res => {
      // 获取全部
      this.enterList = res.data.avatar
      // 公司信息
      this.companyInformation = res.data
      // 自我评级
      this.selfAppraisal = res.data.detail_info.self_appraisal || {}
    })
  },
  methods: {
    // 财务状况------查看
    downList (item) {
      var that = this
      // 查看财务状况详情
      that.$ajax.get(`/api/home_page/` + that.bid + `/financial_situation/` + item.id).then(res => {
        that.detailsList = res.data
        that.dialogGround = true
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // -财务状况------查看某个分组下的内容
    btnSelect (item, index) {
      var that = this
      that.btnActive = index
      that.isActive = false
      this.currPage1 = 1
      that.finanId = item.id
      // 查看财务状况
      that.$ajax.get(`/api/home_page/` + that.bid + `/financial_situation/` + '?page=' + that.currPage1 + '&page_size=' + that.pageSize1 + '&group_id=' + item.id).then(res => {
        that.blogList = res.data.results
        that.total1 = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 财务状况--------查看全部
    onlyList () {
      var that = this
      that.isActive = true
      this.currPage1 = 1
      that.btnActive = -1
      // 查看财务状况
      that.$ajax.get(`/api/home_page/` + that.bid + `/financial_situation/` + '?page=' + that.currPage1 + '&page_size=' + that.pageSize1).then(res => {
        that.blogList = res.data.results
        that.total1 = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 头像
    showIcon: function (url) {
      console.log(url)
      if (url) {
        if (url === '/static/default_avatar.png') {
          return 'static/img/tickets/default_business.png';
        } else {
          return this.$root_url() + url
        }
      } else {
        return 'static/img/tickets/default_business.png';
      }
    },
    // 跳到链式记账
    selectSure (item, i) {
      var that = this
    },
    // 荣誉资质图片关闭
    handleClose () {
      this.outerVisible = false
      this.dialogGround = false
    },
    // 荣誉资质图片放大
    imgLists (item, index) {
      var that = this
      that.outerVisible = true
      that.url_img = item.picture
    },
    // 博客跳转
    selectNews (index, item) {
      var that = this
      that.$router.push({
        path: '/blogNews',
        query: {
          id: item.id,
          bid: that.bid
        }
      })
    },
    // 添加商友
    addFriend () {
      var that = this
      that.$ajax.post('/api/application/', {token: that.$token(), acc_obj_id: that.fid}).then((res) => {
        // console.log(res)
        if (res.data.code === '1') {
          this.$message({
            message: '添加成功，请等待对方同意',
            type: 'warning',
            duration: 2000
          })
        } else if (res.data.code === '-2') {
          this.$message({
            message: '该企业已是你的商友',
            type: 'warning',
            duration: 2000
          })
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      var that = this
      this.currPage = val
      that.$ajax.get(`/api/home_page/` + that.bid + `/news/` + '?page=' + that.currPage + '&page_size=' + that.pageSize).then(res => {
        // 新闻公告
        that.newsList = res.data.results
        that.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 财务状况--------分页
    handleSizeChange1 (val) {
      var that = this
      this.currPage1 = val
      // 查看财务状况
      that.$ajax.get(`/api/home_page/` + that.bid + `/financial_situation/` + that.finanId + '?page=' + that.currPage1 + '&page_size=' + that.pageSize1).then(res => {
        that.blogList = res.data.results
        that.total1 = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    listClick (index) {
      var that = this
      that.activeShow = index
      if (index === 0) {
        that.purchaseShow = false
        that.supplyShow = false
        that.serviceShow = false
      } else if (index === 1) {
        that.purchaseShow = false
        that.supplyShow = false
        that.serviceShow = false
        // 分组
        that.$ajax.get(`/api/home_page/` + that.bid + `/financial_situation_group/` + '?business_id=' + that.bid).then(res => {
          that.btnList = res.data
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
        // 查看财务状况
        that.$ajax.get(`/api/home_page/` + that.bid + `/financial_situation/` + '?page=' + that.currPage1 + '&page_size=' + that.pageSize1).then(res => {
          that.blogList = res.data.results
          that.total1 = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 2) {
        that.purchaseShow = false
        that.supplyShow = false
        that.serviceShow = false
        that.$ajax.get(`/api/home_page/` + that.bid + `/honor/`).then(res => {
          // 荣誉资质
          that.imgUrl = res.data.results
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 3) {
        that.purchaseShow = false
        that.supplyShow = false
        that.serviceShow = false
        that.$ajax.get(`/api/home_page/` + that.bid + `/news/` + '?page=' + that.currPage + '&page_size=' + that.pageSize).then(res => {
          // 新闻公告
          that.newsList = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 4) {
        that.purchaseShow = false
        that.supplyShow = false
        that.serviceShow = false
      } else if (index === 5) {
        that.handleChain(1)
      }
    },
    // 详情
    detailsList () {
      this.$alert(this.companyInformation.company_profile, '公司简介', {
        confirmButtonText: '确定'
      })
    },
    // 查询博客信息
    blogEnter () {
      this.$ajax.get('/api/blog/business/?token=' + this.$token() + '&business_id=' + '1').then(res => {
        if (res.data.code === '1') {
          // 获取全部
          this.enterList = res.data.avatar
          // 公司信息
          this.companyInformation = res.data
          // // 自我评级
          this.selfAppraisal = res.data.detail_info.self_appraisal
        }
      })
    },
    // 获取链式记账
    handleChain (type) {
      const that = this
      that.$ajax.get(`/api/chain/chain_list/?type=${type}&company_id=${that.$route.query.bid}`).then(res => {
        console.log(res)
        if (res.status === 200) {
          let showChain = []
          res.data.forEach(item => {
            let obj = {}
            if (item.sales_contract[0]) {
              obj.name = item.sales_contract[0].name
              obj.create_time = item.sales_contract[0].create_time
              obj.id = item.id
              showChain.push(obj)
            }
          })
          that.showChain = showChain
        }
      })
    },
    // 更换查看链式记账tab
    handleChainTab (el, index) {
      this.handleChain(el.type)
      this.selType = index
    },
    // 查看链式记账详情
    handleChainDetail (id) {
      let url = '#/credit_app'
      if (this.selType === 0) {
        url += ('/chain_detail?id=' + id)
      } else {
        url += ('/chain_info?id=' + id)
      }
      window.open(url, '_black')
    }
  }
}
</script>
<style lang='less' scoped>
.list_btn {
  span {
    cursor: pointer;
    display: block;
    font-family:PingFangSC-Regular;
    font-size:10px;
    color:#6a6a6a;
    letter-spacing:0;
    background: none;
    border: none;
    border-bottom: 1px solid #e1e6f0;
    outline: none;
    padding-top: 3px;
    width: 52px;
    text-align: center;
  }
  span:hover {
    color: #eb6100;
  }
}
.details {
  height: auto;
  padding: 20px;
  .blog_line {
    height: 40px;
    background: #fff;
    border: 1px solid #e7ebee;
    margin-bottom: 30px;
    overflow: hidden;
    .title_top {
      height: 40px;
      display: flex;
      line-height: 40px;
      flex-direction: row;
      border-bottom: 1px solid #e7ebee;
      i {
        cursor: pointer;
      }
      span {
        font-family:PingFangSC-Regular;
        font-size:10px;
        color:#999999;
        letter-spacing:0;
        text-align:left;
        a {
          font-family:PingFangSC-Regular;
          font-size:10px;
          color:#eb6100;
          letter-spacing:0;
          text-align:left;
          text-decoration: none;
        }
      }
    }
    .title {
      flex: 1;
      text-align: left;
      padding-left: 32px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      h3 {
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
      }
      div {
        padding-right: 30px;
      }
    }
    div:last-child {
      color: #696969;
      font-size: 12px;
    }
    i {
      margin: 11px 11px 0 25px;
      font-size: 16px;
    }
  }
  .pic_img {
    height: auto;
    margin-top: 20px;
  }
}
.el_div_button {
  padding-right: 10px;
  .el-button:focus, .el-button:hover {
    color: #000000;
    border-color: none;
    background-color: none;
  }
  .el-button {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: none;
    border: none;
    color: #000000;
    outline: 0;
    padding: 0;
    text-align: center;
  }
}
.enterpriseBlog {
  width: 100%;
  // background: rgba(237, 241, 244, 1);
  // min-height: 100%;
  // //padding-top: 70px;
  .info-enter {
    height: auto;
    position: relative;
    .lista {
      background: #fff;
      font-size: 14px;
      width: 84%;
      margin: 0 auto;
      padding: 20px 0;
      height: auto;
      position: relative;
    }
    .blog_header {
      position: relative;
      min-height: 180px;
      border-bottom: 1px solid #eaeaea;
      .blog_header_top {
        .blog_header_top_left {
          float: left;
          width: 148px;
          height: 148px;
          img {
            border-radius: 50%;
            width: 148px;
            height: 148px;
            border-radius: 50%;
          }
        }
        .blog_header_top_right {
          float: left;
          margin-left: 50px;
          h4 {
            line-height: 50px;
            font-size: 16px;
            font-weight: bold;
          }
          .c_verify_bg {
            width: 60px;
            height: 60px;
            background: url(../../../../../static/img/authentication/auth.png);
            background-size: 100% 100%;
            position: absolute;
            top: 0;
            left: 450px;
          }
          &>ul {
            display: flex;
            li {
              flex: 1;
              line-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 30px;
              font-size: 14px;
              width: 400px;
              p {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 30px;
                font-size: 14px;
              }
            }
          }
          .over_hide {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 30px;
            font-size: 14px;
            width: 900px;
            display: flex;
            flex-direction: row;
            span {
              display: inline-block;
              width: 800px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              padding-left: 20px;
            }
            button {
              background: none;
              border: none;
              outline: none;
              position: absolute;
              right: 19%;
              bottom: 27px;
              color: #eb6100;
            }
          }
        }
      }
      .blog_header_bottom {
        position: absolute;
        right: 0;
        top: 10px;
        button {
          line-height: 30px;
          border: 1px solid #eb6100;
          color: #eb6100;
          width: 90px;
          background: none;
          border-radius: 5px;
          outline: none;
        }
        .over {
          background: #eaeaea;
        }
      }
    }
    .list_ul {
      width: 100%;
      height: 54px;
      // padding-top: 111px;
      margin-bottom: 20px;
      border-bottom: 1px solid #eaeaea;
      ul {
        display: flex;
        height: 54px;
        border-bottom: 1px solid #eaeaea;
        text-align: center;
        flex-direction: row;
        line-height: 54px;
        li {
          width: auto;
          padding: 0 20px;
          cursor: pointer;
          span {
            display: inline-block;
            width: 100%;
            height: 20px;
            // border-right: 1px solid #c2cbd0;
          }
        }
        .active_li {
          border-bottom: 2px solid #eb6100;
          color: #eb6100;
        }
      }
    }
    .table_list {
      height: auto;
      // padding-bottom: 50px;
      h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        // margin-bottom: 50px;
        border-left: 5px solid #eb6100;
      }
      /* 表格 */
      .c_info_table{
        margin-top: 20px;
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }
      .gray{
        background: #f7f7f7;
      }
      .c_eb{
        color: #eb6100;
      }
      .c_info_table tr{
        height: 60px;
      }
      .c_info_table td{
        border: 1px solid #eaeaea;
        padding: 0 20px;
        vertical-align: middle;
        box-sizing: border-box;
      }
      td.gray{
        width: 167px;
        text-align: center;
        padding: 0;
        color: #666;
      }
      .c_legal_td_top{
        overflow: hidden;
        padding: 15px 0;
      }
      .c_legal_td_top img{
        border-radius: 50%;
        width: 62px;
        height: 62px;
        float: left;
      }
      .c_legal_person_info p{
        line-height: 30px;
      }
      .blue {
        color: blue;
      }
      .c_legal_td_top div{
        float: left;
        margin-left: 30px;
      }
      .c_legal_td_top div h4{
        color: #eb6100;
        font-size: 18px;
        line-height: 32px;
      }
      .c_info_table .c_reg_info{
        padding-left: 55px;
        box-sizing: border-box;
      }
      .c_reg_info p{
        line-height: 30px;
      }
      .c_reg_info p span:nth-of-type(1){
        margin-right: 60px;
        color: #666;
      }
      .c_reg_td{
        position: relative;
      }
      .c_reg_td span{
        text-decoration: underline;
        position: absolute;
        right: 20px;
        color: #eb6100;
        cursor: pointer;
      }
      .table_list_top {
        background: #fff;
        height: auto;
        -moz-box-shadow: 2px 2px 5px #c5c0c0, -2px -2px 5px #eaeaea;
        -webkit-box-shadow: 2px 2px 5px #c5c0c0, -2px -2px 5px #eaeaea;
        box-shadow: 2px 2px 5px #c5c0c0, -2px -2px 5px #eaeaea;
        .table_list_top_left {
          margin-bottom: 26px;
          .head {
            padding-left: 64px;
            color: #666666;
            height: 50px;
            line-height: 50px;
          }
          .bottom {
            height: 168px;
            border-bottom: 1px dashed #f5f7f8;
            width: 1140px;
            margin: 0 auto;
            padding-bottom: 30px;
            .bit_head {
              display: flex;
              flex-direction: row;
              img {
                width: 122px;
                height: 80px;
                margin: 30px 40px;
                border: 1px solid #f5f7f8;
              }
              div {
                padding-top: 30px;
                h2 {
                  font-size: 14px;
                  color: #999999;
                  padding-bottom: 10px;
                }
                p {
                  color: #999999;
                  line-height: 28px;
                  font-size: 12px;
                  span {
                    color: #eb6100;
                    display: inline-block;
                    padding: 0 5px;
                  }
                }
              }
            }
          }
        }
        .table_list_top_right {
          .head {
            padding-left: 64px;
            color: #666666;
            height: 50px;
            line-height: 50px;
          }
          .head_list {
            height: 320px;
            width: 1140px;
            margin: 0 auto;
            padding-bottom: 30px;
            padding-top: 30px;
            ul {
              height: 48px;
              border-bottom: 1px dashed #f5f7f8;
              display: flex;
              flex-direction: row;
              line-height: 48px;
              li {
                flex: 1;
                color: #999999;
                font-size: 12px;
                padding-right: 20px;
                width: 360px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                p {
                  display: inline-block;
                  font-size: 12px;
                }
              }
            }
            .ul_last {
              border: none;
            }
          }
          .head1 {
            height: 70px;
            text-align: center;
            border-bottom: 1px solid #bfbfbf;
            line-height: 30px;
            p {
              color: rgba(206, 204, 204, 0.87);
            }
            .blue {
              color: blue;
            }
          }
        }
      }
    }
    .self_rating {
      height: auto;
      padding-bottom: 50px;
      .blog_nav {
        height: 268px;
        background: #fff;
        margin-bottom: 40px;
        h3 {
          height: 30px;
          font-weight: 700;
          font-style: normal;
          line-height: 30px;
          padding-left: 20px;
          font-size: 16px;
          margin-bottom: 20px;
          border-left: 5px solid #eb6100;
        }  
        h4 {
          margin: 0 20px;
          height: 66px;
          border-bottom: 1px solid #e7ebee;
          padding-top: 30px;
          font-size: 16px;
        }
        .blog_cont {
          ul {
            display: flex;
            flex-direction: row;
            li {
              flex: 1;
              // padding-left: 60px;
              padding: 0 20px;
              margin-top: 20px;
              color: #9b9b9b;
              height: 116px;
              overflow: hidden;
              div {
                line-height: 25px;
                margin: 0 10px;
              }
            }
            li:nth-child(1) {
              border-right: 1px solid #e7ebee
            }
          }
        }
      }
      .blog_nav1 {
        height: 268px;
        background: #fff;
        margin-bottom: 40px;
        h4 {
          height: 50px;
          background: rgba(204, 204, 204, 0.3);
          padding: 14px 0 0 30px;
          color: #666;
          font-size: 16px;
        }
        ul {
          display: flex;
          flex-direction: row;
          li {
            flex: 1;
            margin-top: 20px;
            color: #9b9b9b;
            height: 116px;
            overflow: hidden;
            text-align: center;
            border-right: 1px solid #e7ebee;
            div {
              line-height: 25px;
              margin: 0 10px;
            }
          }
          li:nth-child(5) {
            border-right: none;
          }
        }
      }
    }
    .img_list {
      height: auto;
      padding-bottom: 50px;
      h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        margin-bottom: 50px;
        border-left: 5px solid #eb6100;
      }
      .item_wrap {
        height: auto;
        padding: 20px 30px;
        list-style: none;
        overflow: hidden;
        li {
          display: inline-block;
          min-width: 260px;
          width: calc(20% - 15em);
          // margin: 20px .5em 0;
          vertical-align: top;
          .item_t {
            padding-bottom: 70%;
            position: relative;
            img {
              position: absolute;
              width: 100%;
              height: 100%;
              cursor: pointer;
            }
          }
          .item_b {
            margin: .5em .5em 1em;
            h4 {
              margin: 10px 0 0;
              color: #fff;
              font-size: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
            }
          }
        }
      }
    }
    .new_list {
      height: auto;
      padding-bottom: 50px;
      h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        border-left: 5px solid #eb6100;
      }
      ul {
        padding-bottom: 50px;
        li {
          cursor: pointer;
          height: 240px;
          background: #fff;
          margin-top: 40px;
          display: flex;
          flex-direction: row;
          padding: 20px;
          border: 1px solid #eaeaea;
          .pic_img {
            margin-right: 30px;
            width: 300px;
            .pic {
              width: 250px;
              height: 200px;
              overflow: hidden;
            }
            img {
              width: 250px;
              height: 200px;
            }
          }
          .pic_style {
            width: auto;
            max-width: 1000px;
          }
          span {
            display: inline-block;
            padding: 20px 30px 30px 20px;
          }
          .body_list {
            // width: 500px;
            height: 130px;
            overflow-y: scroll;
            text-align: left;
            line-height: 24px;
            text-indent: 2em;
            padding-right: 46px;
            word-break: break-all;
            cursor: pointer;
          }
          .body_list::-webkit-scrollbar{
            display: none;
          }
          // img {
          //   width: 280px;
          //   height: 160px;
          //   float: left;
          //   margin: 30px;
          // }
          // div {
          //   padding-left: 20px;
          //   float: left;
          //   font-family: "Microsoft YaHei";
          //   span {
          //     display: inline-block;
          //     font-weight: 700;
          //     font-size: 18px;
          //     padding-top: 68px;
          //     font-size: 18px;
          //     padding-bottom: 40px;
          //   }
          //   p {
          //     color: #a3a3a3;
          //     font-size: 14px;
          //     line-height: 26px;
          //   }
          // }
        }
      }
    }
    .new_lists {
      display: flex;
      flex-direction: column;
      width: auto;
      height: auto;
      padding-bottom: 50px;
      background: #fff;
      // padding: 30px;
      .h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        border-left: 5px solid #eb6100;
      }
      .button_list {
        // margin-top: 11px;
        max-height: 137px;
        padding: 11px 0;
        overflow-y: auto;
        .only {
          float: left;
          background:#f1f1f1;
          border-radius:4px;
          width:130px;
          padding: 0 12px;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#666666;
          letter-spacing:0;
          margin-right: 11px;
          border: none;
          outline: none;
        }
        .only:hover {
          border: none;
          background:#f48537;
          border-radius:4px;
          width:130px;
          padding: 0 12px;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#fff;
          letter-spacing:0;
        }
        .active {
          border: none;
          background:#f48537;
          border-radius:4px;
          width:130px;
          padding: 0 12px;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#fff;
          letter-spacing:0;
        }
        .no_del {
          float: left;
          position: relative;
          .el-icon-remove {
            position: absolute;
            right: 4px;
            top: -5px;
            color: #f23c3c;
            cursor: pointer;
          }
          .one {
            background:#f1f1f1;
            border-radius:4px;
            width:130px;
            padding: 0 12px;
            height:28px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#666666;
            letter-spacing:0;
            margin-right: 11px;
            border: none;
            outline: none;
          }
          .one:hover {
            border: none;
            background:#f48537;
            border-radius:4px;
            width:130px;
            padding: 0 12px;
            height:28px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#fff;
            letter-spacing:0;
          }
          .btnActive {
            border: none;
            background:#f48537;
            border-radius:4px;
            width:130px;
            padding: 0 12px;
            height:28px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#fff;
            letter-spacing:0;
          }
        }
        .no_del:nth-child(1) {
          .el-icon-remove {
            color: #666;
          }
        }
        .no_del:nth-child(2) {
          .el-icon-remove {
            color: #666;
          }
        }
        .no_del:nth-child(3) {
          .el-icon-remove {
            color: #666;
          }
        }
        .no_del:nth-child(4) {
          .el-icon-remove {
            color: #666;
          }
        }
        input {
          float: left;
          border:1px solid #e7e7e7;
          border-radius:4px;
          min-width:100px;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#666666;
          letter-spacing:0;
          background: none;
          outline: none;
          padding: 0 12px;
          margin: 15px 10px 0;
        }
        .ones {
          margin-top: 15px;
          background:#f1f1f1;
          float: left;
          border-radius:4px;
          width:130px;
          height:28px;
          margin-right: 11px;
          border: none;
          outline: none;
          font-family:AppleColorEmoji;
          font-size:12px;
          color:#999999;
        }
        .ones:hover {
          border: none;
          background:#f48537;
          border-radius:4px;
          width:130px;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#fff;
          letter-spacing:0;
        }
        .two {
          border:1px solid #e7e7e7;
          border-radius:4px;
          width:130px;
          height:28px;
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#666666;
          letter-spacing:0;
          background: none;
          outline: none;
          margin-top: 15px;
        }
      }
      .box_list {
        margin-top: 30px;
        margin-right: 27px;
        position: relative;
        .box_list_top {
          height: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid #eaeaea;
          div {
            width: 33.3%;
            height: 100%;
            line-height: 30px;
          }
        }
        .blog_line {
          height: 40px;
          background: #fff;
          border: 1px solid #e7ebee;
          margin-bottom: 30px;
          overflow: hidden;
          .title_top {
            height: 40px;
            display: flex;
            line-height: 40px;
            flex-direction: row;
            border-bottom: 1px solid #e7ebee;
            i {
              cursor: pointer;
            }
            span {
              font-family:PingFangSC-Regular;
              font-size:10px;
              color:#999999;
              letter-spacing:0;
              text-align:left;
              a {
                font-family:PingFangSC-Regular;
                font-size:10px;
                color:#eb6100;
                letter-spacing:0;
                text-align:left;
                text-decoration: none;
              }
            }
          }
          .title {
            flex: 1;
            text-align: left;
            padding-left: 32px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            h3 {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
            }
            div {
              padding-right: 30px;
            }
            div:nth-child(1) {
              width: 130px;
            }
            div:nth-child(2) {
              width: 150px;
            }
          }
          div:last-child {
            color: #696969;
            font-size: 12px;
          }
          i {
            margin: 11px 11px 0 25px;
            font-size: 16px;
          }
          .pic_img {
            height: 180px;
            display: flex;
            flex-direction: row;
            .pic {
              width: 130px;
              height: 120px;
              margin: 30px 0 0 20px;
              overflow: hidden;
              img {
                width: 130px;
                height: 115px;
              }
            }
            img {
              width: 130px;
              height: 115px;
            }
            .body_list {
              width: 100%;
              height: 150px;
              overflow-y: scroll;
              text-align: left;
              padding-top: 30px;
              padding-left: 25px;
              line-height: 24px;
              text-indent: 2em;
              padding-right: 46px;
              word-break: break-all;
              cursor: pointer;
              // display: -webkit-box;
              // -webkit-box-orient: vertical;
              // -webkit-line-clamp: 3;
              // overflow: hidden;
            }
            .body_list::-webkit-scrollbar{
              display: none;
            }
          }
        }
      }
    }
    .product {
      .productMy_list {
        ul {
          padding-left: 50px;
          width: 100%;
          display: flex;
          flex-direction: row;
          height: 60px;
          border-bottom: 1px solid #e7ebee;
          background: #fff;
          padding-top: 28px;
          li {
            width: 120px;
            text-align: center;
            p {
              display: inline-block;
              text-decoration: none;
              color: #333;
              cursor: pointer;
            }
          }
          li:hover {
            border-bottom: 2px solid #eb6100;
            p {
              color: #eb6100;
            }
          }
          .active {
            border-bottom: 2px solid #eb6100;
            p {
              color: #eb6100;
            }
          }
          .unactive {
            border-bottom: none;
            p {
              color: #333;
            }
          }
        }
      }
      .nolist {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #eaeaea;
        background: #fff;
      }
      .productMy_tableList {
        background: #fff;
        padding: 50px 100px;
        ul {
          li {
            display: flex;
            flex-direction: row;
            padding-bottom: 20px;
            a {
              text-decoration: none;
              color: red;
              display: inline-block;
              padding: 0 5px;
            }
            p {
              width: 130px;
            }
            input {
              border: 1px solid #eaeaea;
              outline: none;
              width: 280px;
              height: 38px;
              border-radius: 5px;
              padding: 0 10px;
              line-height: 32px;
              background: #fff;
            }
            textarea {
              border: 1px solid #eaeaea;
              background: #fff;
              outline: none;
              padding: 10px;
              border-radius: 5px;
            }
          }
        }
        .now {
          display: flex;
          flex-direction: row;
          .list {
            margin-right: 50px;
            p {
              display: inline-block;
              text-align: right;
              padding: 0 20px;
            }
            input {
              border: 1px solid #eaeaea;
              outline: none;
              width: 150px;
              height: 38px;
              border-radius: 5px;
              background: #fff;
              padding: 0 10px;
              line-height: 32px;
            }
          }
        }
      }
    }
    .chain_list {
      min-height: 400px;
      h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        border-left: 5px solid #eb6100;
      }
      &>ul {
        padding: 11px 0;       
        display: flex;
        li {
          border: none;
          background: #f1f1f1;
          border-radius: 4px;
          width: 130px;
          margin-right: 11px;
          padding: 0 12px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;
          height: 28px;
          font-size: 12px;
          color: #666;
          letter-spacing: 0;
        }
        li:hover {
          background: #f48537;
          color: #fff;
        }
      }
      .chain_table {
        border: 1px solid #eaeaea;
        margin: 20px auto;
        border-bottom: none;
        .chain_table_title {
          background: rgba(204, 204, 204, 0.3);
          color: #666;
        }
        &>div {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eaeaea;
          div {
            width: 33%;
            line-height: 36px;
            text-align: center;
            span {
              color: #eb6100;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        .chain_table_null {
          line-height: 36px;
          text-align: center;
          color: #999;
          border-bottom: 1px solid #eaeaea;
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-message-box {
  width: 800px;
}
.el-collapse-item__header {
  padding: 10px 20px !important;
}
</style>
