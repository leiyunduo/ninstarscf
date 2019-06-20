// 金融机构url
import financingIndex from '@/components/institution/financing_app/financingInfo'
// 融资用途详细页面
import chainContractView from '@/components/institution/financing_app/order_financing/application_detail/financingPurp'
// 第一还款来源页面
import fristRepayment from '@/components/institution/financing_app/order_financing/application_detail/repayOfFirst'
// 第二还款来源
import secondReapayment from '@/components/institution/financing_app/order_financing/application_detail/repayOfSecond'
// 审核
import orderFinancingCredit from '@/components/institution/financing_app/order_financing/cridet_detail/verify'
// 逾期率
import orderList from '@/components/institution/financing_app/base/order_list'
// 场景图
import viewDetail from '@/components/institution/financing_app/base/view_details'
// 贷后监管
import Loan from '@/components/institution/loan_app/loan'
/*
* ---------------------------------|
*   链式记账2.0  --start
* ---------------------------------|
*/
import chainLine from '@/components/chain-view/chain_receive/ReceiveChain'
import lineChain from '@/components/chain-view/chain_payment/PaymentChain'
import contract from '@/components/chain-view/base/chain_modules/contract/chainContractView'
import orderPlan from '@/components/chain-view/base/chain_modules/order-plan/chainOrderPlanView'
import contractWarehouse from '@/components/chain-view/base/chain_modules/contract-warehouse/chainContractWarehouseView'
import contractTransport from '@/components/chain-view/base/chain_modules/contract-transport/chainContractTransportView'
import financingPlan from '@/components/chain-view/base/chain_modules/financing-plan/chainFinancingPlanView'
import order from '@/components/chain-view/base/chain_modules/order/chainOrderView'
import deposit from '@/components/chain-view/base/chain_modules/deposit/chainDepositView'
import outbound from '@/components/chain-view/base/chain_modules/outbound/outboundInfo'
import waybill from '@/components/chain-view/base/chain_modules/waybill/waybillInfo'
import acceptance from '@/components/chain-view/base/chain_modules/acceptance/acceptanceInfo'
import settlement from '@/components/chain-view/base/chain_modules/settlement/settlement_sure'
import invoice from '@/components/chain-view/base/chain_modules/invoice/invoice_sure'
import payment from '@/components/chain-view/base/chain_modules/payment/payment_sure'
/*
* ---------------------------------|
*   链式记账2.0  --end
* ---------------------------------|
*/
// 我的债权
import debtInfo from '@/components/institution/financing_app/debtInfo'
// 我的客户
import AreaBusiness from '@/components/institution/customer_app/area_business'
// 我的客户成员申请
import businessApply from '@/components/institution/customer_app/business_list/myApply'
// 区域企业查看
import areaList from '@/components/institution/area_app/arealist'
// 银行查看企业资产
import property from '@/components/institution/area_app/asset/property'
export default [
  {
    path: '/credit_app',
    name: 'creditIndex',
    component: financingIndex
  },
  {
    path: '/credit_app/usage',
    name: 'credit_usage',
    component: chainContractView
  },
  {
    path: '/credit_app/first_repayment',
    name: 'credit_first',
    component: fristRepayment
  },
  {
    path: '/credit_app/second_repayment',
    name: 'credit_second',
    component: secondReapayment
  },
  {
    path: '/credit_app/credit_detail',
    name: 'orderFinancingCredit',
    component: orderFinancingCredit
  },
  // 查看链式记账（应收）
  {
    path: '/credit_app/chain_detail',
    name: 'chainLine',
    component: chainLine
  },
  {
    path: '/credit_app/chain_info',
    name: 'lineChain',
    component: lineChain
  },
  // 链式记账详情
  {
    path: '/credit_app/chain_detail/contract',
    name: 'institutionContract',
    component: contract
  },
  {
    path: '/credit_app/chain_detail/order_plan',
    name: 'orderPlan',
    component: orderPlan
  },
  {
    path: '/credit_app/chain_detail/contract_warehouse',
    name: 'contractWarehouse',
    component: contractWarehouse
  },
  {
    path: '/credit_app/chain_detail/contract_transport',
    name: 'contractTransport',
    component: contractTransport
  },
  {
    path: '/credit_app/chain_detail/financing_plan',
    name: 'financingPlan',
    component: financingPlan
  },

  // 查看链式记账订单
  {
    path: '/credit_app/chain_detail/order',
    name: 'institutionOrder',
    component: order
  },
  // 查看链式记账订金
  {
    path: '/credit_app/chain_detail/deposit',
    name: 'institutionDeposit',
    component: deposit
  },
  // 查看链式记账出货单
  {
    path: '/credit_app/chain_detail/outbound',
    name: 'institutionOutbound',
    component: outbound
  },
  // 查看链式记账运单
  {
    path: '/credit_app/chain_detail/waybill',
    name: 'institutionTransport',
    component: waybill
  },
  // 查看链式记账验收单
  {
    path: '/credit_app/chain_detail/acceptance',
    name: 'institutionAcceptance',
    component: acceptance
  },
  {
    path: '/credit_app/chain_detail/settlement',
    name: 'institutionSettlement',
    component: settlement
  },
  {
    path: '/credit_app/chain_detail/invoice',
    name: 'institutionInvoice',
    component: invoice
  },
  {
    path: '/credit_app/chain_detail/payment',
    name: 'institutionPayment',
    component: payment
  },
  // 我的债权
  {
    path: '/debt_app',
    name: 'debtInfo',
    component: debtInfo
  },
  // 我的客户
  {
    path: '/customer_app',
    name: 'areaBusiness',
    component: AreaBusiness
  },
  // 我的客户申请列表
  {
    path: '/customer_app/application_list',
    name: 'customerApply',
    component: businessApply
  },
  // 区域企业查看
  {
    path: '/area_app',
    name: 'areaList',
    component: areaList
  },
  {
    path: '/area_app/business_detail',
    name: 'property',
    component: property
  },
  {
    path: '/credit_app/order_list',
    name: 'viewDetail',
    component: orderList
  },
  {
    path: '/credit_app/view_detail',
    name: 'detailView',
    component: viewDetail
  },
  // 贷后监管
  {
    path: '/loan_app',
    name: 'loan',
    component: Loan
  }
]
