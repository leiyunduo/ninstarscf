<template>
  <div id="ring">
    <div class="left">
      <div class="left_list">
        <dl class="supplier_title">
          <dt>
            <!-- <img src="../../../static/img/public_ring/supplier.png" alt=""> -->
          </dt>
          <dd>
             <el-popover placement="right" width="auto" trigger="click" v-model="visible">
               <ul>
                 <li @click="supplierTotal(1, item)" v-for="(item, index) in listNav" :key="index">{{item}}</li>
               </ul>
              <p slot="reference" @click="supplierTotal(0)">供应商<i :class="total ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i></p>
            </el-popover>
            <ul>
              <li>{{listData.supplier_name}}</li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="left_list order">
        <dl>
          <dt><img src="../../../static/img/public_ring/supplier_list.png" alt=""><i></i></dt>
          <dd v-for="(item, index) in orderDeposit" :key="index">
            <p @click="orderTotal(index, item, 0)" :class="item.helpFlag ? 'active' : ''">{{item.name}}<i :class="item.helpFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
            <ul v-if='item.helpFlag'>
              <li v-for="(i, index1) in listData.order" :key="index1">{{i.name}}</li>
              <li v-if='listData.order.length === 0'>暂无数据</li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="left_list list_for" v-for="(item, index) in nameTitle" :key="index">
        <dl>
          <dt><img src="../../../static/img/public_ring/supplier_list.png" alt=""><i></i></dt>
          <dd>
            <p :class="item.helpFlag ? 'active' : ''" @click="orderTotal(index, item, 1)">{{item.name}}<i :class="item.helpFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
            <ul v-if='item.helpFlag'>
              <li v-for="(i, index1) in listData.tabData" :key="index1">
                {{i.name}}
              </li>
              <li v-if='listData.tabData.length === 0'>暂无数据</li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
    <div class="center">
      <div class="left_list">
        <dl>
          <dt><img src="../../../static/img/public_ring/me.png" alt=""></dt>
          <dd><p>链主</p></dd>
        </dl>
      </div>
    </div>
    <div class="right">
      <div class="left_list">
        <dl class="supplier_title">
          <dt>
            <!-- <img src="../../../static/img/public_ring/customer.png" alt=""> -->
            </dt>
          <dd>
             <el-popover placement="right" width="auto" trigger="click" v-model="visible1">
               <ul>
                 <li @click="customerTotal(1, item)" v-for="(item, index) in listNav1" :key="index">{{item}}</li>
               </ul>
              <p slot="reference" @click="customerTotal(0)">合同<i :class="total1 ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i></p>
            </el-popover>
            <ul>
              <li>{{listData.supplier_names}}</li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="left_list order">
        <dl>
          <dt><img src="../../../static/img/public_ring/customer_list.png" alt=""><i></i></dt>
          <dd v-for="(item, index) in orderDeposit1" :key="index">
            <p @click="orderCustomer(index, item, 0)" :class="item.helpFlag ? 'active' : ''">{{item.name}}<i :class="item.helpFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
            <ul v-if='item.helpFlag'>
              <li v-for="(i, index1) in listData.order" :key="index1">{{i.name}}</li>
              <li v-if='listData.order.length === 0'>暂无数据</li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="left_list list_for" v-for="(item, index) in nameTitle1" :key="index">
        <dl>
          <dt><img src="../../../static/img/public_ring/customer_list.png" alt=""><i></i></dt>
          <dd>
            <p @click="orderCustomer(index, item, 1)" :class="item.helpFlag ? 'active' : ''">{{item.name}}<i :class="item.helpFlag ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"></i></p>
            <ul v-if='item.helpFlag'>
              <li v-for="(i, index1) in listData.tabData" :key="index1">
                {{i.name}}
              </li>
              <li v-if='listData.tabData.length === 0'>暂无数据</li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ring',
  data () {
    return {
      // 供应商
      total: false,
      total1: false,
      nameTitle: [
        { name: '融资', helpFlag: false },
        { name: '仓单', helpFlag: false },
        { name: '运单', helpFlag: false },
        { name: '验收单', helpFlag: false },
        { name: '结算单', helpFlag: false },
        { name: '发票', helpFlag: false },
        { name: '支付', helpFlag: false },
        { name: '合同结算', helpFlag: false }
        // '融资', '仓单', '运单', '验收单', '结算单', '发票', '支付', '合同结算'
      ],
      orderDeposit: [
        { name: '订单', helpFlag: false },
        { name: '订金', helpFlag: false }
      ],
      nameTitle1: [
        { name: '仓单', helpFlag: false },
        { name: '运单', helpFlag: false },
        { name: '验收单', helpFlag: false },
        { name: '结算单', helpFlag: false },
        { name: '发票', helpFlag: false },
        { name: '支付', helpFlag: false },
        { name: '合同结算', helpFlag: false },
        { name: '还贷', helpFlag: false }
        // ['还贷', '合同结算', '支付', '发票', '结算单', '验收单', '运单', '仓单']
      ],
      orderDeposit1: [
        { name: '订单', helpFlag: false },
        { name: '订金', helpFlag: false }
      ],
      listNav: [],
      visible: false,
      listNav1: [],
      visible1: false,
      listData: {
        supplier_name: '皮鞋采购项目',
        supplier_names: '皮鞋销售项目',
        order: [],
        tabData: []
      }
    }
  },
  methods: {
    // 供应商
    supplierTotal (i, item) {
      const that = this
      if (i === 0) {
        that.total = !that.total
        that.visible = true
        that.listNav = ['九星企业C运动鞋原材料采购', '九星企业C皮鞋原材料采购', '九星企业B跑步鞋采购']
      } else if (i === 1) {
        that.listData.supplier_name = item
        that.visible = false
        // 其他收起
        that.nameTitle.forEach((item) => {
          item.helpFlag = false
        })
        // 订单或订金收起
        that.orderDeposit.forEach((item) => {
          item.helpFlag = false
        })
        // 其他收起
        that.nameTitle1.forEach((item) => {
          item.helpFlag = false
        })
        // 订单或订金收起
        that.orderDeposit1.forEach((item) => {
          item.helpFlag = false
        })
      }
    },
    // 订单 and 订金
    orderTotal (index, item, i) {
      const that = this
      // 其他收起
      that.nameTitle1.forEach((item) => {
        item.helpFlag = false
      })
      // 订单或订金收起
      that.orderDeposit1.forEach((item) => {
        item.helpFlag = false
      })
      if (i === 0) {
        // 订单或订金时，其他收起
        that.nameTitle.forEach((item) => {
          item.helpFlag = false
        })
        // 存储数据
        var listData = that.orderDeposit
        // 先用一个变量接收一个原来的状态值
        var helpFlag = that.orderDeposit[index].helpFlag
        //循环清空所有的状态值
        listData.forEach((item) => {
          item.helpFlag = false
        })
        // 改变状态值
        listData[index].helpFlag = !helpFlag
        that.orderDeposit = listData
        if (index === 0) {
          that.listData.order = [
            {name: '运动鞋采购订单'}
          ]
        } else if (index === 1) {
          that.listData.order = []
        }
      } else {
        // 订单或订金收起
        that.orderDeposit.forEach((item) => {
          item.helpFlag = false
        })
        // 存储数据
        var listData = that.nameTitle
        // 先用一个变量接收一个原来的状态值
        var helpFlag = that.nameTitle[index].helpFlag
        //循环清空所有的状态值
        listData.forEach((item) => {
          item.helpFlag = false
        })
        // 改变状态值
        listData[index].helpFlag = !helpFlag
        that.nameTitle = listData
        if (index === 0) {
          that.listData.tabData = []
        } else if (index === 1) {
          that.listData.tabData = []
        } else if (index === 2) {
          that.listData.tabData = [{name: '运动鞋采购运单'}]
        } else if (index === 3) {
          that.listData.tabData = [{name: '运动鞋采购验收单'}]
        } else if (index === 4) {
          that.listData.tabData = [{name: '运动鞋采购结算单'}]
        } else if (index === 5) {
          that.listData.tabData = [{name: '运动鞋采购发票'}]
        } else if (index === 6) {
          that.listData.tabData = []
        } else if (index === 7) {
          that.listData.tabData = []
        }
      }
    },
    // 买家
    customerTotal (i, item) {
      const that = this
      if (i === 0) {
        that.total1 = !that.total1
        that.visible1 = true
        that.listNav1 = ['九星企业B学生鞋销售(变更1)', '九星企业B跑步鞋销售', '九星企业B铆钉鞋销售']
      } else if (i === 1) {
        that.listData.supplier_names = item
        that.visible1 = false
        // 其他收起
        that.nameTitle1.forEach((item) => {
          item.helpFlag = false
        })
        // 订单或订金收起
        that.orderDeposit1.forEach((item) => {
          item.helpFlag = false
        })
        // 其他收起
        that.nameTitle.forEach((item) => {
          item.helpFlag = false
        })
        // 订单或订金收起
        that.orderDeposit.forEach((item) => {
          item.helpFlag = false
        })
      }
    },
    // 订单 and 订金
    orderCustomer (index, item, i) {
      const that = this
      // 其他收起
      that.nameTitle.forEach((item) => {
        item.helpFlag = false
      })
      // 订单或订金收起
      that.orderDeposit.forEach((item) => {
        item.helpFlag = false
      })
      if (i === 0) {
        // 订单或订金时，其他收起
        that.nameTitle1.forEach((item) => {
          item.helpFlag = false
        })
        // 存储数据
        var listData = that.orderDeposit1
        // 先用一个变量接收一个原来的状态值
        var helpFlag = that.orderDeposit1[index].helpFlag
        //循环清空所有的状态值
        listData.forEach((item) => {
          item.helpFlag = false
        })
        // 改变状态值
        listData[index].helpFlag = !helpFlag
        that.orderDeposit1 = listData
        if (index === 0) {
          that.listData.order = [
            {name: '学生鞋销售订单'}
          ]
        } else if (index === 1) {
          that.listData.order = []
        }
      } else {
        // 订单或订金收起
        that.orderDeposit1.forEach((item) => {
          item.helpFlag = false
        })
        // 存储数据
        var listData = that.nameTitle1
        // 先用一个变量接收一个原来的状态值
        var helpFlag = that.nameTitle1[index].helpFlag
        //循环清空所有的状态值
        listData.forEach((item) => {
          item.helpFlag = false
        })
        // 改变状态值
        listData[index].helpFlag = !helpFlag
        that.nameTitle1 = listData
        if (index === 0) {
          that.listData.tabData = []
        } else if (index === 1) {
          that.listData.tabData = []
        } else if (index === 2) {
          that.listData.tabData = [{name: '学生鞋销售运单'}]
        } else if (index === 3) {
          that.listData.tabData = [{name: '学生鞋销售验收单'}]
        } else if (index === 4) {
          that.listData.tabData = [{name: '学生鞋销售结算单'}]
        } else if (index === 5) {
          that.listData.tabData = [{name: '学生鞋销售发票'}]
        } else if (index === 6) {
          that.listData.tabData = []
        } else if (index === 7) {
          that.listData.tabData = []
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
#ring {
  display: flex;
  width: 100%;
  flex-direction: row;
  min-height: 200px;
  .left,.right {
    flex: 1;
    display: flex;
    flex-direction: row;
    .left_list {
      flex: 1;
      text-align: center;
    }
    .order {
      dl {
        text-align: center;
        dd {
          padding-top: 10px;
          p {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
    .list_for {
      dl {
        text-align: center;
        dt {
          position: relative;
          margin-right: 2px;
          i {
            position: absolute;
            right: 0;
            left: 0;
            height: 1px;
            top: 13px;
            z-index: 1;
          }
          img {
            position: relative;
            z-index: 222;
            margin-right: 10px;
          }
        }
        dd {
          p {
            text-align: center;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
      }
      // ul {
      //   li {
      //     // padding-left: 18px;
      //   }
      // }
    }
    ul {
      li {
        // text-align: left;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        cursor: pointer;
      }
    }
  }
  .left {
    .supplier_title {
      text-align: center;
      margin-right: 5px;
      dd {
        p {
          text-align: center;
          font-size:16px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
          cursor: pointer;
        }
        ul {
          li {
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(56,137,255,1);
          }
        }
      }
    }
    dl {
      dt {
        i {
          border: 1px dashed rgba(12,141,255,1);
        }
      }
      dd {
        p:hover {
          cursor: pointer;
          color:rgba(12,141,255,1);
          .el-icon-caret-bottom {
            color:rgba(12,141,255,1);
          }
          .el-icon-caret-left {
            color:rgba(12,141,255,1);
          }
        }
        .active {
          color:rgba(12,141,255,1) !important;
          .el-icon-caret-bottom {
            color:rgba(12,141,255,1);
          }
          .el-icon-caret-left {
            color:rgba(12,141,255,1);
          }
        }
      }
    }
    .list_for:last-child {
      dl {
        dt {
          position: relative;
          i {
            position: absolute;
            left: 0;
            width: 30px;
          }
        }
      }
    }
    .order {
      dt {
        display: flex;
        i {
          height: 1px;
          flex: 1;
          margin-top: 13px;
          margin-right: 2px;
        }
        img {
          margin-left: 15px;
        }
      }
      dd {
        p {
          text-align: left;
          padding-left: 10px;
        }
      }
    }
    li:hover {
      color: rgba(12,141,255,1);
    }
  }
  .right {
    .supplier_title {
      text-align: center;
      margin-left: 5px;
      dd {
        p {
          text-align: center;
          font-size:16px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
          cursor: pointer;
        }
        ul {
          li {
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(235,97,0,1);
          }
        }
      }
    }
    dl {
      dt {
        i {
          border: 1px dashed rgba(235,97,0,1);
        }
      }
      dd {
        p:hover {
          cursor: pointer;
          color:rgba(235,97,0,1);
          .el-icon-caret-bottom {
            color:rgba(235,97,0,1);
          }
          .el-icon-caret-left {
            color:rgba(235,97,0,1);
          }
        }
        .active {
          color:rgba(235,97,0,1) !important;
          .el-icon-caret-bottom {
            color:rgba(235,97,0,1);
          }
          .el-icon-caret-left {
            color:rgba(235,97,0,1);
          }
        }
      }
    }
    .list_for:last-child {
      dl {
        dt {
          position: relative;
          i {
            position: absolute;
            left: 0;
            width: 30px;
          }
        }
      }
    }
    .order {
      dt {
        display: flex;
        i {
          height: 1px;
          flex: 1;
          margin-top: 13px;
          margin-right: 2px;
        }
        img {
          margin-left: 15px;
        }
      }
      dd {
        p {
          text-align: left;
          padding-left: 10px;
        }
      }
    }
    li:hover {
      color: rgba(235,97,0,1);
    }
  }
  .center {
    .left_list {
      text-align: center;
      padding: 0 45px;
      p {
        font-size:16px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
    }
  }
  .el-icon-caret-bottom {
    color:rgba(51,51,51,1);
  }
  .el-icon-caret-left {
    color:rgba(51,51,51,1);
  }
  dl {
    dd {
      padding-top: 6px;
    }
  }
}
</style>

<style lang="less">
.el-popover {
  z-index: 222 !important;
  position: relative;
  ul {
    li {
      cursor: pointer;
    }
    li:hover {
      color:rgba(56,137,255,1);
    }
  }
}
</style>
