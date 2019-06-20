<template>
  <div class='assets'>
    <div class='assets_board'>
      <!-- <appNav :father='step' type='2'></appNav> -->
      <div class='assets_content'>
        <!-- 信贷统计 -->
        <!-- <div class='assets_list'>
          <h3><img src="static/img/leftbar/area.png" alt="">区域企业</h3>
        </div> -->
        <div class="c_assets_bottom" v-if="businessList.length !== 0">
          <div class="assets_cards">
            <div class="assets_card_item" v-for="(item, index) in businessList" :key='index'>
              <div class="assets_card_top">
                <!-- <div class="verify">
                  <img src="../../../static/img/authentication/jiuxing.png" alt="">
                  <img v-if='twcx_verified_status' src="../../../static/img/authentication/tw-2.png" alt="">
                  <img v-else src="../../../static/img/authentication/tw-1.png" alt="">
                  <img v-if='cfca_verified_status' src="../../../static/img/authentication/CFCA-2.png" alt="">
                  <img v-else src="../../../static/img/authentication/CFCA-1.png" alt="">
                </div> -->
                <img v-if="item.is_friend" class="friend" src="static/img/tickets/friend.png" alt="">
                <div class="assets_card_img">
                  <!-- <img src="../../../static/img/tickets/default_business.png" alt=""> -->
                  <img :src="showIcon(item.avatar)" alt="">
                </div>
                <div class="assets_card_text">
                  <div class="verify" v-if="item.auth_dict">
                    <span class="h3">{{item.name}}</span>
                    <img src="static/img/authentication/jiuxing.png" alt="" title="九星认证通过">
                    <!-- <img v-if='item.auth_dict.twcx_auth' src="static/img/authentication/tw-2.png" alt="">
                    <img v-else src="static/img/authentication/tw-1.png" alt=""> -->
                    <img v-if='item.auth_dict.cfca_auth' src="static/img/authentication/CFCA-2.png" alt="" title="天威诚信认证通过">
                    <img v-else src="static/img/authentication/CFCA-1.png" alt="" title="天威诚信认证未通过">
                  </div>
                  <div class="ticetk_cards" v-if='item.ticket_dict'>
                    <div v-if="item.ticket_dict.bank_ticket">
                      <img src="static/img/tickets/yinquan.png" alt="">
                      <span>{{item.ticket_dict.bank_ticket.count}}张</span>
                    </div>
                    <div v-if="item.ticket_dict.business_ticket">
                      <img src="static/img/tickets/shangquan.png" alt="">
                      <span>{{item.ticket_dict.business_ticket.count}}张</span>
                    </div>
                    <div v-if="item.ticket_dict.digital_ticket">
                      <img src="static/img/tickets/shuquan.png" alt="">
                      <span>{{item.ticket_dict.digital_ticket.count}}张</span>
                    </div>
                  </div>
                  <!-- <div class="ticetk_cards" v-else>
                    <div>
                      <img src="static/img/tickets/jq_01.png" alt="">
                      <span>0张</span>
                    </div>
                    <div>
                      <img src="static/img/tickets/yq_01.png" alt="">
                      <span>0张</span>
                    </div>
                    <div>
                      <img src="static/img/tickets/tq_01.png" alt="">
                      <span>0张</span>
                    </div>
                  </div> -->
                  <div class='btn_communicate' style="right: 90px" v-if="item.apply_status === '0'">
                    <button @click="handleCustomer(item, index)">添加客户</button>
                  </div>
                  <div class='btn_communicate' style="right: 90px" v-if="item.apply_status === '1'">
                    <span>客户审批中</span>
                  </div>
                  <div class='btn_communicate' style="right: 90px" v-if="item.apply_status === '2'">
                    <span>客户已拒绝</span>
                  </div>
                  <div class='btn_communicate' style="right: 90px" v-if="item.apply_status === '3'">
                    <span>我的客户</span>
                  </div>
                  <div v-if="item.friend_status === '0' || item.friend_status === '2'" class="btn_communicate">
                    <button @click="makeFriend(item, index)">添加好友</button>
                  </div>
                  <div v-if="item.friend_status === '1'" class="btn_communicate">
                    <span>您已发送申请</span>
                  </div>
                  <div v-if="item.friend_status === '3'" class="btn_communicate">
                    <button @click="communicate(item)">立即沟通</button>
                  </div>
                </div>
              </div>
              <div class="assets_card_bot">
                <div @click="handleNav($event, item)">
                  <img src="static/img/tickets/index.png" alt="">
                  <span>企业首页</span>
                </div>
                <div @click="handleNav1($event, item)">
                  <img src="static/img/tickets/huaxiang.png" alt="">
                  <span>企业数据资产</span>
                </div>
                <!-- <div @click="handleNav($event, item.id, 2)">
                  <img src="../../../static/img/tickets/jizhang.png" alt="">
                  <span>链式记账</span>
                </div>
                <div @click="handleNav2($event, item.id)">
                  <img src="../../../static/img/tickets/zichan.png" alt="">
                  <span>资产池</span>
                </div>
                <div @click="handleNav1($event, item.id, 5)">
                  <img src="../../../static/img/tickets/cooperation.png" alt="">
                  <span>交易信用</span>
                </div>
                <div @click="handleNav1($event, item.id, 4)">
                  <img src="../../../static/img/tickets/zengxin.png" alt="">
                  <span>资产增信</span>
                </div>
                <div @click="handleNav1($event, item.id, 5)">
                  <img src="../../../static/img/tickets/cooperation.png" alt="">
                  <span>交易信用</span>
                </div>
                <div @click="handleNav1($event, item.id, 7)">
                  <img src="../../../static/img/tickets/rongzi.png" alt="">
                  <span>融资状况</span>
                </div>    -->
              </div>
            </div>
          </div>
        </div>
        <div class="null_list" v-if="businessList.length === 0">本地区暂无企业</div>
        <div class="c_assets_pagination" v-if="total">
          <el-pagination
            background
            :page-size="6"
            layout="prev, pager, next"
            :total="total"
            @current-change='handelePage'>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'areaList',
  data () {
    return {
      step: {selIndex: 5},
      businessList: [],
      page: 1,
      total: 0,
      address: '',
      twcx_verified_status: '',
      cfca_verified_status: '',
      scm_to_account: '',
      friendId: '',
      message: ''
    }
  },
  mounted () {
    var that = this
    that.$ajax.get('/api/oth/reginal_company/?page_size=6&page=1').then(res => {
      if (res.status === 200) {
        that.businessList = res.data.results
        that.total = res.data.count
      } else {
        that.$message.error(res.data.msg)
      }
    })
    that.$ajax.get('/api/financing/region_name/').then(res => {
      if (res.status === 200) {
        that.address = `${res.data.province} ${res.data.city}`
      }
    })

    let _location = [{
      title: this.$route.meta.title,
      url: this.$route.meta.url
    }]
  },
  methods: {
    // 沟通
    communicate: function (item) {
      const that = this
      that.$emit('listerToChild', 1, item.id, item.name)
    },
    // 添加好友
    makeFriend (item, index) {
      var that = this
      that.$ajax.post('/api/friend/apply/', {company_id: item.id}).then((res, err) => {
        this.$message({
          message: '添加成功，请等待对方同意',
          type: 'success',
          duration: 2000
        })
        let businessList = that.businessList
        businessList[index]['friend_status'] = '1'
        that.businessList = businessList
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 设置默认图标
    showIcon: function (url) {
      if (url) {
        if (url === '/static/default_avatar.png') {
          return 'static/img/tickets/default_business.png'
        } else {
          return this.$root_url() + url
        }
      } else {
        return 'static/img/tickets/default_business.png'
      }
    },
    // 查看企业资产
    handleNav: function ($event, item) {
      window.open('#/enterpriseBlog?bType=2&bid=' + item.id, '_blank')
    },
    // 查看企业数据资产
    handleNav1: function ($event, item) {
      window.open('#/area_app/business_detail?company_id=' + item.id, '_blank')
    },
    handelePage: function (page) {
      var that = this
      that.$ajax.get('/api/oth/reginal_company/?page_size=6&page=' + page).then(res => {
        // console.log(res)
        if (res.status === 200) {
          that.businessList = res.data.results
          that.total = res.data.count
        } else {
          that.$message.error(res.data.msg)
        }
      })
    },
    handleCustomer (item, index) {
      // console.log(item)
      const that = this
      that.$confirm(`确认添加${item.name}为客户，并分配到未分组名单？`, '添加客户').then(res => {
        that.$ajax.post('/api/institution/customer/', {business: item.id}).then(res => {
          that.$message.success('添加成功')
          let businessList = that.businessList
          businessList[index].apply_status = '3'
          that.businessList = businessList
        })
      })
    }
  }
}
</script>

<style scoped lang='less'>
// @import url('./iconfont.css');
.assets {
  min-height: 100%;
  //padding-top: 70px;
  // display: flex;
  width: 100%;
  // padding-top: 120px;
  .assets_board {
    // margin: 0 auto;
    min-height: 100%;
    width: 100%;
    // display: flex;
  }
  .assets_content {
    // width: 100%;
    // padding: 20px 40px 20px 40px;
    // padding-left: 290px;
    // padding-left: 60px;
    background: #f5f7f8;
    // 信贷统计
    .assets_list {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      padding-left: 50px;
      background: #fff;
      img{
        margin-right: 10px;
        vertical-align: middle;
      }
      div {
        display: flex;
        height: 100%;
        align-items: center;
        div {
          font-size: 14px;
          color: #3c4046;
        }
      }
    }
    .c_assets_bottom{
      padding: 0px 10px;
      // width: 95%;
      margin: 0 auto;
      .assets_cards {
        padding: 30px 50px;
        // max-width: 1600px;
        // height: 710px;
        // border: 1px solid #000;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        .assets_card_item {
          width: 47%;
          height: 230px;
          box-shadow: 0 0 12px #eaeaea;
          border-radius: 6px;
          margin: 15px;
          background: #fff;
          // cursor: pointer;
          .assets_card_top {
            position: relative;
            height: 140px;
            margin: 15px 20px;
            margin-bottom: 0;
            border-bottom: 1.4px dashed #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('/static/img/adminbg.png');
            background-size: 70%;
            .friend {
              width: 60px;
              position:absolute;
              right: -20px;
              top: -15px;
            }
            .verify {
              img{
                vertical-align: middle
              }
            }
            .assets_card_img {
              width: 97px;
              height: 97px;
              img {
                border-radius: 50%;
                width: 97px;
                height: 97px;
              }
            }
            .assets_card_text {
              width: calc(100% - 97px);
              padding: 10px 0 5px 40px;
              .h3 {
                font-size: 20px;
                font-weight: 600;
                vertical-align: middle
              }
              .ticetk_cards{
                display: flex;
                justify-content: flex-start;
                div {
                  position: relative;
                  margin-top: 20px;
                  margin-right: 20px;
                  width: 20%;
                  img {
                    vertical-align: middle;
                  }
                  span {
                    vertical-align: middle;
                    font-size: 14px;
                    color: #ea6100;
                  }
                }
              }
              .btn_communicate {
                position: absolute;
                right: 0;
                bottom: 10px;
                button {
                  width: auto;
                  padding: 0 10px;
                  height: 28px;
                  border: none;
                  background: #eb6100;
                  color: #fff;
                  border-radius: 5px;
                  outline: none;
                }
                span {
                  color: #eb6100;
                  font-size: 14px;
                  line-height: 28px;
                }
              }
            }
          }
          .assets_card_bot {
            height: 68px;
            margin: 0 25px;
            display: flex;
            justify-content: flex-start;
            align-content: center;
            flex-wrap: wrap;
            div {
              width: 20%;
              height: 40px;
              margin: 10px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              cursor: pointer;
              img{
                width: 24px;
                height: 24px;
                margin-right: 10px;
              }
              span {
                font-size: 14px;
                color: #666;
                font-weight: bold;
              }
              span:hover {
                color: #ea6100;
              }
            }
          }
        }
        .assets_card_item:hover {
          box-shadow: 4px 8px 16px #dadada;
          // transform: scale(1.08);
        }
      }
    }
    .null_list {
      width: 95%;
      padding: 30px 50px;
      line-height: 90px;
      text-align: center;
      background: #fff;
      margin: 0 auto;
      color: #999;
    }
    .c_assets_pagination {
      display: flex;
      justify-content: center;
      height: 120px;
      align-items: center;
    }
  }
}
</style>
<style scoped>
.is-active {
  color: #000 !important;
}
.el-tabs__item:hover {
  color: #000 !important;
}
.el-tabs__active-bar {
  background: #eb6100 !important;
}
/* .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #eb6100 !important;
} */
.el-button--text {
  color: #cccccc;
}
</style>
