<template>
  <div class="payable">
    <button class="fixed_btn" @click="toCreate"><i class="el-icon-plus"></i>创建应付记账</button>
    <div v-if='chain_list.length > 0'>
      <div class="payable_list" v-for="(item, index) in chain_list" :key="index">
        <div class="list_top">
          <div class="flex-top">
            <div class="flex-top__left">
              <h3>采购项目</h3>
            </div>
            <div class="flex-top__center" >
              <div v-if='item.purchase_contract.length > 0' v-for="(v, i) in item.purchase_contract" :key="i">
                <img class="margin_left" src="static/img/chain/chain_circle_m_b.png" alt=""><p>{{ v.name }}</p>
                <p class="margin_left">交易公司：</p><span>{{ v.partner_company_name }}</span>
                <p class="margin_left">创建时间：</p><span class="timer">{{ v.create_time }}</span>
              </div>
              <div v-if='item.purchase_contract.length === 0'>
                <div class="empty">暂无采购项目</div>
              </div>
            </div>
            <div class="flex-top__right">
              <button class="go" @click="toChain(item.id)">查看</button>
              <button class="into">删除</button>
            </div>
          </div>
          <div class="flex-center" v-if="item.sales_contract.length > 0">
            <div class="flex-center__left">
              <h3>关联销售</h3>
            </div>
            <div class="flex-center__right">
              <div>
                <img class="margin_left" src="static/img/chain/chain_circle_m_y.png" alt=""><p>{{ item.sales_contract[0].name }}</p>
                <p class="margin_left">交易公司：</p><span>{{ item.sales_contract[0].partner_company_name }}</span>
                <p class="margin_left">创建时间：</p><span class="timer">{{ item.sales_contract[0].create_time }}</span>
              </div>
            </div>
          </div>
          <div class="center" style="line-height:58px;" v-else>
            <div class="top_left" style="width: 113px;">
              <h3>关联销售</h3>
            </div>
            <div class="top_center" style="padding-left:45px;font-size:14px;">暂无关联销售</div>
          </div>
          <div class="bottom">
            <dl>
              <dt class="ticket-title">
                <span>应收类</span>
              </dt>
              <dt><img src="static/img/tickets/jq_01.png" alt=""></dt>
              <dd>
                <p class="one">银券总额(元)：<span>{{toThousands(item.ticket.bank_ticket.sum) || 0}}</span></p>
                <p class="two"><span>{{item.ticket.bank_ticket.count || 0}}</span> 张</p>
              </dd>
            </dl>
            <dl>
              <dt><img src="static/img/tickets/yq_01.png" alt=""></dt>
              <dd>
                <p class="one">商券总额(元)：<span>{{toThousands(item.ticket.business_ticket.sum) || 0}}</span></p>
                <p class="two"><span>{{item.ticket.business_ticket.count || 0}}</span> 张</p>
              </dd>
            </dl>
            <dl>
              <dt><img src="static/img/tickets/tq_01.png" alt=""></dt>
              <dd>
                <p class="one">数券总额(元)：<span>{{toThousands(item.ticket.digital_ticket.sum) || 0}}</span></p>
                <p class="two"><span>{{item.ticket.digital_ticket.count || 0}}</span> 张</p>
              </dd>
            </dl>
          </div>
          <div class="bottom">
            <dl>
              <dt class="ticket-title">
                <span>应付类</span>
              </dt>
              <dt><img class="barIcon" src="static/img/tickets/redBar.png" alt=""></dt>
              <dd>
                <p class="one">红条总额(元)：<span>{{toThousands(item.bar.red_bar.sum) || 0}}</span></p>
                <p class="two"><span>{{item.bar.red_bar.count || 0}}</span> 张</p>
              </dd>
            </dl>
            <dl>
              <dt><img class="barIcon" src="static/img/tickets/yellowBar.png" alt=""></dt>
              <dd>
                <p class="one">黄条总额(元)：<span>{{toThousands(item.bar.yellow_bar.sum) || 0}}</span></p>
                <p class="two"><span>{{item.bar.yellow_bar.count || 0}}</span> 张</p>
              </dd>
            </dl>
            <dl>
              <dt><img class="barIcon" src="static/img/tickets/whiteBar.png" alt=""></dt>
              <dd>
                <p class="one">白条总额(元)：<span>{{toThousands(item.bar.white_bar.sum) || 0}}</span></p>
                <p class="two"><span>{{item.bar.white_bar.count || 0}}</span> 张</p>
              </dd>
            </dl>
          </div>
          <div class="diamond">
            <div class="diamond-title"> 
              <span>等级</span>
              <span>{{calc(item.diamond) === 0 ? '无' : calc(item.diamond) + '级'}}</span>
            </div>
            <div class="diamond-content">
              <span class="diamond-content__cutline"></span>
              <div class="diamond-group">
                <div v-for="(_dia, i) in item.diamond" :key="i" class="diamond-group__item">
                  <img :src="_dia ? ((i < 5 )? 'static/img/chain/diamond_o.png' : 'static/img/chain/diamond_b.png'): 'static/img/chain/diamond_g.png'" alt="">
                  <p>{{diamondList[i]}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="payable_list empty">
      <span>暂无应付记账</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'payable',
  data () {
    return {
      // 销售项目---关联采购
      chain_list: [],
      diamondList: ['销售', '销售出货', '销售运输', '销售验收', '销售结算', '采购', '采购运输', '采购验收', '采购结算']
    }
  },
  methods: {
    calc (list) {
      let _count = 0
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (list[i]) {
            _count++
          }
        }
      }
      return _count
    },
    toCreate () {
      this.$router.push({
        path: '/chain_app/payment_chain_create'
      })
    },
    toChain (chain_id) {
      this.$router.push({
        path: '/chain_app/storage_chain?id=' + chain_id
      })
      //this.$scrollToTop()
    }
  },
  mounted () {
    var that = this
    const loading = this.$loading({
      lock: true,
      text: '拼命加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
    })
    that.$ajax.get('/api/chain/chain_list/?type=' + 2).then(res => {
      that.chain_list = res.data
      loading.close()
    })
  }
}
</script>

