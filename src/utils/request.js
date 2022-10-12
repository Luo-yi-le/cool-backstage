import axios from 'axios'
import {
    MessageBox,
    Message
} from 'element-ui'
import store from '@/store';
import {
    getToken,
    Key
} from '@/utils/auth';
import NProgress from 'nprogress'
const service = axios.create({
    // baseURL: 'https://wulingshan.loca.lt/',
    // baseURL: 'http://127.0.0.1:8001',
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000,
    // withCredentials: true, // 是否发送cookies
})

let queue = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken; //引入取消请求方法

// 拼接请求的url和方法，同样的url+方法可以视为相同的请求
const action = (config) => {
    return `${config.url}_${config.method}`
}
// 中断重复的请求，并从队列中移除
const removeQueue = (config) => {
    for (let i = 0, size = queue.length; i < size; i++) {
        const task = queue[i];
        if (task.token === action(config)) {
            task.cancel();
            queue.splice(i, 1);
        }
    }
}

// 是否刷新中
let isRefreshing = false;
service.interceptors.request.use(
    config => {
        removeQueue(config); // 中断之前的同名请求

        const {
            state,
            dispatch
        } = store;
        NProgress.start();
        if (config.url?.includes("refreshToken")) {
            return config;
        }
        if (!getToken(Key.TokenKey)) {

            // 判断 refreshToken 是否过期
            if (!getToken(Key.refreshTokenKey)) {
                return dispatch('user/logout')
            }

            // 是否在刷新中
            if (!isRefreshing) {
                isRefreshing = true;
                dispatch('user/refreshToken').then((token) => {
                        config.headers["Authorization"] = token;
                        isRefreshing = false;
                    })
                    .catch(() => {
                        dispatch('user/logout');
                        location.reload()
                    });
            }

            // 添加cancelToken
            config.cancelToken = new cancelToken((c) => {
                queue.push({
                    token: action(config),
                    cancel: c
                });
            });
        }
        if (config.options && config.options.headers) {
            config.headers = Object.assign({}, config.headers, config.options.headers)
        }
        config.headers['Authorization'] = getToken('TokenKey')
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
        // 在请求完成后，自动移出队列
        removeQueue(response.config);

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
                    store.dispatch('user/logout');
                    location.reload()
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
                store.dispatch('user/logout');
                location.reload()
            })
        }
        return Promise.reject(error)
    }
)

export default service