import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store';
import { getToken } from '@/utils/auth';

const service = axios.create({
    // baseURL: 'https://bookbook.cc/api/shopping-system-v3',
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000,
    // withCredentials: true, // 是否发送cookies
})

service.interceptors.request.use(
    config => {
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
        const res = response.data;
        if (res.status !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            if (res.status === 508 || res.status === 512 || res.status === 514) { //假如设定登录信息失效
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
            return res
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service