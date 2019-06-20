<template>
  <div class="view_chain">
    <!-- <appNav :father="father" type='2'></appNav> -->
    <div class="chain_nav_top" v-if="element">
      <div class="topLocation">
        <location :location="location"></location>
      </div>
      <!-- <chain-nav-line v-if="selIndex === 0" :chainId='chainId' ref="child" :dataNav='data_nav' @checkState='checkNavState' @toAnchorPlace='toAnchorPlace'></chain-nav-line> -->
    </div>
    <div class="line_detail">
      <div class="middleLocation">
        <location :location="location"></location>
      </div>
      <!-- <div class="chainNavLine" v-if="!element">
        <chain-nav-line v-if="selIndex === 0"  :chainId='chainId' ref="child" :dataNav='data_nav' @checkState='checkNavState' @toAnchorPlace='toAnchorPlace'></chain-nav-line>
      </div> -->
      <ul class="view_nav">
        <li v-show="userType === 'business' || (index === 0 && userTypeArr.indexOf(userType) > -1)" v-for="(item, index) in navList" :key="index" @click="changeTab($event, index)"><span :class="index === selIndex ? 'sel':''">{{item.name}}</span></li>
      </ul>
      <div v-if="selIndex === 0" class="chain_list">
        <div class="ticket" v-if="ticket">
          <span>应收</span>
          <div class="ticket_item">
            <img src="static/img/tickets/jq01.png" alt="">
            <div class="ticket_text">
              <div class="ticket_value">
                <span>金额：{{toThousands(ticket.bank_ticket.sum)}}元</span>
              </div>
              <div class="ticket_num">
                <span>{{ticket.bank_ticket.count}}张</span>
              </div>
            </div>
          </div>
          <div class="ticket_item">
            <img src="static/img/tickets/yq01.png" alt="">
            <div class="ticket_text">
              <div class="ticket_value">
                <span>金额：{{toThousands(ticket.business_ticket.sum)}}元</span>
              </div>
              <div class="ticket_num">
                <span>{{ticket.business_ticket.count}}张</span>
              </div>
            </div>
          </div>
          <div class="ticket_item">
            <img src="static/img/tickets/tq01.png" alt="">
            <div class="ticket_text">
              <div class="ticket_value">
                <span>金额：{{toThousands(ticket.digital_ticket.sum)}}元</span>
              </div>
              <div class="ticket_num">
                <span>{{ticket.digital_ticket.count}}张</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket bar" v-if="bar">
          <span>应付</span>
          <div class="ticket_item">
            <img src="static/img/tickets/ht01.png" alt="">
            <div class="ticket_text">
              <div class="ticket_value">
                <span>金额：{{toThousands(bar.red_bar.sum)}}元</span>
              </div>
              <div class="ticket_num">
                <span>{{bar.red_bar.count}}张</span>
              </div>
            </div>
          </div>
          <div class="ticket_item">
            <img src="static/img/tickets/ht001.png" alt="">
            <div class="ticket_text">
              <div class="ticket_value">
                <span>金额：{{toThousands(bar.yellow_bar.sum)}}元</span>
              </div>
              <div class="ticket_num">
                <span>{{bar.yellow_bar.count}}张</span>
              </div>
            </div>
          </div>
          <div class="ticket_item">
            <img src="static/img/tickets/bt01.png" alt="">
            <div class="ticket_text">
              <div class="ticket_value">
                <span>金额：{{toThousands(bar.white_bar.sum)}}元</span>
              </div>
              <div class="ticket_num">
                <span>{{bar.white_bar.count}}张</span>
              </div>
            </div>
          </div>
        </div>
        <div class="chain-box">
          <div class="chain-box__item">
            <div class="chain-box__item__title">
              <span class="chain-box_show">销售合同登记</span>
              <img src="static/img/chain/chaindown1.png" alt="">
            </div>
            <div class="chain-box__item__content">
              <div class="chain-container">
                <div class="first_view">
                  <div class="first_chain">
                    <div class="chain_title">
                      <div class="symbol_large_orange"><div></div></div>
                      <span>B2B销售合同登记</span>
                    </div>
                    <contract :chainType="`1`" :type="`1`" :contractType="`1`" :id='chainId' @changeId='handleChild'/>
                  </div>
                </div>
                <div class="second_view">
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_orange"><div></div></div>
                      <span>B2B电子订单登记</span>
                    </div>
                    <order :chainType="`1`" :type="`1`" :id='contractIds.receive' @changOrderId="updataOrderId"/>
                  </div>
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_orange"><div></div></div>
                      <span>B2B订单结算</span>
                    </div>
                    <settlement :chainType="`1`" :type="`1`" :id='contractIds.receive' :orderId="orderIds.receive"/>
                  </div>
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_orange"><div></div></div>
                      <span>B2B合同结算</span>
                    </div>
                    <settlement-contract :chainType="`1`" :type="`1`" :id='contractIds.receive'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chain-box__item">
            <div class="chain-box__item__title">
              <span class="chain-box_show">采购合同登记</span>
              <img src="static/img/chain/chaindown1.png" alt="">
            </div>
            <div class="chain-box__item__content">
              <div class="chain-container border_hide">
                <div class="first_view border_show">
                  <div class="first_chain">
                    <div class="chain_title">
                      <div class="symbol_large_blue"><div></div></div>
                      <span>B2B采购合同登记</span>
                    </div>
                    <contract :chainType="`1`" :type="`2`" :id='chainId' :contractType="`2`"  @changeId='handleChild' />
                  </div>
                </div>
                <div class="second_view">
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_blue"><div></div></div>
                      <span>B2B电子订单登记</span>
                    </div>
                    <order :chainType="`1`" :type="`2`" :id='contractIds.payment' @changOrderId="updataOrderId"/>
                  </div>
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_blue"><div></div></div>
                      <span>B2B订单结算</span>
                    </div>
                    <settlement :chainType="`1`" :type="`2`" :id='contractIds.payment' :orderId="orderIds.payment"/>
                  </div>
                  <div class="second_chain">
                    <div class="chain_title">
                      <div class="symbol_middle_blue"><div></div></div>
                      <span>B2B合同结算</span>
                    </div>
                    <settlement-contract :chainType="`1`" :type="`2`" :id='contractIds.payment'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chain-btn-confirm">
            <!-- <div @click="sureConfirm()">确认并提交平台</div> -->
            <!-- <div class="disabled">合作企业确认</div> -->
          </div>
          <!-- <div class="modal-wrap">
            <div class="modal">
              <div class="modal__box">
                <div class="modal-title">
                  <span>当前项目最新内容</span>
                </div>
                <div class="modal-body">
                  <div class="modal-menu">
                    <h4 class="modal-menu__title">销售项目</h4>
                    <div class="modal-menu__item">
                      <span class="item_span">2018年度销售</span>
                      <span class="item_span">订单</span>
                      <span class="item_span">出库单</span>
                      <span class="item_span">2018年度销售</span>
                    </div>
                  </div>
                  <div class="modal-menu">
                    <h4 class="modal-menu__title">采购项目</h4>
                    <div class="modal-menu__item">
                      <span class="item_span">2018年度第一季度销售</span>
                      <span class="item_span">订单</span>
                      <span class="item_span">出库单</span>
                      <span class="item_span">2018年度销售</span>
                    </div>
                    <div class="modal-menu__item">
                      <span class="item_span">2018年度第二季度销售</span>
                      <span class="item_span">订单</span>
                      <span class="item_span">出库单</span>
                      <span class="item_span">2018年度销售</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal__box">
                <div class="modal-title">
                  <span>协同确认方 (请选择需要合作企业确认企业)</span>
                </div>
                <div class="modal-body">
                  <div class="modal-menu">
                    <h4>销售项目</h4>
                    <div class="modal-menu__item">
                      <div class="modal-form">
                        <div class="modal-form-item">
                          <label for="">项目名称：</label>
                          <span>2018年年度销售</span>
                        </div>
                        <div class="modal-form-item">
                          <label for="">交易公司</label>
                          <div class="modal-form-item__content">
                            <div class="modal-checkbox-group">
                              <div class="modal-checkbox">
                                <label for="">
                                  <input type="checkbox">
                                  <span>北京小小影业有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_confirm">已认证</span>
                                  <span>邀请</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-form-item">
                          <label for="">服务商</label>
                          <div class="modal-form-item__content">
                            <div class="modal-checkbox-group">
                              <div class="modal-checkbox">
                                <label>
                                  <input type="checkbox">
                                  <span>万物仓仓储有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_nopass">未认证</span>
                                  <span>邀请</span>
                                </label>
                              </div>
                              <div class="modal-checkbox">
                                <label>
                                  <input type="checkbox">
                                  <span>德邦物流有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_nopass">未认证</span>
                                  <span>邀请</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-menu">
                    <h4>采购项目</h4>
                    <div class="modal-menu__item">
                      <div class="modal-form">
                        <div class="modal-form-item">
                          <label for="">项目名称：</label>
                          <span>2018年年度销售</span>
                        </div>
                        <div class="modal-form-item">
                          <label for="">交易公司</label>
                          <div class="modal-form-item__content">
                            <div class="modal-checkbox-group">
                              <div class="modal-checkbox">
                                <label for="">
                                  <input type="checkbox">
                                  <span>北京小小影业有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_confirm">已认证</span>
                                  <span>邀请</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-form-item">
                          <label for="">服务商</label>
                          <div class="modal-form-item__content">
                            <div class="modal-checkbox-group">
                              <div class="modal-checkbox">
                                <label>
                                  <input type="checkbox">
                                  <span>万物仓仓储有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_nopass">未认证</span>
                                  <span>邀请</span>
                                </label>
                              </div>
                              <div class="modal-checkbox">
                                <label>
                                  <input type="checkbox">
                                  <span>德邦物流有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_nopass">未认证</span>
                                  <span>邀请</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-form">
                        <div class="modal-form-item">
                          <label for="">项目名称：</label>
                          <span>2018年年度销售</span>
                        </div>
                        <div class="modal-form-item">
                          <label for="">交易公司</label>
                          <div class="modal-form-item__content">
                            <div class="modal-checkbox-group">
                              <div class="modal-checkbox">
                                <label for="">
                                  <input type="checkbox">
                                  <span>北京小小影业有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_confirm">已认证</span>
                                  <span>邀请</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-form-item">
                          <label for="">服务商</label>
                          <div class="modal-form-item__content">
                            <div class="modal-checkbox-group">
                              <div class="modal-checkbox">
                                <label>
                                  <input type="checkbox">
                                  <span>万物仓仓储有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_nopass">未认证</span>
                                  <span>邀请</span>
                                </label>
                              </div>
                              <div class="modal-checkbox">
                                <label>
                                  <input type="checkbox">
                                  <span>德邦物流有限公司</span>
                                </label>
                                <label for="">
                                  <span class="status_nopass">未认证</span>
                                  <span>邀请</span>
                                </label>
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
          </div>  -->
        </div>
      </div>
      <div v-if="selIndex === 1" class="chain_list">
        <div class="card_title">
          <span>销售合同登记<i class="c_bg_down" :style="down1 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'" @click='down1 = !down1'></i></span>
        </div>
        <div class="chain">
          <div class="card_list" v-if="!down1">
            <div class="card_item" v-for="(title, index) in titleList" :key="index" v-if="index <= 6">
              <div class="item_title">
                <div class="title_symbol">
                  <div></div>
                </div>
                <span>{{title.name}}</span>
              </div>
              <div class="item_info" v-if="index <= 2">
                <div class="item_card">
                  <div class="item_sec_title">参与角色</div>
                  <div class="item_table">
                    <div class="teble_title">
                      <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                    </div>
                    <div class="table_line" v-for="(tr, trIndex) in record[index]" :key="trIndex">
                      <div>{{tr.operator_role}}</div>
                      <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                      <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                      <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                      <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                      <div>
                        <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item_card">
                  <div class="item_sec_title">编辑与修改</div>
                  <div class="item_table" v-for="(log, logIndex) in record[index]" :key='logIndex'>
                    <p>创建时间：{{log.create_time}}</p>
                    <div class="teble_title">
                      <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                    </div>
                    <div class="table_line">
                      <div>{{log.operator}}</div>
                      <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                      <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                      <div class="td_loginfo">{{log.log}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item_info" v-if="index === 3">
                <div class="item_card">
                  <div class="item_sec_title">参与角色</div>
                  <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                    <div class='item_title1'>{{tr.name}}【仓储合同编号：{{tr.number}}】</div>
                    <div class="teble_title" >
                      <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                    </div>
                    <div class="table_line">
                      <div>{{tr.operator_role}}</div>
                      <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                      <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                      <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                      <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                      <div>
                        <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item_card">
                  <div class="item_sec_title">编辑与修改</div>
                  <div class="item_table" v-for="log in record[index]" :key='log.index'>
                    <p>创建时间：{{log.create_time}}</p>
                    <div class="teble_title">
                      <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                    </div>
                    <div class="table_line">
                      <div>{{log.operator_role}}</div>
                      <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                      <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                      <div class="td_loginfo">{{log.log}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item_info" v-if="index === 4">
                <div class="item_card">
                  <div class="item_sec_title">参与角色</div>
                  <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                    <div class='item_title1'>{{tr.name}}【运输合同编号：{{tr.number}}】</div>
                    <div class="teble_title" >
                      <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                    </div>
                    <div class="table_line">
                      <div>{{tr.operator_role}}</div>
                      <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                      <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                      <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                      <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                      <div>
                        <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item_card">
                  <div class="item_sec_title">编辑与修改</div>
                  <div class="item_table" v-for="log in record[index]" :key='log.index'>
                    <p>创建时间：{{log.create_time}}</p>
                    <div class="teble_title">
                      <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                    </div>
                    <div class="table_line">
                      <div>{{log.operator_role}}</div>
                      <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                      <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                      <div class="td_loginfo">{{log.log}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item_info" v-if="index === 6">
                <div class="item_card">
                  <div class="item_sec_title">参与角色</div>
                  <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                    <div class='item_title1'>融资计划</div>
                    <div class="teble_title" >
                      <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                    </div>
                    <div class="table_line">
                      <div>{{tr.financing_plan.operator_role}}</div>
                      <div>{{tr.financing_plan.verifier_role ? tr.financing_plan.verifier_role : '未审核'}}</div>
                      <div>{{tr.financing_plan.approved_role ? tr.financing_plan.approved_role : '未确认'}}</div>
                      <div @click="roleClick(tr.financing_plan)">{{tr.financing_plan.service_role ? tr.financing_plan.service_role : '九星'}}</div>
                      <div><span @click="Authentication(tr.financing_plan.auth_role)">{{tr.financing_plan.auth_role ? tr.financing_plan.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                      <div>
                        <span v-for="(v, i) in tr.financing_plan.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                      </div>
                    </div>
                    <div class='supply_title' v-if="tr.financing_plan_supply.length !== 0">补充</div>
                    <div v-for="(su, suIndex) in tr.financing_plan_supply" :key='suIndex' class="table_line">
                      <div>{{su.operator_role}}</div>
                      <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                      <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                      <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                      <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                      <div>
                        <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item_card">
                  <div class="item_sec_title">编辑与修改</div>
                  <div class="item_table" v-for="log in record[index]" :key='log.index'>
                    <div class="teble_title">
                      <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                    </div>
                    <div class="table_line">
                      <div>{{log.financing_plan.operator_role}}</div>
                      <div>{{log.financing_plan.verifier_role ? log.financing_plan.verifier_role : '未审核'}}</div>
                      <div>{{log.financing_plan.approved_role ? log.financing_plan.approved_role : '未确认'}}</div>
                      <div class="td_loginfo">{{log.financing_plan.log}}</div>
                    </div>
                    <div class='supply_title' v-if="log.financing_plan_supply.length !== 0">补充</div>
                    <div v-for="su in log.financing_plan_supply" :key='su.index' class="table_line">
                      <div>{{su.operator_role}}</div>
                      <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                      <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                      <div class="td_loginfo">{{su.log}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="card_title">
            <span>关联采购登记<i class="c_bg_down" :style="down3 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'" @click='down3 = !down3' ></i></span>
          </div> -->
          <div class="card_list" v-if="!down1">
            <div class="card_item" v-for="(title, index) in titleList" :key="index" v-if="index > 6">
              <div class="item_title">
                <div class="title_symbol">
                  <div></div>
                </div>
                <span>{{title.name}}</span>
              </div>
              <div class="item_info">
                  <div class="" v-if="index === 7">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                        <div class='item_title1'>订单编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.order.operator_role}}</div>
                          <div>{{tr.order.verifier_role ? tr.order.verifier_role : '未审核'}}</div>
                          <div>{{tr.order.approved_role ? tr.order.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.order)">{{tr.order.service_role ? tr.order.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.order.auth_role)">{{tr.order.auth_role ? tr.order.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.order.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.order_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.order_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in record[index]" :key='log.index'>
                        <p>创建时间：{{log.order.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.order.operator_role}}</div>
                          <div>{{log.order.verifier_role ? log.order.verifier_role : '未审核'}}</div>
                          <div>{{log.order.approved_role ? log.order.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.order.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.order_supply.length !== 0">补充</div>
                        <div v-for="su in log.order_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 8">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                        <div class='item_title1'>仓单编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.warehouse.operator_role}}</div>
                          <div>{{tr.warehouse.verifier_role ? tr.warehouse.verifier_role : '未审核'}}</div>
                          <div>{{tr.warehouse.approved_role ? tr.warehouse.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.warehouse)">{{tr.warehouse.service_role ? tr.warehouse.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.warehouse.auth_role)">{{tr.warehouse.auth_role ? tr.warehouse.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.warehouse.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.warehouse_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.warehouse_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in record[index]" :key='log.index'>
                        <p>创建时间：{{log.warehouse.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.warehouse.operator_role}}</div>
                          <div>{{log.warehouse.verifier_role ? log.warehouse.verifier_role : '未审核'}}</div>
                          <div>{{log.warehouse.approved_role ? log.warehouse.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.warehouse.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.warehouse_supply.length !== 0">补充</div>
                        <div v-for="su in log.warehouse_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 9">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                        <div class='item_title1'>运单编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.transport.operator_role}}</div>
                          <div>{{tr.transport.verifier_role ? tr.transport.verifier_role : '未审核'}}</div>
                          <div>{{tr.transport.approved_role ? tr.transport.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.transport)">{{tr.transport.service_role ? tr.transport.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.transport.auth_role)">{{tr.transport.auth_role ? tr.transport.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.transport.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.transport_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.transport_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in record[index]" :key='log.index'>
                        <p>创建时间：{{log.transport.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.transport.operator_role}}</div>
                          <div>{{log.transport.verifier_role ? log.transport.verifier_role : '未审核'}}</div>
                          <div>{{log.transport.approved_role ? log.transport.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.transport.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.transport_supply.length !== 0">补充</div>
                        <div v-for="su in log.transport_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 10">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                        <div class='item_title1'>运单编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.acceptance.operator_role}}</div>
                          <div>{{tr.acceptance.verifier_role ? tr.acceptance.verifier_role : '未审核'}}</div>
                          <div>{{tr.acceptance.approved_role ? tr.acceptance.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.acceptance)">{{tr.acceptance.service_role ? tr.acceptance.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.acceptance.auth_role)">{{tr.acceptance.auth_role ? tr.acceptance.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.acceptance.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.acceptance_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.acceptance_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in record[index]" :key='log.index'>
                        <p>创建时间：{{log.acceptance.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.acceptance.operator_role}}</div>
                          <div>{{log.acceptance.verifier_role ? log.acceptance.verifier_role : '未审核'}}</div>
                          <div>{{log.acceptance.approved_role ? log.acceptance.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.acceptance.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.acceptance_supply.length !== 0">补充</div>
                        <div v-for="su in log.acceptance_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 11">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                        <div class='item_title1'>结算编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.settlement.operator_role}}</div>
                          <div>{{tr.settlement.verifier_role ? tr.settlement.verifier_role : '未审核'}}</div>
                          <div>{{tr.settlement.approved_role ? tr.settlement.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.settlement)">{{tr.settlement.service_role ? tr.settlement.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.settlement.auth_role)">{{tr.settlement.auth_role ? tr.settlement.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.settlement.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.settlement_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.settlement_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in record[index]" :key='log.index'>
                        <p>创建时间：{{log.settlement.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.settlement.operator_role}}</div>
                          <div>{{log.settlement.verifier_role ? log.settlement.verifier_role : '未审核'}}</div>
                          <div>{{log.settlement.approved_role ? log.settlement.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.settlement.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.settlement_supply.length !== 0">补充</div>
                        <div v-for="su in log.settlement_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 12">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                        <div class='item_title1'>{{tr.name}}【结算编号：{{tr.number}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.operator_role}}</div>
                          <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                          <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in record[index]" :key='log.index'>
                        <p>创建时间：{{log.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.operator_role}}</div>
                          <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                          <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 13">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                        <div class='item_title1'>{{tr.name}}支付编号【{{tr.number}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.operator_role}}</div>
                          <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                          <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in record[index]" :key='log.index'>
                        <p>创建时间：{{log.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.operator_role}}</div>
                          <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                          <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 14">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                        <div class='item_title1'>{{tr.name}}支付编号【{{tr.number}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.operator_role}}</div>
                          <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                          <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in record[index]" :key='log.index'>
                        <p>创建时间：{{log.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.operator_role}}</div>
                          <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                          <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <!-- 关联 -->
          <div class="retaled">
            <div class="card_title">
              <span>关联记账背书<i class="c_bg_down" @click='down2 = !down2' :style="down2 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'"></i></span>
            </div>
            <div class="related_tab">
              <ul>
                <li>关联1</li>
                <li>关联2</li>
                <li>关联3</li>
              </ul>
            </div>
            <div class="related_list" v-if="!down2">
              <div class="related_item" v-for="(title, index) in relatedTableList" :key='index' v-if="index <= 6">
                <div class="item_title">
                  <div class="title_symbol">
                    <div></div>
                  </div>
                  <span>{{title.name}}</span>
                </div>
                <div class="item_info" v-if="index <= 2">
                  <div class="item_card">
                    <div class="item_sec_title">参与角色</div>
                    <div class="item_table">
                      <div class="teble_title">
                        <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                      </div>
                      <div class="table_line" v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div>{{tr.operator_role}}</div>
                        <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                        <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                        <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                        <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                        <div>
                          <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item_card">
                    <div class="item_sec_title">编辑与修改</div>
                    <div class="item_table" v-for="(log, logIndex) in recordPay[index]" :key='logIndex'>
                      <p>创建时间：{{log.create_time}}</p>
                      <div class="teble_title">
                        <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                      </div>
                      <div class="table_line">
                        <div>{{log.operator}}</div>
                        <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                        <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                        <div class="td_loginfo">{{log.log}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item_info" v-if="index === 3">
                  <div class="item_card">
                    <div class="item_sec_title">参与角色</div>
                    <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                      <div class='item_title1'>{{tr.name}}【仓储合同编号：{{tr.number}}】</div>
                      <div class="teble_title" >
                        <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                      </div>
                      <div class="table_line">
                        <div>{{tr.operator_role}}</div>
                        <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                        <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                        <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                        <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                        <div>
                          <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item_card">
                    <div class="item_sec_title">编辑与修改</div>
                    <div class="item_table" v-for="log in record[index]" :key='log.index'>
                      <p>创建时间：{{log.create_time}}</p>
                      <div class="teble_title">
                        <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                      </div>
                      <div class="table_line">
                        <div>{{log.operator_role}}</div>
                        <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                        <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                        <div class="td_loginfo">{{log.log}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item_info" v-if="index === 4">
                  <div class="item_card">
                    <div class="item_sec_title">参与角色</div>
                    <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                      <div class='item_title1'>{{tr.name}}【运输合同编号：{{tr.number}}】</div>
                      <div class="teble_title" >
                        <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                      </div>
                      <div class="table_line">
                        <div>{{tr.operator_role}}</div>
                        <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                        <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                        <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                        <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                        <div>
                          <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item_card">
                    <div class="item_sec_title">编辑与修改</div>
                    <div class="item_table" v-for="log in record[index]" :key='log.index'>
                      <p>创建时间：{{log.create_time}}</p>
                      <div class="teble_title">
                        <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                      </div>
                      <div class="table_line">
                        <div>{{log.operator_role}}</div>
                        <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                        <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                        <div class="td_loginfo">{{log.log}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item_info" v-if="index === 6">
                  <div class="item_card">
                    <div class="item_sec_title">参与角色</div>
                    <div class="item_table"  v-for="(tr, trIndex) in record[index]" :key="trIndex">
                      <div class='item_title1'>融资计划</div>
                      <div class="teble_title" >
                        <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                      </div>
                      <div class="table_line">
                        <div>{{tr.financing_plan.operator_role}}</div>
                        <div>{{tr.financing_plan.verifier_role ? tr.financing_plan.verifier_role : '未审核'}}</div>
                        <div>{{tr.financing_plan.approved_role ? tr.financing_plan.approved_role : '未确认'}}</div>
                        <div @click="roleClick(tr.financing_plan)">{{tr.financing_plan.service_role ? tr.financing_plan.service_role : '九星'}}</div>
                        <div><span @click="Authentication(tr.financing_plan.auth_role)">{{tr.financing_plan.auth_role ? tr.financing_plan.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                        <div>
                          <span v-for="(v, i) in tr.financing_plan.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                        </div>
                      </div>
                      <div class='supply_title' v-if="tr.financing_plan_supply.length !== 0">补充</div>
                      <div v-for="(su, suIndex) in tr.financing_plan_supply" :key='suIndex' class="table_line">
                        <div>{{su.operator_role}}</div>
                        <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                        <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                        <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                        <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                        <div>
                          <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item_card">
                    <div class="item_sec_title">编辑与修改</div>
                    <div class="item_table" v-for="log in record[index]" :key='log.index'>
                      <div class="teble_title">
                        <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                      </div>
                      <div class="table_line">
                        <div>{{log.financing_plan.operator_role}}</div>
                        <div>{{log.financing_plan.verifier_role ? log.financing_plan.verifier_role : '未审核'}}</div>
                        <div>{{log.financing_plan.approved_role ? log.financing_plan.approved_role : '未确认'}}</div>
                        <div class="td_loginfo">{{log.financing_plan.log}}</div>
                      </div>
                      <div class='supply_title' v-if="log.financing_plan_supply.length !== 0">补充</div>
                      <div v-for="su in log.financing_plan_supply" :key='su.index' class="table_line">
                        <div>{{su.operator_role}}</div>
                        <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                        <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                        <div class="td_loginfo">{{su.log}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="related_item" v-for="(title, index) in titleList" :key="index" v-if="index > 6">
                <div class="item_title">
                  <div class="title_symbol">
                    <div></div>
                  </div>
                  <span>{{title.name}}</span>
                </div>
                <div class="item_info">
                  <div class="" v-if="index === 7">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div class='item_title1'>订单编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.order.operator_role}}</div>
                          <div>{{tr.order.verifier_role ? tr.order.verifier_role : '未审核'}}</div>
                          <div>{{tr.order.approved_role ? tr.order.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.order)">{{tr.order.service_role ? tr.order.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.order.auth_role)">{{tr.order.auth_role ? tr.order.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.order.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.order_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.order_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in recordPay[index]" :key='log.index'>
                        <p>创建时间：{{log.order.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.order.operator_role}}</div>
                          <div>{{log.order.verifier_role ? log.order.verifier_role : '未审核'}}</div>
                          <div>{{log.order.approved_role ? log.order.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.order.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.order_supply.length !== 0">补充</div>
                        <div v-for="su in log.order_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 8">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div class='item_title1'>仓单编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.warehouse.operator_role}}</div>
                          <div>{{tr.warehouse.verifier_role ? tr.warehouse.verifier_role : '未审核'}}</div>
                          <div>{{tr.warehouse.approved_role ? tr.warehouse.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.warehouse)">{{tr.warehouse.service_role ? tr.warehouse.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.warehouse.auth_role)">{{tr.warehouse.auth_role ? tr.warehouse.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.warehouse.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.warehouse_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.warehouse_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in recordPay[index]" :key='log.index'>
                        <p>创建时间：{{log.warehouse.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.warehouse.operator_role}}</div>
                          <div>{{log.warehouse.verifier_role ? log.warehouse.verifier_role : '未审核'}}</div>
                          <div>{{log.warehouse.approved_role ? log.warehouse.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.warehouse.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.warehouse_supply.length !== 0">补充</div>
                        <div v-for="su in log.warehouse_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 9">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div class='item_title1'>运单编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.transport.operator_role}}</div>
                          <div>{{tr.transport.verifier_role ? tr.transport.verifier_role : '未审核'}}</div>
                          <div>{{tr.transport.approved_role ? tr.transport.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.transport)">{{tr.transport.service_role ? tr.transport.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.transport.auth_role)">{{tr.transport.auth_role ? tr.transport.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.transport.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.transport_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.transport_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in recordPay[index]" :key='log.index'>
                        <p>创建时间：{{log.transport.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.transport.operator_role}}</div>
                          <div>{{log.transport.verifier_role ? log.transport.verifier_role : '未审核'}}</div>
                          <div>{{log.transport.approved_role ? log.transport.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.transport.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.transport_supply.length !== 0">补充</div>
                        <div v-for="su in log.transport_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 10">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div class='item_title1'>运单编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.acceptance.operator_role}}</div>
                          <div>{{tr.acceptance.verifier_role ? tr.acceptance.verifier_role : '未审核'}}</div>
                          <div>{{tr.acceptance.approved_role ? tr.acceptance.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.acceptance)">{{tr.acceptance.service_role ? tr.acceptance.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.acceptance.auth_role)">{{tr.acceptance.auth_role ? tr.acceptance.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.acceptance.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.acceptance_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.acceptance_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in recordPay[index]" :key='log.index'>
                        <p>创建时间：{{log.acceptance.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.acceptance.operator_role}}</div>
                          <div>{{log.acceptance.verifier_role ? log.acceptance.verifier_role : '未审核'}}</div>
                          <div>{{log.acceptance.approved_role ? log.acceptance.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.acceptance.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.acceptance_supply.length !== 0">补充</div>
                        <div v-for="su in log.acceptance_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 11">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div class='item_title1'>结算编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.settlement.operator_role}}</div>
                          <div>{{tr.settlement.verifier_role ? tr.settlement.verifier_role : '未审核'}}</div>
                          <div>{{tr.settlement.approved_role ? tr.settlement.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr.settlement)">{{tr.settlement.service_role ? tr.settlement.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.settlement.auth_role)">{{tr.settlement.auth_role ? tr.settlement.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.settlement.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                        <div class='supply_title' v-if="tr.settlement_supply.length !== 0">补充</div>
                        <div v-for="(su, suIndex) in tr.settlement_supply" :key='suIndex' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div @click="roleClick(su)">{{su.service_role ? su.service_role : '九星'}}</div>
                          <div><span @click="Authentication(su.auth_role)">{{su.auth_role ? su.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in su.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title"><span>编辑与修改</span></div>
                      <div class="item_table" v-for="log in recordPay[index]" :key='log.index'>
                        <p>创建时间：{{log.settlement.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.settlement.operator_role}}</div>
                          <div>{{log.settlement.verifier_role ? log.settlement.verifier_role : '未审核'}}</div>
                          <div>{{log.settlement.approved_role ? log.settlement.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.settlement.log}}</div>
                        </div>
                        <div class='supply_title' v-if="log.settlement_supply.length !== 0">补充</div>
                        <div v-for="su in log.settlement_supply" :key='su.index' class="table_line">
                          <div>{{su.operator_role}}</div>
                          <div>{{su.verifier_role ? su.verifier_role : '未审核'}}</div>
                          <div>{{su.approved_role ? su.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{su.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 12">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div class='item_title1'>结算编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.operator_role}}</div>
                          <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                          <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in recordPay[index]" :key='log.index'>
                        <p>创建时间：{{log.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.operator_role}}</div>
                          <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                          <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 13">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div class='item_title1'>支付编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.operator_role}}</div>
                          <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                          <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in recordPay[index]" :key='log.index'>
                        <p>创建时间：{{log.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.operator_role}}</div>
                          <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                          <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.log}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" v-if="index === 14">
                    <div class="item_card">
                      <div class="item_sec_title">参与角色</div>
                      <div class="item_table"  v-for="(tr, trIndex) in recordPay[index]" :key="trIndex">
                        <div class='item_title1'>支付编号【{{tr.name}}】</div>
                        <div class="teble_title" >
                          <div v-for='(title, ind) in roleList' :key='ind'>{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{tr.operator_role}}</div>
                          <div>{{tr.verifier_role ? tr.verifier_role : '未审核'}}</div>
                          <div>{{tr.approved_role ? tr.approved_role : '未确认'}}</div>
                          <div @click="roleClick(tr)">{{tr.service_role ? tr.service_role : '九星'}}</div>
                          <div><span @click="Authentication(tr.auth_role)">{{tr.auth_role ? tr.auth_role : '无认证方'}}</span><span style="color: #ccc;">，CFCA</span></div>
                          <div>
                            <span v-for="(v, i) in tr.contact_person" :key="i" @click="roleClicks(v, i)">{{v.contact_person__name + '，' || ''}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item_card">
                      <div class="item_sec_title">编辑与修改</div>
                      <div class="item_table" v-for="log in recordPay[index]" :key='log.index'>
                        <p>创建时间：{{log.create_time}}</p>
                        <div class="teble_title">
                          <div v-for='(title, ind) in logList' :key='ind' class="log_title">{{title}}</div>
                        </div>
                        <div class="table_line">
                          <div>{{log.operator_role}}</div>
                          <div>{{log.verifier_role ? log.verifier_role : '未审核'}}</div>
                          <div>{{log.approved_role ? log.approved_role : '未确认'}}</div>
                          <div class="td_loginfo">{{log.log}}</div>
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
      <div v-if="selIndex === 2" class="echarts_list" style="background: #fff;">
        <button @click="dataModel">数据模型</button>
        <button @click="timeModel">时间模型</button>
        <data-analyse v-if="dataTime === 0" :bigData="bigData" :type="0"></data-analyse>
        <time-model v-if="dataTime === 1"></time-model>
      </div>
      <div v-if="selIndex === 3" class="chain_list c_tab_3">
        <div class="card_title">
          <span>销售合同登记<i class="c_bg_down" :style="down1 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'" @click='down1 = !down1' ></i></span>
        </div>
        <div class="chain">
          <div class="card_list" v-if="!down1">
            <div class="card_item" v-for="(title, index) in titleList" :key="index" v-if="index <= 6">
              <div class="item_title">
                <div class="title_symbol">
                  <div></div>
                </div>
                <span>{{title.name}}</span>
              </div>
              <div class="item_info" v-if="index <= 4">
                <div class="item_card">
                  <div class="item_table" v-for="(file, fileIndex) in files[index]" :key='fileIndex' v-if='file.length !== 0'>
                    <span style="font-size: 14px; line-height: 36px">{{file.is_supply ? file.is_supply : file.content_obj_name}}</span>
                    <div class="teble_title">
                      <div v-for='(title, ind) in fileList' :key='ind'>{{title}}</div>
                    </div>
                    <div class="table_line" v-for='(tr, tLine) in file' :key='tLine'>
                      <div>{{tr.name}}</div>
                      <div>pdf</div>
                      <div>{{tr.update_time}}</div>
                      <div>{{tr.is_supply ? tr.dj_name : tr.content_obj_name}}</div>
                      <div><a :href="$root_url() + tr.location" target="blank">查看</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_list" v-if="!down1">
            <div class="card_item" v-for="(title, index) in titleList" :key="index" v-if="index> 6">
              <div class="item_title">
                <div class="title_symbol">
                  <div></div>
                </div>
                <span>{{title.name}}</span>
              </div>
              <div class="item_info">
                <div class="item_card">
                  <div class="item_table" v-for="(file, fileIndex) in files[index]" :key='fileIndex' v-if='file.length !== 0'>
                    <div class="teble_title">
                      <div v-for='(title, ind) in fileList' :key='ind' class="file_title">{{title}}</div>
                    </div>
                    <div class="table_line" v-for='(tr, rIndex) in file' :key='rIndex'>
                      <div>{{tr.name}}</div>
                      <div>pdf</div>
                      <div>{{tr.update_time}}</div>
                      <div>{{tr.is_supply ? tr.dj_name : tr.content_obj_name}}</div>
                      <div><a :href="$root_url() + tr.location" target="blank">查看</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 关联 -->
          <div class="retaled">
            <div class="card_title">
              <span>关联记账背书<i class="c_bg_down" :style="down2 ? 'transform:rotateZ(180deg);' : 'transform:rotateZ(0);'" @click='down2 = !down2'></i></span>
            </div>
            <div class="related_tab">
              <ul>
                <li>关联1</li>
                <li>关联2</li>
                <li>关联3</li>
              </ul>
            </div>
            <div class="related_list" v-if="!down2">
              <div class="related_item" v-for="(title, index) in titleList" :key='index'>
                <div class="item_title">
                  <div class="title_symbol">
                    <div></div>
                  </div>
                  <span>{{title.name}}</span>
                </div>
                <div class="item_info">
                  <div class="item_card">
                    <div class="item_table" v-for="(file, fileIndex) in pFIles[index]" :key='fileIndex' v-if='file.length !== 0'>
                      <div class="teble_title">
                        <div v-for='(title, ind) in fileList' :key='ind' class="file_title">{{title}}</div>
                      </div>
                      <div class="table_line" v-for='(tr, rIndex) in file' :key='rIndex'>
                        <div>{{tr.name}}</div>
                        <div>pdf</div>
                        <div>{{tr.update_time}}</div>
                        <div>{{tr.is_supply ? tr.is_supply : tr.content_obj_name}}</div>
                        <div><a :href="$root_url() + tr.location" target="blank">查看</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selIndex === 4" class="chain_list">
        
      </div>
    </div>
    <el-dialog :visible.sync="innerVisible" width="50%" title="经办人" :before-close="handleClose">
      <div class="role_person">
        <ul class="l_person_list">
          <li>
            <p>姓名</p>
            <input type="text" v-model="personData.name" maxlength="32">
          </li>
          <li>
            <p>角色</p>
            <input type="text" v-model="personData.role" maxlength="32">
          </li>
          <li>
            <p>所属公司</p>
            <input type="text" v-model="personData.company" maxlength="64">
          </li>
          <li>
            <p>身份证号</p>
            <input type="text" v-model="personData.id_number" maxlength="18">
          </li>
          <li>
            <p>办公室电话</p>
            <input type="text" v-model="personData.office_number" maxlength="15">
          </li>
        </ul>
        <ul class="l_person_list">
          <li>
            <p>微信号码</p>
            <input type="text" v-model="personData.wechat" maxlength="25">
          </li>
          <li>
            <p>邮箱</p>
            <input type="text" v-model="personData.email" maxlength="64">
          </li>
          <li>
            <p>QQ</p>
            <input type="text" v-model="personData.QQ" maxlength="64">
          </li>
          <li>
            <p>企业ID</p>
            <input type="text" v-model="personData.business" maxlength="32">
          </li>
          <li>
            <p>手机号码</p>
            <input type="text" v-model="personData.phone_num" maxlength="11">
          </li>
        </ul>
      </div>
      <div class="role_person_install">
        <button @click="onPersonSon">关闭</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import appNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
// import dataAnalyse from '@/components/chain_app/bigDataAnalyse'
// import chainNavLine from '../base/public/ChainCursorReceLine'
// import timeModel from '@/components/chain_app/timeModel'
import Contract from './confirm_contract'
import Order from './confirm_order'
import Settlement from './confirm_settlement'
import SettlementContract from './confirm_settlement_contract'
import 'vue-happy-scroll/docs/happy-scroll.css'
export default {
  name: 'chain_line',
  components: {
    // appNav, 
    Location, Contract, Order, Settlement, SettlementContract
  },
  data () {
    return {
      isSure: false,
      showNav: false,
      innerVisible: false,
      personData: {
        name: '',
        role: '',
        company: '',
        id_number: '',
        office_number: '',
        wechat: '',
        email: '',
        QQ: '',
        business: '',
        phone_num: ''
      },
      sure: {},
      activeName: '1',
      checkName: '',
      dialogVisible: false,
      loginState: ['未注册', '待审核', '待审核', '未通过', '已通过'],
      father: {
        selIndex: 1
      },
      navList: [
        {name: '链式记账', path: '/chainview_new/list'},
        {name: '参与角色与记录', path: '/chain/role'},
        {name: '大数据资产与分析', path: '/chainview_new/chart'},
        {name: '单证与票据原件', path: '/chainview_new/file'},
        {name: '补充', path: '/chainview_new/info'}
      ],
      roleList: ['操作方', '审核方', '确认方', '服务方', '认证方', '经办人'],
      logList: ['操作方', '审核方', '确认方', '内容'],
      titleList: [
        {name: 'B2B销售合同', operate: '+ 添加B2B销售合同', url: '/receivableContractCreate'},
        {name: 'B2B应收订金', operate: '+ 添加B2B应收订金', url: '/receivableDepositCreate'},
        {name: 'B2B销售订单计划', operate: '+ 添加B2B销售订单计划', url: '/receivablePlanCreate'},
        {name: '仓储合同', operate: '+ 添加仓储合同', url: '/warehousingContract1'},
        {name: '运输合同', operate: '+ 添加运输合同', url: '/logisticsContract1'},
        {name: '参与角色登记', operate: '+ 添加参与角色', url: '/roleRegistration'},
        {name: '融资计划', operate: '+ 添加融资计划', url: '/financingPlan1'},
        {name: 'B2B电子订单', operate: '+ 添加B2B电子订单', url: '/orderList1'},
        {name: 'B2B电子出货单', operate: '+ 添加B2B电子出货单', url: '/waybillList1'},
        {name: 'B2B电子运单', operate: '+ 添加B2B电子运单', url: '/receipt1'},
        {name: 'B2B验收入库单', operate: '+ 添加B2B验收入库单', url: '/WarehouseReceiptList1'},
        {name: 'B2B订单结算', operate: '+ 添加B2B订单结算', url: '/settlement1'},
        {name: 'B2B发票', operate: '+ 添加B2B发票', url: '/invoice1'},
        {name: 'B2B支付', operate: '+ 添加B2B支付', url: '/payment1'},
        {name: 'B2B合同结算', operate: '+ 添加B2B合同结算', url: '/contractSettlement1'}
      ],
      relatedTableList: [
        {name: 'B2B采购合同', operate: '+ 添加B2B采购合同', url: '/receivableContractCreate'},
        {name: 'B2B应付订金', operate: '+ 添加B2B应付订金', url: '/receivableDepositCreate'},
        {name: 'B2B采购订单计划', operate: '+ 添加B2B采购订单计划', url: '/receivablePlanCreate'},
        {name: '仓储合同', operate: '+ 添加仓储合同', url: '/warehousingContract1'},
        {name: '运输合同', operate: '+ 添加运输合同', url: '/logisticsContract1'},
        {name: '参与角色登记', operate: '+ 添加参与角色', url: '/roleRegistration'},
        {name: '融资计划', operate: '+ 添加融资计划', url: '/financingPlan1'},
        {name: 'B2B电子订单', operate: '+ 添加B2B电子订单', url: '/orderList1'},
        {name: 'B2B电子出货单', operate: '+ 添加B2B电子出货单', url: '/waybillList1'},
        {name: 'B2B电子运单', operate: '+ 添加B2B电子运单', url: '/receipt1'},
        {name: 'B2B验收入库单', operate: '+ 添加B2B验收入库单', url: '/WarehouseReceiptList1'},
        {name: 'B2B结算', operate: '+ 添加B2B结算', url: '/settlement1'},
        {name: 'B2B发票', operate: '+ 添加B2B发票', url: '/invoice1'},
        {name: 'B2B支付', operate: '+ 添加B2B支付', url: '/payment1'},
        {name: 'B2B合同结算', operate: '+ 添加B2B合同结算', url: '/contractSettlement1'}
      ],
      fileList: ['文件名称', '文件类型', '上传时间', '单据/补充名称', '操作'],
      supplementTitle: ['操作人', '审核人', '关联人', '审核时间', '内容'],
      selIndex: 0,
      down1: false,
      down2: false,
      down3: false,
      logs: [],
      files: [],
      supplements: [],
      pSupplements: [],
      pFIles: [],
      record: [],
      recordPay: [],
      bigData: {
        receive_contract_data: '',
        payable_contract_data: '',
        receive_info: '',
        payable_info: '',
        business: ''
      },
      bot_border: {
        border_l: '',
        border_r: ''
      },
      dataTime: 0,
      // 时间模型
      docTimeData: {},
      chainIdList: '',
      // 顶部定位条
      element: false,
      elementScorllTop: '',
      userTypeArr: ['institution', 'serviceprovider', 'person', 'institutionperson', 'serviceperson'],
      contractIds: {
        receive: '',
        payment: ''
      },
      orderIds: {
        receive: '',
        payment: ''
      },
      ticket: {
        bank_ticket: {},
        business_ticket: {},
        digital_ticket: {}
      },
      bar: {
        red_bar: {},
        yellow_bar: {},
        white_bar: {}
      }
    }
  },
  methods: {
    getTickets (id) {
      this.$ajax.get(`/api/chain/${id}/ticket/`).then(res => {
        this.ticket = res.data
        console.log(res.data)
      })
    },
    getBars (id) {
      this.$ajax.get(`/api/chain/${id}/bar/`).then(res => {
        this.bar = res.data
        console.log(res.data)
      })
    },
    // 认证方跳转
    Authentication (item) {
      if (item === '天威诚信') {
        window.open('http://itrus.com.cn/', '_blank')
      }
    },
    // 服务方跳转
    roleClick (item) {
      var that = this
      if (item.service_role === null) {
        if (item.service_role_id !== null && item.service_role_id !== undefined) {
          that.$router.push({
            path: '/enterpriseBlog',
            query: {
              bid: item.service_role_id,
              sid: that.chainId,
              bank: 2
            }
          })
        }
      } else if (item.service_role !== null) {
        if (item.service_role_id !== null && item.service_role_id !== undefined) {
          that.$router.push({
            path: '/serviceBlog',
            query: {
              bid: item.service_role_id,
              sid: that.chainId,
              bank: 2
            }
          })
        }
      }
    },
    roleClicks (item, index) {
      var that = this
      that.$ajax.post('/api/get_person_info/', {token: that.$token(), person_type: 'contact_person', contact_person_id: item.contact_person_id}).then(res => {
        if (res.data.code === '1') {
          that.innerVisible = true
          that.personData = res.data.data
        }
      })
    },
    onPersonSon () {
      var that = this
      that.innerVisible = false
    },
    // 取消
    handleClose () {
      var that = this
      that.innerVisible = false
    },
    // 数据模型
    dataModel () {
      var that = this
      that.dataTime = 0
      that.$ajax.get('/api/chain/get_DA/?token=' + that.$token() + '&chain_id=' + that.chainId).then(res => {
        if (res.data.code === '1') {
          that.bigData.receive_contract_data = res.data.receive_contract_data[0]
          that.bigData.payable_contract_data = res.data.payable_contract_data
          that.bigData.receive_info = res.data.receive_info
          that.bigData.payable_info = res.data.payable_info
          that.bigData.business = res.data.business
          that.bot_border.border_l = 'border-bottom: 2px dashed #eaeaea;'
          that.bot_border.border_r = 'border-bottom: 2px dashed #ea6100;'
        }
      })
    },
    // 时间模型
    timeModel () {
      var that = this
      that.dataTime = 1
    },
    changeTab: function ($event, index) {
      if (index > 0) {
        this.$message.info('即将上线，敬请期待')
      }
      this.down1 = this.down2 = this.down3 = false
    },
    check: function ($event, index, obj, el, checkType, cType) {
      if (!obj.verifier) {
        this.dialogVisible = true
        this.checkName = obj.name
        this.sure = {
          obj, index, el, checkType, cType
        }
      }
    },
    handleScroll: function () {
      var that = this
      that.elementScorllTop = document.documentElement.scrollTop || document.body.scrollTop
      that.element = (that.elementScorllTop > 75 && that.selIndex === 0) ? true : false
      that.data_nav.topFlag = that.elementScorllTop > 75 ? 'top' : 'middle'
    },
    checkNavState: function (e) {
      this.data_nav.showInfoState = e.showInfoState
      this.data_nav.flag = e.flag
      this.data_nav.dataListS = e.dataList
      this.data_nav.titleListS = e.titleList
      this.data_nav.twinkle = e.twinkle
    },
    toAnchorPlace: function (e) {
      this.data_nav.setIndex = e
    },
    handleChild: function (e) {
      e.type === `1` ? this.contractIds.receive = e.id : this.contractIds.payment = e.id
    },
    updataOrderId: function (e) {
      e.type === `1` ? this.orderIds.receive = e.id : this.orderIds.payment = e.id
    }
  },
  beforeCreate: function () {
    var that = this
    console.log(that.$route)
    if (that.$route.query.id) {
      that.chainId = that.$route.query.id
    }
    that.location = [
      {title: '链式记账', url: '/chain_app/chain_main?type=0'},
      {title: '总览'}
    ]
    that.data_nav = {
      showInfoState: true,
      dataListS: '',
      titleListS: '',
      twinkle: '',
      flag: 0,
      topFlag: 'middle',
      setIndex: 0,
      update: false
    }
    if (that.$route.query.id) {
      that.chainId = that.$route.query.id.toString()
    }
    this.userType = localStorage.role
  },
  mounted: function () {
    var that = this
    window.addEventListener('scroll', this.handleScroll)
    window.onscroll = function () {
      that.handleScroll()
    }
    that.getTickets(that.chainId)
    that.getBars(that.chainId)
  }
}
</script>

<style lang="less">
@theme_orange: #eb6100;
@theme_blue: #0c8dff;;
.chain-flex {
  display: flex;
  align-items: center;
  margin-right: 20px;
  position: relative;
  .chain-flex__icon {
    margin-right: 12px;
    cursor: pointer;
    width: 18px;
  }
  &.chain-flex__icon_problom::before {
    content: "";
    position: absolute;
    background: url('../../../../static/img/chain/hasWarning4.png') no-repeat;
    height: 14px;
    width: 20px;
    margin-left: 11px;
    margin-top: -10px;
    background-size: 60%;
  }
  .chain-flex__icon_warning {
    background: #fff;
    animation: twinkle1 .8s ease-in-out 0s infinite;
    -moz-animation: twinkle1 .8s ease-in-out 0s infinite;
    -webkit-animation: twinkle1 .8s ease-in-out 0s infinite;
    //  margin-bottom: 6px
  }
  &>.twinkle {
    width: 22px;
    bottom: 6px;
    position: absolute;
    animation: twinkle .8s ease-in-out 0s infinite;
    -moz-animation: twinkle .8s ease-in-out 0s infinite;
    -webkit-animation: twinkle .8s ease-in-out 0s infinite;
  }
  @keyframes twinkle
  {
    0%{
      opacity: 0;
      // filter: brightness(1)
    }
    100%{
      opacity: 1;
      // filter: brightness(150%)
    }
  }
  @-webkit-keyframes twinkle
  {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes twinkle1
  {
    0%{
      opacity: 0;
      transform: scale(.8)
      // filter: brightness(1)
    }
    100%{
      opacity: 1;
      transform: scale(1);
      // filter: brightness(150%)
    }
  }
  @-webkit-keyframes twinkle1
  {
    0%{
      opacity: 0;
      transform: scale(.8)
      // filter: brightness(1)
    }
    100%{
      opacity: 1;
      transform: scale(1);
      // filter: brightness(150%)
    }
  }
  &.title_b {
    min-width: 170px;
    max-width: 290px;
    .span_title {
      color: #0c8dff;
      margin-right: 8px; 
    }
  }
  &.title_o {
    min-width: 170px;
    max-width: 290px;
    .span_title {
      color: #eb6100;
      margin-right: 8px; 
    }
  }
}
.chain-box {
  .chain-btn-confirm {
    display: flex;
    justify-content: center;
    div {
      width: 120px;
      height: 36px;
      line-height: 36px;  
      text-align: center;
      border-radius: 4px;
      font-size: 14px; 
      cursor: pointer;
      border: 1px solid #eb6100;
      background: #eb6100;
      color: #ffffff;
      margin: 40px 30px;
      &.disabled {
        background: #f5f7fa;
        color: #c0c4cc;
        border-color: #c0c4cc;
        pointer-events: none
      }
    }
  }
  .chain-box__item {
    margin: 0 20px;
    .chain-box__item__title {
      width: 100%;
      line-height: 60px; 
      text-align: center;
      border-bottom: 3px solid #666666;
      margin: 0 auto;
      position: relative;
      img {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -22px
      }
      span {
        font-weight: bolder;
        font-size: 18px;
        color: #333;
      }
    }
    &:nth-of-type(2)>.chain-box__item__title {
      border-left: 1px dashed #979797;
    }
    .chain-box__item__content {
      .chain-box__item__title {
        border-left: 1px dashed #979797;
      }
    }
  }
  .modal-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2018;
    background-color: rgba(0, 0, 0, .3); 
    &>.modal {
      margin: 0 auto;
      width: 1080px;
      margin-top: 200px;
      padding: 20px;
      background: #e4e4e4;
      border: 1px solid #e1e6f0;
      border-radius: 6px; 
      .modal__box {
        .modal-title {   
          color: #333;
          background: #e4e4e4;
          padding: 10px;
          span {
            font-size: 18px;
            font-weight: bolder;
          }
        }
        .modal-body {
          border-radius: 8px;
          border: 1px solid #e4e4e4;
          padding: 10px;
          background: #fff; 
          .modal-menu {
            border: 1px dashed #e4e4e4;
            .modal-menu__title {
              margin: 5px 0px;
            }
            .modal-menu__item {
              display: flex;
              .item_span {
                font-size: 14px;
                color: #eb6100;
                margin: 0 15px; 
              }
              .modal-form {
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}
.chain-container {
  margin: 0 auto;
  min-height: 100%;
  border-left: 1px dashed #979797;
  &.border_hide {
    border-left: none;
  }
  &>.first_view.border_show {
    border-left: 1px dashed #979797;
  }
}
.second_view {
  margin-left: 36px;
  .second_chain {
    border-left: 1px dashed #c5c5c5;
    &.extend_border {
      border-left: 1px dashed #979797;
    }
  }
}
.chain-intro {
  color:#ffffff;
  .chain-intro__title {
    font-size:14px;
    padding: 3px 0;
  }
  .chain-intro__content {
    padding: 0 5px;
    margin-top: 5px;
    font-size: 12px;
    .chain-intro__content__line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &>p { 
        display: flex;
        margin: 5px 0;
        justify-content: space-between;
        min-width: 115px;
        span:first-child {
          margin-right: 15px;
        }
      }
    }
  }
}
.chain_title {
  .placeholder {
    width: 40px;
    height: 29px;
    background: #f5f7f8;
    position: absolute;
    border-left: 1px dashed #979797;
    border-bottom: 1px dashed #979797;
    left: -37px;
  }
  line-height: 60px;
  position: relative;
  padding: 0 20px;
  span {
    font-weight: bolder;
  }
  .symbol_large_orange {
    background: url('../../../../static/img/chain/chain_circle_l_y.png');
    position: absolute;
    top: 15px;
    left: -15px;
    width: 30px;
    height: 30px;
  }
  .symbol_middle_orange {
    background: url('../../../../static/img/chain/chain_circle_m_y.png');
    position: absolute;
    top: 20px;
    left: -11px;
    width: 21px;
    height: 21px;
  }
  .symbol_large_blue {
    background: url('../../../../static/img/chain/chain_circle_l_b.png');
    position: absolute;
    top: 15px;
    left: -15px;
    width: 30px;
    height: 30px;
  }
  .symbol_middle_blue {
    background: url('../../../../static/img/chain/chain_circle_m_b.png');
    position: absolute;
    top: 20px;
    left: -11px;
    width: 21px;
    height: 21px;
  }
}
.tab-menu-group {
  width: calc(100% - 100px);
  margin-left: 36px;
  padding: 0 4px;
  border-bottom: 0;
  height: 60px;
  display: flex;
  align-items: center;
  .section_title {
    white-space: nowrap;
    user-select: none;
    .tab-menu {
      list-style: none;
      white-space: nowrap;
      overflow: hidden;
      padding-left: 1px;
      margin-top: 22px;
      margin-bottom: 0;
      background: #fff;
      word-spacing: -4px;
      .tab-menu__item {
        display: inline-block;
        line-height: 37px;
        border: 1px solid #e1e6f0;
        border-bottom: 0;
        color: #999;
        text-align: center;
        font-size: 14px;
        padding: 0 23px;
        margin-left: -1px;
        border-radius: 2px 2px 0 0;
        user-select: none;
        cursor: pointer;
        &:first-child:not(:last-child) {
          border-top-right-radius: 0;
        }
        &:last-child:not(:first-child) {
          border-top-left-radius: 0;
        }
        &:not(:first-child):not(:last-child) {
          border-radius: 0;
        }
        &.tab-menu__item_active_o {
          background: #eb6100;
          color: #fff;
          border-color: #eb6100;
        }
        &.tab-menu__item_active_o1 {
          background: #f48537;
          color: #fff;
          border-color: #f48537;
        }
        &.tab-menu__item_active_b {
          background: #0c8dff;
          color: #fff;
          border-color: #0c8dff;
        }
        &.tab-menu__item_active_b1 {
          background: #53aefe;
          color: #fff;
          border-color: #53aefe;
        }
        &.tab-menu__item_add_o {
          .tab-menu__item__icon {
            height: 12px;
            width: 12px;
            display: inline-block;
            margin-right: 6px;
            background: url('../../../../static/img/chain/plus.png');
          }
        }
        &.tab-menu__item_add_o:hover {
          color: #f48537;
          border-color: #f48537;
          .tab-menu__item__icon {
            background: url('../../../../static/img/chain/plus_y.png');
          }
        }
        &.tab-menu__item_add_o_warning {
          .tab-menu__item__icon {
            background: url('../../../../static/img/chain/plus_y.png');
          }
          animation: addWarning1 1s cubic-bezier(.645,.045,.355,1) infinite;
          @-webkit-keyframes addWarning1 {
            0% {
              color: #999;
              border-color: #e1e6f0; 
            }
            100% {
              color: #ff0000;
              border-color: #ff0000;
              // box-shadow: 0 0 2px 1px #eb6100
            }
          }
          @keyframes addWarning1 {
            0% {
              color: #999;
              border-color: #e1e6f0;
            }
            100% {
              color: #ff0000;
              border-color: #ff0000;
              // box-shadow: 0 0 2px 1px #eb6100
            }
          }
        }
        &.tab-menu__item_add_b {
          .tab-menu__item__icon {
            height: 12px;
            width: 12px;
            display: inline-block;
            margin-right: 6px;
            background: url('../../../../static/img/chain/plus.png');
          }
        }
        &.tab-menu__item_add_b:hover {
          color: #53aefe;
          border-color: #53aefe;
          .tab-menu__item__icon {
            background: url('../../../../static/img/chain/plus_b.png');
          }
        }
        &.tab-menu__item_add_b_warning {
          &>.tab-menu__item__icon {
            background: url('../../../../static/img/chain/plus_b.png');
          }
          animation: addWarning2 1s cubic-bezier(.645,.045,.355,1) infinite;
          @-webkit-keyframes addWarning2 {
            0% {
              color: #999;
              border-color: #e1e6f0; 
            }
            100% {
              color: #0c8dff;
              border-color: #0c8dff;
              // box-shadow: 0 0 2px 1px #eb6100
            }
          }
          @keyframes addWarning2 {
            0% {
              color: #999;
              border-color: #e1e6f0;
            }
            100% {
              color: #0c8dff;
              border-color: #0c8dff;
              // box-shadow: 0 0 2px 1px #eb6100
            }
          }
        }
      } 
    }
  }
}
.show_chain_table {
  border: 1px solid #e1e6f0;
  border-left: none;
  background: #fff;
  .chain_table_line {
    padding: 0 30px;
    .show_line {
      min-height: 44px;
      display: flex;
      border-bottom: 1px dashed #e1e6f0;
      align-items: center;
      user-select: none;
      &.hide-line {
        border-bottom: none
      }
      .show_line_title {
        width: 10%;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: bolder;
      }
      .show_line_detail {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 78%;
        font-size: 14px;
        div.is_null {
          color: #999;
        }
        div.default {
          span {
            color: #999;
          }
        }
        div.default:last-child {
          margin-left: 25px
        }
        div.theme_orange {
          margin-right: 25px;
          font-size: 14px;
          line-height: 40px;
          span {
            cursor: pointer;
            color: @theme_orange;
            &.linker {
              text-decoration: underline;
            }
          }
          &>span:last-child {
            color: @theme_orange;
          }
          .flag {
            width: 20px;
            height: 20px;
            margin-left: 5px;
          }
        }
        div.theme_blue {
          margin-right: 25px;
          font-size: 14px;
          line-height: 40px;
          span {
            cursor: pointer;
            color: @theme_blue;
            &.linker {
              text-decoration: underline;
            }
          }
          &>span:last-child {
            color: @theme_blue;
            margin-left: 6px;
          }
          .flag {
            width: 20px;
            height: 20px;
            margin-left: 5px;
          }
        }
        div.text-warning {
          &>label {
            // background:#871317  -webkit-linear-gradient(left,#c70000,#febaf7 50%,#ff0 90%,#561214) no-repeat 0 0;
            background:#871317;
            background-size:20% 100%; 
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            // font-weight: bold;
            // -webkit-animation: textShine 2s linear infinite;
            // animation: textShine 2s linear infinite;
            &>span {
              strong {
                font-size: 18px;
                -webkit-text-fill-color: #ff0000;
              }
            }
          }
          @-webkit-keyframes textShine {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 100% 100%;
              }
            }
            @keyframes textShine {
              0% {background-position: 0 0; }
              100% {background-position: 100% 100%; }
          }
        }
      }
      .show_line_operate {
        width: 10%;
        display: flex;
        align-items: center;
        line-height: 30px;
        padding: 0 10px;
        font-size: 14px;
        color: #999;
        border-radius:2px;
        border:1px solid #e1e6f0;
        cursor: pointer;
        padding-right: 10px;
        min-width: 160px;
        span {
          height: 12px;
          width: 12px;
          display: inline-block;
          margin-left: 3px;
          margin-right: 12px;
          background: url('../../../../static/img/chain/plus.png');
        }
        &.theme_orange:hover {
          border: 1px solid @theme_orange;
          color: @theme_orange;
          &>span {
            background: url('../../../../static/img/chain/plus_y.png');
          }
        }
        &.theme_blue:hover {
          border: 1px solid @theme_blue;
          color: @theme_blue;
          &>span {
            background: url('../../../../static/img/chain/plus_b.png');
          }
        }
      }
    }
  }
  .chain_table_line:last-of-type {
    .show_line:last-of-type {
      border: none;
    }
  }
}
</style>

<style scoped lang="less">
.role_person {
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  .l_person_list {
    flex: 1;
    li {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      p {
        padding-right: 15px;
        font-size: 14px;
        width: 100px;
      }
      input {
        height: 32px;
        width: 220px;
        border-radius: 5px;
        padding: 0 15px;
        outline: none;
        border: 1px solid #ccc;
      }
    }
  }
}
.role_person_install {
  margin-top: 30px;
  text-align: center;
  button {
    margin: 0 30px;
    width: 100px;
    height: 32px;
    line-height: 32px;
    border: none;
    outline: none;
    background: #eb6100;
    border-radius: 5px;
    color: #fff;
  }
}
.view_chain {
  background: #fafafa;
  display: flex;
  //padding-top: 70px;
  min-height: 100%;
  margin: 0 auto;
  .c_slide_container:hover+.chain_nav_top, .c_slide_container:hover+.line_detail{
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .chain_nav_top {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    .topLocation {
      padding-left: 50px;
      img {
        width: 22px;
        vertical-align: middle;
      }
    }
    .nav_title {
      position: relative;
      width: 80%;
      line-height: 32px;
      text-align: center;
      color: #666666;
      margin: 0 auto;
      border: 1px solid #cccccc;
      border-radius: 8px;
      p>span {
        margin: 0 50px;
        font-weight: 700;
        font-size: 14px;
      }
    }
    position: fixed;
    top: 70px;
    // width: 100%;
    right: 0;
    // height: 230px;
    height: 60px;
    background: #fff;
    z-index: 1006;
    border-bottom: 1px solid #eaeaea;
    -moz-box-shadow:1px 4px 5px #EAEAEA;
    -webkit-box-shadow:1px 4px 5px #EAEAEA;
    box-shadow:1px 4px 5px #EAEAEA;
  }
  .c_empty_accessory{
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    color: #999;
    text-align: center;
    border-top: 1px dashed #ccc;
    margin: 0 50px;
  }
  .gray{
    color:#666666;
  }
  .show_title {
    line-height: 80px;
    i {
      color: #333333;
      margin-right: 10px;
      font-size: 20px;;
    }
    .c_jump {
      color: #343536;
      text-decoration: none;
    }
  }
  .c_order_info {
    background: #fff;
    position: relative;
    padding-top: 20px;
    .c_order_info_inner {
      border: 1px solid #cccccc;
      width: 80%;
      line-height: 32px;
      margin: 0 auto;
      border-radius: 8px;
      text-align: center;
      p {
        span {
          margin: 0 50px;
          color: #333;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
  }
  .line_detail {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
    // width: 100%;
    background: #f5f7f8;
    min-height: 100%;
    .middleLocation {
      background: #fff;
      padding-left: 50px;
      img {
        width: 22px;
        vertical-align: middle;
      }
    }
    .contract_info {
      width: 860px;
      background: rgba(242, 242, 242, 1);
      margin: 0 auto;
      font-size: 14px;
      height: 85px;
      line-height: 85px;
      text-align: center;
      span:nth-child(2) {
        margin: 0 20px;
      }
    }
    .chainNavLine {
      position: relative;
      min-height: 120px;
      background: #fff;
    }
  }
  .view_nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background:#fff;
    height:63px;
    padding: 25px 30px 0;
    position: relative;
    z-index: 10;
    li {
      font-size: 14px;
      text-align: center;
      width: 100%;
      height: 100%;
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        line-height: 38px;
        color: #eb6100;
      }
    }
    .sel {
      border-top: 2px solid #eb6100;
      background: #f5f7f8;
      color: #eb6100;
      border-right: 1px dashed #dbdbdb;
      border-left: 1px dashed #dbdbdb;
      border-bottom: 0;
    }
  }
  .chain_list {
    margin-top: 20px;
    padding: 0 50px;
    position: relative;
    &.c_tab_3 .item_table{
      border-bottom: 1px solid #ccc;
      &:last-of-type{
        border-bottom: none;
      }
    }
    .chain {
      border-left: 1px dashed #999;
      .retaled {
        .card_title {
          border-bottom: 2px solid #415de3;
          i.c_bg_down {
            color: #415de3;
            background: url("../../../../static/img/downchain.png") no-repeat center center;
          }
        }
      }
    }
    .card_title {
      height: 40px;
      position: relative;
      line-height: 40px;
      text-align: center;
      border-bottom: 2px solid #eb6100;
      width: 100%;
      font-size: 20px;
      margin: 0 auto;
      margin-bottom: 20px;
      &>span {
        font-weight: bold;
        position:relative;
        .c_bg_down{
          position: absolute;
          top:37px;
          left:50%;
          width:20px;
          height:14px;
          background: url("../../../../static/img/chaindown.png") no-repeat center center;
          display: inline-block;
        }
      }
      .slide_down {
        top: 10px;
        position: absolute;
        right: 0;
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;;
        .icon {
          font-size: 12px;;
          transition: all .3s;
        }
      }
      i {
        transition: all 0.14s ease-in;
      }
    }
    .ticket {
      &>span {
        color: #666;
        font-size: 14px;
      }
      height: 105px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #eaeaea;
      &.bar {
        border: 0
      }
      .ticket_item {
        width: 285px;
        height: 50px;
        margin: 10px 20px;
        background: url('../../../../static/img/tickets/stuff.png') center no-repeat;
        background-size: 100%;
        img {
          height: 77px;
          position: absolute;
          margin: -15px 0 0 8px;
        }
        .ticket_text {
          height: 40px;
          line-height: 40px;
          margin-top: 5px;
          color: #666;
          font-size: 14px;
          display: flex;
          justify-content: flex-end;
          .ticket_value {
            margin-right: 10px;
            width: 160px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
          }
          .ticket_num {
            color: #ea6100;
            margin-right: 7px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            width: 40px;
          }
        }
      }
    }
    .card_list {
      .slide_nav {
        padding: 0 50px;
        line-height: 30px;
        font-size: 14px;
      }
      .card_item {
        padding-top: 30px;
        width: 100%;
        min-height: 100px;
      }
      .item_title {
        height: 30px;
        line-height: 30px;
        cursor: visible;
        position: relative;
        .title_symbol {
          width: 24px;
          height: 24px;
          position: absolute;
          left: -13px;
          top: 5px;
          background: #f3d9c6;
          border-radius: 50%;
          div {
            width: 13px;
            height: 13px;;
            background: #eb6100;
            border-radius: 50%;
            margin: 5px auto;
          }
        }
        span {
          font-size: 14px;
          margin: 0 10px;
        }
        span:nth-child(2) {
          font-weight: bold;
          font-size: 18px;
          margin-left: 30px;
          color: #333;
        }
        span:nth-child(3) {
          height: 30px;
          // padding: 0px 20px;
          width: 160px;
          text-align: center;
          font-size: 12px;
          border-radius: 3px;
          // background: #eb6100;
          background: #fff;
          border: 1px solid #cccccc;
          border-left: none;
          cursor: pointer;
          // color: #fff;
          position: absolute;
          // right: 0px;
          left: -10px;
          top: 40px;
          &:hover{
            background: #eb6100;
            color: #fff;
            border-color: #eb6100;
          }
        }
      }
      .item_info {
        margin-top: 20px;
        width: 100%;
        .item_card {
          border: 1px solid #ccc;
          border-left: none;
          background: #fff;
          padding-bottom: 20px;
          margin-bottom: 20px;
          position: relative;//为每个新增按钮的定位
          .c_add_new_btn{
            position: absolute;
            right: 10px;
            top: 17px;
            height: 30px;
            line-height: 30px;
            width: 160px;
            text-align: center;
            font-size: 12px;
            border-radius: 3px;
            background: #fff;
            border: 1px solid #cccccc;
            cursor: pointer;
            &:hover{
              background: #eb6100;
              color: #fff;
              border-color: #eb6100;
            }
          }
        }
        .c_add_data{
          border-bottom: 1px solid #eee;
          padding: 0px 50px 10px;
          margin-bottom: 15px;
          font-size: 14px;
        }
        .item_btn {
          border-bottom: 1px solid #ccc;
          font-size: 14px;
          margin-top: 20px;
          span:first-child {
            color: #eb6100;
            border-bottom:4px solid #eb6100;
          }
          span:last-child{
            border-right:none;
            color: #eb6100;
            border-bottom:4px solid #eb6100;
            margin-left: 20px;
          }
          span {
            display: inline-block;
            padding: 10px 34px;
            cursor: pointer;
          }
        }
        .item_sec_title {
          padding: 15px 40px;
          font-size: 14px;
          color: #eb6100;
          span {
            font-weight: bold;
          }
        }
        .item_table {
          width:100%;
          display: inline-block;
          // padding: 20px 50px;
          color: #343536;
          p {
            width: 100%;
            padding: 0 15px;
            font-size: 14px;
            color: #333;
            height: 50px;
            line-height: 50px;
            display: flex;
            background: #f4f4f4;
            // border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            // justify-content: space-between;
            .timestamp {
              color: #ea544a;
              margin-right: 100px;
              font-weight: bolder;
            }
          }
          .teble_title {
            display: flex;
            align-items: center;
            height: 44px;
            line-height: 44px;
            // border: 1px solid #eee;
            font-size: 14px;
            margin: 0 50px;
            div {
              flex:1;
              text-align: center;
            }
            div.log_title:last-child {
              width: 320px;
            }
          }
          .table_line {
            display: flex;
            min-height: 44px;
            font-size: 14px;
            border-top: 1px dashed #ccc;
            margin: 0 50px;
            div {
              min-height: 44px;
              line-height: 44px;
              flex:1;
              text-align: center;
              cursor: pointer;
            }
            div.td_loginfo {
              width: 320px;
            }
            a {
              color: #eb6100;
            }
          }
        }
        .item_no_table {
          height: 60px;
          line-height: 60px;
          color: #999;
          text-align: center;
        }
        .item_detail {
          color: #999;
          padding: 10px 50px 0px 50px;
          border-top: 1px solid #ccc;
          .detail_line {
            font-size: 14px;
            line-height: 32px;
            span{
              display: inline-block;
              width: 33%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .detail_time {
              margin-left: 0 15px;
              color: #999;
            }
            p {
              padding: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .show_suppy_wrap {
          padding: 0 50px;
          .show_supply_title {
            line-height: 36px;
            color: #eb6100;
            font-size: 14px;
          }
          .supply_list {
            // padding: 0 20px;
            .supply_table {
              margin: 20px 0;
              p.supply_btn {
                border-bottom: 1px solid #ccc;
                line-height: 20px;
                padding: 0;
                display: block;
                padding: 10px 0px;
                height: auto;
                span:first-child, span:last-child {
                  padding: 10px 20px;
                  color: #eb6100;
                  border-bottom: 2px solid #eb6100;
                  margin-right: 10px;
                  cursor: pointer;
                  font-weight: 200;
                }
              }
              p {
                padding: 0 20px;
                border-bottom: 1px solid #eaeaea;
                line-height: 36px;
                display: flex;
                align-items: center;
                // justify-content: space-between;
                font-size: 14px;
                span:first-child {
                  color: #ea544a;
                  margin-right: 100px;
                  font-weight: bolder;
                }
              }
              .supply_btn+p{
                background: #f4f4f4;
                line-height: 48px;
                border-bottom: 1px solid #ccc;
              }
              .teble_title, .table_line {
                display: flex;
                height: 44px;
                div {
                  // width: 25%;
                  flex: 1;
                  text-align: center;
                  line-height: 36px;
                  font-size: 14px;
                  cursor: pointer;
                }
              }
              .table_line, .table_line_3{
                border-top: 1px dashed #ccc;
              }
              .teble_title_3, .table_line_3 {
                display: flex;
                height: 44px;
                div {
                  width: 33.3%;
                  text-align: center;
                  line-height: 44px;
                  font-size: 14px;
                }
              }
              .supply_detail {
                border-top: 1px solid #ccc;
                // padding: 0 50px;
                .detail_line {
                  display: flex;
                  height: 36px;
                  span {
                    width: 33%;
                    line-height: 36px;
                    color: #999;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  p {
                    line-height: 36px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    width: 100%;
                    border-bottom: none;
                    padding: 0;
                    color: #999;
                  }
                }
              }
            }
          }
        }
      }
    }
    .retaled {
       .show_suppy_wrap {
          padding: 0 50px;
          .show_supply_title {
            line-height: 36px;
            color: #415de3;
            border-bottom: 1px solid #eaeaea;
            font-size: 14px;
          }
          .supply_list {
            // padding: 0 20px;
            .supply_table {
              margin: 20px 0;
              p.supply_btn {
                border-bottom: 1px solid #eaeaea;
                line-height: 50px;
                height: 50px;
                display: block;
                height: auto;
                span:first-child, span:last-child {
                  height: 50px;
                  display: inline-block;
                  padding: 0px 20px;
                  color: #415de3;
                  border-bottom: 2px solid #415de3;
                  margin-right: 10px;
                  cursor: pointer;
                  font-weight: 200;
                }
              }
              .supply_btn+p{
                background: #f4f4f4;
                line-height: 48px;
                border-bottom: 1px solid #ccc;
              }
              p {
                padding: 0 20px;
                border-bottom: 1px solid #eaeaea;
                line-height: 36px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                span:first-child {
                  color: #ea544a;
                  margin-right: 100px;
                  font-weight: bolder;
                }
              }
              .teble_title, .table_line {
                display: flex;
                height: 40px;
                div {
                  // width: 25%;
                  flex: 1;
                  text-align: center;
                  line-height: 36px;
                  font-size: 14px;
                  cursor: pointer;
                }
              }
              .table_line{
                border-top: 1px dashed #ccc;
              }
              .teble_title_3, .table_line_3 {
                display: flex;
                height: 36px;
                border-bottom: 1px solid #eaeaea;
                div {
                  width: 33.3%;
                  text-align: center;
                  line-height: 36px;
                  border-left: 1px solid #eaeaea;
                  font-size: 14px;
                }
                div:last-child {
                  border-right: 1px solid #eaeaea;
                }
              }
              .supply_detail {
                margin-top: 20px;
                border-top: 1px solid #ccc;
                // padding: 0 50px;
                .detail_line {
                  display: flex;
                  height: 36px;
                  span {
                    width: 33%;
                    line-height: 36px;
                    color: #999;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  p {
                    line-height: 36px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    width: 100%;
                    border-bottom: none;
                    padding: 0;
                    color: #999;
                  }
                }
              }
            }
          }
        }
      .related_tab {
        display: none;
        ul {
          display: flex;
          width: 95%;
          margin: 0 auto;
          border-bottom: 1px solid #eee;
          li {
            font-size: 14px;
            padding: 0 20px;
            cursor: pointer;
            line-height: 50px;
          }
        }
      }
      .related_list {
        .related_item {
          margin-top: 30px;
          width: 100%;
          min-height: 80px;
          .item_title {
            height: 30px;
            line-height: 30px;
            cursor: visible;
            position: relative;
            .title_symbol {
              width: 24px;
              height: 24px;
              position: absolute;
              left: -13px;
              top: 5px;
              background: #d1d8f4;
              border-radius: 50%;
              div {
                width: 13px;
                height: 13px;;
                background: #415de3;
                border-radius: 50%;
                margin: 5px auto;
              }
            }
            span {
              font-size: 14px;
              margin: 0 10px;
            }
            span:nth-child(2) {
              font-weight: bold;
              font-size: 18px;
              margin-left: 30px;
              color: #333;
            }
            span:nth-child(3) {
              // padding: 0px 20px;
              width: 160px;
              text-align: center;
              font-size: 12px;
              border-radius: 3px;
              // background: #0099FF;
              background: #fff;
              border: 1px solid #cccccc;
              border-left: none;
              cursor: pointer;
              // color: #fff;
              position: absolute;
              // right: 0px;
              left: -10px;
              top: 40px;
              &:hover{
                background: #0099FF;
                color: #fff;
                border-color: #0099FF;
              }
            }
          }
          .item_info {
            // box-shadow: 2px 0px 6px #ccc;
            margin-top: 20px;
            width: 100%;
            // padding: 15px;
            .item_sec_title {
              padding: 15px 40px;
              line-height: 30px;
              font-size: 14px;
              color: #415de3;
              span {
                font-weight: bold;
              }
            }
            .item_card {
              border: 1px solid #ccc;
              border-left: none;
              background: #fff;
              // border-bottom: 1px solid #eee;
              padding-bottom: 20px;
              margin-bottom: 20px;
              position: relative;//为每个新增按钮的定位
              .c_add_new_btn{
                position: absolute;
                right: 10px;
                top: 17px;
                height: 30px;
                line-height: 30px;
                width: 160px;
                text-align: center;
                font-size: 12px;
                border-radius: 3px;
                background: #fff;
                border: 1px solid #cccccc;
                cursor: pointer;
                &:hover{
                  background: #0099FF;
                  color: #fff;
                  border-color: #0099FF;
                }
              }
            }
            .item_btn {
              font-size: 14px;
              margin-top: 10px;
              border-bottom: 1px solid #ccc;
              span:first-child {
                color: #415de3;
                border-bottom:4px solid #415de3;
              }
              span:last-child{
                color: #415de3;
                border-bottom:4px solid #415de3;
                margin-left: 20px;
              }
              span {
                display: inline-block;
                padding: 15px 34px;
                cursor: pointer;
              }
            }
            .item_table {
              width:100%;
              // border-top: 1px solid #ccc;
              display: inline-block;
              color: #343536;
              p {
                width: 100%;
                // padding: 0 15px;
                font-size: 14px;
                color: #999;
                height: 50px;
                line-height: 50px;
                padding: 0 15px;
                // border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                background: #f4f4f4;
                display: flex;
                // justify-content: space-between;
                span {
                  color: #000;
                  font-weight: bolder;
                }
                .timestamp {
                  color: #ea544a;
                  margin-right: 100px;
                  font-weight: bolder;
                }
              }
              .teble_title {
                display: flex;
                align-items: center;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                margin: 0 50px;
                div {
                  flex:1;
                  text-align: center;
                }
               div.log_title :last-of-type{
                 width: 320px;
               }
              }
              .table_line {
                display: flex;
                min-height: 40px;
                font-size: 14px;
                margin: 0 50px;
                border-top: 1px dashed #ccc;
                div {
                  min-height: 40px;
                  line-height: 40px;
                  flex:1;
                  text-align: center;
                  cursor: pointer;
                }
                a {
                  color: #eb6100;
                }
              }
            }
            .item_no_table {
              height: 60px;
              line-height: 60px;
              color: #999;
              text-align: center;
            }
            .item_detail {
              padding: 0 50px;
              border-top: 1px solid #ccc;
              padding-top: 10px;
              color: #999;
              .detail_line {
                font-size: 14px;
                line-height: 28px;
                span{
                  display: inline-block;
                  width: 32%;
                }
                .detail_time {
                  margin-left: 0 15px;
                  color: #999;
                }
              }
            }
          }
        }
      }
    }
  }
  .echarts_list {
    margin-top: 20px;
    button {
      width: 140px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #eb6100;
      color: #eb6100;
      outline: none;
      border-radius: 5px;
      background: #fff;
      margin: 50px;
      margin-bottom: 0;
    }
  }
  .supply_title {
    color: #eb6100;
    height: 40px;
    line-height:  40px;
    padding: 0 20px;
    border: 1px solid #eaeaea;
    border-top: none;
    font-size: 14px;
  }
  .item_title1 {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    line-height: 48px;
    background: #f4f4f4;
    height:48px;
    padding: 0 15px;
  }
}
</style>
