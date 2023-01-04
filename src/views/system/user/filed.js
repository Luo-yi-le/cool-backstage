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
        prop: 'username',
        label: '别名',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('username'),
    },
    {
        prop: 'phone',
        label: '电话',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('phone'),
    },
    
    {
        prop: 'roleName',
        label: '权限',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('roleName'),
    },
    {
        prop: 'email',
        label: '邮箱',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('email'),
    },
    {
        prop: 'headImg',
        label: '头像',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('headImg'),
    },
    {
        prop: 'departmentName',
        label: '部门',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('departmentName'),
    },

    {
        prop: 'status',
        label: '发送状态',
        type: 'select_one',
        disabled: true,
        componentName: 'el-select',
        component: mimi.fileds('status', {
            options: [{
                label: "启用",
                value: 1
            }, {
                label: "禁用",
                value: 0
            }]
        }),
    },
]