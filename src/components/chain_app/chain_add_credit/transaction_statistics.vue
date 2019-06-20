<template>
  <div id="transaction_statistics">
    <div class="flex-add">
      <div class="transaction_statistics">
        <h2>供应链交易数据统计概览</h2>
        <div class="list" style="page-break-after:always;">
          <h3>订单情况</h3>
          <div class="list_chart order_lists">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="orderStatus" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderStatus_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="orderStatus1" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderStatus1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="orderStatus2" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderStatus2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>产生订单总数（金额）</h3>
          <div class="list_chart order_lists">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="orderColumn" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumn_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="orderColumn1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumn1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="orderColumn2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumn2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>产生订单总数（金额）</h3>
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
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 10px 0;">
              <p style="padding-bottom:20px;">2018年统计</p>
              <div class="left-table" style="page-break-after:always;">
                <div class="list_data">
                  <div class="title-table-jidu">第一季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总额</div>
                    <div v-for="(item, index) in orderGram.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>产生订单总数（个数）</h3>
          <div class="list_chart order_lists">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="orderColumnNum" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumnNum_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="orderColumnNum1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumnNum1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="orderColumnNum2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumnNum2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>产生订单总数（个数）</h3>
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
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data.slice(0,3)" :key='index'>{{item}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data.slice(3,6)" :key='index'>{{item}}</div>
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
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data.slice(6,9)" :key='index'>{{item}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 10px 0;">
              <p style="padding-bottom:20px;">2018年统计</p>
              <div class="left-table" style="page-break-after:always;">
                <div class="list_data">
                  <div class="title-table-jidu">第一季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data1.slice(0,3)" :key='index'>{{item}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data1.slice(3,6)" :key='index'>{{item}}</div>
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
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data1.slice(6,9)" :key='index'>{{item}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data1.slice(9,12)" :key='index'>{{item}}</div>
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
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data2.slice(0,3)" :key='index'>{{item}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data2.slice(3,6)" :key='index'>{{item}}</div>
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
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data2.slice(6,9)" :key='index'>{{item}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>产生订单总数</div>
                    <div v-for="(item, index) in orderColumnNum.data2.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>订单总额</h3>
          <div class="list_chart order_lists">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="orderColumnGram" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumnGram_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="orderColumnGram1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumnGram1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="orderColumnGram2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="orderColumnGram2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>流动资金需求情况</h3>
          <div class="list_chart order_lists">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="fundingGap" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGap_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="fundingGap1" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGap1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="fundingGap2" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGap2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>流动资金需求情况</h3>
          <div class="list_chart order_lists">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="fundingGram" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGram_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="fundingGram1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGram1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="fundingGram2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGram2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>流动资金需求情况</h3>
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
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 10px 0;">
              <p style="padding-bottom:20px;">2018年统计</p>
              <div class="left-table" style="page-break-after:always;">
                <div class="list_data">
                  <div class="title-table-jidu">第一季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(0,3)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>流动资金需求</div>
                    <div v-for="(item, index) in fundingGram.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>资金需求</h3>
          <div class="list_chart order_lists">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="fundingGapLine" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGapLine_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="fundingGapLine1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGapLine1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="fundingGapLine2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="fundingGapLine2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list">
          <h3>交易逾期情况</h3>
          <div class="list_chart overdue order_lists" style="page-break-after:always;">
            <div class="order_left">
              <p>2017年统计</p>
              <div class="left_right">
                <div class="p" v-if="payableBeOverdue.data.length > 0">
                  <p>采购交易订单总数：<span>{{payableBeOverdue.data[0].value + payableBeOverdue.data[1].value}}（笔）</span></p>
                  <p>采购结算逾期订单笔数：<span>{{payableBeOverdue.data[0].value}}（笔）</span></p>
                  <p>采购按时结算订单笔数：<span>{{payableBeOverdue.data[1].value}}（笔）</span></p>
                </div>
                <div class="left_right_right">
                  <div id="payableBeOverdue" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
                  <img :src="payableBeOverdue_img" alt="" v-if='Number(prints) === 1'>
                </div>
              </div>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div class="left_right">
                <div class="p" v-if="payableBeOverdue.data1.length > 0">
                  <p>采购交易订单总数：<span>{{payableBeOverdue.data1[0].value + payableBeOverdue.data1[1].value}}（笔）</span></p>
                  <p>采购结算逾期订单笔数：<span>{{payableBeOverdue.data1[0].value}}（笔）</span></p>
                  <p>采购按时结算订单笔数：<span>{{payableBeOverdue.data1[1].value}}（笔）</span></p>
                </div>
                <div class="left_right_right">
                  <div id="payableBeOverdue1" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
                  <img :src="payableBeOverdue1_img" alt="" v-if='Number(prints) === 1'>
                </div>
              </div>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div class="left_right">
                <div class="p" v-if="payableBeOverdue.data2.length > 0">
                  <p>采购交易订单总数：<span>{{payableBeOverdue.data2[0].value + payableBeOverdue.data2[1].value}}（笔）</span></p>
                  <p>采购结算逾期订单笔数：<span>{{payableBeOverdue.data2[0].value}}（笔）</span></p>
                  <p>采购按时结算订单笔数：<span>{{payableBeOverdue.data2[1].value}}（笔）</span></p>
                </div>
                <div class="left_right_right">
                  <div id="payableBeOverdue2" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
                  <img :src="payableBeOverdue2_img" alt="" v-if='Number(prints) === 1'>
                </div>
              </div>
            </div>
          </div>
          <div class="list_chart overdue order_lists" style="page-break-after:always;">
            <div class="order_left">
              <p>2017年统计</p>
              <div class="left_right">
                <div class="p" v-if="receivedBeOverdue.data.length > 0">
                  <p>销售交易订单总数：<span>{{receivedBeOverdue.data[0].value + receivedBeOverdue.data[1].value}}（笔）</span></p>
                  <p>销售结算逾期订单笔数：<span>{{receivedBeOverdue.data[0].value}}（笔）</span></p>
                  <p>销售按时结算订单笔数：<span>{{receivedBeOverdue.data[1].value}}（笔）</span></p>
                </div>
                <div class="left_right_right">
                  <div id="receivedBeOverdue" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
                  <img :src="receivedBeOverdue_img" alt="" v-if='Number(prints) === 1'>
                </div>
              </div>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div class="left_right">
                <div class="p" v-if="receivedBeOverdue.data1.length > 0">
                  <p>销售交易订单总数：<span>{{receivedBeOverdue.data1[0].value + receivedBeOverdue.data1[1].value}}（笔）</span></p>
                  <p>销售结算逾期订单笔数：<span>{{receivedBeOverdue.data1[0].value}}（笔）</span></p>
                  <p>销售按时结算订单笔数：<span>{{receivedBeOverdue.data1[1].value}}（笔）</span></p>
                </div>
                <div class="left_right_right">
                  <div id="receivedBeOverdue1" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
                  <img :src="receivedBeOverdue1_img" alt="" v-if='Number(prints) === 1'>
                </div>
              </div>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div class="left_right">
                <div class="p" v-if="receivedBeOverdue.data2.length > 0">
                  <p>销售交易订单总数：<span>{{receivedBeOverdue.data2[0].value + receivedBeOverdue.data2[1].value}}（笔）</span></p>
                  <p>销售结算逾期订单笔数：<span>{{receivedBeOverdue.data2[0].value}}（笔）</span></p>
                  <p>销售按时结算订单笔数：<span>{{receivedBeOverdue.data2[1].value}}（笔）</span></p>
                </div>
                <div class="left_right_right">
                  <div id="receivedBeOverdue2" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
                  <img :src="receivedBeOverdue2_img" alt="" v-if='Number(prints) === 1'>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <div class="list_chart order_lists">
            <h3>应收账款/已收账款</h3>
            <div class="order_left">
              <p>2017年统计</p>
              <div id="receivableAccepted" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="receivableAccepted_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="receivableAccepted1" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="receivableAccepted1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="receivableAccepted2" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="receivableAccepted2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <div class="list_chart order_lists">
            <h3>应付账款/已付账款</h3>
            <div class="order_left">
              <p>2017年统计</p>
              <div id="payableAccepted" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="payableAccepted_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="payableAccepted1" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="payableAccepted1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="payableAccepted2" style="width:800px; height:350px;" v-if='Number(prints) !== 1'></div>
              <img :src="payableAccepted2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="list_chart order_lists">
            <loanStatus :prints_n='prints_n' />
          </div>
        </div>
      </div>
      <!-- 供应链交易大数据画像 -->
      <div class="transaction_statistics">
        <h2>供应链交易大数据画像</h2>
        <div class="list">
          <div class="list_chart order_lists">
            <BigDataPortrait :prints_n='prints_n' :timezone='timezone' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
