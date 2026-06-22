import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/HomePage.vue';
const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path:'/problem/:id',
    component: ()=>import("@/ProblemPage.vue"),
    props:route => ({
      id: Number(route.params.id)
    })
  },
  {
    path:'/make_problem',
    component:()=>import("@/MakeProblem.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router