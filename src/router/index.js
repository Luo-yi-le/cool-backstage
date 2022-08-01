import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    // 普通方式
    // import Login from "components/Login.vue"
    // import Home from 'components/Home.vue'
    // import Welcome from "components/Welcome.vue"

// 懒加载: 登录——主页——欢迎页
// const Login = () =>
//     import ( /* webpackChunkName: "login_Home_Welcome" */ "views/Login.vue")
// const Home = () =>
//     import ( /* webpackChunkName: "login_Home_Welcome" */ "views/Home.vue")
// const Welcome = () =>
//     import ( /* webpackChunkName: "login_Home_Welcome" */ "components/welcome")

// // 用户管理
// // const Users = () => import(/* webpackChunkName: "users" */ "components/user/Users.vue")

// // 权限管理
// const RightsList = () =>
//     import ( /* webpackChunkName: "rights" */ "components/power/Rights.vue")
// const RolesList = () =>
//     import ( /* webpackChunkName: "rights" */ "components/power/Roles.vue")

// // 商品管理
// const Categories = () =>
//     import ( /* webpackChunkName: "goods" */ "components/goods/Categories.vue")
// const Params = () =>
//     import ( /* webpackChunkName: "goods" */ "components/goods/Params.vue")
// const List = () =>
//     import ( /* webpackChunkName: "goods" */ "components/goods/List.vue")
// const AddGoods = () =>
//     import ( /* webpackChunkName: "goods" */ "components/goods/AddGoods.vue")

// // 订单管理
// const Order = () =>
//     import ( /* webpackChunkName: "order_Report" */ "components/order/Order.vue")

// // 数据可视化
// const DataView = () =>
//     import ( /* webpackChunkName: "order_Report" */ "views/DataView.vue")


import userRouter from './modules/user';
import systemRouter from './modules/system';
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