import Vue from 'vue'
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios' //可以将axios实例挂载，否则在组件中需要引入axios
import VueLazyload from 'vue-lazyload'
import { Message } from 'element-ui'
import VueCookie from 'vue-cookie'
import App from './App.vue'
import store from './store'
// import env from './env'
import './assets/css/element-variables.scss'

const mock = false //mock的开关
if (mock) {
    require('./mock/api')
}
//根据前端的跨域方式做调整 || 下面的使用于接口代理的跨域方式/api
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5f0432ca0aa1ce4aeb750b0b/api'
//设置超时时间
axios.defaults.timeout = 8000
    // 根据环境变量获取不同的请求地址
    // axios.defaults.baseURL = env.baseURL
    // 接口错误拦截
axios.interceptors.response.use(function(response) {
        // response是经过axios处理后的返回值
        // response.data 才是接口的返回值
        let res = response.data
        let path = location.hash
            // 成功的响应   
        if (res.status == 0) {
            return res.data
        } else if (res.status == 10) { //未登录
            if (path != '#/index') {
                // 防止首页拉取数据的请求导致的自动跳转
                window.location.href = '/#/login' //哈希路由
            }
            return Promise.reject(res)
        } else {
            //alert(res.msg) //错误信息
            Message.warning(res.msg)
            return Promise.reject(res) // 抛出reject以防止进入成功的情况
        }
    }, (error) => {
        let res = error.response
        Message.error(res.data.message)
        return Promise.reject(error)
    }

)
Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
    loading: '/img/loading-svg/loading-bars.svg'
})
Vue.use('element-ui')
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    store
}).$mount('#app')