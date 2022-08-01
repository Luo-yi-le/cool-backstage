const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: '管理员',
        avatar: '',
        name: '张三'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: '用户',
        avatar: '',
        name: '李四'
    }
}

module.exports = [{
        url: '/user/login',
        type: 'post',
        response: config => {
            const { username } = config.body
            const token = tokens[username]

            if (!token) {
                return {
                    status: 602,
                    message: '帐号和密码不正确。'
                }
            }

            return {
                status: 200,
                data: token
            }
        }
    },

    {
        url: '/user/info\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            if (!info) {
                return {
                    status: 508,
                    message: '登录失败，无法获取用户详细信息。'
                }
            }

            return {
                status: 200,
                data: info
            }
        }
    },

    {
        url: '/user/logout',
        type: 'post',
        response: _ => {
            return {
                status: 200,
                data: 'success'
            }
        }
    }
]