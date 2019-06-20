<template>
  <div class='loan_wrap'>
    <!-- <appNav :father="{selIndex: 2}" type='2'></appNav> -->
    <div class='loan_list'>
      <!-- <div class="loan_title">
        <img src="static/img/leftbar/loan.png" alt="">
        <span>贷后风控大厅</span>
      </div> -->
      <div class="loan_info">
        <div class="btn_list">
          <button :class='modelIndex === 1 ? "sel" : ""' @click="modelIndex = 1">查询模式</button>
          <button :class='modelIndex === 0 ? "sel" : ""' @click="modelIndex = 0">监管模式</button>
        </div>
        <div class="inner_view">
          <ul class='show_slide' v-if="modelIndex === 0">
            <li v-for="(item, index) in showList" :key='index'>
              <div class="show_id">
                <p>
                  <span>贷款编号：</span>
                  <span @click='handleFinancing(item)'>{{item.id}}</span>
                </p>
                  <p>
                    <span>贷款进度：</span>
                    <span :style='"color:" + sList[item.loan_process_status].color'>{{sList[item.loan_process_status].title}}</span>
                  </p>
                  <p>
                    <span>贷款状态：</span>
                    <span>{{handleWord(item)}}</span>
                  </p>
                  <p>
                    <span>风险监控：</span>
                    <span style="color: #eb6100; text-decoration: underline; cursor: pointer" @click="handleRisk(item)">查看</span>
                  </p>
              </div>
              <div class="img_wrap">
                <img :src="imgList[item.day_status].img" alt="" @click="item.pop = !item.pop">
                <p :class="item.pop ? 'pop_in' : 'pop_out'" :style="imgList[item.day_status].style" @click="item.pop = false">
                  <ol>
                    <li v-for="(tip, tipIndex) in item.info_tip" :key='tipIndex'>{{tip}}</li>
                  </ol>
                </p>
              </div>
              <p class='show_name'>
                <!-- <span>融资企业：</span> -->
                <span @click="handleBusiness(item)">{{item.business_name}}</span>
              </p>
              <div class="ring_wrap">
                <h3>融资用途监控</h3>
                <financingRing v-if="item.chain_id" :id='item.chain_id' :businessId='item.business' :repaymentDate='item.days' :financingDate='item.bill_days' />
                <p v-if="!item.chain_id">未提交融资用途</p>
                <h3 v-if="item.type === '0'">自偿性还款来源监控</h3>
                <ul v-if="item.type === '0'">
                  <li v-for="(chain, index) in item.first_repayment" :key='index'>
                    <financingRing :id='chain.chain_id' :businessId='item.business' :repaymentDate='item.days' :financingDate='item.bill_days'/>      
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul class="show_card" v-if="modelIndex === 1">
            <li v-for="(item, index) in showList" :key='index'>
              <div class='card_wrap'>
                <div class="business_info">
                  <div class="avatar">
                    <!-- <img :src="item.avatar ? $root_url() + item.avatar : 'static/img/tickets/default_business.png'" alt=""> -->
                    <img :src="imgList[item.day_status].img" alt="" @click="item.pop = !item.pop">
                    <p :class="item.pop ? 'pop_in' : 'pop_out'" :style="imgList[item.day_status].style" v-if="" @click="item.pop = false">
                      <ol>
                        <li v-for="(tip, tipIndex) in item.info_tip" :key='tipIndex'>{{tip}}</li>
                      </ol>
                    </p>
                  </div>
                  <div class='financing_info'>
                    <p>
                      <span>贷款企业：</span>
                      <span>{{item.business_name}}</span>
                    </p>
                    <p>
                      <span>贷款进度：</span>
                      <span :style='"color:" + sList[item.loan_process_status].color'>{{sList[item.loan_process_status].title}}</span>
                    </p>
                    <p>
                      <span>贷款状态：</span>
                      <span>{{handleWord(item)}}</span>
                    </p>
                  </div>
                  <div class="financing_info">
                    <p>
                      <span>贷款类型：</span>
                      <span>{{typeList[item.type]}}</span>
                    </p>
                    <p>
                      <span>还款日期：</span>
                      <span :class='handleDays(item.days)'>{{item.repayment_date || '企业提交'}}</span>
                    </p>
                    <p>
                      <span>还款金额：</span>
                      <span>{{item.amount}}</span>
                    </p>
                  </div>
                </div>
                <div class='btn_inner'>
                  <button @click="handleFinancing(item)">贷款信息</button>
                  <button @click="handleBusiness(item)">企业信息</button>
                  <button @click="handleNine(item)">贷款进度</button>
                  <button @click="handleRisk(item)">风险管理</button>
                  <button @click="handleAsset(item)">企业数据资产</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="null_data" v-if="showList.length === 0">
          <img src="static/img/null-data.png" alt="">
          <p>{{nullTip}}</p>
        </div>
        <div class="pagenation" v-if="total > 6">
          <el-pagination
            layout="prev, pager, next"
            :page-size='5'
            @current-change='handlePage'
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisibleBusiness"
      width="1400px"
      custom-class='business_wrap'>
      <business :modal='true' :id='selbusinessId' v-if="dialogVisibleBusiness"/>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisibleFinancing"
      width="1680px"
      custom-class='id_wrap'>
      <idCard :modal='true' :id='selfinancingId' v-if="dialogVisibleFinancing"/>
    </el-dialog>
      <el-dialog
      :visible.sync="dialogVisibleFinancingR"
      width="1680px"
      custom-class='id_wrap'>
      <idCardR :modal='true' :id='selfinancingId' v-if="dialogVisibleFinancingR"/>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisibleRing"
      width="1800px">
      <div class="financing_prosess">
        <h3>融资用途监控</h3>
        <financingRing :id='selringId' :businessId='selbusinessId' :repaymentDate='selDays' :financingDate='selBill' v-if="dialogVisibleRing && selringId"/>
        <p v-if="!selringId">未提交融资用途</p>
        <h3 v-if="showType === '0'">自偿性还款来源监控</h3>
        <ul v-if="showType === '0'">
          <li v-for="(item, index) in firstChain" :key='index'>
            <financingRing :id='item.chain_id' :businessId='selbusinessId' :repaymentDate='selDays' :financingDate='selBill' v-if="dialogVisibleRing"/>      
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisibleRisk"
      width="1280px">
      <risk :bid='selbusinessId' v-if="dialogVisibleRisk"/>
    </el-dialog>
  </div>
