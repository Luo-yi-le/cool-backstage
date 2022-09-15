import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import userRouter from './modules/user';
import systemRouter from './modules/system';
import wechatRouter from './modules/wechat';
import taskRouter from './modules/task';

import LogRouter from './modules/log';
import Layout from '@/views/layout';
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () =>
                import ('@/views/redirect/index')
        }]
    }, {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: '仪表板', icon: 'dashboard', affix: true }
        }]
    },

    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error/404'),
        hidden: true
    },
]


export const asyncRoutes = [
    // ...userRouter,
    ...systemRouter,
    ...wechatRouter,
    ...LogRouter, 
    ...taskRouter,
    { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () => new VueRouter({
    // mode: 'history', 
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});
const router = createRouter();
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', component: Login },
//   {
//     path: '/home',
//     component: Home,
//     redirect: '/welcome',
//     children: [
//       { path: '/welcome', component: Welcome },
//       { path: '/users', component: Users },
//       { path: '/rights', component: RightsList },
//       { path: '/roles', component: RolesList },
//       { path: '/categories', component: Categories },
//       { path: '/params', component: Params },
//       { path: '/goods', component: List },
//       { path: '/goods/add', component: AddGoods },
//       { path: '/orders', component: Order },
//     ]
//   },
//   {
//     path: '/dataview',
//     component: DataView
//   }
// ]



// const router = new VueRouter({
//   // mode: 'history',
//   routes
// })

// // 挂载导航守卫
// // from从哪儿来 to到哪儿去 next放行函数
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()

//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     Vue.prototype.$message({
//       type:'info',
//       message:'小伙子,请登录',
//     })
//     return next('/login')
//   }
//   next()
// })

// // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


// export default router