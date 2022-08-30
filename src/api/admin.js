import request from '@/utils/request';

export default {
    getLog(data, options = {}) {
        const op = Object.assign({}, {
            url: '/admin/base/sys/log/page',
            method: 'post',
            data,
        }, options)
        return request(op)
    }
}