import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store';
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress'
const service = axios.create({
    // baseURL: 'https://wulingshan.loca.lt/',
    // baseURL: 'http://127.0.0.1:8001',
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000,
    // withCredentials: true, // 是否发送cookies
})

service.interceptors.request.use(
    config => {
        NProgress.start()
        console.log(store)
        if (store.getters.token) {
            config.headers['Authorization'] = getToken()
        }
        if (config.options && config.options.headers) {
            config.headers = Object.assign({}, config.headers, config.options.headers)
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
);

service.interceptors.response.use(
    response => {
        NProgress.done()
        const res = response.data;
        if (res.code !== 1000) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            if (res.code === 508 || res.code === 512 || res.code === 401) { //假如设定登录信息失效
                MessageBox.confirm('登录信息已失效，请重新登录！', {
                    confirmButtonText: '登 录',
                    cancelButtonText: '关 闭',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res.data
        }
    },
    error => {
        NProgress.done()
        if (error.code === 508 || error.code === 512 || error.code === 401) { //假如设定登录信息失效
            MessageBox.confirm('登录信息已失效，请重新登录！', {
                confirmButtonText: '登 录',
                cancelButtonText: '关 闭',
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            })
        }
        return Promise.reject(error)
    }
)

export default service