import {
    deepMerge,
    print,
    renderNode,
    cloneDeep,
    isArray,
    getParent,
    isObject,
    isFunction,
} from './utils';
import { __event } from './options';
import Query from './lib/query';
import AdvSearch from './lib/adv-search';
import DataTable from './lib/table';
import Upsert from './lib/upsert';
import RefreshBtn from './lib/refresh-btn';
import Flex1 from './lib/flex1';
import AddBtn from './lib/add-btn';
import MultiDeleteBtn from './lib/multi-delete-btn';
import AdvBtn from './lib/adv-btn';
import Pagination from './lib/pagination';
import SearchKey from './lib/search-key';
import ErrorMessage from './lib/error-message';
import MenuTree from './lib/menu-tree';
import { bootstrap } from './app';

require('./assets/css/index.css');

export default function ({ __crud, __components }) {
    return {
        name: 'cl-crud',
        componentName: 'ClCrud',

        props: {
            name: String,
        },

        provide() {
            return {
                crud: this,
            };
        },

        data() {
            return {
                id: this.name,
                service: null,
                conf: {
                    UPSERT_REFRESH: true,
                    DELETE_REFRESH: true,
                },
                permission: {},
                fn: {
                    open: null,
                    close: null,
                    submit: null,
                    refresh: null,
                    delete: null,
                    info: null,
                    permission: null,
                    advSearch: null,
                    advReset: null,
                    advOpen: null,
                    advClose: null,
                    resize: null,
                    done: null,
                },
                event: {},
                dict: {
                    api: {
                        list: 'list',
                        add: 'add',
                        update: 'update',
                        delete: 'delete',
                        info: 'info',
                        page: 'page',
                    },
                    pagination: {
                        page: 'page',
                        size: 'size',
                    },
                    search: {
                        keyWord: 'keyWord',
                        query: 'query',
                    },
                    sort: {
                        order: 'order',
                        prop: 'prop',
                    },
                    label: {
                        add: '??????',
                        delete: '??????',
                        update: '??????',
                        refresh: '??????',
                        advSearch: '????????????',
                    },
                },
                tips: {
                    add: {
                        success: '????????????',
                        error: '',
                    },
                    update: {
                        success: '????????????',
                        error: '',
                    },
                    delete: {
                        confirm: '??????????????????????????????????????????????????????',
                        success: '????????????',
                        error: '',
                    },
                },
                table: {
                    visible: true,
                    loading: false,
                    data: [],
                    columns: [],
                    selection: [],
                    props: {
                        border: true,
                        stripe: false,
                        size: 'mini',
                        'element-loading-text': '???????????????...',
                        'element-loading-background': 'rgba(255, 255, 255, 0.7)',
                        'element-loading-spinner': 'el-icon-loading',
                    },
                    on: {},
                    op: {
                        props: {
                            width: 150,
                            align: 'center',
                            fixed: 'right',
                            label: '??????',
                        },
                        visible: true,
                        layout: ['edit', 'delete'],
                    },
                    scopedSlots: {},
                },
                search: {
                    query: {
                        list: [],
                        value: null,
                        multiple: false,
                        callback: null,
                    },

                    key: {
                        placeholder: '??????????????????',
                        selected: '',
                        value: '',
                        list: [],
                        props: {},
                    },

                    adv: {
                        title: '????????????',
                        visible: false,
                        type: 'drawer',
                        items: [],
                        form: {},
                        props: {
                            size: 'small',
                            'label-width': '120px',
                        },
                        op: {
                            visible: false,
                            confirmButtonText: '??????',
                            resetButtonText: '??????',
                            'label-width': '120px',
                        },
                    },
                },
                upsert: {
                    form: {},
                    items: [],
                    props: {
                        drag: true,
                        width: '',
                        size: 'small',
                        'label-width': '80px',
                        'append-to-body': true,
                        'close-on-click-modal': false,
                        'destroy-on-close': true,
                    },
                    hdr: {
                        layout: ['fullscreen', 'close'],
                    },
                    op: {
                        confirmButtonText: '??????',
                        cancelButtonText: '??????',
                        visible: true,
                        layout: ['cancel', 'confirm'],
                    },
                },
                pagination: {
                    props: {
                        background: true,
                        small: false,
                        layout: 'total, sizes, prev, pager, next, jumper',
                        'page-sizes': [20, 50, 100, 200],
                    },
                    size: 20,
                    page: 1,
                    total: 0,
                },
                layout: [
                    [
                        'refresh-btn',
                        'add-btn',
                        'multi-delete-btn',
                        'query',
                        'flex1',
                        'search-key',
                        'adv-btn',
                    ],
                    ['data-table'],
                    ['flex1', 'pagination'],
                ],
                refs: {},
                params: {},
                temp: {
                    refreshRd: null,
                    sortLock: false,
                },
                process: {
                    status: false,
                },
            };
        },

        components: {
            Query,
            AdvSearch,
            DataTable,
            Upsert,
            RefreshBtn,
            AddBtn,
            MultiDeleteBtn,
            SearchKey,
            AdvBtn,
            Pagination,
            Flex1,
            ErrorMessage,
            MenuTree,
            ...__components,
        },

        beforeCreate() {
            // ?????? $crud
            for (let i in __components) {
                const { beforeCreate } = __components[i];

                __components[i].beforeCreate = function (flag) {
                    if (flag) {
                        return false;
                    }

                    this.$crud = {
                        ...this.$crud,
                        ...bootstrap(getParent.call(this, 'ClCrud')),
                    };

                    if (beforeCreate) {
                        if (isArray(beforeCreate)) {
                            beforeCreate.map((e) => {
                                e.call(this, true);
                            });
                        } else {
                            beforeCreate.call(this, true);
                        }
                    }
                };
            }
        },

        mounted() {
            // ????????????
            const res = bootstrap(deepMerge(this, __crud));

            // ????????????
            this.$emit('load', res);

            // ????????????
            for (let i in this.event) {
                let d = this.event[i];
                let mode = null;
                let callback = null;

                if (isObject(d)) {
                    mode = d.mode;
                    callback = d.callback;
                } else {
                    mode = 'on';
                    callback = d;
                }

                if (!['on', 'once'].includes(mode)) {
                    return console.error(`Event[${i}].mode must be (on / once)`);
                }

                if (!isFunction(callback)) {
                    return console.error(`Event[${i}].callback is not a function`);
                }

                __event[`$${mode}`](i, (data) => {
                    callback(data, res);
                });
            }
        },

        methods: {
            // ?????????????????????
            getPermission(key) {
                switch (key) {
                    case 'edit':
                    case 'update':
                        return this.permission['update'];
                    default:
                        return this.permission[key];
                }
            },

            // ????????????
            getLabel(key) {
                switch (key) {
                    case 'edit':
                    case 'update':
                        return this.dict.label['update'];
                    default:
                        return this.dict.label[key];
                }
            },

            // ??????
            rowAdd() {
                this.$refs['upsert'].add();
            },

            // ??????
            rowEdit(e) {
                this.$refs['upsert'].edit(e);
            },

            // ??????
            rowAppend(e) {
                this.$refs['upsert'].append(e);
            },

            // ??????
            rowClose() {
                this.$refs['upsert'].close();
            },

            // ??????
            rowDelete(...selection) {
                const tips = this.tips.delete;

                let params = {
                    ids: selection.map((e) => e.id).join(','),
                };

                const next = (params) => {
                    return new Promise((resolve, reject) => {
                        this.$confirm(tips.confirm, '??????', {
                            type: 'warning',
                        })
                            .then((res) => {
                                if (res === 'confirm') {
                                    const reqName = this.dict.api.delete;

                                    if (!this.service[reqName]) {
                                        return reject(`Request function '${reqName}' is not fount`);
                                    }

                                    this.service[reqName](params)
                                        .then((res) => {
                                            this.$message.success(tips.success);

                                            if (this.conf['DELETE_REFRESH']) {
                                                this.refresh();
                                            }

                                            resolve(res);
                                        })
                                        .catch((err) => {
                                            this.$message.error(tips.error || err);
                                            reject(err);
                                        });
                                }
                            })
                            .catch(() => {});
                    });
                };

                if (this.fn.delete) {
                    this.fn.delete(selection, { next });
                } else {
                    next(params);
                }
            },

            // ????????????
            deleteMulti() {
                this.rowDelete.apply(this, this.table.selection || []);
            },

            // ??????????????????
            openAdvSearch() {
                this.$refs['adv-search'].open();
            },

            // ??????????????????
            closeAdvSearch() {
                this.$refs['adv-search'].close();
            },

            // ????????????
            changeSort(prop, order) {
                if (order === 'desc') {
                    order = 'descending';
                }

                if (order === 'asc') {
                    order = 'ascending';
                }

                this.$refs['table'].sort(this.table.sort.prop, '');
                this.$refs['table'].sort(prop, order);

                this.table.sort = {
                    prop,
                    order,
                };
            },

            // ????????????
            sortChange({ prop, order }) {
                if (order === 'descending') {
                    order = 'desc';
                }

                if (order === 'ascending') {
                    order = 'asc';
                }

                if (this.temp.sortLock) {
                    this.refresh({
                        sort: order,
                        order: prop,
                        // order,
                        page: 1,
                    });
                }
            },

            // ??????????????????
            clearSort() {
                this.$refs['table'].clearSort();
            },

            // ????????????????????????
            paramsReplace(params) {
                const { pagination, search, sort } = this.dict;
                let a = { ...params };
                let b = { ...pagination, ...search, ...sort };

                for (let i in b) {
                    if (a.hasOwnProperty(i)) {
                        if (i != b[i]) {
                            a[`_${b[i]}`] = a[i];

                            delete a[i];
                        }
                    }
                }

                for (let i in a) {
                    if (i[0] === '_') {
                        a[i.substr(1)] = a[i];

                        delete a[i];
                    }
                }

                return a;
            },

            refresh(newParams) {
                // ????????????
                this.params.page = this.pagination.page;
                this.params.size = this.pagination.size;

                // ????????????
                let params = this.paramsReplace(deepMerge(this.params, newParams));

                print('????????????', params);

                // Loading
                this.table.loading = true;

                // ???????????????
                let rd = (this.temp.refreshRd = Math.random());

                // ????????????
                const done = () => {
                    this.table.loading = false;
                };

                // ??????
                const render = (list, pagination) => {
                    // ????????????
                    if (pagination) {
                        Object.assign(this.pagination, pagination);
                    }

                    // ????????????
                    this.table.data = list;
                    done();
                };

                // ????????????
                const next = (params) => {
                    return new Promise((resolve, reject) => {
                        const reqName = this.dict.api.page;

                        if (!this.service[reqName]) {
                            this.table.loading = false;

                            return reject(`Request function '${reqName}' is not fount`);
                        }

                        this.service[reqName](params)
                            .then((res) => {
                                if (rd != this.temp.refreshRd) {
                                    return false;
                                }

                                render(cloneDeep(res.list), res.pagination);
                                resolve(res);
                            })
                            .catch((err) => {
                                this.$message.error(err);
                                reject(err);
                            })
                            .done(() => {
                                done();
                                this.temp.sortLock = true;
                            });
                    });
                };

                if (this.fn.refresh) {
                    return this.fn.refresh(params, { next, done, render });
                } else {
                    return next(params);
                }
            },

            done() {
                this.process.status = true;

                this.$nextTick(() => {
                    if (this.fn.done) {
                        this.fn.done();
                    }
                });
            },
        },

        render() {
            const rn = (vnode) => {
                if (vnode === 'data-table') {
                    return (
                        <data-table
                            ref="table"
                            {...{
                                scopedSlots: this.$scopedSlots,
                                on: {
                                    'sort-change': (event)=> {this.sortChange(event)},
                                },
                            }}
                        />
                    );
                } else {
                    return renderNode.call(this, vnode);
                }
            };

            const template = this.layout.map((e, i) => {
                if (e instanceof Array) {
                    return (
                        <el-row type="flex" class={`el-row--${i}`}>
                            {e.map(rn)}
                        </el-row>
                    );
                } else {
                    return rn(e);
                }
            });

            return (
                this.process.status && (
                    <div class="cl-crud">
                        {template}

                        <adv-search ref="adv-search" />
                        <upsert ref="upsert" />
                    </div>
                )
            );
        },
    };
}