<template>
  <div class="coordination">
    <div class="coordination_list">
      <div v-if="chain_recycle_list.length > 0">
        <div class="list" v-for="(item, index) in chain_recycle_list" :key="index">
          <ul>
            <li><p>销售项目：</p><span>{{item.sales_contract[0].name}}</span></li>
            <li><p>交易公司：</p><span>{{item.sales_contract[0].partner_company_name}}</span></li>
            <li><p>创建时间：</p><span>{{item.sales_contract[0].date_created}}</span></li>
            <li><button @click="moveOut(item.id)">移出</button></li>
          </ul>
        </div>
      </div>
      <div v-else class="empty">
        <span>暂无数据</span>
      </div>
    </div>
    <div class="coordination-tips"><strong>注：</strong><span>每个单据首次移出回收站，若再次移入回收站将被永久删除！</span></div>
  </div>
</template>

<script>
export default {
  name: 'coordination',
  data () {
    return {
      chain_recycle_list: []
    }
  },
  props: ['role'],
  mounted () {
    this.getConfrimList()
  },
  methods: {
    getConfrimList () {
      this.$ajax.get(`/api/chain/chain_list/?recycle=${1}`).then(res => {
        this.chain_recycle_list = res.data
      })
    },
    moveOut (id) {
      this.$ajax.put(`/api/chain/${id}/restore/`).then(res => {
        if (res) {
          if (res.status === 205) {
            this.$message.success('移出成功')
            let _arr = this.chain_recycle_list.reduce((prev, next) => {
              if(next.id !== id) {
                prev.push(next)
              }
              return prev
            }, [])
            this.chain_recycle_list = _arr
          }
        } else {
          this.$message.error('不可二次移出回收站')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.coordination {
  background:#ffffff;
  border-radius:2px;
  width:100%;
  height:auto;
  padding: 20px 83px 67px 30px;
  .coordination-tips {
    position: relative;
    top: 40px;
    strong {
      color: #eb7c05
    }
    span {
      font-size: 14px;
    }
  }
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
          flex: 1;
          height:49px;
          text-align: center;
          line-height: 49px;
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          &:first-of-type {
            margin-left: 40px;
          }
          &:nth-of-type(3) {
            margin-left: 20px;
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
            font-family:PingFangSC-Semibold;
            font-size:12px;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
            margin-left: 20%;
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
