import './utils';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.prototype.$mimi = window.mimi;
// import echarts from 'echarts' //CDN
// import './plugins/element.js' //CDN
import * as filters from './filters'
import './components/icons'
import './utils/permission' // permission
import './utils/error-log'


// 导入已配置好的依赖 axios
import './network/axios'

// 树形组件
import TreeTable from "vue-table-with-tree-grid"
Vue.component('tree-table', TreeTable)

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor, /* { default global options } */ )

import './assets/style/element-variables.scss';
import './assets/style/index.scss'

 // 引入 socket_service
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('./mock')
    mockXHR()
}
// 把echarts挂载到 Vue原型上，以便在全局访问
Vue.prototype.$echarts = echarts

// 定义全局时间过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')