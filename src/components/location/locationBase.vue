<template>
  <div class="location" v-if="location.length > 0">
    <img :src="imgSrc" alt="">
    <span>位置 > </span>
    <span v-for="(item, index) in location" :key="index">
      <router-link v-if="location.length >= index + 2" :to="item.url">{{ item.title }}</router-link>
      <span :class="item" v-if="location.length >= index + 2">></span>
    </span>
    <span>{{location[location.length-1].title}}</span>
  </div>
</template>

<script>
export default {
  name: 'location',
  props: {
    location: {
      type: Array,
      default: [{
          title: '',
          url: ''
        }
      ]
    }
  },  
  data () {
    return {
      imgSrc: '',
      imgData: [
        'static/img/leftbar/homes.png',
        'static/img/leftbar/mysafe.png',
        'static/img/leftbar/mytask.png',
        'static/img/leftbar/myxind.png',
        'static/img/leftbar/mychain.png',
        'static/img/leftbar/myzhaiq.png',
        'static/img/leftbar/myfin.png',
        'static/img/leftbar/myshang.png',
        'static/img/leftbar/area.png',
        'static/img/leftbar/mykehu.png',
        'static/img/leftbar/mymag.png',
        'static/img/leftbar/myzhaiq.png',
        'static/img/leftbar/myxind.png',
        'static/img/leftbar/loan.png',
        'static/img/leftbar/myzhaiq.png'
      ],
      creditTitle: ['融资申请', '尽调', '三方协议', '放款', '资金监管', '还款'],
      titleArr: ['主页', '账号安全', '我的消息', '我的数据资产', '交易管理与增信', '我的债权债务', '我的融资', '好友管理',
      '区域企业', '我的客户', '账号管理', '我的债权', '我的审核', '贷后风控大厅', '债权处置']
    }
  },
  beforeMount () {
    if (this.location.length === 0) return
    const index = this.titleArr.indexOf(this.location[0].title)
    if (this.imgData[index]) {
      this.imgSrc = this.imgData[index]
    } else {
      if (this.creditTitle.indexOf(this.location[0].title) > 0) {
        this.imgSrc = this.imgData[11]
      } else {
        this.imgSrc = this.imgData[11]
      }
    }
  },
  watch: {
    location (newer, old) {
      this.location = newer
      let index = this.titleArr.indexOf(this.location[0].title)
      if (this.imgData[index]) {
        this.imgSrc = this.imgData[index]
      } else {
        if (this.creditTitle.indexOf(this.location[0].title) > 0) {
          this.imgSrc = this.imgData[11]
        } else {
          this.imgSrc = this.imgData[11]
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.location {
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  padding-left: 20px;
  img{
    margin-right: 10px;
    vertical-align: middle;
  }
  span {
    line-height: 60px;
    color: #343536;
    a {
      color: #343536;
      text-decoration: none;
    }
  }
  &>span:last-child {
    color :#eb6100;
  }
}
</style>
