<template>
  <div class='financeAdmittanceActiva'>
    <div class='info-enter'>
      <div class="top_name">
        <h3>企业账户激活</h3>
      </div>
      <div class='right'>
        <div class='top_ok'>
          <h3>尊敬的 [<span>{{ name }}</span>]</h3>
          <p>恭喜你，成功通过九星平台的企业资料审核</p>
          <p>完成下面的【验证银行账号】操作即可开始使用九星平台</p>
        </div>
        <div class='center_rule'>
          <h3>验证银行账号</h3>
          <p>九星平台已经于2018年4月2日 14:00通过“{{activa.ourAccount}}”账号向您以下银行账户随机打入一笔金额，请查询银行收支明细后正确填写</p>
          <div class='data_list'>
            <ul>
              <li><span>分行名称：</span><span>{{activa.bank_branch}}</span></li>
              <li><span>开户银行：</span><span>{{activa.opening_bank}}</span></li>
              <li><span>银行账号：</span><span>{{activa.bank_account}}</span></li>
              <li v-if="eId !== 1">
                <p>
                  银行卡收到的金额<input v-model.trim='money'>元
                  <span>* 您还有 <a href='#'>{{linum}}</a> 次机会</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="class_down">
          <div class="sel" @click="okMoney" v-if="eId !== 1">确认</div>
          <div class="reset_Form" @click="resetForm">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '',
      title: '金融机构信息',
      name: '',
      money: '',
      linum: '3',
      ourAccount: '',
      activa: {
        bank_branch: '',
        opening_bank: '',
        bank_account: ''
      },
      businessId: '',
      eId: '',
      // 是否变更
      change_apply: ''
    }
  },
  mounted () {
    var that = this
    that.businessId = localStorage.id
    that.eId = Number(that.$route.query.eId)
    that.change_apply = that.$route.query.change_apply
    that.$ajax.get(`/api/company/` + that.businessId).then(res => {
      if (res.data.detail_change === null) {
        that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
          that.activa = res.data.opening_bank_info
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        that.$ajax.get(`/api/company_detail/` + res.data.detail_change).then(res => {
          that.activa = res.data.opening_bank_info
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
      if (res.data.legal_person_change === null) {
        that.$ajax.get(`/api/person/` + res.data.legal_person).then(res => {
          that.name = res.data.name
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else {
        that.$ajax.get(`/api/person/` + res.data.legal_person_change).then(res => {
          that.name = res.data.name
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    okMoney () {
      if (!(/^[0-9]+.?[0-9]*$/.test(this.money))) {
        this.$message.error('请输入银行卡收到的金额')
      } else {
        this.$ajax.patch('/api/company/bank_active/', { amount: this.money }).then(res => {
          this.$router.push('/setting?signed=1')
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 返回
    resetForm () {
      this.$router.push('/setting?signed=1')
    }
  }
}
</script>
<style lang='less' scoped>
.financeAdmittanceActiva {
  min-height: 100%;
  background: #fff;
  padding: 40px 0;
  margin: 20px;
  box-sizing: border-box;
  .info-enter {
    position: relative;
    width: 100%;
    padding: 0 30px 0 40px;
    .top_name {
      width: 100%;
      h3 {
        font-size:18px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
    .top_title {
      background:#ffffff;
      border:1px solid #c3cad9;
      border-radius:4px;
      width:943px;
      height:124px;
      text-align: left;
      margin: 0 auto;
      padding: 0 20px;
      ul {
        padding-top: 32px;
        display: flex;
        flex-direction: row;
        li {
          position: relative;
          span {
            font-size: 16px;
            color: #333;
            position: absolute;
            top: 12px;
            left: 43px;
          }
          .color_class {
            color: #fff;
          }
        }
        li:first-child {
          span {
            left: 20px;
          }
        }
      }
    }
    .right {
      width:100%;
      height:auto;
      // margin-top: 35px;
      margin: 39px 0 0;
      .top_ok {
        height: 160px;
        border-bottom: 1px solid #edf2f5;
        h3 {
          font-size: 24px;
          color: #696969;
        }
        p {
          font-size: 16px;
          color: #b1bec8;
          padding-top: 20px;
        }
      }
      .center_rule {
        border-bottom: 1px solid #edf2f5;
        margin-top: 50px;
        padding-bottom: 50px;
        h3 {
          font-size: 24px;
          color: #696969;
          padding-bottom: 20px;
        }
        p {
          font-size: 16px;
          color: #696969;
          line-height: 28px;
        }
        .data_list {
          margin-top: 30px;
          ul {
            li {
              line-height: 48px;
              span {
                font-size: 16px;
                color: #afbcc7;
              }
              p {
                margin-top: 10px;
                input {
                  color: #333;
                  height: 30px;
                  border-radius: 5px;
                  background: none;
                  outline: none;
                  border: 1px solid #dcdfe6;
                  padding-left: 20px;
                  width: 200px;
                  margin: 0 20px;
                }
                span {
                  display: inline-block;
                  padding-left: 32px;
                  font-size: 16px;
                  a {
                    font-size: 20px;
                    color: #cc0000;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .class_down {
        text-align: center;
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        .reset_Form {
          cursor: pointer;
          outline: none;
          line-height: 32px;
          width:74px;
          height:32px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(220,220,220,1);
          box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
          border-radius:4px;
          font-size:14px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        div {
          margin: 0 30px;
        }
        .sel {
          cursor: pointer;
          outline: none;
          line-height: 32px;
          width:74px;
          height:32px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(220,220,220,1);
          box-shadow:0px 2px 4px 0px rgba(153,153,153,0.4);
          border-radius:4px;
          font-size:14px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
      }
    }
  }
}
</style>
