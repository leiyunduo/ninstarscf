<template>
  <div class="mailList">
    <!-- <appNav :father='father' type='1'></appNav> -->
    <div class="forms">
      <div class="title">
        <h3><img src="../../../static/img/leftbar/mykehu.png" alt="">经办人通讯录</h3>
      </div>
      <div class="list">
        <!-- <h3>经办人通讯录</h3> -->
        <button class="add" @click="add">添加</button>
        <button class="delete" @click="deleteList">批量删除</button>
      </div>
      <div class="block" v-if="selectShow">
        <el-table
          ref="multipleTable"
          :data="personDataList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="left"></el-table-column>
          <el-table-column prop="name" label="姓名" align="left"></el-table-column>
          <el-table-column prop="role" label="角色" align="left"></el-table-column>
          <el-table-column prop="company" label="所属公司" align="left"></el-table-column>
          <el-table-column prop="id_number" label="身份证号" align="left"></el-table-column>
          <el-table-column prop="office_number" label="办公室电话" align="left"></el-table-column>
          <el-table-column prop="wechat" label="微信号码" align="left"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="left"></el-table-column>
          <el-table-column prop="QQ" label="QQ" align="left"></el-table-column>
          <!-- <el-table-column prop="business" label="企业ID" align="left"></el-table-column> -->
          <el-table-column prop="phone_num" label="手机号码" align="left"></el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <button @click="update(scope.$index, scope.row)">修改</button>
            </template>
          </el-table-column>
        </el-table>
        <div class="card_page" v-if="total">
          <el-pagination @current-change="handleCurrentChange"
            :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="block_list" v-if="addShow">
        <div class="role_person">
          <ul class="l_person_list">
            <li>
              <p><a href="#">*</a>姓名</p>
              <input type="text" v-model="personData.name" maxlength="32">
            </li>
            <li>
              <p>角色</p>
              <input type="text" v-model="personData.role" maxlength="32">
            </li>
            <li>
              <p>所属公司</p>
              <input type="text" v-model="personData.company" maxlength="64">
            </li>
            <li>
              <p>身份证号</p>
              <input type="text" v-model="personData.id_number" maxlength="18">
            </li>
            <li>
              <p><a href="#">*</a>办公室电话</p>
              <input type="text" v-model="personData.office_number" maxlength="15">
            </li>
          </ul>
          <ul class="l_person_list">
            <li>
              <p>微信号码</p>
              <input type="text" v-model="personData.wechat" maxlength="25">
            </li>
            <li>
              <p><a href="#">*</a>邮箱</p>
              <input type="text" v-model="personData.email" maxlength="64">
            </li>
            <li>
              <p>QQ</p>
              <input type="text" v-model="personData.QQ" maxlength="64">
            </li>
            <!-- <li>
              <p>企业ID</p>
              <input type="text" v-model="personData.business" maxlength="32">
            </li> -->
            <li>
              <p><a href="#">*</a>手机号码</p>
              <input type="text" v-model="personData.phone_num" maxlength="11">
            </li>
          </ul>
        </div>
        <div class="role_person_install">
          <button @click="okPersonSon" v-if="okShow">确定</button>
          <button @click="updatePersonSon" v-show="updateShow">修改</button>
          <button @click="onPersonSon">取消</button>
        </div>
      </div>
      <el-dialog
        title="确定删除？"
        :visible.sync="dialogVisible"
        width="30%"
        top="30vh">
        <span>确定删除经办人</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="deletes">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import AppNav from '../financing/financingManege'
