<template>
    <div class="confirm-wrapper  clearfix">
      <order-header title="确认订单">
      </order-header>
       <div class="confirm-container w">
         <div class="address">
           <p>收货地址</p>
           <div class="address-list">
              <div class="user-address" v-for="(item, index) in list" :key="index" @click="checkIndex = index" :class="{'checked': index==checkIndex}">
               <h2>{{item.receiverName}}</h2>
               <div class="phone">{{item.receiverMobile}}</div>
               <div class="street">{{item.receiverProvince + " " + item.receiverCity + " " + item.receiverDistrict + " " + item.receiverAddress}}</div>
               <span class="change fl" @click="openEditModel(item)">
                 修改
               </span>
               <span class="delete fr" @click="deleteAddress(item)">
                 删除   
               </span>
              </div>
              <div class="add-address">
                <div class="add" @click="openAddressModel">
                  <i></i>
                </div>
                <span>添加新地址</span>
              </div>
           </div>
         </div>
         <div class="confirm-list">
          <p>商品及优惠券</p>
          <ul class="goods-list">
            <li class="goods-item" v-for="(item,index) in cartList" :key="index">
              <div class="productImg"><img :src="item.productMainImage" alt=""></div>
              <div class="name">{{item.productName + ' ' + item.productSubtitle}}</div>
              <div class="unit-price">{{item.productPrice}}元*{{item.quantity}}</div>
              <div class="price">{{item.productTotalPrice}}元</div>
            </li>
          </ul>
         </div>
         <div class="order-detail">
           <div class="f-left">
             <p>配送方式<span>包邮</span></p>
             <p>发票<span>电子发票 个人 商品明细</span></p>
           </div>
           <div class="f-right fr">
              <p>商品件数:<span>{{quantity}}件</span></p>
              <p>商品总价:<span>{{cartTotalPrice}}元</span></p>
              <p>优惠活动:<span>0元</span></p>
              <p>运费:<span>0元</span></p>
              <p>应付总额:<span class="price">{{cartTotalPrice}}元</span></p>
           </div>
         </div>
         <div class="btn-confirm">
            <a class="btn-group fr">
              <a href="/#/cart" class="btn-goBackCart btn-large">返回购物车</a>
              <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
            </a>
         </div>
        <modal title="添加收货地址"
            sureText="确定" 
            cancelText="取消"
            btnType="3"
            modalType="form" 
            v-bind:showModal='showaddModel'
            @submit="submitAddress"
            @cancel="showaddModel=false"
            >
            <template v-slot:body>
              <div class="address-form">
                <div class="item">
                  <input type="text" class="input" v-model="checkedItem.receiverName" placeholder="姓名">
                  <input type="text" class="input" v-model="checkedItem.receiverMobile" placeholder="手机号"> 
                </div>
                <div class="item">
                  <select name="province" v-model="checkedItem.receiverProvince">
                    <option value="北京" selected>北京</option>
                    <option value="天津">天津</option>
                    <option value="河北">河北</option>
                  </select>
                  <select name="city" v-model="checkedItem.receiverCity">
                    <option value="北京" selected>北京</option>
                    <option value="天津">天津</option>
                    <option value="河北">石家庄</option>
                  </select>
                  <select name="district" v-model="checkedItem.receiverDistrict">
                    <option value="北京">昌平区</option>
                    <option value="天津" selected>海淀区</option>
                    <option value="河北">东城区</option>
                    <option value="天津">西城区</option>
                    <option value="河北">顺义区</option> 
                    <option value="天津">房山区</option>
                  </select>
                </div> 
                <div class="item">
                    <textarea name="street" v-model="checkedItem.receiverAddress" placeholder="详细地址"></textarea>
                </div>
                <div class="item">
                  <input type="text" placeholder="邮政编码" v-model="checkedItem.receiverZip" class="receiverZip">
                </div>
              </div>
            </template>
            </modal>
            <modal title="确认删除"
            sureText="确定" 
            cancelText="取消"
            btnType="3"
            modalType="form" 
            v-bind:showModal='showdelModel'
            @submit="submitAddress()"
            @cancel="showdelModel=false"
            >
            <template v-slot:body>
               <p>
                 确认删除该地址?
               </p>
            </template>
            </modal>
       </div>
    </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Modal from './../components/Modal'
