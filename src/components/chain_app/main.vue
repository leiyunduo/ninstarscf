<template>
  <div id="bookkeeping">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="bookkeeping_list">
      <location :location="location" v-if="!(rolePerson === 'serviceprovider' || rolePerson === 'serviceperson')"></location>
      <div class="list">
        <div class="nav">
          <ul>
            <li v-for="(item, index) in title_list" @click="Bookkeeping(index)" :class="{active_li: types === Number(index)}" :key="index">
              <p>{{item}}</p>
            </li>
          </ul>
        </div>
        <div class="details" v-if="['serviceprovider', 'serviceperson'].indexOf(rolePerson) < 0">
          <!-- 应收 -->
          <receivable-one v-if="types === 0" :role="rolePerson"/>
          <!-- 应付 -->
          <payable-one v-if="types === 1" :role="rolePerson"/>
          <!-- 库存 -->
          <div class="coming_online" v-if="types === 2">即将上线，敬请期待</div>
          <!-- <storage v-if="types === 2" /> -->
          <!-- 贸易 -->
          <div class="coming_online" v-if="types === 3">即将上线，敬请期待</div>
          <!-- 协同 -->
          <coordination v-if="types === 4" :role="rolePerson"/>
          <!-- 回收站 -->
          <recycle v-if="types === 5" :role="rolePerson"/>
        </div>
        <div class="details" v-else>
          <!-- 协同 -->
          <coordination :role="rolePerson"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Location from '../location/location'
// import appNav from '../financing/financingManege'
import payableOne from './chain_payment/payableOne'
import receivableOne from './chain_receive/receivableOne'
import storage from './chain_storage/storage'
import coordination from './chain_cooperation/coordination'
import recycle from './chain_recycle/recycle'
export default {
  components: {
    Location,
    // appNav,
    coordination,
    storage,
    payableOne,
    receivableOne,
    recycle
  },
  data () {
    return {
      father: {
        selIndex: -1
      },
      location: [
        {title: '链式记账', url: '/chain_app'},
        {title: '记账'}
      ],
      types: '',
      navName: ['销售管理', '采购管理', '库存增补', '贸易', '协同', '回收站'],
      navName_s: ['协同', '', '', '', '', ''],
      rolePerson: '',
      title_list: []
    }
  },
  mounted () {
    this.types = Number(this.$route.query.type)
    this.rolePerson = localStorage.role
    this.father.selIndex = (this.rolePerson === 'serviceprovider' || this.rolePerson === 'serviceperson') ? 0 : 1
    this.title_list = (this.rolePerson === 'serviceprovider' || this.rolePerson === 'serviceperson') ? this.navName_s : this.navName
  },
  methods: {
    // Bookkeeping
    Bookkeeping (i) {
      if (i === 4 || i === 5) {
        if (this.rolePerson === 'person') {
          this.$message.error('您无权操作, 如需查看请联系管理员!')
          return
        }
      }
      this.types = Number(i)
    }
  }
}
</script>

<style lang="less" scoped>
#bookkeeping {
  width: 100%;
  display: flex;
  background: #f5f7f8;
  .bookkeeping_list {
    width: 100%;
    margin: 0 20px;
    padding-top: 20px;
    &>.location {
      margin-top: -84px;
    }
    .list {
      padding: 20px;
      // min-width: 1260px;
      background:#ffffff;
      .nav { 
        height:53px;
        ul {
          display: flex;
          flex-direction: row;
          li {
            flex: 1;
            text-align: center;
            line-height: 53px;
            border-bottom: 3px solid #e87626;
            cursor: pointer;
            p {
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#999999;
              letter-spacing:0;
              text-align:center;
              font-weight: bold;
            }
          }
          .active_li {
            background:#e87626;
            p {
              color: #fff;
            }
          }
        }
      }
      .details {
        background:#ffffff;
        .coming_online {
          // border:1px solid #e1e6f0;
          border-radius:2px;
          // width:100%;
          height:200px;
          font-size: 20px;
          color: #666;
          font-weight: bold; 
          padding: 20px 83px 67px 30px;
          line-height: 200px;
          text-align: center;
        }
      }
    }
  }
}
</style>
