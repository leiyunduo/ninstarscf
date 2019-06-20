<template>
  <div class='id_card'>
    <div class="fund_card">助贷信息</div>
    <div class="info_wrap">
      <div class='item_line' v-if="!noFund">
        <div class='item_section item_money'>
          <span>助贷机构：</span>
          <span>{{info.name}}</span>
        </div>
        <div class='item_section item_money'>
          <span>授信等级：</span>
          <span>{{titleList[info.group]}}</span>
        </div>
      </div>
      <div class='item_line' v-if="!noFund">
        <div class='item_section item_money'>
          <span>助贷状态：</span>
          <span :style="info.helping_status ? `color: ${fundList[info.helping_status].color}` : 'color: #111'">{{info.helping_status ? fundList[info.helping_status].title : ''}}</span>
        </div>
          <div class='item_section item_money'>
          <span>融资授信总额度（元）：</span>
          <span>{{toThousands(info.total_limit)}}</span>
        </div>
      </div>
      <div class='item_line' v-if="!noFund">
        <div class='item_section item_money'>
          <span>助贷金额（元）：</span>
          <span>{{toThousands(info.value) || '未助贷'}}</span>
        </div>
        <div class='item_section item_money'>
          <span>单笔融资授信额度（元）：</span>
          <span>{{toThousands(info.single_limit)}}</span>
        </div>
      </div>
      <div class='item_line' v-if="!noFund">
        <div class='item_section item_money'>
          <span>助贷占比：</span>
          <span>{{info.hasRate ? Number(info.rate).toFixed(1) + '%' : info.rate}}</span>
        </div>
      </div>
      <p v-if="noFund" style="line-height: 212px; text-align: center; color: #999">未提交助贷担保</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fundCard',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      noFund: false,
      info: {},
      titleList: ['未授信', '白名单', '黄名单', '黑名单'],
      fundList: [
        {title: '审核中', color: '#eb6100'},
        {title: '助贷中', color: '#228B22'},
        {title: '已拒绝', color: '#ff0010'},
        {title: '赔付申请中', color: '#eb6100'},
        {title: '同意赔付', color: '#228B22'},
        {title: '拒绝赔付', color: '#ff0010'},
        {title: '企业已上传还款信息', color: '#eb6100'},
        {},
        {title: '无赔付助贷结束', color: '#228B22'},
        {title: '助贷已结束', color: '#228B22'}
      ]
    }
  },
  created () {
    const that = this
    that.$ajax.get(`/api/financing/application/${that.id}`).then(res => {
      if (res.status === 200) {
        if (res.data.fund_info) {
          if (res.data.helping_status === '0' || res.data.helping_status === '2' || res.data.helping_status === '5') {
            that.info = {
              name: res.data.fund_info.name,
              helping_status: res.data.helping_status,
              ...res.data.member_info,
              rate: that.fundList[res.data.helping_status].title,
              amount: that.fundList[res.data.helping_status].title,
              hasRate: false
            }
          } else {
            that.info = {
              name: res.data.fund_info.name,
              helping_status: res.data.helping_status,
              ...res.data.member_info,
              ...res.data.helping_data,
              hasRate: true
            }
          }
        } else {
          that.noFund = true
        }
      }
    })
  },
  methods: {
  }
}
</script>
<style lang='less' scoped>
  .id_card {
    color: #333;
    width: 760px;
    font-size: 14px;
    background: #fff;
    .fund_card {
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
        .item_section {
          width: 50%;
          height: 48px;
          line-height: 48px;
          background-repeat: no-repeat;
          background-position: top right;
        }
        .item_money {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
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