export default {
    name: 'order-comfirm',
    data() {
      return {
        list: [], // 收货地址列表
        cartList: [],  // 购物车需要结算的商品列表
        cartTotalPrice: 0,
        quantity:0, // 商品总件数
        userAction:'', // 用户行为 0 新增 1 编辑 2 删除
        checkedItem:{},  // 选中的地址对象 
        showaddModel:false, // 添加地址的模态框
        showdelModel:false, // 删除地址弹框
        checkIndex: 0, // 默认选择的地址索引
      }
    },
    components:{
      OrderHeader,
      Modal
    },
    mounted() {
      this.getAddressList()
      this.getCartList()
    },
    methods: {
      getAddressList(){
        this.axios.get('/api/shippings').then((res)=>{
          if(res.list.length>2){
            res.list = res.list.slice(0,2)
          }
          this.list = res.list
        })
      },
      getCartList(){
        this.axios.get('/api/carts').then((res)=>{
          let list = res.cartProductVoList // 购物车中所有的商品数据
          this.cartTotalPrice = res.cartTotalPrice //商品总金额
          this.cartList = list.filter(item => item.productSelected) // 购物车中所有的选中商品数据 
          this.cartList.forEach(item => {
              this.quantity += item.quantity
          });
        })
      },
      addAddress(showModel){
        this.showModel = !showModel
      },
      closeModel(){
        this.checkedItem = {}
        this.userAction = 0 //用户行为是删除
        this.showdelModel = false
        this.showaddModel = false
      },
      // 地址 新增 删除 编辑功能
      submitAddress(){
        let {checkedItem, userAction} = this // userAction不同，作相应的处理
        let method,url,params={}
        if(userAction == 0){ // 新增
          method="post"
          url='/api/shippings'
        }else if(userAction == 1){ // 编辑
          method="put"
          url=`/api/shippings/${checkedItem.id}`
        }else if(userAction == 2){ // 删除
          method="delete"
          url=`/api/shippings/${checkedItem.id}`
        }
        if(userAction == 0 || userAction == 1){
           let {receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = checkedItem
           let errMsg
           if(!receiverName){
            errMsg = "请输入用户名名称"
           }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
             errMsg = "请输入手机号码"
           }else if(!/\d{6}/.test(receiverZip)){
            errMsg = "请输入正确的邮编"
           }else if(!receiverProvince || !receiverCity || !receiverDistrict || !receiverAddress){
             errMsg = "请输入收货地址"
           }
           if(errMsg){
             this.$message.error(errMsg)
             return
           }
           params = {
            receiverName,
            receiverMobile,
            receiverProvince,
            receiverCity,
            receiverDistrict,
            receiverAddress,
            receiverZip
          }
        }
        this.axios[method](url,params).then(()=>{
          // 关闭弹框
          this.closeModel()
          // 重新拉取地址，防止同时登陆的并发事件
          this.getAddressList()
          // 提示
          this.$message.success('操作成功')
        })
      },
      // 打开删除地址弹框
      deleteAddress(item){
        this.checkedItem = item
        this.userAction = 2 //用户行为是删除
        this.showdelModel = true
      }, 
      // 打开编辑地址弹框
      openEditModel(item){
        this.userAction = 1 //用户行为是新增
        this.checkedItem = item
        this.showaddModel = true
      },
      // 打开新增地址弹框
      openAddressModel(){
        this.userAction = 0 //用户行为是新增
        this.checkedItem = {}
        this.showaddModel = true
      },
      orderSubmit(){
        // 当前index的地址
        let item = this.list[this.checkIndex]
        // 没选地址时的处理
        if(!item){
           this.$message.error('请选择一个收货地址')
           return
        }
        this.axios.post('/api/orders', {
           shippingId: item.id
        }).then((res) => {
           this.$router.push({
             path:'/order/pay',
             query: {
               orderNo: res.orderNo
             }
           })
        })
      }
    },
}
</script>
<style lang="scss">
@import './../assets/css/mixin.scss';
@import './../assets/css/base.scss';
.confirm-wrapper{
  width: 100%;
  background-color:#F5F5F5;
  .confirm-container{
    // padding:48px 0 54px;
    background-color: #fff;
    width: 1226px;
    box-sizing: border-box;
    padding:20px 63px 0 63px;
    margin-top: 48px;
    margin-bottom: 48px;
    .address{
      height: 280px;
      width: 100%;
      p{
        height: 78px;
        line-height: 78px;
        font-size: 20px;
        font-weight: 400;
        color: #333333;
      }
      .address-list{
         height: 180px;
         @include flex(start, center, row);
        .user-address{
          width: 271px;
          height: 180px;
          display: inline-block;
          border:1px solid #E5E5E5;
          padding: 15px 24px 0;
          box-sizing: border-box;
          transition: all 0.8Ss;
          opacity: 0.8;
          margin-right: 20px;
          cursor: pointer;
          h2{
            font-size: 18px;
            color: #333;
            line-height: 30px;
            margin-bottom: 10px;
          }
          .phone{
            line-height: 22px;
            color: #757575;
            font-size: 14px;
          }
          .street{
            line-height: 22px;
            color: #757575;
            font-size: 14px;
          }
          .delete{
            color: #ff6700;
            font-size: 14px;
            margin-top: 52px;
            opacity: 1;
            display: none;
          } 
          .change{
            color: #ff6700;
            font-size: 14px;
            display: none;
            margin-top: 52px;
          }  
          &:hover{
              border:1px solid #666;
                .change{
                  display: block;
                }
                .delete{
                  display: block;
                }
          }
          &.checked{
            border:1px solid #ff6700;
          }
        }
        .add-address{
            width: 271px;
            height: 180px;
            display: inline-block;
            border:1px solid #E5E5E5;
            text-align: center;
            box-sizing: border-box;
            transition: all 0.8s ease-in-out;
            cursor: pointer;
            .add{
              height: 30px;
              width: 30px;
              background-color: #E0E0E0;
              border-radius: 50%;
              margin-top:60px;
              margin-left: 121px;
              margin-bottom: 10px;
              position: relative;
              transition: all 0.8s;
              i{
                display: block; 
                width: 14px; 
                height: 14px;        
                @include positionImg(absolute, 8px,8px, 14px, 14px,'/img/icon-add.png'); 
              }
            }
            span{
              color:#999999;
              font-size:14px;
            }
            &:hover{
              border:1px solid #666;
              .add{
                background-color:  #666;
                opacity: 0.6;
              }
            }
        }
      }
    }
    .confirm-list{
      width: 1226px;
      p{
        color: #333;
        font-size: 18px;
        line-height: 40px
      }
      .goods-list{
        width: 1178px;
        .goods-item{
           @include flex(start, center, row);
           padding:10px 0;
           height: 65px;
           line-height: 65px;
           .productImg{
             width: 30px;
             height: 30px;
             line-height: 30px;
             margin-right: 15px;
             img{
               width: 30px;
             }
           }
           .name{
             width: 650px;
             height: 30px;
             line-height: 30px;
             color:#424242;
             font-size: 16px;
           }
           .unit-price{
             width: 220px;
             height: 30px;
             line-height: 30px;
             font-size: 14px;
             color:#FF6700;
           }
           .price{
             width: 220px;
             height: 30px;
             line-height: 30px;
             font-size: 14px;
             color:#FF6700;
           }
        }
      }
    }
    .order-detail{
      height: 343px;
      border-top: 1px solid  #E5E5E5;
      border-bottom: 1px solid  #E5E5E5;
      .f-left{
        margin-top: 20px;
        p{
          line-height:60px;
          font-size:20px;
          span{
            margin-left: 71px;
            font-size:16px;
            color: #FF6700;
          }
        }
      }
      .f-right{
          p{
            line-height:35px;
            font-size:14px;
            color: #757575;
            width: 200px;
            span{
              margin-left: 20px;
              text-align: center;
              display: inline-block;
              color: #FF6700;
            }
            .price{
              font-size:28px;
            }
          }
      }
    }
    .btn-confirm{
      height: 177px;
      .btn-group{
        margin-top: 37px;
        margin-right: 20px;
      }
    }
    .address-form{
      .item{
        color: #666;
        width: 579px;
        font-size: 14px;
        .input{
          width: 283px;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          border:1px solid #E5E5E5;
          &:first-child{
            margin-right: 13px;
          }
        }
        select{
          margin-top: 15px;
          outline: none;
          box-sizing: border-box;
          height: 40px;
          border:1px solid #E5E5E5;
          width: 183px;
          padding:5px 8px;
          line-height: 40px;
          margin-right: 15px;
          &:last-child{
            margin-right: 0;
          }
        }
        textarea{
          margin-top: 14px;
          box-sizing: border-box;
          width: 579px;
          height: 62px;
          border:1px solid #E5E5E5;
          outline: none;
          padding:13px 15px;
        }
        .receiverZip{
          margin-top: 14px;
          box-sizing: border-box;
          width: 579px;
          height: 40px;
          line-height: 40px;
          border:1px solid #E5E5E5;
        }
      }
    }
  }
}
</style>