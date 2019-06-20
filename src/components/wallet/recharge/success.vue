<template>
  <div class="success-wraper">
    <div class="success-viewer">
      <div class="success-title">
        <h4>充值详情</h4>
      </div>
      <div class="success-content">
        <p class="success-content__title">充值成功</p>
        <div class="info">
          <div class="-row">
            <label for="">储蓄卡</label>
            <span>建设银行 尾号6666</span>
          </div>
          <div class="-row">
            <label for="">充值金额</label>
            <span>¥ 1.00</span>
          </div>
        </div>
        <span class="text-nomal">收支明细</span>
        <div class="onConfirm" @click="confirm">完成</div>
        <p>联系我们: 400-100-1000</p>
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
      confirm () {
        // this.$ajax.get().then
      }
    }
  }
</script>
<style lang='less' scope>
  @text-nomal: #409eff;
  .text-nomal {
    color: @text-nomal;
    cursor: pointer;
    &:hover {
      .ns-tab-hover(#0c8dff, txt)
    }
  }
  .success-wraper {
    padding: 20px 40px;
    .success-viewer {
      .success-title {
        font-size: 18px;
        padding: 10px 0 10px 20px;
        border-bottom: 1px solid #ccc; 
      }
      .success-content {
        width: 50%;
        padding: 15px 20px;
        text-align: center;
        .success-content__title {
          font-size: 18px;
          padding: 20px 0;
          width: 80%;
          border-bottom: 1px solid #ccc;
          margin: 0 auto;
        }
        .info {
          width: 80%;
          margin: 10px auto 110px;
          padding-top: 10px;
          &>.-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
          }
        }
        .onConfirm {
          width: 120px;
          padding: 8px 0px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          color: #fff;
          margin: 10px auto 20px;
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