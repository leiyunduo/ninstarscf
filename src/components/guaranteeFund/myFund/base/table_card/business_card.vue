<template>
  <div class='business_card' :style="modal ? 'margin-top: -20px' : ''">
    <div class="board_card">
      <div class='logo' v-if="company.logo">
        <img :src="(!company.logo || company.logo === '/static/default_avatar.png') ? 'static/img/tickets/default_business.png' : $root_url() + company.logo" alt="">
      </div>
      <div class='show_title'>
        <p>{{company.name}}</p>
        <div class='legal_person'>
          <div>
            <span>法人姓名：</span>
            <span>{{company.legal_person}}</span>
          </div>
          <div>
            <span>联系电话：</span>
            <span :style="!company.legal_person_phone ? 'color: #999' : ''">{{company.legal_person_phone || '未填写'}}</span>
          </div>
          <div>
            <span>联系邮箱：</span>
            <span :style="!company.legal_person_email ? 'color: #999' : ''">{{company.legal_person_email || '未填写'}}</span>
          </div>
        </div>
        <div class='business_desc'>
          <span>简介：</span>
          <p :style="!company.desc ? 'color: #999' : ''" v-html="company.desc ? company.desc : '企业暂未填写'"></p>
        </div>
      </div>
    </div>
    <div class="section_title">
      <span>工商信息</span>
    </div>
    <div class="information_card">
      <div class='information_line'>
        <div class="information_item">
          <span>企业名称：</span>
          <span>{{businessInformation.name}}</span>
        </div>
        <div class="information_item">
          <span>登记状态：</span>
          <span :class='businessInformation.register_status ? "" : "null"'>{{businessInformation.register_status || '企业未登记'}}</span>
        </div>
      </div>
      <div class='information_line'>
        <div class="information_item">
          <span>统一信用代码：</span>
          <span :class='businessInformation.social_security_reg_id ? "" : "null"'>{{businessInformation.social_security_reg_id || '企业未登记'}}</span>
        </div>
        <div class="information_item">
          <span>注册资本：</span>
          <span :class='businessInformation.register_money ? "" : "null"'>{{businessInformation.register_money || '企业未登记'}}</span>
        </div>
      </div>
      <div class='information_line'>
        <div class="information_item">
          <span>营业执照注册号：</span>
          <span :class='businessInformation.business_license_id ? "" : "null"'>{{businessInformation.business_license_id}}</span>
        </div>
        <div class="information_item">
          <span>经营期限：</span>
          <span :class='businessInformation.operating_during ? "" : "null"'>{{businessInformation.operating_during || '企业未登记'}}</span>
        </div>
      </div>
      <div class='information_line'>
        <div class="information_item">
          <span>登记机关：</span>
          <span :class='businessInformation.register_outfit ? "" : "null"'>{{businessInformation.register_outfit || '企业未登记'}}</span>
        </div>
        <div class="information_item">
          <span>核准日期：</span>
          <span :class='businessInformation.sure_date ? "" : "null"'>{{businessInformation.sure_date || '企业未登记'}}</span>
        </div>
      </div>
      <div class='information_line'>
        <div class="information_item">
          <span>成立日期：</span>
          <span :class='businessInformation.found_date ? "" : "null"'>{{businessInformation.found_date || '企业未登记'}}</span>
        </div>
        <div class="information_item">
          <span>行业：</span>
          <span :class='businessInformation.industry ? "" : "null"'>{{businessInformation.industry || '企业未登记'}}</span>
        </div>
      </div>
      <div class='information_line'>
        <div class="information_item">
          <span>注销/吊销日期：</span>
          <span :class='businessInformation.get_date ? "" : "null"'>{{businessInformation.get_date || '企业未登记'}}</span>
        </div>
        <div class="information_item">
          <span>所在地区：</span>
          <span :class='businessInformation.area ? "" : "null"'>{{businessInformation.area}}</span>
        </div>
      </div>
      <div class='information_desc'>
        <span>经营范围：</span>
        <p :style='false ? "" : "color: #999"'>企业未登记</p>
      </div>
    </div>
    <div class="section_title_robot">
      <span>企业大数据画像</span>
      <!-- <ul>
        <li v-for="(item, index) in timeList" :class='selTime === index ? "issel" : ""' :key='index' @click="handleTimeRobot($event, item, index)">{{item.title}}</li>
      </ul> -->
    </div>
    <div class='robot_wrap'>
      <robot :bid='id' :only="true" :timezone='timezone' />
    </div>
    <!-- <div class="section_title">
      <span>企业交易数据总览</span>
    </div>
    <div class="diamond_list">
      <ringAll :bid='id' />
    </div> -->
    <!-- <div class="diamond_list">
      <div class='d_center'>
        <img :src="disIcon" alt="">
        <p>链主企业</p>
        <p>关联采购和供应</p>
      </div>
      <div class="d_list">
        <div class="line"></div>
        <ul>
          <li v-for="(item, index) in safeDiamoud" :key='index'>
            <img :src="item ? sIocn : disIcon" alt="">
            <p>{{nines[index]}}</p>
          </li>
        </ul>
      </div>
      <div class="d_list">
        <div class="line"></div>
        <ul>
          <li v-for="(item, index) in purDiamoud" :key='index'>
            <img :src="item ? pIcon : disIcon" alt="">
            <p>{{nines[index]}}</p>
          </li>
        </ul>
      </div>
    </div> -->
    <!-- <div class="section_title">
      <span>供应商</span>
    </div>
    <ul class='five_line'>
      <li v-for="(item, index) in fives" :key='index'>
        <button>{{item}}</button>
      </li>
    </ul> -->
    <div class="section_title">
      <span>财务状况</span>
    </div>
    <div class="finance_list">
      <ul class='finance_group_list'>
        <li @click="handleFinance(item, index)" v-for="(item, index) in financeGroup" :key='index' :class='selType === index ? "issel" : ""'>{{item.title}}</li>
      </ul>
      <ul class='finance_info_list'>
        <li v-for='(item, index) in finance' :key='index'>
          <div>{{item.group_title}}</div>
          <div>
            <span>表单所属时间：</span>
            <span>{{item.dates}}</span>
          </div>
          <div>
            <span>来源：</span>
            <span>{{item.company_name}}</span>
          </div>
          <div>{{item.create_time ? item.create_time.substring(0, item.create_time.indexOf('.')) : ''}}</div>
          <div>
            <span @click="handleFinanceInfo(item)">查看</span>
          </div>
        </li>
      </ul>
      <p v-if="finance.length === 0" class='finance_null'>暂无财务表单</p>
      <el-pagination @current-change="handlePage(e)"
        :page-size="5" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog
    :visible.sync="dialogVisibleFinance"
    width="45%"
    custom-class="business_info_modal"
    :title='FinanceInfo.title'
    :modal-append-to-body="false">
      <div style="margin-top: 30px; padding: 10px" v-html='FinanceInfo.info'></div>
    </el-dialog>
  </div>
