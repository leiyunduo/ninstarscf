<template>
  <div class="timeModel">
    <div class="model_list" v-if="receivableContract !== ''">
      <div class="top_list">
        <div class="p_span">
          <p>项目名称：</p>
          <el-dropdown @command="selectChange">
            <span class="el-dropdown-link">
              {{select_name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in options" :key="index" :command ="item">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="spans">
          <span>合作企业：</span><span @click="businessBlog" :title="'合作企业：' + receivableContract.partner_company__name" :class="{active: partnerDetail === true}">{{ receivableContract.partner_company__name }}</span>
        </div>
      </div>
      <div class="echarts_list">
        <div class="button_list">
          <button class="list" :class="{isActive: buttonList}" @click="receivableSelectList">全部查看</button>
          <button class="list" :class="{isActive: buttonList1}" @click="receivableSelectDzTime">出单时间</button>
          <button class="list" :class="{isActive: buttonList2}" @click="receivableSelectJzTime">记账时间</button>
          <el-dialog :visible.sync="displayEcharts" :before-close="handleClose">
            <div class="table_list">
              <table v-for="(item, index) in dramData.timeList" :key="index">
                <tr>
                  <th>订单名称</th>
                  <th v-if="item.dz_time">记账时间</th>
                  <th v-if="item.jz_time">记账时间</th>
                  <!-- <th>审核状态</th>
                  <th>确认状态</th> -->
                </tr>
                <tr>
                  <td>{{ item.name }}</td>
                  <td v-if="item.dz_time">{{ item.dz_time }}</td>
                  <td v-if="item.jz_time">{{ item.jz_time }}</td>
                  <!-- <td>{{ item.verified_status }}</td>
                  <td>{{ item.approved_status }}</td> -->
                </tr>
              </table>
            </div>
          </el-dialog>
        </div>
        <div id="receivableEcharts" height='700px'  width="1160px"></div>
      </div>
      <!-- <div class="title_tishi">
        <p><img src="../../../../static/img/chain/green.png" alt=""><span>记账时间在出单时间2天内</span></p>
        <p><img src="../../../../static/img/chain/red.png" alt=""><span>记账时间超出出单时间2天</span></p>
      </div> -->
    </div>
    <div class="model_list1" v-if="receivableContract === ''">应收合同：暂无数据</div>
  </div>
</template>
<script>
const echarts = require('echarts')
function renderItem (params, api) {
  // 依次是圆形、三角形、五边形
  var svgPath = "m210,106l17,0l0,17l-17,0";
  var colors = '#0C8DFF';
  var val = api.value(2);
  if (val == 0) {
    return;
  }
  var xPos = api.value(1);  // 此处为xAxis数据的数组下标
  var yPos = api.value(0);
  var point = api.coord([yPos, xPos]); // 定位
  var itemSize = 16;  // 此处指定图形的大小，不同值不同大小
  return {
    type: 'path',  // 此处设置svg路径类型
    shape: {
      pathData: svgPath, // 图形的svg路径
      width: itemSize,
      height: itemSize,
      x: -itemSize / 2,
      y: -itemSize / 2
    },
    position: point,  // 将图形放到本该在的位置
    style: api.style({
      fill: colors  // 图形颜色
    })
  }
};
function renderItem1 (params, api) {
  // 钻石
  var svgPath = "m-1.025001,9.415l11,-10.5l11,10.5l-11,10.5l-11,-10.5z";
  var colors = '#0C8DFF';
  var val = api.value(2);
  if (val == 0) {
    return;
  }
  var xPos = api.value(1);  // 此处为xAxis数据的数组下标
  var yPos = api.value(0);
  var point = api.coord([yPos, xPos]); // 定位
  var itemSize = 18;  // 此处指定图形的大小，不同值不同大小
  return {
    type: 'path',  // 此处设置svg路径类型
    shape: {
      pathData: svgPath, // 图形的svg路径
      width: itemSize,
      height: itemSize,
      x: -itemSize / 2,
      y: -itemSize / 2
    },
    position: point,  // 将图形放到本该在的位置
    style: api.style({
      fill: colors  // 图形颜色
    })
  }
};
function renderItem2 (params, api) {
  // 三角形
  var svgPath = "m63.1875,76.61313l17,-29.75l17,29.75l-34,0z";
  var colors = '#0C8DFF';
  var val = api.value(2);
  if (val == 0) {
    return;
  }
  var xPos = api.value(1);  // 此处为xAxis数据的数组下标
  var yPos = api.value(0);
  var point = api.coord([yPos, xPos]); // 定位
  var itemSize = 15;  // 此处指定图形的大小，不同值不同大小
  return {
    type: 'path',  // 此处设置svg路径类型
    shape: {
      pathData: svgPath, // 图形的svg路径
      width: itemSize,
      height: itemSize,
      x: -itemSize / 2,
      y: -itemSize / 2
    },
    position: point,  // 将图形放到本该在的位置
    style: api.style({
      fill: colors  // 图形颜色
    })
  }
}
export default {
  name: 'timeModel',
  // 时间模型
  data () {
    return {
      options: [],
      select_name: '',
      datas: '',
      hours: '',
      days: '',
      num: '',
      name: '',
      docData: {},
      data1: [],
      form: '全部',
      dramData: {
        // 出单时间、记账时间、记账时间与出单时间一致
        timeList: [],
        // 出单时间
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
        // 出单时间、记账时间、记账时间与出单时间一致
        timeList: [],
        // 出单时间
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
      // ▼
      yAxiList: ['项目', '电子订单', '订金', '电子仓单', '电子运单', '验收入库单', '结算', '发票', '支付'],
      yAxiListData: [],
      buttonList: true,
      buttonList1: false,
      buttonList2: false,
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
      docTimeData: '',
      // 线
      lineList1: '',
      lineList2: '',
      lineList3: '',
      lineList4: '',
      lineList5: '',
      lineList6: '',
      partnerDetail: false,
      partnerDetailId: ''
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
        that.options = res.data
        that.receivableContract = that.options[0]
        that.select_name = that.options[0].name
        that.receivableClick(that.options[0])
        if (that.options[0].partner_company__detail) {
          that.partnerDetail = true
        }
        that.partnerDetailId = that.options[0].partner_company_id
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    // 下拉查看
    selectChange (command) {
      const that = this
      that.select_name = command.name
      that.receivableContract.partner_company__name = command.partner_company__name
      if (command.partner_company__detail) {
        that.partnerDetail = true
      }
      that.partnerDetailId = command.partner_company_id
      that.receivableClick(command)
    },
    // 跳转企业博客
    businessBlog () {
      const that = this
      if (that.partnerDetail === true) {
        window.open('#/enterpriseBlog?bid=' + that.partnerDetailId + '&chainId=' + that.chainId + '&tTypes=1')
      }
    },
    // 应收合同
    receivableClick (item) {
      var that = this
      that.chainIdList = item.id
      that.$ajax.get('/api/chain/five_stream/scatter_diagram/?contract_id=' + item.id + '&unfold_list=' + that.yAxiList).then(res => {
        that.docTimeData = res.data
        // 出单时间
        that.dramData.documentaryTime = that.docTimeData.dz_time_list
        // 记账时间
        that.dramData.bookeepingTime = that.docTimeData.jz_time_list
        // 重复数据
        that.dramData.cfTimeList = that.docTimeData.cf_time_list
        // 横坐标
        that.dramData.xAxi = that.docTimeData.date_list
        // Y轴纵坐标
        var reg = /([|][^|]+)$/
        let dataY = that.docTimeData.name_list.map(item => {
          let a = item.replace(reg, "")
          return a
        })
        that.dramData.yAxi = dataY
        that.yAxiData(that.dramData.yAxi)
        // 线
        that.lineList1 = that.docTimeData.line_list1
        that.lineList2 = that.docTimeData.line_list2
        that.lineList3 = that.docTimeData.line_list3
        // 标题
        that.dramData.name = that.docTimeData.contract_name
        // 回调
        that.dramEchars('出单时间', '记账时间', '记账时间与出单时间一致', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, that.dramData.documentaryTime, that.dramData.bookeepingTime, that.dramData.cfTimeList, that.lineList1, that.lineList2, that.lineList3)
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 处理Y轴数据
    yAxiData (item, q) {
      const that= this
      console.log(q)
      for (let i in that.yAxiList) {
        for (let j in item) {
          if (that.yAxiList[i] === item[j]) {
            item[j] = item[j] + '▼'
            // if (item[j] === q) {
            //   let str = item[j].slice(0,item[j].length-1)
            //   item[j] = str + '▲'
            // }
          } else {
            // for (let o in that.yAxiListData) {
            //   if (that.yAxiListData[o] === item[j]) {
            //     console.log(item[j])
            //     // let str = item[j].slice(0,item[j].length-1)
            //     item[j] = item[j] + '▲'
            //   }
            // }
          }
        }
      }
    },
    // 全部查看
    receivableSelectList () {
      var that = this
      that.buttonList = true
      that.buttonList1 = false
      that.buttonList2 = false
      that.dramEchars('出单时间', '记账时间', '记账时间与出单时间一致', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, that.dramData.documentaryTime, that.dramData.bookeepingTime, that.dramData.cfTimeList, that.lineList1, that.lineList2, that.lineList3)
    },
    // 出单时间
    receivableSelectDzTime () {
      var that = this
      that.buttonList = false
      that.buttonList1 = true
      that.buttonList2 = false
      that.dramEchars('出单时间', '', '', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, that.dramData.documentaryTime, [], [], [], [], [])
    },
    // 记账时间
    receivableSelectJzTime () {
      var that = this
      that.dramEchars('', '记账时间', '', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, [], that.dramData.bookeepingTime, [], [], [], [])
      that.buttonList = false
      that.buttonList1 = false
      that.buttonList2 = true
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
        color: ['#0C8DFF', '#0C8DFF', '#0C8DFF'],
        legend: {
          // data: ['出单时间', '记账时间', '记账时间与出单时间一致'],
          data: [
            {
              name: '出单时间',
              icon:'square',//强制设置图形正方形
              textStyle: {
                color: '#0C8DFF'
              },
              color: '#0C8DFF'
            },
            {
              name: '记账时间',
              icon:'diamond',//强制设置图形钻石
              textStyle: {
                color: '#0C8DFF'
              },
              color: '#0C8DFF'
            },
            {
              name: '记账时间与出单时间一致',
              icon:'triangle',//强制设置图形三角形
              textStyle: {
                color: '#0C8DFF'
              },
              color: '#0C8DFF'
            }
          ],
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
            if (params.seriesName === '出单时间') {
              for (let i in params.value[3]) {
                // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '出单时间' + '</th>'
                // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].dz_time
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].verified_status
                // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; padding: 0 10px; border-top: none;">' + params.value[3][i].approved_status
                // str += '</td></tr></table>'
                str += '<div style="background:rgba(255,255,255,1);margin-top:20px;border:1px solid rgba(238,238,238,1);box-shadow:0px 0px 10px 0px rgba(51,51,51,0.2);border-radius:10px;color:rgba(102,102,102,1);font-weight:400;font-family:MicrosoftYaHei;font-size:14px;padding:20px;">'
                str += '<div>订单名称：' + params.value[3][i].name.replace(/([|][^|]+)$/, '') +'</div>'
                str += '<div>出单时间：' + params.value[3][i].dz_time +'</div>'
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
                str += '<div style="background:rgba(255,255,255,1);margin-top:20px;border:1px solid rgba(238,238,238,1);box-shadow:0px 0px 10px 0px rgba(51,51,51,0.2);border-radius:10px;color:rgba(102,102,102,1);font-weight:400;font-family:MicrosoftYaHei;font-size:14px;padding:20px;">'
                str += '<div>订单名称：' + params.value[3][i].name.replace(/([|][^|]+)$/, '') +'</div>'
                str += '<div>记账时间：:' + params.value[3][i].jz_time +'</div>'
                str += '</div>'
              }
            } else if (params.seriesName === '记账时间与出单时间一致') {
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
                str += '<div style="background:rgba(255,255,255,1);margin-top:20px;border:1px solid rgba(238,238,238,1);box-shadow:0px 0px 10px 0px rgba(51,51,51,0.2);border-radius:10px;color:rgba(102,102,102,1);font-weight:400;font-family:MicrosoftYaHei;font-size:14px;padding:20px;">'
                  str += '<div>订单名称：' + params.value[3][i].name.replace(/([|][^|]+)$/, '') +'</div>'
                  str += '<div>记账时间：' + params.value[3][i].jz_time +'</div>'
                  str += '</div>'
                } else if (params.value[3][i].dz_time) {
                  // str += '<table style="background: #fff; width: 620px; color: #333; margin-top: 10px; padding: 10px; text-align: center;">'
                  // str += '<tr style="border: 1px solid #d4dbe0;border-top: none;"><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '合同' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '出单时间' + '</th>'
                  // str += '<th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '审核状态' + '</th><th style="width: 150px;height: 40px;background-color: #e6e9ea;line-height: 40px;">' + '确认状态' + '</th></tr>'
                  // str += '<tr style="padding-top: 15px;border: 1px solid #d4dbe0;"><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-top: none; border-right: none; padding: 0 10px;">' + params.value[3][i].name
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].dz_time
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; border-right: none; padding: 0 10px; border-top: none;">' + params.value[3][i].verified_status
                  // str += '</td><td style="width: 150px; height: 40px; line-height: 40px; border: 1px solid #d4dbe0; padding: 0 10px; border-top: none;">' + params.value[3][i].approved_status
                  // str += '</td></tr></table>'
                str += '<div style="background:rgba(255,255,255,1);margin-top:20px;border:1px solid rgba(238,238,238,1);box-shadow:0px 0px 10px 0px rgba(51,51,51,0.2);border-radius:10px;color:rgba(102,102,102,1);font-weight:400;font-family:MicrosoftYaHei;font-size:14px;padding:20px;">'
                  str += '<div>订单名称：' + params.value[3][i].name.replace(/([|][^|]+)$/, '') +'</div>'
                  str += '<div>出单时间：' + params.value[3][i].dz_time +'</div>'
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
        xAxis: [{
          gridIndex: 0,
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
        }],
        yAxis: [{
          gridIndex: 0,
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
        }],
        series: [
          {
            name: dataName,
            type: 'custom', // 自定义图形，此处type为custom
            xAxisIndex: 0,
            yAxisIndex: 0,
            renderItem: renderItem, // 渲染函数
            hoverAnimation: false,
            symbolSize: function (val) {
              return val[2] * 2
            },
            color: ['#0C8DFF'],
            data: data,
            animationDelay: function (idx) {
              return idx * 5
            },
            // emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
            // emphasis: {
            //   itemStyle: {
            //     borderColor: 'rgba(116,96,238,0.30)',
            //     borderWidth: 8,
            //     areaStyle: {color: '#7460ee'}
            //   }
            // },
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderType: 'dashed',
                  borderColor: '#65D449'
                }
              },
              data: lineList1
            }
          },
          {
            name: dataName1,
            type: 'custom', // 自定义图形，此处type为custom
            xAxisIndex: 0,
            yAxisIndex: 0,
            renderItem: renderItem1, // 渲染函数
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
                  borderColor: '#FE5C5E'
                }
              },
              data: lineList2
            }
          },
          {
            name: dataName2,
            type: 'custom', // 自定义图形，此处type为custom
            xAxisIndex: 0,
            yAxisIndex: 0,
            renderItem: renderItem2, // 渲染函数
            hoverAnimation: false,
            symbolSize: function (val) {
              return val[2] * 2
            },
            data: data2,
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
            // markArea: {
            //   silent: true,
            //   itemStyle: {
            //     normal: {
            //       borderWidth: 1,
            //       borderType: 'dashed',
            //       borderColor: 'red'
            //     }
            //   },
            //   data: lineList3
            // }
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
            if (that.yAxiList[i] + '▼' === params.value) {
              // 删除相同的内容
              // let a = that.yAxiList
              // that.yAxiListData = a.splice(that.yAxiList[i], 1)
              // that.$ajax.get('/api/chain/five_stream/scatter_diagram/?contract_id=' + that.chainIdList + '&unfold_list=' + '项目,电子订单,订金,电子仓单,电子运单,验收入库单,结算,发票,支付').then(res => {
              //   that.docTimeData =  res.data
              //   // 出单时间
              //   that.dramData.documentaryTime = that.docTimeData.dz_time_list
              //   // 记账时间
              //   that.dramData.bookeepingTime = that.docTimeData.jz_time_list
              //   // 重复数据
              //   that.dramData.cfTimeList = that.docTimeData.cf_time_list
              //   // 横坐标
              //   that.dramData.xAxi = that.docTimeData.date_list
              //   // Y轴纵坐标
              //   var reg = /([|][^|]+)$/
              //   let dataY = that.docTimeData.name_list.map(item => {
              //     let a = item.replace(reg, "")
              //     return a
              //   })
              //   that.dramData.yAxi = dataY
              //   that.yAxiData(that.dramData.yAxi, params.value)
              //   // 标题
              //   that.dramData.name = that.docTimeData.contract_name
              //   // 线
              //   that.lineList1 = that.docTimeData.line_list1
              //   that.lineList2 = that.docTimeData.line_list2
              //   that.lineList3 = that.docTimeData.line_list3
              //   // 回调
              //   that.dramEchars('出单时间', '记账时间', '记账时间与出单时间一致', that.dramData.name, that.dramData.xAxi, that.dramData.yAxi, that.dramData.documentaryTime, that.dramData.bookeepingTime, that.dramData.cfTimeList, that.lineList1, that.lineList2, that.lineList3)
              // }).catch(err => {
              //   that.$message.error(err.response.data.err_msg)
              // })
            }
          }
        }
      })
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
    border:1px solid rgba(238,238,238,1);
    background:rgba(255,255,255,1);
    position: relative;
    .top_list {
      border-radius: 2px 2px 0 0;
      width: 100%;
      margin-top: 30px;
      height: 50px;
      display: flex;
      flex-direction: row;
      line-height: 50px;
      display: flex;
      flex-direction: row;
      .p_span {
        height: 50px;
        margin-right: 60px;
        p {
          font-family:ArialMT;
          font-size:14px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          padding-left: 38px;
          float: left;
        }
        span {
          cursor: pointer;
          font-family:ArialMT;
          font-size:12px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          // padding-right: 50px;
          display: inline-block;
        }
      }
      .spans {
        span {
          font-family:ArialMT;
          font-size:14px;
          color:#666666;
          letter-spacing:0;
          text-align:left;
          cursor: pointer;
          display: inline-block;
        }
        .active {
          color: #eb6100;
          text-decoration: underline;
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
      border-radius: 0 0 2px 2px;
      width: 100%;
      height: 800px;
      border-top: none;
    }
    .title_tishi {
      position: absolute;
      right: 10%;
      top: 30px;
      img {
        margin-right: 9px;
        float: left;
        margin-top: 3px;
      }
      span {
        float: left;
      }
      p {
        height: 20px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        margin-top: 10px;
      }
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
    width: 1160px;
    height: 700px;
  }
  #payableEcharts {
    margin: 0 auto;
    width: 1160px;
    height: 700px;
  }
  .container {
    margin: 0 auto;
  }
  div {
    .button_list {
      padding: 27px 0 20px 40px;
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
    }
    .list {
      width:100px;
      height:32px;
      text-align: center;
      background:#ffffff;
      border: 1px solid #eb6100;
      color:#eb6100;
    }
    button:hover {
      color:#ffffff;
      background:#eb6100;
      border: none;
    }
    button:nth-child(1) {
      border-right: none;
    }
    button:nth-child(2) {
      border-right: none;
    }
    .isActive {
      color:#ffffff;
      background:#eb6100;
      border: none;
    }
  }
}
</style>

<style lang="less">
.top_list {
  .el-dropdown {
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    font-size: inherit;
    padding: 0 15px;
    min-width: 202px;
    margin-top:10px;
    .el-dropdown-link {
      width:100%;
      float: left;
      i {
        float: right;
        margin-top:7px;
      }
    }
  }
}
</style>
