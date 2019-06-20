<template>
  <div class="settlement_edit">
    <!-- 创建时间 -->
    <div class="form">
      <div class="form_title">
        <div>
          <span></span>
          <span>发票信息</span>
        </div>
        <div>
          <span>创建时间：</span>
          <span>{{getTime(subData.create_time)}}</span>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label">发票名称</div>
        <div class="item_info">
          <div>{{subData.name}}</div>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label">发票类型</div>
        <div class="item_info">
          <div>{{typeList[subData.invoice_type]}}</div>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label">发票代码</div>
        <div class="item_info">
          <div>{{subData.invoice_code}}</div>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label">发票号码</div>
        <div class="item_info">
          <div>{{subData.invoice_number}}</div>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label">发票日期</div>
        <div class="item_info">
          <div>{{subData.date_created}}</div>
        </div>
      </div>
      <div class="form_line">
        <div class="form_label">发票金额</div>
        <div class="item_info">
          <div>{{subData.amount}}</div>
        </div>
      </div>
    </div>
    <div class="upload">
      <div class="upload_title">
        <div>
          <span></span>
          <span>电子原件或扫描件 </span>
        </div>
      </div>
      <chainUploadView :tableData='uploadData'></chainUploadView>
    </div>
    <div class="info">
      <div class="info_title">
        <div>
          <span></span>
          <span>补充</span>
        </div>
      </div>
      <div class="info_detail" :style="!subData.note ? 'color: #999' : ''">{{subData.note || '未填写补充'}}</div>
    </div>
  </div>
</template>
<script>
import chainUploadView from '@/components/chain_app/base/public/chainUploadView'
export default {
  name: 'invoiceView',
  components: {
    chainUploadView
  },
  data () {
    return {
      subData: {},
      uploadData: [],
      slide: [],
      formData: {},
      // 对应父组件显示不同的原单或者补充
      typeList: ['增值税普通发票', '增值税普通发票（卷式）', '增值税电子普通发票', '增值税专用发票', '通用机打发票', '增值税机动车发票', '二手车统一发票', '其他']
    }
  },
  created () {
    // 通过路由判断来源和逻辑调用不同的接口
    // if (that.$route.path === '/chain/view/settlement') {} else if (that.$route.path === '/chain/sure/settlement') {}
    console.log(this.$route)
    this.handleAjax(this.$route.query.invoice_id, true)
  },
  props: {
    selId: {
      type: String,
      default: '0'
    }
  },
  methods: {
    // 格式化时间
    getTime: (str) => str ? str.replace('T', ' ').substr(0, str.indexOf('.')) : '',
    handleAjax (id, sw) {
      const that = this
      that.$ajax.get(`/api/chain/invoice/${id}/`).then(res => {
        if (res.status === 200) {
          res.data.invoice_type = res.data.invoice_type - 1
          that.subData = res.data
          that.uploadData = res.data.att_list
          console.log(res)
          if (sw) {
            let slide = []
            res.data.id_list.forEach((val, i) => {
              i === 0 ? slide[i] = {name: val.name, id: val.id} : slide[i] = {name: '补充' + i, id: val.id}
            })
            this.$emit('childInfo', {slide, status: res.data.status, contractId: res.data.contract_id, settlementId: res.data.settlement_id})
          }
        }
      })
    }
  },
  watch: {
    // 观察父组件选择导航改变，切换数据
    selId: function (ne, lo) {
      this.handleAjax(ne)
    }
  }
}
</script>
<style lang="less" scoped>
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
      // border-top: 1px solid #cccccc;
      font-size: 14px;
      height: 55px;
      align-items: center;
      .form_label {
        width: 108px;
        line-height: 55px;
        height: 100%;
        padding: 0 10px;
        color: #333;
      }
      .item_info {
        div {
          width: 220px;
          height: 28px;
          line-height: 28px;
          padding: 0 3px;
          color: #333;
          border: 1px solid #e1e6f0;
          outline: none;
        }
      }
    }
    .form_line:nth-of-type(2) {
      border-top: 1px solid #ccc;
    }
  }
  .info, .upload {
    padding: 30px;
    padding-bottom: 75px;
    background: #fff;
    margin-top: 20px;
    .info_title, .upload_title {
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
  }
}
</style>
