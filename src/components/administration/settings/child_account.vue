<template>
  <div class="auth">
    <div class="list_state">
      <p>子账号管理</p>
      <p class="info">创建子账号/平台认证后才能登录</p>
      <div class="add_account">
        <div>创建子账号</div>
      </div>
      <ul>
        <li v-for="(item, index) in showInfo" :key='index'>
          <div>
            <div>
              <div>
                <span>登陆账号：</span>
                <span>{{item.person_phone}}</span>
              </div>
              <div>
                <span>姓名：</span>
                <span>{{item.person_name}}</span>
              </div>
            </div>
            <!-- <p :class="item.verified !== '已通过' ? 'is_null':''">{{item.verified}}</p> -->
          </div>
          <div>
            <div :class="item.verified !== '已通过' ? 'is_null':''">{{item.verified}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default{
  name: 'child',
  data () {
    return {
      pt_status: '',
      twcx_verified_status: '',
      cfca_verified_status: '',
      showInfo: []
    }
  },
  mounted () {
    // 第三方认证
    if (localStorage.role === 'business') {
      this.$ajax.get('/api/manage/business/person/?token=' + this.$token()).then(res => {
        if (res.data.code === '1') {
          this.showInfo = res.data.data
        }
      })
    } else if (localStorage.role === 'institution') {
      this.$ajax.get('/api/manage/institution/person/?token=' + this.$token()).then(res => {
        if (res.data.code === '1') {
          this.showInfo = res.data.data
        }
      })
    } else if (localStorage.role === 'serviceprovider') {
      this.$ajax.get('/api/manage/service/person/?token=' + this.$token()).then(res => {
        if (res.data.code === '1') {
          this.showInfo = res.data.data
        }
      })
    }
  },
  methods: {
    handleClick (index) {
      if (index === 0) {
        let query = ''
        if (localStorage.role === 'business') query = '0'
        if (localStorage.role === 'institution') query = '1'
        if (localStorage.role === 'service_provider') query = 'serviceProvider'
        if (localStorage.role === 'guarantee_provider') query = 'guaranteeProvider'
        this.$router.push(`/enterprise/${query}`)
      } else {
        // let params = this.showInfo[index]
        let query = {type: index}
        index.key === '已通过审核' ? query.status = 'true' : query.status = 'false'
        this.$router.push({path: '/companyAuth', query})
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .auth {
    .list_state {
      // height: 100%;
      width: 100%;
      p.info {
        line-height: 20px;
        padding-left: 32px;
        color: #666;
        margin: 20px 0 50px 0;
        font-size: 14px;
      }
      div.add_account {
        padding: 30px 20px;
        padding-top: 0;
        div {
          width: 108px;
          height: 30px;
          border-radius: 2px;
          background: #eb6100;
          color: #fff;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
      }
      ul {
        padding: 0 0 120px 36px;
        width: 100%;
        li {
          display: flex;
          justify-content: space-between;
          height: 60px;
          margin-bottom: 24px;
          &>div:first-child  {
            div:first-child {
              line-height: 45px;
              display: flex;
              div {
                margin-right: 35px;
              }
            }
            p:last-child {
              line-height: 24px;
              font-size: 14px;
              color: #333;
            }
            p.is_null {
              color: #999;
            }
          }
          &>div:last-child {
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            div {
              width: 85px;
              height: 30px;
              // background: #eb6100;
              color: #eb6100;
              border-radius: 2px;
              text-align: center;
              line-height: 30px;
              // cursor: pointer;
            }
            div.is_null {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
