import eventBus from './eventBus';
import vue from './vue';
import map from './map_utils';
import socket from './socket_service';
import theme from './theme_utils';
import format from './make'
import script from './script';
import dom from './dom';
import lodash from './lodash';
import rules from './rules';
import _ from 'lodash';

export function filedParams(key, params = {}) {
    const defaultParams = {
        optionsLabelKey: "label",
        optionsValueKey: "value",
        disabled: false,
        listeners: {
            input: (event) => eventBus.$emit('_handlerBusInput', { event, key }),
            change: (event) => eventBus.$emit('_handlerBusChange', { event, key }),
            clear: (event) => eventBus.$emit('_handlerBusClear', { event, key }),
        },
        ...params
    }
    return defaultParams
}

/**
 * 检查元素是否有类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 将类添加到元素
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 从元素中删除类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

window.mimi = {
    bus: eventBus,
    vue,
    socket,
    format: {
        ...format
    },
    script,
    dom,
    _: lodash,
    fileds: filedParams,
    rules,
}