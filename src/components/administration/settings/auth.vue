<template>
  <div class="auth">
    <div class="list_state">
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
  </div>
</template>

<script>
export default{
  name: 'auth',
  data () {
    return {
      pt_status: '',
      twcx_verified_status: '',
      cfca_verified_status: '',
      showInfo: [],
      signed: ''
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
      if (localStorage.role === 'business') {
        that.$router.push('/authentication')
      } else if (localStorage.role === 'institution') {
        that.$router.push('/financeAdmittance')
      } else if (localStorage.role === 'serviceprovider') {
        that.$router.push('/authentication')
      } else if (localStorage.role === 'person') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'institutionperson') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'serviceperson') {
        that.$message.error('没有权限')
      } else if (localStorage.role === 'fund') {
        that.$router.push('/guaranteeProvider')
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
        padding-left: 22px;
        // border-left: 3px solid #eb6100;
        margin-top: 5px;
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
        padding: 0 0 120px 36px;
        width: 100%;
        li {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
          background:#ffffff;
          border:1px solid #e1e6f0;
          border-radius:12px;
          width:666px;
          height:110px;
          padding-left: 47px;
          div:first-child  {
            p:first-child {
              line-height: 30px;
              font-family:PingFangSC-Regular;
              font-size:18px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              margin-top: 26px;
            }
            p:last-child {
              line-height: 24px;
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#eb6100;
              letter-spacing:0;
              text-align:left;
              text-decoration: underline;
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
              width: 85px;
              height: 30px;
              background: #eb6100;
              color: #fff;
              border-radius: 2px;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
              margin-right: 64px;
            }
          }
        }
      }
    }
  }
</style>
