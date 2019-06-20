import Vue from 'vue'
import fundRouter from './fund.js'
import institutionRouter from './institution.js'
// import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'vue-router'
// 禁用进度环
// NProgress.configure({ showSpinner: false })

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'self',
      component: () => import(/* webpackChunkName: "business" */ '@/components/administration/self/index'),
      meta: {location: [{title: '主页', url: ''}], selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    // {
    //   path: '/enterpriseBlogInfo',
    //   name: 'enterpriseBlogInfo',
    //   component: () => import(/* webpackChunkName: "home" */ '@/components/administration/enterpriseInfo/enterpriseBlogInfo'),
    //   meta: {title: '', selIndex: {business: 0, person: '', institution: 0, institutionperson: 0, fund: 0}}
    // },
    // {
    //   path: '/enterpriseDemand',
    //   name: 'enterpriseDemand',
    //   component: () => import(/* webpackChunkName: "home" */ '@/components/administration/enterpriseInfo/enterpriseDemand'),
    //   meta: {title: '', selIndex: {business: 0, person: '', institution: 0, institutionperson: 0, fund: 0}}
    // },
    {
      path: '/enterpriseDetail',
      name: 'enterpriseDetail',
      component: () => import(/* webpackChunkName: "home" */ '@/components/administration/enterpriseInfo/enterpriseDetail'),
      meta: {title: '', selIndex: {business: 0, person: '', institution: 0, institutionperson: 0, fund: 0}}
    },
    // 设置
    {
      path: '/setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "setting" */ '@/components/administration/setting/index'),
      meta: {location: [{title: '设置', url: ''}], selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: () => import(/* webpackChunkName: "setting" */ '@/components/administration/settings/settings'),
    //   meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    // },
    {
      path: '/safeNumber',
      name: 'safeNumber',
      component: () => import(/* webpackChunkName: "setting" */ '@/components/administration/safe/safeNumber'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/telSafeDetail',
      name: 'telSafeDetail',
      component: () => import(/* webpackChunkName: "setting" */ '@/components/administration/safe/telSafeDetail'),
      meta: {title: '', selIndex: {business: 0, person: '', institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/emailSafeDetail',
      name: 'emailSafeDetail',
      component: () => import(/* webpackChunkName: "setting" */ '@/components/administration/safe/emailSafeDetail'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/pwdSafeDetail',
      name: 'pwdSafeDetail',
      component: () => import(/* webpackChunkName: "setting" */ '@/components/administration/safe/pwdSafeDetail'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/serviceDemand',
      name: 'serviceDemand',
      component: () => import(/* webpackChunkName: "home" */ '@/components/administration/enterpriseInfo/serviceDemand'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    // 企业认证     --start
    // {
    //   path: '/authentication',
    //   name: 'authentication',
    //   component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/authentication/authentication'),
    //   meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    // },
    {
      path: '/authLegalOne',
      name: 'authLegalOne',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/authentication/authLegalOne'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/authenticationFirst',
      name: 'authenticationFirst',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/authentication/authenticationFirst'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/legalPerson',
      name: 'legalPerson',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/authentication/legalPerson'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/authenticationActiva',
      name: 'authenticationActiva',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/authentication/authenticationActiva'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/authenticationSigned',
      name: 'authenticationSigned',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/authentication/authenticationSigned'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    // 企业认证       --end
    // 金融机构认证   --start
    // {
    //   path: '/financeAdmittance',
    //   name: 'financeAdmittance',
    //   component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/financeAdmittance/financeAdmittance'),
    //   meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    // },
    {
      path: '/financeLegalOne',
      name: 'financeLegalOne',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/financeAdmittance/financeLegalOne'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/financeFirst',
      name: 'financeFirst',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/financeAdmittance/financeFirst'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/financeLegalPerson',
      name: 'financeLegalPerson',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/financeAdmittance/financeLegalPerson'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/financeSigned',
      name: 'financeSigned',
      component: () => import(/* webpackChunkName: "auth" */ '@/components/administration/financeAdmittance/financeSigned'),
      meta: {title: '设置', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/blogEditor',
      name: 'blogEditor',
      component: () => import(/* webpackChunkName: "blog" */ '@/components/administration/richtext/ue'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/news',
      name: 'news',
      component: () => import(/* webpackChunkName: "blog" */ '@/components/administration/enterpriseInfo/news'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/enterpriseBlog',
      name: 'enterpriseBlog',
      component: () => import(/* webpackChunkName: "blog" */ '@/components/administration/blog/enterpriseBlog'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/institutionBlog',
      name: 'institutionBlog',
      component: () => import(/* webpackChunkName: "blog" */ '@/components/administration/blog/institutionBlog'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/blogNews',
      name: 'blogNews',
      component: () => import(/* webpackChunkName: "blog" */ '@/components/administration/blog/blogNews'),
      meta: {title: '', selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    // 金融机构认证   --end
    // 商友  --start
    {
      path: '/friendmanagement',
      name: 'friendmanagement',
      component: () => import(/* webpackChunkName: "friend" */ '@/components/friend/friendmanagement'),
      meta: {location: [{title: '好友管理', url: ''}], selIndex: {business: 5, person: 5, institution: 7, institutionperson: 7, fund: 5}}
    },
    {
      path: '/add_friend',
      name: 'add_friend',
      component: () => import(/* webpackChunkName: "friend" */ '@/components/friend/add_friend'),
      meta: {title: '', selIndex: {business: 5, person: 5, institution: 7, institutionperson: 7, fund: 5}}
    },
    {
      path: '/applylist',
      name: 'apply',
      component: () => import(/* webpackChunkName: "friend" */ '@/components/friend/apply'),
      meta: {title: '', selIndex: {business: 5, person: 5, institution: 7, institutionperson: 7, fund: 5}}
    },
    {
      path: '/friend_group',
      name: 'friend_group',
      component: () => import(/* webpackChunkName: "friend" */ '@/components/friend/friends_classify'),
      meta: {title: '', selIndex: {business: 5, person: 5, institution: 7, institutionperson: 7, fund: 5}}
    },
    {
      path: '/friendDebt',
      name: 'friendDebt',
      component: () => import(/* webpackChunkName: "friend" */ '@/components/friend/friendDebt'),
      meta: {title: '', selIndex: {business: 5, person: 5, institution: 7, institutionperson: 7, fund: 5}}
    },
    // 商友  --end
    // 链式记账  --start
    {
      path: '/chain_app',
      name: 'chain_app',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/index-new'),
      meta: {location: [{title: '交易管理与增信', url: ''}], selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/chain_main',
      name: 'chainMain',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/main'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/receive_chain_create',
      name: 'receiveChainCreate',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/chain_receive/CreateChain'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/payment_chain_create',
      name: 'paymentChainCreate',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/chain_payment/CreateChain'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/receive_chain',
      name: 'receiveChain',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/chain_receive/ReceiveChain'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/payment_chain',
      name: 'paymentChain',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/chain_payment/PaymentChain'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/storage_chain',
      name: 'storageChain',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/chain_storage/StorageChain'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/contract',
      name: 'contract',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/contract/chainContractView'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/deposit',
      name: 'deposit',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/deposit/chainDepositView'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/warehouse_contract',
      name: 'warehouserContract',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/contract-warehouse/chainContractWarehouseView'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/order/chainOrderView'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/order_plan',
      name: 'orderPlan',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/order-plan/chainOrderPlanView'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/transport_contract',
      name: 'transportContract',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/contract-transport/chainContractTransportView'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/financing_plan',
      name: 'financingPlan',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/financing-plan/chainFinancingPlanView'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/outboundCreate',
      name: 'outboundCreate',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/outbound/outboundCreate'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/outboundView',
      name: 'outboundView',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/outbound/outboundOrder'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/outboundModify',
      name: 'outboundModify',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/outbound/outboundModify'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/outboundInfo',
      name: 'outboundInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/outbound/outboundInfo'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/waybillCreate',
      name: 'waybillCreate',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/waybill/waybillCreate'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/waybillView',
      name: 'waybillView',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/waybill/waybillOrder'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/waybillModify',
      name: 'waybillModify',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/waybill/waybillModify'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/waybillInfo',
      name: 'waybillInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/waybill/waybillInfo'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/acceptanceCreate',
      name: 'acceptanceCreate',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/acceptance/acceptanceCreate'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/acceptanceView',
      name: 'acceptanceView',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/acceptance/acceptanceOrder'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/acceptanceModify',
      name: 'acceptanceModify',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/acceptance/acceptanceModify'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/acceptanceInfo',
      name: 'acceptanceInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/acceptance/acceptanceInfo'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/settlementCreate',
      name: 'settlementCreate',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/settlement/settlement_create'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/settlementView',
      name: 'settlementView',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/settlement/settlement_view'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/settlementInfo',
      name: 'settlementInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/settlement/settlement_sure'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/invoiceCreate',
      name: 'invoiceCreate',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/invoice/invoice_create'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/invoiceView',
      name: 'invoiceView',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/invoice/invoice_view'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/invoiceInfo',
      name: 'invoiceInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/invoice/invoice_sure'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/paymentCreate',
      name: 'paymentCreate',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/payment/payment_create'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/paymentView',
      name: 'paymentView',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/payment/payment_view'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/historical_add_credit',
      name: 'addCredit',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/historical_transactions'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/credit_reporting',
      name: 'creditReporting',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/credit_reporting'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/paymentInfo',
      name: 'paymentInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/base/chain_modules/payment/payment_sure'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    {
      path: '/chain_app/cooperation_chain',
      name: 'cooperationChain',
      component: () => import(/* webpackChunkName: "business" */ '@/components/chain_app/chain_cooperation/CooperationChain'),
      meta: {title: '', selIndex: {business: 2, person: 2}}
    },
    // 链式记账  --end
    // 企业-融资申请
    // {
    //   path: '/financing',
    //   name: 'financingInfo',
    //   component: () => import(/* webpackChunkName: "business" */ '@/components/financing/financingInfo')
    // },
    // 企业-应收融资
    // 融资           --start
    {
      path: '/financing_app',
      name: 'financingIndex',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/financingInfo'),
      meta: {location: [{title: '融资', url: ''}], selIndex: {business: 4, person: 4}}
    },
    {
      path: '/financing_app/order_application',
      name: 'orderApplicaion',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/order_financing/application/application'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    {
      path: '/financing_app/verify',
      name: 'orderFinancingVerify',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/order_financing/verify/verify'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    {
      path: '/financing_app/usage',
      name: 'order_usage',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/order_financing/application_detail/financingPurp'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    {
      path: '/financing_app/first_repayment',
      name: 'order_first',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/order_financing/application_detail/repayOfFirst'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    {
      path: '/financing_app/second_repayment',
      name: 'order_second',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/order_financing/application_detail/repayOfSecond'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    {
      path: '/financing_app/view_detail',
      name: 'viewDetails',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/base/view_details'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    {
      path: '/financing_app/protocol',
      name: 'protocol',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/base/protocol'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    // 历史记账
    {
      path: '/financing_app/order_list',
      name: 'financingOrder',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/base/order_list'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    // 应收融资申请
    {
      path: '/financing_app/getting_application',
      name: 'gettingFinancingApplication',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/getting_financing/application/application'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    // 信贷员融资
    {
      path: '/financing_app/creditor_financing',
      name: 'creditorApplicaion',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/creditor_financing/application/application'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    {
      path: '/financing_app/creditor_verify',
      name: 'creditorVerify',
      component: () => import(/* webpackChunkName: "business" */ '@/components/financing_app/creditor_financing/verify/verify'),
      meta: {title: '', selIndex: {business: 4, person: 4}}
    },
    // =================================================
    // 债权债务
    {
      path: '/claim_app',
      name: 'claimInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/claim_app/claimInfo'),
      meta: {location: [{title: '债权/债务', url: ''}], selIndex: {business: 3, person: 3}}
    },
    {
      path: '/claim_app/claim_register',
      name: 'claimRegister',
      component: () => import(/* webpackChunkName: "business" */ '@/components/claim_app/claimRegister'),
      meta: {title: '', selIndex: {business: 3, person: 3}}
    },
    {
      path: '/claim_app/claim_voucher',
      name: 'claimVoucher',
      component: () => import(/* webpackChunkName: "business" */ '@/components/claim_app/claimVoucher'),
      meta: {title: '', selIndex: {business: 3, person: 3}}
    },
    {
      path: '/claim_app/cooperation_chain',
      name: 'claimCooperationChain',
      component: () => import(/* webpackChunkName: "business" */ '@/components/claim_app/base/claim_cooperation/cooperationChain'),
      meta: {title: '', selIndex: {business: 3, person: 3}}
    },
    // =================================================
    // 我的数据资产       --start
    {
      path: '/asset_app',
      name: 'data_asset',
      component: () => import(/* webpackChunkName: "business" */ '@/components/asset_app/property'),
      meta: {location: [{title: '数据资产', url: ''}], selIndex: {business: 1, person: 1}}
    },
    // 站内信
    {
      path: '/message_app',
      name: 'message',
      component: () => import(/* webpackChunkName: "message" */ '@/components/public/message/message'),
      meta: {location: [{title: '站内信', url: ''}], selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    {
      path: '/message_app/detail',
      name: 'dessageDetail',
      component: () => import(/* webpackChunkName: "message" */ '@/components/public/message/messageDetail'),
      meta: {location: [{title: '站内信', url: '/message_app'}, {title: '详情', url: ''}], selIndex: {business: 0, person: 0, institution: 0, institutionperson: 0, fund: 0}}
    },
    // 我的数据资产       --end
    ...institutionRouter,
    ...fundRouter,
    // 债权处置
    {
      path: '/creditDeal',
      name: 'creditDeal',
      component: () => import(/* webpackChunkName: "business" */ '@/components/credit_app/creditDeal'),
      meta: {location: [{title: '债权处置', url: ''}], selIndex: {business: 6, person: 6}}
    },
    {
      path: '/creditOperator',
      name: 'creditOperator',
      component: () => import(/* webpackChunkName: "business" */ '@/components/credit_app/creditOperator'),
      meta: {title: '', selIndex: {business: 6, person: 6}}
    },
    {
      path: '/creditDetail',
      name: 'creditDetail',
      component: () => import(/* webpackChunkName: "business" */ '@/components/credit_app/creditDetail'),
      meta: {title: '', selIndex: {business: 6, person: 6}}
    },
    {
      path: '/addCash',
      name: 'addCash',
      component: () => import(/* webpackChunkName: "business" */ '@/components/credit_app/addCash'),
      meta: {title: '', selIndex: {business: 6, person: 6}}
    },
    {
      path: '/cashFor',
      name: 'cashFor',
      component: () => import(/* webpackChunkName: "business" */ '@/components/credit_app/cashFor'),
      meta: {title: '', selIndex: {business: 6, person: 6}}
    },
    {
      path: '/cashPublish',
      name: 'cashPublish',
      component: () => import(/* webpackChunkName: "business" */ '@/components/credit_app/cashPublish'),
      meta: {title: '', selIndex: {business: 6, person: 6}}
    },
    {
      path: '/changePay',
      name: 'changePay',
      component: () => import(/* webpackChunkName: "business" */ '@/components/credit_app/changePay'),
      meta: {title: '', selIndex: {business: 6, person: 6}}
    },
    {
      path: '/sureOperation',
      name: 'sureOperation',
      component: () => import(/* webpackChunkName: "business" */ '@/components/credit_app/sureOperation'),
      meta: {title: '', selIndex: {business: 6, person: 6}}
    },
    // 债务处置
    {
      path: '/debtPublish',
      name: 'debtPublish',
      component: () => import(/* webpackChunkName: "business" */ '@/components/debt_app/debtPublish'),
      meta: {title: '', selIndex: {business: 7, person: 7}}
    },
    {
      path: '/debtInfo',
      name: 'debtInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/debt_app/debtInfo'),
      meta: {title: '', selIndex: {business: 7, person: 7}}
    },
    {
      path: '/debtDeal',
      name: 'debtDeal',
      component: () => import(/* webpackChunkName: "business" */ '@/components/debt_app/debtDeal'),
      meta: {location: [{title: '债务处置', url: ''}], selIndex: {business: 7, person: 7}}
    },
    {
      path: '/debtIntro',
      name: 'debtIntro',
      component: () => import(/* webpackChunkName: "business" */ '@/components/debt_app/debtIntro'),
      meta: {title: '', selIndex: {business: 7, person: 7}}
    },
    {
      path: '/debtReason',
      name: 'debtReason',
      component: () => import(/* webpackChunkName: "business" */ '@/components/debt_app/debtReason'),
      meta: {title: '', selIndex: {business: 7, person: 7}}
    },
    {
      path: '/debtWay',
      name: 'debtWay',
      component: () => import(/* webpackChunkName: "business" */ '@/components/debt_app/debtWay'),
      meta: {title: '', selIndex: {business: 7, person: 7}}
    },
    {
      path: '/debtRecall',
      name: 'debtRecall',
      component: () => import(/* webpackChunkName: "business" */ '@/components/debt_app/debtRecall'),
      meta: {title: '', selIndex: {business: 7, person: 7}}
    },
    {
      path: '/debtDetail',
      name: 'debtDetail',
      component: () => import(/* webpackChunkName: "business" */ '@/components/debt_app/debtDetail'),
      meta: {title: '', selIndex: {business: 7, person: 7}}
    },
    // 贷款处置
    {
      path: '/loanDeal',
      name: 'loanDeal',
      component: () => import(/* webpackChunkName: "business" */ '@/components/loan_app/loanDeal'),
      meta: {location: [{title: '贷款处置', url: ''}], selIndex: {business: 8, person: 8}}
    },
    {
      path: '/loanType',
      name: 'loanType',
      component: () => import(/* webpackChunkName: "business" */ '@/components/loan_app/loanType'),
      meta: {title: '', selIndex: {business: 8, person: 8}}
    },
    {
      path: '/loanPublish',
      name: 'loanPublish',
      component: () => import(/* webpackChunkName: "business" */ '@/components/loan_app/loanPublish'),
      meta: {title: '', selIndex: {business: 8, person: 8}}
    },
    {
      path: '/loanInfo',
      name: 'loanInfo',
      component: () => import(/* webpackChunkName: "business" */ '@/components/loan_app/loanInfo'),
      meta: {title: '', selIndex: {business: 8, person: 8}}
    },
    {
      path: '/loanRecall',
      name: 'loanRecall',
      component: () => import(/* webpackChunkName: "business" */ '@/components/loan_app/loanRecall'),
      meta: {title: '', selIndex: {business: 8, person: 8}}
    },
    {
      path: '/orderManagement/orderlist',
      name: 'orderlist',
      component: () => import(/* webpackChunkName: "business" */ '@/components/ordermanagement/order_list'),
      meta: {location: [{title: '订单管理', url: '/orderManagement'}], selIndex: {business: '', person: '', institution: '', institutionperson: '', fund: ''}}
    },
    {
      path: '/orderManagement/orderDetails',
      name: 'orderDetails',
      component: () => import(/* webpackChunkName: "business" */ '@/components/ordermanagement/order_details'),
      meta: {location: [{title: '订单管理', url: '/orderManagement'},{title: '订单详情', url: '/ordermanagement/order_details'}], selIndex: {business: '', person: '', institution: '', institutionperson: '', fund: ''}}
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "business" */ '@/components/page/notFound'),
      meta: {location: [{title: '', url: ''}], selIndex: {business: '', person: '', institution: '', institutionperson: '', fund: ''}}
    },
    {
      path: '/wallet',
      name: 'wallet',                                                                                                                                                                                                               
      component: () => import(/* webpackChunkName: "business" */ '@/components/wallet/index'),
      meta: {location: [{title: '钱包', url: ''}], selIndex: {business: '', person: '', institution: '', institutionperson: '', fund: ''}}
    },
    {
      path: '/wallet/cash',
      name: 'cash',
      component: () => import(/* webpackChunkName: "business" */ '@/components/wallet/cash'),
      meta: {location: [{title: '钱包', url: '/wallet'}, {title: "收支明细", url: '/wallet/cash'}], selIndex: {business: '', person: '', institution: '', institutionperson: '', fund: ''}}
    },
    {
      path: '/wallet/recharge',
      name: 'cash',
      component: () => import(/* webpackChunkName: "business" */ '@/components/wallet/recharge/recharge'),
      meta: {location: [{title: '', url: ''}], selIndex: {business: '', person: '', institution: '', institutionperson: '', fund: ''}}
    },
    // 我的生态链
    {
      path: '/ecoChain/eco_chain',
      name: 'eco_chain',
      component: () => import(/* webpackChunkName: "business" */ '@/components/ecoChain/eco_chain'),
      meta: {location: [{title: '我的生态链', url: ''}], selIndex: {business: '', person: '', institution: '', institutionperson: '', fund: ''}}
    }
  ],
  scrollBehavior (to, from) {
    // return 期望滚动到哪个的位置
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  // NProgress.start()
  // 判断404页面
  if (!to.matched.length) {
    next({
      path: '/notFound'
    })
  } else {
    next()
  }
})

// router.afterEach(() => {
//   NProgress.done()
// })


export default router