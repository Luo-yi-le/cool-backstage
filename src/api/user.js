import request from '@/utils/request';
export function login(data, options = {}) {
    const op = Object.assign({}, { url: '/user/login', method: 'post', data, }, options)
    return request(op)
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {

    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function getUserList(data, options = {}) {
    const op = Object.assign({}, { url: '/users', method: 'get', params: data, }, options)
    return request(op)
}