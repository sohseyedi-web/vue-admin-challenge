import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/*webpackChunkName:"home"*/'../views/Home.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/*webpackChunkName:"posts"*/'../views/Auth.vue')
  }
]

export const router = createRouter({
  history: createWebHistory('/'),
  routes
})
