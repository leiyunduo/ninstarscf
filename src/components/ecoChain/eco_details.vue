<template>
  <div class="eco_details">
    <!-- 工商信息 -->
    <div class="table_list">
      <div class="blog_header">
        <div class="blog_header_top">
          <div class="blog_header_top_left">
            <!-- <img src="../../../static/img/img.png" alt=""> -->
            <img :src="showIcon(enterList)" alt="">
          </div>
          <div class="blog_header_top_right">
            <h4>{{ companyInformation.detail_info.name }}
              <!-- <div class="c_verify_bg" v-if="nscfca"></div> -->
              <div class="blog_header_bottom" v-if="roles === 'business'">
                <button @click="bankClick">返回</button>
              </div>
              <div class="blog_header_bottom" v-if="roles === 'business' && Cdata.bank === 0">
                <button @click="add(0)">添加为客户</button>
                <button @click="add(1)">添加为供应商</button>
                <button @click="add(2)">添加为服务商</button>
              </div>
            </h4>
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
      </div>
      <div id="new_industry_list_a">
        <div class="new_list-table1">
            <!-- 工商信息 -->
          <h3>工商信息</h3>
          <table class="c_info_table">
            <tr>
              <td class="gray">统一社会信用代码</td>
              <td class="c_no" style="text-align:left;">
                <span>{{ companyInformation.detail_info.certificates.social_security_reg_id }}</span>
                <span
                  v-if="!companyInformation.detail_info.certificates.social_security_reg_id"
                >暂无</span>
              </td>
              <td class="gray">法定代表人</td>
              <td class="c_taxpayer_license_id" style="text-align:left;">
                <span>{{ companyInformation.legal_person_info.name }}</span>
                <span v-if="!companyInformation.legal_person_info.name">暂无</span>
              </td>
            </tr>
            <tr>
              <td class="gray">公司类型</td>
              <td class="c_credit_code" style="text-align:left;">
                <span>{{ companyInformation.detail_info.company_nature }}</span>
                <span v-if="!companyInformation.detail_info.company_nature">暂无数据</span>
              </td>
              <td class="gray">注册资本</td>
              <td class="c_institutional_type" style="text-align:left;">
                <span>{{ companyInformation.detail_info.business_information.register_assets }}</span>
                <span v-if="!companyInformation.detail_info.business_information.register_assets">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">成立日期</td>
              <td class="c_address" style="text-align:left;">
                <span>{{ companyInformation.detail_info.business_information.year_founded }}</span>
                <span v-if="!companyInformation.detail_info.business_information.year_founded">暂无数据</span>
              </td>
              <td class="gray">登记状态</td>
              <td class="c_credit_code" style="text-align:left;">
                <span class="blue">{{ companyInformation.detail_info.business_information.register_status }}</span>
                <span v-if="!companyInformation.detail_info.business_information.register_status">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">营业期限自</td>
              <td class="c_address" style="text-align:left;">
                <span class="blue">{{ companyInformation.detail_info.business_information.term_start || '未指定'}}</span>
              </td>
              <td class="gray">营业期限至</td>
              <td class="c_credit_code" style="text-align:left;">
                <span class="blue">{{companyInformation.detail_info.business_information.term_end || '未指定'}}</span>
              </td>
            </tr>
            <tr>
              <td class="gray">登记机关</td>
              <td colspan="3" class="c_scope" style="text-align:left;">
                <span class="blue">{{ companyInformation.detail_info.business_information.belong_org }}</span>
                <span v-if="!companyInformation.detail_info.business_information.belong_org">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">注册地址</td>
              <td colspan="3" class="c_scope" style="text-align:left;">
                <span>{{ companyInformation.detail_info.area.province + ' ' +  companyInformation.detail_info.area.city + ' ' + companyInformation.detail_info.area.region}}</span>
                <span v-if="!companyInformation.detail_info.area">暂无数据</span>
              </td>
            </tr>
            <tr>
              <td class="gray">经营范围</td>
              <td colspan="3" class="c_scope" style="text-align:left;">
                <span>{{ companyInformation.detail_info.business_information.scope }}</span>
                <span v-if="!companyInformation.detail_info.business_information.scope">暂无数据</span>
              </td>
            </tr>
          </table>
        </div>
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
          </div>
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
          <!-- <div id="needPaging_punish_none" class="style_none">暂无行政处罚信息</div> -->
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
  </div>
