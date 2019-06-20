<template>
  <div class="eco_list">
    <div class="title_list">
      <ul>
        <li v-for="(item, index) in listName" :key="index" @click="tabClick(index)" :class="active === index ? 'active' : ''">{{ item }}</li>
      </ul>
    </div>
    <div class="list_cont">
      <!-- <div class="top_btn" v-if="listContent.length > 0">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <button>删除</button>
      </div> -->
      <div class="bottom_list">
        <div class="list" v-for="(item, index) in listContent" :key="index" v-if="listContent.length > 0">
          <!-- <div class="checkbox_list_btn">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item.id"></el-checkbox>
            </el-checkbox-group>
          </div> -->
          <div class="business_list">
            <div class="logo"><img src="../../../static/img/tickets/default_business.png" alt=""></div>
            <div class="business_content">
              <div class="cont_top">
                <h3 @click="businessPartner(item.partner_company_name)">{{ item.partner_company_name }}</h3>
                <div class="btn">
                  <el-popover placement="bottom" width="80" trigger="hover">
                    <ul class="btn_ul">
                      <li><button @click="updateClick(0, item.id)" :class="Number(item.relation_type) === 0 ? 'gayg_type' : ''" :disabled="Number(item.relation_type) === 0">更改为客户</button></li>
                      <li><button @click="updateClick(1, item.id)" :class="Number(item.relation_type) === 1 ? 'gayg_type' : ''" :disabled="Number(item.relation_type) === 1">更改为供应商</button></li>
                      <li><button @click="updateClick(2, item.id)" :class="Number(item.relation_type) === 2 ? 'gayg_type' : ''" :disabled="Number(item.relation_type) === 2">更改为服务商</button></li>
                    </ul>
                    <button slot="reference">更改</button>
                  </el-popover>
                  <button @click="deletedialog(item.relation_type, item.id)">删除</button>
                </div>
              </div>
              <div class="ul_cont">
                <ul>
                  <li><span>法人姓名：</span><p>{{ item.partner_company_cfca_info.legal_name ? item.partner_company_cfca_info.legal_name : '暂无数据' }}</p></li>
                  <li><span>联系电话：</span><p>{{ item.partner_company_cfca_info.phone ? item.partner_company_cfca_info.phone : '暂无数据' }}</p></li>
                  <li><span>联系邮箱：</span><p>{{ item.partner_company_cfca_info.email ? item.partner_company_cfca_info.email : '暂无数据' }}</p></li>
                </ul>
                <ul>
                  <li><span style="width:132px">统一社会信用代码：</span><p>{{ item.partner_company_cfca_info.credit_code ? item.partner_company_cfca_info.credit_code : '暂无数据' }}</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div v-if="listContent.length === 0" style="text-align: center; width: 100%; font-size: 18px; font-weight: 900;"><img src="../../../static/img/tops.png" alt="">Oops！空空如也... ...</div>
        <div style="text-align:center;">
          <el-pagination v-if="total" @current-change="handleSizeChange"
            :current-page="currPage" :page-size="5" layout="total, prev, pager, next" :total="total">
          </el-pagination>
          <!-- , jumper -->
        </div>
      </div>
    </div>
    <!-- 更改 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleUpdate" width="25%" :before-close="handleClose">
      <div class="box_lists">
        <h3>确定更改为 {{Number(relation_type) === 0 ? '客户' : Number(relation_type) === 1 ? '供应商' : '服务商'}} 么？</h3>
        <div class="list">
          <button class="cancel" @click="handleClose">取消</button>
          <button class="prese" @click="dialogClick(0)">确定</button>
        </div>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
      <div class="box_lists">
        <h3>确定删除么？</h3>
        <div class="list">
          <button class="cancel" @click="handleClose">取消</button>
          <button class="prese" @click="dialogClick(1)">确定</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ecoList',
  data () {
    return {
      listName: ['客户', '供应商', '服务商'],
      active: 0,
      checkAll: false,
      checkedCities: [],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: false,
      // 分页
      currPage: 1,
      total: '',
      listContent: [],
      dialogVisibleUpdate: false,
      relation_type: '',
      partner_company_name: '',
      dialogVisible: false,
      partner_id: ''
    }
  },
  mounted () {
    const that = this
    // relation_type | 关系：（'0', '客户'), ('1', '供应商'), ('2', '服务商')
    that.$ajax.get('/api/chain/partner_company/?relation_type=0').then(res => {
      console.log(res)
      that.listContent = res.data.results
      that.total = res.data.count
    })
  },
  methods: {
    businessPartner (item) {
      const that = this
      that.$emit('listenEvent1', false, item, 1)
    },
    // 取消
    handleClose () {
      this.dialogVisible = false
      this.dialogVisibleUpdate = false
    },
    // 修改
    updateClick (i, item) {
      const that = this
      that.relation_type = i
      that.partner_id = item
      that.dialogVisibleUpdate = true
    },
    // 删除
    deletedialog (i, item) {
      this.partner_id = item
      this.relation_type = i
      this.dialogVisible = true
    },
    dialogClick (i) {
      const that = this
      if (i === 0) {
        // relation_type        | 要添加的关系：（'0', '客户'), ('1', '供应商'), ('2', '服务商')
        that.$ajax.put(`/api/chain/partner_company/` + that.partner_id + '/', {relation_type: that.relation_type}).then(res => {
          that.$message.success(res.data.msg)
          that.dialogVisibleUpdate = false
          that.$ajax.get('/api/chain/partner_company/?relation_type=' + that.active + '&page=' + that.currPage + '&page_size=5').then(res => {
            that.listContent = res.data.results
            that.total = res.data.count
          })
        })
      }else if (i === 1) {
        that.$ajax.put(`/api/chain/partner_company/` + that.partner_id + '/', {active: 0}).then(res => {
          that.$message.success(res.data.msg)
          that.dialogVisible = false
          that.$ajax.get('/api/chain/partner_company/?relation_type=' + that.active + '&page=' + that.currPage + '&page_size=5').then(res => {
            that.listContent = res.data.results
            that.total = res.data.count
          })
        })
      }
    },
    tabClick (i) {
      const that = this
      this.currPage = 1
      that.active = i
      that.$ajax.get('/api/chain/partner_company/?relation_type=' + i + '&page=' + that.currPage + '&page_size=5').then(res => {
        that.listContent = res.data.results
        that.total = res.data.count
      })
    },
    // 分页
    handleSizeChange (val) {
      var that = this
      this.currPage = val
      that.$ajax.get('/api/chain/partner_company/?relation_type=' + that.active + '&page=' + that.currPage + '&page_size=5').then(res => {
        that.listContent = res.data.results
        that.total = res.data.count
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    handleCheckAllChange(val) {
      const that = this
      that.checkedCities = []
      if (that.checkAll) {
        that.listContent.forEach(function(item, index) {
        if (index >= 0) {
            that.checkedCities.push(item.id)
          }
        })
      }
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.listContent.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.listContent.length;
    }
  }
}
</script>

<style lang="less" scoped>
.eco_list {
  padding: 20px 30px;
  .title_list {
    ul {
      display: flex;
      flex-direction: row;
      li {
        width: 120px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #666;
      }
      .active {
        border-bottom: 2px solid #eb6100;
        color: #eb6100;
      }
    }
  }
  .list_cont {
    padding-top: 20px;
    .top_btn {
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      button {
        background: none;
        border: none;
        color: rgb(235, 97, 0);
        outline: none;
        margin-left: 30px;
      }
    }
    .bottom_list {
      .list {
        display: flex;
        flex-direction: row;
        border: 1px solid #eee;
        height: 120px;
        width: 100%;
        margin-bottom: 20px;
        padding: 0 20px;
        .checkbox_list_btn {
          width: 30px;
          padding-top: 49px;
        }
        .business_list {
          width: 100%;
          display: flex;
          flex-direction: row;
          .logo {
            width: 80px;
            margin-right: 10px;
            img {
              width: 80px;
              height: 80px;
              margin-top: 20px;
            }
          }
          .business_content {
            flex: 1;
            padding-left: 20px;
            .cont_top {
              height: 50px;
              padding-top: 20px;
              h3 {
                float: left;
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                text-decoration: underline;
                color: #eb6100;
                cursor: pointer;
              }
              .btn {
                float: right;
                button {
                  background: none;
                  border: none;
                  color: rgb(235, 97, 0);
                  outline: none;
                }
              }
            }
            .ul_cont {
              ul {
                display: flex;
                flex-direction: row;
                li {
                  flex: 1;
                  display: flex;
                  flex-direction: row;
                  line-height: 30px;
                  span {
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    width:72px;
                    display: inline-block;
                    text-align: left;
                  }
                  p {
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:bold;
                    color:rgba(102,102,102,1);
                    text-align: left;
                    padding-left: 10px;
                    // max-width: 120px;
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
.box_lists {
  span {
    a {
      color: #333;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
      padding: 0 10px;
    }
  }
  .list {
    text-align: right;
    margin-top: 20px;
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
.el-popover {
  .btn_ul {
    li {
      padding-bottom: 5px;
      button {
        background: none;
        border: none;
        outline: none;
        color: #eb6100;
      }
      .gayg_type {
        color: #999;
      }
    }
  }
}
</style>

<style lang="less">
.eco_list {
  .el-checkbox-group {
    .el-checkbox {
      .el-checkbox__label {
        display: none;
      }
    }
  }
}
</style>
