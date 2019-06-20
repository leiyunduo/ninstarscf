<template>
  <div class="contractList">
    <!-- <AppNav :father='father' type='1'></AppNav> -->
    <div class="info_detail">
      <location :location="location"></location>
      <div class="c_detail_box">
        <div class="form_tab">
          <ul>
            <li v-for="(tab, index) in applyTab" :key="index" :class="index === selTab ? 'seltab' : ''" @click="changeTab($event, index)">
              <i :class="tab.icon"></i>
              <span>{{tab.title}}</span>
            </li>
          </ul>
          <!-- <button @click="backChan">返回</button> -->
        </div>
        <div class="form_table">
          <div class="table_title">
            <div v-for="(t, index) in tableTitle" :key="index">{{ t }}</div>
          </div>
          <div class="table_item" v-for="(apply, index) in showArr" :key="index">  <!-- v-if="apply.isDel === 0"-->
            <div>{{selType === 0 ? apply.to_company_name : apply.from_company_name}}</div>
            <div>{{selType === 0 ? apply.to_person_name : apply.from_person_name}}</div>
            <div>{{selType === 0 ? apply.to_phone : apply.from_phone}}</div>
            <div>{{apply.showTime}}</div>
            <div>
              <span class="item_status" v-if="(selType === 0) && (apply.status === '0')">待确认</span>
              <span class="item_status" v-if="(selType === 0) && (apply.status === '1')">已同意</span>
              <span class="item_status" v-if="(selType === 0) && (apply.status === '2')">已拒绝</span>
              <!-- <span class="item_status" v-if="(selType === 1) && (apply.status === '0')">待确认</span> -->
              <div class="item_status" v-if="selType === 1">
                <span v-if="apply.status === '0'" @click="agree($event, index, apply.id)">同意</span>
                <span v-if="apply.status === '0'" @click="refuse($event, index, apply.id)">拒绝</span>
                <span v-if="apply.status === '1'">已同意</span>
                <span v-if="apply.status === '2'" style="border: none; color: #ff0010;">已拒绝</span>
              </div>
            </div>
          </div>
          <div class="c_empty" v-if="showArr.length === 0">暂无数据</div>
        </div>
        <!-- <div class="block" v-if="showArr.length !== 0">
          <el-pagination
            layout="prev, pager, next"
            :total="applyList.length"
            :page-size="pageSize"
            :current-page.sync="pageCurrent"
            @current-change="pageChange($event)">
          </el-pagination>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Location from '../location/location'
