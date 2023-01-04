export const column = [{
        label: '序号',
        type: 'selection',
        disabled: true
    },
    {
        prop: 'name',
        label: '名字',
        type: 'text',
        componentName: 'el-input',
        rules: [{
            required: true,
            message: '请输名字',
            trigger: ['blur', 'change']
        }, ],
        component: mimi.fileds('name'),
    },
    {
        prop: 'host',
        label: '发信邮箱服务商',
        type: 'text',
        componentName: 'el-input',
        rules: [{
            required: true,
            message: '请输名字',
            trigger: ['blur', 'change']
        }, ],
        component: mimi.fileds('host'),
    },
    {
        prop: 'secure',
        label: '使用 SSL',
        type: 'select_one',
        componentName: 'el-select',
        component: mimi.fileds('secure', {
            options: [{
                label: "是",
                value: 1
            }, {
                label: "否",
                value: 0
            }]
        }),
    },

    {
        prop: 'port',
        label: 'SMTP 端口',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('port'),
    },
    {
        prop: 'status',
        label: '状态',
        type: 'select_one',
        componentName: 'el-select',
        component: mimi.fileds('status', {
            options: [{
                label: "启用",
                value: 1
            }, {
                label: "不启用",
                value: 0
            }]
        }),
    },
    {
        prop: 'remark',
        label: '备注',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('remark'),
    },
]