import request from '@util/request';

export default {
    getMenu(data, options = {}) {
        const op = Object.assign({}, { url: '/admin/wechat/menu/list', method: 'post', data, }, options)
        return request(op)
    },
    saveOrUpdateMenu(data, options = {}) {
        const op = Object.assign({}, { url: '/admin/wechat/menu/saveOrUpdateMenu', method: 'post', data, }, options)
        return request(op)
    },
    qrcode(data, options = {}) {
        const op = Object.assign({}, { url: '/interaction/qrcode', method: 'post', data, }, options)
        return request(op)
    },
    getMessageListPage(data, options = {}) {
        const op = Object.assign({}, { url: '/admin/wechat/message/page', method: 'post', data, }, options)
        return request(op)
    },
    getMessageList(data, options = {}) {
        const op = Object.assign({}, { url: '/admin/wechat/message/list', method: 'post', data, }, options)
        return request(op)
    },
    loadConfigData(data, options = {}) {
        const op = Object.assign({}, { url: '/interaction/loadConfigData', method: 'get', params: data, }, options)
        return request(op)
    },
    funs: {
        get(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/funs/getFuns', method: 'post', data, }, options)
            return request(op)
        },
        list(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/funs/list', method: 'post',  data, }, options)
            return request(op)
        },
        page(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/funs/page', method: 'post',  data, }, options)
            return request(op)
        },
    },
    tags: {
        get(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/tags/getWxTags', method: 'post',  data, }, options)
            return request(op)
        },
        list(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/tags/list', method: 'post',data, }, options)
            return request(op)
        },
        page(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/tags/page', method: 'post', data, }, options)
            return request(op)
        },
        create(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/tags/createTags', method: 'post', data, }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/tags/updateTags', method: 'post', data, }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/tags/deleteTags', method: 'post', data, }, options)
            return request(op)
        },
        batchtag(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/wechat/tags/batchtag', method: 'post', data, }, options)
            return request(op)
        },
    }
}