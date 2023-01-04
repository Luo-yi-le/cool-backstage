import Layout from '@/views/layout';

const LogRouter = [{
    path: '/task',
    component: Layout,
    redirect: 'index',
    meta: {
        title: '任务管理',
        icon: 'table'
    },
    children: [{
        path: 'index',
        component: () =>
            import('@/views/task/index'),
        name: 'tasker',
        meta: {
            title: '任务列表',
            roles: ['admin']
        }
    }, ]
}]

export default LogRouter