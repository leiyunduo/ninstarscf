<template>
  <div class="cover_container">
    <!-- <AppNav :father='{selIndex: 3}'></AppNav> -->
    <div class="cover_wrap">
        <div class="top-nav">
          <location :location="location"></location>
        </div>
      <div class="financing-item__title">
        <span>第二还款来源（担保性）</span>
      </div>
      <!-- <div class="cover_info">
        <span>其他应收</span>
        <span>{{coverSum}}</span>
      </div> -->
      <ul class="cover_pool_list" v-if="showList.length !== 0">
        <li v-for="(item, index) in showList" :key='index'>
          <div class="show_item_title">
            <div class="show_info">
              <img :src="pics[item.ticket_type]">
              <div>
                <span>面额：</span>
                <span>{{item.amount}}元</span>
              </div>
            </div>
            <!-- <div class="show_swit">
              <input type="checkbox" @change="handleChange($event, item.id)">
            </div> -->
          </div>
          <!-- <div class="show_item_tip">生产来源</div> -->
          <div class="show_item_infoline">
            <div>
              <span>销售项目：</span>
              <span style="color: #eb6100; font-weight: bold; text-decoration: underline; cursor: pointer" @click="handleChain(item)">{{item.contract_name}}</span>
            </div>
            <div>
              <span>票据名称：</span>
              <span>{{item.name}}</span>
            </div>
            <div>
              <span>付款人：</span>
              <span :style="!item.payment_info || !item.payment_info.payment  ? 'color: #999' : ''">{{item.payment_info ? (item.payment_info.payment || '未填写') : '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_infoline">
            <div>
              <span>票据类型：</span>
              <span>{{item.type}}</span>
            </div>
            <div>
              <span>票据金额（元）：</span>
              <span style="color: #333">{{item.amount}}</span>
            </div>
            <div>
              <span>汇票到期日：</span>
              <span :style='!item.payment_date ? "color: #999": ""'>{{item.payment_date || '无到期日'}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="second_list_none" v-if="showList.length === 0">
        <img src="../../../../../static/img/other/none.png" alt="">
        <h4 style="color: #999">申请中未包含第二还款来源</h4>
      </div>
      <!-- 其他担保 -->
      <div class="financing-item__title">
        <span>其他担保</span>
      </div>
      <div class="other_guarantee">
        <div class="content_second">
          <div class="second_list">
            <div class="div_list_content" v-if="otherList.length !== 0" v-for="(item, index) in otherList" :key="index">
              <div class="top">
                <ul>
                  <li><span>类型：</span><p>{{item.collateral_type === '1' ? '房产' : item.collateral_type === '2' ? '汽车' : item.collateral_type === '3' ? '股权' : '基金'}}</p></li>
                  <li><span>市场估值（元）：</span><p style="font-weight: bolder">{{Number(item.appraisement).toFixed(2)}}</p></li>
                  <li></li>
                </ul>
              </div>
              <div class="list" v-if="item.collateral_type === '1'">
                <ul>
                  <li><span>城市：</span><p>{{item.city}}</p></li>
                  <li><span>小区地址：</span><p>{{item.full_address}}</p></li>
                  <li><span>面积：</span><p>{{item.area}}</p></li>
                  <li>
                    <span>评估报告：</span>
                    <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                    <p @click="handleFileDetail(it)" class="color_onlike" v-if="item.att_list.length !== 0 && item.att_list" v-for="(it, index1) in item.att_list" :key='index1'>{{it.name}}</p>
                  </li>
                </ul>
              </div>
              <div class="list" v-if="item.collateral_type === '2'">
                <ul>
                  <li><span>城市：</span><p>{{item.city}}</p></li>
                  <li><span>车辆型号：</span><p>{{item.car_type}}</p></li>
                  <li>
                    <span>评估报告：</span><p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                    <p @click="handleFileDetail(it)" class="color_onlike" v-if="item.att_list.length !== 0 && item.att_list" v-for="(it, index1) in item.att_list" :key='index1'>{{it.name}}</p>
                  </li>
                </ul>
              </div>
              <div class="list" v-if="item.collateral_type === '3'">
                <ul>
                  <li><span>公司名称：</span><p>{{item.business_name}}</p></li>
                  <li><span>股权比例：</span><p>{{item.ratio}}</p></li>
                  <li>
                    <span>评估报告：</span><p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                    <p @click="handleFileDetail(it)" class="color_onlike" v-if="item.att_list.length !== 0 && item.att_list" v-for="(it, index1) in item.att_list" :key='index1'>{{it.name}}</p>
                  </li>
                </ul>
              </div>
              <div class="list" v-if="item.collateral_type === '4'">
                <ul>
                  <li><span>基金简称：</span><p>{{item.foundation}}</p></li>
                  <li>
                    <span>评估报告：</span><p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                    <p @click="handleFileDetail(it)" class="color_onlike" v-if="item.att_list.length !== 0 && item.att_list" v-for="(it, index1) in item.att_list" :key='index1'>{{it.name}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="second_list_none" v-if="otherList.length === 0">
            <img src="../../../../../static/img/other/none.png" alt="">
            <h4 style="color: #999">申请中未包含其他担保</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>/
<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
export default {
  name: 'repayOfSecond',
  data () {
    return {
      coverSum: '',
      location: [],
      showList: [],
      typeList: ['现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）'],
      otherList: [],
      assuresSum: 0,
      typeList: ['', '房产', '汽车', '股权', '基金'],
      // tq: 数字券, yq 商券 , jq 银券
      pics: ['', require('../../../../../static/img/tickets/jq.png'), require('../../../../../static/img/tickets/yq.png'), require('../../../../../static/img/tickets/tq.png')]
    }
  },
  components: {
    // AppNav, 
    Location
  },
  beforeMount () {
    const that = this
    this.location = [
      {
        title: '我的融资',
        url: '/financing_app'
      },
      {
        title: '第二还款来源'
      }
    ],
    that.$ajax.get(`/api/financing/application/${that.$route.query.financing_id}`).then(res => {
      console.log(res)
      if (res.status === 200) {
        that.showList = res.data.second_repayment
        that.otherList = res.data.application_data.other_collateral
      }
    })
  },
  methods: {
    handleFileDetail (item) {
      window.open(this.$root_url() + item.url, '_blank')
    },
    // 跳转链式记账
    handleChain (el) {
      console.log(el)
      let id = el.chain_id
      let path = '#/chain_app/payment_chain?id='
      if (el.chain_type) {
        el.chain_type === 2 ? path = '#/chain_app/payment_chain?id=' : path = '#/chain_app/receive_chain?id='
      }
      let str = ''
      window.open(`${path}${id}`)
    }
  }
}
</script>
<style lang='less' scoped>
.cover_container {
  height: 100%;
  background: #f4f8f9;
  //padding-top: 70px;
  display: flex;
  width: 100%;
  .cover_wrap {
    // margin: 0 30px;
    margin: 21px 71px 30px 19px;
    background: #fff;
    width: 100%;
    color: #333;
    // padding: 0 20px;
    padding-bottom: 24px;
    // border: 1px solid #e1e6f0;
    .financing-item__title {
      margin: 10px 40px 0 40px;
      height: 60px;
      border-bottom: 1px solid #e1e6f0;;
      display: flex;
      align-items: flex-end;
      &.hide-line {
        border: none
      }
      span {
        display: inline-block;
        padding-left: 8px;
        color: #333;
        font-weight: bolder;
        border-left: 5px solid #eb6100;
        margin-bottom: 5px;
      }
    }
    // .top-nav {
    //   height: 60px;
    //   background: #ffffff;
    //   box-shadow: 2px 0 4px #ddd;
    // }
    .cover_pool_list {
      margin: 30px 40px 30px 60px;
      padding: 0 20px;
      li {
        background: #fff;
        border: 1px solid #e1e6f0;
        border-bottom: none;
        list-style: none;
        margin-top: 20px;
        border-radius: 2px;
        .show_item_title {
          padding: 0 65px 0 25px;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 45px;
          background: #f7f7f7;
          .show_info {
            display: flex;
            align-items: center;
            img {
              height: 42px;
              margin-right: 22px;
            }
            &>div:last-child {
              font-size: 14px;
              span:first-child {
                font-weight: bolder;
                color: #666;
              }
              span:last-child {
                color: #333;
                font-weight: bolder;
              }
            }
          }
        }
        .show_item_infoline {
          padding: 0 80px;
          display: flex;
          line-height: 44px;
          border-bottom: 1px solid #e1e6f0;
          justify-content: flex-start;
          div {
            width: 25%;
            font-size: 14px;
          }
        }
      }
    }
    .other_guarantee {  
      background:#ffffff;
      // border:1px solid #e1e6f0;
      border-radius:2px;
      // width:100%;
      height:auto;
      margin: 30px 40px 30px 60px;
      padding: 0 20px;
      .content_second {
        position: relative;
        h3 {
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#333333;
          letter-spacing:0;
          text-align:left;
          font-weight: bold;
          padding: 21px 0 0 22px;
        }
        .btn {
          position: absolute;
          right: 0px;
          top: 19px;
          i {
            margin-right: 10px;
          }
          button {
            outline: none;
            border: none;
            color: #fff;
            background:#e87626;
            border-radius:2px;
            width:181px;
            height:28px;
          }
        }
        .second_list {
          // padding: 0 60px 0 23px;
          .div_list_content {
            background:#ffffff;
            border:1px solid #e1e6f0;
            border-radius:2px;
            width:100%;
            height:88px;
            margin-top: 19px;
            .top {
              background:#f7f7f7;
              width:100%;
              height:45px;
              position: relative;
              .el-icon-delete {
                position: absolute;
                top: 16px;
                right: 52px;
                font-family:PingFangSC-Semibold;
                font-size:14px;
                color:#e87626;
                font-weight: bold;
                cursor: pointer;
              }
              ul {
                display: flex;
                flex-direction: row;
                padding: 0 82px;
                li {
                  width: 25%;
                  height: 45px;
                  line-height: 45px;
                  span {
                    float: left;
                    font-family:PingFangSC-Regular;
                    font-size:14px;
                    color:#666666;
                    letter-spacing:0;
                    text-align:left;
                  }
                  p {
                    float: left;
                    font-family:PingFangSC-Semibold;
                    font-size:14px;
                    color:#333333;
                    letter-spacing:0;
                    text-align:left;
                    max-width: 140px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .color_onlike {
                    font-family:PingFangSC-Semibold;
                    font-size:14px;
                    color:#eb6100;
                    letter-spacing:0;
                    text-align:left;
                    text-decoration: underline;
                    margin-right: 12px;
                    cursor: pointer;
                  }
                }
              }
            }
            .list {
              height: 44px;
              width: 100%;
              // border-bottom:1px solid #e1e6f0;
              ul {
                display: flex;
                flex-direction: row;
                padding: 0 82px;
                li {
                  width: 45%;
                  height: 44px;
                  line-height: 44px;
                  span {
                    float: left;
                    font-family:PingFangSC-Regular;
                    font-size:14px;
                    color:#666666;
                    letter-spacing:0;
                    text-align:left;
                  }
                  p {
                    float: left;
                    font-family:PingFangSC-Semibold;
                    font-size:14px;
                    color:#333333;
                    letter-spacing:0;
                    text-align:left;
                    max-width: 140px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .color_onlike {
                    font-family:PingFangSC-Semibold;
                    font-size:14px;
                    color:#eb6100;
                    letter-spacing:0;
                    text-align:left;
                    text-decoration: underline;
                    margin-right: 12px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.second_list_none {
  text-align: center;
  min-height: 200px;
  img {
    width:162px;
    height:125px;
    margin-top: 20px;
  }
}
</style>