// import AppNav from '../financing/financingManege'
export default {
  name: 'apply',
  data () {
    return {
      selTab: 0,
      selType: 0,
      showArr: [],
      pageSize: 9,
      pageCurrent: 1,
      applyTab: [
        {title: '我的申请', icon: 'iconfont icon-daiqueren'},
        {title: '商友审核', icon: 'iconfont icon-daishenhe1'}
      ],
      tableTitle: ['公司名称', '真实姓名', '电话', '申请时间', '操作'],
      applyList: [],
      father: {
        selIndex: 4
      }
    }
  },
  components: {
    // AppNav,
    Location
  },
  beforeCreate () {
    var that = this
    that.location = [
      { title: '平台好友', url: '/friendmanagement' },
      { title: '我的申请' }
    ]
  },
  methods: {
    backChan () {
      var that = this
      that.$router.push('/friendmanagement')
    },
    filter: function (page, arr) {
      var that = this
      var showArr = []
      var startIndex = -1
      arr.forEach((val, index) => {
        if (index === (page - 1) * that.pageSize) {
          startIndex = index
        }
      })
      for (var i = 0; i <= that.pageSize - 1; i++) {
        if (startIndex + i < arr.length) {
          showArr.push(arr[startIndex + i])
        }
      }
      return showArr
    },
    pageChange: function ($event) {
      this.showArr = this.filter($event, this.applyList)
    },
    changeTab: function ($event, index) {
      var that = this
      that.selTab = index
      that.selType = index
      if (index === 0) {
        // that.showArr = that.filter(1, that.applyList)
        that.getOutApplications()
      } else {
        // that.showArr = that.filter(1, that.approveList)
        that.getInApplications()
      }
      that.pageCurrent = 1
    },
    del: function ($event, index, id) {
      var that = this
      // // that.showArr[index].isDel = 1
      that.$ajax.delete('/api/application/?token=' + that.$token() + '&application_id=' + id).then((res) => {
        if (res.data.code === '1') {
          that.getOutApplications()
        }
      })
    },
    agree: function ($event, index, id) {
      var that = this
      that.$ajax.patch(`/api/friend/apply/` + id + '/', {apply_status: true}).then((res) => {
        this.$message({
          message: '同意成功',
          type: 'success'
        })
        that.getInApplications()
      })
    },
    refuse: function ($event, index, id) {
      var that = this
      that.$ajax.patch(`/api/friend/apply/` + id + '/', {apply_status: false}).then((res) => {
        this.$message({
          message: '拒绝成功',
          type: 'success'
        })
        that.getInApplications()
      })
    },
    // 我的申请
    getOutApplications: function () {
      var that = this
      that.$ajax.get('/api/friend/apply/').then(res => {
        for (var i in res.data.results) {
          res.data.results[i].showTime = that.$time(res.data.results[i].create_time, 2)
        }
        that.showArr = res.data.results
      })
    },
    // 商友审核
    getInApplications: function () {
      var that = this
      that.$ajax.get('/api/friend/apply/?receive=1').then(res => {
        for (var i in res.data.results) {
          res.data.results[i].showTime = that.$time(res.data.results[i].create_time, 2)
        }
        that.showArr = res.data.results
        let _catch = []
        _catch = that.showArr.filter(obj => obj.status === '0')
        sessionStorage.setItem('newMsgOfFriend', _catch.length)
      })
    }
  },
  mounted () {
    var that = this
    that.getOutApplications()
    if (localStorage.role === 'serviceprovider') {
      that.father.selIndex = 1
    } else if (localStorage.role === 'fund') {
      that.father.selIndex = 3
    } else if (localStorage.role === 'institution') {
      that.father.selIndex = 6
    } else {
      that.father.selIndex = 4
    }
  }
}
</script>

<style scoped lang="less">
@import url('./iconfont.css');
.contractList {
  width: 100%;
  min-height: 100%;
  background: #fafafa;
  display: flex;
  .info_detail{
    width: 100%;
    color: #343536;
    height: 100%;
    font-size: 14px;
    padding: 0 50px;
    .c_detail_box{
      min-height: 400px;
    }
    .form_title{
      height: 50px;
      padding: 10px 0;
      div{
        height: 30px;
        line-height: 30px;
        border-left: 2px solid #f4ac45;
        span {
          margin-left: 20px;
        }
      }
    }
    .form_tab {
      height: 70px;
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      ul {
        display: flex;
        flex: 1;
        li {
          width: 180px;
          font-size: 16px;
          text-align: center;
          line-height: 70px;
          cursor: pointer;
          i {
            font-size: 20px;
            vertical-align: middle;
          }
          span {
            padding: 10px 8px;
            border-bottom: 3px solid #fafafa;
          }
        }
        .seltab {
          color: #eb6100;
          span {
            border-bottom: 3px solid #eb6100;
          }
        }
      }
      button {
        background: none;
        color: #eb6100;
        border: none;
        outline: none;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .form_table {
      border: 1px solid #eee;
      margin: 0 50px;
      // width: 1200px;
      // margin: 0 auto;
      background: #fff;
      .c_empty{
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: #999;
      }
      .table_title {
        display: flex;
        border-bottom: 1px solid #eee;
        height: 55px;
        div {
          width: 20%;
        }
        // div:nth-child(7) {
        //   width: 240px;
        // }
        div {
          text-align: center;
          line-height: 55px;
        }
      }
      .table_item {
        display: flex;
        height: 65px;
        border-bottom: 1px dashed #eee;
        div {
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        div {
          width: 20%;
        }
        div:nth-child(6) {
          width: 20%;
          .item_status {
            padding: 3px 10px;
            color: #db6100;
            // border: 1px solid #db6100;
          }
          .item_reply {
            padding: 3px 10px;
            border: 1px solid #db6100;
            color: #db6100;
            margin: 0 10px;
            cursor: pointer;
          }
        }
        div:last-child{
          div{
            width: auto;
            cursor: pointer;
            span{
              border: 1px solid #db6100;
              color: #db6100;
              padding: 3px 10px;
              border-radius: 4px;
              cursor: pointer;
            }
          }
        }
        div {
          text-align: center;
          line-height: 65px;
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
</style>
