<template>
  <div class="page">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="creditor-debt clearfix">
      <location :location="location"></location>
      <div class="blog_line">
        <div class="title_top">
          <div class="title">{{blogList.title}}</div>
          <div>{{blogList.post_time}}</div>
        </div>
      </div>
      <div class="img"><img :src="$root_url() + blogList.picture" alt=""></div>
      <div class="bodys" v-html="bodys"></div>
    </div>
  </div>
</template>

<script>
// import appNav from '../../financing/financingManege'
import Location from '../../location/location'
export default {
  name: 'bankManage',
  components: {
    Location,
    // appNav
  },
  data () {
    return {
      father: {selIndex: 10},
      ids: '',
      types: '',
      bodys: '',
      blogList: {
        title: '',
        post_time: '',
        picture: ''
      }
    }
  },
  mounted () {
    var that = this
    that.ids = Number(that.$route.query.id)
    if (that.$route.query.id) {
      that.$ajax.get(`/api/home_page/news/` + that.ids).then(res => {
        that.blogList = res.data
        that.bodys = res.data.body
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }
  },
  beforeCreate () {
    var that = this
    that.types = Number(that.$route.query.type)
    if (that.types === 1) {
      that.location = [
        { title: '账号管理', url: '/' },
        { title: '财务状况' }
      ]
    } else {
      that.location = [
        { title: '账号管理', url: '/enterpriseBlogInfo' },
        { title: '企业博客' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  min-height: 100%;
  display: flex;
  //padding-top: 70px;
  .creditor-debt {
    padding: 0 50px;
    background: #f5f7f8;
    // width: 100%;
    .title_top {
      height: 40px;
      display: flex;
      line-height: 40px;
      flex-direction: row;
      border-bottom: 1px solid #e7ebee;
      background: #fff;
      .title {
        text-align: left;
        padding: 0 32px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      div:last-child {
        color: #696969;
        font-size: 12px;
      }
    }
    .img {
      width: auto;
      height: auto;
      margin: 20px;
    }
    .bodys{
      margin-top: 20px;
      background: #fff;
      padding: 50px;
      box-shadow: 0px 0px 5px #ccc;
    }
  }
}
</style>
