// <template>
//   <div class="bigdata-analyse">
//     <div class="bigdata-wraper">
//       <div class="bigdata">
//         <div class="bigdata-containers">
//           <div class="card-group" :class="convertCss(bigData.payable_contract_data)" v-if="bigData.payable_contract_data.length >= 1">
//             <div class="dashed-line2"></div>
//             <div class="card-item" v-for="(item, index) in bigData.payable_contract_data" :key="index">
//               <div class="card-partner">
//                 <div class="card-sublines">
//                   <div class="card-sublines__top"></div>
//                   <div class="symbol-default"></div>
//                 </div>
//                 <div class="auth">
//                   <div class="auth-pic">
//                     <img src="static/img/bg-data/part_s.png" alt="">
//                   </div>
//                   <div class="auth-content">
//                     <span>{{item.company_name}}</span>
//                   </div>
//                 </div>
//                 <span class="card-sublines-inline"></span>
//               </div>
//               <div class="card-wraper float_left">
//                 <div class="card-item-company_name">
//                   <p>合同：<span>{{ item.contract_name }}</span></p>
//                 </div>
//                 <div class="company-card">
//                   <div class="card-content">
//                     <div class="card-content__row text-blue">
//                       <label for="">应收(万元)：</label>
//                       <span :title="'应收(万元)：' + convertData(item.receivable_sum)">{{convertData(item.receivable_sum)}}</span>
//                     </div>
//                     <div class="card-content__row text-orange">
//                       <label for="">已收(万元)：</label>
//                       <span :title="'已收(万元)：' + convertData(item.received_sum)">{{convertData(item.received_sum)}}</span>
//                     </div>
//                     <div class="card-content__row text-block">
//                       <label for="">订金(万元)：</label>
//                       <span :title="'订金(万元)：' + convertData(item.deposit_sum)">{{convertData(item.deposit_sum)}}</span>
//                     </div>
//                   </div>
//                   <div class="card-flag-wrap">
//                     <div class="card-flag">
//                       <img src="static/img/bg-data/receive_s.png" alt="">
//                       <span class="icon-desc">收入</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="dashed-line3"></div>
//           </div>
//           <div class="card-group" v-if="bigData.payable_contract_data.length === 0">
//             <div class="card-item">
//               <div class="card-partner">
//                 <div class="card-sublines">
//                   <div class="card-sublines__top"></div>
//                   <div class="symbol-default"></div>
//                 </div>
//                 <div class="auth">
//                   <div class="auth-pic">
//                     <img src="static/img/bg-data/part_s.png" alt="">
//                   </div>
//                   <div class="auth-content">
//                     <span></span>
//                   </div>
//                 </div>
//                 <span class="card-sublines-inline"></span>
//               </div>
//               <div class="card-wraper float_left height-eight">
//                 <div class="company-card">
//                   <div class="card-content">
//                     <div class="card-content__row text-blue">
//                       <label for="">应收(万元)：</label>
//                       <span>0.00</span>
//                     </div>
//                     <div class="card-content__row text-orange">
//                       <label for="">已收(万元)：</label>
//                       <span>0.00</span>
//                     </div>
//                     <div class="card-content__row text-block">
//                       <label for="">订金(万元)：</label>
//                       <span>0.00</span>
//                     </div>
//                   </div>
//                   <div class="card-flag-wrap">
//                     <div class="card-flag">
//                       <img src="static/img/bg-data/receive_s.png" alt="">
//                       <span class="icon-desc">收入</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="bigdata-containers minWidth">
//           <div class="card-view">
//             <div class="box-top">
//               <div class="card-wraper shdaw-blue">
//                 <div class="company-card">
//                   <div class="card-content">
//                     <div class="card-content__row text-blue">
//                       <label for="">应付(万元)：</label>
//                       <span :title="'应付(万元)：' + convertData(bigData.payable_info.payable_sum)">{{convertData(bigData.payable_info.payable_sum)}}</span>
//                     </div>
//                     <div class="card-content__row text-orange">
//                       <label for="">已付(万元)：</label>
//                       <span :title="'已付(万元)：' + convertData(bigData.payable_info.paid_sum)">{{convertData(bigData.payable_info.paid_sum)}}</span>
//                     </div>
//                     <div class="card-content__row text-block">
//                       <label for="">订金(万元)：</label>
//                       <span :title="'订金(万元)：' + convertData(bigData.payable_info.p_deposit)">{{convertData(bigData.payable_info.p_deposit)}}</span>
//                     </div>
//                   </div>
//                   <div class="card-flag-wrap">
//                     <div class="card-flag">
//                       <img src="static/img/bg-data/payment_s.png" alt="">
//                       <span class="icon-desc">支付</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="box-mid">
//               <div class="auth-wraper">
//                 <div class="auth-pic">
//                   <img src="static/img/bg-data/self_s.png" alt="">
//                 </div>
//                 <div class="auth-content">
//                   <span>{{bigData.company_name}}</span>
//                 </div>
//               </div>
//               <div class="supline">
//                 <span class="supline__top"></span>
//                 <span class="supline__bot"></span>
//                 <span class="supline__left"></span>
//                 <span class="supline__right"></span>
//               </div>
//               <div class="symbol-blue"></div>
//               <div class="symbol-orange"></div>
//             </div>
//             <div class="box-bot">
//               <div class="card-wraper shdaw-orange">
//                 <div class="company-card">
//                   <div class="card-content">
//                     <div class="card-content__row text-blue">
//                       <label for="">应收(万元)：</label>
//                       <span :title="'应收(万元)：' + convertData(bigData.receive_info.receivable_sum)">{{convertData(bigData.receive_info.receivable_sum)}}</span>
//                     </div>
//                     <div class="card-content__row text-orange">
//                       <label for="">已收(万元)：</label>
//                       <span :title="'已收(万元)：' + convertData(bigData.receive_info.received_sum)">{{convertData(bigData.receive_info.received_sum)}}</span>
//                     </div>
//                     <div class="card-content__row text-block">
//                       <label for="">订金(万元)：</label>
//                       <span :title="'订金(万元)：' + convertData(bigData.receive_info.r_deposit)">{{convertData(bigData.receive_info.r_deposit)}}</span>
//                     </div>
//                   </div>
//                   <div class="card-flag-wrap">
//                     <div class="card-flag">
//                       <img src="static/img/bg-data/receive_s.png" alt="">
//                       <span class="icon-desc">收入</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="bigdata-containers">
//           <div class="card-group" :class="convertCss1(bigData.receive_contract_data)" v-if="bigData.receive_contract_data.length >= 1">
//             <div class="dashed-line"></div>
//             <div class="card-item" v-for="(item, index) in bigData.receive_contract_data" :key="index">
//               <div class="card-partner">
//                 <div class="card-sublines_floatRight">
//                   <div class="card-sublines__top"></div>
//                   <div class="symbol-default"></div>
//                 </div>
//                 <div class="auth_floatRight">
//                   <div class="auth-pic">
//                     <img src="static/img/bg-data/cooper_s.png" alt="">
//                   </div>
//                   <div class="auth-content">
//                     <span>{{item.company_name}}</span>
//                   </div>
//                 </div>
//                 <span class="card-sublines-inline_floatRight"></span>
//               </div>
//               <div class="card-wraper float_right">
//                 <div class="card-item-company_name">
//                   <p>合同：<span>{{ item.contract_name }}</span></p>
//                 </div>
//                 <div class="company-card">
//                   <div class="card-content">
//                     <div class="card-content__row text-blue">
//                       <label for="">应付(万元)：</label>
//                       <span :title="'应付(万元)：' + convertData(item.receivable_sum)">{{convertData(item.receivable_sum)}}</span>
//                     </div>
//                     <div class="card-content__row text-orange">
//                       <label for="">已付(万元)：</label>
//                       <span :title="'已付(万元)：' + convertData(item.received_sum)">{{convertData(item.received_sum)}}</span>
//                     </div>
//                     <div class="card-content__row text-block">
//                       <label for="">订金(万元)：</label>
//                       <span :title="'订金(万元)：' + convertData(item.r_deposit)">{{convertData(item.r_deposit)}}</span>
//                     </div>
//                   </div>
//                   <div class="card-flag-wrap">
//                     <div class="card-flag">
//                       <img src="static/img/bg-data/payment_s.png" alt="">
//                       <span class="icon-desc">支付</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="dashed-line1"></div>
//           </div>
//           <div class="card-group" v-if="bigData.receive_contract_data.length === 0">
//             <div class="card-item">
//               <div class="card-partner">
//                 <div class="card-sublines_floatRight">
//                   <div class="card-sublines__top"></div>
//                   <div class="symbol-default"></div>
//                 </div>
//                 <div class="auth_floatRight">
//                   <div class="auth-pic">
//                     <img src="static/img/bg-data/cooper_s.png" alt="">
//                   </div>
//                   <div class="auth-content">
//                     <span></span>
//                   </div>
//                 </div>
//                 <span class="card-sublines-inline_floatRight"></span>
//               </div>
//               <div class="card-wraper float_right height-eight">
//                 <div class="company-card">
//                   <div class="card-content">
//                     <div class="card-content__row text-blue">
//                       <label for="">应付(万元)：</label>
//                       <span>0.00</span>
//                     </div>
//                     <div class="card-content__row text-orange">
//                       <label for="">已付(万元)：</label>
//                       <span>0.00</span>
//                     </div>
//                     <div class="card-content__row text-block">
//                       <label for="">订金(万元)：</label>
//                       <span>0.00</span>
//                     </div>
//                   </div>
//                   <div class="card-flag-wrap">
//                     <div class="card-flag">
//                       <img src="static/img/bg-data/payment_s.png" alt="">
//                       <span class="icon-desc">支付</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </template>

