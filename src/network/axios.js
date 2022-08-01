import Vue from 'vue'
import axios from 'axios'

// 导入 Nprogress 对应的JS和CSS
import NProgress from "nprogress"
import "nprogress/nprogress.css"

axios.defaults.baseURL = `https://bookbook.cc/api/shopping-system-v3/`

// 添加 请求头 和 进度条 NProgress.start()
axios.interceptors.request.use(config => {
    // 添加 进度条
    NProgress.start()

    // 添加请求头
    config.headers.Authorization = window.sessionStorage.getItem('token')

    return config
})

axios.interceptors.response.use(config => {
    // 隐藏 进度条
    NProgress.done()
    return config
})



Vue.prototype.$http = axios