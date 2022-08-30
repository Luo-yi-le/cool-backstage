import Layout from '@/views/layout';

const LogRouter = [{
    path: '/log',
    component: Layout,
    redirect: 'index',
    meta: {
        title: '日志管理',
        icon: 'table'
    },
    children: [{
        path: 'index',
        component: () =>
            import('@/views/log/index'),
        name: 'logger',
        meta: {
            title: '日志管理',
            roles: ['admin']
        }
    }, ]
}]

export default LogRouter