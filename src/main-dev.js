import './utils';
import Vue from 'vue';
import Cookies from 'js-cookie'

import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts';
import element from './plugins/element.js'
import './utils/permission' // permission
import './utils/error-log'
Vue.prototype.$mimi = window.mimi;
import * as filters from './filters'

import './components/icons';
// 树形组件
import TreeTable from "vue-table-with-tree-grid"
Vue.component('tree-table', TreeTable)

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, /* { default global options } */ )
Vue.use(element, { size: Cookies.get('size') || 'medium', })
import './assets/style/element-variables.scss';
import './assets/style/index.scss'
import api from './api';
Vue.prototype.$api = api
// 把echarts挂载到 Vue原型上，以便在全局访问
Vue.prototype.$echarts = echarts

// 定义全局时间过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// if (process.env.NODE_ENV === 'development') {
//     const { mockXHR } = require('./mock')
//     mockXHR()
// }

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')