import Layout from '@/views/layout';
const userRouter = [{
    path: '/user',
    component: Layout,
    redirect: 'index',
    meta: {
        title: '用户管理',
        icon: 'table'
    },
    children: [{
        path: 'index',
        component: () =>
            import ('@/views/user/user'),
        name: 'User',
        meta: {
            title: '用户列表',
            roles: ['admin']
        }
    }, ]
}]

export default userRouter