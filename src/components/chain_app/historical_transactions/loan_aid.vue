<template>
  <div id="loan_aid">
    <div class="flex-add">
      <div class="loan_aid">
        <div class="list">
          <div class="echarts_list">
            <div class="list_nav">
              <h3>信贷资金使用</h3>
              <div class="list_nav_list">
                <ul>
                  <li><p>信贷资金申请总额（元）：</p><span>{{toThousands(credit_funds.expect_value_total)}}</span></li>
                  <li><p>融资申请笔数（笔）：</p><span>{{credit_funds.expect_financing_num}}</span></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="list_data" v-for="(item, index) in credit_funds.fanancing_application_info" :key="index" v-if="credit_funds.fanancing_application_info.length > 0">
              <div class="list_data-list">
                <div class="top_list">
                  <ul>
                    <li><p>融资编号：</p><span>{{item.id}}</span></li>
                    <li>
                      <p>融资类型：</p>
                      <span>
                        <!-- ("0", "应收融资"), ("1", "订单融资"), ("2", "库存融资"), ("3", "贸易融资"), -->
                        {{ Number(item.type) === 0 ? '应收融资' : Number(item.type) === 1 ? '订单融资' : Number(item.type) === 2 ? '库存融资' : '贸易融资'}}
                      </span>
                    </li>
                    <li><p>期望融资金额（元）：</p><span v-if="item.expect_data">{{item.expect_data.value}}</span></li>
                    <li></li>
                  </ul>
                  <ul>
                    <li><p>期望融资时间：</p><span v-if="item.expect_data">{{item.expect_data.expect_loan_date}}</span></li>
                    <li><p>期望还款时间：</p><span v-if="item.expect_data">{{item.expect_data.expect_repayment_date}}</span></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div class="content_list" v-for="(order, index1) in item.loan_purpose[0].order" :key='index1'>
                  <h3>项目详情</h3>
                  <div class="data_list">
                    <div class="data">
                      <ul class="pulice_ul" v-if="item.loan_purpose.length > 0">
                        <li><p>项目编号：</p><span class="blue" @click="jumpChain(item.loan_purpose[0], 0)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.loan_purpose[0].number}}</span></li>
                        <li><p>采购项目：</p><span class="blue" @click="jumpChain(item.loan_purpose[0], 0)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.loan_purpose[0].name}}</span></li>
                        <li><p>交易企业：</p><span class="blue" @click="handleBusiness(item.loan_purpose[0].partner_company)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.loan_purpose[0].partner_company_name}}</span></li>
                        <li><p>逾期率：</p><span v-if="item.loan_purpose[0].over_rate.p_rate">{{(item.loan_purpose[0].over_rate.p_rate.over_rate * 100).toFixed(2) + '%'}}</span></li>
                      </ul>
                      <div class="none-data" v-if="item.loan_purpose.length === 0">暂无信息</div>
                    </div>
                    <div class="data">
                      <div class="title_data">订单信息</div>
                      <ul class="pulice_ul" v-if="item.loan_purpose[0].order.length > 0">
                        <li><p>订单名称：</p><span>{{order.name}}</span></li>
                        <li><p>交货日期：</p><span>{{order.deliver_date}}</span></li>
                        <li><p>结算日期：</p><span>{{order.settlement_date}}</span></li>
                        <li><p>订单金额：</p><span>{{order.amount}}</span></li>
                      </ul>
                      <div class="none-data" v-if="item.loan_purpose[0].order.length === 0">暂无信息</div>
                    </div>
                    <div class="data">
                      <div class="title_data">订金信息</div>
                      <!-- <div class="title_data">
                        <div class="span">订金信息</div>
                        <p>订金总额：
                          <a href="javascript:void(0)" v-if="item.loan_purpose[0].deposit_sum">{{getDepositSum(item.loan_purpose[0].deposit_sum)}}元</a>
                          <span href="javascript:void(0)">暂无数据</span>
                        </p>
                      </div> -->
                      <ul class="pulice_ul" v-if="item.loan_purpose[0].order.length > 0 && order.deposit.length > 0" v-for="(deposit, index2) in order.deposit" :key='index2'>
                        <li><p>订金支付方式：</p><span>{{typeList[deposit.type]}}</span></li>
                        <li><p>票据金额（元）：</p><span>{{deposit.amount}}</span></li>
                        <li v-if="deposit.payment_date"><p>汇票到期日：</p><span>{{deposit.payment_date}}</span></li>
                        <li v-if="!deposit.payment_date"></li>
                        <li></li>
                      </ul>
                      <div class="none-data" v-if="order.deposit.length === 0">暂无信息</div>
                    </div>
                    <div class="data contract-menu__footer">
                      <div class="contract-diamond">
                        <div class="diamond-content">
                          <span class="diamond-content__cutline"></span>
                          <div class="diamond-group">
                            <div v-if="item.loan_purpose[0].order.length > 0" v-for="(nine, index2) in nines" :key='index2' class="diamond-group__item">
                              <img :src="order.diamond[nine.key] ? diamondIcon : disdiamondIcon" alt=""
                                @click="handleItem(index2, order.diamond[nine.key], order, nine.key, item)"
                                :style="order.diamond[nine.key] ? 'cursor: pointer' :'cursor: visiable'">
                              <p>{{nine.title}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="echarts_list">
            <div class="list_nav">
              <h3>信贷自偿性还款来源</h3>
              <div class="list_nav_list">
                <ul>
                  <li><p>质押池总额（元）：</p><span>{{toThousands(g_p_list.p_pool_sum)}}</span></li>
                  <li><p>质押池靠谱系数：</p>
                    <span v-if="g_p_list.p_list.length > 0">{{(g_p_list.p_rate * 100).toFixed(2) + '%'}}</span>
                    <span v-if="g_p_list.p_list.length === 0">--</span>
                  </li>
                  <li><p>质押池估值（元）：</p><span>{{toThousands(g_p_list.p_valuation)}}</span></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="list_data" v-if="g_p_list.p_list.length > 0" v-for="(item, index) in g_p_list.p_list" :key="index">
              <div class="list_data-list">
                <div class="top_list">
                  <ul>
                    <li><p>质押池金额（元）：</p><span>{{toThousands(item.total)}}</span></li>
                  </ul>
                </div>
                <div class="content_list">
                  <h3>项目详情</h3>
                  <div class="data_list">
                    <div class="data">
                      <ul class="pulice_ul">
                        <li><p>项目编号：</p><span class="blue" @click="jumpChain(item.data.contract_info, 0)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.data.contract_info.number}}</span></li>
                        <li><p>销售项目：</p><span class="blue" @click="jumpChain(item.data.contract_info, 0)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.data.contract_info.name}}</span></li>
                        <li>
                          <p>交易企业：</p>
                          <span class="blue" v-if="item.data.contract_info.has_partner" @click="handleBusiness(item.data.contract_info.partner_company_id)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.data.contract_info.partner_company_name}}</span>
                          <span v-if="!item.data.contract_info.has_partner">{{item.data.contract_info.partner_company_name}}</span>
                        </li>
                        <li></li>
                      </ul>
                    </div>
                    <div class="data">
                      <div class="title_data">结算信息</div>
                      <ul class="pulice_ul">
                        <li><p>结算名称：</p><span>{{item.data.name}}</span></li>
                        <li><p>结算日期：</p><span>{{item.data.date_created}}</span></li>
                        <li><p>预计支付日期：</p><span>{{item.data.p_date}}</span></li>
                        <li><p>结算金额：</p><span>{{item.data.amount}}</span></li>
                      </ul>
                    </div>
                    <div class="data">
                      <div class="title_data">订金信息</div>
                      <ul class="pulice_ul" v-for="(deposit, index1) in item.data.deposit_list" :key="index1" v-if="item.data.deposit_list.length > 0">
                        <!-- <li><p>订金总额（元）：</p><span>{{toThousands(deposit.amount)}}</span></li> -->
                        <li><p>订金支付方式：</p><span>{{typeList[deposit.type]}}</span></li>
                        <li><p>票据金额（元）：</p><span>{{toThousands(deposit.amount)}}</span></li>
                        <li v-if="deposit.payment_date"><p>汇票到期日：</p><span>{{deposit.payment_date}}</span></li>
                        <li v-if="!deposit.payment_date"></li>
                        <li></li>
                      </ul>
                      <div class="none-data" v-if="item.data.deposit_list.length === 0">暂无信息</div>
                    </div>
                    <div class="data">
                      <div class="title_data">支付信息</div>
                      <ul class="pulice_ul" v-for="(payment, index1) in item.data.payment_list" :key="index1" v-if="item.data.payment_list.length > 0">
                        <li><p>支付方式：</p><span>{{typeList[payment.type]}}</span></li>
                        <li v-if="payment.payment_date"><p>汇票到期日：</p><span>{{payment.payment_date}}</span></li>
                        <li><p>支付金额（元）：</p><span>{{toThousands(payment.amount)}}</span></li>
                        <li></li>
                        <li v-if="!payment.payment_date"></li>
                      </ul>
                      <div class="none-data" v-if="item.data.payment_list.length === 0">暂无信息</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="list_data">
              <div class="none-data" v-if="g_p_list.p_list.length === 0">暂无信息</div>
            </div>
          </div>
          <div class="echarts_list">
            <div class="list_nav">
              <h3>信贷担保性还款来源</h3>
              <div class="list_nav_list">
                <ul>
                  <li><p>担保池总额（元）：</p><span>{{toThousands(g_p_list.g_pool_sum)}}</span></li>
                  <li><p>担保池靠谱系数：</p>
                    <span v-if="g_p_list.g_list.length > 0">{{(g_p_list.g_rate * 100).toFixed(2) + '%'}}</span>
                    <span v-if="g_p_list.g_list.length === 0">--</span>
                  </li>
                  <li><p>担保池估值（元）：</p><span>{{toThousands(g_p_list.g_valuation)}}</span></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="list_data" v-if="g_p_list.g_list.length > 0" v-for="(item, index) in g_p_list.g_list" :key="index">
              <div class="list_data-list">
                <div class="top_list">
                  <ul>
                    <li><p>担保池金额（元）：</p><span>{{toThousands(item.total)}}</span></li>
                  </ul>
                </div>
                <div class="content_list">
                  <h3>项目详情</h3>
                  <div class="data_list">
                    <div class="data">
                      <ul class="pulice_ul">
                        <li><p>项目编号：</p><span class="blue" @click="jumpChain(item.data.contract_info, 0)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.data.contract_info.number}}</span></li>
                        <li><p>销售项目：</p><span class="blue" @click="jumpChain(item.data.contract_info, 0)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.data.contract_info.name}}</span></li>
                        <li>
                          <p>交易企业：</p>
                          <span class="blue" v-if="item.data.contract_info.has_partner" @click="handleBusiness(item.data.contract_info.partner_company_id)"><img src="../../../../static/img/chain/linker_blue.png" alt="">{{item.data.contract_info.partner_company_name}}</span>
                          <span v-if="!item.data.contract_info.has_partner">{{item.data.contract_info.partner_company_name}}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="data">
                      <div class="title_data">结算信息</div>
                      <ul class="pulice_ul">
                        <li><p>结算名称：</p><span>{{item.data.name}}</span></li>
                        <li><p>结算日期：</p><span>{{item.data.date_created}}</span></li>
                        <li><p>预计支付日期：</p><span>{{item.data.p_date}}</span></li>
                        <li><p>结算金额：</p><span>{{item.data.amount}}</span></li>
                      </ul>
                    </div>
                    <div class="data">
                      <div class="title_data">订金信息</div>
                      <ul class="pulice_ul" v-for="(deposit, index1) in item.data.deposit_list" :key="index1" v-if="item.data.deposit_list.length > 0">
                        <!-- <li><p>订金总额（元）：</p><span>{{toThousands(deposit.amount)}}</span></li> -->
                        <li><p>订金支付方式：</p><span>{{typeList[deposit.type]}}</span></li>
                        <li><p>票据金额（元）：</p><span>{{toThousands(deposit.amount)}}</span></li>
                        <li v-if="deposit.payment_date"><p>汇票到期日：</p><span>{{deposit.payment_date}}</span></li>
                        <li v-if="!deposit.payment_date"></li>
                        <li></li>
                      </ul>
                      <div class="none-data" v-if="item.data.deposit_list.length === 0">暂无信息</div>
                    </div>
                    <div class="data">
                      <div class="title_data">支付信息</div>
                      <ul class="pulice_ul" v-for="(payment, index1) in item.data.payment_list" :key="index1" v-if="item.data.payment_list.length > 0">
                        <li><p>支付方式：</p><span>{{typeList[payment.type]}}</span></li>
                        <li v-if="payment.payment_date"><p>汇票到期日：</p><span>{{payment.payment_date}}</span></li>
                        <li><p>支付金额（元）：</p><span>{{toThousands(payment.amount)}}</span></li>
                        <li v-if="!payment.payment_date"></li>
                        <li></li>
                      </ul>
                      <div class="none-data" v-if="item.data.payment_list.length === 0">暂无信息</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="list_data">
              <div class="none-data" v-if="g_p_list.g_list.length === 0">暂无信息</div>
            </div>
          </div>
          <!-- 其他担保 -->
          <div class="echarts_list">
            <div class="list_nav">
              <h3>其他担保</h3>
              <div class="list_nav_list">
                <ul>
                  <li><p>其他担保总额（元）：</p><span>{{toThousands(credit_funds.other_collateral_total)}}</span></li>
                  <li><p>笔数（笔）：</p><span>{{credit_funds.other_collateral_num}}</span></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="list_data" v-if="credit_funds.fanancing_application_info.length > 0" v-for="(fanancing, index) in credit_funds.fanancing_application_info">
              <div class="list_data-list" v-if="fanancing.other_collateral.length > 0" v-for="(item, index1) in fanancing.other_collateral" :key="index1">
                <div class="top_list">
                  <ul>
                    <li><p>其他担保金额（元）：</p><span>{{toThousands(item.appraisement)}}</span></li>
                  </ul>
                </div>
                <div class="content_list">
                  <h3>项目详情</h3>
                  <div class="data_list">
                    <div class="data">
                      <ul class="pulice_ul">
                        <li><p>类型：</p><span>{{item.collateral_type === '1' ? '房产' : item.collateral_type === '2' ? '汽车' : item.collateral_type === '3' ? '股权' : '基金'}}</span></li>
                        <li><p>市场估值：</p><span>{{item.appraisement}}</span></li>
                        <li></li>
                        <li></li>
                      </ul>
                      <ul class="pulice_ul" v-if="item.collateral_type === '1'">
                        <li><p>城市：</p><span>{{item.city}}</span></li>
                        <li><p>小区/地址：</p><span>{{item.full_address}}</span></li>
                        <li><p>面积：</p><span>{{item.area}}</span></li>
                        <li class="assessment">
                          <p>评估报告：</p>
                          <span v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</span>
                          <span>
                            <a @click="handleFileDetail(it)" v-if="item.att_list.length !== 0 && item.att_list" class="eb_color" v-for="(it, index1) in item.att_list" :key='index1' style="color: #eb6100">{{it.name}}</a>
                          </span>
                        </li>
                      </ul>
                      <ul class="pulice_ul" v-if="item.collateral_type === '2'">
                        <li><p>城市：</p><span>{{item.city}}</span></li>
                        <li><p>车辆型号：</p><span>{{item.car_type}}</span></li>
                        <li class="assessment">
                          <p>评估报告：</p>
                          <span v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</span>
                          <span>
                            <a @click="handleFileDetail(it)" v-if="item.att_list.length !== 0 && item.att_list" class="eb_color" v-for="(it, index1) in item.att_list" :key='index1' style="color: #eb6100">{{it.name}}</a>
                          </span>
                        </li>
                        <li></li>
                      </ul>
                      <ul class="pulice_ul" v-if="item.collateral_type === '3'">
                        <li><p>公司名称：</p><span>{{item.business_name}}</span></li>
                        <li><p>股权比例：</p><span>{{item.ratio}}</span></li>
                        <li class="assessment">
                          <p>评估报告：</p>
                          <span v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</span>
                          <span>
                            <a @click="handleFileDetail(it)" v-if="item.att_list.length !== 0 && item.att_list" class="eb_color" v-for="(it, index1) in item.att_list" :key='index1' style="color: #eb6100">{{it.name}}</a>
                          </span>
                        </li>
                        <li></li>
                      </ul>
                      <ul class="pulice_ul" v-if="item.collateral_type === '4'">
                        <li><p>基金简称：</p><span>{{item.foundation}}</span></li>
                        <li class="assessment">
                          <p>评估报告：</p>
                          <span v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</span>
                          <span>
                            <a @click="handleFileDetail(it)" v-if="item.att_list.length !== 0 && item.att_list" class="eb_color" v-for="(it, index1) in item.att_list" :key='index1' style="color: #eb6100">{{it.name}}</a>
                          </span>
                        </li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="none-data" v-if="fanancing.other_collateral.length === 0">暂无其他担保</div>
            </div>
            <div class="list_data">
              <div class="none-data" v-if="credit_funds.fanancing_application_info.length === 0">暂无其他担保</div>
            </div>
          </div>
          <!-- 风控大厅 -->
          <div class="echarts_list">
            <div class="list_nav">
              <h3>风控大厅</h3>
            </div>
            <div class="list_data" v-for="(item, index) in financing_purposes" :key="index" v-if="financing_purposes.length > 0">
              <div class="list_data-list">
                <div class="top_list">
                  <ul>
                    <li><p>贷款编号：</p><span>{{item.id}}</span></li>
                    <li><p>贷款进度：</p><span>{{sList[item.loan_process_status].title}}</span></li>
                    <li><p>贷款状态：</p><span>{{handleWord(item)}}</span></li>
                    <li><p>风控监控：</p><span class="eb_color" @click="handleRisk(item)"><img src="../../../../static/img/chain/linker_orange.png" alt="">查看</span></li>
                  </ul>
                </div>
                <div class="content_list">
                  <h3>融资用途监控</h3>
                  <div class="data_list">
                    <!-- <div class="top-business">
                      <img class="img" src="../../../../static/img/r_status/normal_s.png" alt="">
                      <div><img src="../../../../static/img/chain/linker_orange.png" alt="">企业一号</div>
                    </div> -->
                    <div class="financing_prosess">
                      <financingRing :id='item.chain_id' :businessId='item.business' :repaymentDate='item.days' :financingDate='item.bill_days' v-if="item.chain_id"/>
                      <p v-if="!item.chain_id">未提交融资用途</p>
                      <h3 v-if="showType === '0'">自偿性还款来源监控</h3>
                      <ul v-if="showType === '0'">
                        <li v-for="(item1, index1) in item.first_repayment" :key='index1'>
                          <financingRing :id='item1.chain_id' :businessId='item1.business' :repaymentDate='item1.days' :financingDate='item1.bill_days'/>
                        </li>
                        <li v-if="item.first_repayment === 0">未提交自偿性还款来源监控</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="block">
              <el-pagination v-if="total" @current-change="handleSizeChange"
                :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
            <div class="list_data">
              <div class="none-data" v-if="financing_purposes.length === 0">暂无信息</div>
            </div>
          </div>
          <!-- 助贷增信 -->
          <div class="echarts_list">
            <div class="list_nav">
              <h3>助贷增信</h3>
            </div>
            <div class="list_data">
              <div class="list_data-list">
                <div class="top_list">
                  <h3 class="top_h3">总授信额（建议）：<span>{{toThousands(Number(g_p_list.p_valuation) + Number(g_p_list.g_valuation))}}（元）</span></h3>
                  <ul style="border-bottom:1px solid rgba(221,221,221,1);padding-bottom:10px;">
                    <li><p>质押池估值（元）：</p><span>{{toThousands(g_p_list.p_valuation)}}</span></li>
                    <li><p>担保池估值（元）：</p><span>{{toThousands(g_p_list.g_valuation)}}</span></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <h3 class="top_h3">单笔授信额（建议）：<span>{{toThousands(credit_funds.min_expect_value)}}~{{toThousands(credit_funds.max_expect_value)}}（元）</span></h3>
                  <ul>
                    <li><p>融资申请笔数：</p><span>{{credit_funds.expect_financing_num}}（笔）</span></li>
                    <li><p>单笔融资需求最小值（万元）：</p><span>{{toThousands(credit_funds.min_expect_value)}}（元）</span></li>
                    <li><p>单笔融资需求最大值（万元）：</p><span>{{toThousands(credit_funds.max_expect_value)}}（元）</span></li>
                    <li><p>融资需求均值（万元）：</p><span>{{toThousands(credit_funds.average_value)}}（元）</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisibleRisk"
      width="1280px">
      <risk :bid='businessId' v-if="dialogVisibleRisk"/>
    </el-dialog>
    <!-- 九环 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="43%"
      custom-class="show_item_list"
      :modal-append-to-body="false">
      <!-- 合同 -->
      <div class="show_item_detail" v-if="info.channel === 0">
        <div class="show_item_line">
          <div>采购方：</div>
          <div class="line_detail">
            <span class="check" @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>采购方法人：</span>
          </div>
          <div>
            <span @click="handlePerson(info.legal_person, info.verifier)" class="check">{{info.legal_person}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>销售方：</span>
          </div>
          <div>
            <span :class="info.partner_company_name ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company_id)">{{info.partner_company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>销售方法人：</span>
          </div>
          <div>
            <span>{{info.partner_legal_person || '企业未登记'}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>合同有效期：</span>
          </div>
          <div>
            <span>{{info.date_created}}</span>
            <span>到</span>
            <span>{{info.end_date}}</span>
          </div>
        </div>
        <div class="show_item_line" v-if="info.att_list">
          <div class="line_detail">
            <span>单据与票据原件：</span>
          </div>
          <div>
            <ul v-if="info.att_list.length !== 0" class="item_table">
              <li>
                <div>文件名称</div>
                <div>查看</div>
              </li>
              <li v-for="(item, index) in info.att_list" :key="index">
                <div>
                  <span>{{item.name}}</span>
                </div>
                <div>
                  <span class="check">
                    <a style="color: #eb6100" :href="$root_url() + item.location" target='_blank'>查看</a>
                  </span>
                </div>
              </li>
            </ul>
            <p v-if="info.att_list.length === 0">未上传原件</p>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>操作方：</span>
            <span class='check' @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>审核方：</span>
            <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>确认方：</span>
            <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company_id)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
          </div>
        </div>
        <div class="show_item_line" v-if="info.agent_list">
          <div class="line_detail">
            <span>经办人：</span>
          </div>
          <div>
            <ul v-if="info.agent_list.length !== 0" class="item_table">
              <li>
                <div>经办人姓名</div>
                <div>所属公司</div>
              </li>
              <li v-for="(item, index) in info.agent_list" :key="index">
                <div>
                  <span>{{item.all_info.name}}</span>
                </div>
                <div>
                  <span>{{item.all_info.company}}</span>
                </div>
              </li>
            </ul>
            <p v-if="info.agent_list.length === 0" >未登记经办人</p>
          </div>
        </div>
      </div>
      <!-- 订单 -->
      <div class="show_item_list" v-else-if="info.channel === 1">
        <div class="show_item_line">
          <div>订单签订日期：</div>
          <div class="line_detail">
            <span>{{info.date_created}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>交货日期：</span>
          </div>
          <div>
            <span>{{info.deliver_date}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>结算日期：</span>
          </div>
          <div>
            <span>{{info.settlement_date}}</span>
          </div>
        </div>
        <div class="show_item_line" v-if="info.att_list">
          <div class="line_detail">
            <span>单据与票据原件：</span>
          </div>
          <div>
            <ul v-if="info.att_list.length !== 0" class="item_table">
              <li>
                <div>文件名称</div>
                <div>查看</div>
              </li>
              <li v-for="(item, index) in info.att_list" :key="index">
                <div>
                  <span>{{item.name}}</span>
                </div>
                <div>
                  <span class="check">
                    <a style="color: #eb6100" :href="$root_url() + item.location" target='_blank'>查看</a>
                  </span>
                </div>
              </li>
            </ul>
            <p v-if="info.att_list.length === 0">未上传原件</p>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>操作方：</span>
            <span class='check' @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
          </div>
          <!-- <div>
            <span>所属公司：</span>
            <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
          </div> -->
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>审核方：</span>
            <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
          </div>
          <!-- <div>
            <span>所属公司：</span>
            <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
          </div> -->
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>确认方：</span>
            <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
          </div>
          <!-- <div>
            <span>所属公司：</span>
            <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company_id)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
          </div> -->
        </div>
        <div class="show_item_line" v-if="info.agent_list">
          <div class="line_detail">
            <span>经办人：</span>
          </div>
          <div>
            <ul v-if="info.agent_list.length !== 0" class="item_table">
              <li>
                <div>经办人姓名</div>
                <div>所属公司</div>
              </li>
              <li v-for="(item, index) in info.agent_list" :key="index">
                <div>
                  <span>{{item.all_info.name}}</span>
                </div>
                <div>
                  <span>{{item.all_info.company}}</span>
                </div>
              </li>
            </ul>
            <p v-if="info.agent_list.length === 0" >未登记经办人</p>
          </div>
        </div>
      </div>
      <!-- 订金 -->
      <div class="show_item_list" v-else-if="info.channel === 2">
        <div v-for="(info, index) in info.list" :key='index' class="show_item_detail">
          <div class="show_item_line">
            <div>支付方式：</div>
            <div class="line_detail">
              <span>{{typeList[info.type]}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>金额（元）：</span>
            </div>
            <div>
              <span>{{info.amount}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>出票日期：</span>
            </div>
            <div>
              <span>{{info.payment_date}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.payment_info">
            <div class="line_detail">
              <span>收款企业：</span>
            </div>
            <div>
              <span>{{info.payment_info.receive_company || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.payment_info">
            <div class="line_detail">
              <span>收款机构：</span>
            </div>
            <div>
              <span>{{info.payment_info.receive_institute || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.payment_info">
            <div class="line_detail">
              <span>收款账号：</span>
            </div>
            <div>
              <span>{{info.payment_info.receive_account || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.payment_info">
            <div class="line_detail">
              <span>付款企业：</span>
            </div>
            <div>
              <span>{{info.payment_info.pay_company || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.payment_info">
            <div class="line_detail">
              <span>付款机构：</span>
            </div>
            <div>
              <span>{{info.payment_info.pay_institute || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.payment_info">
            <div class="line_detail">
              <span>付款账号：</span>
            </div>
            <div>
              <span>{{info.payment_info.pay_account || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.att_list">
            <div class="line_detail">
              <span>单据与票据原件：</span>
            </div>
            <div>
              <ul v-if="info.att_list.length !== 0" class="item_table">
                <li>
                  <div>文件名称</div>
                  <div>查看</div>
                </li>
                <li v-for="(item, index) in info.att_list" :key="index">
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                  <div>
                    <span class="check">
                      <a style="color: #eb6100" :href="$root_url() + item.location" target='_blank'>查看</a>
                    </span>
                  </div>
                </li>
              </ul>
              <p v-if="info.att_list.length === 0">未上传原件</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>操作方：</span>
              <span class='check' @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company_id)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.agent_list">
            <div class="line_detail">
              <span>经办人：</span>
            </div>
            <div>
              <ul v-if="info.agent_list.length !== 0" class="item_table">
                <li>
                  <div>经办人姓名</div>
                  <div>所属公司</div>
                </li>
                <li v-for="(item, index) in info.agent_list" :key="index">
                  <div>
                    <span>{{item.all_info.name}}</span>
                  </div>
                  <div>
                    <span>{{item.all_info.company}}</span>
                  </div>
                </li>
              </ul>
              <p v-if="info.agent_list.length === 0" >未登记经办人</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 出货单 -->
      <div class="show_item_list" v-else-if="info.channel === 3">
        <div v-for="(info, index) in info.list" :key='index' class="show_item_detail">
          <div class="show_item_line">
            <div>出单日期：</div>
            <div class="line_detail">
              <span>{{info.date_created}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>仓管员姓名：</span>
            </div>
            <div>
              <span>{{info.keeper || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>仓管员手机号码：</span>
            </div>
            <div>
              <span>{{info.phone}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>仓管员所属公司：</span>
            </div>
            <div>
              <span>{{info.service_company_name}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.product">
            <div class="line_detail">
              <span>货物信息：</span>
            </div>
            <div class="prodct_list">
              <ul>
                <li>
                  <span>货物名称</span>
                  <span>货物单位</span>
                  <span>货物数量</span>
                  <span>货物总价</span>
                </li>
                <li v-for="(item, index) in info.product" :key="index" class='product_line'>
                  <span v-for="(product, pindex) in item" :key="pindex">{{product}}</span>
                </li>
              </ul>
              <p v-if="info.product.length === 0">未上传货物信息</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>单据金额（元）：</span>
            </div>
            <div>
              <span>{{info.amount}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.att_list">
            <div class="line_detail">
              <span>单据与票据原件：</span>
            </div>
            <div>
              <ul v-if="info.att_list.length !== 0" class="item_table">
                <li>
                  <div>文件名称</div>
                  <div>查看</div>
                </li>
                <li v-for="(item, index) in info.att_list" :key="index">
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                  <div>
                    <span class="check">
                      <a style="color: #eb6100" :href="$root_url() + item.location" target='_blank'>查看</a>
                    </span>
                  </div>
                </li>
              </ul>
              <p v-if="info.att_list.length === 0">未上传原件</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>操作方：</span>
              <span class='check' @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company_id)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.agent_list">
            <div class="line_detail">
              <span>经办人：</span>
            </div>
            <div>
              <ul v-if="info.agent_list.length !== 0" class="item_table">
                <li>
                  <div>经办人姓名</div>
                  <div>所属公司</div>
                </li>
                <li v-for="(item, index) in info.agent_list" :key="index">
                  <div>
                    <span>{{item.all_info.name}}</span>
                  </div>
                  <div>
                    <span>{{item.all_info.company}}</span>
                  </div>
                </li>
              </ul>
              <p v-if="info.agent_list.length === 0" >未登记经办人</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 运单 -->
      <div class="show_item_list" v-else-if="info.channel === 4">
        <div v-for="(info, index) in info.list" :key='index' class="show_item_detail">
          <div class="show_item_line">
            <div>出单日期：</div>
            <div class="line_detail">
              <span>{{info.date_created}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>司机姓名：</span>
            </div>
            <div>
              <span>{{info.driver || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>司机手机号码：</span>
            </div>
            <div>
              <span>{{info.phone}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>司机身份证号：</span>
            </div>
            <div>
              <span>{{info.driver_person_id}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>司机所属公司：</span>
            </div>
            <div>
              <span>{{info.service_company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>出发地：</span>
            </div>
            <div>
              <span>{{info.start_point}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>目的地：</span>
            </div>
            <div>
              <span>{{info.end_point}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.product">
            <div class="line_detail">
              <span>货物信息：</span>
            </div>
            <div class="prodct_list">
              <ul>
                <li>
                  <span>货物名称</span>
                  <span>货物单位</span>
                  <span>货物数量</span>
                  <span>货物总价</span>
                </li>
                <li v-for="(item, index) in info.product" :key="index" class='product_line'>
                  <span v-for="(product, pindex) in item" :key="pindex">{{product}}</span>
                </li>
              </ul>
              <p v-if="info.product.length === 0">未上传货物信息</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>单据金额（元）：</span>
            </div>
            <div>
              <span>{{info.amount}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.att_list">
            <div class="line_detail">
              <span>单据与票据原件：</span>
            </div>
            <div>
              <ul v-if="info.att_list.length !== 0" class="item_table">
                <li>
                  <div>文件名称</div>
                  <div>查看</div>
                </li>
                <li v-for="(item, index) in info.att_list" :key="index">
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                  <div>
                    <span class="check">
                      <a style="color: #eb6100" :href="$root_url() + item.location" target='_blank'>查看</a>
                    </span>
                  </div>
                </li>
              </ul>
              <p v-if="info.att_list.length === 0">未上传原件</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>操作方：</span>
              <span class='check' @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company_id)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.agent_list">
            <div class="line_detail">
              <span>经办人：</span>
            </div>
            <div>
              <ul v-if="info.agent_list.length !== 0" class="item_table">
                <li>
                  <div>经办人姓名</div>
                  <div>所属公司</div>
                </li>
                <li v-for="(item, index) in info.agent_list" :key="index">
                  <div>
                    <span>{{item.all_info.name}}</span>
                  </div>
                  <div>
                    <span>{{item.all_info.company}}</span>
                  </div>
                </li>
              </ul>
              <p v-if="info.agent_list.length === 0" >未登记经办人</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 验收单 -->
      <div class="show_item_list" v-else-if="info.channel === 5">
        <div v-for="(info, index) in info.list" :key='index' class="show_item_detail">
          <div class="show_item_line">
            <div>出单日期：</div>
            <div class="line_detail">
              <span>{{info.date_created}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>仓管员姓名：</span>
            </div>
            <div>
              <span>{{info.keeper || '未填写'}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>仓管员手机号码：</span>
            </div>
            <div>
              <span>{{info.phone}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>仓管员所属公司：</span>
            </div>
            <div>
              <span>{{info.service_company_name}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.product">
            <div class="line_detail">
              <span>货物信息：</span>
            </div>
            <div class="prodct_list">
              <ul>
                <li>
                  <span>货物名称</span>
                  <span>货物单位</span>
                  <span>货物数量</span>
                  <span>货物总价</span>
                </li>
                <li v-for="(item, index) in info.product" :key="index" class='product_line'>
                  <span v-for="(product, pindex) in item" :key="pindex">{{product}}</span>
                </li>
              </ul>
              <p v-if="info.product.length === 0">未上传货物信息</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>单据金额（元）：</span>
            </div>
            <div>
              <span>{{info.amount}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.att_list">
            <div class="line_detail">
              <span>单据与票据原件：</span>
            </div>
            <div>
              <ul v-if="info.att_list.length !== 0" class="item_table">
                <li>
                  <div>文件名称</div>
                  <div>查看</div>
                </li>
                <li v-for="(item, index) in info.att_list" :key="index">
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                  <div>
                    <span class="check">
                      <a style="color: #eb6100" :href="$root_url() + item.location" target='_blank'>查看</a>
                    </span>
                  </div>
                </li>
              </ul>
              <p v-if="info.att_list.length === 0">未上传原件</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>操作方：</span>
              <span class='check' @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(info.partner_company_id)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company_id)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.agent_list">
            <div class="line_detail">
              <span>经办人：</span>
            </div>
            <div>
              <ul v-if="info.agent_list.length !== 0" class="item_table">
                <li>
                  <div>经办人姓名</div>
                  <div>所属公司</div>
                </li>
                <li v-for="(item, index) in info.agent_list" :key="index">
                  <div>
                    <span>{{item.all_info.name}}</span>
                  </div>
                  <div>
                    <span>{{item.all_info.company}}</span>
                  </div>
                </li>
              </ul>
              <p v-if="info.agent_list.length === 0" >未登记经办人</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="show_item_list" v-else-if="info.channel === 6">
        <div v-for="(info, index) in info.list" :key='index' class="show_item_detail">
          <div class="show_item_line">
            <div>结算日期：</div>
            <div class="line_detail">
              <span>{{info.date_created}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>结算金额：</span>
            </div>
            <div>
              <span>{{info.amount}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.file">
            <div class="line_detail">
              <span>单据与票据原件：</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in info.file" :key="index">
                  <span>{{item.name}}</span>
                  <span>查看</span>
                </li>
              </ul>
              <p v-if="info.file.length === 0">未上传原件</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>操作方：</span>
              <span>{{info.operater}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span :class="info.approved ? 'check' : 'null'">{{info.approved || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.partner_business ? 'check' : 'null'">{{info.verifier || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.agent">
            <div class="line_detail">
              <span>经办人：</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in info.agent" :key="index">
                  <span>{{item.name}}</span>
                  <span>{{info.business}}</span>
                </li>
              </ul>
              <p v-if="info.agent.length === 0">未登记经办人</p>
            </div>
          </div>
        </div>
      </div>
      <div class="show_item_list" v-else-if="info.channel === 7">
        <div v-for="(info, index) in info.list" :key='index' class="show_item_detail">
          <div class="show_item_line">
            <div>发票类型：</div>
            <div class="line_detail">
              <span>{{info.invoice_type}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>发票代码：</span>
            </div>
            <div>
              <span>{{info.code}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>发票号码：</span>
            </div>
            <div>
              <span>{{info.number}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>发票日期：</span>
            </div>
            <div>
              <span>{{info.invoice_date}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>发票金额：</span>
            </div>
            <div>
              <span>{{info.amount}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.file">
            <div class="line_detail">
              <span>单据与票据原件：</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in info.file" :key="index">
                  <span>{{item.name}}</span>
                  <span>查看</span>
                </li>
              </ul>
              <p v-if="info.file.length === 0">未上传原件</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>操作方：</span>
              <span>{{info.operater}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span :class="info.approved ? 'check' : 'null'">{{info.approved || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.partner_business ? 'check' : 'null'">{{info.verifier || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.agent">
            <div class="line_detail">
              <span>经办人：</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in info.agent" :key="index">
                  <span>{{item.name}}</span>
                  <span>{{info.business}}</span>
                </li>
              </ul>
              <p v-if="info.agent.length === 0">未登记经办人</p>
            </div>
          </div>
        </div>
      </div>
      <div class="show_item_list" v-else>
        <div v-for="(info, index) in info.list" :key='index' class="show_item_detail">
          <div class="show_item_line">
            <div>支付方式：</div>
            <div class="line_detail">
              <span>{{info.payment_type}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>金额：</span>
            </div>
            <div>
              <span>{{info.amount}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>出票日期：</span>
            </div>
            <div>
              <span>{{info.payment_date}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>收款企业：</span>
            </div>
            <div>
              <span>{{info.getter}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>收款机构：</span>
            </div>
            <div>
              <span>{{info.getter_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>收款账号：</span>
            </div>
            <div>
              <span>{{info.getter_account}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>付款企业：</span>
            </div>
            <div>
              <span>{{info.payer}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>付款机构：</span>
            </div>
            <div>
              <span>{{info.payyer_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>付款账号：</span>
            </div>
            <div>
              <span>{{info.payyer_account}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.file">
            <div class="line_detail">
              <span>单据与票据原件：</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in info.file" :key="index">
                  <span>{{item.name}}</span>
                  <span>查看</span>
                </li>
              </ul>
              <p v-if="info.file.length === 0">未上传原件</p>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>操作方：</span>
              <span>{{info.operater}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span :class="info.approved ? 'check' : 'null'">{{info.approved || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.partner_business ? 'check' : 'null'">{{info.verifier || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{info.business}}</span>
            </div>
          </div>
          <div class="show_item_line" v-if="info.agent">
            <div class="line_detail">
              <span>经办人：</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in info.agent" :key="index">
                  <span>{{item.name}}</span>
                  <span>{{info.business}}</span>
                </li>
              </ul>
              <p v-if="info.agent.length === 0">未登记经办人</p>
            </div>
          </div>
        </div>
      </div> -->
    </el-dialog>
    <!-- 个人 -->
    <person v-if="dialogVisiblePerson" @closeView='dialogVisiblePerson = false' :pid="pid" :pName="pName" :isAgent="isAgent"></person>
  </div>
</template>

<script>
import financingRing from './ring'
import risk from '@/components/asset_app/riskManagement'
import person from '@/components/public/person-info'
export default {
  name: 'loanAid',
  data () {
    return {
      company_id: '',
      diamondList: ['合同', '订单', '订金', '出货单', '运单', '验收入库单', '结算', '发票', '支付'],
      chain_list: [
        {status: "1", days: 0}, {status: "1", days: 0}, {status: "0", days: 0}, {status: "0", days: 0},
        {status: "0", days: 0}, {status: "0", days: 0}, {status: "1", days: 0}, {status: "0", days: 0}, {status: "0", days: 0}
      ],
      nines: [
        {title: '合同', key: 'Contract'},
        {title: '订单', key: 'Order'},
        {title: '订金', key: 'Deposit'},
        {title: '出货单', key: 'Warehouse'},
        {title: '运单', key: 'Transport'},
        {title: '验收入库单', key: 'Acceptance'},
        {title: '结算', key: 'Settlement'},
        {title: '发票', key: 'Invoice'},
        {title: '支付', key: 'Payment'}
      ],
      typeList: ['', '现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）'],
      // 信贷资金
      credit_funds: {
        expect_financing_num: '',
        expect_value_total: '',
        fanancing_application_info: [],
        max_expect_value: '',
        min_expect_value: '',
        other_collateral_num: '',
        other_collateral_total: '',
        average_value: ''
      },
      first_repayment: [],
      chain_id: '',
      businessId: '',
      days: '',
      bill_days: '',
      showType: '1',
      g_p_list: {
        // 担保g
        g_list: [],
        g_pool_sum: '',
        g_rate: '',
        g_valuation: '',
        // 质押p
        p_list: [],
        p_pool_sum: '',
        p_rate: '',
        p_valuation: '',
        g_p_valuation: ''
      },
      financing_purposes: [],
      total: '',
      pageSize: 6,
      currPage: 1,
      sList: {
        '600': {title: '企业申请展期', color: '#eb6100'},
        '601': {title: '待还款（展期成功）', color: '#eb6100'},
        '602': {title: '待还款', color: '#eb6100'},
        '700': {title: '待还款', color: '#eb6100'},
        '701': {title: '还款信息待确认', color: '#eb4e3d'},
        '702': {title: '已还贷', color: '#006400'}
      },
      diamondIcon: require('../../../../static/img/chain/zuan_b.png'),
      disdiamondIcon: require('../../../../static/img/chain/zuan_g.png'),
      dialogVisibleRisk: false,
      info: {list: [], att_list: [], agent_list: []},
      dialogVisible: false,
      dialogVisiblePerson: false
    }
  },
  components: {
    financingRing,
    risk,
    person
  },
  mounted () {
    let that = this
    if (that.bid) {
      that.company_id = that.bid
    } else {
      that.company_id = localStorage.id
    }
    that.$ajax.get('/api/financing/statistics/increase_credit/?company_id=' + that.company_id).then(res => {
      that.credit_funds = res.data
    })
    that.$ajax.get('/api/oth/asset/loan_asset_pool/?company_id=' + that.company_id).then(res => {
      // 担保g    质押p
      that.g_p_list = res.data
      if (that.g_p_list.g_valuation) {
        that.g_p_list.g_p_valuation = that.g_p_list.g_valuation + that.g_p_list.p_valuation
      }
    })
    // 融资用途监控
    that.$ajax.get('/api/financing/application/?page=1&page_size=6&status__in=3' + '&company_id=' + that.company_id).then(res => {
      if (res.status === 200) {
        let financing_purposes = []
        if (res.data.results.length > 0) {
          res.data.results.forEach(val => {
            let chain_id = ''
            if (val.type === '1') {
              chain_id = val.application_data.chain_id
            } else {
              if (val.application_data.loan_purpose.length !== 0) {
                chain_id = val.application_data.loan_purpose[0].chain_id
              } else {
                chain_id = null
              }
            }
            financing_purposes.push({
              id: val.id,
              financing_id: (val.id).toString(),
              type: val.type,
              business: val.business,
              business_name: val.business_info.name,
              avatar: val.business_info.avatar,
              days: val.days,
              bill_days: val.bill_days,
              loan_process_status: val.loan_info.loan_process_status,
              repayment_date: val.loan_info.repayment_date,
              amount: that.toThousands(val.loan_info.repayment_value) + '元' ,
              chain_id,
              first_repayment: val.first_repayment,
              day_status: val.warning_info.status,
              info_tip: val.warning_info.msg_list,
            })
          })
        }
        that.financing_purposes = financing_purposes
        that.total = res.data.count
      }
    })
  },
  props: ['bid'],
  methods: {
    handleOtherBusiness (id) {
      console.log(id)
      if (id) window.open('#/enterpriseBlog?bid=' + id)
    },
    // 查看个人信息
    handlePerson (name, id) {
      console.log(name)
      if (id) {
        const that = this
        that.pName = name
        that.pid = id
        that.isAgent = false
        that.dialogVisible = false
        that.dialogVisiblePerson = true
      }
    },
    handleItem (index, sw, order, key, item) {
      if (sw) {
        const that = this
        this.curItem = item
        let info = []
        that.$ajax.get(`/api/chain/order/${order.id}/diamond_click?d_type=${key}`).then(res => {
          info = res.data[key.toLowerCase()]
          index === 0 || index === 1 ? that.info = {...info, channel: index} : that.info = {list: info, channel: index}
          that.dialogVisible = true
          console.log(that.info)
        })
      }
    },
    // --------分页
    handleSizeChange (val) {
      var that = this
      this.currPage = val
      // 融资用途监控
      that.$ajax.get('/api/financing/application/?page=' + that.currPage + '&page_size=6' + '&status__in=3' + '&company_id=' + that.company_id).then(res => {
        if (res.status === 200) {
          let financing_purposes = []
          if (res.data.results.length > 0) {
            res.data.results.forEach(val => {
              let chain_id = ''
              if (val.type === '1') {
                chain_id = val.application_data.chain_id
              } else {
                if (val.application_data.loan_purpose.length !== 0) {
                  chain_id = val.application_data.loan_purpose[0].chain_id
                } else {
                  chain_id = null
                }
              }
              financing_purposes.push({
                id: val.id,
                financing_id: (val.id).toString(),
                type: val.type,
                business: val.business,
                business_name: val.business_info.name,
                avatar: val.business_info.avatar,
                days: val.days,
                bill_days: val.bill_days,
                loan_process_status: val.loan_info.loan_process_status,
                repayment_date: val.loan_info.repayment_date,
                amount: that.toThousands(val.loan_info.repayment_value) + '元' ,
                chain_id,
                first_repayment: val.first_repayment,
                day_status: val.warning_info.status,
                info_tip: val.warning_info.msg_list,
              })
            })
          }
          that.financing_purposes = financing_purposes
          that.total = res.data.count
        }
      })
    },
    handleFileDetail (item) {
      window.open(this.$root_url() + item.url, '_blank')
    },
    // 查看风险管理卡片
    handleRisk (item) {
      this.dialogVisibleRisk = true
      this.businessId = item.business
    },
    // 返回文案
    handleWord (item) {
      if (item.days < 0) {
        return `已经逾期${Math.abs(item.days)}天`
      } else if (item.days === 0) {
        return `当日还款`
      } else {
        return `距离还款日还有${item.days}天`
      }
    },
    // 跳转链式记账
    jumpChain (el, i) {
      console.log(el)
      const that = this
      if (i === 0) {
        let id = el.chain_id
        let path = '#/chain_app/payment_chain?id='
        if (el.chain_type) {
          el.chain_type === 2 ? path = '#/chain_app/payment_chain?id=' : path = '#/chain_app/receive_chain?id='
        }
        let str = ''
        window.open(`${path}${id}`)
      }
    },
    // 查看企业首页
    handleBusiness (el) {
      window.open('#/enterpriseBlog?bid=' + el + '&histor=1')
    },
    // 循环计算总和
    getDepositSum (arr) {
      let s = 0
      arr.forEach(val => {
        s += Number(val.amount)
      })
      return s.toFixed(2)
    },
  }
}
</script>

<style lang="less" scoped>
#loan_aid {
  min-width: 1400px;
  .loan_aid {
    .list {
      .title {
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(51,51,51,1);
        padding-bottom: 19px;
      }
      .echarts_list {
        width: 100%;
        height:auto;
        background:rgba(255,255,255,1);
        margin-bottom: 20px;
        .list_nav {
          border-bottom: 1px solid rgba(221,221,221,1);
          height: auto;
          padding: 0 30px;
          h3 {
            height: 54px;
            font-size:18px;
            font-family:MicrosoftYaHei;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height: 54px;
          }
          .list_nav_list {
            ul {
              display: flex;
              flex-direction: row;
              height: 50px;
              line-height: 50px;
              padding: 0 30px;
              li {
                flex: 1;
                height: 50px;
                p {
                  font-size:16px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                  float: left;
                }
                span {
                  font-size:16px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  float: left;
                  color:rgba(51,51,51,1);
                }
              }
            }
          }
        }
        .list_data {
          background:rgba(255,255,255,1);
          width: 100%;
          height: auto;
          padding: 20px 30px 30px;
          .list_data-list {
            border: 1px solid rgba(221,221,221,1);
            .top_list {
              ul {
                display: flex;
                flex-direction: row;
                padding: 0 30px;
                li {
                  flex: 1;
                  height: 40px;
                  line-height: 40px;
                  p {
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    float: left;
                  }
                  span {
                    float: left;
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                  }
                  .eb_color {
                    color: #eb6100;
                  }
                }
              }
              .top_h3 {
                font-size:16px;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                padding: 30px 0 24px;
                span {
                  font-size:16px;
                  font-family:PingFang-SC-Regular;
                  font-weight:bold;
                  color:rgba(51,51,51,1);
                }
              }
            }
            .content_list {
              border: 1px solid rgba(220,220,220,1);
              margin-top: 20px;
              box-sizing: border-box;
              h3 {
                height:50px;
                background:rgba(250,250,250,1);
                font-size:16px;
                font-family:MicrosoftYaHei;
                border-bottom: 1px solid rgba(220,220,220,1);
                font-weight:400;
                color:rgba(51,51,51,1);
                padding: 0 30px;
                line-height: 50px;
              }
              .data_list {
                padding: 0 30px 30px;
                .title_data {
                  font-size:14px;
                  font-family:MicrosoftYaHei;
                  font-weight:bold;
                  color:#333;
                  padding-top: 23px;
                  height: 42px;
                  .span {
                    float: left;
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    letter-spacing:0;
                    text-align:left;
                    margin-right: 134px;
                  }
                  p {
                    float: left;
                    font-family:PingFangSC-Regular;
                    font-size:12px;
                    color:#666666;
                    letter-spacing:0;
                    text-align:left;
                    a {
                      color: #e87626;
                      text-decoration: none;
                    }
                  }
                }
                ul {
                  border-bottom: 1px solid rgba(221,221,221,1);
                  li {
                    line-height: 58px;
                    height: 58px;
                  }
                }
                .contract-menu__footer {
                  margin: 0 20px;
                  .contract-diamond {
                    .diamond-content {
                      margin-top: 25px;
                      position: relative;
                      .diamond-content__cutline {
                        width: 90%;
                        position: absolute;
                        border: 1px dashed #e1e6f0;
                        display: block;
                        left: 5%;
                        top: 8px;
                      }
                      .diamond-group {
                        display: flex;
                        justify-content: space-between;
                        .diamond-group__item {
                          flex: 1;
                          text-align: center;
                          img {
                            position: relative;
                            top: -10px;
                          }
                          .hasWarning {
                            position: relative;
                          }
                          .hasWarning::after {
                            content: '';
                            position: absolute;
                            width: 50px;
                            height: 50px;
                            top: -10px;
                            left: 50%;
                            transform: translateX(-50%);
                            background: url('../../../../static/img/chain/zuan_t.png');
                            animation: diamonLight 1s ease-in-out 0s infinite;
                            -moz-animation: diamonLight 1s ease-in-out 0s infinite;
                            -webkit-animation: diamonLight 1s ease-in-out 0s infinite;
                          }
                          p {
                            color: #666;
                            font-size: 14px;
                            margin-top: -18px;
                          }
                        }
                      }
                      @keyframes diamonLight {
                        0%{
                          opacity: 0;
                        }
                        100%{
                          opacity: 1;
                        }
                      }
                    }
                  }
                }
                .top-business {
                  height: 145px;
                  border-bottom: 1px solid rgba(221,221,221,1);
                  text-align: center;
                  .img {
                    width:80px;
                    height:80px;
                    margin-top: 22px;
                  }
                  div {
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    text-decoration:underline;
                    color:rgba(235,97,0,1);
                    cursor: pointer;
                    img {
                      margin-right: 10px;
                      width:13px;
                      height:13px;
                    }
                  }
                }
              }
              .financing_prosess {
                margin-top: 20px;
                p {
                  text-align: center;
                  padding-top: 20px;
                }
              }
            }
            .none-data {
              line-height: 58px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              font-style:italic;
              color:rgba(102,102,102,1);
              border-bottom: 1px solid rgba(221,221,221,1);
            }
          }
          .list_data-list:last-child {
            border: none;
          }
          .pulice_ul {
            display: flex;
            flex-direction: row;
            li {
              flex: 1;
              p {
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(102,102,102,1);
                float: left;
              }
              span {
                float: left;
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
              }
            }
            .assessment {
              p {
                float: left;
                width: 70px;
                height: 58px;
              }
              span {
                float: left;
                padding-right: 5px;
                flex-direction: column;
                width: 230px;
                display: flex;
                justify-content: center;
                align-items: Center;
                line-height: 58px;
                height: 58px;
                a {
                  display: block;
                  width: 230px;
                  line-height: 20px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
            .blue {
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              text-decoration:underline;
              color:rgba(12,141,255,1);
              cursor: pointer;
              img {
                margin-right: 10px;
                width:13px;
                height:13px;
              }
            }
          }
          .eb_color {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            cursor: pointer;
            text-decoration:underline;
            color: #eb6100;
            img {
              margin-right: 10px;
              width:13px;
              height:13px;
            }
          }
        }
      }
    }
    .block {
      text-align: center;
    }
  }
  .none-data {
    line-height: 58px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    font-style:italic;
    color:rgba(102,102,102,1);
    border-bottom: 1px solid rgba(221,221,221,1);
  }
}
.show_item_list {
  &>div.show_item_detail {
    border-bottom: 1px dashed #e3e3e3;
    margin-bottom: 20px;
    color: #333;
  }
  span {
    cursor: pointer;
  }
  .show_item_line {
    min-height: 55px;
    display: flex;
    padding: 15px 0;
    &>div:first-child {
      width: 22%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #666;
    }
    &>div:last-child {
      width: 78%;
      color: #333;
      ul.item_table {
        border: 1px solid #dbdbdb;
        li {
          border-bottom: 1px dotted #dbdbdb;
          display: flex;
          div {
            width: 50%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        li:last-child {
          border: none;
        }
        li:first-child {
          background: #e3e3e3;
        }
        li.product_line {
          span {
            width: 25%;
          }
        }
      }
    }
    .prodct_list {
      margin: 0;
      padding: 0;
      ul {
        border: 1px solid #dbdbdb;
        li {
          border-bottom: 1px dotted #dbdbdb;
          display: flex;
          span {
            width: 25%;
            text-align: center;
            color: #666;
            line-height: 40px;
          }
        }
        li:first-child {
          background: #e3e3e3;
        }
        li:last-child {
          border: none;
        }
      }
    }
  }
}
</style>
