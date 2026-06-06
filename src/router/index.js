import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/HomePage.vue';
import LoginPage from '@/LoginPage.vue';
import RegisterPage from '@/RegisterPage.vue';
import ForgotPassword from '@/ForgotPassword.vue';
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
    path:'/login',
    component:LoginPage
  },
  {
    path:'/register',
    component:RegisterPage
  },
  {
    path:'/forgot',
    component:ForgotPassword
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router