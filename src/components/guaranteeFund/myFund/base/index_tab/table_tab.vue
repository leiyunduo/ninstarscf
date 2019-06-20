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
          <!-- 贷款信息 -->
          <div>
            <div class='show_section'>
              <span @click="handleDetail($event, index, 4)">查看</span>
              <!-- <i :style="`background: ${customerColor[item.name_list]}`"></i>
              <span @click="handleDetail($event, index, 4)">{{customerList[item.name_list]}}</span> -->
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
              <span @click="handleDetail($event, index, 9)" :style="item.file_url ? 'color: #666; cursor: pointer; text-decoration: underline' : 'color: #999'">{{item.file}}</span>
            </div>
          </div>
          <!-- 靠谱系数 -->
          <!-- <div>
            <div class='show_section'>
              <span>{{item.rate}}</span>
            </div>
          </div> -->
          <!-- 操作 -->
        </div>
        <div class="diamond" :style='viewWidth'>
          <financing-ring :id='item.financing_id' />
        </div>
      </div>
      <div v-if="showList.length === 0" class="null_application">
        <img src="static/img/null-data.png" alt="">
        <p>暂无助贷申请</p>
      </div>
    </div>
    <div class="pagenation" v-if="total > 5">
      <el-pagination
        layout="prev, pager, next"
        :page-size='5'
        @current-change='handlePage'
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
import financingRing from '../ring.vue'
export default {
  name: 'application',
  components: {
    idCard, usageCard, firstCard, secondCard, customerCard, fundCard, businessCard, financingRing
  },
  data () {
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
        {title: '贷款信息', key: 'name_list'},
        {title: '资金用途（元）', key: 'usage'},
        {title: '第一还款来源（元）', key: 'first_repayment'},
        {title: '历史逾期率', key: 'first_repayment_rate'},
        {title: '第二还款来源（元）', key: 'second_repayment'},
        {title: '历史逾期率', key: 'second_repayment_rate'},
        {title: '助贷增信（元）', key: 'fund'},
        {title: '法人连带责任函', key: 'file'}
      ],
      showList: [],
      infoList: [],
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
        {title: '助贷已结束', color: '#228B22'}
      ],
      viewWidth: `width: ${document.body.clientWidth - 174 + 'px'}`,
      diamondList: ['销售', '销售出货', '销售运输', '销售验收', '销售结算', '采购', '采购运输', '采购验收', '采购结算']
    }
  },
  props: {
    selStatus: {
      type: String,
      default: ''
    }
  },
  created () {
    this.handleAjax(1, this.selStatus)
  },
  methods: {
    handleAjax (page, status, ps) {
      const that = this
      let p = page || 1
      let pz = ps || 5
      let sy = ''
      // this.$ajax.get(`/api/financing/loan_process/?is_active=0&loan_process_status__in=${'102,202,302,402'}&page=${page}&page_size=${pz}&type=${sy}`)
      // this.$ajax.get(`/api/financing/loan_process/?is_active=1&loan_process_status=100&page=${page}&page_size=${pz}&type=${sy}`)
      // 融资列表
      that.$ajax.get('/api/financing/application/?type=1&' + 'page=' + p + '&page_size=' + pz + '&helping_status__in=' + status).then(res => {
        let showList = []
        console.log('get', p)
        console.log(res)
        res.data.results.forEach(val => {
          showList.push({
            // mock
            id: val.id,
            financing_id: (val.id).toString(),
            type: val.type,
            business: val.business,
            business_name: val.business_info.name,
            name_list: {},
            fund: (val.helping_status !== '0' && val.helping_status !== '2' && val.helping_status !== '8') ? Number(val.helping_data.value).toFixed(2) : that.fundList[val.helping_status].title,
            fund_rate: (val.helping_status !== '0' && val.helping_status !== '2' && val.helping_status !== '8') ? val.helping_data.rate : false,
            rate: '0',
            file: val.application_data.file ? '已签署' : '未签署',
            file_url: val.application_data.file,
            usage: val.expect_data.value,
            first_repayment: that.handleSum(val.first_repayment),
            second_repayment: that.handleTicket(val.second_repayment),
            first_repayment_rate: val.first_repayment[0].over_rate ? (Number(val.first_repayment[0].over_rate.s_rate.over_rate) * 100).toFixed(1) + '%' : '0.0%',
            second_repayment_rate: that.handleOver(val.second_repayment)
          })
        })
        console.log(res.data.results)
        this.showList = showList
        this.total = res.data.count
        this.infoList = res.data.results
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
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
    },
    handleWidth () {
      // console.log(document.body.clientWidth)
      // let w = document.body.clientWidth - 174 + 'px'
      return `width: ${document.body.clientWidth - 174 + 'px'}`
    },
    // 翻页
    handlePage (e) {
      this.handleAjax(e, this.selStatus)
    },
    // 跳转链式记账
    // handleChain (el, item) {
    //   let query = {}
    //   let path = '/credit_app/chain_info'
    //   query.id = el.chain_id
    //   let str = ''
    //   el.id_list.forEach(val => {
    //     str += `${val},`
    //   })
    //   query.id_list = str.substring(0, str.length - 1)
    //   query.financing_id = this.$route.query.financing_id
    //   // this.$router.push({path, query})
    //   window.open(`#/credit_app/chain_info?id=${query.id}&id_list=${query.id_list}&financing_id=${item.id}`)
    // },
    //
    handleDetail (event, index, index1) {
      const that = this
      let tdList = document.getElementsByClassName('show_section')
      for (let i = 0; i <= tdList.length - 1; i++) {
        tdList[i].style.background = 'none'
        tdList[i].style.color = '#333'
      }
      let showReg = [0, 2, 3, 4, 5, 6, 7, 8]
      let path = event.path || (event.composedPath && event.composedPath())
      // console.log(path[11].style)
      if (showReg.includes(index1)) {
        if (this.showNumber === index.toString() + index1.toString()) {
          this.showNumber = null
          path[11].style.height = '100%'
        } else {
          let fatherEl = path[1]
          fatherEl.style.background = '#666'
          fatherEl.style.color = '#fff'
          this.showNumber = index.toString() + index1.toString()
          index1 !== 3 && index1 !== 0 ? path[11].style.height = window.outerHeight + 1400 + 'px' : path[11].style.height = window.outerHeight + 2000 + 'px'
        }
      } else if (index1 === 9) {
        that.showList[index].file_url ? window.open(that.$root_url() + that.showList[index].file_url) : ''
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
          window.open(`#/myFund/order_list?company=${company}&partner=${list}&tar=s`)
        }
      }
    },
    // 计算逾期率平均值
    handleOver (arr) {
      // console.log(arr)
      if (arr.length !== 0) {
        let s = 0
        arr.forEach(val => {
          if (val.over_rate) {
            s += val.over_rate.s_rate.over_rate
            // console.log(s)
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
    }
  },
  watch: {
    selStatus: function (nw, old) {
      this.handleAjax(1, nw)
    }
  }
}
</script>

<style lang="less" scoped>
.assetsList {
  .bottom_list {
    position: relative;
    border-bottom: none;
    min-width:100%;
    margin-bottom: 21px;
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
        border-right: 1px solid #eaeaea;
        font-weight: bold;
        width: 200px;
      }
      &>div:nth-child(2), &>div:nth-child(4) {
        width: 140px;
      }
      &>div:nth-child(3) {
        padding: 0 10px;
      }
      &>div:nth-child(6), &>div:nth-child(8), &>div:nth-child(10) {
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
        border: none;
      }
    }
    .table_line {
      border-bottom: 1px solid #eaeaea;
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
        }
        .show_tab {
          // width: 800px;
          position: absolute;
          top: 45px;
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
          i {
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
          }
        }
      }
      &>div:nth-child(3) {
        .show_section {
          text-align: left;
          padding: 0 10px;
        }
      }
      &>div:first-child, &>div:nth-child(3), &>div:nth-child(4), &>div:nth-child(5), &>div:nth-child(6), &>div:nth-child(7), &>div:nth-child(8), &>div:nth-child(9), &>div:nth-child(10) {
        .show_section {
          span {
            text-decoration: underline;
            cursor: pointer;
            transition: all 0.1s ease-in-out;
          }
          span:hover {
            color: #eb6100;
          }
        }
      }
      // &>div:first-child:hover, &>div:nth-child(3):hover, &>div:nth-child(4):hover, &>div:nth-child(5):hover, &>div:nth-child(6):hover, &>div:nth-child(7):hover, &>div:nth-child(8):hover, &>div:nth-child(9):hover, &>div:nth-child(10):hover {
      //   .show_section {
      //     span {
      //       color: #eb6100;
      //     }
      //   }
      // }
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
      &>div:last-child{
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
