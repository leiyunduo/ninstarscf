<template>
  <div class="assetsList">
    <div class="bottom_list">
      <div class="slide_title">
        <div v-for="(item, index) in slideTitle" :key='index'>{{item.title}}</div>
      </div>
      <div class='slide_info' v-for="(item, index) in showList" :key='index'>
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
            <span @click="handleDetail($event, index, 4)">{{customerList[item.name_list]}}</span>
          </div>
          <div class='show_tab' v-if="showNumber === index.toString() + 4">
            <customerCard :id='item.financing_id' />
          </div>
        </div>
        <!-- 资金用途 -->
        <div>
          <div class='show_section'>
            <span @click="handleDetail($event, index, 5)">{{item.usage}}</span>
          </div>
          <div class='show_tab' v-if="showNumber === index.toString() + 5">
            <usageCard :id='item.financing_id' />
          </div>
        </div>
        <!-- 第一还款来源 -->
        <div>
          <div class='show_section'>
            <span @click="handleDetail($event, index, 6)">{{item.first_repayment}}</span>
          </div>
          <div class='show_tab' v-if="showNumber === index.toString() + 6" style="left: -200px;">
            <firstCard :id='item.financing_id' />
          </div>
        </div>
        <!-- 第二还款来源 -->
        <div>
          <div class='show_section'>
            <span @click="handleDetail($event, index, 7)">{{item.second_repayment}}</span>
          </div>
          <div class='show_tab' v-if="showNumber === index.toString() + 7" style="left: -700px;">
            <secondCard :id='item.financing_id' />
          </div>
        </div>
        <!-- 助贷基金 -->
        <div>
          <div class='show_section'>
            <span @click="handleDetail($event, index, 8)">{{item.fund}}</span>
          </div>
          <div class='show_tab' v-if="showNumber === index.toString() + 8"  style="left: -200px;">
            <fundCard :id='item.financing_id' />
          </div>
        </div>
        <!-- 无限法人连带责任函 -->
        <div>
          <div class='show_section'>
            <span @click="handleDetail($event, index, 9)">{{item.file}}</span>
          </div>
        </div>
        <!-- 靠谱系数 -->
        <div>
          <div class='show_section'>
            <span>{{item.rate}}</span>
          </div>
        </div>
        <!-- 操作 -->
        <div>
          <div class='show_section'>
            <span @click="handlePass(item.financing_id)">同意</span>
            <span @click="handleRefuse(item.financing_id)">拒绝</span>
          </div>
        </div>
      </div>
      <div v-if="showList.length === 0" class="null_application">
        <img src="static/img/null-data.png" alt="">
        <p>暂无融资申请</p>
      </div>      
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
export default {
  name: 'application',
  data() {
    return {
      showList: [],
      fundList: [
        {title: '审核中', color: '#eb6100'}, 
        {title: '助贷中', color: 'green'}, 
        {title: '已拒绝', color: '#ff0010'},
        {title: '赔付申请中', color: '#eb6100'},
        {title: '同意赔付', color: 'green'},
        {title: '拒绝赔付', color: '#ff0010'},
        {title: '企业已上传还款信息', color: '#eb6100'},
        {},
        {title: '无赔付助贷结束', color: 'green'},
        {title: '助贷已结束', color: 'green'}
      ],
      total: 0
    }
  },
  props: {
    selType: {
      type: String,
      default: '0'
    }
  },
  created () {
    console.log(this.selType)
    this.handleAjax(1, this.selType)
  },
  methods: {
    handleAjax (page, type, page_size) {
      const that = this
      let p = page || 1
      let pz = page_size || 5
      // let st = ''
      // if (status === 0) {
      //   st = 1
      // } else if (status === 1) {
      //   st = 2
      // } else if (status === 2) {
      //   st = 0
      // }
      let sy = ``
      if (type === '0') {
      } else if (type === '1') {
        sy = `&financing_application__type=0`
      } else if (type === '2') {
        sy = `&financing_application__type=1`
      }
      // ("0", "已中止"), ("1", "待处理"), ("2", "处理中"), ("3", "已放款"), ("4", "已结束")
      // ("0", "应收融资"), ("1", "订单融资"), ("2", "库存融资"), ("3", "贸易融资")
      this.$ajax.get(`/api/financing/application/?page=${p}&page_size=${pz}&status=1${sy}`).then(res => {
        if (res.status === 200) {
          that.showList = res.data.results
          that.total = res.data.count
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
      return s
    },
    // 查看各项指标详细数据
    handleCheck (i, item) {
      console.log(item)
      const URLList = ['', '/financing_app/usage', '/financing_app/loac_aid', '/financing_app/first_repayment', '/financing_app/second_repayment']
      let query = {}
      if (i === 3) {
        query.chain_id = item.first_repayment[0].chain_id
        query.financing_application_id = item.id
      } else {
        query.financing_id = item.id
      }
      const {href} = this.$router.resolve({
        path: URLList[i],
        query
      })
      window.open(href, '_blank')
    },
    handlePage (e) {
      this.handleAjax(e, this.selType)
    },
    handlePic (item) {
      // console.dir(item)
      window.open('#/financing_app/view_detail?financing_id=' + item.id, '_blank')
    }
  },
  watch: {
    selType: function (nw, old) {
      console.log(nw)
      this.handleAjax(1, nw)
    }
  }
}
</script>

<style lang="less" scoped>
.assetsList {
  .bottom_list {
    // background:#ffffff;
    width:100%;
    // height:224px;
    margin-bottom: 21px;
    &>div {
      // margin-bottom: 20px;
      border:1px solid #e1e6f0;
      box-shadow:0 2px 10px 0 rgba(153,153,153,0.20);
      margin-bottom: 20px;
      border-radius:4px;
    }
    .bottom_top {
      background:#f7f7f7;
      width:100%;
      height:41px;
      .left {
        float: left;
        padding-left: 25px;
        line-height: 41px;
        height: 41px;
        p {
          display: inline-block;
          font-family:PingFangSC-Regular;
          font-size:14px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          padding-right: 34px;
          span {
            font-family:PingFangSC-Semibold;
            font-size:14px;
            letter-spacing:0;
            text-align:left;
            font-weight: bolder;
          }
          .show_id {
            cursor: pointer;
            text-decoration: underline;
            color:#eb6100;
          }
        }
      }
      .right {
        float: right;
        height: 40px;
        line-height: 40px;
        button {
          border-radius:2px;
          width: 130px;
          height: 26px;
          outline: none;
          margin-top: 7px;
          margin-right: 20px;
          border: none;
          font-size:14px;
          line-height: 26px;
        }
        .noshow {
          background:#cccccc;
          font-family:PingFangSC-Regular;
          color:#999999;
          letter-spacing:0;
        }
        .install {
          background:#e87626;
          font-family:PingFangSC-Regular;
          color:#ffffff;
          letter-spacing:0;
        }
      }
    }
    .bottom_bottom {
      padding: 10px 16px;
      background: #fff;
      min-height: 150px;
      .el_col_list {
        padding: 0 13px 10px 16px;
        border-right: 1px dashed #e1e6f0;
        // height: 154px;
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
        &>ul {
          min-height: 120px;
          li {
            margin-top: 12px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            p {
              display: inline-block;
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
            }
            span {
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
            }
          }
          li.order_line {
            &>span div {
              display: flex;
              // padding: 0 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 25px;
              margin-top: 6px;
              span:first-child {
                width: 40%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 0;
                font-weight: bolder;
              }
              span:last-child {
                width: 60%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: right;
                font-weight: bolder;
              }
            }
          }
        }
        ul.institution_line  {
          min-height: 120px;
          li{
            display: flex;
            // line-height: 30px;
            margin-top: 12px;
            justify-content: space-between;
            font-size: 14px;
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
      .el1, .el2, .el4, .el5, .el6 {
        ul {
          li {
            display: flex;
            p:first-child {
              width: 45%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:last-child {
              width: 55%;
              text-align: right;
              font-weight: bolder;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .el3 {
        .order_sum {
          display: flex;
          p:first-child {
            width: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:last-child {
            width: 60%;
            text-align: right;
            font-weight: bolder;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .el6 {
        ul {
          height: auto;
          min-height: auto;
          // border-bottom: 1px dashed #999;
        }
        ul:last-child {
          border: none;
        }
      }
      .right_no {
        border-right: none;
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
  .null_application {
    height: 200px;
    text-align: center;
    color: #999;
    background: #fff;
    line-height: 200px;
  }
}
</style>
