<template>
  <div class="settlement_edit">
    <!-- 创建时间 -->
    <div class="form">
      <div class="form_title">
        <div>
          <span></span>
          <span>支付信息</span>
        </div>
        <div>
          <span>创建时间</span>
          <span>{{getTime(subData.create_time)}}</span>
        </div>
      </div>
      <div class="form_line" style="justify-content: flex-start;">
        <div class="form_section">
          <div class="form_label">支付名称</div>
          <div class="item_info">
            <div>{{subData.name}}</div>
          </div>
        </div>
      </div>
      <div class="form_line" style="justify-content: flex-start;">
        <div class="form_section">
          <div class="form_label">支付类型</div>
          <div class="item_info">
            <div>{{typeList[subData.type]}}</div>
          </div>
        </div>
      </div>
      <div class="form_line" style="justify-content: flex-start;" v-if="!subData.type || subData.type === 0">
        <div class="form_section">
          <div class="form_label">支付金额</div>
          <div class="item_info">
            <div>{{subData.amount}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">支付日期</div>
          <div class="item_info">
            <div>{{subData.date_created}}</div>
          </div>
        </div>
      </div>
      <div class="form_line" v-if="subData.type === 1">
        <div class="form_section">
          <div class="form_label">支付金额</div>
          <div class="item_info">
            <div>{{subData.amount}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">收款企业</div>
          <div class="item_info">
            <div :class="!subData.gathering ? 'is_null' : ''">{{subData.gathering || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款企业</div>
          <div class="item_info">
            <div :class="!subData.payment ? 'is_null' : ''">{{subData.payment || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">出票日期</div>
          <div class="item_info">
            <div>{{subData.date_created}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">收款机构</div>
          <div class="item_info">
            <div :class="!subData.gatheringCompany ? 'is_null' : ''">{{subData.gatheringCompany || '为填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款机构</div>
          <div class="item_info">
            <div :class="!subData.paymentCompany ? 'is_null' : ''">{{subData.paymentCompany || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">收款账号</div>
          <div class="item_info">
            <div :class='!subData.getting_accoun ? "is_null" : ""'>{{subData.getting_account || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款账号</div>
          <div class="item_info">
            <div :class="!subData.payment_account ? 'is_null' : ''">{{subData.payment_account || '未填写'}}</div>
          </div>
        </div>
      </div>
      <div class="form_line" v-if="subData.type > 1">
        <div class="form_section">
          <div class="form_label">支付金额</div>
          <div class="item_info">
            <div>{{subData.amount}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">收款企业</div>
          <div class="item_info">
            <div :class="!subData.gathering ? 'is_null' : ''">{{subData.gathering || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款企业</div>
          <div class="item_info">
            <div :class="!subData.payment ? 'is_null' : ''">{{subData.payment || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">出票日期</div>
          <div class="item_info">
            <div :class="!subData.date_created ? 'is_null' : ''">{{subData.date_created}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">收款机构</div>
          <div class="item_info">
            <div :class="!subData.gatheringCompany ? 'is_null' : ''">{{subData.gatheringCompany || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款机构</div>
          <div class="item_info">
            <div :class="!subData.paymentCompany ? 'is_null' : ''">{{subData.paymentCompany || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">汇票到期日</div>
          <div class="item_info">
            <div>{{subData.payment_date}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">收款账号</div>
          <div class="item_info">
            <div :class="!subData.getting_account ? 'is_null' : ''">{{subData.getting_account || '未填写'}}</div>
          </div>
        </div>
        <div class="form_section">
          <div class="form_label">付款账号</div>
          <div class="item_info">
            <div :class="!subData.payment_account ? 'is_null' : ''">{{subData.payment_account || '未填写'}}</div>
          </div>
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
  name: 'paymentView',
  components: {
    chainUploadView
  },
  data () {
    return {
      subData: {},
      uploadData: [],
      typeList: ['现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）']
    }
  },
  created () {
    // 获取展示数据，将数据传递给组件（subData, upload）
    console.log(this.$route.query.payment_id)
    this.handleAjax(this.$route.query.payment_id, true)
  },
  props: {
    selId: {
      type: String
    }
  },
  methods: {
    // 格式化时间
    getTime: (str) => str ? str.replace('T', ' ').substr(0, str.indexOf('.')) : '',
    // http 请求
    handleAjax (id, sw) {
      const that = this
      // 通过路由判断来源和逻辑调用不同的接口
      that.$ajax.get(`/api/chain/payment/${id}/`).then(res => {
        if (res.status === 200) {
          // 前后台不统一
          res.data.type -= 1
          console.log(res.data)
          that.subData = { ...res.data, ...res.data.payment_info }
          that.uploadData = res.data.att_list
          if (sw) {
            let slide = []
            res.data.id_list.forEach((val, i) => {
              i === 0 ? slide.push({name: val.name, id: val.id}) : slide.push({name: '补充' + i, id: val.id})
            })
            console.log(slide)
            this.$emit('childInfo', {slide, status: res.data.status, contractId: res.data.contract_id})
          }
        }
      })
    }
  },
  watch: {
    selId: function (nw, ol) {
      this.handleAjax(nw)
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
      flex-wrap: wrap;
      justify-content: flex-end;
      // border-top: 1px solid #cccccc;
      font-size: 14px;
      align-items: center;
      .form_section {
        display: flex;
        height: 55px;
        align-items: center;
        width: calc(100% / 3);
        // padding: 0 10px;
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
            padding: 0 3px;
            border: 1px solid #e1e6f0;
            outline: none;
            line-height: 28px;
            color: #333;
          }
          div.is_null {
            color: #999;
          }
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
