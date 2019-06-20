<template>
  <div class="settlement_edit">
    <!-- 表单数据 -->
    <div class="form">
      <div class="form_title">
        <div>
          <span></span>
          <span>结算</span>
        </div>
        <div>
          <span>创建时间：</span>
          <span>{{getTime(subData.create_time)}}</span>
        </div>
      </div>
      <div class="form_line">
        <div class="form_item">
          <div class="form_item_title">
            <!-- <div>
              <img src="/static/img/chain/require.png">
            </div> -->
            <div><span class="required">*</span>结算单标题</div>
          </div>
          <div class="form_item_info">
            <div>{{subData.name}}</div>
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_title">
            <div><span class="required">*</span>出单日期</div>
          </div>
          <div class="form_item_info">
            <div :style='!subData.date_created ? "color: #999" : "#333"'>{{ subData.date_created ? subData.date_created : '未选择出单日期'}}</div>
          </div>
        </div>
      </div>
      <div class="form_line" style="border: none">
        <div class="form_item">
          <div class="form_item_title">
            <div><span class="required">*</span>结算金额（元）</div>
          </div>
          <div class="form_item_info">
            <div>{{subData.amount}}</div>
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_title">
            <div><span class="required">*</span>预计支付时间</div>
          </div>
          <div class="form_item_info">
            <div>{{subData.p_date}}</div>
          </div>
        </div>
      </div>
      <p class="about_title">关联电子订单</p>
      <ul class="about_list" v-if="about.length !== 0">
        <li v-for="(item, index) in about" :key="index" class="checked">{{item.name}}</li>
      </ul>
      <ul class="about_list" v-if="about.length === 0">
        <li class="is_null">未关联订单</li>
      </ul>
    </div>
    <!-- 订单表格 -->
    <div class="table">
      <div class="table_title">
        <div>
          <span></span>
          <span>订单结算信息</span>
        </div>
      </div>
      <table class="order_table">
        <tr class="order_table_title">
          <td>订单标题</td>
          <td>结算金额（元）</td>
          <!-- <td>
            <span>操作</span>
          </td> -->
        </tr>
        <tr v-for="(item, index) in orderInfo" :key='index' class="order_table_line">
          <td>{{item.name}}</td>
          <td>{{item.value}}</td>
          <!-- <td>
            <span @click="handleOrder(index)">{{item.isEdit ? '保存' : '修改'}}</span>
          </td> -->
        </tr>
      </table>
      <div v-if="orderInfo.length === 0" class="null_order">请选择要结算的订单</div>
      <!-- <chainTableView :tableData='tableData'></chainTableView> -->
    </div>
    <!-- 上传附件 -->
    <div class="upload">
      <div class="upload_title">
        <div>
          <span></span>
          <span>电子原件或扫描件</span>
        </div>
      </div>
      <chainUploadView :tableData='uploadData'></chainUploadView>
    </div>
    <div class="info">
      <div class="info_title">
        <div>
          <span></span>
          <span>经办人</span>
        </div>
      </div>
      <agent-invite-view :tableData='subData.agent' />
    </div>
    <!-- 补充 -->
    <div class="info">
      <div class="info_title">
        <div>
          <span></span>
          <span>添加备注及说明</span>
        </div>
      </div>
      <div class="info_detail" :style="subData.info ? 'color: #333' : 'color: #999'">{{subData.note ? subData.note : '未填写单据补充'}}</div>
    </div>
  </div>
