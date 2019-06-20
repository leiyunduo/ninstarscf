<template>
  <div class="editor-wraper">
    <div class="install_list">
      <div class="top">
        <h3>{{nameTitle}}单信息</h3>
        <div class="div-p">
          <p><span>*</span>{{nameTitle}}单标题</p>
          <input type="text" v-model="installAdd.title" placeholder="请输入标题">
        </div>
        <div class="table_list">
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th><div class="cell"><span>*</span>{{nameTitle}}商品名称</div></th>
                  <th><div class="cell">所属行业</div></th>
                  <th><div class="cell">规格/型号</div></th>
                  <th><div class="cell">商品描述</div></th>
                  <th><div class="cell"><span>*</span>{{nameTitle}}量</div></th>
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
              <div class="td operate-area" ref="addGoods"><span  @click="keepAdd($event)" class="linker">保存</span><span @click="keepReset($event)" class="linker">取消</span></div>
            </div>
            <div class="tr data add" >
              <div class="td">
                <div @click="addGoods($event)">
                  <img src="../../../../../static/img/eninfo/jia.png" alt=""><p>添加商品</p>
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
            :on-preview="handlePictureCardPreview" :on-remove="onRemove" :limit="6" :file-list="fileList">
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
          <span style="margin-left: 16px">
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
                <el-date-picker size="small" v-model="installAdd.detail.settle_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
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
  </div>
</template>

<script>
  export default {
    name: '',
    props: ['nameTitle', 'ulID', 'isEdit'],
    data () {
      return {
        dialogVisible: false,
        innerVisibles: false,
        innerVisible: false,
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
        // 添加商品
        chainData: {
          name: '',
          industry: '',
          models: '',
          describe: '',
          volume: '',
          company: ''
        },
        tableList: [],
        attachmentList: [],
        flag: false,
        upLoadUrl: '',
        fileList: [],
        dialogImageUrl: '',
        is_tax_price: '',
        is_sell_transport_fare: '',
        zhongDeng: [],
        pickerValue: [],
        bill_id: ''
      }
    },
    mounted () {
      if (this.isEdit.status) {
        this.edit(this.isEdit.id)
      }
    },
    methods: {
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
            that.$message.error('请输入商品信息')
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
                                          this.$emit('closeView', false)
                                        }).catch(err => {
                                          that.$message.error(err.response.data.err_msg)
                                        })
                                      } else {
                                        var is_release = i === 0 ? false : true
                                        that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                          bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                        }).then(res => {
                                          this.$emit('closeView', false)
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
                                          this.$emit('closeView', false)
                                        }).catch(err => {
                                          that.$message.error(err.response.data.err_msg)
                                        })
                                      } else {
                                        var is_release = i === 0 ? false : true
                                        that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                          bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                        }).then(res => {
                                          this.$emit('closeView', false)
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
                                        this.$emit('closeView', false)
                                      }).catch(err => {
                                        that.$message.error(err.response.data.err_msg)
                                      })
                                    } else {
                                      var is_release = i === 0 ? false : true
                                      that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                        bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                      }).then(res => {
                                        this.$emit('closeView', false)
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
                                      this.$emit('closeView', false)
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
                                  } else {
                                    var is_release = i === 0 ? false : true
                                    that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                      bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                    }).then(res => {
                                      this.$emit('closeView', false)
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
                                      this.$emit('closeView', false)
                                    }).catch(err => {
                                      that.$message.error(err.response.data.err_msg)
                                    })
                                  } else {
                                    var is_release = i === 0 ? false : true
                                    that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                      bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                    }).then(res => {
                                      this.$emit('closeView', false)
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
                                    this.$emit('closeView', false)
                                  }).catch(err => {
                                    that.$message.error(err.response.data.err_msg)
                                  })
                                } else {
                                  var is_release = i === 0 ? false : true
                                  that.$ajax.post('/api/home_page/supply_demand/', {...that.installAdd,
                                    bill_type: (that.ulID+1), is_release: is_release, picture_list: that.zhongDeng, product_list: that.tableList
                                  }).then(res => {
                                    this.$emit('closeView', false)
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
      // 删除图片
      handleRemove (item, index) {
        var that = this
        that.attachmentList.splice(index, 1)
        that.zhongDeng = that.zhongDeng.filter(i => i !== item)
        
      },
      // 编辑
      edit (id) {
        var that = this       
        that.bill_id = id
        that.$ajax.get(`/api/home_page/supply_demand/` + id).then(res => {
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
      onRemove (file, fileList, item) {
        this.zhongDeng = this.zhongDeng.filter(i => i !== file)
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
        this.files = file
      },
      // 图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
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
              this.flag = false
            }
          }
        }
      },
      keepReset () {
        this.chainData.name = ''
        this.chainData.industry = ''
        this.chainData.models = ''
        this.chainData.describe = ''
        this.chainData.volume = ''
        this.chainData.company = ''
        this.flag = false
      },
      // 图片
      bigImg(item) {
        this.dialogImageUrl = this.$root_url() + item
        this.dialogVisible = true
      }
    }
  }
</script>

<style lang='less' scope>
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
            margin-right: 5px;
          }
        }
        // input {
        //   background:#ffffff;
        //   border:1px solid #dcdfe6;
        //   border-radius:4px;
        //   width:220px;
        //   height:40px;
        //   font-family:PingFangSC-Regular;
        //   font-size:12px;
        //   color:#606266;
        //   letter-spacing:0;
        //   text-align:left;
        //   padding: 0 14px;
        // }
      }
      .table_list {
        .table {
          margin-bottom: 30px;
          background-color: #ffffff;
          .input_list {
            display: flex;
            flex-direction: row;
            margin: 10px 0;
            .linker {
              margin-right: 8px;
              color: #eb6100;
              text-decoration: underline;
            }
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
        // input {
        //   background:#ffffff;
        //   border:1px solid #dcdfe6;
        //   border-radius:4px;
        //   width:220px;
        //   height:40px;
        //   font-family:PingFangSC-Regular;
        //   font-size:12px;
        //   color:#606266;
        //   letter-spacing:0;
        //   text-align:left;
        //   padding: 0 14px;
        // }
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
          // display: inline-block;
          // padding-right: 15px;
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
        // input {
        //   background:#ffffff;
        //   border:1px solid #cccccc;
        //   border-radius:4px;
        //   width:208px;
        //   height:28px;
        //   outline: none;
        //   padding: 0 10px;
        //   margin-left: 15px;
        // }
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
      // input {
      //   background:#ffffff;
      //   border:1px solid #dcdfe6;
      //   border-radius:4px;
      //   width:220px;
      //   height:40px;
      //   font-family:PingFangSC-Regular;
      //   font-size:12px;
      //   color:#606266;
      //   letter-spacing:0;
      //   text-align:left;
      //   padding: 0 14px;
      // }
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
</style>