// 贷款状况统计
import loanStatus from './transaction/loan_status.vue'
// 供应链交易大数据画像
import BigDataPortrait from '../historical_transactions/robot.vue'
export default {
  name: 'transaction_statistics',
  data () {
    return {
      company_id: '',
      tableTitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      prints_n: 0,
      // 饼图----订单
      orderStatus: {
        titles: '订单情况（年统计）',
        legend: ['已完成订单', '未完成订单', '取消订单'],
        data: [],
        data1: [],
        data2: [],
        color: ['#7498f7', 'sandybrown', '#f3655d', '']
      },
      orderStatus_img: '',
      orderStatus1_img: '',
      orderStatus2_img: '',
      // 柱状图----订单----产生订单金额--
      orderGram: {
        titles: '订单情况（年统计）',
        legend: '产生订单金额',
        xAxis: [],
        data: [],
        xAxis1: [],
        data1: [],
        xAxis2: [],
        data2: [],
        color: ['#7498f7']
      },
      orderColumn_img: '',
      orderColumn1_img: '',
      orderColumn2_img: '',
      // 柱状图----订单----产生订单个数--
      orderColumnNum: {
        titles: '订单情况（年统计）',
        legend: '产生订单总数',
        xAxis: [],
        data: [],
        xAxis1: [],
        data1: [],
        xAxis2: [],
        data2: [],
        color: ['#7498f7']
      },
      orderColumnNum_img: '',
      orderColumnNum1_img: '',
      orderColumnNum2_img: '',
      // 订单金额-折线图
      orderColumn: {
        title: '订单金额',
        color: ['#5793f3', 'sandybrown'],
        legend: ['采购订单', '销售订单'],
        data1: [],
        data2: [],
        // order_amount_list: [],
        xAxis: []
      },
      orderColumnGram_img: '',
      orderColumn1: {
        title: '订单金额',
        color: ['#5793f3', 'sandybrown'],
        legend: ['采购订单', '销售订单'],
        data1: [],
        data2: [],
        // order_amount_list: [],
        xAxis: []
      },
      orderColumnGram1_img: '',
      orderColumn2: {
        title: '订单金额',
        color: ['#5793f3', 'sandybrown'],
        legend: ['采购订单', '销售订单'],
        data1: [],
        data2: [],
        // order_amount_list: [],
        xAxis: []
      },
      orderColumnGram2_img: '',
      // 流动资金缺口情况
      fundingGap: {
        titles: '流动资金需求情况',
        legend: ['融资资金', '自筹资金', '未解决资金'],
        data: [],
        data1: [],
        data2: [],
        color: ['#7498f7', 'sandybrown', '#f3655d', '']
      },
      fundingGap_img: '',
      fundingGap1_img: '',
      fundingGap2_img: '',
      // 流动资金缺口情况
      fundingGram: {
        titles: '流动资金需求情况',
        legend: '流动资金产生金额',
        xAxis: [],
        data: [],
        xAxis1: [],
        data1: [],
        xAxis2: [],
        data2: [],
        color: ['#7498f7']
      },
      fundingGram_img: '',
      fundingGram1_img: '',
      fundingGram2_img: '',
      // 流动资金折线图
      fundingGapLine: {
        title: '订单金额',
        legend: ['资金缺口', '融资资金', '自筹资金', '资金总额'],
        color: ['#f3655d', 'sandybrown', '#44e9a7', '#7498f7'],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        xAxis: []
      },
      fundingGapLine_img: '',
      fundingGapLine1: {
        title: '订单金额',
        legend: ['资金缺口', '融资资金', '自筹资金', '资金总额'],
        color: ['#f3655d', 'sandybrown', '#44e9a7', '#7498f7'],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        xAxis: []
      },
      fundingGapLine1_img: '',
      fundingGapLine2: {
        title: '订单金额',
        legend: ['资金缺口', '融资资金', '自筹资金', '资金总额'],
        color: ['#f3655d', 'sandybrown', '#44e9a7', '#7498f7'],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        xAxis: []
      },
      fundingGapLine2_img: '',
      // 应付交易逾期情况
      payableBeOverdue: {
        titles: '交易逾期情况',
        legend: ['按时结算订单', '结算逾期订单'],
        data: [],
        data1: [],
        data2: [],
        color: ['#f3655d', '#7498f7', '', '']
      },
      payableBeOverdue_img: '',
      payableBeOverdue1_img: '',
      payableBeOverdue2_img: '',
      // 应收交易逾期情况
      receivedBeOverdue: {
        titles: '交易逾期情况',
        legend: ['按时结算订单', '结算逾期订单'],
        data: [],
        data1: [],
        data2: [],
        color: ['#f3655d', 'sandybrown', '', '']
      },
      receivedBeOverdue_img: '',
      receivedBeOverdue1_img: '',
      receivedBeOverdue2_img: '',
      // 应收账款/已收账款-复合饼图
      receivableAccepted: {
        titles: '应收账款/已收账款',
        legend: ['正常已收账款', '逾期已收账款', '正常未收账款', '逾期未收账款'],
        data: [],
        data1: [],
        data2: [],
        color: ['sandybrown', '#eec557', '#FFC1C1', '#ef4136']
      },
      receivableAccepted_img: '',
      receivableAccepted1_img: '',
      receivableAccepted2_img: '',
      // 应付账款/已付账款-复合饼图
      payableAccepted: {
        titles: '应付账款/已付账款',
        legend: ['正常已付账款', '逾期已付账款', '正常未付账款', '逾期未付账款'],
        data: [],
        data1: [],
        data2: [],
        color: ['#7498f7', 'lightskyblue', '#FFC1C1', '#ef4136']
      },
      payableAccepted_img: '',
      payableAccepted1_img: '',
      payableAccepted2_img: '',
      flag: false,
      // 产生订单总数--
      btnName: ['金额', '个数'],
      activeCount: 0,
      activeCount1: 0,
      // 下拉菜单
      orderSelect: '2018',
      orderSelect1: '2018',
      orderSelect2: '2018',
      orderSelect3: '2018',
      orderSelect4: '2018',
      yearOrder: '2018',
      yearGram: '2018',
      yearDate: ['全部', '2017', '2018', '2019'],
      timezone: '总览'
    }
  },
  components: {
    loanStatus,
    BigDataPortrait
  },
  watch: {
    'prints' (n, o) {
      const that = this
      if (Number(n) === 1) {
        that.prints_n = 1
        that.pieImg()
        that.columnImg()
        that.lineImg()
      }
    }
  },
  props: ['prints'],
  mounted () {
    let that = this
    that.company_id = localStorage.id
    // that.company_id = 10100000002
    // 饼图-pie--------订单情况------流动资金缺口情况---------逾期情况--------应收账款/已收账款
    that.Pie()
    // 柱状图-column------------订单情况------流动资金缺口情况
    that.Column()
    // 折线图-line-------订单金额-----------流动资金缺口情况
    that.line()
  },
  methods: {
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
            if (i.seriesName === '流动资金需求情况') {
              str = that.toThousands(i.value) + '（元）'
              str += '  {per|' + i.percent + '%}  '
            } else if (i.seriesName === '订单情况（年统计）') {
              str = i.value + '（笔）'
              str += '  {per|' + i.percent + '%}  '
            } else if (i.seriesName === '交易逾期情况') {
              str = i.value
              str += '  {per|' + i.percent + '%}  '
            } else if (i.seriesName === '应收账款/已收账款') {
              str = that.toThousands(i.value) + '（元）'
              str += '  {per|' + i.percent + '%}  '
            } else if (i.seriesName === '应付账款/已付账款') {
              str = that.toThousands(i.value) + '（元）'
              str += '  {per|' + i.percent + '%}  '
            }
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
    columnChart (e, legend, xAxis, titles, data, colors) {
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
          fontSize: 24,
          fontWeight: 'normal',
          formatter: function (a) {
            let str;
            if (a.seriesName === '产生订单金额') {
              str = that.toThousands(a.value) + '（元）'
            } else if (a.seriesName === '产生订单总数') {
              str = a.value
            } else if (a.seriesName === '流动资金产生金额') {
              str = that.toThousands(a.value) + '（元）'
            }
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
            // console.log(params)
            if (params[0].seriesName === '产生订单总数') {
              let str;
              str = '<div><h3>'+ params[0].name +'</h3>'
              str += '<p>' + legend + '<span>：'+ params[0].value +'</span></p>'
              str +='</div>'
              return str
            } else if (params[0].seriesName === '产生订单金额') {
              let str;
              str = '<div><h3>'+ params[0].name +'</h3>'
              str += '<p>' + legend + '（元）<span>：'+ that.toThousands(params[0].value) +'</span></p>'
              str +='</div>'
              return str
            } else if (params[0].seriesName === '流动资金产生金额') {
              let str;
              str = '<div><h3>'+ params[0].name +'</h3>'
              str += '<p>' + legend + '（元）<span>：'+ that.toThousands(params[0].value) +'</span></p>'
              str +='</div>'
              return str
            } else if (params[0].seriesName === '流动资金产生总数') {
              let str;
              str = '<div><h3>'+ params[0].name +'</h3>'
              str += '<p>' + legend + '<span>：'+ params[0].value +'</span></p>'
              str +='</div>'
              return str
            }
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
            name: legend,
            type: "bar",
            barGap: 0,
            // label: labelOption,
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
    },
    // 折线图
    disintegrationColumn (e, legend, data1, data2, data3, data4, colors) {
      const that = this
      let myChart = echarts.init(document.getElementById(e))
      let option = {
        color: colors,
        tooltip: {
          formatter: function(params) {
            let str;
            str = '<div><h3>'+ params.seriesName +'</h3>'
            str += '<p>时间：<span>'+ params.data[0] +'</span></p>'
            str += '<p>金额（元）：<span>'+ that.toThousands(params.data[1]) +'</span></p>'
            str +='</div>'
            return str
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          orient: "horizontal",
          top: 0,
          left: 'right',
          data: legend
        },
        xAxis: {
          type: "time",
          // min: '2018-01-01',
          // data: ["2018-01-01", "2018-02-01", "2018-03-01", "2018-04-01", "2018-05-01", "2018-06-01", "2018-07-01", "2018-08-01", "2018-09-01", "2018-10-01", "2018-11-01", "2018-12-01"],
          axisLabel: {
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {show: false},
          axisLabel: {
            show: true,
            // 让字体完全显示
            interval: 0
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            // 让字体完全显示
            interval: 0
          }
        },
        series: [
          {
            id: "a",
            type: "line",
            name: legend[0],
            // smooth: true,
            symbolSize: 10,
            data: data1
          },
          {
            id: "b",
            type: "line",
            name: legend[1],
            // smooth: true,
            symbolSize: 10,
            data: data2
          },
          {
            id: "c",
            type: "line",
            // smooth: true,
            name: legend[2],
            symbolSize: 10,
            data: data3
          },
          {
            id: "d",
            type: "line",
            // smooth: true,
            symbolSize: 10,
            name: legend[3],
            data: data4
          }
        ]
      };
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      //自适应宽高
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 将echarts转换为图片
    pieImg () {
      const that = this
      // 订单情况------饼图
      // 2017
      let myChart = echarts.init(document.getElementById('orderStatus'))
      var imgSrc = myChart.getDataURL()
      // 渲染到图表上面，遮住图表
      that.orderStatus_img = imgSrc
      // 2018
      let myChart1 = echarts.init(document.getElementById('orderStatus1'))
      var imgSrc1 = myChart1.getDataURL()
      that.orderStatus1_img = imgSrc1
      // 2019
      let myChart2 = echarts.init(document.getElementById('orderStatus2'))
      var imgSrc2 = myChart2.getDataURL()
      that.orderStatus2_img = imgSrc2
      // 流动资金缺口情况------饼图
      // 2017
      let myChart3 = echarts.init(document.getElementById('fundingGap'))
      var imgSrc3 = myChart3.getDataURL()
      // 渲染到图表上面，遮住图表
      that.fundingGap_img = imgSrc3
      // 2018
      let myChart4 = echarts.init(document.getElementById('fundingGap1'))
      var imgSrc4 = myChart4.getDataURL()
      that.fundingGap1_img = imgSrc4
      // 2019
      let myChart5 = echarts.init(document.getElementById('fundingGap2'))
      var imgSrc5 = myChart5.getDataURL()
      that.fundingGap2_img = imgSrc5
      // 逾期情况------采购订单
      // 2017
      let myChart6 = echarts.init(document.getElementById('payableBeOverdue'))
      var imgSrc6 = myChart6.getDataURL()
      that.payableBeOverdue_img = imgSrc6
      // 2018
      let myChart7 = echarts.init(document.getElementById('payableBeOverdue1'))
      var imgSrc7 = myChart7.getDataURL()
      that.payableBeOverdue1_img = imgSrc7
      // 2019
      let myChart8 = echarts.init(document.getElementById('payableBeOverdue2'))
      var imgSrc8 = myChart8.getDataURL()
      that.payableBeOverdue2_img = imgSrc8
      // 逾期情况------销售订单
      // 2017
      let myChart9 = echarts.init(document.getElementById('receivedBeOverdue'))
      var imgSrc9 = myChart9.getDataURL()
      that.receivedBeOverdue_img = imgSrc9
      // 2018
      let myCharts = echarts.init(document.getElementById('receivedBeOverdue1'))
      var imgSrcs = myCharts.getDataURL()
      that.receivedBeOverdue1_img = imgSrcs
      // 2019
      let myCharts1 = echarts.init(document.getElementById('receivedBeOverdue2'))
      var imgSrcs1 = myCharts1.getDataURL()
      that.receivedBeOverdue2_img = imgSrcs1
      // 应收账款/已收账款---
      // 2017
      let myCharts2 = echarts.init(document.getElementById('payableAccepted'))
      var imgSrcs2 = myCharts2.getDataURL()
      that.payableAccepted_img = imgSrcs2
      // 2018
      let myCharts3 = echarts.init(document.getElementById('payableAccepted1'))
      var imgSrcs3 = myCharts3.getDataURL()
      that.payableAccepted1_img = imgSrcs3
      // 2019
      let myCharts4 = echarts.init(document.getElementById('payableAccepted2'))
      var imgSrcs4 = myCharts4.getDataURL()
      that.payableAccepted2_img = imgSrcs4
      // 应收账款/已收账款---
      // 2017
      let myCharts5 = echarts.init(document.getElementById('receivableAccepted'))
      var imgSrcs5 = myCharts5.getDataURL()
      that.receivableAccepted_img = imgSrcs5
      // 2018
      let myCharts6 = echarts.init(document.getElementById('receivableAccepted1'))
      var imgSrcs6 = myCharts6.getDataURL()
      that.receivableAccepted1_img = imgSrcs6
      // 2019
      let myCharts7 = echarts.init(document.getElementById('receivableAccepted2'))
      var imgSrcs7 = myCharts7.getDataURL()
      that.receivableAccepted2_img = imgSrcs7
    },
    columnImg () {
      const that = this
      // 柱状图-总额
      // 2017
      let myChart = echarts.init(document.getElementById('orderColumn'))
      var imgSrc = myChart.getDataURL()
      // 渲染到图表上面，遮住图表
      that.orderColumn_img = imgSrc
      // 2018
      let myChart1 = echarts.init(document.getElementById('orderColumn1'))
      var imgSrc1 = myChart1.getDataURL()
      that.orderColumn1_img = imgSrc1
      // 2019
      let myChart2 = echarts.init(document.getElementById('orderColumn2'))
      var imgSrc2 = myChart2.getDataURL()
      that.orderColumn2_img = imgSrc2
      // 柱状图-总数
      // 2017
      let myChart3 = echarts.init(document.getElementById('orderColumnNum'))
      var imgSrc3 = myChart3.getDataURL()
      // 渲染到图表上面，遮住图表
      that.orderColumnNum_img = imgSrc3
      // 2018
      let myChart4 = echarts.init(document.getElementById('orderColumnNum1'))
      var imgSrc4 = myChart4.getDataURL()
      that.orderColumnNum1_img = imgSrc4
      // 2019
      let myChart5 = echarts.init(document.getElementById('orderColumnNum2'))
      var imgSrc5 = myChart5.getDataURL()
      that.orderColumnNum2_img = imgSrc5
      // 流动资金缺口情况------柱状图-column
      // 2017
      let myChart6 = echarts.init(document.getElementById('fundingGram'))
      var imgSrc6 = myChart6.getDataURL()
      // 渲染到图表上面，遮住图表
      that.fundingGram_img = imgSrc6
      // 2018
      let myChart7 = echarts.init(document.getElementById('fundingGram1'))
      var imgSrc7 = myChart7.getDataURL()
      that.fundingGram1_img = imgSrc7
      // 2019
      let myChart8 = echarts.init(document.getElementById('fundingGram2'))
      var imgSrc8 = myChart8.getDataURL()
      that.fundingGram2_img = imgSrc8
    },
    lineImg () {
      const that = this
      // ----订单总额----折线图
      // 2017
      let myChart = echarts.init(document.getElementById('orderColumnGram'))
      var imgSrc = myChart.getDataURL()
      // 渲染到图表上面，遮住图表
      that.orderColumnGram_img = imgSrc
      // 2018
      let myChart1 = echarts.init(document.getElementById('orderColumnGram1'))
      var imgSrc1 = myChart1.getDataURL()
      that.orderColumnGram1_img = imgSrc1
      // 2019
      let myChart2 = echarts.init(document.getElementById('orderColumnGram2'))
      var imgSrc2 = myChart2.getDataURL()
      that.orderColumnGram2_img = imgSrc2
      // 流动资金缺口情况------折线图-line
      // 2017
      let myChart3 = echarts.init(document.getElementById('fundingGapLine'))
      var imgSrc3 = myChart3.getDataURL()
      that.fundingGapLine_img = imgSrc3
      // 2018
      let myChart4 = echarts.init(document.getElementById('fundingGapLine1'))
      var imgSrc4 = myChart4.getDataURL()
      that.fundingGapLine1_img = imgSrc4
      // 2019
      let myChart5 = echarts.init(document.getElementById('fundingGapLine2'))
      var imgSrc5 = myChart5.getDataURL()
      that.fundingGapLine2_img = imgSrc5
    },
    // 订单情况------饼图-2017-2018-2019
    Pie () {
      const that = this
      // 订单情况------饼图-pie
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + '2017').then(res => {
        that.orderStatus.data = res.data
        that.pieChart('orderStatus', that.orderStatus.legend, that.orderStatus.titles, that.orderStatus.data, that.orderStatus.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + '2018').then(res => {
        that.orderStatus.data1 = res.data
        that.pieChart('orderStatus1', that.orderStatus.legend, that.orderStatus.titles, that.orderStatus.data1, that.orderStatus.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + '2019').then(res => {
        that.orderStatus.data2 = res.data
        that.pieChart('orderStatus2', that.orderStatus.legend, that.orderStatus.titles, that.orderStatus.data2, that.orderStatus.color)
      })
      // 流动资金缺口情况------饼图-pie
      that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + '2017').then(res => {
        that.fundingGap.data = res.data
        that.pieChart('fundingGap', that.fundingGap.legend, that.fundingGap.titles, that.fundingGap.data, that.fundingGap.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + '2018').then(res => {
        that.fundingGap.data1 = res.data
        that.pieChart('fundingGap1', that.fundingGap.legend, that.fundingGap.titles, that.fundingGap.data1, that.fundingGap.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + '2019').then(res => {
        that.fundingGap.data2 = res.data
        that.pieChart('fundingGap2', that.fundingGap.legend, that.fundingGap.titles, that.fundingGap.data2, that.fundingGap.color)
      })
      // 逾期情况------饼图-overdue_pie
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=overdue_pie' + '&year=' + '2017').then(res => {
        // 采购订单---payable_amount
        that.payableBeOverdue.data = res.data.payable_order
        that.pieChart('payableBeOverdue', that.payableBeOverdue.legend, that.payableBeOverdue.titles, that.payableBeOverdue.data, that.payableBeOverdue.color)
        // 销售订单---received_amount
        that.receivedBeOverdue.data = res.data.received_order
        that.pieChart('receivedBeOverdue', that.receivedBeOverdue.legend, that.receivedBeOverdue.titles, that.receivedBeOverdue.data, that.receivedBeOverdue.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=overdue_pie' + '&year=' + '2018').then(res => {
        // 采购订单---payable_amount
        that.payableBeOverdue.data1 = res.data.payable_order
        that.pieChart('payableBeOverdue1', that.payableBeOverdue.legend, that.payableBeOverdue.titles, that.payableBeOverdue.data1, that.payableBeOverdue.color)
        // 销售订单---received_amount
        that.receivedBeOverdue.data1 = res.data.received_order
        that.pieChart('receivedBeOverdue1', that.receivedBeOverdue.legend, that.receivedBeOverdue.titles, that.receivedBeOverdue.data1, that.receivedBeOverdue.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=overdue_pie' + '&year=' + '2019').then(res => {
        // 采购订单---payable_amount
        that.payableBeOverdue.data2 = res.data.payable_order
        that.pieChart('payableBeOverdue2', that.payableBeOverdue.legend, that.payableBeOverdue.titles, that.payableBeOverdue.data2, that.payableBeOverdue.color)
        // 销售订单---received_amount
        that.receivedBeOverdue.data2 = res.data.received_order
        that.pieChart('receivedBeOverdue2', that.receivedBeOverdue.legend, that.receivedBeOverdue.titles, that.receivedBeOverdue.data2, that.receivedBeOverdue.color)
      })
      // 应收账款/已收账款------饼图-account_amount_pie
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=account_amount_pie' + '&year=' + '2017').then(res => {
        // 应付账款/已付账款
        that.payableAccepted.data = res.data.payable_data.outer
        that.pieChart('payableAccepted', that.payableAccepted.legend, that.payableAccepted.titles, that.payableAccepted.data, that.payableAccepted.color)
        // 应收账款/已收账款
        that.receivableAccepted.data = res.data.reveived_data.outer
        that.pieChart('receivableAccepted', that.receivableAccepted.legend, that.receivableAccepted.titles, that.receivableAccepted.data, that.receivableAccepted.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=account_amount_pie' + '&year=' + '2018').then(res => {
        // 应付账款/已付账款
        that.payableAccepted.data1 = res.data.payable_data.outer
        that.pieChart('payableAccepted1', that.payableAccepted.legend, that.payableAccepted.titles, that.payableAccepted.data1, that.payableAccepted.color)
        // 应收账款/已收账款
        that.receivableAccepted.data1 = res.data.reveived_data.outer
        that.pieChart('receivableAccepted1', that.receivableAccepted.legend, that.receivableAccepted.titles, that.receivableAccepted.data1, that.receivableAccepted.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=account_amount_pie' + '&year=' + '2019').then(res => {
        // 应付账款/已付账款
        that.payableAccepted.data2 = res.data.payable_data.outer
        that.pieChart('payableAccepted2', that.payableAccepted.legend, that.payableAccepted.titles, that.payableAccepted.data2, that.payableAccepted.color)
        // 应收账款/已收账款
        that.receivableAccepted.data2 = res.data.reveived_data.outer
        that.pieChart('receivableAccepted2', that.receivableAccepted.legend, that.receivableAccepted.titles, that.receivableAccepted.data2, that.receivableAccepted.color)
      })
    },
    // 订单情况------柱状图-2017-2018-2019----折线图
    Column () {
      const that = this
      // 订单情况------柱状图-column
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' + '&time_unit=month' + '&year=' + '2017').then(res => {
        // x轴
        that.orderGram.xAxis = res.data.x_axis
        // 完成订单-总额
        that.orderGram.data = res.data.order_value
        // console.log(that.orderGram.data)
        // var result = [];
        // for(var i=0,len = that.orderGram.data.length; i < len;i+=3){
        //   result.push(that.orderGram.data.slice(i,i+3));
        // }
        // console.log(result)
        that.columnChart('orderColumn', that.orderGram.legend, that.orderGram.xAxis, that.orderGram.titles, that.orderGram.data, that.orderGram.color)
        // x轴
        that.orderColumnNum.xAxis = res.data.x_axis
        // 订单个数   orderColumnNum_img
        that.orderColumnNum.data = res.data.order_count
        that.columnChart('orderColumnNum', that.orderColumnNum.legend, that.orderColumnNum.xAxis, that.orderColumnNum.titles, that.orderColumnNum.data, that.orderColumnNum.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' + '&time_unit=month' + '&year=' + '2018').then(res => {
        // x轴
        that.orderGram.xAxis1 = res.data.x_axis
        // 完成订单
        that.orderGram.data1 = res.data.order_value
        that.columnChart('orderColumn1', that.orderGram.legend, that.orderGram.xAxis1, that.orderGram.titles, that.orderGram.data1, that.orderGram.color)
        // x轴
        that.orderColumnNum.xAxis1 = res.data.x_axis
        // 订单个数   
        that.orderColumnNum.data1 = res.data.order_count
        that.columnChart('orderColumnNum1', that.orderColumnNum.legend, that.orderColumnNum.xAxis1, that.orderColumnNum.titles, that.orderColumnNum.data1, that.orderColumnNum.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' + '&time_unit=month' + '&year=' + '2019').then(res => {
        // x轴
        that.orderGram.xAxis2 = res.data.x_axis
        // 完成订单
        that.orderGram.data2 = res.data.order_value
        that.columnChart('orderColumn2', that.orderGram.legend, that.orderGram.xAxis2, that.orderGram.titles, that.orderGram.data2, that.orderGram.color)
        // x轴
        that.orderColumnNum.xAxis2 = res.data.x_axis
        // 订单个数   orderColumnNum_img
        that.orderColumnNum.data2 = res.data.order_count
        that.columnChart('orderColumnNum2', that.orderColumnNum.legend, that.orderColumnNum.xAxis2, that.orderColumnNum.titles, that.orderColumnNum.data2, that.orderColumnNum.color)
      })
      // -------流动资金缺口情况------柱状图-column
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' +'&contract_type=2' + '&time_unit=month' + '&year=' + '2017').then(res => {
        // x轴
        that.fundingGram.xAxis = res.data.x_axis
        // 融资资金
        that.fundingGram.data = res.data.order_value
        that.columnChart('fundingGram', that.fundingGram.legend, that.fundingGram.xAxis, that.fundingGram.titles, that.fundingGram.data, that.fundingGram.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' +'&contract_type=2' + '&time_unit=month' + '&year=' + '2018').then(res => {
        // x轴
        that.fundingGram.xAxis1 = res.data.x_axis
        // 融资资金
        that.fundingGram.data1 = res.data.order_value
        that.columnChart('fundingGram1', that.fundingGram.legend, that.fundingGram.xAxis1, that.fundingGram.titles, that.fundingGram.data1, that.fundingGram.color)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' +'&contract_type=2' + '&time_unit=month' + '&year=' + '2019').then(res => {
        // x轴
        that.fundingGram.xAxis2 = res.data.x_axis
        // 融资资金
        that.fundingGram.data2 = res.data.order_value
        that.columnChart('fundingGram2', that.fundingGram.legend, that.fundingGram.xAxis2, that.fundingGram.titles, that.fundingGram.data2, that.fundingGram.color)
      })
    },
    // 折线图-column_amount
    line () {
      const that = this
      // 订单金额-------折线图-column_amount
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column_amount' + '&year=' + '2017').then(res => {
        // 采购订单---payable_amount
        that.orderColumn.data1 = res.data.payable_amount
        // 销售订单---received_amount
        that.orderColumn.data2 = res.data.received_amount
        // x轴
        that.orderColumn.xAxis = res.data.x_axis
        that.disintegrationColumn('orderColumnGram', that.orderColumn.legend, that.orderColumn.data1, that.orderColumn.data2, '', '', that.orderColumn.colors)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column_amount' + '&year=' + '2018').then(res => {
        // 采购订单---payable_amount
        that.orderColumn1.data1 = res.data.payable_amount
        // 销售订单---received_amount
        that.orderColumn1.data2 = res.data.received_amount
        // x轴
        that.orderColumn1.xAxis = res.data.x_axis
        that.disintegrationColumn('orderColumnGram1', that.orderColumn1.legend, that.orderColumn1.data1, that.orderColumn1.data2, '', '', that.orderColumn1.colors)
      })
      that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column_amount' + '&year=' + '2019').then(res => {
        // 采购订单---payable_amount
        that.orderColumn2.data1 = res.data.payable_amount
        // 销售订单---received_amount
        that.orderColumn2.data2 = res.data.received_amount
        // x轴
        that.orderColumn2.xAxis = res.data.x_axis
        that.disintegrationColumn('orderColumnGram2', that.orderColumn2.legend, that.orderColumn2.data1, that.orderColumn2.data2, '', '', that.orderColumn2.colors)
      })
      // 流动资金缺口情况------折线图-line
      that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=line' + '&year=' + '2017').then(res => {
        // fundingGapLine2_img
        that.fundingGapLine.data1 = res.data.funding_gap
        that.fundingGapLine.data2 = res.data.loan_amount_list
        that.fundingGapLine.data3 = res.data.no_f_amount_list
        that.fundingGapLine.data4 = res.data.payable_amount_list
        that.disintegrationColumn('fundingGapLine', that.fundingGapLine.legend, that.fundingGapLine.data1, that.fundingGapLine.data2, that.fundingGapLine.data3, that.fundingGapLine.data4, that.fundingGapLine.colors)
      })
      that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=line' + '&year=' + '2018').then(res => {
        // fundingGapLine2_img
        that.fundingGapLine1.data1 = res.data.funding_gap
        that.fundingGapLine1.data2 = res.data.loan_amount_list
        that.fundingGapLine1.data3 = res.data.no_f_amount_list
        that.fundingGapLine1.data4 = res.data.payable_amount_list
        that.disintegrationColumn('fundingGapLine1', that.fundingGapLine1.legend, that.fundingGapLine1.data1, that.fundingGapLine1.data2, that.fundingGapLine1.data3, that.fundingGapLine1.data4, that.fundingGapLine1.colors)
      })
      that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=line' + '&year=' + '2019').then(res => {
        // fundingGapLine2_img
        that.fundingGapLine2.data1 = res.data.funding_gap
        that.fundingGapLine2.data2 = res.data.loan_amount_list
        that.fundingGapLine2.data3 = res.data.no_f_amount_list
        that.fundingGapLine2.data4 = res.data.payable_amount_list
        that.disintegrationColumn('fundingGapLine2', that.fundingGapLine2.legend, that.fundingGapLine2.data1, that.fundingGapLine2.data2, that.fundingGapLine2.data3, that.fundingGapLine2.data4, that.fundingGapLine2.colors)
      })
    },
    // 产生订单总数
    tabClick (item, i, o) {
      const that = this
      if (o === 0) {
        that.activeCount = i
        if (i === 0) {
          that.orderGram.legend = '产生订单金额'
          // 订单情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' + '&time_unit=month' + '&year=' + that.yearOrder).then(res => {
            that.flag = true
            // x轴
            that.orderGram.xAxis = res.data.x_axis
            // 完成订单
            that.orderGram.data1 = res.data.order_value
          })
        } else if (i === 1) {
          that.orderGram.legend = '产生订单总数'
          // 订单情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' + '&time_unit=month' + '&year=' + that.yearOrder).then(res => {
            that.flag = true
            // x轴
            that.orderGram.xAxis = res.data.x_axis
            // 完成订单
            that.orderGram.data1 = res.data.order_count
          })
        }
      } else if (o === 1) {
        that.activeCount1 = i
        if (i === 0) {
          that.fundingGram.legend = '流动资金产生金额'
          // 流动资金缺口情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&year=' + that.yearGram + '&e_type=column' +'&contract_type=2' + '&time_unit=month').then(res => {
            that.flag = true
            // x轴
            that.fundingGram.xAxis = res.data.x_axis
            // 融资资金
            that.fundingGram.data1 = res.data.order_value
          })
        } else if (i === 1) {
          that.fundingGram.legend = '流动资金产生总数'
          // 流动资金缺口情况------柱状图-column
          that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&year=' + that.yearGram + '&e_type=column' +'&contract_type=2' + '&time_unit=month').then(res => {
            that.flag = true
            // x轴
            that.fundingGram.xAxis = res.data.x_axis
            // 融资资金
            that.fundingGram.data1 = res.data.order_count
          })
        }
      }
    },
    // 订单情况
    selectChange (i, item) {
      const that = this
      that.yearOrder = item
      that.yearGram = item
      if (item === '全部') {
        item = 'all'
      }
      if (i === 0) {
        // 订单情况------饼图-pie
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + item).then(res => {
          that.orderStatus.data1 = res.data
        })
        // 订单情况------柱状图-column
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column' + '&time_unit=month' + '&year=' + item).then(res => {
          that.flag = true
          // x轴
          that.orderGram.xAxis = res.data.x_axis
          // 完成订单
          that.orderGram.data1 = res.data.order_value
        })
        // 订单金额-------折线图-column_amount
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=column_amount' + '&year=' + item).then(res => {
          // 采购订单---payable_amount
          that.orderColumn.data1 = res.data.payable_amount
          // 销售订单---received_amount
          that.orderColumn.data2 = res.data.received_amount
          // x轴
          that.orderColumn.xAxis = res.data.x_axis
        })
      } else if (i === 1) {
        // 流动资金缺口情况------饼图-pie
        that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=pie' + '&year=' + item).then(res => {
          that.fundingGap.data1 = res.data
        })
        // 流动资金缺口情况------柱状图-column
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&year=' + item + '&e_type=column' +'&contract_type=2' + '&time_unit=month').then(res => {
          that.flag = true
          // x轴
          that.fundingGram.xAxis = res.data.x_axis
          // 融资资金
          that.fundingGram.data1 = res.data.order_value
        })
        // 流动资金缺口情况------折线图-line
        that.$ajax.get('/api/oth/transaction_statistics/capital_gap/?company_id=' + that.company_id + '&e_type=line' + '&year=' + item).then(res => {
          that.fundingGapLine.data1 = res.data.funding_gap
          that.fundingGapLine.data2 = res.data.loan_amount_list
          that.fundingGapLine.data3 = res.data.no_f_amount_list
          that.fundingGapLine.data4 = res.data.payable_amount_list
          // x轴
          that.fundingGapLine.xAxis = res.data.x_axis
        })
      } else if (i === 2) {
        // 逾期情况------饼图-overdue_pie
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=overdue_pie' + '&year=' + item).then(res => {
          // 采购订单---payable_amount
          that.payableBeOverdue.data1 = res.data.payable_order
          // 销售订单---received_amount
          that.receivedBeOverdue.data1 = res.data.received_order
        })
      } else if (i === 3) {
        // 应收账款/已收账款------双层饼图-account_amount_pie
        that.$ajax.get('/api/oth/transaction_statistics/order_statistics/?company_id=' + that.company_id + '&e_type=account_amount_pie' + '&year=' + item).then(res => {
          // 应收账款/已收账款
          that.receivableAccepted.data1 = res.data.reveived_data.outer
          // 应付账款/已付账款
          that.payableAccepted.data1 = res.data.payable_data.outer
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#transaction_statistics {
  .flex-add {
    .transaction_statistics {
      h2 {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        padding-left: 47px;
      }
      .list {
        margin-bottom: 30px;
        padding: 0 30px;
        height: auto;
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
        .select {
          padding: 20px 27px;
          height: 60px;
          select {
            width: 150px;
            height: 30px;
            background: #fff;
            border: 1px solid #cccccc;
            color: #666;
            border-radius: 4px;
            font-size: 12px;
            padding: 0 10px;
            outline: none;
            cursor: pointer;
          }
        }
        .list_chart {
          height: auto;
          margin: 0 0 10px;
          .none {
            text-align: left;
            padding: 30px;
            font-size: 14px;
            margin: 0 auto;
            font-weight: bold;
          }
        }
        .left-table {
          display: flex;
          flex-direction: column;
          .title-table-jidu {
            margin-bottom: 10px;
          }
        }
        .list_data {
          flex: 1;
          margin: 0 10px 20px;
          .table-title {
            display: flex;
            height:54px;
            background:rgba(250,250,250,1);
            flex-direction: row;
            border-bottom: 1px solid rgba(221,221,221,1);
            div {
              width: 30%;
              height: 100%;
              color: #333;
              text-align: right;
              line-height: 54px;
            }
            div:first-child {
              width: 160px;
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
              width: 30%;
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
            div:first-child {
              width: 160px;
            }
            div {
              padding-right: 20px;
            }
          }
        }
        .order_lists {
          text-align: left;
          .order_left {
            display: block;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            p {
              display: block;
              font-size: 16px;
              color: #666;
              padding-left: 20px;
            }
          }
        }
        .zero_number {
          display: flex;
          flex-direction: row;
          .left,.right {
            flex: 1;
          }
          .left {
            border-right: 1px solid #eee;
            padding-right: 15px;
          }
          .right {
            padding-left: 15px;
          }
          .order_left {
            p {
              padding-bottom: 10px;
            }
          }
        }
        .h3_p {
          font-weight: 700;
          font-style: normal;
          line-height: 30px;
          font-size: 14px;
        }
        .list_btn_count {
          button {
            width: 80px;
            height: 28px;
            border: 1px solid #eb6100;
            background: none;
            outline: none;
            border-radius: 2px;
            color: #eb6100;
            margin: 0 10px;
            line-height: 28px;
          }
          .h3_p {
            font-weight: 700;
            font-style: normal;
            line-height: 30px;
            font-size: 14px;
          }
          button:hover {
            background: #eb6100;
            border: 1px solid #eb6100;
            color: #fff;
          }
          .active {
            background: #eb6100;
            border: 1px solid #eb6100;
            color: #fff;
          }
        }
        .none {
          text-align: left;
          padding: 30px;
          font-size: 14px;
          margin: 0 auto;
          font-weight: bold;
        }
        .overdue {
          height: auto;
          .left_right {
            position: relative;
          }
          .p {
            margin-right: 20px;
            margin-top: 14px;
            position: absolute;
            top: 0;
            left: 0;
            p {
              width: 300px;
              line-height: 26px;
              font-size: 14px;
            }
          }
        }
        .accepted {
          height: auto;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
