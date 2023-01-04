import Layout from '@/views/layout';

const systemRouter = [{
    path: '/system',
    component: Layout,
    redirect: 'user',
    meta: {
        title: '系统管理',
        icon: 'system'
    },
    children: [
        {
            path: 'user',
            component: () =>
                import ('@/views/system/user'),
            name: 'sysUser',
            meta: {
                icon: 'user',
                title: '用户列表',
                roles: ['admin']
            }
        },
        {
            path: 'role',
            component: () =>
                import ('@/views/system/role'),
            name: 'sysRole',
            meta: {
                icon: 'role',
                title: '角色列表',
                roles: ['admin']
            }
        },
        {
            path: 'menu',
            component: () =>
                import ('@/views/system/menu'),
            name: 'sysMenu',
            meta: {
                icon: 'menu',
                title: '菜单管理',
                roles: ['admin']
            }
        },
    ]
}]

export default systemRouter;