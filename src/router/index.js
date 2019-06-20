import Vue from 'vue'
import Router from 'vue-router'
/*
* ---------------------------------|
*   准入v2.0  --start
* ---------------------------------|
*/
import authentication from '@/components/administration/authentication/authentication'
// 第一步---注册人信息
import authLegalOne from '@/components/administration/authentication/authLegalOne'
// 第一步---基础信息
import authenticationFirst from '@/components/administration/authentication/authenticationFirst'
// 第二步---法人五证
import legalPerson from '@/components/administration/authentication/legalPerson'
// 激活
import authenticationActiva from '@/components/administration/authentication/authenticationActiva'
// 协议签署
import authenticationSigned from '@/components/administration/authentication/authenticationSigned'
// 金融机构
// import financeAdmittance from '@/components/administration/financeAdmittance/financeAdmittance'
// 第一步---注册人信息
import financeLegalOne from '@/components/administration/financeAdmittance/financeLegalOne'
// 第一步---基础信息
import financeFirst from '@/components/administration/financeAdmittance/financeFirst'
// 第二步---法人五证
import financeLegalPerson from '@/components/administration/financeAdmittance/financeLegalPerson'
// 激活
// import financeActiva from '@/components/financeAdmittance/financeActiva'
// 协议签署
import financeSigned from '@/components/administration/financeAdmittance/financeSigned'
/*
* ---------------------------------|
*   管理-首页v2.0  --start
* ---------------------------------|
*/
import enterpriseIntroduce from '@/components/administration/enterpriseInfo/enterpriseIntroduce'
import enterpriseBlogInfo from '@/components/administration/enterpriseInfo/enterpriseBlogInfo'
import enterpriseDemand from '@/components/administration/enterpriseInfo/enterpriseDemand'
import enterpriseDetail from '@/components/administration/enterpriseInfo/enterpriseDetail'
// 设置
import settings from '@/components/administration/settings/settings'
// 安全
import safeNumber from '@/components/administration/safe/safeNumber'
import telSafeDetail from '@/components/administration/safe/telSafeDetail'
import emailSafeDetail from '@/components/administration/safe/emailSafeDetail'
import pwdSafeDetail from '@/components/administration/safe/pwdSafeDetail'
// 服务商：服务信息
import serviceDemand from '@/components/administration/enterpriseInfo/serviceDemand'
// 博客编辑
import blogEditor from '@/components/administration/richtext/ue'
// 博客查看
import news from '@/components/administration/enterpriseInfo/news'
// 企业-----------博客
import enterpriseBlog from '@/components/administration/blog/enterpriseBlog'
// 金融机构-----------博客
import institutionBlog from '@/components/administration/blog/institutionBlog'
// -----------博客-------------详情
import blogNews from '@/components/administration/blog/blogNews'
/*
* ---------------------------------|
*   平台好友v2.0  --start
* ---------------------------------|
*/
import friendmanagement from '@/components/friend/friendmanagement'
import apply from '@/components/friend/apply'
import addfriend from '@/components/friend/add_friend'
import friendDebt from '@/components/friend/friendDebt'
import friendGroup from '@/components/friend/friends_classify'
/*
* ---------------------------------|
*   链式记账v2.0  --start
* ---------------------------------|
*/
import chainApp from '@/components/chain_app/index-new'
import chainMain from '@/components/chain_app/main'
import receiveChain from '@/components/chain_app/chain_receive/ReceiveChain'
import paymentChain from '@/components/chain_app/chain_payment/PaymentChain'
import storageChain from '@/components/chain_app/chain_storage/StorageChain'
import cooperationChain from '@/components/chain_app/chain_cooperation/CooperationChain'
import receiveChainCreate from '@/components/chain_app/chain_receive/CreateChain'
import paymentChainCreate from '@/components/chain_app/chain_payment/CreateChain'
import contract from '@/components/chain_app/base/chain_modules/contract/chainContractView'
import warehoueContract from '@/components/chain_app/base/chain_modules/contract-warehouse/chainContractWarehouseView'
import order from '@/components/chain_app/base/chain_modules/order/chainOrderView'
import deposit from '@/components/chain_app/base/chain_modules/deposit/chainDepositView'
import orderPlan from '@/components/chain_app/base/chain_modules/order-plan/chainOrderPlanView'
import transportContract from '@/components/chain_app/base/chain_modules/contract-transport/chainContractTransportView'
import financingPlan from '@/components/chain_app/base/chain_modules/financing-plan/chainFinancingPlanView'
import outboundCreate from '@/components/chain_app/base/chain_modules/outbound/outboundCreate'
import outboundView from '@/components/chain_app/base/chain_modules/outbound/outboundOrder'
import outboundModify from '@/components/chain_app/base/chain_modules/outbound/outboundModify'
import outboundInfo from '@/components/chain_app/base/chain_modules/outbound/outboundInfo'
import waybillCreate from '@/components/chain_app/base/chain_modules/waybill/waybillCreate'
import waybillView from '@/components/chain_app/base/chain_modules/waybill/waybillOrder'
import waybillModify from '@/components/chain_app/base/chain_modules/waybill/waybillModify'
import waybillInfo from '@/components/chain_app/base/chain_modules/waybill/waybillInfo'
import acceptanceCreate from '@/components/chain_app/base/chain_modules/acceptance/acceptanceCreate'
import acceptanceView from '@/components/chain_app/base/chain_modules/acceptance/acceptanceOrder'
import acceptanceModify from '@/components/chain_app/base/chain_modules/acceptance/acceptanceModify'
import acceptanceInfo from '@/components/chain_app/base/chain_modules/acceptance/acceptanceInfo'
import settlementCreate from '@/components/chain_app/base/chain_modules/settlement/settlement_create'
import settlementView from '@/components/chain_app/base/chain_modules/settlement/settlement_view'
import settlementInfo from '@/components/chain_app/base/chain_modules/settlement/settlement_sure'
import invoiceCreate from '@/components/chain_app/base/chain_modules/invoice/invoice_create'
import invoiceInfo from '@/components/chain_app/base/chain_modules/invoice/invoice_sure'
import invoiceView from '@/components/chain_app/base/chain_modules/invoice/invoice_view'
import paymentCreate from '@/components/chain_app/base/chain_modules/payment/payment_create'
import paymentInfo from '@/components/chain_app/base/chain_modules/payment/payment_sure'
import paymentView from '@/components/chain_app/base/chain_modules/payment/payment_view'

