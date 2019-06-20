<template>
  <div class="">
    <el-dialog :visible.sync="dialogVisibles" width="86%" :before-close="handleClose">
      <div class="l_box_list2">
        <h3>选择经办人</h3>
        <div class="block">
          <table class="show_agent">
            <tr>
              <td></td>
              <td>姓名</td>
              <td>角色</td>
              <td>手机号码</td>
              <td>人脸识别认证</td>
              <td>所属公司</td>
              <td>办公室电话</td>
              <td>身份证号</td>
              <td>微信号码</td>
              <td>邮箱</td>
              <td>QQ</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item, index) in personDataList" :key='index'>
              <td>
                <input type="checkbox" :checked='item.checked' @click="item.checked = !item.checked">
              </td>
              <td v-if="item.all_info">{{item.all_info.name}}</td>
              <td v-if="item.all_info" :style='!item.all_info.role ? "color: #999" : ""'>{{item.all_info.role || '未填写'}}</td>
              <td v-if="item.all_info">{{item.all_info.phone}}</td>
              <td v-if="item.all_info" :style='!item.all_info.face ? "color: #999" : ""'>{{item.all_info.face}}</td>
              <td v-if="item.all_info" :style='!item.all_info.company ? "color: #999" : ""'>{{item.all_info.company || '未填写'}}</td>
              <td v-if="item.all_info" :style='!item.all_info.officePhone ? "color: #999" : ""'>{{item.all_info.officePhone || '未填写'}}</td>
              <td v-if="item.all_info" :style='!item.all_info.iDnumber ? "color: #999" : ""'>{{item.all_info.iDnumber}}</td>
              <td v-if="item.all_info" :style='!item.all_info.weChat ? "color: #999" : ""'>{{item.all_info.weChat || '未填写'}}</td>
              <td v-if="item.all_info" :style='!item.all_info.email ? "color: #999" : ""'>{{item.all_info.email || '未填写'}}</td>
              <td v-if="item.all_info" :style='!item.all_info.QQ ? "color: #999" : ""'>{{item.all_info.QQ || '未填写'}}</td>
              <td v-if="item.all_info">
                <span @click="innerPerson(item)">修改</span>
                <span @click="innerView(item)">查看</span>
              </td>
            </tr>
          </table>
          <!-- <el-table
            ref="multipleTable"
            :data="personDataList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="all_info.name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="all_info.role" label="角色" align="center"></el-table-column>
            <el-table-column prop="all_info.phone" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="all_info.face" label="人脸识别认证" align="center"></el-table-column>
            <el-table-column prop="all_info.company" label="所属公司" align="center"></el-table-column>
            <el-table-column prop="all_info.officePhone" label="办公室电话" align="center"></el-table-column>
            <el-table-column prop="all_info.iDnumber" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="all_info.weChat" label="微信号码" align="center"></el-table-column>
            <el-table-column prop="all_info.email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="all_info.QQ" label="QQ" align="center"></el-table-column>
            <el-table-column prop="all_info.operate" label="操作" align="center"></el-table-column>
          </el-table> -->
          <div class="card_page" v-if="total">
            <el-pagination @current-change="handleCurrentChange"
              :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="install">
          <button @click="okPerson">确定</button>
          <button @click="innerPerson(null)">添加</button>
        </div>
        <el-dialog id="addAgent"
          width="50%"
          :title="!edit ? '添加经办人' : '修改经办人'"
          :visible.sync="innerVisible"
          :before-close="handleStep"
          append-to-body>
          <div class="role_person" v-if="!step">
            <ul class="l_person_list">
              <li>
                <p><span href="#">*</span>姓名:</p>
                <input type="text" v-model="personData.all_info.name" maxlength="32" v-if="!edit">
                <input type="text" v-model="personData.all_info.name" maxlength="32" v-if="edit" disabled>
              </li>
              <li class="company-select__view">
                <p><span href="#">*</span>所属公司:</p>
                <input type="text" @keyup="getCompanyList($event, personData.all_info.company, 1)" v-model="personData.all_info.company" maxlength="64">
                <div class="chain-select-dropdown__wrap" :class="companyList.length > 0 ? 'fadeIn': ''">
                  <ul class="chain-select-dropdown__list">
                    <li v-for="(item, index) in companyList" :key="index" class="chain-select-dropdown__item" @click="selectItem(item)">{{item.name}}</li>
                  </ul>
                </div>
                <div class="tips">
                  <small>注：</small>
                  <small>默认为当前企业, 亦可更换选择。</small>
                </div>
              </li>
              <li>
                <p><span href="#">*</span>手机号码:</p>
                <input type="text" v-model="personData.all_info.phone" maxlength="11" v-if="!edit">
                <input type="text" v-model="personData.all_info.phone" maxlength="11" v-if="edit" disabled>
              </li>
              <li>
                <p>角色:</p>
                <input type="text" v-model="personData.all_info.role" maxlength="32">
              </li>
              <li>
                <p><span href="#">*</span>身份证号:</p>
                <input type="text" v-model="personData.all_info.iDnumber" maxlength="18" v-if="!edit">
                <input type="text" v-model="personData.all_info.iDnumber" v-if="edit" disabled>
              </li>
              <li>
                <p>办公室电话:</p>
                <input type="text" v-model="personData.all_info.officePhone" maxlength="15">
              </li>
            </ul>
            <ul class="l_person_list">
              <li>
                <p>微信号码:</p>
                <input type="text" v-model="personData.all_info.weChat" maxlength="25">
              </li>
              <li>
                <p>邮箱:</p>
                <input type="text" v-model="personData.all_info.email" maxlength="64">
              </li>
              <li>
                <p>QQ:</p>
                <input type="text" v-model="personData.all_info.QQ" maxlength="16">
              </li>
            </ul>
          </div>
          <div class="role_person_install" v-if="!step">
            <button @click="okPersonSon">确定</button>
            <button @click="onPersonSon">取消</button>
          </div>
          <div class="role_qr" v-if="step">
            <h4>{{!edit ? '添加' : '修改'}}成功。</h4>
            <p>web 端暂不支持身份信息采集识别功能，请用手机app扫面下方二维码进行操作。（认证操作可后续进行）</p>
            <img :src="qrcode" alt="">
          </div>
          <div class="role_person_install" v-if="step">
            <button @click="complatePerson">完成</button>
          </div>
        </el-dialog>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleCard" :append-to-body="false" :before-close="closeview">
      <person-info v-if='dialogVisibleCard' :pid="personId" :pName="personName" @closeView="closeview" :isAgent="true"/>
    </el-dialog>  
  </div>
