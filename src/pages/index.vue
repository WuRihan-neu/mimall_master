<template>
  <div class="index">
    <div class="container-index">
      <div class="swiper-box w">
         <!-- 左侧导航条 -->
        <div class="nav-menu">
           <ul class="left-nav">
                <li class="menu-item">
                  <a href="javascript:;">
                    手机 电话卡
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                  <div class="children">
                    <ul v-for="(item,i) in menuList" v-bind:key="i">
                      <li v-for="(sub,j) in item" v-bind:key="j">
                        <a v-bind:href="sub?'/#/product/' + sub.id:'javascript:;'">
                          <img v-bind:src="sub?sub.img:'/img/item-box/item-box-1.png'">
                          {{sub?sub.name:'小米9'}}
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    电视 盒子
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    笔记本 平板
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    家电 插线板
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    出行 穿戴
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    智能 路由器
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    电源 配件
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    健康 儿童
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    耳机 音箱
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="javascript:;">
                    智能 路由器
                    <i class="iconfont">&#xe61f;</i>
                  </a>
                </li>
              </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <a :href="'/#/product/'+ item.id"><img :src="item.img"></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
           <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper> 
      </div>
      <div class="ads-box w">
        <a :href="'/#/product/'+ item.id" v-for="(item,index) in adsList" :key='index'>
          <img v-lazy="item.img">
        </a>
      </div>
      <div class="banner w">
         <a href="/#/product/33">
           <img v-lazy="'/img/banner-1.png'" alt="">
         </a>
      </div>
      <div class="product-wrapper">
        <div class="product-box w">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'/img/mix-alpha.jpg'">
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(item,i) in phoneList" :key="i">
              <div class="item" v-for="(sub,j) in item" :key="j">
                <span>新品</span>
                <div class="item-img">
                  <img v-lazy="sub.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{sub.name}}</h3>
                  <p class="item-describe">{{sub.subtitle}}</p>
                  <p class="item-price">{{sub.price}}元<i class="iconfont"  @click="addCart(sub.id)">&#xe603;</i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal title="提示"
    sureText="查看购物车" 
    btnType="1"
    modalType="middle" 
    v-bind:showModal='showModal'
    @submit="goToCart"
    @cancel="showModal=false"
    >
    <template v-slot:body>
      <p>商品添加成功!</p>
    </template>
    </modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ServiceBar from './../components/ServiceBar'
