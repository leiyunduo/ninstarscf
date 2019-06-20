<template>
  <div class="recharge">
    <form id="form" :action="roleForm.url" method="post">
      <input name="message" type="hidden" v-model="roleForm.message"/>
      <input name="signature" type="hidden" v-model="roleForm.signature"/>
    </form>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        roleForm: {
          url: '',
          message: '',
          signature: ''
        }
      }
    },
    mounted () {
      this.roleForm.url = decodeURIComponent(this.$route.query.url)
      this.roleForm.message = decodeURIComponent(this.$route.query.message)
      this.roleForm.signature = decodeURIComponent(this.$route.query.signature)
      let form = document.getElementById('form')
      setTimeout(()=>{
        form.submit()
      }, 100)
    }
  }
</script>