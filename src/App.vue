<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Storage from './storage/index'
export default {
  name: 'App',
  components: {
   
  },
  data(){
    return{
    }
  },
  mounted() {
    // Storage.setItem("b", 2)

    //  Storage.setItem('user', {a:1})
    //  Storage.setItem("abc", {a:1,b:2,c:3}, "user")
     Storage.clear("age",'user')
  }, 
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
