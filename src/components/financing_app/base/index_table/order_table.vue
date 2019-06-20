<template>
  <div class="inner_table">
    <div class='application_table'>
      <div class='table_title'>
        <div v-for="(item, index) in titles" :key='index'>{{item.title}}</div>
      </div>
      <div v-for="(financing, index) in financingList" :key='index' class="table_line">
        <div class="show_section">
          <span @click="handleSlide($event, index, 0)">{{financing.financing_id}}</span>
          <div v-if="showNumber === index.toString() + 0" class="card_wrap">
            <Idcard :id='financing.financing_id' />
          </div>
        </div>
        <div class='show_section'>
          <span>订单融资</span>
        </div>
        <div class='show_section' :style='showNumber === index.toString() + 2 ? "" : " text-align: center;"'>
          <span @click="handleSlide($event, index, 2)" :style="!financing.institution ? 'color: #999':''">{{financing.institution ? financing.institution : '点击选择金融机构'}}</span>
          <ul class="card_wrap" v-if="showNumber === index.toString() + 2" >
            <li v-for="(item, i) in financing.institution_list" :key='i' @click="handleChangeInstitution(index, i)">{{item.institution_name}}</li>
          </ul>
        </div>
        <div class='show_section'>
          <span>{{financing.loan_status ? financing.loan_status : '请选择金融机构'}}</span>
        </div>
        <!-- <div class='show_section'>
          <span>{{financing.expect_data}}</span>
        </div> -->
        <div class='show_section'>
          <span @click="handleSlide($event, index, 4)">{{financing.expect_data}}</span>
          <div class="card_wrap" v-if="showNumber === index.toString() + 4" style="left: -600px;">
            <Usagecard :id='financing.financing_id' />
          </div>
        </div>
        <div class="show_section">
          <span @click="handleSlide($event, index, 5)">{{financing.first_repayment}}</span>
          <span class='check' @click="handleSlide($event, index, 10)">{{financing.first_repayment_rate}}</span>
          <div class="card_wrap" v-if='showNumber === index.toString() + 5' style="left: -600px;">
            <First :id='financing.financing_id' />
          </div>
        </div>
        <div class="show_section">
          <span @click="handleSlide($event, index, 6)">{{financing.second_repayment}}</span>
          <span class='check' @click="handleSlide($event, index, 11)">{{financing.second_repayment_rate}}</span>
          <div class="card_wrap" v-if='showNumber === index.toString() + 6' style="left: -600px;">
            <Second :id='financing.financing_id' />
          </div>
        </div>
        <div class="show_section">
          <span @click="handleSlide($event, index, 7)" :style='financing.fund ? "" : "text-align: center; color: #999;"'>{{financing.fund ? financing.fund.name : '未助贷'}}</span>
          <span @click="handleSlide($event, index, 7)" v-if="financing.fund">{{financing.fund.rate ? Number(financing.fund.rate).toFixed(2) + '%' : '——'}}</span>
          <div class="card_wrap" v-if='showNumber === index.toString() + 7' style="left: -200px;">
            <Fund :id='financing.financing_id' />
          </div>
        </div>
        <div class="show_section">
          <span @click="handleSlide($event, index, 9)" :class="financing.file ? 'check' : 'null'">{{financing.file ? '已签署' : '未签署'}}</span>
        </div>
        <div v-if="selStatus === '2,3'">
          <span v-if="financing.loan_status !== '已中止'"  @click="handleDetail(financing)">查看</span>
          <span @click="handleRevoke(financing)">撤回</span>
        </div>
        <div v-if="selStatus === '1'">
          <span @click="handleRevoke(financing)">撤回</span>
        </div>
      </div>
      <div class="null_tip" v-if="financingList.length === 0">
        <img src="static/img/null-data.png" alt="">
        <p>暂无{{nullTip[selStatus]}}融资</p>
      </div>
    </div>
    <div class="pagenation">
      <el-pagination
        v-if="total > 7"
        layout="prev, pager, next"
        @current-change='handlePage'
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Idcard from '../table_card/id_card'
import Usagecard from '../table_card/usage_card'
import First from '../table_card/first_repayment_card'
import Second from '../table_card/second_repayment_card'
import Fund from '../table_card/fund_card'
export default {
  name: 'financingTable',
  components: {
    Idcard, Usagecard, First, Second, Fund
  },
  data () {
    return {
      titles: [
        {title: '融资编号', key: 'financing_id'},
        {title: '融资类型', key: 'financing_type'},
        {title: '申请机构', key: 'institution_list'},
        {title: '融资进度', key: 'loan_status'},
        // {title: '期望融资金额', key: 'expect_data'},
        {title: '融资用途', key: 'usage'},
        {title: '第一还款来源', key: 'first_repayment'},
        {title: '第二还款来源', key: 'second_repayment'},
        {title: '助贷机构', key: 'fund'},
        {title: '法人连带责任函', key: 'file'},
        {title: '操作'}
      ],
      nullTip: {
        "0": '已拒绝',
        "1": '申请中',
        "2,3": '处理中',
        "4": '已完成'
      },
      showWidth: 'width: 2200px',
      financingList: [],
      total: [],
      infoList: [],
      showNumber: '',
      total: ''
    }
  },
  props: {
    selStatus: {
      type: String,
      default: '1'
    }
  },
    created () {
      if (this.selStatus === '2,3' || this.selStatus === '1') {
        this.titles = [
          {title: '融资编号', key: 'financing_id'},
          {title: '融资类型', key: 'financing_type'},
          {title: '申请机构', key: 'institution_list'},
          {title: '融资进度', key: 'loan_status'},
          // {title: '期望融资金额', key: 'expect_data'},
          {title: '融资用途', key: 'usage'},
          {title: '第一还款来源', key: 'first_repayment'},
          {title: '第二还款来源', key: 'second_repayment'},
          {title: '助贷机构', key: 'fund'},
          {title: '法人连带责任函', key: 'file'},
          {title: '操作'}
        ]
        this.showWidth = 'width: 2200px'
      } else {
        this.titles = [
          {title: '融资编号', key: 'financing_id'},
          {title: '融资类型', key: 'financing_type'},
          {title: '申请机构', key: 'institution_list'},
          {title: '融资进度', key: 'loan_status'},
          // {title: '期望融资金额', key: 'expect_data'},
          {title: '融资用途', key: 'usage'},
          {title: '第一还款来源', key: 'first_repayment'},
          {title: '第二还款来源', key: 'second_repayment'},
          {title: '助贷机构', key: 'fund'},
          {title: '法人连带责任函', key: 'file'},
        ]
        this.showWidth = 'width: 2000px'
      }
      this.handleAjax(1, this.selStatus)
    },
  methods: {
    handleAjax (page, type, page_size) {
      const that = this
      let p = page || 1
      let pz = page_size || 7
      let sy = ``
      // ("0", "已中止"), ("1", "待处理"), ("2", "处理中"), ("3", "已放款"), ("4", "已结束")
      // ("0", "应收融资"), ("1", "订单融资"), ("2", "库存融资"), ("3", "贸易融资")
      this.$ajax.get(`/api/financing/application/?page=${p}&page_size=${pz}&status__in=${type}&type=1`).then(res => {
        let arr = []
        that.infoList = res.data.results
        res.data.results.forEach(val => {
          arr.push({
            financing_id: val.id,
            financing_type: val.type,
            institution_list: val.loan_process_info,
            // loan_status: val.status,
            expect_data: that.toThousands(val.expect_data.value),
            chain_id: val.application_data.chain_id,
            usage: that.handleSum(val.application_data.chain_info, false, 'usage'),
            first_repayment: that.handleSum(val.first_repayment, false, 'fir'),
            first_repayment_rate: that.handleRate(val.first_repayment),
            second_repayment: that.handleSum(val.second_repayment, 1),
            second_repayment_rate: that.handleRate(val.second_repayment),
            fund: val.is_helping ? {...val.fund_info, ...val.helping_data} : null,
            file: val.application_data.file,
            show_institution: false
          })
        })
        that.financingList = arr
        that.total = res.data.count
      })
    },
    // 计算总和
    handleSum (arr, key, title) {
      let s = 0
      if (key) {
        // 计算第二还款来源
        arr.forEach(val => {
          s += Number(val.amount)
        })
        return this.toThousands(s)
      } else {
        // 计算订单总额
        arr.forEach(val => {
          val.order.forEach(el => {
            s += Number(el.amount)
          })
        })
        return this.toThousands(s)
      }
    },
    // 计算平均逾期率
    handleRate (arr, key) {
      let s = 0
      if (arr.length !== 0) {
        arr.forEach(val => {
          s += val.over_rate.s_rate.over_rate
        })
        let rate = ((s / arr.length) * 100).toFixed(2)
        return rate + '%'
      } else {
        return '0.00%'
      }
    },
    // 修改下拉
    handleSlide (event, index, index1) {
      const that = this
      let tdList = document.getElementsByClassName('show_section')
      let tabDom = document.getElementsByClassName('inner_table')[0]
      for (let i = 0; i <= tdList.length - 1; i++) {
        tdList[i].style.background = 'none'
        tdList[i].style.color = '#333'
      }
      let showReg = [0, 2, 3, 4, 5, 6, 7, 8]
      let path = event.path || (event.composedPath && event.composedPath())
      if (showReg.includes(index1)) {
        if (this.showNumber === index.toString() + index1.toString()) {
          this.showNumber = null
          path[11].style.height = '100%'
          tabDom.style.height = 'auto'
        } else {
          let fatherEl = path[1]
          fatherEl.style.background = '#666'
          fatherEl.style.color = '#fff'
          this.showNumber = index.toString() + index1.toString()
          // index1 !== 3 && index1 !== 0 ? path[3].style.height = window.outerHeight + 1400 + 'px' : path[3].style.height = window.outerHeight + 2000 + 'px'
          // index1 !== 2 && index1 !== 7 ? tabDom.style.height = '1800px' : tabDom.style.height = '400px'
        }
      } else if (index1 === 9) {
        that.financingList[index].file ? window.open(that.$root_url() + that.financingList[index].file) : ''
      } else if (index1 === 10 || index1 === 11) {
        let el = that.infoList[index]
        let company = el.business
        let partner = []
        let item = []
        index1 === 10 ? item = el.first_repayment : item = el.second_repayment
        if (item.length !== 0) {
          item.forEach(val => {
            partner.push(val.partner_company)
          })
          let list = that.handleUnique(partner)
          window.open(`#/financing_app/order_list?company=${company}&partner=${list}&tar=s`)
        }
      }
    },
    // 选择当前金融机构
    handleChangeInstitution (index, i) {
      const that = this
      let financingList = that.financingList
      let current = financingList[index]
      let tdList = document.getElementsByClassName('show_section')
      for (let i = 0; i <= tdList.length - 1; i++) {
        tdList[i].style.background = 'none'
        tdList[i].style.color = '#333'
      }
      let path = event.path || (event.composedPath && event.composedPath())
      path[11].style.height = '100%'
      this.showNumber = null
      current.institution = current.institution_list[i].institution_name
      current.loan_status = current.institution_list[i].loan_process_status_display
      current.loan_id = current.institution_list[i].id
      current.is_revokable = current.institution_list[i].is_revokable
    },
    // 去重
    handleUnique (arr) {
      let s = []
      arr.forEach(val => {
        if (!s.includes(val)) {
          s.push(val)
        }
      })
      return s
    },
    // 翻页
    handlePage (e) {
      this.handleAjax(e, this.selStatus)
    },
    // 跳转详情
    handleDetail (loan) {
      const that = this
      if (loan.loan_id) {
        let query = {id: loan.loan_id}
        this.$router.push({
          path: '/financing_app/verify',
          query
        })
      } else {
        that.$message.warning('请选择金融企业')
      }
    },
    // 撤回融资
    handleRevoke (financing) {
      const that = this
      let str = ''
      if (!financing.loan_id) {
        that.$message.warning('请选择金融机构')
      } else {
        if (financing.is_revokable !== '1') {
          that.$message.warning('本次融资不可撤销')        
        } else {
          financing.institution_list.length === 1 ? str = '撤销后本次融资结束。' : str = '撤销后，该金融机构无法对继续您进行融资'
          that.$confirm(str, '撤销融资', {type: 'error'}).then(res => {
            that.$ajax.put(`/api/financing/loan_process/${financing.loan_id}/`, {loan_process_status: "000"}).then(res => {
              if (res.data) {
                that.$message.success('撤销成功')
                that.handleAjax(1, this.selStatus)
              }
            })
          })
        }
      }
    }
  },
  watch: {
    selStatus: function (n) {
      if (n === '2,3' || n === '1') {
        this.titles = [
          {title: '融资编号', key: 'financing_id'},
          {title: '融资类型', key: 'financing_type'},
          {title: '申请机构', key: 'institution_list'},
          {title: '融资进度', key: 'loan_status'},
          // {title: '期望融资金额', key: 'expect_data'},
          {title: '融资用途', key: 'usage'},
          {title: '第一还款来源', key: 'first_repayment'},
          {title: '第二还款来源', key: 'second_repayment'},
          {title: '助贷机构', key: 'fund'},
          {title: '法人连带责任函', key: 'file'},
          {title: '操作'}
        ]
        this.showWidth = 'width: 2200px'
      } else {
        this.titles = [
          {title: '融资编号', key: 'financing_id'},
          {title: '融资类型', key: 'financing_type'},
          {title: '申请机构', key: 'institution_list'},
          {title: '融资进度', key: 'loan_status'},
          // {title: '期望融资金额', key: 'expect_data'},
          {title: '融资用途', key: 'usage'},
          {title: '第一还款来源', key: 'first_repayment'},
          {title: '第二还款来源', key: 'second_repayment'},
          {title: '助贷机构', key: 'fund'},
          {title: '法人连带责任函', key: 'file'},
        ]
        this.showWidth = 'width: 2000px'
      }
      this.financingList = []
      this.total = 0
      let tabDom = document.getElementsByClassName('application_table')[0]
      this.showNumber = null
      // path[11].style.height = '100%'
      tabDom.style.height = 'auto'
      this.handleAjax(1, n)
    }
  }
}
</script>
<style lang="less" scoped>
.check {
  color: #eb6100;
  cursor: pointer;
  text-decoration: underline;
}
.null {
  color :#999;
  text-decoration: none;
}
.inner_table {
  background: #fff;
  padding-bottom: 30px;
  position: relative;
  margin-right: -170px;
  .application_table {
    border-bottom: none;
    font-size: 14px;
    margin-left: 30px;
    margin-right: 200px;
    .table_title {
      display: flex;
      border-bottom: 1px solid #dadada;
      background: rgb(250, 250, 250);
      margin-right: 30px;
      &>div {
        text-align: center;
        line-height: 48px;
        font-weight: bold;
        flex: 0 0 10%;
        border-bottom: 1px solid #dadada;
        background: rgb(250, 250, 250);
        .ns-truncate();
        color: #333;
      }
      &>div:last-child {
        border-right: none;
      }
      &>div:nth-of-type(6),div:nth-of-type(7),div:nth-of-type(8) {
        flex: 0 0 15%;  
      }
    }
    .table_line {
      display: flex;
      margin-right: 30px;
      border-bottom: 1px solid rgb(221, 221, 221);
      &>div {
        position: relative;
        font-size: 14px;
        color: #666;
        flex: 0 0 10%;
        background: #fff;
        line-height: 48px;
        span {
          display:  block;
          text-align: center;
          text-decoration: underline;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #eb6100;
          cursor: pointer;
        }
        ul {
          position: absolute;
          top: 40px;
          left: -80px;
          width: 400px;
          background: #F5F5F5;
          z-index: 3;
          min-height: 200px;
          padding: 10px 30px;
          border: 1px solid #dadada;
          li {
            height: 36px;
            margin-bottom: 15px;
            border: 1px solid #dadada;
            line-height: 36px;
            background: #fff;
            cursor: pointer;
            color: #333;
            padding: 0 10px;
            text-align: left;
          }
        }
        .card_wrap {
          position: absolute;
          top: 40px;
          z-index: 3;
          text-align: left;
        }
      }
      // &>div:nth-child(1) {
      //   max-width: 10%;
      //   flex: 0 0 10%;
      // }
      &>div:nth-child(2), &>div:nth-child(4) {
        span {
          color: #666;
        }
      }
      &>div:nth-child(3) {
        padding: 0 10px;
        text-align: left;        
      }
      &>div:nth-child(5) {
        padding: 0 10px;
        span {
          text-align: right;
        }
      }
      &>div:nth-child(6),&>div:nth-child(7),&>div:nth-child(8) {
        display: flex;
        flex: 0 0 15%;
        span {
          width: 100%;
          padding: 0 10px;
        }
        span:first-child {
          text-align: left;
        }
        span:first-child {
          text-align: right;
        }
      }
      &>div:nth-child(10) {
        text-align: center;
        span {
          display: inline;
          .check;
        }
      }
    }
    &>.null_tip {
      padding: 20px 0;
      // height: 240px;
      text-align: center;
      color: #999;
      border-bottom: 1px solid #eaeaea;
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
