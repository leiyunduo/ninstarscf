<template>
  <div class="selfIntroduction">
    <div class="self-desc">
      <div class="self-view">
        <div class="self-synopsis-wraper">
          <div class="self-synopsis">
            <div class="self-avatar-wraper">
              <div v-if="hasAvatar">
                <span class="self-avatar">
                  <img :src="$root_url() + avatar" alt="">
                </span>
                <div v-if="userType !== 'person' && userType !== 'institutionperson' && isEditor"><a class="c_header_tip active" @click="showDialog">点击更改头像</a></div>
              </div>
              <myUpload field="file"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="150"
               :height="150"
               :headers='headers'
               :maxSize="2*1024*1024"
               :no-square="isShowSquare"
               :params="params"
               url="/api/ns_file/"
               img-format="jpg"></myUpload>
              <p class="self-icon-group">
                <span class="self-icon__item -tw"></span>
                <span class="self-icon__item -ns"></span>
                <span class="self-icon__item -cfca"></span>
              </p>
            </div>
            <h4 class="self-title">{{selfName.name}}</h4>
            <div v-if="userType !== 'person' && userType !== 'institutionperson' && isEditor && !hasAvatar "><a class="c_header_tip" @click="showDialog">点击上传头像</a></div>
            <p class="self-tips">
              <span v-if="!isEditor">{{selfInfo.slogan || ''}}</span>
              <span v-else><input class="tips-edit" placeholder="请输入内容" v-model="selfInfo.slogan" type="text"></span>
            </p>
          </div>
          <div class="self-desc">
            <p>
              <i class="self-icon -phone"></i>{{selfInfo.phone || '暂无相关内容'}}
            </p>
            <p>
              <i class="self-icon -email"></i>{{selfInfo.email || '暂无相关内容'}}
            </p>
            <p>
              <i class="self-icon -location"></i>{{selfInfo.address || '暂无相关内容'}}
            </p>
          </div>
          <p class="self-editor">
            <img @click="isEditor = true" v-show="!isEditor" src="../../../../static/img/users/editor_1x.png" alt="">
            <span v-show="isEditor" class="groups-editor">
              <img @click="save" src="../../../../static/img/users/ok_1x.png" alt="">
              <img @click="cancel" src="../../../../static/img/users/cancel_1x.png" alt="">
            </span>
          </p>
        </div>
        <div class="self-introduce-wraper">
          <div class="self-introduce">
            <h4 class="content-title">企业介绍</h4>
            <div class="content-area" :class="!isEditor ? '' : '-edit'">
              <div class="content-wraper" v-if="!isEditor">
                <span v-if="selfInfo.content" v-html="selfInfo.content">{{selfInfo.content}}</span>
                <span v-else class="content-null">暂无内容</span>
              </div>
              <textarea placeholder="请输入内容" v-else class="content-edit" v-model="selfInfo.content"></textarea>
              <!-- <span v-else class="content-null">暂无内容</span> -->
            </div>
          </div>
        </div>
        <!-- <div class="self-album-wraper">
          <div class="self-album">
            <h4 class="content-title">企业相册</h4>
            <div class="content-area">
              <ul class="album-group">
                <li class="album-group__item" v-for="(item, index) in list" :key="index"></li>
              </ul>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload'
  import { mapState } from 'vuex'
  export default {
    name: '',
    data () {
      return {
        userType: '',
        show: false,
        headers: {},
        isShowSquare: '',
        params: {},
        isEditor: false
      }
    },
    components: {myUpload},
    mounted () { 
      this.userType = localStorage.role
      this.headers = { //上传头像
        'Auth-Token': localStorage.ns_token
      }
    },
    methods: {
      cropSuccess () {},
      save () {
        this.$ajax.patch(`/api/company_detail/` + this.selfName.desc + '/', {brief_introduction: this.selfInfo, partial: true}).then(res => {
          this.isEditor = false
        }).catch(err => {
          this.$message.error(err.response.data.err_msg)
        })
      },
      cancel () {
        this.$ajax.get(`/api/company_detail/` + this.selfName.desc).then(res => {
          this.selfInfo.slogan = res.data.brief_introduction.slogan
          this.selfInfo.content = res.data.brief_introduction.content
          this.isEditor = false
        })
      },
      // 上传成功
      cropUploadSuccess (jsonData, field) {
        var that = this
        this.$message.success('上传成功')
        that.$ajax.patch('/api/auth/avatar/', {avatar: jsonData}).then(res => {
          // 获取头像
          that.$ajax.get(`/api/company/` + localStorage.id).then(res => {
            this.$store.commit('homePage/setAvatar', res.data.avatar)
            localStorage.setItem('avatar', encodeURIComponent(res.data.avatar))
          }).catch(err => {
            that.$message.error(err.response.data.err_msg)
          })
        }).catch(err => {
          that.$message.error(err.response.data.err_msg)
        })
        this.show = false
      },
      // 上传失败
      cropUploadFail (status, field) {
        this.$message.error('上传失败')
      },
      showDialog () {
        this.show = !this.show
      },
      hasAvatar () {
        return this.avatar === '/static/default_avatar.png'
      }
    },
    computed: {
      ...mapState({
        selfInfo: status => status.homePage.selfInfo,
        avatar: status => status.homePage.avatar,
        selfName: status => status.homePage.selfName
      })
    }
  }
