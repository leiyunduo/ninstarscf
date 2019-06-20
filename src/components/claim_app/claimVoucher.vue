<template>
  <div class='claimVoucher'>
    <div class='assets_board'>
      <!-- <appNav :father='{selIndex: 2}' type='1'></appNav> -->
      <div class='assets_content'>
        <!-- <div class='assets_list'>
          <h3><img src="../../../static/img/leftbar/myzhaiq.png" alt="">我的债权/债务</h3>
        </div> -->
        <div class="title_location">
          <location :location="location"></location>
        </div>
        <div class="c_assets_bottom">
          <div class="content">
            <div class="content_top">
              <div class="content_top_top">
                <div class="top_left" @click="previousStep">
                  <img src="../../../static/img/claim/1.png" alt="">
                  <p>选择已产生{{nameTitle}}的销售项目</p>
                </div>
                <div class="top_center">
                  <img src="../../../static/img/claim/2_color.png" alt="">
                </div>
                <div class="top_right">
                  <img src="../../../static/img/claim/2_2.png" alt="">
                  <p>选择{{nameTitle}}凭证</p>
                </div>
              </div>
              <div class="content_top_bottom">
                <p>{{nameTitle}}金额（元）：</p>
                <h3>{{toThousands(moneyAmount)}}</h3>
              </div>
            </div>
            <div class="content_bottom" id="id_style">
              <div class="bottom_text">
                <div class="name">
                  <ul>
                    <li>
                      <p>项目名称：</p>
                      <span @click="selectFrom(0)">{{dataItem.name}}</span>
                    </li>
                    <li>
                      <p>{{nameTitle === '债权' ? '债务人' : '债权人'}}：</p>
                      <span @click="selectFrom(1)" :title="dataItem.partner_company_name" :style="!dataItem.detail ? 'color: #999; text-decoration: none;' : ''">{{ dataItem.partner_company_name }}</span>
                    </li>
                  </ul>
                </div>
                <div class="shipment text_content">
                  <div class="text-title">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(0, checkAll)"></el-checkbox>
                    <h3>出货</h3>
                  </div>
                  <div class="mytable">
                    <ul v-for="(item1, index1) in dataItem.warehouse" v-if='dataItem.warehouse.length > 0' :style="index1 % 2 === 0 ? {background:'#FFF'} : {background:'rgba(250,250,250,1)'}" :key="index1">
                      <li>
                        <el-checkbox-group v-model="warehouseChecked" @change="handleCheckedCitiesChange(0, item1, warehouseChecked)">
                          <el-checkbox :label="item1" :key="item1.id"></el-checkbox>
                        </el-checkbox-group>
                        <p>出货单标题：</p>
                        <span>{{item1.name}}</span>
                      </li>
                      <li>
                        <p>出货金额（元）：</p>
                        <span>{{item1.amount}}</span>
                      </li>
                      <li>
                        <p>出单日期：</p>
                        <span>{{item1.date_created}}</span>
                      </li>
                    </ul>
                    <div class="none_data" v-if='dataItem.warehouse.length === 0'>暂无数据</div>
                  </div>
                </div>
                <div class="waybill text_content">
                  <div class="text-title">
                    <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange(1, checkAll1)"></el-checkbox>
                    <h3>运单</h3>
                  </div>
                  <div class="mytable">
                    <ul v-for="(item1, index1) in dataItem.transport" v-if='dataItem.transport.length > 0' :style="index1 % 2 === 0 ? {background:'#FFF'} : {background:'rgba(250,250,250,1)'}" :key="index1">
                      <li>
                        <el-checkbox-group v-model="transportChecked" @change="handleCheckedCitiesChange(1, item1, transportChecked)">
                          <el-checkbox :label="item1" :key="item1.id"></el-checkbox>
                        </el-checkbox-group>
                        <p>运单标题：</p>
                        <span>{{item1.name}}</span>
                      </li>
                      <li>
                        <p>运单金额（元）：</p>
                        <span>{{item1.amount}}</span>
                      </li>
                      <li>
                        <p>出单日期：</p>
                        <span>{{item1.date_created}}</span>
                      </li>
                    </ul>
                    <div class="none_data" v-if='dataItem.transport.length === 0'>暂无数据</div>
                  </div>
                </div>
                <div class="acceptance text_content">
                  <div class="text-title">
                    <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange(2, checkAll2)"></el-checkbox>
                    <h3>验收</h3>
                  </div>
                  <div class="mytable">
                    <ul v-for="(item1, index1) in dataItem.acceptance" v-if='dataItem.acceptance.length > 0' :style="index1 % 2 === 0 ? {background:'#FFF'} : {background:'rgba(250,250,250,1)'}" :key="index1">
                      <li>
                        <el-checkbox-group v-model="acceptanceChecked" @change="handleCheckedCitiesChange(2, item1, acceptanceChecked)">
                          <el-checkbox :label="item1" :key="item1.id"></el-checkbox>
                        </el-checkbox-group>
                        <p>验收入库单标题：</p>
                        <span>{{item1.name}}</span>
                      </li>
                      <li>
                        <p>验收金额（元）：</p>
                        <span>{{item1.amount}}</span>
                      </li>
                      <li>
                        <p>出单日期：</p>
                        <span>{{item1.date_created}}</span>
                      </li>
                    </ul>
                    <div class="none_data" v-if='dataItem.acceptance.length === 0'>暂无数据</div>
                  </div>
                </div>
                <div class="invoice text_content">
                  <div class="text-title">
                    <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange(3, checkAll3)"></el-checkbox>
                    <h3>发票</h3>
                  </div>
                  <div class="mytable">
                    <ul v-for="(item1, index1) in dataItem.invoice" v-if='dataItem.invoice.length > 0' :style="index1 % 2 === 0 ? {background:'#FFF'} : {background:'rgba(250,250,250,1)'}" :key="index1">
                      <li>
                        <el-checkbox-group v-model="invoiceChecked" @change="handleCheckedCitiesChange(3, item1, invoiceChecked)">
                          <el-checkbox :label="item1" :key="item1.id"></el-checkbox>
                        </el-checkbox-group>
                        <p>发票号码：</p>
                        <span>{{item1.invoice_number}}</span>
                      </li>
                      <li>
                        <p>发票金额（元）：</p>
                        <span>{{item1.amount}}</span>
                      </li>
                      <li>
                        <p>出单日期：</p>
                        <span>{{item1.date_created}}</span>
                      </li>
                    </ul>
                    <div class="none_data" v-if='dataItem.invoice.length === 0'>暂无数据</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn">
              <button @click="nextSelect" :style="warehouseChecked.length > 0 || transportChecked.length > 0 || acceptanceChecked.length > 0 || invoiceChecked.length > 0 ? 'background:#eb6100' : 'background:rgba(181, 179, 179)'" :disabled="warehouseChecked.length > 0 || transportChecked.length > 0 || acceptanceChecked.length > 0 || invoiceChecked.length > 0 ? disabled = false : disabled = true">{{btnName}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>根据您所选择的{{nameTitle}}凭证，我们通过计算得出您的{{nameTitle}}金额为<span style="font-size: 14px;font-weight:bold">{{toThousands(moneyAmount)}}</span>（元），若无误，请您确认并提交</span>
      <span slot="footer" class="dialog-footer">
        <button class="cancel" @click="dialogVisible = false">取 消</button>
        <button class="ok" @click="submitDate">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
export default {
  name: 'claimVoucher',
  components: {
    // AppNav, 
    Location
  },
  data () {
    return {
      selIndex: 0,
      cityOptions: [],
      warehouseChecked: [],
      checkAll: false,
      isIndeterminate: false,
      transportChecked: [],
      checkAll1: false,
      isIndeterminate1: false,
      acceptanceChecked: [],
      checkAll2: false,
      isIndeterminate2: false,
      invoiceChecked: [],
      checkAll3: false,
      isIndeterminate3: false,
      dataItem: {
        id: '',
        name: '',
        detail_id: '',
        partner_company_id: '',
        partner_company_name: '',
        // 出库单
        warehouse: [],
        // 运单
        transport: [],
        // 发票
        invoice: [],
        // 验收
        acceptance: []
      },
      dialogVisible: false,
      types: '',
      nameTitle: '',
      list_id: '',
      company_id: '',
      idList: [],
      btnName: '确认并提交'
    }
  },
  computed: {
    moneyAmount () {
      const that = this
      console.log(that.warehouseChecked)
      let arr = []
      let arr1 = []
      arr.push(
        that.warehouseChecked ? that.warehouseChecked.map(item => {return item.amount}) : [],
        that.transportChecked ? that.transportChecked.map(item => {return item.amount}) : [],
        that.acceptanceChecked ? that.acceptanceChecked.map(item => {return item.amount}) : [],
        that.invoiceChecked ? that.invoiceChecked.map(item => {return item.amount}) : []
      )
      arr1 = arr.join().split(',')
      let a = arr1.map(Number)
      let s = 0
      a.forEach(item => {
        s += item
      })
      return s
    }
  },
  mounted() {
    const that = this
    that.types = Number(that.$route.query.type)
    that.types === 1 ? that.nameTitle = '债权' : that.nameTitle = '债务'
    that.list_id = that.$route.query.id
    that.company_id = localStorage.id
    // 详情
    that.$ajax.get(`/api/claims_debts/contract_info/` + that.list_id + '/?contract_type=' + that.types + '&company_id=' + that.company_id).then(res => {
      that.dataItem = res.data
    })
  },
  beforeCreate () {
    const that = this
    that.types = Number(that.$route.query.type)
    that.types === 1 ? that.nameTitle = '债权' : that.nameTitle = '债务'
    that.location = [
      {
        title: '我的债权/债务',
        url: '/claim_app'
      },
      {
        title: that.nameTitle + '登记'
      }
    ]
  },
  methods: {
    // 跳转链式记账以及企业博客
    selectFrom (i) {
      const that = this
      if (i === 0) {
        // 链式记账
        let url = ''
        that.dataItem.chain_type === '1' ? url = '#/chain_app/receive_chain?id=' : url = '#/chain_app/payment_chain?id='
        window.open(url + that.dataItem.chain_id, '_blank')
      } else if (i === 1) {
        // 企业博客
        that.dataItem.detail ? 
        window.open('#/enterpriseBlog?claim=0&bid=' + that.dataItem.partner_company_id)
        :
        ''
      }
    },
    // 返回上一步
    previousStep () {
      const that = this
      that.$router.push({
        path: '/claim_app/claim_register',
        query: {
          type: that.types
        }
      })
    },
    // 关闭
    handleClose () {
      this.dialogVisible = false
    },
    // 全选数据
    handleCheckAllChange(i, val) {
      const that = this
      if (i === 0) {
        that.warehouseChecked = val ? that.dataItem.warehouse : []
        that.isIndeterminate = false
      } else if (i === 1) {
        that.transportChecked = val ? that.dataItem.transport : []
        that.isIndeterminate1 = false
      } else if (i === 2) {
        that.acceptanceChecked = val ? that.dataItem.acceptance : []
        that.isIndeterminate2 = false
      } else if (i === 3) {
        that.invoiceChecked = val ? that.dataItem.invoice : []
        that.isIndeterminate3 = false
      }
    },
    // 全选显示
    handleCheckedCitiesChange(i, item, value) {
      const that = this
      let checkedCount = value.length
      if (i === 0) {
        that.checkAll = checkedCount === that.dataItem.warehouse.length
        that.isIndeterminate = checkedCount > 0 && checkedCount < that.dataItem.warehouse.length
      } else if (i === 1) {
        that.checkAll1 = checkedCount === that.dataItem.transport.length
        that.isIndeterminate1 = checkedCount > 0 && checkedCount < that.dataItem.transport.length
      } else if (i === 2) {
        that.checkAll2 = checkedCount === that.dataItem.transport.length
        that.isIndeterminate2 = checkedCount > 0 && checkedCount < that.dataItem.acceptance.length
      } else if (i === 3) {
        that.checkAll3 = checkedCount === that.dataItem.transport.length
        that.isIndeterminate3 = checkedCount > 0 && checkedCount < that.dataItem.invoice.length
      }
    },
    // 下一步
    nextSelect () {
      const that = this
      that.dialogVisible = true
      let arr = []
      let arr1 = []
      arr.push(
        that.warehouseChecked ? that.warehouseChecked.map(item => {return item.id}) : [],
        that.transportChecked ? that.transportChecked.map(item => {return item.id}) : [],
        that.acceptanceChecked ? that.acceptanceChecked.map(item => {return item.id}) : [],
        that.invoiceChecked ? that.invoiceChecked.map(item => {return item.id}) : []
      )
      arr1 = arr.join().split(',')
      that.idList = arr1.filter(item => item)
    },
    // 确定
    submitDate () {
      const that = this
      let name = ''
      that.types === 1 ? name = 'Claims' : name = 'Debts'
      that.$ajax.post('/api/claims_debts/', {type: 1, contract_id: that.dataItem.id, company_id: that.company_id, id_list: that.idList, amount: that.moneyAmount, create_type: name}).then(res => {
        that.dialogVisible = false
        that.$router.push('/claim_app')
        // if (that.dataItem.detail_id) {
        //   that.btnName = '邀请确认'
        // } else {
        //   that.btnName = '邀请注册'
        // }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.claimVoucher {
  height: 100%;
  .shade_box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.50);
    z-index: 2999;
    .to_display {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .closeWrap{
        position: absolute;
        top: 34px;
        right: 35px;
      }
    }
  }
  // padding-top: 120px;
  .assets_board {
    // width: 1280px;
    margin: 0 auto;
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
  }
  .c_slide_container:hover+.assets_content{
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .assets_content {
    width: 100%;
    background: #f5f7f8;
    min-height: 100%;
    // 信贷统计
    .assets_list {
      height: 60px;
      // display: flex;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      padding-left: 50px;
      background: #fff;
      img {
        margin-right: 10px;
        vertical-align: middle;
      }
      div {
        display: flex;
        height: 100%;
        align-items: center;
        div {
          font-size: 14px;
          color: #3c4046;
        }
      }
    }
    .c_assets_bottom{
      padding: 0 50px 50px;
      .content {
        width: 100%;
        margin-top: 80px;
        height: auto;
        min-height: 300px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(238,238,238,1);
        padding-bottom: 45px;
        .content_top {
          width: 800px;
          height: auto;
          margin: 0 auto;
          padding-top: 43px;
          .content_top_top {
            display: flex;
            flex-direction: row;
          }
          .content_top_bottom {
            text-align: center;
            margin-top: 21px;
            p {
              font-size:14px;
              font-family:MicrosoftYaHei-Bold;
              font-weight:bold;
              color:rgba(51,51,51,1);
            }
            h3 {
              font-size:30px;
              font-family:MicrosoftYaHei-Bold;
              font-weight:bold;
              color:rgba(235,97,0,1);
            }
          }
          .top_center {
            flex: 1;
            padding: 0 70px;
            margin-top: 20px;
            text-align: center;
          }
          .top_left {
            width:99px;
            text-align: center;
            cursor: pointer;
            p {
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(235,97,0,1);
              line-height:16px;
            }
          }
          .top_right {
            width:99px;
            text-align: center;
            p {
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(153,153,153,1);
            }
          }
        }
        .content_bottom {
          padding: 0 40px;
          height:auto;
          .bottom_text {
            margin: 20px 0;
            height:auto;
            padding: 30px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(232,232,232,1);
            .text_content {
              height: auto;
              .text-title {
                margin-top: 10px;
                padding: 0 21px;
                width:100%;
                height:36px;
                background:rgba(238,238,238,1);
                border:1px solid rgba(238,238,238,1);
                line-height: 36px;
                display: flex;
                flex-direction: row;
                h3 {
                  font-size:16px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                  padding-left: 24px;
                }
              }
              ul {
                padding: 0 21px;
                display: flex;
                flex-direction: row;
                li {
                  flex: 1;
                  display: flex;
                  flex-direction: row;
                  height:32px;
                  line-height: 32px;
                  p {
                    font-size:14px;
                    padding-left: 24px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    float: left;
                  }
                  span {
                    font-size:14px;
                    float: left;
                    cursor: pointer;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                  }
                }
              }
              .none_data {
                height:32px;
                line-height: 32px;
                font-size:14px;
                padding-left: 60px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(153,153,153,1);
              }
            }
            .name {
              margin-bottom: 10px;
              ul {
                display: flex;
                flex-direction: row;
                li {
                  p {
                    display: inline-block;
                    width:96px;
                    height:18px;
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                  }
                  span {
                    display: inline-block;
                    width: 300px;
                    font-size:16px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    text-decoration:underline;
                    color:rgba(235,97,0,1);
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }
        .btn {
          margin-top: 100px;
          text-align: center;
          button {
            width:140px;
            height:36px;
            background:rgba(235,97,0,1);
            border:1px solid rgba(238,238,238,1);
            border-radius:4px;
            outline: none;
            font-size:16px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
          }
        }
      }
    }
    .assets_table {
      margin: 13px 50px 0 50px;
      height: 43px;
      background: #fff;
      border: 1px solid #e1e6f0;
      border-radius: 4px;
      ul {
        height: 100%;
        padding: 0 24px;
        display: flex;
        align-items: center;
        li {
          background: none;
          border: 1px solid #eb6100;
          color: #ea6100;
          margin-right: 22px;
          outline: none;
          border-radius: 2px;
          width: 100px;
          height: 30px;
          font-size: 14px;
          cursor: pointer;
          text-align: center;
          line-height: 30px;
        }
        li.sel {
          background: #eb6100;
          color: #fff;
        }
      }
    }
    .assets_card {
      margin: 20px 50px;
      background: #fff;
      border: 1px solid #e1e6f0;
      box-shadow: 0 2px 10px 0 rgba(153, 153, 153, 0.2);
      margin-bottom: 20px;
      border-radius: 4px;
    }
  }
}
.dialog-footer {
  button {
    width: 80px;
    height: 30px;
    outline: none;
    border-radius: 4px;
    margin: 0 10px;
  }
  .cancel {
    border: 1px solid #eb6100;
    background: none;
    color: #eb6100;
  }
  .ok {
    border: none;
    background: #eb6100;
    color: #fff;
  }
}
</style>
<style lang='less'>
.claimVoucher {
  .el-radio__inner {
    width: 16px;
    height: 16px;
  }
  .el-radio__label {
    display: none;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #eb6100;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #eb6100;
    background: #eb6100;
  }
  .el-radio__inner:hover {
    border-color: #eb6100;
  }
  #id_style {
    .el-checkbox__inner:hover {
      border-color: #eb6100;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #eb6100;
      border-color: #eb6100;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #eb6100;
      border-color: #eb6100;
    }
    .el-checkbox__label {
      display: none;
    }
    // .el-checkbox__inner::after {
    //   border: 2px solid #fff;
    //   border-left: 0;
    //   border-top: 0;
    //   height: 11px;
    //   left: 3px;
    //   position: absolute;
    //   top: -2px;
    //   -webkit-transform: rotate(45deg) scaleY(0);
    //   transform: rotate(45deg) scaleY(0);
    //   width: 5px;
    // }
  }
}
</style>
