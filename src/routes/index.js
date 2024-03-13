import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/articles/page/:page",
    name: "Home",
    props: true,

    component: () =>
      import(/*webpackChunkName:"home"*/ "../views/articles/AllArticles.vue"),
  },
  {
    path: "/articles/page/1",
    alias: "/articles",
    name: "HomeRedirect",
    component: () =>
      import(/*webpackChunkName:"home"*/ "../views/articles/AllArticles.vue"),
    props: true,
  },

  {
    path: "/articles/create",
    name: "Create",
    component: () =>
      import(
        /*webpackChunkName:"create"*/ "../views/articles/CreateArticle.vue"
      ),
  },

  {
    path: "/articles/edit/:slug",
    name: "Edit",
    component: () =>
      import(/*webpackChunkName:"edit"*/ "../views/articles/EditArticle.vue"),
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
