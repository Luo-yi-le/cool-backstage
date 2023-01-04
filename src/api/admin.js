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
        info(params, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/task/info/info',
                method: 'get',
                params,
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

    department: {
        list(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/department/list',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/department/add',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        order(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/department/order',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/department/delete',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/department/update',
                method: 'post',
                data,
            }, options)
            return request(op)
        }
    },

    user: {
        list(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/user/list',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/user/delete',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/user/add',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/user/update',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        page(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/user/page',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        info(params, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/user/info',
                method: 'get',
                params,
            }, options)
            return request(op)
        },
    },

    menu: {
        list(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/menu/list',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/menu/delete',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/menu/add',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/menu/update',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        page(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/menu/page',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        info(params, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/menu/info',
                method: 'get',
                params,
            }, options)
            return request(op)
        },
    },
    role: {
        list(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/role/list',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        delete(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/role/delete',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        add(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/role/add',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        update(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/role/update',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        page(data, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/role/page',
                method: 'post',
                data,
            }, options)
            return request(op)
        },
        info(params, options = {}) {
            const op = Object.assign({}, {
                url: '/admin/base/sys/role/info',
                method: 'get',
                params,
            }, options)
            return request(op)
        },
    },

}