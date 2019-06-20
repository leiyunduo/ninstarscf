<template>
  <div class="list-wraper">
    <div class="list">
      <div class="list-title">
        <h4>本账号信息</h4>
      </div>
      <div class="account-info">
        <div class="-inline">
          <label>登录手机号</label>
          <div>
            <input disabled v-model="account.phone" class="-disable" type="text">
          </div>
        </div>
        <div class="-inline">
          <label>登录邮箱</label>
          <div>
            <input disabled v-model="account.email" class="-disable" type="text">
          </div>
        </div>
      </div>
      <div class="account-list">
        <h4>子账号信息</h4>
        <div class="btn btn_handler" :class="limit ? 'disabled' : ''" @click="addAccount"><span>添加</span></div>
        <div class="member-table">
          <div class="member-table__line -header">
            <div class="-column -column-20" :style="(index === 0 || index === 4) ? 'text-align: center' : ''"  v-for="(item, index) in members" :key="index">{{item}}</div>
          </div>
          <div class="member-table__line -body" v-if="tableData.length">
            <div class="-row" v-for="(item, index) in tableData" :key="index">
              <div class="-column -column-20 align_center">{{index+1}}</div>
              <div class="-column -column-20">{{item.phone}}</div>
              <div class="-column -column-20">{{item.person.name}}</div>
              <div class="-column -column-20">{{item.id_number || '未上传'}}</div>
              <div class="-column -column-20 align_center"><span class="text-handler" :class="convertColor(item.verify_status)">{{item.verify_status | convertStatus}}</span><span v-show="item.verify_status !== '4'" @click="toDetail(item)" class="text-handler text-orange link">查看</span></div>
            </div>
          </div>
          <span v-else class="content-null">暂无内容</span>
        </div>
        <div class="_block">
          <el-pagination v-if="total" @current-change="handleSizeChange"
            :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        account: {},
        members: ['序号', '登录账号', '姓名', '证件号', '操作'],
        tableData: [],
        currPage: 1,
        total: 0,
        pageSize: 5,
        limit: false,
        phone: '',
        personId: ''
      }
    },
    mounted () { 
      this.getAccountInfo()
      this.getAccountList()
      this.$scrollToTop()
    },
    methods: {
      toDetail (item) {
        let params = {}
        if (item.verify_status === '1') { // 未填写
          params.loginNum = item.phone
          params.personId = item.uid
          params.verifyStatus = false
          this.$emit('view', params)
        } else if (item.verify_status === '2' || item.verify_status === '3') { //审核中、未通过
          this.$ajax.get(`/api/sub_account/` + item.uid).then(res => {
            params.loginNum = item.phone
            params.personId = item.uid
            params.name = res.data.person.name
            params.id_number = res.data.person.id_number
            params.auth_pic = res.data.person.auth_pic
            params.verify_status = item.verify_status
            params.verifyStatus = true
            this.$emit('view', params)
          }).catch(err => {
            this.$message.error(err.response.data.err_msg)
          })
        }
      },
      addAccount () {
        this.$emit('addAccount', {loginNum: this.phone, personId: this.personId})
      },
      getAccountList () {
        this.$ajax.get('/api/sub_account/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          this.tableData = res.data.results
          this.total = res.data.count
          this.phone = res.data.results[0].phone
          this.personId = res.data.results[0].uid
          if (res.data.count === 5) {
            this.limit = true
          }
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      getAccountInfo () {
        this.$ajax.get('/api/auth/login_name/').then(res => {
          this.account = res.data
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      handleSizeChange (page) {
        this.currPage = page
        this.getAccountList()
      },
      convertColor (flag) {
        let _flag = Number(flag)
        let _result = ''
        if (_flag === 1) {
          _result = 'text-grey'
        } else if (_flag === 2) {
          _result = 'text-orange'
        } else if (_flag === 3) {
          _result = 'text-red'
        } else if (_flag === 4) {
          _result = 'text-green'
        }
        return _result
      }
    },
    filters: {
      convertStatus (flag) {
        let _flag = Number(flag)
        let _result = ''
        if (_flag === 1) {
          _result = '未上传'
        } else if (_flag === 2) {
          _result = '审核中'
        } else if (_flag === 3) {
          _result = '未通过'
        } else if (_flag === 4) {
          _result = '已通过'
        }
        return _result
      }
    }
  }
</script>
<style lang='less' scope>
  .list-wraper {
    .list {
      .list-title {
        margin-top: 30px;
        h4 {
          color: #666;
        }
      }
      .account-info {
        margin-top: 20px;
        .-inline {
          margin: 10px 0;
          &>label {
            font-size: 14px;
            color: #666;
          }
          &>div {
            margin-top: 10px; 
            input {
              width: 240px;
              line-height: 26px;
              color: #999;
              background:rgba(255,255,255,1);
              border:1px solid rgba(220,220,220,1);
              border-radius:4px;
              font-size: 14px;
              outline: none;
              padding-left: 5px;
              &.-disable {
                background: #f9f9f9
              }
            }
          }
        }
      }
      .account-list {
        &>h4 {
          margin-top: 20px;
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
            background: linear-gradient(90deg,rgba(235,97,0,1) 0%,rgba(239,129,51,1) 100%);
            box-shadow: 0px 2px 4px 0px rgba(235,97,0,0.4);
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
            &.disabled {
              background: #f9f9f9;
              color: #999;
              border: 1px solid #e8e8e8;
              box-shadow: none;
              pointer-events: none
            }
          }
        }
        .member-table {
          &>.content-null {
            display: block;
            width: 90px;
            margin: 90px auto 0;
            color: #666;
            font-size: 14px;
            position: relative;
            &::before {
              content: '';
              position: absolute;
              background: url('../../../../../static/img/users/null.png');
              width: 64px;
              height: 41px;
              margin-top: -45px;
              margin-left: -4px;
            }
          }
          .member-table__line {
            display: flex;
            height: 44px;
            background:rgba(250,250,250,1);
            color: #333;
            font-size: 14px;
            text-align: left;
            &>.-column {
              line-height: 44px;
              &.align_center {
                text-align: center;
              }
            }
            &>.-column-10 {
              max-width: 10%;
              flex: 0 0 10%;
            }
            &>.-column-20 {
              max-width: 20%;
              flex: 0 0 20%;
            }
            &.-body {
              background: #fff;
              display: block;
              height: auto;
              &>.-row {
                display: flex;
                height: 44px;
                color: #666;
                font-size: 14px;
                align-items: center;
                border-bottom: 1px solid #e8e8e8;
                // &:last-of-type {
                //   border-bottom: none
                // }
                &.disable {
                  background: #f7f7f7
                }
                &>.-column {
                  line-height: 44px;
                  &.align_center {
                    text-align: center
                  }
                  &.text-orange {
                    color: #eb6100;
                    cursor: pointer;
                    &:hover {
                      .ns-tab-hover(#eb6100, txt)
                    }
                  }
                  &>.text-handler {
                    margin: 0 10px;
                    &.link {
                      text-decoration: underline
                    }
                    &.text-green {
                      color: #66ce33;
                      cursor: pointer;
                      &:hover {
                        .ns-tab-hover(#66ce33, txt)
                      }
                    }
                    &.text-orange {
                      color: #eb6100;
                      cursor: pointer;
                      &:hover {
                        .ns-tab-hover(#eb6100, txt)
                      }
                    }
                    &.text-red {
                      color: #FD0A00;
                      cursor: pointer;
                      &:hover {
                        .ns-tab-hover(#FD0A00, txt)
                      }
                    }
                    &.text-grey {
                      color: #666;
                      cursor: pointer;
                      &:hover {
                        .ns-tab-hover(#666, txt)
                      }
                    }
                  }
                }
                &>.-column-10 {
                  max-width: 10%;
                  flex: 0 0 10%;
                  .ns-truncate
                }
                &>.-column-20 {
                  max-width: 20%;
                  flex: 0 0 20%;
                  .ns-truncate
                }
              }
            }
          }
        }
        ._block {
          text-align: center;
          margin-top: 50px
        }
      }
    }
  }
</style>