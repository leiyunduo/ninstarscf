<template>
  <div class="chain_section_wrap">
    <table class="chain_table" cellpadding='0' cellspacing='0'>
      <!-- table 标题 -->
      <tr class="chain_table_title">
        <td v-for="(item, index) in title" :key='index'>
          <div>{{item.name}}</div>
        </td>
      </tr>
      <!-- table 数据 -->
      <tr v-for="(item, index) in agentLine" :key='index' class="chain_table_line">
        <td>
          <div class="person-link--info" @click="getPersonInfoById(item.id, item.all_info.name)">{{item.all_info.name}}</div>
        </td>
        <td>
          <div>{{item.all_info.company}}</div>
        </td>
        <td>
          <div>{{item.all_info.phone}}</div>
        </td>
        <td style="color: #999">
          <div>未认证</div>
        </td>
        <td>
          <span @click="handleDelete(index, item.id)">删除</span>
        </td>
      </tr>
    </table>
    <!-- 添加/取消 按钮 -->
    <div class="add_profuct">
      <span>+</span>
      <span @click="handleAdd($event)">添加经办人</span>
    </div>
    <person-info v-if="dialogVisible" :pid="personId" :pName="personName" @closeView="closeview" :isAgent="true"/>
  </div>
</template>
<script>
import PersonInfo from '@/components/public/person-info'
export default {
  name: 'chainUploadEdit',
  components: {PersonInfo},
  data () {
    return {
      sw: 'show',
      dialogVisible: false,
      title: [
        {name: '姓名'},
        {name: '所属公司'},
        {name: '手机号'},
        {name: '人脸识别认证'},
        {name: '操作'}
      ],
      agentLine: [],
      personId: '',
      personName: ''
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    closeview () {
      this.dialogVisible = false
    },
    handleAdd ($event) {
      this.$emit('inviteAgent', 1)
    },
    handleDelete (index, fileId) {
      this.agentLine.splice(index, 1) 
    },
    getPersonInfoById (id, name) {
      this.personId = id
      this.personName = name
      this.dialogVisible = true
    }
  },
  mounted () {
    this.agentLine = this.tableData
  },
  watch: {
    tableData: function (ne, ol) {
      this.agentLine = ne
    }
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
}
.person-link--info {
  color: #eb6100;
  text-decoration: underline;
  cursor: pointer;
}
.chain_section {
  background: #fff;
}
.chain_section_wrap {
  background: #fff;
  width: 100%;
  margin: 0 auto;
}
.chain_table {
  border: none;
  width: 100%;
  .chain_table_title {
    opacity:0.49;
    background:#efefef;
    border-radius:4px 4px 0 0;
    width:100%;
    height:45px;
    width: 100%;
    td {
      width: 20%;
      text-align: center;
      font-size: 14px;
      color: #666;
      padding: 13px 0;
      line-height: 45px;
      div {
        height: 17px;
        line-height: 17px;
        border-right: 1px dashed #777;
      }
    }
    td:last-child div {
      border-right: none;
    }
  }
  .chain_table_line {
    height: 45px;
    left: 45px;
    text-align: center;
    color: #333;
    font-size: 14px;
    td {
      border-bottom: 1px solid #efefef;
      line-height: 45px;
      span {
        color: #eb6100;
        text-decoration: underline;
        margin: 0 12px;
        cursor: pointer;
      }
    }
  }
}
.add_profuct {
  line-height: 45px;
  background:#f0f2f7;
  width:100%;
  height:45px;
  text-align: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  span:first-child {
    font-size: 20px;
    font-weight: bolder;
  }
  span.cancel_btn {
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  input {
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
