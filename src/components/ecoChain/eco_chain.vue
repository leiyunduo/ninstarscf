<template>
  <div class="eco_chain">
    <div class="search" v-if="Cdata.bank === 0">
      <div class="search_btn">
        <el-input placeholder="请输入公司名称搜索" suffix-icon="el-icon-search" style="max-width:500px" v-model="searchName"></el-input>
        <button @click="searchClick">搜索</button>
      </div>
    </div>
    <div class="content_list">
      <ecoList v-if="showHide === true" @listenEvent1='listenEvent1' />
      <ecoDetails v-if="showHide === false" :Cdata='Cdata' @listenEvent='listenEvent' />
    </div>
  </div>
</template>

<script>
import ecoList from './eco_list'
import ecoDetails from './eco_details'
export default {
  name: 'eco_chain',
  data () {
    return {
      searchName: '',
      showHide: true,
      roles: '',
      Cdata: {
        companyData: {},
        bank: 0
      }
    }
  },
  components: {
    ecoList,
    ecoDetails
  },
  mounted () {
    const that = this
    that.roles = localStorage.role
    if (that.roles !== 'business') {
      that.showHide = -1
    }
  },
  methods: {
    searchClick () {
      const that = this
      // this.Cdata.bank = 0
      that.$ajax.get('/api/chain/partner_company/cfca_search/?name=' + that.searchName).then(res => {
        if (res.data) {
          console.log(1)
          that.Cdata.companyData = res.data
          that.showHide = false
        } else {
          that.$message.warning('该企业不存在')
        }
      })
    },
    listenEvent1 (n, item, i) {
      this.Cdata.bank = i
      this.showHide = n
      this.searchName = item
      this.searchClick()
    },
    listenEvent (n, i) {
      this.showHide = n
      this.searchName = ''
      this.Cdata.bank = i
    }
  }
}
</script>

<style lang="less" scoped>
.eco_chain {
  margin: 20px;
  min-height: 100%;
  padding-top: 20px;
  .search {
    background: #fff;
    margin-bottom: 20px;
    width: 100%;
    height: 120px;
    text-align: center;
    padding-top: 40px;
    .search_btn {
      text-align: center;
      margin: 0 auto;
      max-width: 600px;
    }
    .el-input {
      float: left;
      .el-input__inner {
        border-radius: 4px 0 0 4px;
        border-right: none;
      }
    }
    button {
      width: 100px;
      height: 40px;
      background: #eb6100;
      border: none;
      outline: none;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      border-radius: 0 4px 4px 0;
      float: left;
    }
  }
  .content_list {
    background: #fff;
    margin-bottom: 20px;
    width: 100%;
    height: auto;
  }
}
</style>

<style lang="less">
.el-input {
  .el-input__inner {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }
}
</style>
