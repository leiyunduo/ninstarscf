<template>
  <div :id="id" class="ns-dialog-wraper" v-show="visible">
    <div class="ns-dialog" :style="calcWidth">
      <div class="ns-dialog__header">
        <div class="title">
          <span>{{title}}</span>
          <span @click="handlerClose($event)" class="handle-close"><i class="ns-iconfont ns-icon-close"></i></span>
        </div>
      </div>
      <div class="ns-dialog__body">
        <slot></slot>
      </div>
      <div class="ns-dialog__footer">
        <div class="btn-handler">
          <div class="btn btn-default" @click="reset">{{resetTxt}}</div>
          <div class="btn btn-active" @click="submit">{{submitTxt}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        id: ''
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      resetTxt: {
        type: String,
        default: '取消'
      },
      width: {
        type: String,
        default: '50%'
      },
      submitTxt: {
        type: String,
        default: '确认'
      },
      visible: {
        type: Boolean
      }
    },
    computed: {
      calcWidth () {
        return `width: ${this.width}`
      }
    },
    mounted () {
      let _id = String(Math.random(0, 1))
      this.id = _id.slice(_id.length-5)
    },
    methods: { 
      handlerClose (e) {
        this.$preventDefault(e)
        this.fadeOut()
      },
      fadeIn () {
        let dialogWraper = document.getElementById(this.id)
        let dialog = dialogWraper.firstElementChild
        dialogWraper.classList.add('dialog-wraper-fade-to')
        dialog.classList.add('dialog-fade-enter-active')
        let timer = setTimeout(()=>{
          dialog.classList.remove('dialog-fade-enter-active')
          dialogWraper.classList.remove('dialog-wraper-fade-to')
          clearTimeout(timer)
        }, 500)
      },
      fadeOut () {
        let dialogWraper = document.getElementById(this.id)
        let dialog = dialogWraper.firstElementChild
        dialogWraper.classList.add('dialog-wraper-fade')
        dialog.classList.add('dialog-fade-leave-active')
        let timer = setTimeout(() => {
          dialog.classList.remove('dialog-fade-leave-active')
          dialogWraper.classList.remove('dialog-wraper-fade')
          this.$emit('update:visible', false)
          clearTimeout(timer)
        }, 200)
      },
      closeDialog (e) {
        let that = this
        let target = that.$getTarget(e)
        if (target.className === 'ns-dialog-wraper') {
          target.classList.add('dialog-wraper-fade') 
          target.firstElementChild.classList.add('dialog-fade-leave-active')  
          let timer = setTimeout(()=>{
            target.classList.remove('dialog-wraper-fade') 
            target.firstElementChild.classList.remove('dialog-fade-leave-active')
            that.$emit('update:visible', false)
            clearTimeout(timer)
          }, 200)
        }
      },
      reset () {
        this.$emit('close', this.fadeOut)
      },
      submit () {
        this.$emit('submit', this.fadeOut)
      }
    },
    watch: {
      visible (newer, older) {
        // let dom = document || document.documentElement, that = this
        if (newer) {
          this.fadeIn()
          // dom.onclick = function (e) {
          //   that.closeDialog(e)
          // }
        } else {
          // dom.onclick = null
        }
      }
    }
  }
</script>
<style lang='less'>
  .ns-dialog-wraper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    overflow: auto;
    z-index: 2000;
    background-color: rgba(0, 0, 0, .3);
    .ns-dialog {
      margin: 0 auto;
      margin-top: 15vh;
      background: #ffffff;
      border-radius: 4px;
      position: relative;
      .ns-dialog__header {
        color: #333;
        font-weight: bolder;
        border-bottom: 1px solid #e8e8e8;
        &>.title {
          padding: 15px 0 15px 20px;
          &>span {
            &:first-of-type {
              font-weight: bold;
              font-size: 14px
            }
          }
        }
        .handle-close {
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
        } 
      }
      .ns-dialog__body {
        padding: 27px 30px;
      }
      .ns-dialog__footer {
        border-top: 1px solid #e8e8e8;
        position: relative;
        height: 54px;
        &>.btn-handler {
          padding: 10px;
          position: absolute;
          right: 20px;
          display: flex;
          &>.btn {
            margin-left: 20px;
            &.btn-default {
              .ns-button(w, small)
            }
            &.btn-active {
              .ns-button(b, small)
            }
          }
        }
      }
    }
  }
  .dialog-fade-enter-active {
    -webkit-animation: dialog-fade-in .3s; 
    animation: dialog-fade-in .3s
  }
  .dialog-fade-leave-active { 
    -webkit-animation: dialog-fade-out .3s;
    animation: dialog-fade-out .3s
  }
  .dialog-wraper-fade-to {
    -webkit-animation: dialog-fade-to .3s; 
    animation: dialog-fade-to .3s
  }
  .dialog-wraper-fade { 
    -webkit-animation: dialog-fade .3s;
    animation: dialog-fade .3s
  }
  @keyframes dialog-fade-in {
    0% {
      -webkit-transform: translate3d(0,-20px,0);
      transform: translate3d(0,-20px,0);
      opacity: 0
    }
    100% {
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }
  @keyframes dialog-fade-out {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0); 
      opacity: 1
    }
    100% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0,-20px, 0);
      opacity:0
    }
  }
  @keyframes dialog-fade-to {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  @keyframes dialog-fade {
    0% {
      opacity: 1
    }
    100% {
      opacity:0
    }
  }
</style>