import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/*webpackChunkName:"home"*/ "../views/dashboard/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/*webpackChunkName:"login"*/ "../views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/*webpackChunkName:"regsiter"*/ "../views/auth/Register.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