import historicalTransactions from '@/components/chain_app/historical_transactions'

import creditReporting from '@/components/chain_app/credit_reporting'
// 消息系统
import message from '@/components/public/message/message'
import messageDetail from '@/components/public/message/messageDetail'

/*
* ---------------------------------|
*   链式记账v2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   企业-融资申请v2.0  --start
* ---------------------------------|
*/
// 融资首页
import financingInfo from '@/components/financing/financingInfo'
// 订单融资
import financingIndex from '@/components/financing_app/financingInfo'
// 订单融资申请
import orderFinancingApplication from '@/components/financing_app/order_financing/application/application'
// 融资审核
import orderFinancingVerify from '@/components/financing_app/order_financing/verify/verify'
// 融资用途详细页面
import chainContractView from '@/components/financing_app/order_financing/application_detail/financingPurp'
// 第一还款来源页面
import fristRepayment from '@/components/financing_app/order_financing/application_detail/repayOfFirst'
// 第二还款来源
import secondReapayment from '@/components/financing_app/order_financing/application_detail/repayOfSecond'
// 融资场景图
import viewDetails from '@/components/financing_app/base/view_details'
// 查看责任协议
import protocol from '@/components/financing_app/base/protocol'
// 应收融资申请
import gettingFinancingApplication from '@/components/financing_app/getting_financing/application/application'
// 查看历史记账
import orderList from '@/components/financing_app/base/order_list'
import institutionRouter from './router-institution.js'
/*
* ---------------------------------|
*   企业-融资申请v2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   企业-债权债务v2.0  --start
* ---------------------------------|
*/
import claimInfo from '@/components/claim_app/claimInfo'
// 第一步
import claimRegister from '@/components/claim_app/claimRegister'
// 凭证
import claimVoucher from '@/components/claim_app/claimVoucher'
// 查看链式记账
import claimCooperationChain from '@/components/claim_app/base/claim_cooperation/cooperationChain'
/*
* ---------------------------------|
*   企业-债权债务v2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   助贷基金v2.0  --start
* ---------------------------------|
*/
import fundRouter from './router-fund.js'
/*
* ---------------------------------|
*   助贷基金v2.0  --end
* ---------------------------------|
*/
// 我的数据资产
import Property from '@/components/asset_app/property'
/*
* ---------------------------------|
*   债权处置v2.0  --start
* ---------------------------------|
*/
import creditDeal from '@/components/credit_app/creditDeal'
import creditDetail from '@/components/credit_app/creditDetail'
import creditOperator from '@/components/credit_app/creditOperator'
import addCash from '@/components/credit_app/addCash'
import cashFor from '@/components/credit_app/cashFor'
import cashPublish from '@/components/credit_app/cashPublish'
import changePay from '@/components/credit_app/changePay'
import sureOperation from '@/components/credit_app/sureOperation'
/*
* ---------------------------------|
*   债权处置v2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   债务处置v2.0  --start
* ---------------------------------|
*/
import debtPublish from '@/components/debt_app/debtPublish'
import debtInfo from '@/components/debt_app/debtInfo'
import debtDeal from '@/components/debt_app/debtDeal'
import debtIntro from '@/components/debt_app/debtIntro'
import debtReason from '@/components/debt_app/debtReason'
import debtWay from '@/components/debt_app/debtWay'
import debtRecall from '@/components/debt_app/debtRecall'
import debtDetail from '@/components/debt_app/debtDetail'
/*
* ---------------------------------|
*   债务处置v2.0  --end
* ---------------------------------|
*/
/*
* ---------------------------------|
*   贷款处置v2.0  --start
* ---------------------------------|
*/
import loanDeal from '@/components/loan_app/loanDeal'
import loanType from '@/components/loan_app/loanType'
import loanPublish from '@/components/loan_app/loanPublish'
import loanInfo from '@/components/loan_app/loanInfo'
import loanRecall from '@/components/loan_app/loanRecall'
/*
* ---------------------------------|
*   贷款处置v2.0  --end
* ---------------------------------|
*/
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'enterpriseIntroduce',
      component: enterpriseIntroduce
    },
    {
      path: '/enterpriseBlogInfo',
      name: 'enterpriseBlogInfo',
      component: enterpriseBlogInfo
    },
    {
      path: '/enterpriseDemand',
      name: 'enterpriseDemand',
      component: enterpriseDemand
    },
    {
      path: '/enterpriseDetail',
      name: 'enterpriseDetail',
      component: enterpriseDetail
    },
    // 设置
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/safeNumber',
      name: 'safeNumber',
      component: safeNumber
    },
    {
      path: '/telSafeDetail',
      name: 'telSafeDetail',
      component: telSafeDetail
    },
    {
      path: '/emailSafeDetail',
      name: 'emailSafeDetail',
      component: emailSafeDetail
    },
    {
      path: '/pwdSafeDetail',
      name: 'pwdSafeDetail',
      component: pwdSafeDetail
    },
    {
      path: '/serviceDemand',
      name: 'serviceDemand',
      component: serviceDemand
    },
    // 企业认证     --start
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },
    {
      path: '/authLegalOne',
      name: 'authLegalOne',
      component: authLegalOne
    },
    {
      path: '/authenticationFirst',
      name: 'authenticationFirst',
      component: authenticationFirst
    },
    {
      path: '/legalPerson',
      name: 'legalPerson',
      component: legalPerson
    },
    {
      path: '/authenticationActiva',
      name: 'authenticationActiva',
      component: authenticationActiva
    },
    {
      path: '/authenticationSigned',
      name: 'authenticationSigned',
      component: authenticationSigned
    },
    // 企业认证       --end
    // 金融机构认证   --start
    // {
    //   path: '/financeAdmittance',
    //   name: 'financeAdmittance',
    //   component: financeAdmittance
    // },
    {
      path: '/financeLegalOne',
      name: 'financeLegalOne',
      component: financeLegalOne
    },
    {
      path: '/financeFirst',
      name: 'financeFirst',
      component: financeFirst
    },
    {
      path: '/financeLegalPerson',
      name: 'financeLegalPerson',
      component: financeLegalPerson
    },
    {
      path: '/financeSigned',
      name: 'financeSigned',
      component: financeSigned
    },
    {
      path: '/blogEditor',
      name: 'blogEditor',
      component: blogEditor
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/enterpriseBlog',
      name: 'enterpriseBlog',
      component: enterpriseBlog
    },
    {
      path: '/institutionBlog',
      name: 'institutionBlog',
      component: institutionBlog
    },
    {
      path: '/blogNews',
      name: 'blogNews',
      component: blogNews
    },
    // 金融机构认证   --end
    // 商友  --start
    {
      path: '/friendmanagement',
      name: 'friendmanagement',
      component: friendmanagement
    },
    {
      path: '/add_friend',
      name: 'add_friend',
      component: addfriend
    },
    {
      path: '/applylist',
      name: 'apply',
      component: apply
    },
    {
      path: '/friend_group',
      name: 'friend_group',
      component: friendGroup
    },
    {
      path: '/friendDebt',
      name: 'friendDebt',
      component: friendDebt
    },
    // 商友  --end
    // 链式记账  --start
    {
      path: '/chain_app',
      name: 'chain_app',
      component: chainApp
    },
    {
      path: '/chain_app/chain_main',
      name: 'chainMain',
      component: chainMain
    },
    {
      path: '/chain_app/receive_chain_create',
      name: 'receiveChainCreate',
      component: receiveChainCreate
    },
    {
      path: '/chain_app/payment_chain_create',
      name: 'paymentChainCreate',
      component: paymentChainCreate
    },
    {
      path: '/chain_app/receive_chain',
      name: 'receiveChain',
      component: receiveChain
    },
    {
      path: '/chain_app/payment_chain',
      name: 'paymentChain',
      component: paymentChain
    },
    {
      path: '/chain_app/storage_chain',
      name: 'storageChain',
      component: storageChain
    },
    {
      path: '/chain_app/contract',
      name: 'contract',
      component: contract
    },
    {
      path: '/chain_app/deposit',
      name: 'deposit',
      component: deposit
    },
    {
      path: '/chain_app/warehouse_contract',
      name: 'warehouserContract',
      component: warehoueContract
    },
    {
      path: '/chain_app/order',
      name: 'order',
      component: order
    },
    {
      path: '/chain_app/order_plan',
      name: 'orderPlan',
      component: orderPlan
    },
    {
      path: '/chain_app/transport_contract',
      name: 'transportContract',
      component: transportContract
    },
    {
      path: '/chain_app/financing_plan',
      name: 'financingPlan',
      component: financingPlan
    },
    {
      path: '/chain_app/outboundCreate',
      name: 'outboundCreate',
      component: outboundCreate
    },
    {
      path: '/chain_app/outboundView',
      name: 'outboundView',
      component: outboundView
    },
    {
      path: '/chain_app/outboundModify',
      name: 'outboundModify',
      component: outboundModify
    },
    {
      path: '/chain_app/outboundInfo',
      name: 'outboundInfo',
      component: outboundInfo
    },
    {
      path: '/chain_app/waybillCreate',
      name: 'waybillCreate',
      component: waybillCreate
    },
    {
      path: '/chain_app/waybillView',
      name: 'waybillView',
      component: waybillView
    },
    {
      path: '/chain_app/waybillModify',
      name: 'waybillModify',
      component: waybillModify
    },
    {
      path: '/chain_app/waybillInfo',
      name: 'waybillInfo',
      component: waybillInfo
    },
    {
      path: '/chain_app/acceptanceCreate',
      name: 'acceptanceCreate',
      component: acceptanceCreate
    },
    {
      path: '/chain_app/acceptanceView',
      name: 'acceptanceView',
      component: acceptanceView
    },
    {
      path: '/chain_app/acceptanceModify',
      name: 'acceptanceModify',
      component: acceptanceModify
    },
    {
      path: '/chain_app/acceptanceInfo',
      name: 'acceptanceInfo',
      component: acceptanceInfo
    },
    {
      path: '/chain_app/settlementCreate',
      name: 'settlementCreate',
      component: settlementCreate
    },
    {
      path: '/chain_app/settlementView',
      name: 'settlementView',
      component: settlementView
    },
    {
      path: '/chain_app/settlementInfo',
      name: 'settlementInfo',
      component: settlementInfo
    },
    {
      path: '/chain_app/invoiceCreate',
      name: 'invoiceCreate',
      component: invoiceCreate
    },
    {
      path: '/chain_app/invoiceView',
      name: 'invoiceView',
      component: invoiceView
    },
    {
      path: '/chain_app/invoiceInfo',
      name: 'invoiceInfo',
      component: invoiceInfo
    },
    {
      path: '/chain_app/paymentCreate',
      name: 'paymentCreate',
      component: paymentCreate
    },
    {
      path: '/chain_app/paymentView',
      name: 'paymentView',
      component: paymentView
    },
    {
      path: '/chain_app/historical_add_credit',
      name: 'historicalTransactions',
      component: historicalTransactions
    },
    {
      path: '/chain_app/credit_reporting',
      name: 'creditReporting',
      component: creditReporting
    },
    {
      path: '/chain_app/paymentInfo',
      name: 'paymentInfo',
      component: paymentInfo
    },
    {
      path: '/chain_app/cooperation_chain',
      name: 'cooperationChain',
      component: cooperationChain
    },
    // 链式记账  --end
    // 企业-融资申请
    {
      path: '/financing',
      name: 'financingInfo',
      component: financingInfo
    },
    // 企业-应收融资
    // 融资           --start
    {
      path: '/financing_app',
      name: 'financingIndex',
      component: financingIndex
    },
    {
      path: '/financing_app/order_application',
      name: 'orderApplicaion',
      component: orderFinancingApplication
    },
    {
      path: '/financing_app/verify',
      name: 'orderFinancingVerify',
      component: orderFinancingVerify
    },
    {
      path: '/financing_app/usage',
      name: 'order_usage',
      component: chainContractView
    },
    {
      path: '/financing_app/first_repayment',
      name: 'order_first',
      component: fristRepayment
    },
    {
      path: '/financing_app/second_repayment',
      name: 'order_second',
      component: secondReapayment
    },
    {
      path: '/financing_app/view_detail',
      name: 'viewDetails',
      component: viewDetails
    },
    {
      path: '/financing_app/protocol',
      name: 'protocol',
      component: protocol
    },
    // 历史记账
    {
      path: '/financing_app/order_list',
      name: 'financingOrder',
      component: orderList
    },
    // 应收融资申请
    {
      path: '/financing_app/getting_application',
      name: 'gettingFinancingApplication',
      component: gettingFinancingApplication
    },
    // =================================================
    // 债权债务
    {
      path: '/claim_app',
      name: 'claimInfo',
      component: claimInfo
    },
    {
      path: '/claim_app/claim_register',
      name: 'claimRegister',
      component: claimRegister
    },
    {
      path: '/claim_app/claim_voucher',
      name: 'claimVoucher',
      component: claimVoucher
    },
    {
      path: '/claim_app/cooperation_chain',
      name: 'claimCooperationChain',
      component: claimCooperationChain
    },
    // =================================================
    // 我的数据资产       --start
    {
      path: '/asset_app',
      name: 'data_asset',
      component: Property
    },
    // 站内信
    {
      path: '/message_app',
      name: 'message',
      component: message
    },
    {
      path: '/message_app/detail',
      name: 'dessageDetail',
      component: messageDetail
    },
    // 我的数据资产       --end
    ...institutionRouter,
    ...fundRouter,
    // 债权处置
    {
      path: '/creditDeal',
      name: 'creditDeal',
      component: creditDeal
    },
    {
      path: '/creditOperator',
      name: 'creditOperator',
      component: creditOperator
    },
    {
      path: '/creditDetail',
      name: 'creditDetail',
      component: creditDetail
    },
    {
      path: '/addCash',
      name: 'addCash',
      component: addCash
    },
    {
      path: '/cashFor',
      name: 'cashFor',
      component: cashFor
    },
    {
      path: '/cashPublish',
      name: 'cashPublish',
      component: cashPublish
    },
    {
      path: '/changePay',
      name: 'changePay',
      component: changePay
    },
    {
      path: '/sureOperation',
      name: 'sureOperation',
      component: sureOperation
    },
    // 债务处置
    {
      path: '/debtPublish',
      name: 'debtPublish',
      component: debtPublish
    },
    {
      path: '/debtInfo',
      name: 'debtInfo',
      component: debtInfo
    },
    {
      path: '/debtDeal',
      name: 'debtDeal',
      component: debtDeal
    },
    {
      path: '/debtIntro',
      name: 'debtIntro',
      component: debtIntro
    },
    {
      path: '/debtReason',
      name: 'debtReason',
      component: debtReason
    },
    {
      path: '/debtWay',
      name: 'debtWay',
      component: debtWay
    },
    {
      path: '/debtRecall',
      name: 'debtRecall',
      component: debtRecall
    },
    {
      path: '/debtDetail',
      name: 'debtDetail',
      component: debtDetail
    },
    // 贷款处置
    {
      path: '/loanDeal',
      name: 'loanDeal',
      component: loanDeal
    },
    {
      path: '/loanType',
      name: 'loanType',
      component: loanType
    },
    {
      path: '/loanPublish',
      name: 'loanPublish',
      component: loanPublish
    },
    {
      path: '/loanInfo',
      name: 'loanInfo',
      component: loanInfo
    },
    {
      path: '/loanRecall',
      name: 'loanRecall',
      component: loanRecall
    }
  ],
  scrollBehavior (to, from) {
    // return 期望滚动到哪个的位置
    return {x: 0, y: 0}
  }
})
