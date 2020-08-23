<template>
  <div class="cart-w">     
      <order-header title="我的购物车">
        <template v-slot:tip>
           <span>
             温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算
           </span>
        </template>
      </order-header>
      <div class="cart-wrapper">
        <div class="cart-container w">
          <div class="cart-box">
            <ul class="cart-item-head">
              <li class="col-1"><span class="checkbox" :class="{'checked':allChecked}" @click="toggleCheck"></span>全选</li>
              <li class="col-3">商品名称</li>
              <li class="col-1">单价</li>
              <li class="col-2">数量</li>
              <li class="col-1">小计</li>
              <li class="col-1">操作</li>
            </ul>
            <ul class="cart-item-list">
              <li class="cart-item" v-for="(item, index) in list" :key="index">
                <div class="item-check">
                  <span class="checkbox" :class="{'checked': item.productSelected}" @click="updateCart(item)"></span>
                </div>
                <div class="item-name">
                  <img v-lazy="item.productMainImage" alt="">
                  <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                </div>
                <div class="item-price">{{item.productPrice}}</div>
                <div class="item-num">
                  <div class="num-box">
                    <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                    <span>{{item.quantity}}</span>
                    <a href="javascript:;"  @click="updateCart(item, '+')">+</a>
                  </div>
                </div>
                <div class="item-total">{{item.productTotalPrice}}元</div>
                <div class="item-del" @click="showModal=true"></div>
                <modal title="友情提示"
                  sureText="确认"
                  cancelText="取消" 
                  btnType="3"
                  modalType="middle" 
                  v-bind:showModal='showModal'
                  @submit="deleteProduct(item)"
                  @cancel="showModal=false"
                >
                 <template v-slot:body>
                  <p>确认删除{{item.productName}}</p>
                 </template>
                </modal>
              </li>
            </ul>
          </div>
          <div class="order-wrap">
            <div class="cart-tip fl">
              <a href="/#/index">继续购物</a>
              共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
            </div>
            <div class="total fr">
              合计：<span>{{cartTotalPrice}}</span>元
              <a href="javascript:;" class="btn" @click="order">去结算</a>
            </div>
          </div>
        </div>
      </div>
      <service-bar></service-bar>
      <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
import Modal from './../components/Modal'
import {Message} from 'element-ui'
export default {
    name: 'cart',
    components:{
       OrderHeader,
       ServiceBar,
       NavFooter,
       Modal
    },
    data() {
      return {
        list: [],           // 商品列表
        allChecked: false,  // 是否全选
        cartTotalPrice:0,   // 商品总金额
        checkedNum: 0,      // 选中数量
        showModal:false,
      }
    },
    mounted() {
      this.getCartList()
    },
    methods: {
      getCartList(){
        this.axios.get('/api/carts').then((res) => {
          this.renderCartList(res)
        })
      },
      updateCart(item, type){
        let quantity = item.quantity,
            selected = item.productSelected
        if(type == '-'){
          if(quantity == 1){
            Message.warning('商品数量不能小于1')
            return
          }
          --quantity
        }else if(type == '+'){
          if(quantity > item.productStock){
            Message.warning('商品超过上限')
            return
          }
          ++quantity
        }else{
          selected = !item.productSelected
        }
        this.axios.put(`/api/carts/${item.productId}`, {
          quantity,
          selected
        }).then((res)=>{
          this.renderCartList(res)
        })
      },
      deleteProduct(item){
        let productId = item.productId
        this.axios.delete(`/api/carts/${item.productId}`, {
          productId
        }).then((res)=>{
          this.showModal = false
          this.renderCartList(res)
        })
      },
      toggleCheck(){
        let path = this.allChecked ? '/api/carts/unSelectAll' : '/api/carts/selectAll'
        this.axios.put(path).then((res) => {
          this.renderCartList(res)
        })
      },
      renderCartList(res){
        this.list = res.cartProductVoList || []
        this.allChecked = res.selectedAll
        this.cartTotalPrice = res.cartTotalPrice
        this.checkedNum = this.list.filter(item => item.productSelected).length
      },
      order(){
        let ischeck = this.list.every(item => !item.productSelected)
        if(ischeck){
          Message.warning('必须选择一件商品')
          return
        }
        this.$router.push('/order/confirm')
      }
    },
}
</script>
<style lang="scss">
.cart-w{
  .cart-wrapper{
    background-color:#F5F5F5;
    padding:38px 0;
    .cart-container{
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          float:left;
          margin: 25px 15px 25px 24px;
          width: 18px;
          height: 18px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/img/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        } 
        .cart-item-head{
          display:flex;
          height: 70px;
          line-height: 70px;
          padding-right: 26px;
          color: #424242;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/img/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }   
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin: 20px 0;
        height: 50px; 
        line-height: 45px;
        background-color: #fff;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      } 
    }
  }
}
</style>
