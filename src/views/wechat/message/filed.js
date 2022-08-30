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
        prop: 'openid',
        label: 'openid',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('openid'),
    },

    {
        prop: 'FromUserName',
        label: '发送方帐号',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('FromUserName'),
    },
    {
        prop: 'ToUserName',
        label: '开发者微信号',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('ToUserName'),
    },
    {
        prop: 'Content',
        label: '文本消息内容',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('Content'),
    },
    {
        prop: 'PicUrl',
        label: '图片链接',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('PicUrl'),
    },
    {
        prop: 'MediaId',
        label: '消息媒体id',
        type: 'text',
        componentName: 'el-input',
        component: mimi.fileds('MediaId'),
    },
    
    
]