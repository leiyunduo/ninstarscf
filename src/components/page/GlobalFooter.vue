<template>
  <div class="footer-base">
    <div class="links">
      <a href="#" target="_blank">
        帮助
      </a>
      <a href="#">隐私</a>
      <a href="#">条款</a>
    </div>
    <div class="copyright">
      Copyright © 2019 <span>北京九星惟诚供应链信息技术有限公司</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style lang="less" scoped>
  .footer-base {
    padding: 20px 16px 20px;
    // margin: 48px 0 24px;
    text-align: center;
    background: #f5f7f8;
    .links {
      margin-bottom: 8px;
      a {
        color: rgba(0, 0, 0, .45);
        &:hover {
          color: rgba(0, 0, 0, .65);
        }
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }
</style>
