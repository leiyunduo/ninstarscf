<template>
  <div class='contactInformation'>
    <div class="forms">
      <div class="table_contan">
        <div class="list_tab">
          <div class="card_title">
            <h3>联系方式</h3>
            <div>
              <button class="sel" type="primary" v-if="editTitleShow" @click="edit">{{ editTitle }}</button>
              <button class="cancel" v-if="editTitle === '保存'" @click="selfCancel">取消</button>
            </div>
          </div>
          <div class="form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="100px">
              <el-form-item label="联系人:" prop="contact_person">
                <div v-show="editShow">
                  <span v-if="ruleForm.contact_person !== ''">{{ ruleForm.contact_person }}</span>
                  <span class='null_data' v-if="ruleForm.contact_person === ''">暂无数据</span>
                </div>
                <el-input v-model.trim="ruleForm.contact_person" :maxlength="maxlength" v-show="editHide"></el-input>
              </el-form-item>
              <el-form-item label="公司地址:" prop="address">
                <div v-show="editShow">
                  <span v-if="ruleForm.address !== ''">{{ ruleForm.address }}</span>
                  <span class='null_data' v-if="ruleForm.address === ''">暂无数据</span>
                </div>
                <el-input v-model.trim="ruleForm.address" :maxlength="maxlength * 2" v-show="editHide"></el-input>
              </el-form-item>
              <el-form-item label="联系电话:" prop="phone">
                <div v-show="editShow">
                  <span v-if="ruleForm.phone !== ''">{{ ruleForm.phone }}</span>
                  <span class='null_data' v-if="ruleForm.phone === ''">暂无数据</span>
                </div>
                <el-input v-model.trim="ruleForm.phone" :maxlength="maxlength - 21" v-show="editHide"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码:" prop="postal_code">
                <div v-show="editShow">
                  <span v-if="ruleForm.postal_code !== ''">{{ ruleForm.postal_code }}</span>
                  <span class='null_data' v-if="ruleForm.postal_code === ''">暂无数据</span>
                </div>
                <el-input v-model.trim="ruleForm.postal_code" :maxlength="maxlengths / 2" v-show="editHide"></el-input>
              </el-form-item>
              <el-form-item label="公司电话:" prop="company_phone">
                <div v-show="editShow">
                  <span v-if="ruleForm.company_phone !== ''">{{ ruleForm.company_phone }}</span>
                  <span class='null_data' v-if="ruleForm.company_phone === ''">暂无数据</span>
                </div>
                <el-input v-model.trim="ruleForm.company_phone" :maxlength="maxlength / 2" v-show="editHide"></el-input>
              </el-form-item>
              <el-form-item label="公司传真:" prop="fax">
                <div v-show="editShow">
                  <span v-if="ruleForm.fax !== ''">{{ ruleForm.fax }}</span>
                  <span class='null_data' v-if="ruleForm.fax === ''">暂无数据</span>
                </div>
                <el-input v-model.trim="ruleForm.fax" :maxlength="maxlength" v-show="editHide"></el-input>
              </el-form-item>
              <el-form-item label="公司邮箱:" prop="email">
                <div v-show="editShow">
                  <span v-if="ruleForm.email !== ''">{{ ruleForm.email }}</span>
                  <span class='null_data' v-if="ruleForm.email === ''">暂无数据</span>
                </div>
                <el-input v-model.trim="ruleForm.email" :maxlength="maxlength" v-show="editHide"></el-input>
              </el-form-item>
              <el-form-item label="公司网址:" prop="website">
                <div v-show="editShow">
                  <span v-if="ruleForm.website !== ''">
                    <a :href="ruleForm.website">{{ ruleForm.website }}</a>
                  </span>
                  <span class='null_data' v-if="ruleForm.website === ''">暂无数据</span>
                </div>
                <el-input v-model.trim="ruleForm.website" :maxlength="maxlengtha" v-show="editHide"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['contact_information'],
  data () {
    return {
      name: 'contactInformation',
      editShow: true,
      editHide: false,
      maxlength: 32,
      maxlengths: 12,
      maxlengtha: 128,
      editTitle: '编辑',
      ruleForm: {
        contact_person: '', // 联系人
        address: '', // 公司地址
        phone: '', // 联系电话
        postal_code: '', // 邮政编码
        company_phone: '', // 公司电话
        fax: '', // 公司传真
        email: '', // 公司邮箱
        website: '' // 公司网址
      },
      rules: {
        // 验证邮箱
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        postal_code: [
          { min: 6, max: 6, message: '长度为6位字符', trigger: 'blur' }
        ],
        phone: [
          { min: 11, max: 11, message: '长度为11位字符', trigger: 'blur' }
        ]
      },
      editTitleShow: true,
      businessId: '',
      detailId: ''
    }
  },
  mounted () {
    var that = this
    that.businessId = localStorage.id
    // 获取联系人等信息
    this.ruleForm = that.contact_information
    if (localStorage.role === 'person') {
      this.editTitleShow = false
    } else if (localStorage.role === 'institutionperson') {
      this.editTitleShow = false
    } else if (localStorage.role === 'serviceperson') {
      this.editTitleShow = false
    } else {
      this.editTitleShow = true
    }
    that.$ajax.get(`/api/company/` + that.businessId).then(res => {
      that.detailId = res.data.detail
      that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
        if (res.data.contact_info) {
          that.ruleForm = res.data.contact_info
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    selectManage () {
      const that = this
      // 获取联系人等信息、
      that.$ajax.get(`/api/company_detail/` + that.detailId).then(res => {
        if (res.data.contact_info) {
          that.ruleForm = res.data.contact_info
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    selfCancel () {
      const that = this
      that.$ajax.get(`/api/company_detail/` + that.detailId).then(res => {
        that.ruleForm = res.data.contact_info
        this.editTitle = '编辑'
        this.editShow = true
        this.editHide = false
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    edit () {
      const that = this
      if (this.editTitle === '编辑') {
        this.editTitle = '保存'
        // this.ruleForm = {}
        this.editShow = false
        this.editHide = true
      } else if (this.editTitle === '保存') {
        // 修改联系人等信息、
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            that.$ajax.patch(`/api/company_detail/` + that.detailId + '/', {contact_info: that.ruleForm, partial: true}).then(res => {
              that.ruleForm = res.data.contact_info
              that.editTitle = '编辑'
              that.editShow = true
              that.editHide = false
            }).catch(err => {
              that.$message.error(err.response.data.err_msg)
            })
          }
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.null_data {
  color: #999;
}
.contactInformation {
  width: 100%;
  padding: 0 15px;
  .table_contan {
    text-align: left;
    background: #fff;
    .list_tab {
      height: auto;
      margin-bottom: 20px;
      .form {
        padding-left: 10px;
        margin-top: 30px;
      }
      .card_title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e7ebee;
        align-items: center;
        height: 60px;
        h3 {
          border-left:4px solid #eb6100;
          font-size: 14px;
          color: #696969;
          padding-left: 15px;
          font-weight: bold;
        }
        button {
          border: none;
          outline: none;
          margin: 0;
          border-radius:4px;
          width:80px;
          height:28px;
        }
        button:hover {
          color: #f48537;
          background: none;
          border: 1px solid #f48537;
        }
        .sel {
          background: #f48537;
          color: #fff;
          border: none;
        }
        .cancel {
          border: 1px solid #f48537;
          color: #f48537;
          background: #fff;
        }
      }
      .el-form-item__content {
        span {
          display: inline-block;
          margin-left: 20px;
        }
      }
      .el-form-item__error {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 29%;
        left: 200px;
        width: 123px;
      }
      .el-input {
        width: 370px;
        height: 30px;
        margin-left: 20px;
      }
      .el-input__inner {
        width: 370px;
        height: 30px;
      }
    }
    .box_btn {
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
</style>
