/*
* ---------------------------------|
*   助贷基金---准入v2.0  --start
* ---------------------------------|
*/
// 助贷基金---准入
// import guaranteeProvider from '@/components/guaranteeFund/guaranteeProvider/guaranteeProvider'
// 第一步---注册人信息
import guaranteeLegalOne from '@/components/guaranteeFund/guaranteeProvider/guaranteeLegalOne'
// 第一步---基础信息
import guaranteeFirst from '@/components/guaranteeFund/guaranteeProvider/guaranteeFirst'
// 第二步---法人五证
import guaranteeLegalPerson from '@/components/guaranteeFund/guaranteeProvider/guaranteeLegalPerson'
// 协议签署
import guaranteeSigned from '@/components/guaranteeFund/guaranteeProvider/guaranteeSigned'
/*
* ---------------------------------|
*   我的企业v2.0  --start
* ---------------------------------|
*/
// 助贷基金---我的企业
import myEnterprise from '@/components/guaranteeFund/myEnterprise/myEnterprise'
// 成员申请
import myApply from '@/components/guaranteeFund/myEnterprise/myApply'
/*
* ---------------------------------|
*   我的企业v2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   我的助贷v2.0  --start
* ---------------------------------|
*/
// 助贷基金---我的助贷
import myFund from '@/components/guaranteeFund/myFund/myFund'
// 助贷基金---我的助贷
import myFundList from '@/components/guaranteeFund/myFund/myFundList'
// 助贷基金---融资用途
import helpPurpose from '@/components/guaranteeFund/myFund/helpPurpose'
// 第一还款来源
import helpFirst from '@/components/guaranteeFund/myFund/helpFirst'
// 第二还款来源
import helpSecond from '@/components/guaranteeFund/myFund/helpSecond'
// 查看融资详情
import whole from '@/components/guaranteeFund/myFund/order_details/whole'
// 企业之间订单逾期率
import FundOrder from '@/components/guaranteeFund/myFund/base/order_list'
/*
* ---------------------------------|
*   我的助贷v2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   链式记账2.0  --start
* ---------------------------------|
*/
// 查看链式记账 （应收链式记账）
import chainLine from '@/components/guaranteeFund/chain_app/CooperationChain'
// 查看链式记账 （应付链式记账）
import lineChain from '@/components/guaranteeFund/chain_app/PaymentChain'
// 查看链式记账合同
import orderInfo from '@/components/guaranteeFund/chain_app/order/chainOrderView'
// 查看链式记账订单
import chainInfo from '@/components/guaranteeFund/chain_app/contract/chainContractView'
// 查看链式记账订金
import depositInfo from '@/components/guaranteeFund/chain_app/deposit/chainDepositView'
// 查看链式记账出乎单
import outboundInfo from '@/components/guaranteeFund/chain_app/outbound/outboundModify'
// 查看链式记账运单
import waybillInfo from '@/components/guaranteeFund/chain_app/waybill/waybillModify'
// 查看链式记账验收单
import acceptanceInfo from '@/components/guaranteeFund/chain_app/acceptance/acceptanceModify'
// 查看链式记账结算呢
import settlementInfo from '@/components/guaranteeFund/chain_app/settlement/settlement_sure'
// 查看链式记账发票
import invoiceInfo from '@/components/guaranteeFund/chain_app/invoice/invoice_sure'
// 查看链式记账支付
import paymentInfo from '@/components/guaranteeFund/chain_app/payment/payment_sure'
/*
* ---------------------------------|
*   链式记账2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   我的债权2.0  --start
* ---------------------------------|
*/
// 我的债权
import myClaims from '@/components/guaranteeFund/myClaims/myClaims'
/*
* ---------------------------------|
*   我的债权2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   风控打听1.0  --start
* ---------------------------------|
*/
import Loan from '@/components/guaranteeFund/risk_app/loan'
/*
* ---------------------------------|
*   风控打听1.0  --end
* ---------------------------------|
*/
// 助贷基金  ----start
export default [
  // 准入  ----start
  // {
  //   path: '/guaranteeProvider',
  //   name: 'guaranteeProvider',
  //   component: guaranteeProvider
  // },
  {
    path: '/guaranteeLegalOne',
    name: 'guaranteeLegalOne',
    component: guaranteeLegalOne
  },
  {
    path: '/guaranteeFirst',
    name: 'guaranteeFirst',
    component: guaranteeFirst
  },
  {
    path: '/guaranteeLegalPerson',
    name: 'guaranteeLegalPerson',
    component: guaranteeLegalPerson
  },
  {
    path: '/guaranteeSigned',
    name: 'guaranteeSigned',
    component: guaranteeSigned
  },
  // 准入  ----end
  // 我的企业  ----start
  {
    path: '/myEnterprise',
    name: 'myEnterprise',
    component: myEnterprise
  },
  {
    path: '/myApply',
    name: 'myApply',
    component: myApply
  },
  // 我的企业  ----end
  // 我的助贷  ----start
  {
    path: '/myFund',
    name: 'myFund',
    component: myFund
  },
  // 企业之间订单逾期率
  {
    path: '/myFund/order_list',
    name: 'FundOrder',
    component: FundOrder
  },
  {
    path: '/myFundList',
    name: 'myFundList',
    component: myFundList
  },
  {
    path: '/helpPurpose',
    name: 'helpPurpose',
    component: helpPurpose
  },
  {
    path: '/helpFirst',
    name: 'helpFirst',
    component: helpFirst
  },
  {
    path: '/helpSecond',
    name: 'helpSecond',
    component: helpSecond
  },
  {
    path: '/order/whole',
    name: 'whole',
    component: whole
  },
  // 我的助贷  ----end
  // 链式记账  ----start
  // 查看链式记账（应收）
  {
    path: '/fund/chain_detail',
    name: 'chainLine',
    component: chainLine
  },
  {
    path: '/fund/chain_info',
    name: 'lineChain',
    component: lineChain
  },
  // 链式记账详情
  {
    path: '/fund/chain_detail/contract',
    name: 'chainInfo',
    component: chainInfo
  },
  // 查看链式记账订单
  {
    path: '/fund/chain_detail/order',
    name: 'orderInfo',
    component: orderInfo
  },
  // 查看链式记账订金
  {
    path: '/fund/chain_detail/deposit',
    name: 'depositInfo',
    component: depositInfo
  },
  // 查看链式记账出货单
  {
    path: '/fund/chain_detail/outbound',
    name: 'outboundInfo',
    component: outboundInfo
  },
  // 查看链式记账运单
  {
    path: '/fund/chain_detail/waybill',
    name: 'waybillInfo',
    component: waybillInfo
  },
  // 查看链式记账验收单
  {
    path: '/fund/chain_detail/acceptance',
    name: 'acceptanceInfo',
    component: acceptanceInfo
  },
  {
    path: '/fund/chain_detail/settlement',
    name: 'settlementInfo',
    component: settlementInfo
  },
  {
    path: '/fund/chain_detail/invoice',
    name: 'invoiceInfo',
    component: invoiceInfo
  },
  {
    path: '/fund/chain_detail/payment',
    name: 'paymentInfo',
    component: paymentInfo
  },
  // 链式记账  ----end
  // 我的债权  ----start
  {
    path: '/myClaims',
    name: 'myClaims',
    component: myClaims
  },
  // 我的债权  ----end
  // 风控大厅
  {
    path: '/risk',
    name: 'risk',
    component: Loan
  }
  // 助贷基金  ----end
]
