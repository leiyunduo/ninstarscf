<template>
  <div class='serviceDemand'>
    <!-- <AppNav :father='{selIndex: 10}' type='1'></AppNav> -->
    <div class='info-enter'>
      <div class="forms">
        <EnterpriseInfo :adminColor="{colorIndex: 'serviceDemand'}"></EnterpriseInfo>
        <div class="forms_list">
          <div class="left">
            <div class="ul_list">
              <ul>
                <li :class="{active: ulID === 0}">
                  <button @click="ulList">服务信息</button>
                </li>
              </ul>
            </div>
            <div class="content" v-if="showInfo">
              <div class="top_div">
                <p>标题：</p>
                <input type="text" v-model="cuteInfo.title">
              </div>
              <div class="cont_div">
                <ul>
                  <li>
                    <p>服务量：</p>
                    <input type="text" v-model="cuteInfo.amount">
                  </li>
                  <li>
                    <p>目标价格：</p>
                    <input type="text" v-model="cuteInfo.target_price">
                  </li>
                </ul>
                <ul>
                  <li>
                    <p>规&nbsp;&nbsp;&nbsp;&nbsp;格：</p>
                    <input type="text" v-model="cuteInfo.spec">
                  </li>
                  <li>
                    <p>截止日期：</p>
                    <el-date-picker size="small" v-model="cuteInfo.expiry_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
                  </li>
                </ul>
              </div>
              <div class="butt_div">
                <span>详情：</span>
                <textarea name="" id="" v-model="cuteInfo.contents"></textarea>
              </div>
              <div class="button_list">
                <button class="install" @click="add">添加</button>
                <button class="uninstall" @click="unadd">取消</button>
              </div>
            </div>
            <div class="content" v-for="(item, index) in procurementInfoData" :key="index">
              <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item :title="item.title" :name="index">
                  <div class="top_div">
                    <p>标题：</p>
                    <input type="text" v-model="cuteInfo.title" v-if="butName === '保存'">
                    <h3 v-if="butName === '编辑'">{{item.title}}</h3>
                    <div class="a_style">
                      <a href="#" @click="deletes(item, index)">删除</a>
                    </div>
                  </div>
                  <div>
                    <div class="cont_div">
                      <ul>
                        <li>
                          <p>服务量：</p>
                          <input type="text" v-if="butName === '保存'" v-model="cuteInfo.amount">
                          <span v-if="butName === '编辑'">{{item.amount}}</span>
                        </li>
                        <li>
                          <p>目标价格：</p>
                          <input type="text" v-if="butName === '保存'" v-model="cuteInfo.target_price">
                          <span v-if="butName === '编辑'">{{item.target_price}}</span>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <p>规&nbsp;&nbsp;&nbsp;&nbsp;格：</p>
                          <input type="text" v-if="butName === '保存'" v-model="cuteInfo.spec">
                          <span v-if="butName === '编辑'">{{item.spec}}</span>
                        </li>
                        <li>
                          <p>截止日期：</p>
                          <el-date-picker size="small" v-if="butName === '保存'" v-model="cuteInfo.expiry_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
                          <span v-if="butName === '编辑'">{{item.expiry_date}}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="butt_div">
                      <span>详情：</span>
                      <textarea name="" id="" cols="230" rows="10" v-if="butName === '保存'" v-model="cuteInfo.contents"></textarea>
                      <p v-if="butName === '编辑'">{{item.contents}}</p>
                    </div>
                    <div class="button_list">
                      <button class="install" @click="edit(item, index)">{{butName}}</button>
                      <button class="uninstall" v-if="butName === '保存'" @click="unedit">取消</button>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div class="right">
            <div class="left_blog">
              <div class="blog">
                <ul>
                  <li :class="{active: vueID === 0}">
                    <button @click="addInfoList">服务信息发布</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisibleNews" title="提示" width="25%" align='center' :before-close="handleClose">
      <div class="procurementInfo_box_list2">
        <h3>确定删除么？</h3>
        <button class="cancel" @click="newCancel">取消</button>
        <button class="prese" @click="newPreservation">确定</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import AppNav from '../../financing/financingManege'
