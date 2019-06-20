<template>
  <div id="select_option">
    <span>年统计时间：</span>
    <el-select v-model="svalue" size='mini' placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      svalue: '',
      company_id: ''
    }
  },
  props: {
    //接受外部v-model传入的值
    value: {
      type: String
    }
  },
  watch: {
    //判断下拉框的值是否有改变
    svalue(val, oldVal) {
      if (val !== oldVal) {
        this.$emit("input", this.svalue)
      }
    }
  },
  mounted () {
    const that = this
    that.svalue = that.value
    that.company_id = localStorage.id
    that.$ajax.get('/api/oth/transaction_statistics/year_list/?company_id=' + that.company_id).then(res => {
      that.options = that._dataTransform(res.data)
    }).catch(error => {
      console.log(error)
      that.$message.error('')
    })
  },
  methods: {
    _dataTransform(data) {
      const that = this
      let _data = []
      for (let i = 0; i < data.length; i++) {
        _data[i] = {}
        _data[i].label = data[i]
        _data[i].value = data[i]
      }
      return _data
    }
  }
}
</script>

<style lang="less" scoped>
#select_option {
  height: 54px;
  padding-top: 14px;
  span {
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
}
</style>
