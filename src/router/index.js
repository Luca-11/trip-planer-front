import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleView from "../views/SingleView.vue";
import Loading from "../components/Loading.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:id",
      name: "single",
      component: SingleView,
    },
    {
      path: "/loading",
      name: "loading",
      component: Loading,
    },
  ],
});

export default router;
