<template>
  <div class='claimRegister'>
    <div class='assets_board'>
      <!-- <appNav :father='{selIndex: 2}' type='1'></appNav> -->
      <div class='assets_content'>
        <!-- <div class='assets_list'>
          <h3><img src="../../../static/img/leftbar/myzhaiq.png" alt="">我的债权/债务</h3>
        </div> -->
        <div class="title_location">
          <location :location="location"></location>
        </div>
        <div class="c_assets_bottom">
          <div class="content">
            <div class="content_top">
              <div class="top_left">
                <img src="../../../static/img/claim/1.png" alt="">
                <p>选择已产生{{nameTitle}}的销售项目</p>
              </div>
              <div class="top_center">
                <img src="../../../static/img/claim/dashed.png" alt="">
              </div>
              <div class="top_right">
                <img src="../../../static/img/claim/2.png" alt="">
                <p>选择{{nameTitle}}凭证</p>
              </div>
            </div>
            <div class="content_bottom" v-if="listData.length > 0">
              <ul v-for="(item, index) in listData" :key="index">
                <li>
                  <el-radio v-model="radio" :label="item.id" @change="radioChange(item)"></el-radio>
                  <div>
                    <p>项目名称：</p><span @click="selectFrom(0, item)" :title="item.name">{{ item.name }}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <p>{{nameTitle === '债权' ? '债务人' : '债权人'}}：</p><span @click="selectFrom(1, item)" :title="item.partner_company_name" :style="!item.detail ? 'color: #999; text-decoration: none;' : ''">{{ item.partner_company_name }}</span>
                  </div>
                </li>
                <!-- <li></li> -->
              </ul>
              <div class="block" style="text-align: center;margin-top:30px;">
                <el-pagination v-if="total" @current-change="handleSizeChange"
                  :current-page="currPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </div>
            <div style="text-align:center;font-size:16px;" v-if="listData.length === 0">暂无数据</div>
            <div class="btn">
              <button @click="nextSelect">下一步</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import Location from '@/components/location/location'
