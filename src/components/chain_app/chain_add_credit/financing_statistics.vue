<template>
  <div id="financing_statistics">
    <div class="flex-add">
      <!-- 企业供应链交易信用 -->
      <div class="financing_statistics">
        <!-- 企业供应链交易信用指数 -->
        <div class="list" style="page-break-after:always;">
          <h3>企业供应链交易信用指数C(t)</h3>
          <div class="list_chart">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="creditIndex" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="creditIndex_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="creditIndex1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="creditIndex1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="creditIndex2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="creditIndex2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>企业供应链交易信用指数C(t)</h3>
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
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>交易信用指数C(t)</div>
                    <div v-for="(item, index) in creditIndex.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>应收总池G(t)统计</h3>
          <div class="list_chart">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="gt_data" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="gt_data_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="gt_data1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="gt_data1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="gt_data2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="gt_data2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>应收总池G(t)统计</h3>
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
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应收总池G(t)</div>
                    <div v-for="(item, index) in gt_data.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>应付总池P(t)统计</h3>
          <div class="list_chart">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="disintegrationData" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="disintegrationData_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="disintegrationData1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="disintegrationData1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="disintegrationData2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="disintegrationData2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>应付总池P(t)统计</h3>
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
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data1.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data1.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data1.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data1.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data2.slice(0,3)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第二季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(3,6)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data2.slice(3,6)" :key='index'>{{toThousands(item)}}</div>
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
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data2.slice(6,9)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
                <div class="list_data">
                  <div class="title-table-jidu">第四季度</div>
                  <div class="table-title">
                    <div></div>
                    <div v-for="(item, index) in tableTitle.slice(9,12)" :key='index'>{{item}}</div>
                  </div>
                  <div class="table-line">
                    <div>应付总池P(t)</div>
                    <div v-for="(item, index) in disintegrationData.data2.slice(9,12)" :key='index'>{{toThousands(item)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list" style="page-break-after:always;">
          <h3>总池统计</h3>
          <div class="list_chart">
            <div class="order_left">
              <p>2017年统计</p>
              <div id="ct_gt_pt_data" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="ct_gt_pt_data_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2018年统计</p>
              <div id="ct_gt_pt_data1" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="ct_gt_pt_data1_img" alt="" v-if='Number(prints) === 1'>
            </div>
            <div class="order_left">
              <p>2019年统计</p>
              <div id="ct_gt_pt_data2" style="height:400px;" v-if='Number(prints) !== 1'></div>
              <img :src="ct_gt_pt_data2_img" alt="" v-if='Number(prints) === 1'>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'financing_statistics',
  data () {
    return {
      company_id: '',
      tableTitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 供应链交易信用-柱状图
      // 企业供应链交易信用指数（2018年统计）
      creditIndex: {
        title: ['企业供应链交易信用指数'],
        data: [],
        xAxis: [],
        data1: [],
        xAxis1: [],
        data2: [],
        xAxis2: [],
        color: ['#f3655d']
      },
      creditIndex_img: '',
      creditIndex1_img: '',
      creditIndex2_img: '',
      // 应收总池G(t)统计（2018年统计）-销售-黄色
      gt_data: {
        title: ['应收总池G(t)统计'],
        data: [],
        xAxis: [],
        data1: [],
        xAxis1: [],
        data2: [],
        xAxis2: [],
        color: ['sandybrown']
      },
      gt_data_img: '',
      gt_data1_img: '',
      gt_data2_img: '',
      // 应付总池P(t)统计-采购-蓝色
      disintegrationData: {
        title: ['应付总池P(t)统计'],
        data: [],
        xAxis: [],
        data1: [],
        xAxis1: [],
        data2: [],
        xAxis2: [],
        color: ['#7498f7']
      },
      disintegrationData_img: '',
      disintegrationData1_img: '',
      disintegrationData2_img: '',
      ct_gt_pt_data: {
        title: ['企业供应链交易信用指数', '应收总池G(t)统计', '应付总池P(t)统计'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#f3655d', 'sandybrown', '#7498f7']
      },
      ct_gt_pt_data_img: '',
      ct_gt_pt_data1: {
        title: ['企业供应链交易信用指数', '应收总池G(t)统计', '应付总池P(t)统计'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#f3655d', 'sandybrown', '#7498f7']
      },
      ct_gt_pt_data1_img: '',
      ct_gt_pt_data2: {
        title: ['企业供应链交易信用指数', '应收总池G(t)统计', '应付总池P(t)统计'],
        data1: [],
        data2: [],
        data3: [],
        xAxis: [],
        color: ['#f3655d', 'sandybrown', '#7498f7']
      },
      ct_gt_pt_data2_img: '',
      creditSelect: '2018',
      creditSelect1: '2018',
      creditSelect2: '2018',
      yearDate: ['全部', '2017', '2018', '2019']
    }
  },
  watch: {
    'prints' (n, o) {
      const that = this
      if (Number(n) === 1) {
        that.columnImg()
      }
    }
  },
  props: ['prints'],
  mounted () {
    let that = this
    that.company_id = localStorage.id
    // that.company_id = 10100000002
    // 应付总池P(t)统计-----柱状图-pie
    that.column()
  },
  methods: {
    // 交易信用
    creditChange (i, item) {
      const that = this
      if (item === '全部') {
        // 应付总池P(t)统计-----柱状图-pie
        that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=2018').then(res => {
          that.creditIndex.xAxis = res.data.x_axis
          that.creditIndex.data1 = res.data.credit_data
          that.gt_data.xAxis = res.data.x_axis
          that.gt_data.data1 = res.data.gt_data
          that.disintegrationData.xAxis = res.data.x_axis
          that.disintegrationData.data1 = res.data.payable_data
          that.ct_gt_pt_data.xAxis = res.data.x_axis
          that.ct_gt_pt_data.data1 = res.data.credit_data
          that.ct_gt_pt_data.data2 = res.data.gt_data
          that.ct_gt_pt_data.data3 = res.data.payable_data
        })
      } else {
        // 应付总池P(t)统计-----柱状图-pie
        that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=' + item).then(res => {
          that.creditIndex.xAxis = res.data.x_axis
          that.creditIndex.data1 = res.data.credit_data
          that.gt_data.xAxis = res.data.x_axis
          that.gt_data.data1 = res.data.gt_data
          that.disintegrationData.xAxis = res.data.x_axis
          that.disintegrationData.data1 = res.data.payable_data
          that.ct_gt_pt_data.xAxis = res.data.x_axis
          that.ct_gt_pt_data.data1 = res.data.credit_data
          that.ct_gt_pt_data.data2 = res.data.gt_data
          that.ct_gt_pt_data.data3 = res.data.payable_data
        })
      }
    },
    // 柱状图
    drawChart (e, colors, title, xAxis, data) {
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
            str = '<div><h3>'+ params[0].seriesName +'</h3>'
            str = '<div><h3>'+ params[0].name +'</h3>'
            str += '<p>' + title + '（元）<span>：'+ that.toThousands(params[0].value) +'</span></p>'
            str +='</div>'
            return str
          }
        },
        legend: {
          right: 2,
          top: 0,
          data: title
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 0
            },
            data: xAxis
          }
        ],
        yAxis: [
          {
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 0
            },
            minInterval: 1,
            type: "value"
          }
        ],
        series: [
          {
            name: title[0],
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
      // 在渲染点击事件之前先清除点击事件
      myChart.off('click')
    },
    // 柱状图
    drawChart1 (e, colors, title, xAxis, data, data1, data2) {
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
          fontSize: 20,
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
          data: title
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 0
            },
            data: xAxis
          }
        ],
        yAxis: [
          {
            // 字体样式
            axisLabel: {
              show: true,
              // 让字体完全显示
              interval: 0
            },
            minInterval: 1,
            type: "value"
          }
        ],
        series: [
          {
            name: title[0],
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data
          },
          {
            name: title[1],
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data1
          },
          {
            name: title[2],
            type: "bar",
            barGap: 0,
            // label: labelOption,
            data: data2
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
      // 在渲染点击事件之前先清除点击事件
      myChart.off('click')
    },
    columnImg () {
      const that = this
      // 2017
      let a = echarts.init(document.getElementById('creditIndex'))
      var a1 = a.getDataURL()
      that.creditIndex_img = a1
      // 2018
      let b = echarts.init(document.getElementById('creditIndex1'))
      var b1 = b.getDataURL()
      that.creditIndex1_img = b1
      // 2019
      let c = echarts.init(document.getElementById('creditIndex2'))
      var c1 = c.getDataURL()
      that.creditIndex2_img = c1

      // 2017
      let d = echarts.init(document.getElementById('gt_data'))
      var d1 = d.getDataURL()
      that.gt_data_img = d1
      // 2018
      let e = echarts.init(document.getElementById('gt_data1'))
      var e1 = e.getDataURL()
      that.gt_data1_img = e1
      // 2019
      let f = echarts.init(document.getElementById('gt_data2'))
      var f1 = f.getDataURL()
      that.gt_data2_img = f1

      // 2017
      let g = echarts.init(document.getElementById('disintegrationData'))
      var g1 = g.getDataURL()
      that.disintegrationData_img = g1
      // 2018
      let h = echarts.init(document.getElementById('disintegrationData1'))
      var h1 = h.getDataURL()
      that.disintegrationData1_img = h1
      // 2019
      let r = echarts.init(document.getElementById('disintegrationData2'))
      var r1 = r.getDataURL()
      that.disintegrationData2_img = r1

      // 2017
      let j = echarts.init(document.getElementById('ct_gt_pt_data'))
      var j1 = j.getDataURL()
      that.ct_gt_pt_data_img = j1
      // 2018
      let k = echarts.init(document.getElementById('ct_gt_pt_data1'))
      var k1 = k.getDataURL()
      that.ct_gt_pt_data1_img = k1
      // 2019
      let l = echarts.init(document.getElementById('ct_gt_pt_data2'))
      var l1 = l.getDataURL()
      that.ct_gt_pt_data2_img = l1
    },
    column () {
      let that = this
      // 应付总池P(t)统计-----柱状图-pie
      that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=2017').then(res => {
        that.creditIndex.xAxis = res.data.x_axis
        that.creditIndex.data = res.data.credit_data
        that.drawChart('creditIndex', that.creditIndex.color, that.creditIndex.title, that.creditIndex.xAxis, that.creditIndex.data)
        that.gt_data.xAxis = res.data.x_axis
        that.gt_data.data = res.data.gt_data
        that.drawChart('gt_data', that.gt_data.color, that.gt_data.title, that.gt_data.xAxis, that.gt_data.data)
        that.disintegrationData.xAxis = res.data.x_axis
        that.disintegrationData.data = res.data.payable_data
        that.drawChart('disintegrationData', that.disintegrationData.color, that.disintegrationData.title, that.disintegrationData.xAxis, that.disintegrationData.data)
        that.ct_gt_pt_data.xAxis = res.data.x_axis
        that.ct_gt_pt_data.data1 = res.data.credit_data
        that.ct_gt_pt_data.data2 = res.data.gt_data
        that.ct_gt_pt_data.data3 = res.data.payable_data
        that.drawChart1('ct_gt_pt_data', that.ct_gt_pt_data.color, that.ct_gt_pt_data.title, that.ct_gt_pt_data.xAxis, that.ct_gt_pt_data.data1, that.ct_gt_pt_data.data2, that.ct_gt_pt_data.data3)
      })
      that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=2018').then(res => {
        that.creditIndex.xAxis1 = res.data.x_axis
        that.creditIndex.data1 = res.data.credit_data
        that.drawChart('creditIndex1', that.creditIndex.color, that.creditIndex.title, that.creditIndex.xAxis1, that.creditIndex.data1)
        that.gt_data.xAxis1 = res.data.x_axis
        that.gt_data.data1 = res.data.gt_data
        that.drawChart('gt_data1', that.gt_data.color, that.gt_data.title, that.gt_data.xAxis1, that.gt_data.data1)
        that.disintegrationData.xAxis1 = res.data.x_axis
        that.disintegrationData.data1 = res.data.payable_data
        that.drawChart('disintegrationData1', that.disintegrationData.color, that.disintegrationData.title, that.disintegrationData.xAxis1, that.disintegrationData.data1)
        that.ct_gt_pt_data1.xAxis = res.data.x_axis
        that.ct_gt_pt_data1.data1 = res.data.credit_data
        that.ct_gt_pt_data1.data2 = res.data.gt_data
        that.ct_gt_pt_data1.data3 = res.data.payable_data
        that.drawChart1('ct_gt_pt_data1', that.ct_gt_pt_data1.color, that.ct_gt_pt_data1.title, that.ct_gt_pt_data1.xAxis, that.ct_gt_pt_data1.data1, that.ct_gt_pt_data1.data2, that.ct_gt_pt_data1.data3)
      })
      that.$ajax.get('/api/oth/transaction_statistics/credit_statistics/?company_id=' + that.company_id + '&year=2019').then(res => {
        that.creditIndex.xAxis2 = res.data.x_axis
        that.creditIndex.data2 = res.data.credit_data
        that.drawChart('creditIndex2', that.creditIndex.color, that.creditIndex.title, that.creditIndex.xAxis2, that.creditIndex.data2)
        that.gt_data.xAxis2 = res.data.x_axis
        that.gt_data.data2 = res.data.gt_data
        that.drawChart('gt_data2', that.gt_data.color, that.gt_data.title, that.gt_data.xAxis2, that.gt_data.data2)
        that.disintegrationData.xAxis2 = res.data.x_axis
        that.disintegrationData.data2 = res.data.payable_data
        that.drawChart('disintegrationData2', that.disintegrationData.color, that.disintegrationData.title, that.disintegrationData.xAxis2, that.disintegrationData.data2)
        that.ct_gt_pt_data2.xAxis = res.data.x_axis
        that.ct_gt_pt_data2.data1 = res.data.credit_data
        that.ct_gt_pt_data2.data2 = res.data.gt_data
        that.ct_gt_pt_data2.data3 = res.data.payable_data
        that.drawChart1('ct_gt_pt_data2', that.ct_gt_pt_data2.color, that.ct_gt_pt_data2.title, that.ct_gt_pt_data2.xAxis, that.ct_gt_pt_data2.data1, that.ct_gt_pt_data2.data2, that.ct_gt_pt_data2.data3)
      })
    }
  }
}
</script>

<style lang="less" scoped>
#financing_statistics {
  .flex-add {
    .financing_statistics {
      .list {
        margin-bottom: 30px;
        padding: 0 30px;
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
          position: absolute;
          right: 50px;
          top: 0;
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
          margin: 10px 0;
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
          .none {
            text-align: left;
            padding: 30px;
            font-size: 14px;
            margin: 0 auto;
            font-weight: bold;
          }
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
    }
  }
}
</style>
