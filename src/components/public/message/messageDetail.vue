<template>
  <div class="message" :style="leftNavHeight">
    <!-- <appNav :father='{selIndex: -1}' type='1'></appNav> -->
    <div class="info_detail">
      <!-- <div class="location_wrap">
        <location :location="location"></location>
      </div> -->
      <div class="c_detail">
        <p class="c_form_title">站内信详情</p>
        <el-row :gutter="20" class="c_detail_box">
          <el-col :span="4" class="c_label_title">
            <p>操作时间：</p>
          </el-col>
          <el-col :span="10">
            {{ formatTime(this.detailData.post_time) }}
          </el-col>
        </el-row>
        <el-row :gutter="20" class="c_detail_box">
          <el-col :span="4" class="c_label_title">
            <p>标题：</p>
          </el-col>
          <el-col :span="10">
            {{ this.detailData.title }}
          </el-col>
        </el-row>
        <el-row :gutter="20" class="c_detail_box">
          <el-col :span="4" class="c_label_title">
            <p>发件人：</p>
          </el-col>
          <el-col :span="10">
            {{ this.detailData.sender }}
          </el-col>
        </el-row>
        <el-row :gutter="20" class="c_detail_box">
          <el-col :span="4" class="c_label_title">
            <p>消息类型：</p>
          </el-col>
          <el-col :span="10">
            {{ Number(this.detailData.type) == 1 ? '系统通知' : '' }}
          </el-col>
        </el-row>
        <el-row :gutter="20" class="c_detail_box">
          <el-col :span="4" class="c_label_title">
            <p>操作详情：</p>
          </el-col>
          <el-col :span="10">
            {{ this.detailData.body }}
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import Location from '@/components/location/location'
// import AppNav from '@/components/financing/financingManege'
export default {
  name: 'messageDetail',
  // components: {
  //   AppNav,
  //   Location
  // },
  data () {
    return {
      location: [
        { title: '我的消息', url: '/message_app' },
        { title: '详情' }
      ],
      showIndex: this.$route.query.id,
      detailData: {},
      leftNavHeight: this.leftBarInit()
    }
  },
  mounted () {
    const that = this
    window.onresize = function () {
      return (function () {
        that.leftNavHeight = that.leftBarInit()
      })()
    }
    var data = {}
    data.id = that.showIndex
    that.$ajax.get('/api/home_page/site_message/' +  that.showIndex + '/').then(res => {
      that.detailData = res.data
    })
  },
  methods: {
    formatTime: function (timeStamp) {
      var date = new Date(timeStamp)
      var Y = date.getFullYear()
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + '年' + M + '月' + D + '日 ' + h + ':' + m + ':' + s
    },
    leftBarInit (num) {
      if (num) {
        this.leftNavHeight = 'height:' + window.innerHeight + 'px'
      } else {
        return 'height:' + window.innerHeight + 'px;'
      }
    }
  }
}
</script>

<style scoped lang="less">
.message {
  display: flex;
  height: 100%;
  //padding-top: 70px;
  .info_detail{
    width: 100%;
    // padding: 0 50px;
    background: #f5f7f8;
    .location_wrap {
      background: #fff;
    }
    .c_detail{
      box-shadow: 0px 0px 5px #ccc;
      padding: 30px;
      background: #fff;
      margin: 20px 50px;
      .c_form_title{
        color: #333;
        border-left: 4px solid #eb6100;
        padding-left: 20px;
        font-size: 16px;
        font-weight: bold;
      }
      .c_detail_box{
        padding: 15px;
        font-size: 14px;
        color: #333;
        .c_label_title{
          text-align: right;
        }
      }
    }
  }
}
</style>
<style lang="less">
  .form_info table thead th{
    background: #e6e9ea;
  }
  .form_info .el-button--text{
    color: #eb6100;
  }
</style>
