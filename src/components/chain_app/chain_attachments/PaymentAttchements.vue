<template>
  <div class="Attachments">
    <div class="card_title">
      <span>销售合同登记<i class="c_bg_down" :style="down1 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'" @click='down1 = !down1' ></i></span>
    </div>
    <div class="chain">
      <div class="card_list" v-if="!down1">
        <div class="card_item" v-for="(title, index) in titleList" v-if="index < 6" :key="index">
          <div class="item_title">
            <div class="title_symbol">
              <div></div>
            </div>
            <span>{{title.name}}</span>
          </div>
          <div class="item_info">
            <div class="item_card">
              <div class="item_table">
                <div class="teble_title" v-if="checkVal(sContract[index])">
                  <div v-for='(title, ind) in fileList' :key='ind'>{{title}}</div>
                </div>
                <div v-for="(files, fileIndex) in sContract[index]" :key='fileIndex'>
                  <div v-for="(file, fileIndex) in files" :key='fileIndex' v-if="file.attachment.length > 0">
                    <div class="table_line" v-for="(file1, index1) in file.attachment" :key="index1">
                      <div>{{file.name}}</div>
                      <div>{{file1 ? file1.name : ''}}</div>
                      <div>{{`pdf`}}</div>
                      <div>{{filterTime(file.create_time)}}</div>
                      <div><a :href="$root_url() + (file1 ? (file1.location || file1.wt_location): '')" target="blank">查看</a></div>
                    </div>
                  </div>
                </div>
              </div>
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
              <div class="related_item">
                <div class="item_table">
                  <div class="teble_title" v-if="checkVal(selContract[index])">
                    <div v-for='(title, ind) in fileList' :key='ind'>{{title}}</div>
                  </div>
                  <div v-for="(one, trIndex) in selContract[index]" :key="trIndex">
                    <div v-for="(tr, ineIndex) in one" :key="ineIndex" v-if="tr.attachment.length > 0">
                      <div class="table_line" v-for="(file1, index1) in tr.attachment" :key="index1">
                        <div>{{tr.name}}</div>
                        <div>{{file1 ? file1.name : ''}}</div>
                        <div>{{`pdf`}}</div>
                        <div>{{filterTime(tr.create_time)}}</div>
                        <div><a :href="$root_url() + (file1 ? (file1.location || file1.wt_location): '')" target="blank">查看</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card_title">
        <span>关联销售登记<i class="c_bg_down" :style="down3 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'" @click='down3 = !down3' ></i></span>
      </div>
      <div class="card_list" v-if="!down3">
        <div class="card_item" v-for="(title, index) in titleList" v-if="index >= 6" :key="index">
          <div class="item_title">
            <div class="title_symbol">
              <div></div>
            </div>
            <span>{{title.name}}</span>
          </div>
          <div class="item_info">
            <div class="item_card">
              <div class="item_table">
                <div class="teble_title" v-if="checkVal(sContract[index])">
                  <div v-for='(title, ind) in fileList' :key='ind'>{{title}}</div>
                </div>
                <div v-for="(files, fileIndex) in sContract[index]" :key='fileIndex'>
                  <div v-for="(file, fileIndex) in files" :key='fileIndex' v-if="file.attachment.length > 0">
                    <div class="table_line" v-for="(file1, index1) in file.attachment" :key="index1">
                      <div>{{file.name}}</div>
                      <div>{{file1 ? file1.name : ''}}</div>
                      <div>{{`pdf`}}</div>
                      <div>{{filterTime(file.create_time)}}</div>
                      <div><a :href="$root_url() + (file1 ? (file1.location || file1.wt_location): '')" target="blank">查看</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        fileList: ['单据/变更名称', '文件名称', '文件类型', '上传时间', '操作'],
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
        down1: false,
        down2: false,
        down3: false,
        files: [],
        pFIles: [],
        selIndex: 0,
        sContract: [],
        pContract: [],
        selContract: [],
      }
    },
    mounted () { 
      this.$ajax.get(`/api/chain/five_stream/${this.$route.query.id}/attachment_info/`).then(res => {
        if (res.status === 200) {
          let sContract = []
          sContract = this.filterObj(res.data.s_contract)
          this.sContract = sContract
          this.pContract = this.filterArray(res.data.p_contract)
          this.pContract.length !== 0 ? this.selContract = this.pContract[this.selIndex] : this.selContract = []
        }
      })
    },
    methods: {
      changeTab (index) {
        this.selContract = this.pContract[index]
        this.selIndex = index
      },
      checkVal (arr) {
        let flag = false
        if (Array.isArray(arr) && arr.length > 0) {
          arr.forEach(el => {
            el.forEach(val => {
              if (val.attachment.length > 0) {
                flag = true
              }
            })
          })
        }
        return flag
      },
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
        arr[5] = []
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
  .null_file {
    line-height: 43px;
    text-align: center;
    height: 43px;
    color: #999;
    border-top: 1px dashed #eaeaea;
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
      .slide_nav {
        padding: 0 50px;
        line-height: 30px;
        font-size: 14px;
      }
      .card_item {
        padding-top: 30px;
        width: 100%;
        min-height: 100px;
      }
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
          width: 160px;
          text-align: center;
          font-size: 12px;
          border-radius: 3px;
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
      .item_info {
        // background: #fff;
        // box-shadow: 2px 0px 6px #ccc;
        margin-top: 20px;
        width: 100%;
        // padding: 15px;
        .item_card {
          // border: 1px solid #ccc;
          border-left: none;
          background: #fff;
          // padding-bottom: 20px;
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
              background: #eb6100;
              color: #fff;
              border-color: #eb6100;
            }
          }
        }
        .c_add_data{
          border-bottom: 1px solid #eee;
          padding: 0px 50px 10px;
          margin-bottom: 15px;
          font-size: 14px;
        }
        .item_btn {
          border-bottom: 1px solid #ccc;
          font-size: 14px;
          margin-top: 20px;
          span:first-child {
            color: #eb6100;
            border-bottom:4px solid #eb6100;
          }
          span:last-child{
            border-right:none;
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
          span {
            font-weight: bold;
          }
        }
        .item_table {
          width:100%;
          color: #343536;
          p {
            width: 100%;
            padding: 0 15px;
            font-size: 14px;
            color: #333;
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
            p {
              padding: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
                span:first-child, span:last-child {
                  padding: 10px 20px;
                  color: #eb6100;
                  border-bottom: 2px solid #eb6100;
                  margin-right: 10px;
                  cursor: pointer;
                  font-weight: 200;
                }
              }
              p {
                padding: 0 20px;
                border-bottom: 1px solid #eaeaea;
                line-height: 36px;
                display: flex;
                align-items: center;
                // justify-content: space-between;
                font-size: 14px;
                span:first-child {
                  color: #ea544a;
                  margin-right: 100px;
                  font-weight: bolder;
                }
              }
              .supply_btn+p{
                background: #f4f4f4;
                line-height: 48px;
                border-bottom: 1px solid #ccc;
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
              .table_line, .table_line_3{
                border-top: 1px dashed #ccc;
              }
              .teble_title_3, .table_line_3 {
                display: flex;
                height: 44px;
                div {
                  width: 33.3%;
                  text-align: center;
                  line-height: 44px;
                  font-size: 14px;
                }
              }
              .supply_detail {
                border-top: 1px solid #ccc;
                // padding: 0 50px;
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
                    border-bottom: none;
                    padding: 0;
                    color: #999;
                  }
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
            // background: #0099FF;
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
              background: #0099FF;
              color: #fff;
              border-color: #0099FF;
            }
          }
        }
        .related_item {
          width: 100%;
          // margin-top: 30px;
          // min-height: 80px;
          background: #fff;
          // border: 1px solid #ccc;
          border-left: none;
          // margin-top: 20px;
          width: 100%;
          .item_sec_title {
            padding: 15px 40px;
            line-height: 30px;
            font-size: 14px;
            color: #415de3;
            border-bottom: 1px solid #ccc;
            span {
              font-weight: bold;
            }
          }
          .item_card {
            // border: 1px solid #e1e6f0;
            border-left: none;
            background: #fff;
            // border-bottom: 1px solid #eee;
            // padding-bottom: 20px;
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
            margin-top: 20px;
            color: #343536;
            // border: 1px solid #e1e6f0;
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
          // border: 1px solid #ccc;
          border-left: none;
          color: #999;
        }
      }
    }
  }
</style>