<template>
  <div class="nav_bar">
    <div class="order_nav">
      <ul>
        <li v-for="(item, index) in buttonList" :key="index" :class="{active_li: showIndex === index}" @click="navClick(item, index)">
          <p>{{item.name}}</p>
        </li>
        <li @click="addChanges" v-if="btnStatus === '1' && is_active" >
          <p><i class="el-icon-plus"></i>添加变更</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  props: ['buttonList', 'btnStatus'],
  data () {
    return {
      showIndex: -1,
      is_active: true
    }
  },
  methods: {
    navClick (item, i) {
      var that = this
      that.showIndex = i
      let _obj = {
        _index: i,
        _item: item
      }
      that.$emit('changeItem', _obj)
    },
    // 添加变更
    addChanges () {
      var that = this
      this.is_active = false
      this.buttonList.push({name: ``})
      this.buttonList[this.buttonList.length-1].name = `变更${this.buttonList.length-1}`
      let _obj = {
        prev_id: this.buttonList[this.buttonList.length-2].id,
        _index: this.buttonList.length - 1
      }
      that.$emit('addChange', _obj)
    }
  },
  watch: {
    buttonList: function (ne, ol) {
      this.showIndex = this.buttonList.length - 1
    }
  }
}
</script>

<style lang="less" scoped>
.nav_bar {
  margin-top: 20px;
  .order_nav {
    background:#ffffff;
    width:100%;
    height:42px;
    ul {
      display: flex;
      flex-direction: row;
      // border-bottom: 3px solid #e87626;
      li {
        min-width: 120px;
        padding: 0 8px;
        text-align: center;
        height: 42px;
        cursor: pointer;
        p {
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#999999;
          letter-spacing:0;
          text-align:center;
          font-weight: bold;
          padding-top: 11px;
        }
      }
      .active_li {
        background:#e87626;
        p {
          color: #fff;
        }
      }
    }
  }
}
</style>
