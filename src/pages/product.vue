<template>
  <div class="product">
    <product-param :title="product.name">
      <template v-slot:buy>
         <button class="btn">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item1-bg clearfix" id="item1">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p class="pro-describe">
          <a href="javascript:;" id="">全球首款双频 GP</a>
          <span>|</span>
          <a href="javascript:;" id="">骁龙845</a>
          <span>|</span>
          <a href="javascript:;" id="">AI 变焦双摄</a>
          <span>|</span>
          <a href="javascript:;" id="">红外人脸识别</a>
        </p>
         <div class="price">
          <span>￥{{product.price}}</span>
        </div>
      </div>
      <div class="item2-bg">
        <div class="wrapper w">

        </div>
      </div>
      <div class="item3-bg">
      </div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
           <a href="javascript:;"><img src="/img/product/gallery-2.png"></a>
          </swiper-slide>
          <swiper-slide>
           <a href="javascript:;"><img src="/img/product/gallery-3.png"></a>
          </swiper-slide> 
          <swiper-slide>
           <a href="javascript:;"><img src="/img/product/gallery-4.png"></a>
          </swiper-slide>
          <swiper-slide>
           <a href="javascript:;"><img src="/img/product/gallery-5.jpg"></a>
          </swiper-slide>
          <swiper-slide>
           <a href="javascript:;"><img src="/img/product/gallery-6.jpg"></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper> 
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video clearfix">
         <h2>60帧超慢动作摄影 <br/>慢慢回味每一瞬间的精彩</h2>
         <p>
           后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！ <br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。
         </p>
         <div class="video-bg" @click="showSlide=true">
          <div class="video-box">
            <!-- 视频弹框遮罩 -->
            <div class="overlay" v-if="showSlide"></div>
            <div class="video" v-bind:class="{'slide': showSlide}">
              <span class="icon-close" @click.stop="showSlide=false"></span>
              <video src="img/product/video.mp4" muted autoplay controls="controls"> 
              </video>
            </div>
          </div>
         </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import ProductParam from './../components/ProductParam'
import 'swiper/css/swiper.css'
export default {
    name: 'product',
    data(){
      return {
        product:{},
        showSlide:false,
        swiperOption:{
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable:true,
            dynamicMainBullets:5
          },
        }, 
      }
    },
    mounted() {
      this.getProductInfo()
    },
    methods: {
      getProductInfo(){
         let id = this.$route.params.id
         this.axios.get(`/api/products/${id}`).then((res)=>{
           this.product = res
         })
      }
    },
    components:{
       ProductParam,
       Swiper,
       SwiperSlide
    },
}
</script>

<style lang="scss">
@import "./../assets/css/base.scss";
@import "./../assets/css/mixin.scss";
@import "./../assets/css/config.scss";
.product{
  .content{
    .item1-bg{
       width: 100%;
       height: 718px;
       text-align: center;
       background: url('/img/product/product-bg-1.png') center no-repeat;
       h2{
         font-size: $fontA;
         color: $colorB;
         margin-top: 38px;
       }
       h3{
         font-size: $fontE;
         color: $colorB;
         margin: 13px 0;
       }
       .pro-describe{
         font-size: $fontE;
         margin-top: 24px;
         margin-bottom: 40px;
         color: $colorB; 
         font-size: $fontI;
         span{
           margin:0 10px;
         }
       }
       .price{
         span{
           font-size: $fontB;
           color: $colorB;
         }
       }
   }
    .item2-bg{
      width: 100%;
      height: 480px;
       .wrapper{
         margin-top: 48px;
         @include bgImg(1226px, 397px, "/img/product/product-bg-2.png")
       }
    }
    .item3-bg{
       width: 100%;
       height: 718px;
       background: url('/img/product/product-bg-3.png') center top no-repeat;
    }
    .item-swiper{
        margin:36px auto 52px;
        img{
          width:100%;
        }
        .desc{
          color: $colorB;
          font-size: $fontH;
          text-align: center;
          margin-top: 37px;
        }
       
    }
    .item-video{
      height: 1044px;
      width: 100%;
      background-color: #070708;
      margin-bottom: 50px;
      text-align: center;
      z-index:11;
      h2{
        font-size:60px;
        font-weight:bold;
        color: $colorG;
        margin-top: 82px;
      }
      p{
        font-size:24px;
        font-weight:bold;
        color: $colorG;
        margin-top: 47px;
        margin-bottom:58px;
      }
      .video-bg{
        background: url('/img/product/gallery-1.png') no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        .video-box{
          .overlay{
            @include position(fixed);
            background-color: #000;
            opacity: .4;
            z-index: 20;
          }
          .video{
            z-index: 99;
            position: fixed;
            top: -50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1000px;
            height: 536px;
            opacity: 0;
            transition: all 0.6s;
            &.slide{
              top: 50%;
              opacity: 1; 
              transition: all 0.6s;
            }
            .icon-close{
              position: absolute;
              top: 20px;
              right: 20px;
              @include bgImg(14px, 12px,'/img/icon-close.png');
              z-index: 999;
              cursor: pointer; 
            }
            video{
              width: 100%;
              height: 100%;
              object-fit: cover;
              outline:none;
            }
          }
      }
    }
    }
  }
}
</style>
