<template>
  <div class="">
    <el-dialog :visible.sync="dialogVisibles" width="80%" :before-close="handleClose">
      <div class="l_box_list2">
        <h3>选择经办人</h3>
        <div class="block">
          <el-table
            ref="multipleTable"
            :data="personDataList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="all_info.name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="all_info.role" label="角色" align="center"></el-table-column>
            <el-table-column prop="all_info.phone" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="all_info.company" label="所属公司" align="center"></el-table-column>
            <el-table-column prop="all_info.officePhone" label="办公室电话" align="center"></el-table-column>
            <el-table-column prop="all_info.iDnumber" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="all_info.weChat" label="微信号码" align="center"></el-table-column>
            <el-table-column prop="all_info.email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="all_info.QQ" label="QQ" align="center"></el-table-column>
          </el-table>
          <div class="card_page" v-if="total">
            <el-pagination @current-change="handleCurrentChange"
              :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="install">
          <button @click="okPerson">确定</button>
          <button @click="innerPerson">添加</button>
        </div>
        <el-dialog id="addAgent"
          width="50%"
          title="添加经办人"
          :visible.sync="innerVisible"
          append-to-body>
          <div class="role_person">
            <ul class="l_person_list">
              <li>
                <p><span href="#">*</span>姓名:</p>
                <input type="text" v-model="personData.all_info.name" maxlength="32">
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
                <input type="text" v-model="personData.all_info.phone" maxlength="11">
              </li>
              <li>
                <p>角色:</p>
                <input type="text" v-model="personData.all_info.role" maxlength="32">
              </li>
              <li>
                <p>身份证号:</p>
                <input type="text" v-model="personData.all_info.iDnumber" maxlength="18">
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
          <div class="role_person_install">
            <button @click="okPersonSon">确定</button>
            <button @click="onPersonSon">取消</button>
          </div>
        </el-dialog>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: '',
    props: ['rowSelectArr'],
    data () {
      return {
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
            phone: ''
          }
        },
        personDataList: [],
        personDataListResult: [],
        errMsg: {
          name: '姓名不能为空',
          company: '所属公司不能为空',
          phone: '手机号码不能为空',
          email: '邮箱格式有误'
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
      getAgentInfo (rowSelectArr) {
        this.personDataList = []
        this.$ajax.get(`/api/chain/agent/`).then(res => {
          if (res.status === 200) {
            this.total = res.data.count
            this.personDataList = res.data.results
            let arr = this.personDataList.reduce((prev, next) => {
              rowSelectArr.forEach(el => {
                if (next.id === el.id) {
                  prev.push(next)
                }
              })
              return prev
            }, [])
            setTimeout(() => {
              arr.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row)
              })
            }, 100)
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
        this.$emit('onConfirm', this.personDataListResult)
      },
      innerPerson () {
        this.innerVisible = true
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
      },
      onPersonSon () {
        this.innerVisible = false
      },
      okPersonSon () {
        let _checkObj = {
          name: this.personData.all_info.name,
          company: this.personData.all_info.company,
          phone: this.personData.all_info.phone,
          email: this.personData.all_info.email
        }
        if (!this.dataCheck(_checkObj)) return
        this.innerVisible = false
        this.$ajax.post(`/api/chain/agent/`, this.personData.all_info).then(res => {
          if (res.status === 201) {
            this.getAgentInfo()
          }
        })
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