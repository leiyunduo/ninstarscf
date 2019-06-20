<template>
  <div class="assetsList">
    <div class="bottom_list">
      <div class="slide_title">
        <div v-for="(item, index) in slideTitle" :key='index'>{{item.title}}</div>
      </div>
      <div class="table_line" v-for="(item, index) in showList" :key='index'>
        <div class='slide_info'>
          <!-- 融资场景 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 0)">{{item.id}}</span>
            </div>
            <div class='show_tab' v-if="showNumber === index.toString() + 0">
              <idCard :id='item.financing_id' />
            </div>
          </div>
          <!-- 融资类型 -->
          <div>
            <div class='show_section'>
              <span>{{typeList[item.type]}}</span>
            </div>
          </div>
          <!-- 申请企业 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 3)">{{item.business_name}}</span>
            </div>
            <div class='show_tab' v-if="showNumber === index.toString() + 3" style="left: -100px;">
              <businessCard :id='item.business' />
            </div>
          </div>
          <!-- 授信登记 -->
          <div>
            <div class='show_section'>
              <i :style="`background: ${customerColor[item.name_list]}`"></i>
              <span @click="handleDetail($event, index, 4)">{{customerList[item.name_list]}}</span>
            </div>
            <div class='show_tab' v-if="showNumber === index.toString() + 4">
              <customerCard :id='item.financing_id' />
            </div>
          </div>
          <!-- 资金用途 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 5)">{{toThousands(item.usage)}}</span>
            </div>
            <div class='show_tab' v-if="showNumber === index.toString() + 5" style="left: -400px;">
              <usageCard :id='item.financing_id' />
            </div>
          </div>
          <!-- 第一还款来源 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 6)">{{toThousands(item.first_repayment)}}</span>
            </div>
            <div class='show_tab' v-if="showNumber === index.toString() + 6" style="left: -600px;">
              <firstCard :id='item.financing_id' />
            </div>
          </div>
          <!-- 第一还款来源逾期率 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 10)">{{item.first_repayment_rate}}</span>
            </div>
            <div class='show_tab' v-if="showNumber === index.toString() + 10" style="left: -200px;">
              <firstCard :id='item.financing_id' />
            </div>
          </div>        
          <!-- 第二还款来源 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 7)">{{toThousands(item.second_repayment)}}</span>
            </div>
            <div class='show_tab' v-if="showNumber === index.toString() + 7" style="left: -700px;">
              <secondCard :id='item.financing_id' />
            </div>
          </div>
          <!-- 第二还款来源逾期率 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 11)">{{item.second_repayment_rate}}</span>
            </div>
          </div>
          <!-- 助贷基金 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 8)" v-if="item.fund_rate">{{item.fund_rate + '%'}}</span>
              <span @click="handleDetail($event, index, 8)" :style="item.fund !== '未助贷' ? '' : 'color: #999; text-decoration: none'">{{isNaN(item.fund) ? item.fund : toThousands(item.fund)}}</span>
            </div>
            <div class='show_tab' v-if="showNumber === index.toString() + 8"  style="left: -450px;">
              <fundCard :id='item.financing_id' />
            </div>
          </div>
          <!-- 无限法人连带责任函 -->
          <div>
            <div class='show_section'>
              <span :style="item.file_url ? 'color: #228B22; cursor: pointer; text-decoration: underline;' : 'color: #ff0100;'" @click="handleDetail($event, index, 9)">{{item.file}}</span>
            </div>
          </div>
          <!-- 贷款利率 -->
          <div>
            <div class='show_section'>
              <span>{{item.rate}}</span>
            </div>
          </div>
          <!-- 操作 -->
          <div>
            <div class='show_section'>
              <span @click="handlePreview(item.financing_id)">查看</span>
            </div>
          </div>
        </div>
        <div class="diamond" :style='viewWidth'>
          <financing-ring :id='item.financing_id'></financing-ring>
          <!-- <div class="diamond-title"> 
            <span>等级</span>
            <span>{{calc(item.diamond) === 0 ? '无' : calc(item.diamond) + '级'}}</span>
          </div>
          <div class="diamond-content">
            <span class="diamond-content__cutline"></span>
            <div class="diamond-group">
              <div  v-for="(_dia, i) in item.diamond" :key="i" class="diamond-group__item" :class="i===1 ? '': ''">
                <img v-if="i===0" src="static/img/chain/zuan_o.png" alt="">
                <img v-else-if="i === 1"  :src="i === 1 ? 'static/img/chain/zuanshan.gif': ''" alt="">
                <img v-else-if="i === 5" src="static/img/chain/zuan_b.png" alt="">
                <img v-else-if="i === 6"  :src="i === 6 ? 'static/img/chain/zuanshan.gif': ''" alt="">
                <img v-else src="static/img/chain/zuan_g.png" alt="">
                <p>{{diamondList[i]}}</p>
              </div>       
            </div>
          </div> -->
        </div>
      </div>
      <div v-if="showList.length === 0" class="null_application">
        <img src="static/img/null-data.png" alt="">
        <p>暂无已还款的融资</p>
      </div>
    </div>
    <div class="pagenation" v-if="total > 5">
      <el-pagination
        layout="prev, pager, next"
        @current-change='handlePage'
        :page-size="5"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import idCard from '../table_card/id_card'
