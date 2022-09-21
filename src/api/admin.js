import request from '@/utils/request';

export default {
    getLog(data, options = {}) {
        const op = Object.assign({}, {
            url: '/admin/base/sys/log/page',
            method: 'post',
            data,
        }, options)
        return request(op)
    },
    task: {
        once(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/once',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        stop(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/stop',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        log(params, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/log',
                method: 'get',
                params,
            }, options)
            return request(op)
        },
        addOrUpdate(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/addOrUpdate',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/delete',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        start(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/start',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/add',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/update',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        info(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/info',
                method: 'get',
                data,
            }, options)
            return request(op)
        },
        page(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/page',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
    },

}