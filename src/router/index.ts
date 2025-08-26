import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MovieDetails from '@/views/MovieDetails.vue';
import LoginForm from '@/components/LoginForm.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'login', component: LoginForm },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // Use the defined routes array
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login');
  } else {
    next();
  }
});

export default router;
