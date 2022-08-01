import moment from 'moment';

const defaultFormats = {
    number({ args: [value] }) {
        return value === null || isNaN(value) ? "-" : `${mimi.script.formatNum(value)}`;
    },

    text({ args: [value] }) {
        return value ? value : '--';
    },
    percent({ args: [value] }) {
        return `${value}%`
    },
    date({ args: [value, meta] }) {
        const formatStr = meta.format || 'YYYY-MM-DD'
        return moment(+value).format(formatStr)
    },
    month({ args: [value, meta] }) {
        const formatStr = meta.format || 'YYYY-MM'
        return moment(+value).format(formatStr)
    },
    date_hms({ args: [value, meta] }) {
        const formatStr = meta.format || 'YYYY-MM-DD HH:mm:ss'
        return moment(+value).format(formatStr)
    },
    email({ args: [value,  meta] }) {
        if (!value) {
            return value;
        }
        return `<a href="mailto:${value}" onclick="mimi.dom.stop()">${value}</a>`;
    },
    url({ args: [value, meta] }) {
        if (!value) {
            return value;
        }
        let schema = '';
        if (!/^https?:\/\//.test(value)) {
            schema = 'http://';
        }
        return `<a href="${schema}${value}" onclick="mimi.dom.stop()" class="go-url" target="_blank">${value}</a>`;
    },
    bool({ args: [value] }) {
        return value ? '是' : '否';
    },
    select_one({ args: [value, meta] }) {
        return (meta.options || meta.component.options.find((ii) => {
            return ii.value === value
        }) || {}).label
    },
    select_many({ args: [value, meta] }) {
        if (value.length == 0 || !Array.isArray(value)) {
            return '--'
        } else {
            let list = ""
            meta.options || meta.component.options.forEach((item, index, arr) => {
                value.forEach((item1, index1, arr1) => {
                    if (item.value == item1) {
                        list += item.label + ', '
                    }
                })
            })
            list = list.substring(0, list.length - 2)
            return list
        }

    },
    tree_select({ args: [value, moment, meta] }) {
        const { optionKey } = meta.scene;
        if (!value.length) {
            return value[optionKey ? optionKey.label : 'id'];
        } else {
            return value.map(item => item[optionKey ? optionKey.label : 'id']).join(' , ');
        }
    },
    cascade({ args: [value] }) {
        return value.map(item => item.label).join('/');
    },
    fileSize({ args: [value, moment, meta, row] }) {
        if (typeof value !== 'number' || row.isFolder) {
            return '-';
        }
        if (value >= 0 && value < 1024) {
            return `${value} B`;
        }
        if (value / 1024 >= 1 && value / 1024 / 1024 < 1) {
            const num = parseFloat((value / 1024).toFixed(2));
            return `${num} KB`;
        }
        if (value / 1024 / 1024 >= 1) {
            const num = parseFloat((value / 1024 / 1024).toFixed(2));
            return `${num} MB`;
        }
        return '-';
    },

};
const factory = () => {
    ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'YYYY-MM', 'YYYY', 'yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm', 'yyyy-MM-dd', 'yyyy-MM', 'yyyy', 'HH:mm'].forEach(key => {
        defaultFormats[key] = ({ args: [value] }) => {
            key = key.replace('yyyy-MM-dd', 'YYYY-MM-DD');
            key = key.replace('yyyy', 'YYYY');
            // 兼容 date_range
            if (Array.isArray(value)) {
                return defaultFormats.date_range({ args: [value, moment, key] });
            }
            if (value === "" || value === null) {
                return "-";
            }
            return moment(value).format(key);
        };
    });
};
factory();

export default {
    make(type, value, meta, ...args) {
        if (!type) return value
        if (type === 'number' && value === 0) {
            return value
        } else {
            if (value === null || value === undefined || value === '') return '-'
        }
        const params = [value, meta, ...args]
        if (defaultFormats[type]) {
            return defaultFormats[type]({ args: params })
        }
        return "--"
    },

    assert(type) {
        return defaultFormats[type]
    },

    async asyncMake(format, value, ...args) {
        if (!format) {
            return value;
        }
        if (value == null) {
            return '-';
            // return value;
        }
        const params = [value, moment, ...args];
        if (typeof format === 'string') {
            if (typeof defaultFormats[format] === 'function') {
                return defaultFormats[format]({ args: params });
            }
            return mimi.script.exec(format, null, params);
        } else if (typeof format === 'function') {
            return await format({ args: params });
        }
        return value;
    }
};