import EnterpriseInfo from './enterpriseInfo'
export default {
  components: {
    // AppNav,
    EnterpriseInfo
  },
  data () {
    return {
      name: 'serviceDemand',
      buttonContent: '展开',
      procurementInfoData: [],
      butName: '编辑',
      cuteInfo: {
        title: '',
        amount: '',
        target_price: '',
        spec: '',
        expiry_date: '',
        contents: ''
      },
      showInfo: false,
      showList: '',
      dialogVisibleNews: false,
      infoId: '',
      infoName: '',
      types: '',
      activeNames: [],
      nameTitle: '采购量',
      // 发布信息
      titleName: ['采购信息发布', '供应信息发布'],
      ulName: ['采购信息', '供应信息'],
      vueID: -1,
      ulID: 0
    }
  },
  mounted () {
    var that = this
    that.$ajax.get('/api/manage/business/industry_info/?token=' + that.$token() + '&info_type=' + 3).then(res => {
      if (res.data.code === '1') {
        that.procurementInfoData = res.data.data
        if (that.procurementInfoData.length === 0) {
          that.showInfo = true
        }
      }
    })
  },
  methods: {
    ulList () {
      var that = this
      that.ulID = 0
      that.vueID = -1
      that.$ajax.get('/api/manage/business/industry_info/?token=' + that.$token() + '&info_type=' + 3).then(res => {
        if (res.data.code === '1') {
          that.cuteInfo = {}
          that.procurementInfoData = res.data.data
          if (that.procurementInfoData.length === 0) {
            that.showInfo = true
          } else {
            that.showInfo = false
          }
        }
      })
    },
    handleChange (val) {
      // console.log(val)
    },
    // 展开
    open (item, index) {
      var that = this
      that.showList = index
    },
    opens (item, index) {
      var that = this
      that.showList = !index
    },
    // 删除
    deletes (item, index) {
      var that = this
      that.dialogVisibleNews = true
      that.infoId = item.id
    },
    // 删除新闻
    newPreservation () {
      var that = this
      that.$ajax.delete('/api/manage/business/industry_info/?token=' + that.$token() + '&info_id=' + that.infoId).then(res => {
        if (res.data.code === '1') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.dialogVisibleNews = false
          that.$ajax.get('/api/manage/business/industry_info/?token=' + that.$token() + '&info_type=' + 3).then(res => {
            if (res.data.code === '1') {
              that.procurementInfoData = res.data.data
              if (that.procurementInfoData.length === 0) {
                that.showInfo = true
              }
            }
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    newCancel () {
      this.dialogVisibleNews = false
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    },
    // 取消
    handleClose () {
      this.dialogVisibleNews = false
    },
    // 编辑
    edit (item, index) {
      // console.log(item)
      var that = this
      if (that.butName === '编辑') {
        that.butName = '保存'
        that.cuteInfo = item
      } else if (that.butName === '保存') {
        that.$ajax.put('/api/manage/business/industry_info/', {token: that.$token(), info_id: item.id, ...that.cuteInfo}).then(res => {
          if (res.data.code === '1') {
            that.butName = '编辑'
            that.$ajax.get('/api/manage/business/industry_info/?token=' + that.$token() + '&info_type=' + 3).then(res => {
              if (res.data.code === '1') {
                that.procurementInfoData = res.data.data
                if (that.procurementInfoData.length === 0) {
                  that.butName = '保存'
                }
              }
            })
          }
        })
      }
    },
    // 取消
    unedit () {
      var that = this
      that.butName = '编辑'
    },
    // 添加
    add () {
      var that = this
      that.$ajax.post('/api/manage/business/industry_info/', {token: that.$token(), info_type: 3, ...that.cuteInfo}).then(res => {
        if (res.data.code === '1') {
          that.showInfo = false
          that.$ajax.get('/api/manage/business/industry_info/?token=' + that.$token() + '&info_type=' + 3).then(res => {
            if (res.data.code === '1') {
              that.procurementInfoData = res.data.data
            }
          })
        }
      })
    },
    // 取消
    unadd () {
      var that = this
      if (that.procurementInfoData.length === 0) {
        that.showInfo = true
      } else {
        that.showInfo = false
      }
    },
    // 添加按钮
    addInfoList () {
      var that = this
      that.showInfo = true
      that.cuteInfo = {}
      that.vueID = 0
      that.ulID = 0
    }
  }
}
</script>

<style lang='less' scoped>
.serviceDemand {
  width: 100%;
  background: #fafafa;
  display: flex;
  min-height: 100%;
  .info-enter {
    font-size: 14px;
    height: 100%;
    position: relative;
    padding: 0 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    .ins {
      border: none;
      color: #fff;
      background: #eb6100;
      outline: none;
      border-radius: 5px;
      height: 32px;
      width: 100px;
    }
    .forms {
      flex: 1;
    }
    .forms_list {
      width: auto;
      margin: 0 auto;
      height: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 30px;
    }
    .left {
      margin-right: 50px;
      width: auto;
      .ul_list {
        ul {
          height: 52px;
          display: flex;
          flex-direction: row;
          li {
            height: auto;
            padding: 15px 0 15px 15px;
            button {
              height: 32px;
              width: auto;
              padding: 0 10px;
              border-radius: 5px;
              border: 1px solid #eb6100;
              color: #eb6100;
              outline: none;
              background: none;
            }
          }
          .active {
            button {
              background: #eb6100;
              color: #fff;
              border: none;
            }
          }
          li:hover {
            button {
              background: #eb6100;
              color: #fff;
              border: none;
            }
          }
        }
      }
      .content {
        width: 800px;
        background: #fff;
        margin-top: 20px;
        .top_div {
          height: 48px;
          line-height: 48px;
          margin: 0 20px;
          border-bottom: 1px solid #e7ebee;
          p {
            display: inline-block;
            width: 70px;
          }
          h3 {
            display: inline-block;
          }
          input {
            width: 220px;
            border: 1px solid #dcdfe6;
            border-radius: 5px;
            outline: none;
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
          }
          .a_style {
            float: right;
            a {
              display: inline-block;
              color: #eb6100;
              text-decoration: none;
              padding: 0 15px;
            }
          }
        }
        .cont_div {
          margin: 0 10px;
          border-bottom: 1px solid #e7ebee;
          ul {
            display: flex;
            flex-direction: row;
            li {
              flex: 1;
              line-height: 45px;
              p {
                display: inline-block;
                width: 80px;
                text-align: left;
                padding-left: 10px;
              }
              input {
                width: 220px;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
                outline: none;
                height: 32px;
                line-height: 32px;
                padding: 0 10px;
              }
            }
          }
        }
        .butt_div {
          margin: 20px 30px;
          height: auto;
          span {
            display: inline-block;
            padding: 20px 0;
          }
          textarea {
            border: 1px solid #dcdfe6;
            border-radius: 5px;
            outline: none;
            padding: 10px;
            width: 100%;
            height: 200px;
          }
        }
        .button_list {
          margin: 20px;
          padding-bottom: 50px;
          text-align: center;
          button {
            margin: 0 30px;
            width: 80px;
            height: 32px;
            border-radius: 5px;
            outline: none;
          }
          .install {
            background: #eb6100;
            color: #fff;
            border: none;
          }
          .uninstall {
            border: 1px solid #eb6100;
            color: #eb6100;
            background: none;
          }
        }
      }
    }
    .right {
      .left_blog {
        width: auto;
        height: auto;
        .blog {
          float: left;
          ul {
            height: auto;
            text-align: right;
            li {
              height: auto;
              padding: 15px 0 15px 0;
              // margin: 15px 0;
              border-left: 1px solid #e4e7ed;
              p {
                height: 32px;
                display: block;
                width: auto;
                font-family:PingFangSC-Semibold;
                font-size:14px;
                line-height: 32px;
                color:#999999;
                padding-left: 34px;
                cursor: pointer;
              }
            }
            .active {
              p {
                color: #eb6100;
                height: 32px;
                border-left: 3px solid #eb6100;
              }
            }
            li:hover {
              p {
                color: #eb6100;
                height: 32px;
                border-left: 3px solid #eb6100;
              }
            }
          }
        }
      }
    }
  }
}
.procurementInfo_box_list2 {
  h3 {
    font-size: 16px;
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
    margin: 30px 30px;
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
</style>
<style>
.el-collapse-item__header {
  padding: 0 20px !important;
}
</style>
