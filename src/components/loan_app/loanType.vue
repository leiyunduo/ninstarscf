<template>
  <div class="loanType">
    <div class="loanType_box">
      <!-- <appNav :father="step"></appNav> -->
      <div class="loanType_box_wrap">
        <div class="topNav">
          <location :location="location"></location>
        </div>
        <div class="midBtn">
          <div @click='enter(1)'>主动还款</div>
          <div @click='enter(2)'>申请续贷</div>
          <div @click='enter(3)'>申请促保贷</div>
          <div @click='enter(4)'>申请过桥贷款</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppNav from '../financing/financingManege'
import Location from '../location/location'
export default {
  name: 'loanType',
  components: {
    // AppNav, 
    Location
  },
  data () {
    return {
      step: {selIndex: 8}
    }
  },
  methods: {
    enter (type) {
      var _id =  this.flag ? this.flag : '-1'
      var deleteF = this.$route.query.delete === '1' ? '1' : '0'
      if (type === 1) {
        this.$router.push({
          path: '/loanPublish',
          query: {
            id: _id,
            type: 1
          }
        })
      } else if (type === 2) {
        this.$router.push({
          path: '/loanPublish',
          query: {
            id: _id,
            type: 2
          }
        })
      } else if (type === 3) {
        this.$router.push({
          path: '/loanPublish',
          query: {
            id: _id,
            type: 3
          }
        })
      } else {
        this.$router.push({
          path: '/loanPublish',
          query: {
            id: _id,
            type: 4
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
        title: '贷款处置',
        url: '/loanDeal'
      },
      {
        title: '处置方式'
      }
    ]
  }
}
</script>

<style scoped lang='less'>
.loanType {
  height: 100%;
  .loanType_box {
    min-height: 100%;
    //padding-top: 70px;
    display: flex;
    .loanType_box_wrap {
      // width: 100%;
      background: #f4f8f9;
      .topNav {
        height: 60px;
        background: #ffffff;
        box-shadow: 2px 0 4px #ddd;
      }
      .midBtn {
        width: 300px;
        // height: 150px;
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
          margin: 15px auto;
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
