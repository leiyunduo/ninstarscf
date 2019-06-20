<template>
  <div class="left_blog">
    <div class="blog">
      <ul>
        <li v-for="(item, index) in titleName" :class="{active: vueID === item}" :key="index">
          <p @click="blogNav(item)">{{item}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      titleName: [],
      vueID: '企业介绍',
      userType: ''
    }
  },
  beforeCreate () {
    var that = this
    // 本地方案
    that.userType = localStorage.role
    if (that.userType === 'business' || that.userType === 'person') {
      that.titleName = ['企业介绍', '工商信息', '财务状况', '联系方式', '企业相册', '自我评级']
    } else {
      that.titleName = ['企业介绍', '工商信息', '联系方式', '企业相册']
    }
  },
  mounted () {
    var that = this
    // 本地方案
    that.userType = localStorage.role
    if (that.userType === 'business' || that.userType === 'person') {
      that.titleName = ['企业介绍', '工商信息', '财务状况', '联系方式', '企业相册', '自我评级']
    } else {
      that.titleName = ['企业介绍', '工商信息', '联系方式', '企业相册']
    }
    if (that.$route.query.qIndex) {
      this.$emit('childByValue', '财务状况')
      that.vueID = '财务状况'
    }
  },
  methods: {
    blogNav (item) {
      var that = this
      that.vueID = item
      this.$emit('childByValue', that.vueID)
    }
  }
}
</script>

<style lang="less" scoped>
.left_blog {
  width: 135px;
  height: auto;
  .blog {
    float: left;
    ul {
      height: auto;
      text-align: right;
      border-left: 1px solid #eaeaea;
      margin-top: 22px;
      li {
        height: auto;
        padding: 8px 0;
        margin-top: 5px;
        p {
          height: 27px;
          display: block;
          width: auto;
          font-family:PingFangSC-Semibold;
          font-size: 14px;
          line-height: 28px;
          color:#666;
          padding-left: 34px;
          cursor: pointer;
        }
      }
      .active {
        border-left: 3px solid #eb6100;
        p {
          color: #eb6100;
          height: 27px;
          font-weight: bold;
        }
      }
      li:hover {
        border-left: 3px solid #eb6100;
        p {
          color: #eb6100;
          height: 27px;
        }
      }
    }
  }
}
</style>