import Modal from './../components/Modal'
import 'swiper/css/swiper.css'
export default {
    name: 'index',
    data(){
      return {
        swiperOption:{
          autoplay:true,
          loop:true,
          effect:'fade',
          fadeEffect: {
            crossFade: true,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable:true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        },       
        slideList:[
          {
            id:'42',
            img:'/img/slider/slide-1.jpg'
          },
          {
            id:'45',
            img:'/img/slider/slide-2.jpg'
          },
          {
            id:'46',
            img:'/img/slider/slide-3.jpg'
          },
          {
            id:'42',
            img:'/img/slider/slide-4.jpg'
          },
          {
            id:'46',
            img:'/img/slider/slide-5.jpg'
          }
        ],
        menuList:[
          [
            {
              id:30,
              img:'/img/item-box/item-box-1.png',
              name:'小米CC9'
            },
            {
              id:31,
              img:'/img/item-box/item-box-2.png',
              name:'小米8 青春版'
            },
            {
              id:32,
              img:'/img/item-box/item-box-3.jpg',
              name:'Redmi k20 pro'
            },
            {
              id:33,
              img:'/img/item-box/item-box-4.jpg',
              name:'移动4G专区'
            },
            {
              id:32,
              img:'/img/item-box/item-box-3.jpg',
              name:'Redmi k20 pro'
            },
            {
              id:33,
              img:'/img/item-box/item-box-4.jpg',
              name:'移动4G专区'
            }
          ],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]
        ],
        adsList:[
          {
            id: 33,
            img:'/img/ads/ads-1.png'
          },
          {
            id: 48,
            img:'/img/ads/ads-2.jpg'
          },
          {
            id: 45,
            img:'/img/ads/ads-3.png'
          },
          {
            id: 47,
            img:'/img/ads/ads-4.jpg'
          },
        ],
        phoneList:[],
        showModal:false,
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init(){
        this.axios.get('/api/products',{
          params:{
           categoryId: 100012, //手机品类
           pageSize:14          //拉取8条数据
          }
        }).then((res)=>{
         res.list = res.list.slice(6,14)
         this.phoneList=[res.list.slice(0,4), res.list.slice(4,8)]
        })
      },
      addCart(id){
        // 登录功能完成后实现
        this.axios.post('/api/carts',{
          productId: id,  //指定商品id
          selected: true // 即加入购物车之后商品默认为选中状态
        }).then((res)=>{
          //暂时没登录无法成功
           this.showModal = true
           this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        }).catch(()=>{
          this.showModal = true
        })
      },
      goToCart(){
        this.$router.push('/cart')
      }
    },
    components:{
       Swiper, 
       SwiperSlide,
       ServiceBar,
       Modal
    }
}
</script>
<style lang="scss">
@import "./../assets/css/base.scss";
@import "./../assets/css/mixin.scss";
.index{
  .swiper-box{  
    height: 460px;
    .nav-menu{
       position: absolute;
      .left-nav {
        width: 234px;
        background-color: rgba(0, 0, 0, 0.3);
        position: relative;
        z-index: 9;
        line-height: 1;
        padding: 20px 0;
        .menu-item{
          a{
              display: block;
              height: 42px;
              line-height: 42px;
              color: #fff;
              padding: 0 20px 0 30px;
              font-size: 14px;
              margin: 0;
              /*箭头图标向右浮动*/
              i {
                float: right;
                font-size: 12px;
              }
              &:hover {
                color: #fff;
                background-color: #ff6700;
              }
            }
          .children{
            height: 458px;
            width: 992px;
            background-color: #fff;
            position: absolute;
            left: 234px;
            top: 0;
            z-index: 999;
            border: 1px solid #e5e5e5;
            border-left: none;
            display: none;
            ul{
              height: 460px;
              width: 248px;
              display: inline-block;
              li{
                width: 248px;
                height: 76.6px;
                position: relative;
                a{
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  margin:auto 0;
                  display: inline-block;
                  color: #333333;
                  font-size: 14px;
                  @include flex();
                  img{
                    width: 35px;
                    margin-right: 10px;
                  }
                  &:hover {
                    color:  #ff6700;
                    background-color: #fff;
                  }
                }
              }
            }
           
          }
          &:hover{
            .children{
              display: block;
            }
          }
        }     
      }
    }
    .swiper-container{
      width: 1226px;
      height: 460px;
      img {
        width: 1226px;
        height: 460px;
      }
      .swiper-button-prev{
        left: 248px;
        color:rgba(0, 0, 0, 0.3);
      }
      .swiper-button-next {
        right: 14px;
        color:rgba(0, 0, 0, 0.3);
      }
    }
  }
  .ads-box{
    @include flex(space-between);
    a{
      margin-top: 14px;
      margin-bottom: 31px;
      width: 296px;
      height: 147px;
    }
  }
  .banner{
    margin-bottom: 50px;
  }
  .product-wrapper{
      height: 740px;
      width: 100%;
      background-color: #F5F5F5;
      .product-box{
        h2{
          font-size:22px;
          font-weight:bold;
          color:#333;
          line-height:60px;
        }
        .wrapper{
          height: 619px;
          width: 1226px;
          @include flex(space-between,center,row);
          .banner-left{
            height: 619px;
            width: 224px;
            margin-right: 16px;
            &:hover{
              box-shadow: 0 15px 30px rgba(0,0,0,.1);
              transform: translate3d(0,-2px,0);
              transition: all 0.2s;
            }
          }
          .list-box{
            height: 619px;
            width: 986px;
            @include flex(space-between,space-between,column);
            .list{
                @include flex(space-between,center,row);
                .item{
                  width: 236px;
                  height: 302px;
                  background-color: #fff;
                  span{
                    display: block;
                    margin:0 auto;
                    width:67px;
                    height:24px;
                    font-size:14px;
                    color: #fff;
                    text-align: center;
                    line-height: 24px;
                    font-weight:bold;
                    &.new-pro{
                       background-color: #7DCF67;
                    }
                    &.kill-pro{
                      background-color: #E82626;
                    }
                  }
                  .item-img{
                      padding-left: 38px;
                      width: 160px;
                      height: 160px;
                      margin-bottom: 20px;
                    img{
                      width: 100%;
                    }
                  }
                  .item-info{
                    text-align: center;
                     .item-title{
                        font-size:14px;
                        font-weight:400;
                        color:#333;
                        margin-bottom: 6px;
                     }
                     .item-describe{
                        font-size:12px;
                        color:#999;
                        margin-bottom: 15px;
                     }
                     .item-price{
                       font-size:14px;
                       color:#ff6700;
                       margin: 0 10px 14px;
                       i{
                          font-size:14px;
                          color:#ff6700;
                          margin-left: 5px;
                          cursor: pointer;
                       }
                     }
                  }
                  &:hover{
                    box-shadow: 0 15px 30px rgba(0,0,0,.1);
                    transform: translate3d(0,-2px,0);
                    transition: all 0.2s;
                  }
                }
            }
          }
        }
      }
  }
}
</style>
