<template>
  <div class="self-grade-wraper">
    <div class="self-grade-view">
      <div class="self-grade">
        <el-form :label-position="labelPosition" v-if="isEdit" ref="form" :model="selfAppraisal" label-width="160px">
          <h4 class="form-title">我的企业素质</h4>
          <el-form-item label="企业基本素质：">
            <el-input type="textarea" v-model="selfAppraisal.basic_quality"></el-input>
          </el-form-item>
          <el-form-item label="偿还能力：">
            <el-select v-model="selfAppraisal.repaying_capability" style="width: 100% !important;" placeholder="请选择">
              <el-option label="0~100万" value="0~100万"></el-option>
              <el-option label="100万~300万" value="100万~300万"></el-option>
              <el-option label="300万~500万" value="300万~500万"></el-option>
              <el-option label="500万~1000万" value="500万~1000万"></el-option>
              <el-option label="1000万~5000万" value="1000万~5000万"></el-option>
              <el-option label="5000万~1亿" value="5000万~1亿"></el-option>
              <el-option label="1亿以上" value="1亿以上"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运营能力：">
            <el-input type="textarea" v-model="selfAppraisal.operation_ability"></el-input>
          </el-form-item>
          <el-form-item label="盈利能力：">
            <el-input type="textarea" v-model="selfAppraisal.profit_ability"></el-input>
          </el-form-item>
          <el-form-item label="成长能力：">
            <el-input type="textarea" v-model="selfAppraisal.growth_ability"></el-input>
          </el-form-item>
          <el-form-item label="企业资信情况：">
            <el-input type="textarea" v-model="selfAppraisal.credit_situation"></el-input>
          </el-form-item>
          <el-form-item label="企业运营情况：">
            <el-input type="textarea" size="medium" v-model="selfAppraisal.operation_situation"></el-input>
          </el-form-item>
          <h4 class="form-title">我的企业融资项下资产状况</h4>
          <el-form-item label="质押物状况：">
            <el-input type="textarea" v-model="selfAppraisal.pledge_situation"></el-input>
          </el-form-item>
          <el-form-item label="应收账款情况：">
            <el-input type="textarea" size="medium" v-model="selfAppraisal.receivables_situation"></el-input>
          </el-form-item>
          <h4 class="form-title">供应链关系状况</h4>
          <el-form-item label="与核心企业合作情况：">
            <el-input type="textarea" v-model="selfAppraisal.cooperation_situation"></el-input>
          </el-form-item>
          <h4 class="form-title">外部环境</h4>
          <el-form-item label="政策环境：">
            <el-input type="textarea" v-model="selfAppraisal.policy_environment"></el-input>
          </el-form-item>
          <el-form-item label="行业环境：">
            <el-input type="textarea" size="medium" v-model="selfAppraisal.industry_environment"></el-input>
          </el-form-item>
        </el-form>
        <el-form v-if="!isEdit" :label-position="labelPosition" :model="selfAppraisal" label-width="160px">
          <h4 class="form-title">我的企业素质</h4>
          <el-form-item label="企业基本素质：">
            <p class="content-viewer">{{selfAppraisal.basic_quality}}</p>
          </el-form-item>
          <el-form-item label="偿还能力：">
            <p class="content-viewer">{{selfAppraisal.repaying_capability}}</p>
          </el-form-item>
          <el-form-item label="运营能力：">
            <p class="content-viewer">{{selfAppraisal.operation_ability}}</p>
          </el-form-item>
          <el-form-item label="盈利能力：">
            <p class="content-viewer">{{selfAppraisal.profit_ability}}</p>
          </el-form-item>
          <el-form-item label="成长能力：">
            <p class="content-viewer">{{selfAppraisal.growth_ability}}</p>
          </el-form-item>
          <el-form-item label="企业资信情况：">
            <p class="content-viewer">{{selfAppraisal.credit_situation}}</p>
          </el-form-item>
          <el-form-item label="企业运营情况：">
            <p class="content-viewer">{{selfAppraisal.operation_situation}}</p>
          </el-form-item>
          <h4 class="form-title">我的企业融资项下资产状况</h4>
          <el-form-item label="质押物状况：">
            <p class="content-viewer">{{selfAppraisal.pledge_situation}}</p>
          </el-form-item>
          <el-form-item label="应收账款情况：">
            <p class="content-viewer">{{selfAppraisal.receivables_situation}}</p>
          </el-form-item>
          <h4 class="form-title">供应链关系状况</h4>
          <el-form-item label="与核心企业合作情况：">
            <p class="content-viewer">{{selfAppraisal.cooperation_situation}}</p>
          </el-form-item>
          <h4 class="form-title">外部环境</h4>
          <el-form-item label="政策环境：">
            <p class="content-viewer">{{selfAppraisal.policy_environment}}</p>
          </el-form-item>
          <el-form-item label="行业环境：">
            <p class="content-viewer">{{selfAppraisal.industry_environment}}</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    props: ['isEdit'],
    name: '',
    data () {
      return {
        labelPosition: '',
        businessId: '',
        detailId: ''
      }
    },
    computed: {
      ...mapState({
        selfAppraisal: status => status.homePage.selfAppraisal
      })
    },
    mounted () { 
      this.businessId = localStorage.id
    },
    methods: { 
      save () {
        this.$ajax.patch(`/api/company_detail/` + this.selfAppraisal.desc + '/', {self_appraisal: this.selfAppraisal, partial: true}).then(res => {
          this.$emit('closeEditer', false)
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      getSelfAppraisal (detailId) {
        this.$ajax.get(`/api/company_detail/` + detailId).then(res => {
          if (res.data.self_appraisal) {
            this.$store.commit('homePage/setSelfAppraisal', {...res.data.self_appraisal, ...{detailId}})
          }
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      }
    },
    watch: {
      isEdit (newer, older) {
        if (!newer) {
          this.getSelfAppraisal(this.selfAppraisal.desc)
        }
      }
    }
  }
</script>
<style>
.el-textarea__inner {
  height: 85px;
}
</style>

<style lang='less' scope>
  .self-grade-wraper {
    .self-grade-view {
      .self-grade {
        padding: 20px 30px;
        margin: 20px;
        .form-title {
          font-size: 14px;
          color: #333333;
          margin-bottom: 29px;
          display: inline-block;
          padding-left: 8px;
          border-left: 4px solid #eb6100; 
        }
        .content-viewer {
          padding: 0 15px;
          color: #606266;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          line-height: 2.2em;
          min-height: 85px;
        }
      }
    }
  }
</style>