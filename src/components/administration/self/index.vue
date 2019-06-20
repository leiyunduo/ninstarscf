<template>
  <div class="home">
    <div class="home-wraper">
      <el-row :gutter="20">
        <el-col :sm="24" :md="9" :lg="7"><introduction/></el-col>
        <el-col :sm="24" :md="15" :lg="17"><main-box/></el-col>
      </el-row>  
    </div>
  </div>
</template>

<script>
  import introduction from './self_introduction'
  import mainBox from './main'
  export default {
    name: 'homePage',
    components: {
      introduction,
      mainBox
    },
    data () {
      return {
      }
    },
    mounted () { 
    },
    methods: { 
 
    }
  }
</script>
<style lang='less' scope>
@import url('../../../../layout/stylesheets/components/grid.less');
  .home-wraper {
    width: 100%;
    height: 100%;
    padding: 20px;
    .home-view {
      display: flex;
    }
  }
</style>