<template>
    <div class="nav-bar" :class="{'is_fixed':isFixed}">
       <div class="nav w">
        <div class="pro-title">
            {{title}}
        </div>
        <div class="pro-param">
            <a href="javascript:;">概述</a><span>|</span>
            <a href="javascript:;">参数</a><span>|</span>
            <a href="javascript:;" class="review">用户评价</a>
            <slot name='buy'></slot>
        </div>
       </div>
    </div>
</template>
<script>
export default {
    name:'nav-bar',
    props:{
      title: String
    },
    data(){
        return {
          isFixed: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.initHeight)
    },
    methods: {
        initHeight(){
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          this.isFixed = scrollTop > 210 ? true : false
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.initHeight, false)
    },
} 
</script>
<style lang="scss">
@import "./../assets/css/config.scss";
@import "./../assets/css/mixin.scss"; 
.nav-bar{
    position: relative;
    border-top:1px solid $colorH;
    border-bottom:1px solid $colorH;
    box-shadow: 0 5px 5px rgba(0,0,0,.07);
    z-index: 9;
    background-color: $colorG;
    &.is_fixed{
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 10;
    }
   .nav{
        height: 70px;
        line-height: 70px;
        @include flex(space-between);
        .pro-title{
            font-size: $fontH;
            color: $colorB;
        }
        .pro-param{
            font-size: $fontJ;
            color: $colorC;
            span{
                margin: 0 10px;
            }
            .review{
                margin-right: 11px;
            }
        }
   }

}  
</style>