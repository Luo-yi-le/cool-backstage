export const column = (__this) => [{
        label: '序号',
        type: 'selection',
        disabled: true
    },
    {
        prop: 'category',
        label: '邮箱服务',
        type: 'text',
        type: 'select_one',
        componentName: 'el-select',
        component: mimi.fileds('category', {
            filterable: true,
            clearable: true,
            options: __this.mailerCategory || [],
        }),
        rules: {
            required: true,
            message: "邮箱服务不能为空"
        }
    },
    {
        prop: 'name',
        label: '名字',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('name'),
        rules: {
            required: true,
            message: "邮箱服务不能为空"
        }
    },
    {
        prop: 'from',
        label: '发信邮箱账号',
        type: 'text',
        componentName: 'el-select',
        rules: {
            required: true,
            message: "邮箱服务不能为空"
        },
        component: mimi.fileds('from', {
            filterable: true,
            clearable: true,
            options: __this.mailerAdmin || [],
        }),
    },
    {
        prop: 'to',
        label: '收信人邮箱',
        type: 'text',
        componentName: 'el-select',
        component: mimi.fileds('to', {
            filterable: true,
            multiple: true,
            clearable: true,
            options: __this.mailerUser || [],
        }),
    },
    
    {
        prop: 'subject',
        label: '发送的主题',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('subject'),
    },
    {
        prop: 'cc',
        label: '抄送',
        type: 'text',
        componentName: 'el-select',
        component: mimi.fileds('cc', {
            filterable: true,
            multiple: true,
            clearable: true,
            options: __this.mailerAdmin || [],
        }),
    },
    {
        prop: 'bcc',
        label: '密送',
        type: 'text',
        componentName: 'el-select',
        component: mimi.fileds('bcc', {
            multiple: true,
            filterable: true,
            clearable: true,
            options: __this.mailerAdmin || [],
        }),
    },
    {
        prop: 'html',
        label: '发送的内容',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('html', {
            type: "textarea",
            row: 1
        }),
    },
    
    {
        prop: 'status',
        label: '发送状态',
        type: 'select_one',
        disabled: true,
        componentName: 'el-select',
        component: mimi.fileds('status', {
            options: [{
                label: "成功",
                value: 1
            }, {
                label: "失败",
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