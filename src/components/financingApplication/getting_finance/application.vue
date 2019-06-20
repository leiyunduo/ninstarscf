<template>
  <div class="c_container">
    <!-- <appNav :father="father" type='1'></appNav> -->
    <div class="application">
      <location :location="location"></location>
      <div class="view_info" v-if="hasSelelet === 0">
        <div class="top_nav">
          <getset :statusList="statusList" type='1' fType='receivable' :fid='fid' :bid='bid'></getset>
        </div>
        <div class="status_pic">
          <getTop :isShowNum="isShowNum" :isShowUp="isShowUp" :valueData="valueData"></getTop>
          <div class="c_add_pledge">
            <span @click="slideDown">添加质押池</span>
          </div>
          <div class="invoce_list" v-if="selectInvoice">
            <div class="invoice_wrap">
              <div class="info_title">
                <div>我的融资需求</div>
                <!-- <input type="text" placeholder="请输入要搜索的发票号码"> -->
              </div>
              <div class="invoice_item" v-for='(item, index) in invoiceList' :key="index">
                <div class="invoice_title">
                  <div>
                    <span>{{item.comfirm}}</span>
                    <span :title="item.invoice_name" class="c_invoice_title">融资票据：{{item.invoice_name}}</span>
                    <span :title="item.invoice_number" class="c_invoice_title">编号：{{item.invoice_number}}</span>
                    <span>{{lsStatus[item.ls_status]}}</span>
                    <span>银券：{{item.ticket_dict.ninstar_bank_ticket}}张</span>
                    <span>商券：{{item.ticket_dict.ninstar_business_ticket}}张</span>
                    <span>数券：{{item.ticket_dict.ninstar_digital_ticket}}张</span>
                  </div>
                  <div @click="todetail($event, item.id)">选择</div>
                </div>
                <div class="invoice_card">
                  <div class="date_list">
                    <div>交易金额：{{toThousands(item.value)}}（元）</div>
                    <div>发票张数：{{item.invoice_num}}张</div>
                    <div>开票时间：{{item.date_created}}</div>
                  </div>
                  <div class="pay_list" v-if="item.payment_list.length !== 0">
                    <div class="pay_list_item" v-for="(items, index) in item.payment_list" :key="index">
                      <div :title="items.name">支付名称：{{items.name}}</div>
                      <div>支付类型：{{items.type}}</div>
                      <div :title="items.value">支付金额：{{items.value}}</div>
                      <div>支付票据账期：{{items.maturity_date ? items.maturity_date : '未提交账期'}}</div>
                    </div>
                  </div>
                  <div class="roles">
                    <div>交易合同：{{item.contract_name}}</div>
                    <div>交易公司：{{item.partner_business_info.name}}</div>
                  </div>
                </div>
              </div>
              <div class="data_empty" v-show="invoiceList.length === 0">
                <span>暂无数据</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="hasSelelet === 1">
        <getset :statusList="statusList" type='1' fType='receivable' :fid='fid' :bid='bid'></getset>
        <div class="c_btm_container">
          <!-- <div class="score" v-show="score.total_average_score">
            <p>融资信用分: {{score.total_average_score}}</p>
          </div> -->
          <div class="zhong_network">
            <p>质押与担保凭证预先在中登网/中征网登记可增强信用，建议点击<span @click="zhongdeng">中登网</span>/<span @click="zhongzheng">中征网</span>登记</p>
            <a @click="dengjiClick">登记引导</a>
          </div>
          <div class="zhong_deng_network">
            <h3>中登网/中征网登记证明</h3>
            <div class="file_img">
              <el-upload class="upload-demo" drag :action="upLoadUrl" :http-request="zhongUpLoad" :auto-upload="true"
                :on-preview="zhongCardPreview" :before-upload="zhongAvatarUpload" multiple :file-list="fileLists" :limit='3'>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisibleUrl" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
          <getTop :isShowNum="isShowNum" :isShowUp="isShowUp" :valueData="valueData"></getTop>
          <div class="select_two">
            <div class="select_wrap">
              <div>资金使用去向</div>
              <div>
                <span><i></i>需要融资合同（专款专用于平台上的供应链）</span>
                <span></span>
                <!-- <span>展开</span> -->
              </div>
              <!-- <div class="c_tip">
                提醒：请点击“<b class="orange">展开</b>”完善交易信息再进行提交
              </div> -->
              <ul class="c_ticket_box" v-show="isExpandDB">
                <li v-for="(item, index) in selChainList" :key="index">
                  <div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div>合同类型：应付合同</div>
                      <div :title="item.contract_number">合同编号：{{item.contract_number}}</div>
                      <div :title="item.contract_name">合同名称：{{item.contract_name}}</div>
                      <div :title="toThousands(item.funding_gap) + '（元）'">资金缺口：{{toThousands(item.funding_gap)}}（元）</div>
                    </div>
                  </div>
                </li>
              </ul>
              <p><span class="c_btn_add" @click="showChainDialog">添加</span></p>
            </div>
            <div class="select_second">
              <div class="select_wrap">
                <div>第一还款来源</div>
                <div>
                  <span><i :class="[isExpandZY ? '' : 'active']" @click="isExpandZY = !isExpandZY"></i>质押池（自偿性还款来源）</span>
                  <!-- <span @click="addInvoice($event, 0, 1)">添加</span> -->
                  <span @click="addInvoice($event, 1)">展开</span>
                </div>
                <!-- <div class="c_tip">
                  提醒：请点击“<b class="orange">展开</b>”完善交易信息再进行提交
                </div> -->
                <ul class="c_ticket_box" v-show="isExpandZY">
                  <li v-for="(item, index) in first" :key="index">
                    <div class="yuqi" style="text-align:right;margin-left:15px;line-height:30px;">
                        <span style="font-weight:600;font-size:14px;color:#333">交易逾期率: {{item.financing_score || 0}}%</span>
                      </div>
                    <div>
                      <div>
                        <div></div>
                      </div>
                      <div class="c_bg_box" :class="[item.ticket_dict.ninstar_bank_ticket ? 'c_ticket_bgj' : item.ticket_dict.ninstar_business_ticket ? 'c_ticket_bgy' : 'c_ticket_bgt']">
                        <!-- <div>发票名称：{{item.name}}</div> -->
                        <div>票据金额：{{toThousands(item.value)}}（元）</div>
                        <div>票据类型：{{item.ticket_dict.ninstar_bank_ticket ? '银行承兑汇票' : item.ticket_dict.ninstar_business_ticket ? '商业承兑汇票' : '发票与供应链大数据'}}</div>
                        <div>支付票据账期：{{item.maturity_date ? item.maturity_date : '未提交账期'}}</div>
                      </div>
                    </div>
                  </li>
                </ul>
                <span class="c_btn_add" @click="addInvoice($event, 0, 1)">添加</span>
              </div>
            </div>
            <div class="select_second">
              <div class="second_wrap">
                <div>第二还款来源</div>
                <div>
                  <span><i :class="[isExpandDB ? '' : 'active']" @click="isExpandDB = !isExpandDB"></i>担保池（担保性还款来源）</span>
                  <!-- <span @click="addInvoice($event, 0, 2)">添加</span> -->
                  <span @click="addInvoice($event, 2)">展开</span>
                </div>
                <!-- <div class="c_tip">
                  提醒：请点击“<b class="orange">展开</b>”完善交易信息再进行提交
                </div> -->
                <ul class="c_ticket_box" v-show="isExpandDB">
                  <li v-for="(item, index) in two" :key="index">
                  <div class="yuqi" style="text-align:right;margin-left:15px;line-height:30px;">
                      <span style="font-weight:600;font-size:14px;color:#333">交易逾期率: {{item.financing_score || 0}}%</span>
                    </div>
                    <div>
                      <div>
                        <div></div>
                      </div>
                      <div class="c_bg_box" :class="[item.ticket_dict.ninstar_bank_ticket ? 'c_ticket_bgj' : item.ticket_dict.ninstar_business_ticket ? 'c_ticket_bgy' : 'c_ticket_bgt']">
                        <!-- <div>发票名称：{{item.name}}</div> -->
                        <div>票据金额：{{toThousands(item.value)}}（元）</div>
                        <div>票据类型：{{item.ticket_dict.ninstar_bank_ticket ? '银行承兑汇票' : item.ticket_dict.ninstar_business_ticket ? '商业承兑汇票' : '发票与供应链大数据'}}</div>
                        <div>支付票据账期：{{item.maturity_date ? item.maturity_date : '未提交账期'}}</div>
                      </div>
                    </div>
                  </li>
                </ul>
                <p><span class="c_btn_add" style="margin-left: -45px" @click="addInvoice($event, 0, 2)">手动添加</span></p>
                <p><span @click="autoAdd" class="c_btn_add c_btn_add_auto">一键添加</span></p>
              </div>
            </div>
            <div class="select_second">
              <div class="select_wrap">
                <div></div>
                <div>
                  <span><i></i>其他担保品</span>
                  <span></span>
                  <!-- <span @click="selectOther">展开</span> -->
                </div>
                <ul class="c_ticket_box" v-for="(item, index) in otherList" :key="index" v-if="otherList.length !== 0">
                  <p @click="selectOther(item)" style="text-align:right;color:#eb6100;font-size: 14px;padding-right:10px;cursor: pointer;">展开</p>
                  <li>
                    <div>
                      <div>
                        <div></div>
                      </div>
                      <div class="c_a">
                        <div>担保类型：{{item.collateral_type === '1' ? '房产' : item.collateral_type === '2' ? '汽车' : item.collateral_type === '3' ? '股权' : '基金'}}</div>
                        <div>市场估值：{{toThousands(item.appraisement)}}（元）</div>
                        <div>
                          <span>评估报告</span>
                          <div class="c_a_list">
                            <div v-for="(i, o) in item.attachment" :key="o" >
                              <a v-if="item.attachment" style="color: #eb6100;cursor:pointer;text-decoration:underline;" @click="aClick(i)">{{i.name}}</a>
                            </div>
                          </div>
                        </div>
                        <!-- <p>
                          <span>评估报告：</span>
                          <p v-if="item.attachment" v-for="(i, o) in item.attachment" :key="o"><a @click="aClick(i)">{{i.name}}</a></p>
                        </p> -->
                      </div>
                    </div>
                  </li>
                  <li style="min-height: 120px" v-if="otherList.length === 0">暂无数据</li>
                </ul>
                <p><span class="c_btn_add" @click="addAnother">添加</span></p>
              </div>
            </div>
          </div>
          <div class="subData">
            <div @click="subData">提交</div>
          </div>
        </div>
      </div>
      <div class="auto_financing" v-if="hasSelelet === 0">
        <div @click="dialogVisible = true">快速添加质押担保</div>
      </div>
      <div class="wrap" v-if="select === 1" @click="select = 0">
        <div class="window">
          <div class="invoice_wrap_list">
            <div>{{wrapTitle[showListType]}}</div>
            <div v-if="showEmpty" class="c_empty">暂无数据</div>
            <ul>
              <li v-for="(item, index) in invoiceList" :key="index" v-if="item.sel === showListType">
                <div class="c_invoic_wrap_title" :class="[item.ticket_dict.ninstar_bank_ticket ? 'c_ticket_bgj' : item.ticket_dict.ninstar_business_ticket ? 'c_ticket_bgy' : 'c_ticket_bgt']">
                  <div>
                    <span class="mwidth">票据类型：<span>{{item.ticket_dict.ninstar_bank_ticket ? '发票 + 银行承兑汇票' : item.ticket_dict.ninstar_business_ticket ? '发票 + 商业承兑汇票' : '发票 + 供应链大数据'}}</span></span>
                    <template v-if="item.ticket_dict.ninstar_digital_ticket === 0">
                      <span class="mwidth">汇票金额：<span>{{item.payment_list.length > 0 ? toThousands(item.payment_list.value) : toThousands(0)}}</span>（元）</span>
                      <span class="mwidth">账期：<span>{{item.payment_list.length > 0 ? item.payment_list[0].maturity_date : '暂无'}}</span></span>
                    </template>
                    <!-- <div>融资票据：<span>{{item.name}}</span></div>
                    <div :style="item.confirm ? 'color: #eb6100':''">{{item.comfirm}}</div> -->
                  </div>
                  <div>
                    <span class="mwidth">发票编号：<span>{{item.invoice_number}}</span></span>
                    <span class="mwidth">发票金额：<span>{{toThousands(item.value)}}</span>（元）</span>
                    <span class="mwidth">开票时间：<span>{{item.date_created}}</span></span>
                  </div>
                  <div>
                    <span class="mwidth">交易合同：<span>{{item.contract_name}}</span></span>
                    <span class="mwidth">编号：<span>{{item.contract_number}}</span></span>
                    <span class="mwidth c_view_detail" @click="handleView(item, 'invoice')">记账详情</span>
                  </div>
                  <div class="c_opreate">
                    <!-- <div class="invoice_sure" v-if="item.confirm" @click.stop="send($event, index)">推送确权</div> -->
                    <div class="invoice_del" v-if="item.sel !== 0" @click.stop="delTosel($event, index, item.id)">删除</div>
                    <div class="invoice_del" v-if="item.sel === 0" @click.stop="addTosel($event, item.id)">添加</div>
                  </div>
                </div>
                <div class="c_invoice_info_box">
                  <div class="c_part">
                    <h4>应收企业信息</h4>
                    <div v-if="item.partner_business_info">
                      <p><span class="c_info_title">公司名称</span>：{{item.partner_business_info.name}}</p>
                      <p><span class="c_info_title">税号</span>：{{item.partner_business_info.tax_number}}</p>
                      <p><span class="c_info_title">联系人</span>：{{item.partner_business_info.contact_person}}</p>
                      <p><span class="c_info_title">联系方式</span>：{{item.partner_business_info.contact_phone}}</p>
                      <p><span class="c_info_title">收款账号</span>：{{item.partner_business_info.account}}</p>
                    </div>
                  </div>
                  <div class="c_part">
                    <h4>应付企业信息</h4>
                    <div v-if="item.business_info">
                      <p><span class="c_info_title">公司名称</span>：{{item.business_info.name}}</p>
                      <p><span class="c_info_title">税号</span>：{{item.business_info.tax_number}}</p>
                      <p><span class="c_info_title">联系人</span>：{{item.business_info.contact_person}}</p>
                      <p><span class="c_info_title">联系方式</span>：{{item.business_info.contact_phone}}</p>
                      <p><span class="c_info_title">付款账号</span>：{{item.business_info.account}}</p>
                    </div>
                  </div>
                </div>
                <div class="invoice_wrap_card">
                  <div class="c_sure_info">
                    <span>{{Number(item.self_approved) === 1 ? '应收方已确认' : '应收方未确认'}}</span>
                    <span>{{Number(item.partner_approved) === 1 ? '应付方已确认' : '应付方未确认'}}</span>
                    <span>{{item.ls_status === '1' ? '发票已认证' : '发票未认证'}}</span>
                    <span></span>
                  </div>
                </div>
                <!-- <div class="invoic_wrap_title">
                  <div>
                    <div>票据类型：<span>{{item.payment_list.length > 0 ? item.payment_list[0].type : '发票'}}</span></div>
                    <div>金额：<span>{{toThousands(item.payment_list.length > 0 ? item.payment_list[0].value : 0)}}（元）</span></div>
                    <div>账期：<span>{{item.payment_list.length > 0 ? item.payment_list[0].maturity_date : '暂无'}}</span></div>
                    <div :style="item.comfirm === '已确权' ? 'color: #eb6100':''">{{item.comfirm}}</div>
                    <div :style="item.ls_status ? 'color: #eb6100':''">{{item.ls_status === '0' ? '未校验' : item.ls_status === '1' ? '已校验' : item.ls_status === '2' ? '发票无效' : '校验失败'}}</div>
                    <div>银券：{{item.ticket_dict.ninstar_bank_ticket}}张</div>
                    <div>商券：{{item.ticket_dict.ninstar_business_ticket}}张</div>
                    <div>数券：{{item.ticket_dict.ninstar_digital_ticket}}张</div>
                  </div>
                  <div>
                    <div class="invoice_del" v-if="item.sel !== 0" @click.stop="delTosel($event, index, item.id)">删除</div>
                    <div class="invoice_del" v-if="item.sel === 0" @click.stop="addTosel($event, item.id)">添加</div>
                  </div>
                </div>
                <div class="invoice_wrap_card">
                  <div class="pay_list">
                    <div class="pay_list_item" v-for="(items, index) in item.payment_list" :key="index">
                      <div :title="items.name">支付名称：{{items.name}}</div>
                      <div>支付类型：{{items.type}}</div>
                      <div :title="items.value">支付金额：{{items.value}}</div>
                      <div>支付票据账期：{{items.maturity_date}}</div>
                    </div>
                  </div>
                  <div class="pay_info">
                    <div>票据金额：{{item.value}}（元）</div>
                    <div>开票时间：{{item.date_created}}</div>
                    <div>账期：{{item.payment_date}}</div>
                  </div>
                  <div class="pay_company">
                    <h4>相关交易信息</h4>
                    <div>交易合同：{{item.contract}}</div>
                    <div><span>发票：{{item.name}}</span><span>发票金额：{{item.value}}</span></div>
                    <div>交易公司：{{item.partner_business_info.name}}</div>
                  </div>
                </div> -->
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="hasSelelet === 2">
        <getset :statusList="statusList" type='1' fType='receivable' :fid='fid' :bid='bid'></getset>
        <div class="c_btm_container">
          <div class="zhong_deng_network">
            <h3>中登网/中征网登记证明</h3>
            <div class="img_list" v-if="zhongDengImg.length !== 0">
              <img v-for="(item, index) in zhongDengImg" :key="index" :src="$root_url() + item.location" alt="" @click="imgClick(item)">
            </div>
            <div class="img_list" v-if="zhongDengImg.length === 0">暂无</div>
            <el-dialog :visible.sync="zhongdengUrl" :before-close="handleClose">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <getTop :isShowNum="isShowNum" :isShowUp="isShowUp" :valueData="valueData"></getTop>
          <!-- <div class="score" v-show="score.total_average_score">
            <p>融资信用分: {{score.total_average_score}}</p>
          </div> -->
          <div class="select_two">
            <div class="select_wrap">
              <div>第一还款来源</div>
              <div>
                <span><i></i>质押池（自偿性还款来源）</span>
                <span @click="openList(1)">展开</span>
              </div>
              <ul v-if="first.length !== 0" class="c_ticket_box">
                <li v-for="(item, index) in first" :key="index">
                  <div class="yuqi" style="text-align:right;margin-left:15px;line-height:30px;">
                    <span style="font-weight:600;font-size:14px;color:#333">交易逾期率: {{item.ratio || 0}}%</span>
                  </div>
                  <div>
                    <div>
                      <div></div>
                    </div>
                    <div class="c_bg_box" :class="[item.ticket_dict.ninstar_bank_ticket ? 'c_ticket_bgj' : item.ticket_dict.ninstar_business_ticket ? 'c_ticket_bgy' : 'c_ticket_bgt']">
                      <!-- <div>发票名称：{{item.name}}</div>
                      <div>发票总额：{{item.value}}元</div> -->
                      <div>票据金额：{{toThousands(item.value)}}（元）</div>
                      <div>票据类型：{{item.ticket_dict.ninstar_bank_ticket ? '银行承兑汇票' : item.ticket_dict.ninstar_business_ticket ? '商业承兑汇票' : '发票与供应链大数据'}}</div>
                      <div>票据账期：{{item.payment_list.length > 0 ? item.payment_list[0].payment_date : '暂无'}}</div>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="first.length === 0">暂无数据</div>
            </div>
            <div class="select_second">
              <p class="total_ava_score">交易逾期率：{{score.average_score || 0}}%</p>
              <div class="second_wrap">
                <div>第二还款来源</div>
                <div>
                  <span><i></i>担保池（担保性还款来源）</span>
                  <span @click="openList(2)">展开</span>
                </div>
                <ul v-if="two.length !== 0" class="c_ticket_box">
                  <li v-for="(item, index) in two" :key="index">
                    <div class="yuqi" style="text-align:right;margin-left:15px;line-height:30px;">
                      <span style="font-weight:600;font-size:14px;color:#333">交易逾期率: {{item.ratio || 0}}%</span>
                    </div>
                    <div>
                      <div>
                        <div></div>
                      </div>
                      <div class="c_bg_box" :class="[item.ticket_dict.ninstar_bank_ticket ? 'c_ticket_bgj' : item.ticket_dict.ninstar_business_ticket ? 'c_ticket_bgy' : 'c_ticket_bgt']">
                        <!-- <div>发票名称：{{item.name}}</div>
                        <div>发票总额：{{item.value}}元</div> -->
                        <div>票据金额：{{toThousands(item.value)}}（元）</div>
                        <div>票据类型：{{item.ticket_dict.ninstar_bank_ticket ? '银行承兑汇票' : item.ticket_dict.ninstar_business_ticket ? '商业承兑汇票' : '发票与供应链大数据'}}</div>
                        <div>票据账期：{{item.payment_list.length > 0 ? item.payment_list[0].payment_date : '暂无'}}</div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-if="two.length === 0">暂无数据</div>
              </div>
            </div>
            <div class="select_second">
              <div class="second_wrap">
                <div>
                  <span><i></i>其他担保品</span>
                  <!-- <span @click="addInvoice($event, 2)">展开</span> -->
                </div>
                <ul v-if="otherCollateralList.length !== 0" class="c_ticket_box">
                  <li v-for="(item, index) in otherCollateralList" :key="index">
                    <p @click="selectOther(item)" style="text-align:right;color:#eb6100;font-size: 14px;padding-right:40px;cursor: pointer;">展开</p>
                    <div>
                      <div>
                        <div></div>
                      </div>
                      <div class="c_a">
                        <p>担保类型：{{item.collateral_type === '1' ? '房产' : item.collateral_type === '2' ? '汽车' : item.collateral_type === '3' ? '股权' : '基金'}}</p>
                        <p>市场估值：{{toThousands(item.appraisement)}}（元）</p>
                        <div>
                          <span>评估报告：</span>
                          <p v-if="item.attachment" v-for="(i, o) in item.attachment" :key="o"><a @click="aClick(i)">{{i.name}}</a></p>
                        </div>
                        <!-- <div>评估报告：
                          <a v-if="item.attachment" v-for="(i, o) in item.attachment" :key="o" style="color: #eb6100;cursor:pointer;text-decoration:underline;" @click="aClick(i)">{{i.name}}</a>
                        </div> -->
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-if="otherCollateralList.length === 0">暂无数据</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="自动质押担保"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <div class="date_line">
          <span>期望融资时间：</span>
          <el-date-picker
            v-model="subDate.expect_loan_date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="date_line">
          <span>期望还款时间：</span>
          <el-date-picker
            v-model="subDate.expect_repayment_date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <span style="color: #999">您的符合发票全部被质押。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="subAuto">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="isShowChainDialog"
      class="c_chain_dialog"
      width="1280px">
      <div class="c_tab_top">
        <span class="active">融资用途（来自九星平台）</span>
        <span>融资用途（来自其他平台）</span>
      </div>
      <div class="c_chain_box">
        <div class="c_table_item" v-for="(item, index) in chainList" :key="index">
          <ul>
            <li>
              <div class="invoic_wrap_title">
                <div>
                  <div><input type="checkbox" :checked="item.sel" @change="item.sel = !item.sel">合同名称：<span>{{item.contract_name}}</span></div>
                  <div class="mgl_10">编号：<span>{{item.contract_number}}</span></div>
                  <div class="mgl_10">合同金额：<span>{{toThousands(item.value)}}</span>（元）</div>
                  <div class="mgl_10">资金缺口：<span>{{toThousands(item.funding_gap)}}</span>（元）</div>
                  <div class="mgl_10"><span class="c_view_detail" @click="handleView(item, 'chain')">记账详情</span></div>
                </div>
              </div>
              <div class="c_invoice_info_box">
                <div class="c_part">
                  <h4>应收企业信息</h4>
                  <div v-if="item.partner_business_info">
                    <p><span class="c_info_title">公司名称</span>：{{item.partner_business_info.name}}</p>
                    <p><span class="c_info_title">税号</span>：{{item.partner_business_info.tax_number}}</p>
                    <p><span class="c_info_title">联系人</span>：{{item.partner_business_info.contact_person}}</p>
                    <p><span class="c_info_title">联系方式</span>：{{item.partner_business_info.contact_phone}}</p>
                    <p><span class="c_info_title">收款账号</span>：{{item.partner_business_info.account}}</p>
                  </div>
                </div>
                <div class="c_part">
                  <h4>应付企业信息</h4>
                  <div v-if="item.business_info">
                    <p><span class="c_info_title">公司名称</span>：{{item.business_info.name}}</p>
                    <p><span class="c_info_title">税号</span>：{{item.business_info.tax_number}}</p>
                    <p><span class="c_info_title">联系人</span>：{{item.business_info.contact_person}}</p>
                    <p><span class="c_info_title">联系方式</span>：{{item.business_info.contact_phone}}</p>
                    <p><span class="c_info_title">付款账号</span>：{{item.business_info.account}}</p>
                  </div>
                </div>
              </div>
              <div class="invoice_wrap_card">
                <div>
                  <div class="c_sure_info">
                    <span>{{Number(item.self_approved) === 1 ? '应收方已确认' : '应收方未确认'}}</span>
                    <span>{{Number(item.partner_approved) === 1 ? '应付方已确认' : '应付方未确认'}}</span>
                    <span></span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="c_empty_accessory" v-if="chainList.length === 0">暂未相关融资用途链条，
          <router-link to="/chainline"><span class="c_go_add">去添加</span></router-link>
        </div>
      </div>
      <div class="c_sel_btn"><a @click="suerSelChain">确定</a></div>
    </el-dialog>
    <!-- 其他担保品 otherCollateral -->
    <el-dialog title="其他担保品" :visible.sync="visibleSyncOther" :before-close="handleClose">
      <div class="other_collateral">
        <select v-model="collateral_type">
          <option value="1">房产</option>
          <option value="2">汽车</option>
          <option value="3">股权</option>
          <option value="4">基金</option>
        </select>
        <div class="select_list">
          <h3>请填写您的<span>{{collateral_type === '1' ? '房产' : collateral_type === '2' ? '汽车' : collateral_type === '3' ? '股权' : '基金'}}</span>信息</h3>
          <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
            <el-form-item label="城市" prop='address' v-if="collateral_type === '1' || collateral_type === '2'">
              <v-distpicker @province="changedprovince($event,from)" @city="chengedcity($event,from)" @area="chengedarea($event,from)"></v-distpicker>
            </el-form-item>
            <el-form-item label="小区/地址" prop='full_address' v-if="collateral_type === '1'">
              <div class="input_type">
                <input v-model="ruleForm.full_address" maxlength="64" placeholder='请输入地址或小区名称'>
              </div>
            </el-form-item>
            <el-form-item label="楼栋" prop='house_address' v-if="collateral_type === '1'">
              <div class="input_type num_style">
                <input type="text" v-model="from.number">
                <span>号</span>
              </div>
              <div class="input_type num_style">
                <input type="text" v-model="from.room">
                <span>室</span>
              </div>
            </el-form-item>
            <el-form-item label="面积" prop='area' v-if="collateral_type === '1'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.area" maxlength="32">
                <span>平米</span>
              </div>
            </el-form-item>
            <el-form-item label="车型" prop='car_type' v-if="collateral_type === '2'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.car_type" placeholder="请输入车型" maxlength="32">
              </div>
            </el-form-item>
            <el-form-item label="公司名称" prop='business_name' v-if="collateral_type === '3'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.business_name" maxlength="32" placeholder="请输入公司名称">
              </div>
            </el-form-item>
            <el-form-item label="股权比例" prop='ratio' v-if="collateral_type === '3'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.ratio" maxlength="32" placeholder="请输入股权比例">
              </div>
            </el-form-item>
            <el-form-item label="基金简称" prop='foundation' v-if="collateral_type === '4'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.foundation" maxlength="32" placeholder="请输入基金简称">
              </div>
            </el-form-item>
            <el-form-item label="市场估值" prop='appraisement'>
              <div class="input_type">
                <input type="text" v-model="ruleForm.appraisement" maxlength="32">
                <span>元</span>
              </div>
            </el-form-item>
            <el-form-item label='评估报告'>
              <div class="file_img">
                <el-upload class="upload-demo" drag :action="upLoadUrl" :http-request="upLoad" :auto-upload="true"
                  :on-preview="handlePictureCardPreview" :before-upload="beforeAvatarUpload" multiple :file-list="fileList">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleUrl" append-to-body>
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="button_slot">
                <div class="install" @click="otherCollateral">确定</div>
                <div class="cancel" @click="handleClose">取消</div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 其他担保品 展开 -->
    <el-dialog title="其他担保品" :visible.sync="visibleSyncOthers" :before-close="handleClose">
      <div class="other_collateral">
        <div class="select_ul">
          <ul>
            <li v-if="otherSelectItem.collateral_type === '1' || otherSelectItem.collateral_type === '2'"><span>城市：</span><p>{{otherSelectItem.address}}</p></li>
            <li v-if="otherSelectItem.collateral_type === '1'"><span>小区/地址：</span><p>{{otherSelectItem.full_address}}</p></li>
            <li v-if="otherSelectItem.collateral_type === '1'"><span>楼栋：</span><p>{{otherSelectItem.house_address}}</p></li>
            <li v-if="otherSelectItem.collateral_type === '1'"><span>面积：</span><p>{{otherSelectItem.area}}</p>（平米）</li>
            <li v-if="otherSelectItem.collateral_type === '2'"><span>车型：</span><p>{{otherSelectItem.car_type}}</p></li>
            <li v-if="otherSelectItem.collateral_type === '3'"><span>公司名称：</span><p>{{otherSelectItem.business_name}}</p></li>
            <li v-if="otherSelectItem.collateral_type === '3'"><span>股权比例：</span><p>{{otherSelectItem.ratio}}</p></li>
            <li v-if="otherSelectItem.collateral_type === '4'"><span>基金简称：</span><p>{{otherSelectItem.foundation}}</p></li>
            <li><span>市场估值：</span><p>{{toThousands(otherSelectItem.appraisement)}}（元）</p></li>
            <li>
              <div>
                <span>评估报告：</span>
                <div v-if="otherSelectItem.attachment" v-for="(i, o) in otherSelectItem.attachment" :key="o">
                  <a @click="aClick(i)">{{i.name}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dengjiShow" :before-close="handleClose">
      <regiGuidance></regiGuidance>
    </el-dialog>
    <!-- 展开弹窗应收融资质押池 -->
    <el-dialog title="质押池（自偿性还款来源）" :visible.sync="dialogVisibles" width="80%" :before-close="handleClose">
      <div class="el_dialog_divlist" v-if="first.length > 0">
        <div class="el-ls">
          <div class="list" v-for="(item, index) in first" :key='index'>
            <div class="top">
              <div class="top_list">
                <div>
                  <el-tooltip placement="top">
                    <div slot="content" v-if="item.ticket_dict">
                      <span v-if="item.ticket_dict.ninstar_bank_ticket">由银行票据/单证代表的应收账款</span>
                      <span v-if="item.ticket_dict.ninstar_business_ticket">由商业票据/单证代表的应收账款</span>
                      <span v-if="item.ticket_dict.ninstar_digital_ticket">发票与供应链大数据</span>
                    </div>
                    <div class="left" :class="[item.ticket_dict.ninstar_bank_ticket ? 'c_ticket_bgj' : item.ticket_dict.ninstar_business_ticket ? 'c_ticket_bgy' : item.ticket_dict.ninstar_digital_ticket ? 'c_ticket_bgt' : '']"></div>
                  </el-tooltip>
                </div>
                <div class="right">
                  <ul>
                    <li v-if='item.payment_list.length !== 0'>面额：{{toThousands(item.payment_list[0].value)}}</li>
                    <li v-else>面额：暂无数据</li>
                    <li v-if='item.payment_list.length !== 0'>有效期：{{item.payment_list[0].maturity_date}}</li>
                    <li v-else>有效期：暂无数据</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="center_list">
              <ul>
                <li v-if="item.ticket_dict"><p>票据类型：</p>
                  <span v-if="item.ticket_dict.ninstar_bank_ticket">发票+银行承兑汇票</span>
                  <span v-if="item.ticket_dict.ninstar_business_ticket">发票+商业承兑汇票</span>
                  <span v-if="item.ticket_dict.ninstar_digital_ticket">发票+供应链大数据</span>
                </li>
                <li v-if='item.payment_list.length !== 0'><p>汇票金额：</p>{{toThousands(item.payment_list[0].value)}}</li>
                <li v-if='item.payment_list.length !== 0'><p>账期：</p>{{item.payment_list[0].maturity_date}}</li>
              </ul>
              <ul>
                <li><p>发票编号：</p>{{item.number}}</li>
                <li><p>发票金额：</p>{{toThousands(item.value)}}</li>
                <li><p>开票时间：</p>{{item.date_created}}</li>
              </ul>
              <ul>
                <li><p>交易合同：</p>{{item.contract_name}}</li>
                <li><p>编号：</p>{{item.contract_number}}</li>
                <li></li>
                <!-- <li class="span" @click='tochain($event, item, 1)'>记账详情</li> -->
              </ul>
            </div>
            <div class="center">
              <div class="left" v-if="item.payment_info">
                <h3>应收企业信息</h3>
                <ul v-if="item.payment_info.business_info">
                  <li>
                    <span>公司名称：</span>
                    <p>{{item.payment_info.business_info.name}}</p>
                  </li>
                  <li>
                    <span>税号：</span>
                    <p>{{item.payment_info.business_info.tax_number}}</p>
                  </li>
                  <li>
                    <span>联系人：</span>
                    <p>{{item.payment_info.business_info.contact_person}}</p>
                  </li>
                  <li>
                    <span>联系方式：</span>
                    <p>{{item.payment_info.business_info.contact_phone}}</p>
                  </li>
                  <li>
                    <span>收款账号：</span>
                    <p>{{item.payment_info.business_info.account}}</p>
                  </li>
                </ul>
              </div>
              <div class="right" v-if="item.payment_info">
                <h3>应付企业信息</h3>
                <ul  v-if="item.payment_info.partner_business_info">
                  <li>
                    <span>公司名称：</span>
                    <p>{{item.payment_info.partner_business_info.name}}</p>
                  </li>
                  <li>
                    <span>税号：</span>
                    <p>{{item.payment_info.partner_business_info.tax_number}}</p>
                  </li>
                  <li>
                    <span>联系人：</span>
                    <p>{{item.payment_info.partner_business_info.contact_person}}</p>
                  </li>
                  <li>
                    <span>联系方式：</span>
                    <p>{{item.payment_info.partner_business_info.contact_phone}}</p>
                  </li>
                  <li>
                    <span>收款账号：</span>
                    <p>{{item.payment_info.partner_business_info.account}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bottom_quan">
              <h3>券的等级<span>0级</span></h3>
              <div class="li_list">
                <dl v-for="(i, o) in imgInfo" :key="o">
                  <dt><img :src="i.img" alt=""></dt>
                  <dd>{{i.name}}</dd>
                </dl>
              </div>
            </div>
            <div class="bottom">
              <span>{{item.self_approved === '0' ? '应收方未确认' : '应收方已确认'}}</span>
              <span>{{item.partner_approved === '0' ? '应付方未确认' : '应付方已确认'}}</span>
              <span>{{item.ls_status !== '1' ? '发票未认证' : '发票已认证'}}</span>
              <!-- <span>中登网未登记</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="el_dialog_divlist" v-if="first.length === 0">暂无数据</div>
    </el-dialog>
    <!-- 展开弹窗应收融资、订单融资 -->
    <el-dialog title="担保池（担保性还款来源）" :visible.sync="dialogVisibles1" width="80%" :before-close="handleClose">
      <div class="el_dialog_divlist" v-if="two.length > 0">
        <div class="el-ls">
          <div class="list" v-for="(item, index) in two" :key='index'>
            <div class="top">
              <div class="top_list">
                <div v-if="item.ticket_dict">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <span v-if="item.ticket_dict.ninstar_bank_ticket">由银行票据/单证代表的应收账款</span>
                      <span v-if="item.ticket_dict.ninstar_business_ticket">由商业票据/单证代表的应收账款</span>
                      <span v-if="item.ticket_dict.ninstar_digital_ticket">发票与供应链大数据</span>
                    </div>
                    <div class="left" :class="[item.ticket_dict.ninstar_bank_ticket ? 'c_ticket_bgj' : item.ticket_dict.ninstar_business_ticket ? 'c_ticket_bgy' : item.ticket_dict.ninstar_digital_ticket ? 'c_ticket_bgt' : '']"></div>
                  </el-tooltip>
                </div>
                <div class="right">
                  <ul>
                    <li v-if='item.payment_list.length !== 0'>面额：{{toThousands(item.payment_list[0].value)}}</li>
                    <li v-else>面额：暂无数据</li>
                    <li v-if='item.payment_list.length !== 0'>有效期：{{item.payment_list[0].maturity_date}}</li>
                    <li v-else>有效期：暂无数据</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="center_list">
              <ul>
                <li v-if="item.ticket_dict"><p>票据类型：</p>
                  <span v-if="item.ticket_dict.ninstar_bank_ticket">发票+银行承兑汇票</span>
                  <span v-if="item.ticket_dict.ninstar_business_ticket">发票+商业承兑汇票</span>
                  <span v-if="item.ticket_dict.ninstar_digital_ticket">发票+供应链大数据</span>
                </li>
                <li v-if='item.payment_list.length !== 0'><p>汇票金额：</p>{{toThousands(item.payment_list[0].value)}}</li>
                <li v-if='item.payment_list.length !== 0'><p>账期：</p>{{item.payment_list[0].maturity_date}}</li>
              </ul>
              <ul>
                <li><p>发票编号：</p>{{item.number}}</li>
                <li><p>发票金额：</p>{{toThousands(item.value)}}</li>
                <li><p>开票时间：</p>{{item.date_created}}</li>
              </ul>
              <ul class="bottom_bot">
                <li><p>交易合同：</p>{{item.contract_name}}</li>
                <li><p>编号：</p>{{item.contract_number}}</li>
                <!-- <li class="span" @click='tochain($event, item, 2)'>记账详情</li> -->
              </ul>
            </div>
            <div class="center">
              <div class="left" v-if="item.payment_info">
                <h3>应收企业信息</h3>
                <ul v-if="item.payment_info.business_info">
                  <li>
                    <span>公司名称：</span>
                    <p>{{item.payment_info.business_info.name}}</p>
                  </li>
                  <li>
                    <span>税号：</span>
                    <p>{{item.payment_info.business_info.tax_number}}</p>
                  </li>
                  <li>
                    <span>联系人：</span>
                    <p>{{item.payment_info.business_info.contact_person}}</p>
                  </li>
                  <li>
                    <span>联系方式：</span>
                    <p>{{item.payment_info.business_info.contact_phone}}</p>
                  </li>
                  <li>
                    <span>收款账号：</span>
                    <p>{{item.payment_info.business_info.account}}</p>
                  </li>
                </ul>
              </div>
              <div class="right" v-if="item.payment_info">
                <h3>应付企业信息</h3>
                <ul v-if="item.payment_info.partner_business_info">
                  <li>
                    <span>公司名称：</span>
                    <p>{{item.payment_info.partner_business_info.name}}</p>
                  </li>
                  <li>
                    <span>税号：</span>
                    <p>{{item.payment_info.partner_business_info.tax_number}}</p>
                  </li>
                  <li>
                    <span>联系人：</span>
                    <p>{{item.payment_info.partner_business_info.contact_person}}</p>
                  </li>
                  <li>
                    <span>联系方式：</span>
                    <p>{{item.payment_info.partner_business_info.contact_phone}}</p>
                  </li>
                  <li>
                    <span>收款账号：</span>
                    <p>{{item.payment_info.partner_business_info.account}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bottom_quan">
              <h3>券的等级<span>0级</span></h3>
              <div class="li_list">
                <dl v-for="(i, o) in imgInfo" :key="o">
                  <dt><img :src="i.img" alt=""></dt>
                  <dd>{{i.name}}</dd>
                </dl>
              </div>
            </div>
            <div class="bottom">
              <span>{{item.self_approved === '0' ? '应收方未确认' : '应收方已确认'}}</span>
              <span>{{item.partner_approved === '0' ? '应付方未确认' : '应付方已确认'}}</span>
              <span>{{item.ls_status !== '1' ? '发票未认证' : '发票已认证'}}</span>
              <!-- <span>中登网未登记</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="el_dialog_divlist" v-if="two.length === 0">暂无数据</div>
    </el-dialog>
  </div>
</template>

<script>
import getTop from "../../financing/finaceTop"
// import appNav from "../../financing/financingManege"
import Location from "../../location/location"
import Getset from "../../financing/finace"
import regiGuidance from './regiGuidance'
export default {
  name: "application",
  components: {
    Getset,
    // appNav,
    getTop,
    Location,
    regiGuidance
  },
  data() {
    return {
      isExpandZY: true,
      isExpandDB: true,
      isShowChainDialog: false,
      chainList: [],
      selChainList: [],
      selArr: [],
      location: [
        { title: "我的融资", url: "/financing" },
        { title: "融资申请" }
      ],
      lsStatus: ["平台未验证", "平台已验证", "平台验证失败"],
      subDate: { expect_loan_date: "", expect_repayment_date: "" },
      dialogVisible: false,
      father: { selIndex: 3 },
      isShowNum: false,
      isShowUp: false,
      valueData: {},
      showEmpty: true,
      statusList: '1',
      selectInvoice: false,
      // 质押池
      hasSelelet: -1,
      first: [],
      select: 0,
      wrapTitle: ["我的企业需求", "质押池（自偿性还款来源）", "担保池（担保性还款来源）"],
      showListType: -1,
      two: [],
      // 其他担保品
      otherCollateralList: [],
      collateral_type: '1',
      visibleSyncOther: false,
      // 添加
      ruleForm: {
        address: '',
        full_address: '',
        house_address: '',
        area: '',
        appraisement: '',
        car_type: '',
        business_name: '',
        ratio: '',
        foundation: ''
      },
      from: {
        number: '',
        room: '',
        province: '',
        city: '',
        region: ''
      },
      // 展开其他担保品
      otherSelectItem: {
        address: '',
        full_address: '',
        house_address: '',
        area: '',
        appraisement: '',
        car_type: '',
        business_name: '',
        ratio: '',
        foundation: '',
        attachment: [],
        collateral_type: ''
      },
      // 附件或者图片
      dialogImageUrl: '',
      upLoadUrl: '',
      fileList: [],
      att_list: [],
      file: {},
      dialogVisibleUrl: false,
      // 展开
      visibleSyncOthers: false,
      style_type: ['房产', '汽车', '股权', '基金'],
      // 列表
      otherList: [],
      otherId: [],
      // 中登
      zhongDeng: [],
      files: {},
      fileLists: [],
      zhongDengImg: [],
      zhongdengUrl: false,
      // 登记引导
      dengjiShow: false,
      // 券
      dialogVisibles: false,
      dialogVisibles1: false,
      imgInfo: [
        {name: '订金（销售）', img: 'static/img/eninfo/zuan.jpg'},
        {name: '采购验收', img: 'static/img/eninfo/zuan.jpg'},
        {name: '采购付款', img: 'static/img/eninfo/zuan.jpg'},
        {name: '出库（销售）', img: 'static/img/eninfo/zuan.jpg'},
        {name: '运单（销售）', img: 'static/img/eninfo/zuan.jpg'},
        {name: '验收（销售）', img: 'static/img/eninfo/zuan.jpg'},
        {name: '发票（销售）', img: 'static/img/eninfo/zuan.jpg'},
        {name: '支付（销售）', img: 'static/img/eninfo/zuan.jpg'},
        {name: '延期支付（销售）', img: 'static/img/eninfo/zuan.jpg'}
      ]
    }
  },
  methods: {
    openList (i) {
      if (i === 1) {
        this.dialogVisibles = true
      } else if (i === 2) {
        this.dialogVisibles1 = true
      }
    },
    // 中登网
    zhongdeng () {
      window.open('https://www.zhongdengwang.org.cn/zhongdeng/djzy/common_list.shtml')
    },
    // 中证网
    zhongzheng () {
      window.open('http://www.pbccrc.org.cn/zxzx/qyzx/list.shtml')
    },
    // 登记引导
    dengjiClick () {
      this.dengjiShow = true
    },
    // 中登网附件上传
    zhongUpLoad () {
      var that = this
      var fileObj = new FormData()
      var file = that.files
      var type = that.files.name.substring(that.files.name.indexOf('.')+1, that.files.name.length)
      fileObj.append('pic_name', file.name)
      fileObj.append('financing_attachment', file)
      fileObj.append('token', this.$token())
      fileObj.append('type', type)
      that.$ajax.post('/api/financing_attachment/', fileObj).then(res => {
        if (res.data.code === '1') {
          that.zhongDeng.push(res.data.att_id)
        } else {
          that.$message.error('文件有误，请重新上传!')
          that.$loading(that.$setLoading()).close()
        }
      })
    },
    zhongAvatarUpload (file) {
      var that = this
      var that = this
      if (file.name.length > 64) {
        that.$message.error('文件名称过长')
      } else {
        that.files = file
      }
      const isJPG = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size < 5 * 1024 * 1024
      if (!isJPG) {
        this.$message.error('只能是 JPG、JPEG或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    // 点击图片时
    zhongCardPreview (file) {
      var that = this
      if (file.raw.type.split('/')[1] !== 'jpg' && file.raw.type.split('/')[1] !== 'png' && file.raw.type.split('/')[1] !== 'gif' && file.raw.type.split('/')[1] !== 'jpeg') {
        this.dialogVisibleUrl = false
        window.open(file.url)
      } else {
        const fr = new FileReader()
        fr.onload = function (e) {
          console.log(e)
          that.dialogImageUrl = e.currentTarget.result
          that.dialogVisibleUrl = true
        }
        fr.readAsDataURL(file.raw)
      }
    },
    // 附件上传
    upLoad() {
      var that = this
      var fileObj = new FormData()
      var file = that.file
      var type = that.file.name.substring(that.file.name.indexOf('.')+1, that.file.name.length)
      fileObj.append('pic_name', file.name)
      fileObj.append('attachment', file)
      fileObj.append('token', this.$token())
      fileObj.append('type', type)
      that.$ajax.post('/api/other_collateral_attachment/', fileObj).then(res => {
        if (res.data.code === '1') {
          that.att_list.push(res.data.att_id)
        } else {
          that.$message.error('文件有误，请重新上传!')
          that.$loading(that.$setLoading()).close()
        }
      })
    },
    beforeAvatarUpload (file) {
      var that = this
      if (file.name.length > 64) {
        that.$message.error('文件名称过长')
      } else {
        that.file = file
      }
    },
    // 确定
    otherCollateral () {
      var that = this
      if (that.collateral_type === '1') {
        if (that.from.province === '省') {
          that.$message.error('请选择省')
        } else {
          if (that.from.city === '市') {
            that.$message.error('请选择市')
          } else {
            if (that.from.region === '区') {
              that.$message.error('请选择区')
            } else {
              if (that.ruleForm.full_address === '') {
                that.$message.error('请填写小区/地址')
              } else {
                if (!(/^[0-9]+.?[0-9]*$/.test(that.from.number))) {
                  that.$message.error('请填写楼栋号')
                } else {
                  if (!(/^[0-9]+.?[0-9]*$/.test(that.from.room))) {
                    that.$message.error('请填写楼栋室')
                  } else {
                    if (!(/^[0-9]+.?[0-9]*$/.test(that.ruleForm.area))) {
                      that.$message.error('请填写面积')
                    } else {
                      if (!(/^[0-9]+.?[0-9]*$/.test(that.ruleForm.appraisement))) {
                        that.$message.error('请填写市场估值')
                      } else {
                        if (that.att_list.length === 0) {
                          that.$message.error('请上传评估报告')
                        } else {
                          // 调用方法
                          that.otherInstall()
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else if (that.collateral_type === '2') {
        if (that.from.province === '省') {
          that.$message.error('请选择省')
        } else {
          if (that.from.city === '市') {
            that.$message.error('请选择市')
          } else {
            if (that.from.region === '区') {
              that.$message.error('请选择区')
            } else {
              if (!(/^[0-9]+.?[0-9]*$/.test(that.ruleForm.appraisement))) {
                that.$message.error('请填写市场估值')
              } else {
                if (that.att_list.length === 0) {
                  that.$message.error('请上传评估报告')
                } else {
                  // 调用方法
                  that.otherInstall()
                }
              }
            }
          }
        }
      } else if (that.collateral_type === '3') {
        if (that.ruleForm.business_name === '') {
          that.$message.error('请输入公司名称')
        } else {
          if (that.ruleForm.ratio === '') {
            that.$message.error('请输入股权比例')
          } else {
            if (!(/^[0-9]+.?[0-9]*$/.test(that.ruleForm.ratio))) {
              that.$message.error('请输入正确的股权比例')
            } else {
              if (!(/^[0-9]+.?[0-9]*$/.test(that.ruleForm.appraisement))) {
                that.$message.error('请填写市场估值')
              } else {
                if (that.att_list.length === 0) {
                  that.$message.error('请上传评估报告')
                } else {
                  // 调用方法
                  that.otherInstall()
                }
              }
            }
          }
        }
      } else if (that.collateral_type === '4') {
        if (that.ruleForm.foundation === '') {
          that.$message.error('请输入基金简称')
        } else {
          if (!(/^[0-9]+.?[0-9]*$/.test(that.ruleForm.appraisement))) {
            that.$message.error('请填写市场估值')
          } else {
            if (that.att_list.length === 0) {
              that.$message.error('请上传评估报告')
            } else {
              // 调用方法
              that.otherInstall()
            }
          }
        }
      }
    },
    // 添加接口调用
    otherInstall () {
      var that = this
      that.ruleForm.address = that.from.province + that.from.city + that.from.region
      that.ruleForm.house_address = that.from.number + that.from.room
      that.$ajax.post('/api/other_collateral/', {
        token: that.$token(), ...that.ruleForm, address: that.ruleForm.address,
        house_address: that.ruleForm.house_address, att_list: that.att_list, collateral_type: that.collateral_type
      }).then(res => {
        if (res.data.code === '1') {
          that.otherList.push(res.data.data)
          that.otherId.push(res.data.data.id)
          that.visibleSyncOther = false
        } else {
          that.$message.error('请重新添加其他担保品')
          that.visibleSyncOther = false
        }
      })
    },
    // 关闭其他担保
    handleClose () {
      var that = this
      that.visibleSyncOther = false
      that.visibleSyncOthers = false
      this.zhongdengUrl = false
      that.dengjiShow = false
      that.dialogVisibles = false
      that.dialogVisibles1 = false
      that.ruleForm = {}
      that.from = {}
      that.att_list = []
      that.dialogImageUrl = ''
      that.fileList = []
      that.from.province = '省'
      that.from.city = '市'
      that.from.region = '区'
    },
    // 展开其他担保品
    selectOther (item) {
      var that = this
      that.visibleSyncOthers = true
      that.otherSelectItem = item
    },
    // 添加其他担保
    addAnother () {
      var that = this
      that.visibleSyncOther = true
      that.collateral_type = '1'
      that.ruleForm = {}
      that.from = {}
      that.att_list = []
      that.dialogImageUrl = ''
      that.fileList = []
      that.from.province = '省'
      that.from.city = '市'
      that.from.region = '区'
    },
    // 点击图片时
    handlePictureCardPreview (file) {
      var that = this
      if (file.raw.type.split('/')[1] !== 'jpg' && file.raw.type.split('/')[1] !== 'png' && file.raw.type.split('/')[1] !== 'gif' && file.raw.type.split('/')[1] !== 'jpeg') {
        this.dialogVisibleUrl = false
        window.open(file.url)
      } else {
        const fr = new FileReader()
        fr.onload = function (e) {
          console.log(e)
          that.dialogImageUrl = e.currentTarget.result
          that.dialogVisibleUrl = true
        }
        fr.readAsDataURL(file.raw)
      }
    },
    // 展示列表图片预览
    aClick (i) {
      window.open(this.$root_url() + i.location)
    },
    imgClick (i) {
      this.dialogImageUrl = this.$root_url() + i.location
      this.zhongdengUrl = true
    },
    // 所在省
    changedprovince ($event, obj) {
      obj.province = $event.value
      this.from.city = ''
      this.from.region = ''
    },
    // 所在地
    chengedcity ($event, obj) {
      obj.city = $event.value
      this.from.region = ''
    },
    // 所在区
    chengedarea ($event, obj) {
      obj.region = $event.value
    },
    // 查看详情
    handleView (item, type) {
      this.hasSelelet = 1
      var that = this
      var chain_id = item.id
      if (type === 'invoice') {
        this.$ajax.post('/api/get_chain_id/', {token: that.$token(), 'invoice_id': item.id}).then(res => {
          if (res.data.code === '1') {
            chain_id = res.data.chain_id
            if (item.chain_type === '1') {
              this.$router.push({
                path: '/viewchain_new',
                query: {
                  id: chain_id,
                  showTab: 1,
                  from: 'business',
                  type: 'rece'
                }
              })
            } else {
              this.$router.push({
                path: '/chainview_new',
                query: {
                  id: chain_id,
                  showTab: 1,
                  from: 'business',
                  type: 'rece'
                }
              })
            }
          } else {
            that.$message.error(res.data.msg)
          }
        })
        return
      }
      if (item.chain_type === '1') {
        this.$router.push({
          path: '/viewchain_new',
          query: {
            id: chain_id,
            showTab: 1,
            from: 'business',
            type: 'rece'
          }
        })
      } else {
        this.$router.push({
          path: '/chainview_new',
          query: {
            id: chain_id,
            showTab: 1,
            from: 'business',
            type: 'rece'
          }
        })
      }
    },
    showChainDialog () {
      this.isShowChainDialog = true
      this.selChainList = []
      this.selArr = []
      this.chainList.forEach(val => {
        val.sel = 0
      })
    },
    // 新加自动添加
    autoAdd () {
      this.$message.info('此功能尚未开通')
    },
    // 添加去向
    suerSelChain () {
      this.isShowChainDialog = false
      var that = this
      this.chainList.forEach(val => {
        if (val.sel) {
          // arr.push(val)
          this.selArr.push(val.id)
          this.selChainList.push(val)
        }
      })
    },
    addInvoice: function($event, order, openCard) {
      this.select = 1;
      this.showListType = order;
      this.openCard = openCard;
      var chenArr = [];
      this.invoiceList.map((val, index) => {
        if (openCard === 1 && order === 0) {
          if (val.sel === order) {
            chenArr.push(val);
          }
        }
        if (openCard === 2 && order === 0) {
          if (val.sel === order) {
            chenArr.push(val);
          }
        }
      });
      chenArr.length === 0 ? (this.showEmpty = true) : (this.showEmpty = false);
      if (order === 1 && openCard === undefined) {
        this.first.length === 0
          ? (this.showEmpty = true)
          : (this.showEmpty = false);
      }
      if (order === 2 && openCard === undefined) {
        this.two.length === 0
          ? (this.showEmpty = true)
          : (this.showEmpty = false);
      }
    },
    slideDown: function() {
      this.selectInvoice = !this.selectInvoice;
    },
    todetail: function($event, id) {
      var that = this;
      this.selId = id;
      that.invoiceList.forEach(val => {
        if (val.id === that.selId) {
          that.first.push(val);
          val.sel = 1;
        }
      });
      this.hasSelelet = 1;
    },
    addTosel: function($event, id) {
      var that = this;
      var iList = that.invoiceList;
      var chenArr = [];
      iList.forEach((val, idnex) => {
        if (val.id === id) {
          // // console.log(id)
          val.sel = that.openCard;
          // val.sel = that.showListType
          that.openCard === 1 ? that.first.push(val) : that.two.push(val);
        }
        if (this.openCard === 1 && this.showListType === 0) {
          if (val.sel === this.showListType) {
            chenArr.push(val);
          }
        }
        if (this.openCard === 2 && this.showListType === 0) {
          if (val.sel === this.showListType) {
            chenArr.push(val);
          }
        }
      });
      chenArr.length === 0 ? (this.showEmpty = true) : (this.showEmpty = false);
    },
    delTosel: function($event, index, id) {
      this.invoiceList[index].sel = 0;
      this.first = [];
      this.two = [];
      this.invoiceList.forEach(val => {
        // console.log(val);
        if (val.sel === 1) {
          this.first.push(val);
        }
        if (val.sel === 2) {
          this.two.push(val);
        }
      });
      if (this.showListType === 1) {
        this.first.length === 0
          ? (this.showEmpty = true)
          : (this.showEmpty = false);
      }
      if (this.showListType === 2) {
        this.two.length === 0
          ? (this.showEmpty = true)
          : (this.showEmpty = false);
      }
    },
    subData: function() {
      var that = this;
      if (that.first.length === 0) {
        that.$message({
          type: "error",
          message: "至少选择一项质押"
        });
      } else {
        var first = [];
        var two = [];
        that.first.forEach(val => {
          first.push(val.id);
        });
        that.two.forEach(val => {
          two.push(val.id);
        });
        that.$ajax.post("/api/receivable_application/", {
            invoice_list1: first,
            invoice_list2: two,
            token: that.$token(),
            chain_id_list: that.selArr,
            financing_type: "receivable",
            other_list: that.otherId,
            att_list: that.zhongDeng
          })
          .then(res => {
            // console.log(res);
            if (res.data.code === "1") {
              that.$router.push({
                path: "/getting_expectation",
                query: {
                  fid: res.data.financing_id
                }
              });
            } else {
              that.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        // if (that.two.length === 0) {
        //   that.$message({
        //     type: 'error',
        //     message: '至少选择一项担保'
        //   })
        // } else {

        // }
      }
    },
    subAuto: function() {
      var that = this;
      var subDate = {};
      if (that.subDate.expect_loan_date === "") {
        that.$message.error("请选择融资时间");
      } else {
        if (that.subDate.expect_repayment_date === "") {
          that.$message.error("请选择还款时间");
        } else {
          subDate.expect_loan_date = that.$time(that.subDate.expect_loan_date, 2)
          subDate.expect_repayment_date = that.$time(that.subDate.expect_repayment_date, 2)
          subDate.financing_type = "receivable"
          subDate.token = that.$token()
          // console.log(subDate);
          that.$ajax.post("/api/one_key_addition/", subDate).then(res => {
            // console.log(res)
            if (res.data.invoice_list_1.length === 0) {
              that.$message.error("没有符合要求的质押票据");
              that.dialogVisible = false;
            } else {
              var drunk = [];
              var drunk1 = [];
              res.data.invoice_list_1.forEach(val => {
                drunk.push(val.id);
              })
              res.data.invoice_list_2.forEach(val => {
                drunk1.push(val.id);
              })
              that.$ajax.post("/api/receivable_application/", {
                  invoice_list1: drunk,
                  invoice_list2: drunk1,
                  ...subDate,
                  one_key: "1",
                  financing_type: "receivable"
                }).then(res1 => {
                  // console.log(res1);
                  if (res1.data.code === "1") {
                    that.$router.push({
                      path: "/auto_expectation",
                      query: {
                        fid: res1.data.financing_id
                      }
                    })
                  } else {
                    that.$message({
                      message: res1.data.msg,
                      type: "error"
                    });
                  }
                })
            // if (res.data.code === '1') {
            //   that.$router.push({
            //     path: '/getting_expectation',
            //     query: {
            //       id: res.data.financing_id
            //     }
            //   })
            // } else {
            //   that.$message({
            //     message: res.data.msg,
            //     type: 'error'
            //   })
            // }
            }
          })
        }
      }
    }
  },
  beforeCreate () {
    var that = this
    that.score = {}
    // var navStaus = that.statusList
    // var setp = that.setp
    // var showNav = []
    // navStaus.map((val, index) => {
    //   showNav[index] = {}
    //   if (index <= setp) {
    //     showNav[index].color = '#eb6100'
    //   } else {
    //     showNav[index].color = ''
    //   }
    // })
    that.bid = that.$route.query.id
    if (that.$route.query.fid) {
      that.fid = that.$route.query.fid
      that.$ajax.get('/api/financing_application_info/?token=' + that.$token() + '&financing_id=' + that.fid + '&financing_type=receivable').then(res => {
        // console.log(res)
        if (res.data.code === '1') {
          that.hasSelelet = 2
          that.first = res.data.data.invoice_list1
          that.two = res.data.data.invoice_list2
          that.score = res.data.data.score
          that.otherCollateralList = res.data.data.other_collateral
          that.zhongDengImg = res.data.data.att_list
        }
      })
    } else {
      that.fid = undefined
      that.$ajax.get("/api/receivable_application/?token=" + that.$token() + "&financing_type=receivable").then(res => {
        // console.log(res)
        if (res.data.code !== '0') {
          that.hasSelelet = 0
          res.data.invoice_list.forEach(val => {
            val.sel = 0
          })
          that.invoiceList = res.data.invoice_list
        }
      })
    }
    that.$ajax.get('/api/usage_chain_view/?token=' + that.$token()).then(res => {
      if (res.data.code === '1') {
        // console.log(res)
        res.data.data.forEach(val => {
          val.sel = 0
        })
        that.chainList = res.data.data
        // console.log(this.chainList)
      } else {
        that.$message.error(res.data.msg)
      }
    })
  }
}
</script>

<style scoped lang="less">
// @import url("./iconfont.css");
.c_container {
  width: 100%;
  display: flex;
  height: 100%;
  //padding-top: 70px;
  .c_view_detail{
    text-decoration: underline;
    color: #eb6100;
    cursor: pointer;
  }
  .c_btn_add {
    display: inline-block;
    font-size: 14px;
    padding: 5px 20px;
    background: #eb6100;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    margin-left: -30px;
    &.c_btn_add_auto{
      margin-top: 15px;
      margin-left: -45px;
    }
  }
  .c_empty_accessory{
    height: 48px;
    font-size: 14px;
    line-height: 48px;
    color: #999;
    text-align: center;
  }
  .c_chain_dialog{
    .c_tab_top{
      margin-bottom: 20px;
      border-bottom: 1px solid #b6b6b6;
      span{
        cursor: pointer;
        padding: 10px 20px;
        display: inline-block;
        &:nth-of-type(2){
          color: #ccc;
        }
        &:nth-of-type(1):hover{
          color: #eb6100;
          border-bottom: 2px solid #eb6100;
        }
        &.active{
          color: #eb6100;
          border-bottom: 2px solid #eb6100;
        }
      }
    }
    .c_chain_box{
      .c_table_item{
        margin-bottom: 20px;
        font-size: 14px;
        border: 1px solid #ccc;
        ul {
          li {
            margin-top: 30px;
            .c_invoic_wrap_title{
              padding: 0 20px;
              line-height: 24px;
              font-size: 14px;
              position: relative;
              padding-left: 75px;
              &.c_ticket_bgj{
                background: url('../../../../static/img/tickets/jq01.png') #f0f0f0 no-repeat 5px center !important;
              }
              &.c_ticket_bgy{
                background: url('../../../../static/img/tickets/yq01.png') #f0f0f0 no-repeat 5px center !important;
              }
              &.c_ticket_bgt{
                background: url('../../../../static/img/tickets/tq01.png') #f0f0f0 no-repeat 5px center !important;
              }
              .mwidth{
                display: inline-block;
                width: 280px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .c_opreate{
                position: absolute;
                right: 20px;
                top: 30px;
                div{
                  cursor: pointer;
                  color: #eb6100;
                }
              }
            }
            .c_invoice_info_box{
              display: flex;
              font-size: 14px;
              line-height: 28px;
              padding-left: 10px;
              .c_part{
                flex: 1;
                .c_info_title{
                  display: inline-block;
                  width: 70px;
                  text-align:justify;
                  text-align-last:justify;
                }
                h4{
                  font-weight: bold;
                  line-height: 34px;
                }
              }
            }
            .invoic_wrap_title {
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #f0f0f0;
              padding-left: 10px;
              font-size: 14px;
              input{
                width: 20px;
                height: 20px;
                vertical-align: middle;
              }
              .mgl_10{
                margin-left: 10px;
              }
              &>div {
                display: flex;
              }
              &>div:first-child span{
                color: #eb6100;
              }
              &>div:first-child div:last-child {
                margin-left: 15px;
              }
              &>div:last-child {
                div {
                  color: #eb6100;
                  cursor: pointer;
                }
                .invoice_sure {
                  margin-right: 15px;
                }
              }
            }
            .invoice_wrap_card {
              .c_sure_info{
                font-size: 14px;
                width: 100%;
                color: #eb6100;
                border-top: 1px solid #ccc;
                line-height: 48px;
                text-align: right;
                span{
                  margin: 0 10px;
                }
              }
              // &>div:first-child {
              //   height: 40px;
              //   display: flex;
              //   font-size: 14px;
              //   padding: 0 10px;
              //   div {
              //     width: 300px;
              //     height: 40px;
              //     line-height: 40px;
              //   }
              // }
              // &>div:last-child {
              //   height: 48px;
              //   display: flex;
              //   justify-content:space-between;
              //   padding: 0 10px;
              //   font-size: 14px;
              //   line-height: 35px;
              // }
            }
          }
          li:first-child{
            margin-top: 0
          }
        }
      }
      .c_nex_box{
        margin-top: 60px;
        text-align: center;
        a{
          cursor: pointer;
          display: inline-block;
          padding: 8px 20px;
          background: #eb6100;
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
        }
      }
      .c_for_what_title{
        border-left: 4px solid #eb6100;
        padding-left: 20px;
        margin-bottom: 30px;
        margin-top: 20px;
      }
    }
    .c_sel_btn{
      text-align: center;
    }
    .c_sel_btn a{
      cursor: pointer;
      display: inline-block;
      padding: 6px 20px;
      background: #eb6100;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
    }
  }
  .c_btm_container {
    margin-top: 30px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 30px;
    .zhong_network {
      height: 50px;
      text-align: center;
      padding-top: 10px;
      p {
        display: inline-block;
        font-size: 14px;
        span {
          color: #eb6100;
          cursor: pointer;
          text-decoration: underline;
        }
      }
      a {
        display: inline-block;
        font-size: 14px;
        color: #eb6100;
        cursor: pointer;
        text-decoration: underline;
        padding-left: 50px;
      }
    }
    .score {
      height: 34px;
      text-align: center;
      p {
        font-weight: 600;
      }
    }
    .c_ticket_box{
      li {
        height: 120px;
        &>div {
          &>div:last-child {
            div {
              // height: 30px;
              line-height: 30px;
            }
          }
        }
      }
      .c_a {
        min-height: 120px;
        p {
          padding-left: 5px;
          display: block;
          span {
            display: block;
          }
          p {
            display: inline-block;
          }
          a {
            cursor: pointer;
            display: block;
            color: #eb6100;
            text-decoration: underline;
            font-size: 14px;
            padding-bottom: 5px;
            margin-left: 70px;
            width: 200px;
            height: 28px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
        &>div {
          min-height: 40px;
          line-height: 40px;
        }
        &>div:last-child {
          display: flex;
          .c_a_list {
            height: auto;
            min-height: 40px;
            width: 75%;
            div {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .financing_score {
        top: -22px;
        position: relative;
        font-weight: 600;
        right: -280px;
      }
      .financing_score_r {
        top: -22px;
        position: relative;
        font-weight: 600;
        right: -234px;
      }
      .c_bg_box{
        min-height: 84px;
        padding-left: 65px;
        &.c_ticket_bgj{
          background: url('../../../../static/img/tickets/jq01.png') no-repeat left top !important;
        }
        &.c_ticket_bgy{
          background: url('../../../../static/img/tickets/yq01.png') no-repeat left top !important;
        }
        &.c_ticket_bgt{
          background: url('../../../../static/img/tickets/tq01.png') no-repeat left top !important;
        }
      }
      .c_bg_boxs {
        padding-left: 20px;
      }
    }
  }
  .other_collateral {
    select {
      width: 200px;
      height: 32px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      outline: none;
    }
    .select_list {
      margin-top: 20px;
      h3 {
        font-weight: bold;
        margin-bottom: 20px;
        span {
          font-weight: bold;
        }
      }
      .input_type {
        display: inline-block;
        position: relative;
        input {
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          outline: none;
          width: 320px;
          height: 32px;
          padding: 0 10px;
          padding-right: 46px;
        }
        span {
          position: absolute;
          right: 15px;
          top: 2px;
        }
      }
      .num_style {
        margin-right: 15px;
        position: relative;
        input {
          width: 150px;
          padding-right: 32px;
        }
        span {
          position: absolute;
          right: 15px;
          top: 2px;
          color: #606266;
        }
      }
      .file_img {
        width: 360px;
        .upload-demo {
          width: 100%;
          .el-upload {
            width: 360px;
          }
        }
      }
      .button_slot {
        text-align: center;
        div {
          width: 100px;
          height: 32px;
          outline: none;
          border-radius: 5px;
          margin: 0 20px;
          cursor: pointer;
          display: inline-block;
          line-height: 32px;
          text-align: center;
        }
        .install {
          background: #eb6100;
          border: none;
          color: #fff;
        }
        .cancel {
          background: none;
          border: 1px solid #eb6100;
          color: #eb6100;
        }
      }
    }
    .select_ul {
      padding-bottom: 30px;
      ul {
        li {
          padding-top: 10px;
          padding-left: 10px;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
          }
          p {
            display: inline-block;
            padding-left: 20px;
            color: #333;
          }
          div {
            display: inline-block;
            // padding-top: 5px;
            span {
              float: left;
              width: 100px;
              text-align: right;
            }
            div {
              float: left;
              padding-left: 20px;
              a {
                color: #eb6100;
                cursor: pointer;
                display: block;
                margin-right: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-transition: color .3s;
                transition: color .3s;
                white-space: nowrap;
                font-size: 14px;
                padding-bottom: 10px;
                i {
                  padding-right: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.application {
  padding: 0 50px;
  overflow-y: auto;
  background: #f5f7f8;
  // width: 100%;
  .view_info {
    // width: 1280px;
    margin: 0 auto;
    .top_nav {
      box-shadow: 0px 0px 5px #ccc;
      // width: 1280px;
    }
    .status_pic {
      margin-top: 30px;
      padding: 0 30px;
      .c_add_pledge {
        position: relative;
        span {
          position: absolute;
          top: -130px;
          left: 50%;
          z-index: 999;
          transform: translateX(-50%);
          font-size: 14px;
          color: #eb6100;
          cursor: pointer;
        }
      }
      .pic_info {
        display: flex;
        // width: 1200px;
        height: 150px;
        justify-content: space-between;
        background: #fff;
        font-size: 14px;
        .mine_info {
          width: 15%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .icon_wrap {
            width: 50px;
            height: 50px;
            // background: #f0f0f0;
            color: #eb6100;
            // border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              font-size: 50px;
            }
          }
          .line_to {
            height: 30px;
            width: 2px;
            background: #eb6100;
            margin-top: 10px;
          }
          div:last-child {
            color: #eb6100;
            // margin-top: 10px;
          }
        }
        .pic_line {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          div:first-child {
            height: 28px;
            line-height: 28px;
            span {
              cursor: pointer;
              color: #eb6100;
            }
          }
          div:last-child {
            height: 2px;
            width: 100%;
            background: #f0f0f0;
          }
        }
        .seller_info {
          width: 15%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .icon_wrap {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              font-size: 48px;
              color: rgb(235, 97, 0);
            }
          }
          .line_to {
            height: 30px;
            width: 2px;
            background: #eb6100;
            margin-top: 10px;
          }
          div:last-child {
            color: #eb6100;
            // margin-top: 5px;
          }
        }
      }
      .invoce_list {
        margin-top: 30px;
        padding: 0 30px;
        padding-bottom: 50px;
        background: #fff;
        box-shadow: 2px 2px 2px 2px #eaeaea;
        .info_title {
          height: 60px;
          display: flex;
          font-size: 14px;
          justify-content: space-between;
          align-items: center;
          div {
            color: #eb6100;
          }
          input {
            width: 240px;
          }
        }
        .invoice_item {
          margin-top: 20px;
          font-size: 14px;
          border: 1px solid #ccc;
          background: #f8f8f8;
          .invoice_title {
            display: flex;
            height: 60px;
            justify-content: space-between;
            // background: #eaeaea;
            align-items: center;
            padding: 0 30px;
            .c_invoice_title{
              cursor: default;
              display: inline-block;
              vertical-align: middle;
              max-width: 300px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            & > div:first-child {
              line-height: 0px;
            }
            & > div:last-child {
              color: #fff;
              cursor: pointer;
              background: #eb6100;
              padding: 6px 20px;
              border-radius: 4px;
            }
            span {
              margin-right: 30px;
              line-height: 60px;
              &:first-of-type{
                font-weight: bold;
              }
            }
          }
          .invoice_card {
            width: 100%;
            .date_list {
              height: 50px;
              display: flex;
              align-items: center;
              margin: 0 30px 0 75px;
              border-top: 1px solid #ccc;
              div {
                width: 280px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              }
            }
            .pay_list{
              border-top: 1px solid #ccc;
              margin: 0 30px 0 75px;
              .pay_list_item{
                height: 50px;
                display: flex;
                border-top: 1px dashed #ccc;
                align-items: center;
                div {
                  cursor: default;
                  width: 280px;
                  padding-right: 10px;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
                }
                &:first-of-type{
                  border: none;
                }
              }
            }
            .roles {
              border-top: 1px solid #ccc;
              margin: 0 30px 0 75px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 50px;
            }
          }
        }
      }
    }
  }
  .status_pic1 {
    margin-top: 30px;
    padding: 0 30px;
    .pic_info {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      height: 150px;
      justify-content: space-between;
      // background: #fff;
      font-size: 14px;
      .mine_info {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .icon_wrap {
          width: 50px;
          height: 50px;
          // background: #f0f0f0;
          color: #eb6100;
          // border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            font-size: 50px;
          }
        }
        .line_to {
          height: 30px;
          width: 3px;
          background: #eb6100;
          margin-top: 10px;
        }
        div:last-child {
          color: #eb6100;
          // margin-top: 10px;
        }
      }
      .pic_line {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .symbol {
          width: 26px;
          height: 26px;
          background: rgba(235, 97, 0, 0.5);
          border-radius: 50%;
          position: absolute;
          left: 48%;
          top: 41%;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            // background: black;
            background: #eb6100;
          }
        }
      }
      .seller_info {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .icon_wrap {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            font-size: 50px;
            color: rgb(235, 97, 0);
          }
        }
        .line_to {
          height: 30px;
          width: 2px;
          background: #eb6100;
          margin-top: 10px;
        }
        div:last-child {
          color: #eb6100;
          // margin-top: 5px;
        }
      }
    }
  }
  .select_two {
    // width: 800px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    .c_tip{
      color: #f55;
      .orange{
        color: #eb6100;
      }
    }
    & > div {
      max-width: 400px;
      padding: 0 35px;
      flex: 1;
    }
    .select_wrap {
      padding: 0 20px;
      // border-top: 3px solid #eb6100;
      // padding-top: 145px;
      i {
        margin-left: -10px;
        margin-right: 10px;
        display: inline-block;
        width: 20px;
        height: 12px;
        background: url("../../../../static/img/slidedown.png") no-repeat center;
        background-size: 100%;
        &.active{
          transform:rotate(180deg);
          -ms-transform:rotate(180deg); 	/* IE 9 */
          -moz-transform:rotate(180deg); 	/* Firefox */
          -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
          -o-transform:rotate(180deg);
        }
      }
      & > div {
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        // text-align: center;
        // width: 80%;
        span:last-child,
        span:nth-child(2) {
          font-size: 12px;
          color: #eb6100;
          margin-left: 20px;
          cursor: pointer;
        }
      }
      &>div:first-child {
        padding-left: 20px;
        line-height: 36px;
        font-weight: bolder;
        height: 36px;
      }
      .score {
        width: 100%;
        text-align: right;
        p {
          font-weight: 600;
          color: #eb6100;
          font-size: 16px;
        }
      }
      ul {
        padding-bottom: 20px;
        border-left: 1px dashed #eb6100;
        // margin-left: -14px;
        li {
          border: 1px dashed #eb6100;
          border-left: none;
          margin-top: 20px;
          & > div {
            margin-left: -14px;
            display: flex;
            align-items: center;
            & > div:first-child {
              width: 26px;
              height: 26px;
              background: rgba(235, 97, 0, 0.5);
              margin-top: -15px;
              border-radius: 50%;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              div {
                width: 16px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                border-radius: 50%;
                font-size: 14px;
                background: rgb(235, 97, 0);
              }
            }
            & > div:last-child {
              width: 280px;
              // background: #eb6100;
              margin-left: 14px;
              font-size: 14px;
              div {
                // height: 28px;
                line-height: 28px;
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
    .select_second {
      // margin-left: 30px;
      padding: 0 15px;
      .total_ava_score {
        margin-left: 240px;
        position: relative;
        font-weight: 600;
        top: 24px;
        width: 150px;
      }
      .second_wrap {
        margin-left: 50px;
        // padding-top: 30px;
        i {
          margin-left: -10px;
          margin-right: 10px;
          display: inline-block;
          width: 20px;
          height: 12px;
          background: url("../../../../static/img/slidedown.png") no-repeat center;
          background-size: 100%;
          &.active{
            transform:rotate(180deg);
            -ms-transform:rotate(180deg); 	/* IE 9 */
            -moz-transform:rotate(180deg); 	/* Firefox */
            -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
            -o-transform:rotate(180deg);
          }
        }
        & > div {
          height: 30px;
          font-size: 14px;
          line-height: 30px;
          // text-align: center;
          // width: 80%;
          span:last-child,
          span:nth-child(2) {
            font-size: 12px;
            color: #eb6100;
            margin-left: 20px;
            cursor: pointer;
          }
        }
        &>div:first-child {
          height: 36px;
          line-height: 36px;
          padding-left: 20px;
          font-weight: bolder;
        }
        .score {
          width: 100%;
          text-align: right;
          p {
            font-size: 16px;
            font-weight: 600;
            color: #eb6100;
          }
        }
        ul {
          padding-bottom: 20px;
          border-left: 1px dashed #eb6100;
          // margin-left: -14px;
          li {
            border: 1px dashed #eb6100;
            border-left: none;
            margin-top: 20px;
            & > div {
              margin-left: -14px;
              display: flex;
              align-items: center;
              & > div:first-child {
                width: 26px;
                height: 26px;
                background: rgba(235, 97, 0, 0.5);
                border-radius: 50%;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                div {
                  width: 16px;
                  height: 16px;
                  line-height: 16px;
                  text-align: center;
                  border-radius: 50%;
                  font-size: 14px;
                  background: rgb(235, 97, 0);
                }
              }
              & > div:last-child {
                width: 280px;
                margin-left: 14px;
                font-size: 14px;
                div {
                  // height: 28px;
                  line-height: 28px;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
    .select_second:last-of-type {
      .select_wrap {
        padding: 0 20px;
        ul {
          min-height: 140px;
          padding-top: 20px;
          padding-bottom: 0;
          position: relative;
          p:first-child {
            line-height: 20px;
            position: absolute;
            top: 0px;
            width: 100%;
            padding-right: 6px;
            text-align: right;
            // padding-top: 20px;
          }
          li {
            margin-top: 0;
            min-height: 120px;
            height: auto;
            &>div {
              &>div:last-child {
                div {
                  line-height: 40px;
                }
              }
            }
          }
        }
        p:last-child {
          padding-top: 20px;
        }
      }
    }
  }
  .subData {
    margin-top: 40px;
    padding: 20px 0;
    div {
      width: 120px;
      height: 36px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      background: #eb6100;
      margin: 0 auto;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .zhong_deng_network {
    margin: 20px auto;
    width: 100%;
    div {
      margin: 0 auto;
    }
    h3 {
      font-weight: bold;
      border-left: 5px solid #eb6100;
      padding-left: 20px;
      width: 350px;
      margin: 0 auto;
      margin-bottom: 20px;
      text-align: left;
    }
    .file_img {
      width: 360px;
      .upload-demo {
        width: 100%;
        display: flex;
        flex-direction: row;
        .el-upload {
          width: 360px;
          margin-right: 30px;
        }
      }
      ul {
        margin-left: 30px;
        li {
          padding-left: 30px;
          cursor: pointer;
        }
      }
      .el-upload-list {
        padding-left: 30px;
        li {
          margin-left: 30px;
        }
      }
    }
    .img_list {
      // display: flex;
      // flex-direction: row;
      margin: 0 auto;
      text-align: center;
      img {
        display: inline-block;
        width: 158px;
        height: 148px;
        cursor: pointer;
        margin: 0 20px;
      }
    }
  }
  .wrap {
    width: 100%;
    height: 100%;
    background: rgba(65, 57, 57, 0.67);
    position: fixed;
    z-index: 9999999;
    overflow-y: scroll;
    top: 0;
    left: 0;
    padding: 100px 0;
    .window {
      width: 1280px;
      margin: 0 auto;
      background: #fff;
      padding: 10px 30px;
      .invoice_wrap_list {
        & > div {
          height: 50px;
          font-size: 14px;
          color: #eb6100;
          line-height: 50px;
        }
        .c_empty {
          height: 100px;
          line-height: 100px;
          text-align: center;
          border-top: 1px solid #ccc;
          color: #999;
        }
      }
      ul {
        li {
          border: 1px solid #ccc;
          margin-top: 30px;
          .c_invoic_wrap_title{
            padding: 0 20px;
            line-height: 24px;
            font-size: 14px;
            position: relative;
            padding-left: 75px;
            &.c_ticket_bgj{
              background: url('../../../../static/img/tickets/jq01.png') #f0f0f0 no-repeat 5px center !important;
            }
            &.c_ticket_bgy{
              background: url('../../../../static/img/tickets/yq01.png') #f0f0f0 no-repeat 5px center !important;
            }
            &.c_ticket_bgt{
              background: url('../../../../static/img/tickets/tq01.png') #f0f0f0 no-repeat 5px center !important;
            }
            .mwidth{
              display: inline-block;
              width: 280px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .c_opreate{
              position: absolute;
              right: 20px;
              top: 30px;
              div{
                cursor: pointer;
                color: #eb6100;
              }
            }
          }
          .c_invoice_info_box{
            display: flex;
            font-size: 14px;
            line-height: 28px;
            padding-left: 10px;
            .c_part{
              flex: 1;
              .c_info_title{
                display: inline-block;
                width: 70px;
                text-align:justify;
                text-align-last:justify;
              }
              h4{
                font-weight: bold;
                line-height: 34px;
              }
            }
          }
          .invoic_wrap_title {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f0f0f0;
            padding: 0 20px;
            font-size: 14px;
            line-height: 50px;
            img{
              width: 35px;
              height: 50px;
              vertical-align: middle;
              margin-right: 10px;
            }
            div{
              padding-right: 10px;
            }
            & > div {
              display: flex;
            }
            & > div:first-child span {
              color: #eb6100;
              margin-right: 10px;
            }
            & > div:last-child {
              div {
                color: #eb6100;
                cursor: pointer;
              }
              .invoice_sure {
                margin-right: 15px;
              }
            }
          }
          .invoice_wrap_card {
            font-size: 14px;
            h4{
              border-top: 1px solid #ccc;
              font-size: 14px;
              font-weight: bold;
              line-height: 34px;
              padding-left: 10px;
              span{
                margin-left: 30px;
                color: #eb6100;
              }
            }
            .c_sure_info{
              width: 100%;
              color: #eb6100;
              border-top: 1px solid #ccc;
              line-height: 48px;
              text-align: right;
              span{
                margin: 0 10px;
              }
            }
            .pay_list{
              font-size: 14px;
              padding: 0 10px;
              border-top: 1px solid #eee;
              border-bottom: 1px solid #eee;
              .pay_list_item{
                height: 50px;
                display: flex;
                border-top: 1px dashed #eee;
                align-items: center;
                div {
                  cursor: default;
                  width: 280px;
                  padding-right: 10px;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
                }
                &:first-of-type{
                  border: none;
                }
              }
            }
            .pay_info {
              height: 40px;
              display: flex;
              font-size: 14px;
              padding: 0 10px;
              div {
                width: 300px;
                height: 40px;
                line-height: 40px;
              }
            }
            .pay_company {
              // height: 35px;
              // display: flex;
              // justify-content: space-between;
              padding: 0 10px;
              font-size: 14px;
              line-height: 35px;
              h4{
                font-weight: bold;
              }
            }
          }
        }
        li:first-child {
          margin-top: 0;
        }
      }
    }
  }
  .auto_financing {
    height: 120px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      text-decoration: underline;
      // background: #eb6100;
      // border-bottom: 1px solid #eb6100;
      color: #eb6100;
      cursor: pointer;
    }
  }
}
.date_line {
  height: 60px;
}
.data_empty {
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: #999;
  border-top: 1px dashed #eaeaea;
}
.el_dialog_divlist {
  padding: 30px 20px;
  height: 100%;
  .el-ls {
    height: 100%;
  }
  .list {
    background: #fff;
    border: 1px solid #ccc;
    height: auto;
    width: 100%;
    margin: 20px 0;
    .top {
      height: auto;
      padding: 0 30px;
      background: #ebebeb;
      border-bottom: 1px solid #ccc;
      .list_a {
        line-height: 50px;
        span {
          display: inline-block;
          padding-right: 20px;
          a {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        p {
          display: inline-block;
          color: #eb6100;
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .top_list {
        display: flex;
        flex-direction: row;
        .left {
          width: 70px;
          height: 80px;
          margin-top: 12px;
        }
        .c_ticket_bgj{
          background: url('../../../../static/img/tickets/jq.png') no-repeat left top !important;
        }
        .c_ticket_bgy{
          background: url('../../../../static/img/tickets/yq.png') no-repeat left top !important;
        }
        .c_ticket_bgt{
          background: url('../../../../static/img/tickets/tq.png') no-repeat left top !important;
        }
        .right {
          padding-top: 12px;
          flex: 1;
          line-height: 75px;
          ul {
            padding: 0 6px;
            display: flex;
            flex-direction: row;
            margin-bottom: 3px;
            li {
              margin-right: 50px;
            }
          }
        }
      }
    }
    .center_list {
      height: auto;
      padding: 0 30px;
      background: #ebebeb;
      border-bottom: 1px solid #ccc;
      padding-top: 12px;
      ul {
        padding: 0 6px;
        display: flex;
        flex-direction: row;
        margin-bottom: 3px;
        li {
          flex: 1;
          p {
            width: 70px;
            height: 30px;
            display: inline-block;
            text-align: justify;
            text-align-last: justify;
          }
        }
      }
      .span {
        color: #eb6100;
        text-decoration: underline;
        display: inline-block;
        cursor: pointer;
      }
    }
    .center {
      padding: 20px 30px;
      height: auto;
      display: flex;
      flex-direction: row;
      .left {
        flex: 1;
        h3 {
          font-weight: bold;
          padding-bottom: 10px;
        }
        ul {
          li {
            line-height: 35px;
            span {
              display: inline-block;
              width: 80px;
              height: 30px;
              text-align: justify;
              text-align-last: justify;
            }
            p {
              display: inline-block;
            }
          }
        }
      }
      .right {
        flex: 1;
        h3 {
          font-weight: bold;
          padding-bottom: 10px;
        }
        ul {
          li {
            line-height: 35px;
            span {
              display: inline-block;
              width: 80px;
              height: 30px;
              text-align: justify;
              text-align-last: justify;
            }
            p {
              display: inline-block;
            }
          }
        }
      }
    }
    .bottom_quan {
      width: 100%;
      height: auto;
      padding: 20px 30px;
      box-sizing: border-box;
      border-top: 1px solid #ccc;
      h3 {
        font-weight: bold;
        span {
          display: inline-block;
          padding-left: 20px;
        }
      }
      .li_list {
        display: flex;
        flex-direction: row;
        dl {
          flex: 1;
          dt {
            border-top: 2px dashed #ccc;
            position: relative;
            margin-top: 20px;
            height: 30px;
            img {
              position: absolute;
              top: -10px;
            }
          }
        }
        dl:last-child {
          dt {
            border-top: none;
          }
        }
      }
    }
    .bottom {
      line-height: 50px;
      border-top: 1px solid #ccc;
      height: auto;
      text-align: right;
      span {
        display: inline-block;
        color: #eb6100;
        padding: 0 20px;
      }
    }
  }
}
</style>
