<template>
  <div class="order-header">
     <div class="wrapper w clearfix">
        <h1 class="logo fl">
          <a href="/#/index" class="house">
            <span class="iconfont">&#xe69b;</span>
          </a>
          <a href="/#/index" class="mi">
            <span class="iconfont">&#xecbf;</span>
          </a>
        </h1>
        <div class="title fl">{{title}}
          <slot name="tip">
             <span></span>
          </slot>
        </div>
        <div class="user fr">{{username}}</div>
     </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
   name: 'order-header',
   props:{
     title:String,
   },
   computed: {
     ...mapState(['username'])
   },
}
</script>

<style lang="scss">
@import "./../assets/css/mixin.scss";
.order-header{
  width: 100%;
  border-bottom: 2px solid #ff6700;
  .wrapper{
    height: 112px;
    padding: 30px 0;
    box-sizing: border-box;
    .logo{
      margin-top: 0;
      margin-right: 37px;
    }
    .title{
      display: inline-block;
      line-height: 55px;
      font-size:28px;
      color:#333;
      span{
         font-size: 14px;
         color: #999;
         margin-left: 11px;
      }
    }
    .user{
      display: inline-block;
      line-height: 55px;
      font-size:16px;
      color:#757575;
      
    }
  }
}
</style>
