<template>
  <div class='selfRating'>
    <div class="forms">
      <div class="card_title">
        <h3>自我评级</h3>
        <div class="button">
          <button class="sel" @click="selfRat">{{ editTitle }}</button>
          <button class="cancel" v-if="editTitle === '保存'" @click="selfCancel">取消</button>
        </div>
      </div>
      <div class="list_self1">
        <h3>我的企业素质</h3>
        <div class="flex-box">
          <div class="self_box">
            <p>企业基本素质</p>
            <textarea style="padding: 10px;" name="" id="" cols="28" rows="6" maxlength='256'  v-model.trim="listTables.basic_quality" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.basic_quality !== null">{{ listTable.basic_quality }}</span>
              <span v-if="listTable.basic_quality === null">暂无数据</span>
            </div>
          </div>
          <div class="self_box1">
            <p>偿债能力</p>
            <el-form v-show="inputContant" style="margin-left: 27px;">
              <el-form-item>
                <el-select v-model.trim="listTables.repaying_capability" placeholder="请选择">
                  <el-option label="0～100万" value="0～100万"></el-option>
                  <el-option label="100万～300万" value="100万～300万"></el-option>
                  <el-option label="300万～500万" value="300万～500万"></el-option>
                  <el-option label="500万～1000万" value="500万～1000万"></el-option>
                  <el-option label="1000万～5000万" value="1000万～5000万"></el-option>
                  <el-option label="5000万～1亿" value="5000万～1亿"></el-option>
                  <el-option label="1亿以上" value="1亿以上"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div v-show="selectContant">
              <span v-if="listTable.repaying_capability !== null">{{ listTable.repaying_capability }}</span>
              <span v-if="listTable.repaying_capability === null">暂无数据</span>
            </div>
          </div>
          <div class="self_box1">
            <p>营运能力</p>
            <textarea style="padding: 10px;" name="" id="" cols="28" rows="6" maxlength='256'  v-model.trim="listTables.operation_ability" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.operation_ability !== null">{{ listTable.operation_ability }}</span>
              <span v-if="listTable.operation_ability === null">暂无数据</span>
            </div>
          </div>
          <div class="self_box1">
            <p>盈利能力</p>
            <textarea style="padding: 10px;" name="" id="" cols="28" rows="6" maxlength='256'  v-model.trim="listTables.profit_ability" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.profit_ability !== null">{{ listTable.profit_ability }}</span>
              <span v-if="listTable.profit_ability === null">暂无数据</span>
            </div>
          </div>
          <div class="self_box1">
            <p>成长能力</p>
            <textarea style="padding: 10px;" name="" id="" cols="28" rows="6" maxlength='256'  v-model.trim="listTables.growth_ability" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.growth_ability !== null">{{ listTable.growth_ability }}</span>
              <span v-if="listTable.growth_ability === null">暂无数据</span>
            </div>
          </div>
          <div class="self_box">
            <p>企业资信情况</p>
            <textarea style="padding: 10px;" name="" id="" maxlength='256'  v-model.trim="listTables.credit_situation" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.credit_situation !== null">{{ listTable.credit_situation }}</span>
              <span v-if="listTable.credit_situation === null">暂无数据</span>
            </div>
          </div>
          <div class="self_box">
            <p>企业运营情况</p>
            <textarea style="padding: 10px;" cols="60" rows="6" maxlength='256'  v-model.trim="listTables.operation_situation" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.operation_situation !== null">{{ listTable.operation_situation }}</span>
              <span v-if="listTable.operation_situation === null">暂无数据</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list_self1">
        <h3>我的企业融资项下资产状况</h3>
        <div class="flex-box">
          <div class="self_box">
            <p>质押物状况</p>
            <textarea style="padding: 10px;" name="" id="" cols="60" rows="6" maxlength='256'  v-model.trim="listTables.pledge_situation" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.pledge_situation !== null">{{ listTable.pledge_situation }}</span>
            <span v-if="listTable.pledge_situation === null">暂无数据</span>
            </div>
          </div>
          <div class="self_box">
            <p>应收账款情况</p>
            <textarea style="padding: 10px;" name="" id="" cols="60" rows="6" maxlength='256'  v-model.trim="listTables.receivables_situation" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.receivables_situation !== null">{{ listTable.receivables_situation }}</span>
              <span v-if="listTable.receivables_situation === null">暂无数据</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list_self1">
        <h3>供应链关系状况</h3>
        <div class="self_box">
          <p>与核心企业合作情况</p>
          <textarea style="padding: 10px;" name="" id="" cols="60" rows="6" maxlength='256'  v-model.trim="listTables.cooperation_situation" v-show="inputContant"></textarea>
          <div v-show="selectContant">
            <span v-if="listTable.cooperation_situation !== null">{{ listTable.cooperation_situation }}</span>
            <span v-if="listTable.cooperation_situation === null">暂无数据</span>
          </div>
        </div>
      </div>
      <div class="list_self1">
        <h3>外部环境</h3>
        <div class="flex-box">
          <div class="self_box">
            <p>政策环境</p>
            <textarea style="padding: 10px;" name="" id="" cols="60" rows="6" maxlength='256'  v-model.trim="listTables.policy_environment" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span class="border_span" v-if="listTable.policy_environment !== null">{{ listTable.policy_environment }}</span>
              <span class="border_span" v-if="listTable.policy_environment === null">暂无数据</span>
            </div>
          </div>
          <div class="self_box">
            <p>行业环境</p>
            <textarea style="padding: 10px;" name="" id="" cols="60" rows="6" maxlength='256'  v-model.trim="listTables.industry_environment" v-show="inputContant"></textarea>
            <div v-show="selectContant">
              <span v-if="listTable.industry_environment !== null">{{ listTable.industry_environment }}</span>
              <span v-if="listTable.industry_environment === null">暂无数据</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'selfRating',
      id: '',
      inputContant: false,
      selectContant: true,
      editTitle: '编辑',
      listTable: {
        policy_environment: '',
        industry_environment: '',
        basic_quality: '',
        repaying_capability: '',
        operation_ability: '',
        profit_ability: '',
        growth_ability: '',
        cooperation_situation: '',
        pledge_situation: '',
        receivables_situation: '',
        credit_situation: '',
        operation_situation: ''
      },
      listTables: {
        policy_environment: '',
        industry_environment: '',
        basic_quality: '',
        repaying_capability: '',
        operation_ability: '',
        profit_ability: '',
        growth_ability: '',
        cooperation_situation: '',
        pledge_situation: '',
        receivables_situation: '',
        credit_situation: '',
        operation_situation: ''
      },
      businessId: '',
      detailId: ''
    }
  },
  mounted () {
    var that = this
    this.id = this.$route.params.id
    that.businessId = localStorage.id
    that.$ajax.get(`/api/company/` + that.businessId).then(res => {
      that.detailId = res.data.detail
      that.$ajax.get(`/api/company_detail/` + res.data.detail).then(res => {
        if (res.data.self_appraisal) {
          this.listTable = res.data.self_appraisal
          this.listTables = res.data.self_appraisal
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 取消
    selfCancel () {
      var that = this
      that.$ajax.get(`/api/company_detail/` + that.detailId).then(res => {
        this.listTable = res.data.self_appraisal
        this.listTables = res.data.self_appraisal
        this.selectContant = true
        this.inputContant = false
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 保存
    selfRat () {
      var that = this
      if (this.editTitle === '编辑') {
        this.editTitle = '保存'
        this.selectContant = false
        this.inputContant = true
        this.listTable = ''
      } else if (this.editTitle === '保存') {
        this.editTitle = '编辑'
        this.selectContant = true
        this.inputContant = false
        this.$ajax.patch(`/api/company_detail/` + that.detailId + '/', {self_appraisal: that.listTables, partial: true}).then(res => {
          this.listTable = res.data.self_appraisal
          this.listTables = res.data.self_appraisal
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.selfRating {
  width: 100%;
  padding: 0 30px;
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
      color:#fff;
      border: none;
      outline: none;
      margin: 0;
      background:#f48537;
      border-radius:4px;
      width:80px;
      height:28px;
    }
  }
  .list_self1 {
    height: auto;
    background: #fff;
    width: 100%;
    text-align: left;
    padding: 20px 20px;
    h3 {
      padding: 0 0 0 27px;
      margin: 6px 0 10px 0;
      font-family:PingFangSC-Medium;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      font-weight: bold;
    }
    .self_box {
      width: 100%;
      height: auto;
      margin-left: 27px;
      margin-bottom: 10px;
      p {
        padding-bottom: 5px;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#666666;
        letter-spacing:0.17px;
        text-align:left;
      }
      input {
        background:#ffffff;
        border:1px solid #cccccc;
        border-radius:4px;
        width:610px;
        min-height:58px;
        height: auto;
      }
      span {
        background:#ffffff;
        border:1px solid #cccccc;
        border-radius:4px;
        width:610px;
        min-height:58px;
        height: auto;
        display: inline-block;
        padding: 7px 17px;
        margin: 7px 30px;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#999;
        letter-spacing:0.17px;
        text-align:left;
      }
    }
    .self_box1 {
      width: 100%;
      height: auto;
      margin-left: 27px;
      margin-bottom: 10px;
      p {
        padding-bottom: 5px;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#666666;
        letter-spacing:0.17px;
        text-align:left;
      }
      span {
        background:#ffffff;
        border:1px solid #cccccc;
        border-radius:4px;
        width:610px;
        min-height:58px;
        height: auto;
        display: inline-block;
        padding: 7px 17px;
        margin: 7px 30px;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#999;
        letter-spacing:0.17px;
        text-align:left;
      }
      .el-select {
        width: 220px;
        height: 22px !important;
      }
    }
  }
  .button {
    button {
      width: 90px;
      height: 28px;
      line-height: 28px;
      outline: none;
      border-radius: 5px;
      margin: 0 10px;
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
}
textarea {
  background:#ffffff;
  border:1px solid #cccccc;
  border-radius:4px;
  width:610px;
  min-height:58px;
  height: auto;
  display: inline-block;
  padding: 7px 17px;
  margin: 7px 30px;
  font-family:PingFangSC-Regular;
  font-size:14px;
  color:#999;
  letter-spacing:0.17px;
  text-align:left;
  outline: none;
}
</style>
