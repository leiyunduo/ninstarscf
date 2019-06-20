<template>
  <div class="auth">
    <div class="list_state" v-if="showHide === 0">
      <h3>认证与变更<p class="info">企业身份识别</p></h3>
      <ul>
        <li v-for="(item, index) in showInfo" :key='index'>
          <div>
            <p>{{item.title}}</p>
            <p :class="item.key === '未认证' ? 'is_null':''">{{item.key}}</p>
          </div>
          <div>
            <div @click="handleClick(index)">编辑</div>
          </div>
        </li>
        <li v-if="showInfo.length === 0" style="line-height:110px">暂无认证信息</li>
      </ul>
    </div>
    <div class="list_state" v-if="showHide === 1">
      <h3>认证与变更<p class="info">企业身份识别</p></h3>
      <authentication v-if="roles === 0" />
      <financeAdmittance v-if="roles === 1" />
      <guaranteeProvider v-if="roles === 2" />
    </div>
  </div>
</template>

<script>
import authentication from '../../authentication/authentication'
import financeAdmittance from '../../financeAdmittance/financeAdmittance'
import guaranteeProvider from '../../../guaranteeFund/guaranteeProvider/guaranteeProvider'
export default{
  name: 'auth',
  data () {
    return {
      pt_status: '',
      twcx_verified_status: '',
      cfca_verified_status: '',
      showInfo: [],
      signed: '',
      showHide: 0,
      roles: -1
    }
  },
  components: {
    authentication,
    financeAdmittance,
    guaranteeProvider
  },
  props: {
    signeds: {
      type: Number,
      default: () => []
    }
  },
  watch: {
    signeds: {
      immediate: true,    // 这句重要
      handler (val) {
        if (Number(val) === 1) { this.showHide = 1 }
      }
    }
  },
  mounted () {
    const that = this
    // 第三方认证
    // this.showInfo = [
    //   {title: '平台认证', key: res.data.access_status},
    //   {title: '天威诚信认证', key: res.data.twcx_verified_status ? '已通过审核' : '未通过审核'},
    //   {title: 'cfca认证', key: res.data.cfca_verified_status ? '已通过审核' : '未通过审核'}
    // ]
    if (localStorage.role === 'business') {
      that.roles = 0
    } else if (localStorage.role === 'institution') {
      that.roles = 1
    } else if (localStorage.role === 'fund') {
      that.roles = 2
    } else {
      that.roles = 0
    }
    that.$ajax.get('/api/company/status/').then(res => {
      // "signed": False, # 是否签署协议
      that.signed = res.data.signed
      if (that.signed === true) {
        that.showInfo = [
          {title: '平台认证', key: '已认证'}
        ]
      } else {
        that.showInfo = [
          {title: '平台认证', key: '未认证'}
        ]
        that.showHide = 1
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    handleClick (index) {
      const that = this
      // if (index === 0) {
      let query = ''
      that.showHide = 1
      if (localStorage.role === 'business') {
        that.roles = 0
      } else if (localStorage.role === 'institution') {
        that.roles = 1
      } else if (localStorage.role === 'serviceprovider') {
        that.roles = 0
      } else if (localStorage.role === 'person') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'institutionperson') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'serviceperson') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'fund') {
        that.roles = 2
      }
      if (localStorage.role === 'service_provider') query = 'serviceProvider'
      if (localStorage.role === 'guarantee_provider') query = 'guaranteeProvider'
      // } else {
      //   // let params = this.showInfo[index]
      //   // let query = {type: index}
      //   // index.key === '已认证' ? query.status = 'true' : query.status = 'false'
      //   // this.$router.push({path: '/companyAuth', query})
      // }
    }
  }
}
</script>
<style lang="less" scoped>
  .auth {
    .list_state {
      // height: 100%;
      width: 100%;
      h3 {
        font-family:PingFangSC-Medium;
        font-size:18px;
        color:#666666;
        letter-spacing:0;
        text-align:left;
        display: flex;
        flex-direction: row;
        padding-left: 42px;
        // border-left: 3px solid #eb6100;
        margin-top: 15px;
        padding-bottom: 10px;
        p.info {
          display: inline-block;
          font-family:PingFangSC-Regular;
          font-size:14px;
          color:#999999;
          letter-spacing:0;
          text-align:left;
          padding-top: 5px;
          padding-left: 10px;
        }
      }
      ul {
        padding: 0 42px 120px;
        width: 100%;
        li {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
          border-bottom: 1px solid rgba(220,220,220,1);
          height:110px;
          div:first-child  {
            p:first-child {
              padding-bottom: 15px;
              font-size:14px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(102,102,102,1);
              margin-top: 26px;
            }
            p:last-child {
              font-size:14px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(82,196,26,1);
            }
            p.is_null {
              color: #999;
            }
          }
          div:last-child {
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            div {
              font-size:14px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(235,97,0,1);
              cursor: pointer;
              margin-right: 64px;
              padding-top: 10px;
            }
          }
        }
      }
    }
  }
</style>
