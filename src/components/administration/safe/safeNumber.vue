<template>
  <div class="c_container">
    <!-- <AppNav :father='{selIndex: 11}' type='1'></AppNav> -->
    <div class="c_right_contents">
      <div class="c_item_box">
        <p class="c_item_title">手机绑定</p>
        <div class="c_item_center">
          <p :class="[bindData.isBindTel === '1' ? 'c_bk_img tel_sure' : 'c_bk_img tel_not']">{{bindData.isBindTel === '1' ? '已绑定' : '未绑定'}}</p>
          <div class="c_item_info">
            <p>保障账户中重要信息，在设置、修改登录密码等都需要手机短信验证及接受异常消息。绑定后可以使用手机号登入平台。</p>
          </div>
        </div>
        <div class="c_item_bottom">
          <button @click="handleClick(0)">{{ this.bindData.isBindTel === '1' ? '更改绑定' : '绑定手机号' }}</button>
        </div>
      </div>
      <div class="c_item_box">
        <p class="c_item_title">邮箱绑定</p>
        <div class="c_item_center">
          <p :class="[bindData.isBindEmail === '1' ? 'c_bk_img email_sure' : 'c_bk_img email_not']">{{bindData.isBindEmail === '1' ? '已绑定' : '未绑定'}}</p>
          <div class="c_item_info">
            <p>保障账户中重要信息，在设置、修改登录密码等都需要邮箱验证及接受异常消息。绑定后可以使用邮箱号登入平台。</p>
          </div>
        </div>
        <div class="c_item_bottom">
          <button @click="handleClick(1)">{{ this.bindData.isBindEmail === '1' ? '更改绑定' : '绑定邮箱' }}</button>
        </div>
      </div>
      <div class="c_item_box">
        <p class="c_item_title">修改密码</p>
        <div class="c_item_center">
          <p class="c_bk_img password_sure">修改密码</p>
          <div class="c_item_info">
            <p>平台登入密码，保障用户在平台操作隐私以及使用安全，请心牢记登录密码。</p>
          </div>
        </div>
        <div class="c_item_bottom">
          <button @click="handleClick(2)">修改密码</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import AppNav from '../../financing/financingManege'
export default{
  // components: {
  //   AppNav
  // },
  data () {
    return {
      bindData: {
        isBindTel: '',
        isBindEmail: ''
      }
    }
  },
  mounted () {
    this.$ajax.get('/api/account_info/?token=' + this.$token()).then(res => {
      if (res.data.code === '1') {
        // console.log(res.data.data.email)
        res.data.data.phone !== null ? this.bindData.isBindTel = '1' : this.bindData.isBindTel = '0'
        res.data.data.email !== null ? this.bindData.isBindEmail = '1' : this.bindData.isBindEmail = '0'
      }
    })
  },
  methods: {
    handleClick (index) {
      if (index === 0) {
        this.$router.push({path: '/telSafeDetail', query: {isBind: this.bindData.isBindTel}})
      } else if (index === 1) {
        this.$router.push({path: '/emailSafeDetail', query: {isBindTel: this.bindData.isBindTel, isBindEmail: this.bindData.isBindEmail}})
      } else {
        this.$router.push({path: '/pwdSafeDetail', query: {isBindTel: this.bindData.isBindTel, isBindEmail: this.bindData.isBindEmail}})
      }
    }
  }
}
</script>
<style lang="less">
  .c_container{
    width: 100%;
    display: flex;
    //padding-top: 70px;
    .c_right_contents{
      height: 100%;
      width: 100%;
      font-size: 14px;
      // width: 100%;
      .c_item_box{
        width: 600px;
        height: 270px;
        background: #fff;
        margin: 40px auto;
        .c_item_title{
          color: #fff;
          line-height: 50px;
          padding: 0 30px;
          background: #b1bec8;
          height: 50px;
        }
        .c_item_center{
          height: 150px;
          padding: 40px 40px 20px;
          display: flex;
          .c_bk_img{
            text-align: right;
            line-height: 150px;
            flex: 1;
            /*float: left;*/
            &.tel_sure{
               background: url("../../../../static/img/tel01.png") no-repeat left center;
               background-size: 80px 80px;
               color: #eb6100;
             }
            &.tel_not{
               background: url("../../../../static/img/tel02.png") no-repeat left center;
               background-size: 80px 80px;
               color: #333;
             }
            &.email_sure{
               background: url("../../../../static/img/email01.png") no-repeat left center;
               background-size: 80px 80px;
               color: #eb6100;
             }
            &.email_not{
               background: url("../../../../static/img/email02.png") no-repeat left center;
               background-size: 80px 80px;
               color: #333;
             }
            &.password_sure{
               background: url("../../../../static/img/password01.png") no-repeat left center;
               background-size: 80px 80px;
               color: #eb6100;
             }
            &.password_not{
               background: url("../../../../static/img/password02.png") no-repeat left center;
               background-size: 80px 80px;
               color: #333;
             }
          }
          .c_item_info{
            width: 335px;
            height: 100%;
            line-height: 30px;
            margin-left: 40px;
            /*float: right;*/
          }
        }
        .c_item_bottom{
          button{
            display: block;
            margin: 0 auto;
            border: none;
            background: #eb6100;
            color: #fff;
            outline: none;
            padding: 8px 34px;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