import usageCard from '../table_card/usage_card'
import firstCard from '../table_card/first_card'
import secondCard from '../table_card/second_card'
import customerCard from '../table_card/customer_card'
import fundCard from '../table_card/fund_card'
import businessCard from '../table_card/business_card'
import financingRing from '../ring'
export default {
  name: 'prosess',
  components: { idCard, usageCard, firstCard, secondCard, customerCard, fundCard, businessCard, financingRing },
  data() {
    return {
      URL: this.$root_url(),
      showNumber: null,
      typeList: ['应收融资', '订单融资'],
      customerList: ['未授信', '白名单', '黄名单', '黑名单'],
      customerColor: ['#ff0010', 'rgba(0, 0, 0, .25)', '#bfbfbf', '#333'],
      slideTitle: [
        {title: '融资编号', key: 'id'},
        {title: '融资类型', key: 'type'},
        {title: '申请企业', key: 'business_name'},
        {title: '授信登记', key: 'name_list'},
        {title: '资金用途（元）', key: 'usage'},
        {title: '第一还款来源（元）', key: 'first_repayment'},
        {title: '历史逾期率', key: 'first_repayment_rate'},
        {title: '第二还款来源（元）', key: 'second_repayment'},
        {title: '历史逾期率', key: 'second_repayment_rate'},
        {title: '助贷增信（元）', key: 'fund'},
        {title: '法人连带责任函', key: 'file'},
        {title: '贷款利率', key: 'rate'},
        {title: '操作', key: 'operate'}
      ],
      showList: [],
      infoList: [],
      diamondList: ['销售', '销售出货', '销售运输', '销售验收', '销售结算', '采购', '采购运输', '采购验收', '采购结算'],
      viewWidth: `width: ${document.body.clientWidth - 161 + 'px'}`,
      total: 0,
      fundList: [
        {title: '审核中', color: '#eb6100'},
        {title: '助贷中', color: '#228B22'},
        {title: '已拒绝', color: '#ff0010'},
        {title: '赔付申请中', color: '#eb6100'},
        {title: '同意赔付', color: '#228B22'},
        {title: '拒绝赔付', color: '#ff0010'},
        {title: '企业已上传还款信息', color: '#eb6100'},
        {},
        {title: '无赔付助贷结束', color: '#228B22'},
        {title: '助贷已结束', color: '#228B22'},
        {title: '未助贷', color: '#999'}
      ]
    }
  },
  props: {
    selType: {
      type: String,
      default: '0'
    }
  },
  created () {
    this.handleAjax(1)
  },
  methods: {
    handleAjax (page, page_size, type) {
      const that = this
      let sy = ``
      if (type === '0') {
      } else if (type === '1') {
        sy = `&financing_application__type=0`
      } else if (type === '2') {
        sy = `&financing_application__type=1`
      }
      let p = page || 1
      let pz = page_size || 5
      // this.$ajax.get(`/api/financing/loan_process/?is_active=1&loan_process_status=702&page=${page}&page_size=${pz}${sy}`)
      // this.$ajax.get(`/api/financing/loan_process/?is_active=1&loan_process_status__in=${'200,201,300,301,400,401,500,501,502'}&page=${page}&page_size=${pz}${sy}`)
      this.$ajax.get(`/api/financing/loan_process/?is_active=1&loan_process_status=702&page=${page}&page_size=${pz}&financing_application__type=1`).then(res => {
        if (res.status === 200) {
          // that.tableData = res.data.results
          let showList = []
          let d = [1, 0, 0, 0, 0, 1, 0, 0, 0]
          res.data.results.forEach(val => {
            !val.financing_application.is_helping ? val.financing_application.helping_status = '10' : ''
            showList.push({
              diamond: d,
              id: val.financing_application.id,
              financing_id: (val.id).toString(),
              type: val.financing_application.type, 
              business: val.financing_application.business,
              business_name: val.financing_application.business_info.name,
              name_list: val.customer_info.group,
              file: val.financing_application.application_data.file ? '已签署' : '未签署',
              file_url: val.financing_application.application_data.file,
              usage: val.financing_application.expect_data.value,
              fund: (val.financing_application.helping_status !== '0' && val.financing_application.helping_status !== '2' && val.financing_application.helping_status !== '10' && val.financing_application.helping_status !== '8') ? Number(val.financing_application.helping_data.value).toFixed(2) : that.fundList[val.financing_application.helping_status].title,
              fund_rate: (val.financing_application.helping_status !== '0' && val.financing_application.helping_status !== '2' && val.financing_application.helping_status !== '10' && val.financing_application.helping_status !== '8') ? val.financing_application.helping_data.rate : false,
              first_repayment: that.handleSum(val.financing_application.first_repayment),
              second_repayment: that.handleTicket(val.financing_application.second_repayment),
              loan_process_status: val.loan_process_status,
              first_repayment_rate: val.financing_application.first_repayment ? (Number(val.financing_application.first_repayment[0].over_rate.s_rate.over_rate) * 100).toFixed(1) + '%' : '0.0%',
              second_repayment_rate: that.handleOver(val.financing_application.second_repayment),
              rate: val.repayment_rate ? Number(val.repayment_rate).toFixed(3) + '%' : (val.loan_info ? val.loan_info.expect_rate.toFixed(3) + '%' : '未填写')
              // rate: (100 - (Number.parseFloat(first_repayment_rate) + Number.parseFloat(second_repayment_rate))).toFixed(1)
            })
          })
          this.showList = showList
          this.total = res.data.count
          this.infoList = res.data.results
        }
      })
    },
    // 格式化时间戳
    handleTime (str) {
      let time = ''
      str ? time = str.substr(0, str.indexOf('T')) : time = ''
      return time
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
      return s.toFixed(2)
    },
    // 求和公示2
    handleTicket (arr) {
      let s = 0
      arr.forEach(val => {
        s += Number(val.amount)
      })
      return s.toFixed(2)
    },
    // 查看各项指标详细数据
    handleCheck (i, item) {
      const URLList = ['', '/credit_app/usage', '/credit_app/loac_aid', '/credit_app/first_repayment', '/credit_app/second_repayment']
      let query = {}
      if (i === 3) {
        query.chain_id = item.first_repayment[0].chain_id
        query.financing_application_id = item.financing_application.id
      } else {
        query.financing_id = item.id
      }
      const {href} = this.$router.resolve({
        path: URLList[i],
        query
      })
      window.open(href, '_blank')
    },
    // 预览PDF
    handlePreview (id) {
      this.$router.push({
        path: '/credit_app/credit_detail',
        query: {
          id,
          sq: 2
        }
      })
    },
    // 跳转链式记账
    handleChain (el, item) {
      let query = {}
      let path = '/credit_app/chain_info'
      query.id = el.chain_id
      let str = ''
      el.id_list.forEach(val => {
        str += `${val},`
      })
      query.id_list = str.substring(0, str.length - 1)
      query.financing_id = this.$route.query.financing_id
      // this.$router.push({path, query})
      window.open(`#/credit_app/chain_info?id=${query.id}&id_list=${query.id_list}&financing_id=${item.id}`)
    },
    // 查看企业博客
    handleBusiness (item) {
      window.open('#/enterpriseBlog?bid=' + item.business)
    },
    handleChainSel (item) {
      let str = ''
      item.chain_type === 2 ? str = '#/credit_app/chain_info?id=' : str = '#/credit_app/chain_info?id='
      window.open(str + item.chain_id)
    },
    handlePage (e) {
      this.handleAjax(e, 5, this.selType)
    },
    handleDetail (event, index, index1) {
      const that = this
      let tdList = document.getElementsByClassName('show_section')
      for (let i = 0; i <= tdList.length - 1; i++) {
        tdList[i].style.background = '#fff'
        tdList[i].style.color = '#333'
      }
      let showReg = [0, 2, 3, 4, 5, 6, 7, 8]
      if (showReg.includes(index1)) {
        let path = event.path || (event.composedPath && event.composedPath())
        if (this.showNumber === index.toString() + index1.toString()) {
          this.showNumber = null
          path[11].style.height = '100%'
        } else {
          let fatherEl = path[1]
          fatherEl.style.background = '#666'
          fatherEl.style.color = '#fff'
          this.showNumber = index.toString() + index1.toString()
          index1 !== 3 && index1 !== 0 ? path[11].style.height = window.outerHeight + 1400 + 'px' : path[11].style.height = window.outerHeight + 4000 + 'px'
        }
      } else if (index1 === 9) {
        that.showList[index].file_url ? window.open(that.$root_url() + that.showList[index].file_url) : ''
      } else if (index1 === 10 || index1 === 11) {
        let el = that.infoList[index]
        let company = el.financing_application.business
        let partner = []
        let item = []
        index1 === 10 ? item = el.financing_application.first_repayment : item = el.financing_application.second_repayment
        if (item.length !== 0) {
          item.forEach(val => {
            partner.push(val.partner_company)
          })
          let list = that.handleUnique(partner)
          window.open(`#/credit_app/order_list?company=${company}&partner=${list}&tar=s`)
        }
      }
    },
    // 计算逾期率平均值
    handleOver (arr) {
      if (arr.length !== 0) {
        let s = 0
        arr.forEach(val => {
          if (val.over_rate) {
            s += val.over_rate.s_rate.over_rate
          }
        })
        let r = s / arr.length * 100
        return r.toFixed(1) + '%'
      } else {
        return '0.0%'
      }
    },
    handleUnique (arr) {
      let s = []
      arr.forEach(val => {
        if (!s.includes(val)) {
          s.push(val)
        }
      })
      return s
    },
    handleWidth () {
      // console.log(document.body.clientWidth)
      let w = document.body.clientWidth - 174 + 'px'
      return `width: ${w}`
    },
    // 计算
    calc (list) {
      let _count = 0
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (list[i]) {
            _count++
          }
        }
      }
      return _count
    }
  },
  watch: {
    selType: function (nw, old) {
      this.handleAjax(1)
    }
  }
}
</script>

