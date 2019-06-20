// 助贷基金  ----start
export default [
  // 准入  ----start
  // {
  //   path: '/guaranteeProvider',
  //   name: 'guaranteeProvider',
  //   component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/guaranteeProvider/guaranteeProvider'),
  //   meta: {location: [{title: '我的企业', url: ''}], selIndex: {fund: 0}}
  // },
  {
    path: '/guaranteeLegalOne',
    name: 'guaranteeLegalOne',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/guaranteeProvider/guaranteeLegalOne'),
    meta: {location: [{title: '我的企业', url: ''}], selIndex: {fund: 0}}
  },
  {
    path: '/guaranteeFirst',
    name: 'guaranteeFirst',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/guaranteeProvider/guaranteeFirst'),
    meta: {location: [{title: '我的企业', url: ''}], selIndex: {fund: 0}}
  },
  {
    path: '/guaranteeLegalPerson',
    name: 'guaranteeLegalPerson',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/guaranteeProvider/guaranteeLegalPerson'),
    meta: {location: [{title: '我的企业', url: ''}], selIndex: {fund: 0}}
  },
  {
    path: '/guaranteeSigned',
    name: 'guaranteeSigned',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/guaranteeProvider/guaranteeSigned'),
    meta: {location: [{title: '我的企业', url: ''}], selIndex: {fund: 0}}
  },
  // 准入  ----end
  // 我的企业  ----start
  {
    path: '/myEnterprise',
    name: 'myEnterprise',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myEnterprise/myEnterprise'),
    meta: {location: [{title: '我的企业', url: ''}], selIndex: {fund: 1}}
  },
  {
    path: '/myApply',
    name: 'myApply',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myEnterprise/myApply'),
    meta: {location: [{title: '我的企业', url: '/myEnterprise'}, {title: '成员申请', url: ''}], selIndex: {fund: 0}}
  },
  // 我的企业  ----end
  // 我的助贷  ----start
  {
    path: '/myFund',
    name: 'myFund',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myFund/myFund'),
    meta: {location: [{title: '我的助贷', url: ''}], selIndex: {fund: 2}}
  },
  // 企业之间订单逾期率
  {
    path: '/myFund/order_list',
    name: 'FundOrder',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myFund/base/order_list'),
    meta: {location: [{title: '我的助贷', url: '/myFund'}, {title: '历史逾期率', url: ''}], selIndex: {fund: 2}}
  },
  {
    path: '/myFundList',
    name: 'myFundList',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myFund/myFundList'),
    meta: {location: [{title: '我的助贷', url: '/myFund'}, {title: '赔付申请', url: ''}], selIndex: {fund: 2}}
  },
  {
    path: '/helpPurpose',
    name: 'helpPurpose',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myFund/helpPurpose'),
    meta: {location: [{title: '我的助贷', url: '/myFund'}, {title: '融资用途', url: ''}], selIndex: {fund: 2}}
  },
  {
    path: '/helpFirst',
    name: 'helpFirst',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myFund/helpFirst'),
    meta: {location: [{title: '我的助贷', url: '/myFund'}, {title: '第一还款来源', url: ''}], selIndex: {fund: 2}}
  },
  {
    path: '/helpSecond',
    name: 'helpSecond',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myFund/helpSecond'),
    meta: {location: [{title: '我的助贷', url: '/myFund'}, {title: '第二还款来源', url: ''}], selIndex: {fund: 2}}
  },
  {
    path: '/order/whole',
    name: 'whole',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myFund/order_details/whole'),
    meta: {location: [{title: '我的助贷', url: '/myFund'}, {title: '风控审核', url: ''}], selIndex: {fund: 2}}
  },
  // 我的助贷  ----end
  // 链式记账  ----start
  // 查看链式记账（应收）
  {
    path: '/fund/chain_detail',
    name: 'chainLine',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/CooperationChain'),
    meta: {location: [{title: '企业记账', url: ''}], selIndex: {fund: -99}}
  },
  {
    path: '/fund/chain_info',
    name: 'lineChain',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/PaymentChain'),
    meta: {location: [{title: '企业记账', url: ''}], selIndex: {fund: -99}}
  },
  // 链式记账详情
  {
    path: '/fund/chain_detail/contract',
    name: 'chainInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/contract/chainContractView'),
    meta: {location: [{title: '合同', url: ''}], selIndex: {fund: -99}}
  },
  // 查看链式记账订单
  {
    path: '/fund/chain_detail/order',
    name: 'orderInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/order/chainOrderView'),
    meta: {location: [{title: '订单', url: ''}], selIndex: {fund: -99}}
  },
  // 查看链式记账订金
  {
    path: '/fund/chain_detail/deposit',
    name: 'depositInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/deposit/chainDepositView'),
    meta: {location: [{title: '订金', url: ''}], selIndex: {fund: -99}}
  },
  // 查看链式记账出货单
  {
    path: '/fund/chain_detail/outbound',
    name: 'outboundInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/outbound/outboundModify'),
    meta: {location: [{title: '出库单', url: ''}], selIndex: {fund: -99}}
  },
  // 查看链式记账运单
  {
    path: '/fund/chain_detail/waybill',
    name: 'waybillInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/waybill/waybillModify'),
    meta: {location: [{title: '运单', url: ''}], selIndex: {fund: -99}}
  },
  // 查看链式记账验收单
  {
    path: '/fund/chain_detail/acceptance',
    name: 'acceptanceInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/acceptance/acceptanceModify'),
    meta: {location: [{title: '入库单', url: ''}], selIndex: {fund: -99}}
  },
  {
    path: '/fund/chain_detail/settlement',
    name: 'settlementInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/settlement/settlement_sure'),
    meta: {location: [{title: '结算单', url: ''}], selIndex: {fund: -99}}
  },
  {
    path: '/fund/chain_detail/invoice',
    name: 'invoiceInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/invoice/invoice_sure'),
    meta: {location: [{title: '发票', url: ''}], selIndex: {fund: -99}}
  },
  {
    path: '/fund/chain_detail/payment',
    name: 'paymentInfo',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/chain_app/payment/payment_sure'),
    meta: {location: [{title: '支付', url: ''}], selIndex: {fund: -99}}
  },
  // 链式记账  ----end
  // 我的债权  ----start
  {
    path: '/myClaims',
    name: 'myClaims',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/myClaims/myClaims'),
    meta: {location: [{title: '我的债权', url: ''}], selIndex: {fund: 3}}
  },
  // 我的债权  ----end
  // 风控大厅
  {
    path: '/risk',
    name: 'risk',
    component: () => import(/* webpackChunkName: "fund" */ '@/components/guaranteeFund/risk_app/loan'),
    meta: {location: [{title: '贷后风控大厅', url: ''}], selIndex: {fund: 4}}
  }
  // 助贷基金  ----end
]
