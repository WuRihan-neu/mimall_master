<template>
  <div class="alipay">
    <order-header title="支付宝支付">
        <template v-slot:body>
         <p>
            请谨防钓鱼链接或诈骗电话，了解更多>
         </p>
        </template> 
    </order-header>
    <loading v-if="loading"></loading>
    <div class="form" v-html="content">

    </div>
  </div>
</template>

<script>
import Loading from './../components/Loading'
import OrderHeader from './../components/OrderHeader'
export default {
    name: 'alipay',
    components:{
      OrderHeader,
      Loading
    },
    data() {
      return {
        orderId: this.$route.query.orderId,
        content: '',
        loading:true
      }
    },
    mounted() {
      this.paySubmit()
    },
    methods: {
      paySubmit(){
        this.axios.post('/api/pay', {
          orderId:this.orderId,
          orderName:'个人项目-vue模仿小米商城',
          amount: 0.01,
          payType: 1,
        }).then((res)=>{
          this.content = res.content
          // submit表单,v-html需要时间渲染
          setTimeout(()=>{
             document.forms[0].submit()
          },100)
        })
      }
    },
}
</script>

<style>

</style>