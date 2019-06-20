<!-- 添加商友 -->
<template>
  <div class="add_friend">
    <!-- <AppNav :father='father' type='1'></AppNav> -->
    <div class="from">
      <!-- <div class="form_title"><span>商友管理——添加商友</span></div> -->
      <div class="search-box">
        <!-- <span>公司名称：</span> -->
        <input v-model="companyName" placeholder="请输入公司名称" @keyup.enter="searchBtn()">
        <div class="search-btn" @click="searchBtn()">搜索</div>
        <div class="search-btn" @click="backChan()">返回</div>
      </div>
      <!-- <div class="table">
        <div class="tr">
          <div class="th">公司名称</div>
          <div class="th">操作</div>
        </div>
        <div class="tr">
          <div class="td">公司名称</div>
          <div class="td">操作</div>
        </div>
      </div> -->
            <!-- <div class="recommend_info">
        <div class="row">
          <p class="title">推荐企业<router-link to="#" class="more">更多+</router-link></p>
          <ul>
            <li v-for = "item in recommendList[0]" :key="item.company">
              <div class="show_info">
                <div class="header_icon">
                  <img :src="item.header" alt="" />
                </div>
                <div class="des">
                  <h3>{{item.name}}</h3>
                  <p>{{item.company}}</p>
                </div>
              </div>
              <div class="btn_area">
                <div class="btn access">访问主页</div>
                <div class="btn add_friend">添加商友</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="row">
          <p class="title">推荐个人<router-link to="#" class="more">更多+</router-link></p>
          <ul>
            <li v-for = "item in recommendList[1]" :key="item.company">
              <div class="show_info">
                <div class="header_icon">
                  <img :src="item.header" alt="" />
                </div>
                <div class="des">
                  <h3>{{item.name}}</h3>
                  <p>{{item.company}}</p>
                </div>
              </div>
              <div class="btn_area">
                <div class="btn access">访问主页</div>
                <div class="btn add_friend">添加商友</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="row">
          <p class="title">金融机构<router-link to="#" class="more">更多+</router-link></p>
          <ul>
            <li v-for = "item in recommendList[2]" :key="item.company">
              <div class="show_info">
                <div class="header_icon">
                  <img :src="item.header" alt="" />
                </div>
                <div class="des">
                  <h3>{{item.name}}</h3>
                  <p>{{item.company}}</p>
                </div>
              </div>
              <div class="btn_area">
                <div class="btn access">访问主页</div>
                <div class="btn add_friend">添加商友</div>
              </div>
            </li>
          </ul>
        </div>
      </div> -->
      <div class="table-box">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="公司名称"
            >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <button
              size="mini"
              type="primary"
              class="buttons"
              @click="addFriend(scope.$index, scope.row)">添加商友</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// import AppNav from '../financing/financingManege'
export default {
  name: 'addfriend',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      recommendList: [],
      companyName: '',
      tableData: [],
      father: {
        selIndex: 4
      }
    }
  },
  methods: {
    searchBtn: function () {
      var that = this
      // 去除所有空格
      let cName = that.companyName.replace(/\s*/g, '')
      if (cName !== '') {
        that.$ajax.get('/api/company/?name=' + cName + '&signed=True' + '&is_friend=False').then(res => {
          that.tableData = res.data.results
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        this.$message({
          message: '请输入公司名称',
          type: 'warning',
          duration: 2000
        })
      }
    },
    addFriend: function (index, row) {
      var that = this
      that.$ajax.post('/api/friend/apply/', {company_id: row.id}).then(res => {
        this.$message({
          message: '添加成功，请等待对方同意',
          type: 'warning',
          duration: 2000
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    backChan () {
      var that = this
      this.$router.push('/friendmanagement')
    }
  },
  mounted () {
    var that = this
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
.add_friend{
  width:100%;
  min-height: 100%;
  //padding-top: 70px;
  display: flex;
  background: #f5f7f8;
  .from{
    font-size: 14px;
    width: 500px;
    margin: 0 auto;
    margin-top: 50px;
    .form_title{
      height: 30px;
      line-height: 30px;
      border-left: 2px solid #f4ac45;
      span{
        margin-left: 20px;
      }
    }
    .search-box{
      margin: 0px auto;
      width: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      input{
        height: 32px;
        width: 400px;
        padding: 0px 15px;
        border: 1px solid #eaeaea;
        border-right: none;
        font-size: 14px;
        outline: none;
      }
      .search-btn{
        width: 80px;
        height: 32px;
        background: #eb6100;
        color: #fff;
        // border-radius: 4px;
        text-align:center;
        line-height: 32px;
        // display: inline-block;
        // vertical-align: top;
        cursor: pointer;
        margin: 0 5px;
        border-radius: 3px;
      }
    }
    .table-box{
      width: 500px;
      margin: 60px auto 0px;
      .buttons {
        width: 80px;
        height: 28px;
        background: #eb6100;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 5px;
        line-height: 28px;
      }
    }
    // .recommend_info{
    //   .title{
    //     font-size: 16px;
    //     color: #343536;
    //     line-height: 80px;
    //     margin-top: 20px;
    //     .more{
    //       color: #a62121;
    //       float: right;
    //       font-size: 14px;
    //     }
    //   }
    //   ul{
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-pack: justify;
    //     -ms-flex-pack: justify;
    //     justify-content: space-between;
    //     li{
    //       width: 255px;
    //       background-color: #ffffff;
    //       box-shadow: 0px 7px 27px 0px rgba(177, 177, 177, 0.22);
    //       border-radius: 10px;
    //       .show_info{
    //         display: -webkit-box;
    //         display: -ms-flexbox;
    //         display: flex;
    //         padding: 15px 10px;
    //         border-bottom: 1px solid #dcdcdc;
    //         .header_icon{
    //           width:70px;
    //           height:70px;
    //           border-radius: 50%;
    //           -webkit-border-radius: 50%;
    //           overflow: hidden;
    //         }
    //         .des{
    //           -webkit-flex: 1;
    //           -ms-flex: 1;
    //           flex: 1;
    //           -webkit-box-flex: 1;
    //           -moz-box-flex: 1;
    //           padding: 13px 0px 13px 15px;
    //           h3{
    //             font-size:18px;
    //           }
    //           p{
    //             font-size:14px;
    //             color: #b3b3b3;
    //           }
    //         }
    //       }
    //       .btn_area{
    //         display: -webkit-box;
    //         display: -ms-flexbox;
    //         display: flex;
    //         .btn{
    //           -webkit-flex: 1;
    //           -ms-flex: 1;
    //           flex: 1;
    //           -webkit-box-flex: 1;
    //           -moz-box-flex: 1;
    //           text-align: center;
    //           line-height:36px;
    //           cursor: pointer;
    //         }
    //         .btn.access{
    //           background-color: #efefef;
    //           box-shadow: 0px 7px 27px 0px rgba(177, 177, 177, 0.22);
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
</style>
