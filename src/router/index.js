import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/HomePage.vue';
import ProblemPage from '@/ProblemPage.vue';
const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path:'/problem/:id',
    component: ProblemPage,
    props:route => ({
      id: Number(route.params.id)
    })
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router