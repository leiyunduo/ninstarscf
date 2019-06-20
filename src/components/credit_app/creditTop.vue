<template>
  <div class="c_top_form">
    <ul>
      <li v-for="(item, index) in pData" :key="index" :class="[activeIndex > index ? 'active' : '']">
        <span></span>
        <div class="c_step" :class="[activeIndex > index ? 'active' : '']">
          <i>{{index + 1}}</i>
          <p>{{item}}</p>
        </div>
      </li>
      <!-- <li>
        <span></span>
        <div class="c_step">
          <i>2</i>
          <p>融资用途</p>
        </div>
      </li>
      <li>
        <span></span>
        <div class="c_step">
          <i>3</i>
          <p>融资发布</p>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
export default {
  name: 'getTopStep',
  props: {
    activeStep: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      activeIndex: this.activeStep,
      pData: ['债权处置方式', '债权处置用途', '债权处置发布']
    }
  },
  mounted () {
    
  },
  methods: {
    
  }
}
</script>

<style scoped lang="less">
  .c_top_form{
    background: #fff;
    border: 1px solid #e1e6f0;
    height: 122px;
    width: 100%;
    border-radius: 4px;
    ul {
      width: 100%;
      height: 122px;
      display: flex;
      // justify-content: space-between;
      li{
        width: 25%;
        display: flex;
        float: left;
        height: 100%;
        span{
          display: inline-block;
          // width: 400px;
          height: 61px;
          flex: 1;
          border-bottom: 1px dashed #979797;
        }
        &:nth-of-type(1) span{
          border: none;
        }
        .c_step{
          position: relative;
          display: inline-block;
          width: 100px;
          height: 100%;
          background: url('../../../static/img/debet/icon2.png') no-repeat center 30px;
          background-size: 35px 42px;
          p{
            margin-top: 75px;
            color: #ccc;
            font-weight: bold;
            text-align: center;
          }
          i{
            font-style: normal;
            position: absolute;
            top: 55px;
            right: 20px;
            border: 1px solid #ccc;
            background: #fff;
            color: #b6b6b6;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            font-size: 12px;
            text-align: center;
            line-height: 16px;
          }
          &.active{
            background: url('../../../static/img/debet/icon1.png') no-repeat center 30px;
            background-size: 35px 42px;
          }
          &.active i{
            background: #eb6100;
            color: #fff;
            border: 1px solid #eb6100;
          }
          &.active p{
            color: #eb6100;
          }
        }
        &.active{
          span{
            border-color: #eb6100;
          }
        }
      }
    }
  }
</style>
