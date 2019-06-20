<template>
  <div class="chian_line">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="show_card">
      <!-- <div class="show_title">
        <img src="static/img/leftbar/mychain.png" alt="">
        <span>交易管理与增信</span>
      </div> -->
      <div class="card-wraper__box">
        <div class="show-desc">
          <h3>中小企业供应链交易管理服务平台</h3>
        </div>
        <!-- <div class="card-groups">
          <div class="card-item" @click="todetail(index)" v-for="(item, index) in listOne" :key="index">
            <div class="card-head">
              <h4 class="card-title--text">{{item.title}}</h4>
              <span class="card-title--tips">{{item.tips}}</span>
            </div>
            <div class="card-body">
              <img :src="item.icon" alt="">
            </div>
          </div>
        </div> -->
        <div class="card-groups">
          <div class="card-item card-mid" @mousemove="changeIconOne(index)" @mouseout="changeIconOne(index, -1)" @click="todetail(index)" v-for="(item, index) in listOne" :key="index">
            <div class="card-content">
              <div class="card-content--icon">
                <img :src="item.icon" alt="">
              </div>
              <div class="card-content--text">
                <h4>{{item.title}}</h4>
                <span class="card-tips">{{item.tips}}</span>
              </div>
              <div class="go-link">
                <img :src="setIndexOne === index ? 'static/img/chain/gochain.png' : 'static/img/chain/gochain-dis.png'" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="show-desc">
          <h3>中小企业融资增信服务平台</h3>
        </div>
        <div class="card-groups">
          <div class="card-item card-mid" @mousemove="changeIcon(index)" @mouseout="changeIcon(index, -1)" @click="addCredit(index)" v-for="(item, index) in listTwo" :key="index">
            <div class="card-content">
              <div class="card-content--icon">
                <img :src="item.icon" alt="">
              </div>
              <div class="card-content--text">
                <h4>{{item.title}}</h4>
              </div>
              <div class="go-link">
                <img :src="setIndex === index ? 'static/img/chain/gochain.png' : 'static/img/chain/gochain-dis.png'" alt="">
              </div>
            </div>
          </div> 
        </div>
        <div class="card-groups">
          <div class="card-item card-mid" @mousemove="changeIcon(index)" @mouseout="changeIcon(index, -1)" @click="addCredit(index + 3)" v-for="(item, index) in listThree" :key="index">
            <div class="card-content">
              <div class="card-content--icon">
                <img :src="item.icon" alt="">
              </div>
              <div class="card-content--text">
                <h4>{{item.title}}</h4>
              </div>
              <div class="go-link">
                <img :src="setIndex === index ? 'static/img/chain/gochain.png' : 'static/img/chain/gochain-dis.png'" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chain_line',
  data () {
    return {
      father: {
        selIndex: ''
      },
      card: [],
      listOne: [{title: '销售管理', tips: '--拉式供应链', icon: 'static/img/chain/sale-manage.png'}, {title: '库存增补', tips: '--安全库存管理', icon: 'static/img/chain/storage-manage.png'}, {title: '采购管理', tips: '--推式供应链', icon: 'static/img/chain/buy-manage.png'}],
      listTwo: [
        {title: '订单融资增信', icon: 'static/img/chain/order-credit.png'},
        {title: '应收账款融资增信', icon: 'static/img/chain/receive-credit.png'},
        {title: '历史交易数据增信', icon: 'static/img/chain/history-credit.png'}
      ],
      listThree: [
        {title: '贸易融资增信', icon: 'static/img/chain/financing-credit.png'},
        {title: '库存质押融资增信', icon: 'static/img/chain/storage-credit.png'},
        {title: '大数据征信', icon: 'static/img/chain/bigdata-credit.png'}
      ],
      setIndex: -1,
      setIndexOne: -1
    }
  },
  mounted () {
    this.father.selIndex = (localStorage.role === 'serviceprovider' || localStorage.role === 'serviceperson') ? 0 : 1
    let _location = [
      {
        title: '交易管理与增信',
        url: ''
      }
    ]
  },
  methods: {
    // 历史交易数据增信
    addCredit (i) {
      var that = this
      if (i === 0) {
        that.$router.push('/financing_app/order_application')
      } else if (i === 1) {
        that.$router.push('/financing_app/getting_application')
      } else if (i === 2) {
        that.$router.push('/chain_app/historical_add_credit')
      } else if (i === 5) {
        that.$router.push('/chain_app/credit_reporting')
      }
    },
    changeIcon (index, flag) {
      if (flag) {
        this.setIndex = -1
        return
      }
      this.setIndex = index
    },
    changeIconOne (index, flag) {
      if (flag) {
        this.setIndexOne = -1
        return
      }
      this.setIndexOne = index
    },
    todetail: function (index) {
      // console.log(index)
      var that = this
      if (index === 0) {
        that.$router.push({
          path: '/chain_app/chain_main',
          query: {
            type: 0
          }
        })
      } else if (index === 1) {
        that.$router.push({
          path: '/chain_app/chain_main',
          query: {
            type: 2
          }
        })
      } else if (index === 2) {
        that.$router.push({
          path: '/chain_app/chain_main',
          query: {
            type: 1
          }
        })
      }
    },
    tocheck: function ($event, index) {
      // console.log($event, index)
      var that = this
      if (index === 5) {
        that.$router.push({
          path: '/chain_app/chain_main',
          query: {
            type: 4,
            hostry: 1
          }
        })
      } else if (index === 0) {
        that.$router.push({
          path: '/chain_app/chain_main',
          query: {
            type: index
          }
        })
      } else if (index === 1) {
        that.$router.push({
          path: '/chain_app/chain_main',
          query: {
            type: index
          }
        })
      } else if (index === 4) {
        that.$router.push({
          path: '/chain_app/chain_main',
          query: {
            type: 4
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@card-width-big: 280px;
@card-width-mid: 370px;
@card-height-big: 350px;
@card-height-mid: 185px;
@media screen and (max-width: 1694px) {
  .card-item {
    &.card-mid {
      margin: 20px 10px !important
    }
  }
}
@media screen and (max-width: 1412px) {
  .card-item {
    margin: 60px 20px !important;
  }
}
.chian_line {
  background: #fafafa;
  display: flex;
  min-height: 100%;
  margin: 0 auto;
  .show_card {
    width: 100%;
    background:#f5f7f8;
    min-width: 1050px;
    .show_title {
      padding-left: 80px;
      line-height: 60px;
      margin-bottom: 20px;
      background: #fff;
      box-shadow: 10px 10px 17px -3px #ddd;
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
      span {
        color: #343536;
      }
    }
    .show-desc {
      padding-top: 10px;
      margin-bottom: 20px;
      h3 {
        font-size: 18px;
        font-weight: bold;
        color: rgba(51,51,51,1);
        border-left: 4px solid #eb6100;
        padding-left: 8px;
      }
    }
    .card-wraper__box {
      margin: 20px 80px;
      overflow: hidden;
      .card-groups {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 0 30px;
        .card-item {
          width: @card-width-big;
          height: @card-height-big;
          background:rgba(255,255,255,1);
          border: 1px solid rgba(238,238,238,1);
          box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            box-shadow:0px 0px 14px 0px rgba(255,112,13,0.2);
          }
          margin: 30px 40px 40px;
          position: relative;
          .card-head {
            padding: 20px 33px;
            text-align: center;
            overflow: hidden;
            .card-title--text {
              font-weight:bold;
              color:rgba(51,51,51,1);
            }
            .card-title--tips {
              margin-top: 15px;
              float: right;
              font-size: 14px;
              font-weight:400;
              color:rgba(102,102,102,1);
            }
          }
          .card-body {
            position: absolute;
            width: 200px;
            height: 200px;
            bottom: 40px;
            left: 40px;
            text-align: center;
            img {
              margin-top: 20px
            }
          }
          &.card-mid {
            // width: @card-width-mid;
            flex: 1 0;
            height: @card-height-mid;
            margin: 20px 50px;
            &>.card-content {
              display: flex;
              margin: 33px 50px;
              justify-content: space-around;
              .card-content--icon {
                width: 114px;
                height: 114px;
              }
              .card-content--text {
                padding-top: 30px;
                padding-left: 10px;
                h4 {
                  font-weight: bold;
                  margin-bottom: 10px;
                }
                .card-tips {
                  font-size: 14px;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                  margin-left: 20px;
                }
              }
              .go-link {
                position: absolute;
                right: 30px;
                bottom: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
