export default {
    validPhone(rule, value, callback) {
        if (!/^1[3456789]\d{9}$/.test(value)) {
            return callback(new Error('手机号不正确！'));
        }
        callback()
    },

    validEmail(rule, value, callback) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!reg.test(value)) {
            return callback(new Error('邮箱格式不正确！'));
        }
        callback()
    }
}