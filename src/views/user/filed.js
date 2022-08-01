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
        prop: 'phone',
        label: '手机号码',
        type: 'tel',
        componentName: 'el-input',
        component: mimi.fileds('phone', {
            maxlength: 11,
            minlength: 11,
            type: 'tel',
        }),
    },

    {
        prop: 'email',
        label: '邮箱',
        type: 'email',
        componentName: 'el-input',
        component: mimi.fileds('email'),
    },
    {
        prop: 'sex',
        label: '性别',
        type: 'select_one',
        componentName: 'el-select',
        component: mimi.fileds('sex', {
            options: [{
                label: "男",
                value: 1
            }, {
                label: "女",
                value: 0
            }]
        }),


        // formatter: (row) => {
        //     return row.sex
        // },
        // render:(h, scope) => {
        //     return(<span>22222</span>)
        // }
    },
]

export const data = [{
        name: '张三',
        sex: 1
    },
    {
        name: '李四',
        sex: 0
    }
]

export const rules = {
    name: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur'
    }, ],
    sex: [{
        required: true,
        message: '请选择性别',
        trigger: ['blur', 'change']
    }, ],

    phone: [{
            required: true,
            message: '请输入手机',
            trigger: ['blur', 'change']
        },
        {
            validator: mimi.rules.validPhone,
            trigger: 'change'
        }
    ],

    email: [{
        required: true,
        message: '请输入邮箱',
        trigger: ['blur', 'change']
    },
    {
        validator: mimi.rules.validEmail,
        trigger: 'change'
    }
],
}