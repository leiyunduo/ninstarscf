<template>
  <div class="debtIntro">
    <div class="debtIntro_box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="debtIntro_box_wrap">
        <div class="topNav">
          <location :location="location"></location>
        </div>
        <div class="topStep">
          <div class="mid_line">
            <div class="mid_icon">
              <img src="../../../static/img/debet/icon1.png" alt="">
              <span class="mid_icon_budge">1</span>
              <span>债务处置方式</span>
            </div>
            <!-- <div class="mid_icon">
              <img src="../../../static/img/debet/icon2.png" alt="">
              <span class="mid_icon_budge" :style="budge">2</span>
              <span>债务处置原因</span>
            </div> -->
            <div class="mid_icon">
              <img src="../../../static/img/debet/icon2.png" alt="">
              <span class="mid_icon_budge" :style="budge">2</span>
              <span>债务处置发布</span>
            </div>
          </div>
        </div>
        <div class="midBtn">
          <div @click='enter(1)'>支付</div>
          <div @click='enter(2)'>拒付</div>
          <div @click='enter(3)'>转让</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '../financing/financingManege'
import Location from '../location/location'
export default {
  name: 'debtIntro',
  components: {
    // AppNav, 
    Location
  },
  data () {
    return {
      step: {selIndex: 7},
      budge: "background: #fff;border: 1px solid #666;color: #666;"
    }
  },
  methods: {
    enter(type) {
      var _id =  this.flag ? this.flag : '-1'
      if (type === 1) {
        this.$router.push({
          path: '/debtWay',
          query: {
            id: _id,
            type: 1
          }
        })
      } else if (type === 2) {
        this.$router.push({
          path: '/debtWay',
          query: {
            id: _id,
            type: 2
          }
        })
      }
      else {
        this.$router.push({
          path: '/debtWay',
          query: {
            id: _id,
            type: 3
          }
        })
      }
    }
  },
  beforeCreate () {
    this.flag = this.$route.query.id
    // console.log(this.flag)
    this.location = [
      {
        title: '债权处置',
        url: '/debtDeal'
      },
      {
        title: '债权处置选择'
      }
    ]
  }
}
</script>

<style scoped lang='less'>
.debtIntro {
  height: 100%;
  .debtIntro_box {
    min-height: 100%;
    display: flex;
    .debtIntro_box_wrap {
      background: #f4f8f9;
      width: 100%;
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
      .midBtn {
        width: 300px;
        height: 150px;
        margin: 100px auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: space-around;
        cursor: pointer;
        div {
          width: 240px;
          height: 38px;
          line-height: 38px;
          margin: 0 auto;
          text-align: center;
          border-radius: 6px;
          background: #ea6100;
          color: #fff;
          font-size: 14px; 
        } 
      }
    }
  }
}
</style>

