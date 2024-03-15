import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/articles/page/:page",
    name: "Home",
    props: true,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        next("/login");
      } else {
        next();
      }
    },
    component: () =>
      import(/*webpackChunkName:"home"*/ "../views/articles/AllArticles.vue"),
  },

  {
    path: "/articles",
    redirect: "/articles/page/1",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/articles",
    component: () =>
      import(/*webpackChunkName:"home"*/ "../views/articles/AllArticles.vue"),
  },
  {
    path: "/articles/create",
    name: "Create",
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        next("/login");
      } else {
        next();
      }
    },
    component: () =>
      import(
        /*webpackChunkName:"create"*/ "../views/articles/CreateArticle.vue"
      ),
  },

  {
    path: "/articles/edit/:slug",
    name: "Edit",
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        next("/login");
      } else {
        next();
      }
    },
    component: () =>
      import(/*webpackChunkName:"edit"*/ "../views/articles/EditArticle.vue"),
  },

  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/*webpackChunkName:"login"*/ "../views/auth/Login.vue"),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        next("/articles");
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        next("/articles");
      } else {
        next();
      }
    },
    component: () =>
      import(/*webpackChunkName:"regsiter"*/ "../views/auth/Register.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
