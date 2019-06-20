<template>
  <div class="chain-order__inner">
    <div class="chain-order__item">
      <div class="nav_bar">
        <div class="order_nav">
          <ul>
            <li v-for="(item, index) in btnList" :key="index" :class="[showIndex === index ? 'active_li' : '']" @click="navClick(item, index)">
              <p v-if="index === 0">{{item.name}}</p>
              <p v-else>{{`变更${index}`}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="chain-order__title">
        <span>电子订单</span>
      </div>
      <div class="chain-order__body">
        <div class="chain-order__form chain_flex">
          <div class="chain-order__form__group chain-width-r2">
            <div class="chain-order__form__row">
              <span class="chain-required-orange">*</span>
              <label for="">订单名称:</label>
              <input type="text" :disabled="true" v-model="order.orderName">
            </div>
          </div>
          <div class="chain-order__form__group chain_flex chain-width-r7">
            <div class="chain-order__form__row">
              <label for="">订单签订日期:</label>
              <el-date-picker size="small" :disabled="isDisabled.orderFinishDate" v-model="order.orderFinishDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="chain-order__form__row ">
              <label for="">交货日期:</label>
              <el-date-picker size="small" :disabled="isDisabled.orderDriverDate" v-model="order.orderDriverDate" type="date"  placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="chain-order__form__row">
              <label for="">结算日期:</label>
              <el-date-picker size="small" :disabled="isDisabled.orderSettleDate" v-model="order.orderSettleDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>商品信息</span>
      </div>
      <div class="chain-order__body">
        <div v-if="isView">
          <chain-table-view @calc_val="calc_price" :tableData="order.orderProductList"/>
        </div>
        <div v-else>
          <chain-table-edit @calc_val="calc_price" :tableData="order.orderProductList"/>
        </div>
        <div class="chain-order__form">
          <div class="chain-order__form__row chain_flex_end">
            <span class="chain-required-orange">*</span>
            <label for="">实际合计(元):</label>
            <input type="text" :disabled="isDisabled.orderValue" v-model="order.orderValue">
          </div>
          <div class="chain-order__form__row chain_flex_end">
            <span class="chain-text">参考合计：<strong class="isDisabled" :disabled="isDisabled.total_val">{{order.total_val}}</strong>(系统统计合计，仅限于参考)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>电子原件或扫描件 </span>
      </div>
      <div class="chain-order__body" v-if="isView">
        <chain-upload-view :tableData="order.orderUploadList"/>
      </div>
      <div class="chain-order__body" v-else>
        <chain-upload-edit :tableData="order.orderUploadList"/>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-order__body">
        <textarea class="chain-textarea" :disabled="isDisabled.orderDesc" v-model="order.orderDesc"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import ChainTableEdit from '@/components/chain_app/base/public/chainTableEdit_4'
import ChainUploadEdit from '@/components/chain_app/base/public/chainUploadEdit'
import ChainTableView from '@/components/chain_app/base/public/chainTableView_4'
import ChainUploadView from '@/components/chain_app/base/public/chainUploadView'
export default {
  name: 'chainorderEdit',
  components: {
    ChainTableEdit, ChainUploadEdit, ChainTableView, ChainUploadView
  },
  props: ['contractId', 'chainType', 'chainId', 'orderId'],
  data () {
    return {
      step: {selIndex: 1},
      project_status: '',
      order: {  
        orderProductList: [],
        orderUploadList: [],
        orderName: '',
        orderFinishDate: '',
        orderDriverDate: '',
        orderSettleDate: '',
        orderValue: '',
        orderDesc: '',
        total_val: 0
      },
      orderErrMsg: {
        orderName: '订单名称不能为空',
        orderFinishDate: '订单签订时间不能为空',
        orderDriverDate: '交货时间不能为空',
        orderSettleDate: '结算日期不能为空',
        orderValue: '订单金额不能为空'
      },
      isDisabled: {
        orderName: false,
        orderFinishDate: false,
        orderDriverDate: false,
        orderSettleDate: false,
        orderValue: false,
        orderDesc: false,
        total_val: false
      },
      order_cache: {
        orderProductList: [],
        orderUploadList: [],
        orderName: '',
        orderFinishDate: '',
        orderDriverDate: '',
        orderSettleDate: '',
        orderValue: '',
        orderDesc: '',
        total_val: 0
      },
      setIndex: -1,
      btnList: [],
      showIndex: 0,
      is_active: true,
      isView: false,
      prev_id: ''
    }
  },
  methods: {
    sureCommit () {
      if (!this.dataCheck(this.order)) return
      let productList = this.order.orderProductList
      let products = []
      if(this.$children[4].EOS) {
        this.$message.error('请先保存商品信息')
        return
      }
      if (productList.length > 0) {
        productList.forEach(element => {
          if (element.isEdit) {
            this.$message.error('请先保存商品信息')
            return
          } else {
            let product = []
            for(let item in element) {
              product.push(element[item])
            }
            product.pop()
            products.push(product)
          } 
        })
      }
      // 获取附件信息
      let attachList = this.order.orderUploadList
      let attach_list = []
      if (attachList.length > 0) {
        attachList.forEach(element => {
          attach_list.push(element.id)
        })
      }
      let params = {
        contract_id: this.contractId,
        product: products,
        attachment: attach_list,
        name: this.btnList[0].name + `(变更${this.btnList.length -1})`,
        date_created: this.order.orderFinishDate,
        deliver_date: this.order.orderDriverDate,
        settlement_date: this.order.orderSettleDate,
        amount: this.order.orderValue,
        note: this.order.orderDesc
      }
      this.orderModify(this.prev_id, params)
    },
    orderModify (prev_id, params) {
      params.pre_id = prev_id
      this.$ajax.post(`/api/chain/order/`, params).then(res => {
        if(res.status === 201) {
          // this.$message.success('变更成功')
          let _url = Number(this.chainType) === 1 ? '/chain_app/receive_chain?id='+this.chainId : '/chain_app/payment_chain?id='+this.chainId
          this.$router.push({
            path: _url
          })
          //this.$scrollToTop()
        }
      }).catch((err)=>{
        this.$message.error(err.response.data.detail)
      })
    },
    orderView (orderId, is_view) {
      if (!orderId) {
        this.project_status = 0
        return
      }
      this.$ajax.get(`/api/chain/order/${orderId}/`).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.order.orderUploadList = res.data.att_list,
          this.order.orderName = res.data.name,
          this.order.orderFinishDate = res.data.date_created,
          this.order.orderDriverDate = res.data.deliver_date,
          this.order.orderSettleDate = res.data.settlement_date,
          this.order.orderValue = res.data.amount,
          // this.order.orderCreateDate = res.data.create_time.substring(0, res.data.create_time.indexOf('T'))
          this.order.orderDesc = res.data.note
          this.project_status = Number(res.data.status)
          if (res.data.product.length > 0) {
            let product = '', productList = []
            res.data.product.forEach(element => {
              product = {
                product_name : element[0],
                product_unit : element[1],
                product_num : element[2],
                product_price : element[3],
                isEdit: false
              }
              productList.push(product)
              this.order.total_val += Number(element[3])
            })
            this.order.orderProductList = productList
          }
          if (!is_view) {
            let btn_list = []
            btn_list = res.data.id_list
            this.btnList = btn_list
            this.showIndex = this.btnList.length - 1
          }
        }
      })
    },
    dataCheck (obj) {
      const numReg = /^[0-9]+(.[0-9]{2})?$/
      let flag = true
      let check_obj = ''
      for (let item in obj) {
        if(['orderProductList','orderUploadList', 'orderDesc', 'total_val', 'orderCreateDate'].includes(item)) continue
        check_obj = typeof obj[item] === 'object' ? obj[item] : obj[item].trim()
        if(!check_obj) {
          this.$message.error(this.orderErrMsg[item])
          return !flag
        } else if (item === `orderValue` && !numReg.test(obj.orderValue)) {
          this.$message.error('订单金额必须为数值')
          return !flag
        }
      }
      return flag
    },
    calc_price (list) {
      this.order.total_val = 0
      list.forEach(element => {
        this.order.total_val += Number(element.product_price)
      })
      this.order.total_val = this.toThousands(this.order.total_val)
    },
    navClick (item, i) {
      this.showIndex = i
      if (this.showIndex === this.btnList.length - 1 && this.is_active === false) {
        this.order = this.copyObject(this.order_cache)
      }
      this.dataRender({all_disable: true})
      this.orderView(item.id, true)
    },
    dataRender (obj) {
      if (obj.remove) {
        this.isView = false
        for(var item in this.isDisabled) {
          if (arr.includes(item)) {
            this.isDisabled[item] = false
          } else {
            this.isDisabled[item] = true
          }
        }
      } 
      if (obj.all_reset) {
        this.isView = false
        for(var item in this.isDisabled) {
          this.isDisabled[item] = false
        }
      }
      if (obj.all_disable) {
        this.isView = true
        for(var item in this.isDisabled) {
          this.isDisabled[item] = true
        }
      }
    },
    copyObject (obj) {
      let _new = JSON.stringify(obj) 
      return JSON.parse(_new) 
    }
  },
  mounted () {
    this.orderView(this.orderId)
  },
  watch: {
    order: {
      handler (newVal, old) {
        if (this.showIndex === this.btnList.length-1) {
          this.order_cache = this.copyObject(newVal)
        }
　　　},
　　　deep: true　
　　},
    project_status: function (newVal, old) {
      if (Number(newVal) === 1) {
        this.dataRender({all_disable: true})
      } else {
        this.dataRender({all_reset: true})
      }
    }
  }
}
</script>
