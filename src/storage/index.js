/* 
  storage 封装
*/
//user: {userName: "jackson", age: 30, gender: 1}
const STORAGE_KEY = 'mall'
export default {
    /* 存储值 */ // setItem（a， 1，user）
    setItem(key, value, module_name) {
        if (module_name) {
            let val = this.getItem(module_name)
                //{userName: "jackson", age: 30, gender: 1} val
            val[key] = value //val[a] = 1
            this.setItem(module_name, val)
        } else {
            // 在该模块同级下存储数据
            let val = this.getStorage()
            val[key] = value
                // 将mall重新覆盖，且此时val为json对象，需要转化为字符串
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
        }
    },
    /* 取某个值 */ //user: {userName: "jackson", age: 30, gender: 1}
    getItem(key, module_name) { //getItem(userName，user)
        if (module_name) {
            let val = this.getItem(module_name)
            if (val) return val[key]
        }
        return this.getStorage()[key]
    },
    /* 取出所有zhi */
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem('mall' || '{}'))
    },
    /* 清除某个值 */
    clear(key, module_name) {
        let val = this.getStorage()
        if (module_name) {
            if (!val[module_name]) return;
            delete val[module_name][key]
        } else {
            delete val[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
}