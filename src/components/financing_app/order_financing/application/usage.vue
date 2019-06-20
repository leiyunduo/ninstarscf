<template>
  <div class="order_usage">
    <div class="demand">
      <div class="show_title">
        <h3>融资用途</h3>
      </div>
      <div class="show_list">
        <div class="get_sum">
          <div>
            <div>
              <h3>最大融资限额：{{maxException}}元</h3>
            </div>
            <div>
              <h3>累计订单总额：{{selSum}}元</h3>
            </div>
          </div>
          <div>
          </div>
          <button class="btn_create" @click="handleModel"><i class="el-icon-plus"></i>选择需融资订单</button>
        </div>
        <div v-for="(item, index) in selList" v-if="selList.length !== 0" :key='index' class="open_sel_item sel_item_list">
          <div class="list">
            <div class="sel_line">
              <div class="show_section">
                <ul v-if="item.over_rate">
                  <li><span>项目编号：</span><p @click="handleChain(item)">{{item.number}}</p></li>
                  <li><span>采购项目：</span><p @click="handleChain(item)">{{item.name}}</p></li>
                  <li><span>销售企业：</span><p @click="handleBusiness(item)">{{item.partner_company_name}}</p></li>
                  <li v-if="item.over_rate.p_rate"><span>逾期率：</span><p @click="handleOrder(item)">{{Number(item.over_rate.p_rate.over_rate * 100).toFixed(1) + '%'}}</p></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="order_title" v-if="item.order">
              <span>订单信息</span>
            </div>
            <ul class="order_info" v-if="item.order">
              <li v-for="(order, index1) in item.showOrder" :key='index1'>
                <div class="order_data">
                  <div>
                    <p>订单名称：</p>
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
                  <div>
                    <span @click='handleDelete(index, index1, order)' style="color: #ff3400">删除</span>
                  </div>
                </div>
                <div class='diamond' v-if="order.diamond">
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
                <div class="usage_deposit_line">
                  <div class="deposit_title">
                    <img src="../../../../../static/img/chain/chain_circle_m_b.png" alt="">
                    <span>订金信息</span>
                    <p v-if="order.deposit">订金总额：<a href="javascript:void(0)" v-if="order.deposit">{{getDepositSum(order.deposit)}}元</a></p>
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
                        <span>{{deposit.amount}}元</span>
                      </div>
                      <div>
                        <span>{{deposit.payment_date ? '汇票到期日：' : '支付日期：'}}</span>
                        <span>{{deposit.payment_date || deposit.date_created}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="is_null" v-if="!order.deposit">暂无订金</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="second_list_none" v-if="selList.length === 0">
          <img src="../../../../../static/img/other/none.png" alt="">
          <h4>还没添加融资用途，请选择需要融资的采购订单</h4>
        </div>
      </div>
    </div>
    <div class="demand">
      <div class="show_title">
        <h3>融资需求</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>期望融资金额：</span>
          <input type="text" placeholder="金额不能大于最大融资限额" v-model="amount">
          <span>（元）</span>
        </div>
        <div class="inpit_lint">
          <span>期望融资时间：</span>
          <el-date-picker
            v-model="exceptDate"
            type="date"
            placeholder="选择日期"
            size='small'>
          </el-date-picker>
        </div>
        <div class="inpit_lint">
          <span>期望还款时间：</span>
          <el-date-picker
            v-model="repaymentDate"
            type="date"
            placeholder="选择日期"
            size='small'>
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="demand">
      <div class="show_title">
        <h3>还款路径</h3>
      </div>
      <div class="input_list">
        <div class="inpit_lint">
          <span>还款账户：</span>
          <input type="text" placeholder="请输入交易账户名称" v-model="bankAccountName">
        </div>
        <div class="inpit_lint">
          <span>还款账号：</span>
          <input type="text" placeholder="请输入交易账户账号" v-model="bankAccountNumber">
        </div>
        <div class="inpit_lint">
          <span>开户行：</span>
          <input type="text" placeholder="请输入交易账号开户行名称" v-model="bankInfo">
        </div>
      </div>
    </div>
    <div class="btn_list">
      <div @click="handleNext">下一步</div>
    </div>
    <!-- 选择列表弹框 -->
    <el-dialog :visible.sync="showModal" width="1278px">
      <div v-for="(item, index) in checkList" :class="{open_class: item.slide === 1}" v-if="checkList.length !== 0 && item.show" :key='index' class="open_sel_item">
        <div class="sel_line">
          <div class="show_section">
            <ul v-if="item.over_rate">
              <li><span>项目编号：</span><p @click="handleChain(item)">{{item.number}}</p></li>
              <li><span>采购项目：</span><p @click="handleChain(item)">{{item.name}}</p></li>
              <li><span>交易企业：</span><p @click="handleBusiness(item)">{{item.partner_company_name}}</p></li>
              <li v-if="item.over_rate.p_rate"><span>逾期率：</span><p @click="handleOrder(item)">{{Number(item.over_rate.p_rate.over_rate * 100).toFixed(1) + '%'}}</p></li>
              <li>
                <!-- <button :class="item.sel ? 'open' : 'no_open'">{{item.sel ? '选择' : '取消选择'}}</button> -->
                <button @click="handleSlide(index)" class="open">{{item.slide ? selectName = '收起' : selectName = '查看'}}</button>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="order_title" v-if="index === limit"> -->
        <div class="order_title" v-if="item.slide">
          <span>订单信息</span>
        </div>
        <ul class="order_info" v-if="item.slide">
          <li v-for="(order, index1) in item.order" :key='index1'>
            <div class="order_data">
              <div>
                <p>
                  订单名称：
                </p>
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
              <div class="order_data_btn">
                <button @click="handleOrderSelect(index, index1, order.sel)">{{!order.sel ? '选择' : '取消'}}</button>
                <!-- <el-checkbox-group style="width:100px;height:24px;" @change="handleOrderSelect($event)" v-model="checkboxGroup" size="mini" text-color='#fff' fill="#e87626">
                  <el-checkbox-button :label="order.id" :key="index1">选择</el-checkbox-button>
                </el-checkbox-group> -->
              </div>
            </div>
            <div class='diamond' v-if="order.diamond">
              <div class="line"></div>
              <ul>
                <li v-for="(nine, index2) in nines" :key='index2'>
                  <el-tooltip placement="top" :disabled="!order.diamond[nine.key]">
                    <div slot="content">
                      <p>点此查看详情信息</p>
                    </div>
                    <img 
                      :src="order.diamond[nine.key] ? diamondIcon : disdiamondIcon" 
                      alt=""
                      @click="handleItem(index2, order.diamond[nine.key], order, nine.key, item)"
                      :style="order.diamond[nine.key] ? 'cursor: pointer' :'cursor: visiable'">
                  </el-tooltip>
                  <p>{{nine.title}}</p>
                </li>
              </ul>
            </div>
            <div class="usage_deposit_line">
              <div class="deposit_title">
                <img src="../../../../../static/img/chain/chain_circle_m_b.png" alt="">
                <span>订金信息</span>
                <p v-if="order.deposit">订金总额：<a href="javascript:void(0)" v-if="order.deposit">{{getDepositSum(order.deposit)}}元</a></p>
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
                    <span>{{deposit.amount}}元</span>
                  </div>
                  <div>
                    <span>{{deposit.payment_date ? '汇票到期日：' : '支付日期：'}}</span>
                    <span>{{deposit.payment_date || deposit.date_created}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="is_null" v-if="!order.deposit">暂无订金</div>
          </li>
        </ul>
      </div>
      <div class="btn_wrap" v-if="checkList.length !== 0">
        <button @click="handleSelect">确定</button>
      </div>
      <div v-if="checkList.length === 0" style="color: #999;text-align: center">没有可以用于融资的合同。</div>
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
            <span class="check">{{info.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>采购方法人：</span>
          </div>
          <div>
            <span @click="handlePerson(info.legal_person, info.verifier)" :class="info.verifier ? 'link_to' : 'null'">{{info.legal_person}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>销售方：</span>
          </div>
          <div>
            <span :class="curItem.partner_company ? 'link_to' : 'null'" @click="handleOtherBusiness(curItem.partner_company)">{{info.partner_company_name}}</span>
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
            <span :class="info.operator ? 'link_to' : 'null'" @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span class="null">{{info.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>审核方：</span>
            <span @click="handlePerson(info.verifier_name, info.verifier)" :class="info.verifier ? 'link_to' : 'null'">{{info.verifier_name || '企业未登记'}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span class="null">{{info.company_name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>确认方：</span>
            <span :class="info.approved ? 'link_to' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
          </div>
          <div>
            <span>所属公司：</span>
            <span :class="curItem.partner_company ? 'link_to' : 'null'" @click="handleOtherBusiness(curItem.partner_company)">{{info.partner_company_name}}</span>
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
            <span :class="info.operator ? 'link_to' : 'null'" @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
          </div>
          <div class="line_detail">
            <span>所属公司：</span>
            <span class="null">{{self.name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>审核方：</span>
            <span @click="handlePerson(info.verifier_name, info.verifier)" :class="info.verifier ? 'link_to' : 'null'">{{info.verifier_name || '企业未登记'}}</span>
          </div>
          <div class="line_detail">
            <span>所属公司：</span>
            <span class="null">{{self.name}}</span>
          </div>
        </div>
        <div class="show_item_line">
          <div class="line_detail">
            <span>确认方：</span>
            <span :class="info.approved ? 'link_to' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
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
              <span :class="info.operator ? 'link_to' : 'null'" @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
            </div>
            <div class="line_detail">
            <span>所属公司：</span>
            <span class="null">{{self.name}}</span>
          </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier)" :class="info.verifier ? 'link_to' : 'null'">{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div class="line_detail">
              <span>所属公司：</span>
              <span class="null">{{self.name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'link_to' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
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
              <span :class="info.operator ? 'link_to' : 'null'" @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
            </div>
            <div class="line_detail">
              <span>所属公司：</span>
              <span class="null">{{self.name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier)" :class="info.verifier ? 'link_to' : 'null'">{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div class="line_detail">
              <span>所属公司：</span>
              <span class="null">{{self.name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'link_to' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
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
              <span :class="info.operator ? 'link_to' : 'null'" @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
            </div>
            <div class="line_detail">
              <span>所属公司：</span>
              <span class="null">{{self.name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier)" :class="info.verifier ? 'link_to' : 'null'">{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div class="line_detail">
              <span>所属公司：</span>
              <span class="null">{{self.name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'link_to' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
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
              <span :class="info.operator ? 'link_to' : 'null'" @click="handlePerson(info.operator_name, info.operator)">{{info.operator_name}}</span>
            </div>
            <div class="line_detail">
              <span>所属公司：</span>
              <span class="null">{{self.name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>审核方：</span>
              <span @click="handlePerson(info.verifier_name, info.verifier)" :class="info.verifier ? 'link_to' : 'null'">{{info.verifier_name || '企业未登记'}}</span>
            </div>
            <div class="line_detail">
              <span>所属公司：</span>
              <span class="null">{{self.name}}</span>
            </div>
          </div>
          <div class="show_item_line">
            <div class="line_detail">
              <span>确认方：</span>
              <span :class="info.approved ? 'link_to' : 'null'" @click="handlePerson(info.approved_name, info.approved)">{{info.approved ? info.approved_name : '企业未登记'}}</span>
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
    <person v-if="dialogVisiblePerson" :pid="pid" :pName="pName" @closeView="closeview" :isAgent="isAgent"/>
  </div>
</template>
<script>
import person from '@/components/public/person-info'
export default {
  name: 'orderUsage',
  components: {person},
  data () {
    return {
      showModal: false,
      // 收起展开
      selectName: '',
      limit: -1,
      checkboxGroup: [],
      checkList: [],
      typeList: ['', '现金', '支票', '汇票（银行承兑汇票）', '汇票（商业承兑汇票）', '汇票（信用证）'],
      selList: [],
      repaymentDate: '',
      exceptDate: '',
      amount: '',
      // 选择订单
      radio: '',
      maxException: '0.00',
      bankAccountName: '',
      bankAccountNumber: '',
      bankInfo: '',
      diamondIcon: require('../../../../../static/img/chain/zuan_b.png'),
      disdiamondIcon: require('../../../../../static/img/chain/zuan_g.png'),
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
      dialogVisiblePerson: false,
      pName: '',
      pid: '',
      isAgent: false,
      self: {}
    }
  },
  // updated () {
  //   let a = this.$parent
  //   if (a.steps[0].emitData.amount) {
  //     this.selList = a.steps[0].emitData.list
  //     this.exceptDate = a.steps[0].emitData.except_date
  //     this.repaymentDate = a.steps[0].emitData.repayment_date
  //     this.amount = a.steps[0].emitData.amount
  //   }
  // },
  mounted () {
    const that = this
    this.$ajax.get('/api/financing/payable_order_list/').then(res => {
      if (res.status === 200) {
        res.data.forEach((val, index) => {
          val.sel = false
          val.show = true
          val.slide = true
          if (val.order) {
            val.order.forEach((el, index1) => {
              el.sel = false
            })
          }
        })
        that.checkList = res.data
      }
    })
    this.self.id = localStorage.id
    this.self.name = unescape(localStorage.self_name)
  },
  methods: {
    closeview () {
      this.dialogVisiblePerson = false
    },
    // 跳转企业
    handleOtherBusiness (id) {
      if (id) window.open('#/enterpriseBlog?bid=' + id, '_black')
    },
    // 循环计算总和
    getDepositSum (arr) {
      let s = 0
      arr.forEach(val => {
        s += Number(val.amount)
      })
      return s.toFixed(2)
    },
    // 缺口计算
    async handleShortage1 (arr, sw) {
      const that = this
      if (arr.length !== 0) {
        let chainId = arr[0].chain_id
        let orderIdList = []
        arr.forEach(contract => {
          contract.showOrder.forEach(order => {
            if (order.sel) {
              orderIdList.push(order.id)
            }
          })
        })
        let s = await that.$ajax.put('/api/financing/limit_value/', {chain_id: chainId, order_id_list: orderIdList})
        // return s.toFixed(2)
      } else {
        return await '0.00'
      }
    },
    // 计算缺口old
    // 缺口计算
    handleShortage (arr, sw) {
      let os = 0
      let ds = 0
      let recDs = 0
      if (arr[0]) recDs = arr[0].deposit_sum
      arr.forEach(contract => {
        contract.showOrder.forEach(order => {
          os += Number(order.amount)
          if (order.deposit) {
            order.deposit.forEach(deposit => {
              ds += Number(deposit.amount)
            })
          }
        })
      })
      let shortage = os - ds - recDs
      if (sw) {
        return shortage < 0 ? '0.00' : shortage.toFixed(2)
      } else {
        return shortage.toFixed(2)
      } 
    },
    // 弹出层显示
    handleModel () {
      this.showModal = true
      let checkList = this.checkList
      let selList = this.selList
    },
    // 点击展开
    handleSlide (index) {
      let checkList = this.checkList
      checkList[index].slide = !checkList[index].slide
    },
    // 点击选择项目
    // handleSelect (index) {
    //   let checkList = this.checkList
    //   console.log(checkList[index].sel)
    //   if (!checkList[index].sel) {
    //     checkList[index].sel = true
    //     checkList[index].slide = true
    //     // checkList[3].show = false
    //   } else {
    //     // checkList[3].show = true
    //     checkList[index].sel = false
    //   }
    // },
    // 点击选择订单
    handleOrderSelect (indexContract, indexOrder, sw) {
      const that = this
      let checkList = this.checkList
      checkList[indexContract].order[indexOrder].sel = !sw
      this.setContract(checkList)
    },
    // 筛选同一条链式记账下合同
    setContract (checkList) {
      let selId = ''
      checkList.forEach((val, index) => {
        val.order.forEach((el, i) => {
          if (el.sel) selId = val.chain_id
        })
      })
      checkList.forEach((val, index) => {
        val.show = true
        if (selId) {
          if (val.chain_id !== selId) val.show = false
        }
      })
      this.checkList = checkList
    },
    // 将组织好的列表统计到选择列表
    handleSelect () {
      const that = this
      let arr = []
      let orderIdList = []
      let check = this.checkList
      check.forEach(val => {
        let orderArr = []
        let currentContract = val
        val.order.forEach(el => {
          if (el.sel) {
            orderArr.push(el)
            orderIdList.push(el.id)
          }
        })
        currentContract.showOrder = orderArr
        if (orderArr.length !== 0) arr.push(currentContract)
      })
      that.selList = arr
      if (arr.length === 0) {
        that.showModal = false
        that.maxException = '0.00'
      } else {
        let chainId = arr[0].chain_id
        that.$ajax.put('/api/financing/limit_value/', {order_id_list: orderIdList, chain_id: chainId}).then(res => {
          that.showModal = false
          that.maxException = that.toThousands(res.data.limit_value)
        })
      }
      // return true
    },
    // 从外部取消选择
    handleDelete (index, index1, el) {
      // index, index1, 用于定位selList
      const that = this
      let selList = that.selList
      let checkList = that.checkList
      let orderIdList = []
      if (selList[index].showOrder.length === 1) {
        selList.splice(index, 1)
      } else {
        selList[index].showOrder.splice(index1, 1)
      }
      let delId = el.id
      checkList.forEach(val => {
        val.order.forEach(el => {
          if (el.id === delId) el.sel = false
          if (el.sel) orderIdList.push(el.id)
        })
      })
      that.selList = selList
      that.checkList = checkList
      if (selList.length === 0) {
        that.maxException = '0.00'
      } else {
        let chainId = checkList[0].chain_id
        that.$ajax.put('/api/financing/limit_value/', {order_id_list: orderIdList, chain_id: chainId}).then(res => {
          that.maxException = that.toThousands(res.data.limit_value)
        })
      }
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
        })
      }
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
    },
    // 查看历史记账
    handleOrder (item) {
      const that = this
      // let p = item.over_rate.p_rate.order_list
      let partner = [item.partner_company]
      let company = localStorage.id
      window.open(`#/financing_app/order_list?partner=${partner}&company=${company}&tar=p&ic=b`)
    },
    // 点击下一步，验证后通过emit传输
    handleNext () {
      const that = this
      if (that.selList.length === 0) {
        // 判断融资用途
        that.$message.error('请选择融资用途')
      } else {
        if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.amount))) {
          // 判断是否填写金额
          that.$message.error('请填写正确的融资金额')
        } else {
          if (Number(that.amount) >= that.maxException && Number(that.amount) !== 0) {
            // 判断金额是否超标
            that.$message.error('融资金额不得大于最大融资限额')
          } else {
            if (!that.exceptDate) {
              // 判断是否选择融资时间
              that.$message.error('请选择期望融资时间')
            } else {
              if (Date.parse(that.exceptDate) + (60 * 1000 * 60 * 24) < Date.parse(new Date())) {
                // 判断是否今天之前
                that.$message.error('请选择正确的期望融资时间')
              } else {
                if (!that.repaymentDate) {
                  // 判断是否填写还款时间
                  that.$message.error('请选择期望还款时间')
                } else {
                  if (Date.parse(this.repaymentDate) < Date.parse(that.exceptDate)) {
                    // 判断是否为今天之前
                    that.$message.error('请选择正确的期望还款时间')
                  } else {
                    that.$emit('usage', {
                      list: that.selList,
                      except_date: that.exceptDate,
                      repayment_date: that.repaymentDate,
                      amount: Number(that.amount).toFixed(2),
                      bankInfo: {
                        bank_account_name: that.bankAccountName,
                        bank_account_number: that.bankAccountNumber,
                        open_bank_info: that.bankInfo
                      }
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  computed: {
    selSum: function () {
      const that = this
      let s = 0
      this.selList.forEach(el => {
        if (el.showOrder) {
          el.showOrder.forEach(val => {
            s += Number(val.amount)
          })
        }
      })
      return that.toThousands(s)
    }
  }
}
</script>
<style lang="less" scoped>
.null {
  color: #999;
}
.link_to {
  color: #eb6100;
  text-decoration: underline;
  cursor: pointer;
}
.order_usage {
  margin: 0 40px;
  .show_title {
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
  .demand {
    background:#ffffff;
    border:1px solid #eaeaea;
    border-radius:2px;
    width:100%;
    height:auto;
    margin-top: 20px;
    padding: 0 20px;
  }
  .show_list {
    .get_sum {
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      // padding: 0 20px;
      color: #666;
      font-size: 14px;
      align-items: center;
      &>div {
        display: flex;
        h3 {
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#333333;
          letter-spacing:0;
          text-align:left;
          font-weight: bold;
          padding: 5px 10px 0 8px;
        }
      }
      .btn_create {
        text-align: center;
        line-height: 28px;
        cursor: pointer;
        border: none;
        outline: none;
        color: #fff;
        background:#e87626;
        border-radius:2px;
        width:181px;
        height:28px;
        // margin-right: 30px;
        i {
          display: inline-block;
          padding-right: 10px;
        }
      }
    }
    .sel_item_list {
      .list {
        box-shadow:0 0 10px 1px #eaeaea;
        .order_info {
          border:1px solid #eaeaea;
          border-top: none;
          &>li {
            border:1px solid #eaeaea;
            margin-bottom: 20px;
            border-left: none;
            border-right: none;
          }
          &>li:first-child {
            border-top: none;
          }
          &>li:last-child {
            margin-bottom: 0px;
            border-bottom: 1px solid #eaeaea;
          }
          .order_data {
            div {
              p {
                padding-left: 24px;
              }
            }
            div:last-child {
              text-align:right;
              span {
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#666666;
                letter-spacing:0;
                font-weight: normal;
                text-decoration: underline;
                cursor: pointer;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
          }
        }
      }
      .sel_line {
        border-bottom: 1px dashed #eaeaea;
        .show_section {
          ul {
            li {
              padding: 0 10px;
              width: 25%;
              display: flex;
              span {
                font-family:PingFangSC-Semibold;
                font-size:14px;
                color:#666666;
                letter-spacing:0;
                text-align:left;
                font-weight: bold;
                width: 30%;
              }
              p {
                width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
  .input_list {
    padding: 0 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    .inpit_lint {
      height: 48px;
      font-size: 14px;
      flex: 1;
      span {
        font-family:PingFangSC-Semibold;
        font-size:12px;
        color:#666666;
        letter-spacing:0;
        text-align:left;
        display: inline-block;
        padding-left: 8px;
      }
      input {
        background:#ffffff;
        border:1px solid #eaeaea;
        border-radius:2px;
        color: #606266;
        width:220px;
        height:32px;
        outline: none;
        padding: 0 10px;
        transition: all .2s;
        font-size: 14px;
        border-radius: 4px;
      }
      input::placeholder {
        color: #C0C4CC;
      }
      input:hover {
        border-color: #c0c4cc;
      }
    }
    // .inpit_lint:first-child {
    //   min-width: 371px;
    // }
  }
  .btn_list {
    padding: 24px 0;
    div {
      width: 120px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      margin: 0 auto;
      cursor: pointer;
      background:#e87626;
      border-radius:2px;
      height:30px;
      font-family:PingFangSC-Semibold;
      font-size:12px;
      color:#ffffff;
      letter-spacing:0;
    }
  }
  .second_list_none {
    text-align: center;
    min-height: 200px;
    img {
      width:162px;
      height:125px;
      margin-top: 20px;
    }
    h4 {
      color: #999;
    }
  }
  .open_sel_item {
    // padding: 0 60px;
    color: #333;
    margin-bottom: 28px;
    height: auto;
    width: 100%;
    .sel_line {
      background:#ffffff;
      border:1px solid #eaeaea;
      width:100%;
      height:47px;
      .show_section {
        ul {
          width: 100%;
          display: flex;
          flex-direction: row;
          // padding-left: 30px;
          li {
            width: 22%;
            min-height:47px;
            line-height: 47px;
            display: flex;
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
              width: 30%;
            }
            p {
              width: 70%;
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#eb6100;
              letter-spacing:0;
              text-align:left;
              text-decoration: underline;
              font-weight: bold;
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          // li:nth-child(3) {
          //   p {
          //     color: #333;
          //     cursor: default;
          //     text-decoration: none;
          //     font-weight: normal;
          //   }
          // }
          li:last-child {
            width: 12%;
            // text-align: right;
            justify-content: flex-end;
            span {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#eb6100;
              letter-spacing:0;
              float: right;
              text-decoration: underline;
              cursor: pointer;
            }
            button {
              float: right;
              margin: 11px 11px 0 44px;
              border-radius:2px;
              width:100px;
              height:24px;
              border: none;
              outline: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#eb6100;
              letter-spacing:0;
              text-align:center;
              // background:#eb6100;
              margin-right: 34px;
              text-decoration: underline;
              background: #fff;
            }
          }
        }
      }
    }
    .order_title {
      font-family:PingFangSC-Semibold;
      font-size:14px;
      color:#666;
      letter-spacing:0;
      text-align:left;
      padding-left: 48px;
      height: 38px;
      line-height: 38px;
      border-left: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      // border-bottom: 1px solid #eaeaea;
      span {
        font-weight: bold;
      }
    }
    .order_info {
      background:#ffffff;
      border:1px soild #eaeaea;
      border-bottom: none;
      width:100%;
      height:auto;
      &>li {
        border:1px solid #eaeaea;
        // margin-bottom: 20px;
        // border-left: none;
        // border-right: none;
        border-top: none;
        .order_data {
          display: flex;
          flex-direction: row;
          background:#f7f7f7;
          width:100%;
          height:50px;
          line-height: 50px;
          padding: 0 24px;
          div {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            span {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
            }
            p {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:left;
              display: inline-block;
              span {
                width:12px;
                height:12px;
                display: inline-block;
                border-radius: 50%;
                border: 1px solid #9b9b9b;
                position: relative;
                cursor: pointer;
                margin-right: 10px;
                a {
                  position: absolute;
                  display: inline-block;
                  background:#9b9b9b;
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  top: 2px;
                  left: 2px;
                }
              }
            }
            span:last-child {
              font-weight: bold;
            }
          }
          .order_data_btn {
            text-align: right;
            .el-checkbox-group {
              text-align: right;
            }
            .el-checkbox-button--mini {
              width:100px;
              height:24px;
              border-radius:2px;
            }
            .el-checkbox-button__inner {
              display: inline-block;
              width:100px;
              height:24px;
              border-radius:2px;
            }
            .el-checkbox-button:last-child .el-checkbox-button__inner {
              width: 100px;
              height: 24px;
              line-height: 10px;
              border-radius: 2px;
            }
            .el-checkbox-button__inner:hover {
              color: #e87626;
            }
            button {
              float: right;
              margin: 11px 11px 0 44px;
              border-radius:2px;
              width:100px;
              height:24px;
              border: none;
              outline: none;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#ffffff;
              letter-spacing:0;
              background:#eb6100;
              text-align:center;
            }
          }
        }
        .usage_deposit_line {
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
            span {
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
                color: #e87626;
                text-decoration: none;
              }
            }
          }
        }
        .deposit_list {
          display: flex;
          flex-direction: row;
          padding: 8px 0 12px 227px;
          div:first-child {
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#666666;
            letter-spacing:0;
            text-align:left;
          }
          .deposit_detail {
            flex: 1;
            div {
              display: flex;
              flex-direction: row;
              div {
                width: 30%;
                text-align: center;
                line-height: 32px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                  font-family:PingFangSC-Regular;
                  font-size: 14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                }
                span:first-child {
                  color: #666;
                }
              }
              div:first-child {
                padding: 0 30px;
              }
            }
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
        .is_null {
          font-family:PingFangSC-Semibold;
          font-size:12px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          padding: 8px 0 12px 69px;
        }
        .order_data_btn {
          text-align: right;
          span {
            margin-left: 20px;
            padding: 8px 15px;
            border-radius: 2px;
            cursor: pointer;
          }
          .using {
            color: #fff;
            background: #eb6100;
          }
          .useless {
            color: #333;
            background: #ccc;
          }
        }
      }
      &>li:first-child {
        border-top: 1px soild #eaeaea;
      }
      &>li:last-child {
        margin-bottom: 0px;
        border-bottom: 1px solid #eaeaea;
      }
    }
  }
  .btn_wrap {
    text-align: center;
    padding-top: 30px;
    button {
      width: 72px;
      height: 30px;
      color: #fff;
      background: #eb6100;
      border: none;
      margin: 0;
      padding: 0;
      outline: none;
      border-radius: 3px;
    }
  }
  .open_class {
    .sel_line {
      border: 1px dashed #eaeaea;
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
