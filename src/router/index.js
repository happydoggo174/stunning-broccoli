import { createRouter, createWebHashHistory } from 'vue-router'
import ChallengePage from '@/ChallengePage.vue';
import HomePage from '@/HomePage.vue';
const routes = [
  {
    path: '/challenge',
    component: ChallengePage,
  },
  {
    path:'/',
    component:HomePage
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
  },
  {
    path:'/favorite',
    component:()=>import('@/LikePage.vue')
  },
  {
    path:'/search/:query',
    component:()=>import('@/SearchPage.vue'),
    props:route=>({
      query:route.params.query
    })
  },
  {
    path:'/learn',
    component:()=>import("@/KnowledgeTab.vue")
  },
  {
    path:'/learn/detail/:id',
    component:()=>import("@/KnowledgePage.vue"),
    props:route=>({
      id:Number(route.params.id)
    })
  },
  {
    path:'/make_lesson',
    component:()=>import("@/MakeKnowledge.vue")
  },
  {
    path:'/profile/:uid',
    component:()=>import("@/ProfilePage.vue"),
    props:route=>({
      uid:route.params.uid
    })
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router