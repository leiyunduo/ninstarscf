<template>
  <div class="cover_container">
    <div class="cover_wrap">
      <div class="financing-item__title">
        <span>其他担保</span>
      </div>
      <div class="cover_info">
        <span>其他应收：</span>
        <span>{{assuresSum > 100000 ? assuresSum / 100000 + '万元' : assuresSum + '元'}}</span>
      </div>
      <ul class="cover_pool_list" v-if="assures.length !== 0">
        <li v-for="(item, index) in assures" :key='index'>
          <div class="show_item_title">
            <div>
              <span>类型：</span>
              <span>{{typeList[item.collateral_type]}}</span>
            </div>
            <div>
              <span>市场估值：</span>
              <span>{{item.appraisement > 100000 ? item.appraisement / 100000 + '万元' : item.appraisement + '元'}}</span>
            </div>
          </div>
          <!-- <div class="show_item_tip">生产来源</div> -->
          <div class="show_item_infoline" v-html='item.temp'></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';
export default {
  name: 'assure',
  data () {
    return {
      assures: [],
      assuresSum: 0,
      typeList: ['', '房产', '汽车', '股权', '基金']
    }
  },
  beforeMount () {
    const that = this
    // that.financingId = that.$route.query,financing_id
    that.financingId = 23
    if (that.financingId) {
      that.$ajax.get('/api/orderfinancing/assure/?financing_id=' + that.financingId).then(res => {
        console.log(res)
        that.assures = res.data
        let sum = 0
        res.data.forEach(val => {
          sum += val.appraisement
          val.temp = that.handleClassify(val)
        })
        console.log(sum)
        that.assuresSum = sum.toFixed(2)
      }).catch(error => {
        console.log(error)
      })
    } else {
      alert('error financing_id')
    }
  },
  methods: {
    handleClassify (val) {
      // let re = []
      // this.setTemplate = (obj) => {
      //   for (let j in obj) {
      //   }
      // }
      if (val.collateral_type === '1') {
        return `
          <div class='show_item'>
            <span>城市：</span>
            <span style='${!val.address ? 'color: #999' : ''}'>${val.address || '未填写'}</span>
          </div>
          <div class='show_item'>
            <span>小区地址：</span>
            <span style='${!val.full_address ? 'color: #999' : ''}'>${val.full_address || '未填写'}</span>
          </div>
          <div class='show_item'>
            <span>小区地址：</span>
            <span style='${!val.area ? 'color: #999' : ''}'>${val.area || '未填写'}</span>
          </div>
          <div class='show_item'>
            <span>评估报告：</span>
            <span style='${!val.att_id_list ? 'color: #999' : ''}'>${val.att_id_list || '未上传原件'}</span>
          </div>
        `
      } else if (val.collateral_type === '2') {
        return `
          <div class='show_item'>
            <span>车型：</span>
            <span style='${!val.car_type ? 'color: #999' : ''}'>${val.car_type || '未填写'}</span>
          </div>
          <div class='show_item'>
            <span>评估报告：</span>
            <span style='${!val.att_id_list ? 'color: #999' : ''}'>${val.att_id_list || '未上传原件'}</span>
          </div>
        `
      } else if (val.collateral_type === '3') {
        return `
          <div class='show_item'>
            <span>公司名称：</span>
            <span style='${!val.business_name ? 'color: #999' : ''}'>${val.business_name || '未填写'}</span>
          </div>
          <div class='show_item'>
            <span>评估报告：</span>
            <span style='${!val.att_id_list ? 'color: #999' : ''}'>${val.att_id_list || '未上传原件'}</span>
          </div>          
        `
      } else if (val.collateral_type === '4') {
        return `
          <div class='show_item'>
            <span>公司名称：</span>
            <span style='${!val.business_name ? 'color: #999' : ''}'>${val.business_name || '未填写'}</span>
          </div>
          <div class='show_item'>
            <span>股权比例：</span>
            <span style='${!val.ratio ? 'color: #999' : ''}'>${val.ratio ? val.ratio + '%' : '未填写'}</span>
          </div>
          <div class='show_item'>
            <span>评估报告：</span>
            <span style='${!val.att_id_list ? 'color: #999' : ''}'>${val.att_id_list || '未上传原件'}</span>
          </div>   
        `
      }
    }
  }
}
</script>
<style lang='less'>
.cover_container {
  /* width: calc(100% - 260px); */
  padding: 20px 0;
  background: rgb(245, 245, 245);
  margin-left: 260px;
  // padding: 0 20px;
  .cover_wrap {
    margin: 0 30px;
    background: #fff;
    color: #333;
    padding: 0 20px;
    padding-bottom: 24px;
    border: 1px solid #e1e6f0;
    .financing-item__title {
      // margin: 10px 40px 0 40px;
      height: 60px;
      border-bottom: 1px solid #e1e6f0;;
      display: flex;
      align-items: flex-end;
      &.hide-line {
        border: none
      }
      span {
        display: inline-block;
        padding-left: 8px;
        color: #333;
        font-weight: bolder;
        border-left: 5px solid #eb6100;
        margin-bottom: 5px;
      }
    }
    .cover_pool_list {
      margin: 0;
      padding: 0 20px;
      li {
        background: #fff;
        border: 1px solid #e1e6f0;
        border-bottom: none;
        list-style: none;
        margin-top: 20px;
        border-radius: 2px;
        .show_item_title {
          border-bottom: 1px solid #eaeaea;
          height: 52px;
          background: #f7f7f7;
          display: flex;
          padding: 0 70px;
          align-items: center;
          div{
            font-size: 14px;
            width: 18%;
            // padding: 0 5px;
            display: flex;
            align-items: center;
            // height: 100%;
            span:first-child {
              height: 100%;
              font-weight: bolder;
              color: #666;
              width: 30%;
              text-align: right;
            }
            span:last-child {
              height: 100%;
              color: #333;
              font-weight: bolder;
              width: 60%;
              word-break: keep-all;
            }
          }
        }
        .show_item_infoline {
          padding: 0 70px;
          display: flex;
          line-height: 48px;
          border-bottom: 1px solid #e1e6f0;
          justify-content: flex-start;
          .show_item {
            width: 18%;
            // padding: 0 5px;
            font-size: 14px;
            display: flex;
            span:first-child {
              width: 30%;
              color: #666;
              text-align: right;
            }
            span:last-child {
              color: #eb6100;
              font-weight: bolder;
              width: 67%
            }
          }
          // .show_item:last-child {
          //   width: 23%;
          //   span:first-child {
          //     width: 28%;
          //   }
          // }
        }
      }
    }
  }
}
</style>
