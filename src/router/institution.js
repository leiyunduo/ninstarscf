export default [
  {
    path: '/credit_app',
    name: 'creditIndex',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/financing_app/financingInfo'),
    meta: {location: [{title: '贷款审核', url: ''}], selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/usage',
    name: 'credit_usage',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/financing_app/order_financing/application_detail/financingPurp'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/first_repayment',
    name: 'credit_first',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/financing_app/order_financing/application_detail/repayOfFirst'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/second_repayment',
    name: 'credit_second',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/financing_app/order_financing/application_detail/repayOfSecond'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/credit_detail',
    name: 'orderFinancingCredit',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/financing_app/order_financing/cridet_detail/verify'),
    meta: {title: '', selIndex: {institution: 2, institutionperson: ''}}
  },
  // 查看链式记账（应收）
  {
    path: '/credit_app/chain_detail',
    name: 'chainLine',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/chain_receive/ReceiveChain'),
    meta: {location: [], selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/chain_info',
    name: 'lineChain',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/chain_payment/PaymentChain'),
    meta: {location: [], selIndex: {institution: 1, institutionperson: ''}}
  },
  // 链式记账详情
  {
    path: '/credit_app/chain_detail/contract',
    name: 'institutionContract',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/contract/chainContractView'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/chain_detail/order_plan',
    name: 'orderPlan',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/order-plan/chainOrderPlanView'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/chain_detail/contract_warehouse',
    name: 'contractWarehouse',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/contract-warehouse/chainContractWarehouseView'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/chain_detail/contract_transport',
    name: 'contractTransport',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/contract-transport/chainContractTransportView'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/chain_detail/financing_plan',
    name: 'financingPlan',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/financing-plan/chainFinancingPlanView'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },

  // 查看链式记账订单
  {
    path: '/credit_app/chain_detail/order',
    name: 'institutionOrder',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/order/chainOrderView'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  // 查看链式记账订金
  {
    path: '/credit_app/chain_detail/deposit',
    name: 'institutionDeposit',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/deposit/chainDepositView'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  // 查看链式记账出货单
  {
    path: '/credit_app/chain_detail/outbound',
    name: 'institutionOutbound',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/outbound/outboundInfo'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  // 查看链式记账运单
  {
    path: '/credit_app/chain_detail/waybill',
    name: 'institutionTransport',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/waybill/waybillInfo'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  // 查看链式记账验收单
  {
    path: '/credit_app/chain_detail/acceptance',
    name: 'institutionAcceptance',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/acceptance/acceptanceInfo'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/chain_detail/settlement',
    name: 'institutionSettlement',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/settlement/settlement_sure'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/chain_detail/invoice',
    name: 'institutionInvoice',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/invoice/invoice_sure'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/chain_detail/payment',
    name: 'institutionPayment',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/chain-view/base/chain_modules/payment/payment_sure'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  // 我的债权
  {
    path: '/debt_app',
    name: 'debtInfo',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/financing_app/debtInfo'),
    meta: {location: [{title: '贷款管理', url: ''}], selIndex: {institution: 2, institutionperson: 2}}
  },
  // 我的客户
  {
    path: '/customer_app',
    name: 'areaBusiness',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/customer_app/area_business'),
    meta: {location: [{title: '我的客户', url:''}], selIndex: {institution: 5, institutionperson: 5}}
  },
  // 我的客户申请列表
  {
    path: '/customer_app/application_list',
    name: 'customerApply',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/customer_app/business_list/myApply'),
    meta: {title: '', selIndex: {institution: 5, institutionperson: 5}}
  },
  // 区域企业查看
  {
    path: '/area_app',
    name: 'areaList',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/area_app/arealist'),
    meta: {location: [{title: '区域企业', url: ''}], selIndex: {institution: 6, institutionperson: 6}}
  },
  {
    path: '/area_app/business_detail',
    name: 'property',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/area_app/asset/property'),
    meta: {location: [{title: '贷后风控大厅', url: '/loan_app'}, {title: '企业数据资产', url: ''}], selIndex: {institution: 3, institutionperson: 3}}
  },
  {
    path: '/credit_app/order_list',
    name: 'viewDetail',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/financing_app/base/order_list'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  {
    path: '/credit_app/view_detail',
    name: 'detailView',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/financing_app/base/view_details'),
    meta: {title: '', selIndex: {institution: 1, institutionperson: ''}}
  },
  // 贷后监管
  {
    path: '/loan_app',
    name: 'loan',
    component: () => import(/* webpackChunkName: "institution" */ '@/components/institution/loan_app/loan'),
    meta: {location: [{title: '贷后风控大厅', url:''}], selIndex: {institution: 3, institutionperson: ''}}
  }
]
