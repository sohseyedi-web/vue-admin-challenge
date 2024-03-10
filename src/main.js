import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import { router } from "./routes/index";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Skeleton from "vue-loading-skeleton";


createApp(App).use(router).use(Skeleton).use(bootstrap).mount("#app");
