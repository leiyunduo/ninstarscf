<template>
  <div class="ns-side-bar">
    <div class="side-bar-wraper">
      <div class="side-bar-menu">
        <div class="side-bar-menu__item" @click="changeTab(index)" :class="tabIndex === index ? 'tab-actived' : ''" v-for="(item, index) in sideBarDatas" :key="index">{{item}}</div>
        <div class="side-bar-ink tab-ink-animated" :style="tabInk"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      sideBarDatas: {
        type: Array,
        default: () => []
      },
      signeds: {
        type: Number,
        default: () => []
      },
      isSigned: {
        type: Boolean
      }
    },
    data () {
      return {
        tabIndex: 0,
        tabInk: ''
      }
    },
    watch: {
      signeds: {
        immediate: true,    // 这句重要
        handler (val) {
          this.tabIndex = val
          this.tabInk = `transform: translate3d(0px, ${49 * val}px, 0px)`
        }
      }
    },
    methods: { 
      changeTab (index) {
        if(!this.isSigned && index !== 1) {
          this.$message.warning('请先进行认证')
          return
        }
        this.tabIndex = index
        this.tabInk = `transform: translate3d(0px, ${49 * index}px, 0px)`
        this.$emit('click', index)
      }
    }
  }
</script>
<style lang='less' scope>
  .side-bar-wraper {
    width: 160px;
    .side-bar-menu {
      text-align: left;
      color: #666;
      font-size: 14px;
      position: relative;
      &>.side-bar-ink {
        position: absolute;
        height: 39px;
        width: 2px;
        right: -1px;
        top: 0;
        background: #eb6100;
        &.tab-ink-animated {
          transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }
      .side-bar-menu__item {
        padding: 10px 12px 10px 30px;
        margin-bottom: 10px;
        -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        cursor: pointer;
        &:active {
          .ns-tab-active(#eb6100, txt);
        }
        &:hover {
          .ns-tab-hover(#eb6100, txt);
        }
        &.tab-actived {
          color: #eb6100;
          background: rgba(235,97,0, .1);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }
    }
  }
</style>