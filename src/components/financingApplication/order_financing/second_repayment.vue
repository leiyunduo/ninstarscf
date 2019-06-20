<template>
  <div id="second_content">
    <!-- 第二还款来源 -->
    <div class="repayment">
      <div class="title">
        <h3>第二还款来源（担保性还款来源）</h3>
      </div>
      <div class="content_second">
        <h3>其它应收总额：10000</h3>
        <div class="btn">
          <button @click="openList(0)"><i class="el-icon-plus"></i>添加需要融资采购订单</button>
        </div>
        <div class="second_list">
          <div class="div_list">
            <div class="top">
              <h4>
                <img src="../../../../static/img/tickets/yq_xi.png" alt="">
                <p>面额：<span>100000</span></p>
              </h4>
              <i class="el-icon-delete"></i>
            </div>
            <div class="list">
              <ul>
                <li><span>销售项目：</span><p class="color_onlike">是哦啊发红或</p></li>
                <li><span>付款人：</span><p class="color_onlike">我得到的</p></li>
                <li></li>
              </ul>
              <ul>
                <li><span>票据类型：</span><p class="color_onlike">是哦啊发红或是哦啊发红或是哦啊发红或</p></li>
                <li><span>票据金额：</span><p>我得到的</p></li>
                <li><span>汇票到期日：</span><p class="color_onlike">2018-11-26</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="second_list_none">
          <img src="../../../../static/img/other/none.png" alt="">
          <h4>还没添加其他应收，请选择其他应收</h4>
        </div>
      </div>
    </div>
    <!-- 其他担保 -->
    <div class="other_guarantee">
      <div class="content_second">
        <h3>其它应收总额：10000</h3>
        <div class="btn">
          <button @click="openList(1)"><i class="el-icon-plus"></i>添加其他担保</button>
        </div>
        <div class="second_list">
          <div class="div_list_content" v-if="otherList.length !== 0" v-for="(item, index) in otherList" :key="index">
            <div class="top">
              <ul>
                <li><span>类型：</span><p>{{item.collateral_type === '1' ? '房产' : item.collateral_type === '2' ? '汽车' : item.collateral_type === '3' ? '股权' : '基金'}}</p></li>
                <li><span>市场估值：</span><p>100000</p></li>
                <li></li>
                <li></li>
              </ul>
              <i class="el-icon-delete"></i>
            </div>
            <div class="list" v-if="item.collateral_type === '1'">
              <ul>
                <li><span>城市：</span><p>是哦啊发红或是哦啊发红或是哦啊发红或</p></li>
                <li><span>小区地址：</span><p>我得到的</p></li>
                <li><span>面积：</span><p>2018-11-26</p></li>
                <li><span>评估报告：</span><p class="color_onlike">2018-11-26</p></li>
              </ul>
            </div>
            <div class="list" v-if="item.collateral_type === '2'">
              <ul>
                <li><span>城市：</span><p>是哦啊发红或</p></li>
                <li><span>小区地址：</span><p>我得到的</p></li>
                <li><span>评估报告：</span><p class="color_onlike">2018-11-26</p></li>
                <li></li>
              </ul>
            </div>
            <div class="list" v-if="item.collateral_type === '3'">
              <ul>
                <li><span>公司名称：</span><p>是哦啊发红或</p></li>
                <li><span>股权比例：</span><p>我得到的</p></li>
                <li><span>评估报告：</span><p class="color_onlike">2018-11-26</p></li>
                <li></li>
              </ul>
            </div>
            <div class="list" v-if="item.collateral_type === '4'">
              <ul>
                <li><span>公司名称：</span><p>是哦啊发红或</p></li>
                <li><span>股权比例：</span><p>我得到的</p></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="second_list_none">
          <img src="../../../../static/img/other/none.png" alt="">
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
              <v-distpicker @province="changedprovince($event,from)" @city="chengedcity($event,from)" @area="chengedarea($event,from)"></v-distpicker>
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
                <el-upload class="upload-demo" drag :action="upLoadUrl" :http-request="upLoad" :auto-upload="true"
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
                <div class="cancel" @click="handleClose">取消</div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 订单融资：第二还款来源（自偿性还款来源） -->
    <el-dialog :visible.sync="dialogVisibles" width="1300px" :before-close="handleClose">
      <div class="el_dialog_divlist">
        <div class="div_list">
          <div class="top">
            <h3>
              <img src="../../../../static/img/tickets/yq_xi.png" alt="">
              <p>面额：<span>100000</span></p>
            </h3>
            <button>添加</button>
          </div>
          <div class="list">
            <ul>
              <li><span>销售项目：</span><p>是哦啊发红或</p></li>
              <li><span>付款人：</span><p>我得到的</p></li>
              <li></li>
            </ul>
            <ul>
              <li><span>票据类型：</span><p>是哦啊发红或</p></li>
              <li><span>票据金额：</span><p>我得到的</p></li>
              <li><span>汇票到期日：</span><p>2018-11-26</p></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="el_dialog_divlist">暂无数据</div> -->
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
      otherList: [
        {
          collateral_type: '1'
        },
        {
          collateral_type: '2'
        }
      ],
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
      from: {
        number: '',
        room: '',
        province: '',
        city: '',
        region: ''
      }
    }
  },
  methods: {
    // 下一步
    handleNext () {
      this.$emit('second', true)
    },
    openList (i) {
      var that = this
      if (i === 0) {
        // 第二还款来源
        that.dialogVisibles = true
      } else if (i === 1) {
        // 其他担保
        that.visibleSyncOther = true
      }
    },
    handleClose () {
      var that = this
      that.dialogVisibles = false
      that.visibleSyncOther = false
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
    // 以下为其他担保========================
    otherCollateral () {},
    // 展示列表图片预览-其他担保
    aClick (i) {
      window.open(this.$root_url() + i.location)
    },
    // 上传其他担保
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
    upLoad () {
      var that = this
      var fileObj = new FormData()
      var file = that.file
      var type = that.file.name.substring(that.file.name.indexOf('.') + 1, that.file.name.length)
      fileObj.append('pic_name', file.name)
      fileObj.append('attachment', file)
      fileObj.append('token', this.$token())
      fileObj.append('type', type)
      that.$ajax.post('/api/other_collateral_attachment/', fileObj).then(res => {
        if (res.data.code === '1') {
          that.att_list.push(res.data.att_id)
        } else {
          that.$message.error('文件有误，请重新上传!')
          that.$loading(that.$setLoading()).close()
        }
      })
    },
    // 其他担保
    beforeAvatarUpload (file) {
      var that = this
      if (file.name.length > 64) {
        that.$message.error('文件名称过长')
      } else {
        that.file = file
      }
    }
  }
}
</script>

