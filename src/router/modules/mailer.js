import Layout from '@/views/layout';

const LogRouter = [{
    path: '/mailer',
    component: Layout,
    redirect: 'category',
    meta: {
        title: '邮件服务',
        icon: 'table'
    },
    children: [{
            path: 'category',
            component: () =>
                import('@/views/mailer/category/category'),
            name: 'mailer_category',
            meta: {
                title: '服务设置',
                roles: ['admin']
            }
        },
        {
            path: 'user',
            component: () =>
                import('@/views/mailer/user/user'),
            name: 'mailer_user',
            meta: {
                title: '用户邮箱',
                roles: ['admin']
            }
        },
        {
            path: 'admin',
            component: () =>
                import('@/views/mailer/admin/admin'),
            name: 'mailer_admin',
            meta: {
                title: '管理员邮箱',
                roles: ['admin']
            }
        },
        {
            path: 'record',
            component: () =>
                import('@/views/mailer/record/index'),
            name: 'mailer_record',
            meta: {
                title: '发送邮件',
                roles: ['admin']
            }
        },
        
    ]
}]

export default LogRouter