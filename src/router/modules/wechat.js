import Layout from '@/views/layout';

const wechatRouter = [{
    path: '/wechat',
    component: Layout,
    redirect: 'menu',
    meta: {
        title: '微信管理',
        icon: 'table'
    },
    children: [{
        path: 'menu',
        component: () =>
            import ('@/views/wechat/menu/index'),
        name: 'User',
        meta: {
            title: '菜单配置',
            roles: ['admin']
        }
    }, 
    {
        path: 'message',
        component: () =>
            import ('@/views/wechat/message/index'),
        name: 'message',
        meta: {
            title: '消息管理',
            roles: ['admin']
        }
    }, 
    {
        path: 'funs',
        component: () =>
            import ('@/views/wechat/funs/index'),
        name: 'funs',
        meta: {
            title: '粉丝管理',
            roles: ['admin']
        }
    },{
        path: 'tags',
        component: () =>
            import ('@/views/wechat/tags/index'),
        name: 'tags',
        meta: {
            title: '粉丝标签',
            roles: ['admin']
        }
    },]
}]

export default wechatRouter