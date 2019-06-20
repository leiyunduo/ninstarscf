<template>
  <div id="financing">
    <div class="flex-add">
      <div class="financing">
        <div class="list">
          <div class="echarts_list">
            <div class="list_nav">
              <h3>融资编号：</h3>
              <div class="select" style="padding-top:14px;">
                <el-select v-model="financing_data" size='small' @change="businessChange(financing_data)">
                  <el-option
                    v-for="item in financingName"
                    :key="item.id"
                    :label="item.id"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="list_data">
              <idCard :id='financing_data' v-if="financing_data && type === 1" />
              <idCardR :id='financing_data' v-if="financing_data && type === 0" />
              <div class="none" v-if="type === ''">暂无数据</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import idCard from './id_card'
import idCardR from './id_card_r'
export default {
  name: 'financing',
  data () {
    return {
      company_id: '',
      financing_data: '',
      financingName: [],
      type: ''
    }
  },
  components: {
    idCard,
    idCardR
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
    that.$ajax.get('/api/financing/statistics/?status__in=' + '1').then(res => {
      if (res.data.length > 0) {
        that.financing_data = res.data[0].id
        that.type = Number(res.data[0].type)
      }
      that.financingName = res.data
    })
  },
  methods: {
    businessChange (value) {
      const that = this
      let obj = {}
      obj = that.financingName.find((item)=>{ // 这里的userList就是上面遍历的数据源
        return item.id === value // 筛选出匹配数据
      })
      // 应收-0 订单-1
      that.type = Number(obj.type)
    }
  }
}
</script>

<style lang="less" scoped>
#financing {
  .financing {
    .list {
      .echarts_list {
        width: 100%;
        height:auto;
        background:rgba(255,255,255,1);
        margin-bottom: 20px;
        .list_nav {
          border-bottom: 1px solid rgba(221,221,221,1);
          height: 54px;
          padding: 0 20px;
          h3 {
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height: 54px;
            float: left;
          }
          .li_actives {
            border-bottom: 2px solid #eb6100;
            color: #eb6100;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:bold;
            color:rgba(235,97,0,1);
          }
          .select {
            select {
              min-width: 150px;
              width: auto;
              height: 30px;
              background: #fff;
              border: 1px solid #cccccc;
              color: #666;
              border-radius: 4px;
              font-size: 12px;
              padding: 0 10px;
              outline: none;
              cursor: pointer;
              margin-top: 14px;
            }
          }
        }
        .list_data {
          .none {
            background: #fff;
            line-height: 100px;
            padding: 0 20px;
            font-size: 18px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
