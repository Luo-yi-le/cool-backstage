import loadMoreData from './modules/loadMoreData'
// 自定义指令
const directives = {
    loadMoreData
}
export default {
    install(Vue) {
        Object.keys(directives).forEach((key) => {
            Vue.directive(key, directives[key])
        })
    },
}