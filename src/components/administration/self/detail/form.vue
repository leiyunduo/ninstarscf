<template>
  <div class="form-wraper">
    <div class="form-view">
      <div class="form-group">
        <div class="form-editor">
          <el-form :label-position="labelPosition" label-width="150px" size="small" :model="enterInfor">
            <el-form-item label="企业名称：">
              <span class="form-text">{{enterInfor.name || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="统一社会信用代码：">
              <span class="form-text">{{(enterInfor.certificates && enterInfor.certificates.business_license_id) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="营业执照证件号：">
              <span class="form-text">{{(enterInfor.certificates && enterInfor.certificates.business_license_id) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="登记机关：">
              <span class="form-text">{{(enterInfor.business_information && enterInfor.business_information.belong_org) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="成立日期：">
              <span class="form-text">{{(enterInfor.business_information && enterInfor.business_information.year_founded) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="注销/吊销日期：">
              <span class="form-text">{{enterInfor.end_data || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="登记状态：">
              <span class="form-text">{{(enterInfor.business_information && enterInfor.business_information.register_status) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="注册资本：">
              <span class="form-text">{{(enterInfor.business_information && enterInfor.business_information.register_assets) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="经营期限：">
              <span class="form-text">{{(enterInfor.business_information && enterInfor.business_information.term_start) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="核准日期：">
              <span class="form-text">{{(enterInfor.business_information && enterInfor.business_information.check_date) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="行业：">
              <span class="form-text">{{(enterInfor.business_information && enterInfor.business_information.trade) || '暂无数据'}}</span>
            </el-form-item>
            <el-form-item label="所在地区：">
              <span class="form-text" v-if="enterInfor.area && enterInfor.area.province">{{(`${enterInfor.area.province}${enterInfor.area.city}${enterInfor.area.region}`)}}</span>
              <span class="form-text" v-else>暂无数据</span>
            </el-form-item>
            <el-form-item label="经营范围：">
              <span class="form-text">{{(enterInfor.business_information && enterInfor.business_information.scope) || '暂无数据'}}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resolve } from 'url';
import { encode } from 'punycode';
  export default {
    name: '',
    data () {
      return {
        labelPosition: 'right',
        enterInfor: {  // 工商信息
          name: '',
          business_license_id: '',
          belong_org: '',
          year_founded: '',
          end_data: '',
          register_status: '',
          register_assets: '',
          term_start: '',
          term_end: '',
          check_date: '',
          trade: '',
          province: '',
          city: '',
          region: '',
          scope: '',
          content: ''
        }
      }
    },
    mounted () { 
      if (localStorage.id) {
        this.getCompanyInfo(localStorage.id).then(this.getCompanyInfoByDesc)
      }
    },
    methods: { 
      getCompanyInfo (userId) {
        return new Promise((resolve, reject) => {
          this.$ajax.get(`/api/company/` + localStorage.id).then(res => {
            this.$store.commit('homePage/setAvatar', res.data.avatar)
            localStorage.setItem('avatar', encodeURIComponent(res.data.avatar))
            localStorage.setItem('self_name', encodeURIComponent(res.data.name))
            resolve(res.data.detail)
          })
        })
      },
      getCompanyInfoByDesc (desc) {
        this.$ajax.get(`/api/company_detail/` + desc).then(res => {
          this.enterInfor = res.data
          this.$store.commit('homePage/setConnectionInfo', {...res.data.contact_info, ...{desc}})
          this.$store.commit('homePage/setSelfAppraisal', {...res.data.self_appraisal, ...{desc}})
          let obj = {}
          obj.name = res.data.name
          obj.desc = desc
          this.$store.commit('homePage/setSelfName', obj)
          if (res.data.brief_introduction) {
            let _selfInfo = {}
            _selfInfo.abbreviation = res.data.brief_introduction.abbreviation
            _selfInfo.slogan = res.data.brief_introduction.slogan
            _selfInfo.content = res.data.brief_introduction.content
            _selfInfo.phone = res.data.contact_info.phone
            _selfInfo.email = res.data.contact_info.email
            _selfInfo.address = res.data.contact_info.address
            this.$store.commit('homePage/setSelfInfo', _selfInfo)
          }
        })
      }
    }
  }
</script>
<style lang='less' scope>
  .form-wraper {
    .form-view {
      .form-group {
        padding: 20px 30px;
        margin: 20px;
        .form-text {
          color: #333;
        }
      }
    }
  }
</style>