<style lang="less" scoped>
#second_content {
  width:100%;
  min-height: 100%;
  .repayment {
    background:#ffffff;
    border:1px solid #e1e6f0;
    border-radius:2px;
    width:100%;
    height:auto;
    margin: 20px 0;
    padding: 0 53px 22px 21px;
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
        padding: 21px 0 0 22px;
      }
      .btn {
        position: absolute;
        right: 60px;
        top: 19px;
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
        padding: 0 60px 0 23px;
        .div_list {
          background:#ffffff;
          border:1px solid #e1e6f0;
          border-radius:2px;
          width:100%;
          height:151px;
          .top {
            background:#f7f7f7;
            width:100%;
            height:50px;
            position: relative;
            h4 {
              img {
                float: left;
                margin: 15px 24px 0 22px;
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
            height: 48px;
            width: 100%;
            border-bottom:1px solid #e1e6f0;
            ul {
              display: flex;
              flex-direction: row;
              li {
                flex: 1;
                height: 48px;
                line-height: 52px;
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
                  text-decoration: underline;
                  font-size:14px;
                  color:#eb6100;
                  letter-spacing:0;
                  text-align:left;
                }
              }
              li:first-child {
                padding-left: 82px;
              }
            }
          }
        }
      }
      .second_list_none {
        text-align: center;
        min-height: 200px;
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
    padding: 0 21px 22px;
    margin-bottom: 20px;
    .content_second {
      position: relative;
      h3 {
        font-family:PingFangSC-Semibold;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight: bold;
        padding: 21px 0 0 22px;
      }
      .btn {
        position: absolute;
        right: 60px;
        top: 19px;
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
              li {
                flex: 1;
                height: 45px;
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
              li:first-child {
                padding-left: 82px;
              }
            }
          }
          .list {
            height: 44px;
            width: 100%;
            // border-bottom:1px solid #e1e6f0;
            ul {
              display: flex;
              flex-direction: row;
              li {
                flex: 1;
                height: 44px;
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
              li:first-child {
                padding-left: 82px;
              }
            }
          }
        }
      }
      .second_list_none {
        text-align: center;
        min-height: 200px;
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
    div {
      width: 120px;
      border-radius: 3px;
      background: #eb6100;
      color: #fff;
      text-align: center;
      line-height: 42px;
      margin: 0 auto;
      cursor: pointer;
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
      height:151px;
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
            margin: 15px 24px 0 22px;
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
          top: 16px;
          right: 52px;
          font-family:PingFangSC-Semibold;
          font-size:14px;
          color:#e87626;
          letter-spacing:0;
          text-align:left;
          border: none;
          outline: none;
          background: none;
          text-decoration: underline;
          font-weight: bold;
        }
      }
      .list {
        height: 48px;
        width: 100%;
        border-bottom:1px solid #e1e6f0;
        ul {
          display: flex;
          flex-direction: row;
          li {
            flex: 1;
            height: 48px;
            line-height: 48px;
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
              color:#eb6100;
              letter-spacing:0;
              text-align:left;
              text-decoration: underline;
            }
          }
          li:first-child {
            padding-left: 82px;
          }
        }
      }
    }
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
        text-align: left;
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
