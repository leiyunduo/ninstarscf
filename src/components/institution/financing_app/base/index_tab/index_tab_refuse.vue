<template>
  <div class="assetsList">
    <div class="bottom_list">
      <!-- <button class="posBtn" @click="handlePass()">发送到风控</button> -->
      <div v-for="(item, index) in showList" :key='index'>
        <div class="bottom_top">
          <div class="left">
            <p>融资类型：<span style="color: #333; font-weight: bolder" v-if="item.financing_application">{{item.financing_application.type === '0' ? '应收融资' : '订单融资'}}</span></p>
            <p>融资编号：<span v-if="item.financing_application.id">{{item.financing_application.id}}</span></p>
            <p>提交时间：<span>{{item.create_time}}</span></p>
            <p v-if="item.financing_application">
              个人无限连带责任承诺函：
              <span v-if="item.financing_application.application_data">
                <span style="color: #eb6100" v-if="item.financing_application.application_data.file">已签署</span>
                <span style="color: #999" v-if="!item.financing_application.application_data.file">暂未签署</span>
              </span>
            </p>
          </div>
          <div class="right">
            <!-- <button class="install" @click="handlePreview(item电子原件或扫描件_url)">预览风控内容</button> -->
            <!-- <button class="install">拒绝申请</button> -->
          </div>
        </div>
        <div class="bottom_bottom">
          <el-row :gutter="0">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el1" v-if="item.application_data">
                <h3 v-if="item.application_data">
                  <span>申请企业</span>
                  <span></span>
                </h3>
                <div>
                  <ul>
                    <li v-if="item.business_info">
                      <span>企业名称：</span>
                      <span :title="item.business_info.name">{{item.business_info.name}}</span>
                    </li>
                    <li v-if="item.business_info">
                      <span>联系电话：</span>
                      <span v-if="item.business_info.contact_info">{{item.business_info.contact_info.phone || '未填写'}}</span>
                    </li>
                    <li v-if="item.business_info">
                      <span>联系邮箱：</span>
                      <span v-if="item.business_info.contact_info">{{item.business_info.contact_info.email || '未填写'}}</span>
                    </li>
                  </ul>                  
                </div>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el2">
                <h3>
                  <span>融资需求</span>
                  <span></span>
                </h3>
                <ul v-if="item.expect_data">
                  <li><span>金额（元）：</span><span>{{item.expect_data.value ? toThousands(item.expect_data.value) : ''}}</span></li>
                  <li><span>希望融资时间：</span><span>{{item.expect_data.expect_loan_date}}</span></li>
                  <li><span>预计还款时间：</span><span>{{item.expect_data.expect_repayment_date}}</span></li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el3">
                <h3>
                  <span>融资用途</span>
                  <span @click="handleCheck(1, item)">查看详情</span>
                </h3>
                <ul v-if="item.application_data">
                  <li class="order_sum"><p>累计订单总额：</p><span style="color:#e87626;">{{toThousands(handleSum(item.application_data.chain_info))}}（元）</span></li>
                  <li v-for="(el, indexChan) in item.application_data.chain_info" :key='indexChan' v-if="item.application_data.chain_info" class="order_line">
                    <p>采购项目订单：</p>
                    <span v-if="el.order" v-for="(order, i) in el.order" :key='i'>
                      <div><span :title='order.name' style="margin-right: 12px">{{order.name}}</span><span>{{toThousands(order.amount) + '（元）'}}</span></div>
                    </span>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el4">
                <h3>
                  <span>助贷基金</span>
                  <span></span>
                </h3>
                  <!-- <p>
                    <img src="../../../static/img/other/success.png" alt="">
                    <span>审批成功</span>
                  </p> -->
                <ul v-if="item.fund_info && item.helping_data">
                  <li><p>助贷机构：</p><span :title='item.fund_info.name'>{{item.fund_info.name}}</span></li>
                  <li><p>助贷状态：</p><span :style="'color:' + fundList[item.helping_status].color">{{item.helping_status ? fundList[item.helping_status].title : ''}}</span></li>
                  <li><p>助贷金额：</p><span>{{item.helping_data.value ? toThousands(item.helping_data.value) + '（元）' : '未填写'}}</span></li>
                  <li><p>助贷占比：</p><span>{{item.helping_data.rate ? item.helping_data.rate + '%' : '未填写'}}</span></li>
                </ul>
                <div v-if="!item.fund_info" style="color:#999; text-align: center; line-height: 130px">未选择助贷机构</div>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el5">
                <h3>
                  <span>第一还款来源</span>
                  <span @click="handleCheck(3, item)">查看详情</span>
                </h3>
                <!-- <h4><span :title="'北京九星哈哈哈'">北京九星哈哈哈</span></h4> -->
                <ul v-if="item.first_repayment">
                  <li><span>项目名称：</span><span :title="item.first_repayment[0].name" style="color:#e87626;">{{item.first_repayment[0].name}}</span></li>
                  <li><span>项目评级：</span><span>暂未评级</span></li>
                  <li><span>历史结算逾期率：</span><span>0%</span></li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="el_col_list el6  right_no">
                <h3>
                  <span>第二还款来源</span>
                  <span @click="handleCheck(4, item)">查看详情</span>
                </h3>
                <ul v-if="item.second_repayment" v-for="(sec,secIndex) in item.second_repayment" :key='secIndex'>
                  <li><span>其他应收：</span><span :title="sec.name">{{sec.name}}</span></li>
                  <li><span>销售金额：</span><span>{{toThousands(sec.amount) + '（元）'}}</span></li>
                </ul>
                <p v-if="item.second_repayment.length === 0" style="line-height: 120px; text-align: center; color: #999;">未选择第二还款来源</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="pagenation" v-if="total > 5">
        <el-pagination
          layout="prev, pager, next"
          @current-change='handlePage'
          :total="total">
        </el-pagination>
      </div>
      <div v-if="showList.length === 0" class="null_application">暂无通过拒绝过的融资</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'refuse',
  data() {
    return {
      showList: [],
      total: 0,
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
       this.$ajax.get(`/api/financing/loan_process/?is_active=0&loan_process_status__in=${'102,202,302,402'}&page=${page}&page_size=${pz}&type=${sy}`).then(res => {
        console.log(res)
        if (res.status === 200) {
          // that.tableData = res.data.results
          let showList = []
          res.data.results.forEach(val => {
            showList.push({...val.financing_application, ...val, sel: false})
          })
          console.log(res.data.results)
          this.showList = showList
          this.total = res.data.count
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
      // const URLList = ['', '/credit_app/usage', '/credit_app/loac_aid', '/credit_app/first_repayment', '/credit_app/second_repayment']
      // let query = {}
      // if (i === 3) {
      //   query.chain_id = item.first_repayment[0].chain_id
      // } else {
      //   query.financing_id = item.id
      // }
      // const {href} = this.$router.resolve({
      //   path: URLList[i],
      //   query
      // })
      // window.open(href, '_blank')
    },
    // 预览PDF
    handlePreview (url) {
      window.open(this.$root_url() + url, '_blank')
    },
    handlePage (e) {
      this.handleAjax(e, this.selType)
    },
    // 预审通过
    // handlePass () {
    //   const that = this
    //   let showList = that.showList
    //   let arr = []
    //   showList.forEach(val => {
    //     if (val.sel) arr.push(val.id)
    //   })
    //   if (arr.length === 0) {
    //     that.$message.error('请选择要发送到风控的申请')
    //   } else {
    //     that.$ajax.put(`/api/financing/loan_process/${arr[0]}/`, {loan_process_status: 200}).then(res => {
    //       if (res.status === 200) {
    //         that.$message.success('发送成功')
    //         that.handleAjax(1)
    //       }
    //     })
    //   }
    // },
    // checkbox
    handleSelect (e, index) {
      const that = this
      let showList = that.showList
      showList[index].sel = e.target.checked
      this.showList = showList
    },
    // 跳转融资场景
    handlePic (id) {
      window.open('#/credit_app/view_detail?id=' + id, '_blank')
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
  .bottom_list {
    position: relative;
    // background:#ffffff;
    width:100%;
    // height:224px;
    margin-bottom: 21px;
    &>div {
      margin-bottom: 20px;
      border:1px solid #e1e6f0;
      box-shadow:0 2px 10px 0 rgba(153,153,153,0.20);
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
        input {
          vertical-align: middle;
          width: 18px;
          height: 18px;
        }
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
            color:#333333;
            letter-spacing:0;
            text-align:left;
          }
          .show_id {
            color: #eb6100;
            font-weight: bolder;
            // cursor: pointer;
            text-decoration: underline;
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
        padding: 10px;
        border-right: 1px dashed #e1e6f0;
        min-height: 100%;
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
            // cursor: pointer;
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
        ul {
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
              line-height: 20px;
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
            margin-top: 5px;
            // border-bottom: 1px dashed #999;
            &>span div {
              display: flex;
              // padding-left: 8px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 25px;
              span:first-child {
                width: 55%;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: bolder;
                white-space: nowrap;
              }
              span:last-child {
                width: 40%;
                font-weight: bolder;
                text-align: right;
              }
            }
          }
          li:last-child {
            border: none;
          }
          li.institution_line {
            display: flex;
            // line-height: 30px;
            // margin-top: 12px;
            justify-content: space-between;
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
      .el5, .el6, .el2 {
        ul {
          li {
            display: flex;
            span:first-child {
              width: 50%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p:first-child {
              width: 50%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;              
            }
            span:last-child {
              width: 50%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: right;
              font-weight: bolder;
            }
          }
        }
      }
      .el3 {
        li:first-child {
          display: flex;
          justify-content: space-between;
        }
        li.order_sum {
          display: flex;
          span:first-child {
            width: 50%;
            text-decoration: underline;
            // cursor: pointer;
          }
          span {
            width: 50%;
            // font-weight: bolder;
            text-align: right;
            text-decoration: none;
          }
        }
      }
      .el1, .el4 {
        ul {
          li {
            display: flex;
            p:first-child {
              width: 35%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:first-child {
              width: 35%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:last-child {
              width: 65%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: right;
              font-weight: bolder;
            }
          }
        }
      }
      .el1, .el2 {
        li:first-child {
          span:last-child {
            color: #eb6100;
            font-weight: bolder;
            // cursor: pointer;
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
