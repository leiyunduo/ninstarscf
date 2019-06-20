<template>
  <div class="payment-box">
    <div class="payment-box__view">
      <div class="input-ps" v-if="!disabled" :class="isWarning ? 'warning' : ''"> 
        <div class="input-ps__item" :class="index === 5 ? 'last' : ''" v-for="(item, index) in dotList" :key="index">
          <span class="dot" v-show="item.display"></span>
          <span v-if="index === 0 && !inputValue.length" class="cursor">|</span>
        </div> 
        <input id="input-value" class="input-value" maxlength="6" type="password"/> 
      </div>
      <div class="input-ps disabled" v-if="disabled" :class="isWarning ? 'warning' : ''"> 
        <div class="input-ps__item" :class="index === 5 ? 'last' : ''" v-for="(item, index) in dotList" :key="index">
        </div> 
        <span class="timer">支付密码已停用, 请{{time}}秒后重试</span>
        <!-- <button class="sub">忘记密码</button> -->
      </div>
      <div class="tips" v-if="isWarning">
        <span class="warning">密码错误，请重新输入</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: ['isWarning'],
    data () {
      return {
        dom: {
          input: ''
        },
        dotList: [{display: false}, {display: false}, {display: false}, {display: false}, {display: false}, {display: false}],
        inputValue: '',
        disabled: false,
        time: 300
      }
    },
    mounted () { 
      let that = this
      that.dom.input = document.getElementById("input-value")
      if (!that.dom.input) return
      // TODO 禁用后需要重新注册监听及focus事件
      that.dom.input.focus()
      that.dom.input.addEventListener('input', (e) => {
        that.getCode(e.target.value)
      })
    },
    methods: { 
      getCode (value) {
        if (/^[0-9]*$/.test(value)) {
          this.inputValue = value
          this.dom.input.value = this.inputValue
        } else {
          this.inputValue = ''
          this.dom.input.value = ''
        }
        for(var i = 0; i < this.dotList.length; i++) {
          if(i < this.inputValue.length){
            this.dotList[i].display = true;
          } else{
            this.dotList[i].display = false;
          }
        }
        if (this.inputValue.length === 6) {
          // this.isWarning = true
          this.$emit('code', this.inputValue)
        }
      },
      timers () {
        let that = this
        let interval = window.setInterval(function () {
          --that.time
          if (that.time < 0) {
            that.time = 60
            window.clearInterval(interval)
          }
        }, 1000)
      }
    }
  }
</script>
<style lang='less' scope>
  .payment-box {
    .payment-box__view {
      margin-bottom: 30px;
      .input-ps {
        &.disabled {
          background: #eaeaea
        }
        &.warning {
          border-color: rgb(231, 8, 8);
          transition: border-color .2s cubic-bezier(.645,.045,.355,1); 
        }
        position: relative;
        display: flex;
        align-items: center;
        width: 228px;
        margin: 0 auto;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background-color: #fff;
        margin: 0 auto;
        .input-ps__item {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex: 1;
          height: 25px;
          border-right: 1px solid #d9d9d9;
          margin: 5px 0;
          .cursor {
            font-size: 21px;
            opacity: 0;
            animation: twinkle 1.2s ease 0s infinite;
            -moz-animation: twinkle 1.2s ease 0s infinite;
            -webkit-animation: twinkle 1.2s ease 0s infinite;
            @keyframes twinkle {
              from {
                opacity: 0;
              }
              to {
                opacity: .8;
              }
            }
          }
          &.last {
            border: none;
          }
          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #363e49;
          }
        }
        .input-value {
          position: absolute;
          left: 0;
          top: 0;
          height: 2.375rem !important;
          color: transparent;
          opacity: 0;
          width: 228px;
        }
        &>.timer {
          position: absolute;
          width: 100%;
          text-align: center;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
        }
        &>.sub {
          position: absolute;
          right: -40%;
          // .ns-button(o, small)
        }
      }
      .tips {
        margin-top: 15px;
        text-align: center;
        font-size: 14px;
        .warning {
          color: rgb(231, 8, 8);
          font-size: 14px;
        }
      }
    }
  }
</style>