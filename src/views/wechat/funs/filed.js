export const column = [{
        label: '序号',
        type: 'selection',
        disabled: true
    },
    {
        prop: 'nickname',
        label: '名字',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('nickname'),
    },
    {
        prop: 'subscribe_scene',
        label: '关注渠道',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('subscribe_scene'),
    },
    {
        prop: 'tagid_list',
        label: '粉丝标签',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('tagid_list'),
    },
    
    {
        prop: 'openid',
        label: 'openid',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('openid'),
    },
    {
        prop: 'sex',
        label: '性别',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('sex'),
    },
    {
        prop: 'city',
        label: '城市',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('city'),
    },
    {
        prop: 'province',
        label: '省',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('province'),
    },
    {
        prop: 'country',
        label: '国家',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('country'),
    }
    
    
]