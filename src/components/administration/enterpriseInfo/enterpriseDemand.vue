<template>
  <div class='enterpriseDemand'>
    <!-- <AppNav :father='{selIndex: 10}' type='1'></AppNav> -->
    <div class='info-enter'>
      <div class="forms">
        <EnterpriseInfo :adminColor="{colorIndex: 'enterpriseDemand'}"></EnterpriseInfo>
        <div class="forms_list">
          <div class="left">
            <div class="card_title">
              <h3>供需发布</h3>
              <ul>
                <li v-for="(item, index) in titleName" :key="index" :class="{active: vueID === index}">
                  <button @click="addInfoList(index)">{{item}}</button>
                </li>
              </ul>
            </div>
            <div class="content" v-if="procurementInfoData.length === 0">
              <div style="text-align:center; color: #999; line-height: 120px">还未提交过供需</div>
            </div>
            <div class="content">
              <div v-for="(item, index) in procurementInfoData" class="content_lists" :key="index">
                <ul>
                  <li>
                    <h3>
                      <img :src="$root_url() + avatar" alt="">
                      <p>{{item.title}}</p>
                      <el-tooltip placement="bottom" effect="light">
                        <div slot="content">
                          <div class="list_btn">
                            <!-- <span class="info" @click="toInfo(item)">详情</span> -->
                            <span class="edit" @click="edit(item)">编辑</span>
                            <span class="release" v-if="item.is_release === true" @click="onTheShelf(item)">下架</span>
                            <span class="release" v-if="item.is_release === false" @click="onTheShelf(item)">上架</span>
                            <span class="release" @click="deletes(item)">删除</span>
                          </div>
                        </div>
                        <div class="el_div_buttons">
                          <el-button><i class="el-icon-arrow-down"></i></el-button>
                        </div>
                      </el-tooltip>
                    </h3>
                  </li>
                  <li class="lis_li">
                    <p>商品名称：</p><span>{{item.product_list[0].product_name}}</span>
                  </li>
                  <li class="lis_li">
                    <p>{{nameTitle}}量：</p><span>{{item.product_list[0].product_quantity}}</span>
                  </li>
                  <li class="lis_li">
                    <p>{{nameTitle}}时间：</p><span>{{item.create_time}}</span>
                  </li>
                  <li class="lis_li">
                    <p>{{nameTitle}}地区：</p><span>{{item.detail.province}}{{item.detail.city}}{{item.detail.region}}</span>
                  </li>
                  <li class="lis_li">
                    <span class="span" v-if="item.is_release === true" >已上架</span>
                    <span class="span" v-if="item.is_release === false">已下架</span> 
                    <!-- <button class="info" @click="toInfo(item)">详情</button>
                    <button class="edit" @click="edit(item)">编辑</button>
                    <button class="release" v-if="item.is_release === true" @click="onTheShelf(item)">下架</button>
                    <button class="release" v-if="item.is_release === false" @click="onTheShelf(item)">上架</button>
                    <button class="release" @click="deletes(item)">删除</button> -->
                  </li>
                  <li class="li_shou">
                    <span class="info" @click="toInfo(item)">查看</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="block">
              <el-pagination v-if="total" @current-change="handleSizeChange"
                :current-page="currPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="right">
            <div class="left_blog">
              <div class="blog">
                <ul>
                  <li v-for="(item, index) in ulName" :class="{active: ulID === index}" :key="index">
                    <p @click="ulList(index)">{{item}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加 -->
    <el-dialog :visible.sync="dialogInstall" title="添加信息" width="60%" :before-close="handleClose">
      <div class="install_list">
        <div class="top">
          <h3>{{nameTitle}}单信息</h3>
          <div class="div-p">
            <p><span>*</span>{{nameTitle}}单标题</p>
            <input type="text" v-model="installAdd.title" placeholder="请输入标题">
          </div>
          <!-- <div class="div-p">
            <p><span>*</span>创建时间</p>
            <el-date-picker v-model="installAdd.date_created" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </div> -->
          <div class="table_list">
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th><div class="cell"><span>*</span>{{nameTitle}}商品名称</div></th>
                    <th><div class="cell">所属行业</div></th>
                    <th><div class="cell">规格/型号</div></th>
                    <th><div class="cell">商品描述</div></th>
                    <th><div class="cell"><span>*</span>采购量</div></th>
                    <th><div class="cell"><span>*</span>单位</div></th>
                    <th><div class="cell">操作</div></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableList" :key="index">
                    <td>{{item.product_name}}</td>
                    <td>{{item.industry}}</td>
                    <td>{{item.product_spec}}</td>
                    <td>{{item.product_contents}}</td>
                    <td>{{item.product_quantity}}</td>
                    <td>{{item.product_unit}}</td>
                    <td><button @click="productExit(item, index)">删除</button></td>
                  </tr>
                </tbody>
              </table>
              <div class="input_list" v-if="flag" >
                <div class="td"><input type="text" name="name" v-model="chainData.name" maxlength="16"></div>
                <div class="td"><input type="text" name="industry" v-model="chainData.industry" maxlength="16"></div>
                <div class="td"><input type="text" name="models" v-model="chainData.models" maxlength="16"></div>
                <div class="td"><input type="text" name="describe" v-model="chainData.describe" maxlength="16"></div>
                <div class="td"><input type="text" name="volume" v-model="chainData.volume" maxlength="16"></div>
                <div class="td"><input type="text" name="company" v-model="chainData.company" maxlength="16"></div>
                <div class="td operate-area" @click="keepAdd($event)" ref="addGoods"><span>保存</span></div>
              </div>
              <div class="tr data add" >
                <div class="td">
                  <div @click="addGoods($event)">
                    <img src="../../../../static/img/eninfo/jia.png" alt=""><p>添加商品</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="img_toplist">
          <h3>产品图片
            <span>（3-6张图片）</span>
            <p></p>
          </h3>
          <div class="img">
            <div class="imgs" v-if="attachmentList.length !== 0" v-for="(item, index) in attachmentList" :key="index">
              <div>
                <img :src="$root_url() + item" alt="">
                <span class="hover_img">
                  <span class="ins" @click="bigImg(item)"><i class="el-icon-zoom-in"></i></span>
                  <span class="del" @click="handleRemove(item, index)"><i class="el-icon-delete"></i></span>
                </span>
              </div>
            </div>
            <el-upload
              list-type="picture-card"
              :before-upload="beforeAvatarUpload" :action="upLoadUrl" :http-request="zhongUpLoad" :auto-upload="true"
              :on-preview="handlePictureCardPreview" :limit="6" :file-list="fileList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <div class="radio_list">
          <h3>{{nameTitle}}要求</h3>
          <div class="div-p">
            <p><span>*</span>{{nameTitle}}类型</p>
            <el-radio-group v-model="installAdd.detail.sd_type">
              <el-radio :label="1">单次采购</el-radio>
              <el-radio :label="2">长期采购</el-radio>
            </el-radio-group>
          </div>
          <div class="div-p" v-if="installAdd.detail.sd_type === 1">
            <p class="p"><span>*</span>{{nameTitle}}时间</p>
            <el-date-picker
              v-model="pickerValue"
              ref="date_picker"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="div-p" v-if="installAdd.detail.sd_type === 2">
            <p class="p"><span>*</span>{{nameTitle}}时间</p>
            <div>确认发布后默认上架</div>
          </div>
          <div class="div-p">
            <p class="p"><span>*</span>收货地址</p>
            <v-distpicker @province="changedprovince($event,installAdd.province)" @city="chengedcity($event,installAdd.city)" @area="chengedarea($event,installAdd.detail)"></v-distpicker>
            <input style="margin-left: 10px;margin-top: 5px;" v-model="installAdd.detail.address" type="text" placeholder="详细地址">
          </div>
        </div>
        <div class="duiying">
          <h3>对供应商要求</h3>
          <div class="div-p">
            <p><span>*</span>报价要求</p>
            <span>
              <el-radio-group v-model="is_tax_price" @change="isTaxPrice(is_tax_price)">
                <el-radio :label="1">报含税价</el-radio>
              </el-radio-group>
            </span>
            <span>
              <el-radio-group v-model="is_sell_transport_fare" @change="isTransportFare(is_sell_transport_fare)">
                <el-radio :label="1">运费由供应商承担</el-radio>
              </el-radio-group>
            </span>
          </div>
          <div class="div-p">
            <p><span>*</span>结算方式</p>
            <el-radio-group v-model="installAdd.detail.settle_type" @change="settleType(installAdd.detail.settle_type)">
              <el-radio :label="0">无要求</el-radio>
              <el-radio :label="1">现结</el-radio>
              <el-radio :label="2"><span @click="settleTypes">指定结算日</span></el-radio>
              <el-radio :label="3"><span @click="settleTypes1">指定账期</span></el-radio>
              <el-radio :label="4">其他结算</el-radio>
            </el-radio-group>
            <el-dialog width="30%" title="需要在指定的每月结算日内结算" :visible.sync="innerVisible" append-to-body>
              <div class="ra">
                <div class="div-p">
                  <p>请输入指定结算日</p>
                  <!-- <input type="text" v-model="installAdd.detail.settle_date"> -->
                  <el-date-picker v-model="installAdd.detail.settle_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <button @click="handclace">确定</button>
              </div>
            </el-dialog>
            <el-dialog width="30%" title="需要在确认收货后指定账期内结算" :visible.sync="innerVisibles" append-to-body>
              <div class="ra">
                <div class="div-p">
                  <p>请输入指定账期</p>
                  <input type="text" v-model="installAdd.detail.payment_date"><span class="span">天</span>
                </div>
                <button @click="handclace">确定</button>
              </div>
            </el-dialog>
            <input type="text" v-model="installAdd.detail.other_settle_info">
          </div>
          <div class="div-p">
            <p><span>*</span>支付方式</p>
            <el-radio-group v-model="installAdd.detail.pay_mode_type">
              <el-radio :label="0">无要求</el-radio>
              <el-radio :label="1">现金</el-radio>
              <el-radio :label="2">承兑汇票</el-radio>
              <el-radio :label="3">其他支付</el-radio>
            </el-radio-group>
            <input type="text" v-model="installAdd.detail.other_pay_info">
          </div>
          <div class="div-p">
            <p><span>*</span>发票要求</p>
            <el-radio-group v-model="installAdd.detail.invoice_type">
              <el-radio :label="0">无要求</el-radio>
              <el-radio :label="1">增值税专用发票</el-radio>
              <el-radio :label="2">增值税普通发票</el-radio>
              <el-radio :label="3">其他发票</el-radio>
            </el-radio-group>
            <input type="text" v-model="installAdd.detail.other_invoice_info">
          </div>
        </div>
        <div class="bottom">
          <h3>发布设置</h3>
          <div class="div-p">
            <p><span>*</span>隐私设置</p>
            <el-radio-group v-model="installAdd.visible">
              <el-radio :label="1">对平台公开发布</el-radio>
              <el-radio :label="2">只允许好友预览</el-radio>
            </el-radio-group>
          </div>
          <div class="div-p">
            <p><span>*</span>联系方式</p>
            <el-radio-group v-model="installAdd.contact_info_visible">
              <el-radio :label="1">对平台公开发布</el-radio>
              <el-radio :label="2">只允许好友预览</el-radio>
              <el-radio :label="3">不公开</el-radio>
            </el-radio-group>
          </div>
          <div class="div-p">
            <p>联系人姓名</p>
            <input type="text" v-model="installAdd.contact_info.contact_name">
          </div>
          <div class="div-p">
            <p>联系人手机</p>
            <input type="text" v-model="installAdd.contact_info.contact_tel" maxlength="11">
          </div>
        </div>
        <div class="btn">
          <button class="cel" @click="installDraft(0)">保存草稿</button>
          <button class="ins" @click="installDraft(1)">确认发布</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleNews" title="提示" width="25%" align='left' :before-close="handleClose">
      <div class="procurementInfo_box_list2">
        <h3>确定删除么？</h3>
        <div>
          <button class="cancel" @click="newCancel">取消</button>
          <button class="prese" @click="newPreservation">确定</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleNew" title="提示" width="25%" align='left' :before-close="handleClose">
      <div class="procurementInfo_box_list2">
        <h3 v-if="isRelease === true">确定下架么？</h3>
        <h3 v-if="isRelease === false">确定上架么？</h3>
        <div>
          <button class="cancel" @click="newCancel">取消</button>
          <button class="prese" @click="onTheShelfs">确定</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import AppNav from '../../financing/financingManege'
import EnterpriseInfo from './enterpriseInfo'
export default {
  components: {
    // AppNav,
    EnterpriseInfo
  },
  data () {
    return {
      name: 'enterpriseDemand',
      procurementInfoData: [],
      showInfo: false,
      dialogVisibleNews: false,
      dialogVisibleNew: false,
      infoId: '',
      nameTitle: '采购',
      // 发布信息
      titleName: ['采购信息发布', '供应信息发布'],
      ulName: ['采购信息', '供应信息'],
      vueID: -1,
      ulID: -1,
      // 添加
      dialogInstall: false,
      installAdd: {
        title: '',
        detail: {
          sd_type: '',
          is_tax_price: '',
          is_sell_transport_fare: '',
          settle_type: '',
          settle_date: '',
          payment_date: '',
          other_settle_info: '',
          other_pay_info: '',
          other_invoice_info: '',
          pay_mode_type: '',
          invoice_type: '',
          address: '',
          province: '',
          city: '',
          region: '',
          start_date: '',
          expiry_date: ''
        },
        visible: '',
        contact_info_visible: '',
        contact_info: {
          contact_name: '',
          contact_tel: ''
        }
      },
      is_tax_price: '',
      is_sell_transport_fare: '',
      is_release: '',
      pickerValue: [],
      tableList: [],
      flag: false,
      // 添加商品
      chainData: {
        name: '',
        industry: '',
        models: '',
        describe: '',
        volume: '',
        company: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      other_type: '',
      innerVisible: false,
      innerVisibles: false,
      listNum: [],
      actives: -1,
      upLoadUrl: '',
      files: '',
      zhongDeng: [],
      attachmentList: [],
      bill_id: '',
      isRelease: '',
      releaseId: '',
      fileList: [],
      // 分页
      currPage: 1,
      total: '',
      page_size: 8,
      businessId: '',
      avatar: ''
    }
  },
  mounted () {
    var that = this
    that.businessId = localStorage.id
    that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&page_size=' + that.page_size).then(res => {
      that.procurementInfoData = res.data.results
      that.total = res.data.count
      if (that.procurementInfoData.length === 0) {
        that.showInfo = true
      }
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
    // 获取头像
    that.$ajax.get(`/api/company/` + that.businessId).then(res => {
      that.avatar = res.data.avatar
    }).catch(err => {
      that.$message.error(err.response.data.err_msg)
    })
  },
  methods: {
    toInfo (item) {
      this.$router.push({
        path: '/enterpriseDetail',
        query: {
          bill_id: item.id,
          bill_type: item.bill_type
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      var that = this
      this.currPage = val
      that.$ajax.get('/api/home_page/supply_demand/' + '?bill_type=' + that.ulID + '&page=' + that.currPage + '&page_size=' + that.page_size).then(res => {
        that.procurementInfoData = res.data.results
        that.total = res.data.count
        if (that.procurementInfoData.length === 0) {
          that.showInfo = true
        }
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    isTaxPrice (i) {
      if (i === 1) {
        this.installAdd.detail.is_tax_price = true
      } else {
        this.installAdd.detail.is_tax_price = false
      }
    },
    isTransportFare (i) {
      if (i === 1) {
        this.installAdd.detail.is_sell_transport_fare = true
      } else {
        this.installAdd.detail.is_sell_transport_fare = false
      }
    },
    // 保存草稿
    installDraft (i) {
      var that = this
      if (this.installAdd.detail.is_tax_price === '') {
        this.installAdd.detail.is_tax_price = false
      }
      if (this.installAdd.detail.is_sell_transport_fare === '') {
        this.installAdd.detail.is_sell_transport_fare = false
      }
      that.installAdd.detail.start_date = that.pickerValue[0] || null
      that.installAdd.detail.expiry_date = that.pickerValue[1] || null
      if (that.installAdd.title === '') {
        that.$message.error('请输入标题')
      } else {
        if (that.tableList.length === 0) {
          that.$message.error('请输入商品名称')
        } else {
          if (that.installAdd.detail.pay_mode_type === '') {
            that.$message.error('请选择支付方式')
          } else {
            if (that.installAdd.detail.invoice_type === '') {
              that.$message.error('请选择发票要求')
            } else {
              if (that.installAdd.detail.region === '区') {
                that.$message.error('请选择省市区')
              } else {
                if (that.installAdd.detail.region === '') {
                  that.$message.error('请选择省市区')
                } else {
                  if (that.installAdd.visible === '') {
                    that.$message.error('请选择隐私设置')
                  } else {
                    if (that.installAdd.contact_info_visible === '') {
                      that.$message.error('请选择联系方式隐私设置')
                    } else {
                      if (that.installAdd.detail.sd_type === '') {
                        that.$message.error('请输入类型')
                      } else {
                        if (that.installAdd.detail.sd_type === 1) {
                          if (that.installAdd.detail.start_date === null) {
                            that.$message.error('请输入开始时间')
                          } else {
                            if (that.installAdd.detail.expiry_date === null) {
                              that.$message.error('请输入结束时间')
                            } else {
                              if (that.installAdd.detail.settle_type === '') {
                                that.$message.error('请选择结算方式')
                              } else {
                                if (that.installAdd.detail.settle_type === 2) {
                                  if (that.installAdd.detail.settle_date === '') {
                                    that.$message.error('请输入指定结算日')
                                  } else {
                                    if (that.bill_id) {
                                      var is_release = i === 0 ? false : true
                                      that.$ajax.put(`/api/home_page/supply_demand/` + that.bill_id + '/', {...that.installAdd,
                                        bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                      }).then(res => {
                                        that.dialogInstall = false
                                        that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                          that.procurementInfoData = res.data.results
                                          that.total = res.data.count
                                          if (that.procurementInfoData.length === 0) {
                                            that.showInfo = true
                                          }
                                        }).catch(err => {
                                          that.$message.error(err.response.data.err_msg)
                                        })
                                      }).catch(err => {
                                        that.$message.error(err.response.data.err_msg)
                                      })
                                    } else {
                                      var is_release = i === 0 ? false : true
                                      that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                        bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                      }).then(res => {
                                        that.dialogInstall = false
                                        that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                          that.procurementInfoData = res.data.results
                                          that.total = res.data.count
                                          if (that.procurementInfoData.length === 0) {
                                            that.showInfo = true
                                          }
                                        }).catch(err => {
                                          that.$message.error(err.response.data.err_msg)
                                        })
                                      }).catch(err => {
                                        that.$message.error(err.response.data.err_msg)
                                      })
                                    }
                                  }
                                } else if (that.installAdd.detail.settle_type === 3) {
                                  if (that.installAdd.detail.payment_date === '') {
                                    that.$message.error('请输入指定账期')
                                  } else {
                                    if (that.bill_id) {
                                      var is_release = i === 0 ? false : true
                                      that.$ajax.put(`/api/home_page/supply_demand/` + that.bill_id + '/', {...that.installAdd,
                                        bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                      }).then(res => {
                                        that.dialogInstall = false
                                        that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                          that.procurementInfoData = res.data.results
                                          that.total = res.data.count
                                          if (that.procurementInfoData.length === 0) {
                                            that.showInfo = true
                                          }
                                        }).catch(err => {
                                          that.$message.error(err.response.data.err_msg)
                                        })
                                      }).catch(err => {
                                        that.$message.error(err.response.data.err_msg)
                                      })
                                    } else {
                                      var is_release = i === 0 ? false : true
                                      that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                        bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                      }).then(res => {
                                        that.dialogInstall = false
                                        that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                          that.procurementInfoData = res.data.results
                                          that.total = res.data.count
                                          if (that.procurementInfoData.length === 0) {
                                            that.showInfo = true
                                          }
                                        }).catch(err => {
                                          that.$message.error(err.response.data.err_msg)
                                        })
                                      }).catch(err => {
                                        that.$message.error(err.response.data.err_msg)
                                      })
                                    }
                                  }
                                } else {
                                  if (that.bill_id) {
                                    var is_release = i === 0 ? false : true
                                    that.$ajax.put(`/api/home_page/supply_demand/` + that.bill_id + '/', {...that.installAdd,
                                      bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                    }).then(res => {
                                      that.dialogInstall = false
                                      that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                        that.procurementInfoData = res.data.results
                                        that.total = res.data.count
                                        if (that.procurementInfoData.length === 0) {
                                          that.showInfo = true
                                        }
                                      }).catch(err => {
                                        that.$message.error(err.response.data.err_msg)
                                      })
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
                                  } else {
                                    var is_release = i === 0 ? false : true
                                    that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                      bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                    }).then(res => {
                                      that.dialogInstall = false
                                      that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                        that.procurementInfoData = res.data.results
                                        that.total = res.data.count
                                        if (that.procurementInfoData.length === 0) {
                                          that.showInfo = true
                                        }
                                      }).catch(err => {
                                        that.$message.error(err.response.data.err_msg)
                                      })
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
                                  }
                                }
                              }
                            }
                          }
                        } else {
                          if (that.installAdd.detail.settle_type === '') {
                            that.$message.error('请选择结算方式')
                          } else {
                            if (that.installAdd.detail.settle_type === 2) {
                              if (that.installAdd.detail.settle_date === '') {
                                that.$message.error('请输入指定结算日')
                              } else {
                                if (that.bill_id) {
                                  var is_release = i === 0 ? false : true
                                  that.$ajax.put(`/api/home_page/supply_demand/` + that.bill_id + '/', {...that.installAdd,
                                    bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                  }).then(res => {
                                    that.dialogInstall = false
                                    that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                      that.procurementInfoData = res.data.results
                                      that.total = res.data.count
                                      if (that.procurementInfoData.length === 0) {
                                        that.showInfo = true
                                      }
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
                                  }).catch(err => {
                                    that.$message.error(err.response.data.err_msg)
                                  })
                                } else {
                                  var is_release = i === 0 ? false : true
                                  that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                    bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                  }).then(res => {
                                    that.dialogInstall = false
                                    that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                      that.procurementInfoData = res.data.results
                                      that.total = res.data.count
                                      if (that.procurementInfoData.length === 0) {
                                        that.showInfo = true
                                      }
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
                                  }).catch(err => {
                                    that.$message.error(err.response.data.err_msg)
                                  })
                                }
                              }
                            } else if (that.installAdd.detail.settle_type === 3) {
                              if (that.installAdd.detail.payment_date === '') {
                                that.$message.error('请输入指定账期')
                              } else {
                                if (that.bill_id) {
                                  var is_release = i === 0 ? false : true
                                  that.$ajax.put(`/api/home_page/supply_demand/` + that.bill_id + '/', {...that.installAdd,
                                    bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                  }).then(res => {
                                    that.dialogInstall = false
                                    that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                      that.procurementInfoData = res.data.results
                                      that.total = res.data.count
                                      if (that.procurementInfoData.length === 0) {
                                        that.showInfo = true
                                      }
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
                                  }).catch(err => {
                                    that.$message.error(err.response.data.err_msg)
                                  })
                                } else {
                                  var is_release = i === 0 ? false : true
                                  that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                    bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                  }).then(res => {
                                    that.dialogInstall = false
                                    that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                      that.procurementInfoData = res.data.results
                                      that.total = res.data.count
                                      if (that.procurementInfoData.length === 0) {
                                        that.showInfo = true
                                      }
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
                                  }).catch(err => {
                                    that.$message.error(err.response.data.err_msg)
                                  })
                                }
                              }
                            } else {
                              if (that.bill_id) {
                                var is_release = i === 0 ? false : true
                                that.$ajax.put(`/api/home_page/supply_demand/` + that.bill_id + '/', {...that.installAdd,
                                  bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                }).then(res => {
                                  that.dialogInstall = false
                                  that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                    that.procurementInfoData = res.data.results
                                    that.total = res.data.count
                                    if (that.procurementInfoData.length === 0) {
                                      that.showInfo = true
                                    }
                                  }).catch(err => {
                                    that.$message.error(err.response.data.err_msg)
                                  })
                                }).catch(err => {
                                  that.$message.error(err.response.data.err_msg)
                                })
                              } else {
                                var is_release = i === 0 ? false : true
                                that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                  bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                }).then(res => {
                                  that.dialogInstall = false
                                  that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + (that.ulID+1) + '&page_size=' + that.page_size).then(res => {
                                    that.procurementInfoData = res.data.results
                                    that.total = res.data.count
                                    if (that.procurementInfoData.length === 0) {
                                      that.showInfo = true
                                    }
                                  }).catch(err => {
                                    that.$message.error(err.response.data.err_msg)
                                  })
                                }).catch(err => {
                                  that.$message.error(err.response.data.err_msg)
                                })
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // 指定结算日
    settleType (val) {
      var that = this
      if (val === 2) {
        that.innerVisible = true
      } else if (val === 3) {
        that.innerVisibles = true
      } else {
        this.installAdd.detail.settle_date = null
      }
    },
    settleTypes () {
      this.innerVisible = true
      this.installAdd.detail.payment_date = ''
    },
    settleTypes1 () {
      this.innerVisibles = true
      this.installAdd.detail.settle_date = null
    },
    handclace () {
      this.innerVisibles = false
      this.innerVisible = false
    },
    // 附件上传
    zhongUpLoad () {
      var that = this
      var fileUrl = new FormData()
      var file = that.files
      fileUrl.append('file', file)
      fileUrl.append('function_module', 'demand')
      that.$ajax.post('/api/ns_file/', fileUrl).then(res => {
        that.zhongDeng.push(res.data)
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
        that.$loading(that.$setLoading()).close()
      })
    },
    // 所在省
    changedprovince ($event, obj) {
      this.installAdd.detail.province = $event.value
      this.installAdd.detail.city = ''
      this.installAdd.detail.region = ''
    },
    // 所在地
    chengedcity ($event, obj) {
      this.installAdd.detail.city = $event.value
      this.installAdd.detail.region = ''
    },
    // 所在区
    chengedarea ($event, obj) {
      this.installAdd.detail.region = $event.value
    },
    // 图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size < 5 * 1024 * 1024
      if (!isJPG) {
        this.$message.error('只能是 JPG、JPEG或者PNG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('大小不能超过 5MB!')
        return
      }
      console.log(file)
      this.files = file
    },
    // 添加商品
    addGoods () {
      this.flag = true
    },
    // 编辑商品
    productExit (item, index) {
      this.tableList.splice(index, 1)
    },
    keepAdd () {
      this.flag = false
      if (this.chainData.name === '') {
        this.$message.error('请输入商品名称')
      } else {
        if (this.chainData.volume === '') {
          this.$message.error('请输入供应量')
        } else {
          if (this.chainData.company === '') {
            this.$message.error('请输入供应单位')
          } else {
            var product_name = this.chainData.name
            var industry = this.chainData.industry
            var product_spec = this.chainData.models
            var product_contents = this.chainData.describe
            var product_quantity = this.chainData.volume
            var product_unit = this.chainData.company
            var addGoodsList = {
              product_name: product_name,
              industry: industry,
              product_spec: product_spec,
              product_contents: product_contents,
              product_quantity: product_quantity,
              product_unit: product_unit
            }
            this.tableList.push(addGoodsList)
            this.chainData.name = ''
            this.chainData.industry = ''
            this.chainData.models = ''
            this.chainData.describe = ''
            this.chainData.volume = ''
            this.chainData.company = ''
          }
        }
      }
    },
    ulList (index) {
      var that = this
      that.ulID = index
      that.currPage = 1
      that.total = ''
      that.vueID = -1
      if (index === 0) {
        that.nameTitle = '采购'
        that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + 1 + '&page_size=' + that.page_size + '&bill_type=' + 1).then(res => {
          that.procurementInfoData = res.data.results
          that.total = res.data.count
          if (that.procurementInfoData.length === 0) {
            that.showInfo = true
          }
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      } else if (index === 1) {
        that.nameTitle = '供应'
        that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + 1 + '&page_size=' + that.page_size + '&bill_type=' + 2).then(res => {
          that.procurementInfoData = res.data.results
          that.total = res.data.count
          if (that.procurementInfoData.length === 0) {
            that.showInfo = true
          }
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }
    },
    // 删除
    deletes (item, index) {
      var that = this
      that.dialogVisibleNews = true
      that.infoId = item.id
    },
    // 删除
    newPreservation () {
      var that = this
      that.$ajax.delete(`/api/home_page/supply_demand/` + that.infoId + '/').then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.dialogVisibleNews = false
        that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&page_size=' + that.page_size).then(res => {
          that.procurementInfoData = res.data.results
          that.ulID = -1
          that.total = res.data.count
          if (that.procurementInfoData.length === 0) {
            that.showInfo = true
          }
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
        // 获取头像
        that.$ajax.get(`/api/company/` + that.businessId).then(res => {
          that.avatar = res.data.avatar
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    newCancel () {
      this.dialogVisibleNews = false
      this.dialogVisibleNew = false
      this.$message({
        type: 'info',
        message: '已取消'
      })
    },
    // 取消
    handleClose () {
      this.dialogVisibleNews = false
      this.dialogInstall = false
    },
    // 编辑
    edit (item) {
      var that = this
      that.installAdd = {}
      that.pickerValue = []
      that.tableList = []
      that.attachmentList = []
      that.is_tax_price = ''
      that.is_sell_transport_fare = ''
      that.zhongDeng = []
      that.fileList = []
      that.dialogInstall = true
      that.bill_id = item.id
      that.$ajax.get(`/api/home_page/supply_demand/` + item.id).then(res => {
        that.installAdd = res.data
        that.ulID = Number(res.data.bill_type) - 1
        that.installAdd.detail.sd_type = Number(res.data.detail.sd_type)
        if (res.data.detail.is_tax_price === true) {
          that.installAdd.detail.is_tax_price = 1
          that.is_tax_price = 1
        }
        if (res.data.detail.is_sell_transport_fare === true) {
          that.installAdd.detail.is_sell_transport_fare = 1
          that.is_sell_transport_fare = 1
        }
        that.installAdd.detail.settle_type = Number(res.data.detail.settle_type)
        that.installAdd.detail.pay_mode_type = Number(res.data.detail.pay_mode_type)
        that.installAdd.detail.invoice_type = Number(res.data.detail.invoice_type)
        that.installAdd.visible = Number(res.data.visible)
        that.pickerValue[0] = res.data.detail.start_date
        that.pickerValue[1] = res.data.detail.expiry_date
        that.installAdd.contact_info_visible = Number(res.data.contact_info_visible)
        that.tableList = res.data.product_list
        that.attachmentList = res.data.picture_list
        that.zhongDeng = res.data.picture_list
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    // 删除图片
    handleRemove (item, index) {
      var that = this
      that.attachmentList.splice(index, 1)
      that.zhongDeng = that.zhongDeng.filter(i => {
        return i !== item
      })
    },
    // 图片
    bigImg(item) {
      this.dialogImageUrl = this.$root_url() + item
      this.dialogVisible = true
    },
    // 上架
    onTheShelfs () {
      var that = this
      var is_release =  that.isRelease === true ? false : true
      that.$ajax.patch(`/api/home_page/supply_demand/` + that.releaseId + '/', {is_release: is_release}).then(res => {
        that.dialogVisibleNew = false
        that.$ajax.get('/api/home_page/supply_demand/' + '?page=' + that.currPage + '&bill_type=' + res.data.bill_type + '&page_size=' + that.page_size).then(res => {
          that.procurementInfoData = res.data.results
          that.total = res.data.count
          if (that.procurementInfoData.length === 0) {
            that.showInfo = true
          }
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
        // 获取头像
        that.$ajax.get(`/api/company/` + that.businessId).then(res => {
          that.avatar = res.data.avatar
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
      }).catch(err => {
        that.$message.error(err.response.data.err_msg)
      })
    },
    onTheShelf (item) {
      var that = this
      that.dialogVisibleNew = true
      that.isRelease = item.is_release
      that.releaseId = item.id
    },
    // 添加按钮
    addInfoList (index) {
      var that = this
      that.vueID = index
      that.ulID = index
      that.pickerValue = []
      // that.$refs["date_picker"]._data.userInput = null
      that.tableList = []
      that.attachmentList = []
      that.is_tax_price = ''
      that.is_sell_transport_fare = ''
      that.zhongDeng = []
      that.fileList = []
      that.installAdd.detail.province = '省'
      that.installAdd.detail.city = '市'
      that.installAdd.detail.region = '区'
      that.installAdd.title = ''
      that.installAdd.date_created = ''
      that.installAdd.detail.sd_type = ''
      that.installAdd.detail.is_tax_price = ''
      that.installAdd.detail.settle_type = ''
      that.installAdd.detail.pay_mode_type = ''
      that.installAdd.detail.invoice_type = ''
      that.installAdd.detail.is_sell_transport_fare = ''
      that.installAdd.detail.start_date = ''
      that.installAdd.detail.expiry_date = ''
      that.installAdd.detail.address = ''
      that.installAdd.visible = ''
      that.installAdd.contact_info_visible = ''
      that.installAdd.contact_info.contact_name = ''
      that.installAdd.contact_info.contact_tel = ''
      that.installAdd.detail.settle_date = ''
      that.installAdd.detail.payment_date = ''
      that.installAdd.detail.other_settle_info = ''
      that.installAdd.detail.other_pay_info = ''
      that.installAdd.detail.other_invoice_info = ''
      if (index === 0) {
        that.nameTitle = '采购'
      } else if (index === 1) {
        that.nameTitle = '供应'
      }
      that.dialogInstall = true
    }
  }
}
</script>

<style lang='less' scoped>
.list_btn {
  span {
    cursor: pointer;
    display: block;
    font-family:PingFangSC-Regular;
    font-size:10px;
    color:#6a6a6a;
    letter-spacing:0;
    background: none;
    border: none;
    border-bottom: 1px solid #e1e6f0;
    outline: none;
    padding-top: 3px;
    width: 52px;
    text-align: center;
  }
  span:hover {
    color: #eb6100;
  }
}
.el_div_buttons {
  padding-top: 10px;
  .el-button:focus, .el-button:hover {
    color: #000000;
    border-color: none;
    background-color: none;
  }
  .el-button {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: none;
    border: none;
    color: #000000;
    outline: 0;
    padding: 0;
    text-align: center;
  }
}
.enterpriseDemand {
  background: #fafafa;
  display: flex;
  //padding-top: 70px;
  min-height: 100%;
  .info-enter {
    font-size: 14px;
    height: 100%;
    position: relative;
    padding: 0 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    .ins {
      border: none;
      color: #fff;
      background: #eb6100;
      outline: none;
      border-radius: 5px;
      height: 32px;
      width: 100px;
    }
    .forms {
      flex: 1;
    }
    .forms_list {
      width: auto;
      margin: 0 auto;
      height: auto;
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      margin-bottom: 30px;
      background: #ffffff;
      border: 1px solid #e1e6f0;
      border-radius: 4px;
      padding: 0 15px;
      max-width: 1200px;
    }
    .left {
      // margin-right: 50px;
      // width: auto;
      flex: 1;
      margin-right: 15px;
      .card_title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e7ebee;
        align-items: center;
        height: 60px;
        h3 {
          border-left:4px solid #eb6100;
          font-size: 14px;
          color: #696969;
          padding-left: 15px;
          font-weight: bold;
        }
        ul {
          width: 40%;
          text-align: right;
          li {
            display: inline-block;
            margin-left: 12px;
            button {
              color: #fff;
              border:1px solid #f48537;
              outline: none;
              margin: 0;
              background: #f48537;
              border-radius: 4px;
              width: 120px;
              height: 28px;
            }
            button:hover {
              border:1px solid #f48537;
              color: #f48537;
              background: #fff;
            }
          }
        }

      }
      .content {
        width: 980px;
        margin-top: 20px;
        height: 500px;
        .content_lists {
          height: 250px;
          float: left;
        }
        ul {
          margin-bottom: 80px;
          background:#ffffff;
          border:1px solid #e1e6f0;
          border-radius:4px;
          width:218px;
          margin-left: 20px;
          // height:auto;
          .lis_li {
            padding: 0 20px;
            padding-top: 10px;
            p {
              display: inline-block;
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#999999;
              letter-spacing:0.15px;
              text-align:left;
              padding-right: 9px;
            }
            span {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#333333;
              letter-spacing:0.15px;
              text-align:left;
            }
            button {
              color: #eb6100;
              outline: none;
              text-align: right;
              padding: 5px 10px;
              border-radius: 4px;
              margin-top: 5px;
            }
            .span {
              display: inline-block;
              text-align: center;
              line-height: 16px;
              background:#f48537;
              border:1px solid #f48537;
              border-radius:2px;
              width:50px;
              height:16px;
              color: #fff;
              font-size: 12px;
              margin-bottom: 12px;
            }
          }
          .li_shou {
            text-align: center;
            opacity: 0;
            // display: none;
            transition: all .2s;
            height: 0px !important;
            width: 100%;
            span {
              background:#eb6100;
              border-radius:19px;
              width:117px;
              height:28px;
              cursor: pointer;
              display: inline-block;
              color: #fff;
              text-align: center;
              line-height: 28px;
            }
          }
          li {
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            h3 {
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#333333;
              letter-spacing:0.17px;
              text-align:left;
              background:#f4f4f4;
              width:218px;
              height:58px;
              display: flex;
              flex-direction: row;
              padding: 10px 25px;
              img {
                background:#ffffff;
                width:30px;
                height:30px;
                border-radius:50%;
                margin-right: 7px;
              }
              p {
                width: 250px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-family:PingFangSC-Semibold;
                font-size:12px;
                color:#333333;
                letter-spacing:0.17px;
                text-align:left;
                padding-top: 4px;
                font-weight: bold;
              }
            }
            .back {
              width:40px;
              height:22px;
              color: #fff;
            }
            .edit {
              background: #eb6100;
              border: none;
              color: #fff;
            }
            .info {
              background: #eb6100;
              border: none;
              color: #fff;
            }
            .release {
              background: none;
              border: 1px solid #eb6100;
              color: #eb6100;
            }
          }
          li:last-child {
            height: 50px;
          }
        }
        ul:hover .li_shou {
          opacity: 1;
          // display: block;
          height: 48px !important;
          padding-top: 8px;
          transition: all .2s;
          border-top:1px dashed #cccccc;
        }
      }
      .block {
        text-align: center;
      }
    }
    .right {
      padding-top: 20px;
      width: 135px;
      .left_blog {
        width: auto;
        height: 100%;
        .blog {
          float: left;
          min-height: 500px;
          ul {
            height: 100%;
            text-align: right;
            min-height: 500px;
            border-left: 1px solid #e4e7ed;
            li {
              border-left: 3px solid #fff;
              height: auto;
              padding: 8px 0;
              p {
                height: 27px;
                display: block;
                width: auto;
                font-family:PingFangSC-Semibold;
                font-size:14px;
                line-height: 27px;
                color:#999999;
                padding-left: 34px;
                cursor: pointer;
                font-weight: bold;
              }
            }
            .active {
              border-left: 3px solid #eb6100;
              p {
                color: #eb6100;
                height: 27px;
                font-weight: bold;
              }
            }
            li:hover {
              border-left: 3px solid #eb6100;
              p {
                color: #eb6100;
                height: 27px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
.procurementInfo_box_list2 {
  div {
    text-align: right;
  }
  h3 {
    font-size: 16px;
    text-align: left;
  }
  .block {
    text-align: left;
    span {
      display: inline-block;
      margin: 20px;
      img {
        width: 130px;
        height: 115px;
      }
    }
  }
  button {
    width: 90px;
    height: 30px;
    line-height: 30px;
    outline: none;
    margin: 10px 10px;
    border-radius: 5px;
  }
  .prese {
    background: #eb6100;
    border: none;
    color: #fff;
  }
  .cancel {
    border: 1px solid #eb6100;
    background: none;
    color: #eb6100;
  }
}
.install_list {
  padding: 0 30px;
  .top {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:4px;
    width:100%;
    height:auto;
    padding: 0 23px;
    h3 {
      font-family:PingFangSC-Medium;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      margin: 11px 0 0 0;
      padding-left: 15px;
      border-left: 6px solid #eb6100;
    }
    .div-p {
      display: flex;
      flex-direction: row;
      padding: 10px 0;
      p {
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#333333;
        letter-spacing:0.15px;
        text-align:left;
        margin-right: 20px;
        width: 100px;
        padding-top: 5px;
        span {
          color: #eb6100;
          display: inline-block;
          padding-right: 5px;
        }
      }
      input {
        background:#ffffff;
        border:1px solid #dcdfe6;
        border-radius:4px;
        width:220px;
        height:40px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#606266;
        letter-spacing:0;
        text-align:left;
        padding: 0 14px;
      }
    }
    .table_list {
      .table {
        margin-bottom: 30px;
        background-color: #ffffff;
        .input_list {
          display: flex;
          flex-direction: row;
          margin: 10px 0;
          .td {
            flex: 1;
          }
          input {
            background:#ffffff;
            border:1px solid #cccccc;
            border-radius:4px;
            width:118px;
            height:28px;
            outline: none;
            padding: 0 10px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#606266;
            letter-spacing:0;
            text-align:left;
          }
          .operate-area {
            cursor: pointer;
          }
        }
        .add {
          cursor: pointer;
          width: 100%;
          background:#e8ecf2;
          height:45px;
          line-height: 45px;
          margin: 10px 0;
          .td {
            text-align: center;
            margin: 0 auto;
            height:45px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            div {
              margin: 0 auto;
            }
            p {
              font-family:AppleColorEmoji;
              font-size:12px;
              color:#333333;
              letter-spacing:0.17px;
              float: left;
            }
            img {
              float: left;
              margin: 0 auto;
              margin-top: 14px;
              margin-right: 5px;
            }
          }
        }
      }
      table {
        width: 100%;
        thead {
          tr {
            display: flex;
            flex-direction: row;
            th {
              flex: 1;
              .cell {
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#333333;
                letter-spacing:0.15px;
                text-align:left;
                span {
                  color: #eb6100;
                  display: inline-block;
                  padding-right: 5px;
                }
              }
            }
          }
        }
        tbody {
          tr {
            display: flex;
            flex-direction: row;
            td {
              flex: 1;
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#333333;
              letter-spacing:0.15px;
              text-align:left;
              padding: 10px 0;
            }
            button {
              background: none;
              border: none;
              outline: none;
              color: #eb6100;
            }
          }
        }
      }
    }
  }
  .img_toplist {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:4px;
    width:100%;
    height:auto;
    margin-top: 20px;
    padding: 0 23px;
    overflow: auto;
    h3 {
      font-family:PingFangSC-Medium;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      margin: 11px 0 0 0;
      padding-left: 15px;
      border-left: 6px solid #eb6100;
      span {
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#9b9b9b;
        letter-spacing:0;
        text-align:left;
      }
    }
    .img {
      margin: 20px 0;
      display: flex;
      flex-direction: row;
      .imgs {
        display: flex;
        flex-direction: row;
        img {
          width: 100%;
          height: 100%;
        }
        div {
          width: 148px;
          height: 148px;
          position: relative;
          overflow: hidden;
          background-color: #fff;
          border: 1px solid #c0ccda;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          display: inline-block;
          -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
          transition: all .5s cubic-bezier(.55,0,.1,1);
          font-size: 14px;
          color: #606266;
          line-height: 1.8;
          margin: 0 10px;
          .hover_img {
            cursor: pointer;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            text-align: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0,0,0,.5);
            -webkit-transition: opacity .3s;
            transition: opacity .3s;
            span {
              display: none;
              cursor: pointer;
            }
          }
          .hover_img:hover {
            opacity: 1;
            display: inline-block;
          }
          .hover_img:hover span {
            display: inline-block;
            margin-right: 6px;
          }
          .hover_img:hover .del {
            display: inline-block;
            margin-left: 6px;
          }
          .hover_img::after {
            display: inline-block;
            content: "";
            height: 100%;
            vertical-align: middle;
            box-sizing: inherit;
          }
        }
      }
    }
  }
  .radio_list {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:4px;
    width:100%;
    height:auto;
    margin-top: 20px;
    padding: 0 23px;
    h3 {
      font-family:PingFangSC-Medium;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      margin: 11px 0 0 0;
      padding-left: 15px;
      border-left: 6px solid #eb6100;
    }
    .div-p {
      display: flex;
      flex-direction: row;
      padding: 13px 0;
      p {
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#333333;
        letter-spacing:0.15px;
        text-align:left;
        margin-right: 20px;
        width: 80px;
        span {
          color: #eb6100;
          display: inline-block;
          padding-right: 5px;
        }
      }
      .p {
        padding-top: 5px;
      }
      input {
        background:#ffffff;
        border:1px solid #dcdfe6;
        border-radius:4px;
        width:220px;
        height:40px;
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#606266;
        letter-spacing:0;
        text-align:left;
        padding: 0 14px;
      }
      div {
        padding-top: 5px;
      }
    }
  }
  .duiying {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:4px;
    width:100%;
    height:auto;
    margin-top: 20px;
    padding: 0 23px;
    h3 {
      font-family:PingFangSC-Medium;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      margin: 11px 0 0 0;
      padding-left: 15px;
      border-left: 6px solid #eb6100;
    }
    .div-p {
      display: flex;
      flex-direction: row;
      padding: 13px 0;
      span {
        display: inline-block;
        padding-right: 15px;
      }
      p {
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#333333;
        letter-spacing:0.15px;
        text-align:left;
        margin-right: 20px;
        width: 80px;
        padding-left: 5px;
        span {
          color: #eb6100;
          display: inline-block;
          padding-right: 5px;
        }
      }
      .p {
        padding-top: 5px;
      }
      input {
        background:#ffffff;
        border:1px solid #cccccc;
        border-radius:4px;
        width:108px;
        height:28px;
        outline: none;
        padding: 0 10px;
        margin-left: 15px;
      }
      div {
        padding-top: 5px;
      }
    }
  }
  .bottom {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:4px;
    width:100%;
    height:auto;
    margin-top: 20px;
    padding: 0 23px;
    h3 {
      font-family:PingFangSC-Medium;
      font-size:14px;
      color:#333333;
      letter-spacing:0.17px;
      text-align:left;
      margin: 11px 0 0 0;
      padding-left: 15px;
      border-left: 6px solid #eb6100;
    }
    .div-p {
      display: flex;
      flex-direction: row;
      padding: 13px 0;
      p {
        font-family:PingFangSC-Regular;
        font-size:12px;
        color:#333333;
        letter-spacing:0.15px;
        text-align:left;
        margin-right: 20px;
        width: 80px;
        span {
          color: #eb6100;
          display: inline-block;
          padding-right: 5px;
        }
      }
      .p {
        padding-top: 5px;
      }
      input {
        background:#ffffff;
        border:1px solid #cccccc;
        border-radius:4px;
        width:208px;
        height:28px;
        outline: none;
        padding: 0 10px;
        margin-left: 15px;
      }
      div {
        padding-top: 5px;
      }
    }
  }
  .btn {
    margin: 20px 0;
    text-align: center;
    button {
      margin: 0 20px;
      border-radius:4px;
      width:118px;
      height:36px;
      outline: none;
    }
    .cel {
      border:1px solid #eb6100;
      color: #eb6100;
      background: none;
    }
    .ins {
      border:none;
      color: #fff;
      background: #eb6100;
    }
  }
}
.ra {
  ul {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:4px;
    width:auto;
    height:99px;
    padding: 13px;
    li {
      margin: 5px;
      border:1px solid #eb6100;
      border-radius:4px;
      text-align: center;
      width:22px;
      height:22px;
      line-height: 22px;
      display: inline-block;
      color: #eb6100;
      cursor: pointer;
      font-size: 12px;
    }
    .active {
      background: #eb6100;
      color: #fff;
    }
    li:hover {
      background: #eb6100;
      color: #fff;
    }
  }
  .div-p {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    p {
      font-family:PingFangSC-Regular;
      font-size:12px;
      color:#333333;
      letter-spacing:0.15px;
      text-align:left;
      margin-right: 20px;
      width: 100px;
      padding-top: 5px;
      span {
        color: #eb6100;
        display: inline-block;
        padding-right: 5px;
      }
    }
    .span {
      padding: 8px 0 0 10px;
    }
    input {
      background:#ffffff;
      border:1px solid #dcdfe6;
      border-radius:4px;
      width:220px;
      height:40px;
      font-family:PingFangSC-Regular;
      font-size:12px;
      color:#606266;
      letter-spacing:0;
      text-align:left;
      padding: 0 14px;
    }
  }
  button {
    width: 80px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color: #fff;
    background: #eb6100;
    border: none;
    outline: none;
    border-radius: 4px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #eb6100;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.el-collapse-item__header {
  padding: 0 20px !important;
}
</style>
