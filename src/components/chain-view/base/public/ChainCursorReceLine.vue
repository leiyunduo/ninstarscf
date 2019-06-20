<template>
  <div class="wrap">
    <div class="inner">
      <div id="info" v-show="showInfo">
        <div class="inline_box" id="box1" :style="style.mainLine.showData.border1">
          <div class="inline_item" :style="style.mainLine.showData.item1">
          </div>
          <div class="inline_item" :style="style.mainLine.showData.item1">
          </div>
          <div class="inline_item_text" @click="lineHandler($event)">
            <span>销售合同登记</span>
          </div>
          <div class="placeholder" v-show="placeholder1" :style="holder"></div>
        </div>
        <div class="inline_box" id="box2" :style="style.mainLine.showData.border2">
          <div class="inline_item" :style="style.mainLine.showData.item2">
          </div>
          <div class="inline_item_text" @click="lineHandler($event)">
            <span>销售记账</span>
          </div>
          <!-- <div class="placeholder" :style="holder"></div> -->
        </div>
        <div class="inline_box" id="box3" :style="style.mainLine.related.border1">
          <div class="inline_item" :style="style.mainLine.related.item1">
          </div>
          <div class="inline_item_text" @click="lineHandler($event)">
            <span>关联采购合同登记 </span>
          </div>
          <div class="placeholder" v-show="placeholder3" :style="holder"></div>
        </div>
        <div class="inline_box" id="box4" :style="style.mainLine.related.border2">
          <div class="inline_item" :style="style.mainLine.related.item2">
          </div>
          <div class="inline_item_text" @click="lineHandler($event)">
            <span>关联采购记账</span>
          </div>
          <div class="placeholder" v-show="placeholder4" :style="holder"></div>
        </div>
      </div>
      <div id="detail" v-show="!showInfo">
        <div class="inline_box_detail" :class="flag === 1 ? 'lineColorOrange': (isHavingContract(showData, 0, 8) ? 'lineColorOrange':'') " v-if="flag === 1 || flag === 2" :style="style.inline_item_width.min">
          <div class="inline_item" @click="lineHandler($event)" style="width:26px;height:26px;background-image: url('static/img/cursor/icon3.png');top:-13px">
          </div>
          <div v-if="0 === placeHolder[0] && flag === 1 " class="twinkle" :id="0" @click="toAnchor($event)" >
          </div>
          <div v-else class="inline_item" :style="checkStatus(dataList[0])">
            <span class="inline_item_num" v-if="flag === 1 && !checkStatus(dataList[0])" id="0" @click="toAnchor($event)">
              <!-- 1 -->
            </span>
            <span class="tooltiptext_top" v-if="flag === 1 && (dataList[0][0] && dataList[0][0].name !== '')">
              <img v-if="dataList[0][0].status" :src="dataList[0][0].status==='1' ? 'static/img/noauth11.png': dataList[0][0].status === '2' ? 'static/img/auth11.png':'static/img/auditing.png'" alt="">
               {{dataList[0][0] === undefined ? "": dataList[0][0].name}}
            </span>
          </div>
          <div class="inline_item" v-if="flag===2" style="width:26px;height:26px;background-image: url('static/img/cursor/icon3.png');top:-13px" @click="lineHandler($event)">   
          </div>
          <div class="inline_item_text" :style="style.position" id="box1">
            <span class="font_size_f" @click="lineHandler($event)">
              销售合同登记
            </span>
            <div class="placeholder" v-if="flag===1"></div>
          </div>
          <div class="inline_item_text" id="box2">
            <span v-if="flag === 2" class="font_size_f" @click="lineHandler($event)">
              销售记账
            </span>
            <div class="placeholder" v-if="flag===2" style="right:14px"></div>
            <span v-if="flag === 1" id="0" @click="toAnchor($event)" :class="0 === setIndex ? 'active':''">
              关联B2B销售合同
            </span>
          </div>
        </div>     
        <div class="inline_box_detail" :class="[dataList[index].length > 0 ? 'lineColorOrange' : '']" v-if="flag === 1 && index !== 0" v-for="(val, index) in titleList" :key="index" :style="titleList.length === 8 ? style.inline_item_width.mid : style.inline_item_width.max">
          <div v-if="index === placeHolder[0]" class="twinkle" :id="index" @click="toAnchor($event)" >
          </div>
          <div v-else class="inline_item" :style="dataList[index].length === 0? style.inline_item: checkStatus(dataList[index])" :ngData="1" :id="index" @click="toAnchor($event)">
            <span class="inline_item_num" :id="index" v-if="!checkStatus(dataList[index])">
              <!-- {{dataList[index].length || ''}} -->
            </span>
            <span v-if="dataList[index].length > 0 && (index!==5 && index!==6)" :class="dataList[index].length > 4 ? 'tooltiptext_bottom':'tooltiptext_top'">
              <a v-for="(val,index1) in dataList[index]" :key="index1">
                <img :src="val.status==='1' ? 'static/img/noauth11.png': val.status === '2' ? 'static/img/auth11.png':'static/img/auditing.png'" alt="">
                {{val.name}}<br/>
              </a>
            </span>
          </div>
          <div class="inline_item_text">
            <span :id="index" @click="toAnchor($event)" :class="index === setIndex ? 'active':''">
              {{val.name}}
            </span>
          </div>
          <!-- <div class="placeholder" v-if="index===2"></div> -->
        </div>
        <div class="inline_box_detail" :class="[dataList[index].length > 0 ? 'lineColorOrange' : '']" v-if="flag === 2" v-for="(val, index) in titleList" :key="index" :style="titleList.length === 8 ? style.inline_item_width.mid : style.inline_item_width.max">
          <div v-if="index === placeHolder[0]" class="twinkle" :id="index + 7" @click="toAnchor($event)">
          </div>
          <div v-else class="inline_item" :style="dataList[index].length === 0? style.inline_item: checkStatus(dataList[index])" :id="index + 7" @click="toAnchor($event)">
            <span class="inline_item_num" :id="index+7" v-if="!checkStatus(dataList[index])">
              <!-- {{dataList[index].length || ''}} -->
            </span>
            <span v-if="dataList[index].length > 0" :class="dataList[index].length > 4 ? 'tooltiptext_bottom':'tooltiptext_top'">
              <a v-for="(val,index1) in dataList[index]" :key="index1">
                <img :src="val.status==='1' ? 'static/img/noauth11.png': val.status === '2' ? 'static/img/auth11.png':'static/img/auditing.png'" alt="">
                {{val.name}}<br/>
              </a>
            </span>
          </div>
          <div class="inline_item_text">
            <span :id="index + 7" @click="toAnchor($event)" :class="(index+7) === setIndex ? 'active':''">
              {{val.name}}
            </span>
          </div>
        </div>
        <div class="inline_box_detail" :class="[isHavingContract(showData, 7) ? 'lineColorOrange' : '']" v-if="flag === 1" :style="style.inline_item_width.min">
          <div class="inline_item" @click="lineHandler($event)" style="width:26px;height:26px;background-image:url('static/img/cursor/icon3.png');top:-13px">
          </div>
          <div class="inline_item_text" id="box2">
            <span class="font_size_f" @click="lineHandler($event)">
              销售记账
            </span>
            <div class="placeholder01" style="right:20px"></div>
          </div>
				</div>
        <div class="inline_box_detail" :class="[isHavingContract(related, 0, 8) ? 'lineColorBlue' : '']" v-if="flag <= 2" :style="style.inline_item_width.min">
          <div class="inline_item" style="width:26px;height:26px;background-image:url('static/img/cursor/icon4.png');top:-13px" @click="lineHandler($event)">
          </div>
          <div class="inline_item_text" id="box3">
            <span class="font_size_f" @click="lineHandler($event)">
              关联采购合同登记
            </span>
            <div class="placeholder1" v-if="flag===2" style="right:20px"></div>
          </div>
				</div>
        <div class="inline_box_detail" :class="[isHavingContract(related, 7) ? 'lineColorBlue' : '']" v-if="flag <= 2" :style="style.inline_item_width.min">
          <div class="inline_item" style="width:26px;height:26px;background-image:url('static/img/cursor/icon4.png');top:-13px" @click="lineHandler($event)">
          </div>
          <div class="inline_item_text" id="box4">
            <span class="font_size_f" @click="lineHandler($event)">
              关联采购记账
            </span>
          </div>
				</div>
        <div class="inline_box_detail" :class="[isHavingContract(showData, 0, 8) ? 'lineColorOrange' : '']" v-if="flag === 3" :style="style.inline_item_width.min">
          <div class="inline_item" @click="lineHandler($event)" style="width:26px;height:26px;background-image:url('static/img/cursor/icon3.png');top:-13px">
          </div>
          <div class="inline_item" @click="lineHandler($event)" style="width:26px;height:26px;background-image:url('static/img/cursor/icon3.png');top:-13px">     
          </div>
          <div class="inline_item_text" :style="style.position" id="box1">
            <span class="font_size_f" @click="lineHandler($event)">
              销售合同登记
            </span>
          </div>
          <div class="inline_item_text" id="box2">
            <span class="font_size_f" @click="lineHandler($event)">
              销售记账
            </span>
          </div>
        </div>
        <div class="inline_box_detail" :class="isHavingContract(showData, 7) ? 'lineColorOrange':''" v-if="flag === 3" :style="style.inline_item_width.min">
          <div class="inline_item" style="width:26px;height:26px;background-image:url('static/img/cursor/icon4.png');top:-13px" @click="lineHandler($event)">
          </div>
          <div class="inline_item_text" id="box3">
            <span class="font_size_f" @click="lineHandler($event)">
              关联采购合同登记
            </span>
            <div class="placeholder11" style="right:14px"></div>
          </div>
				</div>
        <div class="inline_box_detail" :class="[dataList[index].length > 0 ? 'lineColorBlue' : '']" v-if="flag === 3" v-for="(val, index) in titleList" :key="index" :style="titleList.length === 8 ? style.inline_item_width.mid : style.inline_item_width.max">
          <div v-if="index === placeHolder[0]" class="twinkle" :id="'_' + index" @click="toAnchor($event)">
          </div>
          <div v-else class="inline_item" :style="dataList[index].length === 0? style.inline_item: checkStatus(dataList[index])" :id="'_' + index" @click="toAnchor($event)">
            <span class="inline_item_num" style="color:#0c8dff" :id="'_' + index" v-if="!checkStatus(dataList[index])">
              <!-- {{dataList[index].length || ''}} -->
            </span>
            <span v-if="dataList[index].length > 0 && (index!==5 && index!==6)" :class="dataList[index].length > 4 ? 'tooltiptext_bottom':'tooltiptext_top'">
              <a v-for="(val,index1) in dataList[index]" :key="index1">
                <img :src="val.status==='1' ? 'static/img/noauth11.png': val.status === '2' ? 'static/img/auth11.png':'static/img/auditing.png'" alt="">
                {{val.name}}<br />
              </a>
						</span>
          </div>
          <div class="inline_item_text">
            <span :id="'_' + index" @click="toAnchor($event)" :class="index === setIndex ? 'active_b':''">
              {{val.name}}
            </span>
          </div>
        </div>
        <div class="inline_box_detail" :class="[isHavingContract(related, 7)? 'lineColorBlue' : '']" v-if="flag === 3" :style="style.inline_item_width.min">
          <div class="inline_item" style="width:26px;height:26px;background-image:url('static/img/cursor/icon4.png');top:-13px" @click="lineHandler($event)">
          </div>
          <div class="inline_item_text" id="box4">
            <span class="font_size_f" @click="lineHandler($event)">
              关联采购记账
            </span>
            <div class="placeholder1" style="right:20px"></div>
          </div>
				</div>
        <div class="inline_box_detail" :class="[isHavingContract(showData, 0, 8) ? 'lineColorOrange' : '']" v-if="flag === 4" :style="style.inline_item_width.min">
          <div class="inline_item" @click="lineHandler($event)" style="width:26px;height:26px;background-image:url('static/img/cursor/icon3.png');top:-13px">
          </div>
          <div class="inline_item" @click="lineHandler($event)" style="width:26px;height:26px;background-image:url('static/img/cursor/icon3.png');top:-13px">     
          </div>
          <div class="inline_item_text" :style="style.position" id="box1">
            <span class="font_size_f" @click="lineHandler($event)">
              销售合同登记
            </span>
          </div>
          <div class="inline_item_text" id="box2">
            <span class="font_size_f" @click="lineHandler($event)">
              销售记账
            </span>
          </div>
        </div>
        <div class="inline_box_detail" :class="[isHavingContract(showData, 7) ? 'lineColorOrange' : '']" v-if="flag === 4" :style="style.inline_item_width.min">
          <div class="inline_item" style="width:26px;height:26px;background-image:url('static/img/cursor/icon4.png');top:-13px" @click="lineHandler($event)">
          </div>
          <div class="inline_item_text" id="box3">
            <span class="font_size_f" @click="lineHandler($event)">
              关联采购合同登记
            </span>
          </div>
				</div>
        <div class="inline_box_detail" :class="[isHavingContract(related, 0, 8) ? 'lineColorBlue' : '']" v-if="flag === 4" :style="style.inline_item_width.min">
          <div class="inline_item" style="width:26px;height:26px;background-image:url('static/img/cursor/icon4.png');top:-13px" @click="lineHandler($event)">
          </div>
          <div class="inline_item_text" id="box4">
            <span class="font_size_f" @click="lineHandler($event)">
              关联采购记账
            </span>
            <div class="placeholder11" style="right:14px"></div>
          </div>
				</div>
        <div class="inline_box_detail" :class="[dataList[index].length > 0 ? 'lineColorBlue' : '']" v-if="flag === 4" v-for="(val, index) in titleList" :key="index" :style="titleList.length === 8 ? style.inline_item_width.mid : style.inline_item_width.max">
          <div v-if="index === placeHolder[0]" class="twinkle" :id="'_' + (index + 7)" @click="toAnchor($event)">
          </div>
          <div v-else class="inline_item" :style="dataList[index].length === 0? style.inline_item: checkStatus(dataList[index])" :id="'_' + (index + 7)" @click="toAnchor($event)">
            <span class="inline_item_num" style="color:#0c8dff" :id="'_' + (index + 7)" v-if="!checkStatus(dataList[index])">
              <!-- {{dataList[index].length || ''}} -->
            </span>
            <span v-if="dataList[index].length > 0" :class="dataList[index].length > 4 ? 'tooltiptext_bottom':'tooltiptext_top'">
							<a v-for="(val,index1) in dataList[index]" :key="index1">
                <img :src="val.status==='1' ? 'static/img/noauth11.png': val.status === '2' ? 'static/img/auth11.png':'static/img/auditing.png'" alt="">
                {{val.name}}<br />
              </a>
						</span>
          </div>
          <div class="inline_item_text">
            <span :id="'_' + (index + 7)"  @click="toAnchor($event)" :class="(7 + index) === setIndex ? 'active_b':''">
              {{val.name}}
            </span>
          </div>
        </div>
      </div>		
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChainNavLine',
  data () {
    return {
      showData: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      related: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      titleList1: [{name: '关联B2B销售合同'}, {name: 'B2B应收订金'}, {name: 'B2B销售订单计划'}, {name: '仓储合同'}, {name: '物流合同'}, {name: '参与角色登记'}, {name: '应收融资计划'}],
      titleList2: [{name: 'B2B电子订单'}, {name: 'B2B电子出货单'}, {name: 'B2B电子运单'}, {name: 'B2B验收入库单'}, {name: 'B2B订单结算'}, {name: 'B2B发票'}, {name: 'B2B支付'}, {name: 'B2B合同结算'}],
      relatedTableList1: [{name: '关联B2B采购合同'}, {name: 'B2B应付订金'}, {name: 'B2B采购订单计划'}, {name: '仓储合同'}, {name: '物流合同'}, {name: '参与角色登记'}, {name: '订单融资计划'}],
      relatedTableList2: [{name: 'B2B电子订单'}, {name: 'B2B电子出货单'}, {name: 'B2B电子运单'}, {name: 'B2B验收入库单'}, {name: 'B2B结算'}, {name: 'B2B发票'}, {name: 'B2B支付'}, {name: 'B2B合同结算'}],
      dataList: '',
      titleList: '',
      showInfo: '',
      style: {
        inline_box: {
          orange: 'background: #EA6100',
          blue: 'background: #0c8dff',
        },
        inline_item: 'background: #a8a9a9;width:14px;height:14px;top:-7px;border:1px solid #a8a9a9',
        inline_item_blue: 'background: #0c8dff;width:14px;height:14px;top:-7px',
        inline_item_width: {
          max: 'width: 10%;',
          mid: 'width: 9%;',
          min: 'width: 6%;'
        },
        iconStatus: {
          unauditing: 'position: absolute;border:none;width: 18px;height: 18px;top: -9px;z-index: 1;background-image: url("static/img/noauth11.png");background-size: 100%;background-position: center;cursor: pointer;',
          auditing: 'position: absolute;border:none;width: 18px;height: 18px;top: -9px;z-index: 1;background-image: url("static/img/auth11.png");background-size: 100%;background-position: center;cursor: pointer;',
          confirm: 'position: absolute;border:none;width: 18px;height: 18px;top: -9px;z-index: 1;background-image: url("static/img/auditing.png");background-size: 100%;background-position: center;cursor: pointer;'
        },
        position: 'left: 0;transform: translateX(-50%);',
        mainLine: {
          showData: {
            item1: '',
            item2: '',
            border1: '',
            border2: ''
          },
          related: {
            item1: '',
            item2: '',
            border1: '',
            border2: ''
          }
        }
      },
      flag: '',
      holder: '',
      placeholder1: '',
      placeholder2: '',
      placeholder3: '',
      placeholder4: '',
      setIndex: '',
      placeHolder: '',
      Tween: { //动画算法
        Linear: function(t, b, c, d) { return c*t/d+b; }
      }
    }
  },
  props: ['chainId', 'dataNav'],
  methods: {
    lineHandler (e, type) {
      // // // console.log(chainRouter)
      var that = this
      var tag = e.currentTarget.parentElement.id
      var data = {}
      this.setIndex = ''
      if (!type) {
        that.showInfo = !that.showInfo
      }
      switch (tag) {
        case 'box1':
          that.dataList = that.showData.slice(0,7)
          that.titleList = that.titleList1
          that.flag = 1
          data.flag = 1
          that.placeHolder = []
          that.dataList.forEach((val, index) => {
            if (val.length === 0) {
              that.placeHolder.push(index)
            }
          })
          data.twinkle = that.placeHolder
          break  
        case 'box2':
          that.dataList = that.showData.slice(7)
          that.titleList = that.titleList2
          that.flag = 2
          data.flag = 2
          that.placeHolder = []
          that.dataList.forEach((val, index) => {
            if (val.length === 0) {
              that.placeHolder.push(index)
            }
          })
          data.twinkle = that.placeHolder
          break
        case 'box3':
          that.dataList = that.related.slice(0,7)
          that.titleList = that.relatedTableList1
          that.flag = 3
          data.flag = 3
          that.placeHolder = []
          that.dataList.forEach((val, index) => {
            if (val.length === 0) {
              that.placeHolder.push(index)
            }
          })
          data.twinkle = that.placeHolder
          break
        case 'box4':
          that.dataList = that.related.slice(7)
          that.titleList = that.relatedTableList2
          that.flag = 4
          data.flag = 4
          that.placeHolder = []
          that.dataList.forEach((val, index) => {
            if (val.length === 0) {
              that.placeHolder.push(index)
            }
          })
          data.twinkle = that.placeHolder
          break
      }
      data.showInfoState = that.showInfo
      data.titleList = that.titleList
      data.dataList = that.dataList
      that.$emit('checkState', data)
    },
    toAnchor (el) {   
      let element = ''
      let id = ''
      let maxScrollHeight = ''
      let maxHeight = ''
      let scrollTop = ''
      let userAgent = ''
      let offsetTop = ''
      if (String(el.target.id).indexOf('_') === -1) {
        element = 'saleContract' + String(el.target.id)
        this.setIndex = Number(el.target.id)
      } else {
        id = String(el.target.id).substring(String(el.target.id).indexOf('_') + 1, String(el.target.id).length)
        element = 'relation' + id
        this.setIndex = Number(id)
      }
      let dom =  document.getElementById(element)
      // 游标控制滚动条
      if (dom) {
        // document.getElementById(element).scrollIntoView()
        if (element === 'saleContract0') {
          offsetTop === 0
        } else {
          offsetTop = document.getElementById(element).parentElement.offsetTop - 62
        }
        this.$emit('toAnchorPlace', this.setIndex)
        maxHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        maxScrollHeight = maxHeight - (document.documentElement.clientHeight || document.body.clientHeight)
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        userAgent = navigator.userAgent
        if (['Edge', 'IE', 'Safari', '360', 'QQ'].indexOf(this.$checkBrowser()) > -1) {
          // document.body.scrollTop = scrollTop === maxScrollHeight ? scrollTop - 189 : scrollTop - (this.dataNav.topFlag === 'middle' ? 450 : 330)
          scrollTop === maxScrollHeight ? this.animate(document.body, {scrollTop: scrollTop - 189}) : this.animate(document.body, {scrollTop: offsetTop})
        }
        else {
          // document.documentElement.scrollTop = scrollTop === maxScrollHeight ? scrollTop - 189 : scrollTop - (this.dataNav.topFlag === 'middle' ? 450 : 330)
          scrollTop === maxScrollHeight ? this.animate(document.documentElement, {scrollTop: scrollTop - 189}) : this.animate(document.documentElement, {scrollTop: offsetTop})
        }
      }
    },
    checkStatus (arr, i) {
      var arrSrc = []
      if (Array.isArray(arr)) {
        arr.forEach((val, index) => {
          arrSrc.push(val.status)
        })
        if (arr.length === 1 && !arr[0].name) {
          return this.style.inline_item
        } else if (arrSrc.indexOf('1') > -1) {
          return this.style.iconStatus.unauditing
        } else if (arrSrc.indexOf('2') > -1) {
          return this.style.iconStatus.auditing
        } else if (arrSrc.indexOf('3') > -1) {
          return this.style.iconStatus.confirm
        }
      }
    },
    isHavingContract (arr, index, end) {
      let flag = false
      if (Array.isArray(arr)) {
        let thatArr = Number(end) ? arr.slice(Number(index),Number(end)) : arr.slice(Number(index))
        thatArr.forEach((val, index)=>{
          if (val.length > 0) {
            flag = true
          }
        })
      }
      return flag
    },
    update () {
      var that = this
      const op = {
        method: 'PATCH',
        url: '/api/cursor_list/',
        data: {token: that.$token(), chain_id: that.chainId}
      }
      that.$ajax(op).then(res => {
        // // console.log(res)
        if (res.data.payable_contracts.length !== 0) {
          var related = []
          res.data.payable_contracts[0].forEach((val, index) => {
            if (index <= 2 || index === 5 || index === 6 || index === 14) {
              res.data.payable_contracts[0][index] ? related[index] = [res.data.payable_contracts[0][index]] : related[index] = []
            } else {
              related[index] = val
            }
          })
        } else {
          related = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
        }
        that.related = related
        if (res.data.receivable_contracts.length !== 0) {
          var showData = []
          res.data.receivable_contracts[0].forEach((val, index) => {
            if (index <= 2 || index === 5 || index === 6 || index === 14) {
              res.data.receivable_contracts[0][index] ? showData[index] = [res.data.receivable_contracts[0][index]] : showData[index] = []
            } else {
              showData[index] = val
            }
          })
        } else {
          showData = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
        }
        that.showData = showData
        if (that.related[0].length > 0) {
          that.style.mainLine.related.item1 = 'background-image: url("static/img/cursor/icon4.png");width:26px;height:26px;top:-13px'
          that.style.mainLine.related.border1 = 'border-color: #0c8dff'
          if (that.isHavingContract(that.related, 7)) {
            that.style.mainLine.related.item2 = 'background-image: url("static/img/cursor/icon4.png");width:26px;height:26px;top:-13px'
            that.style.mainLine.related.border2 = 'border-color: #0c8dff'
          } else {
            that.style.mainLine.related.item2 = 'background-image: url("static/img/cursor/icon_default.png");width:26px;height:26px;top:-13px'
            // console.log(that.style.mainLine.related.item2)
          }
        } else {
          that.style.mainLine.related.item1 = 'background-image: url("static/img/cursor/icon_default.png");width:26px;height:26px;top:-13px'
          that.style.mainLine.related.item2 = 'background-image: url("static/img/cursor/icon_default.png");width:26px;height:26px;top:-13px'
        }
        if (that.showData[0].length > 0) {
          // that.style.mainLine.showData.item1 = 'border-color: #ea6100;background:#ea6100;width:20px;height:20px;top:-10px'
          that.style.mainLine.showData.item1 = 'background-image: url("static/img/cursor/icon3.png");width:26px;height:26px;top:-13px'
          that.style.mainLine.showData.border1 = 'border-color: #ea6100'
          if (that.isHavingContract(that.showData, 7)) {
            that.style.mainLine.showData.item2 = 'background-image: url("static/img/cursor/icon_con1.png");width:56px;height:26px;border-radius:0;top:-13px'
            that.style.mainLine.showData.border2 = 'border-color: #ea6100'
          } else {
            // that.placeholder2 = true
            // that.holder = 'right: 30%'
            that.style.mainLine.showData.item2 = 'background-image: url("static/img/cursor/icon_con_default.png");width:56px;border-radius:0;height:26px;top:-13px'
          }
        } else {
          that.style.mainLine.showData.item1 = 'background-image: url("static/img/cursor/icon_default.png");width:26px;height:26px;top:-13px'
          that.style.mainLine.showData.item2 = 'background-image: url("static/img/cursor/icon_con_default.png");width:56px;border-radius:0;height:26px;top:-13px'
        }
        if (that.flag) {
          switch (that.flag) {
            case 1:
              that.flag = 1
              that.dataList = that.showData.slice(0,7)
              that.titleList = that.titleList1
              that.placeHolder = []
              that.dataList.forEach((val, index) => {
                if (val.length === 0) {
                  that.placeHolder.push(index)
                }
              })
              if (!that.dataList[0][0] || !that.dataList[0][0].name) that.placeHolder = [0]
              break  
            case 2:
              that.flag = 2
              that.dataList = that.showData.slice(7)
              that.titleList = that.titleList2
              that.placeHolder = []
              that.dataList.forEach((val, index) => {
                if (val.length === 0) {
                  that.placeHolder.push(index)
                }
              })
              break
            case 3:
              that.flag = 3
              that.dataList = that.related.slice(0,7)
              that.titleList = that.relatedTableList1
              that.placeHolder = []
              that.dataList.forEach((val, index) => {
                if (val.length === 0) {
                  that.placeHolder.push(index)
                }
              })
              break
            case 4:
              that.flag = 4
              that.dataList = that.related.slice(7)
              that.titleList = that.relatedTableList2
              that.placeHolder = []
              that.dataList.forEach((val, index) => {
                if (val.length === 0) {
                  that.placeHolder.push(index)
                }
              })
              break
          }
        }
      })
    },
    animate (obj, attrObj, dur, fun, callback) {
      var that = this
      clearInterval(obj.t)
      if (arguments.length === 2) {
          dur = 200
          fun = this.Tween.Linear
          callback = null
      }
      var time = 0
      var start = {}
      var change = {}
      for (var i in attrObj) {
        start[i] = that.setCss(obj,i)
        change[i] = attrObj[i] - start[i]
      }
      obj.t = setInterval (function () {
        if (time >= dur) {
          clearInterval(obj.t)
          for (var i in attrObj) {
            that.setCss(obj, i, attrObj[i])
          }
          if(callback) {
            callback.call(obj)
          }
        } else {
          for (var i in attrObj) {
            that.setCss(obj, i, fun (time, start[i], change[i], dur))
          }
          time += 60
        }
      }, 60)
    },
    setCss (obj, attr, val) {
      if (obj.nodeType !== 1) {
          return
        }
      //初始化参数
      var attr = attr.replace(/^\s*|\s*$/g,"")
      //获取值
      if (arguments.length === 2) {
        if (attr === 'scrollTop') {
          return obj[attr]
        }
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr]
      } else if (arguments.length === 3) {
        switch (attr) {
          case 'scrollTop':
            obj[attr] = val
            break
          default:
            obj.style[attr] = val
        }
      }
    }
  },
  beforeMount () {
    this.dataList = [[{name: ''}],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
    this.titleList = [{name: '关联B2B销售合同'}, {name: 'B2B应收订金'}, {name: 'B2B销售订单计划'}, {name: '仓储合同'}, {name: '物流合同'}, {name: '参与角色登记'}, {name: '应收融资计划'}]
    this.placeHolder = this.dataNav.twinkle || []
    this.flag = this.dataNav.flag
    this.showInfo = this.dataNav.showInfoState
    this.setIndex =this.dataNav.setIndex
  },
  mounted () {
    var that = this
    const op = {
      method: 'PATCH',
      url: '/api/cursor_list/',
      data: {token: that.$token(), chain_id: that.chainId}
    }
    that.$ajax(op).then(res => {
      // // console.log(res)
      if (res.data.payable_contracts.length !== 0) {
        var related = []
        res.data.payable_contracts[0].forEach((val, index) => {
          if (index <= 2 || index === 5 || index === 6 || index === 14) {
            res.data.payable_contracts[0][index] ? related[index] = [res.data.payable_contracts[0][index]] : related[index] = []
          } else {
            related[index] = val
          }
        })
      } else {
        related = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
      }
      that.related = related
      // // console.log('that.related')
      // // console.log(that.related)
      if (res.data.receivable_contracts.length !== 0) {
        var showData = []
        res.data.receivable_contracts[0].forEach((val, index) => {
          if (index <= 2 || index === 5 || index === 6 || index === 14) {
            res.data.receivable_contracts[0][index] ? showData[index] = [res.data.receivable_contracts[0][index]] : showData[index] = []
          } else {
            showData[index] = val
          }
        })
      } else {
        showData = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
      }
      that.showData = showData
      // // console.log('that.showData')
      // // console.log(that.showData)
      if (that.related[0].length > 0) {
        // that.style.mainLine.related.item1 = 'border-color: #0c8dff;background:#0c8dff;width:26px;height:26px;top:-13px'
        that.style.mainLine.related.item1 = 'background-image: url("static/img/cursor/icon4.png");width:26px;height:26px;top:-13px'
        that.style.mainLine.related.border1 = 'border-color: #0c8dff'
        if (that.isHavingContract(that.related, 7)) {
          that.style.mainLine.related.item2 = 'background-image: url("static/img/cursor/icon4.png");width:26px;height:26px;top:-13px'
          that.style.mainLine.related.border2 = 'border-color: #0c8dff'
        } else {
          that.style.mainLine.related.item2 = 'background-image: url("static/img/cursor/icon_default.png");width:26px;height:26px;top:-13px'
        }
      } else {
        that.style.mainLine.related.item1 = 'background-image: url("static/img/cursor/icon_default.png");width:26px;height:26px;top:-13px'
        that.style.mainLine.related.item2 = 'background-image: url("static/img/cursor/icon_default.png");width:26px;height:26px;top:-13px'
      }
      if (that.showData[0].length > 0) {
        // that.style.mainLine.showData.item1 = 'border-color: #ea6100;background:#ea6100;width:20px;height:20px;top:-10px'
        that.style.mainLine.showData.item1 = 'background-image: url("static/img/cursor/icon3.png");width:26px;height:26px;top:-13px'
        that.style.mainLine.showData.border1 = 'border-color: #ea6100'
        if (that.isHavingContract(that.showData, 7)) {
          that.style.mainLine.showData.item2 = 'background-image: url("static/img/cursor/icon_con1.png");width:56px;height:26px;border-radius:0;top:-13px'
          that.style.mainLine.showData.border2 = 'border-color: #ea6100'
        } else {
          // that.placeholder2 = true
          // that.holder = 'right: 30%'
          that.style.mainLine.showData.item2 = 'background-image: url("static/img/cursor/icon_con_default.png");width:56px;border-radius:0;height:26px;top:-13px'
        }
      } else {
        that.style.mainLine.showData.item1 = 'background-image: url("static/img/cursor/icon_default.png");width:26px;height:26px;top:-13px'
        that.style.mainLine.showData.item2 = 'background-image: url("static/img/cursor/icon_con_default.png");width:56px;border-radius:0;height:26px;top:-13px'
      }
      if (that.flag) {
        switch (that.flag) {
          case 1:
            that.flag = 1
            that.dataList = that.showData.slice(0,7)
            that.titleList = that.titleList1
            that.placeHolder = []
            that.dataList.forEach((val, index) => {
              if (val.length === 0) {
                that.placeHolder.push(index)
              }
            })
            if (that.dataList[0][0] === undefined) {
              that.dataList =[[{name:''}], [], [], [], [], [], []]
            }
            if (!that.dataList[0][0] || !that.dataList[0][0].name) that.placeHolder = [0]
            break  
          case 2:
            that.flag = 2
            that.dataList = that.showData.slice(7)
            that.titleList = that.titleList2
            that.placeHolder = []
            that.dataList.forEach((val, index) => {
              if (val.length === 0) {
                that.placeHolder.push(index)
              }
            })
            break
          case 3:
            that.flag = 3
            that.dataList = that.related.slice(0,7)
            that.titleList = that.relatedTableList1
            that.placeHolder = []
            that.dataList.forEach((val, index) => {
              if (val.length === 0) {
                that.placeHolder.push(index)
              }
            })
            break
          case 4:
            that.flag = 4
            that.dataList = that.related.slice(7)
            that.titleList = that.relatedTableList2
            that.placeHolder = []
            that.dataList.forEach((val, index) => {
              if (val.length === 0) {
                that.placeHolder.push(index)
              }
            })
            break
        }
      }
    })
  }
}
</script>
<style lang="less" scoped>
.tooltiptext {
  opacity: 0;
  transition: all 0.5s;
  // max-width: 230px;
  // min-width: 100px;
  background: #343536;
  line-height: 18px;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  padding: 5px 5px 5px 24px;
  white-space: nowrap;
  position: absolute;
  font-size: 14px;
  z-index: 1;
  left: 50%;
  transform: translate(-50%);
  img {
    position: absolute;
    left: 4px;
    width: 16px;
    vertical-align: middle;
  }
}
.wrap {
  #info,#detail {
    width: 100%;
  }
  .lineColorBlue {
    background: #0c8dff
  }
  .lineColorOrange {
    background: #EA6100
  }
  .font_size_f {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    display: block;
    height: 38px;
  }
  .inner {
    width: 80%;
    // margin-top: 30px;
    // border: 1px solid #EAEAEA;
    margin-left: auto;
    margin-right: auto;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .inline_box {
      width: 20%;
      position: relative;
      height: 0px;
      float: left;
      top: 50%;
      border: 1.2px dashed #eaeaea;
      left: 10%;
      .inline_item_text {
				width: 75%;
        position: relative;
        line-height: 27px;
				bottom: -10px;
				margin-left: auto;
				margin-right: auto;
				text-align: center;
				color: #666; 
        cursor: pointer;
        span {
          // font-weight: bold;
          // font-size: 14px;
          font-family: 'Microsoft YaHei';
          font-weight: 700;
          font-size: 18px
        }
      }
      .inline_item {
				position: absolute;
				width: 16px;
				height: 16px;
        border-radius: 100%;
        -moz-border-radius: 100%;
        -webkit-border-radius: 100%;
				// border: 1px solid #eaeaea;
				background: #FFFFFF;
				top: -9px;
				text-align: center;
				z-index: 1;
				display: flex;
				background-size: 100%;
        background-position: center;
        cursor: pointer;
        .inline_item_num {
          font-size: 14px;
          color: #EA6100;
          margin: auto;
          margin-top: -2px;	
        }
      }
      .placeholder{
				position: absolute;
				width: 26px;
				height: 26px;
				bottom: 20px;
				right: -5px;
				background-image: url(/static/img/cursor/icon_con.png);
				// background-size: 80%;
				background-repeat: no-repeat ;
				background-position: center;
      }
      // &:first-child,&:nth-child(2) {
      //   border-color: #EA6100;
      // }
      // &:nth-child(3),&:nth-child(4) {
      //   border-color: #0c8dff;
      // }
      &:first-child .inline_item:nth-of-type(1) {
        left: -7px;
      }
      &:first-child .inline_item {
				right: -7px;
      }
      &:nth-child(2) .inline_item {
				right: -7px;
      }
      &:nth-child(3) .inline_item {
        right: -7px;
        // border-color: #0c8dff;
      }
      &:nth-child(4) .inline_item {
        right: -7px;
        // border-color: #0c8dff;
			}
    }
    .inline_box_detail {
      // width: 9%;
      position: relative;
      height: 0px;
      float: left;
      top: 50%;
      border: 1.2px dashed #eaeaea;
      left: 3%;
      .inline_item_text {
				width: 60px;
				position: absolute;
				bottom: -60px;
				text-align: center;
				font-size: 12px;
        color: #999;
        right: 0;
        transform: translateX(50%);	
        cursor: pointer;
        span {
          font-weight: 700;
          display: block;
          height: 38px;
        }			
      }
      .active {
        color: #EA6100
      }
      .active_b {
        color: #0c8dff
      }
      .inline_item {
				position: absolute;
				width: 16px;
				height: 16px;
        border-radius: 100%;
        -moz-border-radius: 100%;
        -webkit-border-radius: 100%;
				// border: 1px solid #EA6100;
				background: #FFFFFF;
				top: -8px;
				text-align: center;
				z-index: 1;
				display: flex;
				// background-image: url('../../../static/img/auditing.png');
				background-size: 100%;
        background-position: center;
        cursor: pointer;
        .inline_item_num {
          font-size: 13px;
          color: #EA6100;
          margin: auto;
          margin-top: -2px;	
        }
        .tooltiptext_top {
          .tooltiptext;
			    bottom: 180%;
        }
        .tooltiptext_bottom {
          .tooltiptext;
			    top: 180%;
        }
        .tooltiptext_top::after {
			    content: "";
			    position: absolute;
			    top: 100%;
			    left: 50%;
			    margin-left: -5px;
			    border-width: 5px;
			    border-style: solid;
			    border-color: #343536 transparent transparent transparent;
        }
        .tooltiptext_bottom::after {
			    content: "";
			    position: absolute;
			    bottom: 100%;
			    left: 50%;
			    margin-left: -5px;
			    border-width: 5px;
			    border-style: solid;
			    border-color:transparent transparent  #343536 transparent;
        }
        &:hover .tooltiptext_top {
			    opacity: .85;
  				transition: all 0.5s;
        }
        &:hover .tooltiptext_bottom {
			    opacity: .85;
  				transition: all 0.5s;
			  }
      }
      .twinkle {
        position: absolute;
				width: 50px;
				height: 50px;
				// border: 1px solid #EA6100;
        background: red;
        border-radius: 100%;
        -moz-border-radius: 100%;
        -webkit-border-radius: 100%;
				top: -25px;
				text-align: center;
        z-index: 1;
        right: -25px;
        display: flex;
        animation: twinkle 1s ease-in-out 0s infinite;
        -moz-animation: twinkle 1s ease-in-out 0s infinite;
        -webkit-animation: twinkle 1s ease-in-out 0s infinite;
        // background-size: 25%;
        // background-repeat: no-repeat; 
        // background-position: center;
      }
      @keyframes twinkle
      {
        0%{
          // background-image: url(../../../static/img/twinkle2.png);
          transform: scale(.5);
          -moz-transform: scale(.5);
          -webkit-transform: scale(.5);
        }
        100%{
          // background-image: url(../../../static/img/twinkle1.png);
          transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          opacity: 0;
        }
      }
      @-webkit-keyframes twinkle
      {
        0%{
          // background-image: url(../../../static/img/twinkle2.png);
          transform: scale(.5);
          -moz-transform: scale(.5);
          -webkit-transform: scale(.5);
        }
        100%{
          // background-image: url(../../../static/img/twinkle1.png);
          transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          opacity: 0;
        }
      }
      .placeholder {
				position: absolute;
				width: 32px;
				height: 28px;
				bottom: 75px;
				right: 7px;
				background-image: url(/static/img/cursor/fly2.png);
				// background-size: 70%;
				background-repeat: no-repeat ;
				background-position: center;
      }
      .placeholder1 {
				position: absolute;
				width: 32px;
				height: 28px;
				bottom: 75px;
				right: 7px;
				background-image: url(/static/img/cursor/fly1.png);
				// background-size: 70%;
				background-repeat: no-repeat ;
				background-position: center;
      }
      .placeholder01 {
				position: absolute;
				width: 32px;
				height: 28px;
				bottom: 75px;
				right: 7px;
				background-image: url(/static/img/cursor/fly22.png);
				// background-size: 70%;
				background-repeat: no-repeat ;
				background-position: center;
      }
      .placeholder11 {
				position: absolute;
				width: 32px;
				height: 28px;
				bottom: 75px;
				right: 7px;
				background-image: url(/static/img/cursor/fly11.png);
				// background-size: 70%;
				background-repeat: no-repeat ;
				background-position: center;
      }
      .placeholderConnection {
				position: absolute;
				width: 32px;
				height: 28px;
				bottom: 75px;
				right: 7px;
				background-image: url(/static/img/cursor/icon_con.png);
				// background-size: 70%;
				background-repeat: no-repeat ;
				background-position: center;
      }
      &:first-child .inline_item:nth-of-type(1) {
				left: -9px;
      }
      &:first-child .inline_item {
				right: -9px;
      }
      &:nth-child(n+2) .inline_item {
				right: -9px;
      }
    }
  }
}
</style>

