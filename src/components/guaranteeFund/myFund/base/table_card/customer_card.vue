<template>
  <div class='id_card'>
    <div v-for="(info, index) in showList" :key='index' v-if="info.customer_info">
      <div class='inner_line'>
        <div class='item_section item_money' v-if="info.customer_info">
          <span style="font-weight: bolder; color: #333">{{info.institution_name}}</span>
          <span style="color: #eb6100; cursor: pointer; text-decoration: underline" @click="handleDetail(info)">{{info.loan_process_status_display}}</span>
        </div>
        <div class='item_section' v-if="info.customer_info">
          <span>企业授信等级：</span>
          <span>{{titleList[info.customer_info.group]}}</span>
        </div>
      </div>
      <div class='inner_line' v-if='info.group === "0"'>
        <div class='item_section'>
          <span>授信管理：</span>
          <span>未授信</span>
        </div>
      </div>
      <div class='inner_line' v-if='info.group === "1"'>
        <div class='item_section item_money' v-if="info.customer_info">
          <span>融资授信总额度（元）：</span>
          <span>{{toThousands(info.customer_info.total_limit)}}</span>
        </div>
        <div class='item_section item_money' v-if="info.customer_info">
          <span>融资授信单笔额度（元）：</span>
          <span>{{toThousands(info.customer_info.single_limit)}}</span>
        </div>
      </div>
      <div class='inner_line' v-if='info.group === "1"'>
        <div class='item_section item_money' v-if="info.customer_info">
          <span>融资授信剩余额度（元）：</span>
          <span>{{info.customer_info.rest_limit ? toThousands(info.customer_info.rest_limit) : ''}}</span>
        </div>
      </div>
      <div class='inner_line' v-if='info.group === "1"'>
        <div class='item_section' :style="info.is_auto ? 'background: url(/static/img/financing/auto.png) no-repeat center center/32px 32px' : 'background: url(/static/img/financing/disauto.png) no-repeat center center/32px 32px'">
          <span>审核方式：</span>
          <span>{{info.is_auto ? '自动授信' : '手动授信'}}</span>
        </div>
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  name: 'customerCard',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      showList: [],
      titleList: ['未授信', '白名单', '黄名单', '黑名单']
    }
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/application/${that.id}/`).then(res => {
      console.log(res)
      if (res.status === 200) {
        res.data.loan_process_info.forEach(val => {
          if (val.customer_info) val.group = val.customer_info.group
        })
        that.showList = res.data.loan_process_info
        console.log(that.showList)
      }
    })
  },
  methods: {
    hanldeNav () {
      window.open('#/customer_app/application_list', '_blank')
    },
    // 查看详情
    handleDetail (item) {
      const that = this
      console.log(item)
      if (item.loan_process_status === '100') {
        that.$message('预审中')
      } else if (item.loan_process_status === '101') {
        that.$message('预审通过')
      } else if (item.loan_process_status === '102') {
        that.$message('预审不通过')
      } else {
        window.open('#/order/whole?id=' + item.id)
      }
    },
  }
}
</script>
<style lang='less' scoped>
  .id_card {
    width: 840px;
    font-size: 14px;
    background: #fdfdfd;
    padding: 10px 20px;
    &>div {
      border-bottom: 1px solid #eaeaea;
      .inner_line {
        display: flex;
        align-items: center;
        width: 100%;
        .item_section {
          width: 50%;
          padding: 0 20px;
          height: 48px;
          line-height: 48px;
          background-repeat: no-repeat;
          background-position: top right;
          button {
            width: 85px;
            height: 24px;
            color: #eb6100;
            background: #fff;
            border: none;
            text-decoration: underline;
          }
        }
        .item_money {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:fitst-child {
            width: 72%;
          }
          span:last-child {
            width: 28%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
          }
        }
      }
    }
  }
</style>
