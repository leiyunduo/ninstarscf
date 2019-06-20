<template>
  <div id="second_content">
    <!-- 第二还款来源 -->
    <div class="repayment">
      <div class="title">
        <h3>应收款质押（质押池）</h3>
      </div>
      <div class="content_second">
        <h3>应收款质押（质押池）总额：{{secSum}}</h3>
        <div class="btn">
          <button @click="openList(0)"><i class="el-icon-plus"></i>添加应收款质押</button>
        </div>
        <div class="second_list" v-if="selList.length !== 0" v-for="(item, index) in selList" :key='index'>
          <div class="div_list">
            <div class="top">
              <h4>
                <img :src="pics[item.ticket_type]">
                <p>面额（元）：<span>{{item.amount}}</span></p>
              </h4>
              <i class="el-icon-delete" @click="handleDelete(index)"></i>
            </div>
            <div class="list">
              <ul>
                <li><span>销售项目：</span><p class="color_onlike" @click="handleChain(item)">{{item.contract_name}}</p></li>
                <li>
                  <span>付款企业名称（企业填写）：</span>
                  <p v-if="item.payment_info" :style="!item.payment_info.payment ? 'color: #999; text-decoration: none;':''">{{item.payment_info.payment || '未填写'}}</p>
                </li>
              </ul>
              <ul>
                <li><span>票据类型：</span><p>{{item.type}}</p></li>
                <li><span>票据金额（元）：</span><p>{{item.amount}}</p></li>
                <li><span>汇票到期日：</span><p>{{item.payment_date}}</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="second_list_none" v-if="selList.length === 0">
          <img src="../../../../../static/img/other/none.png" alt="">
          <h4>担保性还款来源，请选择添加应收款质押</h4>
        </div>
      </div>
    </div>
    <!-- 其他担保 -->
    <div class="other_guarantee">
      <div class="title">
        <h3>其他担保</h3>
      </div>
      <div class="content_second">
        <h3>其它担保总额：{{otherSum}}</h3>
        <div class="btn">
          <button @click="openList(1)"><i class="el-icon-plus"></i>添加其他担保</button>
        </div>
        <div class="second_list">
          <div class="div_list_content" v-if="otherList.length !== 0" v-for="(item, index) in otherList" :key="index">
            <div class="top">
              <ul>
                <li><span>类型：</span><p>{{item.collateral_type === '1' ? '房产' : item.collateral_type === '2' ? '汽车' : item.collateral_type === '3' ? '股权' : '基金'}}</p></li>
                <li><span>市场估值：</span><p>{{item.appraisement}}</p></li>
                <li></li>
              </ul>
              <i class="el-icon-delete" @click="handleDropOther(index)"></i>
            </div>
            <div class="list" v-if="item.collateral_type === '1'">
              <ul>
                <li><span>城市：</span><p>{{item.city}}</p></li>
                <li><span>小区地址：</span><p>{{item.full_address}}</p></li>
                <li><span>面积：</span><p>{{item.area}}</p></li>
                <li>
                  <span>评估报告：</span>
                  <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                  <p v-if="item.att_list.length !== 0 && item.att_list" @click="handleView(it)" class="color_onlike" v-for="(it, index1) in item.att_list" :key='index1' style="margin-rigth: 10px">{{it.name}}</p>
                </li>
              </ul>
            </div>
            <div class="list" v-if="item.collateral_type === '2'">
              <ul>
                <li><span>城市：</span><p>{{item.city}}</p></li>
                <li><span>车辆型号：</span><p>{{item.car_type}}</p></li>
                <li>
                  <span>评估报告：</span>
                  <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                  <p class="color_onlike" @click="handleView(it)" v-if="item.att_list.length !== 0 && item.att_list" v-for="(it, index1) in item.att_list" :key='index1'>{{it.name}}</p>
                </li>
              </ul>
            </div>
            <div class="list" v-if="item.collateral_type === '3'">
              <ul>
                <li><span>公司名称：</span><p>{{item.business_name}}</p></li>
                <li><span>股权比例：</span><p>{{item.ratio}}</p></li>
                <li>
                  <span>评估报告：</span>
                  <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                  <p class="color_onlike" @click="handleView(it)" v-if="item.att_list.length !== 0 && item.att_list" v-for="(it, index1) in item.att_list" :key='index1'>{{it.name}}</p>
                </li>
              </ul>
            </div>
            <div class="list" v-if="item.collateral_type === '4'">
              <ul>
                <li><span>基金简称：</span><p>{{item.foundation}}</p></li>
                <li>
                  <span>评估报告：</span>
                  <p v-if="item.att_list.length === 0 || !item.att_list" style="color: #999">暂无报告</p>
                  <p class="color_onlike" @click="handleView(it)" v-if="item.att_list.length !== 0 && item.att_list" v-for="(it, index1) in item.att_list" :key='index1'>{{it.name}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="second_list_none" v-if="otherList.length === 0">
          <img src="../../../../../static/img/other/none.png" alt="">
          <h4>如果有其他担保可以进行添加，例如房产、车产等等</h4>
        </div>
      </div>
    </div>
    <div class="btn_list">
      <div @click="handleNext">下一步</div>
    </div>
    <!-- 其他担保品 -->
    <el-dialog title="其他担保品" :visible.sync="visibleSyncOther" width="762px" :before-close="handleClose">
      <div class="other_collateral">
        <select v-model="collateral_type">
          <option value="1">房产</option>
          <option value="2">汽车</option>
          <option value="3">股权</option>
          <option value="4">基金</option>
        </select>
        <div class="select_list">
          <h3>请填写您的<span>{{collateral_type === '1' ? '房产' : collateral_type === '2' ? '汽车' : collateral_type === '3' ? '股权' : '基金'}}</span>信息</h3>
          <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
            <el-form-item label="城市" prop='address' v-if="collateral_type === '1' || collateral_type === '2'">
              <v-distpicker @province="changedprovince($event, from)" @city="chengedcity($event, from)" @area="chengedarea($event, from)"></v-distpicker>
            </el-form-item>
            <el-form-item label="小区/地址" prop='full_address' v-if="collateral_type === '1'">
              <div class="input_type">
                <input v-model="ruleForm.full_address" maxlength="64" placeholder='请输入地址或小区名称'>
              </div>
            </el-form-item>
            <el-form-item label="楼栋" prop='house_address' v-if="collateral_type === '1'">
              <div class="input_type num_style">
                <input type="text" v-model="from.number">
                <span>号</span>
              </div>
              <div class="input_type num_style">
                <input type="text" v-model="from.room">
                <span>室</span>
              </div>
            </el-form-item>
            <el-form-item label="面积" prop='area' v-if="collateral_type === '1'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.area" maxlength="32">
                <span>平米</span>
              </div>
            </el-form-item>
            <el-form-item label="车型" prop='car_type' v-if="collateral_type === '2'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.car_type" maxlength="32" placeholder="请输入车型">
              </div>
            </el-form-item>
            <el-form-item label="公司名称" prop='business_name' v-if="collateral_type === '3'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.business_name" maxlength="32" placeholder="请输入公司名称">
              </div>
            </el-form-item>
            <el-form-item label="股权比例" prop='ratio' v-if="collateral_type === '3'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.ratio" maxlength="32" placeholder="请输入股权比例">
              </div>
            </el-form-item>
            <el-form-item label="基金简称" prop='foundation' v-if="collateral_type === '4'">
              <div class="input_type">
                <input type="text" v-model="ruleForm.foundation" maxlength="32" placeholder="请输入基金简称">
              </div>
            </el-form-item>
            <el-form-item label="市场估值" prop='appraisement'>
              <div class="input_type">
                <input type="text" maxlength="32" v-model="ruleForm.appraisement">
                <span>元</span>
              </div>
            </el-form-item>
            <el-form-item label='评估报告'>
              <div class="file_img">
                <el-upload class="upload-demo" drag :action="upLoadUrl" :http-request="handleUpload" :auto-upload="true"
                  :on-preview="handlePictureCardPreview" :before-upload="beforeAvatarUpload" multiple :file-list="fileList">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleUrl" append-to-body>
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="button_slot">
                <div class="install" @click="otherCollateral">确定</div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 订单融资：第二还款来源（自偿性还款来源） -->
    <el-dialog :visible.sync="dialogVisibles" width="1300px" :before-close="handleClose">
      <div class="el_dialog_divlist" v-if='checkList.length !== 0'>
        <div class="div_list" v-for="(item, index) in checkList" :key='index' v-if="checkList !== 0">
          <div class="top">
            <h3>
              <img :src="pics[item.ticket_type]">
              <p>面额（元）：<span>{{item.amount}}</span></p>
            </h3>
            <button @click="handleAdd(index)">{{!item.sel ? '添加' : '取消'}}</button>
          </div>
          <div class="list">
            <ul>
              <li>
                <span>销售项目：</span>
                <p @click="handleChain(item)">{{item.contract_name}}</p>
              </li>
              <li>
                <span>付款企业名称（企业填写）：</span>
                <p v-if="item.payment_info" :style="!item.payment_info.payment ? 'color: #999; text-decoration: none;':''">{{item.payment_info.payment || '未填写'}}</p>
              </li>
            </ul>
            <ul>
              <li><span>票据类型：</span><p>{{item.type}}</p></li>
              <li><span>票据金额（元）：</span><p>{{item.amount}}</p></li>
              <li><span>汇票到期日：</span><p>{{item.payment_date}}</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="null_tip" v-if="checkList.length === 0">暂无可用自偿性还款来源</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'secondRepayment',
  data () {
    return {
      // 选择第二还款来源
      dialogVisibles: false,
      // 其他担保
      otherList: [],
      // 选择其他担保
      visibleSyncOther: false,
      dialogVisibleUrl: false,
      dialogImageUrl: '',
      // 其他担保品
      collateral_type: '1',
      fileList: [],
      upLoadUrl: '',
      att_list: [],
      // 添加其他担保品
      ruleForm: {
        address: '',
        full_address: '',
        house_address: '',
        area: '',
        appraisement: '',
        car_type: '',
        business_name: '',
        ratio: '',
        foundation: ''
      },
      file: '',
      from: {
        number: '',
        room: '',
        province: '',
        city: '',
        region: ''
      },
      checkList: [],
      selList: [],
      pics: ['', require('../../../../../static/img/tickets/jq.png'), require('../../../../../static/img/tickets/yq.png'), require('../../../../../static/img/tickets/tq.png')]
    }
  },
  created () {
    const that = this
    this.$ajax.get(`/api/financing/ticket_list/`).then(res => {
      console.log(res)
      if (res.status === 200) {
        res.data.forEach(val => {
          val.sel = true
        })
        that.checkList = res.data
        that.selList = res.data
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 下一步
    handleNext () {
      let {otherList, selList} = this
      console.log(otherList)
      this.$emit('second', {otherList, selList})
    },
    // 显示弹框 0 为第二还款来源， 1为其他担保
    openList (i) {
      var that = this
      if (i === 0) {
        that.dialogVisibles = true
      } else if (i === 1) {
        that.visibleSyncOther = true
      }
    },
    // 关闭弹框
    handleClose () {
      var that = this
      that.dialogVisibles = false
      that.visibleSyncOther = false
    },
    // 添加第二还款来源
    handleAdd (index) {
      let checkList = this.checkList
      let selList = []
      checkList[index].sel = !checkList[index].sel
      checkList.forEach(val => {
        if (val.sel) selList.push(val)
      })
      this.checkList = checkList
      this.selList = selList
    },
    // 删除选中的第二还款来源
    handleDelete (index) {
      let selList = this.selList
      let checkList = this.checkList
      let delItem = selList[index]
      checkList.forEach(val => {
        if (val.id === delItem.id) val.sel = false
      })
      // selList.splice(index, 1)
      let arr = []
      selList = checkList.forEach((val) => {
        if (val.sel) {
          arr.push(val)
        }
      })
      console.log(arr)
      this.selList = arr
      // this.checkList = checkList
    },
    // 所在省
    changedprovince ($event, obj) {
      obj.province = $event.value
      this.ruleForm.city = ''
      this.ruleForm.region = ''
    },
    // 所在地
    chengedcity ($event, obj) {
      obj.city = $event.value
      this.ruleForm.region = ''
    },
    // 所在区
    chengedarea ($event, obj) {
      obj.region = $event.value
    },
    // 添加其他担保
    otherCollateral () {
      let that = this
      let { from, ruleForm, collateral_type, att_list, otherList } = this
      if (collateral_type === '1') {
        if (from.province === '') {
          that.$message.error('请选择所在省份')
        } else {
          if (from.city === '') {
            that.$message.error('请选择所在城市')
          } else {
            if (from.region === '') {
              that.$message.error('请选择所在区域')
            } else {
              if (ruleForm.full_address === '') {
                that.$message.error('请填写小区地址')
              } else {
                if (ruleForm.area === '') {
                  that.$message.error('请填写房屋面积')
                } else {
                  if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(ruleForm.appraisement))) {
                    that.$message.error('请填写正确的市场估值')
                  } else {
                    otherList.push({...ruleForm, ...from, att_list, collateral_type})
                    this.ruleForm = {
                      address: '',
                      full_address: '',
                      house_address: '',
                      area: '',
                      appraisement: '',
                      car_type: '',
                      business_name: '',
                      ratio: '',
                      foundation: ''
                    }
                    this.from = {
                      number: '',
                      room: '',
                      province: '',
                      city: '',
                      region: ''
                    }
                    this.collateral_type = '1'
                    this.att_list = []
                    this.otherList = otherList
                    this.visibleSyncOther = false
                    this.fileList = []
                  }
                }
              }
            }
          }
        }
      } else if (collateral_type === '2') {
        if (from.province === '') {
          that.$message.error('请选择所在省份')
        } else {
          if (from.city === '') {
            that.$message.error('请选择所在城市')
          } else {
            if (from.region === '') {
              that.$message.error('请选择所在区域')
            } else {
              if (ruleForm.car_type === '') {
                that.$message.error('请填写车辆型号')
              } else {
                if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(ruleForm.appraisement))) {
                  that.$message.error('请输入正确的市场估值')
                } else {
                  // if (that.att_list.length === 0) {} else {}
                  otherList.push({...ruleForm, ...from, att_list, collateral_type})
                  this.ruleForm = {
                    address: '',
                    full_address: '',
                    house_address: '',
                    area: '',
                    appraisement: '',
                    car_type: '',
                    business_name: '',
                    ratio: '',
                    foundation: ''
                  }
                  this.from = {
                    number: '',
                    room: '',
                    province: '',
                    city: '',
                    region: ''
                  }
                  this.collateral_type = '1'
                  this.att_list = []
                  this.otherList = otherList
                  this.visibleSyncOther = false
                  this.fileList = []
                }
              }
            }
          }
        }
      } else if (collateral_type === '3') {
        if (ruleForm.business_name === '') {
          that.$message.error('请输入公司名称')
        } else {
          if (ruleForm.ratio === '') {
            that.$message.error('请输入正确的股权比例')
          } else {
            if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(ruleForm.appraisement))) {
              that.$message.error('请输入正确的市场估值') 
            } else {
              // if (that.att_list.length === 0) {} else {}
              otherList.push({...ruleForm, ...from, att_list, collateral_type})
              this.ruleForm = {
                address: '',
                full_address: '',
                house_address: '',
                area: '',
                appraisement: '',
                car_type: '',
                business_name: '',
                ratio: '',
                foundation: ''
              }
              this.from = {
                number: '',
                room: '',
                province: '',
                city: '',
                region: ''
              }
              this.collateral_type = '1'
              this.att_list = []
              this.otherList = otherList
              this.visibleSyncOther = false
              this.fileList = []
            }
          }
        }
      }else if (collateral_type === '4') {
        console.log(ruleForm)
        if (ruleForm.foundation === '') {
          that.$message.error('请输入基金名称')
        } else {
          if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(ruleForm.appraisement))) {
            that.$message.error('请输入正确的市场估值') 
          } else {
            otherList.push({...ruleForm, ...from, att_list, collateral_type})
            this.ruleForm = {
              address: '',
              full_address: '',
              house_address: '',
              area: '',
              appraisement: '',
              car_type: '',
              business_name: '',
              ratio: '',
              foundation: ''
            }
            this.from = {
              number: '',
              room: '',
              province: '',
              city: '',
              region: ''
            }
            this.collateral_type = '1'
            this.att_list = []
            this.otherList = otherList
            this.visibleSyncOther = false            
            this.fileList = []
          }
        }
      }
      console.log(this.otherList)
    },
    // 预览其他担保附件
    handlePictureCardPreview (file) {
      var that = this
      if (file.raw.type.split('/')[1] !== 'jpg' && file.raw.type.split('/')[1] !== 'png' && file.raw.type.split('/')[1] !== 'gif' && file.raw.type.split('/')[1] !== 'jpeg') {
        this.dialogVisibleUrl = false
        window.open(file.url)
      } else {
        const fr = new FileReader()
        fr.onload = function (e) {
          console.log(e)
          that.dialogImageUrl = e.currentTarget.result
          that.dialogVisibleUrl = true
        }
        fr.readAsDataURL(file.raw)
      }
    },
    // 附件上传其他担保
    handleUpload () {
      const that = this
      let file = that.file
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error('文件大小超过2M')
      } else if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        this.$message.error('请上传png, jpg或jpeg类型的文件')
      } else {
        let upload = new FormData()
        upload.append('function_module', 'financing')
        upload.append('file', file)
        this.$ajax.post('/api/ns_file/', upload).then(res => {
            console.log(res)
          if (res.status === 200) {
            this.resImg = res.data
            this.att_list.push({url: res.data, name: file.name})
            this.$message.success('上传成功')
          }
        })
      }
    },
    // 其他担保
    beforeAvatarUpload (file) {
      var that = this
      if (file.name.length > 64) {
        that.$message.error('文件名称过长')
      } else {
        that.file = file
      }
    },
    // 删除其他担保
    handleDropOther (index) {
      let { otherList } = this
      otherList.splice(index, 1)
      this['otherList'] = otherList
    },
    handleChain (el) {
      let id = el.chain_id
      let path = '#/chain_app/payment_chain?id='
      if (el.chain_type) {
        el.chain_type === 2 ? path = '#/chain_app/payment_chain?id=' : path = '#/chain_app/receive_chain?id='
      }
      let str = ''
      window.open(`${path}${id}`)
    },
    // 查看担保附件
    handleView (item) {
      this.dialogVisibleUrl = true
      this.dialogImageUrl = this.$root_url() + item.url
    }
  },
  computed: {
    secSum: function () {
      let s = 0
      this.selList.forEach(val => {
        s += Number(val.amount)
      })
      return s.toFixed(2)
    },
    otherSum: function () {
      let s = 0
      this.otherList.forEach(val => {
        s += Number(val.appraisement)
      })
      return s.toFixed(2)
    }
  }
}
</script>

