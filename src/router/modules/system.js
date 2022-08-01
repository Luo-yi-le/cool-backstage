import Layout from '@/views/layout';

const systemRouter = [{
    path: '/system',
    component: Layout,
    redirect: 'user',
    meta: {
        title: '系统管理',
        icon: 'system'
    },
    children: [{
            path: 'user',
            component: () =>
                import ('@/views/user/user'),
            name: 'User',
            meta: {
                icon: 'bussiness-man',
                title: '用户管理',
                roles: ['admin']
            }
        },
        {
            path: 'menu',
            component: () =>
                import ('@/views/user/user'),
            name: 'User',
            meta: {
                icon: 'menu',
                title: '菜单管理',
                roles: ['admin']
            }
        },
    ]
}]

export default systemRouter;