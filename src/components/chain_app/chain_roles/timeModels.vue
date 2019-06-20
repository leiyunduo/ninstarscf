<template>
  <div class="timeModel">
    <div class="model_list" v-if="receivableContract !== ''">
      <div class="top_list">
        <h3>
          <span :title="'应收合同：' + receivableContract.name">应收合同：{{ receivableContract.name }}</span>
          <span :title="'合作企业：' + receivableContract.partner_company__name">合作企业：{{ receivableContract.partner_company__name }}</span>
        </h3>
        <button @click="receivableClick(receivableContract)">{{ buttonName }}</button>
      </div>
      <div class="echarts_list" v-if="receivableShow">
        <div class="button_list">
          <button class="list" :class="{isActive: buttonList}" @click="receivableSelectList">全部查看</button>
          <button class="list" :class="{isActive: buttonList1}" @click="receivableSelectDzTime">单证时间</button>
          <button class="list" :class="{isActive: buttonList2}" @click="receivableSelectJzTime">记账时间</button>
          <button class="list" :class="{isActive: buttonList3}" @click="receivableSelectDfTime">多重数据</button>
          <el-dialog :visible.sync="displayEcharts" :before-close="handleClose">
            <div class="table_list">
              <table v-for="(item, index) in dramData.timeList" :key="index">
                <tr>
                  <th>合同</th>
                  <th v-if="item.dz_time">单证时间</th>
                  <th v-if="item.jz_time">记账时间</th>
                  <th>审核状态</th>
                  <th>确认状态</th>
                </tr>
                <tr>
                  <td>{{ item.name }}</td>
                  <td v-if="item.dz_time">{{ item.dz_time }}</td>
                  <td v-if="item.jz_time">{{ item.jz_time }}</td>
                  <td>{{ item.verified_status }}</td>
                  <td>{{ item.approved_status }}</td>
                </tr>
              </table>
            </div>
          </el-dialog>
        </div>
        <div id="receivableEcharts" height='700px'  width="1300px"></div>
      </div>
    </div>
    <div class="model_list1" v-if="receivableContract === ''">应收合同：暂无数据</div>
    <div class="model_list" v-if="payableContract !== ''">
      <div class="top_list">
        <h3>
          <span :title="'应付合同：' + payableContract.name">应付合同：{{ payableContract.name }}</span>
          <span :title="'合作企业：' + payableContract.partner_company__name">合作企业：{{ payableContract.partner_company__name }}</span>
        </h3>
        <button @click="payableClick(payableContract)">{{ buttonNames }}</button>
      </div>
      <div class="echarts_list" v-if="payableShow">
        <div class="button_list">
          <button class="list" :class="{isActive: buttonList4}" @click="selectList">全部查看</button>
          <button class="list" :class="{isActive: buttonList5}" @click="selectDzTime">单证时间</button>
          <button class="list" :class="{isActive: buttonList6}" @click="selectJzTime">记账时间</button>
          <button class="list" :class="{isActive: buttonList7}" @click="selectDfTime">多重数据</button>
          <el-dialog :visible.sync="displayEcharts" :before-close="handleClose">
            <div class="table_list">
              <table v-for="(item, index) in dramsData.timeList" :key="index">
                <tr>
                  <th>合同</th>
                  <th v-if="item.dz_time">单证时间</th>
                  <th v-if="item.jz_time">记账时间</th>
                  <th>审核状态</th>
                  <th>确认状态</th>
                </tr>
                <tr>
                  <td>{{ item.name }}</td>
                  <td v-if="item.dz_time">{{ item.dz_time }}</td>
                  <td v-if="item.jz_time">{{ item.jz_time }}</td>
                  <td>{{ item.verified_status }}</td>
                  <td>{{ item.approved_status }}</td>
                </tr>
              </table>
            </div>
          </el-dialog>
        </div>
        <div id="payableEcharts" height='700px'  width="1300px"></div>
      </div>
    </div>
    <div class="model_list1" v-if="payableContract === ''">应付合同：暂无数据</div>
  </div>
