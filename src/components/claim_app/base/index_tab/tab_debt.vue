<template>
  <div class='show_tab'>
    <div class="slide">
      <ul>
        <li v-for='(item, index) in sec' :key='index' :class="index === selIndex ? 'sel' : ''" @click="handleTab(index)">{{item}}</li>
      </ul>
      <div>
        <!-- <div class='search'>
          <input type="text" placeholder="请输入要搜索的企业名">
          <div>
            <i class='el-icon-search'></i>
          </div>
        </div> -->
        <!-- <div class="search-linkman">
          <i class='el-icon-search'></i>
          <input type="text" placeholder="搜索企业" v-model="schfilter" class="search-input">
        </div> -->
        <select v-model='selType'>
          <option v-for='(item, index) in typeList' :key='index' :value="index">{{item}}</option>
        </select>
      </div>
    </div>
    <div class="claim_info" v-if="showList.length !== 0 && selIndex !== 2">
      <div v-for='(item, index) in showList' :key='index' class='claim_item'>
        <div class="claim_title">
          <div class="claim_title_btn">
            <div class="left_claim_title_btn">
              <span>债权人：</span>
              <el-tooltip :content="item.partner_company_info.name" placement="top">
                <span :class="{span_click: item.contract_info.detail_id}" @click="selectFrom(0, item, item.contract_info.detail_id)">{{item.partner_company_info.name}}</span>
              </el-tooltip>
            </div>
            <div class="right_claim_title_btn">
              <button @click="claimDebt(item)" v-if="Number(item.status) === 0 && item.contract_info.detail_id && selIndex !== 2" class="btn">{{btnName}}</button>
              <button @click="claimDebt(item, 1)" v-if="Number(item.status) === 0 && !item.contract_info.detail_id && selIndex !== 2" class="btn">邀请注册</button>
              <button v-if="Number(item.status) === 1 && selIndex !== 2" class="btn1">已推送</button>
              <button v-if="Number(item.status) === 2 && selIndex !== 2" class="btn1">已确认</button>
              <el-tooltip placement="top">
                <div slot="content">因记账有变更,该债务记录存在异常,请重新登记</div>
                <p class="imgs" v-if='Number(item.status) === 3'><img src="../../../../../static/img/chain/hasWarning4.png" alt="">债务存在异常</p>
              </el-tooltip>
            </div>
            <!-- <p class="imgs" v-if='Number(item.status) === 3'><img src="../../../../../static/img/chain/hasWarning4.png" alt="">债务存在异常</p> -->
          </div>
          <div>
            <span style="width:140px">债务金额（元）：</span>
            <span>{{item.amount}}</span>
          </div>
          <div>
            <span>债务状态：</span>
            <span>未实现</span>
          </div>
        </div>
        <div class='claim_chian' v-if="item.contract_info">
          <div class="chain_title">
            <span>债务凭证</span>
            <div>
              <span>所选项目：</span>
              <span @click="selectFrom(1, item)">{{item.contract_info.name}}</span>
            </div>
          </div>
          <div class="chain_show_list">
            <div v-if="item.contract_info.warehouse.length > 0">
              <p>出货</p>
              <ul>
                <li v-for='(warehouse, warehouseIndex) in item.contract_info.warehouse' :key='warehouseIndex'>
                  <div>
                    <span>出货单标题：</span>
                    <span>{{warehouse.name}}</span>
                  </div>
                  <div>
                    <span>出货金额（元）：</span>
                    <span>{{warehouse.amount}}</span>
                  </div>
                  <div>
                    <span>出单日期：</span>
                    <span>{{warehouse.date_created}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div v-if="item.contract_info.transport.length > 0">
              <p>运单</p>
              <ul>
                <li v-for='(transport, transportIndex) in item.contract_info.transport' :key='transportIndex'>
                  <div>
                    <span>运单标题：</span>
                    <span>{{transport.name}}</span>
                  </div>
                  <div>
                    <span>运单金额（元）：</span>
                    <span>{{transport.amount}}</span>
                  </div>
                  <div>
                    <span>出单日期：</span>
                    <span>{{transport.date_created}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div v-if="item.contract_info.acceptance.length > 0">
              <p>验收</p>
              <ul>
                <li v-for='(acceptance, transportIndex) in item.contract_info.acceptance' :key='transportIndex'>
                  <div>
                    <span>验收入库单标题：</span>
                    <span>{{acceptance.name}}</span>
                  </div>
                  <div>
                    <span>验收金额（元）：</span>
                    <span>{{acceptance.amount}}</span>
                  </div>
                  <div>
                    <span>出单日期：</span>
                    <span>{{acceptance.date_created}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div v-if="item.contract_info.invoice.length > 0">
              <p>发票</p>
              <ul>
                <li v-for='(invoice, invoiceIndex) in item.contract_info.invoice' :key='invoiceIndex'>
                  <div>
                    <span>发票号码：</span>
                    <span>{{invoice.invoice_number}}</span>
                  </div>
                  <div>
                    <span>发票金额（元）：</span>
                    <span>{{invoice.amount}}</span>
                  </div>
                  <div>
                    <span>出票日期：</span>
                    <span>{{invoice.date_created}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="block" style="text-align: center;margin:30px 0;">
        <el-pagination v-if="total" @current-change="handleSizeChange"
          :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="null_tip" v-if="showList.length === 0 && selIndex !== 2">暂无债务</div>
    <div class="financing_info" v-if="financingInfo.length > 0 && selIndex === 2">
      <div class="financing_item" v-for='(item, index) in financingInfo' :key='index'>
        <div class="financing_title" v-for="(item1, index1) in item.debts_info" :key="index1">
          <div>
            <div>
              <span>债权人：</span>
              <div>
                <span @click="selectFrom(2, item1)">{{item1.claimer_name}}</span>
              </div>
            </div>
            <div>
              <span>债务金额（元）：</span>
              <span>{{toThousands(item1.value)}}</span>
            </div>
            <div>
              <span>债务状态：</span>
              <span style="">{{item1.status_display}}</span>
            </div>
          </div>
        </div>
        <div class="financing_detail">
            <span>债务凭证</span>
            <div>
              <span>所属贷款：</span>
              <span @click="handleFinancing(item)">{{item.financing_application_id}}</span>
            </div>
            <div>
              <span>贷款类型：</span>
              <span>{{item.type === '0' ? '应收融资' : '订单融资'}}</span>
            </div>
          </div>
      </div>
    </div>
    <div class="null_tip" v-if="financingInfo.length === 0 && selIndex === 2">暂无数据</div>
    <el-dialog :visible.sync="dialogVisible">
      <invite ref="invite" :hideList="true" @hideMoadal="toHideModal"/>
    </el-dialog>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Invite from '@/components/administration/settings/invitingAdmin'
export default {
  name: 'TabDebt',
  data () {
    return {
      selIndex: 0,
      sec: ['我登记的债务', '协同登记的债务', '我的贷款'],
      selType: 0,
      typeList: ['全部', '债务已实现', '债务未实现', '已确认', '未确认'],
      showList: [],
      // 分页
      currPage: 1,
      total: '',
      pageSize: 5,
      company_id: '',
      btnName: '邀请确认',
      schfilter: '',
      showListOne: [],
      financingInfo: [],
      dialogVisible: false
    }
  },
  components: {
    Invite
  },
  watch: {
    // 搜索联系人
    schfilter: function(val, oldVal){
      this.showList = this.showListOne.filter( item => (~item.partner_company_info.name.indexOf(val)))
      this.currPage = 1
    }
  },
  mounted () {
    const that = this
    that.company_id = localStorage.id
    that.$ajax.get('/api/claims_debts/?query_class=Debts&query_type=1&company_id=' + that.company_id + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
      that.showList = res.data.results
      that.showListOne = res.data.results
      that.total = res.data.count
    })
  },
  methods: {
    toHideModal (e) {
      this.dialogVisible = e
    },
    // 确认
    claimDebt (item, i) {
      const that = this
      if (i === 1) {
        // 邀请注册
        this.dialogVisible = true
        setTimeout(()=> {
          this.$refs.invite.startInviting()
        }, 500)
      } else {
        if (that.btnName === '协同确认') {
          that.$ajax.patch(`/api/claims_debts/${item.id}/approved/`, {
            query_class: 'Debts',
            query_type: 2,
            company_id: that.company_id
          }).then(res => {
            that.$message.success('邀请成功')
            that.$ajax.get('/api/claims_debts/?query_class=Debts&query_type=2&company_id=' + that.company_id + '&page=' + 1 + '&page_size=' + this.pageSize).then(res => {
              that.showList = res.data.results
              that.showListOne = res.data.results
              that.total = res.data.count
            })
          })
        } else if (that.btnName === '邀请确认') {
          that.$ajax.post(`/api/claims_debts/${item.id}/send/`, {
            query_class: 'Debts',
            query_type: 1,
            company_id: that.company_id
          }).then(res => {
            that.$message.success('邀请成功')
            that.$ajax.get('/api/claims_debts/?query_class=Debts&query_type=1&company_id=' + that.company_id + '&page=' + 1 + '&page_size=' + this.pageSize).then(res => {
              that.showList = res.data.results
              that.showListOne = res.data.results
              that.total = res.data.count
            })
          })
        }
      }
    },
    // 跳转链式记账以及企业博客
    selectFrom (i, item, b) {
      const that = this
      if (i === 0) {
        if (!b) {
          // 企业博客
          window.open('#/enterpriseBlog?bid=' + item.partner_company_info.id + '&claim_app=0')
        }
      } else if (i === 1) {
        // 链式记账
        if (this.selIndex === 0) {
          window.open('#/chain_app/receive_chain?id=' + item.contract_info.chain_id)
        } else {
          window.open('#/claim_app/cooperation_chain?id=' + item.contract_id + '&claim=1' + '&idList=' + item.contract_info.chain_ledger_list)
        }
      } else if (i === 2) {
        console.log(item)
        if (Number(item.claimer_type) === 2) {
          // 金融机构博客
          window.open('#/institutionBlog?bid=' + item.claimer_id + '&claim_app=0')
        }
      }
    },
    // 切换按钮
    handleTab (index) {
      const that = this
      this.currPage = 1
      if (index === 0) {
        that.btnName = '邀请确认'
        this.selIndex = 0
        that.$ajax.get('/api/claims_debts/?query_class=Debts&query_type=1&company_id=' + that.company_id + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.showList = res.data.results
          that.showListOne = res.data.results
          that.total = res.data.count
        })
      } else if (index === 1) {
        that.btnName = '协同确认'
        this.selIndex = 1
        that.$ajax.get('/api/claims_debts/?query_class=Debts&query_type=2&company_id=' + that.company_id + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.showList = res.data.results
          that.showListOne = res.data.results
          that.total = res.data.count
        })
      } else if (index === 2) {
        this.selIndex = 2
        that.$ajax.get('/api/financing/business_loan_debts/' + '?page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.financingInfo = res.data.results
          that.showListOne = res.data.results
          that.total = res.data.count
        })
      }
    },
    // 分页
    handleSizeChange (val) {
      const that = this
      that.currPage = val
      if (that.selIndex === 0) {
        that.$ajax.get('/api/claims_debts/?query_class=Debts&query_type=1&company_id=' + that.company_id + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.showList = res.data.results
          that.showListOne = res.data.results
          that.total = res.data.count
        })
      } else if (that.selIndex === 1) {
        // 详情
        that.$ajax.get('/api/claims_debts/?query_class=Debts&query_type=2&company_id=' + that.company_id + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.showList = res.data.results
          that.showListOne = res.data.results
          that.total = res.data.count
        })
      } else if (that.selIndex === 2) {
        that.$ajax.get('/api/financing/business_loan_debts/' + '?page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          that.financingInfo = res.data.results
          that.showListOne = res.data.results
          that.total = res.data.count
        })
      }
    },
    // 查看对应贷款
    handleFinancing (item) {
      console.log(item)
      this.$router.push({
        path: '/financing_app/verify',
        query: {
          debt: '1',
          id: item.debts_info[0].loan_process_id
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.show_tab {
  padding-top: 20px;
  padding-top: 20px;
  .slide {
    display: flex;
    align-items: center;
    // height: 41px;
    padding: 0 40px;
    justify-content: space-between;
    ul {
      display: flex;
      text-align: center;
      // margin: 30px 0;
      li {
        width: 120px;
        // height: 28px;
        padding: 6px 0;
        line-height: 28px;
        margin-right: 20px;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        color:rgba(102,102,102,1);
      }
      li.sel {
        color:rgba(235,97,0,1);
        border-bottom: 2px solid rgba(235,97,0,1);
      }
    }
    div {
      display: flex;
      flex-direction: row;
      // input {
      //   height: 28px;
      //   padding: 0 10px;
      //   margin-right: 15px;
      //   width: 240px;
      //   border: 1px solid #c0c4cc;
      //   outline: none;
      //   border-radius: 4px;
      //   font-size: 12px;
      // }
      select {
        height: 28px;
        width: 120px;
        background: none;
        border: 1px solid #c0c4cc;
        outline: none;
        font-size: 12px;
        border-radius: 4px;
        padding: 0 10px;
      }
    }
    .search-linkman {
      height: 28px;
      position: relative;
      i {
        position: absolute;
        top: 6px;
        right: 21px;
      }
      input {
        height: 28px;
        padding: 0 10px;
        margin-right: 15px;
        width: 200px;
        border: 1px solid #c0c4cc;
        outline: none;
        border-radius: 4px;
        font-size: 12px;
      }
    }
  }
  .claim_info {
    padding: 0 41px;
    .claim_item {
      margin-top: 20px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(232,232,232,1);
      box-shadow:0px 0px 14px 0px rgba(0, 0, 0, 0.2);
      padding: 0 30px 30px;
      .claim_title {
        display: flex;
        height: 40px;
        margin-top: 20px;
        position: relative;
        flex-direction: row;
        &>div {
          flex: 1;
          // width: 20%;
          height: 100%;
          line-height: 40px;
          font-size: 14px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span:first-child {
            display: inline-block;
            width: 85px;
            font-size: 18px;
          }
          span:last-child {
            font-size:18px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
          }
        }
        .claim_title_btn {
          display: flex;
          flex-direction: row;
          .left_claim_title_btn {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .span_click {
              font-size:18px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              text-decoration:underline;
              color:rgba(235,97,0,1);
              cursor: pointer;
            }
          }
          .right_claim_title_btn {
            text-align: center;
            margin-right: 20px;
            width: 100px;
          }
          .imgs {
            font-size: 12px;
            height: 30px;
            line-height: 40px;
            cursor: pointer;
            img {
              margin-right: 3px;
              width: 15px;
              height: 14px;
              float: left;
              margin-top: 12px;
            }
          }
          button {
            outline: none;
            border-radius: 4px;
            width: 80px;
            height: 24px;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            margin-right: 20px;
            // line-height: 24px;
          }
          .btn {
            color: #fff;
            border: 1px solid #eb6100;
            background: #ea6100;
          }
          .btn1 {
            border: none;
            width:72px;
            height:22px;
            background:rgba(204,204,204,1);
            border-radius:2px;
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
        }
      }
      .claim_chian {
        .chain_title {
          display: flex;
          height: 36px;
          align-items: center;
          font-size: 14px;
          &>span:first-child {
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            display: inline-block;
            width: 180px;
          }
          div:last-child {
            span:first-child {
              font-size:16px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(102,102,102,1);
            }
            span:last-child {
              font-size:16px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color: #eb6100;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        .chain_show_list {
          margin-top: 14px;
          &>div {
            p {
              line-height: 33px;
              font-size:16px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(102,102,102,1);
              height:32px;
              background:rgba(238,238,238,1);
              padding-left: 47px;
            }
            ul {
              background:rgba(255,255,255,1);
              border:1px solid rgba(232,232,232,1);
              border-top: none;
              padding-left: 47px;
              li {
                display: flex;
                // width: 30%;
                font-size: 14px;
                div {
                  width: 40%;
                  height: 32px;
                  line-height: 33px;
                  span:first-child {
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                  }
                }
              }
            }
          }
          &>div:last-child {
            ul:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
  .null_tip {
    text-align: center;
    margin: 20px 0;
    height: 400px;
    line-height: 400px;
    color: #999;
  }
}
.financing_info {
  padding: 0 20px;
  margin-top: 20px;
  .financing_item {
    margin-bottom: 30px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(232,232,232,1);
    box-shadow:0px 0px 14px 0px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    .financing_title {
      &>div {
        display: flex;
        height: 60px;
        padding: 0 20px;
        border-bottom: 1px dashed #dadada;
        &>div {
          width: 30%;
          height: 100%;
          line-height: 60px;
          color: rgba(102,102,102,1);
          padding: 0 10px;
          span:last-child {
            color: #333;
            // font-weight: bold;
          }
        }
        &>div:first-child {
          width: 28%;
          display: flex;
          align-items: center;
          div:nth-child(2) {
            width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              color: #eb6100;
              text-decoration: underline;
              cursor: pointer;
              line-height: 48px;
              font-weight: bolder;
            }
          }
          button {
            color: #fff;
            border: 1px solid #eb6100;
            background: #ea6100;
            outline: none;
            border-radius: 3px;
            width: 80px;
            height: 24px;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            // line-height: 24px;
          }
        }
      }   
    }
    .financing_detail {
      display: flex;
      padding: 0 32px;
      height: 50px;
      align-items: center;
      font-size: 14px;
      &>span:first-child {
        width: 108px + 46px;
        color: #666;
        font-weight: bold;
        font-size: 16px;
      }
      div:nth-child(2){
        width: 25%;
        span:first-child {
          color: #666;
        }
        span:last-child {
          color: #eb6100;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      div:last-child {
        width: 25%;
        color: #333;
        span:first-child {
          color: #666;
        }
      }
    }
  }
}
// .financing_info {
//   padding: 0 20px;
//   margin-top: 20px;
//   .financing_item {
//     margin-bottom: 20px;
//     background:rgba(255, 255, 255, 1);
//     border:1px solid rgba(232, 232, 232, 1);
//     box-shadow:0px 0px 14px 0px rgba(0, 0, 0, 0.2);
//     .financing_title {
//       border-bottom: 1px dashed #eee;
//       &>div {
//         display: flex;
//         height: 60px;
//         padding: 0 20px;
//         &>div {
//           width: 26%;
//           height: 100%;
//           line-height: 60px;
//           color: rgba(102,102,102,1);
//           padding: 0 10px;
//           span:last-child {
//             color: #333;
//             // font-weight: bold;
//             font-size: 14px;
//           }
//         }
//         &>div:first-child {
//           width: 28%;
//           display: flex;
//           align-items: center;
//           div:nth-child(2) {
//             width: 60%;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             white-space: nowrap;
//             span {
//               color: #eb6100;
//               text-decoration: underline;
//               cursor: pointer;
//               line-height: 48px;
//               font-weight: bolder;
//             }
//           }
//           button {
//             color: #fff;
//             border: 1px solid #eb6100;
//             background: #ea6100;
//             outline: none;
//             border-radius: 3px;
//             width: 80px;
//             height: 24px;
//             font-size: 12px;
//             cursor: pointer;
//             text-align: center;
//             // line-height: 24px;
//           }
//         }
//       }   
//     }
//     // .financing_detail {
//     //   display: flex;
//     //   padding: 0 20px;
//     //   height: 50px;
//     //   align-items: center;
//     //   &>span:first-child {
//     //     width: 108px + 46px;
//     //     color: #666;
//     //     font-weight: bolder;
//     //     // font-weight: bold;
//     //   }
//     //   div:nth-child(2) {
//     //     span:first-child {
//     //       color: #666;
//     //     }
//     //     span:last-child {
//     //       color: #eb6100;
//     //       text-decoration: underline;
//     //       cursor: pointer;
//     //     }
//     //   }
//     // }
//   }
// }
</style>
<style lang="less" version='v0.1'>
// .slide {
//   display: flex;
//   align-items: center;
//   height: 41px;
//   padding: 0 20px;
//   justify-content: space-between;
//   ul {
//     display: flex;
//     text-align: center;
//     li {
//       width: 120px;
//       height: 28px;
//       line-height: 28px;
//       background: none;
//       border: 1px solid #eb6100;
//       color: #ea6100;
//       margin-right: 22px;
//       outline: none;
//       border-radius: 2px;
//       font-size: 14px;
//       cursor: pointer;
//       text-align: center;
//     }
//     li.sel {
//       background: #eb6100;
//       color: #fff;
//     }
//   }
//   div {
//     input {
//       height: 28px;
//       padding: 0 3px;
//       margin-right: 15px;
//       width: 240px;
//     }
//     select {
//       height: 28px;
//       width: 120px;
//     }
//   }
// }
// .claim_info {
//   padding: 0 20px;
//   margin-top: 20px;
//   .claim_item {
//     margin-bottom: 10px;
//     border: 1px solid rgb(204, 204, 204);
//     .claim_title {
//       display: flex;
//       height: 40px;
//       background: rgb(242, 242, 242);
//       &>div {
//         width: 16%;
//         height: 100%;
//         line-height: 40px;
//         font-size: 14px;
//         color: #666;
//         padding: 0 10px;
//         span:last-child {
//           color: #333;
//           font-weight: bold;
//         }
//       }
//       &>div:first-child {
//         width: 28%;
//         display: flex;
//         align-items: center;
//         div:nth-child(2) {
//           width: 60%;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//           height: 100%;
//           span {
//             color: #eb6100;
//             text-decoration: underline;
//             cursor: pointer;
//             line-height: 48px;
//             font-weight: bolder;
//           }
//         }
//         button {
//           color: #fff;
//           border: 1px solid #eb6100;
//           background: #ea6100;
//           outline: none;
//           border-radius: 6px;
//           width: 80px;
//           height: 24px;
//           font-size: 12px;
//           cursor: pointer;
//           text-align: center;
//           // line-height: 24px;
//         }
//       }
//     }
//     .claim_chian {
//       .chain_title {
//         display: flex;
//         padding: 0 20px;
//         height: 36px;
//         align-items: center;
//         font-size: 14px;
//         border-bottom: 1px dashed rgb(204, 204, 204);
//         &>span:first-child {
//           width: 180px;
//           color: #666;
//           font-weight: bold;
//         }
//         div:last-child {
//           span:first-child {
//             color: #999;
//           }
//           span:last-child {
//             color: #eb6100;
//             text-decoration: underline;
//             cursor: pointer;
//           }
//         }
//       }
//       .chain_show_list {
//         padding: 0 20px;
//         &>div {
//           p {
//             line-height: 36px;
//             font-size: 14px;
//             color: #333;
//             font-weight: bolder;
//             border-bottom: 1px dashed rgb(204, 204, 204);
//           }
//           ul {
//             li {
//               display: flex;
//               // width: 30%;
//               font-size: 14px;
//               div {
//                 width: 28%;
//                 height: 32px;
//                 line-height: 32px;
//                 span:first-child {
//                   color: #999;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
</style>
<style lang="less" version='v0.1'>
// .slide {
//   display: flex;
//   align-items: center;
//   height: 41px;
//   padding: 0 20px;
//   justify-content: space-between;
//   ul {
//     display: flex;
//     text-align: center;
//     li {
//       width: 120px;
//       height: 28px;
//       line-height: 28px;
//       background: none;
//       border: 1px solid #eb6100;
//       color: #ea6100;
//       margin-right: 22px;
//       outline: none;
//       border-radius: 2px;
//       font-size: 14px;
//       cursor: pointer;
//       text-align: center;
//     }
//     li.sel {
//       background: #eb6100;
//       color: #fff;
//     }
//   }
//   div {
//     input {
//       height: 28px;
//       padding: 0 3px;
//       margin-right: 15px;
//       width: 240px;
//     }
//     select {
//       height: 28px;
//       width: 120px;
//     }
//   }
// }
// .claim_info {
//   padding: 0 20px;
//   margin-top: 20px;
//   .claim_item {
//     margin-bottom: 10px;
//     border: 1px solid rgb(204, 204, 204);
//     .claim_title {
//       display: flex;
//       height: 40px;
//       background: rgb(242, 242, 242);
//       &>div {
//         width: 16%;
//         height: 100%;
//         line-height: 40px;
//         font-size: 14px;
//         color: #666;
//         padding: 0 10px;
//         span:last-child {
//           color: #333;
//           font-weight: bold;
//         }
//       }
//       &>div:first-child {
//         width: 28%;
//         display: flex;
//         align-items: center;
//         div:nth-child(2) {
//           width: 60%;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//           height: 100%;
//           span {
//             color: #eb6100;
//             text-decoration: underline;
//             cursor: pointer;
//             line-height: 48px;
//             font-weight: bolder;
//           }
//         }
//         button {
//           color: #fff;
//           border: 1px solid #eb6100;
//           background: #ea6100;
//           outline: none;
//           border-radius: 6px;
//           width: 80px;
//           height: 24px;
//           font-size: 12px;
//           cursor: pointer;
//           text-align: center;
//           // line-height: 24px;
//         }
//       }
//     }
//     .claim_chian {
//       .chain_title {
//         display: flex;
//         padding: 0 20px;
//         height: 36px;
//         align-items: center;
//         font-size: 14px;
//         border-bottom: 1px dashed rgb(204, 204, 204);
//         &>span:first-child {
//           width: 180px;
//           color: #666;
//           font-weight: bold;
//         }
//         div:last-child {
//           span:first-child {
//             color: #999;
//           }
//           span:last-child {
//             color: #eb6100;
//             text-decoration: underline;
//             cursor: pointer;
//           }
//         }
//       }
//       .chain_show_list {
//         padding: 0 20px;
//         &>div {
//           p {
//             line-height: 36px;
//             font-size: 14px;
//             color: #333;
//             font-weight: bolder;
//             border-bottom: 1px dashed rgb(204, 204, 204);
//           }
//           ul {
//             li {
//               display: flex;
//               // width: 30%;
//               font-size: 14px;
//               div {
//                 width: 28%;
//                 height: 32px;
//                 line-height: 32px;
//                 span:first-child {
//                   color: #999;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
</style>
