<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
   
  },
  data(){
    return{
     
    }
  },
  mounted() {
   if(this.$cookie.get('userId')){
     this.getUser()
     this.getCartNum()
   }
  }, 
  methods: {
    getUser(){
       this.axios.get('/api/user').then((res={})=>{
          this.$store.dispatch('saveUserName', res.username)
       })
    },
    getCartNum(){
       this.axios.get('/api/carts/products/sum').then((res=0)=>{
         this.$store.dispatch('saveCartCount', res)
       })
    }
  },
 
}
</script>

<style lang="scss">
@import './assets/css/reset.css';
@import './assets/icon/iconfont.css';
@import './assets/css/config.scss';
@import './assets/css/mixin.scss';
@import './assets/css/button.scss';
</style>
