<template>
  <div class="blogNews">
    <div class="creditor-debt clearfix">
      <div class="blog_tit">
        <span>当前位置 ></span>
        <span style="cursor: pointer;" @click="comeBank">博客 ></span>
        <span style="color: #eb6100;">详情</span>
      </div>
      <div class="blog_line">
        <div class="title_top">
          <div class="title">{{blogList.title}}</div>
          <div>{{blogList.post_time}}</div>
        </div>
      </div>
      <div class="bodys" v-html="bodys"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bankManage',
  data () {
    return {
      ids: '',
      bodys: '',
      blogList: {
        title: '',
        post_time: ''
      },
      types: '',
      // 金融机构
      bid: '',
      fid: '',
      nId: '',
      // 企业
      sid: '',
      bankid: ''
    }
  },
  mounted () {
    var that = this
    that.ids = Number(that.$route.query.id)
    that.bid = Number(that.$route.query.bid)
    that.$ajax.get(`/api/home_page/` + that.bid + `/news/` + that.ids).then(res => {
      that.bodys = res.data.body
      that.blogList = res.data
    })
  },
  methods: {
    comeBank () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.blogNews {
  width: 100%;
  min-height: 100%;
  display: flex;
  //padding-top: 70px;
  .creditor-debt {
    padding: 0 50px;
    background: #f5f7f8;
    width: 100%;
    .title_top {
      height: 60px;
      display: flex;
      line-height: 60px;
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
    .bodys{
      margin-top: 20px;
      background: #fff;
      padding: 50px;
      box-shadow: 0px 0px 5px #ccc;
    }
  }
}
.blog_tit {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
