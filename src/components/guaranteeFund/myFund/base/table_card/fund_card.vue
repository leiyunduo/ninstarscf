<template>
  <div class='id_card'>
    <div class='item_line' v-if="!noFund">
      <div class='item_section item_money'>
        <span>助贷机构：</span>
        <span>{{info.name}}</span>
      </div>
      <div class='item_section item_money'>
        <span>授信等级：</span>
        <span>{{titleList[info.group]}}</span>
      </div>
    </div>
    <div class='item_line' v-if="!noFund">
      <div class='item_section item_money'>
        <span>助贷状态：</span>
        <span :style="info.helping_status ? `color: ${fundList[info.helping_status].color}` : 'color: #111'">{{info.helping_status ? fundList[info.helping_status].title : ''}}</span>
      </div>
        <div class='item_section item_money'>
        <span>融资授信总额度（元）：</span>
        <span>{{toThousands(info.total_limit)}}</span>
      </div>
    </div>
    <div class='item_line' v-if="!noFund">
      <div class='item_section item_money'>
        <span>本次助贷金额（元）：</span>
        <span>{{toThousands(info.value) || '未助贷'}}</span>
      </div>
      <div class='item_section item_money'>
        <span>单笔融资授信额度（元）：</span>
        <span>{{toThousands(info.single_limit)}}</span>
      </div>
    </div>
    <div class='item_line' v-if="!noFund">
      <div class='item_section item_money'>
        <span>本次助贷占比：</span>
        <span>{{info.hasRate ? Number(info.rate).toFixed(1) + '%' : info.rate}}</span>
      </div>
    </div>
    <div class='item_line' v-if="info.helping_status === '0'">
      <div class="item_btn">
        <span @click="theHelpClick">同意助贷</span>
        <span @click="refuseVisible = true">拒绝助贷</span>
      </div>
    </div>
    <p v-if="noFund" style="line-height: 212px; text-align: center; color: #999">未提交助贷担保</p>
    <!-- 授信管理 -->
    <el-dialog align='center' :visible.sync="managementVisible" width="570px" :modal-append-to-body="false">
      <div class="reasons_for_refusal">
        <h3>本次助贷调整</h3>
        <div class="input_list">
          <el-form ref="form" :model="form" label-width="170px">
            <el-form-item label="助贷授信：">
              <span style="display:inline-block;width: 250px;color:#666;text-align: left;">{{form.name}}</span>
            </el-form-item>
            <el-form-item label="授信等级：">
              <span style="display:inline-block;width: 250px;color:#666;text-align: left;">{{form.group === '0' ? '未分配等级' : form.group === '1' ? '白名单企业' : form.group === '2' ? '黄名单企业' : '黑名单企业'}}</span>
            </el-form-item>
            <el-form-item label="融资需求：">
              <span style="display:inline-block;width: 250px;color:#666;text-align: right;">{{form.value ? toThousands(form.value) : '0.00'}}（元）</span>
            </el-form-item>
            <el-form-item label="本次助贷金额（元）：">
              <span style="display:inline-block;width: 250px;color:red;text-align: right;">{{form.amount ? toThousands(form.amount) : '0.00'}}（元）</span>
            </el-form-item>
            <el-form-item label="本次助贷占比：">
              <el-input v-model="form.rate" style="width: 250px;text-align:right;" size="small" @input="handleRate()" />
              <span class="spans">%</span>
            </el-form-item>
            <el-form-item label="融资助贷授信总额度：">
              <span style="display:inline-block;width: 250px;color:red;text-align: right;">{{toThousands(form.total_limit)}}（元）</span>
            </el-form-item>
            <el-form-item label="单笔融资助贷授信额度：">
              <span style="display:inline-block;width: 250px;color:red;text-align: right;">{{toThousands(form.single_limit)}}（元）</span>
            </el-form-item>
          </el-form>
        </div>
        <button class="ok" @click="managementOK">确 定</button>
        <button class="cancel" @click="managementVisible = false">取 消</button>
      </div>
    </el-dialog>
    <el-dialog align='center' :visible.sync="refuseVisible" width="570px" :modal-append-to-body="false">
      <div class="reasons_for_refusal">
        <h3>拒绝助贷？</h3>
        <p>拒绝后本次贷款无法重新提交。</p>
        <div>
          <button class='ok' @click="refuse">确定</button>
          <button class='cancel' @click="refuseVisible = false">取消</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'fundCard',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      noFund: false,
      refuseVisible: false,
      info: {},
      member: {},
      titleList: ['未授信', '白名单', '黄名单', '黑名单'],
      fundList: [
        {title: '审核中', color: '#eb6100'},
        {title: '助贷中', color: '#228B22'},
        {title: '已拒绝', color: '#ff0010'},
        {title: '赔付申请中', color: '#eb6100'},
        {title: '同意赔付', color: '#228B22'},
        {title: '拒绝赔付', color: '#ff0010'},
        {title: '企业已上传还款信息', color: '#eb6100'},
        {},
        {title: '无赔付助贷结束', color: '#228B22'},
        {title: '助贷已结束', color: '#228B22'}
      ],
      form: {},
      help_id: '',
      managementVisible: false
    }
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/application/${that.id}/`).then(res => {
      if (res.status === 200) {
        that.member = {name: res.data.business_info.name, ...res.data.member_info, value: res.data.expect_data.value, amount: res.data.member_info.rate * res.data.expect_data.value / 100}
        if (res.data.fund_info) {
          if (res.data.helping_status === '0' || res.data.helping_status === '2' || res.data.helping_status === '5') {
            that.info = {
              name: res.data.fund_info.name,
              helping_status: res.data.helping_status,
              ...res.data.member_info,
              rate: that.fundList[res.data.helping_status].title,
              amount: that.fundList[res.data.helping_status].title,
              hasRate: false
            }
          } else {
            that.info = {
              name: res.data.fund_info.name,
              helping_status: res.data.helping_status,
              ...res.data.member_info,
              ...res.data.helping_data,
              hasRate: true
            }
          }
        } else {
          that.noFund = true
        }
      }
    })
  },
  methods: {
    // 本次助贷管理
    theHelpClick () {
      const that = this
      // that.form.name = item.business_info.name
      // that.form.group = item.member_info.group
      // if (that.form.rate) {
      //   that.form.rate = item.helping_data.rate
      // }
      // that.form.single_limit = item.member_info.single_limit
      // that.form.total_limit = item.member_info.total_limit
      // that.form.value = item.expect_data.value
      // that.form.amount = item.helping_data.value
      console.log(that.member)
      that.form = that.member
      that.help_id = that.id
      that.managementVisible = true
    },
    // 本次助贷管理确认
    managementOK () {
      const that = this
      console.log(that.form)
      if (that.form.rate === '') {
        that.$message.error('请输入助贷占比')
      } else {
        if (!(/^[0-9]+(.[0-9])?$/.test(that.form.rate))) {
          that.$message.error('请输入正确的助贷占比')
        } else {
          if (that.form.rate < 0 || that.form.rate > 100) {
            that.$message.error('助贷占比不能大于100或小于0')
          } else {
            if (that.form.amount === '' || Number(that.form.amount) === 0) {
              that.$message.error('助贷金额不能为空')
            } else {
              let data = {}
              data.rate = that.form.rate
              data.value = that.form.amount
              console.log(data)
              // 修改金额
              that.$ajax.put(`/api/financing/application/` + that.help_id + '/', {helping_data: data}).then(res => {
                that.managementVisible = false
                // 助贷
                that.$ajax.put(`/api/financing/application/` + that.help_id + '/', {helping_status: '1'}).then(res => {
                  that.$message.success('助贷成功')
                }).catch(err => {
                  that.$message.error(err.response.data.err_msg)
                })
                that.$ajax.get(`/api/financing/application/${that.id}/`).then(res => {
                  if (res.status === 200) {
                    that.member = {...res.data.member_info, value: res.data.expect_data.value, amount: res.data.member_info.rate * res.data.expect_data.value / 100}
                    if (res.data.fund_info) {
                      if (res.data.helping_status === '0' || res.data.helping_status === '2' || res.data.helping_status === '5') {
                        that.info = {
                          name: res.data.fund_info.name,
                          helping_status: res.data.helping_status,
                          ...res.data.member_info,
                          rate: that.fundList[res.data.helping_status].title,
                          amount: that.fundList[res.data.helping_status].title,
                          hasRate: false
                        }
                      } else {
                        that.info = {
                          name: res.data.fund_info.name,
                          helping_status: res.data.helping_status,
                          ...res.data.member_info,
                          ...res.data.helping_data,
                          hasRate: true
                        }
                      }
                    } else {
                      that.noFund = true
                    }
                  }
                })
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            }
          }
        }
      }
    },
    handleRate () {
      this.form.amount = this.form.value * this.form.rate / 100
    },
    refuse () {
      const that = this
      that.$ajax.put(`/api/financing/application/` + that.id + '/', {helping_status: '2'}).then(res => {
        that.$message.success('拒绝成功')
        // 融资列表
        that.refuseVisible = false
        that.$ajax.get(`/api/financing/application/${that.id}/`).then(res => {
          if (res.status === 200) {
            that.member = {...res.data.member_info, value: res.data.expect_data.value, amount: res.data.member_info.rate * res.data.expect_data.value / 100}
            if (res.data.fund_info) {
              if (res.data.helping_status === '0' || res.data.helping_status === '2' || res.data.helping_status === '5') {
                that.info = {
                  name: res.data.fund_info.name,
                  helping_status: res.data.helping_status,
                  ...res.data.member_info,
                  rate: that.fundList[res.data.helping_status].title,
                  amount: that.fundList[res.data.helping_status].title,
                  hasRate: false
                }
              } else {
                that.info = {
                  name: res.data.fund_info.name,
                  helping_status: res.data.helping_status,
                  ...res.data.member_info,
                  ...res.data.helping_data,
                  hasRate: true
                }
              }
            } else {
              that.noFund = true
            }
          }
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .id_card {
    width: 840px;
    font-size: 14px;
    background: #fdfdfd;
    padding: 10px 20px;
    &>div {
      display: flex;
      align-items: center;
      .item_section {
        width: 50%;
        height: 48px;
        line-height: 48px;
        background-repeat: no-repeat;
        background-position: top right;
      }
      .item_money {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        span:fitst-child {
          width: 50%;
        }
        span:last-child {
          width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: right;
        }
      }
      .item_btn {
        width: 100%;
        text-align: center;
        line-height: 48px;
        span {
          text-decoration: underline;
          cursor: pointer;
          margin: 0 15px;
          color: #eb6100;
        }
      }
    }
    .reasons_for_refusal {
      h3 {
        font-size: 22px;
        color: #333;
        margin-bottom: 16px;
        .el-icon-info {
          color: #ef4242;
          display: inline-block;
          padding-right: 20px;
        }
      }
      div {
        textarea {
          width: 360px;
          height: 130px;
          border: 1px solid #eaeaea;
          outline: none;
          padding: 10px;
        }
      }
      button {
        width: 92px;
        height: 30px;
        outline: none;
        border: none;
        color: #fff;
        border-radius: 4px;
        margin: 16px 26px;
      }
      .ok {
        background: #eb6100;
      }
      .cancel {
        background: #d2d2d2;
      }
    }
  }
</style>
