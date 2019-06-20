<template>
  <div id="up_down_customer">
    <!-- 客户 -->
    <div v-if='type === 1'>
      <div class="loan_status" style="page-break-after:always;">
        <h3>客户信用评级</h3>
        <div class="list_data">
          <div class="business_grade" v-for="(item, index) in business_credit_rating" :key="index">
            <div class="business_name">{{item.name}}</div>
            <ul>
              <li><p>评分：<span>100</span></p></li>
              <li><p>付款及时率：<span>100%</span></p></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="loan_status" style="page-break-after:always;">
        <h3>面对客户统计</h3>
        <div class="order_left">
          <p>2017年统计</p>
          <div id="accepted_pie" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
          <img :src="accepted_pie_img" alt="" v-if='Number(prints) === 1'>
        </div>
        <div class="order_left">
          <p>2018年统计</p>
          <div id="accepted_pie1" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
          <img :src="accepted_pie1_img" alt="" v-if='Number(prints) === 1'>
        </div>
        <div class="order_left">
          <p>2019年统计</p>
          <div id="accepted_pie2" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
          <img :src="accepted_pie2_img" alt="" v-if='Number(prints) === 1'>
        </div>
      </div>
      <div class="loan_status" style="page-break-after:always;">
        <h3>面对客户统计</h3>
        <div class="order_left">
          <p>2017年统计</p>
          <div id="accepted_histogram" style="height:400px;" v-if='Number(prints) !== 1'></div>
          <img :src="accepted_histogram_img" alt="" v-if='Number(prints) === 1'>
        </div>
        <div class="order_left">
          <p>2018年统计</p>
          <div id="accepted_histogram1" style="height:400px;" v-if='Number(prints) !== 1'></div>
          <img :src="accepted_histogram1_img" alt="" v-if='Number(prints) === 1'>
        </div>
        <div class="order_left">
          <p>2019年统计</p>
          <div id="accepted_histogram2" style="height:400px;" v-if='Number(prints) !== 1'></div>
          <img :src="accepted_histogram2_img" alt="" v-if='Number(prints) === 1'>
        </div>
      </div>
      <div class="loan_status" style="page-break-after:always;">
        <h3>面对客户统计</h3>
        <div class="list_chart order_lists" style="padding-left: 17px;">
          <div style="padding: 10px 0;">
            <p style="padding-bottom:20px;">2017年统计</p>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第一季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第二季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第三季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第四季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 10px 0;">
            <p style="padding-bottom:20px;">2018年统计</p>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第一季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第二季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第三季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第四季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data1.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 10px 0;">
            <p style="padding-bottom:20px;">2019年统计</p>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第一季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第二季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第三季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第四季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in accepted_histogram.data2.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <customer :prints='prints' />
      </div>
      <div class="loan_status" style="page-break-after:always;">
        <div class="order_left" style="padding-left: 17px;">
          <div style="margin-top:30px;padding: 10px 0;">
            <p style="padding-bottom:20px;">账期分布</p>
            <div class="list_data">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in accountPeriod1.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>账期分布</div>
                <div v-for="(item, index) in accountPeriod1.data" :key='index'>{{item}}</div>
              </div>
            </div>
          </div>
          <div style="margin-top:30px;padding: 10px 0;">
            <p style="padding-bottom:20px;">行业分布</p>
            <div class="list_data">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in industryDistribution1.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>行业分布</div>
                <div v-for="(item, index) in industryDistribution1.data" :key='index'>{{item}}</div>
              </div>
            </div>
          </div>
          <div style="margin-top:30px;padding: 10px 0;">
            <p style="padding-bottom:20px;">区域分布</p>
            <div class="list_data">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in regional_list" :key='index'>{{item.value}}</div>
              </div>
              <div class="table-line">
                <div>数量（个）</div>
                <div v-for="(item, index) in regionColumnp1.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>平均账期（天）</div>
                <div v-for="(item, index) in regionColumnp1.data" :key='index'>{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 供应商 -->
    <div v-if='type === 0'>
      <div class="loan_status" style="page-break-after:always;">
        <h3>供应商信用评估</h3>
        <div class="list_data">
          <div class="business_grade" v-for="(item, index) in p_credit_rating" :key="index">
            <div class="business_name">{{item.name}}</div>
            <ul>
              <li><p>退货率：<span>0%</span></p></li>
              <li><p>报废率：<span>0%</span></p></li>
              <li><p>按时交货率：<span>100%</span></p></li>
            </ul>
            <ul>
              <li><p>价格评价：<span>高</span></p></li>
              <li><p>协同度：<span>快</span></p></li>
              <li><p>选择范围：<span>广</span></p></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="loan_status" style="page-break-after:always;">
        <h3>面对供应商统计</h3>
        <div class="order_left">
          <p>2017年统计</p>
          <div id="paid_pie" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
          <img :src="paid_pie_img" alt="" v-if='Number(prints) === 1'>
        </div>
        <div class="order_left">
          <p>2018年统计</p>
          <div id="paid_pie1" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
          <img :src="paid_pie1_img" alt="" v-if='Number(prints) === 1'>
        </div>
        <div class="order_left">
          <p>2019年统计</p>
          <div id="paid_pie2" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
          <img :src="paid_pie2_img" alt="" v-if='Number(prints) === 1'>
        </div>
      </div>
      <div class="loan_status" style="page-break-after:always;">
        <h3>面对供应商统计</h3>
        <div class="order_left">
          <p>2017年统计</p>
          <div id="paid_histogram" style="height:400px;" v-if='Number(prints) !== 1'></div>
          <img :src="paid_histogram_img" alt="" v-if='Number(prints) === 1'>
        </div>
        <div class="order_left">
          <p>2018年统计</p>
          <div id="paid_histogram1" style="height:400px;" v-if='Number(prints) !== 1'></div>
          <img :src="paid_histogram1_img" alt="" v-if='Number(prints) === 1'>
        </div>
        <div class="order_left">
          <p>2019年统计</p>
          <div id="paid_histogram2" style="height:400px;" v-if='Number(prints) !== 1'></div>
          <img :src="paid_histogram2_img" alt="" v-if='Number(prints) === 1'>
        </div>
      </div>
      <div class="loan_status" style="page-break-after:always;">
        <h3>面对供应商统计</h3>
        <div class="list_chart order_lists" style="padding-left: 17px;">
          <div style="padding: 10px 0;">
            <p style="padding-bottom:20px;">2017年统计</p>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第一季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第二季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第三季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第四季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 10px 0;">
            <p style="padding-bottom:20px;">2018年统计</p>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第一季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data1.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第二季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data1.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第三季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data1.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第四季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data1.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data1.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 10px 0;">
            <p style="padding-bottom:20px;">2019年统计</p>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第一季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data2.data3.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第二季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data2.data3.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
            <div class="left-table">
              <div class="list_data">
                <div class="title-table-jidu">第三季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(6,9)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data2.data3.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
              <div class="list_data">
                <div class="title-table-jidu">第四季度</div>
                <div class="table-title">
                  <div></div>
                  <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                </div>
                <div class="table-line">
                  <div>提前付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>按时付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期付款</div>
                  <div v-for="(item, index) in paid_histogram.data2.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
                <div class="table-line">
                  <div>逾期未付</div>
                  <div v-for="(item, index) in paid_histogram.data2.data3.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 账期分布 -->
      <div class="loan_status">
        <h3>账期分布</h3>
        <div id="accountPeriod" style="height:400px;" v-if='Number(prints) !== 1'></div>
        <img :src="accountPeriod_img" alt="" v-if='Number(prints) === 1'>
      </div>
      <!-- 行业分布 -->
      <div class="loan_status">
        <h3>行业分布</h3>
        <div id="industryDistribution" style="height:400px;" v-if='Number(prints) !== 1'></div>
        <img :src="industryDistribution_img" alt="" v-if='Number(prints) === 1'>
      </div>
      <!-- 区域分布 -->
      <div class="loan_status" style="page-break-after:always;">
        <h3>区域分布</h3>
        <!-- <ul class="ul_reg">
          <li v-for="(item, index) in regional_list" :key="index"><span class="el-rect"><img :src="$root_url() + item.icon" alt=""></span><p>{{item.value}}</p></li>
        </ul> -->
        <ul data-v-0dfc8164="" class="ul_reg">
          <li data-v-0dfc8164="">
            <span data-v-0dfc8164="" class="el-rect">
              <img data-v-0dfc8164="" src="../../../../../static/img/pdf/1.png" alt="">
            </span>
            <p data-v-0dfc8164="">长江三角洲</p>
          </li>
          <li data-v-0dfc8164="">
            <span data-v-0dfc8164="" class="el-rect">
              <img data-v-0dfc8164="" src="../../../../../static/img/pdf/2.png" alt="">
            </span>
            <p data-v-0dfc8164="">珠江三角洲</p>
          </li>
          <li data-v-0dfc8164="">
            <span data-v-0dfc8164="" class="el-rect">
              <img data-v-0dfc8164="" src="../../../../../static/img/pdf/3.png" alt="">
            </span>
            <p data-v-0dfc8164="">西部</p>
          </li>
          <li data-v-0dfc8164="">
            <span data-v-0dfc8164="" class="el-rect">
              <img data-v-0dfc8164="" src="../../../../../static/img/pdf/4.png" alt="">
            </span>
            <p data-v-0dfc8164="">中部</p>
          </li>
          <li data-v-0dfc8164="">
            <span data-v-0dfc8164="" class="el-rect">
              <img data-v-0dfc8164="" src="../../../../../static/img/pdf/5.png" alt="">
            </span>
            <p data-v-0dfc8164="">东北</p>
          </li>
          <li data-v-0dfc8164="">
            <span data-v-0dfc8164="" class="el-rect">
              <img data-v-0dfc8164="" src="../../../../../static/img/pdf/6.png" alt="">
            </span>
            <p data-v-0dfc8164="">环渤海</p>
          </li>
          <li data-v-0dfc8164="">
            <span data-v-0dfc8164="" class="el-rect">
              <img data-v-0dfc8164="" src="../../../../../static/img/pdf/7.png" alt="">
            </span>
            <p data-v-0dfc8164="">京津冀</p>
          </li>
          <li data-v-0dfc8164="">
            <span data-v-0dfc8164="" class="el-rect">
              <img data-v-0dfc8164="" src="../../../../../static/img/pdf/8.png" alt="">
            </span><p data-v-0dfc8164="">其他</p>
          </li>
        </ul>
        <div id="regionColumnp" style="height:400px;" v-if='Number(prints) !== 1'></div>
        <img :src="regionColumnp_img" alt="" v-if='Number(prints) === 1'>
      </div>
      <div class="loan_status" style="page-break-after:always;">
        <div class="order_left" style="padding-left: 17px;">
          <div style="margin-top:30px;padding: 10px 0;">
            <p style="padding-bottom:20px;">账期分布</p>
            <div class="list_data">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in accountPeriod.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>账期分布</div>
                <div v-for="(item, index) in accountPeriod.data" :key='index'>{{item}}</div>
              </div>
            </div>
          </div>
          <div style="margin-top:30px;padding: 10px 0;">
            <p style="padding-bottom:20px;">行业分布</p>
            <div class="list_data">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in industryDistribution.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>行业分布</div>
                <div v-for="(item, index) in industryDistribution.data" :key='index'>{{item}}</div>
              </div>
            </div>
          </div>
          <div style="margin-top:30px;padding: 10px 0;">
            <p style="padding-bottom:20px;">区域分布</p>
            <div class="list_data">
              <div class="table-title">
                <div></div>
                <div v-for="(item, index) in regional_list" :key='index'>{{item.value}}</div>
              </div>
              <div class="table-line">
                <div>数量（个）</div>
                <div v-for="(item, index) in regionColumnp.xAxis" :key='index'>{{item}}</div>
              </div>
              <div class="table-line">
                <div>平均账期（天）</div>
                <div v-for="(item, index) in regionColumnp.data" :key='index'>{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customer from '../customer.vue'
const echarts = require('echarts')
export default {
  name: 'upDownCustomer',
  data () {
    return {
      company_id: '',
      tableTitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 链主的已收---饼图
      accepted_pie: {
        titles: '链主的已收',
        legend: ['客户提前支付', '客户按时支付','客户逾期支付','客户逾期未付'],
        color: ['rgb(24, 144, 255)', 'rgb(19, 194, 194)', '#f39f5f', 'rgb(240, 72, 100)'],
        data: {
          data: [],
          data1: [],
          data2: []
        }
      },
      accepted_pie_img: '',
      accepted_pie1_img: '',
      accepted_pie2_img: '',
      // 链主的已收---柱状图
      accepted_histogram: {
        legend: ['客户提前支付', '客户按时支付','客户逾期支付','客户逾期未付'],
        color: ['rgb(24, 144, 255)', 'rgb(19, 194, 194)', '#f39f5f', 'rgb(240, 72, 100)'],
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        data: { data: [], data1: [], data2: [], data3: [] },
        data1: { data: [], data1: [], data2: [], data3: [] },
        data2: { data: [], data1: [], data2: [], data3: [] }
      },
      accepted_histogram_img: '',
      accepted_histogram1_img: '',
      accepted_histogram2_img: '',
      // 链主的已付---饼图
      paid_pie: {
        titles: '链主的已付',
        legend: ['提前支付', '按时支付','逾期支付','逾期未付'],
        color: ['rgb(24, 144, 255)', 'rgb(19, 194, 194)', '#f39f5f', 'rgb(240, 72, 100)'],
        data: {
          data: [],
          data1: [],
          data2: []
        }
      },
      paid_pie_img: '',
      paid_pie1_img: '',
      paid_pie2_img: '',
      // 链主的已付---柱状图
      paid_histogram: {
        legend: ['提前支付', '按时支付','逾期支付','逾期未付'],
        color: ['rgb(24, 144, 255)', 'rgb(19, 194, 194)', '#f39f5f', 'rgb(240, 72, 100)'],
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        data: { data: [], data1: [], data2: [], data3: [] },
        data1: { data: [], data1: [], data2: [], data3: [] },
        data2: { data: [], data1: [], data2: [], data3: [] }
      },
      paid_histogram_img: '',
      paid_histogram1_img: '',
      paid_histogram2_img: '',
      p_credit_rating: [],
      supplierName: [],
      // 供应商
      // 账期分布
      accountPeriod: {
        xAxis: [],
        data: [],
        legend: ['供应商'],
        index: 1,
        num: 0,
        name: '（个）',
        color: ['#3AA0FF']
      },
      accountPeriod_img: '',
      // 行业分布
      industryDistribution: {
        xAxis: [],
        data: [],
        num: 0,
        name: '（个）',
        index: 1,
        legend: ['供应商'],
        color: ['#3AA0FF']
      },
      // 区域分布
      regionalDistribution: {
        p_data: {
          xAxis: [],
          legend: '供应商',
          bh_rim: {
            account_avg: '',
            company_count: ''
          },
          central: {
            account_avg: '',
            company_count: ''
          },
          cj_delta: {
            account_avg: '',
            company_count: ''
          },
          jjj: {
            account_avg: '',
            company_count: ''
          },
          northeast: {
            account_avg: '',
            company_count: ''
          },
          other: {
            account_avg: '',
            company_count: ''
          },
          west: {
            account_avg: '',
            company_count: ''
          },
          zj_delta: {
            account_avg: '',
            company_count: ''
          }
        },
        r_data: {
          xAxis: [],
          legend: '客户',
          bh_rim: {
            account_avg: '',
            company_count: ''
          },
          central: {
            account_avg: '',
            company_count: ''
          },
          cj_delta: {
            account_avg: '',
            company_count: ''
          },
          jjj: {
            account_avg: '',
            company_count: ''
          },
          northeast: {
            account_avg: '',
            company_count: ''
          },
          other: {
            account_avg: '',
            company_count: ''
          },
          west: {
            account_avg: '',
            company_count: ''
          },
          zj_delta: {
            account_avg: '',
            company_count: ''
          }
        }
      },
      industryDistribution_img: '',
      // '#975fe4', '#1d4fd4', '#36cbcb', '#4ecb73', '#fcdc5b', '#e3dcff', '#d7b600', '#f2637b'
      regional_list: [
        {
          value: '长江三角洲',
          color: '#975fe4',
          icon: '/static/img/pdf/1.png'
        },
        {
          value: '珠江三角洲',
          color: '#1d4fd4',
          icon: '/static/img/pdf/2.png'
        },
        {
          value: '西部',
          color: '#36cbcb',
          icon: '/static/img/pdf/3.png'
        },
        {
          value: '中部',
          color: '#4ecb73',
          icon: '/static/img/pdf/4.png'
        },
        {
          value: '东北',
          color: '#fcdc5b',
          icon: '/static/img/pdf/5.png'
        },
        {
          value: '环渤海',
          color: '#e3dcff',
          icon: '/static/img/pdf/6.png'
        },
        {
          value: '京津冀',
          color: '#f39f5f',
          icon: '/static/img/pdf/7.png'
        },
        {
          value: '其他',
          color: '#f2637b',
          icon: '/static/img/pdf/8.png'
        }
      ],
      regionColumnp: {
        data: [],
        xAxis: []
      },
      regionColumnp_img: '',
      // 客户
      business_credit_rating: [],
      // 账期分布
      accountPeriod1: {
        xAxis: [],
        data: [],
        legend: ['供应商'],
        index: 1,
        num: 0,
        name: '（个）',
        color: ['#3AA0FF']
      },
      zhangqi_img: '',
      // 行业分布
      industryDistribution1: {
        xAxis: [],
        data: [],
        num: 0,
        name: '（个）',
        index: 1,
        legend: ['供应商'],
        color: ['#3AA0FF']
      },
      hangye_img: '',
      // '#975fe4', '#1d4fd4', '#36cbcb', '#4ecb73', '#fcdc5b', '#e3dcff', '#d7b600', '#f2637b'
      regional_list1: [
        {
          value: '长江三角洲',
          color: '#975fe4',
        },
        {
          value: '珠江三角洲',
          color: '#1d4fd4',
        },
        {
          value: '西部',
          color: '#36cbcb',
        },
        {
          value: '中部',
          color: '#4ecb73',
        },
        {
          value: '东北',
          color: '#fcdc5b',
        },
        {
          value: '环渤海',
          color: '#e3dcff',
        },
        {
          value: '京津冀',
          color: '#f39f5f',
        },
        {
          value: '其他',
          color: '#f2637b',
        }
      ],
      regionColumnp1: {
        data: [],
        xAxis: []
      },
      quyu_img: '',
    }
  },
  props: ['prints', 'type'],
  watch: {
    'prints' (n, o) {
      const that = this
      if (Number(n) === 1) {
        that.columnImg()
        that.imgList()
      }
    }
  },
  components: {
    customer
  },
  mounted () {
    const that = this
    that.company_id = localStorage.id
    // that.company_id = 10100000002
    that.pie_column()
    that.$ajax.get('/api/oth/data_portrait/partner_company/?company_id=' + that.company_id + '&p_type=2').then(res => {
      that.supplierName = res.data
      that.p_credit_rating = res.data
    })
    // 账期分布
    that.$ajax.get('/api/oth/data_portrait/accounts_statistics/?company_id=' + that.company_id).then(res => {
      that.accountPeriod.data = res.data.p_data
      that.accountPeriod.xAxis = res.data.x_axis
      that.columnChart1('accountPeriod', that.accountPeriod.legend, that.accountPeriod.xAxis, that.accountPeriod.data, '', '', '', that.accountPeriod.color)
    })
    // 行业分布
    that.$ajax.get('/api/oth/data_portrait/industry_distribution/?company_id=' + that.company_id).then(res => {
      that.industryDistribution.data = res.data.p_data
      that.industryDistribution.xAxis = res.data.x_axis
      that.columnChart1('industryDistribution', that.industryDistribution.legend, that.industryDistribution.xAxis, that.industryDistribution.data, '', '', '', that.industryDistribution.color)
    })
    // 区域分布
    that.$ajax.get('/api/oth/data_portrait/accounts_area_statistics/?company_id=' + that.company_id).then(res => {
      // 供应商
      that.regionalDistribution.p_data.bh_rim = res.data.p_data.bh_rim
      that.regionalDistribution.p_data.central = res.data.p_data.central
      that.regionalDistribution.p_data.cj_delta = res.data.p_data.cj_delta
      that.regionalDistribution.p_data.jjj = res.data.p_data.jjj
      that.regionalDistribution.p_data.northeast = res.data.p_data.northeast
      that.regionalDistribution.p_data.other = res.data.p_data.other
      that.regionalDistribution.p_data.west = res.data.p_data.west
      that.regionalDistribution.p_data.zj_delta = res.data.p_data.zj_delta
      that.regionColumnp.xAxis.push(that.regionalDistribution.p_data.cj_delta.company_count, that.regionalDistribution.p_data.zj_delta.company_count, that.regionalDistribution.p_data.west.company_count, that.regionalDistribution.p_data.central.company_count, that.regionalDistribution.p_data.northeast.company_count, that.regionalDistribution.p_data.bh_rim.company_count, that.regionalDistribution.p_data.jjj.company_count, that.regionalDistribution.p_data.other.company_count)
      that.regionColumnp.data.push(that.regionalDistribution.p_data.cj_delta.account_avg, that.regionalDistribution.p_data.zj_delta.account_avg, that.regionalDistribution.p_data.west.account_avg, that.regionalDistribution.p_data.central.account_avg, that.regionalDistribution.p_data.northeast.account_avg, that.regionalDistribution.p_data.bh_rim.account_avg, that.regionalDistribution.p_data.jjj.account_avg, that.regionalDistribution.p_data.other.account_avg)
      that.drawChart('regionColumnp', that.regionalDistribution.p_data.legend, that.regionColumnp.xAxis, that.regionColumnp.data)
    })
  },
  methods: {
    // 柱状图-2017-2018-2019
    pie_column () {
      const that = this
      // 链主的已收
      that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1' + '&year=' + 2017).then(res => {
        // 饼图
        var arr = []
        arr[0] = {value: res.data.advance_paid, name: '客户提前支付'}
        arr[1] = {value: res.data.ontime_paid, name: '客户按时支付'}
        arr[2] = {value: res.data.overdue_paid, name: '客户逾期支付'}
        arr[3] = {value: res.data.overdue_unpaid, name: '客户逾期未付'}
        that.accepted_pie.data.data = arr
        that.pieChart('accepted_pie', that.accepted_pie.legend, that.accepted_pie.titles, that.accepted_pie.data.data, that.accepted_pie.color)
        // 柱状图
        // 提前支付
        that.accepted_histogram.data.data = res.data.advance_paid_list
        // 按时支付
        that.accepted_histogram.data.data1 = res.data.ontime_paid_list
        // 逾期支付
        that.accepted_histogram.data.data2 = res.data.overdue_paid_list
        // 逾期未付
        that.accepted_histogram.data.data3 = res.data.overdue_unpaid_list
        that.columnChart('accepted_histogram', that.accepted_histogram.legend, that.accepted_histogram.xAxis, that.accepted_histogram.data.data, that.accepted_histogram.data.data1, that.accepted_histogram.data.data2, that.accepted_histogram.data.data3, that.accepted_histogram.color)
      })
      that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1' + '&year=' + 2018).then(res => {
        // 饼图
        var arr1 = []
        arr1[0] = {value: res.data.advance_paid, name: '客户提前支付'}
        arr1[1] = {value: res.data.ontime_paid, name: '客户按时支付'}
        arr1[2] = {value: res.data.overdue_paid, name: '客户逾期支付'}
        arr1[3] = {value: res.data.overdue_unpaid, name: '客户逾期未付'}
        that.accepted_pie.data.data1 = arr1
        that.pieChart('accepted_pie1', that.accepted_pie.legend, that.accepted_pie.titles, that.accepted_pie.data.data1, that.accepted_pie.color)
        // 柱状图
        // 提前支付
        that.accepted_histogram.data1.data = res.data.advance_paid_list
        // 按时支付
        that.accepted_histogram.data1.data1 = res.data.ontime_paid_list
        // 逾期支付
        that.accepted_histogram.data1.data2 = res.data.overdue_paid_list
        // 逾期未付
        that.accepted_histogram.data1.data3 = res.data.overdue_unpaid_list
        that.columnChart('accepted_histogram1', that.accepted_histogram.legend, that.accepted_histogram.xAxis, that.accepted_histogram.data1.data, that.accepted_histogram.data1.data1, that.accepted_histogram.data1.data2, that.accepted_histogram.data1.data3, that.accepted_histogram.color)
      })
      that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=1' + '&year=' + 2019).then(res => {
        // 饼图
        var arr2 = []
        arr2[0] = {value: res.data.advance_paid, name: '客户提前支付'}
        arr2[1] = {value: res.data.ontime_paid, name: '客户按时支付'}
        arr2[2] = {value: res.data.overdue_paid, name: '客户逾期支付'}
        arr2[3] = {value: res.data.overdue_unpaid, name: '客户逾期未付'}
        that.accepted_pie.data.data2 = arr2
        that.pieChart('accepted_pie2', that.accepted_pie.legend, that.accepted_pie.titles, that.accepted_pie.data.data2, that.accepted_pie.color)
        // 柱状图
        // 提前支付
        that.accepted_histogram.data2.data = res.data.advance_paid_list
        // 按时支付
        that.accepted_histogram.data2.data1 = res.data.ontime_paid_list
        // 逾期支付
        that.accepted_histogram.data2.data2 = res.data.overdue_paid_list
        // 逾期未付
        that.accepted_histogram.data2.data3 = res.data.overdue_unpaid_list
        that.columnChart('accepted_histogram2', that.accepted_histogram.legend, that.accepted_histogram.xAxis, that.accepted_histogram.data2.data, that.accepted_histogram.data2.data1, that.accepted_histogram.data2.data2, that.accepted_histogram.data2.data3, that.accepted_histogram.color)
      })
      // 链主的已付
      that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=2' + '&year=' + 2017).then(res => {
        // 饼图
        var str = []
        str[0] = {value: res.data.advance_paid, name: '提前支付'}
        str[1] = {value: res.data.ontime_paid, name: '按时支付'}
        str[2] = {value: res.data.overdue_paid, name: '逾期支付'}
        str[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
        that.paid_pie.data.data = str
        that.pieChart('paid_pie', that.paid_pie.legend, that.paid_pie.titles, that.paid_pie.data.data, that.paid_pie.color)
        // 柱状图
        // 提前支付
        that.paid_histogram.data.data = res.data.advance_paid_list
        // 按时支付
        that.paid_histogram.data.data1 = res.data.ontime_paid_list
        // 逾期支付
        that.paid_histogram.data.data2 = res.data.overdue_paid_list
        // 逾期未付
        that.paid_histogram.data.data3 = res.data.overdue_unpaid_list
        that.columnChart('paid_histogram', that.paid_histogram.legend, that.paid_histogram.xAxis, that.paid_histogram.data.data, that.paid_histogram.data.data1, that.paid_histogram.data.data2, that.paid_histogram.data.data3, that.paid_histogram.color)
      })
      that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=2' + '&year=' + 2018).then(res => {
        // 饼图
        var str1 = []
        str1[0] = {value: res.data.advance_paid, name: '提前支付'}
        str1[1] = {value: res.data.ontime_paid, name: '按时支付'}
        str1[2] = {value: res.data.overdue_paid, name: '逾期支付'}
        str1[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
        that.paid_pie.data.data1 = str1
        that.pieChart('paid_pie1', that.paid_pie.legend, that.paid_pie.titles, that.paid_pie.data.data1, that.paid_pie.color)
        // 柱状图
        // 提前支付
        that.paid_histogram.data1.data = res.data.advance_paid_list
        // 按时支付
        that.paid_histogram.data1.data1 = res.data.ontime_paid_list
        // 逾期支付
        that.paid_histogram.data1.data2 = res.data.overdue_paid_list
        // 逾期未付
        that.paid_histogram.data1.data3 = res.data.overdue_unpaid_list
        that.columnChart('paid_histogram1', that.paid_histogram.legend, that.paid_histogram.xAxis, that.paid_histogram.data1.data, that.paid_histogram.data1.data1, that.paid_histogram.data1.data2, that.paid_histogram.data1.data3, that.paid_histogram.color)
      })
      that.$ajax.get('/api/oth/data_portrait/payment_statistics/?company_id=' + that.company_id + '&p_type=2' + '&year=' + 2019).then(res => {
        // 饼图
        var str2 = []
        str2[0] = {value: res.data.advance_paid, name: '提前支付'}
        str2[1] = {value: res.data.ontime_paid, name: '按时支付'}
        str2[2] = {value: res.data.overdue_paid, name: '逾期支付'}
        str2[3] = {value: res.data.overdue_unpaid, name: '逾期未付'}
        that.paid_pie.data.data2 = str2
        that.pieChart('paid_pie2', that.paid_pie.legend, that.paid_pie.titles, that.paid_pie.data.data2, that.paid_pie.color)
        // 柱状图
        // 提前支付
        that.paid_histogram.data2.data = res.data.advance_paid_list
        // 按时支付
        that.paid_histogram.data2.data1 = res.data.ontime_paid_list
        // 逾期支付
        that.paid_histogram.data2.data2 = res.data.overdue_paid_list
        // 逾期未付
        that.paid_histogram.data2.data3 = res.data.overdue_unpaid_list
        that.columnChart('paid_histogram2', that.paid_histogram.legend, that.paid_histogram.xAxis, that.paid_histogram.data2.data, that.paid_histogram.data2.data1, that.paid_histogram.data2.data2, that.paid_histogram.data2.data3, that.paid_histogram.color)
      })
      // 账期分布
      that.$ajax.get('/api/oth/data_portrait/accounts_statistics/?company_id=' + that.company_id).then(res => {
        that.accountPeriod1.data = res.data.r_data
        that.accountPeriod1.xAxis = res.data.x_axis
        that.columnChart1('zhangqi', that.accountPeriod1.legend, that.accountPeriod1.xAxis, that.accountPeriod1.data, '', '', '', that.accountPeriod1.color)
      })
      // 行业分布
      that.$ajax.get('/api/oth/data_portrait/industry_distribution/?company_id=' + that.company_id).then(res => {
        that.industryDistribution1.data = res.data.r_data
        that.industryDistribution1.xAxis = res.data.x_axis
        that.columnChart1('hangye', that.industryDistribution1.legend, that.industryDistribution1.xAxis, that.industryDistribution1.data, '', '', '', that.industryDistribution1.color)
      })
      // 区域分布
      that.$ajax.get('/api/oth/data_portrait/accounts_area_statistics/?company_id=' + that.company_id).then(res => {
        that.regionalDistribution.r_data.bh_rim = res.data.r_data.bh_rim
        that.regionalDistribution.r_data.central = res.data.r_data.central
        that.regionalDistribution.r_data.cj_delta = res.data.r_data.cj_delta
        that.regionalDistribution.r_data.jjj = res.data.r_data.jjj
        that.regionalDistribution.r_data.northeast = res.data.r_data.northeast
        that.regionalDistribution.r_data.other = res.data.r_data.other
        that.regionalDistribution.r_data.west = res.data.r_data.west
        that.regionalDistribution.r_data.zj_delta = res.data.r_data.zj_delta
        that.regionColumnp1.xAxis.push(that.regionalDistribution.r_data.cj_delta.company_count, that.regionalDistribution.r_data.zj_delta.company_count, that.regionalDistribution.r_data.west.company_count, that.regionalDistribution.r_data.central.company_count, that.regionalDistribution.r_data.northeast.company_count, that.regionalDistribution.r_data.bh_rim.company_count, that.regionalDistribution.r_data.jjj.company_count, that.regionalDistribution.r_data.other.company_count)
        that.regionColumnp1.data.push(that.regionalDistribution.r_data.cj_delta.account_avg, that.regionalDistribution.r_data.zj_delta.account_avg, that.regionalDistribution.r_data.west.account_avg, that.regionalDistribution.r_data.central.account_avg, that.regionalDistribution.r_data.northeast.account_avg, that.regionalDistribution.r_data.bh_rim.account_avg, that.regionalDistribution.r_data.jjj.account_avg, that.regionalDistribution.r_data.other.account_avg)
        that.drawChart('quyu', that.regionalDistribution.r_data.legend, that.regionColumnp1.xAxis, that.regionColumnp1.data)
      })
      that.$ajax.get('/api/oth/data_portrait/partner_company/?company_id=' + that.company_id + '&p_type=1').then(res => {
        that.business_credit_rating = res.data
      })
    },
    columnImg () {
      const that = this
      // 2017
      let a = echarts.init(document.getElementById('accepted_pie'))
      var a1 = a.getDataURL()
      that.accepted_pie_img = a1
      // 2018
      let b = echarts.init(document.getElementById('accepted_pie1'))
      var b1 = b.getDataURL()
      that.accepted_pie1_img = b1
      // 2019
      let c = echarts.init(document.getElementById('accepted_pie2'))
      var c1 = c.getDataURL()
      that.accepted_pie2_img = c1
      // 2017
      let d = echarts.init(document.getElementById('accepted_histogram'))
      var d1 = d.getDataURL()
      that.accepted_histogram_img = d1
      // 2018
      let e = echarts.init(document.getElementById('accepted_histogram1'))
      var e1 = e.getDataURL()
      that.accepted_histogram1_img = e1
      // 2019
      let f = echarts.init(document.getElementById('accepted_histogram2'))
      var f1 = f.getDataURL()
      that.accepted_histogram2_img = f1

      // 2017
      let g = echarts.init(document.getElementById('paid_pie'))
      var g1 = g.getDataURL()
      that.paid_pie_img = g1
      // 2018
      let h = echarts.init(document.getElementById('paid_pie1'))
      var h1 = h.getDataURL()
      that.paid_pie1_img = h1
      // 2019
      let r = echarts.init(document.getElementById('paid_pie2'))
      var r1 = r.getDataURL()
      that.paid_pie2_img = r1
      // 2017
      let j = echarts.init(document.getElementById('paid_histogram'))
      var j1 = j.getDataURL()
      that.paid_histogram_img = j1
      // 2018
      let k = echarts.init(document.getElementById('paid_histogram1'))
      var k1 = k.getDataURL()
      that.paid_histogram1_img = k1
      // 2019
      let l = echarts.init(document.getElementById('paid_histogram2'))
      var l1 = l.getDataURL()
      that.paid_histogram2_img = l1
      
      let m = echarts.init(document.getElementById('accountPeriod'))
      var m1 = m.getDataURL()
      that.accountPeriod_img = m1
      
      let n = echarts.init(document.getElementById('industryDistribution'))
      var n1 = n.getDataURL()
      that.industryDistribution_img = n1
      
      let o = echarts.init(document.getElementById('regionColumnp'))
      var o1 = o.getDataURL()
      that.regionColumnp_img = o1
    }, 
    imgList () {
      const that = this
      let a = echarts.init(document.getElementById('zhangqi'))
      var a1 = a.getDataURL()
      that.zhangqi_img = a1
      
      let b = echarts.init(document.getElementById('hangye'))
      var b1 = b.getDataURL()
      that.hangye_img = b1
      
      let c = echarts.init(document.getElementById('quyu'))
      var c1 = c.getDataURL()
      that.quyu_img = c1
    },
    // 饼图
    pieChart (e, legend, titles, data, colors) {
      const that = this
      let myChart = echarts.init(document.getElementById(e))
      var config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: config.rotate,
              align: config.align,
              verticalAlign: config.verticalAlign,
              position: config.position,
              distance: config.distance
            }
          };
          myChart.setOption({
            series: [{
              label: labelOption
            }]
          });
        }
      };
      var labelOption = {
        normal: {
          show: true,
          fontSize: 16,
          formatter: function (i) {
            let str;
            str = that.toThousands(i.value) + '（元）'
            str += '  {per|' + i.percent + '%}  '
            return str;
          },
          rich: {
            name: {
              textBorderColor: '#fff'
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      };
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          right: 2,
          top: 0,
          data: legend
        },
        animation: false, // 去掉动画才会显示线
        color: colors,
        series: [
          {
            name: titles,
            type: "pie",
            radius: ['40%', '55%'],
            avoidLabelOverlap: true,
            label: labelOption,
            // 动态获取data
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      //自适应宽高
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 柱状图
    columnChart (e, legend, xAxis, data1, data2, data3, data4, colors) {
      const that = this
      let myChart = echarts.init(document.getElementById(e))
      var config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: config.rotate,
              align: config.align,
              verticalAlign: config.verticalAlign,
              position: config.position,
              distance: config.distance
            }
          };
          myChart.setOption({
            series: [{
              label: labelOption
            }]
          });
        }
      };
      var labelOption = {
        normal: {
          show: true,
          position: config.position,
          distance: config.distance,
          align: config.align,
          verticalAlign: config.verticalAlign,
          rotate: config.rotate,
          fontSize: 22,
          fontWeight: 'normal',
          formatter: function (a) {
            let str;
            str = that.toThousands(a.value) + '（元）'
            return str;
          },
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      };
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            let str;
            str = '<div><h3>' + params[0].name +'</h3>'
            for (let i = 0; i < params.length; i++) {
              str += '<p>' + params[i].marker + params[i].seriesName + '<span>：'+ that.toThousands(params[i].value) +'（元）</span></p>'
            }
            str +='</div>'
            return str
          }
        },
        legend: {
          right: 2,
          top: 0,
          data: legend
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: xAxis
          }
        ],
        yAxis: [
          {
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 250
            },
            minInterval: 1,
            type: "value"
          }
        ],
        grid: {
          left: 100
        },
        series: [
          {
            name: legend[0],
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data1
          },
          {
            name: legend[1],
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data2
          },
          {
            name: legend[2],
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data3
          },
          {
            name: legend[3],
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data4
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      //自适应宽高
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 柱状图
    columnChart1 (e, legend, xAxis, data1, data2, data3, data4, colors) {
      const that = this
      let myChart = echarts.init(document.getElementById(e))
      var config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: config.rotate,
              align: config.align,
              verticalAlign: config.verticalAlign,
              position: config.position,
              distance: config.distance
            }
          };
          myChart.setOption({
            series: [{
              label: labelOption
            }]
          });
        }
      };
      var labelOption = {
        normal: {
          show: true,
          position: config.position,
          distance: config.distance,
          align: config.align,
          verticalAlign: config.verticalAlign,
          rotate: config.rotate,
          fontSize: 22,
          fontWeight: 'normal',
          formatter: function (a) {
            let str;
            str = that.toThousands(a.value) + '（元）'
            return str;
          },
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      };
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            let str;
            str = '<div><h3>' + params[0].name +'</h3>'
            for (let i = 0; i < params.length; i++) {
              str += '<p>' + params[i].marker + params[i].seriesName + '<span>：'+ that.toThousands(params[i].value) +'（元）</span></p>'
            }
            str +='</div>'
            return str
          }
        },
        legend: {
          right: 2,
          top: 0,
          data: legend
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: xAxis
          }
        ],
        yAxis: [
          {
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 250
            },
            minInterval: 1,
            type: "value"
          }
        ],
        grid: {
          left: 100
        },
        series: [
          {
            name: legend[0],
            type: "bar",
            barGap: 0,
            barMaxWidth: '40',
            // label: labelOption,
            data: data1
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      //自适应宽高
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drawChart (e, legend, xAxis, data) {
      const that = this
      let myChart = echarts.init(document.getElementById(e))
      let option = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter:function (x) {
            let str;
            for (let i = 0; i < that.regional_list.length; i++) {
              if (that.regional_list[i].color === x[0].color) {
                str = '<div>'
                str += '<div>' + x[0].marker + that.regional_list[i].value + '：</div>'
                str += '<div>数量：' + x[0].axisValue + '（个）</div>'
                str += '<div>平均账期：' + x[0].value + '（天）</div>'
                str += '</div>'
              }
            }
            return str
          }
        },
        legend: {
          right: 10,
          top: 2,
          data: legend
          // data: ['长江三角洲', '珠江三角洲', '西部', '中部', '东北', '环渤海', '京津冀', '其他']
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            name: '个数',
            nameTextStyle: {
              color: '#eb6100'
            },
            type: 'category',
            axisTick: {show: false},
            data: xAxis
          }
        ],
        yAxis: [
          {
            name: '平均账期',
            nameTextStyle: {
              color: '#eb6100'
            },
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 50
            },
            minInterval: 1,
            type: "value"
          }
        ],
        color: ['rgb(24, 144, 255)', '#f39f5f'],
        series: [
          {
            name: '',
            itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      '#975fe4', '#1d4fd4', '#36cbcb', '#4ecb73', '#fcdc5b', '#e3dcff', '#f39f5f', '#f2637b'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
            },
            type: 'bar',
            barMaxWidth: '35',
            data: data
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      //自适应宽高
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  }
}
</script>

