<template>
  <div class='assets'>
    <div class='assets_board'>
      <!-- <appNav :father='father' type='2'></appNav> -->
      <div class='assets_content'>
        <!-- 信贷统计 -->
        <div class='assets_list'>
          <h3><img src="../../../static/img/leftbar/mykehu.png" alt="">我的客户</h3>
        </div>
        <div class="filter">
          <div class="group">
            <select @change="changeType($event)">
              <option value="请选择">请选择</option>
              <option v-for="(g, index) in groupList" :key="index" :value="index">{{ g.group_name }}</option>
            </select>
            <div class="togroup" @click="tomanage($event, 0)">分组管理</div>
            <div class="toadd" style='margin-left:20px;' @click="tomanage($event, 1)">添加商友</div>
            <div class="toapply" @click="tomanage($event, 2)">我的申请</div>
          </div>
          <div class="change_group">
            <span>移动到</span>
            <select @change="updateGroup($event)">
              <option value="请选择">请选择</option>
              <option v-if="groupList !== '无分组'" v-for="(group, index) in groupList" :value="index" :key="index">{{group.group_name}}</option>
            </select>
            <span :class="selItems.length === 0 ? 'noSel' : 'hasSel'" @click="changeGroup()">移动</span>
          </div>
        </div>
        <div class="c_assets_bottom" v-if="showArr.length !== 0">
          <div class="assets_cards">
            <div class="assets_card_item" v-for="(item, index) in showArr" :key='index'>
              <i class="el-icon-close" style="float: right;font-size: 18px;color: #999; padding: 10px; display: inline-block;" @click="delFriend($event, item)"></i>
              <div class="check_list">
                <el-checkbox-group v-model="checkList" @change="handleCheckedChange(item, index)">
                  <el-checkbox :key="index" :label='item.id'>
                    所在分组：<span v-if="item.group_name">{{item.group_name}}</span><span v-else>暂无</span>
                  </el-checkbox>
                </el-checkbox-group>
                <p style="text-align: right; font-size: 14px; margin-top: -15px;">添加时间：{{item.add_time}}</p>
              </div>
              <div class="assets_card_top">
                <div class="assets_card_img">
                  <img :src="showIcon(item.avatar)" alt="">
                </div>
                <div class="assets_card_text">
                  <div class="verify">
                    <span class="h3">{{item.business_name}}</span>
                    <span class="real">{{item.real_name}}</span>
                    <el-tooltip class="item" effect="dark" content="法人认证" placement="top-start">
                      <img src="../../../static/img/authentication/jiuxing.png" alt="">
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="天威诚信" placement="top-start">
                      <img v-if='twcx_verified_status' src="../../../static/img/authentication/tw-2.png" alt="">
                      <img v-else src="../../../static/img/authentication/tw-1.png" alt="">
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="CFCA" placement="top-start">
                      <img v-if='cfca_verified_status' src="../../../static/img/authentication/CFCA-2.png" alt="">
                      <img v-else src="../../../static/img/authentication/CFCA-1.png" alt="">
                    </el-tooltip>
                  </div>
                  <p style="font-size: 12px; color: #999999; padding-top: 10px;">联系电话：<span v-if="item.phone !== null && item.phone !== ''">{{item.phone}}</span><span v-else>暂无</span></p>
                  <div v-if="item.content_type === 'business'">
                    <div class="ticetk_cards" v-if="item.ticket_dict.receivable">
                      <el-tooltip class="item" effect="dark" content="银券" placement="top-start">
                        <div>
                          <img src="../../../static/img/tickets/jq_01.png" alt="">
                          <span>{{item.ticket_dict.receivable.ninstar_bank_ticket.number}}张</span>
                        </div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="商券" placement="top-start">
                        <div>
                          <img src="../../../static/img/tickets/yq_01.png" alt="">
                          <span>{{item.ticket_dict.receivable.ninstar_business_ticket.number}}张</span>
                        </div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="数券" placement="top-start">
                        <div>
                          <img src="../../../static/img/tickets/tq_01.png" alt="">
                          <span>{{item.ticket_dict.receivable.ninstar_digital_ticket.number}}张</span>
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="ticetk_cards" v-else>
                      <el-tooltip class="item" effect="dark" content="银券" placement="top-start">
                        <div>
                          <img src="../../../static/img/tickets/jq_01.png" alt="">
                          <span>0张</span>
                        </div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="商券" placement="top-start">
                        <div>
                          <img src="../../../static/img/tickets/yq_01.png" alt="">
                          <span>0张</span>
                        </div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="数券" placement="top-start">
                        <div>
                          <img src="../../../static/img/tickets/tq_01.png" alt="">
                          <span>0张</span>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="btn_communicate">
                    <button @click="communicate($event, item)">立即沟通</button>
                  </div>
                </div>
              </div>
              <div class="assets_card_bots" v-if="item.content_type === 'business'">
                <div @click="handleNav(item, item.content_obj_id)">
                  <img src="../../../static/img/tickets/index.png" alt="">
                  <span>企业首页</span>
                </div>
                <!-- <div @click="handleNav(item, item.content_obj_id, 1)">
                  <img src="../../../static/img/tickets/caiwu.png" alt="">
                  <span>财务状况</span>
                </div>
                <div @click="handleNav(item, item.content_obj_id, 2)">
                  <img src="../../../static/img/tickets/jizhang.png" alt="">
                  <span>链式记账</span>
                </div>
                <div>
                  <img src="../../../static/img/tickets/zichan.png" alt="">
                  <span>资产池</span>
                </div>
                <div @click="handleNav2(item, item.content_obj_id)">
                  <img src="../../../static/img/tickets/zichan.png" alt="">
                  <span>资产池</span>
                </div> -->
                <div @click="handleNav1(item, item.content_obj_id)">
                  <img src="../../../static/img/tickets/huaxiang.png" alt="">
                  <span>企业大数据画像</span>
                </div>
                <!-- <div @click="handleNav1(item, item.content_obj_id, 4)">
                  <img src="../../../static/img/tickets/zengxin.png" alt="">
                  <span>资产增信</span>
                </div>
                <div @click="handleNav1(item, item.content_obj_id, 5)">
                  <img src="../../../static/img/tickets/cooperation.png" alt="">
                  <span>交易信用</span>
                </div>
                <div @click="handleNav1(item, item.content_obj_id, 7)">
                  <img src="../../../static/img/tickets/rongzi.png" alt="">
                  <span>融资状况</span>
                </div> -->
              </div>
              <div class="assets_card_bots" v-else>
                <div @click="handleNav(item, item.content_obj_id)">
                  <img src="../../../static/img/tickets/index.png" alt="">
                  <span>企业首页</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="null_list" v-if="showArr.length === 0">暂无好友列表</div>
        <div class="c_assets_pagination" v-if="total">
          <el-pagination
            background
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            :current-page="currPage"
            @current-change='handelePage'>
          </el-pagination>
        </div>
        <el-dialog
          title="确定删除？"
          :visible.sync="dialogVisible"
          width="30%"
          top="30vh">
          <span>确定删除您的好友 {{delName}} ?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="danger" @click="sureDel">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '../financing/financingManege'
