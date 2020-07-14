<template>
   <div class="service">
     <ul class="container w">
        <li class="setting">
           <span class="icon-setting"></span>
           预约维修服务
        </li>
        <li class="7Day">
           <span class="icon-7day"></span>
           7天无理由退货
        </li>
        <li class="15day">
           <span class="icon-15day"></span>
           15天免费换货
        </li>
        <li class="post">
           <span class="icon-post"></span>
           满150元包邮
        </li>
     </ul>
   </div>
</template>

<script>
export default {
   name: 'service-bar'

}
</script>

<style lang='scss' scoped>
@import "./../assets/css/base.scss";
@import "./../assets/css/mixin.scss";
.service{
   padding: 33px 0;
   width: 100%;
   color: #666666;
   li{
      display: inline-block;
      height: 34px;
      width:24.9%;
      text-align: center;
      border-right: 1px solid #E5E5E5;
      line-height: 34px;
      vertical-align: middle;
      &:last-child{
          border-right: 1px solid transparent;
      }
      span{
         position: relative;
         top:4.5px;
         display: inline-block;
         width: 20px;
         height: 20px;
         margin-right: 8px;
      }
   }
   .icon-setting{
      @include bgImg(20px, 20px, './../../public/img/service/icon-setting.png')
   }
   .icon-7day{
      @include bgImg(20px, 20px, './../../public/img/service/icon-7day.png')
   }
   .icon-15day{
      @include bgImg(20px, 20px, './../../public/img/service/icon-15day.png')
   }
   .icon-post{
      @include bgImg(20px, 20px, './../../public/img/service/icon-post.png')
   }
}
</style>

