import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/blog/BlogDetail.vue'
import BlogEdit from '../views/blog/BlogEdit.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Blogs' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // 懒加载
    component: () => import('../views/blog/Blogs.vue')
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    // 用meta规定了哪些页面需要auth, 访问meta.requireAuth
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
  {
    // 动态路由
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
