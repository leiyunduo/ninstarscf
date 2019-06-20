<template>
  <div class='settings'>
    <div class="setting_info">
      <ul>
        <li v-for="(item, index) in titles" :class="selIndex === index ? 'active': ''" :key='index' @click="handleChange($event, index)">{{item}}</li>
      </ul>
      <div class="show_wrap">
        <div v-if="selIndex === 0">
          <safe></safe>
        </div>
        <div v-if="selIndex === 1">
          <auth></auth>
        </div>
        <div v-if="selIndex === 2">
          <avatar></avatar>
        </div>
        <div v-if="selIndex === 3">
          <!-- <child></child> -->
          <accountManagement></accountManagement>
        </div>
        <div v-if="selIndex === 4">
          <invitingAdmin></invitingAdmin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import accountManagement from './accountManagement'
import safe from './safe'
import auth from './auth'
import avatar from './avatar'
import child from './child_account'
import invitingAdmin from './invitingAdmin'
export default {
  name: 'settings',
  data () {
    return {
      titles: [],
      selIndex: 0
    }
  },
  components: {
    safe, auth, avatar, child, accountManagement, invitingAdmin
  },
  beforeCreate () {
    if (localStorage.role === 'business') {
      this.titles = ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理']
    } else if (localStorage.role === 'institution') {
      this.titles = ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理']
    } else if (localStorage.role === 'serviceprovider') {
      this.titles = ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理']
    } else if (localStorage.role === 'fund') {
      this.titles = ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理']
    } else {
      this.titles = ['账号与密码', '认证与变更', '头像管理']
    }
  },
  mounted () {
    if (localStorage.role === 'business') {
      this.titles = ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理']
    } else if (localStorage.role === 'institution') {
      this.titles = ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理']
    } else if (localStorage.role === 'serviceprovider') {
      this.titles = ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理']
    } else if (localStorage.role === 'fund') {
      this.titles = ['账号与密码', '认证与变更', '头像管理', '子账号管理', '邀请码管理']
    } else {
      this.titles = ['账号与密码', '认证与变更', '头像管理']
    }
  },
  methods: {
    handleChange: function ($event, index) {
      this.selIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.settings {
  height: 100%;
  width: 100%;
  padding-top: 100px;
  background: #f4f8f9;
  .setting_info {
    margin-top: 50px;
    padding: 34px 35px 50px;
    max-width: 1200px;
    margin: 0 auto;
    height: auto;
    display: flex;
    background: #fff;
    border:1px solid #e1e6f0;
    border-radius:4px;
    ul {
      width: 120px;
      padding-top: 10px;
      border-right: 1px solid #e1e6f0;
      li {
        width: 100%;
        text-align: right;
        line-height: 36px;
        margin-bottom: 30px;
        padding-right: 20px;
        box-sizing: border-box;
        cursor: pointer;
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#999999;
        letter-spacing:0;
      }
      li.active {
        background: none;
        color: #eb6100;
        border-right: 3px solid #eb6100;
      }
    }
    &>.show_wrap {
      width: 1120px;
      padding: 0 20px;
      height: 100%;
      div {
        min-height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
