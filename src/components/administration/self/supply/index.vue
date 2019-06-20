<template>
  <div class="suply-wraper">
    <div class="suply">
      <div class="side-bar-wraper">
        <div class="side-bar-menu">
          <div class="side-bar-menu__item" @click="changeTab(index)" :class="tabIndex === index ? 'tab-actived' : ''" v-for="(item, index) in sideBar" :key="index">{{item}}</div>
          <div class="side-bar-ink tab-ink-animated" :class="tabInk"></div>
        </div>
      </div>
      <div class="side-box-wraper">
        <div class="side-box">
          <div class="side-header-wraper">
            <div class="side-header">
              <div class="bar-title"><span>{{sideBar[tabIndex]}}</span></div>
              <div class="bar-handler">
                <div @click="handles" class="btn btn-handler">发布</div>
              </div>
            </div>
          </div>
          <div class="side-container-wraper">
            <div class="side-container">
              <div class="supply-card-wraper" v-if="procurementInfoData.length">
                <div class="supply-card" v-for="(item, index) in procurementInfoData" :key="index">
                  <div class="supply-card__header">
                    <div class="card-icon" v-if="avatar !== '/static/default_avatar.png'">
                      <img :src="$root_url() + avatar" alt="">
                    </div>
                    <div class="card-icon" v-else>
                      <img :src="default_avatar" alt="">
                    </div>
                    <div class="card-title">
                      <h4>{{item.title}}</h4>
                    </div>
                    <div class="card-handler"  @mouseenter="showIndex = index" @mouseleave="showIndex = -1">
                      <p>
                        <img src="../../../../../static/img/users/handler_1x.png" alt="">
                      </p>
                      <div class="drop-menu-wraper">
                        <ul class="drop-menu" :class="showIndex === index ? 'fade-in-active' : ''">
                          <li class="drop-menu__item">
                            <span @click="remove($event, item)">删除</span>
                          </li>
                          <li class="drop-menu__item">
                            <span @click="edit($event, item)">编辑</span>
                          </li>
                          <li class="drop-menu__item">
                            <span @click="vanishing($event, item)">{{item.is_release ? '下架' : '上架'}}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="supply-card__body" @click="toDetail($event, item)">
                    <div class="supply-form">
                      <div class="supply-form__row">
                        <label for="">商品名称:</label>
                        <div class="supply-form__row-content">
                          <span>{{item.product_list[0].product_name}}</span>
                        </div>
                      </div>
                      <div class="supply-form__row">
                        <label for="">{{titles}}数量:</label>
                        <div class="supply-form__row-content">
                          <span>{{item.product_list[0].product_quantity}}</span>
                        </div>
                      </div>
                      <div class="supply-form__row">
                        <label for="">{{titles}}时间:</label>
                        <div class="supply-form__row-content">
                          <span>{{item.create_time}}</span>
                        </div>
                      </div>
                      <div class="supply-form__row">
                        <label for="">{{titles}}地区:</label>
                        <div class="supply-form__row-content">
                          <span>{{item.detail.province}}{{item.detail.city}}{{item.detail.region}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="supply-card__footer" :class="item.is_release ? 'card-exhibition' : 'card-vanishing'"></div>
                </div>
              </div>
              <div class="supply-card-wraper" v-else>
                <span class="content-null">暂无内容</span>
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <el-pagination v-if="total" @current-change="handleSizeChange"
            :current-page="currPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="添加信息" width="60%" :visible.sync="dialogInstall" :before-close="handleClose">
      <editor ref="editor" :isEdit="isEdit" @closeView="closeView" :ulID = "tabIndex" :nameTitle="titles" v-if="dialogInstall"/>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleNews" title="提示" width="25%" align='left' :before-close="handleClose">
      <div class="procurementInfo_box_list2">
        <h3>确定删除么？</h3>
        <div>
          <button class="cancel" @click="newCancel">取消</button>
          <button class="prese" @click="newPreservation">确定</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleNew" title="提示" width="25%" align='left' :before-close="handleClose">
      <div class="procurementInfo_box_list2">
        <h3 v-if="isRelease === true">确定下架么？</h3>
        <h3 v-if="isRelease === false">确定上架么？</h3>
        <div>
          <button class="cancel" @click="newCancel">取消</button>
          <button class="prese" @click="onTheShelfs">确定</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleView" title="详情" width="60%" align='left' :before-close="handleClose">
      <detail v-if="dialogVisibleView" :billId="billId" :billType="billType"/>
    </el-dialog>
  </div>
</template>

<script>
  import editor from './editor'
  import {mapState} from 'vuex'
  import detail from '@/components/administration/enterpriseInfo/enterpriseDetail'
  export default {
    name: '',
    components: {editor, detail},
    data () {
      return {
        sideBar: ['采购信息', '供应信息'],
        default_avatar: 'static/img/users/self_avatar.png',
        tabIndex: 0,
        showIndex: -1,
        dialogInstall: false,
        titles: '采购', //默认
        procurementInfoData: [],
        currPage: 1,
        total: 0,
        page_size: 6,
        dialogVisibleNew: false,
        dialogVisibleNews: false,
        dialogVisibleView: false,
        isRelease: false,
        current_id: '',
        isEdit: {},
        tabInk: '',
        billId: '',
        billType: ''
      }
    },
    computed: {
      ...mapState({
        avatar: status => status.homePage.avatar
      })
    },
    mounted () { 
      this.getAllList(0)
    },
    methods: {
      toDetail (e, item) {
        e.stopPropagation()
        this.billId = item.id
        this.billType = item.bill_type
        this.dialogVisibleView = true
      },
      handles () {
        this.dialogInstall = true
        this.isEdit = {
          status: false,
          id: ''
        }
      },
      changeTab (index) {
        this.tabIndex = index
        this.titles = index === 0 ? '采购' : '供应'
        if (index === 0) {
          this.tabInk = 'tab-ink-active-first'
        } else if (index === 1) {
          this.tabInk = 'tab-ink-active-second'
        }
        this.getAllList(index)
      },
      remove (e, item) {
        e.stopPropagation()
        this.dialogVisibleNews = true
        this.current_id = item.id
      },
      edit (e, item) {
        e.stopPropagation()
        this.isEdit = {
          status: true,
          id: item.id
        }
        this.dialogInstall = true
      },
      vanishing (e, item) {
        e.stopPropagation()
        this.isRelease = item.is_release
        this.current_id = item.id
        this.dialogVisibleNew = true
      },
      newCancel () {
        this.dialogVisibleNew = false
        this.dialogVisibleNews = false
      },
      onTheShelfs () {
        var that = this
        var is_release =  that.isRelease === true ? false : true
        that.$ajax.patch(`/api/home_page/supply_demand/` + that.current_id + '/', {is_release: is_release}).then(res => {
          that.dialogVisibleNew = false
          this.getAllList(this.tabIndex)
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      },
      newPreservation () {
        var that = this
        that.$ajax.delete(`/api/home_page/supply_demand/` + that.current_id + '/').then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.dialogVisibleNews = false
          this.procurementInfoData = this.procurementInfoData.filter(item => item.id !== that.current_id)
          this.total -= 1
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      },
      handleClose () {
        this.dialogInstall = false
        this.dialogVisibleNew = false
        this.dialogVisibleNews = false
        this.dialogVisibleView = false
      },
      handleSizeChange (val) {
        var that = this
        this.currPage = val
        that.$ajax.get('/api/home_page/supply_demand/' + '?bill_type=' + that.tabIndex + '&page=' + that.currPage + '&page_size=' + that.page_size).then(res => {
          that.procurementInfoData = res.data.results
          that.total = res.data.count
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      },
      closeView (e) {
        this.dialogInstall = false
        this.getAllList(this.tabIndex)
      },
      getAllList (tabIndex) {
        this.$ajax.get('/api/home_page/supply_demand/' + '?page=' + this.currPage + '&bill_type=' + (tabIndex+1) + '&page_size=' + this.page_size).then(res => {
          this.procurementInfoData = res.data.results
          this.total = res.data.count
          }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      }
    }
  }
</script>
<style lang='less' scope>
  .suply-wraper {
    padding: 20px 20px 0 0;
    .suply {
      display: flex;
      .side-bar-wraper {
        width: 120px;
        border-right: 1px solid #e8e8e8;
        min-height: 720px;
        position: relative;
        .side-bar-menu {
          text-align: center;
          color: #666;
          font-size: 14px;
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
        padding-bottom: 60px;
        position: relative;
        .block {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
        }
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
                }
              }
            }
          }
          .side-container-wraper {
            padding: 20px 20px 20px 40px;
            .side-container {
              .supply-card-wraper {
                padding-left: 20px;
                .content-null {
                  display: block;
                  width: 70px; 
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
                    top: -45px;
                    left: -4px;
                  }
                }
                &::after {
                  content: "";
                  display: table;
                  clear: both;
                }
                .supply-card {
                  width: 350px;
                  float: left;
                  background:rgba(255, 255, 255, 1);
                  border: 1px solid #e8e8e8;
                  border-radius: 2px;
                  margin: 20px;
                  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                  cursor: pointer;
                  &:hover {
                    box-shadow: 0px 0px 12px 0px rgba(26, 11, 6, 0.2);
                    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                  }
                  .supply-card__header {
                    padding: 8px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(250,250,250, 1);
                    border-bottom: 1px solid #e8e8e8;
                    .card-icon {
                      text-align: center;
                      img {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        margin-top: 3px;
                      }
                    }
                    .card-title {
                      font-size: 14px;
                      color: #666;
                      flex: 1;
                      padding-left: 12px;
                      h4 {
                        max-width: 200px;
                        .ns-truncate()
                      }
                    }
                    .card-handler {
                      position: relative;
                      cursor: pointer;
                      &>.drop-menu-wraper {
                        .drop-menu {
                          min-width: 85px;
                          position: absolute;
                          top: 100%;
                          right: -10px;
                          z-index: 10;
                          padding: 10px 0 5px;
                          margin: 5px 0;
                          margin-top: 5px;
                          background-color: #fff;
                          border: 1px solid #ebeef5;
                          border-radius: 4px;
                          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                          max-height: 400px;
                          overflow: auto;
                          opacity: 0;
                          transform: scaleY(0);
                          transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
                          transform-origin: center top;
                          &.fade-in-active {
                            opacity: 1;
                            transform: scaleY(1);
                            transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
                            transform-origin: center top;
                          }
                          &.fade-out-active {
                            opacity: 0;
                            transform: scaleY(0);
                          }
                          .drop-menu__item {
                            line-height: 36px;
                            padding: 0 20px;
                            margin: 0;
                            font-size: 14px;
                            color: #606266;
                            cursor: pointer;
                            outline: none;
                            align-items: center;
                            display: flex;
                            justify-content: center;
                            &:hover {
                              background-color: #ecf5ff;
                              color: #66b1ff;
                            }
                            &:last-of-type {
                              border-top: 1px solid #ebeef5;
                            }
                          }
                        }
                      }
                    }
                  }
                  .supply-card__body {
                    padding: 15px 20px;
                    .supply-form {
                      .supply-form__row {
                        display: flex;
                        margin-bottom: 11px;
                        font-size: 14px;
                        color: #666666;
                        label {
                          margin-right: 10px;
                        }
                        .supply-form__row-content {
                          color: #666666
                        }
                      }
                    }
                  }
                  .supply-card__footer {
                    position: relative;
                    &.card-exhibition {
                      &::before {
                        content: "";
                        position: absolute;
                        width: 50px;
                        height: 41.25px;
                        bottom: 30px;
                        background: url('../../../../../static/img/users/exhibition_2x.png');
                        right: 30px;
                        background-size: cover;
                      }
                    }
                    &.card-vanishing {
                      &::before {
                        content: "";
                        position: absolute;
                        width: 50px;
                        height: 41.25px;
                        bottom: 30px;
                        background: url('../../../../../static/img/users/vanishing_2x.png');
                        right: 30px;
                        background-size: cover;
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
    .procurementInfo_box_list2 {
      div {
        text-align: right;
      }
      h3 {
        font-size: 16px;
        text-align: left;
      }
      .block {
        text-align: left;
        span {
          display: inline-block;
          margin: 20px;
          img {
            width: 130px;
            height: 115px;
          }
        }
      }
      button {
        width: 90px;
        height: 30px;
        line-height: 30px;
        outline: none;
        margin: 10px 10px;
        border-radius: 5px;
      }
      .prese {
        background: #eb6100;
        border: none;
        color: #fff;
      }
      .cancel {
        border: 1px solid #eb6100;
        background: none;
        color: #eb6100;
      }
    }
  }
</style>