import { login, logout, getInfo, refreshToken, person, permmenu } from '@/api/user'
import { getToken, setToken, removeToken, Key, } from '@/utils/auth'
import router, { resetRouter } from '@/router';
import types from '../mutations/index.type'
const state = {
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    roleArray: '',
    userInfo: {},
    tokenInfo: {},
    refreshToken: '',
    expire: 0,
    refreshExpire: 0
    // Date.parse(String(new Date())) + expires * 1000)
}
const mutations = {
    [types.SET_ROLE_ARRAY]: (state, roleName) => {
        state.roleName = roleName
    },
    [types.SET_REFRESH_TOKEN]: (state, refreshToken) => {
        state.refreshToken = refreshToken
    },
    [types.SET_TOKEN_INFO]: (state, tokenInfo) => {
        state.tokenInfo = tokenInfo
    },
    [types.SET_USER_INFO]: (state, userInfo) => {
        state.userInfo = userInfo
    },
    [types.SET_TOKEN]: (state, token) => {
        state.token = token
    },
    [types.SET_INTRODUCTION]: (state, introduction) => {
        state.introduction = introduction
    },
    [types.SET_NAME]: (state, name) => {
        state.name = name
    },
    [types.SET_AVATAR]: (state, avatar) => {
        state.avatar = avatar
    },
    [types.SET_ROLES]: (state, roles) => {
        state.roles = roles
    },
    [types.SET_EXPIRE]: (state, expire) => {
        state.expire = expire
    },

    [types.SET_REFRESH_EXPIRE]: (state, refreshExpire) => {
        state.refreshExpire = refreshExpire
    },
}
const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login(Object.assign({}, userInfo, { username: username.trim(), password: password })).then(response => {
                const { token, refreshToken, expire, refreshExpire } = response;
                commit(types.SET_TOKEN, token);
                commit(types.SET_REFRESH_TOKEN, refreshToken);
                commit(types.SET_TOKEN_INFO, response);
                setToken(Key.TokenKey, token, expire)

                // 刷新 token 的唯一标识
                setToken(Key.refreshTokenKey, refreshToken, refreshExpire)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    getInfo({ dispatch, commit, state }) {
        return new Promise((resolve, reject) => {

            getInfo().then(response => {
                const { permmenu, person, info } = response
                if (!permmenu && !person) {
                    reject('验证失败，请重新登录。');
                    dispatch('user/logout')
                }
                const { perms, menus } = permmenu;
                const { name, headImg, remark } = person
                const roles = info.label;

                commit(types.SET_ROLES, roles);

                if (!perms || perms.length <= 0) {
                    reject("权限不能为空！")
                }
                commit(types.SET_USER_INFO, person)
                commit(types.SET_ROLE_ARRAY, perms)
                commit(types.SET_NAME, name)
                commit(types.SET_AVATAR, headImg)
                commit(types.SET_INTRODUCTION, remark)
                resolve({ perms, menus, roles })
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        logout(state.token).then(() => {
            commit(types.SET_USER_INFO, {})
            commit(types.SET_TOKEN_INFO, {});

            // this.resetToken()
            removeToken(Key.refreshTokenKey)
            removeToken(Key.TokenKey)
            resetRouter()

            dispatch('tagsView/delAllViews', null, { root: true })

        }).catch(error => {
            console.log(error)
        })

    },
    async refreshToken({ commit, state }) {
        return new Promise((resolve, reject) => {
            refreshToken({
                refreshToken: getToken(Key.refreshTokenKey)
            }).then((response) => {

                const { token, refreshToken, expire, refreshExpire } = response;
                commit(types.SET_TOKEN, token);
                commit(types.SET_REFRESH_TOKEN, refreshToken);
                commit(types.SET_TOKEN_INFO, response);
                setToken(Key.TokenKey, token, expire)

                // 刷新 token 的唯一标识
                setToken(Key.refreshTokenKey, refreshToken, refreshExpire)
                console.log(response)
                resolve(token);
            })
                .catch((err) => {
                    logout();
                    reject(err);
                });
        })
    },

    resetToken({ commit }) {

        commit(types.SET_TOKEN, '')
        commit(types.SET_ROLES, [])
        removeToken(Key.TokenKey)

    },

    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'

        commit(types.SET_TOKEN, token)
        // setToken(token)

        const { roles } = await dispatch('getInfo')

        resetRouter()

        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        router.addRoutes(accessRoutes)

        dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}