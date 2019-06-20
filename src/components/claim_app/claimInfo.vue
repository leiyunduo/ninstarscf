<template>
  <div class='assets'>
    <div class='assets_board'>
      <!-- <appNav :father='{selIndex: 2}' type='1'></appNav> -->
      <div class='assets_content'>
        <!-- <div class='assets_list'>
          <h3><img src="../../../static/img/leftbar/myzhaiq-1.png" alt="">我的债权/债务</h3>
        </div> -->
        <div class="c_assets_bottom">
          <div class="top_list">
            <div class="get_current" style="margin-right:25px;">
              <div class="board_title">
                <span>我的债权</span>
              </div>
              <div class="board_info">
                <div class="left">
                  <img src="../../../static/img/claim/claim.png" alt="">
                </div>
                <div class="right">
                  <span>债权总和（万元）</span>
                  <p>{{toThousands(creditSum / 10000)}}</p>
                  <button @click="claimDebts(0)">债权登记</button>
                </div>
              </div>
            </div>
            <div class="get_current" style="margin-left:25px;">
              <div class="board_title">
                <span>我的债务</span>
              </div>
              <div class="board_info">
                <div class="left">
                  <img src="../../../static/img/claim/debt.png" alt="">
                </div>
                <div class="right">
                  <span>债务总和（万元）</span>
                  <p>{{toThousands(debtSum / 10000)}}</p>
                  <button @click="claimDebts(1)">债务登记</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="assets_table">
          <ul>
            <li v-for="(item, index) in claimInfo" :key='index' :class='index === selIndex ? "sel" : ""' @click="selIndex = index">{{item}}</li>
          </ul>
        </div>
        <div class="assets_card">
          <TabCredit v-if="selIndex === 0" />
          <TabDebt v-if="selIndex === 1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import TabCredit from './base/index_tab/tab_credit'
import TabDebt from './base/index_tab/tab_debt'
export default {
  name: 'claimInfo',
  components: {
    // AppNav, 
    TabCredit, TabDebt
  },
  data () {
    return {
      selIndex: 0,
      creditSum: '',
      debtSum: '',
      claimInfo: ['债权明细', '债务明细'],
      company_id: ''
    }
  },
  mounted () {
    const that = this
    that.company_id = localStorage.id
    that.$ajax.get('/api/claims_debts/total/?company_id=' + that.company_id).then(res => {
      that.creditSum = res.data.claims_total
      that.debtSum = res.data.debts_total
    })
    let _location = [
      {
        title: '债权/债务',
        url: ''
      }
    ]
  },
  methods: {
    // handleTab (e) {
    //   this.selIndex = e
    // },
    // 债权债务登记
    claimDebts (i) {
      const that = this
      let a = i === 0 ? 1 : 2
      that.$router.push({
        path: '/claim_app/claim_register',
        query: {
          type: a
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.assets {
  height: 100%;
  .shade_box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.50);
    z-index: 2999;
    .to_display {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .closeWrap{
        position: absolute;
        top: 34px;
        right: 35px;
      }
    }
  }
  .assets_board {
    margin: 0 auto;
    min-height: 100%;
    display: flex;
  }
  .c_slide_container:hover+.assets_content{
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .assets_content {
    width: 100%;
    background: #fafafa;
    min-height: 100%;
    .assets_list {
      height: 60px;
      line-height: 60px;
      box-shadow: 10px 10px 17px -3px #ddd;
      padding-left: 50px;
      background: #fff;
      // color: #eb6100;
      img {
        margin-right: 10px;
        vertical-align: middle;
      }
    }
    .c_assets_bottom{
      padding: 30px 20px;
      padding-bottom: 0;
      .top_list {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        .get_current {
          flex: 1;
          height:250px;
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 14px 0px rgba(0, 0, 0, 0.2);
          border-radius:4px;
          padding: 30px 0px;
          .board_title {
            padding-left: 70px;
            span {
              display: inline-block;
              font-size:18px;
              font-family: MicrosoftYaHei-Bold;
              // font-weight:bold;
              color:#333;
            }
          }
          .board_info {
            display: flex;
            flex-direction: row;
            .left {
              flex: 1;
              img {
                padding: 22px 0 0 100px;
              }
            }
            .right {
              text-align: center;
              flex: 1;
              padding-top: 22px;
              span {
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color: #666;
                display: block;
              }
              p {
                display: block;
                font-size:32px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(68,68,68,1);
                padding: 17px 0 22px 0;
              }
              button {
                width:120px;
                height:32px;
                border:1px solid rgba(235,97,0,1);
                border-radius:4px;
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(235,97,0,1);
                background: none;
                outline: none;
              }
              button:hover {
                background:rgba(235,97,0,1);
                color:rgba(255,255,255,1);
                border: none;
              }
            }
          }
        }
        .get_current:hover {
          box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.2);
        }
      }
    }
    .assets_table {
      margin: 20px 20px 0 30px;
      ul {
        height: 100%;
        display: flex;
        align-items: center;
        li {
          width:143px;
          height:40px;
          border-radius:4px 4px 0px 0px;
          cursor: pointer;
          text-align: center;
          line-height: 40px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(238,238,238,1);
          margin-right: 22px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
          border-bottom: none;
        }
        li.sel {
          background:rgba(235,97,0,1);
          border:1px solid rgba(249,153,120,1);
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
          border-bottom: none;
        }
      }
    }
    .assets_card {
      margin: 0 20px;
      margin-bottom: 20px;
      // border-radius: 4px;
      background:rgba(255, 255, 255, 1);
      border:1px solid rgba(238, 238, 238, 1);
    }
  }
}
</style>
