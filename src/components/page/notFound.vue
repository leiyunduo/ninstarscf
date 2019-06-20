<template>
  <div class="c_not_container">
    <div class="c_top_box">
      <div class="c_font_box">
          <p>很遗憾，您访问的页面挖不到了...</p>
          <p>你要坚强些，继续去发掘别的页面吧</p>
      </div>
    </div>
    <div class="c_bottom_box"></div>
  </div>
</template>

<style lang='less' scope>
  .c_not_container {
    height: calc(100vh - 64px);
    // background: #fff;
    .c_top_box {
      height: 40%;
      width: 100%;
      position: relative;
      background: url(../../../static/img/notFund/404-1.png) no-repeat center 40%;
      .c_font_box {
        text-align: center;
        position: absolute;
        top: 70%;
        left: 50%;
        -webkit-transform: translate(-50%);
        -moz-transform: translate(-50%);
        -ms-transform: translate(-50%);
        -o-transform: translate(-50%);
        transform: translate(-50%);
      }
      .c_font_box p:nth-of-type(1) {
        font-size: 20px;
        line-height: 40px;
        font-weight: 900;
      }
      .c_font_box p:nth-of-type(2) {
        color: #bbb;
        line-height: 30px;
      }
    }
    .c_bottom_box {
      height: 60%;
      width: 100%;
      background: url(../../../static/img/notFund/404.png) no-repeat bottom center;
      background-size: contain;
    }
  }
</style>