</template>

<script>
  import PersonInfo from '@/components/public/person-info'
  export default {
    name: '',
    props: ['rowSelectArr'],
    components: {PersonInfo},
    data () {
      return {
        dialogVisibleCard: false,
        personId: '',
        personName: '',
        dialogVisibles: true,
        innerVisible: false,
        personData: {
          id: '',
          all_info: {
            name: '',
            role: '',
            company: '',
            iDnumber: '',
            officePhone: '',
            weChat: '',
            email: '',
            QQ: '',
            phone: '',
            face: '未识别'
          }
        },
        qrcode: require('../../../../../static/img/qrcode_demo.png'),
        step: false,
        personDataList: [],
        personDataListResult: [],
        edit: false,
        errMsg: {
          name: '姓名不能为空',
          company: '所属公司不能为空',
          phone: '手机号码不能为空',
          email: '邮箱格式有误',
          iDnumber: '身份证号码不能为空'
        },
        personIds: [],
        currPage: 1,
        total: '',
        pageSize: 5,
        companyList: [],
        timer: ''
      }
    },
    mounted () {
      this.getAgentInfo(this.rowSelectArr)
      document.addEventListener('click', () => {
        this.companyList = []
      })
    },
    methods: {
      getCompanyList (e, name, ns_type) {
        let keyword = name.trim()
        if (!keyword) return
        this.companyList = []
        this.timer = e.timeStamp
        setTimeout(() => { 
          if (this.timer - e.timeStamp === 0) {
            this.$ajax.get(`/api/chain/company/search/?name=${keyword}&ns_type=${ns_type}`).then(res => {
              if (res.status === 200) {
                if (res.data.length > 0) {
                  var list = res.data
                  this.companyList = list
                }
              }
            })
          }
        }, 500) 
      },
      selectItem (item) {
        this.personData.all_info.company = item.name
        this.companyList = []
      },
      handleStep () {
        this.innerVisible = false
        this.edit = false
        this.step = false
      },
      getAgentInfo (rowSelectArr) {
        this.personDataList = []
        this.$ajax.get(`/api/chain/agent/`).then(res => {
          if (res.status === 200) {
            this.total = res.data.count
            this.personDataList = res.data.results
            if (Array.isArray(rowSelectArr) && rowSelectArr.length) {
              let arr = this.personDataList.reduce((prev, next) => {
              next.all_info.face = '未认证'
              next.all_info.operate = '编辑'
              rowSelectArr.forEach(el => {
                if (next.id === el.id) {
                  prev.push(next)
                }
              })
              return prev
              }, [])
              // setTimeout(() => {
              //   arr.forEach(row => {
              //     this.$refs.multipleTable.toggleRowSelection(row)
              //   })
              // }, 100)
            }
          }
        })
      },
      handleClose () {
        this.dialogVisibles = false
        this.$emit('hideAgent', this.dialogVisibles)
      },
      handleCurrentChange (val) {
        this.currPage = val
        this.$ajax.get(`/api/chain/agent/?page=${this.currPage}&page_size=${this.pageSize}`).then(res => {
          if (res.status === 200) {
            this.total = res.data.count
            this.personDataList = res.data.results
          }
        })
      },
      handleSelectionChange (val) {
        this.personDataListResult = val
      },
      okPerson () {
        this.handleClose()
        // console.log(this.personDataList)
        let arr = this.personDataList.filter(val => val.checked)
        this.$emit('onConfirm', arr)
      },
      innerPerson (el) {
        if (el) {
          this.personData = el
          this.edit = true
        } else {
          this.edit = false
          this.personData = {
            id: '',
            all_info: {
              name: '',
              role: '',
              company: '',
              iDnumber: '',
              officePhone: '',
              weChat: '',
              email: '',
              QQ: '',
              phone: ''
            }
          }
          this.getCompanyInfo()
        }
        this.innerVisible = true
      },
      onPersonSon () {
        this.innerVisible = false
      },
      closeview () {
        this.dialogVisibleCard = false
      }, 
      okPersonSon () {
        let _checkObj = {
          name: this.personData.all_info.name,
          company: this.personData.all_info.company,
          phone: this.personData.all_info.phone,
          email: this.personData.all_info.email,
          iDnumber: this.personData.all_info.iDnumber
        }
        if (!this.dataCheck(_checkObj)) return
        if (!this.edit) {
          this.$ajax.post(`/api/chain/agent/`, this.personData.all_info).then(res => {
            if (res.status === 201) {
              this.step = true
            }
          })
        } else {
          this.$ajax.put(`/api/chain/agent/${this.personData.id}/`, {all_info: this.personData.all_info}).then(res => {
            this.step = true
          })          
        }

      },
      // 二维码后续操作
      complatePerson () {
        this.getAgentInfo()
        this.step = false
        this.innerVisible = false
      },
      dataCheck (obj) {
        let phoneReg = /^1[345678]\d{9}$/
        let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        let flag = true 
        let check_obj = ''
        for (var item in obj) {
          // check_obj = typeof obj[item] === 'object' ? obj[item] : obj[item].trim()
          check_obj = obj[item]
          if (!check_obj && item !== 'email') {
            this.$message.error(this.errMsg[item])
            return !flag
          } else if (check_obj && item === 'email' && !emailReg.test(check_obj)) {
            this.$message.error(this.errMsg[item])
            return !flag
          } else if (item === 'phone' && !phoneReg.test(check_obj)) {
            this.$message.error('手机格式有误')
            return !flag
          } else if (item === 'iDnumber' && check_obj === '') {
            this.$message.error('请输入身份证号码')
            return !flag
          }
        }
        return flag
      },
      getCompanyInfo () {
        this.$ajax.get(`/api/chain/company/myself/`).then(res => {
          if (res.status === 200) {
            this.personData.all_info.company = res.data.company_name
          }
        })
      },
      innerView (item) {
        this.personId = item.id
        this.personName = item.all_info.name
        this.dialogVisibleCard = true
      }
    }
  }
