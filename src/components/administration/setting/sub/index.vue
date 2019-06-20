<template>
  <div class="sub-account-wraper">
    <div class="sub-account">
      <div class="sub-title">
        <h4>{{title}}</h4>
      </div>
      <div class="sub-content">
        <list @addAccount="toAddAccount" @view="toView" v-if="!isAdd"/>
        <addAccount @prev="toPrev" @list="toList" :verify="verify" v-if="isAdd"/>
      </div>
    </div>
  </div>
</template>

<script>
  import list from './list'
  import addAccount from './addAccount'
  export default {
    name: '',
    data () {
      return {
        title: '子账号管理',
        isAdd: false,
        verify: {}
      }
    },
    components: {
      list, addAccount
    },
    methods: {
      toList () {
        this.isAdd = false
      },
      toAddAccount (e) {
        this.isAdd = true
        e.next = false
        this.verify = e
      },
      toPrev () {
        this.isAdd = false
      },
      toView (e) {
        this.isAdd = true
        e.next = true
        this.verify = e
      }
    }
  }
</script>
<style lang='less' scope>
  .sub-account-wraper {
    padding: 15px 20px 15px 40px;
    .sub-account {
      .sub-title {
        &>h4 {
          font-size: 18px;
          color: #666;
        }
      }
    }
  }
</style>