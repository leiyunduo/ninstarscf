<!-- 商友分类 -->
<template>
  <div class="friends_classify">
    <!-- <AppNav :father='father' type='1'></AppNav> -->
    <div class="from">
      <!-- <div class="form_title"><span>商友管理——商友分类</span></div> -->
      <div class="classify_info">
        <div class="add_classify">
          <span>分组名称</span>
          <input type="text" name="classifyName" v-model="classifyName" placeholder="请输入分组名称 " @keyup.enter="addClassify()">
          <div class="btn add_btn" @click="addClassify()">添加</div>
          <div class="btn add_btn" @click="comeBack">返回</div>
        </div>
        <table border="1">
          <tr>
            <th>序号</th>
            <th>分组名称</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item, index) in classifyData" :key="item.id">
            <td>{{index + 1}}</td>
            <td><span>{{item.group_name}}</span></td>
            <td>
              <span class="operate_btn" @click="revise(index, item)">修改</span>
              <span class="operate_btn delete" @click="del($event, item)">删除</span>
            </td>
          </tr>
        </table>
        <div class="data_empty" v-show="classifyData.length === 0">
          <span>暂无分组</span>
        </div>
        <el-dialog title="分组" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <input type="text" class="revise_Name" v-model="group_name">
          <div class="dialog-footer">
            <div class="sel" @click="groupBlur(0)">确 定</div>
            <div class="reset_Form" @click="dialogVisible = false">取 消</div>
          </div>
        </el-dialog>
        <el-dialog title="提示" align='left' :visible.sync="deleteVisible" width="30%" :before-close="handleClose">
          <span>确定删除此分组？</span>
          <div class="dialog-footer">
            <div class="sel" @click="groupBlur(1)">确 定</div>
            <div class="reset_Form" @click="deleteVisible = false">取 消</div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
