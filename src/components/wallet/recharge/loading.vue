<template>
  <div class="loading-wraper">
    <div class="loading-viewer">
      <div class="loading-title">
        <h4>充值详情</h4>
      </div>
      <div class="loading-content">
        <p class="loading-content__title">充值等待中...</p>
        <p>钱还在路上，请耐心等待</p>
        <div class="refrash" @click="toRefrash">刷新</div>
        <p>联系我们: 400-100-1000</p>
        <p><i class="ns-iconfont ns-icon-tips"></i>点击“刷新”重新访问后台确认充值结果，充值成功后跳转至“充值成功”页面</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        
      }
    },
    mounted () { 
      
    },
    methods: { 
      toRefrash () {
        // this.$ajax.get().then
      }
    }
  }
</script>
<style lang='less' scope>
  @text-nomal: #EB6100;
  .text-nomal {
    color: @text-nomal;
    cursor: pointer;
    &:hover {
      .ns-tab-hover(#EB6100, txt)
    }
  }
  .loading-wraper {
    padding: 20px 40px;
    .loading-viewer {
      .loading-title {
        font-size: 18px;
        padding: 10px 0 10px 20px;
        border-bottom: 1px solid #ccc; 
      }
      .loading-content {
        width: 50%;
        padding: 15px 20px;
        text-align: center;
        .loading-content__title {
          font-size: 18px;
          padding: 20px 0;
          width: 80%;
          border-bottom: 1px solid #ccc;
          margin: 0 auto;
        }
        &>p:nth-of-type(2) {
          margin: 90px;
          font-size: 14px;
        }
        &>p:nth-of-type(3) {
          margin: 30px;
        }
        .refrash {
          width: 120px;
          padding: 8px 0px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          color: #fff;
          margin: 0 auto;
          background:linear-gradient(90deg,rgba(12,141,255,1) 0%,rgba(48,158,255,1) 100%);
          box-shadow:0px 2px 4px 0px rgba(48,158,255,0.4);
          border-radius:4px;
          &:hover {
            .ns-tab-hover(#0c8dff, bg)
          }
          &:active {
            .ns-tab-active(#0c8dff, bg)
          }
        }
      }
    }
  }
</style>