export default {
  name: 'claimRegister',
  components: {
    // AppNav,
    Location
  },
  data () {
    return {
      selIndex: 0,
      radio: '',
      listData: [],
      idRadio: '',
      // 分页
      currPage: 1,
      total: '',
      pageSize: 5,
      types: '',
      nameTitle: '',
      company_id: ''
    }
  },
  mounted() {
    const that = this
    that.types = Number(that.$route.query.type)
    that.company_id = localStorage.id
    that.types === 1 ? that.nameTitle = '债权' : that.nameTitle = '债务'
    // 详情
    that.$ajax.get('/api/claims_debts/contract_info/?company_id=' + that.company_id + '&contract_type=' + that.types + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
      if (res.data.results.length > 0) {
        that.listData = res.data.results
        that.total = res.data.count
      }
    })
  },
  beforeCreate () {
    const that = this
    that.types = Number(that.$route.query.type)
    that.types === 1 ? that.nameTitle = '债权' : that.nameTitle = '债务'
    this.location = [
      {
        title: '我的债权/债务',
        url: '/claim_app'
      },
      {
        title: that.nameTitle + '登记'
      }
    ]
  },
  methods: {
    // 跳转链式记账以及企业博客
    selectFrom (i, item) {
      const that = this
      if (i === 0) {
        // 链式记账
        let url = ''
        item.chain_type === '1' ? url = '#/chain_app/receive_chain?id=' : url = '#/chain_app/payment_chain?id='
        window.open(url + item.chain_id, '_blank')
      } else if (i === 1) {
        // 企业博客
        item.detail ? 
        window.open('#/enterpriseBlog?claim=0&bid=' + item.partner_company_id)
        :
        ''
      }
    },
    // 选中数据
    radioChange (item) {
      const that = this
      that.idRadio = item.id
    },
    // 分页
    handleSizeChange (val) {
      const that = this
      that.currPage = val
      // 详情
      that.$ajax.get('/api/claims_debts/contract_info/?company_id=' + that.company_id + '&contract_type=' + that.types + '&page=' + this.currPage + '&page_size=' + this.pageSize).then(res => {
        if (res.data.results.length > 0) {
          that.listData = res.data.results
          that.total = res.data.count
        }
      })
    },
    // 下一步
    nextSelect () {
      const that = this
      if (that.idRadio) {
        that.$router.push({
          path: '/claim_app/claim_voucher',
          query: {
            id: that.idRadio,
            type: that.types
          }
        })
      } else {
        that.$message.error('请选择')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.claimRegister {
  height: 100%;
  .shade_box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.50);
    z-index: 2999;
    .to_display {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .closeWrap{
        position: absolute;
        top: 34px;
        right: 35px;
      }
    }
  }
  .assets_board {
    margin: 0 auto;
    min-height: 100%;
    display: flex;
  }
  .assets_content {
    width: 100%;
    background: #f5f7f8;
    min-height: 100%;
    // 信贷统计
    .assets_list {
      height: 60px;
      // display: flex;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      padding-left: 50px;
      background: #fff;
      img {
        margin-right: 10px;
        vertical-align: middle;
      }
      div {
        display: flex;
        height: 100%;
        align-items: center;
        div {
          font-size: 14px;
          color: #3c4046;
        }
      }
    }
    .c_assets_bottom{
      padding: 0 50px 50px;
      .content {
        width: 100%;
        margin-top: 80px;
        min-width: 1220px;
        height: auto;
        min-height: 300px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(238,238,238,1);
        padding-bottom: 45px;
        .content_top {
          width: 800px;
          height: 156px;
          margin: 0 auto;
          display: flex;
          padding-top: 43px;
          flex-direction: row;
          .top_center {
            flex: 1;
            padding: 0 70px;
            margin-top: 20px;
            text-align: center;
          }
          .top_left {
            width:99px;
            text-align: center;
            p {
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(235,97,0,1);
              line-height:16px;
            }
          }
          .top_right {
            width:99px;
            text-align: center;
            p {
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(153,153,153,1);
            }
          }
        }
        .content_bottom {
          padding: 10px 40px;
          ul {
            height:36px;
            background:rgba(250,250,250,1);
            border:1px solid rgba(238,238,238,1);
            display: flex;
            flex-direction: row;
            margin-bottom: 10px;
            li {
              // width: 500px;
              flex: 1;
              height:36px;
              line-height: 36px;
              padding: 0 20px;
              .el-radio__input.is-checked+.el-radio__label {
                color: #eb6100;
              }
              .el-radio__input.is-checked .el-radio__inner {
                border-color: #eb6100;
                background: #eb6100;
              }
              .el-radio {
                float: left;
                margin-top: 8px;
              }
              div {
                height:34px;
                float: left;
              }
              p {
                float: left;
                width:82px;
                height:34px;
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(102,102,102,1);
                margin-left: 24px;
              }
              span {
                float: left;
                width:350px;
                height:34px;
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:#ea6100;
                text-decoration: underline;
                cursor: pointer;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
        .btn {
          margin-top: 100px;
          text-align: center;
          button {
            width:140px;
            height:36px;
            background:rgba(235,97,0,1);
            border:1px solid rgba(238,238,238,1);
            border-radius:4px;
            outline: none;
            font-size:16px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
          }
        }
      }
    }
    .assets_table {
      margin: 13px 50px 0 50px;
      height: 43px;
      background: #fff;
      border: 1px solid #e1e6f0;
      border-radius: 4px;
      ul {
        height: 100%;
        padding: 0 24px;
        display: flex;
        align-items: center;
        li {
          background: none;
          border: 1px solid #eb6100;
          color: #ea6100;
          margin-right: 22px;
          outline: none;
          border-radius: 2px;
          width: 100px;
          height: 30px;
          font-size: 14px;
          cursor: pointer;
          text-align: center;
          line-height: 30px;
        }
        li.sel {
          background: #eb6100;
          color: #fff;
        }
      }
    }
    .assets_card {
      margin: 20px 50px;
      background: #fff;
      border: 1px solid #e1e6f0;
      box-shadow: 0 2px 10px 0 rgba(153, 153, 153, 0.2);
      margin-bottom: 20px;
      border-radius: 4px;
    }
  }
}
</style>
<style lang='less'>
.claimRegister {
  .el-radio__inner {
    width: 16px;
    height: 16px;
  }
  .el-radio__label {
    display: none;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #eb6100;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #eb6100;
    background: #eb6100;
  }
  .el-radio__inner:hover {
    border-color: #eb6100;
  }
}
</style>
