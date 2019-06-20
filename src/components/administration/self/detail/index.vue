<template>
  <div class="detail-wraper">
    <div class="detail-view">
      <div class="side-bar-wraper">
        <div class="side-bar-menu">
          <div class="side-bar-menu__item" @click="changeTab(index)" :class="tabIndex === index ? 'tab-actived' : ''" v-for="(item, index) in sideBarList" :key="index">{{item}}</div>
          <div class="side-bar-ink tab-ink-animated" :class="tabInk"></div>
        </div>
      </div>
      <div class="side-box-wraper">
        <div class="side-box">
          <div class="side-header-wraper">
            <div class="side-header">
              <div class="bar-title"><span>{{sideBar[tabIndex]}}</span></div>
              <div class="bar-handler">
                <div v-show="!isEdit" @click="handles" class="btn btn-handler">{{btnText[tabIndex]}}</div>
                <div class="btn-group" v-show="isEdit">
                  <div class="btn btn-edit" @click="isEdit = false">取消</div>
                  <div class="btn btn-reset" @click="onSave()">保存</div>
                </div>
              </div>
            </div>
          </div>
          <div class="side-container-wraper">
            <div class="side-container">
              <form-base v-show="tabIndex === 0" />
              <finance-report ref="finance" :alive="alive" v-if="tabIndex === 1" />
              <connection ref="connect" @closeEditer="closeEdit" :isEdit="isEdit" v-show="tabIndex === 2"/>
              <self-grade ref="grade" @closeEditer="closeEdit" :isEdit="isEdit" v-if="tabIndex === 3"/>
              <album ref="album" v-show="tabIndex === 4"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import formBase from './form'
  import financeReport from './finance_report'
  import connection from './connection'
  import selfGrade from './self_grade'
  import album from './album'
  export default {
    name: 'detail',
    data () {
      return {
        sideBar: ['工商信息', '财务状况', '联系方式', '自我评级', '企业相册'],
        sideBarForPerson: ['工商信息', '联系方式', '自我评级', '企业相册'],
        tabIndex: 0,
        isEdit: false,
        btnText: ['变更', '添加', '编辑', '编辑', '上传'],
        role: '',
        sideBarList: [],
        alive: true,
        financeReportAdd: false,
        tabInk: '',
        business_id: ''
      }
    },
    components: {
      formBase, financeReport, connection, selfGrade, album
    },
    mounted () { 
      this.role = localStorage.role
      this.business_id = localStorage.id
      this.btnText[0] = this.business_id ? this.btnText[0] : '认证'
      if (this.role === 'person' || this.role === 'institutionperson') {
        this.sideBarList = this.sideBarForPerson
      } else {
        this.sideBarList = this.sideBar
      }
    },
    methods: {
      changeTab (index) {
        if (this.tabIndex !== index) {
          if (this.isEdit) this.isEdit = false
          this.tabIndex = index
        }
        this.alive = (this.tabIndex === 1 && (this.role === 'person' || this.role === 'institutionperson')) ? false :true
        if (index === 0) {
          this.tabInk = 'tab-ink-active-one'
        } else if (index === 1) {
          this.tabInk = 'tab-ink-active-second'
        } else if (index === 2) {
          this.tabInk = 'tab-ink-active-third'
        } else if (index === 3) {
          this.tabInk = 'tab-ink-active-four'
        } else if (index === 4) {
          this.tabInk = 'tab-ink-active-five'
        }
      },
      closeEdit (e) {
        this.isEdit = e
      },
      handles: function () {
        if (this.tabIndex === 0) {
          this.btnText[0] = this.business_id ? this.btnText[0] : '认证'
          if (localStorage.role === 'business') {
            this.$router.push('/setting?signed=1')
          } else if (localStorage.role === 'institution') {
            this.$router.push('/setting?signed=1')
          } else if (localStorage.role === 'serviceprovider') {
            this.$router.push('/setting?signed=1')
          } else if (localStorage.role === 'person') {
            this.$message.error('没有权限')
          } else if (localStorage.role === 'institutionperson') {
            this.$message.error('没有权限')
          } else if (localStorage.role === 'serviceperson') {
            this.$message.error('没有权限')
          } else if (localStorage.role === 'fund') {
            this.$router.push('/setting?signed=1')
          }
        }
        if (this.tabIndex === 1) {
          this.$refs.finance.addNews()
          return
        }
        if (this.tabIndex === 2 || this.tabIndex === 3) {
          this.isEdit = true
          return
        }
        if (this.tabIndex === 4) {
          this.$refs.album.imgUpload()
          return
        }
      },
      onSave () {
        if (this.tabIndex === 2) {
          this.$refs.connect.submit()
        }
        if (this.tabIndex === 3) {
          this.$refs.grade.save()
        }
      }
    }
  }
