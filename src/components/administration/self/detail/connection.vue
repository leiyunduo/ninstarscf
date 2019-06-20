<template>
  <div class="connection-wraper">
    <div class="connection-view">
      <div class="connection-info" v-show="!isEdit">
        <el-form :label-position="labelPosition" label-width="150px" size="small" :model="connectionInfo">
          <el-form-item label="联系人：">
            <span >{{connectionInfo.contact_person || '暂无数据'}}</span>
          </el-form-item>
          <el-form-item label="公司地址：">
            <span >{{(connectionInfo.address) || '暂无数据'}}</span>
          </el-form-item>
          <el-form-item label="联系电话：">
            <span >{{(connectionInfo.phone) || '暂无数据'}}</span>
          </el-form-item>
          <el-form-item label="邮政编码：">
            <span >{{(connectionInfo.postal_code) || '暂无数据'}}</span>
          </el-form-item>
          <el-form-item label="公司电话：">
            <span >{{(connectionInfo.company_phone) || '暂无数据'}}</span>
          </el-form-item>
          <el-form-item label="公司传真：">
            <span >{{connectionInfo.fax || '暂无数据'}}</span>
          </el-form-item>
          <el-form-item label="公司邮箱：">
            <span >{{(connectionInfo.email) || '暂无数据'}}</span>
          </el-form-item>
          <el-form-item label="公司网址：">
            <span>{{(connectionInfo.website) || '暂无数据'}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="connection-info" v-show="isEdit">
        <el-form :label-position="labelPosition" label-width="90px" size="small" :model="connectionInfo">
          <el-form-item label="联系人：">
            <el-input v-model="connectionInfo.contact_person"></el-input>
          </el-form-item>
          <el-form-item label="公司地址：">
            <el-input v-model="connectionInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="connectionInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码：">
            <el-input v-model="connectionInfo.postal_code"></el-input>
          </el-form-item>
          <el-form-item label="公司电话：">
            <el-input v-model="connectionInfo.company_phone"></el-input>
          </el-form-item>
          <el-form-item label="公司传真：">
            <el-input v-model="connectionInfo.fax"></el-input>
          </el-form-item>
          <el-form-item label="公司邮箱：">
            <el-input v-model="connectionInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="公司网址：">
            <el-input v-model="connectionInfo.website"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: '',
    props: ['isEdit'],
    data () {
      return {
        labelPosition: 'right',
        _catch: {}
      }
    },
    methods: { 
      submit () {
        this.$ajax.patch(`/api/company_detail/` + this.connectionInfo.desc + '/', {contact_info: this.connectionInfo, partial: true}).then(res => {
          let desc = this.connectionInfo.desc
          this.$store.commit('homePage/setConnectionInfo', {...res.data.contact_info, ...{desc}})
          this.$emit('closeEditer', false)
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      getConnect () {
        this.$ajax.get(`/api/company_detail/` + this.connectionInfo.desc).then(res => {
          if (res.data.contact_info) {
            let desc = this.connectionInfo.desc
            this.$store.commit('homePage/setConnectionInfo', {...res.data.contact_info, ...{desc}})
          }
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      }
    },
    computed: {
      ...mapState({
        connectionInfo: status => status.homePage.connectionInfo
      })
    },
    watch: {
      isEdit (newer, older) {
        if (!newer) {
          this.getConnect()
        }
      }
    }
  }
</script>
<style lang='less' scope>
  .connection-wraper {
    .connection-view {
      .connection-info {
        padding: 20px 30px;
        margin: 20px;
      }
    }
  }
</style>