<template>
<div class="login-page">
    <div class="login-header w">
        <div class="logo-container">
            <div class="logo-wrap">
                <h1 class="logo">
                    <a href="/#/index" class="house">
                        <span class="iconfont">&#xe69b;</span>
                    </a>
                    <a href="/#/index" class="mi">
                        <span class="iconfont">&#xecbf;</span>
                    </a>
                </h1>
                <h2>小米商城</h2>
                <i>让每个人都能享受到科技的乐趣</i>
            </div>
        </div>
    </div>
    <div class="login-body">
        <div class="wrapper">
            <div class="container">
                <div class="main-box">
                    <div class="form-header">
                        <a href="javascript:;" class="password-login">账号登录</a>
                        <i class="line">|</i>
                        <a href="javascript:;" class="qrcode-login">扫码登录</a>
                    </div>
                    <div class="input">
                        <input type="text"  placeholder="请输入账号" v-model="username">
                    </div>
                    <div class="password">
                        <input type="password"  placeholder="请输入密码" v-model="password">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn btn-login" @click="login">登录</a>
                    </div>
                    <div class="tips">
                        <p>
                            <a href="javascript:;">手机短信登录/</a>
                            <a href="/#/register">注册</a>
                        </p>
                        <p>
                            <a href="/#/register">立即注册</a>
                            <i class="line">|</i>
                            <a href="javascript:;">忘记密码？</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="login-footer clearfix">
        <div class="wrapper">
        <a href="https://github.com/WuRihan-neu?tab=repositories" target="_blank">GitHub</a><span class="line">|</span>
        <a href="https://wurihan-neu.github.io/">我的博客</a><span class="line">|</span>
        <a href="/description.md">功能说明</a>
        <p class="copyright">
          Copyright ©2019 mi.futurefe.com All Rights Reserved.                    
        </p>
        </div>
    </div>
</div>
</template>
    
<script>
import { mapActions } from 'vuex'
export default {
    name:'login',
    data(){
        return{
           username:'',
           password:'',
           userId:'',
           res:{}
        }
    },
    methods: {
       login(){
        let {username, password} = this
        this.axios.post('/api/user/login', {
            username,
            password
        })
        .then((res) => {
            this.$cookie.set('userId', res.id, {expires:'Session'})
            this.saveUserName(res.username)
            // this.$store.dispatch('saveUserName', res.username)
            this.$router.push({
                name:'index',
                params:{
                    from:'login'
                }
            })
        }) 
       },
       ...mapActions(['saveUserName']),
    },
    component:{
        
    }
}
</script>
<style lang="scss">
@import "./../assets/css/config.scss";
@import "./../assets/css/mixin.scss";
.login-page{
    .login-header{
        height: 112px;
        line-height: 112px;
        .logo-container{
           width: 1130px;
           margin:0 auto;
           height: 98px;
           .logo-wrap{
                position: relative;
                width: 215px;
                height: 98px;
                .logo{
                    margin-top:21.5px;
                }
                h2{
                    width:134px;
                    height:32px;
                    font-size:33px;
                    font-weight: 600;
                    color: $colorB;
                    float: left;
                    position: absolute;
                    left: 68px;
                    top:-15px;
                }
                i{
                    font-size:10px;
                    color: $colorC;
                    position: absolute;
                    left: 68px;
                    top: 15px;
                }
            }
        }
    }
}
.login-body{
    background: url(/img/login-bg.jpg) no-repeat center;
    height: 576px;
    .main-box{
        width: 410px;
        height: 510px;
        background-color: $colorG;
        position: absolute;
        right: 40px;
        top: 36px;
        .form-header{
            width: 410px;
            font-size:24px;
            color: $colorA;
            height: 83px;
            line-height: 83px;
            text-align: center;
            .password-login{
                color: $colorA;
            }
            .line{
                margin:0 20px;
                color: $colorF;
            }
            .qrcode-login{
               color: $colorC;
               &:hover{
                 color: $colorA;
               }
            }
        }
        .input{
            height: 70px;
            width: 410px;
            @include flex();
            input{
                height: 50px;
                width: 348px;
                border: 1px solid $colorH;
                &::placeholder{
                    color: $colorD;
                }
            }
        }
        .password{
            height: 70px;
            width: 410px;
            @include flex();
            margin-bottom: 15px;
            input{
                height: 50px;
                width: 348px;
                border: 1px solid $colorH;
                &::placeholder{
                    color: $colorD;
                }
            }
        }
        .btn-box{
            @include flex();
        }
        .tips{
            width: 348px;
            padding:8px 31px;
            @include flex(space-between,center,row);
            p{
                font-size:14px;
                &:first-child{
                   a{
                     color: $colorA;
                   } 
                }
                &:last-child{
                    .line{
                        color: $colorD;
                        margin:0 4px;
                    }
                    a{
                     color: $colorD;
                     &:hover{
                         color: $colorA;
                     }
                    }    
                }
            }
        }
    }
}
.login-footer{
    height: 180px;
    box-sizing: border-box;
    .wrapper{
        text-align: center;
        color:$colorC;
        font-size: 14px;
        height: 80px;
        margin-top:100px;
        a{
          color:$colorC;
          &:hover{
            color:$colorI;  
          }
        }
        .line{
          margin:0 16px;
        }
        p{
          margin-top:5px;
        }
    }
}
</style>
