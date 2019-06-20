<template>
  <div class='enterpriseBlog'>
    <div class='info-enter'>
      <div class="top_location">
        <Location :location="location"></Location>
      </div>
      <div class="lista">
        <div class="blog_header">
          <div class="blog_header_top">
            <div class="blog_header_top_left">
              <!-- <img src="../../../static/img/img.png" alt=""> -->
              <img :src="showIcon(enterList)" alt="">
            </div>
            <div class="blog_header_top_right">
              <h4>{{ companyInformation.detail_info.name }}
              <div class="c_verify_bg" v-if="nscfca"></div></h4>
              <div class="blog_header_bottom">
                <!-- <button @click="comeBank">返回</button> -->
              </div>
              <ul>
                <li>
                  <p>电话：<span>{{ companyInformation.detail_info.contact_info.phone }}</span><span v-if="companyInformation.detail_info.contact_info.phone === ''">企业未上传</span></p>
                </li>
                <li>
                  <p>邮箱：<span>{{ companyInformation.detail_info.contact_info.email }}</span><span v-if="companyInformation.detail_info.contact_info.email === ''">企业未上传</span></p>
                </li>
              </ul>
              <ul>
                <!-- <li>
                  <p>网址：<span>{{ companyInformation.detail_info.contact_info.fax }}</span><span v-if="companyInformation.detail_info.contact_info.fax === ''">企业未上传</span></p>
                </li> -->
                <li>
                  <p>地址：
                    <el-tooltip class="item" effect="dark" :content="companyInformation.detail_info.contact_info.address" placement="top-start">
                      <span>{{companyInformation.detail_info.contact_info.address}}</span>
                    </el-tooltip>
                    <span v-if="companyInformation.detail_info.contact_info.address === ''">企业未上传</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="blog_header_bottom" v-if="(roles === 'institution' || roles === 'fund') && auth === '1'">
            <button @click="handleCustomer()">通过审核</button>
          </div>
        </div>
        <div class="list_ul">
          <ul>
            <li :title="item" v-for="(item, index) in listTitle" :key="index" :class="{active_li: activeShow === index}" @click="listClick(index)"><span>{{item}}</span></li>
          </ul>
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
                  <img src="../../../../static/img/boss.png" alt="法人">
                  <div class="c_legal_info">
                    <h4 v-if="companyInformation.legal_person_info">{{ companyInformation.legal_person_info.name }}</h4>
                  </div>
                </div>
              </td>
              <td colspan="2" class="c_reg_info">
                <p>
                  <span>注册资本</span>
                  <span>{{ companyInformation.detail_info.business_information.register_assets }}</span>
                  <span v-if="!companyInformation.detail_info.business_information.register_assets">暂无数据</span>
                </p>
                <p>
                  <span>注册时间</span>
                  <span>{{ companyInformation.detail_info.business_information.year_founded }}</span>
                  <span v-if="!companyInformation.detail_info.business_information.year_founded">暂无数据</span>
                </p>
                <p>
                  <span>公司状态</span>
                  <span class="blue">{{ companyInformation.detail_info.business_information.register_status }}</span>
                  <span v-if="!companyInformation.detail_info.business_information.register_status">暂无数据</span>
                </p>
              </td>
            </tr>
            <tr>
              <td class="gray">工商注册号</td>
              <td class="c_no">
                <span class="blue" v-if="companyInformation.detail_info.business_information.no">{{ companyInformation.detail_info.business_information.no }}</span>
                <span v-if="!companyInformation.detail_info.business_information.no">暂无数据</span>
              </td>
              <td class="gray">纳税人识别号</td>
              <td class="c_taxpayer_license_id">
                <span>{{ companyInformation.detail_info.certificates.taxpayer_license_id }}</span>
                <span v-if="!companyInformation.detail_info.certificates.taxpayer_license_id">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">统一信用代码</td>
              <td class="c_credit_code">
                <span>{{ companyInformation.detail_info.business_information.credit_code }}</span>
                <span v-if="!companyInformation.detail_info.business_information.credit_code">暂无数据</span>
              </td>
              <td class="gray">公司类型</td>
              <td class="c_institutional_type">
                <span>{{ Number(companyInformation.detail_info.company_nature) ? status[companyInformation.detail_info.company_nature] : companyInformation.detail_info.company_nature}}</span>
                <span v-if="!companyInformation.detail_info.company_nature">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">行业</td>
              <td colspan="3" class="c_address">
                <span class="blue">{{ companyInformation.detail_info.industry_type }}</span>
                <span v-if="!companyInformation.detail_info.industry_type">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">注册地址</td>
              <td colspan="3" class="c_address">
                <span>{{ companyInformation.detail_info.area.province + ' ' +  companyInformation.detail_info.area.city + ' ' + companyInformation.detail_info.area.region}}</span>
                <span v-if="!companyInformation.detail_info.area">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">经营范围</td>
              <td colspan="3" class="c_scope">
                <span>{{ companyInformation.detail_info.business_information.scope }}</span>
                <span v-if="!companyInformation.detail_info.business_information.scope">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">营业期限</td>
              <td colspan="3" class="c_scope">
                <span class="blue">{{ companyInformation.detail_info.business_information.term_start || '未指定'}} - {{companyInformation.detail_info.business_information.term_end || '未指定'}}</span>
              </td>
            </tr>
            <tr>
              <td class="gray">登记机关</td>
              <td colspan="3" class="c_scope">
                <span class="blue">{{ companyInformation.detail_info.business_information.belong_org }}</span>
                <span v-if="!companyInformation.detail_info.business_information.belong_org">暂无数据</span>
              </td>
            </tr>
          </table>
          <div id="new_industry_list">
            <div class="new_list-table">
                <!-- 股东及出资信息 -->
              <h3>股东及出资信息</h3>
              <div class="shareholderInfo"></div>
              <!-- <div id="shareholderInfo_none" class="style_none">暂无股东及出资信息</div> -->
            </div>
            <div class="new_list-table">
              <!-- 主要人员信息 -->
              <h3>主要人员信息</h3>
              <div class="person_info"></div>
              <!-- <div id="person_info_none" class="style_none">暂无主要人员信息</div> -->
            </div>
            <div class="new_list-table">
              <!-- “多证合一”信息公示 -->
              <h3>“多证合一”信息公示</h3>
              <span class="span">提示：该企业下列证照事项通过“多证合一”已整合至该企业营业执照</span>
              <div class="neRecItemInfos"></div>
              <div id="neRecItemInfos_none" class="style_none">暂无多证合一公示信息</div>
            </div>
            <div class="new_list-table">
              <!-- "altInfo",  # 变更信息 -->
              <h3>变更信息</h3>
              <div class="altInfo">
                <!-- <table border='1' class='table-list2'>
                  <tr v-for="(item, index) in altInfo" :key="index">
                    <td v-for="(a, i) in item" :key="i">{{a}}</td>
                  </tr>
                </table> -->
              </div>
              <!-- <div class="blank">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="altInfo_currentPage"
                  :page-size="altInfo_page"
                  layout="total, prev, pager, next, jumper"
                  :total="altInfo_total">
                </el-pagination>
              </div> -->
              <!-- <div id="altInfo_none" class="style_none">暂无变更信息</div> -->
            </div>
            <div class="new_list-table">
              <!-- "needPaging_guaranty",  # 动产抵押信息 -->
              <h3>动产抵押登记信息</h3>
              <div class="needPaging_guaranty"></div>
              <!-- <div id="needPaging_guaranty_none" class="style_none">暂无动产抵押登记信息</div> -->
            </div>
            <div class="new_list-table">
              <!-- "needPaging_pledge",  # 股权出质登记信息 -->
              <h3>股权出质登记信息</h3>
              <div class="needPaging_pledge"></div>
              <!-- <div id="needPaging_pledge_none" class="style_none">暂无股权出质登记信息</div> -->
            </div>
            <div class="new_list-table">
              <!-- "copyright_baseinfo",  # 知识产权出质登记信息 -->
              <h3>知识产权出质登记信息</h3>
              <div class="copyright_baseinfo"></div>
              <div id="copyright_baseinfo_none" class="style_none">暂无知识产权出质登记信息</div>
            </div>
            <div class="new_list-table">
              <!-- "needPaging_inspect",  # 抽查检查结果信息 -->
              <h3>抽查检查结果信息</h3>
              <div class="needPaging_inspect"></div>
              <div id="needPaging_inspect_none" class="style_none">暂无抽查检查结果信息</div>
            </div>
            <div class="new_list-table">
              <!-- "needPaging_freeze",  # 司法协助信息 -->
              <h3>司法协助信息</h3>
              <div class="needPaging_freeze"></div>
              <div id="needPaging_freeze_none" class="style_none">暂无司法协助信息</div>
            </div>
            <!-- "needPaging_otherLicensing",  # 行政许可信息 -->
            <div class="new_list-table">
              <h3>行政许可信息</h3>
              <div class="needPaging_otherLicensing"></div>
              <div id="needPaging_otherLicensing_none" class="style_none">暂无行政许可信息</div>
            </div>
            <!-- "needPaging_punish",  # 行政处罚信息 -->
            <div class="new_list-table">
              <h3>行政处罚信息</h3>
              <div class="needPaging_punish"></div>
              <div id="needPaging_punish_none" class="style_none">暂无行政处罚信息</div>
            </div>
            <!-- "needPaging_abnormal",  # 列入经营异常名录信息 -->
            <div class="new_list-table">
              <h3>列入经营异常名录信息</h3>
              <div class="needPaging_abnormal"></div>
              <!-- <div id="needPaging_abnormal_none" class="style_none">暂无列入经营异常名录信息</div> -->
            </div>
            <!-- "needPaging_illegal",  # 列入严重违法失信企业名单（黑名单）信息 -->
            <div class="new_list-table">
              <h3>列入严重违法失信企业名单（黑名单）信息</h3>
              <div class="needPaging_illegal"></div>
              <div id="needPaging_illegal_none" class="style_none">暂无列入严重违法失信企业名单（黑名单）信息</div>
            </div>
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
          <div class="box_list"  v-if='blogList.length !== 0'>
            <div class="blog_line" v-for="(item, index) in blogList" :key='index'>
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
          <p v-if="blogList.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="../../../../static/img/tops.png" alt="">Oops！空空如也... ...</p>
          <div style="text-align:center;">
            <el-pagination v-if="total1" @current-change="handleSizeChange1"
              :current-page="currPage1" :page-size="pageSize1" layout="total, prev, pager, next, jumper" :total="total1">
            </el-pagination>
          </div>
        </div>
        <!-- 荣誉资质 -->
        <div class="img_list" v-if="activeShow === 2">
          <h3>荣誉资质</h3>
          <ul class="item_wrap" :style="imgUrl.length === 0 ? 'padding: 0' : ''">
            <li v-for="(item, index) in imgUrl" :key="index">
              <div class="item_t">
                <img :src="$root_url() + item.picture" alt="1" @click="imgLists(item, index)">
              </div>
            </li>
            <li v-if="imgUrl.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="../../../../static/img/tops.png" alt="">Oops！空空如也... ...</li>
          </ul>
        </div>
        <!-- 新闻公告 -->
        <div class="new_list" v-if="activeShow === 3">
          <h3>新闻公告中心</h3>
          <ul>
            <li v-for="(item, index) in newsList" :key="index" @click="selectNews(index, item)">
              <div class="pic_img">
                <img class="pic" v-if="item.picture !== null" :src="$root_url() + item.picture">
                <img class="pic" src="../../../../static/img/news.png" v-if="item.picture === null" alt="">
              </div>
              <div class="pic_style">
                <span>{{ item.title }}</span>
                <span>{{ item.post_time }}</span>
                <p class="body_list" v-html="item.body"></p>
              </div>
            </li>
          </ul>
          <p v-if="newsList.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900; padding: 20px 30px;"><img src="../../../../static/img/tops.png" alt="">Oops！空空如也... ...</p>
          <div class="block" style="text-align:center;">
            <el-pagination v-if="total" @current-change="handleSizeChange"
              :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
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
        <!-- 企业供应链交易统计 -->
        <div class="transaction_statistics" v-if="activeShow === 5">
          <div class="list">
            <h3>订单情况</h3>
            <div class="select">
              <span>年统计时间：</span>
              <select v-model="orderSelect" @change="selectChange(0, orderSelect)">
                <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
              </select>
            </div>
            <div class="list_chart">
              <div class="left">
                <pieChart :chartData='orderStatus' v-if='orderStatus.data1.length > 0' />
                <div v-if='orderStatus.data1.length === 0' class="none">暂无数据</div>
              </div>
              <div class="right">
                <!-- 产生订单总数 -->
                <div class="list_btn_count">
                  <p class="h3_p">订单产生情况</p>
                  <button @click="tabClick(item, index, 0)" :class="{active: activeCount === index}" v-for="(item, index) in btnName" :key="index">{{item}}</button>
                </div>
                <orderColumn :chartData='orderGram' v-if='flag' />
              </div>
            </div>
          </div>
          <div class="list">
            <p class="h3_p" style="padding-left:29px;">订单总额</p>
            <div class="list_chart">
              <disintegration :chartData='orderColumn' />
            </div>
            <!-- <div class="none" v-if='orderColumn.data1.length === 0 && orderColumn.data2.length === 0'>暂无数据</div> -->
          </div>
          <div class="list">
            <h3>流动资金需求情况</h3>
            <div class="select">
              <span>年统计时间：</span>
              <select v-model="orderSelect1" @change="selectChange(1, orderSelect1)">
                <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
              </select>
            </div>
            <div class="list_chart">
              <div class="left">
                <gap :chartData='fundingGap' v-if='fundingGap.data1.length > 0' />
                <div v-if='fundingGap.data1.length === 0' class="none">暂无数据</div>
              </div>
              <div class="right">
                <!-- 产生订单总数 -->
                <div class="list_btn_count">
                  <p class="h3_p">流动资金需求产生情况</p>
                  <button @click="tabClick(item, index, 1)" :class="{active: activeCount1 === index}" v-for="(item, index) in btnName" :key="index">{{item}}</button>
                </div>
                <orderColumn :chartData='fundingGram' />
                <!-- <histogram :chartData='fundingGram' v-if='fundingGram[0].data1.length > 0 || fundingGram[0].data2.length > 0 || fundingGram[0].data3.length > 0' /> -->
                <!-- <div v-if='fundingGram[0].data1.length === 0 && fundingGram[0].data2.length === 0 && fundingGram[0].data3.length === 0'>暂无数据</div> -->
              </div>
            </div>
          </div>
          <div class="list">
            <p class="h3_p" style="padding-left:29px;">资金需求</p>
            <div class="list_chart">
              <disintegration :chartData='fundingGapLine' />
            </div>
            <!-- <div class="none" v-if='fundingGapLine.data1.length === 0 && fundingGapLine.data2.length === 0 && fundingGapLine.data3.length === 0 && fundingGapLine.data4.length === 0'>暂无数据</div> -->
          </div>
          <div class="list">
            <h3>交易逾期情况</h3>
            <div class="select">
              <span>年统计时间：</span>
              <select v-model="orderSelect2" @change="selectChange(2, orderSelect2)">
                <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
              </select>
            </div>
            <div class="list_chart overdue">
              <div class="left">
                <div class="p" v-if="payableBeOverdue.data1.length > 0">
                  <p>采购交易订单总数：<span>{{payableBeOverdue.data1[0].value + payableBeOverdue.data1[1].value}}（笔）</span></p>
                  <p>采购结算逾期订单笔数：<span>{{payableBeOverdue.data1[0].value}}（笔）</span></p>
                  <p>采购按时结算订单笔数：<span>{{payableBeOverdue.data1[1].value}}（笔）</span></p>
                </div>
                <pieChart :chartData='payableBeOverdue' v-if="payableBeOverdue.data1.length > 0" />
                <div v-if='payableBeOverdue.data1.length === 0' class="none">暂无数据</div>
              </div>
              <div class="right">
                <div class="p" v-if="receivedBeOverdue.data1.length > 0">
                  <p>销售交易订单总数：<span>{{receivedBeOverdue.data1[0].value + receivedBeOverdue.data1[1].value}}（笔）</span></p>
                  <p>销售结算逾期订单笔数：<span>{{receivedBeOverdue.data1[0].value}}（笔）</span></p>
                  <p>销售按时结算订单笔数：<span>{{receivedBeOverdue.data1[1].value}}（笔）</span></p>
                </div>
                <pieChart :chartData='receivedBeOverdue' v-if="receivedBeOverdue.data1.length > 0" />
                <!-- <div v-if='receivedBeOverdue.data1.length === 0' class="none">暂无数据</div> -->
              </div>
            </div>
          </div>
          <div class="list">
            <div class="list_chart accepted">
              <div class="left">
                <h3>应付账款/已付账款</h3>
                <div class="select">
                  <span>年统计时间：</span>
                  <select v-model="orderSelect3" @change="selectChange(3, orderSelect3)">
                    <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
                  </select>
                </div>
                <pieChart :chartData='payableAccepted' v-if='payableAccepted.data1.length > 0' />
                <div v-if='payableAccepted.data1.length === 0' class="none">暂无数据</div>
              </div>
              <div class="right">
                <h3>应收账款/已收账款</h3>
                <div class="select">
                  <!-- <span>年统计时间：</span>
                  <select v-model="orderSelect4" @change="selectChange(4, orderSelect4)">
                    <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
                  </select> -->
                </div>
                <pieChart :chartData='receivableAccepted' v-if='receivableAccepted.data1.length > 0' />
                <div v-if='receivableAccepted.data1.length === 0' class="none">暂无数据</div>
              </div>
            </div>
          </div>
          <!-- <div class="list">
            <h3>库存状况</h3>
            <div class="list_chart"></div>
          </div> -->
        </div>
        <!-- 企业供应链交易信用 -->
        <div class="financing_statistics" v-if="activeShow === 6">
          <!-- 企业供应链交易信用指数 -->
          <div class="list">
            <h3>企业供应链交易信用指数C(t)
              <div class="select">
                <span>年统计时间：</span>
                <select v-model="creditSelect" @change="creditChange(0, creditSelect)">
                  <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
                </select>
              </div>
            </h3>
            <div class="list_chart">
              <div class="left">
                <disintegrationColumn :chartData='creditIndex' v-if="creditIndex.data1.length > 0" />
                <p class="none" v-if="creditIndex.data1.length === 0">暂无数据</p>
              </div>
            </div>
          </div>
          <div class="list">
            <h3>应收总池G(t)统计</h3>
            <div class="list_chart">
              <div class="left">
                <disintegrationColumn :chartData='gt_data' v-if="gt_data.data1.length > 0" />
                <p class="none" v-if="gt_data.data1.length === 0">暂无数据</p>
              </div>
            </div>
          </div>
          <div class="list">
            <h3>应付总池P(t)统计</h3>
            <div class="list_chart">
              <div class="left">
                <disintegrationColumn :chartData='disintegrationData' v-if="disintegrationData.data1.length > 0" />
                <p class="none" v-if="disintegrationData.data1.length === 0">暂无数据</p>
              </div>
            </div>
          </div>
          <div class="list">
            <h3>总池统计</h3>
            <div class="list_chart">
              <div class="left">
                <ctGtPt :chartData='ct_gt_pt_data' v-if="ct_gt_pt_data.data1.length > 0" />
                <p class="none" v-if="ct_gt_pt_data.data1.length === 0">暂无数据</p>
              </div>
            </div>
          </div>
          <!-- 库存变化率 -->
          <div class="list">
            <h3>库存变化率</h3>
            <div class="list_chart">
              <div class="left">
                <disintegration :chartData='inventoryChangeRate' />
              </div>
            </div>
          </div>
        </div>
        <!-- 贷款统计 -->
        <div class="financing_statistics" v-if="activeShow === 7">
          <div class="list">
            <h3>贷款状况统计
              <div class="select">
                <span>年统计时间：</span>
                <select v-model="balanceSelect" @change="balanceChange(balanceSelect)">
                  <option v-for="(item, index) in yearDate" :key="index">{{item}}</option>
                </select>
              </div>
            </h3>
            <div class="list_chart" style="margin-top:20px;">
              <div class="left">
                <loanColumn :chartData='balanceData' v-if="balanceData.data1.length > 0 || balanceData.data2.length > 0 || balanceData.data3.length > 0" />
                <p class="none" v-if="balanceData.data1.length === 0 && balanceData.data2.length === 0 && balanceData.data3.length === 0">暂无数据</p>
              </div>
            </div>
          </div>
          <!-- <div class="list">
            <h3>贷款状况统计（2019年统计）</h3>
            <div class="list_chart">
              <div class="left">
                <disintegrationColumn :chartData='balanceData1' v-if="balanceData1.data1.length > 0" />
                <p class="none" v-if="balanceData1.data1.length === 0">暂无数据</p>
              </div>
            </div>
          </div> -->
          <div class="list">
            <h3>不良状况统计</h3>
            <div class="list_chart">
              <div class="left">
                <disintegrationColumn :chartData='balanceData2' v-if="balanceData2.data1.length > 0" />
                <p class="none" v-if="balanceData2.data1.length === 0">暂无数据</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 记账信息 -->
        <div class="chain_list" v-if="activeShow === 8">
          <h3>记账请款</h3>
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
        <!-- 机器人 -->
        <div class="robot" v-if="activeShow === 9">
          <robot :bid='bid' :pbid='bid' :nochain='true'/>
        </div>
        <!-- 风险管理 -->
        <div class="robot" v-if="activeShow === 10">
          <RiskManagement :bid='bid' :pbid='bid' :nochain='true'/>
        </div>
        <div class="loan_aid" v-if="activeShow === 11">
          <loanAid :bid='bid' />
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
          <p v-if="procurementInfoData.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="../../../../static/img/tops.png" alt="">Oops！空空如也... ...</p>
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
          <p v-if="procurementSupply.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="../../../../static/img/tops.png" alt="">Oops！空空如也... ...</p>
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
import Location from '../../location/location'
// 饼图
import pieChart from './pieChart'
// 柱状图
import histogram from './histogram'
// 嵌套饼图
import nestingPic from './nestingPic'
// 折线图
import brokenLine from './brokenLine'
// 订单金额柱状图
import orderColumn from './orderColumn'
// 供应链交易信用-折线图
import disintegration from './disintegration'
// 流动资金需求
import gap from './gap'
// ------------------------------------------
// 应付总池P(t)统计
import disintegrationColumn from './echarts/disintegrationColumn'
import ctGtPt from './echarts/ct_gt_pt'
// 贷款余额情况（2019年统计）
import loanColumn from './echarts/loanColumn'
// 机器人
import robot from '@/components/institution/area_app/asset/robot'
// 风险管理
import RiskManagement from '@/components/asset_app/riskManagement'
// 九星平台助贷增信与贷后辅助风险监控服务
import loanAid from '@/components/chain_app/historical_transactions/loan_aid.vue'
export default {
  data () {
    return {
      father: {
        selIndex: 4
      },
      nscfca: true,
      roles: '',
      roleId: '',
      activeNames: [],
      // 供应信息
      activeSupply: [],
      procurementSupply: [],
      listTitle: ['工商信息', '财务状况', '荣誉资质', '新闻公告', '自我评级', '交易统计', '交易信用', '贷款统计', '记账情况', '数据资产', '风险管理', '助贷增信'],
      listSure: ['应收', '应付', '历史'],
      titleList: ['合同名称', '合同编号', '创建时间', '交易公司', '操作'],
      chainType: [
        {name: '销售管理', type: '1'},
        {name: '采购管理', type: '2'}
      ],
      status: ['', '企业', '个体工商户', '政府机关/事业单位'],
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
          business_information: {
            legal_person_name: '',
            register_assets: '',
            year_founded: '',
            register_status: '',
            no: '',
            org_certificate_id: '',
            credit_code: '',
            econ_kind: '',
            taxpayer_license_id: '',
            trade: '',
            address: '',

            scope: '',
            term_start: '',
            term_end: '',
            belong_org: ''
          },
          contact_info: {
            address: '',
            phone: '',
            email: '',
            fax: ''
          },
          area: {
            province: '',
            city: '',
            region: ''
          },
          certificates: {
            business_license_id: ''
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
      bid: '',
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
      showChain: [],
      // 饼图----订单
      orderStatus: {
        titles: '订单情况（年统计）',
        legend: ['已完成订单', '未完成订单', '取消订单'],
        data1: [],
        color: ['#7498f7', 'sandybrown', '#f3655d']
      },
      // 柱状图----订单----产生订单总数--
      orderGram: {
        titles: '订单情况（年统计）',
        legend: '产生订单金额',
        xAxis: [],
        data1: [],
        color: ['sandybrown']
      },
      flag: false,
      // 产生订单总数--
      btnName: ['金额', '个数'],
      activeCount: 0,
      activeCount1: 0,
      // 订单金额-折线图
      orderColumn: {
        title: '订单金额',
        color: ['#5793f3', 'sandybrown'],
        legend: ['采购订单', '销售订单'],
        data1: [],
        data2: [],
        // order_amount_list: [],
        xAxis: []
      },
      // 流动资金缺口情况
      fundingGap: {
        titles: '流动资金需求情况',
        legend: ['融资资金', '自筹资金', '未解决资金'],
        data1: []
      },
      // 流动资金缺口情况
      fundingGram: {
        titles: '流动资金需求情况',
        legend: '流动资金产生金额',
        xAxis: [],
        data1: [],
        color: ['#7498f7']
      },
      // 流动资金折线图
      fundingGapLine: {
        title: '订单金额',
        legend: ['资金缺口', '融资资金', '自筹资金', '资金总额'],
        color: ['#f3655d', 'sandybrown', '#44e9a7', '#7498f7'],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        xAxis: []
      },
      // 应付交易逾期情况
      payableBeOverdue: {
        titles: '交易逾期情况',
        legend: ['按时结算订单', '结算逾期订单'],
        data1: [],
        color: ['#f3655d', '#7498f7']
      },
      // 应收交易逾期情况
      receivedBeOverdue: {
        titles: '交易逾期情况',
        legend: ['按时结算订单', '结算逾期订单'],
        data1: [],
        color: ['#f3655d', 'sandybrown']
      },
      // 应收账款/已收账款-复合饼图
      receivableAccepted: {
        titles: '应收账款/已收账款',
        legend: ['正常已收账款', '逾期已收账款', '正常未收账款', '逾期未收账款'],
        data1: [],
        color: ['sandybrown', '#eec557', '#FFC1C1', '#ef4136']
      },
      // 应付账款/已付账款-复合饼图
      payableAccepted: {
        titles: '应付账款/已付账款',
        legend: ['正常已付账款', '逾期已付账款', '正常未付账款', '逾期未付账款'],
        data1: [],
        color: ['#7498f7', 'lightskyblue', '#FFC1C1', '#ef4136']
      },
      // 供应链交易信用-柱状图
      // 企业供应链交易信用指数（2019年统计）
      creditIndex: {
        title: '企业供应链交易信用指数',
        data1: [],
        xAxis: [],
        color: ['#f3655d']
      },
      // 应收总池G(t)统计（2019年统计）-销售-黄色
      gt_data: {
        title: '应收总池G(t)统计',
        data1: [],
        xAxis: [],
        color: ['sandybrown']
      },
      // 应付总池P(t)统计-采购-蓝色
      disintegrationData: {
        title: '应付总池P(t)统计',
        data1: [],
        xAxis: [],
        color: ['#7498f7']
      },
      ct_gt_pt_data: {
        title: ['企业供应链交易信用指数', '应收总池G(t)统计', '应付总池P(t)统计'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#f3655d', 'sandybrown', '#7498f7']
      },
      inventoryChangeRate: {
        title: '库存变化率',
        color: ['#5793f3', 'sandybrown'],
        legend: ['原料库'],
        data1: [["2019-01-01", 10000000], ["2019-01-09", 9000000], ["2019-02-09", 13440000], ["2019-03-08", 9090000], ["2019-04-12", 14000000], ["2019-05-12", 10000000], ["2019-06-12", 6440000], ["2019-07-12", 10440000], ["2019-07-22", 13500000]]
      },
      // 贷款统计   余额
      balanceData: {
        title: '贷款余额情况',
        legend: ['新增贷款', '偿还贷款', '贷款余额'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#7498f7', 'sandybrown', '#f3655d']
      },
      balanceData1: {
        title: '贷款状况统计',
        data1: [],
        xAxis: [],
        color: ['sandybrown']
      },
      balanceData2: {
        title: '不良状况统计',
        data1: [],
        xAxis: [],
        color: ['#f3655d']
      },
      // 下拉菜单
      orderSelect: '2019',
      orderSelect1: '2019',
      orderSelect2: '2019',
      orderSelect3: '2019',
      orderSelect4: '2019',
      yearDate: ['2017', '2018', '2019'],
      yearOrder: '2019',
      yearGram: '2019',
      creditSelect: '2019',
      creditSelect1: '2019',
      creditSelect2: '2019',
      balanceSelect: '2019',
      // 新工商信息
      altInfo: [],
      // 分页
      altInfo_total: 0,
      altInfo_currentPage: 1,
      altInfo_page: 5
    }
  },
  components: {
    Location, pieChart, histogram, nestingPic, brokenLine, orderColumn, disintegration, gap, disintegrationColumn, loanColumn, robot,
    RiskManagement,
    ctGtPt,
    loanAid
  },
  mounted () {
    var that = this
    that.bid = Number(that.$route.query.bid)
    that.auth = that.$route.query.auth
    const key = Number(that.$route.query.key) || false
    const f = that.$route.query.f ? Number(that.$route.query.f) : true
    that.roles = localStorage.role
    // 查询博客信息
    if (!f) {
      // @f has_partner_company
      // @key has_info
      that.$ajax.get('/api/company/' + that.bid + '/').then(res => {
        console.log(res)
        let i = res.data.cfca_info
        that.enterList = res.data.avatar
        that.companyInformation = {
          detail_info: {
            name: res.data.cfca_info.OrgInfo.OrganizationName,
            company_nature: i.OrgInfo.OrganizationNature,
            industry_type: i.OrgInfo.BusinessPermitItem,
            business_information: {
              legal_person_name: i.OrgInfo.LrName,
              register_assets: i.OrgInfo.RegisteredCapital + '万元',
              year_founded: i.OrgInfo['EstablishDate'],
              register_status: '在营',
              no: i.OrgInfo.RegistrationNumber,
              org_certificate_id: '',
              credit_code: i.OrgInfo.UniformSocialCreditCode,
              econ_kind: '',
              taxpayer_license_id: '',
              trade: '',
              address: i.OrgInfo.Addr,
              scope: i.OrgInfo.OperateBusinessScope,
              term_start: i.OrgInfo.OperateStart,
              term_end: i.OrgInfo.OperateEnd,
              belong_org: i.OrgInfo.RegOrganization,
            },
            contact_info: {
              address: i.OrgInfo.Addr,
              phone: i.OrgInfo.Telephone,
              email: i.OrgInfo.Email,
              fax: ''
            },
            area: {
              province: i.OrgInfo.Addr,
              city: '',
              region: ''
            },
            certificates: {
              business_license_id: ''
            }
          },
          legal_person_info: {
            name: i.OrgInfo.LrName
          }
        }
        // 股东信息
        let str = "<table border='1' class='table-list5'>";
        str += `
          <tr>
            <td>国籍</td>
            <td>股东名称</td>
            <td>出资日期</td>
            <td>出资方式</td>
            <td>出资比例</td>
            <td>认缴出资额(万元)</td>
            <td>出资方式</td>
            <td>股东类型</td>
          </tr>
        `
        for (let k = 0; k < i.OrgShareInfoList.length; k++) {
          str += "<tr>";
          for (let item in i.OrgShareInfoList[k]) {
            str += `<td>${i.OrgShareInfoList[k][item]}</td>`
          }
          str += "</tr>";
        }
        str += "</table>";
        if (i.OrgShareInfoList.length === 0) str = '<div class="style_none">暂无股东信息</div>'
        $('#new_industry_list .shareholderInfo').html(str);
        // 高管信息
        let str1 = "<ul class='people-list'>";
        for (let j = 0; j < i.SharePersonalInfoList.length; j++) {
          str1 += "<li>";
          str1 += `${i.SharePersonalInfoList[j]['PersonName']}`
          str1 += "</li>";
        }
        str1 += "</ul>";
        if (i.SharePersonalInfoList.length === 0) str1 = '<div class="style_none">暂无高管信息</div>'
        $('#new_industry_list .person_info').html(str1)
        // 变更信息
        let str2 = "<table border='1' class='table-list2'>";
        str2 += `
          <tr>
            <td>变更日期</td>
            <td>变更项目</td>
            <td>变更前内容</td>
            <td>变更后内容</td>
          </tr>
        `
        for (let j = 0; j < i.AlterationInfoList.length; j++) {
          str2 += "<tr>";
          for (let item in i.AlterationInfoList[j]) {
            str2 += `<td>${i.AlterationInfoList[j][item]}</td>`
          }
          str2 += "</tr>";
        }
        str2 += "</table>";
        if (i.AlterationInfoList.length === 0) str2 = '<div class="style_none">暂无变更信息</div>'
        $('#new_industry_list .altInfo').html(str2);
        // 动产抵押信息
        let str3 = "<table border='1' class='table-list3'>";
        for (let j = 0; j < i.MovMorBasInfoList.length; j++) {
          str3 += "<tr>";
          for (let item in i.MovMorBasInfoList[j]) {
            str3 += `<td>${i.MovMorBasInfoList[j][item]}</td>`
          }
          str3 += "</tr>";
        }
        str3 += "</table>";
        if (i.MovMorBasInfoList.length === 0) str3 = '<div class="style_none">暂无动产抵押信息</div>'
        $('#new_industry_list .needPaging_guaranty').html(str3);
        // 股权出质
        let str4 = "<table border='1' class='table-list3'>";
        str4 += `
          <tr>
            <td>出质人</td>
            <td>状态</td>
            <td>登记编号</td>
            <td>质权出质设立登记日期</td>
            <td>质权人姓名</td>
            <td>质权人证件/证件号</td>
            <td>出质人证件/证件号</td>
            <td>出质股权数额</td>
          </tr>        
        `
        for (let j = 0; j < i.PledgedEquitiesInfoList.length; j++) {
          str4 += "<tr>";
          for (let item in i.PledgedEquitiesInfoList[j]) {
            if (item !== 'Url' && item !== 'PawnDate') {
              str4 += `<td>${i.PledgedEquitiesInfoList[j][item]}</td>`
            }
          }
          str4 += "</tr>";
        }
        str4 += "</table>";
        if (i.PledgedEquitiesInfoList.length === 0) str4 = '<div class="style_none">暂无股权出质登记信息</div>'
        $('#new_industry_list .needPaging_pledge').html(str4);
        // 行政处罚信息
        let str5 = "<table border='1' class='table-list3'>";
        str5 += `
          <td>行政处罚内容</td>
          <td>处罚决定文书</td>
          <td>作出行政处罚单位</td>
          <td>处罚决定书签发日期</td>
        `
        for (let j = 0; j < i.AdmPenalInfoList.length; j++) {
          str5 += "<tr>";
          for (let item in i.AdmPenalInfoList[j]) {
            if (item === 'PenalContent' || item === 'PenalDecision' || item === 'PenalDecisionOrg' || item === 'PenalDecisionDate') {
              str5 += `<td>${i.AdmPenalInfoList[j][item]}</td>`
            }
          }
          str5 += "</tr>";
        }
        str5 += "</table>";
        if (i.AdmPenalInfoList.length === 0) str5 = '<div class="style_none">暂无行政出发信息</div>'
        $('#new_industry_list .needPaging_punish').html(str5);
        // 列入经营异常名录信息
        let str6 = "<table border='1' class='table-list3'>";
        str6 += `
          <td>行政处罚内容</td>
          <td>处罚决定文书</td>
          <td>作出行政处罚单位</td>
          <td>处罚决定书签发日期</td>
        `
        for (let j = 0; j < i.AbnormalInfoList.length; j++) {
          str6 += "<tr>";
          for (let item in i.AbnormalInfoList[j]) {
            str6 += `<td>${i.AbnormalInfoList[j][item]}</td>`
          }
          str6 += "</tr>";
        }
        str6 += "</table>";
        if (i.AbnormalInfoList.length === 0) str6 = '<div class="style_none">暂无列入经营异常名录信息</div>'
        $('#new_industry_list .needPaging_abnormal').html(str6);
        that.listTitle = [ '工商信息' ]
        that.nscfca = false
      })
    } else {
      that.$ajax.get(`/api/company/` + that.bid + '?detail_info=1').then(res => {
        // 获取全部
        this.enterList = res.data.avatar
        // 公司信息
        this.companyInformation = res.data
        // 自我评级
        this.selfAppraisal = res.data.detail_info.self_appraisal || {}
      })
      that.$nextTick(()=> {})
      // 工商信息等内容
      that.$ajax.get('/api/company/?signed=True&supply_demand=1&detail_info=1&id=' + that.bid).then(res => {
        // 新加企业工商信息等
        if (res.data.results.length > 0) {
          if (res.data.results[0].detail_info.gsxt_info) {
            // "shareholderInfo",  # 股东及出资信息
            if (res.data.results[0].detail_info.gsxt_info.shareholderInfo.length > 0) {
              let str = "<table border='1' class='table-list5'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.shareholderInfo.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.shareholderInfo[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.shareholderInfo[i][j] == '暂无股东及出资信息') {
                    $('#shareholderInfo_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.shareholderInfo[i][j]+"</td>";
                    $('#shareholderInfo_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .shareholderInfo').html(str);
            }
            // 主要人员 person_info
            if (res.data.results[0].detail_info.gsxt_info.person_info.length > 0) {
              let str = "<ul class='people-list'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.person_info.length; i++) {
                str += "<li>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.person_info[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.person_info[i][j] == '暂无主要人员信息') {
                    $('#person_info_none').show();
                  } else {
                    str +="<p>"+res.data.results[0].detail_info.gsxt_info.person_info[i][j]+"</p>";
                    $('#person_info_none').hide();
                  }
                }
                str += "</li>";
              }
              str += "</ul>";
              $('#new_industry_list .person_info').html(str);
            }
            // neRecItemInfos  “多证合一”信息公示
            if (res.data.results[0].detail_info.gsxt_info.neRecItemInfos.length > 0) {
              let str = "<table border='1' class='table-list1'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.neRecItemInfos.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.neRecItemInfos[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.neRecItemInfos[i][j] == '暂无多证合一公示信息') {
                    $('#neRecItemInfos_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.neRecItemInfos[i][j]+"</td>";
                    $('#neRecItemInfos_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .neRecItemInfos').html(str);
            }
            // "altInfo",  # 变更信息
            if (res.data.results[0].detail_info.gsxt_info.altInfo.length > 0) {
              // that.altInfo = res.data.results[0].detail_info.gsxt_info.altInfo
              // that.altInfo_total = that.altInfo.length-1
              let str = "<table border='1' class='table-list2'>";
              for (let i = 0; i < res.data.results[0].detail_info.gsxt_info.altInfo.length; i++) {
                str += "<tr>";
                let a = res.data.results[0].detail_info.gsxt_info.altInfo[i].map(s => s.slice(Math.max(-2, Math.floor(s.length / -2))))
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.altInfo[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.altInfo[i][j] == '暂无变更信息') {
                    $('#altInfo_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.altInfo[i][j]+"</td>";
                    $('#altInfo_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .altInfo').html(str);
            }
            // "needPaging_guaranty",  # 动产抵押信息
            if (res.data.results[0].detail_info.gsxt_info.needPaging_guaranty.length > 0) {
              let str = "<table border='1' class='table-list3'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.needPaging_guaranty.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.needPaging_guaranty[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.needPaging_guaranty[i][j] == '暂无动产抵押登记信息') {
                    $('#needPaging_guaranty_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.needPaging_guaranty[i][j]+"</td>";
                    $('#needPaging_guaranty_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .needPaging_guaranty').html(str);
            }
            // "needPaging_pledge",  # 股权出质登记信息
            if (res.data.results[0].detail_info.gsxt_info.needPaging_pledge.length > 0) {
              let str = "<table border='1' class='table-list4'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.needPaging_pledge.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.needPaging_pledge[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.needPaging_pledge[i][j] == '暂无股权出质登记信息') {
                    $('#needPaging_pledge_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.needPaging_pledge[i][j]+"</td>";
                    $('#needPaging_pledge_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .needPaging_pledge').html(str);
            }
            // "copyright_baseinfo",  # 知识产权出质登记信息
            if (res.data.results[0].detail_info.gsxt_info.copyright_baseinfo.length > 0) {
              let str = "<table border='1' class='table-list5'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.copyright_baseinfo.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.copyright_baseinfo[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.copyright_baseinfo[i][j] == '暂无知识产权出质登记信息') {
                    $('#copyright_baseinfo_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.copyright_baseinfo[i][j]+"</td>";
                    $('#copyright_baseinfo_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .copyright_baseinfo').html(str);
            }
            // "needPaging_inspect",  # 抽查检查结果信息
            if (res.data.results[0].detail_info.gsxt_info.needPaging_inspect.length > 0) {
              let str = "<table border='1' class='table-list5'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.needPaging_inspect.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.needPaging_inspect[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.needPaging_inspect[i][j] == '暂无抽查检查结果信息') {
                    $('#needPaging_inspect_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.needPaging_inspect[i][j]+"</td>";
                    $('#needPaging_inspect_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .needPaging_inspect').html(str);
            }
            // "needPaging_freeze",  # 司法协助信息
            if (res.data.results[0].detail_info.gsxt_info.needPaging_freeze.length > 0) {
              let str = "<table border='1' class='table-list5'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.needPaging_freeze.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.needPaging_freeze[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.needPaging_freeze[i][j] == '暂无司法协助信息') {
                    $('#needPaging_freeze_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.needPaging_freeze[i][j]+"</td>";
                    $('#needPaging_freeze_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .needPaging_freeze').html(str);
            }
            // "needPaging_otherLicensing",  # 行政许可信息
            if (res.data.results[0].detail_info.gsxt_info.needPaging_otherLicensing.length > 0) {
              let str = "<table border='1' class='table-list5'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.needPaging_otherLicensing.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.needPaging_otherLicensing[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.needPaging_otherLicensing[i][j] == '暂无行政许可信息') {
                    $('#needPaging_otherLicensing_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.needPaging_otherLicensing[i][j]+"</td>";
                    $('#needPaging_otherLicensing_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .needPaging_otherLicensing').html(str);
            }
            // "needPaging_punish",  # 行政处罚信息
            if (res.data.results[0].detail_info.gsxt_info.needPaging_punish.length > 0) {
              let str = "<table border='1' class='table-list5'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.needPaging_punish.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.needPaging_punish[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.needPaging_punish[i][j] == '暂无行政处罚信息') {
                    $('#needPaging_punish_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.needPaging_punish[i][j]+"</td>";
                    $('#needPaging_punish_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .needPaging_punish').html(str);
            }
            // "needPaging_abnormal",  # 列入经营异常名录信息
            if (res.data.results[0].detail_info.gsxt_info.needPaging_abnormal.length > 0) {
              let str = "<table border='1' class='table-list5'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.needPaging_abnormal.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.needPaging_abnormal[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.needPaging_abnormal[i][j] == '暂无列入经营异常名录信息') {
                    $('#needPaging_abnormal_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.needPaging_abnormal[i][j]+"</td>";
                    $('#needPaging_abnormal_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .needPaging_abnormal').html(str);
            }
            // "needPaging_illegal",  # 列入严重违法失信企业名单（黑名单）信息
            if (res.data.results[0].detail_info.gsxt_info.needPaging_illegal.length > 0) {
              let str = "<table border='1' class='table-list5'>";
              for (let i = 0; i<res.data.results[0].detail_info.gsxt_info.needPaging_illegal.length; i++) {
                str += "<tr>";
                for (let j = 0; j<res.data.results[0].detail_info.gsxt_info.needPaging_illegal[i].length; j++) {
                  if (res.data.results[0].detail_info.gsxt_info.needPaging_illegal[i][j] == '暂无列入严重违法失信企业名单（黑名单）信息') {
                    $('#needPaging_illegal_none').show();
                  } else {
                    str +="<td>"+res.data.results[0].detail_info.gsxt_info.needPaging_illegal[i][j]+"</td>";
                    $('#needPaging_illegal_none').hide();
                  }
                }
                str += "</tr>";
              }
              str += "</table>";
              $('#new_industry_list .needPaging_illegal').html(str);
            }
          }
        }
      })
    }

  },
  beforeCreate () {
    const that = this
    if (localStorage.role === 'fund') {
      if (Number(that.$route.query.fType) === 1) {
        that.location = [
          { title: '我的助贷', url: '/myFund' },
          { title: '企业首页' }
        ]
      } else if (Number(that.$route.query.fType) === 2) {
        that.location = [
          { title: '我的助贷', url: '/myFund' },
          { title: '赔付申请', url: '/myFundList' },
          { title: '企业首页' }
        ]
      } else if (Number(that.$route.query.zType) === 1) {
        that.location = [
          { title: '我的债权', url: '/myClaims' },
          { title: '企业首页' }
        ]
      } else if (Number(that.$route.query.help) === 1) {
        that.location = [
          { title: '我的助贷', url: '/myFund' },
          { title: '融资用途', url: '/helpPurpose?financing_id=' + that.$route.query.financing_id },
          { title: '企业首页' }
        ]
      } else if (Number(that.$route.query.help) === 2) {
        that.location = [
          { title: '我的助贷', url: '/myFund' },
          { title: '第一还款来源', url: '/helpFirst?chain_id=' + that.$route.query.chain_id },
          { title: '企业首页' }
        ]
      } else if (Number(that.$route.query.bType) === 1) {
        that.location = [
          { title: '我的企业', url: '/myEnterprise' },
          { title: '企业首页' }
        ]
      } else if (Number(that.$route.query.bType) === 2) {
        that.location = [
          { title: '我的企业', url: '/myEnterprise' },
          { title: '成员申请', url: '/myApply' },
          { title: '企业首页' }
        ]
      } else {
        that.location = [{ title: '企业首页' }]
      }
    } else if (Number(that.$route.query.bType) === 2) {
      that.location = [
        { title: '区域企业', url: '/area_app' },
        { title: '企业首页' }
      ]
    } else if (Number(that.$route.query.claim) === 0) {
      that.location = [
        { title: '我的债权/债务', url: '/claim_app' },
        // { title: '债权登记', url: '/claim_app/claim_register' },
        { title: '企业首页' }
      ]
    } else if (Number(that.$route.query.claim) === 1) {
      that.location = [
        { title: '我的债权/债务', url: '/claim_app' },
        { title: '企业首页' }
      ]
    } else if (Number(that.$route.query.claim_app) === 0) {
      that.location = [
        { title: '我的债权/债务', url: '/claim_app' },
        { title: '企业首页' }
      ]
    } else if (Number(that.$route.query.tTypes) === 1) {
      that.location = [
        { title: '链式记账', url: '/chain_app/receive_chain?id=' + that.$route.query.chainId },
        { title: '企业首页' }
      ]
    } else if (Number(that.$route.query.chainlist) === 1) {
      that.location = [
        { title: '链式记账', url: '/chain_app/chain_main?type=' + 0 },
        { title: '记账' }
      ]
    } else if (Number(that.$route.query.chainlist) === 2) {
      that.location =  [
        { title: '链式记账', url: '/chain_app/chain_main?type=' + 1 },
        { title: '记账' }
      ]
    } else if (Number(that.$route.query.tTypes) === 2) {
      that.location = [
        { title: '我的融资', url: '/financing_app' },
        { title: '企业首页' }
      ]
    } else if (Number(that.$route.query.histor) === 1) {
      that.location = [
        { title: '历史交易数据增信', url: '/chain_app/historical_add_credit' },
        { title: '企业首页' }
      ]
    } else if (Number(that.$route.query.customer) === 1) {
      that.location = [
        { title: '我的客户', url: '/customer_app' },
        { title: '企业首页' }
      ]
    } else if (Number(that.$route.query.debt) === 1) {
      that.location = [
        { title: '贷款管理', url: '/debt_app' },
        { title: '企业首页'}
      ]
    } 
    else {
      that.location = [
        { title: '我的信贷', url: '/credit_app' },
        { title: '企业首页' }
      ]
    } 
  },
  methods: {
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
    },
    // 订单情况
    selectChange (i, item) {
      const that = this
      that.yearOrder = item
      that.yearGram = item
      if (item === '全部') {
        item = 'all'
      }
      if (i === 0) {
        // 订单情况------饼图-pie
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=pie' + '&year=' + item).then(res => {
          that.orderStatus.data1 = res.data
        })
        // 订单情况------柱状图-column
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=column' + '&time_unit=month' + '&year=' + item).then(res => {
          that.flag = true
          // x轴
          that.orderGram.xAxis = res.data.x_axis
          // 完成订单
          that.orderGram.data1 = res.data.order_value
        })
        // 订单金额-------折线图-column_amount
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=column_amount' + '&year=' + item).then(res => {
          // 采购订单---payable_amount
          that.orderColumn.data1 = res.data.payable_amount
          // 销售订单---received_amount
          that.orderColumn.data2 = res.data.received_amount
          // x轴
          that.orderColumn.xAxis = res.data.x_axis
        })
      } else if (i === 1) {
        // 流动资金缺口情况------饼图-pie
        that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.bid + '&e_type=pie' + '&year=' + item).then(res => {
          that.fundingGap.data1 = res.data
        })
        // 流动资金缺口情况------柱状图-column
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&year=' + item + '&e_type=column' +'&contract_type=2' + '&time_unit=month').then(res => {
          that.flag = true
          // x轴
          that.fundingGram.xAxis = res.data.x_axis
          // 融资资金
          that.fundingGram.data1 = res.data.order_value
        })
        // 流动资金缺口情况------折线图-line
        that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.bid + '&e_type=line' + '&year=' + item).then(res => {
          that.fundingGapLine.data1 = res.data.funding_gap
          that.fundingGapLine.data2 = res.data.loan_amount_list
          that.fundingGapLine.data3 = res.data.no_f_amount_list
          that.fundingGapLine.data4 = res.data.payable_amount_list
          // x轴
          that.fundingGapLine.xAxis = res.data.x_axis
        })
      } else if (i === 2) {
        // 逾期情况------饼图-overdue_pie
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=overdue_pie' + '&year=' + item).then(res => {
          // 采购订单---payable_amount
          that.payableBeOverdue.data1 = res.data.payable_order
          // 销售订单---received_amount
          that.receivedBeOverdue.data1 = res.data.received_order
        })
      } else if (i === 3) {
        // 应收账款/已收账款------双层饼图-account_amount_pie
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=account_amount_pie' + '&year=' + item).then(res => {
          // 应收账款/已收账款
          that.receivableAccepted.data1 = res.data.reveived_data.outer
          // 应付账款/已付账款
          that.payableAccepted.data1 = res.data.payable_data.outer
        })
      }
    },
    balanceChange (item) {
      const that = this
      that.$ajax.get('/api/oth/loan_statistics/loan_value_statistics/?company_id=' + that.bid + '&year=' + item).then(res => {
        that.balanceData.xAxis = res.data.x_axis
        that.balanceData.data1 = res.data.new_loan_data
        that.balanceData.data2 = res.data.repayment_loan_data
        that.balanceData.data3 = res.data.remainder_loan_data
        that.balanceData2.xAxis = res.data.x_axis
        that.balanceData2.data1 = res.data.overdue_loan_data
      })
    },
    // 交易信用
    creditChange (i, item) {
      const that = this
      if (item === '全部') {
        // 应付总池P(t)统计-----柱状图-pie
        that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.bid + '&year=2019').then(res => {
          that.creditIndex.xAxis = res.data.x_axis
          that.creditIndex.data1 = res.data.credit_data
          that.gt_data.xAxis = res.data.x_axis
          that.gt_data.data1 = res.data.gt_data
          that.disintegrationData.xAxis = res.data.x_axis
          that.disintegrationData.data1 = res.data.payable_data
          that.ct_gt_pt_data.xAxis = res.data.x_axis
          that.ct_gt_pt_data.data1 = res.data.credit_data
          that.ct_gt_pt_data.data2 = res.data.gt_data
          that.ct_gt_pt_data.data3 = res.data.payable_data
        })
      } else {
        // 应付总池P(t)统计-----柱状图-pie
        that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.bid + '&year=' + item).then(res => {
          that.creditIndex.xAxis = res.data.x_axis
          that.creditIndex.data1 = res.data.credit_data
          that.gt_data.xAxis = res.data.x_axis
          that.gt_data.data1 = res.data.gt_data
          that.disintegrationData.xAxis = res.data.x_axis
          that.disintegrationData.data1 = res.data.payable_data
          that.ct_gt_pt_data.xAxis = res.data.x_axis
          that.ct_gt_pt_data.data1 = res.data.credit_data
          that.ct_gt_pt_data.data2 = res.data.gt_data
          that.ct_gt_pt_data.data3 = res.data.payable_data
        })
      }
    },
    // 产生订单总数
    tabClick (item, i, o) {
      const that = this
      if (o === 0) {
        that.activeCount = i
        if (i === 0) {
          that.orderGram.legend = '产生订单金额'
          // 订单情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=column' + '&time_unit=month' + '&year=' + that.yearOrder).then(res => {
            that.flag = true
            // x轴
            that.orderGram.xAxis = res.data.x_axis
            // 完成订单
            that.orderGram.data1 = res.data.order_value
          })
        } else if (i === 1) {
          that.orderGram.legend = '产生订单总数'
          // 订单情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=column' + '&time_unit=month' + '&year=' + that.yearOrder).then(res => {
            that.flag = true
            // x轴
            that.orderGram.xAxis = res.data.x_axis
            // 完成订单
            that.orderGram.data1 = res.data.order_count
          })
        }
      } else if (o === 1) {
        that.activeCount1 = i
        if (i === 0) {
          that.fundingGram.legend = '流动资金产生金额'
          // 流动资金缺口情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&year=' + that.yearGram + '&e_type=column' +'&contract_type=2' + '&time_unit=month').then(res => {
            that.flag = true
            // x轴
            that.fundingGram.xAxis = res.data.x_axis
            // 融资资金
            that.fundingGram.data1 = res.data.order_value
          })
        } else if (i === 1) {
          that.fundingGram.legend = '流动资金产生总数'
          // 流动资金缺口情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&year=' + that.yearGram + '&e_type=column' +'&contract_type=2' + '&time_unit=month').then(res => {
            that.flag = true
            // x轴
            that.fundingGram.xAxis = res.data.x_axis
            // 融资资金
            that.fundingGram.data1 = res.data.order_count
          })
        }
      }
    },
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
      that.orderSelect = '2019'
      that.orderSelect1 = '2019'
      that.orderSelect2 = '2019'
      that.orderSelect3 = '2019'
      that.orderSelect4 = '2019'
      that.yearOrder = '2019'
      that.yearGram = '2019'
      that.creditSelect = '2019'
      that.creditSelect1 = '2019'
      that.creditSelect2 = '2019'
      that.balanceSelect = '2019'
      // ['工商信息', '企业供应链交易统计', '企业供应链交易信用', '贷款统计', '财务状况', '荣誉资质', '新闻公告', '自我评级', '记账情况']
      // ['工商信息', '财务状况', '荣誉资质', '新闻公告', '自我评级', '企业供应链交易统计', '企业供应链交易信用', '贷款统计', '记账情况', '数据资产', '风险管理']
      if (localStorage.role === 'business') {
        if (index === 0) {
          that.activeShow = 0
          that.purchaseShow = false
          that.supplyShow = false
          that.serviceShow = false
        } else if (index === 1) {
          that.activeShow = 1
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
          that.activeShow = 2
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
          that.activeShow = 3
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
          that.activeShow = 4
          that.purchaseShow = false
          that.supplyShow = false
          that.serviceShow = false
        } else {
          that.$message.warning('暂无权限')
        }
      } else {
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
          // 订单情况------饼图-pie
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=pie').then(res => {
            that.orderStatus.data1 = res.data
          })
          // 订单情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=column' + '&time_unit=month').then(res => {
            that.flag = true
            // x轴
            that.orderGram.xAxis = res.data.x_axis
            // 完成订单
            that.orderGram.data1 = res.data.order_value
            // 未完成订单
            // that.orderGram[0].data2 = res.data.continued_order
            // // 取消订单
            // that.orderGram[0].data3 = res.data.cancelled_order
          })
          // 订单金额-------折线图-column_amount
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=column_amount').then(res => {
            // 采购订单---payable_amount
            that.orderColumn.data1 = res.data.payable_amount
            // 销售订单---received_amount
            that.orderColumn.data2 = res.data.received_amount
            // 总额
            // that.orderColumn.data3 = res.data.order_amount_list
            // x轴
            that.orderColumn.xAxis = res.data.x_axis
          })
          // 逾期情况------饼图-overdue_pie
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=overdue_pie').then(res => {
            // 采购订单---payable_amount
            that.payableBeOverdue.data1 = res.data.payable_order
            // 销售订单---received_amount
            that.receivedBeOverdue.data1 = res.data.received_order
          })
          // 应收账款/已收账款------双层饼图-account_amount_pie
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=account_amount_pie').then(res => {
            // 应收账款/已收账款
            that.receivableAccepted.data1 = res.data.reveived_data.outer
            // that.receivableAccepted.data1 = res.data.reveived_data.inner
            // that.receivableAccepted.data2 = res.data.reveived_data.outer
            // 应付账款/已付账款
            that.payableAccepted.data1 = res.data.payable_data.outer
            // that.payableAccepted.data1 = res.data.payable_data.inner
            // that.payableAccepted.data2 = res.data.payable_data.outer
          })
          // 流动资金缺口情况------饼图-pie
          that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.bid + '&e_type=pie').then(res => {
            that.fundingGap.data1 = res.data
          })
          // 流动资金缺口情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.bid + '&e_type=column' +'&contract_type=2' + '&time_unit=month').then(res => {
            that.flag = true
            // x轴
            that.fundingGram.xAxis = res.data.x_axis
            // 融资资金
            that.fundingGram.data1 = res.data.order_value
            // 自筹资金
            // that.fundingGram[0].data2 = res.data.no_f_order_data
            // // 未解决资金
            // that.fundingGram[0].data3 = res.data.unsolver_list
          })
          // 流动资金缺口情况------折线图-line
          that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.bid + '&e_type=line').then(res => {
            that.fundingGapLine.data1 = res.data.funding_gap
            that.fundingGapLine.data2 = res.data.loan_amount_list
            that.fundingGapLine.data3 = res.data.no_f_amount_list
            that.fundingGapLine.data4 = res.data.payable_amount_list
            // x轴
            that.fundingGapLine.xAxis = res.data.x_axis
            // funding_gap: [],
            // loan_amount_list: [],
            // no_f_amount_list: [],
            // payable_amount_list: [],
          })
        } else if (index === 6) {
          // 应付总池P(t)统计-----柱状图-pie
          that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.bid + '&year=2019').then(res => {
            that.creditIndex.xAxis = res.data.x_axis
            that.creditIndex.data1 = res.data.credit_data
            that.gt_data.xAxis = res.data.x_axis
            that.gt_data.data1 = res.data.gt_data
            that.disintegrationData.xAxis = res.data.x_axis
            that.disintegrationData.data1 = res.data.payable_data
            that.ct_gt_pt_data.xAxis = res.data.x_axis
            that.ct_gt_pt_data.data1 = res.data.credit_data
            that.ct_gt_pt_data.data2 = res.data.gt_data
            that.ct_gt_pt_data.data3 = res.data.payable_data
          })
        } else if (index === 7) {
          that.$ajax.get('/api/oth/loan_statistics/loan_value_statistics/?company_id=' + that.bid).then(res => {
            that.balanceData.xAxis = res.data.x_axis
            that.balanceData.data1 = res.data.new_loan_data
            that.balanceData.data2 = res.data.repayment_loan_data
            that.balanceData.data3 = res.data.remainder_loan_data
            that.balanceData2.xAxis = res.data.x_axis
            that.balanceData2.data1 = res.data.overdue_loan_data
          })
        } else if (index === 8) {
          that.handleChain(1)
        }
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
    },
    // 添加客户
    handleCustomer () {
      const that = this
      if (that.roles === 'fund') {
        that.$ajax.put(`/api/fund/member/` + that.$route.query.aid + '/', {status: '1'}).then(res => {
          that.auth = 2
          that.$message.success('接受成功')
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        that.$ajax.put(`/api/institution/customer/${that.$route.query.aid}/`, {status: 1}).then(res => {
          that.$message.success('添加成功')
          that.auth = 2
        })
      }
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
  background: #f5f7f8;
  min-height: 100%;
  //padding-top: 70px;
  .top_location {
    height: 60px;
    color: #666;
    line-height: 60px;
    // padding-left: 165px;
  }
  .info-enter {
    height: auto;
    position: relative;
    width: 100%;
    .lista {
      background: #fff;
      font-size: 14px;
      width: 1440px;
      margin: 0 auto;
      padding: 20px 30px;
      height: auto;
      position: relative;
    }
    .blog_header {
      position: relative;
      min-height: 180px;
      border-bottom: 1px solid #ccc;
      .blog_header_top {
        overflow: hidden;
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
            background: url(../../../../static/img/authentication/auth.png);
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
        text-align: right;
        margin-bottom: 16px;
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
          background: #cccccc;
        }
      }
    }
    .list_ul {
      width: 100%;
      height: 54px;
      // padding-top: 111px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      ul {
        display: flex;
        height: 54px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        flex-direction: row;
        line-height: 54px;
        li {
          width: 100px;
          padding: 0 20px;
          cursor: pointer;
          span {
            display: inline-block;
            width: 100%;
            height: 20px;
            // border-right: 1px solid #c2cbd0;
          }
        }
        li:nth-child(6),li:nth-child(7) {
          width: 110px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        // li:last-child {
        //   width: 200px;
        //   overflow: hidden;
        //   text-overflow:ellipsis;
        //   white-space: nowrap;
        // }
        .active_li {
          border-bottom: 2px solid #eb6100;
          color: #eb6100;
        }
      }
    }
    .table_list {
      height: auto;
      padding-bottom: 50px;
      h3 {
        height: 30px;
        font-weight: 700;
        font-style: normal;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
        margin-bottom: 30px;
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
        background: rgba(204,204,204,0.30);
      }
      .c_eb{
        color: #eb6100;
      }
      .c_info_table tr{
        height: 60px;
      }
      .c_info_table td{
        border: 1px solid #ccc;
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
            margin: 0 5px;
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
          border: 1px solid #ccc;
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
        color: #ccc;
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
              border: 1px solid #ccc;
              outline: none;
              width: 280px;
              height: 38px;
              border-radius: 5px;
              padding: 0 10px;
              line-height: 32px;
              background: #fff;
            }
            textarea {
              border: 1px solid #ccc;
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
              border: 1px solid #ccc;
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
    .transaction_statistics {
      .list {
        margin-bottom: 30px;
        h3 {
          height: 30px;
          font-weight: 700;
          font-style: normal;
          line-height: 30px;
          padding-left: 20px;
          font-size: 16px;
          border-left: 5px solid #eb6100;
        }
        .select {
          padding: 20px 27px;
          height: 60px;
          select {
            width: 150px;
            height: 30px;
            background: #fff;
            border: 1px solid #cccccc;
            color: #666;
            border-radius: 4px;
            font-size: 12px;
            padding: 0 10px;
            outline: none;
            cursor: pointer;
          }
        }
        .list_chart {
          height: 320px;
          display: flex;
          flex-direction: row;
          &>div {
            flex: 1;
          }
          .none {
            text-align: left;
            padding: 30px;
            font-size: 14px;
            margin: 0 auto;
            font-weight: bold;
          }
        }
        .h3_p {
          font-weight: 700;
          font-style: normal;
          line-height: 30px;
          font-size: 14px;
        }
        .list_btn_count {
          button {
            width: 80px;
            height: 28px;
            border: 1px solid #eb6100;
            background: none;
            outline: none;
            border-radius: 2px;
            color: #eb6100;
            margin: 0 10px;
            line-height: 28px;
          }
          .h3_p {
            font-weight: 700;
            font-style: normal;
            line-height: 30px;
            font-size: 14px;
          }
          button:hover {
            background: #eb6100;
            border: 1px solid #eb6100;
            color: #fff;
          }
          .active {
            background: #eb6100;
            border: 1px solid #eb6100;
            color: #fff;
          }
        }
        .none {
          text-align: left;
          padding: 30px;
          font-size: 14px;
          margin: 0 auto;
          font-weight: bold;
        }
        .overdue {
          height: 400px;
          .left {
            .p {
              padding: 20px 0 0 20px;
              p {
                line-height: 30px;
                width: 240px;
              }
            }
          }
          .right {
            .p {
              padding: 20px 0 0 20px;
              p {
                line-height: 30px;
                width: 240px;
              }
            }
          }
        }
        .accepted {
          height: 350px;
          margin-bottom: 20px;
        }
      }
    }
    .financing_statistics {
      .list {
        margin-bottom: 30px;
        h3 {
          height: 30px;
          font-weight: 700;
          font-style: normal;
          line-height: 30px;
          padding-left: 20px;
          font-size: 16px;
          border-left: 5px solid #eb6100;
          position: relative;
          .select {
            position: absolute;
            bottom: 0;
            right: 60px;
            select {
              width: 150px;
              height: 30px;
              background: #fff;
              border: 1px solid #cccccc;
              color: #666;
              border-radius: 4px;
              font-size: 12px;
              padding: 0 10px;
              outline: none;
              cursor: pointer;
            }
          }
        }
        .list_chart {
          height: 350px;
          display: flex;
          flex-direction: row;
          &>div {
            flex: 1;
          }
          .none {
            text-align: left;
            padding: 30px;
            font-size: 14px;
            margin: 0 auto;
            font-weight: bold;
          }
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
#new_industry_list {
  padding-bottom: 20px;
  height: auto;
  width: 100%;
}
#new_industry_list .new_list-table h3 {
  color: #eb6100;
  font-size: 16px;
  margin-bottom: 10px;
  border-left: 5px solid #eb6100;
  padding-left: 11px;
  line-height: 19px;
  margin-top: 20px;
}
#new_industry_list .new_list-table {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
#new_industry_list .new_list-table table {
  width: 100%;
}
#new_industry_list .new_list-table tr td:nth-child(1) {
  width: 5%;
  border: 1px solid #efefef;
  background-color: #f9f9f9;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  box-sizing: border-box;
  /* height: 100%; */
  word-break: break-all;
  line-height: 20px;
  color: #666;
}
#new_industry_list .new_list-table .table-list tr td:nth-child(2) {
  width: 30%;
}
#new_industry_list .new_list-table .table-list tr td:nth-child(3) {
  width: 20%;
}
#new_industry_list .new_list-table .table-list tr td:nth-child(4) {
  width: 20%;
}
#new_industry_list .new_list-table .table-list tr td:nth-child(5) {
  width: 25%;
}
#new_industry_list .new_list-table tr td {
  border: 1px solid #efefef;
  background-color: #f9f9f9;
  padding: 12px;
  text-align: center;
  box-sizing: border-box;
  /* height: 100%; */
  word-break: break-all;
  line-height: 20px;
  color: #666;
}
#new_industry_list .new_list-table tr:nth-child(n+2) td {
  background: #fff;
  /* max-height: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}
#new_industry_list .person_info .people-list {
  height: auto;
}
#new_industry_list .person_info .people-list li {
  position: relative;
  width: 120px;
  height: 60px;
  padding: 5px;
  margin: 6px;
  background: #f6f9f9;
  border: solid 1px #ddd;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}
#new_industry_list .person_info .people-list li p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 25px;
  font-size: 16px;
  line-height: 25px;
  position: absolute;
  width: 100%;
  left: -1px;
  display: block;
}
#new_industry_list .person_info .people-list li div {
  position: absolute;
  bottom: 10px;
  width: 100%;
  left: -1px;
}
#new_industry_list .person_info .people-list li div span {
  font-size: 14px;
}
#new_industry_list .new_list-table .span {
  display: block;
  padding: 5px 0;
}
#new_industry_list .new_list-table .table-list1 tr td:nth-child(2) {
  width: 500px;
}
#new_industry_list .new_list-table .table-list1 tr td:nth-child(3) {
  width: 60%;
}
#new_industry_list .new_list-table .table-list2 tr td:nth-child(2) {
  width: 20%;
}
#new_industry_list .new_list-table .table-list2 tr td:nth-child(3) {
  width: 25%;
}
#new_industry_list .new_list-table .table-list2 tr td:nth-child(4) {
  width: 20%;
}
#new_industry_list .new_list-table .table-list2 tr td:nth-child(5) {
  width: 20%;
}

#new_industry_list .new_list-table .table-list3 tr td:nth-child(2) {
  width: 20%;
}
#new_industry_list .new_list-table .table-list3 tr td:nth-child(3) {
  width: 10%;
}
#new_industry_list .new_list-table .table-list3 tr td:nth-child(4) {
  width: 20%;
}
#new_industry_list .new_list-table .table-list3 tr td:nth-child(5) {
  width: 15%;
}
#new_industry_list .new_list-table .table-list3 tr td:nth-child(6) {
  width: 15%;
}
#new_industry_list .new_list-table .table-list3 tr td:nth-child(7) {
  width: 5%;
}
#new_industry_list .new_list-table .table-list4 tr td:nth-child(2) {
  width: 8%;
}
#new_industry_list .style_none {
  width: 100%;
  line-height: 45px;
  border: 1px solid #efefef;
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  /* height: 100%; */
  word-break: break-all;
  color: #666;
}
</style>
