import Cookies from 'js-cookie'

export const Key ={
    TokenKey: 'TokenKey',
    refreshTokenKey: 'refreshTokenKey'
};

export function getToken(key = Key.TokenKey) {
    return Cookies.get(key)
}

/**
 * 
 * @param {*} key 存储key
 * @param {*} token 
 * @param {*} expires 有效时间
 * @returns 
 */
export function setToken(key = Key.TokenKey, token, expires) {
    let time = new Date(new Date() * 1 + expires * 1000)
    return Cookies.set(key, token, { expires: time })
}

export function removeToken(key = Key.TokenKey) {
    return Cookies.remove(key)
}