<template>
  <div class="setting-wraper">
    <div class="setting-inner">
      <div class="setting-view">
        <div class="nav-wraper">
          <sideBarMenu :sideBarDatas="sideBarList" :signeds='signed' :isSigned="isSigned" @click="onTabChange"></sideBarMenu>
        </div>
        <div class="content-wraper" v-if="tabIndex === 0">
          <safe></safe>
        </div>
        <div class="content-wraper" v-if="tabIndex === 1">
          <auth :signeds='signed'></auth>
        </div>
        <div class="content-wraper" v-if="tabIndex === 2">
          <!-- 头像管理 -->
          <avatar></avatar>
        </div>
        <div class="content-wraper" v-if="tabIndex === 3">
          <!-- 子账号管理 -->
          <subManager></subManager>
        </div>
        <div class="content-wraper" v-if="tabIndex === 4">
          <!-- 邀请码管理 -->
          <invite></invite>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sideBarMenu from '@/components/public/sideBar'
  import invite from './Invitation/index'
  import safe from './account/safe'
  import auth from './auth/auth'
  import subManager from './sub/index'
  import avatar from './avatar/index'
  export default {
    name: '',
    components: {
      sideBarMenu, invite,
      safe,
      auth,
      subManager,
      avatar
    },
    data () {
      return {
        sideBarList: ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理'],
        signed: 0,
        tabIndex: 0,
        isSigned: true
      }
    },
    mounted () { 
      const that = this
      if (that.$route.query.signed) {
        that.signed = Number(that.$route.query.signed)
        that.tabIndex = 1
      }
      that.$ajax.get('/api/company/status/').then(res => {
        this.isSigned = res.data.signed
        if (res.data.signed === false) {
          that.tabIndex = 1
          that.signed = 1
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    methods: { 
      onTabChange (e) {
        this.tabIndex = e
        if (e === 0) {
          
        } else if (e === 1) {

        } else if (e === 2) {

        } else if (e === 3) {

        } else if (e === 4) {

        }
      }
    }
  }
</script>
<style lang='less' scope>
  .setting-wraper {
    padding-top: 20px; 
    .setting-inner {
      background: #fff;
      margin: 0 20px 20px;
      .setting-view {
        display: flex;
        padding: 15px 0;
        .nav-wraper {
          border-right: 1px solid #e8e8e8;
          min-height: 720px;
          padding: 15px 0;
        }
        .content-wraper {
          width: calc(100% - 120px);
        }
      }
    }  
  }
</style>