</script>
<style lang='less' scope>
  @url-tw-active: '../../../../static/img/authentication/tw-2.png';
  @url-tw-disable: '../../../../static/img/authentication/tw-2.png';
  @url-cfca-active: '../../../../static/img/authentication/CFCA-2.png';
  @url-cfca-disable: '../../../../static/img/authentication/CFCA-2.png';
  @url-ns-active: '../../../../static/img/authentication/jiuxing.png';
  @url-phone: '../../../../static/img/users/phone_1x.png';
  @url-email: '../../../../static/img/users/email_1x.png';
  @url-location: '../../../../static/img/users/location_1x.png';
  @url-down: '../../../../static/img/icon/down.png';
  @url-editor: '../../../../static/img/users/editor_1x.png';
  input, textarea {
    border:1px solid #e1e6f0;
    color: #666;
    padding: 4px 10px;
    outline: none;
    border-radius: 4px;
    &:focus {
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      border-color: #409eff
    }
  }
  .self-desc {
    height: 100%;
    background:rgba(255,255,255,1);
    padding: 21px;
    .self-view {
      .self-synopsis-wraper {
        .self-editor {
          position: absolute;
          right: 5px;
          top: 5px;
          cursor: pointer;
          z-index: 1;
          .groups-editor {
            cursor: pointer;
            &>img {
              width: 16px;
              height: 16px;
              margin: 0 8px;
              &:first-of-type {
                width: 21px;
              }
            }
          }
        }
        position: relative;
        text-align: center;
        padding-top: 40px;
        .self-synopsis {
          margin-bottom: 20px;
          .c_header_tip{
            display: inline-block;
            color: #fafafa;
            font-size: 12px;
            line-height: 20px;
            cursor: pointer;
            background: #eb6100;
            border-radius: 4px;
            line-height: 26px;
            width: 120px;
            height: 26px;
            margin: 0 auto 8px;
            margin-top: 5px;
            &.active{
              background: #fff;
              border: 1px solid #ccc;
              color: #666;
            }
            &.active:hover{
              background: #eb6100;
              border-color: #eb6100;
              color: #fafafa;
            }
          }
          .self-avatar-wraper {
            .self-avatar {
              display: inline-block;
              width: 85px;
              height: 85px;
              &>img {
                border-radius: 50%;
              }
            }
            .c_header_tip{
              display: inline-block;
              color: #fafafa;
              font-size: 12px;
              line-height: 20px;
              cursor: pointer;
              background: #eb6100;
              border-radius: 4px;
              line-height: 26px;
              width: 120px;
              height: 26px;
              margin: 0 auto 8px;
              margin-top: 5px;
              &.active{
                background: #fff;
                border: 1px solid #ccc;
                color: #666;
              }
              &.active:hover{
                background: #eb6100;
                border-color: #eb6100;
                color: #fafafa;
              }
            }
            .self-icon-group {
              .self-icon__item {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin: 20px 8px 5px;
                &.-tw {
                  background: url('@{url-tw-active}');
                  background-size: contain;
                }
                &.-ns {
                  background: url('@{url-ns-active}');
                  background-size: contain;
                }
                &.-cfca {
                  background: url('@{url-cfca-active}');
                  background-size: contain;
                }
              }
            }
          }
          .self-title {
            color: #333333;
            font-size: 20px;
            font-weight: bolder;
            margin: 10px 0;
          }
          .self-tips {
            color: #666;
            .tips-edit {   
              width: 348px;
            }
            &>span {
              font-size: 16px;
            }
          }
        }
        .self-desc {
          margin: 30px 25px;
          text-align: left;
          border-bottom: 1px solid #e8e8e8;
          padding-bottom: 25px;
          &>p {
            margin-bottom: 18px;
            padding-left: 26px;
            position: relative;
            color: #666;
            font-size: 14px;
            &>i.self-icon {
              position: absolute;
              height: 14px;
              width: 14px;
              left: 0;
              top: 2px;
              &.-phone {
                background: url('@{url-phone}') no-repeat;
                background-size: contain;
              }
              &.-email {
                background: url('@{url-email}') no-repeat;
                background-size: contain;
                margin-top: 2px;
              }
              &.-location {
                background: url('@{url-location}') no-repeat;
                background-size: contain;
              }
            }
          }
        }
      }
      .self-introduce-wraper {
        .self-introduce {
          color: #666;
          font-size: 14px;
          margin: 0 20px;
          &>.content-title {
            margin-bottom: 10px;
          }
          .content-wraper {
            &>.content-null {
              display: block;
              width: 90px;
              margin: 90px auto 0;
              color: #666;
              font-size: 14px;
              position: relative;
              &::before {
                content: '';
                position: absolute;
                background: url('../../../../static/img/users/null.png');
                width: 64px;
                height: 41px;
                margin-top: -45px;
                margin-left: -4px;
              }
            }
            &>span {
              color: #999;
            }
          }
          &>.content-area {
            min-height: 240px;
            max-height: 370px;
            overflow: auto;
            text-indent: 2em;
            line-height: 22px;
            &.-edit {
              text-indent: 0;
              &>textarea {
                max-width: 100%;
                min-width: 100%;
                min-height: 240px;
                max-height: 240px;
              }
            }
          }
        }
      }
      // .self-album-wraper {
      //   .self-album {
      //     color: #666;
      //     font-size: 14px;
      //     margin: 20px 20px 0;
      //     &>.content-title {
      //       margin-bottom: 10px;
      //     }
      //     &>.content-area {
      //       max-height: 250px;
      //       overflow: auto;
      //       .album-group {
      //         .album-group__item {
      //           width: 120px;
      //           height: 80px;
      //           background: #000000;
      //           border-radius: 4px;
      //           cursor: pointer;
      //           margin: 0 2px;
      //           display: inline-block;
      //         }
      //       }
      //     }
      //   }
      // }
    } 
  }
</style>