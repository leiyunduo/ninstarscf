<template>
  <div class="chain-order__inner">
    <div class="chain-order__item">
      <div class="chain-order__title">
        <span>电子订单</span>
        <div class="add-menu" v-show="false">
          <div class="add-menu__item">电子订单1</div>
          <div class="add-menu__item">电子订单2</div>
          <div class="add-menu__item">电子订单3</div>
          <div class="add-menu__item avtive">+</div>
        </div>
      </div>
      <div class="chain-order__body">
        <div class="chain-order__form chain_flex">
          <div class="chain-order__form__group chain-width-r2">
            <div class="chain-order__form__row">
              <label for="">订单名称:</label>
              <span class="chain-text">{{order.orderName}}</span>
            </div>
            <div class="chain-order__form__row">
              <label for="">创建日期:</label>
              <span class="chain-text">{{order.orderCreateDate}}</span>
            </div>
            <div class="chain-order__form__row">
              <label for="">签订日期:</label>
              <span class="chain-text">{{order.orderFinishDate}}</span>
            </div>
          </div>
          <div class="chain-order__form__group chain-width-r7">
            <div class="chain-order__form__row">
              <label for="">出库日期:</label> 
              <span class="chain-text">{{order.orderDriverDate}}</span>
            </div>
            <div class="chain-order__form__row">
              <label for="">运输日期:</label> 
              <span class="chain-text">{{order.orderTransportDate}}</span>
            </div>
            <div class="chain-order__form__row">
              <label for="">入库日期:</label> 
              <span class="chain-text">{{order.orderAccptanceDate}}</span>
            </div>
            <div class="chain-order__form__row">
              <label for="">结算日期:</label>
              <span class="chain-text">{{order.orderSettleDate}}</span>
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
        <chain-table :tableData="order.orderProductList"/>
        <div class="chain-order__form">
          <div class="chain-order__form__row chain_flex_end">
            <span class="chain-required-orange">*</span>
            <label for="">实际合计(元):</label>
            <span>{{order.orderValue}}</span>
          </div>
          <div class="chain-order__form__row chain_flex_end">
            <span class="chain-text">参考合计（元）：<strong>{{toThousands(order.total_val)}}</strong>(系统统计合计，仅限于参考)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>电子原件或扫描件</span>
      </div>
      <div class="chain-order__body">
        <chain-upload :tableData="order.orderUploadList"/>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>经办人</span>
      </div>
      <div class="chain-order__body">
        <agent-invite-view :tableData="order.agent"/>
      </div>
    </div>
    <div class="chain-order__item chain-table_padding">
      <div class="chain-order__title hide-line">
        <span>添加备注及说明</span>
      </div>
      <div class="chain-order__body">
        <textarea class="chain-textarea" disabled v-model="order.orderDesc"></textarea>
      </div>
    </div>
    <div class="chain-order__item chain_bg_default">
      <div class="chain-order__body">
        <!-- <div class="chain-btn__group">
          <div class="chain-btn chain-btn_save" @click='toEdit'>编辑</div>
          <div class="chain-btn chain-btn_sub">确认发布</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ChainUpload from '@/components/chain_app/base/public/chainUploadView'
import ChainTable from '@/components/chain-view/base/public/chainTableView_4'
import AgentInviteView from '@/components/chain-view/base/public/agentTableView'
export default {
  name: 'chainorderEdit',
  components: {
    ChainUpload, AgentInviteView, ChainTable
  },
  props: ['orderId', 'type'],
  data () {
    return {
      step: {selIndex: 1},
      order: {
        orderProductList: [],
        orderUploadList: [],
        orderName: '',
        orderFinishDate: '',
        orderDriverDate: '',
        orderTransportDate: '',
        orderAccptanceDate: '',
        orderSettleDate: '',
        orderValue:'',
        orderDesc: '',
        orderCreateDate: '',
        total_val: 0,
        agent: []
      }
    }
  },
  methods: {
    toEdit() {
      this.$emit('toEdit', {isEdit: '1'})
    }
  },
  mounted () {
    this.$ajax.get(`/api/chain/order/${this.orderId}/`).then(res => {
      if (res.status === 200) {
        this.order.orderUploadList = res.data.att_list,
        this.order.orderName = res.data.name,
        this.order.orderFinishDate = res.data.date_created,
        this.order.orderDriverDate = res.data.deliver_date,
        this.order.orderTransportDate = res.data.transport_date,
        this.order.orderAccptanceDate = res.data.acceptance_date,
        this.order.orderSettleDate = res.data.settlement_date,
        this.order.orderValue = this.toThousands(res.data.amount),
        this.order.orderCreateDate = res.data.create_time.substring(0, res.data.create_time.indexOf('T'))
        this.order.orderDesc = res.data.note
        this.order.agent = res.data.agent_list
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
      }
    })
  }
}
</script>
