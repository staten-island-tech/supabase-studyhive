import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetsView from '@/views/SetsView.vue'
import CreateView from '@/views/CreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/StudySets',
      name: 'Study Sets',
      component: SetsView,
    },
    {
      path: '/Create',
      name: 'Create Sets',
      component: CreateView,
    },
    {
      path: '/',
      name: 'getStarted',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GetStarted.vue'),
    },
  ],
})

export default router
