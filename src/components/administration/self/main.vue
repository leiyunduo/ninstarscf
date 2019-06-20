<template>
  <div class="container-wraper">
    <div class="container-view">
      <div class="container-inner">
        <div class="tab-menu-wraper">
          <div class="tab-menu">
            <div>
              <div class="tab-menu__item" @click="changeTab(index)" :class="tabIndex === index ? 'tab-active' : ''" v-for="(item, index) in tabList" :key="index">{{item}}</div>
            </div>
            <div class="tab-ink tab-ink-animated" :class="tabIndex === 0 ? 'tab-ink-active-first' : (tabIndex === 1 ? 'tab-ink-active-second' : 'tab-ink-active-third')"></div>
          </div>
        </div>
        <div class="content-wraper">
          <div class="content-view">
            <detail v-if="tabIndex === 0"/>
            <blog v-if="tabIndex === 1"/>
            <supply v-if="tabIndex === 2"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import detail from './detail/index'
  import blog from './blog/index'
  import supply from './supply/index'
  export default {
    name: '',
    data () {
      return {
        tabList: ['企业信息', '企业博客', '供需发布'],
        tabIndex: 0
      }
    },
    components: {detail, blog, supply},
    mounted () { 
 
    },
    methods: { 
      changeTab (index) {
        this.tabIndex = index
      },
    }
  }
</script>
<style lang='less' scope>
  .container-wraper {
    height: 100%;
    background:rgba(255,255,255,1);
    .container-view {
      .container-inner {
        .tab-menu-wraper {
          .tab-menu {
            position: relative;
            border-bottom: 1px solid #e8e8e8;
            box-sizing: border-box;
            padding: 11px 21px 5px 21px;
            .tab-menu__item {
              display: inline-block;
              height: 100%;
              margin: 0 52px 0 0;
              padding: 12px 16px;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              cursor: pointer;
              position: relative;
              text-decoration: none;
              user-select: none;
              &:last-of-type {
                margin: 0;
              }
              &:hover {
                color: lighten(#eb6100, 15%);
                font-weight: 500;
                transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              }
              &:active {
                color: darken(#eb6100, 20%);
                transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                font-weight: 500;
              }
              &.tab-active {
                color: #eb6100;
                font-weight: bolder;
              }
            }
            .tab-ink {
              z-index: 1;
              position: absolute;
              left: 30px;
              bottom: 0;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              height: 2px;
              background-color: #eb6100;
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              &.tab-ink-active-first {
                display: block;
                transform: translate3d(0px, 0px, 0px);
                width: 80px;
              }
              &.tab-ink-active-second {
                display: block;
                transform: translate3d(148px, 0px, 0px);
                width: 80px;
              }
              &.tab-ink-active-third {
                display: block;
                transform: translate3d(296px, 0px, 0px);
                width: 80px;
              }
              &.tab-ink-animated {
                transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              }
            }
          }
        }
        .content-wraper {
          min-height:  720px;
        }
      }
    }
  }
</style>