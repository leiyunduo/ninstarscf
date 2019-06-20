<template>
  <div class='usage_card'>
    <div class="card_title">第一还款来源</div>
    <div class='usage_slide'>
      <div>
        <span>销售应收总额（元）：</span>
        <span>{{toThousands(orderSum) || '计算中'}}</span>
      </div>
    </div>
    <div class="item_wrap">
      <div class="business">
        <div class="business_line">
          <div>
            <span>链主企业：</span>
            <span @click="handleOtherBusiness(businessInfo.id)" class='check'>{{businessInfo.name || '未填写'}}</span>
          </div>
          <div>
            <span>营业执照号码：</span>
            <span>{{businessInfo.business_license_id || '未填写'}}</span>
          </div>
          <div>
            <span>法人姓名：</span>
            <span :class='businessInfo.legal_person_name ? "check":"null"' @click="handlePerson(businessInfo.legal_person_name, businessInfo.legal_person_id)">{{businessInfo.legal_person_name || '未填写'}}</span>
          </div>
          <div>
            <span>开户行账号：</span>
            <span>{{businessInfo.open_account_code || '未填写'}}</span>
          </div>
        </div>
        <div class="bank_line">
          <span>开户行：</span>
          <span>{{businessInfo.open_bank}}</span>
        </div>
      </div>
      <div v-for="(item, index) in usage" :key='index' class='usage_item'>
        <div class='contract_info'>
          <div>
            <span>销售项目编号：</span>
            <span @click="handleChain(item)" :title="item.id">{{item.number || '无数据'}}</span>
          </div>
          <div>
            <span>销售项目：</span>
            <span @click="handleChain(item)">{{item.name}}</span>
          </div>
          <div v-if="item.over_rate">
            <span>历史逾期率：</span>
            <span @click="handleOrder(item)" v-if="item.over_rate.s_rate"><i class="el-icon-bell"></i>{{item.over_rate.s_rate.over_rate ? Number(item.over_rate.s_rate.over_rate * 100).toFixed(1) + '%' : '0.0%'}}</span>
          </div>
        </div>
        <div class="bank_title">
          <span>开户行：</span>
          <span>{{partner.open_bank || '未填写'}}</span>
        </div>
        <div v-if="item.settlement" class='order_info'>
          <div v-for='(settlement, index1) in item.settlement' :key='index1'>
            <div class='order_title'>
              <div>
                <span>客户名称：</span>
                <span class='check' @click="handlebusiness(item)">{{item.partner_company_name || '未填写'}}</span>
              </div>
              <div>
                <span>营业执照号码：</span>
                <span>{{partner.business_license_id || '未填写'}}</span>
              </div>
              <div>
                <span>法人姓名：</span>
                <span :class='partner.legal_person_name ? "check":""' @click="handlePerson(partner.legal_person_name, partner.legal_person_id)">{{partner.legal_person_name || '未填写'}}</span>
              </div>
              <div>
                <span>开户行账号：</span>
                <span>{{partner.open_account_code || '未填写'}}</span>
              </div>
            </div>
            <div v-if="settlement.order_list" v-for="(order, orderIndex) in settlement.order_list" :key='orderIndex'>
              <div class="order_title">
                <div>
                  <span>销售订单编号：</span>
                  <span @click="handleOrderView(item)">{{order.number || '无数据'}}</span>
                </div>
                <div>
                  <span>销售订单：</span>
                  <span>{{order.name}}</span>
                </div>
                <div>
                  <span>订单金额（元）：</span>
                  <span>{{toThousands(order.amount)}}</span>
                </div>
              </div>
              <div class='order_title'>
                <div>
                  <span>交货日期：</span>
                  <span>{{order.deliver_date}}</span>
                </div>
                <div>
                  <span>结算期日：</span>
                  <span>{{order.settlement_date}}</span>
                </div>
                <div>
                  <span>订金总额（元）：</span>
                  <span>{{handleSum1(order.deposit)}}</span>
                </div>
              </div>
              <div class="btn_list">
                <button @click="handleFive(0, order)">商流</button>
                <button @click="handleFive(1, order)">资金流</button>
                <button @click="handleFive(2, order)">凭证流</button>
                <button @click="handleFive(3, order)">物流</button>
                <button @click="handleFive(4, order)">信息流</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <financing-ring :id='item.chain_id'></financing-ring>
        </div>
      </div>
    </div>
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
            <span class="check" @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
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
            <span :class="info.partner_company_name ? 'check' : 'null'" @click="handleOtherBusiness(curItem.partner_company)">{{info.partner_company_name}}</span>
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
            <ul v-if="info.att_list.length !== 0" class="inner_file">
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
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>审核方：</span>
            <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>确认方：</span>
            <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
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
            <ul v-if="info.att_list.length !== 0" class="inner_file">
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
            <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>审核方：</span>
            <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>确认方：</span>
            <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
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
              <ul v-if="info.att_list.length !== 0" class="inner_file">
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
              <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
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
              <ul v-if="info.att_list.length !== 0" class="inner_file">
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
              <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
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
              <ul v-if="info.att_list.length !== 0" class="inner_file">
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
              <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
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
              <ul v-if="info.att_list.length !== 0" class="inner_file">
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
              <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span class='check' @click="handleOtherBusiness(infoId)">{{info.company_name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span :class="info.approved ? 'check' : 'null'" @click="handleOtherBusiness(info.partner_company)">{{info.approved ? info.partner_company_name : '未确认'}}</span>
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
    <!-- 五流 -->
    <el-dialog
      :visible.sync="dialogVisibleFive"
      width="39%"
      :modal-append-to-body="false"
      custom-class="show_five_list">
      <!-- 商流 -->
      <div class="five_item" v-if="fives.channel === 0">
        <p>商流：参与企业与人员</p>
        <div class="show_item_line">
          <div>采购方：</div>
          <div class="line_detail">
            <span class="check" @click="handleOtherBusiness(infoId)">{{fives.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>采购方法人：</span>
          </div>
          <div>
            <span @click="handlePerson(fives.legal_person, fives.verifier)" class="check">{{fives.legal_person}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>销售方：</span>
          </div>
          <div>
            <span :class="fives.partner_company_name ? 'check' : 'null'" @click="handleOtherBusiness(fives.partner_company_id)">{{fives.partner_company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>销售方法人：</span>
          </div>
          <div>
            <span>{{fives.partner_legal_person || '企业未登记'}}</span>
          </div>
        </div>
        <div class="show_item_line" v-if="fives.att_list">
          <div class="line_detail">
            <span>单据与票据原件：</span>
          </div>
          <div>
            <ul v-if="fives.att_list.length !== 0" class="item_table">
              <li>
                <div>文件名称</div>
                <div>查看</div>
              </li>
              <li v-for="(item, index) in fives.att_list" :key="index">
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
            <p v-if="fives.att_list.length === 0">未上传原件</p>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>操作方：</span>
            <span class='check' @click="handlePerson(fives.operator_name, fives.operator)">{{fives.operator_name}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span class='check' @click="handleOtherBusiness(infoId)">{{fives.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>审核方：</span>
            <span @click="handlePerson(fives.verifier_name, fives.verifier, fives)" class='check'>{{fives.verifier_name || '企业未登记'}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span class='check' @click="handleOtherBusiness(infoId)">{{fives.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>确认方：</span>
            <span :class="fives.approved ? 'check' : 'null'" @click="handlePerson(fives.approved_name, fives.approved)">{{fives.approved ? fives.approved_name : '企业未登记'}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span :class="fives.approved ? 'check' : 'null'" @click="handleOtherBusiness(fives.partner_company_id)">{{fives.approved ? fives.partner_company_name : '未确认'}}</span>
          </div>
        </div>
        <p class="item_title">仓储管理员登记（出货单）</p>
        <div>
          <div class="show_item_section" v-for="(warehouse, index1) in fives.warehouse_info" :key='index1'>
            <div>
              <span>姓名：</span>
              <span>{{warehouse.keeper || '未填写'}}</span>
            </div>
            <div>
              <span>手机号：</span>
              <span>{{warehouse.phone || '未填写'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{warehouse.service_company_name || '未填写'}}</span>
            </div>
          </div>
        </div>
        <p class="null_line" v-if="fives.warehouse_info.length === 0">未登记仓储管理员（出货单）</p>
        <p class="item_title">仓储管理员登记（验收入库单）</p>
        <div>
          <div class="show_item_section" v-for="(acceptance, index2) in fives.acceptance_info" :key='index2'>
            <div>
              <span>姓名：</span>
              <span>{{acceptance.keeper || '未填写'}}</span>
            </div>
            <div>
              <span>手机号：</span>
              <span>{{acceptance.phone || '未填写'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{acceptance.service_company_name || '未填写'}}</span>
            </div>
          </div>
        </div>
        <p class="null_line" v-if="fives.acceptance_info.length === 0">未登记仓储管理员（验收入库单）</p>
        <p class="item_title">运输管理员登记</p>
        <div>
          <div class="show_item_section" v-for="(transport, index3) in fives.transport_info" :key='index3'>
            <div>
              <span>姓名：</span>
              <span>{{transport.driver || '未填写'}}</span>
            </div>
            <div>
              <span>身份证号：</span>
              <span>{{transport.driver_person_id || '未填写'}}</span>
            </div>
            <div>
              <span>手机号：</span>
              <span>{{transport.phone || '未填写'}}</span>
            </div>
            <div>
              <span>所属公司：</span>
              <span>{{transport.service_company_name || '未填写'}}</span>
            </div>
          </div>
        </div>
        <p class="null_line" v-if="fives.acceptance_info.length === 0">未登记运单司机</p>
      </div>
      <!-- 资金流 -->
      <div class="five_item" v-if="fives.channel === 1">
        <p>资金流</p>
        <div class="five_item_detail" v-if="fives.deposit">
          <p>订金</p>
          <div v-for="(info, index) in fives.deposit" :key='index' class="show_item_detail">
            <div class="show_item_line">
              <div>支付方式：</div>
              <div class="line_detail">
                <span>{{typeList[info.type]}}</span>
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
                <span>{{info.date_created}}</span>
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
                <span>{{info.payment_info.pay_account}}</span>
              </div>
            </div>
            <div class="show_item_line" v-if="info.att_list">
              <div class="line_detail">
                <span>单据与票据原件：</span>
              </div>
              <div>
                <ul v-if="info.att_list.length !== 0" class="inner_file">
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
                <ul v-if="info.agent_list.length !== 0" class="inner_file">
                  <li>
                    <div>经办人姓名</div>
                    <div>所属公司</div>
                  </li>
                  <li v-for="(item, indexAgent) in info.agent_list" :key="indexAgent">
                    <div v-if="item.all_info">
                      <span>{{item.all_info.name}}</span>
                    </div>
                    <div v-if="item.all_info">
                      <span>{{item.all_info.company}}</span>
                    </div>
                  </li>
                </ul>
                <p v-if="info.agent_list.length === 0">未登记经办人</p>
              </div>
            </div>
          </div>
          <div class="five_item_detail" style="border-top: 1px dashed #e3e3e3">
            <p>支付</p>
            <p style="text-align: center">暂无支付</p>
          </div>
        </div>
      </div>
      <!-- 凭证流（文件） -->
      <div class="five_item" v-if="fives.channel === 2">
        <p>文件流</p>
        <div v-for="(item, index) in nines" class="file_list" :key='index'>
          <p class="item_title">{{item.title}}原件</p>
          <ul v-for="(files, indexf) in fives.files[item.key.toLowerCase()]" :key='indexf'>
            <li>
              <div>
                <span>文件名称</span>
              </div>
              <div>
                <span>查看</span>
              </div>
            </li>
            <li>
              <div>
                <span>{{files.name}}</span>
              </div>
              <div>
                <span class="check">
                  <a :href="$root_url() + files.location" target='_blank' class='check'>查看</a>
                </span>
              </div>
            </li>
          </ul>
          <p v-if="fives.files[item.key.toLowerCase()].length === 0">暂无{{item.title}}原件</p>
        </div>
      </div>
      <!-- 物流 -->
      <div class="five_item" v-if="fives.channel === 3">
        <p>物流</p>
        <p class="item_title">出货单</p>
        <div v-if='fives.warehouse'>
          <div v-for="(info, index1) in fives.warehouse" :key='index1' class="show_item_detail">
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
                <ul v-if="info.att_list.length !== 0" class="inner_file">
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
            </div>
            <div class="show_item_line">
              <div class="line_detail">
                <span>审核方：</span>
                <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
              </div>
            </div>
            <div class="show_item_line">
              <div class="line_detail">
                <span>确认方：</span>
                <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
              </div>
            </div>
            <div class="show_item_line" v-if="info.agent_list">
              <div class="line_detail">
                <span>经办人：</span>
              </div>
              <div>
                <ul v-if="info.agent_list.length !== 0" class="inner_file">
                  <li>
                    <div>经办人姓名</div>
                    <div>所属公司</div>
                  </li>
                  <li v-for="(item, indexAgent) in info.agent_list" :key="indexAgent">
                    <div>
                      <span>{{item.all_info.name}}</span>
                    </div>
                    <div>
                      <span>{{item.all_info.company}}</span>
                    </div>
                  </li>
                </ul>
                <p v-if="info.agent_list.length === 0">未登记经办人</p>
              </div>
            </div>
          </div>
          <p v-if="fives.warehouse.length === 0" class='null_line'>暂无出货单</p>
        </div>
        <p class="item_title">运单</p>
        <div v-if='fives.transport'>
          <div v-for="(info, index2) in fives.transport" :key='index2' class="show_item_detail">
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
            <div class="show_item_line" v-if="info.att_list">
              <div class="line_detail">
                <span>单据与票据原件：</span>
              </div>
              <div>
                <ul v-if="info.att_list.length !== 0" class="inner_file">
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
            </div>
            <div class="show_item_line">
              <div class="line_detail">
                <span>审核方：</span>
                <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
              </div>
            </div>
            <div class="show_item_line">
              <div class="line_detail">
                <span>确认方：</span>
                <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
              </div>
            </div>
            <div class="show_item_line" v-if="info.agent_list">
              <div class="line_detail">
                <span>经办人：</span>
              </div>
              <div>
                <ul v-if="info.agent_list.length !== 0" class="inner_file">
                  <li>
                    <div>经办人姓名</div>
                    <div>所属公司</div>
                  </li>
                  <li v-for="(item, indexAgent) in info.agent_list" :key="indexAgent">
                    <div>
                      <span>{{item.all_info.name}}</span>
                    </div>
                    <div>
                      <span>{{item.all_info.company}}</span>
                    </div>
                  </li>
                </ul>
                <p v-if="info.agent_list.length === 0">未登记经办人</p>
              </div>
            </div>
          </div>
          <p v-if="fives.transport.length === 0" class='null_line'>暂无运单</p>
        </div>
        <p class="item_title">验收单</p>
        <div v-if="fives.acceptance">
          <div v-for="(info, index3) in fives.acceptance" :key='index3' class="show_item_detail">
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
                <ul v-if="info.att_list.length !== 0" class="inner_file">
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
            </div>
            <div class="show_item_line">
              <div class="line_detail">
                <span>审核方：</span>
                <span @click="handlePerson(info.verifier_name, info.verifier, info)" class='check'>{{info.verifier_name || '企业未登记'}}</span>
              </div>
            </div>
            <div class="show_item_line">
              <div class="line_detail">
                <span>确认方：</span>
                <span :class="info.approved ? 'check' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
              </div>
            </div>
            <div class="show_item_line" v-if="info.agent_list">
              <div class="line_detail">
                <span>经办人：</span>
              </div>
              <div>
                <ul v-if="info.agent_list.length !== 0" class="inner_file">
                  <li>
                    <div>经办人姓名</div>
                    <div>所属公司</div>
                  </li>
                  <li v-for="(item, indexAgent) in info.agent_list" :key="indexAgent">
                    <div v-if="item.all_info">
                      <span>{{item.all_info.name}}</span>
                    </div>
                    <div v-if="item.all_info">
                      <span>{{item.all_info.company}}</span>
                    </div>
                  </li>
                </ul>
                <p v-if="info.agent_list.length === 0">未登记经办人</p>
              </div>
            </div>
          </div>
          <p v-if="fives.acceptance.length === 0" class='null_line'>未提交验收单</p>
        </div>
      </div>
      <div class="five_item" v-if="fives.channel === 4">
        <div class="show_item_line">
          <div>采购方：</div>
          <div class="line_detail">
            <span class="check" @click="handleOtherBusiness(infoId)">{{fives.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>采购方法人：</span>
          </div>
          <div>
            <span @click="handlePerson(fives.legal_person, fives.verifier)" class="check">{{fives.legal_person}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>销售方：</span>
          </div>
          <div>
            <span :class="fives.partner_company_name ? 'check' : 'null'" @click="handleOtherBusiness(fives.partner_company_id)">{{fives.partner_company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>销售方法人：</span>
          </div>
          <div>
            <span>{{fives.partner_legal_person || '企业未登记'}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>合同有效期：</span>
          </div>
          <div>
            <span>{{fives.date_created}}</span>
            <span>到</span>
            <span>{{fives.end_date}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>订单签订日期：</span>
          </div>
          <div>
            <span>{{fives.order_date}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>交货日期：</span>
          </div>
          <div>
            <span>{{fives.deliver_date}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>结算日期：</span>
          </div>
          <div>
            <span>{{fives.settlement_date}}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 个人 -->
    <person v-if="dialogVisiblePerson" @closeView='dialogVisiblePerson = false' :pid="pid" :pName="pName" :isAgent="isAgent" :top='true'></person>
  </div>
</template>
<script>
import person from '@/components/public/person-info'
import financingRing from '../ring'
export default {
  name: 'firstCard',
  components: {
    person, financingRing
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      diamondIcon: require('../../../../../static/img/chain/zuan_o.png'),
      disdiamondIcon: require('../../../../../static/img/chain/zuan_g.png'),
      usage: [],
      info: {},
      fives: {},
      infoId: {},
      curItem: {},
      orderSum: '',
      dialogVisible: false,
      dialogVisibleFive: false,
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
      typeList: ['现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）'],
      aid: '',
      dialogVisiblePerson: false,
      pid: '',
      pName: '',
      isAgent: '',
      partner: {},
      businessInfo: {},
      uid: ''
    }
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/application/${that.id}/`).then(res => {
      if (res.status === 200) {
        that.infoId = res.data.business
        that.usage = res.data.first_repayment
        that.orderSum = res.data.total ? Number(res.data.total.first_repayment_total).toFixed(2) : false
        that.aid = res.data.business
        that.uid = res.data.id.toString()
        // 申请企业信息
        that.$ajax.get(`/api/company/` + that.usage[0].partner_company + '?detail_info=1').then(res1 => {
          that.partner = {
            id: res1.data.id,
            name: res1.data.detail_info ? res1.data.detail_info.name : null,
            open_account_code: res1.data.detail_info ? res1.data.detail_info.opening_bank_info.bank_account : null,
            open_account_name: res1.data.detail_info ? res1.data.detail_info.opening_bank_info.bank_account_name : null,
            legal_person_name: res1.data.detail_info ? res1.data.detail_info.legal_person_info.name : null,
            business_license: res1.data.detail_info ? res1.data.detail_info.certificates.business_license : null,
            business_license_id: res1.data.detail_info ? res1.data.detail_info.certificates.business_license_id : null,
            legal_person_id: res1.data.detail_info ? res1.data.detail_info.legal_person_info.id : null,
            open_bank: res1.data.detail_info ? res1.data.detail_info.opening_bank_info.bank_branch : null
          }
        })
        // 合作企业视频
        that.$ajax.get(`/api/company/` + that.infoId + '?detail_info=1').then(res1 => {
          that.businessInfo = {
            id: res1.data.id,
            name: res1.data.detail_info ? res1.data.detail_info.name : null,
            open_account_code: res1.data.detail_info ? res1.data.detail_info.opening_bank_info.bank_account : null,
            open_account_name: res1.data.detail_info ? res1.data.detail_info.opening_bank_info.bank_account_name : null,
            legal_person_name: res1.data.detail_info ? res1.data.detail_info.legal_person_info.name : null,
            business_license: res1.data.detail_info ? res1.data.detail_info.certificates.business_license : null,
            business_license_id: res1.data.detail_info ? res1.data.detail_info.certificates.business_license_id : null,
            legal_person_id: res1.data.detail_info ? res1.data.detail_info.legal_person_info.id : null,
            open_bank: res1.data.detail_info ? res1.data.detail_info.opening_bank_info.bank_branch : null
          }
        })
      }
    })
  },
  methods: {
    // 计算订单总和
    handleSum (arr) {
      let s = 0
      arr.forEach(val => {
        if (val.order) {
          val.order.forEach(item => {
            s += Number(item.amount)
          })
        }
      })
      return s.toFixed(2)
    },
    // 计算其他还款来源总额
    handleSum1 (arr) {
      let s = 0
      arr.forEach(val => {
        if (val.amount) {
          s += Number(val.amount)
        } else {
          s += Number(val.appraisement)
        }
      })
      return this.toThousands(s)
    },
    handleItem (index, sw, order, key, item) {
      if (sw) {
        const that = this
        that.curItem = item
        let info = []
        that.$ajax.get(`/api/chain/order/${order.id}/diamond_click?d_type=${key}`).then(res => {
          info = res.data[key.toLowerCase()]
          index === 0 || index === 1 ? that.info = {...info, channel: index} : that.info = {list: info, channel: index}
          that.dialogVisible = true
        })
      }
    },
    // 跳转链式记账
    handleChain (item) {
      window.open(`#/chain_app/receive_chain?id=${item.chain_id}&financing_id=${item.id}`)
    },
    // 跳转企业
    handleOtherBusiness (id) {
      if (id) window.open('#/enterpriseBlog?bid=' + id, '_black')
    },
    // 查看企业
    handlebusiness (item) {
      window.open('#/enterpriseBlog?bid=' + item.partner_company, '_black')
    },
    // 查看历史记账
    handleOrder (item) {
      const that = this
      // let p = item.over_rate.p_rate.order_list
      let partner = [item.partner_company]
      let company = that.aid
      window.open(`#/myFund/order_list?partner=${partner}&company=${company}&tar=s`)
    },
    // 计算五流
    handleFive (index, item) {
      const that = this
      this.dialogVisibleFive = true
      this.curItem = item
      let id = item.id
      let url = [`/api/chain/order/${id}/business_flow/`, `/api/chain/order/${id}/capital_flow/`, `/api/chain/order/${id}/document_flow/`, `/api/chain/order/${id}/logistics_flow/`, `/api/chain/order/${id}/information_flow/`]
      that.$ajax.get(url[index]).then(res => {
        if (index === 0) {
          that.fives = {
            ...res.data, ...res.data.contract_info, channel: 0
          }
        } else if (index === 1) {
          that.fives = {deposit: res.data, channel: 1}
        } else if (index === 2) {
          that.fives = {files: res.data, channel: 2}
        } else if (index === 3) {
          that.fives = {...res.data, channel: 3}
        } else if (index === 4) {
          that.fives = {...res.data.contract_info, order_date: res.data.order_info.date_created, deliver_date: res.data.order_info.deliver_date, settlement_date: res.data.order_info.settlement_date, channel: 4}
        }
      })
    },
    // 查看个人信息
    handlePerson (name, id) {
      if (id) {
        const that = this
        that.pName = name
        that.pid = id
        that.isAgent = false
        that.dialogVisiblePerson = true
      }
    }
  }
}
</script>
<style lang='less' scoped>
  .usage_card {
    width: 1800px;
    background: #f5f5f5;
    // box-shadow: 6px 6px 3px 5px #dadada;
    font-size: 14px;
    .card_title {
      height: 44px;
      background: #666;
      color: #fff;
      padding: 0 20px;
      line-height: 44px;
    }
    .usage_slide {
      display: flex;
      height: 48px;
      align-items: center;
      color: #666;
      div:first-child {
        width: 50%;
        padding: 0 40px;
        // text-align: center;
        // font-weight: bolder;
      }
    }
    .item_wrap {
      padding: 0 20px;
      // background: #fff;
      padding-bottom: 20px;
      .business {
        background: #fff;
        padding: 0 20px;
        &>.business_line {
          display: flex;
          height: 48px;
          align-items: center;
          // width: 33%;
          div {
            width: 25%;
            color: #333;
            padding: 0 10px;
            span:first-child {
              color: #666;
            }
          }
        }
        .bank_line {
          padding: 0 10px;
          display: flex;
          height: 48px;
          align-items: center;
          color: #333;
          border-bottom: 1px dashed #e9e9e9;
          span:first-child {
            color: #666;
          }
        }
      }
      .usage_item {
        padding: 0 20px;
        background: #fff;
        margin-bottom: 15px;
        .contract_info {
          display: flex;
          height: 48px;
          align-items: center;
          border-bottom: 1px solid #e9e9e9;
          background: #FAFAFA;
          div {
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 10px;
            white-space: nowrap;
            width: 25%;
            span:first-child {
              color: #666;
            }
            span:last-child {
              .check;
              transition: all .15s ease-in;
            }
          }
        }
        .order_title {
          display: flex;
          height: 48px;
          align-items: center;
          div {
            width: 25%;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 10px;
            color: #333;
            white-space: nowrap;
            span:first-child {
              // width: 45%;
              color: #666;
            }
            span:last-child {
              // width: 55%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .bank_title {
          display: flex;
          height: 48px;
          align-items: center;
          padding: 0 10px;
          color: #333;
          span:first-child {
            color: #666;
          }
        }
        .diamond {
          position: relative;
          min-height: 96px;
          .line {
            position: absolute;
            border-top: 2px dotted #ccc;
            width: 100%;
            height: 0;
            left: 0;
            top: 27px;
            z-index: 0;
          }
          ul {
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 10px;
            z-index: 2;
            li {
              width: 48px;
              // height: 56px;
              text-align: center;
              background: #fff;
              // background: #fff;
              p {
                text-align: center;
                line-height: 16px;
                color: #666;
              }
              img {
                width: 32px;
              }
            }
          }
        }
        .btn_list {
          height: 50px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          button {
            width: 100px;
            height: 36px;
            border: none;
            background: none;
            color: #eb6100;
            border: 1px solid #eb6100;
            border-radius: 3px;
            transition: all .13s ease-in;
          }
          button:hover {
            background: #f6a66e;
            color: #fff;
          }
        }
      }
    }
  }
  .show_item_list {
    &>div.show_item_detail {
      border-bottom: 1px dashed #e3e3e3;
      margin-bottom: 20px;
      color: #333;
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
  .show_five_list {
    .five_item {
      &>p {
        line-height: 50px;
        // background: #dbdbdb;
        font-weight: bolder;
        color: #666;
        padding: 0 30px;
      }
      .show_item_line {
        min-height: 55px;
        display: flex;
        padding: 15px 20px;
        &>div:first-child {
          width: 22%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          span:first-child {
            color: #666;
          }
        }
        &>div:last-child {
          width: 78%;
          color: #333;
          ul.inner_file {
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
      p.item_title {
        line-height: 32px;
        font-weight: bold;
        color: #333;
        background: #fff;
        border-bottom: 1px dashed #dbdbdb;
      }
      .null_line {
        line-height: 48px;
        text-align: center;
        color: #999;
        background: #fff;
      }
      .show_item_section {
        padding: 15px 20px;
        div {
          padding: 0 16px;
          line-height: 30px;
        }
      }
      .five_item_detail {
        p {
          padding: 0 15px;
          line-height: 50px;
          font-weight: bold;
        }
      }
      .file_list {
        padding: 10px 20px;
        .item_title {
          line-height: 32px;
          color: #333;
          font-weight: bold;
        }
        ul {
          margin: 10px 10px 0;
          border: 1px solid #dbdbdb;
          li {
            display: flex;
            border-bottom: 1px dotted #dbdbdb;
            div {
              width: 50%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 40px;
              text-align: center;
              padding: 0 10px;
            }
          }
          li:last-child {
            border: none;
          }
        }
        p:last-child {
          line-height: 80px;
          text-align: center;
          color: #999;
          margin: 10px 10px 0;
          border: 1px solid #dbdbdb;
          // border-top: none;
        }
      }
    }
  }
  .check {
    color: #eb6100;
    text-decoration: underline;
    cursor: pointer;
  }
  .null {
    color: #999;
  }
</style>
<style>
.show_item_list .el-dialog__header, .show_five_list .el-dialog__header{
  padding: 0;
}
.show_five_list .el-dialog__body {
  padding: 0;
}
</style>
