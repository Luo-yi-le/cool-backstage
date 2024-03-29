import './utils';
import Vue from 'vue';
import Cookies from 'js-cookie'

import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts';
import element from './plugins/element.js'
import TreeTable from "vue-table-with-tree-grid"


import './utils/permission' // permission
import './utils/error-log'
import './components/icons';
// 树形组件

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'nprogress/nprogress.css'
import './assets/style/element-variables.scss';
import './assets/style/index.scss'
import api from './api';
import * as filters from './filters'
import directives from './directives'
import {createEps } from './service';
Vue.prototype.$mimi = window.mimi;
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor, /* { default global options } */ )
Vue.use(element, { size: Cookies.get('size') || 'medium', })
Vue.use(directives);
import CRUD from 'crud-super'

// window.System.import(`http://127.0.0.1:5500/lib/crud-super.umd.min.js`).then((CRUD) => {
//   Vue.use(CRUD.default, { permission: store.getters.permission_role })
// })
require('crud-super/lib/crud-super.css');
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

Vue.use(CRUD, { permission: store.getters.permissions });
Vue.config.productionTip = false
createEps().then(res=>{
    // console.log(res)
}).catch(err=>{})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
