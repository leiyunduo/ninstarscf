 <template>
 <div class="agreement">
  <!-- <div class="a_title">{{ours.name}}</div> -->
  <h3 class="c_title_name">三方协议</h3>
  <div class="agreement_wrap">
    <div class="agreement_detail">
      <!-- <h3 class="c_title_name">三方协议</h3> -->
      <p class="c_first_title">重要提示：</p>
      <div class="c_sec_box">
        <p>在您完成融资撮合前，请您务必仔细阅读本协议项下所有条款，尤其是协议中加粗用以提示您进行深入了解的条款，当您充分理解各条款内容后，你可选择是否接受本协议约束并进行融资撮合。当您在九星供应链交易大数据增信平台(以下简称“九星平台”)点击“提交”按钮后，即意味着您已阅读本协议所有条款，并对本协议条款的含义及相应的法律后果已全部知晓并充分理解，同意接受本协议约束。</p>
      </div>
      <p class="c_first_title">一、九星平台承诺</p>
      <div class="c_sec_box">
        <p>1.1 为更好地向您提供产品和服务以及保护各方的合法权益，九星平台承诺，九星平台不会随意更改企业在平台上登记的链式记账、我的资产（包括总资产、应付融资、应收融资、借贷历史、信用评估）、债权/债务的数据信息。</p>
        <p>1.2 九星平台有义务配合金融机构，对在九星平台向其融资的借贷方进行相关贷前、贷中、贷后管理。</p>
      </div>
      <p class="c_first_title">二、借贷方承诺</p>
      <div class="c_sec_box">
        <p>2.1 凡是在九星平台上产生的数据信息（包括但不限于链式记账、我的资产、债权、债务、交易数据、交易票据、交易单证）都合法、真实、准确、完整和有效；资料发生变化时，按照约定，及时通知九星平台与金融机构。</p>
        <p>2.2 若您提供任何不真实、不准确、不完整或失效的身份信息，您应于金融机构规定的期限内予以补正。</p>
        <p>2.3 在融资过程中发生债权债务的转移，应当及时通知相关债权债务人与金融机构，并通知九星平台。</p>
        <p>2.4 融资申请成功后，借贷方有义务将贷前、贷中及贷后情况反馈给九星平台。</p>
      </div>
      <p class="c_first_title">三、金融机构承诺</p>
      <div class="c_sec_box">
        <p>3.1 借贷方通过九星平台向金融机构融资的过程中，金融机构有义务将借贷方的贷前、贷中、贷后状况反馈给九星平台，便于九星平台对借贷方进行信用评估与征信评估。</p>
      </div>
      <p class="c_first_title">四、免责声明</p>
      <div class="c_sec_box">
        <p>4.1 因企业（包括但不限于链式记账、我的资产、债权、债务、交易数据、交易票据、交易单证）信息不真实给相关方带来的损失，九星平台不承担任何责任；九星平台对用户所发布信息的真实性或储存失败不承担任何责任。</p>
        <p>4.2 用户双方因交易而产生的任何风险，包括但不限于融资损失，应由交易双方承担，九星平台对此不提供任何形式的担保。</p>
        <p>4.3 您将对您发布的信息及其他在九星平台上发生的任何行为承担责任，九星平台对此不负任何责任。</p>
      </div>
    </div>
  </div>
  <div class="agreement_info">{{ours.tip}}</div>
 </div>
</template>

<script>
export default {
  name: 'agreement',
  data () {
    return {
      ours: {
        name: '九星',
        tip: '九星将获得甲方和乙方的融资相关数据'
      }
    }
  }
}
</script>

<style scoped lang="less">
  .agreement {
    background: #fff;
    margin-top: 20px;
    padding: 30px 20px;
    border: 1px solid #e1e6f0;
    font-size: 14px;
    .a_title {
      line-height: 40px;
    }
    .c_title_name{
      text-align: center;
      font-size: 17px;
      font-weight: bold;
      line-height: 40px;
    }
    .c_first_title{
      font-size: 17px;
      font-weight: bold;
      line-height: 40px;
    }
    .c_sec_box{
      p{
        text-indent: 1em;
        line-height: 30px;
      }
    }
    .agreement_wrap {
      height: 300px;
      overflow-y: scroll;
      // width: 80%;
      margin: 0 auto;
      border: 1px solid #eaeaea;
      padding: 10px 8px;
      .agreement_detail {
        line-height: 24px;
      }
    }
    .agreement_wrap::-webkit-scrollbar {
      display: none;
    }
    .agreement_info {
      text-align: right;
      color: #999;
      text-decoration: underline;
      line-height: 40px;
    }
  }

</style>
