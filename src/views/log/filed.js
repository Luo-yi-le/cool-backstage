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
        prop: 'ip',
        label: 'IP',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('ip'),
    },

    {
        prop: 'ipAddr',
        label: 'IP地址',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('ipAddr'),
    },
    {
        prop: 'action',
        label: '操作路径',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('action'),
    },
    {
        prop: 'params',
        label: '参数',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('params'),
    },    
    
]