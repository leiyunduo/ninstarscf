<template>
  <div class="debtReason">
    <div class="debtReason_box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="debtReason_box_wrap">
        <div class="topNav">
          <location :location='location'></location>
        </div>
        <div class="topStep">
          <div class="mid_line">
            <div class="mid_icon">
              <img src="../../../static/img/debet/icon1.png" alt="">
              <span class="mid_icon_budge">1</span>
              <span>债务处置方式</span>
            </div>
            <div class="mid_icon">
              <img src="../../../static/img/debet/icon1.png" alt="">
              <span class="mid_icon_budge">2</span>
              <span>债务处置原因</span>
            </div>
            <div class="mid_icon">
              <img src="../../../static/img/debet/icon2.png" alt="">
              <span class="mid_icon_budge" :style="budge">3</span>
              <span>债务处置发布</span>
            </div>
          </div>
        </div>
        <div class="mid_result">
          <div class="mid_result_reason">
            <span>债务处置原因说明:</span>
            <textarea name="" v-model="reason"/>
          </div>
          <div class="mid_result_upload">
            <span>债务处置原因证明</span>
            <div>
              <img src="../../../static/img/debet/icon3.png" alt="">
              <!-- <img src="" alt="">
              <input type="file" id="file"> -->
            </div>
          </div>
          <div @click="enter()" class="nextBtn">
            下一步
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '../financing/financingManege'
import Location from '../location/location'
export default {
  name: 'debtReason',
  components: {
    // AppNav, 
    Location
  },
  data () {
    return {
      step: {selIndex: 7},
      budge: "background: #fff;border: 1px solid #666;color: #666;",
      reason: ''
    }
  },
  beforeCreate () {
    // var ids = ''
    // this.$route.params.idList.forEach((val, index) => {
    //   if (index === 0) {
    //     ids += '' + val
    //   } else {
    //     ids += ids + '&id=' + val
    //   }
    // })
    this.location = [
      {
        title: '债务处置',
        url: '/debtDeal'  
      },
      {
        title: '处置方式',
        url: '/debtIntro?id=-1'
      }
      , {
        title: '债务处置原因'
      }
    ]
  },
  methods: {
    enter () {
      this.$router.push({
        name: 'debtPublish',
        params: {
          id: this.$route.query.id,
          type: this.$route.query.type,
          reason: this.reason
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.debtReason {
  height: 100%;
  .debtReason_box {
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
    .debtReason_box_wrap {
      // width: 100%;
      height: 100%;
      background: #f4f8f9;
      .topNav {
        height: 60px;
        background: #fff; 
        box-shadow: 2px 0 4px #ddd;
      }
      .topStep {
        height: 122px;
        width: 80%;
        margin: 20px auto;
        border:1px solid #e1e6f0;
        background: #ffffff;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .mid_line {
          border: 1px dashed #eaeaea;
          width: 60%;
          height: 0;
          display: flex;
          justify-content: space-between;
          .mid_icon {
            text-align: center;
            margin-top: -24px;
            img {
              width: 35px;
              background: #ffffff;
            }
            span {
              display: block;
              font-size: 14px;
              color:#666666;
            }
            .mid_icon_budge {
              width: 20px;
              position: absolute;
              margin-left: 50px;
              height: 20px;
              border: 1px solid #ea6100;
              margin-top: -25px;
              background: #ea6100;
              line-height: 20px;
              color: #fff;
              border-radius: 50%;
            }
          }
          .mid_icon:first-child {
            margin-left: -43px;
          }
          .mid_icon:last-child {
            margin-right: -43px;
          }
        }
      }
      .mid_result {
        width: 80%;
        height: 641px;
        margin: 100px auto;
        background: #fff;
        box-shadow:0 2px 5px 4px;
        -webkit-box-shadow: 0 2px 5px 4px rgba(231,231,231,0.50);
        -moz-box-shadow: 0 2px 5px 4px;
        overflow: hidden;
        .mid_result_reason {
          margin: 28px 38px;
          height: 140px;
          border: 1px solid #e1e6f0;
          border-radius: 4px;
          span {
            font-size: 14px;
            color: #333333;
            display: block;
            margin-top: 10px;
            margin-left: 10px;
          }
          textarea {
            width: 100%;
            height: 100px;
            border: none;
            resize: none;
            padding-left: 10px;
            margin-top: 5px;
          }
          textarea:focus {
            outline:none;
          }
        }
        .mid_result_upload {
          margin: 28px 38px;
          height: 240px;
          border: 1px solid #e1e6f0;
          border-radius: 4px;
          span {
            font-size: 14px;
            color: #333333;
            display: block;
            margin-top: 10px;
            margin-left: 10px;
          }
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 209px;
            // width: 509px;
            // margin: 0 auto;
            img {
              width: 58px;
            }
          }
        }
        .nextBtn {
          width: 120px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          margin: 100px auto;
          border-radius: 6px;
          background: #ea6100;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