export default {
  name: 'areaList',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      businessList: [],
      father: {
        selIndex: 3
      },
      checkList: [],
      // 分组列表
      groupList: [],
      page: 1,
      total: 0,
      showArr: [],
      showAllData: [],
      selItems: [],
      twcx_verified_status: '',
      cfca_verified_status: '',
      dialogVisible: false,
      delName: '',
      delId: '',
      pageSize: 6,
      currPage: 1
    }
  },
  mounted () {
    var that = this
    // 第三方认证
    that.$ajax.get('/api/identity/?token=' + that.$token()).then(res => {
      if (res.data.code === '1') {
        that.twcx_verified_status = res.data.twcx_verified_status,
        that.cfca_verified_status = res.data.cfca_verified_status
      }
    })
    that.$ajax.post('/api/get_friends/?page_size=6&page=' + that.currPage, {token: that.$token()}).then((res) => {
      if (res.data.code === '1') {
        that.groupList = res.data.group
        that.showArr = res.data.data
        that.showAllData = res.data.data
        that.total = res.data.total
      }
    })
  },
  methods: {
    // 沟通
    communicate (index, friend) {
      var that = this
      that.scm_to_account = friend.business_name
      that.friendId = friend.friend_accountid
      that.message = 1
      that.$emit('listerToChild', that.message, that.friendId, that.scm_to_account)
    },
    // 删除好友
    delFriend: function ($event, item) {
      var that = this
      that.delId = item.id
      that.delName = item.business_name
      that.dialogVisible = true
    },
    sureDel: function () {
      var that = this
      that.$ajax.delete('/api/friend/?token=' + that.$token() + '&friend_id=' + that.delId).then((res) => {
        if (res.data.code === '1') {
          that.friendsList()
          that.dialogVisible = false
          that.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 跳转到博客
    navgative: function (item) {
      var that = this
      if (item.content_type === 'business') {
        that.$router.push({
          path: '/enterpriseBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            roleId: 0
          }
        })
      } else if (item.content_type === 'institution') {
        that.$router.push({
          path: '/financialBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            roleId: 1
          }
        })
      } else if (item.content_type === 'serviceprovider') {
        that.$router.push({
          path: '/serviceBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            roleId: 2
          }
        })
      } else if (item.content_type === 'financingfund') {
        that.$router.push({
          path: '/guaranteeBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            roleId: 3
          }
        })
      }
    },
    handleCheckedChange (val, index) {
      // console.log(val)
      var that = this
      var selItems = []
      that.showArr[index].isSel === 1 ? that.showArr[index].isSel = 0 : that.showArr[index].isSel = 1
      that.showArr.forEach((val, index) => {
        if (val.isSel === 1) {
          selItems.push(val.id)
        }
      })
      that.selItems = selItems
    },
    tomanage: function ($event, index) {
      var that = this
      if (index === 0) {
        that.$router.push('/friend_group')
      } else if (index === 1) {
        that.$router.push('/add_friend')
      } else if (index === 2) {
        that.$router.push('/applylist')
      }
    },
    // 选择分组
    changeType: function ($event) {
      var that = this
      var index = $event.target.value
      if (index === '请选择') {
        that.showArr = that.showAllData
      } else {
        that.groupId = that.groupList[index].id
        that.showArr = that.fliterGroup(that.groupId, that.showAllData)
      }
    },
    // 选择分组 筛选数据
    fliterGroup: function (gId, fArr) {
      var result = []
      for (var i = 0; i < fArr.length; i++) {
        if (fArr[i].group_id === gId) {
          result.push(fArr[i])
        }
      }
      return result
    },
    // 选择移动到数组名称
    updateGroup: function ($event) {
      var that = this
      // console.log($event)
      var index = $event.target.value
      that.gropSelect = index
      if (index !== '请选择') {
        that.changeGroupId = $event.target.value
        that.moveGroupId = that.groupList[index].id
      }
    },
    friendsList () {
      var that = this
      that.$ajax.post('/api/get_friends/?page_size=6&page=' + that.currPage, {token: that.$token()}).then((res) => {
        if (res.data.code === '1') {
          that.groupList = res.data.group
          that.showArr = res.data.data
          that.showAllData = res.data.data
          that.total = res.data.total
        }
      })
      that.checkList = []
    },
    // 移动分组按钮
    changeGroup: function () {
      var that = this
      if (that.gropSelect !== '请选择') {
        if (that.selItems.length !== 0) {
          that.$ajax.put('/api/get_friends/', {token: that.$token(), group_id: that.moveGroupId, friend_id_list: that.selItems}).then((res) => {
            if (res.data.code === '1') {
              this.friendsList()
            }
          })
        } else {
          this.$message({
            message: '请选择需要移动的商友',
            type: 'warning',
            duration: 2000
          })
        }
      }
    },
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
    handleNav: function (item, id, q) {
      var that = this
      if (item.content_type === 'business') {
        if (q) {
          let ro = that.$router.resolve({
            path: '/enterpriseBlog',
            query: {
              bid: id,
              bank: 4, // 进入博客后回退路由
              roleId: 0,
              is_friend: true,
              account_id: item.friend_accountid,
              isMe: 1,
              vueID: 0,
              showTab: -2
            }
          })
          window.open(ro.href, '_blank')
        } else {
          let ro = that.$router.resolve({
            path: '/enterpriseBlog',
            query: {
              bid: id,
              bank: 4, // 进入博客后回退路由
              roleId: 0,
              is_friend: true,
              account_id: item.friend_accountid,
              isMe: 1,
              vueID: 0,
              showTab: -2
            }
          })
          window.open(ro.href, '_blank')
        }
      } else if (item.content_type === 'institution') {
        that.$router.push({
          path: '/financialBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            roleId: 1
          }
        })
      } else if (item.content_type === 'serviceprovider') {
        that.$router.push({
          path: '/serviceBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            roleId: 2
          }
        })
      } else if (item.content_type === 'financingfund') {
        that.$router.push({
          path: '/guaranteeBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            roleId: 3
          }
        })
      }
    },
    handleNav1: function (item, id, q) {
      var that = this
      if (item.content_type === 'business') {
        if (q) {
          let ro = that.$router.resolve({
            path: '/businessProperty',
            query: {
              bid: id,
              is_friend: true,
              account_id: item.friend_accountid,
              vueID: 1,
              isMe: 1,
              showTab: -2
            }
          })
          window.open(ro.href, '_blank')
        } else {
          let ro = that.$router.resolve({
            path: '/businessProperty',
            query: {
              bid: id,
              is_friend: true,
              account_id: item.friend_accountid,
              vueID: 1,
              isMe: 1,
              showTab: -2
            }
          })
          window.open(ro.href, '_blank')
        }
      }
    },
    handleNav2: function (item, id) {
      var that = this
      if (item.content_type === 'business') {
        this.$router.push({
          path: '/property_pool',
          query: {
            bid: id
          }
        })
      }
    },
    handelePage: function (page) {
      var that = this
      that.currPage = page
      that.$ajax.post('/api/get_friends/?page_size=6&page=' + that.currPage, {token: that.$token()}).then((res) => {
        if (res.data.code === '1') {
          that.groupList = res.data.group
          that.showArr = res.data.data
          that.showAllData = res.data.data
          that.total = res.data.total
        }
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
  display: flex;
  width: 100%;
  // padding-top: 120px;
  .assets_board {
    // margin: 0 auto;
    min-height: 100%;
    width: 100%;
    display: flex;
  }
  .assets_content {
    // width: 100%;
    // padding: 20px 40px 20px 40px;
    // padding-left: 290px;
    background: #f5f7f8;
    .filter {
      height: 80px;
      padding: 0 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // width: 1200px;
      .group {
        display: flex;
        select {
          height: 34px;
          width: 120px;
          padding: 0 5px;
          border: 1px solid #eaeaea;
          border-radius: 5px;
          outline: none
        }
        .search {
          height: 34px;
          margin-left: 20px;
          border: 1px solid #eaeaea;
          display: flex;
          align-items: center;
          input {
            padding: 0 5px;
            border: none;
            outline: none;
            height: 32px;
            width:240px;
          }
          span {
            width: 60px;
            text-align: center;
            height: 32px;
            line-height: 32px;
            color: #fff;
            // background: #999;
            background: #eb6100;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid #eb6100;
          }
        }
        .togroup, .toadd, .toapply {
          padding: 0 10px;
          height: 34px;
          color: #fff;
          background: #eb6100;
          line-height: 34px;
          cursor: pointer;
          border-radius: 5px
        }
        .togroup {
          margin:0 18px 0 50px;
        }
        .toapply {
          margin-left: 18px;
        }
      }
      .change_group {
        // height: 100%;
        display: flex;
        // line-height: 80px;
        align-items: center;
        border-radius: 5px;
        select {
          height: 34px;
          width: 120px;
          padding: 0 5px;
          margin: 0 10px;
          border: 1px solid #eaeaea;
          border-radius: 5px;
          outline: none
        }
        span:last-child {
          margin-left: 10px;
          height: 34px;
          width:60px;
          color: #fff;
          line-height: 34px;
          border-radius: 3px;
          cursor: pointer;
          text-align: center;
        }
        .hasSel {
          background: #eb6100;
        }
        .noSel {
          background: #ccc;
        }
      }
    }
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
      width: 95%;
      margin: 0 auto;
      .assets_cards {
        padding: 0 0px 0 50px;
        // max-width: 1600px;
        width: auto;
        height: auto;
        // border: 1px solid #000;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        // align-items: center;
        flex-wrap: wrap;
        .assets_card_item {
          width: 45%;
          height: auto;
          box-shadow: 0 0 12px #eaeaea;
          border-radius: 6px;
          margin: 20px 30px;
          padding: 0 5px 0 0;
          background: #fff;
          max-height: 300px;
          cursor: pointer;
          .check_list {
            margin: 20px;
            .el-checkbox__label {
              display: none;
            }
          }
          .assets_card_top {
            position: relative;
            height: auto;
            margin: 10px 20px;
            margin-bottom: 0;
            border-bottom: 1.4px dashed #eaeaea;
            display: flex;
            justify-content: center;
            // align-items: center;
            background: url('../../../static/img/adminbg.png');
            background-size: 70%;
            .verify {
              min-width: 330px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              img{
                vertical-align: middle
              }
              .real {
                // font-size: 14px;
                display: inline-block;
                padding: 0 10px;
              }
            }
            .assets_card_img {
              width: 97px;
              height: 97px;
              margin-bottom: 10px;
              img {
                border-radius: 50%;
                width: 97px;
                height: 97px;
              }
            }
            .assets_card_text {
              width: calc(100% - 97px);
              padding: 10px 0 5px 40px;
              position: relative;
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
              }
            }
          }
          .assets_card_bots {
            height: 68px;
            margin: 0 25px;
            display: flex;
            justify-content: flex-start;
            align-content: center;
            flex-wrap: wrap;
            div {
              width: auto;
              height: 40px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin: auto 20px;
              cursor: pointer;
              img{
                width: 24px;
                height: 24px;
                margin-right: 10px;
              }
              span {
                font-size: 14px;
                color: #999;
              }
              span:hover {
                color: #ea6100;
              }
            }
          }
        }
        .assets_card_item:hover {
          box-shadow: 4px 8px 32px #999;
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
      height: 80px;
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
<style lang="less">
.check_list {
  .el-checkbox-group {
    .el-checkbox {
      .el-checkbox__inner {
        width: 18px;
        height: 18px;
        border-color: #eb6100;
      }
      .is-checked {
        border-color: #eb6100;
      }
      .is-focus {
        border-color: #eb6100;
      }
      .el-checkbox__inner::after {
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 10px;
        left: 5px;
        position: absolute;
        top: 0px;
        -webkit-transform: rotate(45deg) scaleY(0);
        transform: rotate(45deg) scaleY(0);
        width: 5px;
        -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
        transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
        -webkit-transform-origin: center;
        transform-origin: center;
      }
      .el-checkbox__inner::after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #eb6100;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #eb6100;
  }
}
.el-tooltip__popper.is-dark {
  opacity: 0.9;
}
</style>


