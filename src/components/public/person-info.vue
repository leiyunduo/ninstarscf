<template>
  <div class="PersonInfo">
    <div class="roleModal-wrap" v-show="dialogVisible" :modal-append-to-body="false" :style="!top ? 'z-index: 1811;' : 'z-index: 2822'">
      <div class="roleModal">
        <div class="roleModal__header">
          <h4>用户信息</h4>
          <img class="_close" @click="closeView" src="static/img/closeU.png" alt="">
        </div>
        <div class="roleModal__body">
          <div class="role-info">
            <div class="auth" v-if="!auth">
              <span>认证状态：</span>
              <span>{{personInfo.person_info.auth ? '已认证' : '未认证'}}</span>
              <button v-if="!personInfo.person_info.auth && use" @click="authF">开始认证</button>
            </div>
            <span class="titles">基本信息</span>
            <div class="role-info__detail">
              <div class="role-info__item">
                <div class="role-info__item-row">
                  <label for="">姓名：</label>
                  <span class="role-content">{{personInfo.person_info.name || '暂无'}}</span>
                  <img :src="personInfo.person_info.face ? facePic.active : facePic.disable" alt="" title="未进行人脸识别认证">
                  <img :src="personInfo.person_info.video ? videoPic.active : videoPic.disable" alt="" title="视频离线">
                </div>
                <div class="role-info__item-row">
                  <label for="">角色：</label>
                  <span class="role-content">{{personInfo.person_info.role || '暂无'}}</span>
                </div>
                <div class="role-info__item-row">
                  <label for="">微信：</label>
                  <span class="role-content">{{personInfo.person_info.weChat || '暂无'}}</span>
                  <img :src="personInfo.person_info.wechat ? wechatPic.active : wechatPic.disable" alt="" title='未绑定微信'>
                </div>
              </div>
              <div class="role-info__item">
                <div class="role-info__item-row role-company">
                  <label for="">所属公司：</label>
                  <div class="role-company-group">
                    <p class="role-company-group__item" v-for="(item, index) in personInfo.person_info.company" :key="index">{{item.company_name}}</p>
                  </div>
                </div>    
                <div class="role-info__item-row">
                  <label for="">身份证号：</label>
                  <span class="role-content">{{personInfo.person_info.iDnumber || '暂无'}}</span>
                </div>    
                <div class="role-info__item-row">
                  <label for="">邮箱：</label>
                  <span class="role-content">{{personInfo.person_info.email || '暂无'}}</span>
                </div>    
              </div>
              <div class="role-info__item">
                <div class="role-info__item-row">
                  <label for="">手机号码：</label>
                  <span class="role-content">{{personInfo.person_info.phone || '暂无'}}</span>
                </div> 
                <div class="role-info__item-row">
                  <label for="">办公室电话：</label>
                  <span class="role-content">{{personInfo.person_info.officePhone || '暂无'}}</span>
                </div> 
                <div class="role-info__item-row">
                  <label for="">QQ：</label>
                  <span class="role-content">{{personInfo.person_info.QQ || '暂无'}}</span>
                </div> 
              </div>
            </div>
          </div>
          <div class="img-info">
            <span class="titles">图像信息</span>
            <div class="img-menu" v-if="!isAgent">
              <div class="img-menu__item" v-if='personInfo.auth_pic.legal_person_business_license' @click="imageView(personInfo.auth_pic.legal_person_business_license)">
                <img class="auth-img" :src="$root_url() + personInfo.auth_pic.legal_person_business_license" alt="">
                <div class="img-cursor">
                  <span>查看大图</span>
                  <img src="static/img/chain/cursor_01.png" alt="">
                </div>
              </div>
              <div class="img-menu__item" @click="imageView(personInfo.auth_pic.legal_person_id_1)">
                <img class="auth-img" :src="$root_url() + personInfo.auth_pic.legal_person_id_1" alt="">
                <div class="img-cursor">
                  <span>查看大图</span>
                  <img src="static/img/chain/cursor_01.png" alt="">
                </div>
              </div>
              <div class="img-menu__item" @click="imageView(personInfo.auth_pic.legal_person_id_2)">
                <img class="auth-img" :src="$root_url() + personInfo.auth_pic.legal_person_id_2" alt="">
                <div class="img-cursor">
                  <span>查看大图</span>
                  <img src="static/img/chain/cursor_01.png" alt="">
                </div>
              </div>
              <div class="img-menu__item" @click="imageView(personInfo.auth_pic.legal_person_id_3)">
                <img class="auth-img" :src="$root_url() + personInfo.auth_pic.legal_person_id_3" alt="">
                <div class="img-cursor">
                  <span>查看大图</span>
                  <img src="static/img/chain/cursor_01.png" alt="">
                </div>
              </div>
              <div class="img-menu__item" @click="imageView(personInfo.auth_pic.legal_person_id_4)">
                <img class="auth-img" :src="$root_url() + personInfo.auth_pic.legal_person_id_4" alt="">
                <div class="img-cursor">
                  <span>查看大图</span>
                  <img src="static/img/chain/cursor_01.png" alt="">
                </div>
              </div>
            </div>
            <div v-else class="no_pic">
              <span>暂无相关信息</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogImgVisible" :modal-append-to-body="false">
      <div class="imgView" style="">
        <img :src="imgView" alt="">
      </div>
    </el-dialog>
    <el-dialog id="addAgent"
      width="50%"
      :visible.sync="innerVisible"
      append-to-body>
      <div class="role_qr">
        <p>web 端暂不支持身份信息采集识别功能，请用手机app扫面下方二维码进行操作。（认证操作可后续进行）</p>
        <!-- <img :src="qrcode" alt=""> -->
        <div id="qrcode"></div>
      </div>
      <div class="role_person_install">
        <button @click="innerVisible = false">完成</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import QRCode from  "qrcode-svg"
  export default {
    name: '',
    props: ['pid', 'pName', 'isAgent', 'top', 'auth', 'use'],
    data () {
      return {
        dialogVisible: true,
        dialogImgVisible: false,
        personInfo: {
          auth_pic: {
            legal_person_business_license: "",
            legal_person_id_1: "",
            legal_person_id_2: "",
            legal_person_id_3: "",
            legal_person_id_4: "",
          },
          person_info: {
            name: '',
            role: '',
            company: [],
            iDnumber: '',
            officePhone: '',
            weChat: '',
            email: '',
            QQ: '',
            phone: ''
          }
        },
        wechatPic: {
          disable: 'static/img/icon/wechat.png',
          active: 'static/img/icon/wechat-a.png'
        },
        videoPic: {
          disable: 'static/img/icon/video.png',
          active: 'static/img/icon/video-a.png'
        },
        facePic: {
          disable: 'static/img/icon/face.png',
          active: 'static/img/icon/face-a.png'
        },
        imgView: '',
        innerVisible: false
      }
    },
    created () {
      if (this.isAgent) this.showAgentInfo(this.pid)
      else this.showPersonInfo(this.pid, this.pName)
    },
    components: {
      QRCode
    },
    methods: {
      authF () {
        this.innerVisible = true
        var svg = new QRCode({
          content: "https://localhost:5050/#/cooperation_list", // 后续改为线上服务器
          padding: 4,
          width: 256,
          height: 256,
          color: "#000000",
          background: "#ffffff",
          ecl: "M"
        }).svg()
        setTimeout(() => {
          let dom = document.querySelector('#qrcode')
          if (dom) {
            dom.innerHTML = svg
          }
        }, 200)
      },
      closeView () {
        this.dialogVisible = false
        this.$emit('closeView', false)
      }, 
      imageView (src) {
        if (!this.top) {
          this.dialogImgVisible = true
          this.imgView = this.$root_url() +'/'+ src
        }
      },
      showPersonInfo (peron_id, name) {
        if (!peron_id) return
        this.dialogVisible = true
        this.$ajax(`/api/chain/five_stream/person_detail/?person_id=${peron_id}`).then(res => {
          this.personInfo = res.data
          this.personInfo.person_info = {}
          this.personInfo.person_info.name = name
          this.personInfo.person_info.company = res.data.person_company_info
          this.personInfo.person_info.iDnumber = res.data.id_number
        })
      },
      showAgentInfo (id) {
        this.$ajax.get(`/api/chain/agent/${id}/`).then(res => {
          if (res.status === 200) {
            this.personInfo.person_info = res.data.all_info
            let _companylist = [], _obj = {}
            _obj.company_name = res.data.all_info.company
            _companylist.push(_obj)
            this.personInfo.person_info.company = _companylist 
          }
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .imgView {
    text-align: center;
  }
  .roleModal-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    .roleModal {
      margin: 0 auto;
      width: 1080px;
      margin-top: 15vh;
      bottom: 0;
      background: #fff;
      border-radius: 2px;
      .roleModal__header {
        line-height: 42px;
        background: #FFA669;
        color: #fff;
        font-size: 18px;
        text-align: center;
        position: relative;
        ._close {
          height: 17px;
          width: 17px;
          position: absolute;
          right: 19px;
          top: 12px;
        } 
      }
      .roleModal__body {
        .role-info {
          .auth {
            padding: 0 20px;
            margin: 10px 0;
            line-height: 45px;
            span:first-child {
              color: #333;
              font-weight: bold;
            }
            span:nth-child(2) {
              color: #999;
              margin-right: 36px;
            }
            button {
              background: none;
              border: none;
              text-decoration: underline;
              color: #eb6100;
              outline: none;
            }
          }
          .titles {
            display: inline-block;
            border-left: 5px solid #eb6100;
            padding-left: 6px;
            color: #333333;
            font-weight: bold;
            margin: 30px 0 20px 30px 
          }
          .role-info__detail {
            display: flex;
            justify-content: center;
            padding: 0 35px;
            font-size: 14px;
            color: #666;
            .role-info__item {
              flex: 1;
              width: 33.3%;
              .role-info__item-row {
                margin-bottom: 10px;
                padding-left: 30px;
                display: flex;
                align-items: center;
                min-height: 40px;
                line-height: 40px;
                position: relative;
                &.role-company {
                  display: flex;
                  .role-company-group {
                    width: calc(100% - 90px);
                    p {
                      // overflow: hidden;
                      // text-overflow: ellipsis;
                      // white-space: nowrap;
                      word-break: break-all;
                    }
                  }
                }
                img:nth-child(3) {
                  width: 30px;
                  position: absolute;
                  right: 20px;
                  top: 5px;
                  // float: right;
                  margin: 0 5px;
                }
                img:nth-child(4) {
                  width: 30px;
                  position: absolute;
                  right: 55px;
                  top: 5px;
                  // float: right;
                  margin: 0 5px;
                }
                .role-company-group {
                  p {
                    margin-bottom: 5px
                  }
                }
                label {
                  width: 90px;
                  text-align: left;
                  display: inline-block;
                }
                .role-content {
                  width: calc(100% - 90px);
                  word-break: break-all;
                }
              }
            }
          }
        }
        .img-info {
          .titles {
            display: inline-block;
            border-left: 5px solid #eb6100;
            padding-left: 6px;
            color: #333333;
            font-weight: bold;
            margin: 30px 0 20px 30px
          }
          .img-menu {
            display: flex;
            flex-wrap: wrap;
            padding-left: 80px;
            .img-menu__item {
              text-align: center;
              .auth-img {
                height: 140px;
              }
              cursor: pointer;
              width: 240px;
              height: 140px;
              border: 1px solid #e1e6f0;
              margin: 33px 25px;
              position: relative;
              .img-cursor {
                width: 100%;
                line-height: 30px;
                background: #999;
                opacity: .8;
                position: absolute;
                bottom: -2px;
                color: #fff;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  margin-left: 5px; 
                }
              }
            } 
          }
        }
        .no_pic {
          padding:0 35px 105px 35px;
          line-height: 40px;
          // font-size: 18px;
          font-weight: bloder;
          color: #999;
          span {
            margin-left: 25px;
          }
        }
      }
    }
  }
  .role_qr {
    h4 {
      // margin: 20px 0;
      font-weight: bolder;
      color: #eb6100;
      line-height: 36px;
      font-size: 16px;
    }
    p {
      line-height: 24px;
      color: #666;
    }
    img {
      width: 120px;
      margin: 20px 0;
    }
  }
  .role_person_install {
    margin-top: 30px;
    text-align: center;
    button {
      margin: 0 30px;
      width: 100px;
      height: 32px;
      line-height: 32px;
      border: none;
      outline: none;
      background: #eb6100;
      border-radius: 5px;
      color: #fff;
    }
  }
</style>
