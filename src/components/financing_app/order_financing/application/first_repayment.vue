<template>
  <div class="order_usage">
    <div class="title">
      <h3>第一还款来源（自偿性）</h3>
    </div>
    <div class="show_list">
      <div v-for="(item, index) in selList" v-if="selList.length !== 0" :key='index' class="sel_item">
        <div class="get_sum">
          <div>
            <!-- <img :src="tq" alt=""> -->
            <span class="one">金额：</span>
            <span class="two">{{selSum(item)}}元</span>
          </div>
        </div>
        <div class="contract_title">产生来源</div>
        <div class="sel_line">
          <div>
            <span>项目编号：</span>
            <span @click="handleChain(item)">{{item.number}}</span>
          </div>
          <div>
            <span>销售项目：</span>
            <span @click="handleChain(item)">{{item.name}}</span>
          </div>
          <div>
            <span>交易企业：</span>
            <span @click="handleBusiness(item)">{{item.partner_company_name}}</span>
          </div>
          <div v-if="item.over_rate">
            <span>逾期率：</span>
            <span v-if="item.over_rate.s_rate" @click="handleOrder(item)">{{Number(item.over_rate.s_rate.over_rate * 100).toFixed(1) + '%'}}</span>
          </div>
        </div>
        <ul class="order_info" v-if="item.order">
          <li v-for="(order, index1) in item.order" :key='index1'>
            <div class="order_data">
              <div>
                <span>订单名称：</span>
                <span>{{order.name}}</span>
              </div>
              <div>
                <span>交货日期：</span>
                <span>{{order.deliver_date}}</span>
              </div>
              <div>
                <span>结算日期：</span>
                <span>{{order.settlement_date}}</span>
              </div>
              <div>
                <span>订单金额：</span>
                <span>{{toThousands(order.amount)}}</span>
                <span>元</span>
              </div>
            </div>
            <div style="padding:0 20px;">
              <div class="diamond" v-if="order.diamond">
                <div class="line"></div>
                <ul>
                  <li v-for="(nine, index2) in nines" :key='index2'>
                    <img 
                      :src="order.diamond[nine.key] ? diamondIcon : disdiamondIcon" 
                      alt=""
                      @click="handleItem(index2, order.diamond[nine.key], order, nine.key, item)"
                      :style="order.diamond[nine.key] ? 'cursor: pointer' :'cursor: visiable'">
                    <p>{{nine.title}}</p>
                  </li>
                </ul>
              </div>
              <div class="deposit_line">
                <div class="deposit_title">
                  <span>订金信息</span>
                  <p v-if="order.deposit">
                    <span>订金总额：</span>
                    <span v-if="order.deposit" style="font-weight: bold;">{{getDepositSum(order.deposit)}}元</span>
                  </p>
                </div>
              </div>
              <div class="deposit_list" v-if='order.deposit'>
                <div class="deposit_detail">
                  <div v-for="(deposit, index2) in order.deposit" :key='index2'>
                    <div>
                      <span>订金支付方式：</span>
                      <span>{{typeList[deposit.type]}}</span>
                    </div>
                    <div>
                      <span>票据金额：</span>
                      <span>{{deposit.amount}}</span>
                      <span>元</span>
                    </div>
                    <div>
                      <span>{{deposit.payment_date ? '汇票到期日：' : '支付日期：'}}</span>
                      <span>{{deposit.payment_date || deposit.date_created}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="is_null" v-if="!order.deposit">无相关订金信息</div>
          </li>
        </ul>
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
    <div class="btn_list">
      <div @click="handleNext">下一步</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderFirstRepayment',
  data () {
    return {
      tq: require('../../../../../static/img/tickets/tq_01.png'),
      selList: [],
      diamondIcon: require('../../../../../static/img/chain/zuan_o.png'),
      disdiamondIcon: require('../../../../../static/img/chain/zuan_g.png'),
      typeList: ['', '现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）'],
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
      dialogVisible:false,
      info: {},
      dialogVisiblePerson: false
    }
  },
  mounted () {
    const that = this
    let chainId = this.$parent.steps[0].emitData.list[0].chain_id
    this.$ajax.get(`/api/financing/first_repayment/?chain_id=${chainId}&type=0`).then(res => {
      if (res.status === 200) {
        that.selList = res.data
        // that.selList = res.data.c
      }
    })
  },
  methods: {
    // 循环计算总和
    getDepositSum (arr) {
      let s = 0
      arr.forEach(val => {
        s += Number(val.amount)
      })
      return s.toFixed(2)
    },
    // 计算书券总额
    selSum (el) {
      let s = 0
      if (el.order) {
        el.order.forEach(val => {
          s += Number(val.amount)
        })
      }
      return s.toFixed(2)
    },
    // 查看九环
    handleItem (index, sw, order, key, item) {
      if (sw) {
        const that = this
        that.curItem = item
        let info = []
        that.$ajax.get(`/api/chain/order/${order.id}/diamond_click?d_type=${key}`).then(res => {
          info = res.data[key.toLowerCase()]
          index === 0 || index === 1 ? that.info = {...info, channel: index} : that.info = {list: info, channel: index}
          that.dialogVisible = true
          // console.log(that.info)
        })
      }
    },
    // 点击进行下一步，通过emit传递父组件数据
    handleNext () {
      this.$emit('first', this.selList)
    },
    // 查看链式记账
    handleChain (el) {
      let id = el.chain_id
      let path = '#/chain_app/payment_chain?id='
      window.open(`${path}${id}`)
    },
    // 查看企业首页
    handleBusiness (el) {
      // return false
      window.open('#/enterpriseBlog?tTypes=2&bid=' + el.partner_company, '_black')
    },
    // 查看历史记账
    handleOrder (item) {
      const that = this
      // let p = item.over_rate.p_rate.order_list
      let partner = [item.partner_company]
      let company = localStorage.id
      window.open(`#/financing_app/order_list?partner=${partner}&company=${company}&tar=s&ic=b`)
    }
  },
}
</script>
<style lang="less" scoped>
.order_usage {
  margin: 0 40px;
  background:#ffffff;
  border:1px solid #eaeaea;
  border-radius:2px;
  // width:100%;
  height:auto;
  padding: 0 53px 22px 21px;
  .title {
    height: 52px;
    border-bottom: 1px solid #eaeaea;
    padding-top: 20px;
    h3 {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#333333;
      letter-spacing:0;
      text-align:left;
      font-weight: bold;
      border-left: 5px solid #eb6100;
      height: 24px;
      padding-left: 22px;
      line-height: 24px;
    }
  }
  .show_list {
    .get_sum {
      // background:#ffffff;
      border-bottom :1px solid #eaeaea;
      // box-shadow:0 0 5px 0 #eaeaea;
      height:52px;
      text-align: center;
      // max-width: 300px;
      // border-top: none;
      div {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 14px;
        padding: 0 20px;
        img {
          margin-left: 27px;
          margin-top: 6px;
          margin-right: 18px;
        }
        span:last-child {
          color: #eb6100;
          font-weight: bold;
        }
      }
    }
    .sel_item {
      // border:1px dashed #eaeaea;
      box-shadow:0 0 10px 2px #eaeaea;
      width:100%;
      height:auto;
      margin-bottom: 20px;
      .contract_title {
        line-height: 42px;
        padding: 0 27px;
        font-weight: bolder;
        border-bottom: 1px dashed #eaeaea;
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
      }
      .sel_line {
        display: flex;
        padding: 0 20px;
        // height: 41px;
        div {
          width: 20%;
          line-height: 41px;
          word-break: break-all;
          margin-right: 28px;
          span {
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:left;
          }
          span:last-child {
            color: #eb6100;
            text-decoration: underline;
            cursor: pointer;
            font-weight: bolder;
          }
        }
      }
      .order_title {
        background: #fafafa;
        line-height: 40px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        span:first-child {
          font-weight: bold;
        }
      }
      .order_info {
        padding-bottom: 12px;
        background:#ffffff;
        border:1px solid #eaeaea;
        &>li {
          margin-bottom: 20px;
          list-style: none;
          .order_data {
            padding: 0 20px;
            line-height: 50px;
            background:#f7f7f7;
            display: flex;
            width:100%;
            height:50px;
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#333333;
            letter-spacing:0;
            text-align:left;
            div {
              // margin-right: 15px;
              width: 22%;
            }
          }
          .diamond {
            position: relative;
            min-height: 96px;
            padding: 0 20px;
            .line {
              position: absolute;
              border-top: 2px dotted #ccc;
              width: calc(100% - 40px);
              height: 0;
              left: 20px;
              top: 27px;
              z-index: 0;
            }
            ul {
              width: calc(100% - 40px);
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
                  line-height: 20px;
                  color: #666;
                }
                img {
                  width: 32px;
                }
              }
            }
          }
          .deposit_line {
            padding-left: 28px;
            .deposit_title {
              border-bottom:1px dashed #eaeaea;
              height: 44px;
              line-height: 44px;
              img {
                width: 13px;
                height: 13px;
                margin-right: 8px;
                margin-top: 14px;
                float: left;
                margin-left: 20px;
              }
              &>span {
                float: left;
                font-family:PingFangSC-Semibold;
                font-size:12px;
                color:#666666;
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
                  // color: #e87626;
                  text-decoration: none;
                }
              }
            }
          }
          .deposit_list {
            display: flex;
            flex-direction: row;
            padding: 8px 0 12px 210px;
            border-bottom: 1px dashed #eaeaea;
            div:first-child {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
            }
            .deposit_detail {
              flex: 1;
              &>div {
                display: flex;
                height: 32px;
                align-items: center;
                &>div {
                  // display: flex;
                  width: 30%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  padding: 0 10px;
                  span {
                    font-family:PingFangSC-Regular;
                    font-size:14px;
                    color:#333333;
                    letter-spacing:0;
                    text-align:left;
                  }
                  span:first-child {
                    color: #666;
                  }
                }
              }
            }
          }
          .level_line {
            line-height: 40px;
            padding: 0 20px;
            font-size: 14px;
            .level_title {
              padding-left: 50px;
              border-bottom: 1px dashed #ccc;
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              padding-top: 8px;
              span:last-child {
                margin-left: 24px;
              }
            }            
          }
          .level_list {
            .level_loop {
              padding: 0 20px;
              display: flex;
              background: #fff;
              li {
                list-style: none;
                width: 100% / 9;
                height: 80px;
                position: relative;
                display: flex;
                flex-direction: column;
                div {
                  width: 100%;
                  border-bottom: 1px dashed #999;
                  height: 30px;
                }
                span {
                  height: 49px;
                  line-height: 59px;
                  // text-align: center;
                  padding: 0 10px;
                  font-size: 14px;
                }
                img {
                  position: absolute;
                  top: 20px;
                  left: 12px;
                  // width: 70%;
                }
              }
              li:first-child {
                div {
                  margin-left: 25px;
                }
              }
              li:last-child {
                div{
                  border: none;
                }
              }
            }
          }
          .is_null {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
    .is_null {
      height: 160px;
      line-height: 160px;
      text-align: center;
      color: #999;
    }
  }
  .btn_list {
    padding: 24px 0;
    div {
      width: 120px;
      text-align: center;
      color: #fff;
      line-height: 30px;
      margin: 0 auto;
      cursor: pointer;
      background: #e87626;
      border-radius: 2px;
      height: 30px;
      font-size: 12px;
      letter-spacing: 0;
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
</style>
<style>
.show_item_list .el-dialog__header, .show_five_list .el-dialog__header{
  padding: 0;
}
.show_five_list .el-dialog__body {
  padding: 0;
}
</style>