</script>
<style lang='less' scope>
#addAgent {
  .el-dialog {
    min-width: 980px;
  }
}
.tips {
  position: absolute;
  display: flex;
  right: -40px;
  width: 117px;
  top: 0px;
  &>small{
    color: #0fbaf8
  }
}
.l_box_list2 {
  h3 {
    font-weight: bold;
    font-size: 18px;
    padding-bottom: 20px;
  }
  .card_page {
    margin: 30px 0;
    text-align: center;
  }
  .install {
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
  .show_agent {
    width: 100%;
    tr {
      min-height: 40px;
      td {
        padding: 0;
        line-height: 48px;
        text-align: center;
        border-bottom: 1px solid #dfdfdf;
        color: #333;
        span {
          color: #eb6100;
          cursor: pointer;
          text-decoration: underline;
        }
        input {
          vertical-align: middle;
          width: 16px;
          height: 16px;
        }
      }
    }
    tr:first-child {
      color: #666;
      td {
        font-weight: bold;
      }
    }
  }
}
.role_person {
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  .l_person_list {
    flex: 1;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 20px;
      &.company-select__view {
        position: relative;
        .chain-select-dropdown__wrap {
          position: absolute;
          top: 32px;
          left: 120px;
          background: #fff;
          border: 1px solid #e1e6f0;
          z-index: 1;
          font-size: 14px;
          color: #333;
          max-height: 250px;
          overflow-y: auto;
          overflow-x: hidden;
          border-radius: 5px;
          &.fadeIn {
            top: 37px;
            transition: top ease-out .2s;
          }
          &::-webkit-scrollbar {
            display: none;
          }
          .chain-select-dropdown__list {
            margin: 3px 0; 
            .chain-select-dropdown__item {
              margin: 0;
              width: 240px;
              padding: 9px 10px;
              border-bottom: 1px dashed #e1e6f0;
              box-sizing: border-box;
              &:last-of-type {
                border: 0;
              }
            }
            .chain-select-dropdown__item:hover {
              background: #eb6100;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
      p {
        padding-right: 15px;
        font-size: 14px;
        line-height: 1;
        width: 120px;
        text-align: right
      }
      input {
        height: 32px;
        width: 240px;
        border-radius: 5px;
        padding: 0 15px;
        outline: none;
        border: 1px solid #ccc;
      }
      input:focus {
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        border-color: #409eff;
        // &+.chain-select-dropdown__wrap {
        //   transition: top ease .4s;
        //   top: 37px; 
        // }
      }
      span {
        text-decoration: none;
        color: red;
        display: inline-block;
        padding-right: 3px;
      }
    }
  }
}
.role_qr {
  h4 {
    // margin: 20px 0;
    font-weight: bolder;
    color: #eb6100;
    line-height: 36px;
    font-size: 16px;
  }
  p {
    line-height: 24px;
    color: #666;
  }
  img {
    width: 120px;
    margin: 20px 0;
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
</style>