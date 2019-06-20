<template>
  <div class='id_card'>
    <p class='card_title'>企业授信</p>
    <div class="info_wrap">
    <div>
      <div class='item_section'>
        <span>企业授信等级：</span>
        <span>{{titleList[info.group]}}</span>
      </div>
    </div>
      <div v-if='info.group === "0"'>
        <div class='item_section'>
          <span>授信管理：</span>
          <button @click="hanldeNav()">审核客户</button>
        </div>
      </div>
      <div v-if='info.group === "1"'>
        <div class='item_section item_money'>
          <span>融资授信总额度（元）：</span>
          <span>{{toThousands(info.total_limit)}}</span>
        </div>
        <div class='item_section item_money'>
          <span>融资授信单笔额度（元）：</span>
          <span>{{toThousands(info.single_limit)}}</span>
        </div>
      </div>
      <div v-if='info.group === "1"'>
        <div class='item_section item_money'>
          <span>融资授信剩余额度（元）：</span>
          <span>{{info.rest_limit ? toThousands(info.rest_limit) : ''}}</span>
        </div>
      </div>
      <div v-if='info.group === "1"'>
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
      info: {},
      titleList: ['未授信', '白名单', '黄名单', '黑名单']
    }
  },
  created () {
    const that = this
    that.$ajax.get(`/api/financing/loan_process/${that.id}`).then(res => {
      if (res.status === 200) {
        that.info = res.data.customer_info
      }
    })
  },
  methods: {
    hanldeNav () {
      window.open('#/customer_app', '_blank')
    }
  }
}
</script>
<style lang='less' scoped>
  .id_card {
    width: 840px;
    font-size: 14px;
    background: #fdfdfd;
    .card_title {
      background: #666;
      line-height: 44px;
      padding: 0 20px;
      font-size: 14px;
      color: #fff;
    }
    .info_wrap {
      padding: 10px 20px;
      &>div {
        display: flex;
        align-items: center;
        width: 100%;
        .item_section {
          width: 50%;
          padding: 0 10px;
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
            width: 50%;
          }
          span:last-child {
            width: 50%;
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