// import AppNav from '../financing/financingManege'
import { throws } from 'assert';
export default {
  name: 'friends_classify',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      father: {
        selIndex: 4
      },
      classifyName: '',
      classifyData: [],
      editIndex: '',
      dialogVisible: false,
      group_id: '',
      group_name: '',
      deleteVisible: false
    }
  },
  methods: {
    // 取消
    handleClose () {
      var that = this
      that.deleteVisible = false
      that.dialogVisible = false
    },
    // 返回
    comeBack () {
      this.$router.push('/friendmanagement')
    },
    // 去重
    unRepeat: function (cName, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].group_name === cName) {
          return true
        }
      }
      return false
    },
    // 添加分组
    addClassify: function () {
      var that = this
      // 去除所有空格:
      var cName = that.classifyName.replace(/\s*/g, '')
      if (!cName) {
        this.$message({
          message: '内容不能为空',
          type: 'warning'
        })
        return false
      }
      var ifIn = that.unRepeat(cName, that.classifyData)
      if (ifIn) {
        this.$message({
          message: '不能重复再添加分组类型',
          type: 'warning'
        })
      } else {
        that.$ajax.post('/api/friend/group/', {group_name: cName}).then((res) => {
          that.$ajax.get('/api/friend/group/').then(res => {
            that.classifyData = res.data.results
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 修改保存
    revise: function ($event, item) {
      console.log($event)
      var that = this
      that.dialogVisible = true
      that.group_id = item.id
      that.group_name = item.group_name
    },
    // 修改分组名称
    groupBlur (i) {
      var that = this
      // 修改
      if (i === 0) {
        that.$ajax.patch(`/api/friend/group/` + that.group_id + '/', {group_name: that.group_name}).then(res => {
          that.$message.success('修改成功')
          that.dialogVisible = false
          that.$ajax.get('/api/friend/group/').then(res => {
            that.classifyData = res.data.results
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (i === 1) {
        // 删除
        that.$ajax.delete(`/api/friend/group/` + that.group_id + '/').then(res => {
          that.$message.success('删除成功')
          that.deleteVisible = false
          that.$ajax.get('/api/friend/group/').then(res => {
            that.classifyData = res.data.results
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 删除
    del: function ($event, item) {
      var that = this
      that.deleteVisible = true
      that.group_id = item.id
    }
  },
  mounted () {
    var that = this
    if (localStorage.role === 'serviceprovider') {
      that.father.selIndex = 1
    } else if (localStorage.role === 'fund') {
      that.father.selIndex = 3
    } else if (localStorage.role === 'institution') {
      that.father.selIndex = 6
    } else {
      that.father.selIndex = 4
    }
    // that.$ajax.post('/api/get_groups/', {token: that.$token()}).then((res) => {
    //   // console.log(res)
    //   if (res.data.code === '1') {
    //     for (var i in res.data.data) {
    //       res.data.data[i].isEdit = 1
    //       res.data.data[i].isDel = 0
    //     }
    //     that.classifyData = res.data.data
    //   }
    // })
    that.$ajax.get('/api/friend/group/').then(res => {
      that.classifyData = res.data.results
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  }
}
</script>
<style scoped lang="less">
.friends_classify{
  width:100%;
  min-height: 100%;
  //padding-top: 70px;
  background: #f5f7f8;
  display: flex;
  .from{
    // width: 1200px;
    font-size: 14px;
    margin: 0 auto;
    // .form_title{
    //   height: 30px;
    //   line-height: 30px;
    //   border-left: 2px solid #f4ac45;
    //   span{
    //     margin-left: 20px;
    //   }
    // }
    .classify_info{
      width:660px;
      margin: 70px auto 90px;
      text-align: center;
      .add_classify{
        font-size:14px;
        input{
          width: 235px;
          height: 32px;
          border: 1px solid #dcdcdc;
          margin-left: 15px;
          padding: 0px 15px;
          border-radius:5px
        }
        .add_btn, .back_btn{
          display:inline-block;
          width: 80px;
          height: 32px;
          background-color: #eb6100;
          border-radius: 3px;
          text-align: center;
          line-height: 32px;
          color: #ffffff;
          margin-left: 15px;
          cursor: pointer;
        }
      }
      .disable {
        border: none;
        background: none;
        outline: none;
      }
      .data_empty {
        background: #fff;
        text-align:  center;
        border-top: 1px dashed #eaeaea;
        color: #999;
        width: 100%;
        line-height: 50px;
      }
      .revise_Name {
        width: 320px;
        height: 32px;
        border: 1px solid #eaeaea;
        border-radius: 4px;
        outline: none;
        padding: 0 15px;
      }
      .dialog-footer {
        margin-top: 70px;
        height: 50px;
        .reset_Form {
          width: 90px;
          height: 30px;
          cursor: pointer;
          background: none;
          border: 1px solid #eb6100;
          color: #eb6100;
          border-radius: 3px;
          outline: none;
          line-height: 30px;
        }
        div {
          margin: 0 15px;
          float: right;
          text-align: center;
        }
        .sel {
          color: #fff;
          background: #eb6100;
          width: 90px;
          height: 30px;
          cursor: pointer;
          line-height: 30px;
          border: none;
          outline: none;
          padding: 0 10px;
          border-radius: 3px;
        }
      }
      table{
        width:100%;
        margin-top:50px;
        color:#333;
        tr{
          border-bottom: 1px solid #eaeaea;
          width:100%;
          th{
            height: 42px;
            line-height:42px;
            background-color: #fff;
          }
          td{
            height: 42px;
            line-height:42px;
            .operate_btn{
              color: #eb6100;
              padding: 10px;
              cursor: pointer;
            }
            input{
              text-align:center;
              height:24px;
              outline: none
            }
          }
          td:nth-child(1){
            width:20%;
          }
          td:nth-child(2){
            width:40%;
            span {
              display: block;
              border: 1px solid transparent;
              width: 157px;
              height: 26px;
              line-height: 26px;
              margin: 0px auto;
              margin-top: 8px;
            }
          }
          td:nth-child(3){
            width:30%;
          }
        }
        tr {
          background: #fff;
        }
        // tr:nth-child(even){
        //   background-color: #ffffff;
        // }
        // tr:nth-child(odd){
        //   background-color: #eee;
        // }
      }
    }
  }
}
</style>