// <script>
//   export default {
//     name: 'data-analyse',
//     data () {
//       return {
//         chainId: ''
//       }
//     },
//     props: ['bigData'],
//     mounted () {
//     },
//     methods: { 
//       convertData(data) {
//         var num = Number(data)
//         num = num * Math.pow(10, -4)
//         return this.toThousands(num)
//       },
//       convertCss (list) {
//         let _css = ''
//         if (list.length === 0 || list.length === 1) {
//           _css = ''
//         } else {
//           _css = 'hideline-one'
//         }
//         return _css
//       },
//       convertCss1 (list) {
//         let _css1 = ''
//         if (list.length === 0 || list.length === 1) {
//           _css1 = ''
//         } else {
//           _css1 = 'hideline-one1'
//         }
//         return _css1
//       }
//     }
//   }
// </script>
// <style lang='less' scope>
//   @card-box-width: 220px;
//   @card-box-height: 100px;
//   @card-text_blue: #0C8DFF;
//   @card-text_orange: #EB6100;
//   @card-text_nomal: #666;
//   @card-text_block: #333;
//   @card-text_disable: #999999;
//   @card-box-shadow_orange: 0px 0px 7px 0px rgba(235,97,0,0.2);
//   @card-box-shadow_blue: 0px 0px 7px 0px rgba(12,141,255,0.2);
//   .bigdata-analyse {
//     .card-wraper {
//       width: @card-box-width;
//       height: @card-box-height;
//       background: rgba(255,255,255,1);
//       border: 1px solid rgba(240,248,255,1);
//       border-radius: 4px;
//       .company-card {
//         display: flex;
//       }
//       padding: 3px 10px;
//       margin: 0 auto;
//       &.shdaw-blue {
//         box-shadow: @card-box-shadow_blue
//       }
//       &.shdaw-orange {
//         box-shadow: @card-box-shadow_orange
//       }
//       .card-content {
//         font-size: 12px;
//         .card-content__row {
//           margin: 5px 0;
//           width: 130px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           &.text-block {
//             color: @card-text_block
//           }
//           &.text-blue {
//             color: @card-text_blue
//           }
//           &.text-orange {
//             color: @card-text_orange
//           }
//           &.text-disabled {
//             color: @card-text_disable
//           }
//           span {
//             cursor: pointer;
//           }
//         }
//       }
//       .card-flag-wrap {
//         margin: 0 auto;
//         .card-flag {
//           position: relative;
//           top: 50%;
//           transform: translateY(-50%);
//           .icon-desc {
//             display: block;
//             font-size: 14px;
//             text-align: center;
//           }
//         }
//       }
//     }
//     .height-eight {
//       height: 80px;
//     }
//     .bigdata-wraper {
//       width: 100%;
//       height: 100%;
//       background: #fff;
//       overflow: hidden;
//       .bigdata {
//         display: flex;
//         justify-content: center;
//         margin: 25px 0px;
//         .bigdata-containers {
//           position: relative;
//           &.minWidth {
//             width: 350px;
//             position: relative;
//             .card-wraper {
//               height: 80px;
//             }
//           }
//           width: 400px;
//           .card-view {
//             position: relative;
//             top: 50%;
//             transform: translateY(-50%);
//             .box-mid {
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               height: 290px;
//               position: relative;
//               .auth-wraper {
//                 .auth-pic {
//                   margin: 0 auto;
//                   width:60px;
//                   height:60px;
//                   background: rgba(255,255,255,1);
//                   border: 1px solid rgba(238,238,238,1);
//                   border-radius: 50%;
//                   text-align: center;
//                   img {
//                     margin-top: 7.5px;
//                   }
//                 }
//                 .auth-content {
//                   margin-top: 8px;
//                   color: @card-text_nomal
//                 }
//               }
//               .supline {
//                 position: absolute;
//                 .supline__top {
//                   position: absolute;
//                   display: block;
//                   height: 90px;
//                   margin-top: -136px; 
//                   border: .5px dashed #0C8DFF;
//                 }
//                 .supline__left {
//                   position: absolute;
//                   display: block;
//                   width: 94px;
//                   margin-left: -176px;
//                   border: .5px dashed #0C8DFF;
//                   height: 0;
//                   &::after {
//                     content: "";
//                     position: absolute;
//                     right: -10px;
//                     top: -5px;
//                     display: block;
//                     border-width: 5px;
//                     border-style: solid;
//                     border-color: transparent transparent transparent #0C8DFF;
//                   }
//                   &::before {
//                     content: "";
//                     position: absolute;
//                     left: -6.5px;
//                     top: 50%;
//                     margin-top: -5.5px;
//                     width: 11px;
//                     height: 11px;
//                     background: #0c8dff;
//                     border: 1px solid #0c8dff;
//                     border-radius: 50%;
//                   }
//                 }
//                 .supline__bot {
//                   position: absolute;
//                   display: block;
//                   height: 90px;
//                   margin-bottom: -140px;
//                   bottom: 0;
//                   border: 0.5px dashed rgba(235,97,0,1);;
//                 }
//                 .supline__right {
//                   position: absolute;
//                   display: block;
//                   width: 94px;
//                   margin-left: 76px;
//                   border: 0.5px dashed rgba(235,97,0,1);
//                   &::before {
//                     content: "";
//                     position: absolute;
//                     left: -10px;
//                     top: -5px;
//                     display: block;
//                     border-width: 5px;
//                     border-style: solid;
//                     border-color: transparent rgba(235,97,0,1) transparent transparent;
//                   }
//                   &::after {
//                     content: "";
//                     position: absolute;
//                     left: 94px;
//                     top: 50%;
//                     right: 0;
//                     margin-top: -5.5px;
//                     width: 11px;
//                     height: 11px;
//                     background:rgba(235,97,0,1);
//                     border:1px solid rgba(235,97,0,1);
//                     border-radius: 50%;
//                   }
//                 }
//               }
//             }
//           }
//           .card-group {
//             overflow: hidden;
//             position: relative;
//             top: 50%;
//             transform: translateY(-50%);
//             .card-item {
//               position: relative; 
//               padding: 12px 0;
//               margin: 20px 2px 20px 0;
//               &.verticalAligh {
//                 transform: translateY(62%);
//               }
//               &>.card-wraper {
//                 // padding-top: 32px;
//                 &.float_left {
//                   margin-left: 15px;
//                 }
//                 &.float_right {
//                   margin-right: 15px;
//                 }
//                 position: relative;
//                 box-shadow: @card-box-shadow_blue;
//               }
//               .card-partner {
//                 .card-sublines {
//                   position: absolute;
//                   top: 50%;
//                   right: 131px;
//                   .card-sublines__top {
//                     width: 30px;
//                     height: 1px;
//                     margin: 0 2px 0 0;
//                     border-top: 1px dashed rgba(153,153,153,1); 
//                     border-right: 1px dashed rgba(153,153,153,1); 
//                   }
//                   .symbol-default {
//                     position: absolute;
//                     top: 0;
//                     margin-top: -5.5px;
//                     right: -4.5px;
//                     width: 11px;
//                     height: 11px;
//                     border:1px solid #999999;
//                     background: #fff;
//                     border-radius:50%;
//                   }
//                 }
//                 .card-sublines_floatRight {
//                   position: absolute;
//                   top: 50%;
//                   left: 131px;
//                   .card-sublines__top {
//                     width: 30px;
//                     height: 1px;
//                     margin: 0 2px 0 0;
//                     border-top: 1px dashed rgba(153,153,153,1); 
//                     border-right: 1px dashed rgba(153,153,153,1); 
//                   }
//                   .symbol-default {
//                     position: absolute;
//                     top: 0;
//                     margin-top: -5.5px;
//                     left: -4.5px;
//                     width: 11px;
//                     height: 11px;
//                     border:1px solid #999999;
//                     background: #fff;
//                     border-radius:50%;
//                     z-index: 2
//                   }
//                 }
//                 .card-sublines-inline {
//                   position: absolute;
//                   height: 0;
//                   border: 0.5px dashed rgba(12,141,255,1);
//                   width: 126px;
//                   right: 0;
//                   top: 50%;
//                   &::before {
//                     content: "";
//                     position: absolute;
//                     left: 14px;
//                     top: -5px;
//                     display: block;
//                     border-width: 5px;
//                     border-style: solid;
//                     border-color: transparent transparent transparent rgba(12,141,255,1);
//                   }
//                 }
//                 .card-sublines-inline_floatRight {
//                   position: absolute;
//                   height: 0;
//                   border: 0.5px dashed rgba(235,97,0,1);
//                   width: 126px;
//                   left: 0;
//                   top: 50%;
//                   &::before {
//                     content: "";
//                     position: absolute;
//                     right: 14px;
//                     top: -5px;
//                     display: block;
//                     border-width: 5px;
//                     border-style: solid;
//                     border-color: transparent rgba(235,97,0,1) transparent transparent ;
//                   }
//                 }
//                 .auth {
//                   position: absolute;
//                   z-index: 1;
//                   right: 15px;
//                   top: 21px;
//                   .auth-pic {
//                     width: 60px;
//                     height: 60px;
//                     background:rgba(255,255,255,1);
//                     border:1px solid rgba(238,238,238,1);
//                     border-radius:50%;
//                     text-align: center;
//                     margin: 0 auto;
//                     img {
//                       margin-top: 7.5px;
//                     }
//                   }
//                   .auth-content {
//                     font-size: 14px;
//                     color: #666;
//                     text-align: center;
//                     width: 96px;
//                   }
//                 }
//                 .auth_floatRight {
//                   position: absolute;
//                   z-index: 1;
//                   left: 15px;
//                   top: 21px;
//                   .auth-pic {
//                     width: 60px;
//                     height: 60px;
//                     background:rgba(255,255,255,1);
//                     border:1px solid rgba(238,238,238,1);
//                     border-radius:50%;
//                     text-align: center;
//                     margin: 0 auto;
//                     img {
//                       margin-top: 7.5px;
//                     }
//                   }
//                   .auth-content {
//                     font-size: 14px;
//                     color: #666;
//                     text-align: center;
//                     width: 96px;
//                   }
//                 }
//               }
//               .card-item-company_name {
//                 width: 220px;
//                 white-space: nowrap;
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 font-size: 14px;
//                 span {
//                   color: #666;
//                 }
//               }
//             }
//           }
//           .dashed-line {
//             position: absolute;
//             width: 2px;
//             left: 0;
//             top: 82px;
//             border-left: 1px dashed #EB6100;
//             height: 100%;
//             z-index: 9 !important;
//           }
//           .dashed-line1 {
//             position: absolute;
//             width: 2px;
//             left: -1px;
//             bottom: 0;
//             background: #fff;
//             height: 81px;
//             z-index: 9 !important;
//           }
//           .dashed-line2 {
//             position: absolute;
//             width: 2px;
//             right: 0;
//             height: 82px;
//             top: 82px;
//             border-left: 1px dashed #0C8DFF;
//             height: 100%;
//             z-index: 9 !important;
//           }
//           .dashed-line3 {
//             position: absolute;
//             width: 2px;
//             right: 0;
//             bottom: 0;
//             background: #fff;
//             height: 81px;
//             z-index: 9 !important;
//           }
//         }
//       }
//     }
//   }
// </style>