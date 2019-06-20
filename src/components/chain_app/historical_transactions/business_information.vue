<template>
  <div id="business_information">
    <div class="flex-add">
      <!-- 工商信息 -->
      <div class="table_list">
        <div id="new_industry_list_a">
          <div class="new_list-table">
              <!-- 工商信息 -->
            <h3>工商信息</h3>
            <table class="c_info_table" border="1">
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
                  <span>{{ status[companyInformation.detail_info.company_nature] }}</span>
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
            <div id="shareholderInfo_none" class="style_none">暂无股东及出资信息</div>
          </div>
          <div class="new_list-table">
            <!-- 主要人员信息 -->
            <h3>主要人员信息</h3>
            <div class="person_info"></div>
            <div id="person_info_none" class="style_none">暂无主要人员信息</div>
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
            <div id="altInfo_none" class="style_none">暂无变更信息</div>
          </div>
          <div class="new_list-table">
            <!-- "needPaging_guaranty",  # 动产抵押信息 -->
            <h3>动产抵押登记信息</h3>
            <div class="needPaging_guaranty"></div>
            <div id="needPaging_guaranty_none" class="style_none">暂无动产抵押登记信息</div>
          </div>
          <div class="new_list-table">
            <!-- "needPaging_pledge",  # 股权出质登记信息 -->
            <h3>股权出质登记信息</h3>
            <div class="needPaging_pledge"></div>
            <div id="needPaging_pledge_none" class="style_none">暂无股权出质登记信息</div>
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
            <div id="needPaging_abnormal_none" class="style_none">暂无列入经营异常名录信息</div>
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
  </div>
</template>

