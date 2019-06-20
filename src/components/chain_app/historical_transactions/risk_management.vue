<template>
  <div id="riskManagement">
    <div class="flex-add">
      <div class="riskManagement">
        <div class="list">
          <h3 class="title"></h3>
          <div class="echarts_list">
            <div class="list_nav">
              <h3>交易数据异常统计</h3>
            </div>
            <div class="list_data">
              <pieChart :chartData='call_the_police' />
            </div>
          </div>
        </div>
        <div class="list">
          <h3 class="title"></h3>
          <div class="echarts_list">
            <div class="list_nav">
              <h3>企业经营风险信息</h3>
            </div>
            <div class="list_data">
              <div class="business_grade">
                <div class="business_name">湖南众鑫新材料科技股份有限公司</div>
                <ul>
                  <li><p>经营状况：<span>无</span></p></li>
                  <li><p>新增风险事件：<span>无</span></p></li>
                </ul>
                <ul>
                  <li><p>信用处罚记录：<span>无</span></p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <h3 class="title"></h3>
          <div class="echarts_list">
            <div class="list_nav">
              <h3>企业行业风险信息</h3>
            </div>
            <div class="list_data">
              <div class="business_grade1">
                <div class="business_name">湖南众鑫新材料科技股份有限公司</div>
                <div class="right_left_list">
                  <div class="right_left">所属行业：</div>
                  <div class="left_right">制造业（冶金）</div>
                </div>
                <div class="right_left_list">
                  <div class="right_left">产品介绍：</div>
                  <div class="left_right">
                    钒作为冶炼合金钢的重要原料，可提高钢的强度、延展性和韧性。钒合金广泛用于交通
                    运输、机械制造、建筑、航天航空等。
                  </div>
                </div>
                <div class="right_left_list">
                  <div class="right_left">环境风险：</div>
                  <div class="left_right">
                    目前我国钒制品的生产企业已达50余家，未来十年钒产品的消费需求仍会持续增
                    加，中型与特色钒企业将批量涌现，业内竞争更加激烈，行业性市场过剩局面在未来
                    几年仍有持续加剧之势，钒产品价格在稳定中保持下滑的趋势近期不会改变。
                  </div>
                </div>
                <div class="right_left_list">
                  <div class="right_left">行业技术风险：</div>
                  <div class="left_right">
                    虽然我国是世界第二大钒产品生产基地，但一些关键技术瓶颈尚未突破，高端钒产
                    品及相关新工艺的开发能力仍然不足，产品的核心竞争力不强。此外，不同钒氮合金生
                    产企业的生产工艺虽然大同小异，但生产过程中原料配比、温度等各项指标对钒氮合金
                    转化率、质量的影响较大。
                  </div>
                </div>
                <div class="right_left_list">
                  <div class="right_left">上下游风险：</div>
                  <div class="left_right">
                    供货量不足、原材料涨价或者质量问题等不可测因素，影响钒氮合金的产量、生
                    产成本。目前钒氮合金大部分用于生产铁合金，其消费量与市场规模与钢材市场息息
                    相关。钒氮合金行业的发展受国内下游产业的波动的影响较大，因其与下游产业的发
                    展和景气状况密切相关，存在一定的由下游产业波动引致的行业波动风险。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 饼图
import pieChart from './echarts/pie_chart'
export default {
  name: 'riskManagement',
  data () {
    return {
      company_id: '',
      // 交易数据异常统计---饼图
      call_the_police: { 
        titles: '交易数据异常统计',
        index: 1,
        color: ['#3AA0FF', '#36CBCB', '#4ECB73', '#FAD337', '#F2637B'],
        legend: ['计划与执行之间时间差超出5天', '实际凭证与上传时间差超出3天','时间的准时性报警','供应链九环平均时间报警', '内容缺失报警'],
        data: [
          {value:11, name:'计划与执行之间时间差超出5天'},
          {value:9, name:'实际凭证与上传时间差超出3天'},
          {value:8, name:'时间的准时性报警'},
          {value:4, name:'供应链九环平均时间报警'},
          {value:6, name:'内容缺失报警'}
        ]
      }
    }
  },
  components: {
    pieChart
  },
  mounted () {
    let that = this
    that.company_id = localStorage.id
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
#riskManagement {
  .riskManagement {
    .list {
      .title {
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(51,51,51,1);
        padding-bottom: 19px;
      }
      .echarts_list {
        width: 100%;
        max-width: 1200px;
        height:auto;
        background:rgba(255,255,255,1);
        margin-bottom: 20px;
        .list_nav {
          border-bottom: 1px solid rgba(221,221,221,1);
          height: 54px;
          padding: 0 30px;
          h3 {
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height: 54px;
            float: left;
          }
          h2 {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height: 44px;
            float: left;
          }
          .li_actives {
            border-bottom: 2px solid #eb6100;
            color: #eb6100;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:bold;
            color:rgba(235,97,0,1);
          }
          .select {
            float: right;
            select {
              min-width: 150px;
              width: auto;
              height: 30px;
              background: #fff;
              border: 1px solid #cccccc;
              color: #666;
              border-radius: 4px;
              font-size: 12px;
              padding: 0 10px;
              outline: none;
              cursor: pointer;
              margin-top: 14px;
            }
          }
        }
        .list_data {
          padding-bottom: 20px;
          .business_grade {
            padding: 20px 20px 0;
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
          .business_grade1 {
            padding: 20px 20px;
            position: relative;
            .business_name {
              font-weight: bold;
              font-size: 14px;
              color: #666;
            }
            .right_left_list {
              display: flex;
              padding-top: 5px;
              .right_left {
                width: 100px;
                display: inline-block;
                font-weight: normal;
                font-size: 13px;
                padding-top: 5px;
                color: #999;
              }
              .left_right {
                width: 100%;
                flex: 1;
                color: #666;
                font-size: 13px;
                margin-top: 5px;
              }
            }
            ul {
              li {
                p {
                  font-weight: normal;
                  font-size: 13px;
                  padding-top: 5px;
                  color: #999;
                  width: 70px;
                  float: left;
                }
                span {
                  float: left;
                  width: 100%;
                  color: #666;
                  font-size: 13px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
