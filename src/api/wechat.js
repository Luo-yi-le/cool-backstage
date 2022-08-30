import request from '@util/request';

export default {
    getMenu(data, options = {}) {
        const op = Object.assign({}, { url: '/app/wechat/menu/list', method: 'post', data, }, options)
        return request(op)
    },
    saveOrUpdateMenu(data, options = {}) {
        const op = Object.assign({}, { url: '/app/wechat/menu/saveOrUpdateMenu', method: 'post', data, }, options)
        return request(op)
    },
    qrcode(data, options = {}) {
        const op = Object.assign({}, { url: '/app/wechat/other/qrcode', method: 'post', data, }, options)
        return request(op)
    },
    getMessageListPage(data, options = {}) {
        const op = Object.assign({}, { url: '/app/wechat/message/page', method: 'post', data, }, options)
        return request(op)
    },
    getMessageList(data, options = {}) {
        const op = Object.assign({}, { url: '/app/wechat/message/list', method: 'post', data, }, options)
        return request(op)
    }
}