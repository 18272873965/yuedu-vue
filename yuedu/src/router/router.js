import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '@/views/Login'
import {
    authToken
} from '@/service/getData'
const routes = [{
    path: '/',
    component: () => import('@/views/Main.vue'),
    redirect: '/channel/1',
    children: [{
            path: 'login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            path: 'channel/:id',
            component: () => import('@/views/Channel'),
            meta: {
                title: '列表'
            }
        },
        {
            path: '/article/:id',
            component: () => import('@/components/ytArticle.vue'),
            meta: {
                title: '文章'
            },
            children: [{
                    path: 'ytComment',
                    component: () => import('@/components/ytComment.vue')
                },
                {
                    path: 'ytBanner',
                    component: () => import('@/components/ytBanner.vue')
                }
            ]
        },
        {
            path: '/ytIndividual',
            component: () => import('../components/ytIndividual.vue'),
            meta: {
                title: '个人中心',
                requireAuth: true
            }
        }

    ]
}]

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    // 将当前页面的标题设置为to.meta.title
    document.title = to.meta.title

    // 判断是否需要登录
    if (to.matched.some(route => route.meta.requireAuth)) {
        // 判断token是否存在，判断token是否有效
        const token = localStorage.getItem('token')
        if (token) {
            // 判断是否有效 /api/user/token
            authToken().then(res => {
                if (res.data.res_code === 200) {
                    next()
                }
            })
        } else {
            next('/login')
        }
    } else {
        // 正常跳转
        next()
    }
})

export default router