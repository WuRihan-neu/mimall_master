export default {
    saveUserName(context, username) {
        context.commit('saveUserName', username)
    },
    saveCartCount({ commit }, num) {
        commit('saveCartCount', num)
    }
}