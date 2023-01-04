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
            input: (event) => eventBus.$emit('_handlerBusInput', {
                event,
                key
            }),
            change: (event) => eventBus.$emit('_handlerBusChange', {
                event,
                key
            }),
            clear: (event) => eventBus.$emit('_handlerBusClear', {
                event,
                key
            }),
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

// 树形转列表
export function revDeepTree(list) {
    const arr = [];
    let id = 0;

    function deep(list, parentId) {
        list.forEach((e) => {
            if (!e.id) {
                e.id = id++;
            }

            if (!e.parentId) {
                e.parentId = parentId;
            }

            arr.push(e);

            if (e.children && script.isArray(e.children)) {
                deep(e.children, e.id);
            }
        });
    }

    deep(list || [], 0);

    return arr;
}

// 列表转树形
export function deepTree(list) {
    const newList = [];
    const map = {};

    list.forEach((e) => (map[e.id] = e));

    list.forEach((e) => {
        const parent = map[e.parentId];

        if (parent) {
            (parent.children || (parent.children = [])).push(e);
        } else {
            newList.push(e);
        }
    });

    const fn = (list) => {
        list.map((e) => {
            if (script.isArray(e.children)) {
                e.children = _.orderBy(e.children, "orderNum");
                fn(e.children);
            }
        });
    };

    fn(newList);

    return _.orderBy(newList, "orderNum");
}

// 浏览器信息
export function getBrowser() {
    const {
        clientHeight,
        clientWidth
    } = document.documentElement;

    // 浏览器信息
    const ua = navigator.userAgent.toLowerCase();

    // 浏览器类型
    let type = (ua.match(/firefox|chrome|safari|opera/g) || "other")[0];

    if ((ua.match(/msie|trident/g) || [])[0]) {
        type = "msie";
    }

    // 平台标签
    let tag = "";

    const isTocuh =
        "ontouchstart" in window || ua.indexOf("touch") !== -1 || ua.indexOf("mobile") !== -1;
    if (isTocuh) {
        if (ua.indexOf("ipad") !== -1) {
            tag = "pad";
        } else if (ua.indexOf("mobile") !== -1) {
            tag = "mobile";
        } else if (ua.indexOf("android") !== -1) {
            tag = "androidPad";
        } else {
            tag = "pc";
        }
    } else {
        tag = "pc";
    }

    // 浏览器内核
    let prefix = "";

    switch (type) {
        case "chrome":
        case "safari":
        case "mobile":
            prefix = "webkit";
            break;
        case "msie":
            prefix = "ms";
            break;
        case "firefox":
            prefix = "Moz";
            break;
        case "opera":
            prefix = "O";
            break;
        default:
            prefix = "webkit";
            break;
    }

    // 操作平台
    const plat = ua.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();

    // 屏幕信息
    let screen = "full";

    if (clientWidth < 768) {
        screen = "xs";
    } else if (clientWidth < 992) {
        screen = "sm";
    } else if (clientWidth < 1200) {
        screen = "md";
    } else if (clientWidth < 1920) {
        screen = "xl";
    } else {
        screen = "full";
    }

    // 是否 ios
    const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    // 浏览器版本
    const version = (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];

    // 是否 PC 端
    const isPC = tag === "pc";

    // 是否移动端
    const isMobile = isPC ? false : true;

    // 是否移动端 + 屏幕宽过小
    const isMini = screen === "xs" || isMobile;

    return {
        height: clientHeight,
        width: clientWidth,
        version,
        type,
        plat,
        tag,
        prefix,
        isMobile,
        isIOS,
        isPC,
        isMini,
        screen
    };
}

export function deepMerge(a, b) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
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