<template>
  <div class="no-data">
      <img src="/img/icon-no-data.png" alt="">
      <p>当前没有交易订单。</p>
  </div>
</template>

<script>
export default {
 name:'no-data'
}
</script>

<style lang="scss">
.no-data{
    padding:70px 0;
    text-align: center;
    background-color: #fff;
    img{
       margin-bottom: 25px;
       width: 260px;
       height: 184px;
    }
    p{
     font-size:20px;
     text-indent: 5px;
     color:#999;
    }
}
</style>