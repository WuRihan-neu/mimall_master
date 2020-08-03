<template>
 <div class="register">
     <div class="reg-mi">
            <h1 class="logo">
                <a href="/#/index" class="mi">
                    <span class="iconfont">&#xecbf;</span>
                </a>
            </h1>
            <h2>注册小米账号</h2>
            <div class="username">
                <span>用户名</span>
                <input type="text" name="username" placeholder="请输入用户名:" v-model="username">
            </div>
            <div class="password">
                <span>密码</span>
                <input type="password" name="password" placeholder="请输入密码:" v-model="password">
            </div>
            <div class="email">
                <span>邮箱</span>
                <input type="email" name="email" placeholder="请输入邮箱:" v-model="email">
            </div>
            <div class="reg">
                <a class="btn btn-register" @click="register">立即注册</a>
            </div>
            <p>已阅读并同意：小米 <span>用户协议</span>和 <span>隐私政策</span></p>
     </div>
    <nav-footer></nav-footer>
 </div>

</template>

<script>
import NavFooter from './../components/NavFooter'
export default {
   name:'register',
   data() {
       return {
           username:'',
           password:'',
           email:''
       }
   },
   components:{
       NavFooter
   },
   methods: {
        register(){
            let {username, password, email} = this
            this.axios.post('/api/user/register', {
                username,
                password,
                email
            })
            .then(() => {
                this.$message.success('注册成功')
                this.$router.push('/login')
            })
        }
     }
}
</script>

<style lang="scss">
.register{
    width: 100%;
    background-color: #f9f9f9;
    .reg-mi{
        width: 854px;
        margin: 0 auto;
        padding-bottom: 10px;
        background-color: #fff;
        text-align: center;
        .logo{
            margin: 0 auto;
            float:none;
            margin-bottom: 46px;
            &:hover{
            .mi {
            left: 0;
            }
            }
        }
        h2{
        font-size:30px;
        font-weight: 400;
        color: #333;
        margin-bottom: 54px;
        }
        div{
            margin-bottom: 67px;
            position: relative;
            span{
                position: absolute;
                top:-20px;
                font-size: 14px;
            }
            input{
                width: 332px;
                height: 42px;
                border:1px solid #E5E5E5
            }
            &:nth-last-child(3){
                margin-bottom: 47px;
            }
            &:last-child{
                margin-bottom: 57px;
            }
        }
        p{
            color: #999999;
            font-size: 14px;
            span{
                color: #000;
                font-weight: 400;
            }
        }
  }  
}
</style>