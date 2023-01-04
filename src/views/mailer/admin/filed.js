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
        component: mimi.fileds('name'),
    },
    {
        prop: 'toMail',
        label: '邮箱账号',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('toMail'),
        rules: [{
                required: true,
                message: '请输入邮箱',
                trigger: ['blur', 'change']
            },
            {
                validator: mimi.rules.validEmail,
                trigger: 'change'
            }
        ],
    },
    {
        prop: 'pass',
        label: '邮箱密码',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('pass'),
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