<style lang="less" scoped>
.payable {
  background:#ffffff;
  border-radius:2px;
  width:100%;
  height:auto;
  padding: 20px 83px 67px 30px;
  .fixed_btn {
    border:1px solid #eb6100;
    border-radius:2px;
    width:176px;
    height:32px;
    font-family:PingFangSC-Regular;
    font-size:14px;
    color:#eb6100;
    letter-spacing:0;
    text-align:center;
    background: none;
    margin-bottom: 8px;
    outline: none;
    i {
      display: inline-block;
      margin-right: 15px;
    }
  }
  .payable_list {
    border:1px solid #e1e6f0;
    box-shadow:0 0 10px 1px #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    margin-bottom: 10px;
    &.empty {
      line-height: 50px;
      color: #999;
      text-align: center;
      font-weight: bolder;
    }
    .list_top {
      background:#f8f8f8;
      border:1px solid #e1e6f0;
      border-radius:2px;
      width:100%;
      height:auto;
      .top {
        height: auto;
        display: flex;
        justify-content: space-around;
        padding: 18px 29px;
        border-bottom:1px solid #e1e6f0;
        position: relative;
        .top_right {
          // position: absolute;
          right: 30px;
          top: 0;
          button {
            outline: none;
            border-radius:2px;
            width:112px;
            height:30px;
            margin-top: 15px;
          }
          .go {
            background:#e87626;
            border: none;
            font-family:PingFangSC-Semibold;
            font-size:12px;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
          }
          .into {
            background:#b8b4b4;
            border: none;
            font-family:PingFangSC-Semibold;
            font-size:12px;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
            margin-left: 20px;
          }
        }
        .left {
          width: 88px;
          height: auto;
          border-right:1px dashed #e1e6f0;
          h3 {
            width: 88px;
            height: auto;
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            font-weight: bold;
            text-align:left;
          }
        }
        .right {
          flex: 1;
          .top_right {
            position: absolute;
            right: 30px;
            top: 0;
            button {
              outline: none;
              border-radius:2px;
              width:112px;
              height:30px;
              margin-top: 15px;
            }
            .go {
              background:#e87626;
              border: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#ffffff;
              letter-spacing:0;
              text-align:center;
            }
            .into {
              background:#b8b4b4;
              border: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#ffffff;
              letter-spacing:0;
              text-align:center;
              margin-left: 20px;
            }
          }
          ul {
            display: flex;
            justify-content: space-around;
            line-height: 23px;
            margin-bottom: 10px;
            li:first-child {
              p {
                height: 23px;
                font-family:PingFangSC-Regular;
                font-size:14px;
                color:#333333;
                letter-spacing:0;
                text-align:left;
                float: left;
              }
              img {
                margin: 6px 7px 0 0;
                float: left;
                width: 12px;
                height: 12px;
              }
            }
            li:nth-child(2) {
              height: 23px;
              p {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
              }
              span {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#333333;
                letter-spacing:0;
                text-align:left;
                max-width: 144px;
                // min-width: 144px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            li:last-child {
              height: 23px;
              p {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
              }
              span {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#e87626;
                letter-spacing:0;
                text-align:left;
              }
            }
          }
        }
      }
      .flex-top {
        display: flex;
        padding: 8px 29px;
        min-height: 33px;
        line-height: 33px;
        border-bottom:1px solid #e1e6f0;
        .flex-top__left {
          display: flex;
          align-items: center;
          width: 85px;
          height: auto;
          border-right:1px dashed #e1e6f0;
          h3 {
            width: 88px;
            height: auto;
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            font-weight: bold;
            text-align:left;
          }
        }
        .flex-top__center {
          display: flex;
          flex: 1;
          flex-wrap: wrap; 
          div {
            display: flex;
            line-height: 23px;
            margin: 8px 0; 
            align-items: center;
            &.empty {
              font-size:14px;
              padding-left: 32px;
              color: #999;
              font-weight: bolder;
            }
            p {
              height: 23px;
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              &.margin_left {
                margin-left: 15px 
              }
            }
            img {
              margin-right: 8px;
              width: 12px;
              height: 12px;
              &.margin_left {
                margin-left: 15px 
              }
            }
            span {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              max-width: 144px;
              // min-width: 144px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.timer {
                font-size:12px;
                color:#e87626;
                letter-spacing:0;
                text-align:left;
              }
            }
          }
        }
        .flex-top__right {
          button {
              outline: none;
              border-radius:2px;
              width:112px;
              height:30px;
              margin-top: 15px;
            }
            .go {
              background:#e87626;
              border: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#ffffff;
              letter-spacing:0;
              text-align:center;
            }
            .into {
              background:#b8b4b4;
              border: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#ffffff;
              letter-spacing:0;
              text-align:center;
              margin-left: 20px;
            }
        }
      }
      .flex-center {
        display: flex;
        padding: 8px 29px;
        min-height: 33px;
        line-height: 33px;
        border-bottom:1px solid #e1e6f0;
        .flex-center__left {
          display: flex;
          align-items: center;
          width: 85px;
          height: auto;
          border-right:1px dashed #e1e6f0;
          h3 {
            width: 88px;
            height: auto;
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            font-weight: bold;
            text-align:left;
          }
        }
        .flex-center__right {
          display: flex;
          flex: 1;
          flex-wrap: wrap; 
          div {
            display: flex;
            line-height: 23px;
            margin: 8px 0; 
            align-items: center;
            &.empty {
              font-size:14px;
              padding-left:40px;
              color: #999;
              font-weight: bolder;
            }
            p {
              height: 23px;
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              &.margin_left {
                margin-left: 35px 
              }
            }
            img {
              margin-right: 8px;
              width: 12px;
              height: 12px;
              &.margin_left {
                margin-left: 15px 
              }
            }
            span {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              max-width: 144px;
              // min-width: 144px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.timer {
                font-size:12px;
                color:#e87626;
                letter-spacing:0;
                text-align:left;
              }
            }
          }
        }
      }
      .center {
        height: 58px;
        border-bottom:1px solid #e1e6f0;
        .top_left {
          width: 240px;
          float: left;
          height: 58px;
          h3 {
            width: 114px;
            height: 41px;
            font-family:PingFangSC-Semibold;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            font-weight: bold;
            text-align:center;
            line-height: 41px;
            border-right:1px dashed #e1e6f0;
            margin-top: 9px;
            float: left;
          }
          p {
            float: right;
            height: 58px;
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:left;
            line-height: 58px;
            img {
              margin: 22px 7px 0 0;
              float: left;
              width: 12px;
              height: 12px;
            }
          }
        }
        .top_center {
          float: left;
          height: 58px;
          ul {
            display: flex;
            flex-direction: row;
            line-height: 58px;
            li:first-child {
              height: 58px;
              padding-left: 81px;
              p {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
              }
              span {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#333333;
                letter-spacing:0;
                text-align:left;
                max-width: 224px;
                white-space: nowrap;
                min-width: 144px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            li:last-child {
              padding-left: 81px;
              height: 58px;
              p {
                float: left;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
              }
              span {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#e87626;
                letter-spacing:0;
                text-align:left;
              }
            }
          }
        }
      }
    .bottom {
      width:100%;
      height:57px;
      display: flex;
      flex-direction: row;
      // background: #fff;
      dl {
        flex: 1;
        text-align: center;
        border-right:1px solid #e1e6f0;
        height:57px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        dt {
          img {
            margin: 10px 10px 0 60px;
            &.barIcon {
              width: 36px;
            }
          }
          &.ticket-title {
            position: absolute;
            line-height: 57px;
            left: 20px;
            span {
              color: #666;
              font-weight: bolder;
              font-size: 14px;  
            }
          }
        }
        dd {
          display: flex;
          align-items: center;
          .one {
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#362323;
            letter-spacing:0;
            padding-right: 12px;
            border-right:1px dashed #999999;
            white-space: nowrap;
            span {
              font-family:PingFangSC-Semibold;
              color:#333333;
              letter-spacing:0;
              display: inline-block;
              width: 100px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: right;
              vertical-align: bottom;
            }
          }
          .two {
            padding-left: 12px;
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#999999;
            letter-spacing:0;
            display: inline-block;
            width: 60px;
            span {
              font-family:PingFangSC-Semibold;
              color:#333333;
              letter-spacing:0;
            }
          }
        }
      }
      dl:last-child {
        border: none;
      }
    }
      .diamond {
        height: 100px;
        background: #fff;
        border-top: 1px dashed #e1e6f0;
        overflow: hidden;
        .diamond-title {
          padding: 8px 10px;
          font-size: 14px;
          span {
            color: #333333;
            font-weight: bolder;
            margin: 0 20px 0 10px;
          }
        }
        .diamond-content {
          margin-top: 10px;
          position: relative;
          .diamond-content__cutline {
            width: 90%;
            position: absolute;
            border: 1px dashed #e1e6f0;
            display: block;
            left: 5%;
            top: 5px;
          }
          .diamond-group {
            display: flex;
            justify-content: space-between;
            .diamond-group__item {
              flex: 1;
              text-align: center;
              img {
                position: relative;
              }
              p {
                color: #666;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
