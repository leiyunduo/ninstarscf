<template>
  <div class="role-person__receive">
    <div class="card_title">
      <span>销售合同登记<i class="c_bg_down" :style="down1 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'" @click='down1 = !down1'></i></span>
    </div>
    <div class="chain">
      <div class="card_list" v-if="!down1">
        <div class="card_item" v-for="(title, index) in titleList" :key="index" v-if="sContract[index]">
          <div class="item_title">
            <div class="title_symbol">
              <div></div>
            </div>
            <span>{{title.name}}</span>
          </div>
          <div class="marginTop">
            <!-- <div class="item_card" v-if="sContract[index].length !== 0">
              <div class="item_sec_title">参与角色</div>
              <div class="item_table">
                <div class="teble_title">
                  <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                </div>
                <div class="item_table_line" v-for="(one, trIndex) in sContract[index]" :key="trIndex" v-if="trIndex === 0">
                  <div class="table_line" v-for="(tr, ineIndex) in one" :key="ineIndex" v-if="ineIndex === 0">
                    <div :class="tr.operator ? 'person-link__o' : ''" @click="getPersonInfoById(tr.operator, tr.operator_name)">{{tr.operator_name}}</div>
                    <div :class="tr.verifier_name ? 'person-link__o' : ''" @click="getPersonInfoById(tr.verifier, tr.verifier_name)">{{tr.verifier_name ? tr.verifier_name : '未审核'}}</div>
                    <div :class="tr.approved ? 'person-link__o' : ''" @click="getPersonInfoById(tr.approved, tr.approved_name)">{{tr.approved_name ? tr.approved_name : '未确认'}}</div>
                    <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                    <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : 'CFCA'}}</span><span></span></div>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="item_card" v-if="sContract[index].length !== 0">
              <div class="item_table" v-for="(one, trIndex) in sContract[index]" :key="trIndex">
                <div v-for="(log, logIndex) in one" :key="logIndex">
                  <p class="item_table_border"><span style="color:#eb6100;font-weight: bolder">【{{log.name}}】</span> 创建时间：{{filterTime(log.create_time)}}</p>
                  <div class="teble_title">
                    <div v-for='(title, ind) in roleList' :key='ind' class="log_title">{{title}}</div>
                  </div>
                  <div class="table_line">
                    <div :class="log.operator ? 'person-link__o' : ''" @click="getPersonInfoById(log.operator, log.operator_name)">{{log.operator_name}}</div>
                    <div :class="log.verifier_name ? 'person-link__o' : ''" @click="getPersonInfoById(log.verifier, log.verifier_name)">{{log.verifier_name ? log.verifier_name : '未审核'}}</div>
                    <div :class="log.approved ? 'person-link__o' : ''" @click="getPersonInfoById(log.approved, log.approved_name)">{{log.approved_name ? log.approved_name : '未确认'}}</div>
                    <div @click="roleClick(log)">{{log.service_role ? log.service_role : '九星'}}</div>
                    <div><span @click="Authentication(log.auth_role)">{{log.auth_role ? log.auth_role : 'CFCA'}}</span><span></span></div>
                    <div>
                      <span class="person-link__o"  @click="getAgentInfoById(v.id, v.name)" v-for="(v, i)  in log.agent_list" v-if="i===0" :key="i">{{v.name}}</span>
                      <span class="person-link__o"  @click="getAgentInfoById(v.id, v.name)" v-for="(v, i) in log.agent_list" v-if="i > 0" :key="i"><i>, </i>{{v.name || ''}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="sContract[index].length === 0" class="card_null">
              {{'暂无' + title.name}}
            </div>
          </div>
        </div>
      </div>
      <!-- 关联 -->
      <div class="retaled">
        <div class="card_title">
          <span>采购合同登记<i class="c_bg_down" @click='down2 = !down2' :style="down2 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'"></i></span>
        </div>
        <div class="related_tab">
          <ul>
            <li v-for="(contact, i) in pContract" :key='i' @click="changeTab(i)" :style='selIndex === i ? "background: #38adff; color: #fff" : ""'>{{'关联合同' + (i + 1)}}</li>
          </ul>
        </div>
        <div class="related_list" v-if="!down2">
          <div class="card_item" v-for="(title, index) in titleList" :key="index" v-if="selContract[index]">
            <div class="item_title">
              <div class="title_symbol">
                <div></div>
              </div>
              <span>{{title.name}}</span>
            </div>
            <div>
              <!-- <div class="related_item" v-if="selContract[index].length !== 0">
                <div class="item_sec_title">参与角色</div>
                <div class="item_table">
                  <div class="teble_title">
                    <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                  </div>
                  <div class="" v-for="(one, trIndex) in sContract[index]" :key="trIndex" v-if="trIndex === 0">
                    <div class="table_line" v-for="(tr, ineIndex) in one" :key="ineIndex" v-if="ineIndex === 0">
                      <div :class="tr.operator ? 'person-link__b' : ''" @click="getPersonInfoById(tr.operator, tr.operator_name)">{{tr.operator_name}}</div>
                      <div :class="tr.verifier_name ? 'person-link__b' : ''" @click="getPersonInfoById(tr.verifier, tr.verifier_name)">{{tr.verifier_name ? tr.verifier_name : '未审核'}}</div>
                      <div :class="tr.approved ? 'person-link__b' : ''" @click="getPersonInfoById(tr.approved, tr.approved_name)">{{tr.approved_name ? tr.approved_name : '未确认'}}</div>
                      <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                      <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : 'CFCA'}}</span><span></span></div>
                    </div>
                  </div>
                </div>
              </div> -->
              <div class="related_item" v-if="selContract[index].length !== 0" >
                <div class="item_table" v-for="(one, trIndex) in selContract[index]" :key="trIndex">
                  <div v-for="(log, logIndex) in one" :key="logIndex">
                    <p class="item_table_border"><span style="color:#415de3;font-weight: bolder">【{{log.name}}】</span>创建时间：{{filterTime(log.create_time)}}</p>
                    <div class="teble_title">
                      <div v-for='(title, ind) in roleList' :key='ind' class="log_title">{{title}}</div>
                    </div>
                    <div class="table_line">
                      <div :class="log.operator ? 'person-link__b' : ''" @click="getPersonInfoById(log.operator, log.operator_name)">{{log.operator_name}}</div>
                      <div :class="log.verifier_name ? 'person-link__b' : ''" @click="getPersonInfoById(log.verifier, log.verifier_name)">{{log.verifier_name ? log.verifier_name : '未审核'}}</div>
                      <div :class="log.approved ? 'person-link__b' : ''" @click="getPersonInfoById(log.approved, log.approved_name)">{{log.approved_name ? log.approved_name : '未确认'}}</div>
                      <div @click="roleClick(log)">{{log.service_role ? log.service_role : '九星'}}</div>
                      <div><span @click="Authentication(log.auth_role)">{{log.auth_role ? log.auth_role : 'CFCA'}}</span><span></span></div>
                      <div>
                        <span class="person-link__o"  @click="getAgentInfoById(v.id, v.name)" v-for="(v, i)  in log.agent_list" v-if="i===0" :key="i">{{v.name}}</span>
                        <span class="person-link__o"  @click="getAgentInfoById(v.id, v.name)" v-for="(v, i) in log.agent_list" v-if="i > 0" :key="i"><i>, </i>{{v.name || ''}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selContract[index].length === 0" class="card_null">
                {{'暂无' + title.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <person-info v-if="dialogVisible" :pid="personId" :pName="personName" @closeView="closeview"  :isAgent="is_agent"/>
  </div>
</template>

<script>
  import PersonInfo from '@/components/public/person-info'
  export default {
    name: '',
    components: {
      PersonInfo
    },
    data () {
      return {
        dialogVisible: false,
        dialogImgVisible: false,
        roleList: ['操作方', '审核方', '确认方', '服务方', '认证方', '经办人'],
        logList: ['操作方', '审核方', '确认方', '内容', '经办人'],
        titleList: [
          {name: 'B2B销售合同', operate: '+ 添加B2B销售合同', url: '/receivableContractCreate'},
          {name: 'B2B订金', operate: '+ 添加B2B应收订金', url: '/receivableDepositCreate'},
          {name: 'B2B销售订单计划', operate: '+ 添加B2B销售订单计划', url: '/receivablePlanCreate'},
          {name: '仓储合同', operate: '+ 添加仓储合同', url: '/warehousingContract1'},
          {name: '运输合同', operate: '+ 添加运输合同', url: '/logisticsContract1'},
          {name: '融资计划', operate: '+ 添加融资计划', url: '/financingPlan1'},
          {name: 'B2B电子订单', operate: '+ 添加B2B电子订单', url: '/orderList1'},
          {name: 'B2B电子出货单', operate: '+ 添加B2B电子出货单', url: '/waybillList1'},
          {name: 'B2B电子运单', operate: '+ 添加B2B电子运单', url: '/receipt1'},
          {name: 'B2B验收入库单', operate: '+ 添加B2B验收入库单', url: '/WarehouseReceiptList1'},
          {name: 'B2B订单结算', operate: '+ 添加B2B订单结算', url: '/settlement1'},
          {name: 'B2B发票', operate: '+ 添加B2B发票', url: '/invoice1'},
          {name: 'B2B支付', operate: '+ 添加B2B支付', url: '/payment1'},
          {name: 'B2B合同结算', operate: '+ 添加B2B合同结算', url: '/contractSettlement1'}
        ],
        relatedTableList: [
          {name: 'B2B采购合同', operate: '+ 添加B2B采购合同', url: '/receivableContractCreate'},
          {name: 'B2B订金', operate: '+ 添加B2B应付订金', url: '/receivableDepositCreate'},
          {name: 'B2B采购订单计划', operate: '+ 添加B2B采购订单计划', url: '/receivablePlanCreate'},
          {name: '仓储合同', operate: '+ 添加仓储合同', url: '/warehousingContract1'},
          {name: '运输合同', operate: '+ 添加运输合同', url: '/logisticsContract1'},
          {name: '融资计划', operate: '+ 添加融资计划', url: '/financingPlan1'},
          {name: 'B2B电子订单', operate: '+ 添加B2B电子订单', url: '/orderList1'},
          {name: 'B2B电子出货单', operate: '+ 添加B2B电子出货单', url: '/waybillList1'},
          {name: 'B2B电子运单', operate: '+ 添加B2B电子运单', url: '/receipt1'},
          {name: 'B2B验收入库单', operate: '+ 添加B2B验收入库单', url: '/WarehouseReceiptList1'},
          {name: 'B2B订单结算', operate: '+ 添加订单B2B结算', url: '/settlement1'},
          {name: 'B2B发票', operate: '+ 添加B2B发票', url: '/invoice1'},
          {name: 'B2B支付', operate: '+ 添加B2B支付', url: '/payment1'},
          {name: 'B2B合同结算', operate: '+ 添加B2B合同结算', url: '/contractSettlement1'}
        ],
        selIndex: 0,
        down1: false,
        down2: false,
        down3: false,
        sContract: [],
        pContract: [],
        selContract: [],
        userType: '',
        imgView: '',
        personId: '',
        personName: '',
        is_agent: false
      }
    },
    mounted () { 
      var that = this
      this.userType  = localStorage.role
      this.$ajax.get(`/api/chain/five_stream/${that.$route.query.id}/ledger_log/`).then(res => {
        if (res.status === 200) {
          this.roleModal = res.data
          this.sContract = this.filterObj(res.data.s_contract)
          this.pContract = this.filterArray(res.data.p_contract)
          this.pContract.length !== 0 ? this.selContract = this.pContract[this.selIndex] : this.selContract = []
        }
      })
    },
    methods: {
      closeview () {
        this.dialogVisible = false
      },
      getPersonInfoById (id, name) {
        if (!name) return
        this.personId = id
        this.personName = name
        this.dialogVisible = true
        this.is_agent = false
      },
      getAgentInfoById (id, name) {
        if (!name) return
        this.personId = id
        this.personName = name
        this.dialogVisible = true
        this.is_agent = true
      },
      changeTab (index) {
        this.selContract = this.pContract[index]
        this.selIndex = index
      },
      roleClick () {},
      Authentication () {},
      filterArray: function (arr) {
        const that = this
        let Arr = []
        arr.forEach(val => {
          Arr.push(that.filterObj(val))
        })
        return Arr
      },
      filterObj: function (obj) {
        let arr = []
        arr[0] = [obj.Contract]
        arr[1] = obj.Deposit
        arr[2] = obj.OrderPlan
        arr[3] = obj.WarehouseContract
        arr[4] = obj.TransportContract
        arr[5] = obj.FinancingPlan
        arr[6] = obj.Order
        arr[7] = obj.Warehouse
        arr[8] = obj.Transport
        arr[9] = obj.Acceptance
        arr[10] = obj.Settlement
        arr[11] = obj.Invoice
        arr[12] = obj.Payment
        arr[13] = [] 
        return arr
      },
      filterTime (str) {
        if (str) {
          return str.replace('T', ' ').substr('0', str.indexOf('.'))
        } else {
          return ''
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .item_table_border {
    border-top: 1px solid #cccccc;
  }
  .marginTop {
    margin-top: 20px;
  }
  .imgView {
    text-align: center;
  }
  .item_table_line {
    border-bottom: 1px solid #e1e6f0;
  }
  .person-link__o {
    color: #eb6100;
    text-decoration: underline
  }
  .person-link__b {
    color: #415de3;
    text-decoration: underline
  }
  .chain_list {
    margin-top: 20px;
    padding: 0 50px;
    position: relative;
    &.c_tab_3 .item_table{
      border-bottom: 1px solid #ccc;
      &:last-of-type{
        border-bottom: none;
      }
    }
    .chain {
      border-left: 1px dashed #999;
      .retaled {
        .card_title {
          border-bottom: 2px solid #415de3;
          i.c_bg_down {
            color: #415de3;
            background: url("../../../../static/img/downchain.png") no-repeat center center;
          }
        }
      }
    }
    .card_title {
      height: 40px;
      position: relative;
      line-height: 40px;
      text-align: center;
      border-bottom: 2px solid #eb6100;
      width: 100%;
      font-size: 20px;
      margin: 0 auto;
      margin-bottom: 20px;
      &>span {
        font-weight: bold;
        position:relative;
        .c_bg_down{
          position: absolute;
          top:37px;
          left:50%;
          width:20px;
          height:14px;
          background: url("../../../../static/img/chaindown.png") no-repeat center center;
          display: inline-block;
        }
      }
      .slide_down {
        top: 10px;
        position: absolute;
        right: 0;
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;;
        .icon {
          font-size: 12px;;
          transition: all .3s;
        }
      }
      i {
        transition: all 0.14s ease-in;
      }
    }
    .card_list {
      .card_item {
        width: 100%;
        padding-top: 30px;
        min-height: 100px;
        .item_title {
          height: 30px;
          line-height: 30px;
          cursor: visible;
          position: relative;
          .title_symbol {
            width: 24px;
            height: 24px;
            position: absolute;
            left: -13px;
            top: 5px;
            /*border: 1px solid #eb6100;*/
            background: #f3d9c6;
            border-radius: 50%;
            div {
              width: 13px;
              height: 13px;;
              background: #eb6100;
              border-radius: 50%;
              margin: 5px auto;
            }
          }
          span {
            font-size: 14px;
            margin: 0 10px;
          }
          span:nth-child(2) {
            font-weight: bold;
            font-size: 18px;
            margin-left: 30px;
            color: #333;
          }
          span:nth-child(3) {
            height: 30px;
            // padding: 0px 20px;
            width: 160px;
            text-align: center;
            font-size: 12px;
            border-radius: 3px;
            // background: #eb6100;
            background: #fff;
            border: 1px solid #cccccc;
            border-left: none;
            cursor: pointer;
            // color: #fff;
            position: absolute;
            // right: 0px;
            left: -10px;
            top: 40px;
            &:hover{
              background: #eb6100;
              color: #fff;
              border-color: #eb6100;
            }
          }
        }
      }
      .item_info {
        // background: #fff;
        // border: 1px solid #eee;
        // box-shadow: 2px 0px 6px #ccc;
        margin-top: 20px;
        width: 100%;
        // padding: 15px;
      }
      .item_card {
        // border: 1px solid #e1e6f0;
        border-left: none;
        background: #fff;
        // padding-bottom: 20px;
        margin-bottom: 20px;
        position: relative;//为每个新增按钮的定位
      }
      .card_null {
        line-height: 160px;
        text-align: center;
        background: #fff;
        border: 1px solid #e1e6f0;
        border-left: none;
        color: #999;
      }
      .item_btn {
        font-size: 14px;
        border-bottom:1px solid #ccc;
        margin-top: 20px;
        span:first-child {
          color: #eb6100;
          border-bottom:4px solid #eb6100;
        }
        span:last-child{
          color: #eb6100;
          border-bottom:4px solid #eb6100;
          margin-left: 20px;
        }
        span {
          display: inline-block;
          padding: 10px 34px;
          cursor: pointer;
        }
      }
      .item_sec_title {
        padding: 15px 40px;
        font-size: 14px;
        color: #eb6100;
        border-top: 1px solid #e1e6f0;
        span {
          font-weight: bold;
        }
      }
      .item_table {
        width:100%;
        display: inline-block;
        color: #343536;
        &>div {
          border-bottom: 1px solid #e1e6f0;
        }
        p {
          width: 100%;
          padding: 0 15px;
          font-size: 14px;
          color: #999;
          height: 50px;
          line-height: 50px;
          display: flex;
          background: #f4f4f4;
          // border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          // justify-content: space-between;
          .timestamp {
            color: #ea544a;
            margin-right: 100px;
            font-weight: bolder;
          }
        }
        .teble_title {
          display: flex;
          align-items: center;
          height: 44px;
          line-height: 44px;
          // border: 1px solid #eee;
          font-size: 14px;
          margin: 0 50px;
          div {
            flex:1;
            text-align: center;
          }
          div.log_title:last-child {
            width: 320px;
          }
        }
        .table_line {
          display: flex;
          min-height: 44px;
          font-size: 14px;
          border-top: 1px dashed #ccc;
          margin: 0 50px;
          div {
            min-height: 44px;
            line-height: 44px;
            flex:1;
            text-align: center;
            cursor: pointer;
          }
          div.td_loginfo {
            width: 320px;
          }
          a {
            color: #eb6100;
          }
        }
        .item_title1 {
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          font-size: 14px;
          line-height: 48px;
          background: #f4f4f4;
          height:48px;
          padding: 0 15px;
        }
      }
      .item_no_table {
        height: 60px;
        line-height: 60px;
        color: #999;
        text-align: center;
      }
      .item_detail {
        color: #999;
        padding: 10px 50px 0px 50px;
        border-top: 1px solid #ccc;
        .detail_line {
          font-size: 14px;
          line-height: 32px;
          p {
            padding: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background: #fff;
            border: none;
          }
          span{
            display: inline-block;
            width: 33%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .detail_time {
            margin-left: 0 15px;
            color: #999;
          }
        }
      }
      .show_suppy_wrap {
        padding: 0 50px;
        .show_supply_title {
          line-height: 36px;
          color: #eb6100;
          font-size: 14px;
        }
        .supply_list {
          // padding: 0 20px;
          .supply_table {
            margin: 20px 0;
            p.supply_btn {
              border-bottom: 1px solid #ccc;
              line-height: 20px;
              padding: 0;
              display: block;
              padding: 10px 0px;
              height: auto;
              background: #fff;
              span:first-child, span:last-child {
                padding: 10px 20px;
                color: #eb6100;
                border-bottom: 2px solid #eb6100;
                margin-right: 10px;
                cursor: pointer;
                font-weight: 200;
              }
            }
            p.supply_btn+p{
              line-height: 50px;
              height: 50px;
              background: #f4f4f4;
            }
            p {
              padding: 0 20px;
              line-height: 36px;
              display: flex;
              align-items: center;
              // justify-content: space-between;
              font-size: 14px;
              span:last-child {
                color: #ea544a;
                margin-right: 100px;
                font-weight: bolder;
              }
            }
            .teble_title, .table_line {
              display: flex;
              height: 44px;
              div {
                // width: 25%;
                flex: 1;
                text-align: center;
                line-height: 36px;
                font-size: 14px;
                cursor: pointer;
              }
            }
            .table_line{
              border-top: 1px dashed #ccc;
            }
            .teble_title_3, .table_line_3 {
              display: flex;
              height: 36px;
              border-bottom: 1px solid #eaeaea;
              div {
                width: 33.3%;
                text-align: center;
                line-height: 36px;
                border-left: 1px solid #eaeaea;
                font-size: 14px;
              }
              div:last-child {
                border-right: 1px solid #eaeaea;
              }
            }
            .supply_detail {
              margin-top: 20px;
              border-top: 1px solid #ccc;
              .detail_line {
                display: flex;
                height: 36px;
                span {
                  width: 33%;
                  line-height: 36px;;
                  color: #999;
                  font-size: 14px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                p {
                  line-height: 36px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 14px;
                  width: 100%;
                  border: none;
                  padding: 0;
                  color: #999;
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
    .retaled {
      .related_tab {
        ul {
          display: flex;
          width: 95%;
          margin: 0 auto;
          border-bottom: 2px solid #e1e6f0;
          li {
            font-size: 14px;
            padding: 0 20px;
            cursor: pointer;
            line-height: 36px;
          }
        }
      }
      .related_list {
        // background: #fff;
        .item_title {
          height: 30px;
          line-height: 30px;
          // background: #000;
          cursor: visible;
          margin-top: 30px;
          position: relative;
          .title_symbol {
            width: 24px;
            height: 24px;
            position: absolute;
            left: -13px;
            top: 5px;
            background: #d1d8f4;
            border-radius: 50%;
            div {
              width: 13px;
              height: 13px;;
              background: #415de3;
              border-radius: 50%;
              margin: 5px auto;
            }
          }
          span {
            font-size: 14px;
            margin: 0 10px;
          }
          span:nth-child(2) {
            font-weight: bold;
            font-size: 18px;
            color: #333;
            margin-left: 30px;
          }
          span:nth-child(3) {
            // padding: 0px 20px;
            width: 160px;
            text-align: center;
            font-size: 12px;
            border-radius: 3px;
            background: #fff;
            border: 1px solid #cccccc;
            border-left: none;
            cursor: pointer;
            position: absolute;
            left: -10px;
            top: 40px;
            &:hover{
              background: #0099FF;
              color: #fff;
              border-color: #0099FF;
            }
          }
        }
        .related_item {
          width: 100%;
          margin-top: 20px; 
          background: #fff;
          border-left: none;
          // border: 1px solid #e1e6f0;
          width: 100%;
          .item_sec_title {
            padding: 15px 40px;
            line-height: 30px;
            font-size: 14px;
            color: #415de3;
            border-top: 1px solid #e1e6f0;
            span {
              font-weight: bold;
            }
          }
          .item_card {
            border: 1px solid #ccc;
            border-left: none;
            background: #fff;
            padding-bottom: 20px;
            margin-bottom: 20px;
            position: relative;//为每个新增按钮的定位
            .c_add_new_btn{
              position: absolute;
              right: 10px;
              top: 17px;
              height: 30px;
              line-height: 30px;
              width: 160px;
              text-align: center;
              font-size: 12px;
              border-radius: 3px;
              background: #fff;
              border: 1px solid #cccccc;
              cursor: pointer;
              &:hover{
                background: #0099FF;
                color: #fff;
                border-color: #0099FF;
              }
            }
          }
          .item_btn {
            font-size: 14px;
            border-bottom:1px solid #ccc;
            margin-top: 10px;
            span:first-child {
              color: #415de3;
              border-bottom:4px solid #415de3;
            }
            span:last-child{
              color: #415de3;
              border-bottom:4px solid #415de3;
              margin-left: 20px;
            }
            span {
              display: inline-block;
              padding: 10px 34px;
              cursor: pointer;
            }
          }
          .item_table {
            width:100%;
            border-bottom: 1px solid #e1e6f0;
            color: #343536;
            p {
              width: 100%;
              font-size: 14px;
              color: #999;
              height: 50px;
              line-height: 50px;
              padding: 0 15px;
              border-bottom: 1px solid #ccc;
              background: #f4f4f4;
              display: flex;
              span {
                color: #000;
                font-weight: bolder;
              }
              .timestamp {
                color: #ea544a;
                margin-right: 100px;
                font-weight: bolder;
              }
            }
            .teble_title {
              display: flex;
              align-items: center;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              margin: 0 50px;
              div {
                flex:1;
                text-align: center;
              }
              div.log_title :last-of-type{
                width: 320px;
              }
            }
            .table_line {
              display: flex;
              min-height: 40px;
              font-size: 14px;
              margin: 0 50px;
              border-top: 1px dashed #ccc;
              div {
                min-height: 40px;
                line-height: 40px;
                flex:1;
                text-align: center;
                cursor: pointer;
              }
              a {
                color: #eb6100;
              }
            }
            .item_title1 {
              border-top: 1px solid #ccc;
              border-bottom: 1px solid #ccc;
              font-size: 14px;
              line-height: 48px;
              background: #f4f4f4;
              height:48px;
              padding: 0 15px;
            }
          }
          .item_no_table {
            height: 60px;
            line-height: 60px;
            color: #999;
            text-align: center;
          }
          .item_detail {
            padding: 0 50px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            color: #999;
            .detail_line {
              font-size: 14px;
              line-height: 28px;
              span{
                display: inline-block;
                width: 32%;
              }
              .detail_time {
                margin-left: 0 15px;
                color: #999;
              }
              p {
                padding: 0;
                color: #999;
                background: #fff;
                padding: 0;
                border: none;
              }
            }
          }
          .show_suppy_wrap {
            padding: 0 50px;
            .show_supply_title {
                line-height: 36px;
              color: #415de3;
              border-bottom: 1px solid #eaeaea;
              font-size: 14px;
            }
            .supply_list {
              .supply_table {
                margin: 20px 0;
                p.supply_btn {
                  border-bottom: 1px solid #ccc;
                  line-height: 20px;
                  padding: 0;
                  display: block;
                  padding: 10px 0px;
                  height: auto;
                  background: #fff;
                  span:first-child, span:last-child {
                    padding: 10px 20px;
                    color: #415de3;
                    border-bottom: 2px solid #415de3;
                    margin-right: 10px;
                    cursor: pointer;
                    font-weight: 200;
                  }
                }
                p.supply_btn+p{
                  line-height: 50px;
                  height: 50px;
                  background: #f4f4f4;
                }
                p {
                  padding: 0 20px;
                  border-bottom: 1px solid #eaeaea;
                  line-height: 36px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  font-size: 14px;
                  span:first-child {
                    color: #ea544a;
                    margin-right: 100px;
                    font-weight: bolder;
                  }
                }
                .teble_title, .table_line {
                  display: flex;
                  height: 44px;
                  div {
                    // width: 25%;
                    flex: 1;
                    text-align: center;
                    line-height: 36px;
                    font-size: 14px;
                    cursor: pointer;
                  }
                }
                .table_line{
                  border-top: 1px dashed #ccc;
                }
                .teble_title_3, .table_line_3 {
                  display: flex;
                  height: 36px;
                  border-bottom: 1px solid #eaeaea;
                  div {
                    width: 33.3%;
                    text-align: center;
                    line-height: 36px;
                    border-left: 1px solid #eaeaea;
                    font-size: 14px;
                  }
                  div:last-child {
                    border-right: 1px solid #eaeaea;
                  }
                }
                .supply_detail {
                  margin-top: 20px;
                  border-top: 1px solid #ccc;
                  .detail_line {
                    display: flex;
                    height: 36px;
                    span {
                      width: 33%;
                      line-height: 36px;
                      color: #999;
                      font-size: 14px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    p {
                      line-height: 36px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      font-size: 14px;
                      width: 100%;
                      border: none;
                      padding: 0;
                      color: #999;
                      background: #fff;
                    }
                  }
                }
              }
            }
          }
        }
        .related_item:nth-child(2) {
          margin-top: 20px;
        }
        .card_null {
          line-height: 160px;
          text-align: center;
          background: #fff;
          border: 1px solid #e1e6f0;
          border-left: none;
          color: #999;
        }
      }
    }
  }
</style>