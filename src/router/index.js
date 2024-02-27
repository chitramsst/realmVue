import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import HomeView from '@/views/HomeView.vue'


const router = createRouter({
  history: window.envVars.isDev == true ? createWebHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta:{
        sideBar : true,
      },
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: () => import('../views/PdfView.vue'),
      meta:{
        sideBar : true,
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
