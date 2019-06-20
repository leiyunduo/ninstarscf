<template>
  <div class="friend">
    <!-- <appNav :father='step' type='1'></appNav> -->
    <div class="form">
      <div class="title">
        <h3><img :src="lRole === 'institution' ? '../../../static/img/leftbar/mykehu.png' : '../../../static/img/leftbar/myshang.png'" alt="">我的促保贷</h3>
      </div>
      <div class="form_detail">
        <div class="friend_list">
          <div class="table_title">
            <div v-for="(title, index) in titleList" :key="index">{{ title }}</div>
          </div>
          <!-- <div class="table_item" v-for="(friend, index) in showArr" :key="index" v-if="friend.isShow === 1 && friend.isDel === 0"> -->
          <div class="table_item" v-for="(friend, index) in showArr" :key="index">
            <div>{{friend.name}}</div>
            <div>{{friend.legal_person}}</div>
            <div>
              <span @click="selectClimn($event, friend)">查看债权</span>
              <span @click="selectDebt($event, friend)">查看债务</span>
            </div>
          </div>
          <div class="c_empty" v-if="showArr.length === 0">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import AppNav from '../financing/financingManege'
export default {
  name: 'friendmanagement',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      lRole: '',
      step: {
        selIndex: ''
      },
      navId: 26,
      dialogVisible: false,
      searchKey: '',
      pageSize: 7,
      pageCurrent: 1,
      // 分组列表
      groupList: [],
      selGroup: 0,
      friendList: [],
      showArr: [],
      showAllData: [],
      selItems: [],
      // titleList: ['选择', '分组', '公司名称', '真实姓名', '备注名', '电话', '添加时间', '添加人', '操作'],
      titleList: ['公司名称', '真实姓名', '操作'],
      changeGroupId: 0,
      delId: 0,
      delName: '',
      groupName: '',
      showArrList: '',
      moveGroupId: '',
      // 好友备注
      remarkActive: -1,
      remarkDis: -1,
      remarkId: -1,
      // 沟通
      scm_to_account: '',
      scm_content: '',
      friendId: '',
      gropSelect: ''
    }
  },
  mounted () {
    var that = this
    if (localStorage.role === 'serviceprovider') {
      that.step.selIndex = 1
    } else if (localStorage.role === 'fund') {
      that.step.selIndex = 3
    } else if (localStorage.role === 'institution') {
      that.father.selIndex = 6
    } else {
      that.step.selIndex = 4
    }
    this.lRole = localStorage.role
    that.$ajax.get('/api/manage/fund/?token=' + that.$token() + '&tab=' + 'business').then((res) => {
      if (res.data.code === '1') {
        that.showArr = res.data.data
      }
    })
  },
  methods: {
    // 查看债权
    selectClimn: function ($event, item) {
      var that = this
      // console.log(item.id)
      that.$router.push({
        path: '/creditorManage',
        query: {
          id: item.id
        }
      })
    },
    // 查看债务
    selectDebt ($event, item) {
      var that = this
      that.$router.push({
        path: '/debtManage',
        query: {
          id: item.id
        }
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
  .form {
    color: #343536;
    // width: 100%;
    font-size: 14px;
    .title {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
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
      .friend_list {
        // width: 1202px;
        // margin: 0 auto;
        // margin-left: 140px;
        border: 1px solid #eaeaea;
        color: #343536;
        background: #fff;
         .c_empty{
          height: 100px;
          line-height: 100px;
          text-align: center;
          color: #999;
        }
        .table_title {
          display: flex;
          height: 54px;
          border-bottom: 1px solid #eaeaea;
          line-height: 54px;
          div {
            text-align: center;
            flex: 1;
          }        
        }
        .table_item {
          display: flex;
          border-bottom: 1px dashed #eaeaea;
          height: 66px;
          line-height: 66px;
          .blue{
            color: #337ab7;
            cursor: pointer;
          }
          div {
            flex: 1;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              display: inline-block;
              width: auto;
              height: 25px;
              padding: 0 5px;
              box-sizing: border-box;
              line-height: 25px;
              text-align: center;
              border: 1px solid #eb6100;
              border-radius: 3px;
              font-size: 12px;
              color: #eb6100;
              cursor: pointer;
              margin:0 5px;
            }
          }
          .uninput {
            color: #999;
          }
          .active {
            border: none;
            outline: none;
            background: #fff;
          }
        }
        .table_item:last-of-type {
          border-bottom: none;
        }
      }
      .block {
        // position: fixed;
        // bottom: 40px;
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
