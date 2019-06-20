<template>
  <div class="enterpriseDetail">
    <div class="enterpriseDetail_box">
      <!-- <appNav :father="{selIndex: 10}"></appNav> -->
      <div class="enterpriseDetail_box_wrap">
        <!-- <div class="topNav">
          <location :location="location"></location>
        </div> -->
        <div class="p_wrap">
          <div class="p_title">
            <img id="bus_ava" :src="$root_url() + Info.avatar" alt="">
            <div class="p_title_text">
              <div>
                <span id="bus_name">{{Info.name}}</span>
                <img src="../../../../static/img/authentication/jiuxing.png" alt="">
                <img src="../../../../static/img/authentication/tw-2.png" alt="">
                <img src="../../../../static/img/authentication/jiuxing.png" alt="">
              </div>
              <p>联系人：<span id="connect_person">{{Info.contact_name}}</span></p>
              <p>联系电话：<span id="connect_phone">{{Info.contact_tel}}</span></p>
            </div>
          </div>
          <div class="p_body">
            <div class="orderInfo">
              <label for="">采购单信息</label>
              <div class="orderTable">
                <div class="orderTitle">
                  <div>商品名称</div>
                  <div>行业名称</div>
                  <div>规格/型号</div>
                  <div>商品描述</div>
                  <div>采购量</div>
                  <div>单位</div>
                </div>
                <div class="orderBody">
                  <div v-if="Info.goods_list.length">
                    <div class="tableLine" v-for="(item, index) in Info.goods_list" :key=index>
                      <div :title='item.product_name'>{{item.product_name}}</div>
                      <div :title='item.industry'>{{item.industry}}</div>
                      <div :title='item.product_spec'>{{item.product_spec}}</div>
                      <div :title='item.product_contents'>{{item.product_contents}}</div>
                      <div :title='item.product_quantity'>{{item.product_quantity}}</div>
                      <div :title='item.product_unit'>{{item.product_unit}}</div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="tableLine">
                      <div>暂无数据</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="c_page">
                <el-pagination
                  @size-change="handleSizeChange('on')"
                  @current-change="handleCurrentChange('on')"
                  :current-page.sync="paginationOn.currentPage"
                  :page-size="100"
                  layout="prev, pager, next, jumper"
                  :total="paginationOn.total">
                </el-pagination>
              </div>
            </div>
            <div class="imageView">
              <label for="">产品图片 (3~6张图片)</label>
              <div class="imgList">
                <div v-for="(item, index) in Info.attachment_list" :key="index" >
                  <img class="imgV" :src="$root_url() + '\\' + item" alt="" @click="showImg($event)">
                  <img class="imgHandle" src="../../../../static/img/other/imgView.png" alt="">
                </div>
              </div>
            </div>
            <div class="Request">
              <label class="title" for="">采购需求</label>
              <div class="Info">
                <div class="InfoRow">
                  <label for="">采购类型：</label>
                  <span id="cg_type">{{Info.sd_type}}</span>
                </div>
                <div class="InfoRow">
                  <label for="">采购时间：</label>
                  <span id="cg_time">{{Info.start_date}}</span>
                </div>
                <div class="InfoRow">
                  <label for="">收货地区：</label>
                  <span id="sh_area">{{Info.zoneName}}</span>
                </div>
              </div>
            </div>
            <div class="Request">
              <label class="title" for="">供应商要求</label>
              <div class="Info">
                <div class="InfoRow">
                  <label for="">税价：</label>
                  <span id="sj">{{Info.is_tax_price}}</span>
                </div>
                <div class="InfoRow">
                  <label for="">结算方式：</label>
                  <span id="settleWay">{{Info.settleWay}}</span>
                </div>
                <div class="InfoRow">
                  <label for="">支付方式：</label>
                  <span id="payWay">{{Info.payWay}}</span>
                </div>
                <div class="InfoRow">
                  <label for="">发票要求：</label>
                  <span id="invoiceRequest">{{Info.invoiceRequest}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- imgView -->
      <div class="imgPreView" v-show="imgView">
        <div class="imgPreView_box">
          <img class="close" @click="imgView = false" src="../../../../static/img/other/close.png" alt="">
          <div class="imgPreView_body">
            <img id="prewView" :src="viewImge" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '../../financing/financingManege'
// import Location from '../../location/location'
export default {
  name: 'enterpriseDetail',
  // components: {
  //   // AppNav, 
  //   Location
  // },
  data () {
    return {
      paginationOn: {
        total: 10,
        currentPage: 1
      },
      Info: {
        avatar: '',
        name: '',
        contact_name: '',
        contact_tel: '',
        sd_type: '',
        start_date: '',
        zoneName: '',
        is_tax_price: '',
        settleWay: '',
        payWay: '',
        invoiceRequest: '',
        goods_list: [],
        attachment_list: []
      },
      imgView: false,
      viewImge: '',
      businessId: ''
    }
  },
  props: ['billId', 'billType'],
  methods: {
    // 分页
    handleSizeChange (state) {

    },
    handleCurrentChange (state) {

    },
    resoveImgBusiness (src) {
      if (src === '/static/default_avatar.png') {
        return 'static/img/tickets/default_business.png';
      } else {
        return this.$root_url() + src
      }
    },
    CoverZoneName (province, city, region) {
      var zone_name = ''
      zone_name = (province || '') + (city || '') + (region || '');
      return zone_name
    },
    showImg (e) {
      this.viewImge = e.target.src || ''
      this.imgView = true
    }
  },
  // beforeCreate () {
  //   this.flag = this.$route.query.id
  //   this.location = [
  //     {
  //       title: '信息发布',
  //       url: '/enterpriseDemand'
  //     },
  //     {
  //       title: '详情'
  //     }
  //   ]
  // },
  mounted () {
    var that = this
    var bill_id = that.billId
    var bill_type = that.billType
    that.businessId = localStorage.id
    // 获取头像
    that.$ajax.get(`/api/company/` + that.businessId).then(res => {
      that.Info.avatar = res.data.avatar
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    that.$ajax.get(`/api/home_page/supply_demand/` + bill_id + '?page=' + 1 + '&bill_type=' + bill_type + '&page_size=' + 5).then(res => {
      this.Info.name = res.data.title || ''
      this.Info.contact_name = res.data.contact_info.contact_name || ''
      this.Info.contact_tel = res.data.contact_info.contact_tel || ''
      this.Info.sd_type = Number(res.data.detail.sd_type) === 1 ? '单次采购' : (Number(res.data.detail.sd_type) === 2 ? '长期采购': '')
      this.Info.start_date = res.data.detail.start_date || ''
      this.Info.zoneName = this.CoverZoneName(res.data.detail.province,res.data.detail.city,res.data.detail.region)
      this.Info.is_tax_price = res.data.detail.is_tax_price ? '含税' : '不含税'
      that.Info.goods_list = res.data.product_list
      that.Info.attachment_list = res.data.picture_list
      // 结算
      if (Number(res.data.detail.settle_type) === 0) {
        this.Info.settleWay = '无要求'
      } else if (Number(res.data.detail.settle_type) === 1) {
        this.Info.settleWay = '现结'
      } else if (Number(res.data.detail.settle_type) === 2) {
        this.Info.settleWay = '指定结算日:  '+ res.data.detail.settle_date 
      } else if (Number(res.data.detail.settle_type) === 3) {
        this.Info.settleWay = '指定账期:  ' + res.data.detail.payment_date
      } else {
        this.Info.settleWay = '其他结算'
      }
      // 支付 
      if (Number(res.data.detail.pay_mode_type) === 0) {
        this.Info.payWay = '无要求'
      } else if (Number(res.data.detail.pay_mode_type) === 1) {
        this.Info.payWay = '现金'
      } else if (Number(res.data.detail.pay_mode_type) === 2) {
        this.Info.payWay = '承兑汇票'
      } else {
        this.Info.payWay = res.data.detail.other_pay_info || ''
      }
      // 发票要求
      if (Number(res.data.detail.invoice_type) === 0) {
        that.Info.invoiceRequest = '无要求'
      } else if (Number(res.data.detail.invoice_type) === 1) {
        that.Info.invoiceRequest = '增值税专用发票'
      } else if (Number(res.data.detail.invoice_type) === 2) {
        that.Info.invoiceRequest = '增值税普通发票'
      } else {
        that.Info.invoiceRequest = res.data.detail.other_invoice_info || '' 
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  }
}
</script>

<style scoped lang='less'>
.enterpriseDetail {
  height: 100%;
  .enterpriseDetail_box {
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
    .enterpriseDetail_box_wrap {
      // width: 100%;
      background: #fff;
      .topNav {
        height: 60px;
        background: #ffffff;
        box-shadow: 2px 0 4px #ddd;
      }
      .p_wrap {
        width: 1080px;
        background: #ffffff;
        margin: 30px auto;
        overflow: hidden;
        border-top: 0;
        .p_title {
          display: flex;
          justify-content: flex-start;
          height: 135px;
          padding: 20px 40px;
          border-bottom: 1px dashed #eaeaea;
          margin: 0 30px;
          img {
            width: 91px;
            height: 91px;
            border-radius: 50%;
            margin-right: 20px;
          }
          .p_title_text>div {
            margin: 10px 0;
            height: 25px;
            line-height: 25px;
            span {
              vertical-align: text-bottom;
              font-size: 18px;
              color: #333;
              font-weight: 600;
            }
            img {
              width: 20px;
              height: 20px;
              margin-right: 5px; 
            }
          }
          .p_title_text p {
            margin: 10px 0;
            color: #666; 
          }
        }
        .p_body {
          .orderInfo {
            margin: 10px 0;
            margin: 10px 30px;
            border-bottom: 1px dashed #eaeaea;
            height: 350px;
            position: relative;
            label {
              color: #333333;
              font-weight: 600;
              display: block;
              border-left: 6px solid #ea6100;
              padding-left: 5px;
              margin: 20px 10px 30px 10px;
            }
            .orderTitle {
              background: #eaeaea;
              display: flex;
              justify-content: space-around;
              height: 40px;
              line-height: 40px;
              text-align: center;
              font-size: 14px;
              div {
                width: 160px;
              }
            }
            .orderBody {
              .tableLine {
                display: flex;
                justify-content: space-around;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                border: 1px solid #eaeaea;
                border-top: 0;
                div {
                  width: 160px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
            .c_page {
              position: absolute;
              bottom: 10px;
              left: 50%;
              transform: translateX(-50%);
            }
          }
          .imageView {
            margin: 10px 0;
            margin: 10px 30px;
            border-bottom: 1px dashed #eaeaea;
            height: 200px;
            label {
              color: #333333;
              font-weight: 600;
              display: block;
              border-left: 6px solid #ea6100;
              padding-left: 5px;
              margin: 20px 10px;
            }
            .imgList {
              height: 140px;
              margin: 0 30px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              div {
                margin: 0 10px;
                position: relative;
                img {
                  width: 143px;
                  height: 98px;
                  -webkit-filter: brightness(100%); /* Chrome, Safari, Opera */
                  filter: brightness(100%);
                  transition: all .4s ease;
                }
                .imgHandle {
                  position: absolute;
                  width: 20px;
                  height: 20px;
                  /* margin-top: 40px; */
                  /* margin-left: -80px; */
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  opacity: 0;
                  transition: all .4s ease;
                  pointer-events: none;
                }
                img:hover {
                  -webkit-filter: brightness(50%); /* Chrome, Safari, Opera */
                  filter: brightness(50%);
                  transition: all .4s ease;
                  cursor: pointer;
                }
                img:hover+.imgHandle {
                  opacity: 1;
                  transition: all .4s ease;
                }
              }
            }
          }
          .Request {
            margin: 10px 0;
            margin: 10px 30px;
            border-bottom: 1px dashed #eaeaea;
            height: auto;
            .title {
              color: #333333;
              font-weight: 600;
              display: block;
              border-left: 6px solid #ea6100;
              padding-left: 5px;
              margin: 20px 10px 30px 10px;
            }
            .Info {
              .InfoRow {
                padding: 10px 20px;
                color: #666;
                label {
                  width: 100px;
                  text-align: left;
                  display: inline-block;
                }
              }
            }
          }
          .Request:last-child {
            border: 0
          }
        }
      }
    }
  }
}
.imgPreView {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  z-index: 10000;
  display: flex;
  margin: 0;
}
.imgPreView .imgPreView_box {
  position: relative;
  overflow: hidden;
  margin: auto;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  box-sizing: border-box;
  width: 50%;
}
.imgPreView .imgPreView_box .close {
  position: absolute;
  right: 15px;
  top: 10px;
}
.imgPreView .imgPreView_box .imgPreView_body {
  // height: 565px;
  margin: 34px 30px;
}
.imgPreView .imgPreView_box .imgPreView_body img {
  width: 100%;
}
</style>