<style lang="less" scoped>
#up_down_customer {
  h3 {
    margin-top: 15px;
    height: 30px;
    font-weight: 700;
    font-style: normal;
    line-height: 30px;
    font-size: 18px;
    color: #999;
    padding-left: 17px;
  }
  .order_left {
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    p {
      display: block;
      font-size: 16px;
      color: #666;
      padding-left: 20px;
      padding-bottom: 10px;
    }
  }
}
.list_data {
  padding-bottom: 20px;
  .business_grade {
    padding: 20px 20px 0 30px;
    position: relative;
    .business_name {
      font-weight: bold;
      font-size: 14px;
      color: #666;
    }
    ul {
      display: flex;
      flex-direction: row;
      li {
        flex: 1;
        p {
          font-weight: normal;
          font-size: 13px;
          padding-top: 5px;
          color: #999;
          span {
            color: #666;
          }
        }
      }
    }
  }
  .block {
    margin-top: 30px;
    text-align: center;
  }
  .table-title {
    display: flex;
    height:54px;
    background:rgba(250,250,250,1);
    flex-direction: row;
    border-bottom: 1px solid rgba(221,221,221,1);
    div {
      flex: 1;
      height: 100%;
      color: #333;
      text-align: right;
      line-height: 54px;
    }
    div {
      padding-right: 16px;
    }
  }
  .table-line {
    display: flex;
    margin: 0 auto;
    height: 54px;
    border-right: none;
    border-bottom: 1px solid rgba(221,221,221,1);
    .detail {
      color: #eb6100;
      padding-bottom:1px;
      border-bottom:1px solid #eb6100
    }
    div {
      flex: 1;
      height: 100%;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(102,102,102,1);
      text-align: right;
      line-height: 54px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    div {
      padding-right: 20px;
    }
  }
}
.ul_reg {
  text-align: right;
  padding-right: 10%;
  padding-top: 20px;
  li {
    display: inline-block;
    font-size: 12px;
    height: 20px;
    margin-right: 5px;
    span {
      float: left;
    }
    p {
      float: left;
    }
  }
  .el-rect {
    width: 24px;
    height: 13px;
    border-radius: 3px;
    margin: 2px 3px 0;
  }
  .a {
    background:#975fe4; 
  }
  .a1 {
    background:#1d4fd4; 
  }
  .a2 {
    background:#36cbcb; 
  }
  .a3 {
    background:#4ecb73; 
  }
  .a4 {
    background:#fcdc5b; 
  }
  .a5 {
    background:#e3dcff; 
  }
  .a6 {
    background:#f39f5f; 
  }
  .a7 {
    background:#f2637b; 
  }
}
</style>
