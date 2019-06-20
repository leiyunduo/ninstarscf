<template>
  <div class="offline-wraper">
    <div class="offline-viewer">
      <div class="offline-content">
        <div class="offline-content__row">
          <p class="content-tooltips">
            请您通过网银转账，或者自行到银行进行汇款，汇款账号如下：
          </p>
        </div>
        <div v-if="!showInfo">
          <div class="offline-content__row">
            <label class="title" for=""><span class="require">*</span>开户名称：</label>
            <span>九星</span>
          </div>
          <div class="offline-content__row">
            <label class="title" for=""><span class="require">*</span>开户银行：</label>
            <el-radio-group v-model="ruleForm.bank">
              <el-radio label="中国建设银行"></el-radio>
              <el-radio label="中国农业银行"></el-radio>
              <el-radio label="浦发银行"></el-radio>
              <el-radio label="中国工商银行"></el-radio>
            </el-radio-group>
          </div>
          <div class="offline-content__row">
            <div class="btn-handler">
              <div :class="limitCount ? 'btn-orange' : 'btn-disable'" class="btn btn-orange" @click="getKeyCode($event)">获取专属汇款账号</div>
              <el-tooltip placement="right" popper-class='tool'>
                <div slot="content" class="tool-tips">
                  <p>每个九星账号会对应分配唯一的银 行专属汇款账号，请勿告知他人</p>
                </div>
                <i class="ns-iconfont ns-icon-tips"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="offline-content__row">
            <div class="show-info">
              <div class="show-info__line">
                <label for=""><span class="require">*</span>开户名称：</label>
                <span>九星</span>
              </div>
              <div class="show-info__line">
                <label for=""><span class="require">*</span>开户银行：</label>
                <span>{{`中国建设银行`}}</span>
              </div>
              <div class="show-info__line">
                <label for="">专属汇款账号：</label>
                <span>{{`4001 1004 5500 6666`}}</span>
              </div>
              <div class="show-info__line">
                <label for="">发送至手机：</label>
                <span class="number">{{`185****1161`}}</span>
                <span class="text-nomal" @click="sendPhone">发送至手机</span>
              </div>
            </div>
          </div>
        </div>
        <span @click="download" :class="keyCode ? 'text-nomal' : 'text-disable'" class="-fixed">专属账号电子证明下载</span>
      </div>
    </div>
    <ns-dialog title="获取专属汇款账号" :visible.sync="dialogVisableConfirm" @submit="onSubmit" width="384px">
      <div class="show-confirm">
        <p>您将获取**银行的平台专属汇款账号，每个九星账号会对应分配唯一的银行专属汇款账号，请勿告知他人</p>
      </div>
    </ns-dialog>
  </div>
</template>

<script>
  import nsDialog from '../dialog'
  export default {
    name: '',
    data () {
      return {
        limitCount: 1,
        dialogVisableConfirm: false,
        hasCode: false,
        keyCode: false,
        showInfo: false,
        ruleForm: {
          bank: ''
        }
      }
    },
    mounted () { 
 
    },
    components: {
      nsDialog
    },
    methods: {
      handleClose () {
        this.dialogVisableConfirm = false
      },
      onSubmit () {
        this.hasCode = true
        this.dialogVisableConfirm = false
        this.limitCount -= 1
        this.showInfo = true
        this.keyCode = true
      },
      download () {
        if (!this.keyCode) {
          this.$message.error('请先获取专属账号')
        }
      },
      getKeyCode (e) {
        this.$preventDefault()
        this.dialogVisableConfirm = true
      },
      sendPhone () {
        this.$message.success('发送成功')
      }
    }
  }
</script>
<style lang='less' scope>
  @text-nomal: #EB6100;
  @text-disable: #999;
  .text-nomal {
    color: @text-nomal;
    cursor: pointer;
    &:hover {
      .ns-tab-hover(#EB6100, txt)
    }
  }
  .text-disable {
    color: @text-disable;
    cursor: pointer;
  }
  .offline-wraper {
    .offline-viewer {
      padding: 40px 0 65px;
      margin: 0 20px;
      .offline-content {
        position: relative;
        min-width: 650px;
        width: 650px;
        min-height: 500px;
        margin: 0 auto;
        .offline-content__row {
          margin-bottom: 40px;
          position: relative;
          &.text-content {
            padding-left: 20px; 
          }
          &>.content-tooltips {
            padding: 8px 15px;
            background: #E6F7FF;
            border:1px solid rgba(145,213,255,1);
            border-radius:4px;
            color: #333333;
            font-size: 14px;
            &::before {
              content: "i";
              display: inline-block;
              width: 16px;
              height: 16px;
              color: #fff;
              background: #409eff;
              border-radius: 50%;
              margin-right: 8px;
              text-align: center;
              line-height: 16px;
            }
          }
          &>.title {
            color: #666;
            font-size: 14px;
            &>.require {
              color: #FF0404
            }
            &+span{
              color: #666;
              font-size: 14px;
            }
          }
          &>.ns-iconfont {
            margin-left: 5px;
            color: #BBBBBB;
          }
          &>.btn-handler {
            margin-top: 15px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            &>.ns-iconfont {
              position: absolute;
              right: -26px;
              top: 5px;
              color: #BBBBBB;
              font-size: 18px;
            }
            &>.btn {
              &.btn-orange {
                .ns-button(o, medium)
              }
              &.btn-disable {
                .ns-button(disable, medium);
                pointer-events: none
              }
            }
          }
          &>.show-info {
            padding-left: 180px;
            &>.show-info__line {
              margin-bottom: 20px;
              color: #666;
              font-size: 14px;
              display: flex;
              &>label {
                width: 100px;
                display: inline-block;
                text-align: right;
                &>.require {
                  color: #FF0404;
                }
              }
              &>.number {
                margin-right: 20px
              }
            }
          }
        }
        &>.-fixed {
          position: absolute;
          bottom: 20px;
          font-size: 14px;
          left: 50%;
          transform: translateX(-50%)
        }
      }
    }
  }
</style>