<style lang="less" scoped>
#second_content {
  width:100%;
  // min-height: 100%;
  .repayment {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    margin: 20px 0;
    padding: 0 21px 22px;
    .title {
      height: 52px;
      border-bottom: 1px solid #e1e6f0;
      padding-top: 20px;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        border-left: 5px solid #eb6100;
        height: 24px;
        padding-left: 22px;
        line-height: 24px;
      }
    }
    .content_second {
      position: relative;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        // height: 48px;
        line-height: 48px;
        // padding: 21px 0 0 22px;
      }
      .btn {
        position: absolute;
        right: 0px;
        top: 10px;
        i {
          margin-right: 10px;
        }
        button {
          outline: none;
          border: none;
          color: #fff;
          background:#e87626;
          border-radius:2px;
          width:181px;
          height:28px;
        }
      }
      .second_list {
        margin-top: 19px;
        padding: 0 30px;
        .div_list {
          background:#ffffff;
          border:1px solid #e1e6f0;
          border-bottom: none;
          border-radius:2px;
          width:100%;
          // height:151px;
          .top {
            background:#f7f7f7;
            width:100%;
            height:50px;
            position: relative;
            h4 {
              img {
                height: 42px;
                margin:4px 22px;
                float: left;
              }
              p {
                float: left;
                font-family:PingFangSC-Regular;
                font-size:14px;
                color:#666666;
                letter-spacing:0;
                text-align:center;
                padding-top: 14px;
                span {
                  font-family:PingFangSC-Semibold;
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:center;
                  font-weight: bold;
                }
              }
            }
            .el-icon-delete {
              position: absolute;
              top: 16px;
              right: 52px;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#e87626;
              font-weight: bold;
              cursor: pointer;
            }
          }
          .list {
            // height: 48px;
            width: 100%;
            ul {
              display: flex;
              flex-direction: row;
              border-bottom:1px solid #e1e6f0;
              padding: 0 40px;
              li {
                width: 45%;
                // height: 48px;
                line-height: 52px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                span {
                  float: left;
                  font-family:PingFangSC-Regular;
                  font-size:14px;
                  color:#666666;
                  letter-spacing:0;
                  text-align:left;
                }
                p {
                  width: calc(100% - 185px);
                  font-family:PingFangSC-Semibold;
                  font-size:14px;
                  color:#333333;
                  max-width: calc(100% - 185px);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .color_onlike {
                  width: calc(100% - 70px);
                  font-family:PingFangSC-Semibold;
                  text-decoration: underline;
                  font-size:14px;
                  color:#eb6100;
                  font-weight: bold;
                  cursor: pointer;
                }
              }
              // li:first-child {
              //   padding-left: 82px;
              // }
            }
          }
        }
      }
      .second_list_none {
        text-align: center;
        min-height: 200px;
        color: #999;
        img {
          width:162px;
          height:125px;
          margin-top: 20px;
        }
      }
    }
  }
  .other_guarantee {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    padding: 20px 30px;
    .title {
      height: 52px;
      border-bottom: 1px solid #e1e6f0;
      padding-top: 20px;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        border-left: 5px solid #eb6100;
        height: 24px;
        padding-left: 22px;
        line-height: 24px;
      }
    }
    .content_second {
      position: relative;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        // height: 48px;
        line-height: 48px;
        // padding: 21px 0 0 22px;
      }
      .btn {
        position: absolute;
        right: 0px;
        top: 10px;
        i {
          margin-right: 10px;
        }
        button {
          outline: none;
          border: none;
          color: #fff;
          background:#e87626;
          border-radius:2px;
          width:181px;
          height:28px;
        }
      }
      .second_list {
        padding: 0 60px 0 23px;
        .div_list_content {
          background:#ffffff;
          border:1px solid #e1e6f0;
          border-radius:2px;
          width:100%;
          height:88px;
          margin-top: 19px;
          .top {
            background:#f7f7f7;
            width:100%;
            height:45px;
            position: relative;
            .el-icon-delete {
              position: absolute;
              top: 16px;
              right: 52px;
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#e87626;
              font-weight: bold;
              cursor: pointer;
            }
            ul {
              display: flex;
              flex-direction: row;
              padding: 0 40px;
              li {
                width: 45%;
                // height: 45px;
                line-height: 45px;
                span {
                  float: left;
                  font-family:PingFangSC-Regular;
                  font-size:14px;
                  color:#666666;
                  letter-spacing:0;
                  text-align:left;
                }
                p {
                  float: left;
                  font-family:PingFangSC-Semibold;
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                  max-width: 140px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .color_onlike {
                  font-family:PingFangSC-Semibold;
                  font-size:14px;
                  color:#eb6100;
                  letter-spacing:0;
                  text-align:left;
                  text-decoration: underline;
                }
              }
            }
          }
          .list {
            // height: 44px;
            width: 100%;
            // border-bottom:1px solid #e1e6f0;
            ul {
              display: flex;
              flex-direction: row;
              padding: 0 40px;
              li {
                width: 45%;
                // height: 44px;
                line-height: 44px;
                span {
                  float: left;
                  font-family:PingFangSC-Regular;
                  font-size:14px;
                  color:#666666;
                  letter-spacing:0;
                  text-align:left;
                }
                p {
                  width: calc(100% - 185px);                
                  float: left;
                  font-family:PingFangSC-Semibold;
                  font-size:14px;
                  color:#333333;
                  letter-spacing:0;
                  text-align:left;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .color_onlike {
                  font-family:PingFangSC-Semibold;
                  font-size:14px;
                  color:#eb6100;
                  letter-spacing:0;
                  text-align:left;
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
      .second_list_none {
        text-align: center;
        min-height: 200px;
        color: #999;
        img {
          width:162px;
          height:125px;
          margin-top: 20px;
        }
      }
    }
  }
  .btn_list {
    padding: 24px 0;
    background: #fafafa;
    div {
      width: 120px;
      text-align: center;
      line-height: 30px;
      margin: 0 auto;
      cursor: pointer;
      background: #e87626;
      border-radius: 2px;
      height: 30px;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 0;
    }
  }
  .el_dialog_divlist {
    padding: 20px 50px;
    width:100%;
    height:100%;
    // min-width: 1200px;
    .div_list {
      background:#ffffff;
      border:1px solid #e1e6f0;
      border-bottom: none;
      // height:151px;
      width:100%;
      border-radius:2px;
      margin-bottom: 20px;
      .top {
        background:#f7f7f7;
        width:100%;
        height:50px;
        position: relative;
        h3 {
          img {
            float: left;
            margin: 5px 20px;
            height: 40px;
          }
          p {
            float: left;
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#666666;
            letter-spacing:0;
            text-align:center;
            padding-top: 14px;
            span {
              font-family:PingFangSC-Semibold;
              font-size:14px;
              color:#333333;
              letter-spacing:0;
              text-align:center;
              font-weight: bold;
            }
          }
        }
        button {
          position: absolute;
          top: 11px;
          right: 20px;
          // font-family:PingFangSC-Semibold;
          font-size:14px;
          height: 28px;
          border-radius: 3px;
          color:#fff;
          // letter-spacing:0;
          width: 72px;
          background: #eb6100;
          text-align:center;
          border: none;
          outline: none;
        }
      }
      .list {
        // height: 48px;
        width: 100%;
        ul:first-child {
          li:first-child {
            p {
              color:#eb6100;
              font-weight: bolder;
              letter-spacing:0;
              text-align:left;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        ul {
          border-bottom:1px solid #e1e6f0;
          padding: 0 40px;
          display: flex;
          flex-direction: row;
          li {
            width: 45%;
            // height: 48px;
            line-height: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              float: left;
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#666666;
              letter-spacing:0;
              text-align:left;
            }
            p {
              float: left;
              font-family:PingFangSC-Semibold;
              font-size:14px;
            }
          }
        }
      }
    }
  }
  .null_tip {
    line-height: 120px;
    text-align: center;
    color: #999;
  }
  .other_collateral {
    select {
      width: 200px;
      height: 32px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      outline: none;
      background: #fff;
      font-family:PingFangSC-Regular;
      font-size:14px;
      color:#333333;
      letter-spacing:0;
      text-align:left;
      padding-left: 26px;
    }
    .select_list {
      margin-top: 20px;
      h3 {
        font-weight: bold;
        margin-bottom: 20px;
        span {
          font-weight: bold;
        }
      }
      .input_type {
        display: inline-block;
        position: relative;
        input {
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          outline: none;
          width: 320px;
          height: 32px;
          padding: 0 10px;
          padding-right: 46px;
        }
        span {
          position: absolute;
          right: 15px;
          top: 2px;
        }
      }
      .num_style {
        margin-right: 15px;
        position: relative;
        input {
          width: 150px;
          padding-right: 32px;
        }
        span {
          position: absolute;
          right: 15px;
          top: 2px;
          color: #606266;
        }
      }
      .file_img {
        width: 360px;
        .upload-demo {
          width: 100%;
          .el-upload {
            width: 360px;
          }
        }
      }
      .button_slot {
        text-align: center;
        div {
          width: 100px;
          height: 32px;
          outline: none;
          border-radius: 5px;
          margin: 0 20px;
          cursor: pointer;
          display: inline-block;
          line-height: 32px;
          text-align: center;
        }
        .install {
          background: #eb6100;
          border: none;
          color: #fff;
          margin: 0 auto;
        }
        .cancel {
          background: none;
          border: 1px solid #eb6100;
          color: #eb6100;
        }
      }
    }
    .select_ul {
      padding-bottom: 30px;
      ul {
        li {
          padding-top: 10px;
          padding-left: 10px;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
          }
          p {
            display: inline-block;
            padding-left: 20px;
            color: #333;
          }
          div {
            display: inline-block;
            // padding-top: 5px;
            span {
              float: left;
              width: 100px;
              text-align: right;
            }
            div {
              float: left;
              padding-left: 20px;
              a {
                color: #eb6100;
                cursor: pointer;
                display: block;
                margin-right: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-transition: color .3s;
                transition: color .3s;
                white-space: nowrap;
                font-size: 14px;
                padding-bottom: 10px;
                i {
                  padding-right: 5px;
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
