<template>
  <div class="app">
    <base-layout/>
  </div>
</template>

<script>
import baseLayout from '@/components/layout/BaseLayout'
export default {
  components: {
    baseLayout
  },
  name: 'App'
}
</script>

<style lang="less" scoped>
  .app {
    width: 100%;
    min-height: 100%;
    background: #f5f7f8;
  }
  .nav_link {
    height: 60px;
    background: #f7f7f7;
    width: 100%;
    display: flex;
    position: fixed;
    top:70px;
    li{
      height: 100%;
      width: 100px;
      line-height: 60px;
      cursor: pointer; 
      text-align: center;
      a {
        color: #333;
        text-decoration: none;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
