const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./modules/user');
const wechat = require('./modules/wechat');


const mocks = [
    ...user,
    ...wechat,
];


function mockXHR() {
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
    console.log(Mock.XHR)
    Mock.XHR.prototype.send = function() {
        if (this.custom.xhr) {
            this.custom.xhr.withCredentials = this.withCredentials || false

            if (this.responseType) {
                this.custom.xhr.responseType = this.responseType
            }
        }
        this.proxy_send(...arguments)
    }


    function XHR2ExpressReqWrap(respond) {
        return function(options) {
            let result = null
            if (respond instanceof Function) {
                const { body, type, url } = options
                // https://expressjs.com/en/4x/api.html#req
                result = respond({
                    method: type,
                    body: JSON.parse(body),
                    query: param2Obj(url)
                })
            } else {
                result = respond
            }
            return Mock.mock(result)
        }
    }

    for (const i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
    }
}

module.exports = {
    mocks,
    mockXHR
}