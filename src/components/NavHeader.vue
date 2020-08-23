<template>
  <div class="header">
    <div class="topbar-wrapper">
      <!-- 内部容器 -->
      <div class="topbar w clearfix">
        <!-- 左边栏 -->
        <ul class="service">
          <li>
            <a href="javascript:;">小米商城</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">MIUI</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">loT</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">云服务</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">金融</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">有品</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">小爱开放平台</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">企业团购</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">资质证照</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">协议规则</a>
          </li>
          <li class="line">|</li>
          <li class="app-fa">
            <a href="javascript:;" class="app">下载app</a>
            <!-- 添加下拉层 -->
            <div class="qrcode">
              <img src="/img/qr/qrcode.png" />
              <span>小米商城app</span>
            </div>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;">Select Location</a>
          </li>
        </ul>
        <!--为了使向右浮动时位置准确-->
        <!-- 购物车 -->
        <div class="shop">
          <ul class="shop-cart">
            <li>
              <span class="iconfont">&#xe603;</span>
            </li>
            <li>
              <a href="javascript:;" @click="goToCart">购物车（{{cartCount}}）</a>
            </li>
          </ul>
          <!-- 下拉框 -->
          <div class="shopping">购物车中还没有商品，赶紧选购吧！</div>
        </div>
        <!-- 用户登录等信息 -->
        <ul class="user-info">
          <li>
            <a href="javascript:;" v-if="!username" @click="login">登录</a>
            <a href="javascript:;" v-if="username" @click="logout">退出</a>
            <a class="line" v-if="username">|</a>
            <a href="javascript:;" v-if="username">{{username}}</a>
          </li>
           <li class="line" v-if="username">|</li>
          <li>
            <a href="javascript:;" v-if="username" @click="orderList">我的订单</a>
          </li>
          <li class="line">|</li>
          <li>
            <a href="javascript:;" @click="register">注册</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="header-wrapper">
      <div class="header w">
        <!-- 创建一个logo -->
        <h1 class="logo">
          <!-- 文字是为了让搜索引擎搜索到，但不能让它显示,通常将text-indent设为一个很大的负值 -->
          <a href="/#/index" class="house">
            <span class="iconfont">&#xe69b;</span>
          </a>
          <a href="/#/index" class="mi">
            <span class="iconfont">&#xecbf;</span>
          </a>
        </h1>
        <!-- 导航条容器 -->
        <div class="nav-wrapper">
          <!-- 导航条 -->
          <ul class="nav clearfix">
            <li class="all-goods-wrapper">
              <a href="#" class="all-goods">全部商品分类</a>
            </li>
            <li class="item-menu">
              <a href="#">小米手机</a>
               <!-- 下拉层外部容器 -->
              <div class="children-wrapper">
                <ul class="children w">
                  <li class="product" v-for="(item, index) in phoneList" :key="index">
                    <a :href="'/#/product/'+item.id" target="_blank">
                      <div class="pro_img">
                        <img v-lazy="item.mainImage">
                      </div>
                      <div class="pro_name">{{item.name}}</div>
                      <div class="pro_price">{{item.price | currency}}</div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="item-menu">
              <a href="#">Redmi 红米</a>
            </li>
            <li class="item-menu">
              <a href="#">电视</a>
                <div class="children-wrapper">
                  <ul class="children w">
                    <li class="product">
                      <a href="" target="_blank">
                        <div class="pro_img">
                          <img src="/img/nav-img/nav-3-1.jpg">
                        </div>
                        <div class="pro_name">小米壁画电视</div>
                        <div class="pro_price">6999元</div>
                      </a>
                    </li>
                    <li class="product">
                      <a href="" target="_blank">
                        <div class="pro_img">
                          <img src="/img/nav-img/nav-3-2.jpg">
                        </div>
                        <div class="pro_name">小米电视 大师 65英寸OLED</div>
                        <div class="pro_price">12999元</div>
                      </a>
                    </li>
                    <li class="product">
                      <a href="" target="_blank">
                        <div class="pro_img">
                          <img src="/img/nav-img/nav-3-3.png">
                        </div>
                        <div class="pro_name">Redmi 智能电视 MAX 98"</div>
                        <div class="pro_price">19999元</div>
                      </a>
                    </li>
                    <li class="product">
                      <a href="" target="_blank">
                        <div class="pro_img">
                          <img src="/img/nav-img/nav-3-4.jpg">
                        </div>
                        <div class="pro_name">小米电视4A 60英寸</div>
                        <div class="pro_price">1999元</div>
                      </a>
                    </li>
                    <li class="product">
                      <a href="" target="_blank">
                        <div class="pro_img">
                          <img src="/img/nav-img/nav-3-5.jpg">
                        </div>
                        <div class="pro_name">Redmi 智能电视 X55</div>
                        <div class="pro_price">2199元</div>
                      </a>
                    </li>
                    <li class="product">
                      <a href="" target="_blank">
                        <div class="pro_img">
                          <img src="/img/nav-img/nav-3-6.png">
                        </div>
                        <div class="pro_name">Redmi 红米电视 70英寸</div>
                        <div class="pro_price">2399元</div>
                      </a>
                    </li>
                  </ul>
                </div>
            </li>
            <li class="item-menu">
              <a href="#">笔记本</a>
            </li>
            <li class="item-menu">
              <a href="#">家电</a>
            </li>
            <li class="item-menu">
              <a href="#">路由器</a>
            </li>
            <li class="item-menu">
              <a href="#">智能硬件</a>
            </li>
            <li>
              <a href="#">服务</a>
            </li>
            <li>
              <a href="#">社区</a>
            </li>
          </ul>
        </div>
        <!-- 搜索框容器-->
        <div class="search-wrapper">
          <form action="#" class="search">
            <input class="search-inp" type="text" placeholder="电视" />
            <!-- 重点商品提示框 -->
            <button class="search-btn">
              <i class="iconfont">&#xe67f;</i>
            </button>
            <!-- 下拉框 -->
            <ul class="product-remind">
              <li>
                <a href="#">小米9</a>
              </li>
              <li>
                <a href="#">红米K20 pro</a>
              </li>
              <li>
                <a href="#">红米K20</a>
              </li>
              <li>
                <a href="#">Redmi note7 pro</a>
              </li>
              <li>
                <a href="#">Redmi note7</a>
              </li>
              <li>
                <a href="#">小米电视4c</a>
              </li>
              <li>
                <a href="#">电视40英寸</a>
              </li>
              <li>
                <a href="#">笔记本 pro</a>
              </li>
              <li>
                <a href="#">小爱音箱</a>
              </li>
              <li>
                <a href="#">净水器</a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-header",
  data(){
    return {
      /* 由于app.vue发请求需要时间
      若直接渲染username，在请求没完成时，已经开始渲染了 
      因此通过 computed 获得username*/
      // username: this.$store.state.username,
      phoneList:[],
      // cartCount: this.$store.state.cartCount 
    }
  },
  computed: {
    username(){
      return this.$store.state.username
    },
    cartCount(){
      return this.$store.state.cartCount
    }
  },
  filters:{
    currency(val){
      if (!val) return '0.00'
      return val.toFixed(0) + '元起'
    }
  },
  mounted() {
    this.getProductList()
    let params = this.$route.params //
    if(params && params.from == 'login' || params.from == 'cart'){
      this.getCartNum()
    }
  },
  methods: {
    login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/register')
    },
    orderList(){
      this.$router.push('/order/list')
    },
    getCartNum(){
       this.axios.get('/api/carts/products/sum').then((res=0)=>{
         this.$store.dispatch('saveCartCount', res)
       })
    },
    getProductList(){
      this.axios.get('/api/products', {
        params:{
          categoryId:'100012',
          pageSize:6 // 因为首页渲染了6个商品，所以可以直接将后台的 pageSize设为6
        }
      }).then((res) => {
        // 除了pageSize:6，还可以从phoneList中截取6个
        if(res.list.length >= 6){ 
          // 截取
          this.phoneList = res.list.slice(0, 6) 
        }
      })
    },
    logout(){
      this.axios.post('/api/user/logout').then(() => {
          this.$message.success('您已退出登录')
          this.$cookie.set('userId', '', {expires:"-1"})
          this.$store.dispatch('saveUserName', '')
          this.$store.dispatch('saveCartCount', 0)
      })
    },
    goToCart(){
      this.$router.push('/cart')
    }
  },
};
</script>
<style lang='scss'>
@import "./../assets/css/base.scss";
@import "./../assets/css/mixin.scss";
@import "./../assets/css/config.scss";
.header {
  .topbar-wrapper {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #333;
    .topbar {
      li {
        float: left;
      }
      // 左边栏
      .service {
        float: left;
        .line{
          color:#424242;
          font-size:12px;
          margin:0 8px;
          /*改变竖线位置*/
          margin-top:-1px; 
        }
         a {
          font-size: 12px;
          color: #b0b0b0;
          display: block;
          &:hover {
            color: #fff;
          }
        }
         .app-fa {
            position: relative;
            &:hover {
              display: block;
              // 鼠标移入，三角形效果出现
              .qrcode {
                height: 148px;
              }
              .app::after {
                display: block;
              }
            }
            .app {
              position: relative;
              &::after {
                display: none;
                content: "";
                /*开启绝对定位以调整位置，脱离文档流后直接变成块元素，因此无需display*/
                position: absolute;
                /*display: block;*/
                width: 0;
                height: 0;
                border: 8px solid #fff;
                border-color: transparent transparent #fff transparent;
                border-top: none;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                z-index: 2;
              }
          }
          // 下载的二维码
          .qrcode {
            /*使下拉框隐藏*/
            height: 0;
            overflow: hidden;
            position: absolute;
            z-index: 10;
            left: -35px;
            width: 124px;
            background-color: #fff;
            line-height: 1;
            text-align: center;
            font-size: 14px;
            color: #333;
            box-shadow: 0 8px 5px rgba(0, 0, 0, 0.3);
            transition: height 0.3s;
            img {
              width: 90px;
              margin: 17px;
              margin-bottom: 10px;
            }
          }
        }
 
       
      }
      // 购物车
      .shop {
        position: relative;
        .shop-cart {
          float: right;
          width: 120px;
          height: 40px;
          background-color: #424242;
          margin-left: 26px;
          position: relative;
          li {
            float: left;
            a {
              text-align: center;
              color: #b0b0b0;
              font-size: 12px;
            }
            .iconfont {
              text-align: center;
              color: #b0b0b0;
              margin-right: 4px;
              margin-left: 20px;
            }
          }
          &:hover {
            background-color: #fff;
            z-index: 10;
            .iconfont,
            a {
              color: #ff6700;
            }
          }
        }
        // 购物车下拉框
        .shopping {
          width: 316px;
          height: 0px;
          line-height: 100px;
          overflow: hidden;
          font-size: 12px;
          text-align: center;
          background-color: #fff;
          position: absolute;
          left: 910px;
          top: 40px;
          float: right;
          box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
          transition: height 0.3s;
          z-index: 9999;
        }
        &:hover {
          .shopping {
            height: 100px;
          }
        }
      }
      // 用户登录等信息
      .user-info {
        float: right;
        a {
          font-size: 12px;
          color: #b0b0b0;
          display: inline-block;
          &:hover {
            color: #fff;
          }
        }
        .line{
          color:#424242;
          font-size:12px;
          margin:0 8px;
          /*改变竖线位置*/
          margin-top:-1px; 
        }
      }
    }
  }
  /* 
    头部外部容器
  */
  .header-wrapper {
    height: 100px;
    position: relative;
    .header {
      height: 100px;
      width: 1226px;
      /* logo */
      /*导航条容器*/
      .nav-wrapper {
        float: left;
        margin-left: 7px;
        .nav {
          height: 100px;
          line-height: 100px;
          padding-left: 58px;
          .all-goods-wrapper {
            position: relative;
            .all-goods {
              visibility: hidden;
            }
          }
          .item-menu{ 
            .children-wrapper{
               height: 0;
               overflow: hidden;
               transition: all 0.5s;
               width: 100%;
               position: absolute;
               top:100px;
               left: 0;   
               background-color: #fff;
               z-index: 99;       
               .children{
                  height: 220px;
                  width: 1226px;                 
                  .product{
                    float: left;
                    width: 16.6%;
                    height: 220px;  
                    margin-right: 0; 
                    position: relative;    
                    &:before{
                        content:' ';
                        position: absolute;
                        top: 26px;
                        right: 0;
                        height: 100px;
                        width: 1px;
                        border-left: 1px solid $colorF;
                      } 
                    &:last-child:before{
                      display: none;
                    }
                    a{
                      width: 100%;
                      height: 220px; 
                      display: inline-block;
                      font-size: 12px;
                      margin-right: 0;
                      .pro_img{
                        margin-top: 26px;
                        height: 110px; 
                        width: 160px;
                        margin-left: 21.5px;
                        img{
                          height: 110px; 
                          width: 160px;
                        }
                      }
                      .pro_name{
                         margin-top: 14px;
                         height: 20px;
                         line-height: 20px;
                         width: 100%;
                         text-align: center;
                      }
                      .pro_price{
                         color:$colorA;
                         height: 20px;
                         width: 100%;
                         line-height: 20px;
                         text-align: center;   
                         margin-bottom: 16px; 
                      }
                      }
                  }
               }
            }
            &:hover .children-wrapper{
               transition: height 0.5s;
               border-top:1px solid $colorH;
               height: 220px;
               box-shadow: 0px 3px 4px rgba(0, 0, 0, .18);
            }
          }
          li {
            a {
              font-size: 16px;
              margin-right: 20px;
              display: block;
            }
          }
          > li {
            float: left;
            >a {
              &:hover {
                color: #ff6700;
              }
            }
          }
        }
      }
      /* 搜索框容器 */
      .search-wrapper {
        width: 296px;
        height: 50px;
        background-color: yellow;
        float: right;
        margin-top: 25px;
        position: relative;
        .search {
          .search-inp {
            float: left;
            height: 50px;
            border: 1px solid rgb(224, 224, 224);
            border-right: none;
            padding: 0;
            width: 244px;
            padding: 0 10px;
            box-sizing: border-box;
            font-size: 16px;
            outline: none;
            &::-webkit-input-placeholder {
              /* placeholder颜色 */
              // color: #aab2bd;
              /* placeholder字体大小 */
              font-size: 14px;
            }
            &:focus {
              border-color: #ff6700;
              ~ .search-btn {
                // note
                border-color: #ff6700;
              }
              ~ .product-remind {
                display: block;
              }
            }
          }
          .search-btn {
            float: left;
            width: 52px;
            height: 50px;
            border: 1px solid rgb(224, 224, 224);
            padding: 0;
            background-color: #fff;
            .iconfont {
              font-size: 16px;
              color: #616161;
              font-weight: bold;
            }
            &:hover {
              background-color: #ff6700;
              border: none;
              .iconfont {
                color: #fff;
              }
            }
          }
          .product-remind {
            width: 243px;
            border: 1px solid #ff6700;
            display: none;
            background-color: #fff;
            position: relative;
            z-index: 99;
            height: 300px;
            top: 49px;
            padding-top: 0;
            li {
              height: 30px;
              line-height: 30px;
              width: 228px;
              overflow: hidden;
              padding-left: 15px;
              font-size: 12px;
              position: relative;
              top: -49px;
              &:hover {
                background-color: rgb(250, 250, 250);
              }
            }
          }
        }
      }
    }
  }
}
</style>