</template>

<script>
export default {
  name: 'ecoDetails',
  data () {
    return {
      status: ['', '企业', '个体工商户', '政府机关/事业单位'],
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
      // 新工商信息
      altInfo: [],
      company_id: '',
      enterList: '',
      roles: ''
    }
  },
  props: {
    Cdata: Object
  },
  computed: {
    //监听父组件的数值变化
    bank () {
      return Number(this.Cdata.bank)
    },
    companyData () {
      console.log(this.Cdata.companyData)
      return this.Cdata.companyData
    }
  },
  watch: {
    companyData (n, o) {
      console.log(n)
      this.$nextTick(()=> {
        this.dataList(n)
      })
    },
    bank (n, o) {
      console.log(n)
      return n
    }
  },
  mounted () {
    const that = this
    that.roles = localStorage.role
    that.dataList(this.Cdata.companyData)
  },
  methods: {
    dataList (n) {
      const that = this
      let i = this.Cdata.companyData
      console.log(i.AbnormalInfoList)
      that.companyInformation = {
        detail_info: {
          name: i.OrgInfo.OrganizationName,
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
      $('#new_industry_list_a .shareholderInfo').html(str);
      // 高管信息
      let str1 = "<ul class='people-list'>";
      for (let j = 0; j < i.SharePersonalInfoList.length; j++) {
        str1 += "<li>";
        str1 += `${i.SharePersonalInfoList[j]['PersonName']}`
        str1 += "</li>";
      }
      str1 += "</ul>";
      if (i.SharePersonalInfoList.length === 0) str1 = '<div class="style_none">暂无高管信息</div>'
      $('#new_industry_list_a .person_info').html(str1)
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
      $('#new_industry_list_a .altInfo').html(str2);
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
      $('#new_industry_list_a .needPaging_guaranty').html(str3);
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
      $('#new_industry_list_a .needPaging_pledge').html(str4);
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
      $('#new_industry_list_a .needPaging_punish').html(str5);
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
      $('#new_industry_list_a .needPaging_abnormal').html(str6);
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
    add (i) {
      const that = this
      // relation_type        | 要添加的关系：（'0', '客户'), ('1', '供应商'), ('2', '服务商')
      that.$ajax.post('/api/chain/partner_company/', {relation_type: i, partner_company_name: that.companyInformation.detail_info.name}).then(res => {
        that.$message.success(res.data.msg)
        that.$emit('listenEvent', true, 0)
        that.searchName = ''
      })
    },
    bankClick () {
      const that = this
      that.$emit('listenEvent', true, 0)
      that.searchName = ''
    }
  }
}
</script>

<style lang="less" scoped>
.eco_details {
  padding: 20px 0;
  .table_list {
    height: auto;
    .blog_header {
      position: relative;
      min-height: 180px;
      border-bottom: 1px solid #ccc;
      padding: 0 30px;
      .blog_header_top {
        overflow: hidden;
        display: flex;
        flex-direction: row;
        .blog_header_top_left {
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
          flex: 1;
          margin-left: 50px;
          h4 {
            line-height: 50px;
            font-size: 16px;
            font-weight: bold;
          }
          .c_verify_bg {
            width: 60px;
            height: 60px;
            background: url(../../../static/img/authentication/auth.png);
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
        float: right;
        button {
          line-height: 30px;
          border: none;
          color: #fff;
          width: auto;
          background: none;
          border-radius: 4px;
          outline: none;
          background: #eb6100;
          margin-right: 20px;
          padding: 0 10px;
        }
        .over {
          background: #cccccc;
        }
      }
    }
    /* 表格 */
    .c_info_table{
      margin-top: 20px;
      width: 100%;
      font-size: 14px;
      span {
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
    .c_taxpayer_license_id {
      background: #fff;
    }
    .gray{
      color: #333;
    }
    .c_no {
      background: #fff;
    }
    .c_eb{
      color: #eb6100;
    }
    .c_info_table tr{
      height: 30px;
    }
    .c_info_table td{
      padding: 0 20px;
      vertical-align: middle;
      box-sizing: border-box;
    }
    td.gray{
      width: 120px;
      text-align: left;
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
    
  }
  #new_industry_list_a {
    .new_list-table1 {
      width:100%;
      height:auto;
      background:rgba(255,255,255,1);
      margin-top: 20px;
      padding: 0 30px 37px;
      border-bottom: 1px solid #eee;
      h3 {
        color: #eb6100;
        font-size: 16px;
        margin-bottom: 10px;
        border-left: 5px solid #eb6100;
        padding-left: 11px;
        line-height: 19px;
        margin-top: 20px;
      }
    }
    .new_list-table {
      margin-top: 20px;
      padding: 0 30px 37px;
    }
    .table_list_company {
      .list {
        display: flex;
        flex-direction: row;
        dl {
          flex: 1;
          text-align: left;
          height: 30px;
          padding: 3px 0 3px 0;
          dt {
            color: #333;
            font-weight: bold;
            font-size: 16px;
            float: left;
          }
          dd {
            float: left;
            color: #999;
            font-size: 16px;
          }
        }
      }
      .info-dl {
        display: block;
        padding: 3px 0 3px 0;
        dt {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
        }
        dd {
          display: inline-block;
          color: #999;
          font-size: 16px;
        }
      }
    }
  }
}
</style>

<style lang="less">
#new_industry_list_a {
  padding-bottom: 20px;
  height: auto;
  width: 100%;
}
#new_industry_list_a .new_list-table h3 {
  color: #eb6100;
  font-size: 16px;
  margin-bottom: 10px;
  border-left: 5px solid #eb6100;
  padding-left: 11px;
  line-height: 19px;
  margin-top: 20px;
}
#new_industry_list_a .new_list-table {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
#new_industry_list_a .new_list-table table {
  width: 100%;
}
#new_industry_list_a .new_list-table tr td:nth-child(1) {
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
#new_industry_list_a .new_list-table .table-list tr td:nth-child(2) {
  width: 30%;
}
#new_industry_list_a .new_list-table .table-list tr td:nth-child(3) {
  width: 20%;
}
#new_industry_list_a .new_list-table .table-list tr td:nth-child(4) {
  width: 20%;
}
#new_industry_list_a .new_list-table .table-list tr td:nth-child(5) {
  width: 25%;
}
#new_industry_list_a .new_list-table tr td {
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
#new_industry_list_a .new_list-table tr:nth-child(n+2) td {
  background: #fff;
  /* max-height: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}
#new_industry_list_a .person_info .people-list {
  height: auto;
}
#new_industry_list_a .person_info .people-list li {
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
#new_industry_list_a .person_info .people-list li p {
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
#new_industry_list_a .person_info .people-list li div {
  position: absolute;
  bottom: 10px;
  width: 100%;
  left: -1px;
}
#new_industry_list_a .person_info .people-list li div span {
  font-size: 14px;
}
#new_industry_list_a .new_list-table .span {
  display: block;
  padding: 5px 0;
}
#new_industry_list_a .new_list-table .table-list1 tr td:nth-child(2) {
  width: 500px;
}
#new_industry_list_a .new_list-table .table-list1 tr td:nth-child(3) {
  width: 60%;
}
#new_industry_list_a .new_list-table .table-list2 tr td:nth-child(2) {
  width: 20%;
}
#new_industry_list_a .new_list-table .table-list2 tr td:nth-child(3) {
  width: 25%;
}
#new_industry_list_a .new_list-table .table-list2 tr td:nth-child(4) {
  width: 20%;
}
#new_industry_list_a .new_list-table .table-list2 tr td:nth-child(5) {
  width: 20%;
}

#new_industry_list_a .new_list-table .table-list3 tr td:nth-child(2) {
  width: 20%;
}
#new_industry_list_a .new_list-table .table-list3 tr td:nth-child(3) {
  width: 10%;
}
#new_industry_list_a .new_list-table .table-list3 tr td:nth-child(4) {
  width: 20%;
}
#new_industry_list_a .new_list-table .table-list3 tr td:nth-child(5) {
  width: 15%;
}
#new_industry_list_a .new_list-table .table-list3 tr td:nth-child(6) {
  width: 15%;
}
#new_industry_list_a .new_list-table .table-list3 tr td:nth-child(7) {
  width: 5%;
}
#new_industry_list_a .new_list-table .table-list4 tr td:nth-child(2) {
  width: 8%;
}
#new_industry_list_a .style_none {
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
