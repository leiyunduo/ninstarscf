<template>
  <div class="c_slide_container" :class="isShrinked ? '-shrink' : ''">
    <div class="slide_nav" :class="isShrinked ? '-shrink' : ''">
      <div class="sidebar-logo">
        <a :href="$root_url()" :class="isShrinked ? '-shrink' : ''">
          <img src="static/img/users/logo_1x.png" alt="">
        </a>
      </div>
      <ul class="cloumn_nav">
        <li @mouseenter="onHover(index)" @mouseleave="onLeave()" v-for="(nav, index) in navList_2" :key="index" :class="index === itemActive ? 'selStyle': ''"  @click="navgative($event, nav, index)">
          <div>
            <img :src="(topActive === index && itemActive !== topActive) ? nav.hicon : (itemActive === index ? nav.aicon : nav.icon)" alt="">
            <!-- <i class="iconfont" :class="nav.icon"></i> -->
          </div>
          <div>{{nav.name}}</div>
        </li>
      </ul>
      <div class="sidbar-handle" :class="isShrinked ? '-shrink' : ''" @click="handleBar()">
        <img v-if="isShrinked" src="static/img/users/open_2x.png" alt="">
        <img v-else src="static/img/users/group_2x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appNav',
  data () {
    return {
      isShowChild: false,
      topActive: 99,
      itemActive: 0,
      navCompany: [
        {name: '我的主页', icon: 'static/img/leftbar/homes.png', hicon: 'static/img/leftbar/homes-1.png', aicon: 'static/img/leftbar/homes-2.png'},
        {name: '我的数据资产', icon: 'static/img/leftbar/myxind.png', hicon: 'static/img/leftbar/myxind-1.png', aicon: 'static/img/leftbar/myxind-2.png'},
        {name: '交易管理与增信', icon: 'static/img/leftbar/mychain.png', hicon: 'static/img/leftbar/mychain-1.png', aicon: 'static/img/leftbar/mychain-2.png'},
        {name: '我的债权/债务', icon: 'static/img/leftbar/myzhaiq.png', hicon: 'static/img/leftbar/myzhaiq-1.png', aicon: 'static/img/leftbar/myzhaiq-2.png'},
        {name: '我的融资', icon: 'static/img/leftbar/myfin.png', hicon: 'static/img/leftbar/myfin-1.png', aicon: 'static/img/leftbar/myfin-2.png'},
        {name: '平台好友', icon: 'static/img/leftbar/myshang.png', hicon: 'static/img/leftbar/myshang-1.png', aicon: 'static/img/leftbar/myshang-2.png'},
        {name: '债权处置', icon: 'static/img/leftbar/credit.png', hicon: 'static/img/leftbar/credit-1.png', aicon: 'static/img/leftbar/credit-2.png'},
        {name: '债务处置', icon: 'static/img/leftbar/debt.png', hicon: 'static/img/leftbar/debt-1.png', aicon: 'static/img/leftbar/debt-2.png'},
        {name: '贷款处置', icon: 'static/img/leftbar/loan.png', hicon: 'static/img/leftbar/loan-1.png', aicon: 'static/img/leftbar/loan-2.png'},
        {name: '我的生态链', icon: 'static/img/leftbar/loan.png', hicon: 'static/img/leftbar/loan-1.png', aicon: 'static/img/leftbar/loan-2.png'}
      ],
      navBank: [
        {name: '我的主页', icon: 'static/img/leftbar/homes.png', hicon: 'static/img/leftbar/homes-1.png', aicon: 'static/img/leftbar/homes-2.png'},
        {name: '贷款审核', icon: 'static/img/leftbar/myxind.png', hicon: 'static/img/leftbar/myxind-1.png', aicon: 'static/img/leftbar/myxind-2.png'},
        {name: '贷款管理', icon: 'static/img/leftbar/myzhaiq.png', hicon: 'static/img/leftbar/myzhaiq-1.png', aicon: 'static/img/leftbar/myzhaiq-2.png'},
        {name: '贷后风控大厅', icon: 'static/img/leftbar/loan.png', hicon: 'static/img/leftbar/loan-1.png', aicon: 'static/img/leftbar/loan-2.png'},
        {name: '我的产品', icon: 'static/img/leftbar/myprd.png', hicon: 'static/img/leftbar/myprd-1.png', aicon: 'static/img/leftbar/myprd-2.png'},
        {name: '我的客户', icon: 'static/img/leftbar/mykehu.png', hicon: 'static/img/leftbar/mykehu-1.png', aicon: 'static/img/leftbar/mykehu-2.png'},
        {name: '区域企业', icon: 'static/img/leftbar/area.png', hicon: 'static/img/leftbar/area-1.png', aicon: 'static/img/leftbar/area-2.png'},
        {name: '平台好友', icon: 'static/img/leftbar/myshang.png', hicon: 'static/img/leftbar/myshang-1.png', aicon: 'static/img/leftbar/myshang-2.png'},
        {name: '外部征信', icon: 'static/img/leftbar/loan.png', hicon: 'static/img/leftbar/loan-1.png', aicon: 'static/img/leftbar/loan-2.png'}
      ],
      navProvider: [
        {name: '我的主页', icon: 'static/img/leftbar/homes.png', hicon: 'static/img/leftbar/homes-1.png', aicon: 'static/img/leftbar/homes-2.png'},
        {name: '交易管理与增信', icon: 'static/img/leftbar/mychain.png', hicon: 'static/img/leftbar/mychain-1.png', aicon: 'static/img/leftbar/mychain-2.png'},
        {name: '平台好友', icon: 'static/img/leftbar/myshang.png', hicon: 'static/img/leftbar/myshang-1.png', aicon: 'static/img/leftbar/myshang-2.png'},
        // {name: '我的任务', icon: 'static/img/leftbar/mytask.png', hicon: 'static/img/leftbar/mytask-1.png', aicon: 'static/img/leftbar/mytask-2.png'}
      ],
      navFund: [
        {name: '我的主页', icon: 'static/img/leftbar/homes.png', hicon: 'static/img/leftbar/homes-1.png', aicon: 'static/img/leftbar/homes-2.png'},
        {name: '我的企业', icon: 'static/img/leftbar/a.png', hicon: 'static/img/leftbar/a1.png', aicon: 'static/img/leftbar/a2.png'},
        {name: '我的助贷', icon: 'static/img/leftbar/b.png', hicon: 'static/img/leftbar/b1.png', aicon: 'static/img/leftbar/b2.png'},
        {name: '我的债权', icon: 'static/img/leftbar/myzhaiq.png', hicon: 'static/img/leftbar/myzhaiq-1.png', aicon: 'static/img/leftbar/myzhaiq-2.png'},
        {name: '贷后风控大厅', icon: 'static/img/leftbar/loan.png', hicon: 'static/img/leftbar/loan-1.png', aicon: 'static/img/leftbar/loan-2.png'},
        {name: '平台好友', icon: 'static/img/leftbar/myshang.png', hicon: 'static/img/leftbar/myshang-1.png', aicon: 'static/img/leftbar/myshang-2.png'},
        {name: '外部征信', icon: 'static/img/leftbar/loan.png', hicon: 'static/img/leftbar/loan-1.png', aicon: 'static/img/leftbar/loan-2.png'}
      ],
      userInfo: {unread_message: 0},
      saveIndex: '',
      statusIcon: '',
      businessId: '',
      navList_2: [],
      isShrinked: this.toShrinked
    }
  },
  props: ['father', 'type', 'toShrinked'],
  methods: {
    handleBar (status) {
      if (status) {
        this.isShrinked = status
      } else {
        this.isShrinked = !this.isShrinked
        this.$emit('handleSideBar', this.isShrinked)
      }
    },
    onHover (index) {
      this.topActive = index
    },
    onLeave () {
      this.topActive = 99
    },
    handleExpand () {
      this.isShowChild = !this.isShowChild
    },
    setStyle: function ($event, index) {
      var that = this
      that.saveIndex = that.father.selIndex
      that.father.selIndex = -1
      that.father.selIndex = index
    },
    reStyle: function () {
      this.father.selIndex = this.saveIndex
    },
    navgative: function ($event, item, index) {
      if (item.name !== '我的产品') {
        this.itemActive = index
        this.topActive = index
      }
      var that = this
      if (localStorage.role === 'business') {
        if (item.name === '我的主页') {
          that.$router.push('/')
        } else if (item.name === '我的债权/债务') {
          that.$router.push({
            path: '/claim_app'
          })
        } else if (item.name === '我的融资') {
          that.$router.push({
            path: '/financing_app'
          })
        } else if (item.name === '交易管理与增信') {
          that.$router.push({
            path: '/chain_app'
          })
        } else if (item.name === '我的数据资产') {
          that.$router.push({
            path: '/asset_app'
          })
        } else if (item.name === '平台好友') {
          that.$router.push({
            path: '/friendmanagement'
          })
        } else if (item.name === '债权处置') {
          that.$router.push({
            path: '/creditDeal'
          })
        } else if (item.name === '债务处置') {
          that.$router.push({
            path: '/debtDeal'
          })
        } else if (item.name === '贷款处置') {
          that.$router.push({
            path: '/loanDeal'
          })
        } else if (item.name === '我的生态链') {
          that.$router.push({
            path: '/ecoChain/eco_chain'
          })
        }
      } else if (localStorage.role === 'institution') {
        if (item.name === '我的主页') {
          that.$router.push('/')
        } else if (item.name === '贷款管理') {
          that.$router.push({
            path: '/debt_app'
          })
        } else if (item.name === '贷款审核') {
          that.$router.push({
            path: '/credit_app'
          })
        } else if (item.name === '需求广场') {
          // that.$router.push({
          //   path: '/areaSquare'
          // })
          that.$message('暂未开通')
        } else if (item.name === '我的客户') {
          that.$router.push({
            path: '/customer_app'
          })
        } else if (item.name === '我的产品') {
          // that.$router.push({
          //   path: '/productMy'
          // })
          that.$message('暂未开通')
        } else if (item.name === '区域企业') {
          that.$router.push('/area_app')
        } else if (item.name === '贷后风控大厅') {
          that.$router.push('/loan_app')
        } else if (item.name === '平台好友') {
          that.$router.push({
            path: '/friendmanagement'
          })
        } else if (item.name === '外部征信') {
          that.$router.push({
            path: '/ecoChain/eco_chain'
          })
        }
      } else if (localStorage.role === 'serviceprovider') {
        if (item.name === '我的主页') {
          that.$router.push('/')
        } else if (item.name === '交易管理与增信') {
          that.$router.push({
            path: '/chain_app/chain_main',
            query: {
              type: 0
            }
          })
        } else if (item.name === '平台好友') {
          that.$router.push({
            path: '/friendmanagement'
          })
        } 
        // else if (item.name === '我的任务') {
        //   that.$router.push({
        //     path: '/task_list'
        //   })
        // }
      } else if (localStorage.role === 'person') {
        if (item.name === '我的主页') {
          that.$router.push('/')
        } else if (item.name === '我的债权/债务') {
          that.$message.error('没有权限')
        } else if (item.name === '我的融资') {
          that.$message.error('没有权限')
        } else if (item.name === '交易管理与增信') {
          that.$router.push({
            path: '/chain_app'
          })
        } else if (item.name === '我的数据资产') {
          that.$message.error('没有权限')
        } else if (item.name === '平台好友') {
          that.$message.error('没有权限')
        } else if (item.name === '通讯录') {
          that.$router.push({
            path: '/mailList'
          })
        }
      } else if (localStorage.role === 'institutionperson') {
        if (item.name === '我的主页') {
          that.$router.push('/')
        } else if (item.name === '我的审核') {
          that.$router.push({
            path: '/assets'
          })
        } else if (item.name === '贷款管理') {
          that.$router.push({
            path: '/debt_app'
          })
        } else if (item.name === '贷款审核') {
          that.$router.push({
            path: '/credit_app'
          })
        } else if (item.name === '我的客户') {
          // that.$router.push({
          //   path: '/institutionFriend'
          // })
          that.$message('没有权限')
        } else if (item.name === '贷款管理') {
          that.$message.error('没有权限')
        }
      } else if (localStorage.role === 'serviceperson') {
        if (item.name === '我的主页') {
          that.$router.push('/')
        } else if (item.name === '交易管理与增信') {
          that.$router.push({
            path: 'chain_app/chain_main',
            query: {
              type: 0
            }
          })
        } else if (item.name === '平台好友') {
          that.$message.error('没有权限')
        }
      } else if (localStorage.role === 'fund') {
        if (item.name === '我的主页') {
          that.$router.push('/')
        } else if (item.name === '我的债权') {
          that.$router.push({
            path: '/myClaims'
          })
        } else if (item.name === '我的企业') {
          that.$router.push({
            path: '/myEnterprise'
          })
        } else if (item.name === '我的助贷') {
          that.$router.push({
            path: '/myFund'
          })
        } else if (item.name === '平台好友') {
          that.$router.push({
            path: '/friendmanagement'
          })
        } else if (item.name === '贷后风控大厅') {
          that.$router.push({
            path: '/risk'
          })          
        } else if (item.name === '外部征信') {
          that.$router.push({
            path: '/ecoChain/eco_chain'
          })
        }
      }
    }
  },
  mounted () {
    const that = this
    this.itemActive = this.father.selIndex
    // 07-16crb 判断如果是我的账号下的四个li则默认展开
    var listIndex = [10, 11, 12, 13]
    if(listIndex.indexOf(this.father.selIndex) !== -1){
      this.isShowChild = true
    }
    that.businessId = localStorage.id
    if (that.businessId) {
      that.$ajax.get(`/api/company/` + that.businessId).then(res => {
        if (res.data.detail) {
          that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
            this.statusIcon = 'static/img/authentication/status.png'
            this.userInfo = {
              // last_motify: res.data.last_login_time,
              name: res.data.name,
              // header: 'http://10.1.1.100:8000/' + res.data.avatar
              header: that.$root_url() + res.data.avatar,
              unread_message: Number(res.data.unread_message),
              // tw_src : res.data.twcx_verified_status ? 'static/img/authentication/tw-2.png' : 'static/img/authentication/tw-1.png',
              // cfca_src : res.data.cfca_verified_status ? 'static/img/authentication/CFCA-2.png' : 'static/img/authentication/CFCA-1.png',
              // twcx_verified_status : res.data.twcx_verified_status,
              // cfca_verified_status : res.data.cfca_verified_status
            }
            if (localStorage.role === 'business' || localStorage.role === 'person') {
              this.navList_2 = this.navCompany
            } else if (localStorage.role === 'institution' || localStorage.role === 'institutionperson') {
              this.navList_2 = this.navBank
            } else if (localStorage.role === 'serviceprovider' || localStorage.role === 'serviceperson') {
              this.navList_2 = this.navProvider
            } else if (localStorage.role === 'fund') {
              this.navList_2 = this.navFund
            }
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }
  },
  watch: {
    'father.selIndex': function (newer, older) {
      this.itemActive = newer
    }
  }
}
</script>

<style scoped lang="less">
.c_slide_container {
  width: 260px;
  height: 100%;
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all .4s;
  // &:hover{
  //   transition: all 0.4s ease;
  //   -webkit-transition: all 0.4s ease;
  //   -o-transition: all 0.4s ease;
  //   -moz-transition: all .4s;
  //   width: 220px;
  // }
  &.-shrink {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    width: 80px;
  }
}
.c_slide_container:after {
  content: '';
  display: block;
  height: 100%;
}
.slide_nav {
  position: fixed;
  left: 0;
  z-index: 99;
  height: 100%;
  background: #fff;
  box-shadow: 2px 2px 4px #ddd;
  width: 260px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all .4s;
  &.-shrink {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    width: 80px;
    .cloumn_nav {
      li {
        img {
          margin-right: 30px;
          margin-left: 0;
          transition: margin .4s ease
        }
      } 
    }
  }
  .sidebar-logo {
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      border: 3px solid #fff;
      height: 64px;
      right: 0;
    }
    &>a {
      position: absolute;
      width: 150px;
      height: 50px;
      left: 50%;
      top: 50%; // 针对ie 
      transform: translate(-50%, -50%);
      transition: transform 0.4s ease;
      &.-shrink {
        transform: translate(-16%, -50%);
        transition: transform 0.4s ease;
      }
    }
  }
  .cloumn_nav {
    width: calc(100% + 40px);
    overflow-x: hidden;
    padding-left: 20px;
    height: calc(100% - 55px);
    li {
      width: 100%;
      height: 58px;
      padding-left: 40px;
      line-height: 58px;
      cursor: pointer;
      font-size: 14px;
      position: relative;
      left: -30px;
      &>div{
        display: inline-block;
      }
      img {
        width: 22px;
        height: 18px;
        vertical-align: middle;
        margin-right: 15px;
        margin-left: 20px;
        transition: margin 0.4s ease;
      }
    }
    li:hover {
      color: #eb6100;
    }
    .selStyle {
      background: #eb6100;
      color: #fff;
    }
    .selStyle:hover {
      background: #eb6100;
      color: #fff;
    }
  }
  .cloumn_nav::-webkit-scrollbar, .cloumn_nav::-moz-scrollbar {
    display: none;
  }
  .sidbar-handle {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 260px;
    cursor: pointer;
    text-align: center;
    background:rgba(250,250,250,1);
    box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.2);
    padding: 18px 0;
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    &.-shrink {
      width: 80px;
      transition: all 0.4s ease;
      -webkit-transition: all 0.4s ease;
      -o-transition: all 0.4s ease;
      -moz-transition: all .4s;
    }
    &>img {
      width: 20px;
    }
  }
}
</style>