</script>
<style lang='less' scope>
  .detail-wraper {
    padding: 20px 20px 0 0;
    .detail-view {
      display: flex;
      padding-bottom: 20px;
      .side-bar-wraper {
        width: 120px;
        border-right: 1px solid #e8e8e8;
        .side-bar-menu {
          text-align: center;
          color: #666;
          font-size: 14px;
          position: relative;
          &>.side-bar-ink {
            position: absolute;
            height: 39px;
            width: 2px;
            right: -1px;
            top: 0;
            background: #eb6100;
            &.tab-ink-active-first {
              transform: translate3d(0px, 0px, 0px);
              height: 39px;
            }
            &.tab-ink-active-second {
              transform: translate3d(0px, 49px, 0px);
              height: 39px;
            }
            &.tab-ink-active-third {
              transform: translate3d(0px, 98px, 0px);
              height: 39px;
            }
            &.tab-ink-active-four {
              transform: translate3d(0px, 147px, 0px);
              height: 39px;
            }
            &.tab-ink-active-five {
              transform: translate3d(0px, 196px, 0px);
              height: 39px;
            }
            &.tab-ink-animated {
              transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
          }
          .side-bar-menu__item {
            padding: 10px 12px;
            margin-bottom: 10px;
            -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            cursor: pointer;
            &:active {
              .ns-tab-active(#eb6100, txt);
            }
            &:hover {
              .ns-tab-hover(#eb6100, txt);
            }
            &.tab-actived {
              color: #eb6100;
              background: rgba(235,97,0, .1);
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
          }
        }
      }
      .side-box-wraper {
        width: calc(100% - 120px);
        .side-box {
          .side-header-wraper {
            padding-left: 21px; 
            .side-header {
              padding-bottom: 10px;
              border-bottom: 1px solid #e8e8e8;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .bar-title {
                color: #666;
                font-size: 14px;
                span {
                  font-weight: bolder;
                }
              }
              .bar-handler {
                .btn-group {
                  display: flex
                }
                .btn {
                  width:80px;
                  padding: 5px 20px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
                  text-align: center;
                  user-select: none;
                  &.btn-handler {
                    background:linear-gradient(90deg,rgba(235,97,0,1) 0%,rgba(239,129,51,1) 100%);
                    box-shadow:0px 2px 4px 0px rgba(235,97,0,0.4);
                    color: #fff;
                    &:hover {
                      .ns-tab-hover(#eb6100, bg)
                    }
                    &:active {
                      .ns-tab-active(#eb6100, bg)
                    }
                  }
                  &.btn-edit {
                    background: #fff;
                    color: #666;
                    border:1px solid rgba(220,220,220,1);
                    box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
                    margin-right: 20px;
                    &:hover {
                      .ns-tab-hover(#fff, bg)
                    }
                    &:active {
                      .ns-tab-active(#fff, bg)
                    }
                  }
                  &.btn-reset {
                    background: #0C8DFF;
                    box-shadow: 0px 2px 4px 0px rgba(153,153,153,0.4);
                    color: #fff;
                    float: right;
                    &:hover {
                      .ns-tab-hover(#0C8DFF, bg)
                    }
                    &:active {
                      .ns-tab-active(#0C8DFF, bg)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>