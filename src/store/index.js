import Vue from 'vue'
import Vuex from 'vuex'
// 引用自己的模块加路径，否则会被当做插件
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    username: '',
    cartCount: 0
}


export default new Vuex.Store({
    state,
    actions,
    mutations
})