<style lang="less" scoped>
.assetsList {
  background: #fff;
  .bottom_list {
    position: relative;
    // border: 1px solid #e1e6f0;
    border-bottom: none;
    min-width:100%;
    margin-bottom: 21px;
    // min-height: 457px;
    .slide_title {
      // width: 100%;
      display: flex;
      background: #FAFAFA;
      border-bottom: 1px solid #e8e8e8;
      div {
        // width: calc(100% / 11);
        font-size: 14px;
        color: #333;
        text-align: center;
        line-height: 40px;
        font-weight: bold;
        width: 200px;
        border-right: 1px solid #e8e8e8;
      }
      &>div:nth-child(2), &>div:nth-child(4) {
        width: 140px;
      }
      &>div:nth-child(6), &>div:nth-child(8) {
        padding: 0 10px;
        text-align: right;
      }
      &>div:nth-child(6), &>div:nth-child(8) {
        border: none;
      }
      &>div:nth-child(6), &>div:nth-child(7), &>div:nth-child(8), &>div:nth-child(9) {
        width: 160px;
      }
      &>div:nth-child(10) {
        width: 240px;
        text-align: center;
      }
      div:last-child {
        border-right: none;
      }
    }    
    .table_line {
      border-bottom: 1px solid #e8e8e8;
      background: #fff;
    }
    .slide_info {
      display: flex;
      &>div {
        // width: calc(100% / 11);
        // overflow: hidden;
        position: relative;
        .show_section {
          font-size: 14px;
          text-align: center;
          width: 200px;
          line-height: 45px;
          border-right: 1px solid #eaeaea;
          border-bottom: 1px solid #eaeaea;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          background: #fff;
        }
        .show_tab {
          // width: 800px;
          position: absolute;
          top: 38px;
          // height: 400px;
          // border: 1px solid red;
          background: #fff;
          z-index: 3;
        }
      }
      &>div:first-child {
        .show_section {
          padding: 0 5px;
        }
      }
      &>div:nth-child(2), &>div:nth-child(4) {
        .show_section {
          width: 140px;
        }
      } 
      &>div:nth-child(3) {
        .show_section {
          text-align: left;
          padding: 0 10px;
        }
      }
      &>div:nth-child(4) {
        .show_section {
          i {
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
      }
      &>div:first-child, &>div:nth-child(3), &>div:nth-child(4), &>div:nth-child(5), &>div:nth-child(6), &>div:nth-child(7), &>div:nth-child(8), &>div:nth-child(9), &>div:nth-child(10) {
        .show_section {
          span {
            text-decoration: underline;
            cursor: pointer;
            transition: all .1s ease-in-out;
          }
          span:hover {
            color: #eb6100;
          }
        }
      }
      &>div:nth-child(5), &>div:nth-child(6), &>div:nth-child(8), &>div:nth-child(10) {
        .show_section {
          padding: 0 10px;
          text-align: right;
        }
      }
      &>div:nth-child(6), &>div:nth-child(8) {
        .show_section {
          border-right: none;
        }
      }
      &>div:nth-child(6), &>div:nth-child(7), &>div:nth-child(8), &>div:nth-child(9) {
        .show_section {
          width: 160px;
        }
      }
      &>div:nth-child(10) {
        .show_section {
          width: 240px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            width: 100%;
          }
          span:first-child {
            text-align: center;
          }
          span:nth-child(2) {
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }      
      &>div:last-child {
        .show_section {
          border-right: none;
          span {
            cursor: pointer;
            margin: 0 8px;
            color: #eb6100;
            text-decoration: underline;
          }
        }
      }      
    }
    .diamond {
      // height: 110px;
      width: 1280px;
      background: #fff;
      // overflow: hidden;
      .diamond-title {
        padding: 8px 10px;
        font-size: 14px;
        span {
          color: #333333;
          font-weight: bolder;
          margin: 0 20px 0 10px;
        }
      }
      .diamond-content {
        margin-top: 10px;
        position: relative;
        .diamond-content__cutline {
          width: 90%;
          position: absolute;
          border: 1px dashed #e1e6f0;
          display: block;
          left: 5%;
          top: 8px;
        }
        .diamond-group {
          display: flex;
          justify-content: space-between;
          .diamond-group__item {
            flex: 1;
            text-align: center;
            img {
              position: relative;
              top: -10px;
              &.warning {
                position: relative;
                top: -13px;
                z-index: 1;
                animation: diamonLight 1.5s ease-in-out 0s infinite;
                -moz-animation: diamonLight 1.5s ease-in-out 0s infinite;
                -webkit-animation: diamonLight 1.5s ease-in-out 0s infinite;
              }
            }
            p {
              color: #666;
              font-size: 14px;
              margin-top: -18px;
            }
          }
        }
        @keyframes diamonLight {
          0%{
            opacity: 0;
            transform: scale(1)
          }
          100%{
            opacity: 1;
            transform: scale(1.05)
          }
        }
      }
    }
    .null_application {
      width: 1750px;
      text-align: center;
      // position: relative;
      padding-top: 50px;
      border-bottom: 1px solid #e1e6f0;
      background: #fff;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      p {
        // position: absolute;
        // top: 195px;
        // left: 784px;
        text-align: center;
        line-height: 40px;
        text-align: center;
        color: #8a8a8a;
        // font-weight: bold;
        // border-bottom: 1px solid #e1e6f0;
        font-size: 16px;
        text-decoration: none;
      }
    }
  }
  div.pagenation {
    background: #fff;
    padding: 20px 0;
    border: none;
    box-shadow: none;
    border-radius:0px;
  }
}
</style>