</template>
<script>
const echarts = require('echarts')
export default {
  name: 'timeModel',
  // 时间模型
  data () {
    return {
      // 按钮
      buttonName: '展开',
      // 按钮
      buttonNames: '展开',
      // 应收
      receivableShow: false,
      // 应付
      payableShow: false,
      datas: '',
      hours: '',
      days: '',
      num: '',
      name: '',
      docData: {},
      data1: [],
      form: '全部',
      dramData: {
        // 单证时间、记账时间、多重数据
        timeList: [],
        // 单证时间
        documentaryTime: [],
        // 记账时间
        bookeepingTime: [],
        // 重复数据
        cfTimeList: [],
        // 横坐标
        xAxi: [],
        // Y轴纵坐标
        yAxi: [],
      },
      dramsData: {
        // 单证时间、记账时间、多重数据
        timeList: [],
        // 单证时间
        documentaryTime: [],
        // 记账时间
        bookeepingTime: [],
        // 重复数据
        cfTimeList: [],
        // 横坐标
        xAxi: [],
        // Y轴纵坐标
        yAxi: [],
      },
      yAxiList: ['项目', '电子订单', '订金', '电子仓单', '电子运单', '验收入库单', '结算', '发票', '支付'],
      buttonList: true,
      buttonList1: false,
      buttonList2: false,
      buttonList3: false,
      buttonList4: true,
      buttonList5: false,
      buttonList6: false,
      buttonList7: false,
      // 弹框
      displayEcharts: false,
      chainId: '',
      // 应收
      chainIdList: '',
      receivableContract: {
        name: '',
        partner_company__name: ''
      },
      // 应付
      payableIdList: '',
      payableContract: {
        name: '',
        partner_company__name: ''
      },
      docTimeData: '',
      // 线
      lineList1: '',
      lineList2: '',
      lineList3: '',
      lineList4: '',
      lineList5: '',
      lineList6: ''
    }
  },
  mounted () {
    var that = this
    if (that.$route.query.id) {
      that.chainId = that.$route.query.id
    } else {
      that.is404 = 1
    }
    that.$ajax.get(`/api/chain/five_stream/` + that.chainId + `/time_model_list/`).then(res => {
      if (res.data.length > 0) {
        let contract_type1 = res.data.filter(item => {
          if (item.contract_type === '1') {
            that.receivableContract = item
          } else if (item.contract_type === '2') {
            that.payableContract = item
          }
          return item.contract_type === '1'
        })
        // let contract_type2 = res.data.filter(item => {
        //   return item.contract_type === '2'
        // })
        // that.receivableContract = contract_type1
        // that.payableContract = contract_type2
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 应收合同
    receivableClick (item) {
      var that = this
      that.chainIdList = item.id
      if (that.buttonName === '展开') {
        that.buttonName = '闭合'
        that.receivableShow = true
        that.$ajax.get('/api/chain/five_stream/scatter_diagram/?contract_id=' + item.id + '&unfold_list=' + '').then(res => {
          that.docTimeData = res.data
          // 单证时间
          that.dramData.documentaryTime = that.docTimeData.dz_time_list
          // 记账时间
          that.dramData.bookeepingTime = that.docTimeData.jz_time_list
          // 重复数据
          that.dramData.cfTimeList = that.docTimeData.cf_time_list
          // 横坐标
          that.dramData.xAxi = that.docTimeData.date_list
          // Y轴纵坐标
          that.dramData.yAxi = that.docTimeData.name_list
          // 线
          that.lineList1 = that.docTimeData.line_list1
          that.lineList2 = that.docTimeData.line_list2
          that.lineList3 = that.docTimeData.line_list3
          // 标题
          that.dramData.name = that.docTimeData.contract_name
          // 回调
          that.dramEchars('单证时间', '记账时间', '多重数据', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, that.dramData.documentaryTime, that.dramData.bookeepingTime, that.dramData.cfTimeList, that.lineList1, that.lineList2, that.lineList3)
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
        // that.$ajax.post('/api/chain/contract_scatter_diagram2/', {token: that.$token(), contract_id: that.chainIdList, unfold_list: [], chain_id: that.chainId}).then(res => {
        //   if (res.data.code === '1') {
        //     
        //   }
        // })
      } else if (that.buttonName === '闭合') {
        that.buttonName = '展开'
        that.receivableShow = false
      }
    },
    // 应付合同
    payableClick (item) {
      var that = this
      that.payableIdList = item.id
      if (that.buttonNames === '展开') {
        that.buttonNames = '闭合'
        that.payableShow = true
        that.$ajax.get('/api/chain/five_stream/scatter_diagram/?contract_id=' + item.id + '&unfold_list=' + '').then(res => {
          that.docTimeData = res.data
          // 单证时间
          that.dramsData.documentaryTime = that.docTimeData.dz_time_list
          // 记账时间
          that.dramsData.bookeepingTime = that.docTimeData.jz_time_list
          // 重复数据
          that.dramsData.cfTimeList = that.docTimeData.cf_time_list
          // 横坐标
          that.dramsData.xAxi = that.docTimeData.date_list
          // Y轴纵坐标
          that.dramsData.yAxi = that.docTimeData.name_list
          // 线
          that.lineList4 = that.docTimeData.line_list1
          that.lineList5 = that.docTimeData.line_list2
          that.lineList6 = that.docTimeData.line_list3
          // 标题
          that.dramsData.name = that.docTimeData.contract_name
          // 回调
          that.dramEcharsPayable('单证时间', '记账时间', '多重数据', that.dramsData.name, that.dramsData.xAxi, that.dramsData.yAxi, that.dramsData.documentaryTime, that.dramsData.bookeepingTime, that.dramsData.cfTimeList, that.lineList4, that.lineList5, that.lineList6)
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
        // that.$ajax.post('/api/chain/contract_scatter_diagram2/', {token: that.$token(), contract_id: that.payableIdList, unfold_list: [], chain_id: that.chainId}).then(res => {
          
        // })
      } else if (that.buttonNames === '闭合') {
        that.buttonNames = '展开'
        that.payableShow = false
      }
    },
    // 全部查看
    receivableSelectList () {
      var that = this
      that.buttonList = true
      that.buttonList1 = false
      that.buttonList2 = false
      that.buttonList3 = false
      that.dramEchars('单证时间', '记账时间', '多重数据', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, that.dramData.documentaryTime, that.dramData.bookeepingTime, that.dramData.cfTimeList, that.lineList1, that.lineList2, that.lineList3)
    },
    // 单证时间
    receivableSelectDzTime () {
      var that = this
      that.buttonList = false
      that.buttonList1 = true
      that.buttonList2 = false
      that.buttonList3 = false
      that.dramEchars('单证时间', '', '', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, that.dramData.documentaryTime, [], [], [], [], [])
    },
    // 记账时间
    receivableSelectJzTime () {
      var that = this
      that.dramEchars('', '记账时间', '', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, [], that.dramData.bookeepingTime, [], [], [], [])
      that.buttonList = false
      that.buttonList1 = false
      that.buttonList2 = true
      that.buttonList3 = false
    },
    // 多重数据
    receivableSelectDfTime () {
      var that = this
      that.dramEchars('', '', '多重数据', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, [], [], that.dramData.cfTimeList, [], [], [])
      that.buttonList = false
      that.buttonList1 = false
      that.buttonList2 = false
      that.buttonList3 = true
    },
    // 应收动态传入数据
    dramEchars: function (dataName, dataName1, dataName2, name, hours, days, data, data1, data2, lineList1, lineList2, lineList3) {
      var that = this
      // dataName, dataName1, dataName2, name, hours, days, data, data1, data2
      // 数据名称，数据名称1，数据名称2，标题名称，横坐标，纵坐标，数据，数据1，数据2
      var receivableEcharts = document.getElementById('receivableEcharts')
      var myChart = echarts.init(receivableEcharts)
      if (data.length !== 0) {
        data = data.map(function (item) {
          return [item[0], item[1], item[2], item[3]]
        })
        data1 = data1.map(function (item) {
          return [item[0], item[1], item[2], item[3]]
        })
        data2 = data2.map(function (item) {
          return [item[0], item[1], item[2], item[3]]
        })
      }
      var option = {
        title: {
          text: ''
        },
        legend: {
          data: ['单证时间', '记账时间', '多重数据'],
          left: 'right'
          // height: receivableEcharts.style.height
        },
        tooltip: {
          position: 'top',
          enterable: true,
          // trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#eb6100'
            }
          },
          // 背景颜色
          backgroundColor: 'none',
          // 圆点hover时显示的数据
          formatter: function (params) {
            var str = ''
            if (params.seriesName === '单证时间') {
              for (let i in params.value[3]) {
                // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '单证时间' + '</th>'
                // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].dz_time
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].verified_status
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; padding: 0 10px; border-top: none;">' + params.value[3][i].approved_status
                // str += '</td></tr></table>'
                str += '<div style="background: rgba(0,0,0,0.70); border-radius: 4px; margin: 10px; line-height: 26px; padding: 5px 10px;">'
                str += '<div>' + params.value[3][i].name +'</div>'
                str += '<div>单证时间：' + params.value[3][i].dz_time +'</div>'
                str += '<div>审核状态：' + params.value[3][i].verified_status +'</div>'
                str += '<div>确认状态：' + params.value[3][i].approved_status +'</div>'
                str += '</div>'
              }
            } else if (params.seriesName === '记账时间') {
              for (let i in params.value[3]) {
                // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '记账时间' + '</th>'
                // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].jz_time
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].verified_status
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; padding: 0 10px;">' + params.value[3][i].approved_status
                // str += '</td></tr></table>'
                str += '<div style="background: rgba(0,0,0,0.70); border-radius: 4px; margin-top: 10px; line-height: 26px; padding: 5px 10px;">'
                str += '<div>' + params.value[3][i].name +'</div>'
                str += '<div>单证时间:' + params.value[3][i].jz_time +'</div>'
                str += '<div>审核状态：' + params.value[3][i].verified_status +'</div>'
                str += '<div>确认状态：' + params.value[3][i].approved_status +'</div>'
                str += '</div>'
              }
            } else if (params.seriesName === '多重数据') {
              for (let i in params.value[3]) {
                if (params.value[3][i].jz_time) {
                  // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                  // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '记账时间' + '</th>'
                  // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                  // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].jz_time
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].verified_status
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; padding: 0 10px; border-top: none;">' + params.value[3][i].approved_status
                  // str += '</td></tr></table>'
                  str += '<div style="background: rgba(0,0,0,0.70); border-radius: 4px; margin-top: 10px; line-height: 26px; padding: 5px 10px;">'
                  str += '<div>' + params.value[3][i].name +'</div>'
                  str += '<div>单证时间：' + params.value[3][i].jz_time +'</div>'
                  str += '<div>审核状态：' + params.value[3][i].verified_status +'</div>'
                  str += '<div>确认状态：' + params.value[3][i].approved_status +'</div>'
                  str += '</div>'
                } else if (params.value[3][i].dz_time) {
                  // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                  // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '单证时间' + '</th>'
                  // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                  // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].dz_time
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].verified_status
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; padding: 0 10px; border-top: none;">' + params.value[3][i].approved_status
                  // str += '</td></tr></table>'
                  str += '<div style="background: rgba(0,0,0,0.70); border-radius: 4px; margin-top: 10px; line-height: 26px; padding: 5px 10px;">'
                  str += '<div>' + params.value[3][i].name +'</div>'
                  str += '<div>单证时间：' + params.value[3][i].dz_time +'</div>'
                  str += '<div>审核状态：' + params.value[3][i].verified_status +'</div>'
                  str += '<div>确认状态：' + params.value[3][i].approved_status +'</div>'
                  str += '</div>'
                }
              }
            }
            return str
          }
        },
        grid: {
          left: 2,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        color: ['#7460ee', '#66cd2e', 'rgb(30,144,255)'],
        xAxis: {
          type: 'category',
          data: hours,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(204,204,204,0.30)',
              type: 'solid'
            }
          },
          // 字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333333'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(204,204,204,0.30)',
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(204,204,204,0.30)',
              type: 'solid'
            }
          },
          // 字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333333',
              fontWeight: 'bold'
            },
            // 让字体完全显示
            interval: 0
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(204,204,204,0.30)',
              type: 'solid'
            }
          },
          // 点击事件
          triggerEvent: true
        },
        series: [
          {
            name: dataName,
            type: 'scatter',
            hoverAnimation: false,
            symbolSize: function (val) {
              return val[2] * 2
            },
            color: ['#7460ee'],
            data: data,
            animationDelay: function (idx) {
              return idx * 5
            },
            // emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
            emphasis: {
              itemStyle: {
                borderColor: 'rgba(116,96,238,0.30)',
                borderWidth: 8,
                areaStyle: {color: '#7460ee'}
              }
            },
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderType: 'dashed',
                  borderColor: '#66cd2e'
                }
              },
              data: lineList1
            }
          },
          {
            name: dataName1,
            type: 'scatter',
            color: ['#66cd2e'],
            hoverAnimation: false,
            symbolSize: function (val) {
              return val[2] * 2
            },
            data: data1,
            animationDelay: function (idx) {
              return idx * 5
            },
            // emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
            emphasis: {
              itemStyle: {
                borderColor: 'rgba(102,205,46,0.30)',
                borderWidth: 8,
                areaStyle: {color: '#66cd2e'}
              }
            },
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderType: 'dashed',
                  borderColor: '#b41fcc'
                }
              },
              data: lineList2
            }
          },
          {
            name: dataName2,
            type: 'scatter',
            hoverAnimation: false,
            symbolSize: function (val) {
              return val[2] * 2
            },
            data: data2,
            color: ['rgb(30,144,255)'],
            animationDelay: function (idx) {
              return idx * 5
            },
            emphasis: {
              itemStyle: {
                borderColor: 'rgb(30,144,255,0.30)',
                borderWidth: 8,
                areaStyle: {color: 'rgb(30,144,255)'}
              }
            },
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderType: 'dashed',
                  borderColor: 'red'
                }
              },
              data: lineList3
            }
          }
        ]
      }
      // 清除画布
      myChart.clear()
      myChart.setOption(option)
      // 在渲染点击事件之前先清除点击事件
      myChart.off('click')
      myChart.on ('click', function (params) {
        // 圆点的点击
        if (params.componentType === 'series') {
          that.displayEcharts = true
          that.dramData.timeList = params.value[3]
          // Y轴的点击、
        } else if (params.componentType === 'yAxis') {
          for (let i in that.yAxiList) {
            if (that.yAxiList[i] === params.value) {
              that.$ajax.get('/api/chain/five_stream/scatter_diagram/?contract_id=' + that.chainIdList + '&unfold_list=' + '["' + params.value + '"]').then(res => {
                that.docTimeData =  res.data
                // 单证时间
                that.dramData.documentaryTime = that.docTimeData.dz_time_list
                // 记账时间
                that.dramData.bookeepingTime = that.docTimeData.jz_time_list
                // 重复数据
                that.dramData.cfTimeList = that.docTimeData.cf_time_list
                // 横坐标
                that.dramData.xAxi = that.docTimeData.date_list
                // Y轴纵坐标
                that.dramData.yAxi = that.docTimeData.name_list
                // 标题
                that.dramData.name = that.docTimeData.contract_name
                // 线
                that.lineList1 = that.docTimeData.line_list1
                that.lineList2 = that.docTimeData.line_list2
                that.lineList3 = that.docTimeData.line_list3
                // 回调
                that.dramEchars('单证时间', '记账时间', '多重数据', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, that.dramData.documentaryTime, that.dramData.bookeepingTime, that.dramData.cfTimeList, that.lineList1, that.lineList2, that.lineList3)
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
              // unfold_list: [params.value]
            }
          }
        }
      })
    },
    // 应付动态传入数据
    dramEcharsPayable: function (dataName, dataName1, dataName2, name, hours, days, data, data1, data2, lineList1, lineList2, lineList3) {
      var that = this
      // dataName, dataName1, dataName2, name, hours, days, data, data1, data2
      // 数据名称，数据名称1，数据名称2，标题名称，横坐标，纵坐标，数据，数据1，数据2
      var payableEcharts = document.getElementById('payableEcharts')
      var myCharts = echarts.init(payableEcharts)
      if (data.length !== 0) {
        data = data.map(function (item) {
          return [item[0], item[1], item[2], item[3]]
        })
        data1 = data1.map(function (item) {
          return [item[0], item[1], item[2], item[3]]
        })
        data2 = data2.map(function (item) {
          return [item[0], item[1], item[2], item[3]]
        })
      }
      var options = {
        title: {
          text: ''
        },
        legend: {
          data: ['单证时间', '记账时间', '多重数据'],
          left: 'right'
          // height: receivableEcharts.style.height
        },
        tooltip: {
          position: 'top',
          enterable: true,
          // trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#eb6100'
            }
          },
          // 背景颜色
          backgroundColor: 'none',
          // 圆点hover时显示的数据
          formatter: function (params) {
            var str = ''
            if (params.seriesName === '单证时间') {
              for (let i in params.value[3]) {
                // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '单证时间' + '</th>'
                // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].dz_time
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].verified_status
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; padding: 0 10px; border-top: none;">' + params.value[3][i].approved_status
                // str += '</td></tr></table>'
                str += '<div style="background: rgba(0,0,0,0.70); border-radius: 4px; margin: 10px; line-height: 26px; padding: 5px 10px;">'
                str += '<div>' + params.value[3][i].name +'</div>'
                str += '<div>单证时间：' + params.value[3][i].dz_time +'</div>'
                str += '<div>审核状态：' + params.value[3][i].verified_status +'</div>'
                str += '<div>确认状态：' + params.value[3][i].approved_status +'</div>'
                str += '</div>'
              }
            } else if (params.seriesName === '记账时间') {
              for (let i in params.value[3]) {
                // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '记账时间' + '</th>'
                // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].jz_time
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].verified_status
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; padding: 0 10px;">' + params.value[3][i].approved_status
                // str += '</td></tr></table>'
                str += '<div style="background: rgba(0,0,0,0.70); border-radius: 4px; margin-top: 10px; line-height: 26px; padding: 5px 10px;">'
                str += '<div>' + params.value[3][i].name +'</div>'
                str += '<div>单证时间:' + params.value[3][i].jz_time +'</div>'
                str += '<div>审核状态：' + params.value[3][i].verified_status +'</div>'
                str += '<div>确认状态：' + params.value[3][i].approved_status +'</div>'
                str += '</div>'
              }
            } else if (params.seriesName === '多重数据') {
              for (let i in params.value[3]) {
                if (params.value[3][i].jz_time) {
                  // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                  // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '记账时间' + '</th>'
                  // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                  // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].jz_time
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].verified_status
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; padding: 0 10px; border-top: none;">' + params.value[3][i].approved_status
                  // str += '</td></tr></table>'
                  str += '<div style="background: rgba(0,0,0,0.70); border-radius: 4px; margin-top: 10px; line-height: 26px; padding: 5px 10px;">'
                  str += '<div>' + params.value[3][i].name +'</div>'
                  str += '<div>单证时间：' + params.value[3][i].jz_time +'</div>'
                  str += '<div>审核状态：' + params.value[3][i].verified_status +'</div>'
                  str += '<div>确认状态：' + params.value[3][i].approved_status +'</div>'
                  str += '</div>'
                } else if (params.value[3][i].dz_time) {
                  // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                  // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '单证时间' + '</th>'
                  // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                  // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].dz_time
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].verified_status
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; padding: 0 10px; border-top: none;">' + params.value[3][i].approved_status
                  // str += '</td></tr></table>'
                  str += '<div style="background: rgba(0,0,0,0.70); border-radius: 4px; margin-top: 10px; line-height: 26px; padding: 5px 10px;">'
                  str += '<div>' + params.value[3][i].name +'</div>'
                  str += '<div>单证时间：' + params.value[3][i].dz_time +'</div>'
                  str += '<div>审核状态：' + params.value[3][i].verified_status +'</div>'
                  str += '<div>确认状态：' + params.value[3][i].approved_status +'</div>'
                  str += '</div>'
                }
              }
            }
            return str
          }
        },
        grid: {
          left: 2,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        color: ['#7460ee', '#66cd2e', 'rgb(30,144,255)'],
        xAxis: {
          type: 'category',
          data: hours,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(204,204,204,0.30)',
              type: 'solid'
            }
          },
          // 字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333333'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(204,204,204,0.30)',
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(204,204,204,0.30)',
              type: 'solid'
            }
          },
          // 字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333333',
              fontWeight: 'bold'
            },
            // 让字体完全显示
            interval: 0
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(204,204,204,0.30)',
              type: 'solid'
            }
          },
          // 点击事件
          triggerEvent: true
        },
        series: [
          {
            name: dataName,
            type: 'scatter',
            hoverAnimation: false,
            symbolSize: function (val) {
              return val[2] * 2
            },
            color: ['#7460ee'],
            data: data,
            animationDelay: function (idx) {
              return idx * 5
            },
            // emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
            emphasis: {
              itemStyle: {
                borderColor: 'rgba(116,96,238,0.30)',
                borderWidth: 8,
                areaStyle: {color: '#7460ee'}
              }
            },
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderType: 'dashed',
                  borderColor: '#66cd2e'
                }
              },
              data: lineList1
            }
          },
          {
            name: dataName1,
            type: 'scatter',
            color: ['#66cd2e'],
            hoverAnimation: false,
            symbolSize: function (val) {
              return val[2] * 2
            },
            data: data1,
            animationDelay: function (idx) {
              return idx * 5
            },
            // emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
            emphasis: {
              itemStyle: {
                borderColor: 'rgba(102,205,46,0.30)',
                borderWidth: 8,
                areaStyle: {color: '#66cd2e'}
              }
            },
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderType: 'dashed',
                  borderColor: '#b41fcc'
                }
              },
              data: lineList2
            }
          },
          {
            name: dataName2,
            type: 'scatter',
            hoverAnimation: false,
            symbolSize: function (val) {
              return val[2] * 2
            },
            data: data2,
            color: ['rgb(30,144,255)'],
            animationDelay: function (idx) {
              return idx * 5
            },
            emphasis: {
              itemStyle: {
                borderColor: 'rgb(30,144,255,0.30)',
                borderWidth: 8,
                areaStyle: {color: 'rgb(30,144,255)'}
              }
            },
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderType: 'dashed',
                  borderColor: 'red'
                }
              },
              data: lineList3
            }
          }
        ]
      }
      // 清除画布
      myCharts.clear()
      myCharts.setOption(options)
      // 在渲染点击事件之前先清除点击事件
      myCharts.off('click')
      myCharts.on ('click', function (params) {
        console.log(params)
        // 圆点的点击
        if (params.componentType === 'series') {
          that.displayEcharts = true
          that.dramsData.timeList = params.value[3]
          // Y轴的点击、
        } else if (params.componentType === 'yAxis') {
          for (let i in that.yAxiList) {
            if (that.yAxiList[i] === params.value) {
              that.$ajax.get('/api/chain/five_stream/scatter_diagram/?contract_id=' + that.payableIdList + '&unfold_list=' + '["' + params.value + '"]').then(res => {
                that.docTimeData =  res.data
                // 单证时间
                that.dramsData.documentaryTime = that.docTimeData.dz_time_list
                // 记账时间
                that.dramsData.bookeepingTime = that.docTimeData.jz_time_list
                // 重复数据
                that.dramsData.cfTimeList = that.docTimeData.cf_time_list
                // 横坐标
                that.dramsData.xAxi = that.docTimeData.date_list
                // Y轴纵坐标
                that.dramsData.yAxi = that.docTimeData.name_list
                // 线
                that.lineList4 = that.docTimeData.line_list1
                that.lineList5 = that.docTimeData.line_list2
                that.lineList6 = that.docTimeData.line_list3
                // 标题
                that.dramsData.name = that.docTimeData.contract_name
                // 回调
                that.dramEcharsPayable('单证时间', '记账时间', '多重数据', that.dramsData.name, that.dramsData.xAxi, that.dramsData.yAxi, that.dramsData.documentaryTime, that.dramsData.bookeepingTime, that.dramsData.cfTimeList, that.lineList4, that.lineList5, that.lineList6)
              }).catch(err => {
                that.$message.error(err.response.data.err_msg)
              })
            }
          }
        }
      })
    },
    // 全部查看.dramsData
    selectList () {
      var that = this
      that.buttonList4 = true
      that.buttonList5 = false
      that.buttonList6 = false
      that.buttonList7 = false
      that.dramEcharsPayable('单证时间', '记账时间', '多重数据', that.dramsData.name, that.dramsData.xAxi, that.dramsData.yAxi, that.dramsData.documentaryTime, that.dramsData.bookeepingTime, that.dramsData.cfTimeList, that.lineList4, that.lineList5, that.lineList6)
    },
    // 单证时间
    selectDzTime () {
      var that = this
      that.buttonList4 = false
      that.buttonList5 = true
      that.buttonList6 = false
      that.buttonList7 = false
      that.dramEcharsPayable('单证时间', '', '', that.dramsData.name, that.dramsData.xAxi, that.dramsData.yAxi, that.dramsData.documentaryTime, [], [], [], [], [])
    },
    // 记账时间
    selectJzTime () {
      var that = this
      that.dramEcharsPayable('', '记账时间', '', that.dramsData.name, that.dramsData.xAxi, that.dramsData.yAxi, [], that.dramsData.bookeepingTime, [], [], [], [])
      that.buttonList4 = false
      that.buttonList5 = false
      that.buttonList6 = true
      that.buttonList7 = false
    },
    // 多重数据
    selectDfTime () {
      var that = this
      that.dramEcharsPayable('', '', '多重数据', that.dramsData.name, that.dramsData.xAxi, that.dramsData.yAxi, [], [], that.dramsData.cfTimeList, [], [], [])
      that.buttonList4 = false
      that.buttonList5 = false.dramsData
      that.buttonList6 = false
      that.buttonList7 = true
    },
    // 关闭弹框
    handleClose () {
      var that = this
      that.displayEcharts = false
    }
  }
}
</script>
<style lang="less" scoped>
.timeModel {
  width: 100%;
  padding-bottom: 50px;
  .model_list {
    margin: 50px auto;
    width: 100%;
    height: auto;
    .top_list {
      background:#fbfcfd;
      border: 1px solid #cccccc;
      border-radius: 2px 2px 0 0;
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      line-height: 50px;
      h3 {
        flex: 1;
        font-family: Arial-BoldMT;
        font-size: 14px;
        color:#333333;
        letter-spacing: 0;
        text-align: left;
        padding-left: 28px;
        display: flex;
        flex-direction: row;
        span {
          font-family:ArialMT;
          font-size:14px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          display: inline-block;
          padding-right: 20px;
        }
        span:first-child {
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      button {
        background: none;
        border: none;
        outline: none;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#666666;
        letter-spacing:0;
        text-align:left;
        padding-right: 58px;
      }
    }
    .echarts_list {
      background:#ffffff;
      border: 1px solid #cccccc;
      border-radius: 0 0 2px 2px;
      width: 100%;
      height: 800px;
      border-top: none;
    }
  }
  .model_list1 {
    background:#fbfcfd;
    border: 1px solid #cccccc;
    border-radius: 2px 2px 0 0;
    width: 100%;
    height: 50px;
    margin: 20px auto;
    line-height: 50px;
    font-family: Arial-BoldMT;
    font-size: 14px;
    color:#333333;
    letter-spacing: 0;
    text-align: left;
    padding-left: 28px;
  }
  #receivableEcharts {
    margin: 0 auto;
    width: 1300px;
    height: 700px;
  }
  #payableEcharts {
    margin: 0 auto;
    width: 1300px;
    height: 700px;
  }
  .container {
    margin: 0 auto;
  }
  div {
    .button_list {
      padding: 27px 0 20px 0;
      height: 89px;
      display: flex;
      flex-direction: row;
      .table_list {
        overflow-y: scroll;
        height: auto;
        max-height: 600px;
        padding-bottom: 30px;
        table {
          width: 100%;
          margin-top: 20px;
          tr {
            display: flex;
            border: 1px solid #d4dbe0;
            border-top: none;
            th {
              flex: 1;
              height: 40px;
              background-color: #e6e9ea;
              line-height: 40px;
            }
            td {
              text-align: center;
              flex: 1;
              height: 40px;
              line-height: 40px;
              border-right: 1px solid #d4dbe0;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowra;
            }
            td:last-child {
              border: none;
            }
          }
        }
      }
      .table_list::-webkit-scrollbar {
        width: 0;
      }
    }
    select {
      margin-left: 47px;
      background:#ffffff;
      border:1px solid #cccccc;
      border-radius:2px;
      width: 128px;
      height: 28px;
      line-height: 28px;
      padding: 0 16px;
      outline: none;
      border-radius: 5px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color:#999999;
      letter-spacing: 0;
      text-align: left;
    }
    button {
      outline: none;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      letter-spacing: 0;
      text-align: left;
      margin-left: 28px;
    }
    .list {
      border-radius: 2px;
      width: 84px;
      height: 28px;
      text-align: center;
      background:#ffffff;
      border: 1px solid #cccccc;
      border-radius: 2px;
      width: 84px;
      height: 28px;
      color:#999999;
    }
    .isActive {
      color:#ffffff;
      background:#eb6100;
      border: none;
    }
  }
}
</style>
