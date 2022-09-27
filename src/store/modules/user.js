import { login, logout, getInfo, refreshToken, person, permmenu } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router';

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    roleArray: '',
    userInfo: {},
    tokenInfo: {},
    refreshToken: '',
}
const mutations = {
    SET_ROLE_ARRAY: (state, roleName) => {
        state.roleName = roleName
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
        state.refreshToken = refreshToken
    },
    SET_TOKEN_INFO: (state, tokenInfo) => {
        state.tokenInfo = tokenInfo
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}
const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login(Object.assign({}, userInfo, { username: username.trim(), password: password })).then(response => {
                const { token, refreshToken, role } = response;
                commit('SET_TOKEN', token);
                commit('SET_REFRESH_TOKEN', refreshToken);
                commit('SET_TOKEN_INFO', response);
                setToken(token)
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
                
                commit('SET_ROLES', roles);

                if (!perms || perms.length <= 0) {
                    reject("权限不能为空！")
                }
                commit('SET_USER_INFO', person)
                commit('SET_ROLE_ARRAY', perms)
                commit('SET_NAME', name)
                commit('SET_AVATAR', headImg)
                commit('SET_INTRODUCTION', remark)
                resolve({perms, menus, roles})
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_USER_INFO', {})
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                commit('SET_TOKEN_INFO', {});
                removeToken()
                resetRouter()

                dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    async refreshToken({commit, state}){
        return new Promise((resolve, reject) => {
            refreshToken({
                refreshToken: getToken()
            }).then((res) => {
                setToken(res);
                resolve(res.token);
            })
            .catch((err) => {
                logout();
                reject(err);
            });
        })
    },

    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'

        commit('SET_TOKEN', token)
        setToken(token)

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