import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetsView from '@/views/SetsView.vue'
import CreateView from '@/views/CreateView.vue'
import { useUserStore } from '@/stores/users.ts'
import { showSignIn } from '@/var.ts'
import StudySet from '@/components/StudySet.vue'
import QuizDetails from '@/components/QuizDetails.vue'
import PlayView from '@/views/PlayView.vue'


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
      name: 'StudySets',
      component: SetsView,
      children: [
        {
          path: 'details/:studySetId',
          name: 'StudySetDetails',
          component: QuizDetails,
          props: true
        },
        {
          path: '',
          name: 'StudySetsOverview',
          component: StudySet,
        }
      ]
    },
    {
      path: '/Play/:studySetId',
      name: 'Play',
      component: PlayView,
      props: true
    },
    {
      path: '/Create',
      name: 'CreateSets',
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
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isSignedIn) {
    showSignIn.value = true;
    alert('authentication required.')
    next({ name: 'getStarted' }); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router