</template>
<script>
import chainTableView from '@/components/chain_app/base/public/chainTableView'
import chainUploadView from '@/components/chain_app/base/public/chainUploadView'
import AgentInviteView from '@/components/chain_app/base/public/agentTableView'
export default {
  name: 'settlementView',
  components: {
    chainTableView, chainUploadView, AgentInviteView
  },
  data () {
    return {
      subData: {},
      about: [],
      orderInfo: [],
      uploadData: [],
      slide: []
    }
  },
  props: {
    // 当前id
    selId: {
      type: String
    }
  },
  mounted () {
    this.handleAjax(this.$route.query.settlement_id, true)
  },
  methods: {
    getTime (str) {
      if (str) return str.replace('T', ' ').substr(0, str.indexOf('.'))
    },
    handleAjax (id, sw) {
      const that = this
      if (that.$route.query.settlement_id) {
        that.$ajax.get(`/api/chain/settlement/${id}/`).then(res => {
          if (res.status === 200) {
            // 获取展示数据，将数据传递给组件（table, upload）
            that.subData = res.data
            that.subData.agent = res.data.agent_list
            that.about = res.data.order_list
            that.orderInfo = res.data.order_info || []
            that.uploadData = res.data.att_list
            // this.formData.push({subData: res.data, orderInfo: res.data.orderInfo, uploadData: res.data.att_list})
            if (sw) {
              let slide = []
              res.data.id_list.forEach((val, i) => {
                i === 0 ? slide.push({id: val.id, name: val.name}) : slide.push({id: val.id, name: '变更' + i})
              })
              that.$emit('childInfo', {slide, status: res.data.status, contractId: res.data.contract_id})
            }
          }
        })
      }
    }
  },
  watch: {
    selId: function (ne, lo) {
      this.handleAjax(ne)
    }
  }
}
</script>
<style lang="less" scoped>
.required {
  color: #eb6100;
  margin-right: 5px;
}
// 公共 title 样式
.show_title {
  height: 50px;
  line-height: 50px;
  display: flex;
  div:first-child {
    span:first-child {
      padding: 2px 4px;
      background: #eb6100;
    }
    span:last-child {
      margin-left: 11px;
      font-weight: bolder;
      color: #333;
    }
  }
  div:nth-child(2) {
    margin-left: 26px;
    font-size: 14px;
    span:first-child {
      color: #999;
    }
    span:last-child {
      color: #eb6100;
    }
  }
}
.settlement_edit {
  .form {
    padding: 30px;
    padding-bottom: 75px;
    background: #fff;
    .form_title {
      .show_title;
    }
    .form_line {
      display: flex;
      border-top: 1px solid #cccccc;
      height: 55px;
      align-items: center;
      .form_item {
        width: 38%;
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 10px;
        .form_item_title {
          display: flex;
          height: 100%;
          width: 18%;
          align-items: center;
          font-size: 14px;
          div:first-child {
            height: 100%;
            display: flex;
            align-items: center;
            img {
              width: 12px;
              height: 12px;
              margin-right: 8px;
            }
          }
          div:last-child {
            color: #333;
          }
        }
        .form_item_info {
          div {
            background:#ffffff;
            border:1px solid #e1e6f0;
            border-radius:2px;
            width:280px;
            height:26px;
            line-height: 26px;
            padding: 0 5px;
            font-size: 14px;
          }
        }
      }
    }
    .about_title {
      line-height: 33px;
      font-size: 14px;
      font-weight: bolder;
      color: #333;
      padding: 0 20px;
    }
    .about_list {
      // width: 100%;
      height: 120px;
      display: flex;
      padding: 0;
      border: 1px solid rgba(225,230,240,0.50);
      flex-wrap: wrap;
      align-items: inherit;
      padding: 10px 12px;
      overflow-y: scroll;
      li {
        list-style: none;
        padding: 0 14px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #e1e6f0;
        color: #999;
        font-size: 14px;
        margin-left: 8px;
        margin-top: 12px;
      }
      li.checked {
        color: #fff;
        background: #eb6100;
        border-color: #eb6100;
      }
      li.is_null {
        border: none;
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
      }
    }
  }
  .table, .upload, .info {
    padding: 30px;
    padding-bottom: 75px;
    background: #fff;
    margin-top: 20px;
    .table_title, .upload_title, .info_title {
      .show_title
    }
    .info_detail {
      width: calc(100% - 14px);
      height: 145px;
      resize: none;
      border: 1px solid #e1e6f0;
      outline: none;
      padding: 4px 6px;
      font-size: 14px;
    }
    .order_table {
      border: none;
      width: 100%;
      border-spacing: 0px;
      .order_table_title {
        opacity:0.49;
        background:#efefef;
        border-radius:4px 4px 0 0;
        width:100%;
        height:45px;
        line-height: 45px;
        width: 100%;
        td {
          width: 25%;
          text-align: center;
          font-size: 14px;
          color: #999;
          padding: 0;
          // display: flex;
          // align-items: centerl;
          div {
            line-height: 45px;
            border-left: 1px solid #e1e6f0;
            border-right: 1px solid #e1e6f0;
          }
        }
        td:first-child div {
          border-left: none;
        }
        td:last-child div {
          border-right: none;
        }
      }
      .order_table_line {
        height: 45px;
        left: 45px;
        text-align: center;
        color: #333;
        font-size: 14px;
        td {
          line-height: 45px;
          border-bottom: 1px solid #efefef;
          input {
            padding: 3px 4px;
            outline: none;
          }
        }
        td:last-child {
          span {
            color: #eb6100;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.null_order {
  height: 47px;
  text-align: center;
  color: #999;
  line-height: 47px;
  border-bottom: 1px solid #efefef;
  // border-top: none;
  font-size: 14px;
}
</style>
