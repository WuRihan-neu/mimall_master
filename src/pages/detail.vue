<template>
  <div class="detail">
    <product-param v-bind:title="product.name"></product-param>
    <div class="wrapper">
      <div class="pro-info w">
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide>
              <img src="/img/detail/phone-1.jpg" />
            </swiper-slide>
            <swiper-slide>
              <img src="/img/detail/phone-2.jpg" />
            </swiper-slide>
            <swiper-slide>
              <img src="/img/detail/phone-3.jpg" />
            </swiper-slide>
            <swiper-slide>
              <img src="/img/detail/phone-4.jpg" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="content">
          <h2 class="item-title">{{product.name}}</h2>
          <p class="describe"><span class="activity">买赠冰封散热背夹</span>向往的生活同款 / 骁龙865处理器 / 1亿像素8K电影相机，50倍数字变焦，10倍混合光学变焦 / 双模5G / 新一代LPDDR5内存 / 50W极速闪充+30W无线闪充+10W无线反充 / 对称式立体声 / 90Hz刷新率+180Hz采样率 / UFS 3.0高速存储 / 全面适配WiFi 6 / 超强VC液冷散热 / 4500mAh大电量 / 多功能NFC</p>
          <div class="delivery">小米自营</div>
          <div class="item-price">{{product.price}}元<span class="del">{{product.price+1000}}元</span></div>
          <div class="act-describe">
            <span class="tag">赠完即止</span>
            赠冰封散热背夹
          </div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <div class="item-version clearfix">
            <h2>选择版本</h2>
            <div class="phone fl" :class="{'checked': version==1}" @click="version=1">8GB+64GB 全网通</div>
            <div class="phone fr" :class="{'checked': version==2}" @click="version=2">12GB+256GB 移动4G</div>
          </div>
          <div class="item-color clearfix">
            <h2>选择颜色</h2>
            <div class="phone fl" :class="{'checked': color==1}" @click="color=1">星空蓝</div>
            <div class="phone fr" :class="{'checked': color==2}" @click="color=2">珍珠白</div>
          </div>
           <div class="item-total clearfix">
            <div class="phone-info">
              <div class="fl">{{product.name}} {{version==1? '8GB+64GB 全网通' : '12GB+256GB 移动4G'}} {{color==1?'星空蓝':'珍珠白'}}</div>
              <div class="fr">{{version==1?product.price:product.price+600}}元</div>
            </div>
            <div class="phone-total clearfix">总计：{{version==1?product.price:product.price+600}}元</div>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn btn-huge fl" @click="addCart">加入购物车</a>
            <a href="javascript:;" class="btn btn-like fl">喜欢</a>
          </div>
        </div>
      </div>
      <div class="price-info">  
        <div class="price-wrapper w">
          <h2>价格说明</h2>
          <div class="desc">
            <img src="/img/detail/item-price.jpeg" alt="">
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ProductParam from "./../components/ProductParam";
import ServiceBar from "./../components/ServiceBar";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import 'swiper/css/swiper.css';
export default {
  name: "detail",
  data() {
    return {
      id: this.$route.params.id,
      product: {},
      version: 1,
      color: 1,
      swiperOption: {
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
    }   
  },
  mounted(){
    this.getProductInfo()
  },
  methods: {
    getProductInfo(){
      this.axios.get(`/api/products/${this.id}`).then((res)=>{
        this.product = res
        })
    },
    addCart(){
      this.axios.post('/api/carts', {
        productId: this.id,
        selected: true
      }).then((res = {}) => {
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        this.$router.push('/cart')
      })
    }
  },
  components: {
    ProductParam,
    ServiceBar,
    Swiper,
    SwiperSlide
  }
};
</script>

<style lang="scss">
@import './../assets/css/config.scss';
@import './../assets/css/mixin.scss';
.detail {
  .wrapper {
    padding: 32px 0 12px;
    @include flex(space-between,start,column);
    .pro-info{
      @include flex(space-between,start,row);
      .swiper{
        width:606px;
        height:617px;
        margin-top:5px;
          .swiper-container{
            img{
              width:560px;
              height: 560px;
            }
            .swiper-button-prev{
              color:rgba(0, 0, 0, 0.3);
            }
            .swiper-button-next {
              right: 40px;
              color:rgba(0, 0, 0, 0.3);
            }
          }
      }
      .content{
        flex:1;
        width: 600px;
        margin-left: 20px;
        .item-title{
          font-size:28px;
          padding-top:30px;
          padding-bottom:16px;
          height: 26px;
        }
        .describe{
          font-size: 14px;
          color: #b0b0b0;
          line-height: 1.5;
          .activity{
            color: $colorA;
          }
        }
        .delivery{
          font-size:16px;
          color:#FF6700;
          margin-top:14px;
          height: 15px;
        }
        .item-price{
          font-size:18px;
          color:#FF6700;
          height: 19px;
          padding:12px 0;
          .del{
            font-size:16px;
            color:#999999;
            margin-left:10px;
            text-decoration:line-through;
          }
        }
        .act-describe{
          width: 600px;
          height: 40px;
          padding: 5px 0 5px;
          margin: 15px 0;
          border-top: 1px solid #e0e0e0;
          border-bottom: 1px solid #e0e0e0;
          font-size:14px;
          @include flex(start);
          .tag{
            display: inline-block;
            width: 80px;
            padding: 2px 0;
            text-align: center;
            background: #ff6700;
            color: #fff;
            margin-right:10px;
          }
        }
        .item-addr{
          height:108px;
          background-color:#FAFAFA;
          border:1px solid #E5E5E5;
          box-sizing:border-box;
          padding-top:31px;
          padding-left:64px;
          font-size:14px;
          line-height:14px;
          position:relative;
          .icon-loc{
            position: absolute;
            top: 27px;
            left: 34px;
            @include bgImg(20px,20px,'/imgs/detail/icon-loc.png');
          }
          .addr{
            color:#666666;
          }
          .stock{
            margin-top:15px;
            color:#FF6700;
          }
        }
        .item-version, .item-color{
          width: 100%;
          margin-top:30px;
          h2{
            font-size:18px;
            margin-bottom:20px;
          }
        }
        .item-version,.item-color{
          .phone{
            width:290px;
            height:50px;
            line-height:50px;
            font-size:16px;
            color:#333333;
            border:1px solid #E5E5E5;
            box-sizing: border-box;
            text-align:center;
            cursor:pointer;
            span{
              color:#666666;
              margin-left:15px;
            }
            .color{
              display:inline-block;
              width:14px;
              height:14px;
              background-color:#666666;
            }
            &.checked{
              border:1px solid #FF6600;
              color:#FF6600;
            }
          }
        }
        .item-total{
          height: 108px;
          background: #FAFAFA;
          padding: 24px 33px 29px 30px;
          font-size: 14px;
          margin:30px 0;
          box-sizing: border-box;
          .phone-info{
            color: #616161;
          }
          .phone-total{
            height: 56px;
            color: $colorA;
            font-size: 24px;
            padding:20px 0 0;
            line-height: 56px;
          }
        }
      }
    }
    .price-info{
      background-color: $colorJ;
      width: 100%;
      padding-bottom: 50px;
      margin-top: 20px;
      .price-wrapper{
        h2{
          font-size: 22px;
          font-weight: 400;
          height: 76px;
          line-height: 76px;
        }
      }
    }
  }
}
</style>