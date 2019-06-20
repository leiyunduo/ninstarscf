<template>
  <div class="coordination">
    <div class="coordination_list">
      <div v-if="chain_confirm_list.length > 0">
        <div class="list" v-for="(item, index) in chain_confirm_list" :key="index">
          <ul>
            <li><p>销售项目：</p><span>{{item.contract_name}}</span></li>
            <li><p>交易公司：</p><span>{{item.company_name}}</span></li>
            <li><p>创建时间：</p><span>{{item.submit_time}}</span></li>
            <li><p>确认状态：</p><span>{{item.status === '0' ? '未确认' : (item.status === '1' ? '同意' : '拒绝')}}</span></li>
            <li><button @click="toDetail(item)">查看</button></li>
          </ul>
        </div>
      </div>
      <div v-else class="empty">
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coordination',
  data () {
    return {
      chain_confirm_list: []
    }
  },
  props: ['role'],
  mounted () {
    this.getConfrimList()
  },
  methods: {
    getConfrimList () {
      this.$ajax.get('/api/chain/co_confirm/').then(res => {
        this.chain_confirm_list = res.data.results
      })
    },
    toDetail (obj) {
      this.$router.push({
        path: '/chain_app/cooperation_chain',
        query: {
          id: obj.contract_id,
          confirmId: obj.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.co_reject {
  color: #f51010 !important;
}
.co_resolve {
  color: #eb6100 !important;
}
.coordination {
  background:#ffffff;
  border-radius:2px;
  width:100%;
  height:auto;
  padding: 20px 20px 67px 20px;
  .coordination_list {
    width:100%;
    height:auto;
    .list {
      background:#ffffff;
      border:1px solid #e1e6f0;
      box-shadow:0 0 10px 1px #e1e6f0;
      width:100%;
      height:49px;
      margin-bottom: 10px;
      ul {
        display: flex;
        flex-direction: row;
        li {
          // flex: 1;
          height:49px;
          text-align: center;
          line-height: 49px;
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          &:first-of-type {
            margin-left: 30px;
            width: 30%;
          }
          &:nth-of-type(2) {
            width: 25%;
          }
          &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5) {
            width: 15%;
          }
          p {
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#666666;
            letter-spacing:0;
            text-align:left;
            display: inline-block;
          }
          span {
            display: inline-block;
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:left;
          }
          button {
            background:#e87626;
            border-radius:2px;
            width:100px;
            height:30px;
            outline: none;
            border: none;
            font-family: PingFangSC-Semibold;
            font-size: 12px;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
            // position: absolute;
            // right: 20px;
            // top: 9px;
            &.disabled {
              background: #f5f7fa;
              color: #c0c4cc;
              cursor: not-allowed;
            }
          }
        }
      }
    }
    .empty {
      margin-top: 33px;
      height: 80px;
      padding-top: 54px;
      font-size: 20px;
      color: #666666;
      text-align: center;
      span {
        font-weight: bolder;
        vertical-align: bottom;
      }
    }
  }
}
</style>