</template>
<script>
import robot from '@/components/institution/area_app/asset/robot.vue'
// import ringAll from '@/components/public/ring-all'
export default {
  name: 'businessCard',
  components: {
    robot
  },
  props: {
    id: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      company: {},
      businessInformation: {},
      timezone: null,
      selTime: 0,
      FinanceInfo: {},
      dialogVisibleFinance: false,
      timeList: [
        {title: '总览', key: null},
        {title: '第一季度', key: '&time_zone=Q1'},
        {title: '第二季度', key: '&time_zone=Q2'},
        {title: '第三季度', key: '&time_zone=Q3'},
        {title: '第四季度', key: '&time_zone=Q4'},
        {title: '上半年', key: '&time_zone=Y1'},
        {title: '下半年', key: '&time_zone=Y2'},
        {title: '2018年', key: null}
      ],
      fives: ['商流：参与企业与人员', '资金流', '凭证流', '物流', '信息流'],
      nines: ['合同', '订单', '订金', '出货单', '运单', '验收入库单', '结算', '发票', '支付', '合同结算'],
      safeDiamoud: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      purDiamoud: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      sIocn: require('../../../../../../static/img/financing/diamond.png'),
      pIcon: require('../../../../../../static/img/financing/diamond-b.png'),
      disIcon: require('../../../../../../static/img/financing/diamond-d.png'),
      financeGroup: [],
      finance: [],
      selType: 0,
      selId: '',
      total: 0
    }
  },
  created () {
    const that = this
    that.$ajax.get(`/api/company/` + that.id + '?detail_info=1').then(res => {
      // 公司信息
      that.company = {
        logo: res.data.avatar,
        name: res.data.detail_info.name,
        legal_person: res.data.legal_person_info ? res.data.legal_person_info.name : '未填写',
        legal_person_phone: res.data.detail_info.contact_info ? res.data.detail_info.contact_info.phone : '未填写',
        legal_person_email: res.data.detail_info.contact_info ? res.data.detail_info.contact_info.email : '未填写',
        desc: res.data.detail_info.brief_introduction ? res.data.detail_info.brief_introduction.content : null
      }
      that.businessInformation = {
        // 企业名称
        name: res.data.detail_info.name,
        // 登记状态
        register_status: res.data.detail_info.business_information.register_status,
        // 统一社会信用代码
        social_security_reg_id: res.data.detail_info.business_information.credit_code,
        // 营业执照代码
        business_license_id: res.data.detail_info.certificates.business_license_id,
        // 注册资本
        register_money: res.data.detail_info.business_information.register_assets,
        // 营业期限
        operating_during: res.data.detail_info.business_information.term_end,
        // 注册资本
        register_outfit: res.data.detail_info.business_information.belong_org,
        // 核准日期
        sure_date: res.data.detail_info.business_information.check_date,
        // 成立日期
        found_date: res.data.detail_info.business_information.year_founded,
        // 行业
        industry: res.data.detail_info.industry_type,
        // 注销/吊销日期
        get_date: res.data.detail_info.business_information.term_end,
        // 经营范围
        scope: res.data.detail_info.business_information.scope,
        area: res.data.detail_info.area.province + ' ' + res.data.detail_info.area.city + ' ' + res.data.detail_info.area.region
      }
      this.companyInformation = res.data
    })
    // 获取财务信息
    that.$ajax.get(`/api/home_page/${that.id}/financial_situation/?page=1&page_size=5`).then(res => {
      console.log(res)
      that.finance = res.data.results
      that.total = res.data.count
    })
    // 获取全部财务信息分组
    that.$ajax.get(`/api/home_page/${that.id}/financial_situation_group/?business_id=${that.id}`).then(res => {
      console.log(res)
      let arr = res.data
      arr.unshift({title: '全部'})
      that.financeGroup = arr
    })
  },
  methods: {
    // 查看财务状况
    handleFinance (item, index) {
      const that = this
      if (item.id) {
        that.$ajax.get(`/api/home_page/` + that.id + `/financial_situation/` + '?page=' + 1 + '&page_size=' + 5 + '&group_id=' + item.id).then(res => {
          that.finance = res.data.results
          that.total = res.data.count
          this.selType = index
          that.selId = item.id
        })
      } else {
        // 获取财务信息
        that.$ajax.get(`/api/home_page/${that.id}/financial_situation/?page=1&page_size=5`).then(res => {
          console.log(res)
          that.finance = res.data.results
          that.total = res.data.count
          this.selType = index
        })
      }
    },
    // 查看财务详情
    handleFinanceInfo (item) {
      console.log(item)
      this.FinanceInfo = {info: item.body, title: item.group_title}
      this.dialogVisibleFinance = true
    },
    // 翻页
    handlePage (e) {
      const that = this
      if (this.selType === 0) {
        // 获取财务信息
        that.$ajax.get(`/api/home_page/${that.id}/financial_situation/?page=${e}&page_size=5`).then(res => {
          console.log(res)
          that.finance = res.data.results
          that.total = res.data.count
        })
      } else {
        that.$ajax.get(`/api/home_page/` + that.id + `/financial_situation/` + '?page=' + e + '&page_size=' + 5 + '&group_id=' + that.selId).then(res => {
          that.finance = res.data.results
          that.total = res.data.count
        })
      }
    },
    // 机器人
    handleTimeRobot (e, item, index) {
      this.timezone = item.key
      this.selTime = index
    }
  }
}
</script>
<style lang="less" scoped>
  .business_card {
    width: 1600px;
    padding: 30px 0;
    // height: 800px;
    background: #fdfdfd;
    .board_card {
      width: 1570px;
      margin: 0 auto;
      background: #fff;
      display: flex;
      padding: 20px 0;
      border: 1px solid #ddd;
      border-radius: 3px;
      .logo {
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        img {
          width: 80px;
          height: 80px;
        }
      }
      .show_title {
        width: calc(100% - 150px);
        font-size: 14px;
        p:first-child {
          line-height: 36px;
          font-size: 16px;
          font-weight: bold;
        }
        .legal_person {
          display: flex;
          div {
            display: flex;
            height: 36px;
            width: 33%;
            line-height: 36px;
          }
        }
        .business_desc {
          min-height: 26px;
          display: flex;
          span {
            width: 60px;
            line-height: 26px;
          }
          P {
            line-height: 26px;
            width: calc(100% - 80px);
          }
        }
      }
    }
    .section_title {
      padding: 0 20px;
      border-left: 4px solid #eb6100;
      width: 1570px;
      margin: 25px auto;
      line-height: 26px;
      color: #333;
    }
    .section_title_robot {
      padding-left: 20px;
      border-left: 4px solid #eb6100;
      width: 1570px;
      margin: 25px auto;
      line-height: 26px;
      color: #333;
      display: flex;
      justify-content: space-between;
      ul {
        display: flex;
        li {
          width: 95px;
          text-align: center;
          line-height: 24px;
          border: 1px solid #eb6100;
          margin-left: 10px;
          color: #eb6100;
          border-radius: 4px;
          cursor: pointer;
          transition: all .3s ease-in;
        }
        li.issel {
          background: #eb6100;
          color: #fff;
        }
        li:hover {
          background: #eb6100;
          color: #fff;
        }
      }
    }
    .information_card {
      width: 1570px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 3px;
      padding: 10px 0;
      .information_line {
        padding: 0 20px;
        display: flex;
        height: 40px;
        .information_item {
          width: 50%;
          line-height: 40px;
          font-size: 14px;
          display: flex;
          align-items: center;
          span:first-child {
            color: #666;
            width: 130px;
          }
          span:last-child {
            color: #333;
            width: calc(100% - 130px);
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span.null {
            color: #999;
          }
        }
      }
      .information_desc {
        display: flex;
        padding: 0 20px;
        min-height: 40px;
        font-size: 14px;
        span:first-child {
          width: 130px;
          color: #666;
          line-height: 40px;
        }
        p:last-child {
          line-height: 40px;
          width: calc(100% - 130px);
          padding: 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .robot_wrap {
      width: 1570px;
      background: #fff;
      margin: 0 auto;
      padding: 20px 0;
      border-radius: 3px;
      border: 1px solid #ddd;
    }
    .diamond_list {
      width: 1570px;
      background: #fff;
      margin: 0 auto;
      padding: 20px 10px;
      border-radius: 3px;
      border: 1px solid #ddd;
      position: relative;
      // overflow: hidden;
      height: 140px;
      .d_center {
        position: absolute;
        top: 24px;
        left: 589px;
        width: 100px;
        text-align: center;
        z-index: 3;
        img {
          width: 40px;
        }
        p {
          font-size: 14px;
          color: #333;
        }
      }
      &>.d_list:nth-of-type(2) {
        width: calc(50% - 50px);
        position: relative;
        .line {
          border-top: 2px dashed #eb6100;
          position: absolute;
          width: 100%;
          top: 18px;
          left: 0;
          z-index: 1;
        }
        ul {
          display: flex;
          width: 100%;
          position: absolute;
          z-index: 4;
          li {
            width: 10%;
            text-align: center;
            // width: 36px;
            font-size: 14px;
            color: #666;
            img {
              background: #fff;
            }
          }
          li:first-child {
            background: #fff;
          }
        }
      }
      &>.d_list:nth-of-type(3) {
        width: calc(50% - 50px);
        position: relative;
        .line {
          border-top: 2px dashed #53aefe;
          position: absolute;
          width: 100%;
          top: 18px;
          left: 0;
          z-index: 1;
        }
        ul {
          display: flex;
          width: 100%;
          position: absolute;
          z-index: 4;
          li {
            width: 10%;
            text-align: center;
            font-size: 14px;
            color: #666;
            img {
              background: #fff;
            }
          }
          li:last-child {
            background: #fff;
          }
        }
      }
    }
    .five_line {
      width: 1570px;
      margin: 0 auto;
      background: #fff;
      display: flex;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 3px;
      display: flex;
      justify-content: space-between;
      li {
        button {
          width: 155px;
          height: 36px;
          border: none;
          background: #eb6100;
          color: #fff;
          border: 1px solid #eb6100;
          border-radius: 3px;
          transition: all .13s ease-in;
        }
        button:hover {
          background: none;
          color: #eb6100;
        }
      }
    }
    .finance_list {
      width: 1570px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 3px;
      .finance_group_list {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-bottom: 10px;
          background: #f1f1f1;
          border-radius: 5px;
          width: 130px;
          text-align: center;
          height: 28px;
          font-size: 14px;
          color: #666;
          margin-right: 10px;
          cursor: pointer;
          line-height: 28px;
          transition: all .09s;
        }
        li.issel {
          background: #f48537;
          color: #fff;
        }
      }
      .finance_info_list {
        padding: 0 10px;
        margin-top: 16px;
        li {
          border-bottom: 1px dotted #eaeaea;
          display: flex;
          height: 36px;
          align-items: center;
          font-size: 14px;
          div {
            width: 25%;
            span:first-child {
              color: #8c8c8c;
            }
            span:last-child {
              color: #333;
            }
          }
          div:last-child {
            color: #999;
          }
        }
      }
      .finance_null {
        text-align: center;
        color: #999;
        line-height: 36px;
      }
    }
  }
</style>
