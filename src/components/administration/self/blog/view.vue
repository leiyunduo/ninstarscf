<template>
  <div class="blog-view-wraper">
    <div class="blog-view">

    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: ['bid'],
    data () {
      return {
 
      }
    },
    mounted () { 
 
    },
    methods: { 
      getNews () {
        if (this.bid) {
          this.$ajax.get(`/api/home_page/news/` + this.bid).then(res => {
            this.blogList = res.data
            this.bodys = res.data.body
          }).catch(err => {
            this.$message.error(err.response.data.err_msg)
          })
        }
      }
    }
  }
</script>
<style lang='less' scope>
 
</style>