<script>
export default {
  name: 'business_information',
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
      company_id: ''
    }
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
    // 工商信息
    that.$ajax.get(`/api/company/` + that.company_id + '?detail_info=1').then(res => {
      // 公司信息
      this.companyInformation = res.data
    })
    // 新工商信息等内容
    that.$ajax.get('/api/company/?signed=True&supply_demand=1&detail_info=1&id=' + that.company_id).then(res => {
      // 新加企业工商信息等
      if (res.data.results[0].detail_info.gsxt_info) {
        // "shareholderInfo",  # 股东及出资信息
        if (res.data.results[0].detail_info.gsxt_info.shareholderInfo.length > 0) {
          let str = "<table class='table-list5'>";
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
          $('#new_industry_list_a .shareholderInfo').html(str);
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
          $('#new_industry_list_a .person_info').html(str);
        }
        // neRecItemInfos  “多证合一”信息公示
        if (res.data.results[0].detail_info.gsxt_info.neRecItemInfos.length > 0) {
          let str = "<table class='table-list1'>";
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
          $('#new_industry_list_a .neRecItemInfos').html(str);
        }
        // "altInfo",  # 变更信息
        if (res.data.results[0].detail_info.gsxt_info.altInfo.length > 0) {
          // that.altInfo = res.data.results[0].detail_info.gsxt_info.altInfo
          // that.altInfo_total = that.altInfo.length-1
          let str = "<table class='table-list2'>";
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
          $('#new_industry_list_a .altInfo').html(str);
        }
        // "needPaging_guaranty",  # 动产抵押信息
        if (res.data.results[0].detail_info.gsxt_info.needPaging_guaranty.length > 0) {
          let str = "<table class='table-list3'>";
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
          $('#new_industry_list_a .needPaging_guaranty').html(str);
        }
        // "needPaging_pledge",  # 股权出质登记信息
        if (res.data.results[0].detail_info.gsxt_info.needPaging_pledge.length > 0) {
          let str = "<table class='table-list4'>";
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
          $('#new_industry_list_a .needPaging_pledge').html(str);
        }
        // "copyright_baseinfo",  # 知识产权出质登记信息
        if (res.data.results[0].detail_info.gsxt_info.copyright_baseinfo.length > 0) {
          let str = "<table class='table-list5'>";
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
          $('#new_industry_list_a .copyright_baseinfo').html(str);
        }
        // "needPaging_inspect",  # 抽查检查结果信息
        if (res.data.results[0].detail_info.gsxt_info.needPaging_inspect.length > 0) {
          let str = "<table class='table-list5'>";
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
          $('#new_industry_list_a .needPaging_inspect').html(str);
        }
        // "needPaging_freeze",  # 司法协助信息
        if (res.data.results[0].detail_info.gsxt_info.needPaging_freeze.length > 0) {
          let str = "<table class='table-list5'>";
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
          $('#new_industry_list_a .needPaging_freeze').html(str);
        }
        // "needPaging_otherLicensing",  # 行政许可信息
        if (res.data.results[0].detail_info.gsxt_info.needPaging_otherLicensing.length > 0) {
          let str = "<table class='table-list5'>";
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
          $('#new_industry_list_a .needPaging_otherLicensing').html(str);
        }
        // "needPaging_punish",  # 行政处罚信息
        if (res.data.results[0].detail_info.gsxt_info.needPaging_punish.length > 0) {
          let str = "<table class='table-list5'>";
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
          $('#new_industry_list_a .needPaging_punish').html(str);
        }
        // "needPaging_abnormal",  # 列入经营异常名录信息
        if (res.data.results[0].detail_info.gsxt_info.needPaging_abnormal.length > 0) {
          let str = "<table class='table-list5'>";
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
          $('#new_industry_list_a .needPaging_abnormal').html(str);
        }
        // "needPaging_illegal",  # 列入严重违法失信企业名单（黑名单）信息
        if (res.data.results[0].detail_info.gsxt_info.needPaging_illegal.length > 0) {
          let str = "<table class='table-list5'>";
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
          $('#new_industry_list_a .needPaging_illegal').html(str);
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
#business_information {
  .flex-add {
    .table_list {
      height: auto;
      /* 表格 */
      .c_info_table{
        margin-top: 20px;
        width: 100%;
        border-collapse: collapse;
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
        background:rgba(250,250,250,1);
        text-align: center;
      }
      .c_no {
        background: #fff;
      }
      .c_eb{
        color: #eb6100;
      }
      .c_info_table tr{
        height: 60px;
      }
      .c_info_table td{
        border: 1px solid rgba(221,221,221,1);
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
      .new_list-table {
        width:100%;
        height:auto;
        background:rgba(255,255,255,1);
        margin-top: 20px;
        padding: 0 30px 37px;
        h3 {
          width:100%;
          height:57px;
          line-height: 57px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
          border-bottom: 1px solid rgba(221,221,221,1);
          margin-bottom: 20px;
        }
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
}
#new_industry_list_a {
  height: auto;
  width: 100%;
  .table_list_company {
    dl {
      display: inline-block;
    }
  }
  .altInfo {
    tr td:nth-child(5) {
      padding-left: 20px;
    }
  }
}
#new_industry_list_a .new_list-table table {
  width: 100%;
}
#new_industry_list_a .new_list-table tr td:nth-child(1) {
  width: 5%;
  border-bottom: 1px solid rgba(221,221,221,1);
  background-color: rgba(250,250,250,1);
  padding: 12px;
  text-align: center;
  box-sizing: border-box;
  word-break: break-all;
  line-height: 20px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
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
  border-bottom: 1px solid rgba(221,221,221,1);
  background-color: rgba(250,250,250,1);
  padding: 12px;
  text-align: center;
  box-sizing: border-box;
  /* height: 100%; */
  word-break: break-all;
  line-height: 20px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(102,102,102,1);
  display: table-cell;
  vertical-align: middle;
}
#new_industry_list_a .new_list-table tr:nth-child(n+2) td {
  background: #fff;
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
  padding: 0 0 15px 2px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(102,102,102,1);
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
  border-bottom: 1px solid rgba(221,221,221,1);
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  /* height: 100%; */
  word-break: break-all;
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(102,102,102,1);
}
</style>

<style lang="less">
#new_industry_list_a {
  height: auto;
  width: 100%;
  .table_list_company {
    dl {
      display: inline-block;
    }
  }
  .altInfo {
    tr td:nth-child(5) {
      padding-left: 20px;
    }
  }
}
#new_industry_list_a .new_list-table table {
  width: 100%;
}
#new_industry_list_a .new_list-table tr td:nth-child(1) {
  width: 5%;
  border-bottom: 1px solid rgba(221,221,221,1);
  background-color: rgba(250,250,250,1);
  padding: 12px;
  box-sizing: border-box;
  word-break: break-all;
  text-align:center;
  line-height: 20px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
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
  border-bottom: 1px solid rgba(221,221,221,1);
  background-color: rgba(250,250,250,1);
  padding: 12px;
  box-sizing: border-box;
  /* height: 100%; */
  word-break: break-all;
  line-height: 20px;
  font-size:14px;
  text-align:center;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(102,102,102,1);
  display: table-cell;
  vertical-align: middle;
}
#new_industry_list_a .new_list-table tr:nth-child(n+2) td {
  background: #fff;
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
  padding: 0 0 15px 2px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(102,102,102,1);
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
  border-bottom: 1px solid rgba(221,221,221,1);
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  /* height: 100%; */
  word-break: break-all;
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(102,102,102,1);
}
</style>
