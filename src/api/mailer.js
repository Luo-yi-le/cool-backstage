import request from '@util/request';

export default {
    mailerUser: {
        page(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/user/page', method: 'post', data, }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/user/add', method: 'post', data, }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/user/update', method: 'post', data, }, options)
            return request(op)
        },
        list(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/user/list', method: 'post', data, }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/user/delete', method: 'post', data, }, options)
            return request(op)
        },
        info(params, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/user/info', method: 'get', params, }, options)
            return request(op)
        },
    },
    mailerAdmin: {
        page(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/admin/page', method: 'post', data, }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/admin/add', method: 'post', data, }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/admin/update', method: 'post', data, }, options)
            return request(op)
        },
        list(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/admin/list', method: 'post', data, }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/admin/delete', method: 'post', data, }, options)
            return request(op)
        },
        info(params, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/admin/info', method: 'get', params, }, options)
            return request(op)
        },
    },
    mailerCategory: {
        page(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/category/page', method: 'post', data, }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/category/add', method: 'post', data, }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/category/update', method: 'post', data, }, options)
            return request(op)
        },
        info(params, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/category/info', method: 'get', params, }, options)
            return request(op)
        },
        list(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/category/list', method: 'post', data, }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/category/delete', method: 'post', data, }, options)
            return request(op)
        },
    },
    mailerRecord: {
        page(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/record/page', method: 'post', data, }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/record/add', method: 'post', data, }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/record/update', method: 'post', data, }, options)
            return request(op)
        },
        list(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/record/list', method: 'post', data, }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/record/delete', method: 'post', data, }, options)
            return request(op)
        },
        info(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/record/info', method: 'get', data, }, options)
            return request(op)
        },
        send(data, options = {}) {
            const op = Object.assign({}, { url: '/admin/mailer/record/send', method: 'post', data, }, options)
            return request(op)
        },
    }
}