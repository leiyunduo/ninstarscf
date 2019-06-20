<template>
  <div class="invite-wraper">
    <div class="invite-view">
      <div class="invite-title">
        <h4>
          邀请码管理
        </h4>
        <p class="invite-tips">
          {{tips}} <br/>
        </p>
      </div>
      <div class="btn btn_handler" @click="toInvite" v-show="!isInvite"><span>邀请</span></div>
      <div class="invite-list">
        <members v-if="!isInvite"></members>
        <invite v-else @prev="showList"></invite>
      </div>
    </div>  
  </div>
</template>

<script>
  import members from './members'
  import invite from './invite'
  export default {
    name: '',
    data () {
      return {
        tips: '我邀请的',
        isInvite: false
      }
    },
    components: {
      members, invite
    },
    mounted () { 
 
    },
    methods: { 
      toInvite () {
        this.isInvite = true
        this.tips = '开始邀请'
      },
      showList () {
        this.isInvite = false
      }
    }
  }
</script>
<style lang='less' scope>
  .invite-wraper {
    padding: 15px 20px 15px 40px;
    .invite-view {
      .invite-title {
        color: #666666;
        &>h4 {
          font-size: 18px;
          margin-bottom: 30px;
          font-weight: 400;
        }
        &>.invite-tips {
          font-size: 16px;
          margin-bottom: 10px;
        }
      }
      .btn {
        width:80px;
        padding: 5px 20px;
        border-radius: 4px;
        margin-top: 30px;
        margin-bottom: 50px;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
        user-select: none;
        &.btn_handler {
          background:linear-gradient(90deg,rgba(235,97,0,1) 0%,rgba(239,129,51,1) 100%);
          box-shadow:0px 2px 4px 0px rgba(235,97,0,0.4);
          color: #fff;
          &:hover {
            .ns-tab-hover(#eb6100, bg)
          }
          &:active {
            .ns-tab-active(#eb6100, bg)
          }
          &>span::before {
            content: "+";
            display: inline-block;
            margin-right: px;
            position: relative;
            left: -7px;
          }
        }
      }
    }
  }
</style>