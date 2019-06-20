<template>
  <div class="c_top_container">
    <div v-if="showUp">
      <div class="c_top_box">
        <div class="c_top_item my_up"></div>
        <div class="c_top_item" :class="showNum ? 'business' : 'mine'"></div>
        <div class="c_top_item my_down"></div>
      </div>
      <div class="c_bom_box">
        <div class="c_up_me_line">
          <span></span>
          <p v-if="showNum" :title="'融资缺口:'+valueDatas.financingGap">融资缺口:{{toThousands(valueDatas.financingGap)}}元</p>
        </div>
        <div class="c_me_down_line">
          <span v-if="showNum" :title="'融资授信:'+valueDatas.financingCredit">融资授信:{{toThousands(valueDatas.financingCredit)}}元</span>
          <span v-if="showNum" :title="'融资风控:'+valueDatas.financingControl">融资风控:{{toThousands(valueDatas.financingControl)}}元</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="c_top_box">
        <div class="c_top_item" :class="showNum ? 'business' : 'mine'"></div>
        <div class="c_top_item my_down"></div>
      </div>
      <div class="c_bom_box c_not_up">
        <div class="c_me_down_line">
          <span v-if="showNum" :title="'融资授信:'+valueDatas.financingCredit">融资授信:{{toThousands(valueDatas.financingCredit)}}元</span>
          <span v-if="showNum" :title="'融资风控:'+valueDatas.financingControl">融资风控:{{toThousands(valueDatas.financingControl)}}元</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'getTop',
  data () {
    return {
      showNum: this.isShowNum,
      showUp: this.isShowUp,
      valueDatas: this.valueData
    }
  },
  // 如果传入数字，需要按照上边的字段名传值
  props: ['valueData', 'isShowUp', 'isShowNum']
}
</script>
<style lang="less">
  .c_top_container{
    width: 100%;
    height: 240px;
    padding-top: 50px;
    .c_top_box{
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-around;
      .c_top_item{
        display: inline-block;
        height: 98px;
        width: 220px;
        &.my_up{
          background: url("../../../static/img/myup.png") no-repeat center;
          background-size: 100%;
        }
        &.mine{
          background: url("../../../static/img/mine.png") no-repeat center;
          background-size: 100%;
          width: 292px;
        }
        &.business{
          background: url("../../../static/img/business.png") no-repeat center;
          background-size: 100%;
          width: 292px;
        }
        &.my_down{
          background: url("../../../static/img/mydown.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
    .c_bom_box{
      font-size: 14px;
      width: 100%;
      display: inline-block;
      position: relative;
      .c_up_me_line{
        width: 33%;
        text-align: center;
        margin-left: 15%;
        height: 78px;
        // background: url("static/img/up_my.png") no-repeat right center;
        // background-size: 70% 100%;
        .contract_tap_title {
          width: 22%;
          margin: 0 auto;
          position: relative;
          text-align: right;
          span {
            margin-right: 60px;
            line-height: 27px;
          }
          .contract_tap_title_icon {
            width: 24px;
            height: 24px;
            background-image: url('../../../static/img/badge.png');
            border-radius: 50%;
            position: absolute;
            top: 0px;
            right: -12px;
            text-align: center;
          }
        }
        span {
          display: inline-block;
          width: 33%;
          height: 100%;
          position: absolute;
          top: -50px;
          left: 15%;
          border: 2px solid #f29659;
          border-top: none;
          border-radius: 15px;
        }
        p{
          // max-width: 10%;
          // overflow: hidden;
          // text-overflow:ellipsis;
          // white-space: nowrap;
          line-height: 78px;
        }
      }
      .c_me_down_line{
        position: absolute;
        top: -50px;
        right: 0;
        width: 50%;
        height: 80px;
        background: url("../../../static/img/my_d.png") no-repeat 10% center;
        background-size: 70% 100%;
        span{ 
          // max-width: 20%;
          // overflow: hidden;
          // text-overflow:ellipsis;
          // white-space: nowrap;
          &:nth-of-type(1){
            position: absolute;
            bottom: -20px;
            width: 50%;
            left: 0;
            display: inline-block;
          }
          &:nth-of-type(2){
            position: absolute;
            bottom: -20px;
            left: 50%;
            display: inline-block;
            width: 50%;
          }
        }
      }
      &.c_not_up{
        .c_me_down_line{
          background-size: 100% 100%;
          position: absolute;
          top: -50px;
          left: 25%;
          span{
            &:nth-of-type(2){
            position: absolute;
            bottom: -20px;
            left: 50%;
            display: inline-block;
          }
          }
        }
      }
    }
  }
</style>