</template>
<script>
import financingRing from './ring'
import business from '@/components/institution/financing_app/base/table_card/business_card'
import idCard from '@/components/institution/financing_app/base/table_card/id_card'
import idCardR from '@/components/institution/financing_app/base/table_card/id_card_r'
import risk from '@/components/asset_app/riskManagement'
export default {
  name: 'loan',
  components: {
    financingRing, business, idCard, risk, idCardR
  },
  data () {
    return {
      showList: [],
      nullTip: '',
      modelIndex: 1,
      dialogVisibleBusiness: false,
      selbusinessId: '',
      dialogVisibleFinancing: false,
      selfinancingId: '',
      selDays: '',
      selBill: '',
      dialogVisibleRing: false,
      dialogVisibleRisk: false,
      dialogVisibleFinancingR: false,
      selringId: '',
      total: 0,
      firstChain: [],
      showType: '0',
      typeList: ['应收融资', '订单融资'],
      sList: {
        '600': {title: '企业申请展期', color: '#eb6100'},
        '601': {title: '待还款（展期成功）', color: '#eb6100'},
        '602': {title: '待还款', color: '#eb6100'},
        '700': {title: '待还款', color: '#eb6100'},
        '701': {title: '还款信息待确认', color: '#eb4e3d'},
        '702': {title: '已还贷', color: '#006400'}
      },
      imgList: {
        "0": {info: '', style: 'color: #eb4e3d; border-color: #eb4e3d; box-shadow: 0px 0px 6px 0px #eb4e3d;', class: 0, img: require('../../../../static/img/r_status/error.gif')},
        "1": {info: '', style: 'color: #eb6100; border-color: #eb6100; box-shadow: 0px 0px 6px 0px #eb6100;', class: 1, img: require('../../../../static/img/r_status/warning.gif')},
        "2": {info: '', style: 'color: #006400; border-color: #006400; box-shadow: 0px 0px 6px 0px #006400;', class: 2, img: require('../../../../static/img/r_status/normal.png')}
      }
    }
  },
  created () {
    this.handleAjax()

    let _location = [{
      title: this.$route.meta.title,
      url: this.$route.meta.url
    }]
  },
  methods: {
    // 获取数据
    handleAjax (page, ps) {
      this.nullTip = '数据计算中。。。'
      const that = this
      let p = page || 1
      let pz = ps || 6
      this.$ajax.get(`/api/financing/loan_process/?is_active=1&loan_process_status__in=${'600,601,602,700,701'}&page=${p}&page_size=${pz}`).then(res => {
        if (res.status === 200) {
          let showList = []
          if (res.data.results.length === 0) that.nullTip = '暂无监控的贷款'
          res.data.results.forEach(val => {
            let chain_id = ''
            if (val.financing_application.type === '1') {
              chain_id = val.financing_application.application_data.chain_id
            } else {
              if (val.financing_application.application_data.loan_purpose.length !== 0) {
                chain_id = val.financing_application.application_data.loan_purpose[0].chain_id
              } else {
                chain_id = null
              }
            }
            showList.push({
              id: val.financing_application.id,
              financing_id: (val.id).toString(),
              type: val.financing_application.type, 
              business: val.financing_application.business,
              business_name: val.financing_application.business_info.name,
              avatar: val.financing_application.business_info.avatar,
              days: val.days,
              bill_days: val.financing_application.bill_days,
              loan_process_status: val.loan_process_status,
              repayment_date: val.repayment_date,
              amount: that.toThousands(val.repayment_value) + '元' ,
              chain_id,
              first_repayment: val.financing_application.first_repayment,
              pop: false,
              day_status: val.financing_application.warning_info.status || "0",
              info_tip: val.financing_application.warning_info.msg_list,
            })
          })
          this.showList = showList
          this.total = res.data.count
          this.infoList = res.data.results
        }
      })
    },
    // 单页函数
    handlePage (e) {
      this.showList = []
      this.handleAjax(e)
    },
    // 计算当前逾期情况
    handleStatus (item) {
      if (item.days < 0) {
        return require('../../../../static/img/r_status/error.gif')
      } else if ((item.days >= 0 && item.days <= 7 || item.loan_process_status === '601')) {
        return require('../../../../static/img/r_status/warning.gif')
      } else {
        return require('../../../../static/img/r_status/normal.png')
      }
    },
    // 根据情况对应提示
    handleTip (item) {
      if (item.days < 0) {
        return {info : `已逾期${Math.abs(item.days)}天`, style: 'color: #eb4e3d; border-color: #eb4e3d; box-shadow: 0px 0px 6px 0px #eb4e3d;', class: 0}
      } else if ((item.days >= 0 && item.days <= 7)) {
        return {info: `还有${item.days}到期，请及时联系`, style: 'color: #eb6100; border-color: #eb6100; box-shadow: 0px 0px 6px 0px #eb6100;', class: 1}
      } else if (item.loan_process_status === '601') {
        return {info: `企业提出展期申请`, style: 'color: #eb6100; border-color: #eb6100; box-shadow: 0px 0px 6px 0px #eb6100;', calss: 1}
      } else {
        return {info: `贷款情况良好`, style: 'color: #006400; border-color: #006400; box-shadow: 0px 0px 6px 0px #006400;', class: 2}
      }      
    },
    // 查看企业
    handleBusiness (item) {
      this.selbusinessId = item.business
      this.dialogVisibleBusiness = true
    },
    // 查看融资信息卡片
    handleFinancing (item) {
      if (item.type === '1') {
        this.dialogVisibleFinancing = true
      } else {
        this.dialogVisibleFinancingR = true
      }
      this.selfinancingId = item.financing_id
    },
    // 返回文案
    handleWord (item) {
      if (item.days < 0) {
        return `已经逾期${Math.abs(item.days)}天`
      } else if (item.days === 0) {
        return `当日还款`
      } else {
        return `距离还款日还有${item.days}天`
      }
    },
    // 查看20环内容卡片
    handleNine (item) {
      // console.log(item)
      // console.log('nine')
      this.showType = item.type
      this.firstChain = item.first_repayment
      this.selringId = item.chain_id
      this.selDays = item.days
      this.selBill = item.bill_days
      this.selbusinessId = item.business
      this.dialogVisibleRing = true
    },
    // 查看风险管理卡片
    handleRisk (item) {
      this.dialogVisibleRisk = true
      this.selbusinessId = item.business      
    },
    // 查看数据资产链接
    handleAsset (item) {
      window.open(`#/area_app/business_detail?only=1&company_id=${item.business}`)
    },
    // 警告方案
    handleDays (num) {
      if (num < 0) {
        return 'risk_warning'
      } else if (num > 0 && num < 7) {
        return 'risk_normal'
      } else if (num > 7) {
        return 'risk_safe'
      } else {
        return 'null'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes flash
{
  from { opacity: 1;}
  60% { opacity: 0.3;}
  to {opacity: 1;}
}
@-webkit-keyframes flash
{
  from { opacity: 1;}
  60% { opacity: 0.3;}
  to {opacity: 1;}
}
@-moz-keyframes flash
{
  from { opacity: 1;}
  60% { opacity: 0.3;}
  to {opacity: 1;}
}
.risk_warning {
  color: #eb4e3d;
  animation: flash 4s ease-in-out infinite;
  font-weight: bold;
  // text-shadow: 1px 1px #ff0010;
}
.risk_warning_quick {
  color: #eb4e3d;
  animation: flash 2s ease-in-out infinite;
  font-weight: bold;
  // text-shadow: 1px 1px #ff0010;
}
.risk_normail {
  color: #eb6100
}
.risk_safe {
  color: #006400
}
.null {
  color: #999;
}
.loan_wrap {
  // display: flex;
  min-height: 100%;
  background: #f3f4f5;
  .loan_list {
    // width: 100%;
    //padding-top: 70px;
    // margin-left: 60px;
    // padding: 0 50px;
    .loan_title {
      height: 60px;
      display: flex;
      border-bottom: 1px solid #ccc;
      padding-left: 50px;
      background: #fff;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }
    .loan_info {
      // margin-top: 20px;
      margin: 20px 30px;
      margin-bottom: 0;
      padding: 0 20px;
      .btn_list {
        padding: 20px 15px 30px;
        text-align: right;
        // background: #fff;
        button {
          width: 80px;
          line-height: 24px;
          border: none;
          margin-left: 20px;
          background: #eb6100;
          border-radius: 3px;
          color: #fff;
          transition: all .5s ease-in;
          border: 1px solid #eb6100;
          line-height: 24px;
          outline: none;
          color: #eb6100;
          background: #fff;
        }
        button:hover {
          background: #eb6100;
          color: #fff;
        }
        .sel {
          background: #eb6100;
          color: #fff;
        }
      }
      ul.show_slide {
        &>li {
          border-bottom: 1px solid #eaeaea;
          background: #fff;
          margin-bottom: 20px;
          box-shadow: 2px 2px 2px 2px #dadada;
          .show_id {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 0 30px;
            border-bottom: 1px dotted #f1f1f1;
            background: #e2e2e2;
            p {
              // padding: 0 10px;
              width: 33%;
              line-height: 48px;
              color: #666;
              text-align: center;
            }
            p:first-child {
              span:last-child {
                color: #eb6100;
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
          .img_wrap {
            text-align: center;
            position: relative;
            img {
              width: 100px;
              cursor: pointer;
            }
            p {
              position: absolute;
              top: 20%;
              left: 54%;
              width: 640px;
              min-height: 20px;
              border: 1px solid #eaeaea;
              line-height: 60px;
              // text-align: center;
              border-radius: 8px;
              transition: opacity 200ms ease-in;
              background: #fff;
              ol {
                padding: 10px 24px;
                li {
                  // padding: 0 10px;
                  line-height: 24px;
                  margin: 0;
                  border: none;
                  word-wrap: break-word;
                  text-align-last: left;
                  font-size: 14px;
                }
              }
            }
            .pop_in {
              opacity: 1;
            }
            .pop_out {
              opacity: 0;
            }
          }
          .ring_wrap {
            padding: 20px 5px;
            h3 {
              margin: 20px;
              padding: 4px 10px;
              border-left: 3px solid #eb6100;
              color: #333;
              font-size: 16px;
              font-weight: bold;
            }
            &>p {
              line-height: 195px;
              text-align: center;
              color: #999;
            }
          }
          p.show_name {
            text-align: center;
            line-height: 24px;
            color: #666;
            span:last-child {
              color: #eb6100;
              cursor: pointer;
              text-decoration: underline;
              font-weight: bolder;
            }            
          }
        }
      }
      ul.show_card {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        &>li {
          width: 48%;
          padding: 0 30px;
          border: 1px solid #fcfcfc;
          margin-bottom: 36px;
          background: #fff;
          box-shadow: 2px 2px 10px #aaa;
          border-radius: 6px;
          .card_wrap {
            .business_info {
              display: flex;
              .avatar {
                height: 105px;
                display: flex;
                align-items: center;
                width: 80px;
                position: relative;
                img {
                  width: 64px;
                  height: 64px;
                  border-radius: 50%;
                }
                p {
                  position: absolute;
                  width: 560px;
                  min-height: 40px;
                  top: -36px;
                  background: #fff;
                  left: 80px;
                  // text-align: center;
                  line-height: 50px;
                  border-radius: 5px;
                  transition: opacity 300ms ease-in;
                  z-index: 2;
                  ol {
                    background: #fff;
                    border-radius: 5px;
                    padding: 10px 24px;
                    li {
                      // padding: 0 10px;
                      line-height: 24px;
                      margin: 0;
                      border: none;
                      word-wrap: break-word;
                      font-size: 14px;
                      text-align-last: left;
                    }
                  }
                }
                .pop_in {
                  opacity: 1;
                }
                .pop_out {
                  opacity: 0;
                }
              }
              .financing_info {
                padding: 15px 0;
                height: 100%;
                width: calc(50% - 40px);
                p {
                  color: #333;
                  line-height: 30px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 14px;
                  span:first-child {
                    color: #666;
                  }
                }
              }
            }
            .btn_inner {
              padding: 20px 0;
              border-top: 1px solid #eaeaea;
              button {
                margin: 0 10px;
                background: none;
                outline: none;
                border: none;
                color: #eb6100;
                font-weight: bold;
                text-decoration: underline;
              }
            }
          }
        }
      }
      .null_data {
        text-align: center;
        background: #fff;
        color: #999;
        padding: 30px;
      }
      .pagenation {
        padding: 16px 0;
        background: #fff;
        text-align: center;
      }
    }
  }
}
.financing_prosess {
  h3 {
    margin: 20px 0;
    padding: 3px 16px;
    border-left: 6px solid #eb6100;
    color: #333;
    font-size: 16px;
  }
}
</style>
<style>
.id_wrap {
  width: 1680px;
}
.business_wrap .el-dialog__header, .id_wrap .el-dialog__header {
  padding: 0
}
.business_wrap .el-dialog__body, .id_wrap .el-dialog__body {
  padding: 0;
  margin-top: -20px;
}
.id_wrap .el-dialog__headerbtn {
  top: 14px;
}
.business_wrap .el-dialog__headerbtn {
  top: 8px;
}
.id_wrap .el-dialog__headerbtn i {
  color: #fff;
  font-weight: bolder;
}
</style>