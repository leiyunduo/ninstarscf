<template>
  <div class="location">
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
  props: ['location'],
  data () {
    return {
      imgSrc: '',
      imgData: ['static/img/leftbar/mysafe.png',
        'static/img/leftbar/mytask.png',
        'static/img/leftbar/myxind.png',
        'static/img/leftbar/mychain.png',
        'static/img/leftbar/myzhaiq.png',
        'static/img/leftbar/myfin.png',
        'static/img/leftbar/myshang.png',
        'static/img/leftbar/mysquare.png',
        'static/img/leftbar/myxind.png',
        'static/img/leftbar/mymag.png',
        'static/img/leftbar/myzhaiq.png',
        'static/img/leftbar/myxind.png',
        'static/img/leftbar/area.png',
        'static/img/leftbar/myzhaiq.png'
      ],
      creditTitle: ['融资申请', '尽调', '三方协议', '放款', '资金监管', '还款']
    }
  },
  mounted () {
    const titleArr = ['账号安全', '我的消息', '我的数据资产', '链式记账', '我的债权债务', '我的融资', '平台好友',
      '需求广场', '申请中', '账号管理', '我的债权', '我的审核', '区域企业', '债权处置']
    const index = titleArr.indexOf(this.location[0].title)
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
</script>

<style scoped lang="less">
.location {
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  position: fixed;
  margin-top: -64px;
  padding-left: 50px;
  z-index: 25;
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
  // &>span:first-child>a {
  //   color :#343536;
  // }
}
</style>
