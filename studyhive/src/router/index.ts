import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetsView from '@/views/SetsView.vue'
import CreateView from '@/views/CreateView.vue'
import { useUserStore } from '@/stores/users.ts'
import { showSignIn } from '@/var.ts'

const userStore = useUserStore();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true }
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
      meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !userStore.isSignedIn) {
    Object.assign(showSignIn.value, true);
    next({ name: 'getStarted' }); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router
