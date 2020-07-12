<template>
   <div class="footer">
      <div class="footer-logo">
         <div class="logo-wrapper">
           <i class="iconfont">&#xecbf;</i>
         </div>
         <p>小米商城</p>
      </div>
      <div class="footer-home">
         <a href="https://github.com/WuRihan-neu?tab=repositories" target="_blank">GitHub</a><span class="line">|</span>
         <a href="https://wurihan-neu.github.io/">我的博客</a><span class="line">|</span>
         <a href="/description.md">功能说明</a>
         <p class="copyright">
          Copyright                     
         </p>
      </div>
   </div>
</template>

<script>
export default {
   name: 'nav-footer'

}
</script>

<style lang='scss'>
@import "./../assets/css/config.scss";
.footer{
  height: 234px;
  width: 100%;
  background-color: #333;
  border-top: 4px solid $colorA;
  .footer-logo{
    margin-bottom: 40px;
      .logo-wrapper{
        margin: 46px auto;
        width: 53px;
        height: 36px;
        margin-bottom: 15px;
        i{
          font-size: 50px;
          color: $colorA;
        }
      }
      p{
         color: #999;
         font-size: 16px;  
         width: 100%;
         text-align: center;   
         text-indent: -8px;    
      }
  }
  .footer-home{
      text-align: center;
      a{
        color: #999;
        font-size: 16px;
        display: inline-block;
      }
      .line{
        margin:0 10px;
        color: #999;
        font-size: 16px;
      }
      .copyright{
        margin:10px;
        color: #999;
        font-size: 16px;
      }
  }
}
</style>


