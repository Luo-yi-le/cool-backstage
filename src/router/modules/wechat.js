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
        name: 'User',
        meta: {
            title: '消息管理',
            roles: ['admin']
        }
    }, ]
}]

export default wechatRouter