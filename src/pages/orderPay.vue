<template>
  <div class="pay-wrapper">
    <order-header title="支付订单">
        <template v-slot:tip>
         <span>
            请谨防钓鱼链接或诈骗电话，了解更多>
         </span>
        </template> 
    </order-header>
    <div class="pay-container w">
      <div class="order-wrap clearfix">
        <div class="item-order">
          <div class="icon-succ"><i></i></div>
          <div class="order-info">
            <h2>订单提交成功！去付款咯～</h2>
            <p>请在<span class="theme-color">30分</span>内完成支付, 超时后将取消订单</p>
            <p>收货信息：{{addressInfo}}</p>
          </div>
          <div class="order-total">
            <p>应付总额：<span>{{payment}}</span>元</p>
            <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail = !showDetail"></em></p>
          </div>
        </div>
        <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{receiverName}} {{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
               <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    {{item.productName}}
                  </li>
                </ul>
               </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked': payType==1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'checked': payType==2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay" @close="closePayModel" :img="payImg"></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      v-bind:showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      modalType="middle"
      @submit="goOrderList"
      @cancel="showPayModal=false"
    >
      <template v-slot:body>
         <p>
            是否完成了支付？
         </p>   
      </template>
    </modal>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import OrderHeader from './../components/OrderHeader'
import ScanPayCode from './../components/ScanPayCode'
import Modal from './../components/Modal'
export default {
    name: 'order-pay',
    data() {
      return {
        orderId: this.$route.query.orderNo, // 订单号
        addressInfo:'' , // 地址信息
        receiverName:'', //收件人
        orderDetail:[], // 订单商品信息
        showDetail:false, // 订单详情
        payType:'', // 支付类型
        showPay:false, // 是否显示微信支付弹框
        payImg:'', //微信支付的二维码地址
        showPayModal:false,//是否显示确认支付的模态框
        T:'', // 定时器id
        payment:0,
      }
    },
    components:{
      OrderHeader,
      ScanPayCode,
      Modal
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      getOrderDetail(){
        this.axios.get(`/api/orders/${this.orderId}`).then((res)=>{
          let item = res.shippingVo // 地址信息
          this.addressInfo = `${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict}${item.receiverAddress}`
          this.receiverName = `${item.receiverName}`
          this.orderDetail = res.orderItemVoList
          this.payment = res.payment
       })
      },
      paySubmit(payType){
        if(payType == 1){
          //alipay需要orderId
          window.open('/#/order/alipay?orderId=' + this.orderId, '_blank') //hash路由，而不是history
        }else if(payType == 2){
          this.axios.post('/api/pay', {
            orderId:this.orderId,
            orderName:'个人项目-vue模仿小米商城',
            amount: 0.01,
            payType: 2,
          }).then((res)=>{
          QRCode.toDataURL(res.content)
            .then(url => {    // base64
              this.showPay = true
              this.payImg = url
              this.loopOrderState()
            })
            .catch(() => {
              this.$message.error('微信支付二维码生成失败，请稍后再试')
            })
          })
        }
      },
      // 关闭微信支付弹框
      closePayModel(){
       this.showPay = false
       this.showPayModal = true
      },
      // 轮询当前订单支付状态
      loopOrderState(){
        this.T = setInterval(()=>{
          this.axios.get(`/api/orders/${this.orderId}`).then((res)=>{
            if(res.status == 20){
              clearInterval(this.T)
              this.goOrderList()
            }
          })
        },1000)
      },
      goOrderList(){
        this.$router.push('/order/list')
      }
    },
}
</script>

<style lang="scss">
@import './../assets/css/mixin.scss';
.pay-wrapper{
  width: 100%;
  background-color: #f5f5f5;
  .pay-container{
    .item-order{
       background-color: #fff;
       margin-top: 32px;
       height: 230px;
       width: 100%;
       .icon-succ{
         display: inline-block;
         width: 90px;
         height: 90px;
         border-radius: 50%;
         text-align: center;
         margin: 62px 20px 78px 53px;
         i{
            @include bgImg(64px, 48px, '/img/icon-gou.png');
            display: inline-block;
            margin-top: 25px;
         }
         background-color:#83c44e;
       }
       .order-info{
         display: inline-block;
         h2{
           font-size:24px;
           color: #333;
           margin-bottom: 20px;
         }
         p{
           color: #616161;
            margin-bottom: 5px;
            line-height: 2;
         }
       }
       .order-total{
         display: inline-block;
         margin-left:330px;
         margin-right: 51px;
         text-align: right;
         p{
           font-size: 14px;
           color: #666;
           line-height: 24px;
           margin-bottom: 30px;
           span{
              color: #ff6700;
              font-size: 28px;
           }
           .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/img/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
          }
        }
    }
    .item-detail{
      border-top: 1px solid #D7D7D7;
      background-color: #fff;
      padding-top: 47px;
      padding-left: 130px;
      padding-bottom:53px;
      font-size: 14px;
      .item{
        margin-bottom:19px;
        .detail-title{
          float:left;
          width:100px;
        }
        .detail-info{
          display:inline-block;
          img{
            width: 30px;
            vertical-align: middle;
          }

          li{
            line-height: 2;
          }
        }
      }
    }
    .item-pay{
      margin-top: 30px;
      margin-bottom: 130px;
      padding:26px 50px 72px;
      background-color:#ffffff;
      color: #333333;
      h3{
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #D7D7D7;
        margin-bottom: 26px;
      }
      .pay-way{
        font-size:18px;
        .pay{
          display:inline-block;
          width:188px;
          height:64px;
          border:1px solid #D7D7D7;
          cursor:pointer;
          &:last-child{
            margin-left:20px;
          }
          &.checked{
            border:1px solid #FF6700;
          }
        }
        .pay-ali{
          background:url('/imgs/pay/icon-ali.png') no-repeat center;
          background-size:103px 38px;
          margin-top:19px;
        }
        .pay-wechat{
          background:url('/imgs/pay/icon-wechat.png') no-repeat center;
          background-size:103px 38px;
        }
      }
    }
  }
}
</style>