<template>
  <div class="invite-members">
    <div class="member-table">
      <div class="member-table__line -header">
        <div class="-column" :style="index === 0 ? 'text-align: center' : ''" :class="index === 2 ? '-column-20' : '-column-10'"  v-for="(item, index) in members" :key="index">{{item}}</div>
      </div>
      <div class="member-table__line -body" v-if="tableList.length">
        <div class="-row" v-for="(item, index) in tableList" :key="index">
          <div class="-column -column-10 align_center">{{index+1}}</div>
          <div class="-column -column-10">{{item.code}}</div>
          <div class="-column -column-20">{{item.invitee || '未认证'}}</div>
          <div class="-column -column-10">{{item.account_type | convertRole}}</div>
          <div class="-column -column-10" :class="item.access_status ? 'text-green' : ''">{{item.access_status ? '已认证' : '未认证'}}</div>
          <div class="-column -column-10">{{item.to_phone}}</div>
          <div class="-column -column-10">{{item.reg_account || '未认证'}}</div>
          <div class="-column -column-10">{{item.create_time}}</div>
          <div class="-column -column-10" :class="item.access_status ? '' : 'text-orange'" @click="reminding(item)">{{item.can_remind ? '再次提醒' : '提醒'}}</div>
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
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        tableList: [],
        members: ['序号', '我的邀请码', '我的企业', '注册类型', '认证状态', '邀请方式', '注册账号', '邀请时间', '操作'],
        // 分页
        currPage: 1,
        total: 0,
        pageSize: 10
      }
    },
    mounted () { 
      this.getDataList(1)
    },
    methods: {
      getDataList (page) {
        this.currPage = page
        this.$ajax.get('/api/invite_code/?' + 'page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
          this.tableList = res.data.results
          this.total = res.data.count
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      handleSizeChange (e) {
        this.getDataList(e)
      },
      // 再次提醒
      reminding (item) {
        if (item.access_status) return
        var that = this
        that.$ajax.put(`/api/invite_code/` + item.id + '/').then(res => {
          that.$message.success('发送成功')
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    filters: {
      convertRole (roleId) {
        if (!roleId) return '未认证'
        let roleList = [ '', '企业', '金融机构', '服务机构（企业）', '助保贷']
        return roleList[Number(roleId)]
      }
    }
  }
</script>
<style lang='less' scope>
  .invite-members {
    min-height: 304px;
    ._block {
      text-align: center;
      margin-top: 50px
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
              &.text-green {
                color: #66ce33;
                cursor: pointer;
                &:hover {
                  .ns-tab-hover(#eb6100, txt)
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
  }
</style>