<template>
  <div class="friend">
    <!-- <appNav :father='father' type='1'></appNav> -->
    <div class="form">
      <!-- <div class="title">
        <h3><img :src="lRole === 'institution' ? '../../../static/img/leftbar/mykehu.png' : '../../../static/img/leftbar/myshang.png'" alt="">{{lRole === 'fund' ? '我的企业' : '商友管理'}}</h3>
      </div> -->
      <div class="form_detail">
        <div class="filter">
          <div class="group">
            <select @change="changeType($event)">
              <option value="请选择">请选择</option>
              <option v-for="(g, index) in groupList" :key="index" :value="index">{{ g.group_name }}</option>
            </select>
            <!-- <div class="search">
              <input type="text" placeholder="请输入公司名称" v-model="searchKey">
              <span @click="searchName()">搜索</span>
            </div> -->
            <div class="togroup" v-if="lRole !== 'fund'" @click="tomanage($event, 0)">分组管理</div>
            <div class="toadd" :style="lRole === 'fund' ? 'margin-left:20px;' : ''" @click="tomanage($event, 1)">添加商友</div>
            <div :id="msgCount" class="toapply" :class="!msgCount ? '' : 'newMsg-badge'" @click="tomanage($event, 2)">我的申请</div>
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
        <div class="friend_list">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column label="选择" type="selection" width="55"></el-table-column>
            <el-table-column label="分组">
              <template slot-scope="scope">
                <span v-if='scope.row.group_name'>{{scope.row.group_name}}</span>
                <span v-else>未分配分组</span>
              </template>
            </el-table-column>
            <el-table-column label="公司名称">
              <template slot-scope="scope">
                <span style="cursor: pointer;" @click="blog(scope.row)">{{scope.row.company_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="person_name" label="真实姓名"></el-table-column>
            <!-- <el-table-column prop="name" label="备注名"></el-table-column> -->
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="show_time" label="添加时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <button style="background:none;border:none;color:#eb6100;outline:none;padding-right:10px;" @click="communicate(scope.$index, scope.row)">沟通</button>
                <button style="background:none;border:none;color:#eb6100;outline:none;" @click="delFriend(scope.$index, scope.row)">删除</button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="c_assets_pagination" v-if="total" style="text-align: center; margin-top: 20px;">
          <el-pagination v-if="total" @current-change="handelePage"
            :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="确定删除？" :visible.sync="dialogVisible" width="30%" top="30px">
        <span>确定删除您的好友 {{delName}} ?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="sureDel">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'friendmanagement',
  data () {
    return {
      father: {
        selIndex: 4
      },
      lRole: '',
      navId: 26,
      dialogVisible: false,
      searchKey: '',
      // 分组列表
      groupList: [],
      selGroup: 0,
      friendList: [],
      showAllData: [],
      selItems: [],
      changeGroupId: 0,
      delId: 0,
      delName: '',
      groupName: '',
      tableDataList: '',
      moveGroupId: '',
      // 好友备注
      remarkActive: -1,
      remarkDis: -1,
      remarkId: -1,
      // 沟通
      scm_to_account: '',
      scm_content: '',
      friendId: '',
      gropSelect: '',
      pageSize: 10000,
      total: 0,
      currPage: 1,
      tableData: [],
      msgCount: 0
    }
  },
  mounted () {
    var that = this
    // var loginInfo = {
    //   identifier: localStorage.identifier,
    //   userSig: localStorage.userSig
    // }
    if (localStorage.role === 'serviceprovider') {
      that.father.selIndex = 1
    } else if (localStorage.role === 'fund') {
      that.father.selIndex = 4
    } else if (localStorage.role === 'institution') {
      that.father.selIndex = 6
    } else {
      that.father.selIndex = 4
    }
    this.lRole = localStorage.role
    that.$ajax.get('/api/friend/manage/?page_size=' + that.pageSize + '&page=' + that.currPage,).then(res => {
      res.data.results.forEach(val => {
        val.show_time = that.$time(val.add_time, 1)
      })
      that.tableData = res.data.results
      that.showAllData = res.data.results
      that.total = res.data.total
    }).catch(err => {
      // that.$message.error(err.response.data.err_msg)
    })
    that.$ajax.get('/api/friend/group/').then(res => {
      that.groupList = res.data.results
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    this.getInApplications()

    let _location = [{
      title: this.$route.meta.title,
      url: this.$route.meta.url
    }]
    this.$emit('sonPath', this.$route.path)
  },
  methods: {
    // 列表选中状态
    handleSelectionChange (val) {
      const that = this
      var selItems = []
      val.forEach((val, index) => {
        selItems.push(val.id)
      })
      that.selItems = selItems    
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
    handleNav: function ($event, id, q) {
      let ro = q ? {
        path: '/enterpriseBlog',
        query: {
          bid: id,
          qindex: q,
          bank: 4 // 进入博客后回退路由
        }
      } : {
        path: '/enterpriseBlog',
        query: {
          bid: id,
          bank: 4 // 进入博客后回退路由
        }
      } 
      this.$router.push(ro)
    },
    handleNav1: function ($event, id, q) {
      let ro = q ? {
        path: '/businessProperty',
        query: {
          bid: id,
          qindex: q,
          is_friend: true
        }
      } : {
        path: '/businessProperty',
        query: {
          bid: id,
          is_friend: true
        }        
      }
      this.$router.push(ro)      
    },
    handleNav2: function ($event, id) {
      this.$router.push({
        path: '/property_pool',
        query: {
          bid: id
        }
      })
    },
    // 点击公司名称跳转博客
    blog (item) {
      const that = this
      // that.$router.push({
      //   path: '/enterpriseBlog',
      //   query: {
      //     bid: item.friend_uid
      //   }
      // })
    },
    // 沟通
    communicate (index, friend) {
      var that = this
      that.scm_to_account = friend.company_name
      that.friendId = friend.friend_uid
      that.message = 1
      that.$emit('listerToChild', that.message, that.friendId, that.scm_to_account)
    },
    // 修改备注名称
    remarkUpdate (index, friend) {
      var that = this
      that.$ajax.put('/api/friend/', {token: that.$token(), friend_id: friend.id, friend_name: friend.remark_name}).then(res => {
        if (res.data.code === '1') {
          that.$message.success(res.data.msg)
          // that.remark = '修改备注'
          that.remarkActive = true
          that.remarkDis = true
        } else {
          that.$message.error(res.data.msg)
        }
      })
    },
    cancelFriend (index, friend) {
      var that = this
      that.remarkDis = false
      that.remarkActive = false
    },
    updateFriend ($event, index, friend) {
      var that = this
      that.remarkActive = index
      that.remarkDis = index
    },
    gouFriend ($event, friend) {
      this.$router.push({
        path: '/im',
        query: {
          friendId: friend.friend_accountid,
          friendName: friend.business_name
        }
      })
    },
    // 选择分组 筛选数据
    fliterGroup: function (gId, fArr) {
      var result = []
      for (var i = 0; i < fArr.length; i++) {
        if (fArr[i].group === gId) {
          result.push(fArr[i])
        }
      }
      return result
    },
    // 好友总列表
    friendsList () {
      var that = this
      that.$ajax.get('/api/friend/manage/?page_size=' + that.pageSize + '&page=' + that.currPage,).then(res => {
        res.data.results.forEach(val => {
          val.show_time = that.$time(val.add_time, 1)
        })
        that.tableData = res.data.results
        that.showAllData = res.data.results
        that.total = res.data.total
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handelePage: function (page) {
      var that = this
      that.currPage = page
      that.$ajax.get('/api/friend/manage/?page_size=' + that.pageSize + '&page=' + that.currPage,).then(res => {
        res.data.results.forEach(val => {
          val.show_time = that.$time(val.add_time, 1)
        })
        that.tableData = res.data.results
        that.showAllData = res.data.results
        that.total = res.data.total
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 选择分组
    changeType: function ($event) {
      var that = this
      var index = $event.target.value
      if (index === '请选择') {
        that.tableData = that.showAllData
      } else {
        that.groupId = that.groupList[index].id
        that.tableData = that.fliterGroup(that.groupId, that.showAllData)
      }
    },
    pageChange: function ($event) {
      // this.selItems = []
      // this.filter(this.selGroup, $event, this.friendList)
    },
    // 选择复选框
    selItem: function ($event, index) {
      var that = this
      var selItems = []
      that.tableData[index].isSel === 1 ? that.tableData[index].isSel = 0 : that.tableData[index].isSel = 1
      that.tableData.forEach((val, index) => {
        if (val.isSel === 1) {
          selItems.push(val.id)
        }
      })
      that.selItems = selItems
    },
    // 选择移动到数组名称
    updateGroup: function ($event) {
      var that = this
      var index = $event.target.value
      that.gropSelect = index
      if (index !== '请选择') {
        that.changeGroupId = $event.target.value
        that.moveGroupId = that.groupList[index].id
      }
    },
    // 移动分组按钮
    changeGroup: function () {
      var that = this
      if (that.gropSelect !== '请选择') {
        if (that.selItems.length !== 0) {
          this.$ajax.post(`/api/friend/manage/batch_group/`, {friend_id_list: [...that.selItems], group_id: that.moveGroupId}).then(res => {
            if (res.status === 204) {
              this.$message.success('加入成功')
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
    // 删除好友
    delFriend: function ($event, item) {
      var that = this
      that.delId = item.id
      that.dialogVisible = true
    },
    sureDel: function () {
      var that = this
      that.$ajax.delete('/api/friend/manage/' + that.delId).then((res) => {
        // if (res.data.code === '1') {
        //   that.friendsList()
        //   that.dialogVisible = false
        //   that.$message({
        //     message: '删除成功',
        //     type: 'success',
        //     duration: 2000
        //   })
        // }
        if (res.status === 204) {
          that.dialogVisible = false
          that.tableData = that.tableData.filter(obj => obj.id !== that.delId)
        }
      })
    },
    // 搜索按钮
    searchName: function () {
      var that = this
      if (that.searchKey === '') {
        that.$message.warning('请输入公司名称')
      } else {
        var sName = that.searchKey.replace(/\s*/g, '')
        var searchRes = []
        that.showAllData.forEach((val, index) => {
          if (val.business_name === sName) {
            searchRes.push(val)
          }
        })
        that.tableData = searchRes
      }
      // this.filter(this.selGroup, 1, searchRes)
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
    // 跳转到博客
    navgative: function (item) {
      var that = this
      if (item.content_type === 'business') {
        that.$router.push({
          path: '/enterpriseBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            friendId: 1
          }
        })
      } else if (item.content_type === 'institution') {
        that.$router.push({
          path: '/financialBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            friendId: 1
          }
        })
      } else if (item.content_type === 'serviceprovider') {
        that.$router.push({
          path: '/serviceBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            friendId: 1
          }
        })
      } else if (item.content_type === 'financingfund') {
        that.$router.push({
          path: '/guaranteeBlog',
          query: {
            bid: item.content_obj_id,
            fid: item.friend_accountid,
            friendId: 1
          }
        })
      }
    },
    getInApplications: function () {
      this.$ajax.get('/api/friend/apply/?receive=1').then(res => {
        this.msgCount = res.data.results.filter(obj => obj.status === '0').length
      })
    }
  }
}
</script>
<style scoped lang="less">
// @import url('./iconfont.css');
.friend {
  display: flex;
  min-height: 100%;
  color: #343536;
  //padding-top: 70px;
  background: #f5f7f8;
  flex-direction: row;
  .form {
    color: #343536;
    width: 100%;
    font-size: 14px;
    .title {
      height: 60px;
      line-height: 60px;
      box-shadow: 10px 10px 17px -3px #ddd;
      padding-left: 50px;
      display: flex;
      flex-direction: row;
      background: #fff;
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
      h3 {
        font-size: 16px;
      }
    }
    .form_detail {
      padding:0 50px;
      .filter {
        height: 80px;
        // padding: 0 50px;
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
            &.newMsg-badge::after {
              content: attr(id);
              display: block;
              width: 16px;
              height: 16px;
              background: #ec1e1e;
              border-radius: 50%;
              line-height: 16px;
              color: white;
              font-size: 14px;
              margin-top: -45px;
              margin-left: 56px;
              position: absolute;
              text-align: center
            }
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
      .block {
        margin: 20px 0;
        width: 1200px;
        .el-pagination {
          text-align: center;
        }
      }
    }
  }
}
.scm-horizontal {
  li {
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    span {
      display: inline-block;
      width: 100px;
    }
    input {
      width: 200px;
      height: 28px;
      border: 1px solid #eaeaea;
      outline: none;
      padding: 0 15px;
      background: #fff;
    }
    textarea {
      border: 1px solid #eaeaea;
      outline: none;
      padding: 0 15px;
    }
  }
}
.footer_msg {
  text-align: right;
  button {
    width: 80px;
    height: 28px;
    border-radius: 5px;
    margin: 0 10px;
    outline: none;
  }
  .footer_msg_cancel {
    border: 1px solid #eb6100;
    background: none;
    color: #eb6100;
  }
  .footer_msg_ok {
    background: #eb6100;
    border: none;
    color: #fff;
  }
}
</style>
