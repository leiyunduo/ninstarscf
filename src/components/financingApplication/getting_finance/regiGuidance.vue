<template>
  <div id="regiGuidance">
    <h3>中登网/中征网登记</h3>
    <p>登记是指用户通过互联网在线将相关登记信息录入并提交，登记平台接受登记信息的过程。登记包括初始登记、变更登记、展期登记、注销登记、异议登记五种类型。</p>
    <p>用户所做的登记，只有在确认提交后才会真正进入登记平台；而在登记未正式提交前，可随时点击页面上的“返回主页”按钮，终止此次登记。</p>
    <p>操作员用户可在登录系统后的“登记入口”区域选择登记类型（包括初始登记、变更登记、展期登记、注销登记、异议登记）。</p>
    <img src="../../../../static/img/other/u106.jpg" alt="" style="display:block;">
    <p>选择好登记类型后，进入业务交易类型选择页面</p>
    <img src="../../../../static/img/other/u108.jpg" alt="" style="display:block;">
    <p>例如，操作员点击<img src="../../../../static/img/other/u110.jpg" alt="">后进入业务交易类型页面，选择业务交易类型进行登记</p>
    <h4>整个初始登记的流程分为以下几个部分：</h4>
    <ul>
      <li>输入填表人/基本信息</li>
      <li>增加出质人信息</li>
      <li>增加质权人信息</li>
      <li>录入质押财产信息</li>
      <li>上传质押财产附件</li>
      <li>预览登记信息</li>
      <li>提交登记信息</li>
    </ul>
    <p>其他登记与其类似，如有疑问，请访问<a @click="aclick">https://www.zhongdengwang.org.cn/zhongdeng/czsc/common_list.shtml</a></p>
  </div>
</template>
<script>
export default {
  methods: {
    aclick () {
      window.open('https://www.zhongdengwang.org.cn/zhongdeng/czsc/common_list.shtml')
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 16px;
  font-weight: bold;
}
p {
  padding: 3px 0;
}
ul {
  li {
    list-style: outside;
    margin-left: 20px;
  }
}
a {
  color: #eb6100;
  cursor: pointer;
}
</style>

