import request from '@/utils/request';
export function login(data, options = {}) {
    const op = Object.assign({}, { url: '/admin/base/open/login', method: 'post', data, }, options)
    return request(op)
}

export function captcha(data, options = {}) {
    const op = Object.assign({}, { url: '/admin/base/open/captcha', method: 'get', params: data, }, options)
    return request(op)
}
/**
 * 刷新Token
 * @param {*} data 
 * @param {*} options 
 * @returns 
 */
export function refreshToken(data, options = {}) {
    const op = Object.assign({}, { url: '/admin/base/open/refreshToken', method: 'get', params: data, }, options)
    return request(op)
}

/**
 * 获取个人信息
 * @param {*} data 
 * @param {*} options 
 * @returns 
 */
 export function person(data, options = {}) {
    const op = Object.assign({}, { url: '/admin/base/comm/person', method: 'get', data, }, options)
    return request(op)
}

/**
 * 获取权限
 * @param {*} data 
 * @param {*} options 
 * @returns 
 */
 export function permmenu(data, options = {}) {
    const op = Object.assign({}, { url: '/admin/base/comm/permmenu', method: 'get', data, }, options)
    return request(op)
}

export function getInfo(token) {
    return request({
        url: '/admin/base/comm/info',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/admin/base/comm/logout',
        method: 'post'
    })
}

export function getUserList(data, options = {}) {
    const op = Object.assign({}, { url: '/users', method: 'get', params: data, }, options)
    return request(op)
}