export default {
  name: 'friendmanagement',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      father: {
        selIndex: 5
      },
      dialogVisible: false,
      // 经办人列表
      personDataList: [],
      personData: {
        name: '',
        role: '',
        company: '',
        id_number: '',
        office_number: '',
        wechat: '',
        email: '',
        QQ: '',
        phone_num: ''
      },
      selectShow: true,
      addShow: false,
      buttonName: '确定',
      personDataId: '',
      deleteId: [],
      // 分页
      currPage: 1,
      total: '',
      pageSize: 5,
      okShow: false,
      updateShow: false
    }
  },
  mounted () {
    var that = this
    that.$ajax.get('/api/business_contact_person/?token=' + that.$token() + '&page=' + that.currPage + '&page_size=' + that.pageSize).then(res => {
      if (res.data.code === '1') {
        that.personDataList = res.data.data
        that.total = res.data.total
      }
    })
  },
  methods: {
    // 分页
    handleCurrentChange (val) {
      var that = this
      that.currPage = val
      that.$ajax.get('/api/business_contact_person/?token=' + that.$token() + '&page=' + that.currPage + '&page_size=' + that.pageSize).then(res => {
        if (res.data.code === '1') {
          that.personDataList = res.data.data
          that.total = res.data.total
        }
      })
    },
    // 查看
    selectPerson () {
      var that = this
      that.$ajax.get('/api/business_contact_person/?token=' + that.$token()).then(res => {
        if (res.data.code === '1') {
          that.personDataList = res.data.data
          that.total = res.data.total
        }
      })
    },
    // 添加
    add () {
      var that = this
      that.addShow = true
      that.selectShow = false
      that.okShow = true
      that.updateShow = false
      that.personData = []
    },
    // 经办人确定
    okPersonSon () {
      var that = this
      if (that.personData.name === '') {
        that.$message.error('请输入姓名')
      } else {
        if (that.personData.office_number === '') {
          that.$message.error('请输入办公室电话')
        } else {
          if (that.personData.phone_num === '') {
            that.$message.error('请输入手机号码')
          } else {
            if (!(/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/).test(that.personData.phone_num)) {
              that.$message.error('请输入正确的手机号码')
            } else {
              if (that.personData.email === '') {
                that.$message.error('请输入邮箱')
              } else {
                if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).test(that.personData.email)) {
                  that.$message.error('请输入正确的邮箱地址')
                } else {
                  that.$ajax.post('/api/business_contact_person/', {token: that.$token(), ...that.personData}).then(res => {
                    if (res.data.code === '1') {
                      that.selectPerson()
                      that.addShow = false
                      that.selectShow = true
                      that.okShow = false
                      that.updateShow = false
                    }
                  })
                }
              }
            }
          }
        }
      }
    },
    // 经办人取消
    onPersonSon () {
      var that = this
      that.addShow = false
      that.selectShow = true
      that.personData = []
      that.okShow = false
      that.updateShow = false
    },
    // 修改
    update (index, row) {
      var that = this
      that.addShow = true
      that.selectShow = false
      that.personData = row
      that.buttonName = '修改'
      that.personDataId = row.id
      that.okShow = false
      that.updateShow = true
    },
    // 修改经办人确定
    updatePersonSon () {
      var that = this
      if (that.personData.name === '') {
        that.$message.error('请输入姓名')
      } else {
        if (that.personData.office_number === '') {
          that.$message.error('请输入办公室电话')
        } else {
          if (that.personData.phone_num === '') {
            that.$message.error('请输入手机号码')
          } else {
            if (!(/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/).test(that.personData.phone_num)) {
              that.$message.error('请输入正确的手机号码')
            } else {
              if (that.personData.email === '') {
                that.$message.error('请输入邮箱')
              } else {
                if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).test(that.personData.email)) {
                  that.$message.error('请输入正确的邮箱地址')
                } else {
                  that.$ajax.put('/api/business_contact_person/', {token: that.$token(), ...that.personData, id: that.personDataId}).then(res => {
                    if (res.data.code === '1') {
                      that.selectPerson()
                      that.addShow = false
                      that.selectShow = true
                      that.okShow = false
                      that.updateShow = false
                    }
                  })
                }
              }
            }
          }
        }
      }
    },
    // 删除
    deletes () {
      var that = this
      that.$ajax.delete('/api/business_contact_person/?token=' + that.$token() + '&id=[' + that.deleteId + ']').then(res => {
        if (res.data.code === '1') {
          that.$message.success('删除成功！')
          that.dialogVisible = false
          that.selectPerson()
        }
      })
    },
    deleteList () {
      var that = this
      if (that.deleteId.length !== 0) {
        that.dialogVisible = true
      } else {
        that.$message.error('未选择要删除的经办人')
      }
    },
    handleSelectionChange (val) {
      var that = this
      that.deleteId = val.map(item => item.id)
    }
  }
}
</script>
<style scoped lang="less">
// @import url('./iconfont.css');
.mailList {
  display: flex;
  min-height: 100%;
  color: #343536;
  //padding-top: 70px;
  background: #f5f7f8;
  .c_slide_container:hover+.forms{
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .forms {
    color: #343536;
    // width: 100%;
    font-size: 14px;
    .title {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      padding-left: 50px;
      display: flex;
      flex-direction: row;
      background: #fff;
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
      h3 {
        font-size: 16px;
      }
    }
    .list {
      height: 60px;
      border-bottom: 1px solid #ccc;
      text-align: right;
      background: #fff;
      margin: 20px;
      // h3 {
      //   text-align: left;
      //   font-size: 16px;
      //   padding-left: 50px;
      //   padding-top: 20px;
      //   display: inline-block;
      // }
      button {
        margin: 15px 20px;
        text-align: center;
        line-height: 32px;
        height: 32px;
        width: 80px;
        outline: none;
        border-radius: 5px;
      }
      .add {
        background: #eb6100;
        border: none;
        color: #fff;
      }
      .delete {
        border: 1px solid #eb6100;
        background: none;
        color: #eb6100;
      }
    }
    .block {
      margin: 50px;
      button {
        width: 80px;
        height: 32px;
        border: 1px solid #eb6100;
        background: none;
        line-height: 32px;
        outline: none;
        border-radius: 5px;
        color: #eb6100;
      }
      .card_page {
        margin: 30px 0;
        text-align: center;
      }
    }
    .block_list {
      margin: 50px;
      .role_person {
        display: flex;
        flex-direction: row;
        width: 1000px;
        height: 300px;
        margin: 0 auto;
        .l_person_list {
          flex: 1;
          li {
            display: flex;
            flex-direction: row;
            margin-top: 20px;
            p {
              padding-right: 15px;
              font-size: 14px;
              width: 100px;
            }
            input {
              height: 32px;
              width: 220px;
              border-radius: 5px;
              padding: 0 15px;
              outline: none;
              border: 1px solid #ccc;
            }
            a {
              text-decoration: none;
              color: red;
              display: inline-block;
              padding-right: 3px;
            }
          }
        }
      }
      .role_person_install {
        margin-top: 30px;
        text-align: center;
        button {
          margin: 0 30px;
          width: 100px;
          height: 32px;
          line-height: 32px;
          border: none;
          outline: none;
          background: #eb6100;
          border-radius: 5px;
          color: #fff;
        }
      }
    